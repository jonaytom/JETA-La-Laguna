# Pruebas 1.2.6 — 2026-11-10 15:40 — 17/18 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 511 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_panel_controles.py` | **OK** | 71 s |
| 3 | `prueba_pelea_especiales.py` | **OK** | 13 s |
| 4 | `prueba_pelea_atras.py` | **OK** | 11 s |
| 5 | `prueba_bloqueo.py` | **OK** | 10 s |
| 6 | `prueba_maleantes.py` | **OK** | 1 s |
| 7 | `prueba_089.py` | **OK** | 1 s |
| 8 | `prueba_076.py` | **FALLA** (repetida aparte) | 103 s |
| 9 | `prueba_0821.py` | **OK** | 0 s |
| 10 | `prueba_misiones_guardado.py` | **OK** | 20 s |
| 11 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 102 s |
| 12 | `prueba_diario.py` | **OK** | 0 s |
| 13 | `prueba_0851.py` | **OK** | 4 s |
| 14 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 15 | `prueba_121.py` | **OK** | 0 s |
| 16 | `prueba_120.py` | **OK** | 0 s |
| 17 | `prueba_119.py` | **OK** | 0 s |
| 18 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 83 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/pruebas/obstaculos.txt`, `scripts/pruebas/origen_obst.txt`, `scripts/pruebas/pelea_esp.txt`, `scripts/publicar.log`, `src/09d_fight2d.js`, `src/09h_maleantes.js`, `src/12_missions.js`, `src/12f_story2.js`, `src/13_main.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 31, 'peor': 99, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":105}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 3. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":10.299999999999999,"gofio":true}
teide OK {"walk":21.9,"gofio":true,"teide":true}
gancho OK {"walk":21.9,"gofio":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":21.9,"gofio":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 4. prueba_pelea_atras.py — OK

```
{"sep":160,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 5. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":390.0000000000021},"hp":100,"dir":1}
```

### 6. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Tuerto de Taco', 't': 239.70000000000002, 'd': 112}
en_minimapa True
pelea True
rival {'name': 'EL TUERTO DE TACO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 7. prueba_089.py — OK

```
pausa basket True False
basket {'conBalon': True, 'ahora': ['EL CHOPA']}
ayuda {'moved': [3.9, 4, 4.1]}
combo sin acertar {'t': 2.7, 'vuela': True, 'miss': True, 'sc': 0, 'fase': 'play', 'n': 77, 'suelto': 'held', 'mate': 'hierro'}
futbol {'ctl': True, 'kickCD': 0.5833333333333333, 'cd0': 0, 'mio': False, 'suelto': True}
pausa máquina True False
foto v089_bencomo play
PAUSA OK
CONTROL BASKET OK
ENTRADA FUTBOL OK
BENCOMO OK
COMBO SIN ACERTAR OK
errores []
PRUEBA 089 OK
```

### 8. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 25.100000001490116
{"frame":566,"calls":1531,"triangles":2561843,"points":0,"lines":0} calls:1531
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [-0.1, -2.6, 12.5], 'charcos': [[0.5, 7]], 'apuntando': False, 'mano': [-0.08, 8.12, 0.25]}, 'gotas': 12, 'charcos': 3, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 94%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado None
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-621.1913417161826, -300.4619397662556, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'El torneo de la parroquia', 'Un partido por La Concepción', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1250, 1524]}
foto v076_secreta
  empieza ['secreta', 0, 'Tostón, de la Secreta', 'sin círculo', '{"activa":null,"estado":"siguiente,pendiente,pendiente,pendiente,pendiente,pendiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['secreta', 1, 'Contenedores en llamas', 'sin círculo', '{"activa":null,"estado":"hecha,siguiente,pendiente,pendiente,pendiente,pendiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['secreta', 2, 'El partido amañado', 'sin círculo', '{"activa":null,"estado":"hecha,hecha,siguiente,pendiente,pendiente,pendiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['secreta', 3, 'Triple en la cancha', 'sin círculo', '{"activa":null,"estado":"hecha,hecha,hecha,siguiente,pendiente,pendiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['secreta', 4, 'Al pirómano, agua', 'sin círculo', '{"activa":null,"estado":"hecha,hecha,hecha,hecha,siguiente,pendiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['secreta', 5, 'Operación Gofio Blanco', 'sin círculo', '{"activa":null,"estado":"hecha,hecha,hecha,hecha,hecha,siguiente","bloqueada":false,"colores":["#b388ff","#ff5fa2","#00e5ff"],"estadoJuego":"play"}']
  empieza ['carreras', 0, 'Duelo nocturno en Los Rodeos', 'Duelo nocturno en Los Rodeos', True]
  empieza ['carreras', 1, 'Contrarreloj por el casco', 'Contrarreloj por el casco', True]
  empieza ['carreras', 2, 'Gran Premio de La Laguna', 'Gran Premio de La Laguna', True]
  empieza ['obispo', 4, 'Fuego en la ermita', 'Fuego en la ermita', True]
  empieza ['obispo', 5, 'La carrera de los sacristanes', 'La carrera de los sacristanes', True]
  empieza ['obispo', 6, 'Curas contra concejales', 'Curas contra concejales', True]
  empieza ['obispo', 7, 'El ladrón del cepillo', 'El ladrón del cepillo', True]
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 1, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 FALLA
```

### 9. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 1, 'ultima': 'Prueba de la máquina'}
MOVIL OK
lo que sabes {'sabes': True, 'sabidos': ['Maleantes en busca y captura', 'La máquina de El Blanco: BENCOMO', 'GUFO, AGUERE INVASION', 'GUANCHE GUARRIORS', 'Las jugueterías', 'Retos en las canchas'], 'detalle_quien': True, 'detalle_donde': True, 'detalle_charla': True}
(sin foto) v0821_diario_sabes
maleantes {'maleantes': True}
(sin foto) v0821_diario_maleantes
SABES OK
jugueterías en el mapa {'abierto': True, 'cercana': 'Juguetes Sabelotodo', 'metros': 180, 'mapa': True, 'texto': True, 'gps': True, 'cerrado': True}
foto v0822_mapa
MAPA OK
errores []
PRUEBA 0821 OK
```

### 10. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1794324870879],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1794324870899],["El Chopa","¿Y si me gana él?",1794324870905],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1794324870910]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1794324870984],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1794324871005],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1794324871010],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1794324871015],["Rayco «El Blanco»","«Psss... siesta.»",1794324871071],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1794324871104],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1794324871121]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1794324878594],["El Chopa","Eso no puede ser legal.",1794324878629],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1794324878642]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1794324878738],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1794324878775]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1794324878863],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1794324878901],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1794324878910]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1794324879040],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1794324879075],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1794324879081]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1794324882702],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1794324882757],["El Chopa","Monseñor, ¿esto es legal?",1794324882762],["Monseñor Fermín Truchas","Hijo, es fútbol.",1794324882769]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1794324882842],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1794324882885]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1794324890780]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1794324891236],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1794324891267],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1794324891316],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1794324891346],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1794324891365],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1794324891452],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1794324891495],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1794324901533]]},"gang":{"formed":false,"name":"","members":[],"arcade":{"scores":{"prueba":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]]},"bought":[],"console":false,"invited":false},"sastronTut":true,"maleIntro":true,"jugueterias":true,"casa":{"intro":false,"owned":[],"rent":null,"day":1,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Ruta marcada en el GPS: Juguetes Sabelotodo"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1794324870879], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1794324870899], ['El Chopa', '¿Y si me gana él?', 1794324870905], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1794324870910]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1794324870984], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1794324871005], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1794324871010], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1794324871015], ['Rayco «El Blanco»', '«Psss... siesta.»', 1794324871071], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1794324871104], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1794324871121]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1794324878594], ['El Chopa', 'Eso no puede ser legal.', 1794324878629], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1794324878642]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1794324878738], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1794324878775]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1794324878863], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1794324878901], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1794324878910]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1794324879040], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1794324879075], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1794324879081]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1794324882702], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1794324882757], ['El Chopa', 'Monseñor, ¿esto es legal?', 1794324882762], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1794324882769]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1794324882842], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1794324882885]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794324890780]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794324891236], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794324891267], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1794324891316], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1794324891346], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1794324891365], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1794324891452], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1794324891495], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1794324901533]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'arcade': {'scores': {'prueba': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'maleIntro': True, 'jugueterias': True, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.037111111111058}, 'defenders': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1794324870879], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1794324870899], ['El Chopa', '¿Y si me gana él?', 1794324870905], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1794324870910]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1794324870984], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1794324871005], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1794324871010], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1794324871015], ['Rayco «El Blanco»', '«Psss... siesta.»', 1794324871071], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1794324871104], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1794324871121]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1794324878594], ['El Chopa', 'Eso no puede ser legal.', 1794324878629], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1794324878642]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1794324878738], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1794324878775]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1794324878863], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1794324878901], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1794324878910]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1794324879040], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1794324879075], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1794324879081]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1794324882702], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1794324882757], ['El Chopa', 'Monseñor, ¿esto es legal?', 1794324882762], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1794324882769]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1794324882842], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1794324882885]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794324890780]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794324906962], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794324906975]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'arcade': {'scores': {'prueba': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'maleIntro': True, 'jugueterias': True, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.041555555555496}, 'defenders': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'maleIntro': False, 'jugueterias': False, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'defenders': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 11. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 20.900000002235174
{"frame":564,"calls":1514,"triangles":2508673,"points":0,"lines":0} calls:1514
[6] Atraco en la farmacia: a pie: a 1 m, recorre 0 m en 3 s, salto máx 0.64 m OK
[8] Los bancos del Adelantado: a pie: a 4 m, recorre 5 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.17 m OK
[12] El rally de La Esperanza: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.14 m OK | a pie: a 10 m, recorre 10 m en 3 s, salto máx 0.14 m OK
[17] Noche en el aeropuerto: coche: a 24 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 12. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 7
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 13. prueba_0851.py — OK

```
esc {'antes': 'none', 'enJuego': 'attract', 'tras1': {'mode': 'menu', 'running': True}, 'fuera': True, 'estado': 'play', 'pausa': 'none'}
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
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [44.2, 44.4], "t": [0.2, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.5, 43.6], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.5, 43.6], "t": [0, 0, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [43.9, 44], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.2, 44.2], "t": [0.1, 0, 0], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.2, 44.2], "t": [0.1, 0, 0], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [42.5, 44.3], "t": [1.1, 1.8, 2.2], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.3, 0, 0.3], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.3, 0, 0.3], "mat": "5ec8ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.5], "t": [0.1, 0.2, 0.2], "mat": "1e1f22"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.5], "t": [0.1, 0.1, 0.1], "mat": "3a2a20"}]
errores []
PRUEBA 0851 OK
```

### 14. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1794324950155,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1794324935627]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":true,"maleIntro":false,"jugueterias":false,"basketTut":false,"futbolTut":false,"patrol":false,"defenders":true,"rifleTut":false,"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 15. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC', 'trozos': 30, 'puntos': 511, 'eje': 3199, 'lado': 1, 'ramales': 14, 'tramosParalelos': 77}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 16. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 7, 'twins': 4, 'estrechadas': 7, 'misma_altura': 0, 'anchos': [[4.5, 8], [8, 8], [4.5, 4.5], [4.5, 4.5]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 17. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 14, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

### 18. prueba_conduccion_tuneles_puentes.py — OK

```
roads 132
failed 0 of 132 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, fightgo.png, pelea_tamano.jpg, ready.png, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v0822_mapa.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v089_bencomo.jpg
