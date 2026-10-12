# Diario de misiones (v0.66): se abre con J, lista las 4 líneas de misiones, guarda las conversaciones de cada misión
# y «Reiniciar desde aquí» vuelve a esa misión.
import asyncio, os, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    # play the start of mission 2 (Coco) so there is a conversation in the log
    await pg.evaluate("(()=>{const M=__dbg.MISSIONS; M._setIdx(1); const b=M.blips().find(q=>q[2]==='#f5b72e'); const P=__dbg.PLAYER; P.x=b[0]; P.z=b[1]; __step(20); for (let i=0;i<6;i++){ const T=window.__TALK; if (T && T.cur) T.cur.next(); __step(2);} })()")
    act = await pg.evaluate("__dbg.MISSIONS.active && __dbg.MISSIONS.active.title"); print('activa', act)
    await pg.keyboard.press('KeyJ'); await asyncio.sleep(0.5)
    vis = await pg.evaluate("(()=>{ const u=document.getElementById('diario'); return !!u && u.style.display!=='none'; })()")
    items = await pg.evaluate("document.querySelectorAll('#diario .diaItem').length"); det = await pg.evaluate("document.getElementById('diaDet') ? document.getElementById('diaDet').innerText.slice(0, 300) : ''")
    print('abierto', vis, 'misiones', items); print('detalle', det.replace('\n', ' | ')[:300])
    log = await pg.evaluate("JSON.stringify(__dbg.MISSIONS.log('Una botella para Coco').length)"); print('lineas guardadas', log)
    # restart from mission 0 through the button (two clicks: it asks first)
    await pg.evaluate("(()=>{ const it=[...document.querySelectorAll('#diario .diaItem')].find(e=>e.dataset.k==='story' && e.dataset.i==='0'); it.click(); })()")
    await pg.evaluate("document.getElementById('diaReset').click()"); await pg.evaluate("document.getElementById('diaReset').click()")
    idx = await pg.evaluate("__dbg.MISSIONS.getState().story"); print('historia tras reiniciar', idx)
    await pg.keyboard.press('KeyJ'); await asyncio.sleep(0.3); closed = await pg.evaluate("document.getElementById('diario').style.display==='none'")
    print('cerrado', closed, 'estado', await pg.evaluate("__dbg.GAME.state"))
    ok = vis and items >= 10 and int(log) > 0 and idx == 0 and closed and not errs
    print('errores JS', errs[:3]); print('DIARIO', 'OK' if ok else 'FALLA')
