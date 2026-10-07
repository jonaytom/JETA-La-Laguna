// ============ Hospital Universitario de Canarias (HUC) y centros de salud ============
// From Jonay's photos (docs/referencias/hospital_huc/): a long slab of ~12 storeys with horizontal bands (window strip /
// beige spandrel), a white cylindrical tower at one end with a glass top and a cantilevered helipad («saucer»), the
// green glass Edificio de Actividades Ambulatorias at the other end, low blocks around, a garden with palms and a
// rusty steel sculpture. The OSM footprint («Área de Hospitalización») stays as the low podium; the rest is built on it.
// Health centres get a white front with the green cross sign. When you die you wake up at the nearest one (HEALTH).
const HEALTH = []; // { x, z, name } spots in front of the doors
const HUC = { ok: false };
function hucBandTex() { // one storey: beige spandrel + dark window strip with mullions (2 windows per 7 m tile)
  const c = mkCanvas(256, 128), x = c.getContext('2d'); x.fillStyle = '#c4b59a'; x.fillRect(0, 0, 256, 128);
  x.fillStyle = '#ad9f86'; x.fillRect(0, 44, 256, 4); x.fillStyle = '#1b252d'; x.fillRect(0, 50, 256, 74);
  x.fillStyle = 'rgba(150,180,200,.35)'; x.fillRect(0, 52, 256, 26); x.fillStyle = '#e8e2d4'; for (let k = 0; k <= 8; k++) x.fillRect(k * 32 - 2, 52, 4, 70); x.fillRect(0, 120, 256, 4);
  const t = canvasTex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
function hucTowerTex() { // white cladding panels
  const c = mkCanvas(128, 128), x = c.getContext('2d'); x.fillStyle = '#eef0f1'; x.fillRect(0, 0, 128, 128); x.strokeStyle = 'rgba(150,160,170,.45)'; x.lineWidth = 2;
  for (let k = 0; k <= 4; k++) { x.beginPath(); x.moveTo(k * 32, 0); x.lineTo(k * 32, 128); x.stroke(); } x.beginPath(); x.moveTo(0, 64); x.lineTo(128, 64); x.stroke();
  const t = canvasTex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
function helipadTex() {
  const c = mkCanvas(256, 256), x = c.getContext('2d'); x.fillStyle = '#4a4f54'; x.fillRect(0, 0, 256, 256); x.strokeStyle = '#f2f2f2'; x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 96, 0, 7); x.stroke();
  x.strokeStyle = '#f5c518'; x.lineWidth = 5; x.beginPath(); x.arc(128, 128, 118, 0, 7); x.stroke(); x.fillStyle = '#f2f2f2'; x.font = 'bold 120px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('H', 128, 134);
  return canvasTex(c, { repeat: false });
}
function crossSignTex(text) { // white plate, green cross and the name
  const c = mkCanvas(1024, 160), x = c.getContext('2d'); x.fillStyle = '#f7f7f4'; x.fillRect(0, 0, 1024, 160); x.fillStyle = '#1f9d55';
  x.fillRect(40, 60, 100, 40); x.fillRect(70, 30, 40, 100); x.font = `600 ${text.length > 22 ? 52 : 64}px Oswald, Arial`; x.textBaseline = 'middle'; x.fillStyle = '#1d5f3a'; x.fillText(text, 170, 84);
  return canvasTex(c, { repeat: false });
}
// minimum-area rectangle around a footprint (hull edges as candidate directions): centre, unit axis u, half sizes
function minRect(pts) {
  let best = null; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 1) continue; const ux = (q[0] - p[0]) / L, uz = (q[1] - p[1]) / L;
    let a = 1e9, b = -1e9, c = 1e9, d = -1e9; for (const r of pts) { const s = r[0] * ux + r[1] * uz, t = -r[0] * uz + r[1] * ux; a = Math.min(a, s); b = Math.max(b, s); c = Math.min(c, t); d = Math.max(d, t); }
    const A = (b - a) * (d - c); if (!best || A < best.A) best = { A, ux, uz, s0: a, s1: b, t0: c, t1: d }; }
  if (!best) return null; let { ux, uz } = best; let hl = (best.s1 - best.s0) / 2, hw = (best.t1 - best.t0) / 2; const sm = (best.s0 + best.s1) / 2, tm = (best.t0 + best.t1) / 2;
  const cx = sm * ux - tm * uz, cz = sm * uz + tm * ux; if (hw > hl) { [ux, uz] = [-uz, ux]; [hl, hw] = [hw, hl]; } return { cx, cz, ux, uz, hl, hw };
}
function buildHUC(pts) {
  const R = minRect(pts); if (!R) return; const gy = heightAt(R.cx, R.cz) - 0.3;
  // the tower goes at the end away from the green EAA building (to the east, as in the photos)
  const eaa = BUILD.find((b) => b.name && /Actividades Ambulatorias/.test(b.name)); let dir = 1; if (eaa && ((eaa.cx - R.cx) * R.ux + (eaa.cz - R.cz) * R.uz) > 0) dir = -1;
  const g = new THREE.Group(); g.position.set(R.cx, gy, R.cz); g.rotation.y = Math.atan2(-R.uz, R.ux); scene.add(g); // local x = long axis
  const L = Math.min(R.hl * 2 * 0.82, 150), D = 16, FL = 12, H = FL * 3.5;
  const band = hucBandTex(); const mk = (rx, ry) => { const t = band.clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return new THREE.MeshStandardMaterial({ map: t, roughness: 0.75 }); };
  const roof = new THREE.MeshStandardMaterial({ color: 0xbfb8aa, roughness: 0.9 }), end = new THREE.MeshStandardMaterial({ color: 0xe6e0d2, roughness: 0.85 });
  const sideM = mk(L / 7, FL); const slab = new THREE.Mesh(new THREE.BoxGeometry(L, H, D), [end, end, roof, roof, sideM, sideM]); slab.position.set(-dir * 6, H / 2, 0); slab.castShadow = slab.receiveShadow = true; g.add(slab);
  // white end cores and rooftop plant
  for (const s of [-1, 1]) addMesh(g, new THREE.BoxGeometry(7, H + 3, D + 1.2), end, -dir * 6 + s * (L / 2 - 3.5), (H + 3) / 2, 0);
  for (let k = 0; k < 4; k++) addMesh(g, new THREE.BoxGeometry(8, 3, 6), roof, -dir * 6 + (k - 1.5) * 22, H + 1.5, -2 + (k % 2) * 3);
  // the cylindrical tower with its glass crown and the helipad «saucer»
  const tx = -dir * 6 + dir * (L / 2 + 7), TR = 11, TH = H + 6; const tw = new THREE.MeshStandardMaterial({ map: (() => { const t = hucTowerTex(); t.repeat.set(10, 8); return t; })(), roughness: 0.6 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x5f87a6, roughness: 0.15, metalness: 0.5 }), dark = new THREE.MeshStandardMaterial({ color: 0x3b3f44, roughness: 0.6, metalness: 0.3 });
  addMesh(g, new THREE.CylinderGeometry(TR, TR, TH - 7, 32), tw, tx, (TH - 7) / 2, 0); addMesh(g, new THREE.CylinderGeometry(TR - 0.4, TR - 0.4, 7, 32), glass, tx, TH - 3.5, 0);
  addMesh(g, new THREE.CylinderGeometry(TR + 0.4, TR + 0.4, 0.6, 32), end, tx, TH - 7, 0);
  addMesh(g, new THREE.CylinderGeometry(16, TR, 3.2, 32, 1, true), dark, tx + dir * 3, TH + 1.6, 0); // the saucer's underside, off-centre
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 1, 32), [dark, new THREE.MeshStandardMaterial({ map: helipadTex(), roughness: 0.8 }), dark]); pad.position.set(tx + dir * 3, TH + 3.7, 0); pad.castShadow = true; g.add(pad);
  const rail = new THREE.Mesh(new THREE.TorusGeometry(16.2, 0.12, 6, 48), new THREE.MeshStandardMaterial({ color: 0xd8dde2, metalness: 0.6, roughness: 0.4 })); rail.rotation.x = Math.PI / 2; rail.position.set(tx + dir * 3, TH + 4.9, 0); g.add(rail);
  // garden in front: Canary palms and the rusty steel sculpture (if the spot is free)
  const toW = (lx, lz) => { const c = Math.cos(g.rotation.y), s = Math.sin(g.rotation.y); return [R.cx + lx * c + lz * s, R.cz - lx * s + lz * c]; };
  const front = [-1, 1].map((s) => { let free = 0; for (let k = -2; k <= 2; k++) { const [x, z] = toW(-dir * 6 + k * 15, s * (D / 2 + 18)); if (!inAnyBuilding(x, z) && !onCarriageway(x, z, 1)) free++; } return [free, s]; }).sort((a, b) => b[0] - a[0])[0][1];
  for (let k = -3; k <= 3; k++) { const [x, z] = toW(-dir * 6 + k * 11 + rnd(-2, 2), front * (D / 2 + 14 + rnd(-3, 3))); if (!inAnyBuilding(x, z) && !onCarriageway(x, z, 1.5)) TREES.push([x, z, 1, rnd(0.75, 0.95), 1]); }
  { const [x, z] = toW(-dir * 6 - dir * 20, front * (D / 2 + 9)); if (!inAnyBuilding(x, z) && !onCarriageway(x, z, 1.5)) { const rust = new THREE.MeshStandardMaterial({ color: 0x6b2e1f, roughness: 0.6, metalness: 0.4 }); const sc = new THREE.Group();
      const parts = [[0.5, 3.2, 0.5, -1.2, 1.6], [2.2, 0.5, 0.5, -0.3, 3.1], [0.5, 2.6, 0.5, 0.6, 1.8], [1.6, 0.5, 0.5, 1.2, 0.5]]; for (const [w, h, d2, px, py] of parts) addMesh(sc, new THREE.BoxGeometry(w, h, d2), rust, px, py, 0);
      addMesh(sc, new THREE.BoxGeometry(4, 0.3, 2), new THREE.MeshStandardMaterial({ color: 0x9a948a, roughness: 0.9 }), 0, 0.15, 0); sc.position.set(x, heightAt(x, z), z); sc.rotation.y = g.rotation.y + 0.4; scene.add(sc); COL.addCirc(x, z, 1.4); } }
  // colliders for the parts that stick out of the OSM footprint (the tower)
  { const [x, z] = toW(tx, 0); COL.addCirc(x, z, TR); }
  HUC.ok = true; HUC.cx = R.cx; HUC.cz = R.cz; HUC.top = gy + TH + 4;
  LABELS.push(['Hospital Universitario de Canarias', R.cx, R.cz, 1]);
}
// green glass curtain over a footprint (Edificio de Actividades Ambulatorias)
function buildGlassSkin(pts, top, col = 0x3f8f7c) {
  let cx = 0, cz = 0; for (const p of pts) { cx += p[0]; cz += p[1]; } cx /= pts.length; cz /= pts.length; const gy = Math.min(...pts.map((p) => heightAt(p[0], p[1]))) - 0.3;
  const sh = new THREE.Shape(); pts.forEach((p, i) => { const x = (p[0] - cx) * 1.012, y = -(p[1] - cz) * 1.012; if (i) sh.lineTo(x, y); else sh.moveTo(x, y); });
  const geo = new THREE.ExtrudeGeometry(sh, { depth: top - gy, bevelEnabled: false }); geo.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.12, metalness: 0.55, transparent: true, opacity: 0.88 })); m.position.set(cx, gy, cz); m.castShadow = true; scene.add(m);
  // floor lines
  const lines = new THREE.MeshStandardMaterial({ color: 0x9fc9bd, roughness: 0.5 }); for (let y = 3.5; y < top - gy - 1; y += 3.5) { const s2 = new THREE.Shape(sh.getPoints()); const lg = new THREE.ExtrudeGeometry(s2, { depth: 0.25, bevelEnabled: false }); lg.rotateX(-Math.PI / 2); lg.scale(1.004, 1, 1.004); const lm = new THREE.Mesh(lg, lines); lm.position.set(cx, gy + y, cz); scene.add(lm); }
}
// health centre or A&E: the green cross plate over the door and the respawn spot in front of it
function saludDeco(g, E, H, name) {
  const t = crossSignTex(name); const w = Math.min(E.L * 0.8, 12), h = w * 160 / 1024; const s = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.25, roughness: 0.5 }));
  s.position.set(0, Math.max(3.2, H - h / 2 - 0.5), 0.12); g.add(s); /* along the top of the facade, above balconies and awnings */
  const cr = new THREE.Group(), gm = new THREE.MeshStandardMaterial({ color: 0x22b35e, emissive: 0x22b35e, emissiveIntensity: 0.6 }); addMesh(cr, new THREE.BoxGeometry(1.2, 0.4, 0.15), gm, 0, 0, 0); addMesh(cr, new THREE.BoxGeometry(0.4, 1.2, 0.15), gm, 0, 0, 0);
  cr.position.set(Math.min(E.L / 2 - 0.8, w / 2 + 1.2), Math.max(3.2, H - h / 2 - 0.5), 0.5); g.add(cr);
  const [x, z] = safeSpot(E.mx + E.nx * 3.5, E.mz + E.nz * 3.5, 0.5); HEALTH.push({ x, z, name: name.replace(/^URGENCIAS$/, 'Urgencias del HUC'), h: Math.atan2(E.nx, E.nz) });
}
// where you wake up after dying: the nearest health centre or A&E (else the start)
function nearestHealth(x, z) { let best = null, bd = 1e12; for (const p of HEALTH) { const d = (p.x - x) ** 2 + (p.z - z) ** 2; if (d < bd) { bd = d; best = p; } } return best; }
