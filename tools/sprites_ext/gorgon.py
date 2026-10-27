# Proposal (Jonay, 27-oct): the gorgons (craftpix, free licence) for a stage of Guanche Guarriors, without the top:
# «no es época de bikinis»: the top's cloth (split from the loincloth by the bare belly between them) turned into her
# skin (light and shade), with a well-defined nipple on each breast; the loincloth stays.
import sys
from PIL import Image
A = sys.argv[1] + '/free-gorgon-pixel-art-character-sprite-sheets/'; O = sys.argv[2]
CLOTH = {1: [(115,23,45),(59,23,37)], 2: [(115,23,45),(59,23,37)], 3: [(64,51,83),(36,34,52)]}
SKIN = {1: [(233,181,163),(186,117,106)], 2: [(227,205,223),(192,144,169)], 3: [(97,39,33),(45,27,30)]}
NIP = {1: [(196,92,96),(150,60,66)], 2: [(196,96,128),(150,66,96)], 3: [(40,14,12),(28,10,10)]}   # nipple, areola edge
ROWS = [('Idle', 'parado'), ('Walk', 'andar'), ('Run', 'correr'), ('Attack_1', 'golpe'), ('Attack_2', 'golpe 2'), ('Attack_3', 'golpe 3'), ('Special', 'especial'), ('Hurt', 'herida'), ('Dead', 'muerte')]
def topless(f, g):
    """v0.97 (Jonay: «sigue con bikini al atacar»): the pieces of cloth (8-connected) are told apart by what they touch:
    the top is mostly surrounded by her skin (≥ 45 %); the loincloth by the tail. Also top: any piece clearly above the
    loincloth (its middle 10 px higher). Nipple on each breast of the main top piece."""
    import numpy as np
    from scipy import ndimage
    a = np.array(f); cl = CLOTH[g]; sk = SKIN[g]
    def msk(cols):
        m = np.zeros(a.shape[:2], bool)
        for c in cols: m |= (a[..., 0] == c[0]) & (a[..., 1] == c[1]) & (a[..., 2] == c[2]) & (a[..., 3] > 0)
        return m
    m = msk(cl); skin = msk(sk); op = a[..., 3] > 0
    lab, k = ndimage.label(m, structure=np.ones((3, 3)))
    if not k: return f
    info = []
    for j in range(1, k + 1):
        cm = lab == j; ring = ndimage.binary_dilation(cm, structure=np.ones((3, 3))) & ~cm & op
        ys, xs = np.where(cm); info.append((j, int(cm.sum()), (ring & skin).sum() / max(1, ring.sum()), ys.mean()))
    low = [t for t in info if t[2] < 0.38]
    loin = max(low, key=lambda t: t[1]) if low else None
    tops = [t for t in info if t[2] >= 0.38 or (loin and t[0] != loin[0] and t[3] < loin[3] - 6)]
    if not tops: return f
    px = f.load(); mid = tuple((a_ + b_) // 2 for a_, b_ in zip(sk[0], sk[1])); mp = {cl[0]: sk[0], cl[1]: tuple((a_ * 2 + b_) // 3 for a_, b_ in zip(sk[0], mid))}   # (Jonay: the cloth's shade nearer the skin, no odd shadow on the chest)
    for t in tops:
        ys, xs = np.where(lab == t[0])
        for y, x in zip(ys, xs): px[int(x), int(y)] = mp[px[int(x), int(y)][:3]] + (255,)
    main = max(tops, key=lambda t: t[1])
    if main[1] < 30: return f
    # the nipples (v0.97, Jonay: «posiciona los pezones como ese»): at the middle of each cup: the lower part of the
    # top (from 45 % of its height) split in two at its narrowest column, the centre of each half, one line up
    ys, xs = np.where(lab == main[0]); y0, y1 = ys.min(), ys.max()
    sel = ys >= y0 + (y1 - y0) * 0.45; ys2, xs2 = ys[sel], xs[sel]
    lo, hi = xs2.min(), xs2.max(); w = hi - lo
    if w >= 5:
        cols = {x: int((xs2 == x).sum()) for x in range(lo, hi + 1)}
        mid = [x for x in range(lo + round(w * 0.3), hi - round(w * 0.3) + 1)] or [round((lo + hi) / 2)]
        cut = min(mid, key=lambda x: (cols[x], abs(x - (lo + hi) / 2)))
        spots = []
        for side in (xs2 < cut, xs2 > cut):
            if side.any(): spots.append((round(xs2[side].mean()), round(ys2[side].mean()) - 1))
    else: spots = [(round((lo + hi) / 2), round(ys2.mean()) - 1)]
    for nx, ny in spots:
        if px[nx, ny][3]: px[nx, ny] = NIP[g][0] + (255,)
        if ny + 1 < f.height and px[nx, ny + 1][3]: px[nx, ny + 1] = NIP[g][1] + (255,)
    return f
for g in (1, 2, 3):
    strips = []
    for fn, _ in ROWS:
        im = Image.open(A + 'Gorgon_%d/%s.png' % (g, fn)).convert('RGBA'); n = im.width // 128
        strips.append([topless(im.crop((c*128, 0, c*128+128, 128)), g) for c in range(n)])
    sheet = Image.new('RGBA', (128 * max(len(s) for s in strips), 128 * len(strips)))
    for r, s in enumerate(strips):
        for c, f in enumerate(s): sheet.alpha_composite(f, (c * 128, r * 128))
    sheet.save(O + '/gorgona%d.png' % g); print(g, [len(s) for s in strips])
