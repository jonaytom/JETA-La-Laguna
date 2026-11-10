# Pruebas 1.3.2 — 2026-11-10 19:37 — 5/6 OK

Listas: fotos132. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 78 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/foto_vista.py hierba_torriani 113 470 10 118 420` | **OK** | 47 s |
| 2 | `herramientas/foto_vista.py hierba_menceyes 251 890 9 251 840` | **OK** | 1 s |
| 3 | `herramientas/foto_vista.py sdomingo 102 232 28 175 180` | **OK** | 0 s |
| 4 | `herramientas/foto_vista.py arb_casa 180 -270 18 202 -240` | **OK** | 1 s |
| 5 | `herramientas/foto_vista.py hierba_desc1 600 700 12 640 740` | **OK** | 1 s |
| 6 | `herramientas/sonda_hierba.py` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/foto_vista.py hierba_torriani 113 470 10 118 420 — OK

```
FOTO VISTA OK hierba_torriani
```

### 2. herramientas/foto_vista.py hierba_menceyes 251 890 9 251 840 — OK

```
FOTO VISTA OK hierba_menceyes
```

### 3. herramientas/foto_vista.py sdomingo 102 232 28 175 180 — OK

```
FOTO VISTA OK sdomingo
```

### 4. herramientas/foto_vista.py arb_casa 180 -270 18 202 -240 — OK

```
FOTO VISTA OK arb_casa
```

### 5. herramientas/foto_vista.py hierba_desc1 600 700 12 640 740 — OK

```
FOTO VISTA OK hierba_desc1
```

### 6. herramientas/sonda_hierba.py — FALLA

```
Traceback (prueba): IndexError('list index out of range')
```

Fotos/archivos nuevos en `tests/shots/`: vista_arb_casa.jpg, vista_hierba_desc1.jpg, vista_hierba_menceyes.jpg, vista_hierba_torriani.jpg, vista_sdomingo.jpg
