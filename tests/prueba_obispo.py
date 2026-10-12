# El Obispo (v0.65): Obispado y obispo en la Casa Salazar, cancha más cercana, farolas fuera de canchas y campos, y la
# primera misión (charla, ir a la cancha, partido, ganar → misión superada). Fotos de la fachada y del obispo.
import asyncio, os, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, c=d.obispoCourt(); return { ok: d.OBISPADO.ok, front: d.OBISPADO.front, obispo: !!d.NPC.obispo,
      court: c && { kind: c.kind, place: c.place, dist: Math.round(c.dist), x: Math.round(c.cx), z: Math.round(c.cz) },
      lampsInCourts: d.LAMPS.filter(l => d.inPitch(l[0], l[1], 0)).length, treesInCourts: d.TREES.filter(t => d.inPitch(t[0], t[1], 0)).length, pitches: d.pitchRects().length }; })())"""))
    print('info', info)
    ok = info['ok'] and info['obispo'] and info['court'] and info['lampsInCourts'] == 0
    # photo of the Obispado: stand in front of the door, looking at it
    await pg.evaluate("(()=>{const d=__dbg, O=d.OBISPADO, P=d.PLAYER; P.x=O.front[0]+O.nx*9; P.z=O.front[1]+O.nz*9; P.h=Math.atan2(-O.nx,-O.nz); __step(40);})()")
    await snap(pg, 'obispado')
    # mission 1: open the bishop's track (story at the mayor's missions), walk into the circle, skip the talk
    await pg.evaluate("(()=>{const M=__dbg.MISSIONS; const i=M._story.findIndex(m=>/farmacia/i.test(m.title)); M._setIdx(i); M._setIdx(0,'obispo');})()")
    await pg.evaluate("(()=>{const b=__dbg.MISSIONS.blips().find(q=>q[2]==='#b388ff'); const P=__dbg.PLAYER; if (b) { P.x=b[0]; P.z=b[1]; } __step(20);})()")
    print('activa', await pg.evaluate("__dbg.MISSIONS.active && __dbg.MISSIONS.active.title"))
    for _ in range(12):
        await pg.evaluate("(()=>{const T=window.__TALK; if (T && T.cur) T.cur.next(); __step(3);})()")
    g = await pg.evaluate("JSON.stringify(__dbg.MISSIONS.target())"); print('meta', g)
    await pg.evaluate("(()=>{const g=__dbg.MISSIONS.target(); const P=__dbg.PLAYER; if (g) { P.x=g[0]; P.z=g[1]; } __step(10);})()")
    run2 = await pg.evaluate("__dbg.BASKET2D.running"); print('partido en marcha', run2)
    if run2:
        await asyncio.sleep(1.5); await pg.evaluate("(()=>{const s=__dbg.BASKET2D._st(); s.tut=null; s.score=[12,4]; s.phase='end'; s.pt=0.2; __dbg.BASKET2D._step(30);})()")
        await asyncio.sleep(2.5)
        for _ in range(6): await pg.evaluate("(()=>{const T=window.__TALK; if (T && T.cur) T.cur.next(); __step(3);})()")
    st2 = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS.getState())")); print('estado', st2.get('obispo'), st2.get('active'))
    ok = ok and run2 and st2.get('obispo') == 1 and not errs
    print('errores JS', errs[:3])
    print('OBISPO', 'OK' if ok else 'FALLA')
