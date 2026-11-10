# Pruebas 1.2.5 — 2026-11-10 15:30 — 6/6 OK

Listas: origen_obst. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 82 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_origen.py -754 -362 1.5 0` | **OK** | 9 s |
| 2 | `herramientas/sonda_origen.py -15 217 6 0` | **OK** | 0 s |
| 3 | `herramientas/foto_vista.py edif_barcelona -5 235 25 -15 217` | **OK** | 48 s |
| 4 | `herramientas/foto_vista.py edif_3221 -850 95 30 -860 78` | **OK** | 0 s |
| 5 | `herramientas/sonda_vias.py -15 217 40` | **OK** | 0 s |
| 6 | `herramientas/sonda_vias.py -860 78 40` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_origen.py -754 -362 1.5 0 — OK

```
origen en X -754, Y -362 (radio 1.5 m, desde 0 m sobre el suelo); registradas 8398, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
     3  makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot | 3a2a1a | BoxGeometry |    [[-754, -363, 1.9, 1.9], [-754, -363, 1.9, 1.9], [-754, -363, 1.9, 1.9]]
     2  makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot | 3b2a1e | BufferGeometry |    [[-754, -363, 1.9, 2.1], [-754, -363, 1.9, 2]]
     2  makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot | 3a2a1a | TorusGeometry |    [[-754, -363, 1.9, 1.9], [-754, -363, 1.9, 1.9]]
     2  makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot | bfd6e0 | CircleGeometry |    [[-754, -363, 1.9, 1.9], [-754, -363, 1.9, 1.9]]
     2  makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot | ffffff | BufferGeometry |    [[-754, -363, 1.9, 1.9], [-754, -362, 0.1, 2.1]]
     1  attachTo < makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i | 222222 | CylinderGeometry |    [[-754, -362, 1.1, 1.2]]
     1  attachTo < makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i | 2f3a2a | CylinderGeometry |    [[-754, -362, 1.2, 1.2]]
     1  Object.make < placeStarts < Object.initMissions < i < boot | f5b72e | CylinderGeometry |    [[-753, -361, 0.1, 3.1]]
     1  Object.make < placeStarts < Object.initMissions < i < boot | f5b72e | RingGeometry |    [[-753, -361, 0.3, 0.3]]
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
  13334  ?ffffff | makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot  X -754..-754  Y -363..-362  alt 0.2..2.1   [[-754, -362, 2], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2]]
   1814  ?3b2a1e | makeHumanSkinnedPart3 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot  X -754..-754  Y -363..-362  alt 1.9..2.1   [[-754, -362, 1.9], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2], [-754, -362, 2]]
    420  ?3a2a1a | makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot  X -754..-754  Y -363..-362  alt 1.9..1.9   [[-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9]]
     53  ?f5b72e | Object.make < placeStarts < Object.initMissions < i < boot  X -754..-753  Y -363..-361  alt 0.3..2.2   [[-753, -363, 1.1], [-754, -362, 2.1], [-754, -361, 1], [-753, -363, 0.4], [-754, -362, 0.4], [-754, -362, 0.3]]
     48  ?222222 | attachTo < makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i  X -754..-754  Y -362..-362  alt 1.2..1.2   [[-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2]]
     48  ?2f3a2a | attachTo < makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i  X -754..-754  Y -362..-362  alt 1.2..1.2   [[-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2], [-754, -362, 1.2]]
     32  ?bfd6e0 | makeHumanSkinnedPart4 < makeHumanSkinned < makeHuman < Object.initMissions < i < boot  X -754..-754  Y -363..-363  alt 1.9..1.9   [[-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9], [-754, -363, 1.9]]
      1  ?ffffff | buildTrafficSignsPart6 < buildTrafficSigns < boot  X -753..-753  Y -362..-362  alt 0.2..0.2   []
      1  asphalt | finalizeChunks < boot | chunk:asphalt  X -754..-754  Y -361..-361  alt 0.1..0.1   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

### 2. herramientas/sonda_origen.py -15 217 6 0 — OK

```
origen en X -15, Y 217 (radio 6 m, desde 0 m sobre el suelo); registradas 8398, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
      3  asphalt | finalizeChunks < boot | chunk:asphalt  X -20..-13  Y 215..220  alt 0.1..0.2   [[-13, 215, 0.2]]
      2  wood | finalizeChunks < boot | chunk:wood  X -11..-11  Y 215..215  alt 4.1..4.6   [[-11, 215, 4.6]]
      1  ?ffffff | buildTerrain < boot  X -19..-19  Y 221..221  alt 0.0..0.0   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
SONDA ORIGEN OK
```

### 3. herramientas/foto_vista.py edif_barcelona -5 235 25 -15 217 — OK

```
FOTO VISTA OK edif_barcelona
```

### 4. herramientas/foto_vista.py edif_3221 -850 95 30 -860 78 — OK

```
FOTO VISTA OK edif_3221
```

### 5. herramientas/sonda_vias.py -15 217 40 — OK

```
vías a menos de 40 m de X -15, Y 217 (puntos: X, Y, calzada − terreno)
{"ri": 3, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 10.4, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[17, 203.5, 0], [12.5, 205.5, 0], [5.8, 201.9, 0], [-53.3, 217.8, 0], [-77.5, 224.5, 0], [-83, 225.5, 0]]}
{"ri": 62, "nombre": "Calle La Sota", "tipo": "residential", "ancho": 7.5, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[-21, 343, 0], [-47.1, 224.1, 0]]}
{"ri": 1778, "nombre": "Calle Doctor Antonio Gonzalez", "tipo": "residential", "ancho": 7.5, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[22.5, 212.5, 0], [25.5, 215.5, 0], [29, 234.5, 0], [30, 245.1, 0]]}
{"ri": 3331, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 10.4, "flags": 1, "hundida": false, "puntos": [[43.5, 211, 0], [33.5, 209.5, 0], [17, 203.5, 0]]}
{"ri": 3337, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 10.4, "flags": 1, "hundida": false, "carriles": [2, -1, 1], "puntos": [[-83, 225.5, 0], [-79, 230, 0], [-51.3, 224.4, 0], [-47.1, 224.1, 0], [8.2, 212.2, 0], [11.6, 211.6, 0], [18.5, 210.5, 0], [22.5, 212.5, 0]]}
SONDA VIAS OK
```

### 6. herramientas/sonda_vias.py -860 78 40 — OK

```
vías a menos de 40 m de X -860, Y 78 (puntos: X, Y, calzada − terreno)
{"ri": 1267, "nombre": "", "tipo": "motorway_link", "ancho": 7.8, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[-792.7, 208.3, 0], [-801.2, 198.5, 0], [-805.6, 185, 0], [-812.6, 173.8, 0], [-820.7, 163.7, 0], [-829.1, 153.7, 0], [-837.1, 143.8, 0], [-841.4, 139.1, 0], [-850.3, 129.4, 0], [-859.1, 119.8, 0], [-868.2, 110.1, 0], [-878, 100.8, 0], [-893.8, 86.9, 0], [-903.6, 78.9, 0], [-913.5, 71.3, 0]]}
{"ri": 2005, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 1, "hundida": false, "puntos": [[-872, 99, 0], [-884, 90.5, 0], [-907, 70, 0], [-909.5, 63.5, 0], [-908, 58.5, 0], [-906, 55.5, 0], [-899.5, 51, 0]]}
{"ri": 2006, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 1, "hundida": false, "puntos": [[-858.5, 70, 0], [-822.5, 78.5, 0]]}
{"ri": 2007, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 0, "hundida": false, "puntos": [[-819, 64, 0], [-822.5, 78.5, 0], [-826.5, 94, 0]]}
{"ri": 2009, "nombre": "", "tipo": "service", "ancho": 4.8, "flags": 1, "hundida": false, "puntos": [[-826.5, 94, 0], [-862, 86, 0], [-858.5, 70, 0]]}
{"ri": 2010, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 1, "hundida": false, "puntos": [[-826.5, 94, 0], [-828.5, 102, 0], [-831.5, 108.5, 0], [-835.5, 112, 0], [-843, 112, 0], [-856, 108.5, 0], [-872, 99, 0]]}
{"ri": 2286, "nombre": "Autopista del Norte", "tipo": "motorway", "ancho": 13.4, "flags": 1, "hundida": true, "puntos": [[-792.7, 208.3, 0], [-801, 199.1, 0], [-809.4, 189.9, 0], [-817.7, 180.7, 0], [-826.1, 171.5, 0], [-834.5, 162.4, 0], [-842.9, 153.2, 0], [-851.3, 144.1, 0], [-859.7, 134.9, 0], [-868.1, 125.8, 0], [-876.7, 116.7, 0], [-886.8, 107.3, 0], [-897.2, 98, 0], [-907.8, 89.1, 0], [-921.8, 78.4, 0], [-936.3, 68.9, 0], [-951.1, 59.8, 0], [-967, 50.7, 0], [-979, 45, 0], [-990.9, 39.5, 0], [-1002.9, 34.2, 0], [-1016.3, 28.9, 0], [-1030, 24, 0], [-1043.6, 19.2, 0], [-1057.2, 14.5, 0], [-1071, 10.1, 0], [-1084.8, 5.7, 0], [-1098.6, 1.4, 0], [-1112.8, -3.1, 0], [-1127, -7.6, 0], [-1141.2, -12, 0], [-1152.8, -15.6, 0], [-1164.4, -19.3, 0], [-1176, -22.9, 0], [-1187.6, -26.5, 0], [-1199.2, -30.1, 0], [-1210.9, -33.8, 0], [-1222.5, -37.4, 0], [-1234.1, -41, 0], [-1245.7, -44.6, 0], [-1257.3, -48.2, 0], [-1268.9, -51.9, 0], [-1280.5, -55.5, 0], [-1292.1, -59.1, 0], [-1303.7, -62.7, 0], [-1315.4, -66.4, 0], [-1327, -70, 0], [-1338.6, -73.6, 0], [-1350.2, -77.2, 0], [-1361.8, -80.9, 0], [-1373.4, -84.5, 0], [-1385, -88.1, 0], [-1396.6, -91.7, 0], [-1408.3, -95.3, 0], [-1419.9, -99, 0], [-1431.5, -102.6, 0], [-1443.1, -106.2, 0], [-1454.7, -109.8, 0], [-1466.3, -113.5, 0], [-1477.9, -117.1, 0], [-1489.5, -120.7, 0], [-1501.2, -124.3, 0], [-1512.8, -128, 0], [-1524.4, -131.6, 0], [-1536, -135.2, 0], [-1547.6, -138.8, 0], [-1559.2, -142.4, 0], [-1570.8, -146.1, 0], [-1582.4, -149.7, 0], [-1594.1, -153.3, 0], [-1605.7, -156.9, 0], [-1617.3, -160.6, 0], [-1628.9, -164.2, -0.1], [-1640.5, -167.8, -0.4], [-1652.1, -171.4, -0.9], [-1663.7, -175.1, -1.5], [-1675.3, -178.7, -2.2], [-1686.9, -182.3, -3], [-1698.6, -185.9, -3.8], [-1710.2, -189.6, -4.6], [-1721.8, -193.2, -5.3]]}
{"ri": 2567, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[-819, 64, 0], [-855.5, 55.5, 0], [-858.5, 70, 0]]}
{"ri": 3594, "nombre": "", "tipo": "service", "ancho": 5.2, "flags": 1, "hundida": false, "puntos": [[-831.5, 108.5, 0], [-833.5, 119, 0], [-835, 126, 0], [-838, 127, 0], [-842, 124.5, 0], [-852.5, 113.5, 0], [-856, 108.5, 0]]}
SONDA VIAS OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-15_217.txt, origen_-754_-362.txt, vias_-15_217.txt, vias_-860_78.txt, vista_edif_3221.jpg, vista_edif_barcelona.jpg
