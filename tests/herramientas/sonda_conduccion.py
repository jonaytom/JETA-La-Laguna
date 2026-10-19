# Sonda: recorre en coche los tramos que fallan en prueba_conduccion (v0.78) y deja la traza (t, x, z, y, velocidad,
# punto de ruta, choca, bajo) cada segundo. Uso: cd tests && python run_test.py herramientas/sonda_conduccion.py [ri ...]
import json, sys
JS = r"""
(ri)=>{ const d=__dbg; const DATA=__dbg.DATA; const rd=DATA.R[ri]; let c=rd[4].slice();
  if (rd[3]&1) {} // oneway: drive in given direction
  // extend with neighbours a bit? just this way
  const pts=[]; for(let i=0;i<c.length;i+=2) pts.push([c[i],c[i+1]]); let L=0; for(let i=1;i<pts.length;i++) L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  if (L<12) return {ri, skip:'short'};
  const P=d.PLAYER; P.x=pts[0][0]; P.z=pts[0][1]; __step(3);
  const h=Math.atan2(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]); const y0=d.ROADY[ri](0,pts[0][0],pts[0][1]);
  const car=new d.Car('compact',0xff0000,pts[0][0],pts[0][1],h); car.mode='physics'; car.driver='test'; car.y=y0+0.3; if(!d.CARS.includes(car)) d.CARS.push(car);
  const TR=[], SALTO=[0,0,0]; let wp=1, maxDy=0, stuckT=0, t=0, prog=0;
  const ctl=()=>{ while(wp<pts.length-1 && Math.hypot(pts[wp][0]-car.x,pts[wp][1]-car.z)<8) wp++; const g=pts[wp]; const want=Math.atan2(g[0]-car.x,g[1]-car.z); let da=want-car.h; while(da>Math.PI)da-=2*Math.PI; while(da<-Math.PI)da+=2*Math.PI;
    let vmax=13; if (wp<pts.length-1) { const n=pts[wp+1]; const a1=Math.atan2(g[0]-pts[wp-1][0],g[1]-pts[wp-1][1]), a2=Math.atan2(n[0]-g[0],n[1]-g[1]); let tu=Math.abs(a2-a1); if (tu>Math.PI) tu=2*Math.PI-tu; const dg=Math.hypot(g[0]-car.x,g[1]-car.z); if (tu>0.6 && dg<30) vmax=tu>1.2?6:9; } /* v0.78: slow down for sharp bends (like a driver would) */
    car.ctl={thr: car.speed<vmax?0.8:0, brk: car.speed>vmax+2?0.6:0, steer:Math.max(-1,Math.min(1,da*2)), hb:0}; P.x=car.x; P.z=car.z; /* v0.78: the player goes along: cars farther than ~300 m from him stop being simulated (the 3 «tramos que fallan» were only that) */ };
  for (let k=0;k<30*Math.max(40, L/8+15);k++){ /* time limit from the length (a 800 m motorway didn't fit in 40 s) */ ctl(); if (k%15===0) for (const o of d.CARS) if (o!==car && o.driver && o.driver!=='player' && o.driver!=='test' && Math.hypot(o.x-car.x,o.z-car.z)<60 && o.remove) o.remove(); /* random traffic out of the way: this test measures the road */ const yb=car.y; __step(1,1/30); t+=1/30; const jy=Math.abs(car.y-yb); if (jy>SALTO[0]) { SALTO[0]=+jy.toFixed(2); SALTO[1]=Math.round(car.x); SALTO[2]=Math.round(car.z); } if (k%30===0) { d.COL.qy=car.y; const cc=d.COL.resolve(car.x,car.z,2.2); d.COL.qy=null; TR.push([Math.round(t), Math.round(car.x), Math.round(car.z), +car.y.toFixed(1), +car.speed.toFixed(1), wp, cc.hit?1:0, car.low?1:0]); } // progress = distance to end
    const de=Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z); if (de<6) { break; }
    if (car.speed<1) stuckT+=1/30; else stuckT=0; if (stuckT>4) break; }
  const de=Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z);
  let bs=0,bd=1e9,acc=0; for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; const tt=Math.max(0,Math.min(1,((car.x-a[0])*dx+(car.z-a[1])*dz)/L2)); const dd=Math.hypot(car.x-a[0]-dx*tt,car.z-a[1]-dz*tt); if(dd<bd){bd=dd;bs=acc+Math.sqrt(L2)*tt;} acc+=Math.sqrt(L2);}
  const ry=d.ROADY[ri](bs,car.x,car.z); d.COL.qy=car.y; const col=d.COL.resolve(car.x,car.z,2.2); d.COL.qy=null;
  const res={off:+bd.toFixed(1), dy:+(car.y-ry).toFixed(1), col:col.hit, low:!!car.low, ri, t:rd[0], name: rd[1]>=0?DATA.S[rd[1]]:'', L:Math.round(L), done: de<6, left:Math.round(de), time:+t.toFixed(1), x:Math.round(car.x), z:Math.round(car.z), y:+car.y.toFixed(1), };
  if(!res.done){ d.GAME.state='x'; const fx=Math.sin(car.h),fz=Math.cos(car.h); d.camera.position.set(car.x-fx*9,car.y+3.5,car.z-fz*9); d.camera.lookAt(car.x+fx*10,car.y+0.5,car.z+fz*10); window.__snapNow=1; }
  res.salto=SALTO; res.traza=TR; res.pts=pts.map(p=>[Math.round(p[0]),Math.round(p[1])]); car.remove && car.remove(); return res; }
"""
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    ids = []
    for a in sys.argv[2:] or ['308', '1287', '2295']:
        if a.startswith('p:'):  # p:x,z → the roads that pass within 3 m of that point (any kind but footpaths)
            x, z = map(float, a[2:].split(','))
            ids += json.loads(await pg.evaluate('''([x,z])=>{ const R=__dbg.DATA.R, out=[]; R.forEach((rd,ri)=>{ if (rd[0]>12) return; const c=rd[4]; for (let i=0;i<c.length-2;i+=2){ const dx=c[i+2]-c[i], dz=c[i+3]-c[i+1], L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-c[i])*dx+(z-c[i+1])*dz)/L2)); if (Math.hypot(x-c[i]-dx*t, z-c[i+1]-dz*t)<3) { out.push(ri); break; } } }); return JSON.stringify(out); }''', [x, z]))
        else: ids.append(int(a))
    for ri in ids:
        r = await pg.evaluate(JS, ri); await pg.evaluate("__dbg.GAME.state='play'")
        tr = r.pop('traza', []); pts = r.pop('pts', [])
        print('==', json.dumps(r, ensure_ascii=False)); print('   ruta', pts[:12])
        if not r.get('done'): [print('   ', row) for row in tr[-12:]]  # only the end of the trace when it didn't finish
