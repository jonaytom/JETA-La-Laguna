# v0.99.5 (Jonay: «revisar todas las marcas viales… autopista, Vía de Ronda y zonas que las enlazan… arcenes y medianas…
# no puede haber coches aparcados en medio de la autopista ni de la Vía de Ronda»): photos from above of the junctions of
# the motorways and the Vía de Ronda, and the count of parked cars standing on a big road (motorway, links, trunk,
# primary, Vía de Ronda). Photos: shots/vias_NN.jpg (the list of places is printed with their numbers).
import asyncio, os, base64, json
SITIOS = [[750, 1253], [403, 1458], [308, -51], [420, 278], [660, 702], [718, 948], [1042, 2522], [-810, 200], [-42, 1077],
          [860, 2076], [636, 1806], [992, 2212], [400, -293], [-573, 462], [182, 1326], [-100, 1013], [490, 1392], [1121, 2357]]
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    malos = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, D=d.DATA, RT=D.RT, S=D.S, out=[];
        const big=(r)=> r[0] <= 4 || S[r[1]] === 'Vía de Ronda de La Laguna';
        for (const s of d.PARKED.slots) { const rd=d.ROADSEG.nearest(s.x, s.z, big); if (rd && rd.d < D.R[rd.ri][2]/2 + 0.3) out.push([Math.round(s.x), Math.round(s.z), RT[D.R[rd.ri][0]], S[D.R[rd.ri][1]]]); }
        return out; })())"""))
    print('APARCADOS SOBRE CARRETERA GRANDE', len(malos), malos[:30])
    os.makedirs('shots', exist_ok=True)
    for i, (x, z) in enumerate(SITIOS):
        d = await pg.evaluate("""([x,z])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(8); const y=d.heightAt(x,z); d.camera.position.set(x+0.5,y+95,z+0.5); d.camera.lookAt(x,y,z); __step(2); d.camera.position.set(x+0.5,y+95,z+0.5); d.camera.lookAt(x,y,z); return window.__snap(); }""", [x, z])
        open('shots/vias_%02d.jpg' % i, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto vias_%02d' % i, x, z)
    for i, (x, z) in enumerate([[750, 1253], [1121, 2357], [-810, 200], [660, 702], [1042, 2522], [636, 1806]]):   # closer
        d = await pg.evaluate("""([x,z])=>{ const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(8); const y=d.heightAt(x,z); d.camera.position.set(x+0.5,y+45,z+0.5); d.camera.lookAt(x,y,z); __step(2); d.camera.position.set(x+0.5,y+45,z+0.5); d.camera.lookAt(x,y,z); return window.__snap(); }""", [x, z])
        open('shots/vias_cerca_%02d.jpg' % i, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto vias_cerca_%02d' % i, x, z)
        d = await pg.evaluate("""([x,z])=>{ const d=__dbg; const y=d.heightAt(x,z); d.camera.position.set(x+18,y+6,z+18); d.camera.lookAt(x,y+1,z); return window.__snap(); }""", [x, z])
        open('shots/vias_suelo_%02d.jpg' % i, 'wb').write(base64.b64decode(d.split(',')[1])); print('foto vias_suelo_%02d' % i)
    print('errores', errs[:3]); print('PRUEBA VIAS', 'OK' if not errs else 'FALLA')
