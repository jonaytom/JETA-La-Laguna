# The basketball players' new animations (Jonay, 27-oct to 2-nov: tiro, robo, rebote, tapón and the four combo dunks):
# new frames made by joining the upper body of one frame of the pack with the legs of another (at the waist), the
# front leg lifted (the kick) and the near arm taken off to be turned by the game (the windmill).
# v0.99.6 (in the game: «perfectas así, aplícalo todo a escala del juego»): each look of the game builds its own sheet,
# so this writes no picture for the game but a MAP: for every pixel of every new frame, the pixel of the look's sheet
# (800 × 448, same layout as BKSHEET.sheet) it comes from. The same steps are run on a "coordinates" sheet (each pixel
# holds its own x, y) and on a real one (for the colour tests: the jersey, the hands).
# Use: python3 bk_anim.py <base sheet 800x448> <Pants.png> <out folder>  → bk_anim.png (proposal page), bk_anim.json,
#      bk_map.json (frames as runs [y, x0, n, sx0, sy] per frame)
import sys, json, math
from PIL import Image
BASE, PANTS, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
REAL = Image.open(BASE).convert('RGBA'); PA = Image.open(PANTS).convert('RGBA')
# the coordinates sheet: R = x & 255, G = x >> 8 | (y & 63) << 2, B = y >> 6, alpha as the real one
CO = Image.new('RGBA', REAL.size); cp = CO.load(); rp = REAL.load()
for y in range(REAL.height):
    for x in range(REAL.width):
        if rp[x, y][3]: cp[x, y] = (x & 255, (x >> 8) | ((y & 63) << 2), y >> 6, 255)
OUTL = (19, 19, 28)
def fr(im, r, c): return im.crop((c*80, r*64, c*80+80, r*64+64))
def waist(r, c):   # the top row of the trousers in that frame, and the middle of the waist
    p = fr(PA, r, c); bb = p.getbbox(); px = p.load(); xs = [x for x in range(80) if px[x, bb[1]][3]]
    return bb[1], (min(xs) + max(xs)) / 2
IDLE = (0, 0)
def make(SH):
    def join(U, Lw):
        """the upper body of frame U (row, col) on the legs of frame Lw, matched at the waist"""
        (ru, cu), (rl, cl) = U, Lw; wu, xu = waist(ru, cu); wl, xl = waist(rl, cl)
        up = fr(SH, ru, cu); lo = fr(SH, rl, cl).copy(); out = Image.new('RGBA', (80, 64))
        # (Jonay: «se ven manos a los lados del pantalón»): on the rows of the shorts only what is between their edges (±1)
        lp = lo.load(); pp = fr(PA, rl, cl).load()
        for y in range(wl, min(64, wl + 12)):
            xs = [x for x in range(80) if pp[x, y][3]]
            if not xs: continue
            for x in range(80):
                if x < min(xs) - 1 or x > max(xs) + 1: lp[x, y] = (0, 0, 0, 0)
        lower = Image.new('RGBA', (80, 64)); lower.paste(lo.crop((0, wl, 80, 64)), (round(xu - xl) - 1, wu))   # (-1, Jonay: the torso sat 1–2 px left of the shorts)
        upper = Image.new('RGBA', (80, 64)); upper.paste(up.crop((0, 0, 80, wu + 1)), (0, 0))
        out.alpha_composite(lower); out.alpha_composite(upper)
        bb = out.getbbox(); dy = 63 - bb[3]   # feet back to the bottom of the cell (the jump is the animation's own height)
        if dy: o2 = Image.new('RGBA', (80, 64)); o2.alpha_composite(out, (0, dy)); out = o2
        return out
    def kick(U, ang):
        """(Jonay: «en Entrepiernas usa la patada que tenemos y deja la pierna trasera como está»): the upper body of U on
        the standing legs, the front leg (the left one: they face left) lifted ang° round the hip"""
        w0, x0 = waist(*IDLE); lo = fr(SH, *IDLE); lp = lo.load(); front = Image.new('RGBA', (80, 64)); back = Image.new('RGBA', (80, 64)); fp, bp_ = front.load(), back.load()
        for y in range(w0 + 3, 64):
            for x in range(80):
                q = lp[x, y]
                if q[3]: (fp if x < x0 else bp_)[x, y] = q
        out = join(U, IDLE); o = out.load()
        for y in range(w0 + 3, 64):
            for x in range(80): o[x, y] = (0, 0, 0, 0)
        out.alpha_composite(back); out.alpha_composite(front.rotate(-ang, resample=Image.NEAREST, center=(x0, w0 + 4)))
        return out
    def windmill(legs, ang):
        """(Jonay: «el molino debe hacer con el brazo que queda a la cámara un giro de 360 grados»): the standing upper
        body with its near arm taken off (the game draws it turned round the shoulder)"""
        base = join(IDLE, legs); bp = base.load(); arm = Image.new('RGBA', (80, 64)); ap = arm.load()
        src = fr(SH, *IDLE).load(); real = fr(REAL, *IDLE).load()
        bb0 = fr(REAL, *IDLE).getbbox(); bb1 = base.getbbox(); dy = bb1[1] - bb0[1]
        jersey = lambda q: q[2] > q[0] + 30   # (on the real colours)
        for y in range(33, 50):
            for x in range(43, 50):
                q = real[x, y]
                if q[3] and not jersey(q): ap[x, y + dy] = src[x, y]; bp[x, y + dy] = (0, 0, 0, 0)
        piv = (44.5, 34 + dy); t = math.radians(-ang); hx, hy = 44.5 - piv[0], 49 + dy - piv[1]
        return base, arm, piv, [round(piv[0] + hx * math.cos(t) - hy * math.sin(t)), round(piv[1] + hx * math.sin(t) + hy * math.cos(t))]
    return join, kick, windmill
def hand(im, where):   # where the ball goes: 'top' = between the raised hands, 'front' = the stretched hand, 'high', 'chest'
    px = im.load(); pts = [(x, y) for y in range(64) for x in range(80) if px[x, y][3] and px[x, y][:3] != OUTL]
    if where == 'top': y0 = min(y for _, y in pts); xs = [x for x, y in pts if y <= y0 + 1]; return [round(sum(xs) / len(xs)), y0 - 2]
    if where == 'front':
        bb = im.getbbox(); pts = [(x, y) for x, y in pts if y < bb[1] + 26]; x0 = min(x for x, _ in pts); ys = [y for x, y in pts if x <= x0 + 1]; return [x0 - 2, round(sum(ys) / len(ys))]
    if where == 'high': y0 = min(y for _, y in pts); xs = [x for x, y in pts if y <= y0 + 1]; return [min(xs), y0 - 2]
    bb = im.getbbox(); return [round((bb[0] + bb[2]) / 2) - 4, bb[1] + 22]
def up(c): return (4, c)          # both arms up (the fall of the jump)
def lg(c): return (3, c)          # the legs tucked (the jump up)
# frames: (upper, legs or None = the whole frame, jump height px, ball where or [x,y] or None)
ANIMS = {
 'tiro':    {'name': 'Tiro en suspensión', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 6, 'top'), (up(1), lg(1), 12, 'top'), (up(2), lg(2), 15, 'top'), (up(3), lg(3), 16, None), (up(3), lg(3), 14, None), ((4, 1), None, 7, None), (IDLE, None, 0, None)], 'shot': 5},
 'robo':    {'name': 'Robo de balón', 'frames': [(IDLE, None, 0, None), ((5, 3), (2, 3), 0, None), ((5, 4), (2, 4), 0, 'front'), ((5, 4), (2, 0), 0, 'front'), ((5, 5), (2, 1), 0, 'chest'), (IDLE, None, 0, 'chest')]},
 'rebote':  {'name': 'Salto al rebote', 'frames': [(IDLE, None, 0, None), ((4, 0), (0, 0), 0, None), (up(0), lg(0), 12, None), (up(1), lg(1), 26, None), (up(2), lg(2), 34, 'top'), (up(3), lg(3), 32, 'top'), ((4, 0), None, 20, 'top'), ((4, 1), None, 6, 'top'), (IDLE, None, 0, 'chest')]},   # (Jonay, 27-oct: higher, the hands over the rim)
 'tapon':   {'name': 'Tapón', 'frames': [(IDLE, None, 0, None), ((5, 1), (0, 0), 0, None), ((5, 1), lg(0), 12, None), ((5, 2), lg(1), 30, None), ((5, 2), lg(2), 42, None), ((5, 3), lg(3), 40, None), ((5, 4), lg(3), 26, None), ((4, 1), None, 10, None), (IDLE, None, 0, None)], 'block': 4},   # (Jonay: «el tapón debe saltar algo más, el brazo por encima del aro»)
 'm360':    {'name': 'Mate 360 del Gofio', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 9, 'top'), (up(1), lg(1), 17, 'top'), (up(2), lg(2), 23, 'top'), (up(3), lg(3), 26, 'top'), (up(2), lg(2), 27, 'top'), (up(1), lg(1), 26, 'top'), (up(0), lg(3), 24, 'top'), (up(0), lg(3), 24, 'top'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'spin': [2, 7], 'slam': 8},   # (Jonay: «saltan demasiado alto»: a lower jump, both hands on the rim)
 'molino':  {'name': 'Molino del Teide', 'frames': [(IDLE, None, 0, 'chest'), (('arm', 180), (0, 0), 0, 'hand'), (('arm', 180), lg(0), 9, 'hand'), (('arm', 225), lg(1), 16, 'hand'), (('arm', 270), lg(1), 21, 'hand'), (('arm', 315), lg(2), 25, 'hand'), (('arm', 360), lg(2), 27, 'hand'), (('arm', 405), lg(3), 27, 'hand'), (('arm', 450), lg(3), 26, 'hand'), (('arm', 495), lg(3), 25, 'hand'), (('arm', 540), lg(3), 24, 'hand'), (('arm', 540), lg(3), 24, 'hand'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'slam': 10},   # (the arm goes round from up to up: 360°)
 'espaldas':{'name': 'Espaldas del Roque', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), (up(0), lg(0), 10, 'top'), (up(1), lg(1), 20, 'top'), (up(2), lg(2), 28, 'top'), (up(3), lg(3), 32, 'top'), ((4, 3), lg(3), 30, 'top'), ((4, 0), lg(2), 24, 'top'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'back': [2, 9], 'slam': 7},
 'piernas': {'name': 'Entrepiernas del Pastor', 'frames': [(IDLE, None, 0, 'chest'), ((4, 0), (0, 0), 0, 'top'), ((0, 0), lg(0), 9, 'chest'), ((0, 1), ('kick', 40), 17, [36, 49]), ((0, 2), ('kick', 75), 22, [40, 54]), ((0, 3), ('kick', 75), 25, [46, 52]), ((0, 3), ('kick', 40), 26, 'chest'), (up(1), lg(3), 27, 'top'), (up(0), lg(3), 24, 'top'), (up(0), lg(3), 24, 'top'), ((4, 0), None, 12, None), (IDLE, None, 0, None)], 'slam': 8},
}
def run(SH):
    join, kick, windmill = make(SH); frames, meta = [], {}
    for k, a in ANIMS.items():
        seq = []
        for (U, Lw, h, b) in a['frames']:
            armd = None
            if U[0] == 'arm':
                im, arm, piv, hb = windmill(Lw, U[1]); ball = hb if b == 'hand' else (None if b is None else hand(im, b))
                frames.append(arm); armd = {'i': len(frames) - 1, 'a': -U[1], 'p': list(piv)}
            elif isinstance(Lw, tuple) and Lw[0] == 'kick': im = kick(U, Lw[1]); ball = None if b is None else (b if isinstance(b, list) else hand(im, b))
            else:
                im = fr(SH, *U) if Lw is None else join(U, Lw)
                ball = None if b is None else (b if isinstance(b, list) else hand(im, b))
            seq.append({'i': len(frames), 'h': h, 'ball': ball, **({'arm': armd} if armd else {})}); frames.append(im)
        meta[k] = {'name': a['name'], 'frames': seq, **{x: a[x] for x in ('spin', 'back', 'slam', 'shot', 'block') if x in a}}
    return frames, meta
frR, meta = run(REAL); frC, _ = run(CO)
sheet = Image.new('RGBA', (80 * len(frR), 64))
for i, f in enumerate(frR): sheet.alpha_composite(f, (i * 80, 0))
sheet.save(OUT + '/bk_anim.png'); json.dump(meta, open(OUT + '/bk_anim.json', 'w'), ensure_ascii=False)
# the map: runs of pixels whose source moves on one by one along the row
runs = []
for f in frC:
    px = f.load(); rr = []
    for y in range(64):
        x = 0
        while x < 80:
            q = px[x, y]
            if not q[3]: x += 1; continue
            sx = q[0] | ((q[1] & 3) << 8); sy = (q[1] >> 2) | (q[2] << 6); n = 1
            while x + n < 80:
                q2 = px[x + n, y]
                if not q2[3] or (q2[0] | ((q2[1] & 3) << 8)) != sx + n or ((q2[1] >> 2) | (q2[2] << 6)) != sy: break
                n += 1
            rr += [y, x, n, sx, sy]; x += n
    runs.append(rr)
json.dump(runs, open(OUT + '/bk_map.json', 'w'), separators=(',', ':'))
print('ok', len(frR), 'frames,', sum(len(r) // 5 for r in runs), 'runs')
