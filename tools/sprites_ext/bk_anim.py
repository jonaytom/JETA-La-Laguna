# Proposal (Jonay, 27-oct: «hay que hacer los mates de los combos… el salto combínalo con la caída de salto para que ya
# subiendo salga con los brazos en alto, el tiro debe subir los brazos también; una muestra de basket tirando, robando
# balón, saltando al rebote, tapón y los combos de mates»): new frames for the basketball players made by joining the
# upper body of one frame of the pack with the legs of another (at the waist), plus a few made by moving whole limbs.
# Each animation: a strip of frames + per frame the jump height, the turn (360 / back), and where the ball is.
# Use: python3 bk_anim.py <gen folder> <player sheet>  → out2/bk_anim.png + out2/bk_anim.json
import sys, json
from PIL import Image
G = sys.argv[1]; SH = Image.open(sys.argv[2]).convert('RGBA')
A = '/mnt/user-data/uploads/GTA La Laguna/assets_externos/GandalfHardcore Character Asset Pack/'
PA = Image.open(A + 'Male Clothing/Pants.png').convert('RGBA')
OUTL = (19, 19, 28)
def fr(im, r, c): return im.crop((c*80, r*64, c*80+80, r*64+64))
def waist(r, c):   # the top row of the trousers in that frame, and the middle of the waist
    p = fr(PA, r, c); bb = p.getbbox(); px = p.load(); xs = [x for x in range(80) if px[x, bb[1]][3]]
    return bb[1], (min(xs) + max(xs)) / 2
def join(U, Lw):
    """the upper body of frame U (row, col) on the legs of frame Lw, matched at the waist"""
    (ru, cu), (rl, cl) = U, Lw; wu, xu = waist(ru, cu); wl, xl = waist(rl, cl)
    up = fr(SH, ru, cu); lo = fr(SH, rl, cl); out = Image.new('RGBA', (80, 64))
    # (Jonay: «se ven manos a los lados del pantalón»): the hands of the legs' frame hang by the shorts: on the rows of
    # the shorts only what is between the trousers' edges (±1) stays
    lo = lo.copy(); lp = lo.load(); pp = fr(PA, rl, cl).load()
    for y in range(wl, min(64, wl + 12)):
        xs = [x for x in range(80) if pp[x, y][3]]
        if not xs: continue
        for x in range(80):
            if x < min(xs) - 1 or x > max(xs) + 1: lp[x, y] = (0, 0, 0, 0)
    lower = Image.new('RGBA', (80, 64)); lower.paste(lo.crop((0, wl, 80, 64)), (round(xu - xl), wu))
    upper = Image.new('RGBA', (80, 64)); upper.paste(up.crop((0, 0, 80, wu + 1)), (0, 0))
    out.alpha_composite(lower); out.alpha_composite(upper)
    bb = out.getbbox(); dy = 63 - bb[3]   # feet back to the bottom of the cell (the jump is the animation's own height)
    if dy: o2 = Image.new('RGBA', (80, 64)); o2.alpha_composite(out, (0, dy)); out = o2
    return out
def hand(im, where):   # where the ball goes: 'top' = between the two raised hands, 'front' = the stretched hand (left), 'chest'
    px = im.load(); pts = [(x, y) for y in range(64) for x in range(80) if px[x, y][3] and px[x, y][:3] != OUTL]
    if where == 'top': y0 = min(y for _, y in pts); xs = [x for x, y in pts if y <= y0 + 1]; return [round(sum(xs) / len(xs)), y0 - 2]
    if where == 'front':   # (above the waist: not a foot)
        bb = im.getbbox(); pts = [(x, y) for x, y in pts if y < bb[1] + 26]; x0 = min(x for x, _ in pts); ys = [y for x, y in pts if x <= x0 + 1]; return [x0 - 2, round(sum(ys) / len(ys))]
    if where == 'high': y0 = min(y for _, y in pts); xs = [x for x, y in pts if y <= y0 + 1]; return [min(xs), y0 - 2]
    bb = im.getbbox(); return [round((bb[0] + bb[2]) / 2) - 4, bb[1] + 22]
IDLE = (0, 0)
sys.path.insert(0, G); from mk import shear_rotate
def windmill(legs, ang):
    """(Jonay: «el molino debe hacer con el brazo que queda a la cámara un giro de 360 grados»): the standing upper body
    with its near arm (the one on the right of the sheet) taken off and put back turned ang° round the shoulder"""
    base = join(IDLE, legs); bp = base.load(); arm = Image.new('RGBA', (80, 64)); ap = arm.load()
    src = fr(SH, *IDLE).load(); dy = 0
    bb0 = fr(SH, *IDLE).getbbox(); bb1 = base.getbbox(); dy = bb1[1] - bb0[1]
    for y in range(33, 50):
        for x in range(45, 50):
            q = src[x, y]
            if q[3]: ap[x, y + dy] = q; bp[x, y + dy] = (0, 0, 0, 0)
    piv = (45.5, 34 + dy)   # the arm is drawn by the game turned round the shoulder (at the screen's resolution, like the kick)
    import math; t = math.radians(-ang); hx, hy = 46 - piv[0], 48 + dy - piv[1]
    return base, arm, piv, [round(piv[0] + hx * math.cos(t) - hy * math.sin(t)), round(piv[1] + hx * math.sin(t) + hy * math.cos(t))]
# frames: (upper, legs or None = the whole frame, jump height px, turn (1 normal, cos for the 360, -1 back), ball where or [x,y] or None)
def up(c): return (4, c)          # both arms up (the fall of the jump)
def lg(c): return (3, c)          # the legs tucked (the jump up)
ANIMS = {
 'tiro':    {'name': 'Tiro en suspensión', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 6, 'top'), (up(1), lg(1), 12, 'top'), (up(2), lg(2), 15, 'top'), (up(3), lg(3), 16, None), (up(3), lg(3), 14, None), ((4, 1), None, 7, None), (IDLE, None, 0, None)], 'shot': 5},   # (Jonay: both arms up, like the rebound)
 'robo':    {'name': 'Robo de balón', 'frames': [(IDLE, None, 0, None), ((5, 3), (2, 3), 0, None), ((5, 4), (2, 4), 0, 'front'), ((5, 4), (2, 0), 0, 'front'), ((5, 5), (2, 1), 0, 'chest'), (IDLE, None, 0, 'chest')]},
 'rebote':  {'name': 'Salto al rebote', 'frames': [(IDLE, None, 0, None), ((4, 0), (0, 0), 0, None), (up(0), lg(0), 8, None), (up(1), lg(1), 16, None), (up(2), lg(2), 20, 'top'), (up(3), lg(3), 18, 'top'), ((4, 0), None, 10, 'top'), ((4, 1), None, 3, 'top'), (IDLE, None, 0, 'chest')]},
 'tapon':   {'name': 'Tapón', 'frames': [(IDLE, None, 0, None), ((5, 1), (0, 0), 0, None), ((5, 1), lg(0), 8, None), ((5, 2), lg(1), 16, None), ((5, 2), lg(2), 20, None), ((5, 3), lg(3), 19, None), ((5, 4), lg(3), 14, None), ((4, 1), None, 6, None), (IDLE, None, 0, None)], 'block': 4},
 'm360':    {'name': 'Mate 360 del Gofio', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 10, 'top'), (up(1), lg(1), 20, 'top'), (up(2), lg(2), 28, 'top'), (up(3), lg(3), 32, 'top'), (up(2), lg(2), 32, 'top'), (up(1), lg(1), 30, 'top'), ((5, 3), lg(3), 26, 'high'), ((5, 4), lg(3), 22, 'front'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'spin': [2, 8], 'slam': 9},
 'molino':  {'name': 'Molino del Teide', 'frames': [(IDLE, None, 0, 'chest'), (('arm', 0), (0, 0), 0, 'hand'), (('arm', 0), lg(0), 10, 'hand'), (('arm', 45), lg(1), 18, 'hand'), (('arm', 90), lg(1), 24, 'hand'), (('arm', 135), lg(2), 28, 'hand'), (('arm', 180), lg(2), 31, 'hand'), (('arm', 225), lg(3), 32, 'hand'), (('arm', 270), lg(3), 30, 'hand'), (('arm', 315), lg(3), 26, 'hand'), (('arm', 350), lg(3), 22, None), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'slam': 9},
 'espaldas':{'name': 'Espaldas del Roque', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 10, 'top'), (up(1), lg(1), 20, 'top'), (up(2), lg(2), 28, 'top'), (up(3), lg(3), 32, 'top'), ((4, 3), lg(3), 30, 'top'), ((4, 0), lg(2), 24, 'top'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'back': [2, 9], 'slam': 7},
 'piernas': {'name': 'Entrepiernas del Pastor', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), ((0, 0), lg(0), 10, 'chest'), ((0, 1), (2, 0), 20, [33, 50]), ((0, 2), (2, 0), 26, [40, 55]), ((0, 3), (2, 0), 29, [47, 50]), (up(1), lg(3), 32, 'top'), ((5, 3), lg(3), 28, 'high'), ((5, 4), lg(3), 22, 'front'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'slam': 8},   # (Jonay: the legs open, one forward one back, while the ball goes under)
}
frames, meta = [], {}
for k, a in ANIMS.items():
    seq = []
    for (U, Lw, h, b) in a['frames']:
        armd = None
        if U[0] == 'arm':
            im, arm, piv, hb = windmill(Lw, U[1]); ball = hb if b == 'hand' else (None if b is None else hand(im, b))
            frames.append(arm); armd = {'i': len(frames) - 1, 'a': -U[1], 'p': list(piv)}   # (canvas angles: clockwise)
        else:
            im = fr(SH, *U) if Lw is None else join(U, Lw)
            ball = None if b is None else (b if isinstance(b, list) else hand(im, b))
        seq.append({'i': len(frames), 'h': h, 'ball': ball, **({'arm': armd} if armd else {})}); frames.append(im)
    meta[k] = {'name': a['name'], 'frames': seq, **{x: a[x] for x in ('spin', 'back', 'slam', 'shot', 'block') if x in a}}
sheet = Image.new('RGBA', (80 * len(frames), 64))
for i, f in enumerate(frames): sheet.alpha_composite(f, (i * 80, 0))
sheet.save(G + '/out2/bk_anim.png'); json.dump(meta, open(G + '/out2/bk_anim.json', 'w'), ensure_ascii=False)
print('ok', len(frames), 'frames')
