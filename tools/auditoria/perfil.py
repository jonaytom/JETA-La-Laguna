#!/usr/bin/env python3
"""Perfil dinámico de JETA La Laguna con Playwright (Chromium sin ventana, WebGL por software).

Uso:  python perfil.py <carpeta_repo> [calidad=media] [salida.json]
Requiere haber ejecutado antes `python build.py` (usa dist/test.html, que carga Three.js local).

Mide: tiempo de cada paso de arranque, llamadas de dibujo, triángulos, nº de geometrías/texturas/programas
de shader, memoria JS, coste por subsistema (window.__prof) y FUGAS: cuántas geometrías/texturas quedan
vivas tras teletransportar al jugador por el mapa (peatones y coches que aparecen y desaparecen).
Los tiempos absolutos con WebGL por software no son los de un PC real; sirven para comparar versiones.
"""
import asyncio, json, os, sys, threading, http.server, functools
from playwright.async_api import async_playwright

repo = sys.argv[1]; q = sys.argv[2] if len(sys.argv) > 2 else 'media'; out = sys.argv[3] if len(sys.argv) > 3 else None
dist = os.path.join(repo, 'dist')
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=dist)
H.log_message = lambda *a: None
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), H); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

INFO = """(()=>{const r=__dbg.renderer.info; return {calls:r.render.calls, tris:r.render.triangles,
 geometries:r.memory.geometries, textures:r.memory.textures, programs:(r.programs||[]).length,
 heapMB: performance.memory? +(performance.memory.usedJSHeapSize/1048576).toFixed(1):null,
 cars:__dbg.CARS.length, peds:__dbg.PEDS.length, sceneChildren:__dbg.scene.children.length}})()"""

MEMJS="""(()=>{const seen=new Set(); let bytes=0,nonIdx=0,idx=0,verts=0,meshes=0,inst=0,byAttr={}; const big=[];
__dbg.scene.traverse(o=>{ if(!o.geometry) return; meshes++; if(o.isInstancedMesh) inst++; const g=o.geometry; if(seen.has(g)) return; seen.add(g);
 let b=0; for(const k in g.attributes){const a=g.attributes[k]; const n=a.array?a.array.byteLength:0; b+=n; byAttr[k]=(byAttr[k]||0)+n;}
 if(g.index){b+=g.index.array.byteLength; idx++;} else nonIdx++; verts+=g.attributes.position?g.attributes.position.count:0; bytes+=b; big.push([b,o.name||o.type,g.index?1:0]);});
 big.sort((a,b)=>b[0]-a[0]);
 return {geometriasUnicas:seen.size, mallas:meshes, instanciadas:inst, noIndexadas:nonIdx, indexadas:idx, vertices:verts,
  MB_geometria_en_RAM:+(bytes/1048576).toFixed(1), MB_por_atributo:Object.fromEntries(Object.entries(byAttr).map(([k,v])=>[k,+(v/1048576).toFixed(1)])),
  top10_MB: big.slice(0,10).map(x=>[+(x[0]/1048576).toFixed(1),x[1],x[2]?'indexada':'NO indexada']),
  MB_DATA_json:+(document.getElementById('mapdata').textContent.length/1048576).toFixed(1)}})()"""

async def main():
    res = {'calidad': q}
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
                                          '--ignore-gpu-blocklist', '--enable-precise-memory-info', '--js-flags=--expose-gc'])
        pg = await b.new_page(viewport={'width': 1280, 'height': 720})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and errs.append(m.text))  # sin red no es fallo del juego
        # registra cada mensaje de la pantalla de carga con su hora
        # semilla fija: mismo código -> mismo tráfico, peatones y ciudad -> mediciones comparables entre versiones
        await pg.add_init_script("""(()=>{let s=20261006>>>0; Math.random=function(){s=(s+0x6D2B79F5)>>>0; let t=s;
          t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296;};})();""")
        await pg.add_init_script("""window.__bootLog=[];new MutationObserver(()=>{}).observe(document,{subtree:true,childList:true});
          const _t0=performance.now(); const iv=setInterval(()=>{const e=document.getElementById('loadtxt')||document.querySelector('#loadblock');
          if(e){const t=e.innerText.trim(); const L=window.__bootLog; if(!L.length||L[L.length-1][0]!==t) L.push([t,performance.now()]);}
          if(window.__GAME_READY) clearInterval(iv);},5);""")
        await pg.goto(f'http://127.0.0.1:{port}/test.html?q={q}')
        await pg.wait_for_function('window.__GAME_READY', timeout=600000, polling=200)
        boot = await pg.evaluate('window.__bootLog')
        steps = [{'paso': boot[i][0][:60], 'ms': round(boot[i + 1][1] - boot[i][1])} for i in range(len(boot) - 1)]
        res['arranque_total_ms'] = round(boot[-1][1] - boot[0][1]) if boot else None
        res['arranque_pasos'] = sorted(steps, key=lambda s: -s['ms'])[:12]
        await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12;})()")
        await pg.evaluate("__step(30)"); await pg.wait_for_timeout(300)
        await pg.evaluate("window.__snap()")
        res['inicio'] = await pg.evaluate(INFO)
        res['memoria'] = await pg.evaluate(MEMJS)
        # coste medio por subsistema en 120 pasos de juego andando
        await pg.evaluate("for(const k in __prof) delete __prof[k]")
        t = await pg.evaluate("(()=>{const t0=performance.now(); __step(120,1/30,['KeyW']); return performance.now()-t0})()")
        res['logic_ms_por_paso'] = round(t / 120, 2)
        res['prof_ms'] = {k: round(v, 3) for k, v in sorted((await pg.evaluate('__prof')).items(), key=lambda x: -x[1])}
        # fugas: teletransportes por el mapa haciendo aparecer peatones/coches
        # 3 vueltas por los MISMOS 12 puntos: la 1ª sube por subidas perezosas a la GPU (normal);
        # si en la 2ª y 3ª sigue subiendo, son objetos que se crean y nunca se liberan (fuga).
        pts = await pg.evaluate("(()=>{const B=__dbg.BUILD; const o=[]; for(let i=0;i<12;i++){const b=B[(i*977)%B.length]; o.push([b.cx+12,b.cz+12]);} return o})()")
        rondas = [await pg.evaluate(INFO)]
        for r in range(3):
            for x, z in pts:
                await pg.evaluate(f"(()=>{{const P=__dbg.PLAYER; P.x={x}; P.z={z}; P.y=__dbg.heightAt({x},{z})+0.5;}})()")
                await pg.evaluate("__step(40,1/30)"); await pg.evaluate("window.__snap()")
            await pg.evaluate("window.gc && gc()"); rondas.append(await pg.evaluate(INFO))
        res['fugas'] = {'rondas': rondas,
                        'geometrias_por_vuelta_(2a-3a)': [rondas[i]['geometries'] - rondas[i-1]['geometries'] for i in (2, 3)],
                        'texturas_por_vuelta_(2a-3a)': [rondas[i]['textures'] - rondas[i-1]['textures'] for i in (2, 3)]}
        res['errores_consola'] = errs[:20]
        await b.close()
    srv.shutdown()
    s = json.dumps(res, ensure_ascii=False, indent=1)
    if out: open(out, 'w', encoding='utf-8').write(s)
    print(s)

asyncio.run(main())
