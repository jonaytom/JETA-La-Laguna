# v0.95.2 (Jonay): in Guanche Guarriors, finishing a stage on the lizard left the hero invisible at the camp (the
# lizards are cleared but he stayed «mounted»). Also: the machines start loading every sheet when they open.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_0952', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._step(10); A._st().t=0.5; A._press('vS',true); A._step(1); A._press('vS',false); A._step(20); })()"); await pg.wait_for_timeout(300)  # out of the title: the game exists
        r = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, gm=A._game(), S=__dbg.SPRX; gm._choose(0); gm._god=true; const p=gm._p; A._step(30); gm._E.length=0;
          const lz={ x:p.x+4, z:p.z, vx:0, vz:0, face:1, anim:0, whip:0, rider:null, gone:0, drops:0, free:true }; gm._liz.push(lz); p.mount=lz; lz.rider=p; lz.free=false;
          gm._clear(); A._step(3); p.inv=0; /* (still blinking from the start of the stage) */ const fase=gm._phase(); let n=0; const d0=S.draw; S.draw=function(c,k){ if (k==='magote') n++; return d0.apply(this, arguments); }; A._render(); S.draw=d0;
          const cargadas=['g_secuaz','g_bruja','g_lobo','lagarto','lz_mirla'].filter(k=>S.ready(k)).length;
          return JSON.stringify({ fase, montado: !!p.mount, dibujado: n, cargadas, foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.9) }); })()"""))
        d = r.pop('foto')
        print('campamento', r)
        os.makedirs('shots', exist_ok=True); open('shots/v0952_campamento.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0952_campamento')
        okc = r['fase'] == 'camp' and not r['montado'] and r['dibujado'] > 0; okl = r['cargadas'] == 5
        print('SE VE EN EL CAMPAMENTO', 'OK' if okc else 'FALLA'); print('HOJAS CARGADAS AL ABRIR', 'OK' if okl else 'FALLA'); ok = okc and okl
        # v0.95.3 (Jonay): the knight at a normal size, next to a foot soldier (only Lugo is big). Photo.
        await pg.evaluate("(()=>{ __dbg.ARCADE.close(); __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba_0953', where: 'PRUEBA', price: 0 }); const A=__dbg.ARCADE; A._step(30); A._st().t=0.5; A._press('vS', true); A._step(1); A._press('vS', false); A._step(30); const gm=A._game(); gm._load(0); A._step(30); })()"); await pg.wait_for_timeout(400)
        d = await pg.evaluate("(()=>{ const A=__dbg.ARCADE, gm=A._game(), p=gm._p; gm._E.length=0; p.inv=0; p.hurtT=0; const cx=gm._cam(); gm._spawn('C', p.x+90, p.y); gm._spawn('S', p.x+150, p.y); for (const e of gm._E) { e.st='walk'; e.vx=0; } A._render(); return document.getElementById('arcade').toDataURL('image/jpeg', 0.92); })()")
        open('shots/v0953_bencomo_caballero.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v0953_bencomo_caballero')
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0952', 'OK' if ok else 'FALLA')
