# Al morir apareces en el centro de salud / urgencias más cercano (HEALTH): muere junto a cada uno y comprueba dónde
# reapareces. Uso: cd tests && python run_test.py prueba_hospital.py
import asyncio, json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{};})()"); await asyncio.sleep(1)
    H = json.loads(await pg.evaluate("JSON.stringify(__dbg.HEALTH)")); ok = len(H) >= 3
    for p in H:
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x+60; d.PLAYER.z=z+40; d.GAME.state='play'; d.PLAYER.dead=false; d.PLAYER.health=0; d.GAME.wasted();}", [p['x'], p['z']])
        for _ in range(30):
            await asyncio.sleep(0.5)
            if await pg.evaluate("__dbg.GAME.state==='play' && !__dbg.PLAYER.dead"): break
        q = json.loads(await pg.evaluate("JSON.stringify([__dbg.PLAYER.x, __dbg.PLAYER.z, __dbg.PLAYER.health, document.getElementById('toast').innerText])"))
        d = ((q[0] - p['x']) ** 2 + (q[1] - p['z']) ** 2) ** 0.5; good = d < 6; ok = ok and good
        print(p['name'], '→ reaparece a %.1f m' % d, q[3][:60], 'OK' if good else 'MAL')
    print('HOSPITAL', 'OK' if ok else 'FALLA')
