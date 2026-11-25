// ============ missions ============
const BEACON = (() => {
  const mat = new THREE.MeshBasicMaterial({
    color: 0xf5b72e,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const g = new THREE.CylinderGeometry(1, 1, 1, 32, 1, true);
  g.translate(0, 0.5, 0);
  const ring = new THREE.RingGeometry(0.85, 1, 40);
  ring.rotateX(-Math.PI / 2);
  return {
    make(x, z, r, h, color = 0xf5b72e) {
      const grp = new THREE.Group();
      const m = new THREE.Mesh(g, mat.clone());
      m.material.color.set(color);
      m.scale.set(r, h, r);
      grp.add(m);
      const rg = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, depthWrite: false }));
      rg.scale.setScalar(r);
      rg.position.y = 0.25;
      grp.add(rg);
      grp.position.set(x, heightAt(x, z) + 0.1, z);
      scene.add(grp);
      grp.userData.t = Math.random() * 6;
      return grp;
    },
    free(b) {
      if (!b) return;
      if (b.parent) b.parent.remove(b);
      b.traverse((o) => {
        if (o.material) o.material.dispose();
      });
    } /* shared geometry, own materials (audit P0.3) */,
    anim(b, dt) {
      if (!b) return;
      b.userData.t += dt;
      b.children[0].material.opacity = 0.25 + Math.sin(b.userData.t * 3) * 0.1;
      b.rotation.y += dt;
    }
  };
})();
function poiNear(type, x, z) {
  let best = null,
    bd = 1e9;
  for (const p of DATA.P)
    if (p[1] === type) {
      const d = Math.hypot(p[2] - x, p[3] - z);
      if (d < bd) {
        bd = d;
        best = p;
      }
    }
  return best;
}
function frontOf(b, dist = 12) {
  // a reachable point on a road near a building
  const rd = ROADSEG.nearest(b.cx, b.cz, (r) => ROADCLASS(r) !== 'footway' && ROADCLASS(r) !== 'dirt');
  return rd ? [rd.x, rd.z] : [b.cx, b.cz];
}
// ---- dialogue box with choices (used by El Blanco's riddle)
const DLG = (() => {
  let onPick = null,
    opts = [];
  function show(who, title, text, q, options, cb) {
    $('dlgWho').textContent = who;
    $('dlgTitle').textContent = title;
    $('dlgText').innerHTML = text;
    $('dlgQ').textContent = q || '';
    const box = $('dlgOpts');
    box.innerHTML = '';
    opts = options || [];
    onPick = cb;
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.id = 'dlgopt' + i;
      b.innerHTML = `<kbd>${i + 1}</kbd>${o}`;
      b.addEventListener('click', () => pickIdx(i));
      box.appendChild(b);
    });
    $('dlg').style.display = 'block';
    if (GAME.state === 'play') GAME.state = 'dialog';
    document.exitPointerLock?.();
  }
  function pickIdx(i) {
    if (!onPick) return;
    const cb = onPick;
    onPick = null;
    cb(i);
  }
  function hide() {
    $('dlg').style.display = 'none';
    onPick = null;
    if (GAME.state === 'dialog') {
      GAME.state = 'play';
      GAME.lock();
    }
  }
  window.addEventListener('keydown', (e) => {
    if ($('dlg').style.display !== 'block') return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= opts.length) pickIdx(n - 1);
    if ((e.key === 'Enter' || e.key === ' ') && !opts.length && onPick) pickIdx(0);
  });
  // free text answer (v0.62: your own gang name): a text box and a button inside the dialog; game keys don't fire while typing
  function ask(who, title, text, q, ph, max, cb) {
    show(who, title, text, q, [], null);
    const box = $('dlgOpts');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.maxLength = max;
    inp.placeholder = ph;
    inp.style.cssText =
      'width:100%;box-sizing:border-box;padding:10px 12px;font:inherit;font-size:18px;border-radius:8px;border:2px solid #f5b72e;background:#111a;color:#fff;margin-bottom:8px';
    const ok = document.createElement('button');
    ok.innerHTML = '<kbd>↵</kbd>Firmar';
    const go = () => {
      const v = inp.value
        .replace(/[<>&"]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (v.length < 2) {
        inp.focus();
        return;
      }
      cb(v);
    };
    ok.addEventListener('click', go);
    inp.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') go();
    });
    inp.addEventListener('keyup', (e) => e.stopPropagation());
    box.appendChild(inp);
    box.appendChild(ok);
    setTimeout(() => inp.focus(), 50);
  }
  return {
    show,
    hide,
    ask,
    get open() {
      return $('dlg').style.display === 'block';
    }
  };
})();
const NPC = {};
// never leave a character or a goal inside a (non-visitable) building: move it to the nearest open street/park spot
// v1.4.48: a 50 m grid of the buildings (with the Catastro ones there are ~18,000 and the parks ask this thousands of
// times while loading: the whole-list loop made buildPlazasParks 0.7 s slower); rebuilt if DATA.B changes size. It keeps
// the buildings, not their outlines: the cuts (buildBuildings) only shrink them and b[6] is read when asked
let _bldGrid = null,
  _bldGridN = -1;
function inAnyBuilding(x, z) {
  const C = 50;
  if (!_bldGrid || _bldGridN !== DATA.B.length) {
    _bldGrid = new Map();
    _bldGridN = DATA.B.length;
    for (const b of DATA.B) {
      const c = b[6];
      let x0 = Infinity,
        z0 = Infinity,
        x1 = -Infinity,
        z1 = -Infinity;
      for (let i = 0; i < c.length; i += 2) {
        x0 = Math.min(x0, c[i]);
        x1 = Math.max(x1, c[i]);
        z0 = Math.min(z0, c[i + 1]);
        z1 = Math.max(z1, c[i + 1]);
      }
      for (let a = Math.floor(x0 / C); a <= Math.floor(x1 / C); a++)
        for (let k = Math.floor(z0 / C); k <= Math.floor(z1 / C); k++) {
          const key = a * 100003 + k;
          let l = _bldGrid.get(key);
          if (!l) _bldGrid.set(key, (l = []));
          l.push(b);
        }
    }
  }
  const l = _bldGrid.get(Math.floor(x / C) * 100003 + Math.floor(z / C));
  if (l) for (const b of l) if (b[6].length >= 6 && pip(x, z, b[6])) return true;
  return false;
}
// a clearly reachable spot 1.8-4 m from an NPC (for mission start rings): outside buildings, walls, trees and the
// tower, prefers the direction 'pref' (away from the wall the NPC leans on)
function openSpotNear(x, z, pref = 0) {
  for (const r of [2.0, 2.6, 3.2, 4.0])
    for (let k = 0; k < 16; k++) {
      const a = pref + ((k % 2 ? 1 : -1) * Math.ceil(k / 2) * Math.PI) / 8;
      const px = x + Math.sin(a) * r,
        pz = z + Math.cos(a) * r;
      if (inAnyBuilding(px, pz) || COL.nearSeg(px, pz, 1.0) || lowAt(px, pz, heightAt(px, pz))) continue;
      const q = COL.resolve(px, pz, 1.0);
      if (Math.hypot(q.x - px, q.z - pz) > 0.02) continue;
      return [px, pz];
    }
  return [x + 1.4, z + 1.4];
}
// a mission circle must not cut into a building: move its centre (up to ~6 m) until the whole ring stands in the open (Jonay, v0.62)
function ringClear(x, z, r) {
  const ok = (a, b) => {
    if (inAnyBuilding(a, b) || COL.nearSeg(a, b, r * 0.8)) return false;
    for (let k = 0; k < 8; k++) {
      const t = (k / 8) * Math.PI * 2;
      if (inAnyBuilding(a + Math.cos(t) * r * 0.95, b + Math.sin(t) * r * 0.95)) return false;
    }
    return true;
  };
  if (ok(x, z)) return [x, z];
  for (let d = 0.5; d <= 6; d += 0.5)
    for (let k = 0; k < 16; k++) {
      const t = (k / 16) * Math.PI * 2,
        a = x + Math.cos(t) * d,
        b = z + Math.sin(t) * d;
      if (ok(a, b) && !lowAt(a, b, heightAt(a, b))) return [a, b];
    }
  return [x, z];
}
function safeSpot(x, z, clear = 0.7) {
  const ok = (a, b, strict) =>
    !inAnyBuilding(a, b) && !COL.nearSeg(a, b, clear) && (!strict || !onCarriageway(a, b, 0.3)) && !lowAt(a, b, heightAt(a, b));
  // v1.2.6 (auditor: «árbol, farola o poste» en mitad de la C. Adelantado: era El Blanco): off the carriageway first; the
  // point as given only if nothing nearby is off it
  if (ok(x, z, true)) return [x, z];
  for (const strict of [true, false])
    for (let r = 1; r <= 80; r += 1)
      for (let k = 0; k < 24; k++) {
        const a = (k / 24) * Math.PI * 2,
          px = x + Math.cos(a) * r,
          pz = z + Math.sin(a) * r;
        if (ok(px, pz, strict)) return [px, pz];
      }
  return [x, z];
}
// v1.4.16 (Jonay, 16-nov: «el círculo del Blanco sale en una zona casi inaccesible»): a straight walk from (x1,z1) to
// (x2,z2) with no wall, building, big step or tunnel deck in between
function clearWalk(x1, z1, x2, z2) {
  if (COL.raycast(x1, z1, x2, z2) < 0.999) return false;
  const h0 = heightAt(x1, z1),
    n = Math.ceil(Math.hypot(x2 - x1, z2 - z1) / 0.5);
  for (let i = 1; i <= n; i++) {
    const x = x1 + ((x2 - x1) * i) / n,
      z = z1 + ((z2 - z1) * i) / n,
      h = heightAt(x, z);
    if (inAnyBuilding(x, z) || Math.abs(h - h0) > 1.2 || lowAt(x, z, h)) return false;
  }
  return true;
}
// a spot r m from (x,z) on open ground you can walk straight to, with a clear mission ring next to it (+ring, +ring)
function reachNear(x, z, rs = [4, 5, 3.5, 6, 7, 8, 3], ring = 1.2) {
  for (const r of rs)
    for (let k = 0; k < 24; k++) {
      const a = (k / 24) * Math.PI * 2,
        px = x + Math.sin(a) * r,
        pz = z + Math.cos(a) * r;
      if (inAnyBuilding(px, pz) || COL.nearSeg(px, pz, 0.8) || onCarriageway(px, pz, 0.3) || lowAt(px, pz, heightAt(px, pz))) continue;
      const rx = px + ring,
        rz = pz + ring;
      if (inAnyBuilding(rx, rz) || COL.nearSeg(rx, rz, 1.2) || onCarriageway(rx, rz, 0.3)) continue;
      if (!clearWalk(x, z, px, pz) || !clearWalk(x, z, rx, rz)) continue;
      return [px, pz];
    }
  return null;
}
// v1.4.16 (Jonay, 17-nov: «que vaya en un sentido que nos acerque a la siguiente... ir recorriendo la ciudad con las
// misiones»): a road route from (x,z) of minL-maxL m ending as near (tx,tz) as it can: through a point on the way when
// the target is in range (it ends at it), a loop through a point around when it is nearer than minL, and as far towards
// it as allowed when it is too far. No U-turns at the joint. ok(r): extra condition (e.g. far from the edge of the map).
/** v1.4.43: metres of a route that run along a street it has already used (either way): checkpoint courses must not come
 * back along the street they went out on («la ruta de vuelta pasa por encima de la de ida») */
function routeRetrace(r) {
  const seen = new Set(),
    k = (i) => Math.round(r[i] * 2) + ',' + Math.round(r[i + 1] * 2);
  let m = 0;
  for (let i = 2; i < r.length; i += 2) {
    const a = k(i - 2),
      b = k(i),
      key = a < b ? a + '|' + b : b + '|' + a;
    if (seen.has(key)) m += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]);
    else seen.add(key);
  }
  return m;
}
function routeToward(x, z, tx, tz, minL, maxL, ok) {
  const from = GRAPH.nearestNode(x, z);
  // a few end nodes within ~40 m of the target (the nearest one may be the exit of a one-way street: nothing can end on it)
  const tos = [GRAPH.nearestNode(tx, tz)];
  for (const [ox, oz] of [
    [40, 0],
    [-40, 0],
    [0, 40],
    [0, -40]
  ]) {
    const n = GRAPH.nearestNode(tx + ox, tz + oz);
    if (!tos.includes(n)) tos.push(n);
  }
  const len = (r) => {
    let L = 0;
    for (let i = 2; i < r.length; i += 2) L += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]);
    return L;
  };
  let best = null;
  const consider = (r) => {
    if (!r || r.length < 4 || (ok && !ok(r))) return;
    const L = len(r);
    if (L < minL || L > maxL) return;
    const e = Math.hypot(r[r.length - 2] - tx, r[r.length - 1] - tz),
      rt = routeRetrace(r),
      clean = rt <= 25,
      score = e + 3 * Math.max(0, rt - 25); // v1.4.43: running back along its own street costs much more than ending a bit off
    if (!best || score < best.score) best = { r, e, rt, clean, score };
  };
  const join = (r1, r2) => {
    if (!r1 || !r2 || r1.length < 4 || r2.length < 4) return null;
    const n = r1.length,
      ax = r1[n - 2] - r1[n - 4],
      az = r1[n - 1] - r1[n - 3],
      bx = r2[2] - r2[0],
      bz = r2[3] - r2[1];
    if ((ax * bx + az * bz) / (Math.hypot(ax, az) * Math.hypot(bx, bz) || 1) < -0.85) return null; // a U-turn
    return [...r1, ...r2.slice(2)];
  };
  const D = Math.hypot(tx - x, tz - z);
  for (let k = 0; k < 80 && !(best && best.e < 40 && best.clean); k++) {
    const a = Math.random() * 6.283,
      to = tos[k % tos.length];
    if (D > maxL * 0.75) {
      const f = (rnd(0.55, 0.95) * maxL) / D;
      consider(GRAPH.route(from, GRAPH.nearestNode(x + (tx - x) * f, z + (tz - z) * f)));
      continue;
    }
    if (D >= minL * 0.7) {
      const t = rnd(0.3, 0.7),
        off = rnd(0, 0.45) * D;
      const v = GRAPH.nearestNode(x + (tx - x) * t + Math.sin(a) * off, z + (tz - z) * t + Math.cos(a) * off);
      consider(join(GRAPH.route(from, v), GRAPH.route(v, to)));
    } else if (k % 2 === 0) {
      // a loop out through a point around and back by another way
      const rr = rnd(0.3, 0.45) * (minL + maxL) * 0.5,
        v = GRAPH.nearestNode(x + Math.sin(a) * rr, z + Math.cos(a) * rr);
      consider(join(GRAPH.route(from, v), GRAPH.route(v, to)));
    } else {
      // a loop through two points (a triangle: out and back by the same street would be a U-turn)
      const rr = rnd(0.16, 0.28) * (minL + maxL) * 0.5,
        a2 = a + rnd(0.9, 1.5) * (Math.random() < 0.5 ? 1 : -1);
      const v1 = GRAPH.nearestNode(x + Math.sin(a) * rr, z + Math.cos(a) * rr),
        v2 = GRAPH.nearestNode(x + Math.sin(a2) * rr, z + Math.cos(a2) * rr);
      consider(join(join(GRAPH.route(from, v1), GRAPH.route(v1, v2)), GRAPH.route(v2, to)));
    }
  }
  return best && best.r;
}
// ============ STORY: Ayoze «El Chopa» vuelve al barrio ============
// Ayoze «El Chopa» (por su narizota): listo, pero acabó preso por robar. Sale de la cárcel y quiere redimirse en La Laguna.
// El Blanco es su amigo de la infancia de verdad (exmilitar, se le fue la cabeza, vive con sus padres, entiende de armas);
// los demás son gente del barrio, de la pandilla de El Blanco, a los que la vida ha tratado fatal.
// fight tutorial (Sastrón): step by step through the 2D fighting controls, then a real round
function fightTutorial() {
  const { steps } = fightTutorialPart1();
  let i = 0,
    wait = 0;
  return {
    check(st) {
      if (st.phase !== 'fight') return;
      if (st.a.hp < 40) st.a.hp = 100;
      if (st.b.hp < 30) st.b.hp = 100;
      if (i >= steps.length) return;
      const [k, tip, ok] = steps[i];
      st.tip = `${i + 1}/${steps.length}  ${tip}`;
      st.b.ai.passive = k !== 'blocked';
      st.b.ai.lv = 0;
      st.b.ai.tutAttack = k === 'blocked';
      if (k === 'blocked') {
        st.blkT = (st.blkT || 0) + 1;
        if (st.blkT > 60 * 25) st.ev.blocked = true;
      } // never gets stuck on this step
      if (wait > 0) {
        wait--;
        if (wait === 0) {
          i++;
          st.ev = {};
          if (i >= steps.length) {
            st.tip = '';
            st.banner = '¡AHORA EN SERIO!';
            st.bannerCol = '#ffd400';
            st.bannerSize = 12;
            setTimeout(() => {
              if (st.banner === '¡AHORA EN SERIO!') st.banner = '';
            }, 1500);
            st.tut = null;
            st.a.hp = st.b.hp = 100;
            st.b.ai = { lv: 0.1, t: 0, blockT: 0 };
          }
        }
        return;
      }
      if (ok(st.ev)) {
        wait = 40;
        st.tip = '¡BIEN!  ' + tip;
        AUDIO.cash && AUDIO.cash();
      }
    }
  };
}
/** (v1.1.7, code quality) part of fightTutorial: v0.64: the keys shown are the ones set in Opciones › Controles */
function fightTutorialPart1() {
  const medium = controlMedium();
  const T = medium === 'touch',
    pad = medium === 'pad';
  const steps = [
    [
      'walk',
      pad
        ? 'Muévete con el stick izquierdo o la cruceta'
        : T
          ? 'Muévete con ◀ ▶'
          : `Muévete con ${CONTROLS.keyName('left')} y ${CONTROLS.keyName('right')}`,
      (e) => (e.walk || 0) > 50
    ],
    // v0.64: the keys shown are the ones set in Opciones › Controles
    ['jab', pad ? 'Puñetazo: X' : T ? 'Puñetazo: P' : `Puñetazo: ${CONTROLS.keyName('f_punch')} o clic izquierdo`, (e) => e.jab],
    ['kick', pad ? 'Patada: A' : T ? 'Patada: K' : `Patada: ${CONTROLS.keyName('f_kick')} o clic derecho`, (e) => e.kick],
    ['jump', pad ? 'Salta: Y o ↑' : T ? 'Salta: ▲' : `Salta: ${CONTROLS.keyName('f_jump')}`, (e) => e.jump],
    ['sweep', pad ? 'Barrido: ↓ + A' : T ? 'Barrido: ▼ + K' : `Barrido: ${CONTROLS.keyName('back')} + patada`, (e) => e.sweep],
    ['blocked', T ? 'Cúbrete: atrás cuando ataque' : 'Cúbrete: mantén atrás cuando Sastrón ataque', (e) => e.blocked],
    ['combo', 'Combo: puño, puño, patada', (e) => e.combo],
    ['gofio', T ? 'Bola de gofio: ◀ ▶ + P' : 'Bola de gofio: atrás, adelante + puñetazo', (e) => e.gofio],
    ['teide', T ? 'Patada del Teide: ◀ ▶ + K' : 'Patada del Teide: atrás, adelante + patada', (e) => e.teide],
    ['gancho', T ? 'Gancho del Roque: ▼ ▲ + P' : 'Gancho del Roque: abajo, arriba + puñetazo', (e) => e.gancho],
    ['pastor', T ? 'Salto del Pastor: ▼ ▲ + K' : 'Salto del Pastor: abajo, arriba + patada', (e) => e.pastor]
  ];
  return { steps };
}
// v1.4.47 (Jonay: «me llamó el cura y no me deja seguir… al bajarme ya no funciona, se quedó el mensaje»): cut the
// conversation in progress (respawn, loading a game…) AND its subtitle; before, only the conversation was cut and its
// line stayed on screen for good (nothing could move it on; a click in the car changed the song). Who started it may
// ask to hear about it (onCancel: the priest's call comes again later)
function talkCancel() {
  const T = window.__TALK,
    c = T && T.cur;
  if (T) T.cur = null;
  const s = document.getElementById('sub');
  if (s) s.classList.remove('talking');
  if (typeof HUD !== 'undefined' && HUD.sub) HUD.sub('', 0.01);
  if (c && c.onCancel)
    try {
      c.onCancel();
    } catch (e) {}
}
// advance spoken lines: click (PC, without punching), Enter, or tap on the subtitle
function talkSkip() {
  const T = window.__TALK;
  if (!T || !T.cur || (GAME.state !== 'play' && GAME.state !== 'cutscene')) return false;
  T.cur.next();
  return true;
}
document.addEventListener('mousedown', (e) => {
  if (e.button === 0 && document.pointerLockElement && window.__TALK && window.__TALK.cur && GAME.state === 'play') {
    FIGHT.blockPunch = true;
    WEAPON.want = false;
    talkSkip();
  }
});
window.addEventListener(
  'keydown',
  (e) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat && !(DLG && DLG.open) && talkSkip()) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  },
  true
);
/** a copy of a character's look (or an empty one) */
const lookCopy = (l) => ({ ...(l || {}) });
/** a fighter that only defends (Sastrón's tutorial fight) */
const passiveAI = () => ({ lv: 0, t: 0, blockT: 0, passive: true });
// v1.2.4: the pieces of the shooting-range cans, made once when the game loads (they were made again at every reset of
// the range); the materials come from M(), which keeps one of each
const CAN_KIT = {
  gb: new THREE.CylinderGeometry(0.06, 0.06, 0.16, 12),
  gt: new THREE.CylinderGeometry(0.058, 0.058, 0.01, 12),
  mat: null,
  top: null
};
const MISSIONS = (() => {
  let active = null,
    activeTrack = null,
    step = 0,
    timer = 0,
    beacon = null,
    data = {};
  // v0.66: everything said during each mission, for the diary (J); saved with the game
  // v0.70: story missions already done out of order (a save from before the missions were sorted by zones)
  const STORY_SKIP = new Set();
  // the story order of the saves v ≤ 2 (before v0.70): their «story» index counts in this list
  const STORY_V2 = [
    'Vuelta al barrio',
    'Una botella para Coco',
    'Sastrón',
    'La firma de la banda',
    'Boca Papa te enseña a comer',
    'El campo de tiro de El Blanco',
    'Atraco en la farmacia',
    'Defensores de La Laguna',
    'El carterista del Cristo',
    'Baches en la Vía de Ronda',
    'El rally de La Esperanza',
    'Los bancos del Adelantado',
    'Grafiteros en el tranvía',
    'La guagua de la broma',
    'Escolta a la guagua del Romero',
    'El gofio robado',
    'Carrera solidaria del casco',
    'Noche en el aeropuerto'
  ];
  // v0.75 (Jonay: missions already done showed no dialogue): every line keeps when it was said, so the diary lists them
  // newest first; what is said just after a mission ends (its closing lines) still goes to it, and talk outside any
  // mission goes to «Charlas sueltas». A mission played again keeps only its latest run.
  const LOG = {};
  let lastTitle = null,
    lastT = 0,
    stamp = 0;
  const LOOSE = 'Charlas sueltas';
  const logLine = (who, t, forced) => {
    if (!t) return;
    const title = forced ? forced : active ? active.title : lastTitle && performance.now() - lastT < 30000 ? lastTitle : LOOSE;
    const L = LOG[title] || (LOG[title] = []);
    stamp = Math.max(Date.now(), stamp + 1);
    L.push([who || '', String(t), stamp]);
    /* strictly increasing: two lines in the same ms keep their order */ if (L.length > 120) L.splice(0, L.length - 120);
  };
  const GANG = { formed: false, name: '', members: [] };
  window.GANG = GANG;
  const SASTRON_FEE = 2500;
  const TALK = { cur: null };
  window.__TALK = TALK;
  const bold = (s) => `<b>${s}</b>`;
  const CH = 'El Chopa';
  // spoken lines as subtitles: each one stays until you click / tap / press Space or Enter
  // v0.82.1: talk(lines, cb, title): a title files the lines under that entry of the diary (the phone calls that open
  // something: the maleantes, the arcades…) instead of the mission in course or «Charlas sueltas»
  const talk = (lines, cb, title) => {
    // v1.4.47 (Jonay: «no debería llamar mientras conduces… lo de la llamada del cura aplica a todas las llamadas»): a
    // phone call (someone «por el móvil») waits until you are on foot; meanwhile a notice says who is calling
    const phone = lines.some((l) => / \(por el móvil\)$/.test(l[0] || ''));
    if (phone && PLAYER.car) {
      const who = (lines.find((l) => / \(por el móvil\)$/.test(l[0] || ''))[0] || '').replace(/ \(por el móvil\)$/, '');
      HUD.toast('📱 Te llama ' + who + ': bájate del coche para contestar', '#ffd54a', 5);
      const iv = setInterval(() => {
        if (PLAYER.car || PLAYER.dead || TALK.cur || (DLG && DLG.open) || (GAME.state !== 'play' && GAME.state !== 'cutscene')) return;
        clearInterval(iv);
        talk(lines, cb, title);
      }, 500);
      return;
    }
    const my = {};
    TALK.cur = my;
    let i = 0,
      tm = 0;
    const next = () => {
      if (TALK.cur !== my) return;
      clearTimeout(tm);
      if (i >= lines.length) {
        TALK.cur = null;
        $('sub').classList.remove('talking');
        HUD.sub('', 0.01);
        cb && cb();
        return;
      }
      const [who, t, d = 8.8] = lines[i++];
      logLine(who, t, title);
      SUB.show(
        `${who ? bold(who + ':') + ' ' : ''}${t} <span class="subnext">▶ ${document.body.classList.contains('touchmode') ? 'toca para seguir' : 'clic / Espacio'}</span>`,
        99999
      );
      $('sub').classList.add('talking');
    }; // lines only move on with a click / tap / Space / Enter
    my.next = next;
    next();
  };
  const setObjective = (t) => {
    const o = $('objective');
    if (!t) {
      o.style.display = 'none';
      return;
    }
    o.style.display = 'block';
    o.innerHTML = t + (timer > 0 ? `<span class="t" id="mtimer"></span>` : '');
  };
  function clearBeacon() {
    if (beacon) {
      BEACON.free(beacon);
      beacon = null;
    }
  }
  function goto(x, z, r, color) {
    [x, z] = safeSpot(x, z, 0.3);
    [x, z] = ringClear(x, z, r);
    clearBeacon();
    beacon = BEACON.make(x, z, r, 7, color);
    data.goal = [x, z, r];
    updateGPS(true);
  }
  // v0.75 (Jonay): in races, the route of the next two controls after the one you're heading to is already drawn
  // (dimmer) on the minimap and the big map, so you see the turns coming. P = the race's own path (flat x,z list) if it
  // has one; otherwise it is routed by road (car) or on foot.
  function ahead(cps, i, P) {
    data.race = true;
    const nx = (cps || []).slice(i + 1, i + 3);
    data.ahead = nx.length ? nx : null;
    data.aheadPath = null;
    if (!nx.length) return;
    const a = cps[i],
      b = nx[nx.length - 1];
    const near = (x, z, from) => {
      let bi = from,
        bd = 1e18;
      for (let k = from; k < P.length; k += 2) {
        const d = (P[k] - x) ** 2 + (P[k + 1] - z) ** 2;
        if (d < bd) {
          bd = d;
          bi = k;
        }
      }
      return bi;
    };
    if (P && P.length >= 4) {
      const i0 = near(a[0], a[1], 0),
        i1 = near(b[0], b[1], i0);
      if (i1 > i0) {
        data.aheadPath = P.slice(i0, i1 + 2);
        return;
      }
    }
    const out = [a[0], a[1]];
    let prev = a;
    for (const q of nx) {
      let r = null;
      try {
        r = PLAYER.car
          ? GRAPH.routeFrom(prev[0], prev[1], Math.atan2(q[0] - prev[0], q[1] - prev[1]), q[0], q[1])
          : WALKG.route(prev[0], prev[1], q[0], q[1]);
      } catch (e) {
        r = null;
      }
      if (r) out.push(...r);
      out.push(q[0], q[1]);
      prev = q;
    }
    data.aheadPath = out;
  }
  function finish() {
    if (data.rival) data.rival.mission = false;
    /* v0.77: the Canarión's car stays in the street, but it is no longer a mission car */ if (data.rival && data.rival.mode === 'race') {
      data.rival.mode = 'physics';
      data.rival.driver = null;
      data.rival.ctl.brk = 1;
    }
    clearBeacon();
    setObjective(null);
    const tr = TRACKS[activeTrack];
    if (active) {
      lastTitle = active.title;
      lastT = performance.now();
    }
    active = null;
    activeTrack = null;
    timer = 0;
    data = {};
    GPS.path = null;
    return tr;
  }
  function pass(title, money, keepIdx) {
    const tr = finish();
    if (!keepIdx) tr.idx++;
    PLAYER.money += money;
    setTimeout(() => {
      try {
        SAVE.auto('Misión superada: ' + title);
      } catch (e) {}
    }, 1500);
    MUSIC.jingle();
    HUD.big('¡MISIÓN SUPERADA!', '#f5b72e', 4);
    HUD.toast(title + (money ? '  +' + eur(money) : ''), '#7fe08a', 4);
    setTimeout(placeStarts, 2500);
  }
  function fail(reason, noRetry) {
    const m = active,
      k = activeTrack;
    finish();
    // v1.4.48: a talk of the mission left on screen (e.g. the intro of «Vuelta al barrio» when the mission is called off
    // from the diary) kept the game in 'dialog' and no other mission could start
    if (DLG.open) DLG.hide();
    AUDIO.fail();
    HUD.big('MISIÓN FALLIDA', '#e04848', 3.5);
    HUD.toast(reason, '#ffb3b3', 4);
    setTimeout(placeStarts, 2500);
    if (m && !noRetry) offerRetry(m, k);
  }
  // after a failure: «¿Reintentar?» (works with the mouse, keys 1/2 and touch). Waits until the player is back in play
  // (after a respawn, a 2D fight…) and gives up if another mission has started meanwhile.
  function offerRetry(m, k) {
    let tries = 0;
    const ask = () => {
      if (active || TRACKS[k].list[TRACKS[k].idx] !== m) return;
      if (GAME.state !== 'play' || PLAYER.dead || (DLG && DLG.open)) {
        if (++tries < 40) setTimeout(ask, 500);
        return;
      }
      DLG.show(
        m.who || '',
        m.title,
        'La misión ha fallado. ¿Quieres volver a intentarlo desde el principio?',
        '',
        ['Reintentar', 'Ahora no'],
        (i) => {
          DLG.hide();
          if (i === 0) retry(m, k);
        }
      );
    };
    setTimeout(ask, 2600);
  }
  function retry(m, k) {
    if (active) return;
    if (PLAYER.car) {
      try {
        exitCar();
      } catch (e) {}
    }
    const sp = m.startPos();
    const r = COL.resolve(sp[0], sp[1], 0.4);
    PLAYER.x = r.x;
    PLAYER.z = r.z;
    WANTED.level = 0;
    begin(m, k);
  }
  function begin(m, k) {
    LOG[m.title] = [];
    for (const kk in TRACKS)
      if (TRACKS[kk].beacon) {
        BEACON.free(TRACKS[kk].beacon);
        TRACKS[kk].beacon = null;
      }
    active = m;
    activeTrack = k;
    data = {};
    setWaypoint(null);
    setObjective(null);
    HUD.big(active.title.toUpperCase(), '#fff', 3);
    active.start();
  }
  function abort(msg) {
    finish();
    if (msg) HUD.toast(msg, '#f5b72e', 4);
    setTimeout(placeStarts, 1500);
  }
  const near = (n, r = 3.2) => Math.hypot(PLAYER.x - n.x, PLAYER.z - n.z) < r && (!PLAYER.car || PLAYER.car.speed < 2);
  function moveNPC(n, x, z, face) {
    const [a, b] = safeSpot(x, z, 0.6);
    n.x = a;
    n.z = b;
    n.H.root.position.set(a, heightAt(a, b) + 0.17, b);
    if (face) n.H.root.rotation.y = Math.atan2(face[0] - a, face[1] - b);
  }
  // dialogue chain with the DLG box (one "Seguir" button per line): [[who, text], ...]
  const chat = (title, lines, cb) => {
    let i = 0;
    const next = () => {
      if (i >= lines.length) {
        DLG.hide();
        cb && cb();
        return;
      }
      const [who, t, btn] = lines[i++];
      logLine(who, t);
      if (/Blanco/.test(who)) AUDIO.mumble(1.6);
      DLG.show(who, title, t, '', [btn || 'Seguir'], () => setTimeout(next, 120));
    };
    next();
  };

  // ======================= STORY =======================
  const STORY = [
    {
      title: 'Vuelta al barrio',
      who: 'Rayco «El Blanco»',
      hint() {
        return 'Habla con ' + bold('Rayco «El Blanco»') + ', en la puerta de casa de sus padres';
      },
      startPos() {
        return [NPC.blanco.x + 1.2, NPC.blanco.z + 1.2];
      },
      start() {
        step = 0;
        data.round = 0;
        data.fails = 0;
        const R = [
          {
            t: 'Ehhh... <b>psss</b>... ejem... tú... brrr... <b>ve</b>... ahhh... a la... prrr... <b>¿tooo...rre?</b>... ehhh',
            q: '¿Qué ha querido decir?',
            o: ['Vete a la porra', 'Ve a la torre', 'Ven a la tarde, que hay potaje'],
            ok: 1
          },
          {
            t: 'Prrr... sí... ehhh... la de... <b>Con</b>... psss... ejem... <b>cep</b>... brrr... mmm... <b>ción</b>... ahhh... la... la... pss',
            q: '¿Qué torre?',
            o: ['La de la Consolación', 'La de Conce, la del bar', 'La de La Concepción'],
            ok: 2
          },
          {
            t: 'Y... ahhh... brrr... <b>bus</b>... ejem... ca... a... ehhh... <b>Bo</b>... psss... <b>ca</b>... prrr... <b>Pa</b>... ehh... <b>pa</b>... ¿sabes? brrr',
            q: '¿A quién hay que buscar?',
            o: ['Una boca de papas fritas', 'A Boca Papa', 'A tu papá, que te busca'],
            ok: 1
          }
        ];
        const fails = [
          'Brrr... no... ehhh... pssss... ¡NO!',
          'Ahhh... prrr... tú no... ejem... escuchas...',
          'Pss... mi madre... ehhh... eso lo entiende...',
          'Mmm... firmes... ¡FIRMES!... brrr... no...'
        ];
        const ask = () => {
          const r = R[data.round];
          AUDIO.mumble(2.2);
          DLG.show(
            'Rayco «El Blanco»',
            data.round === 0 ? 'Descifra lo que dice El Blanco' : `Descifra lo que dice El Blanco (${data.round + 1}/3)`,
            `«${r.t}»`,
            r.q,
            r.o,
            (i) => {
              if (i === r.ok) {
                AUDIO.cash();
                data.round++;
                if (data.round < R.length) setTimeout(ask, 250);
                else end();
              } else {
                data.fails++;
                AUDIO.fail();
                AUDIO.mumble(1.2);
                DLG.show('Rayco «El Blanco»', 'Eso no era…', `«${pick(fails)}»`, '', ['Intentarlo otra vez'], () => setTimeout(ask, 200));
              }
            }
          );
        };
        const end = () => {
          DLG.show(
            'Mensaje descifrado',
            '«Ve a la torre de La Concepción y busca a Boca Papa»',
            'El Blanco asiente muy despacio, se cuadra como en el cuartel, te hace un saludo militar torcido y te mete en el bolsillo una libreta vieja de la mili. «Brrr... misiones... apunta.» <b>Con la ' +
              CONTROLS.hintName('diary') +
              ' ves el diario de misiones.</b>',
            '',
            ['Vale, voy para allá'],
            () => {
              DLG.hide();
              step = 1;
              goto(NPC.boca.x, NPC.boca.z, 2.5);
              setObjective('Ve a la ' + bold('torre de La Concepción') + ' y busca a ' + bold('Boca Papa'));
              setTimeout(
                () =>
                  HUD.toast(
                    `El Blanco te mete en el bolsillo una libreta vieja de la mili: «brrr... misiones... apunta». Pulsa ${CONTROLS.hintName('diary')} para ver el diario de misiones.`,
                    '#f5b72e',
                    7
                  ),
                1200
              );
            }
          );
        };
        chat(
          'Ayoze «El Chopa» vuelve al barrio',
          [
            [
              'Ayoze «El Chopa»',
              'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.'
            ],
            [CH, '¡Blanco! ¡Chacho, soy yo, Ayoze! El Chopa. ¿No me reconoces? Con esta nariz no me confunde nadie.'],
            ['Rayco «El Blanco»', '«Brrr... mmm... ahhh... ¿Cho...pa?... psss... mmm.»<br><i>Te mira la nariz. Sonríe. Te ha reconocido.</i>'],
            [
              CH,
              'Salí ayer de la prisión. Me cogieron por listo, Blanco... por pasarme de listo. Pero se acabó. Quiero hacer las cosas bien, redimirme. Vivir en La Laguna como una persona normal.'
            ],
            [
              'Rayco «El Blanco»',
              '«Ahhh... brrr... mmm... nor... mal... psss.»<br><i>Rayco estuvo en el ejército. Volvió de su última misión callado y raro, y desde entonces vive con sus padres, que le planchan el chándal gris. De armas sabe más que nadie del barrio. De hablar, no tanto.</i>'
            ],
            [CH, 'Oye... ¿y la gente? ¿La pandilla de cuando éramos chicos? ¿Qué fue de los colegas?', 'Preguntarle por la pandilla']
          ],
          () => setTimeout(ask, 200)
        );
      },
      update() {
        if (step !== 1) return;
        if (near(NPC.boca)) {
          step = 2;
          clearBeacon();
          setObjective(null);
          talk(
            [
              [
                'Boca Papa',
                '¡Ños! ¿El Chopa? ¡Esa nariz la reconozco desde la Plaza del Adelantado! No te acordarás de mí: yo era el gordito que iba siempre detrás de El Blanco.'
              ],
              [
                'Boca Papa',
                'Me llaman Boca Papa porque tenía el quiosco de papas fritas del barrio. Me lo comí. Literalmente: me comí el negocio entero. Ahora vivo aquí, a la sombra de la torre.'
              ],
              [
                'Boca Papa',
                '¿Que saliste del talego y quieres redimirte? Muy bonito. Pero en esta ciudad, solo, no se redime nadie, mi niño. Hace falta una BANDA. Y tú tienes cabeza de jefe.'
              ],
              [
                'Boca Papa',
                'El Blanco ya está dentro, que en la mili aprendió a hacer de todo. El siguiente es Coco, el calvo: era el campeón de boxeo del barrio. Ahora anda tirado por ' +
                  NPC.coco.place +
                  '. Va siempre con sed.'
              ]
            ],
            () => pass('Vuelta al barrio', 150)
          );
        }
      }
    },
    {
      title: 'Una botella para Coco',
      who: 'Coco',
      hint() {
        return 'Busca a ' + bold('Coco') + ' junto a ' + bold(NPC.coco.place);
      },
      startPos() {
        return [NPC.coco.x + 1.2, NPC.coco.z + 1.2];
      },
      start() {
        const it = INTERIORS.find((i) => i.id === 'cafe');
        data.bar = it;
        step = 0;
        talk([
          [
            'Coco',
            '¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios.'
          ],
          [
            'Coco',
            '¿El Chopa? ¿El amigo de El Blanco? Ahhh, el de la nariz... Hice la mili con Rayco, ¿sabes? Él volvió rarito y yo volví sin pelo. La vida, mi niño.'
          ],
          [
            'Coco',
            `Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de ${it ? it.name : 'la cafetería'}, la que tiene la puerta abierta. Y de las grandes.`
          ]
        ]);
        if (it) {
          goto(it.door.x + it.door.nx * 2, it.door.z + it.door.nz * 2, 2.2);
          setObjective(`Entra en ${bold(it.name)} y compra una ${bold('botella de ron')} en la barra`);
        } else setObjective('Compra una botella de ron');
      },
      wantsBottle() {
        return step === 0;
      },
      onEvent(t, tag) {
        if (t === 'bought' && tag === 'ron' && step === 0) {
          step = 1;
          SUB.show(bold('Camarera:') + ' ¿Ron a estas horas? Bueno, cariño, tú sabrás. Que no te vea el cura.', 4);
          logLine('Camarera', '¿Ron a estas horas? Bueno, cariño, tú sabrás. Que no te vea el cura.');
          goto(NPC.coco.x, NPC.coco.z, 2.5);
          setObjective('Lleva la botella a ' + bold('Coco'));
        }
      },
      update() {
        if (step === 0 && data.bar && PLAYER.interior === data.bar && beacon) {
          clearBeacon();
          setObjective(`Acércate a la ${bold('barra')} y pulsa ${CONTROLS.kbd('use')} para pedir`);
        }
        if (step === 1 && near(NPC.coco)) {
          step = 2;
          clearBeacon();
          setObjective(null);
          talk(
            [
              ['Coco', '¡Aaaay, mi alma! Esto sí es un amigo. *glu glu glu*'],
              [
                'Coco',
                'Te voy a decir una cosa, Chopa: el día que entres en tu banda te enseño a pelear como Dios manda. Un jab, un crochet... y a correr, que ya no tengo edad.'
              ],
              [
                'Coco',
                'El que os falta es Sastrón. Era sastre, el mejor de La Laguna: le hizo a El Blanco el traje de la comunión. Un día las tijeras le empezaron a hablar... y les hizo caso. Ahora lo verás por ' +
                  NPC.sastron.place +
                  '.'
              ],
              [
                'Coco',
                'Ve a verle. Pero ojo: antes de hablar de nada te va a tomar las medidas... a guantazos. Le enseñé yo, así que no te confíes.'
              ],
              ['Coco', 'Toma, que me sobraron de un cajero que estaba abierto. No preguntes. Tú, que estás reformado, mejor ni preguntes.']
            ],
            () => pass('Una botella para Coco', 200)
          );
        }
      }
    },
    {
      title: 'Sastrón',
      who: 'Sastrón',
      hint() {
        return 'Busca a ' + bold('Sastrón') + ' junto a ' + bold(NPC.sastron.place);
      },
      startPos() {
        return [NPC.sastron.x + 1.2, NPC.sastron.z + 1.2];
      },
      start() {
        step = 0;
        if (GANG.sastronTut) {
          talk([['Sastrón', '¿Ya traes las perras, Chopa? Las tijeras están impacientes.']], () => this.pay());
          return;
        }
        talk(
          [
            [
              'Sastrón',
              '¡Quieto ahí! No te muevas... ochenta y dos de pecho, cuarenta de cuello y una nariz... una nariz de talla especial. ¡Tú eres el Chopa!'
            ],
            [
              'Sastrón',
              'Yo vestí a media Laguna. Trajes de boda, de comunión, de entierro... El de la comunión de Rayco, con su pajarita. Luego las tijeras empezaron a hablarme. Y tenían razón en todo.'
            ],
            ['Sastrón', 'Pero antes de coserte nada te tomo las medidas... ¡a guantazos! Coco me enseñó todo lo que sé. Ponte en guardia, Chopa.']
          ],
          () => {
            if (active !== this) return;
            FIGHT2D.start({
              a: { name: 'EL CHOPA', look: lookCopy(playerHuman.look), nose: true },
              b: { name: 'SASTRÓN', look: lookCopy(NPC.sastron.H.look), deal: 0.4, recv: 1.3, ai: passiveAI() },
              ax: PLAYER.x,
              az: PLAYER.z,
              bx: NPC.sastron.x,
              bz: NPC.sastron.z,
              hide: [playerHuman.root, NPC.sastron.H.root, WEAPON.mesh],
              tutorial: fightTutorial(),
              single: true,
              onEnd: (r) => {
                if (active !== this) return;
                if (!r.won) {
                  talk([['Sastrón', 'Jejeje, todavía te falta, Chopa. Pero tienes madera... de percha. Vuelve cuando quieras la revancha.']], () =>
                    abort('Sastrón te espera para la revancha')
                  );
                  return;
                }
                GANG.sastronTut = true;
                talk(
                  [
                    ['Sastrón', '¡Ay, mis costillas! Vale, vale... tienes buenas medidas. Y mejor puño. Estás a mi altura.'],
                    [
                      'Sastrón',
                      `¿Una banda? ¿Con El Blanco y el calvo? Puedo haceros ropa que ni en Milán... Pero mi talento vale ${SASTRON_FEE} pavos. Al contado. Las tijeras no aceptan Bizum.`
                    ]
                  ],
                  () => this.pay()
                );
              }
            });
          }
        );
      },
      pay() {
        if (active !== this) return;
        if (PLAYER.money < SASTRON_FEE) {
          DLG.show(
            'Sastrón',
            'No tienes suficiente',
            `Tienes <b>${eur(PLAYER.money)}</b> y Sastrón pide <b>${eur(SASTRON_FEE)}</b>.<br>Lo más rápido: el <b>Canarión</b> paga bien si le ganas una carrera en la Avenida de La Trinidad (círculo azul, opcional). También puedes reunirlo <b>peleando por la calle</b>, pero tardarás bastante más.`,
            '',
            ['Carrera con el Canarión (recomendado)', 'Lo reuniré peleando'],
            (i) => {
              DLG.hide();
              TRACKS.side.open = true;
              if (i === 0) setWaypoint(NPC.canarion.x, NPC.canarion.z, true);
              abort(
                i === 0 ? 'El Canarión te espera en la Avenida de La Trinidad (círculo azul)' : 'Vuelve a ver a Sastrón cuando tengas $' + SASTRON_FEE
              );
            }
          );
          return;
        }
        DLG.show(
          'Sastrón',
          '¿Pagas?',
          `Sastrón extiende la mano. Con la otra sujeta unas tijeras enormes y una cinta métrica que le cuelga del cuello.<br>Tienes <b>${eur(PLAYER.money)}</b>.`,
          '',
          [`Pagar ${eur(SASTRON_FEE)} y meterle en la banda`, 'Todavía no'],
          (i) => {
            DLG.hide();
            if (i !== 0) {
              abort('Sastrón seguirá ahí, hablando con sus tijeras');
              return;
            }
            PLAYER.money -= SASTRON_FEE;
            AUDIO.cash();
            TRACKS.side.open = false;
            talk(
              [
                [
                  'Sastrón',
                  '¡Trato hecho! Las tijeras dicen que eres de fiar, aunque vengas del talego. Os voy a hacer unos uniformes que vais a parecer de la Guardia Real... de Taco.'
                ],
                ['Sastrón', 'Boca Papa viene para acá. Firmamos aquí al lado, camino de La Trinidad. Ya me ha mandado un audio de doce minutos.']
              ],
              () => pass('Sastrón se une a la banda', 0)
            );
          }
        );
      },
      update() {}
    },
    {
      title: 'La firma de la banda',
      who: 'Boca Papa',
      hint() {
        return 'Reúnete con ' + bold('Boca Papa') + ' junto a ' + bold('La Trinidad') + ' para firmar la banda';
      },
      startPos() {
        return bandMeeting();
      },
      start() {
        step = 0;
        const b = NPC.boca;
        moveNPC(b, ...bandMeeting());
        const ring = [
          [NPC.blanco, 2.6, 0.4],
          [NPC.coco, 2.6, 1.9],
          [NPC.sastron, 2.6, 3.4]
        ];
        for (const [n, r, a] of ring) moveNPC(n, b.x + Math.cos(a) * r, b.z + Math.sin(a) * r, [b.x, b.z]);
        $('fade').style.opacity = 1;
        setTimeout(() => {
          $('fade').style.opacity = 0;
        }, 600);
        chat(
          'La firma de la banda',
          [
            [
              'Boca Papa',
              'Bueno, bueno... ¡ya estamos todos! La pandilla del barrio otra vez junta. Un boxeador calvo, un sastre que habla con sus tijeras, un militar que dice brrr, yo... y el jefe: Ayoze, el Chopa.'
            ],
            [
              'Rayco «El Blanco»',
              '«Brrr... mmm... ehhh... jefe... psss... ¡jefe! Mmm.»<br><i>Se pone firme. Es lo más parecido a un discurso que le has oído en treinta años.</i>'
            ],
            [
              'Boca Papa',
              'El Blanco dice que está muy contento. Y que va a montar la armería de la banda en el garaje de su madre. Cuando ella no mire.'
            ],
            ['Coco', 'Yo me encargo de que sepáis pelear. Y el primero que me diga «calvo» se lleva un sopapo.'],
            ['Sastrón', 'Y yo de que vayáis elegantes. Nadie respeta a una banda con chándal... con perdón, Blanco.'],
            [
              CH,
              'Escuchadme. Salí de la cárcel para hacer las cosas bien. Esto no es para robar a nadie: es para levantarnos. Para que en La Laguna se nos vuelva a respetar.'
            ],
            ['Boca Papa', 'Muy bonito, Chopa, se me caen las lágrimas. Ahora ponle nombre y firma aquí, en esta servilleta del bar.']
          ],
          () => {
            if (active !== this) return;
            // v0.62: the first option lets you type your own name (Jonay)
            const names = ['✎ Escribir mi propio nombre', 'La Banda del Barraquito', 'Los Guanches del Casco', 'Los Magos de Aguere'];
            const sign = (name) => {
              DLG.hide();
              GANG.formed = true;
              GANG.name = name;
              GANG.members = ['Boca Papa', 'Rayco «El Blanco»', 'Coco', 'Sastrón'];
              HUD.big(name.toUpperCase(), '#f5b72e', 6);
              MUSIC.jingle();
              setTimeout(
                () =>
                  talk(
                    [
                      ['Boca Papa', `¡${name}! Suena a leyenda. Tú eres el jefe, Chopa. Aquí empieza la historia.`],
                      ['Boca Papa', 'Pero antes una lección, que te veo flojo de la cárcel: un jefe tiene que comer. Ven a verme y te explico.']
                    ],
                    () => {
                      // everybody goes back to their spots; El Blanco to his parents' door
                      moveNPC(NPC.blanco, NPC.blanco.home[0], NPC.blanco.home[1]);
                      moveNPC(NPC.coco, NPC.coco.home[0], NPC.coco.home[1]);
                      moveNPC(NPC.sastron, NPC.sastron.home[0], NPC.sastron.home[1]);
                      pass('La banda está firmada', 500);
                    }
                  ),
                2500
              );
            };
            const pick = () =>
              DLG.show(
                'La firma de la banda',
                '¿Cómo se va a llamar la banda?',
                'Boca Papa saca un boli mordido. Todos te miran. El Blanco hace <b>brrr</b>.',
                'Elige el nombre:',
                names,
                (i) => {
                  if (i > 0) {
                    sign(names[i]);
                    return;
                  }
                  DLG.ask(
                    'La firma de la banda',
                    'Tu propio nombre',
                    'Boca Papa te pasa el boli y la servilleta. «Venga, jefe, que no tenemos toda la tarde.»',
                    'Escribe el nombre de la banda:',
                    'Los … de Aguere',
                    28,
                    sign
                  );
                }
              );
            pick();
          }
        );
      },
      update() {}
    },
    {
      title: 'Boca Papa te enseña a comer',
      who: 'Boca Papa',
      hint() {
        return 'Habla con ' + bold('Boca Papa') + ' junto a ' + bold('La Trinidad');
      },
      startPos() {
        return bandMeeting();
      },
      start() {
        step = 0;
        moveNPC(NPC.boca, ...bandMeeting());
        const s = FOOD.nearest(PLAYER.x, PLAYER.z);
        data.shop = s;
        talk([
          [
            'Boca Papa',
            'A ver, jefe. Las peleas, los porrazos de la Local y los golpes con el coche te quitan salud. Y la salud no vuelve sola: ¡hay que comer! De esto sé un rato, mírame.'
          ],
          [
            'Boca Papa',
            'Las tiendas de comida tienen una cruz roja encima, y en el mapa salen como cuadraditos rojos. Un bocata de pata te deja como nuevo.'
          ],
          [
            'Boca Papa',
            `Ve a ${s ? s.name : 'la tienda más cercana'} y cómete algo. Y luego pásate por casa de El Blanco, que dice que tiene algo para ti. Bueno, dice «brrr», pero yo le entiendo.`
          ]
        ]);
        if (s) {
          goto(s.x, s.z, 2.2, 0xe53935);
          setObjective(`Ve a ${bold(s.name)} y compra algo de comer (${CONTROLS.kbd('use')})`);
        }
      },
      onEvent(t) {
        if (t === 'ate' && step === 0) {
          step = 1;
          talk([['Boca Papa (gritando desde lejos)', '¡Eso es, Chopa! Barriga llena, jefe contento. ¡Y ahora ve a ver a El Blanco!']], () => {
            moveNPC(NPC.boca, ...NPC.boca.home);
            pass('Ya sabes recuperar salud', 50);
          });
        }
      },
      update() {}
    },
    {
      title: 'El campo de tiro de El Blanco',
      who: 'Rayco «El Blanco»',
      hint() {
        return 'Ve a ver a ' + bold('El Blanco') + ' a casa de sus padres';
      },
      startPos() {
        return [NPC.blanco.x + 1.2, NPC.blanco.z + 1.2];
      },
      start() {
        step = 0;
        const R = findRange(NPC.blanco.x, NPC.blanco.z);
        data.range = R;
        chat(
          'El campo de tiro de El Blanco',
          [
            [
              'Rayco «El Blanco»',
              '«Brrr... Chopa... mmm... ven... psss... ven.»<br><i>Mira a los lados. Abre el garaje de sus padres. Entre la lavadora vieja y las cajas de Navidad hay una caja de munición del ejército.</i>'
            ],
            [
              'Rayco «El Blanco»',
              '«Ahhh... esto... mmm... pistola... brrr. Seis... seis bolas.»<br><i>Te acompaña a un solar abandonado detrás de la casa. Coloca seis latas vacías encima de unos palés.</i>'
            ],
            [
              'Rayco «El Blanco»',
              '«Mmm... no... no es de verdad... psss. Bolas... plástico... aire... brrr... comprimido.»<br><i>Es una pistola de <b>bolas de plástico de aire comprimido</b>, una réplica de las de airsoft. Hace pupa y asusta, pero no mata. Eso sí: de lejos parece de verdad.</i>'
            ],
            [CH, 'Blanco, yo salí para reformarme... Pero vale. Por si acaso. Solo para defendernos.'],
            [
              'Rayco «El Blanco»',
              `«Mmm... apunta... brrr... ¡dispara!»<br><b>Controles:</b> ${document.body.classList.contains('touchmode') ? 'pulsa <b>APUNTAR</b> y luego <b>DISPARAR</b>; arrastra el dedo para mover la mira' : 'mantén <b>clic derecho</b> para apuntar y haz <b>clic izquierdo</b> para disparar'}.<br>Tienes que tirar <b>las 6 latas con 6 bolas</b>. Si fallas, El Blanco las vuelve a poner.`,
              'Al lío'
            ]
          ],
          () => {
            if (active !== this) return;
            if (PLAYER.car) exitCar();
            PLAYER.x = R.stand[0];
            PLAYER.z = R.stand[1];
            PLAYER.y = heightAt(PLAYER.x, PLAYER.z) + 0.2;
            CAM.yaw = Math.atan2(R.cans[2][0] - R.stand[0], R.cans[2][2] - R.stand[1]);
            CAM.pitch = 0.05;
            PLAYER.h = CAM.yaw;
            moveNPC(NPC.blanco, R.stand[0] + R.side[0] * 2.2, R.stand[1] + R.side[1] * 2.2, [R.cans[2][0], R.cans[2][2]]);
            giveWeapon(6, true);
            this.setCans();
            step = 1;
            setObjective('Tira ' + bold('las 6 latas') + ' · <span id="cansLeft">6</span> en pie');
            WEAPON.onHit = () => {
              const left = data.cans.filter((t) => !t.hit).length;
              const e = $('cansLeft');
              if (e) e.textContent = left;
              if (left === 0) this.won();
            };
            WEAPON.onShot = () => {
              if (step !== 1) return;
              setTimeout(() => {
                if (step === 1 && WEAPON.ammo <= 0 && data.cans.some((t) => !t.hit)) {
                  SUB.show(bold('El Blanco:') + ' «Brrr... ¡NO!... mmm... otra vez... psss.» (vuelve a colocar las latas)', 3);
                  setTimeout(() => step === 1 && this.resetCans(), 1800);
                }
              }, 400);
            };
          }
        );
      },
      resetCans() {
        this.setCans();
        WEAPON.ammo = 6;
        updateWeaponHUD();
        const e = $('cansLeft');
        if (e) e.textContent = 6;
      },
      setCans() {
        for (const t of data.cans || []) scene.remove(t.mesh);
        data.cans = [];
        // v1.2.4 (auditor: «crea geometría en código que corre cada fotograma»): the can's pieces are made once and
        // shared; every reset of the range only places new meshes
        const K = CAN_KIT;
        K.mat = K.mat || M(0xc0392b, 0.35, 0.6);
        K.top = K.top || M(0xdadada, 0.3, 0.8);
        for (const [x, y, z] of data.range.cans) {
          const g = new THREE.Group();
          const b = new THREE.Mesh(K.gb, K.mat);
          const t = new THREE.Mesh(K.gt, K.top);
          t.position.y = 0.085;
          g.add(b, t);
          g.position.set(x, y, z);
          scene.add(g);
          data.cans.push({ x, y, z, r: 0.13, mesh: g });
        }
        WEAPON.targets = data.cans;
      },
      won() {
        if (step !== 1) return;
        step = 2;
        WEAPON.onHit = WEAPON.onShot = null;
        WEAPON.targets = [];
        setTimeout(() => {
          for (const t of data.cans) scene.remove(t.mesh);
        }, 4000);
        takeWeapon();
        chat(
          'El campo de tiro de El Blanco',
          [
            [
              'Rayco «El Blanco»',
              '«¡Mmm! ¡Brrr! ¡Bien... bien!»<br><i>Aplaude dos veces, muy serio. Te da la pistola y una caja con seis bolas.</i>'
            ],
            [
              'Rayco «El Blanco»',
              '«Psss... cuidado... mmm... policía... muchos... brrr... rápidos.»<br><i>Lo ha entendido hasta un turista: aunque sea de bolas, sacar algo que parece un arma en la calle es <b>delito grave</b>. Si alguien te ve disparar, vendrá mucha más policía, con coches más rápidos, y costará mucho más despistarla. Sin pistola, a puñetazos (' +
                CONTROLS.kbd('punch') +
                ' / clic).</i>',
              'Entendido'
            ]
          ],
          () => {
            giveWeapon(6, false);
            pass('Tienes la pistola de El Blanco (6 bolas)', 0);
          }
        );
      },
      update() {}
    }
  ];
  // ===== the Canarión's time trial (story mission + repeatable rematch when you're short of money for Sastrón)
  // Place the grid downstream from the parked car, on the same directed carriageway.
  function canarionRunup() {
    const projection = GRAPH.nearestEdge(...NPC.canarion.road, 22);
    if (!projection) return null;
    const road = GRAPH.edges[projection.e];
    const forward = road.oneway || Math.sin(NPC.canarion.parkHeading) * projection.dx + Math.cos(NPC.canarion.parkHeading) * projection.dz >= 0;
    const distance = (forward ? projection.s : road.len - projection.s) + 17;
    if (distance > road.len - 8) return null;
    const grid = GRAPH.sample(road.i, forward ? 1 : -1, distance, 0, {});
    const points = [grid.x, grid.z];
    const order = forward ? road.cum.keys() : [...road.cum.keys()].reverse();
    for (const i of order) {
      const fromStart = forward ? road.cum[i] : road.len - road.cum[i];
      if (fromStart > distance + 0.05) points.push(road.pts[i * 2], road.pts[i * 2 + 1]);
    }
    return { points, node: forward ? road.b : road.a };
  }
  function tailorRaceRoute(from) {
    const [tx, tz] = NPC.sastron.home;
    const stops = [GRAPH.nearestNode(tx, tz, false), GRAPH.nearestNode(-114.5, 90, false), GRAPH.nearestNode(-153, 78, false)];
    let nearby = null;
    for (const end of new Set(stops)) {
      if (end < 0) continue;
      const stop = GRAPH.nodes[end];
      if (Math.hypot(stop.x - tx, stop.z - tz) > 95) continue;
      const direct = GRAPH.route(from, end);
      if (!nearby && direct?.length > 2) nearby = direct;
      for (const [x, z] of [
        [-437.5, 70],
        [-569, 33.5],
        [-249.5, 481]
      ]) {
        const node = GRAPH.nearestNode(x, z);
        const out = GRAPH.route(from, node),
          back = GRAPH.route(node, end);
        if (!out || !back || out.length < 4 || back.length < 4) continue;
        const seen = new Set();
        for (let i = 0; i < out.length; i += 2) seen.add(out[i] + ',' + out[i + 1]);
        const route = [...out];
        for (let i = 2; i < back.length; i += 2) {
          if (seen.has(back[i] + ',' + back[i + 1])) break;
          route.push(back[i], back[i + 1]);
        }
        if (route.length !== out.length + back.length - 2) continue;
        const distance = s2Path(route).tot;
        if (distance >= 750 && distance <= 1600) return route;
      }
    }
    return nearby;
  }
  function startRace(m, first) {
    const runup = canarionRunup();
    let { pts, cps } = startRacePart1(first, m, runup?.node);
    if (runup) pts = [...runup.points, ...pts.slice(2)];
    let acc = 0,
      nextAt = 300;
    for (let i = 2; i < pts.length; i += 2) {
      acc += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
      if (acc >= nextAt) {
        cps.push([pts[i], pts[i + 1]]);
        nextAt += 300;
      }
    }
    cps.push([pts[pts.length - 2], pts[pts.length - 1]]);
    data.cps = cps;
    data.start = [pts[0], pts[1]];
    data.pts = pts;
    data.cum = [0];
    for (let i = 2; i < pts.length; i += 2) data.cum.push(data.cum[data.cum.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
    data.L = acc;
  }
  /** (v1.1.7, code quality) part of startRace */
  function startRacePart1(first, m, startNode) {
    step = 0;
    data.first = first;
    if (first)
      talk([
        [
          'El Canarión',
          '¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.'
        ],
        ['El Canarión', 'Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.'],
        [
          'El Canarión',
          `Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas ${eur(SASTRON_FEE)}. Si pierdes, me invitas a unas papas arrugadas.`
        ],
        ['El Canarión', '¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.']
      ]);
    else talk([['El Canarión', "¿Otra vez por aquí, chicharrero? ¿Te falta dinero pa' tu sastre loco? Venga, revancha: si me ganas, 400 pavos."]]);
    setTimeout(() => {
      if (active === m && step === 0) setObjective('Súbete a un coche y ve a la ' + bold('salida') + ' junto al Canarión');
    }, 3000);
    const node = startNode === undefined ? null : GRAPH.nodes[startNode];
    const [sx, sz] = node ? [node.x, node.z] : NPC.canarion.road;
    const from = startNode ?? GRAPH.nearestNode(sx, sz);
    if (first || TRACKS.story.list[TRACKS.story.idx]?.title === 'Sastrón') {
      const pts = tailorRaceRoute(from);
      if (pts) {
        data.L = s2Path(pts).tot;
        return { pts, cps: [] };
      }
    }
    // v1.4.16: the course ends at the start of the line's next mission (the rematch: back here, a loop)
    const T = nextStart();
    let pts = T
      ? routeToward(sx, sz, T[0], T[1], 1700, 2900, (r) => {
          for (let i = 0; i < r.length; i += 4) if (worldEdgeDist(r[i], r[i + 1]) < 90) return false;
          return true;
        })
      : null;
    if (pts) {
      data.L = 0;
      for (let i = 2; i < pts.length; i += 2) data.L += Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]);
    }
    for (let k = 0; k < 40 && !pts; k++) {
      const a = Math.random() * Math.PI * 2,
        d = rnd(900, 1500);
      const to = GRAPH.nearestNode(sx + Math.cos(a) * d, sz + Math.sin(a) * d);
      const r = GRAPH.route(from, to);
      if (!r) continue;
      let edgeOk = true;
      for (let i = 0; i < r.length; i += 4)
        if (worldEdgeDist(r[i], r[i + 1]) < 90) {
          edgeOk = false;
          break;
        }
      if (!edgeOk) continue;
      let L = 0;
      for (let i = 2; i < r.length; i += 2) L += Math.hypot(r[i] - r[i - 2], r[i + 1] - r[i - 1]);
      if (L > 1700 && L < 2900) {
        pts = r;
        data.L = L;
      }
    }
    if (!pts) {
      pts = GRAPH.route(from, GRAPH.nearestNode(sx + 900, sz + 600)) || [sx, sz, sx + 600, sz + 400];
      data.L = 1500;
    }
    const cps = [];
    return { pts, cps };
  }
  function raceCP() {
    const c = data.cps[data.cp];
    const last = data.cp === data.cps.length - 1;
    goto(c[0], c[1], last ? 7 : 6, last ? 0xf5b72e : 0x46c3ff);
    ahead(data.cps, data.cp, data.pts);
    setObjective((last ? bold('¡META!') : `Control ${data.cp + 1}/${data.cps.length - 1}`) + ' · Gánale al Canarión');
  }
  function raceUpdate(m, dt) {
    if (step === 0) {
      if (PLAYER.car) {
        step = 1;
        goto(data.start[0], data.start[1], 5, 0x46c3ff);
        setObjective('Ve a la ' + bold('línea de salida'));
      }
      return;
    }
    if (step === 1) {
      if (!PLAYER.car) {
        step = 0;
        clearBeacon();
        setObjective('Súbete a un coche');
        return;
      }
      if (Math.hypot(PLAYER.x - data.goal[0], PLAYER.z - data.goal[1]) < 7 && PLAYER.car.speed < 2) {
        step = 2;
        clearBeacon();
        setObjective('El Canarión se pone a tu lado... ' + bold('¡preparados!'));
        // the Canarión's car on the grid, beside you
        {
          const p = data.pts,
            dx = p[2] - p[0],
            dz = p[3] - p[1],
            L = Math.hypot(dx, dz) || 1;
          const ox = (-dz / L) * 3,
            oz = (dx / L) * 3;
          const heading = Math.atan2(dx, dz);
          const startingCar = PLAYER.car;
          startingCar.h = CAM.yaw = heading;
          startingCar.vx = startingCar.vz = startingCar.fwdV = startingCar.yawRate = 0;
          let rc = NPC.canarionCar;
          if (!rc || rc.dead || rc === PLAYER.car) {
            rc = new Car(null, 0xffd200, 0, 0, 0, VMODELS.guancheGT || undefined);
          }
          rc.mode = 'race';
          rc.driver = 'race';
          rc.persist = true;
          rc.mission = true;
          rc.x = p[0] + ox;
          rc.z = p[1] + oz;
          rc.h = heading;
          rc.vx = rc.vz = 0;
          rc.fwdV = 0;
          data.rival = rc;
          data.rs = 0;
          data.D = null; // v1.4.22: the drivable line is made at the start
          data.rv = 0;
          data.roff = -3; // grid offset above is to the left of the route
        }
        ['3', '2', '1'].forEach((t, i) =>
          setTimeout(() => {
            if (active === m) {
              HUD.big(t, '#fff', 0.8);
              AUDIO.cash();
            }
          }, i * 1000)
        );
        setTimeout(() => {
          if (active !== m) return;
          HUD.big('¡YA!', '#7fe08a', 1.2);
          step = 3;
          data.cp = 0;
          raceCP();
        }, 3000);
      }
      return;
    }
    if (step === 3) {
      // the rival drives the route: fast on straights, brakes for bends, a little rubber band so the race stays tight
      {
        const rc = data.rival,
          p = data.pts,
          cum = data.cum,
          tot = cum[cum.length - 1];
        // player progress along the route (nearest checkpoint index as a proxy)
        const pS = data.cp > 0 ? Math.min(tot, data.cp * 300) : 0;
        // v1.4.22 (Jonay: «frenan muy rápido y trazan las curvas girando 90 grados»): the Canarión drives the drivable
        // line of 12f_story2.js (rounded corners, grip-limited bends, real braking, sliding the tail in tight ones)
        if (!data.D) {
          data.D = drivePlan(p, DRIVE_PROF.chase);
          data.D.pf = DRIVE_PROF.chase;
          data.rst = { s: data.rs, v: data.rv };
        }
        const gap = data.rst.s - pS;
        data.roff = lerp(data.roff, 1.6, dt * 0.3);
        driveOnPlan(rc, data.D, data.rst, dt, 28 * (gap > 120 ? 0.82 : gap < -120 ? 1.18 : 1), data.roff);
        data.rs = data.rst.s;
        data.rv = data.rst.v;
        if (data.rs >= data.D.tot - 1) {
          if (WANTED) {
          }
          talk([['El Canarión (por el móvil)', '¡Jajaja! ¡Llegué primero, chicharrero! Te espero con las papas arrugadas... que pagas tú.']]);
          rc.mode = 'physics';
          rc.driver = null;
          rc.ctl.brk = 1;
          fail('El Canarión ha llegado primero. ¡Revancha cuando quieras!');
          return;
        }
      }
      if (!PLAYER.car) {
        setObjective('¡Vuelve a un coche, que el Canarión no espera!');
        return;
      }
      const [gx, gz] = data.goal;
      if (Math.hypot(PLAYER.x - gx, PLAYER.z - gz) < 9) {
        data.cp++;
        AUDIO.cash();
        if (data.cp >= data.cps.length) {
          const left = Math.round(((data.D ? data.D.tot : data.cum[data.cum.length - 1]) - data.rs) / Math.max(8, data.rv));
          if (data.rival) {
            data.rival.mode = 'physics';
            data.rival.driver = null;
            data.rival.ctl.brk = 1;
          }
          if (data.first) {
            talk([
              ['El Canarión (por el móvil)', `¡Ños! ¿Me sacaste ${left} segundos? Toma, ${eur(SASTRON_FEE)}, bien ganados.`],
              ['El Canarión (por el móvil)', 'Sastrón está aquí al lado. Ve a llevarle el dinero.']
            ]);
            pass('Le has ganado al Canarión', SASTRON_FEE);
            if (TRACKS.story.list[TRACKS.story.idx]?.title === 'Sastrón') setWaypoint(...NPC.sastron.home, true);
          } else {
            talk([['El Canarión (por el móvil)', '¡Otra vez! Me vas a arruinar, chicharrero. Toma tus 400.']]);
            pass('Revancha ganada', 400, true);
            if (TRACKS.story.list[TRACKS.story.idx]?.title === 'Sastrón' && PLAYER.money >= SASTRON_FEE) {
              setWaypoint(...NPC.sastron.home, true);
            }
          }
          return;
        }
        raceCP();
      }
    }
  }
  // a clear spot near El Blanco's home: you stand there and six cans sit on pallets 9–13 m ahead
  function findRange(x, z) {
    for (let r = 6; r < 90; r += 4)
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2,
          sx = x + Math.cos(a) * r,
          sz = z + Math.sin(a) * r;
        if (inAnyBuilding(sx, sz) || onCarriageway(sx, sz, 1) || COL.nearSeg(sx, sz, 1.2)) continue;
        for (let j = 0; j < 12; j++) {
          const b = (j / 12) * Math.PI * 2,
            dx = Math.cos(b),
            dz = Math.sin(b),
            D = 11,
            ex = sx + dx * D,
            ez = sz + dz * D;
          if (
            COL.raycast(sx, sz, ex + dx * 2, ez + dz * 2) < 1 ||
            inAnyBuilding(ex, ez) ||
            onCarriageway(ex, ez, 2) ||
            Math.abs(heightAt(ex, ez) - heightAt(sx, sz)) > 2.5
          )
            continue;
          const px = -dz,
            pz = dx;
          let ok = true;
          for (const s of [-2.2, 2.2]) if (COL.raycast(sx, sz, ex + px * s, ez + pz * s) < 1) ok = false;
          if (!ok) continue;
          // pallets + cans
          const g = new THREE.Group();
          const wood = M(0x9b7a4f, 0.9);
          const y0 = heightAt(ex, ez);
          for (const s of [-1.6, 0, 1.6]) {
            const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 0.8), wood);
            p.position.set(ex + px * s, y0 + 0.425, ez + pz * s);
            p.rotation.y = Math.atan2(dx, dz);
            p.castShadow = true;
            g.add(p);
          }
          scene.add(g);
          COL.addSeg(ex + px * 2.3, ez + pz * 2.3, ex - px * 2.3, ez - pz * 2.3);
          const cans = [];
          for (let i = 0; i < 6; i++) {
            const s = -2.0 + i * 0.8;
            cans.push([ex + px * s - dx * 0.1, y0 + 0.93, ez + pz * s - dz * 0.1]);
          }
          return { stand: [sx, sz], cans, side: [px, pz] };
        }
      }
    const ex = x + 10,
      ez = z;
    const y0 = heightAt(ex, ez);
    return { stand: [x, z], cans: [0, 1, 2, 3, 4, 5].map((i) => [ex, y0 + 1, ez - 2 + i * 0.8]), side: [0, 1] };
  }
  // ===== repeatable side job: the Canarión's rematch, only while you're short of money for Sastrón
  // side track: the Canarión's race is optional (the recommended way to get Sastrón's money), then rematches
  const SIDE = [
    {
      title: 'Carrera con el Canarión',
      who: 'el Canarión',
      hint() {
        return 'Busca al ' + bold('Canarión') + ' en la ' + bold('Avenida de La Trinidad');
      },
      startPos() {
        return [NPC.canarion.x + 1.4, NPC.canarion.z + 1.4];
      },
      start() {
        startRace(this, true);
      },
      update(dt) {
        raceUpdate(this, dt);
      },
      nextCP() {
        raceCP();
      }
    },
    {
      title: 'Revancha con el Canarión',
      who: 'el Canarión',
      startPos() {
        return [NPC.canarion.x + 1.4, NPC.canarion.z + 1.4];
      },
      start() {
        startRace(this, false);
      },
      update(dt) {
        raceUpdate(this, dt);
      }
    }
  ];
  const OBISPO_LIST = []; // v0.65: the bishop's optional pack (12g_obispo.js), opens when the gang is signed (v1.4.22)
  const SECRETA_LIST = [],
    CARRERAS_LIST = []; // v0.76: el policía secreta (12k_agua.js) and the Canarión's car races
  const COPA_LIST = []; // v0.75: Copa Laguna de fútbol (12j_campos.js), opens after your first football game
  const TORNEO_LIST = []; // v0.66: Torneo Lagunero de baloncesto (12i_canchas.js), opens after your first basketball game
  const TRACKS = {
    story: { list: STORY, idx: 0, beacon: null, color: 0xf5b72e, css: '#f5b72e' },
    side: { list: SIDE, idx: 0, beacon: null, color: 0x5ec8ff, css: '#5ec8ff', open: false },
    obispo: { list: OBISPO_LIST, idx: 0, beacon: null, color: 0xb388ff, css: '#b388ff' },
    torneo: { list: TORNEO_LIST, idx: 0, beacon: null, color: 0xff9f43, css: '#ff9f43' },
    copa: { list: COPA_LIST, idx: 0, beacon: null, color: 0x26d07c, css: '#26d07c' },
    secreta: { list: SECRETA_LIST, idx: 0, beacon: null, color: 0xff5fa2, css: '#ff5fa2' /* v1.1.3: pink, apart from the orange of the Torneo */ },
    carreras: { list: CARRERAS_LIST, idx: 0, beacon: null, color: 0x00e5ff, css: '#00e5ff' }
  };
  const storyPast = (title) => {
    const i = STORY.findIndex((m) => m.title === title);
    return TRACKS.story.done || STORY_SKIP.has(title) || (i >= 0 && TRACKS.story.idx > i);
  };
  const trackOpen = (k) => (k === 'secreta' ? !!GANG.rifleTut : k === 'carreras' ? storyPast('El rally de La Esperanza') : true);
  // v1.4.22 (Jonay, 3-nov: «en ningún momento te dicen lo del obispo… deberíamos desbloquearlo ya cuando se firma la
  // banda; inventa alguna manera para que te lo presenten, sin tener que desbloquear al alcalde»): the bishop's pack opens
  // when the gang is signed (before: with the mayor's missions, and nobody said so), and the parish priest of La
  // Concepción phones to introduce him (obispoIntro below)
  const obispoOpen = () => {
    if (!NPC.obispo) return false;
    return GANG.formed || storyPast('La firma de la banda');
  };
  function obispoIntro() {
    if (GANG.obispoIntro || active || !obispoOpen() || TRACKS.obispo.idx > 0 || !TRACKS.obispo.list.length) return;
    GANG.obispoIntro = true;
    setTimeout(() => {
      // (v1.4.47, Jonay: «no debería llamar mientras conduces»: it waits until you are on foot)
      if (active || GAME.state !== 'play' || PLAYER.car || TALK.cur || (DLG && DLG.open)) {
        GANG.obispoIntro = false;
        return;
      }
      AUDIO.cash && AUDIO.cash();
      talk(
        [
          [
            'Don Celestino, párroco de La Concepción (por el móvil)',
            '¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.'
          ],
          [
            'Don Celestino, párroco de La Concepción (por el móvil)',
            'El señor Obispo, Monseñor Fermín Truchas, anda buscando gente joven y despierta para unos encarguitos de la diócesis. Partidos benéficos, alguna cosilla más...'
          ],
          [
            'Don Celestino, párroco de La Concepción (por el móvil)',
            'Pasaos por el Obispado, en la Casa Salazar de la calle San Agustín. Os lo marco en el mapa. ¡Y portaos, que os conozco!'
          ],
          [CH, 'Un obispo pidiéndonos favores... Esto se pone serio, mi niño.']
        ],
        () => {
          const o = NPC.obispo;
          if (o) {
            setWaypoint(o.x, o.z, true);
            HUD.toast('Nuevas misiones: el Obispo (morado en el mapa)', '#b388ff', 6);
          }
        }
      );
      if (TALK.cur) TALK.cur.onCancel = () => (GANG.obispoIntro = false); // (cut half-way: he calls again)
    }, 2500);
  }
  function placeStarts() {
    while (TRACKS.story.idx < STORY.length && STORY_SKIP.has(STORY[TRACKS.story.idx].title)) TRACKS.story.idx++;
    for (const k in TRACKS) {
      const tr = TRACKS[k];
      if (tr.beacon) {
        BEACON.free(tr.beacon);
        tr.beacon = null;
      }
      if (active || tr.idx >= tr.list.length) continue;
      if (k === 'side' && (!tr.open || PLAYER.money >= SASTRON_FEE)) continue;
      if (k === 'obispo' && !obispoOpen()) continue;
      if (k === 'torneo' && !GANG.basketTut) continue;
      if (k === 'copa' && !GANG.futbolTut) continue;
      if (!trackOpen(k)) continue;
      {
        const m = tr.list[tr.idx];
        if (m.requires && !m.requires()) continue;
      }
      const sp = ringClear(...tr.list[tr.idx].startPos(), 1.4);
      tr.beacon = BEACON.make(sp[0], sp[1], 1.4, 3, tr.color);
      if (k === 'story' && !active) {
        const h = tr.list[tr.idx].hint;
        if (h) setObjective('Siguiente: ' + h());
        setWaypoint(sp[0], sp[1], true);
      }
    }
    obispoIntro();
    if (TRACKS.story.idx >= STORY.length && !TRACKS.story.done) {
      TRACKS.story.done = true;
      setObjective(null);
      HUD.big((GANG.name || 'TU BANDA').toUpperCase(), '#f5b72e', 5);
      HUD.toast('Ya puedes moverte libremente por La Laguna. La historia continuará…', '#f5b72e', 8);
    }
  }
  // El Blanco → La Concepción → Café Brasilito → Calle el Juego → La Trinidad.
  function openingStops() {
    const cafe = INTERIORS.find((i) => i.id === 'cafe');
    const sastre = safeSpot(-170, 82, 1);
    if (!cafe) return { coco: safeSpot(-249, -248, 1), sastre };
    const { x, z, nx, nz } = cafe.door;
    const side = (sastre[0] - x) * nz - (sastre[1] - z) * nx > 0 ? 1 : -1;
    return { coco: safeSpot(x + nx * 3 + nz * side * 16, z + nz * 3 - nx * side * 16, 0.9), sastre };
  }
  // The signing and the food lesson take place near the tailor, towards the avenue.
  function bandMeeting() {
    const [x, z] = NPC.sastron.home;
    const [a, b] = safeSpot(x + 13, z + 7, 1.1);
    return openSpotNear(a, b, 0);
  }
  function mkNPC(o, x, z, extra) {
    const h = makeHuman(o);
    let [a, b] = safeSpot(x, z, 0.8);
    if (parkedNear(a, b, 4.5).length)
      for (let r = 3; r < 60; r += 2) {
        let ok = false;
        for (let k = 0; k < 16; k++) {
          const q = safeSpot(x + Math.cos((k / 16) * 6.283) * r, z + Math.sin((k / 16) * 6.283) * r, 0.8);
          if (!parkedNear(q[0], q[1], 4.5).length && !onCarriageway(q[0], q[1], 0.5)) {
            [a, b] = q;
            ok = true;
            break;
          }
        }
        if (ok) break;
      }
    const r = COL.resolve(a, b, 0.6);
    h.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z);
    h.root.rotation.y = Math.random() * 6;
    scene.add(h.root);
    if (extra) extra(h);
    return { x: r.x, z: r.z, H: h, home: [r.x, r.z] };
  }
  // toolkit for the missions defined in other files (12f_story2.js): they are appended to STORY
  // v1.4.16 (Jonay, 17-nov: «el comienzo y final de la misión en una zona fijada, pero que vaya en un sentido que nos
  // acerque a la siguiente... la idea es ir recorriendo la ciudad con las misiones»): where the next mission of the same
  // line starts (null if it is the last one). Routes made during a mission (chases, races, escapes: s2Route, the
  // Canarión's race) end as near to it as they can.
  function nextStart(k = activeTrack, idx) {
    const tr = k && TRACKS[k];
    if (!tr) return null;
    for (let i = (idx ?? tr.idx) + 1; i < tr.list.length; i++) {
      const m = tr.list[i];
      if (k === 'story' && STORY_SKIP.has(m.title)) continue;
      try {
        return m.startPos();
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  const KIT = {
    nextStart,
    talk,
    chat,
    goto,
    clearBeacon,
    ahead,
    track(x, z, r = 6) {
      clearBeacon();
      data.goal = [x, z, r];
      updateGPS(true);
    } /* a moving goal (a car to follow): yellow blip + GPS route, no light column */,
    setObjective,
    pass,
    fail,
    abort,
    moveNPC,
    mkNPC,
    bold,
    CH,
    GANG,
    findRange,
    isActive: (m) => active === m,
    get data() {
      return data;
    },
    setTimer(t) {
      timer = t;
    },
    get timer() {
      return timer;
    }
  };
  return {
    kit: KIT,
    addStory(list) {
      STORY.push(...list);
    },
    addObispo(list) {
      OBISPO_LIST.push(...list);
    },
    addTorneo(list) {
      TORNEO_LIST.push(...list);
    },
    addCopa(list) {
      COPA_LIST.push(...list);
    },
    addSecreta(list) {
      SECRETA_LIST.push(...list);
    },
    addCarreras(list) {
      CARRERAS_LIST.push(...list);
    },
    initMissions() {
      // Rayco «El Blanco», at his parents' door next to the start
      {
        const b = makeHuman({
          skin: 0xf6dcc8,
          shirt: 0xf4f4f4,
          pants: 0x9a9a9a,
          hair: 0x3b2a1e,
          shoes: 0x333333,
          scale: 1.09,
          female: false,
          thin: true,
          longPants: true,
          beard: false,
          hairStyle: 'Hair_Buzzed',
          hd: true,
          sleeve: false,
          glasses: 'round',
          belt: false,
          sole: 0x1a1a1a,
          shoes: 0x2f3b55,
          watch: 0x2f3a2a
        });
        // v1.4.16: next to the player, on ground he can walk straight to (before: 4 m away even if behind a wall)
        let p = reachNear(PLAYER.x, PLAYER.z) || safeSpot(PLAYER.x + 4, PLAYER.z + 1.5);
        const r = COL.resolve(p[0], p[1], 0.5);
        NPC.blanco = { x: r.x, z: r.z, H: b, home: [r.x, r.z], from: [PLAYER.x, PLAYER.z] };
        b.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z);
        b.root.rotation.y = Math.atan2(PLAYER.x - r.x, PLAYER.z - r.z);
        scene.add(b.root);
      }
      // Boca Papa, sitting at the foot of La Concepción's tower
      {
        const h = makeHuman({
          skin: 0xb5815e,
          shirt: 0x5b5040,
          pants: 0x3a3328,
          hair: 0xa9a9a9,
          shoes: 0x2a2018,
          scale: 0.98,
          female: false,
          beard: true,
          sleeve: true,
          longPants: true,
          hairStyle: 'Hair_Long',
          hd: true,
          jacket: 0x5a4630,
          beanie: 0x6b2d2d,
          bag: 0x4a5a3a,
          sole: 0x3a3a3a,
          fat: true
        });
        h.pose = 'sit';
        const box = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 0.7), M(0xa98a5a, 0.95));
        box.position.set(0, -0.15, 0.45);
        // he sits on an upturned fruit crate, back against the tower
        const wood = M(0x9a7448, 0.9),
          dark = M(0x5e4429, 0.9);
        const crate = new THREE.Group();
        for (let i = 0; i < 4; i++) {
          const sl = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.075, 0.42), wood);
          sl.position.y = 0.05 + i * 0.105;
          crate.add(sl);
        }
        for (const sx of [-1, 1])
          for (const sz of [-1, 1]) {
            const po = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 0.05), dark);
            po.position.set(sx * 0.255, 0.21, sz * 0.185);
            crate.add(po);
          }
        crate.position.set(0, -0.12, -0.12);
        const tw = CONC_TOWER.tw;
        let bx = CONC_TOWER.x,
          bz = CONC_TOWER.z,
          face = Math.random() * 6;
        if (tw) {
          const nx = CONC_TOWER.x - tw.x,
            nz = CONC_TOWER.z - tw.z,
            nl = Math.hypot(nx, nz) || 1;
          bx = tw.x + (nx / nl) * (tw.w / 2 + 2.8);
          bz = tw.z + (nz / nl) * (tw.w / 2 + 2.8);
          /* outside the iron fence at the foot of the tower */ face = Math.atan2(nx, nz);
        }
        const sp0 = safeSpot(bx, bz, 0.6);
        const r = COL.resolve(sp0[0], sp0[1], 0.6);
        NPC.boca = { x: r.x, z: r.z, H: h, home: [r.x, r.z] };
        NPC.boca.start = openSpotNear(r.x, r.z, tw ? Math.atan2(r.x - tw.x, r.z - tw.z) : 0);
        h.root.position.set(r.x, heightAt(r.x, r.z) + 0.17, r.z);
        h.root.add(box);
        h.root.add(crate);
        h.root.rotation.y = face;
        scene.add(h.root);
        COL.addCirc(r.x, r.z, 0.5);
      }
      const stops = openingStops();
      const sc = { p: stops.coco, n: 'el Café Brasilito' };
      const ss = { p: stops.sastre, n: 'la calle el Juego, junto a La Trinidad' };
      // Coco: bald ex-boxer, sleeps rough
      NPC.coco = mkNPC(
        {
          skin: 0xd9a27e,
          shirt: 0x7d7f6a,
          pants: 0x4b4a3f,
          hair: 0x6b5b4b,
          shoes: 0x3a2f25,
          scale: 1.0,
          female: false,
          beard: true,
          sleeve: true,
          longPants: true,
          hairStyle: null,
          hd: true,
          jacket: 0x5d4b3a,
          bag: 0x3f4c56,
          sole: 0x222222
        },
        sc.p[0],
        sc.p[1],
        (h) => {
          const cb = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.8), M(0xb08d5a, 0.95));
          cb.position.set(0.9, 0.02, 0);
          h.root.add(cb);
          const sb = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.4, 10), M(0x2f5f3a, 0.8));
          sb.rotation.z = Math.PI / 2;
          sb.position.set(0.9, 0.22, 0.1);
          h.root.add(sb);
          const gl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), M(0xb3261e, 0.6));
          gl.position.set(0.55, 0.06, 0.35);
          h.root.add(gl);
          const gl2 = gl.clone();
          gl2.position.x = 0.7;
          h.root.add(gl2);
        }
      ); // old boxing gloves
      NPC.coco.place = sc.n;
      // Sastrón: ex-tailor gone mad, patchwork clothes and a measuring tape
      NPC.sastron = mkNPC(
        {
          skin: 0xe2b48f,
          shirt: 0x8e3b8a,
          pants: 0x2f6f8f,
          hair: 0xd9d9d9,
          shoes: 0x7a3b1e,
          scale: 0.97,
          female: false,
          beard: true,
          sleeve: false,
          longPants: true,
          hairStyle: 'Hair_Long',
          hd: true,
          jacket: 0xc77d2a,
          glasses: 'round',
          beanie: 0x2e8b57,
          sole: 0xd8d8d8,
          bag: 0x9a2a2a
        },
        ss.p[0],
        ss.p[1],
        (h) => {
          const tape = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.55, 0.012), M(0xf2c12e, 0.6));
          tape.position.set(0.09, -0.36, 0.11);
          h.head.add(tape);
          const t2 = tape.clone();
          t2.position.x = -0.09;
          h.head.add(t2);
          const pile = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.6), M(0x9c5ea8, 0.9));
          pile.position.set(-0.9, 0.18, 0.1);
          h.root.add(pile);
          const dummy = new THREE.Group();
          const tor = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.13, 0.6, 10), M(0xe8dcc0, 0.8));
          tor.position.y = 1.2;
          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6), M(0x3a3a3a, 0.5));
          pole.position.y = 0.45;
          dummy.add(tor, pole);
          dummy.position.set(0.9, 0, -0.2);
          h.root.add(dummy);
        }
      );
      NPC.sastron.place = ss.n;
      // El Canarión: Gran Canaria swagger, yellow & blue, next to his car on Avenida de La Trinidad
      {
        const pt = centroidOfNamedWays('Avenida de La Trinidad') || [200, 600];
        const rd = ROADSEG.nearest(pt[0], pt[1], (r) => r[0] <= 12 && !(r[3] & 6));
        const rx = rd ? rd.x : pt[0],
          rz = rd ? rd.z : pt[1];
        const L = rd ? Math.hypot(rd.dx, rd.dz) || 1 : 1,
          ux = rd ? rd.dx / L : 1,
          uz = rd ? rd.dz / L : 0;
        const w = rd ? DATA.R[rd.ri][2] : 8;
        let sd = 1;
        {
          const tx = rx - uz * (w / 2 + 3),
            tz = rz + ux * (w / 2 + 3);
          if (onCarriageway(tx, tz, 1.2) || inAnyBuilding(tx, tz)) sd = -1;
        } // v0.68: twin carriageways: the pavement, not the other road (auditor)
        NPC.canarion = mkNPC(
          {
            skin: 0xc98e64,
            shirt: 0xffd200,
            pants: 0x1d4f9c,
            hair: 0x111111,
            shoes: 0xf2f2f2,
            scale: 1.04,
            female: false,
            beard: false,
            sleeve: false,
            longPants: true,
            hairStyle: 'Hair_SimpleParted',
            hd: true,
            glasses: 'sun',
            chain: true,
            watch: 0xd9b44a,
            sole: 0x1d4f9c
          },
          rx - uz * (w / 2 + 3) * sd,
          rz + ux * (w / 2 + 3) * sd
        );
        NPC.canarion.road = [rx - uz * (w / 4) * sd, rz + ux * (w / 4) * sd];
        const m = VMODELS && VMODELS.guancheGT;
        const cx = rx - uz * (w / 2 - 1.2) * sd + ux * 5,
          cz = rz + ux * (w / 2 - 1.2) * sd + uz * 5;
        NPC.canarion.parkHeading = Math.atan2(ux, uz);
        NPC.canarion.parkAt = [cx, cz]; // v1.4.42: where his car is parked (prueba_prologo_1427)
        const car = new Car(m ? null : 'sport', 0xffd200, cx, cz, NPC.canarion.parkHeading, m || undefined);
        car.driver = null;
        car.mode = 'physics';
        car.persist = true;
        car.ctl.brk = 1;
        NPC.canarionCar = car;
      }
      for (const k of ['blanco', 'coco', 'sastron', 'canarion']) COL.addCirc(NPC[k].x, NPC[k].z, 0.4);
      FOOD.initFood();
      if (typeof story2Init === 'function') story2Init();
      if (typeof obispoInit === 'function') obispoInit();
      if (typeof canchasInit === 'function') {
        try {
          canchasInit();
        } catch (e) {
          console.warn('canchas', e);
        }
      }
      if (typeof secretaInit === 'function') {
        try {
          secretaInit();
        } catch (e) {
          console.warn('secreta', e);
        }
      } // v0.76
      placeStarts();
    },
    update(dt) {
      for (const k of ['blanco', 'boca', 'coco', 'sastron', 'canarion', 'alcalde', 'secreta']) {
        const n = NPC[k];
        if (n && n.H) animHuman(n.H, dt, 0);
      }
      if (NPC.blanco) NPC.blanco.H.head.rotation.y = Math.sin(performance.now() / 1300) * 0.3;
      FOOD.update(dt);
      if (typeof story2Tick === 'function') story2Tick(dt);
      BEACON.anim(beacon, dt);
      for (const k in TRACKS) BEACON.anim(TRACKS[k].beacon, dt);
      if (!active && !PLAYER.car && !DLG.open) {
        let bk = null,
          bd = 2; /* the nearest circle wins when two are close */
        for (const k in TRACKS) {
          const tr = TRACKS[k];
          if (!tr.beacon || tr.idx >= tr.list.length) continue;
          const d = Math.hypot(PLAYER.x - tr.beacon.position.x, PLAYER.z - tr.beacon.position.z);
          if (d < bd) {
            bd = d;
            bk = k;
          }
        }
        if (bk) begin(TRACKS[bk].list[TRACKS[bk].idx], bk);
      }
      if (active) {
        if (timer > 0) {
          timer -= dt;
          const t = $('mtimer');
          if (t) t.textContent = Math.floor(timer / 60) + ':' + String(Math.floor(timer % 60)).padStart(2, '0');
          if (timer <= 0) {
            fail(/Canarión/.test(active.title) ? '¡El Canarión sigue siendo el más rápido! Vuelve a intentarlo.' : 'Se acabó el tiempo.');
            return;
          }
        }
        if (active) active.update(dt);
      }
    },
    onEvent(t, d) {
      if (!active) return;
      if (t === 'enter' && active.gotCar) active.gotCar();
      if (active.onEvent) active.onEvent(t, d);
    },
    wantsBottle() {
      return !!(active && active.wantsBottle && active.wantsBottle());
    },
    target() {
      return active && data.goal ? data.goal : null;
    },
    diaryDestination(key, index) {
      const tr = TRACKS[key],
        m = tr?.list[index];
      if (!m || index !== tr.idx || tr.done || (key === 'story' && STORY_SKIP.has(m.title))) return null;
      const position = active === m && data.goal ? data.goal : tr.beacon ? [tr.beacon.position.x, tr.beacon.position.z] : m.startPos?.();
      return position && position.slice(0, 2).every(Number.isFinite) ? [position[0], position[1], tr.css] : null;
    },
    aheadPath() {
      return active && data.aheadPath ? data.aheadPath : null;
    },
    aheadPts() {
      return active && data.ahead ? data.ahead : null;
    },
    isRace() {
      return !!(active && data.race);
    },
    blips() {
      const b = [];
      for (const k in TRACKS) {
        const tr = TRACKS[k];
        if (tr.beacon) b.push([tr.beacon.position.x, tr.beacon.position.z, tr.css]);
      }
      if (active && data.goal) b.push([data.goal[0], data.goal[1], MAP_MARK.objective]);
      if (active && typeof s2Blips === 'function') b.push(...s2Blips());
      b.push(...MALEANTES.blips());
      return b;
    },
    prompt() {
      if (active || PLAYER.car) return '';
      for (const k in TRACKS) {
        const tr = TRACKS[k];
        if (tr.beacon && Math.hypot(PLAYER.x - tr.beacon.position.x, PLAYER.z - tr.beacon.position.z) < 6)
          return 'Acércate al círculo para hablar con ' + bold(tr.list[tr.idx].who);
      }
      return '';
    },
    fail(r, noRetry) {
      if (active) {
        if (WEAPON.training) takeWeapon();
        fail(r, noRetry);
      }
    },
    _story: STORY,
    refresh() {
      if (!active) placeStarts();
    },
    // the mission diary (12h_diario.js): every track, its missions and their state; the log; restart from a mission
    diary() {
      const NAMES = {
        story: 'Historia',
        side: 'El Canarión',
        obispo: 'El Obispo',
        torneo: 'Torneo Lagunero',
        copa: 'Copa Laguna',
        secreta: 'El Secreta',
        carreras: 'Carreras del Canarión'
      };
      return Object.keys(TRACKS).map((k) => {
        const tr = TRACKS[k];
        const locked =
          (k === 'obispo' && !obispoOpen()) ||
          (k === 'torneo' && !GANG.basketTut) ||
          (k === 'copa' && !GANG.futbolTut) ||
          !trackOpen(k) ||
          (k === 'side' && !tr.open && tr.idx === 0);
        return {
          key: k,
          name: NAMES[k] || k,
          css: tr.css,
          locked,
          list: tr.list.map((m, i) => ({
            title: m.title,
            who: m.who || '',
            state:
              active === m
                ? 'activa'
                : i < tr.idx || (k === 'story' && (tr.done || STORY_SKIP.has(m.title)))
                  ? 'hecha'
                  : i === tr.idx
                    ? 'siguiente'
                    : 'pendiente',
            hint: i === tr.idx && m.hint ? m.hint() : ''
          }))
        };
      });
    },
    log(title) {
      return (LOG[title] || []).slice().reverse();
    }, // newest first
    logAll() {
      const out = [];
      for (const k in LOG) for (const q of LOG[k]) out.push([q[0], q[1], q[2] || 0, k]);
      return out.sort((a, b) => b[2] - a[2]);
    },
    logLine,
    LOOSE,
    resetFrom(k, i) {
      const tr = TRACKS[k],
        mission = tr?.list[i];
      if (!mission || active === mission || !(i < tr.idx || (k === 'story' && (tr.done || STORY_SKIP.has(mission.title))))) return false;
      if (active) {
        try {
          if (WEAPON.training) takeWeapon();
        } catch (e) {}
        finish();
      }
      for (let j = i; j < tr.list.length; j++) {
        delete LOG[tr.list[j].title];
        if (k === 'story') STORY_SKIP.delete(tr.list[j].title);
      }
      tr.idx = i;
      if (k === 'story') tr.done = false;
      if (k === 'obispo' && i === 0) GANG.basketTut = false;
      if (k === 'obispo' && i <= 1) GANG.futbolTut = false; // (v1.4.47: the football tutorial is the 2nd)
      if (k === 'side' && i === 0) tr.open = false;
      setObjective(null);
      placeStarts();
      return true;
    },
    nextStart,
    // v1.4.16, for the tests: from each mission's start, a 900-2200 m route towards the next one of its line: how far from it it ends
    routeCheck() {
      const out = [];
      for (const k in TRACKS)
        TRACKS[k].list.forEach((m, i) => {
          let s = null;
          try {
            s = m.startPos();
          } catch (e) {}
          const T = nextStart(k, i);
          if (!s || !T) return;
          const r = routeToward(s[0], s[1], T[0], T[1], 900, 2200);
          const D = Math.hypot(T[0] - s[0], T[1] - s[1]);
          out.push({
            line: k,
            title: m.title,
            D: Math.round(D),
            end: r ? Math.round(Math.hypot(r[r.length - 2] - T[0], r[r.length - 1] - T[1])) : null
          });
        });
      return out;
    },
    // v1.4.23: where every mission of every line starts (for the map of the missions, tests/herramientas/mapa_misiones.py)
    startsMap() {
      const out = {};
      for (const k in TRACKS)
        out[k] = TRACKS[k].list.map((m) => {
          let s = null;
          try {
            s = m.startPos();
          } catch (e) {}
          return { title: m.title, who: m.who || '', s: s ? [Math.round(s[0]), Math.round(s[1])] : null };
        });
      return out;
    },
    // v1.4.16: where a line's next mission circle is
    beaconPos(k = 'story') {
      const b = TRACKS[k] && TRACKS[k].beacon;
      return b ? [b.position.x, b.position.z] : null;
    },
    blancoCheck() {
      const b = NPC.blanco;
      if (!b || !b.from) return null;
      return {
        from: b.from,
        at: [b.x, b.z],
        walk: clearWalk(b.from[0], b.from[1], b.x, b.z),
        ring: clearWalk(b.from[0], b.from[1], b.x + 1.2, b.z + 1.2)
      };
    },
    _setIdx(i, track = 'story') {
      TRACKS[track].idx = i;
      placeStarts();
    },
    // save / load: which missions are done, the gang, tutorial flags (a mission in progress restarts from its beginning)
    getState() {
      return {
        v: 4, // v1.4.47: the bishop's missions in a new order (basket, football, basket, football)
        story: TRACKS.story.idx,
        skip: [...STORY_SKIP],
        storyDone: !!TRACKS.story.done,
        side: TRACKS.side.idx,
        sideOpen: !!TRACKS.side.open,
        obispo: TRACKS.obispo.idx,
        torneo: TRACKS.torneo.idx,
        copa: TRACKS.copa.idx,
        secreta: TRACKS.secreta.idx,
        carreras: TRACKS.carreras.idx,
        log: LOG,
        gang: { ...GANG, members: GANG.members.slice() } /* v0.76: every flag of the gang (jugueterías, maleantes, secreta…) */,
        active: active ? active.title : null
      };
    },
    setState(st) {
      if (active) {
        try {
          if (WEAPON.training) takeWeapon();
        } catch (e) {}
        finish();
      }
      TRACKS.story.idx = (st.story | 0) - (!st.v && (st.story | 0) >= 3 ? 1 : 0); /* v1 saves had the Canarión race inside the story */
      STORY_SKIP.clear();
      if ((st.v | 0) >= 3) for (const t of st.skip || []) STORY_SKIP.add(t);
      else {
        /* v ≤ 2: the index counts in the old order; the first old mission not done is where you go on, the done ones after it in the new order are skipped */ const n =
            TRACKS.story.idx,
          done = new Set(STORY_V2.slice(0, n));
        let i = 0;
        while (i < STORY.length && done.has(STORY[i].title)) i++;
        TRACKS.story.idx = n >= STORY_V2.length ? n : i;
        for (let j = i; j < STORY.length; j++) if (done.has(STORY[j].title)) STORY_SKIP.add(STORY[j].title);
      }
      TRACKS.story.done = !!st.storyDone && TRACKS.story.idx >= STORY.length;
      /* older saves finished a shorter story: carry on with the new missions */ TRACKS.side.idx = !st.v && (st.story | 0) >= 3 ? 1 : st.side | 0;
      // (saves before v4 had basket, basket, football, football: who had done the two baskets plays the football tutorial now)
      TRACKS.obispo.idx = (st.v | 0) < 4 && (st.obispo | 0) === 2 ? 1 : st.obispo | 0;
      TRACKS.torneo.idx = st.torneo | 0;
      TRACKS.copa.idx = st.copa | 0;
      TRACKS.secreta.idx = st.secreta | 0;
      TRACKS.carreras.idx = st.carreras | 0;
      for (const k in LOG) delete LOG[k];
      Object.assign(LOG, st.log || {});
      TRACKS.side.open = !!st.sideOpen;
      Object.assign(GANG, {
        formed: !!(st.gang && st.gang.formed),
        name: (st.gang && st.gang.name) || '',
        members: (st.gang && st.gang.members) || [],
        sastronTut: !!(st.gang && st.gang.sastronTut),
        defenders: !!(st.gang && st.gang.defenders),
        patrol: !!(st.gang && st.gang.patrol),
        basketTut: !!(st.gang && st.gang.basketTut),
        futbolTut: !!(st.gang && st.gang.futbolTut),
        jugueterias: !!(st.gang && st.gang.jugueterias),
        maleIntro: !!(st.gang && st.gang.maleIntro),
        rifleTut: !!(st.gang && st.gang.rifleTut)
      });
      // v0.83: the arcades (hi-scores, El Blanco's call, what you bought) and the homes were not restored on loading
      for (const k of ['arcade', 'casa']) {
        if (st.gang && st.gang[k]) GANG[k] = JSON.parse(JSON.stringify(st.gang[k]));
        else delete GANG[k];
      }
      setObjective(null);
      placeStarts();
      window.__missionResumed = st.active || null;
      if (st.active)
        setTimeout(
          () => HUD.toast('La misión «' + st.active + '» se guardó a medias: empieza de nuevo en su círculo', '#f5b72e', 6),
          3500
        ); /* after the radio hint of the car you load in */
    },
    currentTitle() {
      const tr = TRACKS.story;
      return tr.idx < tr.list.length ? tr.list[tr.idx].title || '' : 'Historia completada';
    },
    get active() {
      return active;
    },
    get gang() {
      return GANG;
    }
  };
})();
