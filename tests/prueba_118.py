# v1.1.8: las tareas del auditor (PARA_EL_PROGRAMADOR, 4-nov). 1) las imágenes de los minijuegos se precargan tras la
# carga (Guanche, Bencomo, baloncesto, fondos); 2) la caché de sprites del fútbol quita el menos usado y no se vacía;
# 3) si el guardado automático no cabe, sale un aviso; 4) con la recreativa abierta el bucle no pinta el mundo 3D.
import asyncio, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        # 1) preload: every sheet already exists as an image (loading started) before any minigame opens
        await pg.wait_for_timeout(4000)
        a = json.loads(await pg.evaluate("""(()=>{ const d=__dbg; const s=d.SPRX.preload(), f=d.FONDOS.preload(), b=d.BKSHEET.preload();
          const all=[...s, ...f, ...b]; return JSON.stringify({ n: all.length, listas: all.filter(im=>im.complete && im.naturalWidth).length, sprx: Object.keys(d.SPRX_DATA).length }); })()"""))
        print('precarga', a)
        ok1 = a['n'] >= a['sprx'] > 0 and a['listas'] >= a['n'] * 0.9
        print('PRECARGA', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
        # 3) save: a storage that throws gives a toast
        c = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, P=Storage.prototype, set0=P.setItem; d.GAME.state='play'; document.getElementById('toast').textContent='';
          P.setItem=function(){ throw new Error('QuotaExceededError'); }; try { d.SAVE.auto('prueba'); } finally { P.setItem=set0; }
          return JSON.stringify({ toast: document.getElementById('toast').textContent }); })()"""))
        print('guardado', c)
        ok3 = 'No se ha podido guardar' in c['toast']
        print('AVISO_GUARDAR', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
        # 4) the arcade: with it open, a real frame of loop() does not run logic() (the 3D world stays still)
        e = json.loads(await pg.evaluate("""(async()=>{ const d=__dbg, A=d.ARCADE; A.open({ console: ['bencomo', 'naves'], where: 'PRUEBA' }); const st=d.GAME.state, t0=d.GAME.tod;
          window.__manual=false; await new Promise(r=>setTimeout(r, 400)); window.__manual=true; const t1=d.GAME.tod; A.close(); return JSON.stringify({ st, quieto: t1===t0, despues: d.GAME.state }); })()"""))
        print('recreativa', e)
        ok4 = e['st'] == 'arcade' and e['quieto'] and e['despues'] == 'play'
        print('SIN_3D_DETRAS', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    finally:
        await pg.evaluate("""(()=>{ const d=__dbg; window.__manual=true; try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} d.GAME.state='play'; __step(2); })()""")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 118', 'OK' if ok else 'FALLA')
