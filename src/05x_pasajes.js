// v0.78: pasajes peatonales que atraviesan edificios por debajo (OSM tunnel=building_passage en caminos peatonales):
// Pasaje Teide, Pasaje Aguere, el de La Concepción y algunos más. El edificio se levanta encima: la fachada tiene un
// hueco de ~3,5 m de alto donde entra el pasaje, dentro hay paredes, techo con luz y (en Teide y Aguere) tiendas y bares
// parodia a los lados. Las colisiones dejan pasar por el hueco y siguen las paredes del pasaje.
const PASAJES = { segs: null, built: [], CLR: 3.5 };
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
// facade edge with holes: the full wall outside the holes, the wall above the passage roof over them (UV continuous)
function pasajeWall(A, p, q, cuts, bot, wallTop, bmin, fh, nb, col, ex, out) {
  const P = (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; let t = 0; const v0 = (bot - bmin) / fh, v1 = (wallTop - bmin) / fh;
  const piece = (ta, tb, y0, va) => { if (tb - ta < 1e-4) return; const a = P(ta), b = P(tb); A.quad([a[0], y0, a[1]], [b[0], y0, b[1]], [b[0], wallTop, b[1]], [a[0], wallTop, a[1]], [nb * ta, va], [nb * tb, va], [nb * tb, v1], [nb * ta, v1], col, ex, out); };
  for (const [a, b] of cuts) { piece(t, a, bot, v0); const m = P((a + b) / 2), y = heightAt(m[0], m[1]) + PASAJES.CLR; if (y < wallTop - 0.5) piece(a, b, y, (y - bmin) / fh); t = b; }
  piece(t, 1, bot, v0);
}
// collision segments of an edge, leaving the passage holes open
function pasajeCol(p, q, cuts) { let t = 0; const P = (t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  const add = (a, b) => { if (b - a < 1e-4) return; const A = P(a), B = P(b); COL.addSeg(A[0], A[1], B[0], B[1]); };
  for (const [a, b] of cuts) { add(t, a); t = b; } add(t, 1); }
// inside: side walls, ceiling, a light strip, shop fronts; collisions along the sides
function pasajeInterior(segs, pts, cx, cz, wallCol) {
  const flat = pts.flat();
  for (const s of segs) {
    // runs of the centre line inside the footprint (a little past the facade so the walls meet it)
    const n = Math.ceil(s.L / 0.25); let a = -1; const runs = [];
    for (let k = 0; k <= n; k++) { const t = k / n, x = s.ax + (s.bx - s.ax) * t, z = s.az + (s.bz - s.az) * t, inn = pip(x, z, flat) && !inAtrio(x, z, 0.2); if (inn && a < 0) a = t; if ((!inn || k === n) && a >= 0) { runs.push([a, inn ? t : (k - 1) / n]); a = -1; } }
    for (const [t0, t1] of runs) pasajeRun(s, Math.max(0, t0 - 0.3 / s.L), Math.min(1, t1 + 0.3 / s.L), cx, cz, wallCol);
  }
}
function pasajeRun(s, t0, t1, cx, cz, wallCol) {
  const W = acc(cx, cz, 'trim'), Lt = acc(cx, cz, 'tunnelLight'); const wc = [wallCol[0] * 0.9, wallCol[1] * 0.9, wallCol[2] * 0.9], cc = [0.82, 0.8, 0.76];
  const ux = (s.bx - s.ax) / s.L, uz = (s.bz - s.az) / s.L, nx = -uz, nz = ux;
  {
      const len = (t1 - t0) * s.L; if (len < 0.8) return;
      const pa = [s.ax + (s.bx - s.ax) * t0, s.az + (s.bz - s.az) * t0], pb = [s.ax + (s.bx - s.ax) * t1, s.az + (s.bz - s.az) * t1];
      const ga = heightAt(pa[0], pa[1]), gb = heightAt(pb[0], pb[1]), C = PASAJES.CLR;
      for (const sd of [-1, 1]) { const ox = nx * s.hw * sd, oz = nz * s.hw * sd; const inn = [-nx * sd, 0, -nz * sd];
        const A0 = [pa[0] + ox, ga - 0.2, pa[1] + oz], B0 = [pb[0] + ox, gb - 0.2, pb[1] + oz], B1 = [pb[0] + ox, gb + C, pb[1] + oz], A1 = [pa[0] + ox, ga + C, pa[1] + oz];
        if (sd < 0) W.quad(A0, B0, B1, A1, [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, inn); else W.quad(B0, A0, A1, B1, [0, 0], [0, 0], [0, 0], [0, 0], wc, undefined, inn);
        COL.addSeg(pa[0] + ox * 0.92, pa[1] + oz * 0.92, pb[0] + ox * 0.92, pb[1] + oz * 0.92); }
      const hx = nx * s.hw, hz = nz * s.hw;
      W.quad([pb[0] + hx, gb + C, pb[1] + hz], [pb[0] - hx, gb + C, pb[1] - hz], [pa[0] - hx, ga + C, pa[1] - hz], [pa[0] + hx, ga + C, pa[1] + hz], [0, 0], [0, 0], [0, 0], [0, 0], cc, undefined, [0, -1, 0]);
      const lx = nx * 0.18, lz = nz * 0.18;
      Lt.quad([pb[0] + lx, gb + C - 0.03, pb[1] + lz], [pb[0] - lx, gb + C - 0.03, pb[1] - lz], [pa[0] - lx, ga + C - 0.03, pa[1] - lz], [pa[0] + lx, ga + C - 0.03, pa[1] + lz], [0, 0], [0, 0], [0, 0], [0, 0], null, undefined, [0, -1, 0]);
      PASAJES.built.push({ name: s.name, x: (pa[0] + pb[0]) / 2, z: (pa[1] + pb[1]) / 2, len: +len.toFixed(1), ancho: +(s.hw * 2).toFixed(1) });
      // shops and bars on both sides (the named passages of the casco)
      const shops = PASAJE_TIENDAS[s.name]; if (!shops || len < 5) return;
      let k = 0; for (let d = 2.2; d < len - 2.2; d += 4.6) for (const sd of [-1, 1]) {
        const sh = shops[(k++) % shops.length]; const t = t0 + d / s.L * 1, px = s.ax + ux * (t * s.L) + nx * (s.hw - 0.04) * sd, pz = s.az + uz * (t * s.L) + nz * (s.hw - 0.04) * sd; const g = heightAt(px, pz);
        const fw = Math.min(3.2, len - 1), inn = [-nx * sd, 0, -nz * sd]; const ex = ux * fw / 2, ez = uz * fw / 2; const ix = -nx * sd * 0.02, iz = -nz * sd * 0.02;
        const Q = (o, y) => [px + ex * o + ix, g + y, pz + ez * o + iz];
        const glass = [0.16, 0.22, 0.27], frame = [0.12, 0.12, 0.13];
        if (sd < 0) { W.quad(Q(-1.06, -0.05), Q(1.06, -0.05), Q(1.06, 2.55), Q(-1.06, 2.55), [0, 0], [0, 0], [0, 0], [0, 0], frame, undefined, inn); }
        else { W.quad(Q(1.06, -0.05), Q(-1.06, -0.05), Q(-1.06, 2.55), Q(1.06, 2.55), [0, 0], [0, 0], [0, 0], [0, 0], frame, undefined, inn); }
        const Q2 = (o, y) => [px + ex * o + ix * 2, g + y, pz + ez * o + iz * 2];
        if (sd < 0) W.quad(Q2(-0.95, 0.35), Q2(0.95, 0.35), Q2(0.95, 2.4), Q2(-0.95, 2.4), [0, 0], [0, 0], [0, 0], [0, 0], glass, undefined, inn);
        else W.quad(Q2(0.95, 0.35), Q2(-0.95, 0.35), Q2(-0.95, 2.4), Q2(0.95, 2.4), [0, 0], [0, 0], [0, 0], [0, 0], glass, undefined, inn);
        const sg = bigSign(sh[0], fw * 0.95, 0.55, sh[1], sh[2]); sg.position.set(px - nx * sd * 0.06, g + 2.92, pz - nz * sd * 0.06); sg.rotation.y = Math.atan2(-nx * sd, -nz * sd); scene.add(sg);
      }
  }
}
// the galleries that OSM leaves open to the sky (Pasaje Teide / Aguere: from Obispo Rey Redondo, under Herradores'
// blocks, to Calle El Juego by the old Cine Aguere): a building block is put over the walkway where nothing covers it,
// except where it crosses an open street
function pasajeCovers() {
  let made = 0; const street = (r) => !(r[3] & 4) && r[0] <= 13;
  const inBuild = (x, z) => BUILD.some((b) => Math.abs(b.cx - x) < 60 && Math.abs(b.cz - z) < 60 && pip(x, z, b.pts.flat()));
  const onStreet = (x, z) => { const rn = ROADSEG.nearest(x, z, street); return !!rn && rn.d < DATA.R[rn.ri][2] / 2 + 0.2; };
  for (const s of pasajeSegs()) {
    if (!PASAJE_TIENDAS[s.name]) continue;
    const n = Math.max(2, Math.ceil(s.L / 0.5)); let a = -1; const runs = [];
    for (let k = 0; k <= n; k++) { const t = k / n, x = s.ax + (s.bx - s.ax) * t, z = s.az + (s.bz - s.az) * t; const open = !inBuild(x, z) && !onStreet(x, z);
      if (open && a < 0) a = t; if ((!open || k === n) && a >= 0) { const b = open ? t : (k - 1) / n; if ((b - a) * s.L > 1) runs.push([a, b]); a = -1; } }
    for (const [t0, t1] of runs) { pasajeBlock(s, t0, t1); made++; }
  }
  return made;
}
function pasajeBlock(s, t0, t1) {
  const ux = (s.bx - s.ax) / s.L, uz = (s.bz - s.az) / s.L, nx = -uz, nz = ux; const C = PASAJES.CLR, HW = 3.4;
  const pa = [s.ax + ux * s.L * t0, s.az + uz * s.L * t0], pb = [s.ax + ux * s.L * t1, s.az + uz * s.L * t1]; const cx = (pa[0] + pb[0]) / 2, cz = (pa[1] + pb[1]) / 2;
  const ga = heightAt(pa[0], pa[1]), gb = heightAt(pb[0], pb[1]); const top = Math.max(ga, gb) + C + 7.2; const atlas = 0, [bay, fh] = FSTY[atlas]; const col = hex3('#e8dcc2');
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
  pasajeRun(s, t0, t1, cx, cz, col);
  PASAJES.built.push({ name: s.name, cubierta: true, x: Math.round(cx), z: Math.round(cz), len: +((t1 - t0) * s.L).toFixed(1) });
}
let made_ = 0;

// ---------- the open patio of the old Cine Aguere, half way along Pasaje Aguere (Jonay's photos, 19-oct): round hole to
// the sky through the block, a curved two-storey glass front with the cinema's band and sign, a big painted face on the
// wall above, and stairs going down to the lower gallery (red tiles, shops with grilles, a column) behind a railing
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
  return canvasTex(c, { repeat: false });
}
// the patio itself (called from buildBuildings for the block that holds it): inner walls, glass front, sign, mural, stairs
function buildAtrio(a, top, cx, cz) {
  const C = PASAJES.CLR, g = heightAt(a.x, a.z), r = a.r; const nx = -a.uz, nz = a.ux; // perpendicular: glass front on the − side, stairs on the + side
  const angOf = (dx, dz) => Math.atan2(dx, dz); // CylinderGeometry: vertex = (r sin θ, ·, r cos θ)
  const aOpen = Math.asin(Math.min(0.95, (a.s.hw + 0.1) / r)); const along = angOf(a.ux, a.uz), back = along + Math.PI; const side = angOf(-nx, -nz);
  const cyl = (h, y0, t0, tl, mat) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 40, 1, true, t0, tl), mat); m.position.set(a.x, y0 + h / 2, a.z); m.receiveShadow = true; scene.add(m); return m; };
  const M = (tex, col = 0xffffff, rough = 0.85, emis = 0) => new THREE.MeshStandardMaterial({ map: tex || null, color: col, roughness: rough, side: THREE.BackSide, emissive: emis ? 0xffffff : 0x000000, emissiveMap: emis ? tex : null, emissiveIntensity: emis });
  const dark = M(null, 0x3a3c3f, 0.95);
  // walls: full ring above the gallery roof, two arcs below it between the passage openings
  cyl(top - (g + C) + 0.4, g + C, 0, Math.PI * 2, dark);
  const arc1 = [along + aOpen, Math.PI - 2 * aOpen], arc2 = [back + aOpen, Math.PI - 2 * aOpen]; // (each arc: from one opening to the other)
  // which arc faces the glass side (−n)?
  const mid1 = along + Math.PI / 2; const glassArc = Math.cos(mid1 - side) > 0 ? arc1 : arc2, wallArc = glassArc === arc1 ? arc2 : arc1;
  cyl(C + 0.3, g - 0.3, wallArc[0], wallArc[1], dark);
  const glassT = atrioCanvas('glass', 1024, 256), bandT = atrioCanvas('band', 1024, 96, 'AGÜERITO'), muralT = atrioCanvas('mural', 512, 512), b2 = atrioCanvas('band', 1024, 64);
  const gr = r - 0.05;
  const gc = (h, y0, tex, rough, e) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(gr, gr, h, 40, 1, true, glassArc[0], glassArc[1]), M(tex, 0xffffff, rough, e)); m.position.set(a.x, y0 + h / 2, a.z); scene.add(m); };
  gc(3.1, g - 0.1, glassT, 0.25, 0.12); gc(1.0, g + 3.0, bandT, 0.9, 0.08); gc(2.6, g + 4.0, glassT, 0.25, 0.1); gc(0.8, g + 6.6, b2, 0.9, 0);
  { const tl = Math.min(glassArc[1], 1.6), t0 = glassArc[0] + (glassArc[1] - tl) / 2; const h = Math.min(7, top - g - 7.6); if (h > 2.5) { const m = new THREE.Mesh(new THREE.CylinderGeometry(gr, gr, h, 30, 1, true, t0, tl), M(muralT, 0xffffff, 0.9)); m.position.set(a.x, g + 7.5 + h / 2, a.z); scene.add(m); } }
  // floor of the patio (red tiles) where the ribbon of the passage doesn't reach
  { const sh = new THREE.Shape(); for (let i = 0; i <= 40; i++) { const t = i / 40 * Math.PI * 2, x = a.x + Math.cos(t) * (r - 0.02), z = a.z + Math.sin(t) * (r - 0.02); if (i) sh.lineTo(x, -z); else sh.moveTo(x, -z); }
    const hp = new THREE.Path(); [[-2.6, 3.1], [2.6, 3.1], [2.6, 5.4], [-2.6, 5.4]].forEach(([u, v], i) => { const x = a.x + a.ux * u + nx * v, z = a.z + a.uz * u + nz * v; if (i) hp.lineTo(x, -z); else hp.moveTo(x, -z); }); sh.holes.push(hp);
    const fg = new THREE.ShapeGeometry(sh); fg.rotateX(-Math.PI / 2); const fl = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ color: 0xa05a46, roughness: 0.8, side: THREE.DoubleSide })); fl.position.y = g + 0.03; fl.receiveShadow = true; scene.add(fl); }
  // collisions: the lower arcs
  for (const [t0, tl] of [glassArc, wallArc]) { const n = 10; for (let i = 0; i < n; i++) { const p = t0 + tl * i / n, q = t0 + tl * (i + 1) / n; COL.addSeg(a.x + Math.sin(p) * (r - 0.2), a.z + Math.cos(p) * (r - 0.2), a.x + Math.sin(q) * (r - 0.2), a.z + Math.cos(q) * (r - 0.2)); } }
  // stairs down on the + side: terrain cut, steps, side walls, the lower gallery (red tiles, grilles, a column), railing
  const P = (u, v) => [a.x + a.ux * u + nx * v, a.z + a.uz * u + nz * v]; const v0 = 3.1, v1 = 5.4, u0 = -2.6, u1 = 2.6, D = 3.4;
  { const p = P(u0 + 0.4, (v0 + v1) / 2), q = P(u1 - 0.4, (v0 + v1) / 2); TCUTS.push([p[0], p[1], q[0], q[1], (v1 - v0) / 2 + 0.1, 9500]); }
  const stone = new THREE.MeshStandardMaterial({ color: 0x8d8a85, roughness: 0.9 }), red = new THREE.MeshStandardMaterial({ color: 0x9c4f3c, roughness: 0.8 }), iron = new THREE.MeshStandardMaterial({ color: 0x232323, roughness: 0.5, metalness: 0.6 });
  const box = (w, h, d, u, y, v, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); const [x, z] = P(u, v); m.position.set(x, g + y, z); m.rotation.y = Math.atan2(a.ux, a.uz); scene.add(m); return m; };
  const ns = 16; for (let i = 0; i < ns; i++) { const t = (i + 0.5) / ns; box(v1 - v0, D / ns, (u1 - u0 - 1.4) / ns + 0.02, 0, 0, 0, stone).position.set(...(() => { const [x, z] = P(u1 - 0.3 - t * (u1 - u0 - 1.4), (v0 + v1) / 2); return [x, g - t * D - D / ns / 2 + 0.01, z]; })()); }
  box(v1 - v0, 0.1, 1.2, u0 + 0.6, -D - 0.05, (v0 + v1) / 2, red); // landing
  for (const v of [v0, v1]) box(0.12, D + 0.2, u1 - u0, 0, -D / 2 - 0.1, v, stone);
  box(v1 - v0, D + 0.2, 0.12, u0, -D / 2 - 0.1, (v0 + v1) / 2, stone);
  { const gm = new THREE.MeshStandardMaterial({ map: atrioCanvas('grille', 256, 256), roughness: 0.7 }); const gl = new THREE.Mesh(new THREE.PlaneGeometry(v1 - v0 - 0.3, 2.6), gm); const [x, z] = P(u0 + 0.08, (v0 + v1) / 2); gl.position.set(x, g - D + 1.3, z); gl.rotation.y = Math.atan2(a.ux, a.uz); scene.add(gl); }
  box(0.3, D, 0.3, u0 + 0.9, -D / 2, v0 + 0.5, stone);
  // railing all round the opening (dark iron), and its collision
  for (const [ua, va, ub, vb] of [[u0, v0, u1, v0], [u0, v1, u1, v1], [u0, v0, u0, v1], [u1, v0, u1, v1]]) {
    const L = Math.hypot(ub - ua, vb - va); const m = box(ua === ub ? 0.06 : L, 0.06, ua === ub ? L : 0.06, (ua + ub) / 2, 1.0, (va + vb) / 2, iron); m.rotation.y = Math.atan2(a.ux, a.uz);
    for (let k = 0; k <= Math.round(L / 1.1); k++) { const f = k / Math.round(L / 1.1); box(0.05, 1.0, 0.05, ua + (ub - ua) * f, 0.5, va + (vb - va) * f, iron); }
    const p = P(ua, va), q = P(ub, vb); COL.addSeg(p[0], p[1], q[0], q[1]); }
  a.built = { x: Math.round(a.x), z: Math.round(a.z), r, escalera: true };
}
