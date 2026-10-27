# v0.98 (Jonay): the new enemies of Guanche Guarriors in the game's row layout (0 idle, 1 walk, 2 run, 3 jump up,
# 4 jump down, 5 attack, 6 death, 7 kick, 8 running kick), each cell cropped to what the animation uses
import sys
from PIL import Image
G = sys.argv[1]; A = '/mnt/user-data/uploads/GTA La Laguna/assets_externos/'; O2 = G + '/out2/'; O3 = G + '/out3/'
def rows_of(im, fw, fh):
    out = []
    for r in range(im.height // fh):
        fr = [im.crop((c*fw, r*fh, c*fw+fw, r*fh+fh)) for c in range(im.width // fw)]
        while fr and not fr[-1].getbbox(): fr.pop()
        out.append(fr)
    return out
def strip(path, w, h, off=0, cw=None):
    im = Image.open(path).convert('RGBA'); cw = cw or w
    return [im.crop((c*w + off, 0, c*w + off + cw, h)) for c in range(im.width // w) if im.crop((c*w + off, 0, c*w + off + cw, h)).getbbox()]
def mode_resize(f, num, den):
    """pixel art resized by num/den without blur: ×num pixel by pixel, then each den × den block to the colour most of it
    has (v0.99, Jonay: «Guayota pierde mucha calidad»: the game then draws it pixel for pixel, like the heroes)"""
    import numpy as np
    from collections import Counter
    a = np.array(f.convert('RGBA').resize((f.width * num, f.height * num), Image.NEAREST)); a[a[..., 3] < 128] = 0
    h, w = a.shape[0] // den, a.shape[1] // den; out = np.zeros((h, w, 4), np.uint8)
    for y in range(h):
        for x in range(w):
            blk = a[y * den:(y + 1) * den, x * den:(x + 1) * den].reshape(-1, 4); op = blk[blk[:, 3] > 0]
            if len(op) * 2 >= len(blk): out[y, x] = Counter(map(tuple, op)).most_common(1)[0][0]
    return Image.fromarray(out)
def build(name, src_rows, layout, scale=1.0, one=(3, 4), mode=None):
    """src_rows: list of frame lists; layout: the 9 rows as indices into src_rows; the cell cropped to the union box"""
    allf = [f for r in src_rows for f in r]; box = None
    for f in allf:
        b = f.getbbox()
        if b: box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
    x0, y0, x1, y1 = max(0, box[0] - 2), max(0, box[1] - 2), min(allf[0].width, box[2] + 2), box[3]
    fw, fh = x1 - x0, y1 - y0
    if scale != 1.0: fw2, fh2 = round(fw * scale), round(fh * scale)
    else: fw2, fh2 = fw, fh
    rowsf = [src_rows[i][:1] if r in one else src_rows[i] for r, i in enumerate(layout)]   # (the jump rows: one frame; they only stand there)
    cols = max(len(x) for x in rowsf)
    sheet = Image.new('RGBA', (fw2 * cols, fh2 * len(layout)))
    for r, fr in enumerate(rowsf):
        for c, f in enumerate(fr):
            f = f.crop((x0, y0, x1, y1))
            if mode: f = mode_resize(f, *mode).crop((0, 0, fw2, fh2))
            elif scale != 1.0: f = f.resize((fw2, fh2), Image.LANCZOS)
            sheet.alpha_composite(f, (c * fw2, r * fh2))
    sheet.save(O2 + name + '.png'); print(name, fw2, fh2, [len(x) for x in rowsf]); return fw2, fh2
info = {}
lobo = rows_of(Image.open(O3 + 'lobo.png').convert('RGBA'), 77, 53)
info['g_lobo'] = build('g_lobo', lobo, [0, 1, 1, 0, 0, 2, 3, 2, 1])
for g in (1, 2, 3):
    gr = rows_of(Image.open(O3 + 'gorgona%d.png' % g).convert('RGBA'), 128, 128)   # Idle Walk Run A1 A2 A3 Special Hurt Dead
    info['g_gorgona%d' % g] = build('g_gorgona%d' % g, gr, [0, 1, 2, 0, 0, 3, 8, 4, 5])
GX = A + 'Gollux/gollux_%s.png'
gx = [strip(GX % 'idle', 128, 128)] + [strip(GX % k, 384, 128, 104, 192) for k in ['move', 'attack_A', 'attack_B', 'healing', 'hit']]
gx[0] = [Image.new('RGBA', (192, 128)) for _ in gx[0]] and [(lambda f: (lambda c: (c.alpha_composite(f, (30, 0)), c)[1])(Image.new('RGBA', (192, 128))))(f) for f in strip(GX % 'idle', 128, 128)]
info['g_gollux'] = build('g_gollux', gx, [0, 1, 1, 0, 0, 2, 5, 3, 1])
RT = A + 'RAt/OutlinedRat/rat-%s-outline.png'
rt = [strip(RT % k, 32, 32) for k in ['idle', 'run', 'attack', 'hurt', 'death']]
info['g_rata'] = build('g_rata', rt, [0, 1, 1, 0, 0, 2, 4, 2, 1])
DO = A + 'Demon Overlord 2D Pixel Art v1.0.0/Godot/demon_overlord_%s.png'
do = [strip(DO % k, 160, 160) for k in ['idle', 'walk', 'attack', 'cast', 'hurt', 'death']]   # (v0.99, Jonay: «las animaciones se ven raro»: all 8 frames, not every other)
info['g_overlord'] = build('g_overlord', do, [0, 1, 1, 0, 0, 2, 5, 3], 5 / 8, mode=(5, 8))   # (8 rows: no running kick, a boss; v0.99: at 5/8 without blur, drawn pixel for pixel: about 1.35 × a hero)
import json; json.dump(info, open(O2 + 'nuevos.json', 'w'))
