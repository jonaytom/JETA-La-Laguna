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
// ---------- the Obispado: the Casa Salazar on Calle San Agustín (v0.72, docs/referencias/casa_salazar/): two storeys of
// dark volcanic ashlar; ground floor: big windows behind iron grilles with a band of rosettes and a carved cresting on
// top; first floor: balconies on corbels with forged railings and a small pediment over each window; the portal in the
// middle with paired fluted columns on carved pedestals, a balcony window above it framed by more paired columns, and a
// baroque crest with the coat of arms and pinnacles over the cornice; through the open door you see the zaguán and the
// patio with its wooden gallery. The corner towers come from the landmark (05k_landmarks.js, 'towers2').
function obispadoTex(kind) {
  const W = { grille: [256, 384], crest: [256, 96], rail: [256, 128], win: [128, 224], zaguan: [256, 384] }[kind], c = mkCanvas(W[0], W[1]), x = c.getContext('2d');
  if (kind === 'grille') { x.strokeStyle = '#5d6166'; x.lineWidth = 7; for (let k = 0; k <= 10; k++) { const xx = 8 + k * 24; x.beginPath(); x.moveTo(xx, 0); x.lineTo(xx, 384); x.stroke(); }
    x.lineWidth = 10; for (const y of [6, 378]) { x.beginPath(); x.moveTo(0, y); x.lineTo(256, y); x.stroke(); }
    x.fillStyle = '#5d6166'; x.fillRect(0, 222, 256, 20); for (let k = 0; k < 10; k++) { x.beginPath(); x.arc(14 + k * 25, 232, 9, 0, 7); x.fill(); } }
  if (kind === 'crest') { x.strokeStyle = '#5d6166'; x.lineWidth = 7; x.beginPath(); x.moveTo(4, 92); x.lineTo(252, 92); x.stroke();
    for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) { const cx = 128 + sx * (22 + k * 36), r = 26 - k * 5; x.beginPath(); x.arc(cx, 92 - r, r, sx > 0 ? Math.PI : 0, sx > 0 ? Math.PI * 2.6 : -Math.PI * 1.6, sx < 0); x.stroke(); }
    x.beginPath(); x.arc(128, 40, 22, 0, 7); x.stroke(); x.beginPath(); x.moveTo(128, 18); x.lineTo(128, 2); x.stroke(); }
  if (kind === 'rail') { x.strokeStyle = '#2b2d30'; x.lineWidth = 8; for (const y of [6, 122]) { x.beginPath(); x.moveTo(0, y); x.lineTo(256, y); x.stroke(); } x.lineWidth = 4; for (let k = 0; k <= 32; k++) { x.beginPath(); x.moveTo(4 + k * 7.8, 6); x.lineTo(4 + k * 7.8, 122); x.stroke(); }
    x.lineWidth = 3; for (let k = 0; k < 16; k++) { x.beginPath(); x.arc(8 + k * 16, 108, 6, 0, 7); x.stroke(); } }
  if (kind === 'win') { x.fillStyle = '#5a2e1a'; x.fillRect(0, 0, 128, 224); x.fillStyle = '#2c3a44'; for (let r = 0; r < 4; r++) for (let k = 0; k < 2; k++) x.fillRect(12 + k * 56, 12 + r * 52, 48, 44); x.fillStyle = 'rgba(190,215,230,.25)'; x.fillRect(12, 12, 104, 50); }
  if (kind === 'zaguan') { x.fillStyle = '#ece6d8'; x.fillRect(0, 0, 256, 384); x.fillStyle = '#5b3a22'; for (let k = 0; k < 9; k++) x.fillRect(0, k * 14, 256, 8); // wooden ceiling
    x.fillStyle = '#4c4a46'; x.fillRect(0, 300, 256, 84); x.fillStyle = '#7fa35a'; x.fillRect(70, 150, 116, 160); x.fillStyle = '#d9c39a'; x.fillRect(70, 150, 116, 30); x.fillStyle = '#6b4123'; for (let k = 0; k < 5; k++) x.fillRect(74 + k * 27, 150, 6, 50); // patio with the gallery
    x.strokeStyle = '#1c1c1c'; x.lineWidth = 4; for (let k = 0; k <= 8; k++) { x.beginPath(); x.moveTo(70 + k * 14.5, 160); x.lineTo(70 + k * 14.5, 310); x.stroke(); } x.beginPath(); x.arc(128, 165, 58, Math.PI, 0); x.stroke(); }
  return canvasTex(c, { repeat: false });
}
function buildObispado() {
  const b = findBuilding('Casa Salazar'); if (!b) return;
  const P = b.pts, n = P.length, flat = P.flat(); let E = null, best = -1;
  for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 6) continue;
    let nx = (q[1] - p[1]) / L, nz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; if (pip(mx + nx * 0.4, mz + nz * 0.4, flat)) { nx = -nx; nz = -nz; } /* outward from THIS house (v0.65.1: a neighbour used to flip it inwards) */
    if (inAnyBuilding(mx + nx * 3, mz + nz * 3)) continue; /* the street must be in front */
    const rd = ROADSEG.nearest(mx + nx * 4, mz + nz * 4); if (!rd || rd.d > 9) continue; const nm = DATA.R[rd.ri][1] >= 0 ? STR[DATA.R[rd.ri][1]] : '';
    const sc = L + (/Agust/i.test(nm) ? 100 : 0); if (sc > best) { best = sc; E = { p, q, L, nx, nz, mx, mz }; } }
  if (!E) return;
  const ang = Math.atan2(E.nx, E.nz), g0 = Math.min(heightAt(E.p[0], E.p[1]), heightAt(E.q[0], E.q[1])), L = E.L;
  const fr = cFrame(E.mx, g0, E.mz, ang); const at = (u, y, o) => new THREE.Vector3(u, y, o).applyMatrix4(fr(0, 0, 0));
  const root = new THREE.Group(); root.name = 'obispado'; const B = concBuckets();
  const stone = new THREE.MeshStandardMaterial({ color: 0x8a857c, map: aytoStoneTex(), roughness: 0.92 }), carved = M(0x77736b, 0.9), wood = M(0x4a2c17, 0.8), glassD = M(0x1d2328, 0.35, 0.3);
  const alpha = (t) => new THREE.MeshStandardMaterial({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.6, metalness: 0.4 });
  const mGrille = alpha(obispadoTex('grille')), mCrest = alpha(obispadoTex('crest')), mRail = alpha(obispadoTex('rail'));
  const mWin = new THREE.MeshStandardMaterial({ map: obispadoTex('win'), roughness: 0.7 }), mZag = new THREE.MeshStandardMaterial({ map: obispadoTex('zaguan'), roughness: 0.9 });
  const plane = (w, h, mat, x, y, z, ry = 0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.applyMatrix4(fr(x, y, z, ry)); root.add(m); return m; };
  const box = (w, h, d, mat, x, y, z) => B.geo(cBox(w, h, d), mat, fr(x, y, z));
  const col = (r, h, x, y, z, mat = carved) => B.geo(new THREE.CylinderGeometry(r * 0.9, r, h, 12), mat, fr(x, y + h / 2, z));
  const pin = (x, y, z, s = 1) => { B.geo(new THREE.ConeGeometry(0.2 * s, 1.0 * s, 8), carved, fr(x, y + 0.5 * s, z)); B.geo(new THREE.SphereGeometry(0.12 * s, 8, 6), carved, fr(x, y + 1.05 * s, z)); };
  // dark ashlar over the whole front (a plane 14 cm off the wall: a box touching it flickered, v0.65.1), plinth, string course, cornice
  const fh = Math.max(9, Math.min(11, (b.top || g0 + 10) - g0)); stone.polygonOffset = true; stone.polygonOffsetFactor = -2; stone.polygonOffsetUnits = -2;
  stone.map.repeat.set(L / 4, fh / 4); stone.map.anisotropy = 4; plane(L - 0.2, fh, stone, 0, fh / 2, 0.14);
  box(L - 0.2, 0.7, 0.3, carved, 0, 0.35, 0.25); box(L - 0.2, 0.3, 0.35, carved, 0, 4.95, 0.3); box(L + 0.3, 0.45, 0.75, carved, 0, fh - 0.1, 0.4); box(L + 0.1, 0.2, 0.5, carved, 0, fh - 0.45, 0.32);
  // portal: zaguán seen through the open door, the two leaves open inwards, paired fluted columns on carved pedestals, entablature with dentils
  plane(2.2, 3.5, mZag, 0, 1.75, 0.16); box(0.12, 3.5, 1.0, wood, -1.05, 1.75, -0.35); box(0.12, 3.5, 1.0, wood, 1.05, 1.75, -0.35);
  box(2.9, 0.35, 0.4, carved, 0, 3.7, 0.3); for (const s of [-1, 1]) box(0.35, 3.6, 0.35, carved, s * 1.28, 1.8, 0.3);
  for (const s of [-1, 1]) for (const k of [1.75, 2.35]) { box(0.65, 1.1, 0.65, carved, s * k, 0.55, 0.55); col(0.22, 3.2, s * k, 1.1, 0.55); box(0.6, 0.3, 0.6, carved, s * k, 4.45, 0.55); }
  box(5.8, 0.5, 0.95, carved, 0, 4.85, 0.55); for (let x = -2.7; x <= 2.71; x += 0.36) box(0.16, 0.16, 0.16, carved, x, 4.52, 1.05);
  // central balcony with the window framed by paired columns, crest with the coat of arms and pinnacles above the cornice
  box(4.4, 0.18, 1.0, carved, 0, 5.25, 0.65); plane(4.3, 1.0, mRail, 0, 5.85, 1.12); for (const s of [-1, 1]) plane(0.95, 1.0, mRail, s * 2.15, 5.85, 0.65, Math.PI / 2);
  plane(1.5, 2.6, mWin, 0, 6.65, 0.18); for (const s of [-1, 1]) for (const k of [1.1, 1.55]) col(0.15, 3.3, s * k, 5.3, 0.4);
  box(3.8, 0.4, 0.6, carved, 0, 8.8, 0.4);
  { const sh = new THREE.Shape(); sh.moveTo(-2.6, 0); sh.lineTo(2.6, 0); sh.lineTo(2.6, 0.6); sh.quadraticCurveTo(2.4, 1.6, 1.3, 1.5); sh.quadraticCurveTo(0.9, 2.6, 0, 2.9); sh.quadraticCurveTo(-0.9, 2.6, -1.3, 1.5); sh.quadraticCurveTo(-2.4, 1.6, -2.6, 0.6); sh.closePath();
    const ge = new THREE.ExtrudeGeometry(sh, { depth: 0.5, bevelEnabled: false, curveSegments: 6 }); ge.translate(0, 0, -0.1); B.geo(ge, stone, fr(0, fh + 0.15, 0.2));
    pin(0, fh + 3.0, 0.45, 1.2); for (const s of [-1, 1]) { pin(s * 2.4, fh + 0.75, 0.45); pin(s * 1.3, fh + 1.55, 0.45, 0.9); } }
  { const c = mkCanvas(128, 160), x = c.getContext('2d'); x.fillStyle = '#6d6a63'; x.fillRect(0, 0, 128, 160); x.fillStyle = '#7e2a8c'; x.beginPath(); x.moveTo(16, 20); x.lineTo(112, 20); x.lineTo(112, 90); x.quadraticCurveTo(64, 150, 16, 90); x.closePath(); x.fill();
    x.fillStyle = '#f2d36b'; x.fillRect(58, 34, 12, 72); x.fillRect(38, 52, 52, 12); x.strokeStyle = '#3a3733'; x.lineWidth = 5; x.stroke();
    plane(1.0, 1.25, new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), roughness: 0.8 }), 0, fh + 1.45, 0.72); }
  // side bays: grilled windows with cresting below, balconies with pediments above; pinnacles over the cornice at each bay
  const half = L / 2 - 4.6, nb = Math.max(1, Math.floor((half - 3.0) / 3.9 + 1));
  for (const s of [-1, 1]) for (let i = 0; i < nb; i++) { const u = s * (3.6 + (i + 0.5) * Math.min(3.9, (half - 3.0) / nb + 0.0001)); if (Math.abs(u) > half + 1) continue;
    plane(1.7, 2.7, mWin, u, 2.25, 0.17); plane(2.1, 3.0, mGrille, u, 2.2, 0.55); for (const k of [-1, 1]) plane(0.4, 3.0, mGrille, u + k * 1.05, 2.2, 0.36, Math.PI / 2);
    plane(2.3, 0.8, mCrest, u, 4.1, 0.55); box(2.0, 0.12, 0.5, carved, u, 3.72, 0.4);
    box(1.9, 0.16, 0.8, carved, u, 5.4, 0.55); for (const k of [-0.7, 0, 0.7]) box(0.18, 0.4, 0.6, carved, u + k, 5.12, 0.45); plane(1.9, 0.95, mRail, u, 5.95, 0.93); for (const k of [-1, 1]) plane(0.75, 0.95, mRail, u + k * 0.95, 5.95, 0.55, Math.PI / 2);
    plane(1.25, 2.4, mWin, u, 6.75, 0.17); for (const k of [-1, 1]) box(0.22, 2.7, 0.22, carved, u + k * 0.8, 6.8, 0.25);
    { const sh = new THREE.Shape(); sh.moveTo(-1.05, 0); sh.lineTo(1.05, 0); sh.lineTo(0, 0.55); sh.closePath(); B.geo(new THREE.ExtrudeGeometry(sh, { depth: 0.3, bevelEnabled: false }), carved, fr(u, 8.25, 0.15)); box(2.2, 0.18, 0.4, carved, u, 8.18, 0.3); }
    pin(u, fh + 0.15, 0.5, 0.8); }
  B.finish(root); scene.add(root);
  const door = at(0, 0, 1.6); let front = [door.x + E.nx * 1.6, door.z + E.nz * 1.6];
  if (inAnyBuilding(front[0], front[1]) || COL.nearSeg(front[0], front[1], 0.6)) front = safeSpot(front[0], front[1], 0.6); // v0.65.1: always reachable, out in the street
  Object.assign(OBISPADO, { ok: true, door: [door.x, door.z], nx: E.nx, nz: E.nz, front, bays: nb * 2, L });
  for (const s of [-1, 1]) for (const k of [1.75, 2.35]) { const p = at(s * k, 0, 0.55); COL.addCirc(p.x, p.z, 0.35); }
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
  return COURTS.filter((c) => c.gate === 'court' && !c.final && c.sport !== 'fut').sort((a, b) => a.dist - b.dist)[0] || null;
}
const shortName = () => { const g = (MISSIONS.gang && MISSIONS.gang.name) || ''; const s = g.replace(/^(Los|Las|La|El)\s+/i, '').toUpperCase(); return (s || 'JETA').slice(0, 11); };
function obispoStartGame(m, o, c) {
  const K = MISSIONS.kit; m.st.step = 2; K.clearBeacon(); K.setObjective(null);
  const fut = o.sport === 'fut', play = fut ? playFieldGame : playCourtGame;
  play(c, { rival: o.rival, rivalName: o.rivalName, time: o.time, lv: o.lv, tutorial: o.tutorial, style: c.style, kit: o.kit,
    onEnd: (r) => { if (!K.isActive(m)) return; if (r.won) { K.talk([[o.winWho, o.winLine(r.score)]], () => { K.pass(m.title, o.prize);
      if (fut && o.tutorial && !MISSIONS.gang.futbolTut) { MISSIONS.gang.futbolTut = true; setTimeout(() => HUD.toast('Ya puedes retar a la gente en cualquier campo de fútbol (E, balón blanco).', '#7fe08a', 7), 4500); }
      if (!fut && o.tutorial && !MISSIONS.gang.basketTut) { MISSIONS.gang.basketTut = true; MISSIONS.refresh(); setTimeout(() => HUD.toast('Ya puedes retar a la gente en cualquier cancha (E) y se abre el TORNEO LAGUNERO (círculo naranja).', '#ff9f43', 7), 4500); } }); } else K.fail(o.loseLine); } });
}
function obispoGame(m, o) {
  const K = MISSIONS.kit, c = o.sport === 'fut' ? obispoCampo() : obispoCourt(o.court); if (!c) { K.abort(o.sport === 'fut' ? 'No encuentro ningún campo de fútbol cerca.' : 'No encuentro ninguna cancha de baloncesto cerca.'); return; }
  m.st = { step: 1, c, o };
  if (c.gate === 'door') { m.gate = c.id; m.onGate = () => { if (m.st && m.st.step === 1) obispoStartGame(m, o, c); }; K.goto(c.x, c.z, 2.2, 0xb388ff); K.setObjective(`Ve con Coco al ${K.bold(c.label)} (${c.street || 'la calle'}) y entra con ${CONTROLS.kbd('use')}`); }
  else { m.gate = null; K.goto(c.cx, c.cz, o.sport === 'fut' ? 10 : 6, 0xb388ff); K.setObjective(o.sport === 'fut' ? `Ve con la banda a ${K.bold(c.label)} para el partido` : `Ve a ${K.bold(c.label)} con Coco para el partido`); }
}
function obispoGameUpdate(m) {
  const K = MISSIONS.kit, S = m.st; if (!S || S.step !== 1 || S.c.gate === 'door') return; const g = K.data.goal; if (!g || Math.hypot(PLAYER.x - g[0], PLAYER.z - g[1]) > (S.o.sport === 'fut' ? 12 : 7)) return;
  if (PLAYER.car) { if (PLAYER.car.speed > 2) return; exitCar(); }
  obispoStartGame(m, S.o, S.c);
}
const O_SEMINARIO = { court: 'mayex', rival: [{ name: 'H. TOMÁS', look: SEMINARISTAS[0] }, { name: 'H. LUCAS', look: SEMINARISTAS[1] }], rivalName: 'SEMINARIO', time: 120, lv: 0.08, tutorial: true, prize: 350,
  winWho: 'Hermano Tomás', winLine: (s) => `${s[0]} a ${s[1]}... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo.`, loseLine: 'Os han ganado los seminaristas. ¡A rezar y a entrenar!' };
const O_CRISTO = { court: 'publica', rival: [{ name: 'EL NENE', look: CRISTO_TEAM[0] }, { name: 'YERAY', look: CRISTO_TEAM[1] }], rivalName: 'EL CRISTO', time: 150, lv: 0.32, tutorial: false, prize: 600,
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
// ---------- v0.67: football. The gang (El Blanco in goal) against the seminarians (tutorial) and then the cofradías
const SEMI_FUT = ['H. MATEO', 'H. TOMÁS', 'H. LUCAS', 'H. JUAN', 'H. MARCOS'].map((name, i) => ({ name, look: SEMINARISTAS[i % 2] }));
const COFRADES = ['DON CHANO', 'PEPE EL VARAL', 'CAPATAZ', 'MONAGUILLO', 'EL CIRIO'].map((name, i) => ({ name, look: CRISTO_TEAM[i % 2] }));
const O_FUT_SEMI = { sport: 'fut', rival: SEMI_FUT, rivalName: 'SEMINARIO', kit: { shirt: '#111', shorts: '#111', socks: '#111', stripe: '#f2f2f2', gk: { shirt: '#7e2a8c', shorts: '#111', socks: '#7e2a8c' } }, time: 150, lv: 0.06, tutorial: true, prize: 400,
  winWho: 'Hermano Mateo', winLine: (s) => `${s[0]} a ${s[1]}. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.`, loseLine: 'Os han ganado los seminaristas. Monseñor dice que la Fe mueve montañas, pero no el balón.' };
const O_FUT_COFRADES = { sport: 'fut', rival: COFRADES, rivalName: 'COFRADES', kit: { shirt: '#7a1f1f', shorts: '#f2f2f2', socks: '#7a1f1f', gk: { shirt: '#f2f2f2', shorts: '#7a1f1f', socks: '#f2f2f2' } }, time: 180, lv: 0.28, tutorial: false, prize: 700,
  winWho: OBISPO, winLine: (s) => `${s[0]} a ${s[1]}. ¡Gloria! Con esto se arregla el órgano de Santo Domingo. Ya no sonará como una guagua… sonará como un camión.`, loseLine: 'Los cofrades os han ganado. Llevan siglos cargando tronos: tienen piernas.' };
const M_OBISPO_3 = {
  title: 'Un partido por La Concepción', who: OBISPO,
  hint() { return 'Monseñor ' + MISSIONS.kit.bold('Truchas') + ' quiere hablarte de fútbol: ve al ' + MISSIONS.kit.bold('Obispado'); },
  startPos() { return M_OBISPO_1.startPos(); },
  start() { const K = MISSIONS.kit, c = obispoCampo();
    K.talk([[OBISPO, 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.'],
      [OBISPO, 'Esta vez fútbol. Cinco contra cinco en ' + (c ? c.label : 'el campo') + ', contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.'],
      [K.CH, '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.'],
      [OBISPO, 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.']],
      () => obispoGame(this, O_FUT_SEMI));
  },
  update() { obispoGameUpdate(this); },
};
const M_OBISPO_4 = {
  title: 'El clásico de las cofradías', who: OBISPO,
  hint() { return 'Monseñor ' + MISSIONS.kit.bold('Truchas') + ' tiene otro partido de fútbol: ve al ' + MISSIONS.kit.bold('Obispado'); },
  startPos() { return M_OBISPO_1.startPos(); },
  start() { const K = MISSIONS.kit, c = obispoCampo();
    K.talk([[OBISPO, '¡El campanario ya está derecho! Bueno, menos torcido. Ahora el órgano de Santo Domingo, que suena como una guagua subiendo La Cuesta.'],
      [OBISPO, 'Los de las cofradías os retan en ' + (c ? c.label : 'el campo') + '. Granate y blanco. Son mayores, pero llevan toda la vida cargando tronos en Semana Santa: no se cansan.'],
      [K.CH, 'Tranquilo, Monseñor. Coco, tú en el medio; Boca, que no pase nadie.']], () => obispoGame(this, O_FUT_COFRADES));
  },
  update() { obispoGameUpdate(this); },
};
MISSIONS.addObispo([M_OBISPO_1, M_OBISPO_2, M_OBISPO_3, M_OBISPO_4]);
