# Pruebas 0.67.0 — 2026-10-12 22:39 — 10/10 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 224 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_panel_controles.py` | **OK** | 112 s |
| 3 | `prueba_futbol.py` | **OK** | 6 s |
| 4 | `prueba_canchas.py` | **OK** | 4 s |
| 5 | `prueba_misiones_guardado.py` | **OK** | 22 s |
| 6 | `prueba_persecuciones.py` | **OK** | 30 s |
| 7 | `prueba_diario.py` | **OK** | 0 s |
| 8 | `prueba_obispo.py` | **OK** | 7 s |
| 9 | `prueba_baloncesto.py` | **OK** | 15 s |
| 10 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/descripciones.json`, `scripts/pruebas/minijuegos.txt`, `scripts/publicar.log`, `src/01b_controls.js`, `src/09g_futbol2d.js`, `src/12_missions.js`, `src/12g_obispo.js`, `src/12i_canchas.js`, `src/12j_campos.js`, `src/13_main.js`, `tests/prueba_futbol.py`, `tests/run_varios.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 99, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":102}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 3. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [0, 1], 'golden': False}
resultado {"won":false,"score":[0,1]}
PARTIDO CPU OK
partido fácil 1 [2, 0]
partido fácil 2 [8, 1]
partido fácil 3 [5, 0]
equilibrio primer partido [15, 1] OK
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

### 4. prueba_canchas.py — OK

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

### 5. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":2,"story":6,"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan."],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas."],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro."],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario."],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia."]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»"],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata."],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»"],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas."],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!"],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!"],["El Chopa","Suelta la caja de las tiritas y ven p'acá."],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja..."]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":true},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Ya puedes retar a la gente en cualquier campo de fútbol (E, balón blanco)."}
cargada: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.'], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.'], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.'], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.'], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.']], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 2, 'story': 6, 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.'], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.'], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.'], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.'], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.']], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.'], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»'], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.'], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!'], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!'], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá."], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...'], ['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»'], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.']]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': True}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 2, 'story': 6, 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}
ERRORES JS: []
CONTINUIDAD OK
```

### 6. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.86 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[10] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 5 m, recorre 14 m en 3 s, salto máx 0.16 m OK
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 14 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.17 m OK
[13] La guagua de la broma: coche: a 1366 m, recorre 22 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 7. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 29
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal |  | Coco: ¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios. |  | Coco: ¿El Chopa? ¿El amigo de El Blanco? Ah
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 8. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 21, 'pitches': 161}
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

### 9. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,0]}
PARTIDO CPU OK
partido fácil 1 [18, 0]
partido fácil 2 [20, 0]
partido fácil 3 [22, 0]
equilibrio primer partido [60, 0] OK
jugadores dibujados 62
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

### 10. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1791841180366,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":2.8023000391357478,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":2,"story":3,"storyDone":false,"side":1,"sideOpen":true,"obispo":1,"torneo":0,"log":{"Un partido por la Catedral":[["Monseñor Fermín Truchas","Pasa, hijo, pasa. Soy Fermín Truchas, obispo de Nivaria por la gracia de Dios y por un error administrativo del Vaticano."],["Monseñor Fermín Truchas","Me han dicho que tu banda ayuda al alcalde. Pues el Señor también tiene goteras: el tejado de la Catedral, el campanario de La Concepción, el órgano de Santo Domingo que suena como una guagua…"],["El Chopa","¿Y qué quiere, Monseñor? ¿Que robe un banco? Que yo eso ya lo dejé."],["Monseñor Fermín Truchas","¡Válgame! No, no. Partidos benéficos. La gente paga por ver. Hoy jugáis en el patio del Colegio Máyex contra mis seminaristas, el hermano Tomás y el hermano Lucas. Las monjas os abren la puerta."],["Monseñor Fermín Truchas","Son buenos chicos, pero tiran a canasta como rezan: con los ojos cerrados. Llévate a Coco, que tiene brazos de boxeador. Lo recaudado, para la obra de la iglesia… y una parte para vosotros, que el obrero merece su salario. Lucas 10,7."],["Hermano Tomás","12 a 4... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo."]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":true,"futbolTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, obispado.jpg, ready.png
