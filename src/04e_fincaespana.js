// ============ La Av. de los Menceyes entre Finca España y Villa Hilaria (v1.3.4) ============
// Jonay (11-nov, con capturas del juego y de Google Maps en X 1287–1732, Y 1591–1880): «esa zona también está rara, se
// cruzan carriles, es un jaleo; cuando reconstruyas una zona aprovecha para ser más fiel a la malla de relieve».
// Real: tres calzadas en paralelo. En medio, una de doble sentido (un carril por sentido) que baja en trinchera y pasa
// por debajo de la glorieta de Finca España; a cada lado, una calzada de un solo sentido con dos carriles que sube a la
// glorieta; entre ellas, medianas con palmeras. En los dos extremos la calzada central se abre en dos ramales de un
// carril que se juntan con las laterales (al oeste, cerca de la C. Pico Cho Canino; al este, antes de Villa Hilaria).
// En el OSM las laterales van a 4–10 m del eje de la central y la mitad de la anchura se pisaba: las líneas se cruzaban.
// Aquí: el eje de la central se toma tal cual; las laterales se ponen a 8,9 m de él (dos carriles de 3,3 m + bordillos,
// y 1,5 m de mediana), fundiéndose con lo que había junto a la glorieta y en los extremos; y cada calzada, a su anchura.
// (functions only: it runs from 01_core.js before this file's constants exist)
function fincaEspanaBox() {
  return [1230, 1745, 1555, 1895];
}
function fincaEspana() {
  const R = DATA.R,
    S = DATA.S,
    B = fincaEspanaBox(),
    inB = (c) => {
      for (let i = 0; i < c.length; i += 2) if (c[i] < B[0] || c[i] > B[1] || c[i + 1] < B[2] || c[i + 1] > B[3]) return false;
      return true;
    },
    key = (x, z) => x + ',' + z,
    sm = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t)),
    out = (DATA.FINCA = { central: [], ramales: [], laterales: [], movidos: 0 });
  // 1. the central two-way road (OSM: three pieces, the middle one a tunnel), chained into one axis
  const cen = [];
  R.forEach((r, ri) => {
    if (r[0] === 5 && r[1] < 0 && !(r[3] & 1) && !(r[3] & 32) && inB(r[4])) cen.push(ri);
  });
  if (!cen.length) return;
  const ends = (ri) => {
    const c = R[ri][4];
    return [key(c[0], c[1]), key(c[c.length - 2], c[c.length - 1])];
  };
  // order the pieces head to tail
  let chain = [cen[0]];
  for (let guard = 0; guard < 10; guard++) {
    const h = ends(chain[0])[0],
      t = ends(chain[chain.length - 1])[1];
    const pre = cen.find((ri) => !chain.includes(ri) && ends(ri)[1] === h),
      post = cen.find((ri) => !chain.includes(ri) && ends(ri)[0] === t);
    if (pre !== undefined) chain.unshift(pre);
    if (post !== undefined) chain.push(post);
    if (pre === undefined && post === undefined) break;
  }
  const ax = [];
  for (const ri of chain) {
    const c = R[ri][4];
    for (let i = ax.length ? 2 : 0; i < c.length; i++) ax.push(c[i]);
  }
  // the one-lane branches at both ends (unnamed one-way secondary pieces touching the chain's ends), and the axis extended
  // to the middle of the two nodes where they meet the main carriageways
  const h0 = key(ax[0], ax[1]),
    t0 = key(ax[ax.length - 2], ax[ax.length - 1]);
  const ram = [];
  R.forEach((r, ri) => {
    if (r[0] !== 5 || r[1] >= 0 || !(r[3] & 1) || r[3] & 32 || !inB(r[4])) return;
    const e = ends(ri);
    if (e[0] === h0 || e[1] === h0 || e[0] === t0 || e[1] === t0) ram.push(ri);
  });
  const far = (atHead) =>
    ram
      .map((ri) => {
        const c = R[ri][4],
          e = ends(ri),
          hk = atHead ? h0 : t0;
        if (e[0] === hk) return [c[c.length - 2], c[c.length - 1]];
        if (e[1] === hk) return [c[0], c[1]];
        return null;
      })
      .filter(Boolean);
  const fw = far(true),
    fe = far(false);
  if (fw.length === 2) ax.unshift((fw[0][0] + fw[1][0]) / 2, (fw[0][1] + fw[1][1]) / 2);
  if (fe.length === 2) ax.push((fe[0][0] + fe[1][0]) / 2, (fe[0][1] + fe[1][1]) / 2);
  // arc length along the axis and projection of a point onto it: [s, signed distance]
  const cum = [0];
  for (let i = 2; i < ax.length; i += 2) cum.push(cum[cum.length - 1] + Math.hypot(ax[i] - ax[i - 2], ax[i + 1] - ax[i - 1]));
  const L = cum[cum.length - 1];
  const proj = (x, z) => {
    let best = null;
    for (let i = 0; i + 3 < ax.length; i += 2) {
      const ex = ax[i + 2] - ax[i],
        ez = ax[i + 3] - ax[i + 1],
        l = Math.hypot(ex, ez) || 1,
        t = Math.max(0, Math.min(1, ((x - ax[i]) * ex + (z - ax[i + 1]) * ez) / (l * l))),
        px = ax[i] + ex * t,
        pz = ax[i + 1] + ez * t,
        d = Math.hypot(x - px, z - pz);
      if (!best || d < best.d) best = { d, s: cum[i / 2] + t * l, px, pz, nx: -ez / l, nz: ex / l, sd: (x - px) * (-ez / l) + (z - pz) * (ex / l) };
    }
    return best;
  };
  // the roundabout of Finca España: the ring pieces (roundabout flag) near the tunnel
  let rc = null;
  {
    const P = [];
    R.forEach((r) => {
      if (!(r[3] & 32) || r[0] > 6 || !inB(r[4])) return;
      for (let i = 0; i < r[4].length; i += 2) P.push([r[4][i], r[4][i + 1]]);
    });
    const tun = chain.find((ri) => R[ri][3] & 4);
    if (tun !== undefined) {
      const c = R[tun][4],
        m = [(c[0] + c[c.length - 2]) / 2, (c[1] + c[c.length - 1]) / 2];
      const near = P.filter((p) => Math.hypot(p[0] - m[0], p[1] - m[1]) < 40);
      if (near.length) rc = [near.reduce((a, p) => a + p[0], 0) / near.length, near.reduce((a, p) => a + p[1], 0) / near.length];
    }
  }
  const sFE = rc ? proj(rc[0], rc[1]).s : -1e9;
  // 2. the side carriageways: named one-way slip pieces (secondary_link) in the box
  const lat = [];
  R.forEach((r, ri) => {
    if (r[0] === 6 && r[3] & 1 && r[1] >= 0 && S[r[1]] === 'Avenida de los Menceyes' && inB(r[4])) lat.push(ri);
  });
  // more points along them (every 8 m), the same in the traffic graph, so the new offset holds on the curves
  const ins = new Map(),
    pk = (a, b, c, d) => a + ',' + b + '|' + c + ',' + d;
  for (const ri of lat) {
    const c = R[ri][4],
      o = [];
    for (let i = 0; i + 3 < c.length; i += 2) {
      const n = Math.floor(Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]) / 8);
      o.push(c[i], c[i + 1]);
      if (n < 2) continue;
      const mid = [];
      for (let k = 1; k < n; k++)
        mid.push(Math.round((c[i] + ((c[i + 2] - c[i]) * k) / n) * 100) / 100, Math.round((c[i + 1] + ((c[i + 3] - c[i + 1]) * k) / n) * 100) / 100);
      ins.set(pk(c[i], c[i + 1], c[i + 2], c[i + 3]), mid);
      o.push(...mid);
    }
    o.push(c[c.length - 2], c[c.length - 1]);
    R[ri][4] = o;
  }
  {
    const N = DATA.G.n;
    for (const e of DATA.G.e) {
      const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
        o = [];
      let any = false;
      for (let i = 0; i + 3 < P.length; i += 2) {
        if (i) o.push(P[i], P[i + 1]);
        const f = ins.get(pk(P[i], P[i + 1], P[i + 2], P[i + 3])),
          b = ins.get(pk(P[i + 2], P[i + 3], P[i], P[i + 1]));
        if (f) {
          o.push(...f);
          any = true;
        } else if (b) {
          for (let k = b.length - 2; k >= 0; k -= 2) o.push(b[k], b[k + 1]);
          any = true;
        }
      }
      if (any) e[6] = o;
    }
  }
  // the new place of each point of the side carriageways: 8.9 m from the axis, faded out within 30 m of the ends and
  // of the roundabout (where they meet the ring and the main carriageways as they were)
  const OFF = 8.9,
    shift = new Map();
  for (const ri of lat) {
    const c = R[ri][4];
    for (let i = 0; i < c.length; i += 2) {
      const p = proj(c[i], c[i + 1]);
      if (!p || Math.abs(p.sd) < 1 || p.d > 25) continue;
      const w = Math.min(sm(p.s / 35), sm((L - p.s) / 35), sm((Math.abs(p.s - sFE) - 32) / 25));
      if (w <= 0) continue;
      const sg = Math.sign(p.sd),
        nd = p.sd + (sg * OFF - p.sd) * w;
      const nx = p.px + p.nx * nd,
        nz = p.pz + p.nz * nd;
      if (Math.hypot(nx - c[i], nz - c[i + 1]) < 0.05) continue;
      shift.set(key(c[i], c[i + 1]), [Math.round(nx * 100) / 100, Math.round(nz * 100) / 100]);
    }
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
  out.movidos = shift.size;
  // 3. widths and lanes: the central road one lane each way, the branches one lane, the sides two lanes
  DATA.LN = DATA.LN || {};
  const W = new Map(),
    set = (ri, lanes, w) => {
      R[ri][2] = w;
      DATA.LN[ri] = [lanes, 0, 0];
      W.set(ri, w);
    };
  for (const ri of chain) set(ri, 2, 7.4);
  for (const ri of ram) set(ri, 1, 4.6);
  for (const ri of lat) set(ri, 2, 7.4);
  const N = DATA.G.n;
  for (const e of DATA.G.e) {
    if (e[2] !== 5 && e[2] !== 6) continue;
    const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
      h = (P.length >> 2) << 1,
      x = (P[h] + P[h - 2]) / 2,
      z = (P[h + 1] + P[h - 1]) / 2;
    if (x < B[0] || x > B[1] || z < B[2] || z > B[3]) continue;
    for (const [ri, w] of W) if (polyMinDist(R[ri][4], x, z) < 1.5) e[4] = Math.min(e[4], w);
  }
  out.central = chain;
  out.ramales = ram;
  out.laterales = lat;
  out.eje = Math.round(L);
  out.glorieta = rc && rc.map(Math.round);
  console.log('finca españa:', JSON.stringify(out));
}
