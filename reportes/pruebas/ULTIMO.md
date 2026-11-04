# Pruebas 1.1.6 — 2026-11-04 00:18 — 8/8 OK

Listas: v1116c. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 123 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_079.py` | **OK** | 57 s |
| 2 | `prueba_arranque.py` | **OK** | 1 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 35 s |
| 4 | `herramientas/sonda_caidas.py` | **OK** | 0 s |
| 5 | `herramientas/sonda_calzadas.py -1193 -28 40` | **OK** | 2 s |
| 6 | `herramientas/sonda_calzadas.py 537 1371 40` | **OK** | 2 s |
| 7 | `herramientas/sonda_calzadas.py 630 -1146 40` | **OK** | 1 s |
| 8 | `herramientas/sonda_aparcamiento.py` | **OK** | 3 s |

## Detalle

### 1. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.114, 'mano_izq': 0.05, 'angulo_antebrazo': 38}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.116, 'mano_izq': 0.033, 'angulo_antebrazo': 60}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 0, 'marcador': [2, 2]}
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
combos de la CPU buena {'combos_cpu': 13, 'marcador': [38, 24]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 51, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 4. herramientas/sonda_caidas.py — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```

### 5. herramientas/sonda_calzadas.py -1193 -28 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [311, '', 'unclassified', 8, 'hundida,tunel', 3, -1195, -31, 11.56, 18.08, 2]
   [715, 'Calle Higueras Don Felipe', 'residential', 7.9, 'hundida', 22, -1173, -39, 18.1, 18.1, 10]
   [1271, '', 'unclassified', 8, 'hundida', 8, -1188, -34, 13.76, 18.09, 4]
   [1795, 'Calle Espinero', 'unclassified', 7.9, 'elevada', 27, -1202, -2, 18.26, 18.26, 10]
   [1865, 'Camino Margallo', 'residential', 7.9, '', 22, -1173, -39, 18.1, 18.1, 3]
   [2288, 'Autopista del Norte', 'motorway', 13.4, '', 0, -1193, -28, 18.14, 18.14, 81]
   [2480, 'Autopista del Norte', 'motorway', 13.4, '', 15, -1197, -14, 18.22, 18.22, 58]
   [3752, '', 'footway', 2.4, 'hundida,tunel', 5, -1196, -32, 14.96, 18.05, 2]
   [3753, '', 'footway', 2.4, 'hundida', 7, -1191, -35, 15.75, 18.07, 2]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [311, 1271, '4 m', 'dif. altura 0.68..1.32', [-1192, -33]]
   [311, 1795, '8 m', 'dif. altura 5.81..7.18', [-1229, -12]]
   [311, 2288, '16 m', 'dif. altura 6.26..7.59', [-1206, -25]]
   [311, 2480, '18 m', 'dif. altura 7.44..7.65', [-1222, -16]]
   [715, 1271, '10 m', 'dif. altura 0.00..0.02', [-1173, -39]]
SONDA CALZADAS OK
```

### 6. herramientas/sonda_calzadas.py 537 1371 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [355, 'Camino la Hornera', 'residential', 7.9, '', 24, 553, 1353, -72.51, -72.51, 10]
   [428, '', 'residential', 7.9, '', 24, 553, 1353, -72.51, -72.51, 6]
   [430, 'Camino la Hornera', 'residential', 8, '', 21, 557, 1365, -73.09, -73.09, 6]
   [445, 'Vía de Ronda de La Laguna', 'primary', 17.2, 'hundida', 0, 537, 1371, -75.95, -71.94, 4]
   [446, 'Vía de Ronda de La Laguna', 'primary', 17.2, 'hundida,tunel', 1, 537, 1371, -75.98, -71.95, 5]
   [1020, 'Calle Júpiter', 'residential', 7.9, '', 34, 533, 1405, -72.78, -72.78, 2]
   [1299, '', 'service', 5.2, '', 29, 566, 1368, -73.73, -73.73, 2]
   [1389, '', 'service', 5.2, '', 34, 507, 1356, -69.27, -69.27, 4]
   [1403, 'Calle las Saltonas', 'residential', 7.9, '', 34, 509, 1352, -69.27, -69.27, 5]
   [2066, 'Calle Hércules', 'residential', 7.9, '', 29, 527, 1398, -72.12, -72.12, 10]
   [3613, '', 'pedestrian', 6, '', 19, 543, 1389, -72.93, -72.93, 3]
   [3617, 'Calle las Saltonas', 'residential', 8, '', 15, 539, 1356, -71.63, -71.63, 2]
   [3621, 'Calle Habaneras', 'residential', 8, '', 34, 507, 1356, -69.27, -69.27, 9]
   [4204, '', 'footway', 2.4, '', 33, 558, 1346, -72.58, -72.58, 55]
   [4210, '', 'footway', 2.4, '', 25, 561, 1364, -73.37, -73.37, 36]
   [4214, '', 'footway', 2.4, '', 31, 564, 1356, -73.28, -73.28, 3]
   [4215, '', 'footway', 2.4, '', 17, 540, 1354, -71.61, -71.61, 64]
   [4217, '', 'footway', 2.4, '', 24, 548, 1350, -72.06, -72.06, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [355, 428, '6 m', 'dif. altura 0.09..0.27', [552, 1347]]
   [430, 446, '12 m', 'dif. altura 6.37..6.75', [556, 1364]]
   [430, 3617, '8 m', 'dif. altura 0.00..0.19', [554, 1356]]
   [445, 446, '18 m', 'dif. altura 0.00..3.00', [537, 1371]]
   [446, 1299, '16 m', 'dif. altura 6.87..7.80', [576, 1361]]
   [1020, 2066, '8 m', 'dif. altura 0.00..0.30', [533, 1405]]
   [1389, 3621, '6 m', 'dif. altura 0.10..0.30', [501, 1355]]
   [1403, 3621, '4 m', 'dif. altura 0.17..0.33', [505, 1351]]
SONDA CALZADAS OK
```

### 7. herramientas/sonda_calzadas.py 630 -1146 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [308, 'Camino La Rúa', 'residential', 8, 'hundida', 0, 630, -1146, -0.86, 3, 18]
   [564, 'Camino La Rúa', 'residential', 8, 'hundida,tunel', 3, 632, -1148, -1, 3.03, 2]
   [565, '', 'unclassified', 8, '', 29, 659, -1151, 4.76, 4.76, 5]
   [577, 'Camino La Rúa', 'residential', 8, 'hundida', 23, 648, -1161, -0.26, 3.66, 6]
   [1449, '', 'primary_link', 9.1, '', 28, 658, -1145, 5.02, 5.02, 4]
   [1568, 'Camino el Bronco', 'unclassified', 8, '', 29, 659, -1151, 4.76, 4.76, 10]
   [2023, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 10, 640, -1147, 5.79, 3.63, 22]
   [3032, 'Calle Félix Torres', 'residential', 8.1, '', 1, 630, -1146, 3, 3, 5]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [308, 564, '2 m', 'dif. altura 0.00..0.00', [632, -1148]]
   [308, 3032, '10 m', 'dif. altura 3.45..3.90', [631, -1147]]
   [564, 577, '4 m', 'dif. altura 0.19..0.34', [645, -1159]]
   [564, 2023, '12 m', 'dif. altura 6.10..6.58', [636, -1152]]
   [565, 1449, '8 m', 'dif. altura 0.06..0.22', [660, -1159]]
   [1449, 1568, '8 m', 'dif. altura 0.04..0.18', [658, -1144]]
SONDA CALZADAS OK
```

### 8. herramientas/sonda_aparcamiento.py — OK

```
calles miradas: 2794
  ancho:0    807
  ancho:1    1018
  ancho:2    605
  nada:0     307
  osm:0      5
  osm:1      39
  osm:2      11
  tira:1     2
foto 0 -276 118 Calle San Juan
foto 1 2074 1590 Calle Chimbeske
foto 2 850 2380 Calle Igualdad
foto 3 2394 3846 Calle Rosalía de Castro
foto 4 1282 3672 Calle San Manuel
foto 5 1757 3600 
SONDA APARCAMIENTO OK
```

Fotos/archivos nuevos en `tests/shots/`: aparca_0.jpg, aparca_1.jpg, aparca_2.jpg, aparca_3.jpg, aparca_4.jpg, aparca_5.jpg, calzadas_-1193_-28_arriba.jpg, calzadas_-1193_-28_calle0.jpg, calzadas_-1193_-28_calle1.jpg, calzadas_537_1371_arriba.jpg, calzadas_537_1371_calle0.jpg, calzadas_537_1371_calle1.jpg, calzadas_630_-1146_arriba.jpg, calzadas_630_-1146_calle0.jpg, calzadas_630_-1146_calle1.jpg, conduccion.json, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg
