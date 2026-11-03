# Pruebas 1.0.1 — 2026-11-03 14:37 — 11/12 OK

Listas: v1001b, mapa. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 159 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_recorte.py` | **OK** | 49 s |
| 3 | `prueba_pendientes_faciles.py` | **OK** | 3 s |
| 4 | `prueba_carpeta.py` | **FALLA** (repetida aparte) | 44 s |
| 5 | `herramientas/foto_invasiones.py` | **OK** | 7 s |
| 6 | `audit_obstaculos.py` | **OK** | 0 s |
| 7 | `audit_cruces.py` | **OK** | 0 s |
| 8 | `audit_hundimiento.py` | **OK** | 0 s |
| 9 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 29 s |
| 10 | `prueba_bordes.py` | **OK** | 3 s |
| 11 | `prueba_parking_cristo.py` | **OK** | 0 s |
| 12 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 21, 'peor': 73, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_recorte.py — OK

```
recortados 4808 de 6288 · siguen metidos ≥ 1 m: 18
   [1424, 3934, 3.3, '']
   [-4699, 92, 2.8, '']
   [-179, 778, 2.6, 'Intercambiador de La Laguna']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-844, 73, 2, '']
   [1696, 4075, 2, '']
   [-857, 279, 1.9, '']
   [7, 170, 1.6, '']
   [-892, 1471, 1.6, '']
   [172, -767, 1.5, '']
   [-11, -253, 1.5, '']
   [29, -295, 1.4, '']
   [-1633, -195, 1.3, '']
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
   [2270, 3396, 1, 'Área de Hospitalización']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 69439, 'lisas': 34977, 'pct_lisas': 33.5}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.3, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 4808
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 4. prueba_carpeta.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Please use browser.new_context()')
--- repetida aparte:
shot ms 2.5
{"frame":564,"calls":1323,"triangles":2252753,"points":0,"lines":0} calls:1323
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
  File "<string>", line 6, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 14620, in new_page
    return mapping.from_impl(await self._impl_obj.new_page())
                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_browser_context.py", line 352, in new_page
    raise Error("Please use browser.new_context()")
playwright._impl._errors.Error: Please use browser.new_context()
```

### 5. herramientas/foto_invasiones.py — OK

```
 1. X 70, Y 220 · secundaria sin nombre (junto a C. Herradores) · calle del juego: (sin nombre) 13 m · invade_01_arriba.jpg / _calle.jpg
 2. X 46, Y 197 · C. Herradores · Capilla de la Cruz Verde · calle del juego: Calle Herradores 12 m · invade_02_arriba.jpg / _calle.jpg
 3. X 149, Y -623 · calle de servicio · Mercado de La Laguna · calle del juego: (sin nombre) 5.2 m · invade_03_arriba.jpg / _calle.jpg
 4. X -6, Y -242 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_04_arriba.jpg / _calle.jpg
 5. X 14, Y -300 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_05_arriba.jpg / _calle.jpg
 6. X -65, Y -58 · C. Tabares de Cala · Casa Riquel · calle del juego: Calle Tabares de Cala 9.8 m · invade_06_arriba.jpg / _calle.jpg
 7. X -912, Y -407 · Av. Lucas Vega / Callejón Montaraz · calle del juego: Avenida Lucas Vega 5.9 m · invade_07_arriba.jpg / _calle.jpg
FOTOS INVASIONES OK
```

### 6. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 7. audit_cruces.py — OK

```
conflicts 29
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 4), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('motorway', 'motorway_link', 1, 1), 1), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('motorway', 'motorway', 1, 1), 1), (('motorway_link', 'motorway', 1, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 8. audit_hundimiento.py — OK

```
{"muestras":6906,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 9. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 10. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3}
```

### 11. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 12. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, invade_01_arriba.jpg, invade_01_calle.jpg, invade_02_arriba.jpg, invade_02_calle.jpg, invade_03_arriba.jpg, invade_03_calle.jpg, invade_04_arriba.jpg, invade_04_calle.jpg, invade_05_arriba.jpg, invade_05_calle.jpg, invade_06_arriba.jpg, invade_06_calle.jpg, invade_07_arriba.jpg, invade_07_calle.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg
