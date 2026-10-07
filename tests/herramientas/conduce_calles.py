# Conduce a lo largo de calles (índices de DATA.R) y traza la altura; entrada JSON como 2º argumento.
# Uso: cd tests && python run_test.py herramientas/conduce_calles.py [entrada.json]
import sys
import json,sys
ROADS=json.load(open(sys.argv[2] if len(sys.argv) > 2 else 'drv.json'))
JS=r"""(ri)=>{ const d=__dbg, D=d.DATA, rd=D.R[ri]; const c=rd[4]; const pts=[]; for(let i=0;i<c.length;i+=2) pts.push([c[i],c[i+1]]);
  const P=d.PLAYER; P.x=pts[0][0]; P.z=pts[0][1]; __step(2);
  const h=Math.atan2(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]); const RY=d.ROADY[ri];
  const car0=null; const car=new d.Car('compact',0xff2020,pts[0][0],pts[0][1],h); car.mode='physics'; car.driver='test'; const cs0=car.collideStatic.bind(car); car.collideStatic=(dt)=>{ const x=car.x,z=car.z; const h=cs0(dt); car.__push=[+(car.x-x).toFixed(3),+(car.z-z).toFixed(3),h]; return h; }; car.y=RY(0,pts[0][0],pts[0][1])+0.3; car.sync(1/30); if(!d.CARS.includes(car)) d.CARS.push(car);
  const near=(x,z)=>{ let bs=0,bd=1e9,acc=0; for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L2)); const dd=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t); if(dd<bd){bd=dd;bs=acc+Math.sqrt(L2)*t;} acc+=Math.sqrt(L2);} return [bs,bd]; };
  let wp=1, out=[], cnt=0;
  for (let k=0;k<30*40;k++){ while(wp<pts.length-1 && Math.hypot(pts[wp][0]-car.x,pts[wp][1]-car.z)<8) wp++; const g=pts[wp]; let da=Math.atan2(g[0]-car.x,g[1]-car.z)-car.h; while(da>Math.PI)da-=2*Math.PI; while(da<-Math.PI)da+=2*Math.PI;
    car.ctl={thr: car.speed<12?0.8:0.15, brk:0, steer:Math.max(-1,Math.min(1,da*2)), hb:0}; for(let q=0;q<3;q++) car.physics(1/90); car.sync(1/30);
    const [s,off]=near(car.x,car.z); const ry=RY(s,car.x,car.z); const dy=car.y-ry;
    if ((Math.abs(dy)>0.8 || (k>60 && car.speed<1)) && cnt++<4){ const dk=[]; for(const q of d.DECKS){ if(!q.road||q.type!=='path') continue; const p=q.pts; for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; let t=((car.x-a[0])*dx+(car.z-a[1])*dz)/L2; if(t<-0.02||t>1.02) continue; t=Math.max(0,Math.min(1,t)); const dd=Math.hypot(car.x-a[0]-dx*t,car.z-a[1]-dz*t); if(dd>q.w/2) continue; dk.push([+(a[2]+(b[2]-a[2])*t).toFixed(2), +dd.toFixed(1), q.w, Math.round(p[0][0]), Math.round(p[0][1])]); break; } }
      const fx=Math.sin(car.h),fz=Math.cos(car.h),LL=car.T.L*0.4; const F=[car.x+fx*LL,car.z+fz*LL],B=[car.x-fx*LL,car.z-fz*LL]; const dkF=[]; for(const q of d.DECKS){ if(!q.road||q.type!=='path') continue; const p=q.pts; for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; let t=((F[0]-a[0])*dx+(F[1]-a[1])*dz)/L2; if(t<-0.02||t>1.02) continue; t=Math.max(0,Math.min(1,t)); const dd=Math.hypot(F[0]-a[0]-dx*t,F[1]-a[1]-dz*t); if(dd>q.w/2) continue; dkF.push([+(a[2]+(b[2]-a[2])*t).toFixed(2),+(a[2]+(b[2]-a[2])*t-d.heightAt(F[0],F[1])).toFixed(2),Math.round(p[0][0]),Math.round(p[0][1])]); break; } }
      const all=d.DECKS.slice(); const hits=[]; for(let k=0;k<all.length;k++){ d.DECKS.length=0; d.DECKS.push(all[k]); const v=d.deckAt(F[0],F[1],car.y-1.3,true); if(v>-1e8) hits.push([k,all[k].type,+v.toFixed(2),all[k].w,all[k].pts?all[k].pts.length:0, all[k].pts?all[k].pts.map(p=>p.map(v=>Math.round(v))).slice(0,6):null]); } d.DECKS.length=0; d.DECKS.push(...all);
      const lw=d.lowAt(car.x,car.z,car.y); out.push({push:car.__push,thr:car.ctl.thr,sp:+car.speed.toFixed(1),h:+car.h.toFixed(2),lw:lw&&{y:+lw.y.toFixed(2),d:+lw.d.toFixed(2),hw:lw.hw,px:Math.round(lw.px),pz:Math.round(lw.pz)},hits:hits.length,GF:+car.Gf(F[0],F[1]).toFixed(2),GB:+car.Gf(B[0],B[1]).toFixed(2),dkF,x:+car.x.toFixed(1),z:+car.z.toFixed(1),y:+car.y.toFixed(2),ry:+ry.toFixed(2),g:+d.heightAt(car.x,car.z).toFixed(2),s:Math.round(s),off:+off.toFixed(1),onDeck:car.onDeck,low:!!car.low,dk}); }
    if (wp>=pts.length-1 && Math.hypot(pts[wp][0]-car.x,pts[wp][1]-car.z)<5) break; }
  car.remove&&car.remove(); return JSON.stringify(out); }"""
async def run(pg):
    for ri in ROADS:
        print('ROAD',ri); 
        for q in json.loads(await pg.evaluate(JS,ri)): print('  ',q)
