// ============ starting corner (El Blanco) + Calle Marqués de Celada ============
// OSM draws several whole manzanas around the start (Marqués de Celada / Adelantado / Teobaldo Power / Carretas) as
// a single 4-5 storey block. Here they are split into row houses along their street fronts (Canarian houses of 2-4
// floors with patios inside), a few buildings are dressed after the Street View photos, ground-floor shops are added
// uphill along Marqués de Celada and the big supermarket (unnamed in OSM) gets its parody brand.
// Reference photos: docs/referencias/inicio_esquina_blanco/
const BLOCK_SPLIT = [[-950, -289], [-1175, -243], [-1086, -255], [-901, -290], [-697, -340], [-1002, -334], [-797, -371], [-711, -310], [-1232, -318], [-879, -378], [-744, -319], [-819, -328]];
// dressed buildings, matched by centroid (LANDMARK_AT in 05k): colour, height, facade, roof
const INICIO_DRESS = [
  { x: -749, z: -430, r: 6, o: { atlas: 2, col: '#e2ad25', H: 13.6, hip: true, quoin: [0.45, 0.28, 0.2], label: 'Edificio amarillo de Teobaldo Power' } },
];
const INICIO_SPOTS = [ // applied to the row houses created by the split (nearest parcel to each point)
  { x: -775, z: -364, col: '#e6d8bb', lv: 1, roof: 0 }, // low beige house on the corner (graffiti wall)
  { x: -787, z: -364, col: '#a96a5c', lv: 4, roof: 0 }, // tall pink-brown party wall next to it
  { x: -790, z: -343, col: '#ead6a2', lv: 4, roof: 0, balc: true }, // cream building with wooden balconies (north side)
  { x: -771, z: -341, col: '#a9352b', lv: 2, roof: 1, quoin: true }, // red Canarian house with basalt quoins
  { x: -756, z: -350, col: '#f3f3ef', lv: 1, roof: 0, coping: true }, // white walled house on the apex (STOP / 20)
];
const PARCEL_COLS = ['#efe2c6', '#e9c98f', '#d9a65e', '#c9573f', '#a93a2e', '#f2efe6', '#e7b9a3', '#cfe0d2', '#b9cfe0', '#e8d26a', '#d98c5f', '#f0d9b5'];
const INICIO_SHOPS = [ // [category, name] parodies for the ground floors uphill along Marqués de Celada
  ['F', 'Pizzería Paganada'], ['M', 'Ferretería La Antigua Cañera'], ['B', 'Bar El Cortado Largo'], ['D', 'Panadería La Gofiera'],
  ['S', 'Frutería Papa Bonita'], ['E', 'Peluquería Tijeras Locas'], ['P', ''], ['M', 'Bazar Todo a Un Euro'], ['C', 'Cafetería El Barraquito Doble'],
  ['M', 'Kiosco La Esquinita'], ['R', 'Guachinche El Mojo Verde'], ['V', 'Zapatería Las Cholas'], ['O', 'Óptica Ojo Avizor'], ['M', 'Taller de Motos El Fitipaldi'],
  ['K', 'Caja del Roque'], ['B', 'Bar Los Amigos de Quico'],
];
const INICIO = { parcels: [], spots: [] };
// empty lots in OSM that are really full of houses (Street View / 3D): row houses along every street front
const FILL_ZONES = [
  { x0: -1060, x1: -900, z0: -470, z1: -398, name: 'Lucas Vega / Montaraz' },
];

function inicioPip(P, x, z) { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const a = P[i], b = P[j]; if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
function inicioSimplify(P, tol) { // drop nearly collinear / tiny-edge vertices
  let Q = P.slice(); let changed = true;
  while (changed && Q.length > 4) { changed = false;
    for (let i = 0; i < Q.length && Q.length > 4; i++) { const a = Q[(i - 1 + Q.length) % Q.length], b = Q[i], c = Q[(i + 1) % Q.length];
      const L = Math.hypot(c[0] - a[0], c[1] - a[1]) || 1; const dist = Math.abs((c[0] - a[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (c[1] - a[1])) / L;
      if (dist < tol || Math.hypot(b[0] - a[0], b[1] - a[1]) < 1.2) { Q.splice(i, 1); changed = true; i--; } } }
  return Q;
}
function splitCoarseBlocks() {
  if (INICIO.done) return; INICIO.done = true;
  const R = mulberry(4242); const rnd2 = (a, b) => a + R() * (b - a);
  const out = [];
  for (let bi = DATA.B.length - 1; bi >= 0; bi--) {
    const b = DATA.B[bi]; const c = b[6]; let cx = 0, cz = 0; const n = c.length / 2; for (let i = 0; i < c.length; i += 2) { cx += c[i]; cz += c[i + 1]; } cx /= n; cz /= n;
    if (!BLOCK_SPLIT.some(([x, z]) => Math.abs(x - cx) < 3 && Math.abs(z - cz) < 3)) continue;
    const P0 = []; for (let i = 0; i < c.length; i += 2) P0.push([c[i], c[i + 1]]);
    const P = inicioSimplify(P0, 0.9); const m = P.length;
    const A = Math.abs(polyArea(P)); let per = 0; for (let i = 0; i < m; i++) per += Math.hypot(P[(i + 1) % m][0] - P[i][0], P[(i + 1) % m][1] - P[i][1]);
    const D = Math.min(11.5, 2 * A / per * 0.95); if (D < 5) continue;
    // inward normal sign
    let sg = 1; { let k = 0, bl = 0; for (let i = 0; i < m; i++) { const L = Math.hypot(P[(i + 1) % m][0] - P[i][0], P[(i + 1) % m][1] - P[i][1]); if (L > bl) { bl = L; k = i; } }
      const p = P[k], q = P[(k + 1) % m]; const nx = -(q[1] - p[1]) / bl, nz = (q[0] - p[0]) / bl; if (!inicioPip(P0, (p[0] + q[0]) / 2 + nx * 0.6, (p[1] + q[1]) / 2 + nz * 0.6)) sg = -1; }
    const convexAt = (i) => { const a = P[(i - 1 + m) % m], b = P[i], c2 = P[(i + 1) % m]; const u1 = [b[0] - a[0], b[1] - a[1]], u2 = [c2[0] - b[0], c2[1] - b[1]]; const l1 = Math.hypot(...u1) || 1, l2 = Math.hypot(...u2) || 1; const cr = (u1[0] * u2[1] - u1[1] * u2[0]) / (l1 * l2); return cr * sg > 0.45; }; // real corner (> ~27°), not a slight bend
    const reflexAt = (i) => { const a = P[(i - 1 + m) % m], b = P[i], c2 = P[(i + 1) % m]; const u1 = [b[0] - a[0], b[1] - a[1]], u2 = [c2[0] - b[0], c2[1] - b[1]]; const cr = (u1[0] * u2[1] - u1[1] * u2[0]) / ((Math.hypot(...u1) || 1) * (Math.hypot(...u2) || 1)); return cr * sg < -0.45; };
    const made = [];
    for (let i = 0; i < m; i++) { const p = P[i], q = P[(i + 1) % m]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 4) continue;
      const ex = (q[0] - p[0]) / L, ez = (q[1] - p[1]) / L, nx = -ez * sg, nz = ex * sg;
      let s0 = convexAt(i) ? Math.min(D, L - 3) : 0, s1 = reflexAt((i + 1) % m) ? Math.max(s0 + 3, L - D) : L; if (s1 - s0 < 3.5) continue;
      let s = s0; while (s < s1 - 0.5) { let w = rnd2(5.5, 11); if (s1 - (s + w) < 4) w = s1 - s; const d = D * rnd2(0.8, 1);
        const a = [p[0] + ex * s, p[1] + ez * s], bb = [p[0] + ex * (s + w), p[1] + ez * (s + w)]; let dd = d;
        for (let t = 0; t < 3; t++) { const cc = [bb[0] + nx * dd, bb[1] + nz * dd], d2 = [a[0] + nx * dd, a[1] + nz * dd]; if (inicioPip(P0, cc[0] - ex * 0.3, cc[1] - ez * 0.3) && inicioPip(P0, d2[0] + ex * 0.3, d2[1] + ez * 0.3)) break; dd *= 0.6; }
        if (dd > 3) { const poly = [a, bb, [bb[0] + nx * dd, bb[1] + nz * dd], [a[0] + nx * dd, a[1] + nz * dd]]; made.push({ poly, fx: (a[0] + bb[0]) / 2, fz: (a[1] + bb[1]) / 2, nx: -nx, nz: -nz }); }
        s += w; } }
    if (made.length < 2) continue;
    DATA.B.splice(bi, 1);
    for (const pc of made) { const r = R(); const lv = r < 0.38 ? 2 : r < 0.75 ? 3 : r < 0.93 ? 4 : 1; const colonial = R() < 0.65; const style = colonial ? 0 : 1;
      const roofT = colonial && R() < 0.7 ? 1 : 0; const h10 = Math.round((lv * (colonial ? 3.6 : 3.1) + 0.6) * 10);
      const flat = []; for (const p of pc.poly) flat.push(Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2);
      const e = [h10, style, lv, roofT, -1, Math.floor(R() * 1e6), flat]; out.push(e); pc.e = e; pc.cx = (pc.poly[0][0] + pc.poly[2][0]) / 2; pc.cz = (pc.poly[0][1] + pc.poly[2][1]) / 2; INICIO.parcels.push(pc); }
  }
  try { fillEmptyZones(out, R); } catch (e) { console.error('fill', e); }
  // dressed parcels: nearest parcel to each reference point
  for (const sp of INICIO_SPOTS) { let best = null, bd = 9; for (const pc of INICIO.parcels) { const d = Math.hypot(pc.cx - sp.x, pc.cz - sp.z); if (d < bd) { bd = d; best = pc; } }
    if (!best) continue; const e = best.e; e[2] = sp.lv; e[1] = sp.quoin ? 0 : 1; e[3] = sp.roof; e[0] = Math.round((sp.lv * (e[1] === 0 ? 3.6 : 3.1) + 0.6) * 10);
    let cx = 0, cz = 0; for (const p of best.poly) { cx += p[0]; cz += p[1]; } best.spot = sp; INICIO.spots.push({ ...sp, pc: best });
    const ins = insetPoly(best.poly, 0.75); let ix = 0, iz = 0; for (const p of ins) { ix += p[0]; iz += p[1]; } ix /= ins.length; iz /= ins.length;
    LANDMARK_AT.push({ x: ix, z: iz, r: 0.6, o: { col: sp.col, atlas: sp.quoin ? 9 : sp.balc ? 8 : sp.lv === 1 ? 0 : 1, quoin: sp.quoin ? BASALT : undefined, hip: sp.roof === 1 } }); }
  for (const dd of INICIO_DRESS) LANDMARK_AT.push(dd);
  for (const e of out) { const f = e[6]; let a = 0; for (let i = 0; i < f.length; i += 2) { const j = (i + 2) % f.length; a += f[i] * f[j + 1] - f[j] * f[i + 1]; } if (a < 0) { const r2 = []; for (let i = f.length - 2; i >= 0; i -= 2) r2.push(f[i], f[i + 1]); e[6] = r2; } DATA.B.push(e); } // same winding as OSM (positive area)
  // shops on the ground floors uphill (west of Carretas)
  const fronts = INICIO.parcels.filter((pc) => pc.fx < -790 && pc.fx > -1240 && !pc.spot).filter((pc) => { const rd = ROADSEG.nearest(pc.fx + pc.nx * 4, pc.fz + pc.nz * 4); return rd && rd.d < 6 && /Marqués de Celada/.test(STR[DATA.R[rd.ri][1]] || ''); });
  fronts.sort((a, b) => b.fx - a.fx); let k = 0;
  for (let i = 0; i < fronts.length && k < INICIO_SHOPS.length; i += 2) { const pc = fronts[i]; const [cat, nm] = INICIO_SHOPS[k++]; DATA.SH.push([Math.round(pc.fx + pc.nx * 1.5), Math.round(pc.fz + pc.nz * 1.5), cat, nm]); }
  // big brands inside unnamed OSM buildings (e.g. the Mercadona on Teobaldo Power): name the building after the shop
  INICIO.brandShops = DATA.SH.filter((s) => s[3] && DATA.BRAND && Object.values(DATA.BRAND).some((v) => s[3].startsWith(v)));
  console.log('inicio: parcels', INICIO.parcels.length, 'shops', k, 'brand shops', INICIO.brandShops.length);
}
// name of the brand whose parody sign sits inside an unnamed building (called from buildBuildings)
function brandInside(pts) {
  if (!INICIO.brandShops) return null; const A = Math.abs(polyArea(pts)); if (A < 800) return null;
  for (const s of INICIO.brandShops) { if (!inicioPip(pts, s[0], s[1])) continue; for (const k in DATA.BRAND) if (s[3].startsWith(DATA.BRAND[k])) return k; }
  return null;
}

// details on the dressed buildings and the corner itself
function buildInicioDetails() {
  const M = concMaterials(); const B = concBuckets(); const root = new THREE.Group(); root.name = 'inicio';
  const rail = new THREE.MeshStandardMaterial({ color: 0x2d3236, roughness: 0.5, metalness: 0.5 });
  const woodB = new THREE.MeshStandardMaterial({ color: 0x5a3219, roughness: 0.7 });
  const ochre = new THREE.MeshStandardMaterial({ color: 0xd9a223, roughness: 0.85 });
  const plinth = new THREE.MeshStandardMaterial({ color: 0x7a4a36, roughness: 0.9 });
  const tileC = M.tile;
  // yellow block: brown stone plinth, balconies with dark railings on the street faces, corner bevel band
  const yb = BUILD.find((b) => Math.hypot(b.cx + 749, b.cz + 430) < 6);
  if (yb) { const P = yb.pts, n = P.length; const sg = polyArea(P) > 0 ? 1 : -1;
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 6) continue; let ox = (q[1] - p[1]) / L, oz = -(q[0] - p[0]) / L; if (inicioPip(P, (p[0] + q[0]) / 2 + ox, (p[1] + q[1]) / 2 + oz)) { ox = -ox; oz = -oz; }
      const rd = ROADSEG.nearest((p[0] + q[0]) / 2 + ox * 5, (p[1] + q[1]) / 2 + oz * 5); const street = rd && rd.d < 6;
      const ang = Math.atan2(ox, oz); const g0 = Math.min(heightAt(p[0], p[1]), heightAt(q[0], q[1]));
      const mid = [(p[0] + q[0]) / 2 + ox * 0.08, (p[1] + q[1]) / 2 + oz * 0.08]; const fr = cFrame(mid[0], g0, mid[1], ang);
      B.geo(cBox(L, 1.3, 0.16, 1.2), plinth, fr(0, 0.3, 0));
      if (!street || L < 12) continue;
      const nb = Math.floor(L / 3.6); for (let f = 1; f <= 3; f++) for (let k = 0; k < nb; k++) { if ((k + f) % 2) continue; const x = (k + 0.5) / nb * L - L / 2; const y = 0.6 + f * 3.25;
        B.geo(cBox(2.6, 0.16, 0.9), ochre, fr(x, y, 0.45)); B.geo(cBox(2.6, 0.06, 0.06), rail, fr(x, y + 1.0, 0.88)); for (let bx = -1.25; bx <= 1.26; bx += 0.125) B.geo(cBox(0.025, 1.0, 0.025), rail, fr(x + bx, y + 0.5, 0.88)); for (const sx of [-1, 1]) B.geo(cBox(0.06, 1.0, 0.9), rail, fr(x + sx * 1.3, y + 0.5, 0.45)); } } }
  // dressed row houses
  for (const sp of INICIO.spots) { const b = BUILD.find((x) => Math.hypot(x.cx - sp.pc.cx, x.cz - sp.pc.cz) < 2.5); if (!b) continue; const P = b.pts, n = P.length;
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 3) continue; let ox = (q[1] - p[1]) / L, oz = -(q[0] - p[0]) / L; if (inicioPip(P, (p[0] + q[0]) / 2 + ox * 0.5, (p[1] + q[1]) / 2 + oz * 0.5)) { ox = -ox; oz = -oz; }
      const ang = Math.atan2(ox, oz); const mid = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; const fr = cFrame(mid[0], b.top, mid[1], ang); const g0 = Math.min(heightAt(p[0], p[1]), heightAt(q[0], q[1]));
      if (sp.coping) { B.geo(cBox(L + 0.3, 0.32, 0.55), tileC, fr(0, 0.75, 0.1)); B.geo(cBox(L, 0.7, 0.2), M.white, fr(0, 0.35, -0.05)); }
      if (sp.balc) { const rd = ROADSEG.nearest(mid[0] + ox * 5, mid[1] + oz * 5); if (!rd || rd.d > 6) continue; const fb = cFrame(mid[0], g0, mid[1], ang);
        for (let f = 1; f < sp.lv; f++) { const y = 0.6 + f * 3.1; B.geo(cBox(L - 0.6, 0.15, 0.8), woodB, fb(0, y, 0.4)); B.geo(cBox(L - 0.6, 0.08, 0.06), woodB, fb(0, y + 0.95, 0.78)); for (let bx = -L / 2 + 0.45; bx <= L / 2 - 0.45; bx += 0.16) B.geo(cBox(0.05, 0.95, 0.05), woodB, fb(bx, y + 0.48, 0.78)); }
        B.geo(cBox(L, 1.1, 0.12), plinth, fb(0, 0.35, 0.05)); } } }
  // traffic island at the fork Marqués de Celada / Calle Sol with its signs (Street View)
  { const isl = [[-783, -352.6], [-768, -350.4], [-768, -355.0]]; const y = heightAt(-772, -352.5) + 0.13; const sh = new THREE.Shape(); sh.moveTo(isl[0][0], -isl[0][1]); for (const p of isl.slice(1)) sh.lineTo(p[0], -p[1]); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.18, bevelEnabled: false }); g.rotateX(-Math.PI / 2); B.geo(g, M.stone, new THREE.Matrix4().makeTranslation(0, y, 0)); COL.addCirc(-772, -352.6, 1.0);
    const sign = (x, z, ang, draw, w, h, yy) => { const c = mkCanvas(256, Math.round(256 * h / w)), cx = c.getContext('2d'); draw(cx, c.width, c.height); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, side: THREE.DoubleSide })); m.position.set(x, heightAt(x, z) + yy, z); m.rotation.y = ang; root.add(m); };
    const pole = (x, z, h = 3.2) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, h, 8), rail); m.position.set(x, heightAt(x, z) + h / 2, z); root.add(m); COL.addCirc(x, z, 0.12); };
    const face = Math.atan2(1, 0.15); // looking up the street (towards -x)
    pole(-776, -352.4, 3.4); sign(-776, -352.4 + 0.05, face, (x, W, H) => { x.fillStyle = '#1d6b45'; x.fillRect(0, 0, W, H); x.fillStyle = '#fff'; x.font = 'bold 34px sans-serif'; x.textBaseline = 'middle'; x.fillText('Vía de Ronda  ➜', 14, H * 0.28); x.fillStyle = '#f2f2f2'; x.fillRect(0, H / 2 - 1, W, 3); x.fillStyle = '#fff'; x.fillText('Punta del Hidalgo ➜', 8, H * 0.74); }, 1.6, 0.75, 2.9);
    const disc = (x, z, ang, kind, yy = 2.4) => sign(x, z, ang, (cx, W) => { cx.beginPath(); cx.arc(W / 2, W / 2, W / 2 - 2, 0, 7); cx.fillStyle = kind === '20' ? '#fff' : '#d6262b'; cx.fill(); cx.lineWidth = 22; cx.strokeStyle = '#d6262b'; if (kind === '20') { cx.stroke(); cx.fillStyle = '#111'; cx.font = 'bold 120px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('20', W / 2, W / 2 + 6); } else if (kind === 'no') { cx.fillStyle = '#fff'; cx.fillRect(40, W / 2 - 22, W - 80, 44); } else { cx.fillStyle = '#fff'; cx.font = 'bold 76px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('STOP', W / 2, W / 2 + 4); } }, 0.62, 0.62, yy);
    pole(-770, -352.6, 2.8); disc(-770, -352.6 + 0.05, face, 'no');
    pole(-759.5, -349.2, 3.2); disc(-759.5, -349.2 + 0.05, Math.atan2(-0.3, -1), '20', 2.75); disc(-759.4, -349.6, Math.atan2(1, -0.2), 'stop', 2.0);
    // bollards along the yellow block corner and recycling containers on Teobaldo Power
    const bol = new THREE.CylinderGeometry(0.09, 0.11, 0.9, 10); for (let k = 0; k < 6; k++) { const x = -763.5 - k * 1.6 * 0.25, z = -364 - k * 1.6; B.geo(bol.clone(), rail, new THREE.Matrix4().makeTranslation(x, heightAt(x, z) + 0.45, z)); }
    for (const [x, z, col] of [[-769.3, -383, 0x9a9fa5], [-769.9, -385.2, 0x3e8f3e], [-770.4, -387.4, 0xf2f2f2]]) { const m = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 1.9), new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 })); m.position.set(x, heightAt(x, z) + 0.75, z); m.rotation.y = 0.25; root.add(m); COL.addCirc(x, z, 0.8); } }
  B.finish(root); scene.add(root);
}

// fill the empty lots of FILL_ZONES with 1-2 rows of houses along each street front
function fillEmptyZones(out, R) {
  for (const Z of FILL_ZONES) {
    const G = 1.5, W = Math.ceil((Z.x1 - Z.x0) / G) + 1, H = Math.ceil((Z.z1 - Z.z0) / G) + 1; const occ = new Uint8Array(W * H);
    const cell = (x, z) => { const i = Math.floor((x - Z.x0) / G), j = Math.floor((z - Z.z0) / G); return i < 0 || j < 0 || i >= W || j >= H ? -1 : j * W + i; };
    const mark = (P) => { let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (const p of P) { a = Math.min(a, p[0]); b = Math.max(b, p[0]); c = Math.min(c, p[1]); d = Math.max(d, p[1]); } if (b < Z.x0 || a > Z.x1 || d < Z.z0 || c > Z.z1) return;
      for (let x = Math.max(a, Z.x0); x <= Math.min(b, Z.x1); x += G * 0.5) for (let z = Math.max(c, Z.z0); z <= Math.min(d, Z.z1); z += G * 0.5) if (inicioPip(P, x, z)) { const k = cell(x, z); if (k >= 0) occ[k] = 1; } };
    for (const b of DATA.B) { const c = b[6]; if (c[0] < Z.x0 - 200 || c[0] > Z.x1 + 200) continue; const P = []; for (let i = 0; i < c.length; i += 2) P.push([c[i], c[i + 1]]); mark(P); }
    for (const a of DATA.A) { const c = a[2]; const P = []; for (let i = 0; i < c.length; i += 2) P.push([c[i], c[i + 1]]); mark(P); }
    const free = (P) => { for (let u = 0.1; u <= 0.9; u += 0.2) for (let v = 0.1; v <= 0.9; v += 0.2) { const x = P[0][0] + (P[1][0] - P[0][0]) * u + (P[3][0] - P[0][0]) * v, z = P[0][1] + (P[1][1] - P[0][1]) * u + (P[3][1] - P[0][1]) * v;
        const k = cell(x, z); if (k < 0 || occ[k]) return false; const rd = ROADSEG.nearest(x, z); if (rd && rd.d < DATA.R[rd.ri][2] / 2 + 1.6) return false; } return true; };
    let made = 0;
    for (const r of DATA.R) { if (r[0] <= 4 || r[0] >= 13) continue; const c = r[4]; const hw = r[2] / 2 + 2.2;
      for (let i = 0; i + 3 < c.length; i += 2) { const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3]; const L = Math.hypot(x2 - x1, z2 - z1); if (L < 6) continue;
        if (Math.max(x1, x2) < Z.x0 - 20 || Math.min(x1, x2) > Z.x1 + 20 || Math.max(z1, z2) < Z.z0 - 20 || Math.min(z1, z2) > Z.z1 + 20) continue;
        const ex = (x2 - x1) / L, ez = (z2 - z1) / L;
        for (const sd of [1, -1]) { const nx = -ez * sd, nz = ex * sd; let s = 1;
          while (s < L - 4) { const w = 5.5 + R() * 4.5; let back = hw;
            for (let row = 0; row < 2; row++) { const d = 8 + R() * 3; const a = [x1 + ex * s + nx * back, z1 + ez * s + nz * back], b = [a[0] + ex * w, a[1] + ez * w]; const P = [a, b, [b[0] + nx * d, b[1] + nz * d], [a[0] + nx * d, a[1] + nz * d]];
              if (!free(P)) break; mark(P); const rr = R(); const lv = rr < 0.3 ? 2 : rr < 0.7 ? 3 : rr < 0.92 ? 4 : 1; const col = R() < 0.55; const st = col ? 0 : 1;
              const flat = []; for (const p of (polyArea(P) < 0 ? P.slice().reverse() : P)) flat.push(Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2);
              out.push([Math.round((lv * (col ? 3.6 : 3.1) + 0.6) * 10), st, lv, col && R() < 0.6 ? 1 : 0, -1, Math.floor(R() * 1e6), flat]); made++; back += d + 0.2; }
            s += w + 0.15; } } } }
    // inner lots (no street front): houses on a grid aligned with the nearest street
    for (let z = Z.z0 + 3; z < Z.z1 - 3; z += 4) for (let x = Z.x0 + 3; x < Z.x1 - 3; x += 4) { const k = cell(x, z); if (k < 0 || occ[k]) continue;
      const rd = ROADSEG.nearest(x, z); if (!rd || rd.d > 70) continue; const L = Math.hypot(rd.dx, rd.dz) || 1; const ex = rd.dx / L, ez = rd.dz / L, nx = -ez, nz = ex;
      for (const [w, d] of [[8, 9], [6.5, 7.5], [5, 6]]) { const a = [x - ex * w / 2 - nx * d / 2, z - ez * w / 2 - nz * d / 2], b = [a[0] + ex * w, a[1] + ez * w]; const P = [a, b, [b[0] + nx * d, b[1] + nz * d], [a[0] + nx * d, a[1] + nz * d]];
        if (!free(P)) continue; mark(P); const lv = R() < 0.5 ? 2 : 3; const flat = []; for (const p of (polyArea(P) < 0 ? P.slice().reverse() : P)) flat.push(Math.round(p[0] * 2) / 2, Math.round(p[1] * 2) / 2);
        out.push([Math.round((lv * 3.6 + 0.6) * 10), 0, lv, R() < 0.6 ? 1 : 0, -1, Math.floor(R() * 1e6), flat]); made++; break; } }
    console.log('fill', Z.name, made);
  }
}
