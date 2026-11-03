# Pruebas 1.0.8 — 2026-11-03 19:35 — 4/4 OK

Listas: v1008a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 84 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_rampas.py` | **OK** | 59 s |
| 3 | `herramientas/sonda_hueco.py 256 -552 30` | **OK** | 2 s |
| 4 | `herramientas/sonda_hueco.py 124 -637 30` | **OK** | 1 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 125, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. herramientas/sonda_rampas.py — OK

```
  1: X 1050, Y 2522 · (sin nombre) (footway) · rampa 6.1 m más abajo
  2: X 1221, Y 2360 · (sin nombre) (motorway_link) · rampa 5.7 m más abajo
  3: X 1220, Y 2366 · (sin nombre) (motorway_link) · rampa 5.1 m más abajo
  4: X 1218, Y 2375 · (sin nombre) (motorway_link) · rampa 4 m más abajo
  5: X 1215, Y 2380 · (sin nombre) (motorway_link) · rampa 3.3 m más abajo
  6: X 1211, Y 2385 · (sin nombre) (motorway_link) · rampa 2.8 m más abajo
  7: X 1204, Y 2389 · (sin nombre) (motorway_link) · rampa 1.8 m más abajo
  8: X 632, Y -1148 · Camino La Rúa (residential) · rampa 4 m más abajo
  9: X 629, Y -1145 · Camino La Rúa (residential) · rampa 3.7 m más abajo
  10: X 625, Y -1139 · Camino La Rúa (residential) · rampa 3.5 m más abajo
  11: X 630, Y -1146 · Calle Félix Torres (residential) · rampa 3.8 m más abajo
  12: X 623, Y -1135 · Camino La Rúa (residential) · rampa 2.9 m más abajo
  13: X 621, Y -1125 · Camino La Rúa (residential) · rampa 1.5 m más abajo
  14: X -1233, Y -13 · Calle Espinero (unclassified) · rampa 4.6 m más abajo
  15: X -1236, Y -8 · (sin nombre) (unclassified) · rampa 4.5 m más abajo
  16: X -1235, Y -8 · (sin nombre) (unclassified) · rampa 4.5 m más abajo
  17: X -1236, Y -8 · (sin nombre) (footway) · rampa 4.5 m más abajo
  18: X -1235, Y -9 · (sin nombre) (footway) · rampa 4.5 m más abajo
  19: X -1188, Y -34 · (sin nombre) (unclassified) · rampa 4.3 m más abajo
  20: X -1187, Y -35 · (sin nombre) (unclassified) · rampa 4.3 m más abajo
  21: X -1185, Y -36 · (sin nombre) (unclassified) · rampa 4.3 m más abajo
  22: X -1193, Y -28 · Autopista del Norte (motorway) · rampa 5.6 m más abajo
  23: X -1191, Y -35 · (sin nombre) (footway) · rampa 5 m más abajo
  24: X -1190, Y -35 · (sin nombre) (footway) · rampa 4.7 m más abajo
  25: X -1185, Y -36 · (sin nombre) (footway) · rampa 4.3 m más abajo
  26: X 2205, Y 3237 · (sin nombre) (unclassified) · rampa 6.6 m más abajo
  27: X 2207, Y 3237 · (sin nombre) (unclassified) · rampa 6.4 m más abajo
  28: X 2217, Y 3239 · (sin nombre) (unclassified) · rampa 4.8 m más abajo
  29: X 2218, Y 3243 · (sin nombre) (service) · rampa 4.3 m más abajo
  30: X 2228, Y 3240 · (sin nombre) (unclassified) · rampa 2.8 m más abajo
  31: X 2148, Y 3212 · (sin nombre) (unclassified) · rampa 1.6 m más abajo
  32: X 2149, Y 3215 · (sin nombre) (unclassified) · rampa 2.1 m más abajo
  33: X 2155, Y 3225 · (sin nombre) (unclassified) · rampa 3.5 m más abajo
  34: X 2156, Y 3225 · (sin nombre) (unclassified) · rampa 3.4 m más abajo
  35: X 2166, Y 3229 · (sin nombre) (unclassified) · rampa 5.1 m más abajo
  36: X 1037, Y 2388 · (sin nombre) (motorway_link) · rampa 6 m más abajo
  37: X 1031, Y 2519 · (sin nombre) (motorway_link) · rampa 5.9 m más abajo
  38: X 1031, Y 2513 · (sin nombre) (footway) · rampa 6.2 m más abajo
  39: X 537, Y 1371 · Vía de Ronda de La Laguna (primary) · rampa 4 m más abajo
  40: X 534, Y 1371 · Vía de Ronda de La Laguna (primary) · rampa 3.6 m más abajo
  41: X 523, Y 1375 · Vía de Ronda de La Laguna (primary) · rampa 2.1 m más abajo
  42: X 700, Y 1329 · (sin nombre) (secondary) · rampa 5.7 m más abajo
  43: X 695, Y 1332 · (sin nombre) (secondary) · rampa 6.1 m más abajo
  44: X 700, Y 1329 · Avenida de los Menceyes (secondary) · rampa 5.7 m más abajo
  45: X 694, Y 1326 · Avenida de los Menceyes (secondary) · rampa 6.4 m más abajo
  46: X 693, Y 1325 · Avenida de los Menceyes (secondary) · rampa 6.6 m más abajo
  47: X 693, Y 1318 · (sin nombre) (primary_link) · rampa 6.8 m más abajo
  48: X 714, Y 1314 · Vía de Ronda de La Laguna (primary) · rampa 3.9 m más abajo
  49: X 713, Y 1315 · Vía de Ronda de La Laguna (primary) · rampa 4 m más abajo
  50: X 705, Y 1331 · (sin nombre) (secondary) · rampa 4.9 m más abajo
  51: X 710, Y 1327 · (sin nombre) (footway) · rampa 4.2 m más abajo
  52: X 704, Y 1324 · (sin nombre) (footway) · rampa 5.2 m más abajo
  53: X 695, Y 1319 · (sin nombre) (footway) · rampa 6.6 m más abajo
  54: X 695, Y 1319 · (sin nombre) (footway) · rampa 6.6 m más abajo
  55: X 555, Y 1358 · Camino la Hornera (residential) · rampa 6.3 m más abajo
  56: X 555, Y 1361 · Camino la Hornera (residential) · rampa 6.1 m más abajo
  57: X 557, Y 1367 · Camino la Hornera (residential) · rampa 5.8 m más abajo
  58: X 555, Y 1358 · Calle las Saltonas (residential) · rampa 6.3 m más abajo
  59: X 561, Y 1365 · (sin nombre) (footway) · rampa 5.6 m más abajo
SONDA RAMPAS OK
```

### 3. herramientas/sonda_hueco.py 256 -552 30 — OK

```
planta (4, [[1925, 276, -554, 0, 13], [3829, 280, -545, 0, 10], [3830, 282, -559, 0, 24], [3831, 276, -572, 0, 11]])
pintados (4, [[276, -554, '', 4], [279, -545, '', 8], [282, -559, '', 8], [276, -572, '', 4]])
quitados (0, [])
calles (4, [[843, 'Plaza del Cristo', 'residential', 7.5], [1824, 'Calle Nava y Grimón', 'tertiary', 10.4], [3589, 'Plaza del Cristo', 'residential', 7.2], [3590, '', 'service', 5.2]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

### 4. herramientas/sonda_hueco.py 124 -637 30 — OK

```
planta (1, [[4598, 147, -654, 0, 15]])
pintados (1, [[147, -654, '', 8]])
quitados (0, [])
calles (5, [[339, 'Camino de las Peras', 'secondary', 11.7], [3591, '', 'service', 5.2], [3676, '', 'service', 5.2], [3746, 'Camino de las Peras', 'secondary', 11.7], [4673, '', 'footway', 2.4]])
areas (1, [[156, 'parking', '', 99, -636]])
vaciadas 0
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco_124_-637.jpg, hueco_124_-637_calle0.jpg, hueco_124_-637_calle1.jpg, hueco_256_-552.jpg, hueco_256_-552_calle0.jpg, hueco_256_-552_calle1.jpg, rampa_0.jpg, rampa_1.jpg, rampa_10.jpg, rampa_11.jpg, rampa_12.jpg, rampa_13.jpg, rampa_14.jpg, rampa_15.jpg, rampa_2.jpg, rampa_3.jpg, rampa_4.jpg, rampa_5.jpg, rampa_6.jpg, rampa_7.jpg, rampa_8.jpg, rampa_9.jpg
