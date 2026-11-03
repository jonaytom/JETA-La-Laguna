# Huella de los grupos sueltos que más se pintan (v1.0.0): para los 30 hijos de la escena con más mallas sueltas,
# cuántas llamadas de dibujo se ahorran al ocultarlo (en un fotograma real, desde 3 sitios), qué tienen dentro (tipos de
# geometría, colores de material, nombres de los hijos), dónde están sus piezas y si se crearon después de juntar la
# ciudad (optimizeCity). Uso: herramientas/sonda_grupos2.py en una lista → shots/sonda_grupos2.txt
import json
SITIOS = [[None, None, None, None, None], [-60, -230, -10, -150, 1.7], [-200, 300, 300, -600, 120]]
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3); if (__dbg.updateCityLOD) __dbg.updateCityLOD(true);})()")
    tot = {}
    for si, (x, z, lx, lz, h) in enumerate(SITIOS):
        if x is not None:
            await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(4); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, lx, lz, h])
        r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.scene, R=d.renderer, last=d.LOD&&d.LOD.stats&&d.LOD.stats.ultimoId;
          const calls=()=>{ R.info.autoReset=false; R.info.reset(); R.render(S, d.camera); const c=R.info.render.calls; R.info.autoReset=true; return c; };
          const base=calls(); const rows=[];
          S.children.forEach((o,ci)=>{ if (o.name && o.name!=='root') return; if (!o.visible) return; let n=0; o.traverse(m=>{ if(m.isMesh&&!m.isInstancedMesh) n++; }); if (n<4) return;
            o.visible=false; const c=calls(); o.visible=true; if (base-c<3) return;
            const geo={}, col={}, nm={}; let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9, after=0, sh=0; const v=new d.THREE.Vector3();
            o.traverse(m=>{ if(m.name) nm[m.name]=(nm[m.name]||0)+1; if(!m.isMesh) return; const g=m.geometry.type; geo[g]=(geo[g]||0)+1; const mt=[].concat(m.material)[0]; const k=(mt.color?mt.color.getHexString():'-')+(mt.map?'+tex':''); col[k]=(col[k]||0)+1; m.getWorldPosition(v); x0=Math.min(x0,v.x); x1=Math.max(x1,v.x); z0=Math.min(z0,v.z); z1=Math.max(z1,v.z); if(last&&m.id>last) after++; if(m.castShadow) sh++; });
            const top=(e)=>Object.entries(e).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,n])=>k+'×'+n).join(' ');
            rows.push({ci, ahorra:base-c, n, after, sh, geo:top(geo), col:top(col), nm:top(nm), caja:[Math.round(x0),Math.round(x1),Math.round(z0),Math.round(z1)], ud:Object.keys(o.userData||{}).join(',')}); });
          rows.sort((a,b)=>b.ahorra-a.ahorra); return {base, rows:rows.slice(0,30)}; })())"""))
        out(f"== sitio {si}: {r['base']} llamadas")
        for e in r['rows']:
            out(f"  hijo {e['ci']:5d}: −{e['ahorra']:4d} llamadas · {e['n']} mallas ({e['after']} hechas después de juntar, {e['sh']} con sombra) · caja X {e['caja'][0]}..{e['caja'][1]} Y {e['caja'][2]}..{e['caja'][3]} · {e['geo']} · colores {e['col']} · nombres {e['nm']} · userData {e['ud']}")
    open('shots/sonda_grupos2.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA GRUPOS2 OK')
