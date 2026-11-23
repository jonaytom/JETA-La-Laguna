"""v1.4.46 (Jonay, 23-nov: pantalla negra de golpe con WebGPU en la Av. de La Trinidad, X −103, Y 93; «al teletransportarme
sigue negro»): una partida larga con WebGPU en el Chrome del PC, conduciendo y saltando entre sitios del casco y La Trinidad,
que vigila si se pierde el dispositivo WebGPU (device.lost: motivo y mensaje) y los errores de WebGPU sin capturar, y
apunta FPS y memoria cada tramo. Uso: python tests/herramientas/sonda_webgpu_larga.py [minutos]  (después de python build.py)."""
import asyncio, functools, http.server, json, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas.foto_webgpu import Quiet

# (x, z, towards x, towards z): Av. de La Trinidad, the old town, Menceyes, TF-5, back to La Trinidad
MOTOR = ['webgpu']  # second argument: webgl to compare
SITIOS = [(-103, 93, -60, 300), (-117, 149, -150, 500), (-60, -230, -10, -150), (-144, -139, -300, -200), (494, 1156, 539, 1203),
          (-1937, -232, -1800, -220), (-259, 547, -300, 700), (-103, 93, -60, 300)]

VIGILA = """() => { const R=__dbg.renderer, dev=R.backend && R.backend.device; window.__gpuLog=[]; window.__lost=null;
  if (!dev) return 'sin dispositivo WebGPU';
  dev.lost.then(i => { window.__lost = (i.reason||'') + ': ' + (i.message||''); });
  dev.addEventListener('uncapturederror', e => { if (window.__gpuLog.length < 40) window.__gpuLog.push(String(e.error && e.error.message || e).slice(0, 300)); });
  return 'vigilando ' + (dev.adapterInfo ? dev.adapterInfo.description : ''); }"""

IR = """([x,z,tx,tz]) => { const d=__dbg, P=d.PLAYER; window.__manual=true; document.getElementById('menu').style.display='none'; d.GAME.lock=()=>{}; d.GAME.state='play';
  if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
  const h=Math.atan2(tx-x,tz-z); Object.assign(P,{x,z,y:d.heightAt(x,z)+.17,h,dead:false,interior:null,low:null}); d.CAM.yaw=h;
  const M=Object.values(d.VMODELS).find(m=>m.phys==='sedan'&&m.w>0); const c=new d.Car(null,0x3366aa,x,z,h,M); d.enterCar(c);
  __step(5); window.__manual=false; return 1; }"""

MIDE = """() => new Promise(res => { const d=__dbg, r=d.renderer, old=r.render, f=[];
  r.render=function(sc,cam){ const o=old.apply(this,arguments); if(sc===d.scene&&cam===d.camera) f.push(performance.now()); return o; };
  setTimeout(()=>{ r.render=old; const fps=f.length>1 ? (f.length-1)*1000/(f.at(-1)-f[0]) : 0;
    res(JSON.stringify({fps:+fps.toFixed(1), heapMB: performance.memory ? Math.round(performance.memory.usedJSHeapSize/1048576) : null,
      llamadas: r.info && r.info.render ? r.info.render.drawCalls ?? r.info.render.calls : null, perdido: window.__lost, errores: window.__gpuLog.length,
      bundles: d.BUNDLES ? d.BUNDLES.regrab : null })); }, 3000); })"""


async def main(port, minutos):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--mute-audio',
                                                            '--enable-unsafe-webgpu', '--disable-gpu-vsync', '--disable-frame-rate-limit'])
        pg = await b.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=1)
        errs = []
        pg.on('pageerror', lambda e: errs.append('pageerror: ' + str(e)[:200]))
        pg.on('console', lambda m: errs.append(m.type + ': ' + m.text[:200]) if m.type == 'error' else None)
        await pg.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await pg.goto(f'http://127.0.0.1:{port}/?q=alta&gpu=' + MOTOR[0])
        await pg.wait_for_function('window.__GAME_READY', timeout=240000)
        print(await pg.evaluate(VIGILA), flush=True)
        vueltas = max(1, int(minutos * 60 / (len(SITIOS) * 16)))
        for v in range(vueltas):
            for s in SITIOS:
                await pg.evaluate(IR, list(s))
                await pg.keyboard.down('KeyW')
                await pg.wait_for_timeout(9000)
                r = await pg.evaluate(MIDE)
                await pg.keyboard.up('KeyW')
                print('vuelta', v + 1, s[:2], r, flush=True)
                if json.loads(r).get('perdido'):
                    print('DISPOSITIVO PERDIDO:', json.loads(r)['perdido'])
                    break
        log = await pg.evaluate("() => JSON.stringify({perdido: window.__lost, errores: window.__gpuLog})")
        print('final', log)
        print('errores de la página:', errs[:10])
        await b.close()
    print('SONDA WEBGPU LARGA OK')


if __name__ == '__main__':
    minutos = float(sys.argv[1]) if len(sys.argv) > 1 else 6
    if len(sys.argv) > 2:
        MOTOR[0] = sys.argv[2]
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port, minutos))
        finally:
            srv.shutdown()
