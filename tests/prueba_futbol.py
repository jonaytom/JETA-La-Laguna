# Fútbol 2D (v0.67): 1) partido automático (la CPU lleva a los 10: hay goles y acaba); 2) equilibrio: contra los
# seminaristas (nivel 0.06) la banda gana con claridad en 3 partidos automáticos; 3) el tutorial con las teclas virtuales
# (moverse, correr, pasar, chutar, gol, entrada); 4) el ratón (clic izq. chuta, dcho. pasa); 5) campos con entrada y la
# misión 3 del Obispo (charla, ir al campo, partido, ganar → superada y retos abiertos). Fotos.
import asyncio, os, base64, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name):
    await pg.evaluate("(()=>{ const s=__dbg.FUTBOL2D._st(); if (s) { s.fade=0; s.fadeDir=0; } __dbg.FUTBOL2D._draw(); })()")
    d = await pg.evaluate("document.getElementById('futbol2d').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
LOOK = "({skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410, longPants:true, hd:true})"
TEAM = "[0,1,2,3,4].map(i=>({name:'A'+i, look:%s}))" % LOOK
RIV = "[0,1,2,3,4].map(i=>({name:'B'+i, look:%s}))" % LOOK
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    F = "__dbg.FUTBOL2D"
    # 1) CPU vs CPU
    await pg.evaluate("() => { window.__fres = null; %s.start({ team: %s, rival: %s, time: 60, lv: 0.5, mateLv: 0.5, auto: true, onEnd: (r) => { window.__fres = r; } }); }" % (F, TEAM, RIV))
    await pg.evaluate("%s._step(60*20)" % F); await foto(pg, 'futbol_partido')
    await pg.evaluate("%s._step(60*45)" % F)
    s = json.loads(await pg.evaluate("JSON.stringify({ph: %s._st().phase, sc: %s._st().score, golden: %s._st().golden})" % (F, F, F))); print('cpu', s)
    for _ in range(15):
        if await pg.evaluate("!!window.__fres"): break
        await pg.evaluate("%s._step(60*10)" % F); await asyncio.sleep(0.6)
    res = await pg.evaluate("JSON.stringify(window.__fres)"); print('resultado', res)
    ok1 = res != 'null' and not await pg.evaluate("%s.running" % F)
    if not ok1: await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (F, F))
    print('PARTIDO CPU', 'OK' if ok1 else 'FALLA')
    # 2) balance of the first game
    tot = [0, 0]
    for g in range(3):
        await pg.evaluate("() => { %s.start({ team: %s, rival: %s, time: 150, lv: 0.06, mateLv: 0.6, auto: true }); }" % (F, TEAM, RIV))
        await pg.evaluate("%s._step(60*155)" % F)
        sc = json.loads(await pg.evaluate("JSON.stringify(%s._st().score)" % F)); tot[0] += sc[0]; tot[1] += sc[1]; print('partido fácil', g + 1, sc)
        await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (F, F))
    ok2 = tot[0] >= 2 * max(1, tot[1]); print('equilibrio primer partido', tot, 'OK' if ok2 else 'FALLA: demasiado difícil')
    # 3) the tutorial with the virtual buttons
    await pg.evaluate("() => { window.__fres = null; %s.start({ team: %s, rival: %s, time: 120, lv: 0.06, tutorial: true, onEnd: (r) => { window.__fres = r; } }); }" % (F, TEAM, RIV))
    P = lambda v, d: pg.evaluate("%s._press('%s', %s)" % (F, v, 'true' if d else 'false'))
    await P('vS', True); await pg.evaluate("%s._step(2)" % F); await P('vS', False)
    async def until(name, n=12):
        for _ in range(n):
            t = await pg.evaluate("(%s._st().tut||{i:99}).i" % F)
            if t is None or t >= name: return True
            await pg.evaluate("%s._step(20)" % F)
        return False
    await P('vU', True); await pg.evaluate("%s._step(90)" % F); await P('vU', False); await until(1); print('tras moverse', await pg.evaluate("(%s._st().tut||{i:99}).i" % F))
    await P('vU', True); await P('vT', True); await pg.evaluate("%s._step(70)" % F); await P('vT', False); await P('vU', False); await until(2); print('tras correr', await pg.evaluate("(%s._st().tut||{i:99}).i" % F))
    # pass: face the mate on the left (the striker passes to the midfielder behind)
    await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; const m=s.p.find(q=>q.team===0&&q.role==='mid'); me.dir=Math.atan2(m.y-me.y, m.x-me.x); if (s.ball.owner!==me) { s.ball.owner=me; } })()" % F)
    await P('vP', True); await pg.evaluate("%s._step(2)" % F); await P('vP', False); await until(3); print('tras pasar', await pg.evaluate("(%s._st().tut||{i:99}).i" % F))
    # shot: hold and release facing the goal
    await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; s.ball.owner=me; me.dir=-Math.PI/2; })()" % F)
    await P('vS', True); await pg.evaluate("%s._step(20)" % F); await P('vS', False); await pg.evaluate("%s._step(10)" % F); await until(4); print('tras chutar', await pg.evaluate("(%s._st().tut||{i:99}).i" % F))
    # goal: near the goal, aimed at the corner, hard
    for _ in range(4):
        await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; me.x=21; me.y=9; me.dir=Math.atan2(-9, 19.3-21); s.ball.owner=me; s.ball.x=me.x; s.ball.y=me.y-0.5; })()" % F)
        await P('vS', True); await pg.evaluate("%s._step(30)" % F); await P('vS', False); await pg.evaluate("%s._step(120)" % F)
        if await until(5, 3): break
    print('tras gol', await pg.evaluate("(%s._st().tut||{i:99}).i" % F), 'marcador', await pg.evaluate("JSON.stringify(%s._st().score)" % F))
    # tackle: slide at the rival with the ball
    for _ in range(4):
        await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; const r=s.p.find(q=>q.team===1&&q.role==='fwd'); s.ball.owner=r; me.x=r.x+2.2; me.y=r.y; me.dir=Math.PI; me.kickCD=0; me.slide=0; })()" % F)
        await P('vL', True); await P('vS', True); await pg.evaluate("%s._step(3)" % F); await P('vS', False); await pg.evaluate("%s._step(40)" % F); await P('vL', False)
        if await until(6, 3): break
    await pg.evaluate("%s._step(80)" % F); tut = await pg.evaluate("%s._st().tut === null" % F); print('tutorial completo', tut)
    await foto(pg, 'futbol_tutorial')
    ok3 = tut
    # 4) mouse: left = shot, right = pass
    await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; s.ball.owner=me; s.ball.shot=null; me.dir=-Math.PI/2; s.ev={}; s.phase='play'; s.pause=0; })()" % F)
    await asyncio.sleep(0.3); await pg.mouse.move(400, 300); await pg.mouse.down(); await asyncio.sleep(0.25); await pg.mouse.up(); await asyncio.sleep(0.3)
    m1 = json.loads(await pg.evaluate("JSON.stringify(%s._st().ev)" % F)); print('clic izquierdo', m1)
    await pg.evaluate("(()=>{ const s=%s._st(); const me=s.ctl; s.ball.owner=me; me.kickCD=0; s.ev={}; })()" % F)
    await pg.mouse.down(button='right'); await asyncio.sleep(0.05); await pg.mouse.up(button='right'); await asyncio.sleep(0.2)
    m2 = json.loads(await pg.evaluate("JSON.stringify(%s._st().ev)" % F)); print('clic derecho', m2)
    ok4 = bool(m1.get('shot')) and bool(m2.get('pass')); print('RATÓN', 'OK' if ok4 else 'FALLA')
    await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (F, F))
    # 5) pitches with entrance and the Obispo's football mission
    info = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg; const C=d.COURTS.filter(c=>c.sport==='fut'); const o=d.obispoCampo();
      return { campos: C.length, puertas: C.filter(c=>c.gate==='door').length, enEdificio: C.filter(c=>d.inAnyBuilding(c.x,c.z)).map(c=>[c.id,Math.round(c.x),Math.round(c.z)]), obispo: o && { id: o.id, label: o.label, kind: o.kind, gate: o.gate, dist: Math.round(o.dist) } }; })())"""))
    print('campos', info)
    gate = await pg.evaluate("(()=>{ const d=__dbg, c=d.obispoCampo(); if (!c) return null; const P=d.PLAYER; P.x=c.x; P.z=c.z; __step(20); const g=d.courtGateNear(); return g && g.id; })()"); print('entrada detectada', gate)
    await pg.evaluate("(()=>{const M=__dbg.MISSIONS; const i=M._story.findIndex(m=>/farmacia/i.test(m.title)); M._setIdx(i); M._setIdx(2,'obispo');})()")
    await pg.evaluate("(()=>{const b=__dbg.MISSIONS.blips().find(q=>q[2]==='#b388ff'); const P=__dbg.PLAYER; if (b) { P.x=b[0]; P.z=b[1]; } __step(20);})()")
    print('activa', await pg.evaluate("__dbg.MISSIONS.active && __dbg.MISSIONS.active.title"))
    for _ in range(12): await pg.evaluate("(()=>{const T=window.__TALK; if (T && T.cur) T.cur.next(); __step(3);})()")
    await pg.evaluate("(()=>{const g=__dbg.MISSIONS.target(); const P=__dbg.PLAYER; if (g) { P.x=g[0]; P.z=g[1]; } __step(10); const c=__dbg.courtGateNear(); if (c && c.gate==='door') __dbg.useCourtGate(c); __step(5);})()")
    run5 = await pg.evaluate("%s.running" % F); print('partido en marcha', run5)
    if run5:
        await asyncio.sleep(1.0); await pg.evaluate("(()=>{const s=%s._st(); s.tut=null; s.score=[4,1]; s.phase='end'; s.pt=0.2; %s._step(30);})()" % (F, F))
        await asyncio.sleep(2.5)
        for _ in range(6): await pg.evaluate("(()=>{const T=window.__TALK; if (T && T.cur) T.cur.next(); __step(3);})()")
    st5 = json.loads(await pg.evaluate("JSON.stringify(__dbg.MISSIONS.getState())")); print('estado obispo', st5.get('obispo'), 'futbolTut', st5['gang'].get('futbolTut'))
    ok5 = info['campos'] > 0 and info['obispo'] and not info['enEdificio'] and gate == info['obispo']['id'] and run5 and st5.get('obispo') == 3 and st5['gang'].get('futbolTut')
    print('errores JS', errs[:3])
    print('FUTBOL', 'OK' if ok1 and ok2 and ok3 and ok4 and ok5 and not errs else 'FALLA')
