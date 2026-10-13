# Pruebas 0.72.0 — 2026-10-13 11:29 — 14/16 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 542 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_grandes.py` | **FALLA** (repetida aparte) | 131 s |
| 4 | `prueba_bordes.py` | **OK** | 0 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 153 s |
| 6 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 7 | `prueba_pendientes_faciles.py` | **OK** | 9 s |
| 8 | `prueba_trinidad.py` | **OK** | 15 s |
| 9 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 10 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 11 | `prueba_freno_mano.py` | **OK** | 0 s |
| 12 | `prueba_peralte.py` | **OK** | 0 s |
| 13 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 14 | `prueba_obispo.py` | **OK** | 7 s |
| 15 | `prueba_futbol.py` | **OK** | 7 s |
| 16 | `prueba_persecuciones.py` | **OK** | 30 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/descripciones.json`, `scripts/publicar.log`, `src/01_core.js`, `src/04_world.js`, `src/05_scenery.js`, `src/05e_street.js`, `src/05f_anchieta.js`, `src/05k_landmarks.js`, `src/05l_tramstops.js`, `src/05m_parking.js`, `src/05n_plazas.js`, `src/05q_inicio.js`, `src/05r_aeropuerto.js`, `src/07_vehicles.js`, `src/12g_obispo.js`, `src/13_main.js`, `tests/prueba_grandes.py`, `tools/trabajador.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 24, 'peor': 83, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1791886847732,"label":"test","player":{"x":-188.85866389791946,"z":783.1693376318474,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791946,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out":true},"tod":15.5
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"log":{},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_grandes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
GRANDES FALLA
--- repetida aparte:
shot ms 2.2999999970197678
{"frame":562,"calls":4135,"triangles":6597932,"points":0,"lines":1080} calls:4135
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1}
tf13 None
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 3, 'valla_tramos': 1000}
callejero [['Calle Bencomo', True], ['Calle Juan de Vera', True], ['Calle Rodriguez Moure', True], ['Calle Ascanio y Nieves', True]]
avion {'despega': True, 'pasos': [[-1118, 0, True], [-1149, 0, True], [-1228, 0, True], [-1355, 0, True], [-1529, 0, True], [-1752, 0, True], [-2023, 26, True], [-2315, 70, True], [-2607, 114, True], [-2899, 157, True]]}
foto grandes_obispado
foto grandes_tranvia_trinchera
foto grandes_tranvia_alto
foto grandes_tf13_suelo
foto grandes_tf13_alto
foto grandes_guajara
foto grandes_aeropuerto_terminal
foto grandes_aeropuerto_naves
foto grandes_aeropuerto_depositos
foto grandes_callejero_bencomo
errores JS []
GRANDES FALLA
```

### 4. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 5. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 2.4000000059604645
{"frame":562,"calls":4233,"triangles":6687424,"points":0,"lines":1728} calls:4233
roads 99
FAIL {'off': 0.9, 'dy': 0.2, 'col': False, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 112, 'time': 76.2, 'x': 443, 'z': -904, 'y': -2.1}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 500, 'time': 116.4, 'x': 43, 'z': 1155, 'y': -32.8}
snap df_1287
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 13, 'time': 55.4, 'x': -390, 'z': 673, 'y': -6.2}
snap df_2295
failed 3 of 99
CONDUCCION FALLA
```

### 6. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [209, -578]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -610]}
```

### 7. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0], [1692, 4082, 0.6]]
recortados 4053
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 8. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad Casco Histórico', 'x': -113, 'z': 105, 'yF': -11.2}, {'name': 'Parking Trinidad Centro', 'x': -225, 'z': 457, 'yF': -11.1}]
nuevas 7
coche {'aparcamiento': 'Parking Trinidad Casco Histórico', 'rampa': [-85, 28], 'profundidad': 7.8, 'en_sala': True, 'fin': [-104, 82]}
coche {'aparcamiento': 'Parking Trinidad Centro', 'rampa': [-244, 524], 'profundidad': 5.8, 'en_sala': True, 'fin': [-230, 478]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_2
foto trinidad_rampa_2_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 9. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 10. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.3","punta":"181","maxV":"193","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -280   Z 0"}
```

### 11. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 77, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 243, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 58, 'kmh_1s': 37, 'giro_1s_grados': 150, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 186, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 107, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 168, 'derrape_max_grados': 28}
OK
```

### 12. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.56, 0.55, 0.54], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.56, 0.54, 0.55, 0.57], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.55, 0.54, 0.56], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.6, 0.58, 0.56, 0.6], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.65, 0.58, 0.57, 0.58], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.53, 0.53, 0.53, 0.53], 'dif': 0}
```

### 13. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 14. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 28, 'pitches': 161}
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

### 15. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [0, 0], 'golden': True}
resultado {"won":true,"score":[1,0]}
PARTIDO CPU OK
partido fácil 1 [3, 1]
partido fácil 2 [7, 0]
partido fácil 3 [4, 0]
equilibrio primer partido [14, 1] OK
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

### 16. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.49 m OK
[8] Los bancos del Adelantado: a pie: a 6 m, recorre 0 m en 3 s, salto máx 0.14 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.17 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_trinchera.jpg, obispado.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_2.jpg, trinidad_rampa_2_alto.jpg
