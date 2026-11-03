# Tamaños de la gente, los coches y las calles comparados con la realidad (v1.0.0; Jonay, 3-nov: «no sé si el tamaño de
# coches y personas creció como las calles»). Mide la altura de la gente (caja de su malla), el largo y ancho de los
# coches de tráfico y aparcados, el ancho de las calles (tal cual las deja el juego y su ancho en OSM) y el de una puerta
# y una planta de los edificios. Uso: herramientas/sonda_tamanos.py en una lista → shots/sonda_tamanos.txt
import json
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, T=d.THREE, box=new T.Box3(), v=new T.Vector3(); const st=(a)=>{ a=a.filter(x=>isFinite(x)).sort((x,y)=>x-y); if(!a.length) return null; return {n:a.length, min:+a[0].toFixed(2), med:+a[a.length>>1].toFixed(2), max:+a[a.length-1].toFixed(2)}; };
      const hum=[], hum2=[]; for (const p of d.PEDS||[]) { const o=p.H&&p.H.root; if(!o) continue; o.updateMatrixWorld(true); box.setFromObject(o); box.getSize(v); hum.push(v.y); if (p.H.head) { const a=new T.Vector3(), b=new T.Vector3(); p.H.head.getWorldPosition(a); o.getWorldPosition(b); hum2.push(a.y-b.y+0.12); } }
      let ph=null; try { const H=d.playerHuman, o=H.root; o.updateMatrixWorld(true); const a=new T.Vector3(), b=new T.Vector3(); H.head.getWorldPosition(a); o.getWorldPosition(b); ph=+(a.y-b.y+0.12).toFixed(2); } catch(e){} /* v1.0.2: by the head, like the people */
      const L=[], W=[], H=[]; for (const c of d.CARS||[]) { if (!c.T) continue; L.push(c.T.L); W.push(c.T.W); H.push(c.T.H); }
      const RT=d.DATA.RT, by={}; for (const r of d.DATA.R) { const t=RT[r[0]]; if (r[0]>12) continue; (by[t]||(by[t]=[])).push(r[2]); }
      const roads={}; for (const k in by) roads[k]=st(by[k]);
      const fh = (()=>{ try { return d.BUILD.slice(0,400).map(b=>b.H).filter(Boolean); } catch(e){ return []; } })();
      return { gente:st(hum), gente_cabeza:st(hum2), jugador:ph, coche_largo:st(L), coche_ancho:st(W), coche_alto:st(H), calles:roads, n_estrechadas: d.DATA.NARROWED?d.DATA.NARROWED.size:null, quitados: d.RCLIP?d.RCLIP.gone:null, recortados: d.RCLIP?d.RCLIP.cut:null, gone: d.RCLIP?d.RCLIP.goneList:[] }; })())"""))
    out('gente (altura m): caja', r['gente'], '· por la cabeza', r['gente_cabeza'], '· jugador', r['jugador'], '· real: 1,60–1,85')
    out('coches (m): largo', r['coche_largo'], '· ancho', r['coche_ancho'], '· alto', r['coche_alto'], '· real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55')
    out('calles (ancho m, tal cual en el juego):')
    for k, v in r['calles'].items(): out(f'   {k:16s} {v}')
    out('calles estrechadas al hueco entre edificios:', r['n_estrechadas'], '· edificios recortados', r['recortados'], '· quitados (solo quedaba una tira)', r['quitados'])
    g = r['gone']; import collections
    h = collections.Counter('<20' if a < 20 else '20-50' if a < 50 else '50-100' if a < 100 else '100-300' if a < 300 else '≥300' for x, z, a in g)
    out('edificios quitados por superficie original (m²):', dict(h))
    for x, z, a in sorted(g, key=lambda e: -e[2])[:25]: out(f'   X {x}, Y {z}: {a} m²')
    open('shots/sonda_tamanos.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA TAMANOS OK')
