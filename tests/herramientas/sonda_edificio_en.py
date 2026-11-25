# v1.4.48: qué edificios hay alrededor de un punto (BUILD y DATA.B): área de la planta original y de la que queda, estilo
# Uso: herramientas/sonda_edificio_en.py x z [radio]
import sys, json
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3]); R = float(sys.argv[4]) if len(sys.argv) > 4 else 25
    r = await pg.evaluate("""([x,z,R]) => { const D=__dbg, out=[]; const A=(c)=>{ let a=0; for(let i=0;i<c.length;i+=2){ const j=(i+2)%c.length; a+=c[i]*c[j+1]-c[j]*c[i+1]; } return Math.abs(a/2); };
      D.DATA.B.forEach((b,i)=>{ const c=b[6]; let cx=0,cz=0; if(!c||!c.length){ return; } for(let k=0;k<c.length;k+=2){cx+=c[k];cz+=c[k+1];} cx/=c.length/2; cz/=c.length/2; if(Math.hypot(cx-x,cz-z)<R) out.push(['B',i,Math.round(cx),Math.round(cz),Math.round(A(c)),b[1]]); });
      for (const b of D.BUILD) if (Math.hypot(b.cx-x,b.cz-z)<R) out.push(['BUILD',Math.round(b.cx),Math.round(b.cz),Math.round(D.polyArea?Math.abs(D.polyArea(b.pts)):0),b.style,b.name||'']);
      return JSON.stringify(out); }""", [x, z, R])
    for e in json.loads(r): print('EDIF', e)
