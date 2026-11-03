# Pruebas 1.0.3 — 2026-11-03 15:28 — 15/15 OK

Listas: v1003c, base, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 148 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_recorte.py` | **OK** | 54 s |
| 2 | `prueba_pendientes_faciles.py` | **OK** | 4 s |
| 3 | `herramientas/sonda_hueco.py -259 47 70` | **OK** | 2 s |
| 4 | `herramientas/sonda_hueco.py -276 102 70` | **OK** | 2 s |
| 5 | `herramientas/sonda_hueco.py -191 366 50` | **OK** | 2 s |
| 6 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 7 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 8 | `prueba_bordes.py` | **OK** | 0 s |
| 9 | `prueba_persecuciones.py` | **OK** | 23 s |
| 10 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 34 s |
| 11 | `audit_obstaculos.py` | **OK** | 0 s |
| 12 | `audit_cruces.py` | **OK** | 0 s |
| 13 | `audit_hundimiento.py` | **OK** | 0 s |
| 14 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 15 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_recorte.py — OK

```
recortados 3776 de 6534 · siguen metidos ≥ 1 m: 85
   [1, 230, 4.9, '']
   [539, 1171, 4.9, 'Edificio Beneharo']
   [241, 771, 4.2, '']
   [1424, 3934, 3.3, '']
   [-1895, 1369, 3, '']
   [-4699, 92, 2.8, '']
   [1506, 2926, 2.7, '']
   [1729, 3787, 2.6, 'Mercadona']
   [547, 1406, 2.6, '']
   [-187, 709, 2.6, '']
   [-3414, -424, 2.6, '']
   [-1118, 1754, 2.5, '']
   [-3537, -193, 2.5, '']
   [-3023, -50, 2.4, '']
   [652, 1618, 2.2, '']
   [-938, 1479, 2.2, '']
   [847, 1669, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [-2730, -287, 2, '']
   [-1063, 1776, 1.9, '']
   [541, 574, 1.9, '']
   [-843, 304, 1.9, '']
   [-2476, 37, 1.9, '']
   [3344, 1960, 1.9, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 2. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 69439, 'lisas': 34977, 'pct_lisas': 33.5}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.3, 'cx': -237, 'cz': 415}
edificios [[73, 234, 1.55], [-909, -408, 1.41]]
recortados 3776
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 3. herramientas/sonda_hueco.py -259 47 70 — OK

```
planta (6, [[914, -284, 20, 0, 9], [918, -241, 84, 0, 5], [3662, -268, 37, 4, 5], [3872, -195, 47, 0, 6], [3873, -223, -1, 0, 6], [3876, -232, 33, 0, 16]])
pintados (6, [[-284, 20, '', 4], [-241, 85, '', 15], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-195, 47, '', 19], [-223, -2, '', 11], [-232, 33, '', 11]])
quitados (0, [])
calles (7, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4], [228, '', 'pedestrian', 6], [754, 'Pasaje Aguere', 'pedestrian', 6], [781, 'Calle Hermano Mateo', 'residential', 7.5]])
areas (2, [[886, 'garden', '', -179, 12], [1486, 'square', '', -322, 7]])
vaciadas 0
SONDA HUECO OK
```

### 4. herramientas/sonda_hueco.py -276 102 70 — OK

```
planta (6, [[888, -315, 142, 0, 4], [918, -241, 84, 0, 5], [929, -331, 70, 0, 26], [946, -318, 92, 0, 4], [3662, -268, 37, 4, 5], [4582, -254, 161, 0, 5]])
pintados (6, [[-314, 141, '', 8], [-241, 85, '', 15], [-331, 70, '', 4], [-318, 92, '', 15], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-255, 161, '', 15]])
quitados (0, [])
calles (6, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [40, 'Calle Ciprés', 'residential', 6.8], [215, 'Calle Baltasar Nuñez', 'residential', 7.5], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4]])
areas (2, [[26, 'park', '', -218, 164], [549, 'playground', '', -225, 160]])
vaciadas 0
SONDA HUECO OK
```

### 5. herramientas/sonda_hueco.py -191 366 50 — OK

```
planta (5, [[853, -225, 372, 1, 6], [885, -228, 334, 1, 18], [6573, -185, 363, 1, 4], [6574, -189, 376, 1, 4], [6575, -194, 388, 1, 4]])
pintados (5, [[-230, 371, '', 10], [-228, 334, '', 16], [-185, 363, '', 10], [-189, 376, '', 10], [-194, 388, '', 10]])
quitados (0, [])
calles (7, [[2, 'Calle Doctor Zamenhoff', 'residential', 7], [376, 'Calle Catedral', 'residential', 7.6], [1027, 'Calle Catedral', 'residential', 7.5], [2527, 'Avenida de La Trinidad', 'secondary', 6.6], [2851, 'Avenida de La Trinidad', 'secondary', 6.6], [3670, '', 'service', 5.2], [3671, '', 'service', 5.2]])
areas (1, [[442, 'parking', '', -214, 322]])
vaciadas 0
SONDA HUECO OK
```

### 6. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793719639450,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 7. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"2.9","punta":"205","maxV":"205","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -189 · Y 0 · 555 m"}
```

### 8. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-36 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-36 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[0,4],"borde":812,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-36 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-36 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":0}
```

### 9. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 12 m en 3 s, salto máx 0.14 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.16 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1366 m, recorre 22 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
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

### 14. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [145.7, -603], 'sobre_suelo': 0.17, 'salio': True, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 15. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, hueco_-191_366.jpg, hueco_-191_366_calle0.jpg, hueco_-191_366_calle1.jpg, hueco_-259_47.jpg, hueco_-259_47_calle0.jpg, hueco_-259_47_calle1.jpg, hueco_-276_102.jpg, hueco_-276_102_calle0.jpg, hueco_-276_102_calle1.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg
