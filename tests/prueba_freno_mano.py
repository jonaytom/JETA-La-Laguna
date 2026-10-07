# Freno de mano: a 60 km/h, girar con y sin freno de mano. Con él debe frenar más, girar más y derrapar (ángulo entre
# el morro y la dirección en la que se mueve el coche). En la pista del aeropuerto (sitio abierto, sin choques).
import os, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
JS = r"""(hb)=>{ const d=__dbg; document.getElementById('menu').style.display='none'; window.__manual=true; d.GAME.state='play';
  const rw=d.DATA.AW.find(a=>a[0]==='runway'); const p=rw[3]; const x0=(p[0]+p[2])/2, z0=(p[1]+p[3])/2; d.PLAYER.x=x0; d.PLAYER.z=z0; __step(3);
  const c=new d.Car('compact',0xff2020,x0,z0,0); c.mode='physics'; c.driver='test';
  const out={}; const v0=60/3.6; c.vx=Math.sin(c.h)*v0; c.vz=Math.cos(c.h)*v0; c.fwdV=v0; let yaw0=c.h, maxSlip=0;
  for(let k=0;k<90;k++){ c.ctl={thr:hb===2&&k>15?0.5:0,brk:0,steer:hb===2&&k>15?0.3:1,hb:hb===1||(hb===2&&k<15)?1:0}; for(let q=0;q<3;q++){ c.physics(1/90); c.x=x0; c.z=z0; } c.sync(1/30);
    const sp=Math.hypot(c.vx,c.vz); if(sp>2){ let a=Math.atan2(c.vx,c.vz)-c.h; while(a>Math.PI)a-=2*Math.PI; while(a<-Math.PI)a+=2*Math.PI; maxSlip=Math.max(maxSlip,Math.abs(a)); }
    if(k===29) { out.derrape_1s=+(maxSlip*180/Math.PI).toFixed(0); out.kmh_1s=+(sp*3.6).toFixed(0); out.giro_1s_grados=+((c.h-yaw0)*180/Math.PI).toFixed(0); } }
  out.derrape_final=(()=>{ let a=Math.atan2(c.vx,c.vz)-c.h; while(a>Math.PI)a-=2*Math.PI; while(a<-Math.PI)a+=2*Math.PI; return +(Math.abs(a)*180/Math.PI).toFixed(0); })(); out.kmh_3s=+(Math.hypot(c.vx,c.vz)*3.6).toFixed(0); out.giro_3s_grados=+((c.h-yaw0)*180/Math.PI).toFixed(0); out.derrape_max_grados=+(maxSlip*180/Math.PI).toFixed(0);
  c.remove(); return JSON.stringify(out); }"""
async def run(pg):
    sin = json.loads(await pg.evaluate(JS, 0)); con = json.loads(await pg.evaluate(JS, 1)); toque = json.loads(await pg.evaluate(JS, 2))
    print('sin freno de mano', sin); print('con freno de mano', con); print('toque de 0,5 s y suelta', toque)
    ok = con['kmh_1s'] < sin['kmh_1s'] and abs(con['giro_1s_grados']) > abs(sin['giro_1s_grados']) and con['derrape_max_grados'] > sin['derrape_max_grados'] + 8 and toque['derrape_final'] < 15 and toque['kmh_3s'] > 15
    print('OK' if ok else 'FALLA')
