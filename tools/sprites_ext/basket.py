# Proposal (v0.95, Jonay: «¿podremos usar este kit para el baloncesto? camisetas de tirantes»): players from the
# GandalfHardcore layers with a tank-top jersey (the shirt without sleeves: only the torso band of each row), shorts
# down to the knee (the trousers cut), the number on the back, and a ball drawn in the hands for a few moves.
import sys, math
G = sys.argv[1]; sys.argv = [sys.argv[0], G]; sys.path.insert(0, G)
from mk import *
CP = 'GandalfHardcore Character Asset Pack/'
def jersey(shirt, ramp, skin=None):
    """v0.96 (Jonay: «camisetas de asillas», «pecho descubierto»): the torso is found with an opening of the shirt's
    shape (eroded and grown back by 5 px: the arms, thinner, go); then, line by line, the shirt is kept from the left
    to the right edge of that torso (lines without torso take the nearest one), so an arm crossing the chest is covered
    by the jersey and the shoulders keep both straps; what sticks out sideways (the sleeves) goes"""
    from PIL import ImageFilter
    a = shirt.split()[3].point(lambda v: 255 if v else 0)
    body = a.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5)); bp = body.load()
    body3 = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3)); bp3 = body3.load()   # for the frames where the 5 px opening leaves nothing (an arm across the chest)
    out = Image.new('RGBA', shirt.size); sp = shirt.load(); op = out.load()
    for r in range(shirt.height // 64):
        for c in range(shirt.width // 80):
            ys = [y for y in range(64) if any(sp[c*80+x, r*64+y][3] for x in range(80))]
            if not ys: continue
            rng = {}
            for m in (bp, bp3):
                for y in ys:
                    xs = [x for x in range(80) if m[c*80+x, r*64+y]]
                    if xs: rng[y] = (min(xs), max(xs))
                if len(rng) >= 6: break
                rng = {}
            if not rng: continue
            for y in ys:
                if y in rng: x0, x1 = rng[y]
                else: x0, x1 = rng[min(rng, key=lambda k: abs(k - y))]
                for x in range(x0, x1 + 1):
                    if sp[c*80+x, r*64+y][3]: op[c*80+x, r*64+y] = sp[c*80+x, r*64+y]
            # v0.96 (Jonay: «pecho al aire»): the pack's shirt has a deep V neck; a jersey closes it: below the first two
            # lines, the gaps between the jersey's pixels of each line are filled with the nearest jersey colour
            y0 = min(ys)
            # the shoulders and the top of the chest (lines 1–5) as wide as the chest on line 6: the skin there (the
            # pack's neckline and the bare shoulder) is jersey too
            if skin is not None:
                kp = skin.load(); w6 = [x for x in range(80) if op[c*80+x, r*64+y0+6][3]] if y0 + 6 < 64 else []
                if w6:
                    for y in range(y0 + 1, y0 + 6):
                        for x in range(min(w6), max(w6) + 1):
                            if not op[c*80+x, r*64+y][3] and kp[c*80+x, r*64+y][3] and kp[c*80+x, r*64+y][:3] != (19, 19, 28):
                                k = [q for q in range(80) if op[c*80+q, r*64+y][3] and op[c*80+q, r*64+y][:3] != (19, 19, 28)]
                                op[c*80+x, r*64+y] = op[c*80+min(k, key=lambda q: abs(q - x)), r*64+y] if k else sp[c*80+x, r*64+y0+6] if sp[c*80+x, r*64+y0+6][3] else (200, 200, 200, 255)
            for y in ys:
                if y < y0 + 2: continue
                xs = [x for x in range(80) if op[c*80+x, r*64+y][3]]
                if len(xs) < 2: continue
                for x in range(min(xs) + 1, max(xs)):
                    if not op[c*80+x, r*64+y][3]:
                        k = min(xs, key=lambda q: abs(q - x)); q = op[c*80+k, r*64+y]
                        op[c*80+x, r*64+y] = q if q[:3] != (19, 19, 28) else sp[c*80+k, r*64+y]
    return tint(out, ramp)
def shorts(pants, ramp):
    """v0.96 (Jonay: «se ven los calzoncillos», «parecen bajados»): from the waist of each frame (the top of the trousers)
    down to above the knee: the top 55 % of the trousers' height"""
    out = Image.new('RGBA', pants.size); pp = pants.load(); op = out.load()
    for r in range(pants.height // 64):
        for c in range(pants.width // 80):
            box = pants.crop((c*80, r*64, c*80+80, r*64+64)).getbbox()
            if not box: continue
            cut = box[1] + max(6, round((box[3] - box[1]) * 0.55))
            for y in range(box[1], min(cut, box[3])):
                for x in range(c*80, c*80+80):
                    if pp[x, r*64+y][3]: op[x, r*64+y] = pp[x, r*64+y]
    return tint(out, ramp)
def ball(im, rows):
    out = im.copy(); d = ImageDraw.Draw(out)
    for r, pos in rows.items():
        for c, (bx, by) in enumerate(pos):
            X, Y = c*80 + bx, r*64 + by
            d.ellipse([X-3, Y-3, X+3, Y+3], fill=(19,19,28,255)); d.ellipse([X-2, Y-2, X+2, Y+2], fill=(226,110,30,255)); d.line([(X-2, Y), (X+2, Y)], fill=(90,40,10,255)); out.putpixel((X-1, Y-1), (255,190,120,255))
    return out
RED = [(19,19,28),(110,16,20),(170,30,34),(220,60,60),(250,240,240)]
BLUE = [(19,19,28),(20,40,110),(30,70,170),(70,120,220),(240,244,250)]
SH = L(CP + 'Male Clothing/Shirt.png'); PA = L(CP + 'Male Clothing/Pants.png'); SHOES = L(CP + 'Male Clothing/Shoes.png')
H = lambda n: L('GandalfHardcore 58x Hair/28x Male Hair/Male Hair%d.png' % n)
players = [('b_rojo1', 'Male Skin3', 10, RED), ('b_rojo2', 'Male Skin1', 8, RED), ('b_azul1', 'Male Skin5', 6, BLUE), ('b_azul2', 'Male Skin2', 14, BLUE)]
# the ball: dribbling at the hand while walking (row 1), held up for the jump shot (row 3 frame 2-3) and the dunk (row 4)
BALL = {1: [(31, 52), (31, 47), (31, 55), (31, 49), (31, 52), (31, 47), (31, 55), (31, 49)], 3: [(34, 30), (34, 26), (34, 22), (34, 20)], 4: [(36, 18), (36, 18), (37, 19), (37, 20)]}
BRIEFS = [(41,55,87),(74,96,130),(105,133,160),(148,175,192)]
def no_briefs(sk, ramp):   # v0.96 (Jonay: «se ven los calzoncillos»): the briefs of the skin layer in the colour of the shorts
    out = sk.copy(); px = out.load(); m = {c: ramp[min(i + 1, len(ramp) - 2)] for i, c in enumerate(BRIEFS)}
    for y in range(out.height):
        for x in range(out.width):
            q = px[x, y]
            if q[3] and q[:3] in m: px[x, y] = m[q[:3]] + (q[3],)
    return out
for name, skin, hair, ramp in players:
    im = compose([no_briefs(L(CP + 'Character skin colors/%s.png' % skin), ramp), shorts(PA, ramp), jersey(SH, ramp, L(CP + 'Character skin colors/%s.png' % skin)), SHOES, H(hair)])
    im.save(G + '/out2/' + name + '.png')   # v0.96 (Jonay): no ball drawn on the sheet (the game draws its own)
print('ok')
