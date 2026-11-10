# Pruebas 1.2.0 — 2026-11-10 07:32 — 7/7 OK

Listas: tf5_guajara. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 81 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_121.py` | **OK** | 6 s |
| 2 | `herramientas/sonda_solapes.py 30` | **OK** | 0 s |
| 3 | `herramientas/foto_vista.py tf5_guajara1 445 1604 30 470 1700` | **OK** | 48 s |
| 4 | `herramientas/foto_vista.py tf5_lora 200 1341 34 230 1420` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py tf5_hornera 797 1995 57 850 2100` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py tf5_guajara3 1136 2372 65 1180 2440` | **OK** | 0 s |
| 7 | `herramientas/foto_vista.py tf5_huc 1771 3085 44 1820 3150` | **OK** | 0 s |

## Detalle

### 1. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC', 'trozos': 34, 'puntos': 497, 'eje': 3332, 'lado': 1}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 2. herramientas/sonda_solapes.py 30 — OK

```
      ['service', '', 5.2, 'puente'] con ['service', '', 5.2, '']: ejes a 0.7 m, se pisan 4.5 m (6 puntos)
      ['tertiary', '', 10.4, ''] con ['service', '', 5.2, '']: ejes a 4.4 m, se pisan 3.4 m (3 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.2 m, se pisan 1 m (1 puntos)
  X -213, Y 903 · 22 puntos
      ['secondary', '', 11.7, ''] con ['primary_link', '', 9.1, '']: ejes a 4.8 m, se pisan 5.6 m (11 puntos)
      ['residential', 'Rambla Las Clavellinas', 7.9, ''] con ['primary_link', '', 9.1, '']: ejes a 5.7 m, se pisan 2.8 m (8 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 12.2 m, se pisan 1.2 m (3 puntos)
  X -182, Y 875 · 20 puntos
      ['secondary', '', 11.7, ''] con ['primary_link', '', 9.1, '']: ejes a 7.6 m, se pisan 2.8 m (6 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.1 m, se pisan 1.4 m (3 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.1 m, se pisan 1.4 m (4 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.4 m, se pisan 1.1 m (1 puntos)
  X -59, Y 1072 · 19 puntos
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['secondary', '', 11.7, '']: ejes a 8.5 m, se pisan 4 m (1 puntos)
      ['motorway_link', '', 11.1, ''] con ['service', '', 5.2, '']: ejes a 4.5 m, se pisan 3.7 m (4 puntos)
      ['secondary', '', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.9 m, se pisan 3.6 m (2 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 3.1 m, se pisan 3.4 m (12 puntos)
  X -421, Y 582 · 18 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway_link', '', 7.8, '']: ejes a 1.2 m, se pisan 6.6 m (13 puntos)
      ['residential', 'Leocadio Machado', 7.9, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.4 m, se pisan 2.4 m (5 puntos)
  X -89, Y 986 · 18 puntos
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 2.9 m, se pisan 3.6 m (5 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 3 m, se pisan 3.5 m (3 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 3.5 m, se pisan 3 m (2 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 3.7 m, se pisan 2.8 m (8 puntos)
  X -3056, Y -111 · 18 puntos
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.4 m, se pisan 4.8 m (12 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.8 m, se pisan 4.4 m (6 puntos)
  X -2816, Y -14 · 18 puntos
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (5 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (2 puntos)
      ['primary', '', 13, ''] con ['primary', '', 13, '']: ejes a 7.4 m, se pisan 5.6 m (2 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 3.9 m, se pisan 5.2 m (6 puntos)
  X 1083, Y 2447 · 17 puntos
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, '']: ejes a 0.7 m, se pisan 8.4 m (6 puntos)
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, 'túnel']: ejes a 2.7 m, se pisan 6.4 m (4 puntos)
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, 'túnel']: ejes a 3.5 m, se pisan 5.6 m (2 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 4 m, se pisan 3.8 m (5 puntos)
  X 682, Y 3566 · 17 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 1.1 m, se pisan 9.5 m (4 puntos)
      ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, ''] con ['residential', '', 7.9, '']: ejes a 0.3 m, se pisan 8.8 m (11 puntos)
      ['motorway_link', '', 7.8, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 8.3 m, se pisan 0.8 m (2 puntos)
  X 217, Y 1077 · 17 puntos
      ['tertiary', '', 10.4, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 1.3 m, se pisan 9.7 m (5 puntos)
      ['secondary', 'Avenida Lora Tamayo', 11.7, ''] con ['tertiary', '', 10.4, '']: ejes a 1.8 m, se pisan 9.3 m (8 puntos)
      ['residential', '', 7.9, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 5.5 m, se pisan 4.3 m (4 puntos)
  X -842, Y 1012 · 17 puntos
      ['service', '', 5.2, ''] con ['residential', '', 8, '']: ejes a 4 m, se pisan 2.6 m (17 puntos)
  X 211, Y 1138 · 16 puntos
      ['tertiary', '', 10.4, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 1.6 m, se pisan 9.4 m (15 puntos)
      ['residential', '', 7.9, ''] con ['secondary', 'Avenida Lora Tamayo', 11.7, '']: ejes a 8.2 m, se pisan 1.6 m (1 puntos)
  X 1439, Y 1655 · 16 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.2 m, se pisan 3.2 m (16 puntos)
  X 1160, Y 2337 · 15 puntos
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 4.9 m, se pisan 2.9 m (14 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, '']: ejes a 7.5 m, se pisan 1.6 m (1 puntos)
  X 1325, Y 1597 · 15 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7 m, se pisan 3.4 m (13 puntos)
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.8 m, se pisan 2.6 m (2 puntos)
SONDA SOLAPES OK
```

### 3. herramientas/foto_vista.py tf5_guajara1 445 1604 30 470 1700 — OK

```
FOTO VISTA OK tf5_guajara1
```

### 4. herramientas/foto_vista.py tf5_lora 200 1341 34 230 1420 — OK

```
FOTO VISTA OK tf5_lora
```

### 5. herramientas/foto_vista.py tf5_hornera 797 1995 57 850 2100 — OK

```
FOTO VISTA OK tf5_hornera
```

### 6. herramientas/foto_vista.py tf5_guajara3 1136 2372 65 1180 2440 — OK

```
FOTO VISTA OK tf5_guajara3
```

### 7. herramientas/foto_vista.py tf5_huc 1771 3085 44 1820 3150 — OK

```
FOTO VISTA OK tf5_huc
```

Fotos/archivos nuevos en `tests/shots/`: sonda_solapes.txt, vista_tf5_guajara1.jpg, vista_tf5_guajara3.jpg, vista_tf5_hornera.jpg, vista_tf5_huc.jpg, vista_tf5_lora.jpg
