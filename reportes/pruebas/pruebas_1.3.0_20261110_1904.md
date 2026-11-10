# Pruebas 1.3.0 — 2026-11-10 19:04 — 6/6 OK

Listas: hierba. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 74 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_hierba.py 600 700` | **OK** | 0 s |
| 2 | `herramientas/sonda_hierba.py -5 -545` | **OK** | 0 s |
| 3 | `herramientas/foto_vista.py hierba_parque -5 -545 1.8 -20 -565` | **OK** | 45 s |
| 4 | `herramientas/foto_vista.py hierba_desc1 600 700 1.8 630 730` | **OK** | 1 s |
| 5 | `herramientas/foto_vista.py hierba_desc1b 600 700 12 640 740` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py hierba_desc2 -1500 -100 1.8 -1470 -70` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_hierba.py 600 700 — OK

```
HIERBA {"on":true,"counts":[1446,2091,333],"cls":[404,113,349,815],"total":[2163573,120541,230824,600070],"cell":105,"arb":true}
```

### 2. herramientas/sonda_hierba.py -5 -545 — OK

```
HIERBA {"on":true,"counts":[960,328,87],"cls":[0,133,97,1451],"total":[2163573,120541,230824,600070],"cell":66,"arb":true}
```

### 3. herramientas/foto_vista.py hierba_parque -5 -545 1.8 -20 -565 — OK

```
FOTO VISTA OK hierba_parque
```

### 4. herramientas/foto_vista.py hierba_desc1 600 700 1.8 630 730 — OK

```
FOTO VISTA OK hierba_desc1
```

### 5. herramientas/foto_vista.py hierba_desc1b 600 700 12 640 740 — OK

```
FOTO VISTA OK hierba_desc1b
```

### 6. herramientas/foto_vista.py hierba_desc2 -1500 -100 1.8 -1470 -70 — OK

```
FOTO VISTA OK hierba_desc2
```

Fotos/archivos nuevos en `tests/shots/`: vista_hierba_desc1.jpg, vista_hierba_desc1b.jpg, vista_hierba_desc2.jpg, vista_hierba_parque.jpg
