// ============ Diario de misiones (v0.66, tecla J) ============
// Overlay like the ones of many mission games: on the left every thread (Historia, El Canarión, El Obispo, Torneo
// Lagunero) with its missions and their state; on the right the chosen mission: who gives it, what to do next and all
// the dialogue said in it. «Reiniciar desde aquí» restarts that mission and everything after it in the same thread
// (handy for testing; asks first). The game is paused while it is open.
const DIARIO = (() => {
  let ui = null, sel = null, prev = 'play';
  const ICON = { hecha: '✔', activa: '▶', siguiente: '●', pendiente: '○' };
  const LABEL = { hecha: 'Terminada', activa: 'En curso', siguiente: 'La siguiente', pendiente: '' };
  const esc = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
  function make() {
    ui = document.createElement('div'); ui.className = 'screen'; ui.id = 'diario'; ui.style.zIndex = 41; ui.style.display = 'none';
    ui.innerHTML = `<div class="panel" style="width:min(1060px,calc(100vw - 24px));padding:18px 20px">
      <div class="logo" style="font-size:34px;text-align:center;margin-bottom:6px"><span class="g">DIARIO</span></div>
      <div style="display:flex;gap:16px;align-items:stretch;min-height:0">
        <div id="diaList" style="flex:0 0 40%;max-height:62vh;overflow:auto;padding-right:6px"></div>
        <div id="diaDet" style="flex:1;max-height:62vh;overflow:auto;background:rgba(0,0,0,.28);border-radius:8px;padding:12px 14px"></div>
      </div>
      <div style="text-align:center;margin-top:10px"><button class="btn sec" id="diaClose">CERRAR (J)</button></div></div>`;
    document.body.appendChild(ui); ui.querySelector('#diaClose').onclick = close;
  }
  // v0.82.1 (Jonay): everything they tell you on the phone also goes in the diary, each with its own entry («Lo que
  // sabes»: who told you, what it is, where); and what you can't get to yet isn't shown at all (no «aún no», no
  // pending missions with their names): the diary fills up as things open
  const G = () => window.GANG || {}, ARC = () => (typeof ARCADE !== 'undefined' ? ARCADE.data() : {});
  const BL = 'Rayco «El Blanco», por el móvil', REC = 'Las recreativas';
  const SABES = [
    { t: 'Maleantes en busca y captura', on: () => G().maleIntro, who: 'Sastrón, por el móvil', log: 'Maleantes en busca y captura',
      what: 'La Policía Local paga una recompensa por cada maleante que le entregues. Cuando hay uno cerca sale en el minimapa como un <b>triángulo rojo</b>: vas, le das una buena tunda (pelea, como siempre) y cobras. Pegan más fuerte que la gente normal; cuanto más nivel, más pagan ($150, $300 o $600). Si te gana, sigue marcado un rato: vuelve a por él.',
      where: 'Por la calle, cuando sale el triángulo rojo en el minimapa.' },
    { t: 'La máquina de El Blanco: BENCOMO', on: () => ARC().invited, who: BL, log: REC, rec: ['blanco', 'bencomo'], near: () => ({ name: 'Casa de El Blanco', x: RECRE.DOOR[0], z: RECRE.DOOR[1], d: Math.hypot(RECRE.DOOR[0] - PLAYER.x, RECRE.DOOR[1] - PLAYER.z) }),
      what: 'Una recreativa de las de antes en su casa: <b>«Bencomo, Acentejo\'s Revenge»</b>, plataformas con el mencey de Taoro contra los castellanos. Gratis y cuando quieras: no es una misión.',
      where: 'Casa de El Blanco: la entrada del Edificio Casa del Blanco, en Teobaldo Power (cuadrado naranja en el minimapa). Pulsa E en la puerta.' },
    { t: 'GUFO, AGUERE INVASION', on: () => ARC().invited, who: BL, log: REC, near: () => nearBar(),
      what: 'La máquina de los bares (GUFO: Guanche Unknown Flying Object… y en canario, un pedo): un matamarcianos de naves por el cielo de Aguere, el Teide y el mar de nubes. A dispara (mantenlo para el disparo cargado), B lanza y recoge el módulo y Q coge la mejora marcada. <b>$1 la partida</b>; cada bar tiene sus récords.',
      where: 'En las cafeterías y las tascas: en el minimapa y en el mapa (M) llevan un aro violeta alrededor de su cuadrado rojo. Pídela en la barra o en el mostrador (E).' },
    { t: 'GUANCHE WARRIORS', on: () => ARC().invited && G().jugueterias, who: BL, log: REC, near: () => AGUA.nearestShop(),
      what: 'La máquina de las jugueterías: un beat\'em up contra Guayota. Eliges al Mencey, al Pastor o a la Mirladora. A pega, B salta (y monta el lagarto), Q lanza la magia; doble toque para correr. <b>$1 la partida</b>; cada tienda tiene sus récords.',
      where: 'En las jugueterías: el robot del minimapa y del mapa (M). Pídela en la tienda (E).', icon: 'toy' },
    { t: 'Las jugueterías', on: () => G().jugueterias, who: '', log: '', near: () => AGUA.nearestShop(),
      what: 'Venden el <b>rifle de agua</b> «Guepardo SK-9» y las bolitas para la pistola, y te llenan el rifle del grifo.', where: 'El robot del minimapa y del mapa (M): E en la puerta.', icon: 'toy' },
    { t: 'Retos en las canchas', on: () => G().basketTut, who: 'El Obispo', log: '',
      what: 'Puedes retar a la gente a un partido de baloncesto en cualquier cancha.', where: 'Cualquier cancha de baloncesto: pulsa E en la puerta o junto a la canasta.' },
    { t: 'Retos en los campos de fútbol', on: () => G().futbolTut, who: 'El Obispo', log: '',
      what: 'Puedes retar a la gente a un partido de fútbol en cualquier campo.', where: 'Cualquier campo de fútbol: el balón blanco (E).' },
    { t: 'La inmobiliaria Pisos Chachi', on: () => typeof CASA !== 'undefined' && CASA.data().intro, who: 'Pisos Chachi, por el móvil', log: 'La inmobiliaria', near: () => (CASA.inmo ? { name: CASA.INMO.name, x: CASA.inmo.x, z: CASA.inmo.z, d: Math.hypot(CASA.inmo.x - PLAYER.x, CASA.inmo.z - PLAYER.z) } : null),
      what: 'Alquilan y venden pisos. {PISOS}. En casa: la cama (duermes y se guarda la partida) y la tele, para la consola.',
      where: 'En la Calle Heraclio Sánchez: la casita naranja del minimapa y del mapa (M). E en la puerta.', icon: 'house' },
    { t: 'Tu casa', on: () => typeof CASA !== 'undefined' && CASA.ownsAny(), who: '', log: '', near: () => { let b = null; for (const h of CASA.homesOwned()) { const d = Math.hypot(h.x - PLAYER.x, h.z - PLAYER.z); if (!b || d < b.d) b = { ...h, d }; } return b; },
      what: 'Tus pisos: <b>' + '{HOMES}' + '</b>. Dentro: la cama (duermes hasta las 8 y se guarda la partida) y la tele, con la consola si la tienes.', where: 'Con tu cara en el minimapa y en el mapa (M).', icon: 'chopa' },
    { t: 'La consola GOFIO-8', on: () => ARC().console, who: '', log: '', near: () => AGUA.nearestShop(),
      what: 'La consola de la tele de tu casa. Al encenderla sale un menú con tus cartuchos: <b>{CARTS}</b>. Los cartuchos se compran en las jugueterías.', where: 'En la tele de tu casa (E delante de la tele). La juguetería más cercana, abajo.' },
    { t: 'El coche patrulla de la banda', on: () => G().patrol, who: 'El alcalde, por el móvil', log: '',
      what: 'Vuestro propio coche patrulla, con el nombre de la banda y el depósito lleno.', where: 'Delante del Ayuntamiento.' },
  ];
  function nearBar() { let b = null, bd = 1e9; for (const f of FOOD.shops) { if (f.type !== 'C' && f.type !== 'R') continue; const d = Math.hypot(f.x - PLAYER.x, f.z - PLAYER.z); if (d < bd) { bd = d; b = f; } } return b ? { name: b.name, x: b.x, z: b.z, d: bd } : null; }
  const known = () => SABES.map((f, i) => ({ f, i })).filter(({ f }) => { try { return !!f.on(); } catch (e) { return false; } });
  function render() {
    const tracks = MISSIONS.diary().filter((t) => !t.locked).map((t) => ({ ...t, vis: t.list.map((m, i) => ({ m, i })).filter(({ m }) => m.state !== 'pendiente') })).filter((t) => t.vis.length);
    const item = (k, i, txt, col, on) => `<div class="diaItem" data-k="${k}" data-i="${i}" style="cursor:pointer;padding:5px 8px;border-radius:6px;margin:1px 0;font:400 14px Barlow,sans-serif;color:${col};background:${on ? 'rgba(255,111,184,.28)' : 'transparent'}">${txt}</div>`;
    const head = (txt, col) => `<div style="margin:6px 0 2px;font:400 15px Audiowide,Oswald,sans-serif;color:${col}">${esc(txt)}</div>`;
    const kn = known();
    // first entry: every conversation of the game, newest first (v0.75); then what you know; then the missions
    ui.querySelector('#diaList').innerHTML = `<div class="diaItem" data-k="__all" data-i="0" style="cursor:pointer;padding:6px 8px;border-radius:6px;margin:0 0 4px;font:400 15px Audiowide,Oswald,sans-serif;color:#ffd27a;background:${sel && sel.k === '__all' ? 'rgba(255,111,184,.28)' : 'transparent'}">💬 Todas las conversaciones</div>` +
      (kn.length ? head('Lo que sabes', '#9fd7ff') + kn.map(({ f, i }) => item('__f', i, `<span style="display:inline-block;width:18px;color:#9fd7ff">${f.icon && window.__mapIconURL ? `<img src="${window.__mapIconURL(f.icon)}" style="width:15px;height:15px;vertical-align:-3px">` : '★'}</span>${esc(f.t)}`, '#fff', sel && sel.k === '__f' && sel.i === i)).join('') : '') +
      tracks.map((t) => head(t.name, t.css) + t.vis.map(({ m, i }) => item(t.key, i, `<span style="display:inline-block;width:18px;color:${m.state === 'hecha' ? '#7fe08a' : m.state === 'activa' ? '#ffd400' : t.css}">${ICON[m.state]}</span>${esc(m.title)}`, '#fff', sel && sel.k === t.key && sel.i === i)).join('')).join('');
    ui.querySelectorAll('.diaItem').forEach((el) => el.onclick = () => { sel = { k: el.dataset.k, i: +el.dataset.i }; render(); });
    const det = ui.querySelector('#diaDet');
    if (!sel) { const t = tracks.find((q) => q.key === 'story'); const v = t ? t.vis.find(({ m }) => m.state === 'activa' || m.state === 'siguiente') || t.vis[t.vis.length - 1] : null; sel = v ? { k: 'story', i: v.i } : { k: '__all', i: 0 }; return render(); }
    const line = (who, tx) => `<p style="margin:0 0 6px">${who ? `<b style="color:#ffd27a">${esc(who)}:</b> ` : ''}${tx}</p>`;
    const convo = (log, empty) => `<div style="font:400 15px Barlow,sans-serif;line-height:1.35">${log.length ? '<div style="color:#8f8a9a;font-size:13px;margin-bottom:4px">De lo más reciente a lo primero</div>' + log.map(([who, tx]) => line(who, tx)).join('') : empty}</div>`;
    if (sel.k === '__all') { const all = MISSIONS.logAll(); let cur = null;
      det.innerHTML = `<div style="font:400 22px Audiowide,Oswald,sans-serif;color:#ffd27a">Conversaciones</div><div style="color:#bdb6c9;margin:2px 0 8px;font:400 14px Barlow,sans-serif">De la más reciente a la primera</div><div style="font:400 15px Barlow,sans-serif;line-height:1.35">` +
        (all.length ? all.map(([who, tx, , title]) => (title !== cur ? `<div style="margin:10px 0 4px;color:#9fd7ff;font:400 13px Audiowide,Oswald,sans-serif">${esc(cur = title)}</div>` : '') + line(who, tx)).join('') : '<p style="color:#8f8a9a">Todavía no te ha contado nada nadie.</p>') + '</div>';
      return; }
    if (sel.k === '__f') { const f = SABES[sel.i]; if (!f || !f.on()) { sel = null; return render(); }
      let rec = ''; if (f.rec && typeof ARCADE !== 'undefined' && ARCADE.GAMES[f.rec[1]]) { const t = ARCADE.table(f.rec[0], ARCADE.GAMES[f.rec[1]]); rec = `<div style="margin:0 0 8px;font:400 15px Barlow,sans-serif">🏆 Récord de la máquina: <b>${esc(t[0][0])}</b> · ${t[0][1]}</div>`; }
      let nr = '', nq = null; try { nq = f.near ? f.near() : null; } catch (e) { nq = null; }
      if (nq) nr = `<div style="margin:0 0 8px;font:400 15px Barlow,sans-serif">🧭 La más cerca: <b>${esc(nq.name)}</b>, a ${Math.round(nq.d)} m <button class="btn" id="diaGps" style="font-size:13px;padding:5px 12px;margin-left:8px">MARCAR EN EL GPS</button></div>`;
      det.innerHTML = `<div style="font:400 22px Audiowide,Oswald,sans-serif;color:#9fd7ff">${esc(f.t)}</div>
        <div style="color:#bdb6c9;margin:2px 0 8px;font:400 14px Barlow,sans-serif">${f.who ? 'Te lo contó ' + esc(f.who) : 'Lo que sabes'}</div>
        <div style="margin-bottom:8px;font:400 15px Barlow,sans-serif;line-height:1.35">${f.what.replace('{HOMES}', () => (typeof CASA !== 'undefined' ? CASA.PISOS.filter((P) => CASA.has(P.id)).map((P) => P.name + (P.rent ? ' (alquilado ' + Math.max(0, CASA.data().rent.until - CASA.data().day) + ' días más)' : '')).join(', ') : '')).replace('{PISOS}', () => CASA.PISOS.map((P) => `<b>${P.name}</b>: ${P.rent ? '$' + P.rent + ' a la semana' : '$' + P.price.toLocaleString('es-ES')}`).join(' · ')).replace('{CARTS}', () => (ARC().bought || []).filter((id) => ARCADE.GAMES[id]).map((id) => ARCADE.GAMES[id].title).join(', ') || 'ninguno todavía')}</div>
        <div style="margin-bottom:8px;font:400 15px Barlow,sans-serif">${f.icon && window.__mapIconURL ? `<img src="${window.__mapIconURL(f.icon)}" style="width:22px;height:22px;vertical-align:-6px;margin-right:4px">` : '📍'} ${f.where}</div>${rec}${nr}
        ${f.log ? convo(MISSIONS.log(f.log), '') : ''}`;
      const gb = det.querySelector('#diaGps'); if (gb && nq) gb.onclick = () => { setWaypoint(nq.x, nq.z); HUD.toast('Ruta marcada en el GPS: ' + nq.name, '#e040fb', 4); close(); };
      return; }
    const t = tracks.find((q) => q.key === sel.k), m = t && t.list[sel.i]; if (!m || m.state === 'pendiente') { sel = null; return render(); }
    const log = MISSIONS.log(m.title);
    det.innerHTML = `<div style="font:400 22px Audiowide,Oswald,sans-serif;color:${t.css}">${esc(m.title)}</div>
      <div style="color:#bdb6c9;margin:2px 0 8px;font:400 14px Barlow,sans-serif">${esc(t.name)} · ${m.who ? 'Te la da ' + esc(m.who) + ' · ' : ''}<b style="color:${m.state === 'hecha' ? '#7fe08a' : m.state === 'activa' ? '#ffd400' : '#fff'}">${LABEL[m.state]}</b></div>
      ${m.hint ? `<div style="margin-bottom:8px;font:400 15px Barlow,sans-serif">➜ ${m.hint}</div>` : ''}
      ${convo(log, `<p style="color:#8f8a9a">${m.state === 'hecha' ? 'Esta misión se terminó en una partida de antes de que el diario guardara las conversaciones: si la repites («Reiniciar desde aquí») quedarán aquí.' : 'Todavía no has hablado de esta misión.'}</p>`)}
      <div style="margin-top:10px"><button class="btn" id="diaReset" style="font-size:15px;padding:8px 16px">REINICIAR DESDE AQUÍ</button>
      <span style="color:#8f8a9a;font:400 13px Barlow,sans-serif;margin-left:8px">vuelve a esta misión y todo lo que va detrás en «${esc(t.name)}»</span></div>`;
    det.querySelector('#diaReset').onclick = () => { if (!confirmReset(m.title)) return; MISSIONS.resetFrom(sel.k, sel.i); HUD.toast('Reiniciado desde «' + m.title + '»', t.css, 4); render(); };
  }
  function confirmReset(title) { const b = ui.querySelector('#diaReset'); if (b.dataset.sure) return true; b.dataset.sure = '1'; b.textContent = '¿SEGURO? PULSA OTRA VEZ'; setTimeout(() => { if (b.isConnected) { delete b.dataset.sure; b.textContent = 'REINICIAR DESDE AQUÍ'; } }, 3000); return false; }
  function open() { if (!ui) make(); if (GAME.state !== 'play') return; prev = GAME.state; GAME.state = 'diary'; document.exitPointerLock?.(); sel = null; render(); ui.style.display = 'flex'; }
  function close() { if (!ui || ui.style.display === 'none') return; ui.style.display = 'none'; GAME.state = 'play'; GAME.lock(); }
  window.addEventListener('keydown', (e) => {
    const isOpen = ui && ui.style.display !== 'none';
    if (isOpen && (CONTROLS.codes('diary').includes(e.code) || e.code === 'Escape')) { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (!isOpen && CONTROLS.codes('diary').includes(e.code) && GAME.state === 'play' && !(typeof DLG !== 'undefined' && DLG.open)) { e.preventDefault(); open(); }
  }, true);
  return { open, close, known: () => known().map(({ f }) => f.t), get open_() { return !!ui && ui.style.display !== 'none'; } };
})();
