# Coches propios (Blender) en el juego (v1.4.4): los pone en fila en la plataforma del aeropuerto, cada modelo en
# cuatro colores, y hace fotos de conjunto y de cerca de cada uno; cuenta cuántos hay aparcados de cada modelo.
# Fotos en shots/propios_<n>.jpg. Uso: herramientas/foto_propios.py
import base64, json
MODELOS = ['troceen', 'troceenC44', 'carlota', 'yaiza', 'trex', 'di55', 'jtm3', 'guancheGT', 'reniego', 'cartabon', 'tipoe', 'ltg', 'fierilla', 'piki']
COLORES = [0xf2f2f2, 0x1f4e8c, 0xb3261e, 0x1b1b1b]
async def snap(pg, name):
    open('shots/propios_%s.jpg' % name, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    info = json.loads(await pg.evaluate("""([M, C]) => JSON.stringify((() => {
      const d = __dbg; let best = null;
      for (const a of d.DATA.AW) if (a[0] === 'apron') {
        const p = a[3]; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
        for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); z0 = Math.min(z0, p[i + 1]); z1 = Math.max(z1, p[i + 1]); }
        const ar = (x1 - x0) * (z1 - z0); if (!best || ar > best.ar) best = { ar, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2 };
      }
      const cx = best.cx, cz = best.cz, out = { cx, cz, tri: {}, aparcados: {} };
      d.PLAYER.x = cx + 40; d.PLAYER.z = cz + 40; __step(2);
      M.forEach((id, i) => C.forEach((col, j) => {
        const car = new d.Car(null, col, cx + (i - 6) * 6.5, cz + j * 4.2, 0, d.VMODELS[id]); car.mode = 'parked';
        if (j === 0) { let t = 0; car.mesh.traverse((m) => { if (m.isMesh) { const g = m.geometry; t += (g.index ? g.index.count : g.attributes.position.count) / 3; } }); out.tri[id] = Math.round(t); }
      }));
      for (const s of d.PARKED.slots) if (M.includes(s.type)) out.aparcados[s.type] = (out.aparcados[s.type] || 0) + 1;
      return out; })())""", [MODELOS, COLORES]))
    print('triángulos', info['tri']); print('aparcados', info['aparcados'])
    cx, cz = info['cx'], info['cz']
    views = [('conjunto', cx + 2, cz + 34, 11, cx, cz + 5), ('lado', cx + 40, cz + 6, 6, cx, cz + 6)]
    for n, x, z, h, tx, tz in views:
        await pg.evaluate("""([x,z,h,tx,tz])=>{ const d=__dbg; __step(1); const y=d.heightAt(tx,tz); d.camera.position.set(x, y+h, z); d.camera.lookAt(tx, y+0.6, tz); d.camera.updateMatrixWorld(); }""", [x, z, h, tx, tz])
        await snap(pg, n)
    for i, m in enumerate(MODELOS):
        x = cx + (i - 6) * 6.5
        await pg.evaluate("""([x,z])=>{ const d=__dbg; __step(1); const y=d.heightAt(x,z); d.camera.position.set(x+4.2, y+1.9, z+5.4); d.camera.lookAt(x, y+0.75, z); d.camera.updateMatrixWorld(); }""", [x, cz])
        await snap(pg, m)
    print('FOTO PROPIOS OK')
