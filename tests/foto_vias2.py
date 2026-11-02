# v0.99.6: the places of Jonay's captures (27-oct), from his angle: lines at splits, STOPs, the Ofra underpass, the
# station roof, the acceleration lanes. Photos: shots/v2_NN.jpg
import asyncio, os, base64, json
# [x, z, camera dx, dz, height]
SITIOS = [[386, -276, -10, -60, 25], [281, 201, -20, -40, 35], [620, 646, 0, 60, 28], [737, 890, 20, 40, 20], [766, 1223, 30, 40, 38],
          [1083, 2306, 10, 40, 17], [1109, 2405, 10, 40, 22], [1574, 2851, 10, 60, 45], [1448, 2831, 20, 30, 55], [1534, 2739, 25, 25, 16],
          [1768, 3142, 15, 10, 7], [1775, 3165, 20, 20, 16], [-546, 470, 30, 40, 65], [-729, 379, 20, 40, 40], [1300, 2560, 30, 0, 30]]
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    os.makedirs('shots', exist_ok=True)
    for i, (x, z, dx, dz, h) in enumerate(SITIOS):
        d = await pg.evaluate("""([x,z,dx,dz,h])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(8); const y=d.heightAt(x,z); const go=()=>{ d.camera.position.set(x+dx,y+h,z+dz); d.camera.lookAt(x,y,z); }; go(); __step(2); go(); return window.__snap(); }""", [x, z, dx, dz, h])
        open('shots/v2_%02d.jpg' % i, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v2_%02d' % i, x, z)
    print('errores', errs[:3]); print('PRUEBA VIAS2', 'OK' if not errs else 'FALLA')
