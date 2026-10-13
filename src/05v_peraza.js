// ============ Estadio Municipal Francisco Peraza (v0.75, Jonay: la final de la Copa Laguna se juega aquí) ============
// OSM draws its stands as four thin 9.9 m «buildings» round the athletics track (west, east + north curve, south and a
// small one): drawn as buildings they were plain walls. Here they are stands: the seating slopes up from the edge of
// the track (rows of blue seats and grey steps), a concrete back wall and, over the biggest one (the east tribune), a
// roof on pillars. The entrance is a gate on the nearest street with the stadium's name and a ticket booth; E there
// only opens for the final of the Copa Laguna (12j_campos.js).
const PERAZA = { area: null, stands: [], door: null, ok: false, cx: -436, cz: -1002 };
// called from buildBuildings for every OSM building: true = it is one of the stands (kept for buildPeraza)
function perazaStand(style, pts, cx, cz) {
  if (style !== 6) return false;
  if (PERAZA.area === null) { const a = DATA.A.find((q) => q[1] >= 0 && /Estadio Municipal Francisco Peraza/.test(STR[q[1]])); PERAZA.area = a ? a[2] : false; }
  if (!PERAZA.area || Math.hypot(cx - PERAZA.cx, cz - PERAZA.cz) > 140) return false;
  if (!pts.some((p) => pip(p[0], p[1], PERAZA.area)) && !pip(cx, cz, PERAZA.area)) return false;
  PERAZA.stands.push(pts); for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; COL.addSeg(p[0], p[1], q[0], q[1]); }
  return true;
}
let PERAZA_SEATS = null;
function perazaSeatTex() { // rows of blue seats with grey steps between them (v runs from the track up to the back)
  if (PERAZA_SEATS) return PERAZA_SEATS; const c = mkCanvas(16, 256), x = c.getContext('2d');
  for (let r = 0; r < 16; r++) { x.fillStyle = '#9d9a93'; x.fillRect(0, r * 16, 16, 16); x.fillStyle = r % 5 === 2 ? '#e8e8e8' : '#1f6fb5'; x.fillRect(0, r * 16 + 3, 16, 9); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, r * 16 + 12, 16, 2); }
  PERAZA_SEATS = canvasTex(c, { repeat: true }); return PERAZA_SEATS;
}
function buildPeraza() {
  const P = SPORTS.pitches.find((q) => Math.hypot(q.cx - PERAZA.cx, q.cz - PERAZA.cz) < 25); if (!P || !PERAZA.stands.length) return;
  const F = P.F, uc = (F.u0 + F.u1) / 2, vc = (F.v0 + F.v1) / 2;
  const dPitch = (x, z) => { const u = (x - P.cx) * F.ux + (z - P.cz) * F.uz, v = (x - P.cx) * F.vx + (z - P.cz) * F.vz; return Math.hypot(Math.max(0, Math.abs(u - uc) - P.len / 2), Math.max(0, Math.abs(v - vc) - P.wid / 2)); };
  const seatM = new THREE.MeshStandardMaterial({ map: perazaSeatTex(), roughness: 0.8 }), wallM = M(0xc9c4b8, 0.9), roofM = M(0x5d6268, 0.5, 0.5, { side: THREE.DoubleSide }), postM = M(0x8a8f94, 0.5, 0.6);
  let big = null, bigA = 0; for (const pts of PERAZA.stands) { const A = Math.abs(polyArea(pts)); if (A > bigA) { bigA = A; big = pts; } }
  const root = new THREE.Group(); root.name = 'Estadio Francisco Peraza';
  for (const pts of PERAZA.stands) {
    const n = pts.length; const g = pts.map((p) => heightAt(p[0], p[1])); const g0 = Math.min(...g); const d = pts.map((p) => dPitch(p[0], p[1]));
    const d0 = Math.min(...d), d1 = Math.max(...d); const HS = pts === big ? 8.5 : 6.5;
    const t = d.map((v) => (d1 - d0 > 2 ? (v - d0) / (d1 - d0) : 0.5)); const y = t.map((v) => g0 + 0.9 + v * HS);
    // the sloping seats
    const tri = THREE.ShapeUtils.triangulateShape(pts.map((p) => new THREE.Vector2(p[0], p[1])), []); const pos = [], uv = [];
    for (const [a, b, c] of tri) { const cr = (pts[b][0] - pts[a][0]) * (pts[c][1] - pts[a][1]) - (pts[b][1] - pts[a][1]) * (pts[c][0] - pts[a][0]); const o = cr > 0 ? [a, c, b] : [a, b, c]; for (const i of o) { pos.push(pts[i][0], y[i], pts[i][1]); uv.push(0.5, t[i] * 2.4); } }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); sg.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); sg.computeVertexNormals();
    const seats = new THREE.Mesh(sg, seatM); seats.receiveShadow = true; seats.castShadow = true; root.add(seats);
    // walls all round, from the ground up to the seats
    const wp = []; for (let i = 0; i < n; i++) { const j = (i + 1) % n, p = pts[i], q = pts[j]; wp.push(p[0], g[i] - 0.6, p[1], q[0], g[j] - 0.6, q[1], q[0], y[j] + (t[j] > 0.9 ? 1.1 : 0), q[1], p[0], g[i] - 0.6, p[1], q[0], y[j] + (t[j] > 0.9 ? 1.1 : 0), q[1], p[0], y[i] + (t[i] > 0.9 ? 1.1 : 0), p[1]); }
    const wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.Float32BufferAttribute(wp, 3)); wg.computeVertexNormals();
    const walls = new THREE.Mesh(wg, new THREE.MeshStandardMaterial({ color: 0xc9c4b8, roughness: 0.9, side: THREE.DoubleSide })); walls.castShadow = true; walls.receiveShadow = true; root.add(walls);
    // the roof of the main tribune, on pillars along its back
    if (pts === big) {
      const ry = g0 + 0.9 + HS + 3.6; const rp = []; for (const [a, b, c] of tri) for (const i of [a, b, c]) rp.push(pts[i][0], ry + (1 - t[i]) * 0.6, pts[i][1]);
      const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(rp, 3)); rg.computeVertexNormals(); const roof = new THREE.Mesh(rg, roofM); roof.castShadow = true; root.add(roof);
      let acc2 = 99; for (let i = 0; i < n; i++) { const j = (i + 1) % n; acc2 += Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1]); if (t[i] < 0.85 || acc2 < 12) continue; acc2 = 0; const h = ry - g[i]; const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, h, 8), postM); post.position.set(pts[i][0], g[i] + h / 2, pts[i][1]); post.castShadow = true; root.add(post); }
    }
  }
  scene.add(root); PERAZA.ok = true; PERAZA.pitch = P;
  // the entrance on the street: two white pillars, a green gate, the name over it and a ticket booth
  const d = streetDoor(PERAZA.cx, PERAZA.cz); if (!d) return;
  PERAZA.door = [d.x, d.z]; PERAZA.street = d.street;
  const g = new THREE.Group(); const ang = Math.atan2(d.nx, d.nz); const y0 = heightAt(d.x, d.z);
  const green = M(0x1f7a3d, 0.5, 0.4), white = M(0xf2f2ee, 0.85);
  const at = (u, yy, o2) => [d.x + Math.cos(ang) * u + d.nx * o2, y0 + yy, d.z - Math.sin(ang) * u + d.nz * o2];
  const add = (geo, m, u, yy, o2) => { const mesh = new THREE.Mesh(geo, m); mesh.position.set(...at(u, yy, o2)); mesh.rotation.y = ang; mesh.castShadow = true; g.add(mesh); return mesh; };
  for (const u of [-2.6, 2.6]) { add(new THREE.BoxGeometry(0.7, 4.2, 0.7), white, u, 2.1, -1.5); const p = at(u, 0, -1.5); COL.addCirc(p[0], p[2], 0.45); }
  add(new THREE.BoxGeometry(5.9, 0.9, 0.5), white, 0, 4.5, -1.5);
  for (let k = -2.1; k <= 2.11; k += 0.21) { if (Math.abs(k) < 1.2) continue; add(new THREE.BoxGeometry(0.05, 2.4, 0.05), green, k, 1.2, -1.6); } // the gate, open in the middle
  const c = mkCanvas(640, 120), x = c.getContext('2d'); x.fillStyle = '#f4f4ef'; x.fillRect(0, 0, 640, 120); x.fillStyle = '#1f7a3d'; x.fillRect(0, 0, 640, 14); x.fillRect(0, 106, 640, 14);
  x.fillStyle = '#1f7a3d'; x.textAlign = 'center'; x.font = 'bold 26px sans-serif'; x.fillText('ESTADIO MUNICIPAL', 320, 46); x.font = 'bold 40px sans-serif'; x.fillText('FRANCISCO PERAZA', 320, 92);
  const sign = add(new THREE.PlaneGeometry(5.6, 1.05), new THREE.MeshStandardMaterial({ map: canvasTex(c, { repeat: false }), roughness: 0.6 }), 0, 4.5, -1.2);
  // ticket booth beside the gate
  add(new THREE.BoxGeometry(1.8, 2.5, 1.6), white, 4.6, 1.25, -2.6); add(new THREE.BoxGeometry(2.0, 0.15, 1.8), green, 4.6, 2.55, -2.6);
  { const p = at(4.6, 0, -2.6); COL.addCirc(p[0], p[2], 1.1); }
  const tc = mkCanvas(256, 64), tx = tc.getContext('2d'); tx.fillStyle = '#1f7a3d'; tx.fillRect(0, 0, 256, 64); tx.fillStyle = '#fff'; tx.font = 'bold 34px sans-serif'; tx.textAlign = 'center'; tx.fillText('TAQUILLA', 128, 44);
  const ts = add(new THREE.PlaneGeometry(1.5, 0.38), new THREE.MeshStandardMaterial({ map: canvasTex(tc, { repeat: false }), roughness: 0.6 }), 4.6, 2.15, -1.78);
  scene.add(g);
}
