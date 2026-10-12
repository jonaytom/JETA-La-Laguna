// ============ Diario de misiones (v0.66, tecla J) ============
// Overlay like the ones of many mission games: on the left every thread (Historia, El Canarión, El Obispo, Torneo
// Lagunero) with its missions and their state; on the right the chosen mission: who gives it, what to do next and all
// the dialogue said in it. «Reiniciar desde aquí» restarts that mission and everything after it in the same thread
// (handy for testing; asks first). The game is paused while it is open.
const DIARIO = (() => {
  let ui = null, sel = null, prev = 'play';
  const ICON = { hecha: '✔', activa: '▶', siguiente: '●', pendiente: '○' };
  const LABEL = { hecha: 'Terminada', activa: 'En curso', siguiente: 'La siguiente', pendiente: 'Pendiente' };
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
  function render() {
    const tracks = MISSIONS.diary();
    ui.querySelector('#diaList').innerHTML = tracks.map((t) => `<div style="margin:6px 0 2px;font:400 15px Audiowide,Oswald,sans-serif;color:${t.css}">${esc(t.name)}${t.locked ? ' <span style="color:#999;font-size:12px">(aún no)</span>' : ''}</div>` +
      t.list.map((m, i) => `<div class="diaItem" data-k="${t.key}" data-i="${i}" style="cursor:pointer;padding:5px 8px;border-radius:6px;margin:1px 0;font:400 14px Barlow,sans-serif;color:${m.state === 'pendiente' ? '#8f8a9a' : '#fff'};background:${sel && sel.k === t.key && sel.i === i ? 'rgba(255,111,184,.28)' : 'transparent'}">
        <span style="display:inline-block;width:18px;color:${m.state === 'hecha' ? '#7fe08a' : m.state === 'activa' ? '#ffd400' : t.css}">${ICON[m.state]}</span>${esc(m.title)}</div>`).join('')).join('');
    ui.querySelectorAll('.diaItem').forEach((el) => el.onclick = () => { sel = { k: el.dataset.k, i: +el.dataset.i }; render(); });
    const det = ui.querySelector('#diaDet');
    if (!sel) { const t = tracks.find((q) => q.key === 'story'); const i = t.list.findIndex((m) => m.state === 'activa' || m.state === 'siguiente'); sel = { k: 'story', i: Math.max(0, i) }; return render(); }
    const t = tracks.find((q) => q.key === sel.k), m = t && t.list[sel.i]; if (!m) { det.innerHTML = ''; return; }
    const log = MISSIONS.log(m.title);
    det.innerHTML = `<div style="font:400 22px Audiowide,Oswald,sans-serif;color:${t.css}">${esc(m.title)}</div>
      <div style="color:#bdb6c9;margin:2px 0 8px;font:400 14px Barlow,sans-serif">${esc(t.name)} · ${m.who ? 'Te la da ' + esc(m.who) + ' · ' : ''}<b style="color:${m.state === 'hecha' ? '#7fe08a' : m.state === 'activa' ? '#ffd400' : '#fff'}">${LABEL[m.state]}</b></div>
      ${m.hint ? `<div style="margin-bottom:8px;font:400 15px Barlow,sans-serif">➜ ${m.hint}</div>` : ''}
      <div style="font:400 15px Barlow,sans-serif;line-height:1.35">${log.length ? log.map(([who, tx]) => `<p style="margin:0 0 6px">${who ? `<b style="color:#ffd27a">${esc(who)}:</b> ` : ''}${tx}</p>`).join('') : '<p style="color:#8f8a9a">Aún no hay conversaciones de esta misión.</p>'}</div>
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
  return { open, close, get open_() { return !!ui && ui.style.display !== 'none'; } };
})();
