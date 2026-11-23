# Pruebas 1.4.43 — 2026-11-23 11:37 — 3/3 OK

Listas: r1441b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 313 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 11 s |
| 2 | `prueba_1441.py` | **OK** | 1 s |
| 3 | `prueba_muerte_coche.py` | **OK** | 271 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 102, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_1441.py — OK

```
{"hits": [], "worst": 0, "steer": [[12, 0.2688214830578752], [28, 0.08631068313818854], [55, 0.01858929039719109], [80, 0.007495272218792859]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 297, "ratio": 1.1}, "garage": {"ok": true, "carved": true, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.131073623833302}}
AUTOPISTA_SIN_GOLPES OK
GIRO_CIUDAD_IGUAL OK
GIRO_MENOR_A_300 OK
PEATONES_FUERA_DE_PUENTES OK
GOLD_EXISTE OK
GOLD_DORADO OK
GOLD_10_POR_CIENTO OK
GARAJE_HECHO OK
GARAJE_COCHE_DENTRO OK
GARAJE_BOTON OK
GARAJE_PUERTA OK
GARAJE_SALIDA OK
errores []
PRUEBA 1441 OK
```

### 3. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```
