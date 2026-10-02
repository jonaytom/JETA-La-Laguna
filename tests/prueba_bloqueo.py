import asyncio
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("localStorage.setItem('gtall_fights','9')")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __step(2);})()")
    print(await pg.evaluate("(()=>{const d=__dbg; const P=d.PLAYER; let p=d.PEDS.find(q=>q.down<=0); P.x=p.x+1.2; P.z=p.z; __step(2); return String(d.startStreetFight(p)); })()"))
    await asyncio.sleep(3.5)
    await pg.evaluate("(()=>{const s=__dbg.FIGHT2D._st(); s.b.ai.tutAttack=true; s.b.deal=0.4; s.ev={};})()")
    await pg.keyboard.down('ArrowLeft'); await asyncio.sleep(6); await pg.keyboard.up('ArrowLeft')
    print(await pg.evaluate("JSON.stringify({ph:__dbg.FIGHT2D._st().phase, ev:__dbg.FIGHT2D._st().ev, hp:__dbg.FIGHT2D._st().a.hp, dir:__dbg.FIGHT2D._st().a.dir})"))
