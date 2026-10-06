// ============ police on foot: when the patrol car can't get to you, the officers get out and chase you running.
// With 4+ stars they also shoot (2-3 hits kill, depending on your health).
const COPS = [];
const COP_LOOK = { skin: 0xd9a47c, shirt: 0x1d2b4f, pants: 0x1a2236, shoes: 0x111111, sole: 0x111111, cap: 0x1d2b4f, female: false, beard: false, sleeve: true, longPants: true, hairStyle: 'Hair_Buzzed', belt: true };
function copGunMesh() {
  if (GUNPOOL.length) { const g = GUNPOOL.pop(); g.visible = true; return g; } /* reuse (audit P0.3) */
  const g = new THREE.Group(); const dark = M(0x1e1f22, 0.35, 0.7);
  const slide = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.04, 0.19), dark); slide.position.set(0, 0.03, 0.06);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.045), dark); handle.position.set(0, -0.025, 0); handle.rotation.x = -0.25;
  g.add(slide, handle); g.scale.setScalar(1.35); scene.add(g); return g;
}
function newCopHuman() { return makeHuman({ ...COP_LOOK, skin: pick([0xd9a47c, 0xc68a64, 0xe8bf9c, 0xa8744e]) }); }
const GUNPOOL = [];
function spawnCop(car, side) {
  if (COPS.length >= 6) return null;
  const H = takeHuman('cop', newCopHuman);
  const fx = Math.sin(car.h), fz = Math.cos(car.h); const x = car.x + fz * side * 1.6, z = car.z - fx * side * 1.6; const r = COL.resolve(x, z, 0.35);
  scene.add(H.root); const c = { H, x: r.x, z: r.z, h: car.h, car, batonT: rnd(0.4, 0.9), shootT: rnd(1.0, 2.0), aimT: 0, stuck: 0, side: 0, sideT: 0, gun: null, t: 0, path: null, pathT: 0, wp: 0 };
  COPS.push(c); return c;
}
function removeCop(c) { releaseHuman('cop', c.H); if (c.gun) { c.gun.visible = false; GUNPOOL.push(c.gun); c.gun = null; } const i = COPS.indexOf(c); if (i >= 0) COPS.splice(i, 1); }
function copLineOfSight(c) { return COL.raycast(c.x, c.z, PLAYER.x, PLAYER.z) >= 1; }
function copShoot(c, dist, stars) {
  // aim, flash, bang; chance to hit drops with distance and when you run
  AUDIO.shot && AUDIO.shot(); const d = new THREE.Vector3(PLAYER.x - c.x, 0.2, PLAYER.z - c.z).normalize();
  if (!c.gun) c.gun = copGunMesh(); c.aimT = 0.7;
  if (typeof flashLight !== 'undefined' && flashLight) { flashLight.position.set(c.x + d.x * 0.7, heightAt(c.x, c.z) + 1.4, c.z + d.z * 0.7); flashLight.intensity = 6; setTimeout(() => { flashLight.intensity = 0; }, 60); }
  const pHit = clamp(0.6 - dist / 55 - (PLAYER.speed > 4 ? 0.2 : 0) + (stars >= 5 ? 0.1 : 0), 0.15, 0.8);
  if (Math.random() < pHit && !PLAYER.car) {
    // 2-3 hits from full health (more if you've eaten well, fewer if you're hurt)
    const dmg = rnd(38, 48); PLAYER.health -= dmg; CAM.shake = 0.45; AUDIO.thud && AUDIO.thud(1);
    HUD.toast('¡Te han disparado! -' + Math.round(dmg) + ' salud', '#ff6b6b', 1.6); if (PLAYER.health <= 0) { GAME.wasted(); return; }
  } else if (Math.random() < 0.5) SUB.show('<b>Policía:</b> ' + pick(['¡Alto, policía!', '¡Al suelo, chacho!', '¡Quieto ahí!', '¡Tírate al suelo!']), 1.5);
}
function updateCops(dt) {
  const stars = Math.ceil(WANTED.level);
  // bail out: a patrol car that is close but stopped / stuck while you're on foot
  if (stars > 0 && !PLAYER.car && !PLAYER.interior) {
    for (const car of CARS) { if (car.type !== 'police' || car.driver !== 'police' || car.bailed) continue; const d = Math.hypot(car.x - PLAYER.x, car.z - PLAYER.z);
      const slowNear = d < 55 && d > 6 && car.speed < 2.5; car.slowT = slowNear ? (car.slowT || 0) + dt : 0;
      const blocked = d < 35 && car.ai && car.ai.rev > 0;
      if (car.slowT > 1.6 || blocked || (d < 22 && d > 7 && COL.raycast(car.x, car.z, PLAYER.x, PLAYER.z) < 1)) {
        car.bailed = true; car.ctl = { thr: 0, brk: 1, steer: 0, hb: 0 }; spawnCop(car, 1); if (stars >= 2 || Math.random() < 0.5) spawnCop(car, -1);
        SUB.show('<b>Policía:</b> ' + pick(['¡Bájate, que se nos escapa!', '¡A pie, a pie!', '¡Ese es, a por él!']), 2);
      }
    }
  }
  for (const c of COPS.slice()) {
    const dx = PLAYER.x - c.x, dz = PLAYER.z - c.z, dist = Math.hypot(dx, dz);
    if (stars <= 0 || PLAYER.dead) { c.t += dt; if (c.t > 3 || dist > 60) { if (c.car) { c.car.bailed = false; } removeCop(c); } else { animHuman(c.H, dt, 0); } continue; }
    c.t = 0; if (dist > 160) { if (c.car) c.car.bailed = false; removeCop(c); continue; }
    const los = dist < 45 && copLineOfSight(c);
    let tx = PLAYER.x, tz = PLAYER.z, sp = 0;
    // follow the walking route when the player is out of sight (round corners and buildings)
    c.pathT -= dt; if (!los && dist > 6 && c.pathT <= 0) { c.pathT = 1.2; c.path = WALKG.route(c.x, c.z, PLAYER.x, PLAYER.z); c.wp = 0; }
    if (!los && c.path) { const p = c.path; while (c.wp < p.length / 2 - 1 && Math.hypot(p[c.wp * 2] - c.x, p[c.wp * 2 + 1] - c.z) < 2) c.wp++; tx = p[c.wp * 2]; tz = p[c.wp * 2 + 1]; }
    const shooter = stars >= 4 && !PLAYER.car;
    if (c.aimT > 0) c.aimT -= dt;
    if (shooter && los && dist > 5 && dist < 38) {
      // stop, aim, shoot every so often
      c.shootT -= dt; if (c.shootT < 0.6) { sp = 0; c.aimT = Math.max(c.aimT, 0.2); } else sp = 4.8;
      if (c.shootT <= 0) { c.shootT = rnd(2.2, 3.4); copShoot(c, dist, stars); if (GAME.state !== 'play') return; }
    } else if (dist > 1.3) sp = PLAYER.car ? 6.0 : 5.6;
    // baton when in reach
    if (dist < 1.6 && !PLAYER.car) { c.batonT -= dt; if (c.batonT <= 0) { c.batonT = rnd(0.9, 1.4); punchAnim(c.H); const dmg = rnd(5, 9) * (0.8 + stars * 0.15); PLAYER.health -= dmg; CAM.shake = 0.35; AUDIO.crash && AUDIO.crash(4); HUD.toast('¡Porrazo! -' + Math.round(dmg) + ' salud', '#ffb3b3', 1.2); if (PLAYER.health <= 0) { GAME.wasted(); return; } } }
    // move (with a side-step when blocked by a wall)
    let mx = tx - c.x, mz = tz - c.z; const L = Math.hypot(mx, mz) || 1; mx /= L; mz /= L;
    if (c.sideT > 0) { c.sideT -= dt; const s = c.side; const ox = mx; mx = mx * 0.3 + mz * s; mz = mz * 0.3 - ox * s; const l2 = Math.hypot(mx, mz) || 1; mx /= l2; mz /= l2; }
    const ox = c.x, oz = c.z; if (sp > 0) { c.x += mx * sp * dt; c.z += mz * sp * dt; }
    const r = COL.resolve(c.x, c.z, 0.35); c.x = r.x; c.z = r.z;
    if (typeof ugcPush === 'function') { const q = ugcPush(c.x, c.z, 0.35); c.x = q[0]; c.z = q[1]; }
    if (sp > 0) { const real = Math.hypot(c.x - ox, c.z - oz); if (real < sp * dt * 0.35) c.stuck += dt; else c.stuck = Math.max(0, c.stuck - dt); if (c.stuck > 0.35) { c.stuck = 0; c.side = Math.random() < 0.5 ? 1 : -1; c.sideT = 0.8; c.pathT = 0; } }
    // separation between officers
    for (const o of COPS) if (o !== c) { const ex = c.x - o.x, ez = c.z - o.z, e = Math.hypot(ex, ez); if (e < 0.8 && e > 1e-3) { c.x += ex / e * (0.8 - e) * 0.5; c.z += ez / e * (0.8 - e) * 0.5; } }
    const face = c.aimT > 0 || dist < 2 ? Math.atan2(dx, dz) : (sp > 0 ? Math.atan2(mx, mz) : c.h); c.h += angDiff(c.h, face) * clamp(dt * 8, 0, 1);
    animHuman(c.H, dt, sp);
    const gy = (typeof lowAt === 'function' && PLAYER.y < heightAt(c.x, c.z) - 1.5) ? PLAYER.y : heightAt(c.x, c.z);
    c.H.root.position.set(c.x, gy + 0.17, c.z); c.H.root.rotation.y = c.h; c.H.root.visible = dist < 120;
    if (c.aimT > 0 && c.H.skinned) { const d = new THREE.Vector3(dx, (PLAYER.y + 1.2) - (gy + 1.45), dz).normalize(); aimArm(c.H, d); if (!c.gun) c.gun = copGunMesh(); c.gun.visible = true; gripGun(c.H, c.gun, d); }
    else if (c.gun) c.gun.visible = false;
  }
}
// officers on foot also count for "seen" and for getting busted
function copsSee() { for (const c of COPS) if (Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z) < 45 && copLineOfSight(c)) return true; return false; }
function copsNear() { for (const c of COPS) if (Math.hypot(c.x - PLAYER.x, c.z - PLAYER.z) < 1.8) return true; return false; }
