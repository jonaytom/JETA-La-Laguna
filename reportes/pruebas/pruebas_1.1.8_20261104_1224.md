# Pruebas 1.1.8 — 2026-11-04 12:24 — 4/4 OK

Listas: origen. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 73 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_origen.py 105 -45 14 4` | **OK** | 0 s |
| 2 | `herramientas/sonda_origen.py -60 -230 14 4` | **OK** | 0 s |
| 3 | `herramientas/sonda_origen.py -10 -150 14 4` | **OK** | 0 s |
| 4 | `herramientas/sonda_origen.py -191 366 25 0` | **OK** | 52 s |

## Detalle

### 1. herramientas/sonda_origen.py 105 -45 14 4 — OK

```
origen en X 105, Y -45 (radio 14 m, desde 4 m sobre el suelo); registradas 8565, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     1  addMesh < box < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | 8f8b84 | BoxGeometry |    [[122, -49, 11.6, 12, 6.4, 23.7]]
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
SONDA ORIGEN OK
```

### 2. herramientas/sonda_origen.py -60 -230 14 4 — OK

```
origen en X -60, Y -230 (radio 14 m, desde 4 m sobre el suelo); registradas 8565, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     1  addMesh < buildLandmarkDecoEach < buildLandmarkDeco < buildLandmarks < boot | ffffff | ConeGeometry |    [[-47, -243, 14.1, 15.7, 8.1, 8.1]]
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
SONDA ORIGEN OK
```

### 3. herramientas/sonda_origen.py -10 -150 14 4 — OK

```
origen en X -10, Y -150 (radio 14 m, desde 4 m sobre el suelo); registradas 8565, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
SONDA ORIGEN OK
```

### 4. herramientas/sonda_origen.py -191 366 25 0 — OK

```
origen en X -191, Y 366 (radio 25 m, desde 0 m sobre el suelo); registradas 8565, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
SONDA ORIGEN OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-10_-150.txt, origen_-191_366.txt, origen_-60_-230.txt, origen_105_-45.txt
