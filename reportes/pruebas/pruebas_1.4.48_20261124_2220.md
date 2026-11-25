# Pruebas 1.4.48 — 2026-11-24 22:20 — 23/30 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 642 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 70 s |
| 5 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 6 | `prueba_grandes.py` | **OK** | 2 s |
| 7 | `prueba_pendientes_faciles.py` | **FALLA** | 0 s |
| 8 | `prueba_078.py` | **OK** | 2 s |
| 9 | `prueba_trinidad.py` | **FALLA** | 1 s |
| 10 | `prueba_recorte.py` | **OK** | 0 s |
| 11 | `prueba_076.py` | **FALLA** (repetida aparte) | 333 s |
| 12 | `prueba_077.py` | **FALLA** (repetida aparte) | 63 s |
| 13 | `prueba_misiones_guardado.py` | **OK** | 17 s |
| 14 | `prueba_pasos.py` | **OK** | 2 s |
| 15 | `herramientas/foto_jugador.py` | **OK** | 0 s |
| 16 | `herramientas/sonda_guia.py 284 112` | **OK** | 0 s |
| 17 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 0 s |
| 18 | `prueba_079.py` | **FALLA** | 1 s |
| 19 | `prueba_futbol.py` | **FALLA** | 2 s |
| 20 | `prueba_baloncesto.py` | **OK** | 9 s |
| 21 | `prueba_084.py` | **OK** | 0 s |
| 22 | `prueba_0821.py` | **OK** | 0 s |
| 23 | `prueba_083.py` | **OK** | 1 s |
| 24 | `prueba_obispo.py` | **OK** | 4 s |
| 25 | `prueba_mapa_reventon_1439_gpu.py` | **FALLA** (repetida aparte) | 63 s |
| 26 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 27 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 28 | `audit_obstaculos.py` | **OK** | 0 s |
| 29 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 30 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `build.py`, `data/catastro_add2.json`, `data/catastro_add3.json`, `data/osm_gruesos.json`, `scripts/pruebas/edif.txt`, `scripts/pruebas/mandan2.txt`, `scripts/pruebas/pasos.txt`, `scripts/pruebas/plantas.txt`, `scripts/pruebas/quit.txt`, `scripts/pruebas/tripts.txt`, `src/01_core.js`, `src/04_world.js`, `src/04b_recorte.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05u_trinidad.js`, `src/05w_optimiza.js`, `src/05y_muros.js`, `src/06_actors.js`, `src/06a_humans.js`, `src/11_hud.js`, `src/12e_save.js`, `src/12g_obispo.js`, `src/12k_agua.js`, `src/13_main.js`, `tests/herramientas/sonda_calles_mandan.py`, `tests/herramientas/sonda_edificio_en.py`, `tests/herramientas/sonda_plantas_finales.py`, `tests/herramientas/sonda_quitados.py`, `tests/herramientas/sonda_recorte_pasos.py`, `tests/herramientas/sonda_trinidad_puntos.py`, `tests/herramientas/sonda_trinidad_rampas.py`, `tools/catastro_vs_juego.py`, `tools/osm_gruesos.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 196, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795558224297,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":7.3,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3361}
```

### 4. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 5. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [261, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 6. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 18, 'puerta': [-41, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 477, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 696}
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

### 7. prueba_pendientes_faciles.py — FALLA

```
lineas {'vias': 491, 'con_lineas': 55200, 'lisas': 9227, 'pct_lisas': 14.3}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 15, 'cx': -204, 'cz': 440}
edificios [[73, 234, 2.77], [-909, -408, 0]]
recortados 5859
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES FALLA
```

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": 257.14375416438077, "z": 1082.2225494592053, "len": 11.2, "ancho": 2.6, "y": -40.3}, {"name": "", "x": 251.25, "z": 1088.75, "len": 6.4, "ancho": 2.6, "y": -40.2}, {"name": "", "x": 245.98841062975754, "z": 1093.5813623173508, "len": 7.9, "ancho": 2.6, "y": -40}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 482.7315032545315, "z": 1258.3041636532116, "len": 17.1, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 497.5, "z": 1242.25, "len": 8.2, "ancho": 2.6, "y": -66.1}, {"name": "", "x": 504, "z": 1234.75, "len": 11.7, "ancho": 2.6, "y": -66.6}, {"name": "", "x": 285.0899156851144, "z": 1000.1094204327039, "len": 19.1, "ancho": 2.6, "y": -42.9}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"n
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.97, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.93, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
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

### 9. prueba_trinidad.py — FALLA

```
widths [6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -13.9}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -233, 'z': 451, 'yF': -13.2}]
nuevas 9
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32336']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32336']]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD FALLA
```

### 10. prueba_recorte.py — OK

```
recortados 5859 de 18186 · siguen metidos ≥ 1 m: 88
   [1406, 2902, 5, '']
   [85, 220, 4.9, '']
   [83, 213, 4.9, '']
   [288, 865, 3.6, '']
   [288, 865, 3.6, '']
   [-3538, -191, 3.4, '']
   [-1897, 1371, 2.9, '']
   [2084, 2705, 2.9, '']
   [-3609, -405, 2.7, '']
   [545, 1179, 2.6, 'Edificio Beneharo']
   [-274, 1166, 2.6, '']
   [-108, 2791, 2.6, '']
   [1202, 2583, 2.6, '']
   [1424, 3934, 2.2, '']
   [1517, 4405, 2.2, '']
   [-1799, -757, 2.1, '']
   [1483, 3668, 2.1, '']
   [-8, -194, 2.1, '']
   [1733, 3781, 2, 'Mercadona']
   [795, 3017, 2, 'IKEA']
   [-187, 709, 2, '']
   [-3035, -54, 2, '']
   [872, 2850, 2, '']
   [1501, 3802, 2, '']
   [2258, 3485, 2, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 11. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 59.0
{"frame":1384,"calls":914,"triangles":11456988,"points":0,"lines":0} calls:914
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, 0.2, 13.2], 'charcos': [[757.9, 373.1]], 'apuntando': False, 'mano': [757.35, 1.35, 363.67]}, 'gotas': 53, 'charcos': 1, 'fuego_apagado': False, 'agua': [100, 78], 'hud': 'RIFLE DE AGUA 78%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado None
maleantes {'habla': False, 'linea': '', 'visto': False}
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

### 12. prueba_077.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading 'inst')\n    at eval (eval at evaluate (:311:30), <anonymous>:3:17)\n    at eval (eval at evaluate (:311:30), <anonymous>:6:203)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 26.800000000745058
{"frame":1386,"calls":916,"triangles":10778669,"points":0,"lines":0} calls:916
juntado {'stats': {'sueltas': 6828, 'juntadas': 6009, 'mallas': 1699, 'ms': 260, 'no': {'grupo con nombre': 4600, 'pieza singular': 14, 'varios materiales': 19, 'userData': 450, 'onBeforeRender': 1}, 'ejemplos': {'pieza singular': [[0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[-147, -618, 'ShapeGeometry']]}, 'ultimoId': 25588}, 'fusion': 1699, 'celdas': 3874, 'lod': 10169, 'peatones_enteros': 2}
distancia {'cerca': [43, 43], 'lejos': [0, 9263], 'niebla': 520}
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

### 13. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":4,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795558307193],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1795558307213],["El Chopa","¿Y si me gana él?",1795558307219],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1795558307225]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795558307261],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1795558307304],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1795558307310],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1795558307316],["Rayco «El Blanco»","«Psss... siesta.»",1795558307322],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1795558307421],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1795558307499]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1795558314136],["El Chopa","Eso no puede ser legal.",1795558314167],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1795558314174]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1795558314244],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1795558314278]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1795558314392],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1795558314424],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1795558314431]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1795558314571],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1795558314602],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1795558314608]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1795558318251],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1795558318280],["El Chopa","Monseñor, ¿esto es legal?",1795558318287],["Monseñor Fermín Truchas","Hijo, es fútbol.",1795558318294]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1795558318365],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1795558318394]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795558320563],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795558320576],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795558320597],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795558320619],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795558320644],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795558320730],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795558320770],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795558328492]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":1,"lastTod":12.035999999999948},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":true,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":true,"maleIntro":true,"rifleTut":false,"obispoIntro":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"El maleante se ha escapado"}
cargada: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795558307193], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1795558307213], ['El Chopa', '¿Y si me gana él?', 1795558307219], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1795558307225]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795558307261], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1795558307304], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1795558307310], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1795558307316], ['Rayco «El Blanco»', '«Psss... siesta.»', 1795558307322], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1795558307421], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1795558307499]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1795558314136], ['El Chopa', 'Eso no puede ser legal.', 1795558314167], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1795558314174]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1795558314244], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1795558314278]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1795558314392], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1795558314424], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1795558314431]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1795558314571], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1795558314602], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1795558314608]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1795558318251], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1795558318280], ['El Chopa', 'Monseñor, ¿esto es legal?', 1795558318287], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1795558318294]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1795558318365], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1795558318394]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795558320563], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795558320576], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795558320597], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795558320619], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795558320644], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795558320730], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795558320770], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795558328492]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.037111111111058}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': True, 'maleIntro': True, 'rifleTut': False, 'obispoIntro': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795558307193], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1795558307213], ['El Chopa', '¿Y si me gana él?', 1795558307219], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1795558307225]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795558307261], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1795558307304], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1795558307310], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1795558307316], ['Rayco «El Blanco»', '«Psss... siesta.»', 1795558307322], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1795558307421], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1795558307499]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1795558314136], ['El Chopa', 'Eso no puede ser legal.', 1795558314167], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1795558314174]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1795558314244], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1795558314278]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1795558314392], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1795558314424], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1795558314431]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1795558314571], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1795558314602], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1795558314608]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1795558318251], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1795558318280], ['El Chopa', 'Monseñor, ¿esto es legal?', 1795558318287], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1795558318294]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1795558318365], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1795558318394]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795558333863], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795558333880]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.041555555555496}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': True, 'maleIntro': True, 'rifleTut': False, 'obispoIntro': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False, 'obispoIntro': True, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 14. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 0, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 15. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",-378.42,10.11,-14.23,"lowerarm_l"],["CylinderGeometry",-378.44,10.12,-14.21,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",-0.04,0.88,-0.28,"lowerarm_l"],["CylinderGeometry",-0.04,0.89,-0.3,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",-0.07,0.91,-0.28,"lowerarm_l"],["CylinderGeometry",-0.06,0.92,-0.3,"lowerarm_l"]]
```

### 16. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 17. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 18. prueba_079.py — FALLA

```
rifle sin apuntar {'mano_dcha': 0.102, 'mano_izq': 0.015, 'angulo_antebrazo': 20}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.114, 'mano_izq': 0.068, 'angulo_antebrazo': 32}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE FALLA
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 0, 'marcador': [1, 3]}
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
combos de la CPU buena {'combos_cpu': 17, 'marcador': [31, 33]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 FALLA
```

### 19. prueba_futbol.py — FALLA

```
foto futbol_partido
cpu {'ph': 'goal', 'sc': [2, 1], 'golden': False}
resultado {"won":true,"score":[2,1]}
PARTIDO CPU OK
partido fácil 1 [6, 0]
partido fácil 2 [8, 0]
partido fácil 3 [9, 0]
equilibrio primer partido [23, 0] OK
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

### 20. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'inbound', 'sc': [10, 2], 'clock': 0.9166666666676576, 'golden': False}
resultado {"won":true,"score":[10,2]}
PARTIDO CPU OK
partido fácil 1 [19, 0]
partido fácil 2 [23, 0]
partido fácil 3 [19, 0]
equilibrio primer partido [61, 0] OK
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

### 21. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [10, 0], 'pases': 13, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL MÁS ALTO', 'COCO', 'EL LARGO', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [21.7, 14.3, 18.5, 11.3, 16.3, 17.8]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 22. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 1, 'ultima': 'Prueba de la máquina'}
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

### 23. prueba_083.py — OK

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

### 24. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-41.83308585205183, -235.69579041036377], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 49, 'pitches': 139}
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
shot ms 3.5
{"frame":1384,"calls":918,"triangles":10522440,"points":0,"lines":0} calls:918
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

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, obispado.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v0822_mapa.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg
