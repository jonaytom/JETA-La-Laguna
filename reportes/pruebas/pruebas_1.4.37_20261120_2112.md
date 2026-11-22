# Pruebas 1.4.37 — 2026-11-20 21:12 — 3/3 OK

Listas: v1437. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 63 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 1 s |
| 2 | `prueba_1427_gpu.py` | **OK** | 23 s |
| 3 | `prueba_horizonte_1428_gpu.py` | **OK** | 5 s |

## Detalle

### 1. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 65, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 2. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.0514829322887521}, 'parked': {'models': 50, 'shades': 21, 'white': 0.043825222396650966}, 'liveTraffic': {'cars': 24, 'shades': 14, 'white': 2}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 3. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 12018, 'buckets': 1157, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.4022222222346399, 0.46111111111111114], 'after': [0.034444444440305234, 0.03388888889716731]}, 'views': [{'name': 'trinidad', 'runs': [[20.399999998509884, 1735], [20.100000001490116, 1690], [18.400000002235174, 1690], [18, 1735]]}, {'name': 'ronda', 'runs': [[15.100000001490116, 1108], [14.599999997764826, 1080], [15, 1080], [14.600000001490116, 1108]]}, {'name': 'mirador', 'runs': [[16.899999998509884, 1342], [15.800000000745058, 1317], [15.699999999254942, 1317], [16.199999999254942, 1342]]}]}
HORIZONTE OK
```

Fotos/archivos nuevos en `tests/shots/`: faros1437_apagados.jpg, faros1437_encendidos.jpg, horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg
