# v1.4.43: los recorridos con puntos de control no vuelven por la misma calle en sentido contrario («la ruta de vuelta
# pasa por encima de la de ida»). routeToward entre 30 pares de sitios de la ciudad, con las longitudes de las misiones.
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = []; let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const N = d.GRAPH.nodes; let tries = 0;
      while (out.length < 30 && tries < 400) { tries++;
        const a = N[Math.floor(rnd() * N.length)], b = N[Math.floor(rnd() * N.length)];
        const D = Math.hypot(a.x - b.x, a.z - b.z); if (D > 1500 || D < 100) continue;
        const [mn, mx] = out.length % 2 ? [900, 2200] : [1700, 2900];
        const t0 = performance.now(), q = d.routeToward(a.x, a.z, b.x, b.z, mn, mx), ms = performance.now() - t0;
        out.push(q ? { L: Math.round(d.s2Path ? 0 : 0), vuelta: Math.round(d.routeRetrace(q)), fin: Math.round(Math.hypot(q[q.length - 2] - b.x, q[q.length - 1] - b.z)), ms: Math.round(ms) } : { nada: true, ms: Math.round(ms) });
      }
      return JSON.stringify(out); }"""))
    found = [o for o in r if not o.get('nada')]
    bad = [o for o in found if o['vuelta'] > 25]
    print('rutas', len(r), 'encontradas', len(found), 'con vuelta por la misma calle', len(bad), [o['vuelta'] for o in bad])
    print('lejos del destino (>60 m)', sum(1 for o in found if o['fin'] > 60), 'tiempo máx (ms)', max(o['ms'] for o in r))
    ok = len(found) >= 20 and len(bad) <= len(found) // 10
    print('RUTAS 1443', 'OK' if ok else 'FALLA')
