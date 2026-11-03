"""Muros, tapias, vallas y setos del OpenStreetMap (v1.0.4; Jonay, 3-nov: «además de los edificios hay que repasar muros y
vallas/cercas que rodean jardines y zonas como la universidad»). El mapa del juego no los trae (la descarga de OSM no
pedía «barrier»).

Corre en el PC (el trabajador: orden «barreras»). Pide a Overpass los «barrier» lineales de la zona del mapa y los deja en
coordenadas del juego en data/barreras.json: [[tipo, altura_m_o_0, material, [x,z, x,z, …]], …]
tipo: wall, fence, retaining_wall, city_wall, hedge, guard_rail, gate (solo las líneas; las puertas sueltas son puntos).
Uso: python tools/barreras.py
"""
import json, math, os, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320; KZ = 110574
BOX = (-5200, 3300, -2600, 4600)  # x0, x1, z0, z1 in game metres (like tools/catastro.py)
URLS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter']
TIPOS = 'wall|fence|retaining_wall|city_wall|hedge|guard_rail|wire_fence|wood_fence|handrail'


def bbox():
    s = LAT0 - BOX[3] / KZ; n = LAT0 - BOX[2] / KZ; w = LON0 + BOX[0] / KX; e = LON0 + BOX[1] / KX
    return f'{s:.6f},{w:.6f},{n:.6f},{e:.6f}'


def altura(t):
    h = t.get('height', '').replace(',', '.').replace('m', '').strip()
    try: return round(float(h), 1)
    except ValueError: return 0


if __name__ == '__main__':
    q = f'[out:json][timeout:180];way["barrier"~"^({TIPOS})$"]({bbox()});out geom;'
    data = None
    for u in URLS:
        try:
            req = urllib.request.Request(u, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'JETA-La-Laguna/1.0'})
            with urllib.request.urlopen(req, timeout=240) as r: data = json.load(r); break
        except Exception as ex: print('falla', u, ex, flush=True)
    if data is None: raise SystemExit('Overpass no responde')
    out, cuenta = [], {}
    for w in data.get('elements', []):
        g = w.get('geometry') or []
        if len(g) < 2: continue
        t = w.get('tags', {}); k = t.get('barrier', '')
        c = []
        for p in g: c += [round((p['lon'] - LON0) * KX * 2) / 2, round(-(p['lat'] - LAT0) * KZ * 2) / 2]
        out.append([k, altura(t), t.get('material', '') or t.get('fence_type', ''), c]); cuenta[k] = cuenta.get(k, 0) + 1
    dest = os.path.join(ROOT, 'data', 'barreras.json')
    json.dump(out, open(dest, 'w', encoding='utf-8'), separators=(',', ':'))
    print('barreras', len(out), cuenta, '->', dest, os.path.getsize(dest) // 1024, 'KB')
