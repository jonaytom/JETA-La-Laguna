# Pruebas 1.4.48 — 2026-11-25 01:59 — 23/23 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 843 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_bordes.py` | **OK** | 0 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 70 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_trinidad.py` | **OK** | 1 s |
| 6 | `prueba_076.py` | **OK** (repetida aparte) | 331 s |
| 7 | `prueba_079.py` | **OK** | 1 s |
| 8 | `prueba_futbol.py` | **OK** | 6 s |
| 9 | `prueba_baloncesto.py` | **OK** | 9 s |
| 10 | `prueba_084.py` | **OK** | 0 s |
| 11 | `prueba_082.py` | **OK** | 0 s |
| 12 | `prueba_083.py` | **OK** | 1 s |
| 13 | `prueba_085.py` | **OK** | 1 s |
| 14 | `prueba_misiones_guardado.py` | **OK** | 17 s |
| 15 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 339 s |
| 16 | `prueba_diario.py` | **OK** | 0 s |
| 17 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 18 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 19 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 20 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 21 | `audit_obstaculos.py` | **OK** | 0 s |
| 22 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 23 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `src/05m_parking.js`, `src/05u_trinidad.js`, `src/09i_agua.js`, `src/12_missions.js`, `src/12e_save.js`, `src/12k_agua.js`, `tests/herramientas/LEEME.md`, `tests/herramientas/sonda_inicio_mision.py`, `tests/prueba_076.py`, `tests/prueba_persecuciones.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 40, 'peor': 110, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"fin de prueba"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":7.3,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":3364}
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [261, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 5. prueba_trinidad.py — OK

```
widths [6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -13.9}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -233, 'z': 451, 'yF': -13.2}]
nuevas 9
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82], 'golpes': [[-105, 82, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32442']]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-229, 476], 'golpes': [[-230, 478, 6, 'at Car.physics (http://localhost:8765/test.html?q=alta:32442']]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 6. prueba_076.py — OK (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')\n    at eval (eval at evaluate (:311:30), <anonymous>:1:126)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:162)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 41.80000000074506
{"frame":1382,"calls":902,"triangles":10611188,"points":0,"lines":0} calls:902
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -2.4, 12.7], 'charcos': [[0.5, 6.8]], 'apuntando': False, 'mano': [-0.09, 8.15, 0.24]}, 'gotas': 43, 'charcos': 3, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 93%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True, 'mision': False}
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-620.4823619097949, -306.56814834742187, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'Un partido por La Concepción', 'El torneo de la parroquia', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1305, 1583]}
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
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 OK
```

### 7. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.111, 'mano_izq': 0.032, 'angulo_antebrazo': 38}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.113, 'mano_izq': 0.074, 'angulo_antebrazo': 31}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 0, 'marcador': [1, 2]}
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
combos de la CPU buena {'combos_cpu': 8, 'marcador': [38, 25]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 8. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [0, 2], 'golden': False}
resultado {"won":false,"score":[0,2]}
PARTIDO CPU OK
partido fácil 1 [7, 1]
partido fácil 2 [6, 0]
partido fácil 3 [5, 1]
equilibrio primer partido [18, 2] OK
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
campos {'campos': 73, 'puertas': 12, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 2 futbolTut True
errores JS []
FUTBOL OK
```

### 9. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'inbound', 'sc': [10, 2], 'clock': 1.5000000000009894, 'golden': False}
resultado {"won":true,"score":[10,2]}
PARTIDO CPU OK
partido fácil 1 [11, 4]
partido fácil 2 [17, 4]
partido fácil 3 [15, 2]
equilibrio primer partido [43, 10] OK
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
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 10. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [14, 0], 'pases': 12, 'con_balon': ['EL CHOPA', 'EL LARGO', 'EL MÁS ALTO', 'EL BLANCO', 'EL PIBE', 'COCO'], 'marcas_distintas': True, 'movidos': [21.7, 13.2, 18.3, 16.7, 17.1, 16.1]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 11. prueba_082.py — OK

```
juguetería {'hay': True, 'tienda': 'Juguetes Sabelotodo', 'opcion': 0, 'abre': True}
foto v082_titulo
vista a los 9 s demo
foto v082_demo
foto v082_records
moneda {'creditos': 1, 'modo': 'play', 'fase': 'select', 'elegido': 1}
foto v082_elegir
guerrero {'heroe': 'pastor', 'fase': 'intro'}
TIENDA OK
controles {'anda': 39, 'alto': 37, 'corre': 'run', 'pelea': True, 'combo': {'vida': 3, 'max': 8, 'estado': 'fall'}}
foto v082_pelea
magia {'estado': 'magic', 'zurrones': 0, 'tocados': 2, 'enemigos': 2}
foto v082_magia
lagarto {'monta': True, 'cola': 'bite', 'mordisco': True, 'salto': 'whip', 'avanza': 40}
golpes nuevos {'patada': 'dash', 'alto_patada': 16, 'flip': {'estado': 'flip', 'alto': 24, 'detras': True, 'tumbado': True, 'dano': 4}}
foto v082_lagarto
CONTROLES OK
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
foto v082_fase6
foto v082_fase7
recorrido [{'estado': {'p': [259, 24, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 96, 'puntos': 10430}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 88, 'puntos': 11550}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 127, 'puntos': 14400}, {'estado': {'p': [154, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 124, 'puntos': 13360}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 96, 'puntos': 15360}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 143, 'puntos': 16120}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 211, 'puntos': 33950}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 12. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', -1, 87], ['sanagustin', -4, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasHistoriaEl ObispoCopa Laguna'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 13. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': 'f2f2f2'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'URUGUAY'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 14. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":4,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":2,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Vuelta al barrio":[["Ayoze «El Chopa»","Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.",1795571130192]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795571206543]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795571206545],["Don Celestino, párroco de La Concepción (por el móvil)","¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.",1795571209033]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1795571211017],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1795571211047],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1795571211056],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1795571211062],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1795571212861]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795571228628],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795571228644],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795571228665],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795571228688],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795571228713],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795571228770],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795571228814],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795571236592]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":false,"obispoIntro":true,"futbolTut":true,"defenders":true,"patrol":false,"basketTut":false,"rifleTut":false,"arcade":{"scores":{"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Cartucho «PLAY FURBITO»: ya lo puedes jugar en la GOFIO-8 de tu casa"}
cargada: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 2, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795571130192]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795571206543]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795571206545], ['Don Celestino, párroco de La Concepción (por el móvil)', '¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.', 1795571209033]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795571211017], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795571211047], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795571211056], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795571211062], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795571212861]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795571228628], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795571228644], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795571228665], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795571228688], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795571228713], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795571228770], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795571228814], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795571236592]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': True, 'futbolTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'rifleTut': False, 'arcade': {'scores': {'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 2, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Vuelta al barrio': [['Ayoze «El Chopa»', 'Tres años en la cárcel por un robo que planeé demasiado bien... casi. Hoy vuelvo al barrio donde me crié, con una bolsa de plástico y ganas de empezar de cero.<br>Y en la puerta de casa de sus padres, como si el tiempo no hubiera pasado, está <b>Rayco, «El Blanco»</b>. Mi amigo de toda la vida.', 1795571130192]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795571206543]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795571206545], ['Don Celestino, párroco de La Concepción (por el móvil)', '¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.', 1795571209033]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795571211017], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795571211047], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795571211056], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795571211062], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795571212861]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795571242006], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795571242027]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': False, 'obispoIntro': True, 'futbolTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'rifleTut': False, 'arcade': {'scores': {'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 4, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'obispoIntro': True, 'futbolTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 15. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 60.80000000074506
{"frame":1384,"calls":906,"triangles":10681132,"points":0,"lines":0} calls:906
[6] Atraco en la farmacia: a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.35 m OK
[8] Los bancos del Adelantado: a pie: a 6 m, recorre 15 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 7 m, recorre 12 m en 3 s, salto máx 0.20 m OK
[12] El rally de La Esperanza: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 6 m, recorre 11 m en 3 s, salto máx 0.13 m OK | a pie: a 10 m, recorre 8 m en 3 s, salto máx 0.13 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 16. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 8
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Café Brasilito | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | C
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 17. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795571276361,"label":"test","player":{"x":-182.65839693129425,"z":784.3360607103941,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":3.0123732081837398,"x":-184.65839693129425,"z":784.3360607103941},"weapon":{"has":true,"ammo":4,"out":true},"rifle"
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1795571266200]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"jugueterias":false,"sastronTut":true,"maleIntro":false,"obispoIntro":true,"futbolTut":false,"defenders":true,"patrol":false,"basketTut":false,"rifleTut":false,"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 18. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 19. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 20. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 21. audit_obstaculos.py — OK

```
obstacles 121
[(('footway', 'unclassified'), 15), (('secondary', 'secondary_link'), 11), (('tertiary', 'tertiary'), 10), (('footway', 'service'), 9), (('footway', 'motorway'), 8), (('unclassified', 'motorway'), 7), (('footway', 'motorway_link'), 7), (('primary', 'motorway_link'), 7), (('service', 'service'), 5), (('motorway_link', 'motorway'), 5), (('motorway_link', 'tertiary'), 4), (('secondary', 'secondary'), 4), (('motorway_link', 'motorway_link'), 3), (('tertiary', 'motorway_link'), 3), (('tertiary', 'motorway'), 3), (('motorway', 'secondary_link'), 3), (('primary', 'unclassified'), 2), (('motorway', 'residential'), 2), (('motorway_link', 'secondary_link'), 2), (('primary', 'residential'), 1)]
barreras en calzada 0 Counter()
```

### 22. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 23. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, faros1437_apagados.jpg, faros1437_encendidos.jpg, futbol_partido.jpg, futbol_tutorial.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg
