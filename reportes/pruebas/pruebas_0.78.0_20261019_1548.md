# Pruebas 0.78.0 — 2026-10-19 15:48 — 39/39 OK

Listas: todas, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 826 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `audit_cruces.py` | **OK** | 0 s |
| 2 | `audit_hundimiento.py` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `prueba_074.py` | **OK** | 56 s |
| 5 | `prueba_075.py` | **OK** | 5 s |
| 6 | `prueba_076.py` | **OK** | 29 s |
| 7 | `prueba_077.py` | **OK** | 16 s |
| 8 | `prueba_078.py` | **OK** | 12 s |
| 9 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 10 | `prueba_ambiente.py` | **OK** | 1 s |
| 11 | `prueba_arranque.py` | **OK** | 1 s |
| 12 | `prueba_baloncesto.py` | **OK** | 15 s |
| 13 | `prueba_bloqueo.py` | **OK** | 11 s |
| 14 | `prueba_bordes.py` | **OK** | 0 s |
| 15 | `prueba_canchas.py` | **OK** | 3 s |
| 16 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 17 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 106 s |
| 18 | `prueba_diario.py` | **OK** | 0 s |
| 19 | `prueba_freno_mano.py` | **OK** | 0 s |
| 20 | `prueba_futbol.py` | **OK** | 6 s |
| 21 | `prueba_grandes.py` | **OK** | 12 s |
| 22 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 23 | `prueba_hospital.py` | **OK** | 26 s |
| 24 | `prueba_maleantes.py` | **OK** | 2 s |
| 25 | `prueba_misiones.py` | **OK** | 71 s |
| 26 | `prueba_misiones_guardado.py` | **OK** | 21 s |
| 27 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 28 | `prueba_obispo.py` | **OK** | 6 s |
| 29 | `prueba_panel_controles.py` | **OK** | 14 s |
| 30 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 31 | `prueba_pasos.py` | **OK** | 2 s |
| 32 | `prueba_pelea_atras.py` | **OK** | 14 s |
| 33 | `prueba_pelea_especiales.py` | **OK** | 16 s |
| 34 | `prueba_pendientes_faciles.py` | **OK** | 5 s |
| 35 | `prueba_peralte.py` | **OK** | 0 s |
| 36 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 101 s |
| 37 | `prueba_recorte.py` | **OK** | 2 s |
| 38 | `prueba_trinidad.py` | **OK** | 9 s |
| 39 | `herramientas/sonda_conduccion.py p:-495,683 p:2210,3312 p:377,-268 p:820,3494` | **OK** | 2 s |

## Detalle

### 1. audit_cruces.py — OK

```
conflicts 25
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('footway', 'service', 2, 1), 1), (('service', 'service', 0, 2), 1)]
```

### 2. audit_hundimiento.py — OK

```
{"muestras":6396,"hundidos":0,"zonas":0,"ejemplos":[]}
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
arboles_en_calle 497
farolas_en_calle 0
juan_de_vera 0
abatido {'huesos': 65, 'cambia': 0.574, 'quejido': 'Herido: ¡Ay, ay, ay... mi madre!', 'abajo': True}
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

### 6. prueba_076.py — OK

```
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-362.2, -1028.3], 'fuego': [-362.2, -1020.8], 'gota_v': [0.1, 1.2, 13.2], 'charcos': [[-0.4, 13.8], [-0.2, 12.5], [-0.2, 8.3], [-0.3, 7.8], [-0.2, 6.7]], 'apuntando': False, 'mano': [-0.25, 0.01, -0.08]}, 'gotas': 15, 'charcos': 6, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 100%\nTAB / 1: puños'}
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
juntado {'stats': {'sueltas': 7470, 'juntadas': 6820, 'mallas': 1568, 'ms': 302, 'no': {'con hijos': 512, 'transparente': 330, 'grupo con nombre': 3427, 'varios materiales': 2, 'userData': 103, 'onBeforeRender': 1}, 'ultimoId': 25182}, 'fusion': 1568, 'celdas': 5021, 'lod': 9926, 'peatones_enteros': 11}
distancia {'cerca': [94, 94], 'lejos': [0, 8952], 'niebla': 520}
aparcados {'grupos': 1279, 'coches': 9600, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 8524 ms; plazas [391] aparcados [315]
junta piezas 6820
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 6820
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
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6}, {"name": "Pasaje Aguere", "x": -201.51006941069437, "z": 21.912870685487142, "len": 67.5, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -182.69088278920657, "z": -21.8636938986106, "len": 6.3, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220
andando [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 1.2, 'y': 2.5, 'donde': [-176.4, -61], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 1.1, 'y': 2.5, 'donde': [-168.9, -54.7], 'delante': None}, {'a': [-184, -19], 'llega': True, 'cerca': None, 'falta': 1.1, 'y': 0.7, 'donde': [-183.7, -20.1], 'delante': None}, {'a': [-188, -9], 'llega': True, 'cerca': None, 'falta': 1.2, 'y': 0.1, 'donde': [-187.6, -10.1], 'delante': None}, {'a': [-218, 58], 'llega': True, 'cerca': None, 'falta': 1.1, 'y': -3.8, 'donde': [-217.5, 57], 'delante': None}]
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
errores []
PRUEBA 078 OK
```

### 9. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 10. prueba_ambiente.py — OK

```
{"estado":"running","errores":0,"hora":"10.05"}
```

### 11. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 47, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 12. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [9, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[9,2]}
PARTIDO CPU OK
partido fácil 1 [25, 3]
partido fácil 2 [15, 0]
partido fácil 3 [19, 3]
equilibrio primer partido [59, 6] OK
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

### 13. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":388.7000000000021},"hp":100,"dir":1}
```

### 14. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"¡Ay! Te has dado un buen golpe (-13 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 15. prueba_canchas.py — OK

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

### 16. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.4","punta":"183","maxV":"193","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -1498   Z 0"}
```

### 17. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.100000001490116
{"frame":564,"calls":1829,"triangles":4624668,"points":0,"lines":0} calls:1829
roads 112
CONOCIDO {'off': 0.9, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 108, 'time': 6.8, 'x': 1220, 'z': 2532, 'y': -123.6}
snap df_1667
failed 0 of 112 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2532
CONDUCCION OK
```

### 18. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 49
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a las ruinas de San Agustín | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 19. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 87, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 275, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 54, 'kmh_1s': 37, 'giro_1s_grados': 141, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 105, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 165, 'derrape_max_grados': 28}
OK
```

### 20. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [2, 0], 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [7, 0]
partido fácil 2 [2, 0]
partido fácil 3 [6, 1]
equilibrio primer partido [15, 1] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True, 'control': True}
RATÓN OK
campos {'campos': 79, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f66', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f66
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 21. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 305, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
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

### 22. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1792420874544,"label":"test","player":{"x":1.8208856884558815,"z":5.573714082292232,"h":0,"health":77,"money":1234},"car":{"type":"sport","model":"guancheGT","color":16765440,"h":0,"x":-0.17911431154411858,"z":5.573714082292232},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"has":tru
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1792420568386],["Segundo","adiós",1792420568387],["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1792420579362],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1792420579380],["El Chopa","¿Y si me gana él?",1792420579383],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1792420579388]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1792420589223],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1792420589240],["El Chopa","¿Y usted no viene?",1792420589246],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1792420589255]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1792420589350],["El Chopa","¿Y los bomberos?",1792420589379],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1792420589387]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1792420589457],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1792420589476]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1792420589545],["El Chopa","Y cuando les ganemos, ¿qué?",1792420589570],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1792420589577]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1792420589640],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1792420589663]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1792420589726],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1792420589745],["El Chopa","¿Y el resto de la Secreta?",1792420589753],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1792420589762]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1792420589840],["El Chopa","Eso no puede ser legal.",1792420589858],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1792420589864]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1792420589937],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1792420589959]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1792420590026],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1792420590053],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1792420590061]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1792420590122],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1792420590145],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1792420590151]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1792420590247],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1792420590271],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1792420590278]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1792420593878],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1792420593900],["El Chopa","Monseñor, ¿esto es legal?",1792420593910],["Monseñor Fermín Truchas","Hijo, es fútbol.",1792420593915]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1792420593975],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1792420593996]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792420857085],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792420857106],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792420857110],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792420857113],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792420858646]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"futbolTut":true,"defenders":false,"patrol":false,"basketTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 23. prueba_hospital.py — OK

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

### 24. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'Pepe Machango', 't': 239.70000000000002, 'd': 79}
en_minimapa True
pelea True
rival {'name': 'PEPE MACHANGO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 25. prueba_misiones.py — OK

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

### 26. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Charlas sueltas":[["Primero","hola",1792420568386],["Segundo","adiós",1792420568387],["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1792420579362],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1792420579380],["El Chopa","¿Y si me gana él?",1792420579383],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1792420579388]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1792420589223],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1792420589240],["El Chopa","¿Y usted no viene?",1792420589246],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1792420589255]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1792420589350],["El Chopa","¿Y los bomberos?",1792420589379],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1792420589387]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1792420589457],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1792420589476]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1792420589545],["El Chopa","Y cuando les ganemos, ¿qué?",1792420589570],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1792420589577]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1792420589640],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1792420589663]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1792420589726],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1792420589745],["El Chopa","¿Y el resto de la Secreta?",1792420589753],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1792420589762]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1792420589840],["El Chopa","Eso no puede ser legal.",1792420589858],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1792420589864]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1792420589937],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1792420589959]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1792420590026],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1792420590053],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1792420590061]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1792420590122],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1792420590145],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1792420590151]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1792420590247],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1792420590271],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1792420590278]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1792420593878],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1792420593900],["El Chopa","Monseñor, ¿esto es legal?",1792420593910],["Monseñor Fermín Truchas","Hijo, es fútbol.",1792420593915]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1792420593975],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1792420593996]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792420857085],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792420857106],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792420857110],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792420857113],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792420858646]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1792420977572],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1792420977588],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1792420977619],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1792420977637],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1792420977676],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1792420977750],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1792420977769],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1792420989524]],"Defensores de La Laguna":[["Don Yovoy Gofiérrez","Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.",1792420921629],["Don Yovoy Gofiérrez","Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.",1792420921776],["Boca Papa","Señor alcalde, ¿eso trae dietas? Porque yo como mucho.",1792420922193],["Don Yovoy Gofiérrez","Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.",1792420922610],["Rayco «El Blanco»","«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>",1792420923026],["El Chopa","Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.",1792420923442],["Don Yovoy Gofiérrez","Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.",1792420923860]],"Los bancos del Adelantado":[["Don Yovoy Gofiérrez","¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.",1792420924580],["Don Yovoy Gofiérrez","Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.",1792420924593],["Chatarrero","¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!",1792420924665],["Pepe","¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!",1792420936274]],"El gofio robado":[["Boca Papa","¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.",1792420936429],["Boca Papa","Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.",1792420936440],["Vecina del casco","Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.",1792420936467],["Vecino con boina","Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!",1792420936490],["El Molinero Falso","¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?",1792420936523],["Boca Papa","¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.",1792420947232]],"El carterista del Cristo":[["Coco","Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.",1792420947272],["Coco","Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.",1792420947281],["Carterista","¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!",1792420947425]],"Carrera solidaria del casco":[["Don Yovoy Gofiérrez","La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.",1792420959437],["Don Yovoy Gofiérrez","Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.",1792420959456]],"El rally de La Esperanza":[["El Canarión","¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.",1792420959689],["El Canarión","Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.",1792420959704],["Pijo de La Esperanza","Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.",1792420963332]],"Baches en la Vía de Ronda":[["Don Yovoy Gofiérrez","Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.",1792420963372],["Don Yovoy Gofiérrez","Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.",1792420963390]],"Escolta a la guagua del Romero":[["Don Yovoy Gofiérrez","Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.",1792420963667],["Don Yovoy Gofiérrez","Síguela de cerca, sin alejarte, hasta el final del recorrido.",1792420963685],["Suegra del alcalde (por la ventanilla)","¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!",1792420972188]],"La guagua de la broma":[["Boca Papa","¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.",1792420972280],["Boca Papa","No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.",1792420972299],["Bromista","Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!",1792420973008]],"Grafiteros en el tranvía":[["Sastrón","¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.",1792420973112],["Sastrón","Corre antes de que acaben. Y llévate la de bolas: son rápidos.",1792420973128],["Grafitero","¡Au! ¡Vale, lo limpiamos, lo limpiamos!",1792420973254]],"Noche en el aeropuerto":[["Rayco «El Blanco»","«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»",1792420973362],["Boca Papa (por el móvil)","Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!",1792420973380],["Contrabandista","¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!",1792420973500],["Don Yovoy Gofiérrez (por el móvil)","Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!",1792420973530]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1792420973656],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1792420973673],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1792420973711],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1792420973735],["Rayco «El Blanco»","«Psss... siesta.»",1792420973773],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1792420973842],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1792420973859],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1792420977136],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1792420977162],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1792420977245],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1792420977279],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1792420977337],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1792420977365],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1792420977401],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1792420977422]]},"gang":{"formed":false,"name":"","members":[],"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true,"futbolTut":true,"defenders":true,"patrol":true,"basketTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Nuevo: el SECRETA te espera en la Avenida de los Menceyes (círculo salmón)"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1792420568386], ['Segundo', 'adiós', 1792420568387], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792420579362], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792420579380], ['El Chopa', '¿Y si me gana él?', 1792420579383], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792420579388]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792420589223], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792420589240], ['El Chopa', '¿Y usted no viene?', 1792420589246], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792420589255]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792420589350], ['El Chopa', '¿Y los bomberos?', 1792420589379], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1792420589387]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792420589457], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1792420589476]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792420589545], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1792420589570], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1792420589577]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792420589640], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1792420589663]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792420589726], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1792420589745], ['El Chopa', '¿Y el resto de la Secreta?', 1792420589753], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1792420589762]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1792420589840], ['El Chopa', 'Eso no puede ser legal.', 1792420589858], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1792420589864]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1792420589937], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1792420589959]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1792420590026], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1792420590053], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1792420590061]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1792420590122], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1792420590145], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1792420590151]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1792420590247], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1792420590271], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1792420590278]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1792420593878], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1792420593900], ['El Chopa', 'Monseñor, ¿esto es legal?', 1792420593910], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1792420593915]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1792420593975], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1792420593996]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792420857085], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792420857106], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792420857110], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792420857113], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792420858646]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792420977572], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792420977588], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1792420977619], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1792420977637], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1792420977676], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1792420977750], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1792420977769], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1792420989524]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792420921629], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792420921776], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792420922193], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792420922610], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792420923026], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792420923442], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792420923860]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792420924580], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792420924593], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792420924665], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792420936274]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792420936429], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792420936440], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792420936467], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792420936490], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792420936523], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792420947232]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792420947272], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792420947281], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792420947425]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792420959437], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792420959456]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792420959689], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792420959704], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792420963332]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792420963372], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792420963390]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792420963667], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792420963685], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792420972188]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792420972280], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792420972299], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792420973008]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792420973112], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792420973128], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792420973254]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792420973362], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792420973380], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792420973500], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792420973530]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792420973656], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792420973673], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792420973711], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792420973735], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792420973773], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792420973842], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792420973859], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792420977136], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792420977162], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792420977245], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792420977279], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792420977337], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792420977365], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792420977401], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792420977422]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'futbolTut': True, 'defenders': True, 'patrol': True, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 3, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Charlas sueltas': [['Primero', 'hola', 1792420568386], ['Segundo', 'adiós', 1792420568387], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792420579362], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792420579380], ['El Chopa', '¿Y si me gana él?', 1792420579383], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792420579388]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792420589223], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792420589240], ['El Chopa', '¿Y usted no viene?', 1792420589246], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792420589255]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792420589350], ['El Chopa', '¿Y los bomberos?', 1792420589379], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1792420589387]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792420589457], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1792420589476]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792420589545], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1792420589570], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1792420589577]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792420589640], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1792420589663]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792420589726], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1792420589745], ['El Chopa', '¿Y el resto de la Secreta?', 1792420589753], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1792420589762]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1792420589840], ['El Chopa', 'Eso no puede ser legal.', 1792420589858], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1792420589864]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1792420589937], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1792420589959]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1792420590026], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1792420590053], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1792420590061]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1792420590122], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1792420590145], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1792420590151]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1792420590247], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1792420590271], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1792420590278]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1792420593878], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1792420593900], ['El Chopa', 'Monseñor, ¿esto es legal?', 1792420593910], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1792420593915]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1792420593975], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1792420593996]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792420857085], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792420857106], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792420857110], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792420857113], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792420858646]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792420994940], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792420994950]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792420921629], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792420921776], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792420922193], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792420922610], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792420923026], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792420923442], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792420923860]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792420924580], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792420924593], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792420924665], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792420936274]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792420936429], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792420936440], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792420936467], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792420936490], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792420936523], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792420947232]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792420947272], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792420947281], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792420947425]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792420959437], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792420959456]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792420959689], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792420959704], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792420963332]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792420963372], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792420963390]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792420963667], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792420963685], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792420972188]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792420972280], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792420972299], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792420973008]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792420973112], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792420973128], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792420973254]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792420973362], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792420973380], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792420973500], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792420973530]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792420973656], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792420973673], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792420973711], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792420973735], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792420973773], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792420973842], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792420973859], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792420977136], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792420977162], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792420977245], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792420977279], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792420977337], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792420977365], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792420977401], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792420977422]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'futbolTut': True, 'defenders': True, 'patrol': True, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'rifleTut': False, 'futbolTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 27. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 28. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 37, 'pitches': 161}
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

### 29. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 30. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -610]}
```

### 31. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 32. prueba_pelea_atras.py — OK

```
{"sep":133,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 33. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":15.499999999999998,"jab":true,"gofio":true}
teide OK {"walk":20.599999999999998,"jab":true,"gofio":true,"teide":true}
gancho OK {"walk":20.599999999999998,"jab":true,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":20.599999999999998,"jab":true,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 34. prueba_pendientes_faciles.py — OK

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

### 35. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.55, 0.54, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.55], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.55, 0.56, 0.54], 'dif': 0.02}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.59, 0.57, 0.59, 0.55], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.58, 0.64, 0.56], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.52, 0.53, 0.52], 'dif': 0.01}
```

### 36. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 2.5
{"frame":564,"calls":1857,"triangles":4694711,"points":0,"lines":0} calls:1857
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.34 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 15 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 10 m en 3 s, salto máx 0.14 m OK | a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.14 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 37. prueba_recorte.py — OK

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

### 38. prueba_trinidad.py — OK

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

### 39. herramientas/sonda_conduccion.py p:-495,683 p:2210,3312 p:377,-268 p:820,3494 — OK

```
== {"off": 0, "dy": 0.2, "col": false, "low": false, "ri": 2690, "t": 12, "name": "", "L": 89, "done": true, "left": 0, "time": 0, "x": -459, "z": 687, "y": 3.6, "salto": [0.13, -459, 687]}
   ruta [[-459, 688], [-458, 680], [-492, 673], [-493, 673], [-495, 683], [-459, 688]]
== {"off": 0.1, "dy": 0.2, "col": false, "low": true, "ri": 2704, "t": 12, "name": "", "L": 36, "done": true, "left": 6, "time": 3.3, "x": -505, "z": 663, "y": -0.8, "salto": [0.44, -506, 678]}
   ruta [[-495, 683], [-507, 681], [-503, 658]]
== {"off": 0.1, "dy": 0.2, "col": false, "low": true, "ri": 1083, "t": 12, "name": "", "L": 31, "done": true, "left": 6, "time": 2.7, "x": 2205, "z": 3293, "y": -230.7, "salto": [0.21, 2209, 3312]}
   ruta [[2210, 3313], [2207, 3311], [2204, 3309], [2201, 3306], [2201, 3302], [2202, 3298], [2205, 3294], [2208, 3288]]
== {"off": 1, "dy": -1.9, "col": false, "low": true, "ri": 3098, "t": 12, "name": "", "L": 135, "done": false, "left": 40, "time": 11.9, "x": 2210, "z": 3310, "y": -227.3, "salto": [1.92, 2210, 3312]}
   ruta [[2184, 3386], [2186, 3367], [2189, 3357], [2190, 3353], [2192, 3348], [2194, 3344], [2196, 3340], [2199, 3337], [2201, 3333], [2203, 3329], [2205, 3324], [2206, 3321]]
    [0, 2184, 3385, -223.6, 0.2, 1, 0, 0]
    [1, 2184, 3382, -223.6, 6.3, 1, 0, 0]
    [2, 2185, 3373, -223.6, 12, 2, 0, 0]
    [3, 2188, 3360, -223.7, 13.1, 4, 0, 0]
    [4, 2192, 3348, -223.9, 13, 6, 0, 0]
    [5, 2198, 3337, -224.4, 13.1, 9, 0, 0]
    [6, 2204, 3325, -224.8, 13, 12, 0, 0]
    [7, 2209, 3313, -225.2, 13, 15, 0, 0]
    [8, 2210, 3310, -227.2, 0.6, 16, 0, 1]
    [9, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [10, 2210, 3310, -227.2, 0.2, 16, 0, 1]
    [11, 2210, 3310, -227.2, 0.2, 16, 0, 1]
== {"off": 0.1, "dy": 0.2, "col": false, "low": false, "ri": 2576, "t": 3, "name": "Vía de Ronda de La Laguna", "L": 265, "done": true, "left": 6, "time": 20.8, "x": 304, "z": -71, "y": -10.3, "salto": [0.35, 397, -290]}
   ruta [[400, -293], [368, -258], [332, -222], [319, -205], [308, -188], [301, -170], [299, -158], [298, -142], [305, -65]]
== {"off": 0.1, "dy": 0.2, "col": false, "low": false, "ri": 1232, "t": 7, "name": "Travesía Enlace Andenes Sobradillo", "L": 69, "done": true, "left": 6, "time": 11.4, "x": 831, "z": 3498, "y": -119.8, "salto": [0.58, 820, 3496]}
   ruta [[769, 3493], [778, 3490], [786, 3488], [794, 3488], [803, 3490], [811, 3491], [831, 3498], [836, 3499]]
== {"off": 0.3, "dy": 0.2, "col": false, "low": false, "ri": 1233, "t": 7, "name": "Avenida Ghandi", "L": 77, "done": true, "left": 6, "time": 6.7, "x": 831, "z": 3497, "y": -119.6, "salto": [0.33, 810, 3487]}
   ruta [[764, 3477], [776, 3477], [786, 3478], [795, 3481], [831, 3496], [836, 3499]]
```

Fotos/archivos nuevos en `tests/shots/`: audit_cruces.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, df_1024.jpg, df_1165.jpg, df_1261.jpg, df_1267.jpg, df_1277.jpg, df_1278.jpg, df_1281.jpg, df_1287.jpg, df_1292.jpg, df_1305.jpg, df_1306.jpg, df_1569.jpg, df_1617.jpg, df_1666.jpg, df_1667.jpg, df_1747.jpg, df_1748.jpg, df_1768.jpg, df_20.jpg, df_2022.jpg, df_2295.jpg, df_2299.jpg, df_2338.jpg, df_2375.jpg, df_2394.jpg, df_2423.jpg, df_2575.jpg, df_2873.jpg, df_3054.jpg, df_308.jpg, df_311.jpg, df_3209.jpg, df_3286.jpg, df_334.jpg, df_3374.jpg, df_3521.jpg, df_362.jpg, df_3629.jpg, df_363.jpg, df_3630.jpg, df_3631.jpg, df_366.jpg, df_368.jpg, df_3705.jpg, df_3706.jpg, df_3707.jpg, df_397.jpg, df_445.jpg, df_446.jpg, df_448.jpg, df_449.jpg, df_4562.jpg, df_4715.jpg, df_4748.jpg, df_520.jpg, df_577.jpg, df_594.jpg, df_638.jpg, df_68.jpg, df_681.jpg, df_697.jpg, df_7.jpg, df_709.jpg, df_715.jpg, df_725.jpg, df_726.jpg, df_728.jpg, df_729.jpg, df_730.jpg, df_8.jpg, df_812.jpg, df_814.jpg, df_815.jpg, df_816.jpg, df_827.jpg, df_888.jpg, df_890.jpg, df_892.jpg, df_895.jpg, df_902.jpg, df_91.jpg, df_911.jpg, df_913.jpg, df_919.jpg, df_924.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, obispado.jpg, pelea_tamano.jpg, ready.png, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
