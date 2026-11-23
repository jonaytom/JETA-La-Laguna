# v1.4.43, paso 1 de WebGPU: baja three.js r187 (build/three.core.min.js + build/three.module.min.js, jsDelivr) y los junta
# en un solo módulo (el juego lo mete dentro del HTML con una URL data:, y desde ahí no se puede importar
# «./three.core.min.js»). Deja data/three_r187.module.min.js y comprueba en el navegador que se carga y es la r187.
import os, re, json, base64, shutil, urllib.request
VER = '0.187.0'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'data', 'three_r187.module.min.js')
def get(name):
    url = 'https://cdn.jsdelivr.net/npm/three@%s/build/%s' % (VER, name)
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read().decode('utf-8')
def bundle(core, mod):
    m = list(re.finditer(r'export\s*\{([^}]*)\}\s*;?', core))
    assert m, 'core: no export at the end'
    ce = m[-1]
    pairs = []
    for it in ce.group(1).split(','):
        it = it.strip()
        if not it: continue
        a, _, b = it.partition(' as ')
        pairs.append((a.strip(), (b or a).strip()))
    imps = list(re.finditer(r'import\s*\{([^}]*)\}\s*from\s*["\']\./three\.core(?:\.min)?\.js["\']\s*;?', mod))
    assert len(imps) == 1, 'module: %d imports' % len(imps)
    im = imps[0]
    loc = []
    for it in im.group(1).split(','):
        it = it.strip()
        if not it: continue
        b, _, c = it.partition(' as ')
        loc.append((b.strip(), (c or b).strip()))
    # «export{…}from"./three.core.js"»: the re-exports of the core, through the same object
    body = mod[:im.start()] + mod[im.end():]
    rx = re.compile(r'export\s*\{([^}]*)\}\s*from\s*["\']\./three\.core(?:\.min)?\.js["\']\s*;?')
    k = [0]
    def reexp(mm):
        dec, ex = [], []
        for it in mm.group(1).split(','):
            it = it.strip()
            if not it: continue
            a, _, b = it.partition(' as ')
            k[0] += 1
            v = '__rx%d' % k[0]
            dec.append('%s:%s' % (a.strip(), v)); ex.append('%s as %s' % (v, (b or a).strip()))
        return 'const{' + ','.join(dec) + '}=__TC;export{' + ','.join(ex) + '};'
    body = rx.sub(reexp, body)
    assert 'three.core' not in body, 'module: still refers to the core'
    head = 'const __TC=(()=>{' + core[:ce.start()] + '\n;return{' + ','.join('%s:%s' % (b, a) for a, b in pairs) + '}})();\n'
    head += 'const{' + ','.join('%s:%s' % (b, c) for b, c in loc) + '}=__TC;\n'
    return head + body
async def run(pg):
    core = get('three.core.min.js'); mod = get('three.module.min.js')
    raw = os.path.join(os.path.dirname(OUT), 'three_r187')
    os.makedirs(raw, exist_ok=True)
    open(os.path.join(raw, 'three.core.min.js'), 'w', encoding='utf-8', newline='\n').write(core)
    open(os.path.join(raw, 'three.module.min.js'), 'w', encoding='utf-8', newline='\n').write(mod)
    print('fin del core:', repr(core[-200:]))
    print('bajado core', len(core), 'module', len(mod))
    out = bundle(core, mod)
    open(OUT, 'w', encoding='utf-8', newline='\n').write(out)
    print('junto', OUT, len(out))
    url = 'data:text/javascript;base64,' + base64.b64encode(out.encode('utf-8')).decode()
    r = json.loads(await pg.evaluate("""async (u) => { const T = await import(u); const c = document.createElement('canvas');
      let gl = 'no'; try { const R = new T.WebGLRenderer({ canvas: c }); gl = R.capabilities.isWebGL2 ? 'webgl2' : 'webgl'; R.dispose(); } catch (e) { gl = 'ERROR ' + e.message; }
      return JSON.stringify({ rev: T.REVISION, n: Object.keys(T).length, mesh: typeof T.Mesh, gl, webgpu: !!navigator.gpu }); }""", url))
    print(r)
    ok = r['rev'] == '187' and r['n'] > 400 and r['mesh'] == 'function' and r['gl'].startswith('webgl')
    if ok:
        # the game now uses it: the r160 is kept beside it (data/three_r160.module.min.js) to go back if needed
        D = os.path.dirname(OUT); cur = os.path.join(D, 'three.module.min.js'); old = os.path.join(D, 'three_r160.module.min.js')
        if not os.path.exists(old) and '"160"' in open(cur, encoding='utf-8').read(3000): shutil.copy(cur, old)
        shutil.copy(OUT, cur)
        print('el juego usa ya la r187 (copia de la r160 en', old + ')')
    print('BAJAR THREE', 'OK' if ok else 'FALLA')
