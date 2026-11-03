"""Variantes de La Mirladora para elegir (v1.1.0; Jonay, 3-nov: «saca versiones de la Mirladora con distintos colores de
pezón y mejillas y de pelo para ver cuál queda mejor; saca también las distintas faldas posibles y cómo quedarían en
salto y en caída»). Monta a La Mirladora como `mirla_nat.py` (sin bikini) cambiando una cosa cada vez y saca una hoja con
tres fotogramas de cada variante (parada, subiendo en el salto y cayendo): tests/shots/mirla_variantes.png
Uso: python tools/sprites_ext/mirla_variantes.py <carpeta sprites_ext> [carpeta de los packs]
"""
import sys, os
G = sys.argv[1]; ASSETS = sys.argv[2] if len(sys.argv) > 2 else r'E:\Claude\GTA La Laguna\assets_externos' + os.sep
sys.path.insert(0, G)
import mk; mk.A = ASSETS if ASSETS.endswith(os.sep) or ASSETS.endswith('/') else ASSETS + os.sep
NAT = open(os.path.join(G, 'mirla_nat.py'), encoding='utf-8').read()  # (not «src»: mirla_nat's own code uses that name)
pre = NAT.split("SKFn = topless(SKF)")[0]           # build2 up to La Mirladora + topless() (no saving)
sys.argv = [sys.argv[0], G]; exec(pre)
rest = NAT.split("SKFn = topless(SKF)")[1].split("base = with_kicks(")[0]   # hair(), HAIRN, TAPA, lift(), SKIRT
exec(rest)
from PIL import Image, ImageDraw, ImageFont
CP = 'GandalfHardcore Character Asset Pack/'

def build(nip=None, hairpal=None, skirt=None, cheeks=None, _d=True):
    global NIP
    NIP = nip or NIP0
    sk = topless(SKF)
    layers = [recol_uw(sk, TAPA)]
    if skirt is None: skirt = SK_ACT
    if skirt:
        kind, name, ramp, up = skirt
        im = tint(pad(L(name)), ramp)
        layers.append(lift(im) if up else im)
    layers.append(hair(pad(FHr(21)), hairpal or HAIRN))
    out = with_kicks(None, compose(layers), stf, 112, 80, 16, 49)
    if cheeks:
        px = out.load()
        for y in range(out.height):
            for x in range(out.width):
                q = px[x, y]
                if q[3] and q[:3] in cheeks: px[x, y] = cheeks[q[:3]] + (q[3],)
    return out

FW, FH, S = 112, 80, 3
FRAMES = [(0, 0, 'parada'), (3, 1, 'subiendo'), (4, 1, 'cayendo'), (4, 3, 'cayendo 2')]
def cells(sheet):
    out = []
    for r, c, _ in FRAMES:
        f = sheet.crop((c * FW, r * FH, c * FW + FW, r * FH + FH)); bb = f.getbbox() or (0, 0, FW, FH)
        f = f.crop((max(0, bb[0] - 4), 0, min(FW, bb[2] + 4), FH))
        out.append(f.resize((f.width * S, f.height * S), Image.NEAREST))
    return out

NIP0 = (226, 132, 136)
SHORT = 'GandalfHardcore 43x Female Clothing/Short Skirt.png'; BASIC = CP + 'Female Clothing/Skirt.png'
SK_ACT = ('corta', SHORT, TAM, True)
GROUPS = [
    ('Pezones', [('Rosa (actual)', dict(nip=NIP0)), ('Rosa palido', dict(nip=(214, 150, 140))), ('Marron claro', dict(nip=(170, 100, 80))),
                 ('Marron', dict(nip=(136, 78, 62))), ('Oscuro', dict(nip=(100, 58, 48)))]),
    ('Mejillas', [('Rojo (actual)', dict()), ('Rosa suave', dict(cheeks={(244, 93, 93): (226, 128, 118), (186, 48, 48): (196, 100, 92)})),
                  ('Melocoton', dict(cheeks={(244, 93, 93): (214, 130, 96), (186, 48, 48): (180, 104, 76)})),
                  ('Muy leve', dict(cheeks={(244, 93, 93): (196, 116, 86), (186, 48, 48): (168, 98, 76)})),
                  ('Sin colorete', dict(cheeks={(244, 93, 93): (175, 106, 73), (186, 48, 48): (154, 92, 73)}))]),
    ('Pelo', [('Rubio oscuro (actual)', dict()), ('Rubio claro', dict(hairpal=[(150, 112, 56), (204, 166, 92), (236, 206, 128), (250, 230, 166)])),
              ('Castano', dict(hairpal=[(52, 32, 18), (78, 50, 28), (104, 70, 40), (140, 98, 58)])),
              ('Negro', dict(hairpal=[(14, 10, 10), (30, 22, 20), (48, 36, 32), (72, 56, 50)])),
              ('Pelirrojo', dict(hairpal=[(92, 30, 14), (134, 52, 22), (176, 82, 36), (214, 120, 60)]))]),
    ('Faldas', [('Corta, se levanta (actual)', dict(skirt=SK_ACT)), ('Corta, sin levantar', dict(skirt=('corta', SHORT, TAM, False))),
                ('Falda del pack, se levanta', dict(skirt=('basica', BASIC, TAM, True))), ('Falda del pack, sin levantar', dict(skirt=('basica', BASIC, TAM, False))),
                ('Corta de cuero oscuro', dict(skirt=('cuero', SHORT, TAPA, True))), ('Solo taparrabos', dict(skirt=False))]),
]
try: FONT = ImageFont.truetype('arial.ttf', 18); FONTB = ImageFont.truetype('arialbd.ttf', 24)
except Exception: FONT = FONTB = ImageFont.load_default()
rows = []
for gname, vars_ in GROUPS:
    blocks = []
    for label, kw in vars_:
        cs = cells(build(**kw)); w = sum(c.width for c in cs) + 6 * (len(cs) - 1); h = max(c.height for c in cs) + 28
        b = Image.new('RGBA', (w, h), (58, 64, 52, 255)); d = ImageDraw.Draw(b); d.text((4, 4), label, fill=(255, 255, 255), font=FONT)
        x = 0
        for c in cs: b.paste(c, (x, 28), c); x += c.width + 6
        blocks.append(b)
        print('hecha', gname, label, flush=True)
    rows.append((gname, blocks))
PADX = 16; W = max(sum(b.width for b in bl) + PADX * (len(bl) + 1) for _, bl in rows); H = sum(max(b.height for b in bl) + 50 for _, bl in rows) + 20
page = Image.new('RGBA', (W, H), (30, 34, 30, 255)); d = ImageDraw.Draw(page); y = 10
for gname, bl in rows:
    d.text((PADX, y), gname + '  (fotogramas: parada · subiendo · cayendo · cayendo 2)', fill=(245, 200, 80), font=FONTB); y += 36; x = PADX
    for b in bl: page.paste(b, (x, y)); x += b.width + PADX
    y += max(b.height for b in bl) + 14
outp = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(G))), 'tests', 'shots', 'mirla_variantes.png')
page.convert('RGB').save(outp); print('guardada', outp, page.size)
