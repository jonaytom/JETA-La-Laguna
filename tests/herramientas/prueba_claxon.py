# Claxon de cada tipo de vehículo: los toca todos (sin errores de JS) y graba el audio a tests/shots/claxon.wav para oírlos.
# Uso: cd tests && python run_test.py herramientas/prueba_claxon.py
import base64
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __step(2);})()")
    r = await pg.evaluate("""async () => { const A = __dbg.AUDIO; A.init(); const ctx = A.ctx; await ctx.resume();
      const dst = ctx.createMediaStreamDestination(); A.master.connect(dst); const rec = new MediaRecorder(dst.stream); const ch = []; rec.ondataavailable = (e) => ch.push(e.data); rec.start();
      const kinds = ['compact','sedan','taxi','suv','sport','van','police','bus','truck','moto','guancheGT'];
      for (const k of kinds) { const car = k === 'guancheGT' ? { type: 'sport', model: { id: 'guancheGT' } } : { type: k }; A.horn(car); await new Promise((s) => setTimeout(s, k === 'guancheGT' ? 2200 : 1300)); }
      rec.stop(); await new Promise((s) => rec.onstop = s); const b = new Blob(ch); const buf = await b.arrayBuffer(); let bin = ''; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i++) bin += String.fromCharCode(u[i]); return btoa(bin); }""")
    open('shots/claxon.webm', 'wb').write(base64.b64decode(r)); print('bytes', len(r), 'errores', errs)
