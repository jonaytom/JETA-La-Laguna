// ============ hand-placed houses missing from OpenStreetMap ============
// Casa del hermano de Jonay — Av. San Miguel de Chimisay / Av. El Cardonal (Google Maps 28.452009, -16.298734 →
// game (1591, 3924)). White 2-storey corner house with a small rooftop room (torreta), grey door, black-framed
// windows and a whitewashed boundary wall. Reference photos: docs/referencias/chimisay/
const CUSTOM_HOUSES = [
  { name: 'Casa del hermano', x: 1587, z: 3924, ang: Math.atan2(-28, 22), w: 9, d: 7.5, floors: 2, turret: true },
];
function buildCustomHouses() {
  const M = concMaterials(); const B = concBuckets(); const root = new THREE.Group(); root.name = 'casas';
  const white = new THREE.MeshStandardMaterial({ map: M.plaster.map, color: 0xffffff, roughness: 0.9 }); white.color.setRGB(1.08, 1.09, 1.1);
  const grey = new THREE.MeshStandardMaterial({ color: 0x6d7378, roughness: 0.6, metalness: 0.2 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.5 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x2b3640, roughness: 0.15, metalness: 0.5 });
  const sill = new THREE.MeshStandardMaterial({ color: 0x8e8a84, roughness: 0.8 });
  for (const h of CUSTOM_HOUSES) {
    let y0 = 1e9; for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const c = Math.cos(h.ang), s = Math.sin(h.ang); y0 = Math.min(y0, heightAt(h.x + (sx * h.w / 2) * c + (sz * h.d / 2) * s, h.z - (sx * h.w / 2) * s + (sz * h.d / 2) * c)); }
    y0 -= 0.25; const fr = cFrame(h.x, y0, h.z, h.ang); const fh = 3.0, H = h.floors * fh + 0.4;
    // body + plinth + parapet with coping
    B.geo(cBox(h.w, H, h.d, 3), white, fr(0, H / 2, 0));
    B.geo(cBox(h.w + 0.08, 0.7, h.d + 0.08, 2), sill, fr(0, 0.35, 0));
    for (const [px, pz, pw, pd] of [[0, h.d / 2 - 0.1, h.w, 0.2], [0, -h.d / 2 + 0.1, h.w, 0.2], [h.w / 2 - 0.1, 0, 0.2, h.d], [-h.w / 2 + 0.1, 0, 0.2, h.d]]) { B.geo(cBox(pw, 0.9, pd, 3), white, fr(px, H + 0.45, pz)); B.geo(cBox(pw + 0.12, 0.08, pd + 0.12, 3), sill, fr(px, H + 0.94, pz)); }
    B.geo(cBox(h.w - 0.4, 0.1, h.d - 0.4, 3), sill, fr(0, H + 0.05, 0)); // terrace floor
    // rooftop room (torreta) with its own little parapet and a door
    if (h.turret) { const tw = 3.2, td = 3.0, th = 2.6; B.geo(cBox(tw, th, td, 3), white, fr(-h.w / 2 + tw / 2 + 0.6, H + th / 2, -h.d / 2 + td / 2 + 0.6)); B.geo(cBox(tw + 0.12, 0.1, td + 0.12, 3), sill, fr(-h.w / 2 + tw / 2 + 0.6, H + th + 0.05, -h.d / 2 + td / 2 + 0.6)); B.geo(cBox(0.85, 2.0, 0.06), grey, fr(-h.w / 2 + tw / 2 + 0.6, H + 1.0, -h.d / 2 + td + 0.63)); }
    // windows (black frames) on the 4 faces, door on the street face (+z local)
    const faces = [[0, h.w, h.d], [Math.PI, h.w, h.d], [Math.PI / 2, h.d, h.w], [-Math.PI / 2, h.d, h.w]];
    for (const [a, len, dep] of faces) { const on = (x, y, o = 0) => fr(Math.sin(a) * (dep / 2 + o) + Math.cos(a) * x, y, Math.cos(a) * (dep / 2 + o) - Math.sin(a) * x, a);
      const nW = Math.max(1, Math.floor(len / 3.2));
      for (let f = 0; f < h.floors; f++) for (let k = 0; k < nW; k++) { const x = (k + 0.5) / nW * len - len / 2; if (a === 0 && f === 0 && k === 0) continue;
        const y = f * fh + 1.0 + (f ? 0.2 : 0.3), ww = 1.1, wh = 1.3; B.geo(cBox(ww, wh, 0.04), glass, on(x, y + wh / 2, 0.01)); for (const [fx, fy, fw, fhh] of [[0, y, ww + 0.16, 0.08], [0, y + wh, ww + 0.16, 0.08], [-ww / 2, y + wh / 2, 0.08, wh], [ww / 2, y + wh / 2, 0.08, wh], [0, y + wh / 2, 0.05, wh]]) B.geo(cBox(fw, fhh, 0.08), frame, on(x + fx, fy, 0.04)); B.geo(cBox(ww + 0.3, 0.07, 0.22), sill, on(x, y - 0.04, 0.1)); }
      if (a === 0) { const x = 0.5 / nW * len - len / 2; B.geo(cBox(1.1, 2.3, 0.06), grey, on(x, 1.15 + 0.35, 0.02)); B.geo(cBox(1.35, 0.1, 0.5), sill, on(x, 2.85, 0.25)); B.geo(cBox(1.3, 0.35, 0.6), sill, on(x, 0.17, 0.3)); } }
    // whitewashed boundary wall along the side (garden/patio)
    B.geo(cBox(0.25, 1.6, h.d, 3), white, fr(h.w / 2 + 2.2, 0.8, 0)); B.geo(cBox(2.2, 1.6, 0.25, 3), white, fr(h.w / 2 + 1.1, 0.8, -h.d / 2)); B.geo(cBox(0.35, 0.08, h.d, 3), sill, fr(h.w / 2 + 2.2, 1.64, 0));
    // collisions
    const C = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz]) => { const v = new THREE.Vector3(sx * h.w / 2, 0, sz * h.d / 2).applyMatrix4(fr(0, 0, 0)); return [v.x, v.z]; });
    for (let i = 0; i < 4; i++) COL.addSeg(C[i][0], C[i][1], C[(i + 1) % 4][0], C[(i + 1) % 4][1]);
    { const a = new THREE.Vector3(h.w / 2 + 2.2, 0, -h.d / 2).applyMatrix4(fr(0, 0, 0)), b = new THREE.Vector3(h.w / 2 + 2.2, 0, h.d / 2).applyMatrix4(fr(0, 0, 0)), c = new THREE.Vector3(h.w / 2, 0, -h.d / 2).applyMatrix4(fr(0, 0, 0)); COL.addSeg(a.x, a.z, b.x, b.z); COL.addSeg(c.x, c.z, a.x, a.z); }
    BUILD.push({ pts: C, cx: h.x, cz: h.z, top: y0 + H, bmax: y0, style: 1, name: h.name, H });
  }
  B.finish(root); scene.add(root);
}

// ============ Finca España: pabellón del Complejo Deportivo Islas Canarias (vacío en OSM) ============
// Grey concrete hall next to the football pitch (C. Tacoronte / C. Tinguaro): mono-pitch white roof that overhangs
// the corner, a band of sea-green glass and dark louvres under it, purple pillars on the ground floor and the sign
// over the entrance. Reference photos: docs/referencias/finca_espana/
const PABELLON = { x0: 1905, x1: 1943, z0: 1291, z1: 1349, H: 13 };
function buildPabellon() {
  const M = concMaterials(); const B = concBuckets(); const root = new THREE.Group(); root.name = 'pabellon';
  const mt = (c, r = 0.85, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, side: THREE.DoubleSide });
  const conc = mt(0x9b9c98, 0.95), roof = mt(0xf0f0ec, 0.6), sea = new THREE.MeshStandardMaterial({ color: 0x7fc2b4, roughness: 0.15, metalness: 0.4 }), louv = mt(0x2b2e31, 0.6, 0.3), purple = mt(0x7a3e8e, 0.6), glass = new THREE.MeshStandardMaterial({ color: 0x24323c, roughness: 0.1, metalness: 0.5 });
  const { x0, x1, z0, z1, H } = PABELLON; const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, W = x1 - x0, D = z1 - z0;
  let g0 = 1e9; for (const [x, z] of [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]) g0 = Math.min(g0, heightAt(x, z)); g0 -= 0.3;
  const fr = cFrame(cx, g0, cz, 0);
  B.geo(cBox(W, H - 2.6, D, 3), conc, fr(0, (H - 2.6) / 2, 0));
  // upper band: sea-green glass + dark louvres all round
  B.geo(cBox(W + 0.1, 1.4, D + 0.1), sea, fr(0, H - 2.6 + 0.7, 0)); B.geo(cBox(W + 0.12, 1.2, D + 0.12), louv, fr(0, H - 2.6 + 2.0, 0));
  for (let x = -W / 2; x <= W / 2; x += 0.6) for (const sd of [-1, 1]) B.geo(cBox(0.08, 1.2, 0.25), louv, fr(x, H - 0.6, sd * (D / 2 + 0.12)));
  // mono-pitch roof rising to the north-west corner, overhanging it
  B.geo(cBox(W + 7, 0.5, D + 6), roof, fr(-1.5, H + 0.6, -1.5, 0, 0.05, -0.04));
  for (const [px, pz] of [[-W / 2 - 3, -D / 2 - 2.5], [-W / 2 - 3, 0], [0, -D / 2 - 2.5]]) { B.geo(new THREE.CylinderGeometry(0.25, 0.25, H, 10), M.iron, fr(px, H / 2, pz)); COL.addCirc(cx + px, cz + pz, 0.35); }
  // ground floor on C. Tacoronte (north): glazed entrance between purple pillars + sign
  B.geo(cBox(W - 6, 3.2, 0.12), glass, fr(0, 1.8, -D / 2 - 0.05));
  for (let x = -W / 2 + 3; x <= W / 2 - 3; x += 4) B.geo(cBox(0.6, 3.6, 0.6), purple, fr(x, 1.8, -D / 2 - 0.4));
  const sg = bigSign('COMPLEJO DEPORTIVO ISLAS CANARIAS', 18, 1.3, '#ffffff', '#1f4e8c'); sg.position.set(cx, g0 + 4.6, z0 - 0.7); sg.rotation.y = Math.PI; root.add(sg);
  for (const [ax, az, bx, bz] of [[x0, z0, x1, z0], [x1, z0, x1, z1], [x1, z1, x0, z1], [x0, z1, x0, z0]]) COL.addSeg(ax, az, bx, bz);
  BUILD.push({ pts: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], cx, cz, top: g0 + H, bmax: g0, style: 3, name: 'Pabellón Islas Canarias', H });
  LABELS.push(['Complejo Deportivo Islas Canarias', cx, cz, 2]);
  B.finish(root); scene.add(root);
}
