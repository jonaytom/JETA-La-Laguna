# Pruebas 1.1.9 — 2026-11-04 20:43 — 3/3 OK

Listas: viga. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 99 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calzadas.py -1818 -185 30` | **OK** | 56 s |
| 2 | `herramientas/sonda_alturas.py -1818 -185 25` | **OK** | 0 s |
| 3 | `herramientas/sonda_rayos.py -1850 -182 90 2` | **OK** | 22 s |

## Detalle

### 1. herramientas/sonda_calzadas.py -1818 -185 30 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [331, 'Camino San Lázaro', 'unclassified', 8, '', 5, -1823, -186, 31.29, 31.29, 4]
   [332, 'Camino San Lázaro', 'unclassified', 8, 'puente', 10, -1821, -195, 31.22, 31.22, 2]
   [1264, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 20, -1813, -204, 24.39, 30.89, 12]
   [1793, 'Calle Espinero', 'unclassified', 7.9, '', 27, -1809, -160, 30.58, 30.58, 10]
   [1796, 'Calle el Amagante', 'service', 5.2, '', 28, -1801, -162, 30.22, 30.22, 2]
   [2478, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 29, -1793, -199, 23.67, 30.17, 58]
   [4702, '', 'motorway_link', 7.8, 'hundida', 12, -1815, -196, 24.47, 30.95, 37]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [331, 332, '6 m', 'dif. altura 0.02..0.05', [-1822, -189]]
   [331, 1793, '4 m', 'dif. altura 0.10..0.13', [-1828, -157]]
   [332, 1264, '12 m', 'dif. altura 6.41..6.55', [-1819, -202]]
   [332, 2898, '2 m', 'dif. altura 6.57..6.57', [-1815, -213]]
   [332, 4702, '6 m', 'dif. altura 6.43..6.50', [-1820, -197]]
   [1264, 4702, '32 m', 'dif. altura 0.00..0.16', [-1834, -210]]
   [1793, 1796, '12 m', 'dif. altura 0.00..0.30', [-1807, -160]]
SONDA CALZADAS OK
```

### 2. herramientas/sonda_alturas.py -1818 -185 25 — OK

```
{"ri": 331, "nombre": "Camino San Lázaro", "tipo": 9, "ancho": 8, "flags": 0, "raise": false, "span": null, "dep": false, "grade": false}
     [11, -1827, -163, 31.55, 31.55, 0]
     [15, -1826, -167, 31.51, 31.51, 0]
     [19, -1826, -171, 31.48, 31.48, 0]
     [23, -1825, -175, 31.44, 31.44, 0]
     [27, -1824, -179, 31.39, 31.39, 0]
     [31, -1823, -183, 31.33, 31.33, 0]
     [35, -1823, -187, 31.29, 31.29, 0]
     [39, -1822, -191, 31.26, 31.26, 0]
     [43, -1821, -194, 31.22, 31.22, 0]
{"ri": 332, "nombre": "Camino San Lázaro", "tipo": 9, "ancho": 8, "flags": 2, "raise": false, "span": null, "dep": false, "grade": true}
     [0, -1821, -195, 31.22, 31.22, 0]
     [4, -1820, -199, 31.13, 31.13, 0]
     [8, -1818, -203, 31.06, 31.06, 0]
     [12, -1817, -206, 31, 31, 0]
{"ri": 1264, "nombre": "Autopista del Norte", "tipo": 0, "ancho": 13.4, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [115, -1825, -208, 24.74, 31.24, 0]
     [119, -1821, -207, 24.62, 31.12, 0]
     [123, -1817, -206, 24.51, 31.01, 0]
     [123, -1817, -205, 24.5, 31, 0]
     [127, -1813, -204, 24.4, 30.9, 0]
     [131, -1809, -203, 24.27, 30.77, 0]
     [135, -1805, -202, 24.12, 30.62, 0]
     [136, -1805, -202, 24.1, 30.6, 0]
     [140, -1801, -201, 23.95, 30.45, 0]
{"ri": 4702, "nombre": "", "tipo": 1, "ancho": 7.8, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [417, -1832, -202, 24.99, 31.48, 0]
     [419, -1830, -201, 24.96, 31.44, 0]
     [423, -1827, -200, 24.85, 31.33, 0]
     [427, -1823, -199, 24.75, 31.23, 0]
     [431, -1819, -197, 24.64, 31.12, 0]
     [435, -1815, -196, 24.49, 30.96, 0]
     [436, -1814, -196, 24.44, 30.92, 0]
     [440, -1810, -197, 24.27, 30.77, 0]
     [444, -1806, -197, 24.12, 30.62, 0]
     [448, -1802, -198, 23.98, 30.48, 0]
     [452, -1798, -199, 23.83, 30.33, 0]
SONDA ALTURAS OK
```

### 3. herramientas/sonda_rayos.py -1850 -182 90 2 — OK

```
rayos desde X -1850, Y -182, rumbo 90° (cosas a más de 2 m sobre el suelo y fuera de edificios: material | función | nombre: n · [x, y, altura, distancia])
    19  ?ffffff | splitInstanced < optimizeCity < boot | inst   [[-1835, -175, 12, 19], [-1836, -175, 10.4, 18], [-1836, -175, 9.2, 17], [-1836, -174, 9.2, 18], [-1836, -175, 7.9, 16]]
     2  ?5a4636 | splitInstanced < optimizeCity < boot | inst   [[-1835, -175, 3.7, 16], [-1835, -175, 2.7, 16]]
SONDA RAYOS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-1818_-185_arriba.jpg, calzadas_-1818_-185_calle0.jpg, calzadas_-1818_-185_calle1.jpg, rayos_-1850_-182_90.jpg, rayos_-1850_-182_90.txt
