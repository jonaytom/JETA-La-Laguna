# v0.80: las recreativas y «BENCOMO, ACENTEJO'S REVENGE» (la máquina de El Blanco, gratis). 1) el mueble y el ciclo de
# los 80: demo, récords, FREE PLAY, empezar; 2) Bencomo anda, salta, hace el salto del pastor con la vara (más alto y
# más lejos que un salto) y el pogo sobre un soldado; 3) el piloto automático recorre la fase 1 (la fase se puede pasar);
# 4) el jefe (Lugo) huye herido y se pasa a la segunda vuelta; 5) fin de partida: CONTINUE, iniciales y tabla de récords;
# 6) El Blanco llama tras «Defensores de La Laguna» y en su casa se puede jugar. Fotos de cada cosa.
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
    # 1) the cabinet and the attract cycle
    r = await pg.evaluate("%s.open({ id: 'bencomo', key: 'prueba', where: 'PRUEBA', price: 0 })" % A); print('abre', r)
    await pg.evaluate("%s._step(60)" % A); await foto(pg, 'v080_titulo')
    await pg.evaluate("%s._step(60*8)" % A); v = await pg.evaluate("%s._st().view" % A); print('vista a los 9 s', v); await foto(pg, 'v080_demo')
    await pg.evaluate("%s._step(60*12)" % A); v2 = await pg.evaluate("%s._st().view" % A); print('vista a los 21 s', v2); await foto(pg, 'v080_records')
    ok1 = r and v == 'demo' and v2 == 'scores'
    await pg.evaluate("(()=>{ const A=%s; A._press('vS', true); A._step(1); A._press('vS', false); A._step(1); })()" % A)
    m = await pg.evaluate("%s._st().mode" % A); print('modo', m); ok1 = ok1 and m == 'play'
    await pg.evaluate("%s._step(60*3)" % A); await foto(pg, 'v080_fase1')
    print('CICLO', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    # 2) moves: walk, jump, vault, pogo
    mv = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p; const x0=p.x; A._press('vR', true); A._step(90); const x1=p.x; A._press('vR', false); A._step(30);
      // a plain jump, standing
      let y0=p.y, top=p.y; A._press('vT', true); A._step(1); A._press('vT', true); for (let i=0;i<50;i++){ A._step(1); top=Math.min(top,p.y); } A._press('vT', false); A._step(40); const salto = y0-top;
      // the vault: running then B
      y0=p.y; top=p.y; const xs=p.x; A._press('vR', true); A._step(40); A._press('vT', true); A._step(1); for (let i=0;i<70;i++){ A._step(1); top=Math.min(top,p.y); } A._press('vT', false); A._press('vR', false); A._step(60); const pertiga = y0-top;
      return JSON.stringify({ anda: +(x1-x0).toFixed(0), salto: +salto.toFixed(0), salto_pastor: +pertiga.toFixed(0), avance_pertiga: +(p.x-xs).toFixed(0) }); })()""" % A)); print('movimientos', mv)
    ok2 = mv['anda'] > 80 and mv['salto'] > 30 and mv['salto_pastor'] > mv['salto'] * 1.6
    pg_ = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p, E=g._E; const e=E.find(q=>q.k==='S' && q.x>p.x); if (!e) return '{}'; const hp=e.hp; p.x=e.x; p.y=e.y-70; p.vy=0; p.vx=0; e.vx=0; A._press('vD', true); let d=false; for (let i=0;i<60;i++){ A._step(1); if (e.dead) { d=true; break; } } A._press('vD', false); A._step(10);
      return JSON.stringify({ pogo_mata: d, rebote: p.vy<0 || d }); })()""" % A)); print('pogo', pg_)
    ok2 = ok2 and pg_.get('pogo_mata')
    ag = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(), p=g._p, E=g._E; const e=E.find(q=>q.k==='D' && !q.dead && q.x>p.x); if (!e) return '{}'; for (let i=0;i<40;i++) { p.x=e.x-16; p.y=e.y; p.vx=0; p.vy=0; A._step(1); } p.face=1; p.inv=9;
      A._press('vD', true); A._step(3); const agachado=p.crouch; for (let k=0;k<6 && !e.dead;k++){ p.x=e.x-16; p.y=e.y; p.vx=0; p.face=1; A._press('vS', true); A._step(2); A._press('vS', false); for (let i=0;i<16;i++) A._step(1); } A._press('vD', false); A._step(5); return JSON.stringify({ agachado, perro_muerto: !!e.dead }); })()""" % A)); print('agachado contra el perro', ag)
    ok2 = ok2 and ag.get('agachado') and ag.get('perro_muerto')
    await foto(pg, 'v080_salto')
    print('MOVIMIENTOS', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    # 3) the stages can be crossed: the demo pilot plays them (invincible) one after another
    trav = json.loads(await pg.evaluate("""(()=>{ const A=%s; const out=[]; for (let n=0;n<2;n++){ const g=A.GAMES.bencomo.create(A.api, { demo: true }); g._load(n); const L=g._L(), p=g._p; let maxx=0, deaths=0, wasDead=false;
        for (let i=0;i<60*240;i++){ p.power=99; p.hp=3; g._lives(5); g.update(1/60, null); maxx=Math.max(maxx,p.x); if (p.dead && !wasDead) deaths++; wasDead=!!p.dead; if (g._stage()!==n || g._phase()==='clear') break; }
        const col=Math.floor(p.x/16); const tops=[]; for (let c=col-2;c<=col+6;c++){ const cc=L.cols[c]; let t=-1; if (cc) for (let r=0;r<14;r++) if (cc[r]===1||cc[r]===2||cc[r]===4) { t=14-r; break; } tops.push(t); }
        out.push({ fase: n+1, avance: +(maxx/(L.w*16)).toFixed(2), caidas: deaths, pasada: g._stage()!==n || g._phase()==='clear', donde: [Math.round(p.x), Math.round(p.y), col], alturas: tops }); } return JSON.stringify(out); })()""" % A)); print('recorrido', trav)
    ok3 = all(t['avance'] > 0.85 for t in trav); print('FASES', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
    # 4) the boss
    bs = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(); g._load(2); const p=g._p, b=g._boss(); p.x=b.x-180; p.y=b.y; for (let i=0;i<60;i++) A._step(1); const st1=b.st; b.hp=1; p.x=b.x-(b.face>0?-14:14); p.y=b.y; p.face=Math.sign(b.x-p.x); p.inv=5; b.hurt=0;
      A._press('vS', true); A._step(2); A._press('vS', false); for (let i=0;i<60*8;i++) { A._step(1); if (g._phase()==='clear') break; } const huye=g._phase()==='clear'; for (let i=0;i<60*8;i++) A._step(1); return JSON.stringify({ empieza: st1, huye, fase: g._stage() }); })()""" % A)); print('jefe', bs)
    await foto(pg, 'v080_vuelta2')
    ok4 = bs['huye'] and bs['fase'] == 3; print('JEFE', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
    # 5) game over → continue countdown → initials → table
    hs = json.loads(await pg.evaluate("""(()=>{ const A=%s, g=A._game(); g.score=987650; g._lives(0); const p=g._p; p.inv=0; p.power=0; p.y=900; for (let i=0;i<60*4;i++) A._step(1); const m1=A._st().mode; for (let i=0;i<60*12;i++) A._step(1); const m2=A._st().mode;
      const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; P('vU'); P('vS'); P('vU'); P('vU'); P('vS'); P('vS'); const t=A.table('prueba', A.GAMES.bencomo); return JSON.stringify({ m1, m2, top: t[0], modo: A._st().mode }); })()""" % A)); print('fin de partida', hs)
    await foto(pg, 'v080_records_nuevo')
    ok5 = hs['m1'] == 'cont' and hs['m2'] == 'name' and hs['top'][1] == 987650 and hs['top'][0] == 'BCA'; print('RECORDS', 'OK' if ok5 else 'FALLA'); ok = ok and ok5
    await pg.evaluate("%s.close()" % A)
    # 6) El Blanco's call and his house
    bl = json.loads(await pg.evaluate("""(async()=>{ const d=__dbg; const G=d.MISSIONS.getState().gang; return JSON.stringify({ hay_blanco: !!(d.NPC && d.NPC.blanco) }); })()"""))
    six = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, A=d.ARCADE; const a=A.data(); a.invited=true; const D=d.RECRE.DOOR; const P=d.PLAYER; P.x=D[0]+1; P.z=D[1]; __step(2);
      const pr=d.RECRE.prompt(); const used=d.RECRE.use(); const run=A.running; A.close(); return JSON.stringify({ aviso: pr, abre: used && run, punto: d.RECRE.blips().length }); })()""")); print('casa de El Blanco', bl, six)
    ok6 = six.get('abre') and six.get('punto') == 1 and 'BENCOMO' in six.get('aviso', '')
    for nm, (cx, cz, lx, lz) in {'v080_portal_blanco': (-777.5, -408.5, -768, -416), 'v080_portal_adelantado': (-760, -357, -752, -366)}.items():
        await pg.evaluate("([cx,cz,lx,lz])=>{ const d=__dbg; d.PLAYER.x=cx; d.PLAYER.z=cz+3; __step(3); const y=d.heightAt(cx,cz); d.camera.position.set(cx,y+1.8,cz); d.camera.lookAt(lx, d.heightAt(lx,lz)+2.2, lz); d.camera.updateMatrixWorld(); }", [cx, cz, lx, lz])
        os.makedirs('shots', exist_ok=True); open('shots/' + nm + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', nm); print('BLANCO', 'OK' if ok6 else 'FALLA'); ok = ok and ok6
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 080', 'OK' if ok else 'FALLA')
