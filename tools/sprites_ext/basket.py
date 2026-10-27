# Proposal (v0.95, Jonay: «¿podremos usar este kit para el baloncesto? camisetas de tirantes»): players from the
# GandalfHardcore layers with a tank-top jersey (the shirt without sleeves: only the torso band of each row), shorts
# down to the knee (the trousers cut), the number on the back, and a ball drawn in the hands for a few moves.
import sys, math
G = sys.argv[1]; sys.argv = [sys.argv[0], G]; sys.path.insert(0, G)
from mk import *
CP = 'GandalfHardcore Character Asset Pack/'
def jersey(shirt, ramp):
    """v0.96 (Jonay: «camisetas de asillas»): the shirt without sleeves: an opening of the shirt's shape (eroded and grown
    back by 5 px) keeps the torso and drops what is thinner than it, the arms; the straps stay on the shoulders"""
    from PIL import ImageFilter
    a = shirt.split()[3].point(lambda v: 255 if v else 0)
    body = a.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5))
    out = Image.new('RGBA', shirt.size); out.paste(shirt, (0, 0), body)
    # plus a narrow band along the torso's axis (from the middle of the waist to the middle of the neck), for the frames
    # where the arms cover the chest and the opening leaves only thin strips of shirt
    sp = shirt.load(); op = out.load()
    for r in range(shirt.height // 64):
        for c in range(shirt.width // 80):
            ys = [y for y in range(64) if any(sp[c*80+x, r*64+y][3] for x in range(80))]
            if len(ys) < 6: continue
            def mid(yy): xs = [x for y in yy for x in range(80) if sp[c*80+x, r*64+y][3]]; return (min(xs) + max(xs)) / 2
            y0, y1 = min(ys), max(ys); cb = mid(range(y1 - 2, y1 + 1)); ct = mid(range(y0, y0 + 2))
            for y in ys:
                cx = cb + (ct - cb) * (y1 - y) / max(1, y1 - y0)
                for x in range(80):
                    if sp[c*80+x, r*64+y][3] and abs(x - cx) <= 3: op[c*80+x, r*64+y] = sp[c*80+x, r*64+y]
            # v0.96 (Jonay: «un hombro descubierto»): the shoulders (top 4 lines of the shirt) as wide as the chest just
            # below them, so both straps are there
            bp = body.load(); xs = [x for y in range(y0 + 4, y0 + 7) for x in range(80) if bp[c*80+x, r*64+y]]
            if xs:
                for y in range(y0, y0 + 4):
                    for x in range(min(xs), max(xs) + 1):
                        if sp[c*80+x, r*64+y][3]: op[c*80+x, r*64+y] = sp[c*80+x, r*64+y]
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
    im = compose([no_briefs(L(CP + 'Character skin colors/%s.png' % skin), ramp), shorts(PA, ramp), jersey(SH, ramp), SHOES, H(hair)])
    im.save(G + '/out2/' + name + '.png')   # v0.96 (Jonay): no ball drawn on the sheet (the game draws its own)
print('ok')
