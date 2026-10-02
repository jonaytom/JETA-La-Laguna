// ============ plazas & parks: Plaza del Adelantado, Camino Largo, Parque de la Constitución and every other square / park ============
// Squares get a ring of trees, benches facing in, lanterns and a centrepiece; parks get paved paths (a loop and cross paths),
// benches and lamps along them, lawns, and in the bigger ones a playground. Hand-made pieces for the famous places.
const PK2 = { fountains: [], ducks: [] };
function flatArea(c) { let a = 0; for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2) a += (c[j] - c[i]) * (c[j + 1] + c[i + 1]); return Math.abs(a / 2); }
function flatCentroid(c) { let x = 0, z = 0; const n = c.length / 2; for (let i = 0; i < c.length; i += 2) { x += c[i]; z += c[i + 1]; } return [x / n, z / n]; }
// inward offset of a polygon (per-vertex bisector; good enough for the mostly convex squares and parks)
function flatInset(c, d) {
  const n = c.length / 2; let s = 0; for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2) s += (c[j] - c[i]) * (c[j + 1] + c[i + 1]); const sg = s > 0 ? 1 : -1; const out = [];
  for (let i = 0; i < n; i++) { const p = (i - 1 + n) % n, q = (i + 1) % n; const ax = c[i * 2] - c[p * 2], az = c[i * 2 + 1] - c[p * 2 + 1], bx = c[q * 2] - c[i * 2], bz = c[q * 2 + 1] - c[i * 2 + 1]; const la = Math.hypot(ax, az) || 1, lb = Math.hypot(bx, bz) || 1;
    const n1x = -az / la * sg, n1z = ax / la * sg, n2x = -bz / lb * sg, n2z = bx / lb * sg; let mx = n1x + n2x, mz = n1z + n2z; const ml = Math.hypot(mx, mz) || 1; mx /= ml; mz /= ml; const k = d / Math.max(0.35, mx * n1x + mz * n1z);
    out.push(c[i * 2] + mx * k, c[i * 2 + 1] + mz * k); }
  return pip(...flatCentroid(out), c) ? out : null;
}
function buildPlazasParks() {
  const placed = []; // [x,z,r] keep-out discs (features), used to clear trees and avoid overlaps
  const paths = []; // segments [x1,z1,x2,z2,w]
  const bench = [], bin = [], bed = [], playground = [], bust = [];
  const free = (x, z, r) => !COL.nearSeg(x, z, r) && !onCarriageway(x, z, r * 0.6) && !inAnyBuilding(x, z) && !placed.some((p) => Math.hypot(p[0] - x, p[1] - z) < p[2] + r);
  const addPath = (pts, w = 2.6) => { ribbon(pts, w, 'footway', YOFF.footway + 0.005, 2.4, w / 2.4); for (let i = 0; i < pts.length - 2; i += 2) paths.push([pts[i], pts[i + 1], pts[i + 2], pts[i + 3], w]); };
  const nearPath = (x, z, m) => paths.some((s) => { const dx = s[2] - s[0], dz = s[3] - s[1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - s[0]) * dx + (z - s[1]) * dz) / L2, 0, 1); return Math.hypot(x - s[0] - dx * t, z - s[1] - dz * t) < s[4] / 2 + m; });
  const benchAt = (x, z, faceX, faceZ) => { if (!free(x, z, 0.7)) return false; bench.push([x, z, Math.atan2(faceX - x, faceZ - z)]); placed.push([x, z, 0.9]); return true; };
  const lampAt = (x, z) => { if (!free(x, z, 0.4)) return; LAMPS.push([x, z, 0, true]); placed.push([x, z, 0.5]); };
  const tree = (x, z, type, s) => { if (!free(x, z, 1.0) || nearPath(x, z, 1.2)) return false; TREES.push([x, z, type, s, 1]); placed.push([x, z, type === 0 ? 2.0 : 1.2]); return true; };
  // walk along a polyline every `step` metres
  const along = (pts, step, fn, start = step / 2) => { let acc = start; for (let i = 0; i < pts.length - 2; i += 2) { const x1 = pts[i], z1 = pts[i + 1], x2 = pts[i + 2], z2 = pts[i + 3], L = Math.hypot(x2 - x1, z2 - z1); if (L < 0.1) continue; const ux = (x2 - x1) / L, uz = (z2 - z1) / L; while (acc < L) { fn(x1 + ux * acc, z1 + uz * acc, ux, uz); acc += step; } acc -= L; } };

  // ---------------- Plaza del Adelantado (the block ringed by the streets of the same name)
  {
    const corners = [[110.5, 33.5], [183.0, 37.5], [178.0, -26.5], [127.5, -37.0], [114.0, 16.5]];
    const poly = corners.flat(); const C = flatInset(poly, 1.0) || poly; const [cx, cz] = flatCentroid(C);
    // paving: light stone walks from the fountain to the middle of each side, and a ring round the fountain
    const ring = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * Math.PI * 2; ring.push(cx + Math.cos(a) * 9.5, cz + Math.sin(a) * 9.5); } addPath(ring, 3.2);
    for (let i = 0; i < corners.length; i++) { const a = corners[i], b = corners[(i + 1) % corners.length]; const mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2; const dx = mx - cx, dz = mz - cz, L = Math.hypot(dx, dz); addPath([cx + dx / L * 11, cz + dz / L * 11, mx - dx / L * 1.5, mz - dz / L * 1.5], 3.0); }
    marbleFountain(cx, cz); placed.push([cx, cz, 6.2]);
    // flower beds round the fountain, benches on the ring facing it
    for (let i = 0; i < 8; i++) { const a = (i + 0.5) / 8 * Math.PI * 2; const r = 7.0; bed.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r, a, 2.2, 1.0]); }
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.31; benchAt(cx + Math.cos(a) * 12.2, cz + Math.sin(a) * 12.2, cx, cz); }
    // the Indian laurels: rows inside the perimeter and among the walks (big old trees)
    const T = flatInset(poly, 3.2) || poly; along(T.concat(T.slice(0, 2)), 9.5, (x, z) => tree(x, z, 0, rnd(1.2, 1.45)));
    const T2 = flatInset(poly, 12) || null; if (T2) along(T2.concat(T2.slice(0, 2)), 10, (x, z) => { if (Math.hypot(x - cx, z - cz) > 15) tree(x, z, 0, rnd(1.25, 1.5)); });
    // benches under the trees along the walks, lanterns at the corners of the walks
    for (const s of paths.slice()) { const dx = s[2] - s[0], dz = s[3] - s[1], L = Math.hypot(dx, dz); if (L < 8) continue; const ux = dx / L, uz = dz / L; for (let t = 5; t < L - 3; t += 7) for (const sg of [1, -1]) { const x = s[0] + ux * t - uz * sg * (s[4] / 2 + 0.8), z = s[1] + uz * t + ux * sg * (s[4] / 2 + 0.8); benchAt(x, z, x + uz * sg, z - ux * sg); } }
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; lampAt(cx + Math.cos(a) * 14.5, cz + Math.sin(a) * 14.5); }
    along(T.concat(T.slice(0, 2)), 17, (x, z) => lampAt(x, z), 4);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.6; const x = cx + Math.cos(a) * 12.4, z = cz + Math.sin(a) * 12.4; if (free(x, z, 0.4)) { bin.push([x, z, a]); placed.push([x, z, 0.4]); } }
    PK2.adelantado = [cx, cz];
  }
  // ---------------- Camino Largo: the 700 m walk lined with ~200 Canary palms, benches and lanterns
  {
    const ways = DATA.R.filter((r) => r[1] >= 0 && STR[r[1]] === 'Avenida Universidad' && RTN[r[0]] === 'service');
    for (const rd of ways) { const c = rd[4]; const w = rd[2];
      along(c, 24, (x, z, ux, uz) => { const sg = Math.random() < 0.5 ? 1 : -1; const px = x - uz * sg * (w / 2 + 2.4), pz = z + ux * sg * (w / 2 + 2.4); benchAt(px, pz, x, z); }, 10);
      along(c, 21, (x, z, ux, uz) => { const px = x + uz * (w / 2 + 0.9), pz = z - ux * (w / 2 + 0.9); lampAt(px, pz); }, 6); }
  }
  // two rows of palms, one on each outer edge of the whole walk (the ways inside it are lanes of the same promenade)
  { const ways = DATA.R.filter((r) => r[1] >= 0 && STR[r[1]] === 'Avenida Universidad' && RTN[r[0]] === 'service'); const P = []; for (const r of ways) along(r[4], 3, (x, z) => P.push([x, z, r[2]]), 0);
    if (P.length > 4) { let a = P[0], b = P[0]; for (const p of P) for (const q of P) if (p[0] < q[0] + 1e9 && Math.hypot(p[0] - q[0], p[1] - q[1]) > Math.hypot(a[0] - b[0], a[1] - b[1])) { a = p; b = q; }
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
      for (let t = 4; t < L - 4; t += 7) { let lo = 1e9, hi = -1e9; for (const p of P) { const s2 = (p[0] - a[0]) * ux + (p[1] - a[1]) * uz; if (Math.abs(s2 - t) > 22) continue; const v = -(p[0] - a[0]) * uz + (p[1] - a[1]) * ux; lo = Math.min(lo, v - p[2] / 2); hi = Math.max(hi, v + p[2] / 2); }
        if (lo > hi) continue; for (const v of [lo - 1.4, hi + 1.4]) { const x = a[0] + ux * t - uz * v, z = a[1] + uz * t + ux * v; if (onCarriageway(x, z, 0.3)) { PK2.palmFail = (PK2.palmFail || 0) + 1; continue; } if (tree(x, z, 1, rnd(1.15, 1.35))) PK2.palms = (PK2.palms || 0) + 1; else PK2.palmFail2 = (PK2.palmFail2 || 0) + 1; } } console.log('camino largo axis', a, b, L); } }
  // ---------------- Parque de la Constitución: duck pond, playground, Martí and Bolívar busts
  {
    const a = DATA.A.find((q) => q[1] >= 0 && /Parque de la Constituci/.test(STR[q[1]]));
    if (a) { const c = a[2]; const [cx, cz] = flatCentroid(c);
      const pc = [cx - 14, cz + 6]; duckPond(pc[0], pc[1], 11, 6.5); placed.push([pc[0], pc[1], 12]);
      for (const p of DATA.P) { const n = STR[p[0]]; if (n === 'José Martí' || n === 'Simón Bolivar') { bust.push([p[2], p[3], n === 'José Martí' ? 'JOSÉ MARTÍ' : 'SIMÓN BOLÍVAR']); placed.push([p[2], p[3], 2]); } }
      playground.push([cx + 22, cz - 4, 0.3]); placed.push([cx + 22, cz - 4, 9]);
      PK2.constitucion = [cx, cz];
    }
  }
  // ---------------- every park / garden: paths, benches, lamps, a playground in the big ones
  const AT = DATA.AT;
  for (const a of DATA.A) {
    const k = AT[a[0]]; if (k !== 'park' && k !== 'garden') continue; const c = a[2]; const ar = flatArea(c); if (ar < 900) continue;
    const big = ar > 6000; const loop = flatInset(c, big ? 6 : 4); if (!loop) continue; const [cx, cz] = flatCentroid(c);
    // loop path, and cross paths from the middle to the middle of the longest sides
    addPath(loop.concat(loop.slice(0, 2)), big ? 3.2 : 2.6);
    const sides = []; for (let i = 0; i < loop.length; i += 2) { const j = (i + 2) % loop.length; sides.push([Math.hypot(loop[j] - loop[i], loop[j + 1] - loop[i + 1]), (loop[i] + loop[j]) / 2, (loop[i + 1] + loop[j + 1]) / 2]); }
    sides.sort((p, q) => q[0] - p[0]); for (const s of sides.slice(0, ar > 3000 ? 3 : 2)) addPath([cx, cz, s[1], s[2]], 2.4);
    // a small roundel in the middle with a fountain or a big tree
    if (ar > 2500) { const ring = []; for (let i = 0; i <= 18; i++) { const t = i / 18 * Math.PI * 2; ring.push(cx + Math.cos(t) * 5.5, cz + Math.sin(t) * 5.5); } addPath(ring, 2.4);
      if (ar > 7000 && !PK2.fountains.some((f) => Math.hypot(f[0] - cx, f[1] - cz) < 80) && !placed.some((p) => Math.hypot(p[0] - cx, p[1] - cz) < p[2] + 3)) { stoneFountain(cx, cz, 2.6); placed.push([cx, cz, 3.2]); } }
    // benches on the loop facing the lawns, lamps
    along(loop.concat(loop.slice(0, 2)), big ? 16 : 13, (x, z, ux, uz) => { const px = x - uz * 2.2, pz = z + ux * 2.2; benchAt(px, pz, x, z) || benchAt(x + uz * 2.2, z - ux * 2.2, x, z); });
    along(loop.concat(loop.slice(0, 2)), 22, (x, z, ux, uz) => lampAt(x + uz * 1.8, z - ux * 1.8), 8);
    if (ar > 5000 && !playground.some((p) => Math.hypot(p[0] - cx, p[1] - cz) < 120)) { for (let t = 0; t < 10; t++) { const px = cx + rnd(-25, 25), pz = cz + rnd(-25, 25); if (pip(px, pz, c) && free(px, pz, 8) && !nearPath(px, pz, 6)) { playground.push([px, pz, Math.random() * 6]); placed.push([px, pz, 9]); break; } } }
    // flower beds at path junctions
    for (const s of sides.slice(0, 2)) { const x = s[1], z = s[2]; for (const d of [-1, 1]) { const bx = x + d * 3.2, bz = z + d * 1.0; if (free(bx, bz, 1.2) && !nearPath(bx, bz, 0.6)) { bed.push([bx, bz, Math.random() * 3, 2.4, 1.2]); placed.push([bx, bz, 1.5]); } } }
  }
  // ---------------- every square: trees round the edge, benches facing in, lanterns, a centrepiece
  const squares = [];
  for (const a of DATA.A) if (AT[a[0]] === 'square') squares.push(a[2]);
  for (const rd of DATA.R) { const c = rd[4]; if (RTN[rd[0]] === 'pedestrian' && c.length >= 8 && c[0] === c[c.length - 2] && c[1] === c[c.length - 1]) squares.push(c.slice(0, -2)); }
  for (const c of squares) {
    const ar = flatArea(c); if (ar < 250 || ar > 20000) continue; const [cx, cz] = flatCentroid(c); if (CARPARKS.some((p) => Math.hypot(p.x - cx, p.z - cz) < 60)) continue;
    if (PK2.adelantado && Math.hypot(PK2.adelantado[0] - cx, PK2.adelantado[1] - cz) < 45) continue;
    const hist = isHistoric(cx, cz); const edge = flatInset(c, 2.6); if (!edge) continue;
    along(edge.concat(edge.slice(0, 2)), hist ? 9 : 8, (x, z, ux, uz) => { if (Math.random() < 0.85) tree(x, z, hist ? 0 : (Math.random() < 0.5 ? 1 : 3), hist ? rnd(1.1, 1.4) : rnd(0.85, 1.1)); });
    along(edge.concat(edge.slice(0, 2)), hist ? 9 : 8, (x, z) => { benchAt(x + (cx - x) * 0.12, z + (cz - z) * 0.12, cx, cz); }, hist ? 4.5 : 4);
    along(edge.concat(edge.slice(0, 2)), 18, (x, z) => lampAt(x + (cx - x) * 0.06, z + (cz - z) * 0.06), 9);
    if ((hist ? ar > 600 : ar > 1500) && free(cx, cz, 3) && !PK2.fountains.some((f) => Math.hypot(f[0] - cx, f[1] - cz) < 60)) { stoneFountain(cx, cz, ar > 1500 ? 3.2 : 2.3); placed.push([cx, cz, 4]); for (let i = 0; i < 4; i++) { const t = i / 4 * Math.PI * 2 + 0.78; const bx = cx + Math.cos(t) * 5.5, bz = cz + Math.sin(t) * 5.5; if (free(bx, bz, 1)) bed.push([bx, bz, t, 2.0, 0.9]); } }
    else if (ar > 250 && free(cx, cz, 2)) tree(cx, cz, 0, 1.3);
  }
  // keep paths and features clear of the trees scattered earlier
  for (let i = TREES.length - 1; i >= 0; i--) { const t = TREES[i]; if (t[4] === 1 && placed.some((p) => p[0] === t[0] && p[1] === t[1])) continue; if (nearPath(t[0], t[1], 1.0) || placed.some((p) => Math.hypot(p[0] - t[0], p[1] - t[1]) < p[2] * 0.8 + 0.6 && !(p[0] === t[0] && p[1] === t[1]))) TREES.splice(i, 1); }
  buildParkProps(bench, bin, bed, playground, bust);
  console.log('plazas/parks: paths', paths.length, 'benches', bench.length, 'beds', bed.length, 'playgrounds', playground.length, 'fountains', PK2.fountains.length);
}
// ---- instanced furniture
function buildParkProps(bench, bin, bed, playground, bust) {
  const o = new THREE.Object3D();
  const inst = (geo, mat, arr, f) => { if (!arr.length) return; const m = new THREE.InstancedMesh(geo, mat, arr.length); arr.forEach((p, i) => { o.position.set(p[0], heightAt(p[0], p[1]) + 0.1, p[1]); o.rotation.set(0, p[2] || 0, 0); o.scale.set(1, 1, 1); if (f) f(o, p); o.updateMatrix(); m.setMatrixAt(i, o.matrix); }); m.castShadow = true; m.receiveShadow = true; scene.add(m); };
  const wood = M(0x8a5a32, 0.75), iron = M(0x22262a, 0.45, 0.6), stone = M(0xd8d2c4, 0.8), hedge = new THREE.MeshStandardMaterial({ color: 0x3c6a2a, roughness: 0.95, flatShading: true }), flower = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  // classic park bench: wooden slats on cast-iron sides (faces +z)
  const slats = []; for (let k = 0; k < 4; k++) { const g = new THREE.BoxGeometry(1.9, 0.04, 0.09); g.translate(0, 0.45, 0.16 - k * 0.11); slats.push(g); } for (let k = 0; k < 3; k++) { const g = new THREE.BoxGeometry(1.9, 0.09, 0.035); g.rotateX(-0.22); g.translate(0, 0.62 + k * 0.12, -0.24 - k * 0.025); slats.push(g); }
  inst(mergeGeos(slats), wood, bench);
  const side = []; for (const x of [-0.85, 0.85]) { const a = new THREE.BoxGeometry(0.06, 0.45, 0.06); a.translate(x, 0.22, 0.17); const b = new THREE.BoxGeometry(0.06, 0.9, 0.06); b.rotateX(-0.18); b.translate(x, 0.45, -0.2); const c = new THREE.BoxGeometry(0.06, 0.05, 0.5); c.translate(x, 0.43, -0.02); const d = new THREE.BoxGeometry(0.06, 0.05, 0.42); d.translate(x, 0.66, 0.02); side.push(a, b, c, d); }
  inst(mergeGeos(side), iron, bench); bench.forEach((p) => COL.addCirc(p[0], p[1], 0.55));
  // litter bins
  inst((() => { const g = new THREE.CylinderGeometry(0.24, 0.2, 0.75, 10, 1, true); g.translate(0, 0.42, 0); return g; })(), M(0x2f5d3a, 0.5, 0.3), bin);
  // flower beds: low hedge border + flowers
  inst((() => { const g = new THREE.BoxGeometry(1, 0.42, 1); g.translate(0, 0.21, 0); return g; })(), hedge, bed, (ob, p) => ob.scale.set(p[3], 1, p[4]));
  if (bed.length) { const m = new THREE.InstancedMesh((() => { const g = jitterGeo(new THREE.IcosahedronGeometry(0.5, 1), 0.15, 7); g.scale(1, 0.45, 1); g.translate(0, 0.5, 0); return g; })(), flower, bed.length); const col = new THREE.Color();
    bed.forEach((p, i) => { o.position.set(p[0], heightAt(p[0], p[1]) + 0.1, p[1]); o.rotation.set(0, p[2], 0); o.scale.set(p[3] * 0.8, 1, p[4] * 0.7); o.updateMatrix(); m.setMatrixAt(i, o.matrix); m.setColorAt(i, col.set(pick([0xd6336c, 0xf2c12e, 0xe8590c, 0xf8f9fa, 0x9c36b5]))); }); scene.add(m); }
  bed.forEach((p) => COL.addCirc(p[0], p[1], Math.max(p[3], p[4]) * 0.5));
  // playgrounds: soft red floor, swings, slide, climbing frame, spring riders
  for (const [x, z, h] of playground) {
    const g = new THREE.Group(); const y = heightAt(x, z) + 0.1; const R = M(0xb8432f, 0.95), Y = M(0xf2c12e, 0.5), B = M(0x1c6fb5, 0.5), Gm = M(0x2f9e44, 0.5), steel = M(0xb0b4b8, 0.35, 0.7);
    const fl = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 0.06, 28), R); fl.position.y = 0.03; g.add(fl);
    // swings
    for (const sx of [-1.2, 1.2]) for (const sz of [-0.9, 0.9]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 6), Y); leg.position.set(-3 + sx, 1.25, -2.5 + sz * 0.5); leg.rotation.x = sz * 0.28; g.add(leg); }
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.8, 6), Y); bar.rotation.z = Math.PI / 2; bar.position.set(-3, 2.5, -2.5); g.add(bar);
    for (const sx of [-0.6, 0.6]) { for (const cz of [-0.18, 0.18]) { const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.9, 3), steel); ch.position.set(-3 + sx, 1.55, -2.5 + cz); g.add(ch); } const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.4), B); seat.position.set(-3 + sx, 0.6, -2.5); g.add(seat); }
    // slide with ladder and platform
    const plat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), B); plat.position.set(2.5, 1.6, -1.5); g.add(plat);
    for (const sx of [-0.55, 0.55]) for (const sz of [-0.55, 0.55]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.4, 0.1), Y); p.position.set(2.5 + sx, 1.2, -1.5 + sz); g.add(p); }
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.0, 0.7, 4), R); roof.position.set(2.5, 2.75, -1.5); roof.rotation.y = Math.PI / 4; g.add(roof);
    const slide = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 2.9), Gm); slide.position.set(2.5, 0.85, 0.75); slide.rotation.x = 0.58; g.add(slide);
    const lad = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 1.9), Y); lad.position.set(2.5, 0.85, -2.85); lad.rotation.x = -1.0; g.add(lad);
    // climbing dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xe03131, wireframe: true })); dome.position.set(0, 0.05, 3.2); g.add(dome);
    // spring riders
    for (const [sx, col] of [[-3.5, Gm], [3.8, Y]]) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5, 8), steel); sp.position.set(sx, 0.3, 3); g.add(sp); const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.9), col); body.position.set(sx, 0.75, 3); g.add(body); }
    g.position.set(x, y, z); g.rotation.y = h; g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); scene.add(g);
    for (const [px, pz] of [[-3, -2.5], [2.5, -1.5], [0, 3.2]]) { const c = Math.cos(h), s = Math.sin(h); COL.addCirc(x + px * c + pz * s, z - px * s + pz * c, 1.2); }
  }
  // bronze busts on basalt plinths
  for (const [x, z, name] of bust) {
    const g = new THREE.Group(); const y = heightAt(x, z) + 0.1; const bas = M(0x3b3a38, 0.9), bro = M(0x5b4a2e, 0.35, 0.8);
    addMesh(g, new THREE.BoxGeometry(1.3, 0.3, 1.3), bas, 0, 0.15, 0); addMesh(g, new THREE.BoxGeometry(0.85, 1.5, 0.85), bas, 0, 1.05, 0); addMesh(g, new THREE.BoxGeometry(1.05, 0.15, 1.05), bas, 0, 1.85, 0);
    const tor = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), bro); tor.scale.set(1.25, 1.1, 0.8); tor.position.y = 1.93; g.add(tor);
    addMesh(g, new THREE.CylinderGeometry(0.11, 0.13, 0.22, 8), bro, 0, 2.48, 0); const hd = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), bro); hd.scale.set(0.9, 1.12, 1); hd.position.y = 2.75; g.add(hd);
    const pl = textPlane(name, 0.8, 0.18, '#c9b27a', '#2b2416', 'bold 30px Georgia'); pl.position.set(0, 1.25, 0.43); g.add(pl);
    g.position.set(x, y, z); g.rotation.y = Math.random() * 0.6 - 0.3; scene.add(g); COL.addCirc(x, z, 0.8);
  }
}
// ---- neoclassical marble fountain (Plaza del Adelantado, Genoa marble, 1870): octagonal basin, pedestal, two bowls and a finial
function marbleFountain(x, z) {
  const g = new THREE.Group(); const y = heightAt(x, z) + 0.12; const mar = new THREE.MeshStandardMaterial({ color: 0xeeebe4, roughness: 0.35 }); const vein = new THREE.MeshStandardMaterial({ color: 0xd9d4ca, roughness: 0.4 });
  const water = new THREE.MeshStandardMaterial({ color: 0x4d8ea3, roughness: 0.05, metalness: 0.25, transparent: true, opacity: 0.85 });
  const sheet = new THREE.MeshStandardMaterial({ color: 0xcfe8f0, roughness: 0.1, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
  // basin: octagonal wall with moulded rim and steps
  addMesh(g, new THREE.CylinderGeometry(5.6, 5.8, 0.2, 8), vein, 0, 0.1, 0, Math.PI / 8);
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.1, 0.75, 8, 1, true), mar); wall.position.y = 0.55; wall.rotation.y = Math.PI / 8; g.add(wall);
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(4.7, 4.7, 0.75, 8, 1, true), mar); inner.material = mar; inner.position.y = 0.55; inner.rotation.y = Math.PI / 8; g.add(inner); inner.material.side = THREE.DoubleSide;
  const rim = new THREE.Mesh(new THREE.RingGeometry(4.65, 5.25, 8), mar); rim.rotation.x = -Math.PI / 2; rim.rotation.z = Math.PI / 8; rim.position.y = 0.93; g.add(rim);
  const wt = new THREE.Mesh(new THREE.CircleGeometry(4.7, 8), water); wt.rotation.x = -Math.PI / 2; wt.rotation.z = Math.PI / 8; wt.position.y = 0.72; g.add(wt);
  // pedestal (square, with mouldings) and shaft
  addMesh(g, new THREE.BoxGeometry(1.6, 0.3, 1.6), vein, 0, 0.85, 0); addMesh(g, new THREE.BoxGeometry(1.3, 1.1, 1.3), mar, 0, 1.5, 0); addMesh(g, new THREE.BoxGeometry(1.55, 0.18, 1.55), vein, 0, 2.12, 0);
  const shaft = new THREE.Mesh(new THREE.LatheGeometry([[0.0, 0], [0.42, 0], [0.42, 0.1], [0.3, 0.25], [0.26, 0.9], [0.32, 1.05], [0.36, 1.15], [0, 1.15]].map((p) => new THREE.Vector2(p[0], p[1])), 20), mar); shaft.position.y = 2.2; g.add(shaft);
  // lower bowl (scalloped look via 16 segments) and water sheet falling from its lip
  const bowl = (r, y0) => { const pts = [[0, 0], [0.25, 0], [r * 0.55, 0.12], [r * 0.92, 0.32], [r, 0.42], [r * 0.96, 0.46], [r * 0.5, 0.36], [0, 0.34]].map((p) => new THREE.Vector2(p[0], p[1])); const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 16), mar); m.position.y = y0; g.add(m);
    const w2 = new THREE.Mesh(new THREE.CircleGeometry(r * 0.9, 16), water); w2.rotation.x = -Math.PI / 2; w2.position.y = y0 + 0.4; g.add(w2);
    const fall = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.0, r * 1.12, y0 + 0.42 - 0.72, 24, 1, true), sheet); fall.position.y = (y0 + 0.42 + 0.72) / 2; g.add(fall); PK2.fountains.push([x, z]); return fall; };
  const f1 = bowl(2.0, 3.35);
  const sh2 = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.22, 0], [0.16, 0.2], [0.14, 0.8], [0.2, 0.95], [0, 0.95]].map((p) => new THREE.Vector2(p[0], p[1])), 14), mar); sh2.position.y = 3.75; g.add(sh2);
  const f2 = bowl(1.0, 4.7);
  // finial: a small pine-cone on a knob, with the jet
  addMesh(g, new THREE.SphereGeometry(0.2, 12, 8), mar, 0, 5.3, 0); const cone = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.45, 10), mar); cone.position.y = 5.65; g.add(cone);
  const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.05, 0.8, 6), sheet); jet.position.y = 6.15; g.add(jet);
  // four little lion-head spouts on the pedestal pouring into the basin
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; const sp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), vein); sp.position.set(Math.sin(a) * 0.68, 1.6, Math.cos(a) * 0.68); g.add(sp);
    const arc = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.0, 6), sheet); arc.position.set(Math.sin(a) * 1.05, 1.15, Math.cos(a) * 1.05); arc.rotation.set(Math.cos(a) * 0.7, 0, -Math.sin(a) * 0.7); g.add(arc); }
  g.position.set(x, y, z); g.traverse((m) => { if (m.isMesh && m.material !== sheet) { m.castShadow = true; m.receiveShadow = true; } }); scene.add(g); COL.addCirc(x, z, 5.4);
  // the falling water shimmers
  const t0 = performance.now(); f1.onBeforeRender = () => { const t = (performance.now() - t0) / 1000; sheet.opacity = 0.3 + Math.sin(t * 7) * 0.05; f1.scale.set(1 + Math.sin(t * 9) * 0.01, 1, 1 + Math.cos(t * 8) * 0.01); };
  return g;
}
// smaller basalt-and-stone fountain for other squares and park roundels
function stoneFountain(x, z, r = 2.4) {
  const g = new THREE.Group(); const y = heightAt(x, z) + 0.12; const bas = M(0x55524c, 0.85), st = M(0xd8d2c4, 0.6);
  const water = new THREE.MeshStandardMaterial({ color: 0x4d8ea3, roughness: 0.05, metalness: 0.25 });
  const wl = new THREE.Mesh(new THREE.CylinderGeometry(r, r + 0.1, 0.6, 12, 1, true), bas); wl.position.y = 0.3; wl.material.side = THREE.DoubleSide; g.add(wl);
  const rim = new THREE.Mesh(new THREE.RingGeometry(r - 0.28, r + 0.15, 12), st); rim.rotation.x = -Math.PI / 2; rim.position.y = 0.61; g.add(rim);
  const wt = new THREE.Mesh(new THREE.CircleGeometry(r - 0.25, 12), water); wt.rotation.x = -Math.PI / 2; wt.position.y = 0.48; g.add(wt);
  addMesh(g, new THREE.CylinderGeometry(0.28, 0.4, 1.5, 10), st, 0, 1.1, 0);
  const b = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.2, 0], [r * 0.3, 0.12], [r * 0.38, 0.22], [r * 0.36, 0.26], [0, 0.22]].map((p) => new THREE.Vector2(p[0], p[1])), 14), st); b.position.y = 1.8; g.add(b);
  addMesh(g, new THREE.SphereGeometry(0.16, 10, 8), st, 0, 2.15, 0);
  g.position.set(x, y, z); g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); scene.add(g); COL.addCirc(x, z, r + 0.1); PK2.fountains.push([x, z]); return g;
}
// raised oval pond with a stone kerb, a little island and ducks paddling about
function duckPond(x, z, rx, rz) {
  const g = new THREE.Group(); const y = heightAt(x, z) + 0.1; const st = M(0x8f8a80, 0.85);
  const water = new THREE.MeshStandardMaterial({ color: 0x3f7d6f, roughness: 0.08, metalness: 0.2 });
  const shape = new THREE.Shape(); shape.absellipse(0, 0, rx, rz, 0, Math.PI * 2); const wt = new THREE.Mesh(new THREE.ShapeGeometry(shape, 40), water); wt.rotation.x = -Math.PI / 2; wt.position.y = 0.32; g.add(wt);
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, a2 = (i + 1) / 40 * Math.PI * 2; const px = Math.cos(a) * rx, pz = Math.sin(a) * rz, qx = Math.cos(a2) * rx, qz = Math.sin(a2) * rz; const L = Math.hypot(qx - px, qz - pz);
    const k = new THREE.Mesh(new THREE.BoxGeometry(L + 0.05, 0.5, 0.45), st); k.position.set((px + qx) / 2, 0.25, (pz + qz) / 2); k.rotation.y = -Math.atan2(qz - pz, qx - px); g.add(k); }
  const isl = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 0.5, 10), M(0x4f7a32, 0.95)); isl.position.set(rx * 0.35, 0.3, 0); g.add(isl);
  g.position.set(x, y, z); scene.add(g);
  for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2; COL.addSeg(x + Math.cos(a) * (rx + 0.2), z + Math.sin(a) * (rz + 0.2), x + Math.cos(a + Math.PI / 20) * (rx + 0.2), z + Math.sin(a + Math.PI / 20) * (rz + 0.2)); }
  TREES.push([x + rx * 0.35, z, 1, 0.8, 1]);
  // ducks: body + head + beak, white or mallard-brown; swim slowly round
  const ducks = []; const body = M(0xf4f1ea, 0.7), brown = M(0x7a5a3a, 0.7), green = M(0x1f5e3a, 0.4), beak = M(0xf08c00, 0.6);
  for (let i = 0; i < 7; i++) { const d = new THREE.Group(); const mal = i % 2 === 0; const b = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), mal ? brown : body); b.scale.set(1, 0.7, 1.5); d.add(b);
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), mal ? green : body); h.position.set(0, 0.2, 0.25); d.add(h); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 6), beak); bk.rotation.x = Math.PI / 2; bk.position.set(0, 0.18, 0.4); d.add(bk);
    d.position.y = 0.38; g.add(d); ducks.push({ d, a: Math.random() * 6.28, r: 0.45 + Math.random() * 0.35, sp: (0.08 + Math.random() * 0.1) * (Math.random() < 0.5 ? 1 : -1), ph: Math.random() * 6 }); }
  wt.onBeforeRender = () => { const t = performance.now() / 1000; for (const k of ducks) { const a = k.a + t * k.sp; const px = Math.cos(a) * rx * k.r, pz = Math.sin(a) * rz * k.r; k.d.position.x = px; k.d.position.z = pz; k.d.position.y = 0.38 + Math.sin(t * 2 + k.ph) * 0.015; k.d.rotation.y = Math.atan2(-Math.sin(a) * rx * Math.sign(k.sp), Math.cos(a) * rz * Math.sign(k.sp)); } };
  PK2.ducks.push(g); return g;
}
