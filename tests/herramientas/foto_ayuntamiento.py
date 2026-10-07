# Tres vistas de la fachada del Ayuntamiento.
# Uso: cd tests && python run_test.py herramientas/foto_ayuntamiento.py [entrada.json]
import base64, json
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
async def run(pg):
    r = await pg.evaluate("JSON.stringify(__dbg.AYTO)")
    print('AYTO', r)
    A = json.loads(r)
    if not A or not A.get('ok'): return
    fx, fz = A['front']; nx, nz, ux, uz = A['nx'], A['nz'], A['ux'], A['uz']
    views = [(fx+nx*14+ux*6, fz+nz*14+uz*6, 3.0), (fx+nx*9-ux*8, fz+nz*9-uz*8, 2.0), (fx+nx*4, fz+nz*4, 1.7)]
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    for i,(cx,cz,h) in enumerate(views):
        await pg.evaluate("([cx,cz,h,fx,fz])=>{const d=__dbg; d.PLAYER.x=fx; d.PLAYER.z=fz; __step(3); const y=d.heightAt(fx,fz); d.camera.fov=55; d.camera.updateProjectionMatrix(); d.camera.position.set(cx,y+h,cz); d.camera.lookAt(fx,y+5.5,fz);}", [cx,cz,h,A['door'][0],A['door'][1]])
        open(S+f'ay_{i}.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
