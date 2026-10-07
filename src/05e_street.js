// ============ pedestrian old town furniture: terraces, benches, planters, bollards, fountains ============
function isPedRoad(rd) { return RTN[rd[0]] === 'pedestrian'; }
function buildStreetProps() {
  const o = new THREE.Object3D(); const lists = { bench: [], planter: [], bollard: [], table: [], parasol: [], fount: [] };
  const free = (x, z, r) => !COL.nearSeg(x, z, r) && !onCarriageway(x, z, r * 0.5);
  // along pedestrian streets
  for (const rd of DATA.R) {
    if (!isPedRoad(rd)) continue; const c = rd[4], w = rd[2];
    if (c.length >= 8 && c[0] === c[c.length - 2] && c[1] === c[c.length - 1]) continue; // areas
    let acc2 = 6; let side = 1;
    for (let i = 0; i < c.length - 2; i += 2) {
      const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); if (L < 1) continue;
      const ux = (x2 - x1) / L, uz = (z2 - z1) / L, nx = -uz, nz = ux;
      while (acc2 < L) {
        const off = w / 2 - 0.7; const x = x1 + ux * acc2 + nx * off * side, z = z1 + uz * acc2 + nz * off * side;
        const h = Math.atan2(-nx * side, -nz * side);
        const k = Math.random();
        if (free(x, z, 0.9)) { if (k < 0.45) lists.bench.push([x, z, h]); else lists.planter.push([x, z, h]); }
        acc2 += 13 + Math.random() * 8; side = -side;
      }
      acc2 -= L;
    }
    // bollards where pedestrian streets meet car streets
    for (const end of [0, c.length - 2]) {
      const x = c[end], z = c[end + 1]; const k = x + ',' + z; if ((nodeCount.get(k) || 0) < 2) continue;
      const j = end === 0 ? 2 : end - 2; const dx = c[j] - x, dz = c[j + 1] - z, L = Math.hypot(dx, dz) || 1; const ux = dx / L, uz = dz / L;
      const bx = x + ux * 4, bz = z + uz * 4;
      for (let s = -1; s <= 1; s++) { const px = bx - uz * s * (w / 3), pz = bz + ux * s * (w / 3); if (free(px, pz, 0.3)) lists.bollard.push([px, pz, 0]); }
    }
  }
  // café terraces in front of bars/cafés/restaurants on pedestrian streets and squares
  for (const q of SIGN.quads || []) {
    if (!'CRB'.includes(q.cat)) continue;
    const rd = ROADSEG.nearest(q.P[0] + q.N[0] * 3, q.P[1] + q.N[1] * 3); if (!rd || !isPedRoad(DATA.R[rd.ri]) || !isHistoric(q.P[0], q.P[1])) continue;
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) { const s = (i - (n - 1) / 2) * 2.2; const x = q.P[0] + q.N[0] * 2.1 + q.U[0] * s, z = q.P[1] + q.N[1] * 2.1 + q.U[1] * s; if (!free(x, z, 1.0)) continue; lists.table.push([x, z, Math.random() * 6]); if (i % 2 === 0) lists.parasol.push([x, z, 0, q.cat]); }
  }
  // small fountains in the squares between the Catedral and La Concepción
  for (const nm of ['Plaza de los Remedios', 'Plaza de la Concepción', 'Plaza del Doctor Olivera', 'Plaza de San Cristóbal']) {
    const cen = centroidOfNamedWays(nm); if (!cen) continue; let [x, z] = cen;
    for (let t = 0; t < 12 && !free(x, z, 3); t++) { x = cen[0] + rnd(-10, 10); z = cen[1] + rnd(-10, 10); }
    if (free(x, z, 3)) lists.fount.push([x, z, 0]);
  }
  // ---- meshes
  const mk = (geo, mat, arr, col, colFn, scale = 1) => { if (!arr.length) return; const m = new THREE.InstancedMesh(geo, mat, arr.length); const cc = new THREE.Color(); arr.forEach((p, i) => { o.position.set(p[0], heightAt(p[0], p[1]) + 0.13, p[1]); o.rotation.set(0, p[2], 0); o.scale.setScalar(scale); o.updateMatrix(); m.setMatrixAt(i, o.matrix); if (colFn) m.setColorAt(i, cc.set(colFn(p, i))); }); m.castShadow = true; m.receiveShadow = true; scene.add(m); };
  const wood = MAT.wood, iron = M(0x1d1f21, 0.5, 0.6), stoneL = M(0xcfc8bb, 0.8), green = M(0x3d6b2c, 0.85), white = M(0xf0efe9, 0.6);
  // bench: wooden seat & back on iron legs
  const bench = mergeGeos([(() => { const g = new THREE.BoxGeometry(1.8, 0.07, 0.45); g.translate(0, 0.45, 0); return g; })(), (() => { const g = new THREE.BoxGeometry(1.8, 0.4, 0.06); g.translate(0, 0.72, -0.22); return g; })()]);
  const benchLegs = mergeGeos([-0.8, 0.8].map((x) => { const g = new THREE.BoxGeometry(0.06, 0.45, 0.45); g.translate(x, 0.22, 0); return g; }));
  mk(bench, wood, lists.bench); mk(benchLegs, iron, lists.bench);
  lists.bench.forEach((p) => COL.addCirc(p[0], p[1], 0.5));
  // planters: stone box with a bushy shrub
  const pl = new THREE.BoxGeometry(1.1, 0.6, 1.1); pl.translate(0, 0.3, 0); mk(pl, stoneL, lists.planter);
  const bush = jitterGeo(new THREE.IcosahedronGeometry(0.6, 1), 0.2, 33); bush.translate(0, 0.95, 0); mk(bush, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }), lists.planter, null, () => pick([0x3d6b2c, 0x4f7a32, 0x6a8a3a, 0xa33a5a, 0xd9a13a]));
  lists.planter.forEach((p) => COL.addCirc(p[0], p[1], 0.65));
  // bollards
  const bol = mergeGeos([(() => { const g = new THREE.CylinderGeometry(0.1, 0.12, 0.9, 10); g.translate(0, 0.45, 0); return g; })(), (() => { const g = new THREE.SphereGeometry(0.11, 10, 6); g.translate(0, 0.92, 0); return g; })()]);
  mk(bol, iron, lists.bollard); lists.bollard.forEach((p) => COL.addCirc(p[0], p[1], 0.14));
  // terrace tables with chairs
  const table = mergeGeos([(() => { const g = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 14); g.translate(0, 0.74, 0); return g; })(), (() => { const g = new THREE.CylinderGeometry(0.04, 0.04, 0.74, 6); g.translate(0, 0.37, 0); return g; })()]);
  mk(table, white, lists.table);
  const chairs = mergeGeos([0, 1, 2].map((k) => { const a = k / 3 * Math.PI * 2; const g1 = new THREE.BoxGeometry(0.42, 0.05, 0.42); g1.translate(0, 0.45, 0.7); const g2 = new THREE.BoxGeometry(0.42, 0.45, 0.04); g2.translate(0, 0.68, 0.9); const g = mergeGeos([g1, g2]); g.rotateY(a); return g; }));
  mk(chairs, M(0x2b2b2b, 0.6, 0.3), lists.table);
  lists.table.forEach((p) => COL.addCirc(p[0], p[1], 0.9));
  const para = new THREE.ConeGeometry(1.5, 0.5, 8, 1, true); para.translate(0, 2.45, 0);
  mk(para, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide }), lists.parasol, null, (p) => ({ C: 0x7a1f1f, R: 0xf4efe2, B: 0x1d3557 })[p[3]] || 0xf4efe2);
  const pole = new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6); pole.translate(0, 1.2, 0); mk(pole, iron, lists.parasol);
  // fountains: octagonal basalt basin with a stone pillar
  for (const [x, z] of lists.fount) {
    const g = new THREE.Group(); const y = heightAt(x, z) + 0.13;
    addMesh(g, new THREE.CylinderGeometry(2.2, 2.3, 0.6, 8), greyStone, 0, 0.3, 0);
    const wtr = new THREE.Mesh(new THREE.CircleGeometry(2.0, 8), new THREE.MeshStandardMaterial({ color: 0x3f7f95, roughness: 0.05, metalness: 0.2 })); wtr.rotation.x = -Math.PI / 2; wtr.position.y = 0.55; g.add(wtr);
    addMesh(g, new THREE.CylinderGeometry(0.3, 0.45, 1.8, 8), greyStone, 0, 1.2, 0);
    addMesh(g, new THREE.CylinderGeometry(0.8, 0.25, 0.3, 12), greyStone, 0, 2.1, 0);
    addMesh(g, new THREE.SphereGeometry(0.22, 10, 8), greyStone, 0, 2.4, 0);
    fuseGroup(g);
    g.position.set(x, y, z); scene.add(g); COL.addCirc(x, z, 2.3);
  }
  return Object.fromEntries(Object.entries(lists).map(([k, v]) => [k, v.length]));
}
