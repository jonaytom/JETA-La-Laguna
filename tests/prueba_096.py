# v0.96 (Jonay): Guanche Guarriors: the kick shows two legs (not three), the running kick is the falling pose turned
# flat, the strong kick comes out on its own after half a second held, and the white flash of a hit no longer stays on
# the hero (La Mirladora had it all the time). Photos of the kick and of the running kick.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_096', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._step(10); A._st().t=0.5; A._press('vS',true); A._step(1); A._press('vS',false); A._step(20); })()"); await pg.wait_for_timeout(300)
        r = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(2); gm._god=true; const p=gm._p; A._step(30); gm._E.length=0; p.inv=0;
          p.flash=0.12; A._step(20); const flash=p.flash;
          p.st='idle'; p.stT=0; A._press('vP', true); let sk=-1; for (let i=0;i<50;i++){ A._step(1); if (p.st==='skick' && sk<0) sk=i; } A._press('vP', false); A._step(30);
          return JSON.stringify({ flash, skick_en: sk }); })()"""))
        print('patada fuerte y destello', r)
        oka = r['flash'] == 0 and 25 <= r['skick_en'] <= 40   # about half a second held (at 60 steps a second), without letting go
        shots = {}
        for nm, st in [('patada', 'kick'), ('patada_carrera', 'dash')]:
            d = await pg.evaluate("""(st)=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; p.inv=0; p.flash=0; p.h=st==='dash'?8:0; p.st=st; p.stT=0.3; p.atkT=0.1; A._render(); return document.getElementById('arcade').toDataURL('image/jpeg', 0.92); }""", st)
            os.makedirs('shots', exist_ok=True); open('shots/v096_%s.jpg' % nm, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v096_' + nm)
        # v0.96.1 (Jonay): the dog's bite, smaller and on its snout. Photo.
        d = await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; p.st='idle'; p.h=0; gm._E.length=0; const e=gm._spawn('T', p.x+30, p.z); e.face=-1; e.st='atk'; e.stT=0.15; e.cd=99; A._render(); return document.getElementById('arcade').toDataURL('image/jpeg', 0.92); })()")
        open('shots/v0961_mordisco.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0961_mordisco')
        print('PATADA FUERTE SOLA Y SIN DESTELLO FIJO', 'OK' if oka else 'FALLA'); ok = oka
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 096', 'OK' if ok else 'FALLA')
