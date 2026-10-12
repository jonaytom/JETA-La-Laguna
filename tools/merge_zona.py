"""Añade al mapa una zona descargada con scripts/descargar_zona.ps1 (desde el PC de Jonay).

Entrada:
  data/laguna_osm3.json            mapa base (OSM en coordenadas de juego)
  data/<nombre>_osm_raw.json       respuesta de Overpass («out geom») de la zona
  data/<nombre>_elev.json          relieve de la zona: rejilla {x0, z0, d, nx, nz, e} en metros del juego
Salida:
  data/laguna_osm3.json            con los edificios, calles, áreas, puntos y árboles nuevos (sin duplicados) y la
                                   rejilla de relieve en ELEVX[<nombre>] (prep.py la mezcla con la del mapa base)
Uso: python tools/merge_zona.py lacuesta && python prep.py && python build.py
Se puede repetir: lo que ya está no se vuelve a añadir.
"""
import json, os, math, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
name = sys.argv[1] if len(sys.argv) > 1 else 'lacuesta'
KX = math.cos(math.radians(28.4875)) * 111320; KZ = 110574
gx = lambda lon: round((lon + 16.315) * KX * 2) / 2
gz = lambda lat: round(-(lat - 28.4875) * KZ * 2) / 2

base = json.load(open(P('data', 'laguna_osm3.json'), encoding='utf-8'))
raw = json.load(open(P('data', f'{name}_osm_raw.json'), encoding='utf-8-sig'))
elev = json.load(open(P('data', f'{name}_elev.json'), encoding='utf-8-sig'))


def key(t, c):
    k = t.get('highway') or t.get('building') or t.get('landuse') or t.get('leisure') or t.get('natural') or t.get('railway') or ''
    return (k, t.get('name', ''), round(c[0] / 4), round(c[1] / 4), round(c[-2] / 4), round(c[-1] / 4))


seen = set()
for sect in ('B', 'R', 'A', 'T'):
    for t, c in base[sect]:
        seen.add(key(t, c))
seenP = {(p[0], round(p[2][0] / 4), round(p[2][1] / 4)) for p in base['P']}
seenN = {(round(x), round(z)) for x, z in base['N']}

added = {'B': 0, 'R': 0, 'A': 0, 'T': 0, 'P': 0, 'N': 0}
# only what lies in the new part: anything whose centre is inside the old play area is already in the base map (and a
# clipped copy of it would be a duplicate with different ends)
OLD = (-4750, 2400, -1250, 3980)
def in_old(c):
    n = len(c) // 2; cx = sum(c[0::2]) / n; cz = sum(c[1::2]) / n
    return OLD[0] <= cx <= OLD[1] and OLD[2] <= cz <= OLD[3]
def add(sect, t, c):
    if len(c) < 4 or in_old(c): return
    k = key(t, c)
    if k in seen: return
    seen.add(k); base[sect].append([t, c]); added[sect] += 1

for el in raw.get('elements', []):
    t = el.get('tags', {})
    if el['type'] == 'node':
        x, z = gx(el['lon']), gz(el['lat'])
        if in_old([x, z]): continue
        if t.get('natural') == 'tree':
            if (round(x), round(z)) not in seenN: base['N'].append([x, z]); seenN.add((round(x), round(z))); added['N'] += 1
            continue
        nm = t.get('name'); kind = t.get('amenity') or t.get('shop') or t.get('healthcare') or t.get('highway')
        if nm and kind and (nm, round(x / 4), round(z / 4)) not in seenP:
            base['P'].append([nm, kind, [x, z], None]); seenP.add((nm, round(x / 4), round(z / 4))); added['P'] += 1
        continue
    rings = []
    if el['type'] == 'way' and el.get('geometry'):
        rings = [el['geometry']]
    elif el['type'] == 'relation':
        rings = [m['geometry'] for m in el.get('members', []) if m.get('role') == 'outer' and m.get('geometry')]
    pieces = []
    for g in rings:  # a geometry clipped to the zone has null points outside it: split there
        cur = []
        for p in g:
            if p is None:
                if len(cur) >= 2: pieces.append((cur, True))
                cur = []
            else: cur.append(p)
        if len(cur) >= 2: pieces.append((cur, len(cur) < len(g)))
    for g, cut in pieces:
        if cut and ('building' in t or 'highway' not in t): continue  # only roads may be cut; cut polygons are dropped
        c = []
        for p in g: c += [gx(p['lon']), gz(p['lat'])]
        if 'building' in t: add('B', t, c)
        elif 'highway' in t: add('R', t, c)
        # trams of the new zones are left out: the game has one tram line (the chain in prep.py) and line 2 would confuse it
        elif 'landuse' in t or 'leisure' in t or 'natural' in t or t.get('amenity') in ('parking', 'hospital', 'school', 'clinic'): add('A', t, c)

base.setdefault('ELEVX', {})[name] = elev
json.dump(base, open(P('data', 'laguna_osm3.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('zona', name, 'añadidos', added, 'relieve', f"{elev['nx']}x{elev['nz']}")
