# Pruebas 1.4.24 — 2026-11-18 19:59 — 4/5 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 488 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1424.py` | **FALLA** (repetida aparte) | 86 s |
| 2 | `prueba_1422.py` | **OK** | 0 s |
| 3 | `prueba_081.py` | **OK** | 319 s |
| 4 | `prueba_089.py` | **OK** | 2 s |
| 5 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_1424.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): TimeoutError('Page.screenshot: Timeout 30000ms exceeded.\nCall log:\n  - taking page screenshot\n  - waiting for fonts to load...\n  - fonts loaded\n')
--- repetida aparte:
shot ms 14.5
{"frame":562,"calls":1525,"triangles":11428930,"points":0,"lines":0} calls:1525
1280 720 False {'visible': False, 'name': True, 'separate': True}
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
  File "<string>", line 26, in run
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

### 2. prueba_1422.py — OK

```
{'route': 75, 'drive': {'secs': 98.51666666666667, 'len': 1912.9085268571528, 'maxDec': 9.775000000000063, 'minRadius': 5.030232048959656, 'drift': 0.2021497769561226, 'hbFrames': 509, 'done': True}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
PERSECUCION_TERMINA OK
SIN_FRENAZOS_EN_SECO OK
CURVAS_CON_RADIO OK
DERRAPA_EN_CURVAS OK
CAMPOS_VALLADOS OK
CANCHAS_VALLADAS OK
BOTONES_TACTILES OK
errores []
PRUEBA 1422 OK
```

### 3. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'Sibarita Gourmet', 'opcion': 4, 'abre': True, 'juego': 'attract'}
foto v081_titulo
vista a los 9 s demo
foto v081_demo
foto v081_records
moneda {"creditos":1,"modo":"play","dinero":49}
BAR OK
controles {'mueve': [71, 71], 'tiro': True, 'beam': True}
mejoras y módulo {'cursor': 0, 'velocidad': 1, 'cursor2': 1, 'modulo': True, 'st0': 'front', 'lanzado': 'free', 'delante': 105, 'vuelve': 'front'}
foto v081_jugando
CONTROLES OK
foto v081_fase1
foto v081_jefe1
foto v081_fase2
foto v081_jefe2
foto v081_fase3
foto v081_jefe3
recorrido [{'fase': 1, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 103, 'puntos': 21280}, {'fase': 2, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 111, 'puntos': 21590}, {'fase': 3, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 112, 'puntos': 28370}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name', 'modo': 'attract'}
foto v081_records_nuevo
RECORDS OK
errores []
PRUEBA 081 OK
```

### 4. prueba_089.py — OK

```
pausa basket True False
basket {'conBalon': True, 'ahora': ['EL CHOPA']}
ayuda {'moved': [3.9, 4, 4.1]}
combo sin acertar {'t': 2.7, 'vuela': True, 'miss': True, 'sc': 0, 'fase': 'play', 'n': 77, 'suelto': 'held', 'mate': 'hierro'}
futbol {'ctl': True, 'kickCD': 0.5833333333333333, 'cd0': 0, 'mio': False, 'suelto': True}
pausa máquina True False
foto v089_bencomo play
PAUSA OK
CONTROL BASKET OK
ENTRADA FUTBOL OK
BENCOMO OK
COMBO SIN ACERTAR OK
errores []
PRUEBA 089 OK
```

### 5. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 48, 'peor': 77, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v089_bencomo.jpg
