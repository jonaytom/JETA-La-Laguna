# Jonay (27-oct): the wolf of the GIF for the dogs: frames taken out of the preview (×4, static background with a
# soft light, a shiny floor with the reflection): background known per pixel from the frames where the wolf is
# elsewhere; where it never moves, by colour (the wolf's palette is near-black); the reflection below the floor goes.
import sys, numpy as np
from PIL import Image, ImageSequence
from collections import Counter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src); F = np.stack([np.array(f.convert('RGB'))[::4, ::4].astype(int) for f in ImageSequence.Iterator(im)])
K = F[..., 0] * 65536 + F[..., 1] * 256 + F[..., 2]; N = len(F)
# background palette: frames with the wolf lying low (rows above it) + the first frame's sky
bgc = set()
for i in range(N - 7, N):
    bgc |= set(K[i, 8:96, 8:120].ravel().tolist())
bgc |= set(K[0, 8:55, 8:120].ravel().tolist())
FLOOR = {c[0]*65536+c[1]*256+c[2] for c in [(19,19,19),(20,20,20),(22,22,22),(24,24,24),(26,26,26),(16,16,16)]}
# static background where it is ever seen: the most common value of each pixel over all frames, if that value is
# also the one shown when the wolf's (rough) box is elsewhere
G = 105   # the floor line
frames = []
for i in range(N):
    k = K[i]; m = np.zeros((128, 128), bool)
    for y in range(40, G + 5):
        for x in range(10, 120):
            c = int(k[y, x]); r, g, b = (c >> 16) & 255, (c >> 8) & 255, c & 255
            if r - g > 40 and y > 98: continue                     # the red bars of the howl
            if y < G:
                if c not in bgc: m[y, x] = True
            else:
                if c not in bgc and c not in FLOOR: m[y, x] = True
    # the 54 grey of the fur (also in the background): wolf if it touches the wolf on two sides
    for _ in range(2):
        add = []
        for y in range(41, G + 4):
            for x in range(11, 119):
                if not m[y, x] and K[i, y, x] == 54*65793 and (m[y-1, x] + m[y+1, x] + m[y, x-1] + m[y, x+1]) >= 2: add.append((y, x))
        for y, x in add: m[y, x] = True
    # drop specks (pixels with no wolf neighbour)
    for y in range(41, G + 4):
        for x in range(11, 119):
            if m[y, x] and (m[y-1, x] + m[y+1, x] + m[y, x-1] + m[y, x+1]) == 0: m[y, x] = False
    # holes: the fur greys equal to the background's; what the outside can't reach (through a mask closed by 1 px) is wolf
    from scipy import ndimage
    closed = ndimage.binary_closing(m, structure=np.ones((3, 3)), iterations=1)
    outside = ndimage.binary_propagation(np.pad(np.zeros((126, 126), bool), 1, constant_values=True), mask=~closed)
    m = m | (~outside & ~m)
    m[G + 3:] = False
    a = np.dstack([F[i].astype('uint8'), (m * 255).astype('uint8')]); frames.append(Image.fromarray(a, 'RGBA'))
# the animations (frame ranges of the GIF)
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
sheet.save(out); print(fw, fh, [len(ANIM[k]) for k in order])
