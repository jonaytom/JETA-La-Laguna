# v1.4.50: fotos con la cámara libre: cada vista es «nombre,x,z,alto,mx,mz» (la cámara en X, Y a «alto» m sobre el suelo,
# mirando a MX, MY a la altura del suelo de allí). El jugador se pone debajo para que se cargue la zona. Hora: 11 h.
# Uso: herramientas/foto_camara.py nombre,x,z,alto,mx,mz [más vistas…]   Fotos en shots/cam_<nombre>.jpg
import sys, base64
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    for v in sys.argv[2:]:
        n, x, z, h, mx, mz = v.split(',')
        x, z, h, mx, mz = float(x), float(z), float(h), float(mx), float(mz)
        await pg.evaluate("([x,z]) => { const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; d.GAME.tod=11; __step(6); }", [mx, mz])
        await pg.evaluate("""([x,z,h,mx,mz]) => { const d=__dbg; d.camera.position.set(x, d.heightAt(x,z)+h, z); d.camera.lookAt(mx, d.heightAt(mx,mz), mz); d.camera.updateMatrixWorld(); __step(0); }""", [x, z, h, mx, mz])
        img = await pg.evaluate("window.__snap()")
        open('shots/cam_%s.jpg' % n, 'wb').write(base64.b64decode(img.split(',')[1]))
        print('foto', n)
