# Capturas del mapa grande a varios zooms (centrado en el jugador o en un punto).
# Uso: cd tests && python run_test.py herramientas/foto_mapa.py [x z]   → shots/mapa_<zoom>.png
import asyncio, os, sys, base64
async def shot(pg, path):
    d = await pg.evaluate("document.getElementById('bmc').toDataURL('image/png')"); open(path, 'wb').write(base64.b64decode(d.split(',')[1]))
async def run(pg):
    await pg.set_viewport_size({'width': 1280, 'height': 720})
    await pg.evaluate("(()=>{window.__manual=true; document.getElementById('menu').style.display='none'; __dbg.GAME.state='play'; __dbg.GAME.lock=()=>{}; __step(2);})()")
    if len(sys.argv) > 3: await pg.evaluate("([x,z])=>{__dbg.PLAYER.x=x; __dbg.PLAYER.z=z; __step(2);}", [float(sys.argv[2]), float(sys.argv[3])])
    os.makedirs('shots', exist_ok=True)
    await pg.evaluate("__dbg.BIGMAP.toggle()"); await asyncio.sleep(0.6)
    z0 = await pg.evaluate("__dbg.BIGMAP.zoom"); print('zoom inicial', z0)
    await shot(pg, 'shots/mapa_inicial.png')
    for z in [0.3, 0.8, 2.0, 3.5]:
        await pg.evaluate("(z)=>{__dbg.BIGMAP.zoom=z;}", z); await asyncio.sleep(0.4)
        await shot(pg, f'shots/mapa_{z}.png')
    print('capturas en tests/shots/mapa_*.png')
