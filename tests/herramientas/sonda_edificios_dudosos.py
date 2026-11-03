# Edificios de 50 m² o más que el recorte habría quitado (v1.0.0; Jonay: «no me gustaría que se fuera nada de más de
# 50 m²; esos casos mirémoslos uno a uno»). Se quedan como estaban; aquí salen en lista (dónde, cuánto mide, por qué
# se iba a quitar y la calle más cercana) con una foto desde arriba de cada uno, para decidir caso por caso.
# Uso: herramientas/sonda_edificios_dudosos.py [máximo] en una lista → shots/dudoso_NN.jpg y shots/sonda_edificios_dudosos.txt
import base64, json, os, sys
LOG = []
def out(*a):
    t = ' '.join(str(x) for x in a); LOG.append(t); print(t)
async def run(pg):
    lim = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 60
    os.makedirs('shots', exist_ok=True)
    L = json.loads(await pg.evaluate("""JSON.stringify((()=>{ const d=__dbg, G=d.RCLIP; if (!G) return []; return G.keptList.map(([x,z,a,why])=>{ const n=d.ROADSEG.nearest(x,z,(r)=>r[0]<=12); const r=n?d.DATA.R[n.ri]:null; return [x,z,a,why, r? (r[1]>=0?d.DATA.S[r[1]]:'(sin nombre)')+' ('+d.DATA.RT[r[0]]+', '+r[2]+' m)' : '?']; }).sort((p,q)=>q[2]-p[2]); })())"""))
    out(f'== edificios de 50 m² o más que se iban a quitar: {len(L)} (fotos de los {min(lim, len(L))} mayores)')
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.tod=12; __step(2);})()")
    for i, (x, z, a, why, calle) in enumerate(L):
        out(f'  {i + 1:3d}. X {x}, Y {z} · {a} m² · {why} · {calle}' + (f' · dudoso_{i + 1:02d}.jpg' if i < lim else ''))
        if i >= lim: continue
        await pg.evaluate("([x,z])=>{const d=__dbg; d.PLAYER.x=x; d.PLAYER.z=z; __step(3); const y=d.heightAt(x,z); d.camera.position.set(x+14,y+38,z+14); d.camera.lookAt(x,y,z); d.camera.updateMatrixWorld(); if (d.updateCityLOD) d.updateCityLOD(true); }", [x, z])
        open(f'shots/dudoso_{i + 1:02d}.jpg', 'wb').write(base64.b64decode((await pg.evaluate("window.__snap()")).split(',')[1]))
    open('shots/sonda_edificios_dudosos.txt', 'w', encoding='utf-8').write('\n'.join(LOG))
    print('SONDA EDIFICIOS DUDOSOS OK')
