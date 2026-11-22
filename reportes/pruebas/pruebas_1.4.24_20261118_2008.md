# Pruebas 1.4.24 — 2026-11-18 20:08 — 3/4 OK

Listas: v1424b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 458 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1424.py` | **FALLA** (repetida aparte) | 53 s |
| 2 | `prueba_1422.py` | **OK** | 0 s |
| 3 | `prueba_persecuciones.py` | **OK** | 354 s |
| 4 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_1424.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Please use browser.new_context()')
--- repetida aparte:
shot ms 28.799999997019768
{"frame":564,"calls":1536,"triangles":11637576,"points":0,"lines":0} calls:1536
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
  File "<string>", line 27, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 14620, in new_page
    return mapping.from_impl(await self._impl_obj.new_page())
                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_browser_context.py", line 352, in new_page
    raise Error("Please use browser.new_context()")
playwright._impl._errors.Error: Please use browser.new_context()
```

### 2. prueba_1422.py — OK

```
{'cornerError': 0, 'route': 75, 'drive': {'maxYaw': 1.350000000000001, 'maxYawAcc': 3.200000000000194, 'maxSteer': 1.8000000000000007, 'secs': 98.21666666666667, 'len': 1910.6826080994506, 'maxDec': 9.775000000000063, 'minRadius': 5.80760467257441, 'drift': 0.20166756391514815, 'hbFrames': 527, 'done': True}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
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

### 3. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.34 m OK
[8] Los bancos del Adelantado: a pie: a 7 m, recorre 14 m en 3 s, salto máx 0.32 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 10 m en 3 s, salto máx 0.16 m OK | a pie: a 10 m, recorre 11 m en 3 s, salto máx 0.16 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 4. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 40, 'peor': 56, 'estado': 'play'}
errores JS []
ARRANQUE OK
```
