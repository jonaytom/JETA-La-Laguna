# Flecha guía: marca un destino y fotografía al jugador a pie y en coche con la flecha. Uso: cd tests && python run_test.py herramientas/foto_guia.py
import base64
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    await pg.evaluate("(()=>{const d=__dbg, P=d.PLAYER; d.setWaypoint(P.x+250, P.z+120); __step(30);})()")
    print(await pg.evaluate("JSON.stringify({vis:__dbg.GUIDE && __dbg.scene.children.some(o=>o.isGroup&&o.children.length===2&&o.children[0].renderOrder===2&&o.visible)})"))
    open('shots/guia_pie.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    await pg.evaluate("(()=>{const d=__dbg, P=d.PLAYER; const c=new d.Car('sedan',0x3060c0,P.x+2.5,P.z,0); P.x=c.x+2; d.enterCar(c); __step(40);})()")
    open('shots/guia_coche.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
