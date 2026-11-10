# v1.2.2: dónde queda el pico de la pasarela del Padre Anchieta y su bajada, y el tranvía cerca
import json
async def run(pg):
    r = json.loads(await pg.evaluate("""(()=>{ const d=__dbg, T=d.DATA.T, o=[]; for (let i=0;i<T.length;i+=2) if (Math.hypot(T[i]+330,T[i+1]-690)<140) o.push([Math.round(T[i]),Math.round(T[i+1])]); return JSON.stringify({ pico: d.PASARELA.pico||null, tranvia: o }); })()"""))
    print('pico', json.dumps(r))
    print('SONDA PICO OK')
