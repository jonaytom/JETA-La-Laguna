// ============ procedural audio ============
const AUDIO = (() => {
  let ctx = null, master, eng, engG, engF, eng2, skidG, sirenG, sirenOsc, ambG, noiseBuf;
  const A = { vol: 0.8 };
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    master = ctx.createGain(); master.gain.value = A.vol; master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = noiseBuf.getChannelData(0); let b = 0; for (let i = 0; i < d.length; i++) { d[i] = Math.random() * 2 - 1; }
    // engine
    engF = ctx.createBiquadFilter(); engF.type = 'lowpass'; engF.frequency.value = 600; engG = ctx.createGain(); engG.gain.value = 0;
    eng = ctx.createOscillator(); eng.type = 'sawtooth'; eng2 = ctx.createOscillator(); eng2.type = 'square';
    const g2 = ctx.createGain(); g2.gain.value = 0.35; eng.connect(engF); eng2.connect(g2); g2.connect(engF); engF.connect(engG); engG.connect(master); eng.start(); eng2.start();
    // skid
    const sk = ctx.createBufferSource(); sk.buffer = noiseBuf; sk.loop = true; const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1500; bp.Q.value = 2; skidG = ctx.createGain(); skidG.gain.value = 0; sk.connect(bp); bp.connect(skidG); skidG.connect(master); sk.start();
    // siren
    sirenOsc = ctx.createOscillator(); sirenOsc.type = 'square'; sirenOsc.frequency.value = 700; const lfo = ctx.createOscillator(); lfo.frequency.value = 0.9; lfo.type = 'square'; const lg = ctx.createGain(); lg.gain.value = 180; lfo.connect(lg); lg.connect(sirenOsc.frequency);
    const sf = ctx.createBiquadFilter(); sf.type = 'lowpass'; sf.frequency.value = 1800; sirenG = ctx.createGain(); sirenG.gain.value = 0; sirenOsc.connect(sf); sf.connect(sirenG); sirenG.connect(master); sirenOsc.start(); lfo.start();
    // city ambience
    const am = ctx.createBufferSource(); am.buffer = noiseBuf; am.loop = true; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 350; ambG = ctx.createGain(); ambG.gain.value = 0.05; am.connect(lp); lp.connect(ambG); ambG.connect(master); am.start();
  }
  function burst(dur, freq, vol, type = 'lowpass') { if (!ctx) return; const s = ctx.createBufferSource(); s.buffer = noiseBuf; const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; const g = ctx.createGain(); const t = ctx.currentTime; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + dur + 0.05); }
  function tone(freq, dur, vol, type = 'sine', when = 0) { if (!ctx) return; const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq; const g = ctx.createGain(); const t = ctx.currentTime + when; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05); }
  let birdT = 0;
  // footsteps: heel click + body thump on hard ground, soft crunch on grass/earth; running = harder and brighter
  function footstep(run, soft) { if (!ctx) return; const t = ctx.currentTime; const v = (run ? 1.0 : 0.6) * (0.85 + Math.random() * 0.3);
    if (!soft) { const s = ctx.createBufferSource(); s.buffer = noiseBuf; s.playbackRate.value = 0.9 + Math.random() * 0.3; const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = (run ? 2600 : 2000) + Math.random() * 600; f.Q.value = 1.2; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.11 * v, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045); s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + 0.06);
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.06); const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.0001, t); g2.gain.exponentialRampToValueAtTime(0.09 * v, t + 0.005); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.08); o.connect(g2); g2.connect(master); o.start(t); o.stop(t + 0.09); }
    else { const s = ctx.createBufferSource(); s.buffer = noiseBuf; const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900 + Math.random() * 400; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09 * v, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11); s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + 0.13); } }
  function jumpSfx() { if (!ctx) return; const t = ctx.currentTime; const s = ctx.createBufferSource(); s.buffer = noiseBuf; const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.5; f.frequency.setValueAtTime(500, t); f.frequency.exponentialRampToValueAtTime(2200, t + 0.18); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22); s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + 0.25);
    // little effort grunt
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(115, t + 0.13); const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 650; bp.Q.value = 4; const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.0001, t); g2.gain.exponentialRampToValueAtTime(0.05, t + 0.02); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.15); o.connect(bp); bp.connect(g2); g2.connect(master); o.start(t); o.stop(t + 0.17); }
  function landSfx(v) { if (!ctx) return; const k = clamp(v / 8, 0.3, 1.2); const t = ctx.currentTime; const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18 * k, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16); o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.18); burst(0.09, 1400, 0.08 * k, 'bandpass'); }
  return {
    init, A, footstep, jump: jumpSfx, land: landSfx, get ctx() { return ctx; }, get master() { return master; }, get noise() { return noiseBuf; },
    setVol(v) { A.vol = v; if (master) master.gain.value = v; },
    update(dt) {
      if (!ctx) return; const t = ctx.currentTime;
      const car = PLAYER.car;
      if (car) {
        const v = Math.abs(car.fwdV); const gear = Math.min(5, Math.floor(v / 11)); const rpm = (v - gear * 11) / 11 + (car.ctl.thr > 0 ? 0.25 : 0);
        const base = car.type === 'bus' || car.type === 'van' || car.type === 'truck' ? 35 : car.type === 'sport' ? 70 : car.type === 'moto' ? 85 : 50;
        const f = base + rpm * base * 1.4 + gear * 6;
        eng.frequency.setTargetAtTime(f, t, 0.05); eng2.frequency.setTargetAtTime(f * 0.5, t, 0.05);
        engF.frequency.setTargetAtTime(400 + car.ctl.thr * 900 + v * 10, t, 0.1);
        engG.gain.setTargetAtTime(car.health > 0 ? 0.06 + car.ctl.thr * 0.05 : 0, t, 0.1);
        skidG.gain.setTargetAtTime(clamp((car.slip - 4) / 10, 0, 0.25) * (car.speed > 5 ? 1 : 0), t, 0.05);
      } else { engG.gain.setTargetAtTime(0, t, 0.1); skidG.gain.setTargetAtTime(0, t, 0.05); }
      let sd = 1e9; for (const c of CARS) if (c.siren) sd = Math.min(sd, Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z));
      sirenG.gain.setTargetAtTime(sd < 400 ? clamp(0.09 * (1 - sd / 400), 0, 0.09) : 0, t, 0.1);
      ambG.gain.setTargetAtTime(0.035 + CARS.length * 0.0006, t, 0.5);
      birdT -= dt; if (birdT < 0) { birdT = rnd(2, 7); if (U.uNight.value < 0.3 && !car) { const f = rnd(2500, 4200); for (let i = 0; i < 3 + Math.random() * 4; i++) tone(f + rnd(-300, 300), 0.08, 0.015, 'sine', i * 0.11); } }
    },
    crash(v) { burst(0.35, 900, clamp(v / 20, 0.1, 0.7)); burst(0.8, 200, clamp(v / 25, 0.1, 0.6)); },
    thud(d) { burst(0.2, 300, clamp(0.4 - d / 100, 0.02, 0.4)); },
    horn() { tone(415, 0.45, 0.08, 'square'); tone(520, 0.45, 0.06, 'square'); },
    door() { burst(0.12, 250, 0.35); },
    step(k) { burst(0.05, 700 + Math.random() * 400, 0.04 * clamp(k, 0.3, 1.2), 'bandpass'); },
    wanted() { [660, 880, 660].forEach((f, i) => tone(f, 0.18, 0.06, 'triangle', i * 0.12)); },
    bell(d) { if (d > 250) return; const v = 0.12 * (1 - d / 250); tone(1400, 0.6, v); tone(1400, 0.6, v, 'sine', 0.35); },
    pickup() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, 0.07, 'triangle', i * 0.08)); },
    fail() { [392, 330, 262].forEach((f, i) => tone(f, 0.35, 0.07, 'triangle', i * 0.18)); },
    mumble(dur = 1.8) { if (!ctx) return; const t0 = ctx.currentTime; let t = 0; while (t < dur) { const len = 0.12 + Math.random() * 0.3; const o = ctx.createOscillator(); o.type = 'sawtooth'; const f0 = 95 + Math.random() * 45; o.frequency.setValueAtTime(f0, t0 + t); o.frequency.linearRampToValueAtTime(f0 * (0.8 + Math.random() * 0.4), t0 + t + len);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 350 + Math.random() * 500; bp.Q.value = 3; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0 + t); g.gain.exponentialRampToValueAtTime(0.12, t0 + t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + len);
      o.connect(bp); bp.connect(g); g.connect(master); o.start(t0 + t); o.stop(t0 + t + len + 0.05); t += len + Math.random() * 0.15; } },
    shot() { burst(0.16, 3200, 0.55); burst(0.45, 160, 0.5); },
    clink() { tone(2600, 0.18, 0.07, 'triangle'); tone(3400, 0.12, 0.05, 'triangle', 0.04); },
    empty() { tone(900, 0.04, 0.05, 'square'); },
    swing() { burst(0.12, 1800, 0.05, 'bandpass'); },
    cash() { tone(1318, 0.12, 0.06, 'square'); tone(1760, 0.3, 0.05, 'square', 0.1); },
  };
})();
