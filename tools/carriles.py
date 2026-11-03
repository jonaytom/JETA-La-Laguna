"""Carriles y aparcamiento de cada calle según el OpenStreetMap (v1.1.1; Jonay, 3-nov: «hay muchas zonas de 2 carriles que
lo que tienen en realidad es 2 carriles y una fila de aparcamientos a los lados… no sé si podemos sacar los aparcamientos
de algún sitio»).

Corre en el PC (lista de pruebas «carriles»). Pide a Overpass las vías con coche de la zona del mapa con sus etiquetas
`lanes`, `lanes:forward/backward`, `oneway` y `parking:*` (esquema nuevo `parking:left/right/both` y el viejo
`parking:lane:*`), las empareja con las calles del juego (data/data.json, por cercanía de su trazado) y escribe
data/carriles.json: { "<índice de DATA.R>": [carriles, aparca_izq, aparca_dcha], … } con aparca = 0 no, 1 en línea,
2 en batería/diagonal, -1 sin dato. Imprime cuántas calles traen cada dato.
Uso: python tools/carriles.py
"""
import json, math, os, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320; KZ = 110574
BOX = (-4808, 2800, -1800, 4400)
URLS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
CELL = 30.0


def bbox():
    s = LAT0 - BOX[3] / KZ; n = LAT0 - BOX[2] / KZ; w = LON0 + BOX[0] / KX; e = LON0 + BOX[1] / KX
    return f'{s:.6f},{w:.6f},{n:.6f},{e:.6f}'


def park(t, side):
    """0 no, 1 parallel, 2 diagonal/perpendicular, -1 unknown, for 'left' or 'right' (new and old OSM schemes)"""
    v = t.get(f'parking:{side}') or t.get('parking:both')
    o = t.get(f'parking:{side}:orientation') or t.get('parking:both:orientation')
    if v is None:  # old scheme
        v = t.get(f'parking:lane:{side}') or t.get('parking:lane:both')
        if v in ('parallel', 'diagonal', 'perpendicular'): o, v = v, 'lane'
    if v is None: return -1
    if v in ('no', 'separate', 'no_parking', 'no_stopping', 'fire_lane'): return 0
    if v in ('lane', 'street_side', 'on_kerb', 'half_on_kerb', 'shoulder', 'yes', 'marked'): return 2 if o in ('diagonal', 'perpendicular') else 1
    return -1


def seg_d2(x, z, ax, az, bx, bz):
    dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz
    t = 0 if L2 == 0 else max(0, min(1, ((x - ax) * dx + (z - az) * dz) / L2))
    ex, ez = x - ax - t * dx, z - az - t * dz; return ex * ex + ez * ez


def main():
    q = f'[out:json][timeout:240];way["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential|living_street|service)(_link)?$"]({bbox()});out tags geom;'
    data = None
    for u in URLS:
        try:
            req = urllib.request.Request(u, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'JETA-La-Laguna/1.0'})
            with urllib.request.urlopen(req, timeout=300) as r: data = json.load(r); break
        except Exception as ex: print('falla', u, ex, flush=True)
    if data is None: raise SystemExit('Overpass no responde')
    ways = []
    for w in data.get('elements', []):
        t = w.get('tags', {}); g = w.get('geometry') or []
        if len(g) < 2: continue
        lanes = t.get('lanes', ''); lanes = int(lanes) if lanes.isdigit() else -1
        pl, pr = park(t, 'left'), park(t, 'right')
        if lanes < 0 and pl < 0 and pr < 0: continue
        c = []
        for p in g: c += [(p['lon'] - LON0) * KX, -(p['lat'] - LAT0) * KZ]
        ways.append((lanes, pl, pr, c))
    print('vías del OSM con coche en la zona:', len(data.get('elements', [])), '· con carriles o aparcamiento etiquetados:', len(ways), flush=True)
    idx = {}
    for k, (_, _, _, c) in enumerate(ways):
        for i in range(0, len(c) - 2, 2):
            for gx in range(int(min(c[i], c[i + 2]) // CELL), int(max(c[i], c[i + 2]) // CELL) + 1):
                for gz in range(int(min(c[i + 1], c[i + 3]) // CELL), int(max(c[i + 1], c[i + 3]) // CELL) + 1): idx.setdefault((gx, gz), set()).add(k)
    d = json.load(open(os.path.join(ROOT, 'data', 'data.json'), encoding='utf-8'))
    out, stats = {}, {'carriles': 0, 'aparca': 0, 'aparca_no': 0, 'calles_juego_con_coche': 0}
    for ri, r in enumerate(d['R']):
        if r[0] > 12: continue
        stats['calles_juego_con_coche'] += 1
        p = r[4]; pts = []
        for i in range(0, len(p) - 2, 2): pts.append(((p[i] + p[i + 2]) / 2, (p[i + 1] + p[i + 3]) / 2))
        if not pts: continue
        best, bd = None, 1e9
        cand = set()
        for x, z in pts: cand |= idx.get((int(x // CELL), int(z // CELL)), set())
        for k in cand:
            c = ways[k][3]; tot = 0
            for x, z in pts: tot += min(seg_d2(x, z, c[i], c[i + 1], c[i + 2], c[i + 3]) for i in range(0, len(c) - 2, 2))
            m = tot / len(pts)
            if m < bd: bd, best = m, k
        if best is None or bd > 9: continue   # within 3 m on average
        lanes, pl, pr, _ = ways[best]; out[ri] = [lanes, pl, pr]
        if lanes > 0: stats['carriles'] += 1
        if pl > 0 or pr > 0: stats['aparca'] += 1
        if pl == 0 and pr == 0: stats['aparca_no'] += 1
    json.dump(out, open(os.path.join(ROOT, 'data', 'carriles.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    print('calles del juego emparejadas:', len(out), stats, '-> data/carriles.json')


if __name__ == '__main__':
    main()
