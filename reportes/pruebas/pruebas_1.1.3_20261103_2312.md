# Pruebas 1.1.3 — 2026-11-03 23:12 — 7/7 OK

Listas: v1114a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 120 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 89 s |
| 3 | `herramientas/sonda_caidas.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_calzadas.py 631 600 45` | **OK** | 3 s |
| 5 | `herramientas/sonda_calzadas.py -988 114 45` | **OK** | 2 s |
| 6 | `herramientas/sonda_calzadas.py 309 -40 45` | **OK** | 1 s |
| 7 | `herramientas/sonda_calzadas.py -517 -289 30` | **OK** | 2 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 87, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 3. herramientas/sonda_caidas.py — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```

### 4. herramientas/sonda_calzadas.py 631 600 45 — OK

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

### 5. herramientas/sonda_calzadas.py -988 114 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [189, 'Calle Eduardo Westerdahl', 'residential', 7.9, '', 24, -997, 137, 9.6, 9.6, 9]
   [1640, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 32, -956, 110, 3.11, 7.03, 3]
   [1769, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 41, -950, 98, 0.59, 6.71, 2]
   [2375, '', 'tertiary', 10.4, 'hundida', 2, -988, 116, 8.72, 8.72, 9]
   [2469, '', 'motorway_link', 7.8, '', 42, -967, 78, 7.37, 7.37, 13]
   [2514, 'Camino el Vallado', 'residential', 7.9, '', 35, -1000, 147, 9.97, 9.97, 11]
   [3051, 'Camino de la Villa', 'residential', 7.9, '', 42, -987, 156, 9.28, 9.28, 4]
   [3052, '', 'motorway_link', 7.8, '', 28, -1014, 105, 10.64, 10.64, 9]
   [3053, '', 'tertiary', 10.4, '', 11, -990, 125, 8.97, 8.97, 2]
   [3054, '', 'tertiary', 10.4, 'hundida', 9, -985, 122, 8.56, 8.56, 7]
   [3055, '', 'tertiary', 11.7, '', 28, -1014, 105, 10.64, 10.64, 10]
   [3066, '', 'tertiary', 11.7, '', 10, -997, 114, 9.38, 9.38, 5]
   [3067, '', 'tertiary', 11.7, '', 8, -996, 118, 9.27, 9.27, 4]
   [3068, '', 'tertiary', 11.7, '', 16, -994, 129, 9.3, 9.3, 3]
   [3070, '', 'tertiary', 11.7, '', 37, -1007, 146, 10.49, 10.49, 4]
   [3071, '', 'tertiary', 11.7, '', 24, -997, 137, 9.6, 9.6, 3]
   [3762, '', 'tertiary_link', 7.8, '', 42, -1030, 111, 12.07, 12.07, 4]
   [4611, '', 'footway', 2.4, '', 41, -950, 98, 6.71, 6.71, 2]
   [4612, '', 'footway', 2.4, '', 32, -959, 127, 7.38, 7.38, 3]
   [4618, '', 'footway', 2.4, '', 34, -954, 118, 7.07, 7.07, 5]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [189, 2514, '6 m', 'dif. altura 0.30..0.43', [-989, 145]]
   [189, 3071, '8 m', 'dif. altura 0.08..0.30', [-993, 142]]
   [1640, 2375, '8 m', 'dif. altura 0.04..0.25', [-953, 105]]
   [1640, 3054, '6 m', 'dif. altura 0.00..0.79', [-956, 110]]
   [1769, 68, '2 m', 'dif. altura 0.27..0.27', [-948, 95]]
   [2375, 3054, '30 m', 'dif. altura 0.01..1.65', [-965, 108]]
   [2375, 3067, '8 m', 'dif. altura 0.10..0.41', [-990, 116]]
   [2469, 2460, '38 m', 'dif. altura 0.18..0.24', [-983, 70]]
   [2514, 3051, '18 m', 'dif. altura 0.00..0.07', [-994, 150]]
   [2514, 3070, '2 m', 'dif. altura 0.00..0.00', [-1007, 146]]
   [2514, 3071, '12 m', 'dif. altura 0.03..0.32', [-1005, 146]]
   [3052, 3055, '14 m', 'dif. altura 0.00..0.04', [-1014, 105]]
   [3053, 3054, '2 m', 'dif. altura 0.11..0.11', [-991, 126]]
   [3053, 3067, '4 m', 'dif. altura 0.00..0.09', [-994, 129]]
   [3055, 3762, '16 m', 'dif. altura 0.00..0.56', [-1024, 107]]
   [3070, 3056, '4 m', 'dif. altura 0.50..0.66', [-1017, 147]]
SONDA CALZADAS OK
```

### 6. herramientas/sonda_calzadas.py 309 -40 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [522, '', 'primary_link', 9.1, '', 6, 303, -40, -10.23, -11.07, 6]
   [823, '', 'primary_link', 9.1, '', 3, 311, -37, -9.88, -9.88, 8]
   [836, '', 'residential', 7.5, '', 34, 275, -38, -13.12, -13.12, 6]
   [1983, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 3, 311, -37, -9.88, -9.88, 3]
   [1984, 'Vía de Ronda de La Laguna', 'primary', 13, '', 1, 310, -40, -9.88, -9.94, 2]
   [2203, 'Camino de las Estaciones', 'unclassified', 7.5, 'elevada', 21, 288, -38, -12.65, -12.65, 4]
   [2576, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 25, 305, -65, -10.46, -10.46, 9]
   [3818, 'Calle José Clavijo Fajardo', 'residential', 7.5, '', 38, 272, -47, -13.01, -13.01, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [522, 1983, '6 m', 'dif. altura 0.53..0.92', [303, -34]]
   [522, 1984, '30 m', 'dif. altura 0.03..0.83', [304, -63]]
   [522, 2576, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [823, 1983, '42 m', 'dif. altura 0.10..1.39', [332, -3]]
   [836, 3818, '12 m', 'dif. altura 0.00..0.07', [272, -47]]
   [1983, 1984, '2 m', 'dif. altura 0.00..0.00', [311, -37]]
   [1984, 2576, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [3818, 578, '2 m', 'dif. altura 0.29..0.29', [265, -47]]
SONDA CALZADAS OK
```

### 7. herramientas/sonda_calzadas.py -517 -289 30 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [73, 'Calle las Candilas', 'service', 5.2, '', 14, -531, -285, 4.83, 4.83, 6]
   [751, 'Plaza del Doctor Olivera', 'pedestrian', 6, '', 1, -516, -290, 4.83, 4.83, 56]
   [3108, '', 'steps', 2.4, '', 13, -504, -293, 4.83, 4.83, 2]
   [3109, '', 'steps', 2.4, '', 24, -538, -301, 4.46, 4.46, 2]
   [3507, 'Plaza del Doctor Olivera', 'pedestrian', 6, '', 7, -519, -282, 4.97, 4.97, 4]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-517_-289_arriba.jpg, calzadas_-517_-289_calle0.jpg, calzadas_-517_-289_calle1.jpg, calzadas_-988_114_arriba.jpg, calzadas_-988_114_calle0.jpg, calzadas_-988_114_calle1.jpg, calzadas_309_-40_arriba.jpg, calzadas_309_-40_calle0.jpg, calzadas_309_-40_calle1.jpg, calzadas_631_600_arriba.jpg, calzadas_631_600_calle0.jpg, calzadas_631_600_calle1.jpg, conduccion.json
