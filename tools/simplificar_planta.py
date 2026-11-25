# v1.4.48: simplifica una planta (lista plana x, z, …) quitando los puntos que no se desvían más de tol de la recta entre
# los que quedan (Douglas-Peucker en anillo). La usan tools/catastro_vs_juego.py y tools/osm_gruesos.py (auditoría 1.4.48:
# +51 % de vértices con los edificios del Catastro, que traen plantas de 10–30 puntos).
import math


def simplificar(p, tol=0.4):
    pts = [(p[i], p[i + 1]) for i in range(0, len(p), 2)]
    if len(pts) > 1 and pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) <= 4:
        return p
    keep = [False] * len(pts)
    # anchor: the point furthest from the first one
    f = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
    keep[0] = keep[f] = True

    def dp(a, b):
        ax, az = pts[a % len(pts)]
        bx, bz = pts[b % len(pts)]
        L = math.hypot(bx - ax, bz - az) or 1e-9
        w, wd = -1, tol
        for i in range(a + 1, b):
            x, z = pts[i % len(pts)]
            d = abs((x - ax) * (bz - az) - (z - az) * (bx - ax)) / L
            if d > wd:
                w, wd = i, d
        if w < 0:
            return
        keep[w % len(pts)] = True
        dp(a, w)
        dp(w, b)

    dp(0, f)
    dp(f, len(pts))
    q = [pts[i] for i in range(len(pts)) if keep[i]]
    if len(q) < 3:
        return p
    return [v for xy in q for v in xy]
