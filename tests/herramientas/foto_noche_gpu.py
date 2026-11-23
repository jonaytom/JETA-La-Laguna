# v1.4.47: el cielo de noche (estrellas) y su reflejo en la pintura: el Linguini Gold y un coche negro en la plataforma
# del aeropuerto, a la 1:30, vistos de cerca con el cielo detrás y desde arriba (el capó refleja el cielo).
# Con la tarjeta gráfica y calidad «alta». Fotos en shots/noche_<vista>.jpg.
import base64
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=1.5; __step(2);})()")
    c = await pg.evaluate("""() => { const d = __dbg; let best = null;
      for (const a of d.DATA.AW) if (a[0] === 'apron') {
        const p = a[3]; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
        for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); z0 = Math.min(z0, p[i + 1]); z1 = Math.max(z1, p[i + 1]); }
        const ar = (x1 - x0) * (z1 - z0); if (!best || ar > best.ar) best = { ar, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2 };
      }
      const cx = best.cx, cz = best.cz; d.PLAYER.x = cx + 40; d.PLAYER.z = cz + 40; d.GAME.tod = 1.5; __step(3);
      new d.Car(null, null, cx, cz, 0.6, d.VMODELS.reventonGold).mode = 'parked';
      new d.Car(null, 0x111111, cx + 4.5, cz + 1, 0.6, d.VMODELS.carlota).mode = 'parked';
      return [cx, cz]; }""")
    cx, cz = c
    for n, x, z, h, tx, tz, th in (('cielo', cx - 5, cz - 6, 1.2, cx + 8, cz + 14, 9), ('capo', cx - 3.2, cz - 2.6, 2.6, cx + 0.3, cz + 0.4, 0.5), ('negro', cx + 1.6, cz - 2.2, 2.4, cx + 4.6, cz + 1.2, 0.5)):
        await pg.evaluate("""([x,z,h,tx,tz,th])=>{ const d=__dbg; d.GAME.tod=1.5; __step(2); const y=d.heightAt(tx,tz); d.camera.position.set(x, d.heightAt(x,z)+h, z); d.camera.lookAt(tx, y+th, tz); d.camera.updateMatrixWorld(); }""", [x, z, h, tx, tz, th])
        open('shots/noche_%s.jpg' % n, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO NOCHE OK')
