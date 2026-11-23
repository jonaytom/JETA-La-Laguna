"""v1.4.44: WebGL contra WebGPU (?gpu=webgpu) con la GPU del PC, en los mismos sitios y ajustes que sonda_fps_jugando_gpu.py.
Uso: python tests/herramientas/sonda_webgpu.py [--solo webgl|webgpu] [--q alta]  (necesita python build.py antes)."""
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


# --variantes: what each thing costs in each engine (name, code to switch it off, code to put it back). Measured in the same
# load, one after another. __vStrip(f) takes away the material extras (onBeforeCompile / TSL nodes) of the materials that
# f(material, object) picks and returns how to put them back.
HELPER = """void (window.__vStrip = (f) => { const d=__dbg, P=d.THREE.Material.prototype, done=new Map();
  d.scene.traverse(o => { const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    for (const m of ms) { if (done.has(m) || !f(m, o)) continue;
      const own = Object.prototype.hasOwnProperty;
      done.set(m, { obc: m.onBeforeCompile, key: own.call(m,'customProgramCacheKey') ? m.customProgramCacheKey : undefined,
        setup: own.call(m,'setup') ? m.setup : undefined, sdc: own.call(m,'setupDiffuseColor') ? m.setupDiffuseColor : undefined });
      m.onBeforeCompile = P.onBeforeCompile; delete m.customProgramCacheKey; delete m.setup; delete m.setupDiffuseColor; m.needsUpdate = true; } });
  return () => { for (const [m, v] of done) { m.onBeforeCompile = v.obc; if (v.key) m.customProgramCacheKey = v.key; if (v.setup) m.setup = v.setup;
    if (v.sdc) m.setupDiffuseColor = v.sdc; m.needsUpdate = true; } return done.size; }; })"""
VARIANTES = [
    ('base', '1', '1'),
    ('sin sombras', 'window.__u = [__dbg.renderer.shadowMap.enabled, __dbg.sun.castShadow]; __dbg.renderer.shadowMap.enabled = false; __dbg.sun.castShadow = false; 1',
     '__dbg.renderer.shadowMap.enabled = window.__u[0]; __dbg.sun.castShadow = window.__u[1]; 1'),
    ('fachadas sin extras', 'window.__u = __vStrip((m) => m === __dbg.MAT.facade); 1', 'window.__u()'),
    ('terreno sin extras', 'window.__u = __vStrip((m, o) => m.side === 2 && !!m.map && o.geometry.attributes.position.count > 50000); 1', 'window.__u()'),
    ('ningún extra', 'window.__u = __vStrip((m) => m.onBeforeCompile !== __dbg.THREE.Material.prototype.onBeforeCompile || Object.prototype.hasOwnProperty.call(m, "setup")); 1', 'window.__u()'),
    ('media resolución', 'window.__u = __dbg.renderer.getPixelRatio(); __dbg.renderer.setPixelRatio(0.5); __dbg.renderer.setSize(innerWidth, innerHeight); 1',
     '__dbg.renderer.setPixelRatio(window.__u); __dbg.renderer.setSize(innerWidth, innerHeight); 1'),
]


EXTRA = ['']  # --extra: more address options (e.g. &sinbatch=1)


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


async def measure(browser, url, modo, pr=None, js=None, variantes=False):
    page = await browser.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
    errs = []
    page.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)[:300]))
    page.on('console', lambda m: errs.append(m.type + ': ' + m.text[:300]) if m.type in ('error', 'warning') else None)
    await page.add_init_script("""
      window.__JETA_TEST = true;
      if (window.speechSynthesis) window.speechSynthesis.speak = () => {};
    """)
    await page.goto(url)
    try:
        await page.wait_for_function('window.__GAME_READY', timeout=240000)
    except Exception as e:
        print(modo, 'NO CARGA', str(e)[:200])
        print('\n'.join(errs[:25]))
        await page.close()
        return None
    info = await page.evaluate("""async () => {
      const r=__dbg.renderer, o={gpu:__dbg.USE_GPU, viewport:[innerWidth,innerHeight], ratio:r.getPixelRatio()};
      if (__dbg.USE_GPU) { o.backend = r.backend && r.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL2 (respaldo)';
        try { const a = r.backend.adapter || await navigator.gpu.requestAdapter(); o.adapter = a && a.info ? (a.info.vendor+' '+a.info.architecture+' '+a.info.description) : null; } catch(e) {} }
      else { const gl=r.getContext(), ext=gl.getExtension('WEBGL_debug_renderer_info'); o.adapter = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null; }
      return o; }""")
    print(modo, json.dumps(info, ensure_ascii=False), flush=True)
    if pr:  # --pr: fixed pixel ratio (and the dynamic resolution off) to tell the processor from the graphics card
        await page.evaluate("(pr) => { const d=__dbg; if (d.DYN) d.DYN.off = true; d.renderer.setPixelRatio(pr); d.renderer.setSize(innerWidth, innerHeight); }", pr)
    if js:  # --js: code run once the game is loaded (switch things off to see what they cost)
        print(modo, 'js:', await page.evaluate("(c) => String(eval(c))", js))
    res = {'info': info, 'sitios': {}}
    vs = VARIANTES if variantes else [(None, '1', '1')]
    sites = SITES[:2] if variantes else SITES
    if variantes:
        await page.evaluate(HELPER)
    for vname, vdo, vundo in vs:
      if vname:
          print(modo, '--', vname, await page.evaluate('(c) => String(eval(c))', vdo), flush=True)
          await page.wait_for_timeout(1500)  # new programs compiled before measuring
      for name, x, z, tx, tz, drive in sites:
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
            if(drive){ const c=new d.Car(null,0x215e90,x,z,h,d.VMODELS.reventon); d.enterCar(c); }
            __step(10);
            window.__manual=false;
          }""", [x, z, tx, tz, drive])
          if drive:
              await page.keyboard.down('KeyW')
          await page.wait_for_timeout(2500)
          stats = await page.evaluate("""() => new Promise(resolve => {
            // a frame = the main scene drawn with the main camera (WebGPU also calls scene.onAfterRender for the shadow passes)
            const d=__dbg, r=d.renderer, old=r.render, frames=[];
            r.render=function(sc,cam){ const o=old.apply(this,arguments); if(sc===d.scene && cam===d.camera) frames.push(performance.now()); return o; };
            setTimeout(()=>{
              r.render=old;
              const gaps=frames.slice(1).map((t,i)=>t-frames[i]).sort((a,b)=>a-b);
              const q=(p)=>gaps[Math.max(0,Math.ceil(gaps.length*p)-1)];
              resolve({fps:+((frames.length-1)*1000/(frames.at(-1)-frames[0])).toFixed(1), ms_mediana:+q(.5).toFixed(2),
                       p95_ms:+q(.95).toFixed(2), p99_ms:+q(.99).toFixed(2), lentos:+(gaps.filter(dt=>dt>18).length/gaps.length).toFixed(3),
                       px:[d.renderer.domElement.width,d.renderer.domElement.height], js_ms:window.__prof.js, render_ms:window.__prof.render});
            },6500);
          })""")
          if drive:
              await page.keyboard.up('KeyW')
          print(modo, (vname + ' · ' if vname else '') + name, json.dumps(stats, ensure_ascii=False), flush=True)
          res['sitios'][(vname + ' · ' if vname else '') + name] = stats
      if vname:
          await page.evaluate('(c) => String(eval(c))', vundo)
          await page.wait_for_timeout(1000)
    shot = ROOT / 'tests' / 'shots' / ('webgpu_%s.jpg' % modo)
    await page.screenshot(path=str(shot), type='jpeg', quality=70)
    res['avisos'] = errs[:40]
    if errs:
        print(modo, 'avisos de la consola:', len(errs))
        for e in errs[:15]:
            print('   ', e)
    await page.close()
    return res


async def main(port, modos, q, pr=None, js=None, variantes=False):
    out = {}
    async with async_playwright() as pw:
        # the Chrome installed on the PC (the Chromium of Playwright has no dxil.dll: its WebGPU falls back to WebGL2)
        browser = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio',
                                                 '--enable-unsafe-webgpu', '--enable-features=WebGPU',
                                                 # no vsync: the monitor (60 Hz) would cap the measurement at 60 and hide the margin
                                                 '--disable-gpu-vsync', '--disable-frame-rate-limit'])
        for modo in modos:
            url = f'http://127.0.0.1:{port}/?q={q}' + ('&gpu=webgpu' if modo == 'webgpu' else '') + EXTRA[0]
            out[modo] = await measure(browser, url, modo, pr, js, variantes)
        await browser.close()
    (ROOT / 'tests' / 'shots' / 'sonda_webgpu.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print('SONDA WEBGPU OK')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--solo', choices=['webgl', 'webgpu'])
    ap.add_argument('--q', default='alta')
    ap.add_argument('--js', help='código que se ejecuta tras cargar (p. ej. __dbg.renderer.shadowMap.enabled=false)')
    ap.add_argument('--variantes', action='store_true', help='mide lo que cuesta cada cosa (sombras, fachadas, terreno…) en cada motor')
    ap.add_argument('--pr', type=float, help='relación de píxeles fija (p. ej. 0.5)')
    ap.add_argument('--extra', default='', help='más opciones en la dirección, p. ej. "&sinbatch=1"')
    a = ap.parse_args()
    EXTRA[0] = a.extra
    handler = functools.partial(QuietHandler, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(server.server_port, [a.solo] if a.solo else ['webgl', 'webgpu'], a.q, a.pr, a.js, a.variantes))
        finally:
            server.shutdown()
