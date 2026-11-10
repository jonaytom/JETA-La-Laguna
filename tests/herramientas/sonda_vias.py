# Las vías del mapa cerca de un punto con todos sus puntos (v1.2.0, para rehacer una zona de una pieza): índice, nombre,
# tipo, ancho, banderas (1 sentido único, 2 puente, 4 túnel, 32 glorieta), hundida, carriles del OSM y la lista de puntos
# X, Y (con la altura de la calzada). Uso: herramientas/sonda_vias.py x y [radio]   → shots/vias_<x>_<y>.txt
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 50
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const d=__dbg, out=[];
      d.DATA.R.forEach((rd,ri)=>{ const c=rd[4]; let dm=1e9; for (let i=0;i<c.length;i+=2) dm=Math.min(dm, Math.hypot(c[i]-x,c[i+1]-z)); if (dm>R) return;
        let s=0; const P=[]; for (let i=0;i<c.length;i+=2) { if (i) s+=Math.hypot(c[i]-c[i-2],c[i+1]-c[i-1]); let y=null; try { y=d.ROADY[ri](s,c[i],c[i+1]); } catch(e) {} P.push([Math.round(c[i]*10)/10, Math.round(c[i+1]*10)/10, y==null?null:Math.round((y-d.heightAt(c[i],c[i+1]))*10)/10]); }
        out.push({ ri, nombre: rd[1]>=0?d.DATA.S[rd[1]]:'', tipo: d.DATA.RT[rd[0]], ancho: rd[2], flags: rd[3], hundida: d.DEP.has(ri), carriles: d.DATA.LN?d.DATA.LN[ri]:null, puntos: P }); });
      const rb=(d.DATA.RB||[]).filter(r=>Math.hypot(r[0]-x,r[1]-z)<R+r[2]).map(r=>({ glorieta: [Math.round(r[0]), Math.round(r[1])], radio: r[2], ancho: r[3] }));
      return out.concat(rb); })())""", [x, z, R]))
    lines = [f'vías a menos de {R:g} m de X {x:g}, Y {z:g} (puntos: X, Y, calzada − terreno)']
    for v in sorted(r, key=lambda v: v.get('ri', -1)): lines.append(json.dumps(v, ensure_ascii=False))
    txt = '\n'.join(lines); print(txt)
    open('shots/vias_%d_%d.txt' % (x, z), 'w', encoding='utf-8').write(txt)
    print('SONDA VIAS OK')
