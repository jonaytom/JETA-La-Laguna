"""v1.4.45: el equilibrio de motores y música. Graba dos escenas en Chrome con el sonido del juego (y la radio):
  1. a pie al borde de la TF-5 mientras pasan un utilitario, una guagua y un deportivo (los motores de alrededor);
  2. conduciendo una berlina por la TF-5 con la radio puesta y coches cruzándose.
Uso: python tests/herramientas/audio_trafico.py  (después de python build.py). Archivos: tests/shots/audio_<escena>.webm"""
import asyncio, base64, functools, http.server, sys, threading
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'tests'))
from herramientas.foto_webgpu import Quiet

REC = """(secs) => new Promise(res => { const d=__dbg, A=d.AUDIO, ctx=A.ctx, dest=ctx.createMediaStreamDestination();
  A.master.connect(dest);
  // the radio songs play in an <audio> element, outside the mixer: tapped too
  const el=document.getElementById('radioAudio'); let tap=null;
  try { if (el && el.captureStream) { tap=ctx.createMediaStreamSource(el.captureStream()); tap.connect(dest); } } catch(e) {}
  const an=ctx.createAnalyser(); an.fftSize=2048; dest.stream && A.master.connect(an); const buf=new Float32Array(2048); let sum=0,n=0;
  const meter=setInterval(()=>{ an.getFloatTimeDomainData(buf); for (const v of buf) { sum+=v*v; n++; } }, 50);
  const rec=new MediaRecorder(dest.stream), chunks=[]; rec.ondataavailable=e=>chunks.push(e.data);
  rec.onstop=()=>{ clearInterval(meter); A.master.disconnect(dest); A.master.disconnect(an); if (tap) tap.disconnect();
    window.__vol={rms:+Math.sqrt(sum/Math.max(1,n)).toFixed(4), radio: !!(el && !el.paused)};
    const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.readAsDataURL(new Blob(chunks,{type:'audio/webm'})); };
  rec.start(); setTimeout(()=>rec.stop(), secs*1000); })"""

# 1. on foot by the TF-5: three cars pass 4 m away (moved by hand along the road, at 50, 70 and 90 km/h)
PIE = """() => { const d=__dbg, P=d.PLAYER; if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
  const x=-1900, z=-226, h=Math.atan2(137,12), fx=Math.sin(h), fz=Math.cos(h), rx=-fz, rz=fx;
  Object.assign(P,{x:x+rx*4, z:z+rz*4, y:d.heightAt(x+rx*4,z+rz*4)+.17}); d.CAM.yaw=h+Math.PI/2;
  const pick=(f)=>Object.values(d.VMODELS).find(f);
  const plan=[[pick(m=>m.phys==='compact'&&m.w>0),14,0],[d.VMODELS.guagua,19,2.5],[pick(m=>m.phys==='sport'&&m.w>0),25,5]];
  window.__pasan = plan.map(([M,v,delay])=>{ const c=new d.Car(null,0xcc3333,x-fx*120,z-fz*120,h,M); c.mode='scripted'; c.driver='script';
    return {c,v,delay,s:-120}; });
  const t0=performance.now(); let last=t0;
  window.__mover=setInterval(()=>{ const now=performance.now(), dt=(now-last)/1000; last=now; const t=(now-t0)/1000;
    for (const p of window.__pasan) { if (t<p.delay) continue; p.s+=p.v*dt; const c=p.c; c.x=x+fx*p.s; c.z=z+fz*p.s; c.y=d.heightAt(c.x,c.z); c.vx=fx*p.v; c.vz=fz*p.v; c.ctl={thr:0.6,brk:0,steer:0,hb:0}; if (c.sync) c.sync(0); } }, 20);
  return 1; }"""
FIN_PIE = """() => { clearInterval(window.__mover); for (const p of window.__pasan||[]) p.c.remove(); return 1; }"""

# 2. driving a sedan along the TF-5 with the radio on; two cars come the other way
COCHE = """() => { const d=__dbg, P=d.PLAYER; if (P.car) { const c=P.car; d.exitCar(); c.remove(); }
  const x=-1937, z=-232, h=Math.atan2(137,12); Object.assign(P,{x,z,y:d.heightAt(x,z)+.17});
  const M=Object.values(d.VMODELS).find(m=>m.phys==='sedan'&&m.w>0); const c=new d.Car(null,0x3366aa,x,z,h,M); d.enterCar(c); d.CAM.yaw=h;
  const keys=d.KEYS; keys.add('KeyW'); window.__soltar=setTimeout(()=>keys.delete('KeyW'), 9000); return M.name; }"""


async def main(port):
    async with async_playwright() as pw:
        b = await pw.chromium.launch(channel='chrome', args=['--enable-gpu', '--use-angle=d3d11', '--autoplay-policy=no-user-gesture-required'])
        pg = await b.new_page(viewport={'width': 1280, 'height': 720})
        await pg.add_init_script("window.__JETA_TEST = true; if (window.speechSynthesis) window.speechSynthesis.speak = () => {};")
        await pg.goto(f'http://127.0.0.1:{port}/?q=media')
        await pg.wait_for_function('window.__GAME_READY', timeout=240000)
        await pg.mouse.click(640, 360)
        await pg.evaluate("() => { const d=__dbg; d.AUDIO.init(); document.getElementById('menu').style.display='none'; d.GAME.lock=()=>{}; d.GAME.state='play'; }")
        for name, setup, secs, end in (('a_pie_tf5', PIE, 12, FIN_PIE), ('conduciendo_radio', COCHE, 12, None)):
            print(name, await pg.evaluate(setup))
            await pg.wait_for_timeout(1500)  # the radio starts when you get in
            data = await pg.evaluate(REC, secs)
            (ROOT / 'tests' / 'shots' / ('audio_%s.webm' % name)).write_bytes(base64.b64decode(data.split(',')[1]))
            print(name, await pg.evaluate("() => JSON.stringify(window.__vol)"))
            if end:
                await pg.evaluate(end)
        await b.close()
    print('AUDIO TRAFICO OK')


if __name__ == '__main__':
    h = functools.partial(Quiet, directory=str(ROOT / 'dist' / 'web'))
    with http.server.ThreadingHTTPServer(('127.0.0.1', 0), h) as srv:
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            asyncio.run(main(srv.server_port))
        finally:
            srv.shutdown()
