# Pruebas 1.1.0 — 2026-11-03 20:39 — 4/4 OK

Listas: v1100a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 101 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_carpeta.py` | **OK** | 71 s |
| 3 | `herramientas/sonda_caidas.py -3292 -161 120` | **OK** | 8 s |
| 4 | `herramientas/sonda_caidas.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 124, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_carpeta.py — OK

```
carpeta {'datos': True, 'calles': 5571, 'edificios': 9318, 'version': 'v1.1.0'}
errores []
CARPETA OK
```

### 3. herramientas/sonda_caidas.py -3292 -161 120 — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```

### 4. herramientas/sonda_caidas.py — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```
