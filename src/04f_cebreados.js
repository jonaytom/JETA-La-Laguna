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
function cebArea(P, wp, Q, wq, u0, maxU, maxGap = 7) {
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
  const F = acc(E[0][0][0], E[0][0][1], 'asphalt'),
    y = (p) => heightAt(p[0], p[1]) + YOFF.asphalt - 0.004;
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
  for (let i = 0; i + 1 < E.length; i++) for (const k of [0, 1]) line(inset(i, k), inset(i + 1, k), 0.15);
  for (let i = 1; i + 2 < E.length; i += 2) {
    const j = Math.min(E.length - 1, i + 2);
    if (E[i][2] < 1.0) continue;
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
        de = Math.hypot(c[c.length - 2] - cx, c[c.length - 1] - cz),
        ds = Math.hypot(c[0] - cx, c[1] - cz);
      if (Math.abs(de - Rc) < ringWidth(rb) / 2 + 2) ins.push({ r, c: cebRev(c), ang: Math.atan2(c[c.length - 1] - cz, c[c.length - 2] - cx) });
      else if (Math.abs(ds - Rc) < ringWidth(rb) / 2 + 2) outs.push({ r, c, ang: Math.atan2(c[1] - cz, c[0] - cx) });
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
        if (Math.hypot(p[0] - cx, p[1] - cz) > Ro + 0.8 && Math.hypot(q[0] - cx, q[1] - cz) > Ro + 0.8) break;
      }
      if (cebArea(a.c, a.r[2], best.c, best.r[2], u0, u0 + 30, 10)) {
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
  window.__ceb = CEB;
  console.log('cebreados: isletas', CEB.isletas, 'cuñas', CEB.cunas);
}
