import os
import base64, json
async def snap(pg, name):
    d = await pg.evaluate("window.__snap()")
    os.makedirs('shots', exist_ok=True); open('shots/'+name+'.jpg','wb').write(base64.b64decode(d.split(',')[1])); print('snap',name)
async def st(pg): return await pg.evaluate("JSON.stringify({p:[__dbg.PLAYER.x.toFixed(1),__dbg.PLAYER.z.toFixed(1)], car: __dbg.PLAYER.car && [__dbg.PLAYER.car.type, __dbg.PLAYER.car.speed.toFixed(1), __dbg.PLAYER.car.health.toFixed(0)], w: __dbg.WANTED.level, cars: __dbg.CARS.length, peds: __dbg.PEDS.length, m: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, obj: document.getElementById('objective').innerText, sub: document.getElementById('sub').innerText, toast: document.getElementById('toast').innerText})")
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play';})()")
    await pg.evaluate("__step(5)")
    print(await st(pg))
    # walk forward 3 s
    await pg.evaluate("__step(90, 1/30, ['KeyW'])"); print(await st(pg))
    await snap(pg, 'walk')
    # walk to the mission marker: teleport near
    await pg.evaluate("(()=>{const P=__dbg.PLAYER; P.x=138+0.3-6+5; P.z=-42.5; })()")
    await pg.evaluate("__step(5)"); print(await st(pg))
