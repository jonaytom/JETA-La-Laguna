"""v1.4.47 (Jonay: «se volvió a poner negro, WebGPU… efectivamente cambiando la hora provocó el bug»): con WebGPU, cambia
la hora cruzando el amanecer y el anochecer (cuando la sombra del sol se apagaba y se encendía) y mira si salen errores de
WebGPU (consola, pageerror, sessionStorage 'jeta_gpu_errores') y si la imagen sale negra. Chrome del PC y su GPU.
Uso: python tests/herramientas/sonda_negro_webgpu.py  (después de python build.py). Foto: tests/shots/negro_webgpu.jpg"""
import asyncio, base64, functools, http.server, io, threading
from pathlib import Path
from PIL import Image, ImageStat
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


async def main(port):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio', '--enable-unsafe-webgpu'])
        page = await b.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
        errs = []
        page.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)[:200]))
        page.on('console', lambda m: errs.append(m.text[:200]) if m.type == 'error' else None)
        await page.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await page.goto(f'http://127.0.0.1:{port}/?q=alta&gpu=webgpu')
        await page.wait_for_function('window.__GAME_READY', timeout=240000)
        gpu = await page.evaluate('() => __dbg.USE_GPU')
        res = []
        for tod in (12, 19.5, 20.5, 22, 6.5, 7.8, 8.5, 12, 20.4, 7.9, 12):
            await page.evaluate("""(tod) => { const d=__dbg, P=d.PLAYER; window.__manual=true; document.getElementById('menu').style.display='none';
              d.GAME.lock=()=>{}; d.GAME.state='play'; P.x=-10; P.z=-150; d.GAME.tod=tod; __step(20); d.GAME.tod=tod; __step(2); }""", tod)
            await page.wait_for_timeout(300)
            url = await page.evaluate("""() => { const d=__dbg, g=d.heightAt(-60,-230), gt=d.heightAt(-10,-150);
              d.camera.position.set(-60,g+1.7,-230); d.camera.lookAt(-10,gt+4,-150); d.camera.updateMatrixWorld(); return window.__snap(); }""")
            im = Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))).convert('RGB')
            lum = sum(ImageStat.Stat(im).mean) / 3
            res.append((tod, round(lum, 1)))
            im.save(ROOT / 'tests' / 'shots' / 'negro_webgpu.jpg', quality=80)
        st = await page.evaluate("() => sessionStorage.getItem('jeta_gpu_errores')")
        await b.close()
    negro = [t for t, l in res if l < 6]
    print('WebGPU:', gpu, '· brillo medio por hora:', res)
    print('errores de WebGPU guardados:', st)
    print('errores de consola:', [e for e in errs if 'Shadow' in e or 'setSize' in e or 'Destroyed' in e or 'pageerror' in e][:5])
    print('SONDA NEGRO', 'FALLA (negro a las ' + str(negro) + ')' if negro else 'OK')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
