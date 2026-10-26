// ============ «JETA SOCCER»: 2D football, 5 a side, seen from above like the 90s Sensible Soccer (v0.67) ============
// A vertical pitch (fútbol 7 size) that scrolls with the ball, tiny pixel players in their team's kit, a radar in the
// corner. You always control the player of your team nearest the ball (or the one with it); the keepers play alone.
// Controls (the same keys as every minigame, Jonay): move like walking; botón A = E / left click: with the ball,
// HOLD to charge the shot and release (the longer, the harder and higher; after the kick, left/right curves it);
// without the ball, a slide tackle. Right click (or Q): with the ball a pass to the mate you face (held longer: harder
// and lofted, like the shot); without it, change to
// the player nearest the ball. Espacio = sprint (turbo bar). All keys in Opciones › Controles.
// v0.75 (Jonay): restarts. The keeper catches the ball with his hands in his box (a save is either held or parried);
// while he holds it, and during every throw-in, corner and goal kick, the other team cannot come within SP_R metres
// (they are kept outside the dashed circle), nobody can tackle or steal it, and the taker cannot run with the ball:
// the keeper passes it straight from where he is, throw-ins are thrown by hand (a pass with a short lob). Sliding into
// a keeper holding the ball is always a foul and he restarts from the goal-kick spot.
// v0.79 (Jonay): the keeper dives full length («palomita») for shots wide of him; after a goal the team that let it in
// kicks off from the centre (with the foot: the rivals keep out of the circle and can't take it until the taker passes
// or runs with it); the shot power has a right spot for each distance (near the goal a full-power shot goes over the
// bar, from near halfway you can hit it as hard as you like); double tap of Espacio = a dribble (a quick swerve the
// rival can't tackle).
const FUTBOL2D = (() => {
  const W = 480, H = 270, R = 3, S = 8;                     // canvas (logical px, drawn at R×) and px per metre
  const PW = 34, PL = 54, GW = 6, GH = 2.1, MG = 7;          // pitch width / length, goal width / height, margin (m)
  const X0 = Math.round((W - PW * S) / 2), BGH = (PL + 2 * MG) * S, BR = 3;
  const sxp = (x) => X0 + x * S, syw = (y) => (y + MG) * S;  // pitch metres -> background px
  let inConsole = false; let cv = null, cx = null, running = false, raf = 0, last = 0, acc = 0, st = null, onEnd = null, camY = 0, bgCache = null;
  // ---------- input: virtual buttons, the same as the basketball (vS = A, vP = pass, vT = sprint)
  const IN = MINI.input(() => running), { press, held, hit, rel } = IN, keys = IN.keys; // v0.69: shared with the other minigames (09ea_minijuegos.js)
  // ---------- sounds
  const snd = MINI.snd, say = (t) => MINI.say(t);
  // ---------- helpers
  const hx = (n, d = '#888') => (typeof n === 'number' ? '#' + (n >>> 0).toString(16).padStart(6, '0') : typeof n === 'string' ? n : d);
  const D = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const goalY = (team) => (team === 0 ? 0 : PL);            // the goal a team ATTACKS (team 0 attacks up)
  const ownY = (team) => (team === 0 ? PL : 0);
  const mates = (p) => st.p.filter((q) => q.team === p.team && q !== p), rivals = (p) => st.p.filter((q) => q.team !== p.team);
  const outfield = (team) => st.p.filter((q) => q.team === team && q.role !== 'gk');
  const SP_R = 3.5; // the no-approach radius round the taker of a restart
  const inOwnBox = (p) => Math.abs(p.x - PW / 2) < 11 && Math.abs(p.y - ownY(p.team)) < 11;
  function banner(t, c = '#ffd400', dur = 1.4) { st.banner = { t, c, dur }; st.bannerT = dur; }
  // formation for 5 a side (team 0, own goal at the bottom): keeper, 2 defenders, a midfielder and a striker
  const FORM = [['gk', PW / 2, PL - 1.2], ['def', PW * 0.3, PL - 13], ['def', PW * 0.7, PL - 13], ['mid', PW * 0.5, PL - 23], ['fwd', PW * 0.5, PL - 33]];
  const home = (p) => (p.team === 0 ? [p.hx, p.hy] : [PW - p.hx, PL - p.hy]);
  function mkPlayer(o, team, i, kit) {
    const [role, hx0, hy0] = FORM[i];
    return { name: o.name || '', look: o.look || {}, team, idx: i, role, hx: hx0, hy: hy0, x: 0, y: 0, vx: 0, vy: 0, dir: team === 0 ? -Math.PI / 2 : Math.PI / 2, lv: 0.5,
      kit: role === 'gk' ? kit.gk : kit, down: 0, slide: 0, kickCD: 0, turbo: 1, anim: Math.random() * 3, hold: 0, dive: 0, think: 0, tx: 0, ty: 0 };
  }
  function kickoff(team) { // everybody in his own half, the ball on the spot for «team»
    for (const p of st.p) { const [x, y] = home(p); p.x = x; p.y = p.team === 0 ? Math.max(y, PL / 2 + 1.5) : Math.min(y, PL / 2 - 1.5); p.vx = p.vy = 0; p.down = p.slide = 0; p.hold = 0; p.dive = 0; p.dir = p.team === 0 ? -Math.PI / 2 : Math.PI / 2; }
    const b = st.ball; Object.assign(b, { x: PW / 2, y: PL / 2, z: 0, vx: 0, vy: 0, vz: 0, owner: null, curve: 0, curveT: 0, shot: null }); st.sp = null;
    const k = st.p.find((q) => q.team === team && q.role === 'fwd'); k.x = PW / 2; k.y = PL / 2 + (team === 0 ? 0.6 : -0.6); give(k);
    st.sp = { p: k, kind: 'centro', t: 0, r: 6, x: k.x, y: k.y }; // v0.79: kick-off from the centre: the rivals outside the circle until it is played
    if (team === 0) st.ctl = k;
  }
  function give(p) { const b = st.ball; b.owner = p; b.z = 0; b.vz = 0; b.curveT = 0; b.shot = null; st.last = p; p.kickCD = 0;
    st.sp = p.role === 'gk' && inOwnBox(p) ? { p, kind: 'gk', t: 0 } : st.sp && st.sp.p === p ? st.sp : null; // in his hands: nobody may come and take it
    if (p.role === 'gk') p.dir = p.team === 0 ? -Math.PI / 2 : Math.PI / 2;
    b.x = p.x + Math.cos(p.dir) * 0.55; b.y = p.y + Math.sin(p.dir) * 0.55; } // the ball goes straight to his feet (a throw-in from outside the line lands inside)
  // ---------- kicks
  function kick(p, ang, speed, vz, curve = 0) {
    if (st.sp && st.sp.p === p) { if (st.sp.kind === 'banda') { speed = Math.min(speed, 13); vz = Math.max(vz, 2.2); curve = 0; } st.sp = null; } // a throw-in: thrown by hand, never a shot
    const b = st.ball; b.owner = null; b.x = p.x + Math.cos(ang) * 0.5; b.y = p.y + Math.sin(ang) * 0.5; b.vx = Math.cos(ang) * speed; b.vy = Math.sin(ang) * speed; b.vz = vz; b.z = Math.max(b.z, 0.05);
    b.curve = curve; b.curveT = curve ? 0.7 : 0; b.kicker = p; st.last = p; p.kickCD = 0.35; snd('kick');
    const gy = goalY(p.team); b.shot = p.role !== 'gk' && Math.abs(gy - p.y) < 30 && Math.sign(gy - p.y) === Math.sign(b.vy) && speed > 11 ? { team: p.team, saved: false } : null;
  }
  function shootAI(p) { const gy = goalY(p.team), side = Math.random() < 0.5 ? -1 : 1, err = (1 - p.lv) * 3.2 * (Math.random() * 2 - 1);
    const tx = PW / 2 + side * (GW / 2 - 0.7) + err, ang = Math.atan2(gy - p.y, tx - p.x); kick(p, ang, 15 + 7 * p.lv, 1 + Math.random() * 2.2); if (st.ev) st.ev.cpuShot = (st.ev.cpuShot || 0) + 1; }
  function passTo(p, q, pw = 0) { // pw 0–1: how long the pass button was held (v0.67, Jonay: longer = harder and lofted)
    const b = st.ball; const lead = 0.45 + pw * 0.4; const tx = q.x + q.vx * lead, ty = q.y + q.vy * lead; const d = Math.hypot(tx - p.x, ty - p.y), a = Math.atan2(ty - p.y, tx - p.x);
    const lob = pw > 0.25 || d > 17;
    if (lob) { const vz = clamp(2.5 + pw * 5 + d * 0.08, 3, 9), T = 2 * vz / 9.8; kick(p, a, clamp(d / T * 0.95, 6, 24), vz); }
    else kick(p, a, clamp(d * 1.55 + 4, 7, 20), 0.3);
    b.shot = null; b.to = q; q.waitPass = 1.6;
    if (p === st.ctl && q.role !== 'gk') st.ctl = q; if (st.ev && p.team === 0 && !st.auto) st.ev.pass = true; }
  function bestPass(p, ang) { let best = null, bs = -1e9;
    for (const q of mates(p)) { if (q.role === 'gk' || q.down > 0) continue; const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1; const c = (dx * Math.cos(ang) + dy * Math.sin(ang)) / d;
      let free = 99; for (const r of rivals(q)) free = Math.min(free, Math.hypot(r.x - q.x, r.y - q.y)); const s = c * 10 - d * 0.12 + Math.min(free, 5) * 0.6; if (s > bs) { bs = s; best = q; } }
    return best; }
  // ---------- AI
  function aiPlayer(p, dt) {
    const b = st.ball, own = b.owner ? b.owner.team === p.team : null; let tx = p.x, ty = p.y, run = false;
    const [hx0, hy0] = home(p); const push = (b.y - PL / 2) * 0.55; // the whole team follows the ball up and down
    if (b.owner === p && st.sp && st.sp.p === p && st.sp.kind === 'centro' && st.sp.t < 0.8) return { tx: p.x, ty: p.y, run: false }; // kick-off: a moment on the spot
    if (b.owner === p) { // dribble to goal, pass when pressed, shoot in range
      const gy = goalY(p.team), dg = Math.hypot(PW / 2 - p.x, gy - p.y); p.think -= dt;
      tx = PW / 2 + (p.x - PW / 2) * 0.6 + Math.sin(st.time0 * 1.3 + p.idx) * 3; ty = gy; run = dg > 14 && p.turbo > 0.3;
      let press = 99; for (const r of rivals(p)) press = Math.min(press, D(p, r));
      if (p.think <= 0) { p.think = 0.25;
        if (dg < 15 + 6 * p.lv && Math.abs(p.x - PW / 2) < 13 && Math.random() < 0.35 + 0.4 * p.lv) shootAI(p);
        else if (press < 2.2 && Math.random() < 0.25 + 0.5 * p.lv) { const q = bestPass(p, Math.atan2(gy - p.y, 0)); if (q) passTo(p, q); }
        else if (dg < 22 && press < 1.4 && Math.random() < 0.3) shootAI(p); }
    } else if (own) { // support: get forward and open
      tx = hx0; ty = clamp(hy0 + push - (p.team === 0 ? 6 : -6), 4, PL - 4);
    } else if (own === false || !b.owner) { // defend / chase: the 1–2 nearest go for the ball, the rest keep their place
      const near = outfield(p.team).filter((q) => q.down <= 0).sort((a, c) => D(a, b) - D(c, b)); const rank = near.indexOf(p);
      if (p.waitPass > 0 && b.to === p) { tx = b.x; ty = b.y; run = true; }
      else if (rank === 0 || (rank === 1 && own === false && D(p, b) < 8)) { tx = b.x + b.vx * 0.25; ty = b.y + b.vy * 0.25; run = D(p, b) > 3; }
      else { tx = hx0 + (b.x - PW / 2) * 0.3; ty = clamp(hy0 + push + (p.team === 0 ? 3 : -3), 3, PL - 3); }
      if (own === false && !st.sp && D(p, b) < 1.0 && p.kickCD <= 0 && !st.tut && Math.random() < dt * (0.25 + 1.6 * p.lv)) tackle(p, b.owner, 0.12 + 0.45 * p.lv);
    }
    if (st.tut && p.team === 1) { tx = p.x; ty = p.y; run = false; }
    return { tx, ty, run };
  }
  function tackle(p, v, chance) { if (!v || v.down > 0 || st.sp || v.drib > 0) return; p.kickCD = 0.6; if (Math.random() < chance) { const b = st.ball; b.owner = null; b.vx = (b.x - v.x) * 3 + (p.x < v.x ? 2 : -2); b.vy = (b.y - v.y) * 3; b.vz = 0.5; st.last = p; v.kickCD = 0.7; if (st.ev && p.team === 0 && p === st.ctl) st.ev.tackle = true; } }
  function keeper(p, dt) {
    if (st.tut && p.team === 1) return { tx: p.x, ty: p.y, sp: 0 };
    const b = st.ball, oy = ownY(p.team), sg = p.team === 0 ? -1 : 1; let tx = clamp(PW / 2 + (b.x - PW / 2) * 0.3, PW / 2 - GW / 2 + 0.4, PW / 2 + GW / 2 - 0.4), ty = oy + sg * 1.1, sp = 5.5;
    if (b.owner === p) { p.hold -= dt; tx = p.x; ty = p.y; if (p.hold <= 0) { // clear it to the most open mate up the pitch
      let best = null, bs = -1e9; for (const q of mates(p)) { let free = 99; for (const r of rivals(q)) free = Math.min(free, D(r, q)); const s = Math.min(free, 8) * 2 + Math.abs(q.y - oy) * 0.15; if (s > bs) { bs = s; best = q; } }
      if (best) passTo(p, best); else kick(p, p.team === 0 ? -Math.PI / 2 : Math.PI / 2, 16, 6); } return { tx, ty, sp: 0 }; }
    const inBox = Math.abs(b.x - PW / 2) < 9 && Math.abs(b.y - oy) < 9;
    if (!b.owner && inBox && Math.hypot(b.vx, b.vy) < 9 && outfield(p.team).every((q) => D(q, b) > D(p, b) - 0.5)) { tx = b.x; ty = b.y; sp = 6; } // come out for a loose ball
    // v0.80 (Jonay: running in you reached the goal without shooting and scored easily): a rival with the ball inside the
    // box → the keeper rushes out and throws himself at his feet; if he hasn't shot by then, the ball is always his
    if (b.owner && b.owner.team !== p.team && !st.sp && Math.abs(b.x - PW / 2) < 11 && Math.abs(b.y - oy) < 11) { tx = b.x; ty = b.y; sp = 8.6 + 1.6 * p.lv;
      if (D(p, b) < 1.5 + 0.3 * p.lv) { const v = b.owner; v.kickCD = 0.7; v.drib = 0; give(p); p.hold = 1.3; p.diveT = 0.35; p.diveS = Math.sign(b.x - p.x) || 1; p.vx = p.diveS * 2; p.diveH = 0; banner('¡SE LA QUITA EL PORTERO!', '#9fd7ff', 1.1); snd('kick'); if (st.ev) st.ev.smother = (st.ev.smother || 0) + 1; return { tx: p.x, ty: p.y, sp: 0 }; } }
    if (b.shot && b.shot.team !== p.team && !b.shot.saved && Math.sign(oy - b.y) === Math.sign(b.vy) && Math.abs(b.vy) > 2) { // a shot coming: dive to where it crosses
      const t = (ty - b.y) / b.vy; if (t > 0 && t < 1.6) { tx = clamp(b.x + b.vx * t, PW / 2 - GW / 2 - 1, PW / 2 + GW / 2 + 1); sp = 6.5 + 3 * p.lv; p.dive = 0.4;
        // v0.79: too wide to reach on foot → a full-length dive («palomita») towards where it crosses, at its height
        const gap = tx - p.x; if (Math.abs(gap) > 1.0 && t < 0.75 && b.z < GH + 0.4 && Math.random() < 0.55 + 0.4 * p.lv) { p.diveT = 0.6; p.diveS = Math.sign(gap); p.vx = p.diveS * clamp(Math.abs(gap) / Math.max(0.25, t) * 1.1, 5, 10.5); p.vy = 0; p.diveH = clamp(b.z + b.vz * t - 4.9 * t * t, 0, GH); snd('swish'); return { tx: p.x, ty: p.y, sp: 0 }; } }
      if (D(p, b) < 1.05 + 0.45 * p.lv && b.z < GH + 0.3) { b.shot.saved = true; const spd = Math.hypot(b.vx, b.vy); const ok = Math.random() < clamp(0.42 + 0.5 * p.lv - (spd - 14) * 0.03, 0.12, 0.92);
        if (ok) { if (Math.random() < 0.55) { give(p); p.hold = 1.2; banner('¡PARADÓN!', '#9fd7ff', 1); } else { b.vx = (b.x < p.x ? -1 : 1) * rnd(5, 8); b.vy = -b.vy * 0.25; b.vz = 2; st.last = p; banner('¡DESPEJA!', '#9fd7ff', 1); } snd('kick'); } else p.kickCD = 0.5; } }
    return { tx, ty, sp };
  }
  // the keeper in the air, stretched out: catches or parries what passes within his reach, then lies down a moment
  function diveStep(p, dt) { p.diveT -= dt; p.x += p.vx * dt; p.vx *= 0.97; const b = st.ball;
    if (b.shot && b.shot.team !== p.team && !b.shot.saved && !b.owner) { const reach = 1.45 + 0.45 * p.lv, dx = b.x - (p.x + p.diveS * 0.5), dy = b.y - p.y;
      if (Math.hypot(dx, dy) < reach && b.z < GH + 0.5) { b.shot.saved = true; const spd = Math.hypot(b.vx, b.vy); const ok = Math.random() < clamp(0.35 + 0.5 * p.lv - (spd - 14) * 0.03, 0.12, 0.85);
        if (ok) { if (Math.random() < 0.4 && spd < 19) { give(p); p.hold = 1.4; banner('¡PALOMITA!', '#9fd7ff', 1.2); } else { b.vx = p.diveS * rnd(4, 7); b.vy = -b.vy * 0.2; b.vz = 2.5; st.last = p; banner('¡VAYA PALOMITA!', '#9fd7ff', 1.2); } snd('kick'); } } }
    if (p.diveT <= 0) { p.diveT = 0; p.vx = 0; if (st.ball.owner !== p) { p.down = 0.45; p.kickCD = 0.5; } } }
  // ---------- one step
  function stepPlayer(p, dt) {
    p.kickCD = Math.max(0, p.kickCD - dt); p.waitPass = Math.max(0, (p.waitPass || 0) - dt); p.dive = Math.max(0, p.dive - dt);
    if (p.drib > 0) { p.drib -= dt; p.x = clamp(p.x + p.vx * dt, -3, PW + 3); p.y = clamp(p.y + p.vy * dt, -2, PL + 2); p.vx *= 0.94; p.vy *= 0.94; p.anim += dt * 14; return; }
    if (p.diveT > 0) { diveStep(p, dt); return; }
    if (p.down > 0) { p.down -= dt; p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx * dt; p.y += p.vy * dt; return; }
    if (p.slide > 0) { p.slide -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.97; p.vy *= 0.97; const b = st.ball;
      if (st.sp && b.owner === st.sp.p && b.owner.team !== p.team && Math.hypot(b.owner.x - p.x, b.owner.y - p.y) < 1.1) { foul(p, b.owner); return; }
      if (!st.sp && !(b.owner && b.owner.drib > 0) && Math.hypot(b.x - p.x, b.y - p.y) < 0.95 && b.z < 0.8) { const v = b.owner; if (v && v.team !== p.team) { v.down = 0.8; v.kickCD = 0.8; } b.owner = null; b.vx = Math.cos(p.dir) * 6; b.vy = Math.sin(p.dir) * 6; b.vz = 0.3; st.last = p; p.slide = Math.min(p.slide, 0.15); if (st.ev && p === st.ctl) st.ev.tackle = true; snd('kick'); }
      return; }
    const ctl = p === st.ctl && !st.auto; let mx = 0, my = 0, run = false, sp = 5.6;
    if (st.sp && st.sp.p === p && p.role !== 'gk' && st.ball.owner === p && st.sp.kind !== 'centro') { // the taker of a throw-in / corner: aims, doesn't walk
      p.vx = p.vy = 0; if (ctl) { const ax = (held('vR') ? 1 : 0) - (held('vL') ? 1 : 0), ay = (held('vD') ? 1 : 0) - (held('vU') ? 1 : 0); if (ax || ay) p.dir = Math.atan2(ay, ax); humanButtons(p, ax, ay); } return; }
    if (p.role === 'gk') { const k = keeper(p, dt); const dx = k.tx - p.x, dy = k.ty - p.y, L = Math.hypot(dx, dy); if (L > 0.15) { mx = dx / L; my = dy / L; } sp = k.sp; if (p.diveT > 0) return; if (sp === 0) { p.vx = p.vy = 0; return; } }
    else if (ctl) { mx = (held('vR') ? 1 : 0) - (held('vL') ? 1 : 0); my = (held('vD') ? 1 : 0) - (held('vU') ? 1 : 0); run = held('vT') && p.turbo > 0; if (mx || my) { const L = Math.hypot(mx, my); mx /= L; my /= L; } }
    else { const a = aiPlayer(p, dt); const dx = a.tx - p.x, dy = a.ty - p.y, L = Math.hypot(dx, dy); if (L > 0.4) { mx = dx / L; my = dy / L; } run = a.run && p.turbo > 0.2; }
    if (p.role !== 'gk') sp = (run ? 7.6 : 5.6) * (p.team === 1 ? 0.78 + 0.25 * p.lv : 1) * (st.ball.owner === p ? 0.9 : 1);
    p.vx = lerp(p.vx, mx * sp, 0.2); p.vy = lerp(p.vy, my * sp, 0.2); p.x = clamp(p.x + p.vx * dt, -3, PW + 3); p.y = clamp(p.y + p.vy * dt, -2, PL + 2);
    if (run && (mx || my)) { p.turbo = Math.max(0, p.turbo - dt * 0.35); if (ctl && st.ev) st.ev.turbo = (st.ev.turbo || 0) + dt; } else p.turbo = Math.min(1, p.turbo + dt * 0.15);
    if (Math.hypot(p.vx, p.vy) > 0.6) { p.dir = Math.atan2(p.vy, p.vx); p.anim += dt * Math.hypot(p.vx, p.vy) * 1.6; }
    if (ctl && (mx || my) && st.ev) st.ev.walk = (st.ev.walk || 0) + dt;
    if (ctl) humanButtons(p, mx, my);
  }
  function humanButtons(p, mx, my) {
    const b = st.ball, ang = (mx || my) ? Math.atan2(my, mx) : p.dir;
    if (hit('vT')) { if (b.owner === p && st.time0 - (st.tapT || -9) < 0.3 && !(p.drib > 0) && !(st.sp && st.sp.p === p && st.sp.kind !== 'centro')) dribble(p, ang); st.tapT = st.time0; }
    if (b.owner === p) {
      if (hit('vS')) { st.charge = 0.001; }
      if (st.charge > 0 && held('vS')) st.charge = Math.min(0.8, st.charge + 1 / 60);
      if (st.charge > 0 && (rel('vS') || st.charge >= 0.8)) { const pw = clamp(st.charge / 0.8, 0.15, 1); st.charge = 0; // shot: towards the goal it helps you aim a little (v0.67: easy in general)
        const gy = goalY(p.team); let a = ang; const sa = Math.sin(a); if (Math.abs(sa) > 0.2 && Math.sign(sa) === Math.sign(gy - p.y) && Math.abs(gy - p.y) < 28) { // aim at the goal mouth, to the side you point (not at the keeper)
          const rx = p.x + Math.cos(a) / sa * (gy - p.y), tx = clamp(rx, PW / 2 - GW / 2 + 0.6, PW / 2 + GW / 2 - 0.6), ga = Math.atan2(gy - p.y, tx - p.x), da = Math.atan2(Math.sin(ga - a), Math.cos(ga - a)); if (Math.abs(da) < 0.7) a += da * 0.6; }
        kick(p, a, 11 + pw * 9, pw < 0.35 ? 0.6 : 0.6 + (pw - 0.35) / 0.65 * 7.2); st.aft = 0.6; if (st.ev) st.ev.shot = true; } // v0.79: full power rises over the bar near the goal and dips under it from ~22 m
      if (hit('vP')) st.pcharge = 0.001;
      if (st.pcharge > 0 && held('vP')) st.pcharge = Math.min(0.8, st.pcharge + 1 / 60);
      if (st.pcharge > 0 && (rel('vP') || st.pcharge >= 0.8)) { const pw = st.pcharge < 0.14 ? 0 : clamp(st.pcharge / 0.8, 0, 1); st.pcharge = 0; const q = bestPass(p, ang);
        if (q) passTo(p, q, pw); else { kick(p, ang, 8 + pw * 12, pw > 0.25 ? 2 + pw * 6 : 0.3); st.ball.shot = null; if (st.ev) st.ev.pass = true; } }
    } else {
      st.charge = 0; st.pcharge = 0;
      if (hit('vS') && p.slide <= 0 && p.kickCD <= 0) { p.slide = 0.55; p.vx = Math.cos(ang) * 8.5; p.vy = Math.sin(ang) * 8.5; p.dir = ang; p.kickCD = 0.9; if (st.ev) st.ev.slide = true; }
      if (hit('vP')) { const n = nearestCtl(true); if (n && n !== p) { st.ctl = n; if (st.ev) st.ev.swap = true; } }
    }
    if (st.aft > 0) { st.aft -= 1 / 60; const bb = st.ball; if (!bb.owner && bb.kicker === p) { const side = (held('vR') ? 1 : 0) - (held('vL') ? 1 : 0); if (side) { bb.curve = side * (p.team === 0 ? 1 : -1) * 7; bb.curveT = Math.max(bb.curveT, 0.3); } } }
  }
  // v0.79: double tap of Espacio with the ball: a swerve away from the nearest rival, who can't take it meanwhile
  function dribble(p, ang) { let r = null, rd = 99; for (const q of rivals(p)) { const d = D(p, q); if (d < rd) { rd = d; r = q; } }
    let side = 1; if (r) { const cr = Math.cos(ang) * (r.y - p.y) - Math.sin(ang) * (r.x - p.x); side = cr > 0 ? -1 : 1; } const a = ang + side * 0.85;
    p.drib = 0.45; p.vx = Math.cos(a) * 9.5; p.vy = Math.sin(a) * 9.5; p.dir = a; p.turbo = Math.max(0, p.turbo - 0.12); snd('swish'); banner('¡REGATE!', '#ffd400', 0.6); if (st.ev) st.ev.dribble = true; }
  function nearestCtl(force) { const b = st.ball; const c = outfield(0).filter((q) => q.down <= 0).sort((a, d) => D(a, b) - D(d, b)); if (!c.length) return st.ctl;
    if (force) return c[0] === st.ctl && c[1] ? c[1] : c[0]; return c[0]; }
  function stepBall(dt) {
    const b = st.ball;
    if (b.owner) { const p = b.owner; if (p.role === 'gk') p.dir = p.team === 0 ? -Math.PI / 2 : Math.PI / 2; const ax = p.x + Math.cos(p.dir) * 0.55, ay = p.y + Math.sin(p.dir) * 0.55; const k = Math.min(1, 14 * dt); b.x += (ax - b.x) * k; b.y += (ay - b.y) * k; b.z = 0; b.vx = p.vx; b.vy = p.vy; }
    else {
    if (b.curveT > 0) { b.curveT -= dt; const sp = Math.hypot(b.vx, b.vy) || 1; b.vx += (-b.vy / sp) * b.curve * dt; b.vy += (b.vx / sp) * b.curve * dt; }
    b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
    if (b.z > 0) b.vz -= 9.8 * dt; if (b.z <= 0) { b.z = 0; if (b.vz < -1.5) b.vz = -b.vz * 0.45; else b.vz = 0; }
    const fr = b.z > 0.05 ? 0.15 : 1.0; b.vx -= b.vx * fr * dt; b.vy -= b.vy * fr * dt; }
    // the goal, the posts and the lines
    if (st.sp && b.owner === st.sp.p) return; // a throw-in / corner taker stands on the line with the ball in his hands
    for (const t of [0, 1]) { const gy = goalY(t); const crossed = t === 0 ? b.y < 0 : b.y > PL; if (!crossed) continue;
      const inPosts = Math.abs(b.x - PW / 2) < GW / 2;
      if (inPosts && b.z < GH) { goal(t); return; }
      if (!b.owner && Math.abs(Math.abs(b.x - PW / 2) - GW / 2) < 0.25 && b.z < GH + 0.2) { b.vy = -b.vy * 0.6; b.y = gy + (t === 0 ? 0.1 : -0.1); snd('post'); banner('¡AL PALO!', '#fff', 0.9); return; }
      outOfPlay('fondo', t); return; }
    if (b.x < 0 || b.x > PW) { outOfPlay('banda'); return; }
    if (b.owner) return;
    // somebody controls it
    for (const p of st.p) { if (p.down > 0 || p.kickCD > 0 || p.slide > 0) continue; const hands = p.role === 'gk' && inOwnBox(p); if (Math.hypot(b.x - p.x, b.y - p.y) < (hands ? 0.9 : 0.7) && b.z < (hands ? 2.2 : 0.9)) {
      if (b.shot && p.role !== 'gk' && Math.hypot(b.vx, b.vy) > 16 && Math.random() < 0.5) { b.vx *= -0.3; b.vy *= -0.3; st.last = p; continue; } // a hard shot bounces off a body
      give(p); if (p.role === 'gk') p.hold = hands ? 1.0 : 0.15; if (p.team === 0 && st.ev && p === st.ctl) st.ev.control = true; if (p.team === 0 && p.role !== 'gk') st.ctl = p; return; } }
  }
  function outOfPlay(kind, t) { // simple restarts: throw-in / corner / goal kick to the right team, after a short pause
    const b = st.ball, lastT = st.last ? st.last.team : 0; snd('whistle');
    if (kind === 'banda') { const team = 1 - lastT; const x = clamp(b.x, 0.3, PW - 0.3), y = clamp(b.y, 1, PL - 1); const p = outfield(team).sort((a, c) => Math.hypot(a.x - x, a.y - y) - Math.hypot(c.x - x, c.y - y))[0];
      p.x = x < PW / 2 ? -0.3 : PW + 0.3; p.y = y; p.dir = x < PW / 2 ? 0 : Math.PI; give(p); st.sp = { p, kind: 'banda', t: 0 }; restart(p, 'SAQUE DE BANDA'); return; }
    const defT = 1 - t; // the team defending that goal line
    if (lastT === defT) { const p = outfield(t).sort((a, c) => D(a, b) - D(c, b))[0]; const cxr = b.x < PW / 2 ? 0.3 : PW - 0.3, cyr = goalY(t) + (t === 0 ? 0.3 : -0.3); p.x = cxr; p.y = cyr; p.dir = Math.atan2(PL / 2 - cyr, PW / 2 - cxr); give(p); st.sp = { p, kind: 'corner', t: 0 }; restart(p, 'CÓRNER'); }
    else goalKick(defT, 'SAQUE DE PUERTA');
  }
  function goalKick(team, label) { const k = st.p.find((q) => q.team === team && q.role === 'gk'); k.x = PW / 2; k.y = ownY(team) + (team === 0 ? -2 : 2); k.vx = k.vy = 0; give(k); k.hold = 1.3; st.sp = { p: k, kind: 'gk', t: 0 }; restart(k, label); }
  // a foul on the taker of a restart (a slide into the keeper holding the ball, or into a throw-in): whistle and again
  function foul(p, v) { const b = st.ball; snd('whistle'); p.slide = 0; p.vx = p.vy = 0; p.down = 0.6; p.kickCD = 1; if (st.ev && p === st.ctl) st.ev.foul = true;
    if (v.role === 'gk') { goalKick(v.team, '¡FALTA AL PORTERO!'); return; }
    st.sp.t = 0; give(v); st.sp = st.sp && st.sp.p === v ? st.sp : { p: v, kind: 'banda', t: 0 }; restart(v, '¡FALTA!'); b.vx = b.vy = 0; }
  // nobody of the other team inside the circle round the taker until the ball is played (a slide may still go in: foul)
  function keepAway() { const sp = st.sp; if (!sp) return; const t = sp.p;
    for (const p of st.p) { if (p.team === t.team || p.slide > 0) continue; const dx = p.x - t.x, dy = p.y - t.y, d = Math.hypot(dx, dy), RR = sp.r || SP_R; if (d >= RR) continue;
      const ux = d > 0.01 ? dx / d : 0, uy = d > 0.01 ? dy / d : (t.team === 0 ? -1 : 1); p.x = t.x + ux * RR; p.y = t.y + uy * RR; const vn = p.vx * ux + p.vy * uy; if (vn < 0) { p.vx -= vn * ux; p.vy -= vn * uy; } } }
  // the CPU (and you, if you wait too long) takes its throw-ins and corners
  function takeRestart(dt) { const sp = st.sp; if (!sp) return; sp.t += dt; const tk = sp.p;
    if (sp.kind === 'centro' && st.ball.owner === tk && Math.hypot(tk.x - sp.x, tk.y - sp.y) > 1.6) { st.sp = null; return; } /* he ran with it: play on */ if (tk.role === 'gk' || st.ball.owner !== tk) { if (st.ball.owner !== tk && tk.role !== 'gk') st.sp = null; return; }
    if (sp.t < 0.9 || (tk === st.ctl && !st.auto && sp.t < 8)) return;
    const ang = Math.atan2(PL / 2 - tk.y, PW / 2 - tk.x); const q = bestPass(tk, ang); if (q) passTo(tk, q, sp.kind === 'corner' ? 0.5 : 0.2); else kick(tk, ang, 10, 2); }
  function restart(p, label) { st.pause = 0.7; banner(label, '#fff', 0.8); if (p.team === 0 && p.role !== 'gk') st.ctl = p; }
  function goal(t) { st.sp = null; st.score[t]++; st.phase = 'goal'; st.pt = 2.4; st.next = 1 - t; st.ball.owner = null; st.ball.vx *= 0.1; st.ball.vy *= 0.1;
    banner('¡GOOOOL!', t === 0 ? '#7fe08a' : '#ff6b6b', 2.2); snd('goal'); snd('whistle'); say('¡Gol!'); if (st.ev && t === 0) st.ev.goal = true;
    if (st.golden) { st.phase = 'end'; st.pt = 3; } }
  function step(dt) {
    st.time0 += dt; if (st.bannerT > 0) st.bannerT -= dt;
    if (st.phase === 'ready') { if (hit('vS') || hit('vP') || st.auto) { st.phase = 'play'; snd('whistle'); } return; }
    if (st.phase === 'goal') { st.pt -= dt; const gb = st.ball; gb.x += gb.vx * dt; gb.y += gb.vy * dt; gb.vx *= 0.9; gb.vy *= 0.9; if (st.pt <= 0) { st.phase = 'play'; kickoff(st.next); } return; }
    if (st.phase === 'end') { st.pt -= dt; if (st.pt <= 0) finish(); return; }
    if (st.pause > 0) { st.pause -= dt; return; }
    if (st.tut) tutorial(dt);
    else if (!st.golden) { st.clock -= dt; if (st.clock <= 0) { st.clock = 0; snd('whistle');
      if (st.score[0] === st.score[1]) { st.golden = true; banner('¡GOL DE ORO!', '#ffd400', 2); say('¡Gol de oro!'); } else { st.phase = 'end'; st.pt = 3; } } }
    // who you control: the one with the ball, or the nearest to it (with a margin so it doesn't flicker)
    const b = st.ball; st.swT = (st.swT || 0) - dt;
    if (!st.ctl || st.ctl.role === 'gk') st.ctl = nearestCtl(false);
    if (b.owner && b.owner.team === 0 && b.owner.role !== 'gk') st.ctl = b.owner;
    else if (st.swT <= 0 && !(b.owner && b.owner.team === 0)) { const n = nearestCtl(false); if (n !== st.ctl && D(n, b) + 2 < D(st.ctl, b) && st.ctl.slide <= 0) { st.ctl = n; } st.swT = 0.25; }
    for (const p of st.p) stepPlayer(p, dt);
    keepAway(); takeRestart(dt);
    // running into the ball takes it off the rival (you: easily; the CPU only by tackling)
    const me = st.ctl; if (!st.auto && !st.sp && me && b.owner && b.owner.team === 1 && b.owner.role !== 'gk' && me.down <= 0 && me.kickCD <= 0 && !(b.owner.drib > 0) && Math.hypot(b.x - me.x, b.y - me.y) < 0.6 && Math.random() < dt * 2.5) { b.owner.kickCD = 0.6; give(me); if (st.ev) st.ev.tackle = true; }
    stepBall(dt);
  }
  // ---------- tutorial (first game, against the seminarians who stand still)
  const K_ = (id) => CONTROLS.keyName(id);
  const TUT = [
    ['walk', () => `Muévete: ${K_('left')} ${K_('right')} ${K_('fwd')} ${K_('back')}`, (e) => (e.walk || 0) > 1.2],
    ['turbo', () => `Corre: mantén ${K_('f_kick')} mientras te mueves (gasta la barra)`, (e) => (e.turbo || 0) > 0.8],
    ['pass', () => `Pasa al compañero al que miras: clic derecho (o ${K_('b_pass')}); mantenido, más fuerte y bombeado`, (e) => e.pass],
    ['shot', () => `Chuta: mantén clic izquierdo (o ${K_('f_punch')}) y suelta; cuanto más, más fuerte`, (e) => e.shot],
    ['goal', () => `¡Mete un gol! (después de chutar, ${K_('left')}/${K_('right')} le dan efecto)`, (e) => e.goal],
    ['slide', () => `Sin balón, clic izquierdo (o ${K_('f_punch')}) es una entrada: quítale el balón al rival`, (e) => e.tackle],
  ];
  function tutorial(dt) {
    const t = st.tut; if (t.i >= TUT.length) return; const [k, tip, ok] = TUT[t.i]; st.tip = `${t.i + 1}/${TUT.length}  ${tip()}`;
    const me = st.ctl, b = st.ball;
    if ((k === 'shot' || k === 'goal' || k === 'pass') && !b.owner && Math.hypot(b.vx, b.vy) < 1 && st.phase === 'play') { const p = st.ctl || outfield(0)[0]; give(p); }
    if (k === 'goal' && t.prep !== 'goal') { t.prep = 'goal'; const p = st.ctl; p.x = PW / 2 + 3; p.y = 16; give(p); }
    if (k === 'slide' && t.prep !== 'slide') { t.prep = 'slide'; const r = st.p.find((q) => q.team === 1 && q.role === 'fwd'); r.x = me.x + 2.5; r.y = me.y - 1; give(r); }
    if (k !== 'slide' && b.owner && b.owner.team === 1) give(st.ctl || outfield(0)[0]);
    if (t.wait > 0) { t.wait -= dt; if (t.wait <= 0) { t.i++; st.ev = {}; if (t.i >= TUT.length) { st.tip = ''; st.tut = null; banner('¡AHORA EN SERIO!', '#ffd400', 1.6); st.score = [0, 0]; kickoff(0); } } return; }
    if (ok(st.ev)) { t.wait = 0.9; st.tip = '¡BIEN!  ' + tip(); AUDIO.cash && AUDIO.cash(); }
  }
  // ---------- drawing
  const txt = (s, x, y, size, col, align) => MINI.txt(cx, s, x, y, size, col, align);
  function drawBg() { // the whole pitch once: striped grass, lines, goals with nets, ad boards and the stands at the sides
    if (bgCache) return bgCache; const c = mkCanvas(W * BR, BGH * BR), x = c.getContext('2d'); x.scale(BR, BR);
    x.fillStyle = '#2d6e34'; x.fillRect(0, 0, W, BGH);
    for (let k = 0; k < (PL + 2 * MG) / 4; k++) { x.fillStyle = k % 2 ? '#3f8f45' : '#46994c'; x.fillRect(X0 - 3 * S, k * 4 * S, (PW + 6) * S, 4 * S); }
    let rs = 11; const rr = () => { rs = (rs * 9301 + 49297) % 233280; return rs / 233280; };
    for (let i = 0; i < 2600; i++) { x.fillStyle = `rgba(${rr() < 0.5 ? '0,0,0' : '255,255,255'},0.05)`; x.fillRect(X0 - 3 * S + rr() * (PW + 6) * S, rr() * BGH, 1, 1); }
    // stands and ad boards beside the pitch
    for (const side of [0, 1]) { const x0 = side ? sxp(PW) + 3 * S + 4 : 0, w = side ? W - x0 : sxp(0) - 3 * S - 4;
      x.fillStyle = '#5b5f66'; x.fillRect(x0, 0, w, BGH); for (let r2 = 0; r2 < w; r2 += 5) { x.fillStyle = r2 % 10 ? '#6c7078' : '#575b62'; x.fillRect(x0 + r2, 0, 4, BGH); }
      for (let k = 0; k < BGH; k += 3) if (rr() < 0.3) { x.fillStyle = ['#c0392b', '#2e86c1', '#f1c40f', '#ecf0f1', '#27ae60', '#7e2a8c'][(rr() * 6) | 0]; x.fillRect(x0 + rr() * (w - 3), k, 2, 2); } }
    const ads = ['GOFIO LA MOLINETA', 'PAPAS EL MAGO', 'AYTO. DE LA LAGUNA', 'GUAGUAS TITSA-NO', 'MIEL DE PALMA', 'DORADITA SIN', 'RON ALDEA-NO'];
    x.font = '5px "Press Start 2P", monospace'; x.textAlign = 'center';
    for (const side of [0, 1]) { const bx = side ? sxp(PW) + 3 * S - 3 : sxp(0) - 3 * S - 1;
      for (let k = 0; k * 46 < BGH; k++) { x.fillStyle = ['#1d4f9c', '#c0392b', '#1d6b45', '#7a2b8c', '#b9770e'][k % 5]; x.fillRect(bx, k * 46, 4, 44); x.save(); x.translate(bx + 2, k * 46 + 22); x.rotate(Math.PI / 2); x.fillStyle = '#fff'; x.fillText(ads[k % ads.length].slice(0, 8), 0, -2); x.restore(); } }
    // lines
    x.strokeStyle = '#f4f4ee'; x.lineWidth = 1.2; x.strokeRect(sxp(0), syw(0), PW * S, PL * S);
    x.beginPath(); x.moveTo(sxp(0), syw(PL / 2)); x.lineTo(sxp(PW), syw(PL / 2)); x.stroke();
    x.beginPath(); x.arc(sxp(PW / 2), syw(PL / 2), 6 * S, 0, 7); x.stroke(); x.fillStyle = '#f4f4ee'; x.fillRect(sxp(PW / 2) - 1, syw(PL / 2) - 1, 2, 2);
    for (const t of [0, 1]) { const y0 = t ? PL : 0, sg = t ? -1 : 1;
      x.strokeRect(sxp(PW / 2 - 11), syw(Math.min(y0, y0 + sg * 11)), 22 * S, 11 * S); x.strokeRect(sxp(PW / 2 - 5), syw(Math.min(y0, y0 + sg * 4)), 10 * S, 4 * S);
      x.fillRect(sxp(PW / 2) - 1, syw(y0 + sg * 8) - 1, 2, 2); x.beginPath(); x.arc(sxp(PW / 2), syw(y0 + sg * 8), 6 * S, t ? Math.PI * 1.2 : Math.PI * 0.2, t ? Math.PI * 1.8 : Math.PI * 0.8); x.stroke();
      // the goal: net behind the line, white posts
      const gy0 = t ? syw(PL) : syw(0) - 2.2 * S; x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(sxp(PW / 2 - GW / 2), gy0, GW * S, 2.2 * S);
      x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 0.5; for (let k = 0; k <= GW * S; k += 3) { x.beginPath(); x.moveTo(sxp(PW / 2 - GW / 2) + k, gy0); x.lineTo(sxp(PW / 2 - GW / 2) + k, gy0 + 2.2 * S); x.stroke(); }
      for (let k = 0; k <= 2.2 * S; k += 3) { x.beginPath(); x.moveTo(sxp(PW / 2 - GW / 2), gy0 + k); x.lineTo(sxp(PW / 2 + GW / 2), gy0 + k); x.stroke(); }
      x.fillStyle = '#fff'; x.fillRect(sxp(PW / 2 - GW / 2) - 1, gy0, 2, 2.2 * S); x.fillRect(sxp(PW / 2 + GW / 2) - 1, gy0, 2, 2.2 * S); x.strokeStyle = '#f4f4ee'; x.lineWidth = 1.2; }
    bgCache = c; return c;
  }
  const sy = (y) => syw(y) - camY;
  function drawPlayer(p) { // a tiny Sensible Soccer man: shadow, legs (running), shorts, shirt, arms, head seen from above-front
    const px = Math.round(sxp(p.x)), py = Math.round(sy(p.y)); if (py < -20 || py > H + 20) return;
    const K = p.kit, look = p.look, skin = hx(look.skin, '#d9a47c'), hair = hx(look.hair, '#222');
    cx.fillStyle = 'rgba(0,0,0,0.3)'; cx.beginPath(); cx.ellipse(px, py, 4, 1.6, 0, 0, 7); cx.fill();
    if (p.diveT > 0) { // the «palomita»: stretched out sideways in the air, arms first, a shadow below
      const s = p.diveS || 1, lift = Math.round(3 + (p.diveH || 0) * S * 0.5 * Math.sin(Math.PI * clamp(1 - p.diveT / 0.6, 0, 1)));
      cx.fillStyle = 'rgba(0,0,0,0.3)'; cx.beginPath(); cx.ellipse(px, py, 7, 1.6, 0, 0, 7); cx.fill(); const y0 = py - 6 - lift;
      cx.fillStyle = K.socks; cx.fillRect(px - 8 * s - (s < 0 ? 2 : 0), y0 + 1, 3, 2); cx.fillStyle = K.shorts; cx.fillRect(px - 5 * s - (s < 0 ? 3 : 0), y0, 3, 3);
      cx.fillStyle = K.shirt; cx.fillRect(px - 2 * s - (s < 0 ? 5 : 0), y0 - 0.5, 5, 4); cx.fillStyle = skin; cx.fillRect(px + 3 * s - (s < 0 ? 3 : 0), y0 - 0.5, 3, 3);
      cx.fillStyle = '#f2f2f2'; cx.fillRect(px + 6 * s - (s < 0 ? 3 : 0), y0 - 1.5, 3, 1.4); cx.fillRect(px + 6 * s - (s < 0 ? 3 : 0), y0 + 2.2, 3, 1.4); return; } // gloves
    if (p.down > 0 || p.slide > 0) { // lying / sliding: a horizontal man
      const s = Math.cos(p.dir) >= 0 ? 1 : -1; cx.fillStyle = K.socks; cx.fillRect(px - 6 * s - (s < 0 ? 3 : 0), py - 3, 3, 2); cx.fillStyle = K.shorts; cx.fillRect(px - 3 * s - (s < 0 ? 3 : 0), py - 4, 3, 3);
      cx.fillStyle = K.shirt; cx.fillRect(px - (s < 0 ? 4 : 0), py - 5, 4, 4); cx.fillStyle = skin; cx.fillRect(px + 4 * s - (s < 0 ? 3 : 0), py - 5, 3, 3); return; }
    const ph = Math.sin(p.anim * 2.4), mv = Math.hypot(p.vx, p.vy) > 0.6, l1 = mv ? Math.round(ph * 1.5) : 0;
    const view = Math.abs(Math.sin(p.dir)) > Math.abs(Math.cos(p.dir)) ? (Math.sin(p.dir) < 0 ? 'up' : 'down') : 'side';
    cx.fillStyle = K.socks; cx.fillRect(px - 2, py - 4 + l1, 1.5, 4 - l1); cx.fillRect(px + 0.5, py - 4 - l1, 1.5, 4 + l1);
    cx.fillStyle = '#111'; cx.fillRect(px - 2.2, py - 0.6 + l1 * 0.5, 2, 1); cx.fillRect(px + 0.3, py - 0.6 - l1 * 0.5, 2, 1);
    cx.fillStyle = K.shorts; cx.fillRect(px - 2.5, py - 6, 5, 2.5);
    cx.fillStyle = K.shirt; cx.fillRect(px - 3, py - 10.5, 6, 4.8); if (K.stripe) { cx.fillStyle = K.stripe; cx.fillRect(px - 1, py - 10.5, 2, 4.8); }
    cx.fillStyle = K.sleeve || K.shirt; cx.fillRect(px - 4, py - 10 - l1 * 0.4, 1.2, 3.2); cx.fillRect(px + 2.8, py - 10 + l1 * 0.4, 1.2, 3.2);
    cx.fillStyle = skin; cx.fillRect(px - 4, py - 7 - l1 * 0.4, 1.2, 1.2); cx.fillRect(px + 2.8, py - 7 + l1 * 0.4, 1.2, 1.2);
    cx.fillStyle = skin; cx.fillRect(px - 1.8, py - 14, 3.6, 3.6);
    cx.fillStyle = hair; if (view === 'up') cx.fillRect(px - 1.8, py - 14.3, 3.6, 3.2); else { cx.fillRect(px - 1.8, py - 14.4, 3.6, 1.3); if (view === 'side') cx.fillRect(px - (Math.cos(p.dir) > 0 ? 1.8 : -0.6), py - 14, 1.2, 2.4); }
    if (view === 'down') { cx.fillStyle = '#111'; cx.fillRect(px - 1, py - 12.4, 0.7, 0.7); cx.fillRect(px + 0.4, py - 12.4, 0.7, 0.7); }
    if (p === st.ctl && !st.auto) { cx.fillStyle = '#ffd400'; cx.beginPath(); cx.moveTo(px - 3, py - 19); cx.lineTo(px + 3, py - 19); cx.lineTo(px, py - 16); cx.fill(); txt(p.name.slice(0, 10), px, py - 26, 4, '#ffd400'); }
    if (p === st.ctl && st.pcharge > 0.14) { const f = st.pcharge / 0.8; cx.fillStyle = 'rgba(0,0,0,0.7)'; cx.fillRect(px - 9, py - 14, 3, 12); cx.fillStyle = '#5ec8ff'; cx.fillRect(px - 8.5, py - 2.5 - 11 * f, 2, 11 * f); }
    if (p === st.ctl && st.charge > 0) { const f = st.charge / 0.8; cx.fillStyle = 'rgba(0,0,0,0.7)'; cx.fillRect(px + 6, py - 14, 3, 12); cx.fillStyle = f > 0.55 ? '#ffd400' : '#7fe08a'; cx.fillRect(px + 6.5, py - 2.5 - 11 * f, 2, 11 * f); }
  }
  function drawBall() { const b = st.ball; const hh = b.owner && st.sp && st.sp.p === b.owner && st.sp.kind !== 'corner' ? b.owner : null; // in the keeper's hands / over the head for a throw-in
    if (hh) { const px = sxp(hh.x), py = sy(hh.y) - (st.sp.kind === 'banda' ? 15.5 : 9); cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(px, py, 1.8, 0, 7); cx.fill(); cx.fillStyle = '#222'; cx.fillRect(px - 0.6, py - 0.6, 1.2, 1.2); return; }
    const px = sxp(b.x), py = sy(b.y), lift = b.z * S * 0.8, r = 1.7 + Math.min(1.2, b.z * 0.25);
    cx.fillStyle = 'rgba(0,0,0,0.35)'; cx.beginPath(); cx.ellipse(px, py, 1.8, 0.9, 0, 0, 7); cx.fill();
    cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(px, py - 1.5 - lift, r, 0, 7); cx.fill(); cx.fillStyle = '#222'; cx.fillRect(px - 0.6, py - 2.1 - lift, 1.2, 1.2); }
  function drawRadar() { const w = 34, h = PL / PW * 34, x0 = W - w - 8, y0 = H - h - 8; cx.fillStyle = 'rgba(0,0,0,0.55)'; cx.fillRect(x0 - 2, y0 - 2, w + 4, h + 4); cx.strokeStyle = 'rgba(255,255,255,0.6)'; cx.lineWidth = 0.5; cx.strokeRect(x0, y0, w, h);
    cx.beginPath(); cx.moveTo(x0, y0 + h / 2); cx.lineTo(x0 + w, y0 + h / 2); cx.stroke();
    for (const p of st.p) { cx.fillStyle = p === st.ctl ? '#ffd400' : p.team === 0 ? '#7fe08a' : '#ff6b6b'; cx.fillRect(x0 + p.x / PW * w - 1, y0 + p.y / PL * h - 1, 2, 2); }
    cx.fillStyle = '#fff'; cx.fillRect(x0 + st.ball.x / PW * w - 0.75, y0 + st.ball.y / PL * h - 0.75, 1.5, 1.5); }
  function updateCam(k = 0.12) { const b = st.ball; const target = clamp(syw(b.y) - H * 0.55, 0, BGH - H); camY = lerp(camY, target, k); }
  function draw() {
    cx.setTransform(R, 0, 0, R, 0, 0); cx.imageSmoothingEnabled = false; const bg = drawBg(); cx.drawImage(bg, 0, camY * BR, W * BR, H * BR, 0, 0, W, H);
    if (st.sp && st.ball.owner === st.sp.p) { const t = st.sp.p; cx.save(); cx.strokeStyle = 'rgba(255,255,255,0.55)'; cx.lineWidth = 0.8; cx.setLineDash([3, 3]); cx.beginPath(); cx.arc(sxp(t.x), sy(t.y), (st.sp.r || SP_R) * S, 0, 7); cx.stroke(); cx.restore(); }
    const items = st.p.map((p) => ({ y: p.y, f: () => drawPlayer(p) })); items.push({ y: st.ball.y + 0.01, f: drawBall }); items.sort((a, c) => a.y - c.y).forEach((it) => it.f());
    // crossbars over the players near the goals
    for (const t of [0, 1]) { const gy = t ? sy(PL) : sy(0); cx.fillStyle = '#fff'; cx.fillRect(sxp(PW / 2 - GW / 2) - 1, gy - GH * S * 0.8, GW * S + 2, 1.5); }
    cx.fillStyle = 'rgba(0,0,0,0.72)'; cx.fillRect(W / 2 - 120, 6, 240, 26); cx.fillStyle = '#ffd400'; cx.fillRect(W / 2 - 120, 6, 240, 1.5);
    txt(st.names[0], W / 2 - 74, 10, 6, '#7fe08a'); txt(st.names[1], W / 2 + 74, 10, 6, '#ff6b6b'); txt(String(st.score[0]), W / 2 - 74, 20, 8, '#fff'); txt(String(st.score[1]), W / 2 + 74, 20, 8, '#fff');
    const min = Math.min(90, Math.floor((1 - st.clock / st.time) * 90)); txt(st.tut ? "--'" : st.golden ? 'ORO' : `${min}'`, W / 2, 14, 8, st.golden ? '#ffd400' : '#fff');
    const hu = st.ctl || st.p[1]; MINI.turbo(cx, H, hu.turbo);
    drawRadar();
    if (st.tip) { cx.fillStyle = 'rgba(0,0,0,0.7)'; cx.fillRect(30, H - 46, W - 90, 16); txt(st.tip, (W - 60) / 2, H - 41, 5, '#ffd400'); }
    MINI.banner(cx, st, W, 60, 9);
    if (st.phase === 'ready') { cx.fillStyle = 'rgba(0,0,0,0.82)'; cx.fillRect(60, 48, W - 120, 150); txt('JETA SOCCER · 5 CONTRA 5', W / 2, 56, 9, '#ffd400');
      const rows = [['MOVERSE', `${K_('left')} ${K_('right')} ${K_('fwd')} ${K_('back')}`], ['CHUTAR (mantén y suelta)', `clic izq. · ${K_('f_punch')}`], ['EFECTO (tras chutar)', `${K_('left')} / ${K_('right')}`], ['PASAR (mantén: más fuerte y bombeado)', `clic dcho. · ${K_('b_pass')}`], ['ENTRADA (sin balón)', `clic izq. · ${K_('f_punch')}`], ['CAMBIAR DE JUGADOR', `clic dcho. · ${K_('b_pass')}`], ['CORRER (turbo)', K_('f_kick')], ['REGATE (con balón)', `${K_('f_kick')} dos veces`]];
      MINI.rows(cx, W, rows, 74);
      if (Math.floor(st.time0 * 2) % 2 === 0) txt(`CLIC IZQ. O ${K_('f_punch').toUpperCase()} PARA EMPEZAR`, W / 2, 184, 7, '#7fe08a'); }
    if (st.phase === 'end') MINI.endScreen(cx, W, st.score);
    if (st.fade > 0) { cx.fillStyle = `rgba(0,0,0,${st.fade})`; cx.fillRect(0, 0, W, H); }
  }
  // ---------- loop
  function loop(now) {
    if (!running) return; raf = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000); last = now; acc += dt;
    while (acc >= 1 / 60) { step(1 / 60); IN.frame(); acc -= 1 / 60; updateCam(); }
    if (st.fadeDir) { st.fade = clamp(st.fade + st.fadeDir * dt * 2.5, 0, 1); if (st.fadeDir < 0 && st.fade === 0) st.fadeDir = 0; if (st.fadeDir > 0 && st.fade === 1) { st.fadeDir = 0; close(); return; } }
    draw();
  }
  // ---------- public: start({ team: [5 × {name, look}], rival: [5 × …], kit, rivalKit, teamName, rivalName, time, lv, mateLv, tutorial, auto, onEnd })
  const KIT0 = { shirt: '#1f8f4e', shorts: '#f2f2f2', socks: '#1f8f4e', gk: { shirt: '#f1c40f', shorts: '#222', socks: '#f1c40f' } };
  const KIT1 = { shirt: '#c0392b', shorts: '#222', socks: '#c0392b', gk: { shirt: '#5ec8ff', shorts: '#222', socks: '#5ec8ff' } };
  function start(opt) {
    if (running || (typeof FIGHT2D !== 'undefined' && FIGHT2D.running) || (typeof BASKET2D !== 'undefined' && BASKET2D.running)) return false; running = true; onEnd = opt.onEnd || null; inConsole = !!opt.inConsole;
    if (!cv) { cv = document.createElement('canvas'); cv.id = 'futbol2d'; cv.width = W * R; cv.height = H * R; cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;object-fit:contain;image-rendering:pixelated;background:#000;z-index:28;display:none'; document.body.appendChild(cv); cx = cv.getContext('2d'); }
    const k0 = { ...KIT0, ...(opt.kit || {}) }, k1 = { ...KIT1, ...(opt.rivalKit || {}) }; k0.gk = { ...KIT0.gk, ...((opt.kit || {}).gk || {}) }; k1.gk = { ...KIT1.gk, ...((opt.rivalKit || {}).gk || {}) };
    const t0 = opt.team || [], t1 = opt.rival || [];
    st = { p: [], ball: { x: PW / 2, y: PL / 2, z: 0, vx: 0, vy: 0, vz: 0, owner: null, curve: 0, curveT: 0, shot: null }, score: [0, 0], time: opt.time || 180, clock: opt.time || 180,
      names: [opt.teamName || 'JETA', opt.rivalName || 'RIVALES'], phase: 'ready', pt: 0, time0: 0, bannerT: 0, banner: null, tip: '', ev: {}, golden: false, ctl: null, charge: 0, pcharge: 0, aft: 0, pause: 0,
      tut: opt.tutorial ? { i: 0, wait: 0 } : null, sp: null, auto: !!opt.auto, fade: 1, fadeDir: -1 };
    for (let i = 0; i < 5; i++) st.p.push(mkPlayer(t0[i] || { name: 'JUG ' + (i + 1) }, 0, i, k0));
    for (let i = 0; i < 5; i++) st.p.push(mkPlayer(t1[i] || { name: 'RIV ' + (i + 1) }, 1, i, k1));
    for (const q of st.p) q.lv = q.team === 1 ? opt.lv ?? 0.5 : opt.mateLv ?? 0.6;
    kickoff(0); st.ctl = st.p.find((q) => q.team === 0 && q.role === 'fwd'); updateCam(1); IN.reset(); document.exitPointerLock?.();
    MINI.show(cv, 'futbol2d'); last = performance.now(); acc = 0; raf = requestAnimationFrame(loop); return true;
  }
  function finish() { if (!st || st.fadeDir > 0) return; st.fadeDir = 1; }
  function close() { running = false; cancelAnimationFrame(raf); MINI.hide(cv, 'futbol2d', !inConsole); /* v0.86: back to the GOFIO-8, not to the 3D world */
    const res = { won: st.score[0] > st.score[1], score: st.score.slice() }; if (onEnd) onEnd(res); }
  function abort() { if (!running) return; running = false; cancelAnimationFrame(raf); MINI.hide(cv, 'futbol2d', false); } // tests only
  return { start, _abort: abort, get running() { return running; }, _st: () => st, _foul: (p, v) => foul(p, v), _give: (p) => give(p), _out: (k, t) => outOfPlay(k, t), _step: (n = 1) => { for (let i = 0; i < n; i++) { step(1 / 60); IN.frame(); updateCam(); } }, _press: press, _draw: () => draw() };
})();
