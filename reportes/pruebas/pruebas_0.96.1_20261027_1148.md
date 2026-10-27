# Pruebas 0.96.1 — 2026-10-27 11:48 — 3/4 OK

Listas: v0961. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 92 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_096.py` | **OK** | 69 s |
| 2 | `prueba_094.py` | **OK** | 1 s |
| 3 | `prueba_082.py` | **FALLA** | 1 s |
| 4 | `prueba_093.py` | **OK** | 1 s |

## Detalle

### 1. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

### 2. prueba_094.py — OK

```
golpe a 10 de profundidad {'hp0': 8, 'hp': 6}
patadas {'sStun': True, 'wStun': False, 'strongHit': True, 'hp': [21, 14.6], 'bigNo': True}
foto v094_guanche_retrato
foto v094_bencomo_salto
foto v094_bencomo_picado
PROFUNDIDAD OK
PATADAS Y GOLPE FUERTE OK
errores []
PRUEBA 094 OK
```

### 3. prueba_082.py — FALLA

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
recorrido [{'estado': {'p': [19, 22, 'idle', -1, 0], 'lock': 2, 'E': [['S', 'idle', 8, 34, 21, True, True, 0, -1], ['S', 'idle', 8, 6, 20, True, True, 0, 1]], 'teclas': ['hit:vS']}, 'fase': 1, 'heroe': 'mirla', 'avance': 0.24, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 0}, {'estado': {'p': [23, 20, 'idle', 1, 0], 'lock': 2, 'E': [['S', 'idle', 8, 36, 20, True, True, 0, -1], ['W', 'idle', 8, 14, 23, False, True, 0, 1]], 'teclas': ['hit:vS']}, 'fase': 2, 'heroe': 'mirla', 'avance': 0.39, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 1230}, {'estado': {'p': [19, 22, 'idle', -1, 0], 'lock': 3, 'E': [['S', 'idle', 8, 34, 21, True, True, 0, -1], ['H', 'idle', 11, 6, 20, True, True, 0, 1], ['S', 'idle', 8, 82, 23, False, True, 0, -1]], 'teclas': ['hit:vS']}, 'fase': 3, 'heroe': 'pastor', 'avance': 0.22, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 0}, {'estado': {'p': [15, 24, 'idle', -1, 0], 'lock': 3, 'E': [['G', 'windup', 20, 6, 24, True, True, 0, 1], ['S', 'walk', 6, 6, 24, True, True, 0, 1], ['S', 'walk', 6, 6, 24, False, True, 0, 1]], 'teclas': ['hit:vS']}, 'fase': 4, 'heroe': 'mirla', 'avance': 0.21, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 60}, {'estado': {'p': [22, 22, 'idle', 1, 0], 'lock': 3, 'E': [['H', 'idle', 11, 38, 21, True, True, 0, -1], ['H', 'windup', 11, 7, 20, True, True, 0, 1], ['W', 'walk', 8, 112, 20, False, True, 0, -1]], 'teclas': ['hit:vS']}, 'fase': 5, 'heroe': 'mencey', 'avance': 0.25, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 0}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 4. prueba_093.py — OK

```
hojas 25 sin cargar []
foto v093_guanche_elegir
foto v093_guanche_magote
foto v093_guanche_mencey
foto v093_guanche_mirla
foto v093_guanche_montado
lagarto {'walk': 25.000000000000064} {'run': 47.99999999999993, 'running': True}
foto v093_guanche_jefes
foto v093_bencomo_titulo
bencomo dibujado 1
foto v093_bencomo_castellanos
foto v093_bencomo_agachado
foto v093_bencomo_golpebajo
foto v093_bencomo_lugo
LAGARTO CORRE OK
BENCOMO NUEVO OK
errores []
PRUEBA 093 OK
```

Fotos/archivos nuevos en `tests/shots/`: v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v093_bencomo_agachado.jpg, v093_bencomo_castellanos.jpg, v093_bencomo_golpebajo.jpg, v093_bencomo_lugo.jpg, v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg, v094_bencomo_picado.jpg, v094_bencomo_salto.jpg, v094_guanche_retrato.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg
