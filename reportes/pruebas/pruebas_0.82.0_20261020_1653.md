# Pruebas 0.82.0 — 2026-10-20 16:53 — 3/4 OK

Listas: v082a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 86 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_082.py` | **FALLA** | 62 s |
| 2 | `prueba_081.py` | **OK** | 1 s |
| 3 | `prueba_080.py` | **OK** | 3 s |
| 4 | `prueba_arranque.py` | **OK** | 0 s |

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
recorrido [{'fase': 1, 'heroe': 'pastor', 'avance': 0.24, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 360}, {'fase': 2, 'heroe': 'mencey', 'avance': 0.22, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 380}, {'fase': 3, 'heroe': 'mirla', 'avance': 0.22, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 10}, {'fase': 4, 'heroe': 'mirla', 'avance': 0.21, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 20}, {'fase': 5, 'heroe': 'mirla', 'avance': 0.25, 'jefe': False, 'pasada': False, 'segundos': 300, 'puntos': 20}]
FASES FALLA
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 2. prueba_081.py — OK

```
bar {'hay': True, 'bar': "Ca' Zonita", 'opcion': 4, 'abre': True, 'juego': 'attract'}
foto v081_titulo
vista a los 9 s demo
foto v081_demo
foto v081_records
moneda {"creditos":1,"modo":"play","dinero":49}
BAR OK
controles {'mueve': [71, 71], 'tiro': True, 'beam': True}
mejoras y módulo {'cursor': 0, 'velocidad': 1, 'cursor2': 1, 'modulo': True, 'st0': 'front', 'lanzado': 'free', 'delante': 105, 'vuelve': 'front'}
foto v081_jugando
CONTROLES OK
foto v081_fase1
foto v081_jefe1
foto v081_fase2
foto v081_jefe2
foto v081_fase3
foto v081_jefe3
recorrido [{'fase': 1, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 107, 'puntos': 20880}, {'fase': 2, 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 177, 'puntos': 19390}, {'fase': 3, 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 116, 'puntos': 28270}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name', 'modo': 'attract'}
foto v081_records_nuevo
RECORDS OK
errores []
PRUEBA 081 OK
```

### 3. prueba_080.py — OK

```
abre True
foto v080_titulo
vista a los 9 s demo
foto v080_demo
vista a los 21 s scores
foto v080_records
modo play
foto v080_fase1
CICLO OK
movimientos {'anda': 153, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 287}
pogo {'pogo_mata': True, 'rebote': True}
agachado contra el perro {'agachado': True, 'perro_muerto': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 0, 'pasada': True, 'donde': [3193, 176, 199], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES OK
jefe {'empieza': 'speech', 'huye': True, 'fase': 3}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Subir a casa de El Blanco a jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1}
foto v080_portal_blanco
BLANCO OK
foto v080_portal_adelantado
BLANCO OK
errores []
PRUEBA 080 OK
```

### 4. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 43, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg
