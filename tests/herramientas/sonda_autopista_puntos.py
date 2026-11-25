# v1.4.50: en los puntos de la autopista de los avisos de Jonay (25-nov): calles que pasan (tipo, sentido, ancho, si van
# en trinchera DEP o elevadas RAISE, clase de firme ROADCLASS, carriles pintados), altura del asfalto (CSURF) frente a
# la del terreno, si está en un corte (inCut), medianas a menos de 25 m y segmentos de choque a menos de 2 m.
# Uso: herramientas/sonda_autopista_puntos.py [x z ...]
import sys, json
PTS = [(-3472, -194), (-2236, -211), (-2066, -224), (-1413, -77), (-1199, -17), (-1171, -34), (-24, 1083), (-41, 1068), (109, 1266)]
async def run(pg):
    a = [float(v) for v in sys.argv[2:]]
    pts = [(a[i], a[i + 1]) for i in range(0, len(a) - 1, 2)] or PTS
    print('TERRENO_REBAJADO', await pg.evaluate("window.__terrFit"))
    for x, z in pts:
        r = await pg.evaluate("""([x,z]) => { const D=__dbg, out={calles:[], med:0, choques:[]};
          D.DATA.R.forEach((r,ri)=>{ if (r[0]>14) return; const c=r[4]; let bd=1e9; for (let i=0;i+3<c.length;i+=2){ const ax=c[i],az=c[i+1],ex=c[i+2]-ax,ez=c[i+3]-az,L2=ex*ex+ez*ez||1,t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)); bd=Math.min(bd,Math.hypot(x-ax-ex*t,z-az-ez*t)); }
            if (bd < r[2]/2 + 3) out.calles.push({ri, n: r[1]>=0?D.DATA.S[r[1]]:'', t:r[0], f:r[3], w:r[2], dep:D.DEP.has(ri), raise:D.RAISE.has(ri), cls: D.ROADCLASS(r), carr: r[0]<=12 ? D.laneMkPart1(r).n : null, d:+bd.toFixed(1)}); });
          out.calles.sort((a,b)=>a.d-b.d); out.calles=out.calles.slice(0,4);
          const i=Math.floor(x/2-0.5), j=Math.floor(z/2-0.5), T=D.CSURF.get(Math.floor(i/20)*100003+Math.floor(j/20));
          const v=T ? T.a[(i-Math.floor(i/20)*20)*20+(j-Math.floor(j/20)*20)] : -32768;
          out.asfalto = v===-32768 ? null : +(T.b+v/100).toFixed(2); out.terreno = +D.heightAt(x,z).toFixed(2); out.corte = D.inCut(x,z,0.5);
          for (const m of D.MEDIANS) { const [k,x0,z0,x1,z1]=m; const ex=x1-x0, ez=z1-z0, L2=ex*ex+ez*ez||1, t=Math.max(0,Math.min(1,((x-x0)*ex+(z-z0)*ez)/L2)); if (Math.hypot(x-x0-ex*t,z-z0-ez*t)<25) out.med++; }
          const C=D.COL, sg=C.segs, n=sg.length/4; for (let id=0; id<n; id++){ const q=id*4, ax=sg[q], az=sg[q+1], ex=sg[q+2]-ax, ez=sg[q+3]-az, L2=ex*ex+ez*ez||1, t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)); const d=Math.hypot(x-ax-ex*t,z-az-ez*t); if (d<2) out.choques.push([+d.toFixed(1), C.segKind && C.segKind.get ? C.segKind.get(id) : null, C.segY ? [+(+C.segY[id*2]).toFixed(1), +(+C.segY[id*2+1]).toFixed(1)] : null]); }
          return JSON.stringify(out); }""", [x, z])
        print('PUNTO', [x, z], r)
