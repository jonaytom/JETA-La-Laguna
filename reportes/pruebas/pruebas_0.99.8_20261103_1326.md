# Pruebas 0.99.8 — 2026-11-03 13:26 — 9/9 OK

Listas: v1000g, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 136 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 50 s |
| 3 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_sueltas.py` | **OK** | 0 s |
| 5 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 6 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 7 | `prueba_bordes.py` | **OK** | 0 s |
| 8 | `prueba_persecuciones.py` | **OK** | 27 s |
| 9 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 34 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 20, 'peor': 91, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4447 de 6019 · siguen metidos ≥ 1 m: 15
   [1424, 3934, 3.3, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [783, 3065, 2.1, '']
   [-848, 72, 2, '']
   [3344, 1960, 1.9, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-11, -253, 1.5, '']
   [-882, -445, 1.4, '']
   [29, -295, 1.4, '']
   [-1633, -195, 1.3, '']
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
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
gente (altura m): caja {'n': 8, 'min': 2.51, 'med': 2.58, 'max': 2.62} · por la cabeza {'n': 8, 'min': 1.49, 'med': 1.65, 'max': 1.68} · jugador 1.83 · real: 1,60–1,85
coches (m): largo {'n': 4, 'min': 3.99, 'med': 4.28, 'max': 4.3} · ancho {'n': 4, 'min': 1.75, 'med': 1.8, 'max': 1.9} · alto {'n': 4, 'min': 1.25, 'med': 1.46, 'max': 1.47} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4447 · quitados (solo quedaba una tira) 520
edificios quitados por superficie original (m²): {'≥300': 27, '20-50': 165, '100-300': 106, '50-100': 141, '<20': 81}
   X 1729, Y 3787: 3412 m²
   X 1777, Y 3743: 1796 m²
   X -239, Y 708: 1412 m²
   X -843, Y 304: 1406 m²
   X 2651, Y 2048: 1173 m²
   X -3023, Y -50: 1161 m²
   X 897, Y 723: 979 m²
   X 2090, Y 1957: 955 m²
   X 859, Y 662: 773 m²
   X -902, Y -6: 764 m²
   X -3340, Y -236: 760 m²
   X 1567, Y 1738: 710 m²
   X -232, Y 33: 618 m²
   X 1752, Y 4207: 591 m²
   X 2148, Y 1969: 563 m²
   X -302, Y 970: 551 m²
   X 496, Y 2909: 550 m²
   X 392, Y 1029: 466 m²
   X 21, Y -535: 420 m²
   X -4626, Y -340: 419 m²
   X -1142, Y 2024: 415 m²
   X 816, Y 2083: 368 m²
   X 379, Y 997: 355 m²
   X 2322, Y 3596: 339 m²
   X -791, Y 447: 309 m²
SONDA TAMANOS OK
```

### 4. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 1830 mallas, 1837 llamadas, 2092702 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
     999     1006  1733819    345  595   607    0    450   999  (sin nombre: Group) · BufferGeometry/MeshStandardMaterial 473, BoxGeometry/MeshStandardMaterial 268, PlaneGeometry/MeshStandardMaterial 76, BoxGeometry/MeshBasicMaterial 53
     527      527    70310      0  184   510    0    296   527  (sin nombre: Mesh) · PlaneGeometry/MeshStandardMaterial 244, BufferGeometry/MeshStandardMaterial 144, BoxGeometry/MeshStandardMaterial 58, CylinderGeometry/MeshStandardMaterial 51
     180      180   215923      0  143    64    0    149   180  root · BufferGeometry/MeshStandardMaterial 121, BoxGeometry/MeshStandardMaterial 26, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
      28       28     1906      0    9    28    0      3    28  obispado · PlaneGeometry/MeshStandardMaterial 25, BufferGeometry/MeshStandardMaterial 3
      27       27    25374      0   22    23    0     10    27  inicio · PlaneGeometry/MeshStandardMaterial 11, BufferGeometry/MeshStandardMaterial 10, CylinderGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 3
      16       16    19693      0   16    16    0     16    16  La Concepción · BufferGeometry/MeshStandardMaterial 16
      12       12    11586      0   12    12    0      9    12  aeropuerto · BufferGeometry/MeshStandardMaterial 9, PlaneGeometry/MeshStandardMaterial 3
      12       12      463      0    7    12    0     12    12  Estadio Francisco Peraza · BufferGeometry/MeshStandardMaterial 9, CylinderGeometry/MeshStandardMaterial 3
      11       11    10240      0   11    11    0      5    11  aeropuerto2 · PlaneGeometry/MeshStandardMaterial 6, BufferGeometry/MeshStandardMaterial 5
       8        8     1826      0    8     8    0      7     8  pabellon · BufferGeometry/MeshStandardMaterial 7, PlaneGeometry/MeshStandardMaterial 1
       5        5     1500      0    5     5    0      5     5  casas · BufferGeometry/MeshStandardMaterial 5
       5        5       62      0    5     5    0      2     5  Pabellón Juan Ríos Tejera · BufferGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 2
SONDA SUELTAS OK
```

### 5. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793712319103,"label":"test","player":{"x":-172.29790756579558,"z":269.8589385641032,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":-0.3335843214997931,"x":-174.29790756579558,"z":269.8589385641032},"weapon":{"has":true,"ammo":4,"out":true},
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 6. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.1","punta":"204","maxV":"205","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -173 · Y 0 · 556 m"}
```

### 7. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-26 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-26 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-26 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-26 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":2}
```

### 8. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 15 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.15 m OK | a pie: a 5 m, recorre 6 m en 3 s, salto máx 0.15 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 9. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_sueltas.txt, sonda_tamanos.txt
