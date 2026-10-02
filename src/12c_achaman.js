// ============ Modo ACHAMÁN: god mode to fly over La Laguna (no game, just sightseeing) — chosen from the start menu ============
const ACH = { on: false, x: 0, y: 0, z: 0, yaw: 0, pitch: -0.25, mode: 'libre', orbit: { cx: 0, cz: 0, r: 120, a: 0, h: 80 }, saved: null, speed: 1 };
const ACH_MODES = ['libre', 'dron', 'cenital'];
function achamanStart() {
  AUDIO.init(); $('menu').style.display = 'none';
  ACH.saved = { x: PLAYER.x, z: PLAYER.z, y: PLAYER.y, h: PLAYER.h };
  ACH.on = true; ACH.mode = 'libre'; ACH.x = camera.position.x; ACH.y = camera.position.y; ACH.z = camera.position.z;
  const d = new THREE.Vector3(); camera.getWorldDirection(d); ACH.yaw = Math.atan2(d.x, d.z); ACH.pitch = Math.asin(clamp(d.y, -0.99, 0.99));
  playerHuman.root.visible = false; GAME.state = 'achaman'; document.body.classList.add('achaman'); $('achHud').style.display = 'block';
  achSetMode('libre'); HUD.big('MODO ACHAMÁN', '#f5b72e', 3.5);
  achLock();
}
function achLock() { if (document.body.classList.contains('touchmode')) return; const el = renderer.domElement; try { const p = el.requestPointerLock(); if (p && p.catch) p.catch(() => { }); } catch (e) { } }
function achamanEnd() {
  ACH.on = false; GAME.state = 'menu'; document.body.classList.remove('achaman'); $('achHud').style.display = 'none'; document.exitPointerLock?.();
  const s = ACH.saved; if (s) { PLAYER.x = s.x; PLAYER.z = s.z; PLAYER.y = s.y; PLAYER.h = s.h; } playerHuman.root.visible = true;
  $('menu').style.display = 'flex';
}
function achSetMode(m) {
  ACH.mode = m; $('achMode').textContent = { libre: 'VUELO LIBRE', dron: 'DRON (órbita)', cenital: 'CENITAL' }[m];
  if (m === 'dron') { // orbit around the point you are looking at
    const d = new THREE.Vector3(); camera.getWorldDirection(d); let t = 60; if (d.y < -0.05) t = clamp((ACH.y - heightAt(ACH.x, ACH.z)) / -d.y, 20, 400);
    const cx = ACH.x + d.x * t, cz = ACH.z + d.z * t; ACH.orbit = { cx, cz, r: Math.max(40, Math.hypot(ACH.x - cx, ACH.z - cz)), a: Math.atan2(ACH.x - cx, ACH.z - cz), h: Math.max(25, ACH.y - heightAt(cx, cz)) };
  }
  if (m === 'cenital') { ACH.y = Math.max(ACH.y, heightAt(ACH.x, ACH.z) + 140); }
}
function updateAchaman(dt) {
  if (pressed('KeyM')) BIGMAP.toggle();
  if (BIGMAP.open) { if (pressed('KeyT')) BIGMAP.teleport(); if (pressed('Escape')) BIGMAP.toggle(); if (frame % 10 === 0) BIGMAP.redraw(); INPUT.mdx = INPUT.mdy = 0; return; }
  // look
  let mdx = INPUT.mdx, mdy = INPUT.mdy; INPUT.mdx = INPUT.mdy = 0;
  if (INPUT.touch.look[0] || INPUT.touch.look[1]) { mdx += INPUT.touch.look[0]; mdy += INPUT.touch.look[1]; INPUT.touch.look = [0, 0]; }
  const sens = SETTINGS.sens || 1;
  if (pressed('KeyV')) achSetMode(ACH_MODES[(ACH_MODES.indexOf(ACH.mode) + 1) % 3]);
  if (pressed('Escape', 'KeyP')) { achamanEnd(); return; }
  const fast = key('ShiftLeft', 'ShiftRight') || ACH.boost ? 4 : 1;
  let ix = 0, iz = 0; if (key('KeyW', 'ArrowUp')) iz += 1; if (key('KeyS', 'ArrowDown')) iz -= 1; if (key('KeyA', 'ArrowLeft')) ix -= 1; if (key('KeyD', 'ArrowRight')) ix += 1;
  if (INPUT.touch.active) { ix += INPUT.touch.x; iz -= INPUT.touch.y; }
  let iy = (key('KeyE', 'Space') || ACH.up ? 1 : 0) - (key('KeyQ', 'ControlLeft', 'KeyC') || ACH.down ? 1 : 0);
  if (INPUT.wheel) { iy -= INPUT.wheel * 3; INPUT.wheel = 0; }
  const g = heightAt(ACH.x, ACH.z);
  if (ACH.mode === 'libre') {
    ACH.yaw -= mdx * 0.0023 * sens; ACH.pitch = clamp(ACH.pitch - mdy * 0.0018 * sens * (SETTINGS.invertY ? -1 : 1), -1.45, 1.2);
    const sp = 22 * fast * (1 + Math.max(0, ACH.y - g) / 120); const fx = Math.sin(ACH.yaw), fz = Math.cos(ACH.yaw);
    ACH.x += (fx * iz - fz * ix) * sp * dt; ACH.z += (fz * iz + fx * ix) * sp * dt; ACH.y += iy * sp * 0.7 * dt;
    // fly along the view direction when pitched (W goes where you look)
    ACH.y += Math.sin(ACH.pitch) * iz * sp * dt * 0.8;
    ACH.y = clamp(ACH.y, heightAt(ACH.x, ACH.z) + 1.6, 1800);
    camera.position.set(ACH.x, ACH.y, ACH.z); camera.lookAt(ACH.x + Math.sin(ACH.yaw) * Math.cos(ACH.pitch), ACH.y + Math.sin(ACH.pitch), ACH.z + Math.cos(ACH.yaw) * Math.cos(ACH.pitch));
  } else if (ACH.mode === 'dron') {
    const o = ACH.orbit; o.a += dt * 0.12 - mdx * 0.002; o.h = clamp(o.h + iy * 25 * dt * fast + mdy * 0.08, 8, 600); o.r = clamp(o.r - iz * 30 * dt * fast, 15, 900);
    const fx = Math.sin(o.a + Math.PI / 2), fz = Math.cos(o.a + Math.PI / 2); o.cx += fx * ix * 25 * dt * fast; o.cz += fz * ix * 25 * dt * fast;
    ACH.x = o.cx + Math.sin(o.a) * o.r; ACH.z = o.cz + Math.cos(o.a) * o.r; const gc = heightAt(o.cx, o.cz); ACH.y = Math.max(gc + o.h, heightAt(ACH.x, ACH.z) + 3);
    camera.position.set(ACH.x, ACH.y, ACH.z); camera.lookAt(o.cx, gc + 4, o.cz); const d = new THREE.Vector3(); camera.getWorldDirection(d); ACH.yaw = Math.atan2(d.x, d.z); ACH.pitch = Math.asin(clamp(d.y, -0.99, 0.99));
  } else { // cenital: straight down, north up
    const sp = 40 * fast * (ACH.y - g) / 150; ACH.x += ix * sp * dt; ACH.z -= iz * sp * dt; ACH.y = clamp(ACH.y + (iy * 60 * fast + mdy * 0.3) * dt * (iy ? 1 : 0) + (iy ? 0 : mdy * 0.3), g + 25, 2500);
    camera.position.set(ACH.x, ACH.y, ACH.z); camera.up.set(0, 0, -1); camera.lookAt(ACH.x, g, ACH.z); camera.up.set(0, 1, 0);
  }
  if (Math.abs(camera.fov - 62) > 0.05) { camera.fov = 62; camera.updateProjectionMatrix(); }
  bgCamera.position.copy(camera.position); bgCamera.quaternion.copy(camera.quaternion); bgCamera.fov = camera.fov; bgCamera.updateProjectionMatrix();
  // the world follows the camera (traffic, people, street names, minimap)
  PLAYER.x = ACH.x; PLAYER.z = ACH.z; PLAYER.y = g; CAM.yaw = ACH.yaw + Math.PI;
  const alt = Math.round(ACH.y - g); $('achAlt').textContent = alt + ' m';
}
function setupAchaman() {
  $('bAch').addEventListener('click', achamanStart);
  const tap = (id, down, up) => { const b = $(id); if (!b) return; b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); down(); }); if (up) { b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up); } };
  tap('achUp', () => (ACH.up = true), () => (ACH.up = false)); tap('achDown', () => (ACH.down = true), () => (ACH.down = false));
  tap('achFast', () => (ACH.boost = !ACH.boost)); tap('achView', () => achSetMode(ACH_MODES[(ACH_MODES.indexOf(ACH.mode) + 1) % 3])); tap('achExit', achamanEnd); tap('achMap', () => BIGMAP.toggle());
  renderer.domElement.addEventListener('click', () => { if (GAME.state === 'achaman') achLock(); });
}
