# v0.95 (Jonay): football: the pitch 30 % bigger and 5 + keeper a side; changing player while defending (right button)
# prefers the defender the ball is coming towards over the one it runs away from (up to 1 m further). Photo.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        LOOK = "{skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410}"
        await pg.evaluate("(()=>{ __dbg.FUTBOL2D.start({ team: [0,1,2,3,4,5].map(i=>({name:'A'+i, look:%s})), rival: [0,1,2,3,4,5].map(i=>({name:'B'+i, look:%s})), time: 90, lv: 0.5 }); __dbg.FUTBOL2D._step(120); })()" % (LOOK, LOOK))
        n = json.loads(await pg.evaluate("JSON.stringify((()=>{ const s=__dbg.FUTBOL2D._st(); return { n: s.p.length, t0: s.p.filter(q=>q.team===0).length, ys: s.p.map(q=>+q.y.toFixed(1)) }; })())"))
        print('jugadores', n); okn = n['n'] == 12 and n['t0'] == 6
        r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const F=__dbg.FUTBOL2D, s=F._st(); s.phase='play'; s.sp=null;
          const rv=s.p.find(q=>q.team===1 && q.role==='fwd'); rv.x=22; rv.y=35; rv.vx=0; rv.vy=6; F._give(rv); s.ball.x=22; s.ball.y=35.6;
          const ours=s.p.filter(q=>q.team===0 && q.role!=='gk'); ours.forEach((q,i)=>{ q.x=2+i; q.y=4; q.down=0; });
          const behind=ours[0], front=ours[1]; behind.x=22; behind.y=32.2; front.x=22; front.y=39.8; // behind: 3.4 m (ball runs away); in front: 3.4+ m, towards it
          s.ctl=ours[4]; F._press('vP', true); F._step(1); F._press('vP', false);
          return { ctl: s.ctl===front ? 'delante' : s.ctl===behind ? 'detras' : 'otro', db: Math.hypot(behind.x-s.ball.x, behind.y-s.ball.y).toFixed(2), df: Math.hypot(front.x-s.ball.x, front.y-s.ball.y).toFixed(2) }; })())"""))
        print('cambio en defensa', r); okc = r['ctl'] == 'delante'
        await pg.evaluate("(()=>{ const s=__dbg.FUTBOL2D._st(); s.fade=0; s.fadeDir=0; __dbg.FUTBOL2D._draw(); })()")
        d = await pg.evaluate("document.getElementById('futbol2d').toDataURL('image/jpeg', 0.85)")
        os.makedirs('shots', exist_ok=True); open('shots/v095_futbol.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v095_futbol')
        await pg.evaluate("(()=>{ try { __dbg.FUTBOL2D._abort(); } catch (e) {} })()")
        # Bencomo on the pogo, alone (the 0.94 photo had a knight on top of him). The arcade keeps its own frame loop running,
        # so the picture is taken in the same call as the render (otherwise a frame resets the pogo before the photo)
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_095', where: 'PRUEBA', price: 0 }); const A=__dbg.ARCADE; A._step(30); A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); const gm=A._game(); gm._load(0); A._step(30); gm._E.length=0; })()"); await pg.wait_for_timeout(400)  # (the sheets load on their first draw)
        dd = await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; A._render(); p.inv=0; p.hurtT=0; p.pogo=true; p.onG=false; p.y-=10; A._render(); return document.getElementById('arcade').toDataURL('image/jpeg', 0.92); })()"); open('shots/v095_bencomo_picado.jpg', 'wb').write(base64.b64decode(dd.split(',')[1])); print('foto v095_bencomo_picado')
        dd = await pg.evaluate("(()=>{ const A=__dbg.ARCADE, p=A._game()._p; p.pogo=false; p.crouch=true; p.onG=true; p.atk=0.1; A._render(); return document.getElementById('arcade').toDataURL('image/jpeg', 0.92); })()"); open('shots/v095_bencomo_golpebajo.jpg', 'wb').write(base64.b64decode(dd.split(',')[1])); print('foto v095_bencomo_golpebajo')
        await pg.evaluate("__dbg.ARCADE.close()")
        print('SEIS POR EQUIPO', 'OK' if okn else 'FALLA'); print('CAMBIO EN DEFENSA', 'OK' if okc else 'FALLA'); ok = okn and okc
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.FUTBOL2D.running) __dbg.FUTBOL2D._abort(); } catch (e) {} try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 095', 'OK' if ok else 'FALLA')
