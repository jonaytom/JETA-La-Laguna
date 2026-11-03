# Pruebas 1.1.4 — 2026-11-03 23:19 — 7/8 OK

Listas: v1114c. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 128 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 91 s |
| 3 | `prueba_trinidad.py` | **FALLA** | 7 s |
| 4 | `prueba_pasos.py` | **OK** | 2 s |
| 5 | `herramientas/sonda_caidas.py` | **OK** | 0 s |
| 6 | `herramientas/sonda_choque.py -193 337 4` | **OK** | 0 s |
| 7 | `herramientas/sonda_calzadas.py -78 27 30` | **OK** | 2 s |
| 8 | `herramientas/sonda_calzadas.py 631 600 45` | **OK** | 2 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 23, 'peor': 113, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 3. prueba_trinidad.py — FALLA

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 0, 'en_sala': False, 'fin': [-85, 25]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 0, 'en_sala': False, 'fin': [-245, 527]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD FALLA
```

### 4. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 5. herramientas/sonda_caidas.py — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```

### 6. herramientas/sonda_choque.py -193 337 4 — OK

```
segmentos de choque: 4
   {'id': 73075, 'de': [-194.36, 340.52], 'a': [-195.34, 343.36], 'largo': 3, 'dist': 3.77, 'y': [-6.4, -6], 'suelo': -6.2}
   {'id': 73072, 'de': [-191.44, 332.01], 'a': [-192.41, 334.85], 'largo': 3, 'dist': 2.23, 'y': [-6.5, -6], 'suelo': -6.2}
   {'id': 73073, 'de': [-192.41, 334.85], 'a': [-193.39, 337.68], 'largo': 3, 'dist': 0.14, 'y': [-6.4, -6], 'suelo': -6.2}
   {'id': 73074, 'de': [-193.39, 337.68], 'a': [-194.36, 340.52], 'largo': 3, 'dist': 0.78, 'y': [-6.4, -6], 'suelo': -6.2}
círculos de choque: 0
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-193, 337.1]}, {'rumbo': 23, 'frena': [-192.96, 337.09]}, {'rumbo': 45, 'frena': [-192.93, 337.07]}, {'rumbo': 68, 'frena': [-192.91, 337.04]}, {'rumbo': 90, 'frena': [-192.9, 337]}, {'rumbo': 113, 'frena': [-192.91, 336.96]}, {'rumbo': 135, 'frena': [-192.93, 336.93]}, {'rumbo': 158, 'frena': [-192.96, 336.91]}, {'rumbo': 180, 'frena': [-193, 336.9]}, {'rumbo': 202, 'frena': [-193.04, 336.91]}, {'rumbo': 225, 'frena': [-193.07, 336.93]}, {'rumbo': 247, 'frena': [-193.09, 336.96]}, {'rumbo': 270, 'frena': [-193.1, 337]}, {'rumbo': 293, 'frena': [-193.09, 337.04]}, {'rumbo': 315, 'frena': [-193.07, 337.07]}, {'rumbo': 337, 'frena': [-193.04, 337.09]}]
SONDA CHOQUE OK
```

### 7. herramientas/sonda_calzadas.py -78 27 30 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [6, 'Calle Tabares de Cala', 'residential', 9.8, '', 22, -86, 7, -0.25, -0.25, 17]
   [374, 'Avenida de La Trinidad', 'secondary', 6.6, '', 13, -90, 23, -0.86, -0.86, 4]
   [377, '', 'secondary_link', 9.1, '', 2, -79, 29, -1.07, -1.07, 4]
   [770, 'Calle Herradores', 'pedestrian', 6, '', 22, -86, 7, -0.25, -0.25, 4]
   [771, 'Calle Herradores', 'tertiary', 11.1, '', 12, -71, 18, -0.67, -0.67, 2]
   [2484, 'Avenida de La Trinidad', 'secondary', 6.6, '', 0, -78, 27, -1.02, -1.02, 5]
   [2488, 'Calle Herradores', 'tertiary', 12, '', 12, -68, 20, -0.78, -0.78, 5]
   [4464, '', 'footway', 2.4, '', 14, -70, 16, -0.61, -0.61, 64]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [6, 374, '6 m', 'dif. altura 0.06..0.20', [-84, 1]]
   [374, 377, '14 m', 'dif. altura 0.00..0.23', [-89, 18]]
   [374, 771, '8 m', 'dif. altura 0.05..0.21', [-86, 8]]
   [377, 2484, '10 m', 'dif. altura 0.00..0.13', [-79, 29]]
   [771, 2484, '8 m', 'dif. altura 0.06..0.23', [-74, 16]]
SONDA CALZADAS OK
```

### 8. herramientas/sonda_calzadas.py 631 600 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [658, 'Camino Real de La Verdellada', 'unclassified', 8, 'hundida,tunel', 7, 630, 593, -52.24, -50.17, 2]
   [660, 'Avenida Casa del Barco', 'residential', 7.9, '', 16, 645, 592, -49.91, -49.91, 4]
   [664, '', 'unclassified', 7.9, 'elevada', 1, 632, 600, -46.22, -50.52, 3]
   [697, 'Camino Real de La Verdellada', 'unclassified', 8, 'hundida', 16, 645, 592, -49.99, -49.91, 4]
   [709, 'Camino Real de La Verdellada', 'unclassified', 8, 'hundida', 12, 621, 594, -52.07, -50.22, 5]
   [1402, 'Calle Vicente Buergo Oraa', 'residential', 8, '', 35, 610, 629, -51.17, -51.17, 6]
   [1869, 'Camino Real de La Verdellada', 'unclassified', 8, 'hundida', 13, 641, 592, -50.51, -49.97, 2]
   [1988, 'Camino Real de La Verdellada', 'residential', 8, '', 21, 610, 600, -50.35, -50.35, 16]
   [1989, 'Calle Emilio Gutiérrez Salazar', 'residential', 8, '', 40, 598, 622, -50.55, -50.55, 12]
   [2021, 'Vía de Ronda de La Laguna', 'primary', 17.2, 'elevada', 1, 632, 600, -46.2, -50.5, 11]
   [2276, 'Avenida Casa del Barco', 'residential', 7.9, '', 27, 658, 600, -49.84, -49.84, 4]
   [2285, '', 'footway', 2.4, '', 30, 658, 586, -49.09, -49.09, 7]
   [2404, 'Calle Emilio Gutiérrez Salazar', 'residential', 8, '', 35, 610, 629, -51.17, -51.17, 2]
   [2405, 'Calle Emilio Gutiérrez Salazar', 'residential', 8, '', 35, 610, 629, -51.17, -51.17, 2]
   [2897, 'Vía de Ronda de La Laguna', 'primary', 17.2, 'elevada', 1, 632, 600, -46.21, -50.5, 5]
   [4329, '', 'footway', 2.4, '', 26, 606, 598, -50.15, -50.15, 47]
   [4330, '', 'footway', 2.4, '', 41, 592, 614, -50.09, -50.09, 3]
   [4519, '', 'footway', 2.4, '', 21, 634, 621, -51.33, -51.33, 2]
   [4626, '', 'pedestrian', 6, '', 32, 600, 608, -50.29, -50.29, 11]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [658, 709, '6 m', 'dif. altura 0.00..0.17', [621, 594]]
   [658, 1869, '4 m', 'dif. altura 0.37..0.75', [637, 592]]
   [658, 2021, '10 m', 'dif. altura 5.75..6.41', [627, 593]]
   [660, 697, '10 m', 'dif. altura 0.09..0.65', [645, 592]]
   [660, 2276, '18 m', 'dif. altura 0.00..0.46', [650, 585]]
   [664, 2021, '2 m', 'dif. altura 0.00..0.00', [632, 600]]
   [664, 2404, '6 m', 'dif. altura 0.26..1.93', [615, 625]]
   [664, 2897, '20 m', 'dif. altura 0.00..0.03', [631, 602]]
   [697, 2276, '18 m', 'dif. altura 0.00..0.29', [651, 596]]
   [697, 2482, '6 m', 'dif. altura 0.00..0.02', [669, 612]]
   [709, 1988, '16 m', 'dif. altura 0.13..1.01', [606, 606]]
   [709, 1989, '10 m', 'dif. altura 0.00..0.02', [598, 622]]
   [1402, 2405, '8 m', 'dif. altura 0.04..0.16', [605, 635]]
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-78_27_arriba.jpg, calzadas_-78_27_calle0.jpg, calzadas_-78_27_calle1.jpg, calzadas_631_600_arriba.jpg, calzadas_631_600_calle0.jpg, calzadas_631_600_calle1.jpg, conduccion.json, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg
