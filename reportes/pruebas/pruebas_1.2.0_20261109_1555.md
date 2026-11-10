# Pruebas 1.2.0 — 2026-11-09 15:55 — 3/4 OK

Listas: honorato. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 80 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_120.py` | **FALLA** | 5 s |
| 2 | `herramientas/sonda_calzadas.py -998 121 45` | **OK** | 52 s |
| 3 | `herramientas/sonda_calzadas.py -970 112 35` | **OK** | 2 s |
| 4 | `herramientas/sonda_alturas.py -975 112 30` | **OK** | 0 s |

## Detalle

### 1. prueba_120.py — FALLA

```
corredores {'twins': 2, 'estrechadas': 4, 'misma_altura': 2, 'anchos': [[4.5, 4.5], [4.5, 4.5]], 'dif': 0.88, 'donde': [-956, 103]}
SAN_HONORATO FALLA
errores []
PRUEBA 120 FALLA
```

### 2. herramientas/sonda_calzadas.py -998 121 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [189, 'Calle Eduardo Westerdahl', 'residential', 4.5, '', 16, -997, 137, 9.6, 9.6, 9]
   [1638, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 43, -956, 110, 3.11, 7.03, 3]
   [2373, '', 'tertiary', 4.5, 'hundida', 7, -996, 114, 9.28, 9.28, 9]
   [2512, 'Camino el Vallado', 'residential', 4.5, '', 26, -1002, 146, 10.08, 10.08, 11]
   [3048, 'Camino de la Villa', 'residential', 7.9, '', 36, -990, 156, 9.51, 9.51, 4]
   [3049, '', 'motorway_link', 7.8, '', 23, -1014, 105, 10.64, 10.64, 9]
   [3050, '', 'tertiary', 10.4, '', 8, -992, 127, 9.14, 9.14, 2]
   [3051, '', 'tertiary', 4.5, 'hundida', 9, -990, 125, 8.97, 8.97, 7]
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
   [189, 3068, '8 m', 'dif. altura 0.08..0.30', [-993, 142]]
   [1638, 3051, '4 m', 'dif. altura 0.11..0.29', [-956, 110]]
   [2373, 3064, '8 m', 'dif. altura 0.10..0.41', [-990, 116]]
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
   [68, 'Camino el Vallado', 'tertiary', 10.4, 'hundida,tunel', 29, -947, 93, -0.28, 6.56, 2]
   [1638, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 14, -956, 110, 3.11, 7.03, 3]
   [1767, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 24, -950, 98, 0.59, 6.71, 2]
   [2373, '', 'tertiary', 4.5, 'hundida', 0, -970, 112, 5.71, 7.61, 9]
   [2467, '', 'motorway_link', 7.8, '', 31, -955, 85, 6.8, 6.8, 13]
   [3050, '', 'tertiary', 10.4, '', 24, -990, 125, 8.97, 8.97, 2]
   [3051, '', 'tertiary', 4.5, 'hundida', 6, -969, 118, 5.82, 7.62, 7]
   [3063, '', 'tertiary', 11.7, '', 28, -997, 114, 9.38, 9.38, 5]
   [3064, '', 'tertiary', 11.7, '', 26, -994, 120, 9.22, 9.22, 4]
   [3065, '', 'tertiary', 11.7, '', 29, -994, 129, 9.3, 9.3, 3]
   [4608, '', 'footway', 2.4, '', 24, -949, 102, 6.67, 6.67, 2]
   [4609, '', 'footway', 2.4, '', 17, -955, 119, 7.09, 7.09, 3]
   [4615, '', 'footway', 2.4, '', 17, -954, 118, 7.07, 7.07, 5]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [68, 2467, '4 m', 'dif. altura 7.01..7.22', [-945, 90]]
   [1638, 2373, '8 m', 'dif. altura 0.00..0.12', [-953, 105]]
   [1638, 3051, '6 m', 'dif. altura 0.11..0.68', [-956, 110]]
   [2373, 3064, '8 m', 'dif. altura 0.10..0.41', [-990, 116]]
   [2467, 2458, '20 m', 'dif. altura 0.20..0.24', [-968, 78]]
   [3050, 3051, '2 m', 'dif. altura 0.11..0.11', [-991, 126]]
   [3050, 3064, '4 m', 'dif. altura 0.00..0.09', [-994, 129]]
   [3065, 189, '2 m', 'dif. altura 0.13..0.13', [-996, 134]]
SONDA CALZADAS OK
```

### 4. herramientas/sonda_alturas.py -975 112 30 — OK

```
{"ri": 1638, "nombre": "Camino el Vallado", "tipo": 7, "ancho": 10.4, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [0, -956, 110, 3.11, 7.03, 0]
     [4, -954, 107, 2.28, 6.9, 0]
     [8, -952, 104, 1.55, 6.8, 0]
     [12, -951, 100, 0.86, 6.73, 0]
{"ri": 1767, "nombre": "Camino el Vallado", "tipo": 7, "ancho": 10.4, "flags": 0, "raise": false, "span": null, "dep": true, "grade": false}
     [4, -950, 96, 0.29, 6.66, 0]
{"ri": 2373, "nombre": "", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [0, -950, 98, 0.59, 6.71, 0]
     [4, -954, 100, 1.32, 6.84, 0]
     [6, -955, 102, 1.66, 6.9, 0]
     [10, -958, 104, 2.46, 7.02, 0]
     [13, -960, 107, 3.11, 7.12, 0]
     [17, -963, 109, 3.98, 7.27, 0]
     [19, -965, 111, 4.48, 7.36, 0]
     [23, -968, 112, 5.35, 7.52, 0]
     [26, -971, 113, 6.01, 7.69, 0]
     [30, -975, 114, 6.87, 7.92, 0]
     [33, -978, 114, 7.4, 8.07, 0]
     [37, -982, 115, 8.12, 8.3, 0]
     [41, -986, 115, 8.55, 8.55, 0]
     [41, -986, 116, 8.58, 8.58, 0]
     [45, -990, 116, 8.86, 8.86, 0]
     [47, -992, 116, 8.99, 8.99, 0]
     [51, -996, 114, 9.25, 9.25, 0]
{"ri": 3050, "nombre": "", "tipo": 7, "ancho": 10.4, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -994, 129, 9.3, 9.3, 0]
     [4, -991, 126, 9.07, 9.07, 0]
{"ri": 3051, "nombre": "", "tipo": 7, "ancho": 4.5, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [0, -990, 125, 8.98, 8.98, 0]
     [4, -987, 123, 8.72, 8.72, 0]
     [5, -986, 123, 8.67, 8.67, 0]
     [9, -982, 121, 8.4, 8.42, 0]
     [10, -981, 121, 8.26, 8.37, 0]
     [14, -978, 120, 7.55, 8.14, 0]
     [18, -974, 119, 6.83, 7.9, 0]
     [22, -970, 118, 6.01, 7.67, 0]
     [25, -966, 118, 5.27, 7.51, 0]
     [29, -963, 116, 4.53, 7.35, 0]
     [29, -962, 116, 4.52, 7.34, 0]
     [33, -959, 114, 3.94, 7.19, 0]
     [37, -957, 111, 3.15, 7.06, 0]
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
