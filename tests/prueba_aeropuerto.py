# Aeropuerto: se construye (pista, terminal, aviones) y hay ruta en coche desde el inicio hasta la terminal.
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(3);})()")
    print(await pg.evaluate("""(()=>{const d=__dbg, A=d.AIRPORT; const G=d.GRAPH; const a=G.nearestNode(-758,-364), b=G.nearestNode(A.door.x,A.door.z); const r=G.route(a,b); let L=0; if(r) for(let i=2;i<r.length;i+=2) L+=Math.hypot(r[i]-r[i-2],r[i+1]-r[i-1]);
      const nb=G.nodes?G.nodes[b]:null; return JSON.stringify({ok:A.ok, aviones:A.planes.length, pista_m:Math.round(A.runway.tot), ruta_km:r?+(L/1000).toFixed(2):null, nodo_terminal_dist: nb?Math.round(Math.hypot(nb.x-A.door.x,nb.z-A.door.z)):null}); })()"""))
