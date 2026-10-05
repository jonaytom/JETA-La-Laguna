// ============ «JETA FIGHTER»: 2D pixel-art street fight, 90s style. Starts when you punch someone ============
// The 3D view of the place where you are is captured, pixelated and posterized as the stage background; both fighters are
// pixel-art sprites generated from their real clothes. Best of 3 rounds, punches, kicks, block, jump, crouch, chains & specials.
const FIGHT2D = (() => {
  const W = 320, H = 180, GROUND = 166, FPS = 60; const SZ = 0.8; // fighters drawn (and hit boxes) at 80%
  let cv, cx, bg = null, running = false, st = null, raf = 0, last = 0, acc = 0, onEnd = null;
  const keys = new Set(), pressedK = new Set(); let FIGHTS_DONE = 0;
  // ---------------- pixel sprites ----------------
  const SPR = new Map();
  const shade = (hex, k) => { const c = new THREE.Color(hex); c.multiplyScalar(k); return '#' + c.getHexString(); };
  const hexs = (h) => '#' + new THREE.Color(h).getHexString();
  // pose: angles in degrees (0 = hanging down, positive = towards the facing side), torso lean, hip offset
  const POSES = {
    idle0: { tl: 6, sF: 55, eF: -105, sB: 35, eB: -115, hF: 18, kF: -18, hB: -14, kB: -14, dy: 0 },
    idle1: { tl: 7, sF: 52, eF: -100, sB: 32, eB: -110, hF: 18, kF: -22, hB: -14, kB: -18, dy: 1 },
    walk0: { tl: 8, sF: 55, eF: -105, sB: 35, eB: -115, hF: 28, kF: -10, hB: -22, kB: -20, dy: 0 },
    walk1: { tl: 8, sF: 55, eF: -105, sB: 35, eB: -115, hF: 8, kF: -30, hB: -6, kB: -6, dy: -1 },
    walk2: { tl: 8, sF: 55, eF: -105, sB: 35, eB: -115, hF: -18, kF: -20, hB: 26, kB: -10, dy: 0 },
    walk3: { tl: 8, sF: 55, eF: -105, sB: 35, eB: -115, hF: -6, kF: -6, hB: 10, kB: -32, dy: -1 },
    crouch: { tl: 18, sF: 60, eF: -110, sB: 40, eB: -120, hF: 85, kF: -125, hB: 40, kB: -120, dy: 17 },
    jump: { tl: 4, sF: 70, eF: -90, sB: 50, eB: -100, hF: 80, kF: -120, hB: 55, kB: -110, dy: -6 },
    jab0: { tl: 10, sF: 70, eF: -60, sB: 35, eB: -115, hF: 20, kF: -18, hB: -16, kB: -14, dy: 0 },
    jab1: { tl: 14, sF: 92, eF: -2, sB: 30, eB: -115, hF: 22, kF: -18, hB: -18, kB: -14, dy: 0 },
    cross0: { tl: 2, sF: 40, eF: -110, sB: 60, eB: -80, hF: 18, kF: -18, hB: -16, kB: -14, dy: 0 },
    cross1: { tl: 20, sF: 40, eF: -100, sB: 95, eB: 0, hF: 24, kF: -18, hB: -24, kB: -8, dy: 0, twist: 1 },
    kick0: { tl: -2, sF: 50, eF: -100, sB: 30, eB: -110, hF: 70, kF: -95, hB: -6, kB: -6, dy: 0 },
    kick1: { tl: -8, sF: 40, eF: -100, sB: 25, eB: -110, hF: 90, kF: -4, hB: -8, kB: -4, dy: 0 },
    round0: { tl: -12, sF: 50, eF: -90, sB: 20, eB: -110, hF: 100, kF: -100, hB: -10, kB: -6, dy: 0 },
    round1: { tl: -22, sF: 40, eF: -80, sB: 10, eB: -100, hF: 122, kF: -6, hB: -12, kB: -4, dy: 0 },
    cpunch: { tl: 22, sF: 92, eF: -2, sB: 40, eB: -120, hF: 85, kF: -125, hB: 40, kB: -120, dy: 17 },
    sweep: { tl: 30, sF: 30, eF: -60, sB: 70, eB: -40, hF: 88, kF: 0, hB: 45, kB: -130, dy: 26 },
    jkick: { tl: -5, sF: 70, eF: -60, sB: 40, eB: -80, hF: 62, kF: -6, hB: 60, kB: -120, dy: -6 },
    block: { tl: -4, sF: 75, eF: -140, sB: 65, eB: -145, hF: 14, kF: -16, hB: -16, kB: -14, dy: 1 },
    cblock: { tl: 12, sF: 80, eF: -140, sB: 70, eB: -145, hF: 85, kF: -125, hB: 40, kB: -120, dy: 17 },
    hit: { tl: -22, sF: 20, eF: -40, sB: 10, eB: -40, hF: 8, kF: -10, hB: -26, kB: -10, dy: 1, head: -15 },
    gofio0: { tl: 0, sF: 40, eF: -120, sB: 30, eB: -130, hF: 22, kF: -22, hB: -20, kB: -14, dy: 2 },
    gofio1: { tl: 14, sF: 90, eF: 0, sB: 86, eB: 0, hF: 30, kF: -14, hB: -26, kB: -6, dy: 1 },
    teide: { tl: -25, sF: 140, eF: -10, sB: 30, eB: -80, hF: 155, kF: -10, hB: -10, kB: -30, dy: -8 },
    win: { tl: 0, sF: 172, eF: -10, sB: 20, eB: -30, hF: 10, kF: -6, hB: -12, kB: -6, dy: 0 },
    ko: { tl: -10, sF: 120, eF: 0, sB: 100, eB: -20, hF: 20, kF: -10, hB: -10, kB: -20, dy: 0, lying: true },
  };
  function drawFigure(look, P, nose) {
    const c = mkCanvas(72, 88), x = c.getContext('2d'); x.imageSmoothingEnabled = false;
    const sk = hexs(look.skin ?? 0xd9a47c), skD = shade(look.skin ?? 0xd9a47c, 0.72);
    const top = hexs(look.jacket ?? look.shirt ?? 0x777777), topD = shade(look.jacket ?? look.shirt ?? 0x777777, 0.7), inner = hexs(look.shirt ?? 0xeeeeee);
    const pa = hexs(look.pants ?? 0x333344), paD = shade(look.pants ?? 0x333344, 0.7), sh = hexs(look.shoes ?? 0x222222), hair = hexs(look.hair ?? 0x222222);
    const sleeve = look.sleeve || look.jacket !== undefined, longP = look.longP !== false;
    const fat = look.fat ? 1.25 : look.strong ? 1.18 : look.thin ? 0.8 : 1;
    const hx = 36, hy = 50 + (P.dy || 0); const rad = (a) => a * Math.PI / 180;
    const lean = rad(P.tl || 0); const neck = [hx + Math.sin(lean) * 22, hy - Math.cos(lean) * 22];
    const seg = (o, a, L) => [o[0] + Math.sin(rad(a)) * L, o[1] + Math.cos(rad(a)) * L];
    const line = (a, b, w, col) => { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); };
    const shF = [neck[0] + 2, neck[1] + 3], shB = [neck[0] - 2, neck[1] + 3];
    const limbArm = (s, aS, aE, back) => { const e = seg(s, aS, 11), h = seg(e, aS + aE, 10); line(s, e, 6 * Math.min(fat, 1.15), back ? (sleeve ? topD : skD) : (sleeve ? top : sk)); line(e, h, 5, back ? (sleeve && false ? topD : skD) : sk); x.fillStyle = back ? skD : sk; x.beginPath(); x.arc(h[0], h[1], 3.2, 0, 7); x.fill(); return h; };
    const limbLeg = (o, aH, aK, back) => { const k = seg(o, aH, 15), f = seg(k, aH + aK, 15); line(o, k, 8 * Math.min(fat, 1.15), back ? paD : pa); line(k, f, 7, longP ? (back ? paD : pa) : (back ? skD : sk)); x.fillStyle = back ? shade(look.shoes ?? 0x222222, 0.7) : sh; x.fillRect(Math.round(f[0] - 3), Math.round(f[1] - 2), 9, 4); return f; };
    // back limbs first
    limbLeg([hx - 2, hy], P.hB, P.kB, true); limbArm(shB, P.sB, P.eB, true);
    // torso
    const tw = 9 * fat; x.fillStyle = top; x.beginPath(); x.moveTo(neck[0] - tw + 1, neck[1] + 2); x.lineTo(neck[0] + tw, neck[1] + 2); x.lineTo(hx + 7 * fat, hy + 2); x.lineTo(hx - 7 * fat, hy + 2); x.closePath(); x.fill();
    if (look.jacket !== undefined) { x.fillStyle = inner; x.beginPath(); x.moveTo(neck[0] - 1, neck[1] + 2); x.lineTo(neck[0] + 3, neck[1] + 2); x.lineTo(hx + 2, hy); x.lineTo(hx, hy); x.closePath(); x.fill(); }
    x.fillStyle = topD; x.beginPath(); x.moveTo(neck[0] - tw + 1, neck[1] + 2); x.lineTo(neck[0] - tw + 4, neck[1] + 2); x.lineTo(hx - 4 * fat, hy + 2); x.lineTo(hx - 7 * fat, hy + 2); x.closePath(); x.fill();
    x.fillStyle = pa; x.fillRect(Math.round(hx - 7 * fat), hy - 1, Math.round(14 * fat), 5); // belt / hips
    limbLeg([hx + 2, hy], P.hF, P.kF, false);
    // head
    const hd = seg(neck, 180 + (P.tl || 0) + (P.head || 0), 7); const hc = [hd[0], hd[1] - 1];
    x.fillStyle = sk; x.beginPath(); x.arc(hc[0], hc[1], 6.5, 0, 7); x.fill(); x.fillRect(Math.round(neck[0] - 2), Math.round(neck[1] - 3), 4, 5);
    x.fillStyle = skD; x.fillRect(Math.round(hc[0] - 6), Math.round(hc[1]), 3, 4);
    // nose (El Chopa's is legendary)
    x.fillStyle = sk; if (nose) { x.beginPath(); x.moveTo(hc[0] + 5, hc[1] - 2); x.lineTo(hc[0] + 11, hc[1] + 3); x.lineTo(hc[0] + 5, hc[1] + 3); x.fill(); } else x.fillRect(Math.round(hc[0] + 5), Math.round(hc[1]), 2, 2);
    x.fillStyle = '#111'; x.fillRect(Math.round(hc[0] + 2), Math.round(hc[1] - 2), 2, 2); // eye
    if (look.beard) { x.fillStyle = hair; x.beginPath(); x.arc(hc[0] + 1, hc[1] + 3, 5, 0, Math.PI); x.fill(); }
    if (look.glasses) { x.fillStyle = look.glasses === 'sun' ? '#111' : '#cfd8dc'; x.fillRect(Math.round(hc[0]), Math.round(hc[1] - 3), 6, 2); }
    // hair / cap / beanie
    const capCol = look.cap ?? look.beanie;
    if (capCol !== undefined && capCol !== null) { x.fillStyle = hexs(capCol); x.beginPath(); x.arc(hc[0], hc[1] - 1, 7, Math.PI, 0); x.fill(); if (look.cap) x.fillRect(Math.round(hc[0]), Math.round(hc[1] - 3), 10, 2); }
    else if (look.hairStyle) { x.fillStyle = hair; x.beginPath(); x.arc(hc[0] - 1, hc[1] - 2, 7, Math.PI * 0.95, Math.PI * 2.05); x.fill(); if (/Long|Buns/.test(look.hairStyle)) x.fillRect(Math.round(hc[0] - 8), Math.round(hc[1] - 3), 5, look.female ? 14 : 10); }
    // front arm last (guard in front of the body)
    limbArm(shF, P.sF, P.eF, false);
    // --- pixelate: hard alpha + 1px dark outline
    const id = x.getImageData(0, 0, 72, 88), d = id.data; const opa = new Uint8Array(72 * 88);
    for (let i = 0; i < 72 * 88; i++) { if (d[i * 4 + 3] > 110) { d[i * 4 + 3] = 255; opa[i] = 1; } else d[i * 4 + 3] = 0; }
    for (let yy = 0; yy < 88; yy++) for (let xx = 0; xx < 72; xx++) { const i = yy * 72 + xx; if (opa[i]) continue; if ((xx > 0 && opa[i - 1]) || (xx < 71 && opa[i + 1]) || (yy > 0 && opa[i - 72]) || (yy < 87 && opa[i + 72])) { d[i * 4] = 20; d[i * 4 + 1] = 14; d[i * 4 + 2] = 24; d[i * 4 + 3] = 255; } }
    x.putImageData(id, 0, 0);
    if (P.lying) { const r = mkCanvas(88, 88), rx = r.getContext('2d'); rx.imageSmoothingEnabled = false; rx.translate(44, 84); rx.rotate(-Math.PI / 2); rx.drawImage(c, -36, -86); return r; }
    return c;
  }
  function spritesFor(look, nose) {
    const key = JSON.stringify(look) + nose; if (SPR.has(key)) return SPR.get(key);
    const s = {}; for (const k in POSES) s[k] = drawFigure(look, POSES[k], nose); SPR.set(key, s); return s;
  }
  // CPU rivals: hit 25% softer and wind up their attacks 1.6x slower (time to see it coming and block)
  const AI_DEAL = 0.75, AI_WINDUP = 1.6;
  // ---------------- moves: [startup, active, recovery, dmg, hitstun, level, hitbox [x0,y0,x1,y1] from feet, pose frames]
  const MOVES = {
    jab: { su: 3, ac: 3, re: 7, dmg: 10, hs: 14, lv: 'high', box: [10, -62, 34, -50], p: ['jab0', 'jab1'] },
    cross: { su: 6, ac: 3, re: 12, dmg: 10, hs: 18, lv: 'high', box: [10, -62, 37, -50], p: ['cross0', 'cross1'] },
    kick: { su: 6, ac: 4, re: 13, dmg: 20, hs: 18, lv: 'mid', box: [12, -46, 40, -34], p: ['kick0', 'kick1'] },
    round: { su: 9, ac: 4, re: 16, dmg: 20, hs: 22, lv: 'high', box: [12, -74, 44, -58], p: ['round0', 'round1'] },
    cpunch: { su: 4, ac: 3, re: 8, dmg: 10, hs: 14, lv: 'low', box: [10, -40, 34, -28], p: ['crouch', 'cpunch'], crouch: true },
    sweep: { su: 8, ac: 4, re: 18, dmg: 20, hs: 30, lv: 'low', box: [8, -14, 44, 0], p: ['crouch', 'sweep'], crouch: true, kd: true },
    jkick: { su: 4, ac: 10, re: 2, dmg: 20, hs: 20, lv: 'over', box: [8, -40, 36, -20], p: ['jump', 'jkick'], air: true },
    gofio: { su: 12, ac: 1, re: 24, dmg: 0, hs: 0, lv: 'mid', box: null, p: ['gofio0', 'gofio1'], proj: true },
    teide: { su: 3, ac: 12, re: 22, dmg: 20, hs: 26, lv: 'high', box: [4, -96, 32, -40], p: ['kick0', 'teide'], kd: true, rise: true },
  };
  const CHAIN = { jab: ['jab', 'cross', 'kick', 'gofio', 'teide'], cross: ['kick', 'round', 'gofio', 'teide'], kick: ['round', 'gofio', 'teide'], cpunch: ['cpunch', 'sweep', 'gofio'] };
  function mkFighter(o, x, dir) { return { name: o.name, spr: spritesFor(o.look, !!o.nose), x, y: GROUND, vx: 0, vy: 0, dir, hp: 100, shown: 100, st: 'idle', t: 0, mv: null, mt: 0, hitDone: false, stun: 0, crouch: false, block: false, wins: 0, ai: o.ai, buf: [], combo: 0, ko: false, inv: 0, chainOk: false, deal: (o.deal ?? 1) * (o.ai ? AI_DEAL : 1), recv: o.recv ?? 1 }; }
  // ---------------- input
  function onKey(e, down, nested) { if (!running) return; if (!nested) for (const c of CONTROLS.alias(e.code)) onKey({ code: c, preventDefault() { }, stopPropagation() { } }, down, true); const k = e.code; if (['KeyA', 'KeyD', 'KeyW', 'KeyS', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyJ', 'KeyK', 'KeyL', 'KeyU', 'KeyI', 'Space', 'ShiftRight', 'ControlRight'].includes(k)) { e.preventDefault(); e.stopPropagation(); } if (down) { if (!keys.has(k)) pressedK.add(k); keys.add(k); } else keys.delete(k); }
  window.addEventListener('keydown', (e) => onKey(e, true), true); window.addEventListener('keyup', (e) => onKey(e, false), true);
  // mouse: left = punch, right = kick (and no context menu while fighting)
  const vk = (k, down) => { if (down) { if (!keys.has(k)) pressedK.add(k); keys.add(k); } else keys.delete(k); };
  window.addEventListener('mousedown', (e) => { if (!running) return; e.preventDefault(); e.stopPropagation(); if (e.button === 0) vk('KeyJ', true); if (e.button === 2) vk('KeyK', true); }, true);
  window.addEventListener('mouseup', (e) => { if (!running) return; if (e.button === 0) vk('KeyJ', false); if (e.button === 2) vk('KeyK', false); }, true);
  window.addEventListener('contextmenu', (e) => { if (running) e.preventDefault(); }, true);
  // gamepad: A kick, X punch, Y jump, stick / d-pad to move
  const GPK = {}; function pollPad() { const gp = navigator.getGamepads ? [...navigator.getGamepads()].find((g) => g) : null; if (!gp) return; const b = (i) => !!(gp.buttons[i] && gp.buttons[i].pressed); const ax = gp.axes[0] || 0, ay = gp.axes[1] || 0;
    const want = { KeyK: b(0), KeyJ: b(2), Space: b(3), ArrowLeft: b(14) || ax < -0.5, ArrowRight: b(15) || ax > 0.5, ArrowUp: b(12), ArrowDown: b(13) || ay > 0.5, KeyL: b(4) || b(6) };
    for (const k in want) { if (want[k] && !GPK[k]) vk(k, true); if (!want[k] && GPK[k]) vk(k, false); GPK[k] = want[k]; } }
  const held = (...k) => k.some((q) => keys.has(q)); const hit = (...k) => k.some((q) => pressedK.has(q));
  function playerInput(f, o) {
    // Space jumps; W / ↑ is just 'up' (for the specials), so it doesn't make you jump
    const l = held('KeyA', 'ArrowLeft'), r = held('KeyD', 'ArrowRight'), u = held('Space'), upDir = held('KeyW', 'ArrowUp', 'Space'), d = held('KeyS', 'ArrowDown');
    const fwd = f.dir > 0 ? r : l, back = f.dir > 0 ? l : r;
    // numpad notation relative to facing, for specials: 2 down, 3 down-forward, 6 forward, 4 back
    const n = d ? (fwd ? 3 : back ? 1 : 2) : upDir ? 8 : (fwd ? 6 : back ? 4 : 5); if (!f.buf.length || f.buf[f.buf.length - 1][0] !== n) f.buf.push([n, st.frame]); while (f.buf.length && st.frame - f.buf[0][1] > 30) f.buf.shift();
    return { fwd, back, guard: back, up: u, down: d, P: hit('KeyJ', 'KeyU', 'ShiftRight'), K: hit('KeyK', 'KeyI', 'ControlRight'), B: held('KeyL'), seq: f.buf.map((q) => q[0]).join('') };
  }
  // ---------------- AI
  function aiInput(f, o) {
    const a = f.ai; const dist = Math.abs(o.x - f.x) / SZ; /* AI thinks in unscaled sprite distances */ const inp = { fwd: false, back: false, up: false, down: false, P: false, K: false, B: false, seq: '' };
    a.t -= 1; const threat = o.mv && o.mt < (MOVES[o.mv].su + MOVES[o.mv].ac + 2) && dist < 70;
    if (threat && Math.random() < a.lv * 0.12 + 0.02) a.blockT = 18 + Math.random() * 12;
    if (st.proj.some((p) => p.owner !== f && Math.abs(p.x - f.x) < 90) && Math.random() < a.lv * 0.1) { if (Math.random() < 0.5) a.blockT = 25; else inp.up = true; }
    if (a.blockT > 0) { a.blockT--; inp.back = true; inp.down = !!(o.crouch || (o.mv && MOVES[o.mv].lv === 'low')); return inp; }
    if (a.passive) { if (dist > 90) inp.fwd = Math.random() < 0.5; return inp; }
    if (a.tutAttack) { a.tt = (a.tt || 0) + 1; if (dist > 46) inp.fwd = true; else if (!f.mv && a.tt % 45 === 0) inp.P = true; return inp; } // tutorial: walks up and throws slow jabs to practise blocking
    if (a.t > 0) { Object.assign(inp, a.hold); return inp; }
    a.t = 11 + Math.random() * (30 - a.lv * 16); a.hold = {};
    const r = Math.random();
    if (dist > 120) { if (r < 0.65) a.hold.fwd = true; else if (r < 0.75 && a.lv > 0.4) { inp.seq = '236'; inp.P = true; } else if (r < 0.85) a.hold = { fwd: true, up: true }; }
    else if (dist > 46) { if (r < 0.5) a.hold.fwd = true; else if (r < 0.7) inp.K = true; else if (r < 0.8) { inp.down = true; inp.K = true; } else if (r < 0.88) a.hold = { fwd: true, up: true }; else a.hold.back = true; }
    else { if (r < 0.35) inp.P = true; else if (r < 0.55) inp.K = true; else if (r < 0.65) { inp.down = true; inp.P = true; } else if (r < 0.72 && a.lv > 0.5) { inp.seq = '623'; inp.K = true; } else if (r < 0.85) a.hold.back = true; else a.blockT = 20; }
    Object.assign(inp, a.hold); return inp;
  }
  // ---------------- core
  function startMove(f, m) { if (st.ev && f === st.a) st.ev[m] = true; f.mv = m; f.mt = 0; f.wu = 0; f.hitDone = false; AUDIO.swing && AUDIO.swing(); if (m === 'teide') { f.vy = -6.4; f.y -= 1; f.inv = 6; } if (m === 'jkick' && f.y >= GROUND) f.mv = 'kick'; }
  function stepFighter(f, o, inp) {
    f.t++; if (f.inv > 0) f.inv--;
    if (f.ko) { f.vy += 0.35; f.y = Math.min(GROUND, f.y + f.vy); f.x += f.vx; f.vx *= 0.92; return; }
    const air = f.y < GROUND;
    if (f.stun > 0) { f.stun--; f.x += f.vx; f.vx *= 0.85; if (air) { f.vy += 0.32; f.y = Math.min(GROUND, f.y + f.vy); } if (f.stun <= 0) { f.st = 'idle'; f.bstun = false; } return; }
    // facing
    if (!air && !f.mv) f.dir = o.x > f.x ? 1 : -1;
    f.crouch = !air && inp.down && !(f.mv && !MOVES[f.mv].crouch);
    // Street Fighter style: holding back walks back, and only turns into a guard while the rival is actually attacking
    // (a move in its startup/active frames, or a ball of gofio flying towards you). The block button always guards.
    const threat = (o.mv && MOVES[o.mv].box && o.mt <= MOVES[o.mv].su * (o.ai ? AI_WINDUP : 1) + MOVES[o.mv].ac + 3 && Math.abs(o.x - f.x) < 120) || st.proj.some((p) => p.owner === o && Math.sign(f.x - p.x) === Math.sign(p.vx) && Math.abs(p.x - f.x) < 110);
    f.block = !air && !f.mv && (inp.B || ((inp.guard !== undefined ? inp.guard : inp.back) && threat));
    // attacks (with chain cancels on hit)
    const want = inp.P ? 'P' : inp.K ? 'K' : null;
    if (want) {
      let m = null; const seq = inp.seq;
      // specials: up, down + punch = Bola de gofio; up, down + kick = Patada del Teide (the AI still uses the old motions)
      const ud = /8[^123]{0,2}[123][^8]?$/.test(seq);
      if ((ud || (!f.ai ? false : /2\d?6$/.test(seq))) && want === 'P') m = 'gofio'; else if ((ud || (!f.ai ? false : /6\d?[23]$/.test(seq))) && want === 'K') m = 'teide';
      else if (air) m = 'jkick'; else if (f.crouch) m = want === 'P' ? 'cpunch' : 'sweep'; else if (want === 'P') m = f.mv === 'jab' ? 'cross' : 'jab'; else m = f.mv === 'kick' || f.mv === 'cross' ? 'round' : 'kick';
      if (m === 'gofio' && st.proj.some((p) => p.owner === f)) m = 'jab';
      if (!f.mv) startMove(f, m); else if (f.chainOk && CHAIN[f.mv] && CHAIN[f.mv].includes(m)) { f.chainOk = false; startMove(f, m); }
    }
    if (f.mv) {
      const M = MOVES[f.mv];
      if (f.ai && f.mt < M.su) { f.wu = (f.wu || 0) + 1 / AI_WINDUP; if (f.wu >= 1) { f.wu -= 1; f.mt++; } } else f.mt++;
      if (M.proj && f.mt === M.su) { st.proj.push({ x: f.x + f.dir * 26 * SZ, y: GROUND - 52 * SZ, vx: f.dir * 3.6, owner: f, t: 0 }); voice('¡Gofio!'); }
      if (M.box && !f.hitDone && f.mt > M.su && f.mt <= M.su + M.ac) {
        const bx0 = f.x + f.dir * M.box[0] * SZ, bx1 = f.x + f.dir * M.box[2] * SZ; const by0 = f.y + M.box[1] * SZ, by1 = f.y + M.box[3] * SZ;
        const hx0 = o.x - 11 * SZ, hx1 = o.x + 11 * SZ, hy0 = o.y - (o.crouch ? 50 : o.ko ? 20 : 74) * SZ, hy1 = o.y;
        if (Math.max(bx0, bx1) > hx0 && Math.min(bx0, bx1) < hx1 && by1 > hy0 && by0 < hy1 && !o.ko && o.inv <= 0) { f.hitDone = true; land(f, o, M); }
      }
      if (M.rise) { f.vy += 0.3; f.y += f.vy; f.x += f.dir * 0.8; if (f.y >= GROUND) { f.y = GROUND; f.vy = 0; } }
      if (f.mt >= M.su + M.ac + M.re || (M.air && !air && f.mt > 3)) { f.mv = null; f.chainOk = false; }
      if (air && !M.rise) { f.vy += 0.3; f.y = Math.min(GROUND, f.y + f.vy); f.x += f.vx; }
      return;
    }
    if (air) { f.vy += 0.3; f.y = Math.min(GROUND, f.y + f.vy); f.x += f.vx; if (f.y >= GROUND) { f.vy = 0; f.vx = 0; } return; }
    if (inp.up && !f.crouch) { if (st.ev && f === st.a) st.ev.jump = true; f.vy = -6.3; f.vx = inp.fwd ? f.dir * 2.1 : inp.back ? -f.dir * 2.1 : 0; f.y -= 1; return; }
    if (f.crouch || f.block) { f.vx = 0; return; }
    f.vx = inp.fwd ? f.dir * 1.7 : inp.back ? -f.dir * 1.3 : 0; f.x += f.vx; if (st.ev && f === st.a) st.ev.walk = (st.ev.walk || 0) + Math.abs(f.vx);
  }
  function land(f, o, M, proj) {
    const dir = proj ? Math.sign(proj.vx) : f.dir;
    const blocked = o.block && !o.mv && (o.stun <= 0 || o.bstun) && (M.lv === 'low' ? o.crouch : M.lv === 'over' ? !o.crouch : true);
    if (blocked && st.ev && o === st.a) st.ev.blocked = true;
    if (blocked) { o.bstun = true; o.hp -= proj ? 1 : (MOVES.jab === M || MOVES.cross === M || MOVES.cpunch === M ? 1 : 2); o.stun = Math.round((M.hs || 16) * 0.5); o.vx = dir * 2.2; spark(o.x - dir * 8, o.y - 50, '#9fd7ff'); AUDIO.thud && AUDIO.thud(30); f.combo = 0; return; }
    o.bstun = false; o.block = false; o.hp -= Math.round((M.dmg || 10) * f.deal * o.recv); o.stun = M.hs || 18; o.mv = null; o.vx = dir * (M.kd ? 3.2 : 2.0); if (M.kd) { o.vy = -3.5; o.y -= 1; }
    f.combo = (o.stunPrev > 0 ? f.combo : 0) + 1; if (st.ev && f === st.a && f.combo >= 3) st.ev.combo = true; o.stunPrev = o.stun; f.chainOk = true; st.comboT = 60; st.comboBy = f;
    spark(o.x - dir * 6, o.y - (M.lv === 'low' ? 12 : M.lv === 'mid' ? 40 : 58), '#ffe35a'); AUDIO.thud && AUDIO.thud(4); st.shake = 6;
    if (f.combo >= 3 && f.combo % 1 === 0) voice(f.combo >= 5 ? 'Combo brutal' : 'Combo');
    if (o.hp <= 0) { o.hp = 0; o.ko = true; o.vy = -4; o.vx = dir * 2.5; o.y -= 1; st.koT = 1; st.slow = 50; voice('K. O.'); }
  }
  function spark(x, y, col) { st.fx.push({ x, y, t: 0, col }); }
  // ---------------- voice (Web Speech, English announcer like the arcades)
  function voice(t) { try { if (!window.speechSynthesis) return; const u = new SpeechSynthesisUtterance(t); u.lang = /[¡ñá]/i.test(t) ? 'es-ES' : 'en-US'; u.rate = 0.85; u.pitch = 0.55; u.volume = 0.9; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch (e) { } }
  // ---------------- rendering
  function txt(s, x, y, size, col, align = 'center', stroke = true) { cx.font = `${size}px "Press Start 2P", monospace`; cx.textAlign = align; cx.textBaseline = 'top'; if (stroke) { cx.fillStyle = '#000'; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1]]) cx.fillText(s, x + dx, y + dy); } cx.fillStyle = col; cx.fillText(s, x, y); }
  function poseOf(f) {
    if (f.ko) return f.y < GROUND - 2 ? 'hit' : 'ko';
    if (st.phase === 'end' && st.winner === f) return 'win';
    if (f.stun > 0) return f.block ? (f.crouch ? 'cblock' : 'block') : 'hit';
    if (f.mv) { const M = MOVES[f.mv]; return M.p[f.mt <= M.su ? 0 : 1]; }
    if (f.y < GROUND) return 'jump';
    if (f.crouch) return f.block ? 'cblock' : 'crouch';
    if (f.block) return 'block';
    if (Math.abs(f.vx) > 0.1) return 'walk' + (Math.floor(f.t / 7) % 4);
    return 'idle' + (Math.floor(f.t / 28) % 2);
  }
  function draw() {
    const sx = st.shake > 0 ? (Math.random() - 0.5) * st.shake : 0; st.shake = Math.max(0, st.shake - 0.8);
    cx.save(); cx.translate(Math.round(sx), 0);
    if (bg) cx.drawImage(bg, 0, 0, W, H); else { cx.fillStyle = '#334'; cx.fillRect(0, 0, W, H); }
    // fighters
    for (const f of [st.a, st.b]) {
      const s = f.spr[poseOf(f)]; const w = s.width, h = s.height;
      cx.fillStyle = 'rgba(0,0,0,0.35)'; cx.fillRect(Math.round(f.x - 11), GROUND - 2, 22, 4);
      cx.save(); cx.translate(Math.round(f.x), Math.round(f.y)); cx.scale(f.dir < 0 ? -SZ : SZ, SZ);
      if (f.stun > 0 && !f.block && (st.frame % 4 < 2)) cx.globalAlpha = 0.85;
      cx.drawImage(s, -Math.round(w / 2), -h + 2); cx.restore();
    }
    // projectiles: balls of gofio
    for (const p of st.proj) { const r = 6 + Math.sin(p.t * 0.6); cx.fillStyle = '#e8d8a8'; cx.beginPath(); cx.arc(Math.round(p.x), Math.round(p.y), r, 0, 7); cx.fill(); cx.fillStyle = '#c9b27a'; cx.fillRect(Math.round(p.x - 3), Math.round(p.y - 1), 3, 3); for (let i = 0; i < 4; i++) { cx.fillStyle = 'rgba(240,230,200,0.7)'; cx.fillRect(Math.round(p.x - Math.sign(p.vx) * (8 + i * 5)), Math.round(p.y + Math.sin(p.t + i) * 3), 2, 2); } }
    // hit sparks
    for (const e of st.fx) { const k = e.t; cx.fillStyle = e.col; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const r = 3 + k * 1.5; cx.fillRect(Math.round(e.x + Math.cos(a) * r), Math.round(e.y + Math.sin(a) * r), 2, 2); } if (k < 4) { cx.fillStyle = '#fff'; cx.fillRect(Math.round(e.x - 2), Math.round(e.y - 2), 4, 4); } }
    cx.restore();
    // HUD: life bars, names, round wins
    const bar = (f, x0, right) => { const w = 124; cx.fillStyle = '#000'; cx.fillRect(x0 - 1, 13, w + 2, 10); cx.fillStyle = '#b3261e'; const sw = w * f.shown / 100; cx.fillRect(right ? x0 + w - sw : x0, 14, sw, 8); cx.fillStyle = '#ffd400'; const hw = w * f.hp / 100; cx.fillRect(right ? x0 + w - hw : x0, 14, hw, 8);
      txt(f.name, right ? x0 + w : x0, 26, 8, '#fff', right ? 'right' : 'left'); for (let i = 0; i < f.wins; i++) { cx.fillStyle = '#ffd400'; cx.fillRect(right ? x0 + w - 8 - i * 10 : x0 + i * 10, 38, 7, 7); } };
    bar(st.a, 12, false); bar(st.b, W - 136, true);
    txt('KO', W / 2, 13, 10, '#ffd400');
    if (st.stake) txt('$' + st.stake, W / 2, 28, 8, '#7fe08a');
    if (st.comboT > 0 && st.comboBy && st.comboBy.combo >= 2) txt(st.comboBy.combo + ' HITS', st.comboBy === st.a ? 60 : W - 60, 52, 10, '#ff8a3d');
    if (st.banner) txt(st.banner, W / 2, 68, st.bannerSize || 16, st.bannerCol || '#fff');
    if (st.phase === 'ready') { drawControls(); return; }
    if (st.tip) { cx.font = '6px "Press Start 2P", monospace'; const words = st.tip.split(' '); const lines = ['']; for (const w of words) { const t = (lines[lines.length - 1] + ' ' + w).trim(); if (cx.measureText(t).width > W - 36 && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = t; }
      const lh = 9, bh = lines.length * lh + 8; cx.fillStyle = 'rgba(0,0,0,0.65)'; cx.fillRect(10, H - 10 - bh, W - 20, bh); lines.forEach((l, i) => txt(l, W / 2, H - 6 - bh + i * lh, 6, '#fff', 'center', false)); }
  }
  // first fights: a plain controls card, waits until you press Space (or tap) to start
  function drawControls() {
    const touch = document.body.classList.contains('touchmode'); const bx = 22, by = 46, bw = W - 44, bh = 112;
    cx.fillStyle = 'rgba(0,0,0,0.78)'; cx.fillRect(bx, by, bw, bh); cx.fillStyle = '#ffd400'; cx.fillRect(bx, by, bw, 2); cx.fillRect(bx, by + bh - 2, bw, 2);
    txt('CONTROLES', W / 2, by + 8, 10, '#ffd400');
    const rows = touch ? [['PUÑO', 'P', '#ffd400'], ['PATADA', 'K', '#ff5252'], ['SALTO', '▲', '#5ec8ff'], ['CUBRIRSE', 'atrás', '#9fd7ff']]
      : [['PUÑO', 'J · clic izq.', '#ffd400'], ['PATADA', 'K · clic dcho.', '#ff5252'], ['SALTO', 'Espacio', '#5ec8ff'], ['CUBRIRSE', 'atrás', '#9fd7ff']];
    rows.forEach(([a, b, c], i) => { const y = by + 26 + i * 13; txt(a, bx + 14, y, 7, c, 'left'); txt(b, bx + bw - 14, y, 7, '#fff', 'right'); });
    txt(touch ? 'Más en Opciones' : 'Más en Opciones › Controles', W / 2, by + 80, 6, '#bbb');
    if (st.frame % 50 < 34) txt(touch ? 'TOCA LA PANTALLA PARA EMPEZAR' : 'PULSA ESPACIO PARA EMPEZAR', W / 2, by + 92, 7, '#7fe08a');
  }
  window.addEventListener('pointerdown', (e) => { if (running && st && st.phase === 'ready' && e.pointerType === 'touch') { st.readyTap = true; e.preventDefault(); } }, true);
  // ---------------- loop
  function tick() {
    st.frame++; pollPad();
    if (st.fx.length) { for (const e of st.fx) e.t++; st.fx = st.fx.filter((e) => e.t < 10); }
    if (st.comboT > 0) st.comboT--;
    for (const f of [st.a, st.b]) f.shown += (f.hp - f.shown) * (f.shown > f.hp ? 0.06 : 1);
    if (st.phase === 'ready') { st.pt++; if (st.pt === 1) { st.banner = ''; voice('Round one'); }
      if (st.pt > 20 && (hit('Space') || st.readyTap)) { st.readyTap = false; st.phase = 'intro'; st.pt = 79; } }
    if (st.phase === 'intro') { st.pt++; if (st.pt === 1) { st.banner = 'ROUND ' + st.round; st.bannerCol = '#fff'; voice('Round ' + ['one', 'two', 'three'][st.round - 1]); } if (st.pt === 80) { st.banner = 'FIGHT!'; st.bannerCol = '#ff5252'; voice('Fight!'); } if (st.pt === 120) { st.banner = ''; st.phase = 'fight'; } }
    const live = st.phase === 'fight';
    const ia = live ? playerInput(st.a, st.b) : {}; const ib = live ? aiInput(st.b, st.a) : {};
    if (st.slow > 0) { st.slow--; if (st.slow % 3) { pressedK.clear(); return; } }
    if (live || st.phase === 'ko') { stepFighter(st.a, st.b, ia); stepFighter(st.b, st.a, ib); }
    if (st.tut && st.phase !== 'ready') st.tut.check(st);
    // push apart, stage bounds
    const dx = st.b.x - st.a.x; if (Math.abs(dx) < 24 * SZ && Math.abs(st.a.y - st.b.y) < 40) { const p = (24 * SZ - Math.abs(dx)) / 2 * Math.sign(dx || 1); st.a.x -= p; st.b.x += p; }
    for (const f of [st.a, st.b]) f.x = clamp(f.x, 18, W - 18);
    // projectiles
    for (const p of st.proj) { p.x += p.vx; p.t++; const o = p.owner === st.a ? st.b : st.a; if (!o.ko && Math.abs(p.x - o.x) < 13 * SZ && p.y > o.y - (o.crouch ? 44 : 74) * SZ && o.inv <= 0) { p.dead = true; land(p.owner, o, { dmg: 15, hs: 22, lv: 'mid' }, p); } if (p.x < -10 || p.x > W + 10) p.dead = true; }
    st.proj = st.proj.filter((p) => !p.dead);
    // round end
    if (st.phase === 'fight' && (st.a.ko || st.b.ko)) { st.phase = 'ko'; st.pt = 0; const w = st.a.ko ? st.b : st.a; w.wins++; st.winner = w; st.banner = 'K.O.'; st.bannerCol = '#ff5252'; st.bannerSize = 24; }
    if (st.phase === 'ko') { st.pt++; if (st.pt === 70) { st.banner = (st.winner === st.a ? st.a.name : st.b.name) + ' GANA'; st.bannerSize = 14; st.bannerCol = '#ffd400'; voice(st.winner === st.a ? (st.a.hp >= 100 ? 'Perfect!' : 'You win') : 'You lose'); }
      if (st.pt === 170) { if (st.a.wins >= 2 || st.b.wins >= 2 || st.single) { st.phase = 'end'; st.pt = 0; } else { st.round++; resetRound(); } } }
    if (st.phase === 'end') { st.pt++; if (st.pt === 1) { st.banner = st.winner === st.a ? '¡VICTORIA!' : 'DERROTA'; st.bannerCol = st.winner === st.a ? '#7fe08a' : '#ff5252'; st.bannerSize = 20; } if (st.pt === 120) finishFight(); }
    pressedK.clear();
  }
  function pressedFrame() { }
  function resetRound() { for (const [f, x, d] of [[st.a, 62, 1], [st.b, W - 62, -1]]) Object.assign(f, { x, y: GROUND, vx: 0, vy: 0, dir: d, hp: 100, shown: 100, mv: null, stun: 0, ko: false, combo: 0, buf: [] }); st.proj = []; st.phase = 'intro'; st.pt = 0; st.bannerSize = 16; }
  function loop(now) {
    if (!running) return; raf = requestAnimationFrame(loop); now = performance.now(); const dt = clamp((now - last) / 1000, 0, 0.1); last = now;
    if (st.trans) { st.trans.t += dt; drawTransition(); return; }
    acc += dt; let n = 0; while (acc >= 1 / FPS && n < 4) { tick(); acc -= 1 / FPS; n++; } draw();
  }
  // ---------------- transitions (mosaic in/out)
  function drawTransition() {
    const T = st.trans; const k = clamp(T.t / T.dur, 0, 1);
    if (T.kind === 'in') {
      // 3D frame → mosaic → stage
      const tmp = T.tmp; const blocks = Math.max(2, Math.round(lerp(1, 48, Math.min(1, k * 1.4)))); const sw = Math.max(8, Math.round(W / blocks * 2)), sh = Math.max(5, Math.round(sw * H / W));
      tmp.width = sw; tmp.height = sh; const tx = tmp.getContext('2d'); tx.imageSmoothingEnabled = true; tx.drawImage(T.from, 0, 0, sw, sh);
      cx.imageSmoothingEnabled = false; cx.globalAlpha = 1; cx.drawImage(tmp, 0, 0, W, H);
      if (k > 0.55) { cx.globalAlpha = (k - 0.55) / 0.45; draw(); cx.globalAlpha = 1; }
      cv.style.opacity = Math.min(1, k * 3);
    } else {
      cv.style.opacity = 1 - k; // fade the pixel scene out over the 3D world
    }
    if (k >= 1) { const done = T.done; st.trans = null; if (done) done(); }
  }
  // capture the place where the fight happens, from the side, and turn it into a posterized pixel backdrop
  function captureStage(ax, az, bx, bz, hide) {
    const mx = (ax + bx) / 2, mz = (az + bz) / 2; const dx = bx - ax, dz = bz - az, L = Math.hypot(dx, dz) || 1; const nx = -dz / L, nz = dx / L;
    let best = null; for (const s of [1, -1]) { const px = mx + nx * s * 10, pz = mz + nz * s * 10; const free = COL.raycast(mx, mz, px, pz); if (!best || free > best.f) best = { f: free, px: mx + nx * s * 10 * Math.max(0.35, Math.min(1, free) - 0.05), pz: mz + nz * s * 10 * Math.max(0.35, Math.min(1, free) - 0.05) }; }
    const gy = heightAt(mx, mz); const cam = camera.clone(); cam.fov = 62; cam.aspect = W / H; cam.position.set(best.px, gy + 1.7, best.pz); cam.lookAt(mx, gy + 1.5, mz); cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    const vis = hide.map((o) => o && o.visible); hide.forEach((o) => { if (o) o.visible = false; });
    const rt = new THREE.WebGLRenderTarget(W * 2, H * 2); const prevT = renderer.getRenderTarget();
    renderer.setRenderTarget(rt); renderer.clear(); bgCamera.position.copy(cam.position); bgCamera.quaternion.copy(cam.quaternion); renderer.render(bgScene, bgCamera); renderer.clearDepth(); renderer.render(scene, cam); renderer.setRenderTarget(prevT);
    hide.forEach((o, i) => { if (o) o.visible = vis[i]; });
    const px = new Uint8Array(W * 2 * H * 2 * 4); renderer.readRenderTargetPixels(rt, 0, 0, W * 2, H * 2, px); rt.dispose();
    // downsample 2x, flip, posterize with ordered dithering → pixel art
    const c = mkCanvas(W, H), x = c.getContext('2d'); const id = x.createImageData(W, H); const D = id.data; const bay = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) { let r = 0, g = 0, b = 0; for (const [ox, oy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) { const i = ((H * 2 - 1 - (y * 2 + oy)) * W * 2 + xx * 2 + ox) * 4; r += px[i]; g += px[i + 1]; b += px[i + 2]; }
      const th = (bay[(y & 3) * 4 + (xx & 3)] / 16 - 0.5) * 34; const q = (v) => clamp(Math.round((v / 4 + th) / 42) * 42, 0, 255); const o = (y * W + xx) * 4; D[o] = q(r); D[o + 1] = q(g); D[o + 2] = q(b) ; D[o + 3] = 255; }
    x.putImageData(id, 0, 0);
    // darken a little so the fighters pop, and draw the floor line
    x.fillStyle = 'rgba(10,10,30,0.18)'; x.fillRect(0, 0, W, H); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, GROUND + 2, W, H - GROUND - 2);
    return c;
  }
  function grab3D() { render(); const c = mkCanvas(W, H); c.getContext('2d').drawImage(renderer.domElement, 0, 0, W, H); return c; }
  // ---------------- public
  function start(opt) {
    if (running) return; running = true; onEnd = opt.onEnd || null;
    if (!cv) { cv = $('fight2d'); cx = cv.getContext('2d'); cx.imageSmoothingEnabled = false; }
    const from = grab3D();
    bg = captureStage(opt.ax, opt.az, opt.bx, opt.bz, opt.hide || []);
    let nf = 0; try { nf = +localStorage.getItem('gtall_fights') || 0; localStorage.setItem('gtall_fights', nf + 1); } catch (e) { nf = FIGHTS_DONE; } FIGHTS_DONE++;
    st = { a: mkFighter(opt.a, 62, 1), b: mkFighter(opt.b, W - 62, -1), round: 1, phase: nf < 3 || opt.showControls ? 'ready' : 'intro', pt: 0, frame: 0, proj: [], fx: [], stake: opt.stake || 0, tut: opt.tutorial || null, single: opt.single !== false, ev: {}, comboT: 0, shake: 0, slow: 0, banner: '' };
    st.trans = { kind: 'in', t: 0, dur: 0.9, from, tmp: mkCanvas(8, 8), done: null };
    keys.clear(); pressedK.clear(); document.exitPointerLock?.();
    GAME.state = 'fight2d'; document.body.classList.add('fighting'); cv.style.display = 'block'; cv.style.opacity = 0; $('fightPad').style.display = document.body.classList.contains('touchmode') ? 'block' : 'none';
    AUDIO.thud && AUDIO.thud(1); last = performance.now(); acc = 0; raf = requestAnimationFrame(loop);
  }
  function finishFight() {
    const won = st.winner === st.a; const res = { won, hpA: st.a.hp, hpB: st.b.hp, rounds: [st.a.wins, st.b.wins] };
    st.trans = { kind: 'out', t: 0, dur: 0.7, done: () => { running = false; cancelAnimationFrame(raf); cv.style.display = 'none'; $('fightPad').style.display = 'none'; document.body.classList.remove('fighting'); GAME.state = 'play'; GAME.lock(); if (onEnd) onEnd(res); } };
  }
  // touch pad for phones
  function setupPad() {
    const pad = $('fightPad'); if (!pad) return; const map = { fpL: 'ArrowLeft', fpR: 'ArrowRight', fpU: 'Space', fpD: 'ArrowDown', fpP: 'KeyJ', fpK: 'KeyK', fpB: 'KeyL' };
    for (const id in map) { const b = $(id); if (!b) continue; const k = map[id]; b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); if (!keys.has(k)) pressedK.add(k); keys.add(k); b.classList.add('on'); }); const up = (e) => { keys.delete(k); b.classList.remove('on'); }; b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up); }
  }
  return { start, setupPad, get running() { return running; }, _st: () => st, POSES, spritesFor };
})();
// ---- hooking it to the 3D world: punching a pedestrian starts a (short, one round) fight
// women (unless big) take double damage and hit half as hard — and hitting them is always a crime;
// big women hit 10% harder and take half damage; strong men take 10% less and hit twice as hard
function startStreetFight(p) {
  if (FIGHT2D.running || PLAYER.car) return false;
  const lk = { ...(p.H.look || {}) }; const fem = !!lk.female;
  if (p.kind === undefined) p.kind = fem ? (lk.fat || Math.random() < 0.22 ? 'gorda' : 'mujer') : (p.canarion ? 'canarion' : (lk.fat || Math.random() < 0.2 ? 'fuerte' : 'hombre'));
  const K = { mujer: { deal: 0.5, recv: 2, name: 'VECINA' }, gorda: { deal: 1.1, recv: 0.5, name: 'DOÑA' }, fuerte: { deal: 2, recv: 0.9, name: 'CACHAS' }, hombre: { deal: 1, recv: 1, name: 'VECINO' }, canarion: { deal: 1, recv: 1, name: 'CANARIÓN' } }[p.kind];
  if (p.kind === 'gorda') lk.fat = true; if (p.kind === 'fuerte') lk.strong = true;
  const crowd = PEDS.filter((q) => q !== p && q.down <= 0 && Math.hypot(q.x - PLAYER.x, q.z - PLAYER.z) < 25).length;
  const pl = playerHuman.look || {};
  FIGHT2D.start({
    a: { name: 'EL CHOPA', look: { ...pl }, nose: true }, b: { name: K.name, look: lk, deal: K.deal, recv: K.recv, ai: { lv: rnd(0.25, 0.55), t: 0, blockT: 0 } },
    ax: PLAYER.x, az: PLAYER.z, bx: p.x, bz: p.z, hide: [playerHuman.root, p.H.root, WEAPON.mesh],
    onEnd: (r) => {
      if (r.won) { const cash = Math.random() < 0.05 ? 100 : Math.round(rnd(5, 25)); PLAYER.money += cash; AUDIO.cash(); HUD.toast(`¡Pelea ganada! +$${cash}`, cash >= 100 ? '#ffd400' : '#7fe08a', 3); p.down = 6; p.fight = 0; p.paid = true; SUB.show('<b>' + (p.canarion ? 'Canarión' : fem ? 'Vecina' : 'Vecino') + ':</b> ' + pick(p.canarion ? LINES.canCry : LINES.pay), 3); }
      else { PLAYER.health = Math.max(1, PLAYER.health - 10); HUD.toast('Te han dado una paliza… -10 de salud', '#ffb3b3', 3); p.flee = 6; p.fleeFrom = [PLAYER.x, PLAYER.z]; PLAYER.down = 2; SUB.show('<b>' + (fem ? 'Vecina' : 'Peatón') + ':</b> ' + pick(LINES.win), 3); }
      p.fought = true; FIGHT.cd = 1.5;
      if (fem) { WANTED.fine = 100; WANTED.crime(2, 'Agresión a una mujer'); }
      else if (crowd >= 5 && Math.random() < 0.6) { WANTED.fine = WANTED.fine || 100; WANTED.crime(1, 'Pelea callejera (te han visto)'); }
    },
  });
  return true;
}
