# Pruebas 1.4.52 — 2026-11-25 17:25 — 0/1 OK

Listas: tmp_f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 63 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_que_es.py -1575 -640 14 -1555 -618 1` | **FALLA** | 1 s |

## Detalle

### 1. herramientas/sonda_que_es.py -1575 -640 14 -1555 -618 1 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '0')\n    at Be.getX (http://localhost:8765/three.module.min.js:2:95116)\n    at w.fromBufferAttribute (http://localhost:8765/three.module.min.js:2:23334)\n    at $t.getVertexPosition (http://localhost:8765/three.module.min.js:2:149163)\n    at Sx (http://localhost:8765/three.module.min.js:2:151459)\n    at $t._computeInterse
```
