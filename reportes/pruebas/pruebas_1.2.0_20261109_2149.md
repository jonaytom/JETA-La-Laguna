# Pruebas 1.2.0 — 2026-11-09 21:49 — 6/6 OK

Listas: tf5_oeste. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 85 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_solapes.py 40` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py tf5_oeste1 -2460 -209 11 -2440 -190` | **OK** | 59 s |
| 3 | `herramientas/foto_vista.py tf5_oeste2 -2548 -214 15 -2470 -205` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py tf5_valla -2132 -257 14 -2100 -200` | **OK** | 1 s |
| 5 | `herramientas/foto_vista.py sanlazaro_puente2 -1787 -189 9 -1815 -230` | **OK** | 0 s |
| 6 | `herramientas/sonda_origen.py -2115 -245 10 0.3` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_solapes.py 40 — OK

```
      ['tertiary', '', 10.4, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 11.3 m, se pisan 0.6 m (5 puntos)
  X 1116, Y 2397 · 21 puntos
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, 'túnel']: ejes a 0.2 m, se pisan 8.9 m (5 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, 'puente']: ejes a 0.4 m, se pisan 8.7 m (8 puntos)
      ['tertiary', '', 10.4, 'puente'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 2.4 m, se pisan 6.7 m (4 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, '']: ejes a 7.1 m, se pisan 2 m (2 puntos)
  X 553, Y 3720 · 21 puntos
      ['residential', 'Camino San Bartolomé de Geneto', 7.9, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 3.9 m, se pisan 5.2 m (4 puntos)
      ['residential', '', 8, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 6.1 m, se pisan 3.1 m (3 puntos)
      ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 10.7 m, se pisan 1.2 m (6 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 11.2 m, se pisan 0.7 m (4 puntos)
  X -213, Y 902 · 21 puntos
      ['secondary', '', 11.7, ''] con ['primary_link', '', 9.1, '']: ejes a 5.9 m, se pisan 4.5 m (10 puntos)
      ['residential', 'Rambla Las Clavellinas', 7.9, ''] con ['primary_link', '', 9.1, '']: ejes a 5.7 m, se pisan 2.8 m (8 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 12.2 m, se pisan 1.2 m (3 puntos)
  X -863, Y 117 · 21 puntos
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 4.3 m, se pisan 2.2 m (8 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 9.5 m, se pisan 1.1 m (1 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 9.9 m, se pisan 0.7 m (12 puntos)
  X -3125, Y -152 · 21 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 2.2 m, se pisan 8.4 m (15 puntos)
      ['primary', '', 13, ''] con ['primary', '', 13, '']: ejes a 6.3 m, se pisan 6.7 m (2 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 4.2 m, se pisan 4.9 m (3 puntos)
      ['primary', '', 13, ''] con ['service', '', 5.2, '']: ejes a 8.2 m, se pisan 0.9 m (1 puntos)
  X -857, Y 179 · 20 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 7 m, se pisan 3.6 m (1 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 7.2 m, se pisan 3.4 m (15 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 9.6 m, se pisan 1 m (3 puntos)
      ['residential', 'Calle Eduardo Westerdahl', 4.5, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.7 m, se pisan 0.5 m (1 puntos)
  X -49, Y 1083 · 20 puntos
      ['secondary', '', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 9 m, se pisan 3.6 m (12 puntos)
      ['motorway_link', '', 11.1, ''] con ['service', '', 5.2, '']: ejes a 7 m, se pisan 1.2 m (2 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 11.1, '']: ejes a 11.9 m, se pisan 0.3 m (6 puntos)
  X 120, Y 1230 · 19 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 3.8 m, se pisan 6.8 m (11 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 10 m, se pisan 3.4 m (4 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 10.1 m, se pisan 3.3 m (3 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.5 m, se pisan 2.1 m (1 puntos)
  X 562, Y 3697 · 18 puntos
      ['residential', 'Camino San Bartolomé de Geneto', 7.9, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 6.1 m, se pisan 3.1 m (5 puntos)
      ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, ''] con ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, '']: ejes a 11 m, se pisan 0.9 m (13 puntos)
  X -3056, Y -111 · 18 puntos
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.4 m, se pisan 4.8 m (12 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, 'túnel']: ejes a 0.8 m, se pisan 4.4 m (6 puntos)
  X -2816, Y -14 · 18 puntos
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (5 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 0.3 m, se pisan 8.8 m (2 puntos)
      ['primary', '', 13, ''] con ['primary', '', 13, '']: ejes a 7.4 m, se pisan 5.6 m (2 puntos)
      ['service', '', 5.2, ''] con ['primary', '', 13, '']: ejes a 3.9 m, se pisan 5.2 m (6 puntos)
  X 1142, Y 2357 · 17 puntos
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 5.2 m, se pisan 6.1 m (6 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['tertiary', '', 10.4, 'puente']: ejes a 6.5 m, se pisan 2.6 m (3 puntos)
      ['service', '', 5.2, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 8.9 m, se pisan 1.1 m (2 puntos)
      ['motorway_link', '', 7.8, 'túnel'] con ['motorway_link', '', 7.8, 'túnel']: ejes a 7.4 m, se pisan 0.4 m (5 puntos)
  X -182, Y 875 · 17 puntos
      ['secondary', '', 11.7, ''] con ['primary_link', '', 9.1, '']: ejes a 8.3 m, se pisan 2.1 m (3 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.1 m, se pisan 1.4 m (3 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.1 m, se pisan 1.4 m (4 puntos)
      ['motorway_link', '', 7.8, ''] con ['service', '', 5.2, '']: ejes a 5.4 m, se pisan 1.1 m (1 puntos)
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
origen en X -2115, Y -245 (radio 10 m, desde 0.3 m sobre el suelo); registradas 8266, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-2115_-245.txt, sonda_solapes.txt, vista_sanlazaro_puente2.jpg, vista_tf5_oeste1.jpg, vista_tf5_oeste2.jpg, vista_tf5_valla.jpg
