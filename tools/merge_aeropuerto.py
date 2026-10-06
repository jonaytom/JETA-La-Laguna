"""Añade el aeropuerto de Los Rodeos y su entorno al mapa.

Entrada:
  data/laguna_osm2.json        mapa base (OSM en coordenadas de juego)
  data/aeropuerto_osm.json     OSM de la zona del aeropuerto (Overpass), [tags, coords con delta] en coordenadas de juego
  data/aeropuerto_elev.json    relieve de la zona (Open-Meteo / Copernicus DEM), rejilla de 32 m
Salida:
  data/laguna_osm3.json        mapa base + elementos nuevos (sin duplicados) + ELEV2 + AW (pistas, calles de rodaje,
                               plataformas, terminal, torre, hangares, puestos de estacionamiento)
Uso: python tools/merge_aeropuerto.py && python prep.py && python build.py
"""
import json, os, math

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)

base = json.load(open(P('data', 'laguna_osm2.json'), encoding='utf-8'))
new = json.load(open(P('data', 'aeropuerto_osm.json'), encoding='utf-8'))
elev = json.load(open(P('data', 'aeropuerto_elev.json'), encoding='utf-8')) if os.path.exists(P('data', 'aeropuerto_elev.json')) else None


def undelta(g):
    x = z = 0; out = []
    for i in range(0, len(g), 2):
        x += g[i]; z += g[i + 1]; out += [x, z]
    return out


def key(t, c):
    k = t.get('highway') or t.get('building') or t.get('landuse') or t.get('leisure') or t.get('natural') or ''
    return (k, t.get('name', ''), round(c[0] / 4), round(c[1] / 4), round(c[-2] / 4), round(c[-1] / 4))


seen = set()
for sect in ('B', 'R', 'A'):
    for t, c in base[sect]:
        seen.add(key(t, c))

added = {'B': 0, 'R': 0, 'A': 0}
AW = []
for t, g in new:
    c = undelta(g)
    if len(c) < 4: continue
    if 'aeroway' in t:
        aw = t['aeroway']
        if aw in ('runway', 'taxiway', 'apron', 'terminal', 'hangar', 'tower', 'control_tower', 'parking_position', 'helipad', 'aerodrome'):
            w = 0
            try: w = float(t.get('width', 0))
            except Exception: w = 0
            AW.append([aw, t.get('ref', '') or t.get('name', ''), w, c])
        if aw == 'terminal' or ('building' not in t): continue  # terminal modelled in 05r_aeropuerto.js
    if key(t, c) in seen: continue
    if 'building' in t:
        sect = 'B'
    elif 'highway' in t:
        sect = 'R'
    elif 'landuse' in t or 'leisure' in t or 'natural' in t:
        sect = 'A'
    else:
        continue
    seen.add(key(t, c)); base[sect].append([t, c]); added[sect] += 1

base['AW'] = AW
if elev:
    base['ELEV2'] = elev
json.dump(base, open(P('data', 'laguna_osm3.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('añadidos', added, 'aeroway', len(AW), 'relieve', 'sí' if elev else 'no')
