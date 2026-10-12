# Brújula en un punto concreto: pone al jugador en x z, marca un destino y dice si el aro se ve y a qué altura queda
# frente al suelo y al jugador; con «coche» al final, lo mismo subido a un coche. Uso: … sonda_guia.py x z [coche]
import base64, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3])
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    await pg.evaluate("([x,z])=>{const d=__dbg,P=d.PLAYER; P.x=x; P.z=z; __step(250); d.setWaypoint(x+60,z+80); __step(20);}", [x, z])
    if len(sys.argv) > 4: await pg.evaluate("(()=>{const d=__dbg,P=d.PLAYER; const c=new d.Car('sedan',0x3060c0,P.x+2.5,P.z,0); P.x=c.x+2; d.enterCar(c); __step(40);})()")
    print(await pg.evaluate("""JSON.stringify((()=>{const d=__dbg,P=d.PLAYER; const g=d.scene.children.find(o=>o.isGroup&&o.children.length>=2&&o.children[0].renderOrder>=2&&o.children[0].geometry&&o.children[0].geometry.type==='RingGeometry');
      return {found:!!g, vis:g&&g.visible, gy:g&&+g.position.y.toFixed(2), py:+P.y.toFixed(2), sc:g&&+g.scale.x.toFixed(2), state:d.GAME.state, interior:!!P.interior, low:!!P.low, blips:d.MISSIONS.blips().length};})())"""))
    open('shots/sonda_guia.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
