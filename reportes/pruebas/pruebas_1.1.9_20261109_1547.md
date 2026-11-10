# Pruebas 1.1.9 — 2026-11-09 15:47 — 3/3 OK

Listas: honorato_fotos. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 156 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rayos.py -1012 120 100 1` | **OK** | 62 s |
| 2 | `herramientas/sonda_rayos.py -945 100 280 1` | **OK** | 36 s |
| 3 | `herramientas/sonda_rayos.py -985 140 160 1` | **OK** | 35 s |

## Detalle

### 1. herramientas/sonda_rayos.py -1012 120 100 1 — OK

```
rayos desde X -1012, Y 120, rumbo 100° (cosas a más de 1 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
   109  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[-1011, 119, 2.6, 2], [-1011, 119, 2.6, 2], [-1011, 119, 2.6, 2], [-1011, 119, 2.7, 2], [-1011, 119, 2.7, 2]]
    10  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-981, 97, 7.7, 39], [-980, 98, 7.9, 39], [-982, 98, 5.1, 37], [-981, 99, 5.3, 37], [-978, 100, 5.5, 39]]
     1  ?9aa0a4 | splitInstanced < optimizeCity < boot | inst   [[-990, 109, 1.1, 24]]
SONDA RAYOS OK
```

### 2. herramientas/sonda_rayos.py -945 100 280 1 — OK

```
rayos desde X -945, Y 100, rumbo 280° (cosas a más de 1 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    27  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-975, 98, 7.8, 31], [-975, 96, 7.7, 31], [-975, 94, 7.7, 32], [-986, 84, 9.4, 45], [-983, 83, 8.8, 43]]
     2  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[-1011, 119, 4.8, 69], [-978, 96, 1.3, 33]]
SONDA RAYOS OK
```

### 3. herramientas/sonda_rayos.py -985 140 160 1 — OK

```
rayos desde X -985, Y 140, rumbo 160° (cosas a más de 1 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    10  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-992, 85, 6.9, 56], [-989, 87, 7, 54], [-986, 85, 7.5, 55], [-980, 99, 6.6, 41], [-978, 100, 6.7, 41]]
     1  ?ffffff | buildParkedPart3 < buildParked < boot | parked   [[-845, 71, 1.7, 156]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: rayos_-1012_120_100.jpg, rayos_-1012_120_100.txt, rayos_-945_100_280.jpg, rayos_-945_100_280.txt, rayos_-985_140_160.jpg, rayos_-985_140_160.txt
