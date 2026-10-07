// ============ configurable controls: every action keeps its default keys and can get one extra key of your choice ============
// The game code keeps asking for the default key codes; CONTROLS.alias(code) turns a pressed alternative key into the
// default codes it stands for. Saved in localStorage ('jeta_controls').
const CONTROLS = (() => {
  const A = (id, label, group, def) => ({ id, label, group, def, alt: null });
  const list = [
    A('fwd', 'Avanzar / acelerar', 'Juego', ['KeyW', 'ArrowUp']), A('back', 'Retroceder / frenar', 'Juego', ['KeyS', 'ArrowDown']),
    A('left', 'Izquierda', 'Juego', ['KeyA', 'ArrowLeft']), A('right', 'Derecha', 'Juego', ['KeyD', 'ArrowRight']),
    A('run', 'Correr', 'Juego', ['ShiftLeft']), A('walk', 'Andar despacio', 'Juego', ['KeyC', 'AltLeft']), A('jump', 'Saltar / freno de mano', 'Juego', ['Space']),
    A('punch', 'Puñete (a pie) · cambiar radio (en coche)', 'Juego', ['KeyQ']), A('car', 'Entrar / salir del coche', 'Juego', ['KeyF']), A('use', 'Usar / entrar en edificios', 'Juego', ['KeyE']),
    A('horn', 'Claxon', 'Juego', ['KeyH']), A('flip', 'Enderezar coche', 'Juego', ['KeyR']), A('map', 'Mapa (GPS)', 'Juego', ['KeyM']), A('weap', 'Cambiar arma', 'Juego', ['Tab']),
    A('pause', 'Pausa', 'Juego', ['KeyP', 'Escape']),
    A('f_punch', 'Puñetazo', 'Pelea', ['KeyJ', 'KeyU', 'ShiftRight']), A('f_kick', 'Patada', 'Pelea', ['KeyK', 'KeyI', 'ControlRight']), A('f_block', 'Cubrirse (siempre)', 'Pelea', ['KeyL']),
  ];
  const NOTES = { Juego: 'Ratón: mirar · clic izq.: puñete / disparar · clic dcho.: apuntar · rueda: zoom', Pelea: 'Moverse con A/D o ←/→; atrás = andar hacia atrás y se cubre solo si el rival ataca. Especiales: atrás, adelante + puñetazo = Bola de gofio; atrás, adelante + patada = Patada del Teide (avanza girando, 3 patadas); abajo, arriba (W/↑) + puñetazo = Gancho del Roque; abajo, arriba + patada = Salto del Pastor. Espacio: saltar. Ratón: clic izq. puñetazo, dcho. patada.' };
  try { const s = JSON.parse(localStorage.getItem('jeta_controls') || '{}'); for (const a of list) if (s[a.id]) a.alt = s[a.id]; } catch (e) { }
  const save = () => { try { const o = {}; for (const a of list) if (a.alt) o[a.id] = a.alt; localStorage.setItem('jeta_controls', JSON.stringify(o)); } catch (e) { } };
  const alias = (code) => { const out = []; for (const a of list) if (a.alt === code) out.push(a.def[0]); return out; };
  const nice = (c) => !c ? '—' : c.replace(/^Key/, '').replace(/^Digit/, '').replace('ArrowUp', '↑').replace('ArrowDown', '↓').replace('ArrowLeft', '←').replace('ArrowRight', '→').replace('ShiftLeft', 'Shift izq.').replace('ShiftRight', 'Shift dcho.').replace('ControlRight', 'Ctrl dcho.').replace('ControlLeft', 'Ctrl izq.').replace('AltLeft', 'Alt').replace('Space', 'Espacio').replace('Escape', 'Esc');
  let ui = null, waiting = null;
  function render() {
    const rows = (g) => list.filter((a) => a.group === g).map((a) => `<tr><td>${a.label}</td><td>${a.def.map((c) => `<kbd>${nice(c)}</kbd>`).join(' ')}</td><td><button class="ctlb" data-id="${a.id}">${waiting === a.id ? 'Pulsa una tecla…' : a.alt ? nice(a.alt) : '+ añadir'}</button></td></tr>`).join('');
    ui.querySelector('#ctlBody').innerHTML = ['Juego', 'Pelea'].map((g) => `<tr><th colspan="3">${g === 'Juego' ? 'EN LA CALLE' : 'PELEA 2D'}</th></tr>${rows(g)}<tr><td colspan="3" class="ctln">${NOTES[g]}</td></tr>`).join('');
    ui.querySelectorAll('.ctlb').forEach((b) => b.onclick = (e) => { e.stopPropagation(); waiting = b.dataset.id; render(); });
  }
  function open() {
    if (!ui) { ui = document.createElement('div'); ui.className = 'screen'; ui.id = 'ctlScreen'; ui.style.zIndex = 40;
      ui.innerHTML = `<div class="panel" style="width:min(900px,calc(100vw - 32px))"><div class="logo" style="font-size:40px;text-align:center"><span class="g">CONTROLES</span></div>
        <p class="credits" style="text-align:center">Cada acción conserva sus teclas de siempre; pulsa en la última columna para añadirle otra tecla (Supr o Retroceso la quita).</p>
        <table class="ctlt"><tbody id="ctlBody"></tbody></table><div style="text-align:center;margin-top:12px"><button class="btn sec" id="ctlReset">RESTABLECER</button><button class="btn" id="ctlClose">LISTO</button></div></div>`;
      document.body.appendChild(ui); ui.querySelector('#ctlClose').onclick = () => { waiting = null; ui.style.display = 'none'; }; ui.querySelector('#ctlReset').onclick = () => { for (const a of list) a.alt = null; save(); render(); };
      window.addEventListener('keydown', (e) => { if (!ui || ui.style.display === 'none') return; if (!waiting) { if (e.code === 'Escape') ui.style.display = 'none'; return; } e.preventDefault(); e.stopImmediatePropagation();
        const a = list.find((q) => q.id === waiting); if (e.code === 'Escape') { waiting = null; render(); return; } a.alt = e.code === 'Delete' || e.code === 'Backspace' ? null : e.code; waiting = null; save(); render(); }, true); }
    ui.style.display = 'flex'; render();
  }
  return { list, alias, open, nice, get open_() { return ui && ui.style.display !== 'none'; } };
})();
