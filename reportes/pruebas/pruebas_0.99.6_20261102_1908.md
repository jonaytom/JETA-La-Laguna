# Pruebas 0.99.6 — 2026-11-02 19:08 — 6/8 OK

Listas: v0997a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 331 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_juandevera.py` | **FALLA** (repetida aparte) | 45 s |
| 2 | `prueba_recorte.py` | **OK** | 71 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 125 s |
| 5 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 6 | `prueba_0996.py` | **OK** | 0 s |
| 7 | `prueba_0995.py` | **OK** | 0 s |
| 8 | `prueba_078.py` | **OK** | 23 s |

## Detalle

### 1. sonda_juandevera.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.evaluate: ReferenceError: THREE is not defined\n    at eval (eval at evaluate (:311:30), <anonymous>:3:17)\n    at eval (eval at evaluate (:311:30), <anonymous>:7:23)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)')
--- repetida aparte:
shot ms 2.5
{"frame":562,"calls":1813,"triangles":4696691,"points":0,"lines":0} calls:1813
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
  File "<string>", line 5, in run
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
playwright._impl._errors.Error: Page.evaluate: ReferenceError: THREE is not defined
    at eval (eval at evaluate (:311:30), <anonymous>:3:17)
    at eval (eval at evaluate (:311:30), <anonymous>:7:23)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 2. prueba_recorte.py — OK

```
recortados 3826 de 6521 · siguen metidos ≥ 1 m: 121
   [1, 230, 4.9, '']
   [539, 1171, 4.9, 'Edificio Beneharo']
   [241, 771, 4.2, '']
   [1424, 3934, 3.3, '']
   [-938, 1479, 3.3, '']
   [-2730, -287, 3.3, '']
   [-1799, -757, 3.2, '']
   [-1895, 1369, 3, '']
   [664, 1528, 3, '']
   [3334, 1991, 3, '']
   [-4699, 92, 2.8, '']
   [1506, 2926, 2.7, '']
   [1729, 3787, 2.6, 'Mercadona']
   [-115, 1263, 2.6, '']
   [547, 1406, 2.6, '']
   [1967, 1409, 2.6, 'Portal 3']
   [-187, 709, 2.6, '']
   [-3414, -424, 2.6, '']
   [3179, 2047, 2.6, '']
   [-1118, 1754, 2.5, '']
   [-882, -445, 2.5, '']
   [847, 1669, 2.5, '']
   [-3537, -193, 2.5, '']
   [3275, 2044, 2.5, '']
   [686, 1684, 2.4, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 4. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.900000000372529
{"frame":564,"calls":1768,"triangles":4613532,"points":0,"lines":0} calls:1768
roads 118
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.7, 'x': 1220, 'z': 2534, 'y': -123.6}
snap df_1667
FAIL {'off': 3.4, 'dy': 2, 'col': False, 'low': False, 'ri': 3286, 't': 9, 'name': '', 'L': 26, 'done': False, 'left': 22, 'time': 5, 'x': -1252, 'z': -2, 'y': 19}
snap df_3286
failed 1 of 118 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2534
CONDUCCION FALLA
```

### 5. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.3","punta":"187","maxV":"199","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -2243   Z 0"}
```

### 6. prueba_0996.py — OK

```
paso 68 hundido 5.68 m, pendiente máx 0.105 cruces (vía, x, z, hueco m): [[1787, -927, 63, 6.4], [2288, -933, 71, 6.4], [2294, -926, 62, 6.4], [2460, -941, 83, 6.4], [2469, -946, 91, 6.4]]
paso 311 hundido 2.97 m, pendiente máx 0.146 cruces (vía, x, z, hueco m): [[1795, -1229, -11, 6.43], [2288, -1197, -30, 6.48], [2480, -1215, -20, 6.51]]
paso 363 hundido 5.41 m, pendiente máx 0.174 cruces (vía, x, z, hueco m): [[347, 2195, 3235, 6.4], [379, 2182, 3233, 6.4]]
paso 564 hundido 4.29 m, pendiente máx 0.097 cruces (vía, x, z, hueco m): [[2023, 639, -1154, 6.4]]
paso 658 hundido 2.38 m, pendiente máx 0.191 cruces (vía, x, z, hueco m): [[2021, 631, 592, 6.4]]
paso 892 hundido 5.68 m, pendiente máx 0.121 cruces (vía, x, z, hueco m): [[2331, 1504, 2767, 6.4], [2464, 1492, 2778, 6.4]]
paso 911 hundido 3.01 m, pendiente máx 0.199 cruces (vía, x, z, hueco m): [[1293, 1831, 3131, 6.58], [2464, 1818, 3144, 6.58]]
paso 919 hundido 2.9 m, pendiente máx 0.173 cruces (vía, x, z, hueco m): [[1293, 1799, 3095, 6.65], [2464, 1786, 3107, 6.6]]
paso 1082 hundido 5.49 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): [[3098, 2208, 3277, 6.43]]
paso 1666 hundido 7.03 m, pendiente máx 0.132 cruces (vía, x, z, hueco m): [[1516, 1112, 2486, 7.53], [3373, 1118, 2477, 7.51]]
paso 1973 hundido 6.33 m, pendiente máx 0.144 cruces (vía, x, z, hueco m): []
paso 2706 hundido 5.36 m, pendiente máx 0.108 cruces (vía, x, z, hueco m): []
paso 3021 hundido 5.51 m, pendiente máx 0.076 cruces (vía, x, z, hueco m): []
paso 3396 hundido 5.36 m, pendiente máx 0.082 cruces (vía, x, z, hueco m): []
paso 3631 hundido 5.43 m, pendiente máx 0.161 cruces (vía, x, z, hueco m): [[1774, -342, 803, 6.4]]
paso 3662 hundido 2.38 m, pendiente máx 0.215 cruces (vía, x, z, hueco m): []
paso 3706 hundido 6.04 m, pendiente máx 0.136 cruces (vía, x, z, hueco m): [[2310, 1497, 1720, 6.4], [2311, 1474, 1695, 6.38]]
paso 5096 hundido 5.36 m, pendiente máx 0.267 cruces (vía, x, z, hueco m): []
paso 5101 hundido 6.42 m, pendiente máx 0.164 cruces (vía, x, z, hueco m): [[4807, -3083, -147, 6.49], [5133, -3033, -149, 6.47], [5134, -3027, -148, 6.41]]
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 21 OK
errores []
PRUEBA 0996 OK
```

### 7. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9383
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o4_148m', 'aL_o2_86', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 99 tramos, 7254 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6, "y": -8.5}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6, "y": 4.7}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8, "y": 1.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8, "y": 3.1}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8, "y": 2.5}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220472441, "len": 1.5, "ancho": 3.8, "y": 3.7}, {"name": "Pasaje Teide", "cubierta": true, "x": -147, "z": -111, "len": 1.5}, {"name": "Pasaje Aguere", "x": -169.87012987012986, "z": -49.90909090909091, "len": 2, "ancho": 3.8, "y": 2.1}, {"name": "Pasaje Aguere", "cubierta": true, "x": -170, "z": -50, "len": 2}, {"name": "Pasaje Aguere", "x": -182.7565901540253, "z": -21.719959038069653, "len": 6, "ancho": 3.8, "y": -4}, {"name": "Pasaje Aguere", "x": -186, "
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.91, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.87, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -0.72), ([-184, -19], True, -3.92, True, -0.82), ([-188, -9], True, -3.92, True, -0.82), ([-217.5, 58.5], True, -3.81, False, 4.47)]
patio {'x': -179, 'z': -30, 'r': 6.3, 'yU': 1.33, 'yL': -4.02, 'escaleras': 2, 'peldanos': 30, 'galeria_baja': 91.9, 'salida': [-217, 59]} bajada maxima entre puntos 0.77 llega abajo True
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
foto v0781_juego_cerca
foto v0781_patio_desde_rellano
foto v0781_patio_desde_abajo
foto v0781_escalera_abajo
foto v0781_galeria_baja
foto v0781_galeria_hacia_juego
errores []
PRUEBA 078 OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1667.jpg, df_3286.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
