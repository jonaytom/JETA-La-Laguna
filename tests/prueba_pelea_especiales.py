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
    for keys,lab in [(['KeyW','KeyS','KeyJ'],'gofio'),(['KeyW','KeyS','KeyK'],'teide')]:
        await asyncio.sleep(1.2)
        for k in keys: await pg.keyboard.down(k); await asyncio.sleep(0.06); await pg.keyboard.up(k); await asyncio.sleep(0.03)
        await asyncio.sleep(0.5); print(lab, await pg.evaluate(st))
