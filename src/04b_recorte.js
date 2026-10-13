// ============ Buildings off the carriageways (v0.69, auditor: 515 buildings standing in the lanes) ============
// The game's streets are wider than the OSM ones (WIDEN in 01_core.js), so many footprints end up inside the lanes.
// Every building footprint is cut back with a straight cut along each carriageway it invades (half the road + 0.3 m),
// on the side where the building is. Not touched: churches and landmarks (style 4), footprints a road goes right
// through (passages), cuts that would reach past the end of the road piece (unless that part is on another road: a
// junction), cuts that would leave less than 50 % of the building, and cuts of less than 0.6 m. v0.70: corners still
// inside a road (where a road piece ends or bends inside the footprint) are pushed out, up to 4 m, if the outline
// does not fold over itself. The Avenida de La Trinidad has its own wider rule (pavement included, 05u_trinidad.js).
let RCLIP = null;
function roadClipGrid() {
  if (RCLIP) return RCLIP; const CS = 40, m = new Map(); const segs = [];
  // each road as straight runs (pieces that turn less than 12°), so a long building beside a road drawn with many short
  // pieces is cut by one long line instead of being skipped by every short piece
  const add = (ax, az, bx, bz, k, k0) => { const L = Math.hypot(bx - ax, bz - az); if (L < 0.3) return; const sg = { ax, az, ux: (bx - ax) / L, uz: (bz - az) / L, L, k, k0 }; const id = segs.push(sg) - 1;
    const x0 = Math.floor((Math.min(ax, bx) - k) / CS), x1 = Math.floor((Math.max(ax, bx) + k) / CS), z0 = Math.floor((Math.min(az, bz) - k) / CS), z1 = Math.floor((Math.max(az, bz) + k) / CS);
    for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) { const key = a * 100003 + b; let l = m.get(key); if (!l) m.set(key, l = []); l.push(id); } };
  DATA.R.forEach((r) => { if (r[0] > 12 || (r[3] & 6)) return; const c = r[4], n = c.length / 2; let i = 0;
    while (i < n - 1) { let j = i + 1, dev = 0;
      for (let jj = i + 2; jj < n; jj++) { const cx = c[2 * jj] - c[2 * i], cz = c[2 * jj + 1] - c[2 * i + 1], CL = Math.hypot(cx, cz) || 1; let ok = true, dv = 0;
        for (let q = i; q < jj && ok; q++) { const sx = c[2 * q + 2] - c[2 * q], sz = c[2 * q + 3] - c[2 * q + 1], SL = Math.hypot(sx, sz) || 1; if ((sx * cx + sz * cz) / (SL * CL) < 0.978) ok = false;
          const px = c[2 * q + 2] - c[2 * i], pz = c[2 * q + 3] - c[2 * i + 1]; dv = Math.max(dv, Math.abs((px * cz - pz * cx) / CL)); }
        if (!ok) break; j = jj; dev = dv; }
      add(c[2 * i], c[2 * i + 1], c[2 * j], c[2 * j + 1], r[2] / 2 + 0.3 + dev, r[2] / 2 + 0.3); i = j; } });
  RCLIP = { CS, m, segs, cut: 0 }; return RCLIP;
}
// is (x, z) on the carriageway of some road piece (other than `skip`)? A building corner that sticks out past the end of
// one road piece is still on the road when it sits in the junction or in the next piece (v0.70: blocks on corners)
function onClipRoad(G, x, z, skip) {
  const l = G.m.get(Math.floor(x / G.CS) * 100003 + Math.floor(z / G.CS)); if (!l) return false;
  for (const id of l) { if (id === skip) continue; const s = G.segs[id]; const t = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz));
    if (Math.hypot(x - s.ax - s.ux * t, z - s.az - s.uz * t) < s.k - 0.3) return true; }
  return false;
}
// keep the part of the polygon where (x - a)·n >= k (Sutherland–Hodgman against one half-plane)
function clipHalf(P, ax, az, nx, nz, k) {
  const out = [], f = (p) => (p[0] - ax) * nx + (p[1] - az) * nz - k;
  for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], fp = f(p), fq = f(q);
    if (fp >= 0) out.push(p); if ((fp >= 0) !== (fq >= 0)) { const t = fp / (fp - fq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } }
  return out;
}
function selfCross(P) { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])), n = P.length;
  for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) { if (i === 0 && j === n - 1) continue; const a = P[i], b = P[(i + 1) % n], c = P[j], d = P[(j + 1) % n];
    if (o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0) return true; }
  return false;
}
function roadClip(pts) {
  const G = roadClipGrid(); let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); }
  const ids = new Set(); for (let a = Math.floor(x0 / G.CS); a <= Math.floor(x1 / G.CS); a++) for (let b = Math.floor(z0 / G.CS); b <= Math.floor(z1 / G.CS); b++) { const l = G.m.get(a * 100003 + b); if (l) for (const id of l) ids.add(id); }
  if (!ids.size) return pts;
  let P = pts, changed = false;
  for (const id of ids) { const s = G.segs[id]; const nx = -s.uz, nz = s.ux; let cx = 0, cz = 0; for (const p of P) { cx += p[0]; cz += p[1]; } cx /= P.length; cz /= P.length;
    const sc = (cx - s.ax) * nx + (cz - s.az) * nz; if (Math.abs(sc) < s.k) continue; const sg = Math.sign(sc); // a road through the middle: a passage, leave it
    let hit = false, beyond = false, deep = 0;
    for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length];
      for (const tt of [0, 0.5]) { const x = p[0] + (q[0] - p[0]) * tt, z = p[1] + (q[1] - p[1]) * tt; const d = ((x - s.ax) * nx + (z - s.az) * nz) * sg; if (d >= s.k) continue;
        const t = (x - s.ax) * s.ux + (z - s.az) * s.uz; if (t >= 0 && t <= s.L) { hit = true; deep = Math.max(deep, s.k - d); } else if ((t < -1.5 || t > s.L + 1.5) && !onClipRoad(G, x, z, id)) beyond = true; } }
    if (!hit || beyond || deep < 0.6) continue; // grazing the kerb by a few centimetres: leave it
    const Q = clipHalf(P, s.ax, s.az, nx * sg, nz * sg, s.k); if (Q.length < 3) return pts; P = Q; changed = true; }
  // corners that still stick into a road (where a road piece ends or bends inside the footprint): push that vertex out
  // across the nearest piece, up to 4 m (v0.70)
  const P0 = P, ch0 = changed;
  const deepAt = (x, z) => { const l = G.m.get(Math.floor(x / G.CS) * 100003 + Math.floor(z / G.CS)); let w = 0; if (l) for (const id of l) { const s = G.segs[id]; const t = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz)); w = Math.max(w, s.k0 - Math.hypot(x - s.ax - s.ux * t, z - s.az - s.uz * t)); } return w; };
  for (let pass = 0; pass < 2; pass++) { const Q = []; let ins = false; // edges whose middle is in the road get a vertex there, to be pushed out too
    for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; Q.push(p); const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2; if (Math.hypot(q[0] - p[0], q[1] - p[1]) > 2 && deepAt(mx, mz) > 0.5) { Q.push([mx, mz]); ins = true; } }
    if (ins) { P = Q; changed = true; } }
  for (let i = 0; i < P.length; i++) { const p = P[i]; const l = G.m.get(Math.floor(p[0] / G.CS) * 100003 + Math.floor(p[1] / G.CS)); if (!l) continue;
    let best = null; for (const id of l) { const s = G.segs[id]; const t = Math.max(0, Math.min(s.L, (p[0] - s.ax) * s.ux + (p[1] - s.az) * s.uz)); const qx = s.ax + s.ux * t, qz = s.az + s.uz * t, d = Math.hypot(p[0] - qx, p[1] - qz);
      const need = s.k0 - d; if (need > 0.5 && d > 0.05 && (!best || need > best.need)) best = { need, ox: (p[0] - qx) / d, oz: (p[1] - qz) / d }; }
    if (best && best.need < 4) { if (P === pts) P = pts.slice(); P[i] = [p[0] + best.ox * best.need, p[1] + best.oz * best.need]; changed = true; } }
  if (P !== P0 && selfCross(P)) { P = P0; changed = ch0; } // a push that folds the outline over itself: keep the straight cuts only
  if (!changed) return pts;
  const a0 = Math.abs(polyArea(pts)), a1 = Math.abs(polyArea(P)); if (a1 < a0 * 0.5 || a1 < 12 || selfCross(P)) return pts;
  G.cut++; return P;
}
