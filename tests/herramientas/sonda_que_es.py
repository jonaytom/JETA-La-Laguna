# v1.4.47: qué malla hay en un punto de la pantalla: pone la cámara en x z (alto h) mirando a mx mz (alto mh) y lanza
# rayos por una rejilla de la pantalla; dice tipo, nombre, material, color, textura y userData de lo que toca cada uno.
# Uso: herramientas/sonda_que_es.py x z h mx mz mh
import sys, json
async def run(pg):
    x, z, h, mx, mz, mh = map(float, sys.argv[2:8])
    r = await pg.evaluate("""([x,z,h,mx,mz,mh]) => { const D=__dbg, T=D.THREE, P=D.PLAYER; P.x=x+15; P.z=z+15; D.GAME.tod=12; __step(3);
      const cam=D.camera; cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(mx, D.heightAt(mx,mz)+mh, mz); cam.updateMatrixWorld();
      if (D.updateCityLOD) D.updateCityLOD(true); __step(1); cam.position.set(x, D.heightAt(x,z)+h, z); cam.lookAt(mx, D.heightAt(mx,mz)+mh, mz); cam.updateMatrixWorld();
      const rc=new T.Raycaster(), out={};
      for (let sx=-0.8; sx<=0.81; sx+=0.4) for (let sy=-0.8; sy<=0.81; sy+=0.4) {
        rc.setFromCamera(new T.Vector2(sx, sy), cam);
        const hit=rc.intersectObjects(D.scene.children, true).find(i=>i.object.visible && !(i.object.material && i.object.material.transparent && i.object.material.opacity<0.2));
        if (!hit) { out[sx.toFixed(1)+','+sy.toFixed(1)]='cielo'; continue; }
        const o=hit.object, m=Array.isArray(o.material)?o.material[0]:o.material, chain=[]; let p=o.parent; while(p && p!==D.scene && chain.length<4){ chain.push(p.type+(p.name?':'+p.name:'')); p=p.parent; }
        out[sx.toFixed(1)+','+sy.toFixed(1)] = [o.type, o.name||'', m&&m.type, m&&m.color&&m.color.getHexString(), m&&m.map&&(m.map.name||m.map.uuid.slice(0,6)), Object.keys(o.userData||{}).join('/'), chain.join('<'), hit.point.x.toFixed(1)+','+hit.point.y.toFixed(1)+','+hit.point.z.toFixed(1), o.geometry&&o.geometry.attributes.position.count].join(' | ');
      }
      return JSON.stringify(out); }""", [x, z, h, mx, mz, mh])
    for k, v in json.loads(r).items(): print('RAYO', k, v)
    print('SONDA QUE ES OK')
