# Coches propios (Blender) en el juego (v1.4.4): los pone en fila en la plataforma del aeropuerto, cada modelo en
# cuatro colores, y hace fotos de conjunto y de cerca de cada uno; cuenta cuántos hay aparcados de cada modelo.
# Fotos en shots/propios_<n>.jpg. Uso: herramientas/foto_propios.py
import base64, json
MODELOS = ['troceen', 'troceenC44', 'carlota', 'yaiza', 'trex', 'di55', 'jtm3', 'guancheGT', 'reniego', 'cartabon', 'tipoe', 'ltg', 'fierilla', 'piki', 'oalgo', 'gomera', 'teypan', 'chayan', 'olecorsa', 'mocco', 'tyaiza', 'helado', 'dsendero', 'beluga', 'vivita', 'newton3', 'cactus', 'clip', 'nano', 'pimbo', 'torson', 'queguay', 'mphs', 'vengator', 'ficus', 'mepierdo', 'padelgti', 'pantera', 'hubli', 'reventon', 'koala', 'compi', 'cassi', 'traficc', 'seta128', 'triplon', 'hilos', 'navarra', 'policia', 'policia2', 'policia3', 'ambulancia', 'daily', 'daily2', 'canter', 'sprinter', 'grua', 'bomberos', 'taxi', 'taxi2', 'taxi3', 'basura', 'guagua']
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
        const car = new d.Car(null, col, cx + (i - M.length / 2) * 6.5, cz + j * 4.2, 0, d.VMODELS[id]); car.mode = 'parked';
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
        x = cx + (i - len(MODELOS) / 2) * 6.5
        await pg.evaluate("""([x,z])=>{ const d=__dbg; __step(1); const y=d.heightAt(x,z); d.camera.position.set(x+4.2, y+1.9, z+5.4); d.camera.lookAt(x, y+0.75, z); d.camera.updateMatrixWorld(); }""", [x, cz])
        await snap(pg, m)
    # v1.4.15: a real parked car (InstancedMesh, the template of buildParked) up close: its wheels must be the model's own.
    # The position is taken from a visible instance of one of our own models' chunks (not from the slot list)
    s = json.loads(await pg.evaluate("""() => { const d = __dbg, M = new d.THREE.Matrix4(), p = new d.THREE.Vector3(), q = new d.THREE.Quaternion(), sc = new d.THREE.Vector3();
      const chunks = d.PARKED.chunks.filter((c) => c.lo);
      for (const c of chunks) { const m = c.mesh; for (let i = 0; i < m.count; i++) { m.getMatrixAt(i, M); M.decompose(p, q, sc); if (sc.x > 0.5) {
        const e = new d.THREE.Euler().setFromQuaternion(q); return JSON.stringify({ x: p.x, y: p.y, z: p.z, h: e.y, n: chunks.length }); } } }
      return JSON.stringify(null); }"""))
    print('aparcado', s)
    if s:
        for nombre, lado in (('aparcado', 1), ('aparcado_detras', -1)):
            await pg.evaluate("""([x, y, z, h, k]) => { const d = __dbg; d.PLAYER.x = x + 30; d.PLAYER.z = z + 30; __step(3);
              const fx = Math.sin(h) * k, fz = Math.cos(h) * k, sx = Math.cos(h), sz = -Math.sin(h);  // along the car (k: front/back) and across
              d.camera.position.set(x + fx * 4.2 + sx * 2.2, y + 0.9, z + fz * 4.2 + sz * 2.2);
              d.camera.lookAt(x + fx * 1.0 + sx * 0.6, y + 0.4, z + fz * 1.0 + sz * 0.6); d.camera.updateMatrixWorld();
              for (const c of d.PARKED.chunks) if (c.lo) { c.mesh.visible = true; c.mesh.geometry = Math.hypot(c.x - x, c.z - z) < 80 ? c.hi : c.lo; } }""", [s['x'], s['y'], s['z'], s['h'], lado])
            await snap(pg, nombre)
    print('FOTO PROPIOS OK')
