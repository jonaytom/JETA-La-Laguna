# Sonda (v0.91, Jonay: «mejorar la autopista separando los sentidos, y la carretera general paralela»): fotos de la TF-5
# desde el asiento del conductor y desde arriba en varios puntos (entre San Lázaro y San Benito, con la Calle Espinero
# al lado; y al oeste, donde las dos calzadas casi se tocan), y qué hay entre las calzadas (mediana, bionda, nada).
import asyncio, os, base64, json
V = [ # name, x, which carriageway at that x (0 = the one with the larger z, 1 = the other), direction (+1 / -1 along x), lane offset to the right (m)
    ('espinero_e', -1500, 0, 1, 2.2), ('espinero_w', -1500, 1, -1, 2.2), ('sanbenito', -1100, 0, 1, 2.2),
    ('sanlazaro', -1700, 0, 1, 2.2), ('oeste', -2000, 0, 1, 2.2), ('oeste_junto', -2400, 0, 1, 2.2)]
JS = """([x, k, dir, off, mode]) => { const d = __dbg, R = d.DATA.R;
  // the motorway carriageways that cross this x (the map's road numbers change with each merge: found by type)
  const hits = []; R.forEach((rd, ri) => { if (rd[0] !== 0) return; const c = rd[4]; let s = 0;
    for (let i = 0; i + 3 < c.length; i += 2) { const ax = c[i], az = c[i + 1], bx = c[i + 2], bz = c[i + 3], L = Math.hypot(bx - ax, bz - az);
      if ((ax - x) * (bx - x) <= 0 && bx !== ax) { const t = (x - ax) / (bx - ax), sg = Math.sign(bx - ax); hits.push({ ri, x, z: az + (bz - az) * t, ux: (bx - ax) / L * sg * dir, uz: (bz - az) / L * sg * dir, s: s + L * t }); } s += L; } });
  hits.sort((a, b) => b.z - a.z); const best = hits[k]; if (!best) return { hits: hits.length };
  const ri = best.ri, P = d.PLAYER; P.x = best.x; P.z = best.z; __step(3);
  const y = d.ROADY[ri](best.s, best.x, best.z), rx = -best.uz, rz = best.ux; // right of the travel direction
  const cx = best.x + rx * off, cz = best.z + rz * off;
  if (mode === 'top') { d.camera.position.set(cx - best.ux * 25, y + 38, cz - best.uz * 25); d.camera.lookAt(cx + best.ux * 25, y, cz + best.uz * 25); }
  else { d.camera.position.set(cx - best.ux * 6, y + 1.6, cz - best.uz * 6); d.camera.lookAt(cx + best.ux * 40, y + 1.2, cz + best.uz * 40); }
  return { ri, x: Math.round(best.x), z: Math.round(best.z), y: +y.toFixed(1), calzadas: hits.map((h) => Math.round(h.z)) }; }"""
# free views: name, eye x, z, height, look-at x, z (v0.91: the other things of «Calles, túneles…»)
P = [('bionda_cerca', -1162, -32, 1.6, -1125, -15), ('bionda_alto', -1150, -22, 12, -1128, -14), ('barrera_cerca', -1441, -102, 1.6, -1470, -107), ('barrera_alto', -1436, -96, 14, -1458, -103), ('vallado_boca', -962, 116, 3, -935, 60), ('vallado_alto', -990, 140, 40, -945, 85), ('vallado_tunel', -948, 95, 2, -926, 58),
     ('huc_rampa', 2190, 3300, 3, 2230, 3325), ('huc_rampa_alto', 2180, 3280, 35, 2215, 3315),
     ('adelantado_marcos', 105, -45, 2, 60, -10), ('casco_marcos', -60, -230, 2, -10, -150)]
FREE = """([x, z, h, tx, tz]) => { const d = __dbg, P = d.PLAYER; P.x = x; P.z = z; __step(3); const g = d.heightAt(x, z), gt = d.heightAt(tx, tz);
  d.camera.position.set(x, g + h, z); d.camera.lookAt(tx, gt + Math.min(h, 3) * 0.5, tz); return { suelo: +g.toFixed(1) }; }"""
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=11; __step(2);})()")
    os.makedirs('shots', exist_ok=True)
    for name, x, ri, dr, off in V:
        for mode in ('ojos', 'top'):
            r = await pg.evaluate(JS, [x, ri, dr, off, mode])
            img = await pg.evaluate("window.__snap()")
            open('shots/tf5_%s_%s.jpg' % (name, mode), 'wb').write(base64.b64decode(img.split(',')[1]))
            print('foto tf5_%s_%s' % (name, mode), r)
    for name, x, z, h, tx, tz in P:
        r = await pg.evaluate(FREE, [x, z, h, tx, tz]); img = await pg.evaluate("window.__snap()")
        open('shots/tf5_%s.jpg' % name, 'wb').write(base64.b64decode(img.split(',')[1])); print('foto tf5_%s' % name, r)
    med = json.loads(await pg.evaluate("JSON.stringify(__dbg.MEDIANS)"))
    print('medianas', len(med), 'new jersey', sum(1 for m in med if m[0] == 2), 'biondas', sum(1 for m in med if m[0] == 3))
    for name, x0, x1 in [('tf5 x -2500..-800', -2500, -800)]:
        near = [m for m in med if x0 <= m[1] <= x1 and -300 <= m[2] <= 250]
        print(name, near[:40])
    hs = json.loads(await pg.evaluate("JSON.stringify([[-1442,-98],[-1442,-91],[-1442,-105]].map(([x,z])=>[x,z,+__dbg.heightAt(x,z).toFixed(2), __dbg.ROADSEG.nearest(x,z) ? __dbg.ROADSEG.nearest(x,z).d.toFixed(1) : null]))"))
    print('alturas junto a la barrera', hs)
    nj = [m for m in med if m[0] == 2 and -2500 <= m[1] <= -800 and -300 <= m[2] <= 250]; largo = sum(m[5] for m in nj) * 3
    print('metros de New Jersey en la TF-5', largo)
    print('errores', errs[:3]); print('SONDA TF5', 'OK' if not errs and largo > 900 else 'FALLA')
