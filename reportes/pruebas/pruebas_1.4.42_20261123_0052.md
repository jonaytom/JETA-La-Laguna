# Pruebas 1.4.42 — 2026-11-23 00:52 — 30/31 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 1289 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_bordes.py` | **OK** | 0 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 79 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_trinidad.py` | **FALLA** | 2 s |
| 6 | `prueba_076.py` | **OK** (repetida aparte) | 528 s |
| 7 | `prueba_075.py` | **OK** | 0 s |
| 8 | `prueba_panel_controles.py` | **OK** | 11 s |
| 9 | `prueba_pelea_especiales.py` | **OK** | 12 s |
| 10 | `prueba_pelea_atras.py` | **OK** | 9 s |
| 11 | `prueba_bloqueo.py` | **OK** | 9 s |
| 12 | `prueba_079.py` | **OK** | 1 s |
| 13 | `prueba_futbol.py` | **OK** | 6 s |
| 14 | `prueba_baloncesto.py` | **OK** | 9 s |
| 15 | `prueba_084.py` | **OK** | 0 s |
| 16 | `prueba_maleantes.py` | **OK** | 0 s |
| 17 | `prueba_0821.py` | **OK** | 0 s |
| 18 | `prueba_082.py` | **OK** | 0 s |
| 19 | `prueba_083.py` | **OK** | 1 s |
| 20 | `prueba_085.py` | **OK** | 1 s |
| 21 | `prueba_misiones_guardado.py` | **OK** | 18 s |
| 22 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 522 s |
| 23 | `prueba_diario.py` | **OK** | 0 s |
| 24 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 25 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 26 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 27 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 28 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 29 | `audit_obstaculos.py` | **OK** | 0 s |
| 30 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 31 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `src/05m_parking.js`, `src/05u_trinidad.js`, `src/05v_peraza.js`, `src/09c_weapons.js`, `src/09h_maleantes.js`, `src/09i_agua.js`, `src/12_missions.js`, `src/12e_save.js`, `src/12k_agua.js`, `tests/prueba_076.py`, `tests/prueba_prologo_1427.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 45, 'peor': 119, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
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

### 5. prueba_trinidad.py — FALLA

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 8
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 0, 'en_sala': False, 'fin': [-85, 25]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 0, 'en_sala': False, 'fin': [-245, 527]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD FALLA
```

### 6. prueba_076.py — OK (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading '0')\n    at eval (eval at evaluate (:311:30), <anonymous>:1:126)\n    at eval (eval at evaluate (:311:30), <anonymous>:1:162)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 23.900000002235174
{"frame":568,"calls":2065,"triangles":20444653,"points":0,"lines":0} calls:2065
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -2.3, 12.6], 'charcos': [[0.5, 7.1]], 'apuntando': False, 'mano': [-0.08, 8.15, 0.23]}, 'gotas': 43, 'charcos': 2, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 100%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True, 'mision': False}
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-623.5207131221052, -301.768607329654, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'El torneo de la parroquia', 'Un partido por La Concepción', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1306, 1582]}
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
V076 OK
```

### 7. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 9}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 10.93}
diario {'primera': ['Segundo', 'El rifle de agua'], 'n': 4}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-376, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 8. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":130}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 9. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":11.999999999999998,"gofio":true}
teide OK {"walk":25.299999999999997,"gofio":true,"teide":true}
gancho OK {"walk":25.299999999999997,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":25.299999999999997,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 10. prueba_pelea_atras.py — OK

```
{"sep":127,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":false,"vida":100}
snap pelea_tamano
```

### 11. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 12. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.112, 'mano_izq': 0.033, 'angulo_antebrazo': 33}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.114, 'mano_izq': 0.067, 'angulo_antebrazo': 32}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 144, 'paradas': 7, 'marcador': [1, 1]}
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
combos de la CPU buena {'combos_cpu': 15, 'marcador': [35, 22]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 13. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [2, 2], 'golden': False}
resultado {"won":true,"score":[3,2]}
PARTIDO CPU OK
partido fácil 1 [6, 1]
partido fácil 2 [5, 0]
partido fácil 3 [5, 0]
equilibrio primer partido [16, 1] OK
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

### 14. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'play', 'sc': [9, 2], 'clock': 0.10000000000098974, 'golden': False}
resultado {"won":true,"score":[9,2]}
PARTIDO CPU OK
partido fácil 1 [21, 0]
partido fácil 2 [19, 3]
partido fácil 3 [14, 0]
equilibrio primer partido [54, 3] OK
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

### 15. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [6, 5], 'pases': 13, 'con_balon': ['EL CHOPA', 'EL LARGO', 'EL MÁS ALTO', 'EL BLANCO', 'EL PIBE', 'COCO'], 'marcas_distintas': True, 'movidos': [21.9, 18, 18.6, 12.9, 15.3, 17.1]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 16. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'Paco Jeitazo', 't': 239.70000000000002, 'd': 82}
en_minimapa True
pelea True
rival {'name': 'PACO JEITAZO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 17. prueba_0821.py — OK

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

### 18. prueba_082.py — OK

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
recorrido [{'estado': {'p': [259, 25, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mirla', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 123, 'puntos': 10830}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 75, 'puntos': 11290}, {'estado': {'p': [161, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 114, 'puntos': 14480}, {'estado': {'p': [167, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 104, 'puntos': 13340}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 85, 'puntos': 15090}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 156, 'puntos': 15870}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 180, 'puntos': 33210}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 19. prueba_083.py — OK

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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasHistoriaEl ObispoCopa Laguna'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 20. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '1d2a6b'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'ARGENTINA'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 21. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795393962116]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795393962118],["Primero","hola",1795393962686],["Segundo","adiós",1795393962687]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1795394010689],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1795394010721],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1795394010727],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1795394010737],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1795394012518]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1795394024869]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795394029131],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795394029153],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795394029175],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795394029201],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795394029227],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795394029316],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795394029364],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795394037951]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"obispoIntro":false,"futbolTut":true,"basketTut":false,"patrol":false,"defenders":true,"rifleTut":false,"arcade":{"scores":{"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Cartucho «PLAY FURBITO»: ya lo puedes jugar en la GOFIO-8 de tu casa"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795393962116]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795393962118], ['Primero', 'hola', 1795393962686], ['Segundo', 'adiós', 1795393962687]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795394010689], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795394010721], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795394010727], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795394010737], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795394012518]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1795394024869]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795394029131], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795394029153], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795394029175], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795394029201], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795394029227], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795394029316], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795394029364], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795394037951]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'obispoIntro': False, 'futbolTut': True, 'basketTut': False, 'patrol': False, 'defenders': True, 'rifleTut': False, 'arcade': {'scores': {'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.037111111111058}}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795393962116]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795393962118], ['Primero', 'hola', 1795393962686], ['Segundo', 'adiós', 1795393962687]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795394010689], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795394010721], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795394010727], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795394010737], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795394012518]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1795394024869]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795394043323], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795394043342]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'obispoIntro': False, 'futbolTut': True, 'basketTut': False, 'patrol': False, 'defenders': True, 'rifleTut': False, 'arcade': {'scores': {'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.041555555555496}}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'obispoIntro': True, 'futbolTut': False, 'basketTut': False, 'patrol': False, 'defenders': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 22. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 23.399999998509884
{"frame":568,"calls":2071,"triangles":20251800,"points":0,"lines":0} calls:2071
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.34 m OK
[8] Los bancos del Adelantado: a pie: a 4 m, recorre 6 m en 3 s, salto máx 0.18 m OK
[10] El carterista del Cristo: a pie: a 3 m, recorre 10 m en 3 s, salto máx 0.20 m OK
[12] El rally de La Esperanza: coche: a 6 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1366 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.14 m OK | a pie: a 10 m, recorre 10 m en 3 s, salto máx 0.14 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 23. prueba_diario.py — OK

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

### 24. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795394078052,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1795394068208]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"jugueterias":false,"sastronTut":true,"maleIntro":false,"obispoIntro":true,"futbolTut":false,"basketTut":false,"patrol":false,"defenders":true,"rifleTut":false,"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 25. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': True, 'grid': {'same': True, 'oneway': True, 'ahead': 12, 'fwd': True, 'dot': 1, 'se': 2291, 'pe': 2291}, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 26. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 27. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 28. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 29. audit_obstaculos.py — OK

```
obstacles 173
[(('footway', 'motorway_link'), 17), (('footway', 'unclassified'), 17), (('footway', 'service'), 14), (('service', 'residential'), 12), (('service', 'service'), 9), (('primary', 'motorway_link'), 9), (('unclassified', 'motorway'), 8), (('primary', 'secondary'), 8), (('footway', 'motorway'), 8), (('secondary', 'secondary'), 7), (('motorway_link', 'tertiary'), 5), (('primary', 'unclassified'), 5), (('footway', 'residential'), 5), (('motorway', 'secondary'), 5), (('motorway_link', 'motorway_link'), 4), (('service', 'tertiary'), 4), (('motorway', 'motorway_link'), 4), (('footway', 'tertiary'), 4), (('tertiary', 'tertiary'), 3), (('motorway', 'secondary_link'), 3)]
barreras en calzada 0 Counter()
```

### 30. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 31. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, faros1437_apagados.jpg, faros1437_encendidos.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, pelea_tamano.jpg, ready.png, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v0822_mapa.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg
