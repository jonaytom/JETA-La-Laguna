// ============ Ayuntamiento de La Laguna (Casas Consistoriales), fachada a la Calle Consistorio ============
// From Jonay's photos (docs/referencias/ayuntamiento/): grey volcanic ashlar, 5 round arches with steps on the ground
// floor (a shallow porch), 5 tall windows with wooden balconies upstairs, pilasters, string course, cornice with stone
// balls, curved central pediment with the coat of arms and the «AYUNTAMIENTO» plaque, and five flags.
// The OSM block («Casa del Corregidor») keeps its walls; this facade is built in front of its east edge.
const AYTO = { ok: false };
function aytoStoneTex() {
  const c = mkCanvas(512, 512), x = c.getContext('2d'); x.fillStyle = '#6f6b64'; x.fillRect(0, 0, 512, 512);
  const r = mulberry(77); for (let row = 0; row < 8; row++) { const off = row % 2 ? 0 : 64; for (let col = -1; col < 5; col++) { const v = 96 + Math.floor(r() * 26); x.fillStyle = `rgb(${v},${v - 4},${v - 10})`; x.fillRect(off + col * 128 + 3, row * 64 + 3, 122, 58);
    for (let k = 0; k < 25; k++) { x.fillStyle = r() < 0.5 ? 'rgba(40,38,36,.35)' : 'rgba(150,146,138,.25)'; x.beginPath(); x.arc(off + col * 128 + 3 + r() * 122, row * 64 + 3 + r() * 58, 0.8 + r() * 2.2, 0, 7); x.fill(); } } }
  const t = canvasTex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
function aytoFlagTex(kind) {
  const c = mkCanvas(192, 128), x = c.getContext('2d'); const band = (cols, vertical) => cols.forEach((col, i) => { x.fillStyle = col; if (vertical) x.fillRect(i * 192 / cols.length, 0, 192 / cols.length + 1, 128); else x.fillRect(0, i * 128 / cols.length, 192, 128 / cols.length + 1); });
  if (kind === 'laguna') { x.fillStyle = '#8c3fa8'; x.fillRect(0, 0, 192, 128); x.fillStyle = '#f2d36b'; x.beginPath(); x.arc(96, 64, 18, 0, 7); x.fill(); }
  else if (kind === 'canarias') band(['#ffffff', '#0768a9', '#fedd00'], true);
  else if (kind === 'espana') { band(['#c60b1e', '#ffc400', '#ffc400', '#c60b1e'], false); }
  else if (kind === 'tenerife') { x.fillStyle = '#123b8c'; x.fillRect(0, 0, 192, 128); x.strokeStyle = '#fff'; x.lineWidth = 18; x.beginPath(); x.moveTo(0, 0); x.lineTo(192, 128); x.moveTo(192, 0); x.lineTo(0, 128); x.stroke(); }
  else { x.fillStyle = '#003399'; x.fillRect(0, 0, 192, 128); x.fillStyle = '#ffcc00'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.arc(96 + Math.cos(a) * 38, 64 + Math.sin(a) * 38, 5, 0, 7); x.fill(); } }
  return canvasTex(c, { repeat: false });
}
function aytoWindowTex() { // tall window with small panes (cuarterones) and white frames
  const c = mkCanvas(128, 256), x = c.getContext('2d'); x.fillStyle = '#2a3238'; x.fillRect(0, 0, 128, 256); x.fillStyle = 'rgba(160,190,205,.35)'; x.fillRect(0, 0, 128, 120);
  x.strokeStyle = '#e9e4d8'; x.lineWidth = 7; x.strokeRect(4, 4, 120, 248); x.lineWidth = 4; x.beginPath(); x.moveTo(64, 0); x.lineTo(64, 256); for (let y = 42; y < 256; y += 42) { x.moveTo(0, y); x.lineTo(128, y); } for (const xx of [32, 96]) { x.moveTo(xx, 0); x.lineTo(xx, 256); } x.stroke();
  return canvasTex(c, { repeat: false });
}
function buildAyuntamiento(pts) {
  // the facade edge: the one of the block closest to the town hall's front on Calle Consistorio
  let E = null, bd = 1e9; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 8) continue; const d = Math.hypot((p[0] + q[0]) / 2 - 102.5, (p[1] + q[1]) / 2 - 30.5); if (d < bd) { bd = d; E = { p, q, L }; } }
  if (!E || bd > 25) return;
  let ux = (E.q[0] - E.p[0]) / E.L, uz = (E.q[1] - E.p[1]) / E.L; let nx = uz, nz = -ux; const mx = (E.p[0] + E.q[0]) / 2, mz = (E.p[1] + E.q[1]) / 2;
  { let cx = 0, cz = 0; for (const p of pts) { cx += p[0]; cz += p[1]; } cx /= pts.length; cz /= pts.length; if ((mx - cx) * nx + (mz - cz) * nz < 0) { nx = -nx; nz = -nz; } } // outwards
  const W = Math.min(E.L, 20), PD = 1.25; // facade width, porch depth
  const g = new THREE.Group(); const gy = Math.min(heightAt(E.p[0] + nx * 2, E.p[1] + nz * 2), heightAt(E.q[0] + nx * 2, E.q[1] + nz * 2)) - 0.05;
  g.position.set(mx + nx * PD, gy, mz + nz * PD); g.rotation.y = Math.atan2(nx, nz); scene.add(g); // local: +z out to the street, x along the facade
  const stoneT = aytoStoneTex(); const stone = new THREE.MeshStandardMaterial({ color: 0xffffff, map: stoneT, roughness: 0.92 }); const stoneD = new THREE.MeshStandardMaterial({ color: 0x5f5b55, roughness: 0.9 });
  const pink = new THREE.MeshStandardMaterial({ color: 0xd9b7ae, roughness: 0.9 }), wood = new THREE.MeshStandardMaterial({ color: 0x5a3820, roughness: 0.75 }), door = new THREE.MeshStandardMaterial({ color: 0x3e2614, roughness: 0.7 });
  const box = (w, h, d, m, x, y, z) => addMesh(g, new THREE.BoxGeometry(w, h, d), m, x, y, z);
  const n = 5, bw = W / n, G1 = 5.4, H = 11.0; // bays, ground floor height, cornice height
  // ground floor: one extruded stone bay per arch (rectangle with an arched opening)
  const ar = (bw - 0.95) / 2, spring = 3.3;
  for (let i = 0; i < n; i++) { const x0 = -W / 2 + i * bw; const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(bw, 0); s.lineTo(bw, G1); s.lineTo(0, G1); s.closePath();
    const h = new THREE.Path(); const c = bw / 2; h.moveTo(c - ar, 0); h.lineTo(c - ar, spring); h.absarc(c, spring, ar, Math.PI, 0, true); h.lineTo(c + ar, 0); h.closePath(); s.holes.push(h);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.7, bevelEnabled: false }); const uv = geo.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) / 4, uv.getY(k) / 2); addMesh(g, geo, stone, x0, 0, -0.7);
    // arch rim (voussoirs) and three steps
    const rim = new THREE.Mesh(new THREE.TorusGeometry(ar + 0.12, 0.13, 6, 16, Math.PI), stoneD); rim.position.set(x0 + c, spring, 0.03); g.add(rim);
    for (let st = 0; st < 3; st++) box(2 * ar + 0.1, 0.18, 0.45, stoneD, x0 + c, 0.09 + st * 0.18, 0.35 - st * 0.45 - 0.2);
    // inside the porch: pink wall and a big wooden door
    const back = new THREE.Mesh(new THREE.PlaneGeometry(bw, G1), pink); back.position.set(x0 + c, G1 / 2, -PD + 0.03); g.add(back);
    if (i % 2 === 0) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.0), door); d.position.set(x0 + c, 1.5 + 0.54, -PD + 0.05); g.add(d); }
  }
  box(W, 0.12, PD, stoneD, 0, 0.54, -PD / 2); // porch floor (top of the steps)
  box(W, 0.25, PD, pink, 0, G1 - 0.05, -PD / 2); // porch ceiling
  for (const sx of [-1, 1]) box(0.25, G1, PD, stone, sx * (W / 2 - 0.12), G1 / 2, -PD / 2); // porch ends
  // upper floor: stone wall, pilasters, windows with wooden balconies
  const up = box(W, H - G1, 0.6, stone, 0, G1 + (H - G1) / 2, -0.3); { const uv = up.geometry.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * W / 4, uv.getY(k) * (H - G1) / 2); }
  box(W + 0.35, 0.35, 0.35, stoneD, 0, G1, 0.12); // string course
  const winM = new THREE.MeshStandardMaterial({ map: aytoWindowTex(), roughness: 0.35 });
  for (let i = 0; i <= n; i++) { const x = -W / 2 + i * bw; box(0.7, G1, 0.25, stone, x, G1 / 2, 0.12); box(0.6, H - G1 - 0.2, 0.2, stone, x, G1 + (H - G1) / 2, 0.08); } // pilasters
  for (let i = 0; i < n; i++) { const x = -W / 2 + (i + 0.5) * bw;
    const w = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 2.9), winM); w.position.set(x, G1 + 0.55 + 1.45, 0.02); g.add(w);
    box(1.85, 0.25, 0.25, stoneD, x, G1 + 0.55 + 2.95, 0.1); // lintel
    box(1.7, 0.1, 0.55, wood, x, G1 + 0.5, 0.28); box(1.7, 0.08, 0.06, wood, x, G1 + 1.45, 0.53); // balcony floor + rail
    for (let k = 0; k <= 8; k++) box(0.05, 0.9, 0.05, wood, x - 0.8 + k * 0.2, G1 + 1.0, 0.53); }
  // cornice, stone balls on pedestals, curved central pediment with the coat of arms and the plaque
  box(W + 0.7, 0.55, 0.85, stoneD, 0, H + 0.1, 0.05);
  box(W, 0.9, 0.5, stone, 0, H + 0.8, -0.15);
  for (let i = 0; i <= n; i++) { const x = -W / 2 + i * bw; if (i === 2 || i === 3) continue; box(0.55, 0.6, 0.55, stoneD, x, H + 1.55, -0.1); addMesh(g, new THREE.SphereGeometry(0.33, 12, 10), stone, x, H + 2.15, -0.1); }
  { const pw = bw + 0.6, ph = 2.5; const s = new THREE.Shape(); s.moveTo(-pw / 2, 0); s.lineTo(-pw / 2, ph * 0.55); s.quadraticCurveTo(-pw / 2, ph, 0, ph); s.quadraticCurveTo(pw / 2, ph, pw / 2, ph * 0.55); s.lineTo(pw / 2, 0); s.closePath();
    addMesh(g, new THREE.ExtrudeGeometry(s, { depth: 0.6, bevelEnabled: false }), stone, 0, H + 0.35, -0.35);
    const arms = (() => { const c = mkCanvas(128, 160), x = c.getContext('2d'); x.fillStyle = '#cfcac0'; x.fillRect(0, 0, 128, 160); x.fillStyle = '#b8b2a6'; x.beginPath(); x.moveTo(24, 30); x.lineTo(104, 30); x.lineTo(104, 100); x.quadraticCurveTo(64, 150, 24, 100); x.closePath(); x.fill(); x.fillStyle = '#8d877c'; x.fillRect(56, 6, 16, 22); x.fillRect(46, 14, 36, 8); x.strokeStyle = '#7d776c'; x.lineWidth = 4; x.strokeRect(36, 46, 56, 44); return canvasTex(c, { repeat: false }); })();
    const a = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.15), new THREE.MeshStandardMaterial({ map: arms, roughness: 0.9 })); a.position.set(0, H + 1.55, 0.27); g.add(a); }
  { const s = signPlate('AYUNTAMIENTO', 2.6, 0.32); s.position.set(0, H - 0.45, 0.09); g.add(s); }
  // flags on slanted poles between the upstairs windows
  ['laguna', 'canarias', 'espana', 'tenerife', 'ue'].forEach((k, i) => { const x = -W / 2 + (i + 0.5) * bw + bw * 0.42; const pole = new THREE.Group(); pole.position.set(x, G1 + 3.4, 0.25); pole.rotation.x = 0.75; g.add(pole);
    addMesh(pole, new THREE.CylinderGeometry(0.03, 0.03, 3.0, 6), wood, 0, 1.5, 0); const f = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.5), new THREE.MeshStandardMaterial({ map: aytoFlagTex(k), roughness: 0.8, side: THREE.DoubleSide })); f.position.set(0.0, 2.2, 0.48); f.rotation.x = -0.75; f.rotation.y = Math.PI / 2; pole.add(f); });
  // street lamps at the corners
  for (const sx of [-1, 1]) { const l = new THREE.Group(); l.position.set(sx * (W / 2 + 0.2), G1 - 1.0, 0.45); g.add(l); addMesh(l, new THREE.BoxGeometry(0.06, 0.06, 0.5), wood, 0, 0, -0.2); addMesh(l, new THREE.CylinderGeometry(0.16, 0.12, 0.45, 6), new THREE.MeshStandardMaterial({ color: 0xfff1c9, emissive: 0xffe2a0, emissiveIntensity: 0.4 }), 0, -0.2, 0.05); }
  g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); g.updateMatrixWorld(true);
  // collisions: the piers (you can walk into the porch through the arches), the porch back wall
  const Wd = (lx, lz) => { const v = new THREE.Vector3(lx, 0, lz).applyMatrix4(g.matrixWorld); return [v.x, v.z]; };
  for (let i = 0; i <= n; i++) { const p = Wd(-W / 2 + i * bw, 0.1); COL.addCirc(p[0], p[1], 0.45); }
  const b0 = Wd(-W / 2, -PD), b1 = Wd(W / 2, -PD); COL.addSeg(b0[0], b0[1], b1[0], b1[1]);
  // where the mayor stands (under the middle arch) and where the gang lines up for the ceremony (in front)
  const c = Wd(0, -PD + 0.6), f = Wd(0, 3.2); Object.assign(AYTO, { ok: true, door: c, front: f, nx, nz, ux, uz, W });
  LABELS.push(['Ayuntamiento', f[0], f[1], 1]);
}
