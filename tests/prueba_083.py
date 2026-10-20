# v0.83: la casa. 1) la inmobiliaria Pisos Chachi y los pisos están en edificios del mapa; las casas que no son tuyas no
# se abren; 2) en la inmobiliaria se alquila el pisito de Herradores; 3) se entra, la tele sin consola avisa; con la
# consola GOFIO-8 sale el menú de cartuchos y se juega uno (Q vuelve al menú); 4) la cama: duermes hasta las 8 y se
# guarda; 5) la juguetería vende la consola; 6) al cargar la partida se conservan la casa y las recreativas (antes se
# perdían); 7) la leyenda del mapa. Fotos de la casa por dentro y del menú de la consola.
import asyncio, os, base64, json
async def foto(pg, name):
    await pg.evaluate("__dbg.ARCADE._render()")
    d = await pg.evaluate("document.getElementById('arcade').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
async def snap3d(pg, name):
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    try:
        await run2(pg)
    finally:
        await pg.evaluate("""(()=>{ const d=__dbg; try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} try { d.DLG.hide(); } catch (e) {} if (d.PLAYER.interior) { const it=d.PLAYER.interior, dr=it.door; d.PLAYER.interior=null; d.PLAYER.x=dr.x+dr.nx*2.5; d.PLAYER.z=dr.z+dr.nz*2.5; d.PLAYER.y=d.heightAt(d.PLAYER.x,d.PLAYER.z)+0.2; }
          const k=JSON.parse(window.__keepC||'null'), G=window.GANG; if (k) { if (k.c) G.casa=k.c; else delete G.casa; if (k.a) G.arcade=k.a; else delete G.arcade; d.PLAYER.money=k.m||0; } d.GAME.state='play'; d.GAME.tod=12; __step(2); })()""")
async def run2(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    # 1) built, and locked
    a = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, C=d.CASA; const homes=Object.keys(C.HOMES); const H=C.HOMES.herradores; if (!H) return JSON.stringify({ casas: homes, inmo: !!C.inmo });
      d.PLAYER.x=H.door.x+H.door.nx*1.2; d.PLAYER.z=H.door.z+H.door.nz*1.2; __step(1); const cerrada=!d.nearestDoor() || d.nearestDoor().it.home!=='herradores';
      return JSON.stringify({ casas: homes, inmo: !!C.inmo, cerrada, puertas: homes.map(k=>[k, Math.round(C.HOMES[k].door.x), Math.round(C.HOMES[k].door.z)]) }); })()"""))
    print('casas', a)
    ok1 = len(a['casas']) >= 3 and a['inmo'] and a.get('cerrada'); print('CASAS', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    # 2) the estate agency: rent the little flat
    b = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, C=d.CASA, G=window.GANG; window.__keepC=JSON.stringify({ c: G.casa||null, a: G.arcade||null, m: d.PLAYER.money }); G.defenders=true; C.data().intro=true; const I=C.inmo; d.PLAYER.x=I.x+I.nx*1.5; d.PLAYER.z=I.z+I.nz*1.5; d.PLAYER.money=5000; __step(1);
      const pr=C.prompt(); C.use(); let bs=[...document.querySelectorAll('#dlgOpts button')]; const i=bs.findIndex(x=>x.textContent.includes('Herradores')); if (i>=0) bs[i].click();
      bs=[...document.querySelectorAll('#dlgOpts button')]; const j=bs.findIndex(x=>x.textContent.includes('Alquilarlo')); if (j>=0) bs[j].click();
      return JSON.stringify({ aviso: pr, alquilado: C.has('herradores'), dinero: d.PLAYER.money, hasta: C.data().rent && C.data().rent.until, dia: C.data().day }); })()"""))
    print('inmobiliaria', b)
    ok2 = 'Pisos Chachi' in b['aviso'] and b['alquilado'] and b['dinero'] == 4750; print('ALQUILER', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    # 3) in through the door; the TV; the console menu
    await pg.evaluate("""(()=>{ const d=__dbg, H=d.CASA.HOMES.herradores; d.GAME.state='play'; d.PLAYER.x=H.door.x+H.door.nx*1.2; d.PLAYER.z=H.door.z+H.door.nz*1.2; __step(1); const t=d.nearestDoor(); if (t) d.useDoor(t); })()""")
    for _ in range(50):
        if await pg.evaluate("!!(__dbg.PLAYER.interior && __dbg.PLAYER.interior.home)"): break
        await pg.wait_for_timeout(100)
    c = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, H=d.CASA.HOMES.herradores; const dentro=(d.PLAYER.interior && d.PLAYER.interior.home) || null; d.PLAYER.x=H.tv.x; d.PLAYER.z=H.tv.z; __step(2); const sin=d.CASA.prompt();
      d.ARCADE.data().console=true; d.ARCADE.data().bought=['bencomo','naves']; __step(1); const con=d.CASA.prompt(); return JSON.stringify({ dentro, sin, con }); })()"""))
    print('casa por dentro', c)
    await pg.evaluate("(()=>{ const d=__dbg; d.PLAYER.x=d.CASA.HOMES.herradores.bed.x; d.PLAYER.z=d.CASA.HOMES.herradores.bed.z-1.5; d.PLAYER.h=Math.PI; __step(3); })()"); await snap3d(pg, 'v083_casa')
    m = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, A=d.ARCADE, H=d.CASA.HOMES.herradores; d.PLAYER.x=H.tv.x; d.PLAYER.z=H.tv.z; __step(1); d.CASA.use(); const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); };
      const abre=A.running, m0=A._st().mode; A._step(40); return JSON.stringify({ abre, m0 }); })()"""))
    await foto(pg, 'v083_consola_menu')
    m2 = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vD'); const sel=A._st().sel; P('vS'); const m1=A._st().mode; A._step(30); const t1=A.open ? 1 : 0; void t1;
      P('vP'); const m2=A._st().mode; A.close(); return JSON.stringify({ sel, m1, m2 }); })()"""))
    print('consola', m, m2)
    ok3 = c['dentro'] == 'herradores' and 'sin consola' in c['sin'] and 'Encender' in c['con'] and m['abre'] and m['m0'] == 'menu' and m2['sel'] == 1 and m2['m1'] == 'attract' and m2['m2'] == 'menu'
    print('CONSOLA', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
    # 4) the bed
    await pg.evaluate("(()=>{ const d=__dbg, H=d.CASA.HOMES.herradores; d.GAME.state='play'; d.GAME.tod=22; d.PLAYER.health=40; d.PLAYER.x=H.bed.x; d.PLAYER.z=H.bed.z; __step(1); window.__bedPr=d.CASA.prompt(); d.CASA.use(); })()")
    for _ in range(40):
        if await pg.evaluate("Math.abs(__dbg.GAME.tod - 8) < 0.2"): break
        await pg.wait_for_timeout(100)
    e = json.loads(await pg.evaluate("(()=>{ const d=__dbg; return JSON.stringify({ aviso: window.__bedPr, hora: d.GAME.tod, salud: d.PLAYER.health, dia: d.CASA.data().day }); })()"))
    print('cama', e)
    ok4 = 'Dormir' in e['aviso'] and abs(e['hora'] - 8) < 0.2 and e['salud'] == 100; print('CAMA', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    # out again
    await pg.evaluate("(()=>{ const d=__dbg, it=d.PLAYER.interior; if (it) { d.GAME.state='play'; d.PLAYER.x=it.exit.x; d.PLAYER.z=it.exit.z; __step(1); const t=d.nearestDoor(); if (t) d.useDoor(t); } })()")
    for _ in range(50):
        if await pg.evaluate("!__dbg.PLAYER.interior"): break
        await pg.wait_for_timeout(100)
    # 5) the toy shop sells the console; 6) save → load keeps it; 7) the legend
    f = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, A=d.ARCADE.data(); const fuera=!d.PLAYER.interior; A.console=false; A.invited=true; d.MISSIONS.gang.jugueterias=true; const s=d.AGUA.shops[0]; d.PLAYER.x=s.x; d.PLAYER.z=s.z; d.GAME.state='play'; __step(1); d.AGUA.use();
      const opts=[...document.querySelectorAll('#dlgOpts button')].map(b=>b.textContent); d.DLG.hide(); A.console=true;
      const st=JSON.parse(JSON.stringify(d.MISSIONS.getState())); delete window.GANG.casa; delete window.GANG.arcade; d.MISSIONS.setState(st);
      const kept={ casa: d.CASA.has('herradores'), consola: d.ARCADE.data().console, invitado: d.ARCADE.data().invited, cartuchos: d.ARCADE.data().bought.length };
      d.GAME.state='play'; d.BIGMAP.toggle(); const ley=document.getElementById('bmLeg').textContent; d.BIGMAP.toggle(); return JSON.stringify({ fuera, consola_en_tienda: opts.some(o=>o.includes('GOFIO-8')), kept, ley }); })()"""))
    print('tienda, guardar y leyenda', f)
    ok5 = f['fuera'] and f['consola_en_tienda'] and f['kept']['casa'] and f['kept']['consola'] and f['kept']['invitado'] and f['kept']['cartuchos'] == 2 and all(w in f['ley'] for w in ['Juguetería', 'Pisos Chachi', 'Tu casa'])
    print('TIENDA/GUARDAR/LEYENDA', 'OK' if ok5 else 'FALLA'); ok = ok and ok5
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 083', 'OK' if ok else 'FALLA')
