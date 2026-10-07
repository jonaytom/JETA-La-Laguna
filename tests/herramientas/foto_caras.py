# Fila de caras de las tallas de cuerpo (morphs de papada/mejillas).
# Uso: cd tests && python run_test.py herramientas/foto_caras.py [entrada.json]
import base64
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
async def run(pg):
    await pg.evaluate(r"""(()=>{ const d=__dbg; window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.state='play'; d.GAME.tod=13; __step(2);
      const P=d.PLAYER; const x0=P.x, z0=P.z; d.playerHuman.root.visible=false; const y=d.heightAt(x0,z0);
      ['normal','fat','extraFat','superFat'].forEach((n,i)=>{ const H=d.makeHuman({build:{size:n}, female:false, shirt:0xffffff, pants:0x2b3a55, hairStyle:'Hair_Buzzed'}); H.root.position.set(x0+(i-1.5)*0.55, y, z0); H.root.rotation.y=Math.PI; d.scene.add(H.root); d.animHuman(H,0.016,0); });
      d.camera.fov=14; d.camera.updateProjectionMatrix(); d.camera.position.set(x0, y+1.62, z0-5.5); d.camera.lookAt(x0, y+1.58, z0); })()""")
    open(S+'faces.jpg','wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
