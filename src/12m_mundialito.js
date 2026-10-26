// ============ «PACHANGA 3x3» y «PLAY FURBITO» (v0.85, Jonay): los cartuchos de deportes de la GOFIO-8 ============
// Basados en lo que ya tenemos (el basket 3 contra 3 y el fútbol de las canchas), pero en modo campeonato: al empezar
// eliges una selección entre 8 países y juegas el mundialito por eliminatorias (cuartos, semifinal y final), cada vez
// contra uno mejor. Los otros cruces se juegan solos. Las equipaciones de los dos equipos de cada partido no pueden
// parecerse: si se parecen, el rival sale con la segunda. Estos juegos tienen final: si ganas el mundialito, pones tus
// iniciales en la tabla de campeones de la consola (y cuenta para el torneo de videojuegos).
// v0.86 (Jonay: «las selecciones deben estar integradas en el minijuego, sin salir al mundo 3D»): todo pasa en la
// pantalla de la GOFIO-8 (elegir país, el cuadro, los resultados, los campeones y las iniciales). Los partidos se juegan
// en el basket / fútbol 2D con la consola esperando detrás, y al acabar se vuelve a ella.
const MUNDIALITO = (() => {
  const TEAMS = [
    { id: 'esp', code: 'ESP', name: 'ESPAÑA', home: { shirt: '#c8102e', shorts: '#1d2a6b', socks: '#c8102e', stripe: '#ffc400' }, away: { shirt: '#f2f2f2', shorts: '#f2f2f2', socks: '#f2f2f2', stripe: '#c8102e' }, names: ['PACO', 'JUANMA', 'DANI', 'RAÚL', 'NACHO'], lv: 0.6 },
    { id: 'bra', code: 'BRA', name: 'BRASIL', home: { shirt: '#ffdf00', shorts: '#1f4fb5', socks: '#f2f2f2', stripe: '#1e9a3a' }, away: { shirt: '#1f4fb5', shorts: '#f2f2f2', socks: '#1f4fb5', stripe: '#ffdf00' }, names: ['JUNINHO', 'ZÉ', 'DIDIZINHO', 'CAFUZÃO', 'PELEZITO'], lv: 0.7 },
    { id: 'arg', code: 'ARG', name: 'ARGENTINA', home: { shirt: '#75aadb', shorts: '#111111', socks: '#f2f2f2', stripe: '#f2f2f2' }, away: { shirt: '#1d2a6b', shorts: '#1d2a6b', socks: '#1d2a6b', stripe: '#75aadb' }, names: ['EL PIBE', 'CHE', 'TITO', 'EL TANO', 'MARADONITA'], lv: 0.68 },
    { id: 'ita', code: 'ITA', name: 'ITALIA', home: { shirt: '#1f5fbf', shorts: '#f2f2f2', socks: '#1f5fbf' }, away: { shirt: '#f2f2f2', shorts: '#1f5fbf', socks: '#f2f2f2', stripe: '#1f9a3a' }, names: ['GIGI', 'TOTÓ', 'PIPPO', 'FABIO', 'CANNAVARO II'], lv: 0.62 },
    { id: 'ale', code: 'ALE', name: 'ALEMANIA', home: { shirt: '#f2f2f2', shorts: '#111111', socks: '#f2f2f2', stripe: '#111111' }, away: { shirt: '#2a2a2a', shorts: '#2a2a2a', socks: '#2a2a2a', stripe: '#d4202a' }, names: ['HANS', 'KLAUS', 'FRITZ', 'DER BOMBER', 'JÜRGEN'], lv: 0.64 },
    { id: 'fra', code: 'FRA', name: 'FRANCIA', home: { shirt: '#1d2a6b', shorts: '#f2f2f2', socks: '#c8102e' }, away: { shirt: '#f2f2f2', shorts: '#1d2a6b', socks: '#f2f2f2', stripe: '#c8102e' }, names: ['ZIZOU', 'TITÍ', 'PIERRE', 'JEAN-LUC', 'MICHELÍN'], lv: 0.63 },
    { id: 'por', code: 'POR', name: 'PORTUGAL', home: { shirt: '#a6192e', shorts: '#1e7a3a', socks: '#a6192e', stripe: '#ffd400' }, away: { shirt: '#f2f2f2', shorts: '#f2f2f2', socks: '#f2f2f2', stripe: '#a6192e' }, names: ['ZEZINHO', 'NANI II', 'BETO', 'EUSEBINHO', 'O BICHO'], lv: 0.58 },
    { id: 'uru', code: 'URU', name: 'URUGUAY', home: { shirt: '#5fb3e6', shorts: '#111111', socks: '#111111' }, away: { shirt: '#f2f2f2', shorts: '#5fb3e6', socks: '#f2f2f2', stripe: '#5fb3e6' }, names: ['EL MATADOR', 'CHARRÚA', 'PELADO', 'TATO', 'EL FLACO'], lv: 0.6 }];
  const ROUNDS = ['CUARTOS DE FINAL', 'SEMIFINAL', 'LA FINAL'];
  const SPORT = { pachanga: { title: 'PACHANGA 3x3', n: 3, game: 'basket', col: '#ff8a3a' }, furbito: { title: 'PLAY FURBITO', n: 5, game: 'futbol', col: '#7fe08a' } };
  const rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const near = (a, b) => { const p = rgb(a), q = rgb(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 140; };
  // the rival's kit: its first one, unless it looks like ours: then the second (and if that one too, all black)
  function kits(me, op) { const a = me.home; let b = op.home; if (near(a.shirt, b.shirt)) b = op.away; if (near(a.shirt, b.shirt)) b = { shirt: '#111111', shorts: '#111111', socks: '#111111', stripe: '#ffd400' }; return [a, b]; }
  const SK = ['#e0ac86', '#8d5a3b', '#c68a5e', '#f1c9a5', '#6b4226'], HR = ['#1a1410', '#6b3e1e', '#d8b56a', '#2a1a10', '#111111'];
  const num = (h) => parseInt(h.slice(1), 16);
  function squad(t, kit, n, mine) { const L = []; for (let i = 0; i < n; i++) { const k = (t.id.charCodeAt(0) + i * 3) % 5;
      L.push({ name: mine && i === 0 ? 'TÚ' : t.names[i % t.names.length], look: { skin: num(SK[k]), hair: num(HR[(k + i) % 5]), shirt: num(kit.shirt), pants: num(kit.shorts), shoes: 0x222222, sole: num(kit.socks || kit.shirt) }, nose: mine && i === 0 }); }
    return L; }
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // ---------- the flags (drawn: the pixel font has no emoji)
  function flag(g, id, x, y, w, h) {
    const R = (c, a, b, cw, ch) => { g.fillStyle = c; g.fillRect(x + a, y + b, cw, ch); };
    const V3 = (a, b, c) => { R(a, 0, 0, w / 3, h); R(b, w / 3, 0, w / 3 + 0.5, h); R(c, (2 * w) / 3, 0, w / 3, h); };
    const H3 = (a, b, c, k = 1 / 3) => { R(a, 0, 0, w, h * k); R(b, 0, h * k, w, h * (1 - 2 * k) + 0.5); R(c, 0, h * (1 - k), w, h * k); };
    const sun = (cx, cy, r) => { g.fillStyle = '#f2b21b'; g.beginPath(); g.arc(x + cx, y + cy, r, 0, 7); g.fill(); };
    if (id === 'esp') H3('#c8102e', '#ffc400', '#c8102e', 0.25);
    else if (id === 'bra') { R('#1e9a3a', 0, 0, w, h); g.fillStyle = '#ffdf00'; g.beginPath(); g.moveTo(x + w / 2, y + h * 0.1); g.lineTo(x + w * 0.92, y + h / 2); g.lineTo(x + w / 2, y + h * 0.9); g.lineTo(x + w * 0.08, y + h / 2); g.fill(); g.fillStyle = '#1f3f9a'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.22, 0, 7); g.fill(); }
    else if (id === 'arg') { H3('#75aadb', '#f2f2f2', '#75aadb'); sun(w / 2, h / 2, h * 0.1); }
    else if (id === 'ita') V3('#1e9a3a', '#f2f2f2', '#c8102e');
    else if (id === 'ale') H3('#111111', '#d4202a', '#ffc400');
    else if (id === 'fra') V3('#1d3f9a', '#f2f2f2', '#c8102e');
    else if (id === 'por') { R('#1e7a3a', 0, 0, w * 0.4, h); R('#c8102e', w * 0.4, 0, w * 0.6, h); g.fillStyle = '#ffd400'; g.beginPath(); g.arc(x + w * 0.4, y + h / 2, h * 0.2, 0, 7); g.fill(); }
    else if (id === 'uru') { R('#f2f2f2', 0, 0, w, h); for (let i = 1; i < 9; i += 2) R('#3f7fd0', 0, (h * i) / 9, w, h / 9 + 0.3); R('#f2f2f2', 0, 0, w * 0.4, h * (5 / 9)); sun(w * 0.2, h * 0.27, h * 0.14); }
    g.strokeStyle = 'rgba(0,0,0,0.6)'; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1); }
  // a little player in the kit (shirt, stripe, shorts, socks)
  function kitMan(g, k, x, y, s = 1) { const R = (c, a, b, w, h) => { g.fillStyle = c; g.fillRect(x + a * s, y + b * s, w * s, h * s); };
    R('#e0ac86', 4, 0, 6, 5); R(k.shirt, 1, 5, 12, 9); if (k.stripe) R(k.stripe, 1, 9, 12, 2); R(k.shorts, 2, 14, 10, 5); R(k.socks || k.shirt, 3, 19, 3, 4); R(k.socks || k.shirt, 8, 19, 3, 4); R('#222', 2, 23, 4, 2); R('#222', 8, 23, 4, 2); }
  // ---------- the tournament data (one at a time)
  let T = null; // { id, S, me, round, alive, hist: [[{a,b,w,sc}…] per round], last }
  function newTour(id, me) { const others = shuffle(TEAMS.filter((t) => t !== me)); T = { id, S: SPORT[id], me, round: 0, alive: [me, ...others], hist: [], last: null }; return T; }
  function pairs() { const A = T.alive, P = []; for (let i = 0; i < A.length; i += 2) P.push([A[i], A[i + 1]]); return P; }
  // the other matches of the round: the better team wins more often; made-up scores of the right sport
  function fakeScore(win) { const bb = T.S.game === 'basket'; const a = bb ? 14 + ((Math.random() * 10) | 0) : 1 + ((Math.random() * 3) | 0); const b = bb ? Math.max(4, a - 2 - ((Math.random() * 9) | 0)) : Math.max(0, a - 1 - ((Math.random() * 2) | 0)); return win ? [a, b] : [b, a]; }
  function closeRound(r) { const P = pairs(), res = [], win = [];
    P.forEach(([a, b], i) => { if (i === 0) { const w = r.won ? a : b; res.push({ a, b, w, sc: r.score.slice() }); win.push(w); return; }
      const aw = Math.random() < 0.5 + (a.lv - b.lv) * 1.5; res.push({ a, b, w: aw ? a : b, sc: fakeScore(aw) }); win.push(aw ? a : b); });
    T.hist[T.round] = res; T.last = res[0]; T.alive = win; }
  // ---------- the match: the console waits behind, the 2D game plays it, and we come back to the console
  let SCR = null; // the screen running in the console (for the tests and the match's return)
  function play() { const me = T.me, op = pairs()[0][1], [ka, kb] = kits(me, op), lv = [0.35, 0.55, 0.75][T.round] * (0.85 + op.lv * 0.25);
    const onEnd = (r) => matchEnd(r);
    return ARCADE.api.suspend(() => {
      if (T.S.game === 'basket') return BASKET2D.start({ team: squad(me, ka, 3, true), rival: squad(op, kb, 3, false), teamName: me.name, rivalName: op.name, time: T.round === 2 ? 120 : 90, lv, mateLv: 0.62, style: 'pabellon', inConsole: true, onEnd });
      return FUTBOL2D.start({ team: squad(me, ka, 5, true), rival: squad(op, kb, 5, false), teamName: me.name, rivalName: op.name, kit: { ...ka, gk: { shirt: '#f1c40f', shorts: '#222', socks: '#f1c40f' } }, rivalKit: { ...kb, gk: { shirt: '#5ec8ff', shorts: '#222', socks: '#5ec8ff' } }, time: T.round === 2 ? 150 : 120, lv, mateLv: 0.62, inConsole: true, onEnd }); }); }
  function matchEnd(r) { if (!T) { ARCADE.resume(); return; } closeRound(r && r.score ? r : { won: false, score: [0, 0] }); if (SCR) SCR.go('result'); ARCADE.resume(); }
  // ---------- the champion: the table of the console
  function champion(id, me, ini) { const a = ARCADE.data(); a.sports = a.sports || {}; const s = a.sports[id] = a.sports[id] || { won: 0 }; s.won++;
    a.scores = a.scores || {}; const key = 'mundial_' + id; a.scores[key] = a.scores[key] || []; a.scores[key].unshift([ini, me.name, s.won]); a.scores[key].length = Math.min(10, a.scores[key].length);
    if (typeof SAVE !== 'undefined' && SAVE.auto) SAVE.auto('Campeón del mundialito'); return s.won; }
  // ---------- the screens, inside the GOFIO-8 (A = E / left click, Q = right click, arrows to move)
  const ABC = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ.!♥ ';
  function screen(id) { return (api) => {
    const { W, H, txt, sfx } = api; const S = SPORT[id];
    const o = { v: 'pick', t: 0, sel: Math.max(0, TEAMS.indexOf(T && T.id === id ? T.me : TEAMS[0])), name: ['A', 'A', 'A'], ni: 0, conf: [] };
    o.go = (v) => { o.v = v; o.t = 0; if (v === 'champ') { sfx('clear'); o.conf = []; for (let i = 0; i < 90; i++) o.conf.push([Math.random() * W, -Math.random() * H, 20 + Math.random() * 40, ['#ffd400', '#ff6b6b', '#7fe0ff', '#7fe08a', '#fff'][i % 5]]); } };
    o.onResume = () => { if (o.v === 'result' && T && T.last) sfx(T.last.w === T.me ? 'clear' : 'die'); };
    SCR = o; T = null;
    o.update = (dt, pad) => { o.t += dt; const A = pad.hit('vS') || pad.hit('vT'), Q = pad.hit('vP'); if (o.t < 0.35) return;
      if (o.v === 'pick') { const c = o.sel % 4, r = (o.sel / 4) | 0;
        if (pad.hit('vR')) { o.sel = r * 4 + ((c + 1) % 4); sfx('pick'); } if (pad.hit('vL')) { o.sel = r * 4 + ((c + 3) % 4); sfx('pick'); }
        if (pad.hit('vU') || pad.hit('vD')) { o.sel = (o.sel + 4) % 8; sfx('pick'); }
        if (A) { newTour(id, TEAMS[o.sel]); sfx('coin'); o.go('round'); } else if (Q) api.toMenu(); return; }
      if (o.v === 'round') { if (A) { sfx('start'); play(); } else if (Q) { T = null; o.go('pick'); } return; }
      if (o.v === 'result') { if (!A) return; if (!T || T.last.w !== T.me) { T = null; o.go('pick'); return; } T.round++; if (T.round >= ROUNDS.length) { o.go('champ'); } else o.go('round'); return; }
      if (o.v === 'champ') { for (const p of o.conf) { p[1] += p[2] * dt; if (p[1] > H) p[1] -= H + 10; } if (A && o.t > 1.2) { o.name = ['A', 'A', 'A']; o.ni = 0; o.go('name'); } return; }
      if (o.v === 'name') { let k = ABC.indexOf(o.name[o.ni]); if (pad.hit('vU') || pad.hit('vR')) { k = (k + 1) % ABC.length; sfx('pick'); } if (pad.hit('vD') || pad.hit('vL')) { k = (k + ABC.length - 1) % ABC.length; sfx('pick'); } o.name[o.ni] = ABC[k];
        if (A) { o.ni++; sfx('coin'); if (o.ni >= 3) { o.won = champion(id, T.me, o.name.join('')); o.hl = o.name.join(''); o.go('table'); } } return; }
      if (o.v === 'table') { if (A || Q) { T = null; o.go('pick'); } } };
    // ----- drawing
    const bg = (g) => { const gr = g.createLinearGradient(0, 0, 0, H); if (S.game === 'basket') { gr.addColorStop(0, '#1a0e06'); gr.addColorStop(1, '#5a3418'); } else { gr.addColorStop(0, '#04210f'); gr.addColorStop(1, '#0f5a2a'); } g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.fillStyle = 'rgba(255,255,255,0.05)'; for (let y = 0; y < H; y += 16) g.fillRect(0, y, W, 8); };
    const head = (g, sub) => { txt(g, S.title, W / 2, 10, S.col, 16, 'center'); txt(g, sub, W / 2, 32, '#fff', 8, 'center'); };
    const foot = (g, s) => txt(g, s, W / 2, H - 16, '#9fd7ff', 8, 'center');
    const tag = (g, t, x, y, st) => { flag(g, t.id, x, y, 18, 12); txt(g, t.code, x + 22, y + 2, st === 'win' ? '#ffd400' : st === 'lost' ? '#777' : t === (T && T.me) ? '#7fe0ff' : '#fff', 8); };
    o.draw = (g) => { bg(g);
      if (o.v === 'pick') { head(g, 'EL MUNDIALITO · ELIGE TU SELECCIÓN');
        TEAMS.forEach((t, i) => { const c = i % 4, r = (i / 4) | 0, x = 18 + c * 113, y = 50 + r * 128, on = i === o.sel;
          g.fillStyle = on ? 'rgba(255,212,0,0.2)' : 'rgba(0,0,0,0.4)'; g.fillRect(x, y, 106, 120);
          if (on) { g.strokeStyle = Math.floor(o.t * 4) % 2 ? '#ffd400' : '#ff8a3a'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, 104, 118); }
          flag(g, t.id, x + 13, y + 8, 80, 50); txt(g, t.name, x + 53, y + 64, on ? '#ffd400' : '#fff', 8, 'center');
          kitMan(g, t.home, x + 22, y + 76, 1.3); kitMan(g, t.away, x + 62, y + 76, 1.3);
          const st5 = Math.max(1, Math.min(5, Math.round(3 + (t.lv - 0.62) / 0.04))); for (let k = 0; k < 5; k++) { g.fillStyle = k < st5 ? '#ffd400' : 'rgba(255,255,255,0.18)'; g.fillRect(x + 28 + k * 10, y + 113, 7, 4); } });
        foot(g, 'FLECHAS ELEGIR   A JUGAR   Q MENÚ'); return; }
      if (!T && o.v !== 'table') return;
      if (o.v === 'round' || o.v === 'result') { const R = T.round; head(g, o.v === 'round' ? ROUNDS[R] : 'RESULTADOS · ' + ROUNDS[R]);
        // the bracket: quarter-finals, semis, final
        const col = [14, 176, 330], rowY = (r, i) => (r === 0 ? 54 + i * 22 + ((i / 2) | 0) * 6 : r === 1 ? 65 + i * 50 : 90 + i * 100);
        const seed = T.hist[0] ? T.hist[0].flatMap((m) => [m.a, m.b]) : (R === 0 ? T.alive : []);
        const teamsAt = (r) => r === 0 ? seed : T.hist[r - 1] ? T.hist[r - 1].map((m) => m.w) : r === R ? T.alive : [];
        for (let r = 0; r < 3; r++) { txt(g, ['CUARTOS', 'SEMIS', 'FINAL'][r], col[r], 46 - 4, '#9fd7ff', 6); const L = teamsAt(r), M = T.hist[r];
          L.forEach((t, i) => { const m = M && M[(i / 2) | 0], y = rowY(r, i) + 6, stt = m ? (m.w === t ? 'win' : 'lost') : '';
            if (r === R && !M && pairs()[0].includes(t)) { g.fillStyle = 'rgba(127,224,255,0.18)'; g.fillRect(col[r] - 3, y - 3, 128, 18); }
            tag(g, t, col[r], y, stt); if (m) txt(g, String(m.a === t ? m.sc[0] : m.sc[1]), col[r] + 110, y + 2, stt === 'win' ? '#ffd400' : '#777', 8, 'right'); }); }
        if (o.v === 'round') { const [me, op] = pairs()[0], [ka, kb] = kits(me, op);
          g.fillStyle = 'rgba(0,0,0,0.55)'; g.fillRect(40, 250, W - 80, 52); kitMan(g, ka, 60, 262); flag(g, me.id, 82, 266, 24, 16); txt(g, me.name, 112, 270, '#7fe0ff', 8);
          txt(g, 'CONTRA', W / 2, 270, '#fff', 8, 'center'); txt(g, op.name, W - 112, 270, '#fff', 8, 'right'); flag(g, op.id, W - 106, 266, 24, 16); kitMan(g, kb, W - 76, 262);
          foot(g, Math.floor(o.t * 2) % 2 ? 'A ¡A JUGAR!   Q RETIRARSE' : 'Q RETIRARSE'); }
        else { const m = T.last, won = m.w === T.me; g.fillStyle = 'rgba(0,0,0,0.65)'; g.fillRect(40, 250, W - 80, 52);
          txt(g, won ? (T.round === 2 ? '¡CAMPEONES!' : '¡A ' + ROUNDS[T.round + 1] + '!') : '¡ELIMINADOS!', W / 2, 258, won ? '#ffd400' : '#ff6b6b', 12, 'center');
          txt(g, `${m.a.name} ${m.sc[0]} - ${m.sc[1]} ${m.b.name}`, W / 2, 280, '#fff', 8, 'center'); foot(g, 'A SEGUIR'); }
        return; }
      if (o.v === 'champ') { for (const p of o.conf) { g.fillStyle = p[3]; g.fillRect(p[0], p[1], 3, 5); }
        head(g, 'EL MUNDIALITO DE LA GOFIO-8'); flag(g, T.me.id, W / 2 - 60, 70, 120, 76); kitMan(g, T.me.home, W / 2 - 14, 158, 2);
        const k = Math.min(1, o.t * 2); txt(g, '¡CAMPEONES', W / 2, 222, '#ffd400', Math.round(10 + 8 * k), 'center'); txt(g, 'DEL MUNDIALITO!', W / 2, 248, '#ffd400', Math.round(10 + 8 * k), 'center');
        txt(g, T.me.name, W / 2, 278, '#fff', 12, 'center'); if (o.t > 1.2) foot(g, 'A PONER TUS INICIALES'); return; }
      if (o.v === 'name') { head(g, '¡CAMPEONES! LA TABLA DE CAMPEONES'); flag(g, T.me.id, W / 2 - 30, 60, 60, 38); txt(g, 'TUS INICIALES', W / 2, 120, '#9fd7ff', 8, 'center');
        for (let i = 0; i < 3; i++) { const on = i === o.ni && Math.floor(performance.now() / 250) % 2 === 0; txt(g, o.name[i], W / 2 - 40 + i * 40, 150, i === o.ni ? (on ? '#ffd400' : '#fff') : '#7fe08a', 24, 'center'); }
        foot(g, '↑↓ LETRA   A SIGUIENTE'); return; }
      if (o.v === 'table') { head(g, 'TABLA DE CAMPEONES'); const L = ((ARCADE.data().scores || {})['mundial_' + id] || []).slice(0, 10);
        L.forEach(([n, team, w], i) => { const y = 60 + i * 22, tm = TEAMS.find((q) => q.name === team), hl = i === 0 && n === o.hl && Math.floor(performance.now() / 200) % 2;
          const c = hl ? '#ffd400' : ['#ff6b6b', '#ffb347', '#ffd400', '#7fe08a', '#5ec8ff'][i % 5]; txt(g, String(i + 1).padStart(2, ' '), 70, y, c, 8); txt(g, n, 110, y, c, 8); if (tm) flag(g, tm.id, 170, y - 2, 18, 12); txt(g, team, 196, y, c, 8); });
        if (!L.length) txt(g, 'TODAVÍA NO HAY CAMPEONES', W / 2, 140, '#fff', 8, 'center'); foot(g, 'A SEGUIR'); } };
    return o; }; }
  // the two cartridges, in the GOFIO-8's menu
  const MUS_ = { title: { bpm: 132, div: 4, loop: true, ch: [{ w: 'sq', v: 0.7, n: ['C5 . E5 G5 . E5 C5 . D5 . F5 A5 . F5 D5 .', 'E5 . G5 C6 . G5 E5 . D5 . G5 B5 . . G5 .'], form: [0, 1, 0, 1] }, { w: 'tri', v: 1, n: 'C3 . G2 . C3 . G2 . D3 . A2 . G2 . B2 .' }] } };
  for (const id in SPORT) ARCADE.GAMES[id] = { title: SPORT[id].title, sub: id === 'pachanga' ? 'EL MUNDIALITO DE BASKET 3 CONTRA 3' : 'EL MUNDIALITO DE FÚTBOL', marquee: id === 'pachanga' ? ['#c0392b', '#2a0a06'] : ['#1f8f4e', '#06200e'], titleCol: '#fff',
    help: (K) => `FLECHAS ELEGIR  A: ${K('f_punch')}  Q: ${K('b_pass')}  ESC MENÚ`, music: MUS_, screen: screen(id) };
  return { TEAMS, kits, near, flag, _T: () => T, _scr: () => SCR, _end: (r) => matchEnd(r) };
})();
