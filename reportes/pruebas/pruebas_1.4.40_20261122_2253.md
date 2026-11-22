# Pruebas 1.4.40 — 2026-11-22 22:53 — 1/2 OK

Listas: v1441, foto1441. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 475 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1441.py` | **FALLA** | 1 s |
| 2 | `herramientas/foto_1441.py` | **OK** | 441 s |

## Detalle

### 1. prueba_1441.py — FALLA

```
{"hits": [["N", -6, 1899, 3224, 51], ["N", -3, 1899, 3224, 53], ["N", 0, 1898, 3227, 75]], "worst": 75.14371654913208, "steer": [[12, 0.2725457581472302], [28, 0.05104910893681669], [55, 0.013233730493606988], [80, 0.006254119042413039]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 297, "ratio": 1.1}, "garage": {"ok": true, "carved": true, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.021436843781697}}
AUTOPISTA_SIN_GOLPES FALLA
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
PRUEBA 1441 FALLA
```

### 2. herramientas/foto_1441.py — OK

```
{"p":"<kbd>E</kbd> Cerrar el garaje","a":0}
FOTO 1441 OK
```

Fotos/archivos nuevos en `tests/shots/`: f1441_bajando.jpg, f1441_dentro.jpg, f1441_frente.jpg, f1441_nano_frente.jpg, f1441_nano_lado.jpg, f1441_noche.jpg, f1441_porton_abierto.jpg, f1441_porton_abriendo.jpg, f1441_porton_cerrado.jpg, f1441_subiendo.jpg
