# Sonda del Pasaje Aguere (v0.78.1): qué edificios cubren cada punto del pasaje, los tramos de galería hechos, alturas
# del suelo, y fotos desde arriba. Uso: cd tests && python run_test.py herramientas/sonda_pasaje.py
import json, os, base64
PTS = [[-168, -54], [-176, -37], [-184, -19], [-186, -14], [-188, -9], [-195, 7], [-201, 20], [-208, 36], [-214, 49], [-218, 58]]
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(3);})()")
    r = json.loads(await pg.evaluate("""(P)=>JSON.stringify((()=>{ const d=__dbg; const out=[];
      for (const [x,z] of P) { const bs=d.BUILD.filter(b=>Math.abs(b.cx-x)<80&&Math.abs(b.cz-z)<80&&d.pip(x,z,b.pts.flat())).map(b=>({H:+b.H.toFixed(1), top:+b.top.toFixed(1), pasaje:b.pasaje, n:b.pts.length, cx:Math.round(b.cx), cz:Math.round(b.cz), style:b.style}));
        out.push({ p:[x,z], suelo:+d.heightAt(x,z).toFixed(2), edificios:bs }); }
      return { puntos: out, hechos: d.PASAJES.built.filter(h=>/Aguere|Teide/.test(h.name)), patio: d.ATRIOS().map(a=>({x:+a.x.toFixed(1),z:+a.z.toFixed(1),ux:+a.ux.toFixed(3),uz:+a.uz.toFixed(3)})) }; })())""", PTS))
    for p in r['puntos']: print('punto', p)
    print('hechos', r['hechos']); print('patio', r['patio'])
    os.makedirs('shots', exist_ok=True)
    for i, (cx, cz, tx, tz, h) in enumerate([[-150, -10, -190, -10, 55], [-240, 20, -195, 10, 45], [-200, 80, -205, 40, 25]]):
        await pg.evaluate("([cx,cz,tx,tz,h])=>{const d=__dbg; d.PLAYER.x=tx; d.PLAYER.z=tz; __step(2); d.camera.position.set(cx,d.heightAt(cx,cz)+h,cz); d.camera.lookAt(tx,d.heightAt(tx,tz),tz); d.camera.updateMatrixWorld();}", [cx, cz, tx, tz, h])
        open('shots/pasaje_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1])); print('foto pasaje_%d' % i)
