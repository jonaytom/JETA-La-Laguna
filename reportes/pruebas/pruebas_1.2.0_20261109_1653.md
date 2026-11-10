# Pruebas 1.2.0 — 2026-11-09 16:53 — 1/1 OK

Listas: honorato_rayos. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 77 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py -918 50 326 -40` | **OK** | 56 s |

## Detalle

### 1. herramientas/sonda_rayos.py -918 50 326 -40 — OK

```
rayos desde X -918, Y 50, rumbo 326° (cosas a más de -40 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    94  ?ffffff | buildTerrain < boot |    [[-1008, 94, 0, 101], [-1006, 88, 0, 96], [-1004, 82, 0, 92], [-1002, 77, 0, 88], [-1000, 73, 0, 85]]
    27  asphalt | finalizeChunks < boot | chunk:asphalt   [[-1024, 161, 0.1, 154], [-1008, 100, 0.1, 103], [-918, 68, 0.1, 18], [-919, 67, 0.1, 17], [-919, 66, 0.1, 17]]
    22  trim | finalizeChunks < boot | chunk:trim   [[-910, 97, 0.2, 48], [-912, 95, 0.2, 46], [-933, 64, 0.6, 20], [-934, 63, 0.5, 20], [-935, 62, 0.5, 21]]
    12  aL_o3_134m | finalizeChunks < boot | chunk:aL_o3_134m   [[-913, 96, 0.2, 47], [-915, 95, 0.2, 45], [-917, 93, 0.2, 43], [-919, 92, 0.2, 42], [-921, 90, 0.2, 40]]
     5  disc | finalizeChunks < boot | chunk:disc   [[-1021, 145, 0.1, 140], [-1011, 109, 0.1, 110], [-992, 65, 0.1, 76], [-915, 70, 0.1, 21], [-915, 70, 0.1, 20]]
     2  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-1012, 126, 8.6, 121], [-1000, 89, 6, 91]]
     2  grass | finalizeChunks < boot | chunk:grass   [[-1014, 128, 0.4, 123], [-1010, 116, 0.3, 113]]
     1  tunnel | finalizeChunks < boot | chunk:tunnel   [[-916, 60, 0, 10]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: rayos_-918_50_326.jpg, rayos_-918_50_326.txt
