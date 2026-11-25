# Pruebas 1.4.48 — 2026-11-24 19:20 — 1/2 OK

Listas: edif. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 58 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_edificio_en.py 20 235 40` | **OK** | 0 s |
| 2 | `herramientas/sonda_que_es.py -35 240 30 -17 216 0` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/sonda_edificio_en.py 20 235 40 — OK

```
EDIF ['B', 833, -10, 254, 2154, 0]
EDIF ['B', 841, 3, 219, 314, 0]
EDIF ['BUILD', -10, 254, 2111, 0, '']
EDIF ['BUILD', 2, 220, 296, 0, '']
```

### 2. herramientas/sonda_que_es.py -35 240 30 -17 216 0 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '0')\n    at Be.getX (http://localhost:8765/three.module.min.js:2:95116)\n    at w.fromBufferAttribute (http://localhost:8765/three.module.min.js:2:23334)\n    at $t.getVertexPosition (http://localhost:8765/three.module.min.js:2:149163)\n    at Sx (http://localhost:8765/three.module.min.js:2:151459)\n    at $t._computeInterse
```
