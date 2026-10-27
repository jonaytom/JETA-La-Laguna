# v0.96.2 (Jonay): after a save the keeper played it straight at the rival who had just shot (standing in front of
# him); now he passes to the nearest mate, along the ground, or lofted if a rival stands in the line of the pass.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        LOOK = "{skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410}"
        await pg.evaluate("(()=>{ __dbg.FUTBOL2D.start({ team: [0,1,2,3,4,5].map(i=>({name:'A'+i, look:%s})), rival: [0,1,2,3,4,5].map(i=>({name:'B'+i, look:%s})), time: 90, lv: 0.5 }); __dbg.FUTBOL2D._step(120); })()" % (LOOK, LOOK))
        res = []
        for caso in ['libre', 'tapado']:
            r = json.loads(await pg.evaluate("""(caso)=>JSON.stringify((()=>{ const F=__dbg.FUTBOL2D, s=F._st(); s.phase='play'; s.sp=null; s.auto=true;
              const gk=s.p.find(q=>q.team===0 && q.role==='gk'), ours=s.p.filter(q=>q.team===0 && q.role!=='gk'), riv=s.p.filter(q=>q.team===1 && q.role!=='gk');
              ours.forEach((q,i)=>{ q.x=4+i*7; q.y=20; q.vx=q.vy=0; q.down=0; }); riv.forEach((q,i)=>{ q.x=40; q.y=10+i*3; q.vx=q.vy=0; q.down=0; });
              const near=ours[0]; near.x=gk.x-9; near.y=gk.y-4;                // the nearest mate, 10 m to his left
              const shooter=riv[0]; shooter.x=gk.x; shooter.y=gk.y-3;           // the rival who shot, right in front of him
              if (caso==='tapado') { riv[1].x=gk.x-4.5; riv[1].y=gk.y-2; }      // a rival in the line of the pass
              s.ball.to=null; F._give(gk); gk.hold=0.02; let to=null, z=0; for (let i=0;i<40 && !to;i++){ F._step(1); to=s.ball.to; } for (let i=0;i<40;i++){ F._step(1); z=Math.max(z, s.ball.z); }
              return { caso, a: to===near ? 'cercano' : to===shooter ? 'rival' : to ? 'otro' : 'nadie', alto: +z.toFixed(2) }; })())""", caso))
            print('saque del portero', r); res.append(r)
        oks = res[0]['a'] == 'cercano' and res[0]['alto'] < 1.2 and res[1]['a'] == 'cercano' and res[1]['alto'] > 1.5
        print('SAQUE AL CERCANO (RASO O BOMBEADO)', 'OK' if oks else 'FALLA'); ok = oks
        await pg.evaluate("(()=>{ try { __dbg.FUTBOL2D._abort(); } catch (e) {} })()")
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.FUTBOL2D.running) __dbg.FUTBOL2D._abort(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0962', 'OK' if ok else 'FALLA')
