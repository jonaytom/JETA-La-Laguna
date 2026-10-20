# v0.84: el basket a 3 contra 3. 1) un partido de cancha (equipo de 2 de los de antes: se completa con El Blanco y un
# tercer rival) tiene 6 jugadores, 3 por equipo; 2) cada uno defiende a uno distinto (marcas uno a uno); 3) jugado solo
# por la máquina un buen rato: hay pases entre los tres, canastas y nadie se queda clavado; 4) foto del partido.
import asyncio, os, base64, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    a = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D; const ok=B.start({ team: [{ name: 'EL CHOPA', look: {} }, { name: 'COCO', look: {} }], rival: [{ name: 'EL MÁS ALTO', look: { shirt: 0xc0392b } }, { name: 'EL PIBE', look: { shirt: 0xc0392b } }], rivalName: 'PRUEBA', time: 150, lv: 0.5, auto: true });
      const s=B._st(); return JSON.stringify({ abre: ok, n: s.p.length, t0: s.p.filter(q=>q.team===0).map(q=>q.name), t1: s.p.filter(q=>q.team===1).map(q=>q.name) }); })()"""))
    print('equipos', a)
    ok1 = a['abre'] and a['n'] == 6 and len(a['t0']) == 3 and len(a['t1']) == 3 and 'EL BLANCO' in a['t0']
    print('EQUIPOS', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
    b = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D, s=B._st(); const pos0=s.p.map(q=>[q.x,q.z]); let holders=new Set(), passes=0, last=null, moved=s.p.map(()=>0), marksOk=true;
      for (let i=0;i<60*70;i++){ B._step(1); const h=s.ball.holder; if (h && h!==last) { if (last && last.team===h.team) passes++; holders.add(h.name); last=h; }
        if (i===600) { const m0=s.p.filter(q=>q.team===0).map(q=>q.mark && q.mark.name); marksOk = new Set(m0).size===3 && m0.every(Boolean); }
        s.p.forEach((q,k)=>{ moved[k]=Math.max(moved[k], Math.hypot(q.x-pos0[k][0], q.z-pos0[k][1])); }); if (s.phase==='end') break; }
      return JSON.stringify({ marcador: s.score, pases: passes, con_balon: [...holders], marcas_distintas: marksOk, movidos: moved.map(v=>+v.toFixed(1)) }); })()"""))
    print('partido', b)
    await pg.evaluate("__dbg.BASKET2D._draw()")
    d = await pg.evaluate("document.getElementById('basket2d').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/v084_basket3x3.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto v084_basket3x3')
    await pg.evaluate("__dbg.BASKET2D._abort()")
    ok2 = b['marcas_distintas'] and sum(b['marcador']) >= 4 and b['pases'] >= 3 and len(b['con_balon']) >= 4 and all(v > 3 for v in b['movidos'])
    print('PARTIDO', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 084', 'OK' if ok else 'FALLA')
