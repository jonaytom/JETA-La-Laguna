# Edificios cerca de un punto y si su planta (ya recortada) pisa la calzada (v1.3.2, Jonay X 578, Y 1244: «este edificio
# sí que hay que recortarlo»): por cada edificio a menos de R m, los lados (cada 1 m) que entran en de una calzada y por qué
# roadClip lo dejó así (RCLIP.dbg). Uso: herramientas/sonda_edificio_punto.py x y [radio]  → shots/edif_<x>_<y>.txt
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 30
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, out=[]; d.polyMinDistSeg=(c,x,z)=>{ let m=1e9; for (let i=0;i+3<c.length;i+=2){ const ax=c[i],az=c[i+1],ex=c[i+2]-ax,ez=c[i+3]-az,L2=ex*ex+ez*ez||1; let t=((x-ax)*ex+(z-az)*ez)/L2; t=Math.max(0,Math.min(1,t)); m=Math.min(m,Math.hypot(x-ax-ex*t,z-az-ez*t)); } return m; };
      const RS=[]; d.DATA.R.forEach((r,ri)=>{ if (r[0]>12) return; const c=r[4]; for (let i=0;i<c.length;i+=2) if (Math.abs(c[i]-x)<R+60 && Math.abs(c[i+1]-z)<R+60) { RS.push([r,ri]); return; } });
      d.DATA.B.forEach((b,bi)=>{ const c=b[6]; let dm=1e9; for (let i=0;i<c.length;i+=2) dm=Math.min(dm,Math.hypot(c[i]-x,c[i+1]-z)); if (dm>R) return;
        const dentro=[]; for (let i=0;i<c.length;i+=2) { const j=(i+2)%c.length, L=Math.hypot(c[j]-c[i],c[j+1]-c[i+1]); for (let t=0;t<L;t+=1) { const px=c[i]+(c[j]-c[i])*t/L, pz=c[i+1]+(c[j+1]-c[i+1])*t/L; const hit=RS.find(([r,ri])=>d.polyMinDistSeg(r[4],px,pz) < r[2]/2-0.5); if (hit) { dentro.push([Math.round(px),Math.round(pz),hit[1],hit[0][1]>=0?d.DATA.S[hit[0][1]]:'',hit[0][3]]); break; } } }
        let why=null; try { const RC=d.RCLIP; if (RC) { RC.dbg=[]; d.roadClip(b[6].slice ? (b._orig||b[6]).slice() : b[6]); why=RC.dbg.slice(0,6); RC.dbg=null; } } catch(e) { why=String(e); }
        out.push({ bi, nombre: b[0]>=0?d.DATA.S[b[0]]:'', estilo: b[1], pisos: b[2], esquinas: c.length/2, enCalzada: dentro, porque: why, planta: Array.from(c).map(v=>Math.round(v)) }); });
      return out; })())""", [x, z, R]))
    lines = ['edificios a menos de %g m de X %g, Y %g' % (R, x, z)] + [json.dumps(v, ensure_ascii=False) for v in r]
    txt = '\n'.join(lines); print(txt)
    open('shots/edif_%d_%d.txt' % (x, z), 'w', encoding='utf-8').write(txt)
    print('SONDA EDIFICIO OK')
