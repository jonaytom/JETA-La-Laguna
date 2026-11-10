# Pruebas 1.2.0 — 2026-11-09 17:13 — 1/1 OK

Listas: honorato_sur. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 82 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calzadas.py -910 52 35` | **OK** | 61 s |

## Detalle

### 1. herramientas/sonda_calzadas.py -910 52 35 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [68, 'Camino el Vallado', 'tertiary', 10.4, 'hundida,tunel', 18, -925, 61, -1.07, 5.77, 2]
   [202, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 34, -881, 34, 4.78, 4.78, 5]
   [983, 'Avenida La Candelaria', 'tertiary', 10.4, '', 21, -922, 35, 5.79, 5.79, 6]
   [1267, '', 'motorway_link', 7.8, '', 20, -914, 72, 5.58, 5.58, 15]
   [1785, '', 'motorway_link', 7.8, '', 19, -920, 68, 5.67, 5.67, 5]
   [2005, '', 'service', 5.2, '', 5, -906, 56, 5.34, 5.34, 7]
   [2286, 'Autopista del Norte', 'motorway', 13.4, 'hundida', 29, -926, 76, 5.84, 5.84, 81]
   [2292, '', 'motorway_link', 7.8, '', 18, -921, 66, 5.69, 5.69, 7]
   [2297, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 5, -913, 49, 1.23, 5.47, 5]
   [2504, 'Camino el Vallado', 'tertiary', 10.4, 'hundida', 34, -881, 34, 4.78, 4.78, 5]
   [2876, 'Calle San Antonio', 'tertiary', 12.9, '', 21, -922, 35, 5.79, 5.79, 2]
   [2960, '', 'service', 5.2, '', 11, -899, 51, 5.19, 5.19, 3]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [68, 1785, '6 m', 'dif. altura 7.18..7.33', [-928, 64]]
   [68, 2286, '10 m', 'dif. altura 7.43..7.54', [-931, 69]]
   [68, 2292, '2 m', 'dif. altura 7.02..7.02', [-927, 62]]
   [68, 2297, '2 m', 'dif. altura 0.00..0.00', [-925, 61]]
   [202, 2504, '2 m', 'dif. altura 0.00..0.00', [-881, 34]]
   [983, 1785, '8 m', 'dif. altura 0.09..0.14', [-939, 44]]
   [983, 2292, '20 m', 'dif. altura 0.02..0.23', [-923, 36]]
   [983, 2876, '2 m', 'dif. altura 0.00..0.00', [-922, 35]]
   [1267, 2005, '16 m', 'dif. altura 0.08..0.09', [-898, 84]]
   [1267, 2292, '6 m', 'dif. altura 0.02..0.06', [-910, 75]]
   [1785, 2292, '30 m', 'dif. altura 0.00..0.24', [-914, 72]]
   [2005, 2960, '4 m', 'dif. altura 0.04..0.08', [-903, 53]]
   [2297, 2504, '10 m', 'dif. altura 0.00..0.13', [-881, 34]]
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-910_52_arriba.jpg, calzadas_-910_52_calle0.jpg, calzadas_-910_52_calle1.jpg
