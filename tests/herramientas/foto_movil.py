# Capturas del HUD en pantallas de móvil apaisado (se lanza solo: python herramientas/foto_movil.py).
# Uso: cd tests && python run_test.py herramientas/foto_movil.py [entrada.json]
import asyncio, sys
from playwright.async_api import async_playwright
S='shots/'; import os, sys; os.makedirs(S, exist_ok=True)
SIZES=[(890,400),(740,360),(1000,450)]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        for i,(w,h) in enumerate(SIZES):
            ctx = await b.new_context(viewport={'width':w,'height':h}, device_scale_factor=1, is_mobile=True, has_touch=True)
            pg = await ctx.new_page()
            await pg.goto('http://localhost:8765/test.html?q=baja'); await pg.wait_for_function('window.__GAME_READY', timeout=240000)
            await pg.evaluate("(()=>{document.getElementById('menu').style.display='none'; window.__manual=true; const d=__dbg; d.GAME.state='play'; __step(10); window.__snap&&window.__snap();})()")
            await pg.screenshot(path=S+f'mob_{i}.png')
            if i==0:
                await pg.evaluate("(()=>{const d=__dbg; const c=d.nearestEnterable&&d.nearestEnterable(); const car=d.CARS.find(c=>c.type!=='moto'); if(car){ d.enterCar(car);} __step(10); window.__snap();})()")
                await pg.screenshot(path=S+'mob_car.png')
            await ctx.close()
        await b.close()
asyncio.run(main())
