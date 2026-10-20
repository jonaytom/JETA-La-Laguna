# Pruebas 0.82.1 — 2026-10-20 17:22 — 1/3 OK

Listas: v0821a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 167 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0821.py` | **FALLA** (repetida aparte) | 73 s |
| 2 | `prueba_082.py` | **FALLA** | 37 s |
| 3 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_0821.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): TimeoutError('Page.screenshot: Timeout 30000ms exceeded.\nCall log:\n  - taking page screenshot\n  - waiting for fonts to load...\n  - fonts loaded\n')
--- repetida aparte:
shot ms 2.199999999254942
{"frame":560,"calls":1855,"triangles":4661076,"points":0,"lines":0} calls:1855
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
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
  File "<string>", line 18, in run
  File "<string>", line 13, in snap
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

### 2. prueba_082.py — FALLA

```
juguetería {'hay': True, 'tienda': 'Juguetes Sabelotodo', 'opcion': 0, 'abre': True}
foto v082_titulo
vista a los 9 s demo
foto v082_demo
foto v082_records
moneda {'creditos': 1, 'modo': 'play', 'fase': 'select', 'elegido': 1}
foto v082_elegir
guerrero {'heroe': 'pastor', 'fase': 'intro'}
TIENDA OK
controles {'anda': 39, 'alto': 37, 'corre': 'run', 'pelea': True, 'combo': {'vida': 3, 'max': 8, 'estado': 'fall'}}
foto v082_pelea
magia {'estado': 'magic', 'zurrones': 0, 'tocados': 2, 'enemigos': 2}
foto v082_magia
lagarto {'monta': True, 'cola': 'whip'}
foto v082_lagarto
CONTROLES OK
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
recorrido [{'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 104, 'puntos': 10270}, {'estado': {'p': [32, 12, 'atk', -1, 0], 'lock': 1, 'E': [['W', 'walk', 4, 14, 15, False, True, 0, 1]], 'teclas': ['vL']}, 'fase': 2, 'heroe': 'mirla', 'avance': 0.39, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 1560}, {'estado': {'p': [156, 9, 'atk', 1, 0], 'lock': 1, 'E': [['G', 'idle', 22, 174, 7, True, True, 0, -1]], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.39, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 1160}, {'estado': {'p': [104, 26, 'atk', 1, 0], 'lock': 1, 'E': [['G', 'idle', 22, 123, 23, True, True, 0, -1]], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 0.21, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 720}, {'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 175, 'puntos': 25610}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 42, 'peor': 64, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg
