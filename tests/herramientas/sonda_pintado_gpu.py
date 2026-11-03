# Sonda de pintado CON LA TARJETA GRÁFICA (v1.0.0). Va en una lista de pruebas; como su nombre acaba en «_gpu»,
# run_varios.py abre el navegador con la GPU (Direct3D 11) y la calidad «alta» (Jonay, 3-nov: el objetivo es 1080p a
# 60 fps, 16,7 ms, con todo al máximo). En varios sitios pinta a 1920x1080 (con la resolución x1,5 de «alta») esperando
# a la GPU (gl.finish) y da la mediana de 40 fotogramas:
#   - el total y lo que cuesta solo mandar el trabajo (sin esperar a la GPU);
#   - el mismo fotograma a 480x270: si tarda casi lo mismo, lo que pesa son las mallas y las llamadas, no los píxeles;
#   - sin cada grupo (terreno, trozos de ciudad por material, piezas juntadas, instanciadas, aparcados, sueltas, gente,
#     coches, fondo), sin sombras, con sombras de 1024 («media»), con resolución x1 en vez de x1,5 y con el terreno en un
#     material simple (lo que cuesta su sombreador).
# Todo en shots/sonda_pintado_gpu.txt. Uso: en una lista de scripts/pruebas/, la línea  herramientas/sonda_pintado_gpu.py
import json, sys
SITIOS = [  # x, y (z del código), mirar a x, y, altura de la cámara sobre el suelo, nombre
    [None, None, None, None, None, 'inicio (vista del auditor)'],
    [-60, -230, -10, -150, 1.7, 'casco a pie'],
    [-88, 22, -112, 95, 1.7, 'La Trinidad a pie'],
    [-200, 300, 300, -600, 120, 'vista alta'],
    [-1937, -232, -1800, -220, 4, 'autopista'],
]
MEDIR = """async ([W, H, n, finish])=>{ const d=__dbg, R=d.renderer, gl=R.getContext(), [bs, bc]=window.__bg; const pr=R.getPixelRatio();
  R.setSize(W, H, false); const t=[]; R.info.autoReset=false; let calls=0, tris=0;
  for (let i=0;i<n+8;i++){ R.info.reset(); const a=performance.now(); R.clear(); R.render(bs, bc); R.clearDepth(); R.render(d.scene, d.camera); if (finish) gl.finish(); const e=performance.now()-a; if (i>=8) { t.push(e); calls+=R.info.render.calls; tris+=R.info.render.triangles; } }
  R.info.autoReset=true; R.setSize(640, 360, false); t.sort((a,b)=>a-b);
  return { ms:+t[t.length>>1].toFixed(2), llamadas:Math.round(calls/n), tri:Math.round(tris/n) }; }"""
# what to switch off (and back on) for one measurement; returns a function that undoes it
QUITAR = """([grp])=>{ const d=__dbg, S=d.scene, R=d.renderer, hid=[]; window.__undo=null; let n=0;
  const terr = S.children.find(o=>o.name==='terreno') || S.children.filter(o=>o.isMesh&&o.geometry&&o.geometry.index).sort((a,b)=>b.geometry.index.count-a.geometry.index.count)[0];
  const sun = (()=>{ let s=null; S.traverse(o=>{ if(o.isDirectionalLight&&o.castShadow) s=o; }); return s; })();
  const ocultar=(f)=>{ S.traverse(o=>{ if(o.visible && f(o)){ o.visible=false; hid.push(o); } }); };
  const loose=(o)=>o.isMesh && !o.isInstancedMesh && o!==terr && !o.name.startsWith('chunk:') && o.name!=='parked' && o.name!=='fusion' && o.name!=='inst';
  if (grp==='terreno') ocultar(o=>o===terr);
  else if (grp==='ciudad') ocultar(o=>o.isMesh && o.name.startsWith('chunk:'));
  else if (grp.startsWith('chunk:')) ocultar(o=>o.isMesh && o.name===grp);
  else if (grp==='fusion' || grp==='parked' || grp==='inst') ocultar(o=>o.isMesh && o.name===grp);
  else if (grp==='instanciadas') ocultar(o=>o.isInstancedMesh && o.name!=='parked' && o.name!=='inst');
  else if (grp==='sueltas') ocultar(loose);
  else if (grp==='gente') { for (const p of d.PEDS) if (p.H && p.H.root.visible) { p.H.root.visible=false; hid.push(p.H.root); } }
  else if (grp==='coches') { for (const c of d.CARS) if (c.mesh && c.mesh.visible) { c.mesh.visible=false; hid.push(c.mesh); } }
  else if (grp==='fondo') { const bs=window.__bg[0]; for (const o of bs.children) if (o.visible) { o.visible=false; hid.push(o); } }
  else if (grp==='sombras') { const e=R.shadowMap.enabled; R.shadowMap.enabled=false; S.traverse(o=>{ if(o.material) [].concat(o.material).forEach(m=>m.needsUpdate=true); }); window.__undo=()=>{ R.shadowMap.enabled=e; S.traverse(o=>{ if(o.material) [].concat(o.material).forEach(m=>m.needsUpdate=true); }); }; return 1; }
  else if (grp==='sombras1024') { if (!sun) return 0; const s0=sun.shadow.mapSize.x; sun.shadow.mapSize.set(1024,1024); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map=null; } window.__undo=()=>{ sun.shadow.mapSize.set(s0,s0); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map=null; } }; return 1; }
  else if (grp==='resolucion1') { const p=R.getPixelRatio(); R.setPixelRatio(1); window.__undo=()=>R.setPixelRatio(p); return 1; }
  else if (grp==='terreno_simple') { if (!terr) return 0; const m=terr.material; terr.material=new d.THREE.MeshLambertMaterial({ map:m.map, side:m.side }); window.__undo=()=>{ terr.material.dispose(); terr.material=m; }; return 1; }
  else if (grp==='terreno_una_cara') { if (!terr) return 0; const s=terr.material.side; terr.material.side=d.THREE.FrontSide; terr.material.needsUpdate=true; window.__undo=()=>{ terr.material.side=s; terr.material.needsUpdate=true; }; return 1; }
  else if (grp==='sin_niebla_lejos') { const f=S.fog.far; S.fog.far=Math.min(f, 450); d.camera.far=520; d.camera.updateProjectionMatrix(); window.__undo=()=>{ S.fog.far=f; d.camera.far=3200; d.camera.updateProjectionMatrix(); }; return 1; }
  window.__undo=()=>{ for (const o of hid) o.visible=true; }; return hid.length; }"""
GRUPOS = ['terreno', 'ciudad', 'fusion', 'inst', 'instanciadas', 'parked', 'sueltas', 'gente', 'coches', 'fondo',
          'sombras', 'sombras1024', 'resolucion1', 'terreno_simple', 'terreno_una_cara', 'sin_niebla_lejos']
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    gpu = await pg.evaluate("(()=>{ const gl=__dbg.renderer.getContext(), e=gl.getExtension('WEBGL_debug_renderer_info'); return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'?'; })()")
    await pg.evaluate("__dbg.renderer.setPixelRatio(1.5)")  # «alta» = x1.5; the headless window has devicePixelRatio 1, so the game took min(1, 1.5)
    out('tarjeta:', gpu, '· calidad:', await pg.evaluate("location.search"), '· resolución x', await pg.evaluate("__dbg.renderer.getPixelRatio()"), '· objetivo 16,7 ms')
    if 'SwiftShader' in gpu: out('AVISO: sin tarjeta gráfica (SwiftShader): los ms no valen')
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    chunks = await pg.evaluate("[...new Set(__dbg.scene.children.filter(o=>o.isMesh&&o.name.startsWith('chunk:')).map(o=>o.name))]")
    for x, z, lx, lz, h, nm in SITIOS:
        if x is not None:
            await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(4); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.2),lz); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, lx, lz, h])
        else:
            await pg.evaluate("(()=>{ if (__dbg.updateCityLOD) __dbg.updateCityLOD(true); })()")
        base = await pg.evaluate(MEDIR, [1920, 1080, 40, True])
        cpu = await pg.evaluate(MEDIR, [1920, 1080, 20, False])
        peq = await pg.evaluate(MEDIR, [480, 270, 40, True])
        out(f"== {nm}: {base['ms']} ms (mandar el trabajo {cpu['ms']} ms; a 480x270 {peq['ms']} ms)  llamadas {base['llamadas']}  tri {base['tri']}")
        filas = []
        for grp in GRUPOS + (chunks if '--trozos' in sys.argv else []):  # v1.0.0: the city chunks one by one only with --trozos (they cost little and took 5 minutes)
            n = await pg.evaluate(QUITAR, [grp])
            if not n: await pg.evaluate("(()=>{ if (window.__undo) window.__undo(); })()"); continue
            r = await pg.evaluate(MEDIR, [1920, 1080, 40, True])
            await pg.evaluate("(()=>{ if (window.__undo) window.__undo(); })()")
            filas.append((base['ms'] - r['ms'], grp, n, r))
        for dms, grp, n, r in sorted(filas, key=lambda f: -abs(f[0])):
            tag = 'con' if grp in ('sombras1024', 'resolucion1', 'terreno_simple', 'terreno_una_cara', 'sin_niebla_lejos') else 'sin'
            out(f"   {tag} {grp:24s} ({n:5d}): {r['ms']:6.2f} ms ({-dms:+6.2f})  llamadas {r['llamadas']:5d} ({r['llamadas'] - base['llamadas']:+d})  tri {r['tri']:8d} ({r['tri'] - base['tri']:+d})")
    open('shots/sonda_pintado_gpu.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA PINTADO GPU OK')
