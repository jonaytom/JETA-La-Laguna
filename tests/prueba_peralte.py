# Coche en calles con mucha pendiente lateral: las 4 ruedas deben quedar apoyadas (no flotar un lado).
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    r = await pg.evaluate("""(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; const d=__dbg; d.GAME.state='play'; __step(5);
      const G=d.GRAPH, S={x:0,z:0,dx:0,dz:0}; const cands=[];
      for (let e=0;e<G.edges.length;e+=3){ const E=G.edges[e]; for(let s=2;s<E.len-2;s+=8){ G.sample(e,1,s,0,S); const L=Math.hypot(S.dx,S.dz)||1, rx=-S.dz/L, rz=S.dx/L;
        const lat=(d.heightAt(S.x+rx*1,S.z+rz*1)-d.heightAt(S.x-rx*1,S.z-rz*1))/2; if(d.lowAt(S.x,S.z,d.heightAt(S.x,S.z)-3)) continue; cands.push([Math.abs(lat),S.x,S.z,Math.atan2(S.dx,S.dz)]); } }
      cands.sort((a,b)=>b[0]-a[0]); const car=d.CARS.find(c=>c.wheels&&c.wheels.length===4&&c.type!=='moto'); const out=[];
      const v=new d.THREE.Vector3();
      for (const [sl,x,z,h] of cands.slice(0,6)) { car.mode='physics'; car.x=x; car.z=z; car.h=h; car.vx=car.vz=0; for(let i=0;i<20;i++) car.sync(1/30); car.mesh.updateMatrixWorld(true);
        const gaps=car.wheels.map(w=>{ w.w.getWorldPosition(v); const r=(w.r||0.33); return +(v.y - d.heightAt(v.x,v.z)).toFixed(2); });
        out.push({pendLat:(sl*100).toFixed(0)+'%', ruedas_altura_eje_sobre_suelo:gaps, dif:+(Math.max(...gaps)-Math.min(...gaps)).toFixed(2)}); }
      return JSON.stringify(out); })()""")
    import json
    for o in json.loads(r): print(o)
