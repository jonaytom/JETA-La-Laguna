# Pruebas 1.1.9 — 2026-11-09 15:39 — 5/5 OK

Listas: corredores. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 89 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_solapes.py 60` | **OK** | 0 s |
| 2 | `herramientas/sonda_calzadas.py 146 1259 60` | **OK** | 61 s |
| 3 | `herramientas/sonda_calzadas.py -998 121 45` | **OK** | 2 s |
| 4 | `herramientas/sonda_calzadas.py -909 45 45` | **OK** | 2 s |
| 5 | `herramientas/sonda_calzadas.py -1250 9 45` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_solapes.py 60 — OK

```
      ['residential', 'Camino San Bartolomé de Geneto', 7.9, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 6.1 m, se pisan 3.1 m (5 puntos)
      ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 11 m, se pisan 0.9 m (13 puntos)
  X -3056, Y -111 · 18 puntos
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.4 m, se pisan 4.8 m (12 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.8 m, se pisan 4.4 m (6 puntos)
  X -2816, Y -14 · 18 puntos
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (5 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (2 puntos)
      ['primary', '', 13, ''] con ['primary', '', 13, '']: ejes a 7.4 m, se pisan 5.6 m (2 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 3.9 m, se pisan 5.2 m (6 puntos)
  X 1142, Y 2357 · 17 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 5.2 m, se pisan 6.1 m (6 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, 'puente']: ejes a 6.5 m, se pisan 2.6 m (3 puntos)
      ['service', '', 5.2, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 8.9 m, se pisan 1.1 m (2 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 7.4 m, se pisan 0.4 m (5 puntos)
  X -182, Y 875 · 17 puntos
      ['secondary', '', 11.7, ''] con ['primary_link', '', 9.1, '']: ejes a 8.3 m, se pisan 2.1 m (3 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.1 m, se pisan 1.4 m (3 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.1 m, se pisan 1.4 m (4 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.4 m, se pisan 1.1 m (1 puntos)
  X 996, Y 2612 · 17 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 0.6 m, se pisan 10 m (2 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 1.9 m, se pisan 8.7 m (2 puntos)
      ['service', '', 5.2, ''] con ['tertiary', 'Calle Libertad', 10.4, '']: ejes a 5.7 m, se pisan 2.1 m (3 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', '', 10.4, '']: ejes a 10 m, se pisan 1.9 m (6 puntos)
  X 960, Y 2824 · 17 puntos
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', 'Vía de Servicio', 10.4, '']: ejes a 10.8 m, se pisan 1.1 m (11 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', 'Vía de Servicio', 10.4, '']: ejes a 11.2 m, se pisan 0.7 m (4 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', '', 10.4, '']: ejes a 11.4 m, se pisan 0.5 m (2 puntos)
  X 217, Y 1077 · 17 puntos
      ['tertiary', '', 10.4, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 1.3 m, se pisan 9.7 m (5 puntos)
      ['secondary', 'Avenida Lora Tamayo', 11.7, ''] con ['tertiary', '', 10.4, '']: ejes a 1.8 m, se pisan 9.3 m (8 puntos)
      ['residential', '', 7.9, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 5.5 m, se pisan 4.3 m (4 puntos)
  X -842, Y 1012 · 17 puntos
      ['service', '', 5.2, ''] con ['residential', '', 8, '']: ejes a 4 m, se pisan 2.6 m (17 puntos)
  X -3419, Y -179 · 17 puntos
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.1 m, se pisan 4.5 m (9 puntos)
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['service', '', 5.2, '']: ejes a 5.8 m, se pisan 2.7 m (8 puntos)
  X -386, Y 622 · 16 puntos
      ['residential', 'Leocadio Machado', 7.9, ''] con ['motorway_link', '', 7.8, '']: ejes a 2.7 m, se pisan 5.1 m (8 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 7.7 m, se pisan 2.9 m (7 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway_link', '', 7.8, '']: ejes a 6.3 m, se pisan 1.5 m (1 puntos)
  X 211, Y 1138 · 16 puntos
      ['tertiary', '', 10.4, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 1.6 m, se pisan 9.4 m (15 puntos)
      ['residential', '', 7.9, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 8.2 m, se pisan 1.6 m (1 puntos)
  X 1439, Y 1655 · 16 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.2 m, se pisan 3.2 m (16 puntos)
  X -3476, Y -187 · 16 puntos
      ['secondary', 'Carretera General del Norte', 11.7, ''] con ['service', '', 5.2, '']: ejes a 3.6 m, se pisan 4.9 m (8 puntos)
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.7 m, se pisan 3.8 m (7 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['secondary', 'Carretera General del Norte', 11.7, '']: ejes a 11.9 m, se pisan 0.6 m (1 puntos)
  X 1160, Y 2337 · 15 puntos
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 4.9 m, se pisan 2.9 m (14 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, '']: ejes a 7.5 m, se pisan 1.6 m (1 puntos)
  X 989, Y 2640 · 15 puntos
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', '', 10.4, '']: ejes a 9.7 m, se pisan 2.2 m (15 puntos)
  X 1325, Y 1597 · 15 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7 m, se pisan 3.4 m (13 puntos)
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.8 m, se pisan 2.6 m (2 puntos)
SONDA SOLAPES OK
```

### 2. herramientas/sonda_calzadas.py 146 1259 60 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [449, '', 'secondary', 10.4, '', 31, 123, 1280, -37.48, -37.48, 8]
   [660, '', 'secondary', 11.7, 'elevada', 33, 152, 1227, -32.63, -37.72, 6]
   [679, '', 'secondary', 11.7, 'puente,elevada', 20, 133, 1244, -31.26, -37.22, 2]
   [690, '', 'secondary', 11.7, '', 45, 123, 1220, -36.83, -36.83, 16]
   [696, '', 'secondary', 11.7, 'elevada', 33, 152, 1227, -32.61, -37.72, 5]
   [706, '', 'tertiary', 10.4, '', 26, 172, 1257, -38.41, -38.41, 11]
   [1280, '', 'secondary', 11.7, '', 9, 154, 1254, -37.93, -37.93, 6]
   [1281, '', 'motorway_link', 7.8, '', 0, 146, 1259, -37.79, -37.79, 20]
   [1282, '', 'motorway_link', 7.8, '', 45, 123, 1220, -36.83, -36.83, 3]
   [1285, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 4, 143, 1261, -37.75, -37.75, 67]
   [2285, '', 'secondary', 11.7, 'elevada', 48, 100, 1273, -31.25, -36.36, 4]
   [2342, 'Autopista del Norte', 'motorway', 13.4, '', 18, 132, 1271, -37.58, -37.58, 11]
   [3541, '', 'secondary_link', 9.1, 'elevada', 48, 100, 1273, -31.25, -36.36, 9]
   [3546, '', 'secondary', 11.7, 'elevada', 48, 100, 1273, -31.25, -36.36, 4]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [449, 679, '20 m', 'dif. altura 5.10..5.78', [103, 1258]]
   [660, 696, '26 m', 'dif. altura 0.01..0.24', [160, 1203]]
   [679, 1280, '12 m', 'dif. altura 5.19..5.78', [137, 1240]]
   [679, 1281, '8 m', 'dif. altura 5.72..6.04', [131, 1245]]
   [679, 1285, '8 m', 'dif. altura 6.06..6.23', [125, 1250]]
   [679, 2285, '8 m', 'dif. altura 0.00..0.04', [100, 1273]]
   [679, 2342, '14 m', 'dif. altura 5.82..5.97', [115, 1260]]
   [690, 1282, '16 m', 'dif. altura 0.00..0.10', [123, 1220]]
   [706, 1280, '18 m', 'dif. altura 0.04..0.10', [195, 1291]]
   [1280, 1281, '60 m', 'dif. altura 0.00..0.15', [189, 1299]]
   [1281, 1285, '126 m', 'dif. altura 0.01..0.24', [185, 1303]]
   [2285, 3546, '14 m', 'dif. altura 0.00..0.06', [100, 1273]]
   [2342, 2439, '10 m', 'dif. altura 0.12..0.36', [95, 1229]]
SONDA CALZADAS OK
```

### 3. herramientas/sonda_calzadas.py -998 121 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [189, 'Calle Eduardo Westerdahl', 'residential', 7.9, '', 16, -997, 137, 9.6, 9.6, 9]
   [1638, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 43, -956, 110, 3.11, 7.03, 3]
   [2373, '', 'tertiary', 10.4, 'hundida', 7, -996, 114, 9.28, 9.28, 9]
   [2512, 'Camino el Vallado', 'residential', 7.9, '', 26, -1002, 146, 10.08, 10.08, 11]
   [3048, 'Camino de la Villa', 'residential', 7.9, '', 36, -990, 156, 9.51, 9.51, 4]
   [3049, '', 'motorway_link', 7.8, '', 23, -1014, 105, 10.64, 10.64, 9]
   [3050, '', 'tertiary', 10.4, '', 8, -992, 127, 9.14, 9.14, 2]
   [3051, '', 'tertiary', 10.4, 'hundida', 9, -990, 125, 8.97, 8.97, 7]
   [3052, '', 'tertiary', 11.7, '', 23, -1014, 105, 10.64, 10.64, 10]
   [3053, 'Camino de la Villa', 'residential', 8, '', 35, -1023, 145, 11.78, 11.78, 8]
   [3063, '', 'tertiary', 11.7, '', 7, -997, 114, 9.38, 9.38, 5]
   [3064, '', 'tertiary', 11.7, '', 4, -995, 119, 9.24, 9.24, 4]
   [3065, '', 'tertiary', 11.7, '', 9, -994, 129, 9.3, 9.3, 3]
   [3067, '', 'tertiary', 11.7, '', 26, -1007, 146, 10.49, 10.49, 4]
   [3068, '', 'tertiary', 11.7, '', 16, -997, 137, 9.6, 9.6, 3]
   [3759, '', 'tertiary_link', 7.8, '', 34, -1030, 111, 12.07, 12.07, 4]
   [4609, '', 'footway', 2.4, '', 39, -963, 137, 7.71, 7.71, 3]
   [4615, '', 'footway', 2.4, '', 44, -954, 118, 7.07, 7.07, 5]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [189, 2512, '6 m', 'dif. altura 0.30..0.43', [-989, 145]]
   [189, 3068, '8 m', 'dif. altura 0.08..0.30', [-993, 142]]
   [1638, 3051, '4 m', 'dif. altura 0.00..0.40', [-956, 110]]
   [2373, 3051, '30 m', 'dif. altura 0.01..1.65', [-965, 108]]
   [2373, 3064, '8 m', 'dif. altura 0.10..0.41', [-990, 116]]
   [2512, 3048, '22 m', 'dif. altura 0.00..0.13', [-994, 150]]
   [2512, 3067, '2 m', 'dif. altura 0.00..0.00', [-1007, 146]]
   [2512, 3068, '12 m', 'dif. altura 0.03..0.32', [-1005, 146]]
   [3049, 3052, '14 m', 'dif. altura 0.00..0.04', [-1014, 105]]
   [3050, 3051, '2 m', 'dif. altura 0.11..0.11', [-991, 126]]
   [3050, 3064, '4 m', 'dif. altura 0.00..0.09', [-994, 129]]
   [3052, 3053, '10 m', 'dif. altura 0.11..0.55', [-1030, 140]]
   [3052, 3759, '22 m', 'dif. altura 0.00..0.56', [-1024, 107]]
   [3053, 3067, '12 m', 'dif. altura 0.05..0.39', [-1023, 146]]
   [3759, 3047, '6 m', 'dif. altura 0.06..0.11', [-1033, 92]]
SONDA CALZADAS OK
```

### 4. herramientas/sonda_calzadas.py -909 45 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [68, 'Camino el Vallado', 'tertiary', 10.4, 'hundida,tunel', 23, -925, 61, -1.07, 5.77, 2]
   [70, 'Calle San Antonio', 'tertiary', 10.4, '', 41, -893, 8, 5.13, 5.13, 7]
   [202, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 30, -881, 34, 4.78, 4.78, 5]
   [983, 'Avenida La Candelaria', 'tertiary', 10.4, '', 16, -922, 35, 5.79, 5.79, 6]
   [1267, '', 'motorway_link', 7.8, '', 27, -914, 72, 5.58, 5.58, 15]
   [1785, '', 'motorway_link', 7.8, '', 25, -924, 65, 5.75, 5.75, 5]
   [2005, '', 'service', 5.2, '', 10, -903, 54, 5.28, 5.28, 7]
   [2286, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 35, -928, 74, 5.9, 5.9, 81]
   [2292, '', 'motorway_link', 7.8, '', 16, -922, 35, 5.79, 5.79, 7]
   [2297, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 1, -909, 46, 2.08, 5.39, 5]
   [2504, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 30, -881, 34, 4.78, 4.78, 5]
   [2876, 'Calle San Antonio', 'tertiary', 12.9, '', 16, -920, 33, 5.75, 5.75, 2]
   [2877, 'Camino el Vallado', 'tertiary', 10.4, '', 41, -893, 8, 5.13, 5.13, 2]
   [2960, '', 'service', 5.2, '', 11, -899, 51, 5.19, 5.19, 3]
   [3515, '', 'footway', 2.4, '', 36, -933, 19, 6.29, 6.29, 32]
   [4614, '', 'footway', 2.4, '', 40, -873, 29, 4.64, 4.64, 4]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [68, 1785, '6 m', 'dif. altura 7.18..7.33', [-928, 64]]
   [68, 2286, '12 m', 'dif. altura 7.40..7.54', [-931, 69]]
   [68, 2292, '2 m', 'dif. altura 7.02..7.02', [-927, 62]]
   [68, 2297, '2 m', 'dif. altura 0.00..0.00', [-925, 61]]
   [68, 2458, '2 m', 'dif. altura 7.63..7.63', [-938, 78]]
   [70, 2877, '4 m', 'dif. altura 0.02..0.03', [-891, 4]]
   [202, 2504, '18 m', 'dif. altura 0.00..0.04', [-881, 34]]
   [983, 1785, '20 m', 'dif. altura 0.06..0.14', [-939, 44]]
   [983, 2292, '20 m', 'dif. altura 0.02..0.23', [-923, 36]]
   [983, 2876, '2 m', 'dif. altura 0.00..0.00', [-922, 35]]
   [1267, 2005, '22 m', 'dif. altura 0.08..0.09', [-894, 87]]
   [1267, 2292, '6 m', 'dif. altura 0.02..0.06', [-910, 75]]
   [1785, 2292, '30 m', 'dif. altura 0.00..0.24', [-914, 72]]
   [2005, 2960, '4 m', 'dif. altura 0.04..0.08', [-903, 53]]
   [2297, 2504, '10 m', 'dif. altura 0.00..0.13', [-881, 34]]
SONDA CALZADAS OK
```

### 5. herramientas/sonda_calzadas.py -1250 9 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [309, 'Calle Timanfaya', 'unclassified', 8, '', 5, -1255, 8, 16.83, 16.83, 3]
   [310, '', 'unclassified', 8, 'hundida,tunel', 26, -1232, -10, 13, 17.59, 2]
   [312, 'Calle Timanfaya', 'unclassified', 8, '', 7, -1254, 4, 16.89, 16.89, 3]
   [314, 'Calle Timanfaya', 'residential', 7.9, '', 13, -1257, 20, 16.69, 16.69, 9]
   [315, 'Calle Garajonay', 'residential', 7.9, '', 20, -1235, 23, 17.46, 17.46, 2]
   [1793, 'Calle Espinero', 'unclassified', 7.9, '', 26, -1242, -16, 17.34, 17.34, 10]
   [1795, 'Calle Mencey Izora', 'residential', 7.9, '', 12, -1251, 21, 16.89, 16.89, 7]
   [1805, 'Calle Mencey Izora', 'residential', 7.9, '', 13, -1257, 20, 16.69, 16.69, 7]
   [2478, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 38, -1239, -27, 17.43, 17.43, 58]
   [3283, '', 'unclassified', 8, 'hundida', 7, -1254, 3, 16.9, 16.9, 5]
   [3749, '', 'footway', 2.4, 'hundida,tunel', 26, -1234, -11, 15.21, 17.53, 2]
   [3751, '', 'footway', 2.4, 'hundida', 22, -1236, -8, 15.8, 17.5, 2]
   [3752, '', 'footway', 2.4, '', 13, -1263, 8, 16.59, 16.59, 11]
   [3753, '', 'footway', 2.4, '', 21, -1270, 14, 16.33, 16.33, 9]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [309, 312, '8 m', 'dif. altura 0.02..0.08', [-1255, 10]]
   [309, 1805, '10 m', 'dif. altura 0.00..0.07', [-1257, 20]]
   [310, 1793, '10 m', 'dif. altura 5.22..7.18', [-1230, -11]]
   [310, 2478, '8 m', 'dif. altura 7.44..7.61', [-1222, -16]]
   [310, 3283, '2 m', 'dif. altura 0.00..0.00', [-1232, -10]]
   [312, 1793, '8 m', 'dif. altura 0.01..0.11', [-1253, -13]]
   [312, 3283, '10 m', 'dif. altura 0.02..0.09', [-1254, 2]]
   [314, 1795, '8 m', 'dif. altura 0.03..0.14', [-1257, 22]]
   [314, 1805, '2 m', 'dif. altura 0.00..0.00', [-1257, 20]]
   [315, 1795, '6 m', 'dif. altura 0.02..0.07', [-1235, 28]]
   [1793, 3283, '6 m', 'dif. altura 3.40..4.33', [-1238, -14]]
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-1250_9_arriba.jpg, calzadas_-1250_9_calle0.jpg, calzadas_-1250_9_calle1.jpg, calzadas_-909_45_arriba.jpg, calzadas_-909_45_calle0.jpg, calzadas_-909_45_calle1.jpg, calzadas_-998_121_arriba.jpg, calzadas_-998_121_calle0.jpg, calzadas_-998_121_calle1.jpg, calzadas_146_1259_arriba.jpg, calzadas_146_1259_calle0.jpg, calzadas_146_1259_calle1.jpg, sonda_solapes.txt
