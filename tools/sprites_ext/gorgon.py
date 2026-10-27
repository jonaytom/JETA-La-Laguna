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
    px = f.load(); cl = CLOTH[g]; m = {cl[0]: SKIN[g][0], cl[1]: SKIN[g][1]}
    pts = [(x, y) for y in range(f.height) for x in range(f.width) if px[x, y][3] and px[x, y][:3] in m]
    if not pts: return f
    ys = sorted({y for _, y in pts}); gaps = [(ys[i+1] - ys[i], i) for i in range(len(ys) - 1)]
    if not gaps or max(gaps)[0] < 2: return f
    cut = ys[max(gaps)[1]]; top = [(x, y) for (x, y) in pts if y <= cut]
    if len(top) < 6: return f
    for (x, y) in top: px[x, y] = m[px[x, y][:3]] + (255,)
    # the nipples: on the line 60 % down the top, the two halves of its width (a quarter from each side)
    y0 = min(y for _, y in top); y1 = max(y for _, y in top); ny = y0 + round((y1 - y0) * 0.6)
    xs = sorted(x for (x, y) in top if y == ny) or sorted(x for (x, y) in top)
    a, b = xs[0], xs[-1]; w = b - a
    for nx in ([round(a + w * 0.28), round(a + w * 0.75)] if w >= 5 else [round((a + b) / 2)]):
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
