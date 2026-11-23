# v1.4.43: sonda — ¿por qué la r187 de three.js dibuja más? Mismo sitio y misma cámara: llamadas, triángulos y programas
# con sombras y sin ellas, y los programas por tipo de material. Guarda shots/sonda_dibujo_r<versión>.json.
import json, os
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, R = d.renderer, P = d.PLAYER, out = { rev: d.THREE ? d.THREE.REVISION : null, sitios: [] };
      for (const [x, z, h] of [[0, 0, 0], [-400, 300, 1.2], [1990, 1290, 3.1]]) {
        if (P.car) d.exitCar(); P.x = x; P.z = z; P.h = h; d.CAM.yaw = h; __step(30);
        // v1.4.43: __step does not draw: __snap does (background + city), and the shadow pass when the map needs it
        const one = (sh) => { const e = R.shadowMap.enabled; R.shadowMap.enabled = sh; R.shadowMap.needsUpdate = true; R.info.autoReset = false; R.info.reset(); window.__snap(); const res = { llamadas: R.info.render.calls, triangulos: R.info.render.triangles }; R.info.autoReset = true; R.shadowMap.enabled = e; return res; };
        out.sitios.push({ x, z, con_sombras: one(true), sin_sombras: one(false) });
      }
      const progs = {}; for (const p of (R.info.programs || [])) { const k = p.name || p.type || '?'; progs[k] = (progs[k] || 0) + 1; }
      out.programas = R.info.programs ? R.info.programs.length : null; out.por_tipo = progs;
      out.sombras = { tipo: R.shadowMap.type, auto: R.shadowMap.autoUpdate };
      return JSON.stringify(out); }"""))
    print(json.dumps(r, ensure_ascii=False))
    os.makedirs('shots', exist_ok=True)
    json.dump(r, open('shots/sonda_dibujo_r%s.json' % r.get('rev'), 'w'), ensure_ascii=False, indent=1)
    print('SONDA DIBUJO OK')
