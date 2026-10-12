# Pruebas 0.66.0 — 2026-10-12 21:23 — 18/18 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 1544 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 6 s |
| 2 | `prueba_panel_controles.py` | **OK** (repetida aparte) | 130 s |
| 3 | `prueba_canchas.py` | **OK** (repetida aparte) | 117 s |
| 4 | `prueba_baloncesto.py` | **OK** (repetida aparte) | 123 s |
| 5 | `prueba_pasos.py` | **OK** (repetida aparte) | 113 s |
| 6 | `prueba_bordes.py` | **OK** (repetida aparte) | 114 s |
| 7 | `herramientas/foto_jugador.py` | **OK** | 8 s |
| 8 | `prueba_pelea_especiales.py` | **OK** (repetida aparte) | 134 s |
| 9 | `prueba_pelea_atras.py` | **OK** (repetida aparte) | 127 s |
| 10 | `prueba_bloqueo.py` | **OK** (repetida aparte) | 127 s |
| 11 | `herramientas/sonda_guia.py 284 112` | **OK** | 3 s |
| 12 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 3 s |
| 13 | `prueba_misiones_guardado.py` | **OK** (repetida aparte) | 140 s |
| 14 | `prueba_persecuciones.py` | **OK** | 30 s |
| 15 | `prueba_diario.py` | **OK** (repetida aparte) | 58 s |
| 16 | `prueba_obispo.py` | **OK** (repetida aparte) | 122 s |
| 17 | `prueba_guardar_cargar.py` | **OK** (repetida aparte) | 60 s |
| 18 | `herramientas/foto_noche.py -42 -239 5` | **OK** | 3 s |

## Detalle

**Archivos cambiados desde la última subida a git** (eligen las pruebas): `CHANGELOG.md`, `CLAUDE.md`, `PENDIENTES.md`, `README.md`, `VERSION`, `dist/Documentacion tecnica.html`, `dist/JETA La Laguna.html`, `docs/05_jugabilidad.md`, `docs/07_pruebas.md`, `docs/referencias/colegio_mayex/mayex_1.png`, `docs/referencias/colegio_mayex/mayex_2.png`, `docs/referencias/colegio_mayex/mayex_3.png`, `docs/referencias/rios_tejera/rios_tejera_1.png`, `docs/referencias/rios_tejera/rios_tejera_2.png`, `docs/referencias/rios_tejera/rios_tejera_3.png`, `docs/referencias/rios_tejera/rios_tejera_4.png`, `docs/referencias/rios_tejera/rios_tejera_5.png`, `docs/referencias/rios_tejera/rios_tejera_6.png`, `docs/referencias/rios_tejera/rios_tejera_7.png`, `reportes/pruebas/ULTIMO.md`, `reportes/pruebas/pruebas_0.66.0_20261012_2047.md`, `scripts/PRUEBAS.bat`, `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/minijuegos.txt`, `scripts/pruebas/misiones.txt`, `src/01b_controls.js`, `src/05i_sports.js`, `src/08_player.js`, `src/09d_fight2d.js`, `src/09f_basket2d.js`, `src/11_hud.js`, `src/12_missions.js`, `src/12g_obispo.js`, `src/12h_diario.js`, `src/12i_canchas.js`, `src/13_main.js`, `tests/prueba_arranque.py`, `tests/prueba_baloncesto.py`, `tests/prueba_canchas.py`, `tests/prueba_diario.py`, `tests/prueba_obispo.py`, `tests/run_varios.py`, `tools/auditoria/LEEME.md`, `tools/auditoria/auditar.py`, `tools/auditoria/auditor.py`, `tools/auditoria/mapa_js.py`, `tools/auditoria/perfil.py`, `tools/auditoria/proyectos/jeta.json`, `tools/auditoria/resultados/historial.json`, `tools/pruebas_locales.py`, `tools/trabajador.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 20, 'peor': 95, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_panel_controles.py — OK (repetida aparte)

```
shot ms 2.2999999970197678
{"frame":562,"calls":4622,"triangles":6576459,"points":0,"lines":1944} calls:4622
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 3. prueba_canchas.py — OK (repetida aparte)

```
   ['c7', 'court', 'la cancha de Calle Las Mejoranas', 5, -172, 1042]
   ['c8', 'court', 'la cancha de Calle Llombet', 1, -217, 1092]
   ['c9', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c10', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c11', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c12', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c13', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c14', 'court', 'la cancha de baloncesto', 4, -163, -430]
   ['c15', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c16', 'door', 'la cancha (entrada por la calle)', 2, 206, 1915]
   ['c17', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c18', 'court', 'la cancha de Camino San Bartolomé de Geneto', 5, 242, 1801]
   ['c19', 'court', 'la cancha de baloncesto', 1, -167, -1106]
   ['c20', 'court', 'la cancha de Camino Fuente Cañizares', 5, -1040, -741]
   ['c21', 'door', 'la cancha (entrada por Avenida San Diego)', 4, -846, -908]
   ['c22', 'court', 'la cancha de Camino San Francisco de Paula', 4, -1129, 2004]
   ['c23', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 1, 2178, 2314]
   ['c24', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 5, 2182, 2300]
   ['c25', 'court', 'la cancha de baloncesto', 3, -116, 784]
   ['c26', 'court', 'la cancha de Calle Domingo González Pérez', 3, -637, 1575]
   ['c27', 'court', 'la cancha de Calle Domingo González Pérez', 3, -611, 1575]
   ['c28', 'court', 'la cancha de Calle Aries', 2, 1164, 1527]
   ['c29', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1979, 3754]
   ['c30', 'court', 'la cancha de baloncesto', 3, -152, 876]
   ['c31', 'court', 'la cancha de baloncesto', 4, -121, 887]
   ['c32', 'court', 'la cancha de baloncesto', 1, -140, 878]
   ['c33', 'court', 'la cancha de baloncesto', 1, -1383, -918]
   ['c34', 'court', 'la cancha de Camino Vereda Barbados', 5, -1198, -1020]
   ['c35', 'court', 'la cancha de baloncesto', 4, -1361, -930]
   ['c36', 'door', 'la cancha (entrada por la calle)', 4, -1266, -1045]
   ['c37', 'door', 'la cancha (entrada por la calle)', 4, -1271, -1048]
   ['c38', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1691, 2095]
   ['c39', 'court', 'la cancha de Camino San Bartolomé de Geneto', 1, 236, 1782]
   ['c40', 'court', 'la cancha de Cancha 6º', 5, 1580, 1141]
   ['c41', 'court', 'la cancha de baloncesto', 5, 1074, 2575]
   ['c42', 'court', 'la cancha de Calle Saturno', 3, 814, 1523]
   ['c43', 'court', 'la cancha de Calle Clemencia Hardisson', 4, 845, 1509]
   ['c44', 'court', 'la cancha de baloncesto', 1, 800, 1413]
   ['c45', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1966, 3829]
   ['c46', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 2, 1966, 3803]
   ['c47', 'court', 'la cancha de Calle Antonio Hernandez Arrón', 2, -1332, -626]
   ['c48', 'court', 'la cancha de Camino Tornero', 1, -1314, -650]
   ['c49', 'court', 'la cancha de baloncesto', 4, -1295, -467]
   ['c50', 'court', 'la cancha de baloncesto', 2, -1329, -474]
   ['c51', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1506, -508]
   ['c52', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 2, -1468, -512]
   ['c53', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1479, -526]
   ['c54', 'court', 'la cancha de Carretera General del Norte', 5, -1356, -318]
   ['c55', 'court', 'la cancha de "Avenida del Colesterol"', 3, 1828, 2050]
   ['mayex', 'door', 'Colegio Máyex', 1, -61, -417]
   ['c57', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1787, 2292]
   ['c58', 'court', 'la cancha de baloncesto', 1, 139, -993]
   ['c59', 'court', 'la cancha de baloncesto', 5, -641, 336]
torneo ['Torneo Lagunero 1/5', 'Torneo Lagunero 2/5', 'Torneo Lagunero 3/5', 'Torneo Lagunero 4/5', 'Torneo Lagunero: la final']
mayex puerta detectada: mayex
snap entrada_mayex
riostejera puerta detectada: riostejera
snap entrada_rios_tejera
errores JS []
CANCHAS OK
```

### 4. prueba_baloncesto.py — OK (repetida aparte)

```
shot ms 2.399999998509884
{"frame":562,"calls":4557,"triangles":6520456,"points":0,"lines":1728} calls:4557
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [13, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[13,2]}
PARTIDO CPU OK
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

### 5. prueba_pasos.py — OK (repetida aparte)

```
shot ms 2.5
{"frame":562,"calls":4740,"triangles":6594375,"points":0,"lines":1944} calls:4740
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 6. prueba_bordes.py — OK (repetida aparte)

```
shot ms 4.0
{"frame":564,"calls":4600,"triangles":6499849,"points":0,"lines":1512} calls:4600
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 7. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",0.29,0.93,0.03,"lowerarm_l"],["CylinderGeometry",0.32,0.94,0.04,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",0.3,0.94,0.01,"lowerarm_l"],["CylinderGeometry",0.32,0.95,0.03,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",0.29,0.93,0.01,"lowerarm_l"],["CylinderGeometry",0.32,0.93,0.02,"lowerarm_l"]]
```

### 8. prueba_pelea_especiales.py — OK (repetida aparte)

```
shot ms 2
{"frame":562,"calls":4504,"triangles":6600189,"points":0,"lines":1728} calls:4504
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":1.7,"gofio":true}
teide OK {"walk":1.7,"gofio":true,"blocked":true,"teide":true}
gancho OK {"walk":1.7,"gofio":true,"blocked":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":1.7,"gofio":true,"blocked":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 9. prueba_pelea_atras.py — OK (repetida aparte)

```
shot ms 4.700000002980232
{"frame":562,"calls":4586,"triangles":6566723,"points":0,"lines":1944} calls:4586
{"sep":123,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 78.0 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 10. prueba_bloqueo.py — OK (repetida aparte)

```
shot ms 2.7999999970197678
{"frame":562,"calls":4524,"triangles":6557065,"points":0,"lines":1512} calls:4524
true
{"ph":"fight","ev":{"walk":373.10000000000196},"hp":100,"dir":1}
```

### 11. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

### 12. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

### 13. prueba_misiones_guardado.py — OK (repetida aparte)

```
shot ms 2.5
{"frame":564,"calls":4745,"triangles":6577729,"points":0,"lines":2376} calls:4745
a mitad: {"act":"Atraco en la farmacia","m":{"v":2,"story":6,"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»"],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata."],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»"],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas."],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!"],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!"],["El Chopa","Suelta la caja de las tiritas y ven p'acá."],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja..."]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":""}
cargada: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...'], ['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 2, 'story': 6, 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}
ERRORES JS: []
CONTINUIDAD OK
```

### 14. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.86 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[10] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.15 m OK
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 14 m en 3 s, salto máx 0.16 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.16 m OK
[13] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 15. prueba_diario.py — OK (repetida aparte)

```
shot ms 3.5
{"frame":562,"calls":4472,"triangles":6543995,"points":0,"lines":2160} calls:4472
activa Una botella para Coco
abierto True misiones 27
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal |  | Coco: ¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios. |  | Coco: ¿El Chopa? ¿El amigo de El Blanco? Ah
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 16. prueba_obispo.py — OK (repetida aparte)

```
shot ms 2.4000000059604645
{"frame":562,"calls":4586,"triangles":6556339,"points":0,"lines":1512} calls:4586
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 18, 'pitches': 161}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-63.254694489991394,-417.0525250427158,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 17. prueba_guardar_cargar.py — OK (repetida aparte)

```
shot ms 2.1999999955296516
{"frame":562,"calls":4415,"triangles":6556599,"points":0,"lines":1728} calls:4415
saved {"v":1,"t":1791836550994,"label":"test","player":{"x":-211.04453584070316,"z":780.2358686130583,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":3.0123732081837398,"x":-213.04453584070316,"z":780.2358686130583},"weapon":{"has":true,"ammo":4,"out":
after {"st":"cutscene","m":{"v":2,"story":0,"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"log":{},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false},"active":null},"money":5,"hp":20,"tod":3.00125,"car":true,"w":true,"ammo":4,"title":"Vuelta al barrio"}
latest 2
ERR []
```

### 18. herramientas/foto_noche.py -42 -239 5 — OK

```
fotogramas 0-1: 3.43 % de píxeles cambian
fotogramas 1-2: 1.59 % de píxeles cambian
fotogramas 2-3: 0.59 % de píxeles cambian
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, fightgo.png, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, noche_1.jpg, noche_2.jpg, obispado.jpg, pelea_tamano.jpg, ready.png, sonda_guia.jpg
