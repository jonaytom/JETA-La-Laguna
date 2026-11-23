# v1.4.47: el Linguini Gold Edition por detrás (matrícula «GOLD» en su hueco, que antes dejaba ver a través del coche) y
# un Linguini normal al lado, en la plataforma del aeropuerto. Fotos en shots/gold_<vista>.jpg.
import base64
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    c = await pg.evaluate("""() => { const d = __dbg; let best = null;
      for (const a of d.DATA.AW) if (a[0] === 'apron') {
        const p = a[3]; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
        for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); z0 = Math.min(z0, p[i + 1]); z1 = Math.max(z1, p[i + 1]); }
        const ar = (x1 - x0) * (z1 - z0); if (!best || ar > best.ar) best = { ar, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2 };
      }
      const cx = best.cx, cz = best.cz; d.PLAYER.x = cx + 40; d.PLAYER.z = cz + 40; __step(2);
      new d.Car(null, null, cx, cz, 0, d.VMODELS.reventonGold).mode = 'parked';
      new d.Car(null, 0xb3261e, cx + 4, cz, 0, d.VMODELS.reventon).mode = 'parked';
      return [cx, cz]; }""")
    cx, cz = c
    # the cars face +z (heading 0): the back is towards −z
    for n, x, z, h, tx, tz in (('detras', cx + 0.6, cz - 6, 1.0, cx, cz), ('detras_cerca', cx + 0.3, cz - 3.4, 0.75, cx, cz - 2), ('lado', cx + 8, cz - 7, 1.4, cx + 2, cz)):
        await pg.evaluate("""([x,z,h,tx,tz])=>{ const d=__dbg; __step(1); const y=d.heightAt(tx,tz); d.camera.position.set(x, y+h, z); d.camera.lookAt(tx, y+0.55, tz); d.camera.updateMatrixWorld(); }""", [x, z, h, tx, tz])
        open('shots/gold_%s.jpg' % n, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO GOLD OK')
