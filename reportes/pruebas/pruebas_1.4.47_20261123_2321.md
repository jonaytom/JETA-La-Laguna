# Pruebas 1.4.47 — 2026-11-23 23:21 — 23/23 OK

Listas: congelar1445, misiones, aparcados, marchas, setos, v1447, gold, glitch. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 651 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 2 s |
| 3 | `prueba_bordes.py` | **OK** | 303 s |
| 4 | `prueba_persecuciones.py` | **OK** | 26 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 82 s |
| 6 | `prueba_arranque.py` | **OK** | 1 s |
| 7 | `prueba_1441.py` | **OK** | 1 s |
| 8 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 9 | `prueba_misiones.py` | **OK** | 71 s |
| 10 | `herramientas/foto_1441.py` | **OK** | 9 s |
| 11 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 12 | `prueba_congelados.py` | **OK** | 0 s |
| 13 | `prueba_misiones_guardado.py` | **OK** | 20 s |
| 14 | `prueba_obispo.py` | **OK** | 5 s |
| 15 | `prueba_diario.py` | **OK** | 1 s |
| 16 | `herramientas/sonda_aparcados.py` | **OK** | 54 s |
| 17 | `herramientas/sonda_marchas.py` | **OK** | 1 s |
| 18 | `herramientas/foto_setos.py` | **OK** | 7 s |
| 19 | `herramientas/foto_1447.py` | **OK** | 5 s |
| 20 | `herramientas/sonda_descongelados.py` | **OK** | 0 s |
| 21 | `herramientas/foto_gold.py` | **OK** | 2 s |
| 22 | `herramientas/sonda_tejados_hip.py` | **OK** | 0 s |
| 23 | `herramientas/foto_glitch_mapa.py` | **OK** | 8 s |

## Detalle

### 1. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795475475466,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.0","punta":"225","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -189 · Y 0 · 555 m"}
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-4,16],"borde":819,"calle":3.8,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[500,3950],"borde0":30,"ahora":[-4,18],"borde":821,"calle":3.9,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[1500,700],"borde0":305,"ahora":[-4,18],"borde":821,"calle":3.9,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
error: Failed to load resource: net::ERR_CONNECTION_RESET
```

### 4. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.30 m OK
[8] Los bancos del Adelantado: a pie: a 9 m, recorre 4 m en 3 s, salto máx 0.14 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 7 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 12 m en 3 s, salto máx 0.17 m OK | a pie: a 10 m, recorre 14 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 5. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 6. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 49, 'peor': 92, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 7. prueba_1441.py — OK

```
{"hits": [], "worst": 0, "steer": [[12, 0.2851488817951034], [28, 0.17385421416507835], [55, 0.03940232620964901], [80, 0.012488016969708544]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 324, "ratio": 1.2}, "garage": {"ok": true, "carved": true, "antes": {"car": false, "interior": null, "dead": false, "st": "play"}, "despues": {"car": false, "interior": null, "dead": false, "d": 0}, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.26670528291745}}
AUTOPISTA_SIN_GOLPES OK
GIRO_CIUDAD_IGUAL OK
GIRO_MENOR_A_300 OK
PEATONES_FUERA_DE_PUENTES OK
GOLD_EXISTE OK
GOLD_DORADO OK
GOLD_20_POR_CIENTO OK
GARAJE_HECHO OK
GARAJE_COCHE_DENTRO OK
GARAJE_BOTON OK
GARAJE_PUERTA OK
GARAJE_SALIDA OK
errores []
PRUEBA 1441 OK
```

### 8. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 9. prueba_misiones.py — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
[7] Defensores de La Laguna: PASA · dinero +1000 · pasos dlg>idle
[8] Los bancos del Adelantado: PASA · dinero +900 · pasos talk>goto>talk>fight>shot>talk>idle
[9] El gofio robado: PASA · dinero +1100 · pasos talk>goto>talk>goto>talk>goto>talk>fight>enter>goto>talk>idle
[10] El carterista del Cristo: PASA · dinero +600 · pasos talk>goto>chase>talk>fight>idle
[11] Carrera solidaria del casco: PASA · dinero +700 · pasos talk>goto>idle
[12] El rally de La Esperanza: PASA · dinero +1200 · pasos talk>car>goto>countdown>goto>idle
[13] Baches en la Vía de Ronda: PASA · dinero +900 · pasos talk>enter>goto>idle
[14] Escolta a la guagua del Romero: PASA · dinero +1000 · pasos talk>car>escort>talk>idle
[15] La guagua de la broma: PASA · dinero +900 · pasos talk>car>escort>talk>idle
[16] Grafiteros en el tranvía: PASA · dinero +800 · pasos talk>goto>shot>talk>idle
[17] Noche en el aeropuerto: PASA · dinero +2000 · pasos talk>goto>damage>shot>talk>idle
[18] El rifle de agua: PASA · dinero +-2200 · pasos talk>goto>shop>dlg>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 10. herramientas/foto_1441.py — OK

```
{"p":"<kbd>E</kbd> Pulsar el botón del garaje","a":1.5707963267948966}
FOTO 1441 OK
```

### 11. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': True, 'grid': {'same': True, 'oneway': True, 'ahead': 12, 'fwd': True, 'dot': 1, 'se': 2291, 'pe': 2291}, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 12. prueba_congelados.py — OK

```
congelados 12883 · descongelados 1
   Object3D X -188, Y 20 (se mueve)
PRUEBA CONGELADOS OK
```

### 13. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":4,"story":6,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Carrera con el Canarión":[["El Canarión","¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.",1795475983996],["El Canarión","Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.",1795475984014],["El Canarión","Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.",1795475984015],["El Canarión","¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.",1795475984016]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795475987686],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795475987712],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795475987733],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795475987754],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795475987778],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795475987842],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795475987903],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795475997974]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":true,"patrol":true,"basketTut":false,"futbolTut":false,"jugueterias":true,"maleIntro":false,"rifleTut":true,"obispoIntro":true},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Le has ganado al Canarión +2.500 €"}
cargada: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Carrera con el Canarión': [['El Canarión', '¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.', 1795475983996], ['El Canarión', 'Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.', 1795475984014], ['El Canarión', 'Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.', 1795475984015], ['El Canarión', '¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.', 1795475984016]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795475987686], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795475987712], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795475987733], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795475987754], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795475987778], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795475987842], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795475987903], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795475997974]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': False, 'defenders': True, 'patrol': True, 'basketTut': False, 'futbolTut': False, 'jugueterias': True, 'maleIntro': False, 'rifleTut': True, 'obispoIntro': True}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Carrera con el Canarión': [['El Canarión', '¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.', 1795475983996], ['El Canarión', 'Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.', 1795475984014], ['El Canarión', 'Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.', 1795475984015], ['El Canarión', '¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.', 1795475984016]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795476003277], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795476003293]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': False, 'defenders': True, 'patrol': True, 'basketTut': False, 'futbolTut': False, 'jugueterias': True, 'maleIntro': False, 'rifleTut': True, 'obispoIntro': True}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False, 'obispoIntro': True, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 14. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 30, 'pitches': 139}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-59.078018842493044,-423.01085545102876,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 15. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 11
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Café Brasilito | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | C
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 16. herramientas/sonda_aparcados.py — OK

```
aparcados 7612 · probados 401 · fallan 20
por modelo: {"mepierdo": 1, "cartabon": 2, "teypan": 2, "dsendero": 1, "carlota": 2, "vivita": 1, "troceen": 1, "compi": 1, "troceenC44": 1, "ficus": 1, "nano": 2, "hubli": 2, "seta128": 1, "reventon": 1, "di55": 1}
   ['mepierdo', 173, -619, 'no se mueve (1.51 m)']
   ['cartabon', 201, -576, 'no se mueve (1.49 m)']
   ['teypan', -118, 159, 'no se mueve (1.42 m)']
   ['cartabon', -192, 373, 'no se mueve (1.49 m)']
   ['dsendero', -222, 459, 'no se mueve (1.53 m)']
   ['carlota', -552, 526, 'no se mueve (0.71 m)']
   ['vivita', 889, 2912, 'no se mueve (1.65 m)']
   ['troceen', -703, 834, 'no se mueve (0.79 m)']
   ['compi', -765, 526, 'no se mueve (1.60 m)']
   ['troceenC44', -803, 1610, 'no se mueve (0.62 m)']
   ['carlota', -773, 1559, 'no se mueve (0.71 m)']
   ['ficus', 699, 1444, 'no se mueve (1.61 m)']
   ['nano', 1628, 2095, 'no se mueve (1.61 m)']
   ['hubli', -638, 935, 'no se mueve (1.24 m)']
   ['seta128', -769, 693, 'no se mueve (0.93 m)']
   ['teypan', -997, 710, 'no se mueve (0.84 m)']
   ['reventon', 1430, 3154, 'no se mueve (0.51 m)']
   ['di55', 1425, 1610, 'no se mueve (0.74 m)']
   ['hubli', -167, -466, 'no se mueve (0.56 m)']
   ['nano', 2320, 3854, 'no se mueve (0.72 m)']
SONDA APARCADOS OK
```

### 17. herramientas/sonda_marchas.py — OK

```
utilitario {"modelo": "Piki Crocante", "perfil": "gas", "marchas": [[12, "1", 1524], [23, "1", 3029], [34, "1", 4488], [43, "2", 3948], [51, "2", 4595], [56, "2", 5137], [62, "3", 3907], [66, "3", 4197], [70, "3", 4460], [0, "1", 3293], [2, "R", 2454], [0, "1", 3351], [0, "1", 3352], [0, "1", 3352], [0, "1", 3352], [0, "1", 3352]]}
deportivo {"modelo": "Fierilla 440", "perfil": "v8", "marchas": [[24, "1", 2026], [47, "1", 4016], [68, "1", 5811], [84, "2", 5239], [97, "2", 6022], [107, "2", 6686], [4, "R", 2189], [21, "1", 1752], [0, "1", 4001], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007]]}
guagua {"modelo": "Escania Guagua", "perfil": "bigdiesel", "marchas": [[6, "1", 848], [12, "1", 1442], [18, "1", 2149], [23, "2", 1906], [28, "2", 2277], [31, "3", 1744], [35, "3", 1921], [37, "3", 2075], [40, "3", 2214], [42, "4", 1578], [44, "4", 1655], [46, "4", 1727], [7, "R", 878], [3, "1", 952], [0, "1", 1409], [0, "1", 1406]]}
electrico {"modelo": "Newton Style 3", "perfil": "ev", "marchas": [[0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0], [0, "P", 0]]}
SONDA MARCHAS OK
```

### 18. herramientas/foto_setos.py — OK

```
SETOS [['seto_boj', 1812.800537109375, 2937.716552734375, 313.5001843821444], ['seto_bug', 1809.5281982421875, 2921.921630859375, 308.7295977167369], ['seto_flor', 1582.73291015625, 2797.4169921875, 130.79559396602295]]
FOTO SETOS OK 3
```

### 19. herramientas/foto_1447.py — OK

```
FOTO 1447 OK
```

### 20. herramientas/sonda_descongelados.py — OK

```
PIEZA {'at': [143, 5], 'type': 'Group', 'name': '', 'ud': [], 'y': 0.43, 'kids': 5, 'chain': [], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CircleGeometry', 'params': {'radius': 4.7, 'segments': 8, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': '4d8ea3', 'ud': [], 'y': 1.15, 'kids': 0, 'chain': ['Group'], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CylinderGeometry', 'params': {'radiusTop': 2, 'radiusBottom': 2.24, 'height': 3.05, 'radialSegments': 24, 'heightSegments': 1, 'openEnded': True, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': 'cfe8f0', 'ud': ['noMerge'], 'y': 2.68, 'kids': 0, 'chain': ['Group'], 'frozen': False}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CylinderGeometry', 'params': {'radiusTop': 1, 'radiusBottom': 1.12, 'height': 4.4, 'radialSegments': 24, 'heightSegments': 1, 'openEnded': True, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': 'cfe8f0', 'ud': ['noMerge'], 'y': 3.35, 'kids': 0, 'chain': ['Group'], 'frozen': False}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'BufferGeometry', 'mat': 'MeshStandardMaterial', 'col': 'd9d4ca', 'ud': [], 'y': 0.43, 'kids': 0, 'chain': ['Group'], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'BufferGeometry', 'mat': 'MeshStandardMaterial', 'col': 'eeebe4', 'ud': [], 'y': 0.43, 'kids': 0, 'chain': ['Group'], 'frozen': True}
SONDA DESCONGELADOS OK 6
```

### 21. herramientas/foto_gold.py — OK

```
FOTO GOLD OK
```

### 22. herramientas/sonda_tejados_hip.py — OK

```
TEJADOS {"ok":1535,"bajos":327,"planos":96}
GLORIETAS [[1600,3471,35,"glorieta"]]
```

### 23. herramientas/foto_glitch_mapa.py — OK

```
FOTO GLITCH OK 13
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, f1441_bajando.jpg, f1441_dentro.jpg, f1441_frente.jpg, f1441_nano_frente.jpg, f1441_nano_lado.jpg, f1441_noche.jpg, f1441_porton_abierto.jpg, f1441_porton_abriendo.jpg, f1441_porton_cerrado.jpg, f1441_subiendo.jpg, glitch_autopista_caida.jpg, glitch_canaveral.jpg, glitch_doble_calzada.jpg, glitch_doble_calzada_arriba.jpg, glitch_enterrado.jpg, glitch_falta_edificio.jpg, glitch_hueco_azul.jpg, glitch_pasarela.jpg, glitch_rotonda.jpg, glitch_rotonda_calle.jpg, glitch_tejado.jpg, glitch_tejado_arriba.jpg, glitch_trinidad.jpg, gold_detras.jpg, gold_detras_cerca.jpg, gold_lado.jpg, obispado.jpg, setos_seto_boj.jpg, setos_seto_boj_calle.jpg, setos_seto_bug.jpg, setos_seto_bug_calle.jpg, setos_seto_flor.jpg, setos_seto_flor_calle.jpg, v1447_estrellas.jpg, v1447_horizonte.jpg, v1447_parterres.jpg, v1447_parterres_cerca.jpg
