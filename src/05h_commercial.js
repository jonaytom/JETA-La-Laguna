// ============ commercial zone: big-box stores (parody names), parking lots, parking garage ============
const STORE_STYLE = { Alcampo: ['#d62828', '#ffffff'], Makro: ['#1d3a8a', '#f5c518'], 'Leroy Merlin': ['#3a8a2a', '#ffffff'], Decathlon: ['#0082c3', '#ffffff'], IKEA: ['#0051ba', '#ffda1a'], 'Toys R Us': ['#1e5aa8', '#ffcf2e'], Lidl: ['#0050aa', '#ffe000'], Mercadona: ['#1a7a3a', '#ffffff'], "McDonald's": ['#c8102e', '#ffc72c'], SuperDino: ['#e30613', '#ffffff'], HiperDino: ['#e30613', '#ffffff'] };
function bigSign(text, w, h, bg, fg) { const c = mkCanvas(1024, Math.round(1024 * h / w)); const x = c.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); x.strokeStyle = 'rgba(255,255,255,.4)'; x.lineWidth = 8; x.strokeRect(6, 6, c.width - 12, c.height - 12); let fs = c.height * 0.7; x.font = `700 ${fs}px Oswald, Impact, Arial`; while (x.measureText(text).width > c.width * 0.9) { fs -= 4; x.font = `700 ${fs}px Oswald, Impact, Arial`; } x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, c.width / 2, c.height / 2 + fs * 0.05); const t = canvasTex(c, { repeat: false }); const m = new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.15, roughness: 0.5 }); SIGN.mats.push(m); return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); }
const LOTS = [];
function buildParkingLots() {
  // lot surfaces with painted bays, rasterised on a 5 m grid so they follow the ground
  const c = mkCanvas(128, 256), x = c.getContext('2d'); x.drawImage(TEX.asphaltC, 0, 0, 128, 256); x.fillStyle = '#f2f2ec'; x.fillRect(0, 0, 4, 256); x.fillRect(0, 0, 128, 4);
  const lotTex = canvasTex(c); const lotMat = new THREE.MeshStandardMaterial({ map: lotTex, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
  const pos = [], uv = [];
  for (const a of DATA.A) {
    if (DATA.AT[a[0]] !== 'parking') continue; const c2 = a[2]; const pts = []; for (let i = 0; i < c2.length; i += 2) pts.push([c2[i], c2[i + 1]]);
    let area = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; } area = Math.abs(area / 2); if (area < 300) continue;
    let cx = 0, cz = 0; for (const p of pts) { cx += p[0]; cz += p[1]; } cx /= pts.length; cz /= pts.length;
    const F = axisFrame(pts, cx, cz); const lot = { pts, cx, cz, F, area, slots: 0 }; LOTS.push(lot);
    const S = 2.5, T = 5.5;
    for (let u = F.u0; u < F.u1; u += S) for (let v = F.v0; v < F.v1; v += T) {
      const [mx, mz] = F.W(u + S / 2, v + T / 2); if (!pip(mx, mz, c2)) continue;
      const corners = [[u, v], [u + S, v], [u + S, v + T], [u, v + T]].map(([uu, vv]) => { const [px, pz] = F.W(uu, vv); return [px, heightAt(px, pz) + 0.12, pz]; });
      pos.push(...corners[0], ...corners[2], ...corners[1], ...corners[0], ...corners[3], ...corners[2]); uv.push(0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1);
      // parked cars in every other row (aisles in between), about 60% occupancy
      const row = Math.round((v - F.v0) / T); if (row % 3 !== 1 && Math.random() < 0.6 && !COL.nearSeg(mx, mz, 2) && !onCarriageway(mx, mz, 0.5)) { PARKED.slots.push({ x: mx, z: mz, h: Math.atan2(F.vx, F.vz) + (Math.random() < 0.5 ? Math.PI : 0), type: pick(['compact', 'sedan', 'suv', 'compact', 'van']), color: pick(CARCOL), alive: true }); lot.slots++; }
    }
    if (a[1] >= 0 || area > 2000) lot.name = a[1] >= 0 ? STR[a[1]] : null;
  }
  if (pos.length) { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.computeVertexNormals(); const m = new THREE.Mesh(g, lotMat); m.receiveShadow = true; m.renderOrder = 1; scene.add(m); }
}
function buildBigStores() {
  for (const s of BIGSTORES) {
    if (s.name === 'Mercadona' && Math.hypot(s.cx + 831, s.cz + 387) < 12) s.mainStreet = /Marqués de Celada/; // real main entrance on Marqués de Celada (n.º 55)
    const [bg, fg] = STORE_STYLE[s.name] || ['#333', '#fff'];
    // pick the facade facing the largest nearby lot (or the longest edge)
    let lot = null, bd = 260; for (const l of LOTS) { const d = Math.hypot(l.cx - s.cx, l.cz - s.cz); if (d < bd && l.area > 800) { bd = d; lot = l; } }
    const n = s.pts.length; let best = null, score = -1e9;
    for (let i = 0; i < n; i++) { const p = s.pts[i], q = s.pts[(i + 1) % n]; const L = Math.hypot(q[0] - p[0], q[1] - p[1]); if (L < 12) continue; const nx = (q[1] - p[1]) / L, nz = -(q[0] - p[0]) / L; const mx = (p[0] + q[0]) / 2, mz = (p[1] + q[1]) / 2;
      let sc = L; if (s.mainStreet) for (const sd of [1, -1]) { const rr = ROADSEG.nearest(mx + nx * 8 * sd, mz + nz * 8 * sd); if (rr && rr.d < 10 && s.mainStreet.test(STR[DATA.R[rr.ri][1]] || '')) sc += 1000; } if (lot) { const dx = lot.cx - mx, dz = lot.cz - mz, dl = Math.hypot(dx, dz) || 1; sc += 80 * ((dx * nx + dz * nz) / dl); } const rdn = ROADSEG.nearest(mx + nx * 6, mz + nz * 6); if (rdn && rdn.d < 25) sc += 15; if (COL.nearSeg(mx + nx * 2, mz + nz * 2, 1)) sc -= 200; (s.cands = s.cands || []).push({ p, q, L, nx, nz, mx, mz, sc }); if (sc > score) { score = sc; best = { p, q, L, nx, nz, mx, mz }; } }
    if (!best) continue; s.face = best;
    const w = Math.min(best.L * 0.55, 34), h = Math.max(2.6, w / 5.5); const sg = bigSign(s.parody.toUpperCase(), w, h, bg, fg);
    sg.position.set(best.mx + best.nx * 0.25, s.top - h / 2 - 0.8, best.mz + best.nz * 0.25); sg.rotation.y = Math.atan2(best.nx, best.nz); scene.add(sg);
    // rooftop totem so it reads from the motorway
    const tw = Math.min(16, w * 0.6); const t2 = bigSign(s.parody.toUpperCase(), tw, tw / 5, bg, fg); t2.position.set(s.cx, s.top + tw / 10 + 1.2, s.cz); t2.rotation.y = Math.atan2(best.nx, best.nz); scene.add(t2);
    const t3 = t2.clone(); t3.rotation.y += Math.PI; scene.add(t3);
    if (s.mainStreet) { // Mercadona n.º 55: grey rendered front, dark recessed entrance under a balcony with railing
      const ang = Math.atan2(best.nx, best.nz), gy = heightAt(best.mx, best.mz); const g = new THREE.Group(); g.position.set(best.mx + best.nx * 0.15, gy, best.mz + best.nz * 0.15); g.rotation.y = ang;
      const dark = new THREE.Mesh(new THREE.PlaneGeometry(7, 4.4), M(0x141414, 0.9)); dark.position.set(0, 2.2, 0.05); g.add(dark);
      const band = bigSign(s.parody.toUpperCase(), 6.2, 0.8, '#3a3a3a', '#d8d8d8'); band.position.set(0, 3.7, 0.12); g.add(band);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(Math.min(best.L - 2, 16), 0.25, 1.3), M(0xb8b8b2, 0.85)); slab.position.set(0, 4.7, 0.65); g.add(slab);
      const rail = new THREE.Mesh(new THREE.BoxGeometry(Math.min(best.L - 2, 16), 0.06, 0.06), M(0x222222, 0.5, 0.5)); rail.position.set(0, 5.75, 1.28); g.add(rail);
      for (let x = -Math.min(best.L - 2, 16) / 2; x <= Math.min(best.L - 2, 16) / 2; x += 0.15) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.0, 0.03), M(0x222222, 0.5, 0.5)); b.position.set(x, 5.3, 1.28); g.add(b); }
      const corner = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 7, 20, 1, false, 0, Math.PI), M(0xb8b8b2, 0.85)); corner.position.set(-Math.min(best.L / 2, 11) + 0.5, 3.5, -1.7); corner.rotation.y = -Math.PI / 2; g.add(corner);
      scene.add(g); }
    // glass entrance
    const ent = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 0.3), glassMat); ent.position.set(best.mx + best.nx * 0.2, heightAt(best.mx, best.mz) + 2.1, best.mz + best.nz * 0.2); ent.rotation.y = Math.atan2(best.nx, best.nz); scene.add(ent);
    LABELS.push([s.parody, s.cx, s.cz, 5]); /* big store: shown from mid zoom */
    // blue P sign for the store's car park (with its internal/underground parking entrance)
    const px = best.mx + best.nx * 9 + (best.q[0] - best.p[0]) / best.L * (best.L * 0.35), pz = best.mz + best.nz * 9 + (best.q[1] - best.p[1]) / best.L * (best.L * 0.35);
    if (!onCarriageway(px, pz, 0.5)) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4, 8), M(0x555a5e, 0.5, 0.6)); pole.position.set(px, heightAt(px, pz) + 2, pz); scene.add(pole); const ps = bigSign('P', 1.4, 1.4, '#1f4ea8', '#ffffff'); ps.position.set(px, heightAt(px, pz) + 4.3, pz); ps.rotation.y = Math.atan2(best.nx, best.nz); scene.add(ps); const ps2 = ps.clone(); ps2.rotation.y += Math.PI; scene.add(ps2); COL.addCirc(px, pz, 0.12); }
  }
}
function buildCommercialInteriors() {
  const s = BIGSTORES.find((b) => b.name === 'Alcampo') || BIGSTORES.sort((a, b) => b.area - a.area)[0];
  if (s && s.face) {
    const cs = (s.cands || []).sort((a, b) => b.sc - a.sc); const doors = [];
    for (const f of cs) { if (doors.length >= 3) break; if (f.sc < 0) continue; if (doors.some((d) => Math.abs(d.nx * f.nx + d.nz * f.nz) > 0.9 && Math.hypot(d.x - f.mx, d.z - f.mz) < 30)) continue; doors.push({ x: f.mx + f.nx * 0.4, z: f.mz + f.nz * 0.4, nx: f.nx, nz: f.nz }); }
    buildHyperInterior(doors.length ? doors : [{ x: s.face.mx + s.face.nx * 0.4, z: s.face.mz + s.face.nz * 0.4, nx: s.face.nx, nz: s.face.nz }], s.parody, s);
  }
}
