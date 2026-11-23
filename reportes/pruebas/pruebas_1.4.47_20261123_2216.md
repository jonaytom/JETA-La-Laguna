# Pruebas 1.4.47 — 2026-11-23 22:16 — 0/1 OK

Listas: alturas. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 68 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_alturas_suelo.py` | **FALLA** | 1 s |

## Detalle

### 1. herramientas/sonda_alturas_suelo.py — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading 'matrixWorld')\n    at zd.raycast (http://localhost:8765/three.module.min.js:2:139888)\n    at q1 (http://localhost:8765/three.module.min.js:6:115022)\n    at u_.intersectObjects (http://localhost:8765/three.module.min.js:6:114876)\n    at eval (eval at evaluate (:311:30), <anonymous>:5:27)\n    at UtilityScript.evaluate (<an
error: THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.
```
