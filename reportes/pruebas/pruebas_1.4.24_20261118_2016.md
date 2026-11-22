# Pruebas 1.4.24 — 2026-11-18 20:16 — 2/4 OK

Listas: v1424c. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 356 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_trazada.py` | **FALLA** | 0 s |
| 2 | `prueba_1422.py` | **FALLA** | 0 s |
| 3 | `prueba_1424.py` | **OK** | 328 s |
| 4 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_trazada.py — FALLA

```
{'done': True, 'minBin': -1.7500825754670704, 'minPark': 0.22083515524067898, 'entry': 1, 'inside': 46.74262436896879, 'peak': 22.680895532230352}
TRAZADA Y OBSTACULOS FALLA
```

### 2. prueba_1422.py — FALLA

```
{'cornerError': 0, 'route': 75, 'drive': {'maxYaw': 1.350000000000011, 'maxYawAcc': 80.99999999999997, 'maxSteer': 1.8000000000000016, 'x': 31.94841499248971, 'z': 248.16282146135157, 'progress': 1544.606834364771, 'secs': 240, 'len': 1906.2746526349722, 'maxDec': 617.1199609333926, 'minRadius': 3.4829809049903955, 'drift': 0.20155700697950038, 'hbFrames': 427, 'done': False}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
MISMA_CURVA_CON_NODOS_EXTRA OK
PERSECUCION_TERMINA FALLA
CARROCERIA_Y_RUEDAS_SIN_SALTOS FALLA
SIN_FRENAZOS_EN_SECO FALLA
CURVAS_CON_RADIO FALLA
DERRAPA_EN_CURVAS OK
CAMPOS_VALLADOS OK
CANCHAS_VALLADAS OK
BOTONES_TACTILES OK
errores []
PRUEBA 1422 FALLA
```

### 3. prueba_1424.py — OK

```
1280 720 False {'visible': True, 'name': True, 'separate': True}
640 360 False {'visible': True, 'name': True, 'separate': True}
740 360 True {'visible': True, 'name': True, 'separate': True}
PRUEBA 1424 OK
```

### 4. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 43, 'peor': 81, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: velocimetro_1424.jpg
