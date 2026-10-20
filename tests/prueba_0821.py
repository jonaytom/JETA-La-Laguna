# v0.82.1: el diario (J). 1) con la partida recién empezada no sale nada que aún no se pueda hacer: ni «aún no», ni
# misiones pendientes (○), ni «Lo que sabes»; 2) lo que te cuentan por el móvil queda en su entrada (una charla con
# título); 3) al abrirse cosas (maleantes, recreativas, jugueterías, canchas) salen en «Lo que sabes» con quién te lo
# contó, qué es y dónde, y su conversación. Fotos del diario.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    async def snap(name):
        os.makedirs('shots', exist_ok=True)
        print('(sin foto)', name)  # page.screenshot se cuelga con el juego en marcha
    # 1) a new game: only what is open
    a = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, G=window.GANG; const keep={ m: G.maleIntro, s: G.sastronTut, j: G.jugueterias, b: G.basketTut, f: G.futbolTut, p: G.patrol, i: d.ARCADE.data().invited, con: d.ARCADE.data().console, casa: G.casa ? JSON.stringify(G.casa) : null }; window.__keep=keep; d.ARCADE.data().console=false; delete G.casa;
      G.maleIntro=false; G.jugueterias=false; G.basketTut=false; G.futbolTut=false; G.patrol=false; d.ARCADE.data().invited=false; d.GAME.state='play'; d.DIARIO.open(); const L=document.getElementById('diaList').textContent;
      return JSON.stringify({ abierto: d.DIARIO.open_, aun_no: /aún no/i.test(L), pendientes: (L.match(/○/g)||[]).length, sabes: L.includes('Lo que sabes'), sabidos: d.DIARIO.known().length }); })()"""))
    print('partida nueva', a); await snap('v0821_diario_nuevo')
    await pg.evaluate("__dbg.DIARIO.close()")
    ok1 = a['abierto'] and not a['aun_no'] and a['pendientes'] == 0 and not a['sabes'] and a['sabidos'] == 0
    print('OCULTO', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    # 2) a phone talk with a title goes to its own entry
    b = json.loads(await pg.evaluate("""(async()=>{ const d=__dbg; d.GAME.state='play'; let done=false; d.MISSIONS.kit.talk([['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina']], ()=>{ done=true; }, 'Las recreativas');
      for (let i=0;i<5 && !done;i++){ window.__TALK.cur && window.__TALK.cur.next(); __step(1); } const L=d.MISSIONS.log('Las recreativas'); return JSON.stringify({ hecho: done, lineas: L.length, ultima: L[0] && L[0][1] }); })()"""))
    print('charla con título', b)
    ok2 = b['hecho'] and b['lineas'] >= 1 and b['ultima'] == 'Prueba de la máquina'; print('MOVIL', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    # 3) things open: they show up in «Lo que sabes»
    c = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, G=window.GANG; G.sastronTut=true; G.maleIntro=true; d.ARCADE.data().invited=true; G.jugueterias=true; G.basketTut=true; d.GAME.state='play'; d.DIARIO.open();
      const L=document.getElementById('diaList').textContent; const items=[...document.querySelectorAll('#diaList .diaItem')].filter(e=>e.dataset.k==='__f'); const it=items.find(e=>e.textContent.includes('BENCOMO')); if (it) it.click();
      const D=document.getElementById('diaDet').textContent; return JSON.stringify({ sabes: L.includes('Lo que sabes'), sabidos: d.DIARIO.known(), detalle_quien: D.includes('El Blanco'), detalle_donde: D.includes('Teobaldo Power'), detalle_charla: D.includes('Prueba de la máquina') }); })()"""))
    print('lo que sabes', c); await snap('v0821_diario_sabes')
    m = json.loads(await pg.evaluate("""(()=>{ const items=[...document.querySelectorAll('#diaList .diaItem')].filter(e=>e.dataset.k==='__f'); const it=items.find(e=>e.textContent.includes('Maleantes')); if (it) it.click(); const D=document.getElementById('diaDet').textContent; return JSON.stringify({ maleantes: D.includes('triángulo rojo') && D.includes('Sastrón') }); })()"""))
    print('maleantes', m); await snap('v0821_diario_maleantes')
    await pg.evaluate("__dbg.DIARIO.close()")
    ok3 = c['sabes'] and all(x in c['sabidos'] for x in ['Maleantes en busca y captura', 'La máquina de El Blanco: BENCOMO', 'GUERRA DE NAVES', 'GUANCHE WARRIORS', 'Las jugueterías', 'Retos en las canchas']) and 'El coche patrulla de la banda' not in c['sabidos'] \
        and c['detalle_quien'] and c['detalle_donde'] and c['detalle_charla'] and m['maleantes']
    print('SABES', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
    # 4) v0.82.2: the toy shops on the minimap / big map, the nearest one and «MARCAR EN EL GPS» in the diary
    g = json.loads(await pg.evaluate("""(()=>{ const d=__dbg; const abierto=d.AGUA.isOpen(); { const s0=d.AGUA.shops[0]; d.PLAYER.x=s0.x+180; d.PLAYER.z=s0.z; __step(1); } const n=d.AGUA.nearestShop(); __step(3); d.BIGMAP.toggle(); const big=d.BIGMAP.open; d.BIGMAP.toggle(); d.GAME.state='play';
      d.DIARIO.open(); const items=[...document.querySelectorAll('#diaList .diaItem')].filter(e=>e.dataset.k==='__f'); const it=items.find(e=>e.textContent.includes('Las jugueterías')); if (it) it.click();
      const D=document.getElementById('diaDet').textContent; const b=document.getElementById('diaGps'); if (b) b.click(); const T=d.GPS.target;
      return JSON.stringify({ abierto, cercana: n && n.name, metros: n && Math.round(n.d), mapa: big, texto: D.includes('La más cerca'), gps: !!T && !!n && Math.hypot(T[0]-n.x, T[1]-n.z) < 1, cerrado: !d.DIARIO.open_ }); })()"""))
    print('jugueterías en el mapa', g)
    await pg.evaluate("(()=>{ __dbg.GAME.state='play'; __dbg.BIGMAP.toggle(); })()"); await pg.wait_for_timeout(300)
    os.makedirs('shots', exist_ok=True); open('shots/v0822_mapa.jpg', 'wb').write(base64.b64decode((await pg.evaluate("document.getElementById('bmc').toDataURL('image/jpeg', 0.85)")).split(',')[1])); print('foto v0822_mapa')
    await pg.evaluate("(()=>{ __dbg.BIGMAP.toggle(); __dbg.setWaypoint(null); })()")
    ok4 = g['abierto'] and g['cercana'] and g['mapa'] and g['texto'] and g['gps'] and g['cerrado']
    print('MAPA', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    await pg.evaluate("(()=>{ const k=window.__keep, G=window.GANG; G.maleIntro=k.m; G.sastronTut=k.s; G.jugueterias=k.j; G.basketTut=k.b; G.futbolTut=k.f; G.patrol=k.p; __dbg.ARCADE.data().invited=k.i; __dbg.ARCADE.data().console=k.con; if (k.casa) G.casa=JSON.parse(k.casa); else delete G.casa; })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0821', 'OK' if ok else 'FALLA')
