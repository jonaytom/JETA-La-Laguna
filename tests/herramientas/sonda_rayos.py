# ¿Qué es lo que se ve ahí? (v1.1.8): pone la cámara en x y (a 1,7 m, mirando hacia «rumbo» grados: 0 = +Y, 90 = +X) y lanza
# rayos por una rejilla de la pantalla. De cada cosa que tocan a más de «altura» m sobre el suelo y fuera de los edificios
# dice el material (clave de MAT o color), la función que la añadió (con window.__ORIGEN: va en la lista «origen»), el
# punto y la distancia. Foto en shots/rayos_<x>_<y>_<rumbo>.jpg.
# Uso: herramientas/sonda_rayos.py x y rumbo [altura]
import base64, json, math, sys
async def run(pg):
    x, z, yaw = float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4])
    up = float(sys.argv[5]) if len(sys.argv) > 5 else 5
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    r = json.loads(await pg.evaluate("""([x,z,yaw,up])=>JSON.stringify((()=>{ const d=__dbg, T=d.THREE, P=d.PLAYER, cam=d.camera; P.x=x; P.z=z; __step(3);
      const a=yaw*Math.PI/180, y=d.heightAt(x,z); cam.position.set(x, y+1.7, z); cam.lookAt(x+Math.sin(a)*20, y+6, z+Math.cos(a)*20); cam.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true);
      const M=d.MATS, key=new Map(); for (const k in M) key.set(M[k], k); const rc=new T.Raycaster(), out={}; const L=[], F=[], bx=new T.Box3(), vp=new T.Vector3(); d.scene.traverse((o)=>{ if (!o.isMesh || !o.visible) return; const pa=o.geometry && o.geometry.attributes.position; const G=o.geometry; if (pa && Object.values(G.attributes).every((a)=>a.array && a.array.length) && (!G.index || G.index.array)) L.push(o); else if (pa) F.push(o); });
      for (let j=0;j<16;j++) for (let i=0;i<30;i++) { rc.setFromCamera(new T.Vector2(-1+(i+0.5)/15, 1-(j+0.5)/8), cam); const h=rc.intersectObjects(L, false).find(q=>q.object.visible && q.object.isMesh && q.distance < 200);
        for (const o of F) { bx.setFromObject(o); if (bx.isEmpty() || bx.max.x-bx.min.x > 60 || bx.max.z-bx.min.z > 60) continue; const ip=rc.ray.intersectBox(bx, vp); if (!ip) continue; const dist=ip.distanceTo(rc.ray.origin); if (h && dist > h.distance) continue; const g=d.heightAt(ip.x, ip.z); if (bx.min.y < g+up) continue;
          let q=o, who=''; while (q && !who) { who=q.__origen||''; q=q.parent; } const m=Array.isArray(o.material)?o.material[0]:o.material; const k='(caja, sin posiciones) ' + (key.get(m)||('?'+(m&&m.color?m.color.getHexString():''))) + ' | ' + (who||'(sin origen)') + ' | ' + (o.name||'');
          const e=out[k]||(out[k]={ n:0, ej:[] }); e.n++; if (e.ej.length<5) e.ej.push([Math.round(ip.x), Math.round(ip.z), Math.round((bx.min.y-g)*10)/10, Math.round(dist)]); }
        if (!h) continue; const p=h.point, g=d.heightAt(p.x,p.z); if (p.y < g+up || d.inAnyBuilding(p.x,p.z)) continue; const o=h.object, m=Array.isArray(o.material)?o.material[0]:o.material;
        let q=o, who=''; while (q && !who) { who=q.__origen||''; q=q.parent; }
        const k=(key.get(m)||('?'+(m&&m.color?m.color.getHexString():''))) + ' | ' + (who||'(sin origen)') + ' | ' + (o.name||'');
        const e=out[k]||(out[k]={ n:0, ej:[] }); e.n++; if (e.ej.length<5) e.ej.push([Math.round(p.x), Math.round(p.z), Math.round((p.y-g)*10)/10, Math.round(h.distance)]); }
      return out; })())""", [x, z, yaw, up]))
    lines = [f'rayos desde X {x:g}, Y {z:g}, rumbo {yaw:g}° (cosas a más de {up:g} m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])']
    for k, e in sorted(r.items(), key=lambda kv: -kv[1]['n']): lines.append(f'  {e["n"]:4d}  {k}   {e["ej"]}')
    txt = '\n'.join(lines); print(txt)
    open('shots/rayos_%d_%d_%d.txt' % (x, z, yaw), 'w', encoding='utf-8').write(txt)
    open('shots/rayos_%d_%d_%d.jpg' % (x, z, yaw), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('SONDA RAYOS OK')
