# Calzadas paralelas que se montan una encima de otra (v1.1.9; Jonay, 9-nov, X 146 Y 1259 y X −1250 Y 9: «la autopista ahí
# se mezcla con los laterales… no sé si es porque está más ancha de la cuenta»). Recorre las vías de coches cada 5 m y
# busca otra vía casi paralela (menos de ~30°) cuyo eje está más cerca que la suma de los medios anchos (con los anchos
# del juego, ya ensanchados): las dos calzadas se pisan sin ser un cruce ni una incorporación (lejos de un nodo común).
# Agrupa por sitios de 60 m y da cuánto se pisan y qué ancho cabría. Uso: herramientas/sonda_solapes.py [n]
import json, sys
async def run(pg):
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 40
    r = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, R=d.DATA.R, RT=d.DATA.RT, S=d.DATA.S, CS=40, G=new Map(), segs=[];
      R.forEach((rd,ri)=>{ if (rd[0]>12) return; const c=rd[4]; for (let i=0;i+3<c.length;i+=2) { const k=segs.push([ri,c[i],c[i+1],c[i+2],c[i+3]])-1;
        for (let a=Math.floor(Math.min(c[i],c[i+2])/CS); a<=Math.floor(Math.max(c[i],c[i+2])/CS); a++) for (let b=Math.floor(Math.min(c[i+1],c[i+3])/CS); b<=Math.floor(Math.max(c[i+1],c[i+3])/CS); b++) { const kk=a*100003+b; let l=G.get(kk); if (!l) G.set(kk,(l=[])); l.push(k); } } });
      const ends=new Map(); const kk=(x,z)=>Math.round(x)+','+Math.round(z);
      R.forEach((rd,ri)=>{ const c=rd[4]; for (let i=0;i<c.length;i+=2) { const k=kk(c[i],c[i+1]); let a=ends.get(k); if (!a) ends.set(k,(a=[])); a.push([ri,c[i],c[i+1]]); } });
      const nodesOf=(ri)=>{ const c=R[ri][4], o=[]; for (let i=0;i<c.length;i+=2) o.push([c[i],c[i+1]]); return o; };
      const shared=(a,b)=>{ const B=new Set(nodesOf(b).map(p=>kk(p[0],p[1]))); return nodesOf(a).filter(p=>B.has(kk(p[0],p[1]))); };
      const cells=new Map(); let total=0;
      R.forEach((rd,ri)=>{ if (rd[0]>12) return; const c=rd[4]; const cache=new Map();
        for (let i=0;i+3<c.length;i+=2) { const L=Math.hypot(c[i+2]-c[i],c[i+3]-c[i+1]); if (L<0.5) continue; const tx=(c[i+2]-c[i])/L, tz=(c[i+3]-c[i+1])/L;
          for (let u=0;u<L;u+=5) { const x=c[i]+tx*u, z=c[i+1]+tz*u; const l=G.get(Math.floor(x/CS)*100003+Math.floor(z/CS)); if (!l) continue;
            for (const k of l) { const [rj,ax,az,bx,bz]=segs[k]; if (rj<=ri) continue; const r2=R[rj]; const dx=bx-ax, dz=bz-az, L2=Math.hypot(dx,dz)||1;
              if (Math.abs((dx*tx+dz*tz)/L2)<0.87) continue; const t=((x-ax)*dx+(z-az)*dz)/(L2*L2); if (t<0||t>1) continue;
              const dd=Math.hypot(x-ax-dx*t, z-az-dz*t), need=(rd[2]+r2[2])/2; if (dd>=need-0.3) continue;
              let sh=cache.get(rj); if (!sh) cache.set(rj,(sh=shared(ri,rj))); if (sh.some(p=>Math.hypot(p[0]-x,p[1]-z)<25)) continue; // a junction / merge
              total++; const ck=Math.floor(x/60)+','+Math.floor(z/60); let e=cells.get(ck); if (!e) cells.set(ck,(e={ x:Math.round(x), z:Math.round(z), n:0, pares:{} }));
              e.n++; const pk=ri+'-'+rj; const p=e.pares[pk]||(e.pares[pk]={ a:[RT[rd[0]], rd[1]>=0?S[rd[1]]:'', rd[2], rd[3]&2?'puente':rd[3]&4?'túnel':''], b:[RT[r2[0]], r2[1]>=0?S[r2[1]]:'', r2[2], r2[3]&2?'puente':r2[3]&4?'túnel':''], eje:+dd.toFixed(1), pisa:+(need-dd).toFixed(1), n:0 });
              p.n++; if (need-dd>p.pisa) { p.pisa=+(need-dd).toFixed(1); p.eje=+dd.toFixed(1); } } } } });
      const list=[...cells.values()].sort((a,b)=>b.n-a.n);
      const tipos={}; for (const e of list) for (const p of Object.values(e.pares)) { const k=p.a[0]+' / '+p.b[0]; tipos[k]=(tipos[k]||0)+p.n; }
      return JSON.stringify({ total, sitios: list.length, tipos, top: list.slice(0, 80).map(e=>({ x:e.x, z:e.z, n:e.n, pares:Object.values(e.pares).sort((a,b)=>b.pisa-a.pisa).slice(0,4) })) }); })()"""))
    lines = [f'calzadas paralelas que se pisan: {r["total"]} puntos (cada 5 m) en {r["sitios"]} sitios de 60 m', 'por tipos: ' + json.dumps(dict(sorted(r['tipos'].items(), key=lambda kv: -kv[1])), ensure_ascii=False)]
    for e in r['top'][:n]:
        lines.append(f'  X {e["x"]}, Y {e["z"]} · {e["n"]} puntos')
        for p in e['pares']: lines.append(f'      {p["a"]} con {p["b"]}: ejes a {p["eje"]} m, se pisan {p["pisa"]} m ({p["n"]} puntos)')
    txt = '\n'.join(lines); print(txt)
    open('shots/sonda_solapes.txt', 'w', encoding='utf-8').write(txt)
    print('SONDA SOLAPES OK')
