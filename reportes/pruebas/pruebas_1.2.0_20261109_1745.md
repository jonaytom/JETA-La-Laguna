# Pruebas 1.2.0 — 2026-11-09 17:45 — 1/1 OK

Listas: honorato_rayos. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 424 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py -909 49 307 -40 3 4` | **OK** | 404 s |

## Detalle

### 1. herramientas/sonda_rayos.py -909 49 307 -40 3 4 — OK

```
rayos desde X -909, Y 49, rumbo 307° (cosas a más de -40 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
  1167  ?ffffff | buildTerrain < boot |    [[-1100, 53, 0, 192], [-1097, 51, 0, 189], [-1070, 134, 0, 182], [-1068, 130, 0, 179], [-1067, 126, 0, 176]]
   452  asphalt | finalizeChunks < boot | chunk:asphalt   [[-1045, 72, 0.1, 138], [-1044, 70, 0.1, 137], [-1044, 68, 0.1, 136], [-1036, 50, 0.1, 127], [-1035, 49, 0.1, 126]]
   403  trim | finalizeChunks < boot | chunk:trim   [[-929, 130, 4.4, 84], [-930, 129, 4.4, 83], [-1029, 54, 0.6, 120], [-1032, 53, 0.4, 124], [-1012, 39, 0.9, 103]]
   324  aL_o3_134m | finalizeChunks < boot | chunk:aL_o3_134m   [[-1068, 30, 0.2, 160], [-1067, 29, 0.2, 159], [-1066, 27, 0.2, 158], [-1064, 26, 0.2, 157], [-1032, 45, 0.2, 123]]
   119  aL_o2_78m | finalizeChunks < boot | chunk:aL_o2_78m   [[-1042, 66, 0.1, 134], [-1042, 65, 0.1, 134], [-1041, 63, 0.1, 133], [-1040, 61, 0.1, 132], [-1040, 59, 0.1, 131]]
    76  disc | finalizeChunks < boot | chunk:disc   [[-1071, 32, 0.1, 163], [-1070, 31, 0.1, 162], [-1023, 150, 0.1, 152], [-1023, 146, 0.1, 150], [-1020, 105, 0.1, 124]]
    32  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-1029, 77, 9.3, 124], [-1029, 76, 9.2, 124], [-1029, 74, 9.1, 124], [-1027, 79, 7.4, 122], [-1025, 77, 7.3, 120]]
     8  sidewalk | finalizeChunks < boot | chunk:sidewalk   [[-1085, 43, 0.1, 176], [-1076, 35, 0.1, 168], [-1074, 34, 0.1, 166], [-1069, 137, 0.1, 183], [-1047, 74, 0.1, 140]]
     6  aL_r1_79q | finalizeChunks < boot | chunk:aL_r1_79q   [[-1086, 47, 0.2, 177], [-1084, 45, 0.1, 175], [-1080, 41, 0.1, 172], [-1079, 40, 0.2, 170], [-1077, 38, 0.2, 168]]
     6  ?ffffff | buildTrafficSignsPart6 < buildTrafficSigns < boot |    [[-1022, 152, 0.2, 153], [-946, 45, 0.2, 37], [-946, 45, 0.2, 37], [-941, 45, 0.2, 32], [-941, 45, 0.2, 32]]
     6  grass | finalizeChunks < boot | chunk:grass   [[-1020, 137, 0.4, 142], [-1020, 134, 0.4, 140], [-1020, 128, 0.4, 136], [-1019, 125, 0.3, 134], [-1019, 122, 0.4, 132]]
     5  ?3a3c3e | splitInstanced < optimizeCity < boot | inst   [[-1079, 43, 2.6, 171], [-926, 160, 5.6, 112], [-949, 216, 6.1, 172], [-1079, 49, 0.3, 171], [-984, 147, 0.2, 124]]
     4  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[-1006, 129, 5.6, 126], [-1006, 129, 3.4, 126], [-1030, 76, 1.2, 124], [-1006, 129, 1.2, 126]]
     2  aL_o1_117q | finalizeChunks < boot | chunk:aL_o1_117q   [[-989, 127, 0.1, 112], [-989, 125, 0.1, 110]]
     1  facade | finalizeChunks < boot | chunk:facade   [[-930, 130, 3.3, 83]]
     1  aL_o1_45I | finalizeChunks < boot | chunk:aL_o1_45I   [[-984, 150, 0.2, 126]]
     1  ?9aa0a4 | splitInstanced < optimizeCity < boot | inst   [[-990, 109, 0.2, 101]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: rayos_-909_49_307.jpg, rayos_-909_49_307.txt
