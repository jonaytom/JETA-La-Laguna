# Foto desde donde se quiera (v1.2.0; para comparar antes y después en los corredores): cámara en x y a «alto» m sobre el
# suelo, mirando al punto mx my (a su suelo). Uso: herramientas/foto_vista.py nombre x y alto mx my
# Foto en shots/vista_<nombre>.jpg.
import base64, sys
async def run(pg):
    name = sys.argv[2]; x, z, h, mx, mz = map(float, sys.argv[3:8])
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    await pg.evaluate("""([x,z,h,mx,mz])=>{ const d=__dbg, P=d.PLAYER, cam=d.camera; P.x=mx; P.z=mz; __step(3);
      cam.position.set(x, d.heightAt(x,z)+h, z); cam.lookAt(mx, d.heightAt(mx,mz), mz); cam.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }""", [x, z, h, mx, mz])
    open('shots/vista_%s.jpg' % name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO VISTA OK', name)
