// ============ time of day, game loop, menus ============
const GAME = {
  state: 'loading',
  tod: 10.0,
  daySpeed: 1 / 150, // game hours per real second: day 1h = 150 s, night goes faster (see dayRate)
  lock() {
    if (GAME.state !== 'play') return;
    const el = renderer.domElement;
    if (document.pointerLockElement !== el && !document.body.classList.contains('touchmode')) {
      try {
        const p = el.requestPointerLock();
        if (p && p.catch) p.catch(() => {});
      } catch (e) {}
    }
  },
  pause(on) {
    if (on && GAME.state === 'play') {
      GAME.state = 'pause';
      $('pause').style.display = 'flex';
      document.exitPointerLock?.();
      syncPauseUI();
    } else if (!on && GAME.state === 'pause') {
      GAME.state = 'play';
      $('pause').style.display = 'none';
      GAME.lock();
    }
  },
  respawn(x, z, text, color, cost) {
    GAME.state = 'cutscene';
    $('fade').style.opacity = 1;
    HUD.big(text, color, 4);
    GAME.deadT = performance.now();
    const finish = () => {
      if (!PLAYER.dead) return;
      // every step guarded: whatever goes wrong, you always come back to life and can play
      const T = (f) => {
        try {
          f();
        } catch (e) {
          console.error('respawn', e);
        }
      };
      T(() => {
        if (PLAYER.car) {
          const c = PLAYER.car;
          try {
            exitCar();
          } catch (e) {
            PLAYER.car = null;
          }
          c.driver = null;
        }
        PLAYER.car = null;
      });
      T(() => WANTED.reset());
      PLAYER.health = 100;
      PLAYER.down = 0;
      PLAYER.money = Math.max(0, PLAYER.money - cost);
      PLAYER.dead = false;
      PLAYER.interior = null;
      PLAYER.low = null;
      PLAYER.vy = 0;
      PLAYER.onGround = true;
      PLAYER.onDeck = false;
      T(() => {
        [x, z] = safeSpot(x, z);
        const r = COL.resolve(x, z, 0.4);
        PLAYER.x = r.x;
        PLAYER.z = r.z;
        PLAYER.y = heightAt(r.x, r.z) + 0.2;
      });
      T(() => {
        playerHuman.root.visible = true;
        WEAPON.aiming = false;
        FIGHT.cd = 2;
      });
      T(() => {
        talkCancel(); // v1.4.47: the subtitle goes too (12_missions.js)
        if (DLG.open) DLG.hide();
      });
      T(() => MISSIONS.fail('Has perdido el encargo.'));
      $('fade').style.opacity = 0;
      if (GAME.state === 'cutscene' || GAME.state === 'dialog') GAME.state = 'play';
      HUD.toast(cost ? '-' + eur(cost) : 'Vuelves a empezar', '#ffb3b3');
      GAME.lock();
      PLAYER.safeT = 4;
    };
    GAME._respawnFinish = finish;
    setTimeout(finish, 3200);
  },
  // dying: back where the story starts (El Blanco's street), 100 € less; finished missions stay finished
  wasted() {
    if (GAME.state !== 'play') return;
    PLAYER.dead = true;
    const hc = nearestHealth(PLAYER.x, PLAYER.z);
    /* you wake up at the nearest health centre / A&E */ if (hc) {
      GAME.respawn(hc.x, hc.z, 'HAS MUERTO', '#e04848', Math.min(100, PLAYER.money));
      setTimeout(
        () =>
          HUD.toast(
            'Te despiertas en ' +
              hc.name.charAt(0) +
              hc.name
                .slice(1)
                .toLowerCase()
                .replace(/la laguna/, 'La Laguna')
                .replace(/laguna-universidad/, 'Laguna-Universidad')
                .replace(/san benito/, 'San Benito')
                .replace(/finca españa/, 'Finca España'),
            '#7fe08a',
            4
          ),
        2500
      );
      return;
    }
    const st = (typeof NPC !== 'undefined' && NPC.blanco && NPC.blanco.home) || [PLAZA.x - 8, PLAZA.z + 20];
    GAME.respawn(st[0] + 6, st[1] + 4, 'HAS MUERTO', '#e04848', Math.min(100, PLAYER.money));
  },
  busted() {
    if (GAME.state !== 'play') return;
    PLAYER.dead = true;
    const p = DATA.P.find((p) => STR[p[0]] === 'Policia Municipal');
    GAME.respawn(p ? p[2] : 85, p ? p[3] + 6 : 90, '¡TE PILLARON!', '#6fa8ff', WANTED.fine || 250);
  }
};

// ---------- time of day & weather
const cZen = new THREE.Color(),
  cHor = new THREE.Color(),
  tmpC = new THREE.Color();
const PAL_SKY = [
  // [sinElev, zenith, horizon, sunColor]
  [-0.3, 0x02050b, 0x0b1220, 0x223355],
  [-0.08, 0x0b1428, 0x2a2c3e, 0x3a4466],
  [0.0, 0x2c3f6a, 0xe7926a, 0xff7a3a],
  [0.12, 0x3f6aa6, 0xf0c49a, 0xffb070],
  [0.35, 0x4a82c4, 0xc8d8e4, 0xfff0d8],
  [1.0, 0x3a78c0, 0xbfd2e2, 0xfff6ea]
];
let pmrem = null,
  envT = 0,
  lastEnvKey = '';
// v1.4.47 (notas de three.js r174): the maps at 128 px instead of 256 (a quarter of the memory: ~1.7 MB each instead of
// ~6.7, and there are 32 since the car paint has its own); the reflections are soft and the difference does not show
const ENV_OPT = { size: 128 };
// v1.4.47 (Jonay: «en la chapa brillan las estrellas»): the maps are made without the stars (they would shine on the
// car paint, and the windows and street lamps, which are not in them, don't)
function envFromSky() {
  const u = SKY.mat.uniforms;
  if (u && u.uStars) u.uStars.value = 0.9; // (only the brightest ~15 % of the stars)
  const rt = pmrem.fromScene(bgScene, 0, 50, 90000, ENV_OPT);
  if (u && u.uStars) u.uStars.value = 0;
  return rt;
}
const ENVC = new Map();
// v1.4.46 (car paint with a clear coat): the paint reflects its own environment, the sky over a dark ground with a clear
// horizon line, as a real car body (the scene's environment is only the sky, the same above and below, and a glossy coat
// on it barely shows). Only the materials in CAR_PAINTS (carPaintMat, 06_actors.js, and the parked cars) use it
const CARENVC = new Map();
let carEnvGround = null;
function carEnvOf(k) {
  let rt = CARENVC.get(k);
  if (rt) return rt;
  if (!carEnvGround) {
    carEnvGround = new THREE.Mesh(new THREE.CircleGeometry(60000, 24), new THREE.MeshBasicMaterial({ color: 0x000000, fog: false }));
    carEnvGround.rotation.x = -Math.PI / 2;
    carEnvGround.position.y = -80;
  }
  // the ground: the horizon's colour, darkened (dark at night, grey-green by day)
  const c = carEnvGround.material.color;
  if (scene.fog) c.copy(scene.fog.color).multiplyScalar(0.12);
  else c.setRGB(0.05, 0.05, 0.045);
  bgScene.add(carEnvGround);
  rt = envFromSky();
  bgScene.remove(carEnvGround);
  CARENVC.set(k, rt);
  return rt;
}
function setCarEnv(k) {
  const t = (carEnvTex = scene.userData.carEnv = carEnvOf(k).texture);
  for (const m of CAR_PAINTS) m.envMap = t;
}
// environment maps: one per 1.5 h of day (and weather), made once and reused instead of regenerating the PMREM in the
// middle of play every time the hour changes (audit P1.6); precomputeEnv() fills the day while the game loads
const envKey = (t) => SETTINGS.weather + '|' + (Math.round(t / 1.5) % 16);
function updateEnvironment(force) {
  if (!pmrem) {
    pmrem = new (USE_GPU ? THREE.GPU.PMREMGenerator : THREE.PMREMGenerator)(renderer);
  }
  const k = envKey(GAME.tod);
  if (!force && k === lastEnvKey) return;
  lastEnvKey = k;
  // only the current weather's maps are kept (audit P1.8): changing the weather frees the other ones (at most 16)
  const w = SETTINGS.weather + '|';
  for (const C of [ENVC, CARENVC])
    for (const [kk, r] of C)
      if (!kk.startsWith(w)) {
        r.dispose();
        C.delete(kk);
      }
  let rt = ENVC.get(k);
  if (!rt) {
    rt = envFromSky();
    ENVC.set(k, rt);
  }
  scene.environment = rt.texture;
  setCarEnv(k);
}
function precomputeEnv() {
  if (!pmrem) pmrem = new (USE_GPU ? THREE.GPU.PMREMGenerator : THREE.PMREMGenerator)(renderer);
  const t0 = GAME.tod;
  for (let b = 0; b < 16; b++) {
    GAME.tod = b * 1.5;
    updateSun();
    const k = envKey(GAME.tod);
    if (!ENVC.has(k)) ENVC.set(k, envFromSky());
    carEnvOf(k);
  }
  GAME.tod = t0;
  updateSun();
  updateEnvironment(true);
}
const _sunDir = new THREE.Vector3(),
  _sunCol = new THREE.Color(),
  _grey = new THREE.Color(),
  _grey2 = new THREE.Color(),
  _ldir = new THREE.Vector3(),
  _moonDir = new THREE.Vector3(-0.3, 0.8, 0.4).normalize();
function updateSun() {
  const { w, overcast, night, ldir } = updateSunPart1();
  if (PLAYER.interior) {
    hemi.color.set(0xfff6ea);
    hemi.groundColor.set(0x8a8478);
    hemi.intensity = 1.25;
    sun.intensity = 0.9;
    sun.color.set(0xffffff);
    renderer.toneMappingExposure = 1.05;
  }
  // shadows follow the player
  const px = PLAYER.x,
    pz = PLAYER.z,
    py = PLAYER.y;
  const snap = 2;
  sun.target.position.set(Math.round(px / snap) * snap, py, Math.round(pz / snap) * snap);
  sun.position.copy(sun.target.position).addScaledVector(ldir, 320);
  // v1.4.47 (Jonay: «se volvió a poner negro, WebGPU», at 07:43; console: «Destroyed texture ShadowDepthTexture used in a
  // submit» and «Cannot read properties of null (reading 'setSize') at renderShadow … _renderBundles»): switching the sun's
  // shadow off at dawn and dusk destroyed its shadow map, while the WebGPU render bundles (05w_optimiza.js) still drew with
  // it: every frame failed (black screen) from then on. The shadow is never switched off now: when the sun is low it is
  // made invisible (intensity 0) and not redrawn (autoUpdate false), which costs nothing either
  const shOn = sun.intensity > 0.3;
  sun.castShadow = Q.shadow > 0;
  sun.shadow.intensity = shOn ? 1 : 0;
  sun.shadow.autoUpdate = shOn;
  // street lights & car lamps
  // v1.4.22 (Jonay, 3-nov: «la luz de las ventanas y todas las fuentes de luz en general, para que compense la
  // oscuridad»): brighter signs, lamp pools and car lights at night (windows: 04_world.js; pools: 05_scenery.js)
  for (const m of SIGN.mats) m.emissiveIntensity = night * 1.25;
  lampHeadMat.emissiveIntensity = night * 2.5 + overcast * 0.2 * (1 - night);
  lampPoolMat.opacity = night * 0.8;
  headlightLevel.value = night * 3.6 + (w === 2 ? 1.5 : 0);
  headMat.emissiveIntensity = 0.2 + headlightLevel.value;
  tailMat.emissiveIntensity = 0.3 + night * 1.2;
}
/** (v1.1.7, code quality) part of updateSun: palette interpolation */
function updateSunPart1() {
  const t = GAME.tod;
  const el = Math.sin((Math.PI * (t - 7.9)) / (20.1 - 7.9)) * ((62 * Math.PI) / 180);
  const az = ((90 + (180 * (t - 7.9)) / (20.1 - 7.9)) * Math.PI) / 180;
  const se = Math.sin(el);
  const dir = _sunDir.set(Math.sin(az) * Math.cos(el), se, -Math.cos(az) * Math.cos(el)).normalize(); /* temporaries, no garbage (audit P1.3) */
  // palette interpolation
  let i = 0;
  while (i < PAL_SKY.length - 2 && se > PAL_SKY[i + 1][0]) i++;
  const a = PAL_SKY[i],
    b = PAL_SKY[i + 1];
  const k = clamp((se - a[0]) / (b[0] - a[0]), 0, 1);
  cZen.set(a[1]).lerp(tmpC.set(b[1]), k);
  cHor.set(a[2]).lerp(tmpC.set(b[2]), k);
  const sunCol = _sunCol.set(a[3]).lerp(tmpC.set(b[3]), k);
  const w = SETTINGS.weather;
  const overcast = w === 1 ? 0.75 : w === 2 ? 0.9 : 0;
  const grey = _grey.set(0x9aa3aa).multiplyScalar(clamp(se * 3 + 0.25, 0.08, 1));
  cZen.lerp(grey, overcast * 0.8);
  cHor.lerp(_grey2.copy(grey).multiplyScalar(1.1), overcast * 0.7);
  const night = smooth(0.06, -0.12, se);
  U.uNight.value = night;
  SKY.mat.uniforms.sunDir.value.copy(dir);
  SKY.mat.uniforms.zen.value.copy(cZen);
  SKY.mat.uniforms.hor.value.copy(cHor);
  SKY.mat.uniforms.uCloud.value = w === 0 ? 0.42 : w === 1 ? 0.97 : 1.0;
  // lights
  const dayI = smooth(-0.1, 0.32, se); /* v1.1.3: wider dusk (Jonay: «oscurece muy de golpe») */
  const moon = night > 0.5;
  const ldir = _ldir.copy(moon ? _moonDir : dir);
  sun.color.copy(sunCol).lerp(tmpC.set(0x8fa6d8), night);
  sun.intensity = Math.max((2.9 * dayI * (1 - overcast * 0.75) + 0.05) * (1 - night), 0.35 * night);
  hemi.color.copy(cZen).lerp(tmpC.set(0xffffff), 0.35);
  hemi.groundColor.set(0x5b5140).multiplyScalar(0.45 + dayI * 0.55);
  hemi.intensity = 0.42 + night * 0.16 + dayI * (0.58 + overcast * 0.5); /* night floor raised (v0.60: it was too dark; v1.4.22: a bit more) */
  if (SKY.ring) SKY.ring.material.color.setScalar(0.18 + dayI * 0.72 * (1 - overcast * 0.3));
  bgSun.color.copy(sun.color);
  bgSun.intensity = sun.intensity * 0.9;
  bgSun.position.copy(ldir).multiplyScalar(1000);
  bgHemi.intensity = hemi.intensity;
  bgHemi.color.copy(hemi.color);
  // fog
  const fogCol = cHor.clone().lerp(cZen, 0.15);
  scene.fog.color.copy(fogCol);
  bgScene.fog.color.copy(fogCol);
  scene.fog.far = w === 2 ? 230 : w === 1 ? viewFar() * 0.8 : cityFogFar();
  scene.fog.near = w === 2 ? 15 : 90;
  // v1.4.47 («franja verde inclinada sobre el horizonte», X −300, Y −600 looking NE): the far ring (Anaga, ~4.5 km) came out
  // almost without haze (7 %) over a city already hazy at 2 km: a sharp bright green band. Now ~35 % at 4.5 km
  bgScene.fog.near = w === 2 ? 300 : w === 1 ? 600 : 800;
  bgScene.fog.far = w === 2 ? 900 : w === 1 ? 7000 : 11000;
  renderer.toneMappingExposure = 1.0 + night * 0.62;
  return { w, overcast, night, ldir };
}
// player headlights at night
const headSpot = new THREE.SpotLight(0xfff1d0, 0, 60, 0.55, 0.5, 1.2);
headSpot.castShadow = false;
scene.add(headSpot);
scene.add(headSpot.target);

// ---------- pause UI wiring
function syncPauseUI() {
  document.querySelectorAll('#segQ button').forEach((b) => b.classList.toggle('on', b.dataset.q === qName));
  document.querySelectorAll('#segW button').forEach((b) => b.classList.toggle('on', +b.dataset.w === SETTINGS.weather));
  document.querySelectorAll('#segInv button').forEach((b) => b.classList.toggle('on', +b.dataset.v === (SETTINGS.invertY ? 1 : 0)));
  document.querySelectorAll('#segFpsM button').forEach((b) => b.classList.toggle('on', +b.dataset.v === (SETTINGS.fpsMeter ? 1 : 0)));
  $('tod').value = GAME.tod;
  $('sens').value = SETTINGS.sens;
  $('fpscap').value = fpsCap('city') || 144; // v1.4.44
  $('fpsv').textContent = $('fpscap').value;
  document.querySelectorAll('#segGpu button').forEach((b) => b.classList.toggle('on', +b.dataset.g === (USE_GPU ? 1 : 0)));
  $('vol').value = AUDIO.A.vol;
}
let pendingQ = qName;
document.querySelectorAll('#segQ button').forEach((b) =>
  b.addEventListener('click', () => {
    pendingQ = b.dataset.q;
    document.querySelectorAll('#segQ button').forEach((x) => x.classList.toggle('on', x === b));
    try {
      localStorage.setItem(QKEY, pendingQ);
    } catch (e) {}
  })
);
document.querySelectorAll('#segW button').forEach((b) =>
  b.addEventListener('click', () => {
    SETTINGS.weather = +b.dataset.w;
    saveSettings();
    syncPauseUI();
    updateSun();
    updateEnvironment(true);
  })
);
document.querySelectorAll('#segInv button').forEach((b) =>
  b.addEventListener('click', () => {
    SETTINGS.invertY = b.dataset.v === '1';
    saveSettings();
    syncPauseUI();
  })
);
// v1.4.50 (Jonay: «un contador de FPS y frametime activable en opciones, en la esquina superior derecha, para hacer mis test»)
document.querySelectorAll('#segFpsM button').forEach((b) =>
  b.addEventListener('click', () => {
    SETTINGS.fpsMeter = b.dataset.v === '1';
    saveSettings();
    syncPauseUI();
    FPSM.show();
  })
);
$('tod').addEventListener('input', (e) => {
  GAME.tod = +e.target.value;
  updateSun();
  updateEnvironment(true);
});
// v1.4.44: FPS limit (applies at once) and graphics engine (applies on reload)
$('fpscap').addEventListener('input', (e) => {
  SETTINGS.fps = +e.target.value;
  $('fpsv').textContent = SETTINGS.fps;
  saveSettings();
});
document.querySelectorAll('#segGpu button').forEach((b) =>
  b.addEventListener('click', () => {
    try {
      localStorage.setItem('jeta_motor', b.dataset.g === '1' ? 'webgpu' : 'webgl');
    } catch (e) {}
    document.querySelectorAll('#segGpu button').forEach((x) => x.classList.toggle('on', x === b));
    $('qnote').textContent =
      'El motor gráfico cambia al pulsar «Aplicar y recargar».' +
      (b.dataset.g === '1' && !navigator.gpu ? ' Este navegador no tiene WebGPU: seguirá con WebGL.' : '');
  })
);
$('sens').addEventListener('input', (e) => {
  SETTINGS.sens = +e.target.value;
  saveSettings();
});
$('vol').addEventListener('input', (e) => {
  AUDIO.setVol(+e.target.value);
  MUSIC.setVol();
});
$('mvol').value = SETTINGS.music ?? 1;
$('mvol').addEventListener('input', (e) => {
  SETTINGS.music = +e.target.value;
  saveSettings();
  MUSIC.setVol();
});
// v1.1.3 (Jonay: «al estar a pantalla completa no se puede salir; el menú de pausa no tiene un salir»): saves (automatic slot),
// leaves the full screen and closes the window of the launcher (its server stops by itself); in a normal browser tab, back
// to the start menu
$('bQuit').addEventListener('click', () => {
  try {
    GAME.pause(false);
    if (typeof SAVE !== 'undefined' && SAVE.auto) SAVE.auto('Al salir');
  } catch (e) {
    console.error('guardar al salir', e);
  }
  try {
    if (document.fullscreenElement) document.exitFullscreen();
  } catch (e) {}
  if (location.port === '8790') {
    window.close();
  }
  setTimeout(() => {
    location.reload();
  }, 300);
});
$('bResume').addEventListener('click', () => {
  GAME.pause(false);
  if (!document.body.classList.contains('touchmode') && !window.__JETA_TEST && typeof goFullscreen === 'function') goFullscreen();
}); // v1.0.1: Esc leaves the full screen with the pause; «Continuar» brings it back
for (const id of ['bCtl', 'bCtl2']) {
  const b = $(id);
  if (b)
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      CONTROLS.open();
    });
}
$('bReload').addEventListener('click', () => {
  try {
    localStorage.setItem(QKEY, pendingQ);
  } catch (e) {}
  location.reload();
});
$('bOpts').addEventListener('click', () => {
  $('menu').style.display = 'none';
  GAME.state = 'play';
  GAME.pause(true);
  AUDIO.init();
});
function goLandscape() {
  if (!document.body.classList.contains('touchmode')) return;
  try {
    const el = document.documentElement;
    const p = el.requestFullscreen ? el.requestFullscreen({ navigationUI: 'hide' }) : el.webkitRequestFullscreen && el.webkitRequestFullscreen();
    const lock = () => {
      try {
        screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {});
      } catch (e) {}
    };
    if (p && p.then) p.then(lock, lock);
    else lock();
  } catch (e) {}
}
$('rotate').addEventListener('click', goLandscape);
// v1.0.1 (Jonay: «al empezar en el navegador debería ponerse, o al menos pedir, pantalla completa»): on the PC too, when
// «Jugar» is pressed (a browser only allows it on a click); not if the window already fills the screen (the launcher's)
function goFullscreen() {
  try {
    if (document.fullscreenElement || (window.innerHeight >= screen.height - 2 && window.innerWidth >= screen.width - 2)) return;
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  } catch (e) {}
}
// the folder version's little server (lanzador/servidor.ps1) closes when the game stops sending this
if (location.port === '8790')
  setInterval(() => {
    fetch('/latido', { cache: 'no-store' }).catch(() => {});
  }, 20000);
$('bPlay').addEventListener('click', () => {
  goLandscape();
  if (!document.body.classList.contains('touchmode') && !window.__JETA_TEST) goFullscreen();
  AUDIO.init();
  $('menu').style.display = 'none';
  GAME.state = 'play';
  GAME.lock();
  HUD.big('AYOZE «EL CHOPA»', '#f5b72e', 4);
  /* the intro stays until you press the button (it went by too fast) */ setTimeout(() => {
    if (GAME.state === 'play' && !DLG.open)
      DLG.show(
        'Ayoze «El Chopa»',
        'JETA La Laguna',
        'Tres años a la sombra. Hoy, recién salido de la cárcel, el Chopa vuelve a su barrio de La Laguna con una bolsa de plástico y ganas de hacer las cosas bien.<br><br>Habla con <b>Rayco «El Blanco»</b>, en la puerta de casa de sus padres (círculo amarillo).',
        '',
        ['¡Vamos!'],
        () => DLG.hide()
      );
  }, 1200);
});
renderer.domElement.addEventListener('click', () => GAME.lock());
document.addEventListener('pointerlockchange', () => {
  if (
    !document.pointerLockElement &&
    GAME.state === 'play' &&
    !(performance.now() < (GAME.noPauseT || 0)) /* v0.85.1: not right after leaving a machine with Esc */ &&
    !BIGMAP.open &&
    !document.body.classList.contains('touchmode')
  )
    GAME.pause(true);
});

// ---------- loop
let last = performance.now(),
  acc2 = 0,
  frame = 0,
  trafficT = 0;
const PROF = {};
window.__prof = PROF;
const pm = (k, t0) => {
  PROF[k] = (PROF[k] || 0) * 0.9 + (performance.now() - t0) * 0.1;
};
// v1.4.50: the FPS meter (Opciones → Contador de FPS): frames a second, the time between frames (average and the worst
// one of each half second) and the CPU time of the frame (logic + sending the drawing; the GPU's own work is not in it)
const FPSM = (() => {
  const el = $('fpsMeter');
  let n = 0,
    t0 = performance.now(),
    prev = 0,
    sum = 0,
    worst = 0,
    cpu = 0;
  return {
    show() {
      el.style.display = SETTINGS.fpsMeter ? 'block' : 'none';
    },
    frame(now, work) {
      if (!SETTINGS.fpsMeter) return;
      if (prev) {
        const ft = now - prev;
        if (ft < 5000) {
          n++;
          sum += ft;
          worst = Math.max(worst, ft);
          cpu += work;
        }
      }
      prev = now;
      if (now - t0 >= 500) {
        if (n)
          el.textContent = `${Math.round((n * 1000) / (now - t0))} FPS · ${(sum / n).toFixed(1)} ms (máx ${worst.toFixed(1)}) · CPU ${(cpu / n).toFixed(1)} ms`;
        n = sum = worst = cpu = 0;
        t0 = now;
      }
    }
  };
})();
FPSM.show();
const cityFrameDue = makeFrameGate(() => fpsCap('city')); // v1.4.44: the Opciones bar (SETTINGS.fps); 30 on phones by default
function loop(now = performance.now()) {
  requestAnimationFrame(loop);
  if (window.__manual || !cityFrameDue(now)) return;
  updateMiniGamepad();
  let dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (GAME.state === 'fight2d' || GAME.state === 'basket2d' || GAME.state === 'futbol2d' || GAME.state === 'arcade') return FPSM.frame(now, 0); // the 2D fight / basketball game draw themselves; v1.1.8 (auditor): the arcade and the console too (their screen covers everything)
  logic(dt, now);
  render();
  adaptRes(now);
  FPSM.frame(now, performance.now() - now);
}
// dynamic resolution: keep the frame rate playable (mainly on phones)
const DYN = { pr: renderer.getPixelRatio(), max: renderer.getPixelRatio(), ms: 16, t: 0, min: IS_TOUCH ? 0.5 : 0.75 };
function adaptRes(now) {
  const ft = now - (DYN.lastF || now);
  DYN.lastF = now;
  if (ft <= 0 || ft > 200) return;
  DYN.ms = DYN.ms * 0.95 + ft * 0.05;
  if (now - DYN.t < 2000 || GAME.state !== 'play') return;
  DYN.t = now;
  let p = DYN.pr;
  if (DYN.ms > 38) p = Math.max(DYN.min, p - 0.1);
  else if (DYN.ms < 22) p = Math.min(DYN.max, p + 0.05);
  if (Math.abs(p - DYN.pr) > 0.01) {
    DYN.pr = p;
    renderer.setPixelRatio(p);
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
// underground backdrop: from inside a tunnel or a cutting, any gap between walls used to show the sky and the far city
// "below" the ground; a dark earth cylinder around the camera (top just under the ground level) fills those views
const UGSKIRT = (() => {
  const g = new THREE.CylinderGeometry(1, 1, 1, 40, 1, true);
  g.translate(0, -0.5, 0);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x2b2219, side: THREE.BackSide, fog: false }));
  m.frustumCulled = false;
  m.visible = false;
  m.renderOrder = -1;
  scene.add(m);
  return m;
})();
function updateUnderground() {
  const g = heightAt(camera.position.x, camera.position.z);
  const under = camera.position.y < g - 1.2 && !inCut(camera.position.x, camera.position.z, 1.0);
  /* only inside covered tubes: in an open cutting the brown backdrop showed above the walls where the ground ahead drops (Camino el Vallado) */ UGSKIRT.visible =
    under;
  if (under) {
    UGSKIRT.position.set(camera.position.x, g + 60, camera.position.z);
    UGSKIRT.scale.set(240, 460, 240);
  }
}
function render() {
  const tt = performance.now();
  updateUnderground();
  updateCityLOD();
  updateHierba(); // v1.3.1: the grass around the camera (05z_hierba.js)
  camera.updateMatrixWorld();
  bundleStep(camera); // v1.4.44: WebGPU's recorded cells (05w_optimiza.js)
  renderer.clear();
  renderer.render(bgScene, bgCamera);
  renderer.clearDepth();
  renderer.render(scene, camera);
  pm('render', tt);
}
// v1.0.0: far people, cars and rooms are not drawn (05w_optimiza.js), in every render of the scene (also the photos and the auditor)
// v1.4.46 (Jonay: «empecé otra y no sale el pj», con WebGPU): WebGPU also calls these for the shadow pass, with the sun's
// camera ~320 m away: from there the player and the people near were «far», got hidden and (since v1.4.44 their matrices
// stop while hidden) never came back. Only the renders with the game camera cull and restore.
scene.onBeforeRender = (r, sc, cam) => {
  if (cam && cam !== camera) return;
  try {
    actorCull(true, cam);
  } catch (e) {
    console.error('actorCull', e);
  }
};
scene.onAfterRender = (r, sc, cam) => {
  if (cam && cam !== camera) return;
  try {
    actorCull(false);
  } catch (e) {
    console.error('actorCull', e);
  }
}; // v1.0.3: never stops the city from being drawn
window.__step = (n, dt = 1 / 30, keys = []) => {
  keys.forEach((k) => KEYS.add(k));
  for (let i = 0; i < n; i++) logic(dt, performance.now());
  keys.forEach((k) => KEYS.delete(k));
};
window.__press = (k) => PRESSED.add(k);
function logic(dt, now) {
  thawStep(); // v1.4.44: frozen city objects that something moved (05w_optimiza.js)
  const { T0 } = logicPart1();
  let tt;
  frame++;
  const hadPad = !!INPUT.gp;
  readGamepad();
  if (hadPad !== !!INPUT.gp) {
    document.body.classList.toggle('gamepad', !!INPUT.gp);
    updateWeaponHUD();
  }
  if (updatePadMenu()) {
    PRESSED.clear();
    return;
  }
  if (GAME.state === 'play' || GAME.state === 'cutscene' || GAME.state === 'dialog') {
    if (GAME.state === 'play') {
      if (pressed('KeyM') || (INPUT.gp && INPUT.gp.down(PAD_BUTTON.VIEW))) BIGMAP.toggle();
      if (pressed('KeyT') && BIGMAP.open) BIGMAP.teleport();
      if (pressed('KeyP', 'Escape') || (INPUT.gp && INPUT.gp.down(PAD_BUTTON.MENU))) {
        if (BIGMAP.open) BIGMAP.toggle();
        else GAME.pause(true);
      }
    }
    if (BIGMAP.open) BIGMAP.updatePad(INPUT.gp, dt);
    if (!BIGMAP.open) {
      if (GAME.state === 'play' && !DLG.open && INPUT.gp?.down(PAD_BUTTON.UP)) tapControlKey('KeyJ');
      if (GAME.state === 'play' && !PLAYER.car && INPUT.gp?.down(PAD_BUTTON.DOWN)) PRESSED.add('KeyG');
      GAME.tod = (GAME.tod + dt * dayRate(GAME.tod)) % 24;
      U.uTime.value += dt;
      tt = performance.now();
      if (GAME.state === 'play') {
        updatePlayer(dt);
        updateCombat(dt);
        try {
          MALEANTES.update(dt);
        } catch (e) {
          console.error('maleantes', e);
        }
        try {
          RECRE.update(dt);
        } catch (e) {
          console.error('recre', e);
        }
        try {
          CASA.update(dt);
        } catch (e) {
          console.error('casa', e);
        }
        try {
          GARAJE.update(dt);
        } catch (e) {
          console.error('garaje', e);
        } // v1.4.41: C. Tacoronte 67
        try {
          updateBorder(dt);
        } catch (e) {
          console.error('border', e);
        }
      }
      pm('player', tt);
      // physics at fixed substeps
      acc2 += dt;
      const h = 1 / 90;
      let n = 0;
      while (acc2 >= h && n < 6) {
        for (const c of CARS)
          if (c.mode === 'physics') {
            if (!c.driver || c.crashed) {
              c.ctl.thr = 0;
              c.ctl.brk = c.driver === 'player' ? c.ctl.brk : 1;
            }
            c.physics(h);
          }
        carCollisions();
        tramCollisions();
        acc2 -= h;
        n++;
      }
      pm('phys', tt);
      tt = performance.now();
      for (const c of CARS) {
        if (c.mode === 'traffic') updateTraffic(c, dt);
        c.sync(dt);
      }
      pm('traffic', tt);
      tt = performance.now();
      trafficT -= dt;
      if (trafficT < 0) {
        trafficT = 0.25;
        manageTraffic();
        updateParkedLOD();
        updateCityLOD();
        updateHierba();
      }
      pm('manage', tt);
      tt = performance.now();
      updateTram(dt);
      try {
        updateAirport(dt);
      } catch (e) {}
      updatePeds(dt);
      pm('peds', tt);
      tt = performance.now();
      WANTED.update(dt);
      if (GAME.state === 'play') updateCops(dt);
      MISSIONS.update(dt);
      pm('miss', tt);
      if (frame % 3 === 0) updateGPS();
    }
    updateCamera(dt);
    updateWeapons(dt);
    try {
      AGUA.update(dt);
    } catch (e) {
      console.warn('agua', e);
    }
    MUSIC.update();
    SAVE.update(dt);
    if (frame % 2 === 0) updateSun();
    envT -= dt;
    if (envT < 0) {
      envT = 8;
      updateEnvironment();
    }
    // player car headlights
    const pc = PLAYER.car;
    headSpot.intensity = pc && U.uNight.value > 0.3 ? 60 : 0;
    if (pc) {
      const fx = Math.sin(pc.h),
        fz = Math.cos(pc.h);
      headSpot.position.set(pc.x + fx * 2, pc.y + 0.8, pc.z + fz * 2);
      headSpot.target.position.set(pc.x + fx * 20, pc.y - 1, pc.z + fz * 20);
    }
    tt = performance.now();
    AUDIO.update(dt);
    AMBIENCE.update(dt);
    HUD.update(dt);
    GUIDE.update();
    pm('hud', tt);
    if (BIGMAP.open && frame % 10 === 0) BIGMAP.redraw();
  } else if (GAME.state === 'achaman') {
    GAME.tod = (GAME.tod + dt * dayRate(GAME.tod)) % 24;
    U.uTime.value += dt;
    updateAchaman(dt);
    if (GAME.state === 'achaman') {
      acc2 += dt;
      const h = 1 / 90;
      let n = 0;
      while (acc2 >= h && n < 6) {
        for (const c of CARS)
          if (c.mode === 'physics') {
            c.ctl.thr = 0;
            c.ctl.brk = 1;
            c.physics(h);
          }
        carCollisions();
        acc2 -= h;
        n++;
      }
      for (const c of CARS) {
        if (c.mode === 'traffic') updateTraffic(c, dt);
        c.sync(dt);
      }
      trafficT -= dt;
      if (trafficT < 0) {
        trafficT = 0.25;
        manageTraffic();
        updateParkedLOD();
        updateCityLOD();
        updateHierba();
      }
      updateTram(dt);
      updatePeds(dt);
      if (frame % 2 === 0) updateSun();
      envT -= dt;
      if (envT < 0) {
        envT = 8;
        updateEnvironment();
      }
      AUDIO.update(dt);
      HUD.update(dt);
    }
  } else if (GAME.state === 'menu') {
    // attract mode: slow orbit around the plaza
    const t = (now / 1000) * 0.05;
    CAM.yaw = t * 2;
    const cx = PLAZA.x - 80,
      cz = PLAZA.z - 60;
    camera.position.set(PLAZA.x + Math.sin(t) * 140, heightAt(PLAZA.x, PLAZA.z) + 55, PLAZA.z + Math.cos(t) * 140);
    camera.lookAt(PLAZA.x - 150, heightAt(PLAZA.x, PLAZA.z) + 5, PLAZA.z - 90);
    bgCamera.position.copy(camera.position);
    bgCamera.quaternion.copy(camera.quaternion);
    for (const c of CARS) {
      if (c.mode === 'traffic') updateTraffic(c, dt);
      c.sync(dt);
    }
    updateTram(dt);
    if (frame % 2 === 0) updateSun();
  }
  PRESSED.clear();
  pm('js', T0);
}
/** (v1.1.7, code quality) part of logic */
function logicPart1() {
  if (PLAYER.dead && GAME._respawnFinish && performance.now() - (GAME.deadT || 0) > 6000) {
    try {
      GAME._respawnFinish();
    } catch (e) {
      console.error(e);
    }
    if (PLAYER.dead) {
      PLAYER.dead = false;
      PLAYER.health = 100;
      GAME.state = 'play';
      $('fade').style.opacity = 0;
    }
  }
  const T0 = performance.now();
  return { T0 };
}
function tramCollisions() {
  if (!TRAM.circ) return;
  for (const c of CARS) {
    if (c.mode !== 'physics') continue;
    for (const [tx, tz, tr] of TRAM.circ) {
      if (Math.abs(tx - c.x) > 10 || Math.abs(tz - c.z) > 10) continue;
      for (const [cx, cz, cr] of c.circles()) {
        const dx = cx - tx,
          dz = cz - tz,
          d = Math.hypot(dx, dz);
        if (d < tr + cr && d > 1e-4) {
          const nx = dx / d,
            nz = dz / d,
            pen = tr + cr - d;
          c.x += nx * pen;
          c.z += nz * pen;
          const vn = c.vx * nx + c.vz * nz;
          if (vn < 0) {
            c.vx -= 1.4 * vn * nx;
            c.vz -= 1.4 * vn * nz;
            if (-vn > 3) c.onImpact(-vn);
          }
        }
      }
    }
  }
}

function buildInteriorsAll() {
  if (CAT_DOOR.ok)
    buildCathedralInterior([{ x: CAT_DOOR.x, z: CAT_DOOR.z, nx: CAT_DOOR.nx, nz: CAT_DOOR.nz }, CAT_DOOR.side].filter(Boolean), CAT_DOOR.ch);
  const q =
    (SIGN.quads || []).find((q) => q.name === 'Café Brasilito') || (SIGN.quads || []).find((q) => q.cat === 'C' && isHistoric(q.P[0], q.P[1]));
  if (q) {
    const dx = q.P[0] - q.U[0] * 1.8,
      dz = q.P[1] - q.U[1] * 1.8;
    const bld =
      BUILD.find((b) => pip(dx - q.N[0] * 1.5, dz - q.N[1] * 1.5, b.pts.flat())) ||
      BUILD.reduce((a, b) => (Math.hypot(b.cx - dx, b.cz - dz) < Math.hypot(a.cx - dx, a.cz - dz) ? b : a));
    buildCafeInterior({ x: dx + q.N[0] * 0.02, z: dz + q.N[1] * 0.02, nx: q.N[0], nz: q.N[1] }, q.name, bld);
  }
  if (typeof buildCommercialInteriors === 'function') buildCommercialInteriors();
  try {
    CASA.build();
  } catch (e) {
    console.error('casa', e);
  } // v0.83: the estate agency and the homes
  console.log('halls', buildSportsHalls());
  console.log('gente de los interiores sacada de los muebles', clearInteriorNpcs()); // v1.0.2
}
// long days, short nights: daylight (8:00-20:00) 1 game hour = 150 s (~30 min of day), night 1 hour = 40 s (~8 min)
function dayRate(t) {
  /* v1.1.3: the day/night speed changes gradually (it jumped at 20.4 h and dusk felt sudden) */
  const k = t >= 12 ? smooth(19.9, 21.2, t) : 1 - smooth(6.4, 7.7, t);
  return 1 / (150 + (40 - 150) * k);
}
// ---------- boot
async function boot() {
  const steps = [
    [
      'Modelando el relieve de Aguere…',
      () => {
        prepUndergroundAreas();
        buildTerrain();
      }
    ],
    ['Levantando casas del casco histórico…', [buildBuildings, pasajeCovers, serviceUnderBuildings]], // v1.4.48: serviceUnderBuildings (04b_recorte.js)
    ['Asfaltando calles y empedrando peatonales…', [buildRoads, buildMedians, buildCarParks, finalizeCuts]],
    ['Colocando la Catedral y la torre de La Concepción…', [buildLandmarks, buildExtraSalud]],
    [
      'Pintando aparcamientos y abriendo grandes superficies…',
      () => {
        buildParkingLots();
        buildBigStores();
      }
    ],
    [
      'Colgando los rótulos de las tiendas…',
      () => {
        const n = buildSigns();
        console.log('signs', n);
        console.log('props', JSON.stringify(buildStreetProps()));
      }
    ],
    [
      'Abriendo puertas: Catedral, cafetería, hipermercado…',
      () => {
        buildInteriorsAll();
      }
    ],
    ['Plantando laureles de Indias…', [scatterTrees, buildPlazasParks, buildTrees, buildWalls, buildHierba]], // v1.0.4: walls and fences (05y_muros.js); v1.3.1: grass (05z_hierba.js)
    [
      'Encendiendo farolas…',
      () => {
        buildLamps();
        buildTramPoles();
        buildRoofProps();
        buildPlazaProps();
        console.log('tram stops', buildTramStops());
        console.log('soportales', trinidadArcades());
      }
    ],
    [
      'Marcando campos de fútbol y canchas…',
      () => {
        buildSports();
      }
    ],
    [
      'Poniendo señales de STOP y ceda el paso…',
      () => {
        buildTrafficSigns();
      }
    ],
    ['Uniendo geometría…', finalizeChunks],
    ['Juntando piezas sueltas…', optimizeCity], // v0.77: ~8.800 sueltas → por material y celda; árboles por celda; distancia según la niebla
    ['Pintando el cielo y el Teide…', buildSky],
    ['Aparcando coches y poniendo el tranvía…', [buildParked, buildTram]],
    [
      'Dibujando el mapa…',
      () => {
        buildMapCanvas();
        buildLabels();
      }
    ],
    [
      'Llegando a la Plaza del Adelantado…',
      () => {
        initPlayer();
        MISSIONS.initMissions();
        setupTouch();
        FIGHT2D.setupPad();
        setupAchaman();
        SAVE.setup();
      }
    ],
    [
      'Arrancando el tráfico…',
      () => {
        for (let i = 0; i < Q.traffic; i++) {
          const sp = trafficSpawnPoint(20, Q.far * 0.3 + 40, false);
          if (sp) {
            const E = GRAPH.edges[sp[0]];
            const busOK = ['primary', 'secondary', 'tertiary'].includes(E.type) && Math.random() < 0.05;
            const c = busOK ? new Car('bus', null, 0, 0, 0) : new Car(null, null, 0, 0, 0, trafficModel(E.type));
            c.personality = rnd(0.85, 1.15);
            spawnTraffic(c, sp[0], sp[1], sp[2]);
          }
        }
      }
    ],
    [
      'Preparando a la gente de la calle…',
      () => {
        try {
          for (const f of ['8px "Press Start 2P"', '16px Oswald', '16px Barlow', '16px "Russo One"', '16px Audiowide', '16px Yellowtail'])
            document.fonts.load(f);
        } catch (e) {}
        preloadHumans(Q.peds + 8, 3, 6, { ped: () => newPedHuman(false), can: () => newPedHuman(true), cop: newCopHuman });
      }
    ],
    [
      'Compilando sombreadores…',
      async () => {
        precomputeEnv();
        updateCamera(0.016);
        if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
        else renderer.compile(scene, camera);
        renderer.compile(bgScene, bgCamera);
        precompileShadows(); // v1.4.44: the shadow shaders too (05w_optimiza.js)
        preloadDone();
      }
    ] /* async compile: the page doesn't freeze (audit P2.4) */
  ];
  window.__LOADT = []; // v0.77: how long each loading step takes (sonda_rendimiento.py)
  for (let i = 0; i < steps.length; i++) {
    setLoad(steps[i][0], i / steps.length);
    await nextFrame();
    await nextFrame();
    const t0 = performance.now();
    try {
      const fs = steps[i][1];
      if (Array.isArray(fs)) {
        for (const f of fs) {
          const t1 = performance.now();
          await f();
          window.__LOADT.push([steps[i][0] + ' · ' + f.name, Math.round(performance.now() - t1)]);
        }
      } else {
        await fs();
        window.__LOADT.push([steps[i][0], Math.round(performance.now() - t0)]);
      }
    } catch (e) {
      console.error(steps[i][0], e);
      setLoad('Error: ' + e.message, i / steps.length);
      throw e;
    }
  }
  setLoad('¡Listo!', 1);
  $('loadblock').style.display = 'none';
  $('menubtns').style.display = 'flex';
  GAME.state = 'menu';
  last = performance.now();
  loop();
  window.__GAME_READY = true;
  if (!/[?&]noprecarga=1\b/.test(location.search)) setTimeout(preloadMinigameImages, 1500); // ?noprecarga=1: to measure without it
}
/** v1.1.8 (auditor: «empieza a cargar 46 imágenes al abrirse»): the pictures of the minigames (Guanche Warriors, Bencomo,
 *  the basketball players, the backgrounds) are loaded after the game and decoded one by one in quiet moments, so
 *  opening a machine shows the new figures from the first frame */
function preloadMinigameImages() {
  const list = [];
  try {
    list.push(...SPRX.preload(), ...FONDOS.preload(), ...BKSHEET.preload());
  } catch (e) {
    console.warn('precarga de minijuegos', e);
    return;
  }
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 50));
  const next = () => {
    const im = list.shift();
    if (!im) {
      // v1.2.4: then the player's figures for the street fights (the first fight drew them all at once: a freeze)
      try {
        if (typeof playerHuman !== 'undefined' && playerHuman) FIGHT2D.warmFigures(playerHuman.look || {}, true);
      } catch (e) {}
      return;
    }
    (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => idle(next));
  };
  idle(next);
}
boot();
window.__bg = [bgScene, bgCamera];
window.__dbg = {
  TEXW,
  WALLS,
  parkStats,
  parkSides,
  MEDIANS,
  AUX,
  TRAM_PLATFORMS,
  parkedOverTracks,
  wetChasePed,
  updateParkedLOD,
  roadAtBarrier,
  pedestrianDrivingZone,
  pedLeg,
  pedOnRoad,
  pedestrianFastRoad,
  SHORT_UP,
  SPRX,
  SPRX_DATA,
  FONDOS,
  BKSHEET,
  get RCLIP() {
    return RCLIP;
  },
  pip,
  PASAJES,
  ATRIOS: atrioList,
  ARCADE,
  RECRE,
  CASA,
  MUNDIALITO,
  s2Path,
  farmEscapePlan,
  s2DriveCar,
  drivePlan,
  DRIVE_PROF,
  pitchRects,
  rectsOverlap,
  STR,
  isHistoric, // (v1.4.48: sonda_calles_mandan.py)
  pasajeCeilAt,
  inAguereLow,
  LOD,
  updateCityLOD,
  lodShowAll,
  optimizeCity,
  FREEZE, // v1.4.44
  BUNDLES,
  bundleStep,
  thawStep,
  unfuse,
  PARKED,
  activateParked,
  parkedNear,
  RIFLE,
  AGUA,
  FIRES,
  makeFire,
  giveRifle,
  PK2,
  RIOS,
  TRI,
  TRI_ARC,
  PASARELA,
  HIERBA,
  GROUND,
  updateHierba,
  hierbaClass,
  hierbaCell,
  corrState,
  PERAZA,
  MINI,
  KEYS,
  PRESSED,
  INPUT,
  get TCUTS() {
    return TCUTS;
  },
  s2Human,
  s2Down,
  s2DownTick,
  onCarriagewayEarly,
  FLIGHT,
  updateAirport,
  TF13,
  TF5T,
  TRAM_TRENCH,
  tramDepth,
  OBISPADO_TEX: obispadoTex,
  MALEANTES,
  startStreetFight,
  lineRuns,
  BIGSTORES,
  SIGN,
  actorCull,
  ACTORS,
  roadClip,
  insetPoly,
  streetTrim,
  insetParty, // (v1.4.48: sonda_recorte_pasos.py)
  rbClip,
  streetsRule,
  polyArea,
  BASKET2D,
  FUTBOL2D,
  obispoCampo,
  TRI,
  OBISPADO,
  SPORTS,
  inAnyBuilding,
  laneMkPart1, // v1.4.50 (sonda_carriles_en.py)
  laneCentres,
  ROADCLASS,
  CSURF,
  TWINS,
  COURTS,
  courtGateNear,
  useCourtGate,
  DIARIO,
  inPitch,
  pitchRects,
  obispoCourt,
  LAMPS,
  TREES,
  GUIDE,
  AYTO,
  HUC,
  HEALTH,
  nearestHealth,
  exitCar,
  DLG,
  S2,
  POOLS: { CARPOOL, HPOOL, SHARED_GEO, VGEO },
  SHARED_GEO,
  MATS: MAT,
  AIRPORT,
  BUILD,
  HPOOL,
  CARPOOL,
  DATA,
  trenchPush,
  parkedNear,
  inCut,
  TCUTS,
  CONTROLS,
  updateMiniGamepad,
  miniKeyLabel,
  worldEdgeDist,
  inPlayArea,
  borderTarget,
  WORLD_EXCL,
  get MAPC() {
    return MAPC;
  },
  MAP,
  AMBIENCE,
  INICIO,
  CONC_TOWER,
  CONC_CARVE,
  get playerHuman() {
    return playerHuman;
  },
  AUDIO,
  ENGINE, // v1.4.45
  STEPS,
  footContacts,
  INTERIORS,
  nearestDoor,
  useDoor,
  DECKS,
  carSurfAt, // v1.4.50 (sonda_suelo_en.py)
  ROADSEG,
  GRAPH,
  routeToward, // v1.4.43
  routeRetrace,
  heightAt,
  THREE,
  PLAYER,
  CARS,
  GAME,
  scene,
  camera,
  bgScene, // v1.4.44 (sonda_webgpu.py --js: switching things off to see what they cost)
  sun,
  SKY,
  MAT,
  renderer,
  USE_GPU, // v1.4.44
  WANTED,
  MISSIONS,
  enterCar,
  nearestEnterable,
  TRAM,
  PEDS,
  BIGMAP,
  COL,
  INTERIORS,
  useDoor,
  NPC,
  makeHuman,
  animHuman,
  VMODELS,
  BUILD,
  LMQ,
  frontEdge,
  TSIGN,
  TUNNEL_DECKS,
  lowAt,
  deckAt,
  LAMPS, // v1.4.50 (sonda_bajo_puente.py)
  deckSide,
  CARPARKS,
  UGC,
  FIGHT2D,
  startStreetFight,
  setWaypoint,
  trafficModel,
  isLivery,
  pickColor,
  modelGeometry,
  WEAPON,
  fireWeapon,
  giveWeapon,
  FOOD,
  COPS,
  NPC,
  PK2,
  MUSIC,
  SAVE,
  inOtherRoad,
  lowAt,
  TUNNEL_DECKS,
  depthOf,
  auditCrossings,
  auditObstacles,
  auditRoadBarriers,
  crossingsOf,
  ROADY,
  DEP,
  RAISE,
  AT_GRADE,
  RAISE_SPAN,
  raiseOf,
  PIXBASKET,
  PIXGUAN,
  MERGED,
  mergeY,
  sOnRoad,
  polyAt,
  polyLen,
  giveWeapon,
  WALKG,
  GPS,
  gpsRouteColor,
  CONC_TOWER,
  PLASTER,
  CAM,
  TCUTS,
  DEP,
  GARAJE, // v1.4.41
  tac67,
  PEDWAYS,
  RI2PW,
  pedPruneDecks,
  Car: typeof Car !== 'undefined' ? Car : null
};
window.__snap = () => {
  updateUnderground();
  updateCityLOD();
  updateHierba();
  camera.updateMatrixWorld();
  bundleStep(camera); // v1.4.44
  bgCamera.position.copy(camera.position);
  bgCamera.quaternion.copy(camera.quaternion);
  bgCamera.fov = camera.fov;
  bgCamera.updateProjectionMatrix();
  renderer.clear();
  renderer.render(bgScene, bgCamera);
  renderer.clearDepth();
  renderer.render(scene, camera);
  return renderer.domElement.toDataURL('image/jpeg', 0.85);
};
window.__setYaw = (y) => {
  CAM.yaw = y;
  CAM.pitch = 0.1;
  INPUT.lastMouse = performance.now();
};
window.__hit = (p) => hitPed(p);
// v1.4.46 (Jonay, 23-nov, con WebGPU: «se quedó todo negro aquí de golpe… al teletransportarme sigue negro»): when the
// graphics card is lost (WebGPU: device.lost; WebGL: webglcontextlost) the game cannot draw any more although it keeps
// running. Now it saves the game (automatic slot), says so and reloads. If it happens again in the same session with
// WebGPU, the next load uses WebGL (saved in Opciones as the engine) and it is said on screen.
let gpuLostDone = false;
function onGpuLost(why) {
  if (gpuLostDone) return;
  gpuLostDone = true;
  console.error('Tarjeta gráfica perdida:', why);
  let n = 0;
  try {
    n = +(sessionStorage.getItem('jeta_gpu_perdida') || 0) + 1;
    sessionStorage.setItem('jeta_gpu_perdida', String(n));
    sessionStorage.setItem('jeta_gpu_motivo', String(why).slice(0, 200));
  } catch (e) {}
  const toWebGL = USE_GPU && (n >= 2 || /validación/.test(String(why)));
  if (toWebGL)
    try {
      sessionStorage.setItem('jeta_motor_sesion', 'webgl'); // v1.4.47: only this session (01_core.js)
    } catch (e) {}
  try {
    if (GAME.state === 'play' && typeof SAVE !== 'undefined') SAVE.auto('Antes de recargar (tarjeta gráfica)');
  } catch (e) {}
  const box = document.createElement('div');
  box.style.cssText =
    'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);color:#fff;font:600 22px Barlow,sans-serif;text-align:center;z-index:99;padding:30px';
  box.textContent = toWebGL
    ? 'WebGPU ha dado un fallo al dibujar. Partida guardada: se recarga con WebGL hasta que cierres el navegador.'
    : 'La tarjeta gráfica se ha reiniciado. Partida guardada: recargando…';
  document.body.appendChild(box);
  setTimeout(() => location.reload(), 2500);
}
if (USE_GPU && renderer.backend && renderer.backend.device)
  renderer.backend.device.lost.then((i) => {
    if (i && i.reason === 'destroyed') return; // (our own dispose)
    onGpuLost('WebGPU ' + ((i && i.reason) || '') + ': ' + ((i && i.message) || ''));
  });
// v1.4.47 (Jonay: «se volvió a poner negro, WebGPU», con el HUD vivo): the card is not lost, but a WebGPU validation
// error makes every frame invalid (black) while whatever causes it is in view. The first errors are kept for the console
// and the tests (sessionStorage 'jeta_gpu_errores'); many in a row (20 in 3 s) mean a black screen: save, and reload with
// WebGL for this session
if (USE_GPU && renderer.backend && renderer.backend.device) {
  const ERR = [];
  renderer.backend.device.addEventListener('uncapturederror', (ev) => {
    const msg = String((ev.error && ev.error.message) || ev.error || '').slice(0, 300),
      now = performance.now();
    ERR.push(now);
    while (ERR.length && now - ERR[0] > 3000) ERR.shift();
    try {
      const L = JSON.parse(sessionStorage.getItem('jeta_gpu_errores') || '[]');
      if (L.length < 8) {
        L.push(msg);
        sessionStorage.setItem('jeta_gpu_errores', JSON.stringify(L));
      }
    } catch (e) {}
    if (ERR.length <= 3) console.error('WebGPU (error de validación):', msg);
    if (ERR.length >= 20) onGpuLost('WebGPU error de validación: ' + msg);
  });
}
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  onGpuLost('WebGL: contexto perdido');
});
