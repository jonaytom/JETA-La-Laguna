# Sonda de rendimiento (v0.77; «sin X» = ocultando X; «sin sinLOD» = enseñándolo todo, sin recorte por distancia): de dónde salen el tiempo de carga, las llamadas de dibujo y los triángulos.
#  1) cuánto tarda cada paso de la carga (window.__LOADT);
#  2) censo de la escena: mallas visibles por tipo (trozos de ciudad por material, coches aparcados, instanciadas,
#     sueltas agrupadas por material/nombre), con sus triángulos;
#  3) en 4 sitios (casco, La Trinidad, vista alta, aeropuerto): llamadas y triángulos de un fotograma, y cuánto bajan al
#     ocultar cada grupo o quitar las sombras (los ms aquí no valen: las pruebas pintan sin la tarjeta gráfica).
# Uso: cd tests && python run_test.py herramientas/sonda_rendimiento.py
import json
SITIOS = [[-60, -230, -10, -150, 1.7, 'casco'], [-200, 300, 300, -600, 120, 'alto']]
CENSO = """JSON.stringify((()=>{ /* v0.77 */ const d=__dbg, S=d.scene; const g={}; let n=0, sueltas=0;
  const tri=(m)=>{ const G=m.geometry; if(!G) return 0; const c=G.index?G.index.count:(G.attributes.position?G.attributes.position.count:0); return Math.round(c/3)*(m.isInstancedMesh?m.count:1); };
  S.traverse(o=>{ if(!o.isMesh||!o.visible) return; let p=o, vis=true; while(p){ if(!p.visible){vis=false;break;} p=p.parent; } if(!vis) return; n++;
    let k; if (o.name.startsWith('chunk:')) k=o.name; else if (o.name==='fusion') k='fusion'; else if (o.name==='inst') k='inst:celda'; else if (o.name==='parked') k='parked'; else if (o.isInstancedMesh) k='inst:'+(o.material.name||o.material.type)+':'+(o.geometry.type||''); else { sueltas++; let a=o.parent, nm=''; while(a&&a!==S){ if(a.name){nm=a.name;break;} a=a.parent; } k='suelta'+(d.LOD&&d.LOD.stats&&o.id>d.LOD.stats.ultimoId?'(después)':'')+':'+(nm||'-')+':'+(o.geometry.type||'')+':'+(o.material.type||''); }
    const e=g[k]||(g[k]=[0,0]); e[0]++; e[1]+=tri(o); });
  const big=[]; S.traverse(o=>{ if(!o.isMesh||!o.visible||o.isInstancedMesh||o.name) return; const t=tri(o); if(t>1500){ const p=o.getWorldPosition(o.position.clone()); let ch='', a=o.parent; while(a&&a!==S){ ch+=(a.type[0])+(a.name?'('+a.name+')':''); a=a.parent; } big.push([t, Math.round(p.x), Math.round(p.y), Math.round(p.z), o.geometry.type, (o.material.color?o.material.color.getHexString():''), ch]); } });
  big.sort((a,b)=>b[0]-a[0]);
  const L=Object.entries(g).sort((a,b)=>b[1][0]-a[1][0]); return { mallas:n, sueltas, grupos:L.slice(0,40), grandes:big.slice(0,25), ngrandes:big.length }; })())"""
MEDIR = """async ([n])=>{ const d=__dbg, R=d.renderer, gl=R.getContext(); const px=new Uint8Array(4); let t=0; R.info.autoReset=false;
  for (let i=0;i<n;i++){ R.info.reset(); const a=performance.now(); R.render(d.scene, d.camera); gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,px); t+=performance.now()-a; }
  const r={ ms:+(t/n).toFixed(1), llamadas:Math.round(R.info.render.calls/n), triangulos:Math.round(R.info.render.triangles/n) }; R.info.autoReset=true; return r; }"""
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    for x, z, lx, lz, h, nm in SITIOS:
        await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(4); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, lx, lz, h])
        base = await pg.evaluate(MEDIR, [1])
        out(f'== {nm}: {base}')
        # hide each group in turn: how much does it cost here?
        for grp in ['chunkall', 'chunk:trim', 'fusion', 'parked', 'inst', 'suelta', 'sombras', 'peds', 'coches', 'sinLOD']:
            r = await pg.evaluate("""async ([grp, n])=>{ const d=__dbg, S=d.scene; const hid=[]; let sh=null;
              if (grp==='sombras') { sh=d.renderer.shadowMap.enabled; d.renderer.shadowMap.enabled=false; } else if (grp==='sinLOD') { if (d.lodShowAll) d.lodShowAll(); }
              else S.traverse(o=>{ if(!o.isMesh||!o.visible) return; const ok = grp==='inst' ? o.isInstancedMesh : grp==='suelta' ? (!o.isInstancedMesh && !o.name.startsWith('chunk:') && o.name!=='parked' && o.name!=='fusion') : grp==='peds' || grp==='coches' || grp==='sinLOD' ? false : grp==='chunkall' ? o.name.startsWith('chunk:') : o.name===grp; if(ok){ o.visible=false; hid.push(o);} });
              if (grp==='peds') for (const p of d.PEDS) if (p.H && p.H.root.visible) { p.H.root.visible=false; hid.push(p.H.root); }
              if (grp==='coches') for (const c of d.CARS) if (c.mesh && c.mesh.visible) { c.mesh.visible=false; hid.push(c.mesh); }
              const R=d.renderer, gl=R.getContext(), px=new Uint8Array(4); let t=0; R.info.autoReset=false; for (let i=0;i<n;i++){ R.info.reset(); const a=performance.now(); R.render(S, d.camera); gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,px); t+=performance.now()-a; } const out={ n:hid.length, ms:+(t/n).toFixed(1), llamadas:Math.round(R.info.render.calls/n), triangulos:Math.round(R.info.render.triangles/n) }; R.info.autoReset=true;
              for (const o of hid) o.visible=true; if (sh!==null) d.renderer.shadowMap.enabled=sh; if (grp==='sinLOD' && d.updateCityLOD) d.updateCityLOD(true); return out; }""", [grp, 1])
            if r['n'] or grp in ('sombras', 'sinLOD'):
                out(f"   sin {grp:18s} ({r['n']:5d}): {r['ms']:6.1f} ms (−{base['ms'] - r['ms']:.1f})  llamadas {r['llamadas']} (−{base['llamadas'] - r['llamadas']})  tri {r['triangulos']} (−{base['triangulos'] - r['triangulos']})")
    out('== optimiza', await pg.evaluate("JSON.stringify(__dbg.LOD ? __dbg.LOD.stats : null)"), 'objetos LOD', await pg.evaluate("__dbg.LOD ? __dbg.LOD.items.length : 0"))
    lt = await pg.evaluate("JSON.stringify(window.__LOADT||[])")
    tot = 0
    out('== carga (ms por paso)')
    for nm, ms in json.loads(lt): tot += ms; out(f'  {ms:6d}  {nm}')
    out(f'  {tot:6d}  TOTAL')
    c = json.loads(await pg.evaluate(CENSO)); out('== censo: mallas visibles', c['mallas'], 'sueltas', c['sueltas'])
    for k, (n, t) in c['grupos']: out(f'  {n:6d} mallas {t:9d} tri  {k}')
    out('== sueltas grandes (más de 1500 tri):', c['ngrandes'])
    for g in c['grandes']: out('  ', g)
    open('shots/sonda_rendimiento.txt','w',encoding='utf-8').write('\n'.join(LOG))
    print('SONDA RENDIMIENTO OK')
