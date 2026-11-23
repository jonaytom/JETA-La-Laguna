"""v1.4.45: graba el motor de cada tipo de vehículo (10e_motor.js) acelerando desde parado, para escucharlo: utilitario,
berlina, SUV diésel, deportivo, guagua, moto (si hay) y eléctrico. Chrome del PC, con el sonido del juego (sin radio).
Uso: python tests/herramientas/audio_motores.py  (después de python build.py). Archivos: tests/shots/motor_<tipo>.webm"""
import asyncio, base64, functools, http.server, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas.foto_webgpu import Quiet

TIPOS = [('utilitario', "m=>m.phys==='compact' && m.w>0"), ('berlina', "m=>m.phys==='sedan' && m.w>0"), ('suv_diesel', "m=>m.phys==='suv' && m.w>0"),
         ('deportivo', "m=>m.phys==='sport' && m.w>0"), ('guagua', "m=>m.id==='guagua'"), ('moto', "m=>m.phys==='moto'"),
         ('electrico', "m=>/newton/i.test(m.id+' '+m.name)")]
SEGUNDOS = 9


async def main(port):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--autoplay-policy=no-user-gesture-required'])
        pg = await b.new_page(viewport={'width': 1280, 'height': 720})
        await pg.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await pg.goto(f'http://127.0.0.1:{port}/?q=media')
        await pg.wait_for_function('window.__GAME_READY', timeout=240000)
        await pg.mouse.click(640, 360)
        await pg.evaluate("""() => { const d=__dbg; d.AUDIO.init(); if (d.MUSIC && d.MUSIC.stop) try { d.MUSIC.stop(); } catch(e) {}
          document.getElementById('menu').style.display='none'; d.GAME.lock=()=>{}; d.GAME.state='play'; }""")
        for name, f in TIPOS:
            ok = await pg.evaluate("""(f) => { const d=__dbg, P=d.PLAYER, M=Object.values(d.VMODELS).find(eval(f)); if (!M) return null;
              if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
              const x=-1937, z=-232, h=Math.atan2(137,12); Object.assign(P,{x,z,y:d.heightAt(x,z)+.17}); const c=new d.Car(null,0x3366aa,x,z,h,M); d.enterCar(c); d.CAM.yaw=h;
              if (d.MUSIC && d.MUSIC.setVol) { try { d.SETTINGS.music = 0; d.MUSIC.setVol(); } catch(e) {} }
              return M.name; }""", f)
            if not ok:
                print(name, 'sin modelo')
                continue
            data = await pg.evaluate("""(secs) => new Promise(res => { const d=__dbg, A=d.AUDIO, ctx=A.ctx, dest=ctx.createMediaStreamDestination();
              A.master.connect(dest); const an=ctx.createAnalyser(); an.fftSize=2048; A.master.connect(an); const buf=new Float32Array(2048); let sum=0, n=0, peak=0;
              const meter=setInterval(()=>{ an.getFloatTimeDomainData(buf); for (const v of buf) { sum+=v*v; n++; peak=Math.max(peak,Math.abs(v)); } }, 50);
              const rec=new MediaRecorder(dest.stream), chunks=[]; rec.ondataavailable=e=>chunks.push(e.data);
              rec.onstop=()=>{ clearInterval(meter); A.master.disconnect(dest); A.master.disconnect(an); window.__vol={rms:+Math.sqrt(sum/Math.max(1,n)).toFixed(4), pico:+peak.toFixed(3)}; const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.readAsDataURL(new Blob(chunks,{type:'audio/webm'})); };
              const keys=d.KEYS || null; rec.start(); const t0=performance.now();
              // 1 s idle, then full throttle, then 1.5 s lifting off
              const iv=setInterval(()=>{ const t=(performance.now()-t0)/1000, c=d.PLAYER.car; if(!c) return;
                const press = t>1 && t<secs-1.5; if (keys) { if (press) keys.add('KeyW'); else keys.delete('KeyW'); } }, 30);
              setTimeout(()=>{ clearInterval(iv); if (keys) keys.delete('KeyW'); rec.stop(); }, secs*1000); })""", SEGUNDOS)
            (ROOT / 'tests' / 'shots' / ('motor_%s.webm' % name)).write_bytes(base64.b64decode(data.split(',')[1]))
            st = await pg.evaluate("() => JSON.stringify({kmh: Math.round(Math.abs(__dbg.PLAYER.car.fwdV)*3.6), marcha: __dbg.ENGINE.state.label, volumen: window.__vol})")
            print(name, ok, st)
        await b.close()
    print('AUDIO MOTORES OK')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
