# Pruebas 0.99.5 — 2026-10-27 21:50 — 7/8 OK

Listas: v0996. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 113 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0995.py` | **OK** | 0 s |
| 2 | `foto_vias2.py` | **OK** | 87 s |
| 3 | `prueba_099.py` | **OK** | 3 s |
| 4 | `prueba_0993.py` | **OK** | 1 s |
| 5 | `prueba_098.py` | **OK** | 1 s |
| 6 | `prueba_0952.py` | **OK** | 1 s |
| 7 | `prueba_082.py` | **FALLA** | 0 s |
| 8 | `prueba_096.py` | **OK** | 0 s |

## Detalle

### 1. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9442
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o2_86', 'aL_o4_148m', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 128 tramos, 9666 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 2. foto_vias2.py — OK

```
foto v2_00 386 -276
foto v2_01 281 201
foto v2_02 620 646
foto v2_03 737 890
foto v2_04 766 1223
foto v2_05 1083 2306
foto v2_06 1109 2405
foto v2_07 1574 2851
foto v2_08 1448 2831
foto v2_09 1534 2739
foto v2_10 1768 3142
foto v2_11 1775 3165
foto v2_12 -546 470
foto v2_13 -729 379
foto v2_14 1300 2560
errores []
PRUEBA VIAS2 OK
```

### 3. prueba_099.py — OK

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

### 4. prueba_0993.py — OK

```
foto v0993_secuazas {'fem': 4, 'cnt': {'g_secuaz': 8, 'g_sec_oro': 1, 'g_sec_roja': 1, 'g_sec_vikinga': 1, 'mirla': 1, 'g_sec_lenadora': 1}}
SECUACES HEMBRA Y MIRLADORA DIBUJADAS OK
errores []
PRUEBA 0993 OK
```

### 5. prueba_098.py — OK

```
fases ['EL POBLADO DE TAORO', 'LA LAURISILVA DE ANAGA', 'EL BARRANCO DEL INFIERNO', 'LOS ACANTILADOS DE LOS GIGANTES', 'EL MALPAÍS DE GÜÍMAR', 'LAS CAÑADAS DEL TEIDE', 'DENTRO DEL ECHEYDE']
foto v098_barranco {'g_rata': 2, 'g_gollux': 1, 'mirla': 1, 'g_lobo': 1}
foto v098_malpais {'g_gorgona1': 1, 'g_gorgona3': 1, 'mirla': 1, 'g_gorgona2': 1}
foto v098_echeyde {'g_guayota': 1, 'mirla': 1, 'g_overlord': 1}
FASES NUEVAS OK
HOJAS NUEVAS DIBUJADAS OK
errores []
PRUEBA 098 OK
```

### 6. prueba_0952.py — OK

```
campamento {'fase': 'camp', 'montado': False, 'dibujado': 1, 'cargadas': 5}
foto v0952_campamento
SE VE EN EL CAMPAMENTO OK
HOJAS CARGADAS AL ABRIR OK
foto v0953_bencomo_caballero
errores []
PRUEBA 0952 OK
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
recorrido [{'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 0.98, 'jefe': True, 'pasada': True, 'segundos': 106, 'puntos': 10520}, {'estado': {'p': [155, 26, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 0.98, 'jefe': True, 'pasada': True, 'segundos': 95, 'puntos': 11930}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'pastor', 'avance': 0.98, 'jefe': True, 'pasada': True, 'segundos': 136, 'puntos': 14130}, {'estado': {'p': [120, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mencey', 'avance': 0.98, 'jefe': True, 'pasada': True, 'segundos': 102, 'puntos': 13460}, {'estado': {'p': [259, 25, 'walk', 1, 0], 'lock': 1, 'E': [['GO', 'idle', 4, 276, 26, True, False, 0, -1]], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 0.98, 'jefe': True, 'pasada': False, 'segundos': 300, 'puntos': 15630}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'mencey', 'avance': 0.98, 'jefe': True, 'pasada': True, 'segundos': 113, 'puntos': 15590}, {'estado': {'p': [253, 19, 'idle', 1, 0], 'lock': 1, 'E': [['BY', 'windup', 5, 261, 19, True, True, 0, -1]], 'teclas': ['vL']}, 'fase': 7, 'heroe': 'mirla', 'avance': 0.98, 'jefe': True, 'pasada': False, 'segundos': 300, 'puntos': 13580}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 8. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

Fotos/archivos nuevos en `tests/shots/`: v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v0952_campamento.jpg, v0953_bencomo_caballero.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg, v098_barranco.jpg, v098_echeyde.jpg, v098_malpais.jpg, v0993_secuazas.jpg, v099_bencomo_0.jpg, v099_bencomo_1.jpg, v099_bencomo_2.jpg, v099_guanche_0.jpg, v099_guanche_1.jpg, v099_guanche_2.jpg, v099_guanche_3.jpg, v099_guanche_4.jpg, v099_guanche_5.jpg, v099_guanche_6.jpg, v099_guayota.jpg, v2_00.jpg, v2_01.jpg, v2_02.jpg, v2_03.jpg, v2_04.jpg, v2_05.jpg, v2_06.jpg, v2_07.jpg, v2_08.jpg, v2_09.jpg, v2_10.jpg, v2_11.jpg, v2_12.jpg, v2_13.jpg, v2_14.jpg
