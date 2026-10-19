# Varias pruebas con UNA sola carga del juego (v0.66.1): ahorra ~1 min de carga por prueba.
# Uso: python run_varios.py lista.txt   (una prueba por línea: script y argumentos, como PRUEBAS_LISTA.txt)
# Entre prueba y prueba deja el juego limpio (sin misión, minijuegos, diálogos ni coche). Cada prueba sale entre
# «=== INICIO <línea>» y «=== FIN <línea> <segundos>»; tools/pruebas_locales.py lo reparte y repite aparte la que falle.
import asyncio, sys, io, os, time, contextlib
from playwright.async_api import async_playwright
MUDO = """(()=>{ window.__JETA_TEST = true; try { if (window.speechSynthesis) { window.speechSynthesis.speak = () => {}; } } catch (e) {}
  try { const P = window.BaseAudioContext && BaseAudioContext.prototype, d = P && Object.getOwnPropertyDescriptor(P, 'destination');
    if (d) Object.defineProperty(P, 'destination', { get() { if (!this.__mudo) { const g = this.createGain(); g.gain.value = 0; g.connect(d.get.call(this)); this.__mudo = g; } return this.__mudo; } }); } catch (e) {} })()"""  # v0.77: tests in silence (--mute-audio doesn't stop the system voice)
RESET = """(()=>{ const d=__dbg; try { if (d.DIARIO && d.DIARIO.open_) d.DIARIO.close(); } catch (e) {} try { if (d.BASKET2D.running) d.BASKET2D._abort(); } catch (e) {}
  try { if (d.FIGHT2D.running) d.FIGHT2D._abort(); } catch (e) {} try { if (d.FUTBOL2D && d.FUTBOL2D.running) d.FUTBOL2D._abort(); } catch (e) {} try { if (d.DLG.open) d.DLG.hide(); } catch (e) {} try { if (window.__TALK) window.__TALK.cur = null; } catch (e) {}
  try { if (d.MISSIONS.active) d.MISSIONS.fail('fin de prueba', true); } catch (e) {} try { if (d.PLAYER.car) d.exitCar(); } catch (e) {}
  try { d.WANTED.level = 0; } catch (e) {} document.body.classList.remove('fighting'); window.__manual = true; d.GAME.state = 'play'; d.GAME.tod = 12; })()"""
async def main():
    lines = [l.strip() for l in open(sys.argv[1], encoding='utf-8') if l.strip() and not l.strip().startswith('#')]
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--mute-audio'])
        pg = await b.new_page(viewport={'width': 640, 'height': 360})
        await pg.add_init_script(MUDO)
        logs = []; pg.on('console', lambda m: logs.append(m.type + ': ' + m.text)); pg.on('pageerror', lambda e: logs.append('PAGEERROR: ' + str(e)))
        await pg.goto('http://localhost:8765/test.html?q=baja')
        try: await pg.wait_for_function('window.__GAME_READY', timeout=180000)
        except Exception as e:  # v0.69: the game didn't load: every test would wait for nothing
            print('not ready', e); print('NO CARGA: ' + ' | '.join(l for l in logs if 'PAGEERROR' in l or l.startswith('error'))[:800]); await b.close(); return
        await pg.wait_for_timeout(1500)
        for line in lines:
            parts = line.split(); t0 = time.time(); logs.clear()
            print('=== INICIO ' + line, flush=True)
            try:
                await pg.evaluate(RESET); await pg.evaluate("__step(5)")
                sys.argv = ['run_test.py', parts[0]] + parts[1:]; g = {'__name__': '__prueba__', '__file__': os.path.abspath(parts[0])}  # many tests find _helpers.py from __file__
                exec(compile(open(parts[0], encoding='utf-8').read(), parts[0], 'exec'), g)
                await asyncio.wait_for(g['run'](pg), timeout=600)
            except asyncio.TimeoutError: print('TIEMPO')
            except Exception as e: print('Traceback (prueba):', repr(e)[:400])
            print('\n'.join(l for l in logs[-40:] if 'PAGEERROR' in l or 'error' in l.lower()[:6]))
            print(f'=== FIN {line} {int(time.time() - t0)}', flush=True)
        await b.close()
asyncio.run(main())
