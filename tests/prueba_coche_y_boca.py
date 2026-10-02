# Aceleración (0-100 km/h y punta) en una recta, sitio del círculo de Boca Papa y coordenadas en el minimapa.
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    r = await pg.evaluate("""(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; const d=__dbg; d.GAME.state='play'; __step(5);
      const c=d.CARS.find(c=>c.type!=='moto'&&c.type!=='bus'&&c.type!=='truck'); const P=d.PLAYER; d.CARS.length=0; d.CARS.push(c);
      c.x=P.x; c.z=P.z; c.vx=c.vz=0; c.fwdV=0; c.mode='physics'; c.driver=null; d.enterCar(c);
      let t=0, t100=null, vmax=0; for(let i=0;i<60*25;i++){ c.x=P.x; /* keep on a virtual straight: reset position */ __step(1,1/60,['KeyW']); t+=1/60; const kmh=Math.abs(c.fwdV)*3.6; vmax=Math.max(vmax,kmh); if(t100===null&&kmh>=100) t100=t; c.x=0; c.z=0; c.h=0; }
      const B=d.NPC.boca; return JSON.stringify({modelo:c.T.name, t0a100:t100&&t100.toFixed(1), punta:vmax.toFixed(0), maxV:(c.T.maxV*3.6).toFixed(0), boca:[B.x.toFixed(1),B.z.toFixed(1)], inicio:B.start&&B.start.map(v=>v.toFixed(1)), coords:document.getElementById('coords').textContent}); })()""")
    print(r)
