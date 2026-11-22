"""Mide la cadencia del bucle real del juego en Chromium con la GPU local."""
import argparse
import asyncio
import functools
import http.server
import json
import threading
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
SITES = [
    ('Casco a pie', -60, -230, -10, -150, False),
    ('Menceyes en coche', 494, 1156, 539, 1203, True),
    ('TF-5 en coche', -1937, -232, -1800, -220, True),
]

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

async def measure(url, diagnostic):
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(args=[
            '--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio',
        ])
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
        await page.add_init_script("""
          window.__JETA_TEST = true;
          if (window.speechSynthesis) window.speechSynthesis.speak = () => {};
        """)
        await page.goto(url)
        await page.wait_for_function('window.__GAME_READY', timeout=180000)
        info = await page.evaluate("""() => {
          const r=__dbg.renderer, gl=r.getContext(), ext=gl.getExtension('WEBGL_debug_renderer_info');
          return { gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null,
                   viewport: [innerWidth,innerHeight], ratio: r.getPixelRatio() };
        }""")
        print(json.dumps(info, ensure_ascii=False), flush=True)
        if not info['gpu'] or 'SwiftShader' in info['gpu']:
            raise RuntimeError('Chromium no está usando la GPU física')
        sites = SITES[:1] * 2 if diagnostic else SITES
        for i, (name, x, z, tx, tz, drive) in enumerate(sites):
            if diagnostic and i == 1:
                await page.evaluate("""() => {
                  __dbg.renderer.setPixelRatio(2 / 3);
                  __dbg.renderer.setSize(innerWidth, innerHeight);
                }""")
            await page.evaluate("""([x,z,tx,tz,drive]) => {
              const d=__dbg,P=d.PLAYER;
              window.__manual=true;
              document.getElementById('menu').style.display='none';
              if(P.car){const previous=P.car; d.exitCar(); previous.remove();}
              d.GAME.lock=()=>{};
              d.GAME.state='play';
              d.GAME.tod=12;
              const h=Math.atan2(tx-x,tz-z);
              Object.assign(P,{x,z,y:d.heightAt(x,z)+.17,h,low:null,dead:false,interior:null});
              d.CAM.yaw=h;
              if(drive){
                const c=new d.Car(null,0x215e90,x,z,h,d.VMODELS.reventon);
                d.enterCar(c);
              }
              __step(10);
              window.__manual=false;
            }""", [x,z,tx,tz,drive])
            if drive:
                await page.keyboard.down('KeyW')
            await page.wait_for_timeout(2200)
            stats = await page.evaluate("""([x,z]) => new Promise(resolve => {
              const d=__dbg, scene=d.scene, old=scene.onAfterRender, frames=[];
              scene.onAfterRender=function(...args){old.apply(this,args); frames.push(performance.now());};
              setTimeout(()=>{
                scene.onAfterRender=old;
                const gaps=frames.slice(1).map((t,i)=>t-frames[i]).sort((a,b)=>a-b);
                const q=(p)=>gaps[Math.max(0,Math.ceil(gaps.length*p)-1)];
                const out={fps:(frames.length-1)*1000/(frames.at(-1)-frames[0]),p95_ms:q(.95),
                           p99_ms:q(.99), ms_mediana:q(.5), muestras:gaps.length,
                           proporción_lenta:gaps.filter(dt=>dt>18).length/gaps.length,
                           px:[d.renderer.domElement.width,d.renderer.domElement.height],
                           js_ms:window.__prof.js, preparación_render_ms:window.__prof.render,
                           recorrido_m:Math.hypot(d.PLAYER.x-x,d.PLAYER.z-z)};
                resolve(out);
              },6500);
            })""", [x,z])
            if drive:
                await page.keyboard.up('KeyW')
            print(name, json.dumps(stats, ensure_ascii=False), flush=True)
        await browser.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--diagnostico', action='store_true', help='Repite el casco con menos píxeles y los mismos ajustes')
    args = parser.parse_args()
    handler = functools.partial(QuietHandler, directory=str(ROOT/'dist'/'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
        thread=threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            asyncio.run(measure(f'http://127.0.0.1:{server.server_port}/?q=alta', args.diagnostico))
        finally:
            server.shutdown()
