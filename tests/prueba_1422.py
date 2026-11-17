# v1.4.22 (Jonay, 17-nov): rivales que conducen como un coche (sin frenazos en seco ni giros de 90 grados, derrapando
# en las curvas cerradas de una persecución); campos de fútbol y canchas con muro, valla alta y accesos hacia la calle;
# botones táctiles nuevos (pausa, diario, golpe/radio, enderezar) y mando de los minijuegos.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""() => { const d = __dbg, out = {};
      // 1) a chase along a real route of the street graph
      const G = d.GRAPH, a = G.nearestNode(d.PLAYER ? d.PLAYER.x : 0, d.PLAYER ? d.PLAYER.z : 0);
      let pts = null;
      for (let k = 0; k < 30 && !pts; k++) { const ang = k * 0.7, b = G.nearestNode(Math.sin(ang) * 700, Math.cos(ang) * 700); const r = G.route(a, b); if (r && r.length > 12) pts = r; }
      out.route = pts ? pts.length / 2 : 0;
      if (pts) {
        const c = new d.Car(null, 0xff2200, pts[0], pts[1], 0, d.VMODELS.clip);
        c.mode = 'race';
        const P = d.s2Path(pts);
        let lv = 0, maxDec = 0, maxCurv = 0, n = 0, lh = null, lx = c.x, lz = c.z, drift = 0, hb = 0;
        while (P.s < P.tot - 1 && n < 60 * 240) {
          d.s2DriveCar(c, P, 1 / 60, 22, null, true);
          const dec = (lv - P.v) * 60; maxDec = Math.max(maxDec, dec); lv = P.v;
          const ds = Math.hypot(c.x - lx, c.z - lz);
          if (lh !== null && ds > 0.05 && P.D) { const k = P.D.K[Math.min(P.D.N - 1, Math.round(P.s / P.D.ds))]; maxCurv = Math.max(maxCurv, Math.abs(k)); }
          drift = Math.max(drift, Math.abs(P.dr || 0)); hb += c.ctl.hb ? 1 : 0;
          lh = c.h; lx = c.x; lz = c.z; n++;
        }
        out.drive = { secs: n / 60, len: P.tot, maxDec, minRadius: maxCurv ? 1 / maxCurv : 999, drift, hbFrames: hb, done: P.s >= P.tot - 1 };
        c.remove();
      }
      // 2) fences round the football pitches
      const S = d.SPORTS.pitches; let big = 0, fenced = 0, small = 0, sfenced = 0;
      for (const p of S) {
        const F = p.F, isBig = p.len * p.wid >= 1700, e = isBig ? 2.4 : 1.2;
        const probes = [[F.u0 + p.len * 0.25, F.v0 - e], [F.u0 + p.len * 0.75, F.v1 + e], [F.u0 - e, F.v0 + p.wid * 0.25], [F.u1 + e, F.v0 + p.wid * 0.75]];
        let hit = 0; for (const [u, v] of probes) { const q = F.W(u, v); if (d.COL.nearSeg(q[0], q[1], 0.4)) hit++; }
        if (isBig) { big++; if (hit >= 2) fenced++; } else { small++; if (hit >= 2) sfenced++; }
      }
      out.fences = { big, fenced, small, sfenced };
      // 3) the touch buttons exist
      out.touch = ['tbP', 'tbDi', 'tbQ', 'tbR', 'miniPad', 'mpA', 'mpP'].filter((id) => !document.getElementById(id));
      return JSON.stringify(out); }"""))
    print(r)
    ok = True
    def chk(name, good):
        nonlocal ok; print(name, 'OK' if good else 'FALLA'); ok = ok and good
    dv = r.get('drive')
    chk('PERSECUCION_TERMINA', bool(dv) and dv['done'])
    if dv:
        chk('SIN_FRENAZOS_EN_SECO', dv['maxDec'] < 11)
        chk('CURVAS_CON_RADIO', dv['minRadius'] > 3.5)
        chk('DERRAPA_EN_CURVAS', dv['drift'] > 0.05)
    f = r['fences']
    chk('CAMPOS_VALLADOS', f['big'] == 0 or f['fenced'] >= 0.6 * f['big'])
    chk('CANCHAS_VALLADAS', f['small'] == 0 or f['sfenced'] >= 0.6 * f['small'])
    chk('BOTONES_TACTILES', r['touch'] == [])
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 1422', 'OK' if ok else 'FALLA')
