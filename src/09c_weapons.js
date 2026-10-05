// ============ weapons: El Blanco's pistol. Aim (right mouse / APUNTAR), shoot (left click / DISPARAR) ============
const WEAPON = { has: false, ammo: 0, max: 6, aiming: false, cd: 0, mesh: null, targets: [], training: false, onHit: null, onShot: null };
(() => {
  document.addEventListener('mousedown', (e) => { if (GAME.state !== 'play' || !document.pointerLockElement) return; if (e.button === 2 && canUse()) WEAPON.aiming = true; if (e.button === 0 && canUse() && (WEAPON.ammo > 0 || WEAPON.aiming)) { WEAPON.want = true; FIGHT.blockPunch = true; } });
  document.addEventListener('mouseup', (e) => { if (e.button === 2) WEAPON.aiming = false; });
  document.addEventListener('contextmenu', (e) => { if (document.pointerLockElement) e.preventDefault(); });
})();
function canUse() { return WEAPON.has && WEAPON.out && !PLAYER.car && !PLAYER.interior && PLAYER.down <= 0 && !PLAYER.dead; }
function giveWeapon(ammo = 6, training = false) { WEAPON.has = true; WEAPON.out = true; WEAPON.ammo = ammo; WEAPON.training = training; ensureGunMesh(); updateWeaponHUD(); }
function takeWeapon() { WEAPON.has = false; WEAPON.ammo = 0; WEAPON.aiming = false; if (WEAPON.mesh) WEAPON.mesh.visible = false; updateWeaponHUD(); }
function ensureGunMesh() {
  if (WEAPON.mesh) { WEAPON.mesh.visible = true; return; }
  const g = new THREE.Group(); const dark = M(0x1e1f22, 0.35, 0.7), grip = M(0x3a2a20, 0.7);
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.04, 0.19), dark); slide.position.set(0, 0.03, 0.06);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.045), grip); handle.position.set(0, -0.025, 0); handle.rotation.x = -0.25;
  g.add(slide, handle); g.scale.setScalar(1.35); WEAPON.mesh = g; scene.add(g);
}
function updateWeaponHUD() {
  const w = $('weap'); if (!w) return; w.style.display = WEAPON.has ? 'block' : 'none'; const tm = document.body.classList.contains('touchmode');
  if (WEAPON.has) w.innerHTML = WEAPON.out ? `PISTOLA <b>${WEAPON.ammo}</b><small>/${WEAPON.max}</small><br><small style="font-size:12px;opacity:.75">${tm ? 'toca: puños' : 'TAB / 1: puños'}</small>` : `PUÑOS<br><small style="font-size:12px;opacity:.75">${tm ? 'toca: pistola' : 'TAB / 2: pistola'}</small>`;
  const t = document.body.classList.contains('touchmode'); for (const id of ['tbA', 'tbD']) { const b = $(id); if (b) b.style.display = WEAPON.has && WEAPON.out && t ? 'flex' : 'none'; }
}
// ray from the camera through the crosshair; returns the first thing hit
function shootRay() {
  const o = camera.position.clone(); const dir = new THREE.Vector3(); camera.getWorldDirection(dir);
  const skip = Math.hypot(o.x - PLAYER.x, o.z - PLAYER.z) + 0.6; const maxD = 140;
  // walls (2D) cap the range
  const ex = o.x + dir.x * maxD, ez = o.z + dir.z * maxD; const tw = COL.raycast(o.x, o.z, ex, ez); const hz = Math.hypot(dir.x, dir.z) || 1e-6; let best = { d: tw < 1 ? tw * maxD / hz : maxD, kind: 'wall' };
  const sphere = (cx, cy, cz, r) => { const lx = cx - o.x, ly = cy - o.y, lz = cz - o.z; const tca = lx * dir.x + ly * dir.y + lz * dir.z; if (tca < skip) return -1; const d2 = lx * lx + ly * ly + lz * lz - tca * tca; return d2 < r * r ? tca - Math.sqrt(r * r - d2) : -1; };
  for (const t of WEAPON.targets) { if (t.hit) continue; const d = sphere(t.x, t.y, t.z, t.r); if (d > 0 && d < best.d) best = { d, kind: 'target', t }; }
  for (const p of PEDS) { if (p.down > 0 || Math.abs(p.x - o.x) > maxD || Math.abs(p.z - o.z) > maxD) continue; const y0 = heightAt(p.x, p.z); for (const hy of [0.5, 1.0, 1.45]) { const d = sphere(p.x, y0 + hy, p.z, hy > 1.3 ? 0.18 : 0.3); if (d > 0 && d < best.d) best = { d, kind: 'ped', p }; } }
  for (const c of CARS) { if (c === PLAYER.car || Math.abs(c.x - o.x) > maxD || Math.abs(c.z - o.z) > maxD) continue; for (const [cx, cz, r] of c.circles()) { const d = sphere(cx, c.y + 0.7, cz, r); if (d > 0 && d < best.d) best = { d, kind: 'car', c }; } }
  best.p3 = o.clone().addScaledVector(dir, best.d); return best;
}
function fireWeapon() {
  if (WEAPON.cd > 0) return; if (WEAPON.ammo <= 0) { AUDIO.empty && AUDIO.empty(); HUD.toast(WEAPON.training ? 'Sin balas' : 'Sin balas. El Blanco te conseguirá más… algún día.', '#ffb3b3', 1.5); WEAPON.cd = 0.3; if (WEAPON.onShot) WEAPON.onShot(null); return; }
  WEAPON.cd = 0.38; WEAPON.ammo--; updateWeaponHUD(); AUDIO.shot && AUDIO.shot(); CAM.shake = Math.max(CAM.shake, 0.18);
  PLAYER.h = CAM.yaw; // face where you aim
  muzzleFlash();
  const h = shootRay();
  if (h.kind === 'target') { h.t.hit = true; AUDIO.clink && AUDIO.clink(); if (h.t.mesh) { h.t.vy = 3.5; h.t.vx = rnd(-1.5, 1.5); h.t.vz = rnd(-1.5, 1.5); } if (WEAPON.onHit) WEAPON.onHit(h.t); }
  else if (h.kind === 'ped') { const p = h.p; p.down = 8; p.fight = 0; p.vx = (p.x - PLAYER.x) * 0.2; p.vz = (p.z - PLAYER.z) * 0.2; if (p.H.skinned) hitSkinned(p.H); SUB.show('<b>Peatón:</b> ¡Aaaay! ¡Me han dado!', 2); }
  else if (h.kind === 'car') { h.c.health -= 18; h.c.lastImpact = 0; }
  if (WEAPON.onShot) WEAPON.onShot(h);
  // shooting in the street is a serious crime if anybody sees or hears it
  if (!WEAPON.training) {
    const witness = PEDS.some((p) => p.down <= 0 && Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z) < 55) || CARS.some((c) => c.type === 'police' && Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z) < 120);
    if (witness) { WANTED.armed = true; WANTED.crime(Math.max(3, Math.ceil(WANTED.level) + 1) - Math.ceil(WANTED.level), 'Disparos en la vía pública'); for (const p of PEDS) if (p.down <= 0 && Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z) < 40) { p.flee = 10; p.fleeFrom = [PLAYER.x, PLAYER.z]; } }
  }
}
let flashLight = null;
function muzzleFlash() {
  if (!flashLight) { flashLight = new THREE.PointLight(0xffc870, 0, 9, 2); scene.add(flashLight); }
  const m = WEAPON.mesh; const p = new THREE.Vector3(); if (m) m.getWorldPosition(p); else p.set(PLAYER.x, PLAYER.y + 1.4, PLAYER.z);
  flashLight.position.copy(p); flashLight.intensity = 6; setTimeout(() => { flashLight.intensity = 0; }, 60);
}
// arm pose: point the right arm along the aim direction (done after the animation mixer)
const _qa = new THREE.Quaternion(), _qb = new THREE.Quaternion(), _va = new THREE.Vector3(), _vb = new THREE.Vector3(), _vc = new THREE.Vector3();
function aimArm(H, dir) {
  if (!H.skinned) return; const sk = H.skeleton; const up = sk.getBoneByName('upperarm_r'), lo = sk.getBoneByName('lowerarm_r'), ha = sk.getBoneByName('hand_r'); if (!up || !lo || !ha) return;
  const align = (b, child) => { b.updateWorldMatrix(true, false); child.updateWorldMatrix(false, false); b.getWorldPosition(_va); child.getWorldPosition(_vb); _vc.subVectors(_vb, _va).normalize();
    _qa.setFromUnitVectors(_vc, dir); b.getWorldQuaternion(_qb); _qb.premultiply(_qa); const pq = new THREE.Quaternion(); b.parent.getWorldQuaternion(pq); b.quaternion.copy(pq.invert().multiply(_qb)); b.updateWorldMatrix(false, true); };
  align(up, lo); align(lo, ha);
}
function updateWeapons(dt) {
  weaponSwitchInput();
  if (WEAPON.cd > 0) WEAPON.cd -= dt;
  if (!canUse()) { WEAPON.aiming = WEAPON.touchAim = false; } else if (WEAPON.touchAim) WEAPON.aiming = true;
  const xh = $('xhair'); if (xh) xh.style.display = WEAPON.aiming || (canUse() && document.body.classList.contains('touchmode')) ? 'block' : 'none';
  if (WEAPON.want && canUse()) fireWeapon(); WEAPON.want = false;
  if (WEAPON.has && WEAPON.mesh) {
    WEAPON.mesh.visible = !PLAYER.car && !PLAYER.interior && !!WEAPON.out;
    if (WEAPON.aiming && playerHuman) { PLAYER.h = CAM.yaw; playerHuman.root.rotation.y = PLAYER.h; const d = new THREE.Vector3(); camera.getWorldDirection(d); aimArm(playerHuman, d); }
    if (playerHuman && playerHuman.skinned && WEAPON.mesh.visible && WEAPON.out) { let d = null; if (WEAPON.aiming) { d = new THREE.Vector3(); camera.getWorldDirection(d); } gripGun(playerHuman, WEAPON.mesh, d); }
  }
  // flying cans
  for (const t of WEAPON.targets) if (t.hit && t.mesh && t.vy !== undefined) { t.vy -= 9.8 * dt; t.mesh.position.x += t.vx * dt; t.mesh.position.z += t.vz * dt; t.mesh.position.y += t.vy * dt; t.mesh.rotation.x += dt * 9; const g = heightAt(t.mesh.position.x, t.mesh.position.z) + 0.06; if (t.mesh.position.y < g) { t.mesh.position.y = g; t.vy = 0; t.vx *= 0.5; t.vz *= 0.5; } }
}

// the pistol sits in the palm of the right hand: barrel along the knuckles' direction, slide on the thumb side, fingers wrapped round the grip
const GRIP = { curl: 1.25, sgn: 1 };
function gripGun(H, mesh, aimDir) {
  const sk = H.skeleton, B = (n) => sk.getBoneByName(n); const hand = B('hand_r'), mid = B('middle_01_r'), ind = B('index_01_r'), pin = B('pinky_01_r'); if (!hand || !mid) return;
  hand.updateWorldMatrix(true, true);
  const ph = new THREE.Vector3(), pm = new THREE.Vector3(), pi = new THREE.Vector3(), pp = new THREE.Vector3();
  hand.getWorldPosition(ph); mid.getWorldPosition(pm); ind.getWorldPosition(pi); pin.getWorldPosition(pp);
  const fwd = aimDir ? aimDir.clone().normalize() : pm.clone().sub(ph).normalize();
  const up = pi.clone().sub(pp); up.addScaledVector(fwd, -up.dot(fwd)).normalize();
  const x = new THREE.Vector3().crossVectors(up, fwd).normalize();
  const m = new THREE.Matrix4().makeBasis(x, up, fwd); mesh.quaternion.setFromRotationMatrix(m);
  // palm centre: a bit before the knuckles, on the palm side
  const palm = ph.clone().lerp(pm, 0.8); palm.addScaledVector(x, GRIP.sgn * -0.025); palm.addScaledVector(up, -0.005);
  mesh.position.copy(palm);
  // curl the four fingers round the grip (rotation about the knuckle line)
  const axis = pi.clone().sub(pp).normalize(); const qd = new THREE.Quaternion(), qw = new THREE.Quaternion(), qp = new THREE.Quaternion();
  for (const f of ['index', 'middle', 'ring', 'pinky']) for (const k of ['01', '02', '03']) { const b = B(f + '_' + k + '_r'); if (!b) continue; b.updateWorldMatrix(true, false);
    qd.setFromAxisAngle(axis, GRIP.sgn * GRIP.curl * (k === '01' ? 0.85 : 0.7)); b.getWorldQuaternion(qw); qw.premultiply(qd); b.parent.getWorldQuaternion(qp); b.quaternion.copy(qp.invert().multiply(qw)); b.updateWorldMatrix(false, true); }
  // the handle goes exactly inside the closed fist: halfway between the knuckles and the middle phalanges
  const fist = new THREE.Vector3(), tmp = new THREE.Vector3(); let nf = 0;
  for (const f of ['index', 'middle', 'ring', 'pinky']) for (const k of ['01', '02']) { const b = B(f + '_' + k + '_r'); if (!b) continue; b.getWorldPosition(tmp); fist.add(tmp); nf++; }
  if (nf) { fist.multiplyScalar(1 / nf); const hOff = new THREE.Vector3(0, -0.025, 0).multiplyScalar(mesh.scale.x).applyQuaternion(mesh.quaternion); mesh.position.copy(fist).sub(hOff); }
  // thumb wraps over the other side of the grip
  for (const k of ['01', '02']) { const b = B('thumb_' + k + '_r'); if (!b) continue; b.updateWorldMatrix(true, false); qd.setFromAxisAngle(fwd, GRIP.sgn * -0.45); b.getWorldQuaternion(qw); qw.premultiply(qd); b.parent.getWorldQuaternion(qp); b.quaternion.copy(qp.invert().multiply(qw)); b.updateWorldMatrix(false, true); }
  mesh.updateMatrixWorld(true);
}
// switch between fists and the pistol: Tab toggles, 1 = fists, 2 = pistol, gamepad d-pad left/right, tap the weapon label on phones
function setWeaponOut(v) { if (!WEAPON.has || WEAPON.out === v) return; WEAPON.out = v; WEAPON.aiming = false; if (WEAPON.mesh) WEAPON.mesh.visible = v; AUDIO.pickup && AUDIO.pickup(); updateWeaponHUD(); HUD.toast(v ? 'Pistola' : 'Puños', '#fff', 1.2); }
function weaponSwitchInput() {
  if (GAME.state !== 'play' || !WEAPON.has) return; const gp = INPUT.gp;
  if (pressed('Tab') || (gp && (gp.down(14) || gp.down(15)))) setWeaponOut(!WEAPON.out);
  if (pressed('Digit1')) setWeaponOut(false); if (pressed('Digit2')) setWeaponOut(true);
}
(() => { const w = document.getElementById('weap'); if (w) { w.style.pointerEvents = 'auto'; w.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); setWeaponOut(!WEAPON.out); }); }
  document.addEventListener('keydown', (e) => { if (e.code === 'Tab' && GAME.state === 'play') e.preventDefault(); }, true); })();
