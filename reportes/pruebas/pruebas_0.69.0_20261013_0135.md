# Pruebas 0.69.0 — 2026-10-13 01:35 — 22/23 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 632 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 6 s |
| 2 | `prueba_bordes.py` | **OK** | 93 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 147 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_recorte.py` | **OK** | 4 s |
| 6 | `prueba_trinidad.py` | **OK** | 15 s |
| 7 | `prueba_panel_controles.py` | **OK** | 16 s |
| 8 | `prueba_pelea_especiales.py` | **OK** | 19 s |
| 9 | `prueba_pelea_atras.py` | **OK** | 17 s |
| 10 | `prueba_bloqueo.py` | **OK** | 14 s |
| 11 | `prueba_baloncesto.py` | **OK** | 14 s |
| 12 | `prueba_futbol.py` | **OK** (repetida aparte) | 117 s |
| 13 | `prueba_canchas.py` | **OK** | 2 s |
| 14 | `prueba_ambiente.py` | **OK** | 1 s |
| 15 | `herramientas/prueba_claxon.py` | **OK** | 15 s |
| 16 | `prueba_pasos.py` | **OK** | 2 s |
| 17 | `herramientas/foto_jugador.py` | **OK** | 5 s |
| 18 | `herramientas/sonda_guia.py 284 112` | **OK** | 1 s |
| 19 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 3 s |
| 20 | `prueba_misiones_guardado.py` | **OK** | 23 s |
| 21 | `prueba_persecuciones.py` | **OK** | 31 s |
| 22 | `prueba_diario.py` | **OK** | 0 s |
| 23 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/descripciones.json`, `scripts/publicar.log`, `src/04_world.js`, `src/04b_recorte.js`, `src/05_scenery.js`, `src/05e_street.js`, `src/05f_anchieta.js`, `src/05l_tramstops.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05u_trinidad.js`, `src/09c_weapons.js`, `src/09e_cops.js`, `src/09ea_minijuegos.js`, `src/09f_basket2d.js`, `src/09g_futbol2d.js`, `src/10_audio.js`, `src/10c_steps.js`, `src/10d_ambience.js`, `src/11c_guide.js`, `src/12_missions.js`, `src/12b_food.js`, `src/12c_achaman.js`, `src/12e_save.js`, `src/13_main.js`, `tests/prueba_recorte.py`, `tests/run_test.py`, `tests/run_varios.py`, `tools/pruebas_locales.py`, `tools/trabajador.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 20, 'peor': 95, 'estado': 'play'}
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
shot ms 2.2999999970197678
{"frame":562,"calls":4244,"triangles":6607271,"points":0,"lines":1512} calls:4244
roads 99
FAIL {'off': 5, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 543, 'z': -909, 'y': -0.3}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 499, 'time': 116.4, 'x': 42, 'z': 1154, 'y': -32.8}
snap df_1287
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 14, 'time': 55.4, 'x': -391, 'z': 672, 'y': -6.1}
snap df_2295
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

### 5. prueba_recorte.py — OK

```
recortados 3419 de 6525 · siguen metidos ≥ 1 m: 155
   [-3538, -191, 5.1, '']
   [539, 1171, 4.9, 'Edificio Beneharo']
   [320, 913, 4.8, '']
   [241, 771, 4.2, '']
   [-891, 143, 3.7, '']
   [1424, 3934, 3.3, '']
   [-997, 1494, 3.3, '']
   [-938, 1479, 3.3, '']
   [-1799, -757, 3.2, '']
   [-1895, 1369, 3, '']
   [-2082, -290, 3, '']
   [3334, 1991, 3, '']
   [-4704, 100, 2.9, '']
   [242, 1249, 2.8, '']
   [-4700, 91, 2.8, '']
   [1506, 2926, 2.7, '']
   [-2768, -334, 2.7, '']
   [3165, 2044, 2.7, '']
   [1729, 3787, 2.6, 'Mercadona']
   [-642, 952, 2.6, '']
   [-115, 1263, 2.6, '']
   [-187, 709, 2.6, '']
   [-3414, -424, 2.6, '']
   [3179, 2047, 2.6, '']
   [-1119, 1755, 2.5, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 6. prueba_trinidad.py — OK

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

### 7. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":124}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 8. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":0,"gofio":true}
teide OK {"walk":1.7,"gofio":true,"teide":true}
gancho OK {"walk":1.7,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":1.7,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 9. prueba_pelea_atras.py — OK

```
{"sep":135,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 10. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 11. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [12, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[12,0]}
PARTIDO CPU OK
partido fácil 1 [26, 0]
partido fácil 2 [32, 0]
partido fácil 3 [24, 2]
equilibrio primer partido [82, 2] OK
jugadores dibujados 60
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

### 12. prueba_futbol.py — OK (repetida aparte)

```
En la carga compartida falló por:
PARTIDO CPU FALLA
FUTBOL FALLA
--- repetida aparte:
shot ms 2.7000000029802322
{"frame":562,"calls":4212,"triangles":6655420,"points":0,"lines":648} calls:4212
foto futbol_partido
cpu {'ph': 'play', 'sc': [4, 0], 'golden': False}
resultado {"won":true,"score":[4,0]}
PARTIDO CPU OK
partido fácil 1 [3, 0]
partido fácil 2 [6, 0]
partido fácil 3 [6, 0]
equilibrio primer partido [15, 0] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True, 'control': True}
RATÓN OK
campos {'campos': 79, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f66', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f66
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 13. prueba_canchas.py — OK

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
   ['mayex', 'door', 'Colegio Máyex', 1, -59, -427]
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

### 14. prueba_ambiente.py — OK

```
{"estado":"running","errores":0,"hora":"10.05"}
```

### 15. herramientas/prueba_claxon.py — OK

```
bytes 327548 errores []
```

### 16. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 17. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",-0.22,1.01,-0.24,"lowerarm_l"],["CylinderGeometry",-0.25,1.02,-0.25,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",-0.25,0.92,-0.11,"lowerarm_l"],["CylinderGeometry",-0.27,0.93,-0.12,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",-0.27,0.95,-0.09,"lowerarm_l"],["CylinderGeometry",-0.29,0.95,-0.11,"lowerarm_l"]]
```

### 18. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":2}
```

### 19. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":2}
```

### 20. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":2,"story":6,"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan."],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas."],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro."],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario."],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia."]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»"],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata."],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»"],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas."],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!"],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!"],["El Chopa","Suelta la caja de las tiritas y ven p'acá."],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja..."]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":true},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)"}
cargada: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.'], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.'], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.'], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.'], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.']], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.'], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.'], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.'], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.'], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.']], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...'], ['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 2, 'story': 6, 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}
ERRORES JS: []
CONTINUIDAD OK
```

### 21. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.86 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.18 m OK
[10] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 5 m, recorre 10 m en 3 s, salto máx 0.14 m OK
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.12 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.12 m OK
[13] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 22. prueba_diario.py — OK

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

### 23. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1791851461277,"label":"test","player":{"x":-931.2978062663914,"z":-312.0002527606812,"h":0,"health":77,"money":1234},"car":{"type":"sedan","model":"corolla","color":9083304,"h":1.8429422173260839,"x":-933.2978062663914,"z":-312.0002527606812},"weapon":{"has":true,"ammo":4,"out":true},"tod
after {"st":"play","m":{"v":2,"story":3,"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"log":{},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, claxon.webm, conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, pelea_tamano.jpg, ready.png, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_2.jpg, trinidad_rampa_2_alto.jpg
