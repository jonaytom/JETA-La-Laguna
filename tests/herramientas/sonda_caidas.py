# Sitios donde un coche que va por un puente o un tablero se «cae» al tramo bajo de debajo (v1.1.0; Jonay, X −3292,
# Y −161: «me he caído por aquí con el coche mientras seguía a la furgoneta del queso… me dejó bloqueado»). Recorre las
# calles del mapa cada 4 m: donde hay un tablero (deckAt) por encima del terreno y lowAt (túneles, trincheras, rampas)
# devuelve a esa altura un suelo más de 1,5 m por debajo, el coche bajaba ahí (antes de la 1.1.0). Cuenta los sitios y
# saca fotos de los 8 primeros (shots/caida_<n>.jpg).
# Uso: herramientas/sonda_caidas.py [x y radio]   (sin nada: todo el mapa)
import base64, json, sys
async def run(pg):
    area = [float(v) for v in sys.argv[2:5]] if len(sys.argv) >= 5 else None
    r = json.loads(await pg.evaluate("""(area)=>JSON.stringify((()=>{ const d=__dbg, out=[], seen=new Set();
      d.DATA.R.forEach((rd,ri)=>{ const p=rd[4]; for (let i=0;i+3<p.length;i+=2){ const ax=p[i],az=p[i+1],bx=p[i+2],bz=p[i+3], L=Math.hypot(bx-ax,bz-az), n=Math.max(1,Math.ceil(L/4));
        for (let k=0;k<n;k++){ const x=ax+(bx-ax)*k/n, z=az+(bz-az)*k/n; if (area && Math.hypot(x-area[0],z-area[1])>area[2]) continue;
          const g=d.heightAt(x,z), dk=d.deckAt(x,z,g+40,true,0); if (!(dk>g+0.5)) continue; const lw=d.lowAt(x,z,dk); if (!lw || dk-lw.y<1.5) continue;
          const key=Math.round(x/15)+','+Math.round(z/15); if (seen.has(key)) continue; seen.add(key);
          out.push({x:Math.round(x), y:Math.round(z), calle: rd[1]>=0?d.DATA.S[rd[1]]:'', tablero:+dk.toFixed(1), abajo:+lw.y.toFixed(1)}); } } });
      return out; })())""", area))
    print('sitios donde se bajaba del tablero al tramo de abajo:', len(r))
    for i, e in enumerate(r[:50]): print(f"  {i}: X {e['x']}, Y {e['y']} · {e['calle'] or '(sin nombre)'} · tablero {e['tablero']} m, abajo {e['abajo']} m")
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, e in enumerate(r[:8]):
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+16,y+20,z+16); d.camera.lookAt(x,y,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [e['x'], e['y']])
        open('shots/caida_%d.jpg' % i, 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    print('SONDA CAIDAS OK')
