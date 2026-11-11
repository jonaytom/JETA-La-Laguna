// ============ Glorietas y zonas cebradas de todo el mapa (v1.3.5) ============
// Jonay (11-nov): «revisa las glorietas y las zonas cebradas de todo el mapa para las que tengas fotos». En las fotos
// (Google 3D de Villa Hilaria, Finca España, La Verdellada, Gracia, Guajara, el HUC…): cada glorieta lleva su isleta,
// una línea continua junto a la isleta y otra por fuera (abierta en cada calle), raya discontinua si el anillo tiene dos
// carriles y paso de cebra en las calles; entre la entrada y la salida de una misma calle, una isleta pintada con rayas
// oblicuas (el «cebreado»), y donde una calzada se abre en dos (o dos se juntan), el triángulo entre ellas también.
// Antes solo tenían marcas las glorietas de las zonas rehechas (corrRoundaboutMarks, 04c_corredores.js).
// (functions only: some run from 01_core.js before this file's constants exist)

/** v1.3.5: rings of the OSM that the map's roundabout list (DATA.RB) misses (La Verdellada: its ring comes in two pieces
 *  joined through a bridge): closed loops of roundabout pieces, added to DATA.RB so they get their island and marks */
function ringsMissing() {
  const R = DATA.R,
    K = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    ring = [];
  R.forEach((r, ri) => {
    if (r[3] & 32 && r[0] <= 12 && r[4].length >= 4) ring.push(ri);
  });
  // components by shared ends
  const par = new Map(ring.map((ri) => [ri, ri])),
    find = (i) => {
      while (par.get(i) !== i) i = par.get(i);
      return i;
    },
    byNode = new Map();
  for (const ri of ring) {
    const c = R[ri][4];
    for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])]) {
      const o = byNode.get(k);
      if (o !== undefined) par.set(find(ri), find(o));
      else byNode.set(k, ri);
    }
  }
  const comp = new Map();
  for (const ri of ring) {
    const k = find(ri);
    if (!comp.has(k)) comp.set(k, []);
    comp.get(k).push(ri);
  }
  DATA.RB = DATA.RB || [];
  const added = [];
  for (const l of comp.values()) {
    const P = [];
    let w = 0;
    for (const ri of l) {
      const c = R[ri][4];
      for (let i = 0; i < c.length; i += 2) P.push([c[i], c[i + 1]]);
      w += R[ri][2];
    }
    if (P.length < 5) continue;
    // closed: every end node shared by two pieces of the loop
    const cnt = new Map();
    for (const ri of l) {
      const c = R[ri][4];
      for (const k of [K(c[0], c[1]), K(c[c.length - 2], c[c.length - 1])]) cnt.set(k, (cnt.get(k) || 0) + 1);
    }
    if ([...cnt.values()].some((v) => v !== 2)) continue;
    const cx = P.reduce((a, p) => a + p[0], 0) / P.length,
      cz = P.reduce((a, p) => a + p[1], 0) / P.length,
      rs = P.map((p) => Math.hypot(p[0] - cx, p[1] - cz)),
      Rc = rs.reduce((a, b) => a + b, 0) / rs.length;
    if (Rc < 6 || Rc > 30 || Math.max(...rs) - Math.min(...rs) > Rc * 0.95) continue; // (not round: a loop of some other shape)
    if (DATA.RB.some((rb) => Math.hypot(rb[0] - cx, rb[1] - cz) < Math.max(10, rb[2] * 0.6))) continue;
    const rb = [Math.round(cx * 10) / 10, Math.round(cz * 10) / 10, Math.round(Rc * 10) / 10, Math.round((w / l.length / 1.3) * 10) / 10];
    DATA.RB.push(rb);
    added.push(rb);
  }
  console.log('glorietas que faltaban en DATA.RB', JSON.stringify(added));
}
/** the width of a roundabout's ring as drawn (its pieces' own width; the list only has the OSM width before widening) */
function ringWidth(rb) {
  if (rb.rw) return rb.rw;
  let s = 0,
    n = 0;
  for (const r of DATA.R) {
    if (!(r[3] & 32) || r[0] > 12) continue;
    const c = r[4],
      m = (c.length >> 2) << 1;
    if (Math.abs(Math.hypot(c[m] - rb[0], c[m + 1] - rb[1]) - rb[2]) < 7) {
      s += r[2];
      n++;
    }
  }
  rb.rw = n ? s / n : WIDEN(3, rb[3], 1);
  return rb.rw;
}
/** is this ring piece part of one of the roundabouts? (then it is drawn plain and its lines are painted apart) */
function isRbRing(rd) {
  if (!(rd[3] & 32)) return false;
  const c = rd[4],
    m = (c.length >> 2) << 1;
  return (DATA.RB || []).some((r) => Math.abs(Math.hypot(c[m] - r[0], c[m + 1] - r[1]) - r[2]) < ringWidth(r) / 2 + 3);
}

// ---------- the hatched areas: between the way in and the way out of an arm, and where a carriageway splits or merges
/** a point at arc length u along a polyline (flat [x, z, …]) and its unit direction */
function cebAt(c, u) {
  let k = 0;
  for (; k + 3 < c.length; k += 2) {
    const l = Math.hypot(c[k + 2] - c[k], c[k + 3] - c[k + 1]);
    if (u <= l || k + 4 >= c.length) {
      const t = l ? Math.min(u, l) / l : 0,
        dx = (c[k + 2] - c[k]) / (l || 1),
        dz = (c[k + 3] - c[k + 1]) / (l || 1);
      return [c[k] + (c[k + 2] - c[k]) * t, c[k + 1] + (c[k + 3] - c[k + 1]) * t, dx, dz, u <= l];
    }
    u -= l;
  }
  return null;
}
/** a polyline from its end backwards */
function cebRev(c) {
  const o = [];
  for (let i = c.length - 2; i >= 0; i -= 2) o.push(c[i], c[i + 1]);
  return o;
}
const CEB = { isletas: 0, cunas: 0, tramos: [] };
/** the area between two ways leaving the same place (P and Q from there outward, widths wp and wq), from where their
 *  edges part until it is 7 m wide (or they go apart): asphalt, its two edge lines and oblique stripes */
function cebArea(P, wp, Q, wq, u0, maxU, maxGap = 7, raised = false) {
  const E = [];
  for (let u = u0; u <= maxU; u += 1) {
    const a = cebAt(P, u),
      b = cebAt(Q, u);
    if (!a || !b || !a[4] || !b[4]) break;
    // each one's inner edge: the side towards the other
    const na = [-a[3], a[2]],
      nb = [-b[3], b[2]],
      sa = Math.sign((b[0] - a[0]) * na[0] + (b[1] - a[1]) * na[1]) || 1,
      sb = Math.sign((a[0] - b[0]) * nb[0] + (a[1] - b[1]) * nb[1]) || 1;
    const ea = [a[0] + na[0] * sa * (wp / 2), a[1] + na[1] * sa * (wp / 2)],
      eb = [b[0] + nb[0] * sb * (wq / 2), b[1] + nb[1] * sb * (wq / 2)],
      gap = Math.hypot(eb[0] - ea[0], eb[1] - ea[1]),
      axes = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (axes < (wp + wq) / 2 + 0.4) {
      if (E.length) break; // (they meet again)
      continue; // (still overlapping: not parted yet)
    }
    const mx = (ea[0] + eb[0]) / 2,
      mz = (ea[1] + eb[1]) / 2;
    if (gap > maxGap) {
      if (E.length) break; // (a wedge that has opened up: done)
      continue; // (an island still too wide near the ring: it narrows further out)
    }
    if (onCarriagewayEarly(mx, mz, -0.3) || inAnyBuilding(mx, mz)) {
      if (E.length) break;
      continue;
    }
    E.push([ea, eb, gap]);
  }
  if (E.length < 4) return false;
  const em = E[E.length >> 1];
  CEB.last = [Math.round((em[0][0] + em[1][0]) / 2), Math.round((em[0][1] + em[1][1]) / 2)];
  const F = acc(E[0][0][0], E[0][0][1], 'asphaltTop'), // v1.4.0: over the lane lines (they must not show through the hatching)
    y = (p) => heightAt(p[0], p[1]) + YOFF.asphaltTop;
  for (let i = 0; i + 1 < E.length; i++) {
    const [a0, b0] = E[i],
      [a1, b1] = E[i + 1],
      mx = (a0[0] + b0[0] + a1[0] + b1[0]) / 4,
      mz = (a0[1] + b0[1] + a1[1] + b1[1]) / 4,
      tx = (a1[0] + b1[0] - a0[0] - b0[0]) / 2,
      tz = (a1[1] + b1[1] - a0[1] - b0[1]) / 2,
      tl = Math.hypot(tx, tz) || 1;
    markClear(mx, mz, tx / tl, tz / tl, tl, Math.max(Math.hypot(b0[0] - a0[0], b0[1] - a0[1]), Math.hypot(b1[0] - a1[0], b1[1] - a1[1])), false);
  }
  for (let i = 0; i + 1 < E.length; i++) {
    const [a0, b0] = E[i],
      [a1, b1] = E[i + 1];
    const A = [a0[0], y(a0), a0[1]],
      B = [b0[0], y(b0), b0[1]],
      C = [b1[0], y(b1), b1[1]],
      D = [a1[0], y(a1), a1[1]];
    F.quad(A, B, C, D, [A[0] / 8, A[2] / 8], [B[0] / 8, B[2] / 8], [C[0] / 8, C[2] / 8], [D[0] / 8, D[2] / 8], null, undefined, [0, 1, 0]);
    F.quad(A, D, C, B, [A[0] / 8, A[2] / 8], [D[0] / 8, D[2] / 8], [C[0] / 8, C[2] / 8], [B[0] / 8, B[2] / 8], null, undefined, [0, 1, 0]);
  }
  const line = (p, q, wid) => {
    const dx = q[0] - p[0],
      dz = q[1] - p[1],
      l = Math.hypot(dx, dz);
    if (l < 0.2) return;
    CORR_MARKS.push([3, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, dx / l, dz / l, l, wid]);
  };
  // edge lines (0.2 m in from each edge) and the oblique stripes every 2 m
  const inset = (e, k) => {
    const [a, b, g] = E[e];
    const t = Math.min(0.5, 0.2 / (g || 1));
    return k ? [b[0] + (a[0] - b[0]) * t, b[1] + (a[1] - b[1]) * t] : [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };
  // v1.3.6 (Jonay: «que tengan bordillo»): a splitter island is raised with its kerb where it is 1.4 m wide or more; the
  // narrow nose before it stays painted
  const up = (i) => raised && E[i][2] >= 1.4 && E[i + 1] && E[i + 1][2] >= 1.4;
  if (raised) {
    let i = 0;
    while (i + 1 < E.length) {
      if (!up(i)) {
        i++;
        continue;
      }
      let j = i;
      while (j + 1 < E.length && up(j)) j++;
      const ins = (e, k) => {
        const [a, b, g] = E[e],
          t = Math.min(0.5, 0.3 / (g || 1));
        return k ? [b[0] + (a[0] - b[0]) * t, b[1] + (a[1] - b[1]) * t] : [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      };
      const Q = [];
      for (let e = i; e <= j; e++) Q.push(ins(e, 0));
      for (let e = j; e >= i; e--) Q.push(ins(e, 1));
      raisedIsland(Q, 'sidewalk', 0.15);
      CEB.bordillos = (CEB.bordillos || 0) + 1;
      i = j + 1;
    }
  }
  for (let i = 0; i + 1 < E.length; i++) if (!up(i)) for (const k of [0, 1]) line(inset(i, k), inset(i + 1, k), 0.15);
  for (let i = 1; i + 2 < E.length; i += 2) {
    const j = Math.min(E.length - 1, i + 2);
    if (E[i][2] < 1.0 || up(i) || up(i + 1)) continue;
    line(inset(i, 0), inset(j, 1), 0.4);
  }
  return true;
}
/** called with the corridor marks (04c_corredores.js, while the roads are built): the splitter islands of every
 *  roundabout and the wedges where a carriageway splits in two or two join */
function cebreados() {
  const R = DATA.R,
    oneway = (r) => r[0] >= 2 && r[0] <= 10 && r[3] & 1 && !(r[3] & (32 | 6)),
    major = (r) => r[0] <= 8, // (wedges only where a main road splits: two one-way residential streets leaving a corner are not one)
    ri0 = (r) => R.indexOf(r);
  // 1. splitter islands: the way in and the way out of the same street at a roundabout
  for (const rb of DATA.RB || []) {
    const [cx, cz, Rc] = rb,
      Ro = Rc + ringWidth(rb) / 2;
    const ins = [],
      outs = [];
    R.forEach((r, ri) => {
      if (!oneway(r) || DEP.has(ri)) return;
      const c = r[4],
        de = rbDist(rb, c[c.length - 2], c[c.length - 1]),
        ds = rbDist(rb, c[0], c[1]);
      if (de < ringWidth(rb) / 2 + 2) ins.push({ r, c: cebRev(c), ang: Math.atan2(c[c.length - 1] - cz, c[c.length - 2] - cx) });
      else if (ds < ringWidth(rb) / 2 + 2) outs.push({ r, c, ang: Math.atan2(c[1] - cz, c[0] - cx) });
    });
    for (const a of ins) {
      let best = null,
        bd = 0.9;
      for (const b of outs) {
        let d = Math.abs(a.ang - b.ang);
        if (d > Math.PI) d = 2 * Math.PI - d;
        if (d < bd) {
          bd = d;
          best = b;
        }
      }
      if (!best) continue;
      // start where both are out of the ring
      let u0 = 0;
      for (; u0 < 20; u0 += 0.5) {
        const p = cebAt(a.c, u0),
          q = cebAt(best.c, u0);
        if (!p || !q) break;
        if (rbDist(rb, p[0], p[1]) > ringWidth(rb) / 2 + 0.8 && rbDist(rb, q[0], q[1]) > ringWidth(rb) / 2 + 0.8) break;
      }
      if (cebArea(a.c, a.r[2], best.c, best.r[2], u0, u0 + 30, 10, true)) {
        CEB.isletas++;
        CEB.tramos.push(['isleta', ri0(a.r), ri0(best.r), ...CEB.last]);
      }
    }
  }
  // 2. wedges: two one-way carriageways leaving one node (a split) or arriving at one (a merge), at a narrow angle
  const K = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    starts = new Map(),
    ends = new Map();
  for (const r of R) {
    if (!oneway(r)) continue;
    const c = r[4];
    (starts.get(K(c[0], c[1])) || starts.set(K(c[0], c[1]), []).get(K(c[0], c[1]))).push(r);
    const ke = K(c[c.length - 2], c[c.length - 1]);
    (ends.get(ke) || ends.set(ke, []).get(ke)).push(r);
  }
  const nearRb = (x, z) => (DATA.RB || []).some((rb) => Math.hypot(rb[0] - x, rb[1] - z) < rb[2] + ringWidth(rb) / 2 + 6);
  for (const [map, rev] of [
    [starts, false],
    [ends, true]
  ])
    for (const l of map.values()) {
      if (l.length !== 2 || !major(l[0]) || !major(l[1])) continue;
      const [p, q] = l,
        cp = rev ? cebRev(p[4]) : p[4],
        cq = rev ? cebRev(q[4]) : q[4];
      if (nearRb(cp[0], cp[1]) || DEP.has(ri0(p)) || DEP.has(ri0(q))) continue;
      const a = cebAt(cp, 6),
        b = cebAt(cq, 6);
      if (!a || !b) continue;
      if (a[2] * b[2] + a[3] * b[3] < Math.cos(0.6)) continue; // (a junction, not a split)
      if (cebArea(cp, p[2], cq, q[2], 0, 45)) {
        CEB.cunas++;
        CEB.tramos.push([rev ? 'junta' : 'abre', ri0(p), ri0(q), ...CEB.last]);
      }
    }
  window.__ceb = CEB; // (+ CEB.bordillos, CEB.flechas)
  console.log('cebreados: isletas', CEB.isletas, 'cuñas', CEB.cunas);
}

// ---------- v1.3.6 (Jonay: «toca las glorietas para que tengan bordillo, las flechas, y la de la pasarela aunque tenga
// pasarela encima también funciona igual»): the ring as drawn (a loop of its pieces, round or not: the Padre Anchieta is
// an oval of 36–57 m), raised islands with a kerb (the centre one and the splitter islands of the arms) and lane arrows
// on the entries of two lanes
/** the ring of a roundabout as one closed polyline [[x, z], …] (its pieces chained end to end), or null */
function rbLoop(rb) {
  if (rb.loop !== undefined) return rb.loop;
  rb.loop = null;
  const R = DATA.R,
    K = (x, z) => Math.round(x * 2) + ',' + Math.round(z * 2),
    pcs = [];
  R.forEach((r) => {
    if (!(r[3] & 32) || r[0] > 12 || r[4].length < 4) return;
    const c = r[4],
      m = (c.length >> 2) << 1,
      d = Math.hypot(c[m] - rb[0], c[m + 1] - rb[1]);
    if (d < rb[2] * 1.45 + 6 && d > rb[2] * 0.5 - 4) pcs.push(r);
  });
  if (pcs.length < 2) return null;
  // chain from the first piece; on each end, the piece that starts there
  if (pcs[0][3] & 6) return null;
  const used = new Set([pcs[0]]),
    P = [];
  let cur = pcs[0];
  for (let i = 0; i < cur[4].length; i += 2) P.push([cur[4][i], cur[4][i + 1]]);
  const start = K(P[0][0], P[0][1]);
  for (let guard = 0; guard < 40; guard++) {
    const end = P[P.length - 1],
      ke = K(end[0], end[1]);
    if (ke === start && P.length > 4) break;
    const nx = pcs.find((r) => !used.has(r) && K(r[4][0], r[4][1]) === ke);
    if (!nx) return null; // (not a closed loop)
    if (nx[3] & 6) return null; // (a ring that goes over a bridge or through a tunnel: Geneto, La Verdellada: kept round)
    used.add(nx);
    for (let i = 2; i < nx[4].length; i += 2) P.push([nx[4][i], nx[4][i + 1]]);
  }
  if (K(P[P.length - 1][0], P[P.length - 1][1]) !== start) return null;
  P.pop();
  rb.loop = P;
  rb.lc = [P.reduce((a, p) => a + p[0], 0) / P.length, P.reduce((a, p) => a + p[1], 0) / P.length];
  return P;
}
/** is the ring clearly not round (then its island and lines follow the loop instead of a circle)? */
function rbOval(rb) {
  const P = rbLoop(rb);
  if (!P) return false;
  const rs = P.map((p) => Math.hypot(p[0] - rb.lc[0], p[1] - rb.lc[1]));
  return Math.max(...rs) / Math.max(1, Math.min(...rs)) > 1.25;
}
/** distance from x, z to the middle of the ring (the loop for an oval, the circle otherwise) */
function rbDist(rb, x, z) {
  if (!rbOval(rb)) return Math.abs(Math.hypot(x - rb[0], z - rb[1]) - rb[2]);
  const P = rb.loop;
  let m = 1e9;
  for (let i = 0; i < P.length; i++) {
    const a = P[i],
      b = P[(i + 1) % P.length],
      ex = b[0] - a[0],
      ez = b[1] - a[1],
      L2 = ex * ex + ez * ez || 1,
      t = Math.max(0, Math.min(1, ((x - a[0]) * ex + (z - a[1]) * ez) / L2));
    m = Math.min(m, Math.hypot(x - a[0] - ex * t, z - a[1] - ez * t));
  }
  return m;
}
/** the loop moved sideways by off (+ outwards), point by point along its normal */
function rbOffset(rb, off) {
  const P = rb.loop,
    n = P.length,
    [cx, cz] = rb.lc,
    out = [];
  for (let i = 0; i < n; i++) {
    const a = P[(i + n - 1) % n],
      b = P[(i + 1) % n];
    let nx = -(b[1] - a[1]),
      nz = b[0] - a[0];
    const l = Math.hypot(nx, nz) || 1;
    nx /= l;
    nz /= l;
    if ((P[i][0] - cx) * nx + (P[i][1] - cz) * nz < 0) {
      nx = -nx;
      nz = -nz;
    }
    out.push([P[i][0] + nx * off, P[i][1] + nz * off]);
  }
  return out;
}
/** a raised island with a kerb over the polygon Q ([[x, z], …], closed), its top of grass (or paving), with collision */
function raisedIsland(Q, top = 'grass', h = 0.32) {
  if (Q.length < 3) return;
  const cx = Q.reduce((a, p) => a + p[0], 0) / Q.length,
    cz = Q.reduce((a, p) => a + p[1], 0) / Q.length,
    G = acc(cx, cz, top),
    T = acc(cx, cz, 'trim'),
    kc = [0.85, 0.84, 0.8],
    yr = (x, z) => heightAt(x, z) + 0.05,
    C = [cx, heightAt(cx, cz) + h, cz];
  for (let i = 0; i < Q.length; i++) {
    const p = Q[i],
      q = Q[(i + 1) % Q.length],
      A = [p[0], yr(p[0], p[1]) + h, p[1]],
      B = [q[0], yr(q[0], q[1]) + h, q[1]];
    // top: a fan from the middle (both windings, so it shows whichever way the polygon turns)
    G.tri(C, A, B, [C[0] / 4, C[2] / 4], [A[0] / 4, A[2] / 4], [B[0] / 4, B[2] / 4], null, undefined, [0, 1, 0]);
    G.tri(C, B, A, [C[0] / 4, C[2] / 4], [B[0] / 4, B[2] / 4], [A[0] / 4, A[2] / 4], null, undefined, [0, 1, 0]);
    const g0 = yr(p[0], p[1]),
      g1 = yr(q[0], q[1]),
      ex = q[0] - p[0],
      ez = q[1] - p[1],
      l = Math.hypot(ex, ez) || 1;
    let nx = ez / l,
      nz = -ex / l;
    if ((p[0] - cx) * nx + (p[1] - cz) * nz < 0) {
      nx = -nx;
      nz = -nz;
    }
    T.quad([p[0], g0, p[1]], [q[0], g1, q[1]], [q[0], g1 + h, q[1]], [p[0], g0 + h, p[1]], [0, 0], [0, 0], [0, 0], [0, 0], kc, undefined, [
      nx,
      0,
      nz
    ]);
    T.quad([q[0], g1, q[1]], [p[0], g0, p[1]], [p[0], g0 + h, p[1]], [q[0], g1 + h, q[1]], [0, 0], [0, 0], [0, 0], [0, 0], kc, undefined, [
      -nx,
      0,
      -nz
    ]);
    COL.addSeg(p[0], p[1], q[0], q[1], g0 - 1, g0 + h + 0.2);
  }
}
/** the centre island of an oval roundabout (the circle one is roundaboutIsland, 04_world.js) */
function roundaboutIslandLoop(rb) {
  const P = rbLoop(rb);
  if (!P) return;
  const w = ringWidth(rb);
  let off = -(w / 2 + 0.4),
    Q = rbOffset(rb, off);
  // (only streets at ground level: the Padre Anchieta has the tunnel of the Av. de La Trinidad right under its middle)
  const onGround = (x, z) => {
    const seen = new Set();
    for (let k = 0; k < 3; k++) {
      const rd = ROADSEG.nearest(x, z, (r) => r[0] <= 12 && !(r[3] & 6) && !(r[3] & 32) && !seen.has(r));
      if (!rd || rd.d > 14) return false;
      if (!DEP.has(rd.ri) && rd.d < DATA.R[rd.ri][2] / 2 - 0.6) return true;
      seen.add(DATA.R[rd.ri]);
    }
    return false;
  };
  const bad = (Q) => Q.some((p) => onGround(p[0], p[1]));
  for (let k = 0; k < 12 && bad(Q); k++) Q = rbOffset(rb, (off -= 0.5));
  if (bad(Q)) return; // (something runs across the middle: no island)
  raisedIsland(Q, 'grass', 0.35);
  const [cx, cz] = rb.lc;
  TREES.push([cx, cz, 1, 1.1, 1]);
  for (let k = 0; k < Q.length; k += Math.max(1, Math.floor(Q.length / 6))) TREES.push([(Q[k][0] * 2 + cx) / 3, (Q[k][1] * 2 + cz) / 3, 1, 0.9, 1]);
}
/** the lines of an oval ring along its loop: solid by the island, solid outside (open at the arms), dashed in between */
function rbLoopMarks(rb, arms, line) {
  const W = ringWidth(rb),
    open = (x, z) => arms.some((A) => Math.hypot(A.P[0][0] - x, A.P[0][1] - z) < A.w / 2 + 2.5);
  const run = (Q, wid, dash, isOuter) => {
    for (let i = 0; i < Q.length; i++) {
      const a = Q[i],
        b = Q[(i + 1) % Q.length],
        l = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (l < 0.1) continue;
      const dx = (b[0] - a[0]) / l,
        dz = (b[1] - a[1]) / l;
      for (let u = 0; u < l; u += 1.5) {
        const s = Math.min(1.5, l - u),
          x = a[0] + dx * (u + s / 2),
          z = a[1] + dz * (u + s / 2);
        if (dash && Math.floor(u / 1.5) % 2) continue;
        if (isOuter && open(x, z)) continue;
        line(x, z, dx, dz, dash ? s * 0.6 : s + 0.05, wid);
      }
    }
  };
  run(rbOffset(rb, -(W / 2 - 0.35)), 0.15, false, false);
  run(rbOffset(rb, W / 2 - 0.35), 0.15, false, true);
  if (W >= 9) run(rb.loop, 0.12, true, false);
}
/** lane arrows on the entries of two lanes (straight + right on the right lane, straight + left on the left one) */
function rbArrows(rb, arms) {
  const W = ringWidth(rb);
  let n = 0;
  for (const A of arms) {
    if (!A.entry || DEP.has(A.ri)) continue;
    const rd = DATA.R[A.ri],
      ln = DATA.LN && DATA.LN[A.ri] && DATA.LN[A.ri][0] > 0 ? DATA.LN[A.ri][0] : 0,
      lanes = A.oneway ? ln || (A.w >= 6.6 ? 2 : 1) : A.w >= 13 ? 2 : 1;
    if (lanes < 2 || ROADCLASS(rd) === 'paving') continue;
    // a point 13 m out from the ring along the arm
    let pt = null;
    const P = A.P;
    for (let k = 0; k + 1 < P.length && !pt; k++) {
      const [ax, az] = P[k],
        [bx, bz] = P[k + 1],
        L = Math.hypot(bx - ax, bz - az) || 1;
      for (let u = 0; u <= L; u += 0.5) {
        const x = ax + ((bx - ax) * u) / L,
          z = az + ((bz - az) * u) / L;
        if (rbDist(rb, x, z) > W / 2 + 13) {
          pt = [x, z, (bx - ax) / L, (bz - az) / L];
          break;
        }
      }
    }
    if (!pt) continue;
    const [x, z, ox, oz] = pt,
      dx = -ox,
      dz = -oz, // (towards the ring)
      rx = -dz,
      rz = dx; // (the driver's right)
    const half = A.oneway ? 0 : A.w / 4,
      lw = A.oneway ? A.w / 4 : A.w / 8;
    for (const [sg, wid] of [
      [1, 1.7],
      [-1, -1.7]
    ]) {
      const o = half + sg * lw,
        px = x + rx * o,
        pz = z + rz * o;
      if (!onCarriagewayEarly(px, pz, -0.5)) continue;
      CORR_MARKS.push([5, px, pz, dx, dz, 5, wid]);
      n++;
    }
  }
  CEB.flechas = (CEB.flechas || 0) + n;
}

// ---------- v1.4.0 (Jonay: «donde haya un paso de peatones o zonas con cebrado no puede quedar debajo otras marcas viales
// como flechas o separaciones de carril»): each zebra crossing and hatched area is a «clear» area: plain asphalt over the
// lane lines of the road's texture, and no arrow, STOP or «ceda» painted inside it (buildTrafficSignsPart6, 05j_signals.js)
const CLEAR = [];
if (typeof window !== 'undefined') window.__clear = CLEAR; // (sonda_pasos_cebra.py)
/** a clear rectangle: centre x, z, along dx, dz (unit), length along, width across */
function markClear(x, z, dx, dz, len, wid, patch = true) {
  CLEAR.push([x, z, dx, dz, len / 2 + 0.3, wid / 2 + 0.2]);
  if (!patch) return;
  const rx = -dz,
    rz = dx,
    hl = len / 2 + 0.3,
    hw = wid / 2,
    A = acc(x, z, 'asphaltTop'),
    P = (a, b) => {
      const px = x + dx * a + rx * b,
        pz = z + dz * a + rz * b;
      return [px, heightAt(px, pz) + YOFF.asphaltTop, pz];
    },
    q = [P(-hl, -hw), P(-hl, hw), P(hl, hw), P(hl, -hw)];
  A.quad(
    q[0],
    q[1],
    q[2],
    q[3],
    [q[0][0] / 8, q[0][2] / 8],
    [q[1][0] / 8, q[1][2] / 8],
    [q[2][0] / 8, q[2][2] / 8],
    [q[3][0] / 8, q[3][2] / 8],
    null,
    undefined,
    [0, 1, 0]
  );
  A.quad(
    q[0],
    q[3],
    q[2],
    q[1],
    [q[0][0] / 8, q[0][2] / 8],
    [q[3][0] / 8, q[3][2] / 8],
    [q[2][0] / 8, q[2][2] / 8],
    [q[1][0] / 8, q[1][2] / 8],
    null,
    undefined,
    [0, 1, 0]
  );
}
/** is x, z inside a clear area (grown by m)? */
function inClear(x, z, m = 0) {
  for (const [cx, cz, dx, dz, hl, hw] of CLEAR) {
    const ox = x - cx,
      oz = z - cz,
      a = ox * dx + oz * dz,
      b = -ox * dz + oz * dx;
    if (Math.abs(a) <= hl + m && Math.abs(b) <= hw + m) return true;
  }
  return false;
}
