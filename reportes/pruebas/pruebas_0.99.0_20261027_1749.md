# Pruebas 0.99.0 — 2026-10-27 17:49 — 4/5 OK

Listas: v099. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 93 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_099.py` | **OK** | 72 s |
| 2 | `prueba_098.py` | **OK** | 1 s |
| 3 | `prueba_096.py` | **OK** | 0 s |
| 4 | `prueba_0952.py` | **FALLA** | 1 s |
| 5 | `prueba_082.py` | **OK** | 0 s |

## Detalle

### 1. prueba_099.py — OK

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

### 2. prueba_098.py — OK

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

### 3. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

### 4. prueba_0952.py — FALLA

```
campamento {'fase': 'camp', 'montado': False, 'dibujado': 1, 'cargadas': 4}
foto v0952_campamento
SE VE EN EL CAMPAMENTO OK
HOJAS CARGADAS AL ABRIR FALLA
foto v0953_bencomo_caballero
errores []
PRUEBA 0952 FALLA
```

### 5. prueba_082.py — OK

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
recorrido [{'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 76, 'puntos': 9980}, {'estado': {'p': [192, 25, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 110, 'puntos': 12630}, {'estado': {'p': [192, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 136, 'puntos': 14130}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 148, 'puntos': 14020}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 104, 'puntos': 16050}, {'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 142, 'puntos': 15910}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 160, 'puntos': 32510}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

Fotos/archivos nuevos en `tests/shots/`: v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v0952_campamento.jpg, v0953_bencomo_caballero.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg, v098_barranco.jpg, v098_echeyde.jpg, v098_malpais.jpg, v099_bencomo_0.jpg, v099_bencomo_1.jpg, v099_bencomo_2.jpg, v099_guanche_0.jpg, v099_guanche_1.jpg, v099_guanche_2.jpg, v099_guanche_3.jpg, v099_guanche_4.jpg, v099_guanche_5.jpg, v099_guanche_6.jpg, v099_guayota.jpg
