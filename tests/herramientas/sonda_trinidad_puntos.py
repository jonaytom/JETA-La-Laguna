# v1.4.48: los puntos de los tramos de la Avenida de La Trinidad (para ver sus eses): por cada tramo, sus puntos y lo
# que se desvía cada uno de la recta entre sus vecinos
import json
async def run(pg):
    r = await pg.evaluate("""() => { const D=__dbg, out=[]; D.DATA.R.forEach((rd, ri) => { if (rd[1] < 0 || D.STR[rd[1]] !== 'Avenida de La Trinidad') return;
      const c=rd[4], pts=[]; for (let i=0;i<c.length;i+=2){ let dev=null; if (i>0 && i+2<c.length){ const ax=c[i-2],az=c[i-1],bx=c[i+2],bz=c[i+3],L=Math.hypot(bx-ax,bz-az)||1; dev=+(((c[i]-ax)*(bz-az)-(c[i+1]-az)*(bx-ax))/L).toFixed(2); } pts.push([+c[i].toFixed(1), +c[i+1].toFixed(1), dev]); }
      out.push({ ri, tipo: rd[0], ancho: rd[2], flags: rd[3], pts }); }); return JSON.stringify(out); }""")
    for t in json.loads(r): print('TRAMO', t['ri'], 'tipo', t['tipo'], 'ancho', t['ancho'], 'puntos', t['pts'])
