# Avenida de La Trinidad (v0.68): calzadas de 6,6 m; ningún edificio pisa la calzada ni la acera; casas nuevas en los
# solares vacíos; los dos aparcamientos Indigo (Casco Histórico, rampa en medio; Centro, rampa junto a la acera en el
# n.º 59) se bajan en coche hasta la sala; soportales; marcas de Pedro Zerolo. Fotos de cada rampa y del cruce.
import os, json, base64
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name, x, z, lx, lz, h=1.7):
    await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz);}", [x, z, lx, lz, h])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, S=d.DATA.S;
      const tri=R.filter(r=>r[1]>=0 && S[r[1]]==='Avenida de La Trinidad' && r[0]<=12); const widths=[...new Set(tri.map(r=>r[2]))];
      const segs=[]; for (const r of tri) { const p=r[4]; for (let i=0;i+3<p.length;i+=2) segs.push([p[i],p[i+1],p[i+2],p[i+3],r[2]]); }
      const dist=(x,z)=>{ let b=[1e9,9]; for (const s of segs){ const dx=s[2]-s[0], dz=s[3]-s[1], L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-s[0])*dx+(z-s[1])*dz)/L2)); const dd=Math.hypot(x-s[0]-dx*t,z-s[1]-dz*t); if (dd<b[0]) b=[dd,s[4]]; } return b; };
      const inv=[]; for (const b of d.BUILD) { if (!b.pts||b.style===4||Math.abs(b.cx+200)>170||b.cz<-30||b.cz>740) continue; let m=1e9, w=9; for (const p of b.pts){ const r=dist(p[0],p[1]); if (r[0]<m){m=r[0]; w=r[1];} } if (m<w/2+2.6-0.35 && m>0.4) inv.push([Math.round(b.cx),Math.round(b.cz),+(w/2+2.6-m).toFixed(1)]); }
      const cps=d.CARPARKS.filter(c=>/Trinidad/.test(c.name)).map(c=>({name:c.name,x:Math.round(c.x),z:Math.round(c.z),yF:+c.yF.toFixed(1)}));
      return { widths, invaden: inv, aparcamientos: cps, nuevas: d.TRI ? d.TRI.added : null }; })())"""))
    for k, v in info.items(): print(k, v)
    ok = info['widths'] == [6.6] and not info['invaden'] and len(info['aparcamientos']) == 2
    # drive down each Trinidad ramp
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{const d=__dbg, P=d.PLAYER; const out=[];
      for (const cp of d.CARPARKS.filter(c=>/Trinidad/.test(c.name))) {
        const ramps=d.TUNNEL_DECKS.filter(D=>D.road && !D.hall && D.ceil && Math.hypot(D.pts[D.pts.length-1][0]-cp.x,D.pts[D.pts.length-1][1]-cp.z)<45);
        const car=d.CARS.find(c=>c.type!=='bus'&&c.type!=='moto'&&c.type!=='truck'); if(!P.car) d.enterCar(car); const c=P.car;
        for (const D of ramps) { const a=D.pts[0], b=D.pts[D.pts.length-1]; c.x=a[0]-(b[0]-a[0])*0.05; c.z=a[1]-(b[1]-a[1])*0.05; c.h=Math.atan2(b[0]-a[0],b[1]-a[1]); c.vx=c.vz=0; c.fwdV=0; c.y=d.heightAt(c.x,c.z)+0.2; c.low=null; c.sync(1/30);
          let maxDepth=0; for(let i=0;i<300;i++){ const tx=b[0]+(b[0]-a[0])*0.4, tz=b[1]+(b[1]-a[1])*0.4; c.h=Math.atan2(tx-c.x,tz-c.z); __step(1,1/30, Math.abs(c.fwdV)<6?['KeyW']:[]); maxDepth=Math.max(maxDepth,d.heightAt(c.x,c.z)-c.y); }
          const lw=d.lowAt(c.x,c.z,c.y); out.push({aparcamiento:cp.name, rampa:[Math.round(a[0]),Math.round(a[1])], profundidad:+maxDepth.toFixed(1), en_sala: !!(lw&&lw.cap), fin:[Math.round(c.x),Math.round(c.z)]}); } }
      if (P.car) d.exitCar(); return out; })())"""))
    for o in r: print('coche', o)
    ok = ok and len(r) >= 2 and all(o['profundidad'] > 3 for o in r)
    # photos: each ramp from 12 m before its top, looking down it; the Pedro Zerolo junction from above
    tops = json.loads(await pg.evaluate("""JSON.stringify(__dbg.CARPARKS.filter(c=>/Trinidad/.test(c.name)).map(cp=>{ const D=__dbg.TUNNEL_DECKS.find(D=>D.road && !D.hall && D.ceil && Math.hypot(D.pts[D.pts.length-1][0]-cp.x,D.pts[D.pts.length-1][1]-cp.z)<45); if(!D) return null; const a=D.pts[0], b=D.pts[D.pts.length-1], L=Math.hypot(b[0]-a[0],b[1]-a[1]); return [a[0]-(b[0]-a[0])/L*12, a[1]-(b[1]-a[1])/L*12, b[0], b[1]]; }))"""))
    for i, t in enumerate(tops):
        if t: await foto(pg, f'trinidad_rampa_{i + 1}', t[0], t[1], t[2], t[3]); await foto(pg, f'trinidad_rampa_{i + 1}_alto', t[0] + 8, t[1] - 6, t[2], t[3], 22)
    await foto(pg, 'trinidad_pedrozerolo', -238, 520, -259, 537, 26)
    await foto(pg, 'trinidad_pedrozerolo_calle', -280, 552, -235, 470)
    print('errores JS', errs[:3])
    print('TRINIDAD', 'OK' if ok and not errs else 'FALLA')
