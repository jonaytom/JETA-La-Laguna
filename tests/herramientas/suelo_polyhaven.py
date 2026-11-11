# Texturas del suelo desde Poly Haven (v1.3.7, CC0). Las fotos de 1k se bajan en el PC con Blender (o a mano) a
# assets/textures/polyhaven/<id>_1k.jpg; este script las repite para que casen con la baldosa de cada textura del juego
# (asfalto 8 m: asphalt_floor sin color, para que no se repitan grietas; acera 2,4 m, adoquín 5 m, césped 4 m) y les da el color medio del juego. Salida: assets/textures/suelo/.
# Necesita PIL y numpy (se corre en la nube). Uso: python suelo_polyhaven.py <carpeta del repo>
import sys, os
import numpy as np
from PIL import Image
ROOT = sys.argv[1] if len(sys.argv) > 1 else '.'
SRC = os.path.join(ROOT, 'assets', 'textures', 'polyhaven'); OUT = os.path.join(ROOT, 'assets', 'textures', 'suelo')
os.makedirs(OUT, exist_ok=True)
def tile(src, N, size):
    t = Image.open(src).convert('RGB').resize((size // N, size // N), Image.LANCZOS); out = Image.new('RGB', (size, size))
    for i in range(N):
        for j in range(N): out.paste(t, (i * (size // N), j * (size // N)))
    return out
def match(im, mean, contrast=1.0, gris=0.0):
    a = np.asarray(im).astype(float)
    if gris: a = a * (1 - gris) + a.mean(2, keepdims=True) * gris  # (quitar el tono marrón de la foto)
    m = a.reshape(-1, 3).mean(0)
    return Image.fromarray(np.clip((a - m) * contrast + np.array(mean), 0, 255).astype('uint8'))
JOBS = {'asfalto': ('asphalt_floor_1k.jpg', 4, 512, (72, 73, 76), 1.35, 0.9), 'acera': ('concrete_pavement_1k.jpg', 1, 512, (166, 163, 156), 1.7, 0.6),
        'adoquin': ('square_cobblestone_1k.jpg', 3, 510, (82, 81, 80), 1.9, 0.5), 'cesped': ('grass_ground_1k.jpg', 2, 256, (88, 118, 60), 1.0, 0.0)}
for k, (f, N, s, mean, c, g) in JOBS.items():
    match(tile(os.path.join(SRC, f), N, s), mean, c, g).resize(((512 if s > 300 else 256),) * 2, Image.LANCZOS).save(os.path.join(OUT, 'suelo_%s.jpg' % k), quality=82, optimize=True)
    print('ok', k)
