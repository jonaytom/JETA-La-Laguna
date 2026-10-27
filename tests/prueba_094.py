# v0.94 (Jonay, tras la 0.93): Guanche Guarriors: more margin in depth to hit (an enemy 10 units away in z is hit), the
# portrait of the enemy you hit (with level and life), bigger dogs that bite, the thieves with red and blue caps;
# Bencomo: the pole of the vault and of the pogo drawn like his (crouched on the pogo), the knights as captains on
# horses like Lugo's. Photos of everything and no errors.
import asyncio, os, base64, json
async def foto(pg, name):
    d = await pg.evaluate("document.getElementById('arcade').toDataURL('image/jpeg', 0.92)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ for (const k of Object.keys(__dbg.SPRX_DATA)) __dbg.SPRX.ready(k); })()"); await pg.wait_for_timeout(600)
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_094', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._st().t=0.5; P('vS'); A._step(20); })()")
        r = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(0); gm._god=true; const p=gm._p; A._step(30); gm._E.length=0;
          const e=gm._spawn('S', p.x+16, p.z+10); e.cd=99; e.engaged=false; p.face=1; const hp0=e.hp; A._press('vS', true); A._step(1); A._press('vS', false); A._step(20);
          return JSON.stringify({ hp0, hp: e.hp }); })()"""))
        print('golpe a 10 de profundidad', r); okz = r['hp'] < r['hp0']
        k = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; gm._E.length=0; A._step(30);
          const e=gm._spawn('S', p.x+14, p.z); e.cd=99; const w=gm._spawn('W', p.x-14, p.z); w.cd=99; p.face=1;
          A._press('vP', true); A._step(1); A._press('vP', false); A._step(12); const sStun=e.st==='hurt' && !!e.stun;
          p.face=-1; A._step(20); A._press('vP', true); A._step(1); A._press('vP', false); A._step(12); const wStun=!!w.stun;
          gm._E.length=0; const g2=gm._spawn('G', p.x+18, p.z); g2.cd=99; p.face=1; A._step(10); const h0=g2.hp;
          A._press('vS', true); A._step(40); A._press('vS', false); A._step(60); const strongHit=g2.hp < h0 - 3;
          const big=gm._spawn('G', p.x+18, p.z); big.cd=99; A._step(10); A._press('vP', true); A._step(1); A._press('vP', false); A._step(12); const bigNo=!big.stun;
          return JSON.stringify({ sStun, wStun, strongHit, hp: [h0, g2.hp], bigNo }); })()"""))
        print('patadas', k); okk = k['sStun'] and not k['wStun'] and k['strongHit'] and k['bigNo']
        await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; gm._E.length=0;
          const t=gm._spawn('T', p.x+30, p.z); const d1=gm._spawn('D', p.x+70, p.z+6); d1.carry='J'; const d2=gm._spawn('D', p.x+95, p.z-4); d2.carry='F'; gm._spawn('G', p.x+20, p.z-2).cd=99;
          for (const e of gm._E) { e.cd=99; } t.st='atk'; t.stT=0.3; A._press('vS', true); A._step(1); A._press('vS', false); A._step(8); A._render(); })()""")
        await foto(pg, 'v094_guanche_retrato')
        await pg.evaluate("__dbg.ARCADE.close()")
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_094b', where: 'PRUEBA', price: 0 }); const A=__dbg.ARCADE; A._step(30); A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); })()")
        await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._load(0); const p=gm._p; A._step(30); gm._spawn('C', p.x+90, p.y-4); A._step(10);
          p.onG=false; p.vault=0.5; p.pole=[p.x+30, p.y]; p.y-=20; p.inv=0; p.hurtT=0; A._render(); })()""")
        await foto(pg, 'v094_bencomo_salto')
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; p.vault=0; p.pole=null; p.pogo=true; p.onG=false; p.inv=0; p.hurtT=0; A._render(); })()")
        await foto(pg, 'v094_bencomo_picado')
        print('PROFUNDIDAD', 'OK' if okz else 'FALLA'); print('PATADAS Y GOLPE FUERTE', 'OK' if okk else 'FALLA'); ok = ok and okz and okk
    finally:
        await pg.evaluate("(()=>{ const d=__dbg; try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} d.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 094', 'OK' if ok else 'FALLA')
