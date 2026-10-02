import asyncio
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if 'respawn' in m.text else None)
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__dbg.GAME.state='play'; __dbg.GAME.lock=()=>{};})()")
    await asyncio.sleep(1.5)
    await pg.evaluate("(()=>{const d=__dbg; const car=d.CARS[0]; d.PLAYER.x=car.x+2; d.PLAYER.z=car.z; d.enterCar(car); d.PLAYER.health=5; car.onImpact(40);})()")
    for i in range(6):
        await asyncio.sleep(1)
        print('t', i, await pg.evaluate("JSON.stringify({st:__dbg.GAME.state, dead:__dbg.PLAYER.dead, car:!!__dbg.PLAYER.car, hp:Math.round(__dbg.PLAYER.health)})"))
    print('ERR', errs)
