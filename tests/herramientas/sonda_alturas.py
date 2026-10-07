# Alturas de suelo/tablero en puntos; entrada JSON [[x,z],...] como 2º argumento.
# Uso: cd tests && python run_test.py herramientas/sonda_alturas.py [entrada.json]
import sys
import json
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
PTS=json.load(open(sys.argv[2] if len(sys.argv) > 2 else 'pts.json'))
JS=r"""(pts)=>{ const d=__dbg, D=d.DATA; const out=[];
 for (const [x,z] of pts){ const g=d.heightAt(x,z); const dk=[]; for(let dy=-1;dy<=4;dy+=0.5) dk.push(+d.deckAt(x,z,g+dy,true).toFixed(2));
   const rs=[]; D.R.forEach((rd,ri)=>{ const c=rd[4]; let s=0,best=1e9,bs=0; for(let i=0;i+3<c.length;i+=2){const ax=c[i],az=c[i+1],bx=c[i+2],bz=c[i+3],dx=bx-ax,dz=bz-az,L=Math.hypot(dx,dz)||1; const t=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/(L*L))); const dd=Math.hypot(x-ax-dx*t,z-az-dz*t); if(dd<best){best=dd;bs=s+L*t;} s+=L;}
     if(best<rd[2]/2+10){ const y=d.ROADY[ri](bs,x,z); rs.push([ri,D.RT[rd[0]],rd[2],rd[3],+best.toFixed(1),+(y-g).toFixed(2), d.RAISE.has(ri)?'R':(d.DEP.has(ri)?'D':''), Math.round(bs), Math.round(s)]); } });
   const lw=[]; for(let dy=-8;dy<=1;dy+=1){const l=d.lowAt(x,z,g+dy); lw.push(l?+l.y.toFixed(2):null);} out.push({x,z,g:+g.toFixed(2),dk,lw,rs}); }
 return JSON.stringify(out);}"""
async def run(pg):
    r=json.loads(await pg.evaluate(JS,PTS))
    for q in r:
        print(q['x'],q['z'],'g',q['g'],'low(g-8..g+1)',q['lw'])
        for a in q['rs']: print('   ',a)
