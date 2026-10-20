// ============ «PACHANGA 3x3» y «PLAY FURBITO» (v0.85, Jonay): los cartuchos de deportes de la GOFIO-8 ============
// Basados en lo que ya tenemos (el basket 3 contra 3 y el fútbol de las canchas), pero en modo campeonato: al empezar
// eliges una selección entre 8 países y juegas el mundialito por eliminatorias (cuartos, semifinal y final), cada vez
// contra uno mejor. Los otros cruces se juegan solos. Las equipaciones de los dos equipos de cada partido no pueden
// parecerse: si se parecen, el rival sale con la segunda. Estos juegos tienen final: si ganas el mundialito, pones tus
// iniciales en la tabla de campeones de la consola (y cuenta para el torneo de videojuegos).
const MUNDIALITO = (() => {
  const TEAMS = [
    { id: 'esp', name: 'ESPAÑA', flag: '🇪🇸', home: { shirt: '#c8102e', shorts: '#1d2a6b', socks: '#c8102e', stripe: '#ffc400' }, away: { shirt: '#f2f2f2', shorts: '#f2f2f2', socks: '#f2f2f2', stripe: '#c8102e' }, names: ['PACO', 'JUANMA', 'DANI', 'RAÚL', 'NACHO'], lv: 0.6 },
    { id: 'bra', name: 'BRASIL', flag: '🇧🇷', home: { shirt: '#ffdf00', shorts: '#1f4fb5', socks: '#f2f2f2', stripe: '#1e9a3a' }, away: { shirt: '#1f4fb5', shorts: '#f2f2f2', socks: '#1f4fb5', stripe: '#ffdf00' }, names: ['JUNINHO', 'ZÉ', 'DIDIZINHO', 'CAFUZÃO', 'PELEZITO'], lv: 0.7 },
    { id: 'arg', name: 'ARGENTINA', flag: '🇦🇷', home: { shirt: '#75aadb', shorts: '#111111', socks: '#f2f2f2', stripe: '#f2f2f2' }, away: { shirt: '#1d2a6b', shorts: '#1d2a6b', socks: '#1d2a6b', stripe: '#75aadb' }, names: ['EL PIBE', 'CHE', 'TITO', 'EL TANO', 'MARADONITA'], lv: 0.68 },
    { id: 'ita', name: 'ITALIA', flag: '🇮🇹', home: { shirt: '#1f5fbf', shorts: '#f2f2f2', socks: '#1f5fbf' }, away: { shirt: '#f2f2f2', shorts: '#1f5fbf', socks: '#f2f2f2', stripe: '#1f9a3a' }, names: ['GIGI', 'TOTÓ', 'PIPPO', 'FABIO', 'CANNAVARO II'], lv: 0.62 },
    { id: 'ale', name: 'ALEMANIA', flag: '🇩🇪', home: { shirt: '#f2f2f2', shorts: '#111111', socks: '#f2f2f2', stripe: '#111111' }, away: { shirt: '#2a2a2a', shorts: '#2a2a2a', socks: '#2a2a2a', stripe: '#d4202a' }, names: ['HANS', 'KLAUS', 'FRITZ', 'DER BOMBER', 'JÜRGEN'], lv: 0.64 },
    { id: 'fra', name: 'FRANCIA', flag: '🇫🇷', home: { shirt: '#1d2a6b', shorts: '#f2f2f2', socks: '#c8102e' }, away: { shirt: '#f2f2f2', shorts: '#1d2a6b', socks: '#f2f2f2', stripe: '#c8102e' }, names: ['ZIZOU', 'TITÍ', 'PIERRE', 'JEAN-LUC', 'MICHELÍN'], lv: 0.63 },
    { id: 'por', name: 'PORTUGAL', flag: '🇵🇹', home: { shirt: '#a6192e', shorts: '#1e7a3a', socks: '#a6192e', stripe: '#ffd400' }, away: { shirt: '#f2f2f2', shorts: '#f2f2f2', socks: '#f2f2f2', stripe: '#a6192e' }, names: ['ZEZINHO', 'NANI II', 'BETO', 'EUSEBINHO', 'O BICHO'], lv: 0.58 },
    { id: 'uru', name: 'URUGUAY', flag: '🇺🇾', home: { shirt: '#5fb3e6', shorts: '#111111', socks: '#111111' }, away: { shirt: '#f2f2f2', shorts: '#5fb3e6', socks: '#f2f2f2', stripe: '#5fb3e6' }, names: ['EL MATADOR', 'CHARRÚA', 'PELADO', 'TATO', 'EL FLACO'], lv: 0.6 }];
  const ROUNDS = ['CUARTOS DE FINAL', 'SEMIFINAL', 'LA FINAL'];
  const SPORT = { pachanga: { title: 'PACHANGA 3x3', n: 3, game: 'basket' }, furbito: { title: 'PLAY FURBITO', n: 5, game: 'futbol' } };
  const rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const near = (a, b) => { const p = rgb(a), q = rgb(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 140; };
  // the rival's kit: its first one, unless it looks like ours (shirt or shorts): then the second
  function kits(me, op) { const a = me.home; let b = op.home; if (near(a.shirt, b.shirt)) b = op.away; if (near(a.shirt, b.shirt)) b = { shirt: '#111111', shorts: '#111111', socks: '#111111', stripe: '#ffd400' }; return [a, b]; }
  const SK = ['#e0ac86', '#8d5a3b', '#c68a5e', '#f1c9a5', '#6b4226'], HR = ['#1a1410', '#6b3e1e', '#d8b56a', '#2a1a10', '#111111'];
  const num = (h) => parseInt(h.slice(1), 16);
  function squad(t, kit, n, mine) { const L = []; for (let i = 0; i < n; i++) { const k = (t.id.charCodeAt(0) + i * 3) % 5;
      L.push({ name: mine && i === 0 ? 'TÚ' : t.names[i % t.names.length], look: { skin: num(SK[k]), hair: num(HR[(k + i) % 5]), shirt: num(kit.shirt), pants: num(kit.shorts), shoes: 0x222222, sole: num(kit.socks || kit.shirt) }, nose: mine && i === 0 }); }
    return L; }
  let T = null; // the tournament in course
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // ---------- choose the country
  function start(id) { const S = SPORT[id]; if (!S) return false;
    DLG.show(S.title, 'ELIGE TU SELECCIÓN', 'El mundialito de la GOFIO-8: 8 selecciones, eliminatorias hasta la final. Cada ronda, un rival mejor.', '¿Con quién juegas?',
      [...TEAMS.map((t) => `${t.flag} <b>${t.name}</b>`), 'Mejor otro día'], (i) => { const me = TEAMS[i]; if (!me) { DLG.hide(); return; }
        const others = shuffle(TEAMS.filter((t) => t !== me)); T = { id, S, me, round: 0, bracket: [me, ...others], alive: [me, ...others] }; DLG.hide(); next(); });
    return true; }
  // the pairs of the round (you always first); the others are played in a moment
  function pairs() { const A = T.alive, P = []; for (let i = 0; i < A.length; i += 2) P.push([A[i], A[i + 1]]); return P; }
  function next() { const P = pairs(), my = P[0], op = my[1], R = ROUNDS[T.round];
    const rest = P.slice(1).map(([a, b]) => `${a.flag} ${a.name} – ${b.name} ${b.flag}`).join('<br>');
    DLG.show(T.S.title, R, `<b>${my[0].flag} ${my[0].name} contra ${op.name} ${op.flag}</b>${rest ? `<br><br><span style="opacity:.75">Los otros cruces:<br>${rest}</span>` : ''}`, '',
      ['¡A jugar!', 'Retirarse'], (i) => { DLG.hide(); if (i === 1) { T = null; return; } play(op); }); }
  function play(op) { const me = T.me, [ka, kb] = kits(me, op), lv = [0.35, 0.55, 0.75][T.round] * (0.85 + op.lv * 0.25), R = ROUNDS[T.round];
    const onEnd = (r) => setTimeout(() => after(r, op), 400);
    if (T.S.game === 'basket') BASKET2D.start({ team: squad(me, ka, 3, true), rival: squad(op, kb, 3, false), teamName: me.name, rivalName: op.name, time: T.round === 2 ? 120 : 90, lv, mateLv: 0.62, style: 'pabellon', onEnd });
    else FUTBOL2D.start({ team: squad(me, ka, 5, true), rival: squad(op, kb, 5, false), teamName: me.name, rivalName: op.name, kit: { ...ka, gk: { shirt: '#f1c40f', shorts: '#222', socks: '#f1c40f' } }, rivalKit: { ...kb, gk: { shirt: '#5ec8ff', shorts: '#222', socks: '#5ec8ff' } }, time: T.round === 2 ? 150 : 120, lv, mateLv: 0.62, onEnd });
    HUD.toast(`${T.S.title} · ${R}: ${me.name} – ${op.name}`, '#7fe0ff', 3); }
  function after(r, op) { if (!T) return; const won = !!(r && r.won);
    if (!won) { DLG.show(T.S.title, '¡ELIMINADOS!', `${op.flag} ${op.name} os deja fuera en ${ROUNDS[T.round].toLowerCase()} (${r.score[0]}–${r.score[1]}). ¡La próxima!`, '', ['Vale'], () => { DLG.hide(); T = null; }); return; }
    // the other matches: the better team wins more often
    const P = pairs(); const win = [T.me]; for (const [a, b] of P.slice(1)) win.push(Math.random() < 0.5 + (a.lv - b.lv) * 1.5 ? a : b);
    T.alive = win; T.round++;
    if (T.round >= ROUNDS.length) { champion(); return; }
    DLG.show(T.S.title, '¡A ' + ROUNDS[T.round] + '!', `Ganáis a ${op.name} ${op.flag} (${r.score[0]}–${r.score[1]}).`, '', ['Seguir'], () => { DLG.hide(); next(); }); }
  function champion() { const a = ARCADE.data(), id = T.id; a.sports = a.sports || {}; const s = a.sports[id] = a.sports[id] || { won: 0 }; s.won++;
    HUD.big('¡CAMPEONES DEL MUNDIALITO!', '#ffd400', 4); AUDIO.cash && AUDIO.cash();
    // initials on the champions' table of the console (like the hi-scores)
    const me = T.me; T = null;
    DLG.ask(SPORT[id].title, `¡${me.flag} ${me.name}, CAMPEONA DEL MUNDIALITO!`, 'Pon tus iniciales en la tabla de campeones de la GOFIO-8.', 'Tus iniciales', 'AAA', 3, (v) => {
      const n = v.toUpperCase().replace(/[^A-ZÑ]/g, '').slice(0, 3).padEnd(3, '.'); const key = 'mundial_' + id; a.scores[key] = a.scores[key] || []; a.scores[key].unshift([n, me.name, s.won]); a.scores[key].length = Math.min(10, a.scores[key].length);
      DLG.hide(); HUD.toast(`${n} · ${me.name}: en la tabla de campeones de ${SPORT[id].title}`, '#ffd400', 5); if (SAVE && SAVE.auto) SAVE.auto('Campeón del mundialito'); }); }
  // the two cartridges, in the GOFIO-8's menu (they leave the console and start the tournament)
  for (const id in SPORT) ARCADE.GAMES[id] = { title: SPORT[id].title, sub: id === 'pachanga' ? 'EL MUNDIALITO DE BASKET 3 CONTRA 3' : 'EL MUNDIALITO DE FÚTBOL', marquee: id === 'pachanga' ? ['#c0392b', '#2a0a06'] : ['#1f8f4e', '#06200e'], titleCol: '#fff', external: () => start(id) };
  return { start, TEAMS, kits, near, _T: () => T, _after: (r) => after(r, pairs()[0][1]), _champion: () => champion() };
})();
