# Pendientes grandes (v0.72): Obispado (Casa Salazar entera), tranvía bajo tierra entre Pedro Zerolo y Padre Anchieta,
# rotonda de la TF-13 bajo la TF-5 (dos túneles), Urbanización Guajara, aeropuerto (rotonda-cúpula, depósitos, naves,
# carteles P, valla, aviones que aterrizan y despegan) y calles del callejero que no son peatonales. Fotos de todo.
import os, json, base64
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py'), encoding='utf-8').read().split('async def run')[0])
async def foto(pg, name, x, z, lx, lz, h=1.7, ly=None):
    await pg.evaluate("([x,z,lx,lz,h,ly])=>{const d=__dbg; d.PLAYER.x=x+0.01; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x,y+h,z); d.camera.lookAt(lx, ly===null ? d.heightAt(lx,lz)+(h>3?0:1.2) : ly, lz);}", [x, z, lx, lz, h, ly])
    os.makedirs('shots', exist_ok=True); open('shots/' + name + '.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', name)
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, out={};
      out.obispado = d.OBISPADO.ok ? { vanos: d.OBISPADO.bays, largo: Math.round(d.OBISPADO.L), puerta: d.OBISPADO.door.map(Math.round) } : null;
      out.tranvia = { prof_600: +d.tramDepth(600).toFixed(1), prof_400: +d.tramDepth(400).toFixed(1), cubierta: d.TUNNEL_DECKS.filter(D=>D.tram).length };
      { const T=d.DATA.T; let acc=0, P=null; for (let i=0;i+3<T.length;i+=2){ const L=Math.hypot(T[i+2]-T[i],T[i+3]-T[i+1]); if (acc+L>=600){ const t=(600-acc)/L; P=[T[i]+(T[i+2]-T[i])*t, T[i+1]+(T[i+3]-T[i+1])*t]; break; } acc+=L; }
        out.tranvia.cortes = d.TCUTS.length; { let a2=0; for (let i=0;i+3<T.length;i+=2){ const L=Math.hypot(T[i+2]-T[i],T[i+3]-T[i+1]); if (a2+L>=520){ const t=(520-a2)/L; out.tranvia.p520=[Math.round(T[i]+(T[i+2]-T[i])*t), Math.round(T[i+1]+(T[i+3]-T[i+1])*t)]; break; } a2+=L; } }
        if (P) { const g=d.heightAt(P[0],P[1]), lw=d.lowAt(P[0],P[1],g-5.5); out.tranvia.punto=P.map(Math.round); out.tranvia.bajo_suelo = lw ? +(g-lw.y).toFixed(1) : null; } }
      out.tf13 = d.TF13.ok ? { anillo: d.TF13.ring.length, tuneles: d.TF13.tubes.length, accesos: d.TF13.app.length, anillo_prof: +d.depthOf(d.TF13.ring[0], 3).toFixed(1), tunel_prof: Math.max(...d.TF13.tubes.map(ri=>d.depthOf(ri, 17))).toFixed(1)*1 } : null;
      const A=d.AIRPORT; out.aeropuerto = { rotonda: !!A.rotunda, depositos: A.tanks ? A.tanks.map(Math.round) : null, naves: A.sheds || [], carteles_p: A.psigns || 0, valla_tramos: A.fence || 0 };
      out.callejero = ['Calle Bencomo','Calle Juan de Vera','Calle Rodriguez Moure','Calle Ascanio y Nieves'].map(n=>[n, R.filter(r=>r[1]>=0 && d.DATA.S[r[1]]===n).every(r=>r[0]<=12)]);
      return out; })())"""))
    for k, v in r.items(): print(k, v)
    # a plane takes off (and later lands) while you watch from the apron
    fl = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, F=d.FLIGHT, Rw=d.AIRPORT.runway; if(!Rw) return null; const m=Rw.at(Rw.tot*0.7); d.PLAYER.x=m[0]+60; d.PLAYER.z=m[1]-80; F.t=0; F.on=false; F.kind=1; __step(2,1/30);
      const out=[]; for (let i=0;i<75;i++){ __step(15,1/30); const p=F.p; out.push([Math.round(p.position.x),Math.round(p.position.y-d.heightAt(p.position.x,p.position.z)),p.visible]); } return { despega: F.kind===0, pasos: out.filter((q,i)=>i%8===0) }; })())"""))
    print('avion', fl)
    ok = bool(r['obispado']) and r['obispado']['vanos'] >= 2 and r['tranvia']['prof_600'] > 5 and r['tranvia']['prof_400'] == 0 and r['tranvia']['cubierta'] >= 1 and (r['tranvia'].get('bajo_suelo') or 0) > 4
    ok = ok and bool(r['tf13']) and r['tf13']['anillo_prof'] > 5 and r['tf13']['tunel_prof'] > 6.5 and r['aeropuerto']['rotonda'] and r['aeropuerto']['valla_tramos'] > 100 and all(c[1] for c in r['callejero'])
    ok = ok and fl and any(q[1] > 20 for q in fl['pasos'])
    # photos: Obispado, tram cutting, TF-13 roundabout, Guajara, airport
    o = r['obispado']
    await pg.evaluate("""(()=>{ const d=__dbg, O=d.OBISPADO; if(!O.ok) return; const x=O.door[0]+O.nx*16, z=O.door[1]+O.nz*16; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); d.camera.position.set(x, d.heightAt(x,z)+6, z); d.camera.lookAt(O.door[0], d.heightAt(O.door[0],O.door[1])+6, O.door[1]); })()""")
    open('shots/grandes_obispado.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto grandes_obispado')
    await foto(pg, 'grandes_tranvia_trinchera', -252, 535, -285, 620, 3)
    if r['tranvia'].get('p520'): t = r['tranvia']['p520']; await foto(pg, 'grandes_tranvia_cenital', t[0] + 0.5, t[1] - 0.5, t[0], t[1], 45, -100)
    if r['tranvia'].get('punto'): t = r['tranvia']['punto']; await foto(pg, 'grandes_tranvia_dentro', t[0] - 8, t[1] - 20, t[0] - 25, t[1] + 40, 9)
    await foto(pg, 'grandes_tranvia_alto', -230, 600, -290, 660, 40)
    await foto(pg, 'grandes_tf13_suelo', 328, 1440, 345, 1500, 2)
    await foto(pg, 'grandes_tf13_alto', 420, 1420, 345, 1500, 60)
    await foto(pg, 'grandes_guajara', 300, 1560, 360, 1680, 35)
    await foto(pg, 'grandes_aeropuerto_terminal', -3040, -160, -3040, 30, 40)
    await foto(pg, 'grandes_aeropuerto_naves', -2700, -60, -2800, -220, 30)
    if r['aeropuerto']['depositos']: t = r['aeropuerto']['depositos']; await foto(pg, 'grandes_aeropuerto_depositos', t[0] - 40, t[1] - 40, t[0] + 8, t[1] + 8, 15)
    await foto(pg, 'grandes_callejero_bencomo', -60, -200, -10, -150, 25)
    print('errores JS', errs[:3])
    print('GRANDES', 'OK' if ok and not errs else 'FALLA')
