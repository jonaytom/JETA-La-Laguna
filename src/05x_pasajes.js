// v0.78: pasajes peatonales que atraviesan edificios por debajo (OSM tunnel=building_passage en caminos peatonales):
// Pasaje Teide, Pasaje Aguere, el de La Concepción y algunos más. El edificio se levanta encima: la fachada tiene un
// hueco de ~3,5 m de alto donde entra el pasaje, dentro hay paredes, techo con luz y (en Teide y Aguere) tiendas y bares
// parodia a los lados. Las colisiones dejan pasar por el hueco y siguen las paredes del pasaje.
// v0.78.1 (Jonay): el Pasaje Aguere tiene dos niveles. De Herradores se llega al patio redondo a nivel de calle; dos
// escaleras curvas (izquierda y derecha) bajan rodeando el patio hasta la galería baja, que va llana hasta Calle El Juego
// (~5 m más abajo). Todo va bajo edificio salvo el patio, abierto al cielo. La cámara no sube por encima del techo del
// pasaje (antes se metía en el edificio hueco y parecía transparente) y las paredes se ven por las dos caras.
const PASAJES = { segs: null, built: [], zones: [], CLR: 3.5 };
const PASAJE_TIENDAS = {
  'Pasaje Teide': [['BAR EL GUANCHITO', '#7a1f1f', '#ffe9a8'], ['ZAPATERÍA TEIDEFINITIVO', '#1d3557', '#ffffff'], ['COPISTERÍA EL PASAJE', '#2a9d8f', '#ffffff'], ['CHURRERÍA LA BRUMA', '#e9c46a', '#3d2b1f']],
  'Pasaje Aguere': [['CAFETERÍA AGUERITA', '#5c3d2e', '#ffe0b2'], ['MÓVILES GUANCHÓFONO', '#264653', '#8ef9f3'], ['KIOSKO EL ATAJO', '#bc4749', '#ffffff'], ['TASCA EL SOPORTAL', '#3a5a40', '#fefae0']],
};
// pedestrian ways marked as passages (tunnel flag) that stay at street level
function pasajeSegs() {
  if (PASAJES.segs) return PASAJES.segs; const out = [];
  DATA.R.forEach((rd, ri) => { if (rd[0] <= 12 || !(rd[3] & 4)) return; const c = rd[4]; const name = rd[1] >= 0 ? STR[rd[1]] : ''; const hw = PASAJE_TIENDAS[name] ? 1.9 : Math.max(1.3, rd[2] / 2); /* the casco galleries are ~4 m wide (OSM gives 6) */
    for (let i = 0; i < c.length - 2; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); if (L > 0.3) out.push({ ri, ax: c[i], az: c[i + 1], bx: c[i + 2], bz: c[i + 3], L, hw, name }); } });
  return (PASAJES.segs = out);
}
// v0.78.1: inside a passage under a building or in the lower gallery of Aguere (no street lamps there)
function pasajeNear(x, z) { for (const s of pasajeSegs()) if (Math.abs(x - s.ax) < s.L + 3 && Math.abs(z - s.az) < s.L + 3 && segDist(x, z, s) < s.hw + 0.6) return true; return inAguereLow(x, z, 0.6); }
function segDist(x, z, s) { const dx = s.bx - s.ax, dz = s.bz - s.az; const t = clamp(((x - s.ax) * dx + (z - s.az) * dz) / (s.L * s.L), 0, 1); return Math.hypot(x - s.ax - dx * t, z - s.az - dz * t); }
// the passage segments that run through this footprint (null if none, or if the building is too low to walk under)
function pasajesOf(pts, H) {
  if (H < 5.2) return null; const flat = pts.flat(); let res = null;
  let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (const p of pts) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); }
  for (const s of pasajeSegs()) {
    if (Math.max(s.ax, s.bx) < x0 - 2 || Math.min(s.ax, s.bx) > x1 + 2 || Math.max(s.az, s.bz) < z0 - 2 || Math.min(s.az, s.bz) > z1 + 2) continue;
    const n = Math.ceil(s.L / 0.5); for (let k = 0; k <= n; k++) { const t = k / n; if (pip(s.ax + (s.bx - s.ax) * t, s.az + (s.bz - s.az) * t, flat)) { (res || (res = [])).push(s); break; } }
  }
  return res;
}
// parts [t0,t1] of the wall edge p→q that open onto a passage
function pasajeCuts(p, q, segs) {
  const L = Math.hypot(q[0] - p[0], q[1] - p[1]); const n = Math.max(2, Math.ceil(L / 0.1)); const out = []; let a = -1;
  for (let k = 0; k <= n; k++) { const t = k / n, x = p[0] + (q[0] - p[0]) * t, z = p[1] + (q[1] - p[1]) * t; const inn = segs.some((s) => segDist(x, z, s) < s.hw);
    if (inn && a < 0) a = t; if ((!inn || k === n) && a >= 0) { const b = inn ? t : (k - 1) / n; if ((b - a) * L > 0.6) out.push([a, b]); a = -1; } }
  return out.length ? out : null;
}
// floor of the passage at a point: the street, or the lower gallery of Pasaje Aguere
function pasajeFloor(x, z) { return inAguereLow(x, z, 0) ? atrioFrame(atrioList()[0]).yL : heightAt(x, z); }
// facade edge with holes: the full wall outside the holes, the wall above the passage roof over them (UV continuous)
function pasajeWall(A, p, q, cuts, bot, wallTop, bmin, fh, nb, col, ex, out) {
  const P = (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; let t = 0; const v0 = (bot - bmin) / fh, v1 = (wallTop - bmin) / fh;
  const piece = (ta, tb, y0, va) => { if (tb - ta < 1e-4) return; const a = P(ta), b = P(tb); A.quad([a[0], y0, a[1]], [b[0], y0, b[1]], [b[0], wallTop, b[1]], [a[0], wallTop, a[1]], [nb * ta, va], [nb * tb, va], [nb * tb, v1], [nb * ta, v1], col, ex, out); };
  for (const [a, b] of cuts) { piece(t, a, bot, v0); const m = P((a + b) / 2), y = pasajeFloor(m[0], m[1]) + PASAJES.CLR; if (y < wallTop - 0.5) piece(a, b, Math.max(y, bot), (Math.max(y, bot) - bmin) / fh); t = b; }
  piece(t, 1, bot, v0);
}
// collision segments of an edge, leaving the passage holes open (over the lower gallery, closed for whoever is up in the street)
function pasajeCol(p, q, cuts) { let t = 0; const P = (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const add = (a, b, y0, y1) => { if (b - a < 1e-4) return; const A = P(a), B = P(b); COL.addSeg(A[0], A[1], B[0], B[1], y0, y1); };
  for (const [a, b] of cuts) { add(t, a); const m = P((a + b) / 2); if (inAguereLow(m[0], m[1], 0)) { const yL = atrioFrame(atrioList()[0]).yL; if (heightAt(m[0], m[1]) - yL > 1.0) add(a, b, yL + PASAJES.CLR - 0.2, 1e9); } t = b; } add(t, 1); }
// inside: side walls, ceiling, a light strip, shop fronts; collisions along the sides
function pasajeInterior(segs, pts, cx, cz, wallCol) {
  const flat = pts.flat();
  for (const s of segs) {
    // runs of the centre line inside the footprint (a little past the facade so the walls meet it); the patio and the
    // lower gallery of Aguere are built by buildAtrio
    const n = Math.ceil(s.L / 0.25); let a = -1; const runs = [];
    for (let k = 0; k <= n; k++) { const t = k / n, x = s.ax + (s.bx - s.ax) * t, z = s.az + (s.bz - s.az) * t, inn = pip(x, z, flat) && !inAtrio(x, z, 0.2) && !inAguereLow(x, z, 0); if (inn && a < 0) a = t; if ((!inn || k === n) && a >= 0) { runs.push([a, inn ? t : (k - 1) / n]); a = -1; } }
    for (const [t0, t1] of runs) pasajeRun(s, Math.max(0, t0 - 0.3 / s.L), Math.min(1, t1 + 0.3 / s.L), cx, cz, wallCol);
  }
}
// one straight run of gallery: walls (both faces), ceiling, light, optional floor, shops. yf = floor height
function pasajeRun(s, t0, t1, cx, cz, wallCol, yf = heightAt, floor = false) {
  const W = acc(cx, cz, 'trim'), Lt = acc(cx, cz, 'tunnelLight'); const wc = [wallCol[0] * 0.9, wallCol[1] * 0.9, wallCol[2] * 0.9], cc = [0.82, 0.8, 0.76];
  const ux = (s.bx - s.ax) / s.L, uz = (s.bz - s.az) / s.L, nx = -uz, nz = ux;
  const len = (t1 - t0) * s.L; if (len < 0.8) return;
  const pa = [s.ax + (s.bx - s.ax) * t0, s.az + (s.bz - s.az) * t0], pb = [s.ax + (s.bx - s.ax) * t1, s.az + (s.bz - s.az) * t1];
  const ga = yf(pa[0], pa[1]), gb = yf(pb[0], pb[1]), C = PASAJES.CLR, low = yf !== heightAt;
  PASAJES.zones.push({ ax: pa[0], az: pa[1], bx: pb[0], bz: pb[1], ga, gb, hw: s.hw });
  for (const sd of [-1, 1]) { const ox = nx * s.hw * sd, oz = nz * s.hw * sd; const inn = [-nx * sd, 0, -nz * sd], outw = [nx * sd, 0, nz * sd];
    const A0 = [pa[0] + ox, ga - 0.2, pa[1] + oz], B0 = [pb[0] + ox, gb - 0.2, pb[1] + oz], B1 = [pb[0] + ox, gb + C, pb[1] + oz], A1 = [pa[0] + ox, ga + C, pa[1] + oz];
    W.quad(A0, B0, B1, A1, [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, inn); W.quad(A0, A1, B1, B0, [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, outw); // both faces (from outside it looked see-through)
    if (low) COL.addSeg(pa[0] + ox * 0.92, pa[1] + oz * 0.92, pb[0] + ox * 0.92, pb[1] + oz * 0.92, Math.min(ga, gb) - 0.5, Math.max(ga, gb) + C);
    else COL.addSeg(pa[0] + ox * 0.92, pa[1] + oz * 0.92, pb[0] + ox * 0.92, pb[1] + oz * 0.92); }
  const hx = nx * s.hw, hz = nz * s.hw;
  W.quad([pb[0] + hx, gb + C, pb[1] + hz], [pb[0] - hx, gb + C, pb[1] - hz], [pa[0] - hx, ga + C, pa[1] - hz], [pa[0] + hx, ga + C, pa[1] + hz], [0, 0], [0, 0], [0, 0], [0, 0], cc, undefined, [0, -1, 0]);
  W.quad([pb[0] + hx, gb + C + 0.02, pb[1] + hz], [pb[0] - hx, gb + C + 0.02, pb[1] - hz], [pa[0] - hx, ga + C + 0.02, pa[1] - hz], [pa[0] + hx, ga + C + 0.02, pa[1] + hz], [0, 0], [0, 0], [0, 0], [0, 0], cc, undefined, [0, 1, 0]);
  if (floor) W.quad([pb[0] + hx, gb + 0.03, pb[1] + hz], [pb[0] - hx, gb + 0.03, pb[1] - hz], [pa[0] - hx, ga + 0.03, pa[1] - hz], [pa[0] + hx, ga + 0.03, pa[1] + hz], [0, 0], [0, 0], [0, 0], [0, 0], [0.6, 0.32, 0.25], undefined, [0, 1, 0]); // red tiles (photos)
  const lx = nx * 0.18, lz = nz * 0.18;
  Lt.quad([pb[0] + lx, gb + C - 0.03, pb[1] + lz], [pb[0] - lx, gb + C - 0.03, pb[1] - lz], [pa[0] - lx, ga + C - 0.03, pa[1] - lz], [pa[0] + lx, ga + C - 0.03, pa[1] + lz], [0, 0], [0, 0], [0, 0], [0, 0], null, undefined, [0, -1, 0]);
  PASAJES.built.push({ name: s.name, x: (pa[0] + pb[0]) / 2, z: (pa[1] + pb[1]) / 2, len: +len.toFixed(1), ancho: +(s.hw * 2).toFixed(1), y: +((ga + gb) / 2).toFixed(1) });
  // shops and bars on both sides (the named passages of the casco)
  const shops = PASAJE_TIENDAS[s.name]; if (!shops || len < 5) return;
  let k = 0; for (let d = 2.2; d < len - 2.2; d += 4.6) for (const sd of [-1, 1]) {
    const sh = shops[(k++) % shops.length]; const t = t0 + d / s.L * 1, px = s.ax + ux * (t * s.L) + nx * (s.hw - 0.04) * sd, pz = s.az + uz * (t * s.L) + nz * (s.hw - 0.04) * sd; const g = lerp(ga, gb, clamp(d / len, 0, 1));
    const fw = Math.min(3.2, len - 1), inn = [-nx * sd, 0, -nz * sd]; const ex = ux * fw / 2, ez = uz * fw / 2; const ix = -nx * sd * 0.02, iz = -nz * sd * 0.02;
    const Q = (o, y) => [px + ex * o + ix, g + y, pz + ez * o + iz];
    const glass = [0.16, 0.22, 0.27], frame = [0.12, 0.12, 0.13];
    W.quad(Q(-1.06, -0.05), Q(1.06, -0.05), Q(1.06, 2.55), Q(-1.06, 2.55), [0, 0], [0, 0], [0, 0], [0, 0], frame, undefined, inn);
    const Q2 = (o, y) => [px + ex * o + ix * 2, g + y, pz + ez * o + iz * 2];
    W.quad(Q2(-0.95, 0.35), Q2(0.95, 0.35), Q2(0.95, 2.4), Q2(-0.95, 2.4), [0, 0], [0, 0], [0, 0], [0, 0], glass, undefined, inn);
    const sg = bigSign(sh[0], fw * 0.95, 0.55, sh[1], sh[2]); sg.position.set(px - nx * sd * 0.06, g + 2.92, pz - nz * sd * 0.06); sg.rotation.y = Math.atan2(-nx * sd, -nz * sd); scene.add(sg);
  }
}
// ceiling over the player in a passage (null if not in one): the camera stays under it
function pasajeCeilAt(x, z, py) {
  for (const q of PASAJES.zones) { if (Math.abs(x - q.ax) > 40 && Math.abs(x - q.bx) > 40) continue;
    const dx = q.bx - q.ax, dz = q.bz - q.az, L2 = dx * dx + dz * dz || 1; const t = ((x - q.ax) * dx + (z - q.az) * dz) / L2; if (t < -0.02 || t > 1.02) continue;
    if (Math.hypot(x - q.ax - dx * t, z - q.az - dz * t) > q.hw + 0.3) continue; const f = lerp(q.ga, q.gb, clamp(t, 0, 1));
    if (py > f - 0.6 && py < f + PASAJES.CLR) return f + PASAJES.CLR; }
  return null;
}
// the galleries that OSM leaves open to the sky (Pasaje Teide / Aguere: from Obispo Rey Redondo, under Herradores'
// blocks, to Calle El Juego by the old Cine Aguere): a building block is put over the walkway where nothing covers it,
// except where it crosses an open street
function pasajeCovers() {
  let made = 0; const street = (r) => !(r[3] & 4) && r[0] <= 13;
  const inBuild = (x, z) => BUILD.some((b) => Math.abs(b.cx - x) < 60 && Math.abs(b.cz - z) < 60 && pip(x, z, b.pts.flat()));
  const onStreet = (x, z) => { const rn = ROADSEG.nearest(x, z, street); return !!rn && rn.d < DATA.R[rn.ri][2] / 2 + 0.2; };
  const runsOf = (s, open) => { const n = Math.max(2, Math.ceil(s.L / 0.5)); let a = -1; const runs = [];
    for (let k = 0; k <= n; k++) { const t = k / n, o = open(s.ax + (s.bx - s.ax) * t, s.az + (s.bz - s.az) * t);
      if (o && a < 0) a = t; if ((!o || k === n) && a >= 0) { const b = o ? t : (k - 1) / n; if ((b - a) * s.L > 1) runs.push([a, b]); a = -1; } }
    return runs; };
  for (const s of pasajeSegs()) {
    if (!PASAJE_TIENDAS[s.name]) continue;
    for (const [t0, t1] of runsOf(s, (x, z) => !inBuild(x, z) && !onStreet(x, z) && !inAtrio(x, z, 0.3) && !inAguereLow(x, z, 0))) { pasajeBlock(s, t0, t1); made++; }
  }
  // the lower gallery of Aguere (v0.78.1): walls and roof where it runs under a building or under the ground; a block
  // over it where its roof would stick out of the ground in the open; nothing out in the street (Calle El Juego)
  const a = atrioList()[0];
  if (a && a.built) { const F = atrioFrame(a), C = PASAJES.CLR, wcol = hex3('#e8dcc2'); const shallow = (x, z) => heightAt(x, z) - F.yL < C + 0.3;
    for (const s of F.segs) {
      for (const [t0, t1] of runsOf(s, (x, z) => !inAtrio(x, z, 0) && (inBuild(x, z) || !shallow(x, z)))) { const e = 0.3 / s.L, P0 = (t) => [s.ax + (s.bx - s.ax) * t, s.az + (s.bz - s.az) * t];
        const ta = inAtrio(...P0(Math.max(0, t0 - e)), 0) ? t0 : Math.max(0, t0 - e), tb = Math.min(1, t1 + e); pasajeRun(s, ta, tb, (s.ax + s.bx) / 2, (s.az + s.bz) / 2, wcol, () => F.yL, true); }
      for (const [t0, t1] of runsOf(s, (x, z) => !inBuild(x, z) && !onStreet(x, z) && !inAtrio(x, z, 0.3) && shallow(x, z))) { pasajeBlock(s, t0, t1, () => F.yL, true); made++; } } }
  return made;
}
function pasajeBlock(s, t0, t1, yf = heightAt, run = true) {
  const ux = (s.bx - s.ax) / s.L, uz = (s.bz - s.az) / s.L, nx = -uz, nz = ux; const C = PASAJES.CLR, HW = 3.4;
  const pa = [s.ax + ux * s.L * t0, s.az + uz * s.L * t0], pb = [s.ax + ux * s.L * t1, s.az + uz * s.L * t1]; const cx = (pa[0] + pb[0]) / 2, cz = (pa[1] + pb[1]) / 2;
  const ga = yf(pa[0], pa[1]), gb = yf(pb[0], pb[1]); const top = Math.max(ga, gb, heightAt(cx, cz)) + C + 7.2; const atlas = 0, [bay, fh] = FSTY[atlas]; const col = hex3('#e8dcc2');
  const A = acc(cx, cz, 'facade'), R = acc(cx, cz, 'roofFlat'), T = acc(cx, cz, 'trim');
  const P = (p, o) => [p[0] + nx * o, p[1] + nz * o];
  const face = (p, q, g0, g1, y0, out) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 0.05) return; const nb = Math.max(1, Math.round(L / bay)); const v0 = (y0 - g0) / fh, v1 = (top - g0) / fh;
    A.quad([p[0], g0 + (y0 - g0), p[1]], [q[0], g1 + (y0 - g0), q[1]], [q[0], top, q[1]], [p[0], top, p[1]], [0, v0], [nb, v0], [nb, v1], [0, v1], col, [atlas, (made_ = (made_ + 7) % 97)], out); };
  // the block over the walkway: facades on all four sides from the gallery roof up, flat roof
  const a1 = P(pa, -HW), a2 = P(pa, HW), b1 = P(pb, -HW), b2 = P(pb, HW);
  face(a1, b1, ga, gb, ga + C, [-nx, 0, -nz]); face(b2, a2, gb, ga, ga + C, [nx, 0, nz]);
  face(a2, a1, ga, ga, ga + C, [-ux, 0, -uz]); face(b1, b2, gb, gb, gb + C, [ux, 0, uz]);
  R.quad([a1[0], top, a1[1]], [b1[0], top, b1[1]], [b2[0], top, b2[1]], [a2[0], top, a2[1]], [a1[0] / 4, a1[1] / 4], [b1[0] / 4, b1[1] / 4], [b2[0] / 4, b2[1] / 4], [a2[0] / 4, a2[1] / 4], [0.78, 0.76, 0.72], undefined, [0, 1, 0]);
  // underside beyond the gallery walls and the piers at both ends (so the opening is the gallery, not the whole block)
  const uc = [0.7, 0.68, 0.64];
  for (const sd of [-1, 1]) { const i0 = P(pa, s.hw * sd), o0 = P(pa, HW * sd), i1 = P(pb, s.hw * sd), o1 = P(pb, HW * sd);
    T.quad([i0[0], ga + C, i0[1]], [o0[0], ga + C, o0[1]], [o1[0], gb + C, o1[1]], [i1[0], gb + C, i1[1]], [0, 0], [0, 0], [0, 0], [0, 0], uc, undefined, [0, -1, 0]);
    for (const [p, g, o, d] of [[pa, ga, -1, [-ux, 0, -uz]], [pb, gb, 1, [ux, 0, uz]]]) { const i = P(p, s.hw * sd), e = P(p, HW * sd);
      A.quad([i[0], g - 0.3, i[1]], [e[0], g - 0.3, e[1]], [e[0], g + C, e[1]], [i[0], g + C, i[1]], [0, -0.1], [0.5, -0.1], [0.5, C / fh], [0, C / fh], col, [atlas, 3], d);
      COL.addSeg(i[0], i[1], e[0], e[1]); } }
  if (run) pasajeRun(s, t0, t1, cx, cz, col, yf);
  PASAJES.built.push({ name: s.name, cubierta: true, x: Math.round(cx), z: Math.round(cz), len: +((t1 - t0) * s.L).toFixed(1) });
}
let made_ = 0;
// the OSM ribbon of a passage path, without the parts that run in the patio or down in the lower gallery
function pasajeRibbonParts(rd, c) {
  if (rd[1] < 0 || STR[rd[1]] !== 'Pasaje Aguere' || !atrioList().length) return [c];
  const out = []; let cur = null;
  for (let i = 0; i < c.length - 2; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]), n = Math.max(1, Math.ceil(L / 0.5));
    for (let k = i ? 1 : 0; k <= n; k++) { const t = k / n, x = c[i] + (c[i + 2] - c[i]) * t, z = c[i + 1] + (c[i + 3] - c[i + 1]) * t;
      const ok = !inAtrio(x, z, 0.3) && !inAguereLow(x, z, 0.2);
      if (ok) { if (!cur) out.push(cur = []); cur.push(x, z); } else cur = null; } }
  return out.filter((p) => p.length >= 4);
}

// ---------- the open patio of the old Cine Aguere, half way along Pasaje Aguere (Jonay's photos, 19-oct): round hole to
// the sky through the block, a curved glass front with the cinema's band and sign, a big painted face on the wall above;
// two curved stairs (left and right) go down round the patio to the lower gallery (red tiles, shops with grilles)
const ATRIOS = [];
function atrioList() {
  if (ATRIOS.done) return ATRIOS; ATRIOS.done = true;
  const poi = (DATA.P || []).find((p) => p[0] >= 0 && STR[p[0]] === 'Aguere Cultural'); if (!poi) return ATRIOS;
  let best = null; for (const s of pasajeSegs()) { if (s.name !== 'Pasaje Aguere') continue; const d = segDist(poi[2], poi[3], s); if (!best || d < best.d) best = { s, d }; }
  if (!best || best.d > 8) return ATRIOS; const s = best.s; const t = clamp(((poi[2] - s.ax) * (s.bx - s.ax) + (poi[3] - s.az) * (s.bz - s.az)) / (s.L * s.L), 0.2, 0.8);
  ATRIOS.push({ x: s.ax + (s.bx - s.ax) * t, z: s.az + (s.bz - s.az) * t, r: 6.3, s, ux: (s.bx - s.ax) / s.L, uz: (s.bz - s.az) / s.L, name: 'Aguere' });
  return ATRIOS;
}
function inAtrio(x, z, m = 0) { for (const a of atrioList()) if (Math.hypot(x - a.x, z - a.z) < a.r + m) return a; return null; }
// geometry of the patio: U points to Herradores (the upper side), psi = angle from U towards +N; the lower gallery
// leaves by the mouth at psi = π and follows the Aguere pieces down to Calle El Juego
function atrioFrame(a) {
  if (a.F) return a.F;
  let ux = a.ux, uz = a.uz; const ends = []; for (const s of pasajeSegs()) if (s.name === 'Pasaje Aguere') ends.push([s.ax, s.az], [s.bx, s.bz]);
  let lo = null; for (const p of ends) { const h = heightAt(p[0], p[1]); if (!lo || h < lo.h) lo = { p, h }; }
  if (lo && (lo.p[0] - a.x) * ux + (lo.p[1] - a.z) * uz > 0) { ux = -ux; uz = -uz; }
  const nx = -uz, nz = ux, r = a.r, C = PASAJES.CLR;
  const P = (u, v) => [a.x + ux * u + nx * v, a.z + uz * u + nz * v], pol = (rho, psi) => P(rho * Math.cos(psi), rho * Math.sin(psi));
  const uOf = (p) => (p[0] - a.x) * ux + (p[1] - a.z) * uz, thU = Math.atan2(ux, uz);
  const line = [P(-r + 1.2, 0)];
  for (const p of ends.filter((q) => uOf(q) < -r - 0.5).sort((p, q) => uOf(q) - uOf(p))) { const l = line[line.length - 1]; if (Math.hypot(p[0] - l[0], p[1] - l[1]) > 0.6) line.push(p); }
  if (line.length < 2) line.push(P(-r - 4, 0));
  const ex = line[line.length - 1], yU = heightAt(...P(r - 1.9, 0)); const yL = Math.min(heightAt(ex[0], ex[1]), yU - 2.5);
  const segs = []; for (let i = 0; i < line.length - 1; i++) { const p = line[i], q = line[i + 1], L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L > 0.3) segs.push({ ax: p[0], az: p[1], bx: q[0], bz: q[1], L, hw: 1.9, name: 'Pasaje Aguere', low: true }); }
  return (a.F = { ux, uz, nx, nz, P, pol, uOf, th: (psi) => thU - psi /* CylinderGeometry angle of the direction psi */, line, segs, yL, yU, C, hw: 1.9, phi0: 1.08, phi1: 2.7, rs: 5.3, sw: 1.6 });
}
// in the lower gallery of Pasaje Aguere (from the patio's mouth to Calle El Juego)
function inAguereLow(x, z, m = 0.6) { const a = atrioList()[0]; if (!a) return false; const F = atrioFrame(a); for (const s of F.segs) if (segDist(x, z, s) < s.hw + m) return true; return false; }
// the roof hole of a building that holds a patio (null if none)
function atrioHole(pts) { const flat = pts.flat(); for (const a of atrioList()) if (pip(a.x, a.z, flat)) { a.inBuilding = true; const h = []; for (let i = 0; i < 28; i++) { const t = -i / 28 * Math.PI * 2; h.push([a.x + Math.cos(t) * a.r, a.z + Math.sin(t) * a.r]); } return { hole: h, a }; } return null; }
function atrioCanvas(kind, w, h, label) {
  const c = mkCanvas(w, h), x = c.getContext('2d');
  if (kind === 'glass') { x.fillStyle = '#1b2227'; x.fillRect(0, 0, w, h); for (let i = 0; i < 14; i++) { const X = i * w / 14; const g = x.createLinearGradient(X, 0, X + w / 14, h); g.addColorStop(0, '#5d7486'); g.addColorStop(0.5, '#27323a'); g.addColorStop(1, '#3c4b55'); x.fillStyle = g; x.fillRect(X + 4, 4, w / 14 - 8, h - 8);
      if (i % 3 === 1) { x.fillStyle = ['#c0392b', '#e6c229', '#2e86ab'][i % 4 % 3]; x.fillRect(X + 12, h * 0.45, w / 14 - 24, h * 0.35); } }
    x.fillStyle = '#2c2a28'; for (let i = 0; i <= 14; i++) x.fillRect(i * w / 14 - 3, 0, 6, h); x.fillRect(0, h * 0.32, w, 5); }
  else if (kind === 'band') { x.fillStyle = '#2f3133'; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(255,255,255,0.05)'; for (let i = 0; i < 400; i++) x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    if (label) { x.fillStyle = '#f2f2f2'; x.font = `600 ${h * 0.55}px Oswald, Arial`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(label, w * 0.5 + h * 0.2, h * 0.52); x.beginPath(); x.arc(w * 0.5 + h * 0.75, h * 0.5, h * 0.32, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f3133'; x.beginPath(); x.moveTo(w * 0.5 + h * 0.62, h * 0.5); x.lineTo(w * 0.5 + h * 0.86, h * 0.32); x.lineTo(w * 0.5 + h * 0.86, h * 0.68); x.fill(); } }
  else if (kind === 'mural') { // a painted face (generic): dark wall, skin-toned face, big pale-blue eyes
    x.fillStyle = '#3a3c3f'; x.fillRect(0, 0, w, h); const cx = w / 2, cy = h * 0.62;
    x.fillStyle = '#2a211c'; x.beginPath(); x.ellipse(cx, cy - h * 0.05, w * 0.27, h * 0.62, 0, 0, Math.PI * 2); x.fill();
    const g = x.createRadialGradient(cx, cy, h * 0.1, cx, cy, w * 0.25); g.addColorStop(0, '#e9b48f'); g.addColorStop(1, '#a8694a'); x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy + h * 0.05, w * 0.21, h * 0.58, 0, 0, Math.PI * 2); x.fill();
    for (const sd of [-1, 1]) { const ex = cx + sd * w * 0.085, ey = cy - h * 0.06;
      x.strokeStyle = '#3a2618'; x.lineWidth = h * 0.035; x.beginPath(); x.moveTo(ex - w * 0.06, ey - h * 0.13 - sd * 0); x.quadraticCurveTo(ex, ey - h * 0.2, ex + w * 0.06, ey - h * 0.12); x.stroke();
      x.fillStyle = '#f4efe9'; x.beginPath(); x.ellipse(ex, ey, w * 0.055, h * 0.075, 0, 0, Math.PI * 2); x.fill();
      const ig = x.createRadialGradient(ex, ey, 1, ex, ey, h * 0.07); ig.addColorStop(0, '#dff3ff'); ig.addColorStop(0.5, '#6aa9d6'); ig.addColorStop(1, '#2b5d86'); x.fillStyle = ig; x.beginPath(); x.arc(ex, ey, h * 0.065, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#101418'; x.beginPath(); x.arc(ex, ey, h * 0.022, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(ex + h * 0.015, ey - h * 0.02, h * 0.01, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = 'rgba(120,60,40,0.5)'; x.beginPath(); x.moveTo(cx, cy - h * 0.02); x.lineTo(cx - w * 0.02, cy + h * 0.16); x.lineTo(cx + w * 0.02, cy + h * 0.16); x.fill(); }
  else if (kind === 'grille') { x.fillStyle = '#1a1716'; x.fillRect(0, 0, w, h); x.strokeStyle = '#3d3532'; x.lineWidth = 5; for (let i = 0; i < w; i += 22) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); } for (let j = 0; j < h; j += 40) { x.beginPath(); x.moveTo(0, j); x.lineTo(w, j); x.stroke(); } }
  const t = canvasTex(c, { repeat: false }); t.repeat.x = -1; t.offset.x = 1; return t; // seen from inside the ring: unmirrored (the band read «OTIЯÜGA»)
}
// the patio itself (called from buildBuildings for the block that holds it)
function buildAtrio(a, top, cx, cz) {
  const F = atrioFrame(a), { pol, th, yL, yU, C, rs, sw, phi0, phi1 } = F, r = a.r, PI = Math.PI;
  const W = acc(a.x, a.z, 'trim'); const up = [0, 1, 0];
  const M = (tex, col = 0xffffff, rough = 0.85, emis = 0) => new THREE.MeshStandardMaterial({ map: tex || null, color: col, roughness: rough, side: THREE.BackSide, emissive: emis ? 0xffffff : 0x000000, emissiveMap: emis ? tex : null, emissiveIntensity: emis });
  // a piece of the ring (psi from A to B, height y0..y1), seen from inside
  const arc = (A, B, y0, y1, mat, rr = r) => { if (B - A < 1e-3 || y1 - y0 < 0.02) return null; const m = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr, y1 - y0, Math.max(3, Math.ceil((B - A) / (2 * PI) * 56)), 1, true, th(B), B - A), mat); m.position.set(a.x, (y0 + y1) / 2, a.z); m.receiveShadow = true; scene.add(m); return m; };
  const mh = Math.asin(Math.min(0.95, (F.hw + 0.15) / r)), Y0 = top + 0.4; // half width of the openings (Herradores at psi 0, the lower gallery at psi π)
  const dark = M(null, 0x3a3c3f, 0.95), stoneM = M(null, 0x8a8178, 0.92);
  // lower storey (patio floor to the landing): all round but the mouth of the lower gallery; the cinema's band over it
  arc(PI + mh, 3 * PI - mh, yL - 0.3, yU + 0.05, stoneM);
  arc(PI - mh, PI + mh, yL + C, yU + 0.05, M(atrioCanvas('band', 512, 160, 'AGÜERITO'), 0xffffff, 0.9, 0.08));
  const grille = M(atrioCanvas('grille', 256, 256), 0xffffff, 0.7); arc(PI - 1.25, PI - mh - 0.04, yL, yL + 2.6, grille, r - 0.04); arc(PI + mh + 0.04, PI + 1.25, yL, yL + 2.6, grille, r - 0.04); // shops with grilles down below
  // upper storeys: open at street level towards Herradores; on the El Juego half the curved glass front, band, mural
  const g0 = PI / 2 + 0.2, g1 = 3 * PI / 2 - 0.2;
  arc(mh, g0, yU, Y0, dark); arc(g1, 2 * PI - mh, yU, Y0, dark); arc(-mh, mh, yU + C, Y0, dark);
  const glassT = atrioCanvas('glass', 1024, 256);
  arc(g0, g1, yU, yU + 3, M(glassT, 0xffffff, 0.25, 0.12), r - 0.05); arc(g0, g1, yU + 3, yU + 4, M(atrioCanvas('band', 1024, 96, 'AGÜERITO'), 0xffffff, 0.9, 0.08), r - 0.05);
  arc(g0, g1, yU + 4, yU + 6.6, M(glassT, 0xffffff, 0.25, 0.1), r - 0.05); arc(g0, g1, yU + 6.6, Y0, dark);
  { const h = Math.min(7, top - yU - 7.6); if (h > 2.5) arc(PI - 0.8, PI + 0.8, yU + 7.5, yU + 7.5 + h, M(atrioCanvas('mural', 512, 512), 0xffffff, 0.9), r - 0.1); }
  // patio floor (red tiles)
  { const fg = new THREE.CircleGeometry(r - 0.01, 48); fg.rotateX(-PI / 2); const fl = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ color: 0xa05a46, roughness: 0.8 })); fl.position.set(a.x, yL + 0.03, a.z); fl.receiveShadow = true; scene.add(fl); }
  const stone = [0.56, 0.55, 0.52], iron = [0.13, 0.13, 0.14], pave = [0.64, 0.62, 0.58];
  const V = (p, y) => [p[0], y, p[1]];
  const both = (A, B, Cc, D, col) => { W.quad(A, B, Cc, D, [0, 0], [0, 0], [0, 0], [0, 0], col); W.quad(A, D, Cc, B, [0, 0], [0, 0], [0, 0], [0, 0], col); };
  const rail = (p, q, yp, yq) => { // iron railing: top and middle bars, posts every ~1 m
    for (const [h0, h1] of [[0.95, 1.02], [0.48, 0.53]]) both(V(p, yp + h0), V(q, yq + h0), V(q, yq + h1), V(p, yp + h1), iron);
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.max(1, Math.round(L / 1.0)), ex = (q[0] - p[0]) / L * 0.025, ez = (q[1] - p[1]) / L * 0.025;
    for (let k = 0; k <= n; k++) { const f = k / n, x = p[0] + (q[0] - p[0]) * f, z = p[1] + (q[1] - p[1]) * f, y = yp + (yq - yp) * f; both([x - ex, y, z - ez], [x + ex, y, z + ez], [x + ex, y + 1.0, z + ez], [x - ex, y + 1.0, z - ez], iron); } };
  // landing at street level on the Herradores side, between the tops of the two stairs, with its railing over the patio
  const rin = rs - sw / 2, rout = r - 0.08;
  { const L = [pol(rin, -phi0), pol(rout, -phi0)]; for (let k = 1; k < 20; k++) L.push(pol(rout, -phi0 + 2 * phi0 * k / 20)); L.push(pol(rout, phi0), pol(rin, phi0));
    const c0 = pol(4.4, 0), hy = (p) => heightAt(p[0], p[1]) + 0.04;
    for (let i = 0; i < L.length - 1; i++) W.tri(V(c0, hy(c0)), V(L[i], hy(L[i])), V(L[i + 1], hy(L[i + 1])), [0, 0], [0, 0], [0, 0], pave, undefined, up);
    W.tri(V(c0, hy(c0)), V(L[L.length - 1], hy(L[L.length - 1])), V(L[0], hy(L[0])), [0, 0], [0, 0], [0, 0], pave, undefined, up);
    const p = pol(rin, -phi0), q = pol(rin, phi0); W.quad(V(p, yL), V(q, yL), V(q, hy(q)), V(p, hy(p)), [0, 0], [0, 0], [0, 0], [0, 0], stone, undefined, [-F.ux, 0, -F.uz]); // its front over the patio
    rail(p, q, hy(p), hy(q)); COL.addSeg(p[0], p[1], q[0], q[1], yU - 0.6, yU + 2.2);
    { const gm = new THREE.MeshStandardMaterial({ map: atrioCanvas('grille', 256, 256), roughness: 0.7 }); const L = Math.hypot(q[0] - p[0], q[1] - p[1]); // two shops with grilles under the landing (photos)
      for (const f of [0.27, 0.73]) { const pl = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(3, L * 0.4), 2.6), gm); pl.position.set(p[0] + (q[0] - p[0]) * f - F.ux * 0.03, yL + 1.33, p[1] + (q[1] - p[1]) * f - F.uz * 0.03); pl.rotation.y = Math.atan2(-F.ux, -F.uz); scene.add(pl); } } }
  // the two curved stairs, left and right, from the landing down round the patio to its floor
  const N = Math.max(10, Math.round((yU - yL) / 0.18)), hS = (yU - yL) / N, dphi = (phi1 - phi0) / N;
  for (const sd of [-1, 1]) {
    const ps = (rho, phi) => pol(rho, sd * phi);
    for (let i = 0; i < N; i++) { const fa = phi0 + i * dphi, fb = fa + dphi, y = yU - (i + 1) * hS;
      const Ai = ps(rin, fa), Ao = ps(rout, fa), Bi = ps(rin, fb), Bo = ps(rout, fb);
      W.quad(V(Ai, y), V(Bi, y), V(Bo, y), V(Ao, y), [0, 0], [0, 0], [0, 0], [0, 0], stone, undefined, up); // tread
      both(V(Ai, y), V(Ao, y), V(Ao, y + hS), V(Ai, y + hS), [stone[0] * 0.9, stone[1] * 0.9, stone[2] * 0.9]); // riser
      both(V(Ai, yL), V(Bi, yL), V(Bi, y), V(Ai, y), [stone[0] * 0.85, stone[1] * 0.85, stone[2] * 0.85]); // the solid side towards the patio
      COL.addSeg(Ai[0], Ai[1], Bi[0], Bi[1], yL - 0.1, y + 1.2);
      if (i % 2 === 0) { const j = Math.min(N, i + 2), Ci = ps(rin + 0.06, phi0 + j * dphi), Di = ps(rin + 0.06, fa); rail(Di, Ci, y + hS * 0.5, yU - j * hS + hS * 0.5); } }
    const pts = []; for (let k = 0; k <= 18; k++) { const f = k / 18, p = ps(rs, phi0 + (phi1 - phi0) * f); pts.push([p[0], p[1], Math.max(yL + 0.1, yU - (yU - yL) * f - hS / 2 + 0.05)]); }
    TUNNEL_DECKS.push({ type: 'path', pts, w: sw + 0.2, hw: sw / 2 + 0.25, tunnel: true, stairs: true });
  }
  // walkable floors: the patio (a disc) and the lower gallery out to Calle El Juego
  TUNNEL_DECKS.push({ type: 'path', pts: [[a.x, a.z, yL + 0.1], [a.x + 0.01, a.z, yL + 0.1]], w: 2 * (r - 0.3), hw: r - 0.3, tunnel: true, capped: true, patio: true });
  TUNNEL_DECKS.push({ type: 'path', pts: F.line.map((p) => [p[0], p[1], yL + 0.1]), w: 2 * F.hw + 0.2, hw: F.hw, tunnel: true, ceil: C - 0.3 });
  // terrain hidden in the patio and where the gallery runs shallow (near Calle El Juego)
  TCUTS.push([a.x, a.z, a.x + 0.01, a.z, r + 0.2, 9603]);
  for (const s of F.segs) { const n = Math.max(1, Math.ceil(s.L / 1)); let k0 = -1;
    for (let k = 0; k <= n; k++) { const t = k / n, x = s.ax + (s.bx - s.ax) * t, z = s.az + (s.bz - s.az) * t, sh = heightAt(x, z) - yL < C + 0.3 && !inAtrio(x, z, 0);
      if (sh && k0 < 0) k0 = k; if ((!sh || k === n) && k0 >= 0) { const k1 = sh ? k : k - 1; if (k1 > k0) TCUTS.push([s.ax + (s.bx - s.ax) * k0 / n, s.az + (s.bz - s.az) * k0 / n, s.ax + (s.bx - s.ax) * k1 / n, s.az + (s.bz - s.az) * k1 / n, s.hw + 0.3, 9604]); k0 = -1; } } }
  // ring collisions: open towards Herradores up on the street, and at the mouth of the lower gallery down below
  const ring = (A, B, y0, y1) => { const n = Math.max(1, Math.ceil((B - A) / 0.25)); for (let i = 0; i < n; i++) { const p = pol(r - 0.15, A + (B - A) * i / n), q = pol(r - 0.15, A + (B - A) * (i + 1) / n); COL.addSeg(p[0], p[1], q[0], q[1], y0, y1); } };
  ring(mh, PI - mh); ring(PI + mh, 2 * PI - mh); ring(-mh, mh, -1e9, yU - 0.6); ring(PI - mh, PI + mh, yL + C - 0.2, 1e9);
  // (the lower gallery's walls, roof and shops are built by pasajeCovers, once every building is known)
  a.built = { x: Math.round(a.x), z: Math.round(a.z), r, yU: +yU.toFixed(2), yL: +yL.toFixed(2), escaleras: 2, peldanos: N, galeria_baja: +F.segs.reduce((t, s) => t + s.L, 0).toFixed(1), salida: F.line[F.line.length - 1].map((v) => Math.round(v)) };
}
