// ============ La glorieta de La Verdellada y la Vía de Ronda (v1.3.2) ============
// Jonay (10-nov, con fotos de Google Maps): «la rotonda de la Verdellada hay que mejorarla, así como los carriles de la
// Vía de Ronda». Real: la TF-13 (Vía de Ronda) pasa en trinchera, 2 + 2 carriles, por debajo del puente que une la
// glorieta con C. Arturo Vergara y C. Emilio Gutiérrez Salazar; la glorieta y las dos vías de servicio (un carril cada
// una, que bajan a la TF-13 al norte y al sur) están a nivel de la calle. En el juego la TF-13 iba a ras de suelo, y para
// dejar paso por debajo del puente se subían el puente, la glorieta y sus calles 4–5 m sobre taludes; las vías de
// servicio tenían 9 m (dos carriles con raya) y la TF-13 17 m.
// Aquí: anchos de verdad (antes de construir nada) y la TF-13 hundida 6,5 m bajo el puente (como tf13Bowl, por sitio).
// (01_core.js calls in here before 04_world.js has defined polyLen)
function verdLen(c) {
  let L = 0;
  for (let i = 2; i < c.length; i += 2) L += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]);
  return L;
}
// the box of the zone: x0, x1, z0, z1 (X, Y of the game); a function, not a const (01_core.js runs before this file)
function verdBox() {
  return [640, 760, 690, 960];
}
function verdInBox(c) {
  const [x0, x1, z0, z1] = verdBox();
  for (let i = 0; i < c.length; i += 2) if (c[i] < x0 || c[i] > x1 || c[i + 1] < z0 || c[i + 1] > z1) return false;
  return true;
}
// called from 01_core.js after the general widening (the state goes in DATA.VERD: this file is read after 01_core)
function verdelladaWidths() {
  const S = DATA.S,
    V = (DATA.VERD = { ronda: -1, side: [], ring: [], cut: -1, bridge: -1 });
  DATA.R.forEach((r, ri) => {
    const nm = r[1] >= 0 ? S[r[1]] : '';
    if (r[0] === 3 && nm === 'Vía de Ronda de La Laguna' && verdInBox(r[4]) && verdLen(r[4]) > 150) {
      V.ronda = ri;
      r[2] = 14.4; // 2 + 2 lanes (was 17.2)
    } else if (r[0] === 4 && r[3] & 1 && nm === '' && verdInBox(r[4])) {
      V.side.push(ri);
      r[2] = 5.2; // the service roads: one lane (were 9.1, drawn as two)
    } else if (r[3] & 32 && r[0] <= 12 && verdInBox(r[4]) && verdLen(r[4]) < 60) {
      V.ring.push(ri);
      r[2] = Math.min(r[2], 8.5); // the ring of the roundabout, a lane and a half like the real one (was 11)
    }
  });
  // the traffic graph: the same widths on its edges along these roads
  const W = new Map();
  [V.ronda, ...V.side, ...V.ring].forEach((ri) => ri >= 0 && W.set(ri, DATA.R[ri][2]));
  const N = DATA.G.n;
  for (const e of DATA.G.e) {
    const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
      h = (P.length >> 2) << 1,
      x = (P[h] + P[h - 2]) / 2,
      z = (P[h + 1] + P[h - 1]) / 2;
    const B = verdBox();
    if (x < B[0] || x > B[1] || z < B[2] || z > B[3]) continue;
    for (const [ri, w] of W) if (polyMinDist(DATA.R[ri][4], x, z) < 1.5) e[4] = Math.min(e[4], w);
  }
  console.log('verdellada: anchos', JSON.stringify(V));
  menceyesWidths();
}
// v1.3.2 (Jonay, X 251, Y 854 y X 578, Y 1244: «la avenida de los Menceyes es dos carriles en cada sentido; en el sentido
// de bajada no hay aparcamiento, ni en el de subida por la zona central que divide ambos sentidos; solo hay aparcamiento
// en algunas zonas a la derecha del sentido de marcha»): each one-way half at 2 lanes (it was 11.7 m, with a parking
// lane on both sides); parking only on the right, and only where the OSM says so (DATA.LN [lanes, left, right])
function menceyesWidths() {
  const S = DATA.S;
  DATA.LN = DATA.LN || {};
  const W = new Map();
  DATA.R.forEach((r, ri) => {
    if (r[1] < 0 || S[r[1]] !== 'Avenida de los Menceyes' || !(r[3] & 1) || (r[0] !== 5 && r[0] !== 6)) return;
    const ln = DATA.LN[ri],
      lanes = r[0] === 6 ? (ln && ln[0] > 0 ? ln[0] : 1) : 2,
      right = ln && ln[2] > 0 ? 1 : 0;
    DATA.LN[ri] = [lanes, 0, right];
    r[2] = Math.round((lanes * 3.3 + 0.8 + right * 2.3) * 10) / 10;
    W.set(ri, r[2]);
  });
  const N = DATA.G.n;
  if (W.size)
    for (const e of DATA.G.e) {
      if (e[2] !== 5 && e[2] !== 6) continue;
      const P = [N[e[0] * 2], N[e[0] * 2 + 1], ...(e[6] || []), N[e[1] * 2], N[e[1] * 2 + 1]],
        h = (P.length >> 2) << 1,
        x = (P[h] + P[h - 2]) / 2,
        z = (P[h + 1] + P[h - 1]) / 2;
      for (const [ri, w] of W) if (polyMinDist(DATA.R[ri][4], x, z) < 1.5) e[4] = Math.min(e[4], w);
    }
  console.log('menceyes: calzadas a 2 carriles', W.size);
}
// called from computeDepressions (04_world.js), like tf13Bowl: the TF-13 down a cutting under the bridge of the roundabout
function verdelladaCut() {
  const V = DATA.VERD;
  if (!V || V.ronda < 0) return;
  const c = DATA.R[V.ronda][4],
    L = polyLen(c);
  // where a bridge crosses it
  let s0 = -1,
    acc = 0;
  for (let i = 0; i + 3 < c.length && s0 < 0; i += 2) {
    const ax = c[i],
      az = c[i + 1],
      bx = c[i + 2],
      bz = c[i + 3],
      sl = Math.hypot(bx - ax, bz - az);
    DATA.R.forEach((r, rj) => {
      if (s0 >= 0 || !(r[3] & 2) || r[0] > 12) return;
      const d = r[4];
      for (let k = 0; k + 3 < d.length; k += 2) {
        const t = segX(ax, az, bx, bz, d[k], d[k + 1], d[k + 2], d[k + 3]);
        if (t !== null) {
          s0 = acc + t * sl;
          V.bridge = rj;
          return;
        }
      }
    });
    acc += sl;
  }
  if (s0 < 0) return;
  const D = 6.5,
    P = 16, // flat bottom each side of the bridge
    Ra = Math.max(30, s0 - P - 10), // ramps back to grade 10 m before the junctions at both ends
    Rb = Math.max(30, L - s0 - P - 10);
  const raw = (d) => (d <= 0 ? 0 : d / 1.12 + 0.5); // (depthOf() flattens the first 0.5 m and scales by 1.12)
  DEP.set(V.ronda, [
    (s) => {
      const f = s < s0 - P ? smooth(0, 1, (s - (s0 - P - Ra)) / Ra) : s > s0 + P ? smooth(0, 1, (s0 + P + Rb - s) / Rb) : 1;
      return raw(D * f);
    }
  ]);
  V.cut = V.ronda;
  V.s0 = Math.round(s0);
  console.log('verdellada: TF-13 en trinchera bajo el puente', V.bridge, 's', V.s0, 'de', Math.round(L));
}
// where segment a-b crosses segment c-d: t along a-b, or null
function segX(ax, az, bx, bz, cx, cz, dx, dz) {
  const rx = bx - ax,
    rz = bz - az,
    sx = dx - cx,
    sz = dz - cz,
    den = rx * sz - rz * sx;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((cx - ax) * sz - (cz - az) * sx) / den,
    u = ((cx - ax) * rz - (cz - az) * rx) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? t : null;
}
