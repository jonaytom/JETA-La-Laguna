# Pruebas 1.0.6 — 2026-11-03 19:20 — 2/2 OK

Listas: v1006a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 78 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_hueco.py -563 -298 40` | **OK** | 57 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 23, 'peor': 128, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. herramientas/sonda_hueco.py -563 -298 40 — OK

```
planta (1, [[1210, -568, -278, 0, 42]])
pintados (1, [[-568, -278, '', 4]])
quitados (0, [])
calles (8, [[73, 'Calle las Candilas', 'service', 5.2], [218, 'Calle Hermanos Marrero', 'residential', 7.5], [751, 'Plaza del Doctor Olivera', 'pedestrian', 6], [1199, 'Calle San Antonio', 'residential', 7.5], [2270, 'Calle Marqués de Celada', 'residential', 7.5], [2517, 'Calle Marqués de Celada', 'residential', 7.5], [3109, '', 'steps', 2.4], [3507, 'Plaza del Doctor Olivera', 'pedestrian', 6]])
areas (2, [[1255, 'playground', '', -564, -301], [1488, 'square', 'Plaza del Doctor Olivera', -522, -293]])
vaciadas 0
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco_-563_-298.jpg, hueco_-563_-298_calle0.jpg, hueco_-563_-298_calle1.jpg
