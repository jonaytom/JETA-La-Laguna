# Pruebas 1.2.5 — 2026-11-10 13:44 — 23/24 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 432 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_bordes.py` | **OK** | 57 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 72 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 5 s |
| 6 | `prueba_grandes.py` | **OK** | 10 s |
| 7 | `prueba_078.py` | **OK** | 13 s |
| 8 | `prueba_trinidad.py` | **OK** | 6 s |
| 9 | `prueba_panel_controles.py` | **OK** | 12 s |
| 10 | `prueba_pelea_especiales.py` | **FALLA** | 16 s |
| 11 | `prueba_pelea_atras.py` | **OK** | 11 s |
| 12 | `prueba_bloqueo.py` | **OK** | 10 s |
| 13 | `prueba_maleantes.py` | **OK** | 1 s |
| 14 | `prueba_089.py` | **OK** | 1 s |
| 15 | `prueba_076.py` | **OK** | 22 s |
| 16 | `prueba_0821.py` | **OK** | 0 s |
| 17 | `prueba_misiones_guardado.py` | **OK** | 20 s |
| 18 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 100 s |
| 19 | `prueba_diario.py` | **OK** | 0 s |
| 20 | `prueba_0851.py` | **OK** | 4 s |
| 21 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 22 | `prueba_121.py` | **OK** | 0 s |
| 23 | `prueba_120.py` | **OK** | 0 s |
| 24 | `prueba_119.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/pruebas/juandevera.txt`, `scripts/pruebas/maleante.txt`, `scripts/publicar.log`, `src/04_world.js`, `src/09d_fight2d.js`, `src/09h_maleantes.js`, `src/12_missions.js`, `src/12f_story2.js`, `src/13_main.js`, `tests/herramientas/LEEME.md`, `tests/herramientas/sonda_maleante.py`, `tests/herramientas/sonda_maleante_gpu.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 147, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":1852}
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 132
failed 0 of 132 · conocidos 0
CONDUCCION OK
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 5. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 907, 'con_lineas': 75270, 'lisas': 27091, 'pct_lisas': 26.5}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.3, 'cx': -237, 'cz': 415}
edificios [[73, 234, 1.55], [-909, -408, 1.41]]
recortados 4007
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
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 505, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 668}
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

### 7. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 482.9126336264246, "z": 1258.136450345903, "len": 16.6, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 305.47831964174856, "z": 1012.9021004478143, "len": 1.5, "ancho": 2.6, "y": -43.3}, {"name": "", "x": 303.25, "z": 1016, "len": 6.1, "ancho": 2.6, "y": -43.1}, {"name": "", "x": 299.75, "z": 1021, "len": 6.1, "ancho": 2.6, "y": -42.8}, {"name": "", "x": 294.8380421967213, "z": 1028.7699296721312, "len": 12.3, "ancho": 2.6, "y": -42.5}, {"name": "", "x": 245.35231757455904, "z": 921.6725837614111, "len": 7.7, "ancho": 2.6, "y": -42.6}, {"name": "", "x": 247.25, "z": 915.25, "len": 5.7, "ancho": 2.6, "y": -42.7}, {"name": "", "x": 250.5, "z": 910.75, "len": 6.1, "ancho": 2.6, "y": -42.7}, {"name":
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.98, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.94, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -1.07), ([-184, -19], True, -3.92, True, -1.07), ([-188, -9], True, -3.92, True, -1.07), ([-217.5, 58.5], True, -3.81, False, 4.47)]
patio {'x': -179, 'z': -30, 'r': 6.3, 'yU': 1.33, 'yL': -4.02, 'escaleras': 2, 'peldanos': 30, 'galeria_baja': 91.9, 'salida': [-217, 59]} bajada maxima entre puntos 0.77 llega abajo True
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
foto v0781_juego_cerca
foto v0781_patio_desde_rellano
foto v0781_patio_desde_abajo
foto v0781_escalera_abajo
foto v0781_galeria_baja
foto v0781_galeria_hacia_juego
errores []
PRUEBA 078 OK
```

### 8. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-227, 468]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 9. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 10. prueba_pelea_especiales.py — FALLA

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":8.5,"gofio":true}
teide NO {"walk":13.599999999999998,"gofio":true}
gancho OK {"walk":13.599999999999998,"gofio":true,"gancho":true}
pastor OK {"walk":13.599999999999998,"gofio":true,"gancho":true,"pastor":true}
ESPECIALES FALLA
```

### 11. prueba_pelea_atras.py — OK

```
{"sep":150,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
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
maleante {'lv': 1, 'name': 'El Guirre', 't': 239.70000000000002, 'd': 120}
en_minimapa True
pelea True
rival {'name': 'EL GUIRRE', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 14. prueba_089.py — OK

```
pausa basket True False
basket {'conBalon': True, 'ahora': ['EL CHOPA']}
ayuda {'moved': [3.9, 3.9, 4.1]}
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

### 15. prueba_076.py — OK

```
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-343.9, 396.2], 'fuego': [-343.9, 403.7], 'gota_v': [0, -2.7, 12.4], 'charcos': [[0.5, 7.1]], 'apuntando': False, 'mano': [-0.09, -4.49, 0.25]}, 'gotas': 12, 'charcos': 2, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 93%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 40, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True, 'mision': False}
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
V076 OK
```

### 16. prueba_0821.py — OK

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

### 17. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":true,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1794318070004],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1794318070022],["El Chopa","¿Y si me gana él?",1794318070028],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1794318070033]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1794318070055],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1794318070092],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1794318070097],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1794318070100],["Rayco «El Blanco»","«Psss... siesta.»",1794318070150],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1794318070181],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1794318070202],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1794318074270],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1794318076283],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1794318076316],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1794318076325],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1794318076343],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1794318077278],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1794318077284],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1794318077289]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1794318078518],["El Chopa","Eso no puede ser legal.",1794318078544],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1794318078553]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1794318078634],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1794318078670]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1794318078752],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1794318078785],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1794318078796]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1794318078889],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1794318078927],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1794318078931]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1794318079054],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1794318079088],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1794318079093]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1794318082709],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1794318082744],["El Chopa","Monseñor, ¿esto es legal?",1794318082754],["Monseñor Fermín Truchas","Hijo, es fútbol.",1794318082762]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1794318082850],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1794318082882]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1794318089979]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1794318090409],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1794318090439],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1794318090500],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1794318090552],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1794318090600],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1794318090709],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1794318090727],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1794318100837]]},"gang":{"formed":false,"name":"","members":[],"arcade":{"scores":{"prueba":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]]},"bought":[],"console":false,"invited":false},"sastronTut":true,"maleIntro":true,"jugueterias":true,"rifleTut":true,"casa":{"intro":false,"owned":[],"rent":null,"day":1,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Ruta marcada en el GPS: Juguetes Sabelotodo"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1794318070004], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1794318070022], ['El Chopa', '¿Y si me gana él?', 1794318070028], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1794318070033]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1794318070055], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1794318070092], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1794318070097], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1794318070100], ['Rayco «El Blanco»', '«Psss... siesta.»', 1794318070150], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1794318070181], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1794318070202], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1794318074270], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1794318076283], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1794318076316], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1794318076325], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1794318076343], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1794318077278], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1794318077284], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1794318077289]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1794318078518], ['El Chopa', 'Eso no puede ser legal.', 1794318078544], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1794318078553]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1794318078634], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1794318078670]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1794318078752], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1794318078785], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1794318078796]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1794318078889], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1794318078927], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1794318078931]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1794318079054], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1794318079088], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1794318079093]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1794318082709], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1794318082744], ['El Chopa', 'Monseñor, ¿esto es legal?', 1794318082754], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1794318082762]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1794318082850], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1794318082882]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794318089979]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794318090409], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794318090439], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1794318090500], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1794318090552], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1794318090600], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1794318090709], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1794318090727], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1794318100837]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'arcade': {'scores': {'prueba': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'maleIntro': True, 'jugueterias': True, 'rifleTut': True, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.037111111111058}, 'defenders': False}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1794318070004], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1794318070022], ['El Chopa', '¿Y si me gana él?', 1794318070028], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1794318070033]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1794318070055], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1794318070092], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1794318070097], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1794318070100], ['Rayco «El Blanco»', '«Psss... siesta.»', 1794318070150], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1794318070181], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1794318070202], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1794318074270], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1794318076283], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1794318076316], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1794318076325], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1794318076343], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1794318077278], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1794318077284], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1794318077289]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1794318078518], ['El Chopa', 'Eso no puede ser legal.', 1794318078544], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1794318078553]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1794318078634], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1794318078670]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1794318078752], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1794318078785], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1794318078796]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1794318078889], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1794318078927], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1794318078931]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1794318079054], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1794318079088], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1794318079093]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1794318082709], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1794318082744], ['El Chopa', 'Monseñor, ¿esto es legal?', 1794318082754], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1794318082762]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1794318082850], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1794318082882]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1794318089979]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1794318106225], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1794318106236]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'arcade': {'scores': {'prueba': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]]}, 'bought': [], 'console': False, 'invited': False}, 'sastronTut': True, 'maleIntro': True, 'jugueterias': True, 'rifleTut': True, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.041555555555496}, 'defenders': False}, 'active': None}, 'blips': 3, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'maleIntro': False, 'jugueterias': False, 'rifleTut': False, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'defenders': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 18. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 18.0
{"frame":564,"calls":1515,"triangles":2477859,"points":0,"lines":0} calls:1515
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 14 m en 3 s, salto máx 0.30 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.18 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.15 m OK | a pie: a 5 m, recorre 6 m en 3 s, salto máx 0.15 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 19. prueba_diario.py — OK

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

### 20. prueba_0851.py — OK

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
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [44.1, 44.3], "t": [0.2, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.4, 43.5], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [43.4, 43.5], "t": [0, 0, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [43.9, 43.9], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.1, 44.2], "t": [0.1, 0, 0], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [44.1, 44.2], "t": [0.1, 0, 0], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [42.5, 44.3], "t": [1, 1.8, 2.2], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.2, 43.2], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.2, 43.2], "t": [0.3, 0, 0.3], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.2, 43.2], "t": [0.3, 0, 0.3], "mat": "5ec8ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.2, 43.5], "t": [0.1, 0.2, 0.2], "mat": "1e1f22"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [43.3, 43.4], "t": [0.1, 0.1, 0.1], "mat": "3a2a20"}]
errores []
PRUEBA 0851 OK
```

### 21. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1794318149183,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1794318134460]]},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"sastronTut":true,"maleIntro":false,"jugueterias":false,"rifleTut":false,"basketTut":false,"futbolTut":false,"patrol":false,"defenders":true,"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 22. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC', 'trozos': 30, 'puntos': 511, 'eje': 3199, 'lado': 1, 'ramales': 14, 'tramosParalelos': 77}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 23. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 7, 'twins': 4, 'estrechadas': 7, 'misma_altura': 0, 'anchos': [[4.5, 8], [8, 8], [4.5, 4.5], [4.5, 4.5]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 24. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 14, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, pelea_tamano.jpg, ready.png, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v0822_mapa.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v089_bencomo.jpg
