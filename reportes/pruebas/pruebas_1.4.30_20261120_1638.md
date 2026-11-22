# Pruebas 1.4.30 — 2026-11-20 16:38 — 3/3 OK

Listas: v1430. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 47 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1427_gpu.py` | **OK** | 20 s |
| 2 | `prueba_monumentos_1429_gpu.py` | **OK** | 2 s |
| 3 | `prueba_pinos_1430_gpu.py` | **OK** | 0 s |

## Detalle

### 1. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04858757062146893}, 'parked': {'models': 50, 'shades': 21, 'white': 0.040105890138980804}, 'liveTraffic': {'cars': 24, 'shades': 14, 'white': 0}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 2. prueba_monumentos_1429_gpu.py — OK

```
{'gpu': 'ANGLE (AMD, AMD Radeon RX 6600 (0x000073FF) Direct3D11 vs_5_0 ps_5_0, D3D11)', 'shadow': 2048, 'batches': 3, 'pieces': 9, 'groups': {'inicio': {'pieces': 3, 'batches': 1}, 'Estadio Francisco Peraza': {'pieces': 6, 'batches': 2}}, 'views': [{'label': 'estadio', 'runs': [{'ms': 10.600000000093132, 'calls': 500, 'tris': 1439390}, {'ms': 11.200000000186265, 'calls': 492, 'tris': 1439390}, {'ms': 9.299999999813735, 'calls': 492, 'tris': 1439390}, {'ms': 8.700000000186265, 'calls': 500, 'tris': 1439390}], 'diff': {'changed': 9.645061728395062e-07, 'mean': 2.797067901234568e-05}}, {'label': 'inicio', 'runs': [{'ms': 12.600000000093132, 'calls': 749, 'tris': 1496229}, {'ms': 13, 'calls': 747, 'tris': 1496229}, {'ms': 11.399999999906868, 'calls': 747, 'tris': 1496229}, {'ms': 10, 'calls': 749, 'tris': 1496229}], 'diff': {'changed': 0, 'mean': 0}}]}
MONUMENTOS OK
```

### 3. prueba_pinos_1430_gpu.py — OK

```
{'pines': 14, 'closest': [-1341.5063968787244, -749.8275332323512], 'crownVertices': 1563, 'farVertices': 207, 'trunkVertices': 138}
PINOS CAMINO TORNERO OK
```

Fotos/archivos nuevos en `tests/shots/`: camino_tornero_pinos_1430.jpg, monumentos1429_estadio_agrupado.jpg, monumentos1429_estadio_anterior.jpg, monumentos1429_inicio_agrupado.jpg, monumentos1429_inicio_anterior.jpg
