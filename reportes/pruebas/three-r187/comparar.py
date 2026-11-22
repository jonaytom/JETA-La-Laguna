import argparse
import asyncio
import functools
import http.server
import threading
from pathlib import Path
from urllib.parse import urlsplit

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
WEB = ROOT / 'dist' / 'web'

class VariantHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def translate_path(self, path):
        p = urlsplit(path).path
        if p.startswith('/r187/'):
            p = p[len('/r187'):]
            if p == '/lib/three.module.min.js':
                return str(HERE / 'three.module.js')
            if p == '/lib/three.core.js':
                return str(HERE / 'three.core.js')
            candidate = HERE / 'juego.js'
            if p == '/js/juego.js' and candidate.exists():
                return str(candidate)
        elif p.startswith('/r160/'):
            p = p[len('/r160'):]
        return super().translate_path(p)

source = (ROOT/'tests'/'herramientas'/'sonda_fps_jugando_gpu.py').read_text(encoding='utf-8-sig')
source = source.replace('        await page.goto(url)', '''        errors = []
        page.on('pageerror', lambda e: (errors.append(str(e)), print('PAGEERROR:', str(e), flush=True)))
        page.on('console', lambda m: (errors.append(m.text), print('GLERROR:', m.text[:1300], flush=True))
                if m.type == 'error' and ('WebGL' in m.text or 'THREE' in m.text) else None)
        await page.add_init_script("""let seed=20261121; Math.random=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;""")
        await page.goto(url)''')
source = source.replace("timeout=180000)", "timeout=75000)\n        assert not errors, errors[:2]")
source = source.replace('return { gpu:', 'return { revision: __dbg.THREE.REVISION, gpu:')
source = source.replace("            print(name, json.dumps(stats, ensure_ascii=False), flush=True)",
"""            print(name, json.dumps(stats, ensure_ascii=False), flush=True)
            if i == 0:
                await page.screenshot(path=HERE / ('casco-r'+info['revision']+'.jpg'), type='jpeg', quality=88)
            assert not errors, errors[:2]""")
namespace = {'__name__':'sonda','__file__':str(ROOT/'tests'/'herramientas'/'sonda_fps_jugando_gpu.py'),'HERE':HERE}
exec(compile(source,'sonda_fps_jugando_gpu.py','exec'), namespace)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('versions', nargs='*', default=['r187','r160'], choices=['r160','r187'])
    args=parser.parse_args()
    handler = functools.partial(VariantHandler, directory=str(WEB))
    with http.server.ThreadingHTTPServer(('127.0.0.1',0), handler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            for rev in args.versions:
                print(rev, flush=True)
                asyncio.run(namespace['measure'](f'http://127.0.0.1:{server.server_port}/{rev}/?q=alta', False))
        finally:
            server.shutdown()
