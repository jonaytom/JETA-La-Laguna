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
    if (best) { const { p, q, L, ox, oz } = best; const D = 16, y1 = g0 + 11.2; /* v0.78: the big canopy reaches over the drop-off lane (photos) */ const fr = cFrame(best.mx, 0, best.mz, Math.atan2(ox, oz));
      B.geo(cBox(L + 6, 0.6, D), white, fr(0, y1, D / 2)); B.geo(cBox(L + 6.2, 1.1, 0.3), green, fr(0, y1 + 0.1, D + 0.1));
      for (let x = -L / 2 + 4; x <= L / 2 - 4; x += 12) { B.geo(new THREE.CylinderGeometry(0.35, 0.35, y1 - g0, 10), steel, fr(x, g0 + (y1 - g0) / 2, 7.5)); COL.addCirc(best.mx + ox * 7.5 + oz * x, best.mz + oz * 7.5 - ox * x, 0.4); }
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
  const tc = AIRPORT.terminal; for (const a of AW) if (a[0] === 'parking_position') { let x = a[3][0], z = a[3][1]; const h = tc ? Math.atan2(tc.cx - x, tc.cz - z) : 0;
    // v0.70 (auditor): OSM draws the apron's service lanes through the stands; move the plane to the nearest spot (rings
    // every 2 m up to 40 m) where none of its three collision circles is on a lane
    const free = (x0, z0) => [-8, 0, 8].every((k) => { const px = x0 + Math.sin(h) * k, pz = z0 + Math.cos(h) * k, rd = ROADSEG.nearest(px, pz, (r) => r[0] <= 12 && !(r[3] & 2)); return !rd || rd.d >= DATA.R[rd.ri][2] / 2 + 1.9; });
    if (!free(x, z)) { let found = null; for (let r = 2; r <= 40 && !found; r += 2) for (let k = 0, n = Math.ceil(r * 1.6); k < n; k++) { const a = k / n * Math.PI * 2, x1 = x + Math.sin(a) * r, z1 = z + Math.cos(a) * r; if (free(x1, z1)) { found = [x1, z1]; break; } } if (found) [x, z] = found; }
    const pl = makePlane(); pl.position.set(x, heightAt(x, z), z); pl.rotation.y = h; scene.add(pl); AIRPORT.planes.push(pl); for (const k of [-8, 0, 8]) COL.addCirc(x + Math.sin(h) * k, z + Math.cos(h) * k, 1.6); }
  try { airportExtras(); } catch (e) { console.error('aeropuerto extras', e); }
  AIRPORT.ok = true;
}
// ---- v0.72 (Jonay, docs/referencias/aeropuerto/): the round domed hall of the terminal, fuel tanks by the Rotonda
// Sempiterno, the sheds along Cam. San Lázaro (parody SEUR, ITV and the island airline's hangar), «P» parking signs
// and the perimeter fence of the airfield (visual: no collision, so the night mission can still get onto the apron)
function airportExtras() {
  const AW = DATA.AW || [], B = concBuckets(), root = new THREE.Group(); root.name = 'aeropuerto2';
  const mat = (c, r = 0.85, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const white = mat(0xf2f2ef, 0.6), steel = mat(0x9aa0a4, 0.5, 0.5), stoneL = mat(0xd9d2c3, 0.9), glass = mat(0x2c3e4c, 0.15, 0.6), blue = mat(0x1d4f9c, 0.6), tankW = mat(0xf4f4f2, 0.4, 0.3);
  const freeAt = (x, z, r) => { if (inAnyBuilding(x, z)) return false; const rd = ROADSEG.nearest(x, z); if (rd && rd.d < DATA.R[rd.ri][2] / 2 + r) return false; for (const a of AW) if ((a[0] === 'apron' || a[0] === 'terminal') && pip(x, z, a[3])) return false; return true; };
  // the domed rotunda on the airside middle of the terminal
  const T = AIRPORT.terminal; if (T && AIRPORT.runway) { let rp = null, bd = 1e9; for (let s = 0; s < AIRPORT.runway.tot; s += 20) { const q = AIRPORT.runway.at(s); const d = Math.hypot(q[0] - T.cx, q[1] - T.cz); if (d < bd) { bd = d; rp = q; } }
    const ux = (rp[0] - T.cx) / bd, uz = (rp[1] - T.cz) / bd, g0 = T.g0;
    // v0.74 (agente revisor: it stood on the airside service lanes): the first spot, from the terminal's middle outwards,
    // where the whole drum is clear of every street; smaller if it does not fit
    const clear = (x, z, r) => { if (onCarriagewayEarly(x, z, 1)) return false; for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; for (const f of [0.5, 1]) if (onCarriagewayEarly(x + Math.sin(a) * r * f, z + Math.cos(a) * r * f, 1)) return false; } return true; };
    let cx = null, cz = null, R = 26; for (const r of [26, 20, 15]) { for (const d of [0, 10, 20, 30, -10]) { const x = T.cx + ux * d, z = T.cz + uz * d; if (clear(x, z, r + 1)) { cx = x; cz = z; R = r; break; } } if (cx !== null) break; }
    if (cx !== null) {
    const fr = cFrame(cx, g0, cz, 0); B.geo(new THREE.CylinderGeometry(R, R, 12, 40, 1, true), glass, fr(0, 6, 0)); B.geo(new THREE.CylinderGeometry(R + 1.2, R + 1.2, 1.2, 40), white, fr(0, 12.6, 0));
    B.geo(new THREE.SphereGeometry(R * 1.35, 40, 10, 0, Math.PI * 2, 0, 0.75), white, fr(0, 13.2 - R * 1.35 * Math.cos(0.75), 0)); B.geo(new THREE.CylinderGeometry(R * 0.35, R * 0.35, 1.6, 24), glass, fr(0, 13.2 + R * 1.35 * (1 - Math.cos(0.75)) - 0.2, 0));
    for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; B.geo(cBox(0.6, 12, 0.6), white, fr(Math.sin(a) * (R + 0.3), 6, Math.cos(a) * (R + 0.3))); }
    COL.addCirc(cx, cz, R); AIRPORT.rotunda = [cx, cz, R]; } }
  // fuel tanks (four white cylinders in a fenced yard), north of Cam. San Lázaro near the Rotonda Sempiterno
  { let spot = null; for (let r = 0; r <= 160 && !spot; r += 10) for (let k = 0; k < Math.max(1, r / 5) && !spot; k++) { const a = k / Math.max(1, r / 5) * Math.PI * 2, x = -2360 + Math.sin(a) * r, z = 20 + Math.cos(a) * r; if ([[0, 0], [16, 0], [0, 16], [16, 16]].every(([dx, dz]) => freeAt(x + dx, z + dz, 9))) spot = [x, z]; }
    if (spot) { const g0 = heightAt(spot[0] + 8, spot[1] + 8); for (const [dx, dz] of [[0, 0], [16, 0], [0, 16], [16, 16]]) { const x = spot[0] + dx, z = spot[1] + dz, fr = cFrame(x, g0, z, 0); B.geo(new THREE.CylinderGeometry(6.5, 6.5, 13, 28), tankW, fr(0, 6.5, 0)); B.geo(new THREE.SphereGeometry(6.5, 28, 6, 0, Math.PI * 2, 0, 0.5), tankW, fr(0, 13 - 6.5 * Math.cos(0.5), 0)); B.geo(cBox(0.15, 13.5, 0.15), steel, fr(6.6, 6.75, 0)); COL.addCirc(x, z, 6.6); }
      const lg = bigSign('DICE COMBUSTIBLES', 10, 1.4, '#c8102e', '#ffffff'); lg.position.set(spot[0] + 8, g0 + 9, spot[1] - 6.7); root.add(lg); AIRPORT.tanks = spot; } }
  // sheds along Cam. San Lázaro: the three biggest buildings between the terminal and the motorway get their parody signs
  { const sheds = BUILD.filter((b) => b.pts && b.cx > -3250 && b.cx < -2450 && b.cz > -340 && b.cz < -95).map((b) => ({ b, a: Math.abs(polyArea(b.pts)) })).sort((p, q) => q.a - p.a).slice(0, 3);
    const SG = [['SEURRO PAQUETERÍA', '#1d4f9c', '#ffd400'], ['GUANCHAVÍA · HANGAR', '#1f8a4c', '#ffffff'], ['ITV LOS RODEOS', '#f2f2ef', '#c8102e']]; AIRPORT.sheds = [];
    sheds.forEach(({ b }, i) => { const E = frontEdge(b.pts); if (!E) return; const w = Math.min(E.L * 0.6, 22), h = w / 7; const sg = bigSign(SG[i][0], w, h, SG[i][1], SG[i][2]); const H = (b.top || heightAt(b.cx, b.cz) + 8) - h / 2 - 0.6; sg.position.set(E.mx + E.nx * 0.25, H, E.mz + E.nz * 0.25); sg.rotation.y = Math.atan2(E.nx, E.nz); root.add(sg); AIRPORT.sheds.push(SG[i][0]); }); }
  // «P» signs on the service roads on the landside of the terminal
  if (T) { const P = []; DATA.R.forEach((rd) => { if (P.length >= 3 || DATA.RT[rd[0]] !== 'service') return; const c = rd[4]; for (let i = 0; i + 3 < c.length && P.length < 3; i += 2) { const x = c[i], z = c[i + 1], d = Math.hypot(x - T.cx, z - T.cz); if (d < 90 || d > 280 || z > T.cz + 40) continue; if (P.some((p) => Math.hypot(p[0] - x, p[1] - z) < 70)) continue; const L = Math.hypot(c[i + 2] - x, c[i + 3] - z) || 1; P.push([x + (c[i + 3] - z) / L * (rd[2] / 2 + 1.2), z - (c[i + 2] - x) / L * (rd[2] / 2 + 1.2), Math.atan2(c[i + 2] - x, c[i + 3] - z)]); } });
    for (let i = P.length - 1; i >= 0; i--) if (onCarriagewayEarly(P[i][0], P[i][1], 0.5)) P.splice(i, 1); // v0.73 (auditor): never on another street
    P.forEach(([x, z, h], i) => { const g = heightAt(x, z), fr = cFrame(x, g, z, h); B.geo(new THREE.CylinderGeometry(0.06, 0.06, 3.4, 8), steel, fr(0, 1.7, 0)); const sg = bigSign('P' + (i + 1) + ' PARKING', 2.2, 1.1, '#1d4f9c', '#ffffff'); sg.position.set(x, g + 3.0, z); sg.rotation.y = h + Math.PI / 2; root.add(sg); COL.addCirc(x, z, 0.12); });
    AIRPORT.psigns = P.length; }
  // perimeter fence along the aerodrome boundary (posts every 4 m, wire mesh), with gaps where a road goes through
  { const ae = AW.find((a) => a[0] === 'aerodrome'); if (ae) { const c = ae[3]; const cv = mkCanvas(64, 64), x2 = cv.getContext('2d'); x2.strokeStyle = '#8d9396'; x2.lineWidth = 2; for (let k = -64; k < 128; k += 12) { x2.beginPath(); x2.moveTo(k, 0); x2.lineTo(k + 64, 64); x2.moveTo(k + 64, 0); x2.lineTo(k, 64); x2.stroke(); }
      const tex = canvasTex(cv); const mesh = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide, roughness: 0.6, metalness: 0.5 }); let n = 0;
      for (let i = 0; i + 3 < c.length; i += 2) { const ax = c[i], az = c[i + 1], bx = c[i + 2], bz = c[i + 3], L = Math.hypot(bx - ax, bz - az); if (L < 0.5) continue; const k = Math.max(1, Math.ceil(L / 6));
        for (let j = 0; j < k; j++) { const t0 = j / k, t1 = (j + 1) / k, x0 = ax + (bx - ax) * t0, z0 = az + (bz - az) * t0, x1 = ax + (bx - ax) * t1, z1 = az + (bz - az) * t1, xm = (x0 + x1) / 2, zm = (z0 + z1) / 2;
          const rd = ROADSEG.nearest(xm, zm); if ((rd && rd.d < DATA.R[rd.ri][2] / 2 + 1) || inAnyBuilding(xm, zm)) continue; const y0 = heightAt(x0, z0), y1 = heightAt(x1, z1);
          if (onCarriagewayEarly(x0, z0, 0.6) || onCarriagewayEarly(x1, z1, 0.6)) continue; /* v0.73 (auditor): no post in a carriageway */
          B.quad(mesh, [x0, y0, z0], [x1, y1, z1], [x1, y1 + 2.4, z1], [x0, y0 + 2.4, z0], 2.4); if (j % 2 === 0) B.geo(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 4), steel, cFrame(x0, y0, z0, 0)(0, 1.3, 0)); n++; } }
      AIRPORT.fence = n; } }
  B.finish(root); scene.add(root);
}
// ---- planes landing and taking off now and then (only drawn while you are within ~2 km of the runway)
const FLIGHT = { t: 25, p: null, kind: 0 };
function updateAirport(dt) {
  const R = AIRPORT.runway; if (!R) return; const mid = R.at(R.tot / 2); if (Math.hypot(PLAYER.x - mid[0], PLAYER.z - mid[1]) > 2600) { if (FLIGHT.p) { FLIGHT.p.visible = false; } return; }
  if (!FLIGHT.p) { FLIGHT.p = makePlane(); FLIGHT.p.visible = false; scene.add(FLIGHT.p); }
  const P = FLIGHT.p; if (!FLIGHT.on) { FLIGHT.t -= dt; if (FLIGHT.t > 0) return; FLIGHT.on = true; FLIGHT.kind = 1 - FLIGHT.kind; FLIGHT.s = FLIGHT.kind ? -2600 : 120; FLIGHT.v = FLIGHT.kind ? 72 : 0; P.visible = true; }
  // runway 30: landing from the east end towards the west, take-off the same way (s measured from the east threshold)
  const along = (s) => { const q = R.at(clamp(R.tot - s, 0, R.tot)); const ex = s < 0 ? -s : s > R.tot ? s - R.tot : 0, sg = s < 0 ? 1 : -1; return [q[0] + q[2] * ex * sg, q[1] + q[3] * ex * sg, -q[2], -q[3]]; };
  let alt = 0, pitch = 0;
  if (FLIGHT.kind) { /* landing: 3° glide, flare, touchdown at 300 m, braking */ FLIGHT.v = FLIGHT.s < 300 ? 72 : Math.max(12, FLIGHT.v - 2.6 * dt); FLIGHT.s += FLIGHT.v * dt; alt = FLIGHT.s < 300 ? Math.max(0, (300 - FLIGHT.s) * 0.052) : 0; pitch = alt > 0 ? -0.05 : 0; if (FLIGHT.s > 1700) FLIGHT.on = false; }
  else { /* take-off: roll, rotate at 900 m, 8° climb */ FLIGHT.v = Math.min(78, FLIGHT.v + 3.2 * dt); FLIGHT.s += FLIGHT.v * dt; alt = FLIGHT.s > 900 ? (FLIGHT.s - 900) * 0.14 : 0; pitch = FLIGHT.s > 900 ? -0.16 : 0; if (FLIGHT.s > 4500) FLIGHT.on = false; }
  const a = along(FLIGHT.s); P.position.set(a[0], heightAt(a[0], a[1]) * (alt > 40 ? 0 : 1) + (alt > 40 ? heightAt(a[0], a[1]) : 0) + alt + 0.1, a[1]); P.rotation.set(pitch, Math.atan2(a[2], a[3]), 0, 'YXZ');
  if (!FLIGHT.on) { P.visible = false; FLIGHT.t = 70 + Math.random() * 60; }
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
