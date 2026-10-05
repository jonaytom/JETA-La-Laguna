# Pelea estilo Street Fighter: mantener atrás sin ataque del rival = andar hacia atrás; con ataque = cubrirse.
import os, asyncio
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("localStorage.setItem('gtall_fights','9')")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; window.__dbg.GAME.state='play'; __step(2);})()")
    await pg.evaluate("(()=>{const d=__dbg; const P=d.PLAYER; let p=d.PEDS.find(q=>q.down<=0); P.x=p.x+1.2; P.z=p.z; __step(2); d.startStreetFight(p);})()")
    await asyncio.sleep(3.5)
    print(await pg.evaluate("JSON.stringify({sep: Math.round(__dbg.FIGHT2D._st().b.x-__dbg.FIGHT2D._st().a.x), fase: __dbg.FIGHT2D._st().phase})"))
    await pg.evaluate("(()=>{const s=__dbg.FIGHT2D._st(); s.b.ai.passive=true; s.a.x=160; s.b.x=230;})()")
    x0 = await pg.evaluate("__dbg.FIGHT2D._st().a.x")
    await pg.keyboard.down('KeyA'); await asyncio.sleep(1.0); await pg.keyboard.up('KeyA')
    x1 = await pg.evaluate("__dbg.FIGHT2D._st().a.x")
    print('sin ataque, atrás 1 s: se mueve', round(x0 - x1, 1), 'px')
    await pg.evaluate("(()=>{const s=__dbg.FIGHT2D._st(); s.b.ai.passive=false; s.b.ai.tutAttack=true; s.b.deal=0.4; s.ev={}; s.a.hp=100;})()")
    await pg.keyboard.down('KeyA'); await asyncio.sleep(5); await pg.keyboard.up('KeyA')
    print(await pg.evaluate("JSON.stringify({bloqueado: !!__dbg.FIGHT2D._st().ev.blocked, vida: __dbg.FIGHT2D._st().a.hp})"))
    await snap(pg, 'pelea_tamano')
