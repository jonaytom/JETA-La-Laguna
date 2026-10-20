// ============ LA CASA (v0.83, Jonay): la inmobiliaria, los pisos, la consola GOFIO-8 en la tele ============
// «En la inmobiliaria se alquila tu pisito, una casita chula cerca del Pasaje Teide… o mejor aún varios pisos que te
// puedes comprar, y eliges el que te llegue el dinero: los pisos son caros.» Dentro: la cama (duermes y se guarda la
// partida), el sofá y la tele; la consola se compra en la juguetería (cara) y los juegos también, uno a uno. Al
// encenderla sale un menú con los cartuchos que tienes. Todo es una parodia: la inmobiliaria se llama Pisos Chachi.
// The homes are real buildings of the map, found when the city is built (the longest stretch of the named street,
// the building on that side): the door goes on the facade facing the street. Locked until you own / rent them.
const CASA = (() => {
  const INMO = { name: 'Inmobiliaria Pisos Chachi', street: 'Calle Heraclio Sánchez', f: 0.3, side: 1 };
  const PISOS = [
    { id: 'herradores', name: 'El pisito de Herradores', street: 'Calle Herradores', f: 0.42, side: -1, rent: 250, w: 7, d: 6, sub: 'Al lado del Pasaje Teide. Pequeñito pero chulo: cama, sofá, tele y una cocina de juguete.' },
    { id: 'sanagustin', name: 'Piso en la Calle San Agustín', street: 'Calle San Agustín', f: 0.55, side: 1, price: 18000, w: 9, d: 7, sub: 'En pleno casco: techos altos, balcón de madera y vecinas que lo saben todo.' },
    { id: 'viana', name: 'Casa en la Calle Viana', street: 'Calle Viana', f: 0.5, side: -1, price: 32000, w: 11, d: 8, sub: 'Casa terrera de las de antes, con patio. Para la banda entera.' },
    { id: 'adelantado', name: 'Ático en la Plaza del Adelantado', street: 'Plaza del Adelantado', f: 0.3, side: 1, price: 55000, w: 13, d: 9, sub: 'Vistas al Ayuntamiento y a la plaza. Para los Defensores de La Laguna que han triunfado.' }];
  const WEEK = 7; // the rent: game days
  const COL_INMO = '#ffb300', COL_HOME = '#7fe08a';
  const G = () => window.GANG || {};
  function data() { const g = G(); if (!g.casa) g.casa = { intro: false, owned: [], rent: null, day: 0 }; return g.casa; }
  const ownsAny = () => { const c = data(); return c.owned.length > 0 || rentOk(); };
  const rentOk = () => { const c = data(); return !!(c.rent && c.rent.until > c.day); };
  const has = (id) => { const c = data(); return c.owned.includes(id) || (c.rent && c.rent.id === id && c.rent.until > c.day); };
  // ---------- where: a building facade on the named street
  function streetPoint(name, f) { let best = null, bl = 0; for (const r of DATA.R) { if (r[1] < 0 || DATA.S[r[1]] !== name) continue; const c = r[4]; let L = 0; for (let i = 2; i < c.length; i += 2) L += Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]); if (L > bl) { bl = L; best = r; } }
    if (!best) return null; const c = best[4]; let want = bl * f, acc = 0;
    for (let i = 2; i < c.length; i += 2) { const l = Math.hypot(c[i] - c[i - 2], c[i + 1] - c[i - 1]); if (acc + l >= want) { const t = (want - acc) / l, x = c[i - 2] + (c[i] - c[i - 2]) * t, z = c[i - 1] + (c[i + 1] - c[i - 1]) * t; return { x, z, tx: (c[i] - c[i - 2]) / l, tz: (c[i + 1] - c[i - 1]) / l, w: best[2] || 6 }; } acc += l; }
    return null; }
  function facadeDoor(name, f, side) { const sp = streetPoint(name, f); if (!sp) return null;
    for (const sd of [side, -side]) { const nx = -sp.tz * sd, nz = sp.tx * sd; // the side of the street
      let best = null, bd = 1e9;
      for (const b of BUILD) { if (b.pasaje || b.style === 4 || b.style === 5) continue; if (Math.abs(b.cx - sp.x) > 60 || Math.abs(b.cz - sp.z) > 60) continue; const P = b.pts, n = P.length;
        for (let i = 0; i < n; i++) { const a = P[i], c = P[(i + 1) % n], ex = c[0] - a[0], ez = c[1] - a[1], L = Math.hypot(ex, ez); if (L < 3.5) continue;
          let t = ((sp.x - a[0]) * ex + (sp.z - a[1]) * ez) / (L * L); t = clamp(t, 1.4 / L, 1 - 1.4 / L); const qx = a[0] + ex * t, qz = a[1] + ez * t;
          if ((qx - sp.x) * nx + (qz - sp.z) * nz < 1) continue; const d = Math.hypot(qx - sp.x, qz - sp.z); if (d > 24 || d >= bd) continue;
          let ox = -ez / L, oz = ex / L; if (pip(qx + ox * 0.6, qz + oz * 0.6, P.flat())) { ox = -ox; oz = -oz; } // outward normal
          if (ox * (sp.x - qx) + oz * (sp.z - qz) < 0) continue; bd = d; best = { x: qx + ox * 0.05, z: qz + oz * 0.05, nx: ox, nz: oz, b }; } }
      if (best) return best; }
    return null; }
  // ---------- the home interiors (built with the other interiors, far from the map)
  let built = false, inmoDoor = null; const HOMES = {};
  function woodTex() { const c = mkCanvas(256, 256), x = c.getContext('2d'); for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#8a5a34' : '#9a6a40'; x.fillRect(0, i * 32, 256, 32); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(0, i * 32 + 31, 256, 1); for (let k = 0; k < 3; k++) x.fillRect(((i * 97 + k * 71) % 256), i * 32, 1, 32); } return canvasTex(c); }
  function buildHome(P, door) { const w = P.w, d = P.d; const r = roomShell(w, d, 3.2, woodTex(), 0xf0e2c8); const g = r.g;
    const M = (col, o = {}) => new THREE.MeshStandardMaterial({ color: col, roughness: 0.7, ...o });
    const box = (W, H, D, col, x, y, z, o) => { const m = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), M(col, o)); m.position.set(x, y, z); g.add(m); return m; };
    const hw = w / 2, hd = d / 2;
    // the TV on the far wall (+z), the console under it, the sofa facing it, the rug
    const tvX = 0, tvZ = hd - 0.45; box(2.2, 0.5, 0.6, 0x3a2a1e, tvX, 0.35, tvZ); // TV stand
    const tv = box(1.8, 1.05, 0.12, 0x111111, tvX, 1.25, tvZ + 0.05); const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.9), new THREE.MeshBasicMaterial({ color: 0x1a2a3a })); scr.position.set(tvX, 1.25, tvZ - 0.02); scr.rotation.y = Math.PI; g.add(scr); void tv;
    const con = box(0.5, 0.1, 0.35, 0x2a2a30, tvX + 0.5, 0.66, tvZ - 0.05); const led = box(0.05, 0.03, 0.02, 0xff3a1a, tvX + 0.65, 0.68, tvZ - 0.23, { emissive: 0xff3a1a, emissiveIntensity: 1.5 });
    const sofaZ = tvZ - 3.2; box(2.4, 0.45, 0.9, 0x8a2a2a, tvX, 0.35, sofaZ); box(2.4, 0.7, 0.25, 0x7a2222, tvX, 0.75, sofaZ - 0.4); for (const sx of [-1.25, 1.25]) box(0.25, 0.6, 0.9, 0x7a2222, tvX + sx, 0.5, sofaZ);
    COL.addSeg(r.x0 + tvX - 1.3, r.z0 + sofaZ - 0.5, r.x0 + tvX + 1.3, r.z0 + sofaZ - 0.5); COL.addSeg(r.x0 + tvX - 1.3, r.z0 + sofaZ + 0.4, r.x0 + tvX + 1.3, r.z0 + sofaZ + 0.4);
    COL.addSeg(r.x0 + tvX - 1.1, r.z0 + tvZ - 0.3, r.x0 + tvX + 1.1, r.z0 + tvZ - 0.3);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), M(0x2a6a8a)); rug.rotation.x = -Math.PI / 2; rug.position.set(tvX, 0.15, (tvZ + sofaZ) / 2); g.add(rug);
    // the bed against a side wall
    const bx = -hw + 1.2, bz = hd - 1.6; box(1.6, 0.45, 2.2, 0x5a3a22, bx, 0.33, bz); box(1.5, 0.15, 2.1, 0xf4efe6, bx, 0.62, bz); box(1.5, 0.18, 1.3, 0x3a6ab0, bx, 0.72, bz - 0.35); box(1.0, 0.15, 0.4, 0xffffff, bx, 0.75, bz + 0.8);
    COL.addSeg(r.x0 + bx + 0.85, r.z0 + bz - 1.15, r.x0 + bx + 0.85, r.z0 + bz + 1.15); COL.addSeg(r.x0 + bx - 0.85, r.z0 + bz - 1.15, r.x0 + bx + 0.85, r.z0 + bz - 1.15);
    // a little kitchen on the other side, a lamp, a poster, a window with the night / day sky
    const kx = hw - 0.5; box(0.8, 0.95, Math.min(3, d - 3), 0xd8d2c6, kx, 0.55, 0); box(0.82, 0.05, Math.min(3, d - 3) + 0.02, 0x2a2a2a, kx, 1.05, 0); box(0.5, 0.35, 0.5, 0xc0c0c0, kx, 1.25, 0.6, { metalness: 0.8, roughness: 0.3 });
    COL.addSeg(r.x0 + kx - 0.45, r.z0 - 1.5, r.x0 + kx - 0.45, r.z0 + 1.5);
    box(0.06, 1.6, 0.06, 0x2a2a2a, tvX - 1.9, 0.9, tvZ - 0.5); const lamp = box(0.5, 0.35, 0.5, 0xfff0c0, tvX - 1.9, 1.8, tvZ - 0.5, { emissive: 0xffd28a, emissiveIntensity: 1.2 }); void lamp;
    const post = textPlane(P.id === 'herradores' ? '¡BENCOMO!' : 'GUANCHE WARRIORS', 1.4, 0.5, '#6b2a10', '#f2c46a', 'bold 34px Arial'); post.position.set(-hw + 0.05, 2.1, 0); post.rotation.y = Math.PI / 2; g.add(post);
    const win = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(3, w * 0.3), 1.3), new THREE.MeshBasicMaterial({ color: 0x8ab8e0 })); win.position.set(hw * 0.45, 1.9, hd - 0.04); win.rotation.y = Math.PI; g.add(win);
    if (w >= 11) { box(1.6, 0.75, 1.0, 0x6b4226, -hw + 2.2, 0.45, -hd + 2.6); for (const sx of [-0.7, 0.7]) box(0.45, 0.45, 0.45, 0x5a3a22, -hw + 2.2 + sx, 0.3, -hd + 1.8); } // a table for the gang
    const md = { x: 0, z: -hd + 0.05, rot: 0, h: 0, ix: 0, iz: -hd + 2.2 };
    const ex = exitDoor(r, md.x, md.z, md.rot);
    const def = { id: 'casa_' + P.id, name: P.name, door, spawn: { x: r.x0 + md.ix, z: r.z0 + md.iz, h: md.h }, exit: ex, ceil: r.y0 + 3.0, floor: r.y0 + 0.13, home: P.id, noLabel: true, locked: () => !has(P.id) };
    addInterior(def); HOMES[P.id] = { def, P, door, tv: { x: r.x0 + tvX, z: r.z0 + tvZ - 1.2 }, bed: { x: r.x0 + bx + 1.2, z: r.z0 + bz }, con, led, scr }; }
  function build() { if (built) return; built = true;
    try { inmoDoor = facadeDoor(INMO.street, INMO.f, INMO.side); if (inmoDoor) { const s = textPlane('PISOS CHACHI · INMOBILIARIA', 4.2, 0.6, '#ffb300', '#1a1a1a', 'bold 30px Arial'); const y = heightAt(inmoDoor.x, inmoDoor.z); s.position.set(inmoDoor.x + inmoDoor.nx * 0.15, y + 3.4, inmoDoor.z + inmoDoor.nz * 0.15); s.rotation.y = Math.atan2(inmoDoor.nx, inmoDoor.nz); scene.add(s); } } catch (e) { console.error('inmo', e); }
    for (const P of PISOS) { try { const d = facadeDoor(P.street, P.f, P.side); if (d) buildHome(P, { x: d.x, z: d.z, nx: d.nx, nz: d.nz }); else console.warn('casa: sin edificio para', P.name); } catch (e) { console.error('casa', P.id, e); } }
    console.log('casas', Object.keys(HOMES).length, 'inmobiliaria', !!inmoDoor); }
  // ---------- the estate agency's phone call (after the arcades: you have money and something to play)
  let callT = 0;
  function update(dt) { const c = data(); // the days go by (the rent)
    if (typeof GAME.tod === 'number') { if (c.lastTod !== undefined && GAME.tod < c.lastTod - 12) { c.day++; if (c.rent && c.rent.until === c.day) HUD.toast('Se te ha acabado el alquiler de ' + nameOf(c.rent.id) + ': renuévalo en Pisos Chachi', COL_INMO, 6); } c.lastTod = GAME.tod; }
    for (const id in HOMES) { const H = HOMES[id]; const on = !!ARCADE.data().console; H.con.visible = on; H.led.visible = on; }
    if (c.intro || !G().defenders || !ARCADE.data().invited || GAME.state !== 'play' || MISSIONS.active || (DLG && DLG.open) || (window.__TALK && window.__TALK.cur) || !inmoDoor) { callT = 0; return; }
    callT += dt; if (callT < 70) return; callT = -1e9; const PC = 'Pisos Chachi (por el móvil)';
    MISSIONS.kit.talk([[PC, '¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?'],
      [PC, 'Tenemos el <b>pisito de Herradores</b>, al ladito del Pasaje Teide, en alquiler por semanas. Y para los que van sobrados: pisos en San Agustín, en Viana y un ático en el Adelantado. ¡Caros, pero chachis!'],
      [MISSIONS.kit.CH, '¿Y tiene tele? Que me quiero comprar la consola de la juguetería.'], [PC, '¡Tele tienen todos! Pásese por la oficina, en la ' + INMO.street + '. Está en el mapa.']],
    () => { c.intro = true; HUD.toast('Pisos Chachi: la inmobiliaria está en el mapa (cuadrado naranja) · lo tienes en el diario (J)', COL_INMO, 6); }, 'La inmobiliaria'); }
  const nameOf = (id) => (PISOS.find((p) => p.id === id) || {}).name || id;
  // ---------- E near the estate agency, inside your home (the TV, the bed)
  function nearInmo() { if (!inmoDoor || !data().intro || PLAYER.car || PLAYER.interior) return false; return Math.hypot(PLAYER.x - inmoDoor.x, PLAYER.z - inmoDoor.z) < 3.4; }
  function homeHere() { const it = PLAYER.interior; return it && it.home ? HOMES[it.home] : null; }
  function prompt() { const K = CONTROLS.kbd('use'); if (nearInmo()) return `${K} Entrar: ${INMO.name} (pisos en alquiler y en venta)`; const H = homeHere(); if (!H) return '';
    const w = which(H); if (w === 'tv') return ARCADE.data().console ? `${K} Encender la consola GOFIO-8` : `${K} La tele · sin consola (la GOFIO-8 se vende en las jugueterías)`;
    if (w === 'bed') return `${K} Dormir hasta mañana y guardar la partida`; return ''; }
  // the TV or the bed: the nearer one (in the little flat they are close)
  function which(H) { const dt = Math.hypot(PLAYER.x - H.tv.x, PLAYER.z - H.tv.z), db = Math.hypot(PLAYER.x - H.bed.x, PLAYER.z - H.bed.z); if (db < 1.9 && db <= dt) return 'bed'; if (dt < 2.2) return 'tv'; if (db < 1.9) return 'bed'; return null; }
  function use() { if (nearInmo()) { openInmo(); return true; } const H = homeHere(); if (!H) return false;
    const w = which(H); if (w === 'tv') { if (!ARCADE.data().console) { HUD.toast('La tele sin consola es muy aburrida: la GOFIO-8 se vende en las jugueterías', '#9fd7ff', 4); return true; } consola(); return true; }
    if (w === 'bed') { sleep(); return true; } return false; }
  function sleep() { $('fade').style.opacity = 1; setTimeout(() => { const c = data(); if (GAME.tod > 8) { c.day++; } GAME.tod = 8; c.lastTod = 8; try { updateSun(); updateEnvironment(true); } catch (e) { } PLAYER.health = 100; try { SAVE.save('auto', 'En casa: ' + homeHere().P.name); } catch (e) { } $('fade').style.opacity = 0; HUD.toast('Has dormido como un mencey. Partida guardada.', COL_HOME, 4); }, 700); }
  function consola() { const a = ARCADE.data(), games = a.bought.filter((id) => ARCADE.GAMES[id]); if (!games.length) { HUD.toast('La GOFIO-8 sin cartuchos no hace nada: los juegos se venden en las jugueterías', '#9fd7ff', 4); return; }
    ARCADE.open({ console: games, where: 'TU CASA' }, () => HUD.toast('Apagas la GOFIO-8', '#9fd7ff', 2)); }
  // ---------- the estate agency
  function openInmo() { const c = data(); const list = PISOS.filter((P) => HOMES[P.id]);
    const lab = (P) => { if (c.owned.includes(P.id)) return `${P.name} · <b style="color:#7fe08a">es tuyo</b>`; if (P.rent) return `${P.name} · alquiler <b>$${P.rent}</b> a la semana${c.rent && c.rent.id === P.id && c.rent.until > c.day ? ` · <span style="color:#7fe08a">alquilado ${c.rent.until - c.day} días más</span>` : ''}`; return `${P.name} · <b>$${P.price.toLocaleString('es-ES')}</b>`; };
    DLG.show(INMO.name, 'Inmobiliaria', `«¡Pisos Chachi, los más chachis de Aguere!» Tienes <b>$${PLAYER.money.toLocaleString('es-ES')}</b>.`, '¿Qué piso le enseño?', [...list.map(lab), 'Nada, solo miraba'], (i) => { const P = list[i]; if (!P) { DLG.hide(); return; } if (c.owned.includes(P.id)) { DLG.hide(); gps(P); return; } ficha(P); }); }
  function ficha(P) { const c = data(), cost = P.rent || P.price, rentMine = P.rent && c.rent && c.rent.id === P.id && c.rent.until > c.day;
    DLG.show(INMO.name, P.name, `${P.sub}<br><br>${P.rent ? `Alquiler: <b>$${P.rent}</b> por ${WEEK} días del juego.` : `Precio: <b>$${P.price.toLocaleString('es-ES')}</b>. Es tuyo para siempre.`} Tienes <b>$${PLAYER.money.toLocaleString('es-ES')}</b>.`, '',
      [P.rent ? (rentMine ? `Pagar otra semana ($${P.rent})` : `Alquilarlo ($${P.rent} la semana)`) : `Comprarlo ($${P.price.toLocaleString('es-ES')})`, 'Ver dónde está (GPS)', 'Volver'], (i) => {
        if (i === 2) { openInmo(); return; } if (i === 1) { DLG.hide(); gps(P); return; }
        if (PLAYER.money < cost) { AUDIO.fail(); DLG.show(INMO.name, 'No te llega', `Mi niño, esto cuesta <b>$${cost.toLocaleString('es-ES')}</b> y tienes <b>$${PLAYER.money.toLocaleString('es-ES')}</b>. ¡Vuelva cuando lo tenga, que aquí no se fía!`, '', ['Vale'], () => DLG.hide()); return; }
        PLAYER.money -= cost; AUDIO.cash && AUDIO.cash(); if (P.rent) c.rent = { id: P.id, until: (rentMine ? c.rent.until : c.day) + WEEK }; else c.owned.push(P.id);
        DLG.hide(); HUD.big(P.rent ? '¡PISO ALQUILADO!' : '¡CASA NUEVA!', COL_HOME, 3.5); HUD.toast(`${P.name}: ya puedes entrar (cuadrado verde en el mapa). Dentro: la cama y la tele.`, COL_HOME, 6); gps(P); SAVE && SAVE.auto && SAVE.auto('Casa nueva'); }); }
  function gps(P) { const H = HOMES[P.id]; if (!H) return; setWaypoint(H.door.x, H.door.z); HUD.toast('Ruta marcada: ' + P.name, '#e040fb', 3); }
  // ---------- map markers: the agency (once it has phoned you), your homes
  function blips() { const b = []; if (inmoDoor && data().intro) b.push([inmoDoor.x, inmoDoor.z, COL_INMO]); for (const id in HOMES) if (has(id)) b.push([HOMES[id].door.x, HOMES[id].door.z, COL_HOME]); return b; }
  function homesOwned() { return PISOS.filter((P) => HOMES[P.id] && has(P.id)).map((P) => ({ name: P.name, x: HOMES[P.id].door.x, z: HOMES[P.id].door.z })); }
  return { build, update, prompt, use, blips, data, PISOS, HOMES, homesOwned, has, ownsAny, nameOf, get inmo() { return inmoDoor; }, INMO, WEEK, _open: openInmo };
})();
