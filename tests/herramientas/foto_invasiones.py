# Fotos de edificios que invaden la calzada (v1.0.0; Jonay: «muéstrame qué edificios del casco invaden calzada, fotos
# concretas»). Para cada punto (los del casco de la auditoría 1.0.0) pone un poste rojo donde más invade y saca dos fotos:
# desde arriba y a la altura de los ojos, de pie en la calzada a 14 m mirando al poste. → shots/invade_NN_arriba.jpg / _calle.jpg
import base64, json
PUNTOS = [[70, 220, 'secundaria sin nombre (junto a C. Herradores)'], [46, 197, 'C. Herradores · Capilla de la Cruz Verde'],
          [149, -623, 'calle de servicio · Mercado de La Laguna'], [-6, -242, 'C. Tabares de Cala'], [14, -300, 'C. Tabares de Cala'],
          [-65, -58, 'C. Tabares de Cala · Casa Riquel'], [-912, -407, 'Av. Lucas Vega / Callejón Montaraz']]
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (x, z, nm) in enumerate(PUNTOS, 1):
        r = json.loads(await pg.evaluate("""([x,z])=>JSON.stringify((()=>{ const d=__dbg, T=d.THREE; const y=d.heightAt(x,z);
          if (window.__poste) d.scene.remove(window.__poste); const m=new T.Mesh(new T.CylinderGeometry(0.18,0.18,7,10), new T.MeshBasicMaterial({color:0xff0000})); m.position.set(x,y+3.5,z); d.scene.add(m); window.__poste=m;
          const n=d.ROADSEG.nearest(x,z,(r)=>r[0]<=12); let ux=1, uz=0, w=0, name='';
          if (n) { const rd=d.DATA.R[n.ri], c=rd[4]; w=rd[2]; name=rd[1]>=0?d.DATA.S[rd[1]]:''; let best=1e9; for (let k=0;k+3<c.length;k+=2){ const ax=c[k],az=c[k+1],bx=c[k+2],bz=c[k+3],ex=bx-ax,ez=bz-az,L2=ex*ex+ez*ez||1,t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)),dd=Math.hypot(x-ax-ex*t,z-az-ez*t); if(dd<best){best=dd; const L=Math.sqrt(L2); ux=ex/L; uz=ez/L;} } }
          return {y, ux, uz, w, name}; })())""", [x, z]))
        y, ux, uz = r['y'], r['ux'], r['uz']
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+8,y+32,z+8); d.camera.lookAt(x,y,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z])
        open(f'shots/invade_{i:02d}_arriba.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
        await pg.evaluate("([x,z,ux,uz])=>{const d=__dbg; const cx=x-ux*14, cz=z-uz*14, y=d.heightAt(cx,cz); d.camera.position.set(cx,y+1.7,cz); d.camera.lookAt(x,d.heightAt(x,z)+1.5,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, ux, uz])
        open(f'shots/invade_{i:02d}_calle.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
        print(f"{i:2d}. X {x}, Y {z} · {nm} · calle del juego: {r['name'] or '(sin nombre)'} {r['w']} m · invade_{i:02d}_arriba.jpg / _calle.jpg")
    await pg.evaluate("(()=>{ if (window.__poste) __dbg.scene.remove(window.__poste); })()")
    print('FOTOS INVASIONES OK')
