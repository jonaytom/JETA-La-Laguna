// ============ time of day, game loop, menus ============
const GAME = {
  state: 'loading', tod: 10.0, daySpeed: 1 / 150, // game hours per real second: day 1h = 150 s, night goes faster (see dayRate)
  lock() { if (GAME.state !== 'play') return; const el = renderer.domElement; if (document.pointerLockElement !== el && !document.body.classList.contains('touchmode')) { try { const p = el.requestPointerLock(); if (p && p.catch) p.catch(() => { }); } catch (e) { } } },
  pause(on) {
    if (on && GAME.state === 'play') { GAME.state = 'pause'; $('pause').style.display = 'flex'; document.exitPointerLock?.(); syncPauseUI(); }
    else if (!on && GAME.state === 'pause') { GAME.state = 'play'; $('pause').style.display = 'none'; GAME.lock(); }
  },
  respawn(x, z, text, color, cost) {
    GAME.state = 'cutscene'; $('fade').style.opacity = 1; HUD.big(text, color, 4);
    GAME.deadT = performance.now(); const finish = () => {
      if (!PLAYER.dead) return;
      // every step guarded: whatever goes wrong, you always come back to life and can play
      const T = (f) => { try { f(); } catch (e) { console.error('respawn', e); } };
      T(() => { if (PLAYER.car) { const c = PLAYER.car; try { exitCar(); } catch (e) { PLAYER.car = null; } c.driver = null; } PLAYER.car = null; });
      T(() => WANTED.reset());
      PLAYER.health = 100; PLAYER.down = 0; PLAYER.money = Math.max(0, PLAYER.money - cost); PLAYER.dead = false; PLAYER.interior = null; PLAYER.low = null; PLAYER.vy = 0; PLAYER.onGround = true; PLAYER.onDeck = false;
      T(() => { [x, z] = safeSpot(x, z); const r = COL.resolve(x, z, 0.4); PLAYER.x = r.x; PLAYER.z = r.z; PLAYER.y = heightAt(r.x, r.z) + 0.2; });
      T(() => { playerHuman.root.visible = true; WEAPON.aiming = false; FIGHT.cd = 2; });
      T(() => { if (window.__TALK) window.__TALK.cur = null; $('sub').classList.remove('talking'); if (DLG.open) DLG.hide(); });
      T(() => MISSIONS.fail('Has perdido el encargo.'));
      $('fade').style.opacity = 0; if (GAME.state === 'cutscene' || GAME.state === 'dialog') GAME.state = 'play'; HUD.toast(cost ? '-$' + cost : 'Vuelves a empezar', '#ffb3b3'); GAME.lock(); PLAYER.safeT = 4;
    }; GAME._respawnFinish = finish; setTimeout(finish, 3200);
  },
  // dying: back where the story starts (El Blanco's street), $100 less; finished missions stay finished
  wasted() { if (GAME.state !== 'play') return; PLAYER.dead = true; const st = (typeof NPC !== 'undefined' && NPC.blanco && NPC.blanco.home) || [PLAZA.x - 8, PLAZA.z + 20]; GAME.respawn(st[0] + 6, st[1] + 4, 'HAS MUERTO', '#e04848', Math.min(100, PLAYER.money)); },
  busted() { if (GAME.state !== 'play') return; PLAYER.dead = true; const p = DATA.P.find((p) => STR[p[0]] === 'Policia Municipal'); GAME.respawn(p ? p[2] : 85, p ? p[3] + 6 : 90, '¡TE PILLARON!', '#6fa8ff', WANTED.fine || 250); },
};

// ---------- time of day & weather
const cZen = new THREE.Color(), cHor = new THREE.Color(), tmpC = new THREE.Color();
const PAL_SKY = [ // [sinElev, zenith, horizon, sunColor]
  [-0.3, 0x02050b, 0x0b1220, 0x223355],
  [-0.08, 0x0b1428, 0x2a2c3e, 0x3a4466],
  [0.0, 0x2c3f6a, 0xe7926a, 0xff7a3a],
  [0.12, 0x3f6aa6, 0xf0c49a, 0xffb070],
  [0.35, 0x4a82c4, 0xc8d8e4, 0xfff0d8],
  [1.0, 0x3a78c0, 0xbfd2e2, 0xfff6ea],
];
let pmrem = null, envT = 0, lastEnvKey = ''; const ENVC = new Map();
// environment maps: one per 1.5 h of day (and weather), made once and reused instead of regenerating the PMREM in the
// middle of play every time the hour changes (audit P1.6); precomputeEnv() fills the day while the game loads
const envKey = (t) => SETTINGS.weather + '|' + (Math.round(t / 1.5) % 16);
function updateEnvironment(force) {
  if (!pmrem) { pmrem = new THREE.PMREMGenerator(renderer); }
  const k = envKey(GAME.tod); if (!force && k === lastEnvKey) return; lastEnvKey = k;
  let rt = ENVC.get(k); if (!rt) { rt = pmrem.fromScene(bgScene, 0, 50, 90000); ENVC.set(k, rt); } scene.environment = rt.texture;
}
function precomputeEnv() {
  if (!pmrem) pmrem = new THREE.PMREMGenerator(renderer); const t0 = GAME.tod;
  for (let b = 0; b < 16; b++) { GAME.tod = b * 1.5; updateSun(); const k = envKey(GAME.tod); if (!ENVC.has(k)) ENVC.set(k, pmrem.fromScene(bgScene, 0, 50, 90000)); }
  GAME.tod = t0; updateSun(); updateEnvironment(true);
}
const _sunDir = new THREE.Vector3(), _sunCol = new THREE.Color(), _grey = new THREE.Color(), _grey2 = new THREE.Color(), _ldir = new THREE.Vector3(), _moonDir = new THREE.Vector3(-0.3, 0.8, 0.4).normalize();
function updateSun() {
  const t = GAME.tod; const el = Math.sin(Math.PI * (t - 7.9) / (20.1 - 7.9)) * (62 * Math.PI / 180);
  const az = (90 + 180 * (t - 7.9) / (20.1 - 7.9)) * Math.PI / 180;
  const se = Math.sin(el);
  const dir = _sunDir.set(Math.sin(az) * Math.cos(el), se, -Math.cos(az) * Math.cos(el)).normalize(); /* temporaries, no garbage (audit P1.3) */
  // palette interpolation
  let i = 0; while (i < PAL_SKY.length - 2 && se > PAL_SKY[i + 1][0]) i++;
  const a = PAL_SKY[i], b = PAL_SKY[i + 1]; const k = clamp((se - a[0]) / (b[0] - a[0]), 0, 1);
  cZen.set(a[1]).lerp(tmpC.set(b[1]), k); cHor.set(a[2]).lerp(tmpC.set(b[2]), k); const sunCol = _sunCol.set(a[3]).lerp(tmpC.set(b[3]), k);
  const w = SETTINGS.weather; const overcast = w === 1 ? 0.75 : w === 2 ? 0.9 : 0;
  const grey = _grey.set(0x9aa3aa).multiplyScalar(clamp(se * 3 + 0.25, 0.08, 1));
  cZen.lerp(grey, overcast * 0.8); cHor.lerp(_grey2.copy(grey).multiplyScalar(1.1), overcast * 0.7);
  const night = smooth(0.06, -0.12, se); U.uNight.value = night;
  SKY.mat.uniforms.sunDir.value.copy(dir); SKY.mat.uniforms.zen.value.copy(cZen); SKY.mat.uniforms.hor.value.copy(cHor);
  SKY.mat.uniforms.uCloud.value = w === 0 ? 0.42 : w === 1 ? 0.97 : 1.0;
  // lights
  const dayI = smooth(-0.04, 0.25, se);
  const moon = night > 0.5;
  const ldir = _ldir.copy(moon ? _moonDir : dir);
  sun.color.copy(moon ? tmpC.set(0x8fa6d8) : sunCol);
  sun.intensity = moon ? 0.35 : 2.9 * dayI * (1 - overcast * 0.75) + 0.05;
  hemi.color.copy(cZen).lerp(tmpC.set(0xffffff), 0.35); hemi.groundColor.set(0x5b5140).multiplyScalar(0.3 + dayI * 0.7);
  hemi.intensity = 0.25 + dayI * (0.75 + overcast * 0.5);
  if (SKY.ring) SKY.ring.material.color.setScalar(0.18 + dayI * 0.72 * (1 - overcast * 0.3));
  bgSun.color.copy(sun.color); bgSun.intensity = sun.intensity * 0.9; bgSun.position.copy(ldir).multiplyScalar(1000); bgHemi.intensity = hemi.intensity; bgHemi.color.copy(hemi.color);
  // fog
  const fogCol = cHor.clone().lerp(cZen, 0.15);
  scene.fog.color.copy(fogCol); bgScene.fog.color.copy(fogCol);
  scene.fog.far = w === 2 ? 230 : w === 1 ? Q.far * 0.8 : Q.far; scene.fog.near = w === 2 ? 15 : 90;
  bgScene.fog.near = w === 2 ? 300 : w === 1 ? 1000 : 1400; bgScene.fog.far = w === 2 ? 900 : w === 1 ? 12000 : 22000;
  renderer.toneMappingExposure = 1.0 + night * 0.35;
  if (PLAYER.interior) { hemi.color.set(0xfff6ea); hemi.groundColor.set(0x8a8478); hemi.intensity = 1.25; sun.intensity = 0.9; sun.color.set(0xffffff); renderer.toneMappingExposure = 1.05; }
  // shadows follow the player
  const px = PLAYER.x, pz = PLAYER.z, py = PLAYER.y; const snap = 2;
  sun.target.position.set(Math.round(px / snap) * snap, py, Math.round(pz / snap) * snap);
  sun.position.copy(sun.target.position).addScaledVector(ldir, 320);
  sun.castShadow = Q.shadow > 0 && sun.intensity > 0.3;
  // street lights & car lamps
  for (const m of SIGN.mats) m.emissiveIntensity = night * 0.85; lampHeadMat.emissiveIntensity = night * 2.5 + overcast * 0.2 * (1 - night); lampPoolMat.opacity = night * 0.55;
  headMat.emissiveIntensity = 0.2 + night * 3 + (w === 2 ? 1.5 : 0); tailMat.emissiveIntensity = 0.3 + night * 1.2;
}
// player headlights at night
const headSpot = new THREE.SpotLight(0xfff1d0, 0, 60, 0.55, 0.5, 1.2); headSpot.castShadow = false; scene.add(headSpot); scene.add(headSpot.target);

// ---------- pause UI wiring
function syncPauseUI() {
  document.querySelectorAll('#segQ button').forEach((b) => b.classList.toggle('on', b.dataset.q === qName));
  document.querySelectorAll('#segW button').forEach((b) => b.classList.toggle('on', +b.dataset.w === SETTINGS.weather));
  document.querySelectorAll('#segInv button').forEach((b) => b.classList.toggle('on', +b.dataset.v === (SETTINGS.invertY ? 1 : 0)));
  $('tod').value = GAME.tod; $('sens').value = SETTINGS.sens; $('vol').value = AUDIO.A.vol;
}
let pendingQ = qName;
document.querySelectorAll('#segQ button').forEach((b) => b.addEventListener('click', () => { pendingQ = b.dataset.q; document.querySelectorAll('#segQ button').forEach((x) => x.classList.toggle('on', x === b)); try { localStorage.setItem(QKEY, pendingQ); } catch (e) { } }));
document.querySelectorAll('#segW button').forEach((b) => b.addEventListener('click', () => { SETTINGS.weather = +b.dataset.w; saveSettings(); syncPauseUI(); updateSun(); updateEnvironment(true); }));
document.querySelectorAll('#segInv button').forEach((b) => b.addEventListener('click', () => { SETTINGS.invertY = b.dataset.v === '1'; saveSettings(); syncPauseUI(); }));
$('tod').addEventListener('input', (e) => { GAME.tod = +e.target.value; updateSun(); updateEnvironment(true); });
$('sens').addEventListener('input', (e) => { SETTINGS.sens = +e.target.value; saveSettings(); });
$('vol').addEventListener('input', (e) => AUDIO.setVol(+e.target.value));
$('mvol').value = SETTINGS.music ?? 1; $('mvol').addEventListener('input', (e) => { SETTINGS.music = +e.target.value; saveSettings(); MUSIC.setVol(); });
$('bResume').addEventListener('click', () => GAME.pause(false));
for (const id of ['bCtl', 'bCtl2']) { const b = $(id); if (b) b.addEventListener('click', (e) => { e.stopPropagation(); CONTROLS.open(); }); }
$('bReload').addEventListener('click', () => { try { localStorage.setItem(QKEY, pendingQ); } catch (e) { } location.reload(); });
$('bOpts').addEventListener('click', () => { $('menu').style.display = 'none'; GAME.state = 'play'; GAME.pause(true); AUDIO.init(); });
function goLandscape() { if (!document.body.classList.contains('touchmode')) return; try { const el = document.documentElement; const p = el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'hide' }) : el.webkitRequestFullscreen && el.webkitRequestFullscreen(); const lock = () => { try { screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => { }); } catch (e) { } }; if (p && p.then) p.then(lock, lock); else lock(); } catch (e) { } }
$('rotate').addEventListener('click', goLandscape);
$('bPlay').addEventListener('click', () => { goLandscape(); AUDIO.init(); $('menu').style.display = 'none'; GAME.state = 'play'; GAME.lock(); HUD.big('SANTI «EL CHOPA»', '#f5b72e', 4); HUD.toast('Recién salido de la cárcel, el Chopa vuelve a su barrio de La Laguna. Habla con Ruymán «El Blanco» (círculo amarillo)', '#f5b72e', 8); });
renderer.domElement.addEventListener('click', () => GAME.lock());
document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement && GAME.state === 'play' && !BIGMAP.open && !document.body.classList.contains('touchmode')) GAME.pause(true); });

// ---------- loop
let last = performance.now(), acc2 = 0, frame = 0, trafficT = 0;
const PROF = {}; window.__prof = PROF; const pm = (k, t0) => { PROF[k] = (PROF[k] || 0) * 0.9 + (performance.now() - t0) * 0.1; };
function loop() {
  requestAnimationFrame(loop); if (window.__manual) return;
  const now = performance.now(); let dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (GAME.state === 'fight2d') return; // the 2D fight draws itself
  logic(dt, now); render(); adaptRes(now);
}
// dynamic resolution: keep the frame rate playable (mainly on phones)
const DYN = { pr: renderer.getPixelRatio(), max: renderer.getPixelRatio(), ms: 16, t: 0, min: IS_TOUCH ? 0.5 : 0.75 };
function adaptRes(now) {
  const ft = now - (DYN.lastF || now); DYN.lastF = now; if (ft <= 0 || ft > 200) return; DYN.ms = DYN.ms * 0.95 + ft * 0.05;
  if (now - DYN.t < 2000 || GAME.state !== 'play') return; DYN.t = now;
  let p = DYN.pr; if (DYN.ms > 38) p = Math.max(DYN.min, p - 0.1); else if (DYN.ms < 22) p = Math.min(DYN.max, p + 0.05);
  if (Math.abs(p - DYN.pr) > 0.01) { DYN.pr = p; renderer.setPixelRatio(p); renderer.setSize(window.innerWidth, window.innerHeight); }
}
// underground backdrop: from inside a tunnel or a cutting, any gap between walls used to show the sky and the far city
// "below" the ground; a dark earth cylinder around the camera (top just under the ground level) fills those views
const UGSKIRT = (() => { const g = new THREE.CylinderGeometry(1, 1, 1, 40, 1, true); g.translate(0, -0.5, 0); const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x2b2219, side: THREE.BackSide, fog: false })); m.frustumCulled = false; m.visible = false; m.renderOrder = -1; scene.add(m); return m; })();
function updateUnderground() { const g = heightAt(camera.position.x, camera.position.z); const under = camera.position.y < g - 1.2; UGSKIRT.visible = under; if (under) { const open = inCut(camera.position.x, camera.position.z, 1.0); /* open cutting: sky above stays; covered tube: all earth */ UGSKIRT.position.set(camera.position.x, open ? g - 0.6 : g + 60, camera.position.z); UGSKIRT.scale.set(240, 460, 240); } }
function render() { const tt = performance.now(); updateUnderground(); renderer.clear(); renderer.render(bgScene, bgCamera); renderer.clearDepth(); renderer.render(scene, camera); pm('render', tt); }
window.__step = (n, dt = 1 / 30, keys = []) => { keys.forEach((k) => KEYS.add(k)); for (let i = 0; i < n; i++) logic(dt, performance.now()); keys.forEach((k) => KEYS.delete(k)); };
window.__press = (k) => PRESSED.add(k);
function logic(dt, now) {
  if (PLAYER.dead && GAME._respawnFinish && performance.now() - (GAME.deadT || 0) > 6000) { try { GAME._respawnFinish(); } catch (e) { console.error(e); } if (PLAYER.dead) { PLAYER.dead = false; PLAYER.health = 100; GAME.state = 'play'; $('fade').style.opacity = 0; } }
  const T0 = performance.now(); let tt; frame++;
  readGamepad();
  if (GAME.state === 'play' || GAME.state === 'cutscene' || GAME.state === 'dialog') {
    if (GAME.state === 'play') {
      if (pressed('KeyM') || (INPUT.gp && INPUT.gp.down(8))) BIGMAP.toggle();
      if (pressed('KeyT') && BIGMAP.open) BIGMAP.teleport();
      if (pressed('KeyP', 'Escape') || (INPUT.gp && INPUT.gp.down(9))) { if (BIGMAP.open) BIGMAP.toggle(); else GAME.pause(true); }
    }
    if (!BIGMAP.open) {
      GAME.tod = (GAME.tod + dt * dayRate(GAME.tod)) % 24; U.uTime.value += dt;
      tt = performance.now(); if (GAME.state === 'play') { updatePlayer(dt); updateCombat(dt); try { updateBorder(dt); } catch (e) { console.error('border', e); } } pm('player', tt);
      // physics at fixed substeps
      acc2 += dt; const h = 1 / 90; let n = 0;
      while (acc2 >= h && n < 6) { for (const c of CARS) if (c.mode === 'physics') { if (!c.driver || c.crashed) { c.ctl.thr = 0; c.ctl.brk = c.driver === 'player' ? c.ctl.brk : 1; } c.physics(h); } carCollisions(); tramCollisions(); acc2 -= h; n++; }
      pm('phys', tt); tt = performance.now(); for (const c of CARS) { if (c.mode === 'traffic') updateTraffic(c, dt); c.sync(dt); }
      pm('traffic', tt); tt = performance.now(); trafficT -= dt; if (trafficT < 0) { trafficT = 0.25; manageTraffic(); updateParkedLOD(); }
      pm('manage', tt); tt = performance.now(); updateTram(dt); updatePeds(dt); pm('peds', tt); tt = performance.now(); WANTED.update(dt); if (GAME.state === 'play') updateCops(dt); MISSIONS.update(dt); pm('miss', tt);
      if (frame % 3 === 0) updateGPS();
    }
    updateCamera(dt); updateWeapons(dt); MUSIC.update(); SAVE.update(dt);
    if (frame % 2 === 0) updateSun();
    envT -= dt; if (envT < 0) { envT = 8; updateEnvironment(); }
    // player car headlights
    const pc = PLAYER.car; headSpot.intensity = pc && U.uNight.value > 0.3 ? 60 : 0;
    if (pc) { const fx = Math.sin(pc.h), fz = Math.cos(pc.h); headSpot.position.set(pc.x + fx * 2, pc.y + 0.8, pc.z + fz * 2); headSpot.target.position.set(pc.x + fx * 20, pc.y - 1, pc.z + fz * 20); }
    tt = performance.now(); AUDIO.update(dt); AMBIENCE.update(dt); HUD.update(dt); pm('hud', tt);
    if (BIGMAP.open && frame % 10 === 0) BIGMAP.redraw();
  } else if (GAME.state === 'achaman') {
    GAME.tod = (GAME.tod + dt * dayRate(GAME.tod)) % 24; U.uTime.value += dt;
    updateAchaman(dt);
    if (GAME.state === 'achaman') {
      acc2 += dt; const h = 1 / 90; let n = 0;
      while (acc2 >= h && n < 6) { for (const c of CARS) if (c.mode === 'physics') { c.ctl.thr = 0; c.ctl.brk = 1; c.physics(h); } carCollisions(); acc2 -= h; n++; }
      for (const c of CARS) { if (c.mode === 'traffic') updateTraffic(c, dt); c.sync(dt); }
      trafficT -= dt; if (trafficT < 0) { trafficT = 0.25; manageTraffic(); updateParkedLOD(); }
      updateTram(dt); updatePeds(dt); if (frame % 2 === 0) updateSun(); envT -= dt; if (envT < 0) { envT = 8; updateEnvironment(); }
      AUDIO.update(dt); HUD.update(dt);
    }
  } else if (GAME.state === 'menu') {
    // attract mode: slow orbit around the plaza
    const t = now / 1000 * 0.05; CAM.yaw = t * 2; const cx = PLAZA.x - 80, cz = PLAZA.z - 60;
    camera.position.set(PLAZA.x + Math.sin(t) * 140, heightAt(PLAZA.x, PLAZA.z) + 55, PLAZA.z + Math.cos(t) * 140); camera.lookAt(PLAZA.x - 150, heightAt(PLAZA.x, PLAZA.z) + 5, PLAZA.z - 90);
    bgCamera.position.copy(camera.position); bgCamera.quaternion.copy(camera.quaternion);
    for (const c of CARS) { if (c.mode === 'traffic') updateTraffic(c, dt); c.sync(dt); }
    updateTram(dt); if (frame % 2 === 0) updateSun();
  }
  PRESSED.clear();
  pm('js', T0);
}
function tramCollisions() {
  if (!TRAM.circ) return;
  for (const c of CARS) { if (c.mode !== 'physics') continue; for (const [tx, tz, tr] of TRAM.circ) { if (Math.abs(tx - c.x) > 10 || Math.abs(tz - c.z) > 10) continue; for (const [cx, cz, cr] of c.circles()) { const dx = cx - tx, dz = cz - tz, d = Math.hypot(dx, dz); if (d < tr + cr && d > 1e-4) { const nx = dx / d, nz = dz / d, pen = tr + cr - d; c.x += nx * pen; c.z += nz * pen; const vn = c.vx * nx + c.vz * nz; if (vn < 0) { c.vx -= 1.4 * vn * nx; c.vz -= 1.4 * vn * nz; if (-vn > 3) c.onImpact(-vn); } } } } }
}

function buildInteriorsAll() {
  if (CAT_DOOR.ok) buildCathedralInterior([{ x: CAT_DOOR.x, z: CAT_DOOR.z, nx: CAT_DOOR.nx, nz: CAT_DOOR.nz }, CAT_DOOR.side].filter(Boolean), CAT_DOOR.ch);
  const q = (SIGN.quads || []).find((q) => q.name === 'Café Brasilito') || (SIGN.quads || []).find((q) => q.cat === 'C' && isHistoric(q.P[0], q.P[1]));
  if (q) { const dx = q.P[0] - q.U[0] * 1.8, dz = q.P[1] - q.U[1] * 1.8; const bld = BUILD.find((b) => pip(dx - q.N[0] * 1.5, dz - q.N[1] * 1.5, b.pts.flat())) || BUILD.reduce((a, b) => (Math.hypot(b.cx - dx, b.cz - dz) < Math.hypot(a.cx - dx, a.cz - dz) ? b : a)); buildCafeInterior({ x: dx + q.N[0] * 0.02, z: dz + q.N[1] * 0.02, nx: q.N[0], nz: q.N[1] }, q.name, bld); }
  if (typeof buildCommercialInteriors === 'function') buildCommercialInteriors();
  console.log('halls', buildSportsHalls());
}
// long days, short nights: daylight (8:00-20:00) 1 game hour = 150 s (~30 min of day), night 1 hour = 40 s (~8 min)
function dayRate(t) { const day = t >= 7.6 && t < 20.4; return day ? 1 / 150 : 1 / 40; }
// ---------- boot
async function boot() {
  const steps = [
    ['Modelando el relieve de Aguere…', () => { prepUndergroundAreas(); buildTerrain(); }],
    ['Levantando casas del casco histórico…', buildBuildings],
    ['Asfaltando calles y empedrando peatonales…', () => { buildRoads(); buildMedians(); buildCarParks(); finalizeCuts(); }],
    ['Colocando la Catedral y la torre de La Concepción…', buildLandmarks],
    ['Pintando aparcamientos y abriendo grandes superficies…', () => { buildParkingLots(); buildBigStores(); }],
    ['Colgando los rótulos de las tiendas…', () => { const n = buildSigns(); console.log('signs', n); console.log('props', JSON.stringify(buildStreetProps())); }],
    ['Abriendo puertas: Catedral, cafetería, hipermercado…', () => { buildInteriorsAll(); }],
    ['Plantando laureles de Indias…', () => { scatterTrees(); buildPlazasParks(); buildTrees(); }],
    ['Encendiendo farolas…', () => { buildLamps(); buildTramPoles(); buildRoofProps(); buildPlazaProps(); console.log('tram stops', buildTramStops()); }],
    ['Marcando campos de fútbol y canchas…', () => { buildSports(); }],
    ['Poniendo señales de STOP y ceda el paso…', () => { buildTrafficSigns(); }],
    ['Uniendo geometría…', finalizeChunks],
    ['Pintando el cielo y el Teide…', buildSky],
    ['Aparcando coches y poniendo el tranvía…', () => { buildParked(); buildTram(); }],
    ['Dibujando el mapa…', () => { buildMapCanvas(); buildLabels(); }],
    ['Llegando a la Plaza del Adelantado…', () => { initPlayer(); MISSIONS.init(); setupTouch(); FIGHT2D.setupPad(); setupAchaman(); SAVE.setup(); }],
    ['Arrancando el tráfico…', () => { for (let i = 0; i < Q.traffic; i++) { const sp = trafficSpawnPoint(20, Q.far * 0.3 + 40, false); if (sp) { const E = GRAPH.edges[sp[0]]; const busOK = ['primary', 'secondary', 'tertiary'].includes(E.type) && Math.random() < 0.05; const c = busOK ? new Car('bus', null, 0, 0, 0) : new Car(null, null, 0, 0, 0, trafficModel(E.type)); c.personality = rnd(0.85, 1.15); spawnTraffic(c, sp[0], sp[1], sp[2]); } } }],
    ['Preparando a la gente de la calle…', () => { try { for (const f of ['8px "Press Start 2P"', '16px Oswald', '16px Barlow', '16px "Russo One"', '16px Audiowide', '16px Yellowtail']) document.fonts.load(f); } catch (e) { } preloadHumans(Q.peds + 8, 3, 6, { ped: () => newPedHuman(false), can: () => newPedHuman(true), cop: newCopHuman }); }],
    ['Compilando sombreadores…', async () => { precomputeEnv(); updateCamera(0.016); if (renderer.compileAsync) await renderer.compileAsync(scene, camera); else renderer.compile(scene, camera); renderer.compile(bgScene, bgCamera); preloadDone(); }], /* async compile: the page doesn't freeze (audit P2.4) */
  ];
  for (let i = 0; i < steps.length; i++) { setLoad(steps[i][0], i / steps.length); await nextFrame(); await nextFrame(); try { await steps[i][1](); } catch (e) { console.error(steps[i][0], e); setLoad('Error: ' + e.message, i / steps.length); throw e; } }
  setLoad('¡Listo!', 1); $('loadblock').style.display = 'none'; $('menubtns').style.display = 'flex';
  GAME.state = 'menu'; last = performance.now(); loop();
  window.__GAME_READY = true;
}
boot();
window.__bg = [bgScene, bgCamera]; window.__dbg = { MATS: MAT, AIRPORT, BUILD, HPOOL, CARPOOL, DATA, trenchPush, parkedNear, inCut, TCUTS, CONTROLS, worldEdgeDist, inPlayArea, borderTarget, WORLD_EXCL, get MAPC() { return MAPC; }, MAP, AMBIENCE, INICIO, CONC_TOWER, CONC_CARVE, get playerHuman() { return playerHuman; }, AUDIO, STEPS, footContacts, INTERIORS, nearestDoor, useDoor, DECKS, ROADSEG, GRAPH, heightAt, THREE, PLAYER, CARS, GAME, scene, camera, renderer, WANTED, MISSIONS, enterCar, nearestEnterable, TRAM, PEDS, BIGMAP, COL, INTERIORS, useDoor, NPC, makeHuman, animHuman, VMODELS, BUILD, LMQ, frontEdge, TSIGN, TUNNEL_DECKS, lowAt, deckAt, deckSide, CARPARKS, UGC, FIGHT2D, startStreetFight, setWaypoint, WEAPON, fireWeapon, giveWeapon, FOOD, COPS, NPC, PK2, MUSIC, SAVE, inOtherRoad, lowAt, TUNNEL_DECKS, depthOf, auditCrossings, auditObstacles, crossingsOf, ROADY, DEP, RAISE, AT_GRADE, giveWeapon, WALKG, GPS, CONC_TOWER, PLASTER, CAM, TCUTS, DEP, Car: typeof Car !== 'undefined' ? Car : null };
window.__snap = () => { updateUnderground(); bgCamera.position.copy(camera.position); bgCamera.quaternion.copy(camera.quaternion); bgCamera.fov = camera.fov; bgCamera.updateProjectionMatrix(); renderer.clear(); renderer.render(bgScene, bgCamera); renderer.clearDepth(); renderer.render(scene, camera); return renderer.domElement.toDataURL('image/jpeg', 0.85); };
window.__setYaw = (y) => { CAM.yaw = y; CAM.pitch = 0.1; INPUT.lastMouse = performance.now(); };
window.__hit = (p) => hitPed(p);
