import sys, json, os, math
sys.argv = [sys.argv[0], sys.argv[1]]
G = sys.argv[1]; sys.path.insert(0, G)
from mk import *
exec(open(G + '/build.py').read().split("SK3 = L(")[0].split("O = sys.argv[1]")[1].split("\n", 1)[1])  # band(), orb(), recol_uw()
O = G + '/out2/'; os.makedirs(O, exist_ok=True)
SP = 'GandalfHardcore Special skin/'; CP = 'GandalfHardcore Character Asset Pack/'
SK = lambda n: L(CP + 'Character skin colors/%s.png' % n)
STM = L('GandalfHardcore 35x Hand Items/Male Hand/Stick.png'); STF = L('GandalfHardcore 35x Hand Items/Female Hand/Stick.png')
H = lambda n: L('GandalfHardcore 58x Hair/28x Male Hair/Male Hair%d.png' % n)
FHr = lambda n: L('GandalfHardcore 58x Hair/30x Female Hair/Female Hair%d.png' % n)
TAM = [(60,38,22),(110,74,44),(150,108,66),(196,160,112)]
DARKWOOD = [(30,20,14),(58,38,24),(86,58,36),(120,84,52)]
IRON = [(40,42,50),(84,88,98),(140,146,156),(200,206,214)]
ENDS = {}
def pole(stick, up, down, cols, bow=None, key=None, skin=None, trail_keep=True, mid=None):
    """the stick of each frame made longer (and recoloured); bow: a crossbow arc across the far end.
    In the swoosh frames of the attack (the stick hidden inside the trail) the staff keeps the line of the frame
    before, so it doesn't vanish. The ends of each line are kept in ENDS[key] for the orb."""
    ends = ENDS.setdefault(key, {}); last = [None, 0, (0, 0)]
    def fn(f, r, c):
        if c == 0: last[0] = None; last[1] = 0
        pts = stick_pixels(f); fp = f.load()
        out = [p for p in pts if fp[p][:3] in ((19,19,28),(28,26,26),(52,39,38))]
        trail = len(pts) - 2 * len(out) > 60
        if trail and last[0]:
            # the swing: the staff turns down and forward around the hands (the stub left by the pack, or the last grip)
            (a0, b0), n = last[0], last[1] + 1; L_ = math.hypot(a0[0]-b0[0], a0[1]-b0[1])
            gx, gy = last[2]
            if skin is not None:   # the hands: the skin pixel farthest forward (the pack's characters face LEFT) between the chest and the hips
                sk_ = skin.crop((c*FW, r*FH, c*FW+FW, r*FH+FH)); sb_ = sk_.getbbox(); sp_ = sk_.load()
                if sb_:
                    cand = [(x, y) for y in range(sb_[1]+9, min(FH, sb_[1]+24)) for x in range(FW) if sp_[x, y][3] and sp_[x, y][:3] != (19,19,28)]
                    if cand: gx, gy = min(cand, key=lambda q: q[0]); gx += 1
            ang = math.radians(188 if n == 1 else 152)   # the strike in front (to the left): level, then down
            k_ = 0.5 if mid is not None else 0.72; a = (gx + math.cos(ang)*L_*k_, gy + math.sin(ang)*L_*k_); b = (gx - math.cos(ang)*L_*(1-k_), gy - math.sin(ang)*L_*(1-k_))
            last[1] = n; last[0] = (a0, b0); ends[(r, c)] = (a, b); last[2] = (gx, gy)
            g = Image.new('RGBA', f.size)
            if trail_keep: g.alpha_composite(tint(f.copy(), cols))   # the trail behind, the staff on top
            d = ImageDraw.Draw(g); d.line([a, b], fill=(19,19,28,255), width=3); d.line([a, b], fill=cols[1]+(255,), width=1)
            return g
        elif len(pts) >= 4:
            mx = sum(p[0] for p in pts)/len(pts); my = sum(p[1] for p in pts)/len(pts)
            sxx = sum((p[0]-mx)**2 for p in pts); syy = sum((p[1]-my)**2 for p in pts); sxy = sum((p[0]-mx)*(p[1]-my) for p in pts)
            ang = 0.5*math.atan2(2*sxy, sxx-syy); ux, uy = math.cos(ang), math.sin(ang)
            if uy > 0: ux, uy = -ux, -uy
            proj = [(p[0]-mx)*ux + (p[1]-my)*uy for p in pts]; lo, hi = min(proj), max(proj)
            a = (mx+ux*(hi+up), my+uy*(hi+up)); b = (mx+ux*(lo-down), my+uy*(lo-down))
            if mid is not None and skin is not None:
                # Jonay (v0.94): the long pole held by the middle: as long behind the hand as in front of it
                sk_ = skin.crop((c*FW, r*FH, c*FW+FW, r*FH+FH)); sp_ = sk_.load()
                sp = [(x, y) for y in range(FH) for x in range(FW) if sp_[x, y][3] and sp_[x, y][:3] != (19,19,28)]
                A0 = (mx+ux*hi, my+uy*hi); B0 = (mx+ux*lo, my+uy*lo)
                dA = min((q[0]-A0[0])**2 + (q[1]-A0[1])**2 for q in sp) if sp else 0; dB = min((q[0]-B0[0])**2 + (q[1]-B0[1])**2 for q in sp) if sp else 1
                grip, tip = (A0, B0) if dA <= dB else (B0, A0)
                vx_, vy_ = tip[0]-grip[0], tip[1]-grip[1]; n_ = math.hypot(vx_, vy_) or 1; vx_, vy_ = vx_/n_, vy_/n_; Lh = n_ + mid
                b = (grip[0]+vx_*Lh, grip[1]+vy_*Lh); a = (grip[0]-vx_*Lh, grip[1]-vy_*Lh)
        else: return f
        last[0] = (a, b); last[1] = 0; last[2] = ((a[0]+b[0])/2, (a[1]+b[1])/2); ends[(r, c)] = (a, b)
        g = Image.new('RGBA', f.size); d = ImageDraw.Draw(g)
        d.line([a, b], fill=(19,19,28,255), width=3); d.line([a, b], fill=cols[1]+(255,), width=1)
        if bow:
            ux, uy = (b[0]-a[0]), (b[1]-a[1]); L_ = math.hypot(ux, uy) or 1; ux, uy = ux/L_, uy/L_
            far = b if bow == 'low' else a; nx, ny = -uy, ux; s_ = 1 if bow == 'low' else -1
            p1 = (far[0]+nx*5 - s_*ux*2, far[1]+ny*5 - s_*uy*2); p2 = (far[0]-nx*5 - s_*ux*2, far[1]-ny*5 - s_*uy*2)
            d.line([p1, far, p2], fill=(19,19,28,255), width=3); d.line([p1, far, p2], fill=(150,104,62,255), width=1)
        g.alpha_composite(tint(f.copy(), cols)); return g
    return frames_apply(stick, fn)
def orb_far(img, key, skin, col):
    """the orb on the end of the drawn staff that is farther from the body (so it is always stuck to the staff)"""
    out = img.copy(); d = ImageDraw.Draw(out)
    for (r, c), (a, b) in ENDS[key].items():
        if (r, c) == (5, 5): continue   # the bolt frame: the light has left the staff (only one orb on screen)
        box = (c*FW, r*FH, c*FW+FW, r*FH+FH); sb = skin.crop(box).getbbox()
        if not sb: continue
        cx, cy = (sb[0]+sb[2])/2, (sb[1]+sb[3])/2 - 4
        x, y = max((a, b), key=lambda p: (p[0]-cx)**2 + (p[1]-cy)**2); X, Y = round(c*FW+x), round(r*FH+y)
        if not (5 <= y <= FH - 6 and 5 <= x <= FW - 6): continue   # (an orb that would spill into the next cell)
        for rad, al in ((5,50),(4,90),(3,160)): d.ellipse([X-rad, Y-rad, X+rad, Y+rad], fill=col+(al,))
        d.ellipse([X-2, Y-2, X+2, Y+2], fill=(19,19,28,255)); d.ellipse([X-1.5, Y-1.5, X+1.5, Y+1.5], fill=col+(255,)); out.putpixel((X-1, Y-1), (255,255,255,255))
    return out
def cast(img, key, skin, col):
    """the magic attack: frames 4 and 5 (the strike, without the pack's brown trail): the staff pointing forward,
    the orb flashing (4) and a bolt of light leaving it forwards (5)"""
    out = img.copy(); r = 5; d = ImageDraw.Draw(out)
    for c, mode in ((4, 'flash'), (5, 'bolt')):
        a, b = ENDS[key][(r, c)]; tip, oth = a, b   # a = the far end (the 0.72 side) in the strike frames
        ux, uy = tip[0]-oth[0], tip[1]-oth[1]; n = math.hypot(ux, uy) or 1; ux, uy = ux/n, uy/n
        X, Y = c*FW + tip[0], r*FH + tip[1]
        if mode == 'flash':
            for rad, al in ((9,40),(7,70),(5,120)): d.ellipse([X-rad, Y-rad, X+rad, Y+rad], fill=col+(al,))
            for k in range(8):
                an = k * math.pi / 4; d.line([(X+math.cos(an)*6, Y+math.sin(an)*6), (X+math.cos(an)*9, Y+math.sin(an)*9)], fill=(255,255,255,220))
            d.ellipse([X-2, Y-2, X+2, Y+2], fill=(255,255,255,255))
        else:
            BX, BY = X + ux*11, Y + uy*11
            d.line([(X+ux*4, Y+uy*4), (BX, BY)], fill=col+(110,), width=3)
            for rad, al in ((4,90),(3,170)): d.ellipse([BX-rad, BY-rad, BX+rad, BY+rad], fill=col+(al,))
            d.ellipse([BX-1.5, BY-1.5, BX+1.5, BY+1.5], fill=(255,255,255,255))
    return out
def eyes(img, skin, col):  # paint the eye pixels (the near-white ones of the face) in a colour
    out = img.copy(); op = out.load(); sp = skin.load()
    for y in range(img.height):
        for x in range(img.width):
            if sp[x,y][3] and sp[x,y][:3] == (255,255,255) and op[x,y][:3] == (255,255,255): op[x,y] = col + (255,)
    return out
res, meta = {}, {}
def save(k, im, fw=80, fh=64, rows=None, scale=3):
    im.save(O + k + '.png'); meta[k] = {'fw': fw, 'fh': fh, 'n': [0]*0, 'scale': scale, 'rows': rows}
    global FW, FH
    meta[k]['n'] = counts_fw(im, fw, fh)
def counts_fw(im, fw, fh):
    rows = []
    for r in range(im.height // fh):
        n = 0
        for c in range(im.width // fw):
            if im.crop((c*fw, r*fh, c*fw+fw, r*fh+fh)).getbbox(): n = c + 1
        rows.append(n)
    return rows
import mk
def pad(im, px_=16, top=16):
    W_, H_ = 80 + 2*px_, 64 + top; out = Image.new('RGBA', ((im.width//80)*W_, (im.height//64)*H_))
    for r in range(im.height//64):
        for c in range(im.width//80): out.paste(im.crop((c*80, r*64, c*80+80, r*64+64)), (c*W_+px_, r*H_+top))
    return out
def big(on):
    global FW, FH
    FW, FH = (112, 80) if on else (80, 64); mk.FW, mk.FH = FW, FH
# ---------- La Mirladora v2: light brown hair, orb at the far end of the staff
big(True); P_ = pad; SKF = pad(SK('Female Skin4')); STFp = pad(STF)
stf = pole(STFp, 8, 2, DARKWOOD, key='mirla', skin=SKF, trail_keep=False)
HAIRL = [(19,19,28),(92,60,32),(146,104,56),(192,148,86),(222,186,118),(240,212,150)]
base = with_kicks(None, compose([recol_uw(SKF, TAM), tint(pad(L('GandalfHardcore 43x Female Clothing/Red bikini.png')), TAM), tint(pad(L('GandalfHardcore 43x Female Clothing/Short Skirt.png')), TAM), tint(pad(FHr(21)), HAIRL)]), stf, 112, 80, 16, 49)
save('mirla2', cast(orb_far(base, 'mirla', SKF, (120,230,255)), 'mirla', SKF, (120,230,255)), 112, 80); big(False)
SK3m = SK('Male Skin3')
cape = tint(L('GandalfHardcore Back layers s/Cape blue.png'), FUR[:4])
save('mencey', with_kicks(cape, compose([recol_uw(SK3m, TAM), H(12)]), pole(STM, 14, 6, [(30,20,14),(92,58,34),(120,84,52),(150,104,62)], key='mencey', skin=SK3m, mid=5)))
ben = compose([recol_uw(SK3m, TAM), tint(H(27), [(19,19,28),(30,26,30),(48,40,42),(70,60,60)]), pole(STM, 12, 4, [(30,20,14),(92,58,34),(120,84,52),(150,104,62)], key='bencomo', skin=SK3m, mid=4)])
save('bencomo', band(ben, SK3m))
# Bencomo without the pole: for vaulting and the pogo, where the game draws the planted pole itself
save('bencomo_ns', band(compose([recol_uw(SK3m, TAM), tint(H(27), [(19,19,28),(30,26,30),(48,40,42),(70,60,60)])]), SK3m))
# ---------- Guanche Guarriors enemies
dem = tint(L(SP + 'Male Demon skin.png'), [(19,19,28),(48,52,72),(70,76,104),(96,104,134),(130,138,166)])
save('g_secuaz', with_kicks(None, dem, thicken(STM, DARKWOOD)))
horn = tint(L('GandalfHardcore 41x Hats/Male Hat/Viking Helmet with horns.png'), [(19,19,28),(60,52,48),(120,110,96),(214,204,180),(236,230,214)])
save('g_escudo', with_kicks(L('GandalfHardcore Back layers s/Male Circle Shield.png'), compose([dem, horn]), thicken(STM, DARKWOOD)))
orc = tint(L(SP + 'Male Orc skin.png'), [(19,19,28),(70,44,34),(110,74,58),(146,104,80),(178,134,104)])
save('g_giganton', with_kicks(None, compose([orc, tint(L(CP + 'Male Clothing/Pants.png'), TAM), horn]), thicken(thicken(STM, DARKWOOD), DARKWOOD)), scale=4)
big(True); witch = with_kicks(None, compose([tint(pad(SK('Female Skin2')), [(19,19,28),(120,130,110),(170,180,156),(200,212,186),(222,230,210)]), tint(pad(L('GandalfHardcore 43x Female Clothing/Long dress purple.png')), [(19,19,28),(26,22,34),(44,38,58),(70,62,90)]), tint(pad(FHr(21)), [(19,19,28),(150,150,156),(200,200,206),(232,232,236)])]), pole(pad(STF), 10, 2, DARKWOOD, key='bruja', skin=pad(SK('Female Skin2')), trail_keep=False), 112, 80, 16, 49)
save('g_bruja', cast(orb_far(witch, 'bruja', pad(SK('Female Skin2')), (90,255,106)), 'bruja', pad(SK('Female Skin2')), (90,255,106)), 112, 80); big(False)
zom = L(SP + 'Male Zombie skin.png')
def gnome(im):
    """Jonay: the thief duende short: 7 rows of the legs and 2 of the belly out (v0.94: no pot belly)"""
    out = Image.new('RGBA', im.size)
    for r in range(im.height // 64):
        for c in range(im.width // 80):
            f = im.crop((c*80, r*64, c*80+80, r*64+64))
            if not f.getbbox(): continue
            if r == 6 and c >= 4: out.paste(f, (c*80, r*64)); continue   # lying on the floor: as it is
            g = Image.new('RGBA', (80, 64)); y2 = 63
            for y in range(63, -1, -1):
                if y in (42, 45, 52, 53, 54, 56, 57, 58, 60): continue
                g.paste(f.crop((0, y, 80, y + 1)), (0, y2)); y2 -= 1
            out.paste(g, (c*80, r*64))
    return out
sack = L('GandalfHardcore Back layers s/Backpack.png')   # the sack with the potions on its back
save('g_duende', gnome(compose([sack, zom, tint(L(CP + 'Male Clothing/Pants.png'), TAM), L('GandalfHardcore 41x Hats/Male Hat/Male Santa hat.png')])), scale=2)
# the duendes with blue potions wear a blue cap (Jonay); the red ones carry the food
santa = L('GandalfHardcore 41x Hats/Male Hat/Male Santa hat.png'); spx = santa.load()
for y in range(santa.height):
    for x in range(santa.width):
        r_, g_, b_, a_ = spx[x, y]
        if a_ and r_ > g_ + 40 and r_ > b_ + 40: spx[x, y] = (int(r_ * 0.25), int(r_ * 0.45), min(255, int(r_ * 1.05)), a_)
save('g_duende_azul', gnome(compose([sack, zom, tint(L(CP + 'Male Clothing/Pants.png'), TAM), santa])), scale=2)   # Jonay: a Father Christmas cap
dev = L(SP + 'Male Devil skin.png')
save('g_guayota', with_kicks(None, compose([dev, tint(L(CP + 'Male Clothing/Pants.png'), [(19,19,28),(30,10,6),(60,20,10),(255,106,26)]), tint(L('GandalfHardcore 41x Hats/Male Hat/Viking Helmet with horns.png'), [(19,19,28),(40,8,6),(80,16,10),(130,30,16),(226,206,170)])]), tint(L('GandalfHardcore 35x Hand Items/Male Hand/Iron Axe.png'), [(19,19,28),(40,14,12),(90,30,16),(220,100,30),(255,190,90)])), scale=5)   # Jonay: an axe (obsidian with a lava edge)
dog = L('GandalfHardcore Pet companion/GandalfHardcore doggy sheet.png')
tib = tint(dog.copy(), [(10,10,14),(24,22,28),(38,34,42),(56,50,60),(76,68,80)])
# red eyes: the darkest pixel of the dog's head row in the original sheet is the eye; take the original eye colour
save('g_tibicena', tib, 32, 32, None, 4)
# the Evil Wizard 3 (CC0) as La Bruja de Anaga (boss): robe from red to purple-black, one sheet with all the rows
EW = 'Evil Wizard 3/Sprites/'
parts = ['Idle', 'Walk', 'Run', 'Get hit', 'Run', 'Attack', 'Death']
ims = [L(EW + p + '.png') for p in parts]; W = max(i.width for i in ims)
sheet = Image.new('RGBA', (W, 140 * len(ims)))
for i, im in enumerate(ims): sheet.paste(im, (0, 140 * i))
px = sheet.load()
for y in range(sheet.height):
    for x in range(sheet.width):
        r, g, b, a = px[x, y]
        if a and r > g + 40 and r > b + 30: px[x, y] = (int(r*0.45), int(r*0.2), int(r*0.6), a)
def outline(im):
    a = im.getchannel('A'); px = a.load(); out = im.copy(); op = out.load(); W_, H_ = im.size
    for y in range(H_):
        for x in range(W_):
            if px[x, y] == 0 and any(0 <= x+dx < W_ and 0 <= y+dy < H_ and px[x+dx, y+dy] > 100 for dx, dy in ((1,0),(-1,0),(0,1),(0,-1))): op[x, y] = (19,19,28,255)
    return out
bbs = [sheet.crop((c*140, r*140, c*140+140, r*140+140)).getbbox() for r in range(len(parts)) for c in range(W // 140)]
bbs = [b for b in bbs if b]; u = (min(b[0] for b in bbs)-2, min(b[1] for b in bbs)-2, max(b[2] for b in bbs)+2, max(b[3] for b in bbs)+2)
fw_, fh_ = u[2]-u[0], u[3]-u[1]; sh2 = Image.new('RGBA', ((W // 140) * fw_, len(parts) * fh_))
for r in range(len(parts)):
    for c in range(W // 140): sh2.paste(outline(sheet.crop((c*140+u[0], r*140+u[1], c*140+u[2], r*140+u[3]))), (c*fw_, r*fh_))
save('g_brujamayor', sh2, fw_, fh_, None, 4)
# ---------- Bencomo enemies
SK1 = SK('Male Skin1'); SK2 = SK('Male Skin2')
helm = L('GandalfHardcore 41x Hats/Male Hat/Guard Helmet.png')
boots = L(CP + 'Male Clothing/Boots.png'); pants = L(CP + 'Male Clothing/Pants.png')
ballshirt = tint(L(CP + 'Male Clothing/Shirt v2.png'), [(20,40,20),(40,80,40),(70,120,60),(220,190,90)])
save('b_ballestero', compose([SK2, pants, ballshirt, boots, H(14), helm, pole(STM, 2, 2, DARKWOOD, bow='high')]))
arcshirt = tint(L(CP + 'Male Clothing/Shirt v2.png'), [(20,20,40),(40,44,80),(70,80,130),(220,190,90)])
save('b_arcabucero', compose([SK1, pants, arcshirt, boots, H(10), helm, pole(STM, 12, 2, IRON)]))
steel = tint(L(CP + 'Male Clothing/Shirt v2.png'), IRON)
save('b_capitan', compose([L('GandalfHardcore Back layers s/Cape red.png'), SK2, tint(pants, [(19,19,28),(80,14,14),(140,30,26),(190,60,40)]), steel, boots, H(8), helm, L('GandalfHardcore 35x Hand Items/Male Hand/Iron Sword.png')]))
gold = tint(L(CP + 'Male Clothing/Shirt v2.png'), [(60,40,10),(140,100,30),(210,170,60),(250,226,140)])
save('b_lugo', compose([L('GandalfHardcore Back layers s/Cape red.png'), SK1, tint(pants, [(19,19,28),(80,14,14),(140,30,26),(190,60,40)]), gold, boots, H(29), tint(helm.copy(), [(19,19,28),(140,100,30),(210,170,60),(250,226,140)]), L('GandalfHardcore 35x Hand Items/Male Hand/Golden Sword.png')]))
alano = tint(dog.copy(), [(19,19,28),(90,58,30),(150,104,58),(200,160,110),(236,222,200)])
save('b_perro', alano, 32, 32, None, 4)
json.dump(meta, open(O + 'meta.json', 'w')); print(json.dumps(meta))
