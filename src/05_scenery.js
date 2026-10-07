// ============ landmarks, vegetation, street furniture, sky ============
const stoneTex = (() => { const c = mkCanvas(256, 256), x = c.getContext('2d'); x.fillStyle = '#6f6a62'; x.fillRect(0, 0, 256, 256); const r = mulberry(55);
  for (let yy = 0; yy < 8; yy++) { let xx = -(yy % 2) * 20; while (xx < 256) { const w = 34 + r() * 26, g = 120 + r() * 50; x.fillStyle = `rgb(${g},${g - 6},${g - 16})`; x.fillRect(xx + 2, yy * 32 + 2, w - 3, 29); xx += w; } }
  speckle(x, 256, 256, 900, ['rgba(40,40,40,.25)', 'rgba(220,220,210,.2)'], 1, 3, 57); const t = canvasTex(c); t.repeat.set(2, 7); return t; })();
const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTex, roughness: 0.92 });
{ const q = stoneTex.clone(); q.repeat.set(1, 1); q.needsUpdate = true; MAT.stone.map = q; MAT.stone.color.set(0xffffff); }
const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1ede4, roughness: 0.85 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x1c1b1a, roughness: 0.9 });
const tileMat = MAT.roofTile;
function findBuilding(sub) { return BUILD.find((b) => b.name && b.name.includes(sub)); }
function mainAxis(pts) { let best = 0, ang = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L > best) { best = L; ang = Math.atan2(q[0] - p[0], q[1] - p[1]); } } return ang; }
function tower(x, z, base, w, h, capStyle = 'pyramid') {
  const g = new THREE.Group(); const y0 = heightAt(x, z) - 0.5;
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), stoneMat); shaft.position.y = h / 2; g.add(shaft);
  // belfry openings (dark arches) on each face
  for (let s = 0; s < 4; s++) {
    const a = s * Math.PI / 2; const op = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.38, h * 0.14), darkMat);
    op.position.set(Math.sin(a) * (w / 2 + 0.02), h * 0.86, Math.cos(a) * (w / 2 + 0.02)); op.rotation.y = a; g.add(op);
    const clock = new THREE.Mesh(new THREE.CircleGeometry(w * 0.13, 20), whiteMat); clock.position.set(Math.sin(a) * (w / 2 + 0.03), h * 0.7, Math.cos(a) * (w / 2 + 0.03)); clock.rotation.y = a; if (capStyle === 'pyramid') g.add(clock);
  }
  const corn = new THREE.Mesh(new THREE.BoxGeometry(w * 1.12, 0.6, w * 1.12), stoneMat); corn.position.y = h; g.add(corn);
  if (capStyle === 'pyramid') { const cap = new THREE.Mesh(new THREE.ConeGeometry(w * 0.72, w * 0.9, 4), tileMat); cap.position.y = h + 0.3 + w * 0.45; cap.rotation.y = Math.PI / 4; g.add(cap); }
  else { const d = new THREE.Mesh(new THREE.SphereGeometry(w * 0.45, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat); d.position.y = h + 0.3; g.add(d); const c = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.2, 8), stoneMat); c.position.y = h + 0.3 + w * 0.45 + 1; g.add(c); }
  g.position.set(x, y0, z); g.rotation.y = base;
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  scene.add(g); COL.addCirc(x, z, w * 0.62); return g;
}
function buildLandmarks() {
  buildChurches();
  try { buildLandmarkDeco(); } catch (e) { console.error('landmarks', e); }
  try { buildCustomHouses(); } catch (e) { console.error('casas', e); }
  try { buildInicioDetails(); } catch (e) { console.error('inicio', e); }
  try { buildAirport(); } catch (e) { console.error('aeropuerto', e); }
  try { buildPabellon(); } catch (e) { console.error('pabellon', e); }
  try { buildPasarela(); } catch (e) { console.error('pasarela', e); }
  if (INTER_B) try { buildIntercambiador(INTER_B); } catch (e) { console.error('inter', e); }
  // (the Plaza del Adelantado and the other squares and parks are built in 05n_plazas.js)
}
const PLAZA = { x: 132, z: -56 };
const DRIVABLE = (r) => r[0] <= 12 && !(((r[3] >> 3) & 3) === 2);
function overTunnel(x, z) { const g = heightAt(x, z); return !!(lowAt(x, z, g - 2.5) || lowAt(x, z, g - 5) || lowAt(x, z, g - 7.5)); }
function onCarriageway(x, z, margin = 0.4) { const rd = ROADSEG.nearest(x, z, DRIVABLE); return !!rd && rd.d < DATA.R[rd.ri][2] / 2 + margin; }
function onAnyPaved(x, z, margin = 0.2) { const rd = ROADSEG.nearest(x, z, (r) => DRIVABLE(r) || RTN[r[0]] === 'pedestrian'); return !!rd && rd.d < DATA.R[rd.ri][2] / 2 + margin; }

// ---------- trees
const TREES = []; // x,z,type(0 laurel,1 palm,2 pine,3 generic),scale
function pip(x, z, c) { let ins = false; for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2) { const xi = c[i], zi = c[i + 1], xj = c[j], zj = c[j + 1]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) ins = !ins; } return ins; }
function scatterTrees() {
  for (let i = 0; i < DATA.N.length; i += 2) TREES.push([DATA.N[i], DATA.N[i + 1], Math.random() < 0.15 ? 1 : 0, rnd(0.8, 1.2)]);
  const AT = DATA.AT;
  for (const a of DATA.A) {
    const k = AT[a[0]]; const dens = { park: 1 / 180, garden: 1 / 260, forest: 1 / 70, scrub: 1 / 400, grass: 1 / 700, cemetery: 1 / 300, orchard: 1 / 90, square: 1 / 900 }[k];
    if (!dens) continue;
    const c = a[2]; let mnx = 1e9, mxx = -1e9, mnz = 1e9, mxz = -1e9;
    for (let i = 0; i < c.length; i += 2) { mnx = Math.min(mnx, c[i]); mxx = Math.max(mxx, c[i]); mnz = Math.min(mnz, c[i + 1]); mxz = Math.max(mxz, c[i + 1]); }
    const cnt = Math.min(400, Math.round((mxx - mnx) * (mxz - mnz) * dens * Q.trees));
    for (let i = 0; i < cnt; i++) {
      const x = rnd(mnx, mxx), z = rnd(mnz, mxz); if (!pip(x, z, c)) continue; if (COL.nearSeg(x, z, 2.5)) continue;
      const rd = ROADSEG.nearest(x, z); if (rd && rd.d < DATA.R[rd.ri][2] / 2 + 1) continue;
      const t = k === 'forest' || k === 'scrub' ? 2 : k === 'orchard' ? 3 : k === 'cemetery' ? 2 : Math.random() < 0.12 ? 1 : Math.random() < 0.5 ? 0 : 3;
      TREES.push([x, z, t, rnd(0.75, 1.3) * (k === 'orchard' ? 0.6 : 1)]);
    }
  }
  // street trees along wider avenues
  DATA.R.forEach((rd) => {
    const t = RTN[rd[0]]; if (!['primary', 'secondary', 'tertiary'].includes(t) || Math.random() < 0.4) return;
    const c = rd[4]; const w = rd[2];
    for (let i = 0; i < c.length - 2; i += 2) {
      const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); const nx = -(z2 - z1) / L, nz = (x2 - x1) / L;
      for (let s = 6; s < L - 6; s += 14) for (const side of [-1, 1]) {
        const off = w / 2 + 1.4; const x = x1 + (x2 - x1) * s / L + nx * off * side, z = z1 + (z2 - z1) * s / L + nz * off * side;
        if (COL.nearSeg(x, z, 1.6)) continue; if (Math.random() < 0.3) continue;
        TREES.push([x, z, Math.random() < 0.2 ? 1 : 3, rnd(0.6, 0.85), 1]);
      }
    }
  });
}
const GREEN_AREAS = () => DATA.A.filter((a) => ['park', 'garden', 'grass', 'forest', 'scrub', 'meadow', 'orchard', 'cemetery', 'pitch'].includes(DATA.AT[a[0]]));
let _greens = null; function isGreen(x, z) { _greens = _greens || GREEN_AREAS(); for (const a of _greens) { const c = a[2]; let mnx = 1e9, mxx = -1e9; if (pip(x, z, c)) return true; } return false; }
function jitterGeo(g, amt, seed) { const r = mulberry(seed); const p = g.attributes.position; const cache = new Map(); for (let i = 0; i < p.count; i++) { const k = p.getX(i).toFixed(3) + p.getY(i).toFixed(3) + p.getZ(i).toFixed(3); let d = cache.get(k); if (!d) { d = [(r() - 0.5) * amt, (r() - 0.5) * amt, (r() - 0.5) * amt]; cache.set(k, d); } p.setXYZ(i, p.getX(i) + d[0], p.getY(i) + d[1], p.getZ(i) + d[2]); } g.computeVertexNormals(); return g; }
function mergeGeos(list) {
  // minimal merge of non-indexed geometries with position/normal
  let n = 0; const gs = list.map((g) => { g = g.index ? g.toNonIndexed() : g; n += g.attributes.position.count; return g; });
  const p = new Float32Array(n * 3), no = new Float32Array(n * 3); let o = 0;
  for (const g of gs) { p.set(g.attributes.position.array, o * 3); no.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; }
  const r = new THREE.BufferGeometry(); r.setAttribute('position', new THREE.BufferAttribute(p, 3)); r.setAttribute('normal', new THREE.BufferAttribute(no, 3)); return r;
}
// fuse the direct mesh children of a prop group into one mesh per material (fountains: ~10 draw calls -> 2-4).
// keep(m) -> true leaves that child alone (animated or transparent parts)
function fuseGroup(g, keep) {
  const by = new Map(); g.updateMatrix(); for (const m of [...g.children]) { if (!m.isMesh || (keep && keep(m))) continue; m.updateMatrix(); const geo = m.geometry.clone().applyMatrix4(m.matrix); if (!geo.attributes.normal) geo.computeVertexNormals(); let a = by.get(m.material); if (!a) by.set(m.material, a = []); a.push(geo); m.geometry.dispose(); g.remove(m); }
  for (const [mat, list] of by) { const geo = mergeGeos(list); for (const q of list) q.dispose(); const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; g.add(m); }
  return g;
}
// is (x,z) within r metres of the tram track axis? (grid of 32 m cells built on first use)
let TRAMGRID = null;
function nearTram(x, z, r) {
  const T = DATA.T; if (T.length < 4) return false; const C = 32, key = (i, j) => i * 100003 + j;
  if (!TRAMGRID) { TRAMGRID = new Map(); for (let i = 0; i < T.length - 2; i += 2) { const i0 = Math.floor((Math.min(T[i], T[i + 2]) - 12) / C), i1 = Math.floor((Math.max(T[i], T[i + 2]) + 12) / C), j0 = Math.floor((Math.min(T[i + 1], T[i + 3]) - 12) / C), j1 = Math.floor((Math.max(T[i + 1], T[i + 3]) + 12) / C);
    for (let a = i0; a <= i1; a++) for (let b = j0; b <= j1; b++) { const k = key(a, b); let l = TRAMGRID.get(k); if (!l) TRAMGRID.set(k, l = []); l.push(i); } } }
  const l = TRAMGRID.get(key(Math.floor(x / C), Math.floor(z / C))); if (!l) return false;
  for (const i of l) { const ax = T[i], az = T[i + 1], dx = T[i + 2] - ax, dz = T[i + 3] - az, L2 = dx * dx + dz * dz || 1; const t = clamp(((x - ax) * dx + (z - az) * dz) / L2, 0, 1); if (Math.hypot(x - ax - dx * t, z - az - dz * t) < r) return true; }
  return false;
}
function buildTrees() {
  const types = [[], [], [], []]; let offTram = 0;
  for (const t of TREES) { if (!inPlayArea(t[0], t[1], -5)) continue; if (overTunnel(t[0], t[1]) || inCut(t[0], t[1], 2.2)) continue; if (onCarriageway(t[0], t[1], 0.9)) continue; if (nearTram(t[0], t[1], 4.4 + (t[2] === 1 ? 0 : 0.8) * t[3])) { offTram++; continue; } /* no trunk or crown over the tram */ if (!t[4] && onAnyPaved(t[0], t[1], -0.3) && !isGreen(t[0], t[1])) continue; types[t[2]].push(t); }
  console.log('trees kept off the tram track', offTram);
  const barkMat = new THREE.MeshStandardMaterial({ color: 0x5a4636, roughness: 1 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, flatShading: true });
  const o = new THREE.Object3D(); const col = new THREE.Color();
  const defs = [
    { // laurel de Indias: big dense round crown
      trunk: (() => { const g = new THREE.CylinderGeometry(0.28, 0.45, 3.2, 7); g.translate(0, 1.6, 0); return g; })(),
      crown: (() => { const a = jitterGeo(new THREE.IcosahedronGeometry(3.6, 1), 0.9, 1); a.scale(1.15, 0.8, 1.15); a.translate(0, 5.4, 0); const b = jitterGeo(new THREE.IcosahedronGeometry(2.6, 1), 0.7, 2); b.translate(1.8, 4.6, 0.6); const c = jitterGeo(new THREE.IcosahedronGeometry(2.4, 1), 0.7, 3); c.translate(-1.6, 4.8, -0.8); return mergeGeos([a, b, c]); })(),
      color: [0x2f5a26, 0x3b6a2c, 0x2a4f22],
    },
    { // canary palm
      trunk: (() => { const g = new THREE.CylinderGeometry(0.35, 0.5, 8, 8); g.translate(0, 4, 0); return g; })(),
      crown: (() => { const list = []; for (let i = 0; i < 14; i++) { const g = new THREE.PlaneGeometry(0.9, 4.2, 1, 3); g.translate(0, 2.1, 0); const pp = g.attributes.position; for (let k = 0; k < pp.count; k++) { const y = pp.getY(k); pp.setZ(k, -y * y * 0.07); } g.rotateX(-0.9 - Math.random() * 0.5); g.rotateY(i / 14 * Math.PI * 2); g.translate(0, 8, 0); g.computeVertexNormals(); list.push(g); } return mergeGeos(list); })(),
      color: [0x5d7a2e, 0x6a8534],
    },
    { // canary pine
      trunk: (() => { const g = new THREE.CylinderGeometry(0.22, 0.4, 9, 6); g.translate(0, 4.5, 0); return g; })(),
      crown: (() => { const l = []; for (let i = 0; i < 4; i++) { const g = jitterGeo(new THREE.ConeGeometry(2.6 - i * 0.5, 3.2, 7, 1), 0.5, 10 + i); g.translate(0, 5.5 + i * 1.8, 0); l.push(g); } return mergeGeos(l); })(),
      color: [0x2d4a2a, 0x355534],
    },
    { // generic street tree
      trunk: (() => { const g = new THREE.CylinderGeometry(0.16, 0.24, 2.6, 6); g.translate(0, 1.3, 0); return g; })(),
      crown: (() => { const a = jitterGeo(new THREE.IcosahedronGeometry(2.2, 1), 0.6, 20); a.scale(1, 1.1, 1); a.translate(0, 4, 0); return a; })(),
      color: [0x4f7a32, 0x5d8a3a, 0x6f8f3a, 0x46702d],
    },
  ];
  defs.forEach((d, ti) => {
    const list = types[ti]; if (!list.length) return;
    const tm = new THREE.InstancedMesh(d.trunk, barkMat, list.length), cm = new THREE.InstancedMesh(d.crown, leafMat, list.length);
    list.forEach((t, i) => {
      o.position.set(t[0], heightAt(t[0], t[1]), t[1]); o.rotation.y = Math.random() * 6.28; o.scale.setScalar(t[3]); o.updateMatrix();
      tm.setMatrixAt(i, o.matrix); cm.setMatrixAt(i, o.matrix); col.set(pick(d.color)).multiplyScalar(0.85 + Math.random() * 0.3); cm.setColorAt(i, col);
      COL.addCirc(t[0], t[1], (ti === 3 ? 0.25 : 0.45) * t[3]);
    });
    [tm, cm].forEach((m) => { m.castShadow = true; m.receiveShadow = true; scene.add(m); });
  });
}

// ---------- street lamps + light pools
const LAMPS = [];
let lampHeadMat, lampPoolMat;
function buildLamps() {
  DATA.R.forEach((rd) => {
    const t = RTN[rd[0]]; if (!['primary', 'secondary', 'tertiary', 'residential', 'pedestrian', 'unclassified', 'living_street'].includes(t)) return;
    const c = rd[4]; const w = rd[2]; let acc2 = Math.random() * 20; let side = 1;
    for (let i = 0; i < c.length - 2; i += 2) {
      const x1 = c[i], z1 = c[i + 1], x2 = c[i + 2], z2 = c[i + 3], L = Math.hypot(x2 - x1, z2 - z1); if (L < 1) continue; const nx = -(z2 - z1) / L, nz = (x2 - x1) / L;
      while (acc2 < L) {
        const off = t === 'pedestrian' ? w / 2 - 0.6 : w / 2 + 0.5;
        const x = x1 + (x2 - x1) * acc2 / L + nx * off * side, z = z1 + (z2 - z1) * acc2 / L + nz * off * side;
        if (!COL.nearSeg(x, z, 0.5) && !onCarriageway(x, z, 0.35) && !overTunnel(x, z)) LAMPS.push([x, z, Math.atan2(-nx * side, -nz * side), isHistoric(x, z)]);
        acc2 += 30; side = -side;
      }
      acc2 -= L;
    }
  });
  const o = new THREE.Object3D();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3a3c3e, roughness: 0.5, metalness: 0.6 });
  const histMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.5, metalness: 0.5 });
  lampHeadMat = new THREE.MeshStandardMaterial({ color: 0xfff4d6, emissive: 0xffc27a, emissiveIntensity: 0 });
  const modern = mergeGeos([(() => { const g = new THREE.CylinderGeometry(0.07, 0.1, 7, 6); g.translate(0, 3.5, 0); return g; })(), (() => { const g = new THREE.BoxGeometry(0.08, 0.08, 1.6); g.translate(0, 7, 0.8); return g; })()]);
  const modernHead = (() => { const g = new THREE.BoxGeometry(0.35, 0.12, 0.7); g.translate(0, 6.95, 1.5); return g; })();
  const hist = mergeGeos([(() => { const g = new THREE.CylinderGeometry(0.06, 0.13, 3.6, 8); g.translate(0, 1.8, 0); return g; })(), (() => { const g = new THREE.ConeGeometry(0.32, 0.35, 6); g.translate(0, 4.45, 0); return g; })()]);
  const histHead = (() => { const g = new THREE.CylinderGeometry(0.22, 0.14, 0.6, 6); g.translate(0, 3.95, 0); return g; })();
  for (let i = LAMPS.length - 1; i >= 0; i--) if (inCut(LAMPS[i][0], LAMPS[i][1], 1.0) || nearTram(LAMPS[i][0], LAMPS[i][1], LAMPS[i][3] ? 4.0 : 5.2)) LAMPS.splice(i, 1); /* modern lamps reach 1.5 m out */ console.log('lamps after cuts and tram', LAMPS.length);
  const groups = [LAMPS.filter((l) => !l[3]), LAMPS.filter((l) => l[3])];
  [[modern, modernHead, poleMat], [hist, histHead, histMat]].forEach(([pg, hg, pm], gi) => {
    const L = groups[gi]; if (!L.length) return;
    const pm1 = new THREE.InstancedMesh(pg, pm, L.length), hm = new THREE.InstancedMesh(hg, lampHeadMat, L.length);
    L.forEach((l, i) => { o.position.set(l[0], heightAt(l[0], l[1]) + 0.1, l[1]); o.rotation.y = l[2]; o.scale.setScalar(1); o.updateMatrix(); pm1.setMatrixAt(i, o.matrix); hm.setMatrixAt(i, o.matrix); COL.addCirc(l[0], l[1], 0.14); });
    pm1.castShadow = true; scene.add(pm1); scene.add(hm);
  });
  // light pools (night)
  const c = mkCanvas(64, 64), x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,200,130,1)'); g.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  lampPoolMat = new THREE.MeshBasicMaterial({ map: canvasTex(c, { repeat: false }), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -8, polygonOffsetUnits: -8 });
  const pg = new THREE.PlaneGeometry(11, 11); pg.rotateX(-Math.PI / 2);
  const pools = new THREE.InstancedMesh(pg, lampPoolMat, LAMPS.length);
  LAMPS.forEach((l, i) => { const fx = l[0] - Math.sin(l[2]) * (l[3] ? 0 : 1.5), fz = l[1] - Math.cos(l[2]) * (l[3] ? 0 : 1.5); o.position.set(fx, heightAt(fx, fz) + 0.3, fz); o.rotation.set(0, 0, 0); o.updateMatrix(); pools.setMatrixAt(i, o.matrix); });
  pools.renderOrder = 3; scene.add(pools);
}
const HIST_CORE = [[-680, -420], [-420, -640], [-120, -700], [320, -720], [360, 120], [260, 320], [-160, 300], [-420, 120], [-700, -120]].flat();
function isHistoric(x, z) { return pip(x, z, HIST_CORE); }

// tram catenary poles
function buildTramPoles() {
  const T = DATA.T; if (T.length < 4) return; const o = new THREE.Object3D();
  const g = mergeGeos([(() => { const g = new THREE.CylinderGeometry(0.1, 0.12, 6.5, 6); g.translate(0, 3.25, 0); return g; })(), (() => { const g = new THREE.BoxGeometry(3.6, 0.08, 0.08); g.translate(0, 6, 0); return g; })()]);
  const pos = []; let a = 0;
  for (let i = 0; i < T.length - 2; i += 2) { const L = Math.hypot(T[i + 2] - T[i], T[i + 3] - T[i + 1]); while (a < L) { pos.push([T[i] + (T[i + 2] - T[i]) * a / L, T[i + 1] + (T[i + 3] - T[i + 1]) * a / L, Math.atan2(T[i + 2] - T[i], T[i + 3] - T[i + 1])]); a += 35; } a -= L; }
  const m = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: 0x55595c, metalness: 0.6, roughness: 0.5 }), pos.length);
  pos.forEach((p, i) => { o.position.set(p[0], heightAt(p[0], p[1]), p[1]); o.rotation.y = p[2] + Math.PI / 2; o.updateMatrix(); m.setMatrixAt(i, o.matrix); COL.addCirc(p[0], p[1], 0.15); });
  m.castShadow = true; scene.add(m);
}

// ---------- sky + distant landscape (background scene)
const SKY = {};
function buildSky() {
  const g = new THREE.SphereGeometry(80000, 48, 24);
  const m = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { sunDir: { value: new THREE.Vector3(0, 1, 0) }, uNight: U.uNight, uTime: U.uTime, uCloud: { value: 0.55 }, zen: { value: new THREE.Color() }, hor: { value: new THREE.Color() } },
    vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }',
    fragmentShader: `varying vec3 vD; uniform vec3 sunDir; uniform float uNight; uniform float uTime; uniform float uCloud; uniform vec3 zen; uniform vec3 hor;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
      void main(){ vec3 d=normalize(vD); float y=max(d.y,0.0);
        vec3 col = mix(hor, zen, pow(y,0.55));
        float sd = max(dot(d,sunDir),0.0);
        col += vec3(1.0,0.75,0.45) * pow(sd, 8.0) * 0.35 * (1.0-uNight);
        col += vec3(1.0,0.95,0.85) * smoothstep(0.9993,0.9997,sd) * 6.0 * (1.0-uNight) * step(-0.02, sunDir.y);
        // stars
        if(uNight>0.01){ vec2 sp = d.xz/(d.y+0.3)*180.0; float s = step(0.997, h(floor(sp))); col += vec3(s)*uNight*0.8*y; }
        // cloud deck (mar de nubes / panza de burro)
        if(d.y>0.0){ vec2 cp = d.xz/(d.y+0.08)*1.3 + vec2(uTime*0.004, uTime*0.002);
          float c = smoothstep(1.0-uCloud, 1.0-uCloud+0.35, fbm(cp));
          vec3 cc = mix(vec3(0.95,0.95,0.97), vec3(0.55,0.58,0.62), fbm(cp*2.0+3.0)*0.8);
          cc = mix(cc, hor*1.05, 0.25) * mix(1.0, 0.12, uNight);
          cc += vec3(1.0,0.6,0.3)*pow(sd,4.0)*0.35*(1.0-uNight);
          col = mix(col, cc, c * smoothstep(0.0, 0.18, d.y)); }
        col = mix(hor, col, smoothstep(-0.05, 0.08, d.y));
        gl_FragColor = vec4(col,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  SKY.mat = m; const sky = new THREE.Mesh(g, m); sky.frustumCulled = false; sky.renderOrder = -10; bgScene.add(sky);
  // ocean
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(200000, 200000), new THREE.MeshStandardMaterial({ color: 0x1d4a66, roughness: 0.25, metalness: 0.1 }));
  sea.rotation.x = -Math.PI / 2; sea.position.y = -HM.base; bgScene.add(sea);
  // distant ring terrain (heights relative to La Laguna ~554m)
  const nR = 60, nA = 180; const pos = [], col = [], idx = [];
  const cA = new THREE.Color(), cLow = new THREE.Color(0x6f7a4a), cFor = new THREE.Color(0x2f4a2a), cRock = new THREE.Color(0x7a6a5a), cTown = new THREE.Color(0xb8b0a2);
  const nz2 = (a, b) => Math.sin(a * 3.1 + b * 0.0011) * 0.5 + Math.sin(a * 7.3 + b * 0.0023) * 0.25 + Math.sin(a * 17 + b * 0.005) * 0.12;
  for (let i = 0; i < nR; i++) {
    const r = 1800 * Math.pow(60000 / 1800, i / (nR - 1));
    for (let j = 0; j < nA; j++) {
      const a = j / nA * Math.PI * 2; const x = Math.sin(a) * r, z = -Math.cos(a) * r; // a=0 north
      const deg = a * 180 / Math.PI;
      let h;
      // directional profile
      const anaga = Math.exp(-Math.pow(angDiff(a, 55 * Math.PI / 180) / 0.45, 2)); // NE ridge
      const dorsal = Math.exp(-Math.pow(angDiff(a, 235 * Math.PI / 180) / 0.9, 2)); // SW rising to Las Cañadas
      const coastN = Math.exp(-Math.pow(angDiff(a, 340 * Math.PI / 180) / 0.6, 2));
      const coastSE = Math.exp(-Math.pow(angDiff(a, 130 * Math.PI / 180) / 0.5, 2));
      h = 30 + nz2(a, r) * 60;
      h += anaga * (smooth(2500, 6000, r) * 480 * (1 - smooth(9000, 15000, r)) + nz2(a * 3, r) * 120 * smooth(2500, 6000, r));
      h += dorsal * smooth(2000, 30000, r) * 1500;
      h -= coastN * smooth(7000, 12000, r) * 640; h -= coastSE * smooth(5500, 9000, r) * 640;
      h -= (1 - anaga) * (1 - dorsal) * smooth(11000, 22000, r) * 640;
      // blend with real heightmap at the inner edge
      const inner = heightAt(clamp(x, HM.x0, HM.x0 + (HM.nx - 1) * HM.dx), clamp(z, HM.z0, HM.z0 + (HM.nz - 1) * HM.dx));
      h = lerp(inner - 25, h, smooth(2500, 5200, r));
      h = Math.max(h, -HM.base - 30);
      pos.push(x, h, z);
      const hh = h + HM.base;
      if (hh < 20) cA.set(0xc9b99a); else if (hh > 1900) cA.copy(cRock); else if (anaga > 0.4 && r > 3000) cA.copy(cFor); else cA.copy(cLow).lerp(cTown, coastSE * smooth(3000, 6000, r) * 0.7);
      cA.multiplyScalar(0.9 + Math.sin(j * 1.7 + i * 2.3) * 0.08); col.push(cA.r, cA.g, cA.b);
    }
  }
  for (let i = 0; i < nR - 1; i++) for (let j = 0; j < nA; j++) { const a = i * nA + j, b = i * nA + (j + 1) % nA, c = a + nA, d = b + nA; idx.push(a, b, c, b, d, c); }
  const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); rg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); rg.setIndex(idx); rg.computeVertexNormals();
  { // bake simple lighting (sun from the SW, sky from above) into the vertex colours
    const nrm = rg.attributes.normal.array, cc = rg.attributes.color.array; const L = new THREE.Vector3(-0.5, 0.75, 0.45).normalize();
    for (let i = 0; i < nrm.length; i += 3) { const d = Math.max(0, nrm[i] * L.x + nrm[i + 1] * L.y + nrm[i + 2] * L.z); const k = 0.45 + d * 0.75; cc[i] *= k; cc[i + 1] *= k; cc[i + 2] *= k; } }
  const ringMesh = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ vertexColors: true, fog: true })); ringMesh.frustumCulled = false; bgScene.add(ringMesh); SKY.ring = ringMesh;
  // El Teide (real bearing & distance ~40 km WSW-SW)
  const tx = (-16.6424 + 16.315) * 97864, tz = -(28.2724 - 28.4875) * 110574;
  const teide = new THREE.Group();
  const cone = jitterGeo(new THREE.ConeGeometry(9000, 3200, 40, 6), 180, 5); cone.translate(0, 1600, 0);
  const cMat = new THREE.MeshStandardMaterial({ color: 0x7c6a5c, roughness: 1, flatShading: true });
  teide.add(new THREE.Mesh(cone, cMat));
  const base2 = jitterGeo(new THREE.CylinderGeometry(14000, 26000, 2400, 40, 3), 300, 6); base2.translate(0, 1200, 0); teide.add(new THREE.Mesh(base2, new THREE.MeshStandardMaterial({ color: 0x6d6552, roughness: 1, flatShading: true })));
  const snow = new THREE.Mesh(new THREE.ConeGeometry(2000, 700, 24), new THREE.MeshStandardMaterial({ color: 0xece8e0, roughness: 0.8 })); snow.position.y = 3250; teide.add(snow);
  cone.translate(0, 0, 0); teide.children[0].position.y = 400;
  teide.position.set(tx, -HM.base + 150, tz); teide.scale.set(1,1,1); bgScene.add(teide);
}
