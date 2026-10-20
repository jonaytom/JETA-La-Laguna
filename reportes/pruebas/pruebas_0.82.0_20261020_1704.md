# Pruebas 0.82.0 — 2026-10-20 17:04 — 11/11 OK

Listas: v082a, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 120 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_082.py` | **OK** | 62 s |
| 2 | `prueba_081.py` | **OK** | 1 s |
| 3 | `prueba_080.py` | **OK** | 3 s |
| 4 | `prueba_arranque.py` | **OK** | 0 s |
| 5 | `audit_obstaculos.py` | **OK** | 0 s |
| 6 | `audit_cruces.py` | **OK** | 0 s |
| 7 | `audit_hundimiento.py` | **OK** | 0 s |
| 8 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 32 s |
| 9 | `prueba_bordes.py` | **OK** | 1 s |
| 10 | `prueba_parking_cristo.py` | **OK** | 0 s |
| 11 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_082.py — OK

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
recorrido [{'estado': {'p': [192, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mirla', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 149, 'puntos': 10920}, {'estado': {'p': [140, 26, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 90, 'puntos': 11930}, {'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 135, 'puntos': 13730}, {'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 142, 'puntos': 15880}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 131, 'puntos': 25390}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 2. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'Pan de Latita', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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
recorrido [{'fase': 1, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 107, 'puntos': 21030}, {'fase': 2, 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 120, 'puntos': 21190}, {'fase': 3, 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 116, 'puntos': 28320}]
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
movimientos {'anda': 156, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 277}
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
30 pasos (ms): {'mediana': 27, 'peor': 35, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 5. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 6. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 7. audit_hundimiento.py — OK

```
{"muestras":6480,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 8. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 0.1, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.6, 'x': 1220, 'z': 2533, 'y': -123.5}
snap df_1667
failed 0 of 112 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2533
CONDUCCION OK
```

### 9. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":0}
```

### 10. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 11. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_1667.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg
