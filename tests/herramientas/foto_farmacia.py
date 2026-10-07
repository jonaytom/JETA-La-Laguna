# Fotos de la persecución de «Atraco en la farmacia»: el ladrón corriendo al coche negro (con el Corola al lado),
# la persecución y el mapa grande con el círculo amarillo y la ruta. Uso: cd tests && python run_test.py herramientas/foto_farmacia.py
import asyncio, json, os, base64
AUTO = open('prueba_misiones.py').read().split('AUTO = r"""')[1].split('"""')[0]
async def snap(pg, name):
    open('shots/' + name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    os.makedirs('shots', exist_ok=True)
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    i = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS._story.map(m=>m.title))")).index('Atraco en la farmacia')
    await pg.evaluate("(i)=>{const d=__dbg, M=d.MISSIONS; M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(10);}", i)
    for _ in range(400):
        st = await pg.evaluate("__dbg.MISSIONS.active && __dbg.MISSIONS.active.st && __dbg.MISSIONS.active.st.step")
        if st == 3: break
        a = await pg.evaluate(AUTO)
        if a in ('fight', 'dlg'): await asyncio.sleep(0.4)
        else: await pg.evaluate("__step(10, 1/30)")
    # step 3: look at the thief and the two cars from behind the player
    await pg.evaluate("__step(8, 1/30)")
    await pg.evaluate("""(()=>{const d=__dbg, S=d.MISSIONS.active.st, c=S.car; const cx=(S.t2.x+c.x)/2, cz=(S.t2.z+c.z)/2; const y=d.heightAt(cx,cz);
      d.camera.position.set(cx+9, y+5, cz+9); d.camera.lookAt(cx, y+1, cz);})()""")
    await snap(pg, 'farm_1_robo.jpg')
    for _ in range(40):
        if await pg.evaluate("__dbg.MISSIONS.active.st.step") == 4: break
        await pg.evaluate("__step(5, 1/30)")
    await pg.evaluate("(()=>{const d=__dbg, S=d.MISSIONS.active.st; d.PLAYER.x=S.mine.x+2.5; d.PLAYER.z=S.mine.z; d.enterCar(S.mine); __step(60,1/30);})()")
    await pg.evaluate("__dbg.BIGMAP.toggle()"); await asyncio.sleep(0.5)
    d = await pg.evaluate("document.getElementById('bmc').toDataURL('image/png')"); open('shots/farm_2_mapa.png', 'wb').write(base64.b64decode(d.split(',')[1]))
    await pg.evaluate("__dbg.BIGMAP.toggle()")
    print(await pg.evaluate("JSON.stringify({step:__dbg.MISSIONS.active.st.step, goal:__dbg.MISSIONS.target(), car:[__dbg.MISSIONS.active.st.car.x|0,__dbg.MISSIONS.active.st.car.z|0], obj:document.getElementById('objective').innerText})"))
    print('fotos en tests/shots/farm_*')
