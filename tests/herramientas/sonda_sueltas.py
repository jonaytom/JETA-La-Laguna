# Censo de las mallas «sueltas» que se pintan (v1.0.0): las que no están en los trozos de ciudad (chunk:*), ni juntadas
# (fusion), ni instanciadas. La sonda de pintado con GPU dice que son ~2.600 mallas y ~1.400–2.000 llamadas de dibujo, y
# que quitarlas baja el fotograma de ~30 a ~13 ms: aquí se ve qué son, para juntarlas.
# Por grupo (el antepasado con nombre más alto bajo la escena), cuántas mallas, llamadas (materiales), triángulos,
# cuántas son animadas (con huesos o que se mueven), materiales distintos y si están en el recorte por distancia (LOD).
# Uso: en una lista de scripts/pruebas/, la línea  herramientas/sonda_sueltas.py   → shots/sonda_sueltas.txt
import json
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3); if (__dbg.updateCityLOD) __dbg.updateCityLOD(true);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.scene, g={}; const lodSet=new Set((d.LOD&&d.LOD.items||[]).map(it=>it.m));
      const terr=S.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.index).sort((a,b)=>b.geometry.index.count-a.geometry.index.count)[0];
      const tri=(m)=>{ const G=m.geometry; if(!G) return 0; const c=G.index?G.index.count:(G.attributes.position?G.attributes.position.count:0); return Math.round(c/3)*(m.isInstancedMesh?m.count:1); };
      const visible=(o)=>{ let p=o; while(p){ if(!p.visible) return false; p=p.parent; } return true; };
      const top=(o)=>{ let a=o, nm='', path=[]; while(a&&a.parent&&a.parent!==S){ a=a.parent; if(a.name) { nm=a.name; } } return nm || (a&&a.name) || '(sin nombre: ' + (a&&a.type) + ')'; };
      S.traverse(o=>{ if(!o.isMesh||o.isInstancedMesh||o===terr) return; if(o.name.startsWith('chunk:')||o.name==='fusion'||o.name==='parked'||o.name==='inst') return; if(!visible(o)) return;
        const k=top(o); const e=g[k]||(g[k]={n:0,calls:0,tri:0,skin:0,mats:new Set(),geos:new Set(),lod:0,sombra:0,auto:0,tipos:{}});
        const nm=Array.isArray(o.material)?o.material.length:1; e.n++; e.calls+=nm; e.tri+=tri(o); if(o.isSkinnedMesh) e.skin++; [].concat(o.material).forEach(m=>e.mats.add(m.uuid)); e.geos.add(o.geometry.uuid);
        let p=o; while(p&&p!==S){ if(lodSet.has(p)) { e.lod++; break; } p=p.parent; } if(o.castShadow) e.sombra++; if(o.matrixAutoUpdate) e.auto++; const t=o.geometry.type+'/'+[].concat(o.material)[0].type; e.tipos[t]=(e.tipos[t]||0)+1; });
      const L=Object.entries(g).map(([k,e])=>({k, n:e.n, calls:e.calls, tri:e.tri, skin:e.skin, mats:e.mats.size, geos:e.geos.size, lod:e.lod, sombra:e.sombra, auto:e.auto, tipos:Object.entries(e.tipos).sort((a,b)=>b[1]-a[1]).slice(0,4)}));
      L.sort((a,b)=>b.calls-a.calls); return L; })())"""))
    tot = [0, 0, 0]
    for e in r: tot[0] += e['n']; tot[1] += e['calls']; tot[2] += e['tri']
    out(f'== sueltas visibles: {tot[0]} mallas, {tot[1]} llamadas, {tot[2]} tri, en {len(r)} grupos')
    out('  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos')
    for e in r[:60]:
        out(f"  {e['n']:6d} {e['calls']:8d} {e['tri']:8d} {e['skin']:6d} {e['mats']:4d} {e['geos']:5d} {e['lod']:4d} {e['sombra']:6d} {e['auto']:5d}  {e['k']} · " + ', '.join(f'{t} {n}' for t, n in e['tipos']))
    st = json.loads(await pg.evaluate("JSON.stringify(__dbg.LOD && __dbg.LOD.stats ? { no: __dbg.LOD.stats.no, ej: __dbg.LOD.stats.ejemplos, juntadas: __dbg.LOD.stats.juntadas, mallas: __dbg.LOD.stats.mallas } : null)"))
    if st:
        out('== al juntar la ciudad: juntadas', st['juntadas'], 'en', st['mallas'], 'mallas; sin juntar, por motivo:')
        for k, n in sorted(st['no'].items(), key=lambda kv: -kv[1]): out(f'  {n:6d}  {k}  · p. ej. ' + ' '.join(f'X {e[0]}, Y {e[1]} ({e[2]})' for e in (st['ej'] or {}).get(k, [])[:4]))
    # the top-level meshes that are drawn loose: what they are
    tm = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.scene, out={}; for (const o of S.children) { if (!o.isMesh || o.isInstancedMesh || !o.visible || o.name) continue; const mt=[].concat(o.material)[0];
      const k=o.geometry.type+' · '+mt.type+(mt.transparent?' transparente':'')+(Object.keys(o.userData).length?' userData:'+Object.keys(o.userData).slice(0,3).join(','):'')+(o.children.length?' con hijos':'')+(!o.frustumCulled?' siempre visible':'')+(o.onBeforeRender!==d.THREE.Mesh.prototype.onBeforeRender?' onBeforeRender':''); const e=out[k]||(out[k]={n:0,ej:[]}); e.n++; if(e.ej.length<3) e.ej.push([Math.round(o.position.x),Math.round(o.position.z)]); } return Object.entries(out).sort((a,b)=>b[1].n-a[1].n).slice(0,25); })())"""))
    out('== mallas sueltas colgadas de la escena, por tipo')
    for k, e in tm: out(f"  {e['n']:5d}  {k}  · p. ej. " + ' '.join(f'X {x}, Y {z}' for x, z in e['ej']))
    open('shots/sonda_sueltas.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA SUELTAS OK')
