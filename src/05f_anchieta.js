// ============ Pasarela de Padre Anchieta (Gran Anillo Peatonal) & Intercambiador ============
// Walkable elevated decks: ring + ramps/stairs. Player ground = max(terrain, deck) when standing on one.
const DECKS = [];
function deckAt(x, z, py, roadOnly = false, slack = 0) { // slack: extra step allowed per unit of the deck's own slope (cars reaching ahead on steep ramps)
  let best = -1e9;
  if (!DECKS.bridgesAdded) { DECKS.push(...BRIDGE_DECKS); DECKS.bridgesAdded = true; for (const d of DECKS) if (d.type === 'path') { let a = 1e9, b = -1e9, c2 = 1e9, e = -1e9; for (const p of d.pts) { a = Math.min(a, p[0]); b = Math.max(b, p[0]); c2 = Math.min(c2, p[1]); e = Math.max(e, p[1]); } d.bb = [a - d.w, b + d.w, c2 - d.w, e + d.w]; } }
  for (const d of DECKS) {
    if (roadOnly && !d.road) continue; if (d.bb && (x < d.bb[0] || x > d.bb[1] || z < d.bb[2] || z > d.bb[3])) continue;
    if (d.type === 'ring') { const r = Math.hypot(x - d.cx, z - d.cz); if (Math.abs(r - d.R) < d.w / 2 && py > d.y - 2.2) best = Math.max(best, d.y); }
    else if (d.type === 'path') {
      const p = d.pts; let nd = 1e9, ny = 0, nk = 0; for (let i = 0; i < p.length - 1; i++) { const a = p[i], b = p[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; let t = ((x - a[0]) * dx + (z - a[1]) * dz) / L2; if ((t < -0.02 && i === 0) || (t > 1.02 && i === p.length - 2)) continue; t = clamp(t, 0, 1);
        const px = a[0] + dx * t, pz = a[1] + dz * t; if (Math.hypot(x - px, z - pz) > d.w / 2) continue; const y = lerp(a[2], b[2], t);
        if (d.bridge) { const dd = Math.hypot(x - px, z - pz); if (dd < nd - 0.01) { nd = dd; ny = y; nk = Math.abs(b[2] - a[2]) / Math.sqrt(L2); } continue; } // road decks: height of the nearest segment (on tight curves of steep ramps the max over segments picked a point further up the ramp: car "flying")
        if (py > y - 1.6) best = Math.max(best, y); }
      if (nd < 1e9 && (py > ny - 1.6 - slack * nk || ny - heightAt(x, z) < 3.2)) best = Math.max(best, ny); // low decks/embankments are solid: nobody fits below them
    } else if (d.type === 'box') { if (Math.abs(x - d.x) < d.hw && Math.abs(z - d.z) < d.hd && py > d.y - 1.5) best = Math.max(best, d.y); }
  }
  return best;
}
// nearest road-deck centreline under (x,z) at about height py, for keeping vehicles from driving off the side of bridges
function deckSide(x, z, py) {
  let best = null;
  for (const d of DECKS) { if (!d.road || d.type !== 'path' || !d.bb) continue; if (x < d.bb[0] - 2 || x > d.bb[1] + 2 || z < d.bb[2] - 2 || z > d.bb[3] + 2) continue;
    const p = d.pts; for (let i = 0; i < p.length - 1; i++) { const a = p[i], b = p[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1; const tr = ((x - a[0]) * dx + (z - a[1]) * dz) / L2;
      if ((i === 0 && tr < 0) || (i === p.length - 2 && tr > 1)) continue; const t = clamp(tr, 0, 1); const px = a[0] + dx * t, pz = a[1] + dz * t, dd = Math.hypot(x - px, z - pz); if (dd > d.w / 2 + 2.5) continue;
      const y = lerp(a[2], b[2], t); if (py > y + 1.5 || py < y - 5) continue; if (!best || dd < best.d) best = { px, pz, d: dd, hw: d.w / 2 - 0.35, y }; } }
  return best;
}
const RING = { cx: -347.5, cz: 745.4, R: 49.9, w: 3.7, y: 0 };
function buildPasarela() {
  // deck level: 6 m over the highest ground below the ring
  let gmax = -1e9; for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2; gmax = Math.max(gmax, heightAt(RING.cx + Math.cos(a) * RING.R, RING.cz + Math.sin(a) * RING.R)); }
  RING.y = gmax + 6.2; DECKS.push({ type: 'ring', ...RING });
  const white = new THREE.MeshStandardMaterial({ color: 0xeef0f1, roughness: 0.45, metalness: 0.35, side: THREE.DoubleSide });
  const floorM = new THREE.MeshStandardMaterial({ color: 0x8f9296, roughness: 0.85 });
  const ledM = new THREE.MeshStandardMaterial({ color: 0xdfefff, emissive: 0xcfe6ff, emissiveIntensity: 0.2 }); PASARELA.led = ledM;
  const concrete = new THREE.MeshStandardMaterial({ color: 0xb8b4ac, roughness: 0.9 });
  const N = 120, R = RING.R, hw = RING.w / 2, y = RING.y;
  const pos = [], nor = [], fl = [], led = [];
  const P = (a, r, yy) => [RING.cx + Math.cos(a) * r, yy, RING.cz + Math.sin(a) * r];
  const quad = (arr, a, b, c, d) => { arr.push(...a, ...b, ...c, ...a, ...c, ...d); };
  // openings in the outer wall where the stairs and the helical ramp leave the ring
  const SE_STAIR = [-272, 709]; /* where the south-east stairs reach the ground (Jonay: they used to land on the road) */ const SE_ANG = Math.atan2(SE_STAIR[1] - RING.cz, SE_STAIR[0] - RING.cx);
  const GAPS = [[Math.PI * 0.98, 0.045], [SE_ANG, 0.045], [Math.atan2(792 - RING.cz, -326 - RING.cx), 0.05]];
  const inGap = (a) => GAPS.some(([g, hwA]) => Math.abs(angDiff(a, g)) < hwA);
  for (let i = 0; i < N; i++) {
    const a0 = i / N * Math.PI * 2, a1 = (i + 1) / N * Math.PI * 2; const fold = (i % 2 ? 0.28 : -0.05);
    const gap = inGap((a0 + a1) / 2) || inGap(a0 + 0.004) || inGap(a1 - 0.004);
    const ri = R - hw, ro = R + hw;
    // floor slab
    quad(fl, P(a0, ri, y), P(a1, ri, y), P(a1, ro, y), P(a0, ro, y));
    quad(pos, P(a0, ri - 0.15, y - 1.0), P(a1, ri - 0.15, y - 1.0), P(a1, ro + 0.3, y - 1.25), P(a0, ro + 0.3, y - 1.25)); // underside
    // outer wall: folded U-section, higher towards the TF-5 side (noise barrier)
    const oh = 2.2 + 0.3 * Math.sin(a0 * 2);
    if (gap) { quad(pos, P(a0, ro + 0.3, y - 1.25), P(a1, ro + 0.3, y - 1.25), P(a1, ro + 0.3, y), P(a0, ro + 0.3, y)); quad(fl, P(a0, ro - 0.1, y), P(a1, ro - 0.1, y), P(a1, ro + 0.3, y), P(a0, ro + 0.3, y)); }
    else {
    quad(pos, P(a0, ro + 0.3, y - 1.25), P(a1, ro + 0.3, y - 1.25), P(a1, ro + 0.3 + fold, y + oh * 0.45), P(a0, ro + 0.3 - fold, y + oh * 0.45));
    quad(pos, P(a0, ro + 0.3 - fold, y + oh * 0.45), P(a1, ro + 0.3 + fold, y + oh * 0.45), P(a1, ro + 0.05, y + oh), P(a0, ro + 0.05, y + oh));
    quad(pos, P(a0, ro + 0.05, y + oh), P(a1, ro + 0.05, y + oh), P(a1, ro - 0.1, y + oh), P(a0, ro - 0.1, y + oh));
    quad(pos, P(a0, ro - 0.1, y + oh), P(a1, ro - 0.1, y + oh), P(a1, ro - 0.1, y), P(a0, ro - 0.1, y));
    }
    // inner wall (lower, parapet)
    quad(pos, P(a0, ri - 0.15, y - 1.0), P(a1, ri - 0.15, y - 1.0), P(a1, ri - 0.15, y + 1.15), P(a0, ri - 0.15, y + 1.15));
    quad(pos, P(a0, ri - 0.15, y + 1.15), P(a1, ri - 0.15, y + 1.15), P(a1, ri + 0.05, y + 1.15), P(a0, ri + 0.05, y + 1.15));
    quad(pos, P(a0, ri + 0.05, y + 1.15), P(a1, ri + 0.05, y + 1.15), P(a1, ri + 0.05, y), P(a0, ri + 0.05, y));
    // LED strips
    if (!gap) quad(led, P(a0, ro - 0.12, y + 0.95), P(a1, ro - 0.12, y + 0.95), P(a1, ro - 0.12, y + 1.02), P(a0, ro - 0.12, y + 1.02));
    quad(led, P(a0, ri + 0.07, y + 0.95), P(a1, ri + 0.07, y + 0.95), P(a1, ri + 0.07, y + 1.02), P(a0, ri + 0.07, y + 1.02));
  }
  const mkMesh = (arr, mat, cast = true) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); g.computeVertexNormals(); const m = new THREE.Mesh(g, mat); m.castShadow = cast; m.receiveShadow = true; scene.add(m); return m; };
  mkMesh(pos, white); mkMesh(fl, floorM); mkMesh(led, ledM, false);
  // concrete point supports, kept off the carriageways and the tram
  const tramNear = (x, z) => { const T = DATA.T; for (let i = 0; i < T.length - 2; i += 2) { const dx = T[i + 2] - T[i], dz = T[i + 3] - T[i + 1], L2 = dx * dx + dz * dz || 1; let t = ((x - T[i]) * dx + (z - T[i + 1]) * dz) / L2; t = clamp(t, 0, 1); if (Math.hypot(x - T[i] - dx * t, z - T[i + 1] - dz * t) < 5) return true; } return false; };
  for (let k = 0; k < 16; k++) {
    for (const da of [0, 0.06, -0.06, 0.12, -0.12]) {
      const a = k / 16 * Math.PI * 2 + da; const x = RING.cx + Math.cos(a) * R, z = RING.cz + Math.sin(a) * R;
      if (onCarriageway(x, z, 0.8) || tramNear(x, z)) continue;
      const g = heightAt(x, z); const h = y - 1.2 - g; const c = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, h, 14), concrete); c.position.set(x, g + h / 2, z); c.castShadow = true; scene.add(c); COL.addCirc(x, z, 0.7); break;
    }
  }
  // helical ramp down towards the Intercambiador (follows the real path geometry)
  const rampPts = [[-327.0, 790.5], [-325.0, 793.5], [-319.0, 793.5], [-315.0, 796.5], [-311.5, 799.5], [-310.5, 803.0], [-310.5, 806.5], [-311.0, 810.5], [-312.0, 812.5], [-314.0, 815.5], [-318.0, 817.0], [-322.5, 818.0], [-326.5, 817.0], [-330.0, 814.5], [-332.5, 812.5], [-334.5, 809.5], [-335.0, 806.0], [-334.5, 802.5], [-334.0, 800.5], [-332.0, 797.0], [-328.0, 795.0], [-323.5, 793.5], [-319.0, 794.0], [-316.5, 795.0], [-313.5, 797.0], [-312.0, 800.0], [-310.0, 805.5], [-312.0, 817.0], [-316.0, 839.5]];
  // unwind: the loop section descends one level; lay out heights by cumulative length
  let L = 0; const cum = [0]; for (let i = 1; i < rampPts.length; i++) { L += Math.hypot(rampPts[i][0] - rampPts[i - 1][0], rampPts[i][1] - rampPts[i - 1][1]); cum.push(L); }
  const endG = heightAt(-316, 839.5) + 0.15;
  const ramp = rampPts.map((p, i) => { const t = cum[i] / L; return [p[0], p[1], lerp(y, endG, t)]; });
  // the ramp overlaps itself in plan (it is a helix): keep two separate decks for the two turns
  const half = 12;
  DECKS.push({ type: 'path', pts: ramp.slice(0, half + 1), w: 3.2 }); DECKS.push({ type: 'path', pts: ramp.slice(half), w: 3.2 });
  buildRampMesh(ramp, 3.2, white, floorM, concrete);
  // straight stairs on the west side (towards Avenida de La Trinidad) and south-east (towards the tram stop)
  { const ang = Math.PI * 0.98;
    const sx = RING.cx + Math.cos(ang) * (R + hw), sz = RING.cz + Math.sin(ang) * (R + hw); const dx = Math.cos(ang), dz = Math.sin(ang);
    const g = heightAt(sx + dx * 12, sz + dz * 12) + 0.15; const len = (y - g) * 1.7;
    const st = [[sx - dx * 0.5, sz - dz * 0.5, y], [sx + dx * len, sz + dz * len, g]]; DECKS.push({ type: 'path', pts: st, w: 2.8 });
    buildStairs(st, 2.8, white, floorM);
  }
  // south-east: a level walkway leaves the ring towards the campus pavement and the stairs come down onto it
  { const ang = SE_ANG; const dx = Math.cos(ang), dz = Math.sin(ang);
    const sx = RING.cx + dx * (R + hw), sz = RING.cz + dz * (R + hw); const [ex, ez] = SE_STAIR; const g = heightAt(ex, ez) + 0.15;
    const len = (y - g) * 1.7, D = Math.hypot(ex - sx, ez - sz); const ux = (ex - sx) / D, uz = (ez - sz) / D;
    const tx = ex - ux * len, tz = ez - uz * len; // top of the stairs
    if (D - len > 1) { const walk = [[sx - ux * 0.5, sz - uz * 0.5, y], [tx, tz, y]]; DECKS.push({ type: 'path', pts: walk, w: 2.8 }); buildRampMesh(walk, 2.8, white, floorM, concrete); }
    const st = [[tx, tz, y], [ex, ez, g]]; DECKS.push({ type: 'path', pts: st, w: 2.8 }); buildStairs(st, 2.8, white, floorM);
  }
  // glass lift tower on the north side, next to the ring
  { const ang = Math.PI * 0.42; const x = RING.cx + Math.cos(ang) * (R + hw + 2.2), z = RING.cz + Math.sin(ang) * (R + hw + 2.2); const g = heightAt(x, z);
    const tower = new THREE.Mesh(new THREE.BoxGeometry(3, y - g + 3.2, 3), new THREE.MeshStandardMaterial({ color: 0x9fc3d6, roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.55 }));
    tower.position.set(x, g + (y - g + 3.2) / 2, z); tower.rotation.y = -ang; scene.add(tower);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.15, 0.3, 3.15), white); frame.position.set(x, y + 3.2, z); frame.rotation.y = -ang; scene.add(frame);
    COL.addCirc(x, z, 1.9); PASARELA.lift = { x, z, g, y }; }
  PASARELA.ok = true;
}
const PASARELA = { ok: false };
function buildRampMesh(pts, w, wallMat, floorMat, colMat) {
  const pos = [], fl = []; const hw = w / 2;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1]; const dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz) || 1; const nx = -dz / L * hw, nz = dx / L * hw;
    const q = (arr, p1, p2, p3, p4) => arr.push(...p1, ...p2, ...p3, ...p1, ...p3, ...p4);
    q(fl, [a[0] + nx, a[2], a[1] + nz], [b[0] + nx, b[2], b[1] + nz], [b[0] - nx, b[2], b[1] - nz], [a[0] - nx, a[2], a[1] - nz]);
    q(pos, [a[0] + nx, a[2] - 0.7, a[1] + nz], [b[0] + nx, b[2] - 0.7, b[1] + nz], [b[0] - nx, b[2] - 0.7, b[1] - nz], [a[0] - nx, a[2] - 0.7, a[1] - nz]);
    for (const s of [1, -1]) q(pos, [a[0] + nx * s, a[2] - 0.7, a[1] + nz * s], [b[0] + nx * s, b[2] - 0.7, b[1] + nz * s], [b[0] + nx * s, b[2] + 1.15, b[1] + nz * s], [a[0] + nx * s, a[2] + 1.15, a[1] + nz * s]);
    if (i % 3 === 0 && a[2] - heightAt(a[0], a[1]) > 2) { const g = heightAt(a[0], a[1]); const h = a[2] - 0.7 - g; const c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, h, 10), colMat); c.position.set(a[0], g + h / 2, a[1]); scene.add(c); COL.addCirc(a[0], a[1], 0.4); }
  }
  for (const [arr, m] of [[pos, wallMat], [fl, floorMat]]) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); g.computeVertexNormals(); const me = new THREE.Mesh(g, m); me.castShadow = true; me.receiveShadow = true; scene.add(me); }
}
function buildStairs(st, w, wallMat, stepMat) {
  const [a, b] = st; const dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz); const n = Math.ceil((a[2] - b[2]) / 0.18); const g = new THREE.Group();
  for (let i = 0; i < n; i++) { const t = (i + 0.5) / n; const s = new THREE.Mesh(new THREE.BoxGeometry(w, 0.18, L / n + 0.02), stepMat); s.position.set(0, lerp(a[2], b[2], t) - 0.09, 0); s.position.x = 0; s.userData.t = t; s.position.z = t * L; g.add(s); }
  for (const sx of [-1, 1]) { const side = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.1, L), wallMat); side.position.set(sx * w / 2, (a[2] + b[2]) / 2 + 0.4, L / 2); side.rotation.x = Math.atan2(a[2] - b[2], L); g.add(side); }
  g.position.set(a[0], 0, a[1]); g.rotation.y = Math.atan2(dx, dz); g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); scene.add(g);
}

// ---------- Intercambiador de La Laguna: open canopy over the bus platforms with green guaguas
const INTER = { buses: [] };
function buildIntercambiador(b) {
  // b: building record (pts, top, bmin...) of the big station roof
  const pts = b.pts; const y = b.bmax + 7.5; const n = pts.length;
  const tris = THREE.ShapeUtils.triangulateShape(pts.map((p) => new THREE.Vector2(p[0], p[1])), []);
  const roof = [], under = [];
  for (const t of tris) { const [p, q, r] = t.map((i) => pts[i]); roof.push(p[0], y + 0.6, p[1], r[0], y + 0.6, r[1], q[0], y + 0.6, q[1]); under.push(p[0], y, p[1], q[0], y, q[1], r[0], y, r[1]); }
  const fascia = []; for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; fascia.push(p[0], y - 0.4, p[1], q[0], y - 0.4, q[1], q[0], y + 0.8, q[1], p[0], y - 0.4, p[1], q[0], y + 0.8, q[1], p[0], y + 0.8, p[1]); }
  const mk = (arr, mat) => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3)); g.computeVertexNormals(); const m = new THREE.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true; scene.add(m); };
  mk(roof, new THREE.MeshStandardMaterial({ color: 0xa9afb3, roughness: 0.55, metalness: 0.4, side: THREE.DoubleSide }));
  { const F2 = axisFrame(pts, b.cx, b.cz); const ribM = new THREE.MeshStandardMaterial({ color: 0xe8ecee, roughness: 0.3, metalness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.05 });
    for (let u = F2.u0 + 4; u < F2.u1 - 2; u += 8) { const [x, z] = F2.W(u, (F2.v0 + F2.v1) / 2); const rib = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, F2.v1 - F2.v0 - 4), ribM); rib.position.set(x, y + 0.75, z); rib.rotation.y = F2.ang + Math.PI / 2; scene.add(rib); } }
  mk(under, new THREE.MeshStandardMaterial({ color: 0xf2f2ef, roughness: 0.8, emissive: 0xffffff, emissiveIntensity: 0.05, side: THREE.DoubleSide }));
  mk(fascia, new THREE.MeshStandardMaterial({ color: 0x1f8a4c, roughness: 0.5, side: THREE.DoubleSide }));
  // columns on a grid inside the footprint
  const F = axisFrame(pts, b.cx, b.cz); const colM = new THREE.MeshStandardMaterial({ color: 0x9aa0a4, roughness: 0.5, metalness: 0.5 });
  for (let u = F.u0 + 6; u < F.u1 - 3; u += 14) for (let v = F.v0 + 6; v < F.v1 - 3; v += 16) { const [x, z] = F.W(u, v); if (!pip(x, z, pts.flat())) continue; const g = heightAt(x, z); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, y - g, 10), colM); c.position.set(x, g + (y - g) / 2, z); c.castShadow = true; scene.add(c); COL.addCirc(x, z, 0.4); }
  // platforms (raised island kerbs) and green guaguas parked in the bays
  const platM = new THREE.MeshStandardMaterial({ color: 0xbdb8ae, roughness: 0.9 });
  const len = F.u1 - F.u0, wid = F.v1 - F.v0;
  for (let k = 0; k < 3; k++) {
    const v = F.v0 + wid * (0.22 + k * 0.28); const [cx, cz] = F.W((F.u0 + F.u1) / 2, v);
    // the platform is laid in 2 m pieces and skips any carriageway / sunken road it would cross (it used to float over the motorway)
    { const Lp = len * 0.7, n = Math.ceil(Lp / 2); for (let i = 0; i < n; i++) { const u = (F.u0 + F.u1) / 2 - Lp / 2 + (i + 0.5) * Lp / n; const [px, pz] = F.W(u, v); const g = heightAt(px, pz);
      if (onCarriageway(px, pz, 2.2) || lowAt(px, pz, g) || !pip(px, pz, pts.flat())) continue; const pl = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.25, Lp / n + 0.02), platM); pl.position.set(px, g + 0.22, pz); pl.rotation.y = F.ang; pl.receiveShadow = true; scene.add(pl); } }
    // benches + shelter signs on the platform
    for (let s = -2; s <= 2; s++) { const [bx, bz] = F.W((F.u0 + F.u1) / 2 + s * len * 0.13, v); if (onCarriageway(bx, bz, 2) || lowAt(bx, bz, heightAt(bx, bz))) continue; const sign = textPlane('Dársena ' + (k * 5 + s + 3), 1.4, 0.35, '#1f8a4c', '#ffffff', 'bold 40px Arial'); sign.position.set(bx, heightAt(bx, bz) + 2.6, bz); sign.rotation.y = F.ang + Math.PI / 2; scene.add(sign); }
    for (const side of [-1, 1]) for (let s = -1; s <= 1; s += 1) {
      if (Math.random() < 0.25) continue;
      const [bx, bz] = F.W((F.u0 + F.u1) / 2 + s * len * 0.22, v + side * 3.6);
      { const fx = Math.cos(F.ang) * 0, ok = [-6, 0, 6].every((k) => { const q = F.W((F.u0 + F.u1) / 2 + s * len * 0.22 + k, v + side * 3.6); return !onCarriageway(q[0], q[1], 1.5) && !lowAt(q[0], q[1], heightAt(q[0], q[1])); }); if (!ok) continue; }
      const bus = new Car('bus', 0x1f8a4c, bx, bz, F.ang + (side > 0 ? 0 : Math.PI)); bus.persist = true; bus.driver = null; bus.ctl.brk = 1; bus.mode = 'physics'; INTER.buses.push(bus);
    }
  }
  INTER.ok = true; INTER.center = [b.cx, b.cz];
}
