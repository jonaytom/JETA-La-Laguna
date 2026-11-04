# Pruebas 1.1.8 — 2026-11-04 16:10 — 0/7 OK

Listas: origen. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 142 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py 105 -45 0` | **FALLA** | 1 s |
| 2 | `herramientas/sonda_rayos.py 105 -45 90` | **FALLA** | 60 s |
| 3 | `herramientas/sonda_rayos.py 105 -45 180` | **FALLA** | 4 s |
| 4 | `herramientas/sonda_rayos.py 105 -45 270` | **FALLA** | 0 s |
| 5 | `herramientas/sonda_rayos.py -60 -230 32` | **FALLA** | 5 s |
| 6 | `herramientas/sonda_rayos.py -191 366 0 2` | **FALLA** | 20 s |
| 7 | `herramientas/sonda_rayos.py -191 366 180 2` | **FALLA** | 24 s |

## Detalle

### 1. herramientas/sonda_rayos.py 105 -45 0 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '19548')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycas
```

### 2. herramientas/sonda_rayos.py 105 -45 90 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '26214')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycas
```

### 3. herramientas/sonda_rayos.py 105 -45 180 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '26376')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycas
```

### 4. herramientas/sonda_rayos.py 105 -45 270 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '5838')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycast
```

### 5. herramientas/sonda_rayos.py -60 -230 32 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '10662')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycas
```

### 6. herramientas/sonda_rayos.py -191 366 0 2 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '1092')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycast
```

### 7. herramientas/sonda_rayos.py -191 366 180 2 — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading '2454')\n    at vs.getX (http://localhost:8765/three.module.min.js:6:102060)\n    at ti.fromBufferAttribute (http://localhost:8765/three.module.min.js:6:9645)\n    at js (http://localhost:8765/three.module.min.js:6:119216)\n    at Xs._computeIntersections (http://localhost:8765/three.module.min.js:6:118697)\n    at Xs.raycast
```
