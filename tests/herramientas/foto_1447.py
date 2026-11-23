# v1.4.47: fotos de la tanda: el horizonte desde X -300, Y -600 hacia el noreste (la franja verde de Anaga), los
# parterres de la Plaza del Adelantado (X 147, Y -3) y una flecha de carril; de noche, las estrellas cerca del horizonte.
# Fotos en shots/v1447_<vista>.jpg. Uso: en una lista de pruebas (scripts/pruebas/v1447.txt).
import base64
VISTAS = [
    # name, camera x, z, height over the ground, look-at x, z, look-at height, hour
    ('horizonte', -300, -600, 60, 700, 400, 0, 12),
    ('parterres', 141, -9, 3.2, 150, 0, 0.3, 16.5),
    ('parterres_cerca', 144, -6, 1.8, 148, -2, 0.3, 16.5),
    ('estrellas', -300, -600, 30, 700, 400, 120, 1.5),
]
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for n, x, z, h, tx, tz, th, tod in VISTAS:
        await pg.evaluate("""([x,z,h,tx,tz,th,tod])=>{ const D=__dbg, P=D.PLAYER; P.x=x+25; P.z=z+25; D.GAME.tod=tod; __step(3); D.GAME.tod=tod;
          const cam=D.camera; cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(tx, D.heightAt(tx,tz)+th, tz);
          cam.updateMatrixWorld(); if (D.updateCityLOD) D.updateCityLOD(true); }""", [x, z, h, tx, tz, th, tod])
        open('shots/v1447_%s.jpg' % n, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO 1447 OK')
