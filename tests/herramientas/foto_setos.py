# v1.4.47: las jardineras con los setos nuevos (boj, buganvilla, flor amarilla; DATA.ARB.seto) y el árbol de calle en el
# juego. Por cada tipo de seto, una foto de cerca de una jardinera (shots/setos_<tipo>.jpg) y otra más alta de la calle
# (shots/setos_<tipo>_calle.jpg). Uso: cd tests && python run_test.py herramientas/foto_setos.py
import base64

async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    sitios = await pg.evaluate("""()=>{ const out=[], m4=new __dbg.THREE.Matrix4(), v=new __dbg.THREE.Vector3();
      const P=__dbg.PLAYER, seen={};
      __dbg.scene.traverse(o=>{ const k=o.isInstancedMesh && o.geometry.userData.seto; if(!k) return;
        for(let i=0;i<o.count;i++){ o.getMatrixAt(i,m4); v.setFromMatrixPosition(m4); const d=Math.hypot(v.x-P.x,v.z-P.z);
          if(!seen[k] || d<seen[k][3]) seen[k]=[k, v.x, v.z, d]; } });
      return Object.values(seen); }""")
    print('SETOS', sitios)
    for k, x, z, n in sitios:
        for suf, d, h in (('', 3.2, 1.7), ('_calle', 9, 4)):
            await pg.evaluate("""([x,z,d,h])=>{ const D=__dbg, P=D.PLAYER, cam=D.camera; P.x=x+40; P.z=z+40; __step(3);
              const cx=x+d*0.8, cz=z+d*0.6; cam.position.set(cx, D.heightAt(cx,cz)+h, cz); cam.lookAt(x, D.heightAt(x,z)+0.7, z);
              cam.updateMatrixWorld(); if (D.updateCityLOD) D.updateCityLOD(true); }""", [x, z, d, h])
            open('shots/setos_%s%s.jpg' % (k, suf), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO SETOS OK', len(sitios))
