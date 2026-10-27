# v0.99.4 (Jonay: «el basket perfecto, aplica ya»): the layers for the basketball players made at play time from each
# player's look (src/09ec_bk_sheets.js): four male skins (their briefs taken out), the pack's tank top
# (Basketball_Shirt, its frame of the fall put back on the body), the shorts (the trousers cut above the knee, plus the
# briefs), the shoes and three hairs. The tintable layers are stored as tone indices: R = 32 + 64 × tone (0 dark → 3
# light), the outline (19,19,28) kept, so the game paints them in the colours of the look.
# Use: python3 bk_layers.py <out .js>
import sys, io, base64, json
from PIL import Image
A = '/mnt/user-data/uploads/GTA La Laguna/assets_externos/'; CP = A + 'GandalfHardcore Character Asset Pack/'
L = lambda p: Image.open(p).convert('RGBA')
OUTL = (19, 19, 28); BRIEFS = [(41,55,87),(74,96,130),(105,133,160),(148,175,192)]
lum = lambda c: c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11
def to_index(im, tones=None):   # each colour to its tone (rank of brightness among the layer's colours, in 4 groups)
    px = im.load(); cols = sorted({px[x, y][:3] for y in range(im.height) for x in range(im.width) if px[x, y][3] > 127 and px[x, y][:3] != OUTL}, key=lum)
    out = Image.new('RGBA', im.size); op = out.load()
    for y in range(im.height):
        for x in range(im.width):
            q = px[x, y]
            if q[3] <= 127: continue
            if q[:3] == OUTL: op[x, y] = OUTL + (255,); continue
            t = tones[q[:3]] if tones else min(3, cols.index(q[:3]) * 4 // len(cols)); v = 32 + 64 * t; op[x, y] = (v, v, v, 255)
    return out
def b64(im):
    b = io.BytesIO(); im.save(b, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
D = {'skins': {}, 'hair': {}}
sk3 = L(CP + 'Character skin colors/Male Skin3.png'); briefs = Image.new('RGBA', sk3.size)
for name in ['Male Skin1', 'Male Skin2', 'Male Skin3', 'Male Skin5']:
    s = L(CP + 'Character skin colors/%s.png' % name); px = s.load(); bp = briefs.load(); skin = {}
    for y in range(s.height):
        for x in range(s.width):
            q = px[x, y]
            if q[3] and q[:3] in BRIEFS: bp[x, y] = q; px[x, y] = (0, 0, 0, 0)
            elif q[3] and q[:3] != OUTL and lum(q) > 60: skin[q[:3]] = skin.get(q[:3], 0) + 1
    main = max(skin, key=skin.get)
    D['skins'][name] = {'src': b64(s), 'col': list(main)}
# the shorts: from the waist to above the knee (55 % of the trousers' height), plus the briefs
PA = L(CP + 'Male Clothing/Pants.png'); sh = Image.new('RGBA', PA.size); pp = PA.load(); op = sh.load()
for r in range(PA.height // 64):
    for c in range(PA.width // 80):
        box = PA.crop((c*80, r*64, c*80+80, r*64+64)).getbbox()
        if not box: continue
        cut = box[1] + max(6, round((box[3] - box[1]) * 0.55))
        for y in range(box[1], min(cut, box[3])):
            for x in range(c*80, c*80+80):
                if pp[x, r*64+y][3]: op[x, r*64+y] = pp[x, r*64+y]
shorts = briefs.copy(); shorts.alpha_composite(sh)
D['shorts'] = b64(to_index(shorts))
BS = L(CP + 'Male Clothing/Basketball_Shirt.png')
fr = BS.crop((80, 4*64, 160, 5*64)); BS.paste(Image.new('RGBA', (80, 64)), (80, 4*64)); BS.alpha_composite(fr, (81, 4*64))   # (1 px off its body in the pack)
D['shirt'] = b64(to_index(BS, {(97,75,68): 0, (163,137,130): 1, (191,176,168): 2, (229,218,209): 3}))
D['shoes'] = b64(L(CP + 'Male Clothing/Shoes.png'))
for k, n in [('short', 21), ('afro', 23), ('beard', 10)]:
    D['hair'][k] = b64(to_index(L(A + 'GandalfHardcore 58x Hair/28x Male Hair/Male Hair%d.png' % n)))
js = ('// ============ BK_DATA (v0.99.4): the layers of the basketball players (GandalfHardcore pack, tank top), made by\n'
      '// tools/sprites_ext/bk_layers.py (do not edit by hand); src/09ec_bk_sheets.js builds each player from them\n'
      'const BK_DATA = ' + json.dumps(D, separators=(',', ':')).replace('/', '\\/') + ';\n')
open(sys.argv[1], 'w').write(js); print(len(js) // 1024, 'KB')
