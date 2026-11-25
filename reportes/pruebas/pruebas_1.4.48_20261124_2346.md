# Pruebas 1.4.48 — 2026-11-24 23:46 — 25/30 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 652 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_bordes.py` | **OK** | 0 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 83 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 1 s |
| 6 | `prueba_grandes.py` | **OK** | 2 s |
| 7 | `prueba_078.py` | **OK** | 2 s |
| 8 | `prueba_trinidad.py` | **OK** | 1 s |
| 9 | `prueba_recorte.py` | **OK** | 0 s |
| 10 | `prueba_076.py` | **FALLA** (repetida aparte) | 344 s |
| 11 | `prueba_077.py` | **FALLA** (repetida aparte) | 63 s |
| 12 | `prueba_misiones_guardado.py` | **OK** | 17 s |
| 13 | `prueba_pasos.py` | **OK** | 2 s |
| 14 | `herramientas/foto_jugador.py` | **OK** | 0 s |
| 15 | `herramientas/sonda_guia.py 284 112` | **OK** | 0 s |
| 16 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 0 s |
| 17 | `prueba_079.py` | **FALLA** | 1 s |
| 18 | `prueba_futbol.py` | **FALLA** | 2 s |
| 19 | `prueba_baloncesto.py` | **OK** | 9 s |
| 20 | `prueba_084.py` | **OK** | 0 s |
| 21 | `prueba_0821.py` | **OK** | 0 s |
| 22 | `prueba_083.py` | **OK** | 1 s |
| 23 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 24 | `prueba_obispo.py` | **OK** | 4 s |
| 25 | `prueba_mapa_reventon_1439_gpu.py` | **FALLA** (repetida aparte) | 64 s |
| 26 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 27 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 28 | `audit_obstaculos.py` | **OK** | 0 s |
| 29 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 30 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `data/catastro_add2.json`, `data/catastro_add3.json`, `scripts/pruebas/pasos.txt`, `src/04_world.js`, `src/04b_recorte.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05u_trinidad.js`, `src/05w_optimiza.js`, `src/06_actors.js`, `src/06a_humans.js`, `src/11_hud.js`, `src/12e_save.js`, `src/12g_obispo.js`, `src/12k_agua.js`, `src/13_main.js`, `tests/prueba_trinidad.py`, `tools/catastro_vs_juego.py`, `tools/osm_gruesos.py`, `tools/simplificar_planta.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 49, 'peor': 137, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"fin de prueba"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":7.3,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3364}
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [261, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 5. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 491, 'con_lineas': 55200, 'lisas': 9227, 'pct_lisas': 14.3}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 21, 'cx': -209, 'cz': 450}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 6641
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 6. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 18, 'puerta': [-41, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 444, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 686}
callejero [['Calle Bencomo', True], ['Calle Juan de Vera', True], ['Calle Rodriguez Moure', True], ['Calle Ascanio y Nieves', True]]
avion {'despega': True, 'pasos': [[-1118, 0, True], [-1149, 0, True], [-1228, 0, True], [-1355, 0, True], [-1529, 0, True], [-1752, 0, True], [-2023, 26, True], [-2315, 70, True], [-2607, 114, True], [-2899, 157, True]]}
foto grandes_obispado
foto grandes_tranvia_trinchera
foto grandes_tranvia_cenital
foto grandes_tranvia_dentro
foto grandes_tranvia_alto
foto grandes_tf13_suelo
foto grandes_tf13_alto
foto grandes_guajara
foto grandes_aeropuerto_terminal
foto grandes_aeropuerto_naves
foto grandes_aeropuerto_depositos
foto grandes_callejero_bencomo
errores JS []
GRANDES OK
```

### 7. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": 257.14375416438077, "z": 1082.2225494592053, "len": 11.2, "ancho": 2.6, "y": -40.3}, {"name": "", "x": 251.25, "z": 1088.75, "len": 6.4, "ancho": 2.6, "y": -40.2}, {"name": "", "x": 245.98841062975754, "z": 1093.5813623173508, "len": 7.9, "ancho": 2.6, "y": -40}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 482.7315032545315, "z": 1258.3041636532116, "len": 17.1, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 497.5, "z": 1242.25, "len": 8.2, "ancho": 2.6, "y": -66.1}, {"name": "", "x": 504, "z": 1234.75, "len": 11.7, "ancho": 2.6, "y": -66.6}, {"name": "", "x": 285.0899156851144, "z": 1000.1094204327039, "len": 19.1, "ancho": 2.6, "y": -42.9}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"n
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.99, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.96, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -1.07), ([-184, -19], True, -3.92, True, -1.07), ([-188, -9], True, -3.92, True, -1.07), ([-217.5, 58.5], True, -3.81, False, 4.47)]
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

### 8. prueba_trinidad.py — OK

```
widths [6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -13.9}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -233, 'z': 451, 'yF': -13.2}]
nuevas 9
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32383']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32383']]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 9. prueba_recorte.py — OK

```
recortados 6641 de 18186 · siguen metidos ≥ 1 m: 30
   [-3538, -191, 3.4, '']
   [-1897, 1371, 2.9, '']
   [2084, 2705, 2.9, '']
   [545, 1179, 2.6, 'Edificio Beneharo']
   [-274, 1168, 2.6, '']
   [-107, 2791, 2.6, '']
   [1424, 3934, 2.2, '']
   [-1799, -757, 2.1, '']
   [-2476, 37, 1.9, '']
   [-3062, 14, 1.9, '']
   [1727, 3786, 1.8, 'Mercadona']
   [-642, 952, 1.8, '']
   [2320, 3175, 1.8, '']
   [-187, 709, 1.8, '']
   [-247, 1166, 1.8, '']
   [888, 2812, 1.6, '']
   [-845, 73, 1.4, '']
   [1871, 1315, 1.4, 'Residencial La Piterita I']
   [3190, 2057, 1.3, '']
   [348, 2088, 1.2, '']
   [-3411, -427, 1.2, '']
   [230, 3352, 1.2, '']
   [1202, 2581, 1.2, '']
   [1954, 3079, 1.2, '']
   [2139, 1728, 1.2, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 10. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')\n    at eval (eval at evaluate (:311:30), <anonymous>:1:126)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:162)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 63.80000000074506
{"frame":1384,"calls":923,"triangles":10868202,"points":0,"lines":0} calls:923
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -0.1, 12.9], 'charcos': [[757.9, 373]], 'apuntando': False, 'mano': [757.4, 1.36, 363.66]}, 'gotas': 53, 'charcos': 1, 'fuego_apagado': False, 'agua': [100, 78], 'hud': 'RIFLE DE AGUA 78%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': False, 'mision': True}
maleantes {'habla': False, 'linea': "Peatón: ¡Ven p'acá, que nos vamos a reír los dos!", 'visto': False}
misión del rifle en la historia 18
blanco 1 {'act': 'Vuelta al barrio', 'jug': False}
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
  File "<string>", line 52, in run
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
    at eval (eval at evaluate (:311:30), <anonymous>:1:126)
    at eval (eval at evaluate (:311:30), <anonymous>:1:162)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 11. prueba_077.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading 'inst')\n    at eval (eval at evaluate (:311:30), <anonymous>:3:17)\n    at eval (eval at evaluate (:311:30), <anonymous>:6:203)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 38.5
{"frame":1384,"calls":917,"triangles":10503981,"points":0,"lines":0} calls:917
juntado {'stats': {'sueltas': 6760, 'juntadas': 5945, 'mallas': 1679, 'ms': 394, 'no': {'grupo con nombre': 4608, 'pieza singular': 14, 'varios materiales': 19, 'userData': 450, 'onBeforeRender': 1}, 'ejemplos': {'pieza singular': [[0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[-147, -618, 'ShapeGeometry']]}, 'ultimoId': 25611}, 'fusion': 1679, 'celdas': 3907, 'lod': 10190, 'peatones_enteros': 2}
distancia {'cerca': [43, 43], 'lejos': [0, 9299], 'niebla': 520}
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

### 12. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":4,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Vuelta al barrio":[["Ayoze «El Chopa»","Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.",1795563358161]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795563454685]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795563454687]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795563454790],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795563454807],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795563454836],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795563454864],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795563454894],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795563454998],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795563455051],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795563462787]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"jugueterias":false,"sastronTut":true,"maleIntro":false,"obispoIntro":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"fin de prueba"}
cargada: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795563358161]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795563454685]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795563454687]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795563454790], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795563454807], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795563454836], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795563454864], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795563454894], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795563454998], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795563455051], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795563462787]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'jugueterias': False, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795563358161]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795563454685]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795563454687]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795563468202], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795563468223]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'jugueterias': False, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'obispoIntro': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 13. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 0, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 14. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",-377.87,10.11,-14.26,"lowerarm_l"],["CylinderGeometry",-377.85,10.12,-14.25,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",-0.04,0.88,-0.27,"lowerarm_l"],["CylinderGeometry",-0.04,0.89,-0.3,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",-0.07,0.91,-0.27,"lowerarm_l"],["CylinderGeometry",-0.06,0.92,-0.3,"lowerarm_l"]]
```

### 15. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 16. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 17. prueba_079.py — FALLA

```
rifle sin apuntar {'mano_dcha': 0.098, 'mano_izq': 0.019, 'angulo_antebrazo': 21}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.114, 'mano_izq': 0.071, 'angulo_antebrazo': 31}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE FALLA
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 180, 'paradas': 0, 'marcador': [2, 2]}
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
combos de la CPU buena {'combos_cpu': 15, 'marcador': [21, 31]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 FALLA
```

### 18. prueba_futbol.py — FALLA

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [0, 0], 'golden': True}
resultado {"won":false,"score":[0,1]}
PARTIDO CPU OK
partido fácil 1 [5, 2]
partido fácil 2 [8, 0]
partido fácil 3 [5, 1]
equilibrio primer partido [18, 3] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True}
RATÓN OK
campos {'campos': 73, 'puertas': 12, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa El torneo de la parroquia
partido en marcha False
estado obispo 2 futbolTut False
errores JS []
FUTBOL FALLA
```

### 19. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'play', 'sc': [6, 7], 'clock': 2.2166666666676536, 'golden': False}
resultado {"won":false,"score":[6,7]}
PARTIDO CPU OK
partido fácil 1 [15, 3]
partido fácil 2 [24, 3]
partido fácil 3 [23, 0]
equilibrio primer partido [62, 6] OK
jugadores dibujados 93
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"green":true,"shot":true},"mode":"air"}
foto basket_zoom
RATÓN OK
tras moverse 1
tras correr 2
tras pasar 3
tras recibir 4
tras tirar 5
tras combo 6
foto basket_tutorial
tutorial 99
TUTORIAL OK
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 20. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [9, 4], 'pases': 15, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL MÁS ALTO', 'EL BLANCO', 'COCO', 'EL LARGO'], 'marcas_distintas': True, 'movidos': [21.6, 11.8, 18.9, 16.8, 18.4, 15.9]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 21. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 2, 'ultima': 'Prueba de la máquina'}
MOVIL OK
lo que sabes {'sabes': True, 'sabidos': ['Maleantes en busca y captura', 'La máquina de El Blanco: BENCOMO', 'GUFO, AGUERE INVASION', 'GUANCHE GUARRIORS', 'Las jugueterías', 'Retos en las canchas'], 'detalle_quien': True, 'detalle_donde': True, 'detalle_charla': True}
(sin foto) v0821_diario_sabes
maleantes {'maleantes': True}
(sin foto) v0821_diario_maleantes
SABES OK
jugueterías en el mapa {'abierto': True, 'cercana': 'Juguetes Sabelotodo', 'metros': 180, 'mapa': True, 'texto': True, 'gps': True, 'cerrado': True}
foto v0822_mapa
MAPA OK
errores []
PRUEBA 0821 OK
```

### 22. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', -1, 87], ['sanagustin', -4, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
CASAS OK
inmobiliaria {'aviso': '<kbd>E</kbd> Entrar: Inmobiliaria Pisos Chachi (pisos en alquiler y en venta)', 'alquilado': True, 'dinero': 4750, 'hasta': 7, 'dia': 0}
ALQUILER OK
casa por dentro {'dentro': 'herradores', 'sin': '<kbd>E</kbd> La tele · sin consola (la GOFIO-8 se vende en las jugueterías)', 'con': '<kbd>E</kbd> Encender la consola GOFIO-8'}
foto v083_casa
foto v083_consola_menu
consola {'abre': True, 'm0': 'menu'} {'sel': 1, 'm1': 'attract', 'm2': 'menu'}
CONSOLA OK
cama {'aviso': '<kbd>E</kbd> Dormir hasta mañana y guardar la partida', 'hora': 8, 'salud': 100, 'dia': 1}
CAMA OK
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasHistoriaEl CanariónEl Obispo'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 23. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795563493686,"label":"test","player":{"x":288.5,"z":112.0007264247736,"h":-1.1071487177940904,"health":77,"money":1234},"car":{"type":"sedan","model":"mepierdo","color":3170496,"h":0,"x":286.5,"z":112.0007264247736},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":true,"water":10
after {"st":"play","m":{"v":4,"story":3,"skip":["El carterista del Cristo","Baches en la Vía de Ronda"],"storyDone":false,"side":1,"sideOpen":true,"obispo":2,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Don Celestino, párroco de La Concepción (por el móvil)","¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.",1795563473541]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1795563475346],["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1795563490449]],"El torneo de la parroquia":[["Monseñor Fermín Truchas","¡Hijo mío! El campanario ya no se inclina tanto. Ahora el tejado de la Catedral: llevamos tres tejas, faltan cuatrocientas. Y una paloma que vive arriba tiene más derechos que yo.",1795563480430],["Monseñor Fermín Truchas","Esta vez os toca contra los del Cristo, los de la camiseta granate, en la cancha de Paseo Oramas. Juegan sucio: empujan. Pero el Señor dijo «pon la otra mejilla», no «deja que te metan un mate».",1795563480447],["El Chopa","Tranquilo, Monseñor, que el turbo también es de Dios.",1795563480453]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"jugueterias":true,"sastronTut":true,"maleIntro":false,"obispoIntro":true,"defenders":true,"patrol":false,"basketTut":false,"futbolTut":false,"rifleTut":false,"arcade":{"scores":{"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]]},"bought":[],"console":false,"invited":false},"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 24. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-41.83308585205183, -235.69579041036377], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 46, 'pitches': 139}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.400000000000001}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-59.20969858972607,-423.0955670712878,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 25. prueba_mapa_reventon_1439_gpu.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
PRUEBA MAPA Y REVENTON 1.4.39 FALLA
Traceback (prueba): AssertionError({'barrierScan': False, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': False, 'clearedRoad': [True, True, True, True, True, True, False, False, False], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': False, 'floor': True, 'drivable': True, 'rimLod': False, 'reventon': True, 'brakes': True, 'pedsMotorway': True})
--- repetida aparte:
shot ms 25.799999998882413
{"frame":1386,"calls":918,"triangles":11340559,"points":0,"lines":0} calls:918
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

### 26. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 27. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 28. audit_obstaculos.py — OK

```
obstacles 80
[(('footway', 'unclassified'), 16), (('footway', 'service'), 9), (('footway', 'motorway_link'), 7), (('footway', 'motorway'), 7), (('primary', 'motorway_link'), 7), (('unclassified', 'motorway'), 6), (('service', 'service'), 4), (('motorway_link', 'motorway_link'), 3), (('motorway_link', 'tertiary'), 3), (('tertiary', 'motorway_link'), 2), (('primary', 'unclassified'), 2), (('motorway', 'residential'), 2), (('tertiary', 'motorway'), 1), (('primary', 'residential'), 1), (('primary', 'motorway'), 1), (('motorway', 'primary'), 1), (('motorway', 'secondary_link'), 1), (('primary', 'secondary'), 1), (('path', 'motorway'), 1), (('motorway_link', 'secondary_link'), 1)]
barreras en calzada 1 Counter({'barandilla de rampa': 1})
```

### 29. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 30. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, obispado.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_rifle.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v0822_mapa.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg
