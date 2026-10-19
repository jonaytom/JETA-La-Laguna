# Pruebas 0.79.0 — 2026-10-19 19:56 — 39/39 OK

Listas: todas. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 932 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `audit_cruces.py` | **OK** | 0 s |
| 2 | `audit_hundimiento.py` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `prueba_074.py` | **OK** | 56 s |
| 5 | `prueba_075.py` | **OK** | 5 s |
| 6 | `prueba_076.py` | **OK** (repetida aparte) | 99 s |
| 7 | `prueba_077.py` | **OK** | 16 s |
| 8 | `prueba_078.py` | **OK** | 19 s |
| 9 | `prueba_079.py` | **OK** | 6 s |
| 10 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 11 | `prueba_ambiente.py` | **OK** | 1 s |
| 12 | `prueba_arranque.py` | **OK** | 1 s |
| 13 | `prueba_baloncesto.py` | **OK** | 15 s |
| 14 | `prueba_bloqueo.py` | **OK** | 13 s |
| 15 | `prueba_bordes.py` | **OK** | 0 s |
| 16 | `prueba_canchas.py` | **OK** | 2 s |
| 17 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 18 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 108 s |
| 19 | `prueba_diario.py` | **OK** | 0 s |
| 20 | `prueba_freno_mano.py` | **OK** | 0 s |
| 21 | `prueba_futbol.py` | **OK** | 6 s |
| 22 | `prueba_grandes.py` | **OK** | 12 s |
| 23 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 24 | `prueba_hospital.py` | **OK** | 26 s |
| 25 | `prueba_maleantes.py` | **OK** | 2 s |
| 26 | `prueba_misiones.py` | **OK** | 70 s |
| 27 | `prueba_misiones_guardado.py` | **OK** | 21 s |
| 28 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 29 | `prueba_obispo.py` | **OK** | 6 s |
| 30 | `prueba_panel_controles.py` | **OK** | 13 s |
| 31 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 32 | `prueba_pasos.py` | **OK** | 2 s |
| 33 | `prueba_pelea_atras.py` | **OK** | 14 s |
| 34 | `prueba_pelea_especiales.py` | **OK** | 15 s |
| 35 | `prueba_pendientes_faciles.py` | **OK** | 5 s |
| 36 | `prueba_peralte.py` | **OK** | 0 s |
| 37 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 101 s |
| 38 | `prueba_recorte.py` | **OK** | 2 s |
| 39 | `prueba_trinidad.py` | **OK** | 10 s |

## Detalle

### 1. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 2. audit_hundimiento.py — OK

```
{"muestras":6480,"hundidos":0,"zonas":0,"ejemplos":[]}
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
arboles_en_calle 544
farolas_en_calle 0
juan_de_vera 0
abatido {'huesos': 65, 'cambia': 0.562, 'quejido': 'Herido: ¡Ay, ay, ay... mi madre!', 'abajo': True}
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
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 14.43}
diario {'primera': ['Segundo', 'Charlas sueltas'], 'n': 2}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 6. prueba_076.py — OK (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 2.5
{"frame":560,"calls":1911,"triangles":4718383,"points":0,"lines":0} calls:1911
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -2.7, 12.3], 'charcos': [[0.5, 6.8]], 'apuntando': False, 'mano': [-0.08, 8.15, 0.21]}, 'gotas': 12, 'charcos': 3, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 96%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True}
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
juntado {'stats': {'sueltas': 7485, 'juntadas': 6838, 'mallas': 1554, 'ms': 309, 'no': {'con hijos': 528, 'transparente': 330, 'grupo con nombre': 3427, 'varios materiales': 2, 'userData': 103, 'onBeforeRender': 1}, 'ultimoId': 25178}, 'fusion': 1554, 'celdas': 5068, 'lod': 9959, 'peatones_enteros': 11}
distancia {'cerca': [89, 89], 'lejos': [0, 8988], 'niebla': 520}
aparcados {'grupos': 1268, 'coches': 9516, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 7720 ms; plazas [384] aparcados [310]
junta piezas 6838
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 6838
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
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6, "y": -8.5}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6, "y": -131.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6, "y": -128.9}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6, "y": -132.2}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6, "y": -132.8}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6, "y": 4.7}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8, "y": 1.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8, "y": 3.1}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8, "y": 2.5}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220472441, "len": 1.5, "ancho": 3.8, "y": 3.7}, {"name": "Pasaje Teide", "cu
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559351366)]
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
rifle sin apuntar {'mano_dcha': 0.102, 'mano_izq': 0.047, 'angulo_antebrazo': 33}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.112, 'mano_izq': 0.061, 'angulo_antebrazo': 65}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 180, 'paradas': 0, 'marcador': [2, 3]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': True}
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
combos de la CPU buena {'combos_cpu': 7, 'marcador': [26, 35]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 10. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 11. prueba_ambiente.py — OK

```
{"estado":"running","errores":0,"hora":"10.05"}
```

### 12. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 34, 'peor': 116, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 13. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [7, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[7,2]}
PARTIDO CPU OK
partido fácil 1 [30, 2]
partido fácil 2 [24, 0]
partido fácil 3 [21, 0]
equilibrio primer partido [75, 2] OK
jugadores dibujados 60
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

### 14. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 15. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"¡Ay! Te has dado un buen golpe (-13 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 16. prueba_canchas.py — OK

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
   ['mayex', 'door', 'Colegio Máyex', 1, -61, -426]
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

### 17. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.3","punta":"188","maxV":"198","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -1498   Z 0"}
```

### 18. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.0
{"frame":564,"calls":1858,"triangles":4642543,"points":0,"lines":0} calls:1858
roads 112
CONOCIDO {'off': 0.2, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.6, 'x': 1220, 'z': 2534, 'y': -123.6}
snap df_1667
failed 0 of 112 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2534
CONDUCCION OK
```

### 19. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 49
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 20. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 80, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 250, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 54, 'kmh_1s': 37, 'giro_1s_grados': 141, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 105, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 165, 'derrape_max_grados': 28}
OK
```

### 21. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [2, 1], 'golden': False}
resultado {"won":true,"score":[2,1]}
PARTIDO CPU OK
partido fácil 1 [8, 1]
partido fácil 2 [8, 0]
partido fácil 3 [8, 0]
equilibrio primer partido [24, 1] OK
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

### 22. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 306, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 670}
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

### 23. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1792435650886,"label":"test","player":{"x":0.8461035788026725,"z":8.459069126865732,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":0,"x":-1.1538964211973275,"z":8.459069126865732},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":true
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1792435338919],["Segundo","adiós",1792435338920],["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1792435345728],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1792435345749],["El Chopa","¿Y si me gana él?",1792435345757],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1792435345765]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1792435355373],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1792435355390],["El Chopa","¿Y usted no viene?",1792435355398],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1792435355405]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1792435355474],["El Chopa","¿Y los bomberos?",1792435355492],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1792435355499]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1792435355578],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1792435355594]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1792435355655],["El Chopa","Y cuando les ganemos, ¿qué?",1792435355685],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1792435355689]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1792435355763],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1792435355787]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1792435355846],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1792435355877],["El Chopa","¿Y el resto de la Secreta?",1792435355886],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1792435355892]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1792435355958],["El Chopa","Eso no puede ser legal.",1792435355984],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1792435355988]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1792435356055],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1792435356081]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1792435356133],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1792435356167],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1792435356173]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1792435356256],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1792435356277],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1792435356283]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1792435356344],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1792435356361],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1792435356366]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1792435359975],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1792435359997],["El Chopa","Monseñor, ¿esto es legal?",1792435360006],["Monseñor Fermín Truchas","Hijo, es fútbol.",1792435360010]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1792435360067],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1792435360097]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792435633511],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792435633528],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792435633532],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792435633534],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792435635104]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"futbolTut":true,"defenders":false,"patrol":false,"basketTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 24. prueba_hospital.py — OK

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

### 25. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'Pepe Machango', 't': 239.70000000000002, 'd': 103}
en_minimapa True
pelea True
rival {'name': 'PEPE MACHANGO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 26. prueba_misiones.py — OK

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

### 27. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1792435338919],["Segundo","adiós",1792435338920],["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1792435345728],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1792435345749],["El Chopa","¿Y si me gana él?",1792435345757],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1792435345765]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1792435355373],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1792435355390],["El Chopa","¿Y usted no viene?",1792435355398],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1792435355405]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1792435355474],["El Chopa","¿Y los bomberos?",1792435355492],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1792435355499]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1792435355578],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1792435355594]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1792435355655],["El Chopa","Y cuando les ganemos, ¿qué?",1792435355685],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1792435355689]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1792435355763],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1792435355787]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1792435355846],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1792435355877],["El Chopa","¿Y el resto de la Secreta?",1792435355886],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1792435355892]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1792435355958],["El Chopa","Eso no puede ser legal.",1792435355984],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1792435355988]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1792435356055],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1792435356081]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1792435356133],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1792435356167],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1792435356173]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1792435356256],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1792435356277],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1792435356283]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1792435356344],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1792435356361],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1792435356366]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1792435359975],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1792435359997],["El Chopa","Monseñor, ¿esto es legal?",1792435360006],["Monseñor Fermín Truchas","Hijo, es fútbol.",1792435360010]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1792435360067],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1792435360097]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792435633511],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792435633528],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792435633532],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792435633534],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792435635104]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1792435753100],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1792435753114],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1792435753142],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1792435753168],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1792435753194],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1792435753257],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1792435753279],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1792435765032]],"Defensores de La Laguna":[["Don Yovoy Gofiérrez","Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.",1792435697519],["Don Yovoy Gofiérrez","Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.",1792435697669],["Boca Papa","Señor alcalde, ¿eso trae dietas? Porque yo como mucho.",1792435698075],["Don Yovoy Gofiérrez","Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.",1792435698479],["Rayco «El Blanco»","«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>",1792435698885],["El Chopa","Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.",1792435699290],["Don Yovoy Gofiérrez","Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.",1792435699696]],"Los bancos del Adelantado":[["Don Yovoy Gofiérrez","¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.",1792435700403],["Don Yovoy Gofiérrez","Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.",1792435700417],["Chatarrero","¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!",1792435700474],["Pepe","¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!",1792435709919]],"El gofio robado":[["Boca Papa","¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.",1792435709954],["Boca Papa","Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.",1792435709967],["Vecina del casco","Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.",1792435710017],["Vecino con boina","Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!",1792435710058],["El Molinero Falso","¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?",1792435710117],["Boca Papa","¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.",1792435720526]],"El carterista del Cristo":[["Coco","Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.",1792435720602],["Coco","Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.",1792435720611],["Carterista","¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!",1792435720714]],"Carrera solidaria del casco":[["Don Yovoy Gofiérrez","La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.",1792435732653],["Don Yovoy Gofiérrez","Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.",1792435732669]],"El rally de La Esperanza":[["El Canarión","¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.",1792435732878],["El Canarión","Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.",1792435732895],["Pijo de La Esperanza","Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.",1792435736405]],"Baches en la Vía de Ronda":[["Don Yovoy Gofiérrez","Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.",1792435736460],["Don Yovoy Gofiérrez","Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.",1792435736470]],"Escolta a la guagua del Romero":[["Don Yovoy Gofiérrez","Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.",1792435736705],["Don Yovoy Gofiérrez","Síguela de cerca, sin alejarte, hasta el final del recorrido.",1792435736726],["Suegra del alcalde (por la ventanilla)","¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!",1792435747890]],"La guagua de la broma":[["Boca Papa","¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.",1792435747965],["Boca Papa","No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.",1792435747984],["Bromista","Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!",1792435748612]],"Grafiteros en el tranvía":[["Sastrón","¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.",1792435748707],["Sastrón","Corre antes de que acaben. Y llévate la de bolas: son rápidos.",1792435748716],["Grafitero","¡Au! ¡Vale, lo limpiamos, lo limpiamos!",1792435748834]],"Noche en el aeropuerto":[["Rayco «El Blanco»","«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»",1792435748939],["Boca Papa (por el móvil)","Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!",1792435748953],["Contrabandista","¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!",1792435749060],["Don Yovoy Gofiérrez (por el móvil)","Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!",1792435749093]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1792435749194],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1792435749215],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1792435749243],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1792435749267],["Rayco «El Blanco»","«Psss... siesta.»",1792435749294],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1792435749373],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1792435749401],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1792435752678],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1792435752711],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1792435752799],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1792435752832],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1792435752890],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1792435752915],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1792435752949],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1792435752973]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"futbolTut":true,"defenders":true,"patrol":true,"basketTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Nuevo: el SECRETA te espera en la Avenida de los Menceyes (círculo salmón)"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1792435338919], ['Segundo', 'adiós', 1792435338920], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792435345728], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792435345749], ['El Chopa', '¿Y si me gana él?', 1792435345757], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792435345765]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792435355373], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792435355390], ['El Chopa', '¿Y usted no viene?', 1792435355398], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792435355405]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792435355474], ['El Chopa', '¿Y los bomberos?', 1792435355492], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1792435355499]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792435355578], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1792435355594]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792435355655], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1792435355685], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1792435355689]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792435355763], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1792435355787]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792435355846], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1792435355877], ['El Chopa', '¿Y el resto de la Secreta?', 1792435355886], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1792435355892]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1792435355958], ['El Chopa', 'Eso no puede ser legal.', 1792435355984], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1792435355988]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1792435356055], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1792435356081]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1792435356133], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1792435356167], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1792435356173]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1792435356256], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1792435356277], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1792435356283]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1792435356344], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1792435356361], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1792435356366]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1792435359975], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1792435359997], ['El Chopa', 'Monseñor, ¿esto es legal?', 1792435360006], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1792435360010]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1792435360067], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1792435360097]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792435633511], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792435633528], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792435633532], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792435633534], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792435635104]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792435753100], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792435753114], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1792435753142], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1792435753168], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1792435753194], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1792435753257], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1792435753279], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1792435765032]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792435697519], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792435697669], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792435698075], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792435698479], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792435698885], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792435699290], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792435699696]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792435700403], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792435700417], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792435700474], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792435709919]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792435709954], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792435709967], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792435710017], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792435710058], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792435710117], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792435720526]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792435720602], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792435720611], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792435720714]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792435732653], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792435732669]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792435732878], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792435732895], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792435736405]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792435736460], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792435736470]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792435736705], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792435736726], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792435747890]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792435747965], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792435747984], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792435748612]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792435748707], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792435748716], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792435748834]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792435748939], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792435748953], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792435749060], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792435749093]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792435749194], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792435749215], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792435749243], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792435749267], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792435749294], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792435749373], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792435749401], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792435752678], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792435752711], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792435752799], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792435752832], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792435752890], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792435752915], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792435752949], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792435752973]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'futbolTut': True, 'defenders': True, 'patrol': True, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1792435338919], ['Segundo', 'adiós', 1792435338920], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792435345728], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792435345749], ['El Chopa', '¿Y si me gana él?', 1792435345757], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792435345765]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792435355373], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792435355390], ['El Chopa', '¿Y usted no viene?', 1792435355398], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792435355405]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792435355474], ['El Chopa', '¿Y los bomberos?', 1792435355492], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1792435355499]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792435355578], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1792435355594]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792435355655], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1792435355685], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1792435355689]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792435355763], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1792435355787]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792435355846], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1792435355877], ['El Chopa', '¿Y el resto de la Secreta?', 1792435355886], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1792435355892]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1792435355958], ['El Chopa', 'Eso no puede ser legal.', 1792435355984], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1792435355988]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1792435356055], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1792435356081]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1792435356133], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1792435356167], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1792435356173]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1792435356256], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1792435356277], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1792435356283]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1792435356344], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1792435356361], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1792435356366]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1792435359975], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1792435359997], ['El Chopa', 'Monseñor, ¿esto es legal?', 1792435360006], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1792435360010]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1792435360067], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1792435360097]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792435633511], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792435633528], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792435633532], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792435633534], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792435635104]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792435770273], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792435770282]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792435697519], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792435697669], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792435698075], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792435698479], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792435698885], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792435699290], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792435699696]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792435700403], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792435700417], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792435700474], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792435709919]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792435709954], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792435709967], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792435710017], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792435710058], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792435710117], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792435720526]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792435720602], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792435720611], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792435720714]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792435732653], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792435732669]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792435732878], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792435732895], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792435736405]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792435736460], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792435736470]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792435736705], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792435736726], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792435747890]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792435747965], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792435747984], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792435748612]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792435748707], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792435748716], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792435748834]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792435748939], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792435748953], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792435749060], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792435749093]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792435749194], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792435749215], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792435749243], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792435749267], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792435749294], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792435749373], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792435749401], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792435752678], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792435752711], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792435752799], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792435752832], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792435752890], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792435752915], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792435752949], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792435752973]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'futbolTut': True, 'defenders': True, 'patrol': True, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'rifleTut': False, 'futbolTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 28. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 29. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 33, 'pitches': 161}
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

### 30. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":102}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 31. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 32. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 33. prueba_pelea_atras.py — OK

```
{"sep":196,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 73.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 34. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":0,"gofio":true}
teide OK {"walk":6.8,"gofio":true,"teide":true}
gancho OK {"walk":6.8,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":6.8,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 35. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 4143
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 36. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.55, 0.54, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.55], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.55, 0.56, 0.54], 'dif': 0.02}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.59, 0.57, 0.59, 0.55], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.58, 0.63, 0.56], 'dif': 0.07}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.52, 0.53, 0.52], 'dif': 0.01}
```

### 37. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 2.7000000029802322
{"frame":566,"calls":1850,"triangles":4708725,"points":0,"lines":0} calls:1850
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.47 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.18 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.12 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.12 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 38. prueba_recorte.py — OK

```
recortados 4143 de 6521 · siguen metidos ≥ 1 m: 66
   [1626, 3416, 4.3, 'Hiunday']
   [241, 771, 4.2, '']
   [-890, 143, 3.7, '']
   [1424, 3934, 3.3, '']
   [-938, 1479, 3.3, '']
   [-1799, -757, 3.2, '']
   [3334, 1986, 3, '']
   [-4702, 101, 2.9, '']
   [-4699, 92, 2.8, '']
   [1734, 3780, 2.6, 'Mercadona']
   [-187, 709, 2.6, '']
   [3179, 2047, 2.6, '']
   [-1118, 1754, 2.5, '']
   [847, 1669, 2.5, '']
   [3275, 2044, 2.5, '']
   [-3023, -50, 2.4, '']
   [3190, 2057, 2.4, '']
   [-909, 1484, 2.3, '']
   [801, 3014, 2.2, 'IKEA']
   [652, 1618, 2.2, '']
   [-911, 1452, 2.2, '']
   [2412, 1955, 2.1, '']
   [-1050, 826, 2, '']
   [-845, 73, 2, '']
   [-1063, 1772, 1.9, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 39. prueba_trinidad.py — OK

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

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, df_1024.jpg, df_1165.jpg, df_1261.jpg, df_1267.jpg, df_1277.jpg, df_1278.jpg, df_1281.jpg, df_1287.jpg, df_1292.jpg, df_1305.jpg, df_1306.jpg, df_1569.jpg, df_1617.jpg, df_1666.jpg, df_1667.jpg, df_1747.jpg, df_1748.jpg, df_1768.jpg, df_20.jpg, df_2022.jpg, df_2295.jpg, df_2299.jpg, df_2338.jpg, df_2375.jpg, df_2394.jpg, df_2423.jpg, df_2575.jpg, df_2873.jpg, df_3054.jpg, df_308.jpg, df_311.jpg, df_3209.jpg, df_3286.jpg, df_334.jpg, df_3374.jpg, df_3521.jpg, df_362.jpg, df_3629.jpg, df_363.jpg, df_3630.jpg, df_3631.jpg, df_366.jpg, df_368.jpg, df_3705.jpg, df_3706.jpg, df_3707.jpg, df_397.jpg, df_445.jpg, df_446.jpg, df_448.jpg, df_449.jpg, df_4562.jpg, df_4715.jpg, df_4748.jpg, df_520.jpg, df_577.jpg, df_594.jpg, df_638.jpg, df_68.jpg, df_681.jpg, df_697.jpg, df_7.jpg, df_709.jpg, df_715.jpg, df_725.jpg, df_726.jpg, df_728.jpg, df_729.jpg, df_730.jpg, df_8.jpg, df_812.jpg, df_814.jpg, df_815.jpg, df_816.jpg, df_827.jpg, df_888.jpg, df_890.jpg, df_892.jpg, df_895.jpg, df_902.jpg, df_91.jpg, df_911.jpg, df_913.jpg, df_919.jpg, df_924.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, obispado.jpg, pelea_tamano.jpg, ready.png, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg
