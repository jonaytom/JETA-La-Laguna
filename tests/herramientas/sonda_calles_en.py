# v1.4.49: qué calles pasan cerca de un punto: índice, tipo, nombre, ancho de ahora, wMax/wMin/swMin, sentido y distancia
# al eje. Uso: herramientas/sonda_calles_en.py x z [radio]
import sys, json
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 15
    r = await pg.evaluate("""([x,z,R]) => { const D=__dbg, out=[];
      D.DATA.R.forEach((r,ri)=>{ const c=r[4]; let bd=1e9;
        for (let i=0;i+3<c.length;i+=2){ const ax=c[i],az=c[i+1],ex=c[i+2]-ax,ez=c[i+3]-az,L2=ex*ex+ez*ez||1,t=Math.max(0,Math.min(1,((x-ax)*ex+(z-az)*ez)/L2)); bd=Math.min(bd,Math.hypot(x-ax-ex*t,z-az-ez*t)); }
        if (bd<R) out.push({ri, tipo:r[0], nombre: r[1]>=0 ? D.DATA.S[r[1]] : '', ancho:r[2], wMax:r.wMax, wMin:r.wMin, swMin:r.swMin, flags:r[3], dist:+bd.toFixed(1), desde:[Math.round(c[0]),Math.round(c[1])], puntos:c.length/2}); });
      return JSON.stringify(out.sort((a,b)=>a.dist-b.dist)); }""", [x, z, R])
    for q in json.loads(r): print('CALLE', q)
