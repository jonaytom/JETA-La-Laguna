# v0.99 (Jonay): the backgrounds drawn from his photos in Guanche Guarriors (7 stages) and Bencomo (3), the wolf's bite
# on its snout, the names (Tenique, the Harimaguadas) and Guayota (the Demon Overlord) drawn pixel for pixel.
# Each stage: its background drawn by FONDOS (not the old one) and photographed.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    def foto(r, name):
        d = r.pop('foto'); os.makedirs('shots', exist_ok=True); open('shots/%s.jpg' % name, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name, r)
    try:
        # the images of every zone, made and loaded first
        await pg.evaluate("(()=>{ ['taoro','anaga','barranco','gigantes','malpais','canadas','echeyde','anaza'].forEach((k)=>__dbg.FONDOS.get(k)); })()")
        await pg.wait_for_timeout(800)
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_099', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._step(10); A._st().t=0.5; A._press('vS',true); A._step(1); A._press('vS',false); A._step(20); })()"); await pg.wait_for_timeout(300)
        okg = True
        for n in range(7):
            r = json.loads(await pg.evaluate("""(n)=>{ const A=__dbg.ARCADE, gm=A._game(), F=__dbg.FONDOS; gm._choose(2); gm._load(n); gm._god=true; A._step(200);
              let drawn=0; const d0=F.draw; F.draw=function(){ const r=d0.apply(this, arguments); if (r) drawn++; return r; }; A._render(); F.draw=d0;
              return JSON.stringify({ fase: gm._L().name, drawn, foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.85) }); }""", n))
            foto(r, 'v099_guanche_%d' % n); okg = okg and r['drawn'] > 0
        # the names, and Guayota's size (about 1.35 × a hero) and the wolf's bite near its head
        r = json.loads(await pg.evaluate("""()=>{ const A=__dbg.ARCADE, gm=A._game(); gm._load(6); A._step(100); gm._E.length=0; const p=gm._p; p.inv=0;
              const y=gm._spawn('BY', p.x+60, p.z); y.cd=99; const w=gm._spawn('T', p.x+30, p.z+10); w.st='windup'; w.cd=99;
              const S=__dbg.SPRX; const calls=[]; const d0=S.draw; S.draw=function(c,k,r,f,x,y2,face,s){ calls.push([k,s]); return d0.apply(this, arguments); }; A._render(); S.draw=d0;
              return JSON.stringify({ calls: calls.filter(c=>c[0]==='g_overlord'||c[0]==='magote'||c[0]==='mirla'||c[0]==='mencey').slice(0,4), foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.85) }); }"""))
        foto(r, 'v099_guayota')
        ov = [c for c in r['calls'] if c[0] == 'g_overlord']; okov = bool(ov) and abs(ov[0][1] - 2 / 2.4) < 0.01
        print('GUAYOTA PIXEL A PIXEL', 'OK' if okov else 'FALLA')
        await pg.evaluate("(()=>{ __dbg.ARCADE.close(); __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_099b', where: 'PRUEBA', price: 0 }); const A=__dbg.ARCADE; A._step(30); A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); })()"); await pg.wait_for_timeout(300)
        okb = True
        for n in range(3):
            r = json.loads(await pg.evaluate("""(n)=>{ const A=__dbg.ARCADE, gm=A._game(), F=__dbg.FONDOS; gm._load(n); A._step(60);
              let drawn=0; const d0=F.draw; F.draw=function(){ const r=d0.apply(this, arguments); if (r) drawn++; return r; }; A._render(); F.draw=d0;
              return JSON.stringify({ drawn, foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.85) }); }""", n))
            foto(r, 'v099_bencomo_%d' % n); okb = okb and r['drawn'] > 0
        print('FONDOS GUANCHE', 'OK' if okg else 'FALLA'); print('FONDOS BENCOMO', 'OK' if okb else 'FALLA'); ok = okg and okb and okov
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 099', 'OK' if ok else 'FALLA')
