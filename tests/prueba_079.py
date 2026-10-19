# v0.79: 1) rifle de agua con las dos manos (no atraviesa el brazo): la mano derecha en la empuñadura, la izquierda bajo
# el guardamanos, el antebrazo no va a lo largo del rifle; apuntando y sin apuntar, con fotos. 2) Fútbol: saque de
# centro (el rival fuera del círculo), palomitas del portero en un partido de la CPU, fuerza del tiro según la distancia
# (a tope cerca de la portería se va por encima; desde casi el medio campo, dentro) y regate con doble Espacio.
# 3) Basket: los 4 mates de combo con su animación (fotos de cada uno), combos de la CPU buena y pases largos en arco.
# 4) Mapa grande: los puntos de misión encima de los nombres. Uso: cd tests && python run_test.py prueba_079.py
import asyncio, os, base64, json
async def snap(pg, name):
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def canvas(pg, cid, name):
    d = await pg.evaluate("document.getElementById('%s').toDataURL('image/jpeg', 0.85)" % cid)
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
LOOK = "({skin:0xd9a47c, shirt:0x1f8f4e, pants:0x2b3a55, hair:0x1a1410, longPants:true, hd:true})"
TEAM = "[0,1,2,3,4].map(i=>({name:'A'+i, look:%s}))" % LOOK
RIV = "[0,1,2,3,4].map(i=>({name:'B'+i, look:%s}))" % LOOK
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    ok = True
    # ---------- 1) rifle
    GEO = """(()=>{ const d=__dbg, H=d.playerHuman, sk=H.skeleton, m=d.RIFLE.mesh; const V=()=>new d.THREE.Vector3(); const w=(n)=>{ const b=sk.getBoneByName(n); b.updateWorldMatrix(true,false); return b.getWorldPosition(V()); };
      m.updateMatrixWorld(true); const grip=V().set(0,-0.06,0).applyMatrix4(m.matrixWorld), hg=V().set(0,-0.045,d.WEAPON.aiming?0.18:0.32).applyMatrix4(m.matrixWorld), fwd=V().set(0,0,1).transformDirection(m.matrixWorld);
      const hr=w('hand_r'), hl=w('hand_l'), lr=w('lowerarm_r'); const fa=V().subVectors(hr, lr).normalize(); const ang=Math.acos(Math.min(1, Math.abs(fa.dot(fwd))))*180/Math.PI;
      return JSON.stringify({ mano_dcha: +hr.distanceTo(grip).toFixed(3), mano_izq: +hl.distanceTo(hg).toFixed(3), angulo_antebrazo: +ang.toFixed(0) }); })()"""
    await pg.evaluate("(()=>{ const d=__dbg, P=d.PLAYER; if (P.car) d.exitCar(); P.x=189; P.z=7; d.giveRifle(true); d.WEAPON.aiming=false; d.CAM.yaw=P.h+Math.PI*0.8; d.CAM.pitch=0.15; d.CAM.dist=3.2; for (let k=0;k<20;k++) __step(1,1/30,[]); })()")
    g1 = json.loads(await pg.evaluate(GEO)); print('rifle sin apuntar', g1); await snap(pg, 'v079_rifle_llevar')
    await pg.evaluate("(()=>{ const d=__dbg; d.WEAPON.aiming=true; d.CAM.yaw=d.PLAYER.h; for (let k=0;k<20;k++) __step(1,1/30,[]); })()")
    g2 = json.loads(await pg.evaluate(GEO)); print('rifle apuntando', g2); await snap(pg, 'v079_rifle_apuntar')
    await pg.evaluate("(()=>{ const d=__dbg; d.CAM.yaw=d.PLAYER.h+1.4; d.CAM.dist=2.6; for (let k=0;k<6;k++) __step(1,1/30,[]); d.WEAPON.aiming=true; })()"); await snap(pg, 'v079_rifle_apuntar_lado')
    await pg.evaluate("(()=>{ const d=__dbg; d.WEAPON.aiming=false; d.AGUA.setRifleOut(false, true); __step(2); })()")
    okr = all(g['mano_dcha'] < 0.12 and g['mano_izq'] < 0.14 and g['angulo_antebrazo'] > 25 for g in (g1, g2)); print('RIFLE', 'OK' if okr else 'FALLA'); ok = ok and okr
    # ---------- 2) football
    F = "__dbg.FUTBOL2D"
    await pg.evaluate("() => { %s.start({ team: %s, rival: %s, time: 90, lv: 0.9, mateLv: 0.9 }); %s._st().phase='play'; }" % (F, TEAM, RIV, F))
    c = json.loads(await pg.evaluate("""(()=>{ const F=%s, s=F._st(); const k=s.sp && s.sp.p; const r=s.p.find(q=>q.team===1&&q.role==='fwd'); r.x=k.x+1; r.y=k.y; F._step(2); const out = JSON.stringify({ saque: s.sp ? s.sp.kind : null, dist_rival: +Math.hypot(r.x-k.x, r.y-k.y).toFixed(2) });
      F._abort(); F.start({ team: %s, rival: %s, time: 90, lv: 0.9, mateLv: 0.9, auto: true }); F._st().phase='play'; return out; })()""" % (F, TEAM, RIV))); print('saque de centro', c)
    okc = c['saque'] == 'centro' and c['dist_rival'] >= 5.9
    dives = json.loads(await pg.evaluate("""(()=>{ const F=%s, s=F._st(); let n=0, sv=0; for (let i=0;i<60*80;i++){ F._step(1); if (s.p.some(q=>q.diveT>0)) n++; if (s.banner && /PALOMITA/.test(s.banner.t) && s.bannerT>1.1) sv++; if (s.phase==='end') break; } return JSON.stringify({ frames_en_palomita: n, paradas: sv, marcador: s.score }); })()""" % F)); print('palomitas', dives)
    await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (F, F))
    okd = dives['frames_en_palomita'] > 0
    # shot power: from 8 m and from 24 m, charged to the top (it fires by itself at the top)
    SHOT = """(D)=>{ const F=%s; F.start({ team: %s, rival: %s, time: 90, lv: 0.0, mateLv: 0.5 }); const s=F._st(); s.phase='play'; s.sp=null; s.fade=0; s.fadeDir=0; const me=s.p.find(q=>q.team===0&&q.role==='fwd'); s.ctl=me;
      for (const q of s.p) if (q!==me) { q.x = q.team ? 2 : 30; q.y = q.team ? 52 : 50; } const gk=s.p.find(q=>q.team===1&&q.role==='gk'); gk.x=-6; gk.y=3; gk.down=999; me.x=17; me.y=D; me.dir=-Math.PI/2; F._give(me);
      F._press('vS', true); F._step(60); F._press('vS', false); let maxz=0, zl=null, gol=false; for (let i=0;i<120;i++){ F._step(1); const b=s.ball; if (b.y>0.4) maxz=Math.max(maxz,b.z); if (zl===null && b.y<=0.5) zl=+b.z.toFixed(2); if (s.score[0]>0) { gol=true; break; } } F._abort(); return JSON.stringify({ D, z_en_la_linea: zl, gol }); }""" % (F, TEAM, RIV)
    near = json.loads(await pg.evaluate(SHOT, 8)); far = json.loads(await pg.evaluate(SHOT, 27)); print('tiro a tope de cerca', near, 'de lejos', far)
    okp = (not near['gol']) and far['gol']
    # dribble: double tap of sprint with the ball
    dr = json.loads(await pg.evaluate("""(()=>{ const F=%s; F.start({ team: %s, rival: %s, time: 90, lv: 0.5 }); const s=F._st(); s.phase='play'; s.sp=null; const me=s.p.find(q=>q.team===0&&q.role==='fwd'); s.ctl=me; F._give(me);
      F._press('vT', true); F._step(2); F._press('vT', false); F._step(3); F._press('vT', true); F._step(1); const d=me.drib>0; F._press('vT', false); F._step(30); const keep=s.ball.owner===me; F._abort(); return JSON.stringify({ regate: d, sigue_con_balon: keep }); })()""" % (F, TEAM, RIV))); print('regate', dr)
    okg = dr['regate']
    print('FUTBOL saque', okc, 'palomitas', okd, 'fuerza', okp, 'regate', okg); ok = ok and okc and okd and okp and okg
    # ---------- 3) basketball
    B = "__dbg.BASKET2D"; BL = LOOK
    await pg.evaluate("() => { const L=%s; %s.start({ team: [{name:'YO', look:L},{name:'COCO', look:L}], rival: [{name:'R1', look:L},{name:'R2', look:L}], time: 120, lv: 0.5 }); const s=%s._st(); s.phase='play'; s.fade=0; s.fadeDir=0; }" % (BL, B, B))
    shots = {}
    for cid in ['m360', 'molino', 'espaldas', 'piernas']:
        await pg.evaluate("(()=>{ %s._dunk('%s'); })()" % (B, cid))
        for k, n in enumerate([10, 16, 14, 12]):
            await pg.evaluate("(()=>{ %s._step(%d); %s._draw(); })()" % (B, n, B)); await canvas(pg, 'basket2d', 'v079_mate_%s_%d' % (cid, k))
        r = json.loads(await pg.evaluate("(()=>{ const s=%s._st(); %s._step(40); return JSON.stringify({ marcador: s.score }); })()" % (B, B))); shots[cid] = r
    print('mates', shots)
    arc = json.loads(await pg.evaluate("""(()=>{ const B=%s, s=B._st(); s.phase='play'; const a=s.p[0], b=s.p[1]; a.x=4; a.z=7; b.x=16; b.z=7; a.air=b.air=false; a.y=b.y=0; s.ball.holder=a; s.ball.mode='held'; B._pass(0,1); let my=0, n=0; while (s.ball.mode==='pass' && n<120) { B._step(1); my=Math.max(my, s.ball.y); n++; } return JSON.stringify({ altura_max: +my.toFixed(2), recibe: s.ball.holder===b }); })()""" % B)); print('pase largo', arc)
    await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (B, B))
    await pg.evaluate("() => { const L=%s; %s.start({ team: [{name:'A1', look:L},{name:'A2', look:L}], rival: [{name:'B1', look:L},{name:'B2', look:L}], time: 400, lv: 0.95, mateLv: 0.95, auto: true }); }" % (BL, B))
    cc = json.loads(await pg.evaluate("(()=>{ const B=%s; B._step(60*240); const s=B._st(); return JSON.stringify({ combos_cpu: s.ev.cpuCombo||0, marcador: s.score }); })()" % B)); print('combos de la CPU buena', cc)
    await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (B, B))
    sc = sum(v['marcador'][0] for v in shots.values())
    okb = sc >= 8 and arc['altura_max'] > 2.6 and arc['recibe'] and cc['combos_cpu'] >= 3; print('BASKET', 'OK' if okb else 'FALLA'); ok = ok and okb
    # ---------- 4) big map: a mission marker over the labels
    await pg.evaluate("(()=>{ const d=__dbg; d.BIGMAP.toggle(); d.BIGMAP.zoom=1.4; })()"); await asyncio.sleep(0.3); await canvas(pg, 'bmc', 'v079_mapa_grande'); await pg.evaluate("__dbg.BIGMAP.toggle()")
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 079', 'OK' if ok else 'FALLA')
