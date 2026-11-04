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
  if (RCLIP) return RCLIP;
  const { CS, m, segs } = roadClipGridPart1();
  // the streets as they are drawn (every piece, no straight runs): to measure how deep a point sits in a carriageway
  const raw = [],
    m2 = new Map();
  DATA.R.forEach((r) => {
    if ((r[0] > 12 && r[0] !== 13) || r[3] & 6) return;
    /* v0.74: pedestrian streets too (a corner pushed out of one street into a pedestrian one blocked Calle Heraclio Sánchez) */ const c = r[4],
      k0 = r[2] / 2 + 0.3;
    for (let i = 0; i + 3 < c.length; i += 2) {
      const ax = c[i],
        az = c[i + 1],
        L = Math.hypot(c[i + 2] - ax, c[i + 3] - az);
      if (L < 0.05) continue;
      const id =
        raw.push({ ax, az, ux: (c[i + 2] - ax) / L, uz: (c[i + 3] - az) / L, L, k0, car: r[0] <= 12, first: i === 0, last: i + 4 >= c.length }) -
        1; /* v1.0.2: car, and whether the piece ends the road (kerbClip) */
      for (let a = Math.floor((Math.min(ax, c[i + 2]) - k0) / CS); a <= Math.floor((Math.max(ax, c[i + 2]) + k0) / CS); a++)
        for (let b = Math.floor((Math.min(az, c[i + 3]) - k0) / CS); b <= Math.floor((Math.max(az, c[i + 3]) + k0) / CS); b++) {
          const key = a * 100003 + b;
          let l = m2.get(key);
          if (!l) m2.set(key, (l = []));
          l.push(id);
        }
    }
  });
  RCLIP = { CS, m, segs, raw, m2, cut: 0, gone: 0, goneList: [], keptList: [] };
  return RCLIP;
}
/** (v1.1.7, code quality) part of roadClipGrid: each road as straight runs (pieces that turn less than 12°), so a long building beside a road drawn with many short */
function roadClipGridPart1() {
  const CS = 40,
    m = new Map();
  const segs = [];
  // each road as straight runs (pieces that turn less than 12°), so a long building beside a road drawn with many short
  // pieces is cut by one long line instead of being skipped by every short piece
  const add = (ax, az, bx, bz, k, k0) => {
    const L = Math.hypot(bx - ax, bz - az);
    if (L < 0.3) return;
    const sg = { ax, az, ux: (bx - ax) / L, uz: (bz - az) / L, L, k, k0 };
    const id = segs.push(sg) - 1;
    const x0 = Math.floor((Math.min(ax, bx) - k) / CS),
      x1 = Math.floor((Math.max(ax, bx) + k) / CS),
      z0 = Math.floor((Math.min(az, bz) - k) / CS),
      z1 = Math.floor((Math.max(az, bz) + k) / CS);
    for (let a = x0; a <= x1; a++)
      for (let b = z0; b <= z1; b++) {
        const key = a * 100003 + b;
        let l = m.get(key);
        if (!l) m.set(key, (l = []));
        l.push(id);
      }
  };
  DATA.R.forEach((r) => {
    if (r[0] > 12 || r[3] & 6) return;
    const c = r[4],
      n = c.length / 2;
    let i = 0;
    while (i < n - 1) {
      let j = i + 1,
        dev = 0;
      for (let jj = i + 2; jj < n; jj++) {
        const cx = c[2 * jj] - c[2 * i],
          cz = c[2 * jj + 1] - c[2 * i + 1],
          CL = Math.hypot(cx, cz) || 1;
        let ok = true,
          dv = 0;
        for (let q = i; q < jj && ok; q++) {
          const sx = c[2 * q + 2] - c[2 * q],
            sz = c[2 * q + 3] - c[2 * q + 1],
            SL = Math.hypot(sx, sz) || 1;
          if ((sx * cx + sz * cz) / (SL * CL) < 0.978) ok = false;
          const px = c[2 * q + 2] - c[2 * i],
            pz = c[2 * q + 3] - c[2 * i + 1];
          dv = Math.max(dv, Math.abs((px * cz - pz * cx) / CL));
        }
        if (!ok) break;
        j = jj;
        dev = dv;
      }
      add(c[2 * i], c[2 * i + 1], c[2 * j], c[2 * j + 1], r[2] / 2 + 0.3 + dev, r[2] / 2 + 0.3);
      i = j;
    }
  });
  return { CS, m, segs };
}
// is (x, z) on the carriageway of some road piece (other than `skip`)? A building corner that sticks out past the end of
// one road piece is still on the road when it sits in the junction or in the next piece (v0.70: blocks on corners)
function onClipRoad(G, x, z, skip) {
  const l = G.m.get(Math.floor(x / G.CS) * 100003 + Math.floor(z / G.CS));
  if (!l) return false;
  for (const id of l) {
    if (id === skip) continue;
    const s = G.segs[id];
    const t = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz));
    if (Math.hypot(x - s.ax - s.ux * t, z - s.az - s.uz * t) < s.k - 0.3) return true;
  }
  return false;
}
// keep the part of the polygon where (x - a)·n >= k (Sutherland–Hodgman against one half-plane)
function clipHalf(P, ax, az, nx, nz, k) {
  const out = [],
    f = (p) => (p[0] - ax) * nx + (p[1] - az) * nz - k;
  for (let i = 0; i < P.length; i++) {
    const p = P[i],
      q = P[(i + 1) % P.length],
      fp = f(p),
      fq = f(q);
    if (fp >= 0) out.push(p);
    if (fp >= 0 !== fq >= 0) {
      const t = fp / (fp - fq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return out;
}
function selfCross(P) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])),
    n = P.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      const a = P[i],
        b = P[(i + 1) % n],
        c = P[j],
        d = P[(j + 1) % n];
      if (o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0) return true;
    }
  return false;
}
// v1.0.0 (auditoría 0.99.8: 81 edificios graves en la calzada; Jonay: «¿es posible que se deba al aumento del ancho de las
// calles?» y luego «un término medio de cada cosa»): the game widens the streets (WIDEN: residential two-way at least
// 8 m) and many real ones outside the old town are 5–6 m between façades. Residential, unclassified, living and service
// streets now meet halfway: where the buildings on either side leave less room than the widened street, the street
// narrows to the middle point between its widened width and that room (never under 5.5 m two-way, 4 m one-way, 4.5 m
// living street, 3.5 m service); the buildings are cut back for the rest (roadClip). The old town (CORE0) keeps its widths.
function narrowToGap() {
  const { E, G, cell, stamp } = narrowToGapPart1();
  const { ray, MINW, nearBT, narrowed } = narrowToGapPart2(cell, G, stamp, E);
  let n = 0;
  DATA.R.forEach((r, ri) => {
    const t = r[0];
    if (t < 9 || t > 12 || r[3] & 6) return;
    const c = r[4],
      W = r[2],
      one = r[3] & 1,
      half = W / 2;
    const m = (c.length >> 2) << 1;
    if (inCore0(c[m], c[m + 1])) return;
    for (let i = 0; i < c.length; i += 2) if (nearBT(c[i], c[i + 1])) return;
    const room = [];
    let samples = 0;
    for (let i = 0; i + 3 < c.length; i += 2) {
      const ax = c[i],
        az = c[i + 1],
        L = Math.hypot(c[i + 2] - ax, c[i + 3] - az);
      if (L < 0.5) continue;
      const ux = (c[i + 2] - ax) / L,
        uz = (c[i + 3] - az) / L;
      for (let s = 3; s < L - 1; s += 6) {
        const x = ax + ux * s,
          z = az + uz * s;
        samples++;
        const d = Math.min(ray(x, z, -uz, ux, half + 1), ray(x, z, uz, -ux, half + 1)) + 0.75;
        if (d < half) room.push(2 * d);
      }
    }
    if (room.length < 3 || room.length < samples * 0.25) return; // one garage on a corner does not narrow the whole street (it gets cut)
    room.sort((a, b) => a - b);
    const gap = room[Math.floor(room.length * 0.3)];
    const w = Math.round(Math.max(MINW(t, one), Math.min(W, (W + gap) / 2)) * 10) / 10;
    if (w < W - 0.2) {
      r[2] = w;
      narrowed.set(ri, w);
      n++;
    }
  });
  narrowToGapPart3(narrowed);
  console.log('calles al hueco entre edificios:', n); // (road index → width, for the tests)
}
/** (v1.1.7, code quality) part of narrowToGap: the traffic graph's edges along those streets take the same width (lanes and parked cars follow it) */
function narrowToGapPart3(narrowed) {
  // the traffic graph's edges along those streets take the same width (lanes and parked cars follow it)
  if (narrowed.size) {
    const RG = new Map();
    for (const [ri] of narrowed) {
      const c = DATA.R[ri][4];
      for (let i = 0; i + 3 < c.length; i += 2) {
        const k = Math.floor((c[i] + c[i + 2]) / 2 / 20) * 100003 + Math.floor((c[i + 1] + c[i + 3]) / 2 / 20);
        let l = RG.get(k);
        if (!l) RG.set(k, (l = []));
        l.push([ri, c[i], c[i + 1], c[i + 2], c[i + 3]]);
      }
    }
    const N = DATA.G.n;
    for (const e of DATA.G.e) {
      if (e[2] < 9 || e[2] > 12) continue;
      const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
        h = (P.length >> 2) << 1;
      const x = (P[h] + P[h - 2]) / 2,
        z = (P[h + 1] + P[h - 1]) / 2;
      let best = null,
        bd = 3;
      for (let a = -1; a <= 1; a++)
        for (let q = -1; q <= 1; q++)
          for (const sg of RG.get((Math.floor(x / 20) + a) * 100003 + Math.floor(z / 20) + q) || []) {
            const ex = sg[3] - sg[1],
              ez = sg[4] - sg[2],
              L2 = ex * ex + ez * ez || 1,
              tt = Math.max(0, Math.min(1, ((x - sg[1]) * ex + (z - sg[2]) * ez) / L2)),
              dd = Math.hypot(x - sg[1] - ex * tt, z - sg[2] - ez * tt);
            if (dd < bd) {
              bd = dd;
              best = sg[0];
            }
          }
      if (best !== null) e[4] = Math.min(e[4], narrowed.get(best));
    }
  }
  DATA.NARROWED = narrowed;
}
/** (v1.1.7, code quality) part of narrowToGap: v1.0.0 (Jonay: «me da miedo que se rompan las intersecciones con puentes y túneles»): a street that comes within */
function narrowToGapPart2(cell, G, stamp, E) {
  let st = 0;
  const ray = (x, z, nx, nz, far) => {
    let best = far,
      lk = -2;
    st++;
    for (let t = 0; t <= far + 1; t += 2) {
      const k = cell(x + nx * t, z + nz * t);
      if (k === lk || k < 0) continue;
      lk = k;
      const l = G[k];
      if (!l) continue;
      for (const id of l) {
        if (stamp[id] === st) continue;
        stamp[id] = st;
        const e = E[id],
          ax = e[0],
          az = e[1],
          ex = e[2] - ax,
          ez = e[3] - az,
          den = nx * ez - nz * ex;
        if (Math.abs(den) < 1e-9) continue;
        const tt = ((ax - x) * ez - (az - z) * ex) / den,
          u = ((ax - x) * nz - (az - z) * nx) / den;
        if (tt > 0 && tt < best && u >= 0 && u <= 1) best = tt;
      }
    }
    return best;
  };
  const MINW = (t, one) => (t === 12 ? 3.5 : t === 11 ? 4.5 : one ? 4 : 5.5);
  // v1.0.0 (Jonay: «me da miedo que se rompan las intersecciones con puentes y túneles»): a street that comes within
  // 40 m of a bridge or a tunnel (r[3] & 6), above or below, keeps its width
  const BT = new Set();
  for (const r of DATA.R) {
    if (!(r[3] & 6)) continue;
    const c = r[4];
    for (let i = 0; i + 3 < c.length; i += 2) {
      const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]);
      for (let s = 0; s <= L; s += 20) {
        const t = L ? s / L : 0;
        BT.add(Math.floor((c[i] + (c[i + 2] - c[i]) * t) / 40) * 100003 + Math.floor((c[i + 1] + (c[i + 3] - c[i + 1]) * t) / 40));
      }
    }
  }
  const nearBT = (x, z) => {
    const a = Math.floor(x / 40),
      q = Math.floor(z / 40);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) if (BT.has((a + i) * 100003 + q + j)) return true;
    return false;
  };
  const narrowed = new Map();
  return { ray, MINW, nearBT, narrowed };
}
/** (v1.1.7, code quality) part of narrowToGap: distance from (x, z) along (nx, nz) to the first building edge, up to `far` */
function narrowToGapPart1() {
  const CS = 16,
    E = [];
  let X0 = 1e9,
    Z0 = 1e9,
    X1 = -1e9,
    Z1 = -1e9; // building edges (the 0.75 m inset the buildings get later is added below)
  for (const b of DATA.B) {
    if (b[1] === 4) continue;
    const c = b[6],
      n = c.length / 2;
    if (n < 3) continue;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      E.push([c[2 * i], c[2 * i + 1], c[2 * j], c[2 * j + 1]]);
      X0 = Math.min(X0, c[2 * i]);
      X1 = Math.max(X1, c[2 * i]);
      Z0 = Math.min(Z0, c[2 * i + 1]);
      Z1 = Math.max(Z1, c[2 * i + 1]);
    }
  }
  const GX = Math.ceil((X1 - X0) / CS) + 1,
    GZ = Math.ceil((Z1 - Z0) / CS) + 1,
    G = new Array(GX * GZ); // flat array grid (number keys in a Map were 4x slower)
  const cell = (x, z) => {
    const a = Math.floor((x - X0) / CS),
      q = Math.floor((z - Z0) / CS);
    return a < 0 || q < 0 || a >= GX || q >= GZ ? -1 : a * GZ + q;
  };
  E.forEach((e, id) => {
    for (let a = Math.floor((Math.min(e[0], e[2]) - X0) / CS); a <= Math.floor((Math.max(e[0], e[2]) - X0) / CS); a++)
      for (let q = Math.floor((Math.min(e[1], e[3]) - Z0) / CS); q <= Math.floor((Math.max(e[1], e[3]) - Z0) / CS); q++) {
        const k = a * GZ + q;
        (G[k] || (G[k] = [])).push(id);
      }
  });
  // distance from (x, z) along (nx, nz) to the first building edge, up to `far`
  const stamp = new Int32Array(E.length);
  return { E, G, cell, stamp };
}
// v1.0.0 (auditoría: 4 críticos y 77 altos que siguen en la calzada): tests only. When RCLIP.dbg is an array, each rule
// that leaves a building as it was says why (herramientas/sonda_recorte_motivos.py)
function clipWhy(m, s) {
  if (RCLIP && RCLIP.dbg)
    RCLIP.dbg.push(
      s ? m + ' [tramo ' + Math.round(s.ax) + ',' + Math.round(s.az) + ' ' + Math.round(s.L) + ' m, medio ancho ' + s.k0.toFixed(1) + ']' : m
    );
}
// v1.0.1 (Jonay: «que el recorte se haga siguiendo en paralelo a la calle, para que la esquina del edificio no acabe en 45
// grados»): where the straight cut would run past the end of the road piece (a corner at a junction), only the part of
// the building that is on the carriageway goes: the polygon minus the road's rectangle, a square notch parallel to the
// street. R is convex; each «bite» of R into P is replaced by R's border between the way in and the way out.
function subtractConvex(P, R, ends) {
  // ends: R's edges that are the ends of the road (the bevelled ones)
  if (polyArea(R) < 0) {
    R = R.slice().reverse();
    if (ends) ends = ends.map((j) => (R.length - 2 - j < 0 ? R.length - 1 : R.length - 2 - j));
  }
  const cr = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const inR = (p) => {
    for (let i = 0; i < R.length; i++) if (cr(R[i], R[(i + 1) % R.length], p) < -1e-9) return false;
    return true;
  };
  const inP = (x, z) => {
    let o = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const a = P[i],
        b = P[j];
      if (a[1] > z !== b[1] > z && x < ((b[0] - a[0]) * (z - a[1])) / (b[1] - a[1]) + a[0]) o = !o;
    }
    return o;
  };
  const per = [];
  let acc = 0;
  for (let i = 0; i < R.length; i++) {
    per.push(acc);
    const q = R[(i + 1) % R.length];
    acc += Math.hypot(q[0] - R[i][0], q[1] - R[i][1]);
  }
  const PER = acc;
  // the walk along P with the crossings of R's border put in their place (each with where it falls on R's perimeter)
  const W = [];
  let nx = 0;
  for (let i = 0; i < P.length; i++) {
    const a = P[i],
      b = P[(i + 1) % P.length];
    W.push({ p: a, inR: inR(a) });
    const xs = [];
    for (let j = 0; j < R.length; j++) {
      const c = R[j],
        d = R[(j + 1) % R.length],
        ex = b[0] - a[0],
        ez = b[1] - a[1],
        fx = d[0] - c[0],
        fz = d[1] - c[1],
        den = ex * fz - ez * fx;
      if (Math.abs(den) < 1e-12) continue;
      const t = ((c[0] - a[0]) * fz - (c[1] - a[1]) * fx) / den,
        u = ((c[0] - a[0]) * ez - (c[1] - a[1]) * ex) / den;
      if (t > 1e-9 && t < 1 - 1e-9 && u >= 0 && u <= 1) xs.push({ t, j, pos: per[j] + u * Math.hypot(fx, fz), q: [a[0] + ex * t, a[1] + ez * t] });
    }
    xs.sort((m, n) => m.t - n.t);
    for (const x of xs) {
      W.push({ p: x.q, x: true, pos: x.pos, j: x.j });
      nx++;
    }
  }
  if (!nx) return W.every((w) => w.inR) ? [] : P; // all on the road, or no bite
  let st = W.findIndex((w) => !w.x && !w.inR);
  if (st < 0) return [];
  const out = [];
  let entry = null;
  for (let k = 0; k < W.length; k++) {
    const w = W[(st + k) % W.length];
    if (!w.x) {
      if (!entry && !w.inR) out.push(w.p);
      continue;
    }
    if (!entry) {
      entry = w;
      out.push(w.p);
      continue;
    }
    // the way out: R's corners between the two crossings, on the side that lies inside P
    const fwd = [],
      bwd = [];
    for (let j = 0; j < R.length; j++) {
      const d1 = (per[j] - entry.pos + PER) % PER,
        d2 = (w.pos - entry.pos + PER) % PER;
      if (d1 > 0 && d1 < d2) fwd.push([d1, R[j]]);
      else if (d1 > d2) bwd.push([d1, R[j]]);
    }
    fwd.sort((m, n) => m[0] - n[0]);
    bwd.sort((m, n) => n[0] - m[0]);
    const mid = (L) => (L.length ? L[0][1] : [(entry.p[0] + w.p[0]) / 2, (entry.p[1] + w.p[1]) / 2]);
    const pick = fwd.length && inP(...mid(fwd)) ? fwd : bwd.length && inP(...mid(bwd)) ? bwd : fwd.length <= bwd.length ? fwd : bwd;
    // v1.0.1 (Jonay: «la pared se hace paralela a la calle y la unión con la otra no hace falta que sea a 90 grados»): the
    // step at the end of the road is bevelled, not square: its point on the old wall slides along that wall as far as the
    // step is deep (about 135° at the inner corner), never past the next corner of the building
    const slide = (pt, to, r) => {
      const dx = to[0] - pt[0],
        dz = to[1] - pt[1],
        L = Math.hypot(dx, dz),
        dep = Math.hypot(r[0] - pt[0], r[1] - pt[1]);
      if (L < 0.05) return pt;
      const m = Math.min(dep, L * 0.8);
      return [pt[0] + (dx / L) * m, pt[1] + (dz / L) * m];
    };
    if (ends && pick.length && ends.includes(entry.j) && out.length >= 2) out[out.length - 1] = slide(entry.p, out[out.length - 2], pick[0][1]);
    for (const [, r] of pick) out.push(r);
    let ex = w.p;
    if (ends && pick.length && ends.includes(w.j)) ex = slide(w.p, W[(st + k + 1) % W.length].p, pick[pick.length - 1][1]);
    out.push(ex);
    entry = null;
  }
  return out.length >= 3 ? out : [];
}
// It also brings back buildings that were going to go (only a strip left with the straight cuts): what is left off the
// kerb is kept if it has some sense (12 m², 2,5 m deep).
// v1.0.2 (Jonay: «detectar cuándo el borde de la calzada empieza a tener ángulo y que el edificio vaya paralelo a este, de
// manera que sea imposible que invada la calzada; si son esquinas, solo se amplía el ángulo de unión»): the carriageway is
// taken off the building piece by piece of the street as it is drawn (curves included): each piece's rectangle, a disc
// where two pieces meet, and the bevelled step only where the road really ends. A piece that would cut the building in
// two (a street right through it) is left to the rules above.
function kerbClip(P, G) {
  let x0 = 1e9,
    x1 = -1e9,
    z0 = 1e9,
    z1 = -1e9;
  for (const p of P) {
    x0 = Math.min(x0, p[0]);
    x1 = Math.max(x1, p[0]);
    z0 = Math.min(z0, p[1]);
    z1 = Math.max(z1, p[1]);
  }
  const ids = new Set();
  for (let a = Math.floor((x0 - 8) / G.CS); a <= Math.floor((x1 + 8) / G.CS); a++)
    for (let b = Math.floor((z0 - 8) / G.CS); b <= Math.floor((z1 + 8) / G.CS); b++) {
      const l = G.m2.get(a * 100003 + b);
      if (l) for (const id of l) ids.add(id);
    }
  const { deep } = kerbClipPart1();
  for (const id of ids) {
    const s = G.raw[id];
    if (!s.car) continue;
    const k = s.k0 - 0.3;
    if (deep(P, s, k) < 0.25) continue;
    const nx = -s.uz,
      nz = s.ux,
      bx = s.ax + s.ux * s.L,
      bz = s.az + s.uz * s.L;
    const R = [
      [s.ax + nx * k, s.az + nz * k],
      [bx + nx * k, bz + nz * k],
      [bx - nx * k, bz - nz * k],
      [s.ax - nx * k, s.az - nz * k]
    ];
    const ends = [];
    if (s.last) ends.push(1);
    if (s.first) ends.push(3);
    let Q = subtractConvex(P, R, ends);
    if (Q.length >= 3 && Q !== P && !selfCross(Q) && deep(Q, s, k) < 0.25) P = Q;
    // the joint with the next piece (a curve): a disc, so the outer side of the bend is also free
    if (!s.last) {
      const D = [];
      for (let j = 0; j < 10; j++) {
        const a = (j / 10) * Math.PI * 2;
        D.push([bx + Math.cos(a) * k, bz + Math.sin(a) * k]);
      }
      Q = subtractConvex(P, D, null);
      if (Q.length >= 3 && Q !== P && !selfCross(Q)) P = Q;
    }
  }
  return P;
}
/** (v1.1.7, code quality) part of kerbClip */
function kerbClipPart1() {
  const deep = (Q, s, k) => {
    let w = 0;
    for (let i = 0; i < Q.length; i++) {
      const p = Q[i],
        q = Q[(i + 1) % Q.length];
      for (const t of [0, 0.25, 0.5, 0.75]) {
        const x = p[0] + (q[0] - p[0]) * t,
          z = p[1] + (q[1] - p[1]) * t,
          u = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz));
        w = Math.max(w, k - Math.hypot(x - s.ax - s.ux * u, z - s.az - s.uz * u));
      }
    }
    return w;
  };
  return { deep };
}
// a building that goes (only a strip on the pavement would be left): counted, with where and how big it was (tests).
// One of 50 m² or more never goes (Jonay, 3-nov: «no me gustaría que se fuera nada de más de 50 m²; esos casos mirémoslos
// uno a uno»): it stays as it was and goes on the list for the photos (herramientas/sonda_edificios_dudosos.py)
function goneNote(G, pts, why) {
  const A = Math.abs(polyArea(pts));
  if (A >= 50) {
    G.kept = (G.kept || 0) + 1;
    if (window.__JETA_TEST && G.keptList.length < 400) {
      let x = 0,
        z = 0;
      for (const p of pts) {
        x += p[0];
        z += p[1];
      }
      G.keptList.push([Math.round(x / pts.length), Math.round(z / pts.length), Math.round(A), why || '']);
    }
    return false;
  }
  G.gone++;
  let x = 0,
    z = 0;
  for (const p of pts) {
    x += p[0];
    z += p[1];
  }
  if (G.goneList.length < 2000) G.goneList.push([Math.round(x / pts.length), Math.round(z / pts.length), Math.round(Math.abs(polyArea(pts)))]);
  return true;
}
// a strip: twice the area over the perimeter is about the short side of a long thin outline (2.5 m deep or less)
function thin(P) {
  let per = 0;
  for (let i = 0; i < P.length; i++) {
    const q = P[(i + 1) % P.length];
    per += Math.hypot(q[0] - P[i][0], q[1] - P[i][1]);
  }
  return (2 * Math.abs(polyArea(P))) / (per || 1) < 1.25;
}
// returns the outline off the carriageways, the same array if nothing changed, or null if the building has to go
// v1.0.3 (Jonay: «te has cargado demasiados edificios; los recortes fueron mal, empeoraron mucho», con capturas de
// manzanas del casco convertidas en plazas): since v1.0.0 a straight cut could take more than half of a building (and
// along a bent street the straight run is wider than the street). Now the cut that only takes off the carriageway
// (kerbClip, piece by piece) goes first; the straight cuts are only the fallback, and they never take more than half of a
// building of 50 m² or more again.
function carDeep(Q, G) {
  let w = 0;
  for (let i = 0; i < Q.length; i++) {
    const p = Q[i],
      q = Q[(i + 1) % Q.length];
    for (const t of [0, 0.25, 0.5, 0.75]) {
      const x = p[0] + (q[0] - p[0]) * t,
        z = p[1] + (q[1] - p[1]) * t,
        l = G.m2.get(Math.floor(x / G.CS) * 100003 + Math.floor(z / G.CS));
      if (l)
        for (const id of l) {
          const s = G.raw[id];
          if (!s.car) continue;
          const u = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz));
          w = Math.max(w, s.k0 - 0.3 - Math.hypot(x - s.ax - s.ux * u, z - s.az - s.uz * u));
        }
    }
  }
  return w;
}
function roadClip(pts) {
  return roadClipStraight(pts);
} // v1.0.3: the v0.99.8 rules (the notch and the kerb cut made glitches and ate blocks; to redo)
function roadClipStraight(pts) {
  const { G, ids } = roadClipStraightPart1(pts);
  if (!ids.size) return pts;
  let P = pts,
    changed = false;
  for (const id of ids) {
    const s = G.segs[id];
    const nx = -s.uz,
      nz = s.ux;
    let cx = 0,
      cz = 0;
    for (const p of P) {
      cx += p[0];
      cz += p[1];
    }
    cx /= P.length;
    cz /= P.length;
    const sc = (cx - s.ax) * nx + (cz - s.az) * nz;
    if (Math.abs(sc) < s.k) {
      // a road through the middle. v0.99.6 (Jonay: «recortar el edificio»; auditor: 3 critical, a service road through
      // a block at X −858 Z 70): if the road goes right through (both ends outside), keep the bigger side, the road free;
      // a road that ends inside (a garage entrance) is left as it was
      const flat = P.flat(),
        ex = s.ax + s.ux * s.L,
        ez = s.az + s.uz * s.L;
      if (pip(s.ax, s.az, flat) || pip(ex, ez, flat)) {
        clipWhy('medio: la calle acaba dentro', s);
        continue;
      }
      const A0 = Math.abs(polyArea(P)),
        QA = clipHalf(P, s.ax, s.az, nx, nz, s.k),
        QB = clipHalf(P, s.ax, s.az, -nx, -nz, s.k);
      const aA = QA.length >= 3 ? Math.abs(polyArea(QA)) : 0,
        aB = QB.length >= 3 ? Math.abs(polyArea(QB)) : 0;
      if (aA + aB > A0 * 0.98) {
        clipWhy('medio: no la cruza', s);
        continue;
      } // (not really across it)
      const Q = aA >= aB ? QA : QB,
        aq = Math.max(aA, aB);
      if (aq < 25 || aq < A0 * 0.3) {
        clipWhy('medio: quedaría muy poco (' + Math.round(aq) + ' de ' + Math.round(A0) + ' m²)', s);
        continue;
      }
      P = Q;
      changed = true;
      continue;
    } // v1.0.3: the v0.99.8 rule again
    const sg = Math.sign(sc);
    let hit = false,
      beyond = false,
      deep = 0;
    for (let i = 0; i < P.length; i++) {
      const p = P[i],
        q = P[(i + 1) % P.length];
      for (const tt of [0, 0.5]) {
        const x = p[0] + (q[0] - p[0]) * tt,
          z = p[1] + (q[1] - p[1]) * tt;
        const d = ((x - s.ax) * nx + (z - s.az) * nz) * sg;
        if (d >= s.k) continue;
        const t = (x - s.ax) * s.ux + (z - s.az) * s.uz;
        if (t >= 0 && t <= s.L) {
          hit = true;
          deep = Math.max(deep, s.k - d);
        } else if ((t < -1.5 || t > s.L + 1.5) && !onClipRoad(G, x, z, id)) beyond = true;
      }
    }
    if (!hit || beyond || deep < 0.6) {
      if (hit) clipWhy(beyond ? 'lado: el corte pasaría del final de la calle' : 'lado: menos de 0,6 m', s);
      continue;
    } // grazing the kerb by a few centimetres: leave it
    const Q = clipHalf(P, s.ax, s.az, nx * sg, nz * sg, s.k);
    if (Q.length < 3) {
      clipWhy('lado: no queda nada', s);
      return pts;
    }
    P = Q;
    changed = true;
  }
  // corners that still stick into a road (where a road piece ends or bends inside the footprint): push that vertex out
  // across the nearest piece, up to 4 m (v0.70)
  const P0 = P,
    ch0 = changed;
  const deepAt = (x, z) => {
    const l = G.m2.get(Math.floor(x / G.CS) * 100003 + Math.floor(z / G.CS));
    let w = 0;
    if (l)
      for (const id of l) {
        const s = G.raw[id];
        const t = Math.max(0, Math.min(s.L, (x - s.ax) * s.ux + (z - s.az) * s.uz));
        w = Math.max(w, s.k0 - Math.hypot(x - s.ax - s.ux * t, z - s.az - s.uz * t));
      }
    return w;
  };
  for (let pass = 0; pass < 2; pass++) {
    const Q = [];
    let ins = false; // edges whose middle is in the road get a vertex there, to be pushed out too
    for (let i = 0; i < P.length; i++) {
      const p = P[i],
        q = P[(i + 1) % P.length];
      Q.push(p);
      const mx = (p[0] + q[0]) / 2,
        mz = (p[1] + q[1]) / 2;
      if (Math.hypot(q[0] - p[0], q[1] - p[1]) > 2 && deepAt(mx, mz) > 0.5) {
        Q.push([mx, mz]);
        ins = true;
      }
    }
    if (ins) {
      P = Q;
      changed = true;
    }
  }
  for (let i = 0; i < P.length; i++) {
    const p = P[i];
    const l = G.m.get(Math.floor(p[0] / G.CS) * 100003 + Math.floor(p[1] / G.CS));
    if (!l) continue;
    let best = null;
    for (const id of l) {
      const s = G.segs[id];
      const t = Math.max(0, Math.min(s.L, (p[0] - s.ax) * s.ux + (p[1] - s.az) * s.uz));
      const qx = s.ax + s.ux * t,
        qz = s.az + s.uz * t,
        d = Math.hypot(p[0] - qx, p[1] - qz);
      const need = s.k0 - d;
      if (need > 0.5 && d > 0.05 && (!best || need > best.need)) best = { need, ox: (p[0] - qx) / d, oz: (p[1] - qz) / d };
    }
    if (best && best.need < 4) {
      const q = [p[0] + best.ox * best.need, p[1] + best.oz * best.need];
      if (deepAt(q[0], q[1]) > 0.3) continue;
      /* v0.73: pushed out of one street into another (a corner): leave it */ {
        const a = P[(i + P.length - 1) % P.length],
          c = P[(i + 1) % P.length];
        let bad = false;
        for (const nb of [a, c])
          for (const t of [0.25, 0.5, 0.75]) {
            const ox = p[0] + (nb[0] - p[0]) * t,
              oz = p[1] + (nb[1] - p[1]) * t,
              nx2 = q[0] + (nb[0] - q[0]) * t,
              nz2 = q[1] + (nb[1] - q[1]) * t;
            if (deepAt(nx2, nz2) > Math.max(0.3, deepAt(ox, oz))) bad = true;
          }
        if (bad) continue;
      }
      /* ...nor may its two edges cut into one */ if (P === pts) P = pts.slice();
      P[i] = q;
      changed = true;
    }
  }
  if (P !== P0 && selfCross(P)) {
    clipWhy('esquinas: el contorno se cruzaría');
    P = P0;
    changed = ch0;
  } // a push that folds the outline over itself: keep the straight cuts only
  // v0.73 (auditor 0.70: 43 «new» invasions): never hand back an outline that sits deeper in some street than the
  // original did (a cut along one street that runs on through a junction into the next one)
  const polyDeep = (Q) => {
    let w = 0;
    for (let i = 0; i < Q.length; i++) {
      const p = Q[i],
        q = Q[(i + 1) % Q.length];
      for (const t of [0, 0.25, 0.5, 0.75]) w = Math.max(w, deepAt(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t));
    }
    return w;
  };
  if (changed) {
    const d0 = polyDeep(pts);
    if (polyDeep(P) > d0 + 0.1) {
      if (P !== P0 && ch0 && polyDeep(P0) <= d0 + 0.1) P = P0;
      else {
        clipWhy('queda más metido en otra calle');
        return pts;
      }
    }
  }
  if (!changed) return pts;
  const a0 = Math.abs(polyArea(pts)),
    a1 = Math.abs(polyArea(P));
  if (selfCross(P)) {
    clipWhy('final: el contorno se cruza');
    return pts;
  }
  if (a1 < a0 * (a0 < 150 ? 0.4 : 0.5) || a1 < 12) {
    clipWhy('final: perdería demasiado (' + Math.round(a1) + ' de ' + Math.round(a0) + ' m²)');
    return pts;
  } // small houses may lose a bit more (v0.73); v1.0.3 (Jonay: «te has cargado demasiados edificios»): the v0.99.8 rule again
  G.cut++;
  return P;
}
/** (v1.1.7, code quality) part of roadClipStraight */
function roadClipStraightPart1(pts) {
  const G = roadClipGrid();
  let x0 = 1e9,
    x1 = -1e9,
    z0 = 1e9,
    z1 = -1e9;
  for (const p of pts) {
    x0 = Math.min(x0, p[0]);
    x1 = Math.max(x1, p[0]);
    z0 = Math.min(z0, p[1]);
    z1 = Math.max(z1, p[1]);
  }
  const ids = new Set();
  for (let a = Math.floor(x0 / G.CS); a <= Math.floor(x1 / G.CS); a++)
    for (let b = Math.floor(z0 / G.CS); b <= Math.floor(z1 / G.CS); b++) {
      const l = G.m.get(a * 100003 + b);
      if (l) for (const id of l) ids.add(id);
    }
  return { G, ids };
}
