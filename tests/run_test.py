import asyncio, sys, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width':640,'height':360})
        logs=[]
        pg.on('console', lambda m: logs.append(m.type+': '+m.text))
        pg.on('pageerror', lambda e: logs.append('PAGEERROR: '+str(e)))
        await pg.goto('http://localhost:8765/test.html?q=baja')
        try:
            await pg.wait_for_function('window.__GAME_READY', timeout=180000)
        except Exception as e:
            print('not ready', e)
        await pg.wait_for_timeout(1500)
        t0=await pg.evaluate('performance.now()'); pass; print('shot ms', await pg.evaluate('performance.now()')-t0); print(await pg.evaluate('JSON.stringify(window.__dbg.renderer.info.render)+" calls:"+window.__dbg.renderer.info.render.calls'))
        script = sys.argv[1] if len(sys.argv)>1 else ''
        if script:
            exec(open(script).read(), globals())
            await globals()['run'](pg)
        print('\n'.join(logs[-40:]))
        await b.close()
asyncio.run(main())
