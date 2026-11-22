# Pruebas 1.4.29 — 2026-11-20 15:53 — 4/5 OK

Listas: v1429. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 58 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_monumentos_1429_gpu.py` | **OK** | 2 s |
| 2 | `prueba_horizonte_1428_gpu.py` | **OK** | 5 s |
| 3 | `prueba_1427_gpu.py` | **FALLA** | 17 s |
| 4 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 5 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

### 1. prueba_monumentos_1429_gpu.py — OK

```
{'gpu': 'ANGLE (AMD, AMD Radeon RX 6600 (0x000073FF) Direct3D11 vs_5_0 ps_5_0, D3D11)', 'shadow': 2048, 'batches': 3, 'pieces': 9, 'groups': {'inicio': {'pieces': 3, 'batches': 1}, 'Estadio Francisco Peraza': {'pieces': 6, 'batches': 2}}, 'views': [{'label': 'estadio', 'runs': [{'ms': 9.300000000046566, 'calls': 509, 'tris': 1459216}, {'ms': 9.299999999813735, 'calls': 501, 'tris': 1459216}, {'ms': 9.600000000093132, 'calls': 501, 'tris': 1459216}, {'ms': 10.699999999953434, 'calls': 509, 'tris': 1459216}], 'diff': {'changed': 9.645061728395062e-07, 'mean': 6.510416666666667e-05}}, {'label': 'inicio', 'runs': [{'ms': 12.600000000093132, 'calls': 725, 'tris': 1419915}, {'ms': 11.199999999953434, 'calls': 723, 'tris': 1419915}, {'ms': 11.100000000093132, 'calls': 723, 'tris': 1419915}, {'ms': 11.399999999906868, 'calls': 725, 'tris': 1419915}], 'diff': {'changed': 0, 'mean': 0}}]}
MONUMENTOS OK
```

### 2. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 12076, 'buckets': 1157, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.28555555555633166, 0.2649999999997413], 'after': [0.03277777777855388, 0.03166666666770147]}, 'views': [{'name': 'trinidad', 'runs': [[18.600000000093132, 1653], [18.100000000093132, 1602], [18.100000000093132, 1602], [18.100000000093132, 1653]]}, {'name': 'ronda', 'runs': [[16.100000000093132, 1259], [14.800000000046566, 1226], [17.5999999998603, 1226], [18.0999999998603, 1259]]}, {'name': 'mirador', 'runs': [[18.699999999953434, 1304], [16.5, 1277], [14.300000000046566, 1277], [12.899999999906868, 1304]]}]}
HORIZONTE OK
```

### 3. prueba_1427_gpu.py — FALLA

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.043115438108484005}, 'parked': {'models': 50, 'shades': 21, 'white': 0.04514255543822598}, 'liveTraffic': {'cars': 3, 'shades': 2, 'white': 0}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 FALLA
```

### 4. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 27, 'finish': 57, 'length': 1206, 'checkpoints': 5, 'sign': 16, 'cafe': 16} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 5. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795190032203,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Carrera con el Canarión":[["El Canarión","¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.",1795190027739],["El Canarión","Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.",1795190027756],["El Canarión","Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.",1795190027757],["El Canarión","¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.",1795190027758],["El Canarión (por el móvil)","¡Ños! ¿Me sacaste 146 segundos? Toma, 2.500 €, bien ganados.",1795190031103],["El Canarión (por el móvil)","Sastrón está aquí al lado. Ve a llevarle el dinero.",1795190031110]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg, monumentos1429_estadio_agrupado.jpg, monumentos1429_estadio_anterior.jpg, monumentos1429_inicio_agrupado.jpg, monumentos1429_inicio_anterior.jpg
