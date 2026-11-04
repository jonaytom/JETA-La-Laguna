# Pruebas 1.1.8 — 2026-11-04 16:26 — 7/7 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 236 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 7 s |
| 2 | `prueba_trinidad.py` | **OK** | 61 s |
| 3 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 4 | `prueba_076.py` | **OK** (repetida aparte) | 106 s |
| 5 | `prueba_118.py` | **OK** | 4 s |
| 6 | `prueba_0851.py` | **OK** | 4 s |
| 7 | `prueba_futbol.py` | **OK** | 7 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/pruebas/nava.txt`, `scripts/pruebas/origen.txt`, `src/05u_trinidad.js`, `tests/herramientas/LEEME.md`, `tests/herramientas/sonda_origen.py`, `tests/herramientas/sonda_rayos.py`, `tests/run_varios.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 48, 'peor': 202, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 82]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-228, 471]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 3. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 4. prueba_076.py — OK (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 24.699999999254942
{"frame":566,"calls":1472,"triangles":2459151,"points":0,"lines":0} calls:1472
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0.1, -3, 12.2], 'charcos': [[0.4, 6.9]], 'apuntando': False, 'mano': [-0.09, 8.12, 0.25]}, 'gotas': 12, 'charcos': 3, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 93%\nTAB / 1: puños'}
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
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 OK
```

### 5. prueba_118.py — OK

```
precarga {'n': 75, 'listas': 75, 'sprx': 37}
PRECARGA OK
guardado {'toast': 'No se ha podido guardar la partida: el navegador no deja guardar más datos'}
AVISO_GUARDAR OK
recreativa {'st': 'arcade', 'quieto': True, 'despues': 'play'}
SIN_3D_DETRAS OK
errores []
PRUEBA 118 OK
```

### 6. prueba_0851.py — OK

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
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [8.1, 8.3], "t": [0.3, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [7.5, 7.6], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [7.6, 7.6], "t": [0, 0.1, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [7.9, 7.9], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [8.1, 8.1], "t": [0.1, 0, 0.1], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [8.1, 8.1], "t": [0.1, 0, 0.1], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.4, 8.2], "t": [2.3, 1.8, 2.4], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0.3, 0, 0.3], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0.3, 0, 0.3], "mat": "b388ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.5, 6.5], "t": [0.3, 0, 0.3], "mat": "00e5ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.6, 7.7], "t": [0.4, 0.2, 0.3], "mat": "f4f4f0"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.5, 7.6], "t": [0.2, 0.1, 0.2], "mat": "ff6d00"}, {"at": [-60, -230], "nombre": "", "c": [-61, -230], "y": [7.5, 7.6], "t": [0.1, 0.1, 0.1], "mat": "26282c"}, {"at": [-60, -230], "nombre": "", "c": [-61, -230], "y": [7.5, 7.6], "t": [0.1, 0, 0.1], "mat": "ff6d00"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.6, 7.7], "t": [0.2, 0.1, 0.2], "mat": "ff6d00"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.5, 7.7], "t": [0.1, 0.1, 0.1], "mat": "26282c"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.5, 7.6], "t": [0.1, 0.1, 0.1], "mat": "26282c"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.5, 7.6], "t": [0.1, 0.1, 0.1], "mat": "f4f4f0"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.7, 7.8], "t": [0.2, 0.1, 0.2], "mat": "7fd3ff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.7, 7.8], "t": [0.2, 0.1, 0.2], "mat": "1e88e5"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.2, 7.4], "t": [0.2, 0.2, 0.1], "mat": "1e1f22"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [7.3, 7.4], "t": [0.1, 0.1, 0.1], "mat": "3a2a20"}]
errores []
PRUEBA 0851 OK
```

### 7. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [0, 2], 'golden': False}
resultado {"won":false,"score":[0,2]}
PARTIDO CPU OK
partido fácil 1 [6, 0]
partido fácil 2 [6, 0]
partido fácil 3 [3, 0]
equilibrio primer partido [15, 0] OK
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

Fotos/archivos nuevos en `tests/shots/`: futbol_partido.jpg, futbol_tutorial.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg
