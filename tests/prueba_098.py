# v0.98 (Jonay): Guanche Guarriors with the new stages (the ravine of the rats with Gollux, the malpaís of the gorgons)
# and the new sheets: the wolf for the dogs, the gorgons (no top), the rats, Gollux and Guayota as the Demon Overlord.
# Each new enemy is drawn from its sheet (counted) and photographed in its stage.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'guanche', key: 'prueba_098', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(300)
        await pg.evaluate("(()=>{ const A=__dbg.ARCADE; A._step(10); A._st().t=0.5; A._press('vS',true); A._step(1); A._press('vS',false); A._step(20); })()"); await pg.wait_for_timeout(500)
        names = json.loads(await pg.evaluate("JSON.stringify((()=>{ const gm=__dbg.ARCADE._game(); const out=[]; for (let n=0;n<7;n++){ gm._load(n); out.push(gm._L().name); } return out; })())"))
        print('fases', names); okn = len(names) == 7 and 'EL BARRANCO DEL INFIERNO' in names and 'EL MALPAÍS DE GÜÍMAR' in names
        res = {}
        for n, ks, foto in [(2, ['RA', 'RA', 'BGX', 'T'], 'v098_barranco'), (4, ['GO', 'GM', 'BGO'], 'v098_malpais'), (6, ['BX', 'BY'], 'v098_echeyde')]:
            r = json.loads(await pg.evaluate("""([n, ks])=>{ const A=__dbg.ARCADE, gm=A._game(), S=__dbg.SPRX; gm._choose(2); gm._load(n); gm._god=true; A._step(200); gm._E.length=0; const p=gm._p; p.inv=0;
              ks.forEach((k,i)=>{ const e=gm._spawn(k, p.x+40+i*34, p.z+(i%2)*8); e.cd=99; e.st='walk'; });
              const cnt={}; const d0=S.draw; S.draw=function(c,k){ cnt[k]=(cnt[k]||0)+1; return d0.apply(this, arguments); }; A._render(); S.draw=d0;
              return JSON.stringify({ cnt, foto: document.getElementById('arcade').toDataURL('image/jpeg', 0.9) }); }""", [n, ks]))
            d = r.pop('foto'); os.makedirs('shots', exist_ok=True); open('shots/%s.jpg' % foto, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', foto, r['cnt']); res[foto] = r['cnt']
        need = {'v098_barranco': ['g_rata', 'g_gollux', 'g_lobo'], 'v098_malpais': ['g_gorgona1', 'g_gorgona2', 'g_gorgona3'], 'v098_echeyde': ['g_guayota', 'g_overlord']}
        okd = all(all(res[f].get(k, 0) > 0 for k in ks) for f, ks in need.items())
        print('FASES NUEVAS', 'OK' if okn else 'FALLA'); print('HOJAS NUEVAS DIBUJADAS', 'OK' if okd else 'FALLA'); ok = okn and okd
    finally:
        await pg.evaluate("(()=>{ try { if (__dbg.ARCADE.running) __dbg.ARCADE.close(); } catch (e) {} __dbg.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 098', 'OK' if ok else 'FALLA')
