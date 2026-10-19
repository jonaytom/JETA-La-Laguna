# Pruebas 0.77.0 — 2026-10-19 15:00 — 9/10 OK

Listas: v078l, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 227 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_conduccion.py p:2210,3312 p:377,-268 p:820,3494 3521` | **OK** | 62 s |
| 2 | `herramientas/sonda_perfil.py 769 3493 836 3499` | **OK** | 0 s |
| 3 | `herramientas/sonda_perfil.py 400 -293 360 -250` | **OK** | 0 s |
| 4 | `audit_obstaculos.py` | **OK** | 0 s |
| 5 | `audit_cruces.py` | **OK** | 0 s |
| 6 | `audit_hundimiento.py` | **OK** | 0 s |
| 7 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 112 s |
| 8 | `prueba_bordes.py` | **OK** | 0 s |
| 9 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 10 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_conduccion.py p:2210,3312 p:377,-268 p:820,3494 3521 — OK

```
== {"off": 0.1, "dy": 0.2, "col": false, "low": true, "ri": 1083, "t": 12, "name": "", "L": 31, "done": true, "left": 6, "time": 2.7, "x": 2205, "z": 3293, "y": -230.8, "salto": [0.21, 2209, 3312]}
   ruta [[2210, 3313], [2207, 3311], [2204, 3309], [2201, 3306], [2201, 3302], [2202, 3298], [2205, 3294], [2208, 3288]]
== {"off": 1, "dy": -1.9, "col": false, "low": true, "ri": 3098, "t": 12, "name": "", "L": 135, "done": false, "left": 40, "time": 11.9, "x": 2210, "z": 3310, "y": -227.3, "salto": [1.92, 2210, 3312]}
   ruta [[2184, 3386], [2186, 3367], [2189, 3357], [2190, 3353], [2192, 3348], [2194, 3344], [2196, 3340], [2199, 3337], [2201, 3333], [2203, 3329], [2205, 3324], [2206, 3321]]
    [0, 2184, 3385, -223.6, 0.2, 1, 0, 0]
    [1, 2184, 3382, -223.6, 6.3, 1, 0, 0]
    [2, 2185, 3373, -223.6, 12.1, 2, 0, 0]
    [3, 2188, 3360, -223.7, 13, 4, 0, 0]
    [4, 2192, 3348, -223.9, 13, 6, 0, 0]
    [5, 2198, 3337, -224.4, 13.1, 9, 0, 0]
    [6, 2204, 3325, -224.8, 13, 12, 0, 0]
    [7, 2209, 3313, -225.2, 13.1, 15, 0, 0]
    [8, 2210, 3310, -227.2, 0.5, 16, 0, 1]
    [9, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [10, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [11, 2210, 3310, -227.2, 0.2, 16, 0, 1]
== {"off": 0.1, "dy": 0.2, "col": false, "low": false, "ri": 2576, "t": 3, "name": "Vía de Ronda de La Laguna", "L": 265, "done": false, "left": 216, "time": 29.3, "x": 377, "z": -268, "y": 1.9, "salto": [0.59, 375, -266]}
   ruta [[400, -293], [368, -258], [332, -222], [319, -205], [308, -188], [301, -170], [299, -158], [298, -142], [305, -65]]
    [18, 377, -268, 2.1, 2.1, 2, 0, 0]
    [19, 377, -268, 2.1, 0.7, 2, 0, 0]
    [20, 377, -268, 2.1, 0.8, 2, 0, 0]
    [21, 375, -267, 1.6, 5, 2, 0, 0]
    [22, 376, -267, 2.1, 3.5, 2, 0, 0]
    [23, 377, -268, 2.1, 2.2, 2, 0, 0]
    [24, 377, -268, 2.1, 0.9, 2, 0, 0]
    [25, 377, -268, 2.1, 1.7, 2, 0, 0]
    [26, 377, -269, 1.9, 0, 2, 0, 0]
    [27, 377, -269, 1.9, 0, 2, 0, 0]
    [28, 377, -268, 1.9, 0, 2, 0, 0]
    [29, 377, -268, 1.9, 0, 2, 0, 0]
== {"off": 0.6, "dy": 0.2, "col": false, "low": false, "ri": 1232, "t": 7, "name": "Travesía Enlace Andenes Sobradillo", "L": 69, "done": true, "left": 6, "time": 8.6, "x": 831, "z": 3498, "y": -119.7, "salto": [0.4, 822, 3496]}
   ruta [[769, 3493], [778, 3490], [786, 3488], [794, 3488], [803, 3490], [811, 3491], [831, 3498], [836, 3499]]
== {"off": 0.2, "dy": 0.2, "col": false, "low": false, "ri": 1233, "t": 7, "name": "Avenida Ghandi", "L": 77, "done": true, "left": 6, "time": 6.7, "x": 831, "z": 3497, "y": -119.6, "salto": [0.35, 810, 3487]}
   ruta [[764, 3477], [776, 3477], [786, 3478], [795, 3481], [831, 3496], [836, 3499]]
== {"off": 0, "dy": 0.7, "col": false, "low": false, "ri": 3521, "t": 1, "name": "", "L": 52, "done": false, "left": 8, "time": 9.1, "x": 2133, "z": 3502, "y": -214.8, "salto": [0.43, 2132, 3502]}
   ruta [[2105, 3469], [2138, 3509]]
    [0, 2105, 3469, -211.9, 0.2, 1, 0, 0]
    [1, 2107, 3472, -212, 6.6, 1, 0, 0]
    [2, 2113, 3479, -212.4, 12.6, 1, 0, 0]
    [3, 2122, 3489, -212.8, 13, 1, 0, 0]
    [4, 2130, 3499, -214.3, 13, 1, 0, 0]
    [5, 2133, 3502, -214.8, 2.5, 1, 0, 0]
    [6, 2133, 3502, -214.8, 0, 1, 0, 0]
    [7, 2133, 3502, -214.8, 0, 1, 0, 0]
    [8, 2133, 3502, -214.8, 0, 1, 0, 0]
    [9, 2133, 3502, -214.8, 0, 1, 0, 0]
```

### 2. herramientas/sonda_perfil.py 769 3493 836 3499 — OK

```
tableros en el camino: {"1232": {"desde_m": 43, "nombre": "Travesía Enlace Andenes Sobradillo", "tipo": 7, "flags": 1, "elevada": true, "extremos": [[769, 3493], [836, 3499]]}}
muestras 136 escalones >0,3 m: [[42.4, -118.87, -117.83, None, 0.89], [52.3, -119.5, -118.56, None, 0.45], [53.3, -119.56, None, None, -0.88]]
   [0, -116.23, None, None, 0]
   [2, -116.37, None, None, -0.03]
   [4, -116.5, None, None, -0.03]
   [6, -116.63, None, None, -0.03]
   [8, -116.76, None, None, -0.03]
   [10, -116.87, None, None, -0.03]
   [12, -116.99, None, None, -0.03]
   [14, -117.11, None, None, -0.03]
   [15.9, -117.24, None, None, -0.03]
   [17.9, -117.36, None, None, -0.03]
   [19.9, -117.48, None, None, -0.03]
   [21.9, -117.6, None, None, -0.03]
   [23.9, -117.73, None, None, -0.03]
   [25.9, -117.85, None, None, -0.03]
   [27.9, -117.97, None, None, -0.03]
   [29.9, -118.1, None, None, -0.03]
   [31.9, -118.22, None, None, -0.03]
   [33.9, -118.34, None, None, -0.03]
   [35.9, -118.46, None, None, -0.03]
   [37.9, -118.59, None, None, -0.03]
   [39.9, -118.72, None, None, -0.03]
   [41.9, -118.84, None, None, -0.03]
   [43.8, -118.96, -117.97, None, -0.05]
   [45.8, -119.09, -118.25, None, -0.07]
   [47.8, -119.21, -118.53, None, -0.07]
   [49.8, -119.34, -118.77, None, -0.06]
   [51.8, -119.46, -119.01, None, -0.06]
   [53.8, -119.59, None, None, -0.03]
   [55.8, -119.69, None, None, -0.02]
   [57.8, -119.79, None, None, -0.02]
   [59.8, -119.89, None, None, -0.02]
   [61.8, -119.99, None, None, -0.02]
   [63.8, -120.09, None, None, -0.02]
   [65.8, -120.19, None, None, -0.02]
```

### 3. herramientas/sonda_perfil.py 400 -293 360 -250 — OK

```
tableros en el camino: {"1615": {"desde_m": 0, "nombre": "", "tipo": 4, "flags": 1, "elevada": true, "extremos": [[441, -388], [400, -293]]}, "1616": {"desde_m": 0, "nombre": "", "tipo": 4, "flags": 1, "elevada": true, "extremos": [[400, -293], [453, -318]]}, "1618": {"desde_m": 0, "nombre": "Vía de Ronda de La Laguna", "tipo": 3, "flags": 0, "elevada": true, "extremos": [[437, -337], [400, -293]]}, "2576": {"desde_m": 0, "nombre": "Vía de Ronda de La Laguna", "tipo": 3, "flags": 0, "elevada": true, "extremos": [[400, -293], [305, -65]]}}
muestras 119 escalones >0,3 m: [[0, 4.66, 7.22, None, 2.44], [0.5, 4.61, 7.59, None, 0.37], [2.5, 4.43, 6.92, None, -0.67], [35.3, 1.51, 2.21, None, 0.49], [37.3, 1.34, None, None, -0.75]]
   [0, 4.66, 7.22, None, 2.44]
   [2, 4.48, 7.59, None, 0]
   [4, 4.3, 6.74, None, -0.06]
   [6, 4.12, 6.49, None, -0.08]
   [8, 3.94, 6.17, None, -0.08]
   [10, 3.76, 5.86, None, -0.08]
   [11.9, 3.58, 5.51, None, -0.09]
   [13.9, 3.42, 5.15, None, -0.09]
   [15.9, 3.26, 4.79, None, -0.09]
   [17.9, 3.09, 4.41, None, -0.09]
   [19.9, 2.91, 4.04, None, -0.09]
   [21.9, 2.73, 3.67, None, -0.09]
   [23.9, 2.55, 3.3, None, -0.09]
   [25.9, 2.37, 2.94, None, -0.08]
   [27.9, 2.19, 2.61, None, -0.08]
   [29.9, 2.01, 2.27, None, -0.08]
   [31.9, 1.83, 2.04, None, -0.05]
   [33.8, 1.65, 1.83, None, -0.05]
   [35.8, 1.47, 2.21, None, 0]
   [37.8, 1.3, None, None, -0.04]
   [39.8, 1.12, None, None, -0.05]
   [41.8, 0.92, None, None, -0.05]
   [43.8, 0.72, None, None, -0.05]
   [45.8, 0.52, None, None, -0.05]
   [47.8, 0.32, None, None, -0.05]
   [49.8, 0.12, None, None, -0.05]
   [51.8, -0.08, None, None, -0.05]
   [53.8, -0.28, None, None, -0.05]
   [55.7, -0.48, None, None, -0.05]
   [57.7, -0.68, None, None, -0.05]
```

### 4. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 5. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'footway', 0, 2), 1), (('service', 'service', 0, 2), 1)]
```

### 6. audit_hundimiento.py — OK

```
{"muestras":6396,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 7. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.5
{"frame":566,"calls":1882,"triangles":4712593,"points":0,"lines":0} calls:1882
roads 112
FAIL {'off': 0, 'dy': 0.7, 'col': False, 'low': False, 'ri': 3521, 't': 1, 'name': '', 'L': 52, 'done': False, 'left': 8, 'time': 9.1, 'x': 2133, 'z': 3502, 'y': -214.8}
snap df_3521
failed 1 of 112 · conocidos 0
CONDUCCION FALLA
```

### 8. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 9. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [145.2, -603.2], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -610]}
```

### 10. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_3521.jpg
