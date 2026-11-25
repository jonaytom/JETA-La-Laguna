# v1.4.48 («las calles mandan», Jonay 23-nov): dónde se cruzan calles y edificios en TODO el mapa, por barrio:
#  - invasiones: edificios con muro en el carril (lista del auditor, mapa.json más reciente)
#  - recorte: edificios que el recorte dejó como estaban (RCLIP.keptList) y los quitados (goneList)
#  - estrechadas: calles que narrowToGap estrechó hasta el hueco entre edificios (DATA.NARROWED)
#  - rendijas: huecos de 0,5–2,5 m entre dos edificios vecinos (cabe el personaje) que no son calle ni paso
#  - arrugas: calles con quiebros laterales pequeños (0,3–2,5 m) en tramos que deberían ser rectos
# Salida: shots/sonda_calles_mandan.txt (+ json con todos los puntos: shots/sonda_calles_mandan.json)
import json, os, glob
async def run(pg):
    rpc = os.path.join(os.path.expanduser('~'), 'RevisordeCodigo', 'resultados_pc')
    dirs = sorted([d for d in glob.glob(os.path.join(rpc, '*')) if os.path.exists(os.path.join(d, 'mapa.json'))], key=os.path.getmtime)
    inv = json.load(open(os.path.join(dirs[-1], 'mapa.json'), encoding='utf-8'))['lista'] if dirs else []
    r = json.loads(await pg.evaluate("""(inv) => { const D=__dbg, DATA=D.DATA, STR=D.STR, B=D.BUILD, RC=D.RCLIP || {};
      const sub = DATA.P.filter(p => p[1] === 'suburb');
      const zone = (x, z) => { if (D.isHistoric && D.isHistoric(x, z)) return 'Casco Histórico'; let bd=1e9, a=''; for (const p of sub) { const d=Math.hypot(p[2]-x,p[3]-z); if (d<bd) { bd=d; a=STR[p[0]]; } } return bd>700 ? 'Afueras' : a; };
      const out = { invasiones: inv.map(h => [Math.round(h.x), Math.round(h.z), h.sev, h.inv || h.invade, h.calle || '']),
        sinRecortar: (RC.keptList||[]).map(k=>[k[0],k[1],k[2],k[3]]), quitados: (RC.goneList||[]).map(g=>[g[0],g[1],g[2]]),
        estrechadas: [], rendijas: [], arrugas: [] };
      // narrowed streets: the middle of each
      if (DATA.NARROWED) for (const [ri, w] of DATA.NARROWED) { const c=DATA.R[ri][4], m=(c.length>>2)<<1; out.estrechadas.push([Math.round(c[m]), Math.round(c[m+1]), +w.toFixed(1), DATA.R[ri][1]>=0 ? STR[DATA.R[ri][1]] : '']); }
      // gaps between neighbouring buildings
      const G=new Map(), CS=30, key=(a,b)=>a*100003+b;
      B.forEach((b,i)=>{ let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9; for(const p of b.pts){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);z0=Math.min(z0,p[1]);z1=Math.max(z1,p[1]);} b._bb=[x0,x1,z0,z1];
        for(let a=Math.floor(x0/CS);a<=Math.floor(x1/CS);a++) for(let c=Math.floor(z0/CS);c<=Math.floor(z1/CS);c++){ const k=key(a,c); let l=G.get(k); if(!l) G.set(k,l=[]); l.push(i);} });
      const segD=(p,a,b)=>{ const ex=b[0]-a[0],ez=b[1]-a[1],L2=ex*ex+ez*ez||1,t=Math.max(0,Math.min(1,((p[0]-a[0])*ex+(p[1]-a[1])*ez)/L2)); return [Math.hypot(p[0]-a[0]-ex*t,p[1]-a[1]-ez*t), a[0]+ex*t, a[1]+ez*t]; };
      const seen=new Set();
      for (const l of G.values()) for (let u=0;u<l.length;u++) for (let v=u+1;v<l.length;v++) { const i=l[u], j=l[v], pk=i<j?i+'_'+j:j+'_'+i; if(seen.has(pk)) continue; seen.add(pk);
        const A=B[i], C=B[j]; if (A._bb[0]>C._bb[1]+2.5||C._bb[0]>A._bb[1]+2.5||A._bb[2]>C._bb[3]+2.5||C._bb[2]>A._bb[3]+2.5) continue;
        let best=[1e9,0,0];
        for (const p of A.pts) for (let k=0;k<C.pts.length;k++){ const d=segD(p,C.pts[k],C.pts[(k+1)%C.pts.length]); if(d[0]<best[0]) best=[d[0],(p[0]+d[1])/2,(p[1]+d[2])/2]; }
        for (const p of C.pts) for (let k=0;k<A.pts.length;k++){ const d=segD(p,A.pts[k],A.pts[(k+1)%A.pts.length]); if(d[0]<best[0]) best=[d[0],(p[0]+d[1])/2,(p[1]+d[2])/2]; }
        if (best[0] < 0.5 || best[0] > 2.5) continue;
        if (D.onCarriagewayEarly(best[1], best[2], 0.5)) continue; // a street between them: not a gap
        out.rendijas.push([Math.round(best[1]), Math.round(best[2]), +best[0].toFixed(2)]); }
      // wrinkles: small sideways kinks along streets that are nearly straight
      DATA.R.forEach((rd)=>{ if (rd[0]>12) return; const c=rd[4]; if (c.length<8) return;
        for (let i=2;i+2<c.length;i+=2){ const a=[c[i-2],c[i-1]], p=[c[i],c[i+1]], b=[c[i+2],c[i+3]], L=Math.hypot(b[0]-a[0],b[1]-a[1]); if (L<12) continue;
          const dev=segD(p,a,b)[0]; if (dev>0.3 && dev<2.5 && dev/L<0.08) out.arrugas.push([Math.round(p[0]),Math.round(p[1]),+dev.toFixed(2), rd[1]>=0?STR[rd[1]]:'']); } });
      // by zone
      const Z={};
      for (const k of ['invasiones','sinRecortar','quitados','estrechadas','rendijas','arrugas']) for (const e of out[k]) { const n=zone(e[0],e[1]); Z[n]=Z[n]||{}; Z[n][k]=(Z[n][k]||0)+1; }
      out.zonas=Z;
      return JSON.stringify(out); }""", inv))
    open('shots/sonda_calles_mandan.json', 'w', encoding='utf-8').write(json.dumps(r, ensure_ascii=False))
    tot = {k: len(r[k]) for k in ['invasiones', 'sinRecortar', 'quitados', 'estrechadas', 'rendijas', 'arrugas']}
    lines = ['TOTAL ' + json.dumps(tot, ensure_ascii=False)]
    for z, v in sorted(r['zonas'].items(), key=lambda kv: -sum(kv[1].values())):
        lines.append('ZONA %-34s %s' % (z, json.dumps(v, ensure_ascii=False)))
    lines.insert(1, 'MEDIANERAS ' + str(await pg.evaluate("() => JSON.stringify(window.__party || null)")))
    lines.insert(2, 'CALLES MANDAN ' + str(await pg.evaluate("() => { const G=__dbg.RCLIP||{}; return JSON.stringify({ recortados: G.mandan||0, adelantados: G.adelantados||0, sin_cambiar: (G.mandanKept||[]).length, ejemplos: (G.mandanKept||[]).slice(0,12) }); }")))
    lines.insert(3, 'ENDEREZADOS ' + str(await pg.evaluate("() => window.__enderezados")) + ' · SOPORTALES ' + str(await pg.evaluate("() => { try { return JSON.stringify(__dbg.TRI_ARC || null); } catch (e) { return null; } }")))
    open('shots/sonda_calles_mandan.txt', 'w', encoding='utf-8').write(chr(10).join(lines))
    for l in lines[:40]: print(l)
    print('SONDA CALLES MANDAN OK')
