// ============ Campos de fútbol: entradas y partidos (v0.67) ============
// Every football pitch (fútbol 11, fútbol 7 and the futsal courts) gets an entrance, like the basketball courts: on an
// open pitch you walk on and press E; one shut in by buildings or inside a school has a door on the street. The
// football games (FUTBOL2D, 5 a side) open with the Obispo's third mission (the football tutorial); after it any pitch
// can be challenged (levels 1–5). The gang plays: El Blanco in goal, Boca Papa and Sastrón at the back, Coco in the
// middle and you up front.
let FOOT_ICON = null;
function footIcon(x, z, y = 3.2) {
  if (!FOOT_ICON) { const c = mkCanvas(64, 64), g = c.getContext('2d'); g.fillStyle = '#f4f4f4'; g.beginPath(); g.arc(32, 32, 26, 0, 7); g.fill(); g.strokeStyle = '#222'; g.lineWidth = 3; g.beginPath(); g.arc(32, 32, 26, 0, 7); g.stroke();
    g.fillStyle = '#222'; g.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5; g.lineTo(32 + Math.cos(a) * 9, 32 + Math.sin(a) * 9); } g.closePath(); g.fill();
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5; g.beginPath(); g.arc(32 + Math.cos(a) * 22, 32 + Math.sin(a) * 22, 5, 0, 7); g.fill(); }
    FOOT_ICON = new THREE.SpriteMaterial({ map: canvasTex(c, { repeat: false }), transparent: true, depthWrite: false, fog: false }); }
  const s = new THREE.Sprite(FOOT_ICON); s.scale.set(1.0, 1.0, 1); s.position.set(x, heightAt(x, z) + y, z); scene.add(s); return s;
}
function camposInit() {
  const o = (typeof OBISPADO !== 'undefined' && OBISPADO.front) || [0, 0]; let n = 0;
  for (const P of SPORTS.pitches) {
    if (P.kind !== 'f11' && P.kind !== 'f7' && P.kind !== 'fs') continue;
    const rd = roadNear(P.cx, P.cz); let shut = !rd; if (rd) { const L = Math.hypot(P.cx - rd.x, P.cz - rd.z); for (let t = 0.15; t < 0.85 && !shut; t += 0.7 / Math.max(3, L)) if (inAnyBuilding(rd.x + (P.cx - rd.x) * t, rd.z + (P.cz - rd.z) * t)) shut = true; }
    const school = BUILD.find((b) => b.name && SCHOOL_RE.test(b.name) && Math.hypot(b.cx - P.cx, b.cz - P.cz) < 90);
    const h = Math.abs(Math.sin(P.cx * 5.3 + P.cz * 2.9) * 9999) % 1; const level = 1 + Math.floor(h * 5);
    const what = P.kind === 'fs' ? 'la pista de fútbol sala' : 'el campo de fútbol';
    const c = { id: 'f' + n++, sport: 'fut', cx: P.cx, cz: P.cz, F: P.F, len: P.len, wid: P.wid, kind: P.kind, level, street: roadName(rd), dist: Math.hypot(P.cx - o[0], P.cz - o[1]) };
    if (shut || school || inAnyBuilding(P.cx, P.cz)) { const base = school || { cx: P.cx, cz: P.cz }; const d = streetDoor(base.cx, base.cz); if (!d) continue;
      Object.assign(c, { gate: 'door', x: d.x, z: d.z, label: school ? school.name : what + ' (entrada por ' + (d.street || 'la calle') + ')' }); }
    else Object.assign(c, { gate: 'court', x: P.cx, z: P.cz, label: what + (c.street ? ' de ' + c.street : '') });
    c.icon = footIcon(c.x, c.z, c.gate === 'door' ? 3.0 : 4.6); COURTS.push(c);
  }
  // v0.75: the Estadio Francisco Peraza: its door on the street (05v_peraza.js) only opens for the Copa Laguna final
  if (typeof PERAZA !== 'undefined' && PERAZA.door) { let c = COURTS.find((q) => q.sport === 'fut' && Math.hypot(q.cx - PERAZA.cx, q.cz - PERAZA.cz) < 30);
    if (!c) { c = { id: 'f' + n++, sport: 'fut', cx: PERAZA.cx, cz: PERAZA.cz, kind: 'f11', dist: Math.hypot(PERAZA.cx - o[0], PERAZA.cz - o[1]) }; COURTS.push(c); }
    if (c.icon && c.icon.parent) c.icon.parent.remove(c.icon);
    Object.assign(c, { id: 'peraza', gate: 'door', x: PERAZA.door[0], z: PERAZA.door[1], label: 'Estadio Francisco Peraza', street: PERAZA.street || c.street, level: 5, final: true, F: null }); c.icon = footIcon(c.x, c.z, 3.4); }
  copaInit();
}
// ---------- Copa Laguna (v0.75, Jonay): the football tournament, like the Torneo Lagunero of basketball: 4 pitches
// round town (each harder) and the final in the Estadio Francisco Peraza. Opens after the Obispo's football game.
const COPA_TEAMS = [
  { name: 'Atlético Gofio de Geneto', short: 'AT. GOFIO', cap: 'Míster Cholo Pérez', lv: 0.3, prize: 350, kit: { shirt: '#c0392b', shorts: '#f2f2f2', socks: '#c0392b', stripe: '#f2f2f2' } },
  { name: 'Unión Perenquén de Finca España', short: 'PERENQUÉN', cap: 'Yeray «el Lagarto»', lv: 0.4, prize: 500, kit: { shirt: '#27ae60', shorts: '#222', socks: '#27ae60' } },
  { name: 'Deportivo Papas Arrugadas de Valle Guerra', short: 'PAPAS ARR.', cap: 'Don Fefo', lv: 0.5, prize: 700, kit: { shirt: '#f1c40f', shorts: '#6d3b16', socks: '#6d3b16' } },
  { name: 'Real Mojo Tejina Balompié', short: 'REAL MOJO', cap: 'Iballa la entrenadora', lv: 0.62, prize: 900, kit: { shirt: '#8e44ad', shorts: '#f2f2f2', socks: '#8e44ad' } },
  { name: 'Los Galácticos de Guamasa', short: 'GALÁCTICOS', cap: 'Florentino Guanche', lv: 0.76, prize: 2000, kit: { shirt: '#f2f2f2', shorts: '#f2f2f2', socks: '#f2f2f2', stripe: '#d4af37' } },
];
function copaInit() {
  const fin = COURTS.find((c) => c.sport === 'fut' && c.final); const ob = obispoCampo();
  const pub = COURTS.filter((c) => c.sport === 'fut' && !c.final && c !== ob && c.kind !== 'fs').sort((a, b) => a.dist - b.dist);
  const chosen = []; for (const sp of [450, 300, 150, 0]) { for (const c of pub) { if (chosen.length >= 4) break; if (chosen.includes(c)) continue; if (chosen.every((q) => Math.hypot(q.cx - c.cx, q.cz - c.cz) >= sp)) chosen.push(c); } if (chosen.length >= 4) break; }
  if (!chosen.length || !fin) return;
  const list = COPA_TEAMS.map((t, i) => { const finalGame = i === 4; const c = finalGame ? fin : chosen[i % chosen.length];
    const rival = [0, 1, 2, 3, 4].map((k) => ({ name: (k === 0 ? 'PORTERO' : t.short.slice(0, 7) + ' ' + (k + 1)), look: RIVAL_LOOKS[(i * 2 + k) % RIVAL_LOOKS.length] }));
    return { title: finalGame ? 'Copa Laguna: la final' : `Copa Laguna ${i + 1}/5`, who: t.cap, court: c,
      hint() { return `${t.name} os esperan en ${MISSIONS.kit.bold(finalGame ? 'el Estadio Francisco Peraza' : c.label)}`; },
      startPos() { return [c.x, c.z]; },
      start() { const K = MISSIONS.kit;
        const lines = finalGame ? [[t.cap, 'La final de la Copa Laguna, en el Francisco Peraza, con gradas, megafonía y hasta el concejal en el palco. Nosotros no perdemos aquí desde que se inventó el gofio.'], ['El Blanco', 'Brrr... ¡portería a cero!... mmm... pssst.'], [K.CH, 'Ya lo habéis oído. El Blanco no deja pasar ni el aire. ¡A por la copa!']]
          : [[t.cap, `¿Vosotros sois los de la Copa? Somos ${t.name}. Aquí se juega al fútbol de verdad, no al de los videojuegos.`], ['Boca Papa', 'Chopa, yo atrás no dejo pasar a nadie. Bueno, a nadie que no me invite a un barraquito.']];
        K.talk(lines, () => { if (!K.isActive(this)) return;
          playFieldGame(c, { rival, rivalName: t.short, kit: t.kit, lv: t.lv, time: finalGame ? 210 : 160,
            onEnd: (r) => { if (!K.isActive(this)) return; if (r.won) { if (finalGame) HUD.big('¡CAMPEONES DE LA COPA LAGUNA!', '#26d07c', 6); K.pass(this.title, t.prize); } else K.fail(finalGame ? 'Habéis perdido la final. Volved a intentarlo en el Francisco Peraza.' : `${t.name} os han ganado.`); } }); }); },
      update() { } };
  });
  MISSIONS.addCopa(list);
}
// the Obispo's pitch: the nearest real football field (11 or 7) you can walk onto, else any
function obispoCampo() {
  const f = COURTS.filter((c) => c.sport === 'fut'); if (!f.length) return null;
  return f.filter((c) => c.gate === 'court' && c.kind !== 'fs').sort((a, b) => a.dist - b.dist)[0] || f.sort((a, b) => a.dist - b.dist)[0];
}
const lookOf = (k) => (NPC[k] && NPC[k].H && NPC[k].H.look ? { ...NPC[k].H.look } : {});
function gangTeam() { // [keeper, 2 defenders, midfielder, striker]
  return [{ name: 'EL BLANCO', look: lookOf('blanco') }, { name: 'BOCA PAPA', look: lookOf('boca') }, { name: 'SASTRÓN', look: lookOf('sastron') },
    { name: 'COCO', look: cocoLook() }, { name: 'EL CHOPA', look: { ...(playerHuman.look || {}) } }];
}
const FOOT_RIVAL_KITS = [
  { shirt: '#1d4f9c', shorts: '#f2f2f2', socks: '#1d4f9c' }, { shirt: '#f1c40f', shorts: '#1d4f9c', socks: '#f1c40f' }, { shirt: '#f2f2f2', shorts: '#222', socks: '#f2f2f2', stripe: '#c0392b' },
  { shirt: '#8e44ad', shorts: '#f2f2f2', socks: '#8e44ad' }, { shirt: '#e67e22', shorts: '#222', socks: '#222' },
];
function playFieldGame(c, o) { // o: rival (5), rivalName, kit, lv, time, tutorial, onEnd
  if (PLAYER.car) exitCar();
  const looks = RIVAL_LOOKS; const rival = o.rival || [0, 1, 2, 3, 4].map((k) => ({ name: ['PORTERO', 'EL ALTO', 'EL BAJO', 'EL RUBIO', 'EL NUEVE'][k], look: looks[(k * 3 + Math.floor(c.cx)) % looks.length] }));
  return FUTBOL2D.start({ team: gangTeam(), rival, teamName: typeof shortName === 'function' ? shortName() : 'JETA', rivalName: o.rivalName || 'RIVALES', kit: o.ourKit, rivalKit: o.kit, time: o.time || 180, lv: o.lv, mateLv: 0.6, tutorial: !!o.tutorial, onEnd: o.onEnd });
}
function useFieldGate(c) {
  const A = MISSIONS.active;
  if (A && A.gate === c.id && A.onGate) { A.onGate(c); return; }
  if (A) { HUD.toast('Termina primero la misión que llevas.', '#f5b72e', 3); return; }
  if (c.final) { HUD.toast('El Estadio Francisco Peraza solo abre para la final de la Copa Laguna.', '#26d07c', 4); return; }
  if (!MISSIONS.gang.futbolTut) { HUD.toast('Aquí se juega al fútbol. Primero aprende: Monseñor Truchas, en el Obispado, organiza partidos benéficos.', '#b388ff', 5); return; }
  const prize = 50 * c.level, kit = FOOT_RIVAL_KITS[(c.level + Math.floor(Math.abs(c.cx))) % FOOT_RIVAL_KITS.length];
  DLG.show(c.label, 'Partido 5 contra 5', `Los del barrio os retan: la banda contra ellos. <b>Nivel ${c.level}/5</b>. Si ganáis: <b>$${prize}</b>.`, '¿Jugáis?', ['Jugar', 'Ahora no'], (i) => {
    DLG.hide(); if (i !== 0) return;
    playFieldGame(c, { rivalName: (c.street || 'EL BARRIO').replace(/^(Calle|Avenida|Camino|Plaza|Carretera)\s+(de\s+(la\s+|los\s+|las\s+|el\s+)?)?/i, '').toUpperCase().slice(0, 11), kit, lv: 0.06 + 0.14 * c.level, time: 150,
      onEnd: (r) => { if (r.won) { PLAYER.money += prize; AUDIO.cash && AUDIO.cash(); HUD.toast(`¡Ganado! +$${prize}`, '#7fe08a', 4); } else HUD.toast(r.score[0] === r.score[1] ? 'Empate. Vuelve cuando quieras.' : 'Os han ganado. Vuelve cuando quieras la revancha.', '#ffb3b3', 4); } });
  });
}
