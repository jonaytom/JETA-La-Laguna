// ============ hand-placed houses missing from OpenStreetMap ============
// Casa del hermano de Jonay — Av. San Miguel de Chimisay / Av. El Cardonal (Google Maps 28.452009, -16.298734 →
// game (1591, 3924)). White 2-storey corner house with a small rooftop room (torreta), grey door, black-framed
// windows and a whitewashed boundary wall. Reference photos: docs/referencias/chimisay/
const CUSTOM_HOUSES = [{ name: 'Casa del hermano', x: 1587, z: 3924, ang: Math.atan2(-28, 22), w: 9, d: 7.5, floors: 2, turret: true }];
function buildCustomHouses() {
  const M = concMaterials();
  const B = concBuckets();
  const root = new THREE.Group();
  root.name = 'casas';
  root.userData.batchLandmark = true;
  const white = new THREE.MeshStandardMaterial({ map: M.plaster.map, color: 0xffffff, roughness: 0.9 });
  white.color.setRGB(1.08, 1.09, 1.1);
  plasterWorld(white, 0, 1.5, 'enlucido', 2.4); // v1.4.1: Poly Haven plaster
  const grey = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.6, metalness: 0.2 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.5 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x2b3640, roughness: 0.15, metalness: 0.5 });
  const sill = new THREE.MeshStandardMaterial({ color: 0x8e8a84, roughness: 0.8 });
  for (const h of CUSTOM_HOUSES) {
    buildCustomHousesEach(h, B, white, sill, grey, glass, frame);
  }
  try {
    buildTac67(root, B, M);
  } catch (e) {
    console.error('tacoronte 67', e);
  } // v1.4.41: the garage with the Linguini Gold Edition
  B.finish(root);
  scene.add(root);
}
/** (v1.1.7, code quality) the body of a loop of buildCustomHouses, split out of it */
function buildCustomHousesEach(h, B, white, sill, grey, glass, frame) {
  let { y0, fr, fh, H, faces } = buildCustomHousesEachPart1(h, B, white, sill, grey);
  for (const [a, len, dep] of faces) {
    const on = (x, y, o = 0) => fr(Math.sin(a) * (dep / 2 + o) + Math.cos(a) * x, y, Math.cos(a) * (dep / 2 + o) - Math.sin(a) * x, a);
    const nW = Math.max(1, Math.floor(len / 3.2));
    for (let f = 0; f < h.floors; f++)
      for (let k = 0; k < nW; k++) {
        const x = ((k + 0.5) / nW) * len - len / 2;
        if (a === 0 && f === 0 && k === 0) continue;
        const y = f * fh + 1.0 + (f ? 0.2 : 0.3),
          ww = 1.1,
          wh = 1.3;
        B.geo(cBox(ww, wh, 0.04), glass, on(x, y + wh / 2, 0.01));
        for (const [fx, fy, fw, fhh] of [
          [0, y, ww + 0.16, 0.08],
          [0, y + wh, ww + 0.16, 0.08],
          [-ww / 2, y + wh / 2, 0.08, wh],
          [ww / 2, y + wh / 2, 0.08, wh],
          [0, y + wh / 2, 0.05, wh]
        ])
          B.geo(cBox(fw, fhh, 0.08), frame, on(x + fx, fy, 0.04));
        B.geo(cBox(ww + 0.3, 0.07, 0.22), sill, on(x, y - 0.04, 0.1));
      }
    if (a === 0) {
      const x = (0.5 / nW) * len - len / 2;
      B.geo(cBox(1.1, 2.3, 0.06), grey, on(x, 1.15 + 0.35, 0.02));
      B.geo(cBox(1.35, 0.1, 0.5), sill, on(x, 2.85, 0.25));
      B.geo(cBox(1.3, 0.35, 0.6), sill, on(x, 0.17, 0.3));
    }
  }
  // whitewashed boundary wall along the side (garden/patio)
  B.geo(cBox(0.25, 1.6, h.d, 3), white, fr(h.w / 2 + 2.2, 0.8, 0));
  B.geo(cBox(2.2, 1.6, 0.25, 3), white, fr(h.w / 2 + 1.1, 0.8, -h.d / 2));
  B.geo(cBox(0.35, 0.08, h.d, 3), sill, fr(h.w / 2 + 2.2, 1.64, 0));
  // collisions
  const C = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ].map(([sx, sz]) => {
    const v = new THREE.Vector3((sx * h.w) / 2, 0, (sz * h.d) / 2).applyMatrix4(fr(0, 0, 0));
    return [v.x, v.z];
  });
  for (let i = 0; i < 4; i++) COL.addSeg(C[i][0], C[i][1], C[(i + 1) % 4][0], C[(i + 1) % 4][1]);
  {
    const a = new THREE.Vector3(h.w / 2 + 2.2, 0, -h.d / 2).applyMatrix4(fr(0, 0, 0)),
      b = new THREE.Vector3(h.w / 2 + 2.2, 0, h.d / 2).applyMatrix4(fr(0, 0, 0)),
      c = new THREE.Vector3(h.w / 2, 0, -h.d / 2).applyMatrix4(fr(0, 0, 0));
    COL.addSeg(a.x, a.z, b.x, b.z);
    COL.addSeg(c.x, c.z, a.x, a.z);
  }
  BUILD.push({ pts: C, cx: h.x, cz: h.z, top: y0 + H, bmax: y0, style: 1, name: h.name, H });
}
/** (v1.1.7, code quality) part of buildCustomHousesEach: body + plinth + parapet with coping */
function buildCustomHousesEachPart1(h, B, white, sill, grey) {
  let y0 = 1e9;
  for (const [sx, sz] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ]) {
    const c = Math.cos(h.ang),
      s = Math.sin(h.ang);
    y0 = Math.min(y0, heightAt(h.x + ((sx * h.w) / 2) * c + ((sz * h.d) / 2) * s, h.z - ((sx * h.w) / 2) * s + ((sz * h.d) / 2) * c));
  }
  y0 -= 0.25;
  const fr = cFrame(h.x, y0, h.z, h.ang);
  const fh = 3.0,
    H = h.floors * fh + 0.4;
  // body + plinth + parapet with coping
  B.geo(cBox(h.w, H, h.d, 3), white, fr(0, H / 2, 0));
  B.geo(cBox(h.w + 0.08, 0.7, h.d + 0.08, 2), sill, fr(0, 0.35, 0));
  for (const [px, pz, pw, pd] of [
    [0, h.d / 2 - 0.1, h.w, 0.2],
    [0, -h.d / 2 + 0.1, h.w, 0.2],
    [h.w / 2 - 0.1, 0, 0.2, h.d],
    [-h.w / 2 + 0.1, 0, 0.2, h.d]
  ]) {
    B.geo(cBox(pw, 0.9, pd, 3), white, fr(px, H + 0.45, pz));
    B.geo(cBox(pw + 0.12, 0.08, pd + 0.12, 3), sill, fr(px, H + 0.94, pz));
  }
  B.geo(cBox(h.w - 0.4, 0.1, h.d - 0.4, 3), sill, fr(0, H + 0.05, 0)); // terrace floor
  // rooftop room (torreta) with its own little parapet and a door
  if (h.turret) {
    const tw = 3.2,
      td = 3.0,
      th = 2.6;
    B.geo(cBox(tw, th, td, 3), white, fr(-h.w / 2 + tw / 2 + 0.6, H + th / 2, -h.d / 2 + td / 2 + 0.6));
    B.geo(cBox(tw + 0.12, 0.1, td + 0.12, 3), sill, fr(-h.w / 2 + tw / 2 + 0.6, H + th + 0.05, -h.d / 2 + td / 2 + 0.6));
    B.geo(cBox(0.85, 2.0, 0.06), grey, fr(-h.w / 2 + tw / 2 + 0.6, H + 1.0, -h.d / 2 + td + 0.63));
  }
  // windows (black frames) on the 4 faces, door on the street face (+z local)
  const faces = [
    [0, h.w, h.d],
    [Math.PI, h.w, h.d],
    [Math.PI / 2, h.d, h.w],
    [-Math.PI / 2, h.d, h.w]
  ];
  return { y0, fr, fh, H, faces };
}

// ============ Finca España: pabellón del Complejo Deportivo Islas Canarias (vacío en OSM) ============
// Grey concrete hall next to the football pitch (C. Tacoronte / C. Tinguaro): mono-pitch white roof that overhangs
// the corner, a band of sea-green glass and dark louvres under it, purple pillars on the ground floor and the sign
// over the entrance. Reference photos: docs/referencias/finca_espana/
const PABELLON = { x0: 1905, x1: 1943, z0: 1291, z1: 1349, H: 13 };
function buildPabellon() {
  const M = concMaterials();
  const B = concBuckets();
  const root = new THREE.Group();
  root.name = 'pabellon';
  root.userData.batchLandmark = true;
  const mt = (c, r = 0.85, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, side: THREE.DoubleSide });
  const conc = mt(0x9b9c98, 0.95),
    roof = mt(0xf0f0ec, 0.6),
    sea = new THREE.MeshStandardMaterial({ color: 0x7fc2b4, roughness: 0.15, metalness: 0.4 }),
    louv = mt(0x2b2e31, 0.6, 0.3),
    purple = mt(0x7a3e8e, 0.6),
    glass = new THREE.MeshStandardMaterial({ color: 0x24323c, roughness: 0.1, metalness: 0.5 });
  const { x0, x1, z0, z1, H } = PABELLON;
  let { cx, cz, W, D, g0, fr } = buildPabellonPart1(x0, x1, z0, z1, B, H, conc, sea);
  B.geo(cBox(W + 0.12, 1.2, D + 0.12), louv, fr(0, H - 2.6 + 2.0, 0));
  for (let x = -W / 2; x <= W / 2; x += 0.6) for (const sd of [-1, 1]) B.geo(cBox(0.08, 1.2, 0.25), louv, fr(x, H - 0.6, sd * (D / 2 + 0.12)));
  // mono-pitch roof rising to the north-west corner, overhanging it
  B.geo(cBox(W + 7, 0.5, D + 6), roof, fr(-1.5, H + 0.6, -1.5, 0, 0.05, -0.04));
  for (const [px, pz] of [
    [-W / 2 - 3, -D / 2 - 2.5],
    [-W / 2 - 3, 0],
    [0, -D / 2 - 2.5]
  ]) {
    B.geo(new THREE.CylinderGeometry(0.25, 0.25, H, 10), M.iron, fr(px, H / 2, pz));
    COL.addCirc(cx + px, cz + pz, 0.35);
  }
  // ground floor on C. Tacoronte (north): glazed entrance between purple pillars + sign
  B.geo(cBox(W - 6, 3.2, 0.12), glass, fr(0, 1.8, -D / 2 - 0.05));
  for (let x = -W / 2 + 3; x <= W / 2 - 3; x += 4) B.geo(cBox(0.6, 3.6, 0.6), purple, fr(x, 1.8, -D / 2 - 0.4));
  const sg = bigSign('COMPLEJO DEPORTIVO ISLAS CANARIAS', 18, 1.3, '#ffffff', '#1f4e8c');
  sg.position.set(cx, g0 + 4.6, z0 - 0.7);
  sg.rotation.y = Math.PI;
  root.add(sg);
  for (const [ax, az, bx, bz] of [
    [x0, z0, x1, z0],
    [x1, z0, x1, z1],
    [x1, z1, x0, z1],
    [x0, z1, x0, z0]
  ])
    COL.addSeg(ax, az, bx, bz);
  BUILD.push({
    pts: [
      [x0, z0],
      [x1, z0],
      [x1, z1],
      [x0, z1]
    ],
    cx,
    cz,
    top: g0 + H,
    bmax: g0,
    style: 3,
    name: 'Pabellón Islas Canarias',
    H
  });
  LABELS.push(['Complejo Deportivo Islas Canarias', cx, cz, 2]);
  B.finish(root);
  scene.add(root);
}
/** (v1.1.7, code quality) part of buildPabellon: upper band: sea-green glass + dark louvres all round */
function buildPabellonPart1(x0, x1, z0, z1, B, H, conc, sea) {
  const cx = (x0 + x1) / 2,
    cz = (z0 + z1) / 2,
    W = x1 - x0,
    D = z1 - z0;
  let g0 = 1e9;
  for (const [x, z] of [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1]
  ])
    g0 = Math.min(g0, heightAt(x, z));
  g0 -= 0.3;
  const fr = cFrame(cx, g0, cz, 0);
  B.geo(cBox(W, H - 2.6, D, 3), conc, fr(0, (H - 2.6) / 2, 0));
  // upper band: sea-green glass + dark louvres all round
  B.geo(cBox(W + 0.1, 1.4, D + 0.1), sea, fr(0, H - 2.6 + 0.7, 0));
  return { cx, cz, W, D, g0, fr };
}

// ============ C. Tacoronte 67 (Finca España): la casa del garaje con el Linguini Gold Edition (v1.4.41) ============
// Jonay (22-nov, con fotos de Street View): «me gustaría tener un coche secreto que es el linguini pero con pintura
// dorada… se llama Linguini Gold Edition… va a estar en esa casa (calle tacoronte 67) y vas a remodelar la casa para que
// sea con un garaje que tiene un botón que si lo pulsas se abre la puerta y ves el linguini».
// Real: edificio de 4 plantas color melocotón entre vecinas (la de al lado, rosa), balcones volados con balaustrada
// blanca, planta baja con zócalo de granito gris, portón seccional blanco con una rejilla blanca encima, puerta blanca
// con el 67, ventanas con reja blanca de forja y jardineras de barro; delante, un murete con balaustrada blanca y
// pilares rematados con bolas. Enfrente, el muro del campo de fútbol con sus focos; la calle sube hacia el este.
// En el OSM es parte de un bloque largo (todo el frente norte de la calle): se le abre un hueco (carveTac67, desde
// 04_world.js antes de usar DATA.B) y la casa se hace aquí. (functions only: carveTac67 runs before this file's constants)
function tac67() {
  // frame: origin at the middle of the façade, at street level; local +z = towards the street (south), +x = uphill (east)
  const ang = 0.09422,
    c = Math.cos(ang),
    s = Math.sin(ang),
    ox = 1994.06,
    oz = 1263.0;
  return {
    ang,
    ox,
    oz,
    W: 9.6, // the house (a bit wider and deeper than the hole: the block's walls are inset 0.75 m)
    D: 13.6,
    hw: 4.3, // the hole in the OSM block: ±4.3 m, back at −13 m
    back: -13,
    toW: (lx, lz) => [ox + lx * c + lz * s, oz - lx * s + lz * c],
    toL: (x, z) => [(x - ox) * c - (z - oz) * s, (x - ox) * s + (z - oz) * c]
  };
}
/** the street side of the garden (driveway, gate, pavement): no parked cars there */
function tac67Blocks(x, z) {
  if (Math.abs(x - 1994) > 30 || Math.abs(z - 1265) > 30) return false;
  const [lx, lz] = tac67().toL(x, z);
  return lx > -1.5 && lx < 6.5 && lz > -14 && lz < 9;
}
/** the front garden and the house itself (no tufts of grass in the drive) */
function tac67Yard(x, z) {
  if (Math.abs(x - 1994) > 30 || Math.abs(z - 1265) > 30) return false;
  const [lx, lz] = tac67().toL(x, z);
  return Math.abs(lx) < 5.2 && lz > -14 && lz < 3.8;
}
function carveTac67() {
  const T = tac67(),
    [hx, hz] = T.toW(0, -6);
  const pip = (c) => {
    let o = false;
    for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2)
      if (c[i + 1] > hz !== c[j + 1] > hz && hx < ((c[j] - c[i]) * (hz - c[i + 1])) / (c[j + 1] - c[i + 1]) + c[i]) o = !o;
    return o;
  };
  const b = DATA.B.find((q) => pip(q[6]));
  if (!b) return console.warn('C. Tacoronte 67: no OSM block found');
  const c = b[6],
    n = c.length / 2,
    L = [];
  for (let i = 0; i < n; i++) L.push(T.toL(c[2 * i], c[2 * i + 1]));
  // the frontmost crossing of each side of the hole (the street edge)
  const cross = (X) => {
    let best = null;
    for (let i = 0; i < n; i++) {
      const a = L[i],
        q = L[(i + 1) % n];
      if ((a[0] - X) * (q[0] - X) > 0 || a[0] === q[0]) continue;
      const t = (X - a[0]) / (q[0] - a[0]),
        z = a[1] + t * (q[1] - a[1]);
      if (z > T.back && (!best || z > best.z)) best = { i, t, z, X };
    }
    return best;
  };
  const P = cross(T.hw),
    Q = cross(-T.hw);
  if (!P || !Q) return console.warn('C. Tacoronte 67: hole not carved');
  const inside = (p) => Math.abs(p[0]) < T.hw && p[1] > T.back;
  const path = (A, Bq) => [
    [A.X, A.z],
    [A.X, T.back],
    [Bq.X, T.back],
    [Bq.X, Bq.z]
  ];
  // walk from the first crossing to the second along the outline: the vertices in between must be in the hole
  const tryWalk = (A, Bq) => {
    if (A.i === Bq.i && A.t > Bq.t) return null;
    const drop = [];
    if (A.i !== Bq.i)
      for (let k = (A.i + 1) % n; ; k = (k + 1) % n) {
        drop.push(k);
        if (k === Bq.i) break;
      }
    if (!drop.every((d) => inside(L[d]))) return null;
    const out = [];
    for (let k = (Bq.i + 1) % n, cnt = 0; cnt < n - drop.length; k = (k + 1) % n, cnt++) out.push(L[k]);
    return out.concat(path(A, Bq));
  };
  const pts = tryWalk(P, Q) || tryWalk(Q, P);
  if (!pts) return console.warn('C. Tacoronte 67: odd outline, hole not carved');
  b[6] = pts.map(([lx, lz]) => T.toW(lx, lz)).flat();
}
function buildTac67(root, B, M) {
  const T = tac67();
  const mat = (cl, r = 0.85, m = 0) => new THREE.MeshStandardMaterial({ color: cl, roughness: r, metalness: m });
  const peach = new THREE.MeshStandardMaterial({ map: M.plaster.map, color: 0xe9c3a0, roughness: 0.9 });
  plasterWorld(peach, 0, 1.5, 'enlucido', 2.4);
  const white = mat(0xf4f2ec, 0.6),
    granite = mat(0x85878a, 0.7),
    terra = mat(0xa9542f, 0.9),
    green = mat(0x3d7334, 0.95),
    glass = mat(0x2b3640, 0.15, 0.5),
    inner = mat(0xc9c6c0, 0.9),
    floorM = mat(0x77777a, 0.95),
    lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4dc, emissiveIntensity: 1.6 }),
    red = new THREE.MeshStandardMaterial({ color: 0xc81e1e, emissive: 0x9a0d0d, emissiveIntensity: 0.8 });
  const hW = T.W / 2,
    D = T.D;
  const gAt = (lx, lz) => heightAt(...T.toW(lx, lz));
  const g = gAt(2.55, 0.5); // street level at the garage
  let hmin = 1e9;
  for (const [lx, lz] of [
    [-hW, 0],
    [hW, 0],
    [-hW, -D],
    [hW, -D],
    [-hW, 3.4],
    [hW, 3.4]
  ])
    hmin = Math.min(hmin, gAt(lx, lz));
  const yb = hmin - g - 0.6;
  const fr = cFrame(T.ox, g, T.oz, T.ang);
  const box = (x0, x1, y0, y1, z0, z1, m, s = 2.4) => B.geo(cBox(x1 - x0, y1 - y0, z1 - z0, s), m, fr((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));
  // ground floor around the garage (x 0.6–4.5, 7 m deep, door 1.05–4.05 × 2.42 m) and the floors above
  box(-hW, 0.6, yb, 3, -D, 0, peach, 3);
  box(0.6, hW, yb, 3, -D, -7, peach, 3);
  box(4.5, hW, yb, 3, -7, 0, peach, 3);
  box(0.6, 1.05, yb, 3, -0.3, 0, peach, 3);
  box(4.05, 4.5, yb, 3, -0.3, 0, peach, 3);
  box(1.05, 4.05, 2.42, 3, -0.3, 0, peach, 3);
  box(-hW, hW, 3, 12, -D, 0, peach, 3);
  box(-hW, hW, 12, 12.9, -0.25, 0, peach, 3); // parapet
  box(-hW - 0.06, hW + 0.06, 12.9, 13.0, -0.35, 0.1, white);
  box(-hW, hW, 2.95, 3.12, 0, 0.06, white); // string course
  // garage inside: pale walls, ceiling, concrete floor following the street, a lamp
  {
    let ha = 0;
    for (const [lx, lz] of [
      [0.6, 0],
      [4.5, 0],
      [0.6, -7],
      [4.5, -7]
    ])
      ha += gAt(lx, lz) / 4;
    box(0.6, 4.5, ha - g - 0.4, ha - g + 0.03, -7, -0.3, floorM);
    box(0.6, 0.66, 0, 2.99, -7, -0.3, inner);
    box(4.44, 4.5, 0, 2.99, -7, -0.3, inner);
    box(0.6, 4.5, 0, 2.99, -7, -6.94, inner);
    box(0.6, 4.5, 2.93, 2.99, -7, -0.3, inner);
    box(1.9, 3.2, 2.86, 2.93, -4.2, -3.9, lamp);
    box(0.7, 1.0, 0.9, 1.0, -6.9, -2.5, white); // a shelf
  }
  // granite plinth (not across the garage mouth), the white grille over the garage door
  box(-hW - 0.04, 1.05, yb, 0.6, 0, 0.08, granite);
  box(4.05, hW + 0.04, yb, 0.6, 0, 0.08, granite);
  box(1.05, 4.05, 2.45, 2.95, -0.05, 0.0, mat(0x1a1d20, 0.8));
  for (let x = 1.1; x < 4.05; x += 0.1) box(x, x + 0.035, 2.45, 2.95, 0, 0.04, white);
  box(1.0, 4.1, 2.42, 2.47, 0, 0.06, white);
  box(1.0, 4.1, 2.93, 2.98, 0, 0.06, white);
  // entrance door (white) with its frame and the step
  box(-1.12, -0.08, 0.12, 2.38, 0.0, 0.06, white);
  for (let y = 0.4; y < 2.3; y += 0.55) box(-1.0, -0.2, y, y + 0.03, 0.06, 0.08, mat(0xdedbd4, 0.6));
  box(-1.25, 0.05, 2.38, 2.48, 0, 0.1, white);
  box(-1.3, 0.1, yb, 0.12, 0, 0.45, granite);
  {
    const cv = mkCanvas(128, 80),
      x = cv.getContext('2d');
    x.fillStyle = '#f7f5f0';
    x.fillRect(0, 0, 128, 80);
    x.strokeStyle = '#3a3a3a';
    x.lineWidth = 4;
    x.strokeRect(4, 4, 120, 72);
    x.fillStyle = '#1e1e1e';
    x.font = 'bold 58px Georgia, serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText('67', 64, 44);
    const tx = new THREE.CanvasTexture(cv);
    tx.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.2), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.6 }));
    const [wx, wz] = T.toW(0.35, 0.02);
    m.position.set(wx, g + 1.7, wz);
    m.rotation.y = T.ang;
    root.add(m);
  }
  // ground-floor window with a white wrought-iron grille and a terracotta flower box
  {
    const xc = -3.0;
    box(xc - 0.7, xc + 0.7, 1.0, 2.3, -0.06, 0.0, glass);
    box(xc - 0.78, xc + 0.78, 0.94, 1.0, 0, 0.12, white);
    for (let x = xc - 0.66; x <= xc + 0.67; x += 0.12) box(x, x + 0.03, 1.0, 2.35, 0.12, 0.15, white);
    for (const y of [1.05, 1.65, 2.3]) box(xc - 0.72, xc + 0.72, y, y + 0.035, 0.11, 0.16, white);
    box(xc - 0.75, xc + 0.75, 0.62, 0.9, 0.18, 0.46, terra);
    box(xc - 0.68, xc + 0.68, 0.9, 1.08, 0.22, 0.42, green);
  }
  // the 3 upper floors: two projecting balconies each, white balustrade, glazed door + window behind
  for (let f = 1; f <= 3; f++) {
    const fb = f * 3 + 0.08;
    for (const xc of [-2.35, 2.35]) {
      const bw = 4.0,
        bd = 1.1;
      box(xc - bw / 2, xc + bw / 2, fb - 0.18, fb, 0, bd, white);
      box(xc - bw / 2, xc + bw / 2, fb + 0.95, fb + 1.03, bd - 0.1, bd, white);
      box(xc - bw / 2, xc + bw / 2, fb, fb + 0.1, bd - 0.1, bd, white);
      for (const sd of [-1, 1]) {
        box(xc + sd * (bw / 2) - 0.05, xc + sd * (bw / 2) + 0.05, fb + 0.95, fb + 1.03, 0, bd, white);
        for (let z = 0.18; z < bd - 0.1; z += 0.2)
          box(xc + sd * (bw / 2) - 0.03, xc + sd * (bw / 2) + 0.03, fb + 0.1, fb + 0.95, z - 0.03, z + 0.03, white);
      }
      for (let x = xc - bw / 2 + 0.12; x < xc + bw / 2 - 0.05; x += 0.2) box(x - 0.03, x + 0.03, fb + 0.1, fb + 0.95, bd - 0.08, bd - 0.02, white);
      // glazed door and a window
      const dx = xc - 0.8,
        wx = xc + 0.9;
      box(dx - 0.6, dx + 0.6, fb, fb + 2.2, -0.06, 0, glass);
      box(dx - 0.68, dx + 0.68, fb + 2.2, fb + 2.28, 0, 0.06, white);
      for (const x of [dx - 0.64, dx, dx + 0.64]) box(x - 0.04, x + 0.04, fb, fb + 2.2, 0, 0.05, white);
      box(wx - 0.55, wx + 0.55, fb + 0.9, fb + 2.1, -0.06, 0, glass);
      box(wx - 0.62, wx + 0.62, fb + 2.1, fb + 2.17, 0, 0.06, white);
      box(wx - 0.62, wx + 0.62, fb + 0.83, fb + 0.9, 0, 0.1, white);
      for (const x of [wx - 0.58, wx, wx + 0.58]) box(x - 0.035, x + 0.035, fb + 0.9, fb + 2.1, 0, 0.05, white);
    }
  }
  // front garden wall: granite base, white balustrade, pillars with ball finials (gap for the drive and the gate)
  const wz0 = 3.25,
    wz1 = 3.5;
  const pillar = (x, z) => {
    const y = gAt(x, z) - g;
    box(x - 0.17, x + 0.17, y - 0.4, y + 1.05, z - 0.17, z + 0.17, white);
    box(x - 0.21, x + 0.21, y + 1.05, y + 1.12, z - 0.21, z + 0.21, white);
    B.geo(new THREE.SphereGeometry(0.13, 10, 8), white, fr(x, y + 1.25, z));
  };
  const wallRun = (x0, x1, z0, z1, alongX) => {
    const y = gAt((x0 + x1) / 2, (z0 + z1) / 2) - g;
    box(x0, x1, y - 0.5, y + 0.45, z0, z1, granite);
    box(x0, x1, y + 0.45, y + 0.52, z0 - 0.03, z1 + 0.03, white);
    box(x0, x1, y + 0.88, y + 0.95, z0 - 0.04, z1 + 0.04, white);
    if (alongX) for (let x = x0 + 0.12; x < x1 - 0.06; x += 0.18) box(x - 0.035, x + 0.035, y + 0.52, y + 0.88, z0 + 0.06, z1 - 0.06, white);
    else for (let z = z0 + 0.12; z < z1 - 0.06; z += 0.18) box(x0 + 0.06, x1 - 0.06, y + 0.52, y + 0.88, z - 0.035, z + 0.035, white);
  };
  for (const [x0, x1] of [
    [-hW, -1.15],
    [-0.05, 0.85],
    [4.25, hW]
  ]) {
    wallRun(x0, x1, wz0, wz1, true);
    pillar(x0, (wz0 + wz1) / 2);
    pillar(x1, (wz0 + wz1) / 2);
  }
  for (const sx of [-hW, hW]) wallRun(sx - 0.12, sx + 0.12, 0.1, wz0, false);
  // the garage door (white sectional, up-and-over) and the button next to it
  const doorTex = (() => {
    const cv = mkCanvas(128, 128),
      x = cv.getContext('2d');
    x.fillStyle = '#f3f2ee';
    x.fillRect(0, 0, 128, 128);
    for (let i = 1; i < 4; i++) {
      x.fillStyle = '#c9c7c1';
      x.fillRect(0, i * 32 - 2, 128, 3);
      x.fillStyle = '#ffffff';
      x.fillRect(0, i * 32 + 1, 128, 2);
    }
    for (let i = 0; i < 4; i++) {
      x.fillStyle = 'rgba(0,0,0,0.05)';
      x.fillRect(0, i * 32 + 22, 128, 8);
    }
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const outer = new THREE.Group(),
    hinge = new THREE.Group();
  const [hx, hz] = T.toW(2.55, -0.16);
  outer.position.set(hx, g + 2.42, hz);
  outer.rotation.y = T.ang;
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 2.42, 0.06),
    new THREE.MeshStandardMaterial({ map: doorTex, roughness: 0.55, metalness: 0.1 })
  );
  door.position.y = -1.21;
  door.castShadow = door.receiveShadow = true;
  hinge.add(door);
  outer.add(hinge);
  outer.userData.noMerge = true; // it moves: kept out of the merged batches (05w_optimiza.js)
  root.add(outer);
  box(4.27, 4.45, 1.18, 1.44, 0, 0.04, mat(0x8a8d90, 0.4, 0.6));
  box(4.32, 4.4, 1.27, 1.35, 0.04, 0.08, red);
  // collisions: façade, the garage (sides, back), the house's sides and back, the garden wall; the door (toggled)
  const seg = (a, b, c2, d) => {
    const [x1, z1] = T.toW(a, b),
      [x2, z2] = T.toW(c2, d);
    COL.addSeg(x1, z1, x2, z2);
  };
  seg(-hW, 0, 1.05, 0);
  seg(4.05, 0, hW, 0);
  seg(0.6, -0.3, 0.6, -7);
  seg(4.5, -0.3, 4.5, -7);
  seg(0.6, -7, 4.5, -7);
  seg(-hW, 0, -hW, -D);
  seg(hW, 0, hW, -D);
  seg(-hW, -D, hW, -D);
  for (const [x0, x1] of [
    [-hW, -1.15],
    [-0.05, 0.85],
    [4.25, hW]
  ])
    seg(x0, (wz0 + wz1) / 2, x1, (wz0 + wz1) / 2);
  seg(-hW, 0, -hW, wz0);
  seg(hW, 0, hW, wz0);
  const doorSeg = COL.segs.length / 4;
  seg(1.05, -0.1, 4.05, -0.1);
  const cs = [
    [-hW, -D],
    [hW, -D],
    [hW, 0],
    [-hW, 0]
  ].map(([a, b]) => T.toW(a, b));
  const [cx, cz] = T.toW(0, -D / 2);
  BUILD.push({ pts: cs, cx, cz, top: g + 13, bmax: g + yb, style: 1, name: 'C. Tacoronte 67', H: 13 });
  GARAJE.setup({
    hinge,
    doorSeg,
    doorXZ: COL.segs.slice(doorSeg * 4, doorSeg * 4 + 4),
    button: T.toW(4.36, 0.4),
    spot: T.toW(2.55, -3.7),
    h: T.ang,
    lamp
  });
}
// the garage: the button opens / closes the door; the Linguini Gold Edition waits inside (it comes back home if left far away)
const GARAJE = (() => {
  let S = null,
    open = false,
    th = 0,
    car = null;
  function setup(s) {
    S = s;
  }
  function near() {
    if (!S || PLAYER.car || PLAYER.interior || PLAYER.dead) return false;
    return Math.hypot(PLAYER.x - S.button[0], PLAYER.z - S.button[1]) < 1.9;
  }
  function prompt() {
    return near() ? `${CONTROLS.kbd('use')} ${open ? 'Cerrar el garaje' : 'Pulsar el botón del garaje'}` : '';
  }
  function use() {
    if (!near()) return false;
    open = !open;
    if (typeof AUDIO !== 'undefined' && AUDIO.door) AUDIO.door();
    if (!open) for (let k = 0; k < 4; k++) COL.segs[S.doorSeg * 4 + k] = S.doorXZ[k];
    return true;
  }
  function spawn() {
    if (!VMODELS.reventonGold) return;
    car = new Car(null, null, S.spot[0], S.spot[1], S.h, VMODELS.reventonGold);
    car.persist = true;
    car.gold = true;
    car.mode = 'physics';
    car.driver = null;
  }
  function update(dt) {
    if (!S) return;
    const t = open ? Math.PI / 2 : 0;
    th += clamp(t - th, -dt * 1.3, dt * 1.3);
    S.hinge.rotation.x = th;
    if (open && th > 1.1) for (let k = 0; k < 4; k++) COL.segs[S.doorSeg * 4 + k] = 1e7;
    const dp = Math.hypot(PLAYER.x - S.spot[0], PLAYER.z - S.spot[1]);
    if (car && (car.dead || !CARS.includes(car))) car = null;
    // left far away and not being driven: back home (and the door shut)
    if (
      car &&
      car.driver !== 'player' &&
      PLAYER.car !== car &&
      Math.hypot(car.x - S.spot[0], car.z - S.spot[1]) > 30 &&
      Math.hypot(PLAYER.x - car.x, PLAYER.z - car.z) > 350 &&
      dp > 250
    ) {
      car.remove();
      car = null;
      open = false;
      th = 0;
      for (let k = 0; k < 4; k++) COL.segs[S.doorSeg * 4 + k] = S.doorXZ[k];
    }
    if (!car && dp < 140) spawn();
  }
  return {
    setup,
    prompt,
    use,
    update,
    get open() {
      return open;
    },
    get angle() {
      return th;
    },
    get car() {
      return car;
    },
    get state() {
      return S;
    }
  };
})();
