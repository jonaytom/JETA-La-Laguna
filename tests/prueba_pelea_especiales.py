import asyncio
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("localStorage.removeItem('gtall_fights')")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    print(await pg.evaluate("(()=>{const d=__dbg; const P=d.PLAYER; let p=d.PEDS.find(q=>q.down<=0); P.x=p.x+1.2; P.z=p.z; __step(2); return String(d.startStreetFight(p)); })()"))
    await asyncio.sleep(2.5); await pg.keyboard.press('Space'); await asyncio.sleep(2.5)
    st="JSON.stringify({ph:__dbg.FIGHT2D._st().phase, ev:__dbg.FIGHT2D._st().ev, ay:__dbg.FIGHT2D._st().a.y})"
    print(await pg.evaluate(st))
    # back / forward depend on which side the player faces
    side = await pg.evaluate("__dbg.FIGHT2D._st().a.dir")
    B, F = ('KeyA', 'KeyD') if side > 0 else ('KeyD', 'KeyA')
    ok = True
    for keys,lab in [([B,F,'KeyJ'],'gofio'),([B,F,'KeyK'],'teide'),(['KeyS','KeyW','KeyJ'],'gancho'),(['KeyS','KeyW','KeyK'],'pastor')]:
        await asyncio.sleep(1.4)
        await pg.evaluate("(()=>{const s=__dbg.FIGHT2D._st(); s.b.hp=100; s.a.hp=100;})()")
        side = await pg.evaluate("__dbg.FIGHT2D._st().a.dir")  # the CPU may have jumped over: read the facing every time
        B2, F2 = ('KeyA', 'KeyD') if side > 0 else ('KeyD', 'KeyA'); keys = [B2 if k == B else F2 if k == F else k for k in keys]
        for k in keys: await pg.keyboard.down(k); await asyncio.sleep(0.06); await pg.keyboard.up(k); await asyncio.sleep(0.03)
        await asyncio.sleep(0.15); ev = await pg.evaluate("JSON.stringify(__dbg.FIGHT2D._st().ev)")
        if ('"%s":true' % lab) not in ev:  # the headless browser sometimes drops a key under load: one more try
            await asyncio.sleep(1.0); side = await pg.evaluate("__dbg.FIGHT2D._st().a.dir"); B3, F3 = ('KeyA', 'KeyD') if side > 0 else ('KeyD', 'KeyA')
            keys2 = [B3 if k in ('KeyA', 'KeyD') and i == 0 else F3 if k in ('KeyA', 'KeyD') else k for i, k in enumerate(keys)] if keys[0] in ('KeyA', 'KeyD') else keys
            for k in keys2: await pg.keyboard.down(k); await asyncio.sleep(0.06); await pg.keyboard.up(k); await asyncio.sleep(0.03)
            await asyncio.sleep(0.15); ev = await pg.evaluate("JSON.stringify(__dbg.FIGHT2D._st().ev)")
        got = ('"%s":true' % lab) in ev; ok = ok and got; print(lab, 'OK' if got else 'NO', ev[:160])
    print('ESPECIALES', 'OK' if ok else 'FALLA')
