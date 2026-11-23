# v1.4.43: vuelve a three.js r160 (data/three_r160.module.min.js → data/three.module.min.js), por si la r187 da problemas.
# Para volver a la r187: herramientas/bajar_three.py
import os, shutil
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'data')
async def run(pg):
    src = os.path.join(D, 'three_r160.module.min.js')
    ok = os.path.exists(src) and '"160"' in open(src, encoding='utf-8').read(3000)
    if ok: shutil.copy(src, os.path.join(D, 'three.module.min.js'))
    print('USAR R160', 'OK' if ok else 'FALLA')
