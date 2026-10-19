import asyncio, sys, json
from playwright.async_api import async_playwright
MUDO = """(()=>{ window.__JETA_TEST = true; try { if (window.speechSynthesis) { window.speechSynthesis.speak = () => {}; } } catch (e) {}
  try { const P = window.BaseAudioContext && BaseAudioContext.prototype, d = P && Object.getOwnPropertyDescriptor(P, 'destination');
    if (d) Object.defineProperty(P, 'destination', { get() { if (!this.__mudo) { const g = this.createGain(); g.gain.value = 0; g.connect(d.get.call(this)); this.__mudo = g; } return this.__mudo; } }); } catch (e) {} })()"""  # v0.77: tests in silence (--mute-audio doesn't stop the system voice)
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist', '--mute-audio'])
        pg = await b.new_page(viewport={'width':640,'height':360})
        await pg.add_init_script(MUDO)
        logs=[]
        pg.on('console', lambda m: logs.append(m.type+': '+m.text))
        pg.on('pageerror', lambda e: logs.append('PAGEERROR: '+str(e)))
        await pg.goto('http://localhost:8765/test.html?q=baja')
        try:
            await pg.wait_for_function('window.__GAME_READY', timeout=180000)
        except Exception as e:  # v0.69: the game didn't load: say why and stop (don't wait for the test's own time-outs)
            print('not ready', e); print('NO CARGA: ' + ' | '.join(l for l in logs if 'PAGEERROR' in l or l.startswith('error'))[:800]); await b.close(); return
        await pg.wait_for_timeout(1500)
        t0=await pg.evaluate('performance.now()'); pass; print('shot ms', await pg.evaluate('performance.now()')-t0); print(await pg.evaluate('JSON.stringify(window.__dbg.renderer.info.render)+" calls:"+window.__dbg.renderer.info.render.calls'))
        script = sys.argv[1] if len(sys.argv)>1 else ''
        if script:
            exec(open(script).read(), globals())
            await globals()['run'](pg)
        print('\n'.join(logs[-40:]))
        await b.close()
asyncio.run(main())
