# Pasos de cebra y cebreados sin otras marcas debajo (v1.4.0; Jonay: «donde haya un paso de peatones o zonas con cebrado
# no puede quedar debajo otras marcas viales como flechas o separaciones de carril»): cuántas zonas «limpias» hay, cuántas
# flechas/STOP/ceda se han quitado de ellas, y fotos desde cerca de unos pasos de cebra (shots/paso_<n>.jpg).
# Uso: herramientas/sonda_pasos_cebra.py [fotos]
import base64, json, sys
async def run(pg):
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 6
    r = json.loads(await pg.evaluate("JSON.stringify({c: (window.__clear||[]).length, q: window.__clearQuitadas||0, z: (window.__clear||[]).filter(k=>k[4]>1.6 && k[4]<2.2).map(k=>k.map(v=>Math.round(v*100)/100))})"))
    print('zonas limpias', r['c'], 'marcas quitadas de ellas', r['q'], 'pasos de cebra', len(r['z']))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    step = max(1, len(r['z']) // n)
    for i, k in enumerate(r['z'][::step][:n]):
        x, z, dx, dz = k[0], k[1], k[2], k[3]
        await pg.evaluate("([x,z,dx,dz])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x-dx*12, y+7, z-dz*12); d.camera.lookAt(x, y, z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, dx, dz])
        open('shots/paso_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
        print('foto', i, round(x), round(z))
    print('SONDA PASOS OK')
