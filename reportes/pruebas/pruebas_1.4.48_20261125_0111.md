# Pruebas 1.4.48 — 2026-11-25 01:11 — 0/1 OK

Listas: tmp_mision. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 53 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_inicio_mision.py 'Atraco en la farmacia'` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/sonda_inicio_mision.py 'Atraco en la farmacia' — FALLA

```
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading 'title')\n    at placeStarts (http://localhost:8765/test.html?q=baja:59663:86)\n    at Object._setIdx (http://localhost:8765/test.html?q=baja:60276:7)\n    at eval (eval at evaluate (:311:30), <anonymous>:3:9)\n    at eval (eval at evaluate (:311:30), <anonymous>:7:21)\n    at UtilityScript.evaluate (<anonymous>:318:18)\
```
