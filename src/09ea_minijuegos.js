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
  function show(cv, state) { GAME.state = state; document.body.classList.add('fighting'); cv.style.display = 'block'; if (AUDIO.init) AUDIO.init(); }
  function hide(cv, state, lock) { if (cv) cv.style.display = 'none'; document.body.classList.remove('fighting'); if (lock) { GAME.state = 'play'; GAME.lock(); } else if (GAME.state === state) GAME.state = 'play'; }
  return { input, snd, say, txt, turbo, banner, rows, endScreen, show, hide };
})();
