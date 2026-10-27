// ============ «GUANCHE GUARRIORS» (v0.82): the beat'em up of the toy shops (pay per game) ============
// Jonay (20-oct): like Golden Axe: a side-scrolling beat'em up with depth (not a platformer), several stages, and at the
// start you choose one of 3 warriors:
//  · EL MAGOTE (v0.90, Jonay; was «el Mencey»; id 'mencey'): the barbarian, strong and slow, with a Canarian club (garrote canario). Magic: «Ira de Achamán» (4).
//  · EL MENCEY (v0.90, Jonay; was «el Pastor»; id 'pastor'): more agile, less strong; the shepherd's pole reaches further and jumps more (the salto del pastor:
//    B while running). Magic: «Viento alisio» (5).
//  · LA MIRLADORA: a girl who does magic: less physical, agile, the strongest magic: «Luz de Magec» (7).
// Story (from the Guanche myth): Guayota, the demon inside the Teide (Echeyde), has kidnapped Magec, the sun, and the
// island is dark. The warriors go up to the Teide to free it. Thief imps (duendes) carry the magic pouches; the giant
// lizard of El Hierro can be ridden; the tibicenas (the black demon dogs) hunt in packs; the witches of Anaga throw fire.
// Controls, the same as every minigame: A (E / left click) = hit (a combo of 3; running = a charge; in the air = a blow
// from above), B (Espacio) = jump (on a free lizard: ride it), Q / right click = magic. Double tap ← / → = run.
// Size (Jonay): the warriors as big as the Bencomo that was too big (the world drawn at ×2.4 on the 480×336 screen).
ARCADE.GAMES.guanche = (() => {
  const A = ARCADE, SW = A.W, SH = A.H, Z = 2.4, VW = SW / Z, VH = SH / Z, GY = 92, ZD = 44; // the view: 200 × 140; feet from y 92 (back) to 136 (front)
  // ---------- pixel drawing at half world units (the chunky look of the boards, but with a bit more detail)
  const R2 = (v) => Math.round(v * 2) / 2;
  function px(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(R2(x), R2(y), Math.max(0.5, R2(w)), Math.max(0.5, R2(h))); }
  function pline(c, x0, y0, x1, y1, w, col) { c.fillStyle = col; const d = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.ceil(d * 2)), ww = Math.max(0.5, R2(w));
    for (let i = 0; i <= n; i++) { const t = i / n; c.fillRect(R2(x0 + (x1 - x0) * t - ww / 2), R2(y0 + (y1 - y0) * t - ww / 2), ww, ww); } }
  function pblob(c, x, y, rx, ry, col) { c.fillStyle = col; for (let j = -ry; j <= ry; j += 0.5) { const k = Math.sqrt(Math.max(0, 1 - (j * j) / (ry * ry))) * rx; if (k < 0.25) continue; c.fillRect(R2(x - k), R2(y + j), Math.max(0.5, R2(2 * k)), 0.5); } }
  // ---------- the puppets: joints per pose (facing right, feet at 0,0, a 28-high body), drawn as pixel limbs
  const PO = {
    idle: { h: [0, -13], n: [1, -23], hd: [1.5, -26.5], kf: [2, -7], ff: [3, 0], kb: [-1, -7], fb: [-3, 0], ef: [4, -18], hf: [6, -15], eb: [-2, -18], hb: [-1, -14], wa: -1.1 },
    walk1: { h: [0, -13.5], n: [1.5, -23.5], hd: [2, -27], kf: [3.5, -7], ff: [6, 0], kb: [-2, -6.5], fb: [-5, 0], ef: [3, -18], hf: [5, -14], eb: [-2.5, -18], hb: [-4, -15], wa: -1 },
    walk2: { h: [0, -13], n: [1.5, -23], hd: [2, -26.5], kf: [1.5, -7.5], ff: [0.5, 0], kb: [0.5, -8], fb: [-1, -1.5], ef: [4, -18], hf: [6, -15], eb: [-1, -18], hb: [0, -14], wa: -1.1 },
    walk3: { h: [0, -13.5], n: [1.5, -23.5], hd: [2, -27], kf: [-2, -6.5], ff: [-5, 0], kb: [3.5, -7], fb: [6, 0], ef: [2, -18], hf: [4, -16], eb: [1, -18], hb: [3, -14], wa: -1.2 },
    run1: { h: [1, -13], n: [3.5, -22.5], hd: [4.5, -25.5], kf: [5, -8], ff: [8, -1], kb: [-3, -6], fb: [-7, -2], ef: [5, -18], hf: [8, -17], eb: [-3, -18], hb: [-5, -16], wa: -0.6 },
    run2: { h: [1, -13.5], n: [3.5, -23], hd: [4.5, -26], kf: [-1, -7], ff: [-5, -3], kb: [4, -8], fb: [6, 0], ef: [3, -19], hf: [6, -18], eb: [0, -18], hb: [2, -15], wa: -0.7 },
    atk1: { h: [0.5, -13], n: [3, -22.5], hd: [3.5, -26], kf: [3, -7], ff: [5, 0], kb: [-1.5, -7], fb: [-4, 0], ef: [7, -19], hf: [10.5, -18.5], eb: [0, -18], hb: [1, -15], wa: 0 },
    atk2: { h: [0.5, -13], n: [2.5, -22.5], hd: [3, -26], kf: [3, -7], ff: [5, 0], kb: [-1.5, -7], fb: [-4, 0], ef: [6, -17], hf: [9, -13], eb: [-2, -19], hb: [-3, -16], wa: 0.55 },
    wind: { h: [-0.5, -13], n: [-1, -23.5], hd: [-1, -27], kf: [2, -7], ff: [4, 0], kb: [-2, -7], fb: [-4, 0], ef: [-1, -24], hf: [-3, -27], eb: [-3, -20], hb: [-4, -23], wa: -2.5 },
    smash: { h: [1, -12], n: [4.5, -21], hd: [5.5, -24.5], kf: [5, -6], ff: [8, 0], kb: [-2, -6], fb: [-5, 0], ef: [8, -17], hf: [11, -14], eb: [2, -17], hb: [5, -14], wa: 0.9 },
    jump: { h: [0, -14], n: [1, -24], hd: [1.5, -27.5], kf: [4, -11], ff: [3, -5], kb: [-1, -10], fb: [-4, -5], ef: [4, -20], hf: [6, -22], eb: [-3, -20], hb: [-5, -22], wa: -1.6 },
    jatk: { h: [0, -14], n: [2, -23.5], hd: [2.5, -27], kf: [4, -11], ff: [6, -6], kb: [-1, -10], fb: [-3, -5], ef: [6, -18], hf: [9, -14], eb: [-3, -20], hb: [-4, -17], wa: 1.2 },
    dash: { h: [1, -12.5], n: [5, -21.5], hd: [6, -24.5], kf: [5, -7], ff: [8, -1], kb: [-3, -6], fb: [-7, -2], ef: [8, -19], hf: [12, -18], eb: [1, -18], hb: [3, -15], wa: 0.05 },
    hurt: { h: [-0.5, -13], n: [-3, -22.5], hd: [-4, -25.5], kf: [2, -7], ff: [3, 0], kb: [-2, -7], fb: [-4, 0], ef: [2, -21], hf: [4, -24], eb: [-5, -20], hb: [-7, -22], wa: -2 },
    down: { h: [0, -2.5], n: [-10, -3], hd: [-13.5, -3.5], kf: [4, -4], ff: [9, -1.5], kb: [4.5, -2.5], fb: [9.5, -0.5], ef: [-7, -6], hf: [-4, -7], eb: [-8, -1], hb: [-5, -0.5], wa: 2.8 },
    magic: { h: [0, -13.5], n: [0.5, -23.5], hd: [0.5, -27], kf: [2.5, -7], ff: [4, 0], kb: [-2, -7], fb: [-4, 0], ef: [2, -27], hf: [3, -31], eb: [-1.5, -27], hb: [-2, -31], wa: -1.57 },
    fkick: { h: [0, -14], n: [-2, -23.5], hd: [-2.5, -27], kf: [5, -12.5], ff: [11.5, -12], kb: [-1, -8], fb: [-4, -3], ef: [2, -19], hf: [-1, -16], eb: [-3, -20], hb: [-6, -22.5], wa: -2.2 }, // v0.83.2: the running attack, a flying kick
    ride: { h: [0, -8], n: [1, -18], hd: [1.5, -21.5], kf: [4, -5], ff: [4, 0], kb: [2, -5], fb: [2, 0], ef: [4, -13], hf: [7, -12], eb: [-2, -13], hb: [-1, -10], wa: -0.9 },
  };
  const WALK = [PO.walk1, PO.walk2, PO.walk3, PO.walk2], RUN = [PO.run1, PO.run2];
  const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  function mix(a, b, t) { const o = {}; for (const k in a) o[k] = k === 'wa' ? a.wa + (b.wa - a.wa) * t : lerp2(a[k], b[k], t); return o; }
  const cyc = (arr, ph) => { const n = arr.length, a = Math.floor(ph) % n, t = ph - Math.floor(ph); return mix(arr[(a + n) % n], arr[(a + 1 + n) % n], t); };
  const OUT = '#1a0f08';
  function puppet(c, x, y, face, P, L, glow) {
    const s = L.s, J = (p) => [x + face * p[0] * s, y + p[1] * s], hp = J(P.h), nk = J(P.n), hd = J(P.hd), sh = lerp2(hp, nk, 0.88);
    const kf = J(P.kf), ff = J(P.ff), kb = J(P.kb), fb = J(P.fb), ef = J(P.ef), hf = J(P.hf), eb = J(P.eb), hb = J(P.hb);
    const wd = [Math.cos(P.wa) * face, Math.sin(P.wa)];
    for (const pass of [0, 1]) { const o = pass === 0 ? 1 : 0, col = (cc) => (pass === 0 ? OUT : cc);
      // back leg and arm (a little darker)
      pline(c, hp[0], hp[1], kb[0], kb[1], 3 * s + o, col(L.skin2)); pline(c, kb[0], kb[1], fb[0], fb[1], 2.5 * s + o, col(L.skin2)); px(c, fb[0] - 1.5 * s - o / 2, fb[1] - 1 - o / 2, 3 * s + o, 1.5 + o, col(L.shoe || '#4a2c18'));
      pline(c, sh[0], sh[1], eb[0], eb[1], 2.2 * s + o, col(L.skin2)); pline(c, eb[0], eb[1], hb[0], hb[1], 2 * s + o, col(L.skin2));
      if (L.shield) pblob(c, hb[0] + face * 1, hb[1] - 1, 3.5 * s + o, 5 * s + o, col(L.shield));
      // the body: the tamarco (goatskin tunic) or the robe
      if (L.robe) { for (let j = 0; j <= 13 * s; j += 0.5) { const yy = nk[1] + 2 + j, half = 2.5 * s + j * 0.42; px(c, lerp2(nk, hp, Math.min(1, j / (11 * s)))[0] - half - o / 2, yy, half * 2 + o, 0.5, col(L.cloth)); } }
      pline(c, hp[0], hp[1], nk[0], nk[1], L.bulk * s + o, col(L.cloth));
      if (!L.robe) pblob(c, hp[0], hp[1] + 1.5 * s, L.bulk * 0.62 * s + o / 2, 2.6 * s + o / 2, col(L.cloth));
      // the head
      pblob(c, hd[0], hd[1], 3.4 * s + o / 2, 3.6 * s + o / 2, col(L.skin));
      if (L.horns) { pline(c, hd[0] - face * 1.5 * s, hd[1] - 3 * s, hd[0] - face * 3 * s, hd[1] - (5.5 + L.horns) * s, 1.2 * s + o, col('#e8dcc0')); pline(c, hd[0] + face * 1.5 * s, hd[1] - 3 * s, hd[0] + face * 2.5 * s, hd[1] - (5.5 + L.horns) * s, 1.2 * s + o, col('#e8dcc0')); }
      // front leg and arm
      pline(c, hp[0], hp[1], kf[0], kf[1], 3 * s + o, col(L.skin)); pline(c, kf[0], kf[1], ff[0], ff[1], 2.5 * s + o, col(L.skin)); px(c, ff[0] - 1.5 * s - o / 2, ff[1] - 1 - o / 2, 3 * s + o, 1.5 + o, col(L.shoe || '#4a2c18'));
      pline(c, sh[0], sh[1], ef[0], ef[1], 2.3 * s + o, col(L.skin)); pline(c, ef[0], ef[1], hf[0], hf[1], 2.1 * s + o, col(L.skin));
      // the weapon in the front hand
      const W2 = (a, b, w, cc) => pline(c, hf[0] + wd[0] * a * s, hf[1] + wd[1] * a * s, hf[0] + wd[0] * b * s, hf[1] + wd[1] * b * s, w * s + o, col(cc));
      if (L.weapon === 'garrote') { W2(-2, 11, 2, '#8a5a2e'); pblob(c, hf[0] + wd[0] * 11 * s, hf[1] + wd[1] * 11 * s, 2.6 * s + o / 2, 2.6 * s + o / 2, col('#6b4422')); }
      if (L.weapon === 'vara') W2(-7, 17, 1.2, '#d9b77a');
      if (L.weapon === 'maza') { W2(-1, 9, 1.8, '#5a3a1a'); pblob(c, hf[0] + wd[0] * 9 * s, hf[1] + wd[1] * 9 * s, 2 * s + o / 2, 2 * s + o / 2, col('#3a2a1a')); }
      if (L.weapon === 'baston') { W2(-4, 9, 1, L.staff || '#a0703a'); pblob(c, hf[0] + wd[0] * 9.5 * s, hf[1] + wd[1] * 9.5 * s, 1.8 * s + o / 2, 1.8 * s + o / 2, col(L.gem || '#ffd400')); }
    }
    // details over the colour: fur trim, hair, eye, beard, paint
    pblob(c, hp[0], hp[1] + 3.6 * s, L.bulk * 0.62 * s, 0.6 * s, L.cloth2);
    if (L.hair) { pblob(c, hd[0] - face * 0.8 * s, hd[1] - 2 * s, 3.4 * s, 2 * s, L.hair); if (L.long) pline(c, hd[0] - face * 2.5 * s, hd[1] - 1 * s, hd[0] - face * 3.5 * s, hd[1] + (L.long) * s, 2 * s, L.hair); }
    if (L.cap) pblob(c, hd[0] - face * 0.5 * s, hd[1] - 3 * s, 3.2 * s, 2 * s, L.cap);
    if (L.beard) pblob(c, hd[0] + face * 1.6 * s, hd[1] + 2.4 * s, 2 * s, 1.6 * s, L.beard);
    if (L.band) px(c, hd[0] - 3.2 * s, hd[1] - 2.2 * s, 6.4 * s, 0.8 * s, L.band);
    px(c, hd[0] + face * 1.6 * s - 0.25, hd[1] - 0.6 * s, 0.8 * s, 0.8 * s, L.eye || '#1a0f08');
    if (L.dots) for (let i = 0; i < 3; i++) px(c, lerp2(hp, nk, 0.3 + i * 0.2)[0] - 0.5, lerp2(hp, nk, 0.3 + i * 0.2)[1], 1, 1, L.dots); // pintadera paint
    if (glow) { pblob(c, hf[0], hf[1], 2.5, 2.5, glow); }
  }
  // the tibicena (a black demon dog with red eyes) and the giant lizard of El Hierro
  function dog(c, x, y, face, e, s) { const ph = e.anim * 1.6, st = e.st, lunge = st === 'atk' ? 1 : 0, lie = st === 'down' || st === 'dead' ? 1 : 0;
    const by = y - (lie ? 4 : 9) * s, col = e.boss ? '#2a0c10' : '#141018';
    for (const pass of [0, 1]) { const o = pass ? 0 : 1, C = (cc) => (pass ? cc : OUT);
      if (!lie) for (let i = 0; i < 4; i++) { const lx = x + face * ((i < 2 ? 6 : -7) + (i % 2) * 2) * s, sw = Math.sin(ph * Math.PI + i * 1.7) * 3 * s * (st === 'walk' || st === 'run' ? 1 : 0.2); pline(c, lx, by + 2 * s, lx + face * sw, y, 1.6 * s + o, C(col)); }
      pblob(c, x - face * 1 * s, by, (11 + lunge * 3) * s + o / 2, 4.5 * s + o / 2, C(col));
      pblob(c, x + face * (10 + lunge * 4) * s, by - 3 * s, 4 * s + o / 2, 3.5 * s + o / 2, C(col)); pblob(c, x + face * (14 + lunge * 4) * s, by - 2 * s, 2.4 * s + o / 2, 1.8 * s + o / 2, C(col));
      pline(c, x - face * 11 * s, by - 1 * s, x - face * 17 * s, by - 5 * s - Math.sin(ph * 3) * 2, 1.4 * s + o, C(col));
      pline(c, x + face * 9 * s, by - 6 * s, x + face * 8 * s, by - 9 * s, 1.4 * s + o, C(col)); }
    px(c, x + face * (11.5 + lunge * 4) * s - 0.5, by - 4 * s, 1.2 * s, 1 * s, '#ff2a1a'); if (lunge) px(c, x + face * 15 * s, by - 1 * s, 2 * s, 0.8 * s, '#fff'); }
  function lizard(c, x, y, face, Lz) { const ph = Lz.anim * 1.4, wh = Lz.whip > 0 ? Math.sin((1 - Lz.whip / 0.45) * Math.PI) : 0;
    for (const pass of [0, 1]) { const o = pass ? 0 : 1, C = (cc) => (pass ? cc : OUT);
      for (let i = 0; i < 4; i++) { const lx = x + face * (i < 2 ? 9 : -9) * 1 + (i % 2 ? 2 : -2), sw = Math.sin(ph * Math.PI + i * 1.6) * 2.5 * (Math.abs(Lz.vx) + Math.abs(Lz.vz) > 4 ? 1 : 0.15); pline(c, lx, y - 5, lx + face * sw + (i % 2 ? 3 : -3), y, 2.2 + o, C('#4a5a2e')); }
      pblob(c, x, y - 7, 16 + o / 2, 5 + o / 2, C('#5a6a3a'));
      const tx = x - face * 30 * (1 - wh * 0.3), ty = y - 3 - wh * 10; pline(c, x - face * 14, y - 6, x - face * 22, y - 5 + Math.sin(ph) * 1.5, 3.2 + o, C('#5a6a3a')); pline(c, x - face * 22, y - 5, tx, ty, 2 + o, C('#5a6a3a'));
      const ex = Lz.bite > 0 ? Math.sin((1 - Lz.bite / 0.4) * Math.PI) * 11 : 0; if (ex > 0.5) pline(c, x + face * 14, y - 8, x + face * (18 + ex), y - 9, 4 + o, C('#5a6a3a')); // v0.83.2: the neck stretches out to bite
      pblob(c, x + face * (18 + ex), y - 9, 5 + o / 2, 3.4 + o / 2, C('#5a6a3a')); pblob(c, x + face * (22 + ex), y - 8 + (ex > 4 ? 1.5 : 0), 3 + o / 2, 2 + o / 2, C('#5a6a3a')); }
    { const ex = Lz.bite > 0 ? Math.sin((1 - Lz.bite / 0.4) * Math.PI) * 11 : 0; if (ex > 4) { px(c, x + face * (21 + ex) - 1.5, y - 8.5, 3, 1.2, '#7a1a1a'); for (let i = 0; i < 3; i++) px(c, x + face * (20 + ex + i), y - 9, 0.5, 0.8, '#fff'); } }
    for (let i = 0; i < 6; i++) pblob(c, x - 10 + i * 4, y - 9 + (i % 2), 1.2, 0.8, '#3a4a22'); { const ex = Lz.bite > 0 ? Math.sin((1 - Lz.bite / 0.4) * Math.PI) * 11 : 0; px(c, x + face * (20 + ex), y - 11, 1, 1, '#ffd400'); if (ex <= 4) px(c, x + face * 22, y - 7, 3, 0.5, '#2a1a10'); } }
  // ---------- the cast
  const LK = {
    mencey: { s: 1.1, bulk: 7.5, skin: '#b5764a', skin2: '#8a5530', cloth: '#6b4a2a', cloth2: '#c9a46a', hair: '#1a120c', long: 4, beard: '#1a120c', band: '#c9a46a', weapon: 'garrote' },
    pastor: { s: 1, bulk: 6, skin: '#c08458', skin2: '#93603a', cloth: '#a07a48', cloth2: '#e8dcc0', hair: '#2a1a10', weapon: 'vara' },
    mirla: { s: 0.95, bulk: 5.5, skin: '#c98a5e', skin2: '#9a6440', cloth: '#8a3a22', cloth2: '#e2b04a', hair: '#140c08', long: 9, dots: '#f0e0b0', weapon: 'baston', gem: '#ffd400' },
    S: { s: 1.05, bulk: 6.5, skin: '#5b5f7a', skin2: '#42465c', cloth: '#2a1a24', cloth2: '#6a1a1a', horns: 0, eye: '#ff3a1a', weapon: 'maza' },
    H: { s: 1.05, bulk: 6.5, skin: '#3d4060', skin2: '#2c2f48', cloth: '#1a1a24', cloth2: '#6a1a1a', horns: 0.5, eye: '#ff3a1a', weapon: 'maza', shield: '#7a5a3a' },
    G: { s: 1.45, bulk: 9, skin: '#6e4a3a', skin2: '#523528', cloth: '#3a2a1a', cloth2: '#2a1a10', horns: 1, eye: '#ff3a1a', weapon: 'garrote' },
    W: { s: 1, bulk: 5, skin: '#d8c8b0', skin2: '#b8a890', cloth: '#1a1a22', cloth2: '#1a1a22', hair: '#d0d0d0', long: 8, robe: true, weapon: 'baston', staff: '#3a2a1a', gem: '#5aff6a', eye: '#5aff6a' },
    D: { s: 0.6, bulk: 6, skin: '#6aa04a', skin2: '#4a7a32', cloth: '#7a4a22', cloth2: '#5a3a18', cap: '#b3271d', weapon: 'none' },
    BG: { s: 1.65, bulk: 9.5, skin: '#4a3a5a', skin2: '#382a46', cloth: '#2a1a10', cloth2: '#8a1a1a', horns: 2, eye: '#ffd400', weapon: 'garrote' },
    BW: { s: 1.15, bulk: 5, skin: '#c8d8b8', skin2: '#a8b898', cloth: '#2a0a2a', cloth2: '#2a0a2a', hair: '#e8e8e8', long: 10, robe: true, weapon: 'baston', staff: '#2a1a10', gem: '#c04aff', eye: '#c04aff' },
    BH: { s: 1.5, bulk: 9, skin: '#5a3a4a', skin2: '#42283a', cloth: '#2a1a10', cloth2: '#8a1a1a', horns: 1.5, eye: '#ffd400', weapon: 'garrote' },
    BY: { s: 2.1, bulk: 9, skin: '#8a1a10', skin2: '#6a120a', cloth: '#1a0804', cloth2: '#ff6a1a', horns: 3, eye: '#ffd400', weapon: 'none' },
    BX: { s: 1.7, bulk: 9, skin: '#8a1a10', skin2: '#6a120a', cloth: '#1a0804', cloth2: '#ff6a1a', horns: 3, eye: '#ffd400', weapon: 'none' },
    GO: { s: 1.05, bulk: 5, skin: '#e9b5a3', skin2: '#ba756a', cloth: '#73172d', cloth2: '#3b1725', hair: '#93944a', long: 6, eye: '#f8f644', weapon: 'none' },
    GM: { s: 1.05, bulk: 5, skin: '#e3cddf', skin2: '#c090a9', cloth: '#73172d', cloth2: '#3b1725', hair: '#403353', long: 6, eye: '#9052bc', weapon: 'none' },
    BGO: { s: 1.35, bulk: 5.5, skin: '#612721', skin2: '#2d1b1e', cloth: '#403353', cloth2: '#242234', hair: '#ffe9e3', long: 7, eye: '#f8f644', weapon: 'none' },
    RA: { s: 1, bulk: 4, skin: '#3a3a52', skin2: '#2a2a3a', cloth: '#3a3a52', cloth2: '#2a2a3a', eye: '#ff5a5a', weapon: 'none' },
    BGX: { s: 1.35, bulk: 9, skin: '#5a3a3a', skin2: '#3a2424', cloth: '#3a2424', cloth2: '#2a1a1a', eye: '#ff8a3a', weapon: 'none' },
  };
  const HEROES = [
    { id: 'mencey', name: 'EL MAGOTE', desc: ['FUERTE Y LENTO', 'GARROTE CANARIO'], look: LK.mencey, hp: 24, spd: 44, dmg: [2, 2, 4], reach: 21, jump: 150, jars: 4, spell: 'IRA DE ACHAMÁN', fuerza: 3, agil: 1, magia: 2 },
    { id: 'pastor', name: 'EL MENCEY', desc: ['ÁGIL, MENOS FUERTE', 'LA VARA DEL SALTO'], look: LK.pastor, hp: 18, spd: 58, dmg: [1, 1, 3], reach: 26, jump: 180, jars: 5, spell: 'VIENTO ALISIO', fuerza: 2, agil: 3, magia: 2 },
    { id: 'mirla', name: 'LA MIRLADORA', desc: ['ÁGIL Y MÁGICA', 'MENOS FÍSICA'], look: LK.mirla, hp: 16, spd: 56, dmg: [1, 1, 2], reach: 17, jump: 165, jars: 7, spell: 'LUZ DE MAGEC', fuerza: 1, agil: 3, magia: 3 }];
  // enemies: hp, speed, reach, damage, wind-up, cooldown, points
  // v0.93 (Jonay): the new characters drawn from the SPRX sheets (09jy/09jz); the puppets stay as a fallback while loading
  const SX_HERO = { mencey: 'magote', pastor: 'mencey', mirla: 'mirla' }, SXP = 2 / Z; // one pixel of a sheet = 2 of the screen
  const SX_BIG = { mencey: 1.2 }; // Jonay: El Magote a 20 % bigger than El Mencey
  const FEM = { W: 1, BW: 1, GO: 1, GM: 1, BGO: 1 }; // (the kick doesn't stun them)
  const EN_NAME = { S: 'SECUAZ', H: 'SECUAZ ESCUDO', G: 'GIGANTÓN', W: 'BRUJA', D: 'DUENDE', T: 'LOBO', GO: 'GORGONA', GM: 'GORGONA', RA: 'RATA' }, EN_LVL = { D: 1, RA: 1, T: 2, S: 2, W: 3, H: 3, G: 4, GO: 4, GM: 4, BG: 5, BW: 6, BT: 6, BH: 7, BGO: 7, BGX: 8, BX: 8, BY: 9 };
  const SX_EN = { S: 'g_secuaz', H: 'g_escudo', G: 'g_giganton', BG: 'g_giganton', BH: 'g_giganton', W: 'g_bruja', BW: 'g_brujamayor', D: 'g_duende', BY: 'g_overlord', BX: 'g_guayota', T: 'g_lobo', BT: 'g_lobo',
    GO: 'g_gorgona1', GM: 'g_gorgona2', BGO: 'g_gorgona3', RA: 'g_rata', BGX: 'g_gollux' }; // v0.98 (Jonay): the wolf for the dogs, the gorgons, Gollux, the rats and Guayota as the Demon Overlord
  // v0.98: how big each new sheet is drawn (its figure is taller or shorter than the GandalfHardcore people's ~48 px) and
  // where the mouth of the biters is (for the bite), in sheet pixels from the feet
  const SX_K = { g_lobo: 0.85, g_gorgona1: 0.64, g_gorgona2: 0.64, g_gorgona3: 0.64, g_gollux: 0.85, g_rata: 1, g_overlord: 0.58 };
  const MOUTH = { g_tibicena: [13, 11], g_lobo: [33, 25], g_rata: [13, 9] };
  const ED = { S: { hp: 8, spd: 34, reach: 18, dmg: 2, wind: 0.42, cd: 1.3, pts: 300 }, H: { hp: 11, spd: 30, reach: 18, dmg: 2, wind: 0.5, cd: 1.5, pts: 400, shield: true },
    T: { hp: 6, spd: 72, reach: 18, dmg: 2, wind: 0.32, cd: 1.1, pts: 350, dog: true }, G: { hp: 22, spd: 24, reach: 25, dmg: 4, wind: 0.65, cd: 1.8, pts: 800, armor: true },
    W: { hp: 8, spd: 30, reach: 0, dmg: 2, wind: 0.5, cd: 2.2, pts: 500, ranged: true }, D: { hp: 1, spd: 62, reach: 0, dmg: 0, wind: 0, cd: 9, pts: 100, thief: true },
    BG: { hp: 46, spd: 26, reach: 28, dmg: 4, wind: 0.6, cd: 1.6, pts: 5000, armor: true, boss: 'EL GIGANTÓN DE TIGAIGA', stomp: true },
    BW: { hp: 40, spd: 34, reach: 0, dmg: 3, wind: 0.5, cd: 1.6, pts: 6000, ranged: true, boss: 'LA BRUJA DE ANAGA', teleport: true },
    BT: { hp: 46, spd: 80, reach: 24, dmg: 3, wind: 0.3, cd: 1.0, pts: 7000, dog: true, boss: 'EL TIBICENA MAYOR' },
    BH: { hp: 30, spd: 26, reach: 25, dmg: 4, wind: 0.6, cd: 1.6, pts: 4000, armor: true, boss: 'LOS HERMANOS GIGANTONES' },
    BY: { hp: 90, spd: 22, reach: 34, dmg: 5, wind: 0.7, cd: 1.5, pts: 20000, armor: true, boss: 'GUAYOTA', stomp: true, fire: true },
    // v0.98 (Jonay): new stages: the gorgons of the malpaís, the rats and Gollux of the ravine, and the old Guayota (the
    // one with the axe) as a lieutenant before the real one
    GO: { hp: 10, spd: 30, reach: 22, dmg: 2, wind: 0.45, cd: 1.4, pts: 450 }, GM: { hp: 10, spd: 32, reach: 22, dmg: 2, wind: 0.42, cd: 1.3, pts: 450 },
    RA: { hp: 3, spd: 78, reach: 12, dmg: 1, wind: 0.25, cd: 1.0, pts: 150, dog: true },
    BGO: { hp: 52, spd: 32, reach: 28, dmg: 4, wind: 0.5, cd: 1.4, pts: 8000, boss: 'LA REINA GORGONA' },
    BGX: { hp: 64, spd: 18, reach: 30, dmg: 5, wind: 0.7, cd: 1.7, pts: 9000, armor: true, boss: 'GOLLUX', stomp: true },
    BX: { hp: 44, spd: 22, reach: 30, dmg: 4, wind: 0.6, cd: 1.5, pts: 6000, armor: true, boss: 'EL HACHA DE GUAYOTA', stomp: true } };
  // ---------- stages: fights at set points (the camera stops until everyone is down), then the boss
  const STAGES = [
    { name: 'EL POBLADO DE TAORO', sub: 'Valle de La Orotava · la noche no acaba', theme: 'taoro', len: 1400, W: [[240, 'S S'], [500, 'S S D'], [780, 'T T S'], [1050, 'S H S D'], [1300, 'BG S S', true]] },
    { name: 'LA LAURISILVA DE ANAGA', sub: 'La niebla esconde a las brujas', theme: 'anaga', len: 1600, W: [[250, 'T T T'], [520, 'S W D'], [800, 'R S'], [1080, 'W H T T D'], [1500, 'BW T T', true]] },
    // v0.98 (Jonay): the ravine of the rats with Gollux, after Anaga
    { name: 'EL BARRANCO DEL INFIERNO', sub: 'Adeje · las cuevas de las ratas', theme: 'barranco', len: 1500, W: [[240, 'RA RA RA'], [500, 'S RA RA D'], [780, 'H S RA RA'], [1060, 'G RA RA RA D'], [1400, 'BGX RA RA', true]] },
    { name: 'LOS ACANTILADOS DE LOS GIGANTES', sub: 'Al borde del mar, sin vuelta atrás', theme: 'gigantes', len: 1600, W: [[250, 'S H S'], [520, 'G D'], [800, 'R T T'], [1100, 'G S W D'], [1500, 'BT T T', true]] },
    // v0.98 (Jonay): the gorgons come out of the lava sea
    { name: 'EL MALPAÍS DE GÜÍMAR', sub: 'Las gorgonas salen del mar de lava', theme: 'malpais', len: 1600, W: [[250, 'GO GM'], [520, 'GO S GM D'], [800, 'R GO GM'], [1080, 'GM GO W GO D'], [1500, 'BGO GO GM', true]] },
    { name: 'LAS CAÑADAS DEL TEIDE', sub: 'Piedra pómez, retama y lava', theme: 'canadas', len: 1700, W: [[250, 'G S S'], [520, 'R R'], [820, 'W W H D'], [1120, 'G G T'], [1600, 'BH BH', true]] },
    { name: 'DENTRO DEL ECHEYDE', sub: 'Guayota tiene a Magec', theme: 'teide', len: 1700, W: [[250, 'H H W'], [520, 'G T T D'], [820, 'R G'], [1100, 'BX S'], [1600, 'BY', true]] }]; // v0.98: the old Guayota (the axe) as a lieutenant; the real one is the Demon Overlord
  // ---------- backgrounds (3 layers, 960 × 336 board px) and the floor strip per theme (cached)
  const bgC = {};
  function background(th) { if (bgC[th]) return bgC[th]; let s0 = th.length * 53; const rr = () => { s0 = (s0 * 9301 + 49297) % 233280; return s0 / 233280; }; const L = [];
    const sky = { taoro: ['#0e0a24', '#3a2a5a'], anaga: ['#14202a', '#4a6a6a'], gigantes: ['#0a1430', '#3a4a7a'], canadas: ['#1a0a1a', '#6a2a2a'], teide: ['#1a0402', '#5a1404'], barranco: ['#0a0a14', '#2e2a3a'], malpais: ['#0a0612', '#40182a'] }[th];
    for (let li = 0; li < 3; li++) { const c = mkCanvas(1920, SH * 2), x = c.getContext('2d'); x.scale(2, 2); L.push(c); // v0.82.2: at ×2 (sharper)
      if (li === 0) { const g = x.createLinearGradient(0, 0, 0, SH * 0.7); g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]); x.fillStyle = g; x.fillRect(0, 0, 960, SH);
        if (th !== 'teide') { for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(255,255,255,${0.2 + rr() * 0.5})`; x.fillRect(rr() * 960, rr() * 150, 1, 1); }
          x.fillStyle = th === 'canadas' ? '#3a1a22' : '#241a3a'; x.beginPath(); x.moveTo(250, 200); x.lineTo(450, 50); x.lineTo(490, 40); x.lineTo(530, 50); x.lineTo(740, 200); x.fill(); // the Teide, dark: no sun
          x.fillStyle = '#ff5a1a'; x.globalAlpha = 0.6; x.fillRect(486, 40, 8, 3); x.globalAlpha = 1; }
        else for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(255,${60 + rr() * 90 | 0},10,${0.08 + rr() * 0.15})`; x.beginPath(); x.arc(rr() * 960, rr() * SH, 20 + rr() * 60, 0, 7); x.fill(); } }
      if (li === 1) { const col = { taoro: '#1e1a30', anaga: '#1e3030', gigantes: '#141c34', canadas: '#2a1418', teide: '#2a0806', barranco: '#1c1714', malpais: '#140c10' }[th]; x.fillStyle = col;
        if (th === 'gigantes') { for (let i = 0; i < 6; i++) { const cx0 = i * 170 + rr() * 40; x.fillRect(cx0, 40 + rr() * 40, 90 + rr() * 30, SH); } x.fillStyle = '#1a2a5a'; x.fillRect(0, 196, 960, 30); }
        else if (th === 'barranco') { x.beginPath(); x.moveTo(0, SH); for (let i = 0; i <= 960; i += 16) x.lineTo(i, 30 + Math.abs(Math.sin(i * 0.009)) * 90 + rr() * 18); x.lineTo(960, SH); x.fill(); } // v0.98: the ravine's high walls
        else if (th === 'malpais') { x.beginPath(); x.moveTo(0, SH); for (let i = 0; i <= 960; i += 12) x.lineTo(i, 172 + rr() * 16 + (i % 120 < 20 ? -20 : 0)); x.lineTo(960, SH); x.fill(); x.fillStyle = '#1a2a4a'; x.fillRect(0, 150, 960, 22); } // the sea behind the black lava
        else { x.beginPath(); x.moveTo(0, SH); for (let i = 0; i <= 960; i += 24) x.lineTo(i, 150 + Math.sin(i * 0.012) * 30 + rr() * 14); x.lineTo(960, SH); x.fill(); } }
      if (li === 2) {
        if (th === 'taoro') for (let i = 0; i < 7; i++) choza(x, 40 + i * 140 + rr() * 30, 212, rr);
        if (th === 'anaga') { for (let i = 0; i < 14; i++) laurel(x, i * 70 + rr() * 30, 214, rr); x.fillStyle = 'rgba(200,220,215,0.18)'; x.fillRect(0, 150, 960, 50); }
        if (th === 'gigantes') { x.fillStyle = '#2a3a6a'; x.fillRect(0, 200, 960, 20); x.fillStyle = 'rgba(255,255,255,0.3)'; for (let i = 0; i < 50; i++) x.fillRect(rr() * 960, 202 + rr() * 16, 6, 1); }
        if (th === 'barranco') { for (let i = 0; i < 9; i++) { const cx0 = 50 + i * 110 + rr() * 30, cy = 120 + rr() * 60; x.fillStyle = '#2a221c'; x.fillRect(cx0 - 30, cy - 10, 60, 120); x.fillStyle = '#060404'; x.beginPath(); x.ellipse(cx0, cy + 22, 13, 16, 0, Math.PI, 0); x.fillRect(cx0 - 13, cy + 22, 26, 14); x.fill(); } // rock and cave mouths
          for (let i = 0; i < 10; i++) cardon(x, rr() * 960, 214, rr); }
        if (th === 'malpais') { for (let i = 0; i < 26; i++) { x.fillStyle = rr() < 0.5 ? '#1a1418' : '#241c22'; x.beginPath(); const bx = rr() * 960, bw = 18 + rr() * 30; x.moveTo(bx, 214); x.lineTo(bx + bw * 0.3, 196 - rr() * 14); x.lineTo(bx + bw * 0.7, 200 - rr() * 10); x.lineTo(bx + bw, 214); x.fill(); }
          for (let i = 0; i < 8; i++) cardon(x, rr() * 960, 214, rr); x.fillStyle = 'rgba(255,90,20,0.35)'; for (let i = 0; i < 18; i++) x.fillRect(rr() * 960, 206 + rr() * 8, 10 + rr() * 20, 1.5); }
        if (th === 'canadas') { for (let i = 0; i < 5; i++) roque(x, 80 + i * 200 + rr() * 40, 214, rr); for (let i = 0; i < 30; i++) { x.fillStyle = '#4a5a2a'; x.beginPath(); x.ellipse(rr() * 960, 210 + rr() * 6, 8, 4, 0, 0, 7); x.fill(); } }
        if (th === 'teide') { x.fillStyle = '#3a0c06'; for (let i = 0; i < 12; i++) { const cx0 = rr() * 960; x.beginPath(); x.moveTo(cx0 - 30, 0); x.lineTo(cx0, 60 + rr() * 60); x.lineTo(cx0 + 30, 0); x.fill(); } x.fillStyle = 'rgba(255,120,20,0.4)'; for (let i = 0; i < 8; i++) x.fillRect(rr() * 960, 0, 3 + rr() * 4, 210); } } }
    return (bgC[th] = L); }
  function choza(x, cx0, y, rr) { x.fillStyle = '#3a3040'; x.fillRect(cx0 - 26, y - 30, 52, 30); x.fillStyle = '#2a2230'; for (let i = 0; i < 8; i++) x.fillRect(cx0 - 26 + i * 7, y - 30 + (i % 2) * 4, 6, 4); // a stone hut with a straw roof
    x.fillStyle = '#5a4a2a'; x.beginPath(); x.moveTo(cx0 - 32, y - 28); x.lineTo(cx0, y - 50 - rr() * 6); x.lineTo(cx0 + 32, y - 28); x.fill(); x.fillStyle = '#ff9a3a'; x.fillRect(cx0 - 5, y - 16, 10, 16); }
  function laurel(x, tx, y, rr) { x.fillStyle = '#1a1410'; x.fillRect(tx - 3, y - 80, 6, 80); x.fillStyle = rr() < 0.5 ? '#14301e' : '#1a3a24'; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(tx + (rr() - 0.5) * 30, y - 90 - i * 14, 24, 14, 0, 0, 7); x.fill(); } }
  function cardon(x, cx0, y, rr) { x.fillStyle = '#2a3a22'; const h = 18 + rr() * 22; for (let i = -2; i <= 2; i++) { const hh = h * (1 - Math.abs(i) * 0.22); x.fillRect(cx0 + i * 5 - 2, y - hh, 4, hh); } } // v0.98: a cardón (the columns of the Canarian spurge)
  function roque(x, cx0, y, rr) { x.fillStyle = '#3a2420'; x.beginPath(); x.moveTo(cx0 - 20, y); x.lineTo(cx0 - 10, y - 70 - rr() * 30); x.lineTo(cx0 + 4, y - 90 - rr() * 20); x.lineTo(cx0 + 18, y); x.fill(); }
  const flC = {};
  function floorImg(th) { if (flC[th]) return flC[th]; const h = SH - (GY - 8) * Z, c = mkCanvas(1920, Math.ceil(h * 2)), x = c.getContext('2d'); x.scale(2, 2); /* v0.82.2: at ×2 */ let s0 = th.length * 7; const rr = () => { s0 = (s0 * 9301 + 49297) % 233280; return s0 / 233280; };
    const col = { taoro: ['#5a4430', '#4a3624'], anaga: ['#2e3a22', '#24301a'], gigantes: ['#4a4038', '#3a322a'], canadas: ['#7a6a52', '#5a4a3a'], teide: ['#3a1a10', '#2a100a'], barranco: ['#4a3a2e', '#3a2c22'], malpais: ['#2a2226', '#1e181c'] }[th];
    const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, col[1]); g.addColorStop(1, col[0]); x.fillStyle = g; x.fillRect(0, 0, 960, h);
    for (let i = 0; i < 500; i++) { x.fillStyle = rr() < 0.5 ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.07)'; x.fillRect(rr() * 960, rr() * h, 2 + rr() * 4, 1 + rr() * 2); }
    if (th === 'teide') { x.fillStyle = 'rgba(255,110,20,0.5)'; for (let i = 0; i < 14; i++) { x.fillRect(rr() * 960, rr() * h, 20 + rr() * 30, 2); } }
    if (th === 'anaga') { x.fillStyle = '#3a5a2a'; for (let i = 0; i < 120; i++) x.fillRect(rr() * 960, rr() * 10, 1, 3 + rr() * 4); }
    x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 0, 960, 4); return (flC[th] = c); }
  // ---------- music: epic chiptune with Canarian drum and flute (the flute: a soft square; the drum: kick + tom)
  const SONGS = {
    title: { bpm: 120, div: 4, ch: [
      { w: 'sq', v: 0.8, legato: 0.95, n: 'D5 . . . A4 . . . D5 . E5 . F5 . . . E5 . D5 . C5 . A4 . . . . . - . . . F5 . . . E5 . D5 . C5 . . . A4 . G4 . A4 . . . . . . . - . . . D5 . . . F5 . A5 . G5 . F5 . E5 . . . D5 . C5 . D5 . E5 . F5 . . . E5 . . . D5 . . . . . . . - . . .' },
      { w: 'tri', v: 1, n: 'D2 . . . D2 . A1 . D2 . . . D2 . A1 . A#1 . . . A#1 . F2 . C2 . . . C2 . G2 .' },
      { w: 'noise', v: 0.9, n: 'k . . . s . . . k . k . s . . . k . . . s . . . k k . k s . s s' }] },
    taoro: { bpm: 132, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'A4 . . C5 D5 . E5 . D5 . C5 . A4 . . . G4 . A4 . C5 . D5 . C5 . A4 . . . - . E5 . . G5 A5 . G5 . E5 . D5 . C5 . . . D5 . E5 . D5 . C5 . A4 . . . . . . . C5 . D5 . E5 . G5 . A5 . . . G5 . E5 . D5 . E5 . C5 . D5 . A4 . . . . . - .' },
      { w: 'sq', v: 0.28, legato: 0.5, n: 'A3 E4 A4 E4 A3 E4 A4 E4 G3 D4 G4 D4 G3 D4 G4 D4 F3 C4 F4 C4 F3 C4 F4 C4 E3 B3 E4 B3 E3 B3 E4 B3' },
      { w: 'tri', v: 1, n: 'A1 . A2 . A1 . A2 . G1 . G2 . G1 . G2 . F1 . F2 . F1 . F2 . E1 . E2 . E1 . E2 .' },
      { w: 'noise', v: 0.9, n: 'k . h . s . k . k . h . s . h s' }] },
    anaga: { bpm: 116, div: 4, ch: [
      { w: 'sq', v: 0.7, legato: 0.95, n: 'E5 . . . B4 . . . G4 . A4 . B4 . . . C5 . B4 . A4 . G4 . F#4 . . . . . . . E4 . G4 . B4 . E5 . D5 . . . C5 . B4 . A4 . . . B4 . . . . . . . - . . . G5 . F#5 . E5 . D5 . C5 . . . B4 . A4 . B4 . . . E5 . . . . . . . . . . . - . . .' },
      { w: 'tri', v: 1, n: 'E2 . . . E2 . B1 . C2 . . . C2 . G1 . A1 . . . A1 . E2 . B1 . . . B1 . F#2 .' },
      { w: 'noise', v: 0.6, n: 'k . . h s . . h k . k h s . . h' }] },
    gigantes: { bpm: 140, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'G4 . B4 . D5 . G5 . F#5 . D5 . B4 . A4 . G4 . A4 . B4 . D5 . E5 . . . D5 . . . G5 . . A5 B5 . A5 . G5 . E5 . D5 . . . E5 . D5 . B4 . A4 . G4 . . . . . . . B4 . C5 . D5 . . . E5 . F#5 . G5 . . . A5 . G5 . F#5 . E5 . D5 . . . . . - .' },
      { w: 'sq', v: 0.28, legato: 0.5, n: 'G3 B3 D4 G4 G3 B3 D4 G4 E3 G3 B3 E4 E3 G3 B3 E4 C3 E3 G3 C4 C3 E3 G3 C4 D3 F#3 A3 D4 D3 F#3 A3 D4' },
      { w: 'tri', v: 1, n: 'G1 . G2 . G1 . G2 . E1 . E2 . E1 . E2 . C1 . C2 . C1 . C2 . D1 . D2 . D1 . D2 .' },
      { w: 'noise', v: 0.9, n: 'k . h k s . h . k . h k s . s h' }] },
    canadas: { bpm: 126, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'C5 . . . G4 . . . A#4 . C5 . D#5 . . . D5 . C5 . A#4 . G4 . . . . . . . - . G4 . A#4 . C5 . D#5 . F5 . G5 . . . F5 . D#5 . D5 . C5 . . . A#4 . . . G4 . . . . . . . C5 . D5 . D#5 . F5 . G5 . . . A#5 . . . G5 . F5 . D#5 . D5 . C5 . . . . . . . - . . .' },
      { w: 'tri', v: 1, n: 'C2 C2 . C2 C2 . G1 . A#1 A#1 . A#1 A#1 . F1 . G#1 G#1 . G#1 G1 G1 . G1' },
      { w: 'noise', v: 0.9, n: 'k . k s . k s . k . k s k k s s' }] },
    teide: { bpm: 112, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'D4 . . . D#4 . . . D4 . . . C4 . . . D4 . . . F4 . . . D#4 . D4 . C4 . . . A4 . . . G#4 . . . G4 . . . F4 . D#4 . D4 . . . . . . . - . . . D5 . C5 . A#4 . A4 . G#4 . G4 . F4 . D#4 . D4 . . . . . . . - . . . - . . .' },
      { w: 'tri', v: 1, n: 'D1 D1 D2 D1 D1 D1 D#2 D1 D1 D1 D2 D1 C2 C2 A#1 A#1' },
      { w: 'noise', v: 1, n: 'k . . k s . k . k . . k s . s s' }] },
    boss: { bpm: 164, div: 4, ch: [
      { w: 'sq', v: 0.85, n: 'D5 . D5 C5 D5 . F5 . D5 . C5 . A4 . G4 . A#4 . A#4 A4 A#4 . D5 . A#4 . A4 . G4 . F4 . G4 . G4 F4 G4 . A#4 . D5 . D#5 . D5 . C5 . C#5 . D5 . . . . . A4 . . . . . . .' },
      { w: 'tri', v: 1, n: 'D2 D3 D2 D3 D2 D3 D2 D3 A#1 A#2 A#1 A#2 A1 A2 C2 C3' },
      { w: 'noise', v: 0.95, n: 'k h s h k k s h k h s h k k s s' }] },
    camp: { bpm: 84, div: 4, ch: [
      { w: 'sq', v: 0.55, legato: 0.98, n: 'A4 . . . C5 . . . E5 . . . D5 . C5 . B4 . . . G4 . . . A4 . . . . . . . F4 . . . A4 . . . C5 . . . B4 . A4 . G#4 . . . E4 . . . A4 . . . . . . .' },
      { w: 'tri', v: 1, n: 'A2 . . . E2 . . . F2 . . . C2 . . . D2 . . . A1 . . . E2 . . . E2 . . .' }] },
  };
  // v0.84 (Jonay: «melodías más largas, varios estribillos que se van alternando»): extra phrases, played A B A B
  { const ALT = {
      taoro: ['E5 . . D5 C5 . A4 . G4 . A4 . C5 . . . D5 . E5 . G5 . A5 . G5 . E5 . D5 . . . C5 . . . A4 . . . G4 . E4 . G4 . A4 . . . . . - .'],
      anaga: ['G4 . . . A4 . . . B4 . . . D5 . C5 . B4 . . . A4 . . . G4 . F#4 . E4 . . . . . . . - . . .'],
      gigantes: ['D5 . . . B4 . G4 . A4 . B4 . C5 . . . B4 . A4 . G4 . F#4 . G4 . . . . . - . G4 . A4 . B4 . D5 . E5 . D5 . B4 . A4 . G4 . . . . . . .'],
      canadas: ['G4 . . . G#4 . . . G4 . F4 . D#4 . . . F4 . G4 . G#4 . A#4 . . . G4 . . . . . . . C5 . . . A#4 . G#4 . G4 . F4 . D#4 . . . C4 . . . . . . .'],
      teide: ['A4 . . . A#4 . . . A4 . . . G4 . . . F4 . . . D#4 . . . D4 . . . . . . . D4 . F4 . G4 . A4 . A#4 . A4 . G4 . F4 . D#4 . . . D4 . . . . . . .'],
      boss: ['F5 . F5 E5 F5 . A5 . F5 . E5 . D5 . C5 . D5 . D5 C5 D5 . F5 . D5 . C5 . A4 . G4 . A4 . . . A#4 . . . C5 . . . D5 . . . . . . .'] };
    for (const k in ALT) { const c = SONGS[k].ch[0]; c.n = [c.n, ...ALT[k]]; c.form = [0, 1, 0, 1]; } }
  const THM = { taoro: 'taoro', anaga: 'anaga', gigantes: 'gigantes', canadas: 'canadas', teide: 'teide', barranco: 'anaga', malpais: 'gigantes' };
  // ---------- the game
  function create(api, opt) {
    const g = { score: 0, over: false, demoKeys: { held: {}, hit: {} } };
    let lives = 3, stageN = 0, loopN = opt.loop || 0, L = null, camX = 0, time = 0, phase = opt.demo ? 'intro' : 'select', phaseT = 0, banner = null, bannerT = 0, waveI = 0, lock = null, shake = 0, spellFx = null, sel = 0, campT = 0, campN = 0, goT = 0;
    const E = [], shots = [], items = [], liz = []; let fx = [];
    // v0.95.2: every sheet starts loading when the machine opens (they load on their first draw; meanwhile the old
    // drawings were built, and that is what read the canvas with getImageData — the 0.90 audit warning)
    for (const k of [...Object.values(SX_HERO), ...Object.values(SX_EN), 'g_duende_azul', 'lagarto', 'lz_mencey', 'lz_pastor', 'lz_mirla']) SPRX.ready(k);
    const p = { hero: HEROES[0], x: 30, z: 22, h: 0, vh: 0, vx: 0, face: 1, hp: 24, st: 'idle', stT: 0, anim: 0, combo: 0, comboT: 0, hitDone: new Set(), jars: 0, inv: 0, tap: { d: 0, t: 0 }, run: false, mount: null };
    const lp = () => 1 + 0.35 * loopN;
    function choose(i) { sel = i; p.hero = HEROES[i]; p.hp = p.hero.hp; p.jars = 0; }
    function load(n) { L = STAGES[n % STAGES.length]; E.length = 0; shots.length = 0; items.length = 0; liz.length = 0; fx = []; waveI = 0; lock = null; camX = 0; spellFx = null;
      p.x = 30; p.z = 22; p.h = 0; p.vh = 0; p.vx = 0; p.st = 'idle'; p.inv = 1.5; p.mount = null; phase = 'intro'; phaseT = 2.8; if (!opt.demo) api.music(SONGS[THM[L.theme]]); }
    // ---------- spawning
    function spawn(k, x, z, extra) { const d = ED[k], look = LK[k] || LK.S; const e = { k, x, z, h: 0, vh: 0, vx: 0, face: -1, hp: d.hp * lp(), max: d.hp * lp(), st: 'walk', stT: 0, anim: Math.random() * 4, cd: 0.6 + Math.random(), d, look, side: Math.random() < 0.5 ? -1 : 1, hitDone: new Set(), hits: 0, ...(extra || {}) };
      if (k === 'BT') e.s = 1.45; if (k === 'T') e.s = 1; E.push(e); return e; }
    function startWave(w) { const [wx, list, isBoss] = w; lock = { x: wx - VW / 2, n: 0, boss: !!isBoss }; const ks = list.split(' ');
      ks.forEach((k, i) => { const side = i % 2 ? -1 : 1, x = side > 0 ? lock.x + VW + 16 + i * 10 : lock.x - 16 - i * 10, z = 6 + ((i * 13) % 34);
        if (k === 'R') { const lz = { x, z, vx: 0, vz: 0, face: -side, anim: 0, whip: 0, rider: null, gone: 0, drops: 0 }; liz.push(lz); const e = spawn('S', x, z, { wave: true }); e.mount = lz; lz.rider = e; lock.n++; return; }
        const e = spawn(k, x, z, { wave: k !== 'D' }); if (k === 'D') e.carry = Math.random() < 0.6 ? 'J' : 'F'; if (k === 'D') e.st = 'thief';
        if (k === 'BH') { const lz = { x, z, vx: 0, vz: 0, face: -side, anim: 0, whip: 0, rider: e, gone: 0, drops: 0 }; liz.push(lz); e.mount = lz; }
        if (k !== 'D') lock.n++; });
      if (isBoss) { const b = E.find((q) => q.d.boss); if (b) { banner = [b.d.boss, '']; bannerT = 3; } if (!opt.demo) api.music(SONGS.boss); } }
    // ---------- hits
    function hit(att, t, dmg, kind) { if (t.st === 'down' || t.st === 'dead' || t.st === 'getup' || t.inv > 0) return false;
      if (t === p && g._god) return false;
      // v0.95 (Jonay): the kick to the crotch stuns (the women only take the damage; the big ones need the strong parry)
      if (kind === 'stun' || kind === 'bigstun') { const fem = t === p ? p.hero.id === 'mirla' : !!FEM[t.k], big = t !== p && ((t.d && (t.d.armor || t.d.boss)) || ((t.look && t.look.s) || 1) >= 1.4);
        t.hp -= dmg; api.sfx('hit'); fx.push({ k: 'spark', t: 0.25, x: (att.x + t.x) / 2, y: GY + t.z - t.h - 10 });
        if (t.hp <= 0) { fall(t, att); return true; }
        if (fem || (big && kind === 'stun')) { t.flash = 0.12; if (!big) { t.st = 'hurt'; t.stT = 0.3; t.stun = false; t.vx = Math.sign(t.x - att.x) * 20; } return true; }
        t.st = 'hurt'; t.stT = t === p ? 0.9 : 1.4; t.stun = true; t.vx = 0; if (t !== p) fx.push({ k: 'pts', t: 0.8, x: t.x, y: GY + t.z - 44, s: '¡ATURDIDO!' }); return true; }
      if (t.d && t.d.shield && t.st !== 'hurt' && kind !== 'knock' && Math.sign(att.x - t.x) === t.face && Math.random() < 0.6) { api.sfx('swing'); fx.push({ k: 'spark', t: 0.2, x: t.x + t.face * 6, y: GY + t.z - 16, col: '#cfd3d9' }); return true; } // blocked by the shield
      t.hp -= dmg; api.sfx('hit'); fx.push({ k: 'spark', t: 0.25, x: (att.x + t.x) / 2, y: GY + t.z - t.h - 16 }); if (att === p) g.score += Math.round((10) * (1 + 0.5 * loopN));
      if (t.mount) { const m = t.mount; m.rider = null; t.mount = null; m.free = true; m.gone = 0; m.drops++; kind = 'knock'; } // knocked off the lizard
      const heavy = kind === 'knock' || t.hp <= 0 || (kind === 'heavy' && !(t.d && t.d.armor && t.hp > t.max * 0.3));
      if (t.d && t.d.armor && kind === 'light') { t.flash = 0.1; if (t.hp <= 0) fall(t, att); return true; } // armour: light hits don't stop them
      if (heavy) fall(t, att); else { const stun = att === p && p.st === 'atk' && p.combo === 2; t.st = 'hurt'; t.stT = stun ? 0.8 : 0.32; t.stun = stun; t.vx = stun ? 0 : Math.sign(t.x - att.x) * 30; } // v0.83.2: after 2 hits they stand dazed (the back-flip window)
      if (t === p && t.hp <= 0) api.sfx('die'); return true; }
    function fall(t, att) { t.st = 'fall'; t.vh = 120; t.h = Math.max(t.h, 1); t.vx = (Math.sign(t.x - att.x) || 1) * 60; t.stT = 0; t.face = -Math.sign(t.vx) || t.face; }
    // ---------- the player
    function die() { lives--; if (opt.demo) lives = 3; if (lives < 0) { g.over = true; lives = 0; return; } p.hp = p.hero.hp; p.st = 'idle'; p.inv = 2.5; p.h = 0; banner = ['¡ARRIBA, GUERRERO!', '']; bannerT = 1.5; }
    g.continue = () => { g.over = false; g.score = 0; lives = 2; p.hp = p.hero.hp; p.st = 'idle'; p.inv = 2.5; if (!opt.demo) api.music(lock && lock.boss ? SONGS.boss : SONGS[THM[L.theme]]); };
    function body(o, dt) { // knock-back / falling / getting up, for anyone
      if (o.st === 'fall') { o.vh -= 380 * dt; o.h += o.vh * dt; o.x += o.vx * dt; if (o.h <= 0) { o.h = 0; o.vh = 0; o.vx = 0; o.st = 'down'; o.stT = o.hp <= 0 ? 1.1 : 0.9; shake = Math.max(shake, 0.12); api.sfx('boom'); } return true; }
      if (o.st === 'down') { o.stT -= dt; if (o.stT <= 0) { if (o.hp <= 0) { o.st = 'dead'; o.stT = 1; } else { o.st = 'getup'; o.stT = 0.45; } } return true; }
      if (o.st === 'getup') { o.stT -= dt; if (o.stT <= 0) { o.st = 'idle'; o.inv = 0.6; } return true; }
      if (o.st === 'hurt') { o.stT -= dt; o.x += o.vx * dt; o.vx *= 0.85; if (o !== p) o.h = Math.max(0, (o.h || 0) - 60 * dt); if (o.stT <= 0) o.st = 'idle'; return true; }
      if (o.st === 'dead') { o.stT -= dt; return true; }
      return false; }
    function player(dt, pad) { p.inv = Math.max(0, p.inv - dt); p.flash = Math.max(0, (p.flash || 0) - dt); /* v0.96 (Jonay): the white flash of a hit stayed on La Mirladora for good */ p.anim += dt * 6; p.comboT = Math.max(0, p.comboT - dt);
      if (p.st === 'dead') { p.stT -= dt; if (p.stT <= 0) die(); return; }
      if (body(p, dt)) { if (p.st === 'dead') { p.stT = 0.6; } return; }
      const H = p.hero, dx = (pad.held('vR') ? 1 : 0) - (pad.held('vL') ? 1 : 0), dz = (pad.held('vD') ? 1 : 0) - (pad.held('vU') ? 1 : 0);
      // v0.95 (Jonay): A held = the strong blow, right button held = the strong parry kick; both = magic.
      // v0.96 (Jonay): every blow comes out ON RELEASE: a short press = the normal one, held half a second = the strong one
      // (before, the normal one came out on pressing and then the strong one charged)
      for (const [b, ch, q, q0] of [['vS', 'chS', 'strong', 'atk'], ['vP', 'chP', 'skick', 'kick']]) { if (pad.hit(b)) { p[ch] = 0; if (!pad.held(b)) { if (!p.mount) p.q = q0; p[ch] = -1; } } /* (a tap that is not held, like the demo pilot's: at once) */ else if (p[ch] >= 0) { if (pad.held(b)) p[ch] += dt; else { if (!p.mount) p.q = p[ch] >= 0.5 ? q : q0; p[ch] = -1; } } }
      if (pad.held('vS') && pad.held('vP') && p.jars > 0 && !p.mount && p.h <= 0 && p.st !== 'magic') { p.st = 'magic'; p.stT = 1.6; p.cast = false; p.chS = p.chP = -1; p.q = null; return; }
      // double tap = run
      for (const [v, d] of [['vR', 1], ['vL', -1]]) if (pad.hit(v)) { if (p.tap.d === d && time - p.tap.t < 0.28) p.run = true; p.tap = { d, t: time }; }
      if (!dx || Math.sign(dx) !== p.face) p.run = p.run && dx !== 0 && Math.sign(dx) === p.face;
      const ride = p.mount, spd = ride ? (p.run ? 96 : 50) : H.spd * (p.run ? 1.9 : 1); // v0.93 (Jonay): running on the lizard is faster too
      if (p.st === 'magic') { p.stT -= dt; if (p.stT < 0.9 && !p.cast) { p.cast = true; castSpell(); } if (p.stT <= 0) { p.st = 'idle'; p.cast = false; } return; }
      // v0.83.2 (Jonay): B on a dazed enemy = a somersault over him and a blow from behind that knocks him down
      if (p.st === 'flip') { const f = p.fl, e = f.e; f.t += dt; const k = Math.min(1, f.t / 0.5); p.x = f.from + (f.to - f.from) * k; p.h = Math.sin(k * Math.PI) * 24; if (e.st === 'hurt') e.stT = Math.max(e.stT, 0.12);
        if (k >= 1) { p.h = 0; p.face = -p.face; p.st = 'atk'; p.combo = 3; p.stT = 0.28; p.atkT = 0.24; p.hitDone.clear(); p.hitDone.add(e);
          if (hit(p, e, (H.dmg[2] + 1) * (1 + 0.1 * loopN), 'knock')) { aimAt(e); g.score += Math.round((300) * (1 + 0.5 * loopN)); fx.push({ k: 'pts', t: 1, x: e.x, y: GY + e.z - 38, s: '¡POR DETRÁS!' }); if (e.hp <= 0) killed(e); } }
        clampP(); return; }
      if (p.st === 'atk' || p.st === 'dash' || p.st === 'jatk' || p.st === 'whip' || p.st === 'bite' || p.st === 'strong' || p.st === 'kick' || p.st === 'skick') { attackStep(dt);
        if (p.st === 'dash') { p.x += p.face * H.spd * 1.8 * dt; p.vh -= 420 * dt; p.h = Math.max(0, p.h + p.vh * dt); if (p.h <= 0 && p.atkT > 0.1) { p.h = 0; p.vh = 0; p.st = 'idle'; } clampP(); } // the flying kick
        if (p.st === 'whip' && p.leap && ride) { p.x += p.face * 120 * dt; clampP(); } // the lizard's leap
        if (p.st !== 'jatk') return; }
      // in the air
      if (p.h > 0 || p.vh > 0) { p.vh -= 420 * dt; p.h += p.vh * dt; p.x += p.vx * dt; p.z = clamp(p.z + dz * 30 * dt, 0, ZD);
        if (p.h <= 0) { p.h = 0; p.vh = 0; if (p.st === 'jatk' && p.vault) shake = 0.1; p.st = 'idle'; p.vault = false; }
        if (pad.hit('vS') && p.st === 'jump') { p.chS = -1; p.q = null; p.st = 'jatk'; p.stT = 0.35; p.atkT = 0; p.hitDone.clear(); api.sfx('swing'); }
        clampP(); return; }
      // on the ground
      if (pad.hit('vP') && !ride && p.run) { p.chP = -1; p.q = null; p.st = 'dash'; p.stT = 0.6; p.atkT = 0; p.hitDone.clear(); p.run = false; p.vh = 120; p.h = 0.1; api.sfx('jump'); return; } // running: the flying kick (on pressing)
      if (p.q && !ride) { const q = p.q; p.q = null; p.atkT = 0; p.hitDone.clear(); api.sfx('swing');
        if (q === 'atk') { p.run = false; p.combo = p.comboT > 0 ? (p.combo % 3) + 1 : 1; p.comboT = 0.6; p.st = 'atk'; p.stT = p.combo === 3 ? 0.5 : 0.28; return; } // the normal blow (combo of three)
        p.st = q; p.stT = q === 'strong' ? 0.55 : q === 'kick' ? 0.3 : 0.45; return; } // the strong blow / the kick to the crotch (stuns) / the strong parry kick
      if (pad.hit('vT') && !ride) { const st0 = E.find((e) => e.st === 'hurt' && e.stun && e.hp > 0 && Math.abs(e.z - p.z) < 8 && (e.x - p.x) * p.face > -2 && Math.abs(e.x - p.x) < H.reach + 8);
        if (st0) { p.st = 'flip'; p.fl = { t: 0, from: p.x, to: st0.x + p.face * 14, e: st0 }; st0.stT = Math.max(st0.stT, 0.7); api.sfx('whoosh'); return; } }
      if (pad.hit('vT')) { const fl = !ride && liz.find((q) => q.free && !q.rider && Math.abs(q.x - p.x) < 16 && Math.abs(q.z - p.z) < 9);
        if (fl) { p.mount = fl; fl.rider = p; fl.free = false; api.sfx('pick'); banner = ['¡EL LAGARTO DE EL HIERRO!', 'A: MORDISCO · CORRIENDO: SALTO Y COLETAZO']; bannerT = 2; return; }
        if (ride) { ride.rider = null; ride.free = true; p.mount = null; }
        p.vh = p.run && H.id === 'pastor' ? H.jump * 1.25 : H.jump; p.h = 0.1; p.vx = dx * spd * (p.run ? 1.15 : 0.8); p.st = 'jump'; p.vault = p.run && H.id === 'pastor'; if (p.vault) { p.vx = p.face * 150; api.sfx('vault'); } else api.sfx('jump'); return; }
      if (pad.hit('vS') && ride) { p.chS = -1; { if (p.run) { p.st = 'whip'; p.stT = 0.45; p.leap = true; ride.hop = 0.45; setTimeout(() => { ride.whip = 0.45; }, 160); } else { p.st = 'bite'; p.stT = 0.4; p.leap = false; ride.bite = 0.4; } p.atkT = 0; p.hitDone.clear(); api.sfx(p.st === 'bite' ? 'bite' : 'whoosh'); p.run = false; return; } } // v0.83.2: the lizard bites (neck out) or, running, leaps and lashes its tail
      if (dx) p.face = dx; p.x += dx * spd * dt; p.z = clamp(p.z + dz * spd * 0.6 * dt, 0, ZD); p.st = dx || dz ? (p.run ? 'run' : 'walk') : 'idle'; if (!dx) p.run = false;
      clampP();
      for (const it of items) if (!it.got && Math.abs(it.x - p.x) < 10 && Math.abs(it.z - p.z) < 7) { it.got = true; if (it.k === 'J') { p.jars = Math.min(H.jars, p.jars + 1); api.sfx('pick'); } else { p.hp = Math.min(H.hp, p.hp + 8); api.sfx('life'); g.score += Math.round((200) * (1 + 0.5 * loopN)); } } }
    function clampP() { const lo = camX + 8, hi = camX + VW - 8; p.x = clamp(p.x, lo, hi); if (p.mount) { p.mount.x = p.x; p.mount.z = p.z; p.mount.face = p.face; } }
    function attackStep(dt) { const H = p.hero; p.atkT += dt; p.stT -= dt; const st = p.st;
      const dur = st === 'atk' ? (p.combo === 3 ? 0.5 : 0.28) : st === 'dash' ? 0.6 : st === 'whip' ? 0.45 : st === 'bite' ? 0.4 : st === 'strong' ? 0.55 : st === 'kick' ? 0.3 : st === 'skick' ? 0.45 : 0.35, k = p.atkT / dur;
      if (k > (st === 'dash' ? 0.12 : 0.35) && k < (st === 'dash' ? 0.9 : 0.75)) { const reach = st === 'whip' ? 32 : st === 'bite' ? 34 : st === 'dash' ? 16 : st === 'strong' ? H.reach + 3 : st === 'kick' || st === 'skick' ? H.reach * 0.8 : H.reach, dmg = st === 'whip' || st === 'bite' ? 3 : st === 'dash' ? H.dmg[2] : st === 'strong' ? H.dmg[2] * 1.6 : st === 'kick' ? 1 : st === 'skick' ? 2 : st === 'jatk' ? H.dmg[2] + (p.vault ? 2 : 0) : H.dmg[p.combo - 1];
        const kind = st === 'kick' ? 'stun' : st === 'skick' ? 'bigstun' : st === 'whip' || st === 'bite' || st === 'dash' || st === 'jatk' || st === 'strong' || p.combo === 3 ? 'knock' : 'light';
        for (const e of E) { if (p.hitDone.has(e) || e.st === 'dead') continue; const ddx = (e.x - p.x) * (st === 'whip' ? Math.sign(e.x - p.x) || 1 : p.face);
          if (ddx > -4 && ddx < reach + (e.d.boss ? 6 : 0) + ((e.look && e.look.s) || 1) * 4 - 4 && Math.abs(e.z - p.z) < 11 + (((e.look && e.look.s) || 1) - 1) * 8 && e.h < 14 + p.h) { p.hitDone.add(e); if (hit(p, e, dmg * (1 + 0.1 * loopN), kind)) { aimAt(e); if (st === 'strong') { fx.push({ k: 'flash', t: 0.22, x: e.x, y: GY + e.z - 22 }); shake = Math.max(shake, 0.15); } if (e.hp <= 0) killed(e); } } } } // v0.94 (Jonay): more margin in depth (z 8 → 11, more for the big ones)
      if (p.stT <= 0 && st !== 'jatk') p.st = 'idle'; }
    // v0.94 (Jonay): the portrait of the enemy you are hitting (top of the screen, with its level and life); a blow
    // that hits several keeps the strongest (the most life), and among equals one at random
    let tgt = null, tgtF = -1, tgtN = 0;
    function aimAt(e) { if (tgtF !== frameN) { tgt = e; tgtF = frameN; tgtN = 1; return; } tgtN++;
      if (e.max > tgt.max || (e.max === tgt.max && Math.random() < 1 / tgtN)) tgt = e; }
    function killed(e) { if (e.scored) return; e.scored = true; g.score += Math.round((e.d.pts) * (1 + 0.5 * loopN)); fx.push({ k: 'pts', t: 0.9, x: e.x, y: GY + e.z - 34, s: String(e.d.pts) });
      if (e.k !== 'D' && !e.d.boss) { const r = Math.random(); if (r < 0.1) items.push({ k: 'J', x: e.x, z: e.z, t: 0 }); else if (r < 0.18) items.push({ k: 'F', x: e.x + 4, z: e.z, t: 0 }); } } // v0.83.2 (Jonay): now and then a magic pouch or some food
    function castSpell() { const H = p.hero, lvl = Math.min(p.jars, H.jars); p.jars = 0; spellFx = { k: H.id, t: 1.4, lvl }; shake = H.id === 'mencey' ? 0.9 : 0.3; api.sfx('boom');
      const dmg = (H.id === 'mencey' ? 4 : H.id === 'pastor' ? 3.5 : 5) * lvl;
      for (const e of E) { if (e.st === 'dead' || e.x < camX - 10 || e.x > camX + VW + 10) continue; const was = e.inv; e.inv = 0; hit(p, e, e.d.boss ? dmg * 0.6 : dmg, 'knock'); e.inv = was; if (e.hp <= 0) killed(e); } }
    // ---------- enemies
    function enemy(e, dt) { e.anim += dt * 6; e.inv = Math.max(0, (e.inv || 0) - dt); e.flash = Math.max(0, (e.flash || 0) - dt); const d = e.d;
      if (body(e, dt)) return;
      const lz = e.mount, spd = (lz ? 46 : d.spd) * (1 + 0.15 * loopN);
      if (e.st === 'thief') { e.x += -e.face * 0 + (e.dir || (e.dir = e.x < p.x ? 1 : -1)) * spd * dt; e.face = e.dir; if (e.x < camX - 40 || e.x > camX + VW + 40) e.gone = true; return; }
      if (e.k === 'D' && e.st === 'idle') { e.st = 'thief'; e.dir = e.x < p.x ? -1 : 1; e.d = { ...d, spd: 110 }; return; } // got hit: runs away
      const dx = p.x - e.x, dz = p.z - e.z; e.cd -= dt;
      // v0.95 (Jonay): the enemies also kick, hit hard and do the running kick, more the higher their level
      const lv = (EN_LVL[e.k] || 1) + loopN, ek = SX_EN[e.k], canK = !d.ranged && !lz && !d.dog && !!(ek && SPRX.D[ek] && SPRX.D[ek].n.length > 8);
      if (e.st === 'edash') { e.stT -= dt; e.x += e.vx * dt; e.vx *= 0.97; if (!d.dog) e.h = Math.sin(Math.min(1, (0.6 - e.stT) / 0.6) * Math.PI) * 6;
        if (!e.hitDone.has(p) && Math.abs(p.x - e.x) < (d.dog ? 18 : 14) * ((e.look && e.look.s) || 1) && Math.abs(dz) < 10 && p.h < 12) { e.hitDone.add(p); hit(e, p, d.dmg + 1 + loopN, 'knock'); if (p.hp <= 0 && p.st !== 'dead') p.st = 'fall'; }
        if (e.stT <= 0) { e.st = 'idle'; e.h = 0; e.cd = d.cd; } return; }
      if (e.cd <= 0 && (canK || d.dog) && p.st !== 'dead' && Math.abs(dx) > 36 && Math.abs(dx) < 110 && Math.abs(dz) < 8 && e.x > camX + 4 && e.x < camX + VW - 4 && (e.engaged || d.boss)) {
        if (Math.random() < (e.k === 'BT' ? 0.7 : d.dog ? 0.25 : 0.04 * lv)) { e.face = Math.sign(dx) || e.face; e.st = 'edash'; e.stT = 0.6; e.vx = e.face * (e.k === 'BT' ? 250 : 190); e.hitDone.clear(); api.sfx(d.dog ? 'bark' : 'whoosh'); return; }
        e.cd = 0.5; }
      if (e.st === 'windup') { e.stT -= dt; if (e.stT <= 0) { e.st = 'atk'; e.stT = 0.3; e.hitDone.clear(); api.sfx(d.dog ? 'bark' : 'swing'); if (d.dog) { e.vx = e.face * 160; } if (lz) { e.lzMove = Math.abs(dx) > 30 ? 'leap' : 'bite'; e.whipped = false; e.stT = 0.45; if (e.lzMove === 'leap') { e.vx = e.face * 150; lz.hop = 0.45; api.sfx('whoosh'); } else { lz.bite = 0.4; api.sfx('bite'); } }
          if (d.ranged) { const n = e.k === 'BW' ? 3 : 1; for (let i = 0; i < n; i++) shots.push({ k: 'fire', x: e.x + e.face * 8, z: e.z + (i - (n - 1) / 2) * 12, h: 14, vx: e.face * 100, t: 3, dmg: d.dmg }); }
          if (d.fire && Math.random() < 0.5) for (let i = 0; i < 4; i++) shots.push({ k: 'fire', x: e.x + e.face * (20 + i * 10), z: e.z, h: 18, vx: e.face * 120, t: 2.2, dmg: d.dmg });
          if (d.stomp && Math.random() < 0.45) { shots.push({ k: 'wave', x: e.x, z: e.z, h: 0, vx: 110, t: 1.2, dmg: d.dmg, both: true }); shake = 0.4; api.sfx('boom'); } } return; }
      if (e.st === 'atk') { e.stT -= dt; if (d.dog) { e.x += e.vx * dt; e.vx *= 0.92; }
        const leap = lz && e.lzMove === 'leap'; if (leap) { e.x += e.vx * dt; e.vx *= 0.94; if (e.stT < 0.2 && !e.whipped) { e.whipped = true; lz.whip = 0.45; } if (lz) { lz.x = e.x; } }
        const reach = lz ? 34 : d.reach;
        if (reach && !e.hitDone.has(p) && e.stT < (leap ? 0.18 : 0.22)) { const ddx = (p.x - e.x) * (leap ? Math.sign(p.x - e.x) || 1 : e.face); if (ddx > -4 && ddx < reach && Math.abs(dz) < 10 && p.h < 12) { e.hitDone.add(p); const mv = e.move || 'hit'; hit(e, p, (d.dmg + loopN) * (mv === 'strong' ? 1.6 : mv === 'kick' ? 0.6 : 1), mv === 'strong' ? 'knock' : mv === 'kick' ? 'stun' : d.armor || lz || d.dog ? 'knock' : 'light'); if (mv === 'strong') fx.push({ k: 'flash', t: 0.22, x: p.x, y: GY + p.z - 22 }); if (p.hp <= 0 && p.st !== 'dead') { p.st = 'fall'; } } }
        if (e.stT <= 0) { e.st = 'idle'; e.cd = d.cd * (0.7 + Math.random() * 0.6) / (1 + 0.2 * loopN); } return; }
      // walking: engage (only two at a time come in close), or hover; the witches keep away; teleports
      const engaged = E.filter((q) => q !== e && q.engaged && q.st !== 'dead' && q.hp > 0).length;
      e.engaged = d.ranged ? false : engaged < 2 || d.boss;
      let tx, tz = p.z; if (d.ranged) { tx = clamp(p.x + (e.x > p.x ? 1 : -1) * 90, camX + 14, camX + VW - 14); tz = p.z + Math.sin(time + e.anim) * 8; } /* the witches keep away, but stay on the screen */ else if (e.engaged) tx = p.x - Math.sign(dx || e.side) * (d.reach - 5 + (lz ? 6 : 0)); else tx = p.x + e.side * 60;
      if (d.teleport && Math.abs(dx) < 34 && e.cd < 0.5 && Math.random() < 0.02) { e.x = camX + (e.x > camX + VW / 2 ? 20 : VW - 20); e.z = 6 + Math.random() * 34; fx.push({ k: 'puff', t: 0.4, x: e.x, y: GY + e.z - 12 }); }
      const mx = tx - e.x, mz = tz - e.z, dist = Math.hypot(mx, mz);
      if (dist > 3) { e.x += (mx / dist) * spd * dt; e.z = clamp(e.z + (mz / dist) * spd * 0.6 * dt, 0, ZD); e.st = 'walk'; } else e.st = 'idle';
      e.face = Math.sign(dx) || e.face;
      if (e.x > camX + 4 && e.x < camX + VW - 4) e.inS = true; if (e.inS) e.x = clamp(e.x, camX + 6, camX + VW - 6); // once on the screen they stay on it (no hitting from outside)
      if (e.cd <= 0 && p.st !== 'dead') { const inR = d.ranged ? Math.abs(dz) < 10 : Math.abs(dx) < (lz ? 60 : d.reach + 6) && Math.abs(dz) < 7; if (inR && (e.engaged || d.ranged) && e.x > camX + 4 && e.x < camX + VW - 4) { const r = Math.random(); e.move = !canK ? 'hit' : r < 0.06 * lv ? 'strong' : r < 0.11 * lv ? 'kick' : 'hit'; e.st = 'windup'; e.stT = d.wind * (e.move === 'strong' ? 1.5 : e.move === 'kick' ? 0.7 : 1); } } /* v0.84: they only attack from inside the screen (Guayota hit you from beyond the edge) */
      // the bosses call for help at half health
      if (d.boss && !e.called && e.hp < e.max / 2) { e.called = true; const k2 = e.k === 'BT' || e.k === 'BY' ? 'T' : e.k === 'BGO' ? 'GO' : e.k === 'BGX' ? 'RA' : 'S'; for (const sd of [-1, 1]) spawn(k2, sd > 0 ? camX + VW + 20 : camX - 20, 10 + Math.random() * 24, { wave: true }); lock.n += 2; }
      if (lz) { lz.x = e.x; lz.z = e.z; lz.face = e.face; lz.vx = mx; lz.vz = mz; } }
    function lizards(dt) { for (const lz of liz) { lz.anim += dt * 4; lz.whip = Math.max(0, lz.whip - dt); lz.bite = Math.max(0, (lz.bite || 0) - dt); lz.hop = Math.max(0, (lz.hop || 0) - dt);
        if (lz.free) { lz.gone += dt; if (lz.gone > 20 || lz.drops > 2) { lz.x += 60 * dt; lz.vx = 60; } else { lz.vx = 0; lz.vz = 0; } } } }
    function updShots(dt) { for (const s of shots) { s.t -= dt;
        if (s.k === 'wave') { s.r = (s.r || 0) + s.vx * dt; if (p.h < 3 && Math.abs(Math.abs(p.x - s.x) - s.r) < 6 && Math.abs(p.z - s.z) < 20 && !s.hitP) { s.hitP = true; hit({ x: s.x }, p, s.dmg, 'knock'); } }
        else { s.x += s.vx * dt; if (!s.hitP && Math.abs(s.x - p.x) < 7 && Math.abs(s.z - p.z) < 6 && p.h < s.h + 6) { s.hitP = true; s.t = 0; hit({ x: s.x - s.vx }, p, s.dmg, 'knock'); } } }
      for (let i = shots.length - 1; i >= 0; i--) if (shots[i].t <= 0) shots.splice(i, 1); }
    // ---------- the night camp between stages: the duendes come to steal while you rest; kick them for pouches
    function camp(dt, pad) { campT -= dt; if (campT > 0.5 && Math.random() < dt * 1.1 && campN < 10) { campN++; const sd = Math.random() < 0.5 ? -1 : 1; const e = spawn('D', sd > 0 ? camX + VW + 10 : camX - 10, 8 + Math.random() * 30); e.carry = Math.random() < 0.7 ? 'J' : 'F'; e.st = 'thief'; e.dir = -sd; }
      player(dt, pad); for (const e of E) { if (e.k === 'D') { if (e.st === 'thief' && Math.abs(e.x - (camX + VW / 2)) < 6) e.dir = -e.dir * 1; enemy(e, dt); } } drops(); E.splice(0, E.length, ...E.filter((e) => !e.gone && e.st !== 'dead'));
      if (campT <= 0) { stageN++; load(stageN); } }
    function drops() { for (const e of E) if (e.k === 'D' && e.carry && (e.st === 'hurt' || e.st === 'fall' || e.st === 'down')) { items.push({ k: e.carry, x: e.x, z: e.z, t: 0 }); if (Math.random() < 0.4) items.push({ k: e.carry, x: e.x + 8, z: e.z + 3, t: 0 }); e.carry = null; killed(e); } }
    // ---------- demo pilot: walks to the nearest enemy, lines up, hits; magic when crowded; walks on when the way is open
    function demoPilot() { const k = g.demoKeys; k.hit = {}; k.held = {}; let best = null, bd = 1e9;
      for (const e of E) if (e.st !== 'dead' && e.hp > 0 && e.k !== 'D' && e.x > camX - 30 && e.x < camX + VW + 30) { const d = Math.abs(e.x - p.x) + Math.abs(e.z - p.z) * 2; if (d < bd) { bd = d; best = e; } }
      if (!best) { k.held.vR = true; if (p.z < 18) k.held.vD = true; else if (p.z > 26) k.held.vU = true; return; }
      const want = best.x - Math.sign(best.x - p.x || 1) * Math.min(p.hero.reach - 6, 13); if (Math.abs(p.x - want) > 3) k.held[p.x < want ? 'vR' : 'vL'] = true; if (Math.abs(best.z - p.z) > 3) k.held[best.z > p.z ? 'vD' : 'vU'] = true;
      if (Math.abs(p.x - want) < 4 && Math.abs(best.z - p.z) < 5) { p.face = Math.sign(best.x - p.x) || p.face; if (p.st === 'idle' || p.st === 'walk') k.hit.vS = true; }
      const close = E.filter((e) => e.st !== 'dead' && e.hp > 0 && Math.abs(e.x - p.x) < 80).length; if (p.jars >= 2 && (close >= 3 || (best.d.boss && p.jars >= 3))) { k.held.vS = k.held.vP = true; delete k.hit.vS; } } // v0.96: the magic is now both buttons held (vP alone kicks)
    // ---------- step
    let frameN = 0;
    g.update = (dt, pad) => { time += dt; frameN++; if (bannerT > 0) bannerT -= dt; shake = Math.max(0, shake - dt); if (spellFx) { spellFx.t -= dt; if (spellFx.t <= 0) spellFx = null; }
      for (const f of fx) { f.t -= dt; if (f.k === 'pts') f.y -= 18 * dt; } fx = fx.filter((f) => f.t > 0);
      if (opt.demo) { demoPilot(); pad = { held: (v) => !!g.demoKeys.held[v], hit: (v) => !!g.demoKeys.hit[v] }; }
      if (phase === 'select') { if (pad.hit('vR')) { sel = (sel + 1) % 3; api.sfx('pick'); } if (pad.hit('vL')) { sel = (sel + 2) % 3; api.sfx('pick'); } if (pad.hit('vS') || pad.hit('vT')) { choose(sel); api.sfx('start'); load(0); } return; }
      if (phase === 'intro') { phaseT -= dt; if (phaseT <= 0 || (!opt.demo && pad.hit('vS') && phaseT < 2.2)) phase = 'play'; return; }
      if (phase === 'clear') { phaseT -= dt; if (phaseT < 2.5 && !g.tally) { g.tally = true; g.score += Math.round((p.hp * 100 + p.jars * 500) * (1 + 0.5 * loopN)); }
        if (phaseT <= 0) { g.tally = false; if (stageN % STAGES.length === STAGES.length - 1) { phase = 'ending'; phaseT = 7; if (!opt.demo) api.music(SONGS.title); } else { phase = 'camp'; campT = 11; campN = 0; E.length = 0; items.length = 0; liz.length = 0; p.mount = null; /* v0.95.2 (Jonay): off the lizard, or he was not drawn at the camp */ camX = 0; p.x = VW / 2 - 20; p.z = 24; p.st = 'idle'; if (!opt.demo) api.music(SONGS.camp); banner = ['EL CAMPAMENTO', '¡QUE NO TE ROBEN LOS DUENDES!']; bannerT = 2.5; } } return; }
      if (phase === 'ending') { phaseT -= dt; if (phaseT <= 0) { loopN++; stageN++; banner = ['¡VUELTA ' + (loopN + 1) + '!', 'GUAYOTA HA VUELTO · PUNTOS ×' + String(1 + 0.5 * loopN).replace('.', ',')]; bannerT = 2.5; load(stageN); } return; }
      if (phase === 'camp') { camp(dt, pad); return; }
      player(dt, pad); for (const e of E) enemy(e, dt); lizards(dt); updShots(dt); drops();
      for (let i = E.length - 1; i >= 0; i--) { const e = E[i]; if ((e.st === 'dead' && e.stT <= 0) || e.gone) { if (e.wave && lock) lock.n--; E.splice(i, 1); } }
      if (p.hp <= 0 && p.st === 'idle') { p.st = 'fall'; p.vh = 100; p.h = 1; }
      if (p.hp <= 0 && p.st === 'down') { p.st = 'dead'; p.stT = 0.4; }
      // the camera: free walking, stopped during a fight
      if (lock) { camX = lerp(camX, lock.x, 0.08); if (lock.n <= 0) { if (lock.boss) { phase = 'clear'; phaseT = 4.5; api.stopMusic(); api.sfx('clear'); } else { lock = null; goT = 3; if (!opt.demo) api.music(SONGS[THM[L.theme]]); } } }
      else { camX = Math.max(camX, lerp(camX, clamp(p.x - VW * 0.4, 0, L.len - VW), 0.1)); const w = L.W[waveI]; if (w && p.x > w[0] - VW * 0.25) { startWave(w); waveI++; } }
      goT = Math.max(0, goT - dt); };
    // ---------- drawing
    const flick = () => Math.floor(time * 16) % 2 === 0;
    function poseOf(o) { const st = o.st;
      if (st === 'walk') return cyc(WALK, o.anim * 0.7); if (st === 'run' || st === 'thief') return cyc(RUN, o.anim * 0.9);
      if (st === 'atk') { if (o === p) { const k = p.atkT / (p.combo === 3 ? 0.5 : 0.28); return p.combo === 3 ? (k < 0.4 ? PO.wind : PO.smash) : k < 0.3 ? PO.idle : p.combo === 1 ? PO.atk1 : PO.atk2; } return o.stT > 0.15 ? PO.atk1 : PO.smash; }
      if (st === 'flip') return PO.jump; if (st === 'windup') return PO.wind; if (st === 'dash') return PO.fkick; if (st === 'jump') return PO.jump; if (st === 'jatk') return PO.jatk; if (st === 'whip') return PO.ride;
      if (st === 'hurt') return PO.hurt; if (st === 'fall') return mix(PO.hurt, PO.down, 0.5); if (st === 'down' || st === 'dead') return PO.down; if (st === 'getup') return mix(PO.down, PO.idle, 1 - o.stT / 0.45);
      if (st === 'magic') return PO.magic; return PO.idle; }
    const hopOf = (lz) => (lz.hop > 0 ? Math.sin((1 - lz.hop / 0.45) * Math.PI) * 9 : 0);
    /** [row, frame] of an actor's sheet for its state (rows: 0 idle, 1 walk, 2 run, 3 jump up, 4 down, 5 attack, 6 death) */
    function sxAnim(o, k) { const t = SPRX.stT(o, time), st = o.st, F = SPRX.fr, n = SPRX.D[k].n, last = (r) => (n[r] || 1) - 1;
      if (k === 'g_tibicena') return st === 'walk' || st === 'run' || st === 'atk' || st === 'windup' ? [1, F(k, 1, t, 12)] : [0, F(k, 0, t, 6)];
      if (st === 'walk') return [1, F(k, 1, t, 10)]; if (st === 'run' || st === 'thief') return [2, F(k, 2, t, 13)];
      if (st === 'atk') { const dur = o === p ? (p.combo === 3 ? 0.5 : 0.28) : o.move === 'strong' ? 0.45 : 0.3; return [5, Math.min(last(5), Math.floor(t / dur * (last(5) + 1)))]; }
      if (st === 'dash' || st === 'edash') return n.length > 8 ? [8, Math.min(1, Math.floor(t * 6))] : [2, F(k, 2, t, 16)]; // the running kick, flying flat
      if (st === 'kick' || st === 'skick') return [7, Math.min(2, Math.floor(t / (st === 'kick' ? 0.3 : 0.45) * 3))];
      if (st === 'strong') return [5, Math.min(last(5), Math.floor(t / 0.55 * (last(5) + 1)))];
      if (st === 'atk' && o !== p && o.move === 'kick' && n.length > 8) return [7, Math.min(2, Math.floor(t / 0.3 * 3))];
      if (st === 'windup') return [5, 1]; if (st === 'jatk') return [5, 3];
      if (st === 'jump' || st === 'flip' || st === 'whip') return t < 0.3 ? [3, F(k, 3, t, 12, false)] : [4, F(k, 4, t - 0.3, 12, false)];
      if (st === 'hurt') return k === 'g_brujamayor' ? [3, 0] : [6, 1]; if (st === 'fall') return [6, Math.min(last(6) - 1, 1 + Math.floor(t * 14))];
      if (st === 'down' || st === 'dead') return [6, last(6)]; if (st === 'getup') return [6, Math.max(0, last(6) - Math.floor(t * 20))];
      if (st === 'magic') return [5, k === 'mirla' ? 4 : 1]; return [0, F(k, 0, t, 6)]; }
    const sxScale = (o) => { if (o === p) return SXP * (SX_BIG[p.hero.id] || 1); const k = SX_K[SX_EN[o.k]]; return SXP * (o.s || (o.look && o.look.s) || 1) * (k || (o.d && o.d.dog ? 1.6 : 1)); }; // Jonay: bigger dogs; v0.98: each new sheet at its size
    /** the bite of the dogs (like the lizard's): jaws with teeth that open and snap shut (k 0 → 1) */
    // v0.96 (Jonay: «se queda fuera del perro y es demasiado grande»): smaller, and on the snout
    function chomp(c, x, y, k, s) { const op = k < 0.5 ? k * 2 : 2 - k * 2, g = (0.5 + op * 2) * s, w = 5 * s;
      c.fillStyle = '#6e1012'; c.fillRect(x - w / 2, y - g, w, g * 2);
      for (const sd of [-1, 1]) { c.fillStyle = '#141018'; c.fillRect(x - w / 2 - s * 0.5, y + sd * g - (sd < 0 ? s : 0), w + s, s);
        c.fillStyle = '#f4f0e2'; for (let i = 0; i < 3; i++) { const tx = x - w / 2 + (i + 0.5) * w / 3; c.beginPath(); c.moveTo(tx - 0.6 * s, y + sd * g); c.lineTo(tx + 0.6 * s, y + sd * g); c.lineTo(tx, y + sd * (g - 1.4 * s)); c.fill(); } } }
    /** the lizard: walking, biting, with the hero on it (one sheet each) or an enemy sitting on its back */
    function drawLiz(c, sx, sy, q) { const mv = Math.abs(q.x - (q._px === undefined ? q.x : q._px)) + Math.abs(q.z - (q._pz === undefined ? q.z : q._pz)) > 0.05; q._px = q.x; q._pz = q.z;
      const r = q.bite > 0 ? 2 : mv ? 1 : 0, f = r === 2 ? Math.min(5, Math.floor((1 - q.bite / 0.4) * 6)) : SPRX.fr('lagarto', r, time, r ? (q.rider === p && p.run ? 18 : 10) : 5);
      if (q.rider === p && SPRX.draw(c, 'lz_' + p.hero.id, r, f, sx, sy, q.face, SXP)) return; // (on the lizard all at the lizard's size)
      if (!SPRX.draw(c, 'lagarto', r, f, sx, sy, q.face, SXP)) { lizard(c, sx, sy, q.face, q); return; }
      const e = q.rider; if (e && e !== p && SX_EN[e.k]) { const d = SPRX.D.lagarto, s = sxScale(e), seatX = sx + q.face * d.seat[0] * SXP, seatY = sy + d.seat[1] * SXP;
        SPRX.draw(c, SX_EN[e.k], 0, 0, seatX, seatY + 12 * s, q.face, s, seatY); if (e.flash > 0) { c.globalAlpha = 0.5; pblob(c, seatX, seatY - 12, 6, 10, '#fff'); c.globalAlpha = 1; } } }
    function drawActor(c, o) { const sx = o.x - camX, sy = GY + o.z - o.h; if (sx < -60 || sx > VW + 60) return; if (o.st === 'dead' && flick()) return; if (o.inv > 0 && flick() && o.st !== 'getup') return;
      pblob(c, sx, GY + o.z, (o.d && o.d.dog ? 12 : 7) * (o.s || (o.look && o.look.s) || 1), 1.6, 'rgba(0,0,0,0.35)');
      const sk = o === p ? SX_HERO[p.hero.id] : o.k === 'D' && o.carry === 'J' ? 'g_duende_azul' : SX_EN[o.k]; // (the blue cap carries the blue potions)
      if (o.mount && SPRX.ready('lagarto')) return; // drawn sitting on its lizard (drawLiz)
      if (sk && SPRX.ready(sk)) { const [r, f] = sxAnim(o, sk); SPRX.draw(c, sk, r, f, sx, sy, o.face, sxScale(o));
        if (o.d && o.d.dog && (o.st === 'atk' || o.st === 'windup')) chomp(c, sx + o.face * (MOUTH[sk] || MOUTH.g_tibicena)[0] * sxScale(o), sy - (MOUTH[sk] || MOUTH.g_tibicena)[1] * sxScale(o), o.st === 'windup' ? 0 : SPRX.stT(o, time) / 0.3, sxScale(o));
        const hs = 44 * sxScale(o); if (o.st === 'hurt' && o.stun) for (let i = 0; i < 3; i++) { const a = time * 6 + i * 2.1; pblob(c, sx + Math.cos(a) * 7, sy - hs + Math.sin(a) * 2, 1.4, 1.4, i % 2 ? '#fff6a0' : '#ffd400'); } // dazed: stars
        if (o === p && (p.chS > 0.5 || p.chP > 0.5)) pblob(c, sx + p.face * 8, sy - hs * 0.55, 3 + Math.sin(time * 30), 3 + Math.sin(time * 30), flick() ? '#fff' : '#ffd400'); // charging the strong blow
        if (o !== p && o.st === 'windup' && o.move === 'strong' && flick()) pblob(c, sx + o.face * 8, sy - hs * 0.6, 3, 3, '#ff8a3a');
        if (o.flash > 0) { c.globalAlpha = 0.5; pblob(c, sx, sy - 14, 6, 12, '#fff'); c.globalAlpha = 1; } return; }
      if (o.d && o.d.dog) { dog(c, sx, sy, o.face, o, o.s || 1); return; }
      const riding = o.mount, P = riding ? (o.st === 'whip' || o.st === 'atk' ? PO.ride : PO.ride) : poseOf(o);
      const glow = o === p && p.st === 'magic' ? (flick() ? '#fff' : '#ffd400') : null;
      if (o === p && PIXGUAN.draw(c, sx, sy, o.face, P, p.hero.id, p.hero.look.s)) { if (glow) pblob(c, sx + o.face * P.hf[0] * p.hero.look.s, sy + P.hf[1] * p.hero.look.s, 2.5, 2.5, glow); } // v0.90: the G1 heroes
      else puppet(c, sx, riding ? sy - 10 - hopOf(riding) : sy, o.face, P, o.look || p.hero.look, glow);
      if (o.k === 'D' && o.carry) pblob(c, sx - o.face * 3, sy - 12, 3, 3, o.carry === 'J' ? '#3a6ad0' : '#c03a2a');
      if (o.flash > 0) { c.globalAlpha = 0.5; pblob(c, sx, sy - 14, 6, 12, '#fff'); c.globalAlpha = 1; } }
    g.draw = (c) => { const bg = background(L ? L.theme : 'taoro'), th = L ? L.theme : 'taoro';
      if (phase === 'select') { drawSelect(c); return; }
      const night = phase === 'camp'; const ox = (shake > 0 ? (Math.random() - 0.5) * 6 : 0);
      [0.15, 0.4, 0.7].forEach((k, i) => { const o = -Math.round((camX * Z * k) % 960) + ox; c.drawImage(bg[i], o, 0, 960, SH); c.drawImage(bg[i], o + 960, 0, 960, SH); });
      const fl = floorImg(th), fo = -Math.round((camX * Z) % 960) + ox; c.drawImage(fl, fo, (GY - 8) * Z, 960, fl.height / 2); c.drawImage(fl, fo + 960, (GY - 8) * Z, 960, fl.height / 2);
      if (night) { c.fillStyle = 'rgba(0,0,30,0.45)'; c.fillRect(0, 0, SW, SH); }
      c.save(); c.translate(ox, 0); c.scale(Z, Z);
      if (night) { const fx0 = VW / 2, fy = GY + 20; pblob(c, fx0, fy + 2, 10, 2, 'rgba(255,140,40,0.3)'); for (let i = 0; i < 5; i++) pline(c, fx0 - 6 + i * 3, fy, fx0 - 4 + i * 2, fy - 4, 1.2, '#5a3a1a'); pblob(c, fx0, fy - 4 - Math.sin(time * 9), 3, 4 + Math.sin(time * 13), flick() ? '#ffb02a' : '#ff6a1a'); }
      for (const it of items) { if (it.got) continue; it.t += 0.016; const x = it.x - camX, y = GY + it.z; if (x < -10 || x > VW + 10) continue;
        if (it.k === 'J') { pblob(c, x, y - 3, 3, 3, '#2a4aa0'); pblob(c, x, y - 4, 2, 2, '#5a8ae0'); px(c, x - 1, y - 7, 2, 1.5, '#e8dcc0'); } else { pblob(c, x, y - 3, 3.5, 2.6, '#c9a46a'); pblob(c, x - 1, y - 4, 1.5, 1, '#f0e0b0'); } }
      const all = [...E, ...liz.map((q) => ({ isL: true, q, z: q.z, x: q.x })), p].sort((a, b) => a.z - b.z);
      for (const o of all) { if (o.isL) { const q = o.q, sx = q.x - camX; if (sx < -60 || sx > VW + 60) continue; pblob(c, sx, GY + q.z, 18, 2, 'rgba(0,0,0,0.35)'); drawLiz(c, sx, GY + q.z - hopOf(q), q); } else drawActor(c, o); }
      for (const s of shots) { const x = s.x - camX, y = GY + s.z - s.h; if (s.k === 'fire') { pblob(c, x, y, 4, 3, flick() ? '#ff6a1a' : '#ffd400'); pblob(c, x - Math.sign(s.vx) * 4, y, 2.5, 2, 'rgba(255,90,20,0.6)'); }
        else { c.strokeStyle = 'rgba(255,200,120,0.8)'; c.lineWidth = 1.5; for (const sd of [-1, 1]) { c.beginPath(); c.ellipse(s.x - camX + sd * 0, GY + s.z, s.r || 1, 3, 0, 0, 7); c.stroke(); } } }
      for (const f of fx) { const x = f.x - camX; if (f.k === 'spark') { const k = 1 - f.t / 0.25; c.fillStyle = f.col || '#fff6a0'; for (let i = 0; i < 6; i++) c.fillRect(R2(x + Math.cos(i * 1.05) * (2 + k * 7)), R2(f.y + Math.sin(i * 1.05) * (2 + k * 7)), 1, 1); }
        else if (f.k === 'flash') { const k = f.t / 0.22; c.globalAlpha = k; pblob(c, x, f.y, 4 + (1 - k) * 12, 4 + (1 - k) * 12, '#fff'); c.globalAlpha = 1; }
        else if (f.k === 'puff') { c.globalAlpha = f.t / 0.4; pblob(c, x, f.y, 8, 8, '#5aff6a'); c.globalAlpha = 1; } else if (f.k === 'pts') A.txt(c, f.s, x, f.y, '#fff', 5, 'center'); }
      c.restore();
      if (spellFx) drawSpell(c);
      hud(c);
      if (goT > 0 && flick()) A.txt(c, '¡ADELANTE! →', SW - 20, SH / 2 - 30, '#ffd400', 14, 'right');
      if (phase === 'intro') { c.fillStyle = 'rgba(0,0,0,0.7)'; c.fillRect(0, SH / 2 - 44, SW, 88); A.txt(c, (loopN ? 'VUELTA ' + (loopN + 1) + ' · ' : '') + 'FASE ' + (stageN % STAGES.length + 1), SW / 2, SH / 2 - 36, '#9fd7ff', 8, 'center'); A.txt(c, L.name, SW / 2, SH / 2 - 16, '#ffd400', 12, 'center'); A.txt(c, L.sub, SW / 2, SH / 2 + 16, '#fff', 8, 'center'); }
      if (phase === 'clear') { c.fillStyle = 'rgba(0,0,0,0.6)'; c.fillRect(0, SH / 2 - 44, SW, 88); A.txt(c, '¡FASE SUPERADA!', SW / 2, SH / 2 - 34, '#ffd400', 14, 'center'); if (phaseT < 2.5) { A.txt(c, 'VIDA  ' + Math.max(0, Math.round(p.hp)) * 100, SW / 2, SH / 2, '#fff', 8, 'center'); A.txt(c, 'MAGIA ' + p.jars * 500, SW / 2, SH / 2 + 14, '#fff', 8, 'center'); } }
      if (phase === 'ending') { const k = Math.min(1, (7 - phaseT) / 3); c.fillStyle = `rgba(255,220,120,${k * 0.8})`; c.fillRect(0, 0, SW, SH); c.fillStyle = '#fff6c0'; c.beginPath(); c.arc(SW / 2, 110, 30 + k * 30, 0, 7); c.fill();
        A.txt(c, '¡MAGEC ES LIBRE!', SW / 2, 190, '#6a2a0a', 16, 'center'); A.txt(c, 'EL SOL VUELVE A TENERIFE', SW / 2, 220, '#6a2a0a', 8, 'center'); A.txt(c, 'GUAYOTA QUEDA ENCERRADO EN EL ECHEYDE', SW / 2, 236, '#6a2a0a', 8, 'center'); }
      if (bannerT > 0 && banner) { c.fillStyle = 'rgba(0,0,0,0.6)'; c.fillRect(0, 50, SW, 34); A.txt(c, banner[0], SW / 2, 56, '#ffd400', 8, 'center'); A.txt(c, banner[1], SW / 2, 70, '#fff', 6, 'center'); } };
    function drawSpell(c) { const f = spellFx, k = 1 - f.t / 1.4, lvl = f.lvl;
      if (f.k === 'mencey') { c.fillStyle = `rgba(120,60,20,${0.4 * (1 - k)})`; c.fillRect(0, 0, SW, SH); c.strokeStyle = '#ffb02a'; c.lineWidth = 3; for (let i = 0; i < 3 + lvl * 2; i++) { const x0 = (i * 97) % SW; c.beginPath(); c.moveTo(x0, (GY + 10) * Z); c.lineTo(x0 + 20, (GY + 20) * Z); c.lineTo(x0 - 10, (GY + 34) * Z); c.stroke(); }
        for (let i = 0; i < lvl * 4; i++) { const x = (i * 61 + k * 40) % SW, y = k * 300 - (i % 5) * 40; c.fillStyle = '#6a5a4a'; c.fillRect(x, y, 10, 8); } }
      if (f.k === 'pastor') { c.fillStyle = `rgba(200,230,255,${0.25 * (1 - k)})`; c.fillRect(0, 0, SW, SH); for (let i = 0; i < 1 + lvl; i++) { const x = (k * 1.4 * SW + i * 90) % (SW + 100) - 50; for (let j = 0; j < 10; j++) { c.strokeStyle = `rgba(230,245,255,${0.8 - j * 0.06})`; c.lineWidth = 2; c.beginPath(); c.ellipse(x + Math.sin(time * 20 + j) * 4, (GY + 30) * Z - j * 18, 10 + j * 4, 4 + j, 0, 0, 7); c.stroke(); } } }
      if (f.k === 'mirla') { c.fillStyle = `rgba(255,230,140,${0.5 * (1 - k)})`; c.fillRect(0, 0, SW, SH); c.fillStyle = '#fff6c0'; c.beginPath(); c.arc(SW / 2, 30, 20 + lvl * 4, 0, 7); c.fill();
        for (let i = 0; i < 4 + lvl * 2; i++) { const a = Math.PI * (0.15 + 0.7 * (i / (3 + lvl * 2))); c.strokeStyle = `rgba(255,240,150,${0.9 - k * 0.6})`; c.lineWidth = 4 + lvl; c.beginPath(); c.moveTo(SW / 2, 30); c.lineTo(SW / 2 + Math.cos(a) * 600, 30 + Math.sin(a) * 600); c.stroke(); } }
      A.txt(c, p.hero.spell, SW / 2, 30, '#fff', 10, 'center'); }
    function hud(c) { const H = p.hero; c.fillStyle = 'rgba(0,0,0,0.5)'; c.fillRect(0, 0, SW, 30);
      if (tgt && !E.includes(tgt)) tgt = null;
      if (tgt) { const k = tgt.k === 'D' && tgt.carry === 'J' ? 'g_duende_azul' : SX_EN[tgt.k], d = k && SPRX.D[k], bx = 252, by = 2;
        c.fillStyle = '#000'; c.fillRect(bx, by, 26, 26); c.strokeStyle = '#ffd400'; c.lineWidth = 1; c.strokeRect(bx + 0.5, by + 0.5, 25, 25);
        if (d && SPRX.ready(k)) { const [px0, py0, pw, ph] = d.por, sc = 24 / Math.max(pw, ph); c.save(); c.beginPath(); c.rect(bx + 1, by + 1, 24, 24); c.clip();
          SPRX.draw(c, k, 0, 0, bx + 1 + (d.ax - px0) * sc + (24 - pw * sc) / 2, by + 1 + (d.ay - py0) * sc, d.dir, sc); c.restore(); }
        A.txt(c, String(tgt.d.boss || EN_NAME[tgt.k] || tgt.k).slice(0, 16) + ' NV ' + ((EN_LVL[tgt.k] || 1) + loopN), bx + 30, 4, '#fff', 6);
        c.fillStyle = '#3a0a0a'; c.fillRect(bx + 30, 16, 90, 7); c.fillStyle = '#e53935'; c.fillRect(bx + 30, 16, 90 * Math.max(0, tgt.hp) / tgt.max, 7); }
      A.txt(c, H.name, 8, 4, '#ffd400', 8); A.txt(c, String(g.score).padStart(7, '0'), 8, 16, '#fff', 8);
      const blocks = Math.ceil(H.hp / 2); for (let i = 0; i < blocks; i++) { const on = p.hp > i * 2; c.fillStyle = on ? (p.hp > i * 2 + 1 ? '#3ad04a' : '#d0c03a') : '#2a3a2a'; c.fillRect(130 + i * 9, 6, 7, 8); }
      for (let i = 0; i < H.jars; i++) { c.fillStyle = i < p.jars ? '#3a6ad0' : '#1a2440'; c.beginPath(); c.arc(134 + i * 12, 22, 4, 0, 7); c.fill(); }
      A.txt(c, 'VIDAS ' + lives, SW - 8, 4, '#fff', 8, 'right'); const hi = api.hi(); A.txt(c, 'HI ' + String(Math.max(hi, g.score)).padStart(7, '0'), SW - 8, 16, '#ffd400', 8, 'right');
      const bs = E.filter((e) => e.d.boss && e.hp > 0); if (bs.length) { const hp = bs.reduce((a, e) => a + Math.max(0, e.hp), 0), mx = bs.reduce((a, e) => a + e.max, 0); c.fillStyle = '#000'; c.fillRect(100, SH - 22, SW - 200, 8); c.fillStyle = '#e53935'; c.fillRect(101, SH - 21, (SW - 202) * hp / mx, 6); A.txt(c, bs[0].d.boss, SW / 2, SH - 34, '#fff', 6, 'center'); } }
    function drawSelect(c) { const bg = background('taoro'); c.drawImage(bg[0], 0, 0, 960, SH); c.drawImage(bg[1], 0, 0, 960, SH); c.fillStyle = 'rgba(0,0,0,0.45)'; c.fillRect(0, 0, SW, SH);
      A.txt(c, 'ELIGE TU GUERRERO', SW / 2, 16, '#ffd400', 12, 'center');
      HEROES.forEach((H, i) => { const cx0 = 80 + i * 160, on = i === sel; c.fillStyle = on ? 'rgba(255,212,0,0.18)' : 'rgba(0,0,0,0.3)'; c.fillRect(cx0 - 70, 40, 140, 250); if (on) { c.strokeStyle = flick() ? '#ffd400' : '#ff8a3a'; c.lineWidth = 2; c.strokeRect(cx0 - 69, 41, 138, 248); }
        c.save(); c.scale(Z * 1.2, Z * 1.2); const P = on ? cyc(WALK, time * 4) : PO.idle; const hk = SX_HERO[H.id], hr = on ? (Math.floor(time * 1.5) % 3 === 2 ? 5 : 1) : 0;
        if (!SPRX.draw(c, hk, hr, SPRX.fr(hk, hr, time, hr === 5 ? 12 : 9), cx0 / (Z * 1.2), 150 / (Z * 1.2), 1, 2.4 * (SX_BIG[H.id] || 1) / (Z * 1.2))) PIXGUAN.draw(c, cx0 / (Z * 1.2), 150 / (Z * 1.2), 1, on && Math.floor(time * 1.5) % 3 === 2 ? PO.smash : P, H.id, H.look.s); c.restore();
        A.txt(c, H.name, cx0, 170, on ? '#ffd400' : '#fff', 8, 'center'); A.txt(c, H.desc[0], cx0, 186, '#9fd7ff', 6, 'center'); A.txt(c, H.desc[1], cx0, 196, '#9fd7ff', 6, 'center');
        [['FUERZA', H.fuerza], ['AGILIDAD', H.agil], ['MAGIA', H.magia]].forEach(([n, v], j) => { A.txt(c, n, cx0 - 60, 214 + j * 14, '#fff', 6); for (let b = 0; b < 3; b++) { c.fillStyle = b < v ? '#ffd400' : '#3a3a3a'; c.fillRect(cx0 + 4 + b * 16, 214 + j * 14, 13, 7); } });
        A.txt(c, H.spell, cx0, 260, '#ff8a3a', 6, 'center'); A.txt(c, 'MAGIA: ' + H.jars + ' ZURRONES', cx0, 272, '#aaa', 6, 'center'); });
      A.txt(c, '← → ELEGIR    A: ¡A LUCHAR!', SW / 2, 300, '#fff', 8, 'center'); }
    if (opt.demo) { choose(Math.floor(Math.random() * 3)); load(0); phase = 'play'; } else { choose(0); L = STAGES[0]; }
    Object.assign(g, { _p: p, _E: E, _liz: liz, _items: items, _phase: () => phase, _stage: () => stageN, _L: () => L, _lock: () => lock, _cam: () => camX, _choose: (i) => { choose(i); load(stageN); phase = 'play'; },
      _load: (n) => { stageN = n; load(n); phase = 'play'; }, _lives: (v) => (v === undefined ? lives : (lives = v)), _boss: () => E.find((e) => e.d.boss), _sel: () => sel, _spawn: (k, x, z) => spawn(k, x, z), _clear: () => { phase = 'clear'; phaseT = 0.01; } }); // tests
    return g;
  }
  // ---------- title screen and the backdrop of the hi-score table
  function drawTitle(c, t) { const bg = background('canadas'); c.drawImage(bg[0], 0, 0, 960, SH); const o = -((t * 8) % 960); c.drawImage(bg[1], o, 0, 960, SH); c.drawImage(bg[1], o + 960, 0, 960, SH); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(0, 0, SW, SH);
    c.font = '34px "Press Start 2P", monospace'; c.textAlign = 'center'; c.textBaseline = 'top';
    for (const [s, y] of [['GUANCHE', 26], ['GUARRIORS', 68]]) { c.fillStyle = '#1a0a04'; c.fillText(s, SW / 2 + 4, y + 4); const gr = c.createLinearGradient(0, y, 0, y + 34); gr.addColorStop(0, '#ffe08a'); gr.addColorStop(0.5, '#e07a2a'); gr.addColorStop(1, '#8a2a0a'); c.fillStyle = gr; c.fillText(s, SW / 2, y); }
    c.save(); c.scale(Z * 1.3, Z * 1.3); const k = Z * 1.3; HEROES.forEach((H, i) => { const P = Math.floor(t * 1.2 + i) % 3 === 0 ? PO.smash : PO.idle, hk = SX_HERO[H.id], hr = Math.floor(t * 1.2 + i) % 3 === 0 ? 5 : 0; if (!SPRX.draw(c, hk, hr, SPRX.fr(hk, hr, t, hr ? 10 : 6), (SW / 2 + (i - 1) * 110) / k, 230 / k, i === 2 ? -1 : 1, 2.6 * (SX_BIG[H.id] || 1) / k)) PIXGUAN.draw(c, (SW / 2 + (i - 1) * 110) / k, 230 / k, i === 2 ? -1 : 1, i === 1 ? PO.atk1 : P, H.id, H.look.s); }); c.restore(); // (the pole in magic pose crossed the logo)
    A.txt(c, 'GUAYOTA HA RAPTADO A MAGEC, EL SOL', SW / 2, 246, '#fff', 8, 'center'); A.txt(c, 'TRES GUERREROS SUBEN AL ECHEYDE', SW / 2, 260, '#9fd7ff', 8, 'center'); A.txt(c, '© 1496 MENCEYATO DE TAORO', SW / 2, 280, '#9fd7ff', 6, 'center'); }
  function drawBack(c, t) { const bg = background('teide'); c.drawImage(bg[0], 0, 0, 960, SH); const o = -((t * 10) % 960); c.drawImage(bg[2], o, 0, 960, SH); c.drawImage(bg[2], o + 960, 0, 960, SH); c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, SW, SH); }
  return { title: 'GUANCHE GUARRIORS', sub: 'LA NOCHE DE GUAYOTA', marquee: ['#6a1a0a', '#1a0402'], titleCol: '#ffb04a', baseScore: 90000, music: { title: SONGS.title }, create, drawTitle, drawBack,
    help: (K) => `GOLPE ${K('f_punch')} (MANT. FUERTE)  SALTO ${K('f_kick')}  PATADA ${K('b_pass')} (MANT. PARADA)  LOS DOS: MAGIA` };
})();
