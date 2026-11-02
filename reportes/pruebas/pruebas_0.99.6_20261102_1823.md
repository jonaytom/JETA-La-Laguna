# Pruebas 0.99.6 — 2026-11-02 18:23 — 9/9 OK

Listas: v0996f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 107 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0996b.py` | **OK** | 67 s |
| 2 | `prueba_0994.py` | **OK** | 2 s |
| 3 | `prueba_baloncesto.py` | **OK** | 14 s |
| 4 | `prueba_082.py` | **OK** | 1 s |
| 5 | `prueba_0996.py` | **OK** | 0 s |
| 6 | `prueba_0995.py` | **OK** | 0 s |
| 7 | `prueba_0993.py` | **OK** | 1 s |
| 8 | `prueba_099.py` | **OK** | 2 s |
| 9 | `prueba_096.py` | **OK** | 0 s |

## Detalle

### 1. prueba_0996b.py — OK

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

### 2. prueba_0994.py — OK

```
foto v0994_basket {'ready': True, 'drawn': 6}
JUGADORES DEL PACK OK
errores []
PRUEBA 0994 OK
```

### 3. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'play', 'sc': [10, 2], 'clock': 1.733333333334322, 'golden': False}
resultado {"won":true,"score":[10,2]}
PARTIDO CPU OK
partido fácil 1 [11, 4]
partido fácil 2 [27, 0]
partido fácil 3 [17, 0]
equilibrio primer partido [55, 4] OK
jugadores dibujados 78
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"shotT":true,"shot":true},"mode":"air"}
foto basket_zoom
RATÓN OK
tras moverse 1
tras correr 2
tras pasar 3
tras recibir 4
tras tirar 5
tras combo 6
foto basket_tutorial
tutorial 99
TUTORIAL OK
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 4. prueba_082.py — OK

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
recorrido [{'estado': {'p': [259, 24, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 95, 'puntos': 10650}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 72, 'puntos': 11300}, {'estado': {'p': [127, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 91, 'puntos': 13720}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 134, 'puntos': 14020}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 103, 'puntos': 15230}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 152, 'puntos': 16180}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 183, 'puntos': 33350}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 5. prueba_0996.py — OK

```
paso 68 hundido 5.68 m, pendiente máx 0.105 cruces (vía, x, z, hueco m): [[1787, -927, 63, 6.4], [2288, -933, 71, 6.4], [2294, -926, 62, 6.4], [2460, -941, 83, 6.4], [2469, -946, 91, 6.4]]
paso 311 hundido 2.97 m, pendiente máx 0.146 cruces (vía, x, z, hueco m): [[1795, -1229, -11, 6.43], [2288, -1197, -30, 6.48], [2480, -1215, -20, 6.51]]
paso 363 hundido 5.41 m, pendiente máx 0.174 cruces (vía, x, z, hueco m): [[347, 2195, 3235, 6.4], [379, 2182, 3233, 6.4]]
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
paso 5101 hundido 6.42 m, pendiente máx 0.164 cruces (vía, x, z, hueco m): [[4807, -3083, -147, 6.49], [5133, -3033, -149, 6.47], [5134, -3027, -148, 6.41]]
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 21 OK
errores []
PRUEBA 0996 OK
```

### 6. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9437
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o4_148m', 'aL_o2_86', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 99 tramos, 7254 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 7. prueba_0993.py — OK

```
foto v0993_secuazas {'fem': 8, 'cnt': {'g_secuaz': 4, 'g_sec_lenadora': 2, 'g_sec_roja': 4, 'g_sec_oro': 1, 'mirla': 1, 'g_sec_vikinga': 1}}
SECUACES HEMBRA Y MIRLADORA DIBUJADAS OK
errores []
PRUEBA 0993 OK
```

### 8. prueba_099.py — OK

```
foto v099_guanche_0 {'fase': 'EL POBLADO DE TAORO', 'drawn': 1}
foto v099_guanche_1 {'fase': 'LA LAURISILVA DE ANAGA', 'drawn': 1}
foto v099_guanche_2 {'fase': 'EL BARRANCO DEL INFIERNO', 'drawn': 1}
foto v099_guanche_3 {'fase': 'LOS ACANTILADOS DE LOS GIGANTES', 'drawn': 1}
foto v099_guanche_4 {'fase': 'EL MALPAÍS DE GÜÍMAR', 'drawn': 1}
foto v099_guanche_5 {'fase': 'LAS CAÑADAS DEL TEIDE', 'drawn': 1}
foto v099_guanche_6 {'fase': 'DENTRO DEL ECHEYDE', 'drawn': 1}
foto v099_guayota {'calls': [['g_overlord', 0.8333333333333334], ['mirla', 0.8333333333333334]]}
GUAYOTA PIXEL A PIXEL OK
foto v099_bencomo_0 {'drawn': 1}
foto v099_bencomo_1 {'drawn': 1}
foto v099_bencomo_2 {'drawn': 1}
FONDOS GUANCHE OK
FONDOS BENCOMO OK
errores []
PRUEBA 099 OK
```

### 9. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg, v0993_secuazas.jpg, v0994_basket.jpg, v0996_bk_espaldas_aro.jpg, v0996_bk_mate_360.jpg, v0996_bk_mate_360_aro.jpg, v0996_bk_molino.jpg, v0996_bk_piernas.jpg, v0996_bk_rebote_tapon.jpg, v0996_bk_robo.jpg, v0996_bk_tiro.jpg, v099_bencomo_0.jpg, v099_bencomo_1.jpg, v099_bencomo_2.jpg, v099_guanche_0.jpg, v099_guanche_1.jpg, v099_guanche_2.jpg, v099_guanche_3.jpg, v099_guanche_4.jpg, v099_guanche_5.jpg, v099_guanche_6.jpg, v099_guayota.jpg
