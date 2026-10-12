// ============ El Obispo: Monseñor Fermín Truchas (parodia) y sus misiones (v0.65) ============
// The bishop of Nivaria lives in the Obispado (Casa Salazar, Calle San Agustín). His pack of side missions opens with the
// mayor's ones and is optional («solo si eres religioso»), but it pays: the works in the churches need money. The first
// ones are charity basketball games (BASKET2D) on the court nearest the Obispado; football comes in a later pass.
const OBISPADO = { ok: false };
const OBISPO = 'Monseñor Fermín Truchas';
const SEMINARISTAS = [
  { skin: 0xe2b48f, shirt: 0xf2f2f2, pants: 0x161616, hair: 0x3a2a1a, hairStyle: 'Hair_SimpleParted', glasses: 'round', longPants: true, sleeve: false, hd: true, shoes: 0x111111 },
  { skin: 0xc9926b, shirt: 0xf2f2f2, pants: 0x161616, hair: 0x111111, hairStyle: 'Hair_Buzzed', longPants: true, sleeve: false, hd: true, shoes: 0x111111 },
];
const CRISTO_TEAM = [
  { skin: 0xb27650, shirt: 0x7a1f1f, pants: 0xf2f2f2, hair: 0x111111, hairStyle: 'Hair_Buzzed', longPants: false, sleeve: false, hd: true, shoes: 0xf2f2f2, build: { slim: 0.4 } },
  { skin: 0xe0b08c, shirt: 0x7a1f1f, pants: 0xf2f2f2, hair: 0x5a3a20, hairStyle: 'Hair_Long', longPants: false, sleeve: false, hd: true, shoes: 0xf2f2f2, beard: true },
];
// ---------- the Obispado: a portal on the facade of the Casa Salazar (dark ashlar, paired columns, pediment with the
// coat of arms, iron balconies, pinnacles). The full recreation of the house is still pending (PENDIENTES).
function buildObispado() {
  const b = findBuilding('Casa Salazar'); if (!b) return;
  const P = b.pts, n = P.length, flat = P.flat(); let E = null, best = -1;
  for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 6) continue;
    let nx = (q[1] - p[1]) / L, nz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; if (pip(mx + nx * 0.4, mz + nz * 0.4, flat)) { nx = -nx; nz = -nz; } /* outward from THIS house (v0.65.1: a neighbour used to flip it inwards) */
    if (inAnyBuilding(mx + nx * 3, mz + nz * 3)) continue; /* the street must be in front */
    const rd = ROADSEG.nearest(mx + nx * 4, mz + nz * 4); if (!rd || rd.d > 9) continue; const nm = DATA.R[rd.ri][1] >= 0 ? STR[DATA.R[rd.ri][1]] : '';
    const sc = L + (/Agust/i.test(nm) ? 100 : 0); if (sc > best) { best = sc; E = { p, q, L, nx, nz, mx, mz }; } }
  if (!E) return;
  const ux = (E.q[0] - E.p[0]) / E.L, uz = (E.q[1] - E.p[1]) / E.L, ang = Math.atan2(E.nx, E.nz), g0 = Math.min(heightAt(E.p[0], E.p[1]), heightAt(E.q[0], E.q[1]));
  const root = new THREE.Group(); const stone = new THREE.MeshStandardMaterial({ color: 0x8a857c, map: aytoStoneTex(), roughness: 0.92 }); const dark = M(0x2b2a28, 0.9), iron = M(0x161616, 0.5, 0.6), wood = M(0x4a2c17, 0.8);
  const at = (u, y, o) => [E.mx + ux * u + E.nx * o, g0 + y, E.mz + uz * u + E.nz * o];
  const box = (w, h, d, mat, u, y, o) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); const p = at(u, y, o); m.position.set(...p); m.rotation.y = ang; m.castShadow = true; root.add(m); return m; };
  const cyl = (r, h, mat, u, y, o) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.08, h, 10), mat); m.position.set(...at(u, y, o)); m.castShadow = true; root.add(m); return m; };
  // dark stone facing over the whole front, ground and first floor
  const fh = Math.max(7, Math.min(11, (b.top || g0 + 9) - g0)); stone.polygonOffset = true; stone.polygonOffsetFactor = -2; stone.polygonOffsetUnits = -2;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(E.L - 0.2, fh), stone); face.position.set(...at(0, fh / 2, 0.14)); face.rotation.y = ang; root.add(face); stone.map.repeat.set(E.L / 4, fh / 4); stone.map.anisotropy = 4; // v0.65.1: a plane 14 cm off the wall (the box touched it and flickered)
  // portal: door, two pairs of columns, entablature, triangular pediment with the coat of arms
  box(2.2, 3.4, 0.1, wood, 0, 1.7, 0.22);
  for (const s of [-1, 1]) for (const k of [1.55, 2.1]) { cyl(0.2, 4.2, stone, s * k, 2.1, 0.45); box(0.55, 0.3, 0.55, stone, s * k, 0.15, 0.45); box(0.55, 0.3, 0.55, stone, s * k, 4.3, 0.45); }
  box(5.2, 0.6, 0.8, stone, 0, 4.75, 0.45);
  { const sh = new THREE.Shape(); sh.moveTo(-2.7, 0); sh.lineTo(2.7, 0); sh.lineTo(0, 1.5); sh.closePath(); const ge = new THREE.ExtrudeGeometry(sh, { depth: 0.6, bevelEnabled: false }); ge.translate(0, 0, -0.3);
    const m = new THREE.Mesh(ge, stone); m.position.set(...at(0, 5.05, 0.45)); m.rotation.y = ang; root.add(m); }
  { const c = mkCanvas(128, 160), x = c.getContext('2d'); x.fillStyle = '#6d6a63'; x.fillRect(0, 0, 128, 160); x.fillStyle = '#7e2a8c'; x.beginPath(); x.moveTo(16, 20); x.lineTo(112, 20); x.lineTo(112, 90); x.quadraticCurveTo(64, 150, 16, 90); x.closePath(); x.fill();
    x.fillStyle = '#f2d36b'; x.fillRect(58, 34, 12, 72); x.fillRect(38, 52, 52, 12); x.strokeStyle = '#3a3733'; x.lineWidth = 5; x.stroke();
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), roughness: 0.8 })); m.position.set(...at(0, 5.75, 0.78)); m.rotation.y = ang; root.add(m); }
  // iron balconies on the first floor and pinnacles on top of the facade
  for (const u of [-E.L / 2 + 2.5, -E.L / 4, E.L / 4, E.L / 2 - 2.5]) { if (Math.abs(u) < 3.2) continue; box(1.6, 0.12, 0.7, stone, u, 3.9, 0.4); box(1.6, 0.05, 0.05, iron, u, 4.85, 0.74); for (let k = -0.75; k <= 0.76; k += 0.15) box(0.03, 0.95, 0.03, iron, u + k, 4.4, 0.74); box(1.2, 2.2, 0.08, dark, u, 5.0, 0.21); }
  for (const u of [-E.L / 2 + 0.4, E.L / 2 - 0.4, -2.1, 2.1]) { const m = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.1, 6), stone); m.position.set(...at(u, fh + 0.55, 0.1)); root.add(m); }
  scene.add(root);
  const door = at(0, 0, 1.6); let fr = [door[0] + E.nx * 1.6, door[2] + E.nz * 1.6];
  if (inAnyBuilding(fr[0], fr[1]) || COL.nearSeg(fr[0], fr[1], 0.6)) fr = safeSpot(fr[0], fr[1], 0.6); // v0.65.1: always reachable, out in the street
  Object.assign(OBISPADO, { ok: true, door: [door[0], door[2]], nx: E.nx, nz: E.nz, front: fr });
  for (const s of [-1, 1]) for (const k of [1.55, 2.1]) { const p = at(s * k, 0, 0.45); COL.addCirc(p[0], p[2], 0.25); }
}
// ---------- the bishop himself, in purple, at the door
function obispoInit() {
  try { buildObispado(); } catch (e) { console.warn('obispado', e); }
  if (!OBISPADO.ok) return;
  const H = makeHuman({ skin: 0xe8c0a0, shirt: 0x5b1f6e, pants: 0x5b1f6e, jacket: 0x5b1f6e, shoes: 0x111111, hair: 0xb8b8b8, hairStyle: 'Hair_SimpleParted', glasses: 'round', scale: 0.98, female: false, beard: false, build: { normal: 0.5, fat: 0.6 }, longPants: true, sleeve: true, hd: true, sole: 0x111111 });
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), M(0x7e2a8c, 0.7)); cap.position.set(0, 0.11, -0.01); H.head.add(cap); // solideo
  const cr = new THREE.Group(); const gold = M(0xd9b44a, 0.3, 0.8); const v = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.09, 0.012), gold), hz = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.012), gold); hz.position.y = 0.015; cr.add(v, hz);
  cr.position.set(0, -0.32, 0.13); H.head.add(cr); // pectoral cross
  const [x, z] = OBISPADO.front; H.root.position.set(x, heightAt(x, z) + 0.17, z); H.root.rotation.y = Math.atan2(OBISPADO.nx, OBISPADO.nz); scene.add(H.root);
  NPC.obispo = { x, z, H, home: [x, z], name: OBISPO }; COL.addCirc(x, z, 0.4);
}
// ---------- the court for the charity games: the nearest one with hoops
// v0.66: the first game is in the yard of the Colegio Máyex (school door, E); the second one on a public court
function obispoCourt(kind) {
  if (typeof COURTS === 'undefined' || !COURTS.length) return null;
  if (kind === 'mayex' || kind === undefined) { const m = COURTS.find((c) => c.id === 'mayex'); if (m) return m; }
  return COURTS.filter((c) => c.gate === 'court' && !c.final).sort((a, b) => a.dist - b.dist)[0] || null;
}
const shortName = () => { const g = (MISSIONS.gang && MISSIONS.gang.name) || ''; const s = g.replace(/^(Los|Las|La|El)\s+/i, '').toUpperCase(); return (s || 'JETA').slice(0, 11); };
function obispoStartGame(m, o, c) {
  const K = MISSIONS.kit; m.st.step = 2; K.clearBeacon(); K.setObjective(null);
  playCourtGame(c, { rival: o.rival, rivalName: o.rivalName, time: o.time, lv: o.lv, tutorial: o.tutorial, style: c.style,
    onEnd: (r) => { if (!K.isActive(m)) return; if (r.won) { K.talk([[o.winWho, o.winLine(r.score)]], () => { K.pass(m.title, o.prize); if (o.tutorial && !MISSIONS.gang.basketTut) { MISSIONS.gang.basketTut = true; MISSIONS.refresh(); setTimeout(() => HUD.toast('Ya puedes retar a la gente en cualquier cancha (E) y se abre el TORNEO LAGUNERO (círculo naranja).', '#ff9f43', 7), 4500); } }); } else K.fail(o.loseLine); } });
}
function obispoGame(m, o) {
  const K = MISSIONS.kit, c = obispoCourt(o.court); if (!c) { K.abort('No encuentro ninguna cancha de baloncesto cerca.'); return; }
  m.st = { step: 1, c, o };
  if (c.gate === 'door') { m.gate = c.id; m.onGate = () => { if (m.st && m.st.step === 1) obispoStartGame(m, o, c); }; K.goto(c.x, c.z, 2.2, 0xb388ff); K.setObjective(`Ve con Coco al ${K.bold(c.label)} (${c.street || 'la calle'}) y entra con ${CONTROLS.kbd('use')}`); }
  else { m.gate = null; K.goto(c.cx, c.cz, 6, 0xb388ff); K.setObjective(`Ve a ${K.bold(c.label)} con Coco para el partido`); }
}
function obispoGameUpdate(m) {
  const K = MISSIONS.kit, S = m.st; if (!S || S.step !== 1 || S.c.gate === 'door') return; const g = K.data.goal; if (!g || Math.hypot(PLAYER.x - g[0], PLAYER.z - g[1]) > 7) return;
  if (PLAYER.car) { if (PLAYER.car.speed > 2) return; exitCar(); }
  obispoStartGame(m, S.o, S.c);
}
const O_SEMINARIO = { court: 'mayex', rival: [{ name: 'H. TOMÁS', look: SEMINARISTAS[0] }, { name: 'H. LUCAS', look: SEMINARISTAS[1] }], rivalName: 'SEMINARIO', time: 120, lv: 0.15, tutorial: true, prize: 350,
  winWho: 'Hermano Tomás', winLine: (s) => `${s[0]} a ${s[1]}... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo.`, loseLine: 'Os han ganado los seminaristas. ¡A rezar y a entrenar!' };
const O_CRISTO = { court: 'publica', rival: [{ name: 'EL NENE', look: CRISTO_TEAM[0] }, { name: 'YERAY', look: CRISTO_TEAM[1] }], rivalName: 'EL CRISTO', time: 150, lv: 0.45, tutorial: false, prize: 600,
  winWho: OBISPO, winLine: (s) => `${s[0]} a ${s[1]}. ¡Aleluya! Con esto pagamos el andamio. La próxima vez, fútbol: el Señor también es del Tenerife.`, loseLine: 'Los del Cristo os han ganado. Monseñor dice que recéis menos y defendáis más.' };
const M_OBISPO_1 = {
  title: 'Un partido por la Catedral', who: OBISPO,
  hint() { return 'Monseñor ' + MISSIONS.kit.bold('Truchas') + ' te espera en el ' + MISSIONS.kit.bold('Obispado') + ' (Calle San Agustín)'; },
  startPos() { if (!OBISPADO.front) return [0, 0]; const p = [OBISPADO.front[0] + OBISPADO.nx * 1.4, OBISPADO.front[1] + OBISPADO.nz * 1.4]; return inAnyBuilding(p[0], p[1]) ? safeSpot(p[0], p[1], 0.8) : p; },
  start() { const K = MISSIONS.kit, c = obispoCourt('mayex');
    K.talk([[OBISPO, 'Pasa, hijo, pasa. Soy Fermín Truchas, obispo de Nivaria por la gracia de Dios y por un error administrativo del Vaticano.'],
      [OBISPO, 'Me han dicho que tu banda ayuda al alcalde. Pues el Señor también tiene goteras: el tejado de la Catedral, el campanario de La Concepción, el órgano de Santo Domingo que suena como una guagua…'],
      [K.CH, '¿Y qué quiere, Monseñor? ¿Que robe un banco? Que yo eso ya lo dejé.'],
      [OBISPO, '¡Válgame! No, no. Partidos benéficos. La gente paga por ver. Hoy jugáis en ' + (c ? 'el patio del ' + c.label : 'la cancha') + ' contra mis seminaristas, el hermano Tomás y el hermano Lucas. Las monjas os abren la puerta.'],
      [OBISPO, 'Son buenos chicos, pero tiran a canasta como rezan: con los ojos cerrados. Llévate a Coco, que tiene brazos de boxeador. Lo recaudado, para la obra de la iglesia… y una parte para vosotros, que el obrero merece su salario. Lucas 10,7.']],
      () => obispoGame(this, O_SEMINARIO));
  },
  update() { obispoGameUpdate(this); },
};
const M_OBISPO_2 = {
  title: 'El torneo de la parroquia', who: OBISPO,
  hint() { return 'Monseñor ' + MISSIONS.kit.bold('Truchas') + ' tiene otro partido: ve al ' + MISSIONS.kit.bold('Obispado'); },
  startPos() { return M_OBISPO_1.startPos(); },
  start() { const K = MISSIONS.kit, c = obispoCourt('publica');
    K.talk([[OBISPO, '¡Hijo mío! Con lo del otro día arreglamos tres tejas. Faltan cuatrocientas. Y una paloma que vive en el campanario y tiene más derechos que yo.'],
      [OBISPO, 'Esta vez os toca contra los del Cristo, los de la camiseta granate, en ' + (c ? c.label : 'la cancha') + '. Juegan sucio: empujan. Pero el Señor dijo «pon la otra mejilla», no «deja que te metan un mate».'],
      [K.CH, 'Tranquilo, Monseñor, que el turbo también es de Dios.']], () => obispoGame(this, O_CRISTO));
  },
  update() { obispoGameUpdate(this); },
};
MISSIONS.addObispo([M_OBISPO_1, M_OBISPO_2]);
