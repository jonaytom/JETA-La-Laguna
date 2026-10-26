# v0.85 / v0.86 / v0.87 (basket: EE. UU., Serbia y Lituania en vez de Brasil, Portugal y Uruguay; España de las mejores): «PACHANGA 3x3» y «PLAY FURBITO», los cartuchos de deportes de la GOFIO-8. v0.86 (Jonay): todo dentro de
# la consola, sin salir al mundo 3D. 1) en el menú, el cartucho abre su pantalla «elige tu selección» en la propia
# GOFIO-8; 2) con España sale el cuadro (cuartos) y A juega el partido: la consola espera detrás, 3 contra 3, tu
# equipación y la del rival que no se parece; 3) al acabar se vuelve a la consola (resultados), y ganando cuartos,
# semifinal y final: campeones, iniciales y tabla de campeones; 4) Esc vuelve al menú de cartuchos; Play Furbito con
# Brasil: 5 contra 5, y perdiendo, «¡Eliminados!» y otra vez a elegir país; 5) la juguetería vende los dos y, con todo
# comprado, te llama superfriki jugón.
import asyncio, os, base64, json
async def title(pg):
    return await pg.evaluate("document.getElementById('dlgTitle').textContent")
async def foto(pg, cid, nombre):
    d = await pg.evaluate("(id)=>{ if (id==='arcade') __dbg.ARCADE._render(); const c=document.getElementById(id); return c ? c.toDataURL('image/jpeg', 0.85) : ''; }", cid)
    if d: os.makedirs('shots', exist_ok=True); open(f'shots/{nombre}.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', nombre)
H = "const A=__dbg.ARCADE, M=__dbg.MUNDIALITO; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; const Wt=()=>A._step(30); const S=()=>M._scr();"
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        await pg.evaluate("(()=>{ const a=__dbg.ARCADE.data(); window.__keepA=JSON.stringify(a); })()")
        # 1) the cartridge opens its own screen in the console
        a = json.loads(await pg.evaluate("(()=>{ " + H + """ A.open({ console: ['bencomo', 'pachanga', 'furbito'], where: 'PRUEBA' }); A._step(40); P('vD'); P('vS'); Wt();
          return JSON.stringify({ hay: !!A.GAMES.pachanga.screen && !!A.GAMES.furbito.screen, modo: A._st().mode, abierta: A.running, vista: S() && S().v, estado: __dbg.GAME.state }); })()"""))
        print('consola', a); await foto(pg, 'arcade', 'v086_elige')
        ok1 = a['hay'] and a['modo'] == 'ext' and a['abierta'] and a['vista'] == 'pick' and a['estado'] == 'arcade'
        eq = json.loads(await pg.evaluate("JSON.stringify({ b: __dbg.MUNDIALITO._teams('pachanga'), f: __dbg.MUNDIALITO._teams('furbito') })"))
        print('selecciones', eq)
        cb = [c for c, _ in eq['b']]; cf = [c for c, _ in eq['f']]
        top = lambda L: sorted(L, key=lambda q: -q[1])
        ok1 = ok1 and len(cb) == 8 and all(c in cb for c in ('USA', 'SRB', 'LTU')) and not any(c in cb for c in ('BRA', 'POR', 'URU')) and all(c in cf for c in ('BRA', 'POR', 'URU')) and 'ESP' in [c for c, _ in top(eq['b'])[:2]] and top(eq['f'])[0][0] == 'ESP'
        print('ELIGE', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
        # 2) Spain: the bracket, then the match with the console waiting behind
        b = json.loads(await pg.evaluate("(()=>{ " + H + """ P('vR'); Wt(); P('vL'); Wt(); const sel=S().sel; P('vS'); Wt(); const vista=S().v, yo=M._T().me.name; return JSON.stringify({ sel, vista, yo }); })()"""))
        await foto(pg, 'arcade', 'v086_cuadro')
        c = json.loads(await pg.evaluate("(()=>{ " + H + """ P('vS'); const B=__dbg.BASKET2D, s=B._st(); const mine=s.p.filter(q=>q.team===0), riv=s.p.filter(q=>q.team===1);
          return JSON.stringify({ espera: A.suspended, abierta: A.running, juega: B.running, n: s.p.length, mia: mine[0].look.shirt.toString(16), rival: riv[0].look.shirt.toString(16) }); })()"""))
        cl = json.loads(await pg.evaluate("(()=>{ const M=__dbg.MUNDIALITO, T=M.TEAMS; const f=(id)=>T.find(t=>t.id===id); const [a,b]=M.kits(f('arg'), f('uru')); const bad=[]; for (const x of T) for (const y of T) if (x!==y) { const [p,q]=M.kits(x,y); if (M.near(p.shirt,q.shirt)) bad.push(x.id+'-'+y.id); } return JSON.stringify({ uru: b.shirt, choques: bad }); })()"))
        print('cuadro', b, 'partido', c, 'equipaciones', cl)
        ok2 = b['sel'] == 0 and b['vista'] == 'round' and b['yo'] == 'ESPAÑA' and c['espera'] and c['abierta'] and c['juega'] and c['n'] == 6 and c['mia'] == 'c8102e' and c['rival'] != 'c8102e' and cl['uru'] != '#5fb3e6' and not cl['choques']
        print('PARTIDO', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
        # 3) back to the console after each match; win the three rounds
        d = json.loads(await pg.evaluate("(()=>{ " + H + """ const B=__dbg.BASKET2D, out=[]; const win=(sc)=>{ B._abort(); M._end({ won: true, score: sc }); out.push({ v: S().v, r: M._T().round, espera: A.suspended, estado: __dbg.GAME.state, pausa: document.getElementById('pause').style.display }); };
          win([21, 12]); Wt(); P('vS'); Wt(); out.push({ v: S().v, r: M._T().round }); P('vS'); win([18, 16]); Wt(); P('vS'); Wt(); P('vS'); win([22, 20]); return JSON.stringify(out); })()"""))
        print('rondas', d); await foto(pg, 'arcade', 'v086_resultado')
        e = json.loads(await pg.evaluate("(()=>{ " + H + """ Wt(); P('vS'); A._step(90); const v1=S().v; return JSON.stringify({ v1 }); })()"""))
        await foto(pg, 'arcade', 'v086_campeones')
        f = json.loads(await pg.evaluate("(()=>{ " + H + """ P('vS'); Wt(); const v2=S().v; for (let i=0;i<9;i++) P('vU'); P('vS'); for (let i=0;i<13;i++) P('vU'); P('vS'); for (let i=0;i<25;i++) P('vU'); P('vS'); Wt();
          const a=A.data(); return JSON.stringify({ v2, v3: S().v, tabla: a.scores.mundial_pachanga && a.scores.mundial_pachanga[0], ganados: a.sports && a.sports.pachanga && a.sports.pachanga.won }); })()"""))
        await foto(pg, 'arcade', 'v086_tabla')
        print('campeón', e, f)
        ok3 = all(x['v'] == 'result' and not x.get('espera', False) and x.get('estado', 'arcade') == 'arcade' and x.get('pausa', '') in ('', 'none') for x in d if 'espera' in x) and d[1]['v'] == 'round' and d[1]['r'] == 1 and e['v1'] == 'champ' and f['v2'] == 'name' and f['v3'] == 'table' and f['tabla'] and f['tabla'][0] == 'JNY' and f['tabla'][1] == 'ESPAÑA' and f['ganados'] == 1
        print('CAMPEON', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
        # 4) Esc: back to the cartridges; Play Furbito with Brazil, and losing
        g = json.loads(await pg.evaluate("(()=>{ " + H + """ document.body.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true })); const m1=A._st().mode;
          A._step(30); P('vD'); P('vS'); Wt(); P('vR'); Wt(); P('vS'); Wt(); P('vS'); const F=__dbg.FUTBOL2D, s=F._st(); return JSON.stringify({ m1, juega: F.running, n: s.p.length, nombres: s.names, espera: A.suspended }); })()"""))
        print('furbito', g)
        for i in range(60): await pg.evaluate("(()=>{ try { __dbg.FUTBOL2D._step && __dbg.FUTBOL2D._step(2); } catch (e) {} })()")
        await foto(pg, 'futbol2d', 'v086_furbito')
        h = json.loads(await pg.evaluate("(()=>{ " + H + """ __dbg.FUTBOL2D._abort(); M._end({ won: false, score: [0, 2] }); const v=S().v, T0=M._T(), gano=!!(T0 && T0.last && T0.last.w === T0.me); Wt(); P('vS'); Wt(); return JSON.stringify({ v, gano, luego: S().v, estado: __dbg.GAME.state }); })()"""))
        print('eliminados', h)
        ok4 = g['m1'] == 'menu' and g['juega'] and g['n'] == 10 and g['nombres'][0] == 'BRASIL' and g['espera'] and h['v'] == 'result' and h['gano'] is False and h['luego'] == 'pick' and h['estado'] == 'arcade'
        print('FURBITO', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
        await pg.evaluate("(()=>{ __dbg.ARCADE.close(); __dbg.GAME.state='play'; __step(2); })()")
        # 5) the toy shop: the cartridges, and the superfriki
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
