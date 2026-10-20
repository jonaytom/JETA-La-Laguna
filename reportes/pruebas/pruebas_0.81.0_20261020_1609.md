# Pruebas 0.81.0 — 2026-10-20 16:09 — 9/10 OK

Listas: v081a, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 214 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_080.py` | **FALLA** | 61 s |
| 2 | `prueba_081.py` | **OK** | 1 s |
| 3 | `prueba_arranque.py` | **OK** | 0 s |
| 4 | `audit_obstaculos.py` | **OK** | 0 s |
| 5 | `audit_cruces.py` | **OK** | 0 s |
| 6 | `audit_hundimiento.py` | **OK** | 0 s |
| 7 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 99 s |
| 8 | `prueba_bordes.py` | **OK** | 0 s |
| 9 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 10 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_080.py — FALLA

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
recorrido [{'fase': 1, 'avance': 0.63, 'caidas': 16, 'pasada': False, 'donde': [1962, 92, 122], 'alturas': [3, 3, -1, -1, -1, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES FALLA
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
PRUEBA 080 FALLA
```

### 2. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'Casa del Cereal', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 28, 'peor': 71, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 4. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 5. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 6. audit_hundimiento.py — OK

```
{"muestras":6480,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 7. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 43.59999999962747
{"frame":564,"calls":1824,"triangles":4579681,"points":0,"lines":0} calls:1824
roads 112
failed 0 of 112 · conocidos 0
CONDUCCION OK
```

### 8. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 9. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 10. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_8.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg
