# Pruebas 0.99.8 — 2026-11-03 13:43 — 16/16 OK

Listas: v1000j, base, coches, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 217 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 50 s |
| 3 | `herramientas/sonda_sueltas.py` | **OK** | 0 s |
| 4 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 5 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 6 | `prueba_bordes.py` | **OK** | 1 s |
| 7 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 85 s |
| 8 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 29 s |
| 9 | `prueba_freno_mano.py` | **OK** | 0 s |
| 10 | `prueba_peralte.py` | **OK** | 0 s |
| 11 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 12 | `audit_obstaculos.py` | **OK** | 0 s |
| 13 | `audit_cruces.py` | **OK** | 0 s |
| 14 | `audit_hundimiento.py` | **OK** | 0 s |
| 15 | `prueba_parking_cristo.py` | **OK** | 0 s |
| 16 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 19, 'peor': 76, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4447 de 6288 · siguen metidos ≥ 1 m: 40
   [-891, 143, 3.9, '']
   [1424, 3934, 3.3, '']
   [-4700, 91, 2.8, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [-3023, -50, 2.4, '']
   [-229, 1778, 2.3, '']
   [-880, 159, 2.2, '']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [2478, 2004, 2, '']
   [1696, 4075, 2, '']
   [541, 574, 1.9, '']
   [-843, 304, 1.9, '']
   [3344, 1960, 1.9, '']
   [-936, 1800, 1.8, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-892, 1471, 1.6, '']
   [-963, 1808, 1.5, '']
   [-1698, 1220, 1.5, '']
   [859, 662, 1.5, '']
   [172, -767, 1.5, '']
   [-232, 33, 1.5, '']
   [-11, -253, 1.5, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 1598 mallas, 1605 llamadas, 2067229 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
     938      945  1713129    342  602   546    0    449   938  (sin nombre: Group) · BufferGeometry/MeshStandardMaterial 462, BoxGeometry/MeshStandardMaterial 210, PlaneGeometry/MeshStandardMaterial 76, BoxGeometry/MeshBasicMaterial 53
     360      360    69950      0  184   343    0    141   360  (sin nombre: Mesh) · BufferGeometry/MeshStandardMaterial 144, PlaneGeometry/MeshStandardMaterial 77, BoxGeometry/MeshStandardMaterial 58, CylinderGeometry/MeshStandardMaterial 51
     176      176   211500      0  139    65    0    145   176  root · BufferGeometry/MeshStandardMaterial 116, BoxGeometry/MeshStandardMaterial 26, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
      28       28     1906      0    9    28    0      3    28  obispado · PlaneGeometry/MeshStandardMaterial 25, BufferGeometry/MeshStandardMaterial 3
      27       27    25374      0   22    23    0     10    27  inicio · PlaneGeometry/MeshStandardMaterial 11, BufferGeometry/MeshStandardMaterial 10, CylinderGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 3
      16       16    19693      0   16    16    0     16    16  La Concepción · BufferGeometry/MeshStandardMaterial 16
      12       12    11586      0   12    12    0      9    12  aeropuerto · BufferGeometry/MeshStandardMaterial 9, PlaneGeometry/MeshStandardMaterial 3
      12       12      463      0    7    12    0     12    12  Estadio Francisco Peraza · BufferGeometry/MeshStandardMaterial 9, CylinderGeometry/MeshStandardMaterial 3
      11       11    10240      0   11    11    0      5    11  aeropuerto2 · PlaneGeometry/MeshStandardMaterial 6, BufferGeometry/MeshStandardMaterial 5
       8        8     1826      0    8     8    0      7     8  pabellon · BufferGeometry/MeshStandardMaterial 7, PlaneGeometry/MeshStandardMaterial 1
       5        5     1500      0    5     5    0      5     5  casas · BufferGeometry/MeshStandardMaterial 5
       5        5       62      0    5     5    0      2     5  Pabellón Juan Ríos Tejera · BufferGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 2
== al juntar la ciudad: juntadas 7400 en 1791 mallas; sin juntar, por motivo:
    3646  grupo con nombre  · p. ej. 
     500  con hijos (se juntan desde v1.0.0)  · p. ej. X 169, Y -622 (CylinderGeometry) X 168, Y -623 (CylinderGeometry) X 168, Y -620 (CylinderGeometry) X 167, Y -621 (CylinderGeometry)
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

### 4. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793713257565,"label":"test","player":{"x":-172.29790756579558,"z":269.8589385641032,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":-0.3335843214997931,"x":-174.29790756579558,"z":269.8589385641032},"weapon":{"has":true,"ammo":4,"out":true},
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 5. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.0","punta":"206","maxV":"207","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -173 · Y 0 · 556 m"}
```

### 6. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[1500,700],"borde0":305,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":2}
```

### 7. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 2.199999999254942
{"frame":560,"calls":1151,"triangles":2946281,"points":0,"lines":0} calls:1151
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.18 m OK
[10] El carterista del Cristo: a pie: a 7 m, recorre 6 m en 3 s, salto máx 0.18 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.13 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.13 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 8. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 9. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 78, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 244, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 54, 'kmh_1s': 37, 'giro_1s_grados': 141, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 30, 'kmh_1s': 44, 'giro_1s_grados': 113, 'derrape_final': 0, 'kmh_3s': 58, 'giro_3s_grados': 177, 'derrape_max_grados': 30}
OK
```

### 10. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.56, 0.55, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.57], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.55, 0.54, 0.56], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.6, 0.58, 0.56, 0.6], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.65, 0.58, 0.57, 0.58], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.53, 0.53, 0.53], 'dif': 0}
```

### 11. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 12. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 13. audit_cruces.py — OK

```
conflicts 29
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 4), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('motorway', 'motorway_link', 1, 1), 1), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('motorway', 'motorway', 1, 1), 1), (('motorway_link', 'motorway', 1, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 14. audit_hundimiento.py — OK

```
{"muestras":6906,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 15. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 16. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_sueltas.txt
