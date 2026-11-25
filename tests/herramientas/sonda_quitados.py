# v1.4.48: los edificios que se quitan al construir la ciudad y por qué (window.__quitados, buildBuildingsEach): total,
# por motivo, los de más de 50 m² y los que hay cerca de un punto. Uso: herramientas/sonda_quitados.py [x z radio]
import sys, json, collections
async def run(pg):
    L = json.loads(await pg.evaluate("() => JSON.stringify(window.__quitados || [])"))
    print('QUITADOS', len(L), dict(collections.Counter(q[3] for q in L)))
    print('GRANDES (>50 m²)', len([q for q in L if q[2] > 50]), sorted([q for q in L if q[2] > 50], key=lambda q: -q[2])[:20])
    if len(sys.argv) > 4:
        x, z, r = map(float, sys.argv[2:5])
        print('CERCA', [q for q in L if (q[0] - x) ** 2 + (q[1] - z) ** 2 < r * r])
