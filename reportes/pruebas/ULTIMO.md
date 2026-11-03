# Pruebas 1.0.0 — 2026-11-03 14:16 — 5/5 OK

Listas: v1000e. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 71 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 51 s |
| 3 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_recorte_motivos.py` | **OK** | 0 s |
| 5 | `herramientas/sonda_sueltas.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 21, 'peor': 76, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4779 de 6288 · siguen metidos ≥ 1 m: 21
   [1424, 3934, 3.3, '']
   [-4699, 92, 2.8, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [1696, 4075, 2, '']
   [-857, 279, 1.9, '']
   [3344, 1960, 1.9, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-892, 1471, 1.6, '']
   [172, -767, 1.5, '']
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
gente (altura m): caja {'n': 8, 'min': 2.52, 'med': 2.63, 'max': 2.68} · por la cabeza {'n': 8, 'min': 1.56, 'med': 1.75, 'max': 1.8} · jugador 1.83 · real: 1,60–1,85
coches (m): largo {'n': 4, 'min': 1.93, 'med': 4.3, 'max': 4.37} · ancho {'n': 4, 'min': 0.74, 'med': 1.79, 'max': 1.9} · alto {'n': 4, 'min': 1.08, 'med': 1.25, 'max': 1.44} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4779 · quitados (solo quedaba una tira) 248
edificios quitados por superficie original (m²): {'20-50': 165, '<20': 81, '50-100': 2}
   X -1275, Y 698: 50 m²
   X -1250, Y -371: 50 m²
   X 198, Y 1457: 49 m²
   X -1250, Y -378: 49 m²
   X 1458, Y 3797: 49 m²
   X 1478, Y 3602: 49 m²
   X 1590, Y 3519: 49 m²
   X 1397, Y 3535: 49 m²
   X 1549, Y 3655: 49 m²
   X 2348, Y 2933: 48 m²
   X -3160, Y -141: 48 m²
   X 1497, Y 3599: 48 m²
   X 1433, Y 3611: 48 m²
   X -4342, Y -364: 47 m²
   X 1556, Y 3663: 47 m²
   X 1587, Y 3659: 47 m²
   X 1564, Y 3766: 47 m²
   X 2298, Y 3263: 46 m²
   X -1251, Y -309: 46 m²
   X -1243, Y -411: 46 m²
   X 1582, Y 3651: 46 m²
   X 1574, Y 3596: 46 m²
   X 1524, Y 3639: 46 m²
   X 1419, Y 3654: 46 m²
   X 1402, Y 3617: 46 m²
SONDA TAMANOS OK
```

### 4. herramientas/sonda_recorte_motivos.py — OK

```
auditoría 2026-11-03_1.0.0_local · 19 casos críticos y altos
crítica X -885, Y 143 · (sin nombre) (motorway_link) · edificio #1066 · invade 4.01 m · 27 m² · medio: quedaría una tira (0 de 27 m²): se quita [tramo -986,68 173 m, medio ancho 4.2]
crítica X -858, Y 70 · (sin nombre) (service) · edificio #3207 · invade 3.26 m → no encuentro su planta en DATA.B
crítica X -862, Y 86 · (sin nombre) (service) · edificio #3207 · invade 3.15 m → no encuentro su planta en DATA.B
alta    X -4694, Y 96 · Camino La Cañada (secondary) · edificio #4855 · invade 2.75 m · 71 m² · medio: quedaría una tira (2 de 71 m²): se quita [tramo -4784,1249 1615 m, medio ancho 6.1]
alta    X 2488, Y 2003 · Carretera de Valle Tabares (secondary) · edificio #5257 · invade 2.01 m · 39 m² · medio: quedaría una tira (1 de 39 m²): se quita [tramo 2504,2044 7 m, medio ancho 6.8]
alta    X -871, Y 158 · (sin nombre) (motorway_link) · edificio #1063 · invade 2 m · 39 m² · medio: quedaría una tira (0 de 39 m²): se quita [tramo -986,68 173 m, medio ancho 4.2]
alta    X 70, Y 220 · (sin nombre) (secondary) · edificio #856 · invade 1.73 m · 1053 m² · se recorta ahora (el auditor midió otra cosa)
alta    X 46, Y 197 · Calle Herradores (tertiary) · Capilla de la Cruz Verde · invade 1.64 m · 21 m² · estilo 4 (iglesia o monumento): no se recorta
alta    X -2969, Y -40 · (sin nombre) (primary) · edificio #5179 · invade 1.55 m · 89 m² · medio: quedaría una tira (0 de 89 m²): se quita [tramo -2960,-25 77 m, medio ancho 2.9]
alta    X -1716, Y 1213 · Carretera de La Esperanza (primary) · edificio #584 · invade 1.53 m → no encuentro su planta en DATA.B
alta    X -239, Y 1784 · Camino la Feria (residential) · edificio #421 · invade 2.3 m · 91 m² · medio: quedaría una tira (0 de 91 m²): se quita [tramo -238,1788 659 m, medio ancho 4.3]
alta    X -1768, Y -727 · Calle Nava Toscana (residential) · edificio #1624 · invade 1.95 m → no encuentro su planta en DATA.B
alta    X 1693, Y 4083 · (sin nombre) (residential) · edificio #5479 · invade 1.95 m · 94 m² · medio: quedaría una tira (6 de 15 m²): se quita [tramo 1653,4117 83 m, medio ancho 4.3] | final: quedaría una tira (11 de 94 m²): se quita
alta    X -864, Y 265 · Calle Cabrera Felipe (residential) · edificio #3526 · invade 1.87 m · 402 m² · medio: quedaría una tira (0 de 402 m²): se quita [tramo -885,252 146 m, medio ancho 4.3]
alta    X 560, Y 568 · Camino Real de La Verdellada (residential) · edificio #1857 · invade 1.87 m · 13 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 1702, Y 4081 · Calle Virgen de Los Dolores (residential) · edificio #5479 · invade 1.81 m · 94 m² · medio: quedaría una tira (6 de 15 m²): se quita [tramo 1653,4117 83 m, medio ancho 4.3] | final: quedaría una tira (11 de 94 m²): se quita
alta    X -929, Y 1793 · Camino la Feria (residential) · edificio #440 · invade 1.72 m · 46 m² · medio: quedaría una tira (0 de 46 m²): se quita [tramo -1117,2034 304 m, medio ancho 6.1]
alta    X -895, Y 1482 · (sin nombre) (service) · edificio #3646 · invade 1.63 m · 64 m² · medio: quedaría una tira (7 de 64 m²): se quita [tramo -897,1490 9 m, medio ancho 2.9] | esquinas: el contorno se cruzaría
alta    X -218, Y -697 · Calle Jacinto Alzola Cabrera (residential) · edificio #1970 · invade 1.55 m · 473 m² · lado: el corte pasaría del final de la calle [tramo -240,-684 31 m, medio ancho 4.3]
== resumen de motivos
   11  medio: quedaría una tira
    4  no encuentro su planta en DATA.B
    2  final: quedaría una tira
    1  se recorta ahora
    1  estilo 4
    1  ninguna regla lo para: no lo ve ninguna calle del recorte
    1  esquinas: el contorno se cruzaría
    1  lado: el corte pasaría del final de la calle
SONDA RECORTE OK
```

### 5. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 1634 mallas, 1641 llamadas, 2141828 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
     970      977  1771895    351  608   555    0    479   970  (sin nombre: Group) · BufferGeometry/MeshStandardMaterial 478, BoxGeometry/MeshStandardMaterial 220, PlaneGeometry/MeshStandardMaterial 77, BoxGeometry/MeshBasicMaterial 53
     360      360    70012      0  184   343    0    141   360  (sin nombre: Mesh) · BufferGeometry/MeshStandardMaterial 144, PlaneGeometry/MeshStandardMaterial 77, BoxGeometry/MeshStandardMaterial 58, CylinderGeometry/MeshStandardMaterial 51
     180      180   227271      0  142    65    0    152   180  root · BufferGeometry/MeshStandardMaterial 119, BoxGeometry/MeshStandardMaterial 26, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
      28       28     1906      0    9    28    0      3    28  obispado · PlaneGeometry/MeshStandardMaterial 25, BufferGeometry/MeshStandardMaterial 3
      27       27    25374      0   22    23    0     10    27  inicio · PlaneGeometry/MeshStandardMaterial 11, BufferGeometry/MeshStandardMaterial 10, CylinderGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 3
      16       16    19693      0   16    16    0     16    16  La Concepción · BufferGeometry/MeshStandardMaterial 16
      12       12    11586      0   12    12    0      9    12  aeropuerto · BufferGeometry/MeshStandardMaterial 9, PlaneGeometry/MeshStandardMaterial 3
      12       12      463      0    7    12    0     12    12  Estadio Francisco Peraza · BufferGeometry/MeshStandardMaterial 9, CylinderGeometry/MeshStandardMaterial 3
      11       11    10240      0   11    11    0      5    11  aeropuerto2 · PlaneGeometry/MeshStandardMaterial 6, BufferGeometry/MeshStandardMaterial 5
       8        8     1826      0    8     8    0      7     8  pabellon · BufferGeometry/MeshStandardMaterial 7, PlaneGeometry/MeshStandardMaterial 1
       5        5     1500      0    5     5    0      5     5  casas · BufferGeometry/MeshStandardMaterial 5
       5        5       62      0    5     5    0      2     5  Pabellón Juan Ríos Tejera · BufferGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 2
== al juntar la ciudad: juntadas 7630 en 1822 mallas; sin juntar, por motivo:
    3646  grupo con nombre  · p. ej. 
     548  con hijos (se juntan desde v1.0.0)  · p. ej. X 174, Y -620 (CylinderGeometry) X 172, Y -621 (CylinderGeometry) X 173, Y -618 (CylinderGeometry) X 171, Y -619 (CylinderGeometry)
     103  userData  · p. ej. X -399, Y 749 (BoxGeometry) X -399, Y 749 (BoxGeometry) X -399, Y 749 (BoxGeometry) X -400, Y 749 (BoxGeometry)
       2  varios materiales  · p. ej. X 2269, Y 3389 (BoxGeometry) X 2238, Y 3460 (CylinderGeometry)
       2  onBeforeRender  · p. ej. X 143, Y 5 (CylinderGeometry) X -147, Y -618 (ShapeGeometry)
== mallas sueltas colgadas de la escena, por tipo
    144  BufferGeometry · MeshStandardMaterial  · p. ej. X 0, Y 0 X 0, Y 0 X 0, Y 0
     63  PlaneGeometry · MeshStandardMaterial transparente  · p. ej. X 0, Y 0 X 0, Y 0 X 0, Y 0
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

Fotos/archivos nuevos en `tests/shots/`: recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_recorte_motivos.txt, sonda_sueltas.txt, sonda_tamanos.txt
