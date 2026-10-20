# Pruebas 0.82.0 — 2026-10-20 16:57 — 0/1 OK

Listas: v082b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 75 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_082.py` | **FALLA** | 58 s |

## Detalle

### 1. prueba_082.py — FALLA

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
lagarto {'monta': True, 'cola': 'whip'}
foto v082_lagarto
CONTROLES OK
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
recorrido [{'estado': {'p': [25, 16, 'atk', -1, 0], 'lock': 2, 'E': [['S', 'idle', 8, 216, 6, True, False, 0, -1], ['S', 'idle', 4, 6, 19, True, True, 0, 1]], 'teclas': ['vL']}, 'fase': 1, 'heroe': 'mirla', 'avance': 0.24, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 30}, {'estado': {'p': [192, 9, 'walk', 1, 0], 'lock': 2, 'E': [['T', 'idle', 6, 216, 6, True, False, 0, -1], ['T', 'idle', 6, 236, 32, True, False, 0, -1]], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 0.22, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 380}, {'estado': {'p': [192, 9, 'walk', 1, 0], 'lock': 2, 'E': [['S', 'idle', 8, 216, 6, True, False, 0, -1], ['S', 'idle', 8, 236, 32, True, False, 0, -1]], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mencey', 'avance': 0.22, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 440}, {'estado': {'p': [192, 9, 'walk', 1, 0], 'lock': 2, 'E': [['G', 'windup', 22, 216, 6, True, False, 0, -1], ['S', 'idle', 8, 236, 32, True, False, 0, -1]], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'pastor', 'avance': 0.21, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 360}, {'estado': {'p': [192, 9, 'walk', 1, 0], 'lock': 1, 'E': [['H', 'idle', 11, 216, 6, True, False, 0, -1]], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mencey', 'avance': 0.25, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 970}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

Fotos/archivos nuevos en `tests/shots/`: v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg
