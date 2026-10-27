import sys, json, base64, io
sys.path.insert(0, sys.argv[1]); from mk import *
O = sys.argv[1] + '/out/'; import os; os.makedirs(O, exist_ok=True)
def band(img, skin, color=(240,236,226,255), shade=(176,168,156,255), off=3):
    out = img.copy(); op = out.load(); sk = skin
    for r in range(img.height // FH):
        for c in range(img.width // FW):
            box = (c*FW, r*FH, c*FW+FW, r*FH+FH); s = sk.crop(box); sb = s.getbbox()
            if not sb: continue
            sp = s.load(); top = sb[1]
            cols = [x for x in range(FW) if any(sp[x,y][3] for y in range(top, min(FH, top+7)))]
            if not cols or max(cols)-min(cols) > 12: continue
            for x in range(min(cols), max(cols)+1):
                for dy, col in ((0, color), (1, shade)):
                    X, Y = c*FW+x, r*FH+top+off+dy
                    if op[X,Y][3] and op[X,Y][:3] != (19,19,28): op[X,Y] = col
    return out
def orb(img, stick, col=(120,230,255)):
    """a glowing orb at the top end of the staff of each frame"""
    out = img.copy(); d = ImageDraw.Draw(out)
    for r in range(img.height // FH):
        for c in range(img.width // FW):
            box = (c*FW, r*FH, c*FW+FW, r*FH+FH); f = stick.crop(box); pts = stick_pixels(f)
            if len(pts) < 4: continue
            x, y = min(pts, key=lambda p: p[1]); X, Y = c*FW+x, r*FH+y-2
            for rad, a in ((5,50),(4,90),(3,160)): d.ellipse([X-rad, Y-rad, X+rad, Y+rad], fill=col+(a,))
            d.ellipse([X-2, Y-2, X+2, Y+2], fill=(19,19,28,255)); d.ellipse([X-1.5, Y-1.5, X+1.5, Y+1.5], fill=col+(255,)); out.putpixel((X-1, Y-1), (255,255,255,255))
    return out
def recol_uw(im, ramp): return recolor(im.copy(), UW, ramp)
SK3 = L('GandalfHardcore Character Asset Pack/Character skin colors/Male Skin3.png')
SK5 = L('GandalfHardcore Character Asset Pack/Character skin colors/Male Skin5.png')
SKF = L('GandalfHardcore Character Asset Pack/Character skin colors/Female Skin4.png')
SK1 = L('GandalfHardcore Character Asset Pack/Character skin colors/Male Skin1.png')
STM = L('GandalfHardcore 35x Hand Items/Male Hand/Stick.png'); STF = L('GandalfHardcore 35x Hand Items/Female Hand/Stick.png')
H = lambda n: L('GandalfHardcore 58x Hair/28x Male Hair/Male Hair%d.png' % n)
FHr = lambda n: L('GandalfHardcore 58x Hair/30x Female Hair/Female Hair%d.png' % n)
TAM = [(60,38,22),(110,74,44),(150,108,66),(196,160,112)]       # tamarco: goat leather
res = {}
# 1) EL MAGOTE: strong, bearded, club (thicker, darker stick), leather tamarco
SKM = recolor(SK3.copy(), [(204,141,103),(185,123,103),(162,103,90),(106,65,61)], [(170,106,66),(146,88,56),(118,68,46),(74,40,30)])
# Jonay: a wooden shield and a hood (the chaperon in goat leather)
mag = with_kicks(L('GandalfHardcore Back layers s/Male Circle Shield.png'), compose([recol_uw(SKM, TAM), H(10), tint(L('GandalfHardcore 41x Hats/Male Hat/Male Hat6.png'), [(19,19,28),(70,48,30),(112,78,48),(150,108,66),(186,146,96)])]), thicken(STM, [(40,24,14),(78,48,26),(112,72,40),(150,104,62)]), kick_back=False)
res['magote'] = mag
# 2) EL MENCEY: lean, man-bun, a long vara (the salto del pastor), goatskin cape
cape = tint(L('GandalfHardcore Back layers s/Cape blue.png'), FUR[:4])
res['mencey'] = compose([cape, recol_uw(SK3, TAM), H(12), extend_stick(STM, 14, 6)])
# 3) LA MIRLADORA: long black hair, leather bikini + fringe skirt, staff with Magec's orb
bik = tint(L('GandalfHardcore 43x Female Clothing/Red bikini.png'), TAM)
sk = tint(L('GandalfHardcore 43x Female Clothing/Short Skirt.png'), TAM)
stf = extend_stick(STF, 8, 2)
res['mirla'] = orb(compose([recol_uw(SKF, TAM), bik, sk, FHr(21), stf]), stf)
# 4) BENCOMO: long black hair + white headband, tamarco, banot (long spear pole)
ben = compose([recol_uw(SK3, TAM), tint(H(27), [(19,19,28),(30,26,30),(48,40,42),(70,60,60)]), extend_stick(STM, 12, 4)])
res['bencomo'] = band(ben, SK3)
# 5) enemy: Castilian soldier (morion, red-yellow doublet, sword, round shield)
shirt = tint(L('GandalfHardcore Character Asset Pack/Male Clothing/Shirt v2.png'), [(70,14,14),(140,30,26),(190,60,40),(228,180,70)])
sold = compose([L('GandalfHardcore Back layers s/Male Circle Shield.png'), SK1, L('GandalfHardcore Character Asset Pack/Male Clothing/Pants.png'), shirt, L('GandalfHardcore Character Asset Pack/Male Clothing/Boots.png'), H(8), L('GandalfHardcore 41x Hats/Male Hat/Guard Helmet.png'), L('GandalfHardcore 35x Hand Items/Male Hand/Iron Sword.png')])
res['soldado'] = sold
meta = {}
for k, im in res.items():
    im.save(O + k + '.png'); meta[k] = counts(im)
dog = L('GandalfHardcore Pet companion/GandalfHardcore doggy sheet.png'); dog.save(O + 'perro.png'); meta['perro_size'] = dog.size
json.dump(meta, open(O + 'meta.json', 'w')); print(meta)
