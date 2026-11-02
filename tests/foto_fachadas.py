# v0.99.6 (Jonay: «las ventanas están bajo tierra o cortadas»): fachadas en cuesta y en llano a la altura de los ojos,
# para ver que las plantas empiezan enteras (zócalo liso debajo) y que no hay ventanas cortadas bajo el tejado.
# Fotos: shots/fach_NN.jpg
import asyncio, os, base64, json
# [x, z, camera dx, dz, height]
SITIOS = [[-60, -230, 18, -30, 2.0], [560, 568, 25, 10, 2.5], [659, 1611, -20, 15, 2.0], [836, 1661, 15, -20, 2.5], [200, 600, -25, 0, 3.0],
          [-1260, 60, 20, 15, 2.5], [1250, 1960, -15, 25, 3.0], [-130, -40, 20, 20, 2.0]]
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    os.makedirs('shots', exist_ok=True)
    for i, (x, z, dx, dz, h) in enumerate(SITIOS):
        d = await pg.evaluate("""([x,z,dx,dz,h])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(8); const y=d.heightAt(x+dx,z+dz); const go=()=>{ d.camera.position.set(x+dx,y+h,z+dz); d.camera.lookAt(x,d.heightAt(x,z)+4,z); }; go(); __step(2); go(); return window.__snap(); }""", [x, z, dx, dz, h])
        open('shots/fach_%02d.jpg' % i, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto fach_%02d' % i, x, z)
    print('errores', errs[:3]); print('FOTOS FACHADAS', 'OK' if not errs else 'FALLA')
