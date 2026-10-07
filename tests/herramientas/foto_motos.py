# Fotos de las motos con piloto (postura sentada).
# Uso: cd tests && python run_test.py herramientas/foto_motos.py [entrada.json]
import base64
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
async def run(pg):
    await pg.evaluate(r"""(()=>{ const d=__dbg; window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.state='play'; d.GAME.tod=13; __step(2);
      const P=d.PLAYER; const x0=P.x+3, z0=P.z; const ms=[]; for (const id of ['vespa','z900','pcx']) { const m=d.VMODELS[id]||Object.values(d.VMODELS).find(v=>v.phys==='moto'&&v.base===id); if(!m) continue; const c=new d.Car(null,0xc0392b,x0+ms.length*2.2,z0,Math.PI/2,m); c.mode='physics'; c.driver='ai'; ms.push(c); }
      for(let i=0;i<20;i++){ for(const c of ms) c.sync(1/30); }
      const y=d.heightAt(x0,z0); d.camera.fov=30; d.camera.updateProjectionMatrix(); d.camera.position.set(x0+2.2, y+1.3, z0-6); d.camera.lookAt(x0+2.2, y+0.9, z0); window.__ms=ms.map(c=>c.model.id); })()""")
    print(await pg.evaluate("JSON.stringify(window.__ms)"))
    open(S+'moto.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
