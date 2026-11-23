# v1.4.47 (Jonay: «sigue flotando… hay que ver la altura del coche porque no se ajusta»; otras veces se hunde): cada
# modelo puesto en una calle llana; el punto más bajo de sus ruedas (en el mundo) frente al asfalto que se ve debajo (rayo
# desde arriba). Positivo = flota, negativo = se hunde. Salida: shots/sonda_ruedas_suelo.txt
import json
async def run(pg):
    r = await pg.evaluate("""() => { const D=__dbg, T=D.THREE, out=[];
      // a flat stretch of ordinary street: the first edge of the traffic graph on a residential street at ground level
      const x0 = -1297, z0 = -50; D.PLAYER.x = x0 + 20; D.PLAYER.z = z0 + 20; __step(3); if (D.updateCityLOD) D.updateCityLOD(true); __step(1);
      const meshes=[]; D.scene.traverse(o=>{ if(o.isMesh && !o.isSprite && !o.isSkinnedMesh && o.visible && o.geometry && o.geometry.attributes.position && o.geometry.attributes.position.array) meshes.push(o); });
      const rc=new T.Raycaster(); rc.camera=D.camera;
      const ids = Object.keys(D.VMODELS).filter(k => !/L$/.test(k) && D.VMODELS[k].lod !== undefined);
      let i = 0;
      for (const id of ids) {
        const m = D.VMODELS[id]; if (!m || m.phys === 'moto') continue;
        const x = x0 + (i % 2) * 0.01, z = z0; i++;
        const car = new D.Car(null, null, x, z, 0, m); car.mode = 'parked'; car.sync && car.sync(0.016); car.sync && car.sync(0.016); car.mesh.updateMatrixWorld(true);
        const B = new T.Box3(); let low = 1e9;
        for (const w of car.wheels || []) { const o = w.w || w.piv || w.mesh; if (!o || !o.isObject3D) continue; o.updateMatrixWorld(true); B.setFromObject(o); low = Math.min(low, B.min.y); }
        const bodyB = new T.Box3().setFromObject(car.body || car.mesh);
        rc.set(new T.Vector3(x, car.mesh.position.y + 20, z), new T.Vector3(0,-1,0));
        const hit = rc.intersectObjects(meshes, false).find(h => h.point.y < car.mesh.position.y + 2);
        out.push([id, m.name, hit ? +(low - hit.point.y).toFixed(3) : null, +(bodyB.min.y - (hit ? hit.point.y : 0)).toFixed(3), +car.mesh.position.y.toFixed(2), hit ? +hit.point.y.toFixed(2) : null]);
        car.remove && car.remove(); D.scene.remove(car.mesh);
      }
      return JSON.stringify(out); }""")
    L = json.loads(r)
    open('shots/sonda_ruedas_suelo.txt', 'w', encoding='utf-8').write('\n'.join(str(x) for x in L))
    v = [x[2] for x in L if x[2] is not None]
    print('RUEDAS', len(L), 'modelos · rueda − asfalto: min', min(v), 'max', max(v), 'media', round(sum(v) / len(v), 3))
    print('FLOTAN >4cm', [(x[0], x[2]) for x in L if x[2] is not None and x[2] > 0.04])
    print('REJILLA', await pg.evaluate("() => window.__csurf ? window.__csurf.size + ' baldosas, ' + (window.__csurf.size * 0.8 / 1000).toFixed(1) + ' MB' : 'no'"))
    print('SE HUNDEN <-3cm', [(x[0], x[2]) for x in L if x[2] is not None and x[2] < -0.03])
