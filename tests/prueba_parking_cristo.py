# Parking de la Plaza del Cristo: sube cada escalera andando hasta la plaza (debe salir a la superficie).
import os, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(3);})()")
    r = await pg.evaluate("""(()=>{const d=__dbg, P=d.PLAYER; const out=[]; const cp=d.CARPARKS.find(c=>/Cristo/.test(c.name)); const st=d.TUNNEL_DECKS.filter(D=>D.ceil===2.6 && Math.hypot(D.pts[0][0]-cp.x,D.pts[0][1]-cp.z)<70);
      for (const D of st) { const top=D.pts[0], bot=D.pts[1]; const ux=top[0]-bot[0], uz=top[1]-bot[1], L=Math.hypot(ux,uz); const h=Math.atan2(ux,uz);
        P.x=bot[0]+ux/L*0.4; P.z=bot[1]+uz/L*0.4; P.y=bot[2]+0.3; P.vy=0; P.low=d.lowAt(P.x,P.z,P.y); P.h=h; d.CAM.yaw=h; P.speed=0; let stuck=null, last=[P.x,P.z], still=0;
        for(let i=0;i<200;i++){ P.h=h; d.CAM.yaw=h; window.__PDBG=[]; __step(1,1/30,['KeyW']); const dbg=window.__PDBG; window.__PDBG=null; if(Math.hypot(P.x-last[0],P.z-last[1])<0.005){ if(++still>5 && !stuck) stuck={at:[+P.x.toFixed(2),+P.z.toFixed(2),+(P.y-d.heightAt(P.x,P.z)).toFixed(2)], dbg}; } else still=0; last=[P.x,P.z]; }
        const g=d.heightAt(P.x,P.z); out.push({escalera:[Math.round(top[0]),Math.round(top[1])], fin:[+P.x.toFixed(1),+P.z.toFixed(1)], sobre_suelo:+(P.y-g).toFixed(2), salio: Math.hypot(P.x-bot[0],P.z-bot[1])>L+1 && P.y>g-0.3, stuck}); }
      window.__PDBG=null; return JSON.stringify(out); })()""")
    for o in json.loads(r): print(o)
    # coches: bajar por cada rampa con un coche (control automático) y comprobar techo y paredes
    r = await pg.evaluate("""(()=>{const d=__dbg, P=d.PLAYER; const cp=d.CARPARKS.find(c=>/Cristo/.test(c.name)); const out=[];
      const ramps=d.TUNNEL_DECKS.filter(D=>D.road && !D.hall && D.ceil && Math.hypot(D.pts[D.pts.length-1][0]-cp.x,D.pts[D.pts.length-1][1]-cp.z)<60);
      const car=d.CARS.find(c=>c.type!=='bus'&&c.type!=='moto'&&c.type!=='truck'); if(!P.car) d.enterCar(car); const c=P.car;
      for (const D of ramps) { const a=D.pts[0], b=D.pts[D.pts.length-1]; c.x=a[0]-(b[0]-a[0])*0.05; c.z=a[1]-(b[1]-a[1])*0.05; c.h=Math.atan2(b[0]-a[0],b[1]-a[1]); c.vx=c.vz=0; c.fwdV=0; c.y=d.heightAt(c.x,c.z)+0.2; c.low=null; c.sync(1/30);
        let minClear=99, maxDepth=0; for(let i=0;i<300;i++){ const tx=b[0]+(b[0]-a[0])*0.4, tz=b[1]+(b[1]-a[1])*0.4; c.h=Math.atan2(tx-c.x,tz-c.z); __step(1,1/30, Math.abs(c.fwdV)<7?['KeyW']:[]);
          const g=d.heightAt(c.x,c.z); const lw=d.lowAt(c.x,c.z,c.y); const roof=c.y+(c.T.H||1.5); const ceilY = lw && lw.ceil ? lw.y+lw.ceil+0.3 : (g-c.y>4.3? g-1.2 : 1e9); minClear=Math.min(minClear, ceilY-roof); maxDepth=Math.max(maxDepth,g-c.y); }
        const lw=d.lowAt(c.x,c.z,c.y); out.push({rampa:[Math.round(a[0]),Math.round(a[1])], hueco_min_techo:+minClear.toFixed(2), profundidad:+maxDepth.toFixed(1), en_sala: !!(lw&&lw.cap), fin:[Math.round(c.x),Math.round(c.z)]}); }
      return JSON.stringify(out); })()""")
    for o in json.loads(r): print('coche', o)
