# De dónde sale el aparcamiento de cada calle (v1.1.2; Jonay: «lo de la zona de aparcamientos aplica a muchos más sitios,
# hay que buscar la manera de detallar»). Cuenta las calles por fuente (osm = etiquetas parking:*, tira = un aparcamiento
# «en la calle» del OSM al lado, ancho = regla por anchura, nada = sin coches) y por cuántos lados tienen banda, y saca fotos
# desde la calle de 6 calles con banda (shots/aparca_<n>.jpg).
import base64, json
async def run(pg):
    r = json.loads(await pg.evaluate("JSON.stringify(__dbg.parkStats())"))
    tot = sum(r.values()); print('calles miradas:', tot)
    for k in sorted(r): print(f'  {k:10s} {r[k]}')
    pts = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, out=[]; for (const [i, rd] of d.DATA.R.entries()) { if (out.length>=6) break; if (rd[0]>12) continue; const c=rd[4]; if (c.length<6) continue; const n=c.length/2|0, k=(n>>1)*2; if (i%37) continue;
      try { const ps = d.parkStats && null; } catch(e){} out.push([c[k], c[k+1], c[k+2]-c[k], c[k+3]-c[k+1], rd[1]>=0?d.DATA.S[rd[1]]:'']); } return out; })())"""))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (x, z, dx, dz, nm) in enumerate(pts):
        await pg.evaluate("([x,z,dx,dz])=>{const d=__dbg, L=Math.hypot(dx,dz)||1; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x-dx/L*14, y+5, z-dz/L*14); d.camera.lookAt(x+dx/L*10, y, z+dz/L*10); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z, dx, dz])
        open('shots/aparca_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto', i, round(x), round(z), nm)
    print('SONDA APARCAMIENTO OK')
