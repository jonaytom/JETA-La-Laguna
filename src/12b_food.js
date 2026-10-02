// ============ food: shops where you buy something to eat and get your health back ============
const FOOD = (() => {
  const MENU = {
    S: [['Plátano de Canarias', 2, 8], ['Bocadillo de queso blanco', 5, 18], ['Leche y leche + magdalena', 4, 14], ['Papas fritas Lagartón y un refresco', 3, 10]],
    D: [['Truchas de batata', 3, 12], ['Bizcochón con café', 4, 15], ['Pan de puño con mantequilla', 2, 9], ['Rosquetes de La Laguna', 3, 11]],
    F: [['Bocata de pata asada', 8, 32], ['Pizza mediana', 11, 40], ['Kebab completo', 9, 35], ['Perrito con papas', 6, 24]],
    R: [['Papas arrugadas con mojo', 9, 30], ['Escaldón de gofio', 10, 38], ['Carne de cabra', 14, 55], ['Potaje de berros', 12, 45]],
    C: [['Barraquito', 2, 7], ['Sándwich mixto', 5, 18], ['Croissant a la plancha', 4, 13], ['Zumo de naranja natural', 3, 9]],
  };
  const LABEL = { S: 'Supermercado', D: 'Dulcería', F: 'Comida rápida', R: 'Casa de comidas', C: 'Cafetería' };
  const GENN = { S: 'Súper Ande Chano', D: 'Dulcería Truchas', F: 'Bocatas El Tolete', R: 'Tasca El Gofio', C: 'Café El Barraquito' };
  const shops = []; let icon = null, onBuy = null;
  function iconTex() {
    const c = mkCanvas(128, 128), x = c.getContext('2d'); x.fillStyle = '#e53935'; x.beginPath(); x.arc(64, 64, 58, 0, 7); x.fill(); x.lineWidth = 8; x.strokeStyle = '#fff'; x.stroke();
    x.fillStyle = '#fff'; x.fillRect(52, 28, 24, 72); x.fillRect(28, 52, 72, 24); return canvasTex(c, { repeat: false });
  }
  function init() {
    // pick food shops spread over the map (one every ~220 m at most), preferring the historic core and the avenues
    const cands = DATA.SH.filter((s) => MENU[s[2]]).map((s) => ({ s, k: (isHistoric(s[0], s[1]) ? 0 : 1) + Math.random() * 0.5 }));
    cands.sort((a, b) => a.k - b.k);
    const mat = new THREE.SpriteMaterial({ map: (icon = iconTex()), depthTest: true, transparent: true });
    for (const { s } of cands) {
      if (shops.length >= 26) break; if (shops.some((o) => Math.hypot(o.x - s[0], o.z - s[1]) < 220)) continue;
      const sp = safeSpot(s[0], s[1], 0.5); if (Math.hypot(sp[0] - s[0], sp[1] - s[1]) > 14) continue;
      const name = s[3] || GENN[s[2]]; const spr = new THREE.Sprite(mat); spr.scale.set(1.1, 1.1, 1); spr.position.set(sp[0], heightAt(sp[0], sp[1]) + 3.0, sp[1]); scene.add(spr);
      shops.push({ x: sp[0], z: sp[1], type: s[2], name, spr });
    }
    // the café you can walk into also sells food (at the counter)
    console.log('food shops', shops.length);
  }
  function nearShop() { if (PLAYER.car || PLAYER.interior) return null; for (const s of shops) if (Math.hypot(PLAYER.x - s.x, PLAYER.z - s.z) < 3.2) return s; return null; }
  function nearCounter() { const it = PLAYER.interior; if (!it || !it.bar || PLAYER.car) return null; return Math.hypot(PLAYER.x - it.bar.x, PLAYER.z - it.bar.z) < 3.4 ? { x: it.bar.x, z: it.bar.z, type: 'C', name: it.name, counter: true } : null; }
  function near() { return nearShop() || nearCounter(); }
  function open(s) {
    const items = MENU[s.type]; const extra = s.counter && MISSIONS.wantsBottle && MISSIONS.wantsBottle() ? [['Botella de Ron Arrecostao (para Coco)', 25, 0, 'ron']] : [];
    const list = [...extra, ...items];
    const opts = list.map(([n, p, h]) => `${n} · <b>$${p}</b>${h ? ` · <span style="color:#7fe08a">+${h} salud</span>` : ''}`).concat(['Nada, gracias']);
    DLG.show(s.name, LABEL[s.type] || 'Tienda', `Tienes <b>$${PLAYER.money}</b> y tu salud está al <b>${Math.round(PLAYER.health)}%</b>.`, '¿Qué vas a tomar?', opts, (i) => {
      if (i >= list.length) { DLG.hide(); return; }
      const [n, p, h, tag] = list[i];
      if (PLAYER.money < p) { AUDIO.fail(); DLG.show(s.name, 'No te llega', 'Mi niño, eso cuesta <b>$' + p + '</b> y no tienes suficiente. Aquí no se fía.', '', ['Vale'], () => DLG.hide()); return; }
      PLAYER.money -= p; AUDIO.cash();
      if (tag) { DLG.hide(); MISSIONS.onEvent('bought', tag); HUD.toast('Has comprado: ' + n, '#f5b72e', 3); return; }
      const before = PLAYER.health; PLAYER.health = Math.min(100, PLAYER.health + h); AUDIO.pickup();
      DLG.hide(); HUD.toast(`${n}  +${Math.round(PLAYER.health - before)} salud`, '#7fe08a', 3); MISSIONS.onEvent('ate', n);
    });
  }
  function update(dt) { const t = performance.now() / 1000; for (const s of shops) { const d = Math.abs(s.x - camera.position.x) + Math.abs(s.z - camera.position.z); s.spr.visible = d < 260 && !PLAYER.interior; if (s.spr.visible) s.spr.position.y = heightAt(s.x, s.z) + 3.0 + Math.sin(t * 2 + s.x) * 0.15; } }
  function nearest(x, z) { let b = null, bd = 1e9; for (const s of shops) { const d = Math.hypot(s.x - x, s.z - z); if (d < bd) { bd = d; b = s; } } return b; }
  return { init, near, open, update, nearest, get shops() { return shops; } };
})();
// health lost in traffic accidents (driver) and from police batons
function playerCrashDamage(v) { if (v < 7) return; const dmg = (v - 6) * 1.6; PLAYER.health -= dmg; if (PLAYER.health <= 0) GAME.wasted(); else if (dmg > 12) HUD.toast('¡Ay! Te has dado un buen golpe (-' + Math.round(dmg) + ' salud)', '#ffb3b3', 2); }
