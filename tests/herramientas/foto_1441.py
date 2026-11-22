# v1.4.41: fotos de la casa de la C. Tacoronte 67 (de frente desde la acera de enfrente, subiendo la calle, el portón
# cerrado, abierto con el Linguini Gold Edition dentro, y de noche). Fotos en shots/f1441_<n>.jpg.
import base64, json
async def snap(pg, name):
    open('shots/f1441_%s.jpg' % name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def cam(pg, fx, fz, up, tx, tz, ty):
    await pg.evaluate("""([a, b, u, c, e, t]) => { const d = __dbg, T = d.tac67(), [x, z] = T.toW(a, b), [lx, lz] = T.toW(c, e);
      const g = d.heightAt(...T.toW(2.55, 0.5));
      d.camera.position.set(x, g + u, z); d.camera.lookAt(lx, g + t, lz); d.camera.updateMatrixWorld(); __step(0); }""", [fx, fz, up, tx, tz, ty])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    await pg.evaluate("""() => { const d = __dbg, T = d.tac67(), [x, z] = T.toW(0, 6);
      if (d.GARAJE.open) { const S = d.GARAJE.state; d.PLAYER.x = S.button[0]; d.PLAYER.z = S.button[1]; __step(2); d.GARAJE.use(); __step(150); }
      const gc = d.GARAJE.car, S2 = d.GARAJE.state; if (gc) { gc.x = S2.spot[0]; gc.z = S2.spot[1]; gc.h = S2.h; gc.vx = gc.vz = 0; gc.driver = null; gc.sync(1 / 60); }
      d.PLAYER.x = x; d.PLAYER.z = z; d.GAME.tod = 11; __step(6); d.GAME.tod = 11; __step(2); }""")
    await cam(pg, -2, 16, 1.7, 0, 0, 5)
    await snap(pg, 'frente')
    await cam(pg, -26, 9, 1.7, 0, 0, 4)
    await snap(pg, 'subiendo')
    await cam(pg, 14, 8, 1.7, 0, 0, 4)
    await snap(pg, 'bajando')
    await cam(pg, 2.5, 7.5, 1.6, 2.5, 0, 1.4)
    await snap(pg, 'porton_cerrado')
    r = await pg.evaluate("""() => { const d = __dbg, S = d.GARAJE.state; d.PLAYER.x = S.button[0]; d.PLAYER.z = S.button[1]; __step(3);
      const p = d.GARAJE.prompt(); d.GARAJE.use(); __step(60); return JSON.stringify({ p, a: d.GARAJE.angle }); }""")
    await cam(pg, 2.5, 7.5, 1.6, 2.5, 0, 1.4)
    await snap(pg, 'porton_abriendo')
    await pg.evaluate("() => __step(90)")
    await cam(pg, 2.5, 7.5, 1.6, 2.5, -2, 1.0)
    await snap(pg, 'porton_abierto')
    await cam(pg, 3.6, 1.2, 1.5, 2.2, -4, 0.6)
    await snap(pg, 'dentro')
    await pg.evaluate("() => { const d = __dbg; d.GAME.tod = 22.5; __step(4); d.GAME.tod = 22.5; __step(1); }")
    await cam(pg, 1, 12, 1.7, 1, 0, 3)
    await snap(pg, 'noche')
    # the Niza Nano remade (new mesh, 22-nov), in front of the house by day
    await pg.evaluate("""() => { const d = __dbg, T = d.tac67(); d.GAME.tod = 11; __step(2); d.GAME.tod = 11; const [x, z] = T.toW(-6, 8.5);
      window.__nano = new d.Car(null, 0x2a5bd7, x, z, T.ang + Math.PI / 2, d.VMODELS.nano); window.__nano.y = d.heightAt(x, z); __step(2); }""")
    await cam(pg, -1.5, 12.5, 1.5, -6, 8.5, 0.7)
    await snap(pg, 'nano_lado')
    await cam(pg, -10.5, 11, 1.4, -6, 8.5, 0.7)
    await snap(pg, 'nano_frente')
    print(r)
    print('FOTO 1441 OK')
