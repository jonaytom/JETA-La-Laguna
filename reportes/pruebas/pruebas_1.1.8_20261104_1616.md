# Pruebas 1.1.8 — 2026-11-04 16:16 — 7/7 OK

Listas: origen. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 313 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py 105 -45 0` | **OK** | 61 s |
| 2 | `herramientas/sonda_rayos.py 105 -45 90` | **OK** | 37 s |
| 3 | `herramientas/sonda_rayos.py 105 -45 180` | **OK** | 36 s |
| 4 | `herramientas/sonda_rayos.py 105 -45 270` | **OK** | 43 s |
| 5 | `herramientas/sonda_rayos.py -60 -230 32` | **OK** | 36 s |
| 6 | `herramientas/sonda_rayos.py -191 366 0 2` | **OK** | 37 s |
| 7 | `herramientas/sonda_rayos.py -191 366 180 2` | **OK** | 38 s |

## Detalle

### 1. herramientas/sonda_rayos.py 105 -45 0 — OK

```
rayos desde X 105, Y -45, rumbo 0° (cosas a más de 5 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    21  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[123, -28, 7.8, 26], [124, -25, 8.5, 28], [123, -27, 6.4, 26], [123, -26, 6.7, 26], [125, -23, 7.7, 31]]
SONDA RAYOS OK
```

### 2. herramientas/sonda_rayos.py 105 -45 90 — OK

```
rayos desde X 105, Y -45, rumbo 90° (cosas a más de 5 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    43  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[132, -32, 11.3, 31], [131, -31, 10.9, 31], [129, -31, 10.1, 29], [126, -30, 9.3, 27], [125, -30, 8.8, 26]]
    16  ?8f8b84 | mergeStatics < optimizeCity < boot | fusion   [[120, -42, 11.7, 18], [119, -41, 11.5, 18], [119, -40, 11.4, 18], [119, -39, 11.3, 18], [122, -52, 12, 21]]
    12  ?4a2c17 | mergeStatics < optimizeCity < boot | fusion   [[141, -76, 9.7, 48], [140, -73, 9.5, 46], [140, -70, 9.3, 44], [138, -62, 8.7, 37], [142, -79, 7.2, 51]]
     4  ?5e3a1f | mergeStatics < optimizeCity < boot | fusion   [[139, -67, 9.1, 41], [138, -65, 8.9, 39], [137, -59, 8.5, 36], [137, -59, 6.1, 35]]
SONDA RAYOS OK
```

### 3. herramientas/sonda_rayos.py 105 -45 180 — OK

```
rayos desde X 105, Y -45, rumbo 180° (cosas a más de 5 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     2  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[235, -190, 6.1, 194], [235, -180, 6.7, 188]]
     1  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[130, -112, 5.2, 72]]
     1  (caja, sin posiciones) aL_t4_130 | finalizeChunks < boot | chunk:aL_t4_130   [[403, -350, 6.4, 426]]
SONDA RAYOS OK
```

### 4. herramientas/sonda_rayos.py 105 -45 270 — OK

```
rayos desde X 105, Y -45, rumbo 270° (cosas a más de 5 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
SONDA RAYOS OK
```

### 5. herramientas/sonda_rayos.py -60 -230 32 — OK

```
rayos desde X -60, Y -230, rumbo 32° (cosas a más de 5 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     1  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-87, -42, 6, 190]]
SONDA RAYOS OK
```

### 6. herramientas/sonda_rayos.py -191 366 0 2 — OK

```
rayos desde X -191, Y 366, rumbo 0° (cosas a más de 2 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     2  trim | finalizeChunks < boot | chunk:trim   [[-189, 383, 8.3, 18], [-190, 382, 8.1, 18]]
     1  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-256, 515, 5.9, 163]]
SONDA RAYOS OK
```

### 7. herramientas/sonda_rayos.py -191 366 180 2 — OK

```
rayos desde X -191, Y 366, rumbo 180° (cosas a más de 2 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
     5  (caja, sin posiciones) roofTile | finalizeChunks < boot | chunk:roofTile   [[-182, 282, 5.4, 85], [-177, 282, 5.3, 86], [-171, 282, 5.2, 87], [-165, 282, 5.1, 88], [-160, 282, 5, 90]]
     2  ?3a3c3e | splitInstanced < optimizeCity < boot | inst   [[-180, 353, 7.1, 18], [-180, 353, 2, 17]]
     1  ?55595c | splitInstanced < optimizeCity < boot | inst   [[-193, 344, 6, 22]]
     1  ?ffffff | saludDeco < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot |    [[-181, 264, 6.3, 102]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: rayos_-191_366_0.jpg, rayos_-191_366_0.txt, rayos_-191_366_180.jpg, rayos_-191_366_180.txt, rayos_-60_-230_32.jpg, rayos_-60_-230_32.txt, rayos_105_-45_0.jpg, rayos_105_-45_0.txt, rayos_105_-45_180.jpg, rayos_105_-45_180.txt, rayos_105_-45_270.jpg, rayos_105_-45_270.txt, rayos_105_-45_90.jpg, rayos_105_-45_90.txt
