// ============ configurable controls: every action keeps its default keys and can get one extra key of your choice ============
// The game code keeps asking for the default key codes; CONTROLS.alias(code) turns a pressed alternative key into the
// default codes it stands for. Saved in localStorage ('jeta_controls').
const CONTROLS = (() => {
  const A = (id, label, group, def) => ({ id, label, group, def, alt: null });
  const list = [
    A('fwd', 'Avanzar / acelerar', 'Juego', ['KeyW', 'ArrowUp']),
    A('back', 'Retroceder / frenar', 'Juego', ['KeyS', 'ArrowDown']),
    A('left', 'Izquierda', 'Juego', ['KeyA', 'ArrowLeft']),
    A('right', 'Derecha', 'Juego', ['KeyD', 'ArrowRight']),
    A('run', 'Correr', 'Juego', ['ShiftLeft']),
    A('walk', 'Andar despacio', 'Juego', ['KeyC', 'AltLeft']),
    A('jump', 'Saltar / freno de mano', 'Juego', ['Space']),
    A('punch', 'Puñete (a pie) · cambiar radio (en coche)', 'Juego', ['KeyQ']),
    A('car', 'Entrar / salir del coche', 'Juego', ['KeyF']),
    A('use', 'Usar / entrar en edificios', 'Juego', ['KeyE']),
    A('horn', 'Claxon', 'Juego', ['KeyH']),
    A('flip', 'Enderezar coche', 'Juego', ['KeyR']),
    A('map', 'Mapa (GPS)', 'Juego', ['KeyM']),
    A('diary', 'Diario de misiones', 'Juego', ['KeyJ']),
    A('guide', 'Mostrar / ocultar la brújula', 'Juego', ['KeyG']),
    A('weap', 'Cambiar arma', 'Juego', ['Tab']),
    A('pause', 'Pausa', 'Juego', ['KeyP', 'Escape']),
    // v0.64 (Jonay): in the 2D fight the same hand as on the street: E punch, Space kick, ↑ / W jump (+ mouse buttons)
    // v0.65 (Jonay): every minigame uses the same keys: A = E / left click, B = Espacio, ↑ = up/jump, right click
    A('f_punch', 'Botón A · pelea: puñetazo · baloncesto: tirar (mantener y soltar a tiempo) · fútbol: chutar / entrada', 'Pelea', ['KeyE']),
    A('f_kick', 'Botón B · pelea: patada · baloncesto y fútbol: correr (turbo)', 'Pelea', ['Space']),
    A('f_jump', 'Arriba · pelea: saltar', 'Pelea', ['ArrowUp', 'KeyW']),
    A('b_pass', 'Baloncesto y fútbol: pasar / robar / cambiar de jugador (también clic derecho)', 'Pelea', ['KeyQ'])
  ];
  const NOTES = {
    Juego: 'Ratón: mirar · a pie, clic izq. golpea o dispara al apuntar con clic dcho. · al volante, clic izq. / dcho. cambia de canción · rueda: zoom',
    Pelea:
      'Moverse con A/D o ←/→; atrás = andar hacia atrás y se cubre solo si el rival ataca. Especiales: atrás, adelante + puñetazo = Bola de gofio; atrás, adelante + patada = Patada del Teide (avanza girando, 3 patadas); abajo, arriba + puñetazo = Gancho del Roque; abajo, arriba + patada = Salto del Pastor. Ratón: clic izq. puñetazo, dcho. patada. Baloncesto: mantén A (clic izq. / E) para tirar y suéltalo con la barra en verde; clic dcho. (o Q) pasar / robar; B (Espacio) correr. Corriendo y tirando desde media distancia: ENTRADA EN COMBO (los mismos 4 especiales, un mate distinto cada uno).'
  };
  try {
    const s = JSON.parse(localStorage.getItem('jeta_controls') || '{}');
    for (const a of list) if (s[a.id]) a.alt = s[a.id];
  } catch (e) {}
  const save = () => {
    try {
      const o = {};
      for (const a of list) if (a.alt) o[a.id] = a.alt;
      localStorage.setItem('jeta_controls', JSON.stringify(o));
    } catch (e) {}
  };
  const alias = (code) => {
    const out = [];
    for (const a of list) if (a.alt === code && a.group === 'Juego') out.push(a.def[0]);
    return out;
  }; // fight keys are read by FIGHT2D itself
  const nice = (c) =>
    !c
      ? '—'
      : c
          .replace(/^Key/, '')
          .replace(/^Digit/, '')
          .replace('ArrowUp', '↑')
          .replace('ArrowDown', '↓')
          .replace('ArrowLeft', '←')
          .replace('ArrowRight', '→')
          .replace('ShiftLeft', 'Shift izq.')
          .replace('ShiftRight', 'Shift dcho.')
          .replace('ControlRight', 'Ctrl dcho.')
          .replace('ControlLeft', 'Ctrl izq.')
          .replace('AltLeft', 'Alt')
          .replace('Space', 'Espacio')
          .replace('Escape', 'Esc');
  let ui = null,
    waiting = null;
  function render() {
    const rows = (g) =>
      list
        .filter((a) => a.group === g)
        .map(
          (a) =>
            `<tr><td>${a.label}</td><td>${a.def.map((c) => `<kbd>${nice(c)}</kbd>`).join(' ')}</td><td><button class="ctlb" data-id="${a.id}">${waiting === a.id ? 'Pulsa una tecla…' : a.alt ? nice(a.alt) : '+ añadir'}</button></td></tr>`
        )
        .join('');
    const medium = controlMedium();
    const body = ui.querySelector('#ctlBody');
    ui.querySelector('#ctlReset').hidden = medium !== 'keyboard';
    ui.querySelector('#ctlIntro').hidden = medium !== 'keyboard';
    if (medium !== 'keyboard') {
      const guide = medium === 'pad' ? PAD_HELP : TOUCH_HELP;
      body.innerHTML = guide.map(([title, notes]) => `<tr><th>${title}</th></tr><tr><td class="ctln">${notes}</td></tr>`).join('');
      return;
    }
    body.innerHTML = ['Juego', 'Pelea']
      .map(
        (g) =>
          `<tr><th colspan="3">${g === 'Juego' ? 'EN LA CALLE' : 'MINIJUEGOS (pelea 2D, baloncesto…)'}</th></tr>${rows(g)}<tr><td colspan="3" class="ctln">${NOTES[g]}</td></tr>`
      )
      .join('');
    ui.querySelectorAll('.ctlb').forEach(
      (b) =>
        (b.onclick = (e) => {
          e.stopPropagation();
          waiting = b.dataset.id;
          render();
        })
    );
  }
  function open() {
    if (!ui) {
      ui = document.createElement('div');
      ui.className = 'screen';
      ui.id = 'ctlScreen';
      ui.style.zIndex = 40;
      ui.innerHTML = `<div class="panel" style="width:min(900px,calc(100vw - 32px))"><div class="logo" style="font-size:40px;text-align:center"><span class="g">CONTROLES</span></div>
        <p id="ctlIntro" class="credits" style="text-align:center">Cada acción conserva sus teclas de siempre; pulsa en la última columna para añadirle otra tecla (Supr o Retroceso la quita).</p>
        <table class="ctlt"><tbody id="ctlBody"></tbody></table><div style="text-align:center;margin-top:12px"><button class="btn sec" id="ctlReset">RESTABLECER</button><button class="btn" id="ctlClose">LISTO</button></div></div>`;
      document.body.appendChild(ui);
      ui.querySelector('#ctlClose').onclick = () => {
        waiting = null;
        ui.style.display = 'none';
      };
      ui.querySelector('#ctlReset').onclick = () => {
        for (const a of list) a.alt = null;
        save();
        render();
      };
      window.addEventListener(
        'keydown',
        (e) => {
          if (!ui || ui.style.display === 'none') return;
          if (!waiting) {
            if (e.code === 'Escape') ui.style.display = 'none';
            return;
          }
          e.preventDefault();
          e.stopImmediatePropagation();
          const a = list.find((q) => q.id === waiting);
          if (e.code === 'Escape') {
            waiting = null;
            render();
            return;
          }
          a.alt = e.code === 'Delete' || e.code === 'Backspace' ? null : e.code;
          waiting = null;
          save();
          render();
        },
        true
      );
    }
    ui.style.display = 'flex';
    render();
  }
  // the keys of an action (its own plus the one the player added) and a readable name for texts: mission tips, fight cards
  const byId = (id) => list.find((a) => a.id === id);
  const codes = (id) => {
    const a = byId(id);
    return a ? (a.alt ? [...a.def, a.alt] : a.def) : [];
  };
  const keyName = (id) => {
    const a = byId(id);
    if (!a) return '?';
    return (a.alt ? nice(a.alt) : nice(a.def[0])).replace('Space', 'Espacio');
  };
  const hintName = (id) => {
    const hints = WORLD_HINTS[id];
    const medium = controlMedium();
    return hints && medium !== 'keyboard' ? hints[medium === 'pad' ? 0 : 1] : keyName(id);
  };
  const kbd = (id) => `<kbd>${hintName(id)}</kbd>`;
  return {
    list,
    alias,
    open,
    nice,
    codes,
    keyName,
    hintName,
    kbd,
    get open_() {
      return ui && ui.style.display !== 'none';
    }
  };
})();

// Standard Xbox layout as exposed by the browser's Gamepad API.
const PAD_BUTTON = { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, VIEW: 8, MENU: 9, LS: 10, RS: 11,
  UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15 };
const PAD_STICK = { LEFT_X: 0, LEFT_Y: 1, RIGHT_X: 2, RIGHT_Y: 3 };

function connectedPad() {
  return navigator.getGamepads ? [...navigator.getGamepads()].find((pad) => pad?.connected) : null;
}
function sendControlKey(code, down) {
  window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, bubbles: true }));
}
function tapControlKey(code) {
  sendControlKey(code, true);
  sendControlKey(code, false);
}

const miniPadKeys = new Set();
let miniPadState = '', miniPadPresent = false;
function controlMedium() {
  const activePad = miniPadState === GAME.state && ['fight2d', 'basket2d', 'futbol2d', 'arcade'].includes(GAME.state)
    ? miniPadPresent
    : !!INPUT.gp;
  if (activePad) return 'pad';
  return document.body.classList.contains('touchmode') ? 'touch' : 'keyboard';
}
function updateMiniGamepad() {
  const state = GAME.state;
  const fight = state === 'fight2d';
  const mini = fight || state === 'futbol2d' || state === 'basket2d' || state === 'arcade';
  if (!mini && !miniPadKeys.size) {
    miniPadPresent = false;
    miniPadState = state;
    return;
  }
  const raw = mini ? connectedPad() : null;
  miniPadPresent = !!raw;
  if (!raw && !miniPadKeys.size) {
    miniPadState = state;
    return;
  }
  const active = new Set();
  if (raw) {
    const { A, B, X, Y, MENU, UP, DOWN, LEFT, RIGHT } = PAD_BUTTON;
    const pressed = (button) => raw.buttons[button]?.pressed;
    if (pressed(MENU)) active.add('KeyP');
    if (!fight) {
      const x = raw.axes[PAD_STICK.LEFT_X] ?? 0, y = raw.axes[PAD_STICK.LEFT_Y] ?? 0;
      if (pressed(LEFT) || x < -0.45) active.add('ArrowLeft');
      if (pressed(RIGHT) || x > 0.45) active.add('ArrowRight');
      if (pressed(UP) || y < -0.45) active.add('ArrowUp');
      if (pressed(DOWN) || y > 0.45) active.add('ArrowDown');
      if (pressed(A)) active.add('KeyE');
      if (pressed(B)) active.add('Space');
      if (pressed(X)) active.add('KeyQ');
      if (pressed(Y)) active.add('Escape');
    }
  }
  if (state !== miniPadState) {
    for (const code of miniPadKeys) sendControlKey(code, false);
    miniPadKeys.clear();
    // A button held from the previous screen needs a fresh press.
    for (const code of active) miniPadKeys.add(code);
    miniPadState = state;
    return;
  }
  for (const code of miniPadKeys) {
    if (active.has(code)) continue;
    sendControlKey(code, false);
    miniPadKeys.delete(code);
  }
  for (const code of active) {
    if (miniPadKeys.has(code)) continue;
    miniPadKeys.add(code);
    sendControlKey(code, true);
  }
}

const WORLD_HINTS = {
  use: ['X', 'USAR'], car: ['Y', 'ENTRAR / SALIR'], diary: ['↑', 'DIARIO'],
  weap: ['Cruceta →', 'Toca el arma'], punch: ['RB', 'GOLPE'], map: ['Vista', 'MAPA']
};
const PAD_HELP = [
  ['Mando Xbox · a pie', 'Stick izquierdo para andar, derecho para mirar. Pulsa el stick izquierdo para correr. A salta, X usa e interactúa, Y entra al coche. RT dispara al apuntar con LT. RB golpea con los puños. Cruceta → cambia de arma y ↓ muestra u oculta la brújula.'],
  ['Al volante', 'Stick izquierdo para girar, RT para acelerar, LT para frenar o dar marcha atrás. A activa el freno de mano, LB toca el claxon, Y sale del coche y cruceta ↓ endereza. RB cambia de emisora, cruceta ← / → cambia de canción.'],
  ['Menús y GPS', 'Menú pausa o reanuda. Cruceta para seleccionar y ajustar, A para confirmar y B para volver. Vista abre el mapa, cruceta ↑ abre el diario. En el mapa, stick izquierdo o cruceta para mover, LT/RT para zoom, A marca un destino, X lo quita e Y teletransporta al destino cuando es posible.'],
  ['Pelea 2D', 'Stick izquierdo o cruceta para moverte. X puñetazo, A patada, Y o ↑ salto y LB/LT defensa. Menú pausa y reanuda.'],
  ['Baloncesto, fútbol y recreativas', 'Stick izquierdo o cruceta para moverte. A es la acción principal, B la acción secundaria y X la tercera acción. Menú pausa y reanuda. Y vuelve en las recreativas o sale del partido desde la pausa cuando está permitido. Consulta las acciones en cada juego.']
];
const TOUCH_HELP = [
  ['En la calle', 'Joystick izquierdo para moverte y arrastra la vista para mirar. SALTO, CORRER y GOLPE a la derecha. USAR abre puertas, tiendas y recreativas. ENTRAR / SALIR controla el acceso a vehículos. Toca el nombre del arma para cambiarla. APUNTAR y DISPARAR aparecen con un arma.'],
  ['Al volante', 'Joystick: arriba acelera, abajo frena o da marcha atrás y los lados giran. FRENO MANO, CLAXON y ENDEREZAR tienen su botón. RADIO o Cambiar sintoniza la siguiente emisora. Los botones ⏮ y ⏭ cambian de canción.'],
  ['Menús y GPS', '❚❚ abre Pausa, DIARIO abre las misiones y GUÍA muestra u oculta la brújula. Toca MAPA o el minimapa para abrir el GPS. Arrastra el mapa para moverlo, pellizca para hacer zoom y toca un lugar para marcarlo.'],
  ['Pelea 2D', 'Flechas para moverte y saltar. P da puñetazos, K da patadas y B cubre. ❚❚ pausa y reanuda.'],
  ['Baloncesto, fútbol y recreativas', 'Cruceta para moverte. A, B y C corresponden a las acciones que indica cada juego. ❚❚ pausa y reanuda. ATRÁS vuelve en las recreativas o sale del partido desde la pausa cuando está permitido.']
];

function miniKeyLabel(id) {
  const names = {
    f_punch: ['A', 'A'], f_kick: ['B', 'B'], b_pass: ['X', 'C'],
    left: ['←', '◀'], right: ['→', '▶'], fwd: ['↑', '▲'], back: ['↓', '▼'],
    pause: ['Menú', '❚❚'], exit: ['Y', 'Atrás']
  };
  const medium = controlMedium();
  if (medium !== 'keyboard' && names[id]) return names[id][medium === 'pad' ? 0 : 1];
  if (id === 'pause') return 'P';
  if (id === 'exit') return 'Esc';
  return CONTROLS.keyName(id);
}
function miniActionLabel(id, mouse) {
  const key = miniKeyLabel(id);
  return controlMedium() === 'keyboard' ? `${mouse} · ${key}` : key;
}

function updatePadMenu() {
  const gp = INPUT.gp;
  if (!gp) return false;
  const { A, B, UP, DOWN, LEFT, RIGHT, MENU } = PAD_BUTTON;
  const id = ['saveui', 'ctlScreen', 'diario', 'pause', 'menu', 'dlg'].find((name) => {
    if (name === 'dlg') return DLG.open;
    const element = document.getElementById(name);
    return element && element.style.display !== 'none' &&
      (name !== 'menu' || GAME.state === 'menu') && (name !== 'pause' || GAME.state === 'pause');
  });
  if (!id) return false;
  const menu = document.getElementById(id);
  if (gp.down(B) || gp.down(MENU)) {
    const back = { saveui: 'svBack', ctlScreen: 'ctlClose', pause: 'bResume' }[id];
    if (back) {
      document.getElementById(back)?.click();
      return true;
    }
    if (id === 'diario') {
      DIARIO.close();
      return true;
    }
  }
  const left = gp.down(LEFT), right = gp.down(RIGHT);
  const movement = gp.down(UP) || left ? -1 : gp.down(DOWN) || right ? 1 : 0;
  if (!movement && !gp.down(A)) return false;
  const options = [...menu.querySelectorAll('button:not(:disabled), input[type=range]')].filter((el) => el.getClientRects().length);
  if (!options.length) return false;
  const index = options.indexOf(document.activeElement);
  const active = options[index];
  if (active?.type === 'range' && (left || right)) {
    if (left) active.stepDown();
    else active.stepUp();
    active.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (movement || index < 0) {
    options[index < 0 ? 0 : (index + movement + options.length) % options.length].focus();
  } else {
    active.click();
  }
  return true;
}
