# Pruebas 0.99.8 — 2026-11-03 13:35 — 9/9 OK

Listas: v1000h, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 215 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 50 s |
| 3 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_sueltas.py` | **OK** | 0 s |
| 5 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 6 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 7 | `prueba_bordes.py` | **OK** | 1 s |
| 8 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 87 s |
| 9 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 33 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 19, 'peor': 80, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4447 de 6093 · siguen metidos ≥ 1 m: 25
   [1424, 3934, 3.3, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [-3023, -50, 2.4, '']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [-843, 304, 1.9, '']
   [3344, 1960, 1.9, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-1698, 1220, 1.5, '']
   [859, 662, 1.5, '']
   [-232, 33, 1.5, '']
   [-11, -253, 1.5, '']
   [-882, -445, 1.4, '']
   [-791, 447, 1.4, '']
   [1777, 3743, 1.4, '']
   [29, -295, 1.4, '']
   [-1633, -195, 1.3, '']
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
   [471, 562, 1.2, '']
   [554, 1939, 1.1, '']
   [2270, 3396, 1, 'Área de Hospitalización']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. herramientas/sonda_tamanos.py — OK

```
gente (altura m): caja {'n': 8, 'min': 2.61, 'med': 2.72, 'max': 2.82} · por la cabeza {'n': 8, 'min': 1.68, 'med': 1.84, 'max': 1.93} · jugador 1.84 · real: 1,60–1,85
coches (m): largo {'n': 4, 'min': 4.07, 'med': 4.3, 'max': 4.36} · ancho {'n': 4, 'min': 1.73, 'med': 1.8, 'max': 1.9} · alto {'n': 4, 'min': 1.25, 'med': 1.46, 'max': 1.56} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
calles (ancho m, tal cual en el juego):
   residential      {'n': 1720, 'min': 5.4, 'med': 7.9, 'max': 12.2}
   tertiary         {'n': 346, 'min': 10.4, 'med': 10.4, 'max': 13}
   motorway_link    {'n': 112, 'min': 7.8, 'med': 7.8, 'max': 11.1}
   secondary        {'n': 264, 'min': 6.6, 'med': 11.7, 'max': 13}
   primary_link     {'n': 24, 'min': 9.1, 'med': 9.1, 'max': 9.1}
   unclassified     {'n': 101, 'min': 6.1, 'med': 8, 'max': 12.2}
   service          {'n': 1056, 'min': 3.5, 'med': 5.2, 'max': 8}
   tertiary_link    {'n': 19, 'min': 7.8, 'med': 7.8, 'max': 7.8}
   motorway         {'n': 75, 'min': 13.4, 'med': 13.4, 'max': 18.5}
   secondary_link   {'n': 39, 'min': 9.1, 'med': 9.1, 'max': 9.1}
   primary          {'n': 89, 'min': 11.7, 'med': 13, 'max': 18.2}
   living_street    {'n': 4, 'min': 4.8, 'med': 5.8, 'max': 7.2}
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4447 · quitados (solo quedaba una tira) 444
edificios quitados por superficie original (m²): {'20-50': 165, '100-300': 57, '50-100': 141, '<20': 81}
   X -4665, Y -5: 148 m²
   X -308, Y 1184: 147 m²
   X -3789, Y -259: 147 m²
   X -4552, Y 397: 141 m²
   X -309, Y 1167: 139 m²
   X -328, Y -984: 139 m²
   X 559, Y 1914: 137 m²
   X 255, Y 1740: 137 m²
   X -530, Y 252: 136 m²
   X -82, Y -1224: 135 m²
   X -1169, Y 608: 134 m²
   X -452, Y -421: 134 m²
   X -3254, Y 698: 131 m²
   X 172, Y -767: 130 m²
   X -51, Y -1003: 129 m²
   X 1215, Y 1706: 128 m²
   X 2112, Y 3124: 128 m²
   X -229, Y 1778: 126 m²
   X 1199, Y 1713: 125 m²
   X -4659, Y -344: 124 m²
   X -4633, Y -373: 122 m²
   X 329, Y 1857: 120 m²
   X 593, Y 2917: 119 m²
   X 72, Y -320: 119 m²
   X -3818, Y -262: 118 m²
SONDA TAMANOS OK
```

### 4. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 1840 mallas, 1847 llamadas, 2087601 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
    1005     1012  1740797    348  602   615    0    453  1005  (sin nombre: Group) · BufferGeometry/MeshStandardMaterial 468, BoxGeometry/MeshStandardMaterial 272, PlaneGeometry/MeshStandardMaterial 76, BoxGeometry/MeshBasicMaterial 53
     527      527    70296      0  184   510    0    296   527  (sin nombre: Mesh) · PlaneGeometry/MeshStandardMaterial 244, BufferGeometry/MeshStandardMaterial 144, BoxGeometry/MeshStandardMaterial 58, CylinderGeometry/MeshStandardMaterial 51
     184      184   203858      0  144    69    0    150   184  root · BufferGeometry/MeshStandardMaterial 120, BoxGeometry/MeshStandardMaterial 28, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
      28       28     1906      0    9    28    0      3    28  obispado · PlaneGeometry/MeshStandardMaterial 25, BufferGeometry/MeshStandardMaterial 3
      27       27    25374      0   22    23    0     10    27  inicio · PlaneGeometry/MeshStandardMaterial 11, BufferGeometry/MeshStandardMaterial 10, CylinderGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 3
      16       16    19693      0   16    16    0     16    16  La Concepción · BufferGeometry/MeshStandardMaterial 16
      12       12    11586      0   12    12    0      9    12  aeropuerto · BufferGeometry/MeshStandardMaterial 9, PlaneGeometry/MeshStandardMaterial 3
      12       12      463      0    7    12    0     12    12  Estadio Francisco Peraza · BufferGeometry/MeshStandardMaterial 9, CylinderGeometry/MeshStandardMaterial 3
      11       11    10240      0   11    11    0      5    11  aeropuerto2 · PlaneGeometry/MeshStandardMaterial 6, BufferGeometry/MeshStandardMaterial 5
       8        8     1826      0    8     8    0      7     8  pabellon · BufferGeometry/MeshStandardMaterial 7, PlaneGeometry/MeshStandardMaterial 1
       5        5     1500      0    5     5    0      5     5  casas · BufferGeometry/MeshStandardMaterial 5
       5        5       62      0    5     5    0      2     5  Pabellón Juan Ríos Tejera · BufferGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 2
== al juntar la ciudad: juntadas 7360 en 1683 mallas; sin juntar, por motivo:
    3636  grupo con nombre  · p. ej. 
     548  con hijos (se juntan desde v1.0.0)  · p. ej. X 169, Y -622 (CylinderGeometry) X 168, Y -623 (CylinderGeometry) X 168, Y -620 (CylinderGeometry) X 167, Y -621 (CylinderGeometry)
     306  transparente  · p. ej. X 164, Y -594 (BoxGeometry) X 216, Y -598 (BoxGeometry) X -124, Y 97 (BoxGeometry) X -164, Y 214 (BoxGeometry)
     103  userData  · p. ej. X -399, Y 749 (BoxGeometry) X -399, Y 749 (BoxGeometry) X -399, Y 749 (BoxGeometry) X -400, Y 749 (BoxGeometry)
       2  varios materiales  · p. ej. X 2269, Y 3389 (BoxGeometry) X 2238, Y 3460 (CylinderGeometry)
       1  onBeforeRender  · p. ej. X -147, Y -618 (ShapeGeometry)
== mallas sueltas colgadas de la escena, por tipo
    230  PlaneGeometry · MeshStandardMaterial transparente  · p. ej. X 0, Y 0 X 0, Y 0 X 0, Y 0
    144  BufferGeometry · MeshStandardMaterial  · p. ej. X 0, Y 0 X 0, Y 0 X 0, Y 0
     57  BoxGeometry · MeshStandardMaterial  · p. ej. X 1727, Y 3830 X 885, Y 2661 X 1022, Y 2860
     51  CylinderGeometry · MeshStandardMaterial  · p. ej. X -179, Y -30 X -179, Y -30 X -179, Y -30
     18  PlaneGeometry · MeshBasicMaterial transparente  · p. ej. X -152, Y -165 X -124, Y -126 X -252, Y -248
     14  PlaneGeometry · MeshStandardMaterial  · p. ej. X 1727, Y 3830 X 885, Y 2661 X 1022, Y 2860
     10  ExtrudeGeometry · MeshStandardMaterial  · p. ej. X 356, Y 1527 X 355, Y 1527 X 379, Y 1509
      1  CircleGeometry · MeshStandardMaterial  · p. ej. X -179, Y -30
      1  ExtrudeGeometry · MeshStandardMaterial transparente  · p. ej. X 2351, Y 3296
      1  BoxGeometry · MeshStandardMaterial transparente  · p. ej. X -334, Y 798
      1  BufferGeometry · MeshStandardMaterial transparente  · p. ej. X 0, Y 0
SONDA SUELTAS OK
```

### 5. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793712766815,"label":"test","player":{"x":-172.29790756579558,"z":269.8589385641032,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":-0.3335843214997931,"x":-174.29790756579558,"z":269.8589385641032},"weapon":{"has":true,"ammo":4,"out":true},
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 6. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.1","punta":"206","maxV":"207","boca":["-531.4","-351.8"],"inicio":["-532.7","-353.4"],"coords":"X -173 · Y 0 · 556 m"}
```

### 7. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[1,-1],"borde":810,"calle":2.9,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[1,-2],"borde":810,"calle":2.7,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[1500,700],"borde0":305,"ahora":[1,-2],"borde":809,"calle":2.6,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":2}
```

### 8. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 1.900000000372529
{"frame":562,"calls":1237,"triangles":2992242,"points":0,"lines":0} calls:1237
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.59 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.13 m OK
[10] El carterista del Cristo: a pie: a 7 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1366 m, recorre 22 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 9. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
CONOCIDO {'off': 0.1, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.6, 'x': 1220, 'z': 2534, 'y': -123.6}
snap df_1667
failed 0 of 118 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2534
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1667.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_sueltas.txt, sonda_tamanos.txt
