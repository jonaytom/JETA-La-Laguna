# The heroes riding the lizard (Jonay): the lizard mirrored to face left like the heroes, the upper body of each hero
# (cut at the tamarco) on the seat of every frame, and a bent leg in its own skin colour down the flank.
import sys, json
from PIL import Image, ImageOps, ImageDraw
G = sys.argv[1]; FW, FH = 120, 48
liz = Image.open(G + '/out2/lagarto3.png').convert('RGBA'); meta = json.load(open(G + '/out2/lagarto3.json'))
UW = {(60,38,22),(110,74,44),(150,108,66),(196,160,112)}   # the tamarco colours of our heroes
K = (19,19,28)
def hero(path, fw, fh, skin_path=None, pad=0):
    f = Image.open(path).convert('RGBA').crop((0, 0, fw, fh)); px = f.load()
    if skin_path:   # the hips from the bare skin layer (its underwear), not from the clothes (La Mirladora's skirt is longer)
        sk = Image.open(skin_path).convert('RGBA').crop((0, 0, 80, 64)); sp = sk.load()
        UW0 = {(148,175,192),(105,133,160),(74,96,130),(41,55,87)}
        rows = [y for y in range(64) if any(sp[x, y][3] and sp[x, y][:3] in UW0 for x in range(80))]
        hip = rows[-1] + 1 + pad
    else:
        rows = [y for y in range(fh) if any(px[x, y][3] and px[x, y][:3] in UW for x in range(fw))]
        hip = rows[-1] + 1
    # the centre of the body: the middle of the torso a few rows above the hips (Jonay: her body went too far forward)
    xs = [x for x in range(fw) if px[x, hip - 6][3] and px[x, hip - 6][:3] != K]; hx = (min(xs) + max(xs)) / 2
    cols = {}
    for y in range(hip - 20, hip - 8):
        for x in range(fw):
            c = px[x, y]
            if c[3] and c[:3] not in UW and c[:3] != K and sum(c[:3]) > 250: cols[c[:3]] = cols.get(c[:3], 0) + 1
    skin = max(cols, key=cols.get)
    return f.crop((0, 0, fw, hip)), hip, hx, skin
H = {'magote': hero(G + '/out/magote.png', 80, 64), 'mencey': hero(G + '/out2/mencey.png', 80, 64), 'mirla': hero(G + '/out2/mirla_nat.png', 112, 80, '/mnt/user-data/uploads/GTA La Laguna/assets_externos/GandalfHardcore Character Asset Pack/Character skin colors/Female Skin4.png', 16)}
CELL = (120, 80)
for name, (up, hip, hx, skin) in H.items():
    dark = tuple(int(c * 0.72) for c in skin)
    sheet = Image.new('RGBA', (CELL[0] * 8, CELL[1] * 3)); k = 0
    for r, n in enumerate(meta['rows']):
        for c in range(n):
            lf = ImageOps.mirror(liz.crop((c * FW, r * FH, c * FW + FW, r * FH + FH)))
            sx, sy = meta['seats'][k]; k += 1; sx = FW - 1 - sx
            cell = Image.new('RGBA', CELL); oy = CELL[1] - FH; cell.alpha_composite(lf, (0, oy))
            X, Y = sx, sy + oy
            cell.alpha_composite(up, (round(X - hx), round(Y - hip + 1)))
            d = ImageDraw.Draw(cell)   # the near leg (Jonay: like the first one, only the tip of the foot showing)
            for w, col in ((6, K), (4, skin)):
                d.line([(X, Y), (X - 6, Y + 4)], fill=col, width=w); d.line([(X - 6, Y + 4), (X - 5, Y + 10)], fill=col, width=w)
            d.line([(X - 4, Y + 12), (X - 10, Y + 12)], fill=K, width=4); d.line([(X - 5, Y + 12), (X - 9, Y + 12)], fill=skin, width=2)
            d.line([(X - 2, Y + 1), (X - 5, Y + 3)], fill=dark, width=1)
            sheet.paste(cell, (c * CELL[0], r * CELL[1]))
    sheet.save(G + '/out2/lagarto_' + name + '.png')
prev = Image.new('RGBA', (CELL[0] * 3, CELL[1] * 2), (60,70,85,255))
for i, n in enumerate(H):
    s = Image.open(G + '/out2/lagarto_' + n + '.png'); prev.alpha_composite(s.crop((0, 0, 120, 80)), (i * 120, 0)); prev.alpha_composite(s.crop((3 * 120, 160, 4 * 120, 240)), (i * 120, 80))
prev.resize((prev.width * 3, prev.height * 3), Image.NEAREST).save(G + '/z.png')
