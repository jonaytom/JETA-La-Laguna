// ============ pedestrians & wanted level ============
const PEDWAYS = []; const PEDKEY = new Map(); const RI2PW = new Map();
(function buildPedNet() {
  const ok = ['pedestrian', 'footway', 'residential', 'living_street', 'tertiary', 'secondary', 'primary', 'unclassified', 'steps', 'tertiary_link'];
  DATA.R.forEach((rd, ri) => {
    const t = RTN[rd[0]]; if (!ok.includes(t) || (rd[3] & 4)) return;
    const road = !['pedestrian', 'footway', 'steps'].includes(t);
    const id = PEDWAYS.length; RI2PW.set(ri, id); PEDWAYS.push({ c: rd[4], road, w: rd[2], hist: isHistoric(rd[4][0], rd[4][1]), t });
    const c = rd[4]; for (let i = 0; i < c.length; i += 2) { const k = c[i] + ',' + c[i + 1]; let l = PEDKEY.get(k); if (!l) PEDKEY.set(k, l = []); l.push([id, i / 2]); }
  });
})();
const PEDS = [];
const PEDLINES = ['¡Guas, mira por dónde vas, chacho!', '¡Guas, mi niño!', '¡Mira por dónde vas, chacho!', '¡Ay mi madre!', '¿Qué pasó, mi niño?', '¡Fuerte empujón, eh!', 'Muchacho, ten cuidado…', '¡Chacho, qué fuerte!', '¡Estás tolete o qué!'];
function spawnPed(x, z, near = false) {
  if (PEDS.length > Q.peds + 8) return null;
  const long = Math.random() < 0.45;
  const can = Math.random() < 0.08;
  const H = can ? makeHuman({ shirt: 0xffd400, pants: 0x1f4ea8, female: false, sleeve: false, cap: Math.random() < 0.5 ? 0xffd400 : undefined }) : makeHuman({ female: long, fat: Math.random() < 0.16, shirt: long && Math.random() < 0.5 ? pick([0xc2185b, 0x7b1fa2, 0xf06292, 0xffffff, 0x80cbc4]) : undefined });
  scene.add(H.root);
  const p = { canarion: can, H, x, z, h: Math.random() * 6.28, speed: rnd(1.1, 1.6), way: -1, seg: 0, dir: 1, off: 0, flee: 0, down: 0, fleeFrom: null, talk: 0 };
  if (!near) {
    const rd = ROADSEG.nearest(x, z, (r) => ['pedestrian', 'footway', 'residential', 'living_street', 'tertiary', 'secondary', 'primary', 'unclassified'].includes(RTN[r[0]]));
    if (!rd) { scene.remove(H.root); return null; }
    const way = RI2PW.has(rd.ri) ? RI2PW.get(rd.ri) : -1; if (way < 0) { scene.remove(H.root); return null; }
    const W = PEDWAYS[way]; p.way = way; p.seg = rd.i / 2; p.dir = Math.random() < 0.5 ? 1 : -1; if (p.dir < 0) p.seg += 1;
    p.off = W.road ? (W.w / 2 + 1.1) * (Math.random() < 0.5 ? 1 : -1) : rnd(-W.w / 3, W.w / 3);
    const L = Math.hypot(rd.dx, rd.dz) || 1; p.x = rd.x - rd.dz / L * p.off; p.z = rd.z + rd.dx / L * p.off;
    const r = COL.resolve(p.x, p.z, 0.3); p.x = r.x; p.z = r.z;
  }
  PEDS.push(p); return p;
}
function pedTarget(p) {
  const W = PEDWAYS[p.way]; const c = W.c; const n = c.length / 2;
  const i = p.seg, j = p.seg + p.dir;
  if (j < 0 || j >= n) return null;
  const x1 = c[i * 2], z1 = c[i * 2 + 1], x2 = c[j * 2], z2 = c[j * 2 + 1]; const L = Math.hypot(x2 - x1, z2 - z1) || 1;
  const dx = (x2 - x1) / L, dz = (z2 - z1) / L; const off = p.off * p.dir; // keep same physical side
  return [x2 - dz * off, z2 + dx * off];
}
function advancePed(p) {
  const W = PEDWAYS[p.way]; const n = W.c.length / 2; p.seg += p.dir;
  if (p.seg <= 0 || p.seg >= n - 1 || Math.random() < 0.12) {
    const k = W.c[p.seg * 2] + ',' + W.c[p.seg * 2 + 1]; const opts = (PEDKEY.get(k) || []).filter((o) => o[0] !== p.way || Math.random() < 0.1);
    if (opts.length) { const o = pick(opts); const NW = PEDWAYS[o[0]]; const nn = NW.c.length / 2; p.way = o[0]; p.seg = o[1]; p.dir = o[1] >= nn - 1 ? -1 : o[1] <= 0 ? 1 : Math.random() < 0.5 ? 1 : -1; const s = Math.sign(p.off) || 1; p.off = NW.road ? (NW.w / 2 + 1.1) * s : rnd(-NW.w / 3, NW.w / 3); }
    else if (p.seg <= 0 || p.seg >= n - 1) { p.dir = -p.dir; }
  }
}
function updatePeds(dt) {
  if (PLAYER.interior) { for (const h of INT_NPCS) animHuman(h, dt, 0); return; }
  // spawn/despawn
  for (let i = PEDS.length - 1; i >= 0; i--) { const p = PEDS[i]; if (p.gone || Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z) > 150) { scene.remove(p.H.root); PEDS.splice(i, 1); } }
  if (PEDS.length < Q.peds) { const a = Math.random() * 6.28, d = rnd(35, 120); const x = PLAYER.x + Math.sin(a) * d, z = PLAYER.z + Math.cos(a) * d; spawnPed(x, z); }
  for (const p of PEDS) {
    const dp = Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z);
    if (p.down > 0) { p.down -= dt; p.x += (p.vx || 0) * dt; p.z += (p.vz || 0) * dt; p.vx *= 0.9; p.vz *= 0.9; const r = COL.resolve(p.x, p.z, 0.3); p.x = r.x; p.z = r.z; animHuman(p.H, dt, 0, 'down'); if (p.down <= 0) { p.flee = 10; p.fleeFrom = [PLAYER.x, PLAYER.z]; } p.H.root.position.set(p.x, heightAt(p.x, p.z) + 0.17, p.z); continue; }
    // hit by cars
    for (const c of CARS) { if (c.speed < 4 || Math.abs(c.x - p.x) > 7 || Math.abs(c.z - p.z) > 7 || underground(c.x, c.z, c.y)) continue; for (const [cx, cz, cr] of c.circles()) { if (Math.hypot(p.x - cx, p.z - cz) < cr + 0.3) { p.down = 4; p.vx = c.vx * 0.8 + rnd(-2, 2); p.vz = c.vz * 0.8 + rnd(-2, 2); AUDIO.thud(dp); if (c.driver === 'player') { WANTED.crime(1, 'Atropello'); MISSIONS.onEvent('hitped'); } break; } } if (p.down > 0) break; }
    if (p.down > 0) continue;
    if (combatPed(p, dt)) continue;
    // danger → flee
    if (PLAYER.car && PLAYER.car.speed > 9 && dp < 12) { p.flee = 5; p.fleeFrom = [PLAYER.x, PLAYER.z]; }
    if (WANTED.level > 0 && dp < 25 && Math.random() < 0.01) { p.flee = 6; p.fleeFrom = [PLAYER.x, PLAYER.z]; }
    let tx, tz, sp;
    if (p.flee > 0) { p.flee -= dt; const fx = p.x - p.fleeFrom[0], fz = p.z - p.fleeFrom[1], fl = Math.hypot(fx, fz) || 1; tx = p.x + fx / fl * 5; tz = p.z + fz / fl * 5; sp = 5.2; }
    else if (p.way >= 0) { const t = pedTarget(p); if (!t) { advancePed(p); continue; } tx = t[0]; tz = t[1]; sp = p.speed; if (Math.hypot(tx - p.x, tz - p.z) < 1.2) advancePed(p); }
    else { sp = 0; tx = p.x; tz = p.z; if (p.flee <= 0) p.way = -1; }
    if (p.way < 0 && p.flee <= 0) { const rd = ROADSEG.nearest(p.x, p.z); if (rd) { const w = RI2PW.has(rd.ri) ? RI2PW.get(rd.ri) : -1; if (w >= 0) { p.way = w; p.seg = rd.i / 2; p.dir = 1; p.off = PEDWAYS[w].road ? PEDWAYS[w].w / 2 + 1.1 : 0; } } }
    // idle chatting
    let dx = tx - p.x, dz = tz - p.z; const L = Math.hypot(dx, dz);
    if (p.talk > 0) { p.talk -= dt; sp = 0; } else if (p.flee <= 0 && Math.random() < 0.0007) p.talk = rnd(2, 6);
    let mv = 0; const ox = p.x, oz = p.z;
    if (L > 0.05 && sp > 0) { dx /= L; dz /= L; mv = sp; p.h += angDiff(p.h, Math.atan2(dx, dz)) * clamp(dt * 6, 0, 1); p.x += dx * sp * dt; p.z += dz * sp * dt; }
    // separation from player
    if (!PLAYER.car && dp < 0.75) { const k = (0.75 - dp) / (dp || 1); p.x += (p.x - PLAYER.x) * k; p.z += (p.z - PLAYER.z) * k; if (PLAYER.speed > 3 && Math.random() < 0.05) { SUB.show(p.canarion ? '<b>Canarión:</b> ' + pick(LINES.canBrav) : pick(PEDLINES), 2.5); p.flee = 2; p.fleeFrom = [PLAYER.x, PLAYER.z]; } }
    const r = COL.resolve(p.x, p.z, 0.3); p.x = r.x; p.z = r.z;
    // walking into a wall? (moving much less than intended) → step towards the middle of the way, then turn round, then give up
    if (mv > 0 && dt > 0) { const real = Math.hypot(p.x - ox, p.z - oz); if (real < mv * dt * 0.35) p.stuck = (p.stuck || 0) + dt; else p.stuck = Math.max(0, (p.stuck || 0) - dt * 2); }
    if (p.stuck > 0.45) { p.stuck = 0; p.strikes = (p.strikes || 0) + 1;
      if (p.flee > 0) { const a = Math.atan2(p.x - p.fleeFrom[0], p.z - p.fleeFrom[1]) + (Math.random() < 0.5 ? 1.3 : -1.3); p.fleeFrom = [p.x - Math.sin(a) * 5, p.z - Math.cos(a) * 5]; }
      else if (p.way >= 0 && Math.abs(p.off) > 0.5 && p.strikes < 3) p.off *= 0.35;
      else if (p.way >= 0) { const W = PEDWAYS[p.way], j = p.seg + p.dir; if (j >= 0 && j < W.c.length / 2) { p.seg = j; p.dir = -p.dir; } p.off = 0; }
      if (p.strikes >= 5) { if (dp > 35) { p.gone = true; } else { p.way = -1; p.strikes = 0; } } }
    else if (mv > 0 && (p.stuck || 0) === 0 && p.strikes) p.strikes = Math.max(0, p.strikes - dt * 0.2);
    animHuman(p.H, dt, mv);
    p.H.root.position.set(p.x, heightAt(p.x, p.z) + 0.17, p.z); p.H.root.rotation.y = p.h;
    p.H.root.visible = dp < 110;
  }
}

// ---------- wanted
const WANTED = {
  level: 0, unseen: 0, flash: 0, bustT: 0,
  crime(n, reason) {
    if (!n || GAME.state !== 'play') return; const now = performance.now(); if (reason && reason === this.lastR && now - this.lastT < 5000) return; this.lastR = reason; this.lastT = now; const before = Math.ceil(this.level);
    this.level = clamp(this.level + n, 0, 5); this.unseen = 0;
    if (Math.ceil(this.level) > before) { HUD.toast(reason ? reason + '  ★' : '★ Nivel de búsqueda', '#ffcf40'); AUDIO.wanted(); }
  },
  update(dt) {
    const police = CARS.filter((c) => c.type === 'police' && c.driver === 'police');
    const stars = Math.ceil(this.level);
    if (stars > 0) {
      const want = Math.min(7, stars + (stars >= 3 ? 1 : 0) + (this.armed ? 2 : 0));
      if (police.length < want && Math.random() < dt * 0.8) {
        const sp = trafficSpawnPoint(90, 190, true);
        if (sp) { const c = new Car('police', 0xf5f7fa, 0, 0, 0); spawnTraffic(c, sp[0], sp[1], sp[2]); c.mode = 'physics'; c.driver = 'police'; c.siren = true; if (this.armed) { c.T.maxV *= 1.18; c.T.acc *= 1.4; c.T.grip *= 1.15; } }
      }
      // seen?
      let seen = false;
      for (const c of police) { const d = Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z); if (d < 75 && COL.raycast(c.x, c.z, PLAYER.x, PLAYER.z) >= 1) { seen = true; break; } }
      if (!seen && copsSee()) seen = true;
      if (seen) this.unseen = 0; else this.unseen += dt;
      this.flash = seen ? 0 : this.unseen;
      if (this.unseen > (9 + stars * 3) * (this.armed ? 1.8 : 1)) { this.level = 0; this.unseen = 0; this.armed = false; this.fine = 0; HUD.toast('Has despistado a la policía', '#9be38a'); MISSIONS.onEvent('lost'); }
      // busted
      let near = false; for (const c of police) { const d = Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z); if (d < (PLAYER.car ? 6 : 7) && c.speed < 4 && !c.bailed) near = true; } const nearFoot = !PLAYER.car && copsNear(); if (nearFoot) near = true;
      const slow = PLAYER.car ? PLAYER.car.speed < 1.5 : PLAYER.speed < 2.5 || PLAYER.down > 0;
      // batons: on foot and within reach of a stopped patrol car, the officers lay into you
      if (near && !PLAYER.car && !nearFoot) { this.batonT = (this.batonT || 0) - dt; if (this.batonT <= 0) { this.batonT = rnd(0.9, 1.5); const dmg = rnd(5, 9) * (0.8 + stars * 0.15); PLAYER.health -= dmg; CAM.shake = 0.35; AUDIO.crash(4); HUD.toast('¡Porrazo de la Policía Local! -' + Math.round(dmg) + ' salud', '#ffb3b3', 1.5); if (PLAYER.health <= 0) { GAME.wasted(); return; } } }
      if (near && slow) { this.bustT += dt; if (this.bustT > (PLAYER.car ? 2.5 : 1.3)) GAME.busted(); } else this.bustT = Math.max(0, this.bustT - dt);
    } else {
      for (const c of police) { c.siren = false; if (Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z) > 60) c.remove(); else { c.ctl = { thr: 0, brk: 1, steer: 0, hb: 0 }; } }
    }
    for (const c of police) if (stars > 0) updatePoliceAI(c, dt);
  },
  reset() { this.level = 0; this.unseen = 0; this.bustT = 0; this.armed = false; this.fine = 0; for (const c of CARS.slice()) if (c.driver === 'police') c.remove(); for (const c of COPS.slice()) removeCop(c); },
};
