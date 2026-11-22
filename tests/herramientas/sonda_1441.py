# v1.4.41: sonda de dos avisos de Jonay (22-nov): 1) muerte a 300 km/h en la Autopista del Norte cerca de X 1898, Y 3225
# (¿choque con algo invisible?): un coche a 80 m/s por cada carril, en los dos sentidos, apuntando dónde choca y con qué;
# 2) dónde está la Calle Tacoronte (casa del n.º 67) y los edificios de su lado norte.
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = { runs: [] };
      const X = 1898, Z = 3225;
      const rd = d.ROADSEG.nearest(X, Z, (r) => r[0] <= 2);
      const R = d.DATA.R[rd.ri], c = R[4];
      let bi = 0, bd = 1e9; for (let i = 0; i + 3 < c.length; i += 2) { const q = Math.hypot((c[i] + c[i + 2]) / 2 - X, (c[i + 1] + c[i + 3]) / 2 - Z); if (q < bd) { bd = q; bi = i; } }
      const h0 = Math.atan2(c[bi + 2] - c[bi], c[bi + 3] - c[bi + 1]);
      out.road = { name: d.STR[R[1]], ri: rd.ri, flags: R[3], w: R[2], h0 };
      d.PLAYER.x = X; d.PLAYER.z = Z; __step(3);
      for (const dir of [0, Math.PI]) for (const off of [-9, -6, -3, 0, 3, 6, 9]) {
        const h = h0 + dir, fx = Math.sin(h), fz = Math.cos(h), rx = -fz, rz = fx;
        const sx = X - fx * 260 + rx * off, sz = Z - fz * 260 + rz * off;
        const car = new d.Car(null, 0x222222, sx, sz, h, d.VMODELS.reventon);
        car.driver = 'player'; car.mode = 'physics';
        car.y = d.heightAt(sx, sz);
        const hits = []; const o = car.onImpact.bind(car); car.onImpact = (v) => { hits.push([Math.round(car.x), Math.round(car.z), Math.round(v), Math.round(car.y * 10) / 10]); };
        const keep = d.PLAYER.health;
        for (let i = 0; i < 60 * 7; i++) { car.ctl = { thr: 1, brk: 0, steer: 0, hb: 0 }; const sp = Math.hypot(car.vx, car.vz); if (sp < 80) { car.vx += fx * (80 - sp) * 0.5; car.vz += fz * (80 - sp) * 0.5; } car.physics(1 / 60); car.sync(1 / 60); if (Math.hypot(car.x - X, car.z - Z) > 320 && i > 60) break; }
        d.PLAYER.health = keep;
        out.runs.push({ dir, off, hits: hits.slice(0, 6), end: [Math.round(car.x), Math.round(car.z)] });
        car.remove();
      }
      // Calle Tacoronte
      out.tac = [];
      d.DATA.R.forEach((R2, ri) => { if (/Tacoronte/.test(d.STR[R2[1]] || '')) out.tac.push({ ri, n: d.STR[R2[1]], c: R2[4].map((v) => Math.round(v)) }); });
      out.blds = d.BUILD.filter((b) => out.tac.some((t) => { for (let i = 0; i < t.c.length; i += 2) if (Math.hypot(t.c[i] - b.cx, t.c[i + 1] - b.cz) < 30) return true; return false; }))
        .map((b) => ({ cx: Math.round(b.cx), cz: Math.round(b.cz), h: Math.round(b.h || 0), w: Math.round(b.w || 0), d: Math.round(b.d || 0), addr: b.addr || b.name || '' })).slice(0, 80);
      return JSON.stringify(out); }"""))
    open('shots/sonda_1441.json', 'w').write(json.dumps(r))
    print(json.dumps(r['road']))
    for x in r['runs']: print(x)
    print('tac', [(t['ri'], t['n'], t['c'][:4], t['c'][-2:]) for t in r['tac']])
    print('SONDA 1441 OK')
