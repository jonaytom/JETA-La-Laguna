# Perfil de la calzada entre dos puntos (v0.78): cada 0,5 m, el suelo (heightAt), el tablero que encontraría un coche
# que viene por esa línea (deckAt) y si está «bajo» (lowAt, túnel/trinchera): para ver escalones en uniones y finales
# de tablero. Uso: cd tests && python run_test.py herramientas/sonda_perfil.py x0 z0 x1 z1
import json, sys
async def run(pg):
    x0, z0, x1, z1 = map(float, sys.argv[2:6])
    r = json.loads(await pg.evaluate("""([x0,z0,x1,z1])=>JSON.stringify((()=>{ const d=__dbg; const L=Math.hypot(x1-x0,z1-z0), n=Math.ceil(L/0.5); let py=d.heightAt(x0,z0); const out=[];
      for (let k=0;k<=n;k++){ const t=k/n, x=x0+(x1-x0)*t, z=z0+(z1-z0)*t; const g=d.heightAt(x,z); const dk=d.deckAt? d.deckAt(x,z,py-1.3,true,2.2):null; const lo=d.lowAt? d.lowAt(x,z,py):null;
        const y = lo ? lo.y : (dk!=null && dk-0.12>g ? dk-0.12 : g); out.push([+(t*L).toFixed(1), +g.toFixed(2), dk==null||dk<-1e8?null:+dk.toFixed(2), lo?+lo.y.toFixed(2):null, +(y-py).toFixed(2)]); py=y; }
      return out; })())""", [x0, z0, x1, z1]))
    info = json.loads(await pg.evaluate('''([x0,z0,x1,z1])=>JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, out={}; const L=Math.hypot(x1-x0,z1-z0), n=Math.ceil(L/1);
      for (let k=0;k<=n;k++){ const x=x0+(x1-x0)*k/n, z=z0+(z1-z0)*k/n; for (const dk of d.DECKS) { if (dk.ri===undefined || dk.type!=='path') continue; const p=dk.pts; for (let i=0;i<p.length-1;i++){ const a=p[i],b=p[i+1]; const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz||1; const t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/L2)); if (Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t)<dk.w/2){ const rd=R[dk.ri]; if (rd && !out[dk.ri]) out[dk.ri]={ desde_m:k, nombre: rd[1]>=0?d.DATA.S[rd[1]]:'', tipo: rd[0], flags: rd[3], elevada: d.RAISE.has(dk.ri), extremos:[[Math.round(rd[4][0]),Math.round(rd[4][1])],[Math.round(rd[4][rd[4].length-2]),Math.round(rd[4][rd[4].length-1])]] }; break; } } } }
      return out; })())''', [x0, z0, x1, z1]))
    print('tableros en el camino:', json.dumps(info, ensure_ascii=False))
    big = [p for p in r if abs(p[4]) > 0.3]
    print('muestras', len(r), 'escalones >0,3 m:', big[:20])
    for p in r[::4]: print('  ', p)
