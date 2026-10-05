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
