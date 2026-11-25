# v1.4.48 (Jonay, 24-nov, con una vista real de la Calle Barcelona: la manzana es una fila de edificios pegados; «si hay
# zonas en las que difiere OpenStreetMap con el Catastro me avisas»): edificios GRUESOS del OSM, una sola planta que cubre
# una manzana entera donde el Catastro tiene cada edificio por separado. Un edificio del OSM de 1.500 m² o más cuya planta
# cubren en un 60 % o más 4 o más edificios del Catastro se cambia por esos edificios:
#   data/osm_gruesos.json      los centros de los edificios del OSM que se quitan (addCatastro, 05y_muros.js)
#   data/catastro_add3.json    los edificios del Catastro que van en su lugar ([plantas, planta])
#   reportes/catastro/gruesos.md  la lista, para mirarlos con Jonay
# Uso: python tools/osm_gruesos.py  (lee data/data.json y data/catastro_bu.json; no necesita el juego)
import json, math, os, collections, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from simplificar_planta import simplificar

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STEP = 2.0
CELL = 25.0


def bbox(p):
    xs, zs = p[0::2], p[1::2]
    return min(xs), min(zs), max(xs), max(zs)


def inside(x, z, p):
    n = len(p) // 2
    c = False
    j = n - 1
    for i in range(n):
        xi, zi, xj, zj = p[2 * i], p[2 * i + 1], p[2 * j], p[2 * j + 1]
        if (zi > z) != (zj > z) and x < xi + (z - zi) * (xj - xi) / (zj - zi):
            c = not c
        j = i
    return c


def area(p):
    a = 0
    n = len(p) // 2
    for i in range(n):
        j = (i + 1) % n
        a += p[2 * i] * p[2 * j + 1] - p[2 * j] * p[2 * i + 1]
    return abs(a) / 2


def main():
    osm = json.load(open(os.path.join(ROOT, 'data', 'data.json'), encoding='utf-8'))['B']
    cb = json.load(open(os.path.join(ROOT, 'data', 'catastro_bu.json'), encoding='utf-8'))
    cat = [e for e in cb['edificios'] if len(e[3]) >= 6]
    partes = [q for q in cb['partes'] if len(q) >= 3 and len(q[2]) >= 6]
    g = collections.defaultdict(list)
    cbb = []
    for k, e in enumerate(cat):
        b = bbox(e[3])
        cbb.append(b)
        for a in range(int(math.floor(b[0] / CELL)), int(math.floor(b[2] / CELL)) + 1):
            for c in range(int(math.floor(b[1] / CELL)), int(math.floor(b[3] / CELL)) + 1):
                g[(a, c)].append(k)
    gp = collections.defaultdict(list)
    pc = []
    for k, q in enumerate(partes):
        b = bbox(q[2])
        pc.append(((b[0] + b[2]) / 2, (b[1] + b[3]) / 2))
        gp[(int(math.floor(pc[-1][0] / CELL)), int(math.floor(pc[-1][1] / CELL)))].append(k)

    def floors(p, cx, cz):
        fl = 0
        x0, z0, x1, z1 = bbox(p)
        for a in range(int(math.floor(x0 / CELL)), int(math.floor(x1 / CELL)) + 1):
            for c in range(int(math.floor(z0 / CELL)), int(math.floor(z1 / CELL)) + 1):
                for k in gp.get((a, c), ()):
                    if isinstance(partes[k][0], (int, float)) and inside(pc[k][0], pc[k][1], p):
                        fl = max(fl, int(partes[k][0]))
        return max(1, min(14, fl or 2))

    quitar, nuevos, lista = [], [], []
    for b in osm:
        p = b[6]
        if len(p) < 6 or b[1] == 4 or b[4] >= 0:  # (churches, landmarks and named buildings stay as in the OSM)
            continue
        A = area(p)
        if A < 1500:
            continue
        x0, z0, x1, z1 = bbox(p)
        tot = cov = 0
        hit = set()
        z = math.floor(z0 / STEP) * STEP + STEP / 2
        while z < z1:
            x = math.floor(x0 / STEP) * STEP + STEP / 2
            while x < x1:
                if inside(x, z, p):
                    tot += 1
                    for k in g.get((int(math.floor(x / CELL)), int(math.floor(z / CELL))), ()):
                        bb = cbb[k]
                        if bb[0] <= x <= bb[2] and bb[1] <= z <= bb[3] and inside(x, z, cat[k][3]):
                            cov += 1
                            hit.add(k)
                            break
                x += STEP
            z += STEP
        if not tot or cov / tot < 0.6 or len(hit) < 4:
            continue
        n = len(p) // 2
        cx, cz = sum(p[0::2]) / n, sum(p[1::2]) / n
        quitar.append([round(cx, 1), round(cz, 1)])
        for k in hit:
            q = cat[k][3]
            if area(q) < 12:
                continue
            m = len(q) // 2
            qx, qz = sum(q[0::2]) / m, sum(q[1::2]) / m
            if not inside(qx, qz, p):
                continue  # (only the ones that are part of this block)
            nuevos.append([floors(q, qx, qz), [round(v * 2) / 2 for v in simplificar(q)]])
        lista.append([round(cx), round(cz), round(A), len(hit), round(cov / tot, 2)])
    json.dump(quitar, open(os.path.join(ROOT, 'data', 'osm_gruesos.json'), 'w', encoding='utf-8'))
    json.dump(nuevos, open(os.path.join(ROOT, 'data', 'catastro_add3.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    lista.sort(key=lambda c: -c[2])
    L = ['# Edificios gruesos del OSM cambiados por los del Catastro', '',
         '%d edificios del OSM (de 1.500 m² o más, cubiertos en un 60 %% o más por 4 o más del Catastro) → %d edificios del Catastro.' % (len(lista), len(nuevos)), '',
         '| X | Y | m² del OSM | edificios del Catastro | cubierto |', '|---|---|---|---|---|']
    for c in lista:
        L.append('| %d | %d | %d | %d | %.0f %% |' % (c[0], c[1], c[2], c[3], c[4] * 100))
    os.makedirs(os.path.join(ROOT, 'reportes', 'catastro'), exist_ok=True)
    open(os.path.join(ROOT, 'reportes', 'catastro', 'gruesos.md'), 'w', encoding='utf-8').write('\n'.join(L))
    print('\n'.join(L[:3]))


if __name__ == '__main__':
    main()
