# v1.4.47: los fallos gráficos del mapa que vio Jonay (23-nov), fotografiados desde donde él los vio, para comparar antes
# y después: rotonda con edificio, tejado sobre Juan de Vera, edificio en el Camino del Cañaveral, edificio que falta,
# doble calzada en la autopista, pasarela con la rampa verde, coche hundido en la autopista, aparcado enterrado, hueco
# azul y las curvas de la Trinidad. Fotos en shots/glitch_<n>_<vista>.jpg (mediodía).
# Uso: en una lista (scripts/pruebas/glitch.txt), la línea  herramientas/foto_glitch_mapa.py [sufijo]
import base64, sys
SUF = sys.argv[2] if len(sys.argv) > 2 else ''
# name, camera x, z, height over the ground, look-at x, z, look-at height
VISTAS = [
    ('rotonda', 1560, 3440, 40, 1600, 3460, 0),
    ('rotonda_calle', 1585, 3470, 2.5, 1600, 3455, 3),
    ('tejado', -101, -433, 1.7, -90, -450, 6),
    ('tejado_arriba', -80, -400, 35, -101, -440, 0),
    ('canaveral', 220, -760, 3, 240, -780, 2),
    ('falta_edificio', -650, -380, 25, -667, -397, 0),
    ('doble_calzada', -4034, -345, 2.2, -4000, -345, 0),
    ('doble_calzada_arriba', -4050, -330, 30, -4030, -345, 0),
    ('pasarela', -3743, -293, 2.5, -3715, -290, 2),
    ('autopista_caida', 1856, 3140, 6, 1856, 3165, 0),
    ('enterrado', 1852, 3110, 2.5, 1860, 3118, 0.5),
    ('hueco_azul', -213, 40, 4, -213, 51, 0),
    ('trinidad', -117, 120, 30, -117, 160, 0),
]
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for n, x, z, h, tx, tz, th in VISTAS:
        await pg.evaluate("""([x,z,h,tx,tz,th])=>{ const D=__dbg, P=D.PLAYER; P.x=x+18; P.z=z+18; D.GAME.tod=12; __step(3);
          const cam=D.camera; cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(tx, D.heightAt(tx,tz)+th, tz);
          cam.updateMatrixWorld(); if (D.updateCityLOD) D.updateCityLOD(true); __step(1); cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(tx, D.heightAt(tx,tz)+th, tz); cam.updateMatrixWorld(); }""", [x, z, h, tx, tz, th])
        open('shots/glitch_%s%s.jpg' % (n, SUF), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO GLITCH OK', len(VISTAS))
