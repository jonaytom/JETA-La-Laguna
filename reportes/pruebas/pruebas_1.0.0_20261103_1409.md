# Pruebas 1.0.0 — 2026-11-03 14:09 — 63/65 OK

Listas: todas, v1000m. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 744 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `audit_cruces.py` | **OK** | 0 s |
| 2 | `audit_hundimiento.py` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `prueba_074.py` | **OK** | 46 s |
| 5 | `prueba_075.py` | **OK** | 3 s |
| 6 | `prueba_076.py` | **OK** | 23 s |
| 7 | `prueba_077.py` | **OK** | 11 s |
| 8 | `prueba_078.py` | **OK** | 11 s |
| 9 | `prueba_079.py` | **OK** | 5 s |
| 10 | `prueba_080.py` | **OK** | 1 s |
| 11 | `prueba_081.py` | **OK** | 0 s |
| 12 | `prueba_082.py` | **OK** | 1 s |
| 13 | `prueba_0821.py` | **OK** | 0 s |
| 14 | `prueba_083.py` | **OK** | 2 s |
| 15 | `prueba_084.py` | **OK** | 0 s |
| 16 | `prueba_085.py` | **OK** | 1 s |
| 17 | `prueba_0851.py` | **OK** | 3 s |
| 18 | `prueba_088.py` | **OK** | 0 s |
| 19 | `prueba_089.py` | **OK** | 1 s |
| 20 | `prueba_090.py` | **OK** | 1 s |
| 21 | `prueba_093.py` | **OK** | 1 s |
| 22 | `prueba_094.py` | **FALLA** | 1 s |
| 23 | `prueba_095.py` | **OK** | 0 s |
| 24 | `prueba_0952.py` | **OK** | 1 s |
| 25 | `prueba_096.py` | **OK** | 0 s |
| 26 | `prueba_0962.py` | **OK** | 0 s |
| 27 | `prueba_098.py` | **OK** | 1 s |
| 28 | `prueba_099.py` | **OK** | 2 s |
| 29 | `prueba_0993.py` | **OK** | 1 s |
| 30 | `prueba_0994.py` | **OK** | 1 s |
| 31 | `prueba_0995.py` | **OK** | 0 s |
| 32 | `prueba_0996.py` | **OK** | 0 s |
| 33 | `prueba_0996b.py` | **OK** | 3 s |
| 34 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 35 | `prueba_ambiente.py` | **OK** | 1 s |
| 36 | `prueba_arranque.py` | **OK** | 0 s |
| 37 | `prueba_baloncesto.py` | **OK** | 14 s |
| 38 | `prueba_bloqueo.py` | **OK** | 11 s |
| 39 | `prueba_bordes.py` | **OK** | 0 s |
| 40 | `prueba_canchas.py` | **OK** | 1 s |
| 41 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 42 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 96 s |
| 43 | `prueba_diario.py` | **OK** | 0 s |
| 44 | `prueba_freno_mano.py` | **OK** | 0 s |
| 45 | `prueba_futbol.py` | **OK** | 7 s |
| 46 | `prueba_grandes.py` | **OK** | 7 s |
| 47 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 48 | `prueba_hospital.py` | **OK** | 26 s |
| 49 | `prueba_maleantes.py` | **OK** | 1 s |
| 50 | `prueba_misiones.py` | **OK** | 69 s |
| 51 | `prueba_misiones_guardado.py` | **OK** | 20 s |
| 52 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 53 | `prueba_obispo.py` | **OK** | 5 s |
| 54 | `prueba_panel_controles.py` | **OK** | 13 s |
| 55 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 56 | `prueba_pasos.py` | **OK** | 2 s |
| 57 | `prueba_pelea_atras.py` | **OK** | 12 s |
| 58 | `prueba_pelea_especiales.py` | **OK** | 14 s |
| 59 | `prueba_pendientes_faciles.py` | **FALLA** | 2 s |
| 60 | `prueba_peralte.py` | **OK** | 0 s |
| 61 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 88 s |
| 62 | `prueba_recorte.py` | **OK** | 0 s |
| 63 | `prueba_trinidad.py` | **OK** | 5 s |
| 64 | `herramientas/foto_calles_estrechadas.py` | **OK** | 1 s |
| 65 | `herramientas/sonda_edificios_dudosos.py` | **OK** | 8 s |

## Detalle

### 1. audit_cruces.py — OK

```
conflicts 29
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 4), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('motorway', 'motorway_link', 1, 1), 1), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('motorway', 'motorway', 1, 1), 1), (('motorway_link', 'motorway', 1, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 2. audit_hundimiento.py — OK

```
{"muestras":6906,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 3. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 4. prueba_074.py — OK

```
rotonda [-3044, 6, 26]
rotonda_en_calle 0
arboles_en_calle 455
farolas_en_calle 0
juan_de_vera 0
abatido {'huesos': 65, 'cambia': 0.574, 'quejido': 'Herido: ¡Ayyy... vale, vale, me rindo!', 'abajo': True}
errores JS []
V074 OK
```

### 5. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 7}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 10.93}
diario {'primera': ['Segundo', 'Charlas sueltas'], 'n': 2}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 6. prueba_076.py — OK

```
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-362.2, -1028.3], 'fuego': [-362.2, -1020.8], 'gota_v': [0, 1.2, 13.2], 'charcos': [[0.3, 13.8], [0.5, 14.5], [0.4, 12.9], [0.5, 6.9]], 'apuntando': False, 'mano': [-0.1, 0.28, 0.19]}, 'gotas': 16, 'charcos': 6, 'fuego_apagado': True, 'agua': [100, 91], 'hud': 'RIFLE DE AGUA 92%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True, 'mision': False}
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-621.1913417161826, -300.4619397662556, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'El torneo de la parroquia', 'Un partido por La Concepción', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1250, 1524]}
foto v076_secreta
  empieza ['secreta', 0, 'Tostón, de la Secreta', 'Tostón, de la Secreta', True]
  empieza ['secreta', 1, 'Contenedores en llamas', 'Contenedores en llamas', True]
  empieza ['secreta', 2, 'El partido amañado', 'El partido amañado', True]
  empieza ['secreta', 3, 'Triple en la cancha', 'Triple en la cancha', True]
  empieza ['secreta', 4, 'Al pirómano, agua', 'Al pirómano, agua', True]
  empieza ['secreta', 5, 'Operación Gofio Blanco', 'Operación Gofio Blanco', True]
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

### 7. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 8416, 'juntadas': 7730, 'mallas': 1801, 'ms': 308, 'no': {'con hijos (se juntan desde v1.0.0)': 588, 'grupo con nombre': 3646, 'varios materiales': 2, 'userData': 103, 'onBeforeRender': 2}, 'ejemplos': {'con hijos (se juntan desde v1.0.0)': [[180, -617, 'CylinderGeometry'], [179, -617, 'CylinderGeometry'], [179, -615, 'CylinderGeometry'], [178, -615, 'CylinderGeometry'], [183, -615, 'CylinderGeometry'], [181, -616, 'CylinderGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[143, 5, 'CylinderGeometry'], [-147, -618, 'ShapeGeometry']]}, 'ultimoId': 25835}, 'fusion': 1801, 'celdas': 5003, 'lod': 10354, 'peatones_enteros': 11}
distancia {'cerca': [105, 105], 'lejos': [0, 9392], 'niebla': 520}
aparcados {'grupos': 2832, 'coches': 8943, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 9554 ms; plazas [645] aparcados [298]
junta piezas 7730
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 7730
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 482.9126336264246, "z": 1258.136450345903, "len": 16.6, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 245.5665466764729, "z": 1040.3293616507315, "len": 5.5, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 305.47831964174856, "z": 1012.9021004478143, "len": 1.5, "ancho": 2.6, "y": -43.3}, {"name": "", "x": 303.25, "z": 1016, "len": 6.1, "ancho": 2.6, "y": -43.1}, {"name": "", "x": 299.75, "z": 1021, "len": 6.1, "ancho": 2.6, "y": -42.8}, {"name": "", "x": 294.8380421967213, "z": 1028.7699296721312, "len": 12.3, "ancho": 2.6, "y": -42.5}, {"name": "", "x": 245.35231757455904, "z": 921.6725837614111, "len": 7.7, "ancho": 2.6, "y": -42.6}, {"name": "", "x": 247.25, "z": 915.25, "len": 5.7, "ancho": 2.6, "y": -42.7}, {"name": "", "x": 250.5, "z": 910.75, "len": 6.1, "ancho": 2.6, "y": -42.7}, {"name": "", "x": 255.25, "z": 907.5, "len": 5.4, "ancho": 2.6, "y": -42.8}, {"name"
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -0.72), ([-184, -19], True, -3.92, True, -0.82), ([-188, -9], True, -3.92, True, -0.82), ([-217.5, 58.5], True, -3.81, False, 4.47)]
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

### 9. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.103, 'mano_izq': 0.042, 'angulo_antebrazo': 32}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.113, 'mano_izq': 0.057, 'angulo_antebrazo': 65}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 0, 'marcador': [1, 4]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': False}
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
combos de la CPU buena {'combos_cpu': 9, 'marcador': [35, 29]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 10. prueba_080.py — OK

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
movimientos {'anda': 156, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 277}
pogo {'pogo_mata': True, 'rebote': True}
agachado contra el perro {'agachado': True, 'perro_muerto': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 0, 'pasada': True, 'donde': [3193, 176, 199], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES OK
jefe {'empieza': 'speech', 'huye': True, 'fase': 3, 'arena': 240, 'dentro': True}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
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

### 11. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'La Venta de la Esquinita', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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
recorrido [{'fase': 1, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 103, 'puntos': 21280}, {'fase': 2, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 111, 'puntos': 21590}, {'fase': 3, 'avance': 1.01, 'jefe': True, 'pasada': True, 'segundos': 112, 'puntos': 28370}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name', 'modo': 'attract'}
foto v081_records_nuevo
RECORDS OK
errores []
PRUEBA 081 OK
```

### 12. prueba_082.py — OK

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
recorrido [{'estado': {'p': [259, 26, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mirla', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 127, 'puntos': 10610}, {'estado': {'p': [259, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 73, 'puntos': 11720}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 91, 'puntos': 13900}, {'estado': {'p': [238, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 92, 'puntos': 13700}, {'estado': {'p': [259, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 102, 'puntos': 15830}, {'estado': {'p': [259, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 181, 'puntos': 16450}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 137, 'puntos': 32560}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
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
casas {'casas': ['herradores', 'sanagustin', 'viana', 'adelantado'], 'inmo': True, 'cerrada': True, 'puertas': [['herradores', 0, 87], ['sanagustin', -3, -226], ['viana', 89, -246], ['adelantado', 193, 19]]}
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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'TúMisiónDestino (GPS)ComidaPolicíaMaleanteCasa de El BlancoBar con la máquina del GUFOJugueteríaInmobiliaria Pisos ChachiTu casa'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 15. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [8, 4], 'pases': 15, 'con_balon': ['EL CHOPA', 'EL LARGO', 'EL MÁS ALTO', 'EL PIBE', 'COCO', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [21.5, 18.1, 15.2, 16.8, 19, 12.2]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 16. prueba_085.py — OK

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
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'PORTUGAL'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 17. prueba_0851.py — OK

```
esc {'enJuego': 'attract', 'tras1': {'mode': 'menu', 'running': True}, 'fuera': True, 'estado': 'play', 'pausa': 'none'}
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
arriba []
errores []
PRUEBA 0851 OK
```

### 18. prueba_088.py — OK

```
partido {'ok': True, 'juega': True, 'n': 12, 'marcador': [0, 0]}
foto v088_futbol
PARTIDO OK
errores []
PRUEBA 088 OK
```

### 19. prueba_089.py — OK

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

### 20. prueba_090.py — OK

```
saque {'fase': 'score', 'jump': 0.09, 'inb': 'inbound', 'bx': 27.46, 'team': 1, 'luego': 'play', 'ball': 'pass'}
foto v090_basket
foto v090_basket_mate
público function
foto v090_guanche_elegir
guanche {'fase': 'select'}
héroe {'id': 'mencey', 'name': 'EL MAGOTE', 'made': -1}
foto v090_guanche_mencey
héroe {'id': 'pastor', 'name': 'EL MENCEY', 'made': -1}
foto v090_guanche_pastor
héroe {'id': 'mirla', 'name': 'LA MIRLADORA', 'made': -1}
foto v090_guanche_mirla
foto v090_bencomo_titulo
SAQUE DE FONDO OK
NOMBRES GUANCHE OK
errores []
PRUEBA 090 OK
```

### 21. prueba_093.py — OK

```
hojas 37 sin cargar []
foto v093_guanche_elegir
foto v093_guanche_magote
foto v093_guanche_mencey
foto v093_guanche_mirla
foto v093_guanche_montado
lagarto {'walk': 25.000000000000064} {'run': 47.99999999999993, 'running': True}
foto v093_guanche_jefes
foto v093_bencomo_titulo
bencomo dibujado 1
foto v093_bencomo_castellanos
foto v093_bencomo_agachado
foto v093_bencomo_golpebajo
foto v093_bencomo_lugo
LAGARTO CORRE OK
BENCOMO NUEVO OK
errores []
PRUEBA 093 OK
```

### 22. prueba_094.py — FALLA

```
golpe a 10 de profundidad {'hp0': 8, 'hp': 6}
patadas {'sStun': False, 'wStun': False, 'strongHit': True, 'hp': [21, 14.6], 'bigNo': True}
foto v094_guanche_retrato
foto v094_bencomo_salto
foto v094_bencomo_picado
PROFUNDIDAD OK
PATADAS Y GOLPE FUERTE FALLA
errores []
PRUEBA 094 FALLA
```

### 23. prueba_095.py — OK

```
jugadores {'n': 12, 't0': 6, 'ys': [68.8, 53, 53, 39, 35.6, 39, 1.2, 17, 17, 31, 33.5, 31]}
cambio en defensa {'ctl': 'delante', 'db': '3.41', 'df': '4.19'}
foto v095_futbol
foto v095_bencomo_picado
foto v095_bencomo_golpebajo
SEIS POR EQUIPO OK
CAMBIO EN DEFENSA OK
errores []
PRUEBA 095 OK
```

### 24. prueba_0952.py — OK

```
campamento {'fase': 'camp', 'montado': False, 'dibujado': 1, 'cargadas': 5}
foto v0952_campamento
SE VE EN EL CAMPAMENTO OK
HOJAS CARGADAS AL ABRIR OK
foto v0953_bencomo_caballero
errores []
PRUEBA 0952 OK
```

### 25. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

### 26. prueba_0962.py — OK

```
saque del portero {'caso': 'libre', 'a': 'cercano', 'alto': 0.06}
saque del portero {'caso': 'tapado', 'a': 'cercano', 'alto': 2.08}
SAQUE AL CERCANO (RASO O BOMBEADO) OK
errores []
PRUEBA 0962 OK
```

### 27. prueba_098.py — OK

```
fases ['EL POBLADO DE TAORO', 'LA LAURISILVA DE ANAGA', 'EL BARRANCO DEL INFIERNO', 'LOS ACANTILADOS DE LOS GIGANTES', 'EL MALPAÍS DE GÜÍMAR', 'LAS CAÑADAS DEL TEIDE', 'DENTRO DEL ECHEYDE']
foto v098_barranco {'g_rata': 2, 'g_gollux': 1, 'mirla': 1, 'g_lobo': 1}
foto v098_malpais {'g_gorgona1': 1, 'g_gorgona3': 1, 'mirla': 1, 'g_gorgona2': 1}
foto v098_echeyde {'g_guayota': 1, 'mirla': 1, 'g_overlord': 1}
FASES NUEVAS OK
HOJAS NUEVAS DIBUJADAS OK
errores []
PRUEBA 098 OK
```

### 28. prueba_099.py — OK

```
foto v099_guanche_0 {'fase': 'EL POBLADO DE TAORO', 'drawn': 1}
foto v099_guanche_1 {'fase': 'LA LAURISILVA DE ANAGA', 'drawn': 1}
foto v099_guanche_2 {'fase': 'EL BARRANCO DEL INFIERNO', 'drawn': 1}
foto v099_guanche_3 {'fase': 'LOS ACANTILADOS DE LOS GIGANTES', 'drawn': 1}
foto v099_guanche_4 {'fase': 'EL MALPAÍS DE GÜÍMAR', 'drawn': 1}
foto v099_guanche_5 {'fase': 'LAS CAÑADAS DEL TEIDE', 'drawn': 1}
foto v099_guanche_6 {'fase': 'DENTRO DEL ECHEYDE', 'drawn': 1}
foto v099_guayota {'calls': [['g_overlord', 0.8333333333333334], ['mirla', 0.8333333333333334]]}
GUAYOTA PIXEL A PIXEL OK
foto v099_bencomo_0 {'drawn': 1}
foto v099_bencomo_1 {'drawn': 1}
foto v099_bencomo_2 {'drawn': 1}
FONDOS GUANCHE OK
FONDOS BENCOMO OK
errores []
PRUEBA 099 OK
```

### 29. prueba_0993.py — OK

```
foto v0993_secuazas {'fem': 4, 'cnt': {'g_secuaz': 8, 'g_sec_lenadora': 1, 'mirla': 1, 'g_sec_vikinga': 2, 'g_sec_roja': 1}}
SECUACES HEMBRA Y MIRLADORA DIBUJADAS OK
errores []
PRUEBA 0993 OK
```

### 30. prueba_0994.py — OK

```
foto v0994_basket {'ready': True, 'drawn': 6}
JUGADORES DEL PACK OK
errores []
PRUEBA 0994 OK
```

### 31. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 8943
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o4_148m', 'aL_o2_86', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 110 tramos, 8412 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 32. prueba_0996.py — OK

```
paso 564 hundido 4.29 m, pendiente máx 0.097 cruces (vía, x, z, hueco m): [[2023, 639, -1154, 6.4]]
paso 658 hundido 2.38 m, pendiente máx 0.191 cruces (vía, x, z, hueco m): [[2021, 631, 592, 6.4]]
paso 892 hundido 5.68 m, pendiente máx 0.121 cruces (vía, x, z, hueco m): [[2331, 1504, 2767, 6.4], [2464, 1492, 2778, 6.4]]
paso 911 hundido 3.01 m, pendiente máx 0.199 cruces (vía, x, z, hueco m): [[1293, 1831, 3131, 6.58], [2464, 1818, 3144, 6.58]]
paso 919 hundido 2.9 m, pendiente máx 0.173 cruces (vía, x, z, hueco m): [[1293, 1799, 3095, 6.65], [2464, 1786, 3107, 6.6]]
paso 1082 hundido 5.49 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): [[3098, 2208, 3277, 6.43]]
paso 1666 hundido 7.03 m, pendiente máx 0.132 cruces (vía, x, z, hueco m): [[1516, 1112, 2486, 7.53], [3373, 1118, 2477, 7.51]]
paso 1973 hundido 6.33 m, pendiente máx 0.144 cruces (vía, x, z, hueco m): []
paso 2706 hundido 5.36 m, pendiente máx 0.108 cruces (vía, x, z, hueco m): []
paso 3021 hundido 5.51 m, pendiente máx 0.076 cruces (vía, x, z, hueco m): []
paso 3396 hundido 5.36 m, pendiente máx 0.082 cruces (vía, x, z, hueco m): []
paso 3631 hundido 5.43 m, pendiente máx 0.161 cruces (vía, x, z, hueco m): [[1774, -342, 803, 6.4]]
paso 3662 hundido 2.38 m, pendiente máx 0.215 cruces (vía, x, z, hueco m): []
paso 3706 hundido 6.04 m, pendiente máx 0.136 cruces (vía, x, z, hueco m): [[2310, 1497, 1720, 6.4], [2311, 1474, 1695, 6.38]]
paso 5096 hundido 5.36 m, pendiente máx 0.267 cruces (vía, x, z, hueco m): []
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 17 OK
errores []
PRUEBA 0996 OK
```

### 33. prueba_0996b.py — OK

```
foto v0996_bk_mate_360 {'drawn': 6, 'strip': 7360, 'hang': False}
foto v0996_bk_mate_360_aro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_molino {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_espaldas_aro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_piernas {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_tiro {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_robo {'drawn': 6, 'strip': 7360, 'hang': True}
foto v0996_bk_rebote_tapon {'drawn': 6, 'strip': 7360, 'hang': True}
jugadores (semilla, tamaño) [['EL CHOPA', 4822, 1.02], ['COCO', 791, 1.03], ['EL BLANCO', 511, 1.02], ['EL MÁS ALTO', 9810, 1.06], ['EL PIBE', 8027, 0.93], ['RIVAL 3', 7431, 1.01]]
ANIMACIONES NUEVAS Y ASPECTOS DISTINTOS OK
errores []
PRUEBA 0996B OK
```

### 34. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 35. prueba_ambiente.py — OK

```
{"estado":"running","errores":0,"hora":"10.05"}
```

### 36. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 35, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 37. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [4, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[4,2]}
PARTIDO CPU OK
partido fácil 1 [27, 3]
partido fácil 2 [18, 0]
partido fácil 3 [23, 0]
equilibrio primer partido [68, 3] OK
jugadores dibujados 69
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

### 38. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":339.30000000000166,"blocked":true},"hp":99,"dir":1}
```

### 39. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"¡Ay! Te has dado un buen golpe (-13 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":2}
```

### 40. prueba_canchas.py — OK

```
   ['c7', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c8', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c9', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c10', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c11', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c12', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c13', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c14', 'court', 'la cancha de baloncesto', 1, -167, -1106]
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
   ['mayex', 'door', 'Colegio Máyex', 1, -61, -426]
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

### 41. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.2","punta":"195","maxV":"207","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -1498 · Y 0 · 575 m"}
```

### 42. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 1.900000000372529
{"frame":566,"calls":1340,"triangles":2247277,"points":0,"lines":0} calls:1340
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 43. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 42
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a la Casa Ossuna | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 44. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 77, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 243, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 54, 'kmh_1s': 37, 'giro_1s_grados': 141, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 31, 'kmh_1s': 44, 'giro_1s_grados': 114, 'derrape_final': 0, 'kmh_3s': 58, 'giro_3s_grados': 179, 'derrape_max_grados': 31}
OK
```

### 45. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [1, 0], 'golden': False}
resultado {"won":true,"score":[1,0]}
PARTIDO CPU OK
partido fácil 1 [5, 0]
partido fácil 2 [6, 0]
partido fácil 3 [9, 0]
equilibrio primer partido [20, 0] OK
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
campos {'campos': 73, 'puertas': 10, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 46. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 374, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 678}
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

### 47. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793714547276,"label":"test","player":{"x":-0.07223847906679381,"z":11.177356158118583,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":0,"x":-2.072238479066794,"z":11.177356158118583},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":t
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1793714277970],["Segundo","adiós",1793714277971]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1793714285485],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1793714285498],["El Chopa","¿Y si me gana él?",1793714285505],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1793714285511]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1793714293683],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1793714293701],["El Chopa","¿Y usted no viene?",1793714293709],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1793714293714]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1793714293801],["El Chopa","¿Y los bomberos?",1793714293831],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1793714293839]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1793714293910],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1793714293936]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1793714294019],["El Chopa","Y cuando les ganemos, ¿qué?",1793714294034],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1793714294043]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1793714294117],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1793714294140]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1793714294196],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1793714294225],["El Chopa","¿Y el resto de la Secreta?",1793714294232],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1793714294240]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1793714294310],["El Chopa","Eso no puede ser legal.",1793714294333],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1793714294340]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1793714294424],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1793714294449]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1793714294511],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1793714294539],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1793714294546]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1793714294615],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1793714294635],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1793714294643]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1793714294719],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1793714294743],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1793714294750]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1793714298360],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1793714298389],["El Chopa","Monseñor, ¿esto es legal?",1793714298395],["Monseñor Fermín Truchas","Hijo, es fútbol.",1793714298401]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1793714298473],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1793714298520]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1793714337778]],"La inmobiliaria":[["Pisos Chachi (por el móvil)","¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?",1793714396016],["Pisos Chachi (por el móvil)","¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?",1793714400318]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1793714534345],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1793714534358],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1793714534361],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1793714534363],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1793714535973]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"basketTut":false,"futbolTut":true,"patrol":false,"defenders":true,"arcade":{"scores":{"prueba":[["BCA",987650],["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000]],"bar_La Venta de la Esquinita":[["BCA",987730],["BLA",80000],["COC",72000],["SAS",64000],["BOC",56000],["CHO",48000],["AYO",40000],["GUA",32000],["TIN",24000],["YAI",16000]],"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_090":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_093":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_093b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_094":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_094b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_095":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_0952":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_0953":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_096":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_098":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_099":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_099b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_0993":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":2,"lastTod":12.00111111111111}},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 48. prueba_hospital.py — OK

```
CENTRO DE SALUD LAGUNA-UNIVERSIDAD → reaparece a 0.0 m -$100 OK
QUIRÓFANO SALUD · CLÍNICA → reaparece a 0.0 m -$100 OK
Urgencias del HUC → reaparece a 0.0 m -$100 OK
CENTRO DE SALUD SAN BENITO → reaparece a 0.0 m -$100 OK
CENTRO DE SALUD LA CUESTA → reaparece a 0.0 m -$100 OK
CENTRO DE SALUD TACO → reaparece a 0.0 m -$100 OK
CENTRO DE SALUD FINCA ESPAÑA → reaparece a 0.0 m -$100 OK
HOSPITAL OK
```

### 49. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Gofio Negro', 't': 239.70000000000002, 'd': 73}
en_minimapa True
pelea True
rival {'name': 'EL GOFIO NEGRO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 50. prueba_misiones.py — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
[7] Defensores de La Laguna: PASA · dinero +1000 · pasos dlg>idle
[8] Los bancos del Adelantado: PASA · dinero +900 · pasos talk>goto>talk>fight>shot>talk>idle
[9] El gofio robado: PASA · dinero +1100 · pasos talk>goto>talk>goto>talk>goto>talk>fight>enter>goto>talk>idle
[10] El carterista del Cristo: PASA · dinero +600 · pasos talk>goto>chase>talk>fight>idle
[11] Carrera solidaria del casco: PASA · dinero +700 · pasos talk>goto>idle
[12] El rally de La Esperanza: PASA · dinero +1200 · pasos talk>car>goto>countdown>goto>idle
[13] Baches en la Vía de Ronda: PASA · dinero +900 · pasos talk>enter>goto>idle
[14] Escolta a la guagua del Romero: PASA · dinero +1000 · pasos talk>car>escort>talk>idle
[15] La guagua de la broma: PASA · dinero +900 · pasos talk>car>escort>talk>idle
[16] Grafiteros en el tranvía: PASA · dinero +800 · pasos talk>goto>shot>talk>idle
[17] Noche en el aeropuerto: PASA · dinero +2000 · pasos talk>goto>damage>shot>talk>idle
[18] El rifle de agua: PASA · dinero +300 · pasos talk>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 51. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1793714277970],["Segundo","adiós",1793714277971]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1793714285485],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1793714285498],["El Chopa","¿Y si me gana él?",1793714285505],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1793714285511]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1793714293683],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1793714293701],["El Chopa","¿Y usted no viene?",1793714293709],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1793714293714]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1793714293801],["El Chopa","¿Y los bomberos?",1793714293831],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1793714293839]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1793714293910],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1793714293936]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1793714294019],["El Chopa","Y cuando les ganemos, ¿qué?",1793714294034],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1793714294043]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1793714294117],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1793714294140]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1793714294196],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1793714294225],["El Chopa","¿Y el resto de la Secreta?",1793714294232],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1793714294240]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1793714294310],["El Chopa","Eso no puede ser legal.",1793714294333],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1793714294340]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1793714294424],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1793714294449]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1793714294511],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1793714294539],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1793714294546]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1793714294615],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1793714294635],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1793714294643]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1793714294719],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1793714294743],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1793714294750]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1793714298360],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1793714298389],["El Chopa","Monseñor, ¿esto es legal?",1793714298395],["Monseñor Fermín Truchas","Hijo, es fútbol.",1793714298401]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1793714298473],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1793714298520]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1793714337778]],"La inmobiliaria":[["Pisos Chachi (por el móvil)","¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?",1793714396016],["Pisos Chachi (por el móvil)","¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?",1793714400318]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1793714534345],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1793714534358],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1793714534361],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1793714534363],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1793714535973]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1793714646669],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1793714646684],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1793714646699],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1793714646726],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1793714646754],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1793714646829],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1793714646852],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1793714657201]],"Defensores de La Laguna":[["Don Yovoy Gofiérrez","Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.",1793714590689],["Don Yovoy Gofiérrez","Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.",1793714590832],["Boca Papa","Señor alcalde, ¿eso trae dietas? Porque yo como mucho.",1793714591241],["Don Yovoy Gofiérrez","Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.",1793714591645],["Rayco «El Blanco»","«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>",1793714592054],["El Chopa","Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.",1793714592458],["Don Yovoy Gofiérrez","Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.",1793714592862]],"Los bancos del Adelantado":[["Don Yovoy Gofiérrez","¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.",1793714593576],["Don Yovoy Gofiérrez","Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.",1793714593584],["Chatarrero","¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!",1793714593621],["Pepe","¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!",1793714602664]],"El gofio robado":[["Boca Papa","¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.",1793714602717],["Boca Papa","Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.",1793714602725],["Vecina del casco","Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.",1793714602752],["Vecino con boina","Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!",1793714602790],["El Molinero Falso","¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?",1793714602875],["Boca Papa","¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.",1793714612786]],"El carterista del Cristo":[["Coco","Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.",1793714612830],["Coco","Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.",1793714612839],["Carterista","¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!",1793714612964]],"Carrera solidaria del casco":[["Don Yovoy Gofiérrez","La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.",1793714623815],["Don Yovoy Gofiérrez","Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.",1793714623832]],"El rally de La Esperanza":[["El Canarión","¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.",1793714624061],["El Canarión","Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.",1793714624080],["Pijo de La Esperanza","Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.",1793714627618]],"Baches en la Vía de Ronda":[["Don Yovoy Gofiérrez","Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.",1793714627688],["Don Yovoy Gofiérrez","Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.",1793714627700]],"Escolta a la guagua del Romero":[["Don Yovoy Gofiérrez","Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.",1793714627970],["Don Yovoy Gofiérrez","Síguela de cerca, sin alejarte, hasta el final del recorrido.",1793714627985],["Suegra del alcalde (por la ventanilla)","¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!",1793714641263]],"La guagua de la broma":[["Boca Papa","¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.",1793714641351],["Boca Papa","No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.",1793714641366],["Bromista","Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!",1793714642055]],"Grafiteros en el tranvía":[["Sastrón","¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.",1793714642155],["Sastrón","Corre antes de que acaben. Y llévate la de bolas: son rápidos.",1793714642171],["Grafitero","¡Au! ¡Vale, lo limpiamos, lo limpiamos!",1793714642297]],"Noche en el aeropuerto":[["Rayco «El Blanco»","«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»",1793714642413],["Boca Papa (por el móvil)","Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!",1793714642429],["Contrabandista","¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!",1793714642543],["Don Yovoy Gofiérrez (por el móvil)","Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!",1793714642570]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1793714642690],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1793714642706],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1793714642734],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1793714642761],["Rayco «El Blanco»","«Psss... siesta.»",1793714642792],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1793714642869],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1793714642893],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1793714646207],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1793714646244],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1793714646331],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1793714646361],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1793714646421],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1793714646448],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1793714646482],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1793714646512]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"basketTut":false,"futbolTut":true,"patrol":true,"defenders":true,"arcade":{"scores":{"prueba":[["BCA",987650],["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000]],"bar_La Venta de la Esquinita":[["BCA",987730],["BLA",80000],["COC",72000],["SAS",64000],["BOC",56000],["CHO",48000],["AYO",40000],["GUA",32000],["TIN",24000],["YAI",16000]],"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_090":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_093":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_093b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_094":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_094b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_095":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_0952":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_0953":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_096":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_098":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_099":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_099b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_0993":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":2,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Nuevo: el SECRETA te espera en la Avenida de los Menceyes (círculo salmón)"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1793714277970], ['Segundo', 'adiós', 1793714277971]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1793714285485], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1793714285498], ['El Chopa', '¿Y si me gana él?', 1793714285505], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1793714285511]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1793714293683], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1793714293701], ['El Chopa', '¿Y usted no viene?', 1793714293709], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1793714293714]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1793714293801], ['El Chopa', '¿Y los bomberos?', 1793714293831], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1793714293839]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1793714293910], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1793714293936]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1793714294019], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1793714294034], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1793714294043]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1793714294117], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1793714294140]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1793714294196], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1793714294225], ['El Chopa', '¿Y el resto de la Secreta?', 1793714294232], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1793714294240]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1793714294310], ['El Chopa', 'Eso no puede ser legal.', 1793714294333], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1793714294340]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1793714294424], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1793714294449]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1793714294511], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1793714294539], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1793714294546]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1793714294615], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1793714294635], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1793714294643]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1793714294719], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1793714294743], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1793714294750]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1793714298360], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1793714298389], ['El Chopa', 'Monseñor, ¿esto es legal?', 1793714298395], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1793714298401]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1793714298473], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1793714298520]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1793714337778]], 'La inmobiliaria': [['Pisos Chachi (por el móvil)', '¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?', 1793714396016], ['Pisos Chachi (por el móvil)', '¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?', 1793714400318]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1793714534345], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1793714534358], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1793714534361], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1793714534363], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1793714535973]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1793714646669], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1793714646684], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1793714646699], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1793714646726], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1793714646754], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1793714646829], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1793714646852], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1793714657201]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1793714590689], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1793714590832], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1793714591241], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1793714591645], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1793714592054], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1793714592458], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1793714592862]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1793714593576], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1793714593584], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1793714593621], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1793714602664]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1793714602717], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1793714602725], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1793714602752], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1793714602790], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1793714602875], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1793714612786]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1793714612830], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1793714612839], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1793714612964]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1793714623815], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1793714623832]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1793714624061], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1793714624080], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1793714627618]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1793714627688], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1793714627700]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1793714627970], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1793714627985], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1793714641263]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1793714641351], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1793714641366], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1793714642055]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1793714642155], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1793714642171], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1793714642297]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1793714642413], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1793714642429], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1793714642543], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1793714642570]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1793714642690], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1793714642706], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1793714642734], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1793714642761], ['Rayco «El Blanco»', '«Psss... siesta.»', 1793714642792], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1793714642869], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1793714642893], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1793714646207], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1793714646244], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1793714646331], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1793714646361], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1793714646421], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1793714646448], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1793714646482], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1793714646512]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'basketTut': False, 'futbolTut': True, 'patrol': True, 'defenders': True, 'arcade': {'scores': {'prueba': [['BCA', 987650], ['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000]], 'bar_La Venta de la Esquinita': [['BCA', 987730], ['BLA', 80000], ['COC', 72000], ['SAS', 64000], ['BOC', 56000], ['CHO', 48000], ['AYO', 40000], ['GUA', 32000], ['TIN', 24000], ['YAI', 16000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_090': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_094': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_094b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_095': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0952': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_0953': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_096': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_098': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_099': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_099b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0993': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 2, 'lastTod': 12.037111111111058}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1793714277970], ['Segundo', 'adiós', 1793714277971]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1793714285485], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1793714285498], ['El Chopa', '¿Y si me gana él?', 1793714285505], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1793714285511]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1793714293683], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1793714293701], ['El Chopa', '¿Y usted no viene?', 1793714293709], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1793714293714]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1793714293801], ['El Chopa', '¿Y los bomberos?', 1793714293831], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1793714293839]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1793714293910], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1793714293936]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1793714294019], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1793714294034], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1793714294043]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1793714294117], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1793714294140]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1793714294196], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1793714294225], ['El Chopa', '¿Y el resto de la Secreta?', 1793714294232], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1793714294240]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1793714294310], ['El Chopa', 'Eso no puede ser legal.', 1793714294333], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1793714294340]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1793714294424], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1793714294449]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1793714294511], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1793714294539], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1793714294546]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1793714294615], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1793714294635], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1793714294643]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1793714294719], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1793714294743], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1793714294750]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1793714298360], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1793714298389], ['El Chopa', 'Monseñor, ¿esto es legal?', 1793714298395], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1793714298401]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1793714298473], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1793714298520]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1793714337778]], 'La inmobiliaria': [['Pisos Chachi (por el móvil)', '¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?', 1793714396016], ['Pisos Chachi (por el móvil)', '¡Hola, hola! ¿Hablo con el famoso Chopa de los Defensores de La Laguna? Le llamo de <b>Inmobiliaria Pisos Chachi</b>. ¿Sigue durmiendo en el sofá de su madre?', 1793714400318]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1793714534345], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1793714534358], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1793714534361], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1793714534363], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1793714535973]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1793714662603], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1793714662613]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1793714590689], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1793714590832], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1793714591241], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1793714591645], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1793714592054], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1793714592458], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1793714592862]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1793714593576], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1793714593584], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1793714593621], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1793714602664]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1793714602717], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1793714602725], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1793714602752], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1793714602790], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1793714602875], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1793714612786]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1793714612830], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1793714612839], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1793714612964]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1793714623815], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1793714623832]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1793714624061], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1793714624080], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1793714627618]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1793714627688], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1793714627700]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1793714627970], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1793714627985], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1793714641263]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1793714641351], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1793714641366], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1793714642055]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1793714642155], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1793714642171], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1793714642297]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1793714642413], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1793714642429], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1793714642543], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1793714642570]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1793714642690], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1793714642706], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1793714642734], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1793714642761], ['Rayco «El Blanco»', '«Psss... siesta.»', 1793714642792], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1793714642869], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1793714642893], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1793714646207], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1793714646244], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1793714646331], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1793714646361], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1793714646421], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1793714646448], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1793714646482], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1793714646512]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'basketTut': False, 'futbolTut': True, 'patrol': True, 'defenders': True, 'arcade': {'scores': {'prueba': [['BCA', 987650], ['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000]], 'bar_La Venta de la Esquinita': [['BCA', 987730], ['BLA', 80000], ['COC', 72000], ['SAS', 64000], ['BOC', 56000], ['CHO', 48000], ['AYO', 40000], ['GUA', 32000], ['TIN', 24000], ['YAI', 16000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_090': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_094': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_094b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_095': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0952': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_0953': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_096': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_098': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_099': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_099b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0993': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 2, 'lastTod': 12.041555555555496}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'rifleTut': False, 'basketTut': False, 'futbolTut': False, 'patrol': False, 'defenders': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 52. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 53. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 34, 'pitches': 139}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-62.01256925391742,-424.7799316530283,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 54. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":124}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 55. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 56. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 57. prueba_pelea_atras.py — OK

```
{"sep":158,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 78.0 px
{"bloqueado":false,"vida":100}
snap pelea_tamano
```

### 58. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":6.8,"gofio":true}
teide OK {"walk":13.599999999999998,"gofio":true,"teide":true,"combo":true}
gancho OK {"walk":13.599999999999998,"gofio":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":13.599999999999998,"gofio":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 59. prueba_pendientes_faciles.py — FALLA

```
lineas {'vias': 918, 'con_lineas': 69439, 'lisas': 34977, 'pct_lisas': 33.5}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.3, 'cx': -237, 'cz': 415}
edificios [[73, 234, 1.55], [-909, -408, 1.41]]
recortados 4447
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES FALLA
```

### 60. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.55, 0.54, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.54, 0.55, 0.54], 'dif': 0.01}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.55, 0.56, 0.53], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.59, 0.57, 0.59, 0.55], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.57, 0.63, 0.56], 'dif': 0.07}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.52, 0.52, 0.52], 'dif': 0}
```

### 61. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 2.099999999627471
{"frame":564,"calls":1324,"triangles":2255207,"points":0,"lines":0} calls:1324
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.55 m OK
[8] Los bancos del Adelantado: a pie: a 4 m, recorre 12 m en 3 s, salto máx 0.14 m OK
[10] El carterista del Cristo: a pie: a 7 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 5 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 62. prueba_recorte.py — OK

```
recortados 4447 de 6288 · siguen metidos ≥ 1 m: 40
   [-891, 143, 3.9, '']
   [1424, 3934, 3.3, '']
   [-4700, 91, 2.8, '']
   [-233, 768, 2.5, 'Intercambiador de La Laguna']
   [-3023, -50, 2.4, '']
   [-229, 1778, 2.3, '']
   [-880, 159, 2.2, '']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [-848, 72, 2, '']
   [2478, 2004, 2, '']
   [1696, 4075, 2, '']
   [541, 574, 1.9, '']
   [-843, 304, 1.9, '']
   [3344, 1960, 1.9, '']
   [-936, 1800, 1.8, '']
   [96, 197, 1.7, '']
   [-201, -703, 1.6, '']
   [-892, 1471, 1.6, '']
   [-963, 1808, 1.5, '']
   [-1698, 1220, 1.5, '']
   [859, 662, 1.5, '']
   [172, -767, 1.5, '']
   [-232, 33, 1.5, '']
   [-11, -253, 1.5, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 63. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-105, 81]}
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

### 64. herramientas/foto_calles_estrechadas.py — OK

```
 1. Calle Alfa (calle 3285) a 3.5 m · cruce en X 960, Y 1596 · estrechada_01.jpg
 2. Callejón la Herradura (calle 1399) a 3.6 m · cruce en X 356, Y 1072 · estrechada_02.jpg
 3. Callejón Colegio Ramiro de Maeztu (calle 2092) a 3.9 m · cruce en X 2384, Y 2026 · estrechada_03.jpg
 4. (sin nombre) (calle 4691) a 4 m · cruce en X 748, Y -1164 · estrechada_04.jpg
 5. (sin nombre) (calle 1804) a 4.1 m · cruce en X -1807, Y 293 · estrechada_05.jpg
 6. Calle Huérfano (calle 4837) a 4.1 m · cruce en X -4393, Y -328 · estrechada_06.jpg
 7. Callejón de Peña (calle 2076) a 4.4 m · cruce en X 2246, Y 2874 · estrechada_07.jpg
 8. Calle Roque Taborno (calle 1040) a 4.5 m · cruce en X 1788, Y 1851 · estrechada_08.jpg
 9. Calle Cabildo (Trans.2) (calle 1518) a 4.5 m · cruce en X -1363, Y 781 · estrechada_09.jpg
10. Pasaje la Tajea (calle 2197) a 4.5 m · cruce en X 920, Y 758 · estrechada_10.jpg
11. (sin nombre) (calle 3478) a 4.5 m · cruce en X 552, Y -417 · estrechada_11.jpg
12. (sin nombre) (calle 3969) a 4.5 m · cruce en X 2058, Y 3886 · estrechada_12.jpg
FOTOS ESTRECHADAS OK
```

### 65. herramientas/sonda_edificios_dudosos.py — OK

```
  214. X -1121, Y -838 · 63 m² · la calle lo cruza y quedaría una tira · Camino la Cruz (residential, 6 m)
  215. X -1253, Y -318 · 63 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  216. X 1440, Y 3643 · 63 m² · la calle lo cruza y quedaría una tira · Calle San Nicasio (residential, 7.9 m)
  217. X -332, Y 1038 · 62 m² · la calle lo cruza y quedaría una tira · Carretera de San Miguel de Geneto (secondary, 11.7 m)
  218. X 1405, Y 3842 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  219. X 1539, Y 3612 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Nicasio (residential, 7.9 m)
  220. X 1578, Y 3726 · 62 m² · la calle lo cruza y quedaría una tira · Calle San Félix (residential, 8 m)
  221. X 11, Y -506 · 61 m² · la calle lo cruza y quedaría una tira · Callejón Mafasca (service, 5.2 m)
  222. X 74, Y -572 · 61 m² · la calle lo cruza y quedaría una tira · Calle Quintín Benito (residential, 7.2 m)
  223. X 1644, Y 4113 · 61 m² · la calle lo cruza y quedaría una tira · Calle Virgen de Los Dolores (residential, 7.9 m)
  224. X 1561, Y 3672 · 60 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  225. X 1655, Y 3598 · 59 m² · la calle lo cruza y quedaría una tira · Calle San Vicente (residential, 7.9 m)
  226. X -1239, Y -318 · 59 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  227. X -664, Y -362 · 59 m² · la calle lo cruza y quedaría una tira · Calle de la Cordera (residential, 7.2 m)
  228. X 1394, Y 3855 · 59 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  229. X 1371, Y 3392 · 59 m² · la calle lo cruza y quedaría una tira · Avenida San Miguel de Chimisay (tertiary, 10.4 m)
  230. X 1549, Y 3602 · 58 m² · la calle lo cruza y quedaría una tira · Calle San Máximo (residential, 7.9 m)
  231. X -936, Y 1800 · 57 m² · la calle lo cruza y quedaría una tira · Camino San Francisco de Paula (secondary, 11.7 m)
  232. X 911, Y 583 · 57 m² · la calle lo cruza y quedaría una tira · Calle Miguel Hernández (residential, 7.9 m)
  233. X 34, Y -327 · 57 m² · la calle lo cruza y quedaría una tira · Calle Anchieta (residential, 7.2 m)
  234. X -4693, Y 0 · 57 m² · la calle lo cruza y quedaría una tira · Camino La Cañada (secondary, 11.7 m)
  235. X -1246, Y -404 · 57 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  236. X -1085, Y -326 · 57 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  237. X 1520, Y 3722 · 57 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  238. X 1597, Y 3603 · 57 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
  239. X -1277, Y -98 · 56 m² · la calle lo cruza y quedaría una tira · Calle Molinos de San Benito (residential, 8 m)
  240. X 813, Y 1901 · 56 m² · la calle lo cruza y quedaría una tira · (sin nombre) (residential, 7.9 m)
  241. X 921, Y 596 · 56 m² · la calle lo cruza y quedaría una tira · Calle Miguel Hernández (residential, 7.9 m)
  242. X 71, Y -556 · 56 m² · la calle lo cruza y quedaría una tira · Calle Leonardo Torriani (service, 5.2 m)
  243. X -1083, Y -927 · 56 m² · la calle lo cruza y quedaría una tira · Camino la Ermita (residential, 8 m)
  244. X 1486, Y 3750 · 56 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  245. X 909, Y 1652 · 55 m² · la calle lo cruza y quedaría una tira · Calle Osa Mayor (residential, 7.1 m)
  246. X 1264, Y 1378 · 55 m² · la calle lo cruza y quedaría una tira · Calle Córdoba (residential, 8 m)
  247. X -1119, Y 413 · 55 m² · la calle lo cruza y quedaría una tira · Camino el Vallado (residential, 7.9 m)
  248. X 1597, Y 3583 · 55 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
  249. X 1897, Y 1232 · 54 m² · la calle lo cruza y quedaría una tira · Calle Fasnia (residential, 7.9 m)
  250. X -4700, Y 282 · 54 m² · la calle lo cruza y quedaría una tira · Pasaje Cabrera (residential, 8 m)
  251. X 2478, Y 2004 · 54 m² · la calle lo cruza y quedaría una tira · Carretera de Valle Tabares (secondary, 11.7 m)
  252. X 1412, Y 3848 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  253. X 1416, Y 3829 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  254. X 1424, Y 3835 · 54 m² · la calle lo cruza y quedaría una tira · Calle San Eugenio (residential, 7.9 m)
  255. X 418, Y 1039 · 52 m² · la calle lo cruza y quedaría una tira · Calle Aranjuez (residential, 7.9 m)
  256. X 2869, Y 2154 · 52 m² · la calle lo cruza y quedaría una tira · Avenida de los Menceyes (secondary, 11.7 m)
  257. X -1246, Y -304 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Embajador Alberto de Armas (residential, 7.9 m)
  258. X -1097, Y -321 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  259. X 1468, Y 3783 · 52 m² · la calle lo cruza y quedaría una tira · Avenida San Miguel de Chimisay (tertiary, 10.4 m)
  260. X 1569, Y 3610 · 52 m² · la calle lo cruza y quedaría una tira · Calle San Eduardo (residential, 8 m)
  261. X 1556, Y 3772 · 52 m² · la calle lo cruza y quedaría una tira · Avenida Los Majuelos (tertiary, 10.4 m)
  262. X 1190, Y 1382 · 51 m² · la calle lo cruza y quedaría una tira · Calle Córdoba (residential, 8 m)
  263. X 2861, Y 2153 · 51 m² · la calle lo cruza y quedaría una tira · Calle Francisco Ramos (residential, 6.8 m)
  264. X -1242, Y -301 · 51 m² · la calle lo cruza y quedaría una tira · (sin nombre) (secondary, 11.7 m)
  265. X -1104, Y -316 · 51 m² · la calle lo cruza y quedaría una tira · Avenida Lucas Vega (residential, 7.9 m)
  266. X 1450, Y 3790 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  267. X 1448, Y 3685 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Casiano (residential, 8 m)
  268. X 1466, Y 3714 · 51 m² · la calle lo cruza y quedaría una tira · Calle San Casiano (residential, 8 m)
  269. X 1617, Y 3557 · 51 m² · la calle lo cruza y quedaría una tira · Calle Santa Berta (residential, 7.9 m)
  270. X 2125, Y 1593 · 50 m² · la calle lo cruza y quedaría una tira · Calle Roque Agando (residential, 7 m)
  271. X 1441, Y 3801 · 50 m² · la calle lo cruza y quedaría una tira · Calle San Clemente (residential, 7.9 m)
  272. X 1614, Y 3669 · 50 m² · la calle lo cruza y quedaría una tira · Calle San Sebastián (residential, 7.9 m)
SONDA EDIFICIOS DUDOSOS OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, df_1024.jpg, df_1165.jpg, df_1261.jpg, df_1267.jpg, df_1277.jpg, df_1278.jpg, df_1281.jpg, df_1287.jpg, df_1292.jpg, df_1305.jpg, df_1306.jpg, df_1569.jpg, df_1617.jpg, df_1666.jpg, df_1667.jpg, df_1747.jpg, df_1748.jpg, df_1768.jpg, df_20.jpg, df_202.jpg, df_2022.jpg, df_2295.jpg, df_2299.jpg, df_2338.jpg, df_2375.jpg, df_2394.jpg, df_2423.jpg, df_2506.jpg, df_2575.jpg, df_2873.jpg, df_3054.jpg, df_308.jpg, df_311.jpg, df_3209.jpg, df_3286.jpg, df_334.jpg, df_3374.jpg, df_3521.jpg, df_362.jpg, df_3629.jpg, df_363.jpg, df_3630.jpg, df_3631.jpg, df_366.jpg, df_368.jpg, df_3705.jpg, df_3706.jpg, df_3707.jpg, df_397.jpg, df_445.jpg, df_446.jpg, df_448.jpg, df_449.jpg, df_4562.jpg, df_4715.jpg, df_4748.jpg, df_520.jpg, df_577.jpg, df_594.jpg, df_638.jpg, df_68.jpg, df_681.jpg, df_697.jpg, df_7.jpg, df_709.jpg, df_715.jpg, df_725.jpg, df_726.jpg, df_728.jpg, df_729.jpg, df_730.jpg, df_8.jpg, df_812.jpg, df_814.jpg, df_815.jpg, df_816.jpg, df_827.jpg, df_888.jpg, df_890.jpg, df_892.jpg, df_895.jpg, df_902.jpg, df_91.jpg, df_911.jpg, df_913.jpg, df_919.jpg, df_924.jpg, df_930.jpg, dudoso_01.jpg, dudoso_02.jpg, dudoso_03.jpg, dudoso_04.jpg, dudoso_05.jpg, dudoso_06.jpg, dudoso_07.jpg, dudoso_08.jpg, dudoso_09.jpg, dudoso_10.jpg, dudoso_11.jpg, dudoso_12.jpg, dudoso_13.jpg, dudoso_14.jpg, dudoso_15.jpg, dudoso_16.jpg, dudoso_17.jpg, dudoso_18.jpg, dudoso_19.jpg, dudoso_20.jpg, dudoso_21.jpg, dudoso_22.jpg, dudoso_23.jpg, dudoso_24.jpg, dudoso_25.jpg, dudoso_26.jpg, dudoso_27.jpg, dudoso_28.jpg, dudoso_29.jpg, dudoso_30.jpg, dudoso_31.jpg, dudoso_32.jpg, dudoso_33.jpg, dudoso_34.jpg, dudoso_35.jpg, dudoso_36.jpg, dudoso_37.jpg, dudoso_38.jpg, dudoso_39.jpg, dudoso_40.jpg, dudoso_41.jpg, dudoso_42.jpg, dudoso_43.jpg, dudoso_44.jpg, dudoso_45.jpg, dudoso_46.jpg, dudoso_47.jpg, dudoso_48.jpg, dudoso_49.jpg, dudoso_50.jpg, dudoso_51.jpg, dudoso_52.jpg, dudoso_53.jpg, dudoso_54.jpg, dudoso_55.jpg, dudoso_56.jpg, dudoso_57.jpg, dudoso_58.jpg, dudoso_59.jpg, dudoso_60.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, estrechada_01.jpg, estrechada_02.jpg, estrechada_03.jpg, estrechada_04.jpg, estrechada_05.jpg, estrechada_06.jpg, estrechada_07.jpg, estrechada_08.jpg, estrechada_09.jpg, estrechada_10.jpg, estrechada_11.jpg, estrechada_12.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, obispado.jpg, pelea_tamano.jpg, ready.png, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, sonda_edificios_dudosos.txt, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v0822_mapa.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg, v088_futbol.png, v089_bencomo.jpg, v090_basket.jpg, v090_basket_mate.jpg, v090_bencomo_titulo.jpg, v090_guanche_elegir.jpg, v090_guanche_mencey.jpg, v090_guanche_mirla.jpg, v090_guanche_pastor.jpg, v093_bencomo_agachado.jpg, v093_bencomo_castellanos.jpg, v093_bencomo_golpebajo.jpg, v093_bencomo_lugo.jpg, v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg, v094_bencomo_picado.jpg, v094_bencomo_salto.jpg, v094_guanche_retrato.jpg, v0952_campamento.jpg, v0953_bencomo_caballero.jpg, v095_bencomo_golpebajo.jpg, v095_bencomo_picado.jpg, v095_futbol.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg, v098_barranco.jpg, v098_echeyde.jpg, v098_malpais.jpg, v0993_secuazas.jpg, v0994_basket.jpg, v0996_bk_espaldas_aro.jpg, v0996_bk_mate_360.jpg, v0996_bk_mate_360_aro.jpg, v0996_bk_molino.jpg, v0996_bk_piernas.jpg, v0996_bk_rebote_tapon.jpg, v0996_bk_robo.jpg, v0996_bk_tiro.jpg, v099_bencomo_0.jpg, v099_bencomo_1.jpg, v099_bencomo_2.jpg, v099_guanche_0.jpg, v099_guanche_1.jpg, v099_guanche_2.jpg, v099_guanche_3.jpg, v099_guanche_4.jpg, v099_guanche_5.jpg, v099_guanche_6.jpg, v099_guayota.jpg
