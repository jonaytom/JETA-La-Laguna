# Pruebas 1.3.0 — 2026-11-10 18:49 — 6/6 OK

Listas: arboles. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 68 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_arboles.py` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py drago_lucasvega -455 -390 5 -470 -400` | **OK** | 41 s |
| 3 | `herramientas/foto_vista.py drago_cabrerapinto -240 -335 9 -258 -347` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py drago_parque -5 -545 6 -18 -557` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py arb_parque_alto 20 -520 25 -10 -560` | **OK** | 1 s |
| 6 | `herramientas/foto_vista.py arb_calle -60 -230 3 -20 -170` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_arboles.py — OK

```
ARBOLES {"n": [1156, 1096, 1272, 2221, 37, 30, 1], "tris": {"laurel": [120, 560, 20, 1156], "palm": [356, 780, 18, 1096], "pine": [195, 521, 69, 1272], "gen": [67, 400, 20, 2221], "drago": [248, 264, 20, 37], "dragom": [608, 576, 20, 30], "dragol": [2096, 1456, 20, 1]}, "dragos": [[-18, -557, 0.938099606186611], [3, -563, 0.9168314269413588], [-8, -539, 1.0729894929691843], [-54, -376, 1.1481810728115711], [-357, -447, 0.8918507981135217], [77, -328, 0.8034089662326609], [156, -374, 0.9225561809919188], [112, -189, 1.1573515876941298], [872, 2409, 1.1837246774733323], [163, -975, 0.8388756144720423], [1138, 2095, 0.8670610118680391], [1221, 2222, 1.0958588389092696]]}
triángulos de cerca si se vieran todos 4037111
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
