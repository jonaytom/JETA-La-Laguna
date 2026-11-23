# v1.4.46: antes y después de la pintura con barniz (carPaintMat, 06_actors.js). Pone unos cuantos coches propios en la
# plataforma del aeropuerto, en varios colores, y los fotografía con la pintura de antes (sin barniz: rugosidad 0,3, metal
# 0,5) y con la de ahora, a mediodía y por la tarde. Con la tarjeta gráfica y calidad «alta» (nombre acabado en _gpu).
# Fotos en shots/pintura_<vista>_<antes|despues>.jpg. Uso: en una lista de pruebas (scripts/pruebas/pintura.txt).
import base64
MODELOS = ['reventon', 'reventonGold', 'guancheGT', 'troceen', 'carlota']
COLORES = [0xb3261e, 0x1f4e8c, 0x1b1b1b, 0xf2f2f2]
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    c = await pg.evaluate("""([M, C]) => { const d = __dbg; let best = null;
      for (const a of d.DATA.AW) if (a[0] === 'apron') {
        const p = a[3]; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
        for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); z0 = Math.min(z0, p[i + 1]); z1 = Math.max(z1, p[i + 1]); }
        const ar = (x1 - x0) * (z1 - z0); if (!best || ar > best.ar) best = { ar, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2 };
      }
      const cx = best.cx, cz = best.cz; d.PLAYER.x = cx + 40; d.PLAYER.z = cz + 40; __step(2);
      window.__pinturas = [];
      M.forEach((id, i) => C.forEach((col, j) => {
        const car = new d.Car(null, col, cx + (i - M.length / 2) * 6.5, cz + j * 4.6, 0.5, d.VMODELS[id]); car.mode = 'parked';
        if (car.paint && !window.__pinturas.includes(car.paint)) window.__pinturas.push(car.paint);
      }));
      __step(1); window.__pinturas.forEach((m) => (m.userData.ahora = [m.roughness, m.metalness, m.clearcoat, m.envMap, m.envMapIntensity]));
      return [cx, cz]; }""", [MODELOS, COLORES])
    cx, cz = c
    vistas = [('conjunto', cx + 3, cz + 22, 4.5, cx, cz + 6, 12), ('cerca', cx - 6.5 + 3.2, cz - 2.6, 1.4, cx - 6.5, cz + 0.6, 12),
              ('tarde', cx + 3, cz + 22, 4.5, cx, cz + 6, 18.2), ('tarde_cerca', cx - 6.5 + 3.2, cz - 2.6, 1.4, cx - 6.5, cz + 0.6, 18.2)]
    for n, x, z, h, tx, tz, tod in vistas:
        for cual in ('antes', 'despues'):
            await pg.evaluate("""([x,z,h,tx,tz,tod,antes])=>{ const d=__dbg; d.GAME.tod=tod;
              for (const m of window.__pinturas) { const [r, me, cc, env, ei] = m.userData.ahora;
                if (antes) { m.roughness = me > 0.9 ? r : 0.3; m.metalness = me > 0.9 ? me : 0.5; m.clearcoat = 0; m.envMap = null; m.envMapIntensity = 1; } else { m.roughness = r; m.metalness = me; m.clearcoat = cc; m.envMap = d.scene.userData.carEnv || env; m.envMapIntensity = ei; }
                m.needsUpdate = true; }
              __step(2); const y=d.heightAt(tx,tz); d.camera.position.set(x, y+h, z); d.camera.lookAt(tx, y+0.6, tz); d.camera.updateMatrixWorld(); }""",
                [x, z, h, tx, tz, tod, cual == 'antes'])
            open('shots/pintura_%s_%s.jpg' % (n, cual), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTO PINTURA OK', len(MODELOS) * len(COLORES))
