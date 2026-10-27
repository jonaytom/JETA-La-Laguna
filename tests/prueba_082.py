# v0.82: «GUANCHE GUARRIORS», la máquina de pago de las jugueterías (beat'em up tipo Golden Axe). 1) en la juguetería
# sale la opción de la máquina y abre la de esa tienda a $1; 2) moneda, START, elegir guerrero (← → y A); 3) controles:
# andar, saltar, combo de 3 (el tercero tumba), correr con doble toque, magia con Q, montar el lagarto con B y el
# coletazo con A; 4) el piloto automático (invencible) pasa las 5 fases con su jefe; 5) fin de partida y récords.
import asyncio, os, base64, json
async def foto(pg, name):
    await pg.evaluate("__dbg.ARCADE._render()")
    d = await pg.evaluate("document.getElementById('arcade').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    A = "__dbg.ARCADE"; ok = True
    # 1) the toy shop
    tienda = json.loads(await pg.evaluate("""(()=>{ const d=__dbg; d.ARCADE.data().invited=true; d.MISSIONS.gang.jugueterias=true; const shops=d.AGUA.shops; const s=shops[0]; if(!s) return JSON.stringify({ hay:false });
      d.PLAYER.x=s.x; d.PLAYER.z=s.z; __step(1); d.AGUA.use(); const bs=[...document.querySelectorAll('#dlgOpts button')]; const i=bs.findIndex(b=>b.textContent.includes('GUANCHE GUARRIORS')); if (i>=0) bs[i].click();
      return JSON.stringify({ hay:true, tienda:s.name, opcion:i, abre:d.ARCADE.running }); })()""")); print('juguetería', tienda)
    ok1 = tienda.get('opcion', -1) >= 0 and tienda.get('abre')
    if not tienda.get('abre'): await pg.evaluate("%s.open({ id: 'guanche', key: 'prueba_gw', where: 'PRUEBA', price: 1 })" % A)
    await pg.evaluate("%s._step(60)" % A); await foto(pg, 'v082_titulo')
    await pg.evaluate("%s._step(60*8)" % A); v = await pg.evaluate("%s._st().view" % A); print('vista a los 9 s', v); await foto(pg, 'v082_demo')
    await pg.evaluate("%s._step(60*12)" % A); await foto(pg, 'v082_records')
    # 2) coin, START, choose a warrior
    m = json.loads(await pg.evaluate("""(()=>{ const A=%s, d=__dbg; d.PLAYER.money=50; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vP'); const cr=A._st().credits; P('vS'); const f0=A._game()._phase(); P('vR'); const sel=A._game()._sel(); return JSON.stringify({ creditos: cr, modo: A._st().mode, fase: f0, elegido: sel }); })()""" % A)); print('moneda', m)
    await pg.evaluate("%s._step(30)" % A); await foto(pg, 'v082_elegir')
    h = json.loads(await pg.evaluate("""(()=>{ const A=%s; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vS'); const g=A._game(); return JSON.stringify({ heroe: g._p.hero.id, fase: g._phase() }); })()""" % A)); print('guerrero', h)
    ok1 = ok1 and v == 'demo' and m['creditos'] == 1 and m['modo'] == 'play' and m['fase'] == 'select' and m['elegido'] == 1 and h['heroe'] == 'pastor'
    print('TIENDA', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    # 3) controls
    await pg.evaluate("%s._step(60*3)" % A)
    c = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; p.inv=99; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); };
      const x0=p.x; A._press('vR', true); A._step(40); A._press('vR', false); A._step(2); const anda=+(p.x-x0).toFixed(0);
      P('vT'); let alto=0; for (let i=0;i<50;i++){ A._step(1); alto=Math.max(alto,p.h); } A._step(20);
      // run: double tap
      A._press('vR', true); A._step(1); A._press('vR', false); A._step(3); A._press('vR', true); A._step(10); const corre=p.st; A._press('vR', false); A._step(10);
      // the first fight: walk on until the camera stops
      A._press('vR', true); for (let i=0;i<60*8 && !g._lock();i++) A._step(1); A._press('vR', false); A._step(60*2); const pelea=!!g._lock();
      const e=g._E.find(q=>q.k==='S' && q.hp>0); let combo=null;
      if (e) { for (let k=0;k<3;k++){ e.x=p.x+12*p.face; e.z=p.z; e.st='idle'; e.cd=99; e.inv=0; P('vS'); A._step(k<2?18:30); } combo={ vida: +e.hp.toFixed(1), max: e.max, estado: e.st }; }
      return JSON.stringify({ anda, alto: +alto.toFixed(0), corre, pelea, combo }); })()""" % A)); print('controles', c)
    await foto(pg, 'v082_pelea')
    mg = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._step(60*2); p.st='idle'; p.h=0; p.jars=4; const hp0=g._E.filter(e=>e.hp>0).map(e=>e.hp); A._press('vS',true); A._press('vP',true); A._step(2); A._press('vS',false); A._press('vP',false); A._step(60); /* v0.94: magic = both buttons */ const st=p.st; A._step(1);
      return JSON.stringify({ estado: st, zurrones: p.jars, tocados: g._E.filter(e=>e.st==='fall'||e.st==='down'||e.hp<=0).length, enemigos: hp0.length }); })()""" % A)); print('magia', mg)
    await foto(pg, 'v082_magia')
    lz = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._step(90); p.st='idle'; p.h=0; p.vh=0;
      g._liz.push({ x: p.x+4, z: p.z, vx: 0, vz: 0, face: 1, anim: 0, whip: 0, rider: null, free: true, gone: 0, drops: 0 }); P('vT'); const monta=!!p.mount; P('vS'); const cola=p.st, mordisco=(p.mount && p.mount.bite) > 0; A._step(30);
      // running on the lizard: a leap and the tail
      A._press('vR', true); A._step(1); A._press('vR', false); A._step(3); A._press('vR', true); A._step(6); P('vS'); const salto=p.st, x0=p.x; A._step(20); A._press('vR', false); const avanza=p.x-x0; A._step(20);
      P('vT'); A._step(40); return JSON.stringify({ monta, cola, mordisco, salto, avanza: Math.round(avanza) }); })()""" % A)); print('lagarto', lz)
    gw = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; p.mount=null; p.st='idle'; p.h=0; p.vh=0; A._step(5);
      // the running attack: a flying kick
      A._press('vR', true); A._step(1); A._press('vR', false); A._step(3); A._press('vR', true); A._step(8); P('vP'); const kst=p.st;  /* v0.94: the running kick is on the right button */ let kh=0; for (let i=0;i<20;i++){ A._step(1); kh=Math.max(kh,p.h); } A._press('vR', false); A._step(30);
      // the somersault over a dazed enemy
      const e=g._E.find(q=>q.hp>2 && !q.d.boss && q.k!=='D' && !q.mount) || g._spawn('S', p.x+14, p.z); let flip=null;
      if (e) { p.st='idle'; p.h=0; p.face=1; e.x=p.x+14; e.z=p.z; e.h=0; e.st='hurt'; e.stun=true; e.stT=0.8; e.inv=0; const hp0=e.hp; P('vT'); const st1=p.st; let top=0; for (let i=0;i<34;i++){ A._step(1); top=Math.max(top,p.h); }
        flip={ estado: st1, alto: Math.round(top), detras: (p.x-e.x)*1 > 0 || e.st==='fall', tumbado: ['fall','down','dead','getup'].includes(e.st), dano: +(hp0-e.hp).toFixed(1) }; }
      return JSON.stringify({ patada: kst, alto_patada: Math.round(kh), flip }); })()""" % A)); print('golpes nuevos', gw)
    await foto(pg, 'v082_lagarto')
    ok2 = c['anda'] > 30 and c['alto'] > 15 and c['corre'] == 'run' and c['pelea'] and c['combo'] and c['combo']['vida'] < c['combo']['max'] and c['combo']['estado'] in ('fall', 'down', 'dead', 'getup') \
        and mg['zurrones'] == 0 and (mg['tocados'] > 0 or mg['enemigos'] == 0) and lz['monta'] and lz['cola'] == 'bite' and lz['mordisco'] and lz['salto'] == 'whip' and lz['avanza'] > 15 and gw['patada'] == 'dash' and gw['alto_patada'] > 5 and gw['flip'] and gw['flip']['estado'] == 'flip' and gw['flip']['alto'] > 10 and gw['flip']['tumbado']
    print('CONTROLES', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    # photos of each stage (the game in play, invincible, walking into the first fight)
    for n in range(7):   # (v0.98: seven stages)
        await pg.evaluate("(n)=>{ const A=__dbg.ARCADE, g=A._game(); g._load(n); g._p.inv=999; g._god=true; A._press('vR', true); A._step(60*5); A._press('vR', false); A._step(60*2); }", n); await foto(pg, 'v082_fase%d' % (n + 1))
    await pg.evaluate("(()=>{ __dbg.ARCADE._game()._god=false; })()")
    # 4) the stages can be crossed: the demo pilot plays them (invincible) one after another, boss included
    trav = json.loads(await pg.evaluate("""(()=>{ const A=%s; const out=[]; for (let n=0;n<7;n++){ const g=A.GAMES.guanche.create(A.api, { demo: true }); g._god=true; g._load(n); let jefe=false, t=0;
        for (let i=0;i<60*300;i++){ g.update(1/60, null); if (g._boss()) jefe=true; t=i; if (g._stage()!==n || g._phase()==='clear') break; }
        const P0=g._p, cam=g._cam(); out.push({ estado: { p: [Math.round(P0.x-cam), Math.round(P0.z), P0.st, P0.face, +P0.h.toFixed(1)], lock: g._lock() && g._lock().n, E: g._E.map(e=>[e.k, e.st, +e.hp.toFixed(1), Math.round(e.x-cam), Math.round(e.z), !!e.engaged, !!e.inS, +(e.h||0).toFixed(1), e.face]), teclas: Object.keys(g.demoKeys.held).concat(Object.keys(g.demoKeys.hit).map(k=>'hit:'+k)) }, fase: n+1, heroe: g._p.hero.id, avance: +((g._cam()+200)/g._L().len).toFixed(2), jefe, pasada: g._phase()==='clear' || g._stage()!==n, segundos: Math.round(t/60), puntos: g.score }); } return JSON.stringify(out); })()""" % A)); print('recorrido', trav)
    ok3 = all(t['pasada'] and t['jefe'] for t in trav); print('FASES', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
    # 5) game over → continue → initials
    hs = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(); g._load(0); g.score=987650; g._lives(0); const p=g._p; p.inv=0; p.hp=0; p.st='idle'; for (let i=0;i<60*5;i++) A._step(1); const m1=A._st().mode; for (let i=0;i<60*12;i++) A._step(1); const m2=A._st().mode; return JSON.stringify({ m1, m2 }); })()""" % A)); print('fin de partida', hs)
    await foto(pg, 'v082_records_nuevo')
    ok4 = hs['m1'] == 'cont' and hs['m2'] == 'name'; print('RECORDS', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    await pg.evaluate("%s.close()" % A)
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 082', 'OK' if ok else 'FALLA')
