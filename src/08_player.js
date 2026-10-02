// ============ input, player, camera ============
const KEYS = new Set(); const PRESSED = new Set();
const INPUT = { mdx: 0, mdy: 0, wheel: 0, touch: { x: 0, y: 0, active: false, look: [0, 0] }, gp: null, lastMouse: 0 };
window.addEventListener('keydown', (e) => { if (e.repeat) return; KEYS.add(e.code); PRESSED.add(e.code); if (['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.code)) e.preventDefault(); });
window.addEventListener('keyup', (e) => KEYS.delete(e.code));
window.addEventListener('blur', () => KEYS.clear());
document.addEventListener('mousemove', (e) => { if (document.pointerLockElement) { INPUT.mdx += e.movementX; INPUT.mdy += e.movementY; INPUT.lastMouse = performance.now(); } });
window.addEventListener('wheel', (e) => { INPUT.wheel += Math.sign(e.deltaY); }, { passive: true });
const key = (...c) => c.some((k) => KEYS.has(k));
const pressed = (...c) => { let r = false; for (const k of c) if (PRESSED.has(k)) r = true; return r; };
function readGamepad() {
  const gps = navigator.getGamepads ? navigator.getGamepads() : []; const g = gps && [...gps].find((p) => p && p.connected);
  if (!g) { INPUT.gp = null; return; }
  const dz = (v) => (Math.abs(v) < 0.15 ? 0 : v);
  const prev = INPUT.gp ? INPUT.gp.btn : [];
  const btn = g.buttons.map((b) => b.pressed);
  INPUT.gp = { lx: dz(g.axes[0]), ly: dz(g.axes[1]), rx: dz(g.axes[2] || 0), ry: dz(g.axes[3] || 0), rt: g.buttons[7]?.value || 0, lt: g.buttons[6]?.value || 0, btn, down: (i) => btn[i] && !prev[i], hold: (i) => btn[i] };
}

const PLAYER = { x: 0, z: 0, y: 0, h: 0, vy: 0, onGround: true, car: null, lastCar: null, health: 100, money: 350, down: 0, speed: 0, dead: false };
let playerHuman;
function initPlayer() {
  playerHuman = makeHuman({ skin: 0xd9a47c, shirt: 0xf5f5f5, pants: 0x2b3a55, hair: 0x1a1410, shoes: 0xf2f2f2, sole: 0xd62828, scale: 1.0, female: false, beard: false, sleeve: false, longPants: true, hairStyle: 'Hair_SimpleParted', hd: true, jacket: 0x1f4d2b, watch: 0xc9c9c9, chain: true, belt: true });
  scene.add(playerHuman.root);
  // start: Calle Teobaldo Power at the junction with Calle Adelantado
  PLAYER.x = -758; PLAYER.z = -364; PLAYER.h = Math.PI / 2; CAM.yaw = Math.PI / 2;
  const r = COL.resolve(PLAYER.x, PLAYER.z, 0.4); PLAYER.x = r.x; PLAYER.z = r.z; PLAYER.y = heightAt(PLAYER.x, PLAYER.z) + 0.17;
}
const CAM = { yaw: Math.PI, pitch: 0.25, dist: 4.6, shake: 0, pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 62, mode: 0 };

function nearestEnterable() {
  let best = null, bd = 4.2;
  for (const c of CARS) { if (c.dead || c.driver === 'player') continue; const d = Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z) - c.T.W * 0.3; if (d < bd && (c.speed < 6 || c.mode === 'traffic')) { bd = d; best = c; } }
  for (const s of parkedNear(PLAYER.x, PLAYER.z, 4.5)) { const d = Math.hypot(s.x - PLAYER.x, s.z - PLAYER.z) - 0.6; if (d < bd) { bd = d; best = s; } }
  return best;
}
function enterCar(t) {
  let car = t;
  if (!(t instanceof Car)) { car = activateParked(t); WANTED.crime(Math.random() < 0.25 ? 1 : 0, 'Robo de vehículo'); }
  if (car.driver === 'ai' || car.driver === 'police') {
    const fx = Math.sin(car.h), fz = Math.cos(car.h); const px = car.x + fz * 1.6, pz = car.z - fx * 1.6;
    const p = spawnPed(px, pz, true); if (p) { p.flee = 8; p.fleeFrom = [PLAYER.x, PLAYER.z]; }
    WANTED.crime(car.type === 'police' ? 2 : 1, car.type === 'police' ? 'Robo de coche patrulla' : 'Robo de vehículo');
    SUB.show(pick(['¡Eh! ¡Mi coche, desgraciado!', '¡Chacho, qué haces! ¡Socorro!', '¡Me roban el coche, mi madre!', '¡Fuerte ladrón!']), 2.5);
  }
  if (car.mode === 'traffic') { car.mode = 'physics'; car.vx = car.vz = 0; }
  car.mode = 'physics'; car.driver = 'player'; car.siren = false; car.ctl = { thr: 0, brk: 0, steer: 0, hb: 0 };
  PLAYER.car = car; PLAYER.lastCar = car; playerHuman.root.visible = false; AUDIO.door();
  if (car.type === 'moto') { car.mesh.add(playerHuman.root); seatHuman(playerHuman, car.model); playerHuman.root.visible = true; }
  HUD.vehicle(car.T.name, (car.model && car.model.cat) || { compact: 'Utilitario', sedan: 'Berlina', suv: 'Todoterreno', van: 'Furgoneta', taxi: 'Taxi', police: 'Patrulla', sport: 'Deportivo', bus: 'Guagua' }[car.type] || 'Vehículo');
  CAM.yaw = car.h;
  MISSIONS.onEvent('enter', car);
}
function exitCar() {
  const car = PLAYER.car; if (!car) return; if (car.speed > 8) return;
  const fx = Math.sin(car.h), fz = Math.cos(car.h);
  if (car.low && underground(car.x, car.z, car.y)) { PLAYER.x = car.x + fz * (car.T.W / 2 + 0.6); PLAYER.z = car.z - fx * (car.T.W / 2 + 0.6); PLAYER.y = car.y; } else for (const side of [1, -1]) { const px = car.x + fz * side * (car.T.W / 2 + 0.7), pz = car.z - fx * side * (car.T.W / 2 + 0.7); const r = COL.resolve(px, pz, 0.35); if (Math.hypot(r.x - px, r.z - pz) < 0.3 || side === -1) { PLAYER.x = r.x; PLAYER.z = r.z; break; } }
  if (car.type === 'moto') { scene.add(playerHuman.root); unseatHuman(playerHuman); playerHuman.root.rotation.set(0, 0, 0); }
  car.driver = null; car.ctl = { thr: 0, brk: 1, steer: 0, hb: 1 }; PLAYER.car = null; playerHuman.root.visible = true; PLAYER.h = car.h; AUDIO.door();
  MISSIONS.onEvent('exit', car);
}

function updatePlayer(dt) {
  const gp = INPUT.gp;
  if (PLAYER.dead) return;
  if (pressed('KeyE') || (gp && gp.down(2))) { const t = nearestDoor(), f = FOOD.near(); const preferFood = f && (!t || (f.counter && t.exit && Math.hypot(PLAYER.x - f.x, PLAYER.z - f.z) < Math.hypot(PLAYER.x - t.it.exit.x, PLAYER.z - t.it.exit.z))); if (preferFood) { FOOD.open(f); return; } if (t) { useDoor(t); return; } }
  if (pressed('KeyF', 'Enter') || (gp && gp.down(3))) { if (PLAYER.car) exitCar(); else { const t = nearestEnterable(); if (t) enterCar(t); } }
  if (PLAYER.car) {
    const c = PLAYER.car.ctl;
    let thr = key('KeyW', 'ArrowUp') ? 1 : 0, brk = key('KeyS', 'ArrowDown') ? 1 : 0, st = (key('KeyA', 'ArrowLeft') ? 1 : 0) - (key('KeyD', 'ArrowRight') ? 1 : 0);
    if (gp) { thr = Math.max(thr, gp.rt); brk = Math.max(brk, gp.lt); if (gp.lx) st = -gp.lx; }
    if (INPUT.touch.active) { const ty = -INPUT.touch.y; thr = Math.max(thr, ty > 0.2 ? ty : 0); brk = Math.max(brk, ty < -0.2 ? -ty : 0); st = -INPUT.touch.x; }
    c.thr = thr; c.brk = brk; c.steer = st; c.hb = key('Space') || (gp && gp.hold(0)) || INPUT.touch.hb ? 1 : 0;
    if (pressed('KeyH') || (gp && gp.down(10))) AUDIO.horn();
    if (pressed('KeyR')) { const car = PLAYER.car; if (car.speed < 3) { car.pitch = 0; car.roll = 0; car.vx = car.vz = 0; const r = COL.resolve(car.x, car.z, 2.5); car.x = r.x; car.z = r.z; } }
    PLAYER.x = PLAYER.car.x; PLAYER.z = PLAYER.car.z; PLAYER.y = PLAYER.car.y; PLAYER.speed = PLAYER.car.speed;
    // pedestrian zone: the Policía Local doesn't like cars on La Carrera
    PLAYER.pzT = (PLAYER.pzT || 0) - dt;
    if (PLAYER.pzT <= 0) { PLAYER.pzT = 0.25; const rd = ROADSEG.nearest(PLAYER.x, PLAYER.z, (r) => RTN[r[0]] !== 'footway' && RTN[r[0]] !== 'steps'); const inPed = rd && RTN[DATA.R[rd.ri][0]] === 'pedestrian' && rd.d < DATA.R[rd.ri][2] / 2 + 1.5 && PLAYER.car.type !== 'police';
      if (inPed) { if (!PLAYER.inPed) HUD.toast('¡ZONA PEATONAL! Sal o vendrá la policía', '#ffb03a', 2.5); PLAYER.inPed = true; PLAYER.pedTime = (PLAYER.pedTime || 0) + 0.25; if (PLAYER.pedTime > 2.5 && PLAYER.car.speed > 1) { WANTED.crime(1, 'Circular por zona peatonal'); PLAYER.pedTime = -6; } }
      else { PLAYER.inPed = false; PLAYER.pedTime = 0; } }
    return;
  }
  // ---- on foot
  if (PLAYER.down > 0) { PLAYER.down -= dt; animHuman(playerHuman, dt, 0, 'down'); playerHuman.root.position.set(PLAYER.x, PLAYER.y, PLAYER.z); return; }
  let ix = (key('KeyD', 'ArrowRight') ? 1 : 0) - (key('KeyA', 'ArrowLeft') ? 1 : 0), iz = (key('KeyW', 'ArrowUp') ? 1 : 0) - (key('KeyS', 'ArrowDown') ? 1 : 0);
  if (gp && (gp.lx || gp.ly)) { ix = gp.lx; iz = -gp.ly; }
  if (INPUT.touch.active) { ix = INPUT.touch.x; iz = -INPUT.touch.y; }
  const il = Math.hypot(ix, iz); if (il > 1) { ix /= il; iz /= il; }
  const fx = Math.sin(CAM.yaw), fz = Math.cos(CAM.yaw), rx = -fz, rz = fx;
  const sprint = key('ShiftLeft', 'ShiftRight') || (gp && gp.hold(0)) || INPUT.touch.sprint;
  const walk = key('AltLeft', 'KeyC');
  const sp = walk ? 1.6 : sprint ? 7.4 : 4.3;
  const mx = (fx * iz + rx * ix) * sp, mz = (fz * iz + rz * ix) * sp;
  const m = Math.hypot(mx, mz);
  PLAYER.speed = lerp(PLAYER.speed, m, clamp(dt * 8, 0, 1));
  if (m > 0.1) { const th = Math.atan2(mx, mz); PLAYER.h += angDiff(PLAYER.h, th) * clamp(dt * 10, 0, 1); }
  const vdx = Math.sin(PLAYER.h) * PLAYER.speed, vdz = Math.cos(PLAYER.h) * PLAYER.speed;
  let nx = PLAYER.x + (m > 0.1 ? mx / m * PLAYER.speed : vdx) * dt, nz = PLAYER.z + (m > 0.1 ? mz / m * PLAYER.speed : vdz) * dt;
  // collisions: static
  const pUnder = PLAYER.low && underground(PLAYER.x, PLAYER.z, PLAYER.y);
  if (!pUnder) { COL.qy = PLAYER.y; const r = COL.resolve(nx, nz, 0.33); COL.qy = null; nx = r.x; nz = r.z; }
  // cars & parked
  for (const c of CARS) { if (Math.abs(c.x - nx) > 8 || Math.abs(c.z - nz) > 8 || !sameLevel(c.y, PLAYER.y)) continue; for (const [cx, cz, cr] of c.circles()) { const d = Math.hypot(nx - cx, nz - cz); if (d < cr + 0.33) { if (c.speed > 5.5 && c.driver) { knockPlayer(c); } const k = (cr + 0.33 - d) / (d || 1); nx += (nx - cx) * k; nz += (nz - cz) * k; } } }
  if (!pUnder) for (const s of parkedNear(nx, nz, 4)) { const fxx = Math.sin(s.h), fzz = Math.cos(s.h); for (const k of [-1.3, 0, 1.3]) { const cx = s.x + fxx * k, cz = s.z + fzz * k; const d = Math.hypot(nx - cx, nz - cz); if (d < 1.2) { const q = (1.2 - d) / (d || 1); nx += (nx - cx) * q; nz += (nz - cz) * q; } } }
  if (TRAM.circ && !pUnder) for (const [cx, cz, cr] of TRAM.circ) { const d = Math.hypot(nx - cx, nz - cz); if (d < cr + 0.35) { if (TRAM.wait <= 0) knockPlayer({ vx: 0, vz: 0, speed: 10 }); const q = (cr + 0.35 - d) / (d || 1); nx += (nx - cx) * q; nz += (nz - cz) * q; } }
  if (!PLAYER.interior) { nx = clamp(nx, WORLD.x0, WORLD.x1); nz = clamp(nz, WORLD.z0, WORLD.z1); }
  // elevated walkways (Pasarela de Padre Anchieta): stay on deck, handrails stop you falling
  const dNew = deckAt(nx, nz, PLAYER.y); const tNew = heightAt(nx, nz) + 0.17;
  if (PLAYER.onDeck && dNew < -1e8 && PLAYER.y > tNew + 1.5) { nx = PLAYER.x; nz = PLAYER.z; }
  let lw = PLAYER.interior ? null : lowAt(nx, nz, PLAYER.y);
  // underground (tunnels, car parks): you can't walk through the walls up to the surface
  if (!lw && PLAYER.low && !PLAYER.interior && heightAt(nx, nz) - PLAYER.y > 0.8) { nx = PLAYER.x; nz = PLAYER.z; lw = lowAt(nx, nz, PLAYER.y); }
  if (lw && !PLAYER.interior && typeof ugcPush === 'function') { const q = ugcPush(nx, nz, 0.35); nx = q[0]; nz = q[1]; } if (!lw && !PLAYER.interior && TCUTS.length) { const tp = trenchPush(nx, nz, 0.35); if (tp) { nx += tp[0]; nz += tp[1]; } } PLAYER.low = lw;
  if (lw) { const lim = Math.max(0.3, lw.hw - 0.35); if (lw.d > lim && lw.d > 0.01) { const k = lim / lw.d; nx = lw.px + (nx - lw.px) * k; nz = lw.pz + (nz - lw.pz) * k; } }
  PLAYER.x = nx; PLAYER.z = nz;
  const dk = deckAt(nx, nz, PLAYER.y); PLAYER.onDeck = dk > -1e8 && dk > heightAt(nx, nz) + 0.5;
  const gy = PLAYER.interior ? PLAYER.interior.floor + 0.02 : lw ? lw.y : Math.max(heightAt(nx, nz) + 0.17, dk);
  if ((pressed('Space') || (gp && gp.down(1)) || INPUT.touch.jump) && PLAYER.onGround) { PLAYER.vy = 5.3; PLAYER.onGround = false; INPUT.touch.jump = false; AUDIO.jump(); }
  PLAYER.vy -= 16 * dt; PLAYER.y += PLAYER.vy * dt;
  if (PLAYER.y <= gy) { PLAYER.y = gy; if (!PLAYER.onGround) { AUDIO.land(-PLAYER.vy); PLAYER.stepD = 0; } PLAYER.vy = 0; PLAYER.onGround = true; }
  const prevPhase = playerHuman.phase;
  animHuman(playerHuman, dt, PLAYER.speed, PLAYER.onGround ? 'ground' : 'air');
  // ground surface + acoustic space (used by footsteps and landing)
  PLAYER.surface = PLAYER.interior ? 'tile' : PLAYER.low ? 'hard' : !onAnyPaved(PLAYER.x, PLAYER.z, 2.5) ? 'soft' : isHistoric(PLAYER.x, PLAYER.z) ? 'stone' : 'hard';
  STEPS.setSpace(PLAYER.interior ? 'room' : PLAYER.low && heightAt(PLAYER.x, PLAYER.z) - PLAYER.y > 3 ? 'tunnel' : '');
  playerHuman.root.position.set(PLAYER.x, PLAYER.y, PLAYER.z); playerHuman.root.rotation.y = PLAYER.h;
  // footsteps synced to the real foot contacts of the animation (fallback: by distance walked)
  const moving = PLAYER.onGround && PLAYER.speed > 0.4 && !PLAYER.car; const gait = PLAYER.speed > 4.2 ? 'run' : 'walk';
  if (playerHuman.skinned) { footContacts(playerHuman, dt, (sd) => { AUDIO.footstep(gait === 'run', false, PLAYER.surface, PLAYER.speed > 6 ? 1.25 : PLAYER.speed < 2.5 ? 0.8 : 1); if (window.__STEPLOG) __STEPLOG.push([performance.now(), sd]); }, moving && PLAYER.down <= 0); }
  else if (moving) { PLAYER.stepD = (PLAYER.stepD || 0) + PLAYER.speed * dt; const stride = gait === 'run' ? 1.15 : 0.75; if (PLAYER.stepD >= stride) { PLAYER.stepD -= stride; AUDIO.footstep(gait === 'run', false, PLAYER.surface); } }
}
function knockPlayer(c) {
  if (PLAYER.down > 0) return; PLAYER.down = 2.2; PLAYER.health -= clamp(c.speed * 2.2, 8, 60); AUDIO.crash(8); CAM.shake = 0.6;
  if (PLAYER.health <= 0) GAME.wasted();
}

function updateCamera(dt) {
  const gp = INPUT.gp;
  let mdx = INPUT.mdx, mdy = INPUT.mdy; INPUT.mdx = INPUT.mdy = 0;
  if (gp) { mdx += gp.rx * 900 * dt; mdy += gp.ry * 600 * dt; if (gp.rx || gp.ry) INPUT.lastMouse = performance.now(); }
  if (INPUT.touch.look[0] || INPUT.touch.look[1]) { mdx += INPUT.touch.look[0]; mdy += INPUT.touch.look[1]; INPUT.touch.look = [0, 0]; INPUT.lastMouse = performance.now(); }
  const sens = SETTINGS.sens;
  CAM.yaw -= mdx * 0.0023 * sens; CAM.pitch = clamp(CAM.pitch + mdy * 0.0018 * sens * (SETTINGS.invertY ? -1 : 1), -0.5, 1.2);
  if (INPUT.wheel) { CAM.dist = clamp(CAM.dist + INPUT.wheel * 0.5, 2.2, 14); INPUT.wheel = 0; }
  let tx, ty, tz, dist;
  if (PLAYER.car) {
    const car = PLAYER.car; tx = car.x; ty = car.y + 1.25 + Math.max(0, car.T.H - 1.5) * 0.85; tz = car.z;
    dist = (car.type === 'bus' ? 12 : car.type === 'moto' ? 4.2 : 5.3 + Math.max(0, car.T.L - 4.6) * 0.9) + CAM.dist * 0.3 + clamp(car.speed * 0.035, 0, 1.6);
    if (performance.now() - INPUT.lastMouse > 1300 && (car.speed > 2)) {
      const moveYaw = car.fwdV >= -0.5 ? Math.atan2(car.vx, car.vz) : car.h;
      CAM.yaw += angDiff(CAM.yaw, car.speed > 3 ? moveYaw : car.h) * clamp(dt * 2.5, 0, 1);
      CAM.pitch = lerp(CAM.pitch, 0.18, dt * 1.5);
    }
    CAM.fov = lerp(CAM.fov, 62 + clamp(car.speed - 15, 0, 35) * 0.35, dt * 2);
  } else {
    tx = PLAYER.x; ty = PLAYER.y + 1.55; tz = PLAYER.z; dist = WEAPON.aiming ? 1.9 : CAM.dist; CAM.fov = lerp(CAM.fov, WEAPON.aiming ? 48 : 60, dt * 6);
  }
  const cp = Math.cos(CAM.pitch), sp = Math.sin(CAM.pitch);
  let bx = -Math.sin(CAM.yaw) * cp, bz = -Math.cos(CAM.yaw) * cp;
  const shoulder = PLAYER.car ? 0 : WEAPON.aiming ? 0.75 : 0.45; const rx = -Math.cos(CAM.yaw), rz = Math.sin(CAM.yaw);
  const ox = tx + rx * shoulder, oz = tz + rz * shoulder;
  let cx = ox + bx * dist, cy = ty + sp * dist, cz = oz + bz * dist;
  // collision with buildings
  const t = COL.raycast(tx, tz, cx, cz);
  if (t < 1) { const k = Math.max(1.4 / dist, t - 0.4 / dist); cx = tx + (cx - tx) * k; cz = tz + (cz - tz) * k; cy = ty + (cy - ty) * Math.max(k, 0.4) + (1 - k) * 1.6; }
  const low = PLAYER.car ? PLAYER.car.low : PLAYER.low;
  if (low && !PLAYER.interior) {
    // inside a tunnel / cutting: keep the camera within the tube
    const refY = PLAYER.car ? PLAYER.car.y : PLAYER.y;
    for (let k = 1; k > 0.1; k -= 0.12) { const qx = tx + (cx - tx) * k, qz = tz + (cz - tz) * k; const l2 = lowAt(qx, qz, refY); if (l2 && l2.d < l2.hw + 0.2) { cx = qx; cz = qz; break; } if (k - 0.12 <= 0.1) { cx = tx + (cx - tx) * 0.15; cz = tz + (cz - tz) * 0.15; } }
    cy = Math.max(cy, low.y + 0.8); if (low.covered) cy = Math.min(cy, low.y + (low.ceil || 4.6));
  } else cy = Math.max(cy, PLAYER.interior ? PLAYER.interior.floor + 0.5 : heightAt(cx, cz) + 0.6);
  if (PLAYER.interior) { cy = Math.min(cy, PLAYER.interior.ceil - 0.3); }
  if (PLAYER.onDeck) cy = Math.max(cy, PLAYER.y + 1.2);
  if (PLAYER.car && PLAYER.car.onDeck) cy = Math.max(cy, PLAYER.car.y + 1.0);
  CAM.pos.set(cx, cy, cz);
  if (CAM.shake > 0) { CAM.pos.x += (Math.random() - 0.5) * CAM.shake * 0.4; CAM.pos.y += (Math.random() - 0.5) * CAM.shake * 0.4; CAM.shake = Math.max(0, CAM.shake - dt * 2); }
  camera.position.copy(CAM.pos); camera.lookAt(ox, ty + (PLAYER.car ? 0.2 : 0), oz);
  if (Math.abs(camera.fov - CAM.fov) > 0.05) { camera.fov = CAM.fov; camera.updateProjectionMatrix(); bgCamera.fov = CAM.fov; bgCamera.updateProjectionMatrix(); }
  bgCamera.position.copy(camera.position); bgCamera.quaternion.copy(camera.quaternion);
}
