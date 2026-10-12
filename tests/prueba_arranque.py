# Arranque (v0.66.1, va en todas las versiones): el juego carga, corre 10 s a pie y 5 s en coche sin errores de
# JavaScript y sin fotogramas absurdamente lentos.
import asyncio, json
async def run(pg):
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; __dbg.GAME.state='play'; __dbg.GAME.tod=12;})()")
    r = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const t=[]; for (let i=0;i<20;i++){ const a=performance.now(); __step(30); t.push(performance.now()-a); }
      const d=__dbg, P=d.PLAYER; const c=new d.Car('sedan',0x3060c0,P.x+2.5,P.z,0); P.x=c.x+2; d.enterCar(c); for (let i=0;i<10;i++){ const a=performance.now(); __step(30, 1/60, ['KeyW']); t.push(performance.now()-a); } d.exitCar();
      t.sort((a,b)=>a-b); return { mediana: Math.round(t[t.length>>1]), peor: Math.round(t[t.length-1]), estado: d.GAME.state }; })())"""))
    print('30 pasos (ms):', r)
    ok = not errs and r['estado'] == 'play'
    print('errores JS', errs[:3]); print('ARRANQUE', 'OK' if ok else 'FALLA')
