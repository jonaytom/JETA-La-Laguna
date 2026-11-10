# Pruebas 1.2.0 — 2026-11-09 16:58 — 3/3 OK

Listas: honorato_rayos. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 152 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py -918 50 326 -40` | **OK** | 58 s |
| 2 | `herramientas/sonda_rayos.py -962 104 120 -40` | **OK** | 37 s |
| 3 | `herramientas/sonda_rayos.py -950 92 300 -40` | **OK** | 36 s |

## Detalle

### 1. herramientas/sonda_rayos.py -918 50 326 -40 — OK

```
rayos desde X -918, Y 50, rumbo 326° (cosas a más de -40 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    94  ?ffffff | buildTerrain < boot |    [[-1008, 94, 0, 101], [-1006, 88, 0, 96], [-1004, 82, 0, 92], [-1002, 77, 0, 88], [-1000, 73, 0, 85]]
    27  asphalt | finalizeChunks < boot | chunk:asphalt   [[-1024, 161, 0.1, 154], [-1008, 100, 0.1, 103], [-918, 68, 0.1, 18], [-919, 67, 0.1, 17], [-919, 66, 0.1, 17]]
    22  trim | finalizeChunks < boot | chunk:trim   [[-910, 97, 0.2, 48], [-912, 95, 0.2, 46], [-933, 64, 0.6, 20], [-934, 63, 0.5, 20], [-935, 62, 0.5, 21]]
    12  aL_o3_134m | finalizeChunks < boot | chunk:aL_o3_134m   [[-913, 96, 0.2, 47], [-915, 95, 0.2, 45], [-917, 93, 0.2, 43], [-919, 92, 0.2, 42], [-921, 90, 0.2, 40]]
     5  disc | finalizeChunks < boot | chunk:disc   [[-1021, 145, 0.1, 140], [-1011, 109, 0.1, 110], [-992, 65, 0.1, 76], [-915, 70, 0.1, 21], [-915, 70, 0.1, 20]]
     2  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-998, 79, 5.2, 86], [-1044, 84, 4.4, 131]]
     2  grass | finalizeChunks < boot | chunk:grass   [[-1014, 128, 0.4, 123], [-1010, 116, 0.3, 113]]
     1  tunnel | finalizeChunks < boot | chunk:tunnel   [[-916, 60, 0, 10]]
SONDA RAYOS OK
```

### 2. herramientas/sonda_rayos.py -962 104 120 -40 — OK

```
rayos desde X -962, Y 104, rumbo 120° (cosas a más de -40 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
   133  ?ffffff | buildTerrain < boot |    [[-936, 15, 0, 93], [-933, 14, 0, 94], [-929, 14, 0, 96], [-887, 14, 0, 117], [-879, 16, 0, 121]]
   102  (caja, sin posiciones) tunnelLight | finalizeChunks < boot | chunk:tunnelLight   [[-949, 103, -2.3, 13], [-949, 104, -2.3, 13], [-949, 105, -2.3, 13], [-949, 105, -2.3, 13], [-949, 106, -2.3, 13]]
    19  (caja, sin posiciones) tunnel | finalizeChunks < boot | chunk:tunnel   [[-918, 52, -7.1, 68], [-916, 56, -7, 67], [-950, 81, -8.1, 26], [-949, 82, -8.1, 26], [-948, 83, -8.1, 25]]
     3  aL_t2_129pq | finalizeChunks < boot | chunk:aL_t2_129pq   [[-910, 16, 0.2, 102], [-904, 17, 0.2, 105], [-898, 18, 0.2, 108]]
     1  ?ffffff | buildParkingLots < boot |    [[-862, 98, 0.1, 100]]
SONDA RAYOS OK
```

### 3. herramientas/sonda_rayos.py -950 92 300 -40 — OK

```
rayos desde X -950, Y 92, rumbo 300° (cosas a más de -40 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
   170  ?ffffff | buildTerrain < boot |    [[-1004, 210, 0, 130], [-1007, 203, 0, 125], [-1012, 187, 0, 114], [-1014, 179, 0, 108], [-1015, 146, 0, 84]]
     9  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-997, 83, 5.5, 48], [-996, 81, 5.3, 47], [-1009, 129, 5.2, 70], [-1011, 125, 5, 70], [-1044, 87, 3.3, 95]]
     5  (caja, sin posiciones) aL_o2_78m | finalizeChunks < boot | chunk:aL_o2_78m   [[-1008, 95, 0.1, 58], [-1008, 92, 0.1, 58], [-1008, 89, 0.2, 58], [-1008, 86, 0.2, 58], [-1008, 84, 0.2, 59]]
     5  (caja, sin posiciones) grass | finalizeChunks < boot | chunk:grass   [[-1000, 133, 0.2, 64], [-1000, 123, 0.4, 58], [-1000, 118, 0.4, 56], [-1000, 114, 0.4, 54], [-1002, 111, 0.3, 56]]
     5  (caja, sin posiciones) aL_o2_117p | finalizeChunks < boot | chunk:aL_o2_117p   [[-993, 115, 0.1, 49], [-993, 111, 0.1, 47], [-993, 108, 0.2, 46], [-993, 105, 0.2, 45], [-993, 102, 0.2, 44]]
     4  (caja, sin posiciones) aL_o2_117pq | finalizeChunks < boot | chunk:aL_o2_117pq   [[-1006, 151, 0.2, 81], [-1006, 138, 0.4, 72], [-1008, 128, 0.3, 68], [-1010, 124, 0.2, 68]]
     1  ?ffffff | buildParkedPart3 < buildParked < boot | parked   [[-981, 201, 0.7, 114]]
     1  ?3a3c3e | splitInstanced < optimizeCity < boot | inst   [[-1006, 152, 0.5, 82]]
     1  ?ffffff | makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < newPedHuman < Object.ped < preloadHumans |    [[-975, 116, 1.5, 35]]
     1  ?ffffff | makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < initPlayer < i < boot |    [[-963, 102, 1.7, 17]]
     1  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[-998, 82, 0.3, 49]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: rayos_-918_50_326.jpg, rayos_-918_50_326.txt, rayos_-950_92_300.jpg, rayos_-950_92_300.txt, rayos_-962_104_120.jpg, rayos_-962_104_120.txt
