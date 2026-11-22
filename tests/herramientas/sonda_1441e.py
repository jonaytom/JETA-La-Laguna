# v1.4.41: sonda (e) — las esquinas del coche frente al tablero en el golpe; en la Autopista del Norte (X 1898, Y 3225) a 80 m/s: pila de la llamada a onImpact
# y estado del coche (cubierta, bajo tierra, trinchera, segmentos cerca) en el momento del golpe.
import json
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = [];
      const X = 1898, Z = 3225;
      const rd = d.ROADSEG.nearest(X, Z, (r) => r[0] <= 2), c = d.DATA.R[rd.ri][4];
      let bi = 0, bd = 1e9; for (let i = 0; i + 3 < c.length; i += 2) { const q = Math.hypot((c[i] + c[i + 2]) / 2 - X, (c[i + 1] + c[i + 3]) / 2 - Z); if (q < bd) { bd = q; bi = i; } }
      const h0 = Math.atan2(c[bi + 2] - c[bi], c[bi + 3] - c[bi + 1]);
      d.PLAYER.x = X; d.PLAYER.z = Z; __step(3);
      for (const off of [-6, 0]) {
        const h = h0, fx = Math.sin(h), fz = Math.cos(h), rx = -fz, rz = fx;
        const sx = X - fx * 260 + rx * off, sz = Z - fz * 260 + rz * off;
        const car = new d.Car(null, 0x222222, sx, sz, h, d.VMODELS.reventon);
        car.driver = 'player'; car.mode = 'physics'; car.y = d.heightAt(sx, sz);
        const keep = d.PLAYER.health; let prev = null;
        car.onImpact = (v) => { if (out.length < 8) out.push({ off, v: Math.round(v), x: car.x, z: car.z, y: car.y, g: d.heightAt(car.x, car.z), onDeck: car.onDeck, wasDeck: car.wasDeck, low: !!car.low,
            ds: d.deckSide(car.x, car.z, car.y - 0.17), deck: d.deckAt(car.x, car.z, car.y - 1.3, true, 2.2), prev,
            seg: d.COL.nearSeg(car.x, car.z, 3), corners: [1, -1].map((sg) => { const o = car.T.L / 2 - 0.4, px = prev.x + Math.sin(car.h) * o * sg, pz = prev.z + Math.cos(car.h) * o * sg;
              const sd = d.deckSide(px, pz, prev.y - 0.17); return sd ? { sg, px, pz, d: sd.d, hw: sd.hw, y: sd.y, g: d.heightAt(px, pz), same: sd.deck === (d.deckSide(prev.x, prev.z, prev.y - 0.17) || {}).deck, w: sd.deck && sd.deck.w, n: sd.deck && sd.deck.pts.length,
                pts: sd.deck && sd.deck.pts.filter((q) => Math.hypot(q[0] - px, q[1] - pz) < 60).map((q) => q.map((v) => Math.round(v * 10) / 10)) } : null; }), stack: (new Error().stack || '').split('\\n').slice(1, 6).join(' | ') }); };
        for (let i = 0; i < 60 * 7; i++) { prev = { x: car.x, z: car.z, y: car.y, onDeck: car.onDeck, low: !!car.low, vy: car.vy };
          car.ctl = { thr: 1, brk: 0, steer: 0, hb: 0 }; const sp = Math.hypot(car.vx, car.vz); if (sp < 80) { car.vx += fx * (80 - sp) * 0.5; car.vz += fz * (80 - sp) * 0.5; } car.physics(1 / 60); car.sync(1 / 60); if (Math.hypot(car.x - X, car.z - Z) > 320 && i > 60) break; }
        d.PLAYER.health = keep; car.remove();
      }
      return JSON.stringify(out); }"""))
    for x in r: print(json.dumps(x))
    print('SONDA 1441e OK')
