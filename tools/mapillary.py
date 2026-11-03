"""Señales de aparcamiento de Mapillary (v1.1.4; Jonay, 3-nov: «Mapillary procesa las fotos con IA… ha identificado miles
de señales de tráfico de estacionamiento; puedes descargar esos puntos y cruzarlos con tus calles de OpenStreetMap»).

Corre en el PC (lista de pruebas «mapillary»). La clave de acceso la pone Jonay en E:\\Claude\\GTA La Laguna\\secret\\mapi.txt
(fuera del repo; este script la lee y no la escribe en ningún sitio ni la imprime). Pide a la API de Mapillary
(graph.mapillary.com/map_features) los objetos detectados en el recuadro del mapa, por trozos pequeños, se queda con las
señales de aparcamiento (prohibido aparcar / parar, aparcamiento, zona regulada), empareja cada una con la calle del juego
más cercana (data/data.json, a menos de 15 m) y el lado (izquierda / derecha según el sentido de la calle) y escribe
data/mapillary_aparca.json: { "<índice de DATA.R>": {"no": [lados], "si": [lados]}, … }. Imprime cuántas señales y calles
salen de cada tipo. No cambia el juego: eso se decide después, con los números delante.
Uso: python tools/mapillary.py
"""
import json, math, os, time, urllib.request, urllib.parse, urllib.error
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKEN_FILE = r'E:\Claude\GTA La Laguna\secret\mapi.txt'
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320; KZ = 110574
BOX = (-4808, 2800, -1800, 4400)   # x0, x1, z0, z1 (game metres), as tools/carriles.py
STEP = 0.02                         # tile size in degrees (~2 km; v1.1.4 c: 0.004 meant ~300 slow requests); the pages of each are followed
NO = ('no-parking', 'no-stopping')
SI = ('information--parking', 'parking-zone', 'regulatory--parking', 'complementary--parking', 'disabled-persons')
def kind(v):
    if any(k in v for k in NO): return 'no'
    if 'parking' in v and any(k in v for k in SI): return 'si'
    if 'parking' in v: return 'si'
    return None
FAILS = [0]
def get(url, tries=2):
    """one request; v1.1.4 b: short timeout, one retry, and the whole run stops after 5 tiles failing in a row"""
    for t in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'JETA-La-Laguna/1.0'}), timeout=20) as r: FAILS[0] = 0; return json.load(r)
        except urllib.error.HTTPError as ex:
            body = ''
            try: body = ex.read().decode('utf-8', 'replace')[:300]
            except Exception: pass
            print('  error HTTP', ex.code, body.replace(TOK, '***'), flush=True)
            if ex.code in (400, 401, 403): raise SystemExit('Mapillary rechaza la petición (¿clave mal copiada o caducada?)')
        except Exception as ex:
            print('  fallo', str(ex).replace(TOK, '***')[:160], flush=True)
        time.sleep(1.5)
    FAILS[0] += 1
    if FAILS[0] >= 5: raise SystemExit('5 trozos seguidos sin respuesta de Mapillary: paro')
    return None
TOK = open(TOKEN_FILE, encoding='utf-8').read().strip()
if not TOK: raise SystemExit('el archivo de la clave está vacío')
s = LAT0 - BOX[3] / KZ; n = LAT0 - BOX[2] / KZ; w = LON0 + BOX[0] / KX; e = LON0 + BOX[1] / KX
signs, seen, tiles = [], set(), 0
# first a single small tile in the casco, to see the API answers before asking for ~300
_t = get('https://graph.mapillary.com/map_features?' + urllib.parse.urlencode({'access_token': TOK, 'fields': 'id,object_value,geometry', 'bbox': '-16.3180,28.4860,-16.3140,28.4890', 'limit': 2000}))
if _t is None: raise SystemExit('Mapillary no responde a la primera petición: paro')
print('prueba en el casco:', len(_t.get('data', [])), 'objetos detectados', flush=True)
lat = s
while lat < n:
    lon = w
    while lon < e:
        bb = f'{lon:.5f},{lat:.5f},{min(e, lon + STEP):.5f},{min(n, lat + STEP):.5f}'
        q = urllib.parse.urlencode({'access_token': TOK, 'fields': 'id,object_value,geometry', 'bbox': bb, 'limit': 2000})
        d = get('https://graph.mapillary.com/map_features?' + q); tiles += 1; feats = list((d or {}).get('data', [])); pg = 0
        while d and (d.get('paging') or {}).get('next') and pg < 30: d = get(d['paging']['next']); pg += 1; feats += (d or {}).get('data', [])
        print('  trozo', tiles, bb, 'objetos', len(feats), 'páginas', pg + 1, flush=True)
        for f in feats:
            v = f.get('object_value', ''); k = kind(v)
            if not k or f['id'] in seen: continue
            seen.add(f['id']); x, y = f['geometry']['coordinates']
            signs.append((k, v, (x - LON0) * KX, -(y - LAT0) * KZ))
        lon += STEP
    lat += STEP
    print('  fila de trozos hecha, señales hasta ahora:', len(signs), flush=True)
print('trozos pedidos:', tiles, '· señales de aparcamiento:', len(signs), flush=True)
from collections import Counter
print('por tipo:', Counter(v for _, v, _, _ in signs).most_common(25))
# match with the game's streets
dd = json.load(open(os.path.join(ROOT, 'data', 'data.json'), encoding='utf-8')); R = dd['R']
CELL = 30.0; idx = {}
for ri, r in enumerate(R):
    if r[0] > 12: continue
    c = r[4]
    for i in range(0, len(c) - 2, 2):
        for gx in range(int(min(c[i], c[i + 2]) // CELL) - 1, int(max(c[i], c[i + 2]) // CELL) + 2):
            for gz in range(int(min(c[i + 1], c[i + 3]) // CELL) - 1, int(max(c[i + 1], c[i + 3]) // CELL) + 2): idx.setdefault((gx, gz), set()).add((ri, i))
out, cnt = {}, Counter()
for k, v, x, z in signs:
    best = None
    for ri, i in idx.get((int(x // CELL), int(z // CELL)), ()):
        c = R[ri][4]; ax, az, bx, bz = c[i], c[i + 1], c[i + 2], c[i + 3]; dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz or 1
        t = max(0, min(1, ((x - ax) * dx + (z - az) * dz) / L2)); px, pz = ax + dx * t, az + dz * t; dist = math.hypot(x - px, z - pz)
        if best is None or dist < best[0]: best = (dist, ri, dx * (z - az) - dz * (x - ax))
    if not best or best[0] > 15: cnt['sin calle'] += 1; continue
    side = 'izq' if best[2] > 0 else 'dcha'
    e = out.setdefault(str(best[1]), {'no': [], 'si': [], 'nop': []})
    if side not in e[k]: e[k].append(side)
    if k == 'no': e['nop'].append([x, z, 1 if side == 'izq' else -1])   # v1.1.4: where each no-parking sign is (the game cuts the parking band ~10 m round it)
    cnt[k] += 1
json.dump(out, open(os.path.join(ROOT, 'data', 'mapillary_aparca.json'), 'w', encoding='utf-8'), separators=(',', ':'))
print('señales emparejadas:', dict(cnt), '· calles con alguna:', len(out),
      '· con prohibido:', sum(1 for e in out.values() if e['no']), '· con aparcamiento:', sum(1 for e in out.values() if e['si']))
print('-> data/mapillary_aparca.json')
