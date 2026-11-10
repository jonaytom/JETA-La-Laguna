# Pruebas 1.3.0 — 2026-11-10 19:06 — 5/5 OK

Listas: hierba. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 76 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/foto_vista.py hierba_desc1 600 700 1.8 630 730` | **OK** | 47 s |
| 2 | `herramientas/foto_vista.py hierba_desc1b 600 700 12 640 740` | **OK** | 1 s |
| 3 | `herramientas/foto_vista.py hierba_desc2 -1500 -100 1.8 -1470 -70` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py hierba_desc3 1300 2300 2 1260 2340` | **OK** | 0 s |
| 5 | `herramientas/mdt_ign.py capacidades` | **OK** | 0 s |

## Detalle

### 1. herramientas/foto_vista.py hierba_desc1 600 700 1.8 630 730 — OK

```
FOTO VISTA OK hierba_desc1
```

### 2. herramientas/foto_vista.py hierba_desc1b 600 700 12 640 740 — OK

```
FOTO VISTA OK hierba_desc1b
```

### 3. herramientas/foto_vista.py hierba_desc2 -1500 -100 1.8 -1470 -70 — OK

```
FOTO VISTA OK hierba_desc2
```

### 4. herramientas/foto_vista.py hierba_desc3 1300 2300 2 1260 2340 — OK

```
FOTO VISTA OK hierba_desc3
```

### 5. herramientas/mdt_ign.py capacidades — OK

```
capas: Elevacion4258_1000, Elevacion4326_1000, Elevacion4258_500, Elevacion4326_500, Elevacion4258_200, Elevacion4258_25, Elevacion4258_5, Elevacion25830_1000, Elevacion4083_1000, Elevacion25830_500, Elevacion4083_500, Elevacion25830_200, Elevacion4083_200, Elevacion25830_25, Elevacion4083_25, Elevacion25830_5, Elevacion4083_5
formatos: image/tiff, ArcGrid, application/asc, image/png, image/jpeg, image/gif, image/png; mode=8bit, image/png; mode=8bit, GEOTIFFINT16, GEOTIFF_RGB
MDT OK
```

Fotos/archivos nuevos en `tests/shots/`: mdt_capacidades.txt, vista_hierba_desc1.jpg, vista_hierba_desc1b.jpg, vista_hierba_desc2.jpg, vista_hierba_desc3.jpg
