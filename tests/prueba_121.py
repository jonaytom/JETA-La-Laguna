# v1.2.0: la TF-5 de Lora Tamayo al HUC de una pieza (corrMotorwayStraighten): un eje suave, cada sentido a su lado a
# distancia fija y con un solo ancho; los dos sentidos no se pisan y la separación entre ejes es constante (±0,6 m).
import json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    r = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, C=d.corrState(), R=d.DATA.R;
      const mw=[]; R.forEach((rd,ri)=>{ if (rd[0]!==0 || !(rd[3]&1)) return; const c=rd[4]; for (let i=0;i<c.length;i+=2) if (c[i]>300 && c[i]<1900 && c[i+1]>1450 && c[i+1]<3200) { mw.push(ri); break; } });
      // distance between the two directions' axes every 20 m along the stretch
      const dist=[]; for (const ri of mw) { const c=R[ri][4]; for (let i=0;i+3<c.length;i+=2) { const x=(c[i]+c[i+2])/2, z=(c[i+1]+c[i+3])/2, dx=c[i+2]-c[i], dz=c[i+3]-c[i+1];
        let best=1e9; for (const rj of mw) { if (rj===ri) continue; const c2=R[rj][4]; for (let k=0;k+3<c2.length;k+=2) { const ex=c2[k+2]-c2[k], ez=c2[k+3]-c2[k+1], L2=ex*ex+ez*ez||1; if ((ex*dx+ez*dz)>=0) continue; const t=Math.max(0,Math.min(1,((x-c2[k])*ex+(z-c2[k+1])*ez)/L2)); best=Math.min(best, Math.hypot(x-c2[k]-ex*t, z-c2[k+1]-ez*t)); } }
        if (best<60) dist.push(+best.toFixed(1)); } }
      dist.sort((a,b)=>a-b); return JSON.stringify({ autopista: C.autopista||null, anchos: [...new Set(mw.map(ri=>R[ri][2]))], n: dist.length, min: dist[0], p10: dist[Math.floor(dist.length*0.1)], p90: dist[Math.floor(dist.length*0.9)], max: dist[dist.length-1] }); })()"""))
    print('autopista', r)
    ok = bool(r['autopista']) and r['autopista'][0].get('ramales', 0) >= 2 and r['n'] > 20 and r['p10'] > 14.6 and r['p90'] < 17.0
    print('TF5_RECTA', 'OK' if ok else 'FALLA')
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 121', 'OK' if ok else 'FALLA')
