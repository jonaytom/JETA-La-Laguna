# Pruebas 1.4.41 — 2026-11-22 23:56 — 15/17 OK

Listas: revisar1442. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 101 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_1419.py` | **OK** | 0 s |
| 3 | `prueba_1420.py` | **OK** | 0 s |
| 4 | `prueba_1421.py` | **OK** | 0 s |
| 5 | `prueba_0851.py` | **OK** | 1 s |
| 6 | `prueba_076.py` | **OK** | 14 s |
| 7 | `prueba_pelea_especiales.py` | **FALLA** | 14 s |
| 8 | `prueba_079.py` | **FALLA** | 2 s |
| 9 | `prueba_080.py` | **OK** | 0 s |
| 10 | `prueba_081.py` | **OK** | 0 s |
| 11 | `prueba_082.py` | **OK** | 0 s |
| 12 | `prueba_083.py` | **OK** | 1 s |
| 13 | `prueba_1426_gpu.py` | **OK** | 0 s |
| 14 | `prueba_1427_gpu.py` | **OK** | 24 s |
| 15 | `prueba_horizonte_1428_gpu.py` | **OK** | 5 s |
| 16 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 17 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 37, 'peor': 133, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_1419.py — OK

```
{'policia': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'policia2': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'policia3': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'ambulancia': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'clip': {'paint': 16720384, 'bar': None, 'tl': 1}, 'hilos': {'paint': 16720384, 'bar': None, 'tl': 1}, 'pesos': {'hilos': 5, 'navarra': 3, 'triplon': 3}, 'viejosEnLista': [], 'patrullas': ['policia3', 'policia', 'policia2']}
policia OK
policia2 OK
policia3 OK
ambulancia OK
COCHES_NORMALES_SE_TINEN OK
VIEJOS_SUSTITUIDOS OK
VARIAS_PATRULLAS OK
errores []
PRUEBA 1419 OK
```

### 3. prueba_1420.py — OK

```
{'col': {'taxi': {'paint': 16185076, 'bar': 0}, 'taxi2': {'paint': 16185076, 'bar': 0}, 'taxi3': {'paint': 16185076, 'bar': 0}, 'bomberos': {'paint': 11736092, 'bar': 2}, 'grua': {'paint': 15905306, 'bar': 0}, 'policia': {'paint': 16185076, 'bar': 2}, 'daily': {'paint': 16720384, 'bar': 0}, 'daily2': {'paint': 16720384, 'bar': 0}, 'canter': {'paint': 16720384, 'bar': 0}, 'sprinter': {'paint': 16720384, 'bar': 0}, 'clip': {'paint': 16720384, 'bar': 0}}, 'alias': ['clip', 'traficc', 'vivita', 'carlota', 'helado', 'hilos'], 'viejos': [], 'nunca': [], 'vistos': 70, 'taxis': ['taxi', 'taxi3', 'taxi2']}
TAXIS_BLANCOS OK
BOMBEROS_ROJO_Y_LUCES OK
GRUA_AMARILLA OK
CAMIONES_SE_TINEN OK
IDS_VIEJOS OK
SOLO_BASURA_VIEJA OK
VARIOS_TAXIS OK
TODOS_SE_VEN_CIRCULANDO OK
errores []
PRUEBA 1420 OK
```

### 4. prueba_1421.py — OK

```
{'bus': {'id': 'guagua', 'type': 'bus', 'paint': 2067020, 'L': 11.4}, 'basura': 16185076, 'viejos': []}
GUAGUA_PROPIA OK
BASURA_BLANCA OK
SIN_MODELOS_VIEJOS OK
errores []
PRUEBA 1421 OK
```

### 5. prueba_0851.py — OK

```
esc {'antes': 'none', 'enJuego': 'attract', 'tras1': {'mode': 'menu', 'running': True}, 'fuera': True, 'estado': 'play', 'pausa': 'none'}
ESC OK
basket {'pasa': 'pass', 'humano': ['COCO'], 'antes': 'EL CHOPA'}
RECIBIR OK
persecución {'normal': 154.2781446117834, 'huye': 191.0860238371533}
PERSECUCION OK
canchas {'n': 139, 'choques': [], 'junto': [['fs', -163, -458]]}
CANCHAS OK
ayuda A GOLPE: f_punch  B SALTO/VARA: f_kick  ↓ AGACHARSE / PICADO PIEDRA/MONEDA: b_pass  exit SALIR
PICADO OK
foto v0851_marcos_0
foto v0851_marcos_1
foto v0851_marcos_2
foto v0851_marcos_3
foto v0851_marcos_4
vias_elevadas []
arriba [{"at": [-60, -230], "nombre": "Head", "c": [-60, -230], "y": [6.2, 6.4], "t": [0.2, 0.2, 0.2], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [5.5, 5.6], "t": [0.1, 0.1, 0.1], "mat": "222222"}, {"at": [-60, -230], "nombre": "lowerarm_l", "c": [-60, -230], "y": [5.5, 5.6], "t": [0, 0, 0], "mat": "c9c9c9"}, {"at": [-60, -230], "nombre": "spine_03", "c": [-60, -230], "y": [6, 6], "t": [0.2, 0, 0.2], "mat": "d9b44a"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.2, 6.2], "t": [0.1, 0, 0], "mat": "1a1410"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [6.2, 6.2], "t": [0.1, 0, 0], "mat": "ffffff"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [5.1, 5.2], "t": [0.6, 0, 0.6], "mat": "f5b72e"}, {"at": [-60, -230], "nombre": "", "c": [-60, -230], "y": [5.1, 5.2], "t": [0.3, 0, 0.3], "mat": "f5b72e"}]
errores []
PRUEBA 0851 OK
```

### 6. prueba_076.py — OK

```
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-60, -230], 'fuego': [-60, -222.5], 'gota_v': [0, -1.7, 12.3], 'charcos': [[0.5, 6.8]], 'apuntando': False, 'mano': [-0.08, 2.23, 0.23]}, 'gotas': 45, 'charcos': 3, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 95%\nTAB / 1: puños'}
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

### 7. prueba_pelea_especiales.py — FALLA

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":13.699999999999998,"gofio":true}
teide NO {"walk":13.699999999999998,"gofio":true}
gancho OK {"walk":13.699999999999998,"gofio":true,"gancho":true}
pastor OK {"walk":13.699999999999998,"gofio":true,"gancho":true,"pastor":true}
ESPECIALES FALLA
```

### 8. prueba_079.py — FALLA

```
rifle sin apuntar {'mano_dcha': 0.109, 'mano_izq': 0.024, 'angulo_antebrazo': 33}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.111, 'mano_izq': 0.166, 'angulo_antebrazo': 28}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE FALLA
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 180, 'paradas': 14, 'marcador': [2, 1]}
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
combos de la CPU buena {'combos_cpu': 10, 'marcador': [21, 39]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 FALLA
```

### 9. prueba_080.py — OK

```
abre True
foto v080_titulo
vista a los 9 s demo
foto v080_demo
vista a los 21 s scores
foto v080_records
modo play
foto v080_fase1
CICLO OK
movimientos {'anda': 160, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 287}
pogo {'pogo_mata': True, 'rebote': True}
agachado contra el perro {'agachado': True, 'perro_muerto': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 1, 'pasada': True, 'donde': [3193, 176, 199], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 0, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES OK
jefe {'empieza': 'speech', 'huye': True, 'fase': 3, 'arena': 240, 'dentro': True}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'name', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'cont'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Subir a casa de El Blanco a jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1, 'luz': True}
foto v080_portal_blanco
BLANCO OK
foto v080_portal_adelantado
BLANCO OK
errores []
PRUEBA 080 OK
```

### 10. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'La Cocretería', 'opcion': 4, 'abre': True, 'juego': 'attract'}
foto v081_titulo
vista a los 9 s demo
foto v081_demo
foto v081_records
moneda {"creditos":1,"modo":"play","dinero":49}
BAR OK
controles {'mueve': [71, 71], 'tiro': True, 'beam': True}
mejoras y módulo {'cursor': 0, 'velocidad': 1, 'cursor2': 1, 'modulo': True, 'st0': 'front', 'lanzado': 'free', 'delante': 105, 'vuelve': 'front'}
foto v081_jugando
CONTROLES OK
foto v081_fase1
foto v081_jefe1
foto v081_fase2
foto v081_jefe2
foto v081_fase3
foto v081_jefe3
recorrido [{'fase': 1, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 103, 'puntos': 21230}, {'fase': 2, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 111, 'puntos': 21590}, {'fase': 3, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 112, 'puntos': 28370}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name', 'modo': 'cont'}
foto v081_records_nuevo
RECORDS OK
errores []
PRUEBA 081 OK
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
recorrido [{'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mencey', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 71, 'puntos': 10040}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 100, 'puntos': 11930}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 125, 'puntos': 14630}, {'estado': {'p': [133, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 86, 'puntos': 12750}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 85, 'puntos': 14860}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 154, 'puntos': 16300}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 178, 'puntos': 33140}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 12. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', 0, 87], ['sanagustin', -4, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
CASAS OK
inmobiliaria {'aviso': '<kbd>E</kbd> Entrar: Inmobiliaria Pisos Chachi (pisos en alquiler y en venta)', 'alquilado': True, 'dinero': 4750, 'hasta': 8, 'dia': 1}
ALQUILER OK
casa por dentro {'dentro': 'herradores', 'sin': '<kbd>E</kbd> La tele · sin consola (la GOFIO-8 se vende en las jugueterías)', 'con': '<kbd>E</kbd> Encender la consola GOFIO-8'}
foto v083_casa
foto v083_consola_menu
consola {'abre': True, 'm0': 'menu'} {'sel': 1, 'm1': 'attract', 'm2': 'menu'}
CONSOLA OK
cama {'aviso': '<kbd>E</kbd> Dormir hasta mañana y guardar la partida', 'hora': 8, 'salud': 100, 'dia': 2}
CAMA OK
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasEl ObispoEl SecretaCarreras del Canarión'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 13. prueba_1426_gpu.py — OK

```
{'near': 11307, 'wheels': 4, 'far': True, 'parked': 158, 'total': 7610, 'white': 0.04638633377135348, 'colors': 21, 'represented': 50, 'paintedInstance': True, 'profiles': {'reventon': [270, 14.4], 'fierilla': [252, 13.4], 'guancheGT': [232, 11.8], 'seta128': [132, 5.6], 'daily': [112, 4.2], 'basura': [82, 2.9], 'agility': [60, 4]}, 'reused': True, 'livery': 16185076}
PRUEBA MP YOU OK
```

### 14. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04498750347125798}, 'parked': {'models': 50, 'shades': 21, 'white': 0.04638633377135348}, 'liveTraffic': {'cars': 23, 'shades': 15, 'white': 1}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 15. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 11865, 'buckets': 1158, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.37722222223463986, 0.37388888887233207], 'after': [0.04222222220980459, 0.054999999991721574]}, 'views': [{'name': 'trinidad', 'runs': [[23.599999997764826, 1762], [22.600000001490116, 1715], [22.400000002235174, 1715], [24, 1762]]}, {'name': 'ronda', 'runs': [[17.899999998509884, 1159], [17.899999998509884, 1127], [16.900000002235174, 1127], [17.100000001490116, 1159]]}, {'name': 'mirador', 'runs': [[17.799999997019768, 1316], [17.900000002235174, 1289], [18, 1289], [19.100000001490116, 1316]]}]}
HORIZONTE OK
```

### 16. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 58, 'length': 1162, 'checkpoints': 4, 'sign': 15, 'cafe': 16, 'legalGrid': True, 'grid': {'same': True, 'oneway': True, 'ahead': 12, 'fwd': True, 'dot': 1, 'se': 2291, 'pe': 2291}, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 17. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

Fotos/archivos nuevos en `tests/shots/`: faros1437_apagados.jpg, faros1437_encendidos.jpg, horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg, mpyou_en_juego.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg
