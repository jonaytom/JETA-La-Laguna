// ============ Buildings off the carriageways (v0.69, auditor: 515 buildings standing in the lanes) ============
// The game's streets are wider than the OSM ones (WIDEN in 01_core.js), so many footprints end up inside the lanes.
// Every building footprint is cut back with a straight cut along each carriageway it invades (half the road + 0.3 m),
// on the side where the building is. Not touched: churches and landmarks (style 4), footprints a road goes right
// through (passages), cuts that would reach past the end of the road piece, and cuts that would leave less than
// 60 % of the building, and cuts of less than 0.6 m. The Avenida de La Trinidad has its own wider rule (pavement included, 05u_trinidad.js).
let RCLIP = null;
function roadClipGrid() {
  if (RCLIP) return RCLIP; const CS = 40, m = new Map(); const segs = [];
  // each road as straight runs (pieces that turn less than 12°), so a long building beside a road drawn with many short
  // pieces is cut by one long line instead of being skipped by every short piece
  const add = (ax, az, bx, bz, k) => { const L = Math.hypot(bx - ax, bz - az); if (L < 0.3) return; const sg = { ax, az, ux: (bx - ax) / L, uz: (bz - az) / L, L, k }; const id = segs.push(sg) - 1;
    const x0 = Math.floor((Math.min(ax, bx) - k) / CS), x1 = Math.floor((Math.max(ax, bx) + k) / CS), z0 = Math.floor((Math.min(az, bz) - k) / CS), z1 = Math.floor((Math.max(az, bz) + k) / CS);
    for (let a = x0; a <= x1; a++) for (let b = z0; b <= z1; b++) { const key = a * 100003 + b; let l = m.get(key); if (!l) m.set(key, l = []); l.push(id); } };
  DATA.R.forEach((r) => { if (r[0] > 12 || (r[3] & 6)) return; const c = r[4], n = c.length / 2; let i = 0;
    while (i < n - 1) { let j = i + 1, dev = 0;
      for (let jj = i + 2; jj < n; jj++) { const cx = c[2 * jj] - c[2 * i], cz = c[2 * jj + 1] - c[2 * i + 1], CL = Math.hypot(cx, cz) || 1; let ok = true, dv = 0;
        for (let q = i; q < jj && ok; q++) { const sx = c[2 * q + 2] - c[2 * q], sz = c[2 * q + 3] - c[2 * q + 1], SL = Math.hypot(sx, sz) || 1; if ((sx * cx + sz * cz) / (SL * CL) < 0.978) ok = false;
          const px = c[2 * q + 2] - c[2 * i], pz = c[2 * q + 3] - c[2 * i + 1]; dv = Math.max(dv, Math.abs((px * cz - pz * cx) / CL)); }
        if (!ok) break; j = jj; dev = dv; }
      add(c[2 * i], c[2 * i + 1], c[2 * j], c[2 * j + 1], r[2] / 2 + 0.3 + dev); i = j; } });
  RCLIP = { CS, m, segs, cut: 0 }; return RCLIP;
}
// keep the part of the polygon where (x - a)·n >= k (Sutherland–Hodgman against one half-plane)
function clipHalf(P, ax, az, nx, nz, k) {
  const out = [], f = (p) => (p[0] - ax) * nx + (p[1] - az) * nz - k;
  for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length], fp = f(p), fq = f(q);
    if (fp >= 0) out.push(p); if ((fp >= 0) !== (fq >= 0)) { const t = fp / (fp - fq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } }
  return out;
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
        const t = (x - s.ax) * s.ux + (z - s.az) * s.uz; if (t >= 0 && t <= s.L) { hit = true; deep = Math.max(deep, s.k - d); } else if (t < -1.5 || t > s.L + 1.5) beyond = true; } }
    if (!hit || beyond || deep < 0.6) continue; // grazing the kerb by a few centimetres: leave it
    const Q = clipHalf(P, s.ax, s.az, nx * sg, nz * sg, s.k); if (Q.length < 3) return pts; P = Q; changed = true; }
  if (!changed) return pts;
  const a0 = Math.abs(polyArea(pts)), a1 = Math.abs(polyArea(P)); if (a1 < a0 * 0.6 || a1 < 12) return pts;
  G.cut++; return P;
}
