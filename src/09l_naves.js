// ============ «GUERRA DE NAVES» (v0.81): the arcade of the bars and cafés (pay per game) ============
// Jonay (20-oct): the R-Type / Nemesis-like shoot'em up is called «Guerra de Naves». A horizontal scroller: La Laguna,
// 1987, and the invaders come in with the mist. The ship (the AGUERE-1) flies over the sky of Aguere, into the bowels of
// the Teide and up to the hive above the sea of clouds.
//  · Controls, the same as every minigame: A (E / left click) = shot; hold it and let go = the charged BEAM.
//    B (Espacio) = the MODULE (R-Type's Force): stuck in front or behind, B throws it and B calls it back. It stops the
//    small bullets and hurts whatever it touches. Q / right click = take the power marked on the bar (Nemesis):
//    VELOC · MISIL · DOBLE · LÁSER · OPCIÓN · ESCUDO; each capsule moves the mark one box.
//  · Jonay: the ship small (drawn at ×1 on the 480×336 screen): there must be room to see, like the first Bencomo.
//  · After the third stage the loop starts again, faster and with more enemies, as the boards did.
ARCADE.GAMES.naves = (() => {
  const A = ARCADE, W = A.W, H = A.H, TOP = 22, BOT = H - 26; // the world at ×1 (more view); HUD bands at the top and bottom
  const P = { k: '#0b0f1a', w: '#f4f7ff', l: '#b8c4d8', m: '#7d8aa3', d: '#3c4660', b: '#2f7fe0', B: '#9fd7ff', r: '#d8402a', R: '#ff8a3a', y: '#ffd400', Y: '#fff3a0',
    g: '#3fa04a', G: '#9df07a', p: '#8a3fc0', q: '#d79aff', o: '#6b3a1a', s: '#2a2f3a', c: '#38e0e0' };
  const S = (k, rows) => A.sprite('nv_' + k, rows, P);
  // ---------- sprites (the ship faces right; the enemies face left)
  const SHIP = ['...dd...................', '...dml..................', '...dmllm................', '..ddmmlllmmmm...........', 'RYdmllllllllllmBBB......', 'YYdbbbbbbbbbblllmBBw....',
    'RYdmllllllllllllllmmww..', '..ddmmmmmmmmlllllmmm....', '...dmllm................', '...dml..................', '...dd...................'];
  const FIGHTER = ['......pppp....', '....ppqqpp....', '..pppqqqqppp..', 'rrpppqkkqpppp.', '..pppqqqqppp..', '....ppqqpp....', '......pppp....'];
  const POP = ['..gggg..', '.gGGGGg.', 'gGkGGkGg', 'gGGGGGGg', '.gGggGg.', 'g.g..g.g'];
  const HOMER = ['....rrrr....', '..rrRRRRr...', 'rrRRyyRRRrrr', '..rrRRRRr...', '....rrrr....'];
  const TURRET = ['....mm......', '...mllm.....', '..mllllm....', '.mmmmmmmm...', 'dddddddddd..', 'dsdsdsdsdd..'];
  const CARRIER = ['..........dddddddd..............', '.......ddmmmmmmmmmmdd...........', '....ddmmllllllllllllmmdd........', '..ddmllllyyllllllyyllllmmd......', '.dmlllllllllllllllllllllllmdd...',
    'rdmllkkllkkllkkllkkllkkllllmmdRR', 'rdmllkkllkkllkkllkkllkkllllmmdRR', '.dmlllllllllllllllllllllllmdd...', '..ddmllllllllllllllllllmmd......', '....ddmmllllllllllllmmdd........', '.......ddmmmmmmmmmmdd...........', '..........dddddddd..............'];
  const MINE = ['....y....', '..ddmdd..', '.dmmmmmd.', '.dmrRrmd.', 'ydmRYRmdy', '.dmrRrmd.', '.dmmmmmd.', '..ddmdd..', '....y....'];
  const CAPS = ['..rrrrrr..', '.rRRRRRRr.', 'rRYRRRRRRr', 'rRRRRRRRRr', '.rrrrrrrr.'];
  const POWERS = ['VELOC', 'MISIL', 'DOBLE', 'LÁSER', 'OPCIÓN', 'ESCUDO'];
  // ---------- stages: a timeline of waves by scroll distance, the terrain (cave walls), the boss
  const rnd = (() => { let s = 7; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();
  function tl1() { const t = []; // the sky of Aguere: learn the shot, the capsules and the module
    for (let i = 0; i < 9; i++) t.push([300 + i * 520, 'z', [0.3, 0.7, 0.5][i % 3], 5]);
    for (let i = 0; i < 14; i++) t.push([520 + i * 330, 'p', 0.2 + ((i * 0.37) % 0.6), 4]);
    for (let i = 0; i < 6; i++) t.push([1500 + i * 600, 'h', i % 2 ? 0.25 : 0.75, 2]);
    t.push([1900, 'b', 0.5, 1, 'F'], [3700, 'b', 0.4, 1], [2800, 'm', 0.5, 3], [4400, 'm', 0.3, 3]); return t; }
  function tl2() { const t = []; // inside the volcano: turrets on the walls, lava bombs, narrow passages
    for (let i = 0; i < 9; i++) t.push([350 + i * 600, 'z', [0.5, 0.4, 0.6][i % 3], 5]);
    for (let i = 0; i < 16; i++) t.push([600 + i * 330, i % 2 ? 'tf' : 'tc', 0, 1]);
    for (let i = 0; i < 18; i++) t.push([800 + i * 280, 'l', 0, 1 + (i % 3 === 0 ? 1 : 0)]);
    for (let i = 0; i < 6; i++) t.push([1200 + i * 700, 'h', i % 2 ? 0.4 : 0.6, 2]);
    t.push([500, 'b', 0.5, 1, 'F'], [3000, 'b', 0.5, 1]); return t; }
  function tl3() { const t = []; // the sea of clouds and the hive: everything at once
    for (let i = 0; i < 11; i++) t.push([300 + i * 500, 'z', [0.25, 0.75, 0.5][i % 3], 6]);
    for (let i = 0; i < 18; i++) t.push([450 + i * 300, 'p', 0.15 + ((i * 0.41) % 0.7), 5]);
    for (let i = 0; i < 10; i++) t.push([900 + i * 500, 'tf', 0, 1]);
    for (let i = 0; i < 8; i++) t.push([1100 + i * 600, 'h', i % 2 ? 0.3 : 0.7, 3]);
    t.push([400, 'b', 0.4, 1, 'F'], [2400, 'b', 0.6, 1], [4200, 'b', 0.5, 1], [1800, 'm', 0.5, 4], [3500, 'm', 0.4, 4], [5000, 'm', 0.6, 4]); return t; }
  const STAGES = [
    { name: 'EL CIELO DE AGUERE', sub: 'Llegan por el norte, con la bruma', theme: 'cielo', len: 5200, tl: tl1 },
    { name: 'LAS ENTRAÑAS DEL TEIDE', sub: 'Se esconden dentro del volcán', theme: 'volcan', len: 6000, tl: tl2 },
    { name: 'EL MAR DE NUBES', sub: 'La colmena está sobre las nubes', theme: 'nubes', len: 6000, tl: tl3 }];
  const BOSS_NAME = { B1: ['¡LA NAVE NODRIZA!', 'DÉJALE EL OJO AL DESCUBIERTO'], B2: ['¡LA SIERPE DE LAVA!', 'DALE EN LA CABEZA'], B3: ['¡LA REINA DE LA COLMENA!', 'EL OJO, CUANDO LO ABRA'] };
  const ramp = (x, a, b) => clamp((x - a) / (b - a), 0, 1);
  function terrain(theme, wx, len) { // ceiling c and floor f at world x (screen units); no walls in the sky
    if (theme === 'cielo') return { c: -1e4, f: 1e4 };
    const k = ramp(wx, 150, 450) * (1 - ramp(wx, len - 350, len - 50)); if (k <= 0) return { c: -1e4, f: 1e4 };
    if (theme === 'volcan') { const n = 1 + 0.45 * ramp(wx, 2200, 2600) * (1 - ramp(wx, 4000, 4400)); // narrower in the middle
      const c = TOP + k * n * (24 + 30 * (0.5 + 0.5 * Math.sin(wx * 0.0045)) + 18 * (0.5 + 0.5 * Math.sin(wx * 0.017 + 2)));
      const f = BOT - k * n * (24 + 30 * (0.5 + 0.5 * Math.sin(wx * 0.0052 + 1)) + 18 * (0.5 + 0.5 * Math.sin(wx * 0.013))); return { c, f }; }
    const blk = [0, 1, 0.5, 0.8, 0.2][Math.floor(wx / 160) % 5], hang = Math.floor(wx / 240) % 4 === 2; // the hive: metal blocks
    return { c: hang ? TOP + k * 64 : -1e4, f: BOT - k * (24 + 52 * blk) }; }
  // ---------- backgrounds (3 parallax layers per theme, 960 wide, cached)
  const bgCache = {};
  function background(theme) {
    if (bgCache[theme]) return bgCache[theme]; const Ls = []; let s = theme.length * 91; const rr = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let li = 0; li < 3; li++) { const c = mkCanvas(960, H), x = c.getContext('2d'); Ls.push(c);
      if (li === 0) { const gr = x.createLinearGradient(0, 0, 0, H);
        const sky = theme === 'cielo' ? ['#1d3f7a', '#e9a46a'] : theme === 'volcan' ? ['#1a0604', '#5a1408'] : ['#060a24', '#3b4f8a']; gr.addColorStop(0, sky[0]); gr.addColorStop(1, sky[1]); x.fillStyle = gr; x.fillRect(0, 0, 960, H);
        if (theme !== 'volcan') for (let i = 0; i < (theme === 'nubes' ? 140 : 40); i++) { x.fillStyle = `rgba(255,255,255,${0.3 + rr() * 0.6})`; x.fillRect((rr() * 960) | 0, (rr() * H * 0.6) | 0, 1, 1); }
        if (theme === 'cielo') { x.fillStyle = '#ffe6b0'; x.beginPath(); x.arc(700, 210, 26, 0, 7); x.fill(); }
        if (theme !== 'volcan') { x.fillStyle = theme === 'nubes' ? '#5a6a9a' : '#6a5a7a'; x.beginPath(); x.moveTo(300, H - 60); x.lineTo(450, 150); x.lineTo(476, 142); x.lineTo(502, 150); x.lineTo(660, H - 60); x.fill(); // the Teide, always
          x.fillStyle = '#eef'; x.beginPath(); x.moveTo(434, 166); x.lineTo(450, 150); x.lineTo(476, 142); x.lineTo(502, 150); x.lineTo(518, 166); x.lineTo(490, 160); x.lineTo(468, 168); x.fill(); }
        else for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(255,${80 + rr() * 80 | 0},20,${0.1 + rr() * 0.2})`; x.beginPath(); x.arc(rr() * 960, rr() * H, 10 + rr() * 40, 0, 7); x.fill(); } }
      if (li === 1) { if (theme === 'cielo') for (let i = 0; i < 12; i++) cloud(x, rr() * 960, 40 + rr() * 140, 30 + rr() * 40, 'rgba(255,240,230,0.45)');
        else if (theme === 'volcan') { x.fillStyle = '#2a0c06'; for (let i = 0; i < 16; i++) { const cx0 = rr() * 960, w = 20 + rr() * 40; x.fillRect(cx0, 0, w, 30 + rr() * 80); x.fillRect(cx0 + 6, H - 40 - rr() * 90, w, 200); } }
        else { x.fillStyle = '#24305a'; for (let i = 0; i < 10; i++) { const tx = rr() * 960, th = 60 + rr() * 120; x.fillRect(tx, H - 70 - th, 8, th); x.fillRect(tx - 10, H - 70 - th, 28, 6); x.fillStyle = '#ff5a8a'; x.fillRect(tx + 2, H - 76 - th, 4, 4); x.fillStyle = '#24305a'; } } }
      if (li === 2) { if (theme === 'cielo') laguna(x, rr);
        else if (theme === 'volcan') { x.fillStyle = 'rgba(255,120,20,0.25)'; for (let i = 0; i < 6; i++) { const lx = rr() * 960; x.fillRect(lx, 0, 4 + rr() * 6, H); } }
        else for (let i = 0; i < 20; i++) cloud(x, i * 50 + rr() * 30, H - 30 - rr() * 20, 40 + rr() * 30, 'rgba(235,240,255,0.9)'); } }
    return (bgCache[theme] = Ls); }
  function cloud(x, cx0, cy, r, col) { x.fillStyle = col; x.beginPath(); x.arc(cx0, cy, r * 0.6, 0, 7); x.arc(cx0 + r * 0.6, cy + 4, r * 0.5, 0, 7); x.arc(cx0 - r * 0.6, cy + 6, r * 0.45, 0, 7); x.fill(); }
  function laguna(x, rr) { // the rooftops of La Laguna down below: flat roofs, the twin towers of the cathedral, the Concepción tower
    x.fillStyle = '#1b1830'; let px = 0; while (px < 960) { const w = 20 + rr() * 40, h = 24 + rr() * 30; x.fillRect(px, H - h, w, h); px += w; }
    const tw = (tx, h, w) => { x.fillRect(tx, H - h, w, h); x.beginPath(); x.moveTo(tx - 2, H - h); x.lineTo(tx + w / 2, H - h - 14); x.lineTo(tx + w + 2, H - h); x.fill(); };
    tw(200, 92, 14); tw(240, 92, 14); x.fillRect(196, H - 70, 60, 70); tw(620, 110, 16); x.fillStyle = 'rgba(255,220,140,0.6)'; for (let i = 0; i < 70; i++) x.fillRect((rr() * 960) | 0, H - 6 - ((rr() * 30) | 0), 2, 2); }
  // ---------- music: chiptune, one per stage, the boss and the title (in 4: div 4)
  const SONGS = {
    title: { bpm: 140, div: 4, ch: [
      { w: 'sq', v: 0.85, n: 'E5 . B4 . G4 . B4 . E5 . F#5 . G5 . F#5 . E5 . . . D5 . . . B4 . . . - . . . C5 . G4 . E4 . G4 . C5 . D5 . E5 . D5 . C5 . B4 . A4 . B4 . . . . . . . - . . .' },
      { w: 'tri', v: 1, n: 'E2 . E3 . E2 . E3 . E2 . E3 . E2 . E3 . C2 . C3 . C2 . C3 . D2 . D3 . B1 . B2 .' },
      { w: 'noise', v: 0.7, n: 'k . h . s . h . k k h . s . h h' }] },
    cielo: { bpm: 150, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'A4 . C5 . E5 . A5 . G5 . E5 . C5 . D5 . E5 . . . - . E5 . D5 . C5 . B4 . C5 . A4 . . . - . . . F4 . A4 . C5 . F5 . E5 . C5 . A4 . B4 . C5 . . . D5 . E5 . G5 . . . F5 . E5 . D5 . . . E5 . . . . . . . - . . .' },
      { w: 'sq', v: 0.3, legato: 0.5, n: 'A3 C4 E4 A4 A3 C4 E4 A4 A3 C4 E4 A4 A3 C4 E4 A4 F3 A3 C4 F4 F3 A3 C4 F4 G3 B3 D4 G4 E3 G#3 B3 E4' },
      { w: 'tri', v: 1, n: 'A1 . A2 . A1 . A2 . A1 . A2 . A1 . A2 . F1 . F2 . F1 . F2 . G1 . G2 . E1 . E2 .' },
      { w: 'noise', v: 0.7, n: 'k . h . s . h . k . h k s . h h' }] },
    volcan: { bpm: 128, div: 4, ch: [
      { w: 'sq', v: 0.8, n: 'D4 . . . F4 . . . G4 . G#4 . A4 . . . C5 . A4 . G4 . F4 . G4 . . . . . . . D4 . . . F4 . . . G4 . G#4 . A4 . . . D5 . C5 . A4 . C5 . D5 . . . . . . . F5 . E5 . D5 . C5 . A4 . . . G4 . A4 . F4 . . . D4 . . . . . . . - . . .' },
      { w: 'tri', v: 1, n: 'D2 D2 D3 D2 D2 D2 C3 D2 D2 D2 D3 D2 A#1 A#1 C2 C2' },
      { w: 'noise', v: 0.85, n: 'k . . h s . k . k . k h s . h s' }] },
    nubes: { bpm: 136, div: 4, ch: [
      { w: 'sq', v: 0.75, legato: 0.95, n: 'B4 . . . E5 . . . F#5 . G5 . F#5 . E5 . D5 . . . E5 . . . B4 . . . . . . . A4 . . . D5 . . . E5 . F#5 . E5 . D5 . C#5 . . . D5 . . . E5 . . . . . . . G5 . F#5 . E5 . D5 . E5 . . . B4 . . . C#5 . D5 . E5 . . . . . . . - . . .' },
      { w: 'sq', v: 0.3, legato: 0.5, n: 'E4 G4 B4 E5 E4 G4 B4 E5 D4 F#4 A4 D5 D4 F#4 A4 D5 A3 C#4 E4 A4 A3 C#4 E4 A4 B3 D4 F#4 B4 B3 D4 F#4 B4' },
      { w: 'tri', v: 1, n: 'E2 . . . E2 . B1 . D2 . . . D2 . A1 . A1 . . . A1 . E2 . B1 . . . B1 . F#2 .' },
      { w: 'noise', v: 0.6, n: 'k . h . s . h h k . h . s . h .' }] },
    boss: { bpm: 170, div: 4, ch: [
      { w: 'sq', v: 0.85, n: 'E5 . E5 D5 E5 . G5 . E5 . D5 . B4 . A4 . C5 . C5 B4 C5 . E5 . C5 . B4 . A4 . G4 . A4 . A4 G#4 A4 . C5 . E5 . F5 . E5 . D5 . D#5 . E5 . . . . . B4 . . . . . . .' },
      { w: 'tri', v: 1, n: 'E2 E3 E2 E3 E2 E3 E2 E3 C2 C3 C2 C3 A1 A2 B1 B2' },
      { w: 'noise', v: 0.9, n: 'k h s h k k s h k h s h k k s s' }] },
  };
  // ---------- the game
  function create(api, opt) {
    const g = { score: 0, over: false, demoKeys: { held: {}, hit: {} } };
    let lives = 3, stageN = 0, loopN = opt.loop || 0, L = null, scroll = 0, bgX = 0, vScroll = 0, time = 0, phase = 'intro', phaseT = 0, banner = null, bannerT = 0, boss = null, ti = 0, nextLife = 50000, gid = 0, fx = [];
    const p = { x: 70, y: H / 2, dead: 0, inv: 0, spd: 0, missile: false, dbl: false, laser: false, opts: 0, shield: 0, cur: -1, charge: 0, mCD: 0, hist: [], tilt: 0 };
    const mod = { have: false, st: 'front', x: 0, y: 0, vx: 0, a: 0 };
    const foes = [], shots = [], bul = [], items = [], groups = {};
    const sp = () => 1 + 0.25 * loopN;
    const terr = (x) => terrain(L.theme, scroll + x, L.len);
    function resetHist() { p.hist.length = 0; for (let i = 0; i < 40; i++) p.hist.push([p.x, p.y]); }
    function load(n) { L = { ...STAGES[n % STAGES.length] }; L.T = L.tl().sort((a, b) => a[0] - b[0]); ti = 0; scroll = 0; vScroll = 0; boss = null; L.bossDone = false;
      foes.length = 0; shots.length = 0; bul.length = 0; items.length = 0; fx = []; p.x = -30; p.y = H / 2; p.dead = 0; p.inv = 2.6; resetHist();
      phase = 'intro'; phaseT = 2.6; if (!opt.demo) api.music(SONGS[L.theme]); }
    // ---------- spawning
    function wave([, k, yf, n0, drop]) { const n = n0 + (n0 > 1 ? loopN : 0), y0 = TOP + 20 + yf * (BOT - TOP - 40);
      if (k === 'z') { const id = gid++; groups[id] = { n, killed: 0 }; for (let i = 0; i < n; i++) foes.push({ k, x: W + 20 + i * 28, y: y0, y0, hp: 1, r: 9, pts: 100, gid: id }); }
      if (k === 'p') for (let i = 0; i < n; i++) foes.push({ k, x: W + 10 + i * 20, y: clamp(y0 + (rnd() - 0.5) * 70, TOP + 10, BOT - 10), vx: -(150 + rnd() * 40), hp: 1, r: 7, pts: 50, cd: 1 + rnd() * 3 });
      if (k === 'h') for (let i = 0; i < n; i++) foes.push({ k, x: W + 14 + i * 30, y: y0 + i * 24 - 12, hp: 2, r: 9, pts: 150, st: 'in', t: 0 });
      if (k === 'tf' || k === 'tc') { const t = terrain(L.theme, scroll + W + 14, L.len), ceil = k === 'tc'; if ((ceil ? t.c : t.f) < -1e3 || (ceil ? t.c : t.f) > 1e3) return;
        foes.push({ k: 't', ceil, x: W + 14, y: ceil ? t.c + 6 : t.f - 6, hp: 3, r: 10, pts: 200, cd: 1 + rnd() * 1.5, ground: true }); }
      if (k === 'b') foes.push({ k, x: W + 40, y: y0, y0, hp: 16 + 4 * loopN, r: 22, pts: 1000, st: 'in', t: 0, cd: 1.5, drop });
      if (k === 'l') for (let i = 0; i < n; i++) foes.push({ k, x: W * (0.45 + rnd() * 0.5), y: H + 10, vy: -(300 + rnd() * 80), hp: 2, r: 8, pts: 30 });
      if (k === 'm') for (let i = 0; i < n; i++) foes.push({ k, x: W + 10 + i * 46, y: TOP + 20 + rnd() * (BOT - TOP - 40), vx: -55, hp: 2, r: 8, pts: 80, t: 0 }); }
    function aimed(x, y, s = 150, spread = 0) { const a = Math.atan2(p.y - y, p.x - x) + spread; bul.push({ x, y, vx: Math.cos(a) * s * sp(), vy: Math.sin(a) * s * sp(), r: 3 }); }
    function ring(x, y, n, s) { for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; bul.push({ x, y, vx: Math.cos(a) * s * sp(), vy: Math.sin(a) * s * sp(), r: 3 }); } }
    function addScore(n, x, y) { g.score += n; if (x !== undefined) fx.push({ k: 'pts', t: 0.8, x, y, s: String(n) });
      if (g.score >= nextLife) { nextLife += 70000; lives++; api.sfx('life'); banner = ['¡VIDA EXTRA!', '']; bannerT = 1.5; } }
    function boom(x, y, r = 10) { fx.push({ k: 'boom', t: 0.5, x, y, r }); for (let i = 0; i < 6; i++) { const a = rnd() * 7; fx.push({ k: 'deb', t: 0.5 + rnd() * 0.3, x, y, vx: Math.cos(a) * 90, vy: Math.sin(a) * 90 }); } }
    // ---------- the ship
    function die() { if (p.dead || p.inv > 0 || g._god) return; p.dead = 1.8; boom(p.x, p.y, 20); api.sfx('boom'); api.stopMusic(); api.sfx('die');
      p.spd = 0; p.missile = false; p.dbl = false; p.laser = false; p.opts = 0; p.shield = 0; p.cur = -1; p.charge = 0; mod.have = false; }
    function respawn() { if (opt.demo) lives = 3; lives--; if (lives < 0) { g.over = true; lives = 0; return; }
      p.x = 70; p.y = H / 2; p.inv = 2.5; p.dead = 0; resetHist(); bul.length = 0; items.push({ k: 'c', x: W * 0.55, y: H / 2, t: 0 }, { k: 'c', x: W * 0.62, y: H / 2 - 30, t: 0 }); // a little help to start again
      if (!opt.demo) api.music(boss ? SONGS.boss : SONGS[L.theme]); }
    g.continue = () => { g.over = false; lives = 2; g.score = 0; respawn(); lives = 2; };
    function fire() { if (shots.filter((s) => s.k === 'shot' || s.k === 'laser').length > 16) return;
      const srcs = [[p.x + 14, p.y]]; for (let i = 0; i < p.opts; i++) { const h = p.hist[Math.min(p.hist.length - 1, (i + 1) * 14)]; srcs.push([h[0] + 4, h[1]]); }
      for (const [x, y] of srcs) { if (p.laser) shots.push({ k: 'laser', x: x + 10, y, vx: 560, vy: 0, dmg: 1.2, r: 4, hits: new Set() }); else shots.push({ k: 'shot', x, y, vx: 440, vy: 0, dmg: 1, r: 4 });
        if (p.dbl) shots.push({ k: 'shot', x, y, vx: 340, vy: -240, dmg: 1, r: 4 });
        if (p.missile && p.mCD <= 0) shots.push({ k: 'mis', x, y: y + 6, vx: 120, vy: 160, dmg: 2, r: 5 }); }
      if (p.missile && p.mCD <= 0) p.mCD = 0.6;
      if (mod.have) { if (mod.st === 'front') { for (const a of [-0.35, 0, 0.35]) shots.push({ k: 'red', x: mod.x + 8, y: mod.y, vx: Math.cos(a) * 420, vy: Math.sin(a) * 420, dmg: 1, r: 4 }); }
        else if (mod.st === 'back') { for (const a of [-0.25, 0.25]) shots.push({ k: 'red', x: mod.x - 8, y: mod.y, vx: -Math.cos(a) * 420, vy: Math.sin(a) * 420, dmg: 1, r: 4 }); }
        else shots.push({ k: 'red', x: mod.x + 8, y: mod.y, vx: 420, vy: 0, dmg: 1, r: 4 }); }
      api.sfx('pew'); }
    function beam(c) { const lvl = c >= 1 ? 2 : 1; shots.push({ k: 'beam', x: p.x + 20, y: p.y, vx: 600, vy: 0, dmg: lvl === 2 ? 9 : 4, r: lvl === 2 ? 13 : 8, lvl, hits: new Set() }); api.sfx('vault'); }
    function power(i) { const can = [p.spd < 4, !p.missile, !p.dbl, !p.laser, p.opts < 2, p.shield <= 0][i]; if (!can) { api.sfx('hurt'); return; }
      if (i === 0) p.spd++; if (i === 1) p.missile = true; if (i === 2) { p.dbl = true; p.laser = false; } if (i === 3) { p.laser = true; p.dbl = false; } if (i === 4) p.opts++; if (i === 5) p.shield = 6;
      p.cur = -1; api.sfx('life'); fx.push({ k: 'pts', t: 1, x: p.x, y: p.y - 14, s: POWERS[i] + '!' }); }
    function player(dt, pad) {
      if (p.dead) { p.dead -= dt; if (p.dead <= 0) respawn(); return; }
      p.inv = Math.max(0, p.inv - dt); p.mCD = Math.max(0, p.mCD - dt); const s = 150 + 34 * p.spd;
      let dx = (pad.held('vR') ? 1 : 0) - (pad.held('vL') ? 1 : 0), dy = (pad.held('vD') ? 1 : 0) - (pad.held('vU') ? 1 : 0); if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }
      p.x = clamp(p.x + dx * s * dt, 16, W - 24); p.y = clamp(p.y + dy * s * dt, TOP + 8, BOT - 8); p.tilt = dy;
      if (dx || dy) { p.hist.unshift([p.x, p.y]); p.hist.length = 40; } // the options follow your path, as in Nemesis
      // A: a shot; held and let go = the charged beam
      if (pad.hit('vS')) { fire(); p.charge = 0; }
      if (pad.held('vS')) p.charge = Math.min(1.2, p.charge + dt); else { if (p.charge >= 0.45) beam(p.charge); p.charge = 0; }
      // B: throw / call back the module · Q: take the marked power
      if (pad.hit('vT') && mod.have) { if (mod.st === 'front' || mod.st === 'back') { mod.vx = mod.st === 'front' ? 320 : -320; mod.st = 'free'; api.sfx('swing'); } else if (mod.st === 'free') mod.st = 'ret'; }
      if (pad.hit('vP') && p.cur >= 0) power(p.cur);
      // the cave walls
      for (const ox of [-8, 0, 10]) { const t = terr(p.x + ox); if (p.y - 4 < t.c || p.y + 4 > t.f) { die(); break; } }
    }
    function moduleUpd(dt) { if (!mod.have) return; mod.a += dt * 8;
      if (mod.st === 'front') { mod.x = p.x + 22; mod.y = p.y; } else if (mod.st === 'back') { mod.x = p.x - 18; mod.y = p.y; }
      else if (mod.st === 'free') { mod.x = clamp(mod.x + mod.vx * dt, 20, W - 20); mod.vx *= Math.pow(0.12, dt); mod.y = lerp(mod.y, p.y, Math.min(1, dt * 1.5)); }
      else { const dx = p.x - mod.x, dy = p.y - mod.y, d = Math.hypot(dx, dy), v = 380 * dt; if (d < 14) { mod.st = mod.x >= p.x ? 'front' : 'back'; api.sfx('pick'); } else { mod.x += (dx / d) * Math.min(v, d); mod.y += (dy / d) * Math.min(v, d); } }
      if (p.dead) return;
      for (const b of bul) if (!b.big && Math.hypot(b.x - mod.x, b.y - mod.y) < 11) b.dead = true; // it eats the small bullets
      for (const e of foes) if (!e.dead && Math.hypot(e.x - mod.x, e.y - mod.y) < e.r + 9) damage(e, 10 * dt);
      if (boss && !boss.dying) for (const q of boss.parts) if (q.weak && q.open && Math.hypot(q.x - mod.x, q.y - mod.y) < q.r + 9) bossHit(6 * dt); }
    // ---------- enemies
    function damage(e, n) { if (e.dead) return; e.hp -= n; e.fl = 0.08; if (e.hp <= 0) kill(e); }
    function kill(e) { e.dead = true; addScore(e.pts, e.x, e.y); boom(e.x, e.y, e.r); api.sfx(e.r > 15 ? 'boom' : 'hit');
      if (e.gid !== undefined) { const gr = groups[e.gid]; gr.killed++; if (gr.killed >= gr.n) { items.push({ k: 'c', x: e.x, y: e.y, t: 0 }); addScore(500, e.x, e.y - 12); } }
      if (e.k === 'b') { items.push({ k: 'c', x: e.x - 10, y: e.y - 12, t: 0 }, { k: 'c', x: e.x + 10, y: e.y + 12, t: 1 }); if (e.drop) items.push({ k: e.drop, x: e.x, y: e.y, t: 0 }); }
      if (e.k === 'h' && rnd() < 0.3) items.push({ k: 'c', x: e.x, y: e.y, t: 0 });
      if (e.k === 'm') ring(e.x, e.y, 8, 110); }
    function enemy(e, dt) { const s = sp(); e.fl = Math.max(0, (e.fl || 0) - dt); e.t = (e.t || 0) + dt;
      if (e.k === 'z') { e.x -= 130 * s * dt; e.y = e.y0 + Math.sin(e.x * 0.022) * 46; if (loopN > 0 && rnd() < dt * 0.3) aimed(e.x, e.y); }
      if (e.k === 'p') { e.x += e.vx * dt; e.cd -= dt; if (e.cd <= 0) { e.cd = 3 / s; if (e.x < W - 30 && e.x > p.x + 60 && rnd() < 0.5) aimed(e.x, e.y, 130); } }
      if (e.k === 'h') { if (e.st === 'in') { e.x -= 140 * dt; if (e.x < W - 120) { e.st = 'aim'; e.t = 0; } } else if (e.st === 'aim') { if (e.t > 0.6) { const a = Math.atan2(p.y - e.y, p.x - e.x); e.vx = Math.cos(a) * 260 * s; e.vy = Math.sin(a) * 260 * s; e.st = 'dash'; } } else { e.x += e.vx * dt; e.y += e.vy * dt; } }
      if (e.k === 't') { e.x -= vScroll * dt; e.cd -= dt; if (e.cd <= 0 && e.x < W - 20 && e.x > 20) { e.cd = 1.8 / s; aimed(e.x, e.y + (e.ceil ? 4 : -4), 140); } }
      if (e.k === 'b') { if (e.st === 'in') { e.x -= 40 * dt; if (e.x < W - 70) e.st = 'stay'; } else if (e.st === 'stay') { e.y = e.y0 + Math.sin(e.t * 0.8) * 50; if (e.t > 12) e.st = 'out'; } else e.x -= 70 * dt;
        e.cd -= dt; if (e.cd <= 0 && e.st !== 'in') { e.cd = 1.5 / s; for (const a of [-0.25, 0, 0.25]) aimed(e.x - 24, e.y, 140, a); } }
      if (e.k === 'l') { e.vy += 220 * dt; e.y += e.vy * dt; e.x -= vScroll * 0.5 * dt; if (e.vy > 0 && e.y > H + 20) e.dead = true; }
      if (e.k === 'm') { e.x += e.vx * dt; e.y += Math.sin(e.t * 2) * 10 * dt; if (Math.hypot(p.x - e.x, p.y - e.y) < 60 && e.t > 1) { e.k2 = (e.k2 || 0) + dt; if (e.k2 > 0.8) kill(e); } }
      if (e.x < -50 || e.x > W + 120 || e.y < -40 || e.y > H + 40) e.gone = true;
      if (!p.dead && Math.hypot(e.x - p.x, e.y - p.y) < e.r + 5) { if (p.shield > 0 && e.x > p.x) { p.shield--; damage(e, 3); api.sfx('hit'); } else die(); } }
    // ---------- bosses: big things made of round parts; only the weak part (when open) takes damage
    function spawnBoss() { const id = ['B1', 'B2', 'B3'][stageN % 3], hp = [60, 50, 80][stageN % 3] * (1 + 0.3 * loopN);
      boss = { k: id, x: W + 140, y: H / 2, t: 0, hp, max: hp, parts: [], cd: 1.5, cd2: 3, hist: [], fl: 0 }; banner = BOSS_NAME[id]; bannerT = 3; if (!opt.demo) api.music(SONGS.boss); }
    function bossHit(n) { const b = boss; if (!b || b.dying) return; b.hp -= n; b.fl = 0.06; if (b.hp <= 0) { b.dying = 2.6; addScore(10000, b.x, b.y - 30); bul.length = 0; api.sfx('boom'); for (const e of foes) if (!e.dead) kill(e); } }
    function bossUpd(dt) { const b = boss, s = sp(); b.t += dt; b.fl = Math.max(0, b.fl - dt);
      if (b.dying) { b.dying -= dt; if (rnd() < dt * 14) { boom(b.x + (rnd() - 0.5) * 120, b.y + (rnd() - 0.5) * 90, 16); api.sfx('boom'); } b.x += 20 * dt; b.y += 30 * dt;
        if (b.dying <= 0) { boom(b.x, b.y, 50); boss = null; L.bossDone = true; phase = 'clear'; phaseT = 5; api.stopMusic(); api.sfx('clear'); } return; }
      b.cd -= dt; b.cd2 -= dt; const P2 = [];
      if (b.k === 'B1') { // the mother ship: a saucer; the core at the front opens 2 s out of every 4
        b.x = lerp(b.x, W - 110, Math.min(1, dt * 0.8)); b.y = H / 2 + Math.sin(b.t * 0.7) * 80; b.open = b.t % 4 > 2.2;
        P2.push({ x: b.x - 30, y: b.y, r: 22 }, { x: b.x, y: b.y, r: 24 }, { x: b.x + 32, y: b.y, r: 22 }, { x: b.x, y: b.y - 24, r: 16 }, { x: b.x - 58, y: b.y + 2, r: 11, weak: true, open: b.open });
        if (b.cd <= 0) { b.cd = 1.3 / s; for (const a of [-0.2, 0, 0.2]) aimed(b.x - 58, b.y + 2, 160, a); }
        if (b.cd2 <= 0) { b.cd2 = 4; ring(b.x, b.y, 12, 110); if (b.hp < b.max / 2) for (let i = 0; i < 3; i++) foes.push({ k: 'p', x: b.x, y: b.y + (i - 1) * 30, vx: -170, hp: 1, r: 7, pts: 50, cd: 9 }); } }
      if (b.k === 'B2') { // the lava serpent: the head is the weak part; the body blocks the shots
        const ent = Math.min(1, b.t / 2.5); const hx = lerp(W + 80, W * 0.62 + Math.cos(b.t * 0.8) * 120, ent), hy = H / 2 + Math.sin(b.t * 1.5) * (BOT - TOP) * 0.36;
        b.x = hx; b.y = hy; b.hist.unshift([hx, hy]); if (b.hist.length > 90) b.hist.length = 90;
        for (let i = 12; i >= 1; i--) { const h = b.hist[Math.min(b.hist.length - 1, i * 7)]; P2.push({ x: h[0], y: h[1], r: 13 - i * 0.4, seg: i }); } P2.push({ x: hx, y: hy, r: 15, weak: true, open: true, head: true });
        if (b.cd <= 0) { b.cd = 2.2 / s; for (const a of [-0.4, -0.2, 0, 0.2, 0.4]) aimed(hx - 10, hy, 150, a); }
        if (b.hp < b.max / 2 && b.cd2 <= 0) { b.cd2 = 0.7; const h = P2[(rnd() * 12) | 0]; aimed(h.x, h.y, 120); } }
      if (b.k === 'B3') { // the queen of the hive: the eye opens 3 s out of 5; drones from her pods; the eye laser
        b.x = lerp(b.x, W - 80, Math.min(1, dt * 0.6)); b.y = H / 2 + Math.sin(b.t * 0.5) * 50; b.open = b.t % 5 < 3;
        P2.push({ x: b.x + 20, y: b.y - 62, r: 38 }, { x: b.x + 20, y: b.y + 62, r: 38 }, { x: b.x + 30, y: b.y, r: 42 }, { x: b.x - 28, y: b.y, r: 15, weak: true, open: b.open });
        if (b.cd <= 0) { b.cd = 2 / s; if (b.open) for (let i = -3; i <= 3; i++) aimed(b.x - 28, b.y, 130, i * 0.15); else for (const yy of [-62, 62]) foes.push({ k: 'p', x: b.x - 10, y: b.y + yy, vx: -160, hp: 1, r: 7, pts: 50, cd: 1 }); }
        if (b.cd2 <= 0 && !b.las) { b.cd2 = 7 / s; b.las = { t: 1.4, y: p.y }; }
        if (b.las) { b.las.t -= dt; if (b.las.t < 0.6 && b.las.t > 0 && !p.dead && p.x < b.x && Math.abs(p.y - b.las.y) < 10) die(); if (b.las.t <= 0) b.las = null; } }
      b.parts = P2; if (!p.dead) for (const q of P2) if (Math.hypot(q.x - p.x, q.y - p.y) < q.r + 4) { die(); break; } }
    // ---------- shots, bullets, items
    function updShots(dt) {
      for (const s of shots) { s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.k === 'mis') { const t = terr(s.x); const fl = Math.min(t.f, BOT); if (s.y > fl - 4) { s.y = fl - 4; s.vy = 0; s.vx = 220; } } // the missiles run along the ground
        if (s.x > W + 30 || s.x < -30 || s.y < 0 || s.y > H) { s.dead = true; continue; }
        if (s.k !== 'mis') { const t = terr(s.x); if (s.y < t.c || s.y > t.f) { if (!(s.k === 'beam' && s.lvl === 2)) s.dead = true; fx.push({ k: 'spark', t: 0.2, x: s.x, y: s.y }); continue; } }
        for (const e of foes) { if (e.dead || (s.hits && s.hits.has(e))) continue; if (Math.hypot(e.x - s.x, e.y - s.y) < e.r + s.r) { if (s.hits) s.hits.add(e); damage(e, s.dmg); if (!e.dead && !(s.k === 'beam' && s.lvl === 2)) { s.dead = true; break; } if (!s.hits) { s.dead = true; break; } } }
        if (s.dead || !boss || boss.dying) continue;
        for (const q of boss.parts) if (Math.hypot(q.x - s.x, q.y - s.y) < q.r + s.r) { if (q.weak && q.open) { if (s.hits && s.hits.has(boss)) break; if (s.hits) s.hits.add(boss); bossHit(s.dmg); fx.push({ k: 'spark', t: 0.2, x: s.x, y: s.y }); if (!(s.k === 'beam')) s.dead = true; }
          else { s.dead = true; fx.push({ k: 'tink', t: 0.15, x: s.x, y: s.y }); } break; } }
      for (let i = shots.length - 1; i >= 0; i--) if (shots[i].dead) shots.splice(i, 1);
      for (const b of bul) { b.x += b.vx * dt; b.y += b.vy * dt; if (b.x < -10 || b.x > W + 10 || b.y < 0 || b.y > H) b.dead = true;
        if (!p.dead && !b.dead && Math.hypot(b.x - p.x, b.y - p.y) < b.r + 3) { if (p.shield > 0 && b.x > p.x) { p.shield--; b.dead = true; api.sfx('hit'); } else { die(); b.dead = true; } } }
      for (let i = bul.length - 1; i >= 0; i--) if (bul[i].dead) bul.splice(i, 1);
      for (const it of items) { it.t += dt; it.x -= 40 * dt; if (it.x < -20) it.dead = true;
        if (!p.dead && Math.hypot(it.x - p.x, it.y - p.y) < 16) { it.dead = true;
          if (it.k === 'c') { p.cur = (p.cur + 1) % 6; addScore(100); api.sfx('pick'); }
          if (it.k === 'F') { if (mod.have) addScore(1000, it.x, it.y); else { mod.have = true; mod.st = 'front'; mod.x = p.x + 22; mod.y = p.y; banner = ['¡EL MÓDULO!', 'B LO LANZA · B LO RECOGE']; bannerT = 2.5; } api.sfx('life'); } } }
      for (let i = items.length - 1; i >= 0; i--) if (items[i].dead) items.splice(i, 1); }
    // ---------- demo pilot (attract mode): keeps in line with the target, dodges what comes, taps A
    function demoPilot(dt) { const k = g.demoKeys; k.hit = {}; k.held = {}; const t = terr(p.x + 30); let ty = H / 2, best = null, bd = 1e9;
      for (const e of foes) if (!e.dead && e.x > p.x + 20 && e.x < W) { const d = e.x - p.x; if (d < bd) { bd = d; best = e; } }
      if (boss && !boss.dying) { const wp = boss.parts.find((q) => q.weak); if (wp) ty = wp.y; } else if (best) ty = best.y;
      for (const it of items) if (it.x > p.x - 10) { ty = it.y; break; }
      for (const b of bul) { const dx = b.x - p.x, dy = b.y - p.y; if (dx > -10 && dx < 80 && Math.abs(dy) < 20) { ty = p.y + (dy > 0 ? -50 : 50); break; } }
      for (const e of foes) if (!e.dead && e.k !== 't' && Math.abs(e.x - p.x) < 60 && Math.abs(e.y - p.y) < 30) ty = p.y + (e.y > p.y ? -50 : 50);
      if (boss && boss.las) ty = boss.las.y + (p.y > boss.las.y ? 50 : -50);
      ty = clamp(ty, Math.max(TOP + 12, t.c + 24), Math.min(BOT - 12, t.f - 24));
      if (ty < p.y - 4) k.held.vU = true; else if (ty > p.y + 4) k.held.vD = true;
      const tx = boss ? 80 : 110; if (p.x < tx - 8) k.held.vR = true; else if (p.x > tx + 8) k.held.vL = true;
      g.fireT = (g.fireT || 0) - dt; if (g.fireT <= 0) { g.fireT = 0.13; k.hit.vS = true; k.held.vS = true; }
      if ((p.cur === 0 && p.spd < 2) || (p.cur === 1 && !p.missile) || (p.cur === 2 && !p.dbl && !p.laser) || (p.cur === 4 && p.opts < 2)) k.hit.vP = true; }
    // ---------- step
    g.update = (dt, pad) => { time += dt; if (bannerT > 0) bannerT -= dt;
      if (opt.demo) { demoPilot(dt); pad = { held: (v) => !!g.demoKeys.held[v], hit: (v) => !!g.demoKeys.hit[v] }; }
      for (const f of fx) { f.t -= dt; if (f.k === 'pts') f.y -= 20 * dt; if (f.k === 'deb') { f.x += f.vx * dt; f.y += f.vy * dt; } } fx = fx.filter((f) => f.t > 0);
      bgX += Math.max(vScroll, 30) * dt;
      if (phase === 'intro') { phaseT -= dt; p.x = lerp(p.x, 70, Math.min(1, dt * 2.5)); resetHist(); if (phaseT <= 0 || (!opt.demo && pad.hit('vS') && phaseT < 2)) { phase = 'play'; p.x = Math.max(p.x, 40); } return; }
      if (phase === 'clear') { phaseT -= dt; if (phaseT < 3 && !g.tally) { g.tally = true; addScore(5000 * (stageN % 3 + 1)); }
        if (phaseT <= 0) { g.tally = false; stageN++; if (stageN % STAGES.length === 0) { loopN++; banner = ['¡SEGUNDA VUELTA!', 'MÁS RÁPIDOS Y MÁS']; bannerT = 2.5; } load(stageN); } return; }
      const target = scroll >= L.len ? 0 : 60 * (1 + 0.1 * loopN); vScroll = lerp(vScroll, target, Math.min(1, dt * 2)); scroll += vScroll * dt;
      while (ti < L.T.length && L.T[ti][0] <= scroll) wave(L.T[ti++]);
      if (scroll >= L.len && !boss && !L.bossDone) { L.bossT = (L.bossT || 0) + dt; if (L.bossT > 1.5) spawnBoss(); }
      player(dt, pad); moduleUpd(dt);
      for (const e of foes) if (!e.dead) enemy(e, dt); for (let i = foes.length - 1; i >= 0; i--) if (foes[i].dead || foes[i].gone) foes.splice(i, 1);
      if (boss) bossUpd(dt); updShots(dt); };
    // ---------- drawing
    const flick = () => Math.floor(time * 20) % 2 === 0;
    g.draw = (c) => { const bg = background(L.theme);
      [0.08, 0.3, 0.7].forEach((k, i) => { const off = -Math.round((bgX * k) % 960); c.drawImage(bg[i], off, 0); c.drawImage(bg[i], off + 960, 0); });
      drawTerrain(c);
      for (const it of items) { const bob = Math.round(Math.sin(it.t * 5) * 2);
        if (it.k === 'c') { A.draw(c, S('caps', CAPS), it.x - 5, it.y - 3 + bob); }
        if (it.k === 'F') { c.fillStyle = flick() ? '#ff8a3a' : '#ffd400'; c.beginPath(); c.arc(it.x, it.y + bob, 9, 0, 7); c.fill(); A.txt(c, 'F', it.x, it.y - 4 + bob, '#000', 8, 'center', false); } }
      for (const e of foes) drawFoe(c, e);
      if (boss) drawBoss(c, boss);
      for (const s of shots) { if (s.k === 'shot') { c.fillStyle = '#fff3a0'; c.fillRect(s.x - 5, s.y - 1, 10, 3); }
        else if (s.k === 'red') { c.fillStyle = '#ff6a3a'; c.fillRect(s.x - 4, s.y - 1, 8, 3); }
        else if (s.k === 'laser') { c.fillStyle = '#38e0e0'; c.fillRect(s.x - 26, s.y - 1, 30, 2); c.fillStyle = '#fff'; c.fillRect(s.x - 10, s.y, 12, 1); }
        else if (s.k === 'mis') { c.fillStyle = '#cfd3d9'; c.fillRect(s.x - 4, s.y - 2, 8, 4); c.fillStyle = '#ff8a3a'; c.fillRect(s.x - 7, s.y - 1, 3, 2); }
        else if (s.k === 'beam') { const r = s.r; c.fillStyle = flick() ? '#9fd7ff' : '#38e0e0'; c.beginPath(); c.ellipse(s.x, s.y, r * 2.2, r, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(s.x + 4, s.y, r * 1.2, r * 0.45, 0, 0, 7); c.fill(); } }
      for (const b of bul) { c.fillStyle = flick() ? '#ff5a5a' : '#ffd400'; c.beginPath(); c.arc(b.x, b.y, b.r, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillRect(b.x - 1, b.y - 1, 2, 2); }
      drawShip(c);
      for (const f of fx) { if (f.k === 'pts') A.txt(c, f.s, f.x, f.y, '#fff', 6, 'center');
        else if (f.k === 'boom') { const k = 1 - f.t / 0.5; c.fillStyle = `rgba(255,${200 - k * 150 | 0},60,${1 - k})`; c.beginPath(); c.arc(f.x, f.y, f.r * (0.6 + k * 1.4), 0, 7); c.fill(); c.strokeStyle = `rgba(255,255,255,${1 - k})`; c.lineWidth = 2; c.beginPath(); c.arc(f.x, f.y, f.r * (1 + k * 2), 0, 7); c.stroke(); }
        else if (f.k === 'deb') { c.fillStyle = '#ffb347'; c.fillRect(f.x - 1, f.y - 1, 3, 3); }
        else if (f.k === 'spark' || f.k === 'tink') { c.fillStyle = f.k === 'tink' ? '#cfd3d9' : '#fff6a0'; for (let i = 0; i < 4; i++) c.fillRect(f.x + Math.cos(i * 1.6) * 5, f.y + Math.sin(i * 1.6) * 5, 2, 2); } }
      hud(c);
      if (phase === 'intro') { c.fillStyle = 'rgba(0,0,0,0.7)'; c.fillRect(0, H / 2 - 40, W, 80); A.txt(c, (loopN ? 'VUELTA ' + (loopN + 1) + ' · ' : '') + 'FASE ' + (stageN % STAGES.length + 1), W / 2, H / 2 - 32, '#9fd7ff', 8, 'center'); A.txt(c, L.name, W / 2, H / 2 - 14, '#ffd400', 14, 'center'); A.txt(c, L.sub, W / 2, H / 2 + 16, '#fff', 8, 'center'); }
      if (phase === 'clear') { c.fillStyle = 'rgba(0,0,0,0.65)'; c.fillRect(0, H / 2 - 50, W, 100); A.txt(c, stageN % 3 === 2 ? '¡LA COLMENA HA CAÍDO!' : '¡FASE SUPERADA!', W / 2, H / 2 - 38, '#ffd400', 12, 'center');
        if (phaseT < 3) A.txt(c, 'BONUS  ' + 5000 * (stageN % 3 + 1), W / 2, H / 2 - 4, '#fff', 8, 'center'); }
      if (bannerT > 0 && banner) { c.fillStyle = 'rgba(0,0,0,0.6)'; c.fillRect(0, TOP + 12, W, 34); A.txt(c, banner[0], W / 2, TOP + 18, '#ffd400', 8, 'center'); A.txt(c, banner[1], W / 2, TOP + 32, '#fff', 6, 'center'); } };
    function drawTerrain(c) { if (L.theme === 'cielo') return; const vol = L.theme === 'volcan';
      const top = [], bot = []; for (let x = 0; x <= W + 4; x += 4) { const t = terr(x); top.push([x, t.c]); bot.push([x, t.f]); }
      const fillPoly = (pts, edge, col, col2) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, edge); for (const [x, y] of pts) c.lineTo(x, clamp(y, -5, H + 5)); c.lineTo(W + 4, edge); c.closePath(); c.fill();
        c.strokeStyle = col2; c.lineWidth = 2; c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, clamp(y, -5, H + 5)) : c.moveTo(x, clamp(y, -5, H + 5)))); c.stroke(); };
      if (vol) { fillPoly(top, -5, '#3a1408', '#ff7a2a'); fillPoly(bot, H + 5, '#3a1408', '#ffb02a'); c.fillStyle = 'rgba(255,90,20,0.35)'; for (const [x, y] of bot) if (y < H) c.fillRect(x, y + 6 + Math.sin(time * 3 + x) * 2, 4, 3); }
      else { fillPoly(top, -5, '#2c3550', '#8aa0d0'); fillPoly(bot, H + 5, '#2c3550', '#8aa0d0'); c.fillStyle = '#ff5a8a'; for (const [x, y] of bot) if (y < H && Math.floor((scroll + x) / 4) % 12 === 0) c.fillRect(x, y + 8, 3, 3); } }
    function drawShip(c) { if (p.dead) return; if (p.inv > 0 && flick() && phase === 'play') return;
      for (let i = p.opts - 1; i >= 0; i--) { const h = p.hist[Math.min(p.hist.length - 1, (i + 1) * 14)]; c.fillStyle = flick() ? '#ff8a3a' : '#ffb347'; c.beginPath(); c.arc(h[0], h[1], 5, 0, 7); c.fill(); c.fillStyle = '#fff3a0'; c.fillRect(h[0] - 1, h[1] - 1, 2, 2); }
      A.draw(c, S('ship', SHIP), p.x - 12, p.y - 5 + (p.tilt ? Math.sign(p.tilt) : 0));
      if (flick()) { c.fillStyle = '#ffd400'; c.fillRect(p.x - 15, p.y - 1, 3, 2); }
      if (p.shield > 0) { c.strokeStyle = `rgba(80,200,255,${0.4 + p.shield * 0.08})`; c.lineWidth = 2; c.beginPath(); c.arc(p.x + 4, p.y, 16, -1.1, 1.1); c.stroke(); }
      if (p.charge > 0.2) { const k = Math.min(1, p.charge); c.fillStyle = flick() ? '#9fd7ff' : '#fff'; c.beginPath(); c.arc(p.x + 16, p.y, 2 + k * 5, 0, 7); c.fill(); }
      if (mod.have) { c.fillStyle = '#ff8a3a'; c.beginPath(); c.arc(mod.x, mod.y, 8, 0, 7); c.fill(); c.fillStyle = '#ffd400'; c.beginPath(); c.arc(mod.x, mod.y, 4, 0, 7); c.fill();
        c.strokeStyle = '#fff3a0'; c.lineWidth = 1; c.beginPath(); c.ellipse(mod.x, mod.y, 11, 4, mod.a, 0, 7); c.stroke(); } }
    function drawFoe(c, e) { if (e.dead) return; if (e.fl > 0 && flick()) c.globalAlpha = 0.5;
      if (e.k === 'z') A.draw(c, S('fighter', FIGHTER), e.x - 7, e.y - 3);
      if (e.k === 'p') A.draw(c, S('pop', POP), e.x - 4, e.y - 3);
      if (e.k === 'h') A.draw(c, S('homer', HOMER), e.x - 6, e.y - 2, e.st === 'dash' && e.vx > 0);
      if (e.k === 't') { const a = Math.atan2(p.y - e.y, p.x - e.x); c.strokeStyle = '#cfd3d9'; c.lineWidth = 3; c.beginPath(); c.moveTo(e.x, e.y); c.lineTo(e.x + Math.cos(a) * 12, e.y + Math.sin(a) * 12); c.stroke();
        c.save(); c.translate(e.x, e.y); if (e.ceil) c.scale(1, -1); A.draw(c, S('turret', TURRET), -6, -2); c.restore(); }
      if (e.k === 'b') A.draw(c, S('carrier', CARRIER), e.x - 16, e.y - 6);
      if (e.k === 'l') { c.fillStyle = '#ff7a1a'; c.beginPath(); c.arc(e.x, e.y, 8, 0, 7); c.fill(); c.fillStyle = '#ffe07a'; c.beginPath(); c.arc(e.x - 2, e.y - 2, 3, 0, 7); c.fill(); }
      if (e.k === 'm') A.draw(c, S('mine', MINE), e.x - 4, e.y - 4);
      c.globalAlpha = 1; }
    function drawBoss(c, b) { if (b.fl > 0 && flick()) c.globalAlpha = 0.7;
      if (b.k === 'B1') { c.fillStyle = '#5a6478'; c.beginPath(); c.ellipse(b.x, b.y, 70, 20, 0, 0, 7); c.fill(); c.fillStyle = '#8a96ae'; c.beginPath(); c.ellipse(b.x, b.y - 4, 66, 12, 0, 0, 7); c.fill();
        c.fillStyle = 'rgba(160,220,255,0.7)'; c.beginPath(); c.ellipse(b.x, b.y - 20, 22, 16, 0, Math.PI, 0); c.fill(); c.fillStyle = '#3fa04a'; c.beginPath(); c.arc(b.x, b.y - 24, 6, 0, 7); c.fill(); // the pilot, a little green one
        for (let i = 0; i < 9; i++) { c.fillStyle = (Math.floor(b.t * 6) + i) % 3 === 0 ? '#ffd400' : '#ff5a8a'; c.fillRect(b.x - 56 + i * 14, b.y + 6, 4, 3); }
        c.fillStyle = b.open ? (flick() ? '#ff3a3a' : '#ffd400') : '#3c4660'; c.beginPath(); c.arc(b.x - 58, b.y + 2, 11, 0, 7); c.fill(); if (!b.open) { c.fillStyle = '#7d8aa3'; c.fillRect(b.x - 69, b.y, 22, 4); } }
      if (b.k === 'B2') { for (const q of b.parts) { if (q.head) continue; c.fillStyle = '#7a1e0a'; c.beginPath(); c.arc(q.x, q.y, q.r, 0, 7); c.fill(); c.fillStyle = '#ff7a1a'; c.beginPath(); c.arc(q.x - 2, q.y - 2, q.r * 0.55, 0, 7); c.fill(); }
        c.fillStyle = '#9a2a10'; c.beginPath(); c.arc(b.x, b.y, 16, 0, 7); c.fill(); c.fillStyle = '#ffd400'; c.fillRect(b.x - 8, b.y - 7, 5, 4); c.fillStyle = '#2a0c06'; c.beginPath(); c.moveTo(b.x - 16, b.y + 2); c.lineTo(b.x - 4, b.y + 6 + Math.sin(b.t * 8) * 3); c.lineTo(b.x - 16, b.y + 10); c.fill(); }
      if (b.k === 'B3') { for (const q of b.parts) { if (q.weak) continue; c.fillStyle = '#4a2a6a'; c.beginPath(); c.arc(q.x, q.y, q.r, 0, 7); c.fill(); c.fillStyle = '#8a3fc0'; c.beginPath(); c.arc(q.x - 6, q.y - 6, q.r * 0.6, 0, 7); c.fill(); }
        c.fillStyle = b.open ? '#fff' : '#4a2a6a'; c.beginPath(); c.arc(b.x - 28, b.y, 15, 0, 7); c.fill(); if (b.open) { c.fillStyle = flick() ? '#ff3a3a' : '#d01a1a'; c.beginPath(); c.arc(b.x - 32, b.y, 7, 0, 7); c.fill(); }
        if (b.las) { if (b.las.t > 0.6) { c.strokeStyle = flick() ? 'rgba(255,60,60,0.8)' : 'rgba(255,60,60,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(0, b.las.y); c.lineTo(b.x - 40, b.las.y); c.stroke(); }
          else { c.fillStyle = flick() ? '#ff6a6a' : '#fff'; c.fillRect(0, b.las.y - 8, b.x - 40, 16); } } }
      c.globalAlpha = 1; }
    function hud(c) { c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, W, TOP); c.fillRect(0, BOT, W, H - BOT);
      A.txt(c, '1UP', 8, 3, '#ff6b6b', 8); A.txt(c, String(g.score).padStart(7, '0'), 40, 3, '#fff', 8); const hi = api.hi(); A.txt(c, 'HI ' + String(Math.max(hi, g.score)).padStart(7, '0'), W / 2 + 20, 3, '#ffd400', 8, 'center');
      for (let i = 0; i < Math.min(lives, 6); i++) A.draw(c, S('ship', SHIP), W - 30 - i * 26, 6);
      for (let i = 0; i < 6; i++) { const x = 6 + i * 52, y = BOT + 6, maxed = ![p.spd < 4, !p.missile, !p.dbl, !p.laser, p.opts < 2, p.shield <= 0][i];
        c.fillStyle = i === p.cur ? (flick() ? '#ffd400' : '#ff8a3a') : '#1d2440'; c.fillRect(x, y, 48, 14); c.strokeStyle = '#7d8aa3'; c.lineWidth = 1; c.strokeRect(x + 0.5, y + 0.5, 47, 13);
        A.txt(c, POWERS[i], x + 24, y + 4, i === p.cur ? '#000' : maxed ? '#55607a' : '#fff', 6, 'center', false); }
      A.txt(c, 'BEAM', 330, BOT + 9, '#9fd7ff', 6); c.fillStyle = '#1d2440'; c.fillRect(360, BOT + 8, 80, 8); c.fillStyle = p.charge >= 1 ? (flick() ? '#fff' : '#38e0e0') : '#2f7fe0'; c.fillRect(360, BOT + 8, 80 * Math.min(1, p.charge), 8);
      if (mod.have) { c.fillStyle = '#ff8a3a'; c.beginPath(); c.arc(458, BOT + 12, 6, 0, 7); c.fill(); A.txt(c, mod.st === 'front' ? '▶' : mod.st === 'back' ? '◀' : '•', 470, BOT + 8, '#fff', 6); }
      if (boss && !boss.dying && boss.t > 1.5) { c.fillStyle = '#000'; c.fillRect(100, TOP + 2, W - 200, 6); c.fillStyle = '#e53935'; c.fillRect(101, TOP + 3, (W - 202) * Math.max(0, boss.hp) / boss.max, 4); } }
    load(0); if (opt.demo) { phase = 'play'; p.x = 70; resetHist(); }
    Object.assign(g, { _p: p, _foes: foes, _boss: () => boss, _L: () => L, _phase: () => phase, _scroll: () => scroll, _mod: mod, _bul: bul, _shots: shots, _items: items,
      _load: (n) => { stageN = n; load(n); phase = 'play'; p.x = 70; resetHist(); }, _skip: (x) => { scroll = x; while (ti < L.T.length && L.T[ti][0] <= scroll) ti++; }, _lives: (v) => (v === undefined ? lives : (lives = v)), _stage: () => stageN }); // tests
    return g;
  }
  // ---------- title screen (attract) and the backdrop of the hi-score table
  function drawTitle(c, t) { const bg = background('nubes'); const o = -((t * 20) % 960); c.drawImage(bg[0], 0, 0); c.drawImage(bg[2], o, 0); c.drawImage(bg[2], o + 960, 0);
    c.fillStyle = 'rgba(0,0,0,0.3)'; c.fillRect(0, 0, W, H);
    c.font = '34px "Press Start 2P", monospace'; c.textAlign = 'center'; c.textBaseline = 'top';
    for (const [s, y] of [['GUERRA', 40], ['DE NAVES', 84]]) { c.fillStyle = '#0b0f1a'; c.fillText(s, W / 2 + 4, y + 4); const gr = c.createLinearGradient(0, y, 0, y + 34); gr.addColorStop(0, '#fff'); gr.addColorStop(0.45, '#9fd7ff'); gr.addColorStop(0.55, '#2f7fe0'); gr.addColorStop(1, '#ffd400'); c.fillStyle = gr; c.fillText(s, W / 2, y); }
    const s = A.hires(A.sprite('nv_ship', SHIP, P)); const sx = ((t * 120) % (W + 200)) - 100; c.drawImage(s.h2, sx, 150, 96, 44); c.fillStyle = Math.floor(t * 20) % 2 ? '#ffd400' : '#ff8a3a'; c.fillRect(sx - 14, 169, 12, 6);
    A.txt(c, 'LA LAGUNA, 1987', W / 2, 216, '#fff', 8, 'center'); A.txt(c, 'LOS INVASORES LLEGAN CON LA BRUMA', W / 2, 230, '#fff', 8, 'center'); A.txt(c, 'SOLO EL AGUERE-1 PUEDE PARARLOS', W / 2, 244, '#9fd7ff', 8, 'center');
    A.txt(c, '© 1987 LAGUNASOFT', W / 2, 270, '#9fd7ff', 6, 'center'); }
  function drawBack(c, t) { const bg = background('nubes'); c.drawImage(bg[0], 0, 0); const o = -((t * 10) % 960); c.drawImage(bg[1], o, 0); c.drawImage(bg[1], o + 960, 0); c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(0, 0, W, H); }
  return { title: 'GUERRA DE NAVES', sub: 'AGUERE-1 CONTRA LA INVASIÓN', marquee: ['#10306a', '#04081a'], titleCol: '#9fd7ff', baseScore: 80000, music: { title: SONGS.title }, create, drawTitle, drawBack,
    help: (K) => `A DISPARO (MANTÉN = BEAM): ${K('f_punch')}  B MÓDULO: ${K('f_kick')}  MEJORA/MONEDA: ${K('b_pass')}  ESC SALIR` };
})();
