# Busca sitios donde una plataforma de túnel/trinchera queda justo por debajo del terreno sin hueco en el terreno
# (el personaje o el coche se "hunden"). Recorre todos los TUNNEL_DECKS cada 2 m.
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    print(await pg.evaluate("""(()=>{const d=__dbg; let n=0, bad=[]; for (const D of d.TUNNEL_DECKS) { const p=D.pts; for (let i=0;i<p.length-1;i++){ const a=p[i],b=p[i+1]; const L=Math.hypot(b[0]-a[0],b[1]-a[1]); for(let s=0;s<L;s+=2){ const t=s/L, x=a[0]+(b[0]-a[0])*t, z=a[1]+(b[1]-a[1])*t; n++;
        const lw=d.lowAt(x,z,d.heightAt(x,z)); if (!lw) continue; const g=d.heightAt(x,z); if (g-lw.y>0.15 && g-lw.y<1.6 && !d.inCut(x,z,0.3)) bad.push([Math.round(x),Math.round(z),+(g-lw.y).toFixed(2)]); } } }
      const cl=[]; for (const b of bad) if (!cl.some(c=>Math.hypot(c[0]-b[0],c[1]-b[1])<25)) cl.push(b); return JSON.stringify({muestras:n, hundidos:bad.length, zonas:cl.length, ejemplos:cl.slice(0,25)}); })()"""))
