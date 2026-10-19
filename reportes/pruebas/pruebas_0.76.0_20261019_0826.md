# Pruebas 0.76.0 — 2026-10-19 08:26 — 30/32 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 1034 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 6 s |
| 2 | `prueba_bordes.py` | **OK** | 93 s |
| 3 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 40 s |
| 4 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 5 | `prueba_pendientes_faciles.py` | **OK** | 9 s |
| 6 | `prueba_grandes.py` | **OK** | 21 s |
| 7 | `prueba_canchas.py` | **OK** | 2 s |
| 8 | `prueba_baloncesto.py` | **OK** | 14 s |
| 9 | `prueba_futbol.py` | **OK** | 6 s |
| 10 | `prueba_trinidad.py` | **FALLA** (repetida aparte) | 136 s |
| 11 | `prueba_076.py` | **FALLA** (repetida aparte) | 144 s |
| 12 | `prueba_075.py` | **OK** | 7 s |
| 13 | `prueba_coche_y_boca.py` | **OK** | 0 s |
| 14 | `prueba_freno_mano.py` | **OK** | 0 s |
| 15 | `prueba_peralte.py` | **OK** | 0 s |
| 16 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 17 | `prueba_pasos.py` | **OK** | 2 s |
| 18 | `herramientas/foto_jugador.py` | **OK** | 8 s |
| 19 | `prueba_panel_controles.py` | **OK** | 16 s |
| 20 | `prueba_pelea_especiales.py` | **OK** | 18 s |
| 21 | `prueba_pelea_atras.py` | **OK** | 17 s |
| 22 | `prueba_bloqueo.py` | **OK** | 14 s |
| 23 | `prueba_maleantes.py` | **OK** | 4 s |
| 24 | `prueba_ambiente.py` | **OK** | 1 s |
| 25 | `herramientas/prueba_claxon.py` | **OK** | 15 s |
| 26 | `herramientas/sonda_guia.py 284 112` | **OK** | 2 s |
| 27 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 3 s |
| 28 | `prueba_misiones_guardado.py` | **OK** | 23 s |
| 29 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 141 s |
| 30 | `prueba_diario.py` | **OK** | 0 s |
| 31 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 32 | `herramientas/sonda_paso.py` | **OK** (repetida aparte) | 137 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/sonda076.txt`, `scripts/pruebas/v075.txt`, `scripts/publicar.log`, `src/04_world.js`, `src/05e_street.js`, `src/05i_sports.js`, `src/05m_parking.js`, `src/05u_trinidad.js`, `src/05v_peraza.js`, `src/07_vehicles.js`, `src/08_player.js`, `src/09_peds.js`, `src/09c_weapons.js`, `src/09ea_minijuegos.js`, `src/09g_futbol2d.js`, `src/09h_maleantes.js`, `src/09i_agua.js`, `src/10_audio.js`, `src/11_hud.js`, `src/11c_guide.js`, `src/12_missions.js`, `src/12e_save.js`, `src/12f_story2.js`, `src/12h_diario.js`, `src/12i_canchas.js`, `src/12j_campos.js`, `src/12k_agua.js`, `src/13_main.js`, `tests/herramientas/sonda_paso.py`, `tests/prueba_075.py`, `tests/prueba_076.py`, `tests/prueba_maleantes.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 23, 'peor': 93, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 3. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 6.1, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 542, 'z': -908, 'y': -0.3}
snap df_308
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 498, 'time': 116.4, 'x': 42, 'z': 1154, 'y': -32.7}
snap df_1287
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 8, 'time': 55.4, 'x': -386, 'z': 677, 'y': -7.1}
snap df_2295
failed 0 of 112 · conocidos 3
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 542 Z -908, Autopista del Norte X 42 Z 1154, Autopista del Norte X -386 Z 677
CONDUCCION OK
```

### 4. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 5. prueba_pendientes_faciles.py — OK

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

### 6. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 304, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
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

### 7. prueba_canchas.py — OK

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

### 8. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,0]}
PARTIDO CPU OK
partido fácil 1 [14, 6]
partido fácil 2 [19, 3]
partido fácil 3 [18, 0]
equilibrio primer partido [51, 9] OK
jugadores dibujados 62
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

### 9. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [1, 0], 'golden': False}
resultado {"won":true,"score":[1,0]}
PARTIDO CPU OK
partido fácil 1 [1, 0]
partido fácil 2 [6, 0]
partido fácil 3 [5, 0]
equilibrio primer partido [12, 0] OK
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

### 10. prueba_trinidad.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
TRINIDAD FALLA
--- repetida aparte:
shot ms 2.799999999930151
{"frame":564,"calls":3859,"triangles":6485766,"points":0,"lines":1728} calls:3859
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
TRINIDAD FALLA
```

### 11. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 2.099999999976717
{"frame":564,"calls":3973,"triangles":6351081,"points":0,"lines":1944} calls:3973
rifle {'gotas': 15, 'charcos': 1, 'fuego_apagado': False, 'agua': [100, 78], 'hud': 'RIFLE DE AGUA 78%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': False, 'pelea': False}
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-621.1913417161826, -300.4619397662556, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'El torneo de la parroquia', 'Un partido por La Concepción', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1250, 1524]}
foto v076_secreta
  empieza ['secreta', 0, 'Tostón, de la Secreta', 'Tostón, de la Secreta', True]
  empieza ['secreta', 1, 'Contenedores en llamas', 'sin círculo']
  empieza ['secreta', 2, 'El partido amañado', 'sin círculo']
  empieza ['secreta', 3, 'Triple en la cancha', 'sin círculo']
  empieza ['secreta', 4, 'Al pirómano, agua', 'sin círculo']
  empieza ['secreta', 5, 'Operación Gofio Blanco', 'sin círculo']
  empieza ['carreras', 0, 'Duelo nocturno en Los Rodeos', 'sin círculo']
  empieza ['carreras', 1, 'Contrarreloj por el casco', 'sin círculo']
  empieza ['carreras', 2, 'Gran Premio de La Laguna', 'sin círculo']
  empieza ['obispo', 4, 'Fuego en la ermita', 'sin círculo']
  empieza ['obispo', 5, 'La carrera de los sacristanes', 'sin círculo']
  empieza ['obispo', 6, 'Curas contra concejales', 'sin círculo']
  empieza ['obispo', 7, 'El ladrón del cepillo', 'sin círculo']
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 1, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 FALLA
```

### 12. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 12}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 14.43}
diario {'primera': ['Segundo', 'Operación Gofio Blanco'], 'n': 35}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 13. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.3","punta":"190","maxV":"202","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -362   Z 0"}
```

### 14. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 78, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 244, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 54, 'kmh_1s': 37, 'giro_1s_grados': 143, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 183, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 105, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 165, 'derrape_max_grados': 28}
OK
```

### 15. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.56, 0.55, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.57], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.55, 0.54, 0.56], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.6, 0.58, 0.56, 0.6], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.65, 0.58, 0.57, 0.58], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.53, 0.53, 0.53], 'dif': 0}
```

### 16. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 17. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 18. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",0.33,1.01,0.07,"lowerarm_l"],["CylinderGeometry",0.35,1.02,0.07,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",0.28,0.92,-0.05,"lowerarm_l"],["CylinderGeometry",0.3,0.93,-0.05,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",0.28,0.95,-0.08,"lowerarm_l"],["CylinderGeometry",0.31,0.95,-0.07,"lowerarm_l"]]
```

### 19. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":103}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 20. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":11.599999999999998,"gofio":true}
teide OK {"walk":22.299999999999997,"gofio":true,"teide":true}
gancho OK {"walk":22.299999999999997,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":22.299999999999997,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 21. prueba_pelea_atras.py — OK

```
{"sep":169,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 78.0 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 22. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 23. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Guirre', 't': 239.70000000000002, 'd': 73}
en_minimapa True
pelea True
rival {'name': 'EL GUIRRE', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 24. prueba_ambiente.py — OK

```
{"estado":"running","errores":0,"hora":"10.05"}
```

### 25. herramientas/prueba_claxon.py — OK

```
bytes 327548 errores []
```

### 26. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.86,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":4}
```

### 27. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.86,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":4}
```

### 28. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":true,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792393955576],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792393955600],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792393955603],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792393955606],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792393957172],["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1792393977398],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1792393977405],["El Chopa","¿Y si me gana él?",1792393977411],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1792393977415]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1792393977653],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1792393977667],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1792393977671],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1792393977676],["Rayco «El Blanco»","«Psss... siesta.»",1792393977679],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1792393977747],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1792393977755],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1792393981794],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1792393983816],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1792393983834],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1792393983841],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1792393983858],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1792393985678],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1792393985683],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1792393985686]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1792393989641],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1792393989663],["El Chopa","¿Y usted no viene?",1792393989668],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1792393989671]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1792393989725]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1792393989748]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1792393989768]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1792393989785]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1792393989936],["Primero","hola",1792394003515],["Segundo","adiós",1792394003516]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1792394125073],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1792394125080],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1792394125093],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1792394125108],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1792394125130],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1792394125181],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1792394125201],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1792394138498]]},"gang":{"formed":false,"name":"","members":[],"futbolTut":true,"jugueterias":true,"sastronTut":true,"maleIntro":true,"rifleTut":true},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792393955576], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792393955600], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792393955603], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792393955606], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792393957172], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792393977398], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792393977405], ['El Chopa', '¿Y si me gana él?', 1792393977411], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792393977415]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792393977653], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792393977667], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792393977671], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792393977676], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792393977679], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792393977747], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792393977755], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792393981794], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792393983816], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792393983834], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792393983841], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792393983858], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792393985678], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792393985683], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792393985686]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792393989641], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792393989663], ['El Chopa', '¿Y usted no viene?', 1792393989668], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792393989671]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792393989725]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792393989748]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792393989768]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792393989785]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792393989936], ['Primero', 'hola', 1792394003515], ['Segundo', 'adiós', 1792394003516]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792394125073], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792394125080], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1792394125093], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1792394125108], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1792394125130], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1792394125181], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1792394125201], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1792394138498]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'futbolTut': True, 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792393955576], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792393955600], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792393955603], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792393955606], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792393957172], ['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1792393977398], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1792393977405], ['El Chopa', '¿Y si me gana él?', 1792393977411], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1792393977415]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792393977653], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792393977667], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792393977671], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792393977676], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792393977679], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1792393977747], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1792393977755], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1792393981794], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1792393983816], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1792393983834], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1792393983841], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1792393983858], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1792393985678], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1792393985683], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1792393985686]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1792393989641], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1792393989663], ['El Chopa', '¿Y usted no viene?', 1792393989668], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1792393989671]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1792393989725]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1792393989748]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1792393989768]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1792393989785]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1792393989936], ['Primero', 'hola', 1792394003515], ['Segundo', 'adiós', 1792394003516]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792394143794], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792394143802]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'futbolTut': True, 'jugueterias': True, 'sastronTut': True, 'maleIntro': True, 'rifleTut': True, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'futbolTut': False, 'jugueterias': False, 'sastronTut': False, 'maleIntro': False, 'rifleTut': False, 'defenders': False, 'patrol': False, 'basketTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 29. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 5.100000000093132
{"frame":562,"calls":3696,"triangles":6364373,"points":0,"lines":1296} calls:3696
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.46 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 15 m en 3 s, salto máx 0.18 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.12 m OK | a pie: a 5 m, recorre 8 m en 3 s, salto máx 0.12 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 30. prueba_diario.py — OK

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

### 31. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1792394189556,"label":"test","player":{"x":-932.3796433348923,"z":-313.2062731252724,"h":0,"health":77,"money":1234},"car":{"type":"sedan","model":"corolla","color":9083304,"h":1.8429422173260839,"x":-934.3796433348923,"z":-313.2062731252724},"weapon":{"has":true,"ammo":4,"out":true},"rif
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":true,"name":"Los Chopas","members":["boca"],"futbolTut":false,"jugueterias":false,"sastronTut":true,"maleIntro":false,"rifleTut":false,"defenders":true,"patrol":false,"basketTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 32. herramientas/sonda_paso.py — OK (repetida aparte)

```
    FRENA 180 °: {'i': 5, 'at': [-213.4, 403.7], 'pasos': 'start:-213.35,403.62 col:-213.35,403.62 cars:-213.35,403.62 deck:-213.35,403.62 low+trench:-213.36,403.74 clamp:-213.36,403.74', 'low': {'y': -13.26, 'hw': 15.35, 'd': 2.57}}
Parking Trinidad v=3 (-218.5, 401.5) bajo tierra={'y': -13.26, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=2.9 135°=4.8 180°=4.8 225°=4.8 270°=4.8 315°=4.8
    FRENA 90 °: {'i': 28, 'at': [-215.6, 401.1], 'pasos': 'start:-215.50,401.06 col:-215.50,401.06 cars:-215.50,401.06 deck:-215.50,401.06 low+trench:-215.65,401.05 clamp:-215.65,401.05', 'low': {'y': -13.27, 'hw': 15.35, 'd': 0.3}}
Parking Trinidad v=7.25 (-222.5, 400.2) bajo tierra={'y': -13.26, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.8 180°=4.8 225°=4.6 270°=4.8 315°=4.8
Parking Trinidad v=9.5 (-224.7, 399.4) bajo tierra={'y': -13.26, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=1 135°=4.5 180°=4.2 225°=4.8 270°=4.8 315°=4.8
    FRENA 90 °: {'i': 16, 'at': [-223.8, 399], 'pasos': 'start:-223.68,398.97 col:-223.68,398.97 cars:-223.81,398.96 deck:-223.81,398.96 low+trench:-223.81,398.96 clamp:-223.81,398.96', 'low': {'y': -13.26, 'hw': 15.35, 'd': 8.83}}
Parking Trinidad v=12.5 (-227.5, 398.4) bajo tierra={'y': -13.26, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.8 180°=4.8 225°=3.3 270°=2.9 315°=4.8
    FRENA 270 °: None
Parking Trinidad v=-12.5 (-223.8, 463.7) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=3.2 90°=3 135°=4.8 180°=4.8 225°=4.4 270°=4.8 315°=4.8
Parking Trinidad v=-9.5 (-226.6, 462.7) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.3 180°=4.8 225°=4.8 270°=4.8 315°=4.8
Parking Trinidad v=-7.25 (-228.7, 462.0) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.2 135°=4.8 180°=4.8 225°=4.8 270°=4.8 315°=4.8
Parking Trinidad v=-3 (-232.7, 460.6) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.8 180°=4.8 225°=3.8 270°=4.8 315°=4.8
Parking Trinidad v=3 (-238.4, 458.6) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.3 135°=4.8 180°=4.8 225°=4.8 270°=4.8 315°=4.8
Parking Trinidad v=7.25 (-242.4, 457.2) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.8 180°=4.8 225°=4.1 270°=4.8 315°=4.8
Parking Trinidad v=9.5 (-244.5, 456.4) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=4.8 45°=4.8 90°=4.8 135°=4.7 180°=4.6 225°=4.4 270°=4.5 315°=4.1
Parking Trinidad v=12.5 (-247.4, 455.4) bajo tierra={'y': -12.61, 'hw': 15.35}: avanza 0°=3.7 45°=5 90°=3.9 135°=1.1 180°=1.6 225°=2.7 270°=3.7 315°=4.7
    FRENA 135 °: {'i': 10, 'at': [-247.6, 456.5], 'pasos': 'start:-247.51,456.39 col:-247.51,456.39 cars:-247.51,456.39 deck:-247.51,456.39 low+trench:-247.59,456.49 clamp:-247.59,456.49', 'low': {'y': -12.6, 'hw': 15.35, 'd': 12.32}}
    FRENA 180 °: {'i': 14, 'at': [-248.9, 456.1], 'pasos': 'start:-248.87,455.92 col:-248.87,455.92 cars:-248.87,455.92 deck:-248.87,455.92 low+trench:-248.88,456.07 clamp:-248.88,456.07', 'low': {'y': -12.6, 'hw': 15.35, 'd': 13.76}}
    FRENA 225 °: {'i': 24, 'at': [-250.1, 455.4], 'pasos': 'start:-250.16,455.31 col:-250.16,455.31 cars:-250.16,455.31 deck:-250.16,455.31 low+trench:-250.22,455.34 clamp:-250.06,455.40', 'low': {'y': -12.6, 'hw': 15.35, 'd': 15.17}}
direcciones frenadas 62
trinidad {'lenA': 731, 'lenB': 736, 'wA': 6.6, 'wB': 6.6, 'pz': [557, 553], 'salas': [['Parking del Cristo', 190, -596, 80, -9.5], ['Parking Trinidad', -113, 106, 62.09254141676077, -13.5], ['Parking Trinidad', -133, 163, 62.9197868544353, -14.2], ['Parking Trinidad', -153, 221, 62.534389326597314, -14.2], ['Parking Trinidad', -173, 278, 63.164908052723874, -14.2], ['Parking Trinidad', -193, 336, 62.936214911740464, -14], ['Parking Trinidad', -213, 394, 63.10223691295543, -13.7], ['Parking Trinidad', -232, 451, 62.031041958697195, -13.2]], 'tcuts': 304}
  s, x, z, suelo, ancho A-B, tranvía a m, s tranvía, hondura tranvía
   [0, -81, 15, -0.6, 20.6, 104, 0, 0]
   [20, -85, 28, -1, 12.9, 91, 0, 0]
   [40, -92, 47, -1.8, 13.2, 71, 0, 0]
   [60, -99, 66, -2.8, 13.2, 51, 0, 0]
   [80, -106, 84, -3.6, 13.1, 31, 0, 0]
   [100, -112, 103, -4.5, 13.2, 11, 0, 0]
   [120, -119, 122, -5.2, 13.1, 2, 9, 0]
   [140, -125, 141, -5.9, 13.5, 2, 29, 0]
   [160, -132, 159, -6.4, 15.8, 2, 49, 0]
   [180, -138, 179, -6.7, 16.9, 2, 69, 0]
   [200, -145, 198, -6.9, 17.3, 2, 89, 0]
   [220, -152, 218, -7, 14.2, 2, 110, 0]
   [240, -158, 235, -6.9, 13.1, 2, 129, 0]
   [260, -164, 254, -6.8, 13.2, 2, 149, 0]
   [280, -170, 273, -6.6, 13.5, 2, 169, 0]
   [300, -177, 293, -6.5, 13.7, 2, 189, 0]
   [320, -184, 311, -6.4, 12.2, 1, 209, 0]
   [340, -191, 330, -6.3, 11.9, 1, 229, 0]
   [360, -197, 348, -6.1, 11.5, 2, 249, 0]
   [380, -204, 367, -6, 11.7, 2, 269, 0]
   [400, -210, 386, -5.9, 12, 2, 289, 0]
   [420, -217, 405, -5.8, 12.1, 2, 309, 0]
   [440, -223, 424, -5.6, 12.1, 2, 329, 0]
   [460, -230, 443, -5.4, 12.1, 2, 349, 0]
   [480, -236, 462, -5.3, 12.1, 2, 369, 0]
   [500, -243, 481, -5.1, 12.1, 2, 389, 0]
   [520, -250, 500, -5, 12.2, 3, 409, 0]
   [540, -255, 518, -5, 14, 3, 428, 0]
   [560, -260, 536, -5, 17.3, 2, 447, 0]
   [580, -266, 557, -5.2, 18.1, 1, 469, 0.5]
   [600, -273, 576, -5.4, 17.7, 1, 489, 2.3]
   [620, -280, 595, -5.6, 16.9, 1, 509, 4.5]
   [640, -286, 614, -5.9, 16, 1, 529, 6.1]
   [660, -293, 633, -6.2, 15.8, 1, 549, 6.4]
   [680, -300, 652, -6.6, 15.5, 1, 569, 6.4]
   [700, -307, 670, -6.9, 15.9, 2, 589, 6.4]
   [720, -316, 685, -6.9, 23.5, 8, 604, 6.4]
SONDA PASO OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, claxon.webm, conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, pelea_tamano.jpg, ready.png, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg
