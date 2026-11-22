# Pruebas 1.4.24 — 2026-11-19 17:02 — 2/3 OK

Listas: v1424entrega. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 498 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1422.py` | **OK** | 19 s |
| 2 | `prueba_1424.py` | **FALLA** (repetida aparte) | 148 s |
| 3 | `prueba_arranque.py` | **OK** | 293 s |

## Detalle

### 1. prueba_1422.py — OK

```
{'cornerError': 0, 'route': 75, 'drive': {'maxYaw': 1.350000000000001, 'maxYawAcc': 3.200000000000194, 'maxSteer': 1.8000000000000007, 'x': 83.27213125462235, 'z': 603.0831342540868, 'progress': 1909.814148571645, 'secs': 98.21666666666667, 'len': 1910.6826080994506, 'maxDec': 9.775000000000063, 'minRadius': 5.80760467257441, 'drift': 0.20166756391514815, 'hbFrames': 527, 'done': True}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
MISMA_CURVA_CON_NODOS_EXTRA OK
PERSECUCION_TERMINA OK
CARROCERIA_Y_RUEDAS_SIN_SALTOS OK
SIN_FRENAZOS_EN_SECO OK
CURVAS_CON_RADIO OK
DERRAPA_EN_CURVAS OK
CAMPOS_VALLADOS OK
CANCHAS_VALLADAS OK
BOTONES_TACTILES OK
errores []
PRUEBA 1422 OK
```

### 2. prueba_1424.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.screenshot: Protocol error (Page.captureScreenshot): Unable to capture screenshot\nCall log:\n  - taking page screenshot\n  - waiting for fonts to load...\n  - fonts loaded\n')
--- repetida aparte:
shot ms 17980.89999999851
{"frame":562,"calls":1754,"triangles":17140501,"points":0,"lines":0} calls:1754
1280 720 False {'visible': True, 'name': True, 'separate': True}
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
  File "<string>", line 34, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 10883, in screenshot
    await self._impl_obj.screenshot(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 830, in screenshot
    encoded_binary = await self._channel.send(
                     ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.TimeoutError: Page.screenshot: Timeout 30000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded
```

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 55, 'peor': 133, 'estado': 'play'}
errores JS []
ARRANQUE OK
```
