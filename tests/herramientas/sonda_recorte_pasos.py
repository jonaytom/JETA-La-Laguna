# v1.4.48: un edificio del mapa (por su centro aproximado) pasado paso a paso por el recorte: área tras insetParty,
# streetTrim, roadClip, rbClip y streetsRule, con los motivos (RCLIP.dbg). Uso: herramientas/sonda_recorte_pasos.py x z
import sys, json
async def run(pg):
    x, z = float(sys.argv[2]), float(sys.argv[3])
    r = await pg.evaluate("""([x,z]) => { const D=__dbg, DB=D.DATA.B; let best=-1, bd=1e9, raw=null;
      // the footprint as the map gives it: the closest centre (b[6] may be the cut one already)
      DB.forEach((b,i)=>{ const c=b[6]; if(!c||!c.length) return; let cx=0,cz=0; for(let k=0;k<c.length;k+=2){cx+=c[k];cz+=c[k+1];} cx/=c.length/2; cz/=c.length/2; const d=Math.hypot(cx-x,cz-z); if(d<bd){bd=d;best=i;} });
      const c=DB[best][6], pts=[]; for(let k=0;k<c.length;k+=2) pts.push([c[k],c[k+1]]);
      const A=(P)=>P?Math.round(Math.abs(D.polyArea(P))):null, RC=D.RCLIP; RC.dbg=[];
      const s0=D.insetParty ? D.insetParty(pts,0.75,best) : D.insetPoly(pts,0.75), s1=D.streetTrim(s0), s2=D.roadClip(s1), s3=D.rbClip?D.rbClip(s2):s2, s4=D.streetsRule?D.streetsRule(s3):s3;
      const why=RC.dbg; RC.dbg=null;
      return JSON.stringify({ indice: best, puntos: pts.map(p=>p.map(v=>Math.round(v))), mapa: A(pts), inset: A(s0), trim: A(s1), roadClip: A(s2), rbClip: A(s3), calles: A(s4), motivos: why, final: s4 && s4.map(p=>p.map(v=>Math.round(v))) }); }""", [x, z])
    print('PASOS', r)
