# Pruebas 1.2.0 — 2026-11-09 21:43 — 4/4 OK

Listas: tf5_oeste. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 85 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_vias.py -2500 -205 60` | **OK** | 8 s |
| 2 | `herramientas/sonda_solapes.py 80` | **OK** | 0 s |
| 3 | `herramientas/foto_vista.py tf5_oeste1 -2460 -209 11 -2440 -190` | **OK** | 54 s |
| 4 | `herramientas/foto_vista.py tf5_oeste2 -2548 -214 15 -2470 -205` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_vias.py -2500 -205 60 — OK

```
vías a menos de 60 m de X -2500, Y -205 (puntos: X, Y, calzada − terreno)
{"ri": 2352, "nombre": "Autopista del Norte", "tipo": "motorway", "ancho": 13.4, "flags": 1, "hundida": true, "carriles": [2, -1, -1], "puntos": [[-2600.4, -204.1, 0], [-2588, -204.7, 0], [-2575.7, -205.2, 0], [-2563.3, -205.8, 0], [-2551, -206.4, 0], [-2538.6, -207, 0], [-2526.3, -207.6, 0], [-2513.9, -208.2, 0], [-2501.5, -208.8, 0], [-2489.2, -209.3, 0], [-2476.8, -209.9, 0], [-2464.5, -210.5, 0], [-2452.1, -211.1, -0.3], [-2439.8, -211.7, -0.8], [-2427.4, -212.3, -1.4], [-2415.2, -212.8, -2.2], [-2403, -213.4, -3], [-2390.8, -214, -3.9], [-2378.7, -214.5, -4.7], [-2366.5, -215.1, -5.4], [-2354.3, -215.7, -6], [-2342.1, -216.2, -6.4], [-2329.9, -216.8, -6.5], [-2317.7, -217.4, -6.5], [-2305.5, -218, -6.5], [-2293.4, -218.6, -6.5], [-2281.2, -219.1, -6.5], [-2269, -219.6, -6.5], [-2256.8, -220.2, -6.5], [-2244.6, -220.8, -6.5], [-2232.4, -221.5, -6.5], [-2220.2, -222.1, -6.5], [-2208.1, -222.7, -6.5], [-2195.9, -223.2, -6.5], [-2183.7, -223.8, -6.5], [-2171.5, -224.4, -6.5], [-2159.3, -225, -6.5], [-2147.1, -225.5, -6.5], [-2135, -226.1, -6.5], [-2122.8, -226.7, -6.5], [-2110.6, -227.3, -6.5], [-2098.4, -227.8, -6.5], [-2084.8, -228.5, -6.5], [-2071.1, -229.2, -6.5], [-2057.5, -229.9, -6.5], [-2043.9, -230.6, -6.5], [-2030.3, -231.1, -6.5], [-2016.6, -231.6, -6.5], [-2003, -232.1, -6.5], [-1989.5, -232.3, -6.5], [-1975.5, -232.2, -6.5], [-1961.6, -231.9, -6.5], [-1949.6, -231.3, -6.5], [-1937.7, -230.5, -6.5]]}
{"ri": 2899, "nombre": "Autopista del Norte", "tipo": "motorway", "ancho": 13.4, "flags": 1, "hundida": true, "puntos": [[-1822.5, -222.4, -6.5], [-1834.4, -225.7, -6.5], [-1846.4, -229, -6.5], [-1858.3, -232, -6.5], [-1870.1, -234.8, -6.5], [-1883.3, -237.2, -6.5], [-1896.4, -239.4, -6.5], [-1909.5, -241.6, -6.5], [-1922.8, -243.7, -6.5], [-1943.9, -245.9, -6.5], [-1957.6, -246.5, -6.5], [-1971.5, -247, -6.5], [-1987, -247.1, -6.5], [-2002.5, -247, -6.5], [-2014.9, -246.5, -6.5], [-2027.3, -246, -6.5], [-2039.7, -245.6, -6.5], [-2052.2, -245, -6.5], [-2064.6, -244.4, -6.5], [-2076.9, -243.7, -6.5], [-2089.3, -243.1, -6.5], [-2101.7, -242.5, -6.5], [-2114.1, -241.9, -6.5], [-2126.5, -241.3, -6.5], [-2138.9, -240.7, -6.5], [-2151.3, -240.2, -6.5], [-2163.7, -239.6, -6.5], [-2176, -239, -6.5], [-2188.4, -238.4, -6.5], [-2200.8, -237.8, -6.5], [-2213.2, -237.2, -6.5], [-2225.6, -236.7, -6.5], [-2242.1, -235.8, -6.5], [-2256.4, -235.1, -6.5], [-2270.6, -234.3, -6.5], [-2285.4, -233.7, -6.5], [-2300.1, -233.2, -6.5], [-2315.1, -232.3, -6.5], [-2327.3, -231.7, -6.5], [-2339.5, -231.2, -6.4], [-2351.7, -230.6, -6.1], [-2364, -230, -5.5], [-2376.2, -229.5, -4.8], [-2388.4, -228.9, -4.1], [-2400.6, -228.3, -3.2], [-2412.8, -227.8, -2.4], [-2425, -227.2, -1.6], [-2437.2, -226.6, -0.9], [-2449.4, -226, -0.4], [-2461.6, -225.5, -0.1], [-2473.9, -224.9, 0], [-2486.1, -224.3, 0], [-2498.3, -223.7, 0], [-2510.5, -223.2, 0], [-2522.7, -222.6, 0], [-2534.9, -222, 0], [-2547.1, -221.4, 0], [-2559.3, -220.8, 0], [-2571.5, -220.3, 0], [-2583.7, -219.7, 0], [-2596, -219.1, 0], [-2608.2, -218.5, 0], [-2620.4, -218, 0], [-2632.6, -217.4, 0], [-2651.6, -217.2, 0]]}
{"ri": 4703, "nombre": "", "tipo": "motorway_link", "ancho": 7.8, "flags": 1, "hundida": true, "puntos": [[-2295, -246, 0], [-2308, -241, -1.3], [-2317.1, -242.1, -2.4], [-2330.4, -241.4, -4], [-2343.6, -240.7, -5.6], [-2356.9, -239.9, -5.9], [-2370.1, -239.2, -5.4], [-2383.6, -238.7, -4.6], [-2397.1, -238.2, -3.8], [-2410.6, -237.7, -3], [-2424.1, -237.2, -2.2], [-2436.1, -236.4, -1.5], [-2448.2, -235.6, -1], [-2460.2, -234.8, -0.5], [-2472.2, -234, -0.2], [-2484.2, -233.2, 0], [-2497.7, -232.4, 0], [-2511.2, -231.7, 0], [-2524.7, -230.9, 0], [-2538.2, -230.2, 0], [-2555.2, -230.2, 0], [-2572.2, -228.2, 0], [-2584.2, -227.2, 0], [-2596.2, -226.2, 0], [-2608.5, -225.5, 0], [-2620.8, -224.9, 0], [-2633, -224.2, 0]]}
{"ri": 4793, "nombre": "Carretera General del Norte", "tipo": "secondary", "ancho": 11.7, "flags": 0, "hundida": false, "puntos": [[-2682, -230.7, 0], [-2558.2, -237, 0], [-2495.1, -240, 0], [-2471.1, -241.1, 0], [-2457.1, -242.1, 0], [-2430, -241, 0]]}
{"ri": 4847, "nombre": "Camino Eclipse de Sol", "tipo": "residential", "ancho": 8, "flags": 0, "hundida": false, "carriles": [1, -1, -1], "puntos": [[-2457.1, -242.1, 0], [-2473, -256, 0], [-2540, -328, 0], [-2618, -415, 0]]}
{"ri": 4920, "nombre": "", "tipo": "motorway_link", "ancho": 7.8, "flags": 1, "hundida": false, "puntos": [[-2576.8, -196.8, 0], [-2563.6, -197.1, 0], [-2550.3, -197.4, 0], [-2537, -197.7, 0], [-2523.7, -197.9, 0], [-2510.4, -198.4, 0], [-2497.2, -198.8, 0], [-2483.9, -199.3, 0]]}
{"ri": 5024, "nombre": "", "tipo": "motorway_link", "ancho": 7.8, "flags": 1, "hundida": true, "carriles": [1, -1, -1], "puntos": [[-2483.9, -199.3, 0], [-2470.1, -200, -0.2], [-2456.4, -203.6, -0.7], [-2442.6, -204.4, -1.2], [-2428.8, -205.2, -1.9], [-2415, -206, -2.8], [-2401, -206.3, -3.7], [-2387, -206.7, -4.5], [-2373, -207, -5.3]]}
SONDA VIAS OK
```

### 2. herramientas/sonda_solapes.py 80 — OK

```
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 4.6 m, se pisan 6 m (12 puntos)
  X -62, Y 1068 · 15 puntos
      ['secondary', '', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.2 m, se pisan 4.4 m (1 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['secondary', '', 11.7, '']: ejes a 8.7 m, se pisan 3.9 m (11 puntos)
      ['secondary', '', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 12 m, se pisan 0.6 m (3 puntos)
  X -961, Y 948 · 15 puntos
      ['service', '', 5.2, ''] con ['residential', '', 8, '']: ejes a 3.5 m, se pisan 3.1 m (15 puntos)
  X -3230, Y -292 · 15 puntos
      ['secondary', 'Carretera General del Norte', 11.7, ''] con ['secondary', 'Carretera General del Norte', 11.7, '']: ejes a 3.9 m, se pisan 7.8 m (4 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway_link', '', 7.8, '']: ejes a 1.3 m, se pisan 6.5 m (7 puntos)
      ['secondary', 'Carretera General del Norte', 11.7, ''] con ['secondary', 'Carretera General del Norte', 11.7, '']: ejes a 7.8 m, se pisan 3.9 m (2 puntos)
      ['unclassified', 'Camino del Púlpito', 8, ''] con ['service', '', 5.2, '']: ejes a 5.4 m, se pisan 1.2 m (2 puntos)
  X 938, Y 2883 · 14 puntos
      ['service', '', 5.2, 'puente'] con ['service', '', 5.2, '']: ejes a 0.7 m, se pisan 4.5 m (6 puntos)
      ['tertiary', '', 10.4, ''] con ['service', '', 5.2, 'puente']: ejes a 5.3 m, se pisan 2.5 m (2 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.2 m, se pisan 1 m (1 puntos)
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', 'Vía de Servicio', 10.4, '']: ejes a 11 m, se pisan 0.9 m (2 puntos)
  X 1668, Y 1841 · 14 puntos
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.1 m, se pisan 3.3 m (2 puntos)
      ['secondary_link', 'Avenida de los Menceyes', 9.1, ''] con ['secondary', '', 11.7, '']: ejes a 7.9 m, se pisan 2.5 m (12 puntos)
  X 511, Y 1686 · 14 puntos
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 9.3 m, se pisan 1.3 m (2 puntos)
      ['tertiary', '', 10.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 8.2 m, se pisan 0.9 m (4 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway', 'Autopista del Norte', 14.8, '']: ejes a 13.4 m, se pisan 0.7 m (8 puntos)
  X 421, Y 1339 · 14 puntos
      ['service', '', 5.2, ''] con ['residential', 'Calle las Saltonas', 7.9, '']: ejes a 3.9 m, se pisan 2.6 m (14 puntos)
  X 840, Y 2899 · 14 puntos
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 0.7 m, se pisan 4.5 m (1 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 3.5 m, se pisan 1.7 m (12 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.1 m, se pisan 1.1 m (1 puntos)
  X -235, Y 806 · 14 puntos
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5 m, se pisan 1.5 m (4 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5 m, se pisan 1.5 m (6 puntos)
      ['service', '', 5.2, ''] con ['motorway_link', '', 7.8, '']: ejes a 5.8 m, se pisan 0.7 m (1 puntos)
      ['service', '', 5.2, ''] con ['service', '', 5.2, '']: ejes a 4.5 m, se pisan 0.7 m (3 puntos)
  X -1019, Y 19 · 13 puntos
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 6.8 m, se pisan 3.8 m (2 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 7.1 m, se pisan 3.5 m (1 puntos)
      ['residential', 'Calle Higueras Don Felipe', 7.9, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.9 m, se pisan 1.8 m (6 puntos)
      ['motorway_link', '', 7.8, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 9.2 m, se pisan 1.4 m (4 puntos)
  X 519, Y 3846 · 13 puntos
      ['motorway', 'Autovía Interconexión Norte-Sur', 13.4, ''] con ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, '']: ejes a 7.4 m, se pisan 4.5 m (13 puntos)
  X 829, Y 3485 · 13 puntos
      ['tertiary', 'Travesía Enlace Andenes Sobradillo', 10.4, ''] con ['tertiary', 'Avenida Ghandi', 10.4, '']: ejes a 3.2 m, se pisan 7.2 m (7 puntos)
      ['tertiary', 'Avenida Ghandi', 10.4, ''] con ['tertiary_link', '', 7.8, '']: ejes a 4.7 m, se pisan 4.4 m (2 puntos)
      ['tertiary', 'Avenida Ghandi', 10.4, ''] con ['tertiary', 'Avenida Ghandi', 10.4, '']: ejes a 8.1 m, se pisan 2.3 m (4 puntos)
  X 30, Y 1137 · 13 puntos
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['secondary', '', 11.7, '']: ejes a 10.3 m, se pisan 2.3 m (2 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 11.1, '']: ejes a 10.1 m, se pisan 2.1 m (8 puntos)
      ['motorway', 'Autopista del Norte', 13.4, ''] con ['motorway_link', '', 7.8, '']: ejes a 9.8 m, se pisan 0.8 m (2 puntos)
      ['motorway_link', '', 11.1, ''] con ['service', '', 5.2, '']: ejes a 7.8 m, se pisan 0.3 m (1 puntos)
  X -2102, Y 530 · 13 puntos
      ['service', '', 5.2, ''] con ['residential', 'Calle Cabildo', 8, '']: ejes a 4.5 m, se pisan 2.1 m (13 puntos)
  X -2282, Y 449 · 13 puntos
      ['service', '', 5.2, ''] con ['unclassified', '', 8, '']: ejes a 5.2 m, se pisan 1.4 m (13 puntos)
  X -3659, Y -227 · 13 puntos
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 8.5 m, se pisan 4 m (13 puntos)
  X -3599, Y -212 · 13 puntos
      ['secondary', 'Carretera del Campo de Golf', 11.7, ''] con ['motorway', 'Autopista del Norte', 13.4, '']: ejes a 5.7 m, se pisan 6.9 m (13 puntos)
SONDA SOLAPES OK
```

### 3. herramientas/foto_vista.py tf5_oeste1 -2460 -209 11 -2440 -190 — OK

```
FOTO VISTA OK tf5_oeste1
```

### 4. herramientas/foto_vista.py tf5_oeste2 -2548 -214 15 -2470 -205 — OK

```
FOTO VISTA OK tf5_oeste2
```

Fotos/archivos nuevos en `tests/shots/`: sonda_solapes.txt, vias_-2500_-205.txt, vista_tf5_oeste1.jpg, vista_tf5_oeste2.jpg
