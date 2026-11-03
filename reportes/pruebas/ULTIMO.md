# Pruebas 1.1.1 — 2026-11-03 22:36 — 6/6 OK

Listas: v1101a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 102 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 7 s |
| 2 | `prueba_carpeta.py` | **OK** | 61 s |
| 3 | `herramientas/sonda_hueco.py -932 -249 40` | **OK** | 10 s |
| 4 | `herramientas/sonda_hueco.py -259 47 40` | **OK** | 2 s |
| 5 | `herramientas/sonda_hueco.py 498 -493 40` | **OK** | 1 s |
| 6 | `herramientas/sonda_tamanos.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 32, 'peor': 126, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_carpeta.py — OK

```
carpeta {'datos': True, 'calles': 5571, 'edificios': 9318, 'version': 'Alpha 1.1.1'}
errores []
CARPETA OK
```

### 3. herramientas/sonda_hueco.py -932 -249 40 — OK

```
planta (5, [[1219, -929, -270, 2, 10], [5873, -924, -278, 0, 4], [5874, -929, -280, 0, 4], [5875, -917, -286, 1, 4], [5903, -935, -288, 1, 4]])
pintados (5, [[-929, -269, '', 10], [-924, -278, '', 8], [-929, -280, '', 4], [-917, -286, '', 10], [-935, -288, '', 10]])
quitados (0, [])
calles (3, [[33, 'Calle Juana La Blanca', 'tertiary', 10.4], [2215, 'Calle Leonardo da Vinci', 'residential', 8], [2224, 'Calle los Sabandeños', 'residential', 8]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

### 4. herramientas/sonda_hueco.py -259 47 40 — OK

```
planta (3, [[914, -284, 20, 0, 9], [3662, -268, 37, 4, 5], [3876, -232, 33, 0, 16]])
pintados (3, [[-284, 20, '', 4], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-232, 33, '', 11]])
quitados (0, [])
calles (5, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4], [781, 'Calle Hermano Mateo', 'residential', 7.5]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

### 5. herramientas/sonda_hueco.py 498 -493 40 — OK

```
planta (1, [[1825, 481, -484, 1, 4]])
pintados (1, [[481, -484, '', 4]])
quitados (0, [])
calles (3, [[1361, 'Vía de Ronda de La Laguna', 'primary', 13], [1446, 'Camino Invierno', 'residential', 8], [2898, 'Calle Pintor José Aguiar', 'residential', 7.3]])
areas (0, [])
vaciadas 0
SONDA HUECO OK
```

### 6. herramientas/sonda_tamanos.py — OK

```
gente (altura m): caja {'n': 2, 'min': 1.81, 'med': 1.91, 'max': 1.91} · por la cabeza {'n': 2, 'min': 1.63, 'med': 1.74, 'max': 1.74} · jugador 1.66 · real: 1,60–1,85
coches (m): largo {'n': 6, 'min': 4.14, 'med': 4.7, 'max': 11.5} · ancho {'n': 6, 'min': 1.76, 'med': 1.9, 'max': 2.5} · alto {'n': 6, 'min': 1.25, 'med': 1.85, 'max': 3.1} · real: un turismo 4,0–4,6 × 1,75–1,85 × 1,45–1,55
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
calles estrechadas al hueco entre edificios: 251 · edificios recortados 4032 · quitados (solo quedaba una tira) 0
edificios quitados por superficie original (m²): {}
SONDA TAMANOS OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco_-259_47.jpg, hueco_-259_47_calle0.jpg, hueco_-259_47_calle1.jpg, hueco_-932_-249.jpg, hueco_-932_-249_calle0.jpg, hueco_-932_-249_calle1.jpg, hueco_498_-493.jpg, hueco_498_-493_calle0.jpg, hueco_498_-493_calle1.jpg, sonda_tamanos.txt
