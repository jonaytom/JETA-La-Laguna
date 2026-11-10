# Edificios del mapa cerca de un punto (v1.2.0): índice, centro, área, radio medio, alto (campo 0 en dm), estilo, plantas
# y si su planta es casi un círculo. Uso: herramientas/sonda_edificios.py x y [radio]
import json, sys
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 80
    r = json.loads(await pg.evaluate("""([x,z,R])=>JSON.stringify((()=>{ const out=[]; __dbg.DATA.B.forEach((b,i)=>{ const c=b[6]; if (!c||c.length<6) return; let a=0,cx=0,cz=0; const n=c.length/2;
      for (let j=0;j<n;j++){ const x0=c[j*2],z0=c[j*2+1],x1=c[((j+1)%n)*2],z1=c[((j+1)%n)*2+1]; a+=x0*z1-x1*z0; cx+=x0; cz+=z0; } cx/=n; cz/=n; if (Math.hypot(cx-x,cz-z)>R) return;
      let rm=0, rs=0; for (let j=0;j<n;j++){ const d=Math.hypot(c[j*2]-cx,c[j*2+1]-cz); rm+=d; rs+=d*d; } rm/=n; const sd=Math.sqrt(Math.max(0,rs/n-rm*rm));
      out.push([i, Math.round(cx), Math.round(cz), Math.round(Math.abs(a)/2), Math.round(rm*10)/10, b[0], b[1], b[2], n, +(sd/rm).toFixed(2)]); }); return out.sort((p,q)=>q[3]-p[3]).slice(0,25); })())""", [x, z, R]))
    print('edificios (índice, x, y, área, radio medio, alto dm, estilo, plantas, puntos, irregularidad):')
    for b in r: print('  ', b)
    print('SONDA EDIFICIOS OK')
