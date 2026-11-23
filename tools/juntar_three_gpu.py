# v1.4.44 (WebGPU, paso 2): junta three.js r187 en un solo módulo con WebGL + WebGPU + TSL, que comparten el mismo
# núcleo (THREE.Mesh === THREE.GPU.Mesh). Las exportaciones de siempre quedan igual; además, THREE.GPU (three/webgpu:
# WebGPURenderer, materiales de nodos, PMREMGenerator de WebGPU…) y THREE.TSL (los nodos para escribir sombreadores).
# Usa los archivos de data/three_r187/ (bajados por tests/herramientas/bajar_three.py; si faltan three.webgpu.min.js o
# three.tsl.min.js, los baja de jsDelivr) y esbuild (npx, con el Node del PC). Deja data/three.module.min.js (la copia
# solo WebGL sigue en data/three_r187.module.min.js).
import os, shutil, subprocess, tempfile, urllib.request

VER = '0.187.0'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'data', 'three_r187')
OUT = os.path.join(ROOT, 'data', 'three.module.min.js')
FILES = {'three.core.js': 'three.core.min.js', 'three.module.js': 'three.module.min.js',
         'three.webgpu.js': 'three.webgpu.min.js', 'three.tsl.js': 'three.tsl.min.js'}

def main():
    for src in FILES.values():
        p = os.path.join(RAW, src)
        if not os.path.exists(p):
            with urllib.request.urlopen('https://cdn.jsdelivr.net/npm/three@%s/build/%s' % (VER, src), timeout=60) as r:
                open(p, 'wb').write(r.read())
            print('bajado', src)
    tmp = tempfile.mkdtemp(prefix='three_gpu_')
    try:
        for dst, src in FILES.items():
            shutil.copy(os.path.join(RAW, src), os.path.join(tmp, dst))
        open(os.path.join(tmp, 'entry.js'), 'w', encoding='utf-8').write(
            "export * from './three.module.js';\n"
            "import * as GPU from './three.webgpu.js';\n"
            "import * as TSL from './three.tsl.js';\n"
            "export { GPU, TSL };\n"
            "export const REVISION_GPU = '%s';\n" % VER.split('.')[1])
        npx = 'npx.cmd' if os.name == 'nt' else 'npx'
        subprocess.run([npx, '--yes', 'esbuild@0.25.0', 'entry.js', '--bundle', '--format=esm', '--minify',
                        '--legal-comments=none', '--outfile=out.js'], cwd=tmp, check=True)
        out = open(os.path.join(tmp, 'out.js'), encoding='utf-8').read()
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    # build.py reads the version from the file: keep a plain marker it understands
    out = '/* three.js (WebGL + WebGPU + TSL) REVISION="%s" */\n' % VER.split('.')[1] + out
    open(OUT, 'w', encoding='utf-8', newline='\n').write(out)
    print('junto', OUT, len(out))

if __name__ == '__main__':
    main()
