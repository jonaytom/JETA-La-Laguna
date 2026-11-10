# Pruebas 1.2.9 — 2026-11-10 18:39 — 6/6 OK

Listas: arboles. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 67 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_arboles.py` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py drago_lucasvega -455 -390 5 -470 -400` | **OK** | 41 s |
| 3 | `herramientas/foto_vista.py drago_cabrerapinto -240 -335 9 -258 -347` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py drago_parque -5 -545 6 -18 -557` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py arb_parque_alto 20 -520 25 -10 -560` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py arb_calle -60 -230 3 -20 -170` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_arboles.py — OK

```
ARBOLES {"n": [1194, 1199, 1241, 2605, 54, 26, 1], "tris": {"laurel": [120, 560, 20, 1194], "palm": [356, 780, 18, 1199], "pine": [195, 521, 69, 1241], "gen": [67, 400, 20, 2605], "drago": [248, 264, 20, 54], "dragom": [608, 576, 20, 26], "dragol": [2096, 1456, 20, 1]}, "dragos": [[-153, -566, 0.9657233227438293], [-18, -557, 1.0948083646341853], [3, -563, 0.9470748091321493], [-8, -539, 0.9966579636825583], [-54, -376, 0.8495042423154074], [-357, -447, 1.030482271721499], [77, -328, 1.114030723273641], [156, -374, 0.978062781782162], [112, -189, 0.9946809088727349], [-632, 530, 1.0716739735214857], [-622, 564, 0.9865323132297676], [-1362, -457, 1.1408060709492691]]}
triángulos de cerca si se vieran todos 4341059
```

### 2. herramientas/foto_vista.py drago_lucasvega -455 -390 5 -470 -400 — OK

```
FOTO VISTA OK drago_lucasvega
```

### 3. herramientas/foto_vista.py drago_cabrerapinto -240 -335 9 -258 -347 — OK

```
FOTO VISTA OK drago_cabrerapinto
```

### 4. herramientas/foto_vista.py drago_parque -5 -545 6 -18 -557 — OK

```
FOTO VISTA OK drago_parque
```

### 5. herramientas/foto_vista.py arb_parque_alto 20 -520 25 -10 -560 — OK

```
FOTO VISTA OK arb_parque_alto
```

### 6. herramientas/foto_vista.py arb_calle -60 -230 3 -20 -170 — OK

```
FOTO VISTA OK arb_calle
```

Fotos/archivos nuevos en `tests/shots/`: sonda_arboles.txt, vista_arb_calle.jpg, vista_arb_parque_alto.jpg, vista_drago_cabrerapinto.jpg, vista_drago_lucasvega.jpg, vista_drago_parque.jpg
