# Cuántos agujeros en el terreno hay (v1.2.0): TCUTS cabe en NCUT=512 cápsulas y NGRP=160 grupos (finalizeCuts); los que
# sobran no se recortan y el terreno tapa la trinchera. Uso: herramientas/sonda_cortes.py [x y radio]
import json, sys
async def run(pg):
    x = float(sys.argv[2]) if len(sys.argv) > 4 else None; z = float(sys.argv[3]) if len(sys.argv) > 4 else None; R = float(sys.argv[4]) if len(sys.argv) > 4 else 0
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const T=__dbg.TCUTS; let g=0, last=null, cut512=-1, cut160=-1; T.forEach((c,i)=>{ if (c[5]!==last) { g++; last=c[5]; if (g>256 && cut160<0) cut160=i; } if (i>=1024 && cut512<0) cut512=i; });
      const near = x===null ? [] : T.map((c,i)=>[i,c]).filter(([i,c])=>Math.hypot((c[0]+c[2])/2-x,(c[1]+c[3])/2-z)<R).map(([i,c])=>[i, c[5], Math.round(c[0]), Math.round(c[1]), Math.round(c[2]), Math.round(c[3]), Math.round(c[4]*10)/10]);
      return { total: T.length, grupos: g, desde_aqui_no_caben_512: cut512, desde_aqui_no_caben_160grupos: cut160, cerca: near.slice(0, 40) }; })())""", [x, z, R]))
    print('cortes', json.dumps(r, ensure_ascii=False))
    print('SONDA CORTES', 'OK' if r['total'] <= 1024 and r['grupos'] <= 256 else 'DESBORDA')
