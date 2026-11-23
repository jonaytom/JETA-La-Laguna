# Pruebas 1.4.41 — 2026-11-23 00:26 — 62/64 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 1283 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 87 s |
| 5 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 6 | `prueba_pendientes_faciles.py` | **OK** | 2 s |
| 7 | `prueba_grandes.py` | **OK** | 2 s |
| 8 | `prueba_078.py` | **OK** | 3 s |
| 9 | `prueba_trinidad.py` | **OK** | 1 s |
| 10 | `prueba_canchas.py` | **OK** | 0 s |
| 11 | `prueba_baloncesto.py` | **OK** | 9 s |
| 12 | `prueba_futbol.py` | **OK** | 6 s |
| 13 | `prueba_0851.py` | **OK** | 0 s |
| 14 | `prueba_076.py` | **FALLA** (repetida aparte) | 497 s |
| 15 | `prueba_075.py` | **OK** | 0 s |
| 16 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 17 | `prueba_freno_mano.py` | **OK** | 0 s |
| 18 | `prueba_peralte.py` | **OK** | 0 s |
| 19 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 20 | `prueba_pasos.py` | **OK** | 2 s |
| 21 | `herramientas/foto_jugador.py` | **OK** | 0 s |
| 22 | `prueba_panel_controles.py` | **OK** | 11 s |
| 23 | `prueba_pelea_especiales.py` | **OK** | 15 s |
| 24 | `prueba_pelea_atras.py` | **OK** | 9 s |
| 25 | `prueba_bloqueo.py` | **OK** | 9 s |
| 26 | `prueba_079.py` | **OK** | 1 s |
| 27 | `prueba_084.py` | **OK** | 0 s |
| 28 | `prueba_maleantes.py` | **OK** | 0 s |
| 29 | `prueba_089.py` | **OK** | 1 s |
| 30 | `prueba_085.py` | **OK** | 1 s |
| 31 | `prueba_090.py` | **OK** | 1 s |
| 32 | `prueba_088.py` | **OK** | 0 s |
| 33 | `prueba_095.py` | **OK** | 0 s |
| 34 | `prueba_0962.py` | **OK** | 0 s |
| 35 | `prueba_0821.py` | **OK** | 0 s |
| 36 | `prueba_082.py` | **OK** | 0 s |
| 37 | `prueba_083.py` | **OK** | 1 s |
| 38 | `prueba_080.py` | **OK** | 0 s |
| 39 | `prueba_081.py` | **OK** | 0 s |
| 40 | `prueba_093.py` | **OK** | 1 s |
| 41 | `prueba_094.py` | **OK** | 0 s |
| 42 | `prueba_0952.py` | **OK** | 1 s |
| 43 | `prueba_096.py` | **OK** | 0 s |
| 44 | `prueba_098.py` | **OK** | 0 s |
| 45 | `prueba_0996b.py` | **OK** | 1 s |
| 46 | `herramientas/sonda_guia.py 284 112` | **OK** | 0 s |
| 47 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 0 s |
| 48 | `prueba_misiones_guardado.py` | **OK** | 18 s |
| 49 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 462 s |
| 50 | `prueba_diario.py` | **OK** | 0 s |
| 51 | `prueba_1419.py` | **OK** | 0 s |
| 52 | `prueba_1420.py` | **OK** | 0 s |
| 53 | `prueba_1421.py` | **OK** | 0 s |
| 54 | `prueba_1426_gpu.py` | **OK** | 0 s |
| 55 | `prueba_1427_gpu.py` | **OK** | 23 s |
| 56 | `prueba_1441.py` | **OK** | 0 s |
| 57 | `prueba_horizonte_1428_gpu.py` | **OK** | 5 s |
| 58 | `prueba_prologo_1427.py` | **FALLA** | 3 s |
| 59 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 60 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 61 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 62 | `audit_obstaculos.py` | **OK** | 0 s |
| 63 | `prueba_reacciones_agua_gpu.py` | **OK** | 0 s |
| 64 | `prueba_diario_gps_gpu.py` | **OK** | 0 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `build.py`, `data/coches.json`, `scripts/pruebas/foto1441.txt`, `scripts/pruebas/pub1441.txt`, `scripts/pruebas/revisar1442.txt`, `scripts/pruebas/sonda1441.txt`, `scripts/pruebas/sonda1441b.txt`, `scripts/pruebas/sonda1441c.txt`, `scripts/pruebas/sonda1441d.txt`, `scripts/pruebas/sonda1441e.txt`, `scripts/pruebas/v1441.txt`, `scripts/publicar.log`, `src/04_world.js`, `src/05f_anchieta.js`, `src/05i_sports.js`, `src/05m_parking.js`, `src/05o_concepcion.js`, `src/05p_casas.js`, `src/05u_trinidad.js`, `src/05v_peraza.js`, `src/05z_hierba.js`, `src/06b_vmodels.js`, `src/07_vehicles.js`, `src/08_player.js`, `src/09_peds.js`, `src/09b_combat.js`, `src/09c_weapons.js`, `src/09d_fight2d.js`, `src/09f_basket2d.js`, `src/09g_futbol2d.js`, `src/09h_maleantes.js`, `src/09i_agua.js`, `src/09j_arcade.js`, `src/09k_bencomo.js`, `src/09l_naves.js`, `src/11_hud.js`, `src/12b_food.js`, `src/12e_save.js`, `src/12f_story2.js`, `src/12k_agua.js`, `src/12l_casa.js`, `src/13_main.js`, `tests/herramientas/foto_1441.py`, `tests/herramientas/sonda_1441.py`, `tests/herramientas/sonda_1441b.py`, `tests/herramientas/sonda_1441c.py`, `tests/herramientas/sonda_1441d.py`, `tests/herramientas/sonda_1441e.py`, `tests/prueba_076.py`, `tests/prueba_079.py`, `tests/prueba_080.py`, `tests/prueba_081.py`, `tests/prueba_082.py`, `tests/prueba_083.py`, `tests/prueba_1419.py`, `tests/prueba_1420.py`, `tests/prueba_1421.py`, `tests/prueba_1426_gpu.py`, `tests/prueba_1427_gpu.py`, `tests/prueba_1441.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 43, 'peor': 180, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795392327987,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
```

### 4. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 5. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [261, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [118, -641]}
```

### 6. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 797, 'con_lineas': 64339, 'lisas': 20660, 'pct_lisas': 24.3}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 11.6, 'cx': -240, 'cz': 422}
edificios [[73, 234, 1.55], [-909, -408, 1.17]]
recortados 3129
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 7. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 509, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
tf13 {'anillo': 8, 'tuneles': 2, 'accesos': 17, 'anillo_prof': 6, 'tunel_prof': 7.4}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 2, 'valla_tramos': 691}
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

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.1740007076505, "z": 428.92684097599704, "len": 22.3, "ancho": 2.6, "y": -35}, {"name": "", "x": 256.8213465101952, "z": 1082.6010280097707, "len": 10.2, "ancho": 2.6, "y": -40.3}, {"name": "", "x": 251.25, "z": 1088.75, "len": 6.4, "ancho": 2.6, "y": -40.2}, {"name": "", "x": 245.8949364078257, "z": 1093.6614830790065, "len": 8.2, "ancho": 2.6, "y": -40}, {"name": "", "x": 276.6701233150776, "z": 1056.9134720601267, "len": 24.2, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 267.5, "z": 1070, "len": 7.8, "ancho": 2.6, "y": -40.7}, {"name": "", "x": 482.9126336264246, "z": 1258.136450345903, "len": 16.6, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 497.5, "z": 1242.25, "len": 8.2, "ancho": 2.6, "y": -66.1}, {"name": "", "x": 504, "z": 1234.75, "len": 11.7, "ancho": 2.6, "y": -66.6}, {"name": "", "x": 285.19469321603094, "z": 1000.175595715388, "len": 19.4, "ancho": 2.6, "y": -42.9}, {"name": "", "x": 237.9345819323408, "z": 1052.098127101489, "len": 18.3, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 268.5, "z": 1005, "len": 27.5, "ancho": 2.6, "y": -42.3}, {"name"
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
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

### 9. prueba_trinidad.py — OK

```
widths [6.6]
invaden []
aparcamientos [{'name': 'Parking Trinidad', 'x': -113, 'z': 106, 'yF': -13.5}, {'name': 'Parking Trinidad', 'x': -133, 'z': 163, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -153, 'z': 221, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -173, 'z': 278, 'yF': -14.2}, {'name': 'Parking Trinidad', 'x': -193, 'z': 336, 'yF': -14}, {'name': 'Parking Trinidad', 'x': -213, 'z': 394, 'yF': -13.7}, {'name': 'Parking Trinidad', 'x': -232, 'z': 451, 'yF': -13.2}]
nuevas 8
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-85, 28], 'profundidad': 8.2, 'en_sala': True, 'fin': [-104, 81]}
coche {'aparcamiento': 'Parking Trinidad', 'rampa': [-244, 524], 'profundidad': 7.3, 'en_sala': True, 'fin': [-227, 469]}
foto trinidad_rampa_1
foto trinidad_rampa_1_alto
foto trinidad_rampa_7
foto trinidad_rampa_7_alto
foto trinidad_pedrozerolo
foto trinidad_pedrozerolo_calle
errores JS []
TRINIDAD OK
```

### 10. prueba_canchas.py — OK

```
   ['c7', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c8', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c9', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c10', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c11', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c12', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c13', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c14', 'door', 'la cancha (entrada por la calle)', 1, -169, -1131]
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
   ['mayex', 'door', 'Colegio Máyex', 1, -59, -425]
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

### 11. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [7, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[7,0]}
PARTIDO CPU OK
partido fácil 1 [16, 3]
partido fácil 2 [19, 2]
partido fácil 3 [15, 7]
equilibrio primer partido [50, 12] OK
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
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 12. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [1, 0], 'golden': False}
resultado {"won":true,"score":[1,0]}
PARTIDO CPU OK
partido fácil 1 [9, 0]
partido fácil 2 [7, 0]
partido fácil 3 [4, 0]
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
campos {'campos': 73, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 13. prueba_0851.py — OK

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
arriba []
errores []
PRUEBA 0851 OK
```

### 14. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 25.5
{"frame":568,"calls":1998,"triangles":19342450,"points":0,"lines":0} calls:1998
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [-0.1, -1.7, 12.7], 'charcos': [[0.5, 7]], 'apuntando': False, 'mano': [-0.08, 8.15, 0.24]}, 'gotas': 43, 'charcos': 2, 'fuego_apagado': True, 'agua': [100, 92], 'hud': 'RIFLE DE AGUA 95%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 39, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': False, 'pelea': False, 'mision': False}
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
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 1, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 FALLA
```

### 15. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 12}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 10.93}
diario {'primera': ['Segundo', 'El ladrón del cepillo'], 'n': 46}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-376, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 16. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.4","punta":"210","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -361 · Y 0 · 551 m"}
```

### 17. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 45, 'derrape_final': 0, 'kmh_3s': 35, 'giro_3s_grados': 180, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 44, 'kmh_1s': 40, 'giro_1s_grados': 118, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 180, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 20, 'kmh_1s': 50, 'giro_1s_grados': 76, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 114, 'derrape_max_grados': 20}
OK
```

### 18. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.53, 0.55, 0.53], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.56, 0.53, 0.55], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.55, 0.54, 0.57], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.6, 0.55, 0.59], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.66], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.51, 0.52, 0.51, 0.52], 'dif': 0.01}
```

### 19. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 20. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 0, 83, 67, -33, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 21. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",0.31,1.07,0.29,"lowerarm_l"],["CylinderGeometry",0.34,1.08,0.29,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",0.02,1.25,0.36,"lowerarm_l"],["CylinderGeometry",0.05,1.25,0.38,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",0.02,1.27,0.35,"lowerarm_l"],["CylinderGeometry",0.04,1.26,0.36,"lowerarm_l"]]
```

### 22. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":132}
{"ph":"intro","b":"FIGHT!","pt":105}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 23. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":11.999999999999998,"gofio":true}
teide OK {"walk":32.099999999999994,"gofio":true,"teide":true}
gancho OK {"walk":32.099999999999994,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":32.099999999999994,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 24. prueba_pelea_atras.py — OK

```
{"sep":130,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 25. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 26. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.112, 'mano_izq': 0.019, 'angulo_antebrazo': 32}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.114, 'mano_izq': 0.068, 'angulo_antebrazo': 32}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 7, 'marcador': [1, 3]}
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
combos de la CPU buena {'combos_cpu': 14, 'marcador': [34, 31]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 27. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [9, 0], 'pases': 9, 'con_balon': ['EL CHOPA', 'EL LARGO', 'EL MÁS ALTO', 'COCO', 'EL PIBE', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [22.1, 16, 18.8, 14.8, 15.5, 18.4]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 28. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'Juanillo Cuchara', 't': 239.70000000000002, 'd': 51}
en_minimapa True
pelea True
rival {'name': 'JUANILLO CUCHARA', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 29. prueba_089.py — OK

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

### 30. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '1f5fbf'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'URUGUAY'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 31. prueba_090.py — OK

```
saque {'fase': 'score', 'jump': 0.09, 'inb': 'inbound', 'bx': 27.46, 'team': 1, 'luego': 'play', 'ball': 'pass'}
foto v090_basket
foto v090_basket_mate
público function
foto v090_guanche_elegir
guanche {'fase': 'select'}
héroe {'id': 'mencey', 'name': 'EL MAGOTE', 'made': 0}
foto v090_guanche_mencey
héroe {'id': 'pastor', 'name': 'EL MENCEY', 'made': 0}
foto v090_guanche_pastor
héroe {'id': 'mirla', 'name': 'LA MIRLADORA', 'made': 0}
foto v090_guanche_mirla
foto v090_bencomo_titulo
SAQUE DE FONDO OK
NOMBRES GUANCHE OK
errores []
PRUEBA 090 OK
```

### 32. prueba_088.py — OK

```
partido {'ok': True, 'juega': True, 'n': 12, 'marcador': [0, 0]}
foto v088_futbol
PARTIDO OK
errores []
PRUEBA 088 OK
```

### 33. prueba_095.py — OK

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

### 34. prueba_0962.py — OK

```
saque del portero {'caso': 'libre', 'a': 'cercano', 'alto': 0.06}
saque del portero {'caso': 'tapado', 'a': 'cercano', 'alto': 2.08}
SAQUE AL CERCANO (RASO O BOMBEADO) OK
errores []
PRUEBA 0962 OK
```

### 35. prueba_0821.py — OK

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

### 36. prueba_082.py — OK

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
recorrido [{'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'pastor', 'avance': 0.95, 'jefe': True, 'pasada': True, 'segundos': 101, 'puntos': 10460}, {'estado': {'p': [167, 24, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 91, 'puntos': 11800}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 128, 'puntos': 14250}, {'estado': {'p': [152, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mencey', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 99, 'puntos': 13470}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 122, 'puntos': 15730}, {'estado': {'p': [259, 22, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 6, 'heroe': 'pastor', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 145, 'puntos': 16190}, {'estado': {'p': [259, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 7, 'heroe': 'mirla', 'avance': 0.96, 'jefe': True, 'pasada': True, 'segundos': 208, 'puntos': 33930}]
FASES OK
fin de partida {'m1': 'name', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 OK
```

### 37. prueba_083.py — OK

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
tienda, guardar y leyenda {'fuera': True, 'consola_en_tienda': True, 'kept': {'casa': True, 'consola': True, 'invitado': True, 'cartuchos': 2}, 'ley': 'Rutas y avisosTúDestino GPSRuta GPSRuta de misiónObjetivo activoTrazado de misiónControles de misiónFugitivoPolicíaMaleanteLugaresComidaEntradaJugueteríaCasa de El Blanco · BencomoBar con GUFOInmobiliaria Pisos ChachiTu viviendaLíneas de misión abiertasEl ObispoCopa LagunaEl SecretaCarreras del Canarión'}
TIENDA/GUARDAR/LEYENDA OK
errores []
PRUEBA 083 OK
```

### 38. prueba_080.py — OK

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

### 39. prueba_081.py — OK

```
bar {'hay': True, 'bar': 'Barraquito Stars', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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

### 40. prueba_093.py — OK

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

### 41. prueba_094.py — OK

```
golpe a 10 de profundidad {'hp0': 8, 'hp': 6}
patadas {'sStun': True, 'wStun': False, 'strongHit': True, 'hp': [21, 14.6], 'bigNo': True}
foto v094_guanche_retrato
foto v094_bencomo_salto
foto v094_bencomo_picado
PROFUNDIDAD OK
PATADAS Y GOLPE FUERTE OK
errores []
PRUEBA 094 OK
```

### 42. prueba_0952.py — OK

```
campamento {'fase': 'camp', 'montado': False, 'dibujado': 1, 'cargadas': 5}
foto v0952_campamento
SE VE EN EL CAMPAMENTO OK
HOJAS CARGADAS AL ABRIR OK
foto v0953_bencomo_caballero
errores []
PRUEBA 0952 OK
```

### 43. prueba_096.py — OK

```
patada fuerte y destello {'flash': 0, 'antes': [], 'skick_en': 0, 'alPulsar': 'idle', 'alSoltar': 'kick', 'golpePulsar': 'idle', 'golpeSoltar': 'atk'}
foto v096_patada
foto v096_patada_carrera
foto v0961_mordisco
GOLPES AL SOLTAR Y SIN DESTELLO FIJO OK
errores []
PRUEBA 096 OK
```

### 44. prueba_098.py — OK

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

### 45. prueba_0996b.py — OK

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

### 46. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.87,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":4}
```

### 47. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.87,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":4}
```

### 48. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":true,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1795392442272],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1795392442306],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1795392442313],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1795392442318],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1795392444098]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1795392447553],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1795392447567],["El Chopa","¿Y si me gana él?",1795392447574],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1795392447581]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795392447619],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1795392447675],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1795392447681],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1795392447687],["Rayco «El Blanco»","«Psss... siesta.»",1795392447693],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1795392447736],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1795392447834],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1795392451907],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1795392453929],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1795392453959],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1795392453967],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1795392454009],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1795392454122],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1795392454130],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1795392454136]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1795392454654],["El Chopa","Eso no puede ser legal.",1795392454691],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1795392454698]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1795392454794],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1795392454827]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1795392454911],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1795392454943],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1795392454950]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1795392455035],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1795392455073],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1795392455079]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1795392455164],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1795392455200],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1795392455206]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1795392458838],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1795392458873],["El Chopa","Monseñor, ¿esto es legal?",1795392458882],["Monseñor Fermín Truchas","Hijo, es fútbol.",1795392458888]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1795392458952],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1795392458985],["Primero","hola",1795392461542],["Segundo","adiós",1795392461543]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","Prueba de la máquina",1795392527449]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795392538464],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795392538473],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795392538489],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795392538509],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795392538529],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795392538601],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795392538645],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795392547211]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":true,"defenders":true,"patrol":false,"basketTut":false,"futbolTut":true,"jugueterias":true,"maleIntro":true,"rifleTut":true,"obispoIntro":false,"arcade":{"scores":{"prueba":[["BCA",987650],["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000]],"prueba_090":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_095":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"blanco":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"jug_Juguetes Sabelotodo":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"bar_Barraquito Stars":[["BCA",987730],["BLA",80000],["COC",72000],["SAS",64000],["BOC",56000],["CHO",48000],["AYO",40000],["GUA",32000],["TIN",24000],["YAI",16000]],"prueba_093":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_093b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_094":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_094b":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_0952":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_0953":[["BLA",60000],["COC",54000],["SAS",48000],["BOC",42000],["CHO",36000],["AYO",30000],["GUA",24000],["TIN",18000],["YAI",12000],["MEN",6000]],"prueba_096":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]],"prueba_098":[["BLA",90000],["COC",81000],["SAS",72000],["BOC",63000],["CHO",54000],["AYO",45000],["GUA",36000],["TIN",27000],["YAI",18000],["MEN",9000]]},"bought":[],"console":false,"invited":true},"casa":{"intro":false,"owned":[],"rent":null,"day":1,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Te has dejado 1 € en la máquina"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795392442272], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795392442306], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795392442313], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795392442318], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795392444098]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795392447553], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1795392447567], ['El Chopa', '¿Y si me gana él?', 1795392447574], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1795392447581]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795392447619], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1795392447675], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1795392447681], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1795392447687], ['Rayco «El Blanco»', '«Psss... siesta.»', 1795392447693], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1795392447736], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1795392447834], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1795392451907], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1795392453929], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1795392453959], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1795392453967], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1795392454009], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1795392454122], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1795392454130], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1795392454136]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1795392454654], ['El Chopa', 'Eso no puede ser legal.', 1795392454691], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1795392454698]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1795392454794], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1795392454827]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1795392454911], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1795392454943], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1795392454950]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1795392455035], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1795392455073], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1795392455079]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1795392455164], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1795392455200], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1795392455206]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1795392458838], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1795392458873], ['El Chopa', 'Monseñor, ¿esto es legal?', 1795392458882], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1795392458888]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1795392458952], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1795392458985], ['Primero', 'hola', 1795392461542], ['Segundo', 'adiós', 1795392461543]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1795392527449]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795392538464], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795392538473], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1795392538489], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1795392538509], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1795392538529], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1795392538601], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1795392538645], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1795392547211]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'futbolTut': True, 'jugueterias': True, 'maleIntro': True, 'rifleTut': True, 'obispoIntro': False, 'arcade': {'scores': {'prueba': [['BCA', 987650], ['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000]], 'prueba_090': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_095': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'bar_Barraquito Stars': [['BCA', 987730], ['BLA', 80000], ['COC', 72000], ['SAS', 64000], ['BOC', 56000], ['CHO', 48000], ['AYO', 40000], ['GUA', 32000], ['TIN', 24000], ['YAI', 16000]], 'prueba_093': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_094': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_094b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0952': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_0953': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_096': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_098': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.037111111111058}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'La misión «Atraco en la farmacia» se guardó a medias: empieza de nuevo en su círculo'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1795392442272], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1795392442306], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1795392442313], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1795392442318], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1795392444098]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1795392447553], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1795392447567], ['El Chopa', '¿Y si me gana él?', 1795392447574], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1795392447581]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1795392447619], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1795392447675], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1795392447681], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1795392447687], ['Rayco «El Blanco»', '«Psss... siesta.»', 1795392447693], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1795392447736], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1795392447834], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1795392451907], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1795392453929], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1795392453959], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1795392453967], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1795392454009], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1795392454122], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1795392454130], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1795392454136]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1795392454654], ['El Chopa', 'Eso no puede ser legal.', 1795392454691], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1795392454698]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1795392454794], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1795392454827]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1795392454911], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1795392454943], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1795392454950]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1795392455035], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1795392455073], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1795392455079]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1795392455164], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1795392455200], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1795392455206]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1795392458838], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1795392458873], ['El Chopa', 'Monseñor, ¿esto es legal?', 1795392458882], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1795392458888]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1795392458952], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1795392458985], ['Primero', 'hola', 1795392461542], ['Segundo', 'adiós', 1795392461543]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', 'Prueba de la máquina', 1795392527449]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1795392552560], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1795392552576]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'futbolTut': True, 'jugueterias': True, 'maleIntro': True, 'rifleTut': True, 'obispoIntro': False, 'arcade': {'scores': {'prueba': [['BCA', 987650], ['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000]], 'prueba_090': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_095': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'blanco': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'jug_Juguetes Sabelotodo': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'bar_Barraquito Stars': [['BCA', 987730], ['BLA', 80000], ['COC', 72000], ['SAS', 64000], ['BOC', 56000], ['CHO', 48000], ['AYO', 40000], ['GUA', 32000], ['TIN', 24000], ['YAI', 16000]], 'prueba_093': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_093b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_094': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_094b': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_0952': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_0953': [['BLA', 60000], ['COC', 54000], ['SAS', 48000], ['BOC', 42000], ['CHO', 36000], ['AYO', 30000], ['GUA', 24000], ['TIN', 18000], ['YAI', 12000], ['MEN', 6000]], 'prueba_096': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]], 'prueba_098': [['BLA', 90000], ['COC', 81000], ['SAS', 72000], ['BOC', 63000], ['CHO', 54000], ['AYO', 45000], ['GUA', 36000], ['TIN', 27000], ['YAI', 18000], ['MEN', 9000]]}, 'bought': [], 'console': False, 'invited': True}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.041555555555496}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False, 'obispoIntro': True, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 49. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 19.199999999254942
{"frame":564,"calls":1648,"triangles":12822605,"points":0,"lines":0} calls:1648
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.30 m OK
[8] Los bancos del Adelantado: a pie: a 9 m, recorre 4 m en 3 s, salto máx 0.15 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 7 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 12 m en 3 s, salto máx 0.17 m OK | a pie: a 10 m, recorre 14 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 50. prueba_diario.py — OK

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

### 51. prueba_1419.py — OK

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

### 52. prueba_1420.py — OK

```
{'col': {'taxi': {'paint': 16185076, 'bar': 0}, 'taxi2': {'paint': 16185076, 'bar': 0}, 'taxi3': {'paint': 16185076, 'bar': 0}, 'bomberos': {'paint': 11736092, 'bar': 2}, 'grua': {'paint': 15905306, 'bar': 0}, 'policia': {'paint': 16185076, 'bar': 2}, 'daily': {'paint': 16720384, 'bar': 0}, 'daily2': {'paint': 16720384, 'bar': 0}, 'canter': {'paint': 16720384, 'bar': 0}, 'sprinter': {'paint': 16720384, 'bar': 0}, 'clip': {'paint': 16720384, 'bar': 0}}, 'alias': ['clip', 'traficc', 'vivita', 'carlota', 'helado', 'hilos'], 'viejos': [], 'nunca': [], 'vistos': 70, 'taxis': ['taxi2', 'taxi', 'taxi3']}
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

### 53. prueba_1421.py — OK

```
{'bus': {'id': 'guagua', 'type': 'bus', 'paint': 2067020, 'L': 11.4}, 'basura': 16185076, 'viejos': []}
GUAGUA_PROPIA OK
BASURA_BLANCA OK
SIN_MODELOS_VIEJOS OK
errores []
PRUEBA 1421 OK
```

### 54. prueba_1426_gpu.py — OK

```
{'near': 11307, 'wheels': 4, 'far': True, 'parked': 146, 'total': 7543, 'white': 0.044412037650802066, 'colors': 21, 'represented': 50, 'paintedInstance': True, 'profiles': {'reventon': [270, 14.4], 'fierilla': [252, 13.4], 'guancheGT': [232, 11.8], 'seta128': [132, 5.6], 'daily': [112, 4.2], 'basura': [82, 2.9], 'agility': [60, 4]}, 'reused': True, 'livery': 16185076}
PRUEBA MP YOU OK
```

### 55. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04909344490934449}, 'parked': {'models': 50, 'shades': 21, 'white': 0.044412037650802066}, 'liveTraffic': {'cars': 22, 'shades': 14, 'white': 0}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 56. prueba_1441.py — OK

```
{"hits": [], "worst": 0, "steer": [[12, 0.27124397329914984], [28, 0.05105440581425575], [55, 0.013234069193067056], [80, 0.006254180130615175]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 297, "ratio": 1.1}, "garage": {"ok": true, "carved": true, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.021436843781697}}
AUTOPISTA_SIN_GOLPES OK
GIRO_CIUDAD_IGUAL OK
GIRO_MENOR_A_300 OK
PEATONES_FUERA_DE_PUENTES OK
GOLD_EXISTE OK
GOLD_DORADO OK
GOLD_10_POR_CIENTO OK
GARAJE_HECHO OK
GARAJE_COCHE_DENTRO OK
GARAJE_BOTON OK
GARAJE_PUERTA OK
GARAJE_SALIDA OK
errores []
PRUEBA 1441 OK
```

### 57. prueba_horizonte_1428_gpu.py — OK

```
{'initial': 1075, 'bgFog': 22000, 'items': 11745, 'buckets': 1157, 'equivalence': [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]], 'timing': {'before': [0.33277777776949935, 0.36000000000413923], 'after': [0.03666666665424903, 0.03722222221808301]}, 'views': [{'name': 'trinidad', 'runs': [[22.300000000745058, 1649], [20.800000000745058, 1598], [21.100000001490116, 1598], [21.400000002235174, 1649]]}, {'name': 'ronda', 'runs': [[19.699999999254942, 1306], [18.400000002235174, 1272], [20.5, 1272], [18.699999999254942, 1306]]}, {'name': 'mirador', 'runs': [[17.599999997764826, 1180], [17.899999998509884, 1157], [16.699999999254942, 1157], [17.600000001490116, 1180]]}]}
HORIZONTE OK
```

### 58. prueba_prologo_1427.py — FALLA

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': False, 'grid': {'same': False, 'oneway': True, 'ahead': -135, 'fwd': True, 'dot': 0.81, 'se': 2291, 'pe': 4149}, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA FALLA
```

### 59. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 60. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 61. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 62. audit_obstaculos.py — OK

```
obstacles 173
[(('footway', 'motorway_link'), 17), (('footway', 'unclassified'), 17), (('footway', 'service'), 14), (('service', 'residential'), 12), (('service', 'service'), 9), (('primary', 'motorway_link'), 9), (('unclassified', 'motorway'), 8), (('primary', 'secondary'), 8), (('footway', 'motorway'), 8), (('secondary', 'secondary'), 7), (('motorway_link', 'tertiary'), 5), (('primary', 'unclassified'), 5), (('footway', 'residential'), 5), (('motorway', 'secondary'), 5), (('motorway_link', 'motorway_link'), 4), (('service', 'tertiary'), 4), (('motorway', 'motorway_link'), 4), (('footway', 'tertiary'), 4), (('tertiary', 'tertiary'), 3), (('motorway', 'secondary_link'), 3)]
barreras en calzada 0 Counter()
```

### 63. prueba_reacciones_agua_gpu.py — OK

```
{'flee': 10, 'pursue': 10, 'lines': 5, 'fleeLines': 5, 'fight': True}
REACCIONES AL AGUA OK
```

### 64. prueba_diario_gps_gpu.py — OK

```
{'available': True, 'tracks': True, 'reopened': True, 'cleared': True, 'completed': True}
SEGUIMIENTO DEL DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, faros1437_apagados.jpg, faros1437_encendidos.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, horizonte1428_mirador_anterior.jpg, horizonte1428_mirador_nuevo.jpg, horizonte1428_ronda_anterior.jpg, horizonte1428_ronda_nuevo.jpg, horizonte1428_trinidad_anterior.jpg, horizonte1428_trinidad_nuevo.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, mpyou_en_juego.jpg, pelea_tamano.jpg, ready.png, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v0822_mapa.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_fase6.jpg, v082_fase7.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg, v088_futbol.png, v089_bencomo.jpg, v090_basket.jpg, v090_basket_mate.jpg, v090_bencomo_titulo.jpg, v090_guanche_elegir.jpg, v090_guanche_mencey.jpg, v090_guanche_mirla.jpg, v090_guanche_pastor.jpg, v093_bencomo_agachado.jpg, v093_bencomo_castellanos.jpg, v093_bencomo_golpebajo.jpg, v093_bencomo_lugo.jpg, v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg, v094_bencomo_picado.jpg, v094_bencomo_salto.jpg, v094_guanche_retrato.jpg, v0952_campamento.jpg, v0953_bencomo_caballero.jpg, v095_bencomo_golpebajo.jpg, v095_bencomo_picado.jpg, v095_futbol.jpg, v0961_mordisco.jpg, v096_patada.jpg, v096_patada_carrera.jpg, v098_barranco.jpg, v098_echeyde.jpg, v098_malpais.jpg, v0996_bk_espaldas_aro.jpg, v0996_bk_mate_360.jpg, v0996_bk_mate_360_aro.jpg, v0996_bk_molino.jpg, v0996_bk_piernas.jpg, v0996_bk_rebote_tapon.jpg, v0996_bk_robo.jpg, v0996_bk_tiro.jpg
