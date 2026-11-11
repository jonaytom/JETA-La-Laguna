# Pruebas 1.3.7 — 2026-11-11 10:49 — 3/3 OK

Listas: flechas138. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 76 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/foto_vista.py flechas_menceyes 1600 1820 4 1500 1730` | **OK** | 44 s |
| 2 | `herramientas/foto_vista.py flechas_alto 1560 1780 25 1500 1730` | **OK** | 1 s |
| 3 | `herramientas/sonda_marcas_aparca.py flechas` | **OK** | 5 s |

## Detalle

### 1. herramientas/foto_vista.py flechas_menceyes 1600 1820 4 1500 1730 — OK

```
FOTO VISTA OK flechas_menceyes
```

### 2. herramientas/foto_vista.py flechas_alto 1560 1780 25 1500 1730 — OK

```
FOTO VISTA OK flechas_alto
```

### 3. herramientas/sonda_marcas_aparca.py flechas — OK

```
foto 0 o1 82 604 Calle María del Cristo Ossuna ancho 7.9 lados [-1]
foto 1 o1 -413 -158 Calle Manuel de Ossuna ancho 7.5 lados [1]
foto 2 t2 384 3398 Camino Bocatuerta ancho 8 lados [1,-1]
foto 3 t2 -2028 -270 Carretera General del Norte ancho 11.7 lados [1,-1]
foto 4 t1 -795 823 Camino San Francisco de Paula ancho 11.7 lados [-1]
foto 5 t1 -791 1168 Camino San Francisco de Paula ancho 11.7 lados [1]
SONDA MARCAS OK
```

Fotos/archivos nuevos en `tests/shots/`: marcas_flechas_0.jpg, marcas_flechas_1.jpg, marcas_flechas_2.jpg, marcas_flechas_3.jpg, marcas_flechas_4.jpg, marcas_flechas_5.jpg, vista_flechas_alto.jpg, vista_flechas_menceyes.jpg
