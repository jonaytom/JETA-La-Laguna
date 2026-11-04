# Pruebas 1.1.8 — 2026-11-04 16:39 — 2/2 OK

Listas: talud. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 84 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calzadas.py -720 301 45` | **OK** | 59 s |
| 2 | `herramientas/sonda_calzadas.py -730 335 45` | **OK** | 2 s |

## Detalle

### 1. herramientas/sonda_calzadas.py -720 301 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [5, 'Buenaventura Bonnet', 'residential', 8, '', 25, -703, 282, 8.42, 8.42, 3]
   [91, 'Avenida República de Venezuela', 'tertiary', 10.4, 'puente,elevada', 26, -714, 326, 14.28, 9.17, 2]
   [981, '', 'tertiary', 10.4, 'elevada', 37, -744, 329, 14.6, 10.62, 4]
   [2289, 'Autopista del Norte', 'motorway', 13.4, '', 8, -714, 296, 9.09, 9.09, 25]
   [2296, 'Autopista del Norte', 'motorway', 13.4, '', 7, -725, 306, 9.62, 9.62, 28]
   [2502, 'Avenida República de Venezuela', 'tertiary', 10.4, 'elevada', 29, -726, 330, 14.31, 9.73, 10]
   [2839, 'Camino San Francisco', 'tertiary', 10.4, 'elevada', 29, -726, 330, 14.3, 9.73, 3]
   [3599, '', 'motorway_link', 7.8, '', 8, -714, 296, 9.09, 9.09, 13]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [5, 214, '6 m', 'dif. altura 0.07..0.21', [-691, 274]]
   [91, 220, '4 m', 'dif. altura 0.34..0.49', [-680, 318]]
   [91, 2289, '20 m', 'dif. altura 4.67..5.83', [-699, 323]]
   [91, 2296, '18 m', 'dif. altura 5.17..5.46', [-717, 327]]
   [91, 2502, '10 m', 'dif. altura 0.00..0.10', [-726, 330]]
   [981, 2502, '6 m', 'dif. altura 0.32..1.97', [-741, 334]]
   [981, 2839, '10 m', 'dif. altura 0.03..0.90', [-738, 342]]
   [2289, 3599, '52 m', 'dif. altura 0.00..0.46', [-708, 303]]
   [2502, 2839, '10 m', 'dif. altura 0.04..0.12', [-735, 329]]
SONDA CALZADAS OK
```

### 2. herramientas/sonda_calzadas.py -730 335 45 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [91, 'Avenida República de Venezuela', 'tertiary', 10.4, 'puente,elevada', 7, -726, 330, 14.31, 9.73, 2]
   [93, 'Camino San Francisco', 'tertiary', 10.4, 'elevada', 11, -738, 343, 11.05, 10.3, 3]
   [191, 'Calle Cabrera Felipe', 'residential', 7.9, 'elevada', 44, -772, 345, 13.18, 11.85, 6]
   [967, '', 'tertiary', 10.4, 'elevada', 41, -771, 338, 13.51, 11.78, 4]
   [981, '', 'tertiary', 10.4, 'elevada', 9, -739, 339, 11.49, 10.33, 4]
   [1650, '', 'tertiary_link', 7.8, 'elevada', 44, -770, 354, 12.48, 11.74, 4]
   [2289, 'Autopista del Norte', 'motorway', 13.4, '', 38, -702, 310, 8.69, 8.69, 25]
   [2296, 'Autopista del Norte', 'motorway', 13.4, '', 23, -713, 320, 9.14, 9.14, 28]
   [2502, 'Avenida República de Venezuela', 'tertiary', 10.4, 'elevada', 6, -730, 329, 14.44, 9.89, 10]
   [2831, '', 'tertiary', 10.4, 'elevada', 43, -767, 357, 11.82, 11.61, 5]
   [2834, 'Camino San Francisco', 'tertiary', 10.4, '', 27, -747, 356, 10.7, 10.7, 3]
   [2839, 'Camino San Francisco', 'tertiary', 10.4, 'elevada', 1, -731, 334, 14.48, 9.94, 3]
   [3372, '', 'tertiary', 10.4, 'elevada', 43, -767, 357, 12.04, 11.61, 2]
   [3379, '', 'tertiary_link', 7.8, 'elevada', 27, -747, 356, 10.7, 10.7, 5]
   [3599, '', 'motorway_link', 7.8, '', 42, -714, 296, 9.09, 9.09, 13]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [91, 2289, '14 m', 'dif. altura 5.13..5.83', [-699, 323]]
   [91, 2296, '18 m', 'dif. altura 5.17..5.46', [-717, 327]]
   [91, 2502, '10 m', 'dif. altura 0.00..0.10', [-726, 330]]
   [93, 981, '8 m', 'dif. altura 0.19..0.56', [-742, 349]]
   [93, 2834, '10 m', 'dif. altura 0.00..0.15', [-747, 356]]
   [191, 967, '2 m', 'dif. altura 0.09..0.09', [-773, 344]]
   [967, 1650, '6 m', 'dif. altura 0.07..0.25', [-771, 350]]
   [967, 2502, '6 m', 'dif. altura 0.00..0.04', [-771, 338]]
   [981, 2502, '6 m', 'dif. altura 0.32..1.97', [-741, 334]]
   [981, 2839, '10 m', 'dif. altura 0.03..0.90', [-738, 342]]
   [2289, 3599, '18 m', 'dif. altura 0.00..0.21', [-708, 303]]
   [2502, 2839, '10 m', 'dif. altura 0.04..0.12', [-735, 329]]
   [2831, 3372, '2 m', 'dif. altura 0.22..0.22', [-767, 357]]
   [2831, 3379, '8 m', 'dif. altura 0.00..0.03', [-766, 359]]
   [2834, 3379, '14 m', 'dif. altura 0.00..0.18', [-756, 366]]
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: calzadas_-720_301_arriba.jpg, calzadas_-720_301_calle0.jpg, calzadas_-720_301_calle1.jpg, calzadas_-730_335_arriba.jpg, calzadas_-730_335_calle0.jpg, calzadas_-730_335_calle1.jpg
