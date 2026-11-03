# Pruebas 0.99.8 — 2026-11-03 13:17 — 16/16 OK

Listas: v1000e, coches, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 125 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 63 s |
| 3 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_recorte_motivos.py` | **OK** | 0 s |
| 5 | `herramientas/sonda_sueltas.py` | **OK** | 0 s |
| 6 | `prueba_coche_y_boca.py` | **OK** | 0 s |
| 7 | `prueba_freno_mano.py` | **OK** | 0 s |
| 8 | `prueba_peralte.py` | **OK** | 0 s |
| 9 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 10 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 26 s |
| 11 | `audit_obstaculos.py` | **OK** | 0 s |
| 12 | `audit_cruces.py` | **OK** | 6 s |
| 13 | `audit_hundimiento.py` | **OK** | 0 s |
| 14 | `prueba_bordes.py` | **OK** | 0 s |
| 15 | `prueba_parking_cristo.py` | **OK** | 0 s |
| 16 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 18, 'peor': 172, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4443 de 6020 · siguen metidos ≥ 1 m: 14
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
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
   [-1633, -195, 1.1, '']
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
gente (altura m): {'n': 8, 'min': 2.49, 'med': 2.57, 'max': 2.61} · jugador 1.85 · real: 1,60–1,85
coches (m): largo {'n': 4, 'min': 4.14, 'med': 4.28, 'max': 4.3} · ancho {'n': 4, 'min': 1.76, 'med': 1.8, 'max': 1.9} · alto {'n': 4, 'min': 1.25, 'med': 1.52, 'max': 1.58} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 281 · edificios recortados 4443 · quitados (solo quedaba una tira) 519
SONDA TAMANOS OK
```

### 4. herramientas/sonda_recorte_motivos.py — OK

```
alta    X 836, Y 1661 · Calle Osa Mayor (residential) · edificio #1593 · invade 2.41 m · 90 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -912, Y -407 · Avenida Lucas Vega (residential) · edificio #1357 · invade 2.4 m · 288 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 696, Y 1657 · Calle Marte (residential) · edificio #1599 · invade 2.4 m · 208 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 3333, Y 1956 · Calle Hernández Amador (residential) · edificio #5486 · invade 2.31 m · 64 m² · lado: menos de 0,6 m [tramo -594,-295 177 m, medio ancho 4.0]
alta    X -909, Y 1489 · Calle La Costurera (residential) · edificio #3679 · invade 2.22 m · 90 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 659, Y 1611 · Calle Universo (residential) · edificio #1604 · invade 2.17 m · 21 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -913, Y 1449 · Camino El Mato (residential) · edificio #3683 · invade 2.16 m · 164 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 258 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 258 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 258 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 2415, Y 1931 · Calle Piloto Néstor Jorge Cabrera (residential) · edificio #3106 · invade 2.03 m → no encuentro su planta en DATA.B
alta    X -1056, Y 821 · Calle la Morera (residential) · edificio #91 · invade 1.97 m · 80 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 2703, Y 1859 · Calle José Domínguez Dorta (residential) · edificio #5362 · invade 1.94 m · 62 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 1692, Y 4082 · (sin nombre) (residential) · edificio #5577 · invade 1.93 m · 29 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 3459, Y 1620 · Calle Hernández Amador (residential) · edificio #5535 · invade 1.92 m · 64 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -864, Y 265 · Calle Cabrera Felipe (residential) · edificio #3552 · invade 1.87 m · 123 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 560, Y 568 · Camino Real de La Verdellada (residential) · edificio #1868 · invade 1.87 m · 171 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 668, Y 1535 · Calle Plutón (residential) · edificio #1592 · invade 1.86 m · 40 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 1756, Y 3764 · (sin nombre) (service) · Mercadona · invade 1.85 m · 3214 m² · se recorta ahora (el auditor midió otra cosa)
alta    X -184, Y 711 · (sin nombre) (service) · edificio #3759 · invade 1.85 m · 64 m² · lado: menos de 0,6 m [tramo -121,-359 238 m, medio ancho 3.9]
alta    X -189, Y 709 · (sin nombre) (service) · edificio #3759 · invade 1.85 m · 64 m² · lado: menos de 0,6 m [tramo -121,-359 238 m, medio ancho 3.9]
alta    X 2338, Y 3143 · (sin nombre) (service) · edificio #3151 · invade 1.85 m · 845 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -179, Y -563 · (sin nombre) (service) · edificio #3974 · invade 1.85 m · 23 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -2476, Y 45 · (sin nombre) (service) · edificio #5240 · invade 1.85 m · 302 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -914, Y -406 · Callejón Montaraz (residential) · edificio #1357 · invade 1.84 m · 288 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 582, Y -924 · Calle Gallardina (residential) · edificio #1997 · invade 1.84 m · 198 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 944, Y 726 · (sin nombre) (residential) · edificio #2613 · invade 1.83 m · 3286 m² · final: el contorno se cruza
alta    X -1057, Y 1766 · Calle Tabajoste (residential) · edificio #579 · invade 1.83 m · 183 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -912, Y 1455 · (sin nombre) (service) · edificio #3683 · invade 1.83 m · 164 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 858, Y 441 · (sin nombre) (residential) · edificio #1941 · invade 1.8 m · 196 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 789, Y 2973 · (sin nombre) (service) · IKEA · invade 1.79 m → sin edificio
alta    X 1525, Y 1681 · Calle Antón Guanche (residential) · edificio #2782 · invade 1.76 m · 2991 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1004, Y 819 · Calle la Morera (residential) · edificio #3580 · invade 1.75 m · 40 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 2514, Y 1650 · Calle Olvido (residential) · edificio #5398 · invade 1.73 m · 21 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 717, Y 1118 · Calle los Guanches (residential) · edificio #737 · invade 1.71 m · 259 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1746, Y 1199 · Pasaje Ravelo A (service) · edificio #607 · invade 1.71 m · 144 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1044, Y 821 · Calle la Morera (residential) · edificio #3579 · invade 1.65 m · 12 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 3181, Y 2051 · Calle El Muelle (residential) · edificio #5527 · invade 1.64 m · 39 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -745, Y -293 · Calle Particular de Ángel Núñez (residential) · edificio #1368 · invade 1.63 m · 98 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -895, Y 1482 · (sin nombre) (service) · edificio #3681 · invade 1.63 m · 302 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 1787, Y 1253 · Calle El Sauzal (residential) · edificio #2721 · invade 1.62 m · 1557 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1204, Y -1060 · (sin nombre) (residential) · edificio #4412 · invade 1.6 m · 39 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 3242, Y 2039 · Calle El Muelle (residential) · edificio #5483 · invade 1.59 m · 69 m² · lado: menos de 0,6 m [tramo -594,-295 177 m, medio ancho 4.0]
alta    X 268, Y 2845 · Calle Tamaragua (residential) · edificio #2460 · invade 1.57 m · 1098 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 687, Y 1711 · Calle Osa Mayor (residential) · edificio #1598 · invade 1.56 m · 317 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1076, Y 1762 · Calle Tabajoste (residential) · edificio #578 · invade 1.56 m · 44 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X 40, Y -400 · Calle Pintor Cristino de Vera (residential) · edificio #4042 · invade 1.55 m · 272 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -218, Y -697 · Calle Jacinto Alzola Cabrera (residential) · edificio #1981 · invade 1.55 m · 67 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1167, Y -1020 · Camino Josefina la Rastroja (residential) · edificio #4409 · invade 1.54 m · 181 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
alta    X -1189, Y -1074 · Calle Vereda Chica (residential) · edificio #4412 · invade 1.51 m · 39 m² · ninguna regla lo para: no lo ve ninguna calle del recorte
== resumen de motivos
   62  ninguna regla lo para: no lo ve ninguna calle del recorte
    8  lado: menos de 0,6 m
    4  sin edificio
    2  lado: el corte pasaría del final de la calle
    2  se recorta ahora
    1  estilo 4
    1  no encuentro su planta en DATA.B
    1  final: el contorno se cruza
SONDA RECORTE OK
```

### 5. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 1854 mallas, 1861 llamadas, 2063920 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
    1031     1038  1741729    348  602   635    0    479  1031  (sin nombre: Group) · BufferGeometry/MeshStandardMaterial 491, BoxGeometry/MeshStandardMaterial 273, PlaneGeometry/MeshStandardMaterial 78, BoxGeometry/MeshBasicMaterial 53
     527      527    70310      0  184   510    0    296   527  (sin nombre: Mesh) · PlaneGeometry/MeshStandardMaterial 244, BufferGeometry/MeshStandardMaterial 144, BoxGeometry/MeshStandardMaterial 58, CylinderGeometry/MeshStandardMaterial 51
     172      172   179231      0  134    66    0    144   172  root · BufferGeometry/MeshStandardMaterial 111, BoxGeometry/MeshStandardMaterial 27, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
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

### 6. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":null,"punta":"1","maxV":"202","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X 1917 · Y 140 · 472 m"}
```

### 7. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 78, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 244, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 57, 'kmh_1s': 37, 'giro_1s_grados': 149, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 185, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 105, 'derrape_final': 0, 'kmh_3s': 61, 'giro_3s_grados': 164, 'derrape_max_grados': 28}
OK
```

### 8. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.56, 0.55, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.57], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.55, 0.54, 0.56], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.6, 0.58, 0.56, 0.6], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.65, 0.58, 0.57, 0.58], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.53, 0.53, 0.53], 'dif': 0}
```

### 9. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 10. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 11. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 12. audit_cruces.py — OK

```
conflicts 29
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 4), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('motorway', 'motorway_link', 1, 1), 1), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('motorway', 'motorway', 1, 1), 1), (('motorway_link', 'motorway', 1, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 13. audit_hundimiento.py — OK

```
{"muestras":6906,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 14. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":2}
```

### 15. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [176, -611]}
```

### 16. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_recorte_motivos.txt, sonda_sueltas.txt, sonda_tamanos.txt
