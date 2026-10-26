# Pruebas 0.86.0 — 2026-10-26 10:03 — 6/7 OK

Listas: v086. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 198 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_085.py` | **FALLA** (repetida aparte) | 77 s |
| 2 | `prueba_0851.py` | **OK** | 9 s |
| 3 | `prueba_084.py` | **OK** | 0 s |
| 4 | `prueba_baloncesto.py` | **OK** | 15 s |
| 5 | `prueba_futbol.py` | **OK** | 7 s |
| 6 | `prueba_083.py` | **OK** | 3 s |
| 7 | `prueba_arranque.py` | **OK** | 0 s |

## Detalle

### 1. prueba_085.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of null (reading 'me')\n    at eval (eval at evaluate (:311:30), <anonymous>:1:354)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:404)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 2.0
{"frame":564,"calls":1854,"triangles":4722360,"points":0,"lines":0} calls:1854
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '5fb3e6'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 10, 'nombres': ['BRASIL', 'URUGUAY'], 'espera': True}
foto v086_furbito
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
  File "<string>", line 55, in run
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
playwright._impl._errors.Error: Page.evaluate: TypeError: Cannot read properties of null (reading 'me')
    at eval (eval at evaluate (:311:30), <anonymous>:1:354)
    at eval (eval at evaluate (:311:30), <anonymous>:1:404)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

### 2. prueba_0851.py — OK

```
esc {'enJuego': 'attract', 'tras1': {'mode': 'menu', 'running': True}, 'fuera': True, 'estado': 'play', 'pausa': 'none'}
ESC OK
basket {'pasa': 'pass', 'humano': ['COCO'], 'antes': 'EL CHOPA'}
RECIBIR OK
persecución {'normal': 124.92549289115075, 'huye': 159.27513681290506}
PERSECUCION OK
canchas {'n': 139, 'choques': [], 'junto': [['fs', -163, -458]]}
CANCHAS OK
ayuda A GOLPE: f_punch  B SALTO/VARA: f_kick  ↓ AGACHARSE / PICADO PIEDRA/MONEDA: b_pass  ESC SALIR
PICADO OK
foto v0851_marcos_0
foto v0851_marcos_1
foto v0851_marcos_2
foto v0851_marcos_3
foto v0851_marcos_4
vias_elevadas []
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [6.4, 6.7], "t": [0.2, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [5.8, 5.8], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [5.8, 5.8], "t": [0, 0, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [6.2, 6.2], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0, 0, 0.1], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0, 0, 0.1], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [5.3, 5.3], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [5.3, 5.3], "t": [0.3, 0, 0.3], "mat": "f5b72e"}]
errores []
PRUEBA 0851 OK
```

### 3. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [4, 7], 'pases': 10, 'con_balon': ['EL CHOPA', 'COCO', 'EL PIBE', 'EL LARGO', 'EL MÁS ALTO', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [22.5, 18.3, 13.7, 16.9, 18.6, 11.6]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 4. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 6], 'clock': 0, 'golden': True}
resultado {"won":true,"score":[8,6]}
PARTIDO CPU OK
partido fácil 1 [19, 2]
partido fácil 2 [23, 3]
partido fácil 3 [16, 5]
equilibrio primer partido [58, 10] OK
jugadores dibujados 90
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"green":true,"shot":true},"mode":"air"}
foto basket_zoom
RATÓN OK
tras moverse 1
tras correr 2
tras pasar 3
tras recibir 4
tras tirar 5
tras combo 6
foto basket_tutorial
tutorial 99
TUTORIAL OK
cambio de defensor -> COCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 5. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [3, 1], 'golden': False}
resultado {"won":true,"score":[4,1]}
PARTIDO CPU OK
partido fácil 1 [9, 0]
partido fácil 2 [7, 2]
partido fácil 3 [10, 0]
equilibrio primer partido [26, 2] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True}
RATÓN OK
campos {'campos': 73, 'puertas': 10, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 6. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', 0, 87], ['sanagustin', -3, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
CASAS OK
inmobiliaria {'aviso': '<kbd>E</kbd> Entrar: Inmobiliaria Pisos Chachi (pisos en alquiler y en venta)', 'alquilado': True, 'dinero': 4750, 'hasta': 7, 'dia': 0}
ALQUILER OK
casa por dentro {'dentro': 'herradores', 'sin': '<kbd>E</kbd> La tele · sin consola (la GOFIO-8 se vende en las jugueterías)', 'con': '<kbd>E</kbd> Encender la consola GOFIO-8'}
foto v083_casa
foto v083_consola_menu
consola {'abre': True, 'm0': 'menu'} {'sel': 1, 'm1': 'attract', 'm2': 'menu'}
CONSOLA OK
cama {'aviso': '<kbd>E</kbd> Dormir hasta mañana y guardar la partida', 'hora': 8, 'salud': 100, 'dia': 1}
CAMA OK
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'TúMisiónDestino (GPS)ComidaPolicíaCasa de El BlancoBar con la máquina del GUFOJugueteríaInmobiliaria Pisos ChachiTu casa'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 7. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 33, 'peor': 44, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, futbol_partido.jpg, futbol_tutorial.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg
