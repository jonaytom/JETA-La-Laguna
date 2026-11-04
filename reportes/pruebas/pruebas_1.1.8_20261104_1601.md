# Pruebas 1.1.8 — 2026-11-04 16:01 — 3/3 OK

Listas: origen. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 54 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_origen.py 105 -45 40 6` | **OK** | 0 s |
| 2 | `herramientas/sonda_origen.py -60 -230 40 6` | **OK** | 0 s |
| 3 | `herramientas/sonda_origen.py -191 366 25 3` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_origen.py 105 -45 40 6 — OK

```
origen en X 105, Y -45 (radio 40 m, desde 6 m sobre el suelo); registradas 8255, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
    32  addMesh < box < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 5e3a1f | BoxGeometry |    [[139, -66, 6.2, 9.1, 0.1, 0], [139, -66, 6.2, 9.1, 0.1, 0.1], [139, -66, 6.2, 9.1, 0, 0.1], [139, -65, 6.2, 9.1, 0.1, 0.1]]
     2  addMesh < box < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 4a2c17 | BoxGeometry |    [[140, -71, 6.2, 9.4, 6.9, 23.5], [140, -71, 9.4, 9.7, 7.3, 24.2]]
     2  addMesh < box < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 8f8b84 | BoxGeometry |    [[122, -49, 6.7, 7.5, 0.4, 0.8], [122, -49, 11.6, 12, 6.4, 23.7]]
     1  addMesh < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 8f8b84 | ExtrudeGeometry |    [[122, -49, 6.6, 7.7, 1.4, 4.3]]
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     2  mergeStatics < optimizeCity < boot | 5e3a1f | BufferGeometry | fusion   [[140, -71, 6.3, 9.2], [140, -71, 6.4, 9.3]]
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
    298  ?5e3a1f  X 137..139  Y -66..-59  alt 6.0..9.1   [[139, -66, 9.1], [139, -66, 7.1], [139, -66, 6.2], [139, -66, 7.1], [139, -66, 8.1], [139, -65, 7.1]]
     45  ?8f8b84  X 118..124  Y -61..-37  alt 6.0..12.1   [[119, -37, 11.5], [122, -53, 11.9], [121, -47, 6.2], [121, -50, 6.4], [121, -48, 6.9], [122, -49, 7.5]]
     17  trim  X 114..139  Y -74..-17  alt 7.2..11.9   [[139, -62, 10.3], [116, -38, 11.6]]
     12  roofTile  X 116..126  Y -74..-39  alt 6.3..13.3   [[122, -52, 6.6]]
      4  ?4a2c17  X 137..138  Y -59..-59  alt 6.9..9.2   [[137, -59, 8]]
      3  facade  X 117..139  Y -62..-38  alt 7.0..8.2   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
  [1265, 30, -50, 78, 0, 2, 0, -1, 842]
  [1267, 53, -91, 78, 0, 2, 0, -1, 651]
  [1281, 184, -57, 78, 0, 2, 0, -1, 914]
  [3340, 152, -75, 68, 6, 2, 0, -1, 73]
  [3344, 168, -71, 78, 0, 2, 1, -1, 369]
  [3347, 156, -83, 42, 0, 1, 1, -1, 99]
  [3350, 33, -20, 78, 0, 2, 1, -1, 489]
  [3352, 39, -42, 42, 0, 1, 1, -1, 18]
  [3353, 48, -73, 78, 0, 2, 1, -1, 376]
  [4589, 79, -30, 78, 0, 2, 0, -1, 536]
  [5648, 106, -83, 78, 0, 2, 0, -1, 704]
  [5661, 83, -55, 78, 0, 2, 0, 243, 963]
SONDA ORIGEN OK
```

### 2. herramientas/sonda_origen.py -60 -230 40 6 — OK

```
origen en X -60, Y -230 (radio 40 m, desde 6 m sobre el suelo); registradas 8255, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     2  addMesh < box < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 8f8b84 | BoxGeometry |    [[-47, -243, 13.7, 14.1, 6, 6], [-34, -239, 13.8, 14.2, 6, 6]]
     2  addMesh < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | ffffff | ConeGeometry |    [[-47, -243, 14.1, 15.7, 8.1, 8.1], [-34, -239, 14.2, 15.8, 8, 8]]
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     1  plane < buildObispadoPart5 < buildObispado < obispoInit < Object.initMissions < i | ffffff | PlaneGeometry |    [[-41, -238, 11.6, 12.8]]
     1  Object.finish < buildObispado < obispoInit < Object.initMissions < i < boot | 8a857c | BufferGeometry |    [[-41, -239, 10.9, 13.8]]
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
      2  roofTile  X -25..-25  Y -232..-232  alt 6.6..6.6   [[-25, -232, 6.6]]
      2  ?77736b  X -44..-39  Y -239..-237  alt 10.6..10.7   []
      1  ?ffffff  X -38..-38  Y -237..-237  alt 6.1..6.1   [[-38, -237, 6.1]]
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
  [1268, -98, -169, 78, 0, 2, 1, 43, 489]
  [1285, -97, -232, 78, 0, 2, 0, -1, 278]
  [3669, -30, -218, 78, 0, 2, 1, 127, 566]
  [3670, -140, -233, 42, 0, 1, 1, 128, 52]
  [4096, -7, -290, 78, 0, 2, 1, -1, 657]
  [4097, -7, -285, 114, 0, 3, 1, -1, 739]
  [4098, -11, -253, 78, 0, 2, 0, -1, 943]
  [4099, -17, -238, 114, 0, 3, 1, -1, 471]
  [4100, -26, -238, 114, 0, 3, 1, -1, 692]
  [4102, -88, -268, 78, 0, 2, 1, -1, 214]
  [4592, -59, -294, 78, 0, 2, 0, -1, 946]
  [4677, -111, -285, 42, 0, 1, 1, -1, 151]
  [4678, -99, -277, 78, 0, 2, 1, -1, 338]
  [5650, -66, -288, 78, 0, 2, 0, -1, 544]
  [5662, 11, -245, 78, 0, 2, 0, 244, 620]
  [5665, -41, -266, 114, 0, 3, 0, 247, 12]
SONDA ORIGEN OK
```

### 3. herramientas/sonda_origen.py -191 366 25 3 — OK

```
origen en X -191, Y 366 (radio 25 m, desde 3 m sobre el suelo); registradas 8255, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
     42  trim  X -198..-181  Y 356..389  alt 8.2..9.6   [[-186, 370, 9.4], [-182, 357, 9.5], [-194, 376, 9], [-186, 379, 8.7], [-189, 369, 8.4], [-189, 388, 8.2]]
      3  facade  X -196..-183  Y 358..383  alt 6.1..6.5   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
  [853, -225, 372, 99, 1, 3, 0, -1, 511]
  [885, -228, 334, 161, 1, 5, 0, -1, 966]
  [6573, -185, 363, 97, 1, 3, 0, -1, 235]
  [6574, -189, 376, 97, 1, 3, 0, -1, 560]
  [6575, -194, 388, 97, 1, 3, 0, -1, 50]
  [7533, -152, 370, 161, 2, 5, 0, -1, 354198]
  [7534, -160, 381, 192, 2, 6, 0, -1, 339140]
SONDA ORIGEN OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-191_366.txt, origen_-60_-230.txt, origen_105_-45.txt
