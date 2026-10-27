# v0.99.3 (Jonay): the girls on his new female base: La Mirladora, the witch and the female minions (half of the 'S'),
# each drawn from its own sheet; photo of a group of minions in Taoro.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_0993', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._step(10); A._st().t=0.5; A._press('vS',true); A._step(1); A._press('vS',false); A._step(20); })()"); await pg.wait_for_timeout(600)
        r = json.loads(await pg.evaluate("""()=>{ const A=__dbg.ARCADE, gm=A._game(), S=__dbg.SPRX; gm._choose(2); gm._load(0); gm._god=true; A._step(100); gm._E.length=0; const p=gm._p; p.inv=0;
              let fem=0; for (let i=0;i<12;i++){ const e=gm._spawn('S', p.x+30+(i%6)*22, p.z+Math.floor(i/6)*14); e.cd=99; e.st='walk'; if (e.fem) fem++; }
              const cnt={}; const d0=S.draw; S.draw=function(c,k){ cnt[k]=(cnt[k]||0)+1; return d0.apply(this, arguments); }; A._render(); S.draw=d0;
              return JSON.stringify({ fem, cnt, foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.9) }); }"""))
        d = r.pop('foto'); os.makedirs('shots', exist_ok=True); open('shots/v0993_secuazas.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0993_secuazas', r)
        nf = sum(v for k, v in r['cnt'].items() if k.startswith('g_sec_'))
        okf = r['fem'] > 0 and nf == r['fem'] and r['cnt'].get('mirla', 0) > 0
        print('SECUACES HEMBRA Y MIRLADORA DIBUJADAS', 'OK' if okf else 'FALLA'); ok = okf
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0993', 'OK' if ok else 'FALLA')
