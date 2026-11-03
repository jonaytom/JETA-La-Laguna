# Pruebas 1.0.2 — 2026-11-03 15:03 — 17/17 OK

Listas: v1002a, base, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 186 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 56 s |
| 3 | `prueba_pendientes_faciles.py` | **OK** | 4 s |
| 4 | `prueba_carpeta.py` | **OK** | 17 s |
| 5 | `herramientas/foto_invasiones.py` | **OK** | 14 s |
| 6 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 7 | `herramientas/foto_caras.py` | **OK** | 0 s |
| 8 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 9 | `prueba_coche_y_boca.py` | **OK** | 2 s |
| 10 | `prueba_bordes.py` | **OK** | 0 s |
| 11 | `prueba_persecuciones.py` | **OK** | 24 s |
| 12 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 39 s |
| 13 | `audit_obstaculos.py` | **OK** | 0 s |
| 14 | `audit_cruces.py` | **OK** | 0 s |
| 15 | `audit_hundimiento.py` | **OK** | 0 s |
| 16 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 17 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 22, 'peor': 85, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4836 de 6298 · siguen metidos ≥ 1 m: 17
   [1424, 3934, 3.3, '']
   [-189, 772, 2.6, 'Intercambiador de La Laguna']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [1696, 4075, 2, '']
   [664, 1528, 1.7, '']
   [-892, 1471, 1.6, '']
   [172, -767, 1.5, '']
   [-11, -253, 1.5, '']
   [2101, 1450, 1.4, '']
   [29, -295, 1.4, '']
   [-1633, -195, 1.3, '']
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
   [-1245, -202, 1.2, '']
   [2270, 3396, 1, 'Área de Hospitalización']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 69439, 'lisas': 34977, 'pct_lisas': 33.5}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.3, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 4836
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 4. prueba_carpeta.py — OK

```
carpeta {'datos': True, 'calles': 5571, 'edificios': 6325, 'version': 'v1.0.2'}
errores []
CARPETA OK
```

### 5. herramientas/foto_invasiones.py — OK

```
 1. X 70, Y 220 · secundaria sin nombre (junto a C. Herradores) · calle del juego: (sin nombre) 13 m · invade_01_arriba.jpg / _calle.jpg
 2. X 46, Y 197 · C. Herradores · Capilla de la Cruz Verde · calle del juego: Calle Herradores 12 m · invade_02_arriba.jpg / _calle.jpg
 3. X 149, Y -623 · calle de servicio · Mercado de La Laguna · calle del juego: (sin nombre) 5.2 m · invade_03_arriba.jpg / _calle.jpg
 4. X -6, Y -242 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_04_arriba.jpg / _calle.jpg
 5. X 14, Y -300 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_05_arriba.jpg / _calle.jpg
 6. X -65, Y -58 · C. Tabares de Cala · Casa Riquel · calle del juego: Calle Tabares de Cala 9.8 m · invade_06_arriba.jpg / _calle.jpg
 7. X -912, Y -407 · Av. Lucas Vega / Callejón Montaraz · calle del juego: Avenida Lucas Vega 5.9 m · invade_07_arriba.jpg / _calle.jpg
FOTOS INVASIONES OK
```

### 6. herramientas/sonda_tamanos.py — OK

```
gente (altura m): caja {'n': 8, 'min': 1.65, 'med': 1.73, 'max': 1.84} · por la cabeza {'n': 8, 'min': 1.5, 'med': 1.57, 'max': 1.64} · jugador 1.88 · real: 1,60–1,85
coches (m): largo {'n': 4, 'min': 4.14, 'med': 4.3, 'max': 4.4} · ancho {'n': 4, 'min': 1.78, 'med': 1.85, 'max': 1.9} · alto {'n': 4, 'min': 1.25, 'med': 1.54, 'max': 1.84} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4836 · quitados (solo quedaba una tira) 251
edificios quitados por superficie original (m²): {'20-50': 168, '<20': 81, '50-100': 2}
   X -1275, Y 698: 50 m²
   X -1250, Y -371: 50 m²
   X 2346, Y 2781: 49 m²
   X 198, Y 1457: 49 m²
   X 1648, Y 4382: 49 m²
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
SONDA TAMANOS OK
```

### 7. herramientas/foto_caras.py — OK

```

```

### 8. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793718131103,"label":"test","player":{"x":-172.29790756579558,"z":269.8589385641032,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":-0.3335843214997931,"x":-174.29790756579558,"z":269.8589385641032},"weapon":{"has":true,"ammo":4,"out":true},
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 9. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.1","punta":"200","maxV":"200","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -173 · Y 0 · 556 m"}
```

### 10. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[500,3950],"borde0":30,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[1500,700],"borde0":305,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3}
```

### 11. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.58 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.13 m OK
[10] El carterista del Cristo: a pie: a 7 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1366 m, recorre 22 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 12. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
CONOCIDO {'off': 1, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 108, 'time': 6.8, 'x': 1220, 'z': 2532, 'y': -123.5}
snap df_1667
failed 0 of 118 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2532
CONDUCCION OK
```

### 13. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 14. audit_cruces.py — OK

```
conflicts 29
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 4), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('motorway', 'motorway_link', 1, 1), 1), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('motorway', 'motorway', 1, 1), 1), (('motorway_link', 'motorway', 1, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 15. audit_hundimiento.py — OK

```
{"muestras":6906,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 16. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [145.7, -603], 'sobre_suelo': 0.17, 'salio': True, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 17. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_1667.jpg, faces.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, invade_01_arriba.jpg, invade_01_calle.jpg, invade_02_arriba.jpg, invade_02_calle.jpg, invade_03_arriba.jpg, invade_03_calle.jpg, invade_04_arriba.jpg, invade_04_calle.jpg, invade_05_arriba.jpg, invade_05_calle.jpg, invade_06_arriba.jpg, invade_06_calle.jpg, invade_07_arriba.jpg, invade_07_calle.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_tamanos.txt
