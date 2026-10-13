# Pruebas 0.75.0 — 2026-10-13 14:47 — 20/21 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 652 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 7 s |
| 2 | `prueba_bordes.py` | **OK** | 90 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 39 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 10 s |
| 6 | `prueba_grandes.py` | **OK** | 21 s |
| 7 | `prueba_canchas.py` | **OK** | 2 s |
| 8 | `prueba_baloncesto.py` | **OK** | 15 s |
| 9 | `prueba_futbol.py` | **OK** | 6 s |
| 10 | `prueba_075.py` | **FALLA** (repetida aparte) | 123 s |
| 11 | `prueba_panel_controles.py` | **OK** | 18 s |
| 12 | `prueba_pelea_especiales.py` | **OK** | 21 s |
| 13 | `prueba_pelea_atras.py` | **OK** | 20 s |
| 14 | `prueba_bloqueo.py` | **OK** | 16 s |
| 15 | `prueba_maleantes.py` | **OK** | 7 s |
| 16 | `herramientas/sonda_guia.py 284 112` | **OK** | 3 s |
| 17 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 3 s |
| 18 | `prueba_misiones_guardado.py` | **OK** | 23 s |
| 19 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 150 s |
| 20 | `prueba_diario.py` | **OK** | 0 s |
| 21 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/publicar.log`, `src/04_world.js`, `src/05i_sports.js`, `src/05v_peraza.js`, `src/09d_fight2d.js`, `src/09ea_minijuegos.js`, `src/09g_futbol2d.js`, `src/11_hud.js`, `src/11c_guide.js`, `src/12_missions.js`, `src/12f_story2.js`, `src/12h_diario.js`, `src/12j_campos.js`, `src/13_main.js`, `tests/prueba_075.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 22, 'peor': 76, 'estado': 'play'}
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

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 5.5, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 20.9, 'x': 543, 'z': -908, 'y': -0.3}
snap df_308
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 501, 'time': 116.4, 'x': 44, 'z': 1156, 'y': -32.8}
snap df_1287
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 7, 'time': 55.4, 'x': -386, 'z': 677, 'y': -7.2}
snap df_2295
failed 0 of 112 · conocidos 3
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 543 Z -908, Autopista del Norte X 44 Z 1156, Autopista del Norte X -386 Z 677
CONDUCCION OK
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 5. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 4143
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 6. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 299, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 670}
callejero [['Calle Bencomo', True], ['Calle Juan de Vera', True], ['Calle Rodriguez Moure', True], ['Calle Ascanio y Nieves', True]]
avion {'despega': True, 'pasos': [[-1118, 0, True], [-1149, 0, True], [-1228, 0, True], [-1355, 0, True], [-1529, 0, True], [-1752, 0, True], [-2023, 26, True], [-2315, 70, True], [-2607, 114, True], [-2899, 157, True]]}
foto grandes_obispado
foto grandes_tranvia_trinchera
foto grandes_tranvia_cenital
foto grandes_tranvia_dentro
foto grandes_tranvia_alto
foto grandes_tf13_suelo
foto grandes_tf13_alto
foto grandes_guajara
foto grandes_aeropuerto_terminal
foto grandes_aeropuerto_naves
foto grandes_aeropuerto_depositos
foto grandes_callejero_bencomo
errores JS []
GRANDES OK
```

### 7. prueba_canchas.py — OK

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
   ['mayex', 'door', 'Colegio Máyex', 1, -61, -426]
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

### 8. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [6, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[6,0]}
PARTIDO CPU OK
partido fácil 1 [17, 2]
partido fácil 2 [11, 3]
partido fácil 3 [24, 6]
equilibrio primer partido [52, 11] OK
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

### 9. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [2, 0], 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [6, 0]
partido fácil 2 [2, 0]
partido fácil 3 [2, 0]
equilibrio primer partido [10, 0] OK
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

### 10. prueba_075.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V075 FALLA
--- repetida aparte:
shot ms 2.2999999970197678
{"frame":562,"calls":4021,"triangles":6780646,"points":0,"lines":1296} calls:4021
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 7}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 14.43}
diario {'primera': ['Primero', 'Charlas sueltas'], 'n': 2}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 FALLA
```

### 11. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 12. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":8.5,"gofio":true}
teide OK {"walk":20.9,"gofio":true,"teide":true}
gancho OK {"walk":20.9,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":20.9,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 13. prueba_pelea_atras.py — OK

```
{"sep":130,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 78.0 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 14. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 15. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Tuerto de Taco', 't': 239.70000000000002, 'd': 59}
en_minimapa True
pelea True
rival {'name': 'EL TUERTO DE TACO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 16. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 17. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 18. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1791898828782],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1791898828815],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1791898828818],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1791898828821],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1791898830384],["Primero","hola",1791898832905],["Segundo","adiós",1791898832905]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1791898931144],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1791898931151],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1791898931171],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1791898931198],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1791898931222],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1791898931292],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1791898931322],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1791898944746]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":true,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":true},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1791898828782], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1791898828815], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1791898828818], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1791898828821], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1791898830384], ['Primero', 'hola', 1791898832905], ['Segundo', 'adiós', 1791898832905]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1791898931144], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1791898931151], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1791898931171], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1791898931198], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1791898931222], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1791898931292], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1791898931322], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1791898944746]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1791898828782], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1791898828815], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1791898828818], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1791898828821], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1791898830384], ['Primero', 'hola', 1791898832905], ['Segundo', 'adiós', 1791898832905]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1791898950063], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1791898950074]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 19. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 3.2999999970197678
{"frame":562,"calls":4060,"triangles":6616334,"points":0,"lines":1728} calls:4060
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.50 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.13 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 20. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 35
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a las ruinas de San Agustín | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 21. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1791898993865,"label":"test","player":{"x":-211.05099657639772,"z":780.2855881877514,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":3.0123732081837398,"x":-213.05099657639772,"z":780.2855881877514},"weapon":{"has":true,"ammo":4,"out":true},"tod":15.5,
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"log":{},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":true,"defenders":true,"patrol":false,"basketTut":false,"futbolTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, pelea_tamano.jpg, ready.png, sonda_guia.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg
