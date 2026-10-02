import asyncio, json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
JS = r"""
(ri)=>{ const d=__dbg; const DATA=JSON.parse(document.getElementById('mapdata').textContent); const rd=DATA.R[ri]; let c=rd[4].slice();
  if (rd[3]&1) {} // oneway: drive in given direction
  // extend with neighbours a bit? just this way
  const pts=[]; for(let i=0;i<c.length;i+=2) pts.push([c[i],c[i+1]]); let L=0; for(let i=1;i<pts.length;i++) L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  if (L<25) return {ri, skip:'short'};
  const P=d.PLAYER; P.x=pts[0][0]; P.z=pts[0][1]; __step(3);
  const h=Math.atan2(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]); const y0=d.ROADY[ri](0,pts[0][0],pts[0][1]);
  const car=new d.Car('compact',0xff0000,pts[0][0],pts[0][1],h); car.mode='physics'; car.driver='test'; car.y=y0+0.3; if(!d.CARS.includes(car)) d.CARS.push(car);
  let wp=1, maxDy=0, stuckT=0, t=0, prog=0;
  const ctl=()=>{ while(wp<pts.length-1 && Math.hypot(pts[wp][0]-car.x,pts[wp][1]-car.z)<8) wp++; const g=pts[wp]; const want=Math.atan2(g[0]-car.x,g[1]-car.z); let da=want-car.h; while(da>Math.PI)da-=2*Math.PI; while(da<-Math.PI)da+=2*Math.PI;
    car.ctl={thr: car.speed<13?0.8:0.2, brk:0, steer:Math.max(-1,Math.min(1,da*2)), hb:0}; };
  for (let k=0;k<30*40;k++){ ctl(); __step(1,1/30); t+=1/30; // progress = distance to end
    const de=Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z); if (de<6) { break; }
    if (car.speed<1) stuckT+=1/30; else stuckT=0; if (stuckT>4) break; }
  const de=Math.hypot(pts[pts.length-1][0]-car.x,pts[pts.length-1][1]-car.z);
  let bs=0,bd=1e9,acc=0; for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; const tt=Math.max(0,Math.min(1,((car.x-a[0])*dx+(car.z-a[1])*dz)/L2)); const dd=Math.hypot(car.x-a[0]-dx*tt,car.z-a[1]-dz*tt); if(dd<bd){bd=dd;bs=acc+Math.sqrt(L2)*tt;} acc+=Math.sqrt(L2);}
  const ry=d.ROADY[ri](bs,car.x,car.z); d.COL.qy=car.y; const col=d.COL.resolve(car.x,car.z,2.2); d.COL.qy=null;
  const res={off:+bd.toFixed(1), dy:+(car.y-ry).toFixed(1), col:col.hit, low:!!car.low, ri, t:rd[0], name: rd[1]>=0?DATA.S[rd[1]]:'', L:Math.round(L), done: de<6, left:Math.round(de), time:+t.toFixed(1), x:Math.round(car.x), z:Math.round(car.z), y:+car.y.toFixed(1), };
  if(!res.done){ d.GAME.state='x'; const fx=Math.sin(car.h),fz=Math.cos(car.h); d.camera.position.set(car.x-fx*9,car.y+3.5,car.z-fz*9); d.camera.lookAt(car.x+fx*10,car.y+0.5,car.z+fz*10); window.__snapNow=1; }
  car.remove && car.remove(); return res; }
"""
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    ids = json.loads(await pg.evaluate("""(()=>{const d=__dbg; const DATA=JSON.parse(document.getElementById('mapdata').textContent); const out=[]; DATA.R.forEach((rd,ri)=>{ if(rd[0]>10) return; if (d.DEP.has(ri) || (rd[3]&2)) out.push(ri); }); return JSON.stringify(out)})()"""))
    print('roads', len(ids)); bad=[]
    for ri in ids:
        r = await pg.evaluate(JS, ri)
        if r.get('skip'): continue
        if not r['done']:
            bad.append(r); print('FAIL', r); await snap(pg, 'df_%d'%ri); await pg.evaluate("__dbg.GAME.state='play'")
    print('failed', len(bad), 'of', len(ids))
    json.dump(bad, open('/tmp/drive.json','w'))
