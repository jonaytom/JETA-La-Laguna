// ============ La Concepción: parish church + its bell tower, modelled from photos (key landmark of the story) ============
// Footprint: OSM outline (the tower block is cut out of it in 04_world.js → CONC_CARVE). Everything here is built in
// metres on the real outline and merged per material (few draw calls).
//  - Tower (28 m): dark basalt ashlar, 4 bodies separated by cornices, windows with little iron balconies, clock,
//    belfry with two arches per side and bells, octagonal lantern with arches, small dome and cross. Wooden Canarian
//    gallery and iron fence at the foot of its west face.
//  - Church: cream plaster walls on a dark basalt plinth, double teja eaves, three naves (raised central nave with
//    oculi), arched stained-glass windows with reddish stone frames, baroque stone portal + blind arch on the north
//    flank next to the tower, and the tall white head block (plaza end) with dark stone pilasters and two rows of windows.

const CONCM = {};
function concMaterials() {
  if (CONCM.basalt) return CONCM;
  const tex = (w, h, draw, rep = true) => { const c = mkCanvas(w, h), x = c.getContext('2d'); draw(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; if (rep) t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; return t; };
  const R = mulberry(777);
  // basalt ashlar (2.4 m tile): courses of 0.4 m, blocks 0.5-1.2 m, dark grey with brownish blocks, light mortar
  const ashlar = (dark) => tex(512, 512, (x, W, H) => {
    x.fillStyle = '#6a6259'; x.fillRect(0, 0, W, H); const rows = 6, rh = H / rows;
    for (let r = 0; r < rows; r++) { let px = -R() * 60; while (px < W) { const bw = 55 + R() * 150; const t = R();
      const base = dark ? (t < 0.35 ? [74, 62, 52] : t < 0.7 ? [56, 52, 49] : [66, 58, 50]) : (t < 0.5 ? [120, 104, 90] : [104, 94, 86]);
      const k = 0.82 + R() * 0.32; x.fillStyle = `rgb(${base[0] * k | 0},${base[1] * k | 0},${base[2] * k | 0})`; x.fillRect(px + 2, r * rh + 2, bw - 4, rh - 4);
      for (let s = 0; s < 40; s++) { x.fillStyle = `rgba(${R() < 0.5 ? '20,18,16' : '150,135,115'},${0.05 + R() * 0.1})`; x.fillRect(px + R() * bw, r * rh + R() * rh, 2 + R() * 7, 2 + R() * 5); }
      if (R() < 0.12) { x.fillStyle = 'rgba(150,140,90,0.25)'; x.beginPath(); x.arc(px + R() * bw, r * rh + R() * rh, 6 + R() * 12, 0, 7); x.fill(); } // lichen
      px += bw; } }
  });
  CONCM.basalt = new THREE.MeshStandardMaterial({ map: ashlar(true), roughness: 0.95 });
  CONCM.stone = new THREE.MeshStandardMaterial({ map: ashlar(false), roughness: 0.9 }); // lighter mouldings / cornices
  CONCM.plaster = new THREE.MeshStandardMaterial({ map: tex(256, 256, (x, W, H) => { x.fillStyle = '#efe5cc'; x.fillRect(0, 0, W, H); for (let i = 0; i < 2500; i++) { x.fillStyle = `rgba(${R() < 0.5 ? '120,100,70' : '255,255,245'},${R() * 0.06})`; x.fillRect(R() * W, R() * H, 1 + R() * 4, 1 + R() * 4); } }), roughness: 0.92 });
  CONCM.white = new THREE.MeshStandardMaterial({ map: CONCM.plaster.map, color: 0xffffff, roughness: 0.9 }); CONCM.white.color.setRGB(1.04, 1.05, 1.08);
  CONCM.redStone = new THREE.MeshStandardMaterial({ color: 0xa8674a, roughness: 0.85 });
  CONCM.portal = new THREE.MeshStandardMaterial({ map: ashlar(true), color: 0xb9b2a8, roughness: 0.9 });
  CONCM.tile = new THREE.MeshStandardMaterial({ map: tex(128, 64, (x, W, H) => { x.fillStyle = '#7a3a26'; x.fillRect(0, 0, W, H); for (let i = 0; i < 8; i++) { const g = x.createLinearGradient(i * 16, 0, i * 16 + 16, 0); g.addColorStop(0, '#5a2a1c'); g.addColorStop(0.5, '#b8654a'); g.addColorStop(1, '#5a2a1c'); x.fillStyle = g; x.fillRect(i * 16 + 1, 0, 14, H); } }), roughness: 0.85 });
  CONCM.iron = new THREE.MeshStandardMaterial({ color: 0x1b1b1d, roughness: 0.5, metalness: 0.6 });
  CONCM.dark = new THREE.MeshStandardMaterial({ color: 0x141312, roughness: 1 });
  CONCM.bell = new THREE.MeshStandardMaterial({ color: 0x8a6a30, roughness: 0.35, metalness: 0.85 });
  CONCM.wood = new THREE.MeshStandardMaterial({ color: 0x6b3f22, roughness: 0.75 });
  const doorT = tex(256, 512, (x, W, H) => { x.fillStyle = '#5a3017'; x.fillRect(0, 0, W, H);
    for (const lx of [0, W / 2]) for (let r = 0; r < 7; r++) for (let c = 0; c < 2; c++) { const px = lx + 14 + c * 54, py = 70 + r * 62; x.fillStyle = '#3d1f0e'; x.fillRect(px, py, 46, 52); x.fillStyle = '#7a4524'; x.fillRect(px + 6, py + 6, 34, 40); x.fillStyle = '#5a3017'; x.fillRect(px + 12, py + 12, 22, 28); }
    x.fillStyle = '#2a150a'; x.fillRect(W / 2 - 3, 0, 6, H); for (let i = 0; i < 600; i++) { x.fillStyle = `rgba(0,0,0,${R() * 0.12})`; x.fillRect(R() * W, R() * H, 1, 6 + R() * 20); } }, false);
  CONCM.door = new THREE.MeshStandardMaterial({ map: doorT, roughness: 0.7 });
  const glassT = tex(128, 256, (x, W, H) => { const cols = ['#2e4f8f', '#8f2e3a', '#c9a23a', '#2f7a4e', '#5b3f8a', '#d9c69a']; for (let i = 0; i < 90; i++) { x.fillStyle = cols[R() * cols.length | 0]; x.beginPath(); const cx = R() * W, cy = R() * H; x.moveTo(cx, cy); for (let k = 0; k < 4; k++) x.lineTo(cx + (R() - 0.5) * 60, cy + (R() - 0.5) * 60); x.fill(); }
    x.strokeStyle = '#1a1a1a'; x.lineWidth = 3; for (let i = 0; i < 40; i++) { x.beginPath(); x.moveTo(R() * W, R() * H); x.lineTo(R() * W, R() * H); x.stroke(); } x.lineWidth = 4; for (let yy = 32; yy < H; yy += 32) { x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); } }, false);
  CONCM.glass = new THREE.MeshStandardMaterial({ map: glassT, emissiveMap: glassT, emissive: 0xffffff, emissiveIntensity: 0.18, roughness: 0.3, metalness: 0.2 });
  const winT = tex(128, 192, (x, W, H) => { x.fillStyle = '#5a3418'; x.fillRect(0, 0, W, H); x.fillStyle = '#26323a'; for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) { x.fillRect(12 + c * 56, 12 + r * 44, 48, 36); x.fillStyle = 'rgba(160,190,210,0.25)'; x.fillRect(14 + c * 56, 14 + r * 44, 18, 30); x.fillStyle = '#26323a'; } }, false);
  CONCM.win = new THREE.MeshStandardMaterial({ map: winT, roughness: 0.4 });
  const clockT = tex(256, 256, (x, W) => { x.fillStyle = '#f4f1e6'; x.beginPath(); x.arc(128, 128, 126, 0, 7); x.fill(); x.strokeStyle = '#111'; x.lineWidth = 6; x.beginPath(); x.arc(128, 128, 118, 0, 7); x.stroke();
    x.fillStyle = '#111'; x.font = 'bold 26px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].forEach((n, i) => { const a = i / 12 * Math.PI * 2; x.fillText(n, 128 + Math.sin(a) * 92, 128 - Math.cos(a) * 92); });
    x.lineCap = 'round'; x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(-1.05) * 55, 128 - Math.cos(-1.05) * 55); x.stroke(); x.lineWidth = 6; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(1.05) * 85, 128 - Math.cos(1.05) * 85); x.stroke(); }, false);
  CONCM.clock = new THREE.MeshStandardMaterial({ map: clockT, roughness: 0.6 });
  for (const k of ['plaster', 'white', 'basalt', 'tile', 'stone']) CONCM[k].side = THREE.DoubleSide;
  return CONCM;
}

// ---- geometry buckets: everything is merged per material
function concBuckets() {
  const map = new Map(); const get = (m) => { let b = map.get(m); if (!b) map.set(m, b = { p: [], n: [], u: [] }); return b; };
  return {
    geo(g, mat, M) { if (g.index) g = g.toNonIndexed(); g.applyMatrix4(M); const b = get(mat); const P = g.attributes.position.array, N = g.attributes.normal.array, U = g.attributes.uv ? g.attributes.uv.array : new Float32Array(P.length / 3 * 2);
      for (let i = 0; i < P.length; i++) { b.p.push(P[i]); b.n.push(N[i]); } for (let i = 0; i < U.length; i++) b.u.push(U[i]); g.dispose(); },
    // quad a-b-c-d (counter-clockwise seen from outside), uv in metres / s
    quad(mat, a, b, c, d, s = 3) { const B = get(mat); const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], e2 = [d[0] - a[0], d[1] - a[1], d[2] - a[2]]; let nx = e1[1] * e2[2] - e1[2] * e2[1], ny = e1[2] * e2[0] - e1[0] * e2[2], nz = e1[0] * e2[1] - e1[1] * e2[0]; const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
      const L = Math.hypot(e1[0], e1[2]) || Math.hypot(e1[0], e1[1], e1[2]); const H = Math.hypot(e2[0], e2[1], e2[2]);
      const uv = { a: [0, a[1] / s], b: [L / s, b[1] / s], c: [L / s, c[1] / s], d: [0, d[1] / s] }; if (Math.abs(e2[1]) < 0.01) { uv.c[1] = uv.b[1] + H / s; uv.d[1] = uv.a[1] + H / s; }
      for (const [P, k] of [[a, 'a'], [b, 'b'], [c, 'c'], [a, 'a'], [c, 'c'], [d, 'd']]) { B.p.push(P[0], P[1], P[2]); B.n.push(nx, ny, nz); B.u.push(uv[k][0], uv[k][1]); } },
    finish(group) { for (const [mat, b] of map) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(b.u, 2)); g.computeBoundingSphere();
      const m = new THREE.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true; group.add(m); } },
  };
}
// box with UVs in metres (texture tile = s metres)
function cBox(w, h, d, s = 2.4) { const g = new THREE.BoxGeometry(w, h, d); const uv = g.attributes.uv; const D = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]]; for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, uv.getX(k) * D[f][0] / s, uv.getY(k) * D[f][1] / s); } return g; }
// local frame → world matrix
function cFrame(ox, oy, oz, ang) { const base = new THREE.Matrix4().makeRotationY(ang).setPosition(ox, oy, oz); const q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
  return (x, y, z, ry = 0, rx = 0, rz = 0, sc = null) => { e.set(rx, ry, rz, 'YXZ'); q.setFromEuler(e); return new THREE.Matrix4().compose(v.set(x, y, z), q, sc ? new THREE.Vector3(...sc) : one).premultiply(base); }; }
// arch-topped shape (w wide, h total height incl. semicircle), base at y=0
function archShape(w, h, x0 = 0) { const s = new THREE.Shape(), r = w / 2; s.moveTo(x0 - r, 0); s.lineTo(x0 + r, 0); s.lineTo(x0 + r, h - r); s.absarc(x0, h - r, r, 0, Math.PI, false); s.lineTo(x0 - r, 0); return s; }
function archPath(w, h, x0 = 0, y0 = 0) { const s = new THREE.Path(), r = w / 2; s.moveTo(x0 - r, y0); s.lineTo(x0 + r, y0); s.lineTo(x0 + r, y0 + h - r); s.absarc(x0, y0 + h - r, r, 0, Math.PI, false); s.lineTo(x0 - r, y0); return s; }
function shapeUV(g, w, h, x0 = 0) { const p = g.attributes.position, uv = g.attributes.uv; for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) - x0 + w / 2) / w, p.getY(i) / h); return g; }
// arched frame (ring) of thickness t around an opening w×h, depth d
function archFrame(w, h, t, d) { const s = archShape(w + 2 * t, h + t); s.holes.push(archPath(w, h)); return new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false, curveSegments: 12 }); }

function buildConcepcion(ch) {
  const M = concMaterials(); const B = concBuckets(); const root = new THREE.Group(); root.name = 'La Concepción';
  const pts = ch.pts; const n = pts.length;
  const F = axisFrame(pts, ch.cx, ch.cz); const U = (p) => (p[0] - ch.cx) * F.ux + (p[1] - ch.cz) * F.uz, V = (p) => (p[0] - ch.cx) * F.vx + (p[1] - ch.cz) * F.vz;
  const pip = (x, z) => { let c = false; for (let i = 0, j = n - 1; i < n; j = i++) { const a = pts[i], b = pts[j]; if ((a[1] > z) !== (b[1] > z) && x < (b[0] - a[0]) * (z - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  // outward normal convention (checked once)
  let osg = 1; { let bi = 0, bl = 0; for (let i = 0; i < n; i++) { const L = Math.hypot(pts[(i + 1) % n][0] - pts[i][0], pts[(i + 1) % n][1] - pts[i][1]); if (L > bl) { bl = L; bi = i; } }
    const p = pts[bi], q = pts[(bi + 1) % n]; const ox = (q[1] - p[1]) / bl, oz = -(q[0] - p[0]) / bl; if (pip((p[0] + q[0]) / 2 + ox * 0.8, (p[1] + q[1]) / 2 + oz * 0.8)) osg = -1; }
  const outN = (p, q) => { const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [osg * (q[1] - p[1]) / L, osg * -(q[0] - p[0]) / L]; };
  const bot = ch.bmin - 0.6, H1 = ch.bmax + 10.5, H2 = ch.bmax + 14.8;
  // head block at the Plaza de la Concepción end
  const plaza = centroidOfNamedWays('Plaza de la Concepción'); let sE = 1; if (plaza) { const e0 = F.W(F.u0, 0), e1 = F.W(F.u1, 0); sE = Math.hypot(e1[0] - plaza[0], e1[1] - plaza[1]) < Math.hypot(e0[0] - plaza[0], e0[1] - plaza[1]) ? 1 : -1; }
  const uEnd = sE > 0 ? F.u1 : F.u0, uE = uEnd - sE * 24;
  const side = (p) => sE * (U(p) - uE); // >0: head block
  const clip = (P, keepHead) => { const out = []; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; const sa = keepHead ? side(a) : -side(a), sb = keepHead ? side(b) : -side(b);
    if (sa >= 0) out.push(a); if ((sa >= 0) !== (sb >= 0)) { const t = sa / (sa - sb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); } } return out; };
  const Pm = clip(pts, false), Pe = clip(pts, true);
  const onCut = (p) => Math.abs(side(p)) < 0.02;
  const T = CONC_CARVE.ok ? CONC_CARVE : null;
  // ---------- walls, plinth, eaves
  const wallsOf = (P, top, mat, head) => {
    for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 0.05) continue;
      // inner face of the tower (church wall hidden inside it)
      if (T && Math.hypot((p[0] + q[0]) / 2 - T.x, (p[1] + q[1]) / 2 - T.z) < T.w * 0.45) continue;
      if (onCut(p) && onCut(q)) { if (head) B.quad(mat, [p[0], H1 - 0.4, p[1]], [q[0], H1 - 0.4, q[1]], [q[0], top, q[1]], [p[0], top, p[1]]); continue; } // step between nave roof and head block
      const [ox, oz] = outN(p, q);
      B.quad(mat, [p[0], bot, p[1]], [q[0], bot, q[1]], [q[0], top, q[1]], [p[0], top, p[1]]);
      // basalt plinth
      const gt = Math.max(heightAt(p[0], p[1]), heightAt(q[0], q[1])) + 1.05, o = 0.08; const P2 = [p[0] + ox * o, p[1] + oz * o], Q2 = [q[0] + ox * o, q[1] + oz * o];
      B.quad(M.basalt, [P2[0], bot, P2[1]], [Q2[0], bot, Q2[1]], [Q2[0], gt, Q2[1]], [P2[0], gt, P2[1]], 2.4);
      B.quad(M.basalt, [P2[0], gt, P2[1]], [Q2[0], gt, Q2[1]], [q[0], gt, q[1]], [p[0], gt, p[1]], 2.4);
      // eaves: plaster moulding + double row of tejas
      const m1 = 0.22, m2 = 0.5; B.quad(M.white, [p[0], top - 0.55, p[1]], [q[0], top - 0.55, q[1]], [q[0] + ox * m1, top - 0.3, q[1] + oz * m1], [p[0] + ox * m1, top - 0.3, p[1] + oz * m1], 1);
      B.quad(M.tile, [p[0] + ox * m1, top - 0.3, p[1] + oz * m1], [q[0] + ox * m1, top - 0.3, q[1] + oz * m1], [q[0] + ox * m1, top - 0.14, q[1] + oz * m1], [p[0] + ox * m1, top - 0.14, p[1] + oz * m1], 0.5);
      B.quad(M.tile, [p[0] + ox * m1, top - 0.14, p[1] + oz * m1], [q[0] + ox * m1, top - 0.14, q[1] + oz * m1], [q[0] + ox * m2, top - 0.14, q[1] + oz * m2], [p[0] + ox * m2, top - 0.14, p[1] + oz * m2], 0.5);
      B.quad(M.tile, [p[0] + ox * m2, top - 0.14, p[1] + oz * m2], [q[0] + ox * m2, top - 0.14, q[1] + oz * m2], [q[0] + ox * m2, top + 0.06, q[1] + oz * m2], [p[0] + ox * m2, top + 0.06, p[1] + oz * m2], 0.5);
    }
  };
  wallsOf(Pm, H1, M.plaster, false); wallsOf(Pe, H2, M.white, true);
  const roofOf = (P, top, din) => { if (P.length < 3) return; let cx = 0, cz = 0; for (const p of P) { cx += p[0]; cz += p[1]; } cx /= P.length; cz /= P.length; const A = polyArea(P); const Q = P;
    const tris = THREE.ShapeUtils.triangulateShape(Q.map((p) => new THREE.Vector2(p[0], p[1])), []); hipRoof(Q, cx, cz, top, Math.abs(A), tris, din); };
  roofOf(Pm, H1, 3.2); roofOf(Pe, H2, 3.6);
  // ---------- raised central nave (clerestory with oculi) over the three naves
  { let va = 1e9, vb = -1e9; for (const p of Pe) { va = Math.min(va, V(p)); vb = Math.max(vb, V(p)); } const vc = (va + vb) / 2, hw = Math.min(5.2, (vb - va) * 0.22);
    const uW = (sE > 0 ? F.u0 : F.u1) + sE * 2.5; const ua = Math.min(uW, uE), ub = Math.max(uW, uE); const y0 = H1 - 0.3, y1 = H1 + 3.0;
    for (const sv of [-1, 1]) { const a = F.W(sv > 0 ? ua : ub, vc + sv * hw), b = F.W(sv > 0 ? ub : ua, vc + sv * hw); B.quad(M.plaster, [a[0], y0, a[1]], [b[0], y0, b[1]], [b[0], y1, b[1]], [a[0], y1, a[1]]);
      const Ln = ub - ua; for (let k = 3; k < Ln - 2; k += 6.5) { const u = ua + k; const c = F.W(u, vc + sv * (hw + 0.04)); const fr = cFrame(c[0], (y0 + y1) / 2 + 0.2, c[1], Math.atan2(F.vx * sv, F.vz * sv));
        B.geo(new THREE.CircleGeometry(0.55, 20), M.glass, fr(0, 0, 0.02)); B.geo(new THREE.TorusGeometry(0.62, 0.11, 6, 20), M.redStone, fr(0, 0, 0.02)); } }
    { const uu = sE > 0 ? ua : ub; const a = F.W(uu, vc - hw), b = F.W(uu, vc + hw); const sgn = sE > 0 ? 1 : -1; const [p, q] = sgn > 0 ? [b, a] : [a, b]; B.quad(M.plaster, [p[0], y0, p[1]], [q[0], y0, q[1]], [q[0], y1, q[1]], [p[0], y1, p[1]]); }
    gableRoof(F, y1, 2.0, ua, ub, vc - hw, vc + hw); }
  // ---------- arched stained-glass windows on the nave walls
  const portals = []; const winAt = (p, q, t, y, wdt, ht) => { const [ox, oz] = outN(p, q); const x = p[0] + (q[0] - p[0]) * t + ox * 0.03, z = p[1] + (q[1] - p[1]) * t + oz * 0.03; const fr = cFrame(x, y, z, Math.atan2(ox, oz));
    B.geo(shapeUV(new THREE.ShapeGeometry(archShape(wdt, ht), 10), wdt, ht), M.glass, fr(0, 0, 0)); B.geo(archFrame(wdt, ht, 0.22, 0.14), M.redStone, fr(0, 0, -0.04)); };
  // portal: on the flank next to the tower (the long edge whose end is nearest to the tower)
  let pe = null; if (T) { let bd = 1e9; for (let i = 0; i < Pm.length; i++) { const p = Pm[i], q = Pm[(i + 1) % Pm.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 14 || (onCut(p) && onCut(q))) continue;
    const d0 = Math.hypot(p[0] - T.x, p[1] - T.z), d1 = Math.hypot(q[0] - T.x, q[1] - T.z), d = Math.min(d0, d1); if (d < 16 && d < bd) { bd = d; pe = { p, q, L, fromP: d0 < d1 }; } } }
  if (pe) { const at = (m) => pe.fromP ? m / pe.L : 1 - m / pe.L; portals.push({ p: pe.p, q: pe.q, t: at(3.6), kind: 'portal' }, { p: pe.p, q: pe.q, t: at(10.5), kind: 'blind' }); }
  // second (side) portal: middle of the longest edge on the other flank
  { let best = null, bl = 0; for (let i = 0; i < Pm.length; i++) { const p = Pm[i], q = Pm[(i + 1) % Pm.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (onCut(p) && onCut(q)) continue; if (pe && p === pe.p) continue; if (T && Math.min(Math.hypot(p[0] - T.x, p[1] - T.z), Math.hypot(q[0] - T.x, q[1] - T.z)) < 20) continue; if (L > bl) { bl = L; best = { p, q }; } }
    if (best && bl > 20) portals.push({ p: best.p, q: best.q, t: 0.5, kind: 'portal' }); }
  for (let i = 0; i < Pm.length; i++) { const p = Pm[i], q = Pm[(i + 1) % Pm.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 7 || (onCut(p) && onCut(q))) continue;
    for (let m = 4; m < L - 3; m += 8.5) { const t = m / L; const x = p[0] + (q[0] - p[0]) * t, z = p[1] + (q[1] - p[1]) * t;
      if (T && Math.hypot(x - T.x, z - T.z) < 7) continue; if (portals.some((o) => o.p === p && Math.abs(o.t - t) * L < 3.6)) continue;
      winAt(p, q, t, H1 - 5.6, 1.5, 3.0); } }
  // ---------- portals
  for (const po of portals) { const [ox, oz] = outN(po.p, po.q); const x = po.p[0] + (po.q[0] - po.p[0]) * po.t, z = po.p[1] + (po.q[1] - po.p[1]) * po.t; const y = heightAt(x, z) - 0.05; const fr = cFrame(x, y, z, Math.atan2(ox, oz));
    if (po.kind === 'blind') { B.geo(shapeUV(new THREE.ShapeGeometry(archShape(3.6, 5.6), 12), 3.6, 5.6), M.white, fr(0, 0, 0.02)); B.geo(archFrame(3.6, 5.6, 0.32, 0.22), M.portal, fr(0, 0, -0.02)); continue; }
    B.geo(shapeUV(new THREE.ShapeGeometry(archShape(2.7, 4.7), 12), 2.7, 4.7), M.door, fr(0, 0, 0.04)); B.geo(archFrame(2.7, 4.7, 0.45, 0.3), M.portal, fr(0, 0, 0));
    for (const sx of [-1, 1]) { B.geo(cBox(0.7, 1.1, 0.6), M.portal, fr(sx * 2.15, 0.55, 0.3)); B.geo(new THREE.CylinderGeometry(0.2, 0.23, 3.6, 12), M.portal, fr(sx * 2.15, 2.9, 0.38)); B.geo(cBox(0.62, 0.35, 0.62), M.portal, fr(sx * 2.15, 4.85, 0.34));
      B.geo(cBox(2.1, 0.32, 0.55), M.portal, fr(sx * 1.55, 5.95, 0.3, 0, 0, sx * -0.38)); // broken pediment
      B.geo(cBox(0.36, 0.5, 0.36), M.portal, fr(sx * 2.55, 5.55, 0.3)); B.geo(new THREE.ConeGeometry(0.16, 0.9, 6), M.portal, fr(sx * 2.55, 6.25, 0.3)); B.geo(new THREE.SphereGeometry(0.12, 8, 6), M.portal, fr(sx * 2.55, 6.75, 0.3)); }
    B.geo(cBox(5.0, 0.42, 0.62), M.portal, fr(0, 5.25, 0.3)); B.geo(cBox(1.15, 1.35, 0.32), M.portal, fr(0, 6.2, 0.22)); B.geo(cBox(0.7, 0.7, 0.36), M.redStone, fr(0, 6.25, 0.26)); // coat of arms
    B.geo(cBox(0.8, 0.45, 0.5), M.portal, fr(0, 7.1, 0.25)); B.geo(cBox(0.18, 1.2, 0.18), M.portal, fr(0, 7.9, 0.25)); B.geo(cBox(0.75, 0.16, 0.18), M.portal, fr(0, 8.15, 0.25)); }
  // ---------- head block: dark basalt pilasters + two rows of windows
  for (let i = 0; i < Pe.length; i++) { const p = Pe[i], q = Pe[(i + 1) % Pe.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 2 || (onCut(p) && onCut(q))) continue; const [ox, oz] = outN(p, q); const ang = Math.atan2(ox, oz);
    const nb = Math.max(1, Math.round(L / 6.5)); const g0 = Math.min(heightAt(p[0], p[1]), heightAt(q[0], q[1]));
    for (let k = 0; k <= nb; k++) { const t = k / nb; const x = p[0] + (q[0] - p[0]) * t + ox * 0.12, z = p[1] + (q[1] - p[1]) * t + oz * 0.12; const ph = H2 - 0.5 - bot; B.geo(cBox(0.95, ph, 0.26), M.basalt, cFrame(x, bot + ph / 2, z, ang)(0, 0, 0)); }
    for (let k = 0; k < nb; k++) { const t = (k + 0.5) / nb; const x = p[0] + (q[0] - p[0]) * t + ox * 0.04, z = p[1] + (q[1] - p[1]) * t + oz * 0.04; const fr = cFrame(x, g0, z, ang);
      for (const [y, w, h] of [[2.6, 1.3, 0.9], [7.6, 1.25, 2.1], [10.9, 1.25, 2.1]]) { if (g0 + y + h > H2 - 0.8) continue; B.geo(shapeUV(new THREE.PlaneGeometry(w, h), w, h), M.win, fr(0, y + h / 2, 0.02)); for (const [fx, fy, fw, fh] of [[0, y - 0.1, w + 0.5, 0.2], [0, y + h + 0.1, w + 0.5, 0.22], [-w / 2 - 0.13, y + h / 2, 0.26, h], [w / 2 + 0.13, y + h / 2, 0.26, h]]) B.geo(cBox(fw, fh, 0.14), M.basalt, fr(fx, fy, 0.06)); } } }
  // ---------- the tower
  if (T) {
    const w = T.w, x0 = T.x, z0 = T.z; let y0 = 1e9; for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) y0 = Math.min(y0, heightAt(x0 + sx * w / 2, z0 + sz * w / 2)); y0 -= 0.3;
    const fr = cFrame(x0, y0, z0, T.ang); const hw = w / 2;
    // which faces are free (the church leans on one) and which one looks west (towards Callejón la Parra)
    const faces = [0, 1, 2, 3].map((k) => { const a = k * Math.PI / 2 + T.ang; const nx = Math.sin(a), nz = Math.cos(a); return { k, a: k * Math.PI / 2, nx, nz, free: !pip(x0 + nx * (hw + 1.2), z0 + nz * (hw + 1.2)) }; });
    let west = faces[0], wd = -2; for (const f of faces) { if (!f.free) continue; const dx = -544 - x0, dz = -368 - z0, dl = Math.hypot(dx, dz); const d = (f.nx * dx + f.nz * dz) / dl; if (d > wd) { wd = d; west = f; } }
    const onFace = (f, x, y, out = 0) => fr(Math.sin(f.a) * (hw + out) + Math.cos(f.a) * x, y, Math.cos(f.a) * (hw + out) - Math.sin(f.a) * x, f.a);
    const lv = [0, 6.2, 10.4, 14.4, 18.6]; // bodies
    B.geo(cBox(w + 0.4, 1.3, w + 0.4), M.basalt, fr(0, 0.65, 0));
    for (let i = 0; i < 4; i++) { const h = lv[i + 1] - lv[i]; B.geo(cBox(w, h, w), M.basalt, fr(0, lv[i] + h / 2, 0));
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) B.geo(cBox(0.7, h, 0.7), M.basalt, fr(sx * (hw - 0.27), lv[i] + h / 2, sz * (hw - 0.27))); // corner pilasters
      B.geo(cBox(w + 0.55, 0.32, w + 0.55), M.stone, fr(0, lv[i + 1] - 0.05, 0)); B.geo(cBox(w + 0.3, 0.18, w + 0.3), M.stone, fr(0, lv[i + 1] - 0.3, 0)); }
    for (const f of faces) { if (!f.free) continue;
      // windows with little iron balconies on bodies 2-4 (+ grated window low on body 1)
      const win = (y, ww, hh, balc) => { B.geo(shapeUV(new THREE.PlaneGeometry(ww, hh), ww, hh), M.win, onFace(f, 0, y + hh / 2, 0.03)); for (const [fx, fy, fw, fh] of [[0, y + hh + 0.12, ww + 0.5, 0.24], [-ww / 2 - 0.12, y + hh / 2, 0.24, hh], [ww / 2 + 0.12, y + hh / 2, 0.24, hh]]) B.geo(cBox(fw, fh, 0.16), M.stone, onFace(f, fx, fy, 0.06));
        if (balc) { B.geo(cBox(ww + 0.7, 0.14, 0.55), M.stone, onFace(f, 0, y - 0.07, 0.27)); B.geo(cBox(ww + 0.6, 0.05, 0.05), M.iron, onFace(f, 0, y + 0.9, 0.52)); for (let bx = -ww / 2 - 0.25; bx <= ww / 2 + 0.26; bx += 0.14) B.geo(cBox(0.03, 0.9, 0.03), M.iron, onFace(f, bx, y + 0.45, 0.52)); for (const sx of [-1, 1]) B.geo(cBox(0.05, 0.05, 0.5), M.iron, onFace(f, sx * (ww / 2 + 0.3), y + 0.9, 0.28)); }
        else for (let bx = -ww / 2 + 0.12; bx < ww / 2; bx += 0.18) B.geo(cBox(0.035, hh, 0.035), M.iron, onFace(f, bx, y + hh / 2, 0.08)); };
      win(2.2, 1.0, 1.3, false); win(7.4, 1.2, 1.8, true); win(11.5, 1.2, 1.8, true);
      // clock (body 4) on the three free faces
      B.geo(cBox(2.1, 2.1, 0.12), M.stone, onFace(f, 0, 16.4, 0.04)); B.geo(new THREE.CircleGeometry(0.85, 32), M.clock, onFace(f, 0, 16.4, 0.12)); win(14.7, 0.9, 0.7, false);
    }
    // belfry: two arched openings per side, bells, iron railing
    const bh = 4.2, by = lv[4];
    B.geo(cBox(w - 1.4, bh, w - 1.4), M.dark, fr(0, by + bh / 2, 0));
    for (const f of faces) { const s = new THREE.Shape(); s.moveTo(-hw, 0); s.lineTo(hw, 0); s.lineTo(hw, bh); s.lineTo(-hw, bh); s.closePath(); for (const ax of [-1.45, 1.45]) s.holes.push(archPath(1.7, 3.2, ax, 0.45));
      const g = new THREE.ExtrudeGeometry(s, { depth: 0.7, bevelEnabled: false, curveSegments: 10 }); g.translate(0, 0, -0.7); const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 2.4, uv.getY(i) / 2.4); B.geo(g, M.basalt, onFace(f, 0, by, 0));
      for (const ax of [-1.45, 1.45]) { B.geo(new THREE.CylinderGeometry(0.28, 0.5, 0.75, 14, 1, true), M.bell, onFace(f, ax, by + 2.2, -0.75)); B.geo(new THREE.SphereGeometry(0.29, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), M.bell, onFace(f, ax, by + 2.56, -0.75));
        B.geo(cBox(1.75, 0.05, 0.05), M.iron, onFace(f, ax, by + 1.35, 0.05)); for (let bx = -0.8; bx <= 0.81; bx += 0.16) B.geo(cBox(0.03, 0.9, 0.03), M.iron, onFace(f, ax + bx, by + 0.9, 0.05)); } }
    const ty = by + bh; B.geo(cBox(w + 0.7, 0.45, w + 0.7), M.stone, fr(0, ty + 0.2, 0)); B.geo(cBox(w + 0.45, 0.25, w + 0.45), M.stone, fr(0, ty - 0.12, 0));
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { B.geo(cBox(0.45, 0.6, 0.45), M.stone, fr(sx * (hw + 0.1), ty + 0.7, sz * (hw + 0.1))); B.geo(new THREE.SphereGeometry(0.26, 10, 8), M.stone, fr(sx * (hw + 0.1), ty + 1.2, sz * (hw + 0.1))); }
    // octagonal lantern with arches, cornice, small dome, cross
    const r8 = w * 0.36, oh = 3.0, oy = ty + 0.42; B.geo(new THREE.CylinderGeometry(r8, r8, oh, 8), M.basalt, fr(0, oy + oh / 2, 0, Math.PI / 8));
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; const ap = r8 * Math.cos(Math.PI / 8) + 0.02; const g = shapeUV(new THREE.ShapeGeometry(archShape(0.8, 1.9), 8), 0.8, 1.9); B.geo(g, M.dark, fr(Math.sin(a) * ap, oy + 0.5, Math.cos(a) * ap, a));
      B.geo(archFrame(0.8, 1.9, 0.14, 0.1), M.stone, fr(Math.sin(a) * (ap - 0.06), oy + 0.5, Math.cos(a) * (ap - 0.06), a)); }
    B.geo(new THREE.CylinderGeometry(r8 + 0.35, r8 + 0.2, 0.4, 8), M.stone, fr(0, oy + oh + 0.2, 0, Math.PI / 8));
    B.geo(new THREE.SphereGeometry(r8 * 0.92, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.basalt, fr(0, oy + oh + 0.4, 0, 0, 0, 0, [1, 0.8, 1]));
    const top = oy + oh + 0.4 + r8 * 0.75; B.geo(new THREE.SphereGeometry(0.22, 10, 8), M.stone, fr(0, top + 0.15, 0)); B.geo(cBox(0.1, 1.3, 0.1), M.iron, fr(0, top + 0.9, 0)); B.geo(cBox(0.7, 0.1, 0.1), M.iron, fr(0, top + 1.2, 0));
    // wooden Canarian gallery at the foot of the west face + iron fence with plants
    { const f = west; B.geo(cBox(4.4, 0.22, 1.2), M.wood, onFace(f, -0.6, 4.3, 0.6)); B.geo(cBox(4.4, 1.6, 0.08), M.win, onFace(f, -0.6, 5.2, 1.18)); for (const sx of [-1, 1]) B.geo(cBox(0.08, 1.6, 1.1), M.wood, onFace(f, -0.6 + sx * 2.18, 5.2, 0.62));
      for (let bx = -2.6; bx <= 1.41; bx += 0.55) B.geo(cBox(0.08, 1.6, 0.1), M.wood, onFace(f, bx, 5.2, 1.2)); B.geo(cBox(4.6, 0.1, 0.1), M.wood, onFace(f, -0.6, 4.75, 1.22));
      B.geo(cBox(4.9, 0.12, 1.5), M.tile, onFace(f, -0.6, 6.15, 0.68, 0, -0.35));
      for (let bx = -hw; bx <= hw + 0.01; bx += 0.15) B.geo(cBox(0.03, 1.4, 0.03), M.iron, onFace(f, bx, 0.7, 1.7)); for (const y of [0.12, 1.35]) B.geo(cBox(w, 0.05, 0.05), M.iron, onFace(f, 0, y, 1.7));
      B.geo(cBox(w - 0.4, 0.4, 1.3), M.basalt, onFace(f, 0, 0.2, 0.9)); B.geo(new THREE.IcosahedronGeometry(0.5, 0), new THREE.MeshStandardMaterial({ color: 0x3f6b35, roughness: 1 }), onFace(f, 1.6, 0.6, 0.9)); }
    // collisions: the tower square
    const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz]) => { const v = new THREE.Vector3(sx * (hw + 0.2), 0, sz * (hw + 0.2)).applyMatrix4(fr(0, 0, 0)); return [v.x, v.z]; });
    for (let i = 0; i < 4; i++) COL.addSeg(C[i][0], C[i][1], C[(i + 1) % 4][0], C[(i + 1) % 4][1]);
    if (west.free) { const a = new THREE.Vector3(-hw, 0, 0), b = new THREE.Vector3(hw, 0, 0); const m1 = onFace(west, -hw, 0, 1.7), m2 = onFace(west, hw, 0, 1.7); a.set(0, 0, 0).applyMatrix4(m1); b.set(0, 0, 0).applyMatrix4(m2); COL.addSeg(a.x, a.z, b.x, b.z); }
    // story hooks (Boca Papa sits at the foot of the tower, on the side away from the church)
    const tw = { x: x0, z: z0, ang: T.ang, w }; { const o = 7.5, nx = x0 - ch.cx, nz = z0 - ch.cz, nl = Math.hypot(nx, nz) || 1; CONC_TOWER.x = x0 + nx / nl * o; CONC_TOWER.z = z0 + nz / nl * o; } CONC_TOWER.ok = true; CONC_TOWER.tw = tw; CONC_TOWER.pts = ch.pts; CONC_TOWER.y0 = y0; CONC_TOWER.h = top + 1.6;
  }
  B.finish(root); scene.add(root); CONC_TOWER.group = root;
}
