# v0.99.4 (Jonay: «el basket perfecto, aplica ya»): the basketball players drawn with the pack's tank top, each built from
# his look; a short CPU match with two teams of different colours, photographed.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("""() => { const A = {skin:0xd9a47c, shirt:0xc0282c, pants:0xc0282c, hair:0x1a1410}, B = {skin:0x8d5a3b, shirt:0x2a5ac8, pants:0x1a2a6a, hair:0x2a1a10, beard:true}, C = {skin:0xf1c9a5, shirt:0x2a5ac8, pants:0x1a2a6a, hair:0xd8b56a, hairStyle:'afro'};
          __dbg.BASKET2D.start({ team: [{name:'A1', look:A},{name:'A2', look:A}], rival: [{name:'B1', look:B},{name:'B2', look:C}], time: 30, lv: 0.5, auto: true, onEnd: () => {} }); }""")
        await pg.wait_for_timeout(800)
        await pg.evaluate("__dbg.BASKET2D._step(60*6)"); await pg.wait_for_timeout(300); await pg.evaluate("(()=>{ __dbg.BASKET2D._st().drawn = 0; __dbg.BASKET2D._draw(); })()")
        r = json.loads(await pg.evaluate("JSON.stringify({ ready: __dbg.BKSHEET.ready(), drawn: __dbg.BASKET2D._st().drawn || 0, foto: document.getElementById('basket2d').toDataURL('image/jpeg', 0.85) })"))
        d = r.pop('foto'); os.makedirs('shots', exist_ok=True); open('shots/v0994_basket.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0994_basket', r)
        ok = r['ready'] and r['drawn'] > 0; print('JUGADORES DEL PACK', 'OK' if ok else 'FALLA')
    finally:
        await pg.evaluate("(()=>{ try { __dbg.BASKET2D._abort(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0994', 'OK' if ok else 'FALLA')
