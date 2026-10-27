// ============ BKSHEET (v0.99.4, Jonay: «el basket perfecto, aplica ya»): the basketball players drawn with the
// GandalfHardcore pack (tank top), each one built once from his look (skin, jersey, shorts, hair, beard) out of the
// layers of BK_DATA, and the frame of the sheet for each state of 09f_basket2d.js. Until the layers have loaded the
// game draws its old players.
const BKSHEET = (() => {
  const IM = {}; let loaded = 0, total = 0;
  function img(src) { if (!IM[src]) { const im = new Image(); total++; im.onload = () => { loaded++; }; im.src = src; IM[src] = im; } return IM[src]; }
  /** starts loading the layers; true once they are all in */
  function ready() {
    if (!total) { for (const k in BK_DATA.skins) img(BK_DATA.skins[k].src); img(BK_DATA.shorts); img(BK_DATA.shirt); img(BK_DATA.shoes); for (const k in BK_DATA.hair) img(BK_DATA.hair[k]); }
    return loaded === total; }
  const rgb = (n, d) => { const v = (n ?? d) >>> 0; return [(v >> 16) & 255, (v >> 8) & 255, v & 255]; };
  const mul = (c, f) => c.map((v) => Math.max(0, Math.min(255, Math.round(f <= 1 ? v * f : v + (255 - v) * (f - 1)))));
  const ramp = (c) => [mul(c, 0.5), mul(c, 0.72), c, mul(c, 1.25)];      // tones 0–3 with the colour as the third
  const rampTop = (c) => [mul(c, 0.45), mul(c, 0.66), mul(c, 0.84), c];  // the jersey: its main tone (3) is the colour
  /** a layer of tone indices painted with a ramp onto x */
  function tinted(x, src, R) {
    const im = IM[src], t = document.createElement('canvas'); t.width = im.width; t.height = im.height; const g = t.getContext('2d'); g.drawImage(im, 0, 0);
    const d = g.getImageData(0, 0, t.width, t.height), a = d.data;
    for (let i = 0; i < a.length; i += 4) { if (!a[i + 3] || (a[i] === 19 && a[i + 1] === 19 && a[i + 2] === 28)) continue; const q = R[Math.min(3, a[i] >> 6)]; a[i] = q[0]; a[i + 1] = q[1]; a[i + 2] = q[2]; }
    g.putImageData(d, 0, 0); x.drawImage(t, 0, 0); }
  const C = new Map();
  /** the sheet (800 × 448, frames of 80 × 64 facing left) of a look, built once */
  function sheet(look) {
    const key = JSON.stringify([look.skin, look.shirt, look.pants, look.hair, look.hairStyle, look.beard, look.shoes]); if (C.has(key)) return C.get(key);
    const c = document.createElement('canvas'); c.width = 800; c.height = 448; const x = c.getContext('2d');
    const sk = rgb(look.skin, 0xd9a47c); let best = null, bd = Infinity;
    for (const k in BK_DATA.skins) { const q = BK_DATA.skins[k].col, d = (q[0] - sk[0]) ** 2 + (q[1] - sk[1]) ** 2 + (q[2] - sk[2]) ** 2; if (d < bd) { bd = d; best = k; } }
    x.drawImage(IM[BK_DATA.skins[best].src], 0, 0);
    tinted(x, BK_DATA.shorts, ramp(rgb(look.pants, 0x333344))); x.drawImage(IM[BK_DATA.shoes], 0, 0);
    tinted(x, BK_DATA.shirt, rampTop(rgb(look.shirt, 0x777777)));
    const hs = /afro/i.test(look.hairStyle || '') ? 'afro' : look.beard ? 'beard' : /buzz|fade|bald/i.test(look.hairStyle || '') || look.hair === undefined ? null : 'short';
    if (hs) tinted(x, BK_DATA.hair[hs], ramp(rgb(look.hair, 0x222222)));
    C.set(key, c); return c; }
  /** [row, frame] for a state key of the game (idle0, walk2, drib1, jump, shoot, dunk, jab1, defend, ko, win) */
  function frame(k, p, t, dunk) {
    if (dunk) return [4, 1]; if (k === 'ko') return [6, 9]; if (k === 'shoot') return [4, 0]; if (k === 'jab1') return [5, 3]; if (k === 'win') return [4, Math.floor(t * 6) % 4];
    if (k === 'jump') return (p.vy || 0) > 0 ? [3, 2] : [4, 1]; if (k === 'defend') return [5, 1];
    if (k.startsWith('walk') || k.startsWith('drib')) return [2, Math.floor((p.walkT || 0) * 4.4) % 8];
    return [0, Math.floor(t * 5) % 5]; }
  return { ready, sheet, frame };
})();
