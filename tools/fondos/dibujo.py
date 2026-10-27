# Proposal v4 (Jonay: «no puedes hacerlos sin recrear la foto tal cual?... es más bien la idea de lo que muestran lo que hay
# que representar, para que sea más acorde al juego»): every background DRAWN (by code) from a description of his photos,
# flat colours with a dark outline like the game's sprites, in parallax layers. The photos are only the reference.
# View 320 × 112 (the game's 960 × 336 at ×3). Layers that tile are periodic (640 px), the others are wide (480 px).
import math, random, pickle
import numpy as np
from PIL import Image, ImageDraw
H, V = 112, 320
def hx(s): s = s.lstrip('#'); return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))
def pal(*c): return [hx(x) for x in c]
def per(W, parts, seed):   # periodic noise (a sum of sines whose frequencies fit W, so the layer tiles)
    r = random.Random(seed); x = np.arange(W); v = np.zeros(W)
    for f, a in parts: v += a * np.sin(2 * math.pi * f * x / W + r.uniform(0, 6.3))
    return v
def blank(W): return np.zeros((H, W, 4), np.uint8)
def put(a, x, y, c):
    if 0 <= y < a.shape[0] and 0 <= x < a.shape[1]: a[y, x, :3] = c; a[y, x, 3] = 255
def outline(a, col):   # a 1 px dark line round the top edge of everything drawn (the sprites' look)
    m = a[..., 3] > 0; e = m & ~np.roll(m, 1, axis=0); e[0] = False
    side = m & (~np.roll(m, 1, axis=1) | ~np.roll(m, -1, axis=1)) & ~np.roll(np.roll(m, 1, axis=0), 0, axis=1)
    a[e | side, :3] = col
def sky(top, bot, bands=7):   # a gradient in a few steps, the borders between the steps wavy (no straight lines)
    a = blank(V); w = per(V, [(2, 1.2), (5, 0.8)], 1)
    for y in range(H):
        for x in range(V):
            k = min(1, max(0, (y + w[x]) / (H * 0.75))); k = round(k * bands) / bands
            a[y, x, :3] = [round(top[i] * (1 - k) + bot[i] * k) for i in range(3)]; a[y, x, 3] = 255
    return a
def mount(a, top, P, light=1, gul=0.9, seed=0, snow=None, depth=40, gf=24, blot=0.12):
    """a mountain under the line top[x]: P = palette dark→light. Lit side by the slope (light from the left when light=1),
    gullies running down from the crest, darker going down; snow = (y limit, colours) for a snowy summit"""
    W = a.shape[1]; s = np.gradient(np.convolve(np.r_[top[-4:], top, top[:4]], np.ones(9) / 9, 'same')[4:-4]) * light
    g = per(W, [(max(1, W // gf), 1), (max(1, W // (gf * 2)), 0.7)], seed)
    from scipy import ndimage
    bl = ndimage.gaussian_filter(np.random.RandomState(seed).randn(H, W), (3.5, 6), mode="wrap"); bl /= bl.std() + 1e-9   # patches (facets of rock)
    for x in range(W):
        for y in range(max(0, int(top[x])), H):
            d = (y - top[x]) / depth
            v = 0.55 - s[x] * 0.9 + g[x] * 0.14 * gul * max(0, 1 - d * 0.7) + bl[y, x] * blot - d * 0.35
            i = int(np.clip(round(v * (len(P) - 1)), 0, len(P) - 1)); c = P[i]
            if snow and y < snow[0] + g[x] * 2 and y - top[x] < 9: c = snow[1][1] if v > 0.45 else snow[1][0]
            a[y, x, :3] = c; a[y, x, 3] = 255
def blob(d, x, y, rx, ry, c, o=None):
    if o: d.ellipse([x - rx - 1, y - ry - 1, x + rx + 1, y + ry + 1], fill=o)
    d.ellipse([x - rx, y - ry, x + rx, y + ry], fill=c)
def cloud(d, x, y, w, rnd, cw=(250, 250, 255), cs=(200, 214, 236)):   # a cloud: puffs, light on top, a shade below
    pts = [(x + rnd.uniform(0, w), y - rnd.uniform(0, w * 0.18)) for _ in range(max(3, int(w / 7)))]
    for px, py in pts: r = rnd.uniform(w * 0.12, w * 0.22); d.ellipse([px - r, py - r * 0.7 + 2, px + r, py + r * 0.7 + 2], fill=cs)
    for px, py in pts: r = rnd.uniform(w * 0.1, w * 0.18); d.ellipse([px - r, py - r * 0.7, px + r, py + r * 0.6], fill=cw)
def wrap(draw_fn, W):   # draw things near the edge twice so a tiled layer has no seam
    draw_fn(0); draw_fn(-W); draw_fn(W)
def pino(d, x, y, h, P, o):   # a Canarian pine: a thin trunk, tufts in tiers
    d.rectangle([x - 1, y - h, x + 1, y], fill=o)
    for k in range(4):
        yy = y - h + k * h * 0.2; w = 3 + k * 2.2
        blob(d, x, yy, w, 2.6, P[1], o); d.ellipse([x - w, yy - 2.6, x + w * 0.2, yy], fill=P[2])
def retama(d, x, y, P, o, r=4):
    blob(d, x, y - r, r * 1.5, r, P[0], o); d.ellipse([x - r * 1.2, y - r * 1.9, x + r * 0.4, y - r * 0.7], fill=P[1]); d.point((x - r * 0.6, y - r * 1.5), fill=P[2])
def palm_fern(d, x, y, L, col, col2, o, side):   # a fern frond: a stem with leaflets
    for k in range(L):
        px = x + side * k * 0.9; py = y - k * 0.95 + k * k * 0.035
        d.line([(px, py - 1), (px - side * 2, py - 3 - (L - k) * 0.12)], fill=col if k % 2 else col2)
        d.line([(px, py + 1), (px - side * 1, py + 3)], fill=col2)
        d.point((px, py), fill=o)
OUT = {}
def zone(name, layers, extras=()): OUT[name] = {'layers': layers, 'extras': list(extras)}
def L(a, speed, tile=True, drift=0): return {'img': Image.fromarray(a), 'speed': speed, 'tile': tile, 'drift': drift}
def S(a): return {'img': Image.fromarray(a), 'speed': 0, 'sky': True}

# ---------- TAORO: the Teide big in the middle (Pico Viejo as a shoulder), the cloud sea on the green slope of the
# valley, pines, retama and golden grass in front
def taoro():
    sk = sky(hx('#2f6fd0'), hx('#bfe0f4'))
    W = 480; a = blank(W); x = np.arange(W)
    t = 74 - 52 * np.clip(1 - np.abs(x - 150) / 150, 0, 1) ** 1.25 - 12 * np.clip(1 - np.abs(x - 70) / 55, 0, 1)   # the Teide and the Pico Viejo
    t[(x > 138) & (x < 162)] = np.minimum(t[(x > 138) & (x < 162)], 22 + np.abs(x[(x > 138) & (x < 162)] - 150) * 0.15)   # the little top cone (the Pilón)
    t += per(W, [(40, 0.6), (17, 0.8)], 3)
    mount(a, t, pal('#3a2440', '#5a3450', '#8a4a50', '#b2645a', '#d58a6a'), snow=(34, (hx('#cfe0f0'), hx('#ffffff'))), seed=2, depth=40, gf=40, gul=0.7)
    outline(a, hx('#241830'))
    b = blank(640); d = ImageDraw.Draw(Image.fromarray(b)); im = Image.fromarray(b); d = ImageDraw.Draw(im); rnd = random.Random(5)
    for k in range(9):   # the cloud sea against the slope (lumpy, never a band)
        cloud(d, k * 72 + rnd.uniform(-10, 10), 80 + rnd.uniform(-3, 3), 48, rnd)
    nub = np.array(im)
    c = blank(640); t2 = 84 + per(640, [(3, 4), (7, 2.5), (16, 1)], 7)   # the green ridge of the valley (Tigaiga)
    mount(c, t2, pal('#16301e', '#1f4a2a', '#2e6a32', '#4a8a3a', '#6aa848'), seed=8, gul=1.3, depth=26); outline(c, hx('#0e2014'))
    im = Image.fromarray(c); d = ImageDraw.Draw(im); rnd = random.Random(9)
    for k in range(16):
        xx = rnd.uniform(0, 640); yy = int(t2[int(xx) % 640]) + 6
        wrap(lambda o, xx=xx, yy=yy: pino(d, xx + o, yy, 14 + rnd.randint(0, 6), pal('#0e2416', '#24502c', '#3e7a3a'), hx('#0a1a10')), 640)
    c = np.array(im)
    e = blank(640); t3 = 96 + per(640, [(2, 4), (5, 2)], 11)   # golden grass and retamas in front
    mount(e, t3, pal('#6a5020', '#9a7a2a', '#c8a03a', '#e2c25a'), seed=12, gul=0.5, depth=20); outline(e, hx('#3a2a10'))
    im = Image.fromarray(e); d = ImageDraw.Draw(im); rnd = random.Random(13)
    for k in range(26):
        xx = rnd.uniform(0, 640); yy = int(t3[int(xx) % 640]) + rnd.randint(3, 9)
        wrap(lambda o, xx=xx, yy=yy: retama(d, xx + o, yy, pal('#3a5a20', '#6a8a2a', '#a6c050'), hx('#203010'), rnd.randint(3, 5)), 640)
    zone('taoro', [S(sk), L(a, 0.04, tile=False), L(nub, 0.08, drift=1), L(c, 0.2), L(np.array(im), 0.5)])

# ---------- ANAGA: the laurel forest, closed: twisted trunks with moss, hanging branches, big ferns, light in the gaps
def anaga():
    sk = sky(hx('#cfe07a'), hx('#7aa83a'), 5)   # light through the leaves
    def canopy(W, y0, P, seed, holes):
        a = blank(W); im = Image.fromarray(a); d = ImageDraw.Draw(im); rnd = random.Random(seed)
        d.rectangle([0, y0, W, H], fill=P[0])
        for k in range(int(W / 6)):
            xx = rnd.uniform(0, W); yy = rnd.uniform(-6, y0 + 4); r = rnd.uniform(7, 14)
            wrap(lambda o: (blob(d, xx + o, yy, r, r * 0.7, P[1], P[0]), d.ellipse([xx + o - r * 0.7, yy - r * 0.6, xx + o + r * 0.1, yy], fill=P[2])), W)
        a = np.array(im)
        for k in range(holes):   # the gaps where the light comes in
            xx = rnd.randrange(W); yy = rnd.randrange(0, y0 - 6); r = rnd.randint(3, 6)
            for dy in range(-r, r + 1):
                for dx in range(-r * 2, r * 2 + 1):
                    if (dx / 2) ** 2 + dy ** 2 <= r * r: a[(yy + dy) % H, (xx + dx) % W, 3] = 0
        return a
    far = canopy(640, 70, pal('#2a4a22', '#3a6a2a', '#5a8a34'), 21, 22)
    im = Image.fromarray(far); d = ImageDraw.Draw(im); rnd = random.Random(22)
    for k in range(14):   # far trunks, thin and pale (in the mist)
        xx = rnd.uniform(0, 640); wrap(lambda o: d.rectangle([xx + o - 1, 30, xx + o + 1, H], fill=hx('#4a5a3a')), 640)
    far = np.array(im)
    mid = blank(640); im = Image.fromarray(mid); d = ImageDraw.Draw(im); rnd = random.Random(23)
    d.rectangle([0, 86, 640, H], fill=hx('#4a3424'))   # the earth path
    for k in range(9):   # twisted trunks covered in moss, with branches and hanging moss
        x0 = rnd.uniform(0, 640); w = rnd.uniform(4, 7)
        def tr(o, x0=x0, w=w, ph=rnd.uniform(0, 6)):
            pts = [(x0 + o + math.sin(y * 0.08 + ph) * 5, y) for y in range(-2, 96, 2)]
            for (px, py) in pts: d.rectangle([px - w / 2 - 1, py, px + w / 2 + 1, py + 2], fill=hx('#14200e'))
            for (px, py) in pts: d.rectangle([px - w / 2, py, px + w / 2, py + 2], fill=hx('#3a2a1c')); d.rectangle([px - w / 2, py, px - w / 2 + max(1, w * 0.45), py + 2], fill=hx('#5a8a2a'))   # moss on the lit side
            for by in (24, 44):   # a branch going up and out
                px, py = pts[by // 2]; s = 1 if ph > 3 else -1
                d.line([(px, py), (px + s * 14, py - 9), (px + s * 22, py - 10)], fill=hx('#14200e'), width=3); d.line([(px, py), (px + s * 14, py - 9), (px + s * 22, py - 10)], fill=hx('#4a7a26'), width=1)
                for k2 in range(4): d.line([(px + s * (8 + k2 * 4), py - 7), (px + s * (8 + k2 * 4), py - 2 + k2 % 2 * 3)], fill=hx('#7aa83a'))
        wrap(tr, 640)
    mid = np.array(im)
    near = blank(640); im = Image.fromarray(near); d = ImageDraw.Draw(im); rnd = random.Random(24)
    for k in range(26):   # the big ferns
        xx = rnd.uniform(0, 640); yy = H - rnd.uniform(0, 6)
        def fe(o, xx=xx, yy=yy, L_=rnd.randint(14, 24)):
            for s in (-1, 1): palm_fern(d, xx + o, yy, L_, hx('#5aa83a'), hx('#2e6a22'), hx('#14300e'), s)
            palm_fern(d, xx + o, yy, int(L_ * 0.7), hx('#7ac04a'), hx('#3a7a2a'), hx('#14300e'), 0.25)
        wrap(fe, 640)
    zone('anaga', [S(sk), L(far, 0.12), L(mid, 0.35), L(np.array(im), 0.9)], ['niebla'])

# ---------- BARRANCO DEL INFIERNO: high rock walls (ochre, grey), green patches, a thin waterfall down a dark crack
# into a pool, smooth boulders
def barranco():
    sk = sky(hx('#3a86d8'), hx('#a8d4f0'), 5)
    W = 480; a = blank(W); x = np.arange(W)
    t = 6 + 22 * (np.abs(x - 300) / 300) ** 0.7 + per(W, [(9, 3), (23, 1.5), (41, 1)], 31)   # the far wall, the gap of sky above
    mount(a, t, pal('#4a3a30', '#6a5446', '#8e735a', '#b49470', '#d2b48a'), seed=32, gul=1.0, depth=90, light=-1, gf=14)
    im = Image.fromarray(a); d = ImageDraw.Draw(im); rnd = random.Random(33)
    CX = 200; d.polygon([(CX - 8, int(t[CX]) + 4), (CX + 6, int(t[CX]) + 4), (CX + 10, 92), (CX - 12, 92)], fill=hx('#2a221c'))   # the dark crack
    for k in range(12):   # green patches on the walls
        xx = rnd.uniform(0, W); yy = rnd.uniform(t[int(xx)] + 6, 80)
        for j in range(4): px, py = xx + rnd.uniform(-5, 5), yy + rnd.uniform(-2, 2); blob(d, px, py, 2, 1.6, hx('#4a8a2a'), hx('#1e3a12')); d.point((px - 1, py - 1), fill=hx('#8ac04a'))
    d.ellipse([CX - 34, 86, CX + 30, 98], fill=hx('#1a3a4a')); d.ellipse([CX - 30, 87, CX + 26, 96], fill=hx('#2a7a8a')); d.line([(CX - 6, 89), (CX + 2, 89)], fill=hx('#9ad4dc'))   # the pool
    a = np.array(im); outline(a, hx('#2a201a'))
    m = blank(640); t2 = 70 + per(640, [(3, 10), (8, 5), (19, 2)], 34)   # the near walls, darker, on both sides of the path
    mount(m, t2, pal('#2a221c', '#45362a', '#6a523e', '#8e7050'), seed=35, gul=0.8, depth=40, gf=30); outline(m, hx('#1a1410'))
    im = Image.fromarray(m); d = ImageDraw.Draw(im); rnd = random.Random(36)
    for k in range(10):   # smooth boulders at the foot
        xx = rnd.uniform(0, 640); r = rnd.uniform(6, 12)
        wrap(lambda o, xx=xx, r=r: (blob(d, xx + o, H - r * 0.5, r, r * 0.7, hx('#a08a70'), hx('#2a2018')), d.ellipse([xx + o - r * 0.7, H - r * 1.1, xx + o, H - r * 0.6], fill=hx('#c8b294'))), 640)
    for k in range(10):
        xx = rnd.uniform(0, 640); wrap(lambda o, xx=xx: retama(d, xx + o, int(t2[int(xx) % 640]) + 10, pal('#2a5a20', '#4a8a2a', '#8ac04a'), hx('#14280e')), 640)
    zone('barranco', [S(sk), L(a, 0.08, tile=False), L(np.array(im), 0.35)], ['cascada'])

# ---------- LOS GIGANTES: huge cliffs with vertical ribs (ochre, rust) going away bluer, the deep blue sea, foam on a
# black sand beach
def gigantes():
    sk = sky(hx('#1e64d0'), hx('#b0dcf6'))
    W = 480; far = blank(W); x = np.arange(W)
    t = 40 - 14 * np.clip(x / W, 0, 1) + per(W, [(11, 3), (29, 1.5)], 41)
    mount(far, t, pal('#5a6aa0', '#7a86b4', '#9aa4c8'), seed=42, gul=0.8, depth=30, gf=16); outline(far, hx('#4a5a8a'))   # the far cliffs, hazy
    far[64:] = 0
    cl = blank(W); t2 = 8 + 34 * (x / W) ** 1.2 + per(W, [(5, 3), (11, 2), (23, 0.8)], 43)   # the big cliff, high on the left
    mount(cl, t2, pal('#3a1e14', '#6a3420', '#9a5230', '#c47a44', '#e2a060'), seed=44, gul=1.6, depth=60, light=-1, gf=12)
    ribs = per(W, [(23, 1), (41, 0.6)], 45)   # the vertical ribs of the rock
    for xx in range(W):
        if ribs[xx] > 0.9: cl[int(t2[xx]) + 2:, xx, :3] = (cl[int(t2[xx]) + 2:, xx, :3] * 0.72).astype(np.uint8)
    cl[66:, :] = 0; cl[:, int(W * 0.72):] = 0; outline(cl, hx('#24120c'))
    for xx in range(int(W * 0.72) - 3, int(W * 0.72)):
        cl[:, xx, 3] = np.where(cl[:, xx, 3] > 0, 255, 0)
    sea = blank(640); im = Image.fromarray(sea); d = ImageDraw.Draw(im); rnd = random.Random(46)
    d.rectangle([0, 64, 640, 92], fill=hx('#1450b0')); d.rectangle([0, 64, 640, 70], fill=hx('#0e3c8c'))
    for k in range(40):   # patches of lighter water (short, not lines)
        xx = rnd.uniform(0, 640); yy = rnd.uniform(72, 90); d.rectangle([xx, yy, xx + rnd.randint(2, 5), yy], fill=hx('#3a84d8'))
    sh = 90 + per(640, [(4, 2), (11, 1)], 47); fo = np.clip(np.round(1.4 + per(640, [(9, 1.6), (23, 1)], 48)), 0, 3)
    for xx in range(640):
        y0 = int(sh[xx]); d.line([(xx, y0 + 1), (xx, H)], fill=hx('#2a2626'))   # the black sand
        if fo[xx] > 0: d.line([(xx, y0 - int(fo[xx])), (xx, y0)], fill=hx('#ffffff'))   # the foam, broken
        if (xx // 3) % 5 == 0: d.point((xx, y0 + 3), fill=hx('#4a4444'))
    zone('gigantes', [S(sk), L(far, 0.03, tile=False), L(cl, 0.08, tile=False), L(np.array(im), 0.3)], ['nubes'])

# ---------- MALPAÍS DE GÜÍMAR: a field of black and brown lava with round grey-green tabaibas; behind, the sierra
# with clouds on top and the blue sea
def malpais():
    sk = sky(hx('#2a70d8'), hx('#c4e2f6'))
    W = 480; a = blank(W); t = 44 + per(W, [(2, 6), (5, 4), (13, 1.5)], 51)
    mount(a, t, pal('#3a4a7a', '#4e6090', '#6a7aa8', '#8a98bc'), seed=52, gul=0.8, depth=30, gf=20); outline(a, hx('#2a3660'))
    im = Image.fromarray(a); d = ImageDraw.Draw(im); rnd = random.Random(53)
    for k in range(8): cloud(d, k * 62 + rnd.uniform(-10, 10), t[min(W - 1, k * 62 + 20)] + 2, 56, rnd)   # the cloud sea on the ridge
    d.rectangle([0, 70, W, H], fill=hx('#1e5ab8')); a = np.array(im)
    m = blank(640); t2 = 74 + per(640, [(3, 3), (9, 2), (23, 1)], 54)   # the lava field: lumps, dark
    mount(m, t2, pal('#140e10', '#2a1c1a', '#43302a', '#5e4436'), seed=55, gul=0.8, depth=22, gf=30, blot=0.18); outline(m, hx('#0a0608'))
    im = Image.fromarray(m); d = ImageDraw.Draw(im); rnd = random.Random(56)
    for k in range(60):   # lumps of clinker (rounded, with a lit edge) — part of the field, not stones in front
        xx = rnd.uniform(0, 640); yy = rnd.uniform(t2[int(xx) % 640] + 4, H); r = rnd.uniform(2, 4)
        wrap(lambda o, xx=xx, yy=yy, r=r: (d.ellipse([xx + o - r, yy - r * 0.6, xx + o + r, yy + r * 0.6], fill=hx('#3a2622')), d.line([(xx + o - r * 0.6, yy - r * 0.5), (xx + o + r * 0.2, yy - r * 0.6)], fill=hx('#6a4a3a'))), 640)
    for k in range(18):   # the tabaibas
        xx = rnd.uniform(0, 640); yy = rnd.uniform(t2[int(xx) % 640] + 6, H - 2); r = rnd.uniform(4, 7)
        wrap(lambda o, xx=xx, yy=yy, r=r: (blob(d, xx + o, yy - r * 0.5, r * 1.3, r * 0.8, hx('#7a8a5a'), hx('#1a1a10')), d.ellipse([xx + o - r, yy - r * 1.1, xx + o + r * 0.2, yy - r * 0.4], fill=hx('#a6b47a')), d.point((xx + o - r * 0.4, yy - r * 0.9), fill=hx('#d2dca0'))), 640)
    zone('malpais', [S(sk), L(a, 0.05, tile=False), L(np.array(im), 0.3)], ['nubes'])

# ---------- LAS CAÑADAS: the Teide red-orange at sunset with snow, the dark jagged Roques, the pumice plain with retamas
def canadas():
    sk = sky(hx('#1a4ab8'), hx('#8ac0ea'))
    W = 480; a = blank(W); x = np.arange(W)
    t = 76 - 58 * np.clip(1 - np.abs(x - 165) / 190, 0, 1) ** 1.5 + per(W, [(31, 0.7), (13, 1)], 61)
    mount(a, t, pal('#5a1e1a', '#8a2e1e', '#b8482a', '#dc6a34', '#f28c4a'), snow=(28, (hx('#f0d8c8'), hx('#fff4ea'))), seed=62, depth=50, gf=40, gul=0.7); outline(a, hx('#3a1410'))
    r = blank(640); x2 = np.arange(640); t2 = 82 + per(640, [(3, 4), (9, 3)], 63)   # the Roques: jagged spires
    sp = np.zeros(640)
    for c0, h0, w0 in [(60, 34, 14), (90, 22, 8), (250, 40, 10), (275, 28, 12), (420, 30, 16), (560, 26, 9)]:
        sp = np.maximum(sp, h0 * np.clip(1 - np.abs(x2 - c0) / w0, 0, 1) ** 0.7)
    t2 = t2 - sp + per(640, [(70, 1.2), (130, 0.8)], 64)
    mount(r, t2, pal('#140c12', '#2a1820', '#45262a', '#6a3a34'), seed=65, gul=1.8, depth=30); outline(r, hx('#0a0608'))
    p = blank(640); t3 = 98 + per(640, [(2, 2), (6, 1)], 66)   # the pumice plain
    mount(p, t3, pal('#8a7454', '#b49a6a', '#d6bc86', '#ecd6a2'), seed=67, gul=0.3, depth=14); outline(p, hx('#5a4630'))
    im = Image.fromarray(p); d = ImageDraw.Draw(im); rnd = random.Random(68)
    for k in range(22):
        xx = rnd.uniform(0, 640); yy = int(t3[int(xx) % 640]) + rnd.randint(2, 10)
        wrap(lambda o, xx=xx, yy=yy: retama(d, xx + o, yy, pal('#3a5a1a', '#6a8a2a', '#b4c84a'), hx('#1a2a0a'), rnd.randint(3, 5)), 640)
    zone('canadas', [S(sk), L(a, 0.04, tile=False), L(r, 0.2), L(np.array(im), 0.5)])

# ---------- DENTRO DEL ECHEYDE (Cueva del Viento): the arch of a lava tube, rough ochre walls lit orange, black at
# the back, a lumpy floor; the glow of the lava
def echeyde():
    sk = blank(V)   # the depth of the tunnel: black, a red glow low in the middle
    for y in range(H):
        for x in range(V):
            r = math.hypot((x - V / 2) / 150, (y - 78) / 50); k = min(5, int(r * 5))
            sk[y, x, :3] = pal('#7a2a0c', '#521a08', '#341006', '#1e0804', '#120402', '#0a0202')[k]; sk[y, x, 3] = 255
    def tube(W, ar, top0, bot0, P, seed, rough):   # a lava tube: rock above an arch and below a floor, lit at the edge
        a = blank(W); x = np.arange(W); ph = (x % ar) / ar; r = np.abs(ph - 0.5) * 2
        top = top0 + (1 - r ** 2) * 34 + per(W, [(W // 20, rough), (W // 9, rough * 0.5)], seed)
        bot = bot0 - (1 - r ** 2) * 6 + per(W, [(W // 30, rough * 0.6)], seed + 1)
        from scipy import ndimage
        bl = ndimage.gaussian_filter(np.random.RandomState(seed).randn(H, W), (2, 3), mode='wrap'); bl /= bl.std()
        for xx in range(W):
            for y in range(H):
                if y < top[xx]: d_ = (top[xx] - y) / 26
                elif y > bot[xx]: d_ = (y - bot[xx]) / 16
                else: continue
                v = 1 - d_ + bl[y, xx] * 0.25
                a[y, xx, :3] = P[int(np.clip(round(v * (len(P) - 1)), 0, len(P) - 1))]; a[y, xx, 3] = 255
        return a, top, bot
    far, _, _ = tube(640, 320, 8, 74, pal('#1a0a06', '#2e140a', '#4a2010', '#6e3416', '#93501e'), 71, 2)
    outline(far, hx('#0e0402'))
    near, top, bot = tube(640, 640, -6, 92, pal('#1e0c06', '#3a1a0c', '#5e2c12', '#8a441a', '#b8642a'), 72, 4)
    im = Image.fromarray(near); d = ImageDraw.Draw(im); rnd = random.Random(73)
    for k in range(18):   # stalactites hanging from the roof
        xx = rnd.uniform(0, 640); L_ = rnd.randint(5, 13); y0 = top[int(xx) % 640]
        wrap(lambda o, xx=xx, L_=L_, y0=y0: (d.polygon([(xx + o - 3, y0 - 2), (xx + o + 3, y0 - 2), (xx + o, y0 + L_)], fill=hx('#3a1a0c')), d.line([(xx + o - 1, y0), (xx + o, y0 + L_ - 2)], fill=hx('#b8642a'))), 640)
    for k in range(9):   # cracks with glowing lava in the floor
        xx = rnd.uniform(0, 640); y0 = bot[int(xx) % 640] + rnd.uniform(5, 14); L_ = rnd.uniform(8, 18)
        wrap(lambda o, xx=xx, y0=y0, L_=L_: (d.line([(xx + o, y0), (xx + o + L_ * 0.5, y0 + 2), (xx + o + L_, y0 - 1)], fill=hx('#ff7a14'), width=2), d.line([(xx + o + 2, y0), (xx + o + L_ * 0.5, y0 + 1)], fill=hx('#ffe07a'))), 640)
    near = np.array(im); outline(near, hx('#0e0402'))
    zone('echeyde', [S(sk), L(far, 0.12), L(near, 0.4)], ['lava'])

# ---------- AÑAZA (Bencomo): a grey cloudy sky, the grey-blue sea with foam, dark rocks on the point, a beach of
# grey pebbles
def anaza():
    sk = sky(hx('#8a9ab0'), hx('#e2e6ec'), 5); im = Image.fromarray(sk); d = ImageDraw.Draw(im); rnd = random.Random(81)
    for k in range(7): cloud(d, rnd.uniform(-20, V), rnd.uniform(8, 40), rnd.uniform(40, 80), rnd, hx('#f2f4f6'), hx('#b4bcc8'))
    sk = np.array(im)
    W = 480; a = blank(W); x = np.arange(W)
    t = np.full(W, 200.0); t[:150] = 58 - 16 * np.clip(1 - np.abs(x[:150] - 55) / 80, 0, 1) ** 0.8 + per(150, [(3, 1.5), (7, 1)], 82)   # the rocky point on the left
    mount(a, t, pal('#24262a', '#3a3c40', '#55585c', '#74767a'), seed=83, gul=0.5, depth=20, gf=10)
    im = Image.fromarray(a); d = ImageDraw.Draw(im); d.rectangle([0, 58, W, H], fill=hx('#4a6a84')); d.rectangle([0, 58, W, 60], fill=hx('#3a566e'))
    for xx in range(0, 150):
        if t[xx] < 58: d.line([(xx, t[xx]), (xx, 60)], fill=tuple(a[min(H - 1, int(t[xx]) + 2), xx, :3]))
    a = np.array(im); outline(a, hx('#1a1c20'))
    s = blank(640); im = Image.fromarray(s); d = ImageDraw.Draw(im); rnd = random.Random(84)
    sh = 80 + per(640, [(3, 3), (8, 1.5)], 85); fo = np.clip(np.round(1.6 + per(640, [(7, 1.8), (19, 1)], 86)), 0, 3)
    for xx in range(640):
        d.line([(xx, 62), (xx, sh[xx])], fill=hx('#5a7a92'))
        d.line([(xx, sh[xx] + 1), (xx, H)], fill=hx('#6a6866'))
        if fo[xx] > 0: d.line([(xx, sh[xx] - fo[xx]), (xx, sh[xx])], fill=hx('#f4f8fa'))
    for k in range(10):   # a few rocks in the water
        xx = rnd.uniform(0, 640); yy = rnd.uniform(66, 76); wrap(lambda o, xx=xx, yy=yy: (blob(d, xx + o, yy, 4, 2.5, hx('#2a2c30'), hx('#141518')), d.line([(xx + o - 3, yy + 3), (xx + o + 3, yy + 3)], fill=hx('#e4ecf0'))), 640)
    s = np.array(im)
    for y in range(int(sh.min()) + 2, H):   # the pebbles: a grain of light and dark specks, no stones drawn big
        for xx in range(640):
            if y > sh[xx] + 2:
                v = (xx * 13 + y * 7 + (xx * y) % 5) % 11
                if v == 0: s[y, xx, :3] = hx('#8e8c88')
                elif v == 5: s[y, xx, :3] = hx('#4a4846')
    zone('anaza', [S(sk), L(a, 0.03, tile=False), L(s, 0.3)])

for f in (taoro, anaga, barranco, gigantes, malpais, canadas, echeyde, anaza): f()
for k, v in OUT.items():   # a preview of each one
    p = Image.new('RGBA', (V, H))
    for l in v['layers']: p.alpha_composite(l['img'].resize((V, H)) if l.get('sky') else l['img'].crop((0, 0, V, H)))
    p.resize((V * 3, H * 3), Image.NEAREST).save('v4_%s.png' % k)
pickle.dump(OUT, open('fondos.pkl', 'wb')); print('ok')
