# Sonda (v0.92, Jonay: «la boca del túnel de Camino el Vallado / San Honorato sigue siendo una locura, hay demasiadas
# cosas cruzándose»): fotos de la boca desde arriba y a la altura de los ojos, y las calles de alrededor con su hondura.
import asyncio, os, base64, json
C = (-952, 98)  # the north mouth (X −959 Z 108 in Jonay's capture)
V = [('cenital', -952, 98, 45, -951.9, 98.1), ('cenital_amplia', -945, 85, 90, -944.9, 85.1),
     ('desde_norte', -975, 128, 4, -945, 80), ('desde_norte_ojos', -963, 114, 1.7, -945, 85),
     ('desde_rotonda', -995, 118, 6, -952, 100), ('desde_este', -925, 108, 5, -955, 95),
     ('dentro', -944, 88, 1.7, -930, 66), ('boca_sur', -915, 40, 4, -935, 72)]
FREE = """([x, z, h, tx, tz]) => { const d = __dbg, P = d.PLAYER; P.x = x + 30; P.z = z + 30; __step(3); const g = d.heightAt(x, z), gt = d.heightAt(tx, tz);
  // the camera at h metres over the lowest road surface below (inside the cutting the ground is the road)
  const low = d.lowAt ? d.lowAt(x, z, g + 1) : null, base = h < 10 && low && low.y < g - 0.5 ? low.y : g;
  const lt = d.lowAt ? d.lowAt(tx, tz, gt + 1) : null, bt = h < 10 && lt && lt.y < gt - 0.5 ? lt.y : gt;
  d.camera.position.set(x, base + h, z); d.camera.lookAt(tx, bt + (h < 10 ? 1 : 0), tz); return { suelo: +g.toFixed(1), base: +base.toFixed(1) }; }"""
ROADS = """(() => { const d = __dbg, R = d.DATA.R, out = [];
  R.forEach((rd, ri) => { if (rd[0] > 13) return; const c = rd[4]; let near = 1e9; for (let i = 0; i < c.length; i += 2) near = Math.min(near, Math.hypot(c[i] + 952, c[i + 1] - 98));
    if (near > 45) return; let L = 0; for (let i = 0; i + 3 < c.length; i += 2) L += Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]);
    const ys = [0, 0.25, 0.5, 0.75, 1].map((f) => { let s = L * f, acc = 0; for (let i = 0; i + 3 < c.length; i += 2) { const l = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); if (acc + l >= s) { const t = (s - acc) / (l || 1), x = c[i] + (c[i + 2] - c[i]) * t, z = c[i + 1] + (c[i + 3] - c[i + 1]) * t; return [Math.round(x), Math.round(z), +(d.ROADY[ri](s, x, z) - d.heightAt(x, z)).toFixed(1)]; } acc += l; } return null; });
    out.push({ ri, tipo: rd[0], nombre: rd[1] >= 0 ? d.STR[rd[1]] : '', ancho: rd[2], flags: rd[3], dep: d.DEP.has(ri), raise: d.RAISE.has(ri), largo: Math.round(L), puntos: ys }); });
  return JSON.stringify(out); })()"""
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    os.makedirs('shots', exist_ok=True)
    for r in json.loads(await pg.evaluate(ROADS)): print('calle', r)
    for name, x, z, h, tx, tz in V:
        r = await pg.evaluate(FREE, [x, z, h, tx, tz]); img = await pg.evaluate("window.__snap()")
        open('shots/vallado_%s.jpg' % name, 'wb').write(base64.b64decode(img.split(',')[1])); print('foto vallado_%s' % name, r)
    print('errores', errs[:3]); print('SONDA VALLADO', 'OK' if not errs else 'FALLA')
