# Pruebas 1.4.50 — 2026-11-25 14:06 — 14/15 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 829 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_grandes.py` | **OK** | 3 s |
| 4 | `prueba_bordes.py` | **OK** | 0 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 639 s |
| 6 | `prueba_parking_cristo.py` | **OK** | 3 s |
| 7 | `prueba_pendientes_faciles.py` | **OK** | 1 s |
| 8 | `prueba_078.py` | **OK** | 5 s |
| 9 | `prueba_trinidad.py` | **OK** | 3 s |
| 10 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 11 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 12 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 13 | `audit_obstaculos.py` | **OK** | 1 s |
| 14 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 15 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `src/01_core.js`, `src/04_world.js`, `src/05_scenery.js`, `src/05p_casas.js`, `src/05q_inicio.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 44, 'peor': 147, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795614793676,"label":"test","player":{"x":-182.65839693129425,"z":784.3360607103941,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":3.0123732081837398,"x":-184.65839693129425,"z":784.3360607103941},"weapon":{"has":true,"ammo":4,"out":true},"rifle"
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 18, 'puerta': [-41, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 416, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
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

### 4. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":7.3,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3365}
```

### 5. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 425.59999999403954
{"frame":1380,"calls":895,"triangles":18968367,"points":0,"lines":0} calls:895
roads 133
FAIL {'off': 6.7, 'dy': 6.6, 'col': True, 'low': False, 'ri': 309, 't': 9, 'name': '', 'L': 50, 'done': False, 'left': 45, 'time': 5.6, 'x': -1224, 'z': -7, 'y': 17.9}
snap df_309
FAIL {'off': 0.3, 'dy': 0.2, 'col': False, 'low': False, 'ri': 4783, 't': 0, 'name': 'Autopista del Norte', 'L': 1542, 'done': False, 'left': 35, 'time': 122, 'x': -4750, 'z': -418, 'y': 67.3}
snap df_4783
failed 2 of 133 · conocidos 0
CONDUCCION FALLA
```

### 6. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.08, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.08, 'profundidad': 5.6, 'en_sala': True, 'fin': [178, -610]}
```

### 7. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 633, 'con_lineas': 63653, 'lisas': 15694, 'pct_lisas': 19.8}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 21, 'cx': -209, 'cz': 450}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 6577
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 305.7090888725178, "z": 1012.6136389093529, "len": 2.3, "ancho": 2.6, "y": -43.3}, {"name": "", "x": 303.25, "z": 1016, "len": 6.1, "ancho": 2.6, "y": -43.1}, {"name": "", "x": 299.75, "z": 1021, "len": 6.1, "ancho": 2.6, "y": -42.8}, {"name": "", "x": 294.70950955338947, "z": 1028.984150744351, "len": 12.8, "ancho": 2.6, "y": -42.4}, {"name": "", "x": 402.84236858506625, "z": 1009.0471226539382, "len": 4.5, "ancho": 2.6, "y": -50.7}, {"name": "", "x": 406.5, "z": 1005.75, "len": 5.3, "ancho": 2.6, "y": -51}, {"name": "", "x": 411, "z": 1002, "len": 6.4, "ancho": 2.6, "y": -51.3}, {"name": "", "x": 277.37007962384274, "z": 628.7598407523145, "len": 10.6, "ancho": 2.6, "y": -30.4}, {"name": "", "x": -294.06319500879675, "z": 277.9613013772314, "len": 9.4, "ancho": 2.6, "
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.91, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.87, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
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

### 9. prueba_trinidad.py — OK

```
widths [6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -13.9}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -233, 'z': 451, 'yF': -13.2}]
nuevas 9
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:33131']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:33131']]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 10. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 11. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 12. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 13. audit_obstaculos.py — OK

```
obstacles 144
[(('secondary', 'secondary_link'), 20), (('footway', 'unclassified'), 16), (('tertiary', 'tertiary'), 12), (('secondary', 'secondary'), 9), (('footway', 'service'), 9), (('footway', 'motorway'), 9), (('unclassified', 'motorway'), 7), (('primary', 'motorway_link'), 7), (('service', 'service'), 5), (('motorway_link', 'motorway'), 5), (('tertiary', 'motorway'), 4), (('motorway', 'motorway_link'), 4), (('path', 'tertiary'), 4), (('motorway_link', 'motorway_link'), 3), (('motorway_link', 'tertiary'), 3), (('tertiary', 'motorway_link'), 3), (('motorway', 'secondary_link'), 3), (('footway', 'tertiary'), 3), (('unclassified', 'unclassified'), 2), (('motorway', 'residential'), 2)]
barreras en calzada 0 Counter()
```

### 14. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 15. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, conduccion.json, df_309.jpg, df_4625.jpg, df_4783.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
