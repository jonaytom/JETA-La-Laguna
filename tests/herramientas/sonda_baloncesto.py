# Sonda del baloncesto 2D (v0.66): juega un partido automático (la CPU lleva a los 4) contra rivales de nivel lv y
# escribe cada segundo de juego quién tiene el balón, dónde está cada jugador, qué hace y el marcador; al final, cuántos
# tiros, canastas, robos y mates hubo por equipo. Uso: python run_test.py herramientas/sonda_baloncesto.py [lv] [segundos]
import asyncio, json, sys
LOOK = "({skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410, longPants:true, hd:true})"
async def run(pg):
    lv = float(sys.argv[2]) if len(sys.argv) > 2 else 0.08
    seg = int(sys.argv[3]) if len(sys.argv) > 3 else 60
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __step(2);})()")
    await pg.evaluate("""() => { const L = %s; __dbg.BASKET2D.start({ team: [{name:'A1', look:L},{name:'A2', look:L}], rival: [{name:'B1', look:L},{name:'B2', look:L}], time: %d, lv: %f, mateLv: 0.6, auto: true });
      const s = __dbg.BASKET2D._st(); window.__bk = { tiros: [0, 0], canastas: [0, 0], cambios: 0 }; }""" % (LOOK, seg + 5, lv))
    prev = None
    for t in range(seg):
        r = json.loads(await pg.evaluate("""(() => { const B = __dbg.BASKET2D; for (let i = 0; i < 60; i++) { const s = B._st(), b = s.ball, h0 = b.holder, m0 = b.mode;
            B._step(1); const s2 = B._st(), b2 = s2.ball; if (m0 !== 'air' && b2.mode === 'air' && b2.shot) __bk.tiros[b2.shot.team]++; if (b2.holder !== h0) __bk.cambios++; }
          const s = B._st(), b = s.ball, f = (v) => Math.round(v * 10) / 10;
          return JSON.stringify({ ph: s.phase, clock: f(s.clock), sc: s.score, ball: b.mode, hold: b.holder ? b.holder.team + '/' + b.holder.idx : '-', bx: f(b.x), bz: f(b.z), by: f(b.y),
            p: s.p.map((q) => [q.team, f(q.x), f(q.z), q.act || '', q.air ? 'aire' : '', q.shootHold ? 'tira' : '', q.down > 0 ? 'suelo' : '', f(q.turbo), f(Math.hypot(q.vx, q.vz))]) }); })()"""))
        line = f"t={t+1:3d} {r['ph']:5s} reloj {r['clock']:6} {r['sc']} balón {r['ball']:5s} {r['hold']:4s} ({r['bx']},{r['bz']},{r['by']}) | " + ' '.join(f"{q[0]}:{q[1]},{q[2]}{'·'+q[3] if q[3] else ''}{'·'+q[4] if q[4] else ''}{'·'+q[5] if q[5] else ''}{'·'+q[6] if q[6] else ''} v{q[8]}" for q in r['p'])
        print(line)
    print('resumen', await pg.evaluate("JSON.stringify(__bk)"), 'marcador', await pg.evaluate("JSON.stringify(__dbg.BASKET2D._st().score)"))
    await pg.evaluate("(()=>{ if (__dbg.BASKET2D.running) __dbg.BASKET2D._abort(); })()")
    print('errores JS', errs[:5])
