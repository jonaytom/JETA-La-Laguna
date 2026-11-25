# v1.4.50: el contador de FPS (Opciones → Contador de FPS): lo activa con su botón, deja correr el juego 8 s (sin
# __manual) y dice qué pone y dónde está; foto en shots/contador_fps.jpg. Uso: herramientas/sonda_contador_fps.py
import json, base64, asyncio
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; document.querySelector('#segFpsM button[data-v=\"1\"]').click(); window.__manual=false;})()")
    f0 = await pg.evaluate("__dbg.GAME.frame || 0")
    raf = await pg.evaluate("new Promise(r=>{ const t0=performance.now(); let n=0; const f=()=>{ if(++n<20) requestAnimationFrame(f); else r([n, Math.round(performance.now()-t0)]); }; requestAnimationFrame(f); })")
    await asyncio.sleep(8)
    print('RAF', raf, 'estado', await pg.evaluate("__dbg.GAME.state"), 'manual', await pg.evaluate("window.__manual"), 'prof', await pg.evaluate("JSON.stringify(window.__prof)"))
    r = json.loads(await pg.evaluate("JSON.stringify((()=>{ const e=document.getElementById('fpsMeter'), b=e.getBoundingClientRect(); return { texto: e.textContent, visible: getComputedStyle(e).display, caja: [Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)], ancho: innerWidth, guardado: JSON.parse(localStorage.getItem('gtall_set')||'{}').fpsMeter }; })())"))
    await pg.evaluate("window.__manual=true")
    img = await pg.evaluate("window.__snap()"); open('shots/contador_fps.jpg', 'wb').write(base64.b64decode(img.split(',')[1]))
    print('CONTADOR', r)
    await pg.evaluate("document.querySelector('#segFpsM button[data-v=\"0\"]').click()")
    print('APAGADO', await pg.evaluate("getComputedStyle(document.getElementById('fpsMeter')).display"))
