# v1.4.41 (Jonay, 22-nov): 1) la muerte a 300 km/h en la Autopista del Norte (X 1898, Y 3225: la baranda de una rampa que
# se junta con la autopista frenaba en seco el coche); 2) menos giro a gran velocidad; 3) la gente no camina por puentes
# ni por calles elevadas; 4) el Linguini Gold Edition en el garaje de la C. Tacoronte 67, con su botón.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = {};
      // 1) 80 m/s along every lane of the motorway, both ways
      const X = 1898, Z = 3225;
      const rd = d.ROADSEG.nearest(X, Z, (r) => r[0] <= 2), c = d.DATA.R[rd.ri][4];
      let bi = 0, bd = 1e9; for (let i = 0; i + 3 < c.length; i += 2) { const q = Math.hypot((c[i] + c[i + 2]) / 2 - X, (c[i + 1] + c[i + 3]) / 2 - Z); if (q < bd) { bd = q; bi = i; } }
      const h0 = Math.atan2(c[bi + 2] - c[bi], c[bi + 3] - c[bi + 1]);
      d.PLAYER.x = X; d.PLAYER.z = Z; __step(3);
      let worst = 0; out.hits = [];
      for (const dir of [0, Math.PI]) for (const off of [-9, -6, -3, 0, 3, 6, 9]) {
        const h = h0 + dir, fx = Math.sin(h), fz = Math.cos(h), rx = -fz, rz = fx;
        const sx = X - fx * 260 + rx * off, sz = Z - fz * 260 + rz * off;
        if (d.inAnyBuilding(sx, sz)) continue;
        const car = new d.Car(null, 0x222222, sx, sz, h, d.VMODELS.reventon);
        car.driver = 'player'; car.mode = 'physics'; car.y = d.heightAt(sx, sz);
        const keep = d.PLAYER.health; car.onImpact = (v) => { if (Math.hypot(car.x - X, car.z - Z) < 40) { worst = Math.max(worst, v); out.hits.push([dir ? 'S' : 'N', off, Math.round(car.x), Math.round(car.z), Math.round(v)]); } };
        for (let i = 0; i < 60 * 7; i++) { car.ctl = { thr: 1, brk: 0, steer: 0, hb: 0 }; const sp = Math.hypot(car.vx, car.vz); if (sp < 80) { car.vx += fx * (80 - sp) * 0.5; car.vz += fz * (80 - sp) * 0.5; } car.physics(1 / 60); car.sync(1 / 60); if (Math.hypot(car.x - X, car.z - Z) > 320 && i > 60) break; }
        d.PLAYER.health = keep; car.remove();
      }
      out.worst = worst;
      // 2) the wheel at speed
      { const car = new d.Car(null, 0x222222, X, Z, h0, d.VMODELS.reventon); car.driver = 'player'; car.mode = 'physics'; car.y = d.heightAt(X, Z);
        const st = []; for (const v of [12, 28, 55, 80]) { car.vx = Math.sin(car.h) * v; car.vz = Math.cos(car.h) * v; car.steer = 0; car.h = h0;
          for (let i = 0; i < 40; i++) { car.ctl = { thr: 0, brk: 0, steer: 1, hb: 0 }; car.vx = Math.sin(car.h) * v; car.vz = Math.cos(car.h) * v; car.physics(1 / 60); }
          st.push([v, Math.abs(car.steer)]); }
        out.steer = st; out.wb = car.T.L * 0.6; car.remove(); }
      // 3) people: no way along a bridge, a raised road or a sunk one
      d.pedPruneDecks(); let bad = 0, alive = 0;
      for (const [ri, id] of d.RI2PW) { if (d.PEDWAYS[id].dead) continue; alive++; if ((d.DATA.R[ri][3] & 2) || d.RAISE.has(ri) || d.DEP.has(ri)) bad++; }
      out.peds = { alive, bad };
      // 4) the Gold Edition
      const M = d.VMODELS.reventonGold; out.gold = M ? { name: M.name, w: M.w, liv: d.isLivery(M) } : null;
      if (M) { const g = new d.Car(null, null, 0, 0, 0, M); out.gold.color = g.color; out.gold.maxKmh = Math.round(g.T.maxV * 3.6); const n = new d.Car(null, null, 0, 0, 0, d.VMODELS.reventon); out.gold.ratio = g.T.maxV / n.T.maxV; g.remove(); n.remove(); }
      // 5) the garage: button, door, the car inside, drive out
      const S = d.GARAJE.state; out.garage = { ok: !!S };
      if (S) {
        const T = d.tac67(), [ix, iz] = T.toW(2.55, -3.7);
        out.garage.carved = !d.inAnyBuilding(ix, iz);
        out.garage.antes = { car: !!d.PLAYER.car, interior: d.PLAYER.interior || null, dead: !!d.PLAYER.dead, st: d.GAME.state };
        if (d.PLAYER.car) d.exitCar(); d.PLAYER.dead = false; d.PLAYER.interior = null; d.GAME.state = 'play';  // v1.4.44: whatever the earlier tests left
        d.PLAYER.x = S.button[0]; d.PLAYER.z = S.button[1]; __step(4);  // v1.4.43: out of the car first (exitCar moves the player)
        out.garage.despues = { car: !!d.PLAYER.car, interior: d.PLAYER.interior || null, dead: !!d.PLAYER.dead, d: Math.hypot(d.PLAYER.x - S.button[0], d.PLAYER.z - S.button[1]) };
        const gc = d.GARAJE.car; out.garage.car = gc ? { id: gc.model.id, d: Math.hypot(gc.x - ix, gc.z - iz) } : null;
        out.garage.prompt = d.GARAJE.prompt();
        const [mx, mz] = T.toW(2.55, -0.1);
        out.garage.closedSeg = d.COL.nearSeg(mx, mz, 0.3);
        out.garage.used = d.GARAJE.use(); __step(150);
        out.garage.angle = d.GARAJE.angle; out.garage.openSeg = d.COL.nearSeg(mx, mz, 0.3);
        if (gc) { gc.driver = 'player'; gc.mode = 'physics'; const z0 = T.toL(gc.x, gc.z)[1];
          for (let i = 0; i < 60 * 3; i++) { gc.ctl = { thr: 0.5, brk: 0, steer: 0, hb: 0 }; gc.physics(1 / 60); gc.sync(1 / 60); }
          out.garage.out = T.toL(gc.x, gc.z)[1] - z0; gc.driver = null; gc.ctl = { thr: 0, brk: 1, steer: 0, hb: 0 }; }
      }
      return JSON.stringify(out); }"""))
    print(json.dumps(r))
    ok = True
    def chk(name, good):
        nonlocal ok; print(name, 'OK' if good else 'FALLA'); ok = ok and good
    chk('AUTOPISTA_SIN_GOLPES', r['worst'] < 15)
    st = dict((v, a) for v, a in r['steer'])
    chk('GIRO_CIUDAD_IGUAL', st[12] > 0.18)
    chk('GIRO_MENOR_A_300', st[80] < 0.03 and st[80] < st[55] < st[28])
    chk('PEATONES_FUERA_DE_PUENTES', r['peds']['bad'] == 0 and r['peds']['alive'] > 100)
    g = r['gold']
    chk('GOLD_EXISTE', bool(g) and g['name'] == 'Linguini Gold Edition' and g['w'] == 0)
    chk('GOLD_DORADO', bool(g) and g['color'] == 0xd9a520)
    chk('GOLD_20_POR_CIENTO', bool(g) and 1.18 < g['ratio'] < 1.22)  # v1.4.46: 20 % (v1.4.41: 10 %)
    G = r['garage']
    chk('GARAJE_HECHO', G['ok'] and G.get('carved'))
    chk('GARAJE_COCHE_DENTRO', bool(G.get('car')) and G['car']['id'] == 'reventonGold' and G['car']['d'] < 1.5)
    chk('GARAJE_BOTON', 'garaje' in (G.get('prompt') or '') and G.get('used'))
    chk('GARAJE_PUERTA', G.get('closedSeg') and not G.get('openSeg') and G.get('angle', 0) > 1.5)
    chk('GARAJE_SALIDA', G.get('out', 0) > 6)
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1441', 'OK' if ok else 'FALLA')
