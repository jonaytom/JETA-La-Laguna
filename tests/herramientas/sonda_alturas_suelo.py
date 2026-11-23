# v1.4.47 (coche que se hunde o flota, se cae dentro de la autopista, aparcados enterrados): en cada sitio, por una
# rejilla de 5 × 5 puntos cada 3 m, la altura del terreno (heightAt), la del tablero o terraplén donde se apoya el coche
# (deckAt) y la del asfalto que se ve (rayo desde arriba a las mallas de calzada), y la diferencia entre lo que se ve y
# donde se apoyaría el coche. Uso: herramientas/sonda_alturas_suelo.py
import json
SITIOS = [('piki_flota', -1297, -50), ('caida_autopista', 1856, 3158), ('enterrado', 1859, 3117), ('doble_calzada', -4034, -345), ('se_hunde', 2262, 3616), ('flota', 1545, 2833)]
LOG = []
async def run(pg):
    for n, x, z in SITIOS:
        r = await pg.evaluate("""([x,z]) => { const D=__dbg, T=D.THREE, P=D.PLAYER; P.x=x+12; P.z=z+12; __step(3); if (D.updateCityLOD) D.updateCityLOD(true); __step(1);
          const rc=new T.Raycaster(), out=[]; rc.camera=D.camera; const meshes=[]; D.scene.traverse(o=>{ if(o.isMesh && !o.isSprite && !o.isSkinnedMesh && o.visible && o.geometry && o.geometry.attributes.position && o.geometry.attributes.position.array) meshes.push(o); });
          for (let a=-2;a<=2;a++) for (let b=-2;b<=2;b++) { const px=x+a*3, pz=z+b*3, g=D.heightAt(px,pz);
            rc.set(new T.Vector3(px, g+40, pz), new T.Vector3(0,-1,0));
            const hits=rc.intersectObjects(meshes, false).filter(h=>h.object.visible && h.object.isMesh && !h.object.isSkinnedMesh && !(h.object.material&&h.object.material.transparent) && h.point.y < g+12);
            const top = hits.length ? hits[0] : null;
            const dk = D.deckAt ? D.deckAt(px, pz, g+3, true, 2.2) : -1e9;
            const sup = Math.max(g, dk-0.12) + 0.17;
            out.push([a,b, +g.toFixed(2), dk>-1e8? +dk.toFixed(2):null, top? +top.point.y.toFixed(2):null, top? (top.object.name||top.object.type):null, top? +(top.point.y - (sup-0.17)).toFixed(2):null, hits.length]); }
          return JSON.stringify(out); }""", [x, z])
        L = json.loads(r)
        LOG.append('SITIO %s %d %d · [dx, dz, terreno, tablero, asfalto visto, malla, visto − apoyo, capas]' % (n, x, z))
        LOG.extend('   ' + str(row) for row in L)
        raros = [row for row in L if row[6] is not None and abs(row[6] - 0.16) > 0.12]
        print('SITIO', n, 'puntos raros', len(raros), raros[:6])
    open('shots/sonda_alturas_suelo.txt', 'w', encoding='utf-8').write(chr(10).join(LOG))
    print('SONDA ALTURAS OK')
