// ---------- tram stops: side platforms with shelters, benches and an info totem (replaces the OSM "building" footprints)
const TRAMSTOP_NAMES = new Set(DATA.P.filter((p) => p[1] === 'tram_stop').map((p) => p[0]));
function isTramStopBuilding(nameIdx, pts) {
  if (!TRAMSTOP_NAMES.has(nameIdx)) return false;
  const T = DATA.T; for (const [x, z] of pts) for (let i = 0; i < T.length - 2; i += 2) { const dx = T[i + 2] - T[i], dz = T[i + 3] - T[i + 1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - T[i]) * dx + (z - T[i + 1]) * dz) / L2, 0, 1); if (Math.hypot(x - T[i] - dx * t, z - T[i + 1] - dz * t) < 8) return true; }
  return false;
}
function tramNearest(x, z) {
  const T = DATA.T; let best = null, bd = 1e9;
  for (let i = 0; i < T.length - 2; i += 2) { const dx = T[i + 2] - T[i], dz = T[i + 3] - T[i + 1], L2 = dx * dx + dz * dz || 1; const t = clamp(((x - T[i]) * dx + (z - T[i + 1]) * dz) / L2, 0, 1); const px = T[i] + dx * t, pz = T[i + 1] + dz * t, d = Math.hypot(x - px, z - pz); if (d < bd) { const L = Math.sqrt(L2); bd = d; best = { x: px, z: pz, dx: dx / L, dz: dz / L, d }; } }
  return best;
}
function stopSignTex(name) {
  const c = mkCanvas(256, 512), x = c.getContext('2d');
  x.fillStyle = '#f4f4f2'; x.fillRect(0, 0, 256, 512);
  x.fillStyle = '#2f8a3c'; x.fillRect(0, 0, 256, 150);
  x.fillStyle = '#fff'; x.beginPath(); x.arc(128, 75, 52, 0, 7); x.fill(); x.fillStyle = '#2f8a3c'; x.font = '900 70px Oswald, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('T', 128, 78);
  x.fillStyle = '#1d1d1d'; x.font = '700 30px Oswald, sans-serif'; x.fillText('TRANVÍA', 128, 190);
  // stop name, wrapped
  x.font = '600 34px Barlow, sans-serif'; const words = (name || 'Parada').toUpperCase().split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (x.measureText(t).width > 230 && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur);
  lines.slice(0, 4).forEach((l, i) => x.fillText(l, 128, 260 + i * 42));
  x.fillStyle = '#2f8a3c'; x.fillRect(0, 470, 256, 42); x.fillStyle = '#fff'; x.font = '600 20px Barlow, sans-serif'; x.fillText('Próximo: 4 min', 128, 492);
  return canvasTex(c, { repeat: false });
}
function buildTramStops() {
  if (DATA.T.length < 6) return 0;
  // group POIs by name -> one stop per name
  const by = new Map(); for (const p of DATA.P) if (p[1] === 'tram_stop') { let a = by.get(p[0]); if (!a) by.set(p[0], a = []); a.push(p); }
  const mPlat = M(0xb9b6ae, 0.85), mEdge = M(0xe3be1e, 0.7), mKerb = M(0x8d8a84, 0.9), mSteel = M(0x5c6166, 0.45, 0.6), mRoof = M(0xf0f0ee, 0.6), mGreen = M(0x2f8a3c, 0.6), mWood = M(0x8a5a3a, 0.8);
  const mGlass = new THREE.MeshStandardMaterial({ color: 0xcfe6ee, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28, depthWrite: false });
  const box = (g, mat, w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = h > 0.2; m.receiveShadow = true; g.add(m); return m; };
  let n = 0;
  for (const [nameIdx, list] of by) {
    const cx = list.reduce((s, p) => s + p[2], 0) / list.length, cz = list.reduce((s, p) => s + p[3], 0) / list.length;
    const t = tramNearest(cx, cz); if (!t || t.d > 30) continue;
    const name = nameIdx >= 0 ? STR[nameIdx] : null; const sign = new THREE.MeshStandardMaterial({ map: stopSignTex(name), roughness: 0.5, emissive: 0xffffff, emissiveIntensity: 0.08 });
    const h = Math.atan2(t.dx, t.dz);
    for (const sg of [-1, 1]) {
      const off = 4.75; const px = t.x - t.dz * off * sg, pz = t.z + t.dx * off * sg;
      const g = new THREE.Group(); g.position.set(px, Math.max(heightAt(px, pz), heightAt(t.x, t.z)), pz); g.rotation.y = h + (sg > 0 ? Math.PI : 0);
      // local frame: z along the track, -x towards the rails... (after the flip both sides face the track at -x)
      const L = 30, W = 2.3;
      box(g, mPlat, W, 0.32, L, 0, 0.16, 0);
      box(g, mKerb, 0.12, 0.34, L, -W / 2 + 0.06, 0.17, 0);
      box(g, mEdge, 0.45, 0.012, L, -W / 2 + 0.38, 0.326, 0);
      // ramps at both ends
      for (const e of [-1, 1]) { const r = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, 3), mPlat); r.position.set(0, 0.14, e * (L / 2 + 1.4)); r.rotation.x = e * 0.1; r.receiveShadow = true; g.add(r); }
      // shelter (outer half of the platform)
      const SL = 9, sx = 0.2;
      for (const zz of [-SL / 2 + 0.2, 0, SL / 2 - 0.2]) { box(g, mSteel, 0.1, 2.6, 0.1, sx + 0.7, 1.62, zz); }
      box(g, mRoof, 2.0, 0.12, SL + 0.6, sx + 0.1, 2.95, 0);
      box(g, mGreen, 0.06, 0.22, SL + 0.6, sx - 0.92, 2.86, 0);
      box(g, mGreen, 2.0, 0.22, 0.06, sx + 0.1, 2.86, SL / 2 + 0.3); box(g, mGreen, 2.0, 0.22, 0.06, sx + 0.1, 2.86, -SL / 2 - 0.3);
      const gl = box(g, mGlass, 0.03, 2.1, SL - 0.4, sx + 0.72, 1.45, 0); gl.castShadow = false;
      for (const e of [-1, 1]) { const ge = box(g, mGlass, 1.3, 2.1, 0.03, sx + 0.1, 1.45, e * (SL / 2 - 0.15)); ge.castShadow = false; }
      // bench
      box(g, mWood, 0.42, 0.06, 3.2, sx + 0.38, 0.78, -1.5); box(g, mWood, 0.05, 0.4, 3.2, sx + 0.6, 1.05, -1.5);
      for (const zz of [-2.9, -0.1]) box(g, mSteel, 0.36, 0.45, 0.06, sx + 0.38, 0.53, zz);
      // ticket machine + info totem
      box(g, mGreen, 0.55, 1.5, 0.5, sx + 0.5, 1.07, SL / 2 + 1.4); box(g, M(0x1a2228, 0.3), 0.02, 0.35, 0.3, sx + 0.22, 1.35, SL / 2 + 1.4);
      const tot = box(g, M(0x3a3f44, 0.5, 0.4), 0.16, 2.4, 0.5, sx + 0.3, 1.52, -SL / 2 - 1.6);
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 1.24), sign); panel.position.set(sx + 0.3 - 0.09, 1.95, -SL / 2 - 1.6); panel.rotation.y = -Math.PI / 2; g.add(panel);
      const panel2 = panel.clone(); panel2.position.x = sx + 0.3 + 0.09; panel2.rotation.y = Math.PI / 2; g.add(panel2);
      // waste bin
      box(g, M(0x2b5a33, 0.6), 0.4, 0.75, 0.4, sx + 0.8, 0.7, SL / 2 + 0.4);
      scene.add(g); g.updateMatrixWorld(true);
      // collisions: posts, glass back wall, totem and machine
      const W2 = (lx, lz) => { const v = new THREE.Vector3(lx, 0, lz).applyMatrix4(g.matrixWorld); return [v.x, v.z]; };
      const a = W2(sx + 0.72, -SL / 2), b = W2(sx + 0.72, SL / 2); COL.addSeg(a[0], a[1], b[0], b[1]);
      for (const [lx, lz, r] of [[sx + 0.5, SL / 2 + 1.4, 0.4], [sx + 0.3, -SL / 2 - 1.6, 0.3]]) { const p = W2(lx, lz); COL.addCirc(p[0], p[1], r); }
      n++;
    }
  }
  return n;
}
