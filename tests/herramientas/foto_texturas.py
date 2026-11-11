# Antes y después de las texturas de Poly Haven puestas por posición (v1.4.1): busca en la escena los materiales marcados
# (userData.texw: cal, enlucido, iglesia, canteria, piedra), toma un punto de una pared de cada uno y la fotografía con
# el grano de la foto apagado (__dbg.TEXW = 0) y encendido. Fotos en shots/tex_<marca>_<n>_antes.jpg y _despues.jpg.
# Uso: herramientas/foto_texturas.py [fotos por marca] [marcas separadas por comas]
import base64, json, sys
async def run(pg):
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    tags = sys.argv[3].split(',') if len(sys.argv) > 3 else ['cal', 'iglesia', 'canteria', 'enlucido']
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2); if (__dbg.lodShowAll) __dbg.lodShowAll();})()")
    pts = json.loads(await pg.evaluate("""([n, tags]) => {
      const out = {}, V = new __dbg.THREE.Vector3(), N = new __dbg.THREE.Vector3(), M3 = new __dbg.THREE.Matrix3();
      let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const byTag = {};
      __dbg.scene.updateMatrixWorld(true);
      __dbg.scene.traverse((o) => {
        if (!o.isMesh || !o.geometry || !o.geometry.attributes.position) return;
        for (const m of [].concat(o.material)) { const t = m && m.userData && m.userData.texw; if (t && tags.includes(t)) (byTag[t] = byTag[t] || []).push(o); }
      });
      for (const t of tags) {
        const L = byTag[t] || []; out[t] = { mallas: L.length, p: [] };
        for (let tries = 0; tries < 400 && out[t].p.length < n && L.length; tries++) {
          const o = L[Math.floor(rnd() * L.length)], g = o.geometry, P = g.attributes.position, NN = g.attributes.normal;
          if (!NN) continue;
          const i = Math.floor(rnd() * P.count);
          V.fromBufferAttribute(P, i).applyMatrix4(o.matrixWorld);
          M3.getNormalMatrix(o.matrixWorld); N.fromBufferAttribute(NN, i).applyMatrix3(M3).normalize();
          if (Math.abs(N.y) > 0.3) continue;
          if (out[t].p.some((q) => Math.hypot(q[0] - V.x, q[2] - V.z) < 150)) continue;
          out[t].p.push([V.x, V.y, V.z, N.x, N.z]);
        }
      }
      return JSON.stringify(out);
    }""", [n, tags]))
    for t in tags:
        print(t, 'mallas', pts[t]['mallas'], 'puntos', len(pts[t]['p']))
        for i, (x, y, z, nx, nz) in enumerate(pts[t]['p']):
            d = 9 if t in ('iglesia', 'canteria') else 4
            for k, on in (('antes', 0), ('despues', 1)):
                await pg.evaluate("""([x,y,z,nx,nz,d,on])=>{ const D=__dbg; D.TEXW.value=on; D.PLAYER.x=x+nx*3; D.PLAYER.z=z+nz*3; __step(3);
                  const l=Math.hypot(nx,nz)||1, cx=x+nx/l*d, cz=z+nz/l*d; D.camera.position.set(cx, Math.max(D.heightAt(cx,cz)+1.7, y+0.3), cz);
                  D.camera.lookAt(x, y, z); D.camera.updateMatrixWorld(); if (D.updateCityLOD) D.updateCityLOD(true); }""", [x, y, z, nx, nz, d, on])
                open('shots/tex_%s_%d_%s.jpg' % (t, i, k), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
            print('foto', t, i, round(x), round(z))
    await pg.evaluate("__dbg.TEXW.value=1")
    print('FOTO TEXTURAS OK')
