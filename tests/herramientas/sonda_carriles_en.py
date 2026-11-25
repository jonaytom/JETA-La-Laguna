# v1.4.50: los carriles de las calles que pasan por unos puntos: nombre, tipo, sentido, ancho, aparcamiento, carriles que
# se pintan (laneMkPart1), si es media avenida (TWINS) y los carriles del tráfico (laneCentres del tramo del grafo).
# Uso: herramientas/sonda_carriles_en.py x1 z1 [x2 z2 ...]  (sin puntos: los de los avisos de Jonay del 25-nov)
import sys, json
PTS = [(-282, 619), (-107, 78), (176, 655), (160, 588), (-731, -140), (-782, -436), (-24, 1083)]
async def run(pg):
    a = [float(v) for v in sys.argv[2:]]
    pts = [(a[i], a[i + 1]) for i in range(0, len(a) - 1, 2)] or PTS
    print('GEMELOS', await pg.evaluate("window.__twins"), 'CONTINUIDAD', await pg.evaluate("window.__continuidad"), 'GRAFO', await pg.evaluate("window.__grafoAnchos"))
    for x, z in pts:
        r = await pg.evaluate("""([x,z]) => { const D=__dbg, out=[];
          D.DATA.R.forEach((r,ri)=>{ if (r[0]>12) return; const c=r[4]; let bd=1e9; for (let i=0;i+3<c.length;i+=2){ const ax=c[i],az=c[i+1],ex=c[i+2]-ax,ez=c[i+3]-az,L2=ex*ex+ez*ez||1,t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)); bd=Math.min(bd,Math.hypot(x-ax-ex*t,z-az-ez*t)); }
            if (bd < r[2]/2 + 4) { const m=D.laneMkPart1(r); out.push({ri, nombre: r[1]>=0?D.DATA.S[r[1]]:'', tipo:r[0], sentido1: !!(r[3]&1), ancho:r[2], aparc: D.parkSides(r).sides, carriles:m.n, gemela: D.TWINS.has(ri), dist:+bd.toFixed(1)}); } });
          let tr=null; try { const ne=D.GRAPH.nearestEdge(x,z,15); if (ne) { const E=typeof ne==='number'?D.GRAPH.edges[ne]:(ne.e||ne.E||ne); tr={ancho:E.w, uno:E.oneway, carriles: D.laneCentres ? D.laneCentres(E,1).length : null}; } } catch(e) { tr=String(e); }
          return JSON.stringify({calles: out.sort((a,b)=>a.dist-b.dist).slice(0,3), trafico: tr}); }""", [x, z])
        print('PUNTO', [x, z], r)
