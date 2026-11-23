# v1.4.44: lo que se congeló al construir la ciudad (05w_optimiza.js, freezeStatics) y que algo movió después en la
# partida (el vigilante thawStep lo descongela solo). Va al final de una tanda con una sola carga: así recoge lo que hayan
# movido las pruebas anteriores. Cada uno debería marcarse con userData.noMerge donde se crea.
import json
async def run(pg):
    await pg.evaluate("() => { window.__manual = true; __step(90); }")  # a full round of the watcher (60 slices)
    r = json.loads(await pg.evaluate("() => JSON.stringify({ n: __dbg.FREEZE.n, thawed: __dbg.FREEZE.thawed })"))
    print('congelados', r['n'], '· descongelados', len(r['thawed']))
    for t in r['thawed']:
        print('  ', t)
    ok = r['n'] > 5000
    print('PRUEBA CONGELADOS', 'OK' if ok else 'FALLA')
