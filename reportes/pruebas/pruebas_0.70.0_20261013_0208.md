# Pruebas 0.70.0 — 2026-10-13 02:08 — 16/18 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 879 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 11 s |
| 2 | `prueba_bordes.py` | **OK** | 91 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 148 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **FALLA** (repetida aparte) | 125 s |
| 6 | `prueba_recorte.py` | **OK** | 4 s |
| 7 | `prueba_trinidad.py` | **OK** | 16 s |
| 8 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 9 | `prueba_panel_controles.py` | **OK** | 16 s |
| 10 | `prueba_pelea_especiales.py` | **OK** | 17 s |
| 11 | `prueba_pelea_atras.py` | **OK** | 17 s |
| 12 | `prueba_bloqueo.py` | **OK** | 14 s |
| 13 | `prueba_maleantes.py` | **OK** | 5 s |
| 14 | `prueba_misiones_guardado.py` | **OK** | 22 s |
| 15 | `prueba_persecuciones.py` | **OK** | 31 s |
| 16 | `prueba_diario.py` | **OK** | 0 s |
| 17 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 18 | `herramientas/sonda_zonas.py` | **OK** | 287 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/descripciones.json`, `scripts/publicar.log`, `src/04_world.js`, `src/04b_recorte.js`, `src/05_scenery.js`, `src/05e_street.js`, `src/05f_anchieta.js`, `src/05l_tramstops.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05q_inicio.js`, `src/05r_aeropuerto.js`, `src/09d_fight2d.js`, `src/09h_maleantes.js`, `src/12_missions.js`, `src/12f_story2.js`, `src/13_main.js`, `tests/herramientas/LEEME.md`, `tests/herramientas/sonda_zonas.py`, `tests/prueba_maleantes.py`, `tests/prueba_pendientes_faciles.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 32, 'peor': 152, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 3. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.600000001490116
{"frame":564,"calls":4218,"triangles":6563772,"points":0,"lines":1728} calls:4218
roads 99
FAIL {'off': 5.4, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 543, 'z': -908, 'y': -0.3}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 502, 'time': 116.4, 'x': 44, 'z': 1157, 'y': -32.9}
snap df_1287
FAIL {'off': 0.6, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.6, 'x': 1220, 'z': 2534, 'y': -123.5}
snap df_1667
failed 3 of 99
CONDUCCION FALLA
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 5. prueba_pendientes_faciles.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
FACILES FALLA
--- repetida aparte:
shot ms 3.5999999940395355
{"frame":564,"calls":4216,"triangles":6621886,"points":0,"lines":1080} calls:4216
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via [[-3242, 125], [-3143, 164], [-3176, 150], [-3071, 191], [-3037, 204], [-3315, -7], [-2976, 225], [-2962, 232], [-3301, 103]]
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0], [1692, 4082, 0.6]]
recortados 4037
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES FALLA
```

### 6. prueba_recorte.py — OK

```
recortados 4037 de 6525 · siguen metidos ≥ 1 m: 95
   [-3538, -191, 5.1, '']
   [1627, 3418, 4.8, 'Hiunday']
   [241, 771, 4.2, '']
   [-892, 142, 3.9, '']
   [-1454, -253, 3.8, '']
   [2116, 1605, 3.8, '']
   [-4669, -40, 3.8, '']
   [1781, 4090, 3.8, '']
   [884, 1655, 3.7, '']
   [1178, 1126, 3.7, '']
   [-1073, 1767, 3.6, '']
   [-1100, 1765, 3.5, '']
   [2412, 1952, 3.5, '']
   [-434, -779, 3.4, '']
   [-1062, 1770, 3.3, '']
   [1424, 3934, 3.3, '']
   [-938, 1479, 3.3, '']
   [-1799, -757, 3.2, '']
   [2620, 2005, 3.2, '']
   [848, 1667, 3.1, '']
   [-4704, 100, 2.9, '']
   [-1248, -405, 2.9, '']
   [-293, -415, 2.8, '']
   [2292, 1448, 2.8, '']
   [-4700, 91, 2.8, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 7. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad Casco Histórico', 'x': -113, 'z': 105, 'yF': -11.2}, {'name': 'Parking Trinidad Centro', 'x': -225, 'z': 457, 'yF': -11.1}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad Casco Histórico', 'rampa': [-85, 28], 'profundidad': 7.8, 'en_sala': True, 'fin': [-104, 82]}
coche {'aparcamiento': 'Parking Trinidad Centro', 'rampa': [-244, 524], 'profundidad': 5.8, 'en_sala': True, 'fin': [-227, 469]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_2
foto trinidad_rampa_2_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 8. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 9. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 10. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":10.299999999999999,"gofio":true}
teide OK {"walk":20.6,"gofio":true,"teide":true}
gancho OK {"walk":20.6,"gofio":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":20.6,"gofio":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 11. prueba_pelea_atras.py — OK

```
{"sep":129,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":false,"vida":100}
snap pelea_tamano
```

### 12. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 13. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Tuerto de Taco', 't': 239.70000000000002, 'd': 65}
en_minimapa True
pelea True
rival {'name': 'EL TUERTO DE TACO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 14. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":2,"story":6,"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»"],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata."],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»"],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas."],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!"],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!"],["El Chopa","Suelta la caja de las tiritas y ven p'acá."],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja..."]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":true,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"¡El Tuerto de Taco capturado! Recompensa +$150"}
cargada: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...'], ['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 2, 'story': 6, 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}
ERRORES JS: []
CONTINUIDAD OK
```

### 15. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.49 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.20 m OK
[10] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 8 m, recorre 10 m en 3 s, salto máx 0.13 m OK
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.13 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.13 m OK
[13] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 16. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 29
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a las ruinas de San Agustín |  | Coco: ¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios. |  | Coco: ¿El Chopa? ¿El amigo de El
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 17. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1791853156568,"label":"test","player":{"x":-188.85866389791946,"z":783.1693376318474,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791946,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out":true},"tod":15.5
after {"st":"play","m":{"v":2,"story":3,"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"log":{},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 18. herramientas/sonda_zonas.py — OK

```
inicio (casa de El Blanco) [-754, -362]
[0] Vuelta al barrio: se recoge en [-753, -361] (a 1 m del inicio, 1 m de la anterior) · objetivos [] · el más lejano a 0 m
[1] Una botella para Coco: se recoge en [-217, -305] (a 540 m del inicio, 539 m de la anterior) · objetivos [[-254, -248]] · el más lejano a 68 m
[2] Sastrón: se recoge en [-298, -259] (a 467 m del inicio, 45 m de la anterior) · objetivos [] · el más lejano a 0 m
[3] La firma de la banda: se recoge en [-532, -354] (a 222 m del inicio, 253 m de la anterior) · objetivos [] · el más lejano a 0 m
[4] Boca Papa te enseña a comer: se recoge en [-532, -354] (a 222 m del inicio, 0 m de la anterior) · objetivos [[-464, -317]] · el más lejano a 77 m
[5] El campo de tiro de El Blanco: se recoge en [-753, -361] (a 1 m del inicio, 292 m de la anterior) · objetivos [] · el más lejano a 0 m
[6] Atraco en la farmacia: se recoge en [-729, -350] (a 28 m del inicio, 26 m de la anterior) · objetivos [] · el más lejano a 0 m
[7] Defensores de La Laguna: se recoge en [106, 32] (a 946 m del inicio, 918 m de la anterior) · objetivos [] · el más lejano a 0 m
[8] El carterista del Cristo: se recoge en [-217, -304] (a 540 m del inicio, 466 m de la anterior) · objetivos [[273, -609]] · el más lejano a 577 m
[9] Baches en la Vía de Ronda: se recoge en [106, 32] (a 946 m del inicio, 662 m de la anterior) · objetivos [[118, 36], [621, 492], [721, 849], [915, 1148], [1115, 1072], [1396, 933]] · el más lejano a 1573 m
[10] El rally de La Esperanza: se recoge en [-170, 265] (a 857 m del inicio, 1703 m de la anterior) · objetivos [[471, 280], [620, 487], [677, 762], [809, 961], [954, 1222], [1091, 1076]] · el más lejano a 1698 m
[11] Los bancos del Adelantado: se recoge en [106, 32] (a 946 m del inicio, 1594 m de la anterior) · objetivos [[-246, -451]] · el más lejano a 598 m
[12] Grafiteros en el tranvía: se recoge en [-297, -259] (a 468 m del inicio, 199 m de la anterior) · objetivos [[1765, 2651]] · el más lejano a 3567 m
[13] La guagua de la broma: se recoge en [-532, -354] (a 222 m del inicio, 3782 m de la anterior) · objetivos [[-522, 1014], [-507, 987], [-486, 954], [-465, 920], [-443, 886]] · el más lejano a 1368 m
[14] Escolta a la guagua del Romero: se recoge en [106, 32] (a 946 m del inicio, 1015 m de la anterior) · objetivos [[109, 36]] · el más lejano a 5 m
[15] El gofio robado: se recoge en [-532, -354] (a 222 m del inicio, 750 m de la anterior) · objetivos [[-52, -96], [-301, -261], [640, -564], [-533, -356]] · el más lejano a 1191 m
[16] Carrera solidaria del casco: se recoge en [106, 32] (a 946 m del inicio, 748 m de la anterior) · objetivos [[123, -33], [182, 133], [-52, -96], [-97, -183], [106, 32]] · el más lejano a 296 m
[17] Noche en el aeropuerto: se recoge en [-753, -361] (a 1 m del inicio, 945 m de la anterior) · objetivos [[-3888, -188]] · el más lejano a 3140 m
ZONAS OK (datos en tests/shots/sonda_zonas.json)
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_1667.jpg, df_308.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, pelea_tamano.jpg, ready.png, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_zonas.json, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_2.jpg, trinidad_rampa_2_alto.jpg
