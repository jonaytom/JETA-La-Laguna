# Juega una misión con el piloto automático hasta que aparece la flecha roja de «a quién perseguir» y hace una foto
# desde detrás del jugador mirando al perseguido. Uso: cd tests && python run_test.py herramientas/foto_marca.py <índice>
#   → shots/marca_<índice>.jpg   (índices: ver prueba_misiones.py; 11 = Los bancos del Adelantado)
import asyncio, json, sys, os, base64
AUTO = open('prueba_misiones.py').read().split('AUTO = r"""')[1].split('"""')[0]
async def run(pg):
    i = int(sys.argv[2]) if len(sys.argv) > 2 else 11; os.makedirs('shots', exist_ok=True)
    await pg.evaluate("HTMLCanvasElement.prototype.requestPointerLock = function(){}")
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __dbg.GAME.tod=12; __step(2);})()")
    await pg.evaluate("(i)=>{const d=__dbg, M=d.MISSIONS; M._setIdx(i); const p=M._story[i].startPos(); d.PLAYER.x=p[0]; d.PLAYER.z=p[1]; __step(10);}", i)
    for _ in range(500):
        if await pg.evaluate("__dbg.S2.marks.length"): break
        a = await pg.evaluate(AUTO)
        if a in ('fight', 'dlg', 'countdown'): await asyncio.sleep(0.4)
        else: await pg.evaluate("__step(6, 1/30)")
    await pg.evaluate("__step(20, 1/30)")
    info = await pg.evaluate("""(()=>{const d=__dbg, k=d.S2.marks[0]; if(!k) return 'sin marca'; const o=k.o, P=d.PLAYER; const dx=o.x-P.x, dz=o.z-P.z, L=Math.hypot(dx,dz)||1; const y=d.heightAt(P.x,P.z);
      const mx=(P.x+o.x)/2, mz=(P.z+o.z)/2; d.camera.position.set(mx-dz/L*12-dx/L*4, y+4, mz+dx/L*12-dz/L*4); d.camera.lookAt(mx, d.heightAt(mx,mz)+1.5, mz); return JSON.stringify({dist:L.toFixed(1), marca:[k.a.position.x|0,k.a.position.y|0,k.a.position.z|0], obj:document.getElementById('objective').innerText});})()""")
    print(info)
    open(f'shots/marca_{i}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
