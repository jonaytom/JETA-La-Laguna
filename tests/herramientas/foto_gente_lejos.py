"""v1.4.44: cuerpos de la gente a 8 m (el peor caso) con sus tres niveles: completo, ligero (desde 35 m) y muy ligero
(desde 70 m; humanLoGeo, 06a_humans.js), en la misma carga y ampliados. Chrome del PC, WebGL.
Uso: python tests/herramientas/foto_gente_lejos.py  (después de python build.py). Foto: tests/shots/gente_lejos.jpg"""
import asyncio, base64, functools, http.server, io, sys, threading
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas.foto_webgpu import Quiet

DIST = [8]
SETUP = """(dist) => { const d=__dbg, P=d.PLAYER; window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.lock=()=>{}; d.GAME.state='play'; d.GAME.tod=12;
  const x0=-60, z0=-230; Object.assign(P,{x:x0-40,z:z0-40,y:d.heightAt(x0-40,z0-40)+.17}); __step(5);
  window.__gente = dist.map((r,i) => { const H=d.makeHuman({random:true}); const x=x0, z=z0+r; H.root.position.set(x, d.heightAt(x,z)+0.0, z); H.root.rotation.y=Math.PI; d.scene.add(H.root); return H; });
  __step(2); return 1; }"""
SNAP = """(lv) => { const d=__dbg; window.__nivelCuerpo = lv; const x0=-60, z0=-230, g=d.heightAt(x0,z0);
  d.camera.position.set(x0, g+1.6, z0-2); d.camera.lookAt(x0, g+1.0, z0+8); d.camera.updateMatrixWorld(); return window.__snap(); }"""


async def main(port):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio'])
        page = await b.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
        await page.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await page.goto(f'http://127.0.0.1:{port}/?q=alta')
        await page.wait_for_function('window.__GAME_READY', timeout=240000)
        await page.evaluate(SETUP, DIST)
        ims = []
        for lv in (0, 1, 2):
            await page.evaluate(SNAP, lv)  # one render so that actorCull swaps the bodies
            url = await page.evaluate(SNAP, lv)
            ims.append(Image.open(io.BytesIO(base64.b64decode(url.split(',')[1]))).convert('RGB'))
        await b.close()
    w, h = ims[0].size
    band = (int(w * 0.38), int(h * 0.1), int(w * 0.62), int(h * 0.95))  # the person
    crops = [im.crop(band) for im in ims]
    cw, ch = crops[0].size
    out = Image.new('RGB', (cw * 3, ch))
    for i, c in enumerate(crops):
        out.paste(c, (i * cw, 0))
    out.save(ROOT / 'tests' / 'shots' / 'gente_lejos.jpg', quality=88)
    print('FOTO GENTE LEJOS OK')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
