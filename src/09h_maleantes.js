// ============ Maleantes en busca y captura (v0.70, Jonay) ============
// Once you know how to fight (Sastrón's mission), now and then a wanted thug turns up on the minimap among the people
// in the street: you fight him like anybody else (punch him: 2D fight), but he is harder — he blocks more, strings more
// combos, hits harder — and pays a reward. Three levels, always above the ordinary people (lv 0.25–0.55).
const MALEANTES = (() => {
  const NAMES = ['El Perenquén', 'Juanillo Cuchara', 'El Guirre', 'Pepe Machango', 'El Baifo Loco', 'Tito Tolete', 'El Tuerto de Taco', 'Cholo Pantuflas', 'Chicharro Malo', 'El Mojo Picón', 'Paco Jeitazo', 'El Gofio Negro'];
  const LV = [null, { ai: 0.66, deal: 1.25, recv: 0.9, pay: 150 }, { ai: 0.78, deal: 1.5, recv: 0.8, pay: 300 }, { ai: 0.9, deal: 1.8, recv: 0.7, pay: 600 }];
  const st = { cur: null, t: 60, won: 0 };
  // v0.76 (Jonay: «no sé cuándo te dicen lo de los maleantes»): when you have learnt to fight, Sastrón phones you and
  // explains it; only then do they start to turn up, as red triangles on the minimap
  const unlocked = () => !!(window.GANG && window.GANG.sastronTut && window.GANG.maleIntro);
  const COL_ = '#ff1744';
  function intro() { const G = window.GANG; if (!G || !G.sastronTut || G.maleIntro || st.introT > 0 || MISSIONS.active || GAME.state !== 'play' || (DLG && DLG.open) || (window.__TALK && window.__TALK.cur)) return; st.introT = 1;
    MISSIONS.kit.talk([['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.'],
      ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.'],
      [MISSIONS.kit.CH, '¿Y si me gana él?'], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.']], () => { G.maleIntro = true; st.t = 25; }, 'Maleantes en busca y captura'); }
  function pickPed() {
    let best = null;
    for (const p of PEDS) { if (p.down > 0 || p.fight > 0 || p.canarion || p.fought || !p.H || (p.H.look && p.H.look.female)) continue; const d = Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z); if (d < 45 || d > 120) continue; if (!best || Math.random() < 0.3) best = p; }
    return best;
  }
  function spawn() {
    const p = pickPed(); if (!p) return false;
    const lv = st.won < 2 ? 1 : st.won < 5 ? (Math.random() < 0.6 ? 1 : 2) : 1 + Math.floor(Math.random() * 3);
    p.maleante = { lv, name: NAMES[Math.floor(Math.random() * NAMES.length)], t: 240 }; st.cur = p;
    HUD.toast(`Se busca: ${p.maleante.name} (nivel ${lv}) · recompensa $${LV[lv].pay}. Es el triángulo rojo del minimapa`, COL_, 6);
    return true;
  }
  function clear(msg) { if (st.cur) { st.cur.maleante = null; st.cur = null; } if (msg) HUD.toast(msg, COL_, 3); st.t = 90 + Math.random() * 120; }
  function update(dt) {
    if (!unlocked()) { intro(); return; } if (GAME.state !== 'play') return;
    const c = st.cur;
    if (c) { c.maleante.t -= dt; if (!PEDS.includes(c) || c.gone) return clear('El maleante se ha escapado'); if (c.maleante.t <= 0) return clear('Has perdido la pista del maleante'); return; }
    if (MISSIONS.active || PLAYER.car && PLAYER.car.speed > 25) return; // never in the middle of a mission
    st.t -= dt; if (st.t <= 0) { if (!spawn()) st.t = 15; }
  }
  // the 2D fight against him (startStreetFight asks for this); the reward is paid on a win
  function fightFor(p) { const m = p.maleante, L = LV[m.lv]; return { name: m.name.toUpperCase(), deal: L.deal, recv: L.recv, lv: L.ai }; }
  function result(p, won) { if (!p.maleante) return; if (won) { const pay = LV[p.maleante.lv].pay; PLAYER.money += pay; AUDIO.cash(); HUD.toast(`¡${p.maleante.name} capturado! Recompensa +$${pay}`, COL_, 5); st.won++; clear(); p.paid = true; } else HUD.toast(`${p.maleante.name} te ha dado una paliza. Sigue marcado: puedes volver a por él`, '#ffb3b3', 4); }
  const blips = () => (st.cur && st.cur.maleante ? [[st.cur.x, st.cur.z, COL_, 'tri']] : []);
  return { update, fightFor, result, blips, _st: st, _spawn: spawn, unlocked, COL: COL_ };
})();
