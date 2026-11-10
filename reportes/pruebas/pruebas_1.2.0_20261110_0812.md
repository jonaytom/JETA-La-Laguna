# Pruebas 1.2.0 — 2026-11-10 08:12 — 6/6 OK

Listas: v122. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 79 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_edificios.py 1840 3130 120` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py tf5_guajara1 445 1604 30 470 1700` | **OK** | 52 s |
| 3 | `herramientas/foto_vista.py tf5_gore 520 1660 25 600 1760` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py huc_glorieta 1771 3085 44 1820 3150` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py lora_glorieta 160 1330 60 200 1380` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py pabellon 1700 3150 30 1758 3211` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_edificios.py 1840 3130 120 — OK

```
edificios (índice, x, y, área, radio medio, alto dm, estilo, plantas, puntos, irregularidad):
   [3217, 1754, 3201, 6699, 41.5, 99, 6, 3, 30, 0.3]
   [57, 1758, 3211, 4861, 39.5, 130, 2, 4, 35, 0.15]
   [2638, 1737, 3163, 780, 24.8, 99, 6, 3, 4, 0.12]
   [3660, 1947, 3106, 47, 5, 37, 1, 1, 4, 0.02]
SONDA EDIFICIOS OK
```

### 2. herramientas/foto_vista.py tf5_guajara1 445 1604 30 470 1700 — OK

```
FOTO VISTA OK tf5_guajara1
```

### 3. herramientas/foto_vista.py tf5_gore 520 1660 25 600 1760 — OK

```
FOTO VISTA OK tf5_gore
```

### 4. herramientas/foto_vista.py huc_glorieta 1771 3085 44 1820 3150 — OK

```
FOTO VISTA OK huc_glorieta
```

### 5. herramientas/foto_vista.py lora_glorieta 160 1330 60 200 1380 — OK

```
FOTO VISTA OK lora_glorieta
```

### 6. herramientas/foto_vista.py pabellon 1700 3150 30 1758 3211 — OK

```
FOTO VISTA OK pabellon
```

Fotos/archivos nuevos en `tests/shots/`: vista_huc_glorieta.jpg, vista_lora_glorieta.jpg, vista_pabellon.jpg, vista_tf5_gore.jpg, vista_tf5_guajara1.jpg
