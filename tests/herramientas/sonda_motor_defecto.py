"""v1.4.46: qué motor gráfico elige el juego por su cuenta (como un navegador normal, sin el aviso de navegador automatizado):
  1. Chrome del PC sin nada elegido → WebGPU;
  2. el Chromium de Playwright (anuncia WebGPU pero no lo arranca: sin dxil.dll) → WebGL;
  3. Chrome con «WebGL» elegido en Opciones → WebGL.
Uso: python tests/herramientas/sonda_motor_defecto.py  (después de python build.py)."""
import asyncio, functools, http.server, json, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas.foto_webgpu import Quiet

NORMAL = "Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });"


async def caso(pw, port, nombre, channel, motor=None):
    args = ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-unsafe-webgpu']
    b = await (pw.chromium.launch(channel=channel, args=args) if channel else pw.chromium.launch(args=args))
    pg = await b.new_page(viewport={'width': 1280, 'height': 720})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:200]))
    await pg.add_init_script(NORMAL)
    if motor:
        await pg.add_init_script("try { localStorage.setItem('jeta_motor', '%s'); } catch (e) {}" % motor)
    await pg.goto(f'http://127.0.0.1:{port}/?q=alta')
    await pg.wait_for_function('window.__GAME_READY', timeout=240000)
    r = await pg.evaluate("""() => { const R=__dbg.renderer; return JSON.stringify({ motor: __dbg.USE_GPU ? 'WebGPU' : 'WebGL',
      clase: R.constructor.name, backend: R.backend ? (R.backend.isWebGPUBackend ? 'webgpu' : 'webgl2') : '-', webdriver: navigator.webdriver }); }""")
    print(nombre, r, 'errores:', errs[:2], flush=True)
    await b.close()
    return json.loads(r)


async def main(port):
    async with async_playwright() as pw:
        a = await caso(pw, port, '1. Chrome, sin elegir:', 'chrome')
        b = await caso(pw, port, '2. Chromium sin WebGPU real:', None)
        c = await caso(pw, port, '3. Chrome, WebGL elegido:', 'chrome', 'webgl')
    ok = a['motor'] == 'WebGPU' and b['motor'] == 'WebGL' and c['motor'] == 'WebGL'
    print('SONDA MOTOR POR DEFECTO', 'OK' if ok else 'FALLA')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
