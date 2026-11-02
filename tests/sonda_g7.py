# v0.99.6: sonda de la fase 7 de Guanche Guarriors (el piloto no remataba a Guayota con la pantalla de 640): estado del
# héroe y del jefe cada medio segundo una vez sale el jefe.
import json
A = "__dbg.ARCADE"
async def run(pg):
    r = json.loads(await pg.evaluate("""(()=>{ const A=%s; const out=[]; const g=A.GAMES.guanche.create(A.api, { demo: true }); g._god=true; g._load(6); let t0=-1;
      for (let i=0;i<60*300;i++){ g.update(1/60, null); const b=g._boss && g._boss(); if (b && t0<0) t0=i; if (t0>=0 && (i-t0)%%30===0 && out.length<60){ const p=g._p, cam=g._cam(), B=g._E.find(e=>e.d && e.d.boss); out.push([Math.round((i-t0)/6)/10, Math.round(p.x-cam), Math.round(p.z), p.st, p.face, p.hero.id, B?[B.k,B.st,+B.hp.toFixed(1),Math.round(B.x-cam),Math.round(B.z),+(B.inv||0).toFixed(2),B.face,+(B.h||0).toFixed(1)]:null, Object.keys(g.demoKeys.held).concat(Object.keys(g.demoKeys.hit).map(k=>'hit:'+k))]); }
        if (g._phase()==='clear') { out.push('CLEAR '+Math.round(i/60)); break; } }
      return JSON.stringify(out); })()""" % A))
    for x in r: print(x)
    print('SONDA G7 OK')
