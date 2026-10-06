// ============ Aeropuerto de Tenerife Norte (Los Rodeos) ============
// Geometry from OpenStreetMap aeroway data (DATA.AW: runway, taxiways, aprons, terminal, tower, hangars, parking
// positions). Runway 12/30 (≈3.2 km × 45 m) with markings, yellow taxiway centre lines, concrete aprons, the terminal
// (light stone, long glazed front, cantilevered roof, green airline band), control tower and parked turboprops of the
// parody island airline. Reference photos: docs/referencias/aeropuerto/
const AIRPORT = { ok: false, planes: [] };
function buildAirport() {
  const AW = DATA.AW || []; if (!AW.length) return;
  const M = concMaterials(); const B = concBuckets(); const root = new THREE.Group(); root.name = 'aeropuerto';
  const mat = (c, r = 0.85, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, side: THREE.DoubleSide });
  const concrete = mat(0xb9b6ae, 0.95), runwayM = mat(0x3d3f42, 0.95), paint = mat(0xf4f4f0, 0.7), yellow = mat(0xf2c21b, 0.7), stoneL = mat(0xd9d2c3, 0.9);
  const glass = new THREE.MeshStandardMaterial({ color: 0x2c3e4c, roughness: 0.1, metalness: 0.6, side: THREE.DoubleSide }), green = mat(0x1f8a4c, 0.5), white = mat(0xf2f2ef, 0.6), steel = mat(0x9aa0a4, 0.5, 0.5), dark = mat(0x1b1b1b, 0.8);
  const pipP = (P, x, z) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const toPts = (c) => { const P = []; for (let i = 0; i < c.length; i += 2) P.push([c[i], c[i + 1]]); return P; };
  // ---- flat paved polygons (aprons) laid on the terrain in 8 m cells
  const pave = (P, matl, yo) => { let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (const p of P) { a = Math.min(a, p[0]); b = Math.max(b, p[0]); c = Math.min(c, p[1]); d = Math.max(d, p[1]); }
    const S = 8; for (let x = a; x < b; x += S) for (let z = c; z < d; z += S) { if (!pipP(P, x + S / 2, z + S / 2)) continue; const y = (px, pz) => heightAt(px, pz) + yo;
      B.quad(matl, [x, y(x, z + S), z + S], [x + S, y(x + S, z + S), z + S], [x + S, y(x + S, z), z], [x, y(x, z), z], 8); } };
  for (const a of AW) if (a[0] === 'apron') pave(toPts(a[3]), concrete, 0.1);
  // ---- strips along a centre line (runway, taxiways): quads every ≤ 10 m following the terrain
  const strip = (c, w, matl, yo, every = 10) => { for (let i = 0; i + 3 < c.length; i += 2) { const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3]; const L = Math.hypot(x2 - x1, z2 - z1); if (L < 0.5) continue; const n = Math.max(1, Math.ceil(L / every)); const nx = -(z2 - z1) / L * w / 2, nz = (x2 - x1) / L * w / 2;
      for (let k = 0; k < n; k++) { const t0 = k / n, t1 = (k + 1) / n; const ax = x1 + (x2 - x1) * t0, az = z1 + (z2 - z1) * t0, bx = x1 + (x2 - x1) * t1, bz = z1 + (z2 - z1) * t1; const y = (px, pz) => heightAt(px, pz) + yo;
        B.quad(matl, [ax + nx, y(ax + nx, az + nz), az + nz], [bx + nx, y(bx + nx, bz + nz), bz + nz], [bx - nx, y(bx - nx, bz - nz), bz - nz], [ax - nx, y(ax - nx, az - nz), az - nz], 6); } } };
  for (const a of AW) if (a[0] === 'taxiway') { strip(a[3], a[2] || 23, runwayM, 0.12); strip(a[3], 0.35, yellow, 0.135, 6); }
  const rw = AW.find((a) => a[0] === 'runway');
  if (rw) { const c = rw[3], w = rw[2] || 45; strip(c, w, runwayM, 0.14); strip(c, w + 3, concrete, 0.11);
    // centre line dashes (30 m every 50 m), side stripes, threshold piano keys and runway numbers
    let acc = 0; const L = []; for (let i = 0; i + 3 < c.length; i += 2) L.push(Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1])); const tot = L.reduce((s, v) => s + v, 0);
    const at = (s) => { let i = 0; while (i < L.length - 1 && s > L[i]) { s -= L[i]; i++; } const t = Math.min(1, s / (L[i] || 1)); const x1 = c[i * 2], z1 = c[i * 2 + 1], x2 = c[i * 2 + 2], z2 = c[i * 2 + 3]; const l = L[i] || 1; return [x1 + (x2 - x1) * t, z1 + (z2 - z1) * t, (x2 - x1) / l, (z2 - z1) / l]; };
    const mark = (s, len, off, wd, matl = paint) => { const a = at(s), b = at(Math.min(tot, s + len)); const nx = -a[3], nz = a[2]; const y = (px, pz) => heightAt(px, pz) + 0.16;
      const A1 = [a[0] + nx * (off - wd / 2), a[1] + nz * (off - wd / 2)], A2 = [a[0] + nx * (off + wd / 2), a[1] + nz * (off + wd / 2)], B1 = [b[0] + nx * (off - wd / 2), b[1] + nz * (off - wd / 2)], B2 = [b[0] + nx * (off + wd / 2), b[1] + nz * (off + wd / 2)];
      B.quad(matl, [A2[0], y(...A2), A2[1]], [B2[0], y(...B2), B2[1]], [B1[0], y(...B1), B1[1]], [A1[0], y(...A1), A1[1]], 4); };
    for (let s = 120; s < tot - 120; s += 50) mark(s, 30, 0, 0.9);
    for (const sd of [-1, 1]) for (let s = 0; s < tot; s += 40) mark(s, Math.min(40, tot - s), sd * (w / 2 - 1.5), 0.9);
    for (const end of [0, 1]) { const s0 = end ? tot - 36 : 6; for (let k = -7; k <= 7; k++) if (k) mark(s0, 30, k * 2.6 + Math.sign(k) * 1, 1.8);
      // touchdown zone bars
      for (let r = 0; r < 3; r++) for (const sd of [-1, 1]) mark(end ? tot - 300 - r * 150 : 300 + r * 150, 22, sd * 6, 2.2);
      // numbers
      const num = end ? '30' : '12'; const cv = mkCanvas(256, 256), x = cv.getContext('2d'); x.fillStyle = '#f4f4f0'; x.font = 'bold 200px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(num, 128, 140);
      const tx = new THREE.CanvasTexture(cv); const pm = new THREE.Mesh(new THREE.PlaneGeometry(16, 20), new THREE.MeshStandardMaterial({ map: tx, transparent: true, roughness: 0.7, depthWrite: false })); const p = at(end ? tot - 62 : 62);
      pm.rotation.x = -Math.PI / 2; pm.rotation.z = Math.atan2(p[2], p[3]) + (end ? 0 : Math.PI); pm.position.set(p[0], heightAt(p[0], p[1]) + 0.17, p[1]); root.add(pm); }
    AIRPORT.runway = { c, tot, at }; }
  // ---- terminal: footprint from OSM, light stone with glazed front, cantilevered roof with green band
  const term = AW.find((a) => a[0] === 'terminal');
  if (term) { let P = toPts(term[3]); if (polyArea(P) < 0) P = P.reverse(); let cx = 0, cz = 0; for (const p of P) { cx += p[0]; cz += p[1]; } cx /= P.length; cz /= P.length; let g0 = 1e9; for (const p of P) g0 = Math.min(g0, heightAt(p[0], p[1])); const Hh = 13;
    // landside = side facing away from the runway
    let rp = [cx, cz + 100]; if (AIRPORT.runway) { let bd2 = 1e9; for (let s2 = 0; s2 < AIRPORT.runway.tot; s2 += 20) { const q2 = AIRPORT.runway.at(s2); const dd = Math.hypot(q2[0] - cx, q2[1] - cz); if (dd < bd2) { bd2 = dd; rp = [q2[0], q2[1]]; } } } let best = null, bd = -1e9; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 20) continue; const ox = (q[1] - p[1]) / L, oz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; const dr = Math.hypot(mx + ox * 30 - rp[0], mz + oz * 30 - rp[1]) - Math.hypot(mx - rp[0], mz - rp[1]); const sc = dr * 2 + L * 0.2; if (sc > bd) { bd = sc; best = { p, q, L, ox, oz, mx, mz }; } }
    for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 0.3) continue; const ox = (q[1] - p[1]) / L, oz = -(q[0] - p[0]) / L;
      B.quad(stoneL, [p[0], g0 - 1, p[1]], [q[0], g0 - 1, q[1]], [q[0], g0 + Hh, q[1]], [p[0], g0 + Hh, p[1]], 3);
      // glazing bands
      B.quad(glass, [p[0] + ox * 0.05, g0 + 0.6, p[1] + oz * 0.05], [q[0] + ox * 0.05, g0 + 0.6, q[1] + oz * 0.05], [q[0] + ox * 0.05, g0 + 4.2, q[1] + oz * 0.05], [p[0] + ox * 0.05, g0 + 4.2, p[1] + oz * 0.05]);
      B.quad(glass, [p[0] + ox * 0.05, g0 + 6.0, p[1] + oz * 0.05], [q[0] + ox * 0.05, g0 + 6.0, q[1] + oz * 0.05], [q[0] + ox * 0.05, g0 + 10.6, q[1] + oz * 0.05], [p[0] + ox * 0.05, g0 + 10.6, p[1] + oz * 0.05]);
      COL.addSeg(p[0], p[1], q[0], q[1]); }
    { const tris = THREE.ShapeUtils.triangulateShape(P.map((p) => new THREE.Vector2(p[0], p[1])), []); const R0 = B; for (const t of tris) { const a = P[t[0]], b2 = P[t[1]], c2 = P[t[2]]; R0.quad(white, [a[0], g0 + Hh, a[1]], [c2[0], g0 + Hh, c2[1]], [b2[0], g0 + Hh, b2[1]], [b2[0], g0 + Hh, b2[1]]); } }
    if (best) { const { p, q, L, ox, oz } = best; const D = 9, y1 = g0 + 11.2; const fr = cFrame(best.mx, 0, best.mz, Math.atan2(ox, oz));
      B.geo(cBox(L + 6, 0.6, D), white, fr(0, y1, D / 2)); B.geo(cBox(L + 6.2, 1.1, 0.3), green, fr(0, y1 + 0.1, D + 0.1));
      for (let x = -L / 2 + 4; x <= L / 2 - 4; x += 12) { B.geo(new THREE.CylinderGeometry(0.35, 0.35, y1 - g0, 10), steel, fr(x, g0 + (y1 - g0) / 2, D - 1)); COL.addCirc(best.mx + ox * (D - 1) + oz * x, best.mz + oz * (D - 1) - ox * x, 0.4); }
      const sg = bigSign('TENERIFE NORTE · CIUDAD DE LA LAGUNA', Math.min(L * 0.7, 60), 2.6, '#1f8a4c', '#ffffff'); sg.position.set(best.mx + ox * (D + 0.3), y1 + 2.2, best.mz + oz * (D + 0.3)); sg.rotation.y = Math.atan2(ox, oz); root.add(sg);
      AIRPORT.door = { x: best.mx + ox * 2, z: best.mz + oz * 2 }; }
    LABELS.push(['Aeropuerto Tenerife Norte', cx, cz, 1]); AIRPORT.terminal = { cx, cz, g0 }; }
  // ---- control tower (on the OSM 'tower' spot)
  const tw = AW.find((a) => a[0] === 'tower' || a[0] === 'control_tower');
  if (tw) { const P = toPts(tw[3]); let cx = 0, cz = 0; for (const p of P) { cx += p[0]; cz += p[1]; } cx /= P.length; cz /= P.length; const g = heightAt(cx, cz) - 0.5; const fr = cFrame(cx, g, cz, 0);
    B.geo(new THREE.CylinderGeometry(3.2, 3.8, 30, 16), stoneL, fr(0, 15, 0)); B.geo(new THREE.CylinderGeometry(5.8, 4.2, 2.2, 12), white, fr(0, 31, 0)); B.geo(new THREE.CylinderGeometry(6.0, 5.8, 3.6, 12, 1, true), glass, fr(0, 33.9, 0));
    B.geo(new THREE.CylinderGeometry(6.4, 6.2, 0.8, 12), white, fr(0, 36.1, 0)); B.geo(new THREE.CylinderGeometry(0.15, 0.15, 6, 6), steel, fr(0, 39.5, 0)); COL.addCirc(cx, cz, 4); }
  // ---- hangars without an OSM building
  for (const a of AW) if (a[0] === 'hangar') { const P = toPts(a[3]); let cx = 0, cz = 0; for (const p of P) { cx += p[0]; cz += p[1]; } cx /= P.length; cz /= P.length; if (BUILD.some((b) => Math.hypot(b.cx - cx, b.cz - cz) < 12)) continue;
    let g0 = 1e9; for (const p of P) g0 = Math.min(g0, heightAt(p[0], p[1])); for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; B.quad(steel, [p[0], g0 - 0.5, p[1]], [q[0], g0 - 0.5, q[1]], [q[0], g0 + 11, q[1]], [p[0], g0 + 11, p[1]], 4); COL.addSeg(p[0], p[1], q[0], q[1]); }
    const tris = THREE.ShapeUtils.triangulateShape(P.map((p) => new THREE.Vector2(p[0], p[1])), []); for (const t of tris) { const x = P[t[0]], y = P[t[1]], z = P[t[2]]; B.quad(steel, [x[0], g0 + 11, x[1]], [z[0], g0 + 11, z[1]], [y[0], g0 + 11, y[1]], [y[0], g0 + 11, y[1]]); } }
  B.finish(root); scene.add(root);
  // ---- parked turboprops of the parody airline (high wing, two propellers, T-tail), nose to the terminal
  const tc = AIRPORT.terminal; for (const a of AW) if (a[0] === 'parking_position') { const x = a[3][0], z = a[3][1]; const h = tc ? Math.atan2(tc.cx - x, tc.cz - z) : 0; const pl = makePlane(); pl.position.set(x, heightAt(x, z), z); pl.rotation.y = h; scene.add(pl); AIRPORT.planes.push(pl); for (const k of [-8, 0, 8]) COL.addCirc(x + Math.sin(h) * k, z + Math.cos(h) * k, 1.6); }
  AIRPORT.ok = true;
}
let PLANE_GEO = null;
function makePlane() {
  if (!PLANE_GEO) { const B = concBuckets(); const g = new THREE.Group(); const fr = cFrame(0, 0, 0, 0); const white = new THREE.MeshStandardMaterial({ color: 0xf5f5f2, roughness: 0.45 }), green = new THREE.MeshStandardMaterial({ color: 0x1f8a4c, roughness: 0.5 }), dark = new THREE.MeshStandardMaterial({ color: 0x1d2328, roughness: 0.3, metalness: 0.4 }), grey = new THREE.MeshStandardMaterial({ color: 0x8c9196, roughness: 0.6, metalness: 0.4 });
    B.geo(new THREE.CylinderGeometry(1.35, 1.35, 20, 16), white, fr(0, 2.3, 0, 0, Math.PI / 2)); // fuselage along z
    B.geo(new THREE.SphereGeometry(1.35, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), white, fr(0, 2.3, 10, 0, Math.PI / 2, 0, [1, 1.8, 1])); // nose
    B.geo(new THREE.ConeGeometry(1.35, 5, 16), white, fr(0, 2.7, -12.4, 0, -Math.PI / 2)); // tail cone
    B.geo(cBox(2.6, 0.5, 1.2), dark, fr(0, 3.1, 11.0)); // cockpit windows
    for (let k = -7; k <= 7; k++) for (const sd of [-1, 1]) B.geo(cBox(0.05, 0.35, 0.3), dark, fr(sd * 1.33, 2.65, k * 1.1));
    B.geo(cBox(2.74, 0.5, 20), green, fr(0, 1.6, 0)); // airline band
    B.geo(cBox(27, 0.35, 2.4), white, fr(0, 3.75, 1.5)); // high wing
    for (const sd of [-1, 1]) { B.geo(new THREE.CylinderGeometry(0.65, 0.7, 4.2, 12), white, fr(sd * 4.1, 3.2, 2.8, 0, Math.PI / 2)); B.geo(cBox(0.12, 3.6, 0.12), grey, fr(sd * 4.1, 3.2, 5.0)); B.geo(cBox(3.6, 0.12, 0.12), grey, fr(sd * 4.1, 3.2, 5.0)); B.geo(cBox(0.5, 1.6, 0.4), grey, fr(sd * 1.5, 0.8, 0)); }
    B.geo(cBox(0.3, 5.0, 3.2), green, fr(0, 5.2, -12.0, 0, 0, 0)); B.geo(cBox(8, 0.25, 2.0), white, fr(0, 7.6, -12.6)); // T-tail
    B.geo(cBox(0.3, 1.4, 0.3), grey, fr(0, 0.7, 8.5)); // nose gear
    B.finish(g); PLANE_GEO = g; }
  const p = PLANE_GEO.clone(); const lg = textPlane('Guanchavía', 4.2, 1.0, '#ffffff', '#1f8a4c', 'bold 44px Arial'); for (const sd of [-1, 1]) { const l = lg.clone(); l.position.set(sd * 1.37, 2.9, 3); l.rotation.y = sd * Math.PI / 2; p.add(l); }
  return p;
}
