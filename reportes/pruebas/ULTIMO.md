# Pruebas 1.1.5 — 2026-11-03 23:48 — 5/5 OK

Listas: v1115a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 89 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 7 s |
| 2 | `prueba_trinidad.py` | **OK** | 55 s |
| 3 | `herramientas/sonda_aparcamiento.py` | **OK** | 4 s |
| 4 | `herramientas/sonda_calzadas.py -720 301 40` | **OK** | 2 s |
| 5 | `herramientas/sonda_calzadas.py -730 335 30` | **OK** | 1 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 141, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-228, 471]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 3. herramientas/sonda_aparcamiento.py — OK

```
calles miradas: 2794
  ancho:0    807
  ancho:1    1018
  ancho:2    605
  nada:0     307
  osm:0      5
  osm:1      39
  osm:2      11
  tira:1     2
foto 0 -276 118 Calle San Juan
foto 1 2074 1590 Calle Chimbeske
foto 2 850 2380 Calle Igualdad
foto 3 2394 3846 Calle Rosalía de Castro
foto 4 1282 3672 Calle San Manuel
foto 5 1757 3600 
SONDA APARCAMIENTO OK
```

### 4. herramientas/sonda_calzadas.py -720 301 40 — OK

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
   [91, 2289, '16 m', 'dif. altura 4.98..5.83', [-699, 323]]
   [91, 2296, '18 m', 'dif. altura 5.17..5.46', [-717, 327]]
   [91, 2502, '10 m', 'dif. altura 0.00..0.10', [-726, 330]]
   [981, 2502, '6 m', 'dif. altura 0.32..1.97', [-741, 334]]
   [981, 2839, '2 m', 'dif. altura 0.41..0.41', [-740, 336]]
   [2289, 3599, '52 m', 'dif. altura 0.00..0.46', [-708, 303]]
   [2502, 2839, '10 m', 'dif. altura 0.04..0.12', [-735, 329]]
SONDA CALZADAS OK
```

### 5. herramientas/sonda_calzadas.py -730 335 30 — OK

```
vías (índice, nombre, tipo, ancho, puente/elevada/hundida, dist, X, Y, altura calzada, altura terreno, puntos):
   [91, 'Avenida República de Venezuela', 'tertiary', 10.4, 'puente,elevada', 7, -726, 330, 14.31, 9.73, 2]
   [93, 'Camino San Francisco', 'tertiary', 10.4, 'elevada', 11, -738, 343, 11.05, 10.3, 3]
   [981, '', 'tertiary', 10.4, 'elevada', 9, -739, 339, 11.49, 10.33, 4]
   [2296, 'Autopista del Norte', 'motorway', 13.4, '', 23, -713, 320, 9.14, 9.14, 28]
   [2502, 'Avenida República de Venezuela', 'tertiary', 10.4, 'elevada', 6, -730, 329, 14.44, 9.89, 10]
   [2834, 'Camino San Francisco', 'tertiary', 10.4, '', 27, -747, 356, 10.7, 10.7, 3]
   [2839, 'Camino San Francisco', 'tertiary', 10.4, 'elevada', 1, -731, 334, 14.48, 9.94, 3]
   [3379, '', 'tertiary_link', 7.8, 'elevada', 27, -747, 356, 10.7, 10.7, 5]
calzadas que se pisan (vía, otra vía, metros, diferencia de altura, dónde):
   [91, 2296, '16 m', 'dif. altura 5.17..5.46', [-717, 327]]
   [91, 2502, '10 m', 'dif. altura 0.00..0.10', [-726, 330]]
   [93, 981, '8 m', 'dif. altura 0.19..0.56', [-742, 349]]
   [93, 2834, '10 m', 'dif. altura 0.00..0.15', [-747, 356]]
   [981, 2502, '6 m', 'dif. altura 0.32..1.97', [-741, 334]]
   [981, 2839, '10 m', 'dif. altura 0.03..0.90', [-738, 342]]
   [2502, 2839, '10 m', 'dif. altura 0.04..0.12', [-735, 329]]
   [2834, 3379, '2 m', 'dif. altura 0.00..0.00', [-749, 357]]
SONDA CALZADAS OK
```

Fotos/archivos nuevos en `tests/shots/`: aparca_0.jpg, aparca_1.jpg, aparca_2.jpg, aparca_3.jpg, aparca_4.jpg, aparca_5.jpg, calzadas_-720_301_arriba.jpg, calzadas_-720_301_calle0.jpg, calzadas_-720_301_calle1.jpg, calzadas_-730_335_arriba.jpg, calzadas_-730_335_calle0.jpg, calzadas_-730_335_calle1.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg
