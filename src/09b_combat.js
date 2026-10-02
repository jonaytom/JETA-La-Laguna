// ============ fists: punching, peds that fight back, pay up or run (habla canaria) ============
const LINES = {
  hit: ['¡Guas, chacho! ¿Qué haces, machango?', '¡Guas, mi niño, que me has dado!', '¡Guas! ¿Tú estás tolete o qué te pasa?', '¡Chacho, qué haces, machango!', '¡Ños! ¿Tú eres tolete o qué?', '¡Estate quieto, papafrita!', '¡Mira que te meto un jeitazo, cachanchán!', '¡Fuerte bocachancla estás hecho!', '¡Vete a fuñir a otro, chafalmeja!', '¡Me cago en la mar salada, mi niño!', '¡Deja de meterte conmigo, jocicudo!', '¡Qué pechá de golpes, enclenque!'],
  fight: ['¡Ahora vas a ver, machango!', '¡Ven p\'acá, tolete, que te espero!', '¡Toma gofio, papafrita!', '¡Te vas a enterar, cachanchán!', '¡Arrímate si tienes valor, bocachancla!', '¡Te meto un tortazo que te dejo pa\' la foto!'],
  pay: ['¡Toma, toma, pero déjame en paz, chacho!', '¡Aquí tienes pa\' un barraquito, pero vete ya!', '¡Llévate esto y fuera, cachanchán!', '¡Ya está, ya está! Toma las perras y lárgate.'],
  flee: ['¡Guas! ¡Socorro, un loco en La Laguna!', '¡Guas, qué fuerte, que me mata!', '¡Socorro! ¡Un loco en La Laguna!', '¡Ay mi madre, que me pega el tolete este!', '¡Llamen a la policía local!', '¡Fuerte machango, déjame!'],
  canBrav: ['¡Chacho, chacho! ¡Que soy canarión, mira pal nota!', '¡Tú no sabes con quién te estás metiendo, cristiano! ¡Que soy de Las Palmas!', '¡Mira pal nota, qué valiente el chicharrero este!', '¡Aparta, bobomierda, que yo vengo de La Isleta!', '¡Oh, mi madre! ¡Que te meto una galleta que vuelves en barco a Gran Canaria!'],
  canCry: ['¡Ay, ay, ay… no me pegues más, que era todo broma! Toma, toma las perras…', '¡Mi madre… que yo sólo venía a ver la Catedral! Toma dinero y déjame, porfa…', '¡Buaaa! ¡Me vuelvo pa\' Gran Canaria en el primer barco! Toma, toma…'],
  win: ['¡Y no vuelvas por aquí, papafrita!', '¡Toma ya! ¡A tomar por saco, tolete!', '¡Eso pa\' que aprendas, machango!'],
};
const FIGHT = { cd: 0, punchT: 0 };
document.addEventListener('mousedown', (e) => { if (e.button === 0 && document.pointerLockElement && GAME.state === 'play') FIGHT.want = true; });
function punchAnim(H) { if (H.skinned) punchSkinned(H); else H.punch = 0.32; }
function animPunch(H, dt) { if (H.skinned || !H.punch || H.punch <= 0) return; H.punch -= dt; const k = Math.sin(clamp(1 - H.punch / 0.32, 0, 1) * Math.PI); H.armR.p.rotation.x = -1.55 * k; H.armR.j.rotation.x = -0.3 * (1 - k); H.torso.rotation.y = -0.35 * k; }
function playerPunch() {
  if (PLAYER.car || PLAYER.down > 0 || FIGHT.cd > 0) return; FIGHT.cd = 0.45; punchAnim(playerHuman); AUDIO.swing && AUDIO.swing();
  const fx = Math.sin(PLAYER.h), fz = Math.cos(PLAYER.h); let target = null, bd = 1.6;
  for (const p of PEDS) { if (p.down > 0) continue; const dx = p.x - PLAYER.x, dz = p.z - PLAYER.z, d = Math.hypot(dx, dz); if (d < bd && (dx * fx + dz * fz) / (d || 1) > 0.35) { bd = d; target = p; } }
  if (!target) return;
  setTimeout(() => hitPed(target), 120);
}
function hitPed(p) {
  if (!p.fought && p.down <= 0 && startStreetFight(p)) return; // → 2D street fight
  AUDIO.thud(2); CAM.shake = 0.12; if (p.H.skinned) hitSkinned(p.H); p.hp = (p.hp ?? 3) - 1; p.hits = (p.hits || 0) + 1;
  const dx = p.x - PLAYER.x, dz = p.z - PLAYER.z, d = Math.hypot(dx, dz) || 1; p.x += dx / d * 0.5; p.z += dz / d * 0.5;
  let policeNear = CARS.some((c) => c.type === 'police' && Math.hypot(c.x - p.x, c.z - p.z) < 45);
  if (policeNear) WANTED.crime(1, 'Agresión'); else if (Math.random() < 0.12) WANTED.crime(1, 'Alguien ha llamado a la policía');
  if (p.hp <= 0) { p.down = 5; p.fight = 0; p.vx = dx / d * 2; p.vz = dz / d * 2; SUB.show('<b>Peatón:</b> ¡Ayyy… mi madre…!', 2); return; }
  if (p.canarion) {
    if (p.hits === 1) { p.flee = 0; p.fight = 0; p.talk = 2.5; SUB.show('<b>Canarión:</b> ' + pick(LINES.canBrav), 3.5); }
    else { const cash = Math.round(rnd(80, 160)); PLAYER.money += cash; AUDIO.cash(); HUD.toast('+$' + cash + ' (el canarión se ha rajado)', '#ffd400', 3); SUB.show('<b>Canarión (llorando):</b> ' + pick(LINES.canCry), 4.5); p.flee = 10; p.fleeFrom = [PLAYER.x, PLAYER.z]; p.canarion = false; p.paid = true; }
    return;
  }
  const r = Math.random();
  if (p.hits === 1) { if (r < 0.35) startFight(p); else { p.flee = 6; p.fleeFrom = [PLAYER.x, PLAYER.z]; SUB.show('<b>Peatón:</b> ' + pick(LINES.hit), 2.5); } }
  else { if (r < 0.4 && !p.paid) { const cash = Math.round(rnd(15, 70)); p.paid = true; PLAYER.money += cash; AUDIO.cash(); HUD.toast('+$' + cash, '#7fe08a', 2); SUB.show('<b>Peatón:</b> ' + pick(LINES.pay), 3); p.fight = 0; p.flee = 8; p.fleeFrom = [PLAYER.x, PLAYER.z]; }
    else if (r < 0.8) startFight(p); else { p.flee = 8; p.fleeFrom = [PLAYER.x, PLAYER.z]; SUB.show('<b>Peatón:</b> ' + pick(LINES.flee), 2.5); } }
}
function startFight(p) { p.fight = 12; p.flee = 0; p.punchCd = 0.6; p.talk = 0; SUB.show('<b>Peatón:</b> ' + pick(LINES.fight), 2.5); }
// called from updatePeds; returns true when the ped is busy fighting
function combatPed(p, dt) {
  if (!(p.fight > 0)) return false;
  p.fight -= dt; if (p.punchCd > 0) p.punchCd -= dt;
  const dx = PLAYER.x - p.x, dz = PLAYER.z - p.z, d = Math.hypot(dx, dz);
  if (PLAYER.car || d > 25 || PLAYER.dead) { p.fight = 0; return false; }
  p.h += angDiff(p.h, Math.atan2(dx, dz)) * clamp(dt * 8, 0, 1);
  let mv = 0; if (d > 1.05) { mv = 3.4; p.x += dx / d * mv * dt; p.z += dz / d * mv * dt; }
  else if (p.punchCd <= 0) { p.punchCd = rnd(0.9, 1.4); punchAnim(p.H); setTimeout(() => { if (Math.hypot(PLAYER.x - p.x, PLAYER.z - p.z) < 1.5 && PLAYER.down <= 0 && !PLAYER.car) { const dmg = rnd(5, 11); PLAYER.health -= dmg; CAM.shake = 0.35; AUDIO.thud(1); if (Math.random() < 0.35) SUB.show('<b>Peatón:</b> ' + pick(LINES.fight), 2); if (PLAYER.health <= 0) { SUB.show('<b>Peatón:</b> ' + pick(LINES.win), 3); GAME.wasted(); } } }, 140); }
  if (p.fight <= 0) { p.flee = 3; p.fleeFrom = [PLAYER.x, PLAYER.z]; }
  const r = COL.resolve(p.x, p.z, 0.3); p.x = r.x; p.z = r.z;
  animHuman(p.H, dt, mv); animPunch(p.H, dt);
  p.H.root.position.set(p.x, heightAt(p.x, p.z) + 0.17, p.z); p.H.root.rotation.y = p.h;
  return true;
}
function updateCombat(dt) {
  if (FIGHT.cd > 0) FIGHT.cd -= dt;
  const gp = INPUT.gp;
  if (((FIGHT.want && !FIGHT.blockPunch) || pressed('KeyQ') || (gp && gp.down(5))) && GAME.state === 'play' && !WEAPON.aiming) playerPunch();
  FIGHT.want = false; FIGHT.blockPunch = false;
  animPunch(playerHuman, dt);
  // slow health regeneration when nobody is fighting you
  // no free regeneration any more: you get your health back by eating (see FOOD)
}
