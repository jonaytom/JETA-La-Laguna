# Fotos desde arriba; entrada JSON [[tx,tz,cx,cz,h],...] como 2º argumento.
# Uso: cd tests && python run_test.py herramientas/foto_desde_arriba.py [entrada.json]
import sys
import base64, json
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
V=json.load(open(sys.argv[2] if len(sys.argv) > 2 else 'ab.json'))  # [tx,tz, cx,cz,h]
async def run(pg):
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i,(tx,tz,cx,cz,h) in enumerate(V):
        await pg.evaluate("([tx,tz,cx,cz,h])=>{const d=__dbg; d.PLAYER.x=tx; d.PLAYER.z=tz; __step(3); const y=d.heightAt(tx,tz); d.camera.position.set(cx,y+h,cz); d.camera.lookAt(tx,y-4,tz);}", [tx,tz,cx,cz,h])
        open(S+f'ab_{i}.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
