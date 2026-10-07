// ============ edificios emblemáticos del casco y del campus (sobre los polígonos reales de OSM) ============
// overrides used by buildBuildings (atlas = facade variant, col = wall colour, H = height, quoin = corner stone colour)
const TUFF = [0.55, 0.3, 0.22], BASALT = [0.33, 0.33, 0.32], GSTONE = [0.68, 0.66, 0.62];
const LANDMARKS = [
  // Hospital Universitario de Canarias (05t_hospital.js): the OSM block is the low podium; slab, tower and helipad on top
  { re: /Área de Hospitalización/, atlas: 15, col: '#e8e3d8', H: 10, deco: ['huc'] },
  { re: /Actividades Ambulatorias/, atlas: 15, col: '#d9e2de', deco: ['glass'], label: 'Actividades Ambulatorias (HUC)' },
  { re: /^Urgencias$/, atlas: 15, col: '#f2f2ee', deco: ['salud:URGENCIAS'], label: 'Urgencias HUC' },
  { re: /Alvarado-Bracamonte/, hip: true, atlas: 9, col: '#f4f1e8', H: 9.5, quoin: TUFF, deco: ['portal:tuff'], label: 'Casa de los Capitanes' },
  { re: /Palacio Nava/, hip: true, atlas: 9, col: '#b9b3a8', H: 11.5, quoin: GSTONE, deco: ['portal:grey', 'cornice'] },
  { re: /Casa del Corregidor/, hip: true, atlas: 9, col: '#d6b067', H: 10.5, quoin: GSTONE, deco: ['portal:tuff', 'cornice', 'ayto'], label: 'Casa del Corregidor' }, // the block also holds the town hall: its stone facade is built apart (05s_ayuntamiento.js)
  { re: /Casas Capitulares/, hip: true, atlas: 9, col: '#d9d5cc', H: 9.5, quoin: GSTONE, deco: ['portal:grey'] },
  { re: /Casa Salazar/, hip: true, atlas: 9, col: '#bdb6aa', H: 10.5, quoin: GSTONE, deco: ['portal:grey', 'towers2'], label: 'Casa Salazar' },
  { re: /Casa Lercaro/, hip: true, atlas: 8, col: '#f3efe6', H: 9.5, quoin: BASALT, deco: ['portal:grey'], label: 'Museo de Historia (Casa Lercaro)' },
  { re: /Casa Montañés/, hip: true, atlas: 8, col: '#e7c98a', H: 9.5, quoin: BASALT, deco: ['portal:grey'] },
  { re: /Teatro Leal/, atlas: 7, col: '#efd2c4', H: 15, deco: ['pediment', 'balustrade', 'sign:TEATRO LEAL'] },
  { re: /Mercado de La Laguna/, atlas: 7, col: '#f3efe6', H: 8, deco: ['sign:MERCADO MUNICIPAL', 'balustrade'] },
  { re: /Convento de Santa Clara/, atlas: 6, col: '#f4f1e8', H: 9, deco: ['celosia'], label: 'Monasterio de Santa Clara' },
  { re: /Antigua Iglesia de San Agustín/, atlas: 5, col: '#cfc8bb', H: 12, noRoof: true, deco: ['ruins'], label: 'Ruinas de San Agustín' },
  { re: /Dolores/, atlas: 6, col: '#f4f1e8', H: 8.5, deco: ['espadana'] },
  { re: /Casa Peraza de Ayala|Casa Bigot|Casa Casabuena|Casa Franco de Castilla|Casa de los Marqueses/, hip: true, atlas: 9, quoin: BASALT, deco: ['portal:grey'] },
  { re: /Ciencias Políticas y Sociales/, atlas: 15, col: '#d8d2c6', H: 4.2, noRoof: true, deco: ['pyramid'], label: 'Edificio La Pirámide' },
  { re: /Facultad|Biblioteca General|Pabellón de Gobierno|Instituto de Tecnolog|Instituto Nacional|Instituto de Medicina/, atlas: 15 },
  { re: /Colegio Mayor|Vicerectorado/, atlas: 7, col: '#efe3c4' },
  { re: /Torre Profesor/, atlas: 13 },
];
// buildings identified by position (unnamed in OSM): Santa Catalina's wooden mirador on the plaza
const LANDMARK_AT = [
  { x: -199, z: 266, r: 9, o: { atlas: 15, col: '#f2f2ee', H: 7.5, deco: ['salud:CENTRO DE SALUD LA LAGUNA'], label: 'Centro de Salud La Laguna' } },
  { x: -1175, z: -243, r: 9, o: { atlas: 15, col: '#f2f2ee', H: 7.5, deco: ['salud:CENTRO DE SALUD SAN BENITO'], label: 'Centro de Salud San Benito' } },
  { x: 150, z: -75, r: 12, o: { atlas: 6, col: '#f4f1e8', H: 10, deco: ['celosia'], label: 'Convento de Santa Catalina' } }];
// Finca España, C. Tacoronte (zona del colega de Jonay): bloques de 3-4 plantas color arena / salmón
const FINCA_COLS = ['#e8c9a0', '#e6b08f', '#dcc29a', '#eab7a0', '#e9d3b0'];
function fincaEspanaLook(cx, cz) { if (cx < 1840 || cx > 2080 || cz < 1180 || cz > 1285) return null; return { col: FINCA_COLS[Math.abs(Math.round(cx * 7 + cz * 3)) % FINCA_COLS.length], atlas: 2 }; }
function landmarkFor(name) { for (const L of LANDMARKS) if (L.re.test(name)) return L; return null; }
function landmarkAt(cx, cz) { for (const L of LANDMARK_AT) if (Math.hypot(cx - L.x, cz - L.z) < L.r) return L.o; return fincaEspanaLook(cx, cz); }
const LMQ = [];
// edge of the footprint that faces the street (long and close to a road)
function frontEdge(pts) {
  let best = null, bs = -1e9;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 4) continue;
    const nx = (q[1] - p[1]) / L, nz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; const rd = ROADSEG.nearest(mx + nx * 3, mz + nz * 3); const d = rd ? rd.d : 40;
    const sc = Math.min(L, 30) - d * 1.6; if (sc > bs) { bs = sc; best = { p, q, L, nx, nz, mx, mz, ux: (q[0] - p[0]) / L, uz: (q[1] - p[1]) / L }; } }
  return best;
}
const LMMAT = {
  tuff: new THREE.MeshStandardMaterial({ color: 0x8a4a36, roughness: 0.9 }), grey: new THREE.MeshStandardMaterial({ color: 0x8f8b84, roughness: 0.9 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x4a2c17, roughness: 0.8 }), white: new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.85 }), door: new THREE.MeshStandardMaterial({ color: 0x3b2616, roughness: 0.7 }),
};
function signPlate(text, w, h) { const c = mkCanvas(1024, Math.round(1024 * h / w)); const x = c.getContext('2d'); x.fillStyle = '#efe8d6'; x.fillRect(0, 0, c.width, c.height); let fs = c.height * 0.62; x.font = `600 ${fs}px Oswald, Georgia, serif`; while (x.measureText(text).width > c.width * 0.9) { fs -= 4; x.font = `600 ${fs}px Oswald, Georgia, serif`; } x.fillStyle = '#3a2a1c'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, c.width / 2, c.height / 2); return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), roughness: 0.6 })); }
function buildLandmarkDeco() {
  for (const B of LMQ) {
    const { L, pts, top, bmin, cx, cz } = B; const E = frontEdge(pts); if (!E) continue;
    const g = new THREE.Group(); const gy = heightAt(E.mx, E.mz) - 0.2; const ang = Math.atan2(E.nx, E.nz);
    g.position.set(E.mx, gy, E.mz); g.rotation.y = ang; scene.add(g); // local: +z = out of the facade, x along it
    const H = top - gy;
    const box = (w, h, d, m, x, y, z) => addMesh(g, new THREE.BoxGeometry(w, h, d), m, x, y, z);
    for (const dk of L.deco || []) {
      const [kind, arg] = dk.split(':');
      if (kind === 'portal') { const m = arg === 'tuff' ? LMMAT.tuff : LMMAT.grey; const pw = 3.6, ph = Math.min(H * 0.62, 6.2);
        box(0.55, ph, 0.35, m, -pw / 2, ph / 2, 0.15); box(0.55, ph, 0.35, m, pw / 2, ph / 2, 0.15); box(pw + 1.1, 0.6, 0.45, m, 0, ph + 0.3, 0.18); // pilasters + entablature
        const tri = new THREE.Shape(); tri.moveTo(-pw / 2 - 0.4, 0); tri.lineTo(pw / 2 + 0.4, 0); tri.lineTo(0, 1.1); tri.closePath(); const tg = new THREE.ExtrudeGeometry(tri, { depth: 0.35, bevelEnabled: false }); addMesh(g, tg, m, 0, ph + 0.6, 0);
        box(0.8, 0.8, 0.2, m, 0, ph + 1.05, 0.38); // coat of arms
        const door = new THREE.Mesh(new THREE.PlaneGeometry(pw - 0.55, ph - 0.2), LMMAT.door); door.position.set(0, (ph - 0.2) / 2, 0.06); g.add(door); }
      if (kind === 'pyramid') { // 'La Pirámide' (Campus de Guajara): stepped glass-and-concrete pyramid over the low base
        let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (const p of pts) { a = Math.min(a, p[0]); b = Math.max(b, p[0]); c = Math.min(c, p[1]); d = Math.max(d, p[1]); }
        const pg = new THREE.Group(); pg.position.set(cx, top - 0.1, cz); scene.add(pg); let rIn = 1e9; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L2 = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 || 1; const t = Math.max(0, Math.min(1, ((cx - p[0]) * (q[0] - p[0]) + (cz - p[1]) * (q[1] - p[1])) / L2)); rIn = Math.min(rIn, Math.hypot(cx - p[0] - (q[0] - p[0]) * t, cz - p[1] - (q[1] - p[1]) * t)); } const W0 = Math.max(14, Math.min(rIn * 2 * 0.95, (Math.min(b - a, d - c)) * 0.6)); const steps = 6, sh = 3.4;
        const conc = new THREE.MeshStandardMaterial({ color: 0xd8d2c6, roughness: 0.85 }), gl = new THREE.MeshStandardMaterial({ color: 0x2f4656, roughness: 0.12, metalness: 0.55 });
        for (let k = 0; k < steps; k++) { const w = W0 * (1 - k / steps); const m1 = new THREE.Mesh(new THREE.BoxGeometry(w, sh * 0.62, w), gl); m1.position.y = k * sh + sh * 0.31; pg.add(m1); const m2 = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, sh * 0.38, w + 0.6), conc); m2.position.y = k * sh + sh * 0.81; pg.add(m2); }
        const cap = new THREE.Mesh(new THREE.ConeGeometry(W0 / steps * 0.75, sh * 1.4, 4), gl); cap.rotation.y = Math.PI / 4; cap.position.y = steps * sh + sh * 0.7; pg.add(cap); pg.rotation.y = 0; }
      if (kind === 'ayto') buildAyuntamiento(pts);
      if (kind === 'huc') buildHUC(pts);
      if (kind === 'glass') buildGlassSkin(pts, top);
      if (kind === 'salud') saludDeco(g, E, H, arg);
      if (kind === 'cornice') box(E.L + 0.6, 0.45, 0.6, LMMAT.grey, 0, H - 0.2, 0.2);
      if (kind === 'balustrade') { box(E.L, 0.15, 0.4, LMMAT.white, 0, H + 0.95, 0.05); for (let x = -E.L / 2 + 0.3; x < E.L / 2; x += 0.45) addMesh(g, new THREE.CylinderGeometry(0.07, 0.1, 0.8, 6), LMMAT.white, x, H + 0.45, 0.05); }
      if (kind === 'pediment') { const tri = new THREE.Shape(); const w = Math.min(E.L * 0.5, 12); tri.moveTo(-w / 2, 0); tri.lineTo(w / 2, 0); tri.lineTo(0, w * 0.22); tri.closePath(); addMesh(g, new THREE.ExtrudeGeometry(tri, { depth: 0.5, bevelEnabled: false }), LMMAT.white, 0, H, -0.1);
        for (const x of [-w / 2, -w / 6, w / 6, w / 2]) box(0.5, H - 4.5, 0.3, LMMAT.white, x * 0.9, 4.5 + (H - 4.5) / 2, 0.12); }
      if (kind === 'sign') { const s = signPlate(arg, Math.min(E.L * 0.6, 9), 0.9); s.position.set(0, Math.min(H - 1.2, 4.6), 0.08); g.add(s); }
      if (kind === 'towers2') for (const sx of [-1, 1]) { const tw = 4.2, th = H + 3.2; const t = box(tw, th, tw, new THREE.MeshStandardMaterial({ color: 0xbdb6aa, roughness: 0.9 }), sx * (E.L / 2 - tw / 2), th / 2, -tw / 2 + 0.05);
        box(tw + 0.5, 0.4, tw + 0.5, LMMAT.grey, sx * (E.L / 2 - tw / 2), th, -tw / 2 + 0.05); const c = addMesh(g, new THREE.ConeGeometry(tw * 0.72, 1.6, 4), MAT.roofTile, sx * (E.L / 2 - tw / 2), th + 1.0, -tw / 2 + 0.05); c.rotation.y = Math.PI / 4; }
      if (kind === 'celosia') { // long carved wooden mirador on the upper wall
        const w = Math.min(E.L * 0.8, 24), h = 3.2, y = Math.max(3.5, H - h - 1.2); box(w, h, 1.0, LMMAT.wood, 0, y + h / 2, 0.5); box(w + 0.6, 0.3, 1.3, LMMAT.wood, 0, y + h + 0.15, 0.55); box(w + 0.3, 0.3, 1.2, LMMAT.wood, 0, y - 0.15, 0.5);
        const lat = new THREE.MeshStandardMaterial({ color: 0x5e3a1f, roughness: 0.75 }); for (let x = -w / 2 + 0.25; x < w / 2; x += 0.32) box(0.06, h - 0.3, 0.06, lat, x, y + h / 2, 1.02); for (let yy = y + 0.3; yy < y + h; yy += 0.35) box(w, 0.05, 0.06, lat, 0, yy, 1.03);
        for (let x = -w / 2 + 1; x < w / 2; x += 2.2) { const b = box(0.15, 0.8, 0.15, LMMAT.wood, x, y - 0.55, 0.85); b.rotation.x = 0.6; } }
      if (kind === 'espadana') espadana(E.mx - E.ux * E.L * 0.3, E.mz - E.uz * E.L * 0.3, top - 0.3, Math.atan2(E.ux, E.uz) + Math.PI / 2, 3.6);
      if (kind === 'ruins') { // roofless church: rows of stone arches inside the shell
        const F = axisFrame(pts, cx, cz); const y0 = bmin - 0.3, len = F.u1 - F.u0, wid = F.v1 - F.v0; const st = new THREE.MeshStandardMaterial({ color: 0xa79f90, roughness: 0.95 });
        for (const vv of [F.v0 + wid / 3, F.v1 - wid / 3]) for (let u = F.u0 + 3; u < F.u1 - 2; u += 4.2) { const p = F.W(u, vv); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 7.5, 10), st); c.position.set(p[0], y0 + 3.75, p[1]); c.castShadow = true; scene.add(c); COL.addCirc(p[0], p[1], 0.5);
          if (u + 4.2 < F.u1 - 2) { const q = F.W(u + 2.1, vv); const a = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.35, 6, 12, Math.PI), st); a.position.set(q[0], y0 + 7.5, q[1]); a.rotation.y = F.ang - Math.PI / 2; scene.add(a); } }
        // inner faces of the walls (the shell is open to the sky) + rubble floor
        const A = acc(cx, cz, 'facade'); for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const l = Math.hypot(q[0] - p[0], q[1] - p[1]); if (l < 0.1) continue; const nb = Math.max(1, Math.round(l / 3)); A.quad([q[0], y0, q[1]], [p[0], y0, p[1]], [p[0], top, p[1]], [q[0], top, q[1]], [0, 0], [nb, 0], [nb, (top - y0) / 3], [0, (top - y0) / 3], [0.85, 0.82, 0.76], [5, 7], [-(q[1] - p[1]) / l, 0, (q[0] - p[0]) / l]); }
        }
    }
    if (L.label) LABELS.push([L.label, cx, cz, 1]);
  }
}
