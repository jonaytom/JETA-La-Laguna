# Pruebas 1.4.48 — 2026-11-25 00:54 — 31/33 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 895 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_bordes.py` | **OK** | 0 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 71 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 1 s |
| 6 | `prueba_grandes.py` | **OK** | 2 s |
| 7 | `prueba_078.py` | **OK** | 2 s |
| 8 | `prueba_trinidad.py` | **OK** | 1 s |
| 9 | `prueba_076.py` | **FALLA** (repetida aparte) | 329 s |
| 10 | `prueba_077.py` | **OK** | 1 s |
| 11 | `prueba_misiones_guardado.py` | **OK** | 17 s |
| 12 | `prueba_pasos.py` | **OK** | 2 s |
| 13 | `herramientas/foto_jugador.py` | **OK** | 0 s |
| 14 | `prueba_079.py` | **OK** | 1 s |
| 15 | `prueba_futbol.py` | **OK** | 6 s |
| 16 | `prueba_baloncesto.py` | **OK** | 9 s |
| 17 | `prueba_084.py` | **OK** | 0 s |
| 18 | `prueba_082.py` | **OK** | 0 s |
| 19 | `prueba_083.py` | **OK** | 1 s |
| 20 | `prueba_085.py` | **OK** | 1 s |
| 21 | `herramientas/sonda_guia.py 284 112` | **OK** | 0 s |
| 22 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 0 s |
| 23 | `prueba_0821.py` | **OK** | 0 s |
| 24 | `prueba_persecuciones.py` | **FALLA** (repetida aparte) | 380 s |
| 25 | `prueba_diario.py` | **OK** | 0 s |
| 26 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 27 | `prueba_obispo.py` | **OK** | 4 s |
| 28 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 29 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 30 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 31 | `audit_obstaculos.py` | **OK** | 0 s |
| 32 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 33 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/pruebas/barr.txt`, `scripts/pruebas/edif.txt`, `scripts/pruebas/viejas.txt`, `src/04_world.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05q_inicio.js`, `src/05u_trinidad.js`, `src/05w_optimiza.js`, `src/06_actors.js`, `src/06a_humans.js`, `src/09i_agua.js`, `src/11_hud.js`, `src/12_missions.js`, `src/12e_save.js`, `src/12g_obispo.js`, `src/12k_agua.js`, `tests/herramientas/sonda_barreras.py`, `tests/herramientas/sonda_choques_en.py`, `tests/prueba_077.py`, `tests/prueba_079.py`, `tests/prueba_futbol.py`, `tests/prueba_mapa_reventon_1439_gpu.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 109, 'estado': 'play'}
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
lineas {'vias': 594, 'con_lineas': 57669, 'lisas': 14848, 'pct_lisas': 20.5}
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
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.99, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.95, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
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
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32442']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32442']]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 9. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')\n    at eval (eval at evaluate (:311:30), <anonymous>:1:126)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:162)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 37.400000002235174
{"frame":1384,"calls":904,"triangles":11046731,"points":0,"lines":0} calls:904
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -2.4, 12.6], 'charcos': [[0.5, 7.1]], 'apuntando': False, 'mano': [-0.06, 8.15, 0.21]}, 'gotas': 43, 'charcos': 2, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 93%\nTAB / 1: puños'}
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

### 10. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 6747, 'juntadas': 5931, 'mallas': 1675, 'ms': 156, 'no': {'grupo con nombre': 4646, 'pieza singular': 14, 'varios materiales': 19, 'userData': 449, 'onBeforeRender': 1}, 'ejemplos': {'pieza singular': [[0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[-147, -618, 'ShapeGeometry']]}, 'ultimoId': 25576}, 'fusion': 1675, 'celdas': 3876, 'lod': 10190, 'peatones_enteros': 6}
distancia {'cerca': [40, 40], 'lejos': [0, 6836], 'niebla': 1425}
aparcados {'grupos': 0, 'coches': 6439, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 18631 ms; plazas [120] aparcados [1104]
junta piezas 5922
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 5922
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

### 11. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":4,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Vuelta al barrio":[["Ayoze «El Chopa»","Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.",1795567219856]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795567301578]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795567301579]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795567302894],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795567302909],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795567302930],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795567302953],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795567302980],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795567303049],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795567303102],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795567310783]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"jugueterias":false,"sastronTut":true,"maleIntro":false,"obispoIntro":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"fin de prueba"}
cargada: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795567219856]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795567301578]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795567301579]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795567302894], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795567302909], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795567302930], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795567302953], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795567302980], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795567303049], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795567303102], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795567310783]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'jugueterias': False, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795567219856]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795567301578]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795567301579]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795567316161], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795567316184]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'jugueterias': False, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'obispoIntro': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 12. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 0, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 13. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",0.1,0.97,-0.31,"lowerarm_l"],["CylinderGeometry",0.1,0.98,-0.34,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",-0.04,0.88,-0.26,"lowerarm_l"],["CylinderGeometry",-0.04,0.89,-0.29,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",-0.06,0.91,-0.27,"lowerarm_l"],["CylinderGeometry",-0.06,0.92,-0.29,"lowerarm_l"]]
```

### 14. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.108, 'mano_izq': 0.041, 'angulo_antebrazo': 39}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.112, 'mano_izq': 0.099, 'angulo_antebrazo': 30}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 130, 'paradas': 0, 'marcador': [2, 1]}
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
combos de la CPU buena {'combos_cpu': 17, 'marcador': [29, 30]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 15. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [1, 2], 'golden': False}
resultado {"won":false,"score":[1,2]}
PARTIDO CPU OK
partido fácil 1 [2, 0]
partido fácil 2 [9, 0]
partido fácil 3 [10, 0]
equilibrio primer partido [21, 0] OK
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
activa Un partido por La Concepción
partido en marcha True
estado obispo 2 futbolTut True
errores JS []
FUTBOL OK
```

### 16. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [5, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[5,0]}
PARTIDO CPU OK
partido fácil 1 [14, 0]
partido fácil 2 [17, 2]
partido fácil 3 [14, 2]
equilibrio primer partido [45, 4] OK
jugadores dibujados 90
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

### 17. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [12, 4], 'pases': 14, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL MÁS ALTO', 'COCO', 'EL LARGO'], 'marcas_distintas': True, 'movidos': [19.5, 17.9, 13.3, 15.8, 17.8, 12]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 18. prueba_082.py — OK

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
lagarto {'monta': True, 'cola': 'bite', 'mordisco': True, 'salto': 'whip', 'avanza': 40}
golpes nuevos {'patada': 'dash', 'alto_patada': 16, 'flip': {'estado': 'flip', 'alto': 24, 'detras': True, 'tumbado': True, 'dano': 4}}
foto v082_lagarto
CONTROLES OK
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
foto v082_fase6
foto v082_fase7
recorrido [{'estado': {'p': [259, 25, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mirla', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 121, 'puntos': 10620}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 88, 'puntos': 11610}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 130, 'puntos': 14620}, {'estado': {'p': [163, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 129, 'puntos': 13650}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 122, 'puntos': 15920}, {'estado': {'p': [187, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 109, 'puntos': 15650}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 177, 'puntos': 33510}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 19. prueba_083.py — OK

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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasHistoriaEl CanariónEl ObispoCopa Laguna'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 20. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': 'f2f2f2'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'ITALIA'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 21. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 22. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 23. prueba_0821.py — OK

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

### 24. prueba_persecuciones.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 63.69999999925494
{"frame":1384,"calls":904,"triangles":10582806,"points":0,"lines":0} calls:904
[6] Atraco en la farmacia: SIN FLECHA
[8] Los bancos del Adelantado: SIN FLECHA
[10] El carterista del Cristo: SIN FLECHA
[12] El rally de La Esperanza: SIN FLECHA
[14] Escolta a la guagua del Romero: SIN FLECHA
[15] La guagua de la broma: SIN FLECHA
[16] Grafiteros en el tranvía: SIN FLECHA
[17] Noche en el aeropuerto: SIN FLECHA
PERSECUCIONES FALLA
```

### 25. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 16
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Café Brasilito | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | C
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 26. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795567374303,"label":"test","player":{"x":473,"z":273.4419590328285,"h":0,"health":77,"money":1234},"car":{"type":"sedan","model":"pantera","color":13643824,"h":0,"x":471,"z":273.4419590328285},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":true,"water":100,"out":false},"tod":1
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":2,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1795567323269],["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1795567345440]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1795567327371],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1795567327386],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1795567327390],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1795567327394],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1795567329132]],"La inmobiliaria":[["Pisos Chachi (por el móvil)","¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?",1795567369247]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"jugueterias":true,"sastronTut":true,"maleIntro":false,"obispoIntro":true,"defenders":true,"patrol":false,"basketTut":false,"futbolTut":true,"rifleTut":false,"arcade":{"scores":{"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 27. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-41.83308585205183, -235.69579041036377], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 30, 'pitches': 139}
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

### 28. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 29. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 30. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 31. audit_obstaculos.py — OK

```
obstacles 121
[(('footway', 'unclassified'), 15), (('secondary', 'secondary_link'), 11), (('tertiary', 'tertiary'), 10), (('footway', 'service'), 9), (('footway', 'motorway'), 8), (('unclassified', 'motorway'), 7), (('footway', 'motorway_link'), 7), (('primary', 'motorway_link'), 7), (('service', 'service'), 5), (('motorway_link', 'motorway'), 5), (('motorway_link', 'tertiary'), 4), (('secondary', 'secondary'), 4), (('motorway_link', 'motorway_link'), 3), (('tertiary', 'motorway_link'), 3), (('tertiary', 'motorway'), 3), (('motorway', 'secondary_link'), 3), (('primary', 'unclassified'), 2), (('motorway', 'residential'), 2), (('motorway_link', 'secondary_link'), 2), (('primary', 'residential'), 1)]
barreras en calzada 0 Counter()
```

### 32. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 33. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, obispado.jpg, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_rifle.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v0822_mapa.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg
