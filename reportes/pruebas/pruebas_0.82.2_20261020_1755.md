# Pruebas 0.82.2 — 2026-10-20 17:55 — 11/12 OK

Listas: v0822a, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 693 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0821.py` | **OK** | 68 s |
| 2 | `prueba_082.py` | **FALLA** (repetida aparte) | 77 s |
| 3 | `prueba_081.py` | **OK** (repetida aparte) | 82 s |
| 4 | `prueba_080.py` | **OK** (repetida aparte) | 85 s |
| 5 | `prueba_arranque.py` | **OK** (repetida aparte) | 50 s |
| 6 | `audit_obstaculos.py` | **OK** (repetida aparte) | 48 s |
| 7 | `audit_cruces.py` | **OK** (repetida aparte) | 48 s |
| 8 | `audit_hundimiento.py` | **OK** (repetida aparte) | 49 s |
| 9 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 117 s |
| 10 | `prueba_bordes.py` | **OK** | 0 s |
| 11 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 12 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 1, 'ultima': 'Prueba de la máquina'}
MOVIL OK
lo que sabes {'sabes': True, 'sabidos': ['Maleantes en busca y captura', 'La máquina de El Blanco: BENCOMO', 'GUERRA DE NAVES', 'GUANCHE WARRIORS', 'Las jugueterías', 'Retos en las canchas'], 'detalle_quien': True, 'detalle_donde': True, 'detalle_charla': True}
(sin foto) v0821_diario_sabes
maleantes {'maleantes': True}
(sin foto) v0821_diario_maleantes
SABES OK
jugueterías en el mapa {'abierto': True, 'cercana': 'Juguetes Baobabito', 'metros': 151, 'mapa': True, 'texto': True, 'gps': True, 'cerrado': True}
foto v0822_mapa
MAPA OK
errores []
PRUEBA 0821 OK
```

### 2. prueba_082.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.evaluate: ReferenceError: rr is not defined\n    at floorImg (http://localhost:8765/test.html?q=baja:9901:37)\n    at g.draw (http://localhost:8765/test.html?q=baja:10106:18)\n    at render (http://localhost:8765/test.html?q=baja:8912:77)\n    at Object._render (http://localhost:8765/test.html?q=baja:8946:152)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:14)\n    at eval (<a
--- repetida aparte:
shot ms 2.200000001117587
{"frame":562,"calls":1851,"triangles":4718608,"points":0,"lines":0} calls:1851
juguetería {'hay': True, 'tienda': 'Juguetes Sabelotodo', 'opcion': 0, 'abre': True}
foto v082_titulo
vista a los 9 s demo
Traceback (most recent call last):
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 27, in <module>
    asyncio.run(main())
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 195, in run
    return runner.run(main)
           ^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\base_events.py", line 691, in run_until_complete
    return future.result()
           ^^^^^^^^^^^^^^^
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 24, in main
    await globals()['run'](pg)
  File "<string>", line 22, in run
  File "<string>", line 7, in foto
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 9421, in evaluate
    await self._impl_obj.evaluate(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 474, in evaluate
    return await self._main_frame.evaluate(expression, arg)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_frame.py", line 346, in evaluate
    await self._channel.send(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.Error: Page.evaluate: ReferenceError: rr is not defined
    at floorImg (http://localhost:8765/test.html?q=baja:9901:37)
    at g.draw (http://localhost:8765/test.html?q=baja:10106:18)
    at render (http://localhost:8765/test.html?q=baja:8912:77)
    at Object._render (http://localhost:8765/test.html?q=baja:8946:152)
    at eval (eval at evaluate (:311:30), <anonymous>:1:14)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 3. prueba_081.py — OK (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.evaluate: ReferenceError: rr is not defined\n    at floorImg (http://localhost:8765/test.html?q=baja:9901:37)\n    at g.draw (http://localhost:8765/test.html?q=baja:10106:18)\n    at render (http://localhost:8765/test.html?q=baja:8912:77)\n    at Object._render (http://localhost:8765/test.html?q=baja:8946:152)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:14)\n    at eval (<a
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 2
{"frame":564,"calls":1819,"triangles":4732731,"points":0,"lines":0} calls:1819
bar {'hay': True, 'bar': 'La Despensita', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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

### 4. prueba_080.py — OK (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.evaluate: ReferenceError: rr is not defined\n    at floorImg (http://localhost:8765/test.html?q=baja:9901:37)\n    at g.draw (http://localhost:8765/test.html?q=baja:10106:18)\n    at render (http://localhost:8765/test.html?q=baja:8912:77)\n    at Object._render (http://localhost:8765/test.html?q=baja:8946:152)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:14)\n    at eval (<a
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 2.099999999627471
{"frame":566,"calls":1812,"triangles":4712575,"points":0,"lines":0} calls:1812
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
jefe {'empieza': 'speech', 'huye': True, 'fase': 3, 'arena': 240, 'dentro': True}
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

### 5. prueba_arranque.py — OK (repetida aparte)

```
En la carga compartida falló por:
ARRANQUE FALLA
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 2.900000000372529
{"frame":566,"calls":1837,"triangles":4760267,"points":0,"lines":0} calls:1837
30 pasos (ms): {'mediana': 33, 'peor': 110, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 6. audit_obstaculos.py — OK (repetida aparte)

```
En la carga compartida falló por:
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 2.799999998882413
{"frame":566,"calls":1828,"triangles":4649127,"points":0,"lines":0} calls:1828
obstacles 0
[]
```

### 7. audit_cruces.py — OK (repetida aparte)

```
En la carga compartida falló por:
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 6.5
{"frame":564,"calls":1865,"triangles":4796973,"points":0,"lines":0} calls:1865
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 8. audit_hundimiento.py — OK (repetida aparte)

```
En la carga compartida falló por:
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 3.699999999254942
{"frame":564,"calls":1778,"triangles":4657141,"points":0,"lines":0} calls:1778
{"muestras":6480,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 9. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
PAGEERROR: rr is not defined
--- repetida aparte:
shot ms 2.099999999627471
{"frame":564,"calls":1813,"triangles":4622519,"points":0,"lines":0} calls:1813
roads 112
failed 0 of 112 · conocidos 0
CONDUCCION OK
```

### 10. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 11. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 12. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v0822_mapa.jpg, v082_titulo.jpg
