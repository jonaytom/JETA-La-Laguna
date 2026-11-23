# Pruebas 1.4.42 — 2026-11-23 10:17 — 17/17 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 122 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 69 s |
| 5 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 6 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 7 | `prueba_freno_mano.py` | **OK** | 0 s |
| 8 | `prueba_peralte.py` | **OK** | 0 s |
| 9 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 10 | `prueba_grandes.py` | **OK** | 3 s |
| 11 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 12 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 13 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 14 | `prueba_trinidad.py` | **OK** | 1 s |
| 15 | `audit_obstaculos.py` | **OK** | 0 s |
| 16 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 17 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `build.py`, `data/three.module.min.js`, `data/three_r160.module.min.js`, `data/three_r187.module.min.js`, `data/three_r187/three.core.min.js`, `data/three_r187/three.module.min.js`, `scripts/pruebas/three187.txt`, `scripts/publicar.log`, `src/07_vehicles.js`, `tests/herramientas/bajar_three.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 35, 'peor': 108, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795428965105,"label":"test","player":{"x":-191.8591345618258,"z":806.259916219301,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-193.8591345618258,"z":806.259916219301},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
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

### 6. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":null,"punta":"0","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X 119 · Y -642 · 547 m"}
```

### 7. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 70, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 243, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 53, 'kmh_1s': 38, 'giro_1s_grados': 138, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 25, 'kmh_1s': 47, 'giro_1s_grados': 99, 'derrape_final': 0, 'kmh_3s': 60, 'giro_3s_grados': 164, 'derrape_max_grados': 25}
OK
```

### 8. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.53, 0.55, 0.53], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.56, 0.53, 0.55], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.55, 0.54, 0.57], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.6, 0.55, 0.59], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.66], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.51, 0.52, 0.51, 0.52], 'dif': 0.01}
```

### 9. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 10. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 509, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 691}
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

### 11. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 12. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 13. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 14. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 8
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 81], 'golpes': []}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-228, 470], 'golpes': []}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 15. audit_obstaculos.py — OK

```
obstacles 173
[(('footway', 'motorway_link'), 17), (('footway', 'unclassified'), 17), (('footway', 'service'), 14), (('service', 'residential'), 12), (('service', 'service'), 9), (('primary', 'motorway_link'), 9), (('unclassified', 'motorway'), 8), (('primary', 'secondary'), 8), (('footway', 'motorway'), 8), (('secondary', 'secondary'), 7), (('motorway_link', 'tertiary'), 5), (('primary', 'unclassified'), 5), (('footway', 'residential'), 5), (('motorway', 'secondary'), 5), (('motorway_link', 'motorway_link'), 4), (('service', 'tertiary'), 4), (('motorway', 'motorway_link'), 4), (('footway', 'tertiary'), 4), (('tertiary', 'tertiary'), 3), (('motorway', 'secondary_link'), 3)]
barreras en calzada 0 Counter()
```

### 16. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 17. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, conduccion.json, faros1437_apagados.jpg, faros1437_encendidos.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg
