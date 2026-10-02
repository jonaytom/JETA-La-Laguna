// ============ historic churches: Catedral, La Concepción & the rest ============
const leadMat = new THREE.MeshStandardMaterial({ color: 0x6f7a80, roughness: 0.45, metalness: 0.55 });
const plasterMat = new THREE.MeshStandardMaterial({ color: 0xf4f1e8, roughness: 0.9 });
const greyStone = new THREE.MeshStandardMaterial({ color: 0xb9b4aa, roughness: 0.85 });
const bellMat = new THREE.MeshStandardMaterial({ color: 0x7a5a2a, roughness: 0.35, metalness: 0.8 });
function stoneFor(w, h) { const t = stoneTex.clone(); t.repeat.set(Math.max(1, w / 3), Math.max(1, h / 3)); t.needsUpdate = true; return new THREE.MeshStandardMaterial({ map: t, roughness: 0.92 }); }
function centroidOfNamedWays(name) { let sx = 0, sz = 0, n = 0; for (const r of DATA.R) if (r[1] >= 0 && STR[r[1]] === name) { const c = r[4]; for (let i = 0; i < c.length; i += 2) { sx += c[i]; sz += c[i + 1]; n++; } } return n ? [sx / n, sz / n] : null; }
function axisFrame(pts, cx, cz) {
  // principal axis from longest edges (weighted), u along the church
  let best = 0, ang = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L > best) { best = L; ang = Math.atan2(q[1] - p[1], q[0] - p[0]); } }
  let ux = Math.cos(ang), uz = Math.sin(ang); let vx = -uz, vz = ux;
  let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9; for (const p of pts) { const u = (p[0] - cx) * ux + (p[1] - cz) * uz, v = (p[0] - cx) * vx + (p[1] - cz) * vz; u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); }
  if (v1 - v0 > u1 - u0) { [ux, uz, vx, vz] = [vx, vz, -ux, -uz]; [u0, u1, v0, v1] = [v0, v1, -u1, -u0]; }
  const W = (u, v) => [cx + ux * u + vx * v, cz + uz * u + vz * v];
  return { ux, uz, vx, vz, u0, u1, v0, v1, W, ang: Math.atan2(ux, uz) };
}
function gableRoof(F, y, rise, u0, u1, v0, v1, mat = MAT.roofTile, ov = 0.35) {
  const A = acc(F.W(0, 0)[0], F.W(0, 0)[1], mat === MAT.roofTile ? 'roofTile' : 'trim');
  const vm = (v0 + v1) / 2; const P = (u, v, yy) => { const w = F.W(u, v); return [w[0], yy, w[1]]; };
  const a0 = u0 - ov, a1 = u1 + ov, b0 = v0 - ov, b1 = v1 + ov, ry = y + rise;
  const sl = Math.hypot(rise, (v1 - v0) / 2 + ov) / 1.6, len = (a1 - a0) / 1.6;
  A.quad(P(a0, b0, y - 0.1), P(a1, b0, y - 0.1), P(a1, vm, ry), P(a0, vm, ry), [0, 0], [len, 0], [len, sl], [0, sl], null, undefined, [F.vx * -1, 1, F.vz * -1]);
  A.quad(P(a1, b1, y - 0.1), P(a0, b1, y - 0.1), P(a0, vm, ry), P(a1, vm, ry), [0, 0], [len, 0], [len, sl], [0, sl], null, undefined, [F.vx, 1, F.vz]);
  // gable triangles (whitewashed)
  const G = acc(F.W(0, 0)[0], F.W(0, 0)[1], 'trim'); const wc = [0.95, 0.94, 0.9];
  G.tri(P(u0, v0, y), P(u0, v1, y), P(u0, vm, ry), [0, 0], [0, 0], [0, 0], wc, undefined, [-F.ux, 0, -F.uz]);
  G.tri(P(u1, v1, y), P(u1, v0, y), P(u1, vm, ry), [0, 0], [0, 0], [0, 0], wc, undefined, [F.ux, 0, F.uz]);
  // underside
  G.quad(P(a0, b0, y - 0.1), P(a1, b0, y - 0.1), P(a1, b1, y - 0.1), P(a0, b1, y - 0.1), [0, 0], [0, 0], [0, 0], [0, 0], [0.5, 0.42, 0.36], undefined, [0, -1, 0]);
}
function addMesh(g, geo, mat, x, y, z, ry = 0) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = true; m.receiveShadow = true; g.add(m); return m; }
// Canarian bell tower: stone shaft, string courses, open belfry, balustrade and cupola/pyramid
function bellTower(x, z, ang, w, shaftH, cap = 'cupola', mat) {
  const g = new THREE.Group(); const y0 = heightAt(x, z) - 0.8; const sm = mat || stoneFor(w, shaftH);
  addMesh(g, new THREE.BoxGeometry(w, shaftH, w), sm, 0, shaftH / 2, 0);
  for (const k of [0.33, 0.66, 1]) addMesh(g, new THREE.BoxGeometry(w + 0.35, 0.35, w + 0.35), greyStone, 0, shaftH * k, 0);
  // small windows on the shaft
  for (let s = 0; s < 4; s++) for (const k of [0.5, 0.82]) { const a = s * Math.PI / 2; const op = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.14, w * 0.3), darkMat); op.position.set(Math.sin(a) * (w / 2 + 0.02), shaftH * k, Math.cos(a) * (w / 2 + 0.02)); op.rotation.y = a; g.add(op); }
  // belfry: corner piers + central piers around a dark core (real openings)
  const bh = w * 0.95, by = shaftH + 0.2; const pier = w * 0.2;
  addMesh(g, new THREE.BoxGeometry(w * 0.72, bh, w * 0.72), darkMat, 0, by + bh / 2, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) addMesh(g, new THREE.BoxGeometry(pier, bh, pier), sm, sx * (w / 2 - pier / 2), by + bh / 2, sz * (w / 2 - pier / 2));
  for (let s = 0; s < 4; s++) { const a = s * Math.PI / 2; const m = addMesh(g, new THREE.BoxGeometry(pier * 0.6, bh, pier), sm, Math.sin(a) * (w / 2 - pier / 2), by + bh / 2, Math.cos(a) * (w / 2 - pier / 2)); m.rotation.y = a;
    // arch tops (semicircular lintels)
    const arch = new THREE.Mesh(new THREE.BoxGeometry(w, bh * 0.28, pier), sm); arch.position.set(Math.sin(a) * (w / 2 - pier / 2), by + bh * 0.86, Math.cos(a) * (w / 2 - pier / 2)); arch.rotation.y = a; g.add(arch);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(w * 0.07, w * 0.14, w * 0.2, 12), bellMat); bell.position.set(Math.sin(a) * (w * 0.26), by + bh * 0.55, Math.cos(a) * (w * 0.26)); g.add(bell); }
  const ty = by + bh;
  addMesh(g, new THREE.BoxGeometry(w + 0.5, 0.45, w + 0.5), greyStone, 0, ty + 0.22, 0);
  // balustrade with pinnacles at the corners
  for (let s = 0; s < 4; s++) { const a = s * Math.PI / 2; const rail = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.55, 0.14), greyStone); rail.position.set(Math.sin(a) * (w / 2 + 0.1), ty + 0.72, Math.cos(a) * (w / 2 + 0.1)); rail.rotation.y = a; g.add(rail); }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { addMesh(g, new THREE.ConeGeometry(0.22, 1.1, 6), greyStone, sx * (w / 2 + 0.1), ty + 1.2, sz * (w / 2 + 0.1)); addMesh(g, new THREE.SphereGeometry(0.16, 8, 6), greyStone, sx * (w / 2 + 0.1), ty + 1.8, sz * (w / 2 + 0.1)); }
  if (cap === 'cupola') {
    addMesh(g, new THREE.CylinderGeometry(w * 0.3, w * 0.33, w * 0.35, 8), sm, 0, ty + 0.45 + w * 0.17, 0);
    const d = addMesh(g, new THREE.SphereGeometry(w * 0.31, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), greyStone, 0, ty + 0.45 + w * 0.35, 0); d.scale.y = 1.25;
    addMesh(g, new THREE.CylinderGeometry(0.12, 0.2, 1, 6), greyStone, 0, ty + 0.9 + w * 0.72, 0);
    addMesh(g, new THREE.BoxGeometry(0.1, 1.2, 0.1), darkMat, 0, ty + 1.8 + w * 0.72, 0); addMesh(g, new THREE.BoxGeometry(0.6, 0.1, 0.1), darkMat, 0, ty + 1.95 + w * 0.72, 0);
  } else if (cap === 'pyramid') {
    const c = addMesh(g, new THREE.ConeGeometry(w * 0.72, w * 0.8, 4), MAT.roofTile, 0, ty + 0.45 + w * 0.4, 0); c.rotation.y = Math.PI / 4;
    addMesh(g, new THREE.BoxGeometry(0.1, 1.2, 0.1), darkMat, 0, ty + 1.3 + w * 0.8, 0);
  }
  g.position.set(x, y0, z); g.rotation.y = ang; scene.add(g); COL.addCirc(x, z, w * 0.62);
  return g;
}
function espadana(x, z, y, ang, w = 4.2) {
  const g = new THREE.Group();
  const shape = new THREE.Shape(); shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(w / 2, 3.6); shape.lineTo(w * 0.18, 4.6); shape.lineTo(0, 5.4); shape.lineTo(-w * 0.18, 4.6); shape.lineTo(-w / 2, 3.6); shape.closePath();
  for (const hx of [-w * 0.22, w * 0.22]) { const h = new THREE.Path(); h.moveTo(hx - 0.45, 1.1); h.lineTo(hx + 0.45, 1.1); h.lineTo(hx + 0.45, 2.3); h.absarc(hx, 2.3, 0.45, 0, Math.PI, false); h.lineTo(hx - 0.45, 1.1); shape.holes.push(h); }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.7, bevelEnabled: false }); geo.translate(0, 0, -0.35);
  addMesh(g, geo, plasterMat, 0, 0, 0);
  for (const hx of [-w * 0.22, w * 0.22]) addMesh(g, new THREE.CylinderGeometry(0.18, 0.34, 0.5, 12), bellMat, hx, 1.75, 0);
  addMesh(g, new THREE.BoxGeometry(0.08, 0.8, 0.08), darkMat, 0, 5.8, 0);
  g.position.set(x, y, z); g.rotation.y = ang; scene.add(g);
}
function buildChurches() {
  for (const ch of CHURCHES) {
    const F = axisFrame(ch.pts, ch.cx, ch.cz); const top = ch.top; const width = F.v1 - F.v0, len = F.u1 - F.u0;
    const nm = ch.name || '';
    // which end is the facade: nearest named square / plaza, else west
    let plaza = null;
    if (/Catedral/.test(nm)) plaza = centroidOfNamedWays('Plaza de los Remedios');
    else if (/Concepción/.test(nm)) plaza = centroidOfNamedWays('Plaza de la Concepción');
    else if (/Cristo/.test(nm)) plaza = centroidOfNamedWays('Plaza de San Francisco') || centroidOfNamedWays('Plaza del Cristo');
    let facadeEnd;
    if (plaza) { const e0 = F.W(F.u0, 0), e1 = F.W(F.u1, 0); facadeEnd = Math.hypot(e0[0] - plaza[0], e0[1] - plaza[1]) < Math.hypot(e1[0] - plaza[0], e1[1] - plaza[1]) ? 0 : 1; }
    else { const e0 = F.W(F.u0, 0), e1 = F.W(F.u1, 0); facadeEnd = e0[0] < e1[0] ? 0 : 1; }
    const fu = facadeEnd === 0 ? F.u0 : F.u1, back = facadeEnd === 0 ? 1 : -1; // back: direction into the church
    const rect = ch.area / (len * width);
    const tris = THREE.ShapeUtils.triangulateShape(ch.pts.map((p) => new THREE.Vector2(p[0], p[1])), []);
    const simple = rect > 0.8 && width < 24;
    const roof = (rise) => { if (simple) gableRoof(F, top, Math.min(rise, 6), F.u0, F.u1, F.v0, F.v1); else hipRoof(ch.pts, ch.cx, ch.cz, top, ch.area, tris, 4); };
    if (/Convento/.test(nm)) { roof(width * 0.3);
      if (/San Agustín/.test(nm)) { const t = F.W(fu + back * 3, F.v0 + 3); bellTower(t[0], t[1], F.ang, 4.6, Math.max(14, ch.H + 5), 'pyramid'); CHURCH_MARKS.push(['Instituto Cabrera Pinto', ch.cx, ch.cz]); }
      if (/Santo Domingo/.test(nm)) { const e = F.W(fu + back * 0.3, F.v1 - 2.5); espadana(e[0], e[1], top - 0.3, F.ang, 3.8); }
      continue; }
    if (/Catedral/.test(nm)) {
      hipRoof(ch.pts, ch.cx, ch.cz, top, ch.area, tris, 5);
      // neoclassical facade: stone block, portico with 4 columns, pediment and two towers
      const fx = F.W(fu + back * 2, 0); const fy = heightAt(fx[0], fx[1]) - 0.5; const g = new THREE.Group();
      const fw = Math.min(width, 24), fh = top - fy + 3;
      addMesh(g, new THREE.BoxGeometry(fw, fh, 4), stoneFor(fw, fh), 0, fh / 2, 0);
      for (const k of [-1.5, -0.5, 0.5, 1.5]) { addMesh(g, new THREE.CylinderGeometry(0.55, 0.62, fh * 0.62, 16), greyStone, k * fw * 0.14, fh * 0.31 + 0.6, -back * 2.9); addMesh(g, new THREE.BoxGeometry(1.4, 0.6, 1.4), greyStone, k * fw * 0.14, 0.3, -back * 2.9); }
      addMesh(g, new THREE.BoxGeometry(fw * 0.62, 1.2, 2.4), greyStone, 0, fh * 0.62 + 1.2, -back * 2.4);
      const tri = new THREE.Shape(); tri.moveTo(-fw * 0.33, 0); tri.lineTo(fw * 0.33, 0); tri.lineTo(0, fw * 0.14); tri.closePath();
      const pg = new THREE.ExtrudeGeometry(tri, { depth: 2.4, bevelEnabled: false }); pg.translate(0, 0, -1.2); addMesh(g, pg, greyStone, 0, fh * 0.62 + 1.8, -back * 2.4);
      const door = new THREE.Mesh(new THREE.PlaneGeometry(3, 5.5), new THREE.MeshStandardMaterial({ color: 0x3b2616, roughness: 0.7 })); door.position.set(0, 2.75, -back * 2.02); door.rotation.y = back > 0 ? Math.PI : 0; g.add(door);
      g.position.set(fx[0], fy, fx[1]); g.rotation.y = F.ang; scene.add(g);
      { const dp = F.W(fu - back * 1.2, 0); CAT_DOOR.x = dp[0]; CAT_DOOR.z = dp[1]; CAT_DOOR.nx = -back * F.ux; CAT_DOOR.nz = -back * F.uz; CAT_DOOR.ok = true; CAT_DOOR.ch = ch;
        const sides = [[F.v1 + 0.35, 1], [F.v0 - 0.35, -1]].map(([v, sg]) => { const p = F.W(fu + back * len * 0.5, v); const rd = ROADSEG.nearest(p[0] + F.vx * sg * 4, p[1] + F.vz * sg * 4); return { p, sg, d: rd ? rd.d : 99 }; }).sort((a, b) => a.d - b.d);
        const sd = sides[0]; CAT_DOOR.side = { x: sd.p[0], z: sd.p[1], nx: F.vx * sd.sg, nz: F.vz * sd.sg }; }
      for (const sv of [-1, 1]) { const t = F.W(fu + back * 3.2, sv * (fw / 2 - 3.2)); bellTower(t[0], t[1], F.ang, 6.2, fh + 4, 'cupola'); }
      // great dome over the crossing
      const d = F.W(fu + back * len * 0.62, 0); const dy = top + 2.5;
      const dg = new THREE.Group();
      addMesh(dg, new THREE.CylinderGeometry(7.2, 7.4, 6, 24), plasterMat, 0, 3, 0);
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const wdw = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.8), darkMat); wdw.position.set(Math.sin(a) * 7.42, 3, Math.cos(a) * 7.42); wdw.rotation.y = a; dg.add(wdw); const pil = new THREE.Mesh(new THREE.BoxGeometry(0.7, 6.2, 0.6), greyStone); pil.position.set(Math.sin(a + 0.39) * 7.4, 3.1, Math.cos(a + 0.39) * 7.4); pil.rotation.y = a + 0.39; dg.add(pil); }
      addMesh(dg, new THREE.CylinderGeometry(7.8, 7.8, 0.6, 24), greyStone, 0, 6.2, 0);
      const dome = addMesh(dg, new THREE.SphereGeometry(7.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), leadMat, 0, 6.4, 0); dome.scale.y = 1.3;
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const rib = new THREE.Mesh(new THREE.TorusGeometry(7.45, 0.12, 4, 24, Math.PI / 2), greyStone); rib.position.set(0, 6.4, 0); rib.rotation.set(0, a, Math.PI / 2); rib.scale.set(1.3, 1, 1); dg.add(rib); }
      addMesh(dg, new THREE.CylinderGeometry(1.5, 1.5, 3.2, 12), plasterMat, 0, 17.5, 0);
      const ld = addMesh(dg, new THREE.SphereGeometry(1.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), leadMat, 0, 19.1, 0); ld.scale.y = 1.3;
      addMesh(dg, new THREE.BoxGeometry(0.18, 2.4, 0.18), darkMat, 0, 21.9, 0); addMesh(dg, new THREE.BoxGeometry(1.1, 0.16, 0.16), darkMat, 0, 22.4, 0);
      dg.position.set(d[0], dy, d[1]); scene.add(dg);
      CHURCH_MARKS.push(['Catedral', ch.cx, ch.cz]);
    } else if (/Concepción/.test(nm)) {
      // three naves, central one higher (Mudéjar roofs)
      if (rect > 0.75) { const w3 = width / 3;
        gableRoof(F, top, w3 * 0.45, F.u0, F.u1, F.v0, F.v0 + w3);
        gableRoof(F, top + 1.2, w3 * 0.5, F.u0, F.u1, F.v0 + w3, F.v1 - w3);
        gableRoof(F, top, w3 * 0.45, F.u0, F.u1, F.v1 - w3, F.v1); } else hipRoof(ch.pts, ch.cx, ch.cz, top, ch.area, tris, 4);
      // the iconic stone tower at the foot of the church
      // the tower stands at the foot of the church on its north flank (Plaza de la Concepción), half engaged in the corner
      // the real tower is the square ~7 m block that juts out of the north flank (it shows in the OSM outline): put it right there
      let tw = null; { const P = ch.pts; let bd = 1e9; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length], c = P[(i + 2) % P.length];
          const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]); const dot = ((b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1])) / (l1 * l2 || 1);
          const d = Math.hypot(b[0] + 540.9, b[1] + 355.3); /* NW corner block at the foot of the church, where the real tower is */ if (l1 > 5.5 && l1 < 9.5 && l2 > 5.5 && l2 < 9.5 && Math.abs(dot) < 0.35 && d < 12 && d < bd) { bd = d;
            const mx = (a[0] + c[0]) / 2, mz = (a[1] + c[1]) / 2; tw = { x: mx, z: mz, ang: Math.atan2(b[0] - a[0], b[1] - a[1]), w: (l1 + l2) / 2 }; } } }
      if (!tw) { const zN0 = F.W(0, F.v0)[1], zN1 = F.W(0, F.v1)[1]; const vN = zN0 < zN1 ? F.v0 : F.v1; const t = F.W(fu + back * 3.2, vN); tw = { x: t[0], z: t[1], ang: F.ang, w: 7.4 }; }
      bellTower(tw.x, tw.z, tw.ang, Math.min(8, tw.w + 0.3), 22, 'cupola');
      { const o = 7.5, nx = tw.x - ch.cx, nz = tw.z - ch.cz, nl = Math.hypot(nx, nz) || 1; CONC_TOWER.x = tw.x + nx / nl * o; CONC_TOWER.z = tw.z + nz / nl * o; } CONC_TOWER.ok = true; CONC_TOWER.tw = tw; CONC_TOWER.pts = ch.pts;
      CHURCH_MARKS.push(['La Concepción', ch.cx, ch.cz]);
    } else {
      roof(width * 0.32);
      if (ch.area > 420 && ch.name) { const t = F.W(fu + back * 2.6, F.v1 - 2.6); bellTower(t[0], t[1], F.ang, 5, Math.max(12, ch.H + 4), 'pyramid'); }
      else { const e = F.W(fu + back * 0.3, (F.v0 + F.v1) / 2); espadana(e[0], e[1], top - 0.3, F.ang, Math.min(4.6, width * 0.6)); }
      // Ermita de San Miguel: a bell wall at each end of the roof
      if (/Ermita de San Miguel/.test(nm)) { const e = F.W(fu + back * (len - 0.3), (F.v0 + F.v1) / 2); espadana(e[0], e[1], top - 0.3, F.ang, Math.min(4.0, width * 0.55)); }
      // Santuario del Cristo: stone porch with three round arches facing the plaza + two-tier bell wall
      if (/Santuario del Cristo/.test(nm)) {
        const pw = Math.min(width, 12), pd = 4.2, ph = 5.2; const c0 = F.W(fu - back * pd / 2, (F.v0 + F.v1) / 2); const g = new THREE.Group(); const y0 = heightAt(c0[0], c0[1]) - 0.2;
        const sh = new THREE.Shape(); sh.moveTo(-pw / 2, 0); sh.lineTo(pw / 2, 0); sh.lineTo(pw / 2, ph); sh.lineTo(-pw / 2, ph); sh.closePath();
        for (let k = -1; k <= 1; k++) { const ax = k * pw / 3, aw = pw / 3 * 0.62; const hole = new THREE.Path(); hole.moveTo(ax - aw / 2, 0); hole.lineTo(ax + aw / 2, 0); hole.lineTo(ax + aw / 2, ph * 0.55); hole.absarc(ax, ph * 0.55, aw / 2, 0, Math.PI, false); hole.lineTo(ax - aw / 2, 0); sh.holes.push(hole); }
        const fg = new THREE.ExtrudeGeometry(sh, { depth: 0.6, bevelEnabled: false }); fg.translate(0, 0, pd / 2 - 0.6); addMesh(g, fg, greyStone, 0, 0, 0);
        for (const sx of [-1, 1]) addMesh(g, new THREE.BoxGeometry(0.6, ph, pd), plasterMat, sx * (pw / 2 - 0.3), ph / 2, 0);
        const rf = addMesh(g, new THREE.BoxGeometry(pw + 0.6, 0.35, pd + 0.4), MAT.roofTile, 0, ph + 0.2, 0); rf.rotation.x = -0.12 * back;
        g.position.set(c0[0], y0, c0[1]); g.rotation.y = F.ang + (back > 0 ? Math.PI : 0); scene.add(g);
        const e2 = F.W(fu + back * 0.5, F.v0 + 2.4); espadana(e2[0], e2[1], top + 0.6, F.ang, 4.6);
        for (const v of [F.v0 + 1, F.v1 - 1]) { const p = F.W(fu - back * pd, v); COL.addCirc(p[0], p[1], 0.4); }
      }
    }
  }
}
const CHURCH_MARKS = []; const CAT_DOOR = { ok: false }; const CONC_TOWER = { x: -540, z: -330, ok: false };
