// ============ RECREATIVAS (v0.80, Jonay: «los minijuegos van a ser el alma del juego… que rememoren lo que teníamos
// hace más de 30 años») ============
// One engine for every arcade machine of the game (El Blanco's, the bars', the toy shops' and, later, the console at
// home): a cabinet on the screen (marquee, bezel, glass, scan lines), the 80s cycle (attract mode with the demo and the
// hi-score table · INSERT COIN · START · GAME OVER · CONTINUE? 9…0 · enter your 3 initials), a chiptune sequencer
// (square / triangle / noise channels on the game's audio context), pixel sprites drawn from character maps, and the
// hi-scores saved with the game (GANG.arcade). The games themselves are in their own files (ARCADE.GAMES[id]).
// Keys: the same as every minigame: A = E / left click, B = Espacio, arriba = ↑/W, Q / right click = coin; Esc leaves.
const ARCADE = (() => {
  const W = 480, H = 336;                    // the board's screen (logical px; v0.80.1: 480×336 — Jonay: 400×280 made Bencomo too big, you saw too little)
  const CW = 1280, CH = 960, SS = 2.25;      // the cabinet canvas and the screen scale on it (logical units)
  // v0.82.2 (Jonay: «parece un filtro, líneas duplicadas… más nítido»): the board's screen is drawn straight at its final
  // size (before: a 480×336 picture blown up ×2.25 with hard pixels, some rows came out double); the CRT scan lines are
  // off unless SETTINGS.crt === true
  // v0.82.2 (Jonay: «los gráficos deben ser a la resolución que se juega»): the canvas takes the size of the window in
  // real pixels (× devicePixelRatio), so nothing is stretched or shrunk afterwards: one pixel drawn = one pixel shown
  let KR = 1.5, RS = SS * KR;
  const SX = Math.round((CW - W * SS) / 2), SY = 136;
  const GAMES = {};
  let cv = null, cx = null, scr = null, sx = null, running = false, raf = 0, last = 0, acc = 0;
  let M = null, G = null, st = null, onClose = null;
  let suspended = false; // v0.86: a cartridge playing its match in the 2D basket / football game (the console waits behind)
  const IN = MINI.input(() => running && !suspended), { held, hit } = IN;
  // ---------- saved data: hi-scores per machine, what you own
  function data() { const g = window.GANG || (window.__ARC || (window.__ARC = {})); /* GANG is saved with the game */ if (!g.arcade) g.arcade = { scores: {}, bought: [], console: false, invited: false }; return g.arcade; }
  const DEFAULT_NAMES = ['BLA', 'COC', 'SAS', 'BOC', 'CHO', 'AYO', 'GUA', 'TIN', 'YAI', 'MEN'];
  function table(key, game) { const d = data(); if (!d.scores[key]) { const base = game.baseScore || 5000; d.scores[key] = DEFAULT_NAMES.map((n, i) => [n, Math.round(base * (10 - i) / 10 / 50) * 50]); } return d.scores[key]; }
  function qualifies(key, game, s) { const t = table(key, game); return s > t[t.length - 1][1]; }
  function addScore(key, game, name, s) { const t = table(key, game); t.push([name, s]); t.sort((a, b) => b[1] - a[1]); t.length = 10; return t.findIndex((r) => r[0] === name && r[1] === s); }
  // ---------- pixel sprites: rows of characters + a palette; cached canvases (flipped copies too)
  const SPR = new Map();
  function sprite(key, rows, pal, w) {
    if (SPR.has(key)) return SPR.get(key);
    const ww = w || Math.max(...rows.map((r) => r.length)), hh = rows.length; const c = mkCanvas(ww, hh), x = c.getContext('2d');
    rows.forEach((r, j) => { for (let i = 0; i < ww; i++) { const ch = r[i]; if (!ch || ch === '.' || ch === ' ') continue; const col = pal[ch]; if (!col) continue; x.fillStyle = col; x.fillRect(i, j, 1, 1); } });
    const f = mkCanvas(ww, hh), fx = f.getContext('2d'); fx.translate(ww, 0); fx.scale(-1, 1); fx.drawImage(c, 0, 0);
    const s = { c, f, w: ww, h: hh }; SPR.set(key, s); return s;
  }
  // double-resolution copy of a sprite (for worlds drawn at ×2): scale2x (EPX) of the pixel art — rounded diagonals
  // instead of plain doubled pixels —, a thin dark outline and a little light on the top edges
  function hires(s) { if (s.h2) return s;
    const w = s.w, h = s.h, src = s.c.getContext('2d').getImageData(0, 0, w, h).data, px = new Uint32Array(src.buffer.slice(0)), W2 = w * 2, H2 = h * 2;
    const c = mkCanvas(W2, H2), x = c.getContext('2d'), out = x.createImageData(W2, H2), o = new Uint32Array(out.data.buffer);
    const at = (i, j) => (i < 0 || j < 0 || i >= w || j >= h ? 0 : px[j * w + i]);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const P0 = at(i, j), A = at(i, j - 1), B = at(i + 1, j), C = at(i - 1, j), D = at(i, j + 1); let e0 = P0, e1 = P0, e2 = P0, e3 = P0;
      if (C === A && C !== D && A !== B) e0 = A; if (A === B && A !== C && B !== D) e1 = B; if (D === C && D !== B && C !== A) e2 = C; if (B === D && B !== A && D !== C) e3 = D;
      o[(2 * j) * W2 + 2 * i] = e0; o[(2 * j) * W2 + 2 * i + 1] = e1; o[(2 * j + 1) * W2 + 2 * i] = e2; o[(2 * j + 1) * W2 + 2 * i + 1] = e3; }
    const d = out.data, op = (k) => d[k * 4 + 3] > 40;
    for (let j = 0; j < H2; j++) for (let i = 0; i < W2; i++) { const k = j * W2 + i; if (!op(k)) continue; if (j > 0 && !op(k - W2)) { d[k * 4] = Math.min(255, d[k * 4] * 1.18 + 10); d[k * 4 + 1] = Math.min(255, d[k * 4 + 1] * 1.18 + 10); d[k * 4 + 2] = Math.min(255, d[k * 4 + 2] * 1.18 + 10); } }
    const edge = []; for (let j = 0; j < H2; j++) for (let i = 0; i < W2; i++) { const k = j * W2 + i; if (op(k)) continue; if ((i > 0 && op(k - 1)) || (i < W2 - 1 && op(k + 1)) || (j > 0 && op(k - W2)) || (j < H2 - 1 && op(k + W2))) edge.push(k); }
    for (const k of edge) { d[k * 4] = 26; d[k * 4 + 1] = 16; d[k * 4 + 2] = 8; d[k * 4 + 3] = 200; }
    x.putImageData(out, 0, 0); const f = mkCanvas(W2, H2), fx = f.getContext('2d'); fx.translate(W2, 0); fx.scale(-1, 1); fx.drawImage(c, 0, 0); s.h2 = c; s.h2f = f; return s; }
  function draw(g, s, x, y, flip, alpha) { if (!s) return; if (alpha !== undefined) g.globalAlpha = alpha; const k = g.getTransform().a;
    if (k >= 2) { hires(s); g.drawImage(flip ? s.h2f : s.h2, Math.round(x * 2) / 2, Math.round(y * 2) / 2, s.w, s.h); } else g.drawImage(flip ? s.f : s.c, Math.round(x), Math.round(y));
    if (alpha !== undefined) g.globalAlpha = 1; }
  // pixel text (the 8×8 font of every 80s board)
  function txt(g, s, x, y, col = '#fff', size = 8, align = 'left', shadow = true) { g.font = `${size}px "Press Start 2P", monospace`; g.textAlign = align; g.textBaseline = 'top';
    if (shadow) { g.fillStyle = '#000'; g.fillText(s, Math.round(x) + 1, Math.round(y) + 1); } g.fillStyle = col; g.fillText(s, Math.round(x), Math.round(y)); }
  // ---------- chiptune: square, square, triangle and noise; songs as strings of notes per channel (one token = one step)
  const NOTE = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
  const freq = (n) => { const m = /^([A-G]#?)(\d)$/.exec(n); if (!m) return 0; return 440 * Math.pow(2, (NOTE[m[1]] + 12 * (+m[2] + 1) - 69) / 12); };
  const MUS = { song: null, step: 0, next: 0, timer: 0, out: null, fx: null, vol: 0.55 };
  function audio() { const ctx = AUDIO.ctx; if (!ctx || !AUDIO.master) return null; if (!MUS.out) { MUS.out = ctx.createGain(); MUS.out.gain.value = MUS.vol * 0.11; MUS.out.connect(AUDIO.master); MUS.fx = ctx.createGain(); MUS.fx.gain.value = MUS.vol * 0.22; MUS.fx.connect(AUDIO.master); } return ctx; } // v0.84 (Jonay: «la música, menos protagonismo»): the music lower, the effects on their own louder bus
  function parse(s) { return s.trim().split(/\s+/); }
  function music(song) { stopMusic(); const ctx = audio(); if (!ctx || !song) return; MUS.song = { ...song, ch: song.ch.map((c) => ({ ...c, t: Array.isArray(c.n) ? (c.form || c.n.map((_, i) => i)).map((i) => parse(c.n[i])).flat() : parse(c.n) })) }; /* v0.84: a channel can be several phrases played in a «form» (A B A C…): longer, less repetitive tunes */ MUS.step = 0; MUS.next = ctx.currentTime + 0.08;
    MUS.timer = setInterval(schedule, 40); schedule(); }
  function stopMusic() { if (MUS.timer) clearInterval(MUS.timer); MUS.timer = 0; MUS.song = null; }
  function schedule() { const ctx = AUDIO.ctx, S = MUS.song; if (!ctx || !S || !running) return; const dt = 60 / S.bpm / (S.div || 4);
    while (MUS.next < ctx.currentTime + 0.15) { for (const c of S.ch) { const tok = c.t[MUS.step % c.t.length]; if (!tok || tok === '-' || tok === '.') continue; let len = 1; for (let k = 1; k < 8 && c.t[(MUS.step + k) % c.t.length] === '.'; k++) len++;
        if (c.w === 'noise') drum(ctx, tok, MUS.next, c.v || 1); else blip(ctx, c.w, freq(tok), MUS.next, dt * len * (c.legato || 0.85), (c.v || 1) * 0.5, c.duty); }
      MUS.next += dt; MUS.step++; if (S.loop === false && MUS.step >= S.ch[0].t.length) { stopMusic(); return; } } }
  function blip(ctx, w, f, t, d, v, duty) { if (!f) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.type = w === 'tri' ? 'triangle' : 'square'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.005); g.gain.setValueAtTime(v * 0.8, t + d * 0.6); g.gain.linearRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(MUS.out); o.start(t); o.stop(t + d + 0.02); void duty; }
  function drum(ctx, k, t, v) { const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(), g = ctx.createGain();
    if (k === 'k') { const o = ctx.createOscillator(), og = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.12); og.gain.setValueAtTime(v * 0.9, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.14); o.connect(og); og.connect(MUS.out); o.start(t); o.stop(t + 0.16); return; }
    if (k === 'c' || k === 'r') { const n = k === 'r' ? 3 : 1; for (let i = 0; i < n; i++) { const s2 = ctx.createBufferSource(); s2.buffer = AUDIO.noise; const f2 = ctx.createBiquadFilter(), g2 = ctx.createGain(); f2.type = 'bandpass'; f2.frequency.value = 3200 + i * 400; f2.Q.value = 3; const t2 = t + i * 0.035; g2.gain.setValueAtTime(v * 0.55, t2); g2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.03); s2.connect(f2); f2.connect(g2); g2.connect(MUS.out); s2.start(t2, Math.random()); s2.stop(t2 + 0.05); } return; } // castanets: a click (c) or a roll (r)
    f.type = k === 's' ? 'bandpass' : 'highpass'; f.frequency.value = k === 's' ? 1800 : 7000; g.gain.setValueAtTime(v * (k === 's' ? 0.5 : 0.22), t); g.gain.exponentialRampToValueAtTime(0.001, t + (k === 's' ? 0.12 : 0.04));
    s.connect(f); f.connect(g); g.connect(MUS.out); s.start(t, Math.random()); s.stop(t + 0.15); }
  // sound effects (their own little synth voices)
  function sfx(kind) { const ctx = audio(); if (!ctx) return; const t = ctx.currentTime, g = ctx.createGain(); g.connect(MUS.fx); const o = ctx.createOscillator(); let d = 0.12;
    const env = (v, dd) => { d = dd; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + dd); };
    switch (kind) {
      case 'jump': o.type = 'square'; o.frequency.setValueAtTime(260, t); o.frequency.exponentialRampToValueAtTime(620, t + 0.12); env(0.35, 0.14); break;
      case 'vault': o.type = 'square'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.28); env(0.4, 0.3); break;
      case 'hit': o.type = 'square'; o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(90, t + 0.1); env(0.5, 0.12); break;
      case 'pew': o.type = 'triangle'; o.frequency.setValueAtTime(1500, t); o.frequency.exponentialRampToValueAtTime(520, t + 0.06); env(0.12, 0.07); break; // the ship's shot (v0.83.2: softer)
      case 'zap': o.type = 'sawtooth'; o.frequency.setValueAtTime(2200, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.12); env(0.06, 0.13); break; // the laser
      case 'bite': o.type = 'square'; o.frequency.setValueAtTime(160, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.12); env(0.4, 0.14); break; // a lizard's bite
      case 'whoosh': { const s2 = ctx.createBufferSource(); s2.buffer = AUDIO.noise; const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.setValueAtTime(400, t); f2.frequency.exponentialRampToValueAtTime(2400, t + 0.25); s2.connect(f2); f2.connect(g); env(0.25, 0.28); s2.start(t); s2.stop(t + 0.3); return; } // a somersault, a leap
      case 'tic': o.type = 'triangle'; o.frequency.setValueAtTime(2400, t); o.frequency.exponentialRampToValueAtTime(1500, t + 0.04); env(0.1, 0.05); break; // a hit that doesn't kill
      case 'pop': { const s2 = ctx.createBufferSource(); s2.buffer = AUDIO.noise; const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 900; s2.connect(f2); f2.connect(g); env(0.35, 0.22); s2.start(t); s2.stop(t + 0.25); return; } // a small ship blows up
      case 'swing': o.type = 'triangle'; o.frequency.setValueAtTime(700, t); o.frequency.exponentialRampToValueAtTime(200, t + 0.08); env(0.3, 0.09); break;
      case 'coin': o.type = 'square'; o.frequency.setValueAtTime(988, t); o.frequency.setValueAtTime(1319, t + 0.07); env(0.35, 0.28); break;
      case 'pick': o.type = 'square'; o.frequency.setValueAtTime(1046, t); o.frequency.setValueAtTime(1568, t + 0.05); env(0.25, 0.1); break;
      case 'life': o.type = 'square'; [523, 659, 784, 1046, 1318].forEach((f, i) => o.frequency.setValueAtTime(f, t + i * 0.07)); env(0.35, 0.45); break;
      case 'hurt': o.type = 'square'; o.frequency.setValueAtTime(300, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.3); env(0.45, 0.32); break;
      case 'boom': { const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; s.connect(f); f.connect(g); env(0.7, 0.45); s.start(t); s.stop(t + 0.5); return; }
      case 'shot': { const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1500; s.connect(f); f.connect(g); env(0.5, 0.18); s.start(t); s.stop(t + 0.2); return; }
      case 'bark': o.type = 'square'; o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(240, t + 0.09); env(0.3, 0.1); break;
      case 'start': o.type = 'square'; [392, 523, 659, 784].forEach((f, i) => o.frequency.setValueAtTime(f, t + i * 0.09)); env(0.35, 0.45); break;
      case 'die': o.type = 'triangle'; [523, 494, 466, 440, 415, 392, 370, 349].forEach((f, i) => o.frequency.setValueAtTime(f, t + i * 0.09)); env(0.5, 0.8); break;
      case 'clear': o.type = 'square'; [523, 659, 784, 659, 784, 1046].forEach((f, i) => o.frequency.setValueAtTime(f, t + i * 0.11)); env(0.4, 0.8); break;
      default: o.type = 'square'; o.frequency.setValueAtTime(440, t); env(0.2, 0.08);
    }
    o.connect(g); o.start(t); o.stop(t + d + 0.02); }
  // ---------- the cabinet
  function bezel() { // marquee with the game's title, the black bezel round the tube, the control panel (static: cached)
    if (M.bz) return M.bz; const c = mkCanvas(CW * KR, CH * KR), x = c.getContext('2d'); x.scale(KR, KR);
    const wood = x.createLinearGradient(0, 0, CW, 0); wood.addColorStop(0, '#120a06'); wood.addColorStop(0.5, '#2a1a10'); wood.addColorStop(1, '#120a06'); x.fillStyle = wood; x.fillRect(0, 0, CW, CH);
    const mq = x.createLinearGradient(0, 0, 0, 100); mq.addColorStop(0, M.game.marquee ? M.game.marquee[0] : '#3b1d5c'); mq.addColorStop(1, M.game.marquee ? M.game.marquee[1] : '#0d0618'); x.fillStyle = mq; x.fillRect(60, 10, CW - 120, 92);
    x.strokeStyle = '#d9b44a'; x.lineWidth = 4; x.strokeRect(62, 12, CW - 124, 88);
    x.font = '44px "Press Start 2P", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#000'; x.fillText(M.game.title, CW / 2 + 4, 52); x.fillStyle = M.game.titleCol || '#ffd400'; x.fillText(M.game.title, CW / 2, 48);
    if (M.game.sub) { x.font = '16px "Press Start 2P", monospace'; x.fillStyle = '#fff'; x.fillText(M.game.sub, CW / 2, 86); }
    x.fillStyle = '#050505'; x.beginPath(); x.roundRect(SX - 34, SY - 30, W * SS + 68, H * SS + 60, 30); x.fill();
    x.fillStyle = '#1a1a1a'; x.beginPath(); x.roundRect(SX - 14, SY - 12, W * SS + 28, H * SS + 24, 18); x.fill();
    const pan = x.createLinearGradient(0, CH - 60, 0, CH); pan.addColorStop(0, '#30323a'); pan.addColorStop(1, '#14151a'); x.fillStyle = pan; x.fillRect(40, CH - 58, CW - 80, 56);
    x.font = '13px "Press Start 2P", monospace'; x.fillStyle = '#c9c9c9'; x.textAlign = 'center';
    const K = (id) => CONTROLS.keyName(id).toUpperCase();
    x.fillText(M.game.help ? M.game.help(K) : `A: ${K('f_punch')}   B: ${K('f_kick')}   MONEDA: ${K('b_pass')}   SALIR: ESC`, CW / 2, CH - 30);
    return (M.bz = c);
  }
  let scan = null; function scanlines() { if (scan) return scan; const c = mkCanvas(W * SS * KR, H * SS * KR), x = c.getContext('2d'); x.scale(KR, KR); x.fillStyle = 'rgba(0,0,0,0.22)'; for (let y = 0; y < H * SS; y += 3.5) x.fillRect(0, Math.round(y) + 2, W * SS, 1); const gl = x.createRadialGradient(W * SS / 2, H * SS / 2, H * SS * 0.3, W * SS / 2, H * SS / 2, W * SS * 0.7); gl.addColorStop(0, 'rgba(0,0,0,0)'); gl.addColorStop(1, 'rgba(0,0,0,0.38)'); x.fillStyle = gl; x.fillRect(0, 0, W * SS, H * SS); return (scan = c); }
  function present() { cx.setTransform(1, 0, 0, 1, 0, 0); cx.imageSmoothingEnabled = false; cx.drawImage(bezel(), 0, 0); cx.drawImage(scr, Math.round(SX * KR), Math.round(SY * KR)); cx.setTransform(KR, 0, 0, KR, 0, 0); if (SETTINGS.crt === true) cx.drawImage(scanlines(), SX, SY, W * SS, H * SS);
    cx.fillStyle = 'rgba(255,255,255,0.035)'; cx.beginPath(); cx.ellipse(SX + W * SS * 0.3, SY + H * SS * 0.18, W * SS * 0.32, H * SS * 0.1, -0.2, 0, 7); cx.fill(); } // the glass's reflection
  // ---------- the 80s cycle
  const free = () => M.price === 0;
  function attract(dt) {
    if (M.console && hit('vP')) { toMenu(); return; } // the console at home: Q / right click back to the cartridges
    st.t += dt; const per = 26; const ph = st.t % per; // 0–6 title, 6–20 demo, 20–26 hi-scores
    if (ph < 6) st.view = 'title'; else if (ph < 20) { if (st.view !== 'demo') { st.view = 'demo'; G = M.game.create(api, { demo: true, loop: 0 }); } G.update(dt, demoPad); } else st.view = 'scores';
    if (hit('vP') && !free()) coin();
    if ((hit('vS') || hit('vT')) && (free() || st.credits > 0)) begin();
  }
  function coin() { if (PLAYER.money < M.price) { st.msg = ['NO TE LLEGA', '$' + M.price + ' POR PARTIDA']; st.msgT = 2; sfx('hurt'); return; } PLAYER.money -= M.price; st.credits++; st.paid += M.price; sfx('coin'); }
  function begin() { if (!free()) st.credits--; st.mode = 'play'; st.view = 'play'; G = M.game.create(api, { demo: false, loop: 0 }); st.score0 = 0; sfx('start'); if (M.game.onStart) M.game.onStart(M); }
  function play(dt) { G.update(dt, pad); if (G.over) { st.mode = 'cont'; st.contT = 9.99; stopMusic(); sfx('die'); } }
  function cont(dt) { st.contT -= dt * 0.9; if (hit('vP') && !free()) coin();
    if ((hit('vS') || hit('vT')) && (free() || st.credits > 0)) { if (!free()) st.credits--; G.continue(); st.mode = 'play'; sfx('start'); return; }
    if (hit('vS') || hit('vT')) st.contT -= 1; // pressing without a coin hurries the count, as on the real ones
    if (st.contT <= 0) { const s = G.score; if (s > 0 && qualifies(M.key, M.game, s)) { st.mode = 'name'; st.name = ['A', 'A', 'A']; st.ni = 0; st.nT = 30; } else toAttract(); } }
  const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ.!♥ ';
  function nameEntry(dt) { st.nT -= dt; const ch = st.name[st.ni]; let k = ABC.indexOf(ch);
    if (hit('vU') || hit('vR')) { k = (k + 1) % ABC.length; sfx('pick'); } if (hit('vD') || hit('vL')) { k = (k + ABC.length - 1) % ABC.length; sfx('pick'); } st.name[st.ni] = ABC[k];
    if (hit('vS') || hit('vT')) { st.ni++; sfx('coin'); if (st.ni >= 3) { st.rank = addScore(M.key, M.game, st.name.join(''), G.score); st.mode = 'attract'; st.t = 20; st.view = 'scores'; st.hl = st.name.join(''); SAVE && SAVE.dirty && SAVE.dirty(); } }
    if (st.nT <= 0) { st.rank = addScore(M.key, M.game, st.name.join(''), G.score); toAttract(); } }
  // ---------- v0.83: the GOFIO-8, the console at home (Jonay: «al iniciar, un menú para elegir el juego entre los que
  // tienes»): open({ console: [ids] }) starts on this menu; A plays the chosen cartridge (free play, its own hi-scores
  // «casa_<id>»), Q / right click on its title screen goes back to the menu, Esc switches it off
  const CONSOLE = { title: 'GOFIO-8', sub: 'LA CONSOLA DE TU CASA', marquee: ['#2a2a3a', '#0a0a12'], titleCol: '#7fe0ff',
    help: (K) => `↑↓ ELEGIR  A JUGAR: ${K('f_punch')}  MENÚ: ${K('b_pass')}  ESC APAGAR`,
    music: { title: { bpm: 120, div: 4, loop: false, ch: [{ w: 'sq', v: 0.8, n: 'C5 E5 G5 C6 . . . . G5 . C6 . . . . . - . . .' }, { w: 'tri', v: 1, n: 'C3 . G3 . C3 . . . G2 . C3 . . . . .' }] } } };
  function toMenu() { M.game = CONSOLE; M.key = 'consola'; M.bz = null; st.mode = 'menu'; st.view = 'title'; st.t = 0; G = null; stopMusic(); music(CONSOLE.music.title); }
  function menu(dt) { st.t += dt; const L = M.console; if (hit('vU')) { st.sel = (st.sel + L.length - 1) % L.length; sfx('pick'); } if (hit('vD')) { st.sel = (st.sel + 1) % L.length; sfx('pick'); }
    if ((hit('vS') || hit('vT')) && st.t > 0.4) { const id = L[st.sel], g = GAMES[id]; if (!g) return; if (g.screen) { M.game = g; M.key = 'casa_' + id; M.bz = null; sfx('coin'); st.mode = 'ext'; st.t = 0; G = g.screen(api); if (g.music && g.music.title) music(g.music.title); else stopMusic(); return; } /* v0.86 (Jonay): Pachanga 3x3 / Play Furbito run all their screens inside the console */ M.game = g; M.key = 'casa_' + id; M.where = 'TU CASA'; M.bz = null; sfx('coin'); toAttract(); } }
  function drawMenu() { const g = sx; g.setTransform(RS, 0, 0, RS, 0, 0); g.imageSmoothingEnabled = false; const t = st.t;
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0a0a24'); gr.addColorStop(1, '#2a1a3a'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(255,255,255,${0.2 + ((i * 37) % 10) / 20})`; g.fillRect((i * 97 + t * 10) % W, (i * 53) % (H * 0.5), 1, 1); }
    const k = Math.min(1, t / 0.8); g.save(); g.globalAlpha = k; g.font = '40px "Press Start 2P", monospace'; g.textAlign = 'center'; g.textBaseline = 'top'; g.fillStyle = '#000'; g.fillText('GOFIO-8', W / 2 + 3, 28 + 3 - (1 - k) * 30);
    const lg = g.createLinearGradient(0, 28, 0, 68); lg.addColorStop(0, '#ffffff'); lg.addColorStop(0.5, '#7fe0ff'); lg.addColorStop(1, '#2f7fe0'); g.fillStyle = lg; g.fillText('GOFIO-8', W / 2, 28 - (1 - k) * 30); g.restore();
    txt(g, 'ENTERTAINMENT SYSTEM DE AGUERE', W / 2, 76, '#9fd7ff', 8, 'center'); txt(g, 'ELIGE UN CARTUCHO', W / 2, 104, '#ffd400', 8, 'center');
    M.console.forEach((id, i) => { const gm = GAMES[id], y = 128 + i * 40, on = i === st.sel; g.fillStyle = on ? 'rgba(255,212,0,0.18)' : 'rgba(0,0,0,0.35)'; g.fillRect(70, y - 6, W - 140, 32);
      if (on) { g.strokeStyle = Math.floor(t * 4) % 2 ? '#ffd400' : '#ff8a3a'; g.lineWidth = 1; g.strokeRect(70.5, y - 5.5, W - 141, 31); txt(g, '▶', 80, y + 4, '#ffd400', 10); }
      g.fillStyle = (gm && gm.marquee && gm.marquee[0]) || '#333'; g.fillRect(100, y - 2, 30, 24); g.fillStyle = (gm && gm.titleCol) || '#fff'; g.fillRect(104, y + 2, 22, 4);
      txt(g, gm ? gm.title : id, 142, y, on ? '#ffd400' : '#fff', 10); txt(g, gm && gm.sub ? gm.sub : '', 142, y + 14, '#9fd7ff', 6); });
    txt(g, '↑↓ ELEGIR   A JUGAR   ESC APAGAR', W / 2, H - 22, '#fff', 8, 'center'); }
  function toAttract() { st.mode = 'attract'; st.t = 0; st.view = 'title'; G = null; if (M.game.music && M.game.music.title) music(M.game.music.title); }
  // virtual pads: the player's, and the demo's (the game gives its own demo pilot)
  const pad = { held: (v) => held(v), hit: (v) => hit(v) };
  const demoPad = { held: (v) => !!(G && G.demoKeys && G.demoKeys.held[v]), hit: (v) => !!(G && G.demoKeys && G.demoKeys.hit[v]) };
  // ---------- drawing the screen per mode
  function render() {
    if (st.mode === 'menu') { drawMenu(); return; }
    if (st.mode === 'ext') { const g = sx; g.setTransform(RS, 0, 0, RS, 0, 0); g.imageSmoothingEnabled = false; G.draw(g, st.t); return; }
    const g = sx; g.setTransform(RS, 0, 0, RS, 0, 0); g.imageSmoothingEnabled = false;
    if (st.mode === 'play' || st.mode === 'cont' || st.view === 'demo') { G.draw(g); if (st.view === 'demo') { g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(0, H - 22, W, 22); blinkMsg(g); } }
    else if (st.view === 'scores') { M.game.drawBack ? M.game.drawBack(g, st.t) : (g.fillStyle = '#000', g.fillRect(0, 0, W, H)); drawScores(g); blinkMsg(g); }
    else { M.game.drawTitle(g, st.t); blinkMsg(g); }
    if (st.mode === 'cont') { g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(0, 0, W, H); txt(g, 'CONTINUE?', W / 2, 80, '#ffd400', 16, 'center'); txt(g, String(Math.max(0, Math.ceil(st.contT - 0.01))), W / 2, 110, '#fff', 24, 'center');
      txt(g, free() ? 'PULSA A' : st.credits > 0 ? 'PULSA A' : 'INSERT COIN', W / 2, 150, '#9fd7ff', 8, 'center'); }
    if (st.mode === 'name') { g.fillStyle = '#000'; g.fillRect(0, 0, W, H); txt(g, '¡NUEVO RÉCORD!', W / 2, 40, '#ffd400', 12, 'center'); txt(g, String(G.score).padStart(7, '0'), W / 2, 64, '#fff', 12, 'center');
      txt(g, 'TUS INICIALES', W / 2, 96, '#9fd7ff', 8, 'center'); for (let i = 0; i < 3; i++) { const on = i === st.ni && Math.floor(performance.now() / 250) % 2 === 0; txt(g, st.name[i], W / 2 - 30 + i * 30, 118, i === st.ni ? (on ? '#ffd400' : '#fff') : '#7fe08a', 20, 'center'); }
      txt(g, '↑↓ LETRA   A SIGUIENTE', W / 2, 160, '#aaa', 8, 'center'); txt(g, String(Math.ceil(st.nT)), W - 20, 10, '#ff6b6b', 8, 'right'); }
    // credits / free play, always at the bottom like the real ones
    if (st.mode !== 'name') txt(g, free() ? 'FREE PLAY' : `CREDIT ${st.credits}`, W - 6, H - 10, '#fff', 8, 'right');
    if (st.msgT > 0) { g.fillStyle = 'rgba(0,0,0,0.8)'; g.fillRect(40, 90, W - 80, 40); txt(g, st.msg[0], W / 2, 98, '#ff6b6b', 8, 'center'); txt(g, st.msg[1], W / 2, 114, '#fff', 8, 'center'); }
  }
  function blinkMsg(g) { if (M.console) txt(g, 'Q: VOLVER AL MENÚ DE LA GOFIO-8', 6, H - 10, '#9fd7ff', 6); if (Math.floor(performance.now() / 500) % 2) return; const t = free() ? 'PULSA A PARA JUGAR' : st.credits > 0 ? 'PULSA A PARA JUGAR' : 'INSERT COIN  ($' + M.price + ')'; txt(g, t, W / 2, H - 18, '#ffd400', 8, 'center'); }
  function drawScores(g) { const t = table(M.key, M.game); txt(g, 'MEJORES PUNTUACIONES', W / 2, 18, '#ffd400', 8, 'center'); txt(g, M.where || '', W / 2, 30, '#9fd7ff', 8, 'center');
    t.forEach(([n, s], i) => { const y = 58 + i * 18, hl = st.hl === n && i === st.rank, c = hl && Math.floor(performance.now() / 200) % 2 ? '#ffd400' : ['#ff6b6b', '#ffb347', '#ffd400', '#7fe08a', '#5ec8ff'][i % 5];
      txt(g, `${String(i + 1).padStart(2, ' ')}`, W / 2 - 100, y, c); txt(g, String(s).padStart(7, '0'), W / 2 - 50, y, c); txt(g, n, W / 2 + 70, y, c); }); }
  // ---------- loop
  function loop(now) { if (!running) return; raf = requestAnimationFrame(loop); const dt = Math.min(0.1, (now - last) / 1000); last = now; acc += dt;
    while (acc >= 1 / 60) { step(1 / 60); IN.frame(); acc -= 1 / 60; } render(); present(); }
  function step(dt) { if (!running || !M) return; /* v0.85: nothing after close (a cartridge that leaves the console) */ if (st.msgT > 0) st.msgT -= dt; if (st.mode === 'menu') menu(dt); else if (st.mode === 'attract') attract(dt); else if (st.mode === 'play') play(dt); else if (st.mode === 'cont') cont(dt); else if (st.mode === 'name') nameEntry(dt); else if (st.mode === 'ext') { st.t += dt; G.update(dt, pad); } }
  const api = { W, H, sprite, draw, txt, sfx, music, stopMusic, hi: () => (M ? table(M.key, M.game)[0][1] : 0), get money() { return PLAYER.money; },
    suspend, toMenu: () => { if (M && M.console) toMenu(); else close(); } };
  // v0.86: the console hides and waits while a cartridge plays its match in BASKET2D / FUTBOL2D; resume() brings it back
  // on the same screen (no 3D world in between, no pointer lock, no pause menu)
  function suspend(fn) { if (!running || suspended) return false; suspended = true; cancelAnimationFrame(raf); stopMusic(); IN.reset(); cv.style.display = 'none';
    let ok = false; try { ok = fn() !== false; } catch (e) { console.error('arcade suspend', e); } if (!ok) resume(); return ok; }
  function resume() { if (!running || !suspended) return; suspended = false; IN.reset(); MINI.show(cv, 'arcade'); document.exitPointerLock?.(); last = performance.now(); acc = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
    if (G && G.onResume) G.onResume(); }
  // ---------- public: open({ id: game id, key: hi-score table id, where: place name, price: $ per credit (0 = free) })
  function open(m, cb) {
    const game = m.console ? CONSOLE : GAMES[m.id]; if (!game || running || (typeof FIGHT2D !== 'undefined' && FIGHT2D.running)) return false;
    if (!cv) { cv = document.createElement('canvas'); cv.id = 'arcade'; cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;object-fit:contain;background:#000;z-index:28;display:none'; document.body.appendChild(cv); cx = cv.getContext('2d');
      scr = mkCanvas(8, 8); sx = scr.getContext('2d'); window.addEventListener('resize', () => { if (running) fit(); }); window.addEventListener('keydown', (e) => { if (running && !suspended && e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); if (e.repeat) return; /* v0.85.1 (Jonay): at home, Esc in a game goes back to the cartridges; Esc in the menu goes out to the 3D world, without the pause menu */ if (M && M.console && st.mode !== 'menu') { sfx('pick'); toMenu(); return; } GAME.noPauseT = performance.now() + 1500; close(); } }, true); }
    M = { ...m, game, key: m.key || m.id, price: m.price ?? 0, bz: null }; onClose = cb || null; running = true; fit();
    st = { mode: m.console ? 'menu' : 'attract', view: 'title', t: 0, credits: 0, paid: 0, msgT: 0, hl: null, rank: -1, sel: 0 }; G = null; IN.reset(); document.exitPointerLock?.();
    MINI.show(cv, 'arcade'); last = performance.now(); acc = 0; raf = requestAnimationFrame(loop); if (game.music && game.music.title) music(game.music.title); return true;
  }
  function fit() { const dpr = window.devicePixelRatio || 1; const k = Math.max(0.5, Math.min((window.innerWidth || CW) * dpr / CW, (window.innerHeight || CH) * dpr / CH));
    KR = Math.round(k * 1000) / 1000; RS = SS * KR; cv.width = Math.round(CW * KR); cv.height = Math.round(CH * KR); scr.width = Math.round(W * RS); scr.height = Math.round(H * RS); if (M) M.bz = null; scan = null; }
  function close() { if (!running) return; running = false; suspended = false; cancelAnimationFrame(raf); stopMusic(); MINI.hide(cv, 'arcade', true); const r = { paid: st.paid }; M = null; G = null; if (onClose) onClose(r); }
  return { GAMES, CONSOLE, open, close, resume, get suspended() { return suspended; }, sprite, hires, draw, txt, sfx, music, stopMusic, data, table, api, get running() { return running; },
    _st: () => st, _game: () => G, _step: (n = 1) => { for (let i = 0; i < n; i++) { step(1 / 60); IN.frame(); } }, _press: IN.press, _render: () => { render(); present(); }, W, H };
})();
// ---------- where the machines are (v0.80): El Blanco's, free. When the mayor names the gang «Defensores de La Laguna»
// (GANG.defenders), El Blanco phones you: he has a machine at home and you can go and play whenever you like (it is not
// a mission). He also tells you about the bars and the toy shops (their machines come later).
const RECRE = (() => {
  let t = 0; const COL_ = '#ffb347'; const DOOR = [-772, -413]; // Jonay: the entrance of the Edificio Casa del Blanco (Teobaldo Power), right by the building
  const G_ = () => window.GANG || null;
  function invited() { const g = G_(); return !!(g && g.arcade && g.arcade.invited); }
  // v0.83.1 (Jonay): the entrance marked like the other places, a see-through cylinder of light, orange
  let bc = null; function beacon(dt) { const on = invited() && !PLAYER.interior; if (on && !bc) bc = BEACON.make(DOOR[0], DOOR[1], 2.6, 7, 0xffb347); if (!on && bc) { BEACON.free(bc); bc = null; } if (bc) BEACON.anim(bc, dt); }
  function update(dt) { beacon(dt); const g = G_(); if (!g || !g.defenders || invited() || GAME.state !== 'play' || MISSIONS.active || (DLG && DLG.open) || (window.__TALK && window.__TALK.cur)) { t = 0; return; }
    t += dt; if (t < 20 || t > 1e8) return; t = 1e9; const BL = 'Rayco «El Blanco» (por el móvil)';
    MISSIONS.kit.talk([[BL, '«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.'],
      [BL, 'Vente a mi casa cuando quieras y le das. Gratis, que es mía. Mi madre hace café. Y en las cafeterías y las tascas han puesto el <b>GUFO</b>, el de las navecitas... ¡jijiji, gufo!, a un duro la partida. Y en las jugueterías, <b>GUANCHE GUARRIORS</b>: el Mencey, el Pastor y la Mirladora contra Guayota... ¡mmm, a la orden!'],
      [MISSIONS.kit.CH, '¿Bencomo? ¿El del salto del pastor? Esa la pienso pasar entera.']], () => { const a = ARCADE.data(); a.invited = true; HUD.toast('La maquinita de El Blanco: búscala en su casa (cuadrado naranja en el minimapa) · lo tienes apuntado en el diario (J)', COL_, 6); }, 'Las recreativas'); }
  function near() { if (!invited() || PLAYER.car || PLAYER.interior) return null; return Math.hypot(PLAYER.x - DOOR[0], PLAYER.z - DOOR[1]) < 3.4 ? DOOR : null; }
  function use() { if (!near()) return false; ARCADE.open({ id: 'bencomo', key: 'blanco', where: 'CASA DE EL BLANCO', price: 0 }, () => HUD.toast('«Mmm... ¡brrr!» Vuelve cuando quieras, que la máquina no se va.', COL_, 3)); return true; }
  function prompt() { return near() ? `${CONTROLS.kbd('use')} Subir a casa de El Blanco a jugar a su máquina: BENCOMO` : ''; }
  function blips() { return invited() ? [[DOOR[0], DOOR[1], COL_]] : []; }
  return { update, use, prompt, blips, invited, DOOR, _bc: () => bc };
})();
