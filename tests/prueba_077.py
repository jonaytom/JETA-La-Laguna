# v0.77 (rendimiento): piezas sueltas juntadas por material y celda, árboles/farolas por celda, recorte por distancia
# según la niebla, coches aparcados instanciados (pintura por coche, el que se lleva uno desaparece de su sitio) y
# carga más rápida. Fotos para comprobar que la ciudad se ve igual. Uso: cd tests && python run_test.py prueba_077.py
import json, os, base64
async def foto(pg, name, x, z, lx, lz, h=1.7):
    await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx, d.heightAt(lx,lz)+1.2, lz); d.camera.updateMatrixWorld(); }", [x, z, lx, lz, h])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); cons = []
    pg.on('console', lambda m: cons.append(m.text) if m.type == 'error' else None)
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    ok = True
    # 1) what got fused, and nothing that moves
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, S=d.scene; let fus=0, inst=0, loose=0, people=0;
      S.traverse(o=>{ if(!o.isMesh) return; if(o.name==='fusion') fus++; else if(o.name==='inst') inst++; });
      for (const p of d.PEDS) if (p.H && p.H.root && p.H.root.parent) people++;
      return { stats: d.LOD.stats, fusion: fus, celdas: inst, lod: d.LOD.items.length, peatones_enteros: people }; })())"""))
    print('juntado', r); ok = ok and r['stats']['juntadas'] > 3000 and r['fusion'] > 100 and r['celdas'] > 50
    # 2) distance cut-off: far pieces hidden, near ones shown
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, c=d.camera; d.updateCityLOD(true); const p=c.position; let near=0, nearVis=0, far=0, farVis=0;
      const ff=d.scene.fog.far; for (const it of d.LOD.items) { const dd=Math.hypot(it.x-p.x, it.z-p.z)-it.r; if (dd<60) { near++; if (it.m.visible) nearVis++; } else if (dd>ff+60) { far++; if (it.m.visible) farVis++; } }
      return { cerca:[nearVis, near], lejos:[farVis, far], niebla: ff }; })())"""))
    print('distancia', r); ok = ok and r['cerca'][0] == r['cerca'][1] and r['lejos'][0] == 0 and r['lejos'][1] > 0
    # 3) parked cars: instanced, painted, and the one you take leaves its spot
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, K=d.PARKED, P=d.PLAYER; const all=K.chunks.every(c=>c.mesh.isInstancedMesh);
      let s=null; for (const sl of K.slots) if (sl.alive!==false && sl.inst) { s=sl; break; }
      const m=s.inst, M=new m.matrix.constructor(); m.getMatrixAt(s.idx, M); const before=M.elements[0]**2+M.elements[2]**2;
      const car=d.activateParked(s); m.getMatrixAt(s.idx, M); const after=M.elements[0]**2+M.elements[2]**2; if (car && car.remove) car.remove();
      const prog=d.renderer.info.programs||[]; const bad=prog.filter(p=>p.diagnostics && !p.diagnostics.runnable).length;
      return { grupos: K.chunks.length, coches: K.slots.length, instanciados: all, escala_antes: +before.toFixed(2), escala_despues: +after.toFixed(2), color: !!m.instanceColor, shaders_rotos: bad }; })())"""))
    print('aparcados', r); ok = ok and r['instanciados'] and r['escala_antes'] > 0.5 and r['escala_despues'] == 0 and r['color'] and r['shaders_rotos'] == 0
    # 4) load: the park/square step used to take ~3 s
    lt = json.loads(await pg.evaluate("JSON.stringify(window.__LOADT||[])")); tot = sum(ms for _, ms in lt)
    pl = [ms for nm, ms in lt if 'buildPlazasParks' in nm]; pk = [ms for nm, ms in lt if nm.endswith('· buildParked')]
    print('carga total', tot, 'ms; plazas', pl, 'aparcados', pk); ok = ok and pl and pl[0] < 1500
    # 5) photos: square, casco street with parked cars, a park with ducks, view from above
    #    each spot twice: «junta» (as the game runs now) and «suelta» (the original loose pieces put back, no distance cut)
    pc = await pg.evaluate("__dbg.PK2 && __dbg.PK2.constitucion ? __dbg.PK2.constitucion : null")
    sitios = [['adelantado', 105, -45, 150, 0, 6], ['adelantado_suelo', 60, 60, 150, 0, 4], ['casco', -60, -230, -10, -150, 1.7], ['alto', -200, 300, 300, -600, 150]]
    if pc: sitios.append(['constitucion', pc[0] - 40, pc[1] + 20, pc[0] - 14, pc[1] + 6, 5])
    for modo in ('junta', 'suelta'):
        n = await pg.evaluate("(on)=>__dbg.unfuse(on)", modo == 'suelta'); print(modo, 'piezas', n)
        for nm, x, z, lx, lz, h in sitios: await foto(pg, f'v077_{nm}_{modo}', x, z, lx, lz, h)
    await pg.evaluate("__dbg.unfuse(false)")
    sh = [c for c in cons if 'THREE.WebGLProgram' in c or 'shader' in c.lower()]
    print('errores', errs[:3], 'shader', sh[:2]); ok = ok and not errs and not sh
    print('PRUEBA 077', 'OK' if ok else 'FALLA')
