# Isletas cebreadas de las glorietas y cuñas donde una calzada se abre o se junta (v1.3.5, 04f_cebreados.js): cuántas hay,
# dónde, y fotos desde arriba de unas cuantas: shots/ceb_<n>.jpg. Uso: herramientas/sonda_cebreados.py [cuántas fotos]
import base64, json, sys
async def run(pg):
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 8
    r = json.loads(await pg.evaluate("JSON.stringify(window.__ceb || null)"))
    if not r: print('sin __ceb'); return
    print('isletas', r['isletas'], 'cuñas', r['cunas'])
    for t in r['tramos']: print(' ', t)
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    sel = [t for t in r['tramos'] if t[0] == 'isleta'][: n // 2] + [t for t in r['tramos'] if t[0] != 'isleta'][: n - n // 2]
    for i, t in enumerate(sel):
        x, z = t[3], t[4]
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x-8, y+26, z+8); d.camera.lookAt(x, y, z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z])
        open('shots/ceb_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
        print('foto', i, t)
    print('SONDA CEBREADOS OK')
