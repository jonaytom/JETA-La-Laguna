"""v1.4.44: las mismas vistas con WebGL y con WebGPU (?gpu=webgpu), en parejas (arriba WebGL, abajo WebGPU), para ver
que los sombreadores pasados a TSL (src/02b_gpu_nodos.js) se ven igual. Chrome del PC y su GPU.
Uso: python tests/herramientas/foto_webgpu.py  (después de python build.py). Fotos: tests/shots/gpu_<vista>.jpg"""
import asyncio, base64, functools, http.server, io, json, threading
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
SHOTS = ROOT / 'tests' / 'shots'
# name, hour, camera x, z, height over the ground, target x, z, height over the ground at the target
VIEWS = [
    ('casco', 12, -60, -230, 1.7, -10, -150, 4),
    ('concepcion', 11, -470, -260, 3, -517, -289, 6),
    ('trinchera', 12, -285, 520, 7, -259, 560, -2),
    ('campo', 12, -1850, -300, 6, -1750, -250, 0),
    ('menceyes', 12, 470, 1130, 3, 520, 1190, 1),
    ('aparcados', 12, -117, -311, 2.2, -100, -314, 0.6),  # v1.4.44: a row of parked cars (with the fixed seed)
    ('casco_noche', 22.5, -60, -230, 1.7, -10, -150, 4),
]


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


async def shoot(browser, url, modo):
    page = await browser.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)[:200]))
    await page.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
    await page.goto(url)
    await page.wait_for_function('window.__GAME_READY', timeout=240000)
    out = {}
    for name, tod, x, z, up, tx, tz, tup in VIEWS:
        await page.evaluate("""([tod,x,z,up,tx,tz,tup]) => { const d=__dbg, P=d.PLAYER;
          window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.lock=()=>{}; d.GAME.state='play';
          if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
          Object.assign(P,{x:tx,z:tz,y:d.heightAt(tx,tz)+.17,dead:false,interior:null});
          d.GAME.tod=tod; __step(30); d.GAME.tod=tod;
          const g=d.heightAt(x,z), gt=d.heightAt(tx,tz);
          d.camera.position.set(x,g+up,z); d.camera.lookAt(tx,gt+tup,tz); d.camera.updateMatrixWorld();
          if (d.updateCityLOD) d.updateCityLOD(true); __step(0); }""", [tod, x, z, up, tx, tz, tup])
        await page.wait_for_timeout(400)
        # the camera is set right before __snap (it renders and reads the canvas in the same task): __step moves it back
        url = await page.evaluate("""([x,z,up,tx,tz,tup]) => { const d=__dbg, g=d.heightAt(x,z), gt=d.heightAt(tx,tz);
          d.camera.position.set(x,g+up,z); d.camera.lookAt(tx,gt+tup,tz); d.camera.updateMatrixWorld(); return window.__snap(); }""", [x, z, up, tx, tz, tup])
        out[name] = Image.open(io.BytesIO(base64.b64decode(url.split(',')[1])))
    print(modo, 'errores:', errs[:5])
    await page.close()
    return out


async def main(port):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio', '--enable-unsafe-webgpu'])
        gl = await shoot(b, f'http://127.0.0.1:{port}/?q=alta', 'webgl')
        gp = await shoot(b, f'http://127.0.0.1:{port}/?q=alta&gpu=webgpu', 'webgpu')
        await b.close()
    for name in gl:
        a, c = gl[name].convert('RGB'), gp[name].convert('RGB')
        w, h = a.size
        im = Image.new('RGB', (w, h * 2))
        im.paste(a, (0, 0))
        im.paste(c, (0, h))
        im.resize((w * 3 // 4, h * 3 // 2)).save(SHOTS / ('gpu_%s.jpg' % name), quality=82)
    print('FOTO WEBGPU OK', ', '.join('gpu_%s.jpg' % n for n in gl))


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
