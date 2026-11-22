# Pruebas 1.4.28 — 2026-11-19 23:07 — 5/5 OK

Listas: v1428. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 50 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1427_gpu.py` | **OK** | 16 s |
| 2 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 3 | `prueba_1424.py` | **OK** | 0 s |
| 4 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 5 | `prueba_horizonte_1428_gpu.py` | **OK** | 4 s |

## Detalle

### 1. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.050488145048814506}, 'parked': {'models': 50, 'shades': 21, 'white': 0.044355909694555114}, 'liveTraffic': {'cars': 21, 'shades': 14, 'white': 1}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 2. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 27, 'finish': 57, 'length': 1206, 'checkpoints': 5, 'sign': 16, 'cafe': 16} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 3. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```

### 4. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795129649081,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Carrera con el Canarión":[["El Canarión","¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.",1795129644394],["El Canarión","Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.",1795129644436],["El Canarión","Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.",1795129644437],["El Canarión","¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.",1795129644438],["El Canarión (por el móvil)","¡Ños! ¿Me sacaste 146 segundos? Toma, 2.500 €, bien ganados.",1795129647788],["El Canarión (por el móvil)","Sastrón está aquí al lado. Ve a llevarle el dinero.",1795129647795]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 5. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 12030, 'buckets': 1156, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.2788888888640536, 0.26222222223877906], 'after': [0.032777777769499354, 0.032222222247057494]}, 'views': [{'name': 'trinidad', 'runs': [[15.800000004470348, 1808], [15.700000002980232, 1763], [15.600000001490116, 1763], [16.200000002980232, 1808]]}, {'name': 'ronda', 'runs': [[12.600000001490116, 1100], [13.300000004470348, 1069], [12.199999995529652, 1069], [12.300000004470348, 1100]]}, {'name': 'mirador', 'runs': [[13.899999998509884, 1232], [13.900000005960464, 1208], [13.699999995529652, 1208], [13, 1232]]}]}
HORIZONTE OK
```

Fotos/archivos nuevos en `tests/shots/`: horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg
