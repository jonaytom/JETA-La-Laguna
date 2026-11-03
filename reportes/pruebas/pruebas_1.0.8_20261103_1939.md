# Pruebas 1.0.8 — 2026-11-03 19:39 — 6/6 OK

Listas: v1008a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 109 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_carpeta.py` | **OK** | 71 s |
| 3 | `herramientas/sonda_rampas.py` | **OK** | 10 s |
| 4 | `herramientas/sonda_hueco.py 256 -552 30` | **OK** | 2 s |
| 5 | `herramientas/sonda_hueco.py 124 -637 30` | **OK** | 2 s |
| 6 | `herramientas/sonda_hueco.py 378 -270 30` | **OK** | 1 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 27, 'peor': 94, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_carpeta.py — OK

```
carpeta {'datos': True, 'calles': 5571, 'edificios': 9318, 'version': 'v1.0.8'}
errores []
CARPETA OK
```

### 3. herramientas/sonda_rampas.py — OK

```
calles por encima de una rampa o trinchera abierta: 5
  0: X 249, Y -557 · (sin nombre) (service) · rampa 1.5 m más abajo
  1: X 145, Y -625 · (sin nombre) (service) · rampa 4.2 m más abajo
  2: X 142, Y -626 · (sin nombre) (service) · rampa 4 m más abajo
  3: X 135, Y -628 · (sin nombre) (service) · rampa 2.7 m más abajo
  4: X 133, Y -637 · (sin nombre) (footway) · rampa 1.6 m más abajo
SONDA RAMPAS OK
```

### 4. herramientas/sonda_hueco.py 256 -552 30 — OK

```
planta (4, [[1925, 276, -554, 0, 13], [3829, 280, -545, 0, 10], [3830, 282, -559, 0, 24], [3831, 276, -572, 0, 11]])
pintados (4, [[276, -554, '', 4], [279, -545, '', 8], [282, -559, '', 8], [276, -572, '', 4]])
quitados (0, [])
calles (4, [[843, 'Plaza del Cristo', 'residential', 7.5], [1824, 'Calle Nava y Grimón', 'tertiary', 10.4], [3589, 'Plaza del Cristo', 'residential', 7.2], [3590, '', 'service', 5.2]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

### 5. herramientas/sonda_hueco.py 124 -637 30 — OK

```
planta (1, [[4598, 147, -654, 0, 15]])
pintados (1, [[147, -654, '', 8]])
quitados (0, [])
calles (5, [[339, 'Camino de las Peras', 'secondary', 11.7], [3591, '', 'service', 5.2], [3676, '', 'service', 5.2], [3746, 'Camino de las Peras', 'secondary', 11.7], [4673, '', 'footway', 2.4]])
areas (1, [[156, 'parking', '', 99, -636]])
vaciadas 0
SONDA HUECO OK
```

### 6. herramientas/sonda_hueco.py 378 -270 30 — OK

```
planta (0, [])
pintados (0, [])
quitados (0, [])
calles (1, [[2576, 'Vía de Ronda de La Laguna', 'primary', 13]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco_124_-637.jpg, hueco_124_-637_calle0.jpg, hueco_124_-637_calle1.jpg, hueco_256_-552.jpg, hueco_256_-552_calle0.jpg, hueco_256_-552_calle1.jpg, hueco_378_-270.jpg, hueco_378_-270_calle0.jpg, hueco_378_-270_calle1.jpg, rampa_0.jpg, rampa_1.jpg, rampa_2.jpg, rampa_3.jpg, rampa_4.jpg
