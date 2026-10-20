# v0.85: «PACHANGA 3x3» y «PLAY FURBITO», los cartuchos de deportes de la GOFIO-8. 1) salen en el menú de la consola y,
# al elegirlos, se apaga la máquina y sale «Elige tu selección»; 2) con España empieza el partido de cuartos (3 contra
# 3), con tu equipación y el rival con una que no se parezca; 3) las equipaciones parecidas (Argentina–Uruguay) hacen
# que el rival salga con la segunda; 4) ganando cuartos, semifinal y final: campeón, iniciales en la tabla de campeones;
# 5) Play Furbito arranca el partido de fútbol (5 contra 5); 6) la juguetería vende los dos y, con todo comprado, te
# llama superfriki jugón y abre el torneo.
import asyncio, os, base64, json
async def click(pg, txt):
    return await pg.evaluate("(t)=>{ const bs=[...document.querySelectorAll('#dlgOpts button')]; const b=bs.find(x=>x.textContent.includes(t)); if (b) { b.click(); return true; } return false; }", txt)
async def title(pg):
    return await pg.evaluate("document.getElementById('dlgTitle').textContent")
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ const a=__dbg.ARCADE.data(); window.__keepA=JSON.stringify(a); })()")
        # 1) the console menu
        a = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A.open({ console: ['bencomo', 'pachanga', 'furbito'], where: 'PRUEBA' }); A._step(40);
          P('vD'); const sel=A._st().sel; P('vS'); const cerrada=!A.running; return JSON.stringify({ hay: !!A.GAMES.pachanga && !!A.GAMES.furbito, sel, cerrada }); })()"""))
        await pg.wait_for_timeout(300)
        t1 = await title(pg); print('consola', a, t1)
        ok1 = a['hay'] and a['sel'] == 1 and a['cerrada'] and 'SELECCI' in t1
        print('MENU', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
        # 2) Spain: the quarter-final
        await click(pg, 'ESPAÑA'); t2 = await title(pg); await click(pg, 'jugar')
        b = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); const mine=s.p.filter(q=>q.team===0), riv=s.p.filter(q=>q.team===1);
          return JSON.stringify({ ronda: window.__dbg.MUNDIALITO._T() && window.__dbg.MUNDIALITO._T().round, juega: B.running, n: s.p.length, mia: mine[0].look.shirt.toString(16), rival: riv[0].look.shirt.toString(16), nombre: s.names }); })()"""))
        print('cuartos', t2, b)
        await pg.evaluate("__dbg.BASKET2D._step(60*3); __dbg.BASKET2D._draw()")
        d = await pg.evaluate("document.getElementById('basket2d').toDataURL('image/jpeg', 0.85)")
        os.makedirs('shots', exist_ok=True); open('shots/v085_pachanga.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v085_pachanga')
        cl = json.loads(await pg.evaluate("(()=>{ const M=__dbg.MUNDIALITO, T=M.TEAMS; const f=(id)=>T.find(t=>t.id===id); const [a,b]=M.kits(f('arg'), f('uru')); const bad=[]; for (const x of T) for (const y of T) if (x!==y) { const [p,q]=M.kits(x,y); if (M.near(p.shirt,q.shirt)) bad.push(x.id+'-'+y.id); } return JSON.stringify({ uru: b.shirt, choques: bad }); })()"))
        print('equipaciones', cl)
        ok2 = 'CUARTOS' in t2 and b['juega'] and b['n'] == 6 and b['mia'] == 'c8102e' and b['rival'] != 'c8102e' and cl['uru'] != '#5fb3e6' and not cl['choques']
        print('PARTIDO', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
        # 4) win the three rounds
        await pg.evaluate("(()=>{ __dbg.BASKET2D._abort(); __dbg.MUNDIALITO._after({ won: true, score: [21, 12] }); })()"); t3 = await title(pg); await click(pg, 'Seguir'); t4 = await title(pg); await click(pg, 'jugar'); await pg.wait_for_timeout(200)
        await pg.evaluate("(()=>{ __dbg.BASKET2D._abort(); __dbg.MUNDIALITO._after({ won: true, score: [18, 16] }); })()"); t5 = await title(pg); await click(pg, 'Seguir'); await click(pg, 'jugar'); await pg.wait_for_timeout(200)
        await pg.evaluate("(()=>{ __dbg.BASKET2D._abort(); __dbg.MUNDIALITO._after({ won: true, score: [22, 20] }); })()"); t6 = await title(pg)
        await pg.evaluate("(()=>{ const i=document.querySelector('#dlgOpts input'); if (i) { i.value='JNY'; const b=document.querySelector('#dlgOpts button'); b.click(); } })()")
        c = json.loads(await pg.evaluate("(()=>{ const a=__dbg.ARCADE.data(); return JSON.stringify({ tabla: a.scores.mundial_pachanga && a.scores.mundial_pachanga[0], ganados: a.sports && a.sports.pachanga && a.sports.pachanga.won }); })()"))
        print('mundialito', t3, t4, t5, t6, c)
        ok3 = 'SEMIFINAL' in t3 and 'SEMIFINAL' in t4 and 'FINAL' in t5 and 'CAMPEONA' in t6 and c['tabla'] and c['tabla'][0] == 'JNY' and c['ganados'] == 1
        print('CAMPEON', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
        # 5) Play Furbito
        await pg.evaluate("(()=>{ __dbg.DLG.hide(); __dbg.GAME.state='play'; __dbg.MUNDIALITO.start('furbito'); })()"); await click(pg, 'BRASIL'); await click(pg, 'jugar'); await pg.wait_for_timeout(200)
        f = json.loads(await pg.evaluate("(()=>{ const F=__dbg.FUTBOL2D; const s=F._st(); return JSON.stringify({ juega: F.running, n: s.p.length, nombres: s.names }); })()"))
        print('furbito', f)
        await pg.evaluate("(()=>{ try { const F=__dbg.FUTBOL2D; for (let i=0;i<120;i++) F._step && F._step(1); } catch (e) {} })()")
        d = await pg.evaluate("(()=>{ const c=document.getElementById('futbol2d'); return c ? c.toDataURL('image/jpeg', 0.85) : ''; })()")
        if d: open('shots/v085_furbito.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v085_furbito')
        await pg.evaluate("(()=>{ __dbg.FUTBOL2D._abort(); })()")
        ok4 = f['juega'] and f['n'] == 10 and f['nombres'][0] == 'BRASIL'
        print('FURBITO', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
        # 6) the toy shop: the cartridges, and the superfriki
        g = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, A=d.ARCADE.data(); d.DLG.hide(); d.GAME.state='play'; A.invited=true; A.console=true; A.bought=['bencomo','naves','guanche','pachanga']; A.torneo=false; d.MISSIONS.gang.jugueterias=true; d.PLAYER.money=5000; const s=d.AGUA.shops[0]; d.PLAYER.x=s.x; d.PLAYER.z=s.z; __step(1); d.AGUA.use();
          const bs=[...document.querySelectorAll('#dlgOpts button')]; const b=bs.find(x=>x.textContent.includes('PLAY FURBITO')); const vende=!!b; if (b) b.click(); return JSON.stringify({ vende }); })()"""))
        await pg.wait_for_timeout(900)
        t7 = await title(pg)
        g2 = json.loads(await pg.evaluate("(()=>{ const A=__dbg.ARCADE.data(); return JSON.stringify({ torneo: !!A.torneo, todos: A.bought.length }); })()"))
        print('juguetería', g, g2, t7)
        ok5 = g['vende'] and g2['torneo'] and g2['todos'] == 5 and 'SUPERFRIKI' in t7
        print('SUPERFRIKI', 'OK' if ok5 else 'FALLA'); ok = ok and ok5
    finally:
        await pg.evaluate("""(()=>{ const d=__dbg; try { d.DLG.hide(); } catch (e) {} try { if (d.BASKET2D.running) d.BASKET2D._abort(); } catch (e) {} try { if (d.FUTBOL2D.running) d.FUTBOL2D._abort(); } catch (e) {} try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {}
          const k=window.__keepA; if (k) window.GANG.arcade=JSON.parse(k); d.GAME.state='play'; __step(2); })()""")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 085', 'OK' if ok else 'FALLA')
