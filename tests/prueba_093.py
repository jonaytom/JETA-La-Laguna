# v0.93 (Jonay): the new characters of Bencomo and Guanche Guarriors (the SPRX sheets made from the GandalfHardcore packs
# and the others): photos of the select screen, each hero playing with the enemies around, riding the lizard (which now
# runs faster when running), the bosses, and Bencomo with the Castilians, crouched and vaulting. Checks that the sheets
# load, that the lizard is faster running and that nothing gives errors.
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
        keys = await pg.evaluate("Object.keys(__dbg.SPRX_DATA)")
        await pg.evaluate("(ks)=>{ for (const k of ks) __dbg.SPRX.ready(k); }", keys); await pg.wait_for_timeout(600)
        notready = await pg.evaluate("(ks)=>ks.filter(k=>!__dbg.SPRX.ready(k))", keys); print('hojas', len(keys), 'sin cargar', notready)
        ok = ok and not notready
        # ---------- Guanche Guarriors
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_093', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._st().t=0.5; P('vS'); A._step(20); A._render(); })()")
        await foto(pg, 'v093_guanche_elegir')
        for i, hid in enumerate(['magote', 'mencey', 'mirla']):
            await pg.evaluate("""(i)=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(i); gm._god=true; const p=gm._p; p.inv=0; A._step(40);
              for (const [k,dx,dz] of [['S',40,-6],['H',70,6],['G',95,-2],['W',120,8],['D',-30,4],['T',55,12]]) gm._spawn(k, p.x+dx, p.z+dz);
              A._press('vR', true); A._step(20); A._press('vR', false); A._press('vS', true); A._step(1); A._press('vS', false); A._step(6); A._render(); }""", i)
            await foto(pg, 'v093_guanche_' + hid)
        # riding the lizard: walking and running speeds
        sp = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(0); gm._god=true; const p=gm._p; A._step(30); gm._E.length=0;
          const lz={ x:p.x+4, z:p.z, vx:0, vz:0, face:1, anim:0, whip:0, rider:null, gone:0, drops:0, free:true }; gm._liz.push(lz); p.mount=lz; lz.rider=p; lz.free=false;
          const x0=p.x; A._press('vR', true); A._step(30); A._press('vR', false); const walk=p.x-x0; A._step(5); A._render();
          return JSON.stringify({ walk }); })()"""))
        await foto(pg, 'v093_guanche_montado')
        run2 = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; p.x=gm._cam()+40; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(2); };
          P('vR'); A._press('vR', true); A._step(1); const x0=p.x; A._step(30); A._press('vR', false); return JSON.stringify({ run: p.x-x0, running: !!p.run }); })()"""))
        print('lagarto', sp, run2); okl = run2['run'] > sp['walk'] * 1.4
        await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(2); gm._god=true; const p=gm._p; A._step(20); gm._E.length=0;
          gm._spawn('BY', p.x+70, p.z); gm._spawn('BW', p.x+130, p.z+8); gm._spawn('BT', p.x-40, p.z+6); A._step(8); A._render(); })()""")
        await foto(pg, 'v093_guanche_jefes')
        await pg.evaluate("__dbg.ARCADE.close()")
        # ---------- Bencomo
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_093b', where: 'PRUEBA', price: 0 }); __dbg.ARCADE._step(30); __dbg.ARCADE._render(); })()"); await pg.wait_for_timeout(200)
        await foto(pg, 'v093_bencomo_titulo')
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); })()")
        await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._load(0); const p=gm._p; p.inv=0; A._step(30);
          for (const [k,dx] of [['S',40],['K',70],['B',100],['A',130],['D',-30],['C',170]]) gm._spawn(k, p.x+dx, p.y-4);
          A._step(10); p.inv=0; p.hurtT=0; window.__benN=0; const S=__dbg.SPRX, d0=S.draw; S.draw=function(c,k){ if (k==='bencomo'||k==='bencomo_ns') window.__benN++; return d0.apply(this, arguments); }; A._render(); S.draw=d0; })()""")
        ben = await pg.evaluate("window.__benN"); print('bencomo dibujado', ben); okb = ben > 0
        await foto(pg, 'v093_bencomo_castellanos')
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; A._press('vD', true); A._step(10); p.inv=0; p.hurtT=0; A._render(); })()")
        await foto(pg, 'v093_bencomo_agachado')
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._press('vS', true); A._step(4); const p=A._game()._p; p.inv=0; p.hurtT=0; A._render(); A._press('vS', false); A._press('vD', false); A._step(20); })()")
        await foto(pg, 'v093_bencomo_golpebajo')
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(); const n=gm._L ? 0 : 0; gm._load(2); const p=gm._p; A._step(30); const b=gm._boss(); if (b) { p.x=b.x+90; } A._step(200); p.inv=0; p.hurtT=0; A._render(); })()")
        await foto(pg, 'v093_bencomo_lugo')
        await pg.evaluate("__dbg.ARCADE.close()")
        print('LAGARTO CORRE', 'OK' if okl else 'FALLA'); print('BENCOMO NUEVO', 'OK' if okb else 'FALLA'); ok = ok and okl and okb
    finally:
        await pg.evaluate("(()=>{ const d=__dbg; try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} d.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 093', 'OK' if ok else 'FALLA')
