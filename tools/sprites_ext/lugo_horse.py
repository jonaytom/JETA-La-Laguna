import sys, colorsys
from PIL import Image, ImageOps, ImageDraw
G = sys.argv[1]; A = "/mnt/user-data/uploads/GTA La Laguna/assets_externos/PixelHorse_V1.0/"
def grid(p):
    im = Image.open(p).convert('RGBA'); out = []
    for r in range(im.height // 64):
        for c in range(im.width // 64):
            f = im.crop((c*64, r*64, c*64+64, r*64+64))
            if f.getbbox(): out.append(f)
    return out
def white(f):  # the black horse to Lugo's white horse; the browns of the saddle and tack stay
    f = f.copy(); px = f.load()
    for y in range(64):
        for x in range(64):
            r, g, b, a = px[x, y]
            if not a: continue
            h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
            if s >= 0.2 and v >= 0.2 and 0.02 < h < 0.2:   # Jonay: the black horse stays; the copper barding in silver
                ramp = [(70,74,84), (118,124,136), (168,174,186), (214,220,228)]
                px[x, y] = ramp[min(3, int(v / 0.66 * 4))] + (a,)
    return f
def scale2x(im):
    W, H = im.size; src = im.load(); out = Image.new('RGBA', (W*2, H*2)); o = out.load()
    g = lambda x, y: src[min(W-1, max(0, x)), min(H-1, max(0, y))]
    for y in range(H):
        for x in range(W):
            P = g(x, y); A_, B, C, D = g(x, y-1), g(x+1, y), g(x-1, y), g(x, y+1)
            e = [P]*4
            if C == A_ and C != D and A_ != B: e[0] = A_
            if A_ == B and A_ != C and B != D: e[1] = B
            if D == C and D != B and C != A_: e[2] = C
            if B == D and B != A_ and D != C: e[3] = D
            o[2*x, 2*y], o[2*x+1, 2*y], o[2*x, 2*y+1], o[2*x+1, 2*y+1] = e
    return out
def outline(im):
    a = im.getchannel('A').load(); out = im.copy(); op = out.load(); W, H = im.size
    for y in range(H):
        for x in range(W):
            if a[x, y] == 0 and any(0 <= x+dx < W and 0 <= y+dy < H and a[x+dx, y+dy] > 100 for dx, dy in ((1,0),(-1,0),(0,1),(0,-1))): op[x, y] = (19,19,28,255)
    return out
# Lugo = the archer of the GandalfHardcore Archer pack (mail coif, red tabard; Jonay: «la armadura y casco del arquero
# le pegan más»), without the bow (everything from the string forwards) and with the cross of the tabard in gold
ARCH = Image.open('/mnt/user-data/uploads/GTA La Laguna/assets_externos/GandalfHardcore Archer/GandalfHardcore Archer red sheet.png').convert('RGBA').crop((0, 0, 64, 64))
apx = ARCH.load()
for y in range(64):
    for x in range(64):
        if x >= 33 and y < 58: apx[x, y] = (0, 0, 0, 0)
        elif apx[x, y][:3] == (159, 159, 159): apx[x, y] = (226, 184, 80, 255)
HIP = 48; UP = ARCH.crop((0, 0, 64, 55))   # Jonay: more of the seat: down to the hem of the tabard (row 55)
# a bit bigger (Jonay): ×1.25, from the scale2x copy so the pixels don't come out uneven
UP = scale2x(UP).resize((80, 69), Image.NEAREST); HIP = 60; ub = UP.getbbox(); ucx = (ub[0] + ub[2]) / 2
PANT, BOOT, K = (140,30,26), (40,32,30), (19,19,28)
def lance(cell, gx, gy, ang):
    """a jousting lance (Jonay): long, tapered, striped red and white, with the steel cone (vamplate) at the hand"""
    import math
    d = ImageDraw.Draw(cell); ux, uy = math.cos(ang), math.sin(ang); nx, ny = -uy, ux
    back, front = 10, 56
    def quad(t0, t1, w0, w1):
        a0 = (gx + ux*t0, gy + uy*t0); a1 = (gx + ux*t1, gy + uy*t1)
        return [(a0[0]+nx*w0, a0[1]+ny*w0), (a1[0]+nx*w1, a1[1]+ny*w1), (a1[0]-nx*w1, a1[1]-ny*w1), (a0[0]-nx*w0, a0[1]-ny*w0)]
    w = lambda t: 2.2 - 1.6 * (t + back) / (front + back)
    d.polygon(quad(-back-1, front+2, w(-back)+1, 1.2), fill=(19,19,28,255))
    t = -back
    while t < front:
        t2 = min(front, t + 5); col = (190,36,40,255) if int((t + back) / 5) % 2 == 0 else (236,232,224,255)
        d.polygon(quad(t, t2, w(t), w(t2)), fill=col); t = t2
    # the vamplate: a steel cone just in front of the hand
    v0, v1 = 3, 9
    d.polygon(quad(v0, v1, 5, 2.2), fill=(19,19,28,255)); d.polygon(quad(v0 + 0.5, v1 - 0.5, 4, 1.6), fill=(184,190,200,255))
    d.line([(gx + ux*(v0+1) + nx*3, gy + uy*(v0+1) + ny*3), (gx + ux*(v1-1) + nx*1.5, gy + uy*(v1-1) + ny*1.5)], fill=(236,240,246,255))
def rider(cell, rb, bob):
    global HORSE_PX, RIDER_PX
    """our Lugo (the soldier layers, gold) sitting on the horse: upper body + a bent leg hanging down the flank"""
    # the seat: the saddle of the horse frame itself (its dark red leather), so Lugo moves with the horse and not with
    # the pack's rider, whose arms shift its box (Jonay: Lugo went forwards when the horse went back)
    hp = HORSE_PX; sad = [(x, y) for x in range(64) for y in range(64) if hp[x, y][3] and hp[x, y][:3] in ((21,3,3),(44,17,17))]
    # only the saddle under the pack's rider (the bridle on the head has the same leather)
    rp = RIDER_PX; low = [(x, y) for x in range(rb[0], rb[2]) for y in range(int(rb[1] + (rb[3]-rb[1]) * 0.55), rb[3]) if rp[x, y][3]]
    lx = sum(p[0] for p in low) / len(low); ly = sum(p[1] for p in low) / len(low)
    near = [p for p in sad if abs(p[0] - lx) < 9 and abs(p[1] - ly) < 9] or sad
    sx = sum(p[0] for p in near) / len(near) * 2; seat = (min(p[1] for p in near) + 1.5) * 2
    d = ImageDraw.Draw(cell); hx, hy = sx, seat
    # the near leg in armour (silver, so it reads on the black horse): thigh forward, greave down, the steel shoe
    ST, ST2 = (176,182,194), (120,126,138)
    d.line([(hx-3, hy+1), (hx+9, hy+4)], fill=K, width=8); d.line([(hx-3, hy+1), (hx+9, hy+4)], fill=ST, width=6)
    d.line([(hx-2, hy+3), (hx+8, hy+5)], fill=ST2, width=2)
    d.line([(hx+9, hy+4), (hx+8, hy+18)], fill=K, width=7); d.line([(hx+9, hy+4), (hx+8, hy+17)], fill=ST, width=5)
    d.line([(hx+7, hy+6), (hx+7, hy+16)], fill=ST2, width=1)
    d.line([(hx+6, hy+19), (hx+14, hy+19)], fill=K, width=5); d.line([(hx+7, hy+19), (hx+13, hy+19)], fill=ST2, width=3)
    cell.alpha_composite(UP, (round(hx - ucx), round(hy - HIP)))
    lance(cell, hx + 7, hy - 9, LANCE_ANG)
    return cell
rows = []
import math
for a in ('Idle', 'Run', 'Raise'):
    LANCE_ANG = {'Idle': math.radians(-76), 'Run': math.radians(-5), 'Raise': math.radians(-40)}[a]
    hs = grid(A + 'Horse I/Horse Black/64x64_Atlas_Horse_%s.png' % a); ls = grid(A + 'Leash/64x64_Atlas_Horse_Leash_%s.png' % a)
    rs = grid(A + 'Rider/Rider Complete/64x64_Atlas_HorseRider_Mount%s.png' % a); fs = []
    for i, hf in enumerate(hs):
        f = white(hf)
        big = scale2x(f); cell = Image.new('RGBA', (128, 128)); cell.alpha_composite(big)
        if i < len(rs) and rs[i].getbbox():
            HORSE_PX = hf.load(); RIDER_PX = rs[i].load(); cell = rider(cell, rs[i].getbbox(), 0)
        if i < len(ls): cell.alpha_composite(scale2x(ls[i]))
        fs.append(outline(cell))
    rows.append(fs)
W = max(len(x) for x in rows); sheet = Image.new('RGBA', (W*128, 128*len(rows)))
for ri, fs in enumerate(rows):
    for ci, f in enumerate(fs): sheet.paste(f, (ci*128, ri*128))
sheet.save(G + '/out2/lugo_caballo.png'); print([len(x) for x in rows])
prev = Image.new('RGBA', (128*6, 256), (60,70,85,255))
for c in range(6): prev.alpha_composite(sheet.crop((c*128, 128, c*128+128, 256)), (c*128, 0)); prev.alpha_composite(sheet.crop((c*128, 256, c*128+128, 384)), (c*128, 128))
prev.resize((prev.width*2, prev.height*2), Image.NEAREST).save(G + '/prevL.png')
