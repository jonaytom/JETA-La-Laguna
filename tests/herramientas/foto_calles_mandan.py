# v1.4.48 («las calles mandan»): ejemplos fijos para comparar antes y después: rendijas entre casas del casco, una calle
# estrechada (Bencomo), un edificio que invade (Calle Barcelona, Beneharo en la Av. de los Menceyes), las eses de la Av. de
# La Trinidad y sus soportales. Cada sitio a la altura de los ojos y desde arriba, a mediodía.
# Fotos en shots/mandan_<sitio>_<antes|despues>.jpg. Uso: en una lista, la línea  herramientas/foto_calles_mandan.py antes
import base64, sys
SUF = sys.argv[2] if len(sys.argv) > 2 else 'antes'
# name, camera x, z, height, look-at x, z, look-at height
VISTAS = [
    ('rendija_casco', -115, -110, 1.7, -123, -118, 1.5),
    ('rendija_casco_arriba', -105, -100, 28, -123, -118, 0),
    ('rendija_casco2', -85, -152, 1.7, -93, -160, 1.5),
    ('bencomo', -10, -150, 1.7, -40, -162, 1.5),
    ('bencomo_arriba', -10, -140, 30, -28, -157, 0),
    ('barcelona', -30, 230, 1.7, -17, 216, 2),
    ('barcelona_arriba', -35, 240, 30, -17, 216, 0),
    ('beneharo', 545, 1195, 2, 568, 1214, 3),
    ('beneharo_arriba', 540, 1185, 35, 568, 1214, 0),
    ('trinidad', -140, 120, 2, -95, 185, 1.5),
    ('trinidad_arriba', -150, 110, 35, -117, 149, 0),
    ('trinidad_soportales', -199, 318, 1.7, -180, 290, 1.5),
]
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for n, x, z, h, tx, tz, th in VISTAS:
        await pg.evaluate("""([x,z,h,tx,tz,th])=>{ const D=__dbg, P=D.PLAYER; P.x=x+15; P.z=z+15; D.GAME.tod=12; __step(3);
          const cam=D.camera; const go=()=>{ cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(tx, D.heightAt(tx,tz)+th, tz); cam.updateMatrixWorld(); };
          go(); if (D.updateCityLOD) D.updateCityLOD(true); __step(1); go(); }""", [x, z, h, tx, tz, th])
        open('shots/mandan_%s_%s.jpg' % (n, SUF), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO CALLES MANDAN OK', SUF, len(VISTAS))
