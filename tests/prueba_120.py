# v1.2.0: corredores, primera zona (San Honorato, X −998, Y 121). Las dos mitades de la vía desdoblada que baja a la
# trinchera de Camino el Vallado tienen el ancho de su carril y la misma altura donde van juntas (antes se pisaban con
# hasta 1,6 m de diferencia). Tramos: el suelo, los muros y el hueco de toda la trinchera de la zona salen de una pieza.
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, R=d.DATA.R, C=d.corrState();
      const out={ unidas: C.merged||null, aceras: C.aceras||null, tramo: C.tramo||null, seguidas: C.chained, twins: C.twins.length, estrechadas: C.narrowed, misma_altura: C.shared, anchos: C.twins.map(p=>[p[0][2], p[1][2]]), dif: 0, donde: null };
      const yAt=(ri,s,x,z)=>{ try { return d.ROADY[ri](s,x,z); } catch(e) { return null; } };
      for (const [a,b] of C.twins) { const ia=R.indexOf(a), ib=R.indexOf(b); const ca=a[4], cb=b[4]; let s=0;
        for (let i=0;i+3<ca.length;i+=2) { const L=Math.hypot(ca[i+2]-ca[i],ca[i+3]-ca[i+1]); for (let u=0;u<L;u+=2) { const x=ca[i]+(ca[i+2]-ca[i])*u/(L||1), z=ca[i+1]+(ca[i+3]-ca[i+1])*u/(L||1);
          let best=1e9, sb=0, s2=0; for (let k=0;k+3<cb.length;k+=2) { const ex=cb[k+2]-cb[k], ez=cb[k+3]-cb[k+1], L2=ex*ex+ez*ez||1, Lb=Math.sqrt(L2), t=Math.max(0,Math.min(1,((x-cb[k])*ex+(z-cb[k+1])*ez)/L2)), dd=Math.hypot(x-cb[k]-ex*t,z-cb[k+1]-ez*t); if (dd<best) { best=dd; sb=s2+Lb*t; } s2+=Lb; }
          if (best>8) continue; const nearEnd=[[cb[0],cb[1]],[cb[cb.length-2],cb[cb.length-1]],[ca[0],ca[1]],[ca[ca.length-2],ca[ca.length-1]]].some(p=>Math.hypot(p[0]-x,p[1]-z)<10); if (nearEnd) continue; const ya=yAt(ia,s+u,x,z), yb=yAt(ib,sb,x,z); if (ya==null||yb==null) continue; const df=Math.abs(ya-yb); if (df>out.dif) { out.dif=+df.toFixed(2); out.donde=[Math.round(x),Math.round(z)]; } } s+=L; } }
      return JSON.stringify(out); })()"""))
    print('corredores', r)
    ok = r['twins'] >= 1 and r['estrechadas'] >= 2 and r['dif'] < 0.4
    t = r['tramo'] or {}
    ok_t = bool(r.get('unidas')) and t.get('acera', 0) > 10 and t.get('walls', 0) > 20 and t.get('cuts', 0) > 3 and t.get('floor', 0) > 200
    print('TRAMOS', 'OK' if ok_t else 'FALLA', t)
    ok = ok and ok_t
    print('SAN_HONORATO', 'OK' if ok else 'FALLA')
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 120', 'OK' if ok else 'FALLA')
