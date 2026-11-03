# Pruebas 1.0.3 — 2026-11-03 15:21 — 6/6 OK

Listas: v1003a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 72 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_recorte.py` | **OK** | 48 s |
| 2 | `prueba_pendientes_faciles.py` | **OK** | 4 s |
| 3 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_hueco.py -259 47 70` | **OK** | 0 s |
| 5 | `herramientas/sonda_hueco.py -276 102 70` | **OK** | 0 s |
| 6 | `herramientas/sonda_hueco.py -301 -262 70` | **OK** | 0 s |

## Detalle

### 1. prueba_recorte.py — OK

```
recortados 1669 de 6522 · siguen metidos ≥ 1 m: 49
   [3, 225, 4.9, '']
   [1424, 3934, 3.3, '']
   [1734, 3764, 2.6, 'Mercadona']
   [-1898, 1371, 2.6, '']
   [-3408, -430, 2.6, '']
   [-3128, 40, 2.6, '']
   [798, 3009, 2.5, 'IKEA']
   [-3021, -47, 2.4, '']
   [204, -283, 2, '']
   [798, 1549, 2, '']
   [1696, 4075, 2, '']
   [1624, 3421, 1.9, 'Hiunday']
   [-2476, 37, 1.9, '']
   [1015, 2871, 1.8, 'Decathlon']
   [868, 435, 1.8, '']
   [2320, 3175, 1.8, '']
   [-187, -563, 1.8, '']
   [664, 1528, 1.7, '']
   [542, 574, 1.7, '']
   [-780, 372, 1.6, 'Edificio el Puente']
   [-892, 1471, 1.6, '']
   [-1753, 1207, 1.5, '']
   [874, 478, 1.5, '']
   [1526, 1668, 1.5, '']
   [1401, 3959, 1.5, '']
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
telepisa_edificio {'alto': 15, 'cx': -205, 'cz': 469}
edificios [[73, 234, 0.19], [-909, -408, 0.14]]
recortados 1669
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 3. herramientas/sonda_tamanos.py — OK

```
gente (altura m): caja {'n': 2, 'min': 1.71, 'med': 1.83, 'max': 1.83} · por la cabeza {'n': 2, 'min': 1.5, 'med': 1.56, 'max': 1.56} · jugador 1.66 · real: 1,60–1,85
coches (m): largo {'n': 5, 'min': 2.07, 'med': 4.4, 'max': 11.5} · ancho {'n': 5, 'min': 0.83, 'med': 1.9, 'max': 2.5} · alto {'n': 5, 'min': 1.08, 'med': 1.84, 'max': 3.1} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 251 · edificios recortados 1669 · quitados (solo quedaba una tira) 15
edificios quitados por superficie original (m²): {'20-50': 9, '<20': 6}
   X 2346, Y 2781: 49 m²
   X 226, Y -764: 34 m²
   X -187, Y 709: 31 m²
   X -1246, Y -204: 29 m²
   X 131, Y -422: 29 m²
   X 2346, Y 2781: 25 m²
   X -1050, Y 826: 24 m²
   X -1119, Y 1755: 24 m²
   X -939, Y 1438: 22 m²
   X -911, Y 1453: 14 m²
   X -1003, Y 825: 12 m²
   X -4544, Y 358: 12 m²
   X -181, Y -582: 9 m²
   X -914, Y -483: 8 m²
   X -4416, Y -324: 7 m²
SONDA TAMANOS OK
```

### 4. herramientas/sonda_hueco.py -259 47 70 — OK

```
planta (8, [[914, -284, 20, 0, 9], [918, -249, 94, 0, 7], [929, -325, 67, 0, 37], [941, -286, -15, 0, 6], [3662, -268, 37, 4, 5], [3872, -195, 47, 0, 6], [3873, -223, -1, 0, 6], [3876, -232, 33, 0, 16]])
pintados (7, [[-284, 20, '', 4], [-247, 91, '', 15], [-286, -15, '', 8], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-195, 47, '', 19], [-223, -2, '', 11], [-235, 30, '', 11]])
quitados (0, [])
calles (7, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4], [228, '', 'pedestrian', 6], [754, 'Pasaje Aguere', 'pedestrian', 6], [781, 'Calle Hermano Mateo', 'residential', 7.5]])
areas (2, [[886, 'garden', '', -179, 12], [1486, 'square', '', -322, 7]])
vaciadas 12
SONDA HUECO OK
```

### 5. herramientas/sonda_hueco.py -276 102 70 — OK

```
planta (6, [[888, -315, 142, 0, 4], [918, -249, 94, 0, 7], [929, -325, 67, 0, 37], [946, -319, 95, 0, 4], [3662, -268, 37, 4, 5], [4582, -254, 161, 0, 5]])
pintados (6, [[-305, 137, '', 8], [-247, 91, '', 15], [-327, 70, '', 4], [-319, 94, '', 15], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-258, 151, '', 15]])
quitados (0, [])
calles (6, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [40, 'Calle Ciprés', 'residential', 6.8], [215, 'Calle Baltasar Nuñez', 'residential', 7.5], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4]])
areas (2, [[26, 'park', '', -218, 164], [549, 'playground', '', -225, 160]])
vaciadas 12
SONDA HUECO OK
```

### 6. herramientas/sonda_hueco.py -301 -262 70 — OK

```
planta (8, [[1262, -335, -206, 0, 10], [1302, -355, -263, 0, 17], [3251, -363, -229, 0, 11], [3665, -304, -246, 0, 8], [3671, -282, -236, 0, 8], [4125, -241, -256, 0, 4], [4126, -245, -247, 0, 4], [4594, -302, -289, 0, 35]])
pintados (8, [[-335, -206, 'Casa de los Marqueses de Torrehermosa', 8], [-355, -263, '', 11], [-363, -229, '', 15], [-304, -246, 'Teatro Leal', 15], [-282, -236, '', 8], [-241, -256, '', 11], [-245, -247, '', 8], [-302, -289, '', 15]])
quitados (0, [])
calles (10, [[39, 'Nuñez de la Peña', 'pedestrian', 6], [75, 'Calle Obispo Rey Redondo', 'pedestrian', 6], [568, 'Calle Alcalde Alonso Suárez Melián', 'pedestrian', 6], [750, 'Calle Núñez de la Peña', 'pedestrian', 6], [828, 'Calle Rodriguez Moure', 'residential', 7.2], [2189, 'Calle Alcalde Alonso Suárez Melián', 'pedestrian', 6], [2940, 'Calle San Agustín', 'pedestrian', 6], [2941, 'Calle Obispo Rey Redondo', 'pedestrian', 6], [2942, 'Calle Núñez de la Peña', 'pedestrian', 6], [3510, 'Plaza de la Concepción', 'pedestrian', 6]])
areas (6, [[344, 'garden', '', -386, -274], [345, 'garden', '', -382, -283], [548, 'park', 'Plaza Guillermo Rancés', -264, -337], [817, 'garden', '', -216, -256], [880, 'garden', '', -242, -230], [889, 'garden', '', -323, -320]])
vaciadas 12
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, hueco_-259_47.jpg, hueco_-276_102.jpg, hueco_-301_-262.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_tamanos.txt
