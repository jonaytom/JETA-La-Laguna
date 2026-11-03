# Huecos del mapa comparados con el Catastro (v1.0.4; Jonay, 3-nov: «hay muchos huecos que no existen en la realidad»).
# Lee data/data.json (el mapa del juego, sacado del OSM), data/catastro_bu.json (tools/catastro.py) y data/barreras.json
# (tools/barreras.py) y busca los edificios del Catastro que el mapa no tiene (menos del 25 % de su planta cubierta por
# edificios del juego), cuánto de cada uno cae sobre una calzada del juego, y las zonas con más superficie que falta.
# No necesita el juego (no usa la página); va en una lista de pruebas para que corra en el PC.
# Uso: herramientas/comparar_catastro.py → reportes/catastro/ULTIMO.md, huecos.json y mapa_huecos.png
import json, math, os, struct, zlib, time

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'reportes', 'catastro')
STEP = 1.5   # metres between the sample points inside each building of the Catastro
CELL = 25.0  # spatial index


def bbox(p):
    xs, zs = p[0::2], p[1::2]; return min(xs), min(zs), max(xs), max(zs)


def inside(x, z, p):
    n = len(p) // 2; c = False; j = n - 1
    for i in range(n):
        xi, zi, xj, zj = p[2 * i], p[2 * i + 1], p[2 * j], p[2 * j + 1]
        if (zi > z) != (zj > z) and x < xi + (z - zi) * (xj - xi) / (zj - zi): c = not c
        j = i
    return c


def samples(p):
    x0, z0, x1, z1 = bbox(p); out = []
    z = math.floor(z0 / STEP) * STEP + STEP / 2
    while z < z1:
        x = math.floor(x0 / STEP) * STEP + STEP / 2
        while x < x1:
            if inside(x, z, p): out.append((x, z))
            x += STEP
        z += STEP
    return out


class Index:
    def __init__(self): self.g = {}
    def add(self, item, x0, z0, x1, z1):
        for i in range(int(x0 // CELL), int(x1 // CELL) + 1):
            for j in range(int(z0 // CELL), int(z1 // CELL) + 1): self.g.setdefault((i, j), []).append(item)
    def near(self, x, z): return self.g.get((int(x // CELL), int(z // CELL)), ())


def seg_d2(x, z, ax, az, bx, bz):
    dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz
    t = 0 if L2 == 0 else max(0, min(1, ((x - ax) * dx + (z - az) * dz) / L2))
    ex, ez = x - ax - t * dx, z - az - t * dz; return ex * ex + ez * ez


def png(path, w, h, px):
    raw = bytearray()
    for j in range(h): raw += b'\x00' + px[j * w * 3:(j + 1) * w * 3]
    def ch(t, d): return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    open(path, 'wb').write(b'\x89PNG\r\n\x1a\n' + ch(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + ch(b'IDAT', zlib.compress(bytes(raw), 6)) + ch(b'IEND', b''))


def main():
    t0 = time.time(); os.makedirs(OUT, exist_ok=True)
    d = json.load(open(os.path.join(ROOT, 'data', 'data.json'), encoding='utf-8'))
    c = json.load(open(os.path.join(ROOT, 'data', 'catastro_bu.json'), encoding='utf-8'))
    try: bar = json.load(open(os.path.join(ROOT, 'data', 'barreras.json'), encoding='utf-8'))
    except Exception: bar = []
    S = d['S']
    X0, X1, Z0, Z1 = -4808, 2800, -1800, 4400
    bi = Index()
    for b in d['B']:
        if b[6]: bi.add(b[6], *bbox(b[6]))
    ri = Index()  # carriageways and pedestrian streets: (half width², segment)
    for r in d['R']:
        if r[0] > 13: continue
        p, hw = r[4], max(0.5, r[2] / 2)
        for k in range(0, len(p) - 2, 2):
            ax, az, bx, bz = p[k:k + 4]; ri.add((hw * hw, ax, az, bx, bz, r[1]), min(ax, bx) - hw, min(az, bz) - hw, max(ax, bx) + hw, max(az, bz) + hw)
    falt, cubre, pts_falta = [], 0, []
    for k, e in enumerate(c['edificios']):
        p = e[3]; x0, z0, x1, z1 = bbox(p)
        if x1 < X0 or x0 > X1 or z1 < Z0 or z0 > Z1: continue
        sp = samples(p); A = len(sp) * STEP * STEP
        if A < 25: continue
        libres = [(x, z) for x, z in sp if not any(inside(x, z, q) for q in bi.near(x, z))]  # v1.0.4b: what of it the game does not cover (block interiors with only the edge houses)
        cov = 1 - len(libres) / len(sp); fA = len(libres) * STEP * STEP
        if fA < 30: cubre += 1; continue
        enr = sum(1 for x, z in libres if any(seg_d2(x, z, *s[1:5]) <= s[0] for s in ri.near(x, z))) / len(libres)
        xs, zs = p[0::2], p[1::2]
        falt.append({'i': k, 'x': round(sum(x for x, _ in libres) / len(libres)), 'y': round(sum(z for _, z in libres) / len(libres)), 'm2': round(fA), 'm2_total': round(A), 'cubierto': round(cov, 2), 'en_calzada': round(enr, 2), 'uso': e[0], 'plantas': e[1], 'año': e[2]})
        pts_falta += libres
    print('comparado en', int(time.time() - t0), 's', flush=True)

    def calle(x, y):
        best = (1e18, '')
        for di in (-1, 0, 1):
            for dj in (-1, 0, 1):
                for s in ri.g.get((int(x // CELL) + di, int(y // CELL) + dj), ()):
                    if s[5] < 0: continue
                    dd = seg_d2(x, y, *s[1:5])
                    if dd < best[0]: best = (dd, S[s[5]])
        return best[1] or '?'
    zonas = {}
    for f in falt:
        key = (f['x'] // 50 * 50 + 25, f['y'] // 50 * 50 + 25); z = zonas.setdefault(key, [0, 0, 0]); z[0] += f['m2']; z[1] += 1; z[2] += f['en_calzada'] > 0.3
    top = sorted(zonas.items(), key=lambda kv: -kv[1][0])[:60]
    tipos = {}
    for b in bar:
        p = b[3]; L = sum(math.hypot(p[k + 2] - p[k], p[k + 3] - p[k + 1]) for k in range(0, len(p) - 2, 2)); t = tipos.setdefault(b[0], [0, 0]); t[0] += 1; t[1] += L
    L = ['# Huecos del mapa comparados con el Catastro', '',
         f'Edificios del Catastro en la zona del mapa (≥ 25 m²): {cubre + len(falt)} · enteros en el juego: {cubre} · **con al menos 30 m² sin edificio en el juego: {len(falt)}** '
         f'({sum(f["m2"] for f in falt)} m² de planta sin cubrir) · de los que faltan, con más del 30 % sobre una calzada del juego: '
         f'{sum(1 for f in falt if f["en_calzada"] > 0.3)} (calle ensanchada o mal trazada ahí).', '',
         'Muros y vallas del OSM (`data/barreras.json`): ' + ', '.join(f'{k} {v[0]} ({round(v[1] / 1000, 1)} km)' for k, v in sorted(tipos.items(), key=lambda kv: -kv[1][1])), '',
         '## Sitios que dijo Jonay', '']
    for nm, x, y in (('Callejón Montaraz', -896, -348), ('Callejón Montaraz (2)', -923, -322), ('Junto al Teatro Leal', -301, -262), ('Patio Av. Trinidad', -191, 366)):
        nr = [f for f in falt if abs(f['x'] - x) < 60 and abs(f['y'] - y) < 60]
        nb = sum(1 for b in bar if any(abs(b[3][k] - x) < 60 and abs(b[3][k + 1] - y) < 60 for k in range(0, len(b[3]), 2)))
        L.append(f'- {nm} (X {x}, Y {y}): faltan {len(nr)} edificios, {sum(f["m2"] for f in nr)} m², sobre calzada {sum(1 for f in nr if f["en_calzada"] > 0.3)}; muros o vallas del OSM a menos de 60 m: {nb}')
    L += ['', '## Las 60 zonas de 50 × 50 m con más superficie que falta', '', '| X | Y | calle cercana | m² | edificios | sobre calzada |', '|---|---|---|---|---|---|']
    for (x, y), (a, n, nr) in top: L.append(f'| {x} | {y} | {calle(x, y)} | {a} | {n} | {nr} |')
    open(os.path.join(OUT, 'ULTIMO.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
    json.dump(falt, open(os.path.join(OUT, 'huecos.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    # picture of the old town and around: 1 px = 2 m, X −1500…900, Y −1100…1300
    ax0, az0, Wp, Hp, M = -1500, -1100, 1200, 1200, 2.0
    px = bytearray([236]) * (Wp * Hp * 3)
    def put(x, z, col):
        i, j = int((x - ax0) / M), int((z - az0) / M)
        if 0 <= i < Wp and 0 <= j < Hp: o = (j * Wp + i) * 3; px[o:o + 3] = bytes(col)
    for r in d['R']:
        if r[0] > 13: continue
        p = r[4]
        for k in range(0, len(p) - 2, 2):
            ax, az, bx, bz = p[k:k + 4]; n = max(1, int(math.hypot(bx - ax, bz - az) / M))
            for t in range(n + 1): put(ax + (bx - ax) * t / n, az + (bz - az) * t / n, (150, 150, 150))
    for b in d['B']:
        p = b[6]
        if not p: continue
        x0, z0, x1, z1 = bbox(p)
        if x1 < ax0 or z1 < az0 or x0 > ax0 + Wp * M or z0 > az0 + Hp * M: continue
        z = z0 + 1
        while z < z1:
            x = x0 + 1
            while x < x1:
                if inside(x, z, p): put(x, z, (205, 170, 130))
                x += M
            z += M
    for x, z in pts_falta: put(x, z, (220, 30, 30))
    for b in bar:
        p = b[3]
        for k in range(0, len(p) - 2, 2):
            ax, az, bx, bz = p[k:k + 4]; n = max(1, int(math.hypot(bx - ax, bz - az) / 1.0))
            for t in range(n + 1): put(ax + (bx - ax) * t / n, az + (bz - az) * t / n, (30, 70, 220))
    png(os.path.join(OUT, 'mapa_huecos.png'), Wp, Hp, px)
    print('\n'.join(L[:12]))
    print('en total', int(time.time() - t0), 's')
    print('SONDA CATASTRO OK')


async def run(pg):
    main()


if __name__ == '__main__':
    main()
