# v1.4.22: fotos para revisar el rifle de agua al apuntar (de lado, de frente, la vista del jugador con la mira y
# disparando el chorro) y un campo de fútbol con su valla nueva. Fotos en shots/r1422_<n>.jpg.
import base64, json
async def snap(pg, name):
    open('shots/r1422_%s.jpg' % name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    # 1) the rifle, aimed
    await pg.evaluate("""() => { const d = __dbg; d.giveRifle(); d.RIFLE.out = true; d.RIFLE.water = d.RIFLE.max; d.WEAPON.out = false;
      d.CAM.yaw = d.PLAYER.h; d.CAM.pitch = -0.05; d.WEAPON.aiming = true; __step(20); }""")
    await snap(pg, 'vista_apuntando')
    for name, fwd, side, up in (('lado', 0.4, 2.2, 1.45), ('frente', 2.4, 0.9, 1.5), ('detras', -2.0, 1.0, 1.9)):
        await pg.evaluate("""([f, s, u]) => { const d = __dbg; d.WEAPON.aiming = true; __step(1); const p = d.PLAYER, fx = Math.sin(p.h), fz = Math.cos(p.h), rx = -fz, rz = fx;
          d.camera.position.set(p.x + fx * f + rx * s, p.y + u, p.z + fz * f + rz * s); d.camera.lookAt(p.x + fx * 0.3, p.y + 1.35, p.z + fz * 0.3); d.camera.updateMatrixWorld(); }""", [fwd, side, up])
        await snap(pg, 'rifle_' + name)
    await pg.evaluate("""() => { const d = __dbg; d.WEAPON.aiming = true; d.RIFLE.firing = true; __step(45); }""")
    await snap(pg, 'chorro')
    await pg.evaluate("""() => { const d = __dbg; __step(1); const p = d.PLAYER, fx = Math.sin(p.h), fz = Math.cos(p.h);
      d.camera.position.set(p.x - fz * 7 + fx * 4, p.y + 3, p.z + fx * 7 + fz * 4); d.camera.lookAt(p.x + fx * 5, p.y + 1, p.z + fz * 5); d.camera.updateMatrixWorld(); }""")
    await snap(pg, 'chorro_lado')
    await pg.evaluate("() => { const d = __dbg; d.RIFLE.firing = false; d.WEAPON.aiming = false; }")
    # 2) a fenced football pitch, from outside its gate side
    info = json.loads(await pg.evaluate("""() => { const d = __dbg; const P = d.SPORTS.pitches.filter((p) => p.len * p.wid >= 1700 && Math.hypot(p.cx - d.PLAYER.x, p.cz - d.PLAYER.z) < 2500)
        .sort((a, b) => Math.hypot(a.cx - d.PLAYER.x, a.cz - d.PLAYER.z) - Math.hypot(b.cx - d.PLAYER.x, b.cz - d.PLAYER.z));
      return JSON.stringify(P.slice(0, 2).map((p) => ({ cx: p.cx, cz: p.cz, a: p.F.W(p.F.u0 - 14, p.F.v0 - 14), b: p.F.W((p.F.u0 + p.F.u1) / 2, p.F.v1 + 20) }))); }"""))
    for i, p in enumerate(info):
        for k, cam in (('esquina', p['a']), ('lado', p['b'])):
            await pg.evaluate("""([x, z, cx, cz]) => { const d = __dbg; d.PLAYER.x = x; d.PLAYER.z = z; __step(3); const y = d.heightAt(x, z);
              d.camera.position.set(x, y + 7, z); d.camera.lookAt(cx, d.heightAt(cx, cz) + 1, cz); d.camera.updateMatrixWorld(); __step(0); }""", [cam[0], cam[1], p['cx'], p['cz']])
            await snap(pg, 'campo%d_%s' % (i, k))
    # 3) the street at night (more light from lamps, windows and signs)
    await pg.evaluate("() => { const d = __dbg; d.PLAYER.x = 0; d.PLAYER.z = 0; d.GAME.tod = 23; __step(4); d.GAME.tod = 23; __step(1); }")
    await snap(pg, 'noche')
    await pg.evaluate("() => { const d = __dbg; const p = d.PLAYER; d.camera.position.set(p.x + 6, p.y + 14, p.z + 6); d.camera.lookAt(p.x + 30, p.y, p.z + 30); d.camera.updateMatrixWorld(); }")
    await snap(pg, 'noche_alto')
    print('FOTO 1422 OK')
