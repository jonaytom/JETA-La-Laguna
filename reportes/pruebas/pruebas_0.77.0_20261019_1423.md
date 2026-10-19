# Pruebas 0.77.0 — 2026-10-19 14:23 — 3/4 OK

Listas: v078d. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 123 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_078.py` | **FALLA** | 69 s |
| 2 | `herramientas/sonda_conduccion.py` | **OK** | 3 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 29 s |
| 4 | `herramientas/foto_desde_arriba.py vistas078b.json` | **OK** | 5 s |

## Detalle

### 1. prueba_078.py — FALLA

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6}, {"name": "Pasaje Aguere", "x": -201.51006941069437, "z": 21.912870685487142, "len": 67.5, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -182.69088278920657, "z": -21.8636938986106, "len": 6.3, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220
andando [{'a': [-177, -60], 'llega': False, 'cerca': [['seg', -172.7, -64.3, -145.7, -109.6]], 'falta': 7.4, 'y': 2.8, 'donde': [-173.3, -66.2], 'delante': []}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 1.1, 'y': 2.5, 'donde': [-168.9, -54.6], 'delante': None}, {'a': [-184, -19], 'llega': True, 'cerca': None, 'falta': 1.1, 'y': 0.7, 'donde': [-183.7, -20.1], 'delante': None}, {'a': [-188, -9], 'llega': True, 'cerca': None, 'falta': 1.2, 'y': 0.1, 'donde': [-187.6, -10.1], 'delante': None}, {'a': [-218, 58], 'llega': False, 'cerca': [['seg', -216.6, 52.1, -189.6, -9.7]], 'falta': 17.9, 'y': -3, 'donde': [-210.8, 41.7], 'delante': []}]
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
errores []
PRUEBA 078 FALLA
```

### 2. herramientas/sonda_conduccion.py — OK

```
    [1, 253, 1380, -46.7, 5.7, 1, 0, 0]
    [2, 246, 1375, -46, 11, 1, 0, 0]
    [3, 237, 1366, -45.2, 13.4, 1, 0, 0]
    [4, 227, 1356, -44.2, 13.9, 1, 0, 0]
    [5, 217, 1346, -43.2, 14.4, 2, 0, 0]
    [6, 207, 1336, -42.2, 14.9, 2, 0, 0]
    [7, 197, 1324, -41.3, 15.4, 2, 0, 0]
    [8, 187, 1313, -40.5, 15.9, 2, 0, 0]
    [9, 176, 1301, -39.6, 16.3, 2, 0, 0]
    [10, 164, 1289, -38.9, 16.8, 2, 0, 0]
    [11, 153, 1276, -38.2, 17.3, 2, 0, 0]
    [12, 141, 1263, -37.5, 17.8, 2, 0, 0]
    [13, 129, 1250, -37, 18.4, 2, 0, 0]
    [14, 116, 1236, -36.4, 18.8, 3, 0, 0]
    [15, 103, 1222, -35.8, 19.3, 3, 0, 0]
    [16, 90, 1208, -35.2, 19.8, 3, 0, 0]
    [17, 77, 1193, -34.6, 20.2, 3, 0, 0]
    [18, 63, 1178, -33.9, 20.5, 3, 0, 0]
    [19, 49, 1162, -33.2, 20.9, 3, 0, 0]
    [20, 35, 1147, -32.4, 21.2, 3, 0, 0]
    [21, 21, 1131, -31.6, 21.5, 3, 0, 0]
    [22, 7, 1115, -30.8, 21.8, 3, 0, 0]
    [23, -8, 1098, -30.1, 22.1, 3, 0, 0]
    [24, -23, 1082, -29.4, 22.4, 4, 0, 0]
    [25, -38, 1065, -28.6, 22.7, 4, 0, 0]
    [26, -53, 1048, -27.8, 22.9, 4, 0, 0]
    [27, -68, 1030, -26.9, 23.2, 4, 0, 0]
    [28, -83, 1013, -25.8, 23.3, 4, 0, 0]
    [29, -99, 995, -24.6, 23.4, 5, 0, 0]
    [30, -114, 977, -23.2, 23.4, 5, 0, 0]
    [31, -129, 959, -21.7, 23.5, 5, 0, 0]
    [32, -144, 942, -20.2, 23.4, 5, 0, 0]
    [33, -159, 924, -18.7, 23.5, 5, 0, 0]
    [34, -174, 906, -17.4, 23.5, 5, 0, 0]
    [35, -190, 888, -16.2, 23.6, 5, 0, 0]
    [36, -205, 870, -15.1, 23.8, 5, 0, 0]
    [37, -220, 852, -14.3, 24, 5, 0, 0]
    [38, -236, 833, -13.5, 24.2, 5, 0, 0]
    [39, -252, 815, -13.1, 24.5, 5, 0, 1]
    [40, -268, 796, -14.7, 25.4, 5, 0, 1]
== {"off": 0, "dy": 0.2, "col": false, "low": true, "ri": 2295, "t": 0, "name": "Autopista del Norte", "L": 323, "done": true, "left": 5, "time": 17.1, "x": -385, "z": 679, "y": -7.5}
   ruta [[-600, 445], [-503, 548], [-381, 683]]
    [0, -600, 445, 4.2, 0.2, 1, 0, 0]
    [1, -598, 448, 4.1, 6.4, 1, 0, 0]
    [2, -591, 455, 3.9, 12.4, 1, 0, 0]
    [3, -582, 464, 3.6, 14.3, 1, 0, 0]
    [4, -572, 475, 3.3, 15.5, 1, 0, 0]
    [5, -561, 487, 2.9, 16.6, 1, 0, 0]
    [6, -549, 499, 2.7, 17.5, 1, 0, 0]
    [7, -537, 512, 2.4, 18.5, 1, 0, 0]
    [8, -524, 526, 2.2, 19.3, 1, 0, 0]
    [9, -510, 540, 2.1, 20.1, 1, 0, 0]
    [10, -496, 555, 2, 20.8, 2, 0, 0]
    [11, -482, 571, 1.8, 21.5, 2, 0, 0]
    [12, -467, 587, 1.6, 22.2, 2, 0, 0]
    [13, -452, 604, 1.3, 22.9, 2, 0, 0]
    [14, -437, 621, 0.8, 23.6, 2, 0, 0]
    [15, -421, 639, 0.1, 24.4, 2, 0, 0]
    [16, -404, 658, -2.9, 25.7, 2, 0, 1]
    [17, -386, 677, -7.2, 27.4, 2, 0, 1]
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 5.2, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 543, 'z': -908, 'y': -0.3}
snap df_308
CONOCIDO {'off': 1, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 108, 'time': 6.8, 'x': 1220, 'z': 2532, 'y': -123.6}
snap df_1667
failed 0 of 112 · conocidos 2
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 543 Z -908, Camino La Hornera X 1220 Z 2532
CONDUCCION OK
```

### 4. herramientas/foto_desde_arriba.py vistas078b.json — OK

```

```

Fotos/archivos nuevos en `tests/shots/`: ab_0.jpg, ab_1.jpg, ab_2.jpg, ab_3.jpg, ab_4.jpg, ab_5.jpg, ab_6.jpg, ab_7.jpg, conduccion.json, df_1667.jpg, df_308.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
