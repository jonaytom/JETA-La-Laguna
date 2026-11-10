# Pruebas 1.2.8 — 2026-11-10 16:56 — 10/10 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 237 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_pasos.py` | **OK** | 46 s |
| 3 | `prueba_bordes.py` | **OK** (repetida aparte) | 62 s |
| 4 | `herramientas/foto_jugador.py` | **OK** | 2 s |
| 5 | `prueba_077.py` | **OK** | 12 s |
| 6 | `prueba_misiones_guardado.py` | **OK** | 18 s |
| 7 | `prueba_121.py` | **OK** | 0 s |
| 8 | `prueba_120.py` | **OK** | 0 s |
| 9 | `prueba_119.py` | **OK** | 0 s |
| 10 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 70 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/publicar.log`, `src/06_actors.js`, `src/06a_humans.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 33, 'peor': 104, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 0, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 3. prueba_bordes.py — OK (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot set properties of undefined (setting 'alive')\n    at activateParked (http://localhost:8765/test.html?q=baja:27523:11)\n    at Object.enterCar (http://localhost:8765/test.html?q=baja:27908:11)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:113)\n    at eval (eval at evaluate (:311:30), <anonymous>:3:247)\n    at eval (<anonymous>)\n    at UtilityScr
--- repetida aparte:
shot ms 39.900000005960464
{"frame":564,"calls":1231,"triangles":1816900,"points":0,"lines":0} calls:1231
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":1852}
```

### 4. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",-0.21,0.88,-0.17,"lowerarm_l"],["CylinderGeometry",-0.23,0.89,-0.19,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",-0.23,0.91,-0.15,"lowerarm_l"],["CylinderGeometry",-0.25,0.92,-0.17,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",0.27,0.89,0.03,"lowerarm_l"],["CylinderGeometry",0.29,0.89,0.04,"lowerarm_l"]]
```

### 5. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 8423, 'juntadas': 7747, 'mallas': 1765, 'ms': 550, 'no': {'con hijos (se juntan desde v1.0.0)': 564, 'grupo con nombre': 4681, 'varios materiales': 2, 'userData': 462, 'onBeforeRender': 2}, 'ejemplos': {'con hijos (se juntan desde v1.0.0)': [[169, -622, 'CylinderGeometry'], [168, -623, 'CylinderGeometry'], [168, -620, 'CylinderGeometry'], [167, -621, 'CylinderGeometry'], [180, -617, 'CylinderGeometry'], [179, -617, 'CylinderGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[143, 5, 'CylinderGeometry'], [-147, -618, 'ShapeGeometry']]}, 'ultimoId': 27907}, 'fusion': 1765, 'celdas': 5348, 'lod': 11698, 'peatones_enteros': 0}
distancia {'cerca': [5, 5], 'lejos': [0, 11347], 'niebla': 520}
aparcados {'grupos': 2603, 'coches': 7616, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 17912 ms; plazas [533] aparcados [181]
junta piezas 7747
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 7747
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

### 6. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1794329643871],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1794329643896],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1794329643910],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1794329643934],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1794329643961],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1794329644046],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1794329644076],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1794329653092]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948},"arcade":{"scores":{},"bought":[],"console":false,"invited":false}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"⚠ Saliendo del mundo — da la vuelta"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794329643871], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794329643896], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1794329643910], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1794329643934], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1794329643961], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1794329644046], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1794329644076], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1794329653092]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794329658394], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794329658406]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 7. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC', 'trozos': 30, 'puntos': 511, 'eje': 3199, 'lado': 1, 'ramales': 14, 'tramosParalelos': 77}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 8. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 5, 'twins': 4, 'estrechadas': 2, 'misma_altura': 0, 'anchos': [[4, 4], [4, 4], [4.5, 4.5], [4, 4]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 9. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 15, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

### 10. prueba_conduccion_tuneles_puentes.py — OK

```
roads 132
failed 0 of 132 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg
