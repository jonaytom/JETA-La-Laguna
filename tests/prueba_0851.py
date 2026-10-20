# v0.85.1: la tanda de pendientes rápidos. 1) Esc en la consola: desde un juego vuelve al menú de cartuchos; desde el menú
# sale al mundo 3D sin el menú de pausa; 2) basket: al pasar, el que recibe pasa a ser el tuyo; 3) persecuciones: el coche
# que huye va más rápido en las curvas que uno normal; 4) canchas: ninguna pisa a otra; 5) Bencomo dice «PICADO» y no
# «POGO»; 6) fotos de los marcos grises que flotan en el casco (Plaza del Adelantado y X −60 Z −230).
import asyncio, os, base64, json, math
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    ok = True
    try:
        # 1) Esc in the console
        a = json.loads(await pg.evaluate("""(()=>{ const A=__dbg.ARCADE, d=__dbg; const P=(v)=>{ A._press(v,true); A._step(1); A._press(v,false); A._step(1); };
          const esc=()=>document.body.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true }));
          A.open({ console: ['bencomo', 'naves'], where: 'PRUEBA' }); A._step(40); P('vS'); const enJuego=A._st().mode;
          esc(); const tras1={ mode: A._st().mode, running: A.running };
          esc(); const pausa=document.getElementById('pause').style.display; __step(2);
          return JSON.stringify({ enJuego, tras1, fuera: !A.running, estado: d.GAME.state, pausa: document.getElementById('pause').style.display || pausa }); })()"""))
        print('esc', a)
        ok1 = a['enJuego'] != 'menu' and a['tras1']['mode'] == 'menu' and a['tras1']['running'] and a['fuera'] and a['estado'] == 'play' and a['pausa'] in ('', 'none')
        print('ESC', 'OK' if ok1 else 'FALLA'); ok = ok and ok1
        # 2) basket: the one who gets your pass is yours
        b = json.loads(await pg.evaluate("""(()=>{ const B=__dbg.BASKET2D; B.start({ team: [{ name: 'EL CHOPA', look: {} }, { name: 'COCO', look: {} }, { name: 'EL BLANCO', look: {} }], rival: [{ name: 'A', look: { shirt: 0xc0392b } }, { name: 'B', look: { shirt: 0xc0392b } }, { name: 'C', look: { shirt: 0xc0392b } }], rivalName: 'PRUEBA', time: 60, lv: 0.3 }); const s=B._st(); s.phase='play';
          const me=s.p.find(q=>q.human); const mate=s.p.find(q=>q.team===me.team && q!==me); s.ball.holder=me; s.ball.mode='held';
          B._pass(s.p.indexOf(me), s.p.indexOf(mate)); B._step(2);
          const r={ pasa: s.ball.mode, humano: s.p.filter(q=>q.human).map(q=>q.name), antes: me.name }; B._abort(); return JSON.stringify(r); })()"""))
        print('basket', b)
        ok2 = len(b['humano']) == 1 and b['humano'][0] != b['antes']
        print('RECIBIR', 'OK' if ok2 else 'FALLA'); ok = ok and ok2
        # 3) the chase: same route with bends, the fleeing car does more metres
        c = json.loads(await pg.evaluate("""(()=>{ const pts=[0,0, 0,80, 60,80, 60,160, 0,160, 0,260]; const run=(ch)=>{ const P=__dbg.s2Path(pts), car={ x: 0, z: 0, h: 0 }; for (let i=0;i<60*14;i++) __dbg.s2DriveCar(car, P, 1/60, 20, null, ch); return P.s; };
          return JSON.stringify({ normal: run(false), huye: run(true) }); })()"""))
        print('persecución', c)
        ok3 = c['huye'] > c['normal'] * 1.08
        print('PERSECUCION', 'OK' if ok3 else 'FALLA'); ok = ok and ok3
        # 4) courts: none overlaps another (with 1.5 m of room)
        d = json.loads(await pg.evaluate("""(()=>{ const R=__dbg.pitchRects(), bad=[]; for (let i=0;i<R.length;i++) for (let j=i+1;j<R.length;j++) if (__dbg.rectsOverlap(R[i], R[j], 1.4)) bad.push([Math.round(R[i].cx), Math.round(R[i].cz)]);
          const near=R.filter(q=>Math.hypot(q.cx+171, q.cz+462)<80).map(q=>[q.kind, Math.round(q.cx), Math.round(q.cz)]); return JSON.stringify({ n: R.length, choques: bad, junto: near }); })()"""))
        print('canchas', d)
        ok4 = d['n'] > 20 and not d['choques']
        print('CANCHAS', 'OK' if ok4 else 'FALLA'); ok = ok and ok4
        # 5) Bencomo: «PICADO»
        h = await pg.evaluate("__dbg.ARCADE.GAMES.bencomo.help((k)=>k)")
        print('ayuda', h)
        ok5 = 'PICADO' in h and 'POGO' not in h
        print('PICADO', 'OK' if ok5 else 'FALLA'); ok = ok and ok5
        # 6) photos of the grey frames
        os.makedirs('shots', exist_ok=True)
        V = [(105, -45, 0), (105, -45, math.pi / 2), (105, -45, math.pi), (105, -45, -math.pi / 2), (-60, -230, math.atan2(50, 80))]
        for i, (x, z, yaw) in enumerate(V):
            await pg.evaluate("([x,z,yaw])=>{ const d=__dbg, P=d.PLAYER; P.x=x; P.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x, y+1.7, z); d.camera.lookAt(x+Math.sin(yaw)*20, y+6, z+Math.cos(yaw)*20); }", [x, z, yaw])
            img = await pg.evaluate("window.__snap()")
            open(f'shots/v0851_marcos_{i}.jpg', 'wb').write(base64.b64decode(img.split(',')[1])); print('foto', f'v0851_marcos_{i}')
        # what is up there: meshes (not the fused city) whose box is above 5 m within 12 m of each point
        # ways raised above the ground near the spots (a footway or square drawn as a bridge would look like a floating frame)
        w = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, R=d.DATA.R, out=[]; const T=[[105,-45],[-60,-230],[-10,-150]];
          for (let ri=0; ri<R.length; ri++) { const c=R[ri][4]; let s=0, best=null; for (let i=0;i+3<c.length;i+=2) { const L=Math.hypot(c[i+2]-c[i], c[i+3]-c[i+1]); for (let k=0;k<=L;k+=2) { const x=c[i]+(c[i+2]-c[i])*k/(L||1), z=c[i+1]+(c[i+3]-c[i+1])*k/(L||1);
              if (!T.some(([a,b])=>Math.hypot(x-a,z-b)<60)) continue; let y=null; try { y=d.ROADY[ri](s+k, x, z); } catch (e) {} if (y==null) continue; const up=y-d.heightAt(x,z); if (up>2 && (!best || up>best.up)) best={ up: Math.round(up*10)/10, x: Math.round(x), z: Math.round(z) }; } s+=L; }
            if (best) out.push({ ri, tipo: R[ri][0], flags: R[ri][3], nombre: (d.STR && R[ri][1]>=0) ? d.STR[R[ri][1]] : R[ri][1], ...best }); }
          return JSON.stringify(out.slice(0, 30)); })()"""))
        print('vias_elevadas', json.dumps(w, ensure_ascii=False))
        m = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, THREE=d.THREE, out=[]; const b=new THREE.Box3(); d.scene.traverse((o)=>{ if (!o.isMesh || !o.visible) return; b.setFromObject(o); const sz=b.getSize(new THREE.Vector3()); if (sz.x>40||sz.z>40) return;
          for (const [x,z] of [[105,-45],[-60,-230],[-10,-150]]) { const cx=(b.min.x+b.max.x)/2, cz=(b.min.z+b.max.z)/2; if (Math.hypot(cx-x, cz-z) < 14 && b.min.y > d.heightAt(cx,cz)+4) out.push({ at: [x,z], nombre: o.name || (o.parent && o.parent.name) || '', c: [Math.round(cx), Math.round(cz)], y: [Math.round(b.min.y*10)/10, Math.round(b.max.y*10)/10], t: [Math.round(sz.x*10)/10, Math.round(sz.y*10)/10, Math.round(sz.z*10)/10], mat: o.material && o.material.color ? o.material.color.getHexString() : '' }); } });
          return JSON.stringify(out.slice(0, 40)); })()"""))
        print('arriba', json.dumps(m, ensure_ascii=False))
    finally:
        await pg.evaluate("""(()=>{ const d=__dbg; try { if (d.ARCADE.running) d.ARCADE.close(); } catch (e) {} try { if (d.BASKET2D.running) d.BASKET2D._abort(); } catch (e) {} d.GAME.state='play'; d.GAME.noPauseT=0; __step(2); })()""")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0851', 'OK' if ok else 'FALLA')
