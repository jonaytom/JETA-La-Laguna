// ============ Rifle de agua (v0.76, Jonay) ============
// An electric water rifle like the «SK8 Waterleopard» (~60 cm, 10–12 m of range): white and neon-orange body, a see-
// through blue tank on top that empties as you shoot. Held like the pistol (same keys: right click / APUNTAR aims,
// left click / A sprays while held); Tab / 1 / 2 / 3 change between fists, pistol and rifle. The jet is a stream of
// drops thrown in a parabola: ~10 m when aimed straight; where a drop lands it leaves a little puddle for a few
// seconds. It puts out fires (FIRES: drops or a puddle on them) and soaks people (RIFLE.targets for missions: a hit on
// the head counts apart). It is refilled at any fountain (E). It is sold in the toy shops (jugueterías), which open
// with El Blanco's mission. Wetting people is not a crime.
const RIFLE = { has: false, out: false, water: 0, max: 100, mesh: null, firing: false, targets: [], onDouse: null, onFireOut: null, lastHit: null };
const FIRES = [];
function rifleUsable() { return RIFLE.has && RIFLE.out && !PLAYER.car && !PLAYER.interior && PLAYER.down <= 0 && !PLAYER.dead; }
function giveRifle(full = true) { RIFLE.has = true; RIFLE.out = true; if (full) RIFLE.water = RIFLE.max; WEAPON.out = false; if (WEAPON.mesh) WEAPON.mesh.visible = false; AGUA.ensureMesh(); updateWeaponHUD(); }
// a fire on the ground (a pile of papers, a bin, a door…): size ~ metres; hp 1 → 0 under the water; onOut when it dies
function makeFire(x, z, size = 1, onOut) {
  const g = new THREE.Group(); const y = Math.max(heightAt(x, z), deckAt(x, z, heightAt(x, z) + 1)) + 0.02; g.position.set(x, y, z);
  const fl = AGUA.flameMats(); const flames = [];
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45 * size, 0.55 * size, 0.18, 8), M(0xe9e4d6, 0.9)); base.position.y = 0.09; g.add(base); // the papers
  for (let k = 0; k < 3; k++) { const m = new THREE.Mesh(AGUA.flameGeo(), fl[k]); m.position.set((k - 1) * 0.18 * size, 0.18, ((k % 2) - 0.5) * 0.2 * size); m.scale.setScalar(size * (k === 1 ? 1.15 : 0.8)); g.add(m); flames.push(m); }
  scene.add(g); const f = { x, z, y, size, r: 0.55 * size + 0.35, h: 1.4 * size, hp: 1, g, flames, base, onOut, t: Math.random() * 6, out: false }; FIRES.push(f); return f;
}
function clearFires() { for (let i = FIRES.length - 1; i >= 0; i--) { const f = FIRES[i]; if (f.free) continue; if (f.g.parent) f.g.parent.remove(f.g); f.base.geometry.dispose(); FIRES.splice(i, 1); } } // free: a fire of no mission (tests)
function wetChasePed(p, dt) {
  p.wetChase -= dt; const dx = PLAYER.x - p.x, dz = PLAYER.z - p.z, d = Math.hypot(dx, dz);
  if (PLAYER.car || PLAYER.dead || PLAYER.interior || d > 40 || p.down > 0 || p.wetChase <= 0) { p.wetChase = 0; if (d > 3) SUB.show('<b>Peatón:</b> ¡Ya te pillaré, chorizo!', 1.8); return false; }
  p.h += angDiff(p.h, Math.atan2(dx, dz)) * clamp(dt * 8, 0, 1); const mv = d > 1.1 ? 4.9 : 0; p.x += dx / d * mv * dt; p.z += dz / d * mv * dt;
  const r = COL.resolve(p.x, p.z, 0.3); p.x = r.x; p.z = r.z; animHuman(p.H, dt, mv); p.H.root.position.set(p.x, heightAt(p.x, p.z) + 0.17, p.z); p.H.root.rotation.y = p.h;
  if (d < 1.25 && GAME.state === 'play' && PLAYER.down <= 0) { p.wetChase = 0; if (typeof startStreetFight === 'function' && startStreetFight(p)) SUB.show('<b>Peatón empapado:</b> ¡Ahora vas a ver lo que es mojarse!', 2.5); else startFight(p); }
  return true;
}
// both hands on the rifle (see AGUA.update); aim = world direction when aiming, null when carried
const HR = { dir: new THREE.Vector3(), r: new THREE.Vector3(), T: new THREE.Vector3(), pole: new THREE.Vector3(), sh: new THREE.Vector3(), fist: new THREE.Vector3(), tmp: new THREE.Vector3(), x: new THREE.Vector3(), up: new THREE.Vector3(), m: new THREE.Matrix4(), grip: new THREE.Vector3(), hg: new THREE.Vector3() };
function holdRifle(H, aim) {
  const m = RIFLE.mesh, fx = Math.sin(PLAYER.h), fz = Math.cos(PLAYER.h); const dir = HR.dir; if (aim) dir.copy(aim).normalize(); else dir.set(fx, -0.22, fz).normalize();
  HR.r.set(-fz, 0, fx); // the character's right (forward × up)
  if (!aim) dir.set(fx * 0.5 - HR.r.x * 0.8, -0.15, fz * 0.5 - HR.r.z * 0.8).normalize(); // carried across the body, the muzzle to the front-left (so the left hand reaches the handguard)
  if (!H.skinned) { m.position.set(PLAYER.x + HR.r.x * 0.2 + fx * 0.3, PLAYER.y + 1.1, PLAYER.z + HR.r.z * 0.2 + fz * 0.3); m.quaternion.setFromRotationMatrix(HR.m.lookAt(HR.tmp.set(0, 0, 0), HR.up.copy(dir).negate(), HR.x.set(0, 1, 0))); m.updateMatrixWorld(true); return; }
  const sk = H.skeleton, sh = sk.getBoneByName('upperarm_r'); sh.updateWorldMatrix(true, false); sh.getWorldPosition(HR.sh);
  // right hand target: the grip, 30 cm along the aim from the shoulder (aiming) or by the right hip (carried)
  if (aim) HR.T.copy(HR.sh).addScaledVector(dir, 0.22).addScaledVector(HR.r, -0.08).y -= 0.06; // close to the shoulder, a bit to the centre: the left hand reaches
  else HR.T.set(PLAYER.x + HR.r.x * 0.15 + fx * 0.14, PLAYER.y + 1.08, PLAYER.z + HR.r.z * 0.15 + fz * 0.14);
  armIK(H, 'r', HR.T, HR.pole.copy(HR.r).multiplyScalar(0.7).add(HR.tmp.set(0, -1, 0)));
  gripGun(H, m, dir); // closes the fingers round the grip (and places the mesh: replaced just below)
  // upright rifle (tank on top) along dir, its grip in the fist
  const up = HR.up.set(0, 1, 0).addScaledVector(dir, -dir.y).normalize(); const x = HR.x.crossVectors(up, dir).normalize(); up.crossVectors(dir, x);
  m.quaternion.setFromRotationMatrix(HR.m.makeBasis(x, up, dir));
  const fist = HR.fist.set(0, 0, 0); let nf = 0; const bc = sk.userData.bones || {};
  for (const f of ['index', 'middle', 'ring', 'pinky']) for (const k of ['01', '02']) { const bn = bc[f + '_' + k + '_r'] || sk.getBoneByName(f + '_' + k + '_r'); if (!bn) continue; bn.getWorldPosition(HR.tmp); fist.add(HR.tmp); nf++; }
  if (!nf) sk.getBoneByName('hand_r').getWorldPosition(fist); else fist.multiplyScalar(1 / nf);
  m.position.copy(fist).sub(HR.grip.set(0, -0.06, 0).multiplyScalar(m.scale.x).applyQuaternion(m.quaternion)); m.updateMatrixWorld(true);
  // left hand under the handguard
  HR.hg.set(0, -0.045, aim ? 0.18 : 0.32).applyMatrix4(m.matrixWorld);
  armIK(H, 'l', HR.hg, HR.pole.copy(HR.r).multiplyScalar(-0.8).add(HR.tmp.set(0, -1, 0)));
}
const AGUA = (() => {
  const N = 110; let inst = null, spawnT = 0, sndT = 0, shopT = 0; const D = []; // drops: [x, y, z, vx, vy, vz, alive]
  const PUD = []; let pudGeo = null; const tmpM = new THREE.Matrix4(), tmpV = new THREE.Vector3(), aimV = new THREE.Vector3(), handV = new THREE.Vector3(), O3 = new THREE.Vector3(), NEG = new THREE.Vector3(), UP3 = new THREE.Vector3(0, 1, 0);
  let flameG = null, flameM = null, toyIcon = null; const shops = []; let shopsMade = false;
  function flameGeo() { if (!flameG) { flameG = new THREE.ConeGeometry(0.28, 1.0, 7); flameG.translate(0, 0.5, 0); flameG.userData.shared = true; } return flameG; }
  function flameMats() { if (!flameM) flameM = [0xff6a00, 0xffc400, 0xff3d00].map((c) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.6, transparent: true, opacity: 0.85, depthWrite: false })); return flameM; }
  // ---------- the rifle
  function ensureMesh() {
    if (RIFLE.mesh) { RIFLE.mesh.visible = true; return; }
    const g = new THREE.Group(), white = M(0xf4f4f0, 0.5), orange = M(0xff6d00, 0.45), dark = M(0x26282c, 0.5, 0.3);
    const tankM = new THREE.MeshStandardMaterial({ color: 0x7fd3ff, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.45, depthWrite: false });
    const box = (w, h, d, m, x, y, z, rx = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); b.rotation.x = rx; g.add(b); return b; };
    box(0.055, 0.075, 0.36, white, 0, 0.02, 0.1);              // receiver
    box(0.05, 0.05, 0.16, orange, 0, 0.005, 0.33);             // handguard
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.12, 8), dark); bar.rotation.x = Math.PI / 2; bar.position.set(0, 0.012, 0.47); g.add(bar);
    box(0.03, 0.03, 0.03, orange, 0, 0.012, 0.53);             // orange tip (toy)
    box(0.045, 0.06, 0.16, orange, 0, 0.0, -0.15);             // stock
    box(0.04, 0.09, 0.05, dark, 0, -0.06, -0.24);              // butt
    box(0.032, 0.1, 0.045, dark, 0, -0.065, 0.0, -0.25);       // grip
    box(0.03, 0.06, 0.03, white, 0, -0.03, 0.06);              // trigger guard
    const tank = box(0.07, 0.08, 0.2, tankM, 0, 0.1, 0.1); const water = box(0.06, 0.07, 0.19, new THREE.MeshStandardMaterial({ color: 0x1e88e5, transparent: true, opacity: 0.8 }), 0, 0.098, 0.1); water.userData.full = 0.07;
    g.userData.water = water; g.userData.tank = tank; g.scale.setScalar(1.15); RIFLE.mesh = g; scene.add(g);
  }
  // ---------- drops and puddles
  function init() {
    if (inst) return; const geo = new THREE.SphereGeometry(0.055, 6, 4); geo.userData.shared = true;
    inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0x9fd8ff, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.75, emissive: 0x2a5d7a }), N); inst.count = 0; inst.frustumCulled = false; scene.add(inst);
    for (let i = 0; i < N; i++) D.push([0, 0, 0, 0, 0, 0, 0]);
    pudGeo = new THREE.CircleGeometry(1, 14); pudGeo.rotateX(-Math.PI / 2); pudGeo.userData.shared = true;
    for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(pudGeo, new THREE.MeshStandardMaterial({ color: 0x5e9fc2, roughness: 0.05, metalness: 0.35, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 })); m.visible = false; m.renderOrder = 3; scene.add(m); PUD.push({ m, t: 0, r: 0.3, x: 0, z: 0 }); }
  }
  function puddle(x, z) { // a new puddle, or the one already there grows
    let p = PUD.find((q) => q.t > 0 && Math.hypot(q.x - x, q.z - z) < q.r + 0.25);
    if (!p) { p = PUD.reduce((a, b) => (a.t < b.t ? a : b)); p.x = x; p.z = z; p.r = 0.25; }
    p.t = 4.5; p.r = Math.min(1.1, p.r + 0.05); const g = heightAt(x, z), sf = surfAt(x, z); const y = Math.max(g + 0.19, sf - g < 1.6 ? sf + 0.09 : -1e9); p.m.position.set(p.x, y, p.z); p.m.scale.setScalar(p.r); p.m.visible = true;
    for (const f of FIRES) if (!f.out && Math.hypot(f.x - p.x, f.z - p.z) < f.r + p.r * 0.6) douseFire(f, 0.03);
  }
  function douseFire(f, k) { f.hp -= k; if (f.hp > 0) return; f.out = true; AUDIO.sizzle && AUDIO.sizzle(); for (const m of f.flames) m.visible = false; f.base.material = M(0x2a2622, 0.95); f.outT = 0; if (f.onOut) f.onOut(f); if (RIFLE.onFireOut) RIFLE.onFireOut(f); }
  // v0.76 (Jonay): whoever you soak comes after you, and if he catches you there is a fight (the 2D one)
  function wetPed(p) { if (p.wetT > 0.6) { p.wetT = 2.5; return; } p.wetT = 2.5; if (p.down > 0 || p.canarion) return; if (MISSIONS.active) { p.flee = 4; p.fleeFrom = [PLAYER.x, PLAYER.z]; SUB.show('<b>Peatón:</b> ¡Eh! ¡Que me mojas!', 1.6); return; } /* in a mission they just run off */ p.flee = 0; p.fight = 0; p.wetChase = 14;
    SUB.show('<b>' + pick(['Peatón', 'Un señor', 'Una chica', 'Un chaval']) + ':</b> ' + pick(['¡Eh! ¡Que me mojas! ¡Ven p\'acá!', '¡Niño, que no estamos en carnavales! ¡Te vas a enterar!', '¡Mi pelo! ¡Recién peinado! ¡Te pillo!', '¡Fuchi! ¿Agua de la fuente? ¡Ahora verás!']), 2.2); }
  function spawnDrop() {
    const m = RIFLE.mesh; if (!m) return; const d = D.find((q) => !q[6]); if (!d) return;
    const dir = aimV; if (WEAPON.aiming) camera.getWorldDirection(dir); else dir.set(Math.sin(PLAYER.h), 0, Math.cos(PLAYER.h));
    const up = (WEAPON.aiming ? 0.22 : 0.13) + (Math.random() - 0.5) * 0.04; /* from the hip the jet lands ~8 m ahead; aimed, ~11 m */ dir.y += up; dir.normalize(); const sp = 13 + Math.random() * 0.8; // ~10–11 m when aimed straight (v0.76: 11.5 m/s only reached ~5 m)
    tmpV.set(0, 0.012, 0.55).applyMatrix4(m.matrixWorld); d[0] = tmpV.x; d[1] = tmpV.y; d[2] = tmpV.z; d[3] = dir.x * sp + (Math.random() - 0.5) * 0.25; d[4] = dir.y * sp; d[5] = dir.z * sp + (Math.random() - 0.5) * 0.25; d[6] = 2.4;
  }
  function hitTargets(d) { // mission targets (Boca Papa's head…) and the people in the street
    for (const t of RIFLE.targets) { if (t.done) continue; const g = t.y0 !== undefined ? t.y0 : heightAt(t.x, t.z); const dh = Math.hypot(d[0] - t.x, d[2] - t.z); if (dh > (t.r || 0.45) || d[1] < g - 0.1 || d[1] > g + (t.h || 1.8)) continue;
      const head = t.head !== undefined && Math.abs(d[1] - (g + t.head)) < 0.32 && dh < 0.32; RIFLE.lastHit = t; if (t.onHit) t.onHit(t, head, Math.hypot(PLAYER.x - t.x, PLAYER.z - t.z)); if (RIFLE.onDouse) RIFLE.onDouse(t, head); return true; }
    for (const p of PEDS) { if (Math.abs(p.x - d[0]) > 0.6 || Math.abs(p.z - d[2]) > 0.6) continue; const g = heightAt(p.x, p.z); if (d[1] < g || d[1] > g + 1.8 || Math.hypot(p.x - d[0], p.z - d[2]) > 0.45) continue; wetPed(p); return true; }
    return false;
  }
  function update(dt) {
    init(); weaponKeys(); shopT -= dt; if (shopT <= 0) { shopT = 0.5; tickShops(); }
    const use = rifleUsable();
    if (RIFLE.mesh) RIFLE.mesh.visible = RIFLE.has && RIFLE.out && !PLAYER.car && !PLAYER.interior;
    if (!use) RIFLE.firing = false; else if (WEAPON.touchAim) WEAPON.aiming = true;
    if (use && WEAPON.want) { RIFLE.touchT = 0.5; WEAPON.want = false; } // a tap on the phone's fire button: a short burst
    if (RIFLE.touchT > 0) RIFLE.touchT -= dt;
    // hold the rifle (v0.79, Jonay: it went through the arm): both hands, like a real rifle. Aiming: the butt at the right
    // shoulder along the aim, the right hand on the grip (elbow down and out), the left hand under the handguard. Not
    // aiming: carried at the hip pointing ahead and a bit down, both hands on it.
    if (use && RIFLE.mesh && playerHuman) {
      if (WEAPON.aiming) { PLAYER.h = CAM.yaw; playerHuman.root.rotation.y = PLAYER.h; camera.getWorldDirection(aimV); }
      holdRifle(playerHuman, WEAPON.aiming ? aimV : null);
      const wl = RIFLE.mesh.userData.water; const k = clamp(RIFLE.water / RIFLE.max, 0.02, 1); wl.scale.y = k; wl.position.y = 0.098 - 0.07 * (1 - k) / 2;
    }
    // spray
    const spraying = use && (RIFLE.firing || RIFLE.touchT > 0) && RIFLE.water > 0;
    if (use && (RIFLE.firing || RIFLE.touchT > 0) && RIFLE.water <= 0 && !RIFLE.emptyMsg) { RIFLE.emptyMsg = true; AUDIO.empty && AUDIO.empty(); HUD.toast('Rifle de agua vacío: recárgalo en una fuente (' + CONTROLS.keyName('use').toUpperCase() + ')', '#7fd3ff', 2.5); }
    if (spraying && !WEAPON.aiming && playerHuman) { PLAYER.h = CAM.yaw; playerHuman.root.rotation.y = PLAYER.h; } // the jet goes where you look (as when aiming)
    if (spraying) { RIFLE.emptyMsg = false; FIGHT.blockPunch = true; spawnT -= dt; while (spawnT <= 0) { spawnT += 0.04; spawnDrop(); } RIFLE.water = Math.max(0, RIFLE.water - dt * 7.5); sndT -= dt; if (sndT <= 0) { sndT = 0.11; AUDIO.spray && AUDIO.spray(); } if (Math.random() < dt * 4) updateWeaponHUD(); }
    // drops in flight
    let n = 0;
    for (const d of D) { if (!d[6]) continue; d[6] -= dt; const px = d[0], pz = d[2]; d[4] -= 9.8 * dt; d[0] += d[3] * dt; d[1] += d[4] * dt; d[2] += d[5] * dt; d[3] *= 0.995; d[5] *= 0.995;
      let end = d[6] <= 0; const g = heightAt(d[0], d[2]), sf = surfAt(d[0], d[2]); const fl = Math.max(g, deckAt(d[0], d[2], d[1] + 0.5), sf - g < 1.6 ? sf : -1e9);
      if (!end) for (const f of FIRES) { if (f.out || Math.abs(f.x - d[0]) > f.r || Math.abs(f.z - d[2]) > f.r) continue; if (Math.hypot(f.x - d[0], f.z - d[2]) < f.r && d[1] < f.y + f.h + 0.6) { douseFire(f, 0.045); puddle(d[0], d[2]); end = true; break; } }
      if (!end && hitTargets(d)) { end = true; AUDIO.splash && Math.random() < 0.3 && AUDIO.splash(); }
      if (!end && d[1] <= fl + 0.02) { puddle(d[0], d[2]); end = true; }
      if (!end && COL.raycast(px, pz, d[0], d[2]) < 1 && d[1] < fl + 3) { puddle(px, pz); end = true; } // against a wall: it runs down to its foot
      if (end) { d[6] = 0; continue; }
      tmpM.makeTranslation(d[0], d[1], d[2]); inst.setMatrixAt(n++, tmpM); }
    inst.count = n; inst.instanceMatrix.needsUpdate = true;
    for (const p of PUD) { if (p.t <= 0) continue; p.t -= dt; p.m.material.opacity = clamp(p.t / 1.5, 0, 1) * 0.55; if (p.t <= 0) p.m.visible = false; }
    for (const p of PEDS) if (p.wetT > 0) p.wetT -= dt;
    // fires: flicker, burn you if you stand in them, the burnt pile goes after a while
    for (let i = FIRES.length - 1; i >= 0; i--) { const f = FIRES[i]; f.t += dt;
      if (!f.out) { f.flames.forEach((m, k) => { const s = f.size * (k === 1 ? 1.15 : 0.8) * Math.max(0.25, f.hp); m.scale.set(s * (1 + 0.12 * Math.sin(f.t * 13 + k * 2)), s * (1 + 0.25 * Math.sin(f.t * 9 + k)), s); });
        if (!PLAYER.car && Math.hypot(PLAYER.x - f.x, PLAYER.z - f.z) < f.r * 0.8 && PLAYER.y < f.y + 1) { PLAYER.health -= dt * 12; if (Math.random() < dt * 2) HUD.toast('¡Quema!', '#ff6a00', 0.8); } }
      else if ((f.outT += dt) > 40 && !f.keep) { if (f.g.parent) f.g.parent.remove(f.g); f.base.geometry.dispose(); FIRES.splice(i, 1); } }
  }
  // ---------- Tab / 1 / 2 / 3: fists, pistol, water rifle
  function weaponKeys() {
    if (GAME.state !== 'play' || !RIFLE.has) return;
    if (pressed('Digit3')) setRifleOut(true);
    if (pressed('Digit1') && RIFLE.out) { setRifleOut(false, true); HUD.toast('Puños', '#fff', 1.2); } // Digit2 (pistol) hides it in setWeaponOut
  }
  function setRifleOut(v, quiet) { if (!RIFLE.has || RIFLE.out === v) return; RIFLE.out = v; RIFLE.firing = false; WEAPON.aiming = false; if (v) { WEAPON.out = false; if (WEAPON.mesh) WEAPON.mesh.visible = false; ensureMesh(); } if (RIFLE.mesh) RIFLE.mesh.visible = v; if (!quiet) { AUDIO.pickup && AUDIO.pickup(); HUD.toast(v ? 'Rifle de agua' : 'Puños', v ? '#7fd3ff' : '#fff', 1.2); } updateWeaponHUD(); }
  // the order Tab goes round in: fists → pistol (if you have it) → rifle (if you have it) → fists
  function cycle() { const cur = RIFLE.out ? 2 : WEAPON.out && WEAPON.has ? 1 : 0; for (let k = 1; k <= 3; k++) { const nx = (cur + k) % 3; if (nx === 1 && !WEAPON.has) continue; if (nx === 2 && !RIFLE.has) continue;
      if (nx === 0) { setRifleOut(false, true); if (WEAPON.has) setWeaponOut(false); else HUD.toast('Puños', '#fff', 1.2); } else if (nx === 1) { setRifleOut(false, true); WEAPON.out = false; setWeaponOut(true); } else setRifleOut(true); updateWeaponHUD(); return; } }
  // mouse: right = aim, left = spray while held (the pistol's own handlers only work with the pistol out)
  document.addEventListener('mousedown', (e) => { if (GAME.state !== 'play' || !document.pointerLockElement || !rifleUsable()) return; if (e.button === 2) WEAPON.aiming = true; if (e.button === 0) { RIFLE.firing = true; FIGHT.blockPunch = true; } });
  document.addEventListener('mouseup', (e) => { if (e.button === 0) RIFLE.firing = false; });
  // ---------- toy shops and fountains (E)
  function toyIconTex() { const c = mkCanvas(128, 128), x = c.getContext('2d'); x.fillStyle = '#1e88e5'; x.beginPath(); x.arc(64, 64, 58, 0, 7); x.fill(); x.lineWidth = 8; x.strokeStyle = '#fff'; x.stroke();
    x.translate(64, 70); if (window.__toyBear) window.__toyBear(x, 30, 4); return canvasTex(c, { repeat: false }); } // a little robot (Jonay: not a drop, not a teddy bear)
  function makeShops() { if (shopsMade) return; shopsMade = true; const mat = new THREE.SpriteMaterial({ map: (toyIcon = toyIconTex()), transparent: true });
    for (const s of DATA.SH || []) { if (!s[3] || !/Juguet/i.test(s[3])) continue; const sp = safeSpot(s[0], s[1], 0.5); const spr = new THREE.Sprite(mat); spr.scale.set(1.1, 1.1, 1); spr.position.set(sp[0], heightAt(sp[0], sp[1]) + 3, sp[1]); spr.visible = false; scene.add(spr); shops.push({ x: sp[0], z: sp[1], name: s[3], spr }); } }
  const open_ = () => !!(MISSIONS.gang && MISSIONS.gang.jugueterias);
  function nearShop() { if (PLAYER.car || PLAYER.interior || !open_()) return null; for (const s of shops) if (Math.hypot(PLAYER.x - s.x, PLAYER.z - s.z) < 3.2) return s; return null; }
  function nearFountain() { if (PLAYER.car || PLAYER.interior || !RIFLE.has) return null; for (const f of PK2.fountains) if (Math.hypot(PLAYER.x - f[0], PLAYER.z - f[1]) < (f[2] || 4.6)) return f; return null; }
  const PRICE = 350, BALLS = 20;
  function openShop(s) {
    const items = []; if (ARCADE.data().invited) items.push(['arc', '🕹 Echar una partida a la máquina: <b>GUANCHE GUARRIORS</b> · <b>$1</b> la partida']); // v0.82: the toy shops' machine
    // v0.83: the GOFIO-8 console for the TV at home and its cartridges (once El Blanco has told you about the arcades)
    const A_ = ARCADE.data(), CART = { bencomo: 90, naves: 120, guanche: 150, pachanga: 140, furbito: 140 }; // v0.85: + the two sports cartridges
    if (A_.invited && !A_.console) items.push(['console', '🎮 Consola <b>GOFIO-8</b> para la tele de casa · <b>$1.200</b>']);
    if (A_.console) for (const id in CART) if (!A_.bought.includes(id) && ARCADE.GAMES[id]) items.push(['cart_' + id, `💾 Cartucho «${ARCADE.GAMES[id].title}» para la GOFIO-8 · <b>$${CART[id]}</b>`, CART[id], id]);
    if (!RIFLE.has) items.push(['rifle', `Rifle de agua «Guepardo SK-9» eléctrico · <b>$${PRICE}</b>`]); else items.push(['fill', 'Llenar el rifle de agua (del grifo de la tienda) · <b>$2</b>']); if (WEAPON.has) items.push(['balls', `Bolsa de bolitas para la pistola (6) · <b>$${BALLS}</b>`]);
    DLG.show(s.name, 'Juguetería', `Tienes <b>$${PLAYER.money}</b>.${RIFLE.has ? '' : ' En el escaparate: un rifle de agua eléctrico, «diez metros de chorro, depósito transparente».'}`, '¿Qué te llevas?', [...items.map((q) => q[1]), 'Nada, gracias'], (i) => {
      DLG.hide(); const it = items[i]; if (!it) return;
      if (it[0] === 'console' || it[0].startsWith('cart_')) { const cost2 = it[0] === 'console' ? 1200 : it[2]; if (PLAYER.money < cost2) { AUDIO.fail(); HUD.toast('No te llega el dinero: cuesta $' + cost2, '#ffb3b3', 3); return; } PLAYER.money -= cost2; AUDIO.cash && AUDIO.cash();
        if (it[0] === 'console') { A_.console = true; HUD.big('¡GOFIO-8!', '#7fe0ff', 3); HUD.toast(CASA.ownsAny() ? 'La consola ya está en la tele de tu casa. Ahora compra cartuchos aquí.' : 'Tienes la consola… pero te hace falta una casa con tele: la inmobiliaria Pisos Chachi alquila y vende pisos.', '#7fe0ff', 7); }
        else { A_.bought.push(it[3]); HUD.toast(`Cartucho «${ARCADE.GAMES[it[3]].title}»: ya lo puedes jugar en la GOFIO-8 de tu casa`, '#7fe0ff', 5);
          // v0.85 (Jonay): with every cartridge bought, the shop tells you you're a «superfriki jugón»: the video game tournament
          if (!A_.torneo && Object.keys(CART).every((k) => A_.bought.includes(k))) { A_.torneo = true; setTimeout(() => DLG.show(s.name, '¡SUPERFRIKI JUGÓN!', '«¡Ños, mi niño! ¡Te has comprado <b>todos los cartuchos</b>! Eres un <b>superfriki jugón</b> de los de verdad.» El dependiente te da un papelito: <b>el torneo de videojuegos de La Laguna</b>. Para ganarlo hay que batir el récord de todos los juegos de puntos y ganar el mundialito de Pachanga 3x3 y de Play Furbito.', '', ['¡Me apunto!'], () => { DLG.hide(); HUD.big('TORNEO DE VIDEOJUEGOS', '#ffd400', 3.5); }), 600); } }
        SAVE && SAVE.dirty && SAVE.dirty(); return; }
      if (it[0] === 'arc') { ARCADE.open({ id: 'guanche', key: 'jug_' + s.name, where: String(s.name).toUpperCase(), price: 1 }, (r) => { if (r && r.paid) HUD.toast(`Te has dejado $${r.paid} en la máquina`, '#9fd7ff', 3); }); return; }
      const cost = it[0] === 'rifle' ? PRICE : it[0] === 'balls' ? BALLS : 2;
      if (PLAYER.money < cost) { AUDIO.fail(); HUD.toast('No te llega el dinero', '#ffb3b3', 2.5); return; } PLAYER.money -= cost; AUDIO.cash && AUDIO.cash();
      if (it[0] === 'rifle') { giveRifle(true); HUD.toast('¡Rifle de agua! ' + CONTROLS.keyName('weap').toUpperCase() + ' / 3 para sacarlo', '#7fd3ff', 4); MISSIONS.onEvent('bought', 'rifle'); }
      else if (it[0] === 'balls') { WEAPON.ammo = WEAPON.max; updateWeaponHUD(); HUD.toast('Pistola cargada', '#fff', 2); }
      else { RIFLE.water = RIFLE.max; updateWeaponHUD(); HUD.toast('Rifle de agua lleno', '#7fd3ff', 2); } }); }
  function use() { const s = nearShop(); if (s) { openShop(s); return true; } const f = nearFountain(); if (f && RIFLE.water < RIFLE.max - 0.5) { RIFLE.water = RIFLE.max; AUDIO.splash && AUDIO.splash(); updateWeaponHUD(); HUD.toast('Rifle de agua lleno', '#7fd3ff', 2); MISSIONS.onEvent('refill', f); return true; } return false; }
  function prompt() { const s = nearShop(); if (s) return `${CONTROLS.kbd('use')} Entrar: ${s.name} (juguetería)`; const f = nearFountain(); if (f && RIFLE.water < RIFLE.max - 0.5) return `${CONTROLS.kbd('use')} Llenar el rifle de agua en la fuente`; return ''; }
  function tickShops() { makeShops(); const o = open_(); for (const s of shops) s.spr.visible = o && Math.abs(s.x - PLAYER.x) < 400 && Math.abs(s.z - PLAYER.z) < 400; }
  function nearestShop() { makeShops(); let b = null, bd = 1e9; for (const s of shops) { const d = Math.hypot(s.x - PLAYER.x, s.z - PLAYER.z); if (d < bd) { bd = d; b = s; } } return b ? { ...b, d: bd } : null; }
  return { isOpen: open_, nearestShop, update, ensureMesh, flameGeo, flameMats, cycle, setRifleOut, use, prompt, tickShops, get shops() { makeShops(); return shops; }, puddle, douseFire, _drops: D, _pud: PUD };
})();
