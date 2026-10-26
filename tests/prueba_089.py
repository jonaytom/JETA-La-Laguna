# v0.89 (Jonay): 1) P pausa todos los minijuegos y se reanuda con otra P (basket, fútbol, las máquinas); 2) basket: el que
# tiene el balón siempre es el tuyo; 3) basket defendiendo: clic derecho = pasas al más cercano al balón; 4) fútbol: si
# ya eres el más cercano, clic derecho = la entrada; 5) basket: ayuda en defensa cuando el rival entra hacia el aro;
# 6) Bencomo con el muñeco nuevo (foto).
import asyncio, os, base64, json
PK = "document.body.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyP', key: 'p', bubbles: true }))"
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    TEAM = "[{ name: 'EL CHOPA', look: {} }, { name: 'COCO', look: {} }, { name: 'EL BLANCO', look: {} }]"
    RIV = "[{ name: 'A', look: { shirt: 0xc0392b } }, { name: 'B', look: { shirt: 0xc0392b } }, { name: 'C', look: { shirt: 0xc0392b } }]"
    try:
        # 1) pause in the basket (real time: the loop stops)
        await pg.evaluate("(()=>{ const B=__dbg.BASKET2D; B.start({ team: " + TEAM + ", rival: " + RIV + ", rivalName: 'PRUEBA', time: 90, lv: 0.4 }); B._st().phase='play'; })()")
        await pg.wait_for_timeout(300)
        await pg.evaluate(PK); pz = await pg.evaluate("__dbg.BASKET2D._pz().on"); await pg.evaluate(PK); pz2 = await pg.evaluate("__dbg.BASKET2D._pz().on")
        print('pausa basket', pz, pz2)
        ok1 = pz and not pz2
        # 2) the one with the ball is yours; 3) defending, right click = the nearest to the ball
        b = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); const T0=s.p.filter(q=>q.team===0);
          B._give(s.p.indexOf(T0[2])); const conBalon=T0[2].human;
          const r=s.p.find(q=>q.team===1); r.x=20; r.z=7; T0[0].x=19; T0[0].z=7; T0[1].x=5; T0[1].z=3; T0[2].x=6; T0[2].z=12; B._give(s.p.indexOf(r));
          for (const q of T0) q.human=false; T0[1].human=true; s.swapAt=0; B._press('vP', true); B._step(1); B._press('vP', false); B._step(1);
          return JSON.stringify({ conBalon, ahora: T0.filter(q=>q.human).map(q=>q.name) }); })()"""))
        print('basket', b)
        ok2 = b['conBalon'] and b['ahora'] == ['EL CHOPA']
        # 5) help defence: a rival driving to the rim, the nearest defender who is not marking him moves into the lane
        h = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); const T0=s.p.filter(q=>q.team===0), T1=s.p.filter(q=>q.team===1); for (const q of T0) q.human=false; T0[0].human=true; T0[0].x=2; T0[0].z=2; s.auto=true;
          const hoopX = Math.min(...[0, 28].map(x=>x)); const r=T1[0]; B._give(s.p.indexOf(r)); s.auto=true;
          const before=T0.map(q=>[q.x,q.z]); B._step(40); const moved=T0.map((q,i)=>Math.hypot(q.x-before[i][0], q.z-before[i][1]));
          return JSON.stringify({ moved: moved.map(v=>+v.toFixed(1)) }); })()"""))
        print('ayuda', h)
        # 7) a failed combo is still flown but hits the iron; combo time 2.7 s
        c = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); s.phase='play'; s.combo=null; const p=s.p.find(q=>q.team===0); p.air=false; p.y=0; p.act=''; const h=B._hoop(0); p.x=h.x-Math.sign(h.x-14)*5; p.z=h.z; s.lastDunk=null;
          const sc0=s.score[0]; B._give(s.p.indexOf(p)); B._combo(s.p.indexOf(p), 5); const t=s.combo.t; const mal=s.combo.need[0].includes('vD') ? 'vU' : 'vD';
          B._press(mal, true); B._step(1); B._press(mal, false); const vuela=p.act==='dunk', miss=!!p.miss; let n=0; while (p.miss && n<120) { B._step(1); n++; } B._step(60);
          return JSON.stringify({ t, vuela, miss, sc: s.score[0]-sc0, fase: s.phase, n, suelto: s.ball.mode, mate: s.lastDunk }); })()"""))
        print('combo sin acertar', c)
        ok7 = abs(c['t'] - 2.7) < 1e-6 and c['vuela'] and c['miss'] and c['sc'] == 0 and c['mate'] == 'hierro'
        await pg.evaluate("__dbg.BASKET2D._abort()")
        # 4) football: already the nearest → right click = the tackle
        f = json.loads(await pg.evaluate("""(()=>{ const F=__dbg.FUTBOL2D; const L=(n)=>({ name: n, look: {} }); F.start({ team: [L('TÚ'),L('B'),L('C'),L('D'),L('E')], rival: [L('1'),L('2'),L('3'),L('4'),L('5')], time: 120, lv: 0.3 }); const s=F._st(); s.phase='play'; s.sp=null; s.pause=0;
          const me=s.ctl, r=s.p.find(q=>q.team===1 && q.role!=='gk'); r.x=me.x+0.8; r.y=me.y; F._give(r); r.drib=0; s.sp=null; me.kickCD=0; for (const q of s.p) if (q.team===0 && q!==me && q.role!=='gk') { q.x=1; q.y=me.y > 20 ? 2 : 50; }
          const cd0=me.kickCD; F._press('vP', true); F._step(1); F._press('vP', false); F._step(1); return JSON.stringify({ ctl: s.ctl===me, kickCD: me.kickCD, cd0, mio: s.ball.owner===me, suelto: !s.ball.owner }); })()"""))
        print('futbol', f)
        ok4 = f['ctl'] and (f['kickCD'] > 0 or f['mio'] or f['suelto'])
        await pg.evaluate("__dbg.FUTBOL2D._abort()")
        # 6) Bencomo, the new little man; and the pause on the machines
        await pg.evaluate("(()=>{ __dbg.ARCADE.open({ id: 'bencomo', key: 'prueba', where: 'PRUEBA', price: 0 }); })()"); await pg.wait_for_timeout(400)
        await pg.evaluate(PK); pa = await pg.evaluate("__dbg.ARCADE._pz().on"); await pg.evaluate(PK); pb = await pg.evaluate("__dbg.ARCADE._pz().on")
        print('pausa máquina', pa, pb)
        g = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); }; A._st().t=0.5; P('vS'); A._step(90); A._render();
          const d=document.getElementById('arcade').toDataURL('image/jpeg', 0.9); return JSON.stringify({ modo: A._st().mode, d }); })()"""))
        os.makedirs('shots', exist_ok=True); open('shots/v089_bencomo.jpg', 'wb').write(base64.b64decode(g['d'].split(',')[1])); print('foto v089_bencomo', g['modo'])
        ok6 = g['modo'] == 'play' and pa and not pb
        await pg.evaluate("__dbg.ARCADE.close()")
        print('PAUSA', 'OK' if ok1 else 'FALLA'); print('CONTROL BASKET', 'OK' if ok2 else 'FALLA'); print('ENTRADA FUTBOL', 'OK' if ok4 else 'FALLA'); print('BENCOMO', 'OK' if ok6 else 'FALLA'); print('COMBO SIN ACERTAR', 'OK' if ok7 else 'FALLA')
        ok = ok and ok1 and ok2 and ok4 and ok6 and ok7
    finally:
        await pg.evaluate("(()=>{ const d=__dbg; try { if (d.BASKET2D.running) d.BASKET2D._abort(); } catch (e) {} try { if (d.FUTBOL2D.running) d.FUTBOL2D._abort(); } catch (e) {} try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} d.GAME.state='play'; __step(2); })()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 089', 'OK' if ok else 'FALLA')
