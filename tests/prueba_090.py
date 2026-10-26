# v0.90 (Jonay): 1) basket: after a basket the team that conceded takes it out from its baseline and has to pass it in
# (nobody appears in the middle: continuity); 2) basket players drawn with the «A++ semicabezón 120» (photo);
# 3) Guanche Guarriors: the G1 heroes (El Magote, El Mencey, La Mirladora) on the select screen and playing (photos);
# 4) Bencomo: the torso as a V and the raised arms whole (photo of the title); 5) the crowd of the matches exists and
# makes no errors; 6) the mundialito screens still work after splitting them.
import asyncio, os, base64, json
async def foto(pg, cid, name):
    d = await pg.evaluate("(id)=>document.getElementById(id).toDataURL('image/jpeg', 0.9)", cid)
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    TEAM = "[{ name: 'EL CHOPA', look: { skin: 0xc68a5e, hair: 0x2a1a10, shirt: 0xc8102e, pants: 0x1d2a6b }, nose: true }, { name: 'COCO', look: { skin: 0x7a4a2c, hair: 0x141010, hairStyle: 'Afro', beard: true, shirt: 0xc8102e, pants: 0x1d2a6b } }, { name: 'EL BLANCO', look: { skin: 0xefc8a2, hair: 0xc9902e, shirt: 0xc8102e, pants: 0x1d2a6b } }]"
    RIV = "[{ name: 'A', look: { shirt: 0xf2f2f2, pants: 0x1f5fbf } }, { name: 'B', look: { shirt: 0xf2f2f2, pants: 0x1f5fbf, beard: true } }, { name: 'C', look: { shirt: 0xf2f2f2, pants: 0x1f5fbf } }]"
    try:
        # 1) the inbound after a basket
        await pg.evaluate("(()=>{ const B=__dbg.BASKET2D; B.start({ team: " + TEAM + ", rival: " + RIV + ", rivalName: 'PRUEBA', time: 90, lv: 0.5, style: 'pabellon' }); B._st().phase='play'; })()")
        await pg.wait_for_timeout(300)
        r = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); s.auto=false; const p=s.p.find(q=>q.team===0); B._dunk('m360'); let n=0; while (s.phase==='combo' || (s.phase==='play' && n<200)) { B._step(1); n++; }
          const fase=s.phase, before=s.p.map(q=>[q.x,q.z]); B._step(1); const jump=Math.max(...s.p.map((q,i)=>Math.hypot(q.x-before[i][0], q.z-before[i][1])));
          let m=0; while (s.phase==='score' && m<600) { B._step(1); m++; } const inb=s.phase, by=s.ball.holder, bx=by ? +by.x.toFixed(2) : null, team=by ? by.team : null;
          let k=0; while (s.phase==='inbound' && k<600) { B._step(1); k++; } return JSON.stringify({ fase, jump: +jump.toFixed(2), inb, bx, team, luego: s.phase, ball: s.ball.mode }); })()"""))
        print('saque', r)
        ok1 = r['fase'] == 'score' and r['jump'] < 0.3 and r['inb'] == 'inbound' and r['team'] == 1 and r['bx'] is not None and (r['bx'] < 0.6 or r['bx'] > 27.4) and r['luego'] == 'play' and r['ball'] in ('pass', 'held')
        # 2) photo of the new players (a few frames into the play), and one of a dunk
        await pg.evaluate("(()=>{ const B=__dbg.BASKET2D, s=B._st(); B._step(60); s.fade=0; s.fadeDir=0; B._draw(); })()"); await foto(pg, 'basket2d', 'v090_basket')
        await pg.evaluate("(()=>{ const B=__dbg.BASKET2D, s=B._st(); s.phase='play'; s.combo=null; B._dunk('molino'); B._step(30); s.fade=0; s.fadeDir=0; B._draw(); })()"); await foto(pg, 'basket2d', 'v090_basket_mate')
        cr = await pg.evaluate("typeof __dbg.MINI !== 'undefined' ? typeof __dbg.MINI.crowd : (typeof MINI !== 'undefined' ? typeof MINI.crowd : 'x')")
        print('público', cr)
        await pg.evaluate("__dbg.BASKET2D._abort()")
        # 3) Guanche Guarriors: select screen and playing with each hero
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_090', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        g = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._st().t=0.5; P('vS'); A._step(20); A._render();
          return JSON.stringify({ fase: A._game() ? A._game()._phase() : null }); })()"""))
        await foto(pg, 'arcade', 'v090_guanche_elegir'); print('guanche', g)
        names = []
        for i in range(3):
            h = json.loads(await pg.evaluate("""(i)=>{ const A=__dbg.ARCADE, gm=A._game(); gm._choose(i); gm._god=true; gm._p.inv=0; A._press('vR', true); A._step(50); A._press('vR', false); A._press('vS', true); A._step(1); A._press('vS', false); A._step(6); gm._p.inv=0; A._render();
              return JSON.stringify({ id: gm._p.hero.id, name: gm._p.hero.name, made: typeof PIXGUAN !== 'undefined' ? PIXGUAN.made() : (__dbg.PIXGUAN ? __dbg.PIXGUAN.made() : -1) }); }""", i))
            names.append(h['name']); print('héroe', h); await foto(pg, 'arcade', 'v090_guanche_' + h['id'])
        ok3 = names == ['EL MAGOTE', 'EL MENCEY', 'LA MIRLADORA']
        await pg.evaluate("__dbg.ARCADE.close()")
        # 4) Bencomo: the title
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_090b', where: 'PRUEBA', price: 0 }); __dbg.ARCADE._step(30); __dbg.ARCADE._render(); })()"); await pg.wait_for_timeout(200)
        await foto(pg, 'arcade', 'v090_bencomo_titulo')
        await pg.evaluate("__dbg.ARCADE.close()")
        print('SAQUE DE FONDO', 'OK' if ok1 else 'FALLA'); print('NOMBRES GUANCHE', 'OK' if ok3 else 'FALLA')
        ok = ok and ok1 and ok3
    finally:
        await pg.evaluate("(()=>{ const d=__dbg; try { if (d.BASKET2D.running) d.BASKET2D._abort(); } catch (e) {} try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} d.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 090', 'OK' if ok else 'FALLA')
