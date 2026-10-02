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
    await pg.keyboard.press('Space'); await asyncio.sleep(0.4)
    print(await pg.evaluate(st)); await pg.screenshot(path='shots/fightgo.png')
    await asyncio.sleep(2); print(await pg.evaluate(st))
