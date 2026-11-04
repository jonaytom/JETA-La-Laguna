# Pruebas 1.1.9 — 2026-11-04 20:19 — 10/10 OK

Listas: diag119b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 98 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_alturas.py 330 -10 45` | **OK** | 0 s |
| 2 | `herramientas/sonda_calzadas.py -1815 -212 60` | **OK** | 60 s |
| 3 | `herramientas/sonda_calzadas.py -2270 -228 60` | **OK** | 1 s |
| 4 | `herramientas/sonda_calzadas.py -3292 -161 50` | **OK** | 1 s |
| 5 | `herramientas/sonda_calzadas.py 2210 3312 45` | **OK** | 2 s |
| 6 | `herramientas/sonda_calzadas.py -191 366 40` | **OK** | 2 s |
| 7 | `herramientas/sonda_calzadas.py -147 220 40` | **OK** | 2 s |
| 8 | `herramientas/sonda_conduccion.py p:-2000,-232` | **OK** | 3 s |
| 9 | `herramientas/sonda_conduccion.py p:-3330,-200` | **OK** | 0 s |
| 10 | `herramientas/sonda_rampas.py` | **OK** | 2 s |

## Detalle

### 1. herramientas/sonda_alturas.py 330 -10 45 — OK

```
     [89, 302, 23, -12.02, -12.02, 0]
{"ri": 821, "nombre": "", "tipo": 4, "ancho": 9.1, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [68, 351, 29, 0.6, 0.6, 0]
     [72, 349, 25, -0.08, -0.08, 0]
     [76, 347, 22, -0.75, -0.75, 0]
     [80, 345, 18, -1.48, -1.48, 0]
     [84, 343, 15, -2.07, -2.07, 0]
     [88, 341, 11, -2.6, -2.6, 0]
     [92, 339, 8, -3.19, -3.19, 0]
     [96, 337, 5, -3.76, -3.76, 0]
     [100, 334, 1, -4.34, -4.34, 0]
     [104, 332, -2, -4.94, -4.94, 0]
     [106, 331, -4, -5.29, -5.29, 0]
     [110, 329, -8, -5.83, -5.83, 0]
     [114, 328, -11, -6.34, -6.34, 0]
     [118, 326, -15, -6.71, -6.71, 0]
     [122, 324, -18, -7.08, -7.08, 0]
     [126, 322, -22, -7.43, -7.43, 0]
     [130, 320, -25, -7.95, -7.95, 0]
     [134, 318, -28, -8.45, -8.45, 0]
     [138, 315, -31, -8.98, -8.98, 0]
     [142, 313, -35, -9.51, -9.51, 0]
{"ri": 1981, "nombre": "Vía de Ronda de La Laguna", "tipo": 3, "ancho": 13, "flags": 0, "raise": true, "span": [10.718904082520183, 90.71890408252018], "dep": false, "grade": false}
     [0, 311, -37, -9.88, -9.88, 0]
     [4, 312, -34, -9.73, -9.73, 0]
     [8, 313, -30, -9.49, -9.49, 0]
     [12, 315, -26, -9.24, -9.24, 0]
     [16, 316, -22, -9, -9.02, 0.02]
     [20, 317, -18, -8.67, -8.78, 0.11]
     [24, 318, -15, -8.21, -8.54, 0.34]
     [28, 319, -11, -7.74, -8.33, 0.59]
     [32, 320, -7, -7.26, -8.12, 0.86]
     [36, 322, -3, -6.75, -7.92, 1.17]
     [40, 323, 1, -6.23, -7.73, 1.5]
     [44, 324, 5, -5.7, -7.56, 1.85]
     [48, 325, 8, -5.16, -7.38, 2.22]
     [52, 326, 12, -4.61, -7.19, 2.59]
     [56, 327, 16, -4.07, -7.03, 2.96]
     [60, 329, 20, -3.48, -6.79, 3.31]
     [64, 330, 24, -2.86, -6.52, 3.65]
     [66, 331, 26, -2.52, -6.37, 3.85]
     [70, 331, 30, -2.13, -6.28, 4.14]
     [74, 332, 34, -1.79, -6.19, 4.41]
{"ri": 1982, "nombre": "Vía de Ronda de La Laguna", "tipo": 3, "ancho": 13, "flags": 0, "raise": false, "span": null, "dep": false, "grade": false}
     [20, 309, -46, -9.91, -10.06, 0]
     [24, 310, -42, -9.88, -9.98, 0]
     [28, 311, -38, -9.88, -9.89, 0]
{"ri": 2201, "nombre": "Camino de las Estaciones", "tipo": 9, "ancho": 7.5, "flags": 0, "raise": true, "span": [69.2522701498316, 132.88823685591666], "dep": false, "grade": false}
     [8, 293, 12, -12.82, -12.82, 0]
     [12, 292, 8, -12.81, -12.81, 0]
     [16, 292, 4, -12.78, -12.78, 0]
     [20, 291, 0, -12.76, -12.76, 0]
     [24, 291, -4, -12.73, -12.73, 0]
     [28, 291, -8, -12.73, -12.73, 0]
     [32, 290, -12, -12.73, -12.73, 0]
     [36, 290, -16, -12.73, -12.73, 0]
     [40, 289, -20, -12.73, -12.73, 0]
     [44, 289, -24, -12.74, -12.74, 0]
     [48, 289, -28, -12.71, -12.71, 0]
SONDA ALTURAS OK
```

### 2. herramientas/sonda_calzadas.py -1815 -212 60 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [331, 'Camino San Lázaro', 'unclassified', 8, '', 18, -1821, -195, 31.22, 31.22, 4]
   [332, 'Camino San Lázaro', 'unclassified', 8, 'puente', 0, -1815, -212, 30.91, 30.91, 2]
   [333, 'Camino San Lázaro', 'residential', 8.1, '', 17, -1810, -228, 30.71, 30.71, 16]
   [1264, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 7, -1817, -205, 24.49, 30.99, 12]
   [1271, '', 'motorway_link', 7.8, 'hundida', 13, -1822, -222, 24.56, 31.06, 35]
   [1793, 'Calle Espinero', 'unclassified', 7.9, '', 51, -1798, -164, 30.04, 30.04, 10]
   [1796, 'Calle el Amagante', 'service', 5.2, '', 51, -1801, -162, 30.22, 30.22, 2]
   [2478, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 26, -1793, -199, 23.67, 30.17, 58]
   [2898, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 8, -1813, -220, 24.32, 30.82, 9]
   [2899, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 13, -1822, -222, 24.56, 31.06, 65]
   [4702, '', 'motorway_link', 7.8, 'hundida', 15, -1819, -198, 24.65, 31.14, 37]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [331, 332, '6 m', 'dif. altura 0.02..0.05', [-1822, -189]]
   [331, 1793, '8 m', 'dif. altura 0.03..0.13', [-1828, -154]]
   [332, 333, '4 m', 'dif. altura 0.02..0.05', [-1811, -224]]
   [332, 1264, '12 m', 'dif. altura 6.41..6.55', [-1819, -202]]
   [332, 2898, '12 m', 'dif. altura 6.47..6.57', [-1815, -213]]
   [332, 4702, '6 m', 'dif. altura 6.43..6.50', [-1820, -197]]
   [1264, 4702, '78 m', 'dif. altura 0.00..0.28', [-1873, -220]]
   [1271, 2899, '54 m', 'dif. altura 0.00..0.13', [-1822, -222]]
   [1793, 1796, '14 m', 'dif. altura 0.00..0.30', [-1807, -160]]
SONDA CALZADAS OK
```

### 3. herramientas/sonda_calzadas.py -2270 -228 60 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [1271, '', 'motorway_link', 7.8, 'hundida', 29, -2249, -248, 40.52, 40.52, 35]
   [2352, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 8, -2270, -220, 36.03, 42.53, 54]
   [2899, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 6, -2270, -234, 35.35, 41.85, 65]
   [4700, '', 'secondary', 11.7, '', 29, -2253, -252, 40.56, 40.56, 6]
   [4701, '', 'motorway_link', 7.8, 'hundida', 32, -2296, -209, 43.95, 43.95, 8]
   [4702, '', 'motorway_link', 7.8, 'hundida', 31, -2246, -209, 42.17, 42.17, 37]
   [4703, '', 'motorway_link', 7.8, 'hundida', 31, -2295, -246, 42.34, 42.34, 27]
   [4704, '', 'primary', 13, '', 29, -2245, -243, 40.58, 40.58, 3]
   [4705, '', 'primary', 13, '', 32, -2275, -196, 43.91, 43.91, 9]
   [4710, '', 'primary', 13, '', 31, -2256, -200, 43, 43, 8]
   [4742, 'Carretera General del Norte', 'secondary', 11.7, '', 45, -2300, -262, 42.08, 42.08, 11]
   [4745, '', 'primary', 13, 'puente', 29, -2244, -241, 40.61, 40.61, 6]
   [4746, '', 'primary', 13, 'puente', 32, -2301, -235, 43.07, 43.07, 4]
   [4747, '', 'primary', 13, '', 32, -2298, -212, 43.88, 43.88, 2]
   [4748, '', 'secondary', 11.7, '', 31, -2285, -255, 41.67, 41.67, 3]
   [4749, 'Carretera General del Norte', 'secondary', 12.9, '', 58, -2265, -286, 40.16, 40.16, 5]
   [4869, '', 'primary', 13, '', 30, -2248, -206, 42.39, 42.39, 3]
   [4871, '', 'primary', 13, '', 29, -2253, -252, 40.56, 40.56, 6]
   [4873, '', 'primary', 13, '', 32, -2279, -197, 44, 44, 5]
   [4876, '', 'primary', 13, '', 31, -2256, -200, 43, 43, 5]
   [4879, '', 'primary', 13, '', 31, -2295, -246, 42.34, 42.34, 2]
   [4880, '', 'primary', 13, '', 30, -2291, -249, 42.08, 42.08, 3]
   [4882, '', 'primary', 13, '', 30, -2244, -212, 41.93, 41.93, 2]
   [4921, 'Camino Hípica', 'unclassified', 8, '', 58, -2265, -286, 40.16, 40.16, 2]
   [4927, '', 'primary', 13, '', 29, -2252, -252, 40.55, 40.55, 2]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [1271, 2899, '28 m', 'dif. altura 2.15..4.79', [-2212, -244]]
   [1271, 4704, '10 m', 'dif. altura 0.04..0.89', [-2241, -246]]
   [1271, 4745, '6 m', 'dif. altura 1.14..1.63', [-2236, -244]]
   [2352, 4701, '24 m', 'dif. altura 3.33..5.67', [-2328, -217]]
   [2352, 4745, '28 m', 'dif. altura 6.24..6.77', [-2253, -220]]
   [2352, 4746, '16 m', 'dif. altura 6.11..6.81', [-2307, -218]]
   [2352, 4747, '8 m', 'dif. altura 6.93..7.15', [-2293, -219]]
   [2899, 4703, '22 m', 'dif. altura 2.31..4.52', [-2311, -233]]
   [2899, 4745, '24 m', 'dif. altura 5.89..6.81', [-2235, -236]]
   [2899, 4746, '24 m', 'dif. altura 6.13..6.92', [-2289, -234]]
   [4700, 4749, '8 m', 'dif. altura 0.13..0.25', [-2245, -277]]
   [4700, 4871, '16 m', 'dif. altura 0.00..0.47', [-2253, -252]]
   [4701, 4747, '10 m', 'dif. altura 0.06..0.18', [-2304, -210]]
   [4702, 4745, '4 m', 'dif. altura 0.87..1.13', [-2236, -210]]
   [4702, 4869, '2 m', 'dif. altura 0.00..0.00', [-2246, -209]]
   [4702, 4882, '10 m', 'dif. altura 0.01..0.66', [-2244, -209]]
   [4703, 4742, '8 m', 'dif. altura 2.78..3.47', [-2321, -242]]
   [4703, 4879, '16 m', 'dif. altura 0.00..0.94', [-2295, -246]]
   [4704, 4745, '6 m', 'dif. altura 0.00..0.04', [-2245, -243]]
   [4705, 4710, '16 m', 'dif. altura 0.33..0.57', [-2268, -182]]
   [4705, 4873, '2 m', 'dif. altura 0.00..0.00', [-2275, -196]]
   [4705, 4876, '16 m', 'dif. altura 0.07..0.61', [-2274, -195]]
   [4710, 4876, '14 m', 'dif. altura 0.04..0.37', [-2255, -188]]
   [4742, 4748, '26 m', 'dif. altura 0.03..0.19', [-2285, -275]]
   [4745, 4882, '4 m', 'dif. altura 0.00..0.11', [-2243, -214]]
   [4746, 4879, '4 m', 'dif. altura 0.00..0.09', [-2300, -239]]
   [4748, 4871, '16 m', 'dif. altura 0.02..0.25', [-2277, -268]]
   [4869, 4882, '6 m', 'dif. altura 0.11..0.33', [-2250, -205]]
SONDA CALZADAS OK
```

### 4. herramientas/sonda_calzadas.py -3292 -161 50 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [4711, '', 'secondary', 11.7, '', 4, -3296, -159, 70.1, 70.1, 2]
   [4712, '', 'secondary', 11.7, 'puente', 4, -3296, -162, 70.1, 70.1, 4]
   [4736, 'Carretera del Campo de Golf', 'secondary', 11.7, '', 33, -3315, -138, 70.31, 70.31, 6]
   [4756, '', 'motorway_link', 7.8, 'hundida', 41, -3266, -192, 65.6, 71.6, 25]
   [4757, '', 'secondary', 11.7, '', 39, -3299, -123, 70.1, 70.1, 8]
   [4758, 'Carretera del Campo de Golf', 'secondary', 11.7, '', 40, -3307, -124, 70.16, 70.16, 7]
   [4759, '', 'secondary', 11.7, '', 19, -3301, -144, 70.1, 70.1, 7]
   [4763, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 17, -3292, -178, 64.61, 70.61, 62]
   [4861, '', 'secondary', 11.7, '', 33, -3315, -138, 70.31, 70.31, 9]
   [4865, '', 'secondary', 11.7, '', 39, -3305, -124, 70.12, 70.12, 2]
   [4866, '', 'secondary', 11.7, '', 19, -3298, -143, 70.1, 70.1, 13]
   [4925, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 32, -3291, -193, 66.61, 72.61, 83]
   [4964, '', 'service', 5.2, '', 47, -3301, -115, 70.56, 70.56, 26]
   [4968, '', 'service', 5.2, '', 14, -3284, -149, 69.97, 69.97, 6]
   [5055, '', 'service', 5.2, '', 21, -3296, -140, 70.1, 70.1, 5]
   [5125, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 41, -3266, -192, 65.6, 71.6, 27]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [4711, 4712, '6 m', 'dif. altura 0.00..0.00', [-3298, -153]]
   [4711, 4759, '10 m', 'dif. altura 0.00..0.00', [-3301, -144]]
   [4712, 4713, '2 m', 'dif. altura 0.82..0.82', [-3287, -209]]
   [4712, 4763, '18 m', 'dif. altura 5.52..6.37', [-3294, -169]]
   [4712, 4925, '20 m', 'dif. altura 4.73..7.85', [-3291, -186]]
   [4736, 4758, '14 m', 'dif. altura 0.02..0.12', [-3325, -137]]
   [4736, 4759, '2 m', 'dif. altura 0.00..0.00', [-3315, -138]]
   [4736, 4861, '10 m', 'dif. altura 0.02..0.18', [-3317, -138]]
   [4756, 5125, '14 m', 'dif. altura 0.01..0.06', [-3254, -193]]
   [4757, 4865, '2 m', 'dif. altura 0.00..0.00', [-3305, -124]]
   [4757, 4866, '14 m', 'dif. altura 0.00..0.00', [-3303, -124]]
   [4757, 4964, '14 m', 'dif. altura 0.64..0.73', [-3277, -120]]
   [4758, 4861, '12 m', 'dif. altura 0.00..0.06', [-3317, -125]]
   [4758, 4964, '22 m', 'dif. altura 0.05..0.10', [-3333, -132]]
   [4866, 5055, '20 m', 'dif. altura 0.00..0.00', [-3295, -130]]
SONDA CALZADAS OK
```

### 5. herramientas/sonda_calzadas.py 2210 3312 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [345, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 42, 2195, 3274, -223.44, -223.44, 22]
   [384, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 20, 2190, 3310, -223.54, -223.54, 38]
   [1080, '', 'service', 5.2, 'hundida,tunel', 25, 2208, 3288, -230.08, -224.94, 10]
   [1081, '', 'service', 5.2, 'hundida', 1, 2210, 3313, -225.38, -225.38, 8]
   [1653, '', 'service', 5.2, '', 44, 2253, 3300, -228.91, -228.91, 3]
   [1944, '', 'footway', 2.4, '', 28, 2218, 3285, -225.95, -225.95, 12]
   [1947, '', 'steps', 2.4, '', 37, 2229, 3281, -226.85, -226.85, 2]
   [2063, 'Calle Fonseca', 'residential', 8, '', 40, 2172, 3301, -221.58, -221.58, 9]
   [3069, 'Entrada a Urgencias', 'service', 5.2, 'hundida', 40, 2220, 3351, -226.31, -226.31, 4]
   [3070, 'Entrada a Urgencias', 'service', 5.2, 'hundida', 35, 2224, 3344, -226.61, -226.61, 2]
   [3095, '', 'service', 5.2, 'elevada', 0, 2210, 3312, -225.41, -225.41, 25]
   [3645, 'Entrada a Urgencias', 'service', 5.2, '', 27, 2234, 3326, -227.46, -227.46, 8]
   [3957, '', 'footway', 2.4, '', 35, 2195, 3281, -223.56, -223.56, 2]
   [3959, '', 'footway', 2.4, '', 38, 2190, 3280, -223.09, -223.09, 5]
   [3960, '', 'footway', 2.4, '', 37, 2181, 3334, -222.96, -222.96, 5]
   [3961, '', 'footway', 2.4, '', 34, 2185, 3335, -223.38, -223.38, 2]
   [3962, '', 'footway', 2.4, '', 45, 2170, 3332, -222.01, -222.01, 2]
   [4555, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 40, 2170, 3307, -221.58, -221.58, 20]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [345, 384, '6 m', 'dif. altura 0.00..0.09', [2195, 3274]]
   [384, 3095, '6 m', 'dif. altura 0.01..0.02', [2195, 3279]]
   [1080, 1081, '8 m', 'dif. altura 0.00..0.26', [2208, 3288]]
   [1080, 3095, '14 m', 'dif. altura 6.22..6.46', [2208, 3282]]
   [1081, 3095, '8 m', 'dif. altura 0.00..0.26', [2210, 3313]]
   [1653, 3645, '2 m', 'dif. altura 0.00..0.00', [2253, 3300]]
   [2063, 4555, '4 m', 'dif. altura 0.17..0.34', [2168, 3300]]
   [3069, 3070, '6 m', 'dif. altura 0.00..0.15', [2220, 3351]]
   [3070, 3645, '4 m', 'dif. altura 0.00..0.07', [2224, 3344]]
SONDA CALZADAS OK
```

### 6. herramientas/sonda_calzadas.py -191 366 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [2, 'Calle Doctor Zamenhoff', 'residential', 7, '', 36, -191, 402, -5.16, -5.16, 4]
   [374, 'Calle Catedral', 'residential', 7.6, '', 20, -204, 351, -6.29, -6.29, 3]
   [1025, 'Calle Catedral', 'residential', 7.5, '', 18, -191, 349, -5.93, -5.93, 14]
   [2525, 'Avenida de La Trinidad', 'secondary', 6.6, '', 17, -207, 360, -6.22, -6.22, 3]
   [2848, 'Avenida de La Trinidad', 'secondary', 6.6, '', 6, -196, 364, -5.85, -5.85, 6]
   [3667, '', 'service', 5.2, '', 33, -210, 340, -6.71, -6.71, 2]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [2, 2848, '6 m', 'dif. altura 0.05..0.15', [-203, 402]]
   [374, 2525, '6 m', 'dif. altura 0.06..0.19', [-210, 351]]
   [1025, 2848, '8 m', 'dif. altura 0.00..0.17', [-191, 349]]
SONDA CALZADAS OK
```

### 7. herramientas/sonda_calzadas.py -147 220 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [1787, 'Avenida de La Trinidad', 'secondary', 6.6, '', 27, -166, 240, -6.98, -6.98, 4]
   [2481, 'Avenida de La Trinidad', 'secondary', 6.6, '', 2, -145, 221, -6.89, -6.89, 37]
   [2501, 'Avenida de La Trinidad', 'secondary', 6.6, '', 12, -159, 216, -7.08, -7.08, 37]
   [2608, '', 'residential', 7.5, '', 30, -151, 191, -6.93, -6.93, 14]
   [3882, '', 'footway', 2.4, '', 8, -144, 212, -6.91, -6.91, 3]
   [3883, '', 'footway', 2.4, '', 11, -151, 211, -6.99, -6.99, 2]
   [3884, '', 'footway', 2.4, '', 8, -144, 213, -6.9, -6.9, 2]
   [4681, 'Calle Barcelona', 'tertiary', 10.4, '', 16, -145, 236, -6.76, -6.76, 4]
   [4683, 'Avenida de La Trinidad', 'secondary', 6.6, '', 18, -151, 237, -6.83, -6.83, 3]
   [4684, 'Calle Barcelona', 'tertiary', 10.4, '', 18, -151, 237, -6.83, -6.83, 4]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [1787, 2501, '8 m', 'dif. altura 0.00..0.05', [-166, 240]]
   [2481, 4681, '14 m', 'dif. altura 0.00..0.09', [-151, 237]]
   [2501, 2608, '18 m', 'dif. altura 0.00..0.06', [-149, 185]]
   [2501, 4684, '10 m', 'dif. altura 0.02..0.11', [-163, 232]]
   [4683, 4684, '8 m', 'dif. altura 0.02..0.10', [-154, 244]]
SONDA CALZADAS OK
```

### 8. herramientas/sonda_conduccion.py p:-2000,-232 — OK

```
== {"off": 0, "dy": 0.2, "col": false, "low": true, "ri": 2352, "t": 0, "name": "Autopista del Norte", "L": 663, "done": true, "left": 6, "time": 51.5, "x": -1943, "z": -231, "y": 26.5, "salto": [0.36, -2451, -211]}
   ruta [[-2600, -204], [-2588, -205], [-2576, -205], [-2563, -206], [-2551, -206], [-2539, -207], [-2526, -208], [-2514, -208], [-2502, -209], [-2489, -209], [-2477, -210], [-2464, -211]]
```

### 9. herramientas/sonda_conduccion.py p:-3330,-200 — OK

```

```

### 10. herramientas/sonda_rampas.py — OK

```
calles por encima de una rampa o trinchera abierta: 5
  0: X 249, Y -557 · (sin nombre) (service) · rampa 1.5 m más abajo
  1: X 145, Y -625 · (sin nombre) (service) · rampa 4.2 m más abajo
  2: X 142, Y -626 · (sin nombre) (service) · rampa 4 m más abajo
  3: X 135, Y -628 · (sin nombre) (service) · rampa 2.7 m más abajo
  4: X 133, Y -637 · (sin nombre) (footway) · rampa 1.6 m más abajo
SONDA RAMPAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-147_220_arriba.jpg, calzadas_-147_220_calle0.jpg, calzadas_-147_220_calle1.jpg, calzadas_-1815_-212_arriba.jpg, calzadas_-1815_-212_calle0.jpg, calzadas_-1815_-212_calle1.jpg, calzadas_-191_366_arriba.jpg, calzadas_-191_366_calle0.jpg, calzadas_-191_366_calle1.jpg, calzadas_-2270_-228_arriba.jpg, calzadas_-2270_-228_calle0.jpg, calzadas_-2270_-228_calle1.jpg, calzadas_-3292_-161_arriba.jpg, calzadas_-3292_-161_calle0.jpg, calzadas_-3292_-161_calle1.jpg, calzadas_2210_3312_arriba.jpg, calzadas_2210_3312_calle0.jpg, calzadas_2210_3312_calle1.jpg, rampa_0.jpg, rampa_1.jpg, rampa_2.jpg, rampa_3.jpg, rampa_4.jpg
