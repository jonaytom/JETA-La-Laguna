// ============ missions ============
const BEACON = (() => {
  const mat = new THREE.MeshBasicMaterial({ color: 0xf5b72e, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const g = new THREE.CylinderGeometry(1, 1, 1, 32, 1, true); g.translate(0, 0.5, 0);
  const ring = new THREE.RingGeometry(0.85, 1, 40); ring.rotateX(-Math.PI / 2);
  return {
    make(x, z, r, h, color = 0xf5b72e) {
      const grp = new THREE.Group(); const m = new THREE.Mesh(g, mat.clone()); m.material.color.set(color); m.scale.set(r, h, r); grp.add(m);
      const rg = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false })); rg.scale.setScalar(r); rg.position.y = 0.25; grp.add(rg);
      grp.position.set(x, heightAt(x, z) + 0.1, z); scene.add(grp); grp.userData.t = Math.random() * 6; return grp;
    },
    free(b) { if (!b) return; if (b.parent) b.parent.remove(b); b.traverse((o) => { if (o.material) o.material.dispose(); }); }, /* shared geometry, own materials (audit P0.3) */
    anim(b, dt) { if (!b) return; b.userData.t += dt; b.children[0].material.opacity = 0.25 + Math.sin(b.userData.t * 3) * 0.1; b.rotation.y += dt; },
  };
})();
function poiNear(type, x, z) { let best = null, bd = 1e9; for (const p of DATA.P) if (p[1] === type) { const d = Math.hypot(p[2] - x, p[3] - z); if (d < bd) { bd = d; best = p; } } return best; }
function frontOf(b, dist = 12) { // a reachable point on a road near a building
  const rd = ROADSEG.nearest(b.cx, b.cz, (r) => ROADCLASS(r) !== 'footway' && ROADCLASS(r) !== 'dirt'); return rd ? [rd.x, rd.z] : [b.cx, b.cz];
}
// ---- dialogue box with choices (used by El Blanco's riddle)
const DLG = (() => {
  let onPick = null, opts = [];
  function show(who, title, text, q, options, cb) {
    $('dlgWho').textContent = who; $('dlgTitle').textContent = title; $('dlgText').innerHTML = text; $('dlgQ').textContent = q || '';
    const box = $('dlgOpts'); box.innerHTML = ''; opts = options || []; onPick = cb;
    opts.forEach((o, i) => { const b = document.createElement('button'); b.id = 'dlgopt' + i; b.innerHTML = `<kbd>${i + 1}</kbd>${o}`; b.addEventListener('click', () => pickIdx(i)); box.appendChild(b); });
    $('dlg').style.display = 'block'; if (GAME.state === 'play') GAME.state = 'dialog'; document.exitPointerLock?.();
  }
  function pickIdx(i) { if (!onPick) return; const cb = onPick; onPick = null; cb(i); }
  function hide() { $('dlg').style.display = 'none'; onPick = null; if (GAME.state === 'dialog') { GAME.state = 'play'; GAME.lock(); } }
  window.addEventListener('keydown', (e) => { if ($('dlg').style.display !== 'block') return; const n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length) pickIdx(n - 1); if ((e.key === 'Enter' || e.key === ' ') && !opts.length && onPick) pickIdx(0); });
  return { show, hide, get open() { return $('dlg').style.display === 'block'; } };
})();
const NPC = {};
// never leave a character or a goal inside a (non-visitable) building: move it to the nearest open street/park spot
function inAnyBuilding(x, z) { for (const b of DATA.B) { const c = b[6]; if (Math.abs(c[0] - x) > 150 || Math.abs(c[1] - z) > 150) continue; if (pip(x, z, c)) return true; } return false; }
// a clearly reachable spot 1.8-4 m from an NPC (for mission start rings): outside buildings, walls, trees and the
// tower, prefers the direction 'pref' (away from the wall the NPC leans on)
function openSpotNear(x, z, pref = 0) {
  for (const r of [2.0, 2.6, 3.2, 4.0]) for (let k = 0; k < 16; k++) { const a = pref + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * Math.PI / 8; const px = x + Math.sin(a) * r, pz = z + Math.cos(a) * r;
    if (inAnyBuilding(px, pz) || COL.nearSeg(px, pz, 1.0) || lowAt(px, pz, heightAt(px, pz))) continue; const q = COL.resolve(px, pz, 1.0); if (Math.hypot(q.x - px, q.z - pz) > 0.02) continue; return [px, pz]; }
  return [x + 1.4, z + 1.4];
}
function safeSpot(x, z, clear = 0.7) {
  const ok = (a, b, strict) => !inAnyBuilding(a, b) && !COL.nearSeg(a, b, clear) && (!strict || !onCarriageway(a, b, 0.3)) && !lowAt(a, b, heightAt(a, b));
  if (ok(x, z, false)) return [x, z];
  for (const strict of [true, false]) for (let r = 1; r <= 80; r += 1) for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r; if (ok(px, pz, strict)) return [px, pz]; }
  return [x, z];
}
// ============ STORY: Santi «El Chopa» vuelve al barrio ============
// Santi «El Chopa» (por su narizota): listo, pero acabó preso por robar. Sale de la cárcel y quiere redimirse en La Laguna.
// El Blanco es su amigo de la infancia de verdad (exmilitar, se le fue la cabeza, vive con sus padres, entiende de armas);
// los demás son gente del barrio, de la pandilla de El Blanco, a los que la vida ha tratado fatal.
// fight tutorial (Sastrón): step by step through the 2D fighting controls, then a real round
function fightTutorial() {
  const T = document.body.classList.contains('touchmode');
  const steps = [
    ['walk', T ? 'Muévete con ◀ ▶' : 'Muévete con A y D', (e) => (e.walk || 0) > 50],
    ['jab', T ? 'Puñetazo: P' : 'Puñetazo: J o clic izquierdo', (e) => e.jab],
    ['kick', T ? 'Patada: K' : 'Patada: K o clic derecho', (e) => e.kick],
    ['jump', T ? 'Salta: ▲' : 'Salta: Espacio', (e) => e.jump],
    ['sweep', T ? 'Barrido: ▼ + K' : 'Barrido: S + patada', (e) => e.sweep],
    ['blocked', T ? 'Cúbrete: atrás cuando ataque' : 'Cúbrete: mantén atrás cuando Sastrón ataque', (e) => e.blocked],
    ['combo', 'Combo: puño, puño, patada', (e) => e.combo],
    ['gofio', T ? 'Bola de gofio: ◀ ▶ + P' : 'Bola de gofio: atrás, adelante + puñetazo', (e) => e.gofio],
    ['teide', T ? 'Patada del Teide: ◀ ▶ + K' : 'Patada del Teide: atrás, adelante + patada', (e) => e.teide],
    ['gancho', T ? 'Gancho del Roque: ▼ ▲ + P' : 'Gancho del Roque: abajo, arriba + puñetazo', (e) => e.gancho],
    ['pastor', T ? 'Salto del Pastor: ▼ ▲ + K' : 'Salto del Pastor: abajo, arriba + patada', (e) => e.pastor],
  ];
  let i = 0, wait = 0;
  return {
    check(st) {
      if (st.phase !== 'fight') return;
      if (st.a.hp < 40) st.a.hp = 100; if (st.b.hp < 30) st.b.hp = 100;
      if (i >= steps.length) return;
      const [k, tip, ok] = steps[i]; st.tip = `${i + 1}/${steps.length}  ${tip}`;
      st.b.ai.passive = k !== 'blocked'; st.b.ai.lv = 0; st.b.ai.tutAttack = k === 'blocked';
      if (k === 'blocked') { st.blkT = (st.blkT || 0) + 1; if (st.blkT > 60 * 25) st.ev.blocked = true; } // never gets stuck on this step
      if (wait > 0) { wait--; if (wait === 0) { i++; st.ev = {}; if (i >= steps.length) { st.tip = ''; st.banner = '¡AHORA EN SERIO!'; st.bannerCol = '#ffd400'; st.bannerSize = 12; setTimeout(() => { if (st.banner === '¡AHORA EN SERIO!') st.banner = ''; }, 1500); st.tut = null; st.a.hp = st.b.hp = 100; st.b.ai = { lv: 0.1, t: 0, blockT: 0 }; } } return; }
      if (ok(st.ev)) { wait = 40; st.tip = '¡BIEN!  ' + tip; AUDIO.cash && AUDIO.cash(); }
    },
  };
}
// advance spoken lines: click (PC, without punching), Enter, or tap on the subtitle
function talkSkip() { const T = window.__TALK; if (!T || !T.cur || (GAME.state !== 'play' && GAME.state !== 'cutscene')) return false; T.cur.next(); return true; }
document.addEventListener('mousedown', (e) => { if (e.button === 0 && document.pointerLockElement && window.__TALK && window.__TALK.cur && GAME.state === 'play') { FIGHT.blockPunch = true; WEAPON.want = false; talkSkip(); } });
window.addEventListener('keydown', (e) => { if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat && !(DLG && DLG.open) && talkSkip()) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
const MISSIONS = (() => {
  let active = null, activeTrack = null, step = 0, timer = 0, beacon = null, data = {};
  const GANG = { formed: false, name: '', members: [] }; window.GANG = GANG;
  const SASTRON_FEE = 2500;
  const TALK = { cur: null }; window.__TALK = TALK;
  const bold = (s) => `<b>${s}</b>`;
  const CH = 'El Chopa';
  // spoken lines as subtitles: each one stays until you click / tap / press Space or Enter
  const talk = (lines, cb) => { const my = {}; TALK.cur = my; let i = 0, tm = 0;
    const next = () => { if (TALK.cur !== my) return; clearTimeout(tm); if (i >= lines.length) { TALK.cur = null; $('sub').classList.remove('talking'); HUD.sub('', 0.01); cb && cb(); return; } const [who, t, d = 8.8] = lines[i++];
      SUB.show(`${who ? bold(who + ':') + ' ' : ''}${t} <span class="subnext">▶ ${document.body.classList.contains('touchmode') ? 'toca para seguir' : 'clic / Espacio'}</span>`, 99999); $('sub').classList.add('talking'); }; // lines only move on with a click / tap / Space / Enter
    my.next = next; next(); };
  const setObjective = (t) => { const o = $('objective'); if (!t) { o.style.display = 'none'; return; } o.style.display = 'block'; o.innerHTML = t + (timer > 0 ? `<span class="t" id="mtimer"></span>` : ''); };
  function clearBeacon() { if (beacon) { BEACON.free(beacon); beacon = null; } }
  function goto(x, z, r, color) { [x, z] = safeSpot(x, z, 0.3); clearBeacon(); beacon = BEACON.make(x, z, r, 7, color); data.goal = [x, z, r]; updateGPS(true); }
  function finish() { if (data.rival && data.rival.mode === 'race') { data.rival.mode = 'physics'; data.rival.driver = null; data.rival.ctl.brk = 1; } clearBeacon(); setObjective(null); const tr = TRACKS[activeTrack]; active = null; activeTrack = null; timer = 0; data = {}; GPS.path = null; return tr; }
  function pass(title, money, keepIdx) { const tr = finish(); if (!keepIdx) tr.idx++; PLAYER.money += money; setTimeout(() => { try { SAVE.auto('Misión superada: ' + title); } catch (e) { } }, 1500); MUSIC.jingle(); HUD.big('¡MISIÓN SUPERADA!', '#f5b72e', 4); HUD.toast(title + (money ? '  +$' + money : ''), '#7fe08a', 4); setTimeout(placeStarts, 2500); }
  function fail(reason, noRetry) { const m = active, k = activeTrack; finish(); AUDIO.fail(); HUD.big('MISIÓN FALLIDA', '#e04848', 3.5); HUD.toast(reason, '#ffb3b3', 4); setTimeout(placeStarts, 2500); if (m && !noRetry) offerRetry(m, k); }
  // after a failure: «¿Reintentar?» (works with the mouse, keys 1/2 and touch). Waits until the player is back in play
  // (after a respawn, a 2D fight…) and gives up if another mission has started meanwhile.
  function offerRetry(m, k) { let tries = 0; const ask = () => { if (active || TRACKS[k].list[TRACKS[k].idx] !== m) return; if (GAME.state !== 'play' || PLAYER.dead || (DLG && DLG.open)) { if (++tries < 40) setTimeout(ask, 500); return; }
      DLG.show(m.who || '', m.title, 'La misión ha fallado. ¿Quieres volver a intentarlo desde el principio?', '', ['Reintentar', 'Ahora no'], (i) => { DLG.hide(); if (i === 0) retry(m, k); }); };
    setTimeout(ask, 2600); }
  function retry(m, k) { if (active) return; if (PLAYER.car) { try { exitCar(); } catch (e) { } } const sp = m.startPos(); const r = COL.resolve(sp[0], sp[1], 0.4); PLAYER.x = r.x; PLAYER.z = r.z; WANTED.level = 0; begin(m, k); }
  function begin(m, k) { for (const kk in TRACKS) if (TRACKS[kk].beacon) { BEACON.free(TRACKS[kk].beacon); TRACKS[kk].beacon = null; } active = m; activeTrack = k; data = {}; setWaypoint(null); setObjective(null); HUD.big(active.title.toUpperCase(), '#fff', 3); active.start(); }
  function abort(msg) { finish(); if (msg) HUD.toast(msg, '#f5b72e', 4); setTimeout(placeStarts, 1500); }
  const near = (n, r = 3.2) => Math.hypot(PLAYER.x - n.x, PLAYER.z - n.z) < r && (!PLAYER.car || PLAYER.car.speed < 2);
  function moveNPC(n, x, z, face) { const [a, b] = safeSpot(x, z, 0.6); n.x = a; n.z = b; n.H.root.position.set(a, heightAt(a, b) + 0.17, b); if (face) n.H.root.rotation.y = Math.atan2(face[0] - a, face[1] - b); }
  // dialogue chain with the DLG box (one "Seguir" button per line): [[who, text], ...]
  const chat = (title, lines, cb) => { let i = 0; const next = () => { if (i >= lines.length) { DLG.hide(); cb && cb(); return; } const [who, t, btn] = lines[i++]; if (/Blanco/.test(who)) AUDIO.mumble(1.6); DLG.show(who, title, t, '', [btn || 'Seguir'], () => setTimeout(next, 120)); }; next(); };

  // ======================= STORY =======================
  const STORY = [
    {
      title: 'Vuelta al barrio', who: 'Ruymán «El Blanco»',
      hint() { return 'Habla con ' + bold('Ruymán «El Blanco»') + ', en la puerta de casa de sus padres'; },
      startPos() { return [NPC.blanco.x + 1.2, NPC.blanco.z + 1.2]; },
      start() {
        step = 0; data.round = 0; data.fails = 0;
        const R = [
          { t: 'Ehhh... <b>psss</b>... ejem... tú... brrr... <b>ve</b>... ahhh... a la... prrr... <b>¿tooo...rre?</b>... ehhh', q: '¿Qué ha querido decir?', o: ['Vete a la porra', 'Ve a la torre', 'Ven a la tarde, que hay potaje'], ok: 1 },
          { t: 'Prrr... sí... ehhh... la de... <b>Con</b>... psss... ejem... <b>cep</b>... brrr... mmm... <b>ción</b>... ahhh... la... la... pss', q: '¿Qué torre?', o: ['La de la Consolación', 'La de Conce, la del bar', 'La de La Concepción'], ok: 2 },
          { t: 'Y... ahhh... brrr... <b>bus</b>... ejem... ca... a... ehhh... <b>Bo</b>... psss... <b>ca</b>... prrr... <b>Pa</b>... ehh... <b>pa</b>... ¿sabes? brrr', q: '¿A quién hay que buscar?', o: ['Una boca de papas fritas', 'A Boca Papa', 'A tu papá, que te busca'], ok: 1 },
        ];
        const fails = ['Brrr... no... ehhh... pssss... ¡NO!', 'Ahhh... prrr... tú no... ejem... escuchas...', 'Pss... mi madre... ehhh... eso lo entiende...', 'Mmm... firmes... ¡FIRMES!... brrr... no...'];
        const ask = () => {
          const r = R[data.round]; AUDIO.mumble(2.2);
          DLG.show('Ruymán «El Blanco»', data.round === 0 ? 'Descifra lo que dice El Blanco' : `Descifra lo que dice El Blanco (${data.round + 1}/3)`, `«${r.t}»`, r.q, r.o, (i) => {
            if (i === r.ok) { AUDIO.cash(); data.round++; if (data.round < R.length) setTimeout(ask, 250); else end(); }
            else { data.fails++; AUDIO.fail(); AUDIO.mumble(1.2); DLG.show('Ruymán «El Blanco»', 'Eso no era…', `«${pick(fails)}»`, '', ['Intentarlo otra vez'], () => setTimeout(ask, 200)); }
          });
        };
        const end = () => {
          DLG.show('Mensaje descifrado', '«Ve a la torre de La Concepción y busca a Boca Papa»', 'El Blanco asiente muy despacio, se cuadra como en el cuartel, te hace un saludo militar torcido y vuelve a mirar al infinito. <b>Brrr.</b>', '', ['Vale, voy para allá'], () => {
            DLG.hide(); step = 1; goto(NPC.boca.x, NPC.boca.z, 2.5); setObjective('Ve a la ' + bold('torre de La Concepción') + ' y busca a ' + bold('Boca Papa'));
          });
        };
        chat('Santi «El Chopa» vuelve al barrio', [
          ['Santi «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Ruymán, «El Blanco»</b>. Mi amigo de toda la vida.'],
          [CH, '¡Blanco! ¡Chacho, soy yo, Santi! El Chopa. ¿No me reconoces? Con esta nariz no me confunde nadie.'],
          ['Ruymán «El Blanco»', '«Brrr... mmm... ahhh... ¿Cho...pa?... psss... mmm.»<br><i>Te mira la nariz. Sonríe. Te ha reconocido.</i>'],
          [CH, 'Salí ayer de la prisión. Me cogieron por listo, Blanco... por pasarme de listo. Pero se acabó. Quiero hacer las cosas bien, redimirme. Vivir en La Laguna como una persona normal.'],
          ['Ruymán «El Blanco»', '«Ahhh... brrr... mmm... nor... mal... psss.»<br><i>Ruymán estuvo en el ejército. Volvió de su última misión callado y raro, y desde entonces vive con sus padres, que le planchan el chándal gris. De armas sabe más que nadie del barrio. De hablar, no tanto.</i>'],
          [CH, 'Oye... ¿y la gente? ¿La pandilla de cuando éramos chicos? ¿Qué fue de los colegas?', 'Preguntarle por la pandilla'],
        ], () => setTimeout(ask, 200));
      },
      update() {
        if (step !== 1) return;
        if (near(NPC.boca)) {
          step = 2; clearBeacon(); setObjective(null);
          talk([['Boca Papa', '¡Ños! ¿El Chopa? ¡Esa nariz la reconozco desde la Plaza del Adelantado! No te acordarás de mí: yo era el gordito que iba siempre detrás de El Blanco.'],
            ['Boca Papa', 'Me llaman Boca Papa porque tenía el quiosco de papas fritas del barrio. Me lo comí. Literalmente: me comí el negocio entero. Ahora vivo aquí, a la sombra de la torre.'],
            ['Boca Papa', '¿Que saliste del talego y quieres redimirte? Muy bonito. Pero en esta ciudad, solo, no se redime nadie, mi niño. Hace falta una BANDA. Y tú tienes cabeza de jefe.'],
            ['Boca Papa', 'El Blanco ya está dentro, que en la mili aprendió a hacer de todo. El siguiente es Coco, el calvo: era el campeón de boxeo del barrio. Ahora anda tirado por ' + NPC.coco.place + '. Va siempre con sed.']], () => pass('Vuelta al barrio', 150));

        }
      },
    },
    {
      title: 'Una botella para Coco', who: 'Coco',
      hint() { return 'Busca a ' + bold('Coco') + ' junto a ' + bold(NPC.coco.place); },
      startPos() { return [NPC.coco.x + 1.2, NPC.coco.z + 1.2]; },
      start() {
        const it = INTERIORS.find((i) => i.id === 'cafe'); data.bar = it; step = 0;
        talk([['Coco', '¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios.'],
          ['Coco', '¿El Chopa? ¿El amigo de El Blanco? Ahhh, el de la nariz... Hice la mili con Ruymán, ¿sabes? Él volvió rarito y yo volví sin pelo. La vida, mi niño.'],
          ['Coco', `Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de ${it ? it.name : 'la cafetería'}, la que tiene la puerta abierta. Y de las grandes.`]]);
        if (it) { goto(it.door.x + it.door.nx * 2, it.door.z + it.door.nz * 2, 2.2); setObjective(`Entra en ${bold(it.name)} y compra una ${bold('botella de ron')} en la barra`); }
        else setObjective('Compra una botella de ron');
      },
      wantsBottle() { return step === 0; },
      onEvent(t, tag) { if (t === 'bought' && tag === 'ron' && step === 0) { step = 1; SUB.show(bold('Camarera:') + ' ¿Ron a estas horas? Bueno, cariño, tú sabrás. Que no te vea el cura.', 4); goto(NPC.coco.x, NPC.coco.z, 2.5); setObjective('Lleva la botella a ' + bold('Coco')); } },
      update() {
        if (step === 0 && data.bar && PLAYER.interior === data.bar && beacon) { clearBeacon(); setObjective(`Acércate a la ${bold('barra')} y pulsa <kbd>E</kbd> / ENTRAR para pedir`); }
        if (step === 1 && near(NPC.coco)) {
          step = 2; clearBeacon(); setObjective(null);
          talk([['Coco', '¡Aaaay, mi alma! Esto sí es un amigo. *glu glu glu*'],
            ['Coco', 'Te voy a decir una cosa, Chopa: el día que entres en tu banda te enseño a pelear como Dios manda. Un jab, un crochet... y a correr, que ya no tengo edad.'],
            ['Coco', 'El que os falta es Sastrón. Era sastre, el mejor de La Laguna: le hizo a El Blanco el traje de la comunión. Un día las tijeras le empezaron a hablar... y les hizo caso. Ahora lo verás por ' + NPC.sastron.place + '.'],
            ['Coco', 'Ve a verle. Pero ojo: antes de hablar de nada te va a tomar las medidas... a guantazos. Le enseñé yo, así que no te confíes.'],
            ['Coco', 'Toma, que me sobraron de un cajero que estaba abierto. No preguntes. Tú, que estás reformado, mejor ni preguntes.']], () => pass('Una botella para Coco', 200));
        }
      },
    },
    {
      title: 'Sastrón', who: 'Sastrón',
      hint() { return 'Busca a ' + bold('Sastrón') + ' junto a ' + bold(NPC.sastron.place); },
      startPos() { return [NPC.sastron.x + 1.2, NPC.sastron.z + 1.2]; },
      start() {
        step = 0;
        if (GANG.sastronTut) { talk([['Sastrón', '¿Ya traes las perras, Chopa? Las tijeras están impacientes.']], () => this.pay()); return; }
        talk([['Sastrón', '¡Quieto ahí! No te muevas... ochenta y dos de pecho, cuarenta de cuello y una nariz... una nariz de talla especial. ¡Tú eres el Chopa!'],
          ['Sastrón', 'Yo vestí a media Laguna. Trajes de boda, de comunión, de entierro... El de la comunión de Ruymán, con su pajarita. Luego las tijeras empezaron a hablarme. Y tenían razón en todo.'],
          ['Sastrón', 'Pero antes de coserte nada te tomo las medidas... ¡a guantazos! Coco me enseñó todo lo que sé. Ponte en guardia, Chopa.']], () => {
          if (active !== this) return;
          FIGHT2D.start({ a: { name: 'EL CHOPA', look: { ...(playerHuman.look || {}) }, nose: true }, b: { name: 'SASTRÓN', look: NPC.sastron.H.look || {}, deal: 0.4, recv: 1.3, ai: { lv: 0, t: 0, blockT: 0, passive: true } },
            ax: PLAYER.x, az: PLAYER.z, bx: NPC.sastron.x, bz: NPC.sastron.z, hide: [playerHuman.root, NPC.sastron.H.root, WEAPON.mesh], tutorial: fightTutorial(), single: true,
            onEnd: (r) => { if (active !== this) return; if (!r.won) { talk([['Sastrón', 'Jejeje, todavía te falta, Chopa. Pero tienes madera... de percha. Vuelve cuando quieras la revancha.']], () => abort('Sastrón te espera para la revancha')); return; }
              GANG.sastronTut = true; talk([['Sastrón', '¡Ay, mis costillas! Vale, vale... tienes buenas medidas. Y mejor puño. Estás a mi altura.'], ['Sastrón', `¿Una banda? ¿Con El Blanco y el calvo? Puedo haceros ropa que ni en Milán... Pero mi talento vale ${SASTRON_FEE} pavos. Al contado. Las tijeras no aceptan Bizum.`]], () => this.pay()); } });
        });
      },
      pay() {
        if (active !== this) return;
          if (PLAYER.money < SASTRON_FEE) { DLG.show('Sastrón', 'No tienes suficiente', `Tienes <b>$${PLAYER.money}</b> y Sastrón pide <b>$${SASTRON_FEE}</b>.<br>Lo más rápido: el <b>Canarión</b> paga bien si le ganas una carrera en la Avenida de La Trinidad (círculo azul, opcional). También puedes reunirlo <b>peleando por la calle</b>, pero tardarás bastante más.`, '', ['Carrera con el Canarión (recomendado)', 'Lo reuniré peleando'], (i) => { DLG.hide(); TRACKS.side.open = true; if (i === 0) setWaypoint(NPC.canarion.x, NPC.canarion.z, true); abort(i === 0 ? 'El Canarión te espera en la Avenida de La Trinidad (círculo azul)' : 'Vuelve a ver a Sastrón cuando tengas $' + SASTRON_FEE); }); return; }
          DLG.show('Sastrón', '¿Pagas?', `Sastrón extiende la mano. Con la otra sujeta unas tijeras enormes y una cinta métrica que le cuelga del cuello.<br>Tienes <b>$${PLAYER.money}</b>.`, '', [`Pagar $${SASTRON_FEE} y meterle en la banda`, 'Todavía no'], (i) => {
            DLG.hide(); if (i !== 0) { abort('Sastrón seguirá ahí, hablando con sus tijeras'); return; }
            PLAYER.money -= SASTRON_FEE; AUDIO.cash(); TRACKS.side.open = false;
            talk([['Sastrón', '¡Trato hecho! Las tijeras dicen que eres de fiar, aunque vengas del talego. Os voy a hacer unos uniformes que vais a parecer de la Guardia Real... de Taco.'], ['Sastrón', 'Nos vemos en la torre de La Concepción. Boca Papa ya me ha mandado un audio de doce minutos.']], () => pass('Sastrón se une a la banda', 0));
          });
      },
      update() { },
    },
    {
      title: 'La firma de la banda', who: 'Boca Papa',
      hint() { return 'Vuelve con ' + bold('Boca Papa') + ' a la ' + bold('torre de La Concepción') + ' para firmar la banda'; },
      startPos() { return NPC.boca.start || [NPC.boca.x + 1.4, NPC.boca.z + 1.4]; },
      start() {
        step = 0; const b = NPC.boca; const ring = [[NPC.blanco, 2.6, 0.4], [NPC.coco, 2.6, 1.9], [NPC.sastron, 2.6, 3.4]];
        for (const [n, r, a] of ring) moveNPC(n, b.x + Math.cos(a) * r, b.z + Math.sin(a) * r, [b.x, b.z]);
        $('fade').style.opacity = 1; setTimeout(() => { $('fade').style.opacity = 0; }, 600);
        chat('La firma de la banda', [
          ['Boca Papa', 'Bueno, bueno... ¡ya estamos todos! La pandilla del barrio otra vez junta. Un boxeador calvo, un sastre que habla con sus tijeras, un militar que dice brrr, yo... y el jefe: Santi, el Chopa.'],
          ['Ruymán «El Blanco»', '«Brrr... mmm... ehhh... jefe... psss... ¡jefe! Mmm.»<br><i>Se pone firme. Es lo más parecido a un discurso que le has oído en treinta años.</i>'],
          ['Boca Papa', 'El Blanco dice que está muy contento. Y que va a montar la armería de la banda en el garaje de su madre. Cuando ella no mire.'],
          ['Coco', 'Yo me encargo de que sepáis pelear. Y el primero que me diga «calvo» se lleva un sopapo.'],
          ['Sastrón', 'Y yo de que vayáis elegantes. Nadie respeta a una banda con chándal... con perdón, Blanco.'],
          [CH, 'Escuchadme. Salí de la cárcel para hacer las cosas bien. Esto no es para robar a nadie: es para levantarnos. Para que en La Laguna se nos vuelva a respetar.'],
          ['Boca Papa', 'Muy bonito, Chopa, se me caen las lágrimas. Ahora ponle nombre y firma aquí, en esta servilleta del bar.'],
        ], () => {
          if (active !== this) return;
          const names = ['Los Chachos de Aguere', 'La Banda del Barraquito', 'Los Guanches del Casco', 'Los Magos de La Laguna'];
          DLG.show('La firma de la banda', '¿Cómo se va a llamar la banda?', 'Boca Papa saca un boli mordido. Todos te miran. El Blanco hace <b>brrr</b>.', 'Elige el nombre:', names, (i) => {
            DLG.hide(); GANG.formed = true; GANG.name = names[i]; GANG.members = ['Boca Papa', 'Ruymán «El Blanco»', 'Coco', 'Sastrón'];
            HUD.big(names[i].toUpperCase(), '#f5b72e', 6); MUSIC.jingle();
            setTimeout(() => talk([['Boca Papa', `¡${names[i]}! Suena a leyenda. Tú eres el jefe, Chopa. Aquí empieza la historia.`], ['Boca Papa', 'Pero antes una lección, que te veo flojo de la cárcel: un jefe tiene que comer. Ven a verme y te explico.']], () => {
              // everybody goes back to their spots; El Blanco to his parents' door
              moveNPC(NPC.blanco, NPC.blanco.home[0], NPC.blanco.home[1]); moveNPC(NPC.coco, NPC.coco.home[0], NPC.coco.home[1]); moveNPC(NPC.sastron, NPC.sastron.home[0], NPC.sastron.home[1]);
              pass('La banda está firmada', 500); }), 2500);
          });
        });
      },
      update() { },
    },
    {
      title: 'Boca Papa te enseña a comer', who: 'Boca Papa',
      hint() { return 'Habla con ' + bold('Boca Papa') + ' en la ' + bold('torre de La Concepción'); },
      startPos() { return NPC.boca.start || [NPC.boca.x + 1.4, NPC.boca.z + 1.4]; },
      start() {
        step = 0; const s = FOOD.nearest(PLAYER.x, PLAYER.z); data.shop = s;
        talk([['Boca Papa', 'A ver, jefe. Las peleas, los porrazos de la Local y los golpes con el coche te quitan salud. Y la salud no vuelve sola: ¡hay que comer! De esto sé un rato, mírame.'],
          ['Boca Papa', 'Las tiendas de comida tienen una cruz roja encima, y en el mapa salen como cuadraditos rojos. Un bocata de pata te deja como nuevo.'],
          ['Boca Papa', `Ve a ${s ? s.name : 'la tienda más cercana'} y cómete algo. Y luego pásate por casa de El Blanco, que dice que tiene algo para ti. Bueno, dice «brrr», pero yo le entiendo.`]]);
        if (s) { goto(s.x, s.z, 2.2, 0xe53935); setObjective(`Ve a ${bold(s.name)} y compra algo de comer (<kbd>E</kbd> / ENTRAR)`); }
      },
      onEvent(t) { if (t === 'ate' && step === 0) { step = 1; talk([['Boca Papa (gritando desde lejos)', '¡Eso es, Chopa! Barriga llena, jefe contento. ¡Y ahora ve a ver a El Blanco!']], () => pass('Ya sabes recuperar salud', 50)); } },
      update() { },
    },
    {
      title: 'El campo de tiro de El Blanco', who: 'Ruymán «El Blanco»',
      hint() { return 'Ve a ver a ' + bold('El Blanco') + ' a casa de sus padres'; },
      startPos() { return [NPC.blanco.x + 1.2, NPC.blanco.z + 1.2]; },
      start() {
        step = 0; const R = findRange(NPC.blanco.x, NPC.blanco.z); data.range = R;
        chat('El campo de tiro de El Blanco', [
          ['Ruymán «El Blanco»', '«Brrr... Chopa... mmm... ven... psss... ven.»<br><i>Mira a los lados. Abre el garaje de sus padres. Entre la lavadora vieja y las cajas de Navidad hay una caja de munición del ejército.</i>'],
          ['Ruymán «El Blanco»', '«Ahhh... esto... mmm... pistola... brrr. Seis... seis bolas.»<br><i>Te acompaña a un solar abandonado detrás de la casa. Coloca seis latas vacías encima de unos palés.</i>'],
          ['Ruymán «El Blanco»', '«Mmm... no... no es de verdad... psss. Bolas... plástico... aire... brrr... comprimido.»<br><i>Es una pistola de <b>bolas de plástico de aire comprimido</b>, una réplica de las de airsoft. Hace pupa y asusta, pero no mata. Eso sí: de lejos parece de verdad.</i>'],
          [CH, 'Blanco, yo salí para reformarme... Pero vale. Por si acaso. Solo para defendernos.'],
          ['Ruymán «El Blanco»', `«Mmm... apunta... brrr... ¡dispara!»<br><b>Controles:</b> ${document.body.classList.contains('touchmode') ? 'pulsa <b>APUNTAR</b> y luego <b>DISPARAR</b>; arrastra el dedo para mover la mira' : 'mantén <b>clic derecho</b> para apuntar y haz <b>clic izquierdo</b> para disparar'}.<br>Tienes que tirar <b>las 6 latas con 6 bolas</b>. Si fallas, El Blanco las vuelve a poner.`, 'Al lío'],
        ], () => {
          if (active !== this) return;
          if (PLAYER.car) exitCar();
          PLAYER.x = R.stand[0]; PLAYER.z = R.stand[1]; PLAYER.y = heightAt(PLAYER.x, PLAYER.z) + 0.2; CAM.yaw = Math.atan2(R.cans[2][0] - R.stand[0], R.cans[2][2] - R.stand[1]); CAM.pitch = 0.05; PLAYER.h = CAM.yaw;
          moveNPC(NPC.blanco, R.stand[0] + R.side[0] * 2.2, R.stand[1] + R.side[1] * 2.2, [R.cans[2][0], R.cans[2][2]]);
          giveWeapon(6, true); this.setCans(); step = 1; setObjective('Tira ' + bold('las 6 latas') + ' · <span id="cansLeft">6</span> en pie');
          WEAPON.onHit = () => { const left = data.cans.filter((t) => !t.hit).length; const e = $('cansLeft'); if (e) e.textContent = left; if (left === 0) this.won(); };
          WEAPON.onShot = () => { if (step !== 1) return; setTimeout(() => { if (step === 1 && WEAPON.ammo <= 0 && data.cans.some((t) => !t.hit)) { SUB.show(bold('El Blanco:') + ' «Brrr... ¡NO!... mmm... otra vez... psss.» (vuelve a colocar las latas)', 3); setTimeout(() => { if (step === 1) { this.setCans(); WEAPON.ammo = 6; updateWeaponHUD(); const e = $('cansLeft'); if (e) e.textContent = 6; } }, 1800); } }, 400); };
        });
      },
      setCans() {
        for (const t of data.cans || []) scene.remove(t.mesh); data.cans = [];
        const mat = M(0xc0392b, 0.35, 0.6), top = M(0xdadada, 0.3, 0.8);
        for (const [x, y, z] of data.range.cans) { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 12), mat); const t = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.01, 12), top); t.position.y = 0.085; g.add(b, t); g.position.set(x, y, z); scene.add(g); data.cans.push({ x, y, z, r: 0.13, mesh: g }); }
        WEAPON.targets = data.cans;
      },
      won() {
        if (step !== 1) return; step = 2; WEAPON.onHit = WEAPON.onShot = null; WEAPON.targets = [];
        setTimeout(() => { for (const t of data.cans) scene.remove(t.mesh); }, 4000);
        takeWeapon();
        chat('El campo de tiro de El Blanco', [
          ['Ruymán «El Blanco»', '«¡Mmm! ¡Brrr! ¡Bien... bien!»<br><i>Aplaude dos veces, muy serio. Te da la pistola y una caja con seis bolas.</i>'],
          ['Ruymán «El Blanco»', '«Psss... cuidado... mmm... policía... muchos... brrr... rápidos.»<br><i>Lo ha entendido hasta un turista: aunque sea de bolas, sacar algo que parece un arma en la calle es <b>delito grave</b>. Si alguien te ve disparar, vendrá mucha más policía, con coches más rápidos, y costará mucho más despistarla. Sin pistola, a puñetazos (<kbd>Q</kbd> / clic).</i>', 'Entendido'],
        ], () => { giveWeapon(6, false); pass('Tienes la pistola de El Blanco (6 bolas)', 0); });
      },
      update() { },
    },
  ];
  // ===== the Canarión's time trial (story mission + repeatable rematch when you're short of money for Sastrón)
  function startRace(m, first) {
    step = 0; data.first = first;
    if (first) talk([['El Canarión', '¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.'], ['El Canarión', 'Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.'], ['El Canarión', 'Te propongo una carrera por La Laguna, tú y yo, coche contra coche. Si llegas primero, te llevas 2.000 pavos. Si no, me invitas a unas papas arrugadas... que aquí no saben hacerlas.'], ['El Canarión', '¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.']]);
    else talk([['El Canarión', '¿Otra vez por aquí, chicharrero? ¿Te falta dinero pa\' tu sastre loco? Venga, revancha: si me ganas, 400 pavos.']]);
    setTimeout(() => { if (active === m && step === 0) setObjective('Súbete a un coche y ve a la ' + bold('salida') + ' junto al Canarión'); }, 3000);
    const sx = NPC.canarion.road[0], sz = NPC.canarion.road[1]; const from = GRAPH.nearestNode(sx, sz); let pts = null;
    for (let k = 0; k < 40 && !pts; k++) { const a = Math.random() * Math.PI * 2, d = rnd(900, 1500); const to = GRAPH.nearestNode(sx + Math.cos(a) * d, sz + Math.sin(a) * d); const r = GRAPH.route(from, to); if (!r) continue; let L = 0; for (let i = 2; i < r.length; i += 2) L += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]); if (L > 1700 && L < 2900) { pts = r; data.L = L; } }
    if (!pts) { pts = GRAPH.route(from, GRAPH.nearestNode(sx + 900, sz + 600)) || [sx, sz, sx + 600, sz + 400]; data.L = 1500; }
    const cps = []; let acc = 0, nextAt = 300; for (let i = 2; i < pts.length; i += 2) { acc += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]); if (acc >= nextAt) { cps.push([pts[i], pts[i + 1]]); nextAt += 300; } }
    cps.push([pts[pts.length - 2], pts[pts.length - 1]]); data.cps = cps; data.start = [pts[0], pts[1]]; data.pts = pts;
    data.cum = [0]; for (let i = 2; i < pts.length; i += 2) data.cum.push(data.cum[data.cum.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
  }
  function raceCP() { const c = data.cps[data.cp]; const last = data.cp === data.cps.length - 1; goto(c[0], c[1], last ? 7 : 6, last ? 0xf5b72e : 0x46c3ff); setObjective((last ? bold('¡META!') : `Control ${data.cp + 1}/${data.cps.length - 1}`) + ' · Gánale al Canarión'); }
  function raceUpdate(m, dt) {
    if (step === 0) { if (PLAYER.car) { step = 1; goto(data.start[0], data.start[1], 5, 0x46c3ff); setObjective('Ve a la ' + bold('línea de salida')); } return; }
    if (step === 1) {
      if (!PLAYER.car) { step = 0; clearBeacon(); setObjective('Súbete a un coche'); return; }
      if (Math.hypot(PLAYER.x - data.goal[0], PLAYER.z - data.goal[1]) < 7 && PLAYER.car.speed < 2) {
        step = 2; clearBeacon(); setObjective('El Canarión se pone a tu lado... ' + bold('¡preparados!'));
        // the Canarión's car on the grid, beside you
        { const p = data.pts, dx = p[2] - p[0], dz = p[3] - p[1], L = Math.hypot(dx, dz) || 1; const ox = -dz / L * 3, oz = dx / L * 3; let rc = NPC.canarionCar; if (!rc || rc.dead || rc === PLAYER.car) { rc = new Car(null, 0xffd200, 0, 0, 0, VMODELS.guancheGT || undefined); }
          rc.mode = 'race'; rc.driver = 'race'; rc.persist = true; rc.mission = true; rc.x = p[0] + ox; rc.z = p[1] + oz; rc.h = Math.atan2(dx, dz); rc.vx = rc.vz = 0; rc.fwdV = 0; data.rival = rc; data.rs = 0; data.rv = 0; data.roff = 3; }
        ['3', '2', '1'].forEach((t, i) => setTimeout(() => { if (active === m) { HUD.big(t, '#fff', 0.8); AUDIO.cash(); } }, i * 1000));
        setTimeout(() => { if (active !== m) return; HUD.big('¡YA!', '#7fe08a', 1.2); step = 3; data.cp = 0; raceCP(); }, 3000);
      }
      return;
    }
    if (step === 3) {
      // the rival drives the route: fast on straights, brakes for bends, a little rubber band so the race stays tight
      { const rc = data.rival, p = data.pts, cum = data.cum, tot = cum[cum.length - 1]; const at = (s) => { let k = 1; while (k < cum.length - 1 && cum[k] < s) k++; const t = (s - cum[k - 1]) / ((cum[k] - cum[k - 1]) || 1); return [lerp(p[(k - 1) * 2], p[k * 2], t), lerp(p[(k - 1) * 2 + 1], p[k * 2 + 1], t), Math.atan2(p[k * 2] - p[(k - 1) * 2], p[k * 2 + 1] - p[(k - 1) * 2 + 1])]; };
        const a = at(data.rs), b = at(Math.min(tot, data.rs + 25)); const bend = Math.abs(angDiff(a[2], b[2]));
        // player progress along the route (nearest checkpoint index as a proxy)
        const pS = data.cp > 0 ? Math.min(tot, data.cp * 300) : 0; const gap = data.rs - pS;
        let vt = (bend > 1.0 ? 9 : bend > 0.5 ? 14 : bend > 0.25 ? 20 : 27) * (gap > 120 ? 0.82 : gap < -120 ? 1.18 : 1);
        data.rv = lerp(data.rv, vt, clamp(dt * (vt < data.rv ? 2.5 : 0.7), 0, 1)); data.rs = Math.min(tot, data.rs + data.rv * dt); data.roff = lerp(data.roff, 1.6, dt * 0.3);
        const q = at(data.rs), dx = Math.sin(q[2]), dz = Math.cos(q[2]); rc.x = q[0] + dz * data.roff; rc.z = q[1] - dx * data.roff; rc.h += angDiff(rc.h, q[2]) * clamp(dt * 6, 0, 1); rc.fwdV = data.rv; rc.vx = dx * data.rv; rc.vz = dz * data.rv;
        if (data.rs >= tot - 1) { if (WANTED) {} talk([['El Canarión (por el móvil)', '¡Jajaja! ¡Llegué primero, chicharrero! Te espero con las papas arrugadas... que pagas tú.']]); rc.mode = 'physics'; rc.driver = null; rc.ctl.brk = 1; fail('El Canarión ha llegado primero. ¡Revancha cuando quieras!'); return; } }
      if (!PLAYER.car) { setObjective('¡Vuelve a un coche, que el Canarión no espera!'); return; }
      const [gx, gz] = data.goal; if (Math.hypot(PLAYER.x - gx, PLAYER.z - gz) < 9) { data.cp++; AUDIO.cash(); if (data.cp >= data.cps.length) { const left = Math.round((data.cum[data.cum.length - 1] - data.rs) / Math.max(8, data.rv)); if (data.rival) { data.rival.mode = 'physics'; data.rival.driver = null; data.rival.ctl.brk = 1; }
        if (data.first) { talk([['El Canarión (por el móvil)', `¡Ños! ¿Me sacaste ${left} segundos? ¡Tú no eres de aquí, Chopa! Toma, 2.000 pavos, bien ganados.`], ['El Canarión (por el móvil)', 'Y cuando quieras revancha, ya sabes dónde estoy. Si te hace falta dinero, claro.']]); pass('Le has ganado al Canarión', 2000); }
        else { talk([['El Canarión (por el móvil)', '¡Otra vez! Me vas a arruinar, chicharrero. Toma tus 400.']]); pass('Revancha ganada', 400, true); }
        return; } raceCP(); }
    }
  }
  // a clear spot near El Blanco's home: you stand there and six cans sit on pallets 9–13 m ahead
  function findRange(x, z) {
    for (let r = 6; r < 90; r += 4) for (let k = 0; k < 16; k++) {
      const a = k / 16 * Math.PI * 2, sx = x + Math.cos(a) * r, sz = z + Math.sin(a) * r; if (inAnyBuilding(sx, sz) || onCarriageway(sx, sz, 1) || COL.nearSeg(sx, sz, 1.2)) continue;
      for (let j = 0; j < 12; j++) { const b = j / 12 * Math.PI * 2, dx = Math.cos(b), dz = Math.sin(b), D = 11, ex = sx + dx * D, ez = sz + dz * D;
        if (COL.raycast(sx, sz, ex + dx * 2, ez + dz * 2) < 1 || inAnyBuilding(ex, ez) || onCarriageway(ex, ez, 2) || Math.abs(heightAt(ex, ez) - heightAt(sx, sz)) > 2.5) continue;
        const px = -dz, pz = dx; let ok = true; for (const s of [-2.2, 2.2]) if (COL.raycast(sx, sz, ex + px * s, ez + pz * s) < 1) ok = false; if (!ok) continue;
        // pallets + cans
        const g = new THREE.Group(); const wood = M(0x9b7a4f, 0.9); const y0 = heightAt(ex, ez);
        for (const s of [-1.6, 0, 1.6]) { const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 0.8), wood); p.position.set(ex + px * s, y0 + 0.425, ez + pz * s); p.rotation.y = Math.atan2(dx, dz); p.castShadow = true; g.add(p); }
        scene.add(g); COL.addSeg(ex + px * 2.3, ez + pz * 2.3, ex - px * 2.3, ez - pz * 2.3);
        const cans = []; for (let i = 0; i < 6; i++) { const s = -2.0 + i * 0.8; cans.push([ex + px * s - dx * 0.1, y0 + 0.93, ez + pz * s - dz * 0.1]); }
        return { stand: [sx, sz], cans, side: [px, pz] };
      }
    }
    const ex = x + 10, ez = z; const y0 = heightAt(ex, ez); return { stand: [x, z], cans: [0, 1, 2, 3, 4, 5].map((i) => [ex, y0 + 1, ez - 2 + i * 0.8]), side: [0, 1] };
  }
  // ===== repeatable side job: the Canarión's rematch, only while you're short of money for Sastrón
  // side track: the Canarión's race is optional (the recommended way to get Sastrón's money), then rematches
  const SIDE = [{
      title: 'Carrera con el Canarión', who: 'el Canarión',
      hint() { return 'Busca al ' + bold('Canarión') + ' en la ' + bold('Avenida de La Trinidad'); },
      startPos() { return [NPC.canarion.x + 1.4, NPC.canarion.z + 1.4]; },
      start() { startRace(this, true); },
      update(dt) { raceUpdate(this, dt); },
      nextCP() { raceCP(); },
    },
    { title: 'Revancha con el Canarión', who: 'el Canarión', startPos() { return [NPC.canarion.x + 1.4, NPC.canarion.z + 1.4]; }, start() { startRace(this, false); }, update(dt) { raceUpdate(this, dt); } }];
  const TRACKS = { story: { list: STORY, idx: 0, beacon: null, color: 0xf5b72e, css: '#f5b72e' }, side: { list: SIDE, idx: 0, beacon: null, color: 0x5ec8ff, css: '#5ec8ff', open: false } };
  function placeStarts() {
    for (const k in TRACKS) { const tr = TRACKS[k]; if (tr.beacon) { BEACON.free(tr.beacon); tr.beacon = null; } if (active || tr.idx >= tr.list.length) continue; if (k === 'side' && (!tr.open || PLAYER.money >= SASTRON_FEE)) continue; const sp = tr.list[tr.idx].startPos(); tr.beacon = BEACON.make(sp[0], sp[1], 1.4, 3, tr.color); if (k === 'story' && !active) { const h = tr.list[tr.idx].hint; if (h) setObjective('Siguiente: ' + h()); setWaypoint(sp[0], sp[1], true); } }
    if (TRACKS.story.idx >= STORY.length && !TRACKS.story.done) { TRACKS.story.done = true; setObjective(null); HUD.big((GANG.name || 'TU BANDA').toUpperCase(), '#f5b72e', 5); HUD.toast('Ya puedes moverte libremente por La Laguna. La historia continuará…', '#f5b72e', 8); }
  }
  // interesting spots of the historic centre: Coco and Sastrón show up near two of them (random every game)
  const SPOTS = [['Catedral', 'la Catedral'], ['Teatro Leal', 'el Teatro Leal'], ['Casas Capitulares', 'las Casas Capitulares'], ['Iglesia de Santo Domingo', 'Santo Domingo'], ['Palacio Nava', 'el Palacio de Nava'], ['Casa Lercaro', 'la Casa Lercaro'], ['Santuario del Cristo', 'el Santuario del Cristo'], ['Antigua Iglesia de San Agustín', 'las ruinas de San Agustín'], ['Casa Salazar', 'la Casa Salazar'], ['Ermita de San Miguel', 'la Ermita de San Miguel'], ['Mercado de La Laguna', 'el Mercado'], ['Casa Montañés', 'la Casa Montañés'], ['Casa Ossuna', 'la Casa Ossuna']];
  function spotNear(key) {
    const b = findBuilding(key); if (!b) return null; const rd = ROADSEG.nearest(b.cx, b.cz, (r) => r[0] <= 14); if (!rd) return null;
    const dx = b.cx - rd.x, dz = b.cz - rd.z, L = Math.hypot(dx, dz) || 1; const w = DATA.R[rd.ri][2];
    for (const o of [w / 2 + 1.4, w / 2 + 0.8, -(w / 2 + 1.4)]) { const x = rd.x + dx / L * o, z = rd.z + dz / L * o; if (!inAnyBuilding(x, z) && !COL.nearSeg(x, z, 0.6)) return [x, z]; }
    return safeSpot(rd.x, rd.z, 0.6);
  }
  function mkNPC(o, x, z, extra) { const h = makeHuman(o); let [a, b] = safeSpot(x, z, 0.8);
    if (parkedNear(a, b, 4.5).length) for (let r = 3; r < 60; r += 2) { let ok = false; for (let k = 0; k < 16; k++) { const q = safeSpot(x + Math.cos(k / 16 * 6.283) * r, z + Math.sin(k / 16 * 6.283) * r, 0.8); if (!parkedNear(q[0], q[1], 4.5).length && !onCarriageway(q[0], q[1], 0.5)) { [a, b] = q; ok = true; break; } } if (ok) break; }
    const r = COL.resolve(a, b, 0.6); h.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z); h.root.rotation.y = Math.random() * 6; scene.add(h.root); if (extra) extra(h); return { x: r.x, z: r.z, H: h, home: [r.x, r.z] }; }
  // toolkit for the missions defined in other files (12f_story2.js): they are appended to STORY
  const KIT = { talk, chat, goto, clearBeacon, setObjective, pass, fail, abort, moveNPC, mkNPC, bold, CH, GANG, findRange, isActive: (m) => active === m, get data() { return data; }, setTimer(t) { timer = t; }, get timer() { return timer; } };
  return {
    kit: KIT, addStory(list) { STORY.push(...list); },
    init() {
      // Ruymán «El Blanco», at his parents' door next to the start
      { const b = makeHuman({ skin: 0xf6dcc8, shirt: 0xf4f4f4, pants: 0x9a9a9a, hair: 0x3b2a1e, shoes: 0x333333, scale: 1.09, female: false, thin: true, longPants: true, beard: false, hairStyle: 'Hair_Buzzed', hd: true, sleeve: false, glasses: 'round', belt: false, sole: 0x1a1a1a, shoes: 0x2f3b55, watch: 0x2f3a2a });
        let p = safeSpot(PLAYER.x + 4, PLAYER.z + 1.5); const r = COL.resolve(p[0], p[1], 0.5); NPC.blanco = { x: r.x, z: r.z, H: b, home: [r.x, r.z] };
        b.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z); b.root.rotation.y = Math.atan2(PLAYER.x - r.x, PLAYER.z - r.z); scene.add(b.root); }
      // Boca Papa, sitting at the foot of La Concepción's tower
      { const h = makeHuman({ skin: 0xb5815e, shirt: 0x5b5040, pants: 0x3a3328, hair: 0xa9a9a9, shoes: 0x2a2018, scale: 0.98, female: false, beard: true, sleeve: true, longPants: true, hairStyle: 'Hair_Long', hd: true, jacket: 0x5a4630, beanie: 0x6b2d2d, bag: 0x4a5a3a, sole: 0x3a3a3a, fat: true });
        h.pose = 'sit'; const box = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 0.7), M(0xa98a5a, 0.95)); box.position.set(0, -0.15, 0.45);
        // he sits on an upturned fruit crate, back against the tower
        const wood = M(0x9a7448, 0.9), dark = M(0x5e4429, 0.9); const crate = new THREE.Group();
        for (let i = 0; i < 4; i++) { const sl = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.075, 0.42), wood); sl.position.y = 0.05 + i * 0.105; crate.add(sl); }
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const po = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 0.05), dark); po.position.set(sx * 0.255, 0.21, sz * 0.185); crate.add(po); }
        crate.position.set(0, -0.12, -0.12);
        const tw = CONC_TOWER.tw; let bx = CONC_TOWER.x, bz = CONC_TOWER.z, face = Math.random() * 6;
        if (tw) { const nx = CONC_TOWER.x - tw.x, nz = CONC_TOWER.z - tw.z, nl = Math.hypot(nx, nz) || 1; bx = tw.x + nx / nl * (tw.w / 2 + 2.8); bz = tw.z + nz / nl * (tw.w / 2 + 2.8); /* outside the iron fence at the foot of the tower */ face = Math.atan2(nx, nz); }
        const sp0 = safeSpot(bx, bz, 0.6); const r = COL.resolve(sp0[0], sp0[1], 0.6); NPC.boca = { x: r.x, z: r.z, H: h, home: [r.x, r.z] }; NPC.boca.start = openSpotNear(r.x, r.z, tw ? Math.atan2(r.x - tw.x, r.z - tw.z) : 0);
        h.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z); h.root.add(box); h.root.add(crate); h.root.rotation.y = face; scene.add(h.root); COL.addCirc(r.x, r.z, 0.5); }
      // two random interesting spots of the historic centre for Coco and Sastrón
      const avail = SPOTS.map(([k, n]) => { const p = spotNear(k); return p ? { p, n } : null; }).filter(Boolean).sort(() => Math.random() - 0.5);
      const sc = avail[0] || { p: [-150, -150], n: 'el casco' }, ss = avail[1] || { p: [-200, -300], n: 'la Calle Herradores' };
      // Coco: bald ex-boxer, sleeps rough
      NPC.coco = mkNPC({ skin: 0xd9a27e, shirt: 0x7d7f6a, pants: 0x4b4a3f, hair: 0x6b5b4b, shoes: 0x3a2f25, scale: 1.0, female: false, beard: true, sleeve: true, longPants: true, hairStyle: null, hd: true, jacket: 0x5d4b3a, bag: 0x3f4c56, sole: 0x222222 }, sc.p[0], sc.p[1], (h) => {
        const cb = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.8), M(0xb08d5a, 0.95)); cb.position.set(0.9, 0.02, 0); h.root.add(cb);
        const sb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.4, 10), M(0x2f5f3a, 0.8)); sb.rotation.z = Math.PI / 2; sb.position.set(0.9, 0.22, 0.1); h.root.add(sb);
        const gl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), M(0xb3261e, 0.6)); gl.position.set(0.55, 0.06, 0.35); h.root.add(gl); const gl2 = gl.clone(); gl2.position.x = 0.7; h.root.add(gl2); }); // old boxing gloves
      NPC.coco.place = sc.n;
      // Sastrón: ex-tailor gone mad, patchwork clothes and a measuring tape
      NPC.sastron = mkNPC({ skin: 0xe2b48f, shirt: 0x8e3b8a, pants: 0x2f6f8f, hair: 0xd9d9d9, shoes: 0x7a3b1e, scale: 0.97, female: false, beard: true, sleeve: false, longPants: true, hairStyle: 'Hair_Long', hd: true, jacket: 0xc77d2a, glasses: 'round', beanie: 0x2e8b57, sole: 0xd8d8d8, bag: 0x9a2a2a }, ss.p[0], ss.p[1], (h) => {
        const tape = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.55, 0.012), M(0xf2c12e, 0.6)); tape.position.set(0.09, -0.36, 0.11); h.head.add(tape); const t2 = tape.clone(); t2.position.x = -0.09; h.head.add(t2);
        const pile = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.6), M(0x9c5ea8, 0.9)); pile.position.set(-0.9, 0.18, 0.1); h.root.add(pile);
        const dummy = new THREE.Group(); const tor = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.6, 10), M(0xe8dcc0, 0.8)); tor.position.y = 1.2; const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6), M(0x3a3a3a, 0.5)); pole.position.y = 0.45; dummy.add(tor, pole); dummy.position.set(0.9, 0, -0.2); h.root.add(dummy); });
      NPC.sastron.place = ss.n;
      // El Canarión: Gran Canaria swagger, yellow & blue, next to his car on Avenida de La Trinidad
      { const pt = centroidOfNamedWays('Avenida de La Trinidad') || [200, 600]; const rd = ROADSEG.nearest(pt[0], pt[1], (r) => r[0] <= 12 && !(r[3] & 6));
        const rx = rd ? rd.x : pt[0], rz = rd ? rd.z : pt[1]; const L = rd ? Math.hypot(rd.dx, rd.dz) || 1 : 1, ux = rd ? rd.dx / L : 1, uz = rd ? rd.dz / L : 0; const w = rd ? DATA.R[rd.ri][2] : 8;
        NPC.canarion = mkNPC({ skin: 0xc98e64, shirt: 0xffd200, pants: 0x1d4f9c, hair: 0x111111, shoes: 0xf2f2f2, scale: 1.04, female: false, beard: false, sleeve: false, longPants: true, hairStyle: 'Hair_SimpleParted', hd: true, glasses: 'sun', chain: true, watch: 0xd9b44a, sole: 0x1d4f9c }, rx - uz * (w / 2 + 3), rz + ux * (w / 2 + 3));
        NPC.canarion.road = [rx - uz * (w / 4), rz + ux * (w / 4)];
        const m = VMODELS && VMODELS.guancheGT; const cx = rx - uz * (w / 2 - 1.2) + ux * 5, cz = rz + ux * (w / 2 - 1.2) + uz * 5;
        const car = new Car(m ? null : 'sport', 0xffd200, cx, cz, Math.atan2(ux, uz), m || undefined); car.driver = null; car.mode = 'physics'; car.persist = true; car.ctl.brk = 1; NPC.canarionCar = car; }
      for (const k of ['blanco', 'coco', 'sastron', 'canarion']) COL.addCirc(NPC[k].x, NPC[k].z, 0.4);
      FOOD.init();
      if (typeof story2Init === 'function') story2Init();
      placeStarts();
    },
    update(dt) {
      for (const k of ['blanco', 'boca', 'coco', 'sastron', 'canarion', 'alcalde']) { const n = NPC[k]; if (n && n.H) animHuman(n.H, dt, 0); }
      if (NPC.blanco) NPC.blanco.H.head.rotation.y = Math.sin(performance.now() / 1300) * 0.3;
      FOOD.update(dt); if (typeof story2Tick === 'function') story2Tick(dt);
      BEACON.anim(beacon, dt); for (const k in TRACKS) BEACON.anim(TRACKS[k].beacon, dt);
      if (!active) for (const k in TRACKS) { const tr = TRACKS[k]; if (!tr.beacon || tr.idx >= tr.list.length) continue;
        if (Math.hypot(PLAYER.x - tr.beacon.position.x, PLAYER.z - tr.beacon.position.z) < 2 && !PLAYER.car && !DLG.open) { begin(tr.list[tr.idx], k); break; } }
      if (active) {
        if (timer > 0) { timer -= dt; const t = $('mtimer'); if (t) t.textContent = Math.floor(timer / 60) + ':' + String(Math.floor(timer % 60)).padStart(2, '0'); if (timer <= 0) { fail(/Canarión/.test(active.title) ? '¡El Canarión sigue siendo el más rápido! Vuelve a intentarlo.' : 'Se acabó el tiempo.'); return; } }
        if (active) active.update(dt);
      }
    },
    onEvent(t, d) { if (!active) return; if (t === 'enter' && active.gotCar) active.gotCar(); if (active.onEvent) active.onEvent(t, d); },
    wantsBottle() { return !!(active && active.wantsBottle && active.wantsBottle()); },
    target() { return active && data.goal ? data.goal : null; },
    blips() { const b = []; for (const k in TRACKS) { const tr = TRACKS[k]; if (tr.beacon) b.push([tr.beacon.position.x, tr.beacon.position.z, tr.css]); } if (active && data.goal) b.push([data.goal[0], data.goal[1], '#f5b72e']); return b; },
    prompt() { if (active || PLAYER.car) return ''; for (const k in TRACKS) { const tr = TRACKS[k]; if (tr.beacon && Math.hypot(PLAYER.x - tr.beacon.position.x, PLAYER.z - tr.beacon.position.z) < 6) return 'Acércate al círculo para hablar con ' + bold(tr.list[tr.idx].who); } return ''; },
    fail(r, noRetry) { if (active) { if (WEAPON.training) takeWeapon(); fail(r, noRetry); } },
    _story: STORY,
    _setIdx(i, track = 'story') { TRACKS[track].idx = i; placeStarts(); },
    // save / load: which missions are done, the gang, tutorial flags (a mission in progress restarts from its beginning)
    getState() { return { v: 2, story: TRACKS.story.idx, storyDone: !!TRACKS.story.done, side: TRACKS.side.idx, sideOpen: !!TRACKS.side.open, gang: { formed: GANG.formed, name: GANG.name, members: GANG.members.slice(), sastronTut: !!GANG.sastronTut, defenders: !!GANG.defenders, patrol: !!GANG.patrol }, active: active ? active.title : null }; },
    setState(st) { if (active) { try { if (WEAPON.training) takeWeapon(); } catch (e) { } finish(); }
      TRACKS.story.idx = (st.story | 0) - (!st.v && (st.story | 0) >= 3 ? 1 : 0); /* v1 saves had the Canarión race inside the story */ TRACKS.story.done = !!st.storyDone && TRACKS.story.idx >= STORY.length; /* older saves finished a shorter story: carry on with the new missions */ TRACKS.side.idx = !st.v && (st.story | 0) >= 3 ? 1 : st.side | 0; TRACKS.side.open = !!st.sideOpen;
      Object.assign(GANG, { formed: !!(st.gang && st.gang.formed), name: (st.gang && st.gang.name) || '', members: (st.gang && st.gang.members) || [], sastronTut: !!(st.gang && st.gang.sastronTut), defenders: !!(st.gang && st.gang.defenders), patrol: !!(st.gang && st.gang.patrol) });
      setObjective(null); placeStarts();
      if (st.active) setTimeout(() => HUD.toast('La misión «' + st.active + '» se guardó a medias: empieza de nuevo en su círculo', '#f5b72e', 6), 1200); },
    currentTitle() { const tr = TRACKS.story; return tr.idx < tr.list.length ? (tr.list[tr.idx].title || '') : 'Historia completada'; },
    get active() { return active; },
    get gang() { return GANG; },
  };
})();
