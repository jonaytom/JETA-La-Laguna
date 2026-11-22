# Pruebas 1.4.29 — 2026-11-20 15:55 — 5/5 OK

Listas: v1429. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 53 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1427_gpu.py` | **OK** | 16 s |
| 2 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 3 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 4 | `prueba_horizonte_1428_gpu.py` | **OK** | 4 s |
| 5 | `prueba_monumentos_1429_gpu.py` | **OK** | 1 s |

## Detalle

### 1. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04853273137697517}, 'parked': {'models': 50, 'shades': 21, 'white': 0.048069241011984024}, 'liveTraffic': {'cars': 22, 'shades': 13, 'white': 1}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 2. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 27, 'finish': 57, 'length': 1206, 'checkpoints': 5, 'sign': 16, 'cafe': 16} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 3. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795190112089,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Carrera con el Canarión":[["El Canarión","¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.",1795190107685],["El Canarión","Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.",1795190107715],["El Canarión","Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.",1795190107716],["El Canarión","¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.",1795190107717],["El Canarión (por el móvil)","¡Ños! ¿Me sacaste 146 segundos? Toma, 2.500 €, bien ganados.",1795190111055],["El Canarión (por el móvil)","Sastrón está aquí al lado. Ve a llevarle el dinero.",1795190111061]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 4. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 12049, 'buckets': 1158, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.28166666666640794, 0.26944444444444443], 'after': [0.03555555555503816, 0.032777777777260375]}, 'views': [{'name': 'trinidad', 'runs': [[18, 1750], [16.300000000046566, 1699], [16.199999999953434, 1699], [16.600000000093132, 1750]]}, {'name': 'ronda', 'runs': [[14.5, 1113], [12.899999999906868, 1087], [11.599999999860302, 1087], [11.599999999860302, 1113]]}, {'name': 'mirador', 'runs': [[14.399999999906868, 1306], [12.599999999860302, 1281], [13.199999999953434, 1281], [13.400000000139698, 1306]]}]}
HORIZONTE OK
```

### 5. prueba_monumentos_1429_gpu.py — OK

```
{'gpu': 'ANGLE (AMD, AMD Radeon RX 6600 (0x000073FF) Direct3D11 vs_5_0 ps_5_0, D3D11)', 'shadow': 2048, 'batches': 3, 'pieces': 9, 'groups': {'inicio': {'pieces': 3, 'batches': 1}, 'Estadio Francisco Peraza': {'pieces': 6, 'batches': 2}}, 'views': [{'label': 'estadio', 'runs': [{'ms': 8.400000000139698, 'calls': 494, 'tris': 1314937}, {'ms': 8.899999999906868, 'calls': 486, 'tris': 1314937}, {'ms': 8.199999999953434, 'calls': 486, 'tris': 1314937}, {'ms': 8.5, 'calls': 494, 'tris': 1314937}], 'diff': {'changed': 4.822530864197531e-07, 'mean': 1.9772376543209878e-05}}, {'label': 'inicio', 'runs': [{'ms': 10.399999999906868, 'calls': 720, 'tris': 1354734}, {'ms': 9.600000000093132, 'calls': 718, 'tris': 1354734}, {'ms': 9.699999999953434, 'calls': 718, 'tris': 1354734}, {'ms': 10, 'calls': 720, 'tris': 1354734}], 'diff': {'changed': 0, 'mean': 0}}]}
MONUMENTOS OK
```

Fotos/archivos nuevos en `tests/shots/`: horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg, monumentos1429_estadio_agrupado.jpg, monumentos1429_estadio_anterior.jpg, monumentos1429_inicio_agrupado.jpg, monumentos1429_inicio_anterior.jpg
