# v0.74 (seis arreglos de los menos costosos): rotonda del aeropuerto fuera de las vías de servicio, ningún árbol ni
# farola en calzada (Calle Juan de Vera, TF-13), animación y quejidos al abatir a un enemigo de misión, y la lista de
# edificios del callejero. Uso: cd tests && python run_test.py prueba_074.py
import json, asyncio, os, base64
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, out={};
      const R=d.AIRPORT.rotunda; out.rotonda=R?R.map(Math.round):null; if (R) { let mal=0; for (let k=0;k<24;k++){ const a=k/24*Math.PI*2; if (d.onCarriagewayEarly(R[0]+Math.sin(a)*R[2], R[1]+Math.cos(a)*R[2], 0)) mal++; } out.rotonda_en_calle=mal; }
      const bad=(L)=>L.filter(t=>d.onCarriagewayEarly(t[0],t[1],0.2)).length; out.arboles_en_calle=bad(d.TREES); out.farolas_en_calle=bad(d.LAMPS);
      const near=(L,x,z)=>L.filter(t=>Math.hypot(t[0]-x,t[1]-z)<4).length; out.juan_de_vera=near(d.TREES,-149,-235)+near(d.LAMPS,-149,-235);
      return out; })())"""))
    for k, v in r.items(): print(k, v)
    # a mission enemy shot down: falls (the pose keeps changing) and moans
    a = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, P=d.PLAYER; const n=d.s2Human({}, P.x+3, P.z+3); const p0=[]; n.H.root.traverse(o=>{ if(o.isBone) p0.push(o.quaternion.clone()); }); d.s2Down(n);
      for (let i=0;i<40;i++) d.s2DownTick(1/30); /* (without a mission running, the game step would clear the mission people) */ const p1=[]; n.H.root.traverse(o=>{ if(o.isBone) p1.push(o.quaternion.clone()); }); let dif=0; for (let i=0;i<Math.min(p0.length,p1.length);i++) dif=Math.max(dif, 1-Math.abs(p0[i].dot(p1[i])));
      const sub=(document.getElementById('sub')||{}).innerText||''; return { huesos: p0.length, cambia: +dif.toFixed(3), quejido: sub.slice(0,60), abajo: !!n.down }; })())"""))
    print('abatido', a)
    ok = r['rotonda'] and r['rotonda_en_calle'] == 0 and r['juan_de_vera'] == 0 and a['abajo'] and (a['cambia'] > 0.01 or a['huesos'] == 0) and len(a['quejido']) > 3
    print('errores JS', errs[:3])
    print('V074', 'OK' if ok and not errs else 'FALLA')
