# Árboles del juego (v1.3.0): cuántos hay de cada tipo, triángulos de tronco, copa y copa lejana, y dónde hay dragos.
# Uso: herramientas/sonda_arboles.py   → shots/sonda_arboles.txt
import json
async def run(pg):
    r = json.loads(await pg.evaluate("JSON.stringify(window.__arb || null)"))
    print('ARBOLES', json.dumps(r))
    if r:
        tot = sum((v[0] + v[1]) * v[3] for v in r['tris'].values())
        print('triángulos de cerca si se vieran todos', tot)
    open('shots/sonda_arboles.txt', 'w').write(json.dumps(r))
