// ============ city ambience: birds, passing cars, people chatting, church bells, dogs, gulls ============
// All synthesized and positional (stereo pan relative to the camera + distance attenuation). Provisional sounds
// (see docs/10_assets.md): each emitter can later play recorded AudioBuffers instead.
const AMBIENCE = (() => {
  let out = null, ready = false, t = 0, birdT = 1, chatT = 2, dogT = 20, gullT = 30, lastHour = -1; const carV = [];
  const R = (a, b) => a + Math.random() * (b - a);
  function init() { const ctx = AUDIO.ctx; if (!ctx || ready) return !!ready; out = ctx.createGain(); out.gain.value = 1; out.connect(AUDIO.master); ready = true;
    for (let i = 0; i < 3; i++) { const o = ctx.createOscillator(); o.type = 'sawtooth'; const o2 = ctx.createOscillator(); o2.type = 'triangle'; const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500; const n = ctx.createBufferSource(); n.buffer = AUDIO.noise; n.loop = true; const nf = ctx.createBiquadFilter(); nf.type = 'bandpass'; nf.frequency.value = 700; nf.Q.value = 0.6; const ng = ctx.createGain(); ng.gain.value = 0.5;
      const g = ctx.createGain(); g.gain.value = 0; const p = ctx.createStereoPanner ? ctx.createStereoPanner() : ctx.createGain(); o.connect(f); o2.connect(f); n.connect(nf); nf.connect(ng); ng.connect(f); f.connect(g); g.connect(p); p.connect(out); o.start(); o2.start(); n.start(); carV.push({ o, o2, f, g, p, car: null }); }
    return true; }
  // pan/gain for a world point
  const _v = new THREE.Vector3();
  function spatial(x, z, ref = 30) { const cx = camera.position.x, cz = camera.position.z; const d = Math.hypot(x - cx, z - cz); _v.set(x - cx, 0, z - cz).normalize();
    const right = new THREE.Vector3(); camera.getWorldDirection(right); const rx = -right.z, rz = right.x; const rl = Math.hypot(rx, rz) || 1; const pan = clamp((_v.x * rx + _v.z * rz) / rl, -1, 1) * 0.85;
    return { d, pan, gain: 1 / (1 + (d / ref) ** 2) }; }
  function voice(node, pan) { const ctx = AUDIO.ctx; if (ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; node.connect(p); p.connect(out); } else node.connect(out); }
  function chirp(t0, f0, f1, dur, vol, pan) { const ctx = AUDIO.ctx; const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t0 + dur); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur); o.connect(g); voice(g, pan); o.start(t0); o.stop(t0 + dur + 0.02); }
  // species-ish calls: sparrow chips, canary trill, blackbird whistle, pigeon coo, turtle dove
  function bird(x, z) { const ctx = AUDIO.ctx, s = spatial(x, z, 25); if (s.gain < 0.02) return; const v = 0.05 * s.gain, t0 = ctx.currentTime + 0.02, k = Math.random();
    if (k < 0.35) { const n = 3 + (Math.random() * 6 | 0); for (let i = 0; i < n; i++) chirp(t0 + i * R(0.09, 0.16), R(3800, 4800), R(2600, 3400), 0.05, v, s.pan); }
    else if (k < 0.6) { const n = 10 + (Math.random() * 14 | 0), f = R(3200, 4200); for (let i = 0; i < n; i++) chirp(t0 + i * 0.045, f * R(0.95, 1.08), f * 1.25, 0.035, v * 0.8, s.pan); }
    else if (k < 0.8) { let tt = t0; for (let i = 0; i < 4; i++) { const f = R(1700, 2700); chirp(tt, f, f * R(0.8, 1.3), R(0.12, 0.3), v * 1.1, s.pan); tt += R(0.15, 0.32); } }
    else { for (let i = 0; i < 3; i++) { const tt = t0 + i * 0.55; const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(520, tt); o.frequency.linearRampToValueAtTime(430, tt + 0.38); const lfo = ctx.createOscillator(); lfo.frequency.value = 22; const lg = ctx.createGain(); lg.gain.value = 18; lfo.connect(lg); lg.connect(o.frequency);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(v * 0.9, tt + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.42); o.connect(g); voice(g, s.pan); o.start(tt); lfo.start(tt); o.stop(tt + 0.45); lfo.stop(tt + 0.45); } } }
  // a short burst of conversation: several voices, syllables with pitch contours, formant bandpass
  function chatter(x, z, people) { const ctx = AUDIO.ctx, s = spatial(x, z, 10); if (s.gain < 0.03) return; const t0 = ctx.currentTime + 0.02; let tt = 0;
    for (let turn = 0; turn < 2 + (Math.random() * 3 | 0); turn++) { const fem = Math.random() < 0.5, f0 = fem ? R(185, 240) : R(100, 140); const len = R(0.6, 1.6); let u = 0;
      while (u < len) { const sy = R(0.07, 0.17); const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f0 * R(0.9, 1.15), t0 + tt + u); o.frequency.linearRampToValueAtTime(f0 * R(0.85, 1.1), t0 + tt + u + sy);
        const b1 = ctx.createBiquadFilter(); b1.type = 'bandpass'; b1.frequency.value = R(400, 900); b1.Q.value = 5; const b2 = ctx.createBiquadFilter(); b2.type = 'bandpass'; b2.frequency.value = R(1100, 2300); b2.Q.value = 7; const g = ctx.createGain(); const vv = 0.06 * s.gain * Math.min(1.4, 0.6 + people * 0.2);
        g.gain.setValueAtTime(0.0001, t0 + tt + u); g.gain.exponentialRampToValueAtTime(vv, t0 + tt + u + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + tt + u + sy); o.connect(b1); o.connect(b2); b1.connect(g); b2.connect(g); voice(g, s.pan + R(-0.1, 0.1)); o.start(t0 + tt + u); o.stop(t0 + tt + u + sy + 0.02);
        u += sy + (Math.random() < 0.15 ? R(0.12, 0.3) : R(0.01, 0.05)); }
      tt += len + R(0.1, 0.5); }
    if (Math.random() < 0.25) { const tl = t0 + tt * R(0.3, 0.9); for (let i = 0; i < 4; i++) chirp(tl + i * 0.11, R(300, 420), R(240, 300), 0.09, 0.03 * s.gain, s.pan); } } // laugh
  function bell(x, z, strokes, big) { const ctx = AUDIO.ctx, s = spatial(x, z, 160); if (s.gain < 0.02) return; const t0 = ctx.currentTime + 0.05;
    for (let k = 0; k < strokes; k++) { const tt = t0 + k * 2.2; for (const [m, a, dec] of [[1, 1, 3.2], [2.0, 0.5, 2.2], [2.4, 0.35, 1.8], [3.0, 0.25, 1.2], [4.2, 0.18, 0.9], [0.5, 0.4, 4]]) { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = (big ? 196 : 262) * m; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.08 * a * s.gain, tt + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, tt + dec); o.connect(g); voice(g, s.pan); o.start(tt); o.stop(tt + dec + 0.05); } } }
  function dog(x, z) { const ctx = AUDIO.ctx, s = spatial(x, z, 40); const t0 = ctx.currentTime + 0.02; const n = 1 + (Math.random() * 4 | 0); const f = R(280, 520);
    for (let i = 0; i < n; i++) { const tt = t0 + i * R(0.25, 0.45); const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f, tt); o.frequency.exponentialRampToValueAtTime(f * 0.6, tt + 0.12); const b = ctx.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = 900; b.Q.value = 2; const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, tt); g.gain.exponentialRampToValueAtTime(0.06 * s.gain, tt + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.14); o.connect(b); b.connect(g); voice(g, s.pan); o.start(tt); o.stop(tt + 0.16); } }
  function gull(x, z) { const ctx = AUDIO.ctx, s = spatial(x, z, 60); const t0 = ctx.currentTime + 0.02; for (let i = 0; i < 3; i++) chirp(t0 + i * 0.35, R(1500, 1900), R(900, 1100), 0.3, 0.035 * s.gain, s.pan); }
  return {
    update(dt) {
      if (!AUDIO.ctx || AUDIO.ctx.state !== 'running') return; if (!ready && !init()) return; t += dt; const ctx = AUDIO.ctx; const night = U.uNight.value > 0.5; const inside = PLAYER.interior;
      out.gain.setTargetAtTime(inside ? 0.25 : PLAYER.car ? 0.55 : 1, ctx.currentTime, 0.3);
      // birds near trees, mostly in daylight
      birdT -= dt; if (birdT < 0) { birdT = night ? R(8, 20) : R(0.8, 3.5); let tr = null; for (let k = 0; k < 12; k++) { const c = TREES[Math.random() * TREES.length | 0]; if (c && Math.hypot(c[0] - PLAYER.x, c[1] - PLAYER.z) < 45) { tr = c; break; } }
        if (tr) bird(tr[0] + R(-2, 2), tr[1] + R(-2, 2)); else if (!night && Math.random() < 0.4) bird(PLAYER.x + R(-40, 40), PLAYER.z + R(-40, 40)); }
      // engines of the 3 nearest cars (not the player's)
      const near = []; for (const c of CARS) { if (c === PLAYER.car || c.health <= 0) continue; const d = Math.hypot(c.x - camera.position.x, c.z - camera.position.z); if (d < 70) near.push([d, c]); } near.sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < carV.length; i++) { const V = carV[i], e = near[i]; if (!e) { V.g.gain.setTargetAtTime(0, ctx.currentTime, 0.2); continue; } const c = e[1]; const v = Math.abs(c.fwdV || c.speed || 0); const s = spatial(c.x, c.z, 12);
        const base = c.type === 'bus' || c.type === 'truck' || c.type === 'van' ? 38 : c.type === 'moto' ? 90 : 55; const gear = Math.min(4, Math.floor(v / 9)); const f = base * (1 + (v - gear * 9) / 9 * 0.9 + gear * 0.12);
        V.o.frequency.setTargetAtTime(f, ctx.currentTime, 0.1); V.o2.frequency.setTargetAtTime(f * 0.5, ctx.currentTime, 0.1); V.f.frequency.setTargetAtTime(300 + v * 25, ctx.currentTime, 0.2);
        V.g.gain.setTargetAtTime((0.02 + Math.min(v, 20) * 0.003) * s.gain, ctx.currentTime, 0.15); if (V.p.pan) V.p.pan.setTargetAtTime(s.pan, ctx.currentTime, 0.1); }
      // people chatting: groups of 2+ pedestrians standing/walking close together near the player
      chatT -= dt; if (chatT < 0 && !inside) { chatT = R(1.5, 4); let best = null, bn = 1;
        for (const p of PEDS) { if (p.down > 0 || Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z) > 22) continue; let n = 1; for (const q of PEDS) if (q !== p && Math.hypot(q.x - p.x, q.z - p.z) < 3.5) n++; if (n > bn) { bn = n; best = p; } }
        if (best) chatter(best.x, best.z, bn); }
      // church bells on the hour (strokes = hour on a 12 h dial) and a short call at half past
      const hr = Math.floor(GAME.tod), half = GAME.tod - hr >= 0.5; const key = hr * 2 + (half ? 1 : 0);
      if (lastHour !== key) { if (lastHour >= 0 && hr >= 7 && hr <= 22) for (const [nm, x, z] of CHURCH_MARKS) if (/Concepción|Catedral/.test(nm)) bell(x, z, half ? 1 : (hr % 12 || 12), /Catedral/.test(nm)); lastHour = key; }
      dogT -= dt; if (dogT < 0) { dogT = R(15, 45); if (!inside) dog(PLAYER.x + R(-60, 60), PLAYER.z + R(-60, 60)); }
      gullT -= dt; if (gullT < 0) { gullT = R(40, 90); if (!night && !inside) gull(PLAYER.x + R(-80, 80), PLAYER.z + R(-80, 80)); }
    },
  };
})();
