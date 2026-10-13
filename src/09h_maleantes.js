// ============ Maleantes en busca y captura (v0.70, Jonay) ============
// Once you know how to fight (Sastrón's mission), now and then a wanted thug turns up on the minimap among the people
// in the street: you fight him like anybody else (punch him: 2D fight), but he is harder — he blocks more, strings more
// combos, hits harder — and pays a reward. Three levels, always above the ordinary people (lv 0.25–0.55).
const MALEANTES = (() => {
  const NAMES = ['El Perenquén', 'Juanillo Cuchara', 'El Guirre', 'Pepe Machango', 'El Baifo Loco', 'Tito Tolete', 'El Tuerto de Taco', 'Cholo Pantuflas', 'Chicharro Malo', 'El Mojo Picón', 'Paco Jeitazo', 'El Gofio Negro'];
  const LV = [null, { ai: 0.66, deal: 1.25, recv: 0.9, pay: 150 }, { ai: 0.78, deal: 1.5, recv: 0.8, pay: 300 }, { ai: 0.9, deal: 1.8, recv: 0.7, pay: 600 }];
  const st = { cur: null, t: 60, won: 0 };
  const unlocked = () => !!(window.GANG && window.GANG.sastronTut);
  function pickPed() {
    let best = null;
    for (const p of PEDS) { if (p.down > 0 || p.fight > 0 || p.canarion || p.fought || !p.H || (p.H.look && p.H.look.female)) continue; const d = Math.hypot(p.x - PLAYER.x, p.z - PLAYER.z); if (d < 45 || d > 120) continue; if (!best || Math.random() < 0.3) best = p; }
    return best;
  }
  function spawn() {
    const p = pickPed(); if (!p) return false;
    const lv = st.won < 2 ? 1 : st.won < 5 ? (Math.random() < 0.6 ? 1 : 2) : 1 + Math.floor(Math.random() * 3);
    p.maleante = { lv, name: NAMES[Math.floor(Math.random() * NAMES.length)], t: 240 }; st.cur = p;
    HUD.toast(`Se busca: ${p.maleante.name} (nivel ${lv}) · recompensa $${LV[lv].pay}. Está marcado en el minimapa`, '#c6ff00', 6);
    return true;
  }
  function clear(msg) { if (st.cur) { st.cur.maleante = null; st.cur = null; } if (msg) HUD.toast(msg, '#c6ff00', 3); st.t = 90 + Math.random() * 120; }
  function update(dt) {
    if (!unlocked() || GAME.state !== 'play') return;
    const c = st.cur;
    if (c) { c.maleante.t -= dt; if (!PEDS.includes(c) || c.gone) return clear('El maleante se ha escapado'); if (c.maleante.t <= 0) return clear('Has perdido la pista del maleante'); return; }
    if (MISSIONS.active || PLAYER.car && PLAYER.car.speed > 25) return; // never in the middle of a mission
    st.t -= dt; if (st.t <= 0) { if (!spawn()) st.t = 15; }
  }
  // the 2D fight against him (startStreetFight asks for this); the reward is paid on a win
  function fightFor(p) { const m = p.maleante, L = LV[m.lv]; return { name: m.name.toUpperCase(), deal: L.deal, recv: L.recv, lv: L.ai }; }
  function result(p, won) { if (!p.maleante) return; if (won) { const pay = LV[p.maleante.lv].pay; PLAYER.money += pay; AUDIO.cash(); HUD.toast(`¡${p.maleante.name} capturado! Recompensa +$${pay}`, '#c6ff00', 5); st.won++; clear(); p.paid = true; } else HUD.toast(`${p.maleante.name} te ha dado una paliza. Sigue marcado: puedes volver a por él`, '#ffb3b3', 4); }
  const blips = () => (st.cur && st.cur.maleante ? [[st.cur.x, st.cur.z, '#c6ff00']] : []);
  return { update, fightFor, result, blips, _st: st, _spawn: spawn, unlocked };
})();
