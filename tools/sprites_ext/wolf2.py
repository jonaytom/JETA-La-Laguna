# v2 (Jonay: «está mal recortado, hay gris»): the same wolf in black, brown and white (three GIFs, same frames): the
# background is identical in the three, so the wolf is exactly where they differ; the colours are the black one's.
import sys, numpy as np
from PIL import Image, ImageSequence
blk, brn, wht, out = sys.argv[1:5]
load = lambda p: np.stack([np.array(f.convert('RGB'))[::4, ::4].astype(int) for f in ImageSequence.Iterator(Image.open(p))])
B, R, W = load(blk), load(brn), load(wht)
N = len(B); G = 105
frames = []
for i in range(N):
    m = (np.abs(B[i] - R[i]).sum(axis=2) > 12) & (np.abs(B[i] - W[i]).sum(axis=2) > 12)   # the black wolf differs from both
    m[G + 3:] = False            # the reflection on the shiny floor
    m[:, :8] = False; m[:, 120:] = False
    # keep the wolf: the biggest connected piece (8-connected) and whatever touches it; on the floor band only what
    # hangs from the body (the feet), not the reflection's specks; thin loose lines (the GIF's effects) go
    from scipy import ndimage
    lab, k = ndimage.label(m, structure=np.ones((3, 3)))
    if k:
        sizes = ndimage.sum(m, lab, range(1, k + 1)); big = 1 + int(np.argmax(sizes))
        body = lab == big; near = ndimage.binary_dilation(body, structure=np.ones((3, 3)), iterations=1)
        keep = body.copy()
        for j in range(1, k + 1):
            if j != big and sizes[j - 1] >= 3 and (near & (lab == j)).any() and (lab == j).nonzero()[0].max() < G: keep |= lab == j
        m = keep
    # thin lines (the howl's wind): eaten from their loose ends, a pixel at a time
    for _ in range(14):
        nb = ndimage.convolve(m.astype(int), np.ones((3, 3), int), mode='constant') - m
        m = m & ~(nb <= 1)
    red = (B[i][..., 0] - B[i][..., 1] > 40); red[:G - 6] = False; m &= ~red     # the howl's red bars on the floor
    a = np.dstack([B[i].astype('uint8'), (m * 255).astype('uint8')]); frames.append(Image.fromarray(a, 'RGBA'))
ANIM = {'idle': list(range(0, 6)), 'run': list(range(41, 51)), 'bite': list(range(27, 41)), 'death': list(range(53, 63)), 'howl': list(range(6, 12))}
box = None
for fr in frames:
    b = fr.getbbox()
    if b: box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
x0, y0, x1, y1 = box[0] - 1, box[1] - 1, box[2] + 1, G + 3
fw, fh = x1 - x0, y1 - y0
order = ['idle', 'run', 'bite', 'death', 'howl']
sheet = Image.new('RGBA', (fw * max(len(v) for v in ANIM.values()), fh * len(order)))
for r, k in enumerate(order):
    for c, i in enumerate(ANIM[k]): sheet.alpha_composite(frames[i].crop((x0, y0, x1, y1)), (c * fw, r * fh))
sheet.save(out); print(fw, fh)
