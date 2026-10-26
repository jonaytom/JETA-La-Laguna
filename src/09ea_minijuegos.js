// ============ Shared pieces of the 2D minigames (v0.69, auditor: basketball and football repeated ~18 % of their code) ============
// Same keys for every minigame (Jonay): botón A = E / left click (vS), right click or Q (vP), B = Espacio (vT) and the
// walking keys for the directions. MINI.input(isRunning) gives each game its own set of virtual buttons; MINI.snd plays
// the little synthesised sounds; MINI.say is the speaker's voice; MINI.txt writes pixel text with a black outline.
const MINI = (() => {
  function vcode(k) { const has = (id) => CONTROLS.codes(id).includes(k);
    return has('f_punch') ? 'vS' : has('b_pass') ? 'vP' : has('f_kick') ? 'vT' : has('left') ? 'vL' : has('right') ? 'vR' : has('fwd') ? 'vU' : has('back') ? 'vD' : k === 'Enter' ? 'vS' : null; }
  function input(isRunning) {
    const keys = new Set(), pressedK = new Set(), releasedK = new Set();
    const press = (v, down) => { if (down) { if (!keys.has(v)) pressedK.add(v); keys.add(v); } else { if (keys.has(v)) releasedK.add(v); keys.delete(v); } };
    const onKey = (e, down) => { if (!isRunning()) return; const v = vcode(e.code); if (!v) return; e.preventDefault(); e.stopPropagation(); press(v, down); };
    window.addEventListener('keydown', (e) => onKey(e, true), true); window.addEventListener('keyup', (e) => onKey(e, false), true);
    window.addEventListener('mousedown', (e) => { if (!isRunning()) return; e.preventDefault(); e.stopPropagation(); if (e.button === 0) press('vS', true); if (e.button === 2) press('vP', true); }, true); // left = A, right = pass
    window.addEventListener('mouseup', (e) => { if (!isRunning()) return; if (e.button === 0) press('vS', false); if (e.button === 2) press('vP', false); }, true);
    window.addEventListener('contextmenu', (e) => { if (isRunning()) e.preventDefault(); }, true);
    return { keys, press, held: (v) => keys.has(v), hit: (v) => pressedK.has(v), rel: (v) => releasedK.has(v), consume(v) { pressedK.delete(v); }, clearHits() { pressedK.clear(); }, frame() { pressedK.clear(); releasedK.clear(); }, reset() { keys.clear(); pressedK.clear(); releasedK.clear(); } };
  }
  const tone = (ctx, g, type, f0, f1, vol, dur) => { const o = ctx.createOscillator(); o.type = type; const t = ctx.currentTime; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.8);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(g); o.start(t); o.stop(t + dur + 0.02); return o; };
  function noise(ctx, g, ftype, freq, q, vol, attack, dur) { const t = ctx.currentTime; const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = ftype; f.frequency.value = freq; if (q) f.Q.value = q;
    if (attack) { g.gain.setValueAtTime(0.001, t); g.gain.linearRampToValueAtTime(vol, t + attack); } else g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); s.connect(f); f.connect(g); s.start(t, Math.random()); s.stop(t + dur + 0.1); }
  function snd(kind) { const ctx = AUDIO.ctx, out = AUDIO.master; if (!ctx || !out) return; const g = ctx.createGain(); g.connect(out); const t = ctx.currentTime;
    switch (kind) {
      case 'bounce': tone(ctx, g, 'sine', 150, 60, 0.18, 0.1); return;
      case 'kick': tone(ctx, g, 'sine', 120, 45, 0.22, 0.09); return;
      case 'rim': tone(ctx, g, 'triangle', 520, 0, 0.08, 0.25); return;
      case 'post': tone(ctx, g, 'triangle', 760, 0, 0.08, 0.3); return;
      case 'buzzer': { const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 196; g.gain.setValueAtTime(0.06, t); g.gain.setValueAtTime(0.06, t + 0.7); g.gain.exponentialRampToValueAtTime(0.001, t + 0.8); o.connect(g); o.start(t); o.stop(t + 0.85); return; }
      case 'whistle': { const o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(); o.frequency.value = 2300; lfo.frequency.value = 28; lg.gain.value = 120; lfo.connect(lg); lg.connect(o.frequency);
        g.gain.setValueAtTime(0.05, t); g.gain.setValueAtTime(0.05, t + 0.45); g.gain.exponentialRampToValueAtTime(0.001, t + 0.5); o.connect(g); o.start(t); lfo.start(t); o.stop(t + 0.52); lfo.stop(t + 0.52); return; }
      case 'swish': noise(ctx, g, 'highpass', 2500, 0, 0.12, 0, 0.35); return;
      case 'goal': noise(ctx, g, 'bandpass', 800, 0.5, 0.16, 0.2, 2.4); return;
      default: noise(ctx, g, 'bandpass', 900, 0.6, 0.1, 0.15, 1.4); // crowd
    } }
  function say(text, rate = 1.15, pitch = 0.75) { try { const ss = window.speechSynthesis; if (!ss) return; const u = new SpeechSynthesisUtterance(text); const v = ss.getVoices().find((q) => /^es/i.test(q.lang)); if (v) u.voice = v; u.lang = 'es-ES'; u.rate = rate; u.pitch = pitch; u.volume = 0.9; ss.cancel(); ss.speak(u); } catch (e) { } }
  function txt(cx, s, x, y, size, col, align = 'center') { cx.font = `${size}px "Press Start 2P", monospace`; cx.textAlign = align; cx.textBaseline = 'top'; cx.fillStyle = '#000';
    for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) cx.fillText(s, x + a, y + b); cx.fillStyle = col; cx.fillText(s, x, y); }
  // HUD pieces both games draw the same way
  function turbo(cx, H, t) { cx.fillStyle = 'rgba(0,0,0,0.6)'; cx.fillRect(10, H - 16, 64, 8); cx.fillStyle = t > 0.25 ? '#5ec8ff' : '#ff6b6b'; cx.fillRect(11, H - 15, 62 * t, 6); txt(cx, 'TURBO', 42, H - 26, 6, '#fff'); }
  function banner(cx, st, W, y, size) { if (!(st.bannerT > 0 && st.banner)) return; const k = Math.min(1, (st.banner.dur - st.bannerT) * 6); txt(cx, st.banner.t, W / 2, y, Math.round(size + 6 * k), st.banner.c); }
  function rows(cx, W, list, y0) { list.forEach(([a, c], i) => { txt(cx, a, 74, y0 + i * 13, 6, '#9fd7ff', 'left'); txt(cx, c, W - 74, y0 + i * 13, 6, '#fff', 'right'); }); }
  function endScreen(cx, W, score) { const won = score[0] > score[1]; txt(cx, won ? '¡GANÁIS!' : 'HABÉIS PERDIDO', W / 2, 100, 16, won ? '#7fe08a' : '#ff6b6b'); txt(cx, `${score[0]} - ${score[1]}`, W / 2, 128, 10, '#fff'); }
  // the game's canvas in front of the 3D world, and back
  // v0.75 (Jonay): the game catches the keys while it runs, so a key held when it started (W…) never got its «up» in the
  // 3D world and the character went on running alone after the match: the walking keys are emptied on the way in and out
  function clearWorldInput() { KEYS.clear(); PRESSED.clear(); const T = INPUT.touch; T.x = T.y = 0; T.active = false; T.sprint = false; T.jump = false; T.hb = false; PLAYER.speed = 0; }
  function show(cv, state) { clearWorldInput(); GAME.state = state; document.body.classList.add('fighting'); cv.style.display = 'block'; if (AUDIO.init) AUDIO.init(); }
  function hide(cv, state, lock) { clearWorldInput(); if (cv) cv.style.display = 'none'; document.body.classList.remove('fighting'); if (lock) { GAME.state = 'play'; GAME.lock(); } else if (GAME.state === state) GAME.state = 'play'; }
  // v0.89 (Jonay: «todos los minijuegos necesitan pausa con la P, que se reanuda al volver a pulsarla»): P toggles the pause
  // of the minigame that is running (the sound stops too); pauseOverlay() darkens the frame and says PAUSA
  function pauser(isRunning) { const o = { on: false };
    window.addEventListener('keydown', (e) => { if (!isRunning() || e.code !== 'KeyP' || e.repeat) return; e.preventDefault(); e.stopPropagation(); o.on = !o.on; const ac = AUDIO.ctx; try { if (ac) (o.on ? ac.suspend() : ac.resume()); } catch (er) { } }, true);
    o.off = () => { if (o.on) { o.on = false; try { AUDIO.ctx && AUDIO.ctx.resume(); } catch (er) { } } }; return o; }
  function pauseOverlay(cx, W, H) { cx.fillStyle = 'rgba(0,0,0,0.55)'; cx.fillRect(0, 0, W, H); txt(cx, 'PAUSA', W / 2, H / 2 - 14, 16, '#ffd400'); txt(cx, 'PULSA P PARA SEGUIR', W / 2, H / 2 + 10, 6, '#fff'); }
  // ---------- v0.90 (Jonay: «en basket y fútbol, más que música, efectos del público: el organillo, el furor»). The crowd of
  // a match, all synthesised: the murmur underneath (it rises with the play), the «¡uuuh!» of a near miss, the roar and the
  // applause of a goal or a basket, the pavilion organ (the «charge», the riffs) and the «¡de-fen-sa!» chant with the
  // stomps; on the pitch the bombo; in the street fight, a ring of onlookers. One per match: start() / stop().
  function crowd(kind) { const ctx = AUDIO.ctx, out = AUDIO.master; if (!ctx || !out) return { tick() {}, ev() {}, stop() {} };
    const C = { basket: { mf: 900, mv: 0.022, ex: 0.05 }, futbol: { mf: 520, mv: 0.03, ex: 0.07 }, calle: { mf: 700, mv: 0.012, ex: 0.03 } }[kind] || { mf: 800, mv: 0.02, ex: 0.05 };
    const bus = ctx.createGain(); bus.gain.value = 1; bus.connect(out); const nodes = [];
    // the murmur: looped noise through a voice-like band, slowly breathing
    const src = ctx.createBufferSource(); src.buffer = AUDIO.noise; src.loop = true; const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = C.mf; bp.Q.value = 0.8;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800; const mg = ctx.createGain(); mg.gain.value = 0; mg.gain.setTargetAtTime(C.mv, ctx.currentTime, 0.8);
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.23; lg.gain.value = C.mv * 0.35; lfo.connect(lg); lg.connect(mg.gain);
    src.connect(bp); bp.connect(lp); lp.connect(mg); mg.connect(bus); src.start(); lfo.start(); nodes.push(src, lfo);
    let exc = 0, dead = false;
    const T = () => ctx.currentTime;
    const env = (g, t0, a, peak, hold, rel) => { g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(peak, t0 + a); g.gain.setValueAtTime(peak, t0 + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + hold + rel); };
    // a crowd of voices singing a vowel (detuned saws through two formants) — «uuuh», «aaah», a syllable of a chant
    function voices(t0, f0, glide, form, vol, a, hold, rel, n = 7) { const g = ctx.createGain(); env(g, t0, a, vol, hold, rel); const f1 = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter();
      f1.type = f2.type = 'bandpass'; f1.frequency.value = form[0]; f2.frequency.value = form[1]; f1.Q.value = 2.5; f2.Q.value = 3; const mixG = ctx.createGain(); mixG.gain.value = 1; f1.connect(mixG); f2.connect(mixG); mixG.connect(g); g.connect(bus);
      for (let i = 0; i < n; i++) { const o = ctx.createOscillator(); o.type = 'sawtooth'; const f = f0 * (0.82 + Math.random() * 0.4) * (i % 3 === 0 ? 2 : 1); o.frequency.setValueAtTime(f, t0); o.frequency.linearRampToValueAtTime(f * glide, t0 + a + hold + rel); o.connect(f1); o.connect(f2); o.start(t0); o.stop(t0 + a + hold + rel + 0.05); }
      const ns = ctx.createBufferSource(); ns.buffer = AUDIO.noise; const ng = ctx.createGain(); ng.gain.value = 0.35; ns.connect(ng); ng.connect(f1); ns.start(t0, Math.random()); ns.stop(t0 + a + hold + rel + 0.05); }
    function burst(t0, freq, type, q, vol, dur) { const s2 = ctx.createBufferSource(); s2.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; const g = ctx.createGain(); env(g, t0, 0.004, vol, 0, dur); s2.connect(f); f.connect(g); g.connect(bus); s2.start(t0, Math.random() * 1.5); s2.stop(t0 + dur + 0.05); }
    function thump(t0, f, vol, dur) { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(f * 1.6, t0); o.frequency.exponentialRampToValueAtTime(f, t0 + 0.05); env(g, t0, 0.005, vol, 0, dur); o.connect(g); g.connect(bus); o.start(t0); o.stop(t0 + dur + 0.05); }
    function claps(t0, dur, dens, vol) { for (let t = 0; t < dur; t += 1 / dens) burst(t0 + t + Math.random() / dens, 1800 + Math.random() * 1400, 'bandpass', 1.2, vol * (1 - (t / dur) * 0.6), 0.03); }
    // the pavilion organ: drawbars 8' 4' 2 2/3', a little vibrato, short notes
    function organ(t0, notes, vol = 0.045) { let t = t0; for (const [f, d] of notes) { if (f) { const g = ctx.createGain(); env(g, t, 0.008, vol, d * 0.8, 0.06); g.connect(bus);
        const vib = ctx.createOscillator(), vg = ctx.createGain(); vib.frequency.value = 6.2; vg.gain.value = f * 0.004; vib.connect(vg);
        for (const [h, a] of [[1, 0.55], [2, 0.3], [3, 0.18], [4, 0.08]]) { const o = ctx.createOscillator(), og = ctx.createGain(); o.type = 'sine'; o.frequency.value = f * h; vg.connect(o.frequency); og.gain.value = a; o.connect(og); og.connect(g); o.start(t); o.stop(t + d + 0.1); }
        vib.start(t); vib.stop(t + d + 0.1); } t += d; } return t; }
    const N = { G4: 392, A4: 440, B4: 494, C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880, C6: 1047 };
    const RIFFS = [[[N.G4, 0.14], [N.C5, 0.14], [N.E5, 0.14], [N.G5, 0.3], [0, 0.08], [N.E5, 0.14], [N.G5, 0.5]], // the «charge»
      [[N.C5, 0.12], [N.C5, 0.12], [N.D5, 0.12], [N.E5, 0.24], [N.D5, 0.12], [N.C5, 0.12], [N.G4, 0.3]],
      [[N.E5, 0.1], [N.G5, 0.1], [N.A5, 0.1], [N.G5, 0.1], [N.E5, 0.1], [N.G5, 0.1], [N.A5, 0.2], [N.C6, 0.3]],
      [[N.G4, 0.16], [N.G4, 0.16], [N.A4, 0.16], [N.B4, 0.16], [N.C5, 0.32], [N.G4, 0.32]]];
    const api = {
      // exc 0..1: how hot the play is (the murmur follows it)
      tick(dt, e = 0) { if (dead) return; exc += (e - exc) * Math.min(1, dt * 1.5); mg.gain.setTargetAtTime(C.mv * (1 + 2.2 * exc), T(), 0.3); },
      ev(name, k = 1) { if (dead) return; const t0 = T() + 0.02;
        switch (name) {
          case 'uuuh': voices(t0, 210, 0.82, [330, 820], C.ex * k, 0.12, 0.35, 0.9); break;                   // so close!
          case 'ooh': voices(t0, 240, 0.9, [400, 900], C.ex * 0.6 * k, 0.08, 0.15, 0.5, 5); break;             // a steal, a big hit
          case 'roar': burst(t0, 900, 'bandpass', 0.4, C.ex * 2.4 * k, 3.2); voices(t0, 260, 1.1, [750, 1250], C.ex * 1.3 * k, 0.25, 0.9, 1.6, 9); claps(t0 + 0.4, 2.6, 26, 0.04 * k); break;
          case 'cheer': burst(t0, 1000, 'bandpass', 0.5, C.ex * 1.2 * k, 1.4); voices(t0, 280, 1.05, [800, 1300], C.ex * 0.7 * k, 0.1, 0.3, 0.8, 6); claps(t0 + 0.2, 1.4, 18, 0.03 * k); break;
          case 'boo': voices(t0, 150, 0.95, [300, 700], C.ex * 0.7 * k, 0.2, 0.5, 0.8, 6); break;
          case 'claps': claps(t0, 1.6, 16, 0.03 * k); break;
          case 'charge': { const t1 = organ(t0, RIFFS[0]); voices(t1, 250, 1.0, [700, 1150], C.ex * 1.1, 0.04, 0.25, 0.5, 8); burst(t1, 1000, 'bandpass', 0.5, C.ex * 0.8, 0.7); break; } // ... «¡charge!»
          case 'organ': organ(t0, RIFFS[1 + ((Math.random() * (RIFFS.length - 1)) | 0)]); break;
          case 'defensa': { // «¡de-fen-sa!» + two stomps, twice
            for (let r = 0; r < 2; r++) { const b = t0 + r * 1.6; voices(b, 200, 1, [500, 1700], C.ex * 0.9, 0.02, 0.1, 0.1, 8); voices(b + 0.24, 210, 1, [480, 1750], C.ex * 1.0, 0.02, 0.16, 0.12, 8); voices(b + 0.52, 190, 0.97, [800, 1200], C.ex * 0.95, 0.02, 0.14, 0.14, 8);
              thump(b + 0.9, 70, 0.12, 0.18); thump(b + 1.2, 70, 0.12, 0.18); burst(b + 0.9, 220, 'lowpass', 0.7, 0.05, 0.12); burst(b + 1.2, 220, 'lowpass', 0.7, 0.05, 0.12); } break; }
          case 'bombo': for (const [d, v] of [[0, 1], [0.45, 1], [0.9, 0.8], [1.12, 0.8], [1.35, 1]]) { thump(t0 + d, 58, 0.16 * v * k, 0.3); burst(t0 + d, 160, 'lowpass', 0.7, 0.04 * v * k, 0.15); } claps(t0 + 1.6, 0.6, 10, 0.025); break; // the drum of the stand
          case 'squeak': { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'square'; o.frequency.setValueAtTime(1900 + Math.random() * 600, t0); o.frequency.linearRampToValueAtTime(2600 + Math.random() * 500, t0 + 0.06); env(g, t0, 0.004, 0.012 * k, 0.03, 0.03); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 4; o.connect(f); f.connect(g); g.connect(bus); o.start(t0); o.stop(t0 + 0.12); break; } // sneakers
          case 'step': burst(t0, 260, 'lowpass', 0.7, 0.025 * k, 0.05); break;
          case 'whoosh': burst(t0, 1400, 'bandpass', 1.5, 0.05 * k, 0.12); break;
          case 'net': burst(t0, 4200, 'highpass', 0.7, 0.07 * k, 0.25); burst(t0 + 0.05, 2600, 'bandpass', 2, 0.04 * k, 0.2); break;
          default: break; } },
      stop() { if (dead) return; dead = true; const t = T(); bus.gain.setTargetAtTime(0.0001, t, 0.15); setTimeout(() => { try { nodes.forEach((n) => n.stop()); bus.disconnect(); } catch (e) { } }, 600); } };
    return api; }
  return { input, snd, say, txt, turbo, banner, rows, endScreen, show, hide, clearWorldInput, pauser, pauseOverlay, crowd };
})();
