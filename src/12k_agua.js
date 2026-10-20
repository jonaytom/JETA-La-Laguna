// ============ v0.76: el rifle de agua, el Secreta, más del Obispo y las carreras del Canarión ============
// · Historia: «El rifle de agua» (El Blanco): abre las jugueterías; compras el rifle y lo pruebas en una plaza con fuente
//   como el tutorial de las latas: apagas los papeles que El Blanco va quemando, recargas en la fuente y le mojas la
//   cabeza a Boca Papa, que duerme al lado, desde 10 m.
// · El Secreta: el inspector Fulgencio Tostón (gordo, bigote, traje marrón de los 80, muy chapado a la antigua), en la
//   Avenida de los Menceyes. Seis misiones que mezclan seguir coches, peleas, el rifle, la pistola, fútbol, baloncesto y
//   persecuciones, cada una más larga que la anterior.
// · El Obispo: cuatro más (fuego en una iglesia, carrera de sacristanes, curas contra concejales, el ladrón del cepillo).
// · El Canarión: tres carreras de coches (de noche en la pista de Los Rodeos, contrarreloj por el casco y el Gran Premio).
const K3 = () => MISSIONS.kit;
const SECRETA = 'Inspector Fulgencio Tostón';
const BLANCO = 'Rayco «El Blanco»';
// ---------- helpers
function lookOfNpc(k) { return NPC[k] && NPC[k].H && NPC[k].H.look ? { ...NPC[k].H.look } : {}; }
// fires to put out: each one a red dot on the minimap (so the arrow and the compass find them); cb when all are out
function k3Fires(spots, size, hp, cb) {
  let left = spots.length; const list = spots.map(([x, z]) => { const [a, b] = safeSpot(x, z, 0.8); const f = makeFire(a, b, size, () => { f.dead = true; left--; HUD.toast(left ? `¡Fuego apagado! Quedan ${left}` : '¡Todos los fuegos apagados!', '#7fd3ff', 1.6); if (!left && cb) cb(); }); f.hp = hp; s2Chase(f); return f; });
  return list;
}
function k3Ring(x, z, n, r) { const out = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + 0.4; out.push([x + Math.sin(a) * r, z + Math.cos(a) * r]); } return out; }
function k3RifleReady() { if (!RIFLE.has) giveRifle(true); if (RIFLE.water < RIFLE.max * 0.5) RIFLE.water = RIFLE.max; AGUA.setRifleOut(true, true); updateWeaponHUD(); }
// a street spot about d metres from (x, z), on the pavement side of a real street
function k3Street(x, z, dMin, dMax) { for (let k = 0; k < 30; k++) { const a = Math.random() * 6.283, d = rnd(dMin, dMax); const s = s2Spot(x + Math.sin(a) * d, z + Math.cos(a) * d); if (worldEdgeDist(s[0], s[1]) > 120 && Math.hypot(s[0] - x, s[1] - z) > dMin * 0.7) return s; } return s2Spot(x + dMin, z); }
function k3Fountain(x, z) { let best = null, bd = 1e9; for (const f of PK2.fountains) { const d = Math.hypot(f[0] - x, f[1] - z); if (d < bd) { bd = d; best = f; } } return best; }
// a person who runs along a path and is soaked with the rifle (n hits): he slows down each time
function k3SoakTarget(n, hits, onDone) { const t = { x: n.x, z: n.z, r: 0.5, h: 1.8, head: 1.6, hits: 0, npc: n, onHit: (tt) => { if (tt.cd > 0) return; tt.cd = 0.6; tt.hits++; AUDIO.splash && AUDIO.splash(); HUD.toast(`¡Empapado! ${tt.hits}/${hits}`, '#7fd3ff', 1); if (tt.hits >= hits) { tt.done = true; onDone(); } }, cd: 0 }; RIFLE.targets.push(t); return t; }
function k3Track(t, dt) { if (!t) return; t.x = t.npc.x; t.z = t.npc.z; t.y0 = heightAt(t.x, t.z); if (t.cd > 0) t.cd -= dt; }

// =====================================================================================================================
// HISTORIA: El rifle de agua
const M_RIFLE = {
  title: 'El rifle de agua', who: BLANCO,
  hint() { return b2('El Blanco') + ' tiene algo nuevo en el escáner: un rifle de agua'; }, startPos: startAt('blanco'),
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([[BLANCO, '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»'], [K.CH, '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?'],
      [BLANCO, '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»'], [K.CH, 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?'], [BLANCO, '«Psss... siesta.»']], () => {
      if (!K.isActive(this)) return; K.GANG.jugueterias = true; HUD.toast('Se abren las JUGUETERÍAS (icono del osito de peluche en el mapa)', '#7fd3ff', 5);
      if (RIFLE.has) { this.toFountain(); return; } this.st.step = 1; const sh = AGUA.shops.slice().sort((a, b) => Math.hypot(a.x - PLAYER.x, a.z - PLAYER.z) - Math.hypot(b.x - PLAYER.x, b.z - PLAYER.z))[0];
      if (!sh) { giveRifle(true); this.toFountain(); return; } K.goto(sh.x, sh.z, 2.2, 0x1e88e5); K.setObjective(`Compra el ${b2('rifle de agua')} en ${b2(sh.name)} (${CONTROLS.kbd('use')})`); }); },
  onEvent(t, tag) { if (t === 'bought' && tag === 'rifle' && this.st && this.st.step === 1) this.toFountain(); if (t === 'refill' && this.st && this.st.step === 5) this.toBoca(); },
  toFountain() { const K = K3(), S = this.st; const h = NPC.blanco.home || [NPC.blanco.x, NPC.blanco.z]; const f = k3Fountain(h[0], h[1]) || [h[0] + 30, h[1]]; S.f = f; S.step = 2;
    const [x, z] = safeSpot(f[0] + 5.5, f[1] + 1.5, 0.6); S.p = [x, z]; K.goto(x, z, 3, 0x1e88e5); K.setObjective('Ve a la ' + b2('fuente') + ' donde te espera El Blanco con el rifle'); },
  update(dt) { const K = K3(), S = this.st; if (!S) return;
    if (S.step === 2 && s2AtGoal(4) && !PLAYER.car) { S.step = 3; K.clearBeacon(); const f = S.f;
      S.bl = s2Human(lookOfNpc('blanco'), f[0] + 4, f[1] - 3, [PLAYER.x, PLAYER.z]);
      const [bx, bz] = safeSpot(f[0] - 7, f[1] + 6, 0.8); S.boca = s2Human(lookOfNpc('boca'), bx, bz); S.boca.H.pose = 'sit'; S.boca.sleep = true;
      k3RifleReady(); S.n = 0; K.talk([[BLANCO, '«Brrr... papeles... ¡fuego!... psss... apaga.»'], [K.CH, 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.']], () => { if (K.isActive(this)) this.nextFire(); }); }
    if (S.boca && S.boca.sleep) { animHuman(S.boca.H, dt, 0); if (Math.random() < dt * 0.25) SUB.show('<b>Boca Papa:</b> Zzzz... papas... arrugadas... zzzz...', 1.6); } },
  nextFire() { const K = K3(), S = this.st; const f = S.f; S.n++;
    const spot = [[f[0] + 8, f[1] + 3], [f[0] + 2, f[1] - 8], [f[0] - 6, f[1] - 5]][S.n - 1]; AUDIO.swing && AUDIO.swing();
    k3Fires([spot], 0.9, 1, () => { if (!K.isActive(this)) return; if (S.n < 3) { SUB.show('<b>El Blanco:</b> «Mmm... ¡bien!... brrr... otro.»', 2); setTimeout(() => { if (K.isActive(this)) this.nextFire(); }, 1600); } else this.empty(); });
    K.setObjective(`Apaga los papeles que quema El Blanco (${S.n}/3) · chorro: ${CONTROLS.keyName('weap')} / 3 para sacar el rifle`); },
  empty() { const K = K3(), S = this.st; S.step = 5; RIFLE.water = 0; updateWeaponHUD();
    K.talk([[BLANCO, '«Psss... vacío... brrr... fuente.»'], [K.CH, 'Se ha quedado seco. A la fuente a llenarlo.']], () => { if (!K.isActive(this)) return; K.goto(S.f[0], S.f[1], 3.5, 0x1e88e5); K.setObjective(`Llena el rifle en la ${b2('fuente')} (${CONTROLS.kbd('use')})`); }); },
  toBoca() { const K = K3(), S = this.st; S.step = 6; K.clearBeacon(); const b = S.boca;
    const a = Math.atan2(S.f[0] - b.x, S.f[1] - b.z); const [mx, mz] = safeSpot(b.x + Math.sin(a) * 11, b.z + Math.cos(a) * 11, 0.6);
    K.talk([[BLANCO, '«Mmm... Boca... brrr... cabeza... ¡diez metros!»'], [K.CH, 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.']], () => { if (!K.isActive(this)) return;
      K.goto(mx, mz, 1.6, 0x1e88e5); K.setObjective('Ponte en la marca (a 10 m) y mójale la ' + b2('cabeza') + ' a Boca Papa');
      S.tgt = { x: b.x, z: b.z, y0: heightAt(b.x, b.z), r: 0.55, h: 1.2, head: 0.95, cd: 0, onHit: (t, head, d) => { if (t.cd > 0 || t.done) return; t.cd = 1.2; setTimeout(() => { t.cd = 0; }, 1200);
        if (!head) { SUB.show('<b>El Blanco:</b> «Brrr... ¡la cabeza!»', 1.8); return; } if (d < 9.3) { SUB.show('<b>El Blanco:</b> «Psss... ¡lejos!... diez metros... mmm.»', 2); return; } t.done = true; this.done(); } };
      RIFLE.targets = [S.tgt]; }); },
  done() { const K = K3(), S = this.st; S.step = 7; S.boca.sleep = false; S.boca.H.pose = null;
    K.talk([['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!'], [BLANCO, '«Brrr... ¡diez metros!... mmm... ¡bien!»'], [K.CH, 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.'],
      ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.']], () => {
      K.GANG.rifleTut = true; s2Pass('Rifle de agua probado', 300); setTimeout(() => HUD.toast('Nuevo: el SECRETA te espera en la Avenida de los Menceyes (círculo salmón)', '#ff8a65', 7), 4000); }); },
};

// =====================================================================================================================
// EL SECRETA: el inspector Fulgencio Tostón (Avenida de los Menceyes)
function secretaInit() {
  const c = centroidOfNamedWays('Avenida de los Menceyes') || [-600, -150]; const rd = ROADSEG.nearest(c[0], c[1], (r) => r[0] <= 12); let x = c[0], z = c[1];
  if (rd) { const w = DATA.R[rd.ri][2] || 7, L = Math.hypot(rd.dx, rd.dz) || 1; const nx = -rd.dz / L, nz = rd.dx / L; [x, z] = safeSpot(rd.x + nx * (w / 2 + 2.2), rd.z + nz * (w / 2 + 2.2), 0.6); }
  const H = makeHuman({ skin: 0xe2b48f, shirt: 0xefe6cf, pants: 0x5b4632, jacket: 0x7a5a3a, shoes: 0x2a1c12, hair: 0x1c1712, hairStyle: 'Hair_SimpleParted', scale: 1.0, female: false, beard: false, build: { normal: 0.2, fat: 1.0 }, longPants: true, sleeve: true, hd: true, glasses: 'sun', watch: 0xd9b44a, sole: 0x111111 });
  const mo = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.016, 0.02), M(0x1c1712, 0.9)); mo.position.set(0, 0.056, 0.12); H.head.add(mo); // the big moustache
  H.root.position.set(x, heightAt(x, z) + 0.17, z); scene.add(H.root); NPC.secreta = { x, z, H, home: [x, z], name: SECRETA }; COL.addCirc(x, z, 0.4);
}
const startSecreta = () => (NPC.secreta ? [NPC.secreta.x + 1.4, NPC.secreta.z + 1.2] : [-600, -150]);
const TOSTON = (t) => [SECRETA, t];
// ---- S1: seguir al sospechoso sin que te vea, y pelea
const S_SEGUIR = {
  title: 'Tostón, de la Secreta', who: SECRETA, hint() { return 'Un tal ' + b2('Tostón') + ', de la Secreta, te espera en la ' + b2('Avenida de los Menceyes'); }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([TOSTON('Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.'), TOSTON('Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.'),
      [K.CH, '¿Y usted no viene?'], TOSTON('Yo coordino. Desde aquí. Con mi bocadillo de pata.')], () => { if (!K.isActive(this)) return;
      const [x, z, h] = k3Street(PLAYER.x, PLAYER.z, 40, 70); this.st.P = s2Path(s2Route(x, z, 900, 1400)); const a = this.st.P.at(0); this.st.car = s2Car('sedan', 0x8a8f94, a[0], a[1], a[2]); this.st.car.mode = 'race'; this.st.car.driver = 'race'; s2Mark(this.st.car, 10);
      this.st.step = 1; this.st.close = 0; K.setObjective('Súbete a un coche y sigue al ' + b2('Seat gris') + ' sin acercarte demasiado'); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1) { const c = S.car; const d = Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z); S.trk = (S.trk || 0) - dt; if (S.trk <= 0) { S.trk = 0.8; K.track(c.x, c.z, 6); }
      const done = s2DriveCar(c, S.P, dt, 13, (dd) => (dd > 120 ? 0.5 : 1));
      if (d < 18) { S.close += dt; if (S.close > 2.5) { s2Fail('¡Te ha visto! «Pero qué haces, chaval, que eres más cantoso que un coche de feria»'); return; } K.setObjective(`¡Demasiado cerca! Aléjate (${Math.round(d)} m)`); }
      else { S.close = Math.max(0, S.close - dt); K.setObjective(`Sigue al ${b2('Seat gris')} · distancia ${Math.round(d)} m (20–100)`); }
      if (d > 160) { s2Fail('Lo has perdido. Tostón: «Esto en mis tiempos no pasaba»'); return; }
      if (done) { S.step = 2; c.mode = 'physics'; c.driver = null; c.ctl.brk = 1; const [a, b] = safeSpot(c.x + 2.5, c.z + 1.5, 0.6); S.man = s2Human(THIEF_LOOKS[2], a, b); s2Mark(S.man, 8); K.goto(a, b, 3, 0xff8a65); K.setObjective('El sospechoso se baja. ' + b2('Ve a por él')); } }
    if (S.step === 2 && !S.man.down && s2Near(S.man.x, S.man.z, 3) && !PLAYER.car) { S.step = 3; K.clearBeacon();
      K.talk([['Sospechoso', '¿Y tú qué miras? ¡Vete a seguir a tu abuela!']], () => s2Fight(this, 'EL DEL SEAT', S.man.H.look, { npc: S.man, lv: 0.5 }, () => { s2Down(S.man);
        K.talk([TOSTON('(por el walkie) ¡Bien hecho, chaval! Llevaba un maletero lleno de décimos de lotería falsos. Esto es la Secreta: discreción y mano dura.')], () => s2Pass('Sospechoso del Seat gris detenido', 700)); }, () => s2Fail('Te ha dado una paliza y se ha largado'))); } },
};
// ---- S2: contenedores ardiendo + el pirómano a la carrera (pistola)
const S_CONTENEDORES = {
  title: 'Contenedores en llamas', who: SECRETA, hint() { return b2('Tostón') + ' tiene un encargo urgente en la Avenida de los Menceyes'; }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([TOSTON('Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.'), [K.CH, '¿Y los bomberos?'], TOSTON('Están en un gato subido a un drago. Venga, que se acaba el tiempo.')], () => { if (!K.isActive(this)) return;
      k3RifleReady(); const [x, z] = k3Street(PLAYER.x, PLAYER.z, 220, 380); this.st.c = [x, z]; this.st.step = 1; K.goto(x, z, 8, 0xff8a65); K.setTimer(100); K.setObjective('Ve a la calle de los ' + b2('contenedores ardiendo')); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(25)) { S.step = 2; K.clearBeacon(); K.setTimer(90); k3RifleReady(); k3Fires(k3Ring(S.c[0], S.c[1], 4, 9), 1.3, 1.6, () => this.runner()); K.setObjective('¡Apaga los ' + b2('4 contenedores') + '! (sal del coche, rifle de agua)'); }
    if (S.step === 3 && !S.n.down) { const end = s2Runner(S.n, S.P, dt, 5.6); s2TrackTarget(S.tg); if (end && !s2Near(S.n.x, S.n.z, 60)) s2Fail('El pirómano se ha escapado'); } },
  runner() { const K = K3(), S = this.st; if (S.step !== 2) return; S.step = 3; K.setTimer(0); const [a, b] = safeSpot(S.c[0] + 12, S.c[1] + 6, 0.6); S.n = s2Human(THIEF_LOOKS[0], a, b); S.P = s2RunPath(S.n, 180, 300); S.n.blip = true; s2Mark(S.n, 8); s2Armed();
    S.tg = s2Target(S.n, () => { s2Down(S.n); S.step = 4; K.talk([['Pirómano', '¡Ay! ¡Que era para calentarme las manos!'], TOSTON('(por el walkie) Ya lo recoge una patrulla. Chaval, tú vales para esto.')], () => s2Pass('Pirómano cazado', 900)); });
    K.setObjective('¡Ahí va el ' + b2('pirómano') + '! Saca la pistola (' + CONTROLS.keyName('weap') + ' / 2) y dale'); },
};
// ---- S3: el partido amañado (fútbol) y el corredor de apuestas (pelea)
const S_AMANO = {
  title: 'El partido amañado', who: SECRETA, hint() { return b2('Tostón') + ' sospecha de unas apuestas: ve a la Avenida de los Menceyes'; }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 };
    const f = COURTS.filter((c) => c.sport === 'fut' && c.gate === 'court' && !c.final && c.kind !== 'fs').sort((a, b) => Math.hypot(a.cx - PLAYER.x, a.cz - PLAYER.z) - Math.hypot(b.cx - PLAYER.x, b.cz - PLAYER.z))[0];
    K.talk([TOSTON('Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.'), TOSTON('Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.')], () => {
      if (!K.isActive(this)) return; if (!f) { K.abort('No encuentro ningún campo de fútbol.'); return; } this.st.c = f; this.st.step = 1; K.goto(f.cx, f.cz, 10, 0xff8a65); K.setObjective('Ve con la banda a ' + b2(f.label) + ' para el partido'); }); },
  update() { const K = K3(), S = this.st; if (!S || S.step !== 1 || !s2AtGoal(12)) return; if (PLAYER.car) { if (PLAYER.car.speed > 2) return; exitCar(); } S.step = 2; K.clearBeacon(); K.setObjective(null);
    playFieldGame(S.c, { rivalName: 'APOSTADORES', kit: { shirt: '#2c3e50', shorts: '#f1c40f', socks: '#2c3e50' }, lv: 0.45, time: 160, onEnd: (r) => { if (!K.isActive(this)) return; if (!r.won) { K.fail('Habéis perdido: los apostadores se forran'); return; } this.boss(); } }); },
  boss() { const K = K3(), S = this.st; const [a, b] = safeSpot(PLAYER.x + 3, PLAYER.z + 2, 0.6); S.b = s2Human(THIEF_LOOKS[1], a, b, [PLAYER.x, PLAYER.z]);
    K.talk([['Corredor de apuestas', '¡Me habéis arruinado! ¡Tenía cinco mil pavos a que perdíais! ¡Te voy a...!']], () => s2Fight(this, 'EL APOSTADOR', S.b.H.look, { npc: S.b, lv: 0.55 }, () => { s2Down(S.b);
      K.talk([TOSTON('(llegando sudando) ¡Quieto todo el mundo! ¡Secreta! ...¿Ya está? Bueno. Gran trabajo de equipo. Sobre todo el mío.')], () => s2Pass('Apuestas amañadas desarticuladas', 1200)); }, () => s2Fail('El apostador te ha tumbado y se ha escapado con el dinero'))); },
};
// ---- S4: triple en la cancha (baloncesto) y la huida en coche
const S_CANCHA = {
  title: 'Triple en la cancha', who: SECRETA, hint() { return b2('Tostón') + ' necesita a alguien que juegue al baloncesto: Avenida de los Menceyes'; }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 }; const c = obispoCourt('publica');
    K.talk([TOSTON('Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.'), [K.CH, 'Y cuando les ganemos, ¿qué?'], TOSTON('Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.')], () => {
      if (!K.isActive(this)) return; if (!c) { K.abort('No encuentro ninguna cancha.'); return; } this.st.c = c; this.st.step = 1; K.goto(c.cx, c.cz, 6, 0xff8a65); K.setObjective('Ve con Coco a ' + b2(c.label)); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(7)) { if (PLAYER.car) { if (PLAYER.car.speed > 2) return; exitCar(); } S.step = 2; K.clearBeacon(); K.setObjective(null);
      playCourtGame(S.c, { rival: pickRivals(S.c.cx + 7).map((l, k) => ({ name: ['EL FLACO', 'EL TOCHO'][k], look: l })), rivalName: 'TRAPICHEROS', lv: 0.5, time: 120, onEnd: (r) => { if (!K.isActive(this)) return; if (!r.won) { K.fail('Os han ganado y no sueltan prenda'); return; } this.flee(); } }); }
    if (S.step === 3) { const c = S.car; const done = s2DriveCar(c, S.P, dt, 20, (d) => (d > 150 ? 0.6 : d < 25 ? 1.1 : 1)); S.trk = (S.trk || 0) - dt; if (S.trk <= 0) { S.trk = 0.8; K.track(c.x, c.z); }
      if (Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z) > 330) { s2Fail('Los trapicheros se han escapado'); return; }
      if (done || c.health < 45) { S.step = 4; c.mode = 'physics'; c.driver = null; c.ctl.brk = 1; K.talk([['Trapichero', '¡Vale, vale! ¡Nos rendimos! ¡Era solo gofio adulterado!'], TOSTON('(por el walkie) Gofio adulterado... Esto es más gordo de lo que pensaba. Buen trabajo, chaval.')], () => s2Pass('Trapicheros detenidos', 1400)); } } },
  flee() { const K = K3(), S = this.st; S.step = 3; const [x, z, h] = k3Street(PLAYER.x, PLAYER.z, 25, 45); S.P = s2Path(s2Route(x, z, 1000, 1600)); const a = S.P.at(0); S.car = s2Car('compact', 0xd35400, a[0], a[1], a[2]); S.car.mode = 'race'; S.car.driver = 'race'; s2Mark(S.car, 10);
    HUD.big('¡SE ESCAPAN!', '#ff8a65', 2); K.setObjective('¡Los trapicheros huyen en un ' + b2('coche naranja') + '! Persíguelos y embístelos'); },
};
// ---- S5: mojar al pirómano a la carrera (rifle) y apagar lo que deja ardiendo
const S_MOJAR = {
  title: 'Al pirómano, agua', who: SECRETA, hint() { return b2('Tostón') + ' ha vuelto a ver al pirómano: Avenida de los Menceyes'; }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([TOSTON('El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.'), TOSTON('Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.')], () => {
      if (!K.isActive(this)) return; k3RifleReady(); const [x, z] = k3Street(PLAYER.x, PLAYER.z, 250, 400); this.st.c = [x, z]; this.st.step = 1; K.goto(x, z, 8, 0xff8a65); K.setTimer(110); K.setObjective('Ve a la plaza donde está el ' + b2('pirómano')); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(25)) { S.step = 2; K.clearBeacon(); K.setTimer(0); k3RifleReady(); const [a, b] = safeSpot(S.c[0] + 8, S.c[1] + 5, 0.6); S.n = s2Human(THIEF_LOOKS[0], a, b); S.P = s2RunPath(S.n, 220, 340); s2Mark(S.n, 10); s2Chase(S.n);
      S.fires = k3Fires(k3Ring(S.c[0], S.c[1], 3, 7), 1.0, 1.2, () => { S.firesOut = true; this.check(); }); for (const f of S.fires) { const i = S2.chase.indexOf(f); if (i >= 0) S2.chase.splice(i, 1); } // first the runner: the fires come back on the map when he is caught
      S.tg = k3SoakTarget(S.n, 3, () => { S.soaked = true; s2Down(S.n); SUB.show('<b>Pirómano:</b> ¡Vale! ¡Me rindo! ¡Estoy empapado hasta los calzoncillos!', 3); for (const f of S.fires) if (!f.out) s2Chase(f); K.setTimer(60); K.setObjective('Ahora apaga los ' + b2('fuegos') + ' que ha dejado'); this.check(); });
      K.setObjective('¡Ahí va! Persíguelo a pie y ' + b2('mójalo 3 veces') + ' con el rifle (a menos de 10 m)'); }
    if (S.step === 2 && !S.soaked) { const sp = 5.4 - S.tg.hits * 0.9; const end = s2Runner(S.n, S.P, dt, sp); k3Track(S.tg, dt); if (end && !s2Near(S.n.x, S.n.z, 50)) s2Fail('El pirómano se ha escapado'); } },
  check() { const S = this.st; if (S.soaked && S.firesOut && S.step === 2) { S.step = 3; K3().setTimer(0); K3().talk([TOSTON('(llegando con un paraguas) ¡Eso es! Mojado y detenido. Esto lo pongo yo en el informe como «operación Chaparrón».')], () => s2Pass('Operación Chaparrón', 1600)); } },
};
// ---- S6: Operación Gofio Blanco (todo junto)
const S_GOFIO = {
  title: 'Operación Gofio Blanco', who: SECRETA, hint() { return b2('Tostón') + ' prepara la gran redada: Avenida de los Menceyes'; }, startPos: startSecreta,
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([TOSTON('Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.'), TOSTON('Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.'), [K.CH, '¿Y el resto de la Secreta?'], TOSTON('El resto de la Secreta soy yo.')], () => {
      if (!K.isActive(this)) return; k3RifleReady(); s2Armed(); AGUA.setRifleOut(false, true); const b = BUILD.filter((q) => q.style === 3 && Math.hypot(q.cx - PLAYER.x, q.cz - PLAYER.z) > 500 && Math.hypot(q.cx - PLAYER.x, q.cz - PLAYER.z) < 1300 && worldEdgeDist(q.cx, q.cz) > 150).sort(() => Math.random() - 0.5)[0];
      const [x, z] = b ? s2Spot(b.cx, b.cz) : k3Street(PLAYER.x, PLAYER.z, 600, 900); this.st.w = [x, z]; this.st.step = 1; K.goto(x, z, 8, 0xff8a65); K.setTimer(120); K.setObjective('¡Corre! Llega a la ' + b2('nave del polígono') + ' antes de que carguen el camión'); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(14)) { if (PLAYER.car && PLAYER.car.speed > 3) return; S.step = 2; K.setTimer(0); K.clearBeacon(); const [a, b] = safeSpot(S.w[0] + 3, S.w[1] + 2, 0.6); S.guard = s2Human({ ...THIEF_LOOKS[1], build: { fat: 1 } }, a, b, [PLAYER.x, PLAYER.z]); if (PLAYER.car) exitCar();
      K.talk([['Portero de la nave', 'Aquí no se entra sin invitación. Y tú tienes cara de no tenerla.']], () => s2Fight(this, 'EL PORTERO', S.guard.H.look, { npc: S.guard, lv: 0.62, deal: 1.1 }, () => { s2Down(S.guard); this.thugs(); }, () => s2Fail('El portero te ha mandado a casa'))); }
    if (S.step === 3) for (const t of S.tg) if (!t.hit && t.npc) { t.x = t.npc.x; t.z = t.npc.z; t.y = heightAt(t.x, t.z) + 1.1; }
    if (S.step === 5) { const c = S.car; const done = s2DriveCar(c, S.P, dt, 21, (d) => (d > 150 ? 0.6 : d < 25 ? 1.1 : 1)); S.trk = (S.trk || 0) - dt; if (S.trk <= 0) { S.trk = 0.8; K.track(c.x, c.z); }
      if (Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z) > 330) { s2Fail('El jefe se ha escapado con el gofio'); return; }
      if (done || c.health < 40) { S.step = 6; c.mode = 'physics'; c.driver = null; c.ctl.brk = 1; K.talk([['Jefe del gofio', '¡No me detengáis! ¡Yo solo quería que el gofio fuera más blanco!'], TOSTON('(llegando en una guagua) ¡Operación Gofio Blanco, completada! Chaval, si algún día quieres una placa, te la hago yo con una lata.'), [K.CH, 'Con el dinero me vale, inspector.']], () => s2Pass('Operación Gofio Blanco', 3000)); } } },
  thugs() { const K = K3(), S = this.st; S.step = 3; s2Armed(); const looks = [THIEF_LOOKS[0], THIEF_LOOKS[2], THIEF_LOOKS[1]]; S.tg = [];
    for (let i = 0; i < 3; i++) { const [a, b] = safeSpot(S.w[0] + Math.sin(i * 2.1) * 12, S.w[1] + Math.cos(i * 2.1) * 12, 0.6); const n = s2Human(looks[i], a, b, [PLAYER.x, PLAYER.z]); s2Chase(n); S.tg.push({ x: a, y: heightAt(a, b) + 1.1, z: b, r: 0.5, hit: false, npc: n }); }
    WEAPON.targets = S.tg; WEAPON.onHit = (t) => { if (t.npc) s2Down(t.npc); const left = S.tg.filter((q) => !q.hit).length; HUD.toast(left ? `Quedan ${left}` : '¡Todos fuera de combate!', '#fff', 1.4); if (!left) this.fire(); };
    K.setObjective('Tres matones: ' + b2('pistola') + ' (' + CONTROLS.keyName('weap') + ' / 2), apunta y dispara'); },
  fire() { const K = K3(), S = this.st; S.step = 4; WEAPON.targets = []; WEAPON.onHit = null; K.talk([['Jefe del gofio (desde dentro)', '¡Si no es mío no es de nadie! ¡Fuego!']], () => { if (!K.isActive(this)) return;
      k3RifleReady(); k3Fires(k3Ring(S.w[0], S.w[1], 5, 8), 1.4, 1.6, () => this.escape()); K.setTimer(80); K.setObjective('¡Fuego en la nave! Saca el ' + b2('rifle de agua') + ' (3) y apaga los 5 fuegos'); }); },
  escape() { const K = K3(), S = this.st; if (S.step !== 4) return; S.step = 5; K.setTimer(0); const [x, z, h] = k3Street(S.w[0], S.w[1], 20, 40); S.P = s2Path(s2Route(x, z, 1200, 1800)); const a = S.P.at(0); S.car = s2Car('transit', 0xf4f4f4, a[0], a[1], a[2]); S.car.mode = 'race'; S.car.driver = 'race'; s2Mark(S.car, 10);
    HUD.big('¡EL JEFE HUYE!', '#ff8a65', 2); K.setObjective('¡El jefe escapa en la ' + b2('furgoneta blanca') + '! Coge un coche y embístela'); },
};

// =====================================================================================================================
// EL OBISPO (5–8)
function churchNear(x, z) { const L = (typeof CHURCHES !== 'undefined' ? CHURCHES : []).filter((c) => c.name && !/Catedral/.test(c.name)); return L.sort((a, b) => Math.hypot(a.cx - x, a.cz - z) - Math.hypot(b.cx - x, b.cz - z))[0] || null; }
const M_OBISPO_5 = {
  title: 'Fuego en la ermita', who: OBISPO, requires: () => !!MISSIONS.gang.rifleTut,
  hint() { return MISSIONS.gang.rifleTut ? 'Monseñor ' + b2('Truchas') + ' te llama con urgencia: ve al ' + b2('Obispado') : 'Para la siguiente misión del Obispo necesitas el ' + b2('rifle de agua') + ' (El Blanco)'; },
  startPos() { return M_OBISPO_1.startPos(); },
  start() { const K = K3(); this.st = { step: 0 }; const ch = churchNear(PLAYER.x + 300, PLAYER.z) || churchNear(PLAYER.x, PLAYER.z);
    K.talk([[OBISPO, '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de ' + (ch ? ch.name : 'la ermita') + '. ¡Arde todo el pórtico!'], [OBISPO, 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.'], [K.CH, '¡Voy, Monseñor! Boca, tráeme la toalla.']], () => {
      if (!K.isActive(this)) return; k3RifleReady(); const c = ch ? [ch.cx, ch.cz] : [PLAYER.x + 300, PLAYER.z]; const d = streetDoor(c[0], c[1]); this.st.c = d ? [d.x - d.nx * 2, d.z - d.nz * 2] : c; this.st.step = 1; K.goto(this.st.c[0], this.st.c[1], 8, 0xb388ff); K.setTimer(120); K.setObjective('Corre a ' + b2(ch ? ch.name : 'la ermita') + ' con el rifle de agua'); }); },
  update() { const K = K3(), S = this.st; if (!S) return;
    if (S.step === 1 && s2AtGoal(22)) { S.step = 2; K.clearBeacon(); K.setTimer(150); k3RifleReady(); k3Fires(k3Ring(S.c[0], S.c[1], 6, 7), 1.5, 2.4, () => { S.step = 3; K.setTimer(0); K.talk([[OBISPO + ' (llegando sin aliento)', '¡Milagro! Bueno, milagro y agua del grifo. Hijo mío, Dios y yo te estamos muy agradecidos. Sobre todo yo, que el seguro no cubría las palmas.']], () => s2Pass('La ermita, a salvo', 1100)); });
      const f = k3Fountain(S.c[0], S.c[1]); K.setObjective('¡Apaga los ' + b2('6 fuegos') + '! Si te quedas sin agua, a la ' + b2('fuente') + (f ? ` (a ${Math.round(Math.hypot(f[0] - S.c[0], f[1] - S.c[1]))} m)` : '')); } },
};
// a foot race against a seminarian through the casco: the rival runs the same controls
const M_OBISPO_6 = {
  title: 'La carrera de los sacristanes', who: OBISPO, startPos() { return M_OBISPO_1.startPos(); },
  hint() { return 'Monseñor ' + b2('Truchas') + ' organiza una carrera: ve al ' + b2('Obispado'); },
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([[OBISPO, 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.'], [OBISPO, 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.'], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.']], () => {
      if (!K.isActive(this)) return; const home = (OBISPADO.ok && (OBISPADO.door || OBISPADO.front)) || [PLAYER.x, PLAYER.z]; const cand = (typeof CHURCHES !== 'undefined' ? CHURCHES : []).map((c) => { const d = streetDoor(c.cx, c.cz); return d ? [d.x, d.z] : null; }).filter((p) => p && Math.hypot(p[0] - home[0], p[1] - home[1]) < 600 && Math.hypot(p[0] - home[0], p[1] - home[1]) > 60);
      const pts = []; let cur = home; while (pts.length < 4 && cand.length) { cand.sort((p, q) => Math.hypot(p[0] - cur[0], p[1] - cur[1]) - Math.hypot(q[0] - cur[0], q[1] - cur[1])); cur = cand.shift(); if (!pts.some((q) => Math.hypot(q[0] - cur[0], q[1] - cur[1]) < 60)) pts.push(cur); }
      if (pts.length < 2) for (let i = 0; i < 3; i++) pts.push([home[0] + Math.cos(i * 2.1) * 160, home[1] + Math.sin(i * 2.1) * 160]); pts.push(home);
      // the rival's path: on foot through the controls
      const path = [PLAYER.x, PLAYER.z]; let p0 = [PLAYER.x, PLAYER.z]; for (const p of pts) { const r = WALKG.route(p0[0], p0[1], p[0], p[1]); if (r) path.push(...r); path.push(p[0], p[1]); p0 = p; }
      const [a, b] = safeSpot(PLAYER.x + 1.5, PLAYER.z + 1, 0.5); this.st.rv = s2Human({ skin: 0xe8c0a0, shirt: 0x111111, pants: 0x111111, hair: 0x3a2a1a, hairStyle: 'Hair_Buzzed', longPants: true, hd: true }, a, b); this.st.P = s2Path(path); s2Mark(this.st.rv, 6); s2Chase(this.st.rv);
      this.st.cps = pts; this.st.cp = 0; this.st.step = 1; ['3', '2', '1'].forEach((t, i) => setTimeout(() => { if (K.isActive(this)) { HUD.big(t, '#fff', 0.8); AUDIO.cash(); } }, i * 1000)); setTimeout(() => { if (!K.isActive(this)) return; HUD.big('¡YA!', '#7fe08a', 1.2); this.st.go = true; this.cp(); }, 3000); }); },
  cp() { const K = K3(), S = this.st, c = S.cps[S.cp]; const last = S.cp === S.cps.length - 1; K.goto(c[0], c[1], 4, last ? 0xf5b72e : 0x46c3ff); K.ahead(S.cps, S.cp); K.setObjective((last ? b2('¡Meta en el Obispado!') : `Iglesia ${S.cp + 1}/${S.cps.length - 1}`) + ' · ¡a pie, y antes que el hermano Tomás!'); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.go || S.step !== 1) return; if (PLAYER.car) { s2Fail('¡En coche no vale! Descalificado'); return; }
    const done = s2Runner(S.rv, S.P, dt, 5.5); if (done) { s2Fail('El hermano Tomás ha llegado primero. «Ya te lo dije: piernas»'); return; }
    if (s2AtGoal(4.5)) { AUDIO.cash(); S.cp++; if (S.cp >= S.cps.length) { S.step = 2; K.talk([['Hermano Tomás', '¡Imposible! ¿Tú comes gofio o qué?'], [OBISPO, '¡Bravo, hijo mío! Los sacristanes van a hablar de esto hasta la próxima Semana Santa.']], () => s2Pass('Carrera de los sacristanes ganada', 900)); return; } this.cp(); } },
};
const CONCEJALES = [0, 1, 2, 3, 4].map((k) => ({ name: ['EL CONCEJAL', 'TENIENTE AL.', 'URBANISMO', 'FIESTAS', 'HACIENDA'][k], look: { skin: [0xe2b48f, 0xd9a47c, 0xc68a63, 0xe8c0a0, 0xd9a47c][k], shirt: 0xf2f2f2, pants: 0x1d2a44, hair: [0x777777, 0x2b2018, 0x111111, 0xb8860b, 0x555555][k], hairStyle: 'Hair_SimpleParted', longPants: true, hd: true } }));
const O_FUT_CONCEJALES = { sport: 'fut', rival: CONCEJALES, rivalName: 'CONCEJALES', kit: { shirt: '#f2f2f2', shorts: '#1d2a44', socks: '#1d2a44', stripe: '#1f6fb5' }, time: 170, lv: 0.42, prize: 1000, winWho: OBISPO, winLine: (s) => `¡${s[0]} a ${s[1]}! Los concejales prometen arreglar el tejado de la Catedral. Prometen... ya veremos.`, loseLine: 'Os han ganado los concejales: ni tejado ni nada' };
const M_OBISPO_7 = {
  title: 'Curas contra concejales', who: OBISPO, startPos() { return M_OBISPO_1.startPos(); },
  hint() { return 'Monseñor ' + b2('Truchas') + ' ha retado al Ayuntamiento: ve al ' + b2('Obispado'); },
  start() { const K = K3(); K.talk([[OBISPO, 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.'], [OBISPO, 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.'], [K.CH, 'Monseñor, ¿esto es legal?'], [OBISPO, 'Hijo, es fútbol.']], () => obispoGame(this, O_FUT_CONCEJALES)); },
  update() { obispoGameUpdate(this); },
};
const M_OBISPO_8 = {
  title: 'El ladrón del cepillo', who: OBISPO, startPos() { return M_OBISPO_1.startPos(); },
  hint() { return 'Monseñor ' + b2('Truchas') + ' está muy enfadado: ve al ' + b2('Obispado'); },
  start() { const K = K3(); this.st = { step: 0 }; const ch = churchNear(PLAYER.x, PLAYER.z - 300) || churchNear(PLAYER.x, PLAYER.z);
    K.talk([[OBISPO, '¡Se han llevado el cepillo de las limosnas de ' + (ch ? ch.name : 'la parroquia') + '! ¡Con lo de la misa de doce dentro!'], [OBISPO, 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.']], () => {
      if (!K.isActive(this)) return; s2Armed(); const c = ch ? [ch.cx, ch.cz] : [PLAYER.x, PLAYER.z - 300]; const d = streetDoor(c[0], c[1]); this.st.c = d ? [d.x, d.z] : c; this.st.step = 1; K.goto(this.st.c[0], this.st.c[1], 6, 0xb388ff); K.setTimer(110); K.setObjective('Ve a ' + b2(ch ? ch.name : 'la parroquia')); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && s2AtGoal(14)) { S.step = 2; K.setTimer(0); K.clearBeacon(); const [x, z] = k3Street(S.c[0], S.c[1], 15, 30); S.P = s2Path(s2Route(x, z, 900, 1400)); const a = S.P.at(0); S.car = s2Car('compact', 0x6d4c41, a[0], a[1], a[2]); S.car.mode = 'race'; S.car.driver = 'race'; s2Mark(S.car, 10);
      HUD.big('¡AHÍ VA!', '#b388ff', 1.6); K.setObjective('¡El ladrón huye en un ' + b2('coche marrón') + '! Persíguelo'); }
    if (S.step === 2) { const c = S.car; const done = s2DriveCar(c, S.P, dt, 19, (d) => (d > 150 ? 0.6 : d < 25 ? 1.1 : 1)); S.trk = (S.trk || 0) - dt; if (S.trk <= 0) { S.trk = 0.8; K.track(c.x, c.z); }
      if (Math.hypot(PLAYER.x - c.x, PLAYER.z - c.z) > 320) { s2Fail('El ladrón del cepillo se ha escapado'); return; }
      if (done || c.health < 45) { S.step = 3; c.mode = 'physics'; c.driver = null; c.ctl.brk = 1; const [a, b] = safeSpot(c.x + 2.5, c.z + 2, 0.6); S.n = s2Human(THIEF_LOOKS[2], a, b); S.P2 = s2RunPath(S.n, 150, 260); S.n.blip = true; s2Mark(S.n, 8);
        S.tg = s2Target(S.n, () => { s2Down(S.n); S.step = 4; K.talk([['Ladrón del cepillo', '¡Perdón, perdón! ¡Que era para las cuotas del gimnasio!'], [OBISPO + ' (por el móvil)', 'Hijo mío, devuelve el cepillo a su sitio. Y al ladrón, que lo confiese el padre Anselmo: penitencia de tres rosarios y una tarde con la tuna.']], () => s2Pass('Cepillo recuperado', 1300)); });
        K.setObjective('¡Huye a pie con el cepillo! Dale con la ' + b2('pistola de bolas')); } }
    if (S.step === 3 && !S.n.down) { const end = s2Runner(S.n, S.P2, dt, 5.8); s2TrackTarget(S.tg); if (S.P2.s > 8 && s2Near(S.n.x, S.n.z, 1.8) && !PLAYER.car) { s2Down(S.n); S.tg.hit = true; WEAPON.onHit && WEAPON.onHit(S.tg); } else if (end && !s2Near(S.n.x, S.n.z, 60)) s2Fail('El ladrón se ha perdido entre las calles'); } },
};

// =====================================================================================================================
// LAS CARRERAS DEL CANARIÓN (coches)
const CAN = 'El Canarión';
function k3RaceStart(m, P, rivals, cps, top) { // rivals: [{model, color}] start beside you; countdown; cps along P
  const K = K3(), S = m.st; S.P = P; S.cps = cps; S.cp = 0; S.rv = [];
  rivals.forEach((r, i) => { const sp = s2Path(P.pts); sp.s = 0; const a = sp.at(0); const side = i % 2 ? -1 : 1; const c = s2Car(r.model, r.color, a[0] + Math.cos(a[2]) * 3.2 * side, a[1] - Math.sin(a[2]) * 3.2 * side, a[2]); c.mode = 'race'; c.driver = 'race'; s2Mark(c, 8); S.rv.push({ c, P: sp, top: r.top || top }); });
  ['3', '2', '1'].forEach((t, i) => setTimeout(() => { if (K.isActive(m)) { HUD.big(t, '#fff', 0.8); AUDIO.cash(); } }, i * 1000)); setTimeout(() => { if (!K.isActive(m)) return; HUD.big('¡YA!', '#7fe08a', 1.2); S.go = true; k3RaceCp(m); }, 3000);
}
function k3RaceCp(m) { const K = K3(), S = m.st, c = S.cps[S.cp]; const last = S.cp === S.cps.length - 1; K.goto(c[0], c[1], 9, last ? 0xf5b72e : 0x46c3ff); K.ahead(S.cps, S.cp, S.P.pts); K.setObjective((last ? b2('¡META!') : `Control ${S.cp + 1}/${S.cps.length - 1}`) + (S.rv.length ? ' · Gana al Canarión' : ' · ¡Contra el reloj!')); }
function k3RaceUpdate(m, dt, win, lose) {
  const K = K3(), S = m.st; if (!S || !S.go || S.done) return;
  for (const r of S.rv) { const d = Math.hypot(PLAYER.x - r.c.x, PLAYER.z - r.c.z); const ahead = r.P.s > S.myS; if (s2DriveCar(r.c, r.P, dt, r.top, () => (ahead ? (d > 160 ? 0.82 : 0.97) : d > 160 ? 1.12 : 1.02))) { S.done = true; lose(); return; } }
  if (!PLAYER.car) { K.setObjective('¡Vuelve a un coche!'); return; }
  S.myS = S.cpS ? S.cpS[S.cp] : 0;
  if (s2AtGoal(10)) { AUDIO.cash(); S.cp++; if (S.cp >= S.cps.length) { S.done = true; win(); return; } k3RaceCp(m); }
}
function k3Cps(P, every) { const out = [], cpS = []; for (let s = every; s < P.tot - every * 0.4; s += every) { const q = P.at(s); out.push([q[0], q[1]]); cpS.push(s); } const e = P.at(P.tot); out.push([e[0], e[1]]); cpS.push(P.tot); return [out, cpS]; }
const C_PISTA = {
  title: 'Duelo nocturno en Los Rodeos', who: CAN, startPos: startAt('canarion', 2.6),
  hint() { return 'El ' + b2('Canarión') + ' quiere correr en un sitio con mucho espacio'; },
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.'], [K.CH, 'Eso no puede ser legal.'], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.']], () => {
      if (!K.isActive(this)) return; const R = AIRPORT.runway; if (!R) { K.abort('No encuentro la pista del aeropuerto.'); return; } GAME.tod = 23; try { updateSun(); updateEnvironment(true); } catch (e) { }
      const a = R.at(40); this.st.a = a; this.st.step = 1; K.goto(a[0], a[1], 10, 0x00e5ff); K.setObjective('Lleva un coche a la ' + b2('cabecera de la pista') + ' de Los Rodeos (por los accesos de servicio)'); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && PLAYER.car && s2AtGoal(14) && PLAYER.car.speed < 2) { S.step = 2; K.clearBeacon(); const R = AIRPORT.runway, pts = []; const n = (s, o) => { const q = R.at(s), L = Math.hypot(q[2], q[3]) || 1; return [q[0] + q[3] / L * o, q[1] - q[2] / L * o]; };
      for (let s = 40; s <= R.tot - 60; s += 25) pts.push(...n(s, 6)); pts.push(...n(R.tot - 40, 0)); for (let s = R.tot - 60; s >= 40; s -= 25) pts.push(...n(s, -6));
      const P = s2Path(pts); const [cps, cpS] = k3Cps(P, 350); S.cpS = cpS; k3RaceStart(this, P, [{ model: 'guancheGT', color: 0xffd200, top: 44 }], cps, 44); }
    if (S.step === 2) k3RaceUpdate(this, dt, () => K.talk([['El Canarión', '¡Ños! ¡Me has ganado en mi propia pista! Bueno, en la de AENA. Toma, que lo prometido es deuda.']], () => s2Pass('Ganador en la pista de Los Rodeos', 1500)), () => s2Fail('El Canarión ha llegado primero: «¡En las rectas nadie me gana, chicharrero!»')); },
};
const C_CASCO = {
  title: 'Contrarreloj por el casco', who: CAN, startPos: startAt('canarion', 2.6),
  hint() { return 'El ' + b2('Canarión') + ' te ha preparado una contrarreloj'; },
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.'], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.']], () => {
      if (!K.isActive(this)) return; const h = (typeof PLAZA !== 'undefined' ? [PLAZA.x, PLAZA.z] : [0, 0]); const [x, z] = s2Spot(h[0] + 60, h[1] + 40); const P = s2Path(s2Route(x, z, 1100, 1600)); const [cps, cpS] = k3Cps(P, 200); this.st.P0 = P; this.st.cps0 = cps; this.st.cpS = cpS;
      this.st.step = 1; K.goto(x, z, 6, 0x00e5ff); K.setObjective('Súbete a un coche y ve a la ' + b2('salida') + ' en el casco'); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && PLAYER.car && s2AtGoal(9) && PLAYER.car.speed < 2) { S.step = 2; K.clearBeacon(); k3RaceStart(this, S.P0, [], S.cps0, 0); setTimeout(() => { if (K.isActive(this)) K.setTimer(Math.round(S.P0.tot / 10.5 + 12)); }, 3000); }
    if (S.step === 2) { if (PLAYER.car && PLAYER.car.health <= 15) { s2Fail('¡Has destrozado el coche!'); return; } k3RaceUpdate(this, dt, () => { K.setTimer(0); K.talk([['El Canarión', '¡Eso es conducir! Ni un adoquín fuera de su sitio. Bueno, alguno.']], () => s2Pass('Contrarreloj del casco', 1000)); }, () => { }); } },
};
const C_GP = {
  title: 'Gran Premio de La Laguna', who: CAN, startPos: startAt('canarion', 2.6),
  hint() { return 'El ' + b2('Canarión') + ' organiza el Gran Premio de La Laguna'; },
  start() { const K = K3(); this.st = { step: 0 };
    K.talk([['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.'], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.'], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.']], () => {
      if (!K.isActive(this)) return; const [x, z] = k3Street(PLAYER.x, PLAYER.z, 30, 60); const P = s2Path(s2Route(x, z, 2300, 3000)); const [cps, cpS] = k3Cps(P, 300); this.st.P0 = P; this.st.cps0 = cps; this.st.cpS = cpS;
      this.st.step = 1; K.goto(x, z, 6, 0x00e5ff); K.setObjective('Súbete a un coche y ve a la ' + b2('parrilla de salida')); }); },
  update(dt) { const K = K3(), S = this.st; if (!S || !S.step) return;
    if (S.step === 1 && PLAYER.car && s2AtGoal(9) && PLAYER.car.speed < 2) { S.step = 2; K.clearBeacon(); k3RaceStart(this, S.P0, [{ model: 'guancheGT', color: 0xffd200, top: 31 }, { model: 'guancheGT', color: 0xffffff, top: 30 }], S.cps0, 30); }
    if (S.step === 2) k3RaceUpdate(this, dt, () => K.talk([['El Canarión', '¡Campeón del Gran Premio! El pijo está llamando a su padre. Toma tus tres mil y la foto.'], ['Pijo de La Esperanza', 'Papáaa...']], () => s2Pass('Campeón del Gran Premio de La Laguna', 3000)), () => s2Fail('Te han ganado el Gran Premio')); },
};

MISSIONS.addStory([M_RIFLE]);
MISSIONS.addSecreta([S_SEGUIR, S_CONTENEDORES, S_AMANO, S_CANCHA, S_MOJAR, S_GOFIO]);
MISSIONS.addObispo([M_OBISPO_5, M_OBISPO_6, M_OBISPO_7, M_OBISPO_8]);
MISSIONS.addCarreras([C_PISTA, C_CASCO, C_GP]);
