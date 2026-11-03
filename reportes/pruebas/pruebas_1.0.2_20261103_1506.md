# Pruebas 1.0.2 — 2026-11-03 15:06 — 3/3 OK

Listas: v1002b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 74 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_hueco.py -301 -262 70` | **OK** | 52 s |
| 3 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_tamanos.py — OK

```
gente (altura m): caja {'n': 5, 'min': 1.63, 'med': 1.79, 'max': 1.88} · por la cabeza {'n': 5, 'min': 1.46, 'med': 1.6, 'max': 1.71} · jugador 1.66 · real: 1,60–1,85
coches (m): largo {'n': 11, 'min': 1.88, 'med': 4.06, 'max': 4.51} · ancho {'n': 11, 'min': 0.68, 'med': 1.78, 'max': 1.9} · alto {'n': 11, 'min': 1.1, 'med': 1.44, 'max': 1.84} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
calles (ancho m, tal cual en el juego):
   residential      {'n': 1720, 'min': 5.4, 'med': 7.9, 'max': 12.2}
   tertiary         {'n': 346, 'min': 10.4, 'med': 10.4, 'max': 13}
   motorway_link    {'n': 112, 'min': 7.8, 'med': 7.8, 'max': 11.1}
   secondary        {'n': 264, 'min': 6.6, 'med': 11.7, 'max': 13}
   primary_link     {'n': 24, 'min': 9.1, 'med': 9.1, 'max': 9.1}
   unclassified     {'n': 101, 'min': 6.1, 'med': 8, 'max': 12.2}
   service          {'n': 1056, 'min': 3.5, 'med': 5.2, 'max': 8}
   tertiary_link    {'n': 19, 'min': 7.8, 'med': 7.8, 'max': 7.8}
   motorway         {'n': 75, 'min': 13.4, 'med': 13.4, 'max': 18.5}
   secondary_link   {'n': 39, 'min': 9.1, 'med': 9.1, 'max': 9.1}
   primary          {'n': 89, 'min': 11.7, 'med': 13, 'max': 18.2}
   living_street    {'n': 4, 'min': 4.8, 'med': 5.8, 'max': 7.2}
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4836 · quitados (solo quedaba una tira) 251
edificios quitados por superficie original (m²): {'20-50': 168, '<20': 81, '50-100': 2}
   X -1275, Y 698: 50 m²
   X -1250, Y -371: 50 m²
   X 2346, Y 2781: 49 m²
   X 198, Y 1457: 49 m²
   X 1648, Y 4382: 49 m²
   X -1250, Y -378: 49 m²
   X 1458, Y 3797: 49 m²
   X 1478, Y 3602: 49 m²
   X 1590, Y 3519: 49 m²
   X 1397, Y 3535: 49 m²
   X 1549, Y 3655: 49 m²
   X 2348, Y 2933: 48 m²
   X -3160, Y -141: 48 m²
   X 1497, Y 3599: 48 m²
   X 1433, Y 3611: 48 m²
   X -4342, Y -364: 47 m²
   X 1556, Y 3663: 47 m²
   X 1587, Y 3659: 47 m²
   X 1564, Y 3766: 47 m²
   X 2298, Y 3263: 46 m²
   X -1251, Y -309: 46 m²
   X -1243, Y -411: 46 m²
   X 1582, Y 3651: 46 m²
   X 1574, Y 3596: 46 m²
   X 1524, Y 3639: 46 m²
SONDA TAMANOS OK
```

### 2. herramientas/sonda_hueco.py -301 -262 70 — OK

```
planta (8, [[1262, -335, -206, 0, 10], [1302, -355, -263, 0, 17], [3251, -363, -229, 0, 11], [3665, -304, -246, 0, 8], [3671, -282, -236, 0, 8], [4125, -241, -256, 0, 4], [4126, -245, -247, 0, 4], [4594, -332, -304, 0, 20]])
pintados (8, [[-335, -206, 'Casa de los Marqueses de Torrehermosa', 8], [-355, -263, '', 11], [-363, -229, '', 15], [-304, -246, 'Teatro Leal', 15], [-282, -236, '', 8], [-241, -256, '', 11], [-245, -247, '', 8], [-330, -303, '', 15]])
quitados (0, [])
calles (10, [[39, 'Nuñez de la Peña', 'pedestrian', 6], [75, 'Calle Obispo Rey Redondo', 'pedestrian', 6], [568, 'Calle Alcalde Alonso Suárez Melián', 'pedestrian', 6], [750, 'Calle Núñez de la Peña', 'pedestrian', 6], [828, 'Calle Rodriguez Moure', 'residential', 7.2], [2189, 'Calle Alcalde Alonso Suárez Melián', 'pedestrian', 6], [2940, 'Calle San Agustín', 'pedestrian', 6], [2941, 'Calle Obispo Rey Redondo', 'pedestrian', 6], [2942, 'Calle Núñez de la Peña', 'pedestrian', 6], [3510, 'Plaza de la Concepción', 'pedestrian', 6]])
areas (6, [[344, 'garden', '', -386, -274], [345, 'garden', '', -382, -283], [548, 'park', 'Plaza Guillermo Rancés', -264, -337], [817, 'garden', '', -216, -256], [880, 'garden', '', -242, -230], [889, 'garden', '', -323, -320]])
vaciadas 237
SONDA HUECO OK
```

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 40, 'peor': 184, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco.jpg, sonda_tamanos.txt
