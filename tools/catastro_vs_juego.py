# v1.4.48 (Jonay, 24-nov: «haz una revisión con los datos reales del Catastro para ver qué edificios nos faltan… no sea que
# al partir de revisiones ya haya datos perdidos»): compara los edificios del Catastro (data/catastro_bu.json) con las
# plantas FINALES del juego (tests/shots/plantas_finales.json, de herramientas/sonda_plantas_finales.py) y con las de los
# datos de partida. Para cada edificio del Catastro dentro de la zona del mapa, qué parte de su planta cubren:
#   - falta: el juego cubre menos del 25 % (no está);
#   - perdido: los datos lo cubrían (50 % o más) pero el juego no (se pierde por el camino: recortes, quitados…);
#   - recortado: el juego cubre entre el 25 y el 70 % de lo que cubrían los datos.
# Salida: reportes/catastro/vs_juego.md y vs_juego.json (todos los casos con coordenadas).
# Uso: python tools/catastro_vs_juego.py
import json, math, os, collections, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from simplificar_planta import simplificar

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STEP = 1.5
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


def index(polys):
    g = collections.defaultdict(list)
    bb = []
    for k, p in enumerate(polys):
        b = bbox(p)
        bb.append(b)
        for a in range(int(math.floor(b[0] / CELL)), int(math.floor(b[2] / CELL)) + 1):
            for c in range(int(math.floor(b[1] / CELL)), int(math.floor(b[3] / CELL)) + 1):
                g[(a, c)].append(k)
    return g, bb


def covered(x, z, polys, g, bb):
    for k in g.get((int(math.floor(x / CELL)), int(math.floor(z / CELL))), ()):
        b = bb[k]
        if b[0] <= x <= b[2] and b[1] <= z <= b[3] and inside(x, z, polys[k]):
            return True
    return False


def main():
    cat = json.load(open(os.path.join(ROOT, 'data', 'catastro_bu.json'), encoding='utf-8'))['edificios']
    pf = json.load(open(os.path.join(ROOT, 'tests', 'shots', 'plantas_finales.json'), encoding='utf-8'))
    juego = [[v for p in P for v in p] for P in pf['juego'] if len(P) >= 3]
    datos = [p for p in pf['datos'] if len(p) >= 6]
    gj, bj = index(juego)
    gd, bd = index(datos)
    # the map's zone: the cells where the game has buildings (and their neighbours)
    zona = set()
    for (a, c) in gj:
        for da in (-1, 0, 1):
            for dc in (-1, 0, 1):
                zona.add((a + da, c + dc))
    falta, perdido, recortado, nuevos = [], [], [], []
    partes = [q for q in json.load(open(os.path.join(ROOT, 'data', 'catastro_bu.json'), encoding='utf-8'))['partes'] if len(q) >= 3 and len(q[2]) >= 6]
    pcen, gpart = [], collections.defaultdict(list)
    for k, q in enumerate(partes):
        b = bbox(q[2])
        pcen.append(((b[0] + b[2]) / 2, (b[1] + b[3]) / 2))
        gpart[(int(math.floor(pcen[-1][0] / CELL)), int(math.floor(pcen[-1][1] / CELL)))].append(k)
    n = 0
    for e in cat:
        p = e[3]
        if len(p) < 6:
            continue
        A = area(p)
        if A < 20:
            continue  # (sheds, kiosks)
        x0, z0, x1, z1 = bbox(p)
        cx, cz = (x0 + x1) / 2, (z0 + z1) / 2
        if (int(math.floor(cx / CELL)), int(math.floor(cz / CELL))) not in zona:
            continue
        n += 1
        tot = cj = cd = 0
        z = math.floor(z0 / STEP) * STEP + STEP / 2
        while z < z1:
            x = math.floor(x0 / STEP) * STEP + STEP / 2
            while x < x1:
                if inside(x, z, p):
                    tot += 1
                    if covered(x, z, juego, gj, bj):
                        cj += 1
                    if covered(x, z, datos, gd, bd):
                        cd += 1
                x += STEP
            z += STEP
        if not tot:
            continue
        fj, fd = cj / tot, cd / tot
        caso = [round(cx), round(cz), round(A), e[0], round(fd, 2), round(fj, 2)]
        # (v1.4.48, Jonay: «sí, añádelos»): the ones the game does not cover at all (under 10 %) go to the game, with
        # their floors, in data/catastro_add2.json (build.py adds them to the Catastro list: addCatastro, 05y_muros.js)
        if fj < 0.1:
            # the floors: the highest of the building's parts (partes: [floors above, below, footprint]) inside it
            fl = 0
            for k in gpart.get((int(math.floor(cx / CELL)), int(math.floor(cz / CELL))), ()):
                q = partes[k]
                if isinstance(q[0], (int, float)) and inside(pcen[k][0], pcen[k][1], p):
                    fl = max(fl, int(q[0]))
            nuevos.append([max(1, min(14, fl or 2)), [round(v * 2) / 2 for v in simplificar(p)]])
        if fj < 0.25 and fd >= 0.5:
            perdido.append(caso)
        elif fj < 0.25:
            falta.append(caso)
        elif fd > 0 and fj < 0.7 * fd:
            recortado.append(caso)
    out = {'revisados': n, 'falta': sorted(falta, key=lambda c: -c[2]), 'perdido': sorted(perdido, key=lambda c: -c[2]),
           'recortado': sorted(recortado, key=lambda c: -c[2])}
    os.makedirs(os.path.join(ROOT, 'reportes', 'catastro'), exist_ok=True)
    json.dump(nuevos, open(os.path.join(ROOT, 'data', 'catastro_add2.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    print('nuevos para el juego:', len(nuevos))
    json.dump(out, open(os.path.join(ROOT, 'reportes', 'catastro', 'vs_juego.json'), 'w', encoding='utf-8'))
    L = ['# Catastro frente al juego (plantas finales)', '',
         'Edificios del Catastro revisados (de 20 m² o más, dentro de la zona del mapa): %d' % n, '',
         '| Caso | Edificios | Superficie (m²) |', '|---|---|---|']
    for k, nom in (('falta', 'Faltan (ni en los datos ni en el juego)'), ('perdido', 'Perdidos por el camino (en los datos, no en el juego)'),
                   ('recortado', 'Recortados a menos del 70 %')):
        L.append('| %s | %d | %d |' % (nom, len(out[k]), sum(c[2] for c in out[k])))
    for k in ('perdido', 'falta', 'recortado'):
        L += ['', '## %s: los 25 más grandes (X, Y, m², plantas, cubierto en datos, en el juego)' % k, '']
        for c in out[k][:25]:
            L.append('- X %d, Y %d · %d m² · %s plantas · datos %.0f %% · juego %.0f %%' % (c[0], c[1], c[2], c[3], c[4] * 100, c[5] * 100))
    open(os.path.join(ROOT, 'reportes', 'catastro', 'vs_juego.md'), 'w', encoding='utf-8').write('\n'.join(L))
    print('\n'.join(L[:12]))


if __name__ == '__main__':
    main()
