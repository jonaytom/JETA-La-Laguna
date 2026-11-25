# Pruebas 1.4.48 — 2026-11-25 00:21 — 1/3 OK

Listas: viejas. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 175 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_077.py` | **FALLA** (repetida aparte) | 67 s |
| 2 | `prueba_079.py` | **OK** | 2 s |
| 3 | `prueba_mapa_reventon_1439_gpu.py` | **FALLA** (repetida aparte) | 67 s |

## Detalle

### 1. prueba_077.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading 'inst')\n    at eval (eval at evaluate (:311:30), <anonymous>:3:17)\n    at eval (eval at evaluate (:311:30), <anonymous>:6:203)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 52.5
{"frame":1384,"calls":938,"triangles":12370732,"points":0,"lines":0} calls:938
juntado {'stats': {'sueltas': 6864, 'juntadas': 6045, 'mallas': 1700, 'ms': 270, 'no': {'grupo con nombre': 4608, 'pieza singular': 14, 'varios materiales': 19, 'userData': 450, 'onBeforeRender': 1}, 'ejemplos': {'pieza singular': [[0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[-147, -618, 'ShapeGeometry']]}, 'ultimoId': 25738}, 'fusion': 1700, 'celdas': 3885, 'lod': 10189, 'peatones_enteros': 0}
distancia {'cerca': [44, 44], 'lejos': [0, 9283], 'niebla': 520}
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
  File "<string>", line 25, in run
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
playwright._impl._errors.Error: Page.evaluate: TypeError: Cannot read properties of null (reading 'inst')
    at eval (eval at evaluate (:311:30), <anonymous>:3:17)
    at eval (eval at evaluate (:311:30), <anonymous>:6:203)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 2. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.109, 'mano_izq': 0.033, 'angulo_antebrazo': 31}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.114, 'mano_izq': 0.062, 'angulo_antebrazo': 36}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 72, 'paradas': 0, 'marcador': [3, 0]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': True}
portero sale a por el balón {'portero_la_quita': True, 'frames': 63, 'gol': 0}
FUTBOL saque True palomitas True fuerza True regate True
foto v079_mate_m360_0
foto v079_mate_m360_1
foto v079_mate_m360_2
foto v079_mate_m360_3
foto v079_mate_molino_0
foto v079_mate_molino_1
foto v079_mate_molino_2
foto v079_mate_molino_3
foto v079_mate_espaldas_0
foto v079_mate_espaldas_1
foto v079_mate_espaldas_2
foto v079_mate_espaldas_3
foto v079_mate_piernas_0
foto v079_mate_piernas_1
foto v079_mate_piernas_2
foto v079_mate_piernas_3
mates {'m360': {'marcador': [2, 0]}, 'molino': {'marcador': [4, 0]}, 'espaldas': {'marcador': [6, 0]}, 'piernas': {'marcador': [8, 0]}}
pase largo {'altura_max': 3.42, 'recibe': True}
combos de la CPU buena {'combos_cpu': 14, 'marcador': [30, 34]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 3. prueba_mapa_reventon_1439_gpu.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
PRUEBA MAPA Y REVENTON 1.4.39 FALLA
Traceback (prueba): AssertionError({'barrierScan': False, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': False, 'clearedRoad': [True, True, True, True, True, True, False, False, False], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': False, 'floor': True, 'drivable': True, 'rimLod': False, 'reventon': True, 'brakes': True, 'pedsMotorway': True})
--- repetida aparte:
shot ms 7.399999998509884
{"frame":1386,"calls":938,"triangles":12052483,"points":0,"lines":0} calls:938
{'barrierScan': False, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': False, 'clearedRoad': [True, True, True, True, True, True, False, False, False], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': False, 'floor': True, 'drivable': True, 'rimLod': False, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 FALLA
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
  File "<string>", line 83, in run
AssertionError: {'barrierScan': False, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': False, 'clearedRoad': [True, True, True, True, True, True, False, False, False], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': False, 'floor': True, 'drivable': True, 'rimLod': False, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
```

Fotos/archivos nuevos en `tests/shots/`: v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg
