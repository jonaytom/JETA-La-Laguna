# Pruebas 1.2.0 — 2026-11-09 17:22 — 2/2 OK

Listas: honorato_acera_sobra. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 55 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_origen.py -949 80 9 -3` | **OK** | 4 s |
| 2 | `herramientas/sonda_origen.py -952 74 9 -3` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_origen.py -949 80 9 -3 — OK

```
origen en X -949, Y 80 (radio 9 m, desde -3 m sobre el suelo); registradas 8309, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
     30  trim | finalizeChunks < boot | chunk:trim  X -946..-942  Y 72..88  alt -1.5..1.3   [[-946, 88, -1.3], [-943, 73, 0.7], [-945, 72, 0.4], [-946, 72, 0.7], [-945, 72, 1.3]]
      8  aL_o3_134m | finalizeChunks < boot | chunk:aL_o3_134m  X -955..-940  Y 75..84  alt 0.1..0.2   [[-955, 77, 0.2], [-940, 81, 0.2]]
      5  asphalt | finalizeChunks < boot | chunk:asphalt  X -955..-947  Y 83..89  alt 0.1..0.1   [[-955, 86, 0.1]]
      3  ?ffffff | buildTerrain < boot  X -957..-941  Y 77..83  alt -0.0..-0.0   [[-957, 83, 0]]
      3  tunnel | finalizeChunks < boot | chunk:tunnel  X -946..-942  Y 81..88  alt -1.6..-1.3   []
      1  tunnelLight | finalizeChunks < boot | chunk:tunnelLight  X -940..-940  Y 82..82  alt -1.6..-1.6   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

### 2. herramientas/sonda_origen.py -952 74 9 -3 — OK

```
origen en X -952, Y 74 (radio 9 m, desde -3 m sobre el suelo); registradas 8309, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     1  finalizeChunks < boot | ffe2a8 | BufferGeometry | chunk:tunnelLight   [[-937, 86, -1.7, 3.9]]
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
    111  trim | finalizeChunks < boot | chunk:trim  X -956..-943  Y 66..74  alt -0.1..1.3   [[-943, 73, 0.7], [-945, 72, 0.4], [-946, 72, 0.7], [-947, 71, 0.4], [-948, 70, 0.6], [-950, 69, 0.4]]
      8  aL_o3_134m | finalizeChunks < boot | chunk:aL_o3_134m  X -959..-947  Y 71..81  alt 0.2..0.2   [[-955, 77, 0.2]]
      1  ?ffffff | buildTerrain < boot  X -947..-947  Y 77..77  alt -0.0..-0.0   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-949_80.txt, origen_-952_74.txt
