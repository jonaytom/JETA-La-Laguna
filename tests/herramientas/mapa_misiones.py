# v1.4.23: mapa de dónde empieza cada misión de cada línea (historia, Obispo, secreta, torneo, copa, carreras...), con la
# calle de cada inicio y la red de calles principales. Sale en shots/misiones_mapa.json (para dibujarlo aparte).
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = await pg.evaluate("""() => { const d = __dbg, M = d.MISSIONS.kit && d.MISSIONS.kit.startsMap ? d.MISSIONS.kit : d.MISSIONS;
      const S = (M.startsMap || d.MISSIONS.startsMap)();
      for (const k in S) for (const m of S[k]) if (m.s) { const rd = d.ROADSEG.nearest(m.s[0], m.s[1], (r) => r[0] <= 14); m.calle = rd && d.DATA.R[rd.ri][1] >= 0 ? d.STR[d.DATA.R[rd.ri][1]] : ''; }
      const roads = [];
      for (const r of d.DATA.R) { if (r[0] > 7) continue; const c = r[4], o = []; for (let i = 0; i < c.length; i += 6) o.push(Math.round(c[i]), Math.round(c[i + 1])); if (c.length >= 2) o.push(Math.round(c[c.length - 2]), Math.round(c[c.length - 1])); roads.push(o); }
      const lab = (d.LABELS || []).slice(0, 0);
      return JSON.stringify({ S, roads, player: [d.PLAYER.x, d.PLAYER.z] }); }""")
    open('shots/misiones_mapa.json', 'w', encoding='utf-8').write(r)
    S = json.loads(r)['S']
    for k, L in S.items():
        print('==', k, len(L))
        for m in L: print('  ', m['title'], m['s'], m.get('calle', ''))
    print('MAPA MISIONES OK')
