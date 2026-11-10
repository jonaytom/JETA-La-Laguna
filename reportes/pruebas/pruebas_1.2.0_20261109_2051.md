# Pruebas 1.2.0 — 2026-11-09 20:51 — 4/4 OK

Listas: honorato. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 88 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_120.py` | **OK** | 6 s |
| 2 | `herramientas/sonda_calzadas.py -998 121 45` | **OK** | 57 s |
| 3 | `herramientas/sonda_calzadas.py -970 112 35` | **OK** | 2 s |
| 4 | `herramientas/sonda_alturas.py -975 112 30` | **OK** | 0 s |

## Detalle

### 1. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 62, 'walls': 217, 'cuts': 12, 'floor': 2123, 'acera': 59, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 3, 'twins': 2, 'estrechadas': 4, 'misma_altura': 0, 'anchos': [[4.5, 4.5], [4.5, 4.5]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 62, 'walls': 217, 'cuts': 12, 'floor': 2123, 'acera': 59, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 2. herramientas/sonda_calzadas.py -998 121 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [189, 'Calle Eduardo Westerdahl', 'residential', 4.5, '', 16, -997, 137, 9.6, 9.6, 9]
   [1638, 'Camino el Vallado', 'tertiary', 4.5, '', 10, -988, 119, 8.76, 8.76, 2]
   [1767, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 10, -988, 119, 8.76, 8.76, 11]
   [2373, '', 'tertiary', 4.5, '', 6, -995, 115, 9.2, 9.2, 2]
   [2512, 'Camino el Vallado', 'residential', 4.5, '', 26, -1002, 146, 10.08, 10.08, 11]
   [3048, 'Camino de la Villa', 'residential', 7.9, '', 36, -990, 156, 9.51, 9.51, 4]
   [3049, '', 'motorway_link', 7.8, '', 23, -1014, 105, 10.64, 10.64, 9]
   [3050, '', 'tertiary', 4.5, '', 8, -992, 127, 9.14, 9.14, 2]
   [3051, '', 'tertiary', 4.5, '', 9, -990, 124, 8.93, 8.93, 2]
   [3052, '', 'tertiary', 11.7, '', 23, -1014, 105, 10.64, 10.64, 10]
   [3053, 'Camino de la Villa', 'residential', 8, '', 35, -1023, 145, 11.78, 11.78, 8]
   [3063, '', 'tertiary', 11.7, '', 7, -997, 114, 9.38, 9.38, 5]
   [3064, '', 'tertiary', 11.7, '', 4, -995, 119, 9.24, 9.24, 4]
   [3065, '', 'tertiary', 11.7, '', 9, -994, 129, 9.3, 9.3, 3]
   [3067, '', 'tertiary', 11.7, '', 26, -1007, 146, 10.49, 10.49, 4]
   [3068, '', 'tertiary', 11.7, '', 16, -997, 137, 9.6, 9.6, 3]
   [3759, '', 'tertiary_link', 7.8, '', 34, -1030, 111, 12.07, 12.07, 4]
   [4609, '', 'footway', 2.4, '', 39, -963, 137, 7.71, 7.71, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [189, 3068, '8 m', 'dif. altura 0.08..0.30', [-993, 142]]
   [1638, 2373, '2 m', 'dif. altura 0.00..0.00', [-988, 119]]
   [2373, 3064, '6 m', 'dif. altura 0.07..0.21', [-993, 117]]
   [2512, 3048, '16 m', 'dif. altura 0.00..0.10', [-992, 151]]
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

### 3. herramientas/sonda_calzadas.py -970 112 35 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [68, 'Camino el Vallado', 'tertiary', 10.4, 'hundida,tunel', 29, -947, 93, -0.11, 6.56, 2]
   [1638, 'Camino el Vallado', 'tertiary', 4.5, '', 19, -988, 119, 8.76, 8.76, 2]
   [1767, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 3, -969, 115, 6.8, 7.6, 11]
   [2373, '', 'tertiary', 4.5, '', 19, -988, 119, 8.76, 8.76, 2]
   [2467, '', 'motorway_link', 7.8, '', 31, -955, 85, 6.8, 6.8, 13]
   [3050, '', 'tertiary', 4.5, '', 24, -990, 125, 8.97, 8.97, 2]
   [3051, '', 'tertiary', 4.5, '', 19, -988, 119, 8.76, 8.76, 2]
   [3063, '', 'tertiary', 11.7, '', 28, -997, 114, 9.38, 9.38, 5]
   [3064, '', 'tertiary', 11.7, '', 26, -994, 120, 9.22, 9.22, 4]
   [3065, '', 'tertiary', 11.7, '', 29, -994, 129, 9.3, 9.3, 3]
   [4608, '', 'footway', 2.4, '', 24, -948, 104, 6.67, 6.67, 2]
   [4609, '', 'footway', 2.4, '', 17, -955, 119, 7.09, 7.09, 3]
   [4615, '', 'footway', 2.4, '', 25, -946, 106, 6.63, 6.63, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [68, 2467, '4 m', 'dif. altura 6.89..7.14', [-945, 90]]
   [1638, 2373, '2 m', 'dif. altura 0.00..0.00', [-988, 119]]
   [2373, 3064, '6 m', 'dif. altura 0.07..0.21', [-993, 117]]
   [2467, 2458, '20 m', 'dif. altura 0.20..0.24', [-968, 78]]
   [3050, 3051, '2 m', 'dif. altura 0.11..0.11', [-991, 126]]
   [3050, 3064, '4 m', 'dif. altura 0.00..0.09', [-994, 129]]
   [3065, 189, '2 m', 'dif. altura 0.13..0.13', [-996, 134]]
SONDA CALZADAS OK
```

### 4. herramientas/sonda_alturas.py -975 112 30 — OK

```
{"ri": 1638, "nombre": "Camino el Vallado", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -988, 119, 8.76, 8.76, 0]
{"ri": 1767, "nombre": "Camino el Vallado", "tipo": 7, "ancho": 10.4, "flags": 0, "raise": false, "span": null, "dep": true, "grade": false}
     [4, -950, 96, 0.58, 6.66, 0]
     [6, -950, 98, 0.92, 6.71, 0]
     [10, -953, 101, 1.76, 6.81, 0]
     [11, -953, 102, 2.05, 6.85, 0]
     [15, -956, 106, 2.96, 6.96, 0]
     [17, -957, 107, 3.37, 7.02, 0]
     [21, -959, 110, 4.33, 7.16, 0]
     [23, -961, 111, 4.72, 7.21, 0]
     [27, -964, 113, 5.65, 7.37, 0]
     [28, -965, 114, 5.97, 7.42, 0]
     [32, -969, 115, 6.82, 7.6, 0]
     [34, -971, 116, 7.17, 7.7, 0]
     [38, -975, 117, 7.92, 7.93, 0]
     [39, -976, 117, 8, 8, 0]
     [43, -980, 118, 8.23, 8.23, 0]
     [44, -981, 118, 8.29, 8.29, 0]
     [48, -985, 118, 8.52, 8.52, 0]
     [48, -985, 119, 8.56, 8.56, 0]
{"ri": 2373, "nombre": "", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -988, 119, 8.76, 8.76, 0]
     [4, -992, 117, 8.98, 8.98, 0]
     [8, -995, 115, 9.2, 9.2, 0]
{"ri": 3050, "nombre": "", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -994, 129, 9.3, 9.3, 0]
     [4, -991, 126, 9.07, 9.07, 0]
{"ri": 3051, "nombre": "", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -990, 125, 8.98, 8.98, 0]
     [4, -989, 121, 8.84, 8.84, 0]
{"ri": 3063, "nombre": "", "tipo": 7, "ancho": 11.7, "flags": 33, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -997, 114, 9.38, 9.38, 0]
     [4, -1000, 111, 9.55, 9.55, 0]
     [5, -1001, 110, 9.62, 9.62, 0]
     [9, -1004, 108, 9.88, 9.88, 0]
{"ri": 3064, "nombre": "", "tipo": 7, "ancho": 11.7, "flags": 33, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -994, 129, 9.3, 9.3, 0]
     [4, -994, 125, 9.25, 9.25, 0]
     [7, -994, 123, 9.22, 9.22, 0]
     [9, -994, 120, 9.22, 9.22, 0]
     [13, -996, 116, 9.3, 9.3, 0]
{"ri": 3065, "nombre": "", "tipo": 7, "ancho": 11.7, "flags": 33, "raise": false, "span": null, "dep": false, "grade": false}
     [4, -995, 133, 9.43, 9.43, 0]
     [4, -995, 133, 9.41, 9.41, 0]
SONDA ALTURAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-970_112_arriba.jpg, calzadas_-970_112_calle0.jpg, calzadas_-970_112_calle1.jpg, calzadas_-998_121_arriba.jpg, calzadas_-998_121_calle0.jpg, calzadas_-998_121_calle1.jpg
