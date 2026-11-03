# La versión en carpeta (v1.0.1, dist/JETA La Laguna/juego/, la que va en el zip de los testers) carga y anda: abre su
# index.html en otra pestaña del mismo servidor de pruebas, espera a que el juego esté listo y comprueba que no hay
# errores, que los datos vienen de datos/mapa.js y que el mapa tiene calles y edificios.
import json
async def run(pg):
    p2 = await pg.context.browser.new_page(viewport={'width': 640, 'height': 360}); logs = []
    p2.on('pageerror', lambda e: logs.append('PAGEERROR: ' + str(e)))
    p2.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and logs.append(m.text))
    await p2.add_init_script("window.__JETA_TEST = true;")
    await p2.goto('http://localhost:8765/JETA%20La%20Laguna/juego/index.html?q=baja', wait_until='commit', timeout=60000)
    ok = True
    try: await p2.wait_for_function('window.__GAME_READY', timeout=240000)
    except Exception as e: print('no carga', e, await p2.evaluate("JSON.stringify({ready: document.readyState, datos: !!window.__MAPDATA, scripts: [...document.scripts].map(s=>s.src||s.type).slice(0,8), load: document.getElementById('loadtxt') && document.getElementById('loadtxt').textContent})")); ok = False
    if ok:
        r = json.loads(await p2.evaluate("JSON.stringify({ datos: !!window.__MAPDATA, calles: __dbg.DATA.R.length, edificios: __dbg.BUILD.length, version: document.querySelector('.verlbl') && document.querySelector('.verlbl').textContent })"))
        print('carpeta', r); ok = r['datos'] and r['calles'] > 1000 and r['edificios'] > 1000
    print('errores', logs[:5]); await p2.close()
    print('CARPETA', 'OK' if ok and not logs else 'FALLA')
