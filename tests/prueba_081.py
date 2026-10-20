# v0.81: «GUERRA DE NAVES», la máquina de pago de los bares. 1) en una cafetería sale la opción de la máquina (cuando El
# Blanco ya te ha llamado) y abre la máquina de ese bar a $1; 2) moneda, START y los controles: moverse, disparo, BEAM
# cargado, cápsula + Q (barra de mejoras), el módulo con B (lanzar y recoger); 3) el piloto automático (invencible) pasa
# las 3 fases con su jefe; 4) fin de partida y récords. Fotos de cada fase y de cada jefe.
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
    # 1) the bar: the machine shows up in the café's menu and opens the bar's own machine
    bar = json.loads(await pg.evaluate("""(()=>{ const d=__dbg; d.ARCADE.data().invited=true; const s=d.FOOD.shops.find(q=>q.type==='C'||q.type==='R'); if(!s) return JSON.stringify({ hay: false });
      d.FOOD.open(s); const bs=[...document.querySelectorAll('#dlgOpts button')]; const i=bs.findIndex(b=>b.textContent.includes('GUERRA DE NAVES')); if (i>=0) bs[i].click();
      const st=d.ARCADE._st(); return JSON.stringify({ hay: true, bar: s.name, opcion: i, abre: d.ARCADE.running, juego: d.ARCADE._game() ? 'demo' : st && st.mode }); })()""")); print('bar', bar)
    ok1 = bar.get('opcion', -1) >= 0 and bar.get('abre')
    if not bar.get('abre'): await pg.evaluate("%s.open({ id: 'naves', key: 'prueba_naves', where: 'PRUEBA', price: 1 })" % A)
    await pg.evaluate("%s._step(60)" % A); await foto(pg, 'v081_titulo')
    await pg.evaluate("%s._step(60*8)" % A); v = await pg.evaluate("%s._st().view" % A); print('vista a los 9 s', v); await foto(pg, 'v081_demo')
    await pg.evaluate("%s._step(60*12)" % A); await foto(pg, 'v081_records')
    # a coin (Q / right click) and START (A)
    m = await pg.evaluate("""(()=>{ const A=%s, d=__dbg; d.PLAYER.money=50; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vP'); const cr=A._st().credits; P('vS'); return JSON.stringify({ creditos: cr, modo: A._st().mode, dinero: d.PLAYER.money }); })()""" % A); print('moneda', m)
    m = json.loads(m); ok1 = ok1 and v == 'demo' and m['creditos'] == 1 and m['modo'] == 'play' and m['dinero'] == 49
    print('BAR', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    # 2) controls
    await pg.evaluate("%s._step(60*3)" % A)
    c = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; p.inv=99; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); };
      const x0=p.x, y0=p.y; A._press('vR', true); A._press('vU', true); A._step(40); A._press('vR', false); A._press('vU', false); const mueve=[+(p.x-x0).toFixed(0), +(y0-p.y).toFixed(0)];
      A._press('vS', true); A._step(1); const tiro=g._shots.some(s=>s.k==='shot'); A._step(69); A._press('vS', false); A._step(1); const beam=g._shots.some(s=>s.k==='beam' && s.lvl===2);
      return JSON.stringify({ mueve, tiro, beam }); })()""" % A)); print('controles', c)
    c2 = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p, it=g._items; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); };
      // a capsule on the ship: the mark goes to VELOC; Q takes it
      it.push({ k:'c', x:p.x, y:p.y, t:0 }); A._step(2); const cur=p.cur; P('vP'); const spd=p.spd;
      it.push({ k:'c', x:p.x, y:p.y, t:0 }, { k:'c', x:p.x+2, y:p.y, t:0 }); A._step(2); A._step(2); const cur2=p.cur;
      // the module: picked up in front, B throws it, B calls it back
      it.push({ k:'F', x:p.x, y:p.y, t:0 }); A._step(2); const tiene=g._mod.have, st0=g._mod.st; P('vT'); A._step(20); const st1=g._mod.st, mx=Math.round(g._mod.x-p.x); P('vT'); A._step(60); const st2=g._mod.st;
      return JSON.stringify({ cursor: cur, velocidad: spd, cursor2: cur2, modulo: tiene, st0, lanzado: st1, delante: mx, vuelve: st2 }); })()""" % A)); print('mejoras y módulo', c2)
    await pg.evaluate("""(()=>{ const A=%s; A._press('vS', true); A._step(70); A._press('vS', false); A._step(3); })()""" % A)
    await foto(pg, 'v081_jugando')
    ok2 = c['tiro'] and c['beam'] and c['mueve'][0] > 50 and c['mueve'][1] > 50 and c2['cursor'] == 0 and c2['velocidad'] == 1 and c2['cursor2'] == 1 and c2['modulo'] and c2['st0'] == 'front' and c2['lanzado'] == 'free' and c2['delante'] > 40 and c2['vuelve'] in ('front', 'back')
    print('CONTROLES', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    # the photos of each stage and each boss (in the game in play, invincible)
    for n in range(3):
        await pg.evaluate("(n)=>{ const A=__dbg.ARCADE, g=A._game(); g._p.inv=999; g._load(n); g._p.inv=999; g._skip(1500); A._step(60*6); }", n); await foto(pg, 'v081_fase%d' % (n + 1))
        await pg.evaluate("(n)=>{ const A=__dbg.ARCADE, g=A._game(); g._p.inv=999; g._skip(g._L().len); A._step(60*7); }", n); await foto(pg, 'v081_jefe%d' % (n + 1))
    # 3) the stages can be crossed: the demo pilot plays them (invincible) one after another, boss included
    trav = json.loads(await pg.evaluate("""(()=>{ const A=%s; const out=[]; for (let n=0;n<3;n++){ const g=A.GAMES.naves.create(A.api, { demo: true }); g._god=true; g._load(n); let jefe=false, t=0;
        for (let i=0;i<60*240;i++){ g.update(1/60, null); if (g._boss()) jefe=true; t=i; if (g._stage()!==n || g._phase()==='clear') break; }
        out.push({ fase: n+1, avance: +(g._scroll()/g._L().len).toFixed(2), jefe, pasada: g._stage()!==n || g._phase()==='clear', segundos: Math.round(t/60), puntos: g.score }); } return JSON.stringify(out); })()""" % A)); print('recorrido', trav)
    ok3 = all(t['pasada'] and t['jefe'] for t in trav); print('FASES', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
    # 4) game over → continue → initials → table
    hs = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(); g.score=987650; g._lives(0); const p=g._p; p.inv=0; p.dead=0; g._god=false; g._bul.push({ x:p.x, y:p.y, vx:0, vy:0, r:3 }); for (let i=0;i<60*4;i++) A._step(1); const m1=A._st().mode; for (let i=0;i<60*12;i++) A._step(1); const m2=A._st().mode;
      const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vU'); P('vS'); P('vU'); P('vU'); P('vS'); P('vS'); return JSON.stringify({ m1, m2, modo: A._st().mode }); })()""" % A)); print('fin de partida', hs)
    await foto(pg, 'v081_records_nuevo')
    ok4 = hs['m1'] == 'cont' and hs['m2'] == 'name'; print('RECORDS', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    await pg.evaluate("%s.close()" % A)
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 081', 'OK' if ok else 'FALLA')
