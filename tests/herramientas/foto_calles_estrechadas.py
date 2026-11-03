# Fotos de calles estrechadas al hueco entre edificios (v1.0.0, narrowToGap en 04b_recorte.js), en sus cruces con otras
# calles: para ver que las marcas, las aceras y los cruces siguen bien. Elige las que más se estrecharon y, en cada una,
# el extremo que toca otra calle. Uso: herramientas/foto_calles_estrechadas.py [n] → shots/estrechada_NN.jpg
import base64, json, sys
async def run(pg):
    n = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 12
    L = json.loads(await pg.evaluate("""(n)=>JSON.stringify((()=>{ const d=__dbg, R=d.DATA.R, N=d.DATA.NARROWED; if (!N) return []; const out=[];
      for (const [ri, w] of N) { const r=R[ri], c=r[4]; out.push([ri, w, r[1]>=0?d.DATA.S[r[1]]:'(sin nombre)', c[0], c[1], c[c.length-2], c[c.length-1]]); }
      out.sort((a,b)=>a[1]-b[1]); return out.slice(0, n); })())""", n))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (ri, w, name, x0, z0, x1, z1) in enumerate(L):
        print(f'{i + 1:2d}. {name} (calle {ri}) a {w} m · cruce en X {round(x0)}, Y {round(z0)} · estrechada_{i + 1:02d}.jpg')
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+10,y+26,z+10); d.camera.lookAt(x,y,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x0, z0])
        open(f'shots/estrechada_{i + 1:02d}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('FOTOS ESTRECHADAS OK')
