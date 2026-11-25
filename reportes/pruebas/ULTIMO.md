# Pruebas 1.4.52 — 2026-11-25 17:36 — 18/19 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 548 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_bordes.py` | **OK** | 0 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 409 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 2 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 1 s |
| 6 | `prueba_grandes.py` | **OK** | 2 s |
| 7 | `prueba_078.py` | **OK** | 2 s |
| 8 | `prueba_trinidad.py` | **OK** | 1 s |
| 9 | `prueba_recorte.py` | **OK** | 0 s |
| 10 | `prueba_coche_y_boca.py` | **OK** | 0 s |
| 11 | `prueba_freno_mano.py` | **OK** | 0 s |
| 12 | `prueba_peralte.py` | **OK** | 0 s |
| 13 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 14 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 15 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 16 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 17 | `audit_obstaculos.py` | **OK** | 0 s |
| 18 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 19 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `data/carriles.json`, `scripts/publicar.log`, `src/04_world.js`, `src/04b_recorte.js`, `src/05_scenery.js`, `src/05p_casas.js`, `src/05q_inicio.js`, `src/05x_pasajes.js`, `src/05y_muros.js`, `src/07_vehicles.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 43, 'peor': 119, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":7.3,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3365}
```

### 3. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 11.5
{"frame":1384,"calls":977,"triangles":10851291,"points":0,"lines":0} calls:977
roads 133
FAIL {'off': 6.7, 'dy': 6.6, 'col': True, 'low': False, 'ri': 307, 't': 9, 'name': '', 'L': 50, 'done': False, 'left': 44, 'time': 5.7, 'x': -1224, 'z': -7, 'y': 18}
snap df_307
failed 1 of 133 · conocidos 0
CONDUCCION FALLA
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.08, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.08, 'profundidad': 5.6, 'en_sala': True, 'fin': [178, -610]}
```

### 5. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 699, 'con_lineas': 66918, 'lisas': 16811, 'pct_lisas': 20.1}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 21, 'cx': -209, 'cz': 450}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 6374
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
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 1136, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 1, 'valla_tramos': 651}
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
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 257.14375416438077, "z": 1082.2225494592053, "len": 11.2, "ancho": 2.6, "y": -40.3}, {"name": "", "x": 251.25, "z": 1088.75, "len": 6.4, "ancho": 2.6, "y": -40.2}, {"name": "", "x": 245.98841062975754, "z": 1093.5813623173508, "len": 7.9, "ancho": 2.6, "y": -40}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 268.5, "z": 1005, "len": 27.5, "ancho": 2.6, "y": -42.3}, {"name": "", "x": 322.75, "z": 997.75, "len": 4.3, "ancho": 2.6, "y": -44.4}, {"name": "", "x": 319, "z": 1000.75, "len": 5.3, "ancho": 2.6, "y": -44.2}, {"name": "", "x": 312, "z": 1006.75, "len": 13.1, "ancho": 2.6, "y": -43.7}, {"name": "", "x": 306, "z": 1012.25, "len": 3.2, "ancho": 2.6, "y": -43.3}, {"name": "", "x": 303.25, "z": 1016, "len": 6.1, "ancho": 2.6, "y": -43.1}, {"name": "", "x": 299.75, "z": 1021, "len": 6.1, "ancho": 2.6, "y": -42.8}, {"name": "", "x": 294.8380421967213, "z": 1028.76992967213
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.91, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.87, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.2472575959587955)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.09, True, 7.81), ([-174.6, -27.2], True, -0.27, True, 7.52), ([-175, -26.7], True, -0.87, True, 7.08), ([-175.5, -26.3], True, -1.05, True, 6.82), ([-176, -25.9], True, -1.51, True, 6.26), ([-176.6, -25.6], True, -1.84, True, 6.12), ([-177.1, -25.4], True, -2.3, True, 5.53), ([-177.8, -25.2], True, -2.55, True, 5.23), ([-178.4, -25.1], True, -3.09, True, 4.87), ([-178.7, -25.1], True, -3.24, True, 4.62), ([-180.9, -25.8], True, -3.67, True, -0.82), ([-184, -19], True, -3.67, True, -0.82), ([-188, -9], True, -3.67, True, -0.82), ([-215.2, 53.3], True, -3.55, False, -0.57)]
patio {'x': -179, 'z': -30, 'r': 6.3, 'yU': 1.33, 'yL': -3.77, 'escaleras': 2, 'peldanos': 28, 'galeria_baja': 86.2, 'salida': [-215, 53]} bajada maxima entre puntos 0.7 llega abajo True
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
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:33395']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:33395']]}
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
recortados 6374 de 18053 · siguen metidos ≥ 1 m: 37
   [734, 1182, 4.3, '']
   [-3538, -191, 3.4, '']
   [-1897, 1371, 2.9, '']
   [545, 1179, 2.6, 'Edificio Beneharo']
   [-274, 1168, 2.6, '']
   [-107, 2791, 2.6, '']
   [2320, 3175, 2.4, '']
   [-2476, 37, 2.4, '']
   [1727, 3786, 2.3, 'Mercadona']
   [-642, 952, 2.3, '']
   [-187, 709, 2.3, '']
   [1424, 3934, 2.2, '']
   [-1799, -757, 2.1, '']
   [-237, 1739, 2, '']
   [-3062, 14, 1.9, '']
   [-868, 252, 1.8, '']
   [-247, 1166, 1.8, '']
   [1202, 2581, 1.7, '']
   [-1013, 5, 1.6, '']
   [894, 2805, 1.6, '']
   [370, -67, 1.5, '']
   [-802, 325, 1.5, '']
   [-845, 73, 1.4, '']
   [1871, 1315, 1.4, 'Residencial La Piterita I']
   [3190, 2057, 1.3, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 10. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":null,"punta":"1","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X 1917 · Y 140 · 483 m"}
```

### 11. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 87, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 273, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 56, 'kmh_1s': 37, 'giro_1s_grados': 145, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 184, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 30, 'kmh_1s': 44, 'giro_1s_grados': 113, 'derrape_final': 0, 'kmh_3s': 58, 'giro_3s_grados': 178, 'derrape_max_grados': 30}
OK
```

### 12. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
{'pendLat': '51%', 'ruedas_altura_eje_sobre_suelo': [-5.1, -5.09, -5.09, -5.08], 'dif': 0.02}
```

### 13. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 14. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 15. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 16. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 17. audit_obstaculos.py — OK

```
obstacles 148
[(('secondary', 'secondary_link'), 20), (('footway', 'unclassified'), 16), (('secondary', 'secondary'), 10), (('tertiary', 'tertiary'), 10), (('footway', 'service'), 9), (('footway', 'motorway'), 9), (('unclassified', 'motorway'), 7), (('primary', 'motorway_link'), 7), (('motorway_link', 'tertiary'), 5), (('service', 'service'), 5), (('motorway_link', 'motorway'), 5), (('tertiary', 'motorway'), 4), (('motorway', 'motorway_link'), 4), (('path', 'tertiary'), 4), (('motorway_link', 'motorway_link'), 3), (('tertiary', 'motorway_link'), 3), (('motorway', 'secondary_link'), 3), (('footway', 'tertiary'), 3), (('unclassified', 'unclassified'), 2), (('primary', 'secondary'), 2)]
barreras en calzada 0 Counter()
```

### 18. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 19. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, conduccion.json, df_307.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
