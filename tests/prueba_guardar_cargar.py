import asyncio, json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if 'load' in m.text and m.type=='error' else None)
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__dbg.GAME.state='play'; __dbg.GAME.lock=()=>{};})()")
    await asyncio.sleep(1)
    # progress: story idx 3, gang, money, weapon, in a car somewhere
    await pg.evaluate("""(()=>{const d=__dbg; d.MISSIONS._setIdx(3); d.PLAYER.money=1234; d.PLAYER.health=77; d.giveWeapon(4); d.GAME.tod=15.5; const car=d.CARS[0]; d.PLAYER.x=car.x+2; d.PLAYER.z=car.z; d.enterCar(car); })()""")
    s = await pg.evaluate("JSON.stringify(__dbg.SAVE.save('2','test'))"); print('saved', s[:300])
    # mess everything up
    await pg.evaluate("(()=>{const d=__dbg; d.MISSIONS._setIdx(0); d.PLAYER.money=5; d.PLAYER.health=20; d.GAME.tod=3; })()")
    await pg.evaluate("__dbg.SAVE.open('save')")
    await asyncio.sleep(0.5)
    await pg.evaluate("document.querySelector(\"[data-load='2']\").click()")
    await asyncio.sleep(2)
    print('after', await pg.evaluate("JSON.stringify({st:__dbg.GAME.state, m:__dbg.MISSIONS.getState(), money:__dbg.PLAYER.money, hp:__dbg.PLAYER.health, tod:__dbg.GAME.tod, car:!!__dbg.PLAYER.car, w:__dbg.WEAPON.has, ammo:__dbg.WEAPON.ammo, title:__dbg.MISSIONS.currentTitle()})"))
    print('latest', await pg.evaluate("__dbg.SAVE.latest().k"))
    print('ERR', errs)
