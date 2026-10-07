# Continuidad de las misiones (v0.56): guardar a mitad de misión y cargar, reintentar tras fallar y partidas antiguas
# que ya habían terminado la historia (más corta) antes de las misiones nuevas.
# Uso: cd tests && python run_test.py prueba_misiones_guardado.py
import asyncio, json, os
AUTO = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'prueba_misiones.py')).read().split('AUTO = r"""')[1].split('"""')[0]
ST = "JSON.stringify({act: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, m: __dbg.MISSIONS.getState(), blips: __dbg.MISSIONS.blips().length, lawful: __dbg.WEAPON.lawful, tg: __dbg.WEAPON.targets.length, dlg: __dbg.DLG.open, toast: document.getElementById('toast').innerText.slice(0,120)})"

async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    i = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS._story.map(m=>m.title))")).index('Atraco en la farmacia')
    start = "(i)=>{const d=__dbg, M=d.MISSIONS; if (d.PLAYER.car) d.exitCar(); M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(10);}"
    ok = True
    # 1) save in the middle of the car chase and load
    await pg.evaluate(start, i)
    for _ in range(300):
        a = await pg.evaluate(AUTO)
        if a == 'damage': break
        if a in ('fight', 'dlg'): await asyncio.sleep(0.4)
        else: await pg.evaluate("__step(15, 1/30)")
    print('a mitad:', await pg.evaluate(ST))
    await pg.evaluate("__dbg.SAVE.save('3','prueba')")
    await pg.evaluate("__dbg.SAVE.open('save')"); await asyncio.sleep(0.5)
    await pg.evaluate("document.querySelector(\"[data-load='3']\").click()"); await asyncio.sleep(2.5)
    await pg.evaluate("__step(5)")
    s = json.loads(await pg.evaluate(ST)); print('cargada:', s)
    left = await pg.evaluate("JSON.stringify(__dbg.CARS.filter(c=>c.mission && !c.dead && c!==__dbg.PLAYER.car).length)")
    c1 = s['act'] is None and s['m']['story'] == i and s['blips'] > 0 and not s['lawful'] and s['tg'] == 0 and left == '0' and 'a medias' in s['toast']
    print('1 guardar a mitad:', 'OK' if c1 else 'FALLA', '(coches de misión sueltos: %s)' % left); ok &= c1
    # 2) retry after a failure
    await pg.evaluate("(()=>{__dbg.GAME.state='play'; __step(5);})()")
    await pg.evaluate(start, i); await pg.evaluate(AUTO); await pg.evaluate("__step(5)")
    await pg.evaluate("(()=>{__dbg.MISSIONS.fail('prueba de reintento'); __dbg.PLAYER.x += 30;})()"); await asyncio.sleep(3.6); await pg.evaluate("__step(3)")
    s = json.loads(await pg.evaluate(ST)); print('tras fallar:', s)
    await pg.evaluate("document.getElementById('dlgopt0').click()"); await asyncio.sleep(0.3); await pg.evaluate("__step(5)")
    s2 = json.loads(await pg.evaluate(ST))
    c2 = s['dlg'] and s2['act'] == 'Atraco en la farmacia'
    print('2 reintentar:', 'OK' if c2 else 'FALLA', s2['act']); ok &= c2
    await pg.evaluate("(()=>{__dbg.MISSIONS.fail('fin', true); __dbg.PLAYER.x += 30;})()"); await asyncio.sleep(0.3)
    # 3) an old save that had finished the six-mission story goes on with the new ones
    await pg.evaluate("__dbg.MISSIONS.setState({v:2, story:6, storyDone:true, side:1, sideOpen:true, gang:{formed:true, name:'Los Chopas', members:['boca']}})"); await pg.evaluate("__step(3)")
    s = json.loads(await pg.evaluate(ST))
    c3 = not s['m']['storyDone'] and s['m']['story'] == 6 and s['blips'] > 0
    print('3 partida antigua:', 'OK' if c3 else 'FALLA', s['m']); ok &= c3
    print('ERRORES JS:', errs[:5])
    print('CONTINUIDAD', 'OK' if ok and not errs else 'FALLA')
