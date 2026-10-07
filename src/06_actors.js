// ============ humans & vehicle meshes ============
const matCache = new Map();
function M(color, rough = 0.8, metal = 0, extra) { const k = color + ':' + rough + ':' + metal + (extra ? JSON.stringify(extra) : ''); let m = matCache.get(k); if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...(extra || {}) }); matCache.set(k, m); } return m; }
const GEO = {
  capsule: (r, l) => new THREE.CapsuleGeometry(r, l, 4, 8),
};
const SKIN = [0xf1c7a5, 0xe0ac86, 0xc68b63, 0x9a6444, 0x6e4630, 0xf5d3bb];
const SHIRT = [0xffffff, 0x1f3b73, 0xb3261e, 0x2e7d32, 0xf2c14e, 0x333333, 0x7b4b94, 0x4fa3d1, 0xe07a5f, 0x9e9e9e, 0x0f766e, 0xf4a261];
const PANTS = [0x2b3a55, 0x1d1d1d, 0x4a4036, 0x6b705c, 0x3a506b, 0x8d7b68, 0x222831];
const HAIR = [0x1a1410, 0x3b2a1e, 0x6b4a2b, 0xb58b52, 0x8c8c8c, 0x0d0d0d];
function makeHumanLegacy(o = {}) {
  const skin = o.skin ?? pick(SKIN), shirt = o.shirt ?? pick(SHIRT), pants = o.pants ?? pick(PANTS), hair = o.hair ?? pick(HAIR);
  const root = new THREE.Group(); const body = new THREE.Group(); root.add(body);
  const s = o.scale ?? rnd(0.92, 1.06); body.scale.setScalar(s);
  const mSkin = M(skin, 0.7), mShirt = M(shirt, 0.9), mPants = M(pants, 0.9), mShoe = M(o.shoes ?? pick([0x111111, 0xeeeeee, 0x5a3b22]), 0.6), mHair = M(hair, 0.9);
  const hips = new THREE.Group(); hips.position.y = 0.95; body.add(hips);
  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.2), mPants); hips.add(pelvis);
  const torso = new THREE.Group(); hips.add(torso);
  const chest = new THREE.Mesh(GEO.capsule(0.17, 0.3), mShirt); chest.position.y = 0.3; chest.scale.set(1.08, 1, 0.72); torso.add(chest);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 8), mSkin); neck.position.y = 0.58; torso.add(neck);
  const head = new THREE.Group(); head.position.y = 0.7; torso.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), mSkin); skull.scale.set(0.9, 1.05, 1); head.add(skull);
  const hairM = new THREE.Mesh(new THREE.SphereGeometry(0.128, 16, 10, 0, Math.PI * 2, 0, o.longHair ? Math.PI * 0.75 : Math.PI * 0.5), mHair); hairM.position.y = 0.015; hairM.position.z = -0.01; head.add(hairM);
  if (o.longHair) { const h2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.25, 0.08), mHair); h2.position.set(0, -0.08, -0.08); head.add(h2); }
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.04), mSkin); nose.position.set(0, -0.01, 0.12); head.add(nose);
  const eyeM = M(0x111111, 0.3); [-0.04, 0.04].forEach((x) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), eyeM); e.position.set(x, 0.02, 0.105); head.add(e); });
  if (o.cap) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.07, 14), M(o.cap, 0.8)); c.position.y = 0.08; head.add(c); const v = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.015, 0.12), M(o.cap, 0.8)); v.position.set(0, 0.05, 0.14); head.add(v); }
  const limb = (parent, x, y, r1, l1, r2, l2, m1, m2, endGeo, endMat) => {
    const p = new THREE.Group(); p.position.set(x, y, 0); parent.add(p);
    const u = new THREE.Mesh(GEO.capsule(r1, l1), m1); u.position.y = -l1 / 2 - r1 * 0.3; p.add(u);
    const j = new THREE.Group(); j.position.y = -l1 - r1 * 0.5; p.add(j);
    const lo = new THREE.Mesh(GEO.capsule(r2, l2), m2); lo.position.y = -l2 / 2 - r2 * 0.3; j.add(lo);
    const e = new THREE.Mesh(endGeo, endMat); e.position.y = -l2 - r2 * 0.6; j.add(e); if (endGeo.type === 'BoxGeometry') e.position.z = 0.05;
    return { p, j, e };
  };
  const armL = limb(torso, -0.23, 0.48, 0.055, 0.22, 0.045, 0.2, o.shortSleeve === false ? mShirt : mShirt, mSkin, new THREE.SphereGeometry(0.05, 8, 6), mSkin);
  const armR = limb(torso, 0.23, 0.48, 0.055, 0.22, 0.045, 0.2, mShirt, mSkin, new THREE.SphereGeometry(0.05, 8, 6), mSkin);
  const legL = limb(hips, -0.1, -0.05, 0.08, 0.34, 0.065, 0.34, mPants, mPants, new THREE.BoxGeometry(0.11, 0.08, 0.26), mShoe);
  const legR = limb(hips, 0.1, -0.05, 0.08, 0.34, 0.065, 0.34, mPants, mPants, new THREE.BoxGeometry(0.11, 0.08, 0.26), mShoe);
  armL.p.rotation.z = 0.08; armR.p.rotation.z = -0.08;
  root.traverse((m) => { if (m.isMesh) { m.castShadow = true; } });
  const H = { root, body, hips, torso, head, armL, armR, legL, legR, phase: Math.random() * 6, pose: 'walk' };
  return H;
}
function animHumanLegacy(H, dt, speed, state = 'ground') {
  // speed m/s
  const b = H;
  if (state === 'down') { b.body.rotation.x = lerp(b.body.rotation.x, -Math.PI / 2, 0.2); b.body.position.y = lerp(b.body.position.y, 0.2, 0.2); return; }
  b.body.rotation.x = lerp(b.body.rotation.x, 0, 0.2); b.body.position.y = lerp(b.body.position.y, 0, 0.2);
  if (state === 'air') { b.legL.p.rotation.x = -0.6; b.legL.j.rotation.x = 0.9; b.legR.p.rotation.x = 0.2; b.legR.j.rotation.x = 0.4; b.armL.p.rotation.x = -2.2; b.armR.p.rotation.x = -2.2; return; }
  const run = clamp((speed - 2) / 4, 0, 1);
  b.phase += dt * (speed > 0.1 ? 2.2 + speed * 1.25 : 0);
  const a = speed > 0.1 ? (0.45 + run * 0.45) : 0; const s = Math.sin(b.phase), c = Math.cos(b.phase);
  b.legL.p.rotation.x = s * a; b.legR.p.rotation.x = -s * a;
  b.legL.j.rotation.x = Math.max(0, -c) * a * 1.6 + 0.05; b.legR.j.rotation.x = Math.max(0, c) * a * 1.6 + 0.05;
  b.armL.p.rotation.x = -s * a * 0.9; b.armR.p.rotation.x = s * a * 0.9;
  b.armL.j.rotation.x = -0.2 - run * 1.1; b.armR.j.rotation.x = -0.2 - run * 1.1;
  b.torso.rotation.x = run * 0.22; b.torso.rotation.y = s * 0.08 * a;
  b.hips.position.y = 0.95 + Math.abs(c) * 0.04 * a - run * 0.04 + (speed < 0.1 ? Math.sin(performance.now() / 700) * 0.005 : 0);
}

// ---------- vehicles
const VTYPES = {
  compact: { name: 'Aguere Compacto', L: 3.9, W: 1.72, H: 1.45, maxV: 42, acc: 9, grip: 7.5, mass: 1, prof: 'hatch' },
  sedan: { name: 'Mencey Berlina', L: 4.5, W: 1.8, H: 1.45, maxV: 48, acc: 10, grip: 8, mass: 1.2, prof: 'sedan' },
  suv: { name: 'Teno 4x4', L: 4.6, W: 1.9, H: 1.75, maxV: 44, acc: 9, grip: 7, mass: 1.5, prof: 'suv' },
  van: { name: 'Tagoror Furgo', L: 5.0, W: 1.95, H: 2.2, maxV: 36, acc: 6.5, grip: 6.5, mass: 1.8, prof: 'van' },
  taxi: { name: 'Taxi Lagunero', L: 4.5, W: 1.8, H: 1.45, maxV: 46, acc: 10, grip: 8, mass: 1.2, prof: 'sedan' },
  police: { name: 'Policía Local', L: 4.6, W: 1.85, H: 1.5, maxV: 55, acc: 12.5, grip: 9, mass: 1.4, prof: 'sedan' },
  sport: { name: 'Guanche GT', L: 4.3, W: 1.9, H: 1.25, maxV: 68, acc: 16, grip: 10, mass: 1.2, prof: 'sport' },
  bus: { name: 'Guagua Urbana', L: 11.5, W: 2.5, H: 3.1, maxV: 26, acc: 4, grip: 6, mass: 6, prof: 'bus' },
};
const CARCOL = [0xf2f2f2, 0x1b1b1b, 0x9aa0a6, 0xb3261e, 0x1f4e8c, 0x2d5a3d, 0xd8c7a3, 0x5b6770, 0x7a1f2b, 0xe7e7e7, 0x3c3c3c, 0x2a6f97, 0xc97b2a];
const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a232b, roughness: 0.08, metalness: 0.9 });
const tireMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xb8bcc0, roughness: 0.3, metalness: 0.9 });
const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2d0, emissiveIntensity: 0.2, roughness: 0.1 });
const tailMat = new THREE.MeshStandardMaterial({ color: 0x8a0d0d, emissive: 0xff1a1a, emissiveIntensity: 0.3, roughness: 0.2 });
const tailBrakeMat = new THREE.MeshStandardMaterial({ color: 0xaa1111, emissive: 0xff2020, emissiveIntensity: 2.5, roughness: 0.2 });
const policeBlue = new THREE.MeshStandardMaterial({ color: 0x0a2a8a, emissive: 0x2255ff, emissiveIntensity: 0, roughness: 0.3 });
const policeRed = new THREE.MeshStandardMaterial({ color: 0x0a2a8a, emissive: 0x2255ff, emissiveIntensity: 0, roughness: 0.3 });
function textPlane(txt, w, h, bg, fg, font = 'bold 48px Arial') { const c = mkCanvas(256, 64), x = c.getContext('2d'); x.fillStyle = bg; x.fillRect(0, 0, 256, 64); x.fillStyle = fg; x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 128, 34); const t = canvasTex(c, { repeat: false }); return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, transparent: bg === 'rgba(0,0,0,0)' })); }
function profile(prof, L, H) {
  const l = L / 2; const cl = 0.28; // ground clearance
  const P = {
    sedan: { low: [[-l, cl + 0.1], [-l, 0.85], [-l + 0.2, 0.95], [l - 0.25, 0.92], [l, 0.75], [l, cl + 0.1], [l - 0.15, cl]], cab: [[-l + 0.55, 0.92], [-l + 1.1, H], [l - 1.55, H], [l - 0.85, 0.92]] },
    hatch: { low: [[-l, cl + 0.1], [-l, 0.95], [l - 0.2, 0.9], [l, 0.72], [l, cl + 0.1], [l - 0.15, cl]], cab: [[-l + 0.05, 0.95], [-l + 0.2, H], [l - 1.45, H], [l - 0.75, 0.9]] },
    suv: { low: [[-l, cl + 0.2], [-l, 1.05], [l - 0.2, 1.05], [l, 0.85], [l, cl + 0.2], [l - 0.2, cl + 0.05]], cab: [[-l + 0.05, 1.05], [-l + 0.15, H], [l - 1.35, H], [l - 0.8, 1.05]] },
    van: { low: [[-l, cl + 0.15], [-l, 1.1], [l - 0.15, 1.1], [l, 0.9], [l, cl + 0.15]], cab: [[-l + 0.02, 1.1], [-l + 0.02, H], [l - 1.0, H], [l - 0.3, 1.1]] },
    sport: { low: [[-l, cl + 0.05], [-l, 0.8], [-l + 0.3, 0.86], [l - 0.4, 0.78], [l, 0.6], [l, cl + 0.05], [l - 0.2, cl]], cab: [[-l + 0.9, 0.84], [-l + 1.6, H], [l - 1.9, H], [l - 1.05, 0.78]] },
    bus: { low: [[-l, cl + 0.1], [-l, 1.2], [l, 1.2], [l, cl + 0.1]], cab: [[-l, 1.2], [-l, H - 0.15], [l - 0.1, H - 0.15], [l, 1.2]] },
  }[prof];
  return P;
}
function extrudeProfile(pts, width, bevel = 0.06) {
  const s = new THREE.Shape(); pts.forEach((p, i) => (i ? s.lineTo(p[0], p[1]) : s.moveTo(p[0], p[1])));
  const g = new THREE.ExtrudeGeometry(s, { depth: width - bevel * 2, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 2 });
  g.translate(0, 0, -(width - bevel * 2) / 2); g.rotateY(-Math.PI / 2); g.computeVertexNormals(); return g;
}
const CARGEO = {}; const PLATES = [];
function makeCarMesh(type, color) {
  const T = VTYPES[type]; const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  if (type === 'taxi') color = 0xf4f4f4; if (type === 'police') color = 0xf5f7fa; if (type === 'bus') color = 0x1f8a4c;
  const paint = new THREE.MeshStandardMaterial({ color, roughness: 0.28, metalness: 0.55 });
  const P = profile(T.prof, T.L, T.H);
  const GC = CARGEO[type] || (CARGEO[type] = { low: extrudeProfile(P.low, T.W, 0.08), cab: extrudeProfile(P.cab, T.W * 0.84, 0.05) }); GC.low.userData.shared = GC.cab.userData.shared = true;
  const low = new THREE.Mesh(GC.low, paint); body.add(low);
  const cab = new THREE.Mesh(GC.cab, glassMat); body.add(cab);
  // roof slab
  const roofPts = P.cab; const ry = roofPts[1][1];
  const roof = new THREE.Mesh(new THREE.BoxGeometry(T.W * 0.86, 0.07, Math.abs(roofPts[2][0] - roofPts[1][0]) + 0.1), type === 'bus' ? M(0xf2f2f2, 0.4, 0.2) : paint);
  roof.position.set(0, ry, (roofPts[2][0] + roofPts[1][0]) / 2); body.add(roof);
  // pillars
  const pil = (i) => { const a = roofPts[i], b = roofPts[i === 0 ? 1 : 2]; const len = Math.hypot(b[0] - a[0], b[1] - a[1]); const m = new THREE.Mesh(new THREE.BoxGeometry(T.W * 0.855, 0.08, len), paint); m.position.set(0, (a[1] + b[1]) / 2, (a[0] + b[0]) / 2); m.rotation.x = -Math.atan2(b[1] - a[1], b[0] - a[0]); return m; };
  if (type === 'bus') { const band = new THREE.Mesh(new THREE.BoxGeometry(T.W + 0.02, 0.35, T.L - 0.1), M(0xf2f2f2, 0.4, 0.2)); band.position.y = 1.25; body.add(band); const sign = sharedText('014  LA LAGUNA', 1.9, 0.3, '#111', '#ffb000', 'bold 30px monospace'); sign.position.set(0, T.H - 0.35, T.L / 2 + 0.02); body.add(sign); }
  // wheels
  const wr = type === 'bus' ? 0.5 : type === 'suv' ? 0.38 : 0.33; const wheels = [];
  const wg = new THREE.CylinderGeometry(wr, wr, 0.24, 16); wg.rotateZ(Math.PI / 2);
  const rg = new THREE.CylinderGeometry(wr * 0.62, wr * 0.62, 0.25, 12); rg.rotateZ(Math.PI / 2);
  const axF = T.L / 2 - (type === 'bus' ? 2.4 : 0.85), axR = -T.L / 2 + (type === 'bus' ? 2.8 : 0.8);
  for (const [x, z, front] of [[-1, axF, 1], [1, axF, 1], [-1, axR, 0], [1, axR, 0]]) {
    const piv = new THREE.Group(); piv.position.set(x * (T.W / 2 - 0.1), wr, z); g.add(piv);
    const w = new THREE.Mesh(wg, tireMat); const rim = new THREE.Mesh(rg, rimMat); w.add(rim); piv.add(w); w.castShadow = true; wheels.push({ piv, w, front });
  }
  // lights
  const lz = T.L / 2 + 0.01; const hl = []; const tl = [];
  for (const x of [-1, 1]) {
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.05), headMat); h.position.set(x * (T.W / 2 - 0.3), P.low[P.low.length - 1][1] + 0.35 + (type === 'bus' ? 0.1 : 0), lz - 0.03); body.add(h); hl.push(h);
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.05), tailMat); t.position.set(x * (T.W / 2 - 0.25), 0.78 + (type === 'bus' ? 0.2 : 0), -lz + 0.03); body.add(t); tl.push(t);
  }
  // plates
  if (PLATES.length < 10) { const pl = textPlane(Math.floor(1000 + Math.random() * 8999) + ' ' + pick(['KHT', 'LBC', 'MFZ', 'JRW', 'GPD', 'NCX']), 0.52, 0.12, '#f4f4f4', '#111', 'bold 40px Arial'); pl.geometry.userData.shared = true; pl.material.userData.shared = true; PLATES.push(pl); }
  const plate = pick(PLATES).clone();
  plate.position.set(0, 0.5, -lz - 0.005); plate.rotation.y = Math.PI; body.add(plate);
  const bumperM = M(0x222222, 0.7);
  const bf = new THREE.Mesh(new THREE.BoxGeometry(T.W * 0.98, 0.18, 0.12), type === 'sport' ? paint : bumperM); bf.position.set(0, 0.42, T.L / 2 - 0.02); body.add(bf);
  const bb = bf.clone(); bb.position.z = -T.L / 2 + 0.02; body.add(bb);
  let bar = null;
  if (type === 'police') {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(T.W + 0.01, 0.16, T.L * 0.8), M(0x1c3fa8, 0.4)); stripe.position.y = 0.66; body.add(stripe);
    const st2 = new THREE.Mesh(new THREE.BoxGeometry(T.W + 0.012, 0.05, T.L * 0.8), M(0xf2c200, 0.4)); st2.position.y = 0.77; body.add(st2);
    bar = new THREE.Group(); const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.25), policeBlue); b1.position.x = -0.28; const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.25), policeRed); b2.position.x = 0.28; bar.add(b1, b2); bar.position.set(0, ry + 0.1, (roofPts[2][0] + roofPts[1][0]) / 2); body.add(bar);
    for (const side of [-1, 1]) { const t = sharedText('POLICÍA LOCAL', 1.8, 0.28, 'rgba(0,0,0,0)', '#1c3fa8', 'bold 34px Arial'); t.position.set(side * (T.W / 2 + 0.015), 0.95, -0.2); t.rotation.y = side * Math.PI / 2; body.add(t); }
  }
  if (type === 'taxi') { const s2 = sharedText('TAXI', 0.5, 0.16, '#f4f4f4', '#1a8a3a', 'bold 56px Arial'); s2.position.set(0, ry + 0.14, (roofPts[2][0] + roofPts[1][0]) / 2 + 0.05); const bx = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.12), M(0xf4f4f4, 0.5)); bx.position.copy(s2.position); bx.position.z -= 0.07; body.add(bx, s2); const st = new THREE.Mesh(new THREE.BoxGeometry(T.W + 0.01, 0.07, T.L * 0.7), M(0x1a8a3a, 0.4)); st.position.y = 0.75; body.add(st); }
  if (type === 'sport') { const sp = new THREE.Mesh(new THREE.BoxGeometry(T.W * 0.9, 0.05, 0.3), M(0x111111, 0.5)); sp.position.set(0, 0.98, -T.L / 2 + 0.2); body.add(sp); const st = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.01, T.L), M(0xffffff, 0.3)); st.position.set(-0.2, 0.81, 0); body.add(st); const st2 = st.clone(); st2.position.x = 0.2; body.add(st2); }
  body.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = false; } });
  return { g, body, wheels, hl, tl, bar, paint };
}

// ---------- tram (articulated, 3 modules)
function makeTram() {
  const parts = [];
  const white = M(0xf2f3f5, 0.35, 0.3), dark = glassMat, stripe = M(0x1b6fa8, 0.4, 0.2), grey = M(0x4a4f55, 0.6);
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group(); const len = i === 1 ? 8 : 11;
    const b = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, len), white); b.position.y = 1.75; g.add(b);
    const w = new THREE.Mesh(new THREE.BoxGeometry(2.42, 1.0, len - 0.6), dark); w.position.y = 2.2; g.add(w);
    const s = new THREE.Mesh(new THREE.BoxGeometry(2.43, 0.25, len), stripe); s.position.y = 1.15; g.add(s);
    const sk = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.45, len - 0.4), grey); sk.position.y = 0.3; g.add(sk);
    if (i !== 1) { const nose = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.3, 0.6), dark); nose.position.set(0, 2.3, (i === 0 ? 1 : -1) * (len / 2 + 0.15)); g.add(nose); const pan = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 1.2), grey); pan.position.set(0, 3.6, 0); pan.rotation.x = 0.5; g.add(pan); }
    g.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    g.userData.len = len; parts.push(g); scene.add(g);
  }
  return parts;
}
