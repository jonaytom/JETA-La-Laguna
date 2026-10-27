import sys, math
from PIL import Image, ImageDraw
A = '/mnt/user-data/uploads/GTA La Laguna/assets_externos/'
P = A + 'GandalfHardcore Character Asset Pack/'
OUT = sys.argv[1]
FW, FH = 80, 64
def L(p): return Image.open(A + p).convert('RGBA')
UW = [(148,175,192),(105,133,160),(74,96,130),(41,55,87)]
def recolor(im, src, dst, only=None):
    px = im.load(); m = dict(zip(src, dst))
    for y in range(im.height):
        for x in range(im.width):
            r,g,b,a = px[x,y]
            if a and (r,g,b) in m: px[x,y] = m[(r,g,b)] + (a,)
    return im
def tint(im, ramp):  # map by luminance onto a ramp of colours (dark→light), keep alpha
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r,g,b,a = px[x,y]
            if not a or (r,g,b)==(19,19,28): continue
            l = (r*0.3+g*0.59+b*0.11)/255; i = min(len(ramp)-1, int(l*len(ramp)))
            px[x,y] = ramp[i] + (a,)
    return im
LEATHER = [(66,42,26),(104,70,42),(140,98,60),(176,130,84)]
FUR = [(70,50,34),(120,90,60),(170,140,100),(214,190,150),(236,220,190)]
def counts(im):
    rows = []
    for r in range(im.height // FH):
        n = 0
        for c in range(im.width // FW):
            if im.crop((c*FW, r*FH, c*FW+FW, r*FH+FH)).getbbox(): n = c + 1
        rows.append(n)
    return rows
def frames_apply(im, fn):
    out = im.copy()
    for r in range(im.height // FH):
        for c in range(im.width // FW):
            box = (c*FW, r*FH, c*FW+FW, r*FH+FH); f = im.crop(box)
            if f.getbbox(): out.paste(fn(f, r, c), box)
    return out
def stick_pixels(f):
    px = f.load(); pts = []
    for y in range(f.height):
        for x in range(f.width):
            if px[x,y][3]: pts.append((x,y))
    return pts
def extend_stick(stick, k_up, k_down, col=None):
    """lengthen the stick of each frame along its axis (a long vara from the short stick)"""
    def fn(f, r, c):
        pts = stick_pixels(f)
        if len(pts) < 4: return f
        mx = sum(p[0] for p in pts)/len(pts); my = sum(p[1] for p in pts)/len(pts)
        sxx = sum((p[0]-mx)**2 for p in pts); syy = sum((p[1]-my)**2 for p in pts); sxy = sum((p[0]-mx)*(p[1]-my) for p in pts)
        ang = 0.5*math.atan2(2*sxy, sxx-syy); ux, uy = math.cos(ang), math.sin(ang)
        if uy > 0: ux, uy = -ux, -uy   # u points up
        proj = [ (p[0]-mx)*ux + (p[1]-my)*uy for p in pts ]; lo, hi = min(proj), max(proj)
        g = Image.new('RGBA', f.size); d = ImageDraw.Draw(g)
        dark, mid, light = (19,19,28,255), (92,58,34,255), (150,104,62,255)
        a = (mx+ux*(hi+k_up), my+uy*(hi+k_up)); b = (mx+ux*(lo-k_down), my+uy*(lo-k_down))
        d.line([a,b], fill=dark, width=3); d.line([a,b], fill=mid, width=1)
        g.alpha_composite(f); return g
    return frames_apply(stick, fn)
def thicken(stick, ramp):
    def fn(f, r, c):
        g = Image.new('RGBA', f.size); px = f.load(); gp = g.load()
        for y in range(f.height):
            for x in range(f.width):
                if px[x,y][3]:
                    for dx,dy in ((1,0),(0,1),(1,1),(-1,0),(0,-1)):
                        if 0<=x+dx<f.width and 0<=y+dy<f.height: gp[x+dx,y+dy] = (19,19,28,255)
        g.alpha_composite(f); return tint(g, ramp)
    return frames_apply(stick, fn)
def headband(skin, hair, color=(240,236,226,255), shade=(180,172,160,255), row_off=3):
    def fn(f, r, c):
        box = (c*FW, r*FH, c*FW+FW, r*FH+FH); s = skin.crop(box); h = hair.crop(box)
        sb = s.getbbox()
        if not sb: return f
        top = sb[1]; sp = s.load(); hp = h.load(); out = f.copy(); op = out.load()
        # head columns: opaque skin in the first 7 rows of the body
        cols = [x for x in range(FW) if any(sp[x,y][3] for y in range(top, top+7))]
        if not cols: return f
        x0, x1 = min(cols), max(cols)
        if x1 - x0 > 12: return f   # lying / odd frame
        for x in range(x0, x1+1):
            for dy in (0,1):
                y = top + row_off + dy
                if op[x,y][3] and op[x,y][:3] != (19,19,28):
                    op[x,y] = color if dy == 0 else shade
        return out
    return frames_apply_pair(fn)
def frames_apply_pair(fn):
    return fn
def compose(layers):
    b = Image.new('RGBA', layers[0].size)
    for l in layers: b.alpha_composite(l)
    return b

def with_kicks(back, body, front, fw=80, fh=64, oy=0, hip=51):
    """v0.95 (Jonay): the whole sheet (back accessories + body + front accessories) plus two rows made from the layers:
    7 = the kick to the crotch (the standing legs stay, a copy of the body's legs swings forwards from the hip: they
        face left), 8 = the running kick (the idle figure turned ~100° so it flies almost flat, feet in front)."""
    full = compose([back, body, front]) if back is not None else compose([body, front])
    H = hip + oy
    def fr(im, r, c): return im.crop((c*fw, r*fh, c*fw+fw, r*fh+fh))
    b0 = fr(body, 0, 0); legs = Image.new('RGBA', (fw, fh)); legs.paste(b0.crop((0, H, fw, fh)), (0, H))
    lb = legs.getbbox(); px = (lb[0] + lb[2]) / 2
    upper = Image.new('RGBA', (fw, fh)); upper.paste(b0.crop((0, 0, fw, H)), (0, 0))
    acc = Image.new('RGBA', (fw, fh))
    if back is not None: acc.alpha_composite(fr(back, 0, 0))
    accf = fr(front, 0, 0)
    # v0.96 (Jonay: «se ven 3 piernas»): the legs split at the hip: the back one stays standing and only the front one
    # (the one on the side the sheet looks to: left) swings up, so there are two legs and not three
    lp = legs.load(); fwd = Image.new('RGBA', (fw, fh)); stay = Image.new('RGBA', (fw, fh)); fp, sp_ = fwd.load(), stay.load()
    for y in range(fh):
        for x in range(fw):
            if lp[x, y][3]: (fp if x < px else sp_)[x, y] = lp[x, y]
    row7 = []
    for a in (35, 80, 35):
        f = Image.new('RGBA', (fw, fh)); f.alpha_composite(acc); f.alpha_composite(stay)
        f.alpha_composite(upper); f.alpha_composite(accf); f.alpha_composite(fwd.rotate(-a, resample=Image.NEAREST, center=(px, H - 1))); row7.append(f)   # the kicking leg in front of everything
    # v0.96 (Jonay): the running kick is the falling pose (row 4: arms up, one leg stretched down) turned ~90° so it
    # flies flat with the stretched leg in front
    fall = full.crop((0, 4 * fh, fw, 5 * fh))
    row8 = []
    for a, lift in ((84, 2), (94, 0)):
        bb = fall.getbbox(); cx, cy = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
        r = fall.rotate(-a, resample=Image.NEAREST, center=(cx, cy)); rb = r.getbbox()
        f = Image.new('RGBA', (fw, fh)); f.alpha_composite(r, (0, (fh - 5 - lift) - rb[3])); row8.append(f)
    rows = full.height // fh; out = Image.new('RGBA', (full.width, fh * 9)); out.paste(full.crop((0, 0, full.width, fh * min(rows, 7))), (0, 0))
    for i, f in enumerate(row7): out.paste(f, (i * fw, 7 * fh))
    for i, f in enumerate(row8): out.paste(f, (i * fw, 8 * fh))
    return out
