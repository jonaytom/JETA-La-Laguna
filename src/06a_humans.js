// ============ personajes con esqueleto (Quaternius Universal Base Characters + Universal Animation Library, CC0) ============
// Random clothes (painted on body regions), skin tone, hairstyle, hair colour, beard, height and build per person.
const HUM = (() => {
  const d = DATA.HUM; if (!d) return null;
  const bin = (s) => { const b = atob(s); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; };
  const tex = {}; const loader = new THREE.TextureLoader();
  for (const k in d.tex) { const isPng = k[0] === 'h'; const t = loader.load(`data:image/${isPng ? 'png' : 'jpeg'};base64,` + d.tex[k]); t.flipY = false; t.colorSpace = THREE.SRGBColorSpace; tex[k] = t; }
  const geoOf = (p, skinned) => {
    const g = new THREE.BufferGeometry(); const P = new Int16Array(bin(p.p)), N = new Int8Array(bin(p.n)), UV = new Uint16Array(bin(p.uv));
    const pos = new Float32Array(P.length), nor = new Float32Array(N.length), uv = new Float32Array(UV.length);
    for (let i = 0; i < P.length; i++) { pos[i] = P[i] / 4000; nor[i] = N[i] / 127; } for (let i = 0; i < UV.length; i++) uv[i] = UV[i] / 65535;
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    if (skinned) { g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Uint16Array(new Uint8Array(bin(p.ji))), 4)); const W = new Uint8Array(bin(p.jw)); const w = new Float32Array(W.length); for (let i = 0; i < W.length; i++) w[i] = W[i] / 255; g.setAttribute('skinWeight', new THREE.BufferAttribute(w, 4));
      const R = new Uint8Array(bin(p.rg)); const r = new Float32Array(R.length); for (let i = 0; i < R.length; i++) r[i] = R[i]; g.setAttribute('aReg', new THREE.BufferAttribute(r, 1)); }
    g.setIndex(new THREE.BufferAttribute(new Uint16Array(bin(p.i)), 1)); g.computeBoundingSphere(); g.boundingSphere.radius = 1.4; return g;
  };
  const bodies = {}; for (const k in d.bodies) { const B = d.bodies[k]; const ibm = new Float32Array(bin(B.ibm)); bodies[k] = { parts: B.parts.map((p) => ({ k: p.k, geo: geoOf(p, true) })), inv: d.skel.map((_, i) => new THREE.Matrix4().fromArray(ibm, i * 16)), tex: B.tex }; }
  const hairs = {}; for (const k in d.hairs) hairs[k] = { geo: geoOf(d.hairs[k], false), t: d.hairs[k].t };
  // animation clips (bone names = skeleton names)
  const clips = {};
  for (const name in d.anims) { const A = d.anims[name]; const tracks = []; const times = Float32Array.from({ length: A.n }, (_, i) => i * A.d / Math.max(1, A.n - 1));
    for (const j in A.tr) { const T = A.tr[j];
      if (T.r) { const q = new Int16Array(bin(T.r)); const v = new Float32Array(q.length); for (let i = 0; i < q.length; i++) v[i] = q[i] / 32767; const n = v.length / 4; tracks.push(new THREE.QuaternionKeyframeTrack(j + '.quaternion', n === 1 ? [0] : times, v)); }
      if (T.t) { const q = new Int16Array(bin(T.t)); const v = new Float32Array(q.length); for (let i = 0; i < q.length; i++) v[i] = q[i] / 4000; tracks.push(new THREE.VectorKeyframeTrack(j + '.position', times, v)); } }
    clips[name] = new THREE.AnimationClip(name, A.d, tracks); }
  return { d, tex, bodies, hairs, clips };
})();
const HCOL = {
  shirt: [0xf2f2f2, 0x1b1b1b, 0x2b4c7e, 0xb3261e, 0x3c7a4a, 0xe8c547, 0x7b5aa6, 0xd77a2d, 0x8a8f96, 0x2f9c95, 0xf0a3b5, 0x5b3a29, 0x13294b, 0xc9b38f],
  pants: [0x2b3a55, 0x1d1d1f, 0x3a4d6b, 0x6b5a42, 0x8b8f94, 0x2d3b2a, 0xc9b38f, 0x4a4a4a, 0x7b2d2d],
  shoes: [0xeeeeee, 0x111111, 0x5a3b22, 0x2b3a55, 0xb3261e, 0x8a8f96],
  hair: [0x1a1410, 0x2e1f14, 0x4a3020, 0x6b4a2b, 0x9c7a4a, 0xc9a86a, 0x8c8c8c, 0xd9d4cc, 0x101010, 0x7a2e18],
};
const humanMats = {};
function skinMaterial(texKey, cloth, sleeve, longPants) {
  const m = new THREE.MeshStandardMaterial({ map: HUM.tex[texKey], roughness: 0.75, metalness: 0 });
  m.userData.u = { uCloth: { value: cloth.map((c) => new THREE.Color(c)) }, uSleeve: { value: sleeve ? 1 : 0 }, uLong: { value: longPants ? 1 : 0 }, uJacket: { value: new THREE.Vector4(0, 0, 0, 0) }, uBelt: { value: new THREE.Vector4(0.25, 0.16, 0.1, 0) }, uSole: { value: new THREE.Color(0xf2f2f2) } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float aReg; varying float vReg; varying vec3 vBind;').replace('#include <uv_vertex>', '#include <uv_vertex>\nvReg = aReg; vBind = position;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 uCloth[6]; uniform float uSleeve; uniform float uLong; uniform vec4 uJacket; uniform vec4 uBelt; uniform vec3 uSole; varying float vReg; varying vec3 vBind;')
      .replace('#include <map_fragment>', `#include <map_fragment>
        int rg = int(vReg + 0.5);
        bool cloth = rg > 0 && !(rg == 2 && uSleeve < 0.5) && !(rg == 4 && uLong < 0.5);
        if (uJacket.a > 0.5 && (rg == 1 || rg == 2)) cloth = true;
        if (cloth) { vec3 cc = rg == 1 ? uCloth[1] : rg == 2 ? uCloth[2] : rg == 3 ? uCloth[3] : rg == 4 ? uCloth[4] : uCloth[5];
          float grain = 0.9 + 0.1 * fract(sin(dot(floor(vMapUv * 256.0), vec2(12.99, 78.23))) * 43758.5);
          if (uJacket.a > 0.5 && (rg == 2 || (rg == 1 && !(abs(vBind.x) < 0.075 && vBind.z > 0.0)))) { cc = uJacket.rgb; if (rg == 1 && abs(abs(vBind.x) - 0.08) < 0.008 && vBind.z > 0.0) cc *= 0.6; }
          if ((rg == 3) && uBelt.a > 0.0 && abs(vBind.y - uBelt.a) < 0.028) { cc = uBelt.rgb; grain = 1.0; }
          if (rg == 3 || rg == 4) grain *= 0.94 + 0.06 * sin(vBind.x * 900.0 + vBind.y * 40.0);
          if (rg == 5 && vBind.y < 0.035) cc = uSole;
          diffuseColor.rgb = cc * grain; }`);
  };
  m.customProgramCacheKey = () => 'jetaSkin';
  return m;
}
function makeHumanSkinned(o = {}) {
  const fem = o.female ?? (o.longHair ? true : Math.random() < 0.5); const B = HUM.bodies[fem ? 'f' : 'm'];
  const root = new THREE.Group(); const body = new THREE.Group(); root.add(body);
  // skeleton (own bones per person)
  const bones = HUM.d.skel.map((s) => { const b = new THREE.Bone(); b.name = s.n; b.position.fromArray(s.t); b.quaternion.fromArray(s.r); return b; });
  HUM.d.skel.forEach((s, i) => { if (s.p >= 0) bones[s.p].add(bones[i]); else body.add(bones[i]); });
  const skeleton = new THREE.Skeleton(bones, B.inv);
  // appearance
  const skinCol = o.skin ?? pick(SKIN); const sc = new THREE.Color(skinCol); const darkSkin = sc.r + sc.g + sc.b < 1.65;
  const shirt = o.shirt ?? pick(HCOL.shirt), pants = o.pants ?? pick(HCOL.pants), shoes = o.shoes ?? pick(HCOL.shoes);
  const sleeve = o.sleeve ?? Math.random() < 0.4, longP = o.longPants ?? Math.random() < 0.72;
  const texKey = B.tex[darkSkin ? 0 : 1] + (o.hd && !fem ? 'h' : ''); const mat = skinMaterial(HUM.tex[texKey] ? texKey : B.tex[darkSkin ? 0 : 1], [0, shirt, shirt, pants, pants, shoes], sleeve, longP);
  if (o.jacket !== undefined) { const jc = new THREE.Color(o.jacket); mat.userData.u.uJacket.value.set(jc.r, jc.g, jc.b, 1); }
  if (longP && (o.belt ?? !fem)) mat.userData.u.uBelt.value.w = fem ? 1.045 : 1.062;
  if (o.sole !== undefined) mat.userData.u.uSole.value.set(o.sole);
  const hairCol = o.hair ?? pick(HCOL.hair);
  for (const p of B.parts) {
    let m; if (p.k === 'body') m = mat; else if (p.k === 'eyes') m = new THREE.MeshStandardMaterial({ map: HUM.tex.eye, roughness: 0.3 }); else m = new THREE.MeshStandardMaterial({ map: HUM.tex[fem ? 'h2' : 'h1'], color: hairCol, alphaTest: 0.4, roughness: 0.9, side: THREE.DoubleSide });
    const sm = new THREE.SkinnedMesh(p.geo, m); sm.bind(skeleton, new THREE.Matrix4()); sm.castShadow = p.k === 'body'; sm.frustumCulled = false; body.add(sm);
  }
  const head = bones.find((b) => b.name === 'Head'); const spine = bones.find((b) => b.name === 'spine_02');
  // hairstyle(s) rigidly on the head bone
  const styles = fem ? ['Hair_Long', 'Hair_Buns', 'Hair_BuzzedFemale', 'Hair_Long'] : ['Hair_SimpleParted', 'Hair_Buzzed', 'Hair_SimpleParted', null];
  const hs = o.hairStyle !== undefined ? o.hairStyle : pick(styles);
  const hairMat = (k) => new THREE.MeshStandardMaterial({ map: HUM.tex[HUM.hairs[k].t], color: hairCol, alphaTest: 0.4, roughness: 0.85, side: THREE.DoubleSide });
  if (hs && HUM.hairs[hs] && !o.cap) { const h = new THREE.Mesh(HUM.hairs[hs].geo, hairMat(hs)); h.castShadow = true; head.add(h); }
  if (!fem && (o.beard ?? Math.random() < 0.3)) { const h = new THREE.Mesh(HUM.hairs.Hair_Beard.geo, hairMat('Hair_Beard')); head.add(h); }
  if (o.cap) { const cap = new THREE.Mesh(new THREE.SphereGeometry(0.115, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M(o.cap, 0.8)); cap.position.set(0, 0.11, 0.01); const visor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.012, 0.1), M(o.cap, 0.8)); visor.position.set(0, 0.11, 0.1); head.add(cap, visor); if (hs === 'Hair_Long' && HUM.hairs[hs]) { const h = new THREE.Mesh(HUM.hairs[hs].geo, hairMat(hs)); head.add(h); } }
  // accessories, modelled in the rest pose (model space: +z = front, y up) and attached to the right bone
  body.updateMatrixWorld(true);
  const bone = (n) => bones.find((x) => x.name === n);
  const attachTo = (bn, obj) => { body.add(obj); obj.updateMatrixWorld(true); bone(bn).attach(obj); obj.traverse((m) => { if (m.isMesh) m.castShadow = true; }); return obj; };
  const eyeY = fem ? 1.656 : 1.699, eyeZ = fem ? 0.075 : 0.083;
  if (o.glasses) { const g2 = new THREE.Group(); const fm = M(o.glasses === 'sun' ? 0x111111 : 0x3a2a1a, 0.4, 0.5); const lens = new THREE.MeshStandardMaterial({ color: o.glasses === 'sun' ? 0x0d1418 : 0xbfd6e0, roughness: 0.05, metalness: 0.6, transparent: o.glasses !== 'sun', opacity: 0.45 });
    for (const sx of [-1, 1]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.0035, 6, 16), fm); ring.position.set(sx * 0.031, 0, 0); g2.add(ring); const l = new THREE.Mesh(new THREE.CircleGeometry(0.021, 16), lens); l.position.set(sx * 0.031, 0, 0.001); g2.add(l); const arm = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.004, 0.1), fm); arm.position.set(sx * 0.056, 0.004, -0.05); g2.add(arm); }
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.004, 0.004), fm); g2.add(br); g2.position.set(0, eyeY, eyeZ + 0.022); attachTo('Head', g2); }
  if (o.watch) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.03, 12), M(0x222222, 0.3, 0.6)); const hp = new THREE.Vector3(); bone('hand_l').getWorldPosition(hp); const lp = new THREE.Vector3(); bone('lowerarm_l').getWorldPosition(lp); w.position.copy(hp).lerp(lp, 0.12); w.rotation.z = Math.PI / 2; body.worldToLocal(w.position); w.scale.set(1.1, 1, 1); attachTo('lowerarm_l', w); const face = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12), M(o.watch, 0.2, 0.9)); face.position.copy(w.position); face.position.y += 0.03; attachTo('lowerarm_l', face); }
  if (o.beanie) { const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.118, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), M(o.beanie, 0.95)); b2.position.set(0, eyeY + 0.035, 0.0); b2.scale.set(1, 1.05, 1.08); attachTo('Head', b2); }
  if (o.cane) { const c2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.9, 6), M(0x4a2c17, 0.7)); const hp = new THREE.Vector3(); bone('hand_r').getWorldPosition(hp); body.worldToLocal(hp); c2.position.set(hp.x - 0.05, hp.y - 0.45, hp.z + 0.02); attachTo('hand_r', c2); }
  if (o.bag) { const bg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.38, 0.14), M(o.bag, 0.85)); bg.position.set(0, 1.32, -0.22); attachTo('spine_03', bg); }
  if (o.chain) { const ch = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.006, 6, 20), M(0xd9b44a, 0.25, 0.95)); ch.rotation.x = Math.PI / 2 - 0.35; ch.position.set(0, 1.47, 0.045); attachTo('spine_03', ch); }
  // build: the base bodies are superheroes, so narrow them and vary height
  const s = o.scale ?? rnd(0.93, 1.05); const w = o.fat ? 1.0 : o.thin ? 0.74 : rnd(0.84, 0.92); bones[0].scale.set(w, o.thin ? 0.88 : w, 1); // thin = narrow shoulders, but keep body depth (no 'flat' look) body.scale.setScalar(s * (fem ? 0.97 : 1));
  if (o.fat) for (const n of ['spine_01', 'spine_02', 'pelvis']) { const b = bones.find((x) => x.name === n); b.scale.set(1.16, 1, 1.24); }
  const mixer = new THREE.AnimationMixer(body); const actions = {};
  const act = (n) => { if (!actions[n]) { const a = mixer.clipAction(HUM.clips[n]); if (/Death|Punch|Hit|Jump_Start|Jump_Land|Interact/.test(n)) { a.setLoop(THREE.LoopOnce); a.clampWhenFinished = true; } actions[n] = a; } return actions[n]; };
  const dummy = () => ({ p: new THREE.Object3D(), j: new THREE.Object3D() });
  const look = { female: fem, skin: skinCol, shirt, pants, shoes, sleeve, longP, hair: hairCol, hairStyle: hs, cap: o.cap, jacket: o.jacket, beard: !!o.beard, glasses: o.glasses, beanie: o.beanie, sole: o.sole, fat: o.fat, thin: o.thin };
  const H = { look, root, body, skinned: true, skeleton, mixer, act, cur: null, head, torso: spine, hips: new THREE.Object3D(), armL: dummy(), armR: dummy(), legL: dummy(), legR: dummy(), phase: Math.random() * 6, pose: 'walk', female: fem, oneShot: 0 };
  play(H, 'Idle_Loop', 0); mixer.update(Math.random() * 2);
  return H;
}
function play(H, name, fade = 0.25, ts = 1) {
  const a = H.act(name); a.timeScale = ts;
  if (H.cur === name) return a; const prev = H.cur ? H.act(H.cur) : null;
  a.reset(); a.setEffectiveWeight(1); a.play(); if (prev && fade > 0) prev.crossFadeTo(a, fade, false); else if (prev) prev.stop();
  H.cur = name; return a;
}
function animHumanSkinned(H, dt, speed, state) {
  if (H.oneShot > 0) { H.oneShot -= dt; H.mixer.update(dt); return; }
  let want, ts = 1;
  if (state === 'down') want = 'Death01';
  else if (state === 'air') want = 'Jump_Loop';
  else if (H.pose === 'sit') want = 'Sitting_Idle_Loop';
  else if (H.pose === 'ride') want = 'Driving_Loop';
  else if (H.pose === 'talk') want = 'Idle_Talking_Loop';
  else if (H.pose === 'dance') want = 'Dance_Loop';
  else if (speed > 6) { want = 'Sprint_Loop'; ts = clamp(speed / 7.5, 0.7, 1.4); }
  else if (speed > 2.6) { want = 'Jog_Fwd_Loop'; ts = clamp(speed / 3.6, 0.7, 1.4); }
  else if (speed > 0.15) { want = 'Walk_Loop'; ts = clamp(speed / 1.35, 0.5, 1.6); }
  else want = 'Idle_Loop';
  H.phase += dt * (speed > 0.15 ? 2.2 + speed * 1.25 : 0);
  play(H, want, want === 'Death01' ? 0.15 : 0.25).timeScale = ts;
  H.mixer.update(dt);
}
function punchSkinned(H) { const n = H.lastPunch === 'Punch_Jab' ? 'Punch_Cross' : 'Punch_Jab'; H.lastPunch = n; const a = play(H, n, 0.08, 1.5); a.reset(); a.play(); H.oneShot = HUM.clips[n].duration / 1.5 * 0.8; }
function hitSkinned(H) { const n = Math.random() < 0.5 ? 'Hit_Chest' : 'Hit_Head'; const a = play(H, n, 0.05, 1.2); a.reset(); a.play(); H.oneShot = HUM.clips[n].duration / 1.2; }
function makeHuman(o = {}) { return HUM && !o.legacy ? makeHumanSkinned(o) : makeHumanLegacy(o); }
function animHuman(H, dt, speed, state = 'ground') { if (H.skinned) animHumanSkinned(H, dt, speed, state); else animHumanLegacy(H, dt, speed, state); }
