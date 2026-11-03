"""La Mirladora con el pezón oscuro y la falda corta de cuero oscuro (v1.1.3; Jonay, 3-nov: «la chica me gusta pezón
oscuro, mejillas y pelo no los cambies… falda de cuero oscuro»). Retoca directamente las hojas ya montadas dentro de
src/09jy_sprx_data.js (claves 'mirla' y 'lz_mirla'), sin necesitar los packs: los rojos de cada fotograma por debajo de la
boca (más de 5 px) son los pezones → (100, 58, 48); los cuatro tonos dorados de la falda (TAM) → cuero oscuro (TAPA).
Uso: python tools/sprites_ext/mirla_retoque.py [src/09jy_sprx_data.js]
"""
import sys, os, re, io, json, base64
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'src', '09jy_sprx_data.js')
NIP = (100, 58, 48)
TAM = [(60, 38, 22), (110, 74, 44), (150, 108, 66), (196, 160, 112)]
TAPA = [(40, 26, 16), (62, 40, 24), (84, 56, 34), (104, 70, 42)]
SKIRT = dict(zip(TAM, TAPA))
red = lambda k: k[0] - k[1] >= 75 and k[0] > 120
def fix(im, fw, fh):
    px = im.load(); nn = ns = 0
    for r in range(im.height // fh):
        for c in range(im.width // fw):
            reds = [(x, y) for y in range(fh) for x in range(fw) if px[c*fw+x, r*fh+y][3] and red(px[c*fw+x, r*fh+y][:3])]
            if reds:
                ytop = min(y for _, y in reds)
                for x, y in reds:
                    if y > ytop + 5: q = px[c*fw+x, r*fh+y]; px[c*fw+x, r*fh+y] = NIP + (q[3],); nn += 1
            for y in range(fh):
                for x in range(fw):
                    q = px[c*fw+x, r*fh+y]
                    if q[3] and q[:3] in SKIRT: px[c*fw+x, r*fh+y] = SKIRT[q[:3]] + (q[3],); ns += 1
    return nn, ns
s = open(P, encoding='utf-8').read()
for key in ('mirla', 'lz_mirla'):
    m = re.search(r'^  %s: Object\.assign\((\{.*?\}), \{ src: "data:image/png;base64,([^"]+)" \}\),$' % key, s, re.M)
    if not m: raise SystemExit('no encuentro ' + key)
    meta = json.loads(m.group(1)); im = Image.open(io.BytesIO(base64.b64decode(m.group(2)))).convert('RGBA')
    nn, ns = fix(im, meta['fw'], meta['fh'])
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); new = base64.b64encode(b.getvalue()).decode()
    s = s[:m.start(2)] + new + s[m.end(2):]
    im.save(os.path.join(ROOT, 'tests', 'shots', 'retoque_' + key + '.png'))
    print(key, 'pezones', nn, 'px · falda', ns, 'px')
open(P, 'w', encoding='utf-8').write(s); print('MIRLA RETOQUE OK')
