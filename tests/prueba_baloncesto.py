# Baloncesto 2D (v0.65): 1) partido corto jugado solo por la CPU (marca, acaba y avisa del resultado);
# 2) el tutorial completo con las teclas virtuales (moverse, turbo, pasar, recibir, tirar, mate, robar); fotos.
import asyncio, os, base64, json
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name):
    d = await pg.evaluate("document.getElementById('basket2d').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
LOOK = "({skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410, longPants:true, hd:true})"
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    # 1) CPU vs CPU, 40 s of game clock
    await pg.evaluate("""() => { window.__bres = null; const L = %s; __dbg.BASKET2D.start({ team: [{name:'A1', look:L},{name:'A2', look:L}], rival: [{name:'B1', look:L},{name:'B2', look:L}], time: 40, lv: 0.5, auto: true, onEnd: (r) => { window.__bres = r; } }); }""" % LOOK)
    await asyncio.sleep(1.0); await foto(pg, 'basket_inicio')
    await pg.evaluate("__dbg.BASKET2D._step(60*20)"); await foto(pg, 'basket_partido')
    await pg.evaluate("__dbg.BASKET2D._step(60*30)")
    s = json.loads(await pg.evaluate("JSON.stringify({ph: __dbg.BASKET2D._st().phase, sc: __dbg.BASKET2D._st().score, clock: __dbg.BASKET2D._st().clock, golden: __dbg.BASKET2D._st().golden})")); print('cpu', s)
    for _ in range(12):
        if await pg.evaluate("!!window.__bres"): break
        await pg.evaluate("__dbg.BASKET2D._step(60*10)"); await asyncio.sleep(1.0)
    res = await pg.evaluate("JSON.stringify(window.__bres)"); print('resultado', res)
    ok1 = res != 'null' and sum(s['sc']) > 0 and not await pg.evaluate("__dbg.BASKET2D.running")
    print('PARTIDO CPU', 'OK' if ok1 else 'FALLA')
    # 1b) the mouse: left = shoot (hold and release), right = pass (v0.66: they were swapped)
    await pg.evaluate("() => { const L = %s; __dbg.BASKET2D.start({ team: [{name:'YO', look:L},{name:'COCO', look:L}], rival: [{name:'R1', look:L},{name:'R2', look:L}], time: 60, lv: 0.3 }); }" % LOOK)
    await asyncio.sleep(0.5)
    dib = await pg.evaluate("__dbg.BASKET2D._st().drawn || 0"); print('jugadores dibujados', dib)
    if not dib: print('FALLA: no se dibuja ningún jugador (solo sombras)')
    d = await pg.evaluate("document.getElementById('basket2d').toDataURL('image/jpeg', 0.85)")
    import base64, os; os.makedirs('shots', exist_ok=True); open('shots/baloncesto_tamano.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('snap baloncesto_tamano')
    await asyncio.sleep(0.8); await pg.mouse.move(400, 300); await pg.mouse.down(); await asyncio.sleep(0.05); await pg.mouse.up(); await asyncio.sleep(0.3)
    await pg.evaluate("(()=>{ const s=__dbg.BASKET2D._st(), h=s.p.find(q=>q.human); s.ball.holder=h; s.ball.mode='held'; s.ev={}; })()")
    await pg.mouse.down(button='right'); await asyncio.sleep(0.05); await pg.mouse.up(button='right'); await asyncio.sleep(0.1)
    m_pass = await pg.evaluate("JSON.stringify({ev: __dbg.BASKET2D._st().ev, mode: __dbg.BASKET2D._st().ball.mode})"); print('clic derecho', m_pass)
    await pg.evaluate("(()=>{ const s=__dbg.BASKET2D._st(), h=s.p.find(q=>q.human); h.x=20; h.z=7.5; s.ball.holder=h; s.ball.mode='held'; s.ev={}; })()")
    await pg.mouse.down(); await asyncio.sleep(0.5); await pg.mouse.up(); await asyncio.sleep(0.2)
    m_shot = await pg.evaluate("JSON.stringify({ev: __dbg.BASKET2D._st().ev, mode: __dbg.BASKET2D._st().ball.mode})"); print('clic izquierdo', m_shot)
    await foto(pg, 'basket_zoom')
    ok_mouse = '"pass":true' in m_pass and '"shot":true' in m_shot; print('RATÓN', 'OK' if ok_mouse else 'FALLA')
    await pg.evaluate("(()=>{ const s=__dbg.BASKET2D._st(); s.phase='end'; s.pt=0.1; __dbg.BASKET2D._step(20); })()"); await asyncio.sleep(1.5)
    # 2) tutorial with the human: virtual buttons, steps by hand
    await pg.evaluate("""() => { window.__bres = null; const L = %s; __dbg.BASKET2D.start({ team: [{name:'YO', look:L},{name:'COCO', look:L}], rival: [{name:'T1', look:L},{name:'T2', look:L}], time: 60, lv: 0.3, tutorial: true, onEnd: (r) => { window.__bres = r; } }); }""" % LOOK)
    await asyncio.sleep(0.8)
    B = "__dbg.BASKET2D"
    await pg.evaluate(f"(()=>{{ {B}._press('vS', true); {B}._step(2); {B}._press('vS', false); {B}._step(2); }})()")  # leave the controls card
    async def hold(v, n): await pg.evaluate(f"(()=>{{ {B}._press('{v}', true); {B}._step({n}); {B}._press('{v}', false); {B}._step(2); }})()")
    async def tutstep(): return await pg.evaluate(f"(()=>{{ const t={B}._st().tut; return t ? t.i : 99; }})()")
    async def until(i, js, tries=4, wait=80):
        for _ in range(tries):
            if await tutstep() != i: return
            await pg.evaluate(f"(()=>{{ const s={B}._st(), h=s.p.find(q=>q.human); {js} }})()"); await pg.evaluate(f"{B}._step({wait})")
    P = lambda v, n=2: f"{B}._press('{v}', true); {B}._step({n}); {B}._press('{v}', false); {B}._step(1);"
    await until(0, f"{B}._press('vR', true); {B}._step(110); {B}._press('vR', false);"); print('tras moverse', await tutstep())
    await until(1, f"{B}._press('vT', true); {B}._press('vL', true); {B}._step(70); {B}._press('vT', false); {B}._press('vL', false);"); print('tras correr', await tutstep())
    await until(2, P('vP')); print('tras pasar', await tutstep())
    await until(3, P('vP')); print('tras recibir', await tutstep())
    await until(4, "if (s.ball.holder!==h) { s.ball.holder=h; s.ball.mode='held'; } " + P('vS', 30), wait=120); print('tras tirar', await tutstep())
    await until(5, f"h.x=21.4; h.z=7.5; h.turbo=1; if (s.ball.holder!==h) {{ s.ball.holder=h; s.ball.mode='held'; }} {B}._press('vT', true); {B}._press('vS', true); {B}._step(1); {B}._press('vS', false); {B}._press('vT', false); {B}._step(1); const C={B}._st().combo; if (C) for (const n of C.need) {{ {B}._press(n[0], true); {B}._step(1); {B}._press(n[0], false); {B}._step(2); }}", wait=150)
    print('tras combo', await tutstep()); await foto(pg, 'basket_tutorial')
    for _ in range(8):
        if await tutstep() != 6: break
        await pg.evaluate(f"(()=>{{ const s={B}._st(), h=s.p.find(q=>q.human), r=s.ball.holder; if (r && r.team===1) {{ h.x=r.x-0.6; h.z=r.z; }} {B}._press('vP', true); {B}._step(2); {B}._press('vP', false); {B}._step(60); }})()")
    t = await tutstep(); print('tutorial', t)
    print('TUTORIAL', 'OK' if t == 99 else 'FALLA')
    # defending away from the ball, right click switches to the other defender
    sw = await pg.evaluate(f"(()=>{{ const s={B}._st(); const r=s.p.find(q=>q.team===1), h=s.p.find(q=>q.human); s.ball.holder=r; s.ball.mode='held'; h.x=r.x+8; h.z=r.z; {B}._press('vP', true); {B}._step(1); {B}._press('vP', false); {B}._step(1); return s.p.find(q=>q.human).name; }})()")
    print('cambio de defensor ->', sw); ok_sw = sw != 'YO'
    await pg.evaluate(f"(()=>{{ const s={B}._st(); s.score=[9,2]; s.phase='end'; s.pt=0.2; {B}._step(30); }})()"); await asyncio.sleep(2)
    print('fin', await pg.evaluate("JSON.stringify(window.__bres)"), 'estado', await pg.evaluate("__dbg.GAME.state"))
    print('errores JS', errs[:3])
    print('BALONCESTO', 'OK' if ok1 and t == 99 and ok_sw and ok_mouse and not errs else 'FALLA')
