# Pruebas 0.99.5 — 2026-10-27 22:07 — 1/2 OK

Listas: v0996e. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 50 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0996.py` | **FALLA** | 0 s |
| 2 | `sonda_g7.py` | **OK** | 0 s |

## Detalle

### 1. prueba_0996.py — FALLA

```
paso 68 hundido 5.68 m, pendiente máx 0.105 cruces (vía, x, z, hueco m): [[1787, -927, 63, 6.4], [2288, -933, 71, 6.4], [2294, -926, 62, 6.4], [2460, -941, 83, 6.4], [2469, -946, 91, 6.4]]
paso 311 hundido 2.97 m, pendiente máx 0.146 cruces (vía, x, z, hueco m): [[1795, -1229, -11, 6.43], [2288, -1197, -30, 6.48], [2480, -1215, -20, 6.51]]
paso 363 hundido 5.41 m, pendiente máx 0.174 cruces (vía, x, z, hueco m): [[347, 2195, 3235, 6.4], [379, 2182, 3233, 6.4]]
paso 564 hundido 4.29 m, pendiente máx 0.097 cruces (vía, x, z, hueco m): [[2023, 639, -1154, 6.4]]
paso 658 hundido 2.38 m, pendiente máx 0.191 cruces (vía, x, z, hueco m): [[2021, 631, 592, 6.4]]
paso 892 hundido 5.68 m, pendiente máx 0.121 cruces (vía, x, z, hueco m): [[2331, 1504, 2767, 6.4], [2464, 1492, 2778, 6.4]]
paso 911 hundido 3.01 m, pendiente máx 0.199 cruces (vía, x, z, hueco m): [[1293, 1831, 3131, 6.58], [2464, 1818, 3144, 6.58]]
paso 919 hundido 2.9 m, pendiente máx 0.173 cruces (vía, x, z, hueco m): [[1293, 1799, 3095, 6.65], [2464, 1786, 3107, 6.6]]
paso 1082 hundido 5.49 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): [[3098, 2208, 3277, 6.43]]
paso 1666 hundido 7.03 m, pendiente máx 0.132 cruces (vía, x, z, hueco m): [[1516, 1112, 2486, 7.53], [3373, 1118, 2477, 7.51]]
paso 1973 hundido 6.33 m, pendiente máx 0.144 cruces (vía, x, z, hueco m): []
paso 2706 hundido 5.36 m, pendiente máx 0.108 cruces (vía, x, z, hueco m): []
paso 3021 hundido 5.51 m, pendiente máx 0.076 cruces (vía, x, z, hueco m): []
paso 3396 hundido 5.36 m, pendiente máx 0.082 cruces (vía, x, z, hueco m): []
paso 3631 hundido 5.43 m, pendiente máx 0.161 cruces (vía, x, z, hueco m): [[1774, -342, 803, 6.4]]
paso 3662 hundido 2.38 m, pendiente máx 0.215 cruces (vía, x, z, hueco m): []
paso 3706 hundido 6.04 m, pendiente máx 0.136 cruces (vía, x, z, hueco m): [[2310, 1497, 1720, 6.4], [2311, 1474, 1695, 6.38]]
paso 5096 hundido 5.36 m, pendiente máx 0.267 cruces (vía, x, z, hueco m): []
paso 5101 hundido 6.42 m, pendiente máx 0.164 cruces (vía, x, z, hueco m): [[4807, -3083, -147, 6.49], [5133, -3033, -149, 6.47], [5134, -3027, -148, 6.41]]
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 21 FALLA
errores []
PRUEBA 0996 FALLA
```

### 2. sonda_g7.py — OK

```
[0.5, 43, 18, 'walk', -1, 'mirla', ['BX', 'walk', 44, 276, 6, 0, -1, 0], ['vL']]
[1, 25, 18, 'atk', -1, 'mirla', ['BX', 'walk', 44, 259, 7, 0, -1, 0], ['vL']]
[1.5, 22, 18, 'atk', -1, 'mirla', ['BX', 'walk', 44, 248, 7, 0, -1, 0], ['vL']]
[2, 18, 18, 'walk', -1, 'mirla', ['BX', 'walk', 44, 237, 7, 0, -1, 0], ['vL']]
[2.5, 24, 10, 'walk', 1, 'mirla', ['BX', 'walk', 44, 226, 8, 0, -1, 0], ['vR']]
[3, 52, 10, 'walk', 1, 'mirla', ['BX', 'walk', 44, 215, 8, 0, -1, 0], ['vR']]
[3.5, 80, 10, 'walk', 1, 'mirla', ['BX', 'walk', 44, 204, 8, 0, -1, 0], ['vR']]
[4, 63, 15, 'walk', -1, 'mirla', ['BX', 'walk', 44, 193, 8, 0, -1, 0], ['vL']]
[4.5, 44, 15, 'atk', -1, 'mirla', ['BX', 'walk', 44, 182, 9, 0, -1, 0], ['vL']]
[5, 42, 15, 'atk', -1, 'mirla', ['BX', 'walk', 44, 171, 9, 0, -1, 0], ['vL', 'hit:vS']]
[5.5, 42, 15, 'atk', -1, 'mirla', ['BX', 'walk', 44, 160, 10, 0, -1, 0], ['vR', 'vU']]
[6, 69, 12, 'walk', 1, 'mirla', ['BX', 'walk', 44, 149, 10, 0, -1, 0], ['vR']]
[6.5, 97, 12, 'walk', 1, 'mirla', ['BX', 'walk', 44, 138, 10, 0, -1, 0], ['vR']]
[7, 120, 12, 'atk', 1, 'mirla', ['BX', 'windup', 44, 134, 11, 0, -1, 0], ['vR']]
[7.5, 120, 12, 'atk', 1, 'mirla', ['BX', 'atk', 42, 134, 11, 0, -1, 0], ['vR']]
[8, 120, 12, 'atk', 1, 'mirla', ['BX', 'fall', 40, 155, 11, 0, -1, 19], ['vR']]
[8.5, 145, 12, 'walk', 1, 'mirla', ['BX', 'down', 40, 175, 11, 0, -1, 0], ['vR']]
[9, 160, 12, 'atk', 1, 'mirla', ['BX', 'down', 40, 175, 11, 0, -1, 0], ['vR']]
[9.5, 160, 12, 'atk', 1, 'mirla', ['BX', 'getup', 40, 175, 11, 0, -1, 0], ['vR']]
[10, 166, 12, 'walk', 1, 'mirla', ['BX', 'walk', 40, 181, 12, 0.3, -1, 0], ['vR']]
[10.5, 177, 12, 'walk', 1, 'mirla', ['BX', 'walk', 40, 192, 12, 0, -1, 0], ['vR']]
[11, 186, 12, 'atk', 1, 'mirla', ['BX', 'windup', 39, 201, 12, 0, -1, 0], ['vR']]
[11.5, 186, 12, 'idle', 1, 'mirla', ['BX', 'fall', 37, 222, 12, 0, -1, 18.6], ['vR']]
[12, 214, 12, 'walk', 1, 'mirla', ['BX', 'down', 37, 239, 12, 0, -1, 0], ['vR']]
[12.5, 225, 12, 'atk', 1, 'mirla', ['BX', 'down', 37, 239, 12, 0, -1, 0], ['vR', 'hit:vS']]
[13, 225, 12, 'atk', 1, 'mirla', ['BX', 'getup', 37, 239, 12, 0, -1, 0], ['vR']]
[13.5, 225, 12, 'atk', 1, 'mirla', ['BX', 'windup', 37, 240, 12, 0.25, -1, 0], ['vR']]
[14, 225, 12, 'atk', 1, 'mirla', ['BX', 'windup', 37, 240, 12, 0, -1, 0], ['vR']]
[14.5, 227, 12, 'walk', 1, 'mirla', ['BX', 'fall', 35, 264, 12, 0, -1, 17.3], ['vR']]
[15, 255, 12, 'walk', 1, 'mirla', ['BX', 'down', 35, 278, 12, 0, -1, 0], ['vR']]
[15.5, 259, 12, 'walk', 1, 'mirla', ['BX', 'down', 35, 278, 12, 0, -1, 0], ['vR']]
[16, 259, 12, 'walk', 1, 'mirla', ['BX', 'getup', 35, 278, 12, 0, -1, 0], ['vR']]
[16.5, 253, 12, 'atk', 1, 'mirla', ['BX', 'windup', 35, 261, 12, 0.2, -1, 0], ['vL']]
[17, 253, 12, 'atk', 1, 'mirla', ['BX', 'windup', 35, 261, 12, 0, -1, 0], ['vL']]
[17.5, 259, 12, 'walk', 1, 'mirla', ['BX', 'fall', 33, 291, 12, 0, -1, 11.9], ['vR']]
[18, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 33, 299, 12, 0, -1, 0], ['vR']]
[18.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 33, 299, 12, 0, -1, 0], ['vR']]
[19, 259, 18, 'walk', 1, 'mirla', ['BX', 'idle', 33, 299, 12, 0.6, -1, 0], ['vR']]
[19.5, 253, 15, 'atk', 1, 'mirla', ['BX', 'atk', 33, 261, 12, 0.1, -1, 0], ['vL']]
[20, 253, 15, 'atk', 1, 'mirla', ['BX', 'fall', 31, 267, 13, 0, -1, 10.8], []]
[20.5, 259, 15, 'walk', 1, 'mirla', ['BX', 'fall', 31, 297, 13, 0, -1, 2.7], ['vR']]
[21, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 31, 299, 13, 0, -1, 0], ['vR']]
[21.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'getup', 31, 299, 13, 0, -1, 0], ['vR']]
[22, 254, 16, 'walk', -1, 'mirla', ['BX', 'walk', 31, 261, 13, 0.5, -1, 0], ['vL']]
[22.5, 253, 16, 'atk', 1, 'mirla', ['BX', 'walk', 31, 261, 14, 0, -1, 0], ['vL']]
[23, 253, 16, 'atk', 1, 'mirla', ['BX', 'fall', 29, 273, 14, 0, -1, 16.8], ['vR']]
[23.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 29, 299, 14, 0, -1, 0], ['vR']]
[24, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 29, 299, 14, 0, -1, 0], ['vR']]
[24.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'getup', 29, 299, 14, 0, -1, 0], ['vR']]
[25, 253, 17, 'atk', 1, 'mirla', ['BX', 'walk', 29, 261, 15, 0.4, -1, 0], ['vL']]
[25.5, 253, 17, 'atk', 1, 'mirla', ['BX', 'walk', 29, 261, 15, 0, -1, 0], ['vL']]
[26, 253, 17, 'atk', 1, 'mirla', ['BX', 'fall', 27, 279, 16, 0, -1, 19], ['vR']]
[26.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 27, 299, 16, 0, -1, 0], ['vR']]
[27, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 27, 299, 16, 0, -1, 0], ['vR']]
[27.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'getup', 27, 299, 16, 0, -1, 0], ['vR']]
[28, 253, 18, 'atk', 1, 'mirla', ['BX', 'windup', 27, 261, 16, 0.3, -1, 0], ['vL']]
[28.5, 253, 18, 'atk', 1, 'mirla', ['BX', 'windup', 27, 261, 16, 0, -1, 0], ['vL']]
[29, 256, 18, 'walk', 1, 'mirla', ['BX', 'fall', 25, 285, 16, 0, -1, 17.3], ['vR']]
[29.5, 259, 18, 'walk', 1, 'mirla', ['BX', 'down', 25, 299, 16, 0, -1, 0], ['vR']]
SONDA G7 OK
```
