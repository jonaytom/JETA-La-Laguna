"""v1.4.44: las sombras de antes y las abaratadas, en la misma carga y con la misma semilla (el mismo mundo): arriba antes
(los árboles proyectan su sombra con la copa detallada y la gente y los coches lejanos también), abajo ahora (la copa
simplificada y sin sombra la gente a más de 40 m ni los coches a más de 70 m). Chrome del PC y su GPU, WebGL.
Uso: python tests/herramientas/foto_sombras.py  (después de python build.py). Fotos: tests/shots/sombra_<vista>.jpg"""
import asyncio, base64, functools, http.server, io, sys, threading
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))  # (herramientas.foto_webgpu)
SEMILLA = """(() => { let s = 20261006 >>> 0; Math.random = function () { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })()"""  # as tests/run_varios.py (the fingerprints and the auditor)
from herramientas.foto_webgpu import VIEWS, Quiet

ANTES = """(() => { window.__sombrasCompletas = true; __dbg.scene.traverse(o => { if (o.name === 'instSombra' || o.name === 'parkedSombra') { o.visible = false; o.parent.castShadow = true; } }); })()"""
AHORA = """(() => { window.__sombrasCompletas = false; __dbg.scene.traverse(o => { if (o.name === 'instSombra' || o.name === 'parkedSombra') { o.visible = true; o.parent.castShadow = false; } }); })()"""


async def main(port, extra='', suf=''):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio'])
        page = await b.new_page(viewport={'width': 1280, 'height': 720}, device_scale_factor=1)
        await page.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await page.add_init_script(SEMILLA)
        await page.goto(f'http://127.0.0.1:{port}/?q=alta' + extra)
        await page.wait_for_function('window.__GAME_READY', timeout=240000)
        for name, tod, x, z, up, tx, tz, tup in VIEWS:
            if tod > 20:
                continue
            ims = []
            for js in (ANTES, AHORA):
                await page.evaluate(js)
                await page.evaluate("""([tod,x,z,tx,tz]) => { const d=__dbg, P=d.PLAYER; window.__manual=true; document.getElementById('menu').style.display='none';
                  d.GAME.lock=()=>{}; d.GAME.state='play'; if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
                  Object.assign(P,{x:tx,z:tz,y:d.heightAt(tx,tz)+.17,dead:false,interior:null}); d.GAME.tod=tod; __step(2); d.GAME.tod=tod; }""", [tod, x, z, tx, tz])
                url = await page.evaluate("""([x,z,up,tx,tz,tup]) => { const d=__dbg, g=d.heightAt(x,z), gt=d.heightAt(tx,tz);
                  d.camera.position.set(x,g+up,z); d.camera.lookAt(tx,gt+tup,tz); d.camera.updateMatrixWorld(); return window.__snap(); }""", [x, z, up, tx, tz, tup])
                ims.append(Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))).convert('RGB'))
            w, h = ims[0].size
            im = Image.new('RGB', (w, h * 2))
            im.paste(ims[0], (0, 0))
            im.paste(ims[1], (0, h))
            im.resize((w * 3 // 4, h * 3 // 2)).save(ROOT / 'tests' / 'shots' / ('sombra_%s%s.jpg' % (name, suf)), quality=82)
        await b.close()
    print('FOTO SOMBRAS OK')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            ex = sys.argv[1] if len(sys.argv) > 1 else ''  # e.g. '&sinbatch=1' (extra address options)
            asyncio.run(main(srv.server_port, ex, ex.replace('&', '_').replace('=', '')))
        finally:
            srv.shutdown()
