# Pruebas 1.1.9 — 2026-11-04 20:32 — 5/5 OK

Listas: fotos119. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 189 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py -1815 -186 180 3` | **OK** | 70 s |
| 2 | `herramientas/sonda_rayos.py -2100 -200 270 3` | **OK** | 43 s |
| 3 | `herramientas/sonda_rayos.py -3292 -160 180 3` | **OK** | 48 s |
| 4 | `herramientas/sonda_calzadas.py 309 -40 45` | **OK** | 2 s |
| 5 | `herramientas/sonda_calzadas.py -120 160 35` | **OK** | 2 s |

## Detalle

### 1. herramientas/sonda_rayos.py -1815 -186 180 3 — OK

```
rayos desde X -1815, Y -186, rumbo 180° (cosas a más de 3 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
SONDA RAYOS OK
```

### 2. herramientas/sonda_rayos.py -2100 -200 270 3 — OK

```
rayos desde X -2100, Y -200, rumbo 270° (cosas a más de 3 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     1  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-2264, -250, 4.1, 171]]
SONDA RAYOS OK
```

### 3. herramientas/sonda_rayos.py -3292 -160 180 3 — OK

```
rayos desde X -3292, Y -160, rumbo 180° (cosas a más de 3 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     5  facade | finalizeChunks < boot | chunk:facade   [[-3275, -320, 34.5, 169], [-3275, -320, 21.9, 165], [-3261, -334, 27.3, 183], [-3275, -319, 9.7, 163], [-3262, -334, 14.1, 179]]
     3  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-3275, -213, 5.9, 57], [-3272, -213, 6, 57], [-3259, -225, 3.8, 73]]
SONDA RAYOS OK
```

### 4. herramientas/sonda_calzadas.py 309 -40 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [520, '', 'primary_link', 9.1, 'elevada', 6, 303, -40, -10.26, -11.07, 6]
   [821, '', 'primary_link', 9.1, '', 3, 311, -37, -9.88, -9.88, 8]
   [834, '', 'residential', 7.5, '', 34, 275, -38, -13.12, -13.12, 6]
   [1981, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 3, 311, -37, -9.88, -9.88, 3]
   [1982, 'Vía de Ronda de La Laguna', 'primary', 13, '', 1, 310, -40, -9.94, -9.94, 2]
   [2201, 'Camino de las Estaciones', 'unclassified', 7.5, 'elevada', 21, 288, -38, -12.65, -12.65, 4]
   [2574, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 25, 305, -65, -10.46, -10.46, 9]
   [3815, 'Calle José Clavijo Fajardo', 'residential', 7.5, '', 38, 272, -47, -13.01, -13.01, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [520, 1981, '6 m', 'dif. altura 0.01..0.09', [303, -34]]
   [520, 1982, '30 m', 'dif. altura 0.02..0.72', [304, -63]]
   [520, 2574, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [821, 1981, '42 m', 'dif. altura 0.10..1.39', [332, -3]]
   [834, 3815, '12 m', 'dif. altura 0.00..0.07', [272, -47]]
   [1981, 1982, '2 m', 'dif. altura 0.00..0.00', [311, -37]]
   [1982, 2574, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [3815, 576, '2 m', 'dif. altura 0.29..0.29', [265, -47]]
SONDA CALZADAS OK
```

### 5. herramientas/sonda_calzadas.py -120 160 35 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [2481, 'Avenida de La Trinidad', 'secondary', 6.6, '', 3, -123, 159, -6.19, -6.19, 37]
   [2501, 'Avenida de La Trinidad', 'secondary', 6.6, '', 18, -137, 153, -6.33, -6.33, 37]
   [3879, '', 'footway', 2.4, '', 6, -126, 161, -6.28, -6.28, 3]
   [3880, '', 'footway', 2.4, '', 14, -133, 158, -6.37, -6.37, 2]
   [3881, '', 'footway', 2.4, '', 4, -124, 162, -6.25, -6.25, 2]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-120_160_arriba.jpg, calzadas_-120_160_calle0.jpg, calzadas_-120_160_calle1.jpg, calzadas_309_-40_arriba.jpg, calzadas_309_-40_calle0.jpg, calzadas_309_-40_calle1.jpg, rayos_-1815_-186_180.jpg, rayos_-1815_-186_180.txt, rayos_-2100_-200_270.jpg, rayos_-2100_-200_270.txt, rayos_-3292_-160_180.jpg, rayos_-3292_-160_180.txt
