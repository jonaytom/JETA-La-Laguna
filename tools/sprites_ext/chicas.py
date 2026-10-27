# Proposal (Jonay, 27-oct: «Female Skin3_new.png es el skin base sobre el que debemos hacer a las chicas»): every female
# character rebuilt from 0 on Jonay's new base (already without top and briefs), keeping the colours of skin and hair,
# clothes, objects and weapons each one had: La Mirladora, the witch and the five female minions. Not in the game yet.
# Use: python3 chicas.py <gen folder>   → out2/n_*.png
import sys
G = sys.argv[1]; src = open(G + '/mirla_nat.py').read()
pre = src.split("SKIRT = lift(")[0]; sys.argv = [sys.argv[0], G]; exec(pre)
B3 = L('GandalfHardcore Character Asset Pack/Character skin colors/Female Skin3_new.png')
OUTL = (19, 19, 28); REDS = {(244, 93, 93): 0, (186, 48, 48): 1}
UWS = {(41, 55, 87), (74, 96, 130), (105, 133, 160), (148, 175, 192)}
MAIN = [(106, 65, 61), (162, 103, 90), (185, 123, 103), (204, 141, 103)]   # the base's four skin tones, dark → light
lum = lambda c: c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11
def skinlike(c): return c[0] >= c[1] >= c[2] - 12 and c[0] - c[2] >= 20 and c[0] > 80 and lum(c) < 200
def base3(ramp, nip):
    """the new base in the skin ramp (4 tones, dark → light): each skin pixel to the main tone nearest in brightness;
    the leftovers of the briefs as plain skin. The reds (much redder than any skin tone): on each frame the top ones are
    the face (cheeks, mouth: kept); the rest are the nipples: their core in ONE colour (nip), their reddish rim in skin
    (v0.99.3, Jonay: «tienen pezones de distinto color… son color rosa»: the base draws each nipple in other reds)"""
    out = B3.copy(); px = out.load(); ML = [lum(c) for c in MAIN]
    red = lambda k: k[0] - k[1] >= 75 and k[0] > 120
    for r in range(out.height // 64):
        for c in range(out.width // 80):
            reds = [(x, y) for y in range(64) for x in range(80) if px[c*80+x, r*64+y][3] and red(px[c*80+x, r*64+y][:3])]
            ytop = min((y for _, y in reds), default=0)
            for (x, y) in reds:
                q = px[c*80+x, r*64+y]
                if y > ytop + 5: px[c*80+x, r*64+y] = (nip if q[0] - q[1] >= 120 else ramp[3]) + (255,)
            for y in range(64):
                for x in range(80):
                    q = px[c*80+x, r*64+y]
                    if not q[3]: continue
                    k = q[:3]
                    if (x, y) in reds_set(reds): continue
                    if k in UWS: px[c*80+x, r*64+y] = ramp[2 if k in ((148, 175, 192), (105, 133, 160)) else 1] + (q[3],)
                    elif k != OUTL and skinlike(k):
                        i = min(range(4), key=lambda j: abs(ML[j] - lum(k))); px[c*80+x, r*64+y] = ramp[i] + (q[3],)
    return out
_rs = {}
def reds_set(reds):
    key = id(reds)
    if _rs.get('k') != key: _rs['k'] = key; _rs['s'] = set(reds)
    return _rs['s']
dark = lambda c, f=0.78: tuple(int(v * f) for v in c)
OUT_N = {}
# ---------- La Mirladora: her skin of before (Female Skin4's tones), pink nipples, the skirt that flies up, chestnut→blond hair
SK4 = [(83, 56, 51), (135, 85, 72), (154, 92, 73), (175, 106, 73)]
big(True)
SKFm = pad(base3(SK4, (244, 93, 93)))   # (Jonay: the nipples the same pink as the mouth)
SKIRT = lift(tint(pad(L('GandalfHardcore 43x Female Clothing/Short Skirt.png')), TAM))
mb = with_kicks(None, compose([SKFm, SKIRT, hair(pad(FHr(21)), HAIRN)]), stf, 112, 80, 16, 49)
OUT_N['n_mirla'] = (cast(orb_far(mb, 'mirla', SKF, (120, 230, 255)), 'mirla', SKF, (120, 230, 255)), 112, 80)
# ---------- the witch: her pale green skin, purple dress, grey hair, the staff with the green orb
WR = [(120, 130, 110), (170, 180, 156), (200, 212, 186), (222, 230, 210)]
SK2 = pad(SK('Female Skin2'))
wb = with_kicks(None, compose([pad(base3(WR, (255, 104, 160))), tint(pad(L('GandalfHardcore 43x Female Clothing/Long dress purple.png')), [(19,19,28),(26,22,34),(44,38,58),(70,62,90)]), tint(pad(FHr(21)), [(19,19,28),(150,150,156),(200,200,206),(232,232,236)])]), pole(pad(STF), 10, 2, DARKWOOD, key='bruja', skin=SK2, trail_keep=False), 112, 80, 16, 49)
OUT_N['n_bruja'] = (cast(orb_far(wb, 'bruja', SK2, (90, 255, 106)), 'bruja', SK2, (90, 255, 106)), 112, 80)
big(False)
# ---------- the five female minions: coloured skins (Jonay: «no color normal»), helmets, weapons, shields, skirts
hsrc = open(G + '/hembras.py').read()
hdefs = hsrc.split("def recol_skin(")[1].split("V = {}")[0]
exec("def recol_skin(" + hdefs)
SKRED = [(104,28,30),(146,42,40),(184,62,52),(214,96,80)]
SKGRN = [(44,100,56),(54,116,62),(78,148,78),(110,178,98)]
SKYEL = [(180,144,40),(200,164,48),(224,192,64),(242,220,116)]
SKPUR = [(78,48,108),(104,68,138),(134,94,168),(166,128,198)]
PINK = (255, 104, 160)   # (Jonay: «su color de pezón es distinto uno de otro, debería ser más vivo, tendiendo al rosa»): the same for all
_ls = long_skirt
def long_skirt(cols):   # (Jonay: «tienen ropa interior»): the dress's see-through pixels (half alpha) over the thighs read as briefs: out
    im = _ls(cols); a = im.split()[3].point(lambda v: 255 if v >= 200 else 0); im.putalpha(a)
    # and in the fall of the jump (row 4) the long skirt flies up: only its top band stays, the thighs show (no briefs)
    px_ = im.load()
    for c_ in range(im.width // 80):
        box = im.crop((c_*80, 4*64, c_*80+80, 5*64)).getbbox()
        if not box: continue
        for y in range(box[1] + 4, box[3]):
            for x in range(80): px_[c_*80+x, 4*64+y] = (0, 0, 0, 0)
    return im
import numpy as np
def fit_offsets():
    """(Jonay: «en la caída del salto las armas están muy arriba, fuera de la mano»): the hats, weapons and shields are
    the male ones, drawn for the male body; the new female base is shorter and its arms go elsewhere. Per frame, the
    shift that best lays the male body's upper part (arms, head) on the female one"""
    m = np.array(SK('Male Skin3'))[..., 3] > 128; f = np.array(B3)[..., 3] > 128; off = {}
    for r in range(m.shape[0] // 64):
        for c in range(m.shape[1] // 80):
            a = m[r*64:(r+1)*64, c*80:(c+1)*80]; b = f[r*64:(r+1)*64, c*80:(c+1)*80]
            if not a.any() or not b.any(): continue
            def top(x):
                ys = np.where(x.any(1))[0]; y = x.copy(); y[ys.min() + int((ys.max() - ys.min()) * 0.45):] = False; return y
            A, B = top(a), top(b)
            off[(r, c)] = max(((np.logical_and(np.roll(np.roll(A, dy, 0), dx, 1), B).sum(), dx, dy) for dx in range(-4, 5) for dy in range(-4, 5)))[1:]
    return off
OFF = fit_offsets()
def onto_female(im):   # a male layer moved frame by frame onto the female body
    if im is None: return None
    out = Image.new('RGBA', im.size)
    for (r, c), (dx, dy) in OFF.items():
        out.alpha_composite(im.crop((c*80, r*64, c*80+80, r*64+64)), (c*80 + dx, r*64 + dy))
    return out
def hem(name, ramp, nip, skirt, hair_n, hair_cols, hat, weapon, shield):
    layers = [base3(ramp, nip), skirt, hair(FHr(hair_n), hair_cols)] + ([onto_female(hat)] if hat is not None else [])
    OUT_N[name] = (with_kicks(onto_female(shield), compose(layers), onto_female(weapon)), 80, 64)
hem('n_roja', SKRED, PINK, tint(SK_SHORT, RED), 6, HBLK, tint(HAT('Guard Helmet'), IRON), tint(HI('Iron Sword'), IRON), tint(SHIELD, BRONZE))
hem('n_vikinga', SKGRN, PINK, long_skirt(LEATHER), 11, HRED, tint(HAT('Viking Helmet with horns'), [(19,19,28),(60,60,66),(110,110,120),(170,170,180),(226,206,170)]), tint(HI('Iron Axe'), IRON), None)
hem('n_demonia', DEMON, PINK, tint(SK_SHORT, GREEN), 16, HWHT, tint(HAT('Male Hat6'), BRONZE), thicken(STM, DARKWOOD), tint(SHIELD, LEATHER))
hem('n_oro', SKYEL, PINK, long_skirt(RED), 26, HBLK, tint(HAT('Male Hat3'), BRONZE), tint(HI('Golden Sword'), BRONZE), None)
hem('n_lenadora', SKPUR, PINK, tint(SK_SHORT, LEATHER), 31, HAIRN, tint(HAT('Male Hat9'), LEATHER), tint(HI('Wooden Axe'), LEATHER), tint(SHIELD, IRON))
for k, (im, fw, fh) in OUT_N.items(): im.save(O + k + '.png')
print('ok', list(OUT_N))
