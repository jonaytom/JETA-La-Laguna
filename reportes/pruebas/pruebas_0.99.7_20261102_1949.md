# Pruebas 0.99.7 — 2026-11-02 19:49 — 7/8 OK

Listas: v0997e. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 148 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0996.py` | **OK** | 0 s |
| 2 | `prueba_0996b.py` | **OK** | 66 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 34 s |
| 4 | `prueba_recorte.py` | **OK** | 2 s |
| 5 | `prueba_0995.py` | **OK** | 0 s |
| 6 | `prueba_078.py` | **OK** | 20 s |
| 7 | `prueba_082.py` | **FALLA** | 1 s |
| 8 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_0996.py — OK

```
paso 564 hundido 4.29 m, pendiente máx 0.097 cruces (vía, x, z, hueco m): [[2023, 639, -1154, 6.4]]
paso 658 hundido 2.38 m, pendiente máx 0.191 cruces (vía, x, z, hueco m): [[2021, 631, 592, 6.4]]
paso 892 hundido 5.68 m, pendiente máx 0.121 cruces (vía, x, z, hueco m): [[2331, 1504, 2767, 6.4], [2464, 1492, 2778, 6.4]]
paso 911 hundido 3.01 m, pendiente máx 0.199 cruces (vía, x, z, hueco m): [[1293, 1831, 3131, 6.58], [2464, 1818, 3144, 6.58]]
paso 919 hundido 2.9 m, pendiente máx 0.173 cruces (vía, x, z, hueco m): [[1293, 1799, 3095, 6.65], [2464, 1786, 3107, 6.6]]
paso 1082 hundido 5.49 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): [[3098, 2208, 3277, 6.43]]
paso 1666 hundido 7.03 m, pendiente máx 0.132 cruces (vía, x, z, hueco m): [[1516, 1112, 2486, 7.53], [3373, 1118, 2477, 7.51]]
paso 1973 hundido 6.33 m, pendiente máx 0.144 cruces (vía, x, z, hueco m): []
paso 2706 hundido 5.36 m, pendiente máx 0.108 cruces (vía, x, z, hueco m): []
paso 3021 hundido 5.51 m, pendiente máx 0.076 cruces (vía, x, z, hueco m): []
paso 3396 hundido 5.36 m, pendiente máx 0.082 cruces (vía, x, z, hueco m): []
paso 3631 hundido 5.43 m, pendiente máx 0.161 cruces (vía, x, z, hueco m): [[1774, -342, 803, 6.4]]
paso 3662 hundido 2.38 m, pendiente máx 0.215 cruces (vía, x, z, hueco m): []
paso 3706 hundido 6.04 m, pendiente máx 0.136 cruces (vía, x, z, hueco m): [[2310, 1497, 1720, 6.4], [2311, 1474, 1695, 6.38]]
paso 5096 hundido 5.36 m, pendiente máx 0.267 cruces (vía, x, z, hueco m): []
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 17 OK
errores []
PRUEBA 0996 OK
```

### 2. prueba_0996b.py — OK

```
foto v0996_bk_mate_360 {'drawn': 6, 'strip': 7360, 'hang': False}
foto v0996_bk_mate_360_aro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_molino {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_espaldas_aro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_piernas {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_tiro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_robo {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_rebote_tapon {'drawn': 6, 'strip': 7360, 'hang': True}
jugadores (semilla, tamaño) [['EL CHOPA', 4822, 1.02], ['COCO', 791, 1.03], ['EL BLANCO', 511, 1.02], ['EL MÁS ALTO', 9810, 1.06], ['EL PIBE', 8027, 0.93], ['RIVAL 3', 7431, 1.01]]
ANIMACIONES NUEVAS Y ASPECTOS DISTINTOS OK
errores []
PRUEBA 0996B OK
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 4. prueba_recorte.py — OK

```
recortados 3826 de 6521 · siguen metidos ≥ 1 m: 121
   [1, 230, 4.9, '']
   [539, 1171, 4.9, 'Edificio Beneharo']
   [241, 771, 4.2, '']
   [1424, 3934, 3.3, '']
   [-938, 1479, 3.3, '']
   [-2730, -287, 3.3, '']
   [-1799, -757, 3.2, '']
   [-1895, 1369, 3, '']
   [664, 1528, 3, '']
   [3334, 1991, 3, '']
   [-4699, 92, 2.8, '']
   [1506, 2926, 2.7, '']
   [1729, 3787, 2.6, 'Mercadona']
   [-115, 1263, 2.6, '']
   [547, 1406, 2.6, '']
   [1967, 1409, 2.6, 'Portal 3']
   [-187, 709, 2.6, '']
   [-3414, -424, 2.6, '']
   [3179, 2047, 2.6, '']
   [-1118, 1754, 2.5, '']
   [-882, -445, 2.5, '']
   [847, 1669, 2.5, '']
   [-3537, -193, 2.5, '']
   [3275, 2044, 2.5, '']
   [686, 1684, 2.4, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 5. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9032
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o4_148m', 'aL_o2_86', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 110 tramos, 8412 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 6. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.29562767048697, "z": 428.90183356307745, "len": 22.3, "ancho": 2.6, "y": -35.1}, {"name": "", "x": 377.5, "z": 421.5, "len": 2.2, "ancho": 2.6, "y": -27.8}, {"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": 276.7144844253363, "z": 1056.846389405589, "len": 24.3, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 269.04459734005036, "z": 1068.1464831919398, "len": 3, "ancho": 2.6, "y": -40.8}, {"name": "", "x": 482.869665628627, "z": 1258.176235529049, "len": 16.7, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 497.5, "z": 1242.25, "len": 8.2, "ancho": 2.6, "y": -66.1}, {"name": "", "x": 503.7623791729359, "z": 1235.0024721287557, "len": 11, "ancho": 2.6, "y": -66.6}, {"name": "", "x": 285.149754297432, "z": 1000.1472132404833, "len": 19.3, "ancho": 2.6, "y": -42.9}, {"name": "", "x": 237.89804497056622, "z": 1052.1529325441506, "len": 18.4, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 268.5, "z": 1005, "len": 27.5, "ancho": 2.6, "y": -42.3}, {"name": "", "x": 253.67107742897838, "z": 1026.4671212043431, "len": 2, "ancho": 2.
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -0.72), ([-184, -19], True, -3.92, True, -0.82), ([-188, -9], True, -3.92, True, -0.82), ([-217.5, 58.5], True, -3.81, False, 4.47)]
patio {'x': -179, 'z': -30, 'r': 6.3, 'yU': 1.33, 'yL': -4.02, 'escaleras': 2, 'peldanos': 30, 'galeria_baja': 91.9, 'salida': [-217, 59]} bajada maxima entre puntos 0.77 llega abajo True
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
foto v0781_juego_cerca
foto v0781_patio_desde_rellano
foto v0781_patio_desde_abajo
foto v0781_escalera_abajo
foto v0781_galeria_baja
foto v0781_galeria_hacia_juego
errores []
PRUEBA 078 OK
```

### 7. prueba_082.py — FALLA

```
juguetería {'hay': True, 'tienda': 'Juguetes Sabelotodo', 'opcion': 0, 'abre': True}
foto v082_titulo
vista a los 9 s demo
foto v082_demo
foto v082_records
moneda {'creditos': 1, 'modo': 'play', 'fase': 'select', 'elegido': 1}
foto v082_elegir
guerrero {'heroe': 'pastor', 'fase': 'intro'}
TIENDA OK
controles {'anda': 39, 'alto': 37, 'corre': 'run', 'pelea': True, 'combo': {'vida': 3, 'max': 8, 'estado': 'fall'}}
foto v082_pelea
magia {'estado': 'magic', 'zurrones': 0, 'tocados': 2, 'enemigos': 2}
foto v082_magia
lagarto {'monta': True, 'cola': 'bite', 'mordisco': True, 'salto': 'whip', 'avanza': 40}
golpes nuevos {'patada': 'dash', 'alto_patada': 16, 'flip': {'estado': 'flip', 'alto': 24, 'detras': True, 'tumbado': True, 'dano': 4}}
foto v082_lagarto
CONTROLES OK
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
foto v082_fase6
foto v082_fase7
recorrido [{'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 98, 'puntos': 10430}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 90, 'puntos': 11580}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 132, 'puntos': 14490}, {'estado': {'p': [168, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 127, 'puntos': 13890}, {'estado': {'p': [8, 15, 'walk', -1, 0], 'lock': 3, 'E': [['GM', 'windup', 10, 27, 13, True, True, 0, -1], ['W', 'atk', 8, 98, 16, False, True, 0, -1], ['GO', 'idle', 8, -12, 14, True, False, 0, 1]], 'teclas': ['vL']}, 'fase': 5, 'heroe': 'mirla', 'avance': 0.72, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 4480}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 144, 'puntos': 16390}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 209, 'puntos': 33500}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 8. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 33, 'peor': 52, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v0996_bk_espaldas_aro.jpg, v0996_bk_mate_360.jpg, v0996_bk_mate_360_aro.jpg, v0996_bk_molino.jpg, v0996_bk_piernas.jpg, v0996_bk_rebote_tapon.jpg, v0996_bk_robo.jpg, v0996_bk_tiro.jpg
