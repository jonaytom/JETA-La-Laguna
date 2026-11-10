# Pruebas 1.2.9 — 2026-11-10 18:35 — 5/5 OK

Listas: arboles. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 70 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_arboles.py` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py arb_casco -80 -260 14 -40 -200` | **OK** | 44 s |
| 3 | `herramientas/foto_vista.py arb_adelantado -740 -330 10 -770 -380` | **OK** | 0 s |
| 4 | `herramientas/foto_vista.py arb_trinidad -120 160 9 -160 260` | **OK** | 1 s |
| 5 | `herramientas/foto_vista.py arb_alto -300 0 60 -200 100` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_arboles.py — OK

```
ARBOLES {"n": [1142, 1126, 1182, 2373, 37, 27, 0], "tris": {"laurel": [120, 560, 20, 1142], "palm": [356, 780, 18, 1126], "pine": [195, 521, 69, 1182], "gen": [67, 400, 20, 2373], "drago": [248, 264, 20, 37], "dragom": [608, 576, 20, 27]}, "dragos": [[-153, -566, 0.9334695422047992], [-18, -557, 1.1361015716633183], [3, -563, 1.0402200344641415], [-8, -539, 1.1946908590525207], [-54, -376, 1.1133282346597229], [-357, -447, 0.9839273943407695], [77, -328, 1.0665835318274905], [156, -374, 1.1288380369703426], [112, -189, 1.0398173216249984], [127, -950, 1.2965035024565852], [120, -945, 0.9773313377623573], [-1335, -417, 0.7602655803075138]]}
triángulos de cerca si se vieran todos 4061111
```

### 2. herramientas/foto_vista.py arb_casco -80 -260 14 -40 -200 — OK

```
FOTO VISTA OK arb_casco
```

### 3. herramientas/foto_vista.py arb_adelantado -740 -330 10 -770 -380 — OK

```
FOTO VISTA OK arb_adelantado
```

### 4. herramientas/foto_vista.py arb_trinidad -120 160 9 -160 260 — OK

```
FOTO VISTA OK arb_trinidad
```

### 5. herramientas/foto_vista.py arb_alto -300 0 60 -200 100 — OK

```
FOTO VISTA OK arb_alto
```

Fotos/archivos nuevos en `tests/shots/`: sonda_arboles.txt, vista_arb_adelantado.jpg, vista_arb_alto.jpg, vista_arb_casco.jpg, vista_arb_trinidad.jpg
