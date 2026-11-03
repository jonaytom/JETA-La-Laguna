# Pruebas 1.1.3 — 2026-11-03 23:15 — 4/4 OK

Listas: v1114b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 78 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calzadas.py 309 -40 45 823,522` | **OK** | 54 s |
| 2 | `herramientas/sonda_choque.py -193 337 4` | **OK** | 0 s |
| 3 | `herramientas/sonda_calzadas.py -78 27 30` | **OK** | 2 s |
| 4 | `herramientas/sonda_hueco.py -191 366 50` | **OK** | 2 s |

## Detalle

### 1. herramientas/sonda_calzadas.py 309 -40 45 823,522 — OK

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
diagnóstico 823 {'sube': False, 'muestras': [[0, 2574, 30.4, -1, -3.88], [6, 2574, 30.9, -1, -4.29], [12, 520, 31.6, -0.99, -5.11], [18, 520, 32.6, -0.99, -5.38], [24, 520, 33.4, -1, -5.67], [30, 520, 33, -1, -6.06], [36, 520, 32.2, -0.99, -6.21], [42, 520, 30.3, -0.86, -5.95], [48, 1983, 27.4, -0.91, -4.79], [54, 1983, 25, -0.91, -3.95], [60, 1983, 22.6, -0.92, -3.27], [66, 1983, 20.4, -0.93, -2.73], [72, 1983, 18.2, -0.93, -2.21], [78, 1983, 16.3, -0.97, -1.58], [84, 1983, 14.9, -0.97, -1.51], [90, 1983, 13.5, -0.97, -1.5], [96, 1983, 12, -0.97, -1.44], [102, 1983, 10.6, -0.97, -1.34], [108, 1983, 9.3, -0.98, -1.23], [114, 1983, 8.2, -0.98, -1.18], [120, 1983, 7.1, -0.98, -1.31], [126, 1983, 6, -0.96, -1.36], [132, 1983, 4.1, -0.95, -0.98], [138, 1983, 2.2, -0.95, -0.54], [144, 1983, 0.4, -0.95, -0.05]]}
diagnóstico 522 {'sube': True, 'muestras': [[0, 2576, 0, 0.99, 0], [6, 2576, 6, 0.99, 0.17], [12, 2576, 12, 0.99, 0.33], [18, 1983, 12.3, 0.93, 1.04], [24, 1983, 8.9, 0.93, 1.18], [30, 1983, 8.8, 0.96, 1.31], [36, 1983, 10.4, 0.97, 1.59], [42, 1983, 12, 0.97, 1.99], [48, 2203, 13.3, -1, -1.46], [54, 2203, 12.9, -1, -1.43], [60, 2203, 12.5, -1, -1.38], [66, 2203, 12.1, -1, -1.37], [72, 2203, 11.7, -1, -1.33], [78, 2203, 10.7, -0.98, -1.21], [84, 2203, 9.6, -0.98, -1.1], [90, 2203, 9.2, -0.93, -0.79], [96, 2203, 11.8, -0.83, -0.47]]}
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

### 2. herramientas/sonda_choque.py -193 337 4 — OK

```
segmentos de choque: 4
   {'id': 73075, 'de': [-194.36, 340.52], 'a': [-195.34, 343.36], 'largo': 3, 'dist': 3.77, 'y': [-6.4, -5.7], 'suelo': -6.2}
   {'id': 73072, 'de': [-191.44, 332.01], 'a': [-192.41, 334.85], 'largo': 3, 'dist': 2.23, 'y': [-6.5, -5.7], 'suelo': -6.2}
   {'id': 73073, 'de': [-192.41, 334.85], 'a': [-193.39, 337.68], 'largo': 3, 'dist': 0.14, 'y': [-6.4, -5.7], 'suelo': -6.2}
   {'id': 73074, 'de': [-193.39, 337.68], 'a': [-194.36, 340.52], 'largo': 3, 'dist': 0.78, 'y': [-6.4, -5.7], 'suelo': -6.2}
círculos de choque: 0
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-193, 337.1]}, {'rumbo': 23, 'frena': [-192.96, 337.09]}, {'rumbo': 45, 'frena': [-192.93, 337.07]}, {'rumbo': 68, 'frena': [-192.91, 337.04]}, {'rumbo': 90, 'frena': [-192.9, 337]}, {'rumbo': 113, 'frena': [-192.91, 336.96]}, {'rumbo': 135, 'frena': [-192.93, 336.93]}, {'rumbo': 158, 'frena': [-192.96, 336.91]}, {'rumbo': 180, 'frena': [-193, 336.9]}, {'rumbo': 202, 'frena': [-193.04, 336.91]}, {'rumbo': 225, 'frena': [-193.07, 336.93]}, {'rumbo': 247, 'frena': [-193.09, 336.96]}, {'rumbo': 270, 'frena': [-193.1, 337]}, {'rumbo': 293, 'frena': [-193.09, 337.04]}, {'rumbo': 315, 'frena': [-193.07, 337.07]}, {'rumbo': 337, 'frena': [-193.04, 337.09]}]
SONDA CHOQUE OK
```

### 3. herramientas/sonda_calzadas.py -78 27 30 — OK

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

### 4. herramientas/sonda_hueco.py -191 366 50 — OK

```
planta (7, [[853, -225, 372, 1, 6], [885, -228, 334, 1, 18], [6573, -185, 363, 1, 4], [6574, -189, 376, 1, 4], [6575, -194, 388, 1, 4], [7533, -152, 370, 2, 4], [7534, -160, 381, 2, 5]])
pintados (7, [[-230, 371, '', 10], [-228, 334, '', 16], [-185, 363, '', 10], [-189, 376, '', 10], [-194, 388, '', 10], [-152, 370, '', 16], [-160, 380, '', 19]])
quitados (0, [])
calles (7, [[2, 'Calle Doctor Zamenhoff', 'residential', 7], [376, 'Calle Catedral', 'residential', 7.6], [1027, 'Calle Catedral', 'residential', 7.5], [2527, 'Avenida de La Trinidad', 'secondary', 6.6], [2851, 'Avenida de La Trinidad', 'secondary', 6.6], [3670, '', 'service', 5.2], [3671, '', 'service', 5.2]])
areas (1, [[442, 'parking', '', -214, 322]])
vaciadas 0
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-78_27_arriba.jpg, calzadas_-78_27_calle0.jpg, calzadas_-78_27_calle1.jpg, calzadas_309_-40_arriba.jpg, calzadas_309_-40_calle0.jpg, calzadas_309_-40_calle1.jpg, hueco_-191_366.jpg, hueco_-191_366_calle0.jpg, hueco_-191_366_calle1.jpg
