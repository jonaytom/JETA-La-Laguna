// ---------- v1.4.45 (Jonay, 23-nov: «me gustaría tener distintos sonidos para los coches, no puede ser que suene igual un
// deportivo que un utilitario pequeño o una guagua… el sonido debería ir acorde a la aceleración… y quizá poner cambios que
// se vean en el cuentakilómetros aunque sea automático, así cambiaría el sonido al subir marchas»): the engine of the
// player's vehicle, synthesized per kind (no recordings: nothing to license), with an automatic gearbox that only drives
// the sound and the speedometer (the physics are not touched).
//  · Gearbox: wheel speed × gear ratio × final drive → rpm; up a gear near the cut-off when pushing (sooner when cruising),
//    down when the revs fall; R going backwards, N stopped without throttle. A shift cuts the throttle for a moment and the
//    revs drop: you hear it.
//  · Sound: the firing frequency (rpm / 60 × cylinders / 2) and its harmonics (oscillators), the exhaust rumble (half of
//    it, for V8s and diesels), intake roar (filtered noise), the diesel clatter (noise beating at the firing frequency),
//    a turbo whistle, a soft saturation that grows with the load, and pops when lifting off a sports car or a motorbike.
//    The electric car only whistles with the speed.
const ENG_PROFILES = {
  // cyl: cylinders · idle / red: rpm · gears: ratios · fin: final drive · wheel: tyre radius (m) · kind: timbre
  compact: { cyl: 4, idle: 850, red: 6300, gears: [3.6, 2.1, 1.4, 1.05, 0.85], fin: 4.1, wheel: 0.3, kind: 'gas', turbo: 0, bright: 1.0 },
  sedan: { cyl: 4, idle: 800, red: 6000, gears: [3.5, 2.0, 1.35, 1.0, 0.8, 0.68], fin: 3.9, wheel: 0.32, kind: 'gas', turbo: 0.35, bright: 0.75 },
  suv: { cyl: 4, idle: 780, red: 4600, gears: [4.2, 2.5, 1.6, 1.2, 1.0, 0.8], fin: 3.7, wheel: 0.36, kind: 'diesel', turbo: 0.8, bright: 0.6 },
  van: { cyl: 4, idle: 760, red: 4300, gears: [4.3, 2.5, 1.6, 1.15, 0.92, 0.75], fin: 3.9, wheel: 0.34, kind: 'diesel', turbo: 0.7, bright: 0.55 },
  sport: { cyl: 8, idle: 950, red: 7800, gears: [3.2, 2.2, 1.6, 1.25, 1.0, 0.82, 0.68], fin: 3.4, wheel: 0.34, kind: 'v8', turbo: 0, bright: 0.9 },
  truck: { cyl: 6, idle: 600, red: 2600, gears: [5.0, 3.4, 2.4, 1.75, 1.3, 1.0, 0.82, 0.7], fin: 4.6, wheel: 0.5, kind: 'bigdiesel', turbo: 1, bright: 0.4 },
  moto: { cyl: 2, idle: 1200, red: 10500, gears: [2.8, 2.0, 1.6, 1.35, 1.18, 1.05], fin: 3.0, wheel: 0.31, kind: 'moto', turbo: 0, bright: 1.2 },
  ev: { cyl: 0, idle: 0, red: 16000, gears: [9.0], fin: 1, wheel: 0.34, kind: 'ev', turbo: 0, bright: 0.5 }
};
ENG_PROFILES.taxi = ENG_PROFILES.sedan;
ENG_PROFILES.police = ENG_PROFILES.sedan;
ENG_PROFILES.bus = ENG_PROFILES.truck;
function engProfileOf(car) {
  const m = car.model || {},
    nm = ((m.id || '') + ' ' + (m.name || '')).toLowerCase();
  if (/newton|electr|tesla/.test(nm)) return ENG_PROFILES.ev; // the Newton Style 3
  return ENG_PROFILES[car.type] || ENG_PROFILES[m.phys] || ENG_PROFILES.compact;
}
const ENGINE = (() => {
  let N = null; // audio nodes
  const S = { car: null, P: ENG_PROFILES.compact, gear: 1, rpm: 800, load: 0, shiftT: 0, label: 'N', popT: 0, lastThr: 0 };
  function build(ctx, out, noise) {
    const g = (v) => {
      const n = ctx.createGain();
      n.gain.value = v;
      return n;
    };
    const osc = (type) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.start();
      return o;
    };
    const src = () => {
      const b = ctx.createBufferSource();
      b.buffer = noise;
      b.loop = true;
      b.start();
      return b;
    };
    const n = {};
    n.out = g(0);
    n.out.connect(out);
    // soft saturation (more with load)
    n.shape = ctx.createWaveShaper();
    n.shape.curve = (() => {
      const c = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) {
        const x = (i / 1023) * 2 - 1;
        c[i] = Math.tanh(x * 2.2) / Math.tanh(2.2);
      }
      return c;
    })();
    n.lp = ctx.createBiquadFilter();
    n.lp.type = 'lowpass';
    n.lp.Q.value = 0.9;
    n.drive = g(1);
    n.drive.connect(n.shape);
    n.shape.connect(n.lp);
    n.lp.connect(n.out);
    // firing frequency and harmonics
    n.o1 = osc('sawtooth');
    n.g1 = g(0);
    n.o1.connect(n.g1);
    n.g1.connect(n.drive);
    n.o2 = osc('square'); // half: exhaust rumble
    n.g2 = g(0);
    n.o2.connect(n.g2);
    n.g2.connect(n.drive);
    n.o3 = osc('sawtooth'); // double: bright, revvy
    n.g3 = g(0);
    n.o3.connect(n.g3);
    n.g3.connect(n.drive);
    // intake roar
    n.nz = src();
    n.bp = ctx.createBiquadFilter();
    n.bp.type = 'bandpass';
    n.bp.Q.value = 0.8;
    n.gn = g(0);
    n.nz.connect(n.bp);
    n.bp.connect(n.gn);
    n.gn.connect(n.drive);
    // diesel clatter: high noise beating at the firing frequency
    n.cz = src();
    n.hp = ctx.createBiquadFilter();
    n.hp.type = 'highpass';
    n.hp.frequency.value = 1800;
    n.cg = g(0);
    n.am = osc('square');
    n.amg = g(0);
    n.am.connect(n.amg);
    n.amg.connect(n.cg.gain);
    n.cz.connect(n.hp);
    n.hp.connect(n.cg);
    n.cg.connect(n.out);
    // turbo whistle / electric motor whine
    n.tw = osc('sine');
    n.tg = g(0);
    n.tw.connect(n.tg);
    n.tg.connect(n.out);
    // pops (lift-off on sports cars and motorbikes)
    n.pz = src();
    n.pbp = ctx.createBiquadFilter();
    n.pbp.type = 'bandpass';
    n.pbp.frequency.value = 350;
    n.pbp.Q.value = 1.2;
    n.pg = g(0);
    n.pz.connect(n.pbp);
    n.pbp.connect(n.pg);
    n.pg.connect(n.out);
    return n;
  }
  function silence(t) {
    if (N && AUDIO.ctx) N.out.gain.setTargetAtTime(0, AUDIO.ctx.currentTime, 0.1);
    S.label = '';
  }
  /** gearbox: rpm and gear from the speed (m/s, signed), the throttle and the brake */
  function gearbox(car, dt) {
    const P = S.P,
      v = car.fwdV || 0,
      av = Math.abs(v),
      thr = car.ctl ? Math.max(0, car.ctl.thr) : 0;
    S.load += (thr - S.load) * Math.min(1, dt * 6);
    if (P.kind === 'ev') {
      S.gear = 1;
      S.rpm = (av / (2 * Math.PI * P.wheel)) * 60 * P.gears[0];
      S.label = v < -0.5 ? 'R' : av < 0.3 && thr < 0.05 ? 'P' : 'D';
      return;
    }
    const wheelRpm = (av / (2 * Math.PI * P.wheel)) * 60;
    const rpmAt = (g) => wheelRpm * P.gears[g - 1] * P.fin;
    if (v < -0.5) {
      S.gear = 1;
      S.label = 'R';
    } else {
      S.shiftT = Math.max(0, S.shiftT - dt);
      const n = P.gears.length;
      const up = P.red * (0.55 + 0.33 * S.load); // cruising shifts early, pushing near the cut-off
      if (S.gear < n && rpmAt(S.gear) > up && S.shiftT <= 0) {
        S.gear++;
        S.shiftT = 0.28;
      } else if (S.gear > 1 && rpmAt(S.gear) < P.idle * 1.5 + (P.red - P.idle) * 0.12 * S.load && S.shiftT <= 0) {
        S.gear--;
        S.shiftT = 0.2;
      }
      S.label = av < 0.4 && thr < 0.05 ? 'N' : String(S.gear);
    }
    // with the wheels still (or spinning) the engine revs on its own with the throttle
    const free = P.idle + (P.red * 0.55 - P.idle) * S.load;
    const target = Math.max(rpmAt(S.gear), av < 2 ? free * (1 - av / 2) + rpmAt(S.gear) * (av / 2) : P.idle);
    S.rpm += (Math.min(P.red, Math.max(P.idle, target)) - S.rpm) * Math.min(1, dt * (S.shiftT > 0 ? 14 : 8));
  }
  function update(dt, car, t) {
    if (!car || car.health <= 0) return silence(t);
    if (S.car !== car) {
      S.car = car;
      S.P = engProfileOf(car);
      S.gear = 1;
      S.rpm = S.P.idle;
      S.load = 0;
    }
    gearbox(car, dt); // (also without sound: the speedometer shows the gear)
    const ctx = AUDIO.ctx;
    if (!ctx || !AUDIO.master) return;
    if (!N) N = build(ctx, AUDIO.master, AUDIO.noise);
    const P = S.P,
      k = P.kind,
      L = S.shiftT > 0.12 ? S.load * 0.25 : S.load, // the throttle is cut while the gear changes
      tc = 0.04;
    const rn = P.red ? (S.rpm - P.idle) / (P.red - P.idle) : 0; // 0 at idle, 1 at the cut-off
    if (k === 'ev') {
      const w = 180 + S.rpm * 0.09;
      N.tw.frequency.setTargetAtTime(w, t, tc);
      N.tg.gain.setTargetAtTime(0.012 + 0.03 * Math.min(1, S.rpm / 9000) * (0.4 + 0.6 * L), t, 0.1);
      for (const q of [N.g1, N.g2, N.g3, N.gn, N.amg, N.cg, N.pg]) q.gain.setTargetAtTime(0, t, 0.1);
      N.o3.frequency.setTargetAtTime(w * 2, t, tc);
      N.out.gain.setTargetAtTime(1, t, 0.1);
      return;
    }
    const f = (S.rpm / 60) * (P.cyl / 2); // firing frequency
    N.o1.frequency.setTargetAtTime(f, t, tc);
    N.o2.frequency.setTargetAtTime(f * 0.5, t, tc);
    N.o3.frequency.setTargetAtTime(f * 2, t, tc);
    const heavy = k === 'v8' || k === 'bigdiesel' || k === 'diesel';
    N.g1.gain.setTargetAtTime(0.5 + 0.25 * L, t, tc);
    N.g2.gain.setTargetAtTime(heavy ? 0.55 + 0.25 * L : 0.18, t, tc);
    N.g3.gain.setTargetAtTime((k === 'moto' ? 0.45 : k === 'gas' ? 0.22 : 0.08) * P.bright * (0.5 + rn), t, tc);
    N.bp.frequency.setTargetAtTime(f * 3 + 200, t, tc);
    N.gn.gain.setTargetAtTime((0.15 + 0.6 * L) * (k === 'moto' ? 1.4 : 1), t, tc);
    N.drive.gain.setTargetAtTime(0.6 + 1.6 * L * (k === 'v8' || k === 'moto' ? 1.3 : 1), t, tc);
    N.lp.frequency.setTargetAtTime((250 + 2200 * rn * P.bright + 1400 * L) * (k === 'bigdiesel' ? 0.6 : 1), t, tc);
    // diesel clatter
    const dz = k === 'diesel' ? 0.05 : k === 'bigdiesel' ? 0.08 : 0;
    N.am.frequency.setTargetAtTime(f, t, tc);
    N.amg.gain.setTargetAtTime(dz, t, tc);
    N.cg.gain.setTargetAtTime(dz * (0.6 + 0.4 * (1 - rn)), t, tc);
    // turbo
    const boost = P.turbo * Math.max(0, rn - 0.2) * L;
    N.tw.frequency.setTargetAtTime(1600 + 4200 * rn, t, 0.15);
    N.tg.gain.setTargetAtTime(boost * 0.025, t, 0.15);
    // pops on lift-off at high revs (sports cars, motorbikes)
    const thr = car.ctl ? car.ctl.thr : 0;
    S.popT = Math.max(0, S.popT - dt);
    if ((k === 'v8' || k === 'moto') && S.lastThr > 0.6 && thr < 0.1 && rn > 0.45) S.popT = 0.6;
    S.lastThr = thr;
    N.pg.gain.setTargetAtTime(S.popT > 0 && Math.random() < 0.35 ? 0.5 * S.popT : 0, t, 0.01);
    // overall level: louder under load; big engines louder; a shift dips it
    // (×0.825: Jonay, «que no sea muy exagerado, que deje oír bien la música» → 0.75; luego «sube un 10 %»)
    const lvl = 0.825 * (k === 'bigdiesel' ? 0.075 : k === 'v8' ? 0.07 : k === 'moto' ? 0.065 : 0.055) * (0.55 + 0.45 * L) * (S.shiftT > 0.12 ? 0.75 : 1);
    N.out.gain.setTargetAtTime(lvl, t, 0.06);
  }
  return {
    update,
    get state() {
      return S;
    },
    profileOf: engProfileOf
  };
})();
// ---------- v1.4.45 (Jonay, 23-nov: «buena idea… aplícalo también, pero el sonido de todos en general que no sea muy
// exagerado, que deje oír bien la música»): the engines of the cars around the player. Three light voices (the firing
// frequency and its half, filtered) go to the three nearest moving cars, each with its own engine profile (ENG_PROFILES)
// and a gear guessed from its speed. Quiet: they fade from ~12 m and are silent past 70 m; panned left/right by where
// the car is, with the Doppler effect (the pitch drops as a car passes by). The electric ones only whistle.
const NEAR_ENGINES = (() => {
  const NV = 3,
    MAXD = 70,
    C = 343; // speed of sound, m/s
  let V = null;
  const _tmp = { list: [] };
  function build(ctx, out) {
    const voices = [];
    for (let i = 0; i < NV; i++) {
      const v = { car: null };
      v.o1 = ctx.createOscillator();
      v.o1.type = 'sawtooth';
      v.o2 = ctx.createOscillator();
      v.o2.type = 'square';
      v.g2 = ctx.createGain();
      v.g2.gain.value = 0.45;
      v.lp = ctx.createBiquadFilter();
      v.lp.type = 'lowpass';
      v.lp.frequency.value = 500;
      v.g = ctx.createGain();
      v.g.gain.value = 0;
      v.pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      v.o1.connect(v.lp);
      v.o2.connect(v.g2);
      v.g2.connect(v.lp);
      v.lp.connect(v.g);
      if (v.pan) {
        v.g.connect(v.pan);
        v.pan.connect(out);
      } else v.g.connect(out);
      v.o1.start();
      v.o2.start();
      voices.push(v);
    }
    return voices;
  }
  /** a gear guessed from the speed: the highest one that keeps the revs above ~1.3× idle (pulling away: the first) */
  function rpmOf(P, speed) {
    if (P.kind === 'ev') return (speed / (2 * Math.PI * P.wheel)) * 60 * P.gears[0];
    const wheelRpm = (speed / (2 * Math.PI * P.wheel)) * 60;
    let rpm = P.idle;
    for (let g = 1; g <= P.gears.length; g++) {
      rpm = wheelRpm * P.gears[g - 1] * P.fin;
      if (rpm < P.red * 0.62) break;
    }
    return Math.max(P.idle, Math.min(P.red, rpm));
  }
  function update(dt, t) {
    const ctx = AUDIO.ctx;
    if (!ctx || !AUDIO.master) return;
    if (!V) V = build(ctx, AUDIO.master);
    const lx = camera.position.x,
      lz = camera.position.z,
      me = PLAYER.car;
    // the nearest cars (not the player's), moving or with the engine on
    const L = _tmp.list;
    L.length = 0;
    for (const c of CARS) {
      if (c === me || c.dead || c.health <= 0) continue;
      const d = Math.hypot(c.x - lx, c.z - lz);
      if (d < MAXD) L.push([d, c]);
    }
    L.sort((a, b) => a[0] - b[0]);
    const want = L.slice(0, NV).map((e) => e[1]);
    // keep a voice on its car while it stays among the nearest
    for (const v of V) if (v.car && !want.includes(v.car)) v.car = null;
    for (const c of want) if (!V.some((v) => v.car === c)) {
      const free = V.find((v) => !v.car);
      if (free) free.car = c;
    }
    // the listener's right, for the panning
    camera.getWorldDirection(_dir);
    const rx = -_dir.z,
      rz = _dir.x;
    for (const v of V) {
      const c = v.car;
      if (!c) {
        v.g.gain.setTargetAtTime(0, t, 0.15);
        continue;
      }
      if (!c.engP) c.engP = engProfileOf(c);
      const P = c.engP,
        dx = c.x - lx,
        dz = c.z - lz,
        d = Math.max(1, Math.hypot(dx, dz)),
        sp = Math.hypot(c.vx || 0, c.vz || 0);
      // Doppler: the part of the car's speed towards the listener
      const toward = -((c.vx || 0) * dx + (c.vz || 0) * dz) / d;
      const dop = clamp(C / (C - toward), 0.8, 1.25);
      const rpm = rpmOf(P, sp);
      const thr = c.ctl ? Math.max(0, c.ctl.thr) : 0.3;
      const near = 1 / (1 + Math.pow(d / 12, 1.5)),
        fade = clamp((MAXD - d) / 15, 0, 1);
      if (P.kind === 'ev') {
        v.o1.frequency.setTargetAtTime((180 + rpm * 0.09) * dop, t, 0.05);
        v.o2.frequency.setTargetAtTime((180 + rpm * 0.09) * 0.5 * dop, t, 0.05);
        v.lp.frequency.setTargetAtTime(900, t, 0.1);
        v.g.gain.setTargetAtTime(0.006 * near * fade * Math.min(1, sp / 4), t, 0.1);
      } else {
        const f = (rpm / 60) * (P.cyl / 2) * dop;
        v.o1.frequency.setTargetAtTime(f, t, 0.05);
        v.o2.frequency.setTargetAtTime(f * 0.5, t, 0.05);
        v.lp.frequency.setTargetAtTime((220 + 900 * ((rpm - P.idle) / (P.red - P.idle)) + 500 * thr) * (P.kind === 'bigdiesel' ? 0.7 : 1), t, 0.08);
        const big = P.kind === 'bigdiesel' ? 1.6 : P.kind === 'v8' ? 1.4 : P.kind === 'moto' ? 1.2 : 1;
        v.g.gain.setTargetAtTime(0.012 * big * (0.5 + 0.5 * thr) * near * fade, t, 0.1);
      }
      if (v.pan) v.pan.pan.setTargetAtTime(clamp((dx * rx + dz * rz) / d, -0.85, 0.85), t, 0.1);
    }
  }
  const _dir = new THREE.Vector3();
  return { update };
})();
