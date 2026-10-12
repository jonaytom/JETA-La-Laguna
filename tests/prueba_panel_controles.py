import asyncio
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("localStorage.removeItem('gtall_fights')")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    print(await pg.evaluate("(()=>{const d=__dbg; const P=d.PLAYER; let p=d.PEDS.find(q=>q.down<=0); P.x=p.x+1.2; P.z=p.z; __step(2); return String(d.startStreetFight(p)); })()"))
    await asyncio.sleep(3)
    st="JSON.stringify({ph:__dbg.FIGHT2D._st().phase, b:__dbg.FIGHT2D._st().banner, pt:__dbg.FIGHT2D._st().pt})"
    print(await pg.evaluate(st))
    await pg.screenshot(path='shots/ready.png')
    await pg.keyboard.press('KeyE'); await asyncio.sleep(0.4)
    print(await pg.evaluate(st)); await pg.screenshot(path='shots/fightgo.png')
    await asyncio.sleep(2); print(await pg.evaluate(st))
    # v0.64: ↑ jumps, E punches, Space kicks (default keys of Opciones › Controles)
    await pg.evaluate("(()=>{const s=__dbg.FIGHT2D._st(); s.ev={}; s.b.ai.passive=true; s.b.ai.lv=0;})()")  # the rival stands still: no hits that cancel ours
    for k in ['ArrowUp', 'KeyE', 'Space']:
        for _ in range(3):  # a key can get lost under load: up to 3 tries each
            await asyncio.sleep(1.6); await pg.keyboard.down(k); await asyncio.sleep(0.12); await pg.keyboard.up(k)  # 1.6 s: let the jump land first
            ev = await pg.evaluate("JSON.stringify(__dbg.FIGHT2D._st().ev)")
            if ('"%s":true' % {'ArrowUp': 'jump', 'KeyE': 'jab', 'Space': 'kick'}[k]) in ev: break
    await asyncio.sleep(0.3); ev = await pg.evaluate("JSON.stringify(__dbg.FIGHT2D._st().ev)"); print('teclas', ev)
    print('TECLAS', 'OK' if all(('"%s":true' % x) in ev for x in ('jump', 'jab', 'kick')) else 'FALLA')
