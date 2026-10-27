// ============ «BENCOMO, ACENTEJO'S REVENGE» (v0.80): the arcade at El Blanco's house (free) ============
// Jonay: a platformer like Mario / Sonic / Prehistorik, satirical and cartoony but with real pieces of Guanche culture.
//  · Bencomo, the mencey of Taoro who led the resistance against the Castilian invasion of Tenerife.
//  · «Acentejo's Revenge»: the Matanza de Acentejo (31 May 1494), when the Guanches ambushed and routed Alonso Fernández
//    de Lugo's troops in the ravine of Acentejo; the «revenge» of the classic games.
//  · The SALTO DEL PASTOR: with the long wooden pole (asta) the shepherds crossed ravines and cliffs. Running + B plants
//    the pole and vaults (much higher and further); ↓ in the air = the pole down like a pogo (bounce off heads and even
//    off the tuneras). A = a blow with the banot (the fire-hardened wooden spear); Q = a stone (they threw stones too).
//  · Food: gofio (the plantain came later): handfuls of gofio = points (100 = a life), a zurrón of gofio = a heart, goat
//    cheese = a life, gofio with palm honey = a while invincible.
//  · The enemies come in more and more kinds: soldiers with swords, crossbowmen, arquebusiers, war dogs, knights on
//    horseback, armoured captains; at Acentejo the Guanches roll stones down on them; the last boss is Lugo himself,
//    who flees wounded as in history. After the last stage the loop starts again, faster and with more enemies.
ARCADE.GAMES.bencomo = (() => {
  // v0.80.1 (Jonay: «el pj al menos un 50 % más grande… con algo más de resolución»): the board's screen is 400×280 and
  // the world is drawn at ×2 (W × H here = the world view, 200×140 of a 224-high stage: the camera also follows in
  // height), with the sprites, tiles and backgrounds at double resolution (scale2x of the pixel art + outline + light)
  const A = ARCADE, SW = A.W, SH = A.H, Z = 2, W = SW / Z, H = 224, VH = SH / Z, T = 16, ROWS = 14;
  // v0.93 (Jonay): Bencomo and the Castilians from the SPRX sheets (09jy/09jz), one pixel of a sheet = one of the screen;
  // the old sprites stay as a fallback while the images load
  const BXP = 1 / Z, BX_EN = { S: 'b_soldado', K: 'b_capitan', B: 'b_arquero', A: 'b_arcabucero', D: 'b_perro', C: 'b_caballero', L: 'b_lugo' };
  // ---------- palette and sprites (facing right; flipped copies for the left)
  const P = { k: '#1a1008', h: '#140d09', b: '#c27b46', d: '#8c4f27', w: '#f4efe6', c: '#7a4a22', C: '#b8823f', s: '#3a2414', e: '#2a1a10',
    m: '#cfd3d9', M: '#7d838c', y: '#e3b23c', R: '#b3271d', n: '#2b2f6b', l: '#6b4422', L: '#3d2614', D: '#8b5a2b', o: '#5e3a1a', g: '#e8e2d0', G: '#9a9488', f: '#d22', F: '#f6c12b', x: '#111' };
  const S = (key, rows) => A.sprite('bc_' + key, rows, P, 16);
  // v0.89 (Jonay: «me gusta el Bencomo nuevo, usa ese»): the same size and palette as before (so he fits with the
  // castellanos and the dogs), with the detail of the statues of Candelaria: headband, beard, necklace, the tamarco on
  // the shoulder, bare chest with pecs and abs, the loincloth with its cord, ankle bands and bare feet
  const UP = {
    idle: ['....hhhhhh......', '...hhhhhhhh.....', '..hhggggggg.....', '..hhhbbbbbb.....', '..hhbbbbbwk.....', '..hhbbbbbbbb....', '..hhhdbbbbb.....', '..hhheeeeee.....', '..hh.eeeeee.....', '..hcC.eeeb......', '..cCbbgbgbbb....', '.bcCbdbbbdb.b...', '.bcCbbdbdb.b....', '.bcccbdbd..b....'],
    thrust: ['....hhhhhh......', '...hhhhhhhh.....', '..hhggggggg.....', '..hhhbbbbbb.....', '..hhbbbbbwk.....', '..hhbbbbbbbb....', '..hhhdbbbbb.....', '..hhheeeeee.....', '..hh.eeeeee.....', '..hcC.eeeb......', '..cCbbgbgbbbbbbb', '.bcCbdbbbdbbbbb.', '.bcCbbdbdb......', '.bcccbdbd.......'],
    up: ['bb..hhhhhh....bb', '.b.hhhhhhhh..bb.', '.bhhggggggg..b..', '.bhhhbbbbbb..b..', '.bhhbbbbbwk..b..', '.bhhbbbbbbbb.b..', '.bhhhdbbbbb..b..', '.bhhheeeeee.b...', '.bhh.eeeeee.b...', '.bhcC.eeeb.b....', '.bcCbbgbgbbb....', '..cCbdbbbdb.....', '..cCbbdbdb......', '..cccbdbd.......'],
    hurt: ['.....hhhhhh.....', '....hhhhhhhh....', '...hhggggggg....', '...hhhbbbbbb....', '...hhbbbbbbk....', '...hhbbbbbbbb...', '...hhhdbbbbb....', '...hhheeeeee....', '...hh.eeeeee....', '..bcC.eeeb......', '.bbCbbgbgbbb....', '.b.Cbdbbbdb.bb..', '...cbbdbdb...bb.', '...ccbdbd.......'],
  };
  const LEG = {
    stand: ['..dcccgggggb....', '...cCccccC......', '....ccdcc.......', '....bb..bb......', '....bd..bd......', '....bd..bd......', '....gd..gd......', '...bbb..bbb.....'],
    run1: ['..dcccgggggb....', '...cCccccC......', '...bbcdcbb......', '..bb......bb....', '..bd.......bd...', '.bd.........bd..', '.gd.........gd..', 'bbb.........bbb.'],
    run2: ['..dcccgggggb....', '...cCccccC......', '.....bbbb.......', '.....bbbb.......', '....bd.bd.......', '....bd.bd.......', '....gd.gd.......', '...bbb.bbb......'],
    run3: ['..dcccgggggb....', '...cCccccC......', '....bb..bb......', '...bb....bb.....', '...bd.....bd....', '..bd.......bd...', '..gd.......gd...', '.bbb.......bbb..'],
    jump: ['..dcccgggggb....', '...cCccccC......', '...bbbbbbbbb....', '..bd.....bbb....', '..bd.......bd...', '..gd.......gd...', '.bbb.......bbb..', '................'],
    crouch: ['...cCccccC......', '..bbbbcccbbbb...', '..gd.......gd...', '.bbb.......bbb..'], // v0.80.1: crouched (to hit the dogs)
    pogo: ['..dcccgggggb....', '...cCccccC......', '....bbbbbb......', '....bbbbbb......', '.....bddb.......', '.....gddg.......', '................', '................'],
  };
  const bencomo = (up, leg) => S('ben_' + up + '_' + leg, [...UP[up], ...LEG[leg]]);
  // the Castilians: soldiers (morion, breastplate, striped doublet), crossbowman, arquebusier, captain (plume, plate)
  const SOLD_TOP = ['......mmm.......', '....mmmmmmm.....', '...MmmmmmmmM....', '......bbbbw.....', '......bbbbbb....', '......dbbbb.....', '.......bbb......', '.....mmmmmm.....', '....RmMmmmmR....', '...bRmmmmmmRb...', '...bRyRyRyRRb...', '....RyRyRyRR....', '....nnnnnnnn....'];
  const SOLD_LEG = [['....nn....nn....', '....nn....nn....', '....nn....nn....', '....ll....ll....', '...lll...lll....'], ['.....nn..nn.....', '....nn....nn....', '...nn......nn...', '...ll......ll...', '..lll.....lll...']];
  const soldier = (f, top = SOLD_TOP, key = 'sol') => A.sprite('bc_' + key + f, [...top, ...SOLD_LEG[f]], P, 16);
  const BALL_TOP = ['................', '.....lllll......', '....lllllll.....', '......bbbbw.....', '......bbbbbb....', '......dbbbb.....', '.......bbb......', '.....llllll.....', '....nlLllllnn...', '...bnllllllnb...', '...bnlLlLlLnb...', '....nlLlLlLn....', '....nnnnnnnn....'];
  const ARC_TOP = ['................', '...xxxxxxxxx....', '.....xxxxx......', '......bbbbw.....', '......bbbbbb....', '......dbbbbh....', '.......bbbh.....', '.....xxxxxx.....', '....xyxxxxyx....', '...bxxxxxxxxb...', '...bxyxyxyxxb...', '....xyxyxyxx....', '....nnnnnnnn....'];
  const CAP_TOP = ['.......fff......', '......ffmm......', '....mmmmmmm.....', '...MmmmmmmmM....', '......bbbbw.....', '......bbbbbb....', '.....mdbbbbm....', '....mmmmmmmmm...', '...MmmmmmmmmM...', '...bmMmmmmMmb...', '...bmmmmmmmmb...', '....mMmmmmMm....', '....RRRRRRRR....'];
  const DOG = [['...............oo...', '..............oooo..', '..............oowxo.', '.ooooooooooooooooooo', 'oooDDDDDDDDDDDDoooo.', 'ooDDDDDDDDDDDDDoo...', '.oDDDDDDDDDDDDDo....', '..DDD.......DDD.....', '..DD.........DD.....', '..oo.........oo.....'],
    ['...............oo...', '..............oooo..', '..............oowxo.', '.ooooooooooooooooooo', 'oooDDDDDDDDDDDDoooo.', 'ooDDDDDDDDDDDDDoo...', '.oDDDDDDDDDDDDDo....', '...DD.......DD......', '....DD.......DD.....', '....oo.......oo.....']];
  const HORSE = [['..........................oo....', '.........................oHHo...', '........................oHHHHo..', '.......................oHHHwxHo.', '......................oHHHHHHHHo', '..oooooooooooooooooooooHHHHo.ooo.', '.oHHHHHHHHHHHHHHHHHHHHHHHo......', 'oHHHHHHHHHHHHHHHHHHHHHHHo.......', 'oHHHHHHHHHHHHHHHHHHHHHHo........', 'oHHHHHHHHHHHHHHHHHHHHHHo........', '.oHHHHHHHHHHHHHHHHHHHHo.........', '..oHHo.oHHo.....oHHo.oHHo.......', '..oHHo.oHHo.....oHHo.oHHo.......', '..oHo...oHo.....oHo...oHo.......', '..oHo...oHo.....oHo...oHo.......', '..ooo...ooo.....ooo...ooo.......'],
    ['..........................oo....', '.........................oHHo...', '........................oHHHHo..', '.......................oHHHwxHo.', '......................oHHHHHHHHo', '..oooooooooooooooooooooHHHHo.ooo.', '.oHHHHHHHHHHHHHHHHHHHHHHHo......', 'oHHHHHHHHHHHHHHHHHHHHHHHo.......', 'oHHHHHHHHHHHHHHHHHHHHHHo........', 'oHHHHHHHHHHHHHHHHHHHHHHo........', '.oHHHHHHHHHHHHHHHHHHHHo.........', '...oHHo.oHHo...oHHo.oHHo........', '....oHo..oHo..oHo....oHo........', '.....oHo..oHooHo......oHo.......', '......oHo..oHHo........oHo......', '......ooo..ooo.........ooo......']];
  const horse = (f, white) => A.sprite('bc_horse' + f + (white ? 'w' : ''), HORSE[f], { ...P, H: white ? '#e6e2da' : '#8a5a2e', o: white ? '#6f6a62' : '#3e2412' }, 32);
  // food and things
  const GOFIO = ['..wwww..', '.wggggw.', 'wgGgggGw', 'wggggggw', '.wGgggw.', '..wwww..'];
  const ZURRON = ['....ll....', '...lLLl...', '..cccccc..', '.cCggggCc.', '.cggGgggc.', '.cgggggGc.', '.ccggggcc.', '..cccccc..'];
  const QUESO = ['...yyyy...', '.yyyyyyyy.', 'yyyYyyyyYy', 'yyyyyyyyyy', 'yYyyyyYyyy', '.yyyyyyyy.'];
  const MIEL = ['...ll...', '..gggg..', '.gFFFFg.', '.gFfFFg.', '.gFFFFg.', '.gFFfFg.', '..gggg..'];
  const STONES = ['..GG....', '.GgGG.G.', 'GGGGGGGG', '.GG.GgG.'];
  const PINTA = ['.RRRRRR.', 'RyRyyRyR', 'RyRRRRyR', 'RRyyyyRR', 'RyRRRRyR', 'RyRyyRyR', '.RRRRRR.'];
  const spr8 = (k, rows, pal) => A.sprite('bc_' + k, rows, { ...P, ...(pal || {}), Y: '#c89a2a' }, rows[0].length);
  // ---------- stages: built with a little builder (columns of ground, gaps, ledges, platforms, things on top)
  // tiles: 0 air, 1 ground (top), 2 ground (deep), 3 one-way platform, 4 stone block, 5 tunera (hurts; you can pogo
  // on it), 6 sea / water (death)
  function builder(theme) {
    const cols = [], ents = []; let x = 0;
    const col = () => new Array(ROWS).fill(0);
    const B = {
      flat(n, h, e = '') { for (let i = 0; i < n; i++) { const c = col(); for (let r = ROWS - h; r < ROWS; r++) c[r] = r === ROWS - h ? 1 : 2; cols.push(c); const ch = e[i]; if (ch && ch !== '.') ents.push([ch, x + i, ROWS - h - 1]); } x += n; return B; },
      gap(n, e = '', water = theme === 'costa') { for (let i = 0; i < n; i++) { const c = col(); if (water) { c[ROWS - 1] = 6; } cols.push(c); const ch = e[i]; if (ch && ch !== '.') ents.push([ch, x + i, ROWS - 5]); } x += n; return B; },
      // a ledge «up» tiles above the ground under it (over a gap: above the usual ground line)
      plat(back, len, up, e = '', kind = 3) { for (let i = 0; i < len; i++) { const cx = x - back + i; const c = cols[cx]; if (!c) continue; let top = ROWS - 3; for (let r = 0; r < ROWS; r++) if (c[r] === 1 || c[r] === 2) { top = r; break; } const row = Math.max(2, top - up); c[row] = kind; const ch = e[i]; if (ch && ch !== '.') ents.push([ch, cx, row - 1]); } return B; },
      ent(back, ch, up = 0) { const cx = x - back, c = cols[cx]; let top = ROWS; if (c) for (let r = 0; r < ROWS; r++) if (c[r] && c[r] !== 6) { top = r; break; } ents.push([ch, cx, top - 1 - up]); return B; },
      cactus(back) { const c = cols[x - back]; if (!c) return B; for (let r = 0; r < ROWS; r++) if (c[r] === 1) { c[r - 1] = 5; break; } return B; },
      get x() { return x; },
      done(name, sub) { return { cols, ents, w: x, theme, name, sub }; },
    };
    return B;
  }
  function stage1() { // the coast of Añaza: the Castilians have landed; learn to vault
    const b = builder('costa');
    b.flat(16, 3, '...@...o.o.o....').flat(8, 3, '..S.....').gap(3, '.o.').flat(10, 3, 'o.o.o.....').plat(6, 4, 3, 'oooo');
    b.flat(6, 3, '..D...').flat(4, 4).flat(4, 5, '.o.o').flat(6, 3, '...S..').cactus(2).gap(6, '.ooooo').flat(12, 3, '..r....S....');
    b.flat(8, 3, '...G....').plat(6, 3, 4, '.oo').plat(3, 3, 6, 'ooo').flat(6, 3, '....B.').gap(5, '.ooo.').flat(5, 4).flat(5, 6, '..o..').flat(8, 3, '.D...o.o');
    b.flat(4, 3).cactus(1).flat(6, 3, 'P..S..').gap(6, '.ooo..') /* v0.81: 7 → 6 wide, with a checkpoint before it (the pole fell just short) */.flat(10, 3, '.P...S..o.').flat(8, 3, '...B....').plat(4, 4, 4, 'oooo');
    b.flat(6, 3, '..D...').flat(10, 5, '....Q.....').gap(4, '.oo.').flat(4, 5).flat(6, 3, '..S.S.').flat(4, 3).cactus(3).flat(3, 3).gap(5, 'ooooo').flat(14, 3, '...o.o.o...E..');
    return b.done('LA COSTA DE AÑAZA', 'Los castellanos han desembarcado');
  }
  function stage2() { // the ravine of Acentejo: steep, stones rolled by the Guanches, arquebusiers and knights
    const b = builder('barranco');
    b.flat(12, 4, '...@....o.o.').flat(6, 5, '..S...').flat(6, 6, '.o.o..').gap(4, '.oo.', false).flat(8, 6, '..A.....').flat(4, 4).flat(10, 4, 'R..D...o.o');
    b.gap(5, 'ooooo', false).flat(6, 7, '..o...').plat(4, 3, 5, 'ooo').flat(8, 7, '...S....').flat(4, 5).flat(12, 4, '.....C......').cactus(9);
    b.flat(6, 4, '..r...').gap(6, '.oooo.', false).flat(10, 5, '.P..A.....').plat(8, 4, 4, '.G..').flat(8, 5, '..D...D.').gap(4, '.oo.', false).flat(6, 8, '..o...').flat(4, 6);
    b.flat(12, 4, 'R...S...B...').flat(8, 4, '....A...').cactus(3).gap(7, '..ooo..', false).flat(10, 6, '..K.......').plat(5, 4, 4, 'oooo').flat(8, 4, '...C....');
    b.flat(6, 5, 'Q.....').gap(5, '.ooo.', false).flat(4, 7).flat(6, 4, '..D...').flat(16, 4, '..o.o.o.....E...');
    return b.done('EL BARRANCO DE ACENTEJO', 'Que bajen... y que no vuelvan a subir');
  }
  function stage3() { // the ambush in the laurisilva and, in the clearing, Lugo on his white horse
    const b = builder('monte');
    b.flat(12, 3, '...@...o.o.o').flat(6, 4, '..K...').gap(4, '.oo.', false).flat(10, 4, '..D..D....').plat(6, 4, 4, 'oooo').flat(8, 3, '..A.....').cactus(4);
    b.flat(6, 3, '.S..S.').gap(6, '.oooo.', false).flat(4, 5).flat(8, 6, '..B.....').plat(8, 3, 5, '.oo').flat(10, 3, '.....C....').flat(6, 3, '..G...');
    b.gap(5, 'ooooo', false).flat(10, 4, '.P...K....').flat(8, 4, '..A..D..').cactus(1).gap(6, '..oo..', false).flat(6, 5, 'M.....').flat(8, 3, '..S..S..');
    b.flat(6, 3, '....r.').flat(26, 3, '.............L............');
    return b.done('LA EMBOSCADA', 'Mayo de 1494: Taoro no se rinde');
  }
  const STAGES = [stage1, stage2, stage3];
  // ---------- tiles and backgrounds per theme (cached canvases)
  const TH = {
    costa: { sky: ['#5fa8e0', '#cfeaf6'], top: '#e8cf8a', top2: '#c9a85e', rock: '#4a3a30', rock2: '#3a2d25', plat: '#7a5a3a', music: 'costa' },
    barranco: { sky: ['#e58b4e', '#f7d9a4'], top: '#b39a4a', top2: '#8c7a38', rock: '#6b3f26', rock2: '#55301c', plat: '#7a5a3a', music: 'barranco' },
    monte: { sky: ['#5e7f78', '#b9cfc2'], top: '#4f8a3a', top2: '#356b28', rock: '#3c3328', rock2: '#2c251d', plat: '#5b4630', music: 'monte' },
  };
  const tileCache = {};
  function tileImg(theme, k) {
    const key = theme + k; if (tileCache[key]) return tileCache[key]; const t = TH[theme], c = mkCanvas(T * 2, T * 2), x = c.getContext('2d'); x.scale(2, 2); // drawn at ×2, then fine detail
    let s = (k * 977 + theme.length * 131) % 233280; const rr = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    if (k === 1 || k === 2) { x.fillStyle = t.rock; x.fillRect(0, 0, T, T); for (let i = 0; i < 26; i++) { x.fillStyle = rr() < 0.5 ? t.rock2 : 'rgba(255,255,255,0.08)'; x.fillRect((rr() * T) | 0, (rr() * T) | 0, 2, 1); }
      x.fillStyle = t.rock2; x.fillRect(0, 7, 6, 1); x.fillRect(9, 12, 7, 1); x.fillRect(5, 3, 1, 4);
      if (k === 1) { x.fillStyle = t.top; x.fillRect(0, 0, T, 4); x.fillStyle = t.top2; for (let i = 0; i < T; i += 2) x.fillRect(i, 4, 1, 1 + ((rr() * 2) | 0)); for (let i = 0; i < 5; i++) { x.fillStyle = t.top2; x.fillRect((rr() * T) | 0, 0, 1, 2); } } }
    else if (k === 3) { x.fillStyle = t.plat; x.fillRect(0, 0, T, 5); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(0, 0, T, 1); x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(0, 4, T, 1); x.fillRect(5, 1, 1, 3); x.fillRect(12, 1, 1, 3); }
    else if (k === 4) { x.fillStyle = '#6d6a63'; x.fillRect(0, 0, T, T); x.fillStyle = '#8d8a82'; x.fillRect(1, 1, T - 2, 2); x.fillStyle = '#4d4a44'; x.fillRect(0, T - 2, T, 2); x.fillRect(T - 2, 0, 2, T); }
    else if (k === 5) { const g = '#3f8f3a', gl = '#62b04f'; x.fillStyle = g; x.beginPath(); x.ellipse(8, 10, 6, 6, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(4, 4, 3.5, 4, -0.4, 0, 7); x.fill(); x.beginPath(); x.ellipse(12, 3, 3.5, 4, 0.4, 0, 7); x.fill();
      x.fillStyle = gl; x.fillRect(6, 7, 2, 2); x.fillRect(3, 2, 1, 2); x.fillRect(11, 1, 1, 2); x.fillStyle = '#e8e2a0'; for (const [a, b] of [[2, 8], [14, 9], [8, 4], [5, 13], [11, 13], [1, 3], [15, 2]]) x.fillRect(a, b, 1, 1); x.fillStyle = '#c0264a'; x.fillRect(4, 0, 2, 1); x.fillRect(12, 0, 2, 1);
      x.strokeStyle = '#123814'; x.lineWidth = 0.7; for (const [ex, ey, rx, ry, a] of [[8, 10, 6, 6, 0], [4, 4, 3.5, 4, -0.4], [12, 3, 3.5, 4, 0.4]]) { x.beginPath(); x.ellipse(ex, ey, rx, ry, a, 0, 7); x.stroke(); } } // tunera with its figs; v0.83.2 (Jonay: «parece inofensivo, se ve poco»): a soft dark outline
    x.setTransform(1, 0, 0, 1, 0, 0); const n = T * 2; // the fine detail of the ×2 tile: grains, cracks, grass blades
    if (k === 1 || k === 2) { for (let i = 0; i < 70; i++) { const a = (rr() * n) | 0, b = (k === 1 ? 9 : 0) + ((rr() * (n - (k === 1 ? 9 : 0))) | 0); x.fillStyle = rr() < 0.5 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.12)'; x.fillRect(a, b, 1, 1); }
      x.fillStyle = 'rgba(0,0,0,0.3)'; x.fillRect((rr() * n) | 0, 14 + ((rr() * 14) | 0), 5, 1); if (k === 1) { x.fillStyle = t.top2; for (let i = 0; i < n; i += 3) x.fillRect(i + ((rr() * 2) | 0), 0, 1, 1 + ((rr() * 3) | 0)); x.fillStyle = 'rgba(255,255,255,0.25)'; for (let i = 0; i < 8; i++) x.fillRect((rr() * n) | 0, 1 + ((rr() * 5) | 0), 1, 1); } }
    if (k === 5) { let q = 11; const r5 = () => { q = (q * 9301 + 49297) % 233280; return q / 233280; }; // the spines: pale little needles all over the pads, and red prickly pears
      for (const [ex, ey, rx, ry] of [[16, 20, 11, 11], [8, 8, 6, 7], [24, 6, 6, 7]]) for (let i = 0; i < 9; i++) { const a = r5() * 6.283, d = 0.35 + r5() * 0.6, sx = ex + Math.cos(a) * rx * d, sy = ey + Math.sin(a) * ry * d; x.fillStyle = '#fff6c8'; x.fillRect(sx, sy, 1, 1); x.fillRect(sx + Math.cos(a) * 1.6, sy + Math.sin(a) * 1.6, 1, 1); }
      x.fillStyle = '#d4204a'; for (const [fx, fy] of [[7, 0], [23, 0], [30, 14]]) { x.fillRect(fx, fy, 3, 3); x.fillStyle = '#ff7090'; x.fillRect(fx, fy, 1, 1); x.fillStyle = '#d4204a'; } }
    if (k === 3) { x.fillStyle = 'rgba(0,0,0,0.25)'; for (let i = 0; i < n; i += 4) x.fillRect(i, 3, 2, 1); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(0, 1, n, 1); }
    return (tileCache[key] = c);
  }
  const bgCache = {};
  function background(theme) { // 3 parallax layers per theme, each a 640-wide strip that repeats
    if (bgCache[theme]) return bgCache[theme]; const L = [];
    let s = theme.length * 77; const rr = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let li = 0; li < 3; li++) { const c = mkCanvas(1280, H * 2), x = c.getContext('2d'); x.scale(2, 2); L.push(c); // ×2: smoother hills, sea and trees
      if (li === 0) { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, TH[theme].sky[0]); g.addColorStop(1, TH[theme].sky[1]); x.fillStyle = g; x.fillRect(0, 0, 640, H);
        if (theme === 'costa') { x.fillStyle = '#fff6c8'; x.beginPath(); x.arc(470, 46, 16, 0, 7); x.fill(); x.fillStyle = '#3d7fb8'; x.fillRect(0, 128, 640, H - 128); x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 90; i++) x.fillRect((rr() * 640) | 0, 130 + ((rr() * 70) | 0), 3 + ((rr() * 4) | 0), 1); }
        if (theme === 'barranco') { x.fillStyle = '#fff1c2'; x.beginPath(); x.arc(150, 70, 22, 0, 7); x.fill(); }
        if (theme === 'monte') { x.fillStyle = 'rgba(255,255,255,0.25)'; for (let i = 0; i < 6; i++) x.fillRect(0, 60 + i * 18, 640, 6); }
        // the Teide on the horizon, always
        x.fillStyle = theme === 'monte' ? '#7a958c' : theme === 'barranco' ? '#c0855a' : '#8aa6c2'; x.beginPath(); x.moveTo(330, 128); x.lineTo(410, 52); x.lineTo(424, 48); x.lineTo(438, 52); x.lineTo(530, 128); x.fill(); x.fillStyle = '#f4f4f4'; x.beginPath(); x.moveTo(400, 62); x.lineTo(410, 52); x.lineTo(424, 48); x.lineTo(438, 52); x.lineTo(448, 62); x.lineTo(430, 58); x.lineTo(418, 63); x.fill(); }
      if (li === 1) { if (theme === 'costa') { for (const sx2 of [80, 300, 520]) caravel(x, sx2, 118); x.fillStyle = '#56708a'; x.beginPath(); x.moveTo(0, 130); for (let i = 0; i <= 640; i += 20) x.lineTo(i, 112 - Math.sin(i * 0.02) * 10 - rr() * 6); x.lineTo(640, 130); x.fill(); }
        else { x.fillStyle = theme === 'monte' ? '#3e5f48' : '#9a5a34'; x.beginPath(); x.moveTo(0, H); for (let i = 0; i <= 640; i += 16) x.lineTo(i, 96 + Math.sin(i * 0.018) * 22 + rr() * 8); x.lineTo(640, H); x.fill(); } }
      if (li === 2) { if (theme === 'monte') { for (let i = 0; i < 18; i++) tree(x, i * 36 + rr() * 10, 150 + rr() * 20, rr); x.fillStyle = 'rgba(200,220,210,0.18)'; x.fillRect(0, 120, 640, 30); }
        else if (theme === 'barranco') { x.fillStyle = '#7a4128'; x.beginPath(); x.moveTo(0, H); for (let i = 0; i <= 640; i += 12) x.lineTo(i, 140 + Math.sin(i * 0.04) * 14 + rr() * 10); x.lineTo(640, H); x.fill(); x.fillStyle = 'rgba(0,0,0,0.15)'; for (let i = 0; i < 40; i++) x.fillRect((rr() * 640) | 0, 150 + ((rr() * 70) | 0), 12, 2); }
        else { for (let i = 0; i < 9; i++) palm(x, i * 72 + rr() * 20, 168, rr); } } }
    return (bgCache[theme] = L);
  }
  function caravel(x, cx0, y) { x.fillStyle = '#4a2c18'; x.beginPath(); x.moveTo(cx0 - 22, y); x.lineTo(cx0 + 22, y); x.lineTo(cx0 + 16, y + 8); x.lineTo(cx0 - 18, y + 8); x.fill(); x.fillStyle = '#2b1a0e'; x.fillRect(cx0 - 1, y - 30, 2, 30); x.fillRect(cx0 + 11, y - 22, 1, 22);
    x.fillStyle = '#efe6d0'; x.fillRect(cx0 - 9, y - 27, 18, 14); x.fillRect(cx0 + 7, y - 20, 9, 10); x.fillStyle = '#b3271d'; x.fillRect(cx0 - 1, y - 25, 2, 10); x.fillRect(cx0 - 5, y - 21, 10, 2); }
  function tree(x, tx, ty, rr) { x.fillStyle = '#2b2018'; x.fillRect(tx - 2, ty - 40, 4, 40); x.fillStyle = rr() < 0.5 ? '#244a2c' : '#2e5a34'; x.beginPath(); x.ellipse(tx, ty - 46, 18, 16, 0, 0, 7); x.fill(); x.fillStyle = '#386e3e'; x.beginPath(); x.ellipse(tx - 5, ty - 52, 8, 7, 0, 0, 7); x.fill(); }
  function palm(x, tx, ty, rr) { x.strokeStyle = '#6b4a2a'; x.lineWidth = 3; x.beginPath(); x.moveTo(tx, ty); x.quadraticCurveTo(tx + 6, ty - 24, tx + 2 + rr() * 6, ty - 46); x.stroke(); const hx = tx + 4, hy = ty - 46; x.strokeStyle = '#3f7a34'; x.lineWidth = 2;
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.55; x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo(hx + Math.cos(a) * 12, hy + Math.sin(a) * 12 - 4, hx + Math.cos(a) * 20, hy + Math.sin(a) * 20 + 6); x.stroke(); } }
  // ---------- music: tajaraste-like tunes in 3 (chip version), one per stage, the boss and the title
  const SONGS = {
    title: { bpm: 132, div: 3, ch: [
      { w: 'sq', v: 0.9, n: 'E4 . G4 A4 . . B4 . A4 G4 . E4 D4 . E4 G4 . . E4 . . - . . A4 . C5 B4 . A4 G4 . E4 D4 . B3 E4 . . . . . - . .' },
      { w: 'tri', v: 1, n: 'E2 . . B2 . . E2 . . B2 . . D2 . . A2 . . E2 . . B2 . . A2 . . E3 . . G2 . . D3 . . E2 . . B2 . . E2 . . - . .' },
      { w: 'noise', v: 0.8, n: 'k - h s - h k - h s - h k - h s - h k k h s - h k - h s - h k - h s - h k - h s - h k k h s s s' }] },
    costa: { bpm: 150, div: 3, ch: [
      { w: 'sq', v: 0.8, n: 'A4 . C5 E5 . C5 D5 . B4 C5 . A4 G4 . A4 B4 . G4 A4 . . - . . A4 . C5 E5 . G5 F5 . E5 D5 . C5 B4 . C5 D5 . B4 A4 . . . . . F5 . E5 D5 . C5 D5 . E5 F5 . . G5 . F5 E5 . D5 E5 . . - . . C5 . D5 E5 . G5 A5 . G5 E5 . D5 C5 . B4 A4 . G#4 A4 . . . . .' },
      { w: 'sq', v: 0.3, legato: 0.6, n: '- . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . - . . E4 . . A4 . . C5 . . A4 . . E4 . . G4 . . B4 . . G4 . . F4 . . A4 . . C5 . . A4 . . E4 . . G#4 . . B4 . . E5 . .' }, // a second voice in the second half (v0.80.1: less repetitive)
      { w: 'tri', v: 1, n: 'A2 . . E3 . . A2 . . E3 . . G2 . . D3 . . A2 . . E3 . . F2 . . C3 . . D2 . . A2 . . E2 . . B2 . . A2 . . E2 . .' },
      { w: 'noise', v: 0.7, n: 'k - h s - h k - h s - h k - h s - h k h h s - h' }] },
    // stage 2 (Jonay): Canarian folk, an isa in 3/4 with castanets (timple-like square, guitar bass, castanets)
    barranco: { bpm: 172, div: 3, ch: [
      { w: 'sq', v: 0.8, n: 'A4 . . F#4 G4 A4 B4 . A4 G4 . F#4 E4 . . F#4 G4 A4 G4 . . F#4 . E4 D4 . . E4 F#4 G4 F#4 . E4 D4 . . A4 . . F#4 G4 A4 D5 . C#5 B4 . A4 G4 . . B4 . D5 C#5 . B4 A4 . . F#4 . A4 D5 . . C#5 . B4 A4 . . B4 . . A4 G4 F#4 E4 . F#4 G4 . . A4 . . F#4 E4 C#4 D4 . . - . . F#5 . . E5 D5 . E5 F#5 . G5 . . F#5 E5 . D5 C#5 . B4 . . A4 . . G4 . . B4 A4 G4 F#4 . . E4 . . A4 B4 C#5 D5 . . . . . - . .' },
      { w: 'sq', v: 0.35, legato: 0.5, n: 'D4 F#4 A4 D4 F#4 A4 A3 C#4 E4 A3 C#4 E4 A3 C#4 E4 A3 C#4 E4 D4 F#4 A4 D4 F#4 A4 D4 F#4 A4 D4 F#4 A4 G3 B3 D4 G3 B3 D4 A3 C#4 E4 A3 C#4 E4 D4 F#4 A4 D4 F#4 A4' },
      { w: 'tri', v: 1, n: 'D2 . . A2 . . A1 . . E2 . . A1 . . E2 . . D2 . . A2 . . D2 . . A2 . . G1 . . D2 . . A1 . . E2 . . D2 . . A2 . .' },
      { w: 'noise', v: 0.9, n: 'k r c c r c k r c c r c k r c c r c k r c r r r' }] },
    monte: { bpm: 140, div: 3, ch: [
      { w: 'sq', v: 0.75, n: 'E5 . B4 G4 . B4 E5 . F#5 G5 . F#5 E5 . B4 G4 . E4 F#4 . G4 A4 . B4 A4 . . - . . C5 . G4 E4 . G4 C5 . D5 E5 . D5 C5 . B4 A4 . F#4 G4 . . . . . G4 . A4 B4 . . D5 . C5 B4 . A4 G4 . F#4 E4 . . F#4 . G4 A4 . B4 C5 . B4 A4 . G4 F#4 . G4 A4 . B4 E4 . . . . . - . . - . .' },
      { w: 'tri', v: 1, n: 'E2 . . B2 . . E2 . . B2 . . E2 . . B2 . . D2 . . A2 . . D2 . . A2 . . C2 . . G2 . . C2 . . G2 . . B1 . . F#2 . . B1 . . F#2 . .' },
      { w: 'noise', v: 0.7, n: 'k - h s - h k - h s - h' }] },
    boss: { bpm: 176, div: 4, ch: [
      { w: 'sq', v: 0.85, n: 'E5 E5 - E5 D#5 - E5 - G5 - E5 - D5 - B4 - E5 E5 - E5 D#5 - E5 - A5 - G5 - F#5 - D#5 - C5 C5 - C5 B4 - C5 - E5 - C5 - B4 - G4 - A4 A4 - A4 B4 - C5 - D#5 - E5 - F#5 - B5 -' },
      { w: 'tri', v: 1, n: 'E2 E3 E2 E3 E2 E3 E2 E3 C2 C3 C2 C3 B1 B2 B1 B2' },
      { w: 'noise', v: 0.9, n: 'k h s h k k s h k h s h k k s s' }] },
    clear: { bpm: 150, div: 4, loop: false, ch: [{ w: 'sq', v: 0.9, n: 'C5 E5 G5 C6 . . G5 . C6 . . . . . . .' }, { w: 'tri', v: 1, n: 'C3 . G3 . C3 . G3 . C3 . . . . . . .' }] },
  };
  // v0.84 (Jonay: «melodías más largas, varios estribillos que se van alternando»): extra phrases, played A B A (C)
  { const ALT = {
      costa: ['E5 . . D5 C5 . B4 . . A4 . . C5 . . E5 . . A5 . G5 F5 . E5 D5 . . . . . E5 . . F5 E5 . D5 . . C5 . . B4 . A4 G#4 . . A4 . . . . .'],
      monte: ['B4 . . A4 G4 . F#4 . . E4 . . G4 . A4 B4 . . D5 . . C5 B4 . A4 . . . . . E5 . . D5 B4 . G4 . . A4 . B4 E4 . . . . . - . .'],
      boss: ['B4 B4 - A4 B4 - C5 - D5 - E5 - F#5 - G5 - A5 A5 - G5 F#5 - E5 - D#5 - B4 - E5 - - -'],
      title: ['A4 . . C5 . . E5 . D5 C5 . A4 G4 . . E4 . . A4 . . B4 . . C5 . B4 A4 . G4 A4 . . . . . - . .'] };
    for (const k in ALT) { const c = SONGS[k].ch[0]; c.n = [c.n, ...ALT[k]]; c.form = [0, 1, 0, 1]; } }
  // ---------- the game
  function create(api, opt) {
    const loop0 = opt.loop || 0; const g = { score: 0, over: false, demoKeys: { held: {}, hit: {} } };
    let lives = 3, stageN = 0, loopN = loop0, gofio = 0, L = null, tiles = null, camX = 0, camY = 84, time = 0, phase = 'intro', phaseT = 0, fx = [], banner = null, bannerT = 0, boss = null;
    const p = { x: 0, y: 0, vx: 0, vy: 0, face: 1, hp: 3, inv: 0, atk: 0, atkCD: 0, vault: 0, pogo: false, onG: false, coy: 0, buf: 0, power: 0, stones: 3, anim: 0, dead: 0, cp: null, hurtT: 0 };
    const E = []; const shots = []; const rocks = []; const items = [];
    const spd = () => 1 + 0.22 * loopN;
    function load(n) {
      L = STAGES[n % STAGES.length](); tiles = L.cols; E.length = 0; shots.length = 0; rocks.length = 0; items.length = 0; fx = []; boss = null; time = 0; L.rocks = false;
      for (const [ch, cx0, ry] of L.ents) { const x = cx0 * T + T / 2, y = (ry + 1) * T;
        if (ch === '@') { p.x = x; p.y = y; p.cp = [x, y]; }
        else if ('SBADCK'.includes(ch)) spawn(ch, x, y);
        else if (ch === 'L') { boss = spawn('L', x, y); }
        else if (ch === 'R') L.rocks = true;
        else items.push({ k: ch, x, y: ch === 'o' ? y - 6 : y, t: Math.random() * 6, got: false }); }
      if (loopN > 0) for (const [ch, cx0, ry] of L.ents) if ('SD'.includes(ch) && Math.random() < 0.6 + 0.2 * loopN) spawn(ch === 'S' ? 'D' : 'S', cx0 * T + T / 2 + 40, (ry + 1) * T); // more on every loop
      p.vx = p.vy = 0; p.hp = 3; p.inv = 1.2; p.vault = 0; p.dead = 0; camX = clamp(p.x - W * 0.35, 0, L.w * T - W); camY = clamp(p.y - VH * 0.64, 0, ROWS * T - VH);
      phase = 'intro'; phaseT = 2.6; if (!opt.demo) api.music(SONGS[TH[L.theme].music]); }
    function spawn(k, x, y) { const base = { k, x, y, vx: 0, vy: 0, face: -1, hp: 1, t: Math.random(), st: 'walk', cd: 1 + Math.random() * 2, w: 12, h: 22, onG: false, pts: 100 };
      if (k === 'B') Object.assign(base, { hp: 1, pts: 150, st: 'idle' }); if (k === 'A') Object.assign(base, { hp: 2, pts: 250 }); if (k === 'D') Object.assign(base, { w: 18, h: 10, pts: 150, st: 'sleep' });
      if (k === 'C') Object.assign(base, { w: 30, h: 30, hp: 3, pts: 500, x0: x - 90, x1: x + 90 }); if (k === 'K') Object.assign(base, { hp: 3, pts: 300 });
      if (k === 'L') Object.assign(base, { w: 34, h: 34, hp: 14, max: 14, pts: 5000, st: 'wait', x0: x - 150, x1: x + 120 }); E.push(base); return base; }
    // ---------- tile physics
    const tAt = (x, y) => { const c = Math.floor(x / T), r = Math.floor(y / T); if (c < 0 || c >= L.w) return 4; if (r < 0) return 0; if (r >= ROWS) return 0; return tiles[c][r]; };
    const solid = (t) => t === 1 || t === 2 || t === 4;
    function moveBody(o, dt, oneWay = true) { // AABB vs tiles; x = centre, y = feet
      const hw = o.w / 2; o.x += o.vx * dt; const top = o.y - o.h + 2, bot = o.y - 2;
      for (const yy of [top, (top + bot) / 2, bot]) { if (o.vx > 0 && solid(tAt(o.x + hw, yy))) { o.x = Math.floor((o.x + hw) / T) * T - hw - 0.01; o.vx = 0; o.hitWall = 1; } else if (o.vx < 0 && solid(tAt(o.x - hw, yy))) { o.x = Math.floor((o.x - hw) / T + 1) * T + hw + 0.01; o.vx = 0; o.hitWall = -1; } }
      const py = o.y; o.y += o.vy * dt; o.onG = false;
      if (o.vy >= 0) { for (const xx of [o.x - hw + 1, o.x + hw - 1]) { const t = tAt(xx, o.y); const ry = Math.floor(o.y / T) * T; if (solid(t) || (oneWay && t === 3 && py <= ry + 1 && !o.drop)) { o.y = ry; o.vy = 0; o.onG = true; break; } } }
      else { for (const xx of [o.x - hw + 1, o.x + hw - 1]) if (solid(tAt(xx, o.y - o.h))) { o.y = (Math.floor((o.y - o.h) / T) + 1) * T + o.h; o.vy = 0; break; } }
    }
    const groundAhead = (o, dir) => { const xx = o.x + dir * (o.w / 2 + 3); const t = tAt(xx, o.y + 4); return solid(t) || t === 3; };
    const wallAhead = (o, dir) => solid(tAt(o.x + dir * (o.w / 2 + 2), o.y - 6));
    // ---------- player
    function hurt(n = 1, from) { if (p.inv > 0 || p.power > 0 || p.dead) return; p.hp -= n; p.inv = 1.4; p.hurtT = 0.35; p.vy = -180; p.vx = from !== undefined ? Math.sign(p.x - from) * 120 : -p.face * 120; api.sfx('hurt'); if (p.hp <= 0) die(); }
    function die() { if (p.dead) return; p.dead = 1.8; p.vy = -260; p.vx = 0; api.stopMusic(); api.sfx('die'); }
    function respawn() { lives--; if (lives < 0) { g.over = true; lives = 0; return; } const [x, y] = p.cp; p.x = x; p.y = y; p.vx = p.vy = 0; p.hp = 3; p.inv = 2; p.dead = 0; p.vault = 0; camX = clamp(p.x - W * 0.35, 0, L.w * T - W); if (!opt.demo) api.music(boss && boss.st !== 'wait' ? SONGS.boss : SONGS[TH[L.theme].music]); }
    g.continue = () => { g.over = false; lives = 2; g.score = 0; respawn(); lives = 2; };
    function addScore(n, x, y) { n = Math.round(n * (1 + 0.5 * loopN)); /* v0.89 (Jonay): each loop gives more points */ g.score += n; if (x !== undefined) fx.push({ k: 'pts', t: 0.8, x, y, s: String(n) }); }
    function player(dt, pad) {
      if (p.dead) { p.dead -= dt; p.vy += 700 * dt; p.y += p.vy * dt; if (p.dead <= 0) respawn(); return; }
      const run = pad.held('vR') ? 1 : pad.held('vL') ? -1 : 0, down = pad.held('vD'), upK = pad.held('vU');
      p.inv = Math.max(0, p.inv - dt); p.hurtT = Math.max(0, p.hurtT - dt); p.power = Math.max(0, p.power - dt); p.atkCD = Math.max(0, p.atkCD - dt); p.atk = Math.max(0, p.atk - dt);
      if (pad.hit('vT')) p.buf = 0.12; else p.buf = Math.max(0, p.buf - dt); p.coy = p.onG ? 0.09 : Math.max(0, p.coy - dt);
      p.crouch = p.onG && down && p.vault <= 0 && !p.dead; // ↓ on the ground: crouched (A hits low: the dogs)
      const top = p.power > 0 ? 150 : 118, acc = p.onG ? 900 : 560;
      if (p.vault > 0) { // the pole planted ahead: the body swings up over it, then flies
        p.vault -= dt; p.vx = p.face * 40; p.vy = -60; if (p.vault <= 0) { p.vy = upK && Math.abs(p.vaultV) < 60 ? -430 : -400; p.vx = p.face * (Math.abs(p.vaultV) < 60 ? 70 : 185); p.flying = true; api.sfx('vault'); addFx('dust', p.x, p.y); } }
      else {
        if (run && p.crouch) { p.face = run; p.vx -= Math.sign(p.vx) * Math.min(Math.abs(p.vx), 1100 * dt); }
        else if (run) { p.vx += run * acc * dt; p.face = run; } else { const fr = p.onG ? 1100 : 160; p.vx -= Math.sign(p.vx) * Math.min(Math.abs(p.vx), fr * dt); }
        if (!p.flying) p.vx = clamp(p.vx, -top, top); else p.vx = clamp(p.vx, -200, 200);
        // B: a jump; running fast (or ↑ + B standing) the SALTO DEL PASTOR with the pole
        if (p.buf > 0 && p.onG && down && tAt(p.x, p.y + 2) === 3) { p.buf = 0; p.dropT = 0.25; p.y += 3; p.onG = false; } // ↓ + B on a ledge: drop through it
        if (p.buf > 0 && (p.onG || p.coy > 0)) { p.buf = 0; p.coy = 0;
          if (Math.abs(p.vx) > 85 || upK) { p.vault = 0.16; p.vaultV = p.vx; p.pole = [p.x + p.face * 26, p.y]; p.onG = false; }
          else { p.vy = -300; p.onG = false; api.sfx('jump'); } }
        if (!pad.held('vT') && p.vy < -140 && !p.flying) p.vy = -140; // short hop when you let go
      }
      p.pogo = !p.onG && down && p.vault <= 0;
      p.dropT = Math.max(0, (p.dropT || 0) - dt); p.drop = p.dropT > 0;
      // A: a blow with the banot; Q: a stone
      if (pad.hit('vS') && p.atkCD <= 0) { p.atk = 0.2; p.atkCD = 0.3; api.sfx('swing'); }
      if (pad.hit('vP') && p.stones > 0) { p.stones--; shots.push({ k: 'stone', x: p.x + p.face * 8, y: p.y - 16, vx: p.face * 230 + p.vx * 0.3, vy: -140, mine: true, t: 2 }); api.sfx('swing'); }
      p.vy += (p.vy < 0 && pad.held('vT') ? 760 : 980) * dt; p.vy = Math.min(p.vy, 520);
      const wasG = p.onG; p.w = 10; p.h = p.crouch ? 15 : 22; moveBody(p, dt); if (p.onG) { p.flying = false; if (!wasG) addFx('dust', p.x, p.y); }
      if (p.x < camX + 6) { p.x = camX + 6; p.vx = Math.max(0, p.vx); } if (p.x > L.w * T - 6) p.x = L.w * T - 6;
      p.anim += dt * (Math.abs(p.vx) / 30 + (p.onG ? 0 : 0));
      // hazards: tuneras (pogo on them = a bounce), the sea, falling off
      const tF = tAt(p.x, p.y + 1), tB = tAt(p.x, p.y - 4);
      if (tF === 5 || tB === 5) { if (p.pogo && p.vy >= 0) { p.vy = -330; api.sfx('jump'); addFx('spark', p.x, p.y); } else hurt(1); }
      if (p.y > ROWS * T + 30 || tAt(p.x, p.y - 2) === 6) die();
      // the end of the stage
      if (L.endX && p.x > L.endX && !boss && phase === 'play') { phase = 'clear'; phaseT = 4; api.stopMusic(); api.sfx('clear'); }
    }
    // ---------- enemies
    function enemy(e, dt) {
      e.t += dt; const dx = p.x - e.x, adx = Math.abs(dx), sameY = Math.abs(p.y - e.y) < 40, s = spd();
      if (e.hurt > 0) e.hurt -= dt;
      if (e.k === 'S' || e.k === 'K') { if (e.st === 'walk') { if (!groundAhead(e, e.face) || wallAhead(e, e.face)) e.face = -e.face; e.vx = e.face * (e.k === 'K' ? 28 : 36) * s; if (adx < 90 && sameY && Math.sign(dx) === e.face && e.k === 'K') e.vx *= 1.6; } }
      if (e.k === 'B') { e.face = Math.sign(dx) || -1; e.vx = 0; e.cd -= dt; if (adx < 230 && sameY && e.cd <= 0) { e.cd = 2.4 / s; e.aim = 0.3; } if (e.aim > 0) { e.aim -= dt; if (e.aim <= 0) { shots.push({ k: 'bolt', x: e.x + e.face * 10, y: e.y - 14, vx: e.face * 150 * s, vy: 0, t: 3 }); api.sfx('swing'); } } }
      if (e.k === 'A') { if (e.aim > 0) { e.vx = 0; e.aim -= dt; if (e.aim <= 0) { shots.push({ k: 'ball', x: e.x + e.face * 16, y: e.y - 15, vx: e.face * 250 * s, vy: 0, t: 2 }); addFx('smoke', e.x + e.face * 18, e.y - 16); api.sfx('shot'); e.cd = 3.2 / s; } }
        else { e.cd -= dt; if (adx < 220 && sameY && e.cd <= 0) { e.face = Math.sign(dx) || -1; e.aim = 0.8; } else { if (!groundAhead(e, e.face) || wallAhead(e, e.face)) e.face = -e.face; e.vx = e.face * 16 * s; } } }
      if (e.k === 'D') { if (e.st === 'sleep') { e.vx = 0; if (adx < 150 && sameY) { e.st = 'run'; api.sfx('bark'); } } else { e.face = Math.sign(dx) || e.face; e.vx = e.face * 150 * s; if (adx < 46 && e.onG && !p.crouch && Math.random() < 0.03) { e.vy = -230; } /* against a crouched Bencomo they stay low (and his low blow gets them) */ if (!groundAhead(e, e.face) && e.onG) e.vy = -240; } }
      if (e.k === 'C') { if (e.st === 'walk') { e.vx = e.face * 45 * s; if (e.x < e.x0) e.face = 1; if (e.x > e.x1) e.face = -1; if (adx < 190 && sameY && Math.sign(dx) === e.face) { e.st = 'charge'; api.sfx('bark'); } }
        else { e.vx = e.face * 170 * s; if (e.x < e.x0 - 60 || e.x > e.x1 + 60 || wallAhead(e, e.face) || !groundAhead(e, e.face)) { e.st = 'walk'; e.face = -e.face; } } }
      if (e.k === 'L') { bossAI(e, dt); if (e.st === 'flee') { e.x += e.vx * dt; e.t2 = (e.t2 || 0) + dt; if (e.t2 > 3.5) { e.dead = true; phase = 'clear'; phaseT = 6; api.stopMusic(); api.sfx('clear'); } return; } } // fleeing: off he goes, through anything
      e.vy += 900 * dt; e.vy = Math.min(e.vy, 500); e.hitWall = 0; moveBody(e, dt); if (e.y > ROWS * T + 40) e.dead = true;
      // touching Bencomo
      if (!p.dead && Math.abs(p.x - e.x) < (e.w + 10) / 2 && p.y > e.y - e.h && p.y - p.h < e.y) {
        if ((p.pogo || p.power > 0) && p.vy > 0 && p.y < e.y - e.h + Math.max(10, e.h * 0.5)) { /* v0.89 (Jonay): the «picado» on the rider of a horse hit you: landing anywhere on the top half counts */ hitE(e, p.pogo ? 2 : 3, true); p.vy = -340; api.sfx('jump'); }
        else if (p.power > 0) hitE(e, 3);
        else if (!(e.k === 'D' && e.st === 'sleep')) hurt(e.k === 'L' || e.k === 'C' ? 1 : 1, e.x); }
      // the banot
      if (p.atk > 0.06 && !e.hitBy) { const hx = p.x + p.face * 18, hy = p.y - (p.crouch ? 5 : 14); if (Math.abs(hx - e.x) < 14 + e.w / 2 && hy > e.y - e.h - 4 && hy < e.y + 2) { e.hitBy = true; hitE(e, 1); } }
      if (p.atk <= 0) e.hitBy = false;
    }
    function hitE(e, n, stomp) { if (e.hurt > 0 && e.k === 'L') return; if (e.k === 'L' && e.st === 'wait') return; e.hp -= n; e.hurt = e.k === 'L' ? 0.5 : 0.15; api.sfx('hit'); addFx('spark', e.x, e.y - e.h / 2); e.vx = 0;
      if (e.k !== 'L' && e.k !== 'C') { e.vy = -120; } if (e.hp <= 0 && e.k !== 'L') { e.dead = true; addScore(e.pts * (stomp ? 2 : 1), e.x, e.y - e.h); addFx('ko', e.x, e.y, e); } }
    function bossAI(e, dt) { // Alonso Fernández de Lugo on his white horse
      const dx = p.x - e.x;
      if (e.st === 'wait') { e.vx = 0; if (Math.abs(dx) < 200) { e.st = 'speech'; e.t = 0; const cx = clamp(e.x - W * 0.62, 0, L.w * T - W); L.lock = [cx, cx + W]; e.x0 = cx + 26; e.x1 = cx + W - 26; /* v0.82.1 (Jonay): the last fight fits in one screen, no scrolling */ api.music(SONGS.boss); banner = ['¡ALONSO FERNÁNDEZ DE LUGO!', 'EL ADELANTADO'], bannerT = 2.6; } return; }
      if (e.st === 'speech') { e.vx = 0; e.face = Math.sign(dx) || -1; if (e.t > 2.2) { e.st = 'charge'; e.t = 0; } return; }
      if (e.st === 'flee') { e.vx = 220; e.face = 1; e.y -= 0; if (e.x > camX + W + 60) { e.dead = true; phase = 'clear'; phaseT = 6; api.stopMusic(); api.sfx('clear'); } return; }
      const rage = e.hp < e.max / 2 ? 1.35 : 1;
      if (e.st === 'charge') { e.vx = e.face * 190 * rage * spd(); if ((e.face > 0 && e.x > e.x1) || (e.face < 0 && e.x < e.x0)) { e.st = 'turn'; e.t = 0; e.vx = 0; } }
      else if (e.st === 'turn') { e.vx = 0; if (e.t > 0.7 / rage) { e.face = Math.sign(dx) || -e.face; e.st = Math.random() < 0.45 ? 'slash' : 'charge'; e.t = 0; } }
      else if (e.st === 'slash') { e.vx = 0; e.face = Math.sign(dx) || e.face; if (e.t > 0.5 && !e.did) { e.did = true; shots.push({ k: 'wave', x: e.x + e.face * 20, y: e.y - 6, vx: e.face * 170 * rage, vy: 0, t: 2.5 }); api.sfx('swing'); }
        if (e.t > 1.1) { e.did = false; e.st = 'charge'; e.t = 0; if (rage > 1 && E.filter((q) => q.k === 'S').length < 2) { spawn('S', e.x0, e.y); spawn('S', e.x1, e.y); } } }
      if (e.hp <= 0) { e.st = 'flee'; e.hp = 0; addScore(e.pts, e.x, e.y - 40); banner = ['¡LUGO HUYE HERIDO!', 'ACENTEJO, 31 DE MAYO DE 1494']; bannerT = 3.5; api.sfx('boom'); for (const q of E) if (q !== e) q.dead = true; }
    }
    // ---------- shots, stones from the cliffs, items, effects
    function addFx(k, x, y, e) { fx.push({ k, x, y, t: k === 'ko' ? 0.9 : 0.4, e, vy: -160 }); }
    function updateShots(dt) {
      for (const s of shots) { s.t -= dt; if (s.k === 'stone') s.vy += 700 * dt; s.x += s.vx * dt; s.y += s.vy * dt;
        if (solid(tAt(s.x, s.y))) s.t = 0;
        if (s.mine) { for (const e of E) if (!e.dead && Math.abs(e.x - s.x) < e.w / 2 + 3 && s.y > e.y - e.h && s.y < e.y) { hitE(e, 1); s.t = 0; break; } }
        else if (!p.dead && Math.abs(p.x - s.x) < 8 && s.y > p.y - (p.h || 22) && s.y < p.y) { if (p.atk > 0 && Math.sign(s.x - p.x) === p.face && s.k !== 'wave') { s.vx = -s.vx; s.mine = true; api.sfx('hit'); } else { hurt(1, s.x); s.t = 0; } } }
      for (let i = shots.length - 1; i >= 0; i--) if (shots[i].t <= 0 || shots[i].x < camX - 40 || shots[i].x > camX + W + 40) shots.splice(i, 1);
      // Acentejo: the Guanches up on the slopes roll stones down (a shadow first): they crush the Castilians too
      if (L.rocks && !p.dead && Math.random() < dt * (0.55 + 0.15 * loopN)) { const x = p.x + (Math.random() * 2 - 1) * 140; rocks.push({ x, y: -20, vy: 0, warn: 0.7, t: 0 }); }
      for (const r of rocks) { if (r.warn > 0) { r.warn -= dt; continue; } r.vy += 600 * dt; r.y += r.vy * dt; r.t += dt;
        if (!p.dead && Math.abs(r.x - p.x) < 12 && r.y > p.y - 24 && r.y < p.y) { hurt(1, r.x); r.done = true; }
        for (const e of E) if (!e.dead && e.k !== 'L' && Math.abs(r.x - e.x) < e.w / 2 + 6 && r.y > e.y - e.h && r.y < e.y) { hitE(e, 3); r.done = true; }
        if (solid(tAt(r.x, r.y + 6)) || r.y > H + 20) { r.done = true; addFx('dust', r.x, r.y + 6); } }
      for (let i = rocks.length - 1; i >= 0; i--) if (rocks[i].done) rocks.splice(i, 1);
      for (const it of items) if (it.k === 'P' && !it.on && p.x > it.x - 4 && !p.dead) { it.on = true; p.cp = [it.x, it.y]; api.sfx('coin'); banner = ['PINTADERA', 'PUNTO DE CONTROL']; bannerT = 1.2; } // passing it is enough (also vaulting over it)
      for (const it of items) { if (it.got) continue; it.t += dt; if (Math.abs(it.x - p.x) < 11 && it.y > p.y - 24 && it.y < p.y + 6 && !p.dead) { it.got = true;
        if (it.k === 'o') { gofio++; addScore(10); api.sfx('pick'); if (gofio >= 100) { gofio -= 100; lives++; api.sfx('life'); banner = ['¡100 PUÑADOS DE GOFIO!', '+1 VIDA']; bannerT = 1.8; } }
        else if (it.k === 'G') { p.hp = Math.min(4, p.hp + 1); addScore(200, it.x, it.y - 10); api.sfx('life'); }
        else if (it.k === 'Q') { lives++; addScore(500, it.x, it.y - 10); api.sfx('life'); banner = ['¡QUESO DE CABRA!', '+1 VIDA']; bannerT = 1.6; }
        else if (it.k === 'M') { p.power = 9; addScore(300, it.x, it.y - 10); api.sfx('life'); banner = ['¡GOFIO CON MIEL DE PALMA!', 'INVENCIBLE']; bannerT = 1.6; }
        else if (it.k === 'r') { p.stones = Math.min(9, p.stones + 5); addScore(50, it.x, it.y - 10); api.sfx('pick'); }
        else if (it.k === 'P') { it.got = false; }
        else if (it.k === 'E') { L.endX = it.x - 1; it.got = false; } } }
    }
    // ---------- demo pilot (attract mode): runs, vaults the gaps, hits who is in front
    function demoPilot(dt) { const k = g.demoKeys; k.hit = {}; k.held = { vR: true }; const ahead = p.x + (Math.abs(p.vx) > 85 ? 34 : 10); // fast: vault early; slow: jump at the very edge
      const gapAhead = !solid(tAt(ahead, p.y + 6)) && tAt(ahead, p.y + 6) !== 3; const wall = solid(tAt(p.x + 20, p.y - 10)) || solid(tAt(p.x + 20, p.y - 26)) || tAt(p.x + 18, p.y - 4) === 5;
      if (p.onG && (gapAhead || wall)) { k.hit.vT = true; g.holdB = 0.4; } g.holdB = Math.max(0, (g.holdB || 0) - dt); k.held.vT = g.holdB > 0; // keeps B down for the whole jump
      for (const e of E) if (!e.dead && e.x > p.x && e.x - p.x < 34 && Math.abs(e.y - p.y) < 30) k.hit.vS = true; g.demoT = (g.demoT || 0) + dt; }
    // ---------- step
    g.update = (dt, pad) => { time += dt; if (bannerT > 0) bannerT -= dt;
      if (opt.demo) { demoPilot(dt); pad = { held: (v) => !!g.demoKeys.held[v], hit: (v) => !!g.demoKeys.hit[v] }; }
      if (phase === 'intro') { phaseT -= dt; if (phaseT <= 0 || (!opt.demo && (pad.hit('vS') || pad.hit('vT')) && phaseT < 2)) phase = 'play'; return; }
      if (phase === 'clear') { phaseT -= dt; if (phaseT < 3 && !g.tally) { g.tally = true; addScore(Math.max(0, Math.round(300 - time)) * 10); addScore(p.hp * 500); } if (phaseT <= 0) { g.tally = false; stageN++; if (stageN % STAGES.length === 0) { loopN++; banner = ['¡SEGUNDA VUELTA!', 'MÁS RÁPIDOS Y MÁS'], bannerT = 2.5; } load(stageN); } return; }
      player(dt, pad); for (const e of E) if (!e.dead && Math.abs(e.x - camX - W / 2) < W) enemy(e, dt); for (let i = E.length - 1; i >= 0; i--) if (E[i].dead && E[i] !== boss) E.splice(i, 1);
      if (boss && boss.dead) boss = null; updateShots(dt);
      for (const f of fx) { f.t -= dt; if (f.k === 'pts') f.y -= 20 * dt; if (f.k === 'ko') { f.vy += 600 * dt; f.y += f.vy * dt; } } fx = fx.filter((f) => f.t > 0);
      // camera: ahead of Bencomo, never back (like the old ones); in the boss's arena it stays
      camY = lerp(camY, clamp(p.y - VH * 0.64, 0, ROWS * T - VH), 0.15);
      const tx = clamp(p.x - W * 0.38 + p.face * 20, 0, L.w * T - W); camX = Math.max(camX, lerp(camX, tx, 0.12)); if (L.lock) { camX = lerp(camX, L.lock[0], 0.12); if (p.x > L.lock[1] - 6) { p.x = L.lock[1] - 6; p.vx = Math.min(0, p.vx); } }
    };
    // ---------- drawing
    const flick = () => Math.floor(time * 20) % 2 === 0;
    g.draw = (c) => { const bg = background(L.theme), t = TH[L.theme]; c.save(); c.scale(Z, Z); // the world at ×2
      [0.1, 0.3, 0.6].forEach((k, i) => { const off = -((camX * k) % 640), oy = -Math.round(camY * (0.35 + k)); c.drawImage(bg[i], Math.round(off), oy, 640, 224); c.drawImage(bg[i], Math.round(off) + 640, oy, 640, 224); });
      c.translate(0, -Math.round(camY * Z) / Z);
      const c0 = Math.floor(camX / T), c1 = Math.min(L.w - 1, c0 + 21);
      for (let ci = c0; ci <= c1; ci++) for (let r = 0; r < ROWS; r++) { const k = tiles[ci][r]; if (!k) continue; const x = Math.round(ci * T - camX), y = r * T;
        if (k === 6) { c.fillStyle = '#2f6fae'; c.fillRect(x, y + 4, T, T - 4); c.fillStyle = '#7fb8e6'; c.fillRect(x + ((time * 20 + ci * 5) % T), y + 4, 4, 1); } else c.drawImage(tileImg(L.theme, k), x, y, T, T); }
      void t;
      for (const it of items) { if (it.got && it.k !== 'P' && it.k !== 'E') continue; const x = it.x - camX; if (x < -20 || x > W + 20) continue; const bob = Math.round(Math.sin(it.t * 4) * 1.5);
        if (it.k === 'o') A.draw(c, spr8('gofio', GOFIO), x - 4, it.y - 6 + bob); if (it.k === 'G') A.draw(c, spr8('zurron', ZURRON), x - 5, it.y - 8 + bob); if (it.k === 'Q') A.draw(c, spr8('queso', QUESO, { Y: '#c89a2a' }), x - 5, it.y - 6 + bob);
        if (it.k === 'M') A.draw(c, spr8('miel', MIEL), x - 4, it.y - 7 + bob); if (it.k === 'r') A.draw(c, spr8('piedras', STONES), x - 4, it.y - 4);
        if (it.k === 'P') { c.fillStyle = '#4a3a2a'; c.fillRect(x - 1, it.y - 26, 2, 26); A.draw(c, spr8('pinta', PINTA), x - 4, it.y - 32); if (it.on) { c.fillStyle = '#ffd400'; c.fillRect(x - 5, it.y - 34, 10, 1); } }
        if (it.k === 'E') { for (let i = 0; i < 5; i++) { c.fillStyle = i % 2 ? '#7d7466' : '#958b7c'; c.fillRect(x - 14 + i * 7, it.y - 10 - (i % 2) * 3, 6, 10 + (i % 2) * 3); } A.txt(c, 'TAGOROR', x, it.y - 30, '#ffd400', 6, 'center'); } }
      for (const r of rocks) { const x = r.x - camX; if (r.warn > 0) { c.fillStyle = flick() ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.2)'; const gy = groundY(r.x); c.fillRect(x - 6, gy - 2, 12, 2); continue; } c.fillStyle = '#6a625a'; c.beginPath(); c.arc(x, r.y, 6, 0, 7); c.fill(); c.fillStyle = '#8f877d'; c.fillRect(x - 3, r.y - 4, 3, 2); }
      for (const e of E) drawEnemy(c, e);
      for (const s of shots) { const x = s.x - camX; if (s.k === 'stone') { c.fillStyle = '#9a9488'; c.fillRect(x - 2, s.y - 2, 4, 4); } else if (s.k === 'bolt') { c.fillStyle = '#6b4422'; c.fillRect(x - 6, s.y, 12, 1); c.fillStyle = '#cfd3d9'; c.fillRect(x + (s.vx > 0 ? 5 : -7), s.y - 1, 2, 3); }
        else if (s.k === 'ball') { c.fillStyle = '#222'; c.fillRect(x - 2, s.y - 1, 3, 3); } else if (s.k === 'wave') { c.fillStyle = flick() ? '#fff' : '#9fd7ff'; c.beginPath(); c.ellipse(x, s.y - 6, 4, 10, 0, 0, 7); c.fill(); } }
      drawBencomo(c);
      for (const f of fx) { const x = f.x - camX; if (f.k === 'pts') A.txt(c, f.s, x, f.y, '#fff', 6, 'center'); else if (f.k === 'spark') { c.fillStyle = '#fff6a0'; for (let i = 0; i < 6; i++) c.fillRect(x + Math.cos(i) * (1 - f.t / 0.4) * 10, f.y + Math.sin(i * 1.7) * (1 - f.t / 0.4) * 10, 2, 2); }
        else if (f.k === 'dust' || f.k === 'smoke') { c.fillStyle = f.k === 'smoke' ? 'rgba(220,220,220,0.7)' : 'rgba(230,210,170,0.7)'; const k = 1 - f.t / 0.4; c.beginPath(); c.arc(x - 6 * k, f.y - 2, 3 + 3 * k, 0, 7); c.arc(x + 6 * k, f.y - 2, 3 + 3 * k, 0, 7); c.fill(); }
        else if (f.k === 'ko' && f.e) { drawEnemy(c, { ...f.e, y: f.y, dead: false, ko: true }); } }
      c.restore(); hud(c);
      if (phase === 'intro') { c.fillStyle = 'rgba(0,0,0,0.7)'; c.fillRect(0, 96, SW, 80); A.txt(c, (loopN ? 'VUELTA ' + (loopN + 1) + ' · ' : '') + 'FASE ' + (stageN % STAGES.length + 1), SW / 2, 104, '#9fd7ff', 8, 'center'); A.txt(c, L.name, SW / 2, 122, '#ffd400', 14, 'center'); A.txt(c, L.sub, SW / 2, 152, '#fff', 8, 'center'); }
      if (phase === 'clear') { c.fillStyle = 'rgba(0,0,0,0.65)'; c.fillRect(0, 60, SW, 110); A.txt(c, boss === null && stageN % STAGES.length === STAGES.length - 1 ? '¡ACENTEJO VENGADO!' : '¡FASE SUPERADA!', SW / 2, 72, '#ffd400', 12, 'center');
        if (phaseT < 3) { A.txt(c, 'TIEMPO  ' + Math.max(0, Math.round(300 - time)) * 10, SW / 2, 100, '#fff', 8, 'center'); A.txt(c, 'VIDA    ' + p.hp * 500, SW / 2, 116, '#fff', 8, 'center'); } }
      if (bannerT > 0 && banner) { c.fillStyle = 'rgba(0,0,0,0.6)'; c.fillRect(0, 34, SW, 34); A.txt(c, banner[0], SW / 2, 40, '#ffd400', 8, 'center'); A.txt(c, banner[1], SW / 2, 54, '#fff', 6, 'center'); }
    };
    function groundY(x) { for (let r = 0; r < ROWS; r++) { const k = tAt(x, r * T + 1); if (solid(k) || k === 3) return r * T; } return H; }
    function hud(c) { A.txt(c, '1UP', 8, 6, '#ff6b6b', 8); A.txt(c, String(g.score).padStart(7, '0'), 8, 16, '#fff', 8); const hi = api.hi(); A.txt(c, 'HI', SW / 2, 6, '#ffd400', 8, 'center'); A.txt(c, String(Math.max(hi, g.score)).padStart(7, '0'), SW / 2, 16, '#fff', 8, 'center');
      for (let i = 0; i < Math.max(3, p.hp); i++) { const x = SW - 70 + i * 12; c.fillStyle = i < p.hp ? '#e53935' : '#442222'; c.fillRect(x, 7, 4, 4); c.fillRect(x + 5, 7, 4, 4); c.fillRect(x + 1, 10, 7, 3); c.fillRect(x + 3, 13, 3, 2); }
      A.txt(c, 'VIDAS ' + lives, SW - 8, 20, '#fff', 6, 'right'); A.draw(c, spr8('gofio', GOFIO), SW - 112, 20); A.txt(c, String(gofio), SW - 102, 20, '#fff', 6);
      if (boss && boss.st !== 'wait' && boss.st !== 'flee' && !boss.dead) { c.fillStyle = '#000'; c.fillRect(80, SH - 16, SW - 160, 8); c.fillStyle = '#e53935'; c.fillRect(81, SH - 15, (SW - 162) * Math.max(0, boss.hp) / boss.max, 6); A.txt(c, 'LUGO', 74, SH - 17, '#fff', 8, 'right'); }
      if (p.stones > 0) { A.draw(c, spr8('piedras', STONES), 8, 28); A.txt(c, '×' + p.stones, 18, 27, '#fff', 6); } }
    /** Bencomo from his sheet: rows 0 idle, 2 run, 3 up, 4 down, 5 the blow, 6 hurt/dead, 7 crouched, 8 low thrust; vaulting
     *  and on the pogo he is drawn without his pole (bencomo_ns) and the game draws the planted pole */
    function drawBenX(c, x, y) { const run = Math.abs(p.vx) > 20 && p.onG, pole = (p.vault > 0 && p.pole) || p.pogo;
      const st = p.dead ? 'dead' : p.hurtT > 0 ? 'hurt' : p.atk > 0 ? (p.crouch ? 'catk' : 'atk') : pole ? 'pole' : !p.onG ? (p.vy < 0 ? 'up' : 'down') : p.crouch ? 'crouch' : run ? 'run' : 'idle';
      if (p._bs !== st) { p._bs = st; p._bt = time; } const t = time - p._bt, F = SPRX.fr;
      const [r, f] = { idle: [0, F('bencomo', 0, t, 6)], run: [2, F('bencomo', 2, t, 13)], up: [3, F('bencomo', 3, t, 12, false)], down: [4, F('bencomo', 4, t, 12, false)],
        atk: [5, Math.min(5, Math.floor(t / 0.2 * 6))], catk: [8, Math.min(5, Math.floor(t / 0.2 * 6))], crouch: [7, F('bencomo', 7, t, 6)], hurt: [6, 1], dead: [6, 9], pole: [p.pogo ? 4 : 3, 1] }[st];
      // v0.94 (Jonay): the pole of the vault and of the pogo drawn like the one he carries (outline, wood, light), held
      // by the middle: it sticks out behind the hands as much as in front; on the pogo he crouches with it pointing down
      if (pole) { const hand = p.pogo ? [x - p.face * 3, y - 12] : [x + p.face * 2, y - 24], tip = p.pogo ? [x - p.face * 1, y + 9] : [p.pole[0] - camX, p.pole[1]]; const dx = hand[0] - tip[0], dy = hand[1] - tip[1], L = Math.hypot(dx, dy) || 1, back = p.pogo ? 7 : 6, end = [hand[0] + dx / L * back, hand[1] + dy / L * back];
        for (const [w, col] of [[1.6, '#1a1008'], [0.8, '#5c3a22'], [0.4, '#96683e']]) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(tip[0], tip[1]); c.lineTo(end[0], end[1]); c.stroke(); } c.lineCap = 'butt'; }
      SPRX.draw(c, pole ? 'bencomo_ns' : 'bencomo', p.pogo ? 7 : r, p.pogo ? 0 : f, x, y, p.face, BXP);
      if (p.power > 0) { c.fillStyle = flick() ? 'rgba(255,212,0,0.35)' : 'rgba(255,255,255,0.25)'; c.fillRect(x - 9, y - 23, 18, 23); } }
    /** [row, frame] of an enemy's sheet */
    function enAnim(e, k) { const F = SPRX.fr, t = e.t || 0, mv = Math.abs(e.vx) > 2;
      if (k === 'b_perro') return e.st === 'run' ? [1, F(k, 1, t, 12)] : [0, F(k, 0, t, 6)];
      if (k === 'b_caballero') return e.ko ? [2, 4] : e.st === 'charge' ? [1, F(k, 1, t, 14)] : mv ? [1, F(k, 1, t, 9)] : [0, F(k, 0, t, 5)]; // (v0.94: a captain on a horse like Lugo's)
      if (k === 'b_lugo') return e.st === 'slash' ? [2, Math.min(9, Math.floor(t / 1.1 * 10))] : e.st === 'charge' || e.st === 'flee' ? [1, F(k, 1, t, 12)] : [0, F(k, 0, t, 6)];
      if (k === 'b_arquero') return e.ko ? [4, 2] : e.aim > 0 ? [1, Math.min(10, Math.floor((0.8 - e.aim) / 0.8 * 11))] : mv ? [2, F(k, 2, t, 10)] : [0, F(k, 0, t, 6)];
      if (e.ko) return [6, 2]; if (e.k === 'A' && e.aim > 0) return [0, 0]; return mv ? [1, F(k, 1, t, 10)] : [0, F(k, 0, t, 6)]; }
    function drawBencomo(c) { if (p.inv > 0 && !p.dead && flick() && p.power <= 0) return; const x = Math.round(p.x - camX), y = Math.round(p.y);
      if (SPRX.ready('bencomo')) { drawBenX(c, x, y); return; }
      const run = Math.abs(p.vx) > 20 && p.onG; const rf = ['run1', 'run2', 'run3', 'run2'][Math.floor(p.anim) % 4];
      let up = p.atk > 0 ? 'thrust' : p.hurtT > 0 || p.dead ? 'hurt' : p.vault > 0 || (p.flying && p.vy < 0) ? 'up' : 'idle';
      let leg = p.pogo ? 'pogo' : !p.onG ? 'jump' : p.crouch ? 'crouch' : run ? rf : 'stand';
      const s = bencomo(up, leg), fl = p.face < 0;
      // the pole: planted ahead while vaulting, down like a pogo, else carried
      c.strokeStyle = '#d9b77a'; c.lineWidth = 2; c.beginPath();
      if (p.vault > 0 && p.pole) { c.moveTo(p.pole[0] - camX, p.pole[1]); c.lineTo(x + p.face * 2, y - 26); }
      else if (p.pogo) { c.moveTo(x + p.face * 2, y - 16); c.lineTo(x + p.face * 2, y + 8); }
      else if (p.atk > 0) { const ay = p.crouch ? 7 : 0; c.moveTo(x - p.face * 6, y - 13 + ay + (p.crouch ? 2 : 0)); c.lineTo(x + p.face * 26, y - 14 + ay + (p.crouch ? 4 : 0)); c.stroke(); c.fillStyle = '#5a3a1a'; c.fillRect(x + p.face * 25 - 1, y - 15 + ay + (p.crouch ? 4 : 0), 3, 3); c.beginPath(); } // the hardened tip (low when crouched)
      else if (p.flying) { c.moveTo(x - p.face * 14, y - 4); c.lineTo(x + p.face * 10, y - 30); }
      else if (p.crouch) { c.moveTo(x - p.face * 8, y - 2); c.lineTo(x + p.face * 14, y - 14); }
      else { c.moveTo(x + p.face * 4, y + 1); c.lineTo(x + p.face * 9, y - 32); }
      c.stroke(); A.draw(c, s, x - 8, y - s.h, fl); if (p.power > 0) { c.fillStyle = flick() ? 'rgba(255,212,0,0.35)' : 'rgba(255,255,255,0.25)'; c.fillRect(x - 9, y - 23, 18, 23); } }
    function drawEnemy(c, e) { if (e.dead) return; const x = Math.round(e.x - camX), y = Math.round(e.y); if (x < -40 || x > W + 40) return; const fl = e.face < 0, f = Math.floor(e.t * 6) % 2;
      if (e.hurt > 0 && flick() && e.k === 'L') return; if (e.ko) { c.globalAlpha = 0.8; }
      const ek = BX_EN[e.k]; if (ek && SPRX.ready(ek)) { const [r, fx] = enAnim(e, ek); SPRX.draw(c, ek, r, fx, x, y, e.face, BXP);
        if (e.k === 'A' && e.aim > 0 && flick()) { c.fillStyle = '#ff9a2a'; c.fillRect(x + e.face * 16, y - 12, 2, 2); } // the match of the arquebus
        if (e.k === 'K' && e.hp < 3) { c.fillStyle = '#b3271d'; c.fillRect(x - 6, y - 26, 12 * e.hp / 3, 1); } c.globalAlpha = 1; return; }
      if (e.k === 'S' || e.k === 'K' || e.k === 'B' || e.k === 'A') { const top = e.k === 'K' ? CAP_TOP : e.k === 'B' ? BALL_TOP : e.k === 'A' ? ARC_TOP : SOLD_TOP; const s = soldier(Math.abs(e.vx) > 2 ? f : 0, top, e.k);
        A.draw(c, s, x - 8, y - 18, fl); c.strokeStyle = e.k === 'A' ? '#3d2614' : '#cfd3d9'; c.lineWidth = 1; c.beginPath();
        if (e.k === 'S' || e.k === 'K') { c.moveTo(x + e.face * 6, y - 8); c.lineTo(x + e.face * 14, y - 16 - f * 2); } // sword
        if (e.k === 'B') { c.moveTo(x + e.face * 4, y - 9); c.lineTo(x + e.face * 13, y - 9); c.moveTo(x + e.face * 12, y - 13); c.lineTo(x + e.face * 12, y - 5); } // crossbow
        if (e.k === 'A') { c.moveTo(x - e.face * 2, y - 8); c.lineTo(x + e.face * 18, y - (e.aim > 0 ? 10 : 4)); if (e.aim > 0 && flick()) { c.stroke(); c.fillStyle = '#ff9a2a'; c.fillRect(x - e.face * 1, y - 9, 2, 2); c.beginPath(); } } // arquebus and its match
        c.stroke(); if (e.k === 'K' && e.hp < 3) { c.fillStyle = '#b3271d'; c.fillRect(x - 6, y - 22, 12 * e.hp / 3, 1); } }
      if (e.k === 'D') A.draw(c, A.sprite('bc_dog' + (e.st === 'run' ? f : 0), DOG[e.st === 'run' ? f : 0], P, 20), x - 10, y - 10, fl);
      if (e.k === 'C' || e.k === 'L') { const big = e.k === 'L'; const hs = horse(Math.abs(e.vx) > 2 ? f : 0, big); A.draw(c, hs, x - 16, y - 16, fl);
        const rider = soldier(0, big ? CAP_TOP : SOLD_TOP, big ? 'K' : 'S'); A.draw(c, A.sprite('bc_rider' + (big ? 'L' : 'C'), [...(big ? CAP_TOP : SOLD_TOP)], P, 16), x - 8 + (fl ? 2 : -2), y - 30, fl); void rider;
        if (big) { c.fillStyle = '#b3271d'; c.fillRect(x - (fl ? -6 : 12), y - 26, 6, 10); } // the cape
        c.strokeStyle = '#cfd3d9'; c.lineWidth = 1; c.beginPath(); c.moveTo(x + e.face * 4, y - 22); c.lineTo(x + e.face * (big ? 18 : 22), y - (e.st === 'slash' ? 34 : 24)); c.stroke();
      }
      c.globalAlpha = 1; }
    load(0); if (opt.demo) phase = 'play';
    Object.assign(g, { _p: p, _E: E, _boss: () => boss, _L: () => L, _phase: () => phase, _load: (n) => { stageN = n; load(n); phase = 'play'; }, _lives: (v) => (v === undefined ? lives : (lives = v)), _stage: () => stageN, _spawn: (k, x, y) => spawn(k, x, y), _cam: () => camX }); // tests
    return g;
  }
  // ---------- title screen (attract) and the backdrop of the hi-score table
  function drawTitle(c, t) { const bg = background('barranco'), BW = 800; const lay = (im, sp) => { const o = -((t * sp) % BW); c.drawImage(im, o, 0, BW, SH); c.drawImage(im, o + BW, 0, BW, SH); }; lay(bg[0], 0); lay(bg[1], 8); lay(bg[2], 20);
    c.fillStyle = 'rgba(0,0,0,0.3)'; c.fillRect(0, 0, SW, SH); c.save(); c.translate(0, Math.round((SH - 280) / 2)); // laid out for 280 high, centred
    // the logo: stone letters
    const L1 = 'BENCOMO'; c.font = '36px "Press Start 2P", monospace'; c.textAlign = 'center'; c.textBaseline = 'top'; c.fillStyle = '#2a1a10'; c.fillText(L1, SW / 2 + 4, 34 + 4); const gr = c.createLinearGradient(0, 34, 0, 70); gr.addColorStop(0, '#f2d38a'); gr.addColorStop(0.5, '#c58a3c'); gr.addColorStop(1, '#7a4a22'); c.fillStyle = gr; c.fillText(L1, SW / 2, 34);
    A.txt(c, "ACENTEJO'S REVENGE", SW / 2, 84, '#ff6b4a', 10, 'center');
    if (!SPRX.draw(c, 'bencomo', 0, 0, SW / 2, 218, 1, 2.6)) { const s = A.hires(A.sprite('bc_title', [...UP.up, ...LEG.stand], P, 16)); c.strokeStyle = '#d9b77a'; c.lineWidth = 4; c.beginPath(); c.moveTo(SW / 2 - 52, 206); c.lineTo(SW / 2 + 50, 104); c.stroke(); c.drawImage(s.h2, SW / 2 - 40, 108, 80, 110); }
    A.txt(c, 'TENERIFE, MAYO DE 1494', SW / 2, 222, '#fff', 8, 'center'); A.txt(c, 'EL MENCEY DE TAORO CONTRA LUGO', SW / 2, 234, '#fff', 8, 'center');
    A.txt(c, '© 1494 MENCEYATO DE TAORO', SW / 2, 250, '#9fd7ff', 6, 'center'); c.restore(); }
  function drawBack(c, t) { const bg = background('monte'), BW = 800; c.drawImage(bg[0], 0, 0, BW, SH); const o = -((t * 10) % BW); c.drawImage(bg[1], o, 0, BW, SH); c.drawImage(bg[1], o + BW, 0, BW, SH); c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, SW, SH); }
  const ART = { title: 'BENCOMO', sub: "ACENTEJO'S REVENGE", marquee: ['#6b2a10', '#1a0a04'], titleCol: '#f2c46a', baseScore: 60000, music: { title: SONGS.title }, create, drawTitle, drawBack,
    help: (K) => `A GOLPE: ${K('f_punch')}  B SALTO/VARA: ${K('f_kick')}  ↓ AGACHARSE / PICADO PIEDRA/MONEDA: ${K('b_pass')}  ESC SALIR` };
  return ART;
})();
