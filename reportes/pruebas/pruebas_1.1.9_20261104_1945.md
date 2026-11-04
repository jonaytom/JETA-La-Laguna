# Pruebas 1.1.9 — 2026-11-04 19:45 — 11/11 OK

Listas: diag119. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 100 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calzadas.py 2210 3312 45` | **OK** | 61 s |
| 2 | `herramientas/sonda_calzadas.py 309 -40 45` | **OK** | 2 s |
| 3 | `herramientas/sonda_calzadas.py -147 220 40` | **OK** | 2 s |
| 4 | `herramientas/sonda_calzadas.py -78 27 30` | **OK** | 2 s |
| 5 | `herramientas/sonda_calzadas.py -3292 -161 50` | **OK** | 1 s |
| 6 | `herramientas/sonda_calzadas.py -1815 -212 60` | **OK** | 1 s |
| 7 | `herramientas/sonda_calzadas.py -2270 -228 60` | **OK** | 1 s |
| 8 | `herramientas/sonda_conduccion.py p:-3292,-161` | **OK** | 0 s |
| 9 | `herramientas/sonda_conduccion.py p:-2000,-232` | **OK** | 3 s |
| 10 | `herramientas/sonda_caidas.py -3292 -161 150` | **OK** | 0 s |
| 11 | `herramientas/sonda_rampas.py` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_calzadas.py 2210 3312 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [347, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 42, 2195, 3274, -223.44, -223.44, 22]
   [386, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 20, 2190, 3310, -223.54, -223.54, 38]
   [1082, '', 'service', 5.2, 'hundida,tunel', 25, 2208, 3288, -230.08, -224.94, 10]
   [1083, '', 'service', 5.2, 'hundida', 1, 2210, 3313, -226.72, -225.38, 8]
   [1655, '', 'service', 5.2, '', 44, 2253, 3300, -228.91, -228.91, 3]
   [1946, '', 'footway', 2.4, '', 28, 2218, 3285, -225.95, -225.95, 12]
   [1949, '', 'steps', 2.4, '', 37, 2229, 3281, -226.85, -226.85, 2]
   [2065, 'Calle Fonseca', 'residential', 8, '', 40, 2172, 3301, -221.58, -221.58, 9]
   [3072, 'Entrada a Urgencias', 'service', 5.2, 'hundida', 40, 2220, 3351, -226.31, -226.31, 4]
   [3073, 'Entrada a Urgencias', 'service', 5.2, 'hundida', 35, 2224, 3344, -226.61, -226.61, 2]
   [3098, '', 'service', 5.2, 'elevada', 0, 2210, 3312, -225.41, -225.41, 25]
   [3648, 'Entrada a Urgencias', 'service', 5.2, '', 27, 2234, 3326, -227.46, -227.46, 8]
   [3960, '', 'footway', 2.4, '', 35, 2195, 3281, -223.56, -223.56, 2]
   [3962, '', 'footway', 2.4, '', 38, 2190, 3280, -223.09, -223.09, 5]
   [3963, '', 'footway', 2.4, '', 37, 2181, 3334, -222.96, -222.96, 5]
   [3964, '', 'footway', 2.4, '', 34, 2185, 3335, -223.38, -223.38, 2]
   [3965, '', 'footway', 2.4, '', 45, 2170, 3332, -222.01, -222.01, 2]
   [4558, 'Carretera General La Cuesta - Taco', 'secondary', 8.6, '', 40, 2170, 3307, -221.58, -221.58, 20]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [347, 386, '6 m', 'dif. altura 0.00..0.09', [2195, 3274]]
   [386, 3098, '6 m', 'dif. altura 0.01..0.02', [2195, 3279]]
   [1082, 1083, '8 m', 'dif. altura 0.00..0.26', [2208, 3288]]
   [1082, 3098, '14 m', 'dif. altura 6.22..6.46', [2208, 3282]]
   [1083, 3098, '8 m', 'dif. altura 1.33..1.56', [2210, 3313]]
   [1655, 3648, '2 m', 'dif. altura 0.00..0.00', [2253, 3300]]
   [2065, 4558, '4 m', 'dif. altura 0.17..0.34', [2168, 3300]]
   [3072, 3073, '6 m', 'dif. altura 0.00..0.15', [2220, 3351]]
   [3073, 3648, '4 m', 'dif. altura 0.00..0.07', [2224, 3344]]
SONDA CALZADAS OK
```

### 2. herramientas/sonda_calzadas.py 309 -40 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [522, '', 'primary_link', 9.1, '', 6, 303, -40, -10.23, -11.07, 6]
   [823, '', 'primary_link', 9.1, '', 3, 311, -37, -9.88, -9.88, 8]
   [836, '', 'residential', 7.5, '', 34, 275, -38, -13.12, -13.12, 6]
   [1983, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 3, 311, -37, -9.88, -9.88, 3]
   [1984, 'Vía de Ronda de La Laguna', 'primary', 13, '', 1, 310, -40, -9.88, -9.94, 2]
   [2203, 'Camino de las Estaciones', 'unclassified', 7.5, 'elevada', 21, 288, -38, -12.65, -12.65, 4]
   [2576, 'Vía de Ronda de La Laguna', 'primary', 13, 'elevada', 25, 305, -65, -10.46, -10.46, 9]
   [3818, 'Calle José Clavijo Fajardo', 'residential', 7.5, '', 38, 272, -47, -13.01, -13.01, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [522, 1983, '6 m', 'dif. altura 0.53..0.92', [303, -34]]
   [522, 1984, '30 m', 'dif. altura 0.03..0.83', [304, -63]]
   [522, 2576, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [823, 1983, '42 m', 'dif. altura 0.10..1.39', [332, -3]]
   [836, 3818, '12 m', 'dif. altura 0.00..0.07', [272, -47]]
   [1983, 1984, '2 m', 'dif. altura 0.00..0.00', [311, -37]]
   [1984, 2576, '2 m', 'dif. altura 0.00..0.00', [305, -65]]
   [3818, 578, '2 m', 'dif. altura 0.29..0.29', [265, -47]]
SONDA CALZADAS OK
```

### 3. herramientas/sonda_calzadas.py -147 220 40 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [1789, 'Avenida de La Trinidad', 'secondary', 6.6, '', 27, -166, 240, -6.98, -6.98, 4]
   [2483, 'Avenida de La Trinidad', 'secondary', 6.6, '', 2, -145, 221, -6.89, -6.89, 37]
   [2503, 'Avenida de La Trinidad', 'secondary', 6.6, '', 12, -159, 216, -7.08, -7.08, 37]
   [2610, '', 'residential', 7.5, '', 30, -151, 191, -6.93, -6.93, 14]
   [3885, '', 'footway', 2.4, '', 8, -144, 212, -6.91, -6.91, 3]
   [3886, '', 'footway', 2.4, '', 11, -151, 211, -6.99, -6.99, 2]
   [3887, '', 'footway', 2.4, '', 8, -144, 213, -6.9, -6.9, 2]
   [4684, 'Calle Barcelona', 'tertiary', 10.4, '', 16, -145, 236, -6.76, -6.76, 4]
   [4686, 'Avenida de La Trinidad', 'secondary', 6.6, '', 18, -151, 237, -6.83, -6.83, 3]
   [4687, 'Calle Barcelona', 'tertiary', 10.4, '', 18, -151, 237, -6.83, -6.83, 4]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [1789, 2503, '8 m', 'dif. altura 0.00..0.05', [-166, 240]]
   [2483, 4684, '14 m', 'dif. altura 0.00..0.09', [-151, 237]]
   [2503, 2610, '18 m', 'dif. altura 0.00..0.06', [-149, 185]]
   [2503, 4687, '10 m', 'dif. altura 0.02..0.11', [-163, 232]]
   [4686, 4687, '8 m', 'dif. altura 0.02..0.10', [-154, 244]]
SONDA CALZADAS OK
```

### 4. herramientas/sonda_calzadas.py -78 27 30 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [6, 'Calle Tabares de Cala', 'residential', 9.8, '', 22, -86, 7, -0.25, -0.25, 17]
   [374, 'Avenida de La Trinidad', 'secondary', 6.6, '', 13, -90, 23, -0.86, -0.86, 4]
   [377, '', 'secondary_link', 9.1, '', 2, -79, 29, -1.07, -1.07, 4]
   [770, 'Calle Herradores', 'pedestrian', 6, '', 22, -86, 7, -0.25, -0.25, 4]
   [771, 'Calle Herradores', 'tertiary', 11.1, '', 12, -71, 18, -0.67, -0.67, 2]
   [2484, 'Avenida de La Trinidad', 'secondary', 6.6, '', 0, -78, 27, -1.02, -1.02, 5]
   [2488, 'Calle Herradores', 'tertiary', 12, '', 12, -68, 20, -0.78, -0.78, 5]
   [4464, '', 'footway', 2.4, '', 14, -70, 16, -0.61, -0.61, 64]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [6, 374, '6 m', 'dif. altura 0.06..0.20', [-84, 1]]
   [374, 377, '14 m', 'dif. altura 0.00..0.23', [-89, 18]]
   [374, 771, '8 m', 'dif. altura 0.05..0.21', [-86, 8]]
   [377, 2484, '10 m', 'dif. altura 0.00..0.13', [-79, 29]]
   [771, 2484, '8 m', 'dif. altura 0.06..0.23', [-74, 16]]
SONDA CALZADAS OK
```

### 5. herramientas/sonda_calzadas.py -3292 -161 50 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [4714, '', 'secondary', 11.7, 'elevada', 4, -3296, -159, 73.73, 70.1, 2]
   [4715, '', 'secondary', 11.7, 'puente,elevada', 4, -3296, -162, 74.01, 70.1, 4]
   [4739, 'Carretera del Campo de Golf', 'secondary', 11.7, '', 33, -3315, -138, 70.31, 70.31, 6]
   [4759, '', 'motorway_link', 7.8, 'elevada', 41, -3266, -192, 71.6, 71.6, 25]
   [4760, '', 'secondary', 11.7, '', 39, -3299, -123, 70.1, 70.1, 8]
   [4761, 'Carretera del Campo de Golf', 'secondary', 11.7, '', 40, -3307, -124, 70.16, 70.16, 7]
   [4762, '', 'secondary', 11.7, '', 19, -3301, -144, 70.1, 70.1, 7]
   [4766, 'Autopista del Norte', 'motorway', 13.4, '', 17, -3292, -178, 70.61, 70.61, 62]
   [4864, '', 'secondary', 11.7, '', 33, -3315, -138, 70.31, 70.31, 9]
   [4868, '', 'secondary', 11.7, '', 39, -3305, -124, 70.12, 70.12, 2]
   [4869, '', 'secondary', 11.7, '', 19, -3298, -143, 70.1, 70.1, 13]
   [4928, 'Autopista del Norte', 'motorway', 13.4, '', 32, -3291, -193, 72.61, 72.61, 83]
   [4967, '', 'service', 5.2, '', 47, -3301, -115, 70.56, 70.56, 26]
   [4971, '', 'service', 5.2, '', 14, -3284, -149, 69.97, 69.97, 6]
   [5058, '', 'service', 5.2, '', 21, -3296, -140, 70.1, 70.1, 5]
   [5128, 'Autopista del Norte', 'motorway', 13.4, 'elevada', 41, -3266, -192, 71.6, 71.6, 27]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [4714, 4715, '6 m', 'dif. altura 0.16..1.15', [-3298, -153]]
   [4714, 4762, '10 m', 'dif. altura 0.00..1.61', [-3301, -144]]
   [4715, 4716, '2 m', 'dif. altura 0.71..0.71', [-3287, -209]]
   [4715, 4766, '18 m', 'dif. altura 4.32..6.53', [-3294, -169]]
   [4715, 4928, '20 m', 'dif. altura 4.76..6.03', [-3291, -186]]
   [4739, 4761, '14 m', 'dif. altura 0.02..0.12', [-3325, -137]]
   [4739, 4762, '2 m', 'dif. altura 0.00..0.00', [-3315, -138]]
   [4739, 4864, '10 m', 'dif. altura 0.02..0.18', [-3317, -138]]
   [4759, 5128, '14 m', 'dif. altura 0.01..0.10', [-3254, -193]]
   [4760, 4868, '2 m', 'dif. altura 0.00..0.00', [-3305, -124]]
   [4760, 4869, '14 m', 'dif. altura 0.00..0.00', [-3303, -124]]
   [4760, 4967, '14 m', 'dif. altura 0.64..0.73', [-3277, -120]]
   [4761, 4864, '12 m', 'dif. altura 0.00..0.06', [-3317, -125]]
   [4761, 4967, '22 m', 'dif. altura 0.05..0.10', [-3333, -132]]
   [4869, 5058, '20 m', 'dif. altura 0.00..0.00', [-3295, -130]]
SONDA CALZADAS OK
```

### 6. herramientas/sonda_calzadas.py -1815 -212 60 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [309, '', 'motorway_link', 7.8, 'hundida', 12, -1818, -201, 25.2, 31.06, 37]
   [333, 'Camino San Lázaro', 'unclassified', 8, 'elevada', 18, -1821, -195, 36.29, 31.22, 4]
   [334, 'Camino San Lázaro', 'unclassified', 8, 'puente,elevada', 0, -1815, -212, 37.03, 30.91, 2]
   [335, 'Camino San Lázaro', 'residential', 8.1, 'elevada', 17, -1810, -228, 35.79, 30.71, 16]
   [1266, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 7, -1817, -205, 24.49, 30.99, 12]
   [1273, '', 'motorway_link', 7.8, 'hundida', 13, -1822, -222, 24.56, 31.06, 35]
   [1795, 'Calle Espinero', 'unclassified', 7.9, 'elevada', 51, -1798, -164, 30.18, 30.04, 10]
   [1798, 'Calle el Amagante', 'service', 5.2, 'elevada', 51, -1801, -162, 30.65, 30.22, 2]
   [2480, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 26, -1793, -199, 23.67, 30.17, 58]
   [2901, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 8, -1813, -220, 24.32, 30.82, 9]
   [2902, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 13, -1822, -222, 24.56, 31.06, 65]
   [4705, '', 'motorway_link', 7.8, '', 12, -1818, -201, 31.07, 31.07, 37]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [309, 1266, '2 m', 'dif. altura 0.01..0.01', [-1795, -199]]
   [309, 4705, '86 m', 'dif. altura 1.91..6.49', [-1874, -216]]
   [333, 334, '6 m', 'dif. altura 0.00..0.03', [-1822, -189]]
   [333, 1795, '8 m', 'dif. altura 0.01..0.40', [-1828, -154]]
   [334, 335, '4 m', 'dif. altura 0.06..0.18', [-1811, -224]]
   [334, 1266, '10 m', 'dif. altura 12.22..12.54', [-1818, -204]]
   [334, 2901, '12 m', 'dif. altura 11.82..12.66', [-1815, -213]]
   [334, 4705, '4 m', 'dif. altura 5.27..5.38', [-1820, -199]]
   [1266, 4705, '52 m', 'dif. altura 6.48..6.67', [-1873, -220]]
   [1273, 2902, '54 m', 'dif. altura 0.00..1.84', [-1822, -222]]
   [1795, 1798, '14 m', 'dif. altura 0.11..1.11', [-1807, -160]]
SONDA CALZADAS OK
```

### 7. herramientas/sonda_calzadas.py -2270 -228 60 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [309, '', 'motorway_link', 7.8, 'hundida', 31, -2245, -209, 42.16, 42.16, 37]
   [1273, '', 'motorway_link', 7.8, 'hundida', 29, -2249, -248, 40.52, 40.52, 35]
   [2354, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 8, -2270, -220, 36.03, 42.53, 54]
   [2902, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 6, -2270, -234, 35.35, 41.85, 65]
   [4703, '', 'secondary', 11.7, '', 29, -2253, -252, 40.56, 40.56, 6]
   [4704, '', 'motorway_link', 7.8, '', 32, -2296, -209, 43.95, 43.95, 8]
   [4705, '', 'motorway_link', 7.8, '', 31, -2246, -209, 42.17, 42.17, 37]
   [4706, '', 'motorway_link', 7.8, '', 31, -2295, -246, 42.34, 42.34, 27]
   [4707, '', 'primary', 13, '', 29, -2245, -243, 40.58, 40.58, 3]
   [4708, '', 'primary', 13, '', 32, -2275, -196, 43.91, 43.91, 9]
   [4713, '', 'primary', 13, '', 31, -2256, -200, 43, 43, 8]
   [4745, 'Carretera General del Norte', 'secondary', 11.7, '', 45, -2300, -262, 42.08, 42.08, 11]
   [4748, '', 'primary', 13, 'puente', 29, -2244, -241, 40.61, 40.61, 6]
   [4749, '', 'primary', 13, 'puente', 32, -2301, -235, 43.07, 43.07, 4]
   [4750, '', 'primary', 13, '', 32, -2298, -212, 43.88, 43.88, 2]
   [4751, '', 'secondary', 11.7, '', 31, -2285, -255, 41.67, 41.67, 3]
   [4752, 'Carretera General del Norte', 'secondary', 12.9, '', 58, -2265, -286, 40.16, 40.16, 5]
   [4872, '', 'primary', 13, '', 30, -2248, -206, 42.39, 42.39, 3]
   [4874, '', 'primary', 13, '', 29, -2253, -252, 40.56, 40.56, 6]
   [4876, '', 'primary', 13, '', 32, -2279, -197, 44, 44, 5]
   [4879, '', 'primary', 13, '', 31, -2256, -200, 43, 43, 5]
   [4882, '', 'primary', 13, '', 31, -2295, -246, 42.34, 42.34, 2]
   [4883, '', 'primary', 13, '', 30, -2291, -249, 42.08, 42.08, 3]
   [4885, '', 'primary', 13, '', 30, -2244, -212, 41.93, 41.93, 2]
   [4924, 'Camino Hípica', 'unclassified', 8, '', 58, -2265, -286, 40.16, 40.16, 2]
   [4930, '', 'primary', 13, '', 29, -2252, -252, 40.55, 40.55, 2]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [309, 4705, '40 m', 'dif. altura 0.00..0.00', [-2245, -209]]
   [1273, 2902, '28 m', 'dif. altura 6.21..6.26', [-2212, -244]]
   [1273, 4707, '10 m', 'dif. altura 0.04..0.25', [-2241, -246]]
   [1273, 4748, '6 m', 'dif. altura 0.30..0.42', [-2236, -244]]
   [2354, 4704, '24 m', 'dif. altura 6.80..6.88', [-2328, -217]]
   [2354, 4748, '28 m', 'dif. altura 6.24..6.77', [-2253, -220]]
   [2354, 4749, '16 m', 'dif. altura 6.11..6.81', [-2307, -218]]
   [2354, 4750, '8 m', 'dif. altura 6.93..7.15', [-2293, -219]]
   [2902, 4706, '22 m', 'dif. altura 6.08..6.22', [-2311, -233]]
   [2902, 4748, '24 m', 'dif. altura 5.89..6.81', [-2235, -236]]
   [2902, 4749, '24 m', 'dif. altura 6.13..6.92', [-2289, -234]]
   [4703, 4752, '8 m', 'dif. altura 0.13..0.25', [-2245, -277]]
   [4703, 4874, '16 m', 'dif. altura 0.00..0.47', [-2253, -252]]
   [4704, 4750, '10 m', 'dif. altura 0.10..0.47', [-2304, -210]]
   [4705, 4872, '2 m', 'dif. altura 0.00..0.00', [-2246, -209]]
   [4706, 4745, '8 m', 'dif. altura 0.08..0.09', [-2321, -242]]
   [4706, 4882, '16 m', 'dif. altura 0.00..0.38', [-2295, -246]]
   [4707, 4748, '6 m', 'dif. altura 0.00..0.04', [-2245, -243]]
   [4708, 4713, '16 m', 'dif. altura 0.33..0.57', [-2268, -182]]
   [4708, 4876, '2 m', 'dif. altura 0.00..0.00', [-2275, -196]]
   [4708, 4879, '16 m', 'dif. altura 0.07..0.61', [-2274, -195]]
   [4713, 4879, '14 m', 'dif. altura 0.04..0.37', [-2255, -188]]
   [4745, 4751, '26 m', 'dif. altura 0.03..0.19', [-2285, -275]]
   [4748, 4885, '4 m', 'dif. altura 0.00..0.11', [-2243, -214]]
   [4749, 4882, '4 m', 'dif. altura 0.00..0.09', [-2300, -239]]
   [4751, 4874, '16 m', 'dif. altura 0.02..0.25', [-2277, -268]]
   [4872, 4885, '6 m', 'dif. altura 0.11..0.33', [-2250, -205]]
SONDA CALZADAS OK
```

### 8. herramientas/sonda_conduccion.py p:-3292,-161 — OK

```

```

### 9. herramientas/sonda_conduccion.py p:-2000,-232 — OK

```
== {"off": 0, "dy": 0.2, "col": false, "low": true, "ri": 2354, "t": 0, "name": "Autopista del Norte", "L": 663, "done": true, "left": 6, "time": 51.5, "x": -1943, "z": -231, "y": 26.5, "salto": [0.35, -2451, -211]}
   ruta [[-2600, -204], [-2588, -205], [-2576, -205], [-2563, -206], [-2551, -206], [-2539, -207], [-2526, -208], [-2514, -208], [-2502, -209], [-2489, -209], [-2477, -210], [-2464, -211]]
```

### 10. herramientas/sonda_caidas.py -3292 -161 150 — OK

```
sitios donde se bajaba del tablero al tramo de abajo: 0
SONDA CAIDAS OK
```

### 11. herramientas/sonda_rampas.py — OK

```
calles por encima de una rampa o trinchera abierta: 5
  0: X 249, Y -557 · (sin nombre) (service) · rampa 1.5 m más abajo
  1: X 145, Y -625 · (sin nombre) (service) · rampa 4.2 m más abajo
  2: X 142, Y -626 · (sin nombre) (service) · rampa 4 m más abajo
  3: X 135, Y -628 · (sin nombre) (service) · rampa 2.7 m más abajo
  4: X 133, Y -637 · (sin nombre) (footway) · rampa 1.6 m más abajo
SONDA RAMPAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-147_220_arriba.jpg, calzadas_-147_220_calle0.jpg, calzadas_-147_220_calle1.jpg, calzadas_-1815_-212_arriba.jpg, calzadas_-1815_-212_calle0.jpg, calzadas_-1815_-212_calle1.jpg, calzadas_-2270_-228_arriba.jpg, calzadas_-2270_-228_calle0.jpg, calzadas_-2270_-228_calle1.jpg, calzadas_-3292_-161_arriba.jpg, calzadas_-3292_-161_calle0.jpg, calzadas_-3292_-161_calle1.jpg, calzadas_-78_27_arriba.jpg, calzadas_-78_27_calle0.jpg, calzadas_-78_27_calle1.jpg, calzadas_2210_3312_arriba.jpg, calzadas_2210_3312_calle0.jpg, calzadas_2210_3312_calle1.jpg, calzadas_309_-40_arriba.jpg, calzadas_309_-40_calle0.jpg, calzadas_309_-40_calle1.jpg, rampa_0.jpg, rampa_1.jpg, rampa_2.jpg, rampa_3.jpg, rampa_4.jpg
