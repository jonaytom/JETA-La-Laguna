# Marcas viales y aparcamiento (v1.3.5; Jonay: «las separaciones de carriles, las flechas de sentido y demás marcas viales
# salen mal centradas desde que añadimos aparcamientos»). Fotos desde arriba de calles con banda de aparcamiento a un
# solo lado (doble sentido y sentido único) y a los dos, con sus flechas: shots/marcas_<etiqueta>_<n>.jpg
# Uso: herramientas/sonda_marcas_aparca.py <etiqueta>
import base64, json, sys
async def run(pg):
    tag = sys.argv[2] if len(sys.argv) > 2 else 'x'
    pts = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, out=[], want={'t1':2,'o1':2,'t2':2}, got={};
      for (const [i, rd] of d.DATA.R.entries()) { if (rd[0]<3||rd[0]>10) continue; const c=rd[4]; if (c.length<4) continue;
        let L=0; for (let k=2;k<c.length;k+=2) L+=Math.hypot(c[k]-c[k-2],c[k+1]-c[k-1]); if (L<90) continue;
        const ps=d.parkSides(rd); const kind=(rd[3]&1?'o':'t')+ps.sides.length; if (!want[kind]||(got[kind]||0)>=want[kind]) continue; if (i%3) continue;
        got[kind]=(got[kind]||0)+1; const n=c.length/2|0, k=(n>>1)*2-2>=0?(n>>1)*2-2:0;
        out.push([c[k], c[k+1], c[k+2]-c[k], c[k+3]-c[k+1], kind, rd[1]>=0?d.DATA.S[rd[1]]:'', rd[2], JSON.stringify(ps.sides)]); }
      return out; })())"""))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (x, z, dx, dz, kind, nm, w, sides) in enumerate(pts):
        await pg.evaluate("([x,z,dx,dz])=>{const d=__dbg, L=Math.hypot(dx,dz)||1; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x-dx/L*6, y+11, z-dz/L*6); d.camera.lookAt(x+dx/L*14, y, z+dz/L*14); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, dx, dz])
        open('shots/marcas_%s_%d.jpg' % (tag, i), 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
        print('foto', i, kind, round(x), round(z), nm, 'ancho', w, 'lados', sides)
    print('SONDA MARCAS OK')
