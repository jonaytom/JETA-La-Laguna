# v1.4.50: lo que hay alto bajo un puente cerca de un punto: farolas (LAMPS), árboles (TREES), y las mallas altas (más de 4 m)
# cuyo pie está a menos de R m, con la altura del tablero encima (deckAt). Uso: herramientas/sonda_bajo_puente.py x z [R]
import sys, json
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 25
    r = await pg.evaluate("""([x,z,R]) => { const D=__dbg, out={quitados: window.__bajoPuentes, mallas: []};
      const T=new D.THREE.Vector3(), B=new D.THREE.Box3();
      D.scene.traverse(o=>{ if (!o.isMesh || o.isInstancedMesh) return; o.updateWorldMatrix(true,false); B.setFromObject(o); if (B.isEmpty()) return;
        const cx=(B.min.x+B.max.x)/2, cz=(B.min.z+B.max.z)/2, h=B.max.y-B.min.y;
        if (h>4 && B.max.x-B.min.x<3 && B.max.z-B.min.z<3 && Math.hypot(cx-x,cz-z)<R) { const g=D.heightAt(cx,cz); out.mallas.push([o.name||o.parent&&o.parent.name||'', Math.round(cx), Math.round(cz), +(B.min.y-g).toFixed(1), +(B.max.y-g).toFixed(1), +(D.deckAt(cx,cz,B.max.y+1)-g).toFixed(1)]); } });
      out.farolas = D.LAMPS.filter(l=>Math.hypot(l[0]-x,l[1]-z)<R).map(l=>{ const g=D.heightAt(l[0],l[1]); return [Math.round(l[0]),Math.round(l[1]), +(D.deckAt(l[0],l[1],g+10)-g).toFixed(1)]; });
      return JSON.stringify(out); }""", [x, z, R])
    print('BAJO_PUENTE', r)
