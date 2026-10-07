// ============ save / load: 3 manual slots + an automatic one (after every mission and every few minutes), export/import as a file
const SAVE = (() => {
  const KEY = 'jeta_save_', SLOTS = ['auto', '1', '2', '3'], VER = 1;
  let ui = null, mode = 'save', autoT = 0;
  const store = { get(k) { try { const s = localStorage.getItem(KEY + k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); return true; } catch (e) { return false; } }, del(k) { try { localStorage.removeItem(KEY + k); } catch (e) { } } };
  // ---- snapshot of everything that matters
  function snapshot(label) {
    const P = PLAYER; let x = P.x, z = P.z, h = P.h;
    if (P.interior && P.lastDoor) { const d = P.lastDoor; x = d.x + d.nx * 2.2; z = d.z + d.nz * 2.2; h = Math.atan2(d.nx, d.nz); } // inside a building: save at its door
    const car = P.car ? { type: P.car.type, model: P.car.model ? P.car.model.id : null, color: P.car.color, h: P.car.h, x: P.car.x, z: P.car.z } : null;
    return { v: VER, t: Date.now(), label: label || '', player: { x, z, h, health: Math.max(1, Math.round(P.health)), money: P.money }, car,
      weapon: { has: WEAPON.has && !WEAPON.training, ammo: WEAPON.ammo, out: !!WEAPON.out }, tod: GAME.tod, weather: GAME.weather ?? null,
      missions: MISSIONS.getState(), mission: MISSIONS.currentTitle(), radio: MUSIC.station ? MUSIC.station.name : null, radioChanges: MUSIC.changes | 0,
      fights: (() => { try { return +localStorage.getItem('gtall_fights') || 0; } catch (e) { return 0; } })() };
  }
  function apply(s) {
    if (!s || !s.player) return false;
    const T = (f) => { try { f(); } catch (e) { console.error('load', e); } };
    T(() => { if (FIGHT2D.running) return; if (PLAYER.car) { const c = PLAYER.car; exitCar(); c.driver = null; } });
    T(() => WANTED.reset());
    T(() => { if (DLG.open) DLG.hide(); if (window.__TALK) window.__TALK.cur = null; $('sub').classList.remove('talking'); });
    T(() => MISSIONS.setState(s.missions || {}));
    const P = PLAYER; P.interior = null; P.low = null; P.dead = false; P.down = 0; P.vy = 0; P.onGround = true; P.onDeck = false;
    P.health = clamp(s.player.health || 100, 1, 100); P.money = s.player.money | 0;
    T(() => { const r = COL.resolve(s.player.x, s.player.z, 0.4); P.x = r.x; P.z = r.z; P.h = s.player.h || 0; CAM.yaw = P.h + Math.PI; const lw = lowAt(P.x, P.z, heightAt(P.x, P.z) - 3); P.y = heightAt(P.x, P.z) + 0.2; });
    T(() => { if (s.weapon && s.weapon.has) { giveWeapon(s.weapon.ammo ?? 6, false); WEAPON.out = !!s.weapon.out; if (WEAPON.mesh) WEAPON.mesh.visible = WEAPON.out; updateWeaponHUD(); } else takeWeapon(); });
    T(() => { if (typeof s.tod === 'number') { GAME.tod = s.tod; updateSun(); updateEnvironment(true); } });
    T(() => { MUSIC.changes = s.radioChanges | 0; });
    T(() => { if (typeof s.fights === 'number') localStorage.setItem('gtall_fights', String(s.fights)); });
    // the car you were driving is waiting for you, engine running
    T(() => { if (!s.car) return; const m = s.car.model && VMODELS[s.car.model]; const c = new Car(m ? null : (s.car.type || 'compact'), s.car.color, s.car.x, s.car.z, s.car.h || 0, m || undefined); c.mode = 'physics'; c.persist = true; if (!CARS.includes(c)) CARS.push(c); enterCar(c); });
    T(() => playerHuman.root.visible = !PLAYER.car);
    return true;
  }
  // ---- slots
  function save(slot, label) { const s = snapshot(label); const ok = store.set(slot, s); return ok ? s : null; }
  function auto(label) { if (GAME.state !== 'play' || PLAYER.dead) return; save('auto', label || 'Guardado automático'); }
  function latest() { let best = null; for (const k of SLOTS) { const s = store.get(k); if (s && (!best || s.t > best.s.t)) best = { k, s }; } return best; }
  function describe(s) { if (!s) return '<i style="opacity:.6">Vacío</i>'; const d = new Date(s.t); const f = (n) => String(n).padStart(2, '0');
    const hh = Math.floor(s.tod || 0), mm = Math.floor(((s.tod || 0) - hh) * 60);
    return `<b>${s.mission || ''}</b><br><span style="opacity:.8">$${s.player.money} · salud ${s.player.health}% · ${f(hh)}:${f(mm)} en el juego${s.weapon && s.weapon.has ? ' · pistola' : ''}${s.missions && s.missions.gang && s.missions.gang.name ? ' · banda «' + s.missions.gang.name + '»' : ''}</span><br><span style="opacity:.55;font-size:12px">${f(d.getDate())}/${f(d.getMonth() + 1)}/${d.getFullYear()} ${f(d.getHours())}:${f(d.getMinutes())}${s.label ? ' · ' + s.label : ''}</span>`; }
  // ---- UI
  function build() {
    ui = document.createElement('div'); ui.className = 'screen'; ui.id = 'saveui'; ui.style.display = 'none'; ui.style.zIndex = 40;
    ui.innerHTML = `<div class="panel"><div class="logo" style="font-size:40px"><span class="g" id="svTitle">PARTIDAS</span></div><div id="svList"></div>
      <div style="margin-top:14px;text-align:center"><button class="btn sec" id="svExport">DESCARGAR PARTIDA</button><button class="btn sec" id="svImport">CARGAR DESDE ARCHIVO</button><button class="btn" id="svBack">VOLVER</button></div>
      <input type="file" id="svFile" accept=".json,application/json" style="display:none"><p class="credits" style="margin-top:10px">Las partidas se guardan en este navegador. Con «Descargar partida» te llevas un archivo para cargarlo en otro equipo o si borras los datos del navegador.</p></div>`;
    document.body.appendChild(ui);
    ui.querySelector('#svBack').addEventListener('click', close);
    ui.querySelector('#svExport').addEventListener('click', () => { const s = GAME.state === 'menu' ? (latest() || {}).s : snapshot('Archivo'); if (!s) { HUD.toast('No hay partida que descargar', '#ffb3b3'); return; } const b = new Blob([JSON.stringify(s)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'JETA-partida-' + new Date(s.t).toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.json'; document.body.appendChild(a); a.click(); a.remove(); });
    ui.querySelector('#svImport').addEventListener('click', () => ui.querySelector('#svFile').click());
    ui.querySelector('#svFile').addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const s = JSON.parse(r.result); if (!s.player) throw 0; store.set('1', s); render(); loadSlot('1'); } catch (err) { alertBox('Ese archivo no es una partida de JETA La Laguna.'); } }; r.readAsText(f); e.target.value = ''; });
  }
  function alertBox(t) { const l = ui.querySelector('#svList'); const p = document.createElement('p'); p.style.cssText = 'color:#ffb3b3;text-align:center'; p.textContent = t; l.prepend(p); }
  function render() {
    const l = ui.querySelector('#svList'); ui.querySelector('#svTitle').textContent = mode === 'save' ? 'GUARDAR / CARGAR' : 'CARGAR PARTIDA';
    l.innerHTML = SLOTS.map((k) => { const s = store.get(k); const name = k === 'auto' ? 'Automático' : 'Ranura ' + k;
      return `<div style="display:flex;gap:12px;align-items:center;justify-content:space-between;padding:10px 12px;margin:8px 0;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(0,0,0,.25);font:400 15px Barlow,sans-serif;color:#fff">
        <div style="min-width:90px;font:700 16px Oswald,sans-serif;color:#f5b72e">${name}</div><div style="flex:1">${describe(s)}</div>
        <div style="white-space:nowrap">${mode === 'save' && k !== 'auto' ? `<button class="btn sec" data-save="${k}" style="padding:8px 14px;font-size:15px">GUARDAR</button>` : ''}${s ? `<button class="btn" data-load="${k}" style="padding:8px 14px;font-size:15px">CARGAR</button>` : ''}</div></div>`; }).join('');
    l.querySelectorAll('[data-save]').forEach((b) => b.addEventListener('click', () => { const k = b.dataset.save; if (store.get(k) && b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = '¿SOBRESCRIBIR?'; return; } const s = save(k, 'Guardado a mano'); if (s) { AUDIO.cash && AUDIO.cash(); render(); } else alertBox('No se pudo guardar (el navegador no deja guardar datos).'); }));
    l.querySelectorAll('[data-load]').forEach((b) => b.addEventListener('click', () => loadSlot(b.dataset.load)));
  }
  function loadSlot(k) { const s = store.get(k); if (!s) return; close(true); const fromMenu = GAME.state === 'menu';
    if (fromMenu) { $('menu').style.display = 'none'; AUDIO.init(); }
    $('fade').style.opacity = 1; GAME.state = 'cutscene';
    setTimeout(() => { apply(s); $('pause').style.display = 'none'; $('fade').style.opacity = 0; GAME.state = 'play'; GAME.lock(); HUD.big('PARTIDA CARGADA', '#f5b72e', 2.5); HUD.toast(s.mission ? 'Misión: ' + s.mission : '', '#f5b72e', 4); }, 450); }
  function open(m) { if (!ui) build(); mode = m; render(); ui.style.display = 'flex'; document.exitPointerLock?.(); }
  function close(silent) { if (ui) ui.style.display = 'none'; }
  return {
    save, auto, latest, snapshot, apply, open, close, store,
    update(dt) { if (GAME.state !== 'play' || PLAYER.dead) return; autoT += dt; if (autoT > 180) { autoT = 0; auto('Guardado automático'); } },
    setup() {
      // start menu: CONTINUAR (latest save) + CARGAR; pause menu: GUARDAR / CARGAR
      const mb = $('bPlay'); if (mb) { const c = document.createElement('button'); c.className = 'btn'; c.id = 'bContinue'; c.textContent = 'CONTINUAR PARTIDA'; c.style.display = latest() ? '' : 'none'; mb.parentNode.insertBefore(c, mb);
        c.addEventListener('click', () => { goLandscape(); const L = latest(); if (L) loadSlot(L.k); });
        const l2 = document.createElement('button'); l2.className = 'btn sec'; l2.textContent = 'CARGAR'; l2.style.display = latest() ? '' : 'none'; l2.id = 'bLoadMenu'; mb.parentNode.insertBefore(l2, mb.nextSibling); l2.addEventListener('click', () => open('load')); }
      const rb = $('bResume'); if (rb) { const b = document.createElement('button'); b.className = 'btn sec'; b.id = 'bSave'; b.textContent = 'GUARDAR / CARGAR'; rb.parentNode.insertBefore(b, rb.nextSibling); b.addEventListener('click', () => open('save')); }
      window.addEventListener('beforeunload', () => { try { if (GAME.state === 'play' || GAME.state === 'pause') save('auto', 'Al cerrar el juego'); } catch (e) { } });
    },
  };
})();
