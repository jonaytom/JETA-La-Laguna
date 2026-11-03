# Por qué siguen en la calzada los edificios del auditor (v1.0.0). Lee el mapa.json de la auditoría más reciente
# (RevisordeCodigo\resultados_pc\…), y para cada edificio crítico o alto vuelve a pasar su planta por roadClip()
# (04b_recorte.js) con RCLIP.dbg = [] para ver qué regla lo dejó como estaba. Salida: shots/sonda_recorte_motivos.txt
# Uso: en una lista de scripts/pruebas/, la línea  herramientas/sonda_recorte_motivos.py [máximo]
import json, os, sys, glob, collections
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    rpc = os.path.join(os.path.expanduser('~'), 'RevisordeCodigo', 'resultados_pc')
    dirs = sorted([d for d in glob.glob(os.path.join(rpc, '*')) if os.path.exists(os.path.join(d, 'mapa.json'))], key=os.path.getmtime)
    if not dirs: out('no encuentro mapa.json en', rpc); return
    L = json.load(open(os.path.join(dirs[-1], 'mapa.json'), encoding='utf-8'))['lista']
    lim = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 90
    L = [h for h in L if h['sev'] in ('crítica', 'alta')][:lim]
    out('auditoría', os.path.basename(dirs[-1]), '·', len(L), 'casos críticos y altos')
    res = await pg.evaluate("""(L)=>{ const d=__dbg, B=d.BUILD, DB=d.DATA.B, out=[];
      const cen=(P)=>{ let x=0,z=0; for(const p of P){x+=p[0];z+=p[1];} return [x/P.length,z/P.length]; };
      const pipP=(x,z,c)=>{ let o=false; const n=c.length/2; for(let i=0,j=n-1;i<n;j=i++){ const ax=c[2*i],az=c[2*i+1],bx=c[2*j],bz=c[2*j+1]; if(((az>z)!==(bz>z)) && x<(bx-ax)*(z-az)/(bz-az)+ax) o=!o; } return o; };
      for (const h of L) { const m=/#(\\d+)/.exec(h.edificio); let bi = m ? +m[1] : -1;
        if (bi<0) { let best=1e9; B.forEach((b,i)=>{ if (b.name!==h.edificio) return; const c=cen(b.pts), dd=Math.hypot(c[0]-h.x,c[1]-h.z); if (dd<best) { best=dd; bi=i; } }); }
        const b=B[bi]; if (!b) { out.push({h, err:'sin edificio'}); continue; }
        const c=cen(b.pts); let k=-1; for (let i=0;i<DB.length;i++) if (pipP(c[0],c[1],DB[i][6])) { k=i; break; }
        if (k<0) { out.push({h, err:'no encuentro su planta en DATA.B', estilo:b.style}); continue; }
        const raw=DB[k][6]; const pts=[]; for (let i=0;i<raw.length;i+=2) pts.push([raw[i],raw[i+1]]);
        const st=DB[k][1]; const P=d.insetPoly(pts, st===4?0.3:0.75); d.roadClip([[0,0],[1,0],[1,1]]); const RC=d.RCLIP; RC.dbg=[]; const r=st===4?P:d.roadClip(d.streetTrim(P)); const why=RC.dbg; RC.dbg=null;
        out.push({h, k, estilo:st, recortado:r!==P, area:Math.round(Math.abs(d.polyArea(P))), motivos:st===4?['estilo 4 (iglesia o monumento): no se recorta']:why}); }
      return out; }""", L)
    cnt = collections.Counter()
    for r in res:
        h = r['h']; tag = f"{h['sev']:7s} X {h['x']}, Y {h['z']} · {h['calle']} ({h['tipo']}) · {h['edificio']} · invade {h['invasion_m']} m"
        if 'err' in r: out(tag, '→', r['err']); cnt[r['err']] += 1; continue
        mot = r['motivos'] or (['se recorta ahora (el auditor midió otra cosa)'] if r['recortado'] else ['ninguna regla lo para: no lo ve ninguna calle del recorte'])
        out(tag, f"· {r['area']} m² ·", ' | '.join(mot[:4]))
        for m in mot[:4]: cnt[m.split(' [')[0].split(' (')[0]] += 1
    out('== resumen de motivos')
    for m, n in cnt.most_common(): out(f'  {n:3d}  {m}')
    open('shots/sonda_recorte_motivos.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA RECORTE OK')
