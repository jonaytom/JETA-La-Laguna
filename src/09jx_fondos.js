// ============ FONDOS (v0.99, Jonay): draws the backgrounds of FONDOS_DATA (Guanche Guarriors and Bencomo): the layers
// in parallax at a whole pixel size, the sky stretched to the view; the waterfall and the mist are drawn live. The
// images are made on first use; until they are loaded draw() answers false and the game draws its old background.
const FONDOS = (() => {
  const C = {};
  /** zone k ready to draw (its images loaded), or null */
  function get(k) {
    const d = FONDOS_DATA[k]; if (!d) return null;
    if (!C[k]) C[k] = { g: d.g, extras: d.extras, layers: d.layers.map((l) => { const im = new Image(); im.src = l.src; return { im, speed: l.speed, tile: !!l.tile, sky: !!l.sky, drift: l.drift || 0 }; }) };
    const f = C[k]; return f.layers.every((l) => l.im.complete && l.im.width) ? f : null;
  }
  /** the waterfall down the crack of the ravine (x, y: the drawing's origin on screen; P: px per drawing px) */
  function cascada(c, x, y, P, t) {
    const fr = (a, b, w, h, col) => { c.fillStyle = col; c.fillRect(Math.round(x + a * P), Math.round(y + b * P), Math.ceil(w * P), Math.ceil(h * P)); };
    const k = Math.floor(t * 60); fr(-1, 22, 4, 66, '#cfeaf4');
    for (let j = 0; j < 66; j += 4) fr((j + k) % 8 < 4 ? 0 : 1, 22 + ((j + k * 2) % 66), 2, 3, '#ffffff');
    fr(-4, 87, 10, 2, '#ffffff');
  }
  /** banks of mist drifting through the laurel forest */
  function niebla(c, y0, P, vw, t) {
    const W = vw / P, k = t * 60; c.fillStyle = 'rgba(210,225,215,0.18)';
    for (let i = 0; i < 3; i++) { const x = ((k * (0.15 + i * 0.07) + i * 140) % (W + 200)) - 200; c.beginPath(); c.ellipse((x + 100) * P, y0 + (50 + i * 16) * P, 130 * P, 12 * P, 0, 0, 7); c.fill(); }
  }
  /** draws zone k. P: screen px per drawing px; cx: the camera (screen px); y0: where the drawing's top goes; vw × vh:
   *  the view; t: seconds; ox: a shake; dy(speed): an extra vertical offset per layer (Bencomo climbs) */
  function draw(c, k, P, cx, y0, vw, vh, t, ox = 0, dy = null) {
    const f = get(k); if (!f) return false; const sm = c.imageSmoothingEnabled; c.imageSmoothingEnabled = false;
    f.layers.forEach((l, i) => {
      const im = l.im;
      if (l.sky) { c.drawImage(im, 0, 0, vw, vh); return; }
      const w = im.width * P, h = im.height * P, y = y0 + (dy ? dy(l.speed) : 0);
      let off;
      if (l.tile) { off = ((cx * l.speed + t * l.drift * 4 * P) % w + w) % w; for (let x = -off; x < vw; x += w) c.drawImage(im, Math.round(x + ox), Math.round(y), w, h); }
      else { off = Math.max(0, Math.min(w - vw, cx * l.speed)); c.drawImage(im, Math.round(-off + ox), Math.round(y), w, h); }
      if (i === 1 && f.extras.includes('cascada')) cascada(c, 198 * P - off + ox, y, P, t); // (behind the near rocks)
    });
    if (f.extras.includes('niebla')) niebla(c, y0, P, vw, t);
    c.imageSmoothingEnabled = sm; return true;
  }
  return { get, draw, g: (k) => (FONDOS_DATA[k] ? FONDOS_DATA[k].g : 0) };
})();
