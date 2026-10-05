# Ambiente sonoro: inicia el audio, deja correr el juego cerca de árboles, peatones y coches, cambia de hora para
# que suenen las campanas y comprueba que no hay errores.
import os, asyncio
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_helpers.py')).read().split('async def run')[0])
async def run(pg):
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; const d=__dbg; d.GAME.state='play'; d.AUDIO.init(); d.AUDIO.ctx.resume(); __step(3);})()")
    await asyncio.sleep(1)
    r = await pg.evaluate("""(async()=>{const d=__dbg; const P=d.PLAYER; P.x=-560; P.z=-300; d.GAME.tod=9.98; let errs=0;
      for(let i=0;i<300;i++){ try{ __step(1,1/30); d.AMBIENCE.update(1/30);}catch(e){errs++; console.error(e);} if(i%30===0) await new Promise(r=>setTimeout(r,30)); }
      return JSON.stringify({estado:d.AUDIO.ctx.state, errores:errs, hora:d.GAME.tod.toFixed(2)}); })()""")
    print(r)
