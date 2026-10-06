// ============ underground car parks: Plaza del Cristo (under the big plaza, next to the market) and Avenida de La Trinidad ============
// Each one: a hall (floor, ceiling, columns, bays, lights, parked cars) at about -4 m, vehicle ramps that you can drive
// down from the street (open cutting + short covered mouth), and pedestrian stairwells with glass pavilions on the surface.
const UGC = []; // underground obstacles [x, z, r] (columns, parked cars): only apply below ground
function ugcPush(x, z, r, y) {
  for (const c of UGC) { if (y !== undefined && c[3] !== undefined && Math.abs(y - c[3]) > 0.6) continue; /* only at the hall floor (not on the stairs above) */ const dx = x - c[0], dz = z - c[1]; if (Math.abs(dx) > 4 || Math.abs(dz) > 4) continue; const d = Math.hypot(dx, dz), m = c[2] + r; if (d < m && d > 1e-4) { x = c[0] + dx / d * m; z = c[1] + dz / d * m; } }
  return [x, z];
}
function inCut(x, z, m = 1.5) { for (const c of TCUTS) { const dx = c[2] - c[0], dz = c[3] - c[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - c[0]) * dx + (z - c[1]) * dz) / L2, -0.15, 1.15); if (Math.hypot(x - c[0] - dx * t, z - c[1] - dz * t) < c[4] + m) return true; } return false; }
const CARPARK_SRC = {}; const CARPARKS = [];
// before the terrain splat is painted: the car park polygon of the Plaza del Cristo is really a big paved square on top
function prepUndergroundAreas() {
  const sq = DATA.AT.indexOf('square');
  for (const a of DATA.A) if (a[1] >= 0 && /Parking del Cristo/.test(STR[a[1]])) { CARPARK_SRC.cristo = a[2].slice(); if (sq >= 0) a[0] = sq; }
}
function pcaFrame(c) {
  let cx = 0, cz = 0; const n = c.length / 2; for (let i = 0; i < c.length; i += 2) { cx += c[i]; cz += c[i + 1]; } cx /= n; cz /= n;
  let a = 0, b = 0, d = 0; for (let i = 0; i < c.length; i += 2) { const x = c[i] - cx, z = c[i + 1] - cz; a += x * x; b += x * z; d += z * z; }
  const ang = 0.5 * Math.atan2(2 * b, a - d); const ux = Math.cos(ang), uz = Math.sin(ang);
  let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9; for (let i = 0; i < c.length; i += 2) { const x = c[i] - cx, z = c[i + 1] - cz; const u = x * ux + z * uz, v = -x * uz + z * ux; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); }
  return { cx, cz, ux, uz, u0, u1, v0, v1, W: (u, v) => [cx + ux * u - uz * v, cz + uz * u + ux * v] };
}
const PK = {};
function pkMats() {
  if (PK.ok) return PK; PK.ok = true;
  const c = mkCanvas(256, 256), x = c.getContext('2d'); x.fillStyle = '#5d6063'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 1400; i++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? 255 : 0},${Math.random() < 0.5 ? 255 : 0},255,0.04)`; x.fillRect(Math.random() * 256, Math.random() * 256, 2, 2); }
  const t = canvasTex(c); t.repeat.set(1, 1);
  PK.floor = new THREE.MeshStandardMaterial({ map: t, roughness: 0.85, emissive: 0x2a2c2e, emissiveIntensity: 1 });
  PK.ceil = new THREE.MeshStandardMaterial({ color: 0xb9b7b0, roughness: 0.95, emissive: 0x3b3a37, side: THREE.DoubleSide });
  PK.wall = new THREE.MeshStandardMaterial({ color: 0xd8d5cc, roughness: 0.9, emissive: 0x3a3936, side: THREE.DoubleSide });
  PK.col = new THREE.MeshStandardMaterial({ color: 0xe8e4da, roughness: 0.8, emissive: 0x403f3b });
  PK.stripe = new THREE.MeshStandardMaterial({ color: 0xf2c12e, roughness: 0.6, emissive: 0x3a2e08 });
  PK.line = new THREE.MeshBasicMaterial({ color: 0xf2f2f2 });
  PK.light = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf4f8ff, emissiveIntensity: 1.6 });
  PK.green = new THREE.MeshStandardMaterial({ color: 0x1f8a3c, emissive: 0x1f8a3c, emissiveIntensity: 0.9 });
  PK.blue = new THREE.MeshStandardMaterial({ color: 0x1d4f9c, roughness: 0.5, emissive: 0x0d2550, emissiveIntensity: 0.5 });
  PK.glass = new THREE.MeshStandardMaterial({ color: 0xbfdbe6, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.35, depthWrite: false });
  PK.steel = new THREE.MeshStandardMaterial({ color: 0x4d5357, roughness: 0.4, metalness: 0.6 });
  return PK;
}
function pkSignTex(text, bg = '#1d4f9c', fg = '#fff', w = 512, h = 128) { const c = mkCanvas(w, h), x = c.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, w, h); x.fillStyle = fg; x.font = `700 ${Math.round(h * 0.55)}px Oswald, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, w / 2, h / 2 + 2); return canvasTex(c, { repeat: false }); }
// hall: centre, axis u (length L) and v (width W = 31: bays | lane | double bays | lane | bays), floor height yF
function buildHall(F, uc, L, yF, name, gaps) {
  const M_ = pkMats(); const g = new THREE.Group(); const W = 31, H = 3.4, hl = L / 2, hw = W / 2;
  const P = (u, v) => F.W(uc + u, v); const ang = Math.atan2(F.ux, F.uz); // rotation.y so that local z = u
  const place = (mesh, u, y, v, rotY = 0) => { const [x, z] = P(u, v); mesh.position.set(x, y, z); mesh.rotation.y = ang + rotY; g.add(mesh); return mesh; };
  // floor + ceiling
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(W, L), M_.floor); fl.rotation.x = -Math.PI / 2; const fg = new THREE.Group(); fg.add(fl); place(fg, 0, yF + 0.12, 0);
  const ce = new THREE.Mesh(new THREE.PlaneGeometry(W, L), M_.ceil); ce.rotation.x = Math.PI / 2; const cg = new THREE.Group(); cg.add(ce); place(cg, 0, yF + 0.12 + H, 0);
  // walls with gaps [side ('u+','u-','v+','v-'), centre, width]
  const wallSeg = (side, a, b) => { if (b - a < 0.05) return; const len = b - a, mid = (a + b) / 2; const m = new THREE.Mesh(new THREE.BoxGeometry(side[0] === 'u' ? len : 0.3, H, side[0] === 'u' ? 0.3 : len), M_.wall);
    if (side === 'v+') place(m, mid, yF + 0.12 + H / 2, hw); else if (side === 'v-') place(m, mid, yF + 0.12 + H / 2, -hw); else if (side === 'u+') place(m, hl, yF + 0.12 + H / 2, mid); else place(m, -hl, yF + 0.12 + H / 2, mid);
    // yellow-black band at bumper height
    const st = new THREE.Mesh(new THREE.BoxGeometry(side[0] === 'u' ? len : 0.32, 0.3, side[0] === 'u' ? 0.32 : len), M_.stripe); st.position.copy(m.position); st.position.y = yF + 0.12 + 0.55; st.rotation.y = m.rotation.y; g.add(st); };
  for (const side of ['v+', 'v-', 'u+', 'u-']) { const ext = side[0] === 'v' ? hl : hw; const gs = gaps.filter((q) => q[0] === side).map((q) => [q[1] - q[2] / 2, q[1] + q[2] / 2]).sort((p, q) => p[0] - q[0]); let a = -ext; for (const [s, e] of gs) { wallSeg(side, a, s); a = e; } wallSeg(side, a, ext); }
  // bays: rows at v in [-15.5,-10.5], [-4, 0], [0, 4], [10.5, 15.5]; lanes at v = ±7.25 and cross lanes at both ends (7 m)
  const bayW = 2.5, rows = [[-13, 1], [-2, -1], [2, 1], [13, -1]]; const uStart = -hl + 7.5, uEnd = hl - 7.5; const lines = []; let nCars = 0;
  for (const [vc, face] of rows) for (let u = uStart; u <= uEnd + 0.01; u += bayW) {
    lines.push([u, vc]); if (u + bayW > uEnd + 0.01) continue;
    if (Math.random() < 0.45) { const m = makeCarMesh(pick(['compact', 'sedan', 'suv', 'compact']), pickColor()); const gg = m.g || m; const [x, z] = P(u + bayW / 2, vc); gg.position.set(x, yF + 0.12, z); gg.rotation.y = ang + (face > 0 ? Math.PI / 2 : -Math.PI / 2); gg.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } }); g.add(gg); nCars++;
      for (const k of [-1.3, 0, 1.3]) { const [px, pz] = P(u + bayW / 2, vc + k); UGC.push([px, pz, 0.95, yF, gg]); } }
  }
  for (const [u, vc] of lines) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 5), M_.line); m.rotation.x = -Math.PI / 2; const q = new THREE.Group(); q.add(m); place(q, u, yF + 0.135, vc); q.rotation.y = ang + Math.PI / 2; }
  // lane arrows and centre dashes
  for (const vl of [-7.25, 7.25]) for (let u = -hl + 4; u < hl - 4; u += 6) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 2.6), M_.line); m.rotation.x = -Math.PI / 2; const q = new THREE.Group(); q.add(m); place(q, u, yF + 0.135, vl); }
  // columns (between back-to-back bays) and light strips over the lanes
  for (let u = uStart; u <= uEnd; u += bayW * 3) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.55, H, 0.55), M_.col); place(c, u, yF + 0.12 + H / 2, 0); const [x, z] = P(u, 0); UGC.push([x, z, 0.4, yF]);
    for (const vc of [-10.4, 10.4]) { const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.5, H, 0.5), M_.col); place(c2, u, yF + 0.12 + H / 2, vc); const [x2, z2] = P(u, vc); UGC.push([x2, z2, 0.35, yF]); } }
  for (const vl of [-7.25, 7.25]) for (let u = -hl + 3; u < hl - 3; u += 5) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 1.6), M_.light); place(l, u, yF + 0.12 + H - 0.05, vl); }
  // signs
  const sP = new THREE.MeshBasicMaterial({ map: pkSignTex('P  -1   ' + name.toUpperCase(), '#1d4f9c', '#fff', 1024, 128) });
  for (const s of [-1, 1]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.75), sP); place(m, s * hl * 0.5, yF + 0.12 + 2.1, -hw + 0.2, -Math.PI / 2); const m2 = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.75), sP); place(m2, s * hl * 0.5, yF + 0.12 + 2.1, hw - 0.2, Math.PI / 2); }
  const sx = new THREE.MeshBasicMaterial({ map: pkSignTex('SALIDA  ►', '#1f8a3c', '#fff') });
  for (const q of gaps) { const m = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), sx); const u = q[0] === 'u+' ? hl - 4 : q[0] === 'u-' ? -hl + 4 : q[1]; const v = q[0][0] === 'u' ? q[1] : (q[0] === 'v+' ? hw - 3 : -hw + 3); place(m, u, yF + 0.12 + H - 0.35, v, q[0] === 'u+' ? 0 : q[0] === 'u-' ? Math.PI : Math.PI / 2); }
  scene.add(g);
  // drivable floor: five overlapping strips along u, capped at the end walls
  const strips = [-12.4, -6.2, 0, 6.2, 12.4];
  for (const v of strips) { const a = P(-hl + 0.4, v), b = P(hl - 0.4, v); const outer = Math.abs(v) > 12; TUNNEL_DECKS.push({ type: 'path', pts: [[a[0], a[1], yF + 0.12], [b[0], b[1], yF + 0.12]], w: 6.6, hw: outer ? hw - Math.abs(v) - 0.15 : 3.6, road: true, tunnel: true, capped: true, ceil: H - 0.2, hall: true }); }
  return { nCars };
}
function rampProfile(Lr, yF) { return (s, x, z) => lerp(heightAt(x, z), yF, smooth(0, 1, (s - 2) / Math.max(4, Lr - 8))); }
// ramp from (x0,z0) on the surface to (x1,z1) inside the hall, built with the tunnel/cutting machinery
function buildRamp(x0, z0, x1, z1, yF, label) {
  const Lr = Math.hypot(x1 - x0, z1 - z0); const c = [x0, z0, x1, z1]; tunnelRoad(c, 6.8, 'asphalt', 8, rampProfile(Lr, yF), { H: 3.9, cover: 4.3 });
  // entrance sign on a post at the top
  const M_ = pkMats(); const dx = (x1 - x0) / Lr, dz = (z1 - z0) / Lr; const px = x0 - dz * 4.2, pz = z0 + dx * 4.2; const y = heightAt(px, pz);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8), M_.steel); post.position.set(px, y + 1.6, pz); scene.add(post);
  const sg = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.08), new THREE.MeshStandardMaterial({ map: pkSignTex('P', '#1d4f9c', '#fff', 128, 128), roughness: 0.5 })); sg.position.set(px, y + 3.0, pz); sg.rotation.y = Math.atan2(-dx, -dz); scene.add(sg);
  const lb = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.45), new THREE.MeshBasicMaterial({ map: pkSignTex(label, '#1d4f9c', '#fff', 512, 96), side: THREE.DoubleSide })); lb.position.set(px, y + 2.2, pz); lb.rotation.y = Math.atan2(-dx, -dz); scene.add(lb);
  COL.addCirc(px, pz, 0.12);
}
// pedestrian stairwell: a glass pavilion on the surface over a stair that goes down into the hall
function buildStairwell(x0, z0, ux, uz, yF, corr) {
  const M_ = pkMats(); const L = 10, g0 = heightAt(x0, z0); const x1 = x0 + ux * L, z1 = z0 + uz * L; const ang = Math.atan2(ux, uz);
  const dpts = [[x0 - ux * 0.5, z0 - uz * 0.5, g0 - 0.1], [x1, z1, yF + 0.12], [x1 + ux * 1.5, z1 + uz * 1.5, yF + 0.12]];
  if (corr) { // underground corridor from the foot of the stairs to the hall
    const cx0 = x1 + ux * 1.5, cz0 = z1 + uz * 1.5, cx1 = corr[0], cz1 = corr[1]; dpts.push([cx1, cz1, yF + 0.12]);
    const cl = Math.hypot(cx1 - cx0, cz1 - cz0), ca = Math.atan2(cx1 - cx0, cz1 - cz0); const cg = new THREE.Group(); cg.position.set((cx0 + cx1) / 2, 0, (cz0 + cz1) / 2); cg.rotation.y = ca;
    const fl = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, cl + 2.6), M_.col); fl.position.y = yF + 0.07; cg.add(fl);
    const ce = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, cl + 2.6), M_.ceil); ce.position.y = yF + 2.75; cg.add(ce);
    for (const sd of [-1, 1]) { const wl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.7, cl + 2.6), M_.wall); wl.position.set(sd * 1.32, yF + 1.45, 0); cg.add(wl); }
    const lt = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, cl * 0.8), M_.light); lt.position.y = yF + 2.68; cg.add(lt); scene.add(cg);
  }
  TUNNEL_DECKS.push({ type: 'path', pts: dpts, w: 2.4, hw: 1.0, tunnel: true, ceil: 2.6 });
  // keep the foot of the stairs clear: no parked cars under / in front of the stairwell
  { const sx = x0 - ux, sz = z0 - uz, ex = x1 + ux * 4, ez = z1 + uz * 4, L2 = (ex - sx) ** 2 + (ez - sz) ** 2;
    for (let i = UGC.length - 1; i >= 0; i--) { const c = UGC[i]; if (c[3] === undefined || Math.abs(c[3] - yF) > 0.6 || !c[4]) continue; const t = clamp(((c[0] - sx) * (ex - sx) + (c[1] - sz) * (ez - sz)) / L2, 0, 1);
      if (Math.hypot(c[0] - sx - (ex - sx) * t, c[1] - sz - (ez - sz) * t) < 2.6) { c[4].visible = false; const m = c[4]; for (let j = UGC.length - 1; j >= 0; j--) if (UGC[j][4] === m) UGC.splice(j, 1); i = Math.min(i, UGC.length); } } }
  TCUTS.push([x0 - ux * 0.3, z0 - uz * 0.3, x1 - ux * 2.5, z1 - uz * 2.5, 1.35, 9000 + TCUTS.length]);
  const g = new THREE.Group(); g.position.set((x0 + x1) / 2, 0, (z0 + z1) / 2); g.rotation.y = ang;
  const n = Math.ceil((g0 - yF) / 0.18); for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; const st = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.18, L / n + 0.03), M_.col); st.position.set(0, lerp(g0, yF + 0.12, t) - 0.09, -L / 2 + t * L); g.add(st); }
  for (const s of [-1, 1]) { const wl = new THREE.Mesh(new THREE.BoxGeometry(0.15, g0 - yF + 1, L), M_.wall); wl.position.set(s * 1.25, (g0 + yF) / 2, 0); g.add(wl); }
  // pavilion: glass box with a steel roof and a «P» sign
  const gy = g0; const pav = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.5, L * 0.55), M_.glass); pav.position.set(0, gy + 1.25, -L * 0.2); g.add(pav);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.15, L * 0.6), M_.steel); roof.position.set(0, gy + 2.55, -L * 0.2); g.add(roof);
  const sg = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ map: pkSignTex('P', '#1d4f9c', '#fff', 128, 128) })); sg.position.set(0, gy + 2.1, -L * 0.2 - L * 0.275 - 0.01); sg.rotation.y = Math.PI; g.add(sg);
  scene.add(g);
  // the pavilion's side walls stop people walking into the hole from the sides
  for (const s of [-1, 1]) { const ax = x0 + uz * s * 1.5, az = z0 - ux * s * 1.5; COL.addSeg(ax, az, ax + ux * L * 0.75, az + uz * L * 0.75); }
}
function buildCarParks() {
  // ---- Plaza del Cristo
  const c = CARPARK_SRC.cristo;
  if (c) {
    const F = pcaFrame(c); const uLen = F.u1 - F.u0; const uc = (F.u0 + F.u1) / 2 - 0; const vc = (F.v0 + F.v1) / 2;
    const F2 = { ...F, cx: F.W(0, vc)[0], cz: F.W(0, vc)[1] }; F2.W = (u, v) => [F2.cx + F.ux * u - F.uz * v, F2.cz + F.uz * u + F.ux * v];
    const L = clamp(uLen - 2 * 34, 36, 80); let gmin = 1e9; for (let u = -L / 2; u <= L / 2; u += 6) for (let v = -15; v <= 15; v += 5) { const [x, z] = F2.W(uc + u, v); gmin = Math.min(gmin, heightAt(x, z)); }
    const yF = gmin - 5.4; // deep enough for a tall ramp mouth (cars used to scrape the lintel)
    const gaps = [['u+', 7.25, 8.6], ['u-', -7.25, 8.6], ['v+', -L / 4, 2.6], ['v-', L / 4, 2.6]];
    const r = buildHall(F2, uc, L, yF, 'Plaza del Cristo', gaps);
    // vehicle ramps from both ends of the plaza (one each way, both usable)
    for (const [s, v] of [[1, 7.25], [-1, -7.25]]) { const top = F2.W(uc + s * (L / 2 + 42), v), bot = F2.W(uc + s * (L / 2 - 3.5), v); buildRamp(top[0], top[1], bot[0], bot[1], yF, s > 0 ? 'ENTRADA · SALIDA' : 'PARKING DEL CRISTO'); }
    // stairwells: pavilions over the plaza, stairs going down to the side aisles
    for (const [u, v, d] of [[-L / 4, 13.8, 1], [L / 4, -13.8, -1]]) { const p = F2.W(uc + u - d * 5, v); buildStairwell(p[0], p[1], F.ux * d, F.uz * d, yF); }
    CARPARKS.push({ name: 'Parking del Cristo', x: F2.cx, z: F2.cz, F: F2, uc, L, yF });
    // the plaza on top: rows of Indian laurels, benches and lanterns around the edge, open centre for fairs
    const per = []; for (let i = 0; i < c.length; i += 2) per.push([c[i], c[i + 1]]);
    let acc0 = 0; for (let i = 0; i < per.length; i++) { const a = per[i], b = per[(i + 1) % per.length]; const Ls = Math.hypot(b[0] - a[0], b[1] - a[1]); if (Ls < 1) continue; const nx = -(b[1] - a[1]) / Ls, nz = (b[0] - a[0]) / Ls;
      for (let s = (9 - acc0 % 9); s < Ls; s += 9) { let x = a[0] + (b[0] - a[0]) * s / Ls, z = a[1] + (b[1] - a[1]) * s / Ls; let px = x + nx * 5, pz = z + nz * 5; if (!pip(px, pz, c)) { px = x - nx * 5; pz = z - nz * 5; } if (!pip(px, pz, c) || onCarriagewayEarly(px, pz)) continue;
        if (Math.random() < 0.85) TREES.push([px, pz, 0, rnd(1.0, 1.25), 1]); const bx = px + (b[0] - a[0]) / Ls * 4.5, bz = pz + (b[1] - a[1]) / Ls * 4.5; if (Math.random() < 0.5) PLAZA_PROPS.push(['bench', bx, bz, Math.atan2(nx, nz)]); else LAMPS.push([bx, bz, Math.atan2(nx, nz), true]); }
      acc0 += Ls; }
    PLAZA_PROPS.push(['kiosk', ...F2.W(uc, 0)]);
  }
  // ---- Avenida de La Trinidad: hall under the first stretch of the avenue, ramp on the side of the road
  const roads = DATA.R.filter((r) => r[1] >= 0 && STR[r[1]] === 'Avenida de La Trinidad');
  if (roads.length) {
    // the end of the avenue closest to the old town
    let best = null; for (const r of roads) { const q = r[4]; for (const i of [0, q.length - 2]) { const d = Math.hypot(q[i] - PLAZA.x, q[i + 1] - PLAZA.z); if (!best || d < best.d) best = { d, r, i }; } }
    const q = best.r[4], fwd = best.i === 0 ? 1 : -1; const pts = []; for (let i = 0; i < q.length; i += 2) pts.push([q[i], q[i + 1]]); if (fwd < 0) pts.reverse();
    // walk 70 m from the end along the avenue
    const along = (s) => { let acc = 0; for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1], Ls = Math.hypot(b[0] - a[0], b[1] - a[1]); if (acc + Ls >= s) { const t = (s - acc) / Ls; return { x: a[0] + (b[0] - a[0]) * t, z: a[1] + (b[1] - a[1]) * t, ux: (b[0] - a[0]) / Ls, uz: (b[1] - a[1]) / Ls }; } acc += Ls; } const a = pts[pts.length - 2], b = pts[pts.length - 1], Ls = Math.hypot(b[0] - a[0], b[1] - a[1]); return { x: b[0], z: b[1], ux: (b[0] - a[0]) / Ls, uz: (b[1] - a[1]) / Ls }; };
    const m = along(75); const w = best.r[2]; const L = 64;
    const F = { cx: m.x, cz: m.z, ux: m.ux, uz: m.uz }; F.W = (u, v) => [F.cx + F.ux * u - F.uz * v, F.cz + F.uz * u + F.ux * v];
    let gmin = 1e9; for (let u = -L / 2; u <= L / 2; u += 6) for (let v = -15; v <= 15; v += 5) { const [x, z] = F.W(u, v); gmin = Math.min(gmin, heightAt(x, z)); }
    const yF = gmin - 5.4;
    // look for a free strip on either side of the avenue for the ramp (beside the carriageway, not on it, not in buildings)
    let ramp = null;
    for (const side of [1, -1]) for (const vr of [w / 2 + 3.6, w / 2 + 2.6, w / 2 + 4.6, w / 2 + 1.8]) for (const dirS of [1, -1]) {
      if (ramp) break; const v = side * vr; if (Math.abs(v) > 15.5 - 3.2) continue;
      const u1 = dirS * (L / 2 - 3.5); let u0 = dirS * (L / 2 + 30); { const t0 = F.W(u0, v); const drop = heightAt(t0[0], t0[1]) - yF; u0 = dirS * (L / 2 - 3.5 + Math.max(33, drop / 0.13 + 8)); const t1 = F.W(u0, v); const drop2 = heightAt(t1[0], t1[1]) - yF; u0 = dirS * (L / 2 - 3.5 + Math.max(33, drop2 / 0.13 + 8)); } let ok = true;
      for (let u = Math.min(u0, u1); u <= Math.max(u0, u1); u += 2) for (const dv of [-3.4, 0, 3.4]) { const [x, z] = F.W(u, v + dv); if (inAnyBuilding(x, z) || (Math.abs(u) > L / 2 - 6 && COL.nearSeg(x, z, 0.6))) { ok = false; break; } }
      if (ok) ramp = { v, u0, u1 };
    }
    console.log('trinidad ramp', JSON.stringify(ramp), 'w', w, 'centre', F.cx | 0, F.cz | 0);
    if (!ramp) ramp = { v: 7.25, u0: L / 2 + 30, u1: L / 2 - 3.5 }; // fallback: from the end of the avenue's island
    // stairwells on real pavement (never on a carriageway). If the pavement is outside the hall, an underground corridor joins them.
    // only the open part (pavilion + hole, first ~8 m) must be on pavement; the rest of the flight is underground
    const swOk = (u0, v0, du, dv) => { for (let t = -1; t <= 8.5; t += 0.75) for (const q of [-1.4, 0, 1.4]) { const [x, z] = F.W(u0 + du * t - dv * q, v0 + dv * t + du * q); if (inAnyBuilding(x, z) || onCarriagewayEarly(x, z) || COL.nearSeg(x, z, 0.3)) return false; } return true; };
    const found = [];
    for (const side of [1, -1]) { let best = null;
      // a) along the avenue on the pavement, b) in a side street, going down towards the avenue
      for (let av = 9; av <= 34 && !best; av += 0.7) for (let uu = -34; uu <= 34 && !best; uu += 2) for (const [du, dv] of [[1, 0], [-1, 0], [0, -side]]) {
        const ue = du ? uu + du * 11.5 : uu; if (Math.abs(ue) > L / 2 - 2.5) continue; if (dv && av < 24) continue; if (Math.abs(ramp.u1 - ue) < 6 && Math.sign(ramp.v) === side) continue;
        if (swOk(uu, side * av, du, dv)) { best = { u: uu, v: side * av, du, dv, ue }; break; } }
      if (best) found.push(best); }
    const gaps = [[ramp.u1 > 0 ? 'u+' : 'u-', ramp.v, 7.2]];
    for (const f of found) { const vb = f.v + f.dv * 11.5; if (Math.abs(vb) > 14) gaps.push([f.v > 0 ? 'v+' : 'v-', f.ue, 2.6]); }
    buildHall(F, 0, L, yF, 'Trinidad', gaps);
    const top = F.W(ramp.u0, ramp.v), bot = F.W(ramp.u1, ramp.v); buildRamp(top[0], top[1], bot[0], bot[1], yF, 'PARKING TRINIDAD');
    for (const f of found) { const p = F.W(f.u, f.v); const vb = f.v + f.dv * 11.5; const corr = Math.abs(vb) > 14 ? F.W(f.ue, Math.sign(f.v) * 14.5) : null; const dx = F.ux * f.du - F.uz * f.dv, dz = F.uz * f.du + F.ux * f.dv; buildStairwell(p[0], p[1], dx, dz, yF, corr); }
    console.log('trinidad stairwells', JSON.stringify(found));
    CARPARKS.push({ name: 'Parking Trinidad', x: F.cx, z: F.cz, F, uc: 0, L, yF });
  }
  console.log('car parks', CARPARKS.map((c) => c.name).join(', '), 'ugc', UGC.length);
}
// simple props for the plaza (benches and a kiosk), built after the scenery is ready
const PLAZA_PROPS = [];
function buildPlazaProps() {
  const wood = M(0x7a4a2a, 0.8), iron = M(0x2e3236, 0.5, 0.5), white = M(0xf2efe8, 0.8), green = M(0x2f6b3a, 0.6);
  for (const p of PLAZA_PROPS) {
    if (inCut(p[1], p[2], 1.2)) continue;
    const g = new THREE.Group();
    if (p[0] === 'bench') { const s = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.45), wood); s.position.y = 0.45; const b = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 0.06), wood); b.position.set(0, 0.7, -0.2); g.add(s, b); for (const k of [-0.8, 0.8]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.45), iron); l.position.set(k, 0.22, 0); g.add(l); } g.rotation.y = p[3] || 0; COL.addCirc(p[1], p[2], 0.5); }
    else if (p[0] === 'kiosk') { const base = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 2.6, 8), white); base.position.y = 1.3; const roof = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.2, 8), green); roof.position.y = 3.2; g.add(base, roof); COL.addCirc(p[1], p[2], 1.9); }
    g.position.set(p[1], heightAt(p[1], p[2]), p[2]); g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); scene.add(g);
  }
}
