# Pruebas 0.85.0 — 2026-10-20 21:21 — 7/7 OK

Listas: v085a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 117 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_085.py` | **OK** | 69 s |
| 2 | `prueba_084.py` | **OK** | 0 s |
| 3 | `prueba_baloncesto.py` | **OK** | 16 s |
| 4 | `prueba_futbol.py` | **OK** | 6 s |
| 5 | `prueba_083.py` | **OK** | 2 s |
| 6 | `prueba_0821.py` | **OK** | 0 s |
| 7 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_085.py — OK

```
consola {'hay': True, 'sel': 1, 'cerrada': True} ELIGE TU SELECCIÓN
MENU OK
cuartos CUARTOS DE FINAL {'ronda': 0, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '1f5fbf', 'nombre': ['ESPAÑA', 'ITALIA']}
foto v085_pachanga
equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
mundialito ¡A SEMIFINAL! SEMIFINAL ¡A LA FINAL! ¡🇪🇸 ESPAÑA, CAMPEONA DEL MUNDIALITO! {'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'juega': True, 'n': 10, 'nombres': ['BRASIL', 'URUGUAY']}
foto v085_furbito
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 2. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [11, 2], 'pases': 5, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL LARGO', 'EL BLANCO', 'COCO', 'EL MÁS ALTO'], 'marcas_distintas': True, 'movidos': [19.6, 10.9, 18.1, 16.1, 15.5, 17.4]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 3. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [6, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[6,2]}
PARTIDO CPU OK
partido fácil 1 [25, 4]
partido fácil 2 [21, 0]
partido fácil 3 [23, 2]
equilibrio primer partido [69, 6] OK
jugadores dibujados 93
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

### 4. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'goal', 'sc': [3, 0], 'golden': False}
resultado {"won":true,"score":[3,0]}
PARTIDO CPU OK
partido fácil 1 [5, 0]
partido fácil 2 [10, 0]
partido fácil 3 [6, 1]
equilibrio primer partido [21, 1] OK
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
campos {'campos': 79, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f66', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f66
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 5. prueba_083.py — OK

```
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', 0, 87], ['sanagustin', -3, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'TúMisiónDestino (GPS)ComidaPolicíaCasa de El BlancoBar con la máquina del GUFOJugueteríaInmobiliaria Pisos ChachiTu casa'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 6. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 1, 'ultima': 'Prueba de la máquina'}
MOVIL OK
lo que sabes {'sabes': True, 'sabidos': ['Maleantes en busca y captura', 'La máquina de El Blanco: BENCOMO', 'GUFO, AGUERE INVASION', 'GUANCHE WARRIORS', 'Las jugueterías', 'Retos en las canchas'], 'detalle_quien': True, 'detalle_donde': True, 'detalle_charla': True}
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

### 7. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 40, 'peor': 66, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, futbol_partido.jpg, futbol_tutorial.jpg, v0822_mapa.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v085_furbito.jpg, v085_pachanga.jpg
