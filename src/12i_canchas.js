// ============ Canchas de baloncesto: entradas, partidos libres y el Torneo Lagunero (v0.66) ============
// Every court with hoops gets an entrance. Public ones you walk onto from the street and press E on the court; courts
// inside a school (or shut in by buildings, like the Colegio Máyex) are entered with E at a door on the street, as the
// shops. After your first game (the Obispo's tutorial) any court can be challenged (levels 1–5) and the Torneo
// Lagunero opens: 4 teams on courts around town, each one harder, and the final in the Pabellón Juan Ríos Tejera.
const COURTS = [];
const RIVAL_LOOKS = [
  { skin: 0xc68a63, shirt: 0x1d4f9c, pants: 0xf2f2f2, hair: 0x111111, hairStyle: 'Hair_Buzzed', longPants: false, sleeve: false, hd: true, shoes: 0xf2f2f2 },
  { skin: 0xe0b08c, shirt: 0x1d4f9c, pants: 0xf2f2f2, hair: 0x5a3a20, hairStyle: 'Hair_SimpleParted', longPants: false, sleeve: false, hd: true, shoes: 0x222222 },
  { skin: 0xb27650, shirt: 0xf1c40f, pants: 0x222222, hair: 0x221a12, hairStyle: 'Hair_Long', longPants: false, sleeve: false, hd: true, shoes: 0xf1c40f },
  { skin: 0xe8c0a0, shirt: 0xf1c40f, pants: 0x222222, hair: 0xb8860b, hairStyle: 'Hair_Buzzed', longPants: false, sleeve: false, hd: true, shoes: 0x111111 },
  { skin: 0x8d5a3b, shirt: 0x27ae60, pants: 0x111111, hair: 0x111111, hairStyle: 'Hair_Buzzed', longPants: false, sleeve: false, hd: true, shoes: 0xffffff },
  { skin: 0xd9a47c, shirt: 0x27ae60, pants: 0x111111, hair: 0x3a2a1a, hairStyle: 'Hair_Long', longPants: false, sleeve: false, hd: true, shoes: 0x27ae60, beard: true },
  { skin: 0xc9926b, shirt: 0x8e44ad, pants: 0xf2f2f2, hair: 0x111111, hairStyle: 'Hair_SimpleParted', longPants: false, sleeve: false, hd: true, shoes: 0x8e44ad },
  { skin: 0xe2b48f, shirt: 0x8e44ad, pants: 0xf2f2f2, hair: 0x6b4a2a, hairStyle: 'Hair_Buzzed', longPants: false, sleeve: false, hd: true, shoes: 0xf2f2f2 },
];
const SCHOOL_RE = /colegio|ceip|ies\b|instituto|escuela|cifp|liceo|seminario|salesianos|dominicas|nava|mayex|máyex/i;
function roadNear(x, z) { // nearest road point, searching further out than ROADSEG's 3×3 cells
  let best = ROADSEG.nearest(x, z, (r) => r[0] <= 14); if (best) return best;
  for (const R of [40, 80, 120]) for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2, q = ROADSEG.nearest(x + Math.cos(a) * R, z + Math.sin(a) * R, (r) => r[0] <= 14); if (q) { const d = Math.hypot(q.x - x, q.z - z); if (!best || d < best.d) best = { ...q, d }; } }
  return best;
}
const roadName = (rd) => (rd && DATA.R[rd.ri][1] >= 0 ? STR[DATA.R[rd.ri][1]] : '');
// a door on the street side of building / place (x, z): on the pavement, outside every building
function streetDoor(x, z) {
  const rd = roadNear(x, z); if (!rd) return null; const w = DATA.R[rd.ri][2] || 6; const dx = x - rd.x, dz = z - rd.z, L = Math.hypot(dx, dz) || 1;
  let p = [rd.x + dx / L * (w / 2 + 1.3), rd.z + dz / L * (w / 2 + 1.3)]; if (inAnyBuilding(p[0], p[1]) || COL.nearSeg(p[0], p[1], 0.5)) p = safeSpot(p[0], p[1], 0.6);
  return { x: p[0], z: p[1], street: roadName(rd), nx: -dx / L, nz: -dz / L };
}
let BALL_ICON = null;
function gateIcon(x, z, y = 3.2) {
  if (!BALL_ICON) { const c = mkCanvas(64, 64), g = c.getContext('2d'); g.fillStyle = '#e8641c'; g.beginPath(); g.arc(32, 32, 26, 0, 7); g.fill(); g.strokeStyle = '#3a1806'; g.lineWidth = 3; g.beginPath(); g.arc(32, 32, 26, 0, 7); g.moveTo(6, 32); g.lineTo(58, 32); g.moveTo(32, 6); g.lineTo(32, 58); g.stroke(); g.beginPath(); g.arc(4, 32, 22, -1, 1); g.stroke(); g.beginPath(); g.arc(60, 32, 22, Math.PI - 1, Math.PI + 1); g.stroke();
    BALL_ICON = new THREE.SpriteMaterial({ map: canvasTex(c, { repeat: false }), transparent: true, depthWrite: false, fog: false }); }
  const s = new THREE.Sprite(BALL_ICON); s.scale.set(0.9, 0.9, 1); s.position.set(x, heightAt(x, z) + y, z); scene.add(s); return s;
}
function canchasInit() {
  const o = (typeof OBISPADO !== 'undefined' && OBISPADO.front) || [0, 0];
  for (const P of SPORTS.pitches) {
    if (P.kind !== 'bb' && P.kind !== 'multi') continue;
    // shut in? (a building between the court and the nearest street)
    const rd = roadNear(P.cx, P.cz); let shut = !rd; if (rd) { const L = Math.hypot(P.cx - rd.x, P.cz - rd.z); for (let t = 0.15; t < 0.85 && !shut; t += 0.7 / Math.max(3, L)) if (inAnyBuilding(rd.x + (P.cx - rd.x) * t, rd.z + (P.cz - rd.z) * t)) shut = true; }
    const school = BUILD.find((b) => b.name && SCHOOL_RE.test(b.name) && Math.hypot(b.cx - P.cx, b.cz - P.cz) < 70);
    const h = Math.abs(Math.sin(P.cx * 7.1 + P.cz * 3.3) * 9999) % 1; const level = 1 + Math.floor(h * 5);
    const c = { id: 'c' + COURTS.length, cx: P.cx, cz: P.cz, F: P.F, len: P.len, wid: P.wid, kind: P.kind, level, street: roadName(rd), dist: Math.hypot(P.cx - o[0], P.cz - o[1]) };
    if (shut || school) { const base = school && Math.hypot(school.cx - P.cx, school.cz - P.cz) < 70 ? school : { cx: P.cx, cz: P.cz }; const d = streetDoor(base.cx, base.cz); if (!d) continue;
      Object.assign(c, { gate: 'door', x: d.x, z: d.z, label: school ? school.name : 'la cancha (entrada por ' + (d.street || 'la calle') + ')', style: school ? 'colegio' : 'calle' }); }
    else Object.assign(c, { gate: 'court', x: P.cx, z: P.cz, label: 'la cancha de ' + (c.street || 'baloncesto'), style: 'calle' });
    c.icon = gateIcon(c.x, c.z, c.gate === 'door' ? 3.0 : 4.2); COURTS.push(c);
  }
  // Colegio Máyex (C. Pintor Cristino de Vera): its yard court is reached through the school door
  let mb = findBuilding('Máyex') || findBuilding('Mayex');
  if (!mb) { const c0 = COURTS.find((q) => q.gate === 'door' && /Cristino de Vera/i.test(q.street || q.label || '')); if (c0) mb = { cx: c0.cx, cz: c0.cz }; } // not named in OSM: the shut-in court with its door on C. Pintor Cristino de Vera
  if (mb) { const d = streetDoor(mb.cx, mb.cz); if (d) { let c = COURTS.filter((q) => Math.hypot(q.cx - mb.cx, q.cz - mb.cz) < 80).sort((a, b) => Math.hypot(a.cx - mb.cx, a.cz - mb.cz) - Math.hypot(b.cx - mb.cx, b.cz - mb.cz))[0];
    if (!c) { c = { id: 'c' + COURTS.length, cx: mb.cx, cz: mb.cz, level: 1, dist: 0 }; COURTS.push(c); }
    if (c.icon && c.icon.parent) c.icon.parent.remove(c.icon); Object.assign(c, { id: 'mayex', gate: 'door', x: d.x, z: d.z, label: 'Colegio Máyex', street: d.street || 'C. Pintor Cristino de Vera', style: 'colegio', level: 1 }); c.icon = gateIcon(d.x, d.z, 3.0); } }
  riosTejeraInit();
  torneoInit();
  try { camposInit(); } catch (e) { console.warn('campos', e); } // v0.67: football pitches (12j_campos.js)
}
// ---------- the Pabellón Juan Ríos Tejera (C. Leopoldo de la Rosa Olivera): white walls, purple gate, the sign; E = in
function riosTejeraInit() {
  let b = findBuilding('Ríos Tejera') || findBuilding('Rios Tejera') || (typeof RIOS !== 'undefined' && RIOS.pts ? { cx: RIOS.cx, cz: RIOS.cz } : null); // v0.76: the hall rebuilt in 05v_peraza.js
  if (!b) { // not named in OSM: the biggest building (a hall of ~40 × 60 m) beside Calle Leopoldo de la Rosa Olivera
    const pts = []; for (const r of DATA.R) if (r[1] >= 0 && STR[r[1]] === 'Calle Leopoldo de la Rosa Olivera') for (let i = 0; i < r[4].length; i += 2) pts.push([r[4][i], r[4][i + 1]]);
    let best = 0; for (const q of BUILD) { if (!q.pts || q.pts.length < 3) continue; let A = 0; for (let i = 0, n = q.pts.length; i < n; i++) { const p1 = q.pts[i], p2 = q.pts[(i + 1) % n]; A += p1[0] * p2[1] - p2[0] * p1[1]; } A = Math.abs(A) / 2;
      if (A < 1200 || A <= best) continue; if (!pts.some((p) => Math.hypot(p[0] - q.cx, p[1] - q.cz) < 70)) continue; best = A; b = q; } }
  let base = b ? [b.cx, b.cz] : centroidOfNamedWays('Calle Leopoldo de la Rosa Olivera'); if (!base) return;
  const d = streetDoor(base[0], base[1]); if (!d) return;
  const g = new THREE.Group(); const ang = Math.atan2(d.nx, d.nz); const y0 = heightAt(d.x, d.z);
  const purple = M(0x7e3fa0, 0.5, 0.4), white = M(0xf2f2ee, 0.85);
  const at = (u, y, o2) => [d.x + Math.cos(ang) * u + d.nx * o2, y0 + y, d.z - Math.sin(ang) * u + d.nz * o2];
  const add = (geo, m, u, y, o2) => { const mesh = new THREE.Mesh(geo, m); mesh.position.set(...at(u, y, o2)); mesh.rotation.y = ang; g.add(mesh); return mesh; };
  for (const u of [-1.8, 1.8]) add(new THREE.BoxGeometry(0.5, 2.6, 0.5), white, u, 1.3, 1.0);
  for (let k = -1.5; k <= 1.51; k += 0.18) add(new THREE.BoxGeometry(0.05, 2.0, 0.05), purple, k, 1.0, 1.0);
  add(new THREE.BoxGeometry(3.2, 0.08, 0.06), purple, 0, 2.0, 1.0);
  const c = mkCanvas(512, 160), x = c.getContext('2d'); x.fillStyle = '#e9eef5'; x.fillRect(0, 0, 512, 160); x.fillStyle = '#1d4f9c'; x.fillRect(0, 0, 18, 160);
  x.fillStyle = '#1d4f9c'; x.font = 'bold 34px sans-serif'; x.fillText('Pabellón Municipal', 34, 52); x.font = 'bold 40px sans-serif'; x.fillText('Juan Ríos Tejera', 34, 104); x.font = '24px sans-serif'; x.fillStyle = '#555'; x.fillText('Alberto Delgado', 34, 140);
  add(new THREE.PlaneGeometry(2.6, 0.8), new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), roughness: 0.6 }), 3.4, 2.4, 1.3);
  scene.add(g);
  COURTS.push({ id: 'riostejera', gate: 'door', x: d.x - d.nx * 0.2, z: d.z - d.nz * 0.2, label: 'Pabellón Juan Ríos Tejera', street: d.street, style: 'pabellon', level: 5, final: true, cx: base[0], cz: base[1], icon: gateIcon(d.x, d.z, 3.4) });
}
// ---------- E near a court entrance
function courtGateNear() {
  if (PLAYER.car || PLAYER.interior) return null;
  for (const c of COURTS) {
    if (c.gate === 'door') { if (Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z) < 2.6) return c; continue; }
    const F = c.F; if (!F) continue; const u = (PLAYER.x - c.cx) * F.ux + (PLAYER.z - c.cz) * F.uz, v = (PLAYER.x - c.cx) * F.vx + (PLAYER.z - c.cz) * F.vz;
    if (u > F.u0 && u < F.u1 && v > F.v0 && v < F.v1) return c;
  }
  return null;
}
function courtPrompt(c) { return CONTROLS.kbd('use') + (c.gate === 'door' ? ' Entrar: ' + c.label : c.sport === 'fut' ? ' Jugar al fútbol' : ' Jugar al baloncesto'); }
const pickRivals = (seed) => { const i = (Math.abs(Math.floor(seed)) % 4) * 2; return [RIVAL_LOOKS[i], RIVAL_LOOKS[i + 1]]; };
const cocoLook = () => (NPC.coco && NPC.coco.H ? { ...NPC.coco.H.look } : {});
function playCourtGame(c, o) { // o: rival, rivalName, lv, time, tutorial, onEnd
  if (PLAYER.car) exitCar();
  return BASKET2D.start({ team: [{ name: 'EL CHOPA', look: { ...(playerHuman.look || {}) }, nose: true }, { name: 'COCO', look: cocoLook() }], rival: o.rival, teamName: typeof shortName === 'function' ? shortName() : 'JETA', rivalName: o.rivalName, time: o.time || 150, lv: o.lv, mateLv: 0.6, tutorial: !!o.tutorial, style: o.style || c.style || 'calle', onEnd: o.onEnd });
}
function useCourtGate(c) {
  if (c.sport === 'fut') { useFieldGate(c); return; }
  const A = MISSIONS.active;
  if (A && A.gate === c.id && A.onGate) { A.onGate(c); return; }
  if (A) { HUD.toast('Termina primero la misión que llevas.', '#f5b72e', 3); return; }
  if (!MISSIONS.gang.basketTut) { HUD.toast('Aquí se juega al baloncesto. Primero aprende: Monseñor Truchas, en el Obispado, organiza partidos benéficos.', '#b388ff', 5); return; }
  if (c.final) { HUD.toast('El Pabellón Juan Ríos Tejera solo abre para la final del Torneo Lagunero.', '#ff9f43', 4); return; }
  const prize = 40 * c.level;
  DLG.show(c.label, 'Partido 2 contra 2', `Los de aquí os retan a ti y a Coco. <b>Nivel ${c.level}/5</b>. Si ganáis: <b>$${prize}</b>.`, '¿Jugáis?', ['Jugar', 'Ahora no'], (i) => {
    DLG.hide(); if (i !== 0) return;
    playCourtGame(c, { rival: pickRivals(c.cx + c.cz).map((l, k) => ({ name: ['EL MÁS ALTO', 'EL PIBE'][k], look: l })), rivalName: (c.street || 'LA CANCHA').replace(/^(Calle|Avenida|Camino|Plaza)\s+(de\s+(la\s+|los\s+|las\s+)?)?/i, '').toUpperCase().slice(0, 11), lv: 0.08 + 0.14 * c.level, time: 120,
      onEnd: (r) => { if (r.won) { PLAYER.money += prize; AUDIO.cash && AUDIO.cash(); HUD.toast(`¡Ganado! +$${prize}`, '#7fe08a', 4); } else HUD.toast('Os han ganado. Vuelve cuando quieras la revancha.', '#ffb3b3', 4); } });
  });
}
// ---------- Torneo Lagunero: 4 public courts around town (each harder) and the final in the Ríos Tejera
const TORNEO_TEAMS = [
  { name: 'Los Baifos de San Benito', short: 'BAIFOS', cap: 'Yeray «el Baifo»', lv: 0.28, prize: 300 },
  { name: 'Los Perenquenes de Taco', short: 'PERENQUENES', cap: 'Echedey', lv: 0.38, prize: 450 },
  { name: 'Los Guanchinches del Coromoto', short: 'GUANCHINCHES', cap: 'Acaymo', lv: 0.48, prize: 600 },
  { name: 'Barranco Grande Brothers', short: 'BARRANCO', cap: 'Kevin y Jonathan', lv: 0.6, prize: 800 },
  { name: 'Los Magos de la Vega', short: 'MAGOS VEGA', cap: 'Don Tinguaro', lv: 0.75, prize: 1500 },
];
function torneoInit() {
  const pub = COURTS.filter((c) => c.gate === 'court' && !c.final && c.sport !== 'fut').sort((a, b) => a.dist - b.dist);
  const used = new Set(typeof obispoCourt === 'function' ? [(obispoCourt(true) || {}).cx] : []);
  const chosen = []; for (const sp of [350, 220, 120, 0]) { for (const c of pub) { if (chosen.length >= 4) break; if (used.has(c.cx) || chosen.includes(c)) continue; if (chosen.every((q) => Math.hypot(q.cx - c.cx, q.cz - c.cz) >= sp)) chosen.push(c); } if (chosen.length >= 4) break; }
  const fin = COURTS.find((c) => c.final); if (chosen.length < 1 || !fin) return;
  const list = TORNEO_TEAMS.map((t, i) => { const c = i < 4 ? chosen[i % chosen.length] : fin; const finalGame = i === 4; const rv = pickRivals(i * 3 + 1);
    return { title: finalGame ? 'Torneo Lagunero: la final' : `Torneo Lagunero ${i + 1}/5`, who: t.cap, court: c,
      hint() { return `${t.name} os esperan en ${MISSIONS.kit.bold(finalGame ? 'el Pabellón Juan Ríos Tejera' : c.label)}`; },
      startPos() { return finalGame ? [c.x + (c.x - c.cx) * 0.02, c.z] : [c.x, c.z]; },
      start() { const K = MISSIONS.kit;
        const lines = finalGame ? [[t.cap, 'Así que tú eres el Chopa. Llevamos tres años ganando este torneo. Aquí dentro, con gradas y todo, no se tira de lejos: se gana.'], [K.CH, 'Pues este año hay banda nueva. Coco, calienta, que es la final.']]
          : [[t.cap, `¿Vosotros sois los del torneo? Somos ${t.name}. En esta cancha no ha ganado nadie de fuera desde que existe el tranvía.`], ['Coco', 'Chopa, tú tira, que yo me encargo de los rebotes. Y de los empujones.']];
        K.talk(lines, () => { if (!K.isActive(this)) return;
          playCourtGame(c, { rival: rv.map((l, k) => ({ name: t.short.slice(0, 6) + ' ' + (k + 1), look: l })), rivalName: t.short, lv: t.lv, time: finalGame ? 180 : 150, style: finalGame ? 'pabellon' : 'calle',
            onEnd: (r) => { if (!K.isActive(this)) return; if (r.won) { if (finalGame) { HUD.big('¡CAMPEONES DEL TORNEO LAGUNERO!', '#ff9f43', 6); } K.pass(this.title, t.prize); } else K.fail(finalGame ? 'Habéis perdido la final. Volved a intentarlo en el Ríos Tejera.' : `${t.name} os han ganado.`); } }); }); },
      update() { } };
  });
  MISSIONS.addTorneo(list);
}
