# v0.76: rifle de agua (chorro, charcos, apaga fuegos, se llena en las fuentes, se cambia con Tab/3), el que mojas te
# persigue y hay pelea, jugueterías, presentación de los maleantes (triángulo rojo), la misión de El Blanco jugada de
# principio a fin, las misiones nuevas (Secreta, Obispo, carreras del Canarión), los parkings (una sola sala ancha: se
# anda por toda ella; techo abierto sobre las escaleras; el de La Trinidad bajo toda la avenida), el Ríos Tejera y la
# acera sobre la trinchera del tranvía. Fotos de todo. Uso: cd tests && python run_test.py prueba_076.py
import json, os, base64, asyncio
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name, x, z, lx, lz, h=1.7, ly=None):
    await pg.evaluate("([x,z,lx,lz,h,ly])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx, ly===null ? d.heightAt(lx,lz)+(h>3?0:1.2) : ly, lz);}", [x, z, lx, lz, h, ly])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def talk_all(pg, n=12):
    for _ in range(n):
        if not await pg.evaluate("!!(window.__TALK && window.__TALK.cur)"): break
        await pg.evaluate("(()=>{ window.__TALK.cur.next(); __step(2); })()")
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(3);})()")
    ok = True
    # 1) the rifle: spray at a fire 7.5 m ahead (not aiming), puddles, water goes down
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, P=d.PLAYER, R=d.RIFLE; d.giveRifle(true); const x=P.x, z=P.z; P.h=0; d.CAM.yaw=0;
      const f=d.makeFire(x, z+7.5, 1); f.hp=1; f.free=true; const w0=R.water; R.firing=true; let maxDrops=0; for (let i=0;i<90;i++){ __step(1, 1/30); maxDrops=Math.max(maxDrops, d.AGUA._drops.filter(q=>q[6]>0).length); if (f.out) break; } R.firing=false;
      const dd=d.AGUA._drops.find(q=>q[6]>0)||d.AGUA._drops[0]; const diag={ h:+P.h.toFixed(2), yaw:+d.CAM.yaw.toFixed(2), jugador:[+P.x.toFixed(1),+P.z.toFixed(1)], fuego:[+f.x.toFixed(1),+f.z.toFixed(1)], gota_v:[+dd[3].toFixed(1),+dd[4].toFixed(1),+dd[5].toFixed(1)], charcos:d.AGUA._pud.filter(p=>p.t>0).map(p=>[+(p.x-x).toFixed(1),+(p.z-z).toFixed(1)]), apuntando:d.WEAPON.aiming, mano: d.RIFLE.mesh ? [+(d.RIFLE.mesh.position.x-x).toFixed(2), +d.RIFLE.mesh.position.y.toFixed(2), +(d.RIFLE.mesh.position.z-z).toFixed(2)] : null }; __step(30, 1/30);
      return { diag, gotas: maxDrops, charcos: d.AGUA._pud.filter(p=>p.t>0).length, fuego_apagado: f.out, agua: [Math.round(w0), Math.round(R.water)], hud: (document.getElementById('weap')||{}).innerText }; })())"""))
    print('rifle', r); ok = ok and r['gotas'] > 5 and r['fuego_apagado'] and r['agua'][1] < r['agua'][0]
    await pg.evaluate("(()=>{ const d=__dbg, R=d.RIFLE; d.PLAYER.h=0; d.CAM.yaw=0; R.firing=true; __step(14, 1/30); })()")
    await pg.evaluate("(()=>{ const d=__dbg, P=d.PLAYER; const y=d.heightAt(P.x,P.z); d.camera.position.set(P.x+2.6, y+1.9, P.z-1.5); d.camera.lookAt(P.x, y+1.0, P.z+4); })()")
    open('shots/v076_rifle.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto v076_rifle')
    await pg.evaluate("(()=>{ __dbg.RIFLE.firing=false; __step(40, 1/30); })()")
    # 2) Tab: fists → pistol → rifle; fountains fill it; toy shops only after El Blanco
    w = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.RIFLE, W=d.WEAPON; d.giveWeapon(6,false); const seq=[]; const now=()=>R.out?'rifle':W.out?'pistola':'puños';
      d.AGUA.setRifleOut(false,true); W.out=false; for (let i=0;i<4;i++){ d.AGUA.cycle(); seq.push(now()); }
      const f=d.PK2.fountains[0]; let lleno=null; if (f) { d.PLAYER.x=f[0]+3.2; d.PLAYER.z=f[1]; __step(2); R.water=0; d.AGUA.use(); lleno=Math.round(R.water); }
      const s=d.AGUA.shops[0]; const out={ ciclo: seq, fuentes: d.PK2.fountains.length, lleno, jugueterias: d.AGUA.shops.map(q=>q.name) };
      if (s) { d.MISSIONS.gang.jugueterias=false; d.PLAYER.x=s.x+0.5; d.PLAYER.z=s.z; __step(2); out.cerrada=d.AGUA.prompt(); d.MISSIONS.gang.jugueterias=true; out.abierta=d.AGUA.prompt(); d.MISSIONS.gang.jugueterias=false; }
      return out; })())"""))
    print('armas', w); ok = ok and w['ciclo'][:3] == ['pistola', 'rifle', 'puños'] and w['lleno'] == 100 and len(w['jugueterias']) >= 1 and not w.get('cerrada') and 'juguet' in (w.get('abierta') or '').lower()
    # 3) soak someone in the street: he comes for you and there is a fight
    p = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, P=d.PLAYER, R=d.RIFLE; const cands=d.PEDS.filter(q=>q.down<=0 && !q.canarion && q.H && q.H.root.visible).sort((a,b)=>Math.hypot(a.x-P.x,a.z-P.z)-Math.hypot(b.x-P.x,b.z-P.z)).slice(0,4); let ped=null; for (const q of cands) { ped=q; d.AGUA.setRifleOut(true,true); R.water=100;
      ped.flee=0; P.h=0; d.CAM.yaw=0; R.firing=true; for (let i=0;i<60 && !(ped.wetChase>0);i++) { P.x=ped.x; P.z=ped.z-5; P.y=d.heightAt(P.x,P.z)+0.17; __step(1,1/30); } R.firing=false; if (ped.wetChase>0) break; } if(!ped) return null; const persigue=ped.wetChase>0;
      let pelea=false; for (let i=0;i<120 && !pelea;i++){ __step(1,1/30); pelea=d.FIGHT2D.running; } if (pelea) d.FIGHT2D._abort(); return { persigue, pelea }; })())"""))
    print('mojado', p); ok = ok and p and p['persigue'] and p['pelea']
    # 4) maleantes: Sastrón phones first; red triangles
    m = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, G=d.MISSIONS.gang; G.sastronTut=true; G.maleIntro=false; d.MALEANTES._st.introT=0; __step(4,1/30); const T=window.__TALK; const habla=!!(T&&T.cur); const sub=(document.getElementById('sub')||{}).innerText||''; return { habla, linea: sub.slice(0,70) }; })())"""))
    await talk_all(pg); m['visto'] = await pg.evaluate("!!__dbg.MISSIONS.gang.maleIntro"); print('maleantes', m); ok = ok and m['habla'] and 'Sastr' in m['linea'] and m['visto']
    # 5) El Blanco's mission, start to end
    s = await pg.evaluate("__dbg.MISSIONS._story.findIndex(q=>q.title==='El rifle de agua')"); print('misión del rifle en la historia', s)
    await pg.evaluate("(i)=>{ const d=__dbg, M=d.MISSIONS; d.RIFLE.has=false; d.RIFLE.out=false; M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(20); }", s)
    await talk_all(pg)
    b = json.loads(await pg.evaluate("JSON.stringify({act: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, jug: !!__dbg.MISSIONS.gang.jugueterias, goal: __dbg.MISSIONS.kit.data.goal})")); print('blanco 1', b)
    await pg.evaluate("(()=>{ const d=__dbg; d.giveRifle(true); d.MISSIONS.onEvent('bought','rifle'); const g=d.MISSIONS.kit.data.goal; d.PLAYER.x=g[0]; d.PLAYER.z=g[1]; __step(10); })()")
    await talk_all(pg)
    for k in range(3):
        await pg.evaluate("(()=>{ const d=__dbg; const f=d.FIRES.find(q=>!q.out); if (f) d.AGUA.douseFire(f, 9); __step(2); })()"); await asyncio.sleep(2.0); await pg.evaluate("__step(4)")
    await talk_all(pg)
    await pg.evaluate("(()=>{ const d=__dbg, A=d.MISSIONS.active; const f=A.st.f; d.PLAYER.x=f[0]+3.2; d.PLAYER.z=f[1]; __step(3); d.AGUA.use(); __step(3); })()")
    await talk_all(pg)
    st = json.loads(await pg.evaluate("JSON.stringify((()=>{ const A=__dbg.MISSIONS.active; return A ? { paso: A.st.step, diana: !!A.st.tgt } : null; })())")); print('blanco 2', st)
    if st and st.get('diana'):
        await pg.evaluate("(()=>{ const A=__dbg.MISSIONS.active, t=A.st.tgt, d=__dbg; const P=d.PLAYER; P.x=t.x+11; P.z=t.z; __step(2); t.onHit(t, false, 11); t.cd=0; t.onHit(t, true, 6); t.cd=0; t.onHit(t, true, 11); __step(2); })()")
        y = await pg.evaluate("(()=>{ const d=__dbg, P=d.PLAYER, A=d.MISSIONS.active; const b=A&&A.st.boca; if(!b) return; const y=d.heightAt(P.x,P.z); d.camera.position.set(P.x, y+1.8, P.z); d.camera.lookAt(b.x, y+0.8, b.z); })()")
        open('shots/v076_boca_papa.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto v076_boca_papa')
        await talk_all(pg); await pg.evaluate("__step(10)")
    fin = json.loads(await pg.evaluate("JSON.stringify({act: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, rifleTut: !!__dbg.MISSIONS.gang.rifleTut})")); print('blanco fin', fin)
    ok = ok and b['jug'] and st and st['diana'] and not fin['act'] and fin['rifleTut']
    # 6) the new missions
    t = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, D=d.MISSIONS.diary(); const L=(k)=>{ const t=D.find(q=>q.key===k); return t ? t.list.map(m=>m.title) : null; };
      const s=d.NPC.secreta; return { secreta: L('secreta'), carreras: L('carreras'), obispo: L('obispo'), tostón: s ? [Math.round(s.x), Math.round(s.z)] : null }; })())"""))
    print('misiones', t); ok = ok and t['secreta'] and len(t['secreta']) == 6 and len(t['carreras']) == 3 and len(t['obispo']) >= 8 and t['tostón']
    if t['tostón']: q = t['tostón']; await foto(pg, 'v076_secreta', q[0] + 3, q[1] + 2.5, q[0], q[1], 1.6)
    # start each new mission and run its first lines (no errors, it sets a goal)
    res = []
    for k, n in [('secreta', 6), ('carreras', 3), ('obispo', 8)]:
        for i in range(4 if k == 'obispo' else 0, n):
            await pg.evaluate("([k,i])=>{ const d=__dbg, M=d.MISSIONS; if (M.active) M.fail('x', true); if (d.PLAYER.car) d.exitCar(); if (d.DLG.open) d.DLG.hide(); __step(5); d.PLAYER.x += 400; __step(2); M._setIdx(i, k); __step(2); } /* away first: all the Secreta's start in the same circle */", [k, i])
            sp = await pg.evaluate("([k,i])=>{ const d=__dbg, M=d.MISSIONS; const tr=M.diary().find(q=>q.key===k); const it=tr.list[i]; return it ? it.title : null; }", [k, i])
            # walk to the start circle of that track
            pos = json.loads(await pg.evaluate("([k])=>JSON.stringify((()=>{ const b=__dbg.MISSIONS.blips(); return b.map(q=>[Math.round(q[0]),Math.round(q[1]),q[2]]); })())", [k]))
            col = {'secreta': '#ff8a65', 'carreras': '#00e5ff', 'obispo': '#b388ff'}[k]
            c = next((q for q in pos if q[2] == col), None)
            if not c:
                dg = await pg.evaluate("([k,i])=>JSON.stringify((()=>{ const M=__dbg.MISSIONS; const tr=M.diary().find(q=>q.key===k); return { activa: M.active && M.active.title, estado: tr.list.map(m=>m.state).join(','), bloqueada: tr.locked, colores: M.blips().map(q=>q[2]), estadoJuego: __dbg.GAME.state }; })())", [k, i])
                res.append([k, i, sp, 'sin círculo', dg]); continue
            await pg.evaluate("([x,z])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(20); }", c[:2])
            await talk_all(pg, 20); await pg.evaluate("__step(10)")
            g = json.loads(await pg.evaluate("JSON.stringify({act: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, goal: !!__dbg.MISSIONS.kit.data.goal})"))
            if g['act'] and not g['goal']: await asyncio.sleep(3.5); await pg.evaluate("__step(5)"); g = json.loads(await pg.evaluate("JSON.stringify({act: __dbg.MISSIONS.active && __dbg.MISSIONS.active.title, goal: !!__dbg.MISSIONS.kit.data.goal})"))  # races start after a 3 s countdown
            res.append([k, i, sp, g['act'], g['goal']])
    for q in res: print('  empieza', q)
    ok = ok and all(len(q) == 5 and q[3] and q[4] for q in res)
    await pg.evaluate("(()=>{ const M=__dbg.MISSIONS; if (M.active) M.fail('x', true); if (__dbg.PLAYER.car) __dbg.exitCar(); if (__dbg.DLG.open) __dbg.DLG.hide(); __step(5); })()")
    # 7) car parks: one deck the width of the hall; walk across the lanes; the long Trinidad one
    pk = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, P=d.PLAYER, out=[]; const parks=d.CARPARKS;
      const tri=parks.filter(c=>/Trinidad/.test(c.name)); out.push({trinidad_tramos: tri.length, largo: Math.round(tri.reduce((a,c)=>a+c.L,0)), fondo:[Math.min(...tri.map(c=>c.yF)).toFixed(1), Math.max(...tri.map(c=>c.yF)).toFixed(1)]});
      for (const c of [parks.find(q=>/Cristo/.test(q.name)), tri[0], tri[Math.floor(tri.length/2)]].filter(Boolean)) { let frena=0, n=0;
        for (const v of [-12.5,-9.5,-7.25,7.25,9.5,12.5]) { const [x,z]=c.F.W((c.uc||0)+c.L*0.1, v); for (const a of [Math.PI/2, -Math.PI/2]) { P.x=x; P.z=z; const lw=d.lowAt(x,z,c.yF+0.12); if(!lw){ frena++; n++; continue; } P.y=lw.y; P.low=lw; d.CAM.yaw=Math.atan2(c.F.ux,c.F.uz)+a; d.KEYS.add('KeyW'); for (let i=0;i<30;i++) __step(1,1/30); d.KEYS.delete('KeyW'); n++; if (Math.hypot(P.x-x,P.z-z)<2.5) frena++; } }
        out.push({sala:c.name, frena, de:n}); }
      return out; })())"""))
    print('parkings', pk); ok = ok and pk[0]['trinidad_tramos'] >= 4 and pk[0]['largo'] > 300 and all(q['frena'] <= 4 for q in pk[1:])  # parked cars and columns also stop you
    # photos: Cristo stairs from the hall and from the plaza, the Trinidad hall, Ríos Tejera, the tram cutting
    cr = json.loads(await pg.evaluate("JSON.stringify((()=>{ const c=__dbg.CARPARKS.find(q=>/Cristo/.test(q.name)); if(!c) return null; const a=c.F.W(c.uc - c.L/4 + 9, 9.5), b=c.F.W(c.uc - c.L/4 - 3, 13.8); return {a, b, y:c.yF}; })())"))
    if cr:
        await pg.evaluate("([a,b,y])=>{ const d=__dbg; d.PLAYER.x=a[0]; d.PLAYER.z=a[1]; __step(2); d.camera.position.set(a[0], y+1.8, a[1]); d.camera.lookAt(b[0], y+2.5, b[1]); }", [cr['a'], cr['b'], cr['y']])
        open('shots/v076_cristo_escalera_abajo.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto v076_cristo_escalera_abajo')
    tm = json.loads(await pg.evaluate("JSON.stringify((()=>{ const c=__dbg.CARPARKS.filter(q=>/Trinidad/.test(q.name)); const k=c[Math.floor(c.length/2)]; if(!k) return null; return {a:k.F.W(-k.L*0.4, 7.25), b:k.F.W(k.L*0.5, 4), y:k.yF}; })())"))
    if tm:
        await pg.evaluate("([a,b,y])=>{ const d=__dbg; d.PLAYER.x=a[0]; d.PLAYER.z=a[1]; __step(2); d.camera.position.set(a[0], y+1.9, a[1]); d.camera.lookAt(b[0], y+1.4, b[1]); }", [tm['a'], tm['b'], tm['y']])
        open('shots/v076_trinidad_parking.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto v076_trinidad_parking')
    rt = json.loads(await pg.evaluate("JSON.stringify(__dbg.RIOS.pts ? [Math.round(__dbg.RIOS.cx), Math.round(__dbg.RIOS.cz)] : null)")); print('Ríos Tejera', rt); ok = ok and rt
    if rt: await foto(pg, 'v076_rios_tejera', rt[0] + 25, rt[1] - 35, rt[0], rt[1], 6)
    await foto(pg, 'v076_trinchera_campus', -190, 742, -205, 728, 4)
    await foto(pg, 'v076_rampa_cristo', 131, -640, 131, -625, 3)
    print('errores JS', errs[:3])
    print('V076', 'OK' if ok and not errs else 'FALLA')
