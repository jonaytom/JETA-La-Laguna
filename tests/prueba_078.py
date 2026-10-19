# v0.78 (mapa): Pasaje Teide y Pasaje Aguere bajo los edificios (de Obispo Rey Redondo a Calle El Juego, cruzando
# Herradores), con tiendas y bares, y el patio del antiguo Cine Aguere (agujero al cielo, cristalera curva, mural y
# escalera que baja). Se recorre andando de punta a punta. Uso: cd tests && python run_test.py prueba_078.py
import json, os, base64
async def foto(pg, name, x, z, lx, lz, h=1.7, ly=None):
    await pg.evaluate("([x,z,lx,lz,h,ly])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx, d.heightAt(lx,lz)+(ly===null ? 1.2 : ly), lz); d.camera.updateMatrixWorld(); }", [x, z, lx, lz, h, ly])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    ok = True
    r = json.loads(await pg.evaluate("JSON.stringify({ hechos: __dbg.PASAJES.built, patio: __dbg.ATRIOS().map(a=>({x:Math.round(a.x), z:Math.round(a.z), r:a.r, en_edificio: !!a.inBuilding, hecho: a.built||null})) })"))
    print('pasajes', json.dumps(r, ensure_ascii=False)[:1500])
    nombres = {h['name'] for h in r['hechos']}
    ok = ok and 'Pasaje Teide' in nombres and 'Pasaje Aguere' in nombres and r['patio'] and r['patio'][0]['hecho']
    # walk the whole gallery: Obispo Rey Redondo → Herradores → patio → Calle El Juego
    ruta = [[-144, -115], [-177, -60], [-168, -54], [-184, -19], [-188, -9], [-218, 58]]
    w = json.loads(await pg.evaluate("""(R)=>JSON.stringify((()=>{ const d=__dbg, P=d.PLAYER; if (P.car) d.exitCar(); P.x=R[0][0]; P.z=R[0][1]; __step(2); const out=[];
      for (let i=1;i<R.length;i++){ const [tx,tz]=R[i]; let best=1e9; for (let k=0;k<1500;k++){ const dx=tx-P.x, dz=tz-P.z, dd=Math.hypot(dx,dz); best=Math.min(best,dd); if (dd<1.2) break; const yaw=Math.atan2(dx,dz); d.CAM.yaw=yaw; P.h=yaw; __step(1,1/30,['KeyW']); }
        const here=[+P.x.toFixed(1), +P.z.toFixed(1)]; const bl = best<1.6 ? null : d.BUILD.filter(b=>Math.abs(b.cx-P.x)<40&&Math.abs(b.cz-P.z)<40&&d.pip(P.x+Math.sin(P.h)*1.2,P.z+Math.cos(P.h)*1.2,b.pts.flat())).map(b=>({H:+b.H.toFixed(1), pasaje:b.pasaje, style:b.style, name:b.name}));
        const near = best<1.6 ? null : (()=>{ const o=[]; const S=d.COL.segs, C=d.COL.circs; for (let q=0;q<S.length;q+=4){ const ax=S[q],az=S[q+1],bx=S[q+2],bz=S[q+3]; const dx=bx-ax,dz=bz-az,L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((P.x-ax)*dx+(P.z-az)*dz)/L2)); if (Math.hypot(P.x-ax-dx*t,P.z-az-dz*t)<1.5) o.push(['seg',+ax.toFixed(1),+az.toFixed(1),+bx.toFixed(1),+bz.toFixed(1)]); }
          for (let q=0;q<C.length;q+=3) if (Math.hypot(C[q]-P.x,C[q+1]-P.z)<C[q+2]+1.5) o.push(['circ',+C[q].toFixed(1),+C[q+1].toFixed(1),C[q+2]]); return o; })();
        out.push({ a:R[i], llega: best<1.6, cerca: near, falta: +best.toFixed(1), y: +(P.y||0).toFixed(1), donde: here, delante: bl }); if (best>=1.6) { P.x=tx; P.z=tz; __step(2); } }
      return out; })())""", ruta))
    print('andando', w); ok = ok and all(p['llega'] for p in w)
    a = r['patio'][0] if r['patio'] else {'x': -179, 'z': -30}
    await foto(pg, 'v078_teide_entrada', -138, -121, -150, -105, 1.7)
    await foto(pg, 'v078_teide_dentro', -150, -106, -170, -70, 1.7)
    await foto(pg, 'v078_herradores', -160, -48, -172, -57, 1.7)
    await foto(pg, 'v078_patio_suelo', a['x'] + 4, a['z'] - 9, a['x'], a['z'], 1.7, None)
    await foto(pg, 'v078_patio_mural', a['x'] + 3, a['z'] + 3, a['x'] - 3, a['z'] - 3, 1.7, 9)
    await foto(pg, 'v078_patio_escalera', a['x'] - 3, a['z'] - 3, a['x'] + 3, a['z'] + 3, 2.2, -2)
    await foto(pg, 'v078_patio_alto', a['x'] + 12, a['z'] + 12, a['x'], a['z'], 30)
    await foto(pg, 'v078_juego', -222, 66, -212, 48, 1.7)
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 078', 'OK' if ok else 'FALLA')
