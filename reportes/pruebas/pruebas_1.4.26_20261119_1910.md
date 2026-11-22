# Pruebas 1.4.26 — 2026-11-19 19:10 — 5/5 OK

Listas: v1426. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 28 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1426_gpu.py` | **OK** | 0 s |
| 2 | `prueba_1424.py` | **OK** | 0 s |
| 3 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 4 | `prueba_freno_mano.py` | **OK** | 0 s |
| 5 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

### 1. prueba_1426_gpu.py — OK

```
{'near': 11307, 'wheels': 4, 'far': True, 'parked': 190, 'total': 7502, 'white': 0.08224473473740336, 'colors': 29, 'represented': 49, 'paintedInstance': True, 'profiles': {'reventon': [270, 14.4], 'fierilla': [252, 13.4], 'guancheGT': [232, 11.8], 'seta128': [132, 5.6], 'daily': [112, 4.2], 'basura': [82, 2.9], 'agility': [60, 4]}, 'reused': True, 'livery': 16185076}
PRUEBA MP YOU OK
```

### 2. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```

### 3. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"2.8","punta":"154","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X 461 · Y 0 · 613 m"}
```

### 4. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 84, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 264, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 56, 'kmh_1s': 37, 'giro_1s_grados': 145, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 184, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 31, 'kmh_1s': 44, 'giro_1s_grados': 116, 'derrape_final': 0, 'kmh_3s': 59, 'giro_3s_grados': 183, 'derrape_max_grados': 31}
OK
```

### 5. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795115407321,"label":"test","player":{"x":0.6013955744187016,"z":1.0014148747697842,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":0,"x":-1.3986044255812984,"z":1.0014148747697842},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":fa
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: mpyou_en_juego.jpg
