# Pruebas 0.77.0 — 2026-10-19 14:45 — 9/9 OK

Listas: v078i, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 209 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_conduccion.py p:-495,683 p:2210,3312 p:377,-268 p:820,3494` | **OK** | 60 s |
| 2 | `herramientas/sonda_perfil.py 769 3493 836 3499` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `audit_cruces.py` | **OK** | 0 s |
| 5 | `audit_hundimiento.py` | **OK** | 0 s |
| 6 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 97 s |
| 7 | `prueba_bordes.py` | **OK** | 6 s |
| 8 | `prueba_parking_cristo.py` | **OK** | 0 s |
| 9 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_conduccion.py p:-495,683 p:2210,3312 p:377,-268 p:820,3494 — OK

```
== {"off": 0, "dy": 0.2, "col": false, "low": false, "ri": 2690, "t": 12, "name": "", "L": 89, "done": true, "left": 0, "time": 0, "x": -459, "z": 687, "y": 3.6, "salto": [0.13, -459, 687]}
   ruta [[-459, 688], [-458, 680], [-492, 673], [-493, 673], [-495, 683], [-459, 688]]
== {"off": 0.1, "dy": 0.2, "col": false, "low": true, "ri": 2704, "t": 12, "name": "", "L": 36, "done": true, "left": 6, "time": 3.3, "x": -505, "z": 663, "y": -0.8, "salto": [0.44, -506, 678]}
   ruta [[-495, 683], [-507, 681], [-503, 658]]
== {"off": 0.4, "dy": 0.2, "col": false, "low": true, "ri": 1083, "t": 12, "name": "", "L": 31, "done": true, "left": 6, "time": 2.7, "x": 2205, "z": 3293, "y": -230.8, "salto": [0.2, 2209, 3312]}
   ruta [[2210, 3313], [2207, 3311], [2204, 3309], [2201, 3306], [2201, 3302], [2202, 3298], [2205, 3294], [2208, 3288]]
== {"off": 1, "dy": -1.9, "col": false, "low": true, "ri": 3098, "t": 12, "name": "", "L": 135, "done": false, "left": 40, "time": 11.9, "x": 2210, "z": 3310, "y": -227.3, "salto": [1.92, 2210, 3312]}
   ruta [[2184, 3386], [2186, 3367], [2189, 3357], [2190, 3353], [2192, 3348], [2194, 3344], [2196, 3340], [2199, 3337], [2201, 3333], [2203, 3329], [2205, 3324], [2206, 3321]]
    [0, 2184, 3385, -223.6, 0.2, 1, 0, 0]
    [1, 2184, 3382, -223.6, 6.3, 1, 0, 0]
    [2, 2185, 3373, -223.6, 12.1, 2, 0, 0]
    [3, 2188, 3360, -223.7, 13.1, 4, 0, 0]
    [4, 2192, 3348, -223.9, 13.1, 6, 0, 0]
    [5, 2198, 3337, -224.4, 13, 9, 0, 0]
    [6, 2204, 3325, -224.8, 13.1, 12, 0, 0]
    [7, 2209, 3313, -225.2, 13, 15, 0, 0]
    [8, 2210, 3310, -227.2, 0.5, 16, 0, 1]
    [9, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [10, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [11, 2210, 3310, -227.2, 0.2, 16, 0, 1]
== {"off": 0, "dy": 0.2, "col": false, "low": false, "ri": 2576, "t": 3, "name": "Vía de Ronda de La Laguna", "L": 265, "done": false, "left": 216, "time": 28.9, "x": 377, "z": -268, "y": 1.9, "salto": [0.4, 376, -267]}
   ruta [[400, -293], [368, -258], [332, -222], [319, -205], [308, -188], [301, -170], [299, -158], [298, -142], [305, -65]]
    [17, 377, -268, 2.2, 0.3, 1, 0, 0]
    [18, 375, -266, 1.6, 6, 1, 0, 0]
    [19, 376, -267, 1.7, 4, 1, 0, 0]
    [20, 377, -268, 2.2, 2.5, 1, 0, 0]
    [21, 377, -268, 2.2, 1, 1, 0, 0]
    [22, 377, -268, 2.2, 0.9, 1, 0, 0]
    [23, 376, -266, 1.7, 4.9, 1, 0, 0]
    [24, 376, -267, 2.1, 3.2, 1, 0, 0]
    [25, 377, -268, 1.9, 0.6, 1, 0, 0]
    [26, 377, -269, 2, 0, 1, 0, 0]
    [27, 377, -268, 1.9, 0, 1, 0, 0]
    [28, 377, -268, 1.9, 0, 1, 0, 0]
== {"off": 0, "dy": 0.2, "col": false, "low": false, "ri": 1232, "t": 7, "name": "Travesía Enlace Andenes Sobradillo", "L": 69, "done": false, "left": 17, "time": 28.6, "x": 820, "z": 3494, "y": -118.7, "salto": [0.65, 821, 3495]}
   ruta [[769, 3493], [778, 3490], [786, 3488], [794, 3488], [803, 3490], [811, 3491], [831, 3498], [836, 3499]]
    [17, 821, 3495, -118.5, 1.9, 6, 0, 0]
    [18, 821, 3495, -118.5, 1.3, 6, 0, 0]
    [19, 820, 3495, -118.5, 0.5, 6, 0, 0]
    [20, 820, 3495, -118.8, 0.3, 6, 0, 0]
    [21, 823, 3496, -119.1, 6, 6, 0, 0]
    [22, 823, 3495, -119, 5.2, 6, 0, 0]
    [23, 822, 3495, -119, 4.4, 6, 0, 0]
    [24, 822, 3495, -118.6, 3.7, 6, 0, 0]
    [25, 820, 3494, -118.7, 0, 6, 0, 0]
    [26, 820, 3494, -118.7, 0, 6, 0, 0]
    [27, 820, 3494, -118.7, 0, 6, 0, 0]
    [28, 820, 3494, -118.7, 0, 6, 0, 0]
== {"off": 0.3, "dy": 0.2, "col": false, "low": false, "ri": 1233, "t": 7, "name": "Avenida Ghandi", "L": 77, "done": true, "left": 6, "time": 6.5, "x": 831, "z": 3497, "y": -119.6, "salto": [0.38, 810, 3487]}
   ruta [[764, 3477], [776, 3477], [786, 3478], [795, 3481], [831, 3496], [836, 3499]]
```

### 2. herramientas/sonda_perfil.py 769 3493 836 3499 — OK

```
muestras 136 escalones >0,3 m: [[42.4, -118.87, -117.83, None, 0.89], [52.3, -119.5, -118.44, None, 0.55], [53.3, -119.56, None, None, -0.99]]
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
   [45.8, -119.09, -118.2, None, -0.06]
   [47.8, -119.21, -118.42, None, -0.06]
   [49.8, -119.34, -118.71, None, -0.07]
   [51.8, -119.46, -119, None, -0.07]
   [53.8, -119.59, None, None, -0.03]
   [55.8, -119.69, None, None, -0.02]
   [57.8, -119.79, None, None, -0.02]
   [59.8, -119.89, None, None, -0.02]
   [61.8, -119.99, None, None, -0.02]
   [63.8, -120.09, None, None, -0.02]
   [65.8, -120.19, None, None, -0.02]
```

### 3. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 4. audit_cruces.py — OK

```
conflicts 24
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('service', 'service', 0, 2), 1)]
```

### 5. audit_hundimiento.py — OK

```
{"muestras":6396,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 6. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.5
{"frame":558,"calls":1891,"triangles":4705482,"points":0,"lines":0} calls:1891
roads 112
failed 0 of 112 · conocidos 0
CONDUCCION OK
```

### 7. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[-179,270],"borde":1078,"calle":2.4,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":0}
```

### 8. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 9. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_8.jpg
