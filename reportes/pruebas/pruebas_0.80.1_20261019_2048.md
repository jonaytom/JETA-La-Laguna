# Pruebas 0.80.1 — 2026-10-19 20:48 — 8/9 OK

Listas: v080a, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 259 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_080.py` | **FALLA** | 69 s |
| 2 | `prueba_arranque.py` | **OK** | 1 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `audit_cruces.py` | **OK** | 0 s |
| 5 | `audit_hundimiento.py` | **OK** | 0 s |
| 6 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 123 s |
| 7 | `prueba_bordes.py` | **OK** | 0 s |
| 8 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 9 | `prueba_aeropuerto.py` | **OK** | 0 s |

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
movimientos {'anda': 153, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 279}
pogo {'pogo_mata': True, 'rebote': True}
agachado contra el perro {'agachado': True, 'perro_muerto': False}
foto v080_salto
MOVIMIENTOS FALLA
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 0, 'pasada': True, 'donde': [3209, 176, 200], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
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
PRUEBA 080 FALLA
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 43, 'peor': 91, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 3. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 4. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 5. audit_hundimiento.py — OK

```
{"muestras":6480,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 6. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 3.0
{"frame":566,"calls":1831,"triangles":4613678,"points":0,"lines":0} calls:1831
roads 112
failed 0 of 112 · conocidos 0
CONDUCCION OK
```

### 7. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 8. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 9. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, df_8.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg
