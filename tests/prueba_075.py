# v0.75: flecha del coche en persecuciones (al perseguido, rojo) y en carreras (al control); ruta de los dos controles
# siguientes en las carreras; teclas que no se quedan pulsadas al salir de un minijuego; fútbol: portero con la mano,
# círculo en los saques, falta al portero, saque de banda con la mano; diario con todas las charlas (lo más reciente
# primero); Copa Laguna (5 partidos, final en el Estadio Francisco Peraza) y el estadio con gradas y entrada. Fotos.
# Uso: cd tests && python run_test.py prueba_075.py
import json, os, base64
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name, x, z, lx, lz, h=1.7):
    await pg.evaluate("([x,z,lx,lz,h])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx,d.heightAt(lx,lz)+(h>3?0:1.5),lz);}", [x, z, lx, lz, h])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def foto2d(pg, name):
    await pg.evaluate("(()=>{ const s=__dbg.FUTBOL2D._st(); if (s) { s.fade=0; s.fadeDir=0; } __dbg.FUTBOL2D._draw(); })()")
    d = await pg.evaluate("document.getElementById('futbol2d').toDataURL('image/jpeg', 0.85)")
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode(d.split(',')[1])); print('foto', name)
LOOK = "({skin:0xd9a47c, shirt:0xf5f5f5, pants:0x2b3a55, hair:0x1a1410, longPants:true, hd:true})"
TEAM = "[0,1,2,3,4].map(i=>({name:'A'+i, look:%s}))" % LOOK
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(3);})()")
    ok = True
    # 1) arrow over the car: chase → the red one; race → the goal
    a = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, M=d.MISSIONS, P=d.PLAYER; const c=new d.Car('sedan',0x3060c0,P.x+2.5,P.z,0); P.x=c.x+2; d.enterCar(c); __step(2);
      const orig=M.blips, oR=M.isRace; const gx=c.x+80, gz=c.z, rx=c.x-60, rz=c.z+10; M.blips=()=>[[gx,gz,'#f5b72e'],[rx,rz,'#ff3b30']];
      M.isRace=()=>false; d.GUIDE.update(); const chase=d.GUIDE.lead ? d.GUIDE.lead[2] : null;
      M.isRace=()=>true; d.GUIDE.update(); const race=d.GUIDE.lead ? d.GUIDE.lead[2] : null;
      M.blips=orig; M.isRace=oR; d.exitCar(); __step(2); return { persecucion: chase, carrera: race }; })())"""))
    print('flecha', a); ok = ok and a and a['persecucion'] == '#ff3b30' and a['carrera'] == '#f5b72e'
    # 2) races: the route of the next two controls
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, K=d.MISSIONS.kit, P=d.PLAYER; const x=P.x, z=P.z;
      const cps=[[x+40,z],[x+80,z+30],[x+120,z+10],[x+160,z]]; K.ahead(cps, 0); const a1={ siguientes: (K.data.ahead||[]).length, ruta: (K.data.aheadPath||[]).length/2 };
      const pts=[]; for (let i=0;i<=40;i++) pts.push(x+i*4, z+Math.sin(i/6)*20); K.ahead([[x+40,z+Math.sin(10/6)*20],[x+80,z+Math.sin(20/6)*20],[x+120,z+Math.sin(30/6)*20]], 0, pts); const a2={ siguientes: (K.data.ahead||[]).length, ruta: (K.data.aheadPath||[]).length/2 };
      K.ahead(cps, 3); const a3=(K.data.ahead||[]).length; K.data.ahead=null; K.data.aheadPath=null; K.data.race=false; return { a_pie: a1, con_recorrido: a2, ultimo: a3 }; })())"""))
    print('ruta adelantada', r); ok = ok and r['a_pie']['siguientes'] == 2 and r['a_pie']['ruta'] > 3 and r['con_recorrido']['siguientes'] == 2 and r['con_recorrido']['ruta'] > 15 and r['ultimo'] == 0
    # 3) a key held when a minigame starts is not left pressed after it
    k = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg; d.KEYS.add('KeyW'); d.INPUT.touch.x=0.7; d.FUTBOL2D.start({ team: %s, rival: %s, time: 60, lv: 0.3 }); const dentro=d.KEYS.has('KeyW'); d.FUTBOL2D._abort(); return { dentro, despues: d.KEYS.has('KeyW'), tactil: d.INPUT.touch.x, estado: d.GAME.state }; })())""" % (TEAM, TEAM)))
    print('teclas', k); ok = ok and not k['despues'] and k['tactil'] == 0
    # 4) football restarts
    F = "__dbg.FUTBOL2D"
    await pg.evaluate("() => { %s.start({ team: %s, rival: %s, time: 120, lv: 0.4, mateLv: 0.6 }); const s=%s._st(); s.phase='play'; }" % (F, TEAM, TEAM, F))
    f = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const F=%s, s=F._st(), out={};
      const gk=s.p.find(q=>q.team===1&&q.role==='gk'); gk.x=17; gk.y=3; F._give(gk); gk.hold=3; out.portero_mano=!!(s.sp && s.sp.kind==='gk');
      const me=s.ctl || s.p.find(q=>q.team===0&&q.role==='fwd'); s.ctl=me; me.x=gk.x+1; me.y=gk.y+1; F._step(3); out.distancia=+Math.hypot(me.x-gk.x, me.y-gk.y).toFixed(2);
      me.x=gk.x; me.y=gk.y+2.2; me.dir=-Math.PI/2; me.slide=0.5; me.vx=0; me.vy=-8.5; F._step(20); out.falta=s.banner ? s.banner.t : ''; out.sigue_suya=s.ball.owner===gk; out.portero_en_su_area=+gk.y.toFixed(1);
      return out; })())""" % F))
    await foto2d(pg, 'v075_portero')
    t = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const F=%s, s=F._st(), out={}; s.pause=0; s.ball.owner=null; s.ball.x=-0.5; s.ball.y=27; const riv=s.p.find(q=>q.team===1&&q.role==='mid'); s.last=riv;
      F._out('banda'); const tk=s.ball.owner; out.saque=s.sp ? s.sp.kind : null; out.saca=tk ? tk.team : null; const x0=tk.x, y0=tk.y; s.pause=0; F._step(30); out.no_corre=Math.hypot(tk.x-x0, tk.y-y0) < 0.05; out.con_mano=s.sp && s.sp.kind==='banda';
      const riv2=s.p.filter(q=>q.team===1).map(q=>Math.hypot(q.x-tk.x,q.y-tk.y)); out.rival_mas_cerca=+Math.min(...riv2).toFixed(2); return out; })())""" % F))
    await foto2d(pg, 'v075_saque_banda')
    await pg.evaluate("(()=>{ if (%s.running) %s._abort(); })()" % (F, F))
    print('futbol portero', f); print('futbol banda', t)
    ok = ok and f['portero_mano'] and f['distancia'] >= 3.3 and 'FALTA' in f['falta'] and f['sigue_suya'] and t['saque'] == 'banda' and t['no_corre'] and t['rival_mas_cerca'] >= 3.3
    # 5) diary: every line kept, newest first
    dg = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const M=__dbg.MISSIONS; M.logLine('Primero', 'hola'); M.logLine('Segundo', 'adiós'); const all=M.logAll(); return { primera: all[0] ? [all[0][0], all[0][3]] : null, n: all.length }; })())"""))
    print('diario', dg); ok = ok and dg['primera'] and dg['primera'][0] == 'Segundo'
    # 6) Copa Laguna and the stadium
    c = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, out={}; const t=d.MISSIONS.diary().find(q=>q.key==='copa'); out.copa=t ? t.list.map(m=>m.title) : null;
      const P=d.PERAZA; out.estadio={ ok: P.ok, gradas: P.stands.length, puerta: P.door ? P.door.map(Math.round) : null, calle: P.street };
      const c=d.COURTS.find(q=>q.id==='peraza'); out.final=c ? { final: !!c.final, label: c.label } : null; return out; })())"""))
    print('copa', c)
    ok = ok and c['copa'] and len(c['copa']) == 5 and c['estadio']['ok'] and c['estadio']['gradas'] >= 3 and c['estadio']['puerta'] and c['final'] and c['final']['final']
    await foto(pg, 'v075_peraza_alto', -300, -1000, -436, -1002, 70)
    await foto(pg, 'v075_peraza_campo', -436, -1040, -400, -985, 1.7)
    await foto(pg, 'v075_peraza_grada_oeste', -400, -960, -490, -1000, 12)
    if c['estadio']['puerta']: p = c['estadio']['puerta']; await foto(pg, 'v075_peraza_puerta', p[0] + (p[0] + 436) * 0.25, p[1] + (p[1] + 1002) * 0.25, p[0], p[1], 2)
    print('errores JS', errs[:3])
    print('V075', 'OK' if ok and not errs else 'FALLA')
