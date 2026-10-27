# Pruebas 0.94.0 — 2026-10-27 10:31 — 1/3 OK

Listas: v094. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 259 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_094.py` | **FALLA** (repetida aparte) | 84 s |
| 2 | `prueba_093.py` | **FALLA** (repetida aparte) | 84 s |
| 3 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_094.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
PRUEBA 094 FALLA
PAGEERROR: Cannot read properties of null (reading '0')
PAGEERROR: Cannot read properties of null (reading '0')
--- repetida aparte:
shot ms 2.099999997764826
{"frame":564,"calls":1790,"triangles":4689850,"points":0,"lines":0} calls:1790
golpe a 10 de profundidad {'hp0': 8, 'hp': 6}
foto v094_guanche_retrato
foto v094_bencomo_salto
foto v094_bencomo_picado
PROFUNDIDAD OK
errores ["Cannot read properties of null (reading '0')", "Cannot read properties of null (reading '0')"]
PRUEBA 094 FALLA
PAGEERROR: Cannot read properties of null (reading '0')
PAGEERROR: Cannot read properties of null (reading '0')
```

### 2. prueba_093.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')\n    at drawBenX (http://localhost:8765/test.html?q=baja:9955:61)\n    at drawBencomo (http://localhost:8765/test.html?q=baja:9968:36)\n    at g.draw (http://localhost:8765/test.html?q=baja:9929:7)\n    at render (http://localhost:8765/test.html?q=baja:9437:77)\n    at Object._render (http://localhost:8765/test.html
PAGEERROR: Cannot read properties of undefined (reading '0')
--- repetida aparte:
shot ms 3.099999997764826
{"frame":564,"calls":1748,"triangles":4625164,"points":0,"lines":0} calls:1748
hojas 25 sin cargar []
foto v093_guanche_elegir
foto v093_guanche_magote
foto v093_guanche_mencey
foto v093_guanche_mirla
foto v093_guanche_montado
lagarto {'walk': 25.000000000000064} {'run': 47.99999999999993, 'running': True}
foto v093_guanche_jefes
foto v093_bencomo_titulo
Traceback (most recent call last):
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 27, in <module>
    asyncio.run(main())
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 195, in run
    return runner.run(main)
           ^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\base_events.py", line 691, in run_until_complete
    return future.result()
           ^^^^^^^^^^^^^^^
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 24, in main
    await globals()['run'](pg)
  File "<string>", line 45, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 9421, in evaluate
    await self._impl_obj.evaluate(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 474, in evaluate
    return await self._main_frame.evaluate(expression, arg)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_frame.py", line 346, in evaluate
    await self._channel.send(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.Error: Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')
    at drawBenX (http://localhost:8765/test.html?q=baja:9955:61)
    at drawBencomo (http://localhost:8765/test.html?q=baja:9968:36)
    at g.draw (http://localhost:8765/test.html?q=baja:9929:7)
    at render (http://localhost:8765/test.html?q=baja:9437:77)
    at Object._render (http://localhost:8765/test.html?q=baja:9480:167)
    at eval (eval at evaluate (:311:30), <anonymous>:3:207)
    at eval (eval at evaluate (:311:30), <anonymous>:3:231)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 41, 'peor': 69, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg, v094_bencomo_picado.jpg, v094_bencomo_salto.jpg, v094_guanche_retrato.jpg
