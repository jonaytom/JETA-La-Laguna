# Pruebas 1.4.16 — 2026-11-17 08:27 — 20/22 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 817 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 3 | `prueba_freno_mano.py` | **OK** | 294 s |
| 4 | `prueba_peralte.py` | **OK** | 0 s |
| 5 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 6 | `prueba_grandes.py` | **OK** | 13 s |
| 7 | `herramientas/sonda_guia.py 284 112` | **OK** | 1 s |
| 8 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 1 s |
| 9 | `prueba_079.py` | **OK** | 6 s |
| 10 | `prueba_futbol.py` | **OK** | 7 s |
| 11 | `prueba_baloncesto.py` | **OK** | 14 s |
| 12 | `prueba_084.py` | **OK** | 0 s |
| 13 | `prueba_0821.py` | **OK** | 0 s |
| 14 | `prueba_083.py` | **OK** | 2 s |
| 15 | `prueba_misiones_guardado.py` | **OK** | 19 s |
| 16 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 343 s |
| 17 | `prueba_diario.py` | **OK** | 0 s |
| 18 | `prueba_0851.py` | **OK** | 5 s |
| 19 | `prueba_canchas.py` | **OK** | 1 s |
| 20 | `prueba_075.py` | **OK** | 3 s |
| 21 | `prueba_1416.py` | **FALLA** | 0 s |
| 22 | `prueba_misiones.py` | **FALLA** | 36 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/publicar.log`, `src/06b_vmodels.js`, `src/07_vehicles.js`, `src/11_hud.js`, `src/12_missions.js`, `src/12f_story2.js`, `src/12i_canchas.js`, `src/12j_campos.js`, `tests/herramientas/foto_propios.py`, `tests/prueba_1416.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 30, 'peor': 109, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.1","punta":"189","maxV":"201","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -754 · Y 0 · 558 m"}
```

### 3. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 87, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 275, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 60, 'kmh_1s': 36, 'giro_1s_grados': 155, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 187, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 29, 'kmh_1s': 45, 'giro_1s_grados': 109, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 172, 'derrape_max_grados': 29}
OK
```

### 4. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.53, 0.55, 0.53], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.56, 0.53, 0.55], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.55, 0.54, 0.57], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.6, 0.55, 0.59], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.66], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.51, 0.52, 0.51, 0.52], 'dif': 0.01}
```

### 5. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 6. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 509, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 691}
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

### 7. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.87,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

### 8. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.87,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":1}
```

### 9. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.111, 'mano_izq': 0.036, 'angulo_antebrazo': 36}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.109, 'mano_izq': 0.025, 'angulo_antebrazo': 59}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 72, 'paradas': 0, 'marcador': [1, 2]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': True}
portero sale a por el balón {'portero_la_quita': True, 'frames': 63, 'gol': 0}
FUTBOL saque True palomitas True fuerza True regate True
foto v079_mate_m360_0
foto v079_mate_m360_1
foto v079_mate_m360_2
foto v079_mate_m360_3
foto v079_mate_molino_0
foto v079_mate_molino_1
foto v079_mate_molino_2
foto v079_mate_molino_3
foto v079_mate_espaldas_0
foto v079_mate_espaldas_1
foto v079_mate_espaldas_2
foto v079_mate_espaldas_3
foto v079_mate_piernas_0
foto v079_mate_piernas_1
foto v079_mate_piernas_2
foto v079_mate_piernas_3
mates {'m360': {'marcador': [2, 0]}, 'molino': {'marcador': [4, 0]}, 'espaldas': {'marcador': [6, 0]}, 'piernas': {'marcador': [8, 0]}}
pase largo {'altura_max': 3.42, 'recibe': True}
combos de la CPU buena {'combos_cpu': 12, 'marcador': [39, 21]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 10. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [2, 1], 'golden': False}
resultado {"won":true,"score":[2,1]}
PARTIDO CPU OK
partido fácil 1 [4, 0]
partido fácil 2 [4, 0]
partido fácil 3 [8, 0]
equilibrio primer partido [16, 0] OK
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
campos {'campos': 73, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 11. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [2, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [19, 3]
partido fácil 2 [25, 0]
partido fácil 3 [22, 0]
equilibrio primer partido [66, 3] OK
jugadores dibujados 81
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"shotT":true,"shot":true},"mode":"air"}
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
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 12. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [12, 0], 'pases': 14, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL MÁS ALTO', 'EL LARGO', 'COCO', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [20.1, 18.3, 18.9, 14.2, 18.8, 15]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 13. prueba_0821.py — OK

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

### 14. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', 0, 87], ['sanagustin', -4, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'TúMisión: HistoriaEl ObispoCopa LagunaDestino (GPS)ComidaPolicíaCasa de El BlancoBar con la máquina del GUFOJugueteríaInmobiliaria Pisos ChachiTu casa'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 15. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1794903582389],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1794903582410],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1794903582414],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1794903582418],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1794903584348]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1794903601032]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1794903604270],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1794903604277],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1794903604304],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1794903604328],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1794903604358],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1794903604424],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1794903604449],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1794903613747]]},"gang":{"formed":false,"name":"","members":[],"futbolTut":true,"maleIntro":false,"jugueterias":true,"basketTut":false,"patrol":false,"sastronTut":false,"defenders":true,"rifleTut":false,"arcade":{"scores":{"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]]},"bought":[],"console":false,"invited":false},"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.03266666666662}},"active":"Atraco en la farmacia","ends":{"obispo":[-372.625,342]}},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Has dormido como un mencey. Partida guardada."}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1794903582389], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1794903582410], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1794903582414], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1794903582418], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1794903584348]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794903601032]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794903604270], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794903604277], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1794903604304], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1794903604328], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1794903604358], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1794903604424], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1794903604449], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1794903613747]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'futbolTut': True, 'maleIntro': False, 'jugueterias': True, 'basketTut': False, 'patrol': False, 'sastronTut': False, 'defenders': True, 'rifleTut': False, 'arcade': {'scores': {'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.033777777777729}}, 'active': None, 'ends': {'obispo': [-372.625, 342]}}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1794903582389], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1794903582410], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1794903582414], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1794903582418], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1794903584348]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794903601032]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794903618984], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794903618995]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'futbolTut': True, 'maleIntro': False, 'jugueterias': True, 'basketTut': False, 'patrol': False, 'sastronTut': False, 'defenders': True, 'rifleTut': False, 'arcade': {'scores': {'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.038222222222167}}, 'active': None, 'ends': {'obispo': [-372.625, 342]}}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'futbolTut': False, 'maleIntro': False, 'jugueterias': False, 'basketTut': False, 'patrol': False, 'sastronTut': False, 'defenders': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.040666666666608}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None, 'ends': {}}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 16. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 20.399999999906868
{"frame":564,"calls":1487,"triangles":10805809,"points":0,"lines":0} calls:1487
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.65 m OK
[8] Los bancos del Adelantado: a pie: a 8 m, recorre 13 m en 3 s, salto máx 0.28 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.17 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 11 m en 3 s, salto máx 0.17 m OK | a pie: a 10 m, recorre 13 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 24 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 17. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 7
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a la Casa Ossuna | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 18. prueba_0851.py — OK

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
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [44.1, 44.3], "t": [0.2, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.5, 43.5], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.5, 43.5], "t": [0, 0, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [43.9, 43.9], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.1, 44.2], "t": [0.1, 0, 0], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.1, 44.1], "t": [0.1, 0, 0], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [42.5, 44.3], "t": [1, 1.7, 2.1], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.3, 0, 0.3], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.3], "t": [0.3, 0, 0.3], "mat": "5ec8ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.5], "t": [0.1, 0.2, 0.2], "mat": "1e1f22"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.5], "t": [0.1, 0.1, 0.1], "mat": "3a2a20"}]
errores []
PRUEBA 0851 OK
```

### 19. prueba_canchas.py — OK

```
   ['c7', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c8', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c9', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c10', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c11', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c12', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c13', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c14', 'door', 'la cancha (entrada por la calle)', 1, -169, -1131]
   ['c15', 'court', 'la cancha de Camino Fuente Cañizares', 5, -1040, -741]
   ['c16', 'door', 'la cancha (entrada por Avenida San Diego)', 4, -846, -908]
   ['c17', 'court', 'la cancha de Camino San Francisco de Paula', 4, -1129, 2004]
   ['c18', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 1, 2178, 2314]
   ['c19', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 5, 2182, 2300]
   ['c20', 'court', 'la cancha de baloncesto', 3, -116, 784]
   ['c21', 'court', 'la cancha de Calle Domingo González Pérez', 3, -637, 1575]
   ['c22', 'court', 'la cancha de Calle Domingo González Pérez', 3, -611, 1575]
   ['c23', 'court', 'la cancha de Calle Aries', 2, 1164, 1527]
   ['c24', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1979, 3754]
   ['c25', 'court', 'la cancha de baloncesto', 3, -152, 876]
   ['c26', 'court', 'la cancha de baloncesto', 4, -121, 887]
   ['c27', 'court', 'la cancha de baloncesto', 1, -1383, -918]
   ['c28', 'court', 'la cancha de Camino Vereda Barbados', 5, -1198, -1020]
   ['c29', 'court', 'la cancha de baloncesto', 4, -1361, -930]
   ['c30', 'door', 'la cancha (entrada por la calle)', 4, -1273, -1031]
   ['c31', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1691, 2095]
   ['c32', 'court', 'la cancha de Camino San Bartolomé de Geneto', 1, 236, 1782]
   ['c33', 'court', 'la cancha de baloncesto', 5, 1074, 2575]
   ['c34', 'court', 'la cancha de Calle Saturno', 3, 814, 1523]
   ['c35', 'court', 'la cancha de Calle Clemencia Hardisson', 4, 845, 1509]
   ['c36', 'court', 'la cancha de baloncesto', 1, 800, 1413]
   ['c37', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1966, 3829]
   ['c38', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 2, 1966, 3803]
   ['c39', 'court', 'la cancha de Calle Antonio Hernandez Arrón', 2, -1332, -626]
   ['c40', 'court', 'la cancha de Camino Tornero', 1, -1314, -650]
   ['c41', 'court', 'la cancha de baloncesto', 4, -1295, -467]
   ['c42', 'court', 'la cancha de baloncesto', 2, -1329, -474]
   ['c43', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 2, -1468, -512]
   ['c44', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1479, -526]
   ['c45', 'court', 'la cancha de Carretera General del Norte', 5, -1356, -318]
   ['c46', 'court', 'la cancha de "Avenida del Colesterol"', 3, 1828, 2050]
   ['mayex', 'door', 'Colegio Máyex', 1, -59, -425]
   ['c48', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1787, 2292]
   ['c49', 'court', 'la cancha de baloncesto', 1, 139, -993]
   ['c50', 'court', 'la cancha de baloncesto', 5, -641, 336]
   ['c51', 'court', 'la cancha de Avenida El Paso', 5, 1271, 3281]
   ['c52', 'court', 'la cancha de Calle Juan Pedro García', 3, 1887, 1581]
   ['c53', 'court', 'la cancha de Calle Rosalía de Castro', 3, 2420, 3883]
   ['c54', 'court', 'la cancha de baloncesto', 3, 2411, 3985]
   ['c55', 'court', 'la cancha de Paseo Oramas', 1, -553, -770]
   ['c56', 'court', 'la cancha de Calle Manuel Santaella', 5, 1599, 1579]
   ['c57', 'court', 'la cancha de Calle Marosilla', 2, 2396, 1952]
   ['c58', 'court', 'la cancha de Calle la Jara', 4, -2055, -124]
   ['c59', 'court', 'la cancha de Carretera General del Norte', 1, -4705, -447]
torneo ['Torneo Lagunero 1/5', 'Torneo Lagunero 2/5', 'Torneo Lagunero 3/5', 'Torneo Lagunero 4/5', 'Torneo Lagunero: la final']
mayex puerta detectada: mayex
snap entrada_mayex
riostejera puerta detectada: riostejera
snap entrada_rios_tejera
errores JS []
CANCHAS OK
```

### 20. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 20}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 10.93}
diario {'primera': ['Segundo', 'Una botella para Coco'], 'n': 4}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-376, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 21. prueba_1416.py — FALLA

```
blanco {'from': [-758, -364], 'at': [-761.4641016151378, -366], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
fin [-1600, -700] misiones 48 quedan contigo 32 lejos sin quedar []
fin [700, 1300] misiones 48 quedan contigo 31 lejos sin quedar []
fin [-2500, -300] misiones 48 quedan contigo 37 lejos sin quedar []
   MAL {'line': 'story', 'title': 'Vuelta al barrio', 'start': [-760, -365], 'meet': [-2100, -315], 'fromEnd': 400, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
   MAL {'line': 'story', 'title': 'Una botella para Coco', 'start': [-144, -233], 'meet': [-2081, -306], 'fromEnd': 419, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
   MAL {'line': 'story', 'title': 'Sastrón', 'start': [-217, -305], 'meet': [-2087, -313], 'fromEnd': 413, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
   MAL {'line': 'story', 'title': 'La firma de la banda', 'start': [-532, -354], 'meet': [-2098, -313], 'fromEnd': 402, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
   MAL {'line': 'story', 'title': 'Boca Papa te enseña a comer', 'start': [-532, -354], 'meet': [-2098, -313], 'fromEnd': 402, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
   MAL {'line': 'story', 'title': 'El campo de tiro de El Blanco', 'start': [-760, -365], 'meet': [-2100, -315], 'fromEnd': 400, 'inside': False, 'road': False, 'walk': False, 'fixed': False}
fin [1200, -400] misiones 48 quedan contigo 37 lejos sin quedar []
pilotos {'troceen': [1128], 'clip': [1128], 'torson': [1128], 'beluga': [1104], 'reventon': [1128]}
PILOTOS_PROPIOS OK
errores []
PRUEBA 1416 FALLA
```

### 22. prueba_misiones.py — FALLA

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
[7] Defensores de La Laguna: PASA · dinero +1000 · pasos dlg>idle
[8] Los bancos del Adelantado: PASA · dinero +900 · pasos talk>goto>talk>fight>shot>talk>idle
[9] El gofio robado: FALLA · dinero +0 · pasos idle
     objetivo: Siguiente: Boca Papa ha quedado contigo más cerca, para que no cruces media Laguna: ve al  · Bancos recuperados +$900 | ¡MISIÓN SUPERADA!
[10] El carterista del Cristo: FALLA · dinero +0 · pasos idle
     objetivo: Siguiente: Coco tiene un aviso: búscalo junto a la Casa Ossuna · Bancos recuperados +$900 | ¡MISIÓN SUPERADA!
[11] Carrera solidaria del casco: PASA · dinero +700 · pasos talk>goto>idle
[12] El rally de La Esperanza: PASA · dinero +1200 · pasos talk>car>goto>countdown>goto>idle
[13] Baches en la Vía de Ronda: PASA · dinero +900 · pasos talk>enter>goto>idle
[14] Escolta a la guagua del Romero: FALLA · dinero +0 · pasos idle
     objetivo: Siguiente: Don Yovoy Gofiérrez ha quedado contigo más cerca, para que no cruces media Lagu · Vía de Ronda sin baches +$900 | ¡MISIÓN SUPERADA!
[15] La guagua de la broma: PASA · dinero +900 · pasos talk>car>escort>talk>idle
[16] Grafiteros en el tranvía: PASA · dinero +800 · pasos talk>goto>shot>talk>idle
[17] Noche en el aeropuerto: PASA · dinero +2000 · pasos talk>goto>damage>shot>talk>idle
[18] El rifle de agua: PASA · dinero +300 · pasos talk>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES FALLA
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, sonda_guia.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v0822_mapa.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg
