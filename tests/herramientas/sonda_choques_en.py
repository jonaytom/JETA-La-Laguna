# v1.4.48: los segmentos de choque (COL) a menos de 1 m de unos puntos: tipo (segKind), extremos y alturas
import json
PTS = [[691.6, 1328.7], [695, 1321.1], [699.9, 1323.6]]
async def run(pg):
    r = await pg.evaluate("""(P) => { const C=__dbg.COL || COL, out=[]; const { segs, segY, segKind } = C; const n=segs.length/4;
      for (const [x,z] of P) for (let id=0; id<n; id++) { const i=id*4, ax=segs[i], az=segs[i+1], bx=segs[i+2], bz=segs[i+3];
        const ex=bx-ax, ez=bz-az, L2=ex*ex+ez*ez||1, t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)); const d=Math.hypot(x-ax-ex*t,z-az-ez*t);
        if (d<1) out.push([x,z,+d.toFixed(2), segKind && segKind.get ? segKind.get(id) : null, [ax,az,bx,bz].map(v=>+v.toFixed(1)), segY ? [segY[id*2], segY[id*2+1]].map(v=>+(+v).toFixed(1)) : null]); }
      return JSON.stringify(out); }""", PTS)
    for e in json.loads(r): print('CHOQUE', e)
    print('EN CALZADA', await pg.evaluate("(P) => JSON.stringify(P.map(([x,z]) => { const rn = __dbg.ROADSEG ? __dbg.ROADSEG.nearest(x,z,(r)=>r[0]<=12) : null; return [x, z, __dbg.onCarriagewayEarly(x,z,0), rn ? [__dbg.STR[__dbg.DATA.R[rn.ri][1]] || '', __dbg.DATA.R[rn.ri][2], +rn.d.toFixed(1), __dbg.DATA.R[rn.ri].wMax] : null]; }))", PTS))
