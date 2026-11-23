"""v1.4.47 (Jonay: «se ve a través del Linguini por detrás»): busca huecos por los que se ve a través de los coches de
data/coches.json mirando desde atrás y desde delante: rayos paralelos al eje del coche; si lo primero que tocan es una cara
que mira hacia dentro (el juego no la dibuja), por ahí se ve lo de detrás. Solo la carrocería (parte «body»), en la franja
central (|x| < 0,6 m), sin los modelos «-lejos». Sin navegador. Uso: python tests/herramientas/sonda_huecos_coches.py [modelo…]"""
import base64, json, sys, zlib
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
M = json.load(open(ROOT / 'data' / 'coches.json', encoding='utf-8'))['m']


def body(name):
    d = M[name]
    raw = zlib.decompress(base64.b64decode(d['z']), -15)
    o = [0]

    def take(n):
        b = raw[o[0]:o[0] + n]
        o[0] += n
        return b
    p = d['parts'][0]
    P = np.frombuffer(take(p['np']), np.int16).reshape(-1, 3) / 2000.0
    take(p['nn'])
    take(p['nc'])
    I = np.frombuffer(take(p['ni']), np.uint16).reshape(-1, 3)
    return P, I


def scan(name, step=0.02):
    P, I = body(name)
    tri = P[I]
    a = tri[:, 0]
    v0 = tri[:, 1] - a
    v1 = tri[:, 2] - a
    den = v0[:, 0] * v1[:, 1] - v1[:, 0] * v0[:, 1]
    ok = np.abs(den) > 1e-12
    dd = np.where(ok, den, 1)
    nz = np.cross(v0, v1)[:, 2]
    out = {}
    for side, sg in (('detrás', 1), ('delante', -1)):
        bad = []
        for y in np.arange(P[:, 1].min() + 0.05, P[:, 1].max() - 0.02, step):
            for x in np.arange(-0.6, 0.6001, step):
                px = x - a[:, 0]
                py = y - a[:, 1]
                u = (px * v1[:, 1] - v1[:, 0] * py) / dd
                v = (v0[:, 0] * py - px * v0[:, 1]) / dd
                m = ok & (u >= -1e-6) & (v >= -1e-6) & (u + v <= 1 + 1e-6)
                if not m.any():
                    continue
                z = a[m, 2] + u[m] * v0[m, 2] + v[m] * v1[m, 2]
                idx = np.where(m)[0][np.argmin(z * sg)]
                if nz[idx] * sg > 0:  # the first face the ray meets looks away from it: culled, a hole
                    bad.append((round(float(x), 2), round(float(y), 2)))
        if bad:
            xs = [b[0] for b in bad]
            ys = [b[1] for b in bad]
            out[side] = (len(bad), min(xs), max(xs), min(ys), max(ys))
    return out


if __name__ == '__main__':
    names = sys.argv[1:] or [n for n in M if not n.endswith('-lejos')]
    for n in names:
        r = scan(n)
        print(n, 'sin huecos' if not r else '; '.join('%s: %d puntos, x %.2f…%.2f, y %.2f…%.2f' % ((k,) + v) for k, v in r.items()))
