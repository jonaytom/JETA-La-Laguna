# Proposal (Jonay, 27-oct): female minions for Guanche Guarriors in La Mirladora's style: no top (skin and nipples), the
# dark leather loincloth under other skirts, and different helmets, weapons and shields from the packs.
import sys
G = sys.argv[1]; src = open(G + '/mirla_nat.py').read()
pre = src.split("SKIRT = lift(")[0]; sys.argv = [sys.argv[0], G]; exec(pre)
big(False)
FS = SK('Female Skin4'); FSn = topless(FS, 80, 64)
def recol_skin(im, ramp):   # the skin's four tones to another ramp (demon, zombie…), the underwear and the outline kept
    out = im.copy(); px = out.load(); src_ = [(19,19,28)]
    tones = sorted({px[x, y][:3] for y in range(out.height) for x in range(out.width) if px[x, y][3]} - set(UWC) - {(19,19,28), (255,255,255), NIP}, key=sum)
    m = {c: ramp[min(len(ramp) - 1, round(i * (len(ramp) - 1) / max(1, len(tones) - 1)))] for i, c in enumerate(tones)}
    for y in range(out.height):
        for x in range(out.width):
            q = px[x, y]
            if q[3] and q[:3] in m: px[x, y] = m[q[:3]] + (q[3],)
    return out
def long_skirt(cols):   # the purple dress cut at the waist: a long skirt
    d = L('GandalfHardcore 43x Female Clothing/Long dress purple.png'); px = d.load(); sk = L('GandalfHardcore 43x Female Clothing/Short Skirt.png')
    out = Image.new('RGBA', d.size); op = out.load(); sp = sk.load()
    for r in range(d.height // 64):
        for c in range(d.width // 80):
            ys = [y for y in range(64) for x in range(80) if sp[c*80+x, r*64+y][3]]
            if not ys: continue
            top = min(ys)
            for y in range(top, 64):
                for x in range(80):
                    q = px[c*80+x, r*64+y]
                    if q[3]: op[c*80+x, r*64+y] = q
    return tint(out, cols)
HAT = lambda n: L('GandalfHardcore 41x Hats/Male Hat/%s.png' % n)
HI = lambda n: L('GandalfHardcore 35x Hand Items/Male Hand/%s.png' % n)
SHIELD = L('GandalfHardcore Back layers s/Male Circle Shield.png')
IRON = [(19,19,28),(70,74,86),(120,126,140),(170,176,190),(220,226,236)]
BRONZE = [(19,19,28),(90,56,26),(150,100,44),(200,150,70),(236,200,120)]
LEATHER = [(19,19,28),(62,40,24),(96,64,36),(130,90,52),(160,118,72)]
RED = [(19,19,28),(90,20,20),(140,36,30),(190,64,44),(220,100,70)]
GREEN = [(19,19,28),(30,56,30),(48,86,44),(76,120,60),(110,150,80)]
DEMON = [(48,52,72),(70,76,104),(96,104,134),(130,138,166)]   # like the male minion
SKTAN = [(120,72,50),(154,92,73),(175,106,73),(200,132,96)]
HBLK = [(30,24,22),(52,40,34),(74,58,46),(96,76,60)]
HRED = [(80,26,16),(120,44,24),(160,70,36),(196,104,56)]
HWHT = [(120,120,126),(170,170,176),(210,210,216),(236,236,240)]
SK_SHORT = L('GandalfHardcore 43x Female Clothing/Short Skirt.png')
V = {}
def mk_(name, skin_ramp, skirt, hair_n, hair_cols, hat, weapon, shield, nip=None):
    body = recol_uw(FSn, TAPA)
    if skin_ramp: body = recol_skin(body, skin_ramp)
    if nip:   # (Jonay: «el color del pezón debe resaltar un poco más sobre la piel»): a colour that stands out on each skin
        bp_ = body.load()
        for y in range(body.height):
            for x in range(body.width):
                if bp_[x, y][3] and bp_[x, y][:3] == NIP: bp_[x, y] = nip + (255,)
    layers = [body, skirt, hair(FHr(hair_n), hair_cols)] + ([hat] if hat is not None else [])
    V[name] = with_kicks(shield, compose(layers), weapon, kick_back=False)
# v0.99.1 (Jonay: «todas las secuaces deben tener color de piel raro: azules, verdes, rojos, amarillos»)
SKRED = [(104,28,30),(146,42,40),(184,62,52),(214,96,80)]
SKGRN = [(36,86,48),(54,116,62),(78,148,78),(110,178,98)]
SKYEL = [(146,112,26),(186,150,38),(220,188,60),(240,218,112)]
SKPUR = [(78,48,108),(104,68,138),(134,94,168),(166,128,198)]
mk_('h_espada', SKRED, tint(SK_SHORT, RED), 6, HBLK, tint(HAT('Guard Helmet'), IRON), tint(HI('Iron Sword'), IRON), tint(SHIELD, BRONZE), (70, 14, 44))
mk_('h_hacha', SKGRN, long_skirt(LEATHER), 11, HRED, tint(HAT('Viking Helmet with horns'), [(19,19,28),(60,60,66),(110,110,120),(170,170,180),(226,206,170)]), tint(HI('Iron Axe'), IRON), None, (226, 84, 128))
mk_('h_demonia', DEMON, tint(SK_SHORT, GREEN), 16, HWHT, tint(HAT('Male Hat6'), BRONZE), thicken(STM, DARKWOOD), tint(SHIELD, LEATHER), (232, 100, 150))
mk_('h_oro', SKYEL, long_skirt(RED), 26, HBLK, tint(HAT('Male Hat3'), BRONZE), tint(HI('Golden Sword'), BRONZE), None, (200, 60, 50))
mk_('h_leñadora', SKPUR, tint(SK_SHORT, LEATHER), 31, HAIRN, tint(HAT('Male Hat9'), LEATHER), tint(HI('Wooden Axe'), LEATHER), tint(SHIELD, IRON), (244, 130, 186))
for k, im in V.items(): im.save(O + k + '.png')
# a preview: idle, walk 2, attack 3, jump down, death 9 of each
prev = Image.new('RGBA', (80 * 6 * 3, 64 * len(V) * 3), (58, 50, 44, 255))
for i, (k, im) in enumerate(V.items()):
    for j, (r, c) in enumerate([(0, 0), (1, 2), (5, 2), (4, 0), (8, 0), (6, 9)]):
        f = im.crop((c * 80, r * 64, c * 80 + 80, r * 64 + 64)).resize((240, 192), Image.NEAREST); prev.alpha_composite(f, (j * 240, i * 192))
prev.save(G + '/../hembras_prev.png'); print('ok', list(V))
