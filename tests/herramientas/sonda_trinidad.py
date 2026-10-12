# Avenida de La Trinidad (v0.68): fotos desde arriba a lo largo de la avenida (tr_ab_*.jpg), fotos a la altura de los
# ojos en los sitios de las capturas de Jonay (tr_ojo_*.jpg: Av. Trinidad 3, 59, cruce con Pedro Zerolo, 76) y datos:
# aparcamientos subterráneos (rampas y salas), edificios que pisan la calzada o la acera de la avenida y tramos sin casas.
# Uso: cd tests && python run_test.py herramientas/sonda_trinidad.py
import base64, json, os
S = 'shots/'; os.makedirs(S, exist_ok=True)
MEDIANA = [[-80, 15], [-95, 55], [-110, 100], [-140, 180], [-170, 260], [-200, 340], [-225, 420], [-250, 500], [-262, 545], [-285, 610], [-305, 670], [-300, 710]]
OJOS = [  # [x, z, mirar_x, mirar_z, nombre]
    [-88, 22, -112, 95, 'trinidad3'], [-80, 12, -100, 70, 'trinidad3b'], [-256, 528, -234, 460, 'trinidad59'], [-262, 552, -240, 480, 'pedrozerolo_n'],
    [-280, 548, -220, 546, 'pedrozerolo_e'], [-298, 640, -312, 700, 'trinidad76'], [-292, 625, -275, 575, 'trinidad76_n']]
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (x, z) in enumerate(MEDIANA):
        for k, (ox, oz, h) in enumerate([[45, 25, 55], [0, 0.5, 110]]):
            await pg.evaluate("([x,z,ox,oz,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+ox,y+h,z+oz); d.camera.lookAt(x,y,z);}", [x, z, ox, oz, h])
            open(S + f'tr_ab_{i}_{k}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    for x, z, lx, lz, n in OJOS:
        await pg.evaluate("([x,z,lx,lz])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+1.7,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+1.5,lz);}", [x, z, lx, lz])
        open(S + f'tr_ojo_{n}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg;
      const cp = (d.CARPARKS||[]).map(c=>({name:c.name, x:Math.round(c.x), z:Math.round(c.z), L:c.L, yF:c.yF&&+c.yF.toFixed(1), u:[+c.F.ux.toFixed(2),+c.F.uz.toFixed(2)]}));
      const R = d.DATA.R, S = d.DATA.S; const segs=[]; R.forEach((r,ri)=>{ if (r[1]>=0 && S[r[1]]==='Avenida de La Trinidad') { const p=r[4]; for (let i=0;i+3<p.length;i+=2) segs.push([p[i],p[i+1],p[i+2],p[i+3],r[2],ri]); } });
      const dist=(x,z)=>{ let b=[1e9,9,0]; for (const s of segs){ const dx=s[2]-s[0], dz=s[3]-s[1], L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-s[0])*dx+(z-s[1])*dz)/L2)); const dd=Math.hypot(x-s[0]-dx*t,z-s[1]-dz*t); if (dd<b[0]) b=[dd,s[4],s[5]]; } return b; };
      const inv=[]; for (const b of d.BUILD) { if (!b.pts||Math.abs(b.cx+200)>170||b.cz<-30||b.cz>740) continue; let m=1e9, w=9; for (let i=0;i<b.pts.length;i++){ const p=b.pts[i], q=b.pts[(i+1)%b.pts.length]; for (const t of [0,0.25,0.5,0.75]) { const r=dist(p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t); if (r[0]<m){m=r[0]; w=r[1];} } } if (m<w/2+2.5) inv.push([Math.round(b.cx),Math.round(b.cz),+(w/2+2.5-m).toFixed(1), b.name||'']); }
      return { carparks: cp, invaden: inv.sort((a,b)=>b[2]-a[2]) }; })())"""))
    print('aparcamientos', info['carparks'])
    print('edificios que pisan calzada/acera de la avenida (x, z, metros, nombre):', len(info['invaden']))
    for b in info['invaden']: print('  ', b)
    print('SONDA TRINIDAD OK')
