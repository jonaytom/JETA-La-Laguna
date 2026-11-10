// ============ CORREDORES (v1.2.0, Jonay, 9-nov: «los cruces, rotondas, puentes, túneles, en general hay que revisarlos
// para que tengan continuidad… si es necesario los diseñamos de 0») ============
// The OSM gives each direction of a dual road as its own one-way way, often a few metres apart, and the game drew each
// one with the width of a two-way street (tertiary: 8 m × 1.3) and its own height: the two halves overlapped, their lines
// mixed and, where they go down into a trench, each sank at its own rate (San Honorato: 1.6 m apart side by side).
// Here, zone by zone (Jonay chose to start with San Honorato and see it before the rest):
//   1. the two halves of a dual road are found (one-way ways running the other way within a few metres);
//   2. each gets the width of its lanes (3.5 m a lane plus the kerb strips), so they sit side by side;
//   3. both share one height profile: where one sinks, the other sinks with it, point by point.
/** the zones where the new rules apply (more are added once Jonay has seen the first one) */
function corrZones() {
  return (
    corrZones.z ||
    (corrZones.z = [
      { name: 'San Honorato', x0: -1075, x1: -890, z0: 30, z1: 200, pave: true, wall: [0.36, 0.33, 0.3] },
      // v1.2.0 (Jonay, con 11 fotos de Google: «la rotonda del Camino San Lázaro»): the TF-5 runs in an open trench (dark basalt walls, Street View) all
      // along, with walls covered in green, under the roundabout; never a covered tube; no pavement down there
      { name: 'San Lázaro', x0: -2470, x1: -1620, z0: -330, z1: -90, pave: false, twins: false, open: true, wall: [0.26, 0.26, 0.25] },
      // (Jonay, Los Rodeos, X −3322, Y −193: «este puente también tiene valla a los lados del estilo de San Lázaro, y la
      // autopista se monta con la calle paralela»): the TF-5 under the bridge by the airport, the same way
      // v1.2.1 (Jonay: «la avenida es una locura… las separaciones de carriles»): the Av. Lora Tamayo, two carriageways of
      // two lanes with a narrow median (Google 3D): each half at the width of its lanes
      { name: 'Lora Tamayo', x0: 140, x1: 260, z0: 790, z1: 1190, pave: false, twins: true, wall: [0.36, 0.33, 0.3] },
      { name: 'Los Rodeos', x0: -3440, x1: -3150, z0: -260, z1: -120, pave: false, twins: false, open: true, wall: [0.26, 0.26, 0.25] }
    ])
  );
}
function inCorr(x, z) {
  for (const Z of corrZones()) if (x > Z.x0 && x < Z.x1 && z > Z.z0 && z < Z.z1) return Z;
  return null;
}
// (a function, not a const: corrFitTwins runs from 01_core.js before this file's constants exist)
function corrState() {
  return corrState.s || (corrState.s = { twins: [], narrowed: 0, shared: 0 }); // twins: [roadA, roadB] (the rows: indices are not final yet)
}
/** 1 + 2: called at load (01_core.js), after the widening and the narrowing to the gap between buildings */
function corrFitTwins() {
  const R = DATA.R,
    CORR = corrState(),
    cl = (v, a, b) => Math.max(a, Math.min(b, v)); // (clamp is not defined yet when this runs)
  const cand = R.filter(
    (r) => r[0] >= 2 && r[0] <= 11 && r[3] & 1 && !(r[3] & (32 | 6)) && corrMid(r) && inCorr(...corrMid(r)) && inCorr(...corrMid(r)).twins !== false
  );
  const dirAt = (c, i) => {
    const j = Math.min(i, c.length - 4),
      dx = c[j + 2] - c[j],
      dz = c[j + 3] - c[j + 1],
      l = Math.hypot(dx, dz) || 1;
    return [dx / l, dz / l];
  };
  const seen = new Set();
  for (const a of cand) {
    const ca = a[4];
    for (const b of cand) {
      if (a === b || seen.has(b)) continue;
      const cb = b[4];
      // a short connecting piece (the turn at the end of a loop) is not half of a dual road: the halves run side by side
      const len = (c) => {
        let L = 0;
        for (let k = 2; k < c.length; k += 2) L += Math.hypot(c[k] - c[k - 2], c[k + 1] - c[k - 1]);
        return L;
      };
      if (len(ca) < 18 || len(cb) < 18) continue;
      // samples of a: how many have b running the other way within 14 m
      let n = 0,
        hit = 0;
      const dists = [];
      for (let i = 0; i + 3 < ca.length; i += 2) {
        const L = Math.hypot(ca[i + 2] - ca[i], ca[i + 3] - ca[i + 1]),
          [tx, tz] = dirAt(ca, i);
        for (let u = 0; u <= L; u += 3) {
          const x = ca[i] + tx * u,
            z = ca[i + 1] + tz * u;
          n++;
          for (let k = 0; k + 3 < cb.length; k += 2) {
            const ex = cb[k + 2] - cb[k],
              ez = cb[k + 3] - cb[k + 1],
              L2 = ex * ex + ez * ez || 1,
              t = cl(((x - cb[k]) * ex + (z - cb[k + 1]) * ez) / L2, 0, 1),
              d = Math.hypot(x - cb[k] - ex * t, z - cb[k + 1] - ez * t);
            if (d < 14 && (ex * tx + ez * tz) / Math.sqrt(L2) < -0.75) {
              hit++;
              dists.push(d);
              break;
            }
          }
        }
      }
      if (n < 3 || hit < n * 0.5) continue;
      dists.sort((p, q) => p - q);
      CORR.twins.push([a, b, dists[Math.floor(dists.length / 2)] || 0]); // (+ the usual distance between their axes)
      seen.add(a);
      for (const r of [a, b]) {
        const lanes = corrLanes(r),
          w = Math.max(4.2, lanes * 3.5 + 1.0);
        if (r[2] > w + 0.1) {
          r[2] = Math.round(w * 10) / 10;
          CORR.narrowed++;
        }
      }
    }
  }
  // v1.2.0 (Jonay, boca sur de San Honorato, X −908, Y 47: «la línea continua está a un lado y en el túnel en el otro»):
  // the pieces that carry on a narrowed half (the tunnel, the ramp before it: one-way, same kind of road, no sharp turn)
  // take its width, so its lines go on straight instead of jumping where the OSM splits the way
  const K2 = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    starts = new Map(),
    ends = new Map();
  for (const r of R) {
    if (r[0] > 11 || !(r[3] & 1) || r[3] & 32) continue;
    const c = r[4];
    if (c.length < 4) continue;
    (starts.get(K2(c[0], c[1])) || starts.set(K2(c[0], c[1]), []).get(K2(c[0], c[1]))).push(r);
    (
      ends.get(K2(c[c.length - 2], c[c.length - 1])) || ends.set(K2(c[c.length - 2], c[c.length - 1]), []).get(K2(c[c.length - 2], c[c.length - 1]))
    ).push(r);
  }
  const unit = (x, z) => {
    const l = Math.hypot(x, z) || 1;
    return [x / l, z / l];
  };
  CORR.chained = 0;
  for (const [a, b] of CORR.twins)
    for (const r0 of [a, b]) {
      const w = r0[2];
      for (const fwd of [true, false]) {
        let r = r0,
          run = 0;
        const seenC = new Set([r0]);
        while (run < 400) {
          const c = r.length ? r[4] : null,
            n = c.length;
          const k = fwd ? K2(c[n - 2], c[n - 1]) : K2(c[0], c[1]),
            d0 = fwd ? unit(c[n - 2] - c[n - 4], c[n - 1] - c[n - 3]) : unit(c[2] - c[0], c[3] - c[1]);
          const next = (fwd ? starts : ends).get(k) || [];
          let pick = null;
          for (const q of next) {
            if (seenC.has(q) || q[0] !== r0[0]) continue;
            const cq = q[4],
              m = cq.length,
              d1 = fwd ? unit(cq[2] - cq[0], cq[3] - cq[1]) : unit(cq[m - 2] - cq[m - 4], cq[m - 1] - cq[m - 3]);
            if (d0[0] * d1[0] + d0[1] * d1[1] > 0.77) pick = pick ? null : q; // (only where the way goes on alone, not at a fork)
          }
          if (!pick) break;
          seenC.add(pick);
          if (pick[2] > w + 0.1) {
            pick[2] = w;
            CORR.chained++;
          }
          const cp = pick[4];
          for (let k2 = 2; k2 < cp.length; k2 += 2) run += Math.hypot(cp[k2] - cp[k2 - 2], cp[k2 + 1] - cp[k2 - 1]);
          r = pick;
        }
      }
    }
  console.log('corredores: mitades de vía desdoblada', CORR.twins.length, 'estrechadas', CORR.narrowed, 'continuaciones', CORR.chained);
  corrMergeHalves();
  corrWidenBridges();
}
/** v1.2.0 (Jonay: «el de Camino San Lázaro… en realidad es mucho más sencillo, es un puente con aceras a los lados»):
 *  the short street bridges over the trench of an open zone get room for a pavement on each side */
function corrWidenBridges() {
  const CORR = corrState();
  CORR.bridges = CORR.bridges || new Set();
  for (const r of DATA.R) {
    if (!(r[3] & 2) || r[3] & 32 || r[0] < 2 || r[0] > 11 || (CORR.bridgeSide && CORR.bridgeSide.has(r))) continue;
    const m = corrMid(r),
      Z = m && inCorr(m[0], m[1]);
    if (!Z || !Z.open) continue;
    let L = 0;
    for (let k = 2; k < r[4].length; k += 2) L += Math.hypot(r[4][k] - r[4][k - 2], r[4][k + 1] - r[4][k - 1]);
    if (L > 80) continue;
    r[2] = Math.round((r[2] + 2 * 1.9) * 10) / 10;
    CORR.bridges.add(r);
  }
}
/** v1.2.0 (Jonay, 9-nov, TF-5 de Lora Tamayo a Guajara: «esta parte de la autopista está fatal, es mucho más recta… las
 *  marcas viales y las separaciones»; «ve por tramos hasta donde puedas»): the OSM draws each direction of the TF-5 as a
 *  string of pieces whose points wander a few metres (and the separations pushed them further), with widths that jump
 *  between 13.4, 14.8 and 18.5 m: the edge lines zigzag and overlap. Here, along the stretches listed, both directions
 *  get ONE smooth axis (the middle between them, averaged over ±60 m), each carriageway is put at its side of it at a
 *  fixed distance (half its width + half the New Jersey median) and gets one width. Every copy of a moved point (the
 *  slip roads that start there, the traffic graph) moves with it; at both ends of the stretch it fades back. */
function corrMotorwayStretches() {
  return [
    // tramo 1: Lora Tamayo – Puente de Guajara – HUC (Pabellón Santiago Martín)
    {
      name: 'Lora Tamayo – HUC – Santa Cruz',
      boxes: [
        { x0: -60, x1: 1340, z0: 1060, z1: 2620 },
        { x0: 1280, x1: 2140, z0: 2540, z1: 3470 },
        // v1.2.9: and on past the HUC towards Santa Cruz, to the edge of the map
        { x0: 1950, x1: 2450, z0: 3400, z1: 4330 }
      ],
      W: 13.4,
      MED: 2.4
    }
  ];
}
function corrMotorwayStraighten() {
  const R = DATA.R,
    CORR = corrState(),
    sm = (a, b, x) => {
      const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
  CORR.autopista = [];
  for (const T of corrMotorwayStretches()) {
    const inB = (x, z) => T.boxes.some((B) => x > B.x0 && x < B.x1 && z > B.z0 && z < B.z1);
    const pieces = [];
    R.forEach((r, ri) => {
      if (r[0] !== 0 || !(r[3] & 1) || r[3] & 4) return;
      const c = r[4];
      let k = 0;
      for (let i = 0; i < c.length; i += 2) if (inB(c[i], c[i + 1])) k++;
      if (k) pieces.push({ r, ri, inside: k / (c.length / 2) });
    });
    // v1.2.4: only the motorway of the stretch (its most common name). The Autovía de Interconexión (TF-2), which
    // leaves the TF-5 in Guajara, also fell in the box: its points pulled the axis 100 m to one side right under the
    // Guajara bridge, and both carriageways got a 9 m jog there (Jonay: «los ramales que se cruzan»)
    {
      const byName = new Map();
      for (const p of pieces) byName.set(p.r[1], (byName.get(p.r[1]) || 0) + p.r[4].length);
      let main = null,
        bestN = -1;
      for (const [k, v] of byName)
        if (v > bestN) {
          bestN = v;
          main = k;
        }
      for (let i = pieces.length - 1; i >= 0; i--) if (pieces[i].r[1] !== main && pieces[i].r[1] >= 0) pieces.splice(i, 1);
    }
    if (pieces.length < 2) continue;
    // the main direction of the stretch: from the first box's corner to the last one's (it runs SW→NE here)
    const pts = [];
    for (const p of pieces) {
      const c = p.r[4];
      for (let i = 0; i + 3 < c.length; i += 2) {
        const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]) || 1;
        for (let u = 0; u < L; u += 4) {
          const x = c[i] + ((c[i + 2] - c[i]) * u) / L,
            z = c[i + 1] + ((c[i + 3] - c[i + 1]) * u) / L;
          if (inB(x, z)) pts.push([x, z, (c[i + 2] - c[i]) / L, (c[i + 3] - c[i + 1]) / L, p]);
        }
      }
    }
    // principal direction (from the spread of the points)
    let mx = 0,
      mz = 0;
    for (const q of pts) {
      mx += q[0];
      mz += q[1];
    }
    mx /= pts.length;
    mz /= pts.length;
    let sxx = 0,
      sxz = 0,
      szz = 0;
    for (const q of pts) {
      sxx += (q[0] - mx) ** 2;
      sxz += (q[0] - mx) * (q[1] - mz);
      szz += (q[1] - mz) ** 2;
    }
    const ang = 0.5 * Math.atan2(2 * sxz, sxx - szz),
      ux = Math.cos(ang),
      uz = Math.sin(ang);
    // the two directions: along +u or against it
    const A = pts.filter((q) => q[2] * ux + q[3] * uz > 0.3),
      Bq = pts.filter((q) => q[2] * ux + q[3] * uz < -0.3);
    if (!A.length || !Bq.length) continue;
    // middle points: each A sample with the nearest B sample (within 40 m)
    const G = new Map(),
      gk = (x, z) => Math.floor(x / 20) * 100003 + Math.floor(z / 20);
    for (const q of Bq) {
      const k = gk(q[0], q[1]);
      let l = G.get(k);
      if (!l) G.set(k, (l = []));
      l.push(q);
    }
    const mids = [];
    for (const a of A) {
      let best = null,
        bd = 40;
      const i0 = Math.floor(a[0] / 20),
        j0 = Math.floor(a[1] / 20);
      for (let i = i0 - 2; i <= i0 + 2; i++)
        for (let j = j0 - 2; j <= j0 + 2; j++)
          for (const b of G.get(i * 100003 + j) || []) {
            const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
            if (d < bd) {
              bd = d;
              best = b;
            }
          }
      if (best) mids.push([(a[0] + best[0]) / 2, (a[1] + best[1]) / 2]);
    }
    if (mids.length < 10) continue;
    mids.sort((p, q) => (p[0] - mx) * ux + (p[1] - mz) * uz - ((q[0] - mx) * ux + (q[1] - mz) * uz));
    // smooth: the mean of the middle points within ±60 m along the stretch, every 8 m
    const tOf = (p) => (p[0] - mx) * ux + (p[1] - mz) * uz,
      t0 = tOf(mids[0]),
      t1 = tOf(mids[mids.length - 1]),
      axis = [];
    for (let t = t0; t <= t1; t += 8) {
      let sx = 0,
        sz = 0,
        n = 0;
      for (const p of mids) {
        const tp = tOf(p);
        if (Math.abs(tp - t) > 60) continue;
        const w = 1 - Math.abs(tp - t) / 61;
        sx += p[0] * w;
        sz += p[1] * w;
        n += w;
      }
      if (n) axis.push([sx / n, sz / n]);
    }
    if (axis.length < 4) continue;
    // a second pass of smoothing on the axis itself (no kinks)
    for (let pass = 0; pass < 4; pass++)
      for (let i = 1; i + 1 < axis.length; i++)
        axis[i] = [(axis[i - 1][0] + 2 * axis[i][0] + axis[i + 1][0]) / 4, (axis[i - 1][1] + 2 * axis[i][1] + axis[i + 1][1]) / 4];
    const cum = [0];
    for (let i = 1; i < axis.length; i++) cum.push(cum[i - 1] + Math.hypot(axis[i][0] - axis[i - 1][0], axis[i][1] - axis[i - 1][1]));
    const S = cum[cum.length - 1];
    const proj = (x, z) => {
      let best = null;
      for (let i = 0; i + 1 < axis.length; i++) {
        const ex = axis[i + 1][0] - axis[i][0],
          ez = axis[i + 1][1] - axis[i][1],
          L2 = ex * ex + ez * ez || 1,
          t = Math.max(0, Math.min(1, ((x - axis[i][0]) * ex + (z - axis[i][1]) * ez) / L2)),
          px = axis[i][0] + ex * t,
          pz = axis[i][1] + ez * t,
          d = Math.hypot(x - px, z - pz);
        if (!best || d < best.d) {
          const L = Math.sqrt(L2);
          best = { d, px, pz, nx: -ez / L, nz: ex / L, s: cum[i] + L * t, side: (x - px) * (-ez / L) + (z - pz) * (ex / L) };
        }
      }
      return best;
    };
    // the side of each direction (where it runs now, on average)
    let sideA = 0;
    for (const a of A) sideA += Math.sign(proj(a[0], a[1]).side);
    sideA = Math.sign(sideA) || 1;
    const off = T.W / 2 + T.MED / 2,
      shifts = new Map(),
      key = (x, z) => x + ',' + z;
    let moved = 0;
    for (const p of pieces) {
      const c = p.r[4],
        n = c.length / 2;
      const dirA = (c[c.length - 2] - c[0]) * ux + (c[c.length - 1] - c[1]) * uz > 0,
        sg = dirA ? sideA : -sideA;
      for (let v = 0; v < n; v++) {
        const x = c[v * 2],
          z = c[v * 2 + 1];
        if (shifts.has(key(x, z))) continue;
        const q = proj(x, z);
        if (!q || q.d > 30) continue;
        const f = sm(0, 60, q.s) * sm(0, 60, S - q.s) * (inB(x, z) ? 1 : 0);
        if (f <= 0) continue;
        const tx = q.px + q.nx * sg * off,
          tz = q.pz + q.nz * sg * off;
        shifts.set(key(x, z), [Math.round((x + (tx - x) * f) * 100) / 100, Math.round((z + (tz - z) * f) * 100) / 100]);
        moved++;
      }
      if (p.inside > 0.5) p.r[2] = T.W;
    }
    const mv = (arr) => {
      for (let i = 0; i + 1 < arr.length; i += 2) {
        const o = shifts.get(key(arr[i], arr[i + 1]));
        if (o) {
          arr[i] = o[0];
          arr[i + 1] = o[1];
        }
      }
    };
    for (const r of R) mv(r[4]);
    mv(DATA.G.n);
    for (const e of DATA.G.e) if (e[6]) mv(e[6]);
    // the slip lanes that run alongside (accel / decel lanes, «carriles de aceleración… son líneas discontinuas solo»):
    // their points close to the motorway go to a lane right beside it, parallel; further out they blend back to their
    // own line, so the lane opens out smoothly towards its roundabout
    const pieceSet = new Set(pieces.map((p) => p.r)),
      sh2 = new Map();
    CORR.paraLinks = CORR.paraLinks || new Set();
    CORR.paraSegs = CORR.paraSegs || [];
    R.forEach((r) => {
      if (r[0] !== 1 || !(r[3] & 1) || r[3] & 6 || pieceSet.has(r)) return;
      const c = r[4],
        n = c.length / 2,
        want = off + T.W / 2 + r[2] / 2 + 0.1,
        flags = [];
      for (let v = 0; v < n; v++) {
        const x = c[v * 2],
          z = c[v * 2 + 1];
        flags.push(false);
        if (!inB(x, z) || sh2.has(key(x, z))) continue;
        const q = proj(x, z);
        if (!q || q.s < 40 || q.s > S - 40) continue;
        // parallel to the axis here?
        const p0 = Math.max(0, v - 1),
          p1 = Math.min(n - 1, v + 1),
          dx = c[p1 * 2] - c[p0 * 2],
          dz = c[p1 * 2 + 1] - c[p0 * 2 + 1],
          dl = Math.hypot(dx, dz) || 1;
        if (Math.abs((dx * q.nz - dz * q.nx) / dl) < 0.94) continue; // (the axis direction is (nz, −nx))
        const d0 = Math.abs(q.side);
        if (d0 < off + 1) continue; // (a point on the carriageway itself: where it leaves it)
        const k = d0 < want + 3 ? 1 : d0 < want + 9 ? 1 - (d0 - want - 3) / 6 : 0;
        if (k <= 0) continue;
        const sg = Math.sign(q.side),
          tx = q.px + q.nx * sg * want,
          tz = q.pz + q.nz * sg * want;
        sh2.set(key(x, z), [
          Math.round((x + (tx - x) * k) * 100) / 100,
          Math.round((z + (tz - z) * k) * 100) / 100,
          k === 1 ? -q.nx * sg : 0,
          k === 1 ? -q.nz * sg : 0
        ]);
        flags[v] = k === 1;
      }
      let par = 0;
      for (let v = 0; v + 1 < n; v++) if (flags[v] && flags[v + 1]) par++;
      if (par >= 2) {
        CORR.paraLinks.add(r);
        // the gores: where the parallel run ends and the slip lane leaves the motorway, the triangle between them gets
        // the white chevrons (Jonay's photos of the TF-5: «cebreado en V»)
        CORR.gores = CORR.gores || [];
        for (let v = 0; v < n; v++) {
          if (!flags[v]) continue;
          for (const w of [v - 1, v + 1]) {
            if (w < 0 || w >= n || flags[w]) continue;
            const x = c[v * 2],
              z = c[v * 2 + 1],
              q = proj(x, z),
              qn = proj(c[w * 2], c[w * 2 + 1]);
            if (!q || !qn || Math.abs(qn.side) < want + 1.5) continue; // (that end joins the motorway: no gore)
            const sg = Math.sign(q.side),
              tx = q.nz,
              tz = -q.nx,
              ds = (c[w * 2] - x) * tx + (c[w * 2 + 1] - z) * tz,
              L = Math.max(8, Math.min(40, Math.abs(ds))),
              gap = Math.abs(qn.side) - want;
            CORR.gores.push([
              q.px + q.nx * sg * (off + T.W / 2),
              q.pz + q.nz * sg * (off + T.W / 2),
              tx * Math.sign(ds || 1),
              tz * Math.sign(ds || 1),
              q.nx * sg,
              q.nz * sg,
              L,
              Math.min(gap, 9)
            ]);
          }
        }
      }
    });
    const mv2 = (arr) => {
      for (let i = 0; i + 1 < arr.length; i += 2) {
        const o = sh2.get(key(arr[i], arr[i + 1]));
        if (o) {
          arr[i] = o[0];
          arr[i + 1] = o[1];
        }
      }
    };
    // the boundary between the motorway and each parallel stretch of slip lane (a dashed line is painted there)
    R.forEach((r) => {
      if (!CORR.paraLinks.has(r)) return;
      const c = r[4];
      for (let i = 0; i + 3 < c.length; i += 2) {
        const a = sh2.get(key(c[i], c[i + 1])),
          b = sh2.get(key(c[i + 2], c[i + 3]));
        if (a && b && a[2] && b[2]) CORR.paraSegs.push([a[0], a[1], b[0], b[1], a[2], a[3], r[2]]);
      }
    });
    for (const r of R) mv2(r[4]);
    mv2(DATA.G.n);
    for (const e of DATA.G.e) if (e[6]) mv2(e[6]);
    CORR.autopista.push({
      tramo: T.name,
      trozos: pieces.length,
      puntos: moved,
      eje: Math.round(S),
      lado: sideA,
      ramales: CORR.paraLinks.size,
      tramosParalelos: CORR.paraSegs.length
    });
  }
  console.log('corredores: autopista recta', JSON.stringify(CORR.autopista));
}
/** v1.2.0 (Jonay, TF-5 pasado el puente de San Lázaro: «cosas raras en la mediana y en mitad de la autopista, falta
 *  separación con la Carretera General»): around the open zones the OSM draws the slip lanes of the TF-5 only 7–9 m from
 *  its axis (they overlapped 2–4 m of the motorway) and the Carretera General overlapping them. Each slip lane goes right
 *  beside the motorway (an extra lane), and the Carretera General keeps a 3.5 m green strip beyond. Every copy of a
 *  moved point (other roads, the traffic graph) moves with it. */
function corrSideLanes() {
  const R = DATA.R,
    near = () => true, // (v1.2.0, Jonay: «antes del puente de Guajara la autopista está fatal», Lora Tamayo…: all along the motorways)
    shifts = new Map(),
    key = (x, z) => x + ',' + z;
  const pass = (moving, fixed, gap, share = 1) => {
    const F = [];
    R.forEach((r) => {
      if (!fixed(r)) return;
      const c = r[4];
      for (let i = 0; i + 3 < c.length; i += 2) if (near(c[i], c[i + 1])) F.push([c[i], c[i + 1], c[i + 2], c[i + 3], r]);
    });
    let n = 0;
    R.forEach((r) => {
      if (!moving(r)) return;
      const c = r[4],
        m = c.length / 2;
      const ends = [
        [c[0], c[1]],
        [c[c.length - 2], c[c.length - 1]]
      ];
      for (let v = 0; v < m; v++) {
        const x = c[v * 2],
          z = c[v * 2 + 1];
        if (!near(x, z) || shifts.has(key(x, z))) continue;
        const p = Math.max(0, v - 1),
          q = Math.min(m - 1, v + 1);
        let dx = c[q * 2] - c[p * 2],
          dz = c[q * 2 + 1] - c[p * 2 + 1];
        const dl = Math.hypot(dx, dz) || 1;
        dx /= dl;
        dz /= dl;
        let best = null;
        for (const g of F) {
          if (g[4] === r) continue;
          const ex = g[2] - g[0],
            ez = g[3] - g[1],
            L2 = ex * ex + ez * ez || 1,
            L = Math.sqrt(L2),
            t = ((x - g[0]) * ex + (z - g[1]) * ez) / L2;
          if (t <= 0 || t >= 1 || Math.abs((dx * ex + dz * ez) / L) < 0.94) continue;
          const px = g[0] + ex * t,
            pz = g[1] + ez * t,
            d = Math.hypot(x - px, z - pz);
          if (d < 0.5) continue; // (a shared node: where it joins)
          const need = (r[2] + g[4][2]) / 2 + gap - d;
          if (need <= 0.1 || need > 9) continue;
          if (!best || need > best.need) best = { need, ux: (x - px) / d, uz: (z - pz) / d };
        }
        if (!best) continue;
        // fade towards the ends of the moving road that join the fixed one (the slip lane leaves from its edge)
        let de = 1e9;
        for (const e of ends)
          if (
            F.some(
              (g) => (Math.abs(g[0] - e[0]) < 0.3 && Math.abs(g[1] - e[1]) < 0.3) || (Math.abs(g[2] - e[0]) < 0.3 && Math.abs(g[3] - e[1]) < 0.3)
            )
          )
            de = Math.min(de, Math.hypot(x - e[0], z - e[1]));
        const f = clamp((de - 8) / 40, 0, 1);
        if (f <= 0) continue;
        shifts.set(key(x, z), [best.ux * best.need * f * share, best.uz * best.need * f * share]);
        n++;
      }
    });
    // apply to every copy
    const mv = (arr) => {
      for (let i = 0; i + 1 < arr.length; i += 2) {
        const o = shifts.get(key(arr[i], arr[i + 1]));
        if (o) {
          arr[i] += o[0];
          arr[i + 1] += o[1];
        }
      }
    };
    for (const r of R) mv(r[4]);
    mv(DATA.G.n);
    for (const e of DATA.G.e) if (e[6]) mv(e[6]);
    shifts.clear();
    return n;
  };
  const a = pass(
    (r) => r[0] === 1,
    (r) => r[0] === 0,
    0.1
  );
  const b = pass(
    (r) => r[0] >= 3 && r[0] <= 7 && !(r[3] & 6),
    (r) => r[0] <= 1,
    3.5
  );
  // (v1.2.1, enlace de Guajara: two slip roads drawn one over the other, side by side: each goes half the way apart)
  const c2 = pass(
    (r) => r[0] === 1,
    (r) => r[0] === 1,
    0.3,
    0.5
  );
  console.log('corredores: ramales apartados entre sí', c2);
  console.log('corredores: carriles laterales de la TF-5', a, 'puntos; Carretera General apartada', b);
}
/** v1.2.3 (Jonay, fotos del Puente de Guajara): the OSM draws some street bridges as two one-way halves side by side and
 *  their pavements as two loose footbridges; in reality each is ONE bridge, two lanes each way with a pavement on each
 *  side. In these boxes the two halves become one two-way deck along the middle (the traffic keeps its two lines, both
 *  inside the deck) and the loose footbridges go. */
function corrMergeBridgeTwins() {
  const boxes = [
      [880, 2120, 1360, 2660], // Guajara
      [-60, 1150, 420, 1520] // Lora Tamayo – Cruz de Piedra
    ],
    inB = (x, z) => boxes.some((b) => x > b[0] && x < b[2] && z > b[1] && z < b[3]),
    R = DATA.R,
    CORR = corrState(),
    mid = (r) => {
      // v1.2.4: the middle by length (with 2 or 3 points the «middle point» was one end: the Guajara halves were 16.6 m
      // apart that way and were never joined)
      const c = r[4];
      let L = 0;
      for (let k = 2; k < c.length; k += 2) L += Math.hypot(c[k] - c[k - 2], c[k + 1] - c[k - 1]);
      let acc = 0;
      for (let k = 2; k < c.length; k += 2) {
        const l = Math.hypot(c[k] - c[k - 2], c[k + 1] - c[k - 1]);
        if (acc + l >= L / 2 && l > 0) {
          const t = (L / 2 - acc) / l;
          return [c[k - 2] + (c[k] - c[k - 2]) * t, c[k - 1] + (c[k + 1] - c[k - 1]) * t];
        }
        acc += l;
      }
      return [c[0], c[1]];
    },
    len = (c) => {
      let L = 0;
      for (let k = 2; k < c.length; k += 2) L += Math.hypot(c[k] - c[k - 2], c[k + 1] - c[k - 1]);
      return L;
    };
  CORR.bridges = CORR.bridges || new Set();
  CORR.puentesUnidos = [];
  CORR.bridgeSide = CORR.bridgeSide || new Map();
  const shift = new Map(),
    key = (x, z) => x + ',' + z;
  const cand = R.filter((r) => r[3] & 2 && r[3] & 1 && r[0] >= 2 && r[0] <= 9 && inB(...mid(r)));
  const used = new Set();
  for (const a of cand) {
    if (used.has(a)) continue;
    const ca = a[4],
      da = [ca[ca.length - 2] - ca[0], ca[ca.length - 1] - ca[1]],
      ma = mid(a);
    let b = null;
    for (const q of cand) {
      if (q === a || used.has(q)) continue;
      const cq = q[4],
        dq = [cq[cq.length - 2] - cq[0], cq[cq.length - 1] - cq[1]],
        mq = mid(q),
        cos = (da[0] * dq[0] + da[1] * dq[1]) / (Math.hypot(...da) * Math.hypot(...dq) || 1);
      if (cos < -0.85 && Math.hypot(ma[0] - mq[0], ma[1] - mq[1]) < 22 && Math.abs(len(ca) - len(cq)) < 0.5 * len(ca) + 10) b = q;
    }
    if (!b) continue;
    used.add(a).add(b);
    // v1.2.4: the two halves stay as they are (each one way, each with its own deck: one middle line had its ends away
    // from the junctions, the approaches were no longer lifted and the deck became a hump the cars fell off). They are
    // moved towards each other until their inner edges touch, each one 1.9 m wider on its outer side for the pavement.
    // Every copy of a moved point (approach roads, traffic graph) moves with it.
    const mb = mid(b),
      L = Math.hypot(...da) || 1,
      nx = -da[1] / L,
      nz = da[0] / L,
      gap = Math.abs((ma[0] - mb[0]) * nx + (ma[1] - mb[1]) * nz),
      move = (gap - (a[2] + b[2]) / 2) / 2 - 0.95 - 0.05;
    if (move < 0 || move > 8) {
      CORR.puentesUnidos.push(['no', R.indexOf(a), R.indexOf(b), +gap.toFixed(1), a[2], b[2]]);
      continue;
    }
    for (const [r, o] of [
      [a, mb],
      [b, ma]
    ]) {
      const m = mid(r),
        sg = Math.sign((o[0] - m[0]) * nx + (o[1] - m[1]) * nz),
        c = r[4];
      for (let i = 0; i < c.length; i += 2)
        if (!shift.has(key(c[i], c[i + 1])))
          shift.set(key(c[i], c[i + 1]), [Math.round((c[i] + nx * sg * move) * 100) / 100, Math.round((c[i + 1] + nz * sg * move) * 100) / 100]);
      r[2] = Math.round((r[2] + 1.9) * 10) / 10;
      // the outer side, in corrBridgeSidewalks' terms (its normal is (−tz, tx) of the road's own direction)
      const cd = [c[c.length - 2] - c[0], c[c.length - 1] - c[1]],
        own = Math.sign(-cd[1] * nx + cd[0] * nz) || 1;
      CORR.bridgeSide.set(r, -sg * own);
      CORR.bridges.add(r);
    }
    // the loose footbridges along it
    const mm = [(ma[0] + mb[0]) / 2, (ma[1] + mb[1]) / 2];
    let fb = 0;
    for (const r of R) {
      if (r[0] < 13 || !(r[3] & 2)) continue;
      const m = mid(r);
      if (Math.hypot(m[0] - mm[0], m[1] - mm[1]) < 20) {
        r[4] = [r[4][0], r[4][1], r[4][0] + 0.01, r[4][1]];
        r[3] = r[3] & ~2;
        fb++;
      }
    }
    CORR.puentesUnidos.push([R.indexOf(a), R.indexOf(b), +move.toFixed(2), fb]);
  }
  const mv = (arr) => {
    for (let i = 0; i + 1 < arr.length; i += 2) {
      const o = shift.get(key(arr[i], arr[i + 1]));
      if (o) {
        arr[i] = o[0];
        arr[i + 1] = o[1];
      }
    }
  };
  if (shift.size) {
    for (const r of R) mv(r[4]);
    mv(DATA.G.n);
    for (const e of DATA.G.e) if (e[6]) mv(e[6]);
  }
  console.log('corredores: puentes de dos mitades juntados', JSON.stringify(CORR.puentesUnidos));
}
/** the two pavements of such a bridge (1.9 m, a kerb), on its deck */
function corrBridgeSidewalks(c, w, hf, rd) {
  const side = rd && corrState().bridgeSide ? corrState().bridgeSide.get(rd) : 0; // v1.2.4: a joined half has it on its outer side only
  const S = acc(c[0], c[1], 'sidewalk'),
    K = acc(c[0], c[1], 'trim'),
    kc = [0.7, 0.69, 0.66],
    z4 = [0, 0];
  let s = 0;
  for (let i = 0; i + 3 < c.length; i += 2) {
    const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]) || 1,
      tx = (c[i + 2] - c[i]) / L,
      tz = (c[i + 3] - c[i + 1]) / L,
      nx = -tz,
      nz = tx,
      n = Math.max(1, Math.ceil(L / 2));
    for (let k = 0; k < n; k++) {
      const u0 = (L * k) / n,
        u1 = (L * (k + 1)) / n;
      for (const sg of side ? [side] : [1, -1]) {
        const P = (u, o) => {
          const x = c[i] + tx * u + nx * o * sg,
            z = c[i + 1] + tz * u + nz * o * sg;
          return [x, hf(s + u, x, z) + YOFF.asphalt + 0.15, z];
        };
        const a0 = P(u0, w / 2 - 0.05),
          b0 = P(u1, w / 2 - 0.05),
          a1 = P(u0, w / 2 - 1.9),
          b1 = P(u1, w / 2 - 1.9);
        S.quad(
          a0,
          b0,
          b1,
          a1,
          [a0[0] / 2, a0[2] / 2],
          [b0[0] / 2, b0[2] / 2],
          [b1[0] / 2, b1[2] / 2],
          [a1[0] / 2, a1[2] / 2],
          null,
          undefined,
          [0, 1, 0]
        );
        K.quad(a1, b1, [b1[0], b1[1] - 0.17, b1[2]], [a1[0], a1[1] - 0.17, a1[2]], z4, z4, z4, z4, kc, undefined, [-nx * sg, 0, -nz * sg]);
        // the old stone balustrade (Street View): a low wall, a rail on top and stout posts
        const st = [0.48, 0.44, 0.38],
          o0 = P(u0, w / 2 + 0.25),
          o1 = P(u1, w / 2 + 0.25),
          up = (p, h) => [p[0], p[1] + h, p[2]];
        K.quad(a0, b0, up(b0, 0.35), up(a0, 0.35), z4, z4, z4, z4, st, undefined, [-nx * sg, 0, -nz * sg]);
        K.quad(o1, o0, up(o0, 0.35), up(o1, 0.35), z4, z4, z4, z4, st, undefined, [nx * sg, 0, nz * sg]);
        K.quad(up(a0, 0.85), up(b0, 0.85), up(b0, 1.05), up(a0, 1.05), z4, z4, z4, z4, st, undefined, [-nx * sg, 0, -nz * sg]);
        K.quad(up(o1, 0.85), up(o0, 0.85), up(o0, 1.05), up(o1, 1.05), z4, z4, z4, z4, st, undefined, [nx * sg, 0, nz * sg]);
        K.quad(up(a0, 1.05), up(b0, 1.05), up(o1, 1.05), up(o0, 1.05), z4, z4, z4, z4, st, undefined, [0, 1, 0]);
        for (const u of [u0, (u0 + u1) / 2]) {
          const pa = P(u, w / 2 - 0.02),
            pb = P(u + 0.22, w / 2 - 0.02);
          K.quad(up(pa, 0.35), up(pb, 0.35), up(pb, 0.85), up(pa, 0.85), z4, z4, z4, z4, st, undefined, [-nx * sg, 0, -nz * sg]);
        }
      }
    }
    s += L;
  }
}
/** v1.2.0 (Jonay, San Honorato, con Street View: «es de doble sentido»; «la acera hecha trozos… esos saltos nunca»): where
 *  the OSM draws a two-way road that splits into its two one-way halves (the bajada of Camino el Vallado: 1767 into 2373
 *  up and 1638 + 3051 down), the halves are joined back into that one road while they run close (axes under 9 m apart):
 *  the two-way road goes on along the middle, and each half starts (or ends) where they part */
function corrMergeHalves() {
  const R = DATA.R,
    CORR = corrState(),
    near = (x1, z1, x2, z2) => Math.abs(x1 - x2) < 0.3 && Math.abs(z1 - z2) < 0.3,
    ends = (r) => [r[4][0], r[4][1], r[4][r[4].length - 2], r[4][r[4].length - 1]];
  CORR.merged = [];
  for (const [a, b] of CORR.twins.slice()) {
    for (const [up, down] of [
      [a, b],
      [b, a]
    ]) {
      const [ux0, uz0] = ends(up);
      // the two-way road the «up» half starts from
      const T = R.find(
        (r) =>
          r !== up &&
          r[0] >= 2 &&
          r[0] <= 11 &&
          !(r[3] & (1 | 4 | 32)) &&
          (near(ends(r)[2], ends(r)[3], ux0, uz0) || near(ends(r)[0], ends(r)[1], ux0, uz0))
      );
      if (!T) continue;
      // the «down» chain arriving at that node: one-way pieces ending there, back to the twin
      const chain = [];
      let nx = ux0,
        nz = uz0;
      for (let k = 0; k < 4; k++) {
        const q = R.find((r) => r !== up && r !== T && r[3] & 1 && !chain.includes(r) && near(ends(r)[2], ends(r)[3], nx, nz));
        if (!q) break;
        chain.unshift(q);
        [nx, nz] = ends(q);
        if (q === down) break;
      }
      if (!chain.includes(down)) continue;
      const B = [];
      for (const q of chain)
        for (let i = 0; i < q[4].length; i += 2)
          if (!B.length || !near(B[B.length - 2], B[B.length - 1], q[4][i], q[4][i + 1])) B.push(q[4][i], q[4][i + 1]);
      // walk up the «up» half from the node, and find the other half beside it
      const cu = up[4],
        M = [],
        cut = { up: null, down: null };
      let s = 0;
      for (let i = 0; i + 3 < cu.length && !cut.up; i += 2) {
        const L = Math.hypot(cu[i + 2] - cu[i], cu[i + 3] - cu[i + 1]);
        for (let u = i ? 0 : 2; u < L; u += 2) {
          const x = cu[i] + ((cu[i + 2] - cu[i]) * u) / L,
            z = cu[i + 1] + ((cu[i + 3] - cu[i + 1]) * u) / L;
          let best = null;
          for (let k = 0; k + 3 < B.length; k += 2) {
            const ex = B[k + 2] - B[k],
              ez = B[k + 3] - B[k + 1],
              t = Math.max(0, Math.min(1, ((x - B[k]) * ex + (z - B[k + 1]) * ez) / (ex * ex + ez * ez || 1))),
              px = B[k] + ex * t,
              pz = B[k + 1] + ez * t,
              d = Math.hypot(x - px, z - pz);
            if (!best || d < best.d) best = { d, px, pz, k, t };
          }
          if (!best || best.d > 9) {
            cut.up = { i, u, x, z };
            break;
          }
          M.push([(x + best.px) / 2, (z + best.pz) / 2, best]);
        }
        s += L;
      }
      if (M.length < 4 || !cut.up) continue;
      const last = M[M.length - 1];
      // 1. the two-way road goes on up the middle
      const tc = T[4];
      const atEnd = near(tc[tc.length - 2], tc[tc.length - 1], ux0, uz0);
      // (Jonay: «no entiendo por qué tiene ondulaciones si es todo una pieza»): the middle points zigzag (each half has
      // its own kinks); smooth them and keep one every ~4 m
      let P = [[ux0, uz0], ...M.map((m) => [m[0], m[1]])];
      for (let pass = 0; pass < 6; pass++)
        P = P.map((p, i) =>
          i === 0 || i === P.length - 1 ? p : [(P[i - 1][0] + 2 * p[0] + P[i + 1][0]) / 4, (P[i - 1][1] + 2 * p[1] + P[i + 1][1]) / 4]
        );
      const mid = [];
      let run = 0;
      for (let i = 1; i < P.length; i++) {
        run += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
        if (run >= 4 || i === P.length - 1) {
          mid.push([Math.round(P[i][0] * 10) / 10, Math.round(P[i][1] * 10) / 10]);
          run = 0;
        }
      }
      const [mx, mz] = mid[mid.length - 1];
      T[4] = atEnd ? [...tc, ...mid.flat()] : [...mid.slice().reverse().flat(), ...tc];
      // 2. the «up» half starts where they part
      const i0 = cut.up.i;
      up[4] = [mx, mz, ...cu.slice(i0 + 2)];
      if (up[4].length < 4) up[4] = [mx, mz, cut.up.x, cut.up.z];
      // 3. the «down» chain ends there: the pieces wholly inside the merged stretch become dots, the one that is left ends at the middle
      const kb = last[2].k; // segment of B where the halves part
      let acc = 0;
      for (const q of chain) {
        const n = q[4].length;
        const first = acc,
          lastSeg = acc + n - 4; // B indices of this piece's segments (roughly: shared ends are merged)
        if (kb < first) q[4] = [mx, mz, mx + 0.01, mz];
        else if (kb <= lastSeg) q[4] = [...q[4].slice(0, kb - first + 2), mx, mz];
        acc += n - 2;
      }
      CORR.merged.push([R.indexOf(T), R.indexOf(up), ...chain.map((q) => R.indexOf(q)), M.length * 2]);
      break;
    }
  }
  console.log('corredores: mitades unidas en una calle de doble sentido', JSON.stringify(CORR.merged));
}
function corrMid(r) {
  const c = r[4],
    m = (c.length >> 2) << 1;
  return c.length >= 4 ? [c[m], c[m + 1]] : null;
}
/** lanes of one half of a dual road: the OSM's when it says, else 2 on primary/secondary roads and 1 on the rest */
function corrLanes(r) {
  const i = DATA.R.indexOf(r),
    ln = DATA.LN && i >= 0 ? DATA.LN[i] : null;
  if (ln && ln[0] > 0) return Math.max(1, Math.min(4, ln[0]));
  return r[0] <= 5 ? 2 : 1;
}
/** 3: called at the end of computeDepressions (04_world.js): each half takes, point by point, the deeper of its own depth
 *  and its twin's at the same place, so both carriageways go down (and come up) together */
function corrShareDepth() {
  const R = DATA.R,
    CORR = corrState(),
    raw = (d) => (d <= 0 ? 0 : d / 1.12 + 0.5);
  const fOf = (ri) => {
    const fs = DEP.get(ri);
    return fs ? (q) => fs.reduce((m, f) => Math.max(m, f(q)), 0) : null;
  };
  const projS = (c, x, z) => {
    let best = 1e9,
      sb = 0,
      s = 0;
    for (let k = 0; k + 3 < c.length; k += 2) {
      const ex = c[k + 2] - c[k],
        ez = c[k + 3] - c[k + 1],
        L2 = ex * ex + ez * ez || 1,
        L = Math.sqrt(L2),
        t = clamp(((x - c[k]) * ex + (z - c[k + 1]) * ez) / L2, 0, 1),
        d = Math.hypot(x - c[k] - ex * t, z - c[k + 1] - ez * t);
      if (d < best) {
        best = d;
        sb = s + L * t;
      }
      s += L;
    }
    return [best, sb];
  };
  const plans = [];
  for (const [a, b] of CORR.twins) {
    const ia = R.indexOf(a),
      ib = R.indexOf(b);
    if (ia < 0 || ib < 0) continue;
    const fa = fOf(ia),
      fb = fOf(ib);
    if (!fa && !fb) continue;
    for (const [me, other, fMe, fOt] of [
      [ia, ib, fa, fb],
      [ib, ia, fb, fa]
    ]) {
      if (!fOt) continue;
      const c = R[me][4],
        co = R[other][4],
        tab = [];
      let s = 0;
      for (let i = 0; i + 3 < c.length; i += 2) {
        const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]);
        for (let u = (2 - (s % 2)) % 2; u < L; u += 2) {
          const x = c[i] + ((c[i + 2] - c[i]) * u) / (L || 1),
            z = c[i + 1] + ((c[i + 3] - c[i + 1]) * u) / (L || 1),
            [d, so] = projS(co, x, z),
            own = fMe ? fMe(s + u) : 0;
          tab[Math.round((s + u) / 2)] = d < 14 ? Math.max(own, fOt(so)) : own;
        }
        s += L;
      }
      const L = s;
      {
        const [d, so] = projS(co, c[c.length - 2], c[c.length - 1]);
        const own = fMe ? fMe(L) : 0;
        tab[Math.round(L / 2)] = d < 14 ? Math.max(own, fOt(so)) : own;
      }
      for (let i = 0; i < tab.length; i++) if (tab[i] === undefined) tab[i] = tab[i - 1] || 0;
      if (!tab.some((v) => v > raw(0.3))) continue;
      plans.push([
        me,
        (q) => {
          const g = clamp(q, 0, L) / 2,
            i = Math.floor(g);
          return lerp(tab[i], tab[Math.min(i + 1, tab.length - 1)], g - i);
        }
      ]);
    }
  }
  // set them all at the end (each table was made from the depths as they were before)
  for (const [ri, f] of plans) {
    DEP.set(ri, [f]);
    CORR.shared++;
  }
  console.log('corredores: mitades con la misma altura', CORR.shared);
}

/** v1.2.0 (Jonay, San Honorato: «hay como algo entre los carriles»): the extra half-width a sunk half of a dual road
 *  takes towards its twin so that both share one cutting (no strip of ground and no walls left between them) */
function corrCutExtra(ri) {
  const r = DATA.R[ri];
  for (const [a, b, d] of corrState().twins) {
    if (r !== a && r !== b) continue;
    const o = r === a ? b : a;
    return Math.max(0, Math.min(3.5, (d - (r[2] + o[2]) / 2) / 2 + 0.3));
  }
  return 0;
}
/** v1.2.0 (Jonay: «las marcas viales de los alrededores», con las fotos de Google): the ring of a roundabout in the box is
 *  drawn plain (its lane texture came out in loose bits where so many ways overlap) and corrRoundaboutMarks paints it */
function corrPlainRing(rd) {
  if (!(rd[3] & 32)) return false;
  const m = corrMid(rd);
  return !!m && inMarkBox(m[0], m[1]) && (DATA.RB || []).some((r) => Math.hypot(m[0] - r[0], m[1] - r[1]) < r[2] + 8);
}
/** the markings of the roundabouts in the box, as in the photos: a solid line along the island and along the outer edge
 *  (open where each street comes in or goes out), a dashed line between the two lanes of a wide ring, and a zebra crossing
 *  on each street a few metres before the ring (the «ceda» teeth are painted by buildTrafficSigns) */
function corrRoundaboutMarks() {
  const R = DATA.R;
  let n = 0;
  for (const rb of DATA.RB || []) {
    const [cx, cz, Rc] = rb;
    if (!inMarkBox(cx, cz)) continue;
    const W = WIDEN(3, rb[3], 1),
      Ro = Rc + W / 2,
      Ri = Rc - W / 2;
    // the streets that meet the ring: an end of theirs on it
    const arms = [];
    R.forEach((rd, ri) => {
      if (rd[0] > 12 || rd[3] & (32 | 6)) return;
      const c = rd[4];
      for (const [i, sg] of [
        [0, 1],
        [c.length - 2, -1]
      ]) {
        const d = Math.hypot(c[i] - cx, c[i + 1] - cz);
        if (Math.abs(d - Rc) > W / 2 + 2) continue;
        // walk out along the street to a point clear of the ring
        const P = [];
        for (let k = i; k >= 0 && k < c.length; k += 2 * sg) P.push([c[k], c[k + 1]]);
        arms.push({ ri, w: rd[2], P, ang: Math.atan2(c[i + 1] - cz, c[i] - cx), oneway: !!(rd[3] & 1) });
      }
    });
    const line = (x, z, dx, dz, len, wid) => {
      CORR_MARKS.push([3, x, z, dx, dz, len, wid]);
      n++;
    };
    // arcs: inner solid, outer solid with gaps at the arms, middle dashed on a two-lane ring
    const N = Math.max(24, Math.round((2 * Math.PI * Ro) / 1.5));
    for (let k = 0; k < N; k++) {
      const a0 = (k / N) * 2 * Math.PI,
        a1 = ((k + 1) / N) * 2 * Math.PI,
        am = (a0 + a1) / 2,
        tx = -Math.sin(am),
        tz = Math.cos(am);
      const at = (r) => [cx + Math.cos(am) * r, cz + Math.sin(am) * r];
      const seg = (r) => (2 * Math.PI * r) / N + 0.05;
      if (Ri > 2) {
        const [x, z] = at(Ri + 0.35);
        line(x, z, tx, tz, seg(Ri), 0.15);
      }
      const gap = arms.some((A) => {
        let da = Math.abs(am - A.ang);
        if (da > Math.PI) da = 2 * Math.PI - da;
        return da < (A.w / 2 + 1.5) / Ro;
      });
      if (!gap) {
        const [x, z] = at(Ro - 0.35);
        line(x, z, tx, tz, seg(Ro), 0.15);
      }
      if (W >= 8 && k % 2 === 0) {
        const [x, z] = at(Rc);
        line(x, z, tx, tz, seg(Rc) * 0.6, 0.12);
      }
    }
    // zebra crossings on the arms
    for (const A of arms) {
      const P = A.P;
      let pt = null;
      for (let k = 0; k + 1 < P.length && !pt; k++) {
        const [ax, az] = P[k],
          [bx, bz] = P[k + 1],
          L = Math.hypot(bx - ax, bz - az) || 1;
        for (let u = 0; u <= L; u += 0.5) {
          const x = ax + ((bx - ax) * u) / L,
            z = az + ((bz - az) * u) / L;
          if (Math.hypot(x - cx, z - cz) > Ro + 4.5) {
            pt = [x, z, (bx - ax) / L, (bz - az) / L];
            break;
          }
        }
      }
      if (!pt) continue;
      const [x, z, dx, dz] = pt;
      if (!onCarriagewayEarly(x, z, 0) || DEP.has(A.ri)) continue;
      const nx = -dz,
        nz = dx,
        hw = A.w / 2 - 0.3;
      for (let o = -hw + 0.25; o <= hw - 0.25; o += 1.0) line(x + nx * o, z + nz * o, dx, dz, 3.0, 0.5);
    }
  }
  console.log('corredores: marcas de glorietas', n);
}
/** is this row one half of a dual road of the corridor zones? */
function corrIsTwin(rd) {
  return corrState().twins.some((t) => t[0] === rd || t[1] === rd);
}
/** are these two roads the two halves of the same dual road? */
function corrTwins(ri, rj) {
  const a = DATA.R[ri],
    b = DATA.R[rj];
  return corrState().twins.some((t) => (t[0] === a && t[1] === b) || (t[0] === b && t[1] === a));
}

// ============ TRAMOS (v1.2.0, Jonay, 9-nov: «hay que buscar una técnica mejor para las uniones»; «pues hagámoslo así») ============
// Each sunk road used to build its own cutting: its walls, its hole in the terrain and its floor. Where the OSM splits one
// cutting into several ways (the two halves of a dual road, a slip road that joins, the piece before a tunnel mouth) the
// pieces met with a wall across the carriageway, a strip of ground or a gap with the sea showing through. Here all the
// sunk roads of a zone are one piece: the floor, the walls and the hole come from the union of their footprints
// (the distance to the nearest axis minus its half-width, on a 1 m grid; marching squares for the edge), so walls are only
// left on the outside of the union. The covered stretches keep their tube (tunnelRoad), the carriageways their lines.
const CORR_COVER = 6.35;
const CORR_MARKS = [];
/** the box where the roundabouts get their markings redone (San Honorato and the glorieta of C. San Antonio) */
const CORR_MARKBOX = { x0: -1080, x1: -840, z0: -40, z1: 210 };
const inMarkBox = (x, z) =>
  (x > CORR_MARKBOX.x0 && x < CORR_MARKBOX.x1 && z > CORR_MARKBOX.z0 && z < CORR_MARKBOX.z1) ||
  corrZones().some((Z) => Z.open && x > Z.x0 - 60 && x < Z.x1 + 60 && z > Z.z0 - 60 && z < Z.z1 + 60) || // (and around the TF-5 at San Lázaro)
  // (v1.2.0: Lora Tamayo, Guajara, la salida del HUC y la del Padre Anchieta: «las rotondas también están raras»)
  [
    [-60, 1150, 420, 1520],
    [880, 2120, 1360, 2660],
    [1640, 2940, 2120, 3360],
    [-460, 600, -220, 860]
  ].some((b) => x > b[0] && x < b[2] && z > b[1] && z < b[3]); // painted marks with their own height (arrows), drawn by buildTrafficSigns (05j_signals.js)
// (v1.2.0, Street View de Jonay: the cutting is wider than the road: a pavement on one side, a shoulder on the other)
const CORR_SIDE = 1.3,
  CORR_WALL = [0.36, 0.33, 0.3]; // basalt stone, as in the photos // (as tunnelRoad: a stretch is covered from H + 0.35 m below the ground)
/** the sunk roads built by corrBuildTramos (and not by tunnelRoad's open cutting) */
function corrTramoSet() {
  if (corrTramoSet.s) return corrTramoSet.s;
  const S = new Set();
  corrTramoSet.zone = new Map(); // road -> its zone
  for (const ri of DEP.keys()) {
    const rd = DATA.R[ri];
    if (rd[0] > 12 || PED_TUN.has(ri) || TF13.ring.includes(ri) || TF13.tubes.includes(ri) || TF13.app.includes(ri)) continue;
    // (only roads that lie mostly in the zone: the Autopista del Norte passes by at grade with its own cutting far away)
    const c = rd[4];
    let n = 0,
      open = false;
    for (let i = 0; i < c.length; i += 2) {
      const Zp = inCorr(c[i], c[i + 1]);
      if (Zp) n++;
      if (Zp && Zp.open) open = true;
    }
    // (an open zone takes every sunk road that enters it: a piece left out built its own cutting, and the trench of the
    // zone ended against it with a round wall that looked like a tunnel mouth: Jonay, San Lázaro, X −1795, Y −226)
    if (n && (open || n * 2 >= c.length / 2)) {
      S.add(ri);
      let best = null,
        bn = 0;
      for (const Z of corrZones()) {
        if (open && !Z.open) continue;
        let k = 0;
        for (let i = 0; i < c.length; i += 2) if (c[i] > Z.x0 && c[i] < Z.x1 && c[i + 1] > Z.z0 && c[i + 1] < Z.z1) k++;
        if (k > bn) {
          bn = k;
          best = Z;
        }
      }
      corrTramoSet.zone.set(ri, best);
    }
  }
  return (corrTramoSet.s = S);
}
/** the stretches of a sunk road that are a covered tube, as tunnelRoad builds them for the tramos (points every ≤4 m,
 *  a stretch is tube where both its ends are more than CORR_COVER m under the ground): [[s0, s1], …] */
function corrTubeSpans(ri, hf) {
  const c = DATA.R[ri][4],
    P = [];
  let s = 0;
  for (let i = 0; i + 3 < c.length; i += 2) {
    const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]) || 1,
      n = Math.max(1, Math.ceil(L / 4));
    for (let k = 0; k < n; k++) P.push([c[i] + ((c[i + 2] - c[i]) * k) / n, c[i + 1] + ((c[i + 3] - c[i + 1]) * k) / n, s + (L * k) / n]);
    s += L;
  }
  P.push([c[c.length - 2], c[c.length - 1], s]);
  const Z = corrTramoSet.zone && corrTramoSet.zone.get(ri);
  if (Z && Z.open) return []; // (an open trench all along)
  const cov = P.map((p) => heightAt(p[0], p[1]) - hf(p[2], p[0], p[1]) > CORR_COVER),
    out = [];
  for (let i = 0; i + 1 < P.length; i++)
    if (cov[i] && cov[i + 1]) {
      const q = out[out.length - 1];
      if (q && Math.abs(q[1] - P[i][2]) < 0.01) q[1] = P[i + 1][2];
      else out.push([P[i][2], P[i + 1][2]]);
    }
  return out;
}
/** the extra width of a cutting for its pavement (zones with a pavement down the cutting) */
function corrSide(ri) {
  const Z = corrTramoSet.zone && corrTramoSet.zone.get(ri);
  return Z && Z.pave ? CORR_SIDE : 0;
}
/** the options tunnelRoad gets for a road of the tramos */
function corrTunnelOpt(ri) {
  const Z = corrTramoSet.zone.get(ri) || {};
  return { tramo: true, wc: Z.wall || CORR_WALL, cover: Z.open ? 99 : undefined };
}
/** the axis segments (every 2 m) of the sunk roads of the zones, with their floor height and half-width of cutting */
function corrTramoSegs(cache = false) {
  if (cache && corrTramoSegs.cache) return corrTramoSegs.cache;
  const segs = [];
  for (const ri of corrTramoSet()) {
    const rd = DATA.R[ri],
      w = Math.max(rd[2], 2.6),
      r = w / 2 + 1.0 + corrSide(ri) + corrCutExtra(ri),
      hf = depressedHF(ri),
      c = rd[4],
      spans = corrTubeSpans(ri, hf),
      inTube = (q) => spans.some((sp) => q > sp[0] + 0.01 && q < sp[1] - 0.01),
      P = [];
    let s = 0;
    for (let i = 0; i + 3 < c.length; i += 2) {
      const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]),
        n = Math.max(1, Math.ceil(L / 2));
      for (let k = 0; k < n; k++) {
        const x = c[i] + ((c[i + 2] - c[i]) * k) / n,
          z = c[i + 1] + ((c[i + 3] - c[i + 1]) * k) / n;
        P.push([x, z, hf(s + (L * k) / n, x, z), s + (L * k) / n]);
      }
      s += L;
    }
    P.push([c[c.length - 2], c[c.length - 1], hf(s, c[c.length - 2], c[c.length - 1]), s]);
    // (the portals exactly: a sample at each end of a tube stretch)
    for (const sp of spans)
      for (const q of sp) {
        if (P.some((p) => Math.abs(p[3] - q) < 0.05)) continue;
        const j = P.findIndex((p) => p[3] > q);
        if (j <= 0) continue;
        const A = P[j - 1],
          B = P[j],
          t = (q - A[3]) / (B[3] - A[3] || 1),
          x = A[0] + (B[0] - A[0]) * t,
          z = A[1] + (B[1] - A[1]) * t;
        P.splice(j, 0, [x, z, hf(q, x, z), q]);
      }
    for (let i = 0; i + 1 < P.length; i++) {
      const a = P[i],
        b = P[i + 1],
        L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (L < 0.05) continue;
      const da = heightAt(a[0], a[1]) - a[2],
        db = heightAt(b[0], b[1]) - b[2];
      if (da < 0.3 && db < 0.3) continue; // at grade: the street as usual
      segs.push({
        ax: a[0],
        az: a[1],
        ay: a[2],
        bx: b[0],
        bz: b[1],
        by: b[2],
        r,
        ri,
        tx: (b[0] - a[0]) / L,
        tz: (b[1] - a[1]) / L,
        cov: inTube((a[3] + b[3]) / 2),
        zone: corrTramoSet.zone.get(ri),
        s0: a[3],
        s1: b[3]
      });
    }
  }
  if (cache) corrTramoSegs.cache = segs;
  return segs;
}
/** v1.2.0 (Jonay, boca norte de San Honorato: «ahí sobra esa acera… la única acera que hay ahí pasa por debajo del túnel,
 *  no hay nada por arriba: esa zona no es transitable por peatones»): the footways and paths of the OSM that cross over a
 *  cutting or a tube of the zones are cut back to their longest piece clear of it (called at the end of computeDepressions) */
function corrCutFootways() {
  const segs = corrTramoSegs(true),
    ST = corrState();
  ST.aceras = [];
  if (!segs.length) return;
  const over = (x, z) =>
    segs.some((s) => {
      const dx = s.bx - s.ax,
        dz = s.bz - s.az,
        t = clamp(((x - s.ax) * dx + (z - s.az) * dz) / (dx * dx + dz * dz || 1e-6), 0, 1);
      return Math.hypot(x - s.ax - dx * t, z - s.az - dz * t) < s.r + 1.0;
    });
  DATA.R.forEach((rd, ri) => {
    if (rd[0] < 13 || rd[3] & 6) return;
    const c = rd[4];
    let any = false;
    for (let i = 0; i < c.length && !any; i += 2) any = !!inCorr(c[i], c[i + 1]);
    if (!any) return;
    // points every metre, marked over / clear; keep the longest clear run
    const P = [];
    for (let i = 0; i + 3 < c.length; i += 2) {
      const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]),
        n = Math.max(1, Math.ceil(L));
      for (let k = 0; k < n; k++) {
        const x = c[i] + ((c[i + 2] - c[i]) * k) / n,
          z = c[i + 1] + ((c[i + 3] - c[i + 1]) * k) / n;
        P.push([x, z, over(x, z), k === 0]);
      }
    }
    P.push([c[c.length - 2], c[c.length - 1], over(c[c.length - 2], c[c.length - 1]), true]);
    if (!P.some((p) => p[2])) return;
    let best = null,
      cur = null;
    for (const p of P) {
      if (p[2]) {
        cur = null;
        continue;
      }
      if (!cur) cur = [];
      cur.push(p);
      if (!best || cur.length > best.length) best = cur;
    }
    const out = [];
    if (best && best.length >= 3)
      for (let k = 0; k < best.length; k++) if (best[k][3] || k === 0 || k === best.length - 1) out.push(best[k][0], best[k][1]);
    if (out.length >= 4) rd[4] = out;
    else rd[4] = [c[0], c[1], c[0] + 0.01, c[1]]; // (nothing left of it: a dot)
    ST.aceras.push(ri);
  });
  corrTramoSegs.cache = null;
  // (Jonay: «la gente sigue caminando por el aire en esa zona y atravesando muros»): nobody walks along the sunk roads of
  // the zone (their pavements would be over the cutting, at ground level) nor along the footways cut here
  let dead = 0;
  if (typeof RI2PW !== 'undefined')
    for (const ri of [...corrTramoSet(), ...ST.aceras]) {
      const id = RI2PW.get(ri);
      if (id !== undefined && !PEDWAYS[id].dead) {
        PEDWAYS[id].dead = true;
        dead++;
      }
    }
  console.log('corredores: aceras cortadas sobre la trinchera', ST.aceras.length, 'caminos sin peatones', dead);
}
/** the side of the pavement in the cutting of San Honorato: the right going down from the double roundabout (its
 *  north-west end, the higher one) to the tunnel; a unit vector pointing to that side, or null */
function corrPavementSide(segs) {
  if (!segs.length) return null;
  let hi = null,
    lo = null;
  for (const s of segs) {
    if (!hi || s.ay > hi.ay) hi = s;
    if (!lo || s.ay < lo.ay) lo = s;
  }
  // going down: from the highest point of the cutting to the lowest (the tube); right of a heading (dx, dz) with X east
  // and Y south is (−dz, dx)
  const dx = lo.ax - hi.ax,
    dz = lo.az - hi.az,
    L = Math.hypot(dx, dz) || 1;
  return [-dz / L, dx / L];
}
/** builds the floor, the walls and the hole of the cuttings of the zones as one piece (called at the end of buildRoads) */
function corrBuildTramos() {
  const all = corrTramoSegs(),
    ST = corrState();
  ST.tramo = { segs: all.length, walls: 0, cuts: 0, floor: 0, acera: 0, zonas: {} };
  for (const Z of corrZones()) {
    const segs = all.filter((s) => s.zone === Z);
    ST.tramo.zonas[Z.name] = segs.length;
    if (segs.length) corrBuildTramosZone(segs, Z);
  }
  corrRoundaboutMarks();
  // the dashed line between the TF-5 and its parallel slip lanes (corrMotorwayStraighten): 4.5 m dashes every 9 m
  for (const [ax, az, bx, bz, nx, nz, lw] of corrState().paraSegs || []) {
    const L = Math.hypot(bx - ax, bz - az);
    if (L < 1) continue;
    const dx = (bx - ax) / L,
      dz = (bz - az) / L,
      o = lw / 2;
    for (let u = 2.25; u < L; u += 9) CORR_MARKS.push([3, ax + dx * u + nx * o, az + dz * u + nz * o, dx, dz, 4.5, 0.3]);
  }
  // the chevrons of the gores (corrMotorwayStraighten): a V every 4 m pointing at the oncoming traffic, filling the
  // triangle that opens between the motorway edge and the slip lane, with its two edge lines
  for (const [bx, bz, tx, tz, nx, nz, L, gap] of corrState().gores || []) {
    for (let u = 3; u < L; u += 4) {
      const g = (gap * u) / L;
      if (g < 0.8) continue;
      const cx = bx + tx * u + nx * (g / 2 + 0.2),
        cz = bz + tz * u + nz * (g / 2 + 0.2),
        h = g / 2;
      for (const sg of [1, -1]) {
        const ex = cx + nx * sg * h - tx * h * 0.9,
          ez = cz + nz * sg * h - tz * h * 0.9,
          dx = ex - cx,
          dz = ez - cz,
          l = Math.hypot(dx, dz) || 1;
        CORR_MARKS.push([3, (cx + ex) / 2, (cz + ez) / 2, dx / l, dz / l, l, 0.35]);
      }
    }
    for (const k of [0, 1]) {
      for (let u = 0; u < L; u += 2) {
        const a = k ? (gap * u) / L : 0,
          b = k ? (gap * (u + 2)) / L : 0,
          x0 = bx + tx * u + nx * (a + 0.2),
          z0 = bz + tz * u + nz * (a + 0.2),
          x1 = bx + tx * (u + 2) + nx * (b + 0.2),
          z1 = bz + tz * (u + 2) + nz * (b + 0.2),
          l = Math.hypot(x1 - x0, z1 - z0) || 1;
        CORR_MARKS.push([3, (x0 + x1) / 2, (z0 + z1) / 2, (x1 - x0) / l, (z1 - z0) / l, l, 0.2]);
      }
    }
  }
  // (for prueba_120: what each sunk road of the zone draws as lines)
  ST.tramo.lineas = [...corrTramoSet()]
    .filter((ri) => corrTramoSet.zone.get(ri) === corrZones()[0])
    .map((ri) => {
      const rd = DATA.R[ri];
      return [ri, ROADCLASS(rd), rd[2], rd[3], lineRuns(ri, rd[4]).map((q) => [Math.round(q[0]), Math.round(q[1]), q[2]])];
    });
  ST.tramo.gemelas = ST.twins.map((t) => [DATA.R.indexOf(t[0]), DATA.R.indexOf(t[1]), Math.round(t[2] * 10) / 10]);
  console.log('corredores: tramos', JSON.stringify(ST.tramo), 'cortes en total', TCUTS.length);
}
/** one zone of corrBuildTramos (each its own grid: the zones are far apart) */
function corrBuildTramosZone(segs, Z) {
  const ST = corrState();
  // a grid of 8 m buckets with the segments that reach each one
  const B = 8,
    G = new Map(),
    key = (i, j) => i * 100003 + j;
  let x0 = 1e9,
    x1 = -1e9,
    z0 = 1e9,
    z1 = -1e9;
  for (const s of segs) {
    const e = s.r + 2;
    x0 = Math.min(x0, s.ax - e, s.bx - e);
    x1 = Math.max(x1, s.ax + e, s.bx + e);
    z0 = Math.min(z0, s.az - e, s.bz - e);
    z1 = Math.max(z1, s.az + e, s.bz + e);
    for (let i = Math.floor((Math.min(s.ax, s.bx) - e) / B); i <= Math.floor((Math.max(s.ax, s.bx) + e) / B); i++)
      for (let j = Math.floor((Math.min(s.az, s.bz) - e) / B); j <= Math.floor((Math.max(s.az, s.bz) + e) / B); j++) {
        let l = G.get(key(i, j));
        if (!l) G.set(key(i, j), (l = []));
        l.push(s);
      }
  }
  // the field: distance to the nearest axis minus its half-width (< 0 inside the cutting), and that axis
  const near = (x, z) => {
    const l = G.get(key(Math.floor(x / B), Math.floor(z / B)));
    let f = 1e9,
      bs = null,
      bt = 0;
    const per = new Map(); // nearest axis distance and height of each road
    if (l)
      for (const s of l) {
        const dx = s.bx - s.ax,
          dz = s.bz - s.az,
          t = clamp(((x - s.ax) * dx + (z - s.az) * dz) / (dx * dx + dz * dz || 1e-6), 0, 1),
          da = Math.hypot(x - s.ax - dx * t, z - s.az - dz * t),
          d = da - s.r;
        if (d < f) {
          f = d;
          bs = s;
          bt = t;
        }
        if (d < 2) {
          const o = per.get(s.ri);
          if (!o || da < o[0]) per.set(s.ri, [da, lerp(s.ay, s.by, t)]);
        }
      }
    // (Jonay: «no puede haber un escalón así… la acera hecha trozos»): where two roads meet in the cutting the floor
    // blends their heights smoothly, weighted by how close each axis is (on an axis it is that road's height)
    let sw = 0,
      sy = 0;
    for (const [da, y] of per.values()) {
      const w = 1 / Math.pow(0.2 + da, 4);
      sw += w;
      sy += w * y;
    }
    return { f, s: bs, t: bt, y: sw ? sy / sw : bs ? lerp(bs.ay, bs.by, bt) : 0 };
  };
  const yAt = (n) => n.y;
  const h = 1,
    nx = Math.ceil((x1 - x0) / h) + 1,
    nz = Math.ceil((z1 - z0) / h) + 1,
    F = new Float32Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) F[j * nx + i] = near(x0 + i * h, z0 + j * h).f;
  // 1. floor: every cell clipped to the inside of the union (asphalt, just under the carriageways)
  const yo = YOFF.asphalt - 0.05;
  const vtx = (x, z) => {
    const n = near(x, z);
    return [x, (n.s ? yAt(n) : heightAt(x, z)) + yo, z];
  };
  const uvOf = (p) => [p[0] / 8, p[2] / 8];
  for (let j = 0; j + 1 < nz; j++)
    for (let i = 0; i + 1 < nx; i++) {
      const C = [
        [i, j],
        [i + 1, j],
        [i + 1, j + 1],
        [i, j + 1]
      ].map(([a, b]) => [x0 + a * h, z0 + b * h, F[b * nx + a]]);
      if (C.every((q) => q[2] > 0)) continue;
      const poly = [];
      for (let k = 0; k < 4; k++) {
        const p = C[k],
          q = C[(k + 1) % 4];
        if (p[2] <= 0) poly.push([p[0], p[1]]);
        if (p[2] <= 0 !== q[2] <= 0) {
          const t = p[2] / (p[2] - q[2]);
          poly.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
        }
      }
      if (poly.length < 3) continue;
      const cx = poly.reduce((m, p) => m + p[0], 0) / poly.length,
        cz = poly.reduce((m, p) => m + p[1], 0) / poly.length,
        nc = near(cx, cz);
      if (!nc.s) continue;
      const A = acc(cx, cz, 'asphalt'),
        P = poly.map((p) => vtx(p[0], p[1]));
      for (let k = 1; k + 1 < P.length; k++) A.tri(P[0], P[k], P[k + 1], uvOf(P[0]), uvOf(P[k]), uvOf(P[k + 1]), null, undefined, [0, 1, 0]);
      ST.tramo.floor++;
    }
  // 2. walls: on the edge of the union (marching squares), not where the cutting is covered (the tube has its own) nor
  // across the carriageway where it comes up to grade
  const wc = Z.wall || CORR_WALL;
  const edge = [];
  for (let j = 0; j + 1 < nz; j++)
    for (let i = 0; i + 1 < nx; i++) {
      const C = [
        [i, j],
        [i + 1, j],
        [i + 1, j + 1],
        [i, j + 1]
      ].map(([a, b]) => [x0 + a * h, z0 + b * h, F[b * nx + a]]);
      const cut = [];
      for (let k = 0; k < 4; k++) {
        const p = C[k],
          q = C[(k + 1) % 4];
        if (p[2] <= 0 !== q[2] <= 0) {
          const t = p[2] / (p[2] - q[2]);
          cut.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
        }
      }
      if (cut.length === 2) edge.push([cut[0], cut[1]]);
      else if (cut.length === 4) {
        // saddle: decided by the centre
        const fc = near(x0 + (i + 0.5) * h, z0 + (j + 0.5) * h).f,
          inC0 = C[0][2] <= 0;
        if (fc <= 0 === inC0) {
          edge.push([cut[0], cut[1]]);
          edge.push([cut[2], cut[3]]);
        } else {
          edge.push([cut[3], cut[0]]);
          edge.push([cut[1], cut[2]]);
        }
      }
    }
  // the side of the pavement (Jonay: «donde sí hay una acera realmente es al lado derecho, bajando»): the right-hand
  // side going down from the double roundabout to the tunnel (X grows to the east, Y to the south)
  const side = Z.pave ? corrPavementSide(segs) : null;
  let kp = 0;
  for (const [p, q] of edge) {
    const mx = (p[0] + q[0]) / 2,
      mz = (p[1] + q[1]) / 2,
      n = near(mx, mz);
    if (!n.s) continue;
    // outward normal: the gradient of the field
    let gx = near(mx + 0.3, mz).f - near(mx - 0.3, mz).f,
      gz = near(mx, mz + 0.3).f - near(mx, mz - 0.3).f;
    const gl = Math.hypot(gx, gz) || 1;
    gx /= gl;
    gz /= gl;
    const y = yAt(n),
      gm = heightAt(mx, mz);
    // (v1.2.0, Jonay: «sigues dejando huecos azules»: only the end where the road comes up to grade has no wall; every
    // other edge of the hole has one, also where two pieces meet at an angle)
    const endCap = Math.abs(gx * n.s.tx + gz * n.s.tz) > 0.7 && gm - y < 1.2;
    if (n.s.cov || endCap || gm - y < (Z.open ? 1.2 : 0.15)) continue;
    const flush = inOtherRoad(mx, mz, gm - 0.8, gm + 0.8, n.s.ri, 0.2, true);
    // (Jonay, TF-5 pasado el puente de San Lázaro: «cosas raras en la mediana y en mitad de la autopista»): in an open
    // zone, where the trench is still shallow or the edge falls on another carriageway at grade, no wall nor railing
    if (Z.open && flush) continue;
    const top = (x, z) => Math.max(y + (flush ? 0.3 : 0.9), heightAt(x, z) + (flush ? -0.05 : 0.9));
    const ya = yAt(near(p[0], p[1])) - 0.3,
      yb = yAt(near(q[0], q[1])) - 0.3,
      ta = top(p[0], p[1]),
      tb = top(q[0], q[1]),
      o = 0.3,
      W = acc(mx, mz, 'trim');
    const A0 = [p[0], ya, p[1]],
      B0 = [q[0], yb, q[1]],
      A1 = [p[0], ta, p[1]],
      B1 = [q[0], tb, q[1]],
      A2 = [p[0] + gx * o, ta, p[1] + gz * o],
      B2 = [q[0] + gx * o, tb, q[1] + gz * o],
      A3 = [p[0] + gx * o, ya, p[1] + gz * o],
      B3 = [q[0] + gx * o, yb, q[1] + gz * o],
      z4 = [0, 0];
    W.quad(A0, B0, B1, A1, z4, z4, z4, z4, wc, undefined, [-gx, 0, -gz]);
    W.quad(A3, B3, B2, A2, z4, z4, z4, z4, wc, undefined, [gx, 0, gz]);
    W.quad(A1, B1, B2, A2, z4, z4, z4, z4, wc, undefined, [0, 1, 0]);
    // a railing on top (the photos): a rail 1 m over the wall and a post every other edge
    if (!flush && (!Z.open || gm - y > 2.2)) {
      const rc = [0.42, 0.44, 0.45],
        hx = gx * 0.15,
        hz = gz * 0.15,
        R0 = [p[0] + hx, ta + 1.0, p[1] + hz],
        R1 = [q[0] + hx, tb + 1.0, q[1] + hz];
      W.quad(R0, R1, [R1[0], R1[1] - 0.06, R1[2]], [R0[0], R0[1] - 0.06, R0[2]], z4, z4, z4, z4, rc, undefined, [-gx, 0, -gz]);
      W.quad([R0[0], R0[1] - 0.06, R0[2]], [R1[0], R1[1] - 0.06, R1[2]], R1, R0, z4, z4, z4, z4, rc, undefined, [gx, 0, gz]);
      if (ST.tramo.walls % 2 === 0) {
        const P0 = [p[0] + hx, ta, p[1] + hz];
        for (const [dx, dz] of [
          [0.04, 0],
          [0, 0.04]
        ])
          W.quad(
            [P0[0] - dx, ta, P0[2] - dz],
            [P0[0] + dx, ta, P0[2] + dz],
            [P0[0] + dx, ta + 1.0, P0[2] + dz],
            [P0[0] - dx, ta + 1.0, P0[2] - dz],
            z4,
            z4,
            z4,
            z4,
            rc,
            undefined,
            undefined
          );
      }
    }
    ST.tramo.walls++;
  }
  // the pavement along the wall on its side, down the cutting and through the tube: built along each road's axis
  // (v1.2.0, Jonay: «la acera hecha trozos»: taken from the 1 m edge it came out jagged), only where that side is the
  // edge of the cutting (not inside another piece of road)
  const conn = (p, q) => p && q && p.ri === q.ri && Math.abs(p.bx - q.ax) + Math.abs(p.bz - q.az) < 0.01;
  const vN = (a, b) => {
    // the normal at a joint: the mean of the two pieces' (no wedge-shaped gaps or overlaps at the bends)
    const x = -(a.tz + b.tz),
      z = a.tx + b.tx,
      l = Math.hypot(x, z) || 1;
    return [x / l, z / l];
  };
  for (let si = 0; si < segs.length; si++) {
    const sg0 = segs[si];
    if (!side) break;
    const pv = conn(segs[si - 1], sg0) ? segs[si - 1] : sg0,
      nx2 = conn(sg0, segs[si + 1]) ? segs[si + 1] : sg0,
      [anx, anz] = vN(pv, sg0),
      [bnx, bnz] = vN(sg0, nx2);
    const nx = -sg0.tz,
      nz = sg0.tx,
      dt = nx * side[0] + nz * side[1];
    if (Math.abs(dt) < 0.35) continue;
    const sg = Math.sign(dt),
      Wd = 2.0,
      ro = sg0.r - 0.02,
      ri = sg0.r - Wd,
      OA = (o) => [sg0.ax + anx * sg * o, sg0.az + anz * sg * o],
      OB = (o) => [sg0.bx + bnx * sg * o, sg0.bz + bnz * sg * o],
      ao = OA(ro),
      bo = OB(ro),
      ai = OA(ri),
      bi = OB(ri);
    const nm = near((ao[0] + bo[0]) / 2, (ao[1] + bo[1]) / 2);
    if (nm.f < -0.6) continue; // inside another piece of the cutting: no wall here
    if (heightAt((ao[0] + bo[0]) / 2, (ao[1] + bo[1]) / 2) - nm.y < 0.3) continue;
    // (Jonay: «que se amolde y así no se entierra»): each corner at the height of the floor under it, plus the kerb
    const hy = (p) => yAt(near(p[0], p[1])) + YOFF.asphalt + 0.15;
    const A = [ao[0], hy(ao), ao[1]],
      Bq = [bo[0], hy(bo), bo[1]],
      Ai = [ai[0], hy(ai), ai[1]],
      Bi = [bi[0], hy(bi), bi[1]],
      ya = Ai[1],
      yb = Bi[1],
      S = acc(sg0.ax, sg0.az, 'sidewalk'),
      K = acc(sg0.ax, sg0.az, 'trim');
    S.quad(A, Bq, Bi, Ai, [A[0] / 2, A[2] / 2], [Bq[0] / 2, Bq[2] / 2], [Bi[0] / 2, Bi[2] / 2], [Ai[0] / 2, Ai[2] / 2], null, undefined, [0, 1, 0]);
    K.quad(Ai, Bi, [Bi[0], yb - 0.2, Bi[2]], [Ai[0], ya - 0.2, Ai[2]], [0, 0], [0, 0], [0, 0], [0, 0], [0.7, 0.69, 0.66], undefined, [
      -nx * sg,
      0,
      -nz * sg
    ]);
    kp++;
  }
  ST.tramo.acera += kp;
  // the marks on the way down to the tunnel (Street View de Jonay): an arrow and an X on the lane going down, some 20 m
  // and 13 m before the north mouth
  for (const m of ST.merged || []) {
    const T = DATA.R[m[0]];
    if (!T || corrTramoSet.zone.get(m[0]) !== Z) continue;
    if (!T) continue;
    const c = T[4],
      P = [];
    for (let i = c.length - 2; i >= 0; i -= 2) P.push([c[i], c[i + 1]]); // from the top down to the tunnel
    const L = [0];
    for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const at = (s0) => {
      const s1 = clamp(s0, 0, L[L.length - 1]);
      let i = 1;
      while (i < L.length - 1 && L[i] < s1) i++;
      const t = (s1 - L[i - 1]) / (L[i] - L[i - 1] || 1),
        dx = P[i][0] - P[i - 1][0],
        dz = P[i][1] - P[i - 1][1],
        l = Math.hypot(dx, dz) || 1;
      return [P[i - 1][0] + dx * t, P[i - 1][1] + dz * t, dx / l, dz / l];
    };
    const lane = T[2] / 4;
    for (const [d, kind] of [
      [20, 'arrow'],
      [13, 'x']
    ]) {
      const [x0, z0, dx, dz] = at(L[L.length - 1] - d),
        x = x0 - dz * lane,
        z = z0 + dx * lane, // the lane on the right going down (X east, Y south: right of (dx, dz) is (−dz, dx))
        y = yAt(near(x, z)) + YOFF.asphaltLines + 0.03;
      if (kind === 'arrow') CORR_MARKS.push([0, x, z, dx, dz, 5, 1.3, y]);
      else {
        const W = acc(x, z, 'trim'),
          col = [0.93, 0.92, 0.88];
        for (const sg of [1, -1]) {
          const ux = (dx - sg * dz) / Math.SQRT2,
            uz = (dz + sg * dx) / Math.SQRT2,
            vx = -uz * 0.12,
            vz = ux * 0.12,
            h = 1.4;
          W.quad(
            [x - ux * h + vx, y, z - uz * h + vz],
            [x + ux * h + vx, y, z + uz * h + vz],
            [x + ux * h - vx, y, z + uz * h - vz],
            [x - ux * h - vx, y, z - uz * h - vz],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            col,
            undefined,
            [0, 1, 0]
          );
        }
      }
    }
  }
  // 3. the hole in the terrain: one group of capsules, the same as the field (merged along each road while straight);
  // where no street crosses over on a slab, the streets and lines at grade over the hole are cut too (cutAware)
  const gid = 8000 + TUNNEL_DECKS.length,
    slabAt = [];
  for (const ri of corrTramoSet())
    for (const X of crossingsOf(ri)) {
      const r2 = DATA.R[X.rj];
      if (r2[3] & 4 || DEP.has(X.rj) || r2[0] > 14) continue; // (bridges and raised decks too: the cut must not take the deck away)
      slabAt.push([X.x, X.z, r2[2] / 2 + 4]);
    }
  const nearSlab = (x, z, r) => slabAt.some((q) => Math.hypot(q[0] - x, q[1] - z) < q[2] + r);
  let cur = null;
  const flushCut = () => {
    if (!cur) return;
    if (cur.trimA) trim(cur, false);
    const free =
      !nearSlab(cur.ax, cur.az, cur.r) && !nearSlab(cur.bx, cur.bz, cur.r) && !nearSlab((cur.ax + cur.bx) / 2, (cur.az + cur.bz) / 2, cur.r);
    const gt = Math.max(heightAt(cur.ax, cur.az), heightAt(cur.bx, cur.bz)) + 1.2;
    // the floor it gives the cut: the highest floor drawn inside it (where another piece runs higher, e.g. a slip road
    // joining, its floor was cut away and the sea showed through: blue patches)
    let ya = cur.ay,
      yb = cur.by;
    const L = Math.hypot(cur.bx - cur.ax, cur.bz - cur.az) || 1,
      ux = (cur.bx - cur.ax) / L,
      uz = (cur.bz - cur.az) / L;
    for (let u = -cur.r; u <= L + cur.r; u += 1.5)
      for (let v = -cur.r; v <= cur.r; v += 1.5) {
        const x = cur.ax + ux * u - uz * v,
          z = cur.az + uz * u + ux * v,
          n = near(x, z);
        if (!n.s || n.f > 0) continue;
        if (u < L / 2) ya = Math.max(ya, yAt(n));
        else yb = Math.max(yb, yAt(n));
      }
    const g = gid + Math.floor(ST.tramo.cuts / 16) * 0.001; // (groups of 16: each group has its own small box in the shader)
    TCUTS.push(free ? [cur.ax, cur.az, cur.bx, cur.bz, cur.r + 0.15, g, ya + 0.2, yb + 0.2, gt] : [cur.ax, cur.az, cur.bx, cur.bz, cur.r + 0.15, g]);
    ST.tramo.cuts++;
    cur = null;
  };
  // (next to a tube the round end of the cut must not reach over it: under a street over the mouth you saw the sea
  // past the edges of that street; there the cut stops square, its own radius short of the portal)
  const cross = [];
  const trim = (c, atB) => {
    // square end at the portal: the main cut stops its radius short and small cuts across fill up to the portal
    {
      const L = c.len || 1,
        ux = (c.bx - c.ax) / L,
        uz = (c.bz - c.az) / L,
        hx = atB ? c.bx : c.ax,
        hz = atB ? c.bz : c.az,
        sg = atB ? -1 : 1,
        rho = 1.0,
        e = c.r - rho;
      for (let d = rho; d < Math.min(c.r, L) + rho; d += 2 * rho) {
        const mx = hx + ux * sg * d,
          mz = hz + uz * sg * d;
        cross.push([mx - uz * e, mz + ux * e, mx + uz * e, mz - ux * e, rho + 0.15, gid]);
      }
    }
    const k = Math.min(c.r, Math.max(0, c.len - 0.5)) / (c.len || 1);
    if (atB) {
      c.bx -= (c.bx - c.ax) * k;
      c.bz -= (c.bz - c.az) * k;
      c.by -= (c.by - c.ay) * k;
    } else {
      c.ax += (c.bx - c.ax) * k;
      c.az += (c.bz - c.az) * k;
      c.ay += (c.by - c.ay) * k;
    }
    c.len *= 1 - k;
  };
  let prevCov = null;
  for (const s of segs) {
    if (s.cov) {
      if (cur && cur.ri === s.ri && Math.abs(cur.bx - s.ax) + Math.abs(cur.bz - s.az) < 0.01) trim(cur, true);
      flushCut();
      prevCov = s;
      continue;
    }
    const afterCov = prevCov && prevCov.ri === s.ri && Math.abs(prevCov.bx - s.ax) + Math.abs(prevCov.bz - s.az) < 0.01;
    prevCov = null;
    if (afterCov) {
      flushCut();
      cur = { ...s, len: Math.hypot(s.bx - s.ax, s.bz - s.az), trimA: true };
      continue;
    }
    if (
      cur &&
      cur.ri === s.ri &&
      Math.abs(cur.bx - s.ax) + Math.abs(cur.bz - s.az) < 0.01 &&
      cur.tx * s.tx + cur.tz * s.tz > 0.9985 &&
      cur.len < 30
    ) {
      cur.bx = s.bx;
      cur.bz = s.bz;
      cur.by = s.by;
      cur.len += Math.hypot(s.bx - s.ax, s.bz - s.az);
      continue;
    }
    flushCut();
    cur = { ...s, len: Math.hypot(s.bx - s.ax, s.bz - s.az) };
  }
  flushCut();
  for (const q of cross) TCUTS.push(q);
  ST.tramo.cuts += cross.length;
  // 4. what you drive and walk on: the whole floor of the cutting, not only the carriageway
  const byRoad = new Map();
  for (const s of segs) {
    let l = byRoad.get(s.ri);
    if (!l) byRoad.set(s.ri, (l = []));
    l.push(s);
  }
  for (const [ri, l] of byRoad) {
    let pts = null,
      prev = null;
    const push = () => {
      if (pts && pts.length >= 2) TUNNEL_DECKS.push({ ri, type: 'path', pts, w: 2 * l[0].r, road: true, tunnel: true, hw: l[0].r - 0.3 });
    };
    for (const s of l) {
      if (!prev || Math.abs(prev.bx - s.ax) + Math.abs(prev.bz - s.az) > 0.01) {
        push();
        pts = [[s.ax, s.az, s.ay + 0.12]];
      }
      pts.push([s.bx, s.bz, s.by + 0.12]);
      prev = s;
    }
    push(); // (a run per stretch below grade)
  }
  // 4b. (Jonay, boca norte, X −946, Y 82: «ahí sobra esa acera») the paved look of the ground by the buildings
  // (SPLAT.mask) reached over the cutting and the top of the tube: no paving over the whole sunk road and its walls
  if (SPLAT.mask && SPLAT.mtex) {
    const y = SPLAT.mask.getContext('2d'),
      sx = SPLAT.W / SPLAT.w,
      sz = SPLAT.H / SPLAT.h;
    y.strokeStyle = '#000';
    y.lineCap = 'round';
    for (const s of segs) {
      y.lineWidth = (2 * s.r + 3) * sx;
      y.beginPath();
      y.moveTo((s.ax - SPLAT.x0) * sx, (s.az - SPLAT.z0) * sz);
      y.lineTo((s.bx - SPLAT.x0) * sx, (s.bz - SPLAT.z0) * sz);
      y.stroke();
    }
    SPLAT.mtex.needsUpdate = true;
  }
  // 5. the centre line of a dual road without median (Jonay, 9-nov, foto 3D de San Honorato: «es de doble sentido»): one
  // solid line halfway between both halves, where they run side by side (each half has only its outer edge line)
  const white = [0.93, 0.92, 0.88];
  for (const [a, b] of Z.twins === false ? [] : ST.twins) {
    const ca = a[4],
      cb = b[4],
      M = [];
    for (let i = 0; i + 3 < ca.length; i += 2) {
      const L = Math.hypot(ca[i + 2] - ca[i], ca[i + 3] - ca[i + 1]);
      for (let u = 0; u < L; u += 1.5) {
        const x = ca[i] + ((ca[i + 2] - ca[i]) * u) / (L || 1),
          z = ca[i + 1] + ((ca[i + 3] - ca[i + 1]) * u) / (L || 1);
        let best = null;
        for (let k = 0; k + 3 < cb.length; k += 2) {
          const ex = cb[k + 2] - cb[k],
            ez = cb[k + 3] - cb[k + 1],
            t = clamp(((x - cb[k]) * ex + (z - cb[k + 1]) * ez) / (ex * ex + ez * ez || 1), 0, 1),
            px = cb[k] + ex * t,
            pz = cb[k + 1] + ez * t,
            d = Math.hypot(x - px, z - pz);
          if (!best || d < best[2]) best = [px, pz, d, t];
        }
        M.push(best && best[2] < 14 && best[3] > 0 && best[3] < 1 ? [(x + best[0]) / 2, (z + best[1]) / 2] : null);
      }
    }
    for (let i = 0; i + 1 < M.length; i++) {
      const p = M[i],
        q = M[i + 1];
      if (!p || !q) continue;
      const L = Math.hypot(q[0] - p[0], q[1] - p[1]);
      if (L < 0.1 || L > 4) continue;
      const nx = (-(q[1] - p[1]) / L) * 0.1,
        nz = ((q[0] - p[0]) / L) * 0.1;
      const yOf = (x, z) => {
        const n = near(x, z);
        return (n.s && n.f <= 0 ? yAt(n) : heightAt(x, z)) + YOFF.asphaltLines + 0.01;
      };
      const yp = yOf(p[0], p[1]),
        yq = yOf(q[0], q[1]),
        z4 = [0, 0];
      acc(p[0], p[1], 'trim').quad(
        [p[0] + nx, yp, p[1] + nz],
        [q[0] + nx, yq, q[1] + nz],
        [q[0] - nx, yq, q[1] - nz],
        [p[0] - nx, yp, p[1] - nz],
        z4,
        z4,
        z4,
        z4,
        white,
        undefined,
        [0, 1, 0]
      );
    }
  }
}

/** v1.2.1 (Jonay, Camino del Púlpito, X −3192, Y −341: «de golpe hiciste súper carreteras empinadas… debe ser todo más
 *  gradual desde mucho más atrás»): the 16 m heightmap comes from a coarser one and goes in terraces (3–4 equal cells and
 *  then 15–20 m up in one): a Gaussian blur of ~3 cells inside these boxes, fading out over 4 cells around them. (Until
 *  the IGN 5 m relief replaces it.) */
function hmSmoothZones() {
  const Z = [{ x0: -3330, x1: -3040, z0: -470, z1: -235, r: 5 }],
    nx = HM.nx,
    nz = HM.nz,
    a = HM.a;
  for (const B of Z) {
    const i0 = Math.max(0, Math.floor((B.x0 - HM.x0) / HM.dx) - 4),
      i1 = Math.min(nx - 1, Math.ceil((B.x1 - HM.x0) / HM.dx) + 4),
      j0 = Math.max(0, Math.floor((B.z0 - HM.z0) / HM.dx) - 4),
      j1 = Math.min(nz - 1, Math.ceil((B.z1 - HM.z0) / HM.dx) + 4),
      R = B.r,
      w = [];
    for (let k = -R; k <= R; k++) w.push(Math.exp(-(k * k) / (2 * (R / 2) * (R / 2))));
    const src = new Float32Array((i1 - i0 + 1 + 2 * R) * (j1 - j0 + 1 + 2 * R)),
      W = i1 - i0 + 1 + 2 * R;
    const get = (i, j) => a[Math.max(0, Math.min(nz - 1, j)) * nx + Math.max(0, Math.min(nx - 1, i))];
    for (let j = j0 - R; j <= j1 + R; j++) for (let i = i0 - R; i <= i1 + R; i++) src[(j - j0 + R) * W + (i - i0 + R)] = get(i, j);
    // separable blur: along X then along Z
    const tmp = new Float32Array(src.length);
    const H2 = j1 - j0 + 1 + 2 * R;
    for (let j = 0; j < H2; j++)
      for (let i = R; i < W - R; i++) {
        let sv = 0,
          sw = 0;
        for (let k = -R; k <= R; k++) {
          sv += src[j * W + i + k] * w[k + R];
          sw += w[k + R];
        }
        tmp[j * W + i] = sv / sw;
      }
    for (let j = j0; j <= j1; j++)
      for (let i = i0; i <= i1; i++) {
        let sv = 0,
          sw = 0;
        for (let k = -R; k <= R; k++) {
          sv += tmp[(j - j0 + R + k) * W + (i - i0 + R)] * w[k + R];
          sw += w[k + R];
        }
        const x = HM.x0 + i * HM.dx,
          z = HM.z0 + j * HM.dx,
          dout = Math.max(B.x0 - x, x - B.x1, B.z0 - z, z - B.z1, 0),
          f = Math.max(0, 1 - dout / (4 * HM.dx));
        if (f > 0) a[j * nx + i] = Math.round(a[j * nx + i] + (sv / sw - a[j * nx + i]) * f);
      }
  }
}
