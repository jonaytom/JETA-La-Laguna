"""Edificios del Catastro (INSPIRE) para comparar con el OpenStreetMap (v1.0.4; Jonay, 3-nov: «hay muchos huecos que no
existen en la realidad… hay que revisar los edificios con mejores fuentes»).

Corre en el PC (el trabajador: orden «catastro»). Baja del Catastro el conjunto de edificios INSPIRE de San Cristóbal de
La Laguna (datos abiertos: planta de cada edificio y de cada parte con su número de plantas), lo guarda en
data/catastro/ y lo pasa a coordenadas del juego en data/catastro_bu.json:
  { "partes": [[plantas_sobre_rasante, plantas_bajo_rasante, [x,z, x,z, …]], …],
    "edificios": [[uso, plantas_max, año, [x,z, …]], …] }
Las coordenadas del Catastro en Canarias vienen en UTM 28N (EPSG:4083/25828/32628): se pasan a latitud y longitud con las
fórmulas de la proyección (sin librerías) y a metros del juego como en prep.py (origen 28.4875, −16.3150).
Uso: python tools/catastro.py [--sin-bajar]
"""
import json, math, os, re, sys, io, zipfile, urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(ROOT, 'data', 'catastro')
TOP = 'https://www.catastro.hacienda.gob.es/INSPIRE/buildings/ES.SDGC.BU.atom.xml'
UA = {'User-Agent': 'JETA-La-Laguna/1.0 (mapa del juego)'}
LAT0, LON0 = 28.4875, -16.3150
KX = math.cos(math.radians(LAT0)) * 111320; KZ = 110574
BOX = (-5200, 3300, -2600, 4600)  # x0, x1, z0, z1 in game metres (the map plus a margin to the north and east)


def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=180) as r: data = r.read()
    return data if binary else data.decode('utf-8', 'replace')


def links(xml):
    """(title, href) of every entry of an ATOM feed."""
    out = []
    for m in re.finditer(r'<entry>(.*?)</entry>', xml, re.S):
        e = m.group(1); t = re.search(r'<title[^>]*>(.*?)</title>', e, re.S)
        for h in re.findall(r'<link[^>]*href="([^"]+)"', e): out.append(((t.group(1) if t else '').strip(), h))
    return out


def bajar():
    os.makedirs(DIR, exist_ok=True)
    top = get(TOP)
    prov = [h for t, h in links(top) if 'Tenerife' in t or '/38/' in h or 'atom_38' in h]
    if not prov: raise SystemExit('no encuentro la provincia 38 en ' + TOP)
    feed = get(prov[0])
    zips = [(t, h) for t, h in links(feed) if 'LAGUNA' in t.upper() and h.lower().endswith('.zip')]
    if not zips: raise SystemExit('no encuentro La Laguna en ' + prov[0] + '\n' + '\n'.join(t for t, _ in links(feed)[:80]))
    t, h = zips[0]; print('bajando', t, h, flush=True)
    data = get(h.replace(' ', '%20'), binary=True)
    dest = os.path.join(DIR, os.path.basename(h).replace('%20', ' '))
    open(dest, 'wb').write(data); print('guardado', dest, len(data) // 1024, 'KB', flush=True)
    return dest


def utm_to_ll(E, N, zone=28):
    """UTM (GRS80 ~ WGS84) to latitude, longitude in degrees (Snyder's series; centimetre-level in the zone)."""
    a, f = 6378137.0, 1 / 298.257222101; e2 = f * (2 - f); ep2 = e2 / (1 - e2); k0 = 0.9996
    x = E - 500000.0; y = N
    M = y / k0; mu = M / (a * (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256))
    e1 = (1 - math.sqrt(1 - e2)) / (1 + math.sqrt(1 - e2))
    p1 = mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * math.sin(2 * mu) + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * math.sin(4 * mu) \
        + (151 * e1 ** 3 / 96) * math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * math.sin(8 * mu)
    s, c, t = math.sin(p1), math.cos(p1), math.tan(p1)
    C1 = ep2 * c * c; T1 = t * t; N1 = a / math.sqrt(1 - e2 * s * s); R1 = a * (1 - e2) / (1 - e2 * s * s) ** 1.5; D = x / (N1 * k0)
    lat = p1 - (N1 * t / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * ep2) * D ** 4 / 24
                                + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * ep2 - 3 * C1 * C1) * D ** 6 / 720)
    lon = (D - (1 + 2 * T1 + C1) * D ** 3 / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * ep2 + 24 * T1 * T1) * D ** 5 / 120) / c
    return math.degrees(lat), (zone - 1) * 6 - 180 + 3 + math.degrees(lon)


def game(E, N):
    la, lo = utm_to_ll(E, N)
    return round((lo - LON0) * KX * 2) / 2, round(-(la - LAT0) * KZ * 2) / 2


def poly(el):
    """outer ring of the first surface of a feature, in game coordinates (or None)."""
    for pl in el.iter():
        if pl.tag.endswith('posList'):
            v = [float(t) for t in pl.text.split()]
            dim = int(pl.get('srsDimension') or 2)
            pts = [game(v[i], v[i + 1]) for i in range(0, len(v) - 1, dim)]
            if len(pts) > 1 and pts[0] == pts[-1]: pts.pop()
            if len(pts) < 3: return None
            xs = [p[0] for p in pts]; zs = [p[1] for p in pts]
            if max(xs) < BOX[0] or min(xs) > BOX[1] or max(zs) < BOX[2] or min(zs) > BOX[3]: return None
            return [c for p in pts for c in p]
    return None


def txt(el, name):
    for c in el.iter():
        if c.tag.endswith(name) and c.text: return c.text.strip()
    return ''


def leer(zpath):
    z = zipfile.ZipFile(zpath); names = z.namelist(); print('en el zip:', names, flush=True)
    partes, edif = [], []
    for n in names:
        low = n.lower()
        if not low.endswith('.gml'): continue
        kind = 'part' if 'buildingpart' in low else 'bu' if low.endswith('.building.gml') else None
        if not kind: continue
        for ev, el in ET.iterparse(io.BytesIO(z.read(n)), events=('end',)):
            tag = el.tag.rsplit('}', 1)[-1]
            if kind == 'part' and tag == 'BuildingPart':
                c = poly(el)
                if c:
                    a = txt(el, 'numberOfFloorsAboveGround'); b = txt(el, 'numberOfFloorsBelowGround')
                    partes.append([int(a) if a.isdigit() else 0, int(b) if b.isdigit() else 0, c])
                el.clear()
            elif kind == 'bu' and tag == 'Building':
                c = poly(el)
                if c:
                    uso = txt(el, 'currentUse'); uso = uso.rsplit('/', 1)[-1] if uso else ''
                    nf = txt(el, 'numberOfFloorsAboveGround'); yr = txt(el, 'end') or txt(el, 'beginning')
                    edif.append([uso, int(nf) if nf.isdigit() else 0, yr[:4], c])
                el.clear()
    return partes, edif


if __name__ == '__main__':
    if '--sin-bajar' in sys.argv:
        zs = [os.path.join(DIR, f) for f in os.listdir(DIR) if f.lower().endswith('.zip')]; zp = zs[0]
    else: zp = bajar()
    partes, edif = leer(zp)
    out = os.path.join(ROOT, 'data', 'catastro_bu.json')
    json.dump({'partes': partes, 'edificios': edif}, open(out, 'w', encoding='utf-8'), separators=(',', ':'))
    print('partes', len(partes), 'edificios', len(edif), '->', out, os.path.getsize(out) // 1024, 'KB')
