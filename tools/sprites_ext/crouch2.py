# Bencomo crouched, drawn by hand: the upper body of the pack (down to the tamarco) lowered 7 px and new legs,
# one knee on the ground (the back one) and the front foot flat, pixel by pixel with the palette of the skin.
import sys, math; G = sys.argv[1]; sys.argv = [sys.argv[0], G]; sys.path.insert(0, G)
from mk import *
src = open(G + '/build.py').read(); exec(src.split("SK3 = L(")[0].split("os.makedirs(O, exist_ok=True)")[1])
PAL = {'A': (19,19,28), 'B': (106,65,61), 'C': (162,103,90), 'D': (204,141,103), 'E': (185,123,103)}
LEGS = [  # x from hip-centre - 13, y from the hip row + 1: the front thigh forward and its shin down to the foot;
          # the back thigh straight down to the knee on the ground and its shin lying backwards
 "         AADDDDDDDDDDDA      ",
 "         ACDDEEEEEEEEDDA     ",
 "         ACEBAAAAAAACEDDA    ",
 "         ACEA      ACDDA     ",
 "         ACEA      ACEDA     ",
 "   AAAAAACEEA      ACEDAA    ",
 "  ACCEEEEEEBA     ACCEEDDA   ",
]
DROP = 5
UW = {(148,175,192),(105,133,160),(74,96,130),(41,55,87)}
SK3 = L('GandalfHardcore Character Asset Pack/Character skin colors/Male Skin3.png')
STM = L('GandalfHardcore 35x Hand Items/Male Hand/Stick.png')
H = lambda n: L('GandalfHardcore 58x Hair/28x Male Hair/Male Hair%d.png' % n)
TAM = [(60,38,22),(110,74,44),(150,108,66),(196,160,112)]
HAIR = tint(H(27), [(19,19,28),(30,26,30),(48,40,42),(70,60,60)])
b2 = open(G + '/build2.py').read(); exec(b2[b2.index('ENDS = {}'):b2.index('def eyes(')])
STAFF = pole(STM, 12, 4, [(30,20,14),(92,58,34),(120,84,52),(150,104,62)], key='benc', skin=SK3, mid=4)
fr = lambda im, r, c: im.crop((c*80, r*64, c*80+80, r*64+64))
def hip_of(sk):
    """the last row with tamarco (underwear) pixels and the centre x of that row"""
    px = sk.load(); rows = [y for y in range(64) if any(px[x, y][3] and px[x, y][:3] in UW for x in range(80))]
    y = rows[-1] + 1; xs = [x for x in range(80) if px[x, y][3]]
    return y, (min(xs) + max(xs)) / 2
def crouch(r, c, staff_mode='keep'):
    sk = fr(SK3, r, c); hy, hx = hip_of(sk)
    def lean(im):  # the back bends forward: each row above the hips moves right a little more
        out = Image.new('RGBA', (80, hy + 1))
        for y in range(hy + 1): out.paste(im.crop((0, y, 80, y + 1)), (-round((hy - y) * 0.13), y))
        return out
    CUT = (hy - 13, hy - 11, hy - 9)   # Jonay: the trunk 3 px shorter when crouched (3 rows of the belly out)
    def shrink(im):
        out = Image.new('RGBA', (80, hy + 1)); y2 = hy
        for y in range(hy, -1, -1):
            if y in CUT: continue
            out.paste(im.crop((0, y, 80, y + 1)), (0, y2)); y2 -= 1
        return out
    upper_sk = lean(shrink(sk.crop((0, 0, 80, hy + 1))))
    s = Image.new('RGBA', (80, 64)); s.alpha_composite(upper_sk, (0, DROP))
    x0 = round(hx) - 13; px = s.load()
    for j, line in enumerate(LEGS):
        for i, ch in enumerate(line):
            if ch != ' ':
                X, Y = round(hx) + 13 - i, hy + DROP + 1 + j   # mirrored: the pack's characters face LEFT
                if 0 <= X < 80 and 0 <= Y < 64: px[X, Y] = PAL[ch] + (255,)
    hair = Image.new('RGBA', (80, 64)); hair.alpha_composite(lean(shrink(fr(HAIR, r, c).crop((0, 0, 80, hy + 1)))), (0, DROP))
    st = Image.new('RGBA', (80, 64))
    if staff_mode == 'none': pass   # (v0.94) without the pole: the game draws it pointing down for the pogo
    elif staff_mode == 'keep': st.alpha_composite(fr(STAFF, r, c), (0, DROP))
    else:  # the low thrust: from the hands forward and down to the ground in front
        spx = s.load(); cand = [(x, y) for y in range(44, 56) for x in range(80) if spx[x, y][3] and spx[x, y][:3] != (19,19,28)]
        gx, gy = round(hx) - 6, hy + DROP - 3; ang = math.radians(staff_mode)
        a = (gx + math.cos(ang) * 26, gy + math.sin(ang) * 26); b = (gx - math.cos(ang) * 12, gy - math.sin(ang) * 12)
        d = ImageDraw.Draw(st); d.line([a, b], fill=(19,19,28,255), width=3); d.line([a, b], fill=(92,58,34,255), width=1)
    st = st.crop((0, 0, 80, 63)); stf = Image.new('RGBA', (80, 64)); stf.alpha_composite(st)
    skin = recol_uw(s, TAM)
    return compose([skin, hair, stf]), s
def row(fs):
    im = Image.new('RGBA', (80*len(fs), 64)); sk = Image.new('RGBA', (80*len(fs), 64))
    for i, (f, s) in enumerate(fs): im.paste(f, (i*80, 0)); sk.paste(s, (i*80, 0))
    return band(im, sk)
idle = row([crouch(0, c, 258) for c in range(5)])
atk = row([crouch(0, 0, 258), crouch(0, 1, 220), crouch(0, 2, 168), crouch(0, 3, 158), crouch(0, 4, 158), crouch(0, 0, 210)])
idle.save(G + '/out2/ben_agachado.png'); row([crouch(0, c, 'none') for c in range(5)]).save(G + '/out2/ben_agachado_ns.png'); atk.save(G + '/out2/ben_golpebajo2.png')
prev = Image.new('RGBA', (80*7, 64), (60,70,85,255))
prev.alpha_composite(fr(idle, 0, 0)); [prev.alpha_composite(fr(atk, 0, c), ((c+1)*80, 0)) for c in range(6)]
prev.resize((prev.width*3, 192), Image.NEAREST).save(G + '/prevD.png')
