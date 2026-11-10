# Pruebas 1.2.0 — 2026-11-09 22:15 — 6/6 OK

Listas: tf5_oeste. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 83 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_solapes.py 40` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py tf5_oeste1 -2460 -209 11 -2440 -190` | **OK** | 56 s |
| 3 | `herramientas/foto_vista.py tf5_oeste2 -2548 -214 15 -2470 -205` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py tf5_valla -2132 -257 14 -2100 -200` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py sanlazaro_puente2 -1787 -189 9 -1815 -230` | **OK** | 0 s |
| 6 | `herramientas/sonda_origen.py -2115 -245 10 0.3` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_solapes.py 40 — OK

```
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 3.9 m, se pisan 5.2 m (6 puntos)
  X 1083, Y 2447 · 17 puntos
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, '']: ejes a 0.7 m, se pisan 8.4 m (6 puntos)
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, 'túnel']: ejes a 2.7 m, se pisan 6.4 m (4 puntos)
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, 'túnel']: ejes a 3.5 m, se pisan 5.6 m (2 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 4 m, se pisan 3.8 m (5 puntos)
  X 1142, Y 2357 · 17 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 7.9 m, se pisan 3.4 m (4 puntos)
      ['tertiary', '', 10.4, ''] con ['tertiary', '', 10.4, '']: ejes a 8 m, se pisan 2.4 m (3 puntos)
      ['tertiary', '', 10.4, 'puente'] con ['tertiary', '', 10.4, 'puente']: ejes a 8.6 m, se pisan 1.8 m (2 puntos)
      ['service', '', 5.2, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 8.9 m, se pisan 1.1 m (2 puntos)
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
  X 1508, Y 1741 · 15 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 6.8 m, se pisan 3.6 m (15 puntos)
  X -961, Y 948 · 15 puntos
      ['service', '', 5.2, ''] con ['residential', '', 8, '']: ejes a 3.5 m, se pisan 3.1 m (15 puntos)
  X -3540, Y -201 · 15 puntos
      ['secondary', 'Carretera General del Norte', 12.9, ''] con ['secondary', 'Carretera General del Norte', 11.7, '']: ejes a 2.4 m, se pisan 9.9 m (8 puntos)
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 6.9 m, se pisan 5.7 m (7 puntos)
  X 123, Y 1220 · 14 puntos
      ['secondary', '', 11.7, ''] con ['motorway_link', '', 7.8, '']: ejes a 2.8 m, se pisan 7 m (2 puntos)
      ['secondary', '', 11.7, ''] con ['motorway_link', '', 7.8, '']: ejes a 2.7 m, se pisan 7 m (11 puntos)
      ['tertiary', '', 10.4, ''] con ['secondary', '', 11.7, '']: ejes a 8 m, se pisan 3 m (1 puntos)
  X 1668, Y 1841 · 14 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.1 m, se pisan 3.3 m (2 puntos)
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.9 m, se pisan 2.5 m (12 puntos)
  X 421, Y 1339 · 14 puntos
      ['service', '', 5.2, ''] con ['residential', 'Calle las Saltonas', 7.9, '']: ejes a 3.9 m, se pisan 2.6 m (14 puntos)
  X 840, Y 2899 · 14 puntos
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 0.7 m, se pisan 4.5 m (1 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 3.5 m, se pisan 1.7 m (12 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.1 m, se pisan 1.1 m (1 puntos)
  X -235, Y 806 · 14 puntos
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5 m, se pisan 1.5 m (4 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5 m, se pisan 1.5 m (6 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.8 m, se pisan 0.7 m (1 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.5 m, se pisan 0.7 m (3 puntos)
  X -3419, Y -172 · 14 puntos
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['service', '', 5.2, '']: ejes a 0 m, se pisan 8.4 m (14 puntos)
SONDA SOLAPES OK
```

### 2. herramientas/foto_vista.py tf5_oeste1 -2460 -209 11 -2440 -190 — OK

```
FOTO VISTA OK tf5_oeste1
```

### 3. herramientas/foto_vista.py tf5_oeste2 -2548 -214 15 -2470 -205 — OK

```
FOTO VISTA OK tf5_oeste2
```

### 4. herramientas/foto_vista.py tf5_valla -2132 -257 14 -2100 -200 — OK

```
FOTO VISTA OK tf5_valla
```

### 5. herramientas/foto_vista.py sanlazaro_puente2 -1787 -189 9 -1815 -230 — OK

```
FOTO VISTA OK sanlazaro_puente2
```

### 6. herramientas/sonda_origen.py -2115 -245 10 0.3 — OK

```
origen en X -2115, Y -245 (radio 10 m, desde 0.3 m sobre el suelo); registradas 8461, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-2115_-245.txt, sonda_solapes.txt, vista_sanlazaro_puente2.jpg, vista_tf5_oeste1.jpg, vista_tf5_oeste2.jpg, vista_tf5_valla.jpg
