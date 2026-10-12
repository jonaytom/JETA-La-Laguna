// ============ «JETA JAM»: 2D basketball, 2 vs 2, in the style of the 90s arcade games (v0.65) ============
// Side view of the court, the same pixel-art sprites as the 2D fight (made from the players' real clothes). You and a
// friend of the gang against two rivals: turbo, passes, steals, shoves, blocks, dunks and «en llamas» after 3 baskets.
// Controls (Jonay, simple): HOLD the left mouse button (or E) to shoot and release it while the bar is in the green;
// right button (or Q) passes / steals (with turbo, a shove) and, defending away from the ball, switches to the other
// defender; defending, the shot button jumps to block; Espacio runs (turbo). Running + shooting from mid range =
// ENTRADA EN COMBO: the game stops and you have a few seconds to do one of the 4 specials of the 2D fight (same keys:
// directions + puño = left/E, patada = right/Espacio) for a different dunk. All keys in Opciones › Controles.
const BASKET2D = (() => {
  // v0.66 (Jonay): a closer view, twice the resolution, the camera scrolls to show the half where the ball is and a bit
  const W = 480, H = 270, R = 4, CL = 28, CW = 15;            // canvas (logical px, drawn at R×) and court (metres)
  const PXM = 30, PZM = 12.5, PYM = 30, SC = 2.3;             // px per metre along, in depth and in height; SC = size vs v0.65
  const X0 = 40, ZF = 70, ZN = ZF + CW * PZM, BGW = Math.round(2 * X0 + CL * PXM), BR = 2; // court in the world strip (BGW wide)
  let camX = 0;
  const wx = (x) => X0 + x * PXM;                             // world px (background); on screen it's minus the camera
  const sx = (x) => wx(x) - camX, sy = (z, y = 0) => ZF + z * PZM - y * PYM;
  const X1 = wx(CL);
  const HOOP = [{ x: 1.6, z: 7.5 }, { x: CL - 1.6, z: 7.5 }], RIM = 3.05, G = 9.8, THREE_PT = 6.75;
  let cv = null, cx = null, running = false, st = null, raf = 0, last = 0, acc = 0, onEnd = null;
  const keys = new Set(), pressedK = new Set(), releasedK = new Set();
  // ---------- sprites (same drawer as the fight; a few extra poses)
  const P = () => FIGHT2D.POSES;
  const EXTRA = {
    shoot: { tl: 0, sF: 165, eF: -35, sB: 150, eB: -45, hF: 10, kF: -20, hB: -5, kB: -20, dy: -2 },
    dunk: { tl: -6, sF: 175, eF: -5, sB: 120, eB: -20, hF: 40, kF: -60, hB: 10, kB: -40, dy: -4 },
    defend: { tl: 4, sF: 125, eF: -25, sB: 115, eB: -30, hF: 22, kF: -30, hB: -18, kB: -28, dy: 3 },
  };
  const SPR = new Map();
  function sprites(look, nose) {
    const key = JSON.stringify(look) + nose; if (SPR.has(key)) return SPR.get(key);
    const s = {}, pz = P();
    for (const k of ['idle0', 'idle1', 'walk0', 'walk1', 'walk2', 'walk3', 'jump', 'jab1', 'ko', 'win']) s[k] = FIGHT2D.figure(look, pz[k], nose);
    for (let i = 0; i < 4; i++) s['drib' + i] = FIGHT2D.figure(look, { ...pz['walk' + i], sF: 28, eF: -55 }, nose);
    for (const k in EXTRA) s[k] = FIGHT2D.figure(look, EXTRA[k], nose);
    SPR.set(key, s); return s;
  }
  // ---------- input (virtual buttons from the player's controls)
  function vcode(k) { const has = (id) => CONTROLS.codes(id).includes(k);
    return has('f_punch') ? 'vS' : has('b_pass') ? 'vP' : has('f_kick') ? 'vT' : has('left') ? 'vL' : has('right') ? 'vR' : has('fwd') ? 'vU' : has('back') ? 'vD' : k === 'Enter' ? 'vS' : null; }
  const press = (v, down) => { if (down) { if (!keys.has(v)) pressedK.add(v); keys.add(v); } else { if (keys.has(v)) releasedK.add(v); keys.delete(v); } };
  function onKey(e, down) { if (!running) return; const v = vcode(e.code); if (!v) return; e.preventDefault(); e.stopPropagation(); press(v, down); }
  window.addEventListener('keydown', (e) => onKey(e, true), true); window.addEventListener('keyup', (e) => onKey(e, false), true);
  window.addEventListener('mousedown', (e) => { if (!running) return; e.preventDefault(); e.stopPropagation(); if (e.button === 0) press('vS', true); if (e.button === 2) press('vP', true); }, true); // left = shoot, right = pass (v0.66: they were swapped)
  window.addEventListener('mouseup', (e) => { if (!running) return; if (e.button === 0) press('vS', false); if (e.button === 2) press('vP', false); }, true);
  window.addEventListener('contextmenu', (e) => { if (running) e.preventDefault(); }, true);
  const held = (v) => keys.has(v), hit = (v) => pressedK.has(v), rel = (v) => releasedK.has(v);
  // ---------- little sounds (own nodes on the game's audio context)
  function snd(kind) { const ctx = AUDIO.ctx, out = AUDIO.master; if (!ctx || !out) return; const t = ctx.currentTime; const g = ctx.createGain(); g.connect(out);
    if (kind === 'bounce') { const o = ctx.createOscillator(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.08); g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1); o.connect(g); o.start(t); o.stop(t + 0.12); return; }
    if (kind === 'buzzer') { const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 196; g.gain.setValueAtTime(0.06, t); g.gain.setValueAtTime(0.06, t + 0.7); g.gain.exponentialRampToValueAtTime(0.001, t + 0.8); o.connect(g); o.start(t); o.stop(t + 0.85); return; }
    if (kind === 'rim') { const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = 520; g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25); o.connect(g); o.start(t); o.stop(t + 0.3); return; }
    const s = ctx.createBufferSource(); s.buffer = AUDIO.noise; const f = ctx.createBiquadFilter(); // swish / crowd
    if (kind === 'swish') { f.type = 'highpass'; f.frequency.value = 2500; g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35); s.connect(f); f.connect(g); s.start(t, Math.random()); s.stop(t + 0.4); }
    else { f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.6; g.gain.setValueAtTime(0.001, t); g.gain.linearRampToValueAtTime(0.1, t + 0.15); g.gain.exponentialRampToValueAtTime(0.001, t + 1.4); s.connect(f); f.connect(g); s.start(t, Math.random()); s.stop(t + 1.5); }
  }
  function say(text) { try { const ss = window.speechSynthesis; if (!ss) return; const u = new SpeechSynthesisUtterance(text); const v = ss.getVoices().find((q) => /^es/i.test(q.lang)); if (v) u.voice = v; u.lang = 'es-ES'; u.rate = 1.15; u.pitch = 0.75; u.volume = 0.9; ss.cancel(); ss.speak(u); } catch (e) { } }
  // ---------- setup
  function mkPlayer(o, team, i) {
    return { name: o.name, look: o.look || {}, spr: sprites(o.look || {}, !!o.nose), team, human: !!o.human, x: 0, z: 0, y: 0, vx: 0, vz: 0, vy: 0, dir: team ? -1 : 1, turbo: 1, down: 0, act: '', actT: 0, air: false,
      shootHold: false, holdT: 0, streak: 0, fire: false, lv: o.lv ?? 0.5, think: 0, tgt: [0, 0], walkT: Math.random() * 3, idx: i, mark: null, stealCD: 0 };
  }
  function place(attacking) { // positions after a basket / at the start: «attacking» team brings the ball from its own half
    const A = st.p.filter((q) => q.team === attacking), D = st.p.filter((q) => q.team !== attacking);
    const own = attacking === 0 ? 6 : CL - 6, sgn = attacking === 0 ? 1 : -1;
    A[0].x = own; A[0].z = 6.5; A[1].x = own + sgn * 4; A[1].z = 11;
    D[0].x = CL / 2 + sgn * 3; D[0].z = 6; D[1].x = CL / 2 + sgn * 5; D[1].z = 10.5;
    for (const q of st.p) { q.vx = q.vz = q.vy = 0; q.y = 0; q.air = false; q.act = ''; q.down = 0; q.shootHold = false; q.dir = q.team ? -1 : 1; }
    const carrier = A.find((q) => q.human) || A[0]; give(carrier); st.possT = 0;
  }
  function give(p) { const b = st.ball; b.holder = p; b.mode = 'held'; b.shot = null; b.pass = null; st.possT = 0; st.lastTouch = p; }
  // ---------- court geometry helpers
  const hoopOf = (team) => HOOP[team === 0 ? 1 : 0]; // team 0 attacks the right hoop
  const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
  const mates = (p) => st.p.filter((q) => q !== p && q.team === p.team)[0];
  const rivals = (p) => st.p.filter((q) => q.team !== p.team);
  function openness(p) { let m = 99; for (const q of rivals(p)) m = Math.min(m, dist(p, q)); return m; }
  function shotChance(p, d) {
    let k = d < 1.6 ? 0.88 : clamp(0.82 - d * 0.05, 0.22, 0.74);
    const o = openness(p); if (o < 1.3) k *= 0.62; else if (o < 2.2) k *= 0.85;
    if (p.fire) k += 0.25;
    if (!p.human) { k *= 0.3 + 0.75 * p.lv; k -= d * 0.035 * (1 - p.lv); } // v0.66: bad teams miss most shots, above all from far
    return clamp(k, 0.03, 0.97);
  }
  // ---------- actions
  function jump(p, power = 5.2) { if (p.air || p.down > 0) return; p.vy = power; p.air = true; p.y = 0.01; }
  function startShot(p) { if (p.air || p.down > 0 || st.ball.holder !== p) return;
    const h = hoopOf(p.team), d = Math.hypot(h.x - p.x, h.z - p.z);
    if (p.human && held('vT') && d >= 2.4 && d <= 7.8 && p.turbo > 0.1) { startCombo(p, d); return; } // running in from mid range
    if (d < 3.3 && !p.human && p.wantDunk && p.turbo > 0.15) { // CPU dunk: fly to the rim
      p.act = 'dunk'; p.actT = 0; const T = 0.62; p.vy = G * T + 0.3; p.air = true; p.y = 0.01; p.vx = (h.x - p.x - Math.sign(h.x - p.x) * 0.25) / T; p.vz = (h.z - p.z) / T; p.turbo = Math.max(0, p.turbo - 0.15); return; }
    p.act = 'shoot'; p.actT = 0; p.shootHold = true; p.holdT = 0; const hw = clamp(0.13 - d * 0.011, 0.04, 0.12); p.green = [0.51 - hw, 0.51 + hw]; jump(p, 5.0); // v0.66: the further, the narrower the green
  }
  // ---------- ENTRADA EN COMBO: the 4 specials of the 2D fight, each one a different dunk (3 s to do it, game paused)
  const COMBOS = [
    { id: 'gofio', name: 'MATE DE GOFIO', seq: ['atras', 'adelante', 'puno'] },
    { id: 'teide', name: 'MOLINO DEL TEIDE', seq: ['atras', 'adelante', 'patada'] },
    { id: 'gancho', name: 'GANCHO DEL ROQUE', seq: ['abajo', 'arriba', 'puno'] },
    { id: 'pastor', name: 'SALTO DEL PASTOR', seq: ['abajo', 'arriba', 'patada'] },
  ];
  function startCombo(p, d) {
    const c = COMBOS[(Math.random() * 4) | 0]; const sg = Math.sign(hoopOf(p.team).x - p.x) || 1;
    const vk = { adelante: [sg > 0 ? 'vR' : 'vL'], atras: [sg > 0 ? 'vL' : 'vR'], abajo: ['vD'], arriba: ['vU'], puno: ['vS'], patada: ['vT', 'vP'] };
    st.combo = { c, i: 0, t: 3.6, by: p, need: c.seq.map((k) => vk[k]), sg, ok: null, d }; st.phase = 'combo'; p.turbo = Math.max(0, p.turbo - 0.2);
    pressedK.clear(); banner('¡ENTRADA EN COMBO!', '#ffd400', 1.0); snd('crowd');
  }
  function comboStep(dt) {
    const C = st.combo; if (C.ok !== null) { C.end -= dt; if (C.end <= 0) { st.phase = 'play'; st.combo = null; } return; }
    C.t -= dt; const all = ['vL', 'vR', 'vU', 'vD', 'vS', 'vT', 'vP'];
    for (const v of all) if (hit(v)) { if (C.need[C.i].includes(v)) { C.i++; snd('bounce'); if (C.i >= C.need.length) { comboDone(true); return; } } else { comboDone(false); return; } }
    if (C.t <= 0) comboDone(false);
  }
  function comboDone(ok) {
    const C = st.combo, p = C.by, h = hoopOf(p.team); C.ok = ok; C.end = 0.5;
    if (ok) { // the dunk: a long flight to the rim, scored when he gets there (can't be blocked)
      const T = 0.85; p.act = 'dunk'; p.combo = C.c.id; p.air = true; p.y = 0.01; p.vy = G * T * 0.55 + 1.2; p.vx = (h.x - p.x - Math.sign(h.x - p.x) * 0.25) / T; p.vz = (h.z - p.z) / T; p.sure = true;
      banner('¡' + C.c.name + '!', '#ffd400', 1.6); if (st.ev) st.ev.combo = true; say(C.c.name.charAt(0) + C.c.name.slice(1).toLowerCase());
    } else { const b = st.ball; b.holder = null; b.mode = 'loose'; b.x = p.x; b.z = p.z; b.y = 1.2; b.vx = rnd(-2, 2); b.vz = rnd(-2, 2); b.vy = 2.5; banner('¡COMBO FALLADO!', '#ff6b6b', 1.2); }
  }
  // the shot bar: the time the button is held; the green window is the top of the jump
  const GREEN = [0.42, 0.6], BAR = 1.0;
  function timing(p) { const t = p.holdT, g = p.green || GREEN; return t >= g[0] && t <= g[1] ? 'verde' : t >= g[0] - 0.1 && t <= g[1] + 0.1 ? 'casi' : 'mal'; }
  function release(p) { // shot leaves the hands: make or miss is decided here (timing, distance, defence, «en llamas»)
    if (st.ball.holder !== p) { p.shootHold = false; return; }
    const h = hoopOf(p.team), d = Math.hypot(h.x - p.x, h.z - p.z); let k = shotChance(p, d);
    if (p.human) { const tm = timing(p); const def = openness(p) < 1.3 ? 0.75 : 1; k = tm === 'verde' ? clamp(0.95 - d * 0.018, 0.7, 0.95) * def : tm === 'casi' ? k * 0.7 : 0.1; if (p.fire) k += 0.2; st.lastTiming = tm; if (st.ev) st.ev[tm === 'verde' ? 'green' : 'shotT'] = true; }
    else { const peak = Math.abs(p.vy) < 1.3; k += peak ? 0.1 : -0.12; if (p.landingRelease) k -= 0.15; }
    const make = Math.random() < clamp(k, 0.03, 0.97); const pts = d > THREE_PT ? 3 : 2;
    const b = st.ball; b.holder = null; b.mode = 'air'; b.x = p.x + p.dir * 0.2; b.z = p.z; b.y = p.y + 2.2;
    const tx = h.x + (make ? 0 : (Math.random() < 0.5 ? -1 : 1) * rnd(0.28, 0.45)), tz = h.z + (make ? 0 : rnd(-0.3, 0.3));
    const T = 0.7 + d * 0.035; b.vx = (tx - b.x) / T; b.vz = (tz - b.z) / T; b.vy = (RIM + 0.05 - b.y + 0.5 * G * T * T) / T; b.t = 0; b.T = T;
    b.shot = { make, pts, by: p, team: p.team, hoop: h, tx, tz }; p.shootHold = false; p.landingRelease = false; st.lastTouch = p; st.possT = 0;
    if (st.ev) st.ev.shot = true;
  }
  function pass(from, to) { const b = st.ball; if (b.holder !== from || !to || to.down > 0) return; b.holder = null; b.mode = 'pass'; b.x = from.x; b.z = from.z; b.y = from.y + 1.3; b.pass = { to, t: 0, from }; b.inter = false; if (st.ev && from.human) st.ev.pass = true; }
  function steal(p) { const b = st.ball; const v = b.holder; if (!v || v.team === p.team || p.down > 0 || p.stealCD > 0) return; p.stealCD = 0.5; p.act = 'push'; p.actT = 0;
    if (dist(p, v) > 1.3) return;
    const shove = (p.human ? held('vT') : Math.random() < 0.35 * p.lv) && p.turbo > 0.2;
    if (shove) { p.turbo -= 0.25; v.down = 1.0; v.shootHold = false; b.holder = null; b.mode = 'loose'; b.x = v.x; b.z = v.z; b.y = 1; b.vx = rnd(-2, 2); b.vz = rnd(-2, 2); b.vy = 2; banner('¡EMPUJÓN!', '#ff8a3d'); snd('bounce'); if (st.ev && p.human) st.ev.steal = true; return; }
    if (Math.random() < (p.human ? 0.55 : 0.06 + p.lv * 0.3)) { give(p); banner('¡ROBO!', '#5ec8ff'); if (st.ev && p.human) st.ev.steal = true; }
  }
  // ---------- banners & HUD state
  function banner(t, c = '#ffd400', dur = 1.2) { st.banner = { t, c, dur, t0: st.time0 }; st.bannerT = dur; }
  function score(team, pts, by, kind) {
    st.score[team] += pts; st.lastScore = team; by.streak++; const other = st.p.filter((q) => q.team !== team); other.forEach((q) => { q.streak = 0; q.fire = false; });
    if (by.streak >= 3 && !by.fire) { by.fire = true; banner('¡EN LLAMAS!', '#ff5a1f', 1.8); say('¡Está que arde!'); }
    else if (kind === 'dunk') { banner('¡MATE!', '#ffd400'); say(Math.random() < 0.5 ? '¡Matazo!' : '¡Qué mate!'); }
    else if (pts === 3) { banner('¡TRIPLE!', '#7fe08a'); if (Math.random() < 0.6) say('¡Triple!'); }
    else banner(by.human ? '¡CANASTA!' : 'CANASTA', team === 0 ? '#7fe08a' : '#ff6b6b', 0.9);
    snd('swish'); snd('crowd'); if (st.ev && by.team === 0) st.ev.score = true; if (st.ev && kind === 'dunk' && by.human) st.ev.dunk = true;
    st.phase = 'score'; st.pt = 1.3; st.next = 1 - team;
    if (st.golden) { st.phase = 'end'; st.pt = 3; }
  }
  // ---------- AI
  function aiThink(p, dt) {
    const b = st.ball, own = b.holder ? b.holder.team === p.team : b.mode === 'pass' ? b.pass.to.team === p.team : null;
    p.think -= dt; const h = hoopOf(p.team), dh = hoopOf(1 - p.team);
    const passive = st.tut && p.team === 1, tutMate = !!st.tut && p.team === 0; let tx = p.x, tz = p.z, run = false; // in the tutorial your mate waits for you with the ball
    if (b.mode === 'loose' || (b.mode === 'air' && b.t > b.T)) { // go for the rebound: the two nearest players
      const near = st.p.filter((q) => q.down <= 0).sort((a, c) => Math.hypot(a.x - b.x, a.z - b.z) - Math.hypot(c.x - b.x, c.z - b.z)).slice(0, 2);
      if (near.includes(p) && !passive) { tx = b.x; tz = b.z; run = true; if (b.y > 2 && b.y < 3.4 && Math.hypot(p.x - b.x, p.z - b.z) < 1 && Math.random() < 0.08) jump(p, 4.8); }
    } else if (b.holder === p) {
      p.possT = (p.possT || 0) + dt; const d = Math.hypot(h.x - p.x, h.z - p.z);
      if (p.think <= 0) { p.think = 0.2; p.zOff = clamp((p.zOff ?? rnd(-3, 3)) + rnd(-1.5, 1.5), -4, 4); p.shootR = p.shootR ?? rnd(2.2, 7.4); }
      tx = h.x - Math.sign(h.x - CL / 2) * 1.2; tz = h.z + p.zOff; run = d > 6 && p.turbo > 0.4;
      const mate = mates(p), guard = openness(p) < 1.3;
      if (tutMate) { tx = p.x; tz = p.z; run = false; }
      else if (!passive && !p.air) {
        if (guard && mate && openness(mate) > 2.5 && Math.random() < 0.02 + 0.03 * p.lv) pass(p, mate);
        else if (d < 3 && p.turbo > 0.3 && Math.random() < 0.05 * p.lv) { p.wantDunk = true; startShot(p); p.wantDunk = false; }
        else if (d < 9.5 && ((d < p.shootR && (!guard || p.possT > 2.6)) || p.possT > 4.5)) { startShot(p); /* v0.66: never from its own half */ p.aiRel = rnd(-0.12, 0.12) * (1.3 - p.lv); p.shootR = null; }
      }
    } else if (own) { // off the ball: get open on the wing, away from the holder
      const hd = b.holder || (b.pass && b.pass.to) || p; const side = hd.z < 7.5 ? 1 : -1;
      tx = h.x - Math.sign(h.x - CL / 2) * 5.5; tz = 7.5 + side * 4;
    } else if (own === false) { // defence: stay between your man and the basket
      const m = p.mark || rivals(p)[p.idx % 2]; const hd = b.holder;
      const k = hd === m ? 1.0 : 2.2; const L = Math.hypot(dh.x - m.x, dh.z - m.z) || 1; tx = m.x + (dh.x - m.x) / L * k; tz = m.z + (dh.z - m.z) / L * k; run = dist(p, m) > 4;
      if (!passive && hd === m && dist(p, m) < 1.2 && Math.random() < dt * (0.1 + 0.7 * p.lv)) steal(p);
      if (!passive && m.air && m.shootHold && dist(p, m) < 1.8 && !p.air && Math.random() < dt * 6 * p.lv) jump(p, 5.4);
    }
    if (passive) { tx = p.x; tz = p.z; }
    return { tx, tz, run };
  }
  // ---------- one step (60 Hz)
  function stepPlayer(p, dt) {
    p.stealCD = Math.max(0, p.stealCD - dt); p.actT += dt; if (p.act === 'push' && p.actT > 0.25) p.act = '';
    if (p.down > 0) { p.down -= dt; p.vx *= 0.85; p.vz *= 0.85; }
    let mx = 0, mz = 0, run = false;
    const ctl = p.human && !st.auto;
    if (p.down <= 0 && !p.air) {
      if (ctl) { mx = (held('vR') ? 1 : 0) - (held('vL') ? 1 : 0); mz = (held('vD') ? 1 : 0) - (held('vU') ? 1 : 0); run = held('vT') && p.turbo > 0; }
      else { const a = aiThink(p, dt); const dx = a.tx - p.x, dz = a.tz - p.z, L = Math.hypot(dx, dz); if (L > 0.25) { mx = dx / L; mz = dz / L; } run = a.run && p.turbo > 0; }
      const L = Math.hypot(mx, mz); if (L > 1) { mx /= L; mz /= L; }
      const sp = (run ? 6.4 : 4.1) * (p.team === 1 ? 0.8 + 0.25 * p.lv : 1); // v0.66: slower all round; weak rivals slower still p.vx = lerp(p.vx, mx * sp, 0.25); p.vz = lerp(p.vz, mz * sp * 0.8, 0.25);
      if (run && L > 0.1) { p.turbo = Math.max(0, p.turbo - dt * 0.38); if (st.ev && p.human) st.ev.turbo = (st.ev.turbo || 0) + dt; } else p.turbo = Math.min(1, p.turbo + dt * 0.16);
      if (Math.abs(p.vx) > 0.3) p.dir = Math.sign(p.vx);
      if (p.human && L > 0.1 && st.ev) st.ev.walk = (st.ev.walk || 0) + dt;
    } else if (!ctl && p.air) aiThink(p, dt);
    // buttons
    if (ctl && p.down <= 0) {
      const b = st.ball, mate = mates(p);
      if (hit('vS')) { if (b.holder === p) startShot(p); else if (b.holder === mate && !mate.air) { startShot(mate); mate.aiRel = 0; } else jump(p, 5.4); }
      if (rel('vS') && p.shootHold && p.air) release(p);
      if (hit('vP')) { if (b.holder === p) pass(p, mate); else if (b.holder === mate) pass(mate, p);
        else if (b.holder && b.holder.team !== p.team && dist(p, b.holder) <= 1.4) steal(p);
        else if (mate && st.time0 > (st.swapAt || 0)) { p.human = false; mate.human = true; p.shootHold = false; st.swapAt = st.time0 + 0.25; pressedK.delete('vP'); if (st.ev) st.ev.swap = true; } } // (once: the mate is stepped right after and sees the same click) // defending away from the ball: right click = switch to the other defender
    }
    if (!ctl && p.shootHold && p.air && p.vy < 0.4 + (p.aiRel || 0) * 6) release(p);
    if (p.shootHold) { p.holdT += dt; if (ctl && p.holdT > BAR) release(p); }
    // air / dunk
    if (p.air) {
      p.vy -= G * dt; p.y += p.vy * dt;
      if (p.act === 'dunk') { const h = hoopOf(p.team); p.dir = Math.sign(h.x - p.x) || p.dir;
        if (st.ball.holder === p && (p.vy < 0.6 || p.sure) && Math.hypot(h.x - p.x, h.z - p.z) < 0.9) { // slam it
          const blk = !p.sure && rivals(p).find((q) => q.air && q.y > 0.6 && dist(q, p) < 1.0 && Math.random() < (q.human ? 0.5 : 0.35 * q.lv)); const fallo = !p.sure && !p.human && Math.random() > 0.45 + 0.55 * p.lv; p.sure = false; // v0.66: weak CPU dunkers hit the rim
          const b = st.ball; b.holder = null;
          if (blk || fallo) { b.mode = 'loose'; b.x = p.x; b.z = p.z; b.y = RIM; b.vx = -Math.sign(h.x - CL / 2) * 4; b.vz = rnd(-2, 2); b.vy = 2; banner(blk ? '¡TAPÓN!' : '¡AL HIERRO!', '#ff6b6b'); snd('rim'); }
          else { b.mode = 'net'; b.x = h.x; b.z = h.z; b.y = RIM; b.vx = b.vz = 0; b.vy = -2; score(p.team, 2, p, 'dunk'); }
        } }
      if (p.y <= 0) { p.y = 0; p.vy = 0; p.air = false; p.sure = false; p.combo = null; if (p.act === 'dunk' || p.act === 'shoot') p.act = ''; if (p.shootHold) { p.landingRelease = true; release(p); } if (st.ev && p.human) st.ev.jump = true; }
    } else if (p.shootHold && ctl && !held('vS')) release(p);
    p.x = clamp(p.x + p.vx * dt, 0.3, CL - 0.3); p.z = clamp(p.z + p.vz * dt, 0.2, CW - 0.2);
    if (p.air || Math.hypot(p.vx, p.vz) > 0.4) p.walkT += dt * Math.hypot(p.vx, p.vz) * 1.4;
  }
  function stepBall(dt) {
    const b = st.ball;
    if (b.mode === 'held') { const p = b.holder; b.x = p.x + p.dir * 0.32; b.z = p.z + 0.05; b.y = p.air ? p.y + (p.act === 'dunk' ? 2.4 : 2.1) : 0.25 + Math.abs(Math.sin(performance.now() / 120)) * 0.75; st.possT += dt; return; }
    if (b.mode === 'pass') { const to = b.pass.to; const tx = to.x, tz = to.z, L = Math.hypot(tx - b.x, tz - b.z); const v = 15 * dt;
      for (const q of rivals(b.pass.from)) if (!b.inter && q.down <= 0 && Math.hypot(q.x - b.x, q.z - b.z) < 0.55) { b.inter = true; if (Math.random() < (st.tut ? 0 : 0.35)) { give(q); banner('¡INTERCEPTADA!', '#5ec8ff'); return; } }
      if (L < v || L < 0.4) { give(to); if (st.ev && to.human) st.ev.catch = true; return; } b.x += (tx - b.x) / L * v; b.z += (tz - b.z) / L * v; b.y = lerp(b.y, to.y + 1.3, 0.2); return; }
    if (b.mode === 'air') { b.t += dt; b.vy -= G * dt; b.x += b.vx * dt; b.z += b.vz * dt; b.y += b.vy * dt;
      if (b.t < 0.3) for (const q of st.p) if (q.team !== b.shot.team && q.air && Math.hypot(q.x - b.x, q.z - b.z) < 0.8 && Math.abs(q.y + 2.3 - b.y) < 0.6 && Math.random() < 0.4 * q.lv + (q.human ? 0.35 : 0)) {
        b.mode = 'loose'; b.vx = -b.vx * 0.4 + rnd(-1, 1); b.vz = rnd(-2, 2); b.vy = 1.5; banner('¡TAPÓN!', q.team === 0 ? '#7fe08a' : '#ff6b6b'); snd('rim'); if (st.ev && q.human) st.ev.block = true; return; }
      if (b.t >= b.T) { const s = b.shot; if (s.make) { b.mode = 'net'; b.x = s.hoop.x; b.z = s.hoop.z; b.y = RIM; b.vx = b.vz = 0; b.vy = -2; score(s.team, s.pts, s.by, s.pts === 3 ? 'three' : 'two'); }
        else { b.mode = 'loose'; b.vx = -Math.sign(s.hoop.x - CL / 2) * rnd(1, 3.2); b.vz = rnd(-2.2, 2.2); b.vy = rnd(2.5, 4.5); snd('rim'); s.by.streak = 0; } }
      return; }
    if (b.mode === 'net') { b.vy -= G * dt * 0.5; b.y += b.vy * dt; if (b.y < 0.2) { b.y = 0.2; b.vy = 0; } return; }
    // loose ball: bounces, the first player to reach it keeps it
    b.vy -= G * dt; b.x += b.vx * dt; b.z += b.vz * dt; b.y += b.vy * dt;
    if (b.y < 0.12) { b.y = 0.12; if (Math.abs(b.vy) > 1) snd('bounce'); b.vy = -b.vy * 0.55; b.vx *= 0.8; b.vz *= 0.8; }
    if (b.x < 0.2 || b.x > CL - 0.2) { b.vx = -b.vx * 0.6; b.x = clamp(b.x, 0.2, CL - 0.2); } if (b.z < 0.1 || b.z > CW - 0.1) { b.vz = -b.vz * 0.6; b.z = clamp(b.z, 0.1, CW - 0.1); }
    for (const q of st.p) if (q.down <= 0 && Math.hypot(q.x - b.x, q.z - b.z) < 0.7 && b.y < q.y + 2.6) { give(q); if (st.ev && q.human) st.ev.rebound = true; return; }
  }
  function step(dt) {
    st.time0 += dt; if (st.bannerT > 0) st.bannerT -= dt;
    if (st.phase === 'ready') { if (hit('vS') || hit('vP') || st.auto) { st.phase = 'play'; snd('buzzer'); } return; }
    if (st.phase === 'score') { st.pt -= dt; stepBall(dt); for (const p of st.p) { if (p.air) stepPlayer(p, dt); } if (st.pt <= 0) { if (st.tut && !st.tut.done) st.phase = 'play'; else st.phase = 'play'; place(st.next); } return; }
    if (st.phase === 'end') { st.pt -= dt; if (st.pt <= 0) finish(); return; }
    if (st.phase === 'combo') { comboStep(dt); return; } // everything stops while you do the combo
    // the tutorial: one step at a time, the rivals stand still and the clock doesn't run
    if (st.tut) tutorial(dt);
    else if (!st.golden) { st.clock -= dt; if (st.clock <= 0) { st.clock = 0; const b = st.ball; if (b.mode !== 'air') { snd('buzzer');
      if (st.score[0] === st.score[1]) { st.golden = true; banner('¡CANASTA DE ORO!', '#ffd400', 2); say('¡Canasta de oro!'); } else { st.phase = 'end'; st.pt = 3; } } } }
    // marks: the human guards the nearest rival, the teammate the other one
    const hu = st.p.find((q) => q.human), mt = mates(hu), rv = rivals(hu); if (rv.length === 2) { const n = dist(hu, rv[0]) < dist(hu, rv[1]) ? 0 : 1; hu.mark = rv[n]; mt.mark = rv[1 - n]; rv[0].mark = hu; rv[1].mark = mt; }
    for (const p of st.p) stepPlayer(p, dt);
    stepBall(dt);
  }
  // ---------- tutorial (first game against the Obispo's seminarians)
  const K_ = (id) => CONTROLS.keyName(id);
  const TUT = [
    ['walk', () => `Muévete por la cancha: ${K_('left')} ${K_('right')} ${K_('fwd')} ${K_('back')}`, (e) => (e.walk || 0) > 1.2],
    ['turbo', () => `Corre: mantén ${K_('f_kick')} mientras te mueves (gasta la barra de turbo)`, (e) => (e.turbo || 0) > 0.8],
    ['pass', () => `Pasa a tu compañero: clic derecho (o ${K_('b_pass')})`, (e) => e.pass],
    ['catch', () => `Pídela de vuelta: clic derecho otra vez`, (e) => e.catch],
    ['shot', () => `Tira: mantén clic izquierdo (o ${K_('f_punch')}) y suéltalo con la barra en VERDE`, (e) => e.green],
    ['combo', () => `Entrada en combo: corriendo (${K_('f_kick')}) tira desde media distancia y haz el especial`, (e) => e.combo],
    ['steal', () => `Robo: pégate al rival del balón y clic derecho (corriendo, empujón)`, (e) => e.steal],
  ];
  function tutorial(dt) {
    const t = st.tut; if (t.i >= TUT.length) return;
    const [k, tip, ok] = TUT[t.i]; st.tip = `${t.i + 1}/${TUT.length}  ${tip()}`;
    if (k === 'steal' && t.prep !== 'steal') { t.prep = 'steal'; const r = st.p.find((q) => q.team === 1); give(r); const hu = st.p.find((q) => q.human); r.x = hu.x + hu.dir * 2; r.z = hu.z; }
    if (k === 'catch' && t.prep !== 'catch') { t.prep = 'catch'; const m = st.p.find((q) => q.team === 0 && !q.human); if (st.ball.holder !== m) give(m); }
    if (k === 'shot' && t.prep !== 'shot') { t.prep = 'shot'; const hu = st.p.find((q) => q.human); if (st.ball.holder !== hu) give(hu); }
    if (k === 'combo' && t.prep !== 'combo') { t.prep = 'combo'; const hu = st.p.find((q) => q.human); if (st.ball.holder !== hu) give(hu); hu.turbo = 1; }
    if (k === 'combo' && st.ball.holder !== st.p.find((q) => q.human) && st.phase === 'play' && st.ball.mode === 'held') { give(st.p.find((q) => q.human)); } // a failed combo: try again
    if (k !== 'steal' && st.ball.holder && st.ball.holder.team === 1) give(st.p.find((q) => q.human)); // in the tutorial the rivals only keep the ball to be robbed
    if (t.wait > 0) { t.wait -= dt; if (t.wait <= 0) { t.i++; st.ev = {}; if (t.i >= TUT.length) { st.tip = ''; st.tut = null; banner('¡AHORA EN SERIO!', '#ffd400', 1.6); st.score = [0, 0]; st.p.forEach((q) => { q.streak = 0; q.fire = false; }); place(0); } } return; }
    if (ok(st.ev)) { t.wait = 0.9; st.tip = '¡BIEN!  ' + tip(); AUDIO.cash && AUDIO.cash(); }
  }
  // ---------- drawing
  function txt(s, x, y, size, col, align = 'center') { cx.font = `${size}px "Press Start 2P", monospace`; cx.textAlign = align; cx.textBaseline = 'top'; cx.fillStyle = '#000'; for (const [a, b] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) cx.fillText(s, x + a, y + b); cx.fillStyle = col; cx.fillText(s, x, y); }
  // backgrounds (one per style, cached): 'calle' public court in town, 'colegio' a school yard, 'pabellon' an indoor hall
  const BGS = {};
  function drawBg(style = 'calle') {
    if (BGS[style]) return BGS[style];
    const c = mkCanvas(BGW * BR, H * BR), x = c.getContext('2d'); x.scale(BR, BR); const Wd = BGW;
    let rs = 7; const rr = () => { rs = (rs * 9301 + 49297) % 233280; return rs / 233280; };
    const noise = (y0, y1, a = 0.05) => { for (let i = 0; i < Wd * (y1 - y0) / 25; i++) { x.fillStyle = `rgba(${rr() < 0.5 ? '0,0,0' : '255,255,255'},${a})`; x.fillRect(rr() * Wd, y0 + rr() * (y1 - y0), 1, 1); } };
    const indoor = style === 'pabellon';
    if (indoor) { // Pabellón Juan Ríos Tejera: steel trusses, grey stands, white wall with ads, wooden floor, blue around
      x.fillStyle = '#1d2128'; x.fillRect(0, 0, Wd, 62); x.strokeStyle = '#3d4a63'; x.lineWidth = 1.2;
      for (let k = 0; k < Wd; k += 40) { x.beginPath(); x.moveTo(k, 0); x.lineTo(k + 20, 14); x.lineTo(k + 40, 0); x.stroke(); } x.fillStyle = '#3d4a63'; x.fillRect(0, 14, Wd, 2);
      for (let k = 30; k < Wd; k += 90) { x.fillStyle = '#fff8d8'; x.beginPath(); x.arc(k, 18, 2.2, 0, 7); x.fill(); }
      for (let r2 = 0; r2 < 7; r2++) { x.fillStyle = r2 % 2 ? '#5b5f66' : '#6c7078'; x.fillRect(0, 20 + r2 * 4.5, Wd, 4.5); }
      for (let k = 0; k < Wd; k += 7) if (rr() < 0.35) { x.fillStyle = ['#c0392b', '#2e86c1', '#f1c40f', '#ecf0f1', '#27ae60'][(rr() * 5) | 0]; x.fillRect(k, 21 + ((rr() * 6) | 0) * 4.5, 3, 3); } // a few fans
      x.fillStyle = '#f2f2ee'; x.fillRect(0, 52, Wd, 12); x.font = '5px "Press Start 2P", monospace'; x.textAlign = 'center';
      ['GOFIO LA MOLINETA', 'PABELLÓN JUAN RÍOS TEJERA', 'PAPAS EL MAGO', 'AYTO. DE LA LAGUNA', 'MIEL DE PALMA'].forEach((t, i) => { x.fillStyle = ['#7a2b8c', '#1d4f9c', '#c0392b', '#1d6b45', '#b9770e'][i]; x.fillText(t, 100 + i * 180, 60); });
      x.fillStyle = '#2f6fb5'; x.fillRect(0, 64, Wd, H - 64); x.fillStyle = '#d29a55'; x.fillRect(X0, ZF, CL * PXM, CW * PZM);
      for (let k = ZF; k < ZN; k += 3) { x.fillStyle = 'rgba(120,70,25,0.18)'; x.fillRect(X0, k, CL * PXM, 0.6); } noise(64, H, 0.04);
    } else {
      const g = x.createLinearGradient(0, 0, 0, 56); g.addColorStop(0, '#5aa0d8'); g.addColorStop(1, '#bfe0f2'); x.fillStyle = g; x.fillRect(0, 0, Wd, 60);
      const cols = style === 'colegio' ? ['#efe6c8', '#f2efe6', '#e8d9b5', '#c9d8c0'] : ['#e8d9b5', '#d9a441', '#b5552f', '#f2efe6', '#7d9c6f', '#c9c2b5', '#a8564a'];
      for (let xx = -10; xx < Wd; ) { const w = 30 + rr() * 50, h = (style === 'colegio' ? 34 : 18) + rr() * 22; x.fillStyle = cols[(rr() * cols.length) | 0]; x.fillRect(xx, 52 - h, w, h + 6); x.fillStyle = 'rgba(40,30,30,0.45)';
        for (let wy = 52 - h + 4; wy < 48; wy += 8) for (let wx2 = xx + 4; wx2 < xx + w - 5; wx2 += 7) x.fillRect(wx2, wy, 3, 4); x.fillStyle = style === 'colegio' ? '#d8d2c2' : '#8c3b2a'; x.fillRect(xx - 1, 52 - h - 2, w + 2, 3); xx += w + 1; }
      if (style === 'colegio') { x.font = '6px "Press Start 2P", monospace'; x.textAlign = 'center'; x.fillStyle = '#7a6a3a'; x.fillText('COLEGIO MÁYEX', Wd / 2, 30); }
      else { x.fillStyle = '#ece6d6'; x.fillRect(Wd * 0.7, 6, 20, 48); x.fillStyle = '#9a8f7c'; x.beginPath(); x.moveTo(Wd * 0.7 - 2, 8); x.lineTo(Wd * 0.7 + 10, -6); x.lineTo(Wd * 0.7 + 22, 8); x.fill(); }
      x.fillStyle = '#3d4a3d'; x.fillRect(0, 50, Wd, 12); x.strokeStyle = 'rgba(200,210,215,0.55)'; x.lineWidth = 0.6; for (let k = -20; k < Wd; k += 6) { x.beginPath(); x.moveTo(k, 40); x.lineTo(k + 22, 62); x.stroke(); x.beginPath(); x.moveTo(k + 22, 40); x.lineTo(k, 62); x.stroke(); }
      x.fillStyle = '#6b6f73'; x.fillRect(0, 39, Wd, 2);
      x.fillStyle = style === 'colegio' ? '#3f8f5a' : '#2f5f9a'; x.fillRect(0, 62, Wd, H - 62); x.fillStyle = '#b5552f'; x.fillRect(X0, ZF, CL * PXM, CW * PZM); noise(62, H);
    }
    const line = indoor ? '#f8f8f4' : '#f4f4ee', paint = indoor ? '#2f6fb5' : style === 'colegio' ? '#3f8f5a' : '#2f5f9a';
    x.strokeStyle = line; x.lineWidth = 1.6; x.strokeRect(X0, ZF, CL * PXM, CW * PZM); x.beginPath(); x.moveTo(wx(CL / 2), ZF); x.lineTo(wx(CL / 2), ZN); x.stroke();
    if (indoor) { x.fillStyle = paint; x.beginPath(); x.ellipse(wx(CL / 2), sy(CW / 2), 1.8 * PXM, 1.8 * PZM, 0, 0, 7); x.fill(); }
    x.beginPath(); x.ellipse(wx(CL / 2), sy(CW / 2), 1.8 * PXM, 1.8 * PZM, 0, 0, 7); x.stroke();
    for (const s2 of [0, 1]) { const base = s2 ? CL : 0, sg = s2 ? -1 : 1, h = HOOP[s2];
      x.fillStyle = paint; const kx0 = wx(s2 ? CL - 5.8 : 0), kw = 5.8 * PXM; x.fillRect(kx0, sy(CW / 2 - 2.45), kw, 4.9 * PZM); x.strokeRect(kx0, sy(CW / 2 - 2.45), kw, 4.9 * PZM);
      x.beginPath(); x.ellipse(wx(base + sg * 5.8), sy(CW / 2), 1.8 * PXM, 1.8 * PZM, 0, 0, 7); x.stroke();
      x.save(); x.beginPath(); x.rect(X0, ZF, CL * PXM, CW * PZM); x.clip(); x.beginPath(); x.ellipse(wx(h.x), sy(h.z), THREE_PT * PXM, THREE_PT * PZM, 0, s2 ? Math.PI / 2 : -Math.PI / 2, s2 ? Math.PI * 1.5 : Math.PI / 2); x.stroke(); x.restore(); }
    x.font = '9px "Press Start 2P", monospace'; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillText(indoor ? 'LA LAGUNA' : style === 'colegio' ? 'M' : 'LA LAGUNA', wx(CL / 2), sy(CW / 2) - 4);
    return (BGS[style] = c);
  }
  function updateCam(k = 0.1) { const b = st.ball, f = b.holder ? b.holder : b; const t = clamp(wx(f.x) - W / 2, 0, BGW - W); camX = k >= 1 ? t : camX + (t - camX) * k; }
  function drawHoop(s) { const h = HOOP[s], sg = s ? 1 : -1; const rx = sx(h.x), ry = sy(h.z, RIM), base = sy(h.z), k = SC;
    if (rx < -60 || rx > W + 60) return;
    cx.fillStyle = st.style === 'pabellon' ? '#2f6fb5' : '#2a2d30'; cx.fillRect(rx + sg * 18 * k - 2 * k, base - 52 * k, 4 * k, 52 * k); cx.fillRect(Math.min(rx + sg * 18 * k, rx + sg * 8 * k), base - 50 * k, 10 * k, 3 * k);
    cx.fillStyle = 'rgba(0,0,0,0.25)'; cx.beginPath(); cx.ellipse(rx + sg * 18 * k, base, 8 * k, 2 * k, 0, 0, 7); cx.fill();
    cx.fillStyle = '#f4f4f2'; cx.fillRect(rx + sg * 7 * k - 2 * k, ry - 24 * k, 4 * k, 26 * k); cx.fillStyle = '#e8641c'; cx.fillRect(rx + sg * 7 * k - k, ry - 10 * k, 2 * k, 8 * k);
    cx.strokeStyle = '#eef'; cx.lineWidth = 0.6 * k; for (let q = -3; q <= 3; q++) { cx.beginPath(); cx.moveTo(rx + q * 1.4 * k, ry); cx.lineTo(rx + q * 0.8 * k, ry + 9 * k); cx.stroke(); }
    cx.strokeStyle = '#e8641c'; cx.lineWidth = 1.6 * k; cx.beginPath(); cx.ellipse(rx, ry, 4.6 * k, 1.5 * k, 0, 0, 7); cx.stroke(); }
  function drawPlayer(p) {
    const b = st.ball; let k = 'idle' + (Math.floor(st.time0 * 2) % 2);
    if (p.down > 0) k = 'ko'; else if (p.act === 'dunk') k = 'dunk'; else if (p.air) k = p.shootHold || b.holder === p ? 'shoot' : 'jump'; else if (p.act === 'push') k = 'jab1';
    else if (Math.hypot(p.vx, p.vz) > 0.5) k = (b.holder === p ? 'drib' : 'walk') + (Math.floor(p.walkT * 2.2) % 4); else if (b.holder && b.holder.team !== p.team && b.holder === p.mark) k = 'defend';
    if (st.phase === 'end' && !st.tut) k = (st.score[p.team] > st.score[1 - p.team]) ? 'win' : k;
    const s = p.spr[k] || p.spr.idle0, sc = (0.37 + p.z * 0.004) * SC; const px = sx(p.x), py = sy(p.z, p.y);
    if (px < -60 || px > W + 60) { offscreen(p, px); return; }
    cx.fillStyle = 'rgba(0,0,0,0.3)'; cx.beginPath(); cx.ellipse(px, sy(p.z), 7 * SC, 2.2 * SC, 0, 0, 7); cx.fill();
    const w = (s.width / 2) * sc, h2 = (s.height / 2) * sc; /* the fight sprites are drawn at 2× (v0.66: was divided by this canvas' 4×) */
    cx.save(); cx.translate(px, py); if (p.dir < 0) cx.scale(-1, 1); cx.drawImage(s, -w / 2, -h2 * 0.98, w, h2); cx.restore(); st.drawn = (st.drawn || 0) + 1;
    if (p.fire) for (let i = 0; i < 3; i++) { cx.fillStyle = ['#ff5a1f', '#ffd400', '#ff8a3d'][i]; cx.fillRect(px - 5 * SC + Math.random() * 10 * SC, py - h2 * 0.98 - 2 - Math.random() * 8 * SC, 2 * SC, 3 * SC); }
    if (p.human && p.shootHold) { // the shot bar: fill while held, green band = release here
      const bx = px + 9 * SC, by = py - h2, bh = 26 * SC; cx.fillStyle = 'rgba(0,0,0,0.7)'; cx.fillRect(bx - 1, by - 1, 4 * SC + 2, bh + 2);
      const gr = p.green || GREEN; cx.fillStyle = '#2e7d32'; cx.fillRect(bx, by + bh * (1 - gr[1] / BAR), 4 * SC, bh * (gr[1] - gr[0]) / BAR);
      const f = clamp(p.holdT / BAR, 0, 1), tm = timing(p); cx.fillStyle = tm === 'verde' ? '#7fe08a' : tm === 'casi' ? '#ffd400' : '#ff6b6b'; cx.fillRect(bx, by + bh * (1 - f), 4 * SC, 2.5); }
    if (p.human) { cx.fillStyle = '#ffd400'; cx.beginPath(); cx.moveTo(px - 5, py - h2 - 12); cx.lineTo(px + 5, py - h2 - 12); cx.lineTo(px, py - h2 - 5); cx.fill(); }
    else if (p.team === 0) { cx.fillStyle = '#7fe08a'; cx.fillRect(px - 2.5, py - h2 - 10, 5, 5); }
  }
  function offscreen(p, px) { // a small arrow at the edge for a player out of the view
    const x0 = px < 0 ? 4 : W - 4, y0 = clamp(sy(p.z, 1), 70, H - 10), sg = px < 0 ? -1 : 1; cx.fillStyle = p.human ? '#ffd400' : p.team === 0 ? '#7fe08a' : '#ff6b6b';
    cx.beginPath(); cx.moveTo(x0, y0); cx.lineTo(x0 - sg * 7, y0 - 5); cx.lineTo(x0 - sg * 7, y0 + 5); cx.fill(); }
  function drawBall() { const b = st.ball; const px = sx(b.x), py = sy(b.z, b.y), r = 2.6 * SC;
    cx.fillStyle = 'rgba(0,0,0,0.3)'; cx.beginPath(); cx.ellipse(px, sy(b.z), r, r * 0.4, 0, 0, 7); cx.fill();
    cx.fillStyle = '#e8641c'; cx.beginPath(); cx.arc(px, py, r, 0, 7); cx.fill(); cx.strokeStyle = '#4a1f08'; cx.lineWidth = 0.8; cx.beginPath(); cx.moveTo(px - r, py); cx.lineTo(px + r, py); cx.stroke(); cx.beginPath(); cx.arc(px, py, r, 0, 7); cx.stroke(); }
  function draw() {
    cx.setTransform(R, 0, 0, R, 0, 0); cx.imageSmoothingEnabled = false; const bg = drawBg(st.style); cx.drawImage(bg, camX * BR, 0, W * BR, H * BR, 0, 0, W, H);
    const items = st.p.map((p) => ({ z: p.z, f: () => drawPlayer(p) })); items.push({ z: HOOP[0].z - 0.01, f: () => drawHoop(0) }, { z: HOOP[1].z - 0.01, f: () => drawHoop(1) });
    const b = st.ball; items.push({ z: b.mode === 'held' ? b.holder.z + 0.02 : b.z + (b.mode === 'net' ? 0.02 : 0), f: drawBall });
    items.sort((a, c) => a.z - c.z).forEach((it) => it.f());
    // scoreboard
    cx.fillStyle = 'rgba(0,0,0,0.72)'; cx.fillRect(W / 2 - 150, 6, 300, 30); cx.fillStyle = '#ffd400'; cx.fillRect(W / 2 - 150, 6, 300, 1.5);
    txt(st.names[0], W / 2 - 92, 11, 7, '#7fe08a'); txt(st.names[1], W / 2 + 92, 11, 7, '#ff6b6b');
    txt(String(st.score[0]), W / 2 - 92, 22, 9, '#fff'); txt(String(st.score[1]), W / 2 + 92, 22, 9, '#fff');
    const cl = st.tut ? '--:--' : st.golden ? 'ORO' : `${Math.floor(st.clock / 60)}:${String(Math.floor(st.clock % 60)).padStart(2, '0')}`; txt(cl, W / 2, 16, 9, st.golden ? '#ffd400' : '#fff');
    const hu = st.p.find((q) => q.human); cx.fillStyle = 'rgba(0,0,0,0.6)'; cx.fillRect(10, H - 16, 64, 8); cx.fillStyle = hu.turbo > 0.25 ? '#5ec8ff' : '#ff6b6b'; cx.fillRect(11, H - 15, 62 * hu.turbo, 6); txt('TURBO', 42, H - 26, 6, '#fff');
    if (st.tip) { cx.fillStyle = 'rgba(0,0,0,0.7)'; cx.fillRect(40, H - 34, W - 80, 16); txt(st.tip, W / 2, H - 29, 6, '#ffd400'); }
    if (st.bannerT > 0 && st.banner) { const k = Math.min(1, (st.banner.dur - st.bannerT) * 6); txt(st.banner.t, W / 2, 64, Math.round(10 + 6 * k), st.banner.c); }
    if (st.phase === 'ready') { cx.fillStyle = 'rgba(0,0,0,0.8)'; cx.fillRect(60, 50, W - 120, 132); txt('JETA JAM · 2 CONTRA 2', W / 2, 58, 9, '#ffd400');
      const rows = [['MOVERSE', `${K_('left')} ${K_('right')} ${K_('fwd')} ${K_('back')}`], ['TIRAR (mantén, suelta en verde)', `clic izq. · ${K_('f_punch')}`], ['PASAR / ROBAR / CAMBIAR', `clic dcho. · ${K_('b_pass')}`], ['TAPÓN (defendiendo)', `clic izq. · ${K_('f_punch')}`], ['CORRER (turbo)', K_('f_kick')], ['COMBO', 'corriendo + tiro a media distancia']];
      rows.forEach(([a, c], i) => { txt(a, 74, 78 + i * 13, 6, '#9fd7ff', 'left'); txt(c, W - 74, 78 + i * 13, 6, '#fff', 'right'); });
      if (Math.floor(st.time0 * 2) % 2 === 0) txt(`CLIC IZQ. O ${K_('f_punch').toUpperCase()} PARA EMPEZAR`, W / 2, 162, 7, '#7fe08a'); }
    if (st.phase === 'combo' && st.combo) { const C = st.combo; // the combo panel: the move, its inputs (done ones in green) and the time left
      cx.fillStyle = 'rgba(0,0,0,0.78)'; cx.fillRect(70, 78, W - 140, 96); txt('¡ENTRADA EN COMBO!', W / 2, 84, 9, '#ffd400'); txt(C.c.name, W / 2, 100, 8, '#fff');
      const lab = { adelante: C.sg > 0 ? '▶' : '◀', atras: C.sg > 0 ? '◀' : '▶', abajo: '▼', arriba: '▲', puno: 'PUÑO', patada: 'PATADA' };
      const parts = C.c.seq.map((k, i) => ({ t: lab[k], c: C.ok === false && i === C.i ? '#ff6b6b' : i < C.i ? '#7fe08a' : '#fff' })); let x0 = W / 2 - 70;
      parts.forEach((q, i) => { txt(q.t, x0 + i * 60 + (i === 2 ? 10 : 0), 122, q.t.length > 1 ? 7 : 12, q.c); if (i < 2) txt(i === 1 ? '+' : ',', x0 + i * 60 + 30, 124, 8, '#aaa'); });
      txt(`puño = clic izq. / ${K_('f_punch')} · patada = ${K_('f_kick')} / clic dcho.`, W / 2, 146, 5, '#9fd7ff');
      cx.fillStyle = '#333'; cx.fillRect(90, 160, W - 180, 5); cx.fillStyle = C.t > 1.2 ? '#7fe08a' : '#ff6b6b'; cx.fillRect(90, 160, (W - 180) * clamp(C.t / 3.6, 0, 1), 5); }
    if (st.phase === 'end') { const won = st.score[0] > st.score[1]; txt(won ? '¡GANÁIS!' : 'HABÉIS PERDIDO', W / 2, 100, 16, won ? '#7fe08a' : '#ff6b6b'); txt(`${st.score[0]} - ${st.score[1]}`, W / 2, 128, 10, '#fff'); }
    if (st.fade > 0) { cx.fillStyle = `rgba(0,0,0,${st.fade})`; cx.fillRect(0, 0, W, H); }
  }
  // ---------- loop
  function loop(now) {
    if (!running) return; raf = requestAnimationFrame(loop);
    let dt = Math.min(0.1, (now - last) / 1000); last = now; acc += dt;
    while (acc >= 1 / 60) { step(1 / 60); pressedK.clear(); releasedK.clear(); acc -= 1 / 60; updateCam(); }
    if (st.fadeDir) { st.fade = clamp(st.fade + st.fadeDir * dt * 2.5, 0, 1); if (st.fadeDir < 0 && st.fade === 0) st.fadeDir = 0; if (st.fadeDir > 0 && st.fade === 1) { st.fadeDir = 0; close(); return; } }
    draw();
  }
  // ---------- public
  function start(opt) {
    if (running || FIGHT2D.running) return false; running = true; onEnd = opt.onEnd || null;
    if (!cv) { cv = document.createElement('canvas'); cv.id = 'basket2d'; cv.width = W * R; cv.height = H * R; cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;object-fit:contain;image-rendering:pixelated;background:#000;z-index:28;display:none'; document.body.appendChild(cv); cx = cv.getContext('2d'); }
    const team = opt.team, riv = opt.rival;
    st = { p: [mkPlayer({ ...team[0], human: true }, 0, 0), mkPlayer(team[1], 0, 1), mkPlayer(riv[0], 1, 0), mkPlayer(riv[1], 1, 1)], ball: { x: 0, z: 0, y: 0, vx: 0, vz: 0, vy: 0, holder: null, mode: 'held' },
      score: [0, 0], clock: opt.time || 150, names: [opt.teamName || 'JETA', opt.rivalName || 'RIVALES'], phase: 'ready', pt: 0, time0: 0, bannerT: 0, banner: null, tip: '', ev: {}, golden: false,
      tut: opt.tutorial ? { i: 0, wait: 0 } : null, auto: !!opt.auto, fade: 1, fadeDir: -1, stake: opt.stake || 0, style: opt.style || 'calle' };
    for (const q of st.p) if (q.team === 1) q.lv = opt.lv ?? 0.5; st.p[1].lv = opt.mateLv ?? 0.6;
    place(0); updateCam(1); keys.clear(); pressedK.clear(); releasedK.clear(); document.exitPointerLock?.();
    GAME.state = 'basket2d'; document.body.classList.add('fighting'); cv.style.display = 'block';
    AUDIO.init && AUDIO.init(); last = performance.now(); acc = 0; raf = requestAnimationFrame(loop); return true;
  }
  function finish() { if (!st || st.fadeDir > 0) return; st.fadeDir = 1; }
  function close() { running = false; cancelAnimationFrame(raf); cv.style.display = 'none'; document.body.classList.remove('fighting'); GAME.state = 'play'; GAME.lock();
    const res = { won: st.score[0] > st.score[1], score: st.score.slice() }; if (onEnd) onEnd(res); }
  function abort() { if (!running) return; running = false; cancelAnimationFrame(raf); if (cv) cv.style.display = 'none'; document.body.classList.remove('fighting'); if (GAME.state === 'basket2d') GAME.state = 'play'; } // tests only
  return { start, _abort: abort, get running() { return running; }, _st: () => st, _step: (n = 1) => { for (let i = 0; i < n; i++) { step(1 / 60); pressedK.clear(); releasedK.clear(); updateCam(); } }, _press: press };
})();
