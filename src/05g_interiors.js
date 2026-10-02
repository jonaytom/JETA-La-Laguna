// ============ enterable interiors (teleport to rooms built outside the map) ============
const INTERIORS = []; // {id,name,door:{x,z,nx,nz}, spawn:{x,z,h}, exit:{x,z}, ceil}
let IX = 9000;
function roomShell(w, d, h, floorTex, wallCol, opts = {}) {
  const half = Math.max(w, d) / 2 + 40; const x0 = IX + half, z0 = 0; IX = x0 + half; const y0 = heightAt(x0, z0); // rooms never overlap, whatever their size
  const g = new THREE.Group(); g.position.set(x0, y0, z0); scene.add(g);
  const fm = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.35, emissive: 0xffffff, emissiveMap: floorTex, emissiveIntensity: 0.12 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(w, d), fm); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.13; floor.receiveShadow = true; g.add(floor);
  if (floorTex) { floorTex.repeat.set(w / 2, d / 2); }
  const wm = new THREE.MeshStandardMaterial({ color: wallCol, roughness: 0.9, emissive: wallCol, emissiveIntensity: 0.25, side: THREE.BackSide });
  const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wm); box.position.y = h / 2 + 0.1; g.add(box);
  // collisions: 4 walls
  const hw = w / 2, hd = d / 2; COL.addSeg(x0 - hw, z0 - hd, x0 + hw, z0 - hd); COL.addSeg(x0 + hw, z0 - hd, x0 + hw, z0 + hd); COL.addSeg(x0 + hw, z0 + hd, x0 - hw, z0 + hd); COL.addSeg(x0 - hw, z0 + hd, x0 - hw, z0 - hd);
  return { g, x0, z0, y0, w, d, h };
}
// interior sized like the building seen from outside: room x = building length axis, z = width axis
function interiorFrame(pts, cx, cz, H, maxH = 30) {
  const F = axisFrame(pts, cx, cz); const uc = (F.u0 + F.u1) / 2, vc = (F.v0 + F.v1) / 2;
  const L = Math.max(6, F.u1 - F.u0), W = Math.max(5, F.v1 - F.v0);
  const toRoom = (x, z) => [(x - cx) * F.ux + (z - cz) * F.uz - uc, (x - cx) * F.vx + (z - cz) * F.vz - vc];
  return { F, L, W, H: clamp(H, 3.2, maxH), toRoom };
}
// put a door of the outside facade on the matching inside wall; returns {x,z,rot,h(spawn heading),ix,iz(spawn)}
function mapDoor(fr, d) {
  let [x, z] = fr.toRoom(d.x, d.z); const hw = fr.L / 2, hd = fr.W / 2;
  const dists = [[hw - x, 'px'], [x + hw, 'nx'], [hd - z, 'pz'], [z + hd, 'nz']].sort((a, b) => Math.abs(a[0]) - Math.abs(b[0]));
  const side = dists[0][1]; x = clamp(x, -hw + 1.4, hw - 1.4); z = clamp(z, -hd + 1.4, hd - 1.4);
  if (side === 'px') return { x: hw - 0.05, z, rot: -Math.PI / 2, h: -Math.PI / 2, ix: hw - 2.2, iz: z, side };
  if (side === 'nx') return { x: -hw + 0.05, z, rot: Math.PI / 2, h: Math.PI / 2, ix: -hw + 2.2, iz: z, side };
  if (side === 'pz') return { x, z: hd - 0.05, rot: Math.PI, h: Math.PI, ix: x, iz: hd - 2.2, side };
  return { x, z: -hd + 0.05, rot: 0, h: 0, ix: x, iz: -hd + 2.2, side };
}
function checkerTex(a, b, n = 8) { const c = mkCanvas(128, 128), x = c.getContext('2d'); const s = 128 / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = (i + j) % 2 ? a : b; x.fillRect(i * s, j * s, s, s); } noiseFill; return canvasTex(c); }
function tileTex(col, line) { const c = mkCanvas(128, 128), x = c.getContext('2d'); x.fillStyle = col; x.fillRect(0, 0, 128, 128); x.strokeStyle = line; x.lineWidth = 2; for (let i = 0; i <= 128; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 128); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(128, i); x.stroke(); } return canvasTex(c); }
function exitDoor(room, x, z, rotY) {
  const d = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3), new THREE.MeshStandardMaterial({ color: 0x3b2616, emissive: 0xffd9a0, emissiveIntensity: 0.25 })); d.position.set(x, 1.6, z); d.rotation.y = rotY; room.g.add(d);
  const s = textPlane('SALIDA', 1.2, 0.3, '#1a8a3a', '#ffffff', 'bold 48px Arial'); s.position.set(x, 3.4, z); s.rotation.y = rotY; s.material.emissive = new THREE.Color(0x1a8a3a); s.material.emissiveIntensity = 0.8; room.g.add(s);
  return { x: room.x0 + x, z: room.z0 + z };
}
function npcAt(room, x, z, rot, o = {}) { const h = makeHuman(o); if (o.sit) h.pose = 'sit'; h.root.position.set(room.x0 + x, room.y0 + 0.12, room.z0 + z); h.root.rotation.y = rot; scene.add(h.root); COL.addCirc(room.x0 + x, room.z0 + z, 0.35); INT_NPCS.push(h); return h; }
const INT_NPCS = [];
const DOORMARKS = [];
let doorIconTex = null;
function doorIcon() { if (doorIconTex) return doorIconTex; const c = mkCanvas(128, 160), x = c.getContext('2d'); x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, 128, 160); x.fillStyle = '#3ddc97'; x.beginPath(); x.moveTo(24, 70); x.lineTo(104, 70); x.lineTo(64, 128); x.closePath(); x.fill(); x.beginPath(); x.arc(64, 38, 34, 0, 7); x.fill(); x.fillStyle = '#0c2a1c'; x.font = 'bold 44px Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('E', 64, 40); doorIconTex = canvasTex(c, { repeat: false }); return doorIconTex; }
function addInterior(def) {
  def.doors = Array.isArray(def.door) ? def.door : [def.door]; def.door = def.doors[0]; INTERIORS.push(def);
  const glow = new THREE.MeshStandardMaterial({ color: 0x3ddc97, emissive: 0x3ddc97, emissiveIntensity: 1.3 });
  const panel = new THREE.MeshStandardMaterial({ color: 0x14202a, roughness: 0.1, metalness: 0.6, emissive: 0xffd28a, emissiveIntensity: 0.35 });
  for (const d of def.doors) {
    const g = new THREE.Group(); const y = heightAt(d.x, d.z); g.position.set(d.x + d.nx * 0.08, y, d.z + d.nz * 0.08); g.rotation.y = Math.atan2(d.nx, d.nz);
    const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3), panel); p.position.y = 1.6; g.add(p);
    for (const sx of [-1.3, 1.3]) { const j = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.3, 0.2), glow); j.position.set(sx, 1.65, 0.05); g.add(j); }
    const l = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.2, 0.2), glow); l.position.set(0, 3.3, 0.05); g.add(l);
    const ic = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), new THREE.MeshBasicMaterial({ map: doorIcon(), transparent: true, depthWrite: false, fog: false })); ic.position.set(d.x + d.nx * 1.2, y + 5.2, d.z + d.nz * 1.2); ic.renderOrder = 5; scene.add(ic); DOORMARKS.push({ m: ic, y: y + 5.2 });
    scene.add(g); LABELS.push(['Entrar: ' + def.name, d.x, d.z, 4]);
  }
}

// ---- Cathedral interior (three naves, sized like the real footprint)
function buildCathedralInterior(doors, ch) {
  const fr = interiorFrame(ch.pts, ch.cx, ch.cz, ch.top - ch.bmin + 2, 26); const L = fr.L, W = fr.W, Hh = fr.H;
  const r = roomShell(L, W, Hh, checkerTex('#e8e2d4', '#6b5f55', 8), 0xe9e4da); const g = r.g;
  const md = mapDoor(fr, doors[0]); const altarX = md.side === 'px' ? -L / 2 + 4 : md.side === 'nx' ? L / 2 - 4 : -L / 2 + 4; const dirA = Math.sign(altarX); // altar at the far end
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d2c6, roughness: 0.7, emissive: 0xd8d2c6, emissiveIntensity: 0.15 });
  const zc = W * 0.22;
  for (const sz of [-zc, zc]) for (let x = -L / 2 + 6; x <= L / 2 - 6; x += 7.5) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, Hh - 1, 12), stone); c.position.set(x, (Hh - 1) / 2 + 0.1, sz); g.add(c); COL.addCirc(r.x0 + x, r.z0 + sz, 0.8); }
  for (let x = -L / 2 + 6; x <= L / 2 - 6; x += 7.5) { const rib = new THREE.Mesh(new THREE.TorusGeometry(zc, 0.18, 6, 24, Math.PI), stone); rib.position.set(x, Hh * 0.68, 0); rib.rotation.y = Math.PI / 2; g.add(rib); }
  const wood = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.6 });
  const pewLen = Math.max(2, zc - 1.6);
  for (let x = altarX - dirA * 8; Math.abs(x - altarX) < L * 0.62; x -= dirA * 2.4) for (const sz of [-1, 1]) { const zz = sz * (1.2 + pewLen / 2); const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, pewLen), wood); p.position.set(x, 0.55, zz); g.add(p); const bk = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, pewLen), wood); bk.position.set(x - dirA * 0.25, 1.1, zz); g.add(bk); COL.addSeg(r.x0 + x, r.z0 + zz - pewLen / 2, r.x0 + x, r.z0 + zz + pewLen / 2); }
  const gold = new THREE.MeshStandardMaterial({ color: 0xc9a13a, metalness: 0.9, roughness: 0.3, emissive: 0x6b4a10, emissiveIntensity: 0.6 });
  const altar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 4), new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.3 })); altar.position.set(altarX, 0.65, 0); g.add(altar); COL.addCirc(r.x0 + altarX, r.z0, 1.8);
  const ret = new THREE.Mesh(new THREE.BoxGeometry(0.8, Math.min(11, Hh - 3), Math.min(12, W * 0.5)), gold); ret.position.set(altarX + dirA * 3.4, Math.min(11, Hh - 3) / 2 + 0.6, 0); g.add(ret);
  for (let i = 0; i < 5; i++) { const n = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.6, 1.6), new THREE.MeshStandardMaterial({ color: 0x3a2a4a, emissive: 0x201028, emissiveIntensity: 0.5 })); n.position.set(altarX + dirA * 2.95, 6 + (i % 2) * 1.5, -4 + i * 2); g.add(n); }
  const colors = [0xc0392b, 0x2e86de, 0xf1c40f, 0x27ae60, 0x8e44ad];
  for (const sz of [-W / 2 + 0.05, W / 2 - 0.05]) for (let x = -L / 2 + 5, k = 0; x < L / 2 - 4; x += 8, k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(2.2, Math.min(6, Hh * 0.35)), new THREE.MeshStandardMaterial({ color: colors[k % 5], emissive: colors[(k + (sz > 0 ? 2 : 0)) % 5], emissiveIntensity: 1.1 })); w.position.set(x, Hh * 0.55, sz); w.rotation.y = sz > 0 ? Math.PI : 0; g.add(w); }
  const dome = new THREE.Mesh(new THREE.CircleGeometry(Math.min(5, W * 0.25), 32), new THREE.MeshBasicMaterial({ color: 0xfff6dc })); dome.rotation.x = Math.PI / 2; dome.position.set(altarX - dirA * L * 0.25, Hh - 0.2, 0); g.add(dome);
  const ex = exitDoor(r, md.x, md.z, md.rot);
  npcAt(r, altarX - dirA * 1.6, 0.5, dirA > 0 ? -Math.PI / 2 : Math.PI / 2, { shirt: 0x111111, pants: 0x111111, hair: 0x8c8c8c, skin: 0xe0ac86, female: false, sleeve: true, longPants: true });
  for (let i = 0; i < 6; i++) npcAt(r, altarX - dirA * (9 + Math.floor(rnd(0, 6)) * 2.4 + 0.6), (Math.random() < 0.5 ? -1 : 1) * rnd(1.8, 1 + pewLen), dirA > 0 ? Math.PI / 2 : -Math.PI / 2, { sit: true });
  addInterior({ id: 'catedral', name: 'Catedral de La Laguna', door: doors, spawn: { x: r.x0 + md.ix, z: r.z0 + md.iz, h: md.h }, exit: ex, ceil: r.y0 + Hh - 0.5, floor: r.y0 + 0.13 });
}
// ---- Café interior (the barraquito place): ground floor of its building
function buildCafeInterior(door, name, bld) {
  const fr = bld ? interiorFrame(bld.pts, bld.cx, bld.cz, 3.8, 3.8) : { L: 12, W: 10, H: 3.6, toRoom: () => [4.5, 5] }; const L = Math.min(fr.L, 22), W = Math.min(fr.W, 16); fr.L = L; fr.W = W;
  const r = roomShell(L, W, 3.6, tileTex('#b9a58a', '#8a7658'), 0xe9d9bd); const g = r.g;
  const md = mapDoor(fr, door); // bar against the wall opposite the door
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.5 });
  const along = md.side === 'px' || md.side === 'nx' ? 'z' : 'x'; const backSign = md.side === 'px' || md.side === 'pz' ? -1 : 1; const backPos = (along === 'x' ? W : L) / 2 * backSign;
  const barLen = Math.min(7, (along === 'x' ? L : W) - 3); const P = (a, b) => along === 'x' ? [a, b] : [b, a]; // a along wall, b across
  const place = (m, a, y, b, ry = 0) => { const [x, z] = P(a, b); m.position.set(x, y, z); if (along === 'z') m.rotation.y = Math.PI / 2 + ry; else m.rotation.y = ry; g.add(m); return m; };
  const bb = backPos - backSign * 2.4;
  place(new THREE.Mesh(new THREE.BoxGeometry(barLen, 1.1, 0.8), wood), 0, 0.65, bb); place(new THREE.Mesh(new THREE.BoxGeometry(barLen + 0.2, 0.06, 1), new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.2 })), 0, 1.23, bb);
  { const [x1, z1] = P(-barLen / 2, bb - backSign * 0.4), [x2, z2] = P(barLen / 2, bb - backSign * 0.4); COL.addSeg(r.x0 + x1, r.z0 + z1, r.x0 + x2, r.z0 + z2); }
  place(new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.5), new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.9, roughness: 0.2 })), -barLen / 4, 1.56, bb);
  place(new THREE.Mesh(new THREE.BoxGeometry(Math.min(8, barLen + 1), 1.8, 0.3), wood), 0, 2.2, backPos - backSign * 0.25);
  for (let i = 0; i < 14; i++) place(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.35, 8), new THREE.MeshStandardMaterial({ color: pick([0x2e7d32, 0x8d6e63, 0xf9a825, 0xb71c1c, 0x1565c0]), roughness: 0.2 })), -barLen / 2 + 0.4 + i * (barLen - 0.8) / 13, 2.4, backPos - backSign * 0.45);
  for (let i = 0; i < 5; i++) place(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.75, 10), new THREE.MeshStandardMaterial({ color: 0x8a2a1e })), -barLen / 2 + 0.8 + i * (barLen - 1.6) / 4, 0.5, bb - backSign * 0.9);
  const span = (along === 'x' ? L : W) / 2 - 1.5, depth = (along === 'x' ? W : L) / 2;
  for (const a of [-span * 0.6, 0, span * 0.6]) { const b = -backSign * (depth - 2.6); const t = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0xf2f2f2 })); place(t, a, 0.78, b); const l = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.76, 6), new THREE.MeshStandardMaterial({ color: 0x222222 })); place(l, a, 0.4, b); const [x, z] = P(a, b); COL.addCirc(r.x0 + x, r.z0 + z, 0.6); }
  const menu = textPlane('BARRAQUITO 1,80 € · LECHE Y LECHE 1,40 €', 5, 0.5, '#1a1a1a', '#f5d9a8', 'bold 20px Arial'); place(menu, 0, 3.1, backPos - backSign * 0.42, backSign > 0 ? Math.PI : 0);
  const ex = exitDoor(r, md.x, md.z, md.rot);
  { const [x, z] = P(-barLen / 4, bb + backSign * 0.95); npcAt(r, x, z, Math.atan2(-x, -z), { shirt: 0x111111, pants: 0x222222, female: true }); }
  for (let i = 0; i < 3; i++) { const [x, z] = P(rnd(-span, span), -backSign * (depth - 2.6) + rnd(-1, 1)); npcAt(r, x, z, Math.random() * 6); }
  const [bqx, bqz] = P(barLen / 6, bb - backSign * 1.1); // customer side of the counter
  addInterior({ id: 'cafe', name, door, spawn: { x: r.x0 + md.ix, z: r.z0 + md.iz, h: md.h }, exit: ex, ceil: r.y0 + 3.4, floor: r.y0 + 0.13, bar: { x: r.x0 + bqx, z: r.z0 + bqz } });
}
// ---- Hypermarket interior (Alcampito): the whole box of the store
function buildHyperInterior(doors, name, s) {
  const fr = s ? interiorFrame(s.pts, s.cx, s.cz, s.top - s.bmax + 0.5, 14) : { L: 60, W: 44, H: 8, toRoom: () => [0, 22] }; const L = fr.L, W = fr.W, Hh = fr.H;
  const r = roomShell(L, W, Hh, tileTex('#e6e6e2', '#c9c9c4'), 0xf1f1ee); const g = r.g;
  const md = mapDoor(fr, doors[0]); const alongX = md.side === 'pz' || md.side === 'nz'; // aisles run perpendicular to the entrance wall
  const A = alongX ? L : W, D = alongX ? W : L; const ent = (md.side === 'pz' || md.side === 'px') ? 1 : -1;
  const P = (a, b) => alongX ? [a, b] : [b, a];
  const shelfM = new THREE.MeshStandardMaterial({ color: 0xdadada, roughness: 0.4, metalness: 0.3 });
  const prodGeo = new THREE.BoxGeometry(0.35, 0.3, 0.3); const prod = []; const o = new THREE.Object3D();
  const nA = Math.max(2, Math.floor((A - 8) / 6.5)), aisleLen = Math.max(6, D - 16); const b0 = -ent * (D / 2 - 4 - aisleLen / 2);
  for (let a = 0; a < nA; a++) { const ax = -((nA - 1) * 6.5) / 2 + a * 6.5; const sh = new THREE.Mesh(alongX ? new THREE.BoxGeometry(1.2, 2.4, aisleLen) : new THREE.BoxGeometry(aisleLen, 2.4, 1.2), shelfM); const [x, z] = P(ax, b0); sh.position.set(x, 1.3, z); g.add(sh);
    const [x1, z1] = P(ax, b0 - aisleLen / 2), [x2, z2] = P(ax, b0 + aisleLen / 2); COL.addSeg(r.x0 + x1, r.z0 + z1, r.x0 + x2, r.z0 + z2);
    for (let lvl = 0; lvl < 4; lvl++) for (let k = 0; k < aisleLen / 0.42 - 1; k++) for (const sd of [-1, 1]) { const [px, pz] = P(ax + sd * 0.62, b0 - aisleLen / 2 + 0.3 + k * 0.42); prod.push([px, 0.35 + lvl * 0.55, pz, a]); } }
  const im = new THREE.InstancedMesh(prodGeo, new THREE.MeshStandardMaterial({ roughness: 0.5 }), Math.max(1, prod.length)); const cc = new THREE.Color(); const pal = [0xe53935, 0xfdd835, 0x43a047, 0x1e88e5, 0xfb8c00, 0x8e24aa, 0xffffff, 0x6d4c41];
  prod.forEach((p, i) => { o.position.set(p[0], p[1], p[2]); o.rotation.y = alongX ? 0 : Math.PI / 2; o.scale.set(1, 0.8 + Math.random() * 0.6, 1); o.updateMatrix(); im.setMatrixAt(i, o.matrix); im.setColorAt(i, cc.set(pal[(p[3] * 3 + (i % 7)) % pal.length])); }); g.add(im);
  const cats = ['PAPAS Y GOFIO', 'MOJOS', 'BEBIDAS', 'LIMPIEZA', 'DULCES', 'LÁCTEOS', 'BAZAR', 'FRUTA', 'PESCADO', 'CARNES', 'PAN', 'PLÁTANOS'];
  for (let a = 0; a < nA; a++) { const s2 = textPlane(cats[a % cats.length], 2.4, 0.5, '#d62828', '#ffffff', 'bold 40px Arial'); const [x, z] = P(-((nA - 1) * 6.5) / 2 + a * 6.5, b0 + ent * (aisleLen / 2 + 0.6)); s2.position.set(x, 4.2, z); s2.rotation.y = alongX ? (ent > 0 ? 0 : Math.PI) : (ent > 0 ? Math.PI / 2 : -Math.PI / 2); g.add(s2); }
  for (let i = 0; i < Math.floor(D / 7); i++) { const [x, z] = P(0, -D / 2 + 3.5 + i * 7); const l = new THREE.Mesh(alongX ? new THREE.BoxGeometry(A - 4, 0.1, 0.4) : new THREE.BoxGeometry(0.4, 0.1, A - 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); l.position.set(x, Hh - 0.2, z); g.add(l); }
  const nC = Math.max(2, Math.min(10, Math.floor((A - 10) / 6)));
  for (let k = 0; k < nC; k++) { const ax = -((nC - 1) * 6) / 2 + k * 6; const bz = ent * (D / 2 - 7); const [x, z] = P(ax, bz); const c = new THREE.Mesh(alongX ? new THREE.BoxGeometry(1.1, 1, 4) : new THREE.BoxGeometry(4, 1, 1.1), new THREE.MeshStandardMaterial({ color: 0x333a40 })); c.position.set(x, 0.6, z); g.add(c); const [x1, z1] = P(ax, bz - 2), [x2, z2] = P(ax, bz + 2); COL.addSeg(r.x0 + x1, r.z0 + z1, r.x0 + x2, r.z0 + z2); const [nx, nz] = P(ax + 1.1, bz + 0.5); npcAt(r, nx, nz, alongX ? -Math.PI / 2 : Math.PI, { shirt: 0xd62828 }); }
  const big = textPlane(name.toUpperCase(), Math.min(14, A * 0.5), 2.2, '#d62828', '#ffffff', 'bold 44px Oswald, Arial'); const [bx, bz] = P(0, -ent * (D / 2 - 0.1)); big.position.set(bx, Math.min(6, Hh - 1.5), bz); big.rotation.y = alongX ? (ent > 0 ? 0 : Math.PI) : (ent > 0 ? Math.PI / 2 : -Math.PI / 2); g.add(big);
  for (let i = 0; i < 12; i++) { const [x, z] = P(rnd(-A / 2 + 3, A / 2 - 3), rnd(-D / 2 + 3, D / 2 - 9)); npcAt(r, x, z, Math.random() * 6); }
  const ex = exitDoor(r, md.x, md.z, md.rot);
  addInterior({ id: 'hiper', name, door: doors, spawn: { x: r.x0 + md.ix, z: r.z0 + md.iz, h: md.h }, exit: ex, ceil: r.y0 + Hh - 0.4, floor: r.y0 + 0.13 });
}
function nearestDoor() {
  const P = PLAYER; if (P.car) return null;
  if (P.interior) { const d = P.interior; return Math.hypot(P.x - d.exit.x, P.z - d.exit.z) < 3 ? { exit: true, it: d } : null; }
  for (const it of INTERIORS) for (const d of it.doors) if (Math.hypot(P.x - d.x, P.z - d.z) < 3.4) return { exit: false, it, door: d };
  return null;
}
function updateDoorMarks(t) { for (const k of DOORMARKS) { k.m.visible = !PLAYER.interior; k.m.quaternion.copy(camera.quaternion); k.m.position.y = k.y + Math.sin(t * 2.5) * 0.25; } }
function useDoor(t) {
  const P = PLAYER; $('fade').style.opacity = 1; AUDIO.door();
  setTimeout(() => {
    if (!t.exit) { P.lastDoor = t.door || t.it.door; P.interior = t.it; P.x = t.it.spawn.x; P.z = t.it.spawn.z; P.h = t.it.spawn.h; CAM.yaw = t.it.spawn.h; HUD.toast(t.it.name, '#f5b72e', 2.5); }
    else { const d = P.lastDoor || t.it.door; P.interior = null; P.x = d.x + d.nx * 2.2; P.z = d.z + d.nz * 2.2; P.h = Math.atan2(d.nx, d.nz); CAM.yaw = P.h; }
    P.y = (P.interior ? P.interior.floor : heightAt(P.x, P.z)) + 0.2; P.vy = 0; P.onDeck = false; $('fade').style.opacity = 0;
  }, 350);
}
