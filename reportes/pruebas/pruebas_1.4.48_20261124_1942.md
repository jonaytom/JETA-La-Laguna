# Pruebas 1.4.48 — 2026-11-24 19:42 — 1/2 OK

Listas: edif. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 57 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_trinidad_rampas.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_que_es.py -199 318 1.7 -180 290 1.5` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/sonda_trinidad_rampas.py — OK

```
RAMPAS {"ok":true,"rampA":true,"rampB":true,"pz":true,"A":731,"B":736,"anchoA":4,"anchoB":4}
```

### 2. herramientas/sonda_que_es.py -199 318 1.7 -180 290 1.5 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '0')\n    at Be.getX (http://localhost:8765/three.module.min.js:2:95116)\n    at w.fromBufferAttribute (http://localhost:8765/three.module.min.js:2:23334)\n    at $t.getVertexPosition (http://localhost:8765/three.module.min.js:2:149163)\n    at Sx (http://localhost:8765/three.module.min.js:2:151459)\n    at $t._computeInterse
```
