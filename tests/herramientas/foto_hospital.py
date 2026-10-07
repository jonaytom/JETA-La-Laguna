# Fotos del HUC (tres vistas) y de la puerta de cada centro de salud / urgencias (HEALTH).
# Uso: cd tests && python run_test.py herramientas/foto_hospital.py   → shots/huc_<n>.jpg, shots/salud_<n>.jpg
import base64, json, os
async def snap(pg, name): open('shots/' + name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    os.makedirs('shots', exist_ok=True)
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    H = json.loads(await pg.evaluate("JSON.stringify({huc: __dbg.HUC, health: __dbg.HEALTH})")); print(json.dumps(H))
    if H['huc'].get('ok'):
        cx, cz = H['huc']['cx'], H['huc']['cz']
        for i, (ox, oz, h) in enumerate([(160, 120, 60), (-150, 140, 45), (60, -170, 35), (0, 90, 12)]):
            await pg.evaluate("([cx,cz,ox,oz,h])=>{const d=__dbg; d.PLAYER.x=cx+ox*0.5; d.PLAYER.z=cz+oz*0.5; __step(3); const y=d.heightAt(cx,cz); d.camera.fov=55; d.camera.updateProjectionMatrix(); d.camera.position.set(cx+ox, y+h, cz+oz); d.camera.lookAt(cx, y+22, cz);}", [cx, cz, ox, oz, h])
            await snap(pg, f'huc_{i}.jpg')
    for i, p in enumerate(H['health']):
        await pg.evaluate("([x,z,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.fov=60; d.camera.updateProjectionMatrix(); d.camera.position.set(x+Math.sin(h)*9, y+3, z+Math.cos(h)*9); d.camera.lookAt(x-Math.sin(h)*4, y+3, z-Math.cos(h)*4);}", [p['x'], p['z'], p['h']])
        await snap(pg, f'salud_{i}.jpg')
