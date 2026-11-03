"""Edificios del Catastro que el mapa no tiene, y muros y vallas del OSM, preparados para el juego (v1.0.4; Jonay, 3-nov:
«hay muchos huecos que no existen en la realidad» y «además de los edificios hay que repasar muros y vallas/cercas»).

Lee data/data.json (el mapa, sacado del OSM por prep.py), data/catastro_bu.json (tools/catastro.py) y data/barreras.json
(tools/barreras.py) y escribe lo que build.py mete en el juego:
  data/catastro_add.json  [[plantas, [x,z, …]], …]  edificios del Catastro (su contorno simplificado, con las plantas de su parte mayor) que ningún
                          edificio del mapa cubre (menos del 20 % tapado) y que no caen sobre una calle del juego.
                          En las manzanas que el juego rellena con casas inventadas por el borde (BLOCK_SPLIT de
                          src/05q_inicio.js) solo se mete lo de dentro, más allá de la franja de 12 m de esas casas.
  data/barreras_juego.json [[tipo, altura, material, [x,z, …]], …]  los muros y vallas, cortados donde cruzan una calle,
                          un camino o un edificio (ahí suele haber un portón o el muro es la fachada).
Las coordenadas pasan por las mismas glorietas agrandadas que el resto del mapa (DATA.W). Sin librerías.
Uso: python tools/catastro_add.py   (o la lista de pruebas «catastro_add», que lo lanza en el PC)
"""
import json, math, os, re, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = lambda *a: os.path.join(ROOT, *a)
X0, X1, Z0, Z1 = -4808, 2800, -1800, 4400
CELL = 25.0
RING = 12.0   # depth of the invented houses along the edge of a BLOCK_SPLIT block (05q_inicio.js: D ≤ 11.5 m)


def bbox(p): xs, zs = p[0::2], p[1::2]; return min(xs), min(zs), max(xs), max(zs)


def inside(x, z, p):
    n = len(p) // 2; c = False; j = n - 1
    for i in range(n):
        xi, zi, xj, zj = p[2 * i], p[2 * i + 1], p[2 * j], p[2 * j + 1]
        if (zi > z) != (zj > z) and x < xi + (z - zi) * (xj - xi) / (zj - zi): c = not c
        j = i
    return c


def seg_d2(x, z, ax, az, bx, bz):
    dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz
    t = 0 if L2 == 0 else max(0, min(1, ((x - ax) * dx + (z - az) * dz) / L2))
    ex, ez = x - ax - t * dx, z - az - t * dz; return ex * ex + ez * ez


def area(p):
    n = len(p) // 2; return sum(p[2 * i] * p[2 * ((i + 1) % n) + 1] - p[2 * ((i + 1) % n)] * p[2 * i + 1] for i in range(n)) / 2


def ring_simp(c, tol):
    """drop the points of a closed outline that lie within tol of the line between their neighbours (fewer walls)."""
    pts = [(c[i], c[i + 1]) for i in range(0, len(c), 2)]; changed = True
    while changed and len(pts) > 3:
        changed = False
        for i in range(len(pts)):
            a, b, e = pts[i - 1], pts[i], pts[(i + 1) % len(pts)]
            L = math.hypot(e[0] - a[0], e[1] - a[1]) or 1
            if abs((b[0] - a[0]) * (e[1] - a[1]) - (b[1] - a[1]) * (e[0] - a[0])) / L < tol or math.hypot(b[0] - a[0], b[1] - a[1]) < 0.3:
                pts.pop(i); changed = True; break
    return [v for p in pts for v in p]


def edge_d2(x, z, p):
    n = len(p) // 2; return min(seg_d2(x, z, p[2 * i], p[2 * i + 1], p[2 * ((i + 1) % n)], p[2 * ((i + 1) % n) + 1]) for i in range(n))


class Index:
    def __init__(self): self.g = {}
    def add(self, item, x0, z0, x1, z1):
        for i in range(int(x0 // CELL), int(x1 // CELL) + 1):
            for j in range(int(z0 // CELL), int(z1 // CELL) + 1): self.g.setdefault((i, j), []).append(item)
    def near(self, x, z): return self.g.get((int(x // CELL), int(z // CELL)), ())


def samples(p, step):
    x0, z0, x1, z1 = bbox(p); out = []; z = math.floor(z0 / step) * step + step / 2
    while z < z1:
        x = math.floor(x0 / step) * step + step / 2
        while x < x1:
            if inside(x, z, p): out.append((x, z))
            x += step
        z += step
    return out


def main():
    t0 = time.time()
    d = json.load(open(P('data', 'data.json'), encoding='utf-8'))
    cat = json.load(open(P('data', 'catastro_bu.json'), encoding='utf-8'))
    try: bar = json.load(open(P('data', 'barreras.json'), encoding='utf-8'))
    except Exception: bar = []
    WARPS = d.get('W', [])
    def warp(c):
        o = []
        for j in range(0, len(c), 2):
            x, z = c[j], c[j + 1]
            for cx, cz, Rr, Rn, K in WARPS:
                dx, dz = x - cx, z - cz; dd = math.hypot(dx, dz)
                if dd >= Rr + K or dd < 1e-6: continue
                nd = dd * Rn / Rr if dd <= Rr else Rn + (dd - Rr) * (Rr + K - Rn) / K
                x, z = cx + dx / dd * nd, cz + dz / dd * nd
            o += [round(x * 2) / 2, round(z * 2) / 2]
        return o
    src = open(P('src', '05q_inicio.js'), encoding='utf-8').read()
    BS = [tuple(map(float, m)) for m in re.findall(r'\[(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\]', re.search(r'const BLOCK_SPLIT = \[(.*?)\];', src).group(1))]
    bi, rings = Index(), []
    for b in d['B']:
        c = b[6]
        if not c or len(c) < 6: continue
        n = len(c) // 2; cx = sum(c[0::2]) / n; cz = sum(c[1::2]) / n
        if any(abs(x - cx) < 3 and abs(z - cz) < 3 for x, z in BS): rings.append(c); continue  # replaced in the game by edge houses
        bi.add(c, *bbox(c))
    ri = Index()   # every way: carriageways with their width, paths 2 m
    for r in d['R']:
        p, hw = r[4], (max(0.5, r[2] / 2) if r[0] <= 13 else 0.9)  # v1.0.4b: the margin goes in on_road
        for k in range(0, len(p) - 2, 2):
            ax, az, bx, bz = p[k:k + 4]; m = hw * 1.25 + 1.2; ri.add((hw, ax, az, bx, bz, r[0] <= 13), min(ax, bx) - m, min(az, bz) - m, max(ax, bx) + m, max(az, bz) + m)
    ringI = Index()
    for c in rings: ringI.add(c, *bbox(c))
    def covered(x, z): return any(inside(x, z, q) for q in bi.near(x, z))
    def in_ring(x, z): return any(inside(x, z, q) and edge_d2(x, z, q) < RING * RING for q in ringI.near(x, z))
    def on_road(x, z, cars_only=True, wide=True):  # wide (buildings): the game widens some streets (WIDEN, narrowToGap); walls: the kerb line
        return any((s[5] or not cars_only) and seg_d2(x, z, *s[1:5]) <= ((s[0] * 1.25 + 1.2) if wide else (s[0] + 0.3)) ** 2 for s in ri.near(x, z))
    # v1.0.4b (the audit: +71 % vertices with every part): one block per building of the Catastro (its outline, simplified),
    # as tall as its biggest part; no sheds (< 30 m²); away from the streets with a margin (the game widens some)
    pi = Index()
    for fl, below, c in cat['partes']:
        if fl >= 1: x0, z0, x1, z1 = bbox(c); pi.add((fl, c, sum(c[0::2]) / (len(c) // 2), sum(c[1::2]) / (len(c) // 2), abs(area(c))), x0, z0, x1, z1)
    add, why = [], {'tapada': 0, 'calle': 0, 'pequeña': 0, 'sin plantas': 0, 'fuera': 0}
    for uso, nf, yr, c0 in cat['edificios']:
        x0, z0, x1, z1 = bbox(c0)
        if x0 < X0 or x1 > X1 or z0 < Z0 or z1 > Z1: why['fuera'] += 1; continue
        c = ring_simp(c0, 0.45)
        if len(c) < 6 or abs(area(c)) < 30: why['pequeña'] += 1; continue
        seen = set(); fls = []
        for gx in range(int(x0 // CELL), int(x1 // CELL) + 1):
            for gz in range(int(z0 // CELL), int(z1 // CELL) + 1):
                for it in pi.g.get((gx, gz), ()):
                    if id(it) in seen: continue
                    seen.add(id(it))
                    if inside(it[2], it[3], c0): fls.append((it[0], it[4]))
        if not fls: why['sin plantas'] += 1; continue
        big = max(a for _, a in fls); fl = max(f for f, a in fls if a >= 0.25 * big)  # the tallest of the big parts (not a small tower)
        sp = samples(c, 1.0)
        if len(sp) < 25: why['pequeña'] += 1; continue
        tap = sum(1 for x, z in sp if covered(x, z) or in_ring(x, z)) / len(sp)
        if tap > 0.2: why['tapada'] += 1; continue
        if any(on_road(x, z) for x, z in sp): why['calle'] += 1; continue
        add.append([fl, warp(c)])
    print('edificios del Catastro añadidos', len(add), 'descartadas', why, int(time.time() - t0), 's', flush=True)
    # walls and fences: cut where they cross a way or run inside a building (and inside the added parts)
    ai = Index()
    for fl, c in add: ai.add(c, *bbox(c))
    walls, cut = [], 0
    for kind, h, mat, c in bar:
        if kind in ('guard_rail', 'handrail'): continue
        run = []
        def flush():
            nonlocal run
            if len(run) >= 4 and sum(math.hypot(run[k + 2] - run[k], run[k + 3] - run[k + 1]) for k in range(0, len(run) - 2, 2)) >= 1.5: walls.append([kind, h, mat, warp(run)])
            run = []
        for k in range(0, len(c) - 2, 2):
            ax, az, bx, bz = c[k:k + 4]; L = math.hypot(bx - ax, bz - az); n = max(1, int(L / 0.75))
            for t in range(n + (1 if k == len(c) - 4 else 0)):
                x, z = ax + (bx - ax) * t / n, az + (bz - az) * t / n
                bad = on_road(x, z, cars_only=False, wide=False) or covered(x, z) or any(inside(x, z, q) for q in ai.near(x, z))
                if bad: cut += 1; flush()
                elif not run or (x, z) != (run[-2], run[-1]): run += [round(x * 2) / 2, round(z * 2) / 2]
            # keep only the corners of straight stretches: drop the in-between samples later in the game (cheap enough)
        flush()
    # simplify straight runs (the 0.75 m samples) back to their corners
    def simp(c):
        pts = [(c[i], c[i + 1]) for i in range(0, len(c), 2)]; out = [pts[0]]
        for i in range(1, len(pts) - 1):
            a, b, e = out[-1], pts[i], pts[i + 1]
            cr = abs((b[0] - a[0]) * (e[1] - a[1]) - (b[1] - a[1]) * (e[0] - a[0])) / (math.hypot(e[0] - a[0], e[1] - a[1]) or 1)
            if cr > 0.35: out.append(b)
        out.append(pts[-1]); return [v for p in out for v in p]
    walls = [[k, h, m, simp(c)] for k, h, m, c in walls]
    json.dump(add, open(P('data', 'catastro_add.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    json.dump(walls, open(P('data', 'barreras_juego.json'), 'w', encoding='utf-8'), separators=(',', ':'))
    tot = {}
    for k, h, m, c in walls: tot[k] = tot.get(k, 0) + sum(math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]) for i in range(0, len(c) - 2, 2))
    print('muros y vallas', len(walls), {k: round(v / 1000, 1) for k, v in tot.items()}, 'km · muestras cortadas', cut, '·', int(time.time() - t0), 's')


if __name__ == '__main__':
    main()
