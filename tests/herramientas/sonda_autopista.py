# Los trozos de autopista y sus ramales en una caja (v1.2.0, para rehacer la TF-5 de una pieza): índice, tipo, sentido
# único, ancho, carriles del OSM y puntos (X, Y). Uso: herramientas/sonda_autopista.py x0 y0 x1 y1  → shots/autopista_<x0>_<y0>.txt
import json, sys
async def run(pg):
    x0, z0, x1, z1 = [float(v) for v in sys.argv[2:6]]
    r = json.loads(await pg.evaluate("""([x0,z0,x1,z1])=>JSON.stringify((()=>{ const d=__dbg, out=[];
      d.DATA.R.forEach((rd,ri)=>{ if (rd[0]>2) return; const c=rd[4]; let k=0; for (let i=0;i<c.length;i+=2) if (c[i]>x0&&c[i]<x1&&c[i+1]>z0&&c[i+1]<z1) k++; if (!k) return;
        const P=[]; for (let i=0;i<c.length;i+=2) P.push([Math.round(c[i]*10)/10, Math.round(c[i+1]*10)/10]);
        out.push({ ri, t: d.DATA.RT[rd[0]], f: rd[3], w: rd[2], ln: d.DATA.LN?d.DATA.LN[ri]:null, dentro: k, P }); });
      return out; })())""", [x0, z0, x1, z1]))
    lines = [f'autopista y ramales en X {x0:g}..{x1:g}, Y {z0:g}..{z1:g}']
    for v in r: lines.append(json.dumps(v, ensure_ascii=False))
    txt = '\n'.join(lines); print(txt[:3000])
    open('shots/autopista_%d_%d.txt' % (x0, z0), 'w', encoding='utf-8').write(txt)
    print('SONDA AUTOPISTA OK')
