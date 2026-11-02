# v0.99.6 (Jonay, Ofra X 1534 Z 2739 y bocas de la TF-5 X 1775 Z 3165: «muros en medio de la carretera y salida de
# túnel con carretera que vuela encima»): los pasos inferiores cortos se hunden menos (rampa de ~15 %) y la carretera
# de encima sube en terraplén: hueco libre >= 5,2 m en cada cruce y rampas del paso de menos del 22 %.
import asyncio, os, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, out=[];
        const segs=(c)=>{ const a=[]; let s=0; for (let i=0;i<c.length-2;i+=2){ const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); a.push([c[i],c[i+1],c[i+2],c[i+3],s,L]); s+=L; } return a; };
        for (const u of d.SHORT_UP) { if (d.TF13 && d.TF13.tubes.includes(u.ri)) continue; /* (the TF-13 bowl has its own profile) */ const A=segs(R[u.ri][4]), Ltot=A.reduce((q,g)=>q+g[5],0); let mx=0, py=null;
          for (let s=0;s<=Ltot;s+=1){ let g=A.find((g)=>s<=g[4]+g[5])||A[A.length-1]; const t=Math.min(1,(s-g[4])/(g[5]||1)), x=g[0]+(g[2]-g[0])*t, z=g[1]+(g[3]-g[1])*t, y=d.ROADY[u.ri](s,x,z); if (py!==null) mx=Math.max(mx,Math.abs(y-py)); py=y; }
          const cr=[]; R.forEach((r2,rj)=>{ if (rj===u.ri || r2[0]>12 || (r2[3]&6)) return; for (const a of A) for (const b of segs(r2[4])) { const d1x=a[2]-a[0],d1z=a[3]-a[1],d2x=b[2]-b[0],d2z=b[3]-b[1],den=d1x*d2z-d1z*d2x; if (Math.abs(den)<1e-6) continue; const t=((b[0]-a[0])*d2z-(b[1]-a[1])*d2x)/den, v=((b[0]-a[0])*d1z-(b[1]-a[1])*d1x)/den; if (t<=0.02||t>=0.98||v<=0.01||v>=0.99) continue;
            const x=a[0]+d1x*t, z=a[1]+d1z*t, gap=d.ROADY[rj](b[4]+b[5]*v,x,z)-d.ROADY[u.ri](a[4]+a[5]*t,x,z); cr.push([rj, Math.round(x), Math.round(z), +gap.toFixed(2)]); } });
          out.push({ ri:u.ri, D:+u.D.toFixed(2), rampa:+mx.toFixed(3), cruces:cr }); }
        return out; })())"""))
    ok = len(r) >= 2
    for u in r:
        print('paso', u['ri'], 'hundido', u['D'], 'm, pendiente máx', u['rampa'], 'cruces (vía, x, z, hueco m):', u['cruces'])
        if u['cruces'] and u['rampa'] > 0.22: ok = False
        for c in u['cruces']:
            if c[3] < 5.2: ok = False
    print('PASOS INFERIORES CORTOS', len(r), 'OK' if ok else 'FALLA')
    print('errores', errs[:3]); ok = ok and not errs
    print('PRUEBA 0996', 'OK' if ok else 'FALLA')
