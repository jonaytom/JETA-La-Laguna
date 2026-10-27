# El lagarto gigante de El Hierro, drawn by code as a puppet (so it can walk and bite): Jonay liked the long, low
# dimetrodon-like silhouette of his picture without the sail; walking moves the legs like the horse, attacking
# stretches the neck and opens the mouth with teeth. Colours of the real one (Gallotia simonyi): dark grey-brown,
# orange spots on the flanks, yellowish belly. Faces right; frames 96 × 48, feet on y 44.
import sys, math
from PIL import Image, ImageDraw
G = sys.argv[1]
FW, FH, GY = 120, 48, 44; DX = 14
K = (19,19,28); LIGHT = (104,132,70); BASE = (60,86,50); DARK = (38,56,36); BELLY = (190,172,96); SPOT = (214,140,44)   # Jonay: greener
FAR = (32,46,32); FARL = (46,64,42); TOOTH = (244,240,226); MOUTH = (110,20,22); EYE = (232,40,26)
def disc(d, x, y, r, fill=255):
    d.ellipse([x - r, y - r, x + r, y + r], fill=fill)
def limb(d, a, b, w, fill=255):
    d.line([a, b], fill=fill, width=w); disc(d, b[0], b[1], w / 2 - 0.5, fill); disc(d, a[0], a[1], w / 2 - 0.5, fill)
def ik(h, f, L1, L2, up=1):
    """knee of a two-bone leg from the hip h to the foot f (bending forwards-up like a sprawling lizard)"""
    dx, dy = f[0] - h[0], f[1] - h[1]; dist = min(math.hypot(dx, dy), L1 + L2 - 0.01)
    a = math.atan2(dy, dx); c = (L1*L1 + dist*dist - L2*L2) / (2 * L1 * dist); c = max(-1, min(1, c))
    k = a - up * math.acos(c); return (h[0] + math.cos(k) * L1, h[1] + math.sin(k) * L1)
SEATS = []
def frame(walk=None, bite=0.0, breath=0.0, sway=0.0):
    """walk: the phase (0..1) or None; bite: 0..1 (neck forward and jaw open); breath, sway: idle"""
    mask = Image.new('L', (FW, FH)); d = ImageDraw.Draw(mask)
    farL = Image.new('L', (FW, FH)); dF = ImageDraw.Draw(farL)
    nearL = Image.new('L', (FW, FH)); dN = ImageDraw.Draw(nearL)
    bob = 0 if walk is None else round(math.sin(walk * 4 * math.pi) * 0.6)
    cx, cy = 44 + DX, 29 + bob
    # the legs: hips and shoulders; feet on the ground moving in a cycle (diagonal pairs, like a trotting horse)
    legs = [('far', (31 + DX, cy + 3), 0.5), ('far', (55 + DX, cy + 3), 0.0), ('near', (35 + DX, cy + 4), 0.0), ('near', (58 + DX, cy + 4), 0.5)]
    for side, h, ph in legs:
        if walk is None: fx, lift = h[0] + 3, 0
        else:
            t = (walk + ph) % 1; fx = h[0] + 3 + math.cos(t * 2 * math.pi) * 5; lift = max(0, -math.sin(t * 2 * math.pi)) * 3   # lifted while it swings forwards (Jonay: it went backwards)
        foot = (fx, GY - lift); knee = ik(h, foot, 7, 8)
        dd = dF if side == 'far' else dN
        limb(dd, h, knee, 4); limb(dd, knee, foot, 3); dd.line([(foot[0] - 1, foot[1]), (foot[0] + 4, foot[1])], fill=255, width=2)
    # the tail: tapering, swaying
    pts = []
    for i in range(26):
        t = i / 25; x = cx - 14 - t * 40; y = cy + 2 + t * 9 + math.sin(t * 3 + sway) * 2 * t
        pts.append((x, y, 6.2 * (1 - t) + 0.8))
    for x, y, r in pts: disc(d, x, y, r / 2 + 0.3)
    # the body, the neck and the head (the neck stretches when it bites)
    ry = 7 + breath
    SEATS.append((cx - 3, cy - ry + 2))
    d.ellipse([cx - 17, cy - ry, cx + 17, cy + ry - 1], fill=255)
    ext = bite * 9; hx, hy = 70 + DX + ext, cy - 6 + bite * 2
    for i in range(9):
        t = i / 8; disc(d, cx + 14 + t * (hx - cx - 14), cy - 2 + t * (hy - cy + 2), 4.2 - t * 0.8)
    # the head: skull (upper jaw) and the lower jaw hinged at the back, opening with the bite
    skull = [(hx - 5, hy - 3), (hx + 2, hy - 4), (hx + 9, hy - 2), (hx + 14, hy), (hx + 14, hy + 1), (hx - 4, hy + 2)]
    d.polygon(skull, fill=255)
    op = bite * 0.6; hinge = (hx - 3, hy + 2)
    jaw = [(hinge[0], hinge[1] - 1), (hinge[0] + 16 * math.cos(op), hinge[1] + 16 * math.sin(op) - 1),
           (hinge[0] + 15 * math.cos(op) - 1, hinge[1] + 15 * math.sin(op) + 1.5), (hinge[0], hinge[1] + 2.5)]
    d.polygon(jaw, fill=255)
    # ---------- colour
    img = Image.new('RGBA', (FW, FH))
    def paint(m, top, mid, low, belly=True):
        mp = m.load(); ip = img.load()
        for x in range(FW):
            ys = [y for y in range(FH) if mp[x, y]]
            if not ys: continue
            t, b = ys[0], ys[-1]
            for y in ys:
                p = (y - t) / max(1, b - t)
                ip[x, y] = (top if p < 0.28 else mid if p < 0.72 or not belly else low) + (255,)
    paint(farL, FARL, FAR, FAR, False)
    paint(mask, LIGHT, BASE, BELLY)
    paint(nearL, LIGHT, BASE, DARK, False)
    ip = img.load(); mp = mask.load()
    # the orange spots on the flank and the crest of spines on the back
    for (sx, sy) in ((cx - 9, cy - 1), (cx - 3, cy + 1), (cx + 3, cy - 1), (cx + 9, cy + 1), (cx - 15, cy + 2), (cx - 22, cy + 4), (cx + 14, cy - 3)):
        for ddx, ddy in ((0, 0), (1, 0), (0, 1)):
            X, Y = int(sx + ddx), int(sy + ddy)
            if 0 <= X < FW and 0 <= Y < FH and mp[X, Y] and ip[X, Y][:3] == BASE: ip[X, Y] = SPOT + (255,)
    for x in range(int(cx - 34), int(hx - 2), 3):
        ys = [y for y in range(FH) if mp[x, y]]
        if ys and ys[0] >= 2: ip[x, ys[0] - 1] = BASE + (255,); ip[x, ys[0] - 2] = DARK + (255,)
    # the mouth: dark red inside when open, the teeth on both jaws
    if bite > 0.15:
        dI = ImageDraw.Draw(img)
        inner = [(hinge[0] + 1, hinge[1]), (hx + 13, hy + 1), (hinge[0] + 14 * math.cos(op), hinge[1] + 14 * math.sin(op))]
        dI.polygon(inner, fill=MOUTH + (255,))
        for i in range(3, 14, 2):
            X, Y = int(hx - 3 + i), int(hy + 1)
            if ip[X, Y][3]: ip[X, Y] = TOOTH + (255,)
            jx, jy = hinge[0] + i * math.cos(op), hinge[1] + i * math.sin(op) - 1
            if 0 <= int(jx) < FW and 0 <= int(jy) < FH: ip[int(jx), int(jy)] = TOOTH + (255,)
    else:
        for i in range(0, 15):
            X, Y = int(hx - 3 + i), int(hy + 2)
            if 0 <= X < FW and ip[X, Y][3]: ip[X, Y] = DARK + (255,)
    # the eye: red, the brow frowning
    ex, ey = int(hx + 3), int(hy - 1)
    ip[ex, ey] = EYE + (255,); ip[ex + 1, ey] = EYE + (255,)
    for i in range(-1, 3): ip[ex + i, ey - 1 - (1 if i < 0 else 0)] = K + (255,)
    # ---------- the black outline
    a = img.getchannel('A').load(); out = img.copy(); opx = out.load()
    for y in range(FH):
        for x in range(FW):
            if a[x, y] == 0 and any(0 <= x+dx < FW and 0 <= y+dy < FH and a[x+dx, y+dy] > 0 for dx, dy in ((1,0),(-1,0),(0,1),(0,-1))): opx[x, y] = K + (255,)
    return out
rows = [
    [frame(breath=b, sway=s) for b, s in ((0, 0), (0.4, 0.5), (0.6, 1.0), (0.3, 0.5))],          # idle
    [frame(walk=i / 8, sway=i / 8 * 6.28) for i in range(8)],                                       # walk
    [frame(bite=v) for v in (0.0, 0.3, 0.7, 1.0, 1.0, 0.5)],                                        # bite
]
sheet = Image.new('RGBA', (FW * 8, FH * 3))
for r, fs in enumerate(rows):
    for c, f in enumerate(fs): sheet.paste(f, (c * FW, r * FH))
sheet.save(G + '/out2/lagarto3.png')
import json; json.dump({'seats': SEATS, 'rows': [len(r) for r in rows]}, open(G + '/out2/lagarto3.json', 'w'))
bg = Image.new('RGBA', sheet.size, (60,70,85,255)); bg.alpha_composite(sheet); bg.resize((sheet.width * 2, sheet.height * 2), Image.NEAREST).save(G + '/z.png')
