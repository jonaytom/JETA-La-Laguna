# Pruebas 0.95.0 — 2026-10-27 10:50 — 42/48 OK

Listas: cambios, v095. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 687 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_grandes.py` | **OK** | 79 s |
| 4 | `prueba_bordes.py` | **OK** | 0 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 38 s |
| 6 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 7 | `prueba_pendientes_faciles.py` | **OK** | 5 s |
| 8 | `prueba_078.py` | **OK** | 21 s |
| 9 | `prueba_trinidad.py` | **OK** | 9 s |
| 10 | `prueba_083.py` | **OK** | 2 s |
| 11 | `prueba_0851.py` | **OK** | 7 s |
| 12 | `prueba_canchas.py` | **OK** | 1 s |
| 13 | `prueba_baloncesto.py` | **OK** | 16 s |
| 14 | `prueba_futbol.py` | **OK** | 7 s |
| 15 | `prueba_076.py` | **FALLA** (repetida aparte) | 101 s |
| 16 | `prueba_077.py` | **OK** | 15 s |
| 17 | `prueba_misiones_guardado.py` | **OK** | 19 s |
| 18 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 19 | `prueba_075.py` | **OK** | 4 s |
| 20 | `prueba_pasos.py` | **OK** | 2 s |
| 21 | `herramientas/foto_jugador.py` | **OK** | 5 s |
| 22 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 23 | `prueba_freno_mano.py` | **OK** | 0 s |
| 24 | `prueba_peralte.py` | **OK** | 0 s |
| 25 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 26 | `prueba_panel_controles.py` | **OK** | 12 s |
| 27 | `prueba_pelea_especiales.py` | **OK** | 14 s |
| 28 | `prueba_pelea_atras.py` | **OK** | 11 s |
| 29 | `prueba_bloqueo.py` | **OK** | 10 s |
| 30 | `prueba_079.py` | **FALLA** | 6 s |
| 31 | `prueba_084.py` | **OK** | 0 s |
| 32 | `prueba_maleantes.py` | **OK** | 2 s |
| 33 | `prueba_089.py` | **OK** | 1 s |
| 34 | `prueba_090.py` | **OK** | 1 s |
| 35 | `prueba_085.py` | **FALLA** | 1 s |
| 36 | `prueba_088.py` | **FALLA** | 0 s |
| 37 | `prueba_095.py` | **OK** | 0 s |
| 38 | `prueba_0821.py` | **OK** | 0 s |
| 39 | `prueba_082.py` | **FALLA** | 0 s |
| 40 | `prueba_080.py` | **OK** | 2 s |
| 41 | `prueba_081.py` | **FALLA** | 1 s |
| 42 | `prueba_093.py` | **OK** | 1 s |
| 43 | `prueba_094.py` | **OK** | 1 s |
| 44 | `herramientas/sonda_guia.py 284 112` | **OK** | 1 s |
| 45 | `herramientas/sonda_guia.py 284 112 coche` | **OK** | 1 s |
| 46 | `prueba_persecuciones.py` | **OK** (repetida aparte) | 103 s |
| 47 | `prueba_diario.py` | **OK** | 0 s |
| 48 | `prueba_misiones.py` | **OK** | 73 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `build.py`, `scripts/PRUEBAS_LISTA.txt`, `scripts/pruebas/categorias.json`, `scripts/pruebas/fotos_tf5.txt`, `scripts/pruebas/fotos_vallado.txt`, `scripts/pruebas/solo078.txt`, `scripts/pruebas/sonda077.txt`, `scripts/pruebas/v076r.txt`, `scripts/pruebas/v077.txt`, `scripts/pruebas/v077b.txt`, `scripts/pruebas/v077c.txt`, `scripts/pruebas/v077d.txt`, `scripts/pruebas/v0781a.txt`, `scripts/pruebas/v0781b.txt`, `scripts/pruebas/v078a.txt`, `scripts/pruebas/v078b.txt`, `scripts/pruebas/v078c.txt`, `scripts/pruebas/v078d.txt`, `scripts/pruebas/v078e.txt`, `scripts/pruebas/v078f.txt`, `scripts/pruebas/v078g.txt`, `scripts/pruebas/v078h.txt`, `scripts/pruebas/v078i.txt`, `scripts/pruebas/v078j.txt`, `scripts/pruebas/v078k.txt`, `scripts/pruebas/v078l.txt`, `scripts/pruebas/v078m.txt`, `scripts/pruebas/v078o.txt`, `scripts/pruebas/v079a.txt`, `scripts/pruebas/v080a.txt`, `scripts/pruebas/v081a.txt`, `scripts/pruebas/v0821a.txt`, `scripts/pruebas/v0822a.txt`, `scripts/pruebas/v082a.txt`, `scripts/pruebas/v082b.txt`, `scripts/pruebas/v0831a.txt`, `scripts/pruebas/v0832a.txt`, `scripts/pruebas/v083a.txt`, `scripts/pruebas/v084a.txt`, `scripts/pruebas/v084b.txt`, `scripts/pruebas/v0851.txt`, `scripts/pruebas/v085a.txt`, `scripts/pruebas/v086.txt`, `scripts/pruebas/v087.txt`, `scripts/pruebas/v0871.txt`, `scripts/pruebas/v088.txt`, `scripts/pruebas/v089.txt`, `scripts/pruebas/v090.txt`, `scripts/pruebas/v091.txt`, `scripts/pruebas/v092.txt`, `scripts/pruebas/v093.txt`, `scripts/pruebas/v094.txt`, `scripts/pruebas/v095.txt`, `scripts/publicar.log`, `src/01_core.js`, `src/04_world.js`, `src/05_scenery.js`, `src/05f_anchieta.js`, `src/05g_interiors.js`, `src/05i_sports.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 24, 'peor': 119, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793097585500,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 329, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
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

### 4. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 5. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 6. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [170, -590.6], 'sobre_suelo': -5.32, 'salio': False, 'stuck': {'at': [170.01, -590.57, -5.32], 'dbg': []}}
{'escalera': [219, -597], 'fin': [210, -601.2], 'sobre_suelo': -5.01, 'salio': False, 'stuck': {'at': [209.98, -601.17, -5.01], 'dbg': []}}
coche {'rampa': [260, -552], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [262, -551]}
coche {'rampa': [120, -640], 'hueco_min_techo': 99, 'profundidad': 0, 'en_sala': False, 'fin': [115, -642]}
```

### 7. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 79359, 'lisas': 25057, 'pct_lisas': 24}
aviones 17
aviones_en_via []
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0]]
recortados 4158
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES OK
```

### 8. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6, "y": -8.5}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6, "y": -131.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6, "y": -128.9}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6, "y": -132.2}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6, "y": -132.8}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6, "y": 4.7}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8, "y": 1.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8, "y": 3.1}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8, "y": 2.5}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220472441, "len": 1.5, "ancho": 3.8, "y": 3.7}, {"name": "Pasaje Teide", "cu
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 4.92, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 4.88, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
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

### 9. prueba_trinidad.py — OK

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

### 10. prueba_083.py — OK

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

### 11. prueba_0851.py — OK

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

### 12. prueba_canchas.py — OK

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
   ['c30', 'door', 'la cancha (entrada por la calle)', 4, -1266, -1045]
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

### 13. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [2, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [13, 5]
partido fácil 2 [15, 2]
partido fácil 3 [27, 2]
equilibrio primer partido [55, 9] OK
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

### 14. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [1, 1], 'golden': False}
resultado {"won":true,"score":[2,1]}
PARTIDO CPU OK
partido fácil 1 [8, 1]
partido fácil 2 [8, 0]
partido fácil 3 [6, 0]
equilibrio primer partido [22, 1] OK
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

### 15. prueba_076.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
V076 FALLA
--- repetida aparte:
shot ms 1.5999999977648258
{"frame":564,"calls":1828,"triangles":4623885,"points":0,"lines":0} calls:1828
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [0, -2.8, 12.6], 'charcos': [[0.5, 6.9]], 'apuntando': False, 'mano': [-0.08, 8.15, 0.21]}, 'gotas': 12, 'charcos': 2, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 95%\nTAB / 1: puños'}
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
V076 FALLA
```

### 16. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 7694, 'juntadas': 7055, 'mallas': 1723, 'ms': 379, 'no': {'con hijos': 588, 'transparente': 306, 'grupo con nombre': 3433, 'varios materiales': 2, 'userData': 103, 'onBeforeRender': 1}, 'ultimoId': 25713}, 'fusion': 1723, 'celdas': 5013, 'lod': 10073, 'peatones_enteros': 10}
distancia {'cerca': [111, 111], 'lejos': [0, 9091], 'niebla': 520}
aparcados {'grupos': 1283, 'coches': 9650, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 10504 ms; plazas [432] aparcados [483]
junta piezas 7055
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 7055
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

### 17. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":true,"side":0,"sideOpen":false,"obispo":7,"torneo":0,"copa":0,"secreta":5,"carreras":2,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1793097774857],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1793097774886],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1793097774891],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1793097774894],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1793097776398]],"Maleantes en busca y captura":[["Sastrón (por el móvil)","Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.",1793097780486],["Sastrón (por el móvil)","Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.",1793097780501],["El Chopa","¿Y si me gana él?",1793097780507],["Sastrón (por el móvil)","Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.",1793097780517]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1793097780542],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1793097780574],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1793097780582],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1793097780589],["Rayco «El Blanco»","«Psss... siesta.»",1793097780597],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1793097780647],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1793097780662],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1793097784721],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1793097786739],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1793097786761],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1793097786771],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1793097786792],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1793097788174],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1793097788179],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1793097788184]],"Tostón, de la Secreta":[["Inspector Fulgencio Tostón","Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.",1793097790414],["Inspector Fulgencio Tostón","Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.",1793097790430],["El Chopa","¿Y usted no viene?",1793097790438],["Inspector Fulgencio Tostón","Yo coordino. Desde aquí. Con mi bocadillo de pata.",1793097790447]],"Contenedores en llamas":[["Inspector Fulgencio Tostón","Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.",1793097790527],["El Chopa","¿Y los bomberos?",1793097790553],["Inspector Fulgencio Tostón","Están en un gato subido a un drago. Venga, que se acaba el tiempo.",1793097790561]],"El partido amañado":[["Inspector Fulgencio Tostón","Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.",1793097790633],["Inspector Fulgencio Tostón","Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.",1793097790654]],"Triple en la cancha":[["Inspector Fulgencio Tostón","Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.",1793097790728],["El Chopa","Y cuando les ganemos, ¿qué?",1793097790757],["Inspector Fulgencio Tostón","Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.",1793097790762]],"Al pirómano, agua":[["Inspector Fulgencio Tostón","El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.",1793097790833],["Inspector Fulgencio Tostón","Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.",1793097790856]],"Operación Gofio Blanco":[["Inspector Fulgencio Tostón","Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.",1793097790941],["Inspector Fulgencio Tostón","Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.",1793097790964],["El Chopa","¿Y el resto de la Secreta?",1793097790973],["Inspector Fulgencio Tostón","El resto de la Secreta soy yo.",1793097790988]],"Duelo nocturno en Los Rodeos":[["El Canarión","¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.",1793097791081],["El Chopa","Eso no puede ser legal.",1793097791100],["El Canarión","Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.",1793097791107]],"Contrarreloj por el casco":[["El Canarión","En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.",1793097791193],["El Canarión","Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.",1793097791220]],"Gran Premio de La Laguna":[["El Canarión","Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.",1793097791303],["Pijo de La Esperanza","Mi padre me ha comprado otro deportivo. Más caro. Prepárate.",1793097791338],["El Canarión","Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.",1793097791343]],"Fuego en la ermita":[["Monseñor Fermín Truchas","¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!",1793097791420],["Monseñor Fermín Truchas","Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.",1793097791449],["El Chopa","¡Voy, Monseñor! Boca, tráeme la toalla.",1793097791457]],"La carrera de los sacristanes":[["Monseñor Fermín Truchas","Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.",1793097791555],["Monseñor Fermín Truchas","Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.",1793097791593],["Hermano Tomás","Que el Señor te dé piernas, porque las vas a necesitar.",1793097791601]],"Curas contra concejales":[["Monseñor Fermín Truchas","Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.",1793097795226],["Monseñor Fermín Truchas","Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.",1793097795249],["El Chopa","Monseñor, ¿esto es legal?",1793097795256],["Monseñor Fermín Truchas","Hijo, es fútbol.",1793097795265]],"El ladrón del cepillo":[["Monseñor Fermín Truchas","¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!",1793097795341],["Monseñor Fermín Truchas","El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.",1793097795366]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1793097796304]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1793097821176],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1793097821186],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1793097821210],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1793097821235],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1793097821261],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1793097821321],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1793097821351],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1793097831262]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":true,"defenders":true,"patrol":false,"basketTut":false,"futbolTut":true,"jugueterias":true,"maleIntro":true,"rifleTut":true,"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"casa":{"intro":false,"owned":[],"rent":null,"day":1,"lastTod":12.035999999999948}},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"El maleante se ha escapado"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1793097774857], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1793097774886], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1793097774891], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1793097774894], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1793097776398]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1793097780486], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1793097780501], ['El Chopa', '¿Y si me gana él?', 1793097780507], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1793097780517]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1793097780542], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1793097780574], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1793097780582], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1793097780589], ['Rayco «El Blanco»', '«Psss... siesta.»', 1793097780597], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1793097780647], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1793097780662], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1793097784721], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1793097786739], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1793097786761], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1793097786771], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1793097786792], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1793097788174], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1793097788179], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1793097788184]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1793097790414], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1793097790430], ['El Chopa', '¿Y usted no viene?', 1793097790438], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1793097790447]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1793097790527], ['El Chopa', '¿Y los bomberos?', 1793097790553], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1793097790561]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1793097790633], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1793097790654]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1793097790728], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1793097790757], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1793097790762]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1793097790833], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1793097790856]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1793097790941], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1793097790964], ['El Chopa', '¿Y el resto de la Secreta?', 1793097790973], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1793097790988]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1793097791081], ['El Chopa', 'Eso no puede ser legal.', 1793097791100], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1793097791107]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1793097791193], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1793097791220]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1793097791303], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1793097791338], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1793097791343]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1793097791420], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1793097791449], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1793097791457]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1793097791555], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1793097791593], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1793097791601]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1793097795226], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1793097795249], ['El Chopa', 'Monseñor, ¿esto es legal?', 1793097795256], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1793097795265]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1793097795341], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1793097795366]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', '«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.', 1793097796304]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1793097821176], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1793097821186], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1793097821210], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1793097821235], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1793097821261], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1793097821321], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1793097821351], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1793097831262]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'futbolTut': True, 'jugueterias': True, 'maleIntro': True, 'rifleTut': True, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.037111111111058}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 7, 'torneo': 0, 'copa': 0, 'secreta': 5, 'carreras': 2, 'log': {'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1793097774857], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1793097774886], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1793097774891], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1793097774894], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1793097776398]], 'Maleantes en busca y captura': [['Sastrón (por el móvil)', 'Chopa, ahora que sabes repartir, te cuento un negocio. La Policía Local tiene una lista de maleantes en busca y captura y paga una recompensa a quien se los entregue.', 1793097780486], ['Sastrón (por el móvil)', 'Cuando haya uno cerca te saldrá en el minimapa como un triángulo rojo. Vas, le das una buena tunda (pelea, como siempre) y la recompensa es tuya. Sin delito: es un servicio público.', 1793097780501], ['El Chopa', '¿Y si me gana él?', 1793097780507], ['Sastrón (por el móvil)', 'Sigue marcado un rato: vuelve a por él. Y ojo, que pegan más fuerte que la gente normal y cuanto más nivel, más pagan.', 1793097780517]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1793097780542], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1793097780574], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1793097780582], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1793097780589], ['Rayco «El Blanco»', '«Psss... siesta.»', 1793097780597], ['Rayco «El Blanco»', '«Brrr... papeles... ¡fuego!... psss... apaga.»', 1793097780647], ['El Chopa', 'Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.', 1793097780662], ['Rayco «El Blanco»', '«Psss... vacío... brrr... fuente.»', 1793097784721], ['El Chopa', 'Se ha quedado seco. A la fuente a llenarlo.', 1793097786739], ['Rayco «El Blanco»', '«Mmm... Boca... brrr... cabeza... ¡diez metros!»', 1793097786761], ['El Chopa', 'Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.', 1793097786771], ['Boca Papa', '¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!', 1793097786792], ['Rayco «El Blanco»', '«Brrr... ¡diez metros!... mmm... ¡bien!»', 1793097788174], ['El Chopa', 'Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.', 1793097788179], ['Boca Papa', 'Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.', 1793097788184]], 'Tostón, de la Secreta': [['Inspector Fulgencio Tostón', 'Inspector Fulgencio Tostón, de la Secreta. Treinta años en el Cuerpo y ni un día de baja... bueno, alguno. Me han hablado de ti: el de la nariz y la banda de defensores.', 1793097790414], ['Inspector Fulgencio Tostón', 'Necesito ojos frescos. Ese Seat gris lleva tres días dando vueltas por el barrio. Síguelo, pero de lejos, que si te ve se nos escapa. Entre veinte y cien metros, como en las películas.', 1793097790430], ['El Chopa', '¿Y usted no viene?', 1793097790438], ['Inspector Fulgencio Tostón', 'Yo coordino. Desde aquí. Con mi bocadillo de pata.', 1793097790447]], 'Contenedores en llamas': [['Inspector Fulgencio Tostón', 'Un pirómano está quemando contenedores por el barrio. Cuatro esta noche. Tú con el rifle ese de agua apagas, y luego le das con la pistolita de bolas, que a mí la rodilla ya no me da para correr.', 1793097790527], ['El Chopa', '¿Y los bomberos?', 1793097790553], ['Inspector Fulgencio Tostón', 'Están en un gato subido a un drago. Venga, que se acaba el tiempo.', 1793097790561]], 'El partido amañado': [['Inspector Fulgencio Tostón', 'Hay una banda de apostadores que amaña los partidos de barrio: pagan a un equipo para que pierda y se forran. Hoy juegan contra el tuyo, porque saben que sois nuevos.', 1793097790633], ['Inspector Fulgencio Tostón', 'Ganadles. Si pierden su dinero, el jefe se pondrá nervioso y se delatará. Siempre pasa. Lo vi en una película de Bud Spencer.', 1793097790654]], 'Triple en la cancha': [['Inspector Fulgencio Tostón', 'Dos trapicheros mueven mercancía en una cancha. Solo hablan con quien les gana al baloncesto: es su manera de fiarse. Tú y el chico ese, Coco.', 1793097790728], ['El Chopa', 'Y cuando les ganemos, ¿qué?', 1793097790757], ['Inspector Fulgencio Tostón', 'Entonces se pondrán nerviosos y saldrán corriendo. Y tú detrás. Yo te espero con el coche... bueno, sin coche.', 1793097790762]], 'Al pirómano, agua': [['Inspector Fulgencio Tostón', 'El pirómano ha salido bajo fianza. Y ha vuelto a las andadas: está prendiendo fuego a los bancos de la plaza. Esta vez nada de pistola, que su abogado es muy pesado.', 1793097790833], ['Inspector Fulgencio Tostón', 'Lo mojas tres veces con ese chisme de agua y se le apaga el mechero y las ganas. Luego apagas lo que haya dejado ardiendo. Tienes poco tiempo.', 1793097790856]], 'Operación Gofio Blanco': [['Inspector Fulgencio Tostón', 'Chaval, el gofio adulterado sale de una nave del polígono. Es la Operación Gofio Blanco. Tienes dos minutos para llegar antes de que carguen el camión.', 1793097790941], ['Inspector Fulgencio Tostón', 'Habrá un portero grandote, unos cuantos matones y, si se ven perdidos, le pegarán fuego a todo. Llévate el rifle y la pistola. Yo llevo el bigote.', 1793097790964], ['El Chopa', '¿Y el resto de la Secreta?', 1793097790973], ['Inspector Fulgencio Tostón', 'El resto de la Secreta soy yo.', 1793097790988]], 'Duelo nocturno en Los Rodeos': [['El Canarión', '¡Chicharrero! ¿Sabes dónde no hay curvas, ni guaguas, ni viejas cruzando? En la pista del aeropuerto. De noche. Tres kilómetros de recta.', 1793097791081], ['El Chopa', 'Eso no puede ser legal.', 1793097791100], ['El Canarión', 'Hoy no hay vuelos, mi niño. Y el de la torre es primo mío. Lleva un coche a la cabecera de la pista: ida hasta el final, vuelta alrededor del cono y a meta. Mil quinientos pavos.', 1793097791107]], 'Contrarreloj por el casco': [['El Canarión', 'En las rectas cualquiera corre. Lo difícil es el casco: calles estrechas, esquinas de piedra y adoquines. Contrarreloj: tú solo contra el crono.', 1793097791193], ['El Canarión', 'Si rozas mucho, el coche no llega. Mil pavos si lo haces en tiempo.', 1793097791220]], 'Gran Premio de La Laguna': [['El Canarión', 'Lo gordo: el Gran Premio de La Laguna. Tú, yo y el pijo de La Esperanza, que quiere la revancha. Dos kilómetros y medio por toda la ciudad.', 1793097791303], ['Pijo de La Esperanza', 'Mi padre me ha comprado otro deportivo. Más caro. Prepárate.', 1793097791338], ['El Canarión', 'Tres mil pavos al ganador. Y una foto conmigo, que eso no tiene precio.', 1793097791343]], 'Fuego en la ermita': [['Monseñor Fermín Truchas', '¡Hijo mío, una desgracia! Unos gamberros han prendido fuego a las palmas secas del Domingo de Ramos delante de Ermita de San Miguel. ¡Arde todo el pórtico!', 1793097791420], ['Monseñor Fermín Truchas', 'Los bomberos tardan. Tú tienes ese rifle de agua, ¿no? El Señor proveerá... y la fuente de la plaza, también.', 1793097791449], ['El Chopa', '¡Voy, Monseñor! Boca, tráeme la toalla.', 1793097791457]], 'La carrera de los sacristanes': [['Monseñor Fermín Truchas', 'Cada año los sacristanes de las parroquias corren por el casco, de iglesia en iglesia. Este año el hermano Tomás, del Seminario, dice que nadie le gana.', 1793097791555], ['Monseñor Fermín Truchas', 'Corre contra él. A pie, ¿eh? Que en coche ya sé que vas fino.', 1793097791593], ['Hermano Tomás', 'Que el Señor te dé piernas, porque las vas a necesitar.', 1793097791601]], 'Curas contra concejales': [['Monseñor Fermín Truchas', 'Le he propuesto al alcalde un partido benéfico: el equipo de la diócesis contra los concejales. Si ganamos, arreglan el tejado de la Catedral.', 1793097795226], ['Monseñor Fermín Truchas', 'Mis curas están mayores. Vosotros seréis la diócesis. El Blanco, de portero, con la sotana del padre Anselmo.', 1793097795249], ['El Chopa', 'Monseñor, ¿esto es legal?', 1793097795256], ['Monseñor Fermín Truchas', 'Hijo, es fútbol.', 1793097795265]], 'El ladrón del cepillo': [['Monseñor Fermín Truchas', '¡Se han llevado el cepillo de las limosnas de Capilla Cruz de los Herreros! ¡Con lo de la misa de doce dentro!', 1793097795341], ['Monseñor Fermín Truchas', 'El sacristán dice que el ladrón tiene un coche aparcado al lado. Corre, hijo, que el Señor perdona pero yo no.', 1793097795366]], 'Las recreativas': [['Rayco «El Blanco» (por el móvil)', '«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.', 1793097796304]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1793097836561], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1793097836572]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': True, 'defenders': True, 'patrol': False, 'basketTut': False, 'futbolTut': True, 'jugueterias': True, 'maleIntro': True, 'rifleTut': True, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 1, 'lastTod': 12.041555555555496}}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False, 'casa': {'intro': False, 'owned': [], 'rent': None, 'day': 0, 'lastTod': 12.043999999999937}, 'arcade': {'scores': {}, 'bought': [], 'console': False, 'invited': False}}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 18. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 19. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 8}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 10.93}
diario {'primera': ['Segundo', 'Atraco en la farmacia'], 'n': 2}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 20. prueba_pasos.py — OK

```
trote clip Jog_Fwd_Loop vel 4.3 pasos 11 en 4.32 s -> 2.55 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [383, 400, 383, 400, 383, 400, 383, 400, 383, 383] desfase hasta el apoyo (ms) [-17, 0, -17, -17, -17, -17, -17, -17, -17, -17, -17]
sprint clip Sprint_Loop vel 7.4 pasos 13 en 4.32 s -> 3.01 pasos/s lados [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1] intervalos (ms) [417, 367, 317, 250, 417, 367, 317, 250, 433, 350, 317, 250] desfase hasta el apoyo (ms) [83, 67, -33, 67, 83, 67, -17, 67, 83, 50, -17, 67, 83]
andar clip Walk_Loop vel 1.6 pasos 7 en 4.32 s -> 1.62 pasos/s lados [-1, 1, -1, 1, -1, 1, -1] intervalos (ms) [550, 567, 567, 567, 550, 567] desfase hasta el apoyo (ms) [-33, -33, -33, -33, -33, -33, -33]
muestras listas: True
reproducción sin errores
```

### 21. herramientas/foto_jugador.py — OK

```
de pie [["CylinderGeometry",0.3,1.01,0.17,"lowerarm_l"],["CylinderGeometry",0.32,1.02,0.17,"lowerarm_l"]]
puños apuntando [["CylinderGeometry",0.29,0.92,0.03,"lowerarm_l"],["CylinderGeometry",0.31,0.93,0.04,"lowerarm_l"]]
pistola apuntando [["CylinderGeometry",0.3,0.95,0.01,"lowerarm_l"],["CylinderGeometry",0.32,0.95,0.02,"lowerarm_l"]]
```

### 22. prueba_coche_y_boca.py — OK

```
{"modelo":"Tollota Jailux","t0a100":"6.7","punta":"153","maxV":"170","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -560   Z 0"}
```

### 23. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 88, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 277, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 55, 'kmh_1s': 37, 'giro_1s_grados': 143, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 184, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 28, 'kmh_1s': 46, 'giro_1s_grados': 105, 'derrape_final': 0, 'kmh_3s': 62, 'giro_3s_grados': 165, 'derrape_max_grados': 28}
OK
```

### 24. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.62, 0.62, 0.62, 0.63], 'dif': 0.01}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.64, 0.63, 0.63, 0.62], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.63, 0.62, 0.65, 0.63], 'dif': 0.03}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.68, 0.64, 0.68, 0.66], 'dif': 0.04}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.65, 0.64, 0.74, 0.67], 'dif': 0.1}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.6, 0.6, 0.6, 0.6], 'dif': 0}
```

### 25. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 26. prueba_panel_controles.py — OK

```
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":102}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

### 27. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":9.4,"gofio":true}
teide OK {"walk":21.400000000000002,"gofio":true,"teide":true}
gancho OK {"walk":21.400000000000002,"gofio":true,"teide":true,"combo":true,"gancho":true}
pastor OK {"walk":21.400000000000002,"gofio":true,"teide":true,"combo":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 28. prueba_pelea_atras.py — OK

```
{"sep":159,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 78.0 px
{"bloqueado":false,"vida":100}
snap pelea_tamano
```

### 29. prueba_bloqueo.py — OK

```
true
{"ph":"fight","ev":{"walk":374.40000000000197},"hp":100,"dir":1}
```

### 30. prueba_079.py — FALLA

```
rifle sin apuntar {'mano_dcha': 0.109, 'mano_izq': 0.051, 'angulo_antebrazo': 32}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.117, 'mano_izq': 0.037, 'angulo_antebrazo': 65}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 275, 'paradas': 0, 'marcador': [4, 0]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': False}
regate {'regate': True, 'sigue_con_balon': True}
portero sale a por el balón {'portero_la_quita': True, 'frames': 67, 'gol': 0}
FUTBOL saque True palomitas True fuerza False regate True
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
combos de la CPU buena {'combos_cpu': 12, 'marcador': [43, 29]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 FALLA
```

### 31. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [7, 8], 'pases': 13, 'con_balon': ['EL CHOPA', 'EL PIBE', 'EL BLANCO', 'EL MÁS ALTO', 'EL LARGO', 'COCO'], 'marcas_distintas': True, 'movidos': [21.7, 17.8, 18.9, 14.7, 19.4, 18.8]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 32. prueba_maleantes.py — OK

```
sin_saber False
sale True
maleante {'lv': 1, 'name': 'El Gofio Negro', 't': 239.70000000000002, 'd': 102}
en_minimapa True
pelea True
rival {'name': 'EL GOFIO NEGRO', 'lv': 0.66, 'deal': 0.9375, 'recv': 0.9}
cobra 150
delito False
queda False
errores JS []
MALEANTES OK
```

### 33. prueba_089.py — OK

```
pausa basket True False
basket {'conBalon': True, 'ahora': ['EL CHOPA']}
ayuda {'moved': [3.9, 3.9, 4.1]}
combo sin acertar {'t': 2.7, 'vuela': True, 'miss': True, 'sc': 0, 'fase': 'play', 'n': 77, 'suelto': 'held', 'mate': 'hierro'}
futbol {'ctl': True, 'kickCD': 0.5833333333333333, 'cd0': 0, 'mio': False, 'suelto': False}
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

### 34. prueba_090.py — OK

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

### 35. prueba_085.py — FALLA

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
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'ALEMANIA'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO FALLA
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 FALLA
```

### 36. prueba_088.py — FALLA

```
partido {'ok': True, 'juega': True, 'n': 12, 'marcador': [0, 0]}
foto v088_futbol
PARTIDO FALLA
errores []
PRUEBA 088 FALLA
```

### 37. prueba_095.py — OK

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

### 38. prueba_0821.py — OK

```
partida nueva {'abierto': True, 'aun_no': False, 'pendientes': 0, 'sabes': False, 'sabidos': 0}
(sin foto) v0821_diario_nuevo
OCULTO OK
charla con título {'hecho': True, 'lineas': 2, 'ultima': 'Prueba de la máquina'}
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

### 39. prueba_082.py — FALLA

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
magia {'estado': 'idle', 'zurrones': 4, 'tocados': 0, 'enemigos': 2}
foto v082_magia
lagarto {'monta': True, 'cola': 'bite', 'mordisco': True, 'salto': 'whip', 'avanza': 40}
golpes nuevos {'patada': 'atk', 'alto_patada': 0, 'flip': {'estado': 'flip', 'alto': 24, 'detras': True, 'tumbado': True, 'dano': 4}}
foto v082_lagarto
CONTROLES FALLA
foto v082_fase1
foto v082_fase2
foto v082_fase3
foto v082_fase4
foto v082_fase5
recorrido [{'estado': {'p': [192, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 1, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 80, 'puntos': 10170}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 2, 'heroe': 'mencey', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 96, 'puntos': 12150}, {'estado': {'p': [192, 19, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 3, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 127, 'puntos': 13790}, {'estado': {'p': [192, 18, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 4, 'heroe': 'mirla', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 182, 'puntos': 16610}, {'estado': {'p': [192, 21, 'walk', 1, 0], 'lock': 0, 'E': [], 'teclas': ['vR']}, 'fase': 5, 'heroe': 'pastor', 'avance': 1, 'jefe': True, 'pasada': True, 'segundos': 173, 'puntos': 25560}]
FASES OK
fin de partida {'m1': 'cont', 'm2': 'name'}
foto v082_records_nuevo
RECORDS OK
errores []
PRUEBA 082 FALLA
```

### 40. prueba_080.py — OK

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

### 41. prueba_081.py — FALLA

```
bar {'hay': True, 'bar': 'La Cafeína Doble', 'opcion': 4, 'abre': True, 'juego': 'attract'}
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
fin de partida {'m1': 'play', 'm2': 'cont', 'modo': 'name'}
foto v081_records_nuevo
RECORDS FALLA
errores []
PRUEBA 081 FALLA
```

### 42. prueba_093.py — OK

```
hojas 25 sin cargar []
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

### 43. prueba_094.py — OK

```
golpe a 10 de profundidad {'hp0': 8, 'hp': 6}
patadas {'sStun': True, 'wStun': False, 'strongHit': True, 'hp': [21, 12.6], 'bigNo': True}
foto v094_guanche_retrato
foto v094_bencomo_salto
foto v094_bencomo_picado
PROFUNDIDAD OK
PATADAS Y GOLPE FUERTE OK
errores []
PRUEBA 094 OK
```

### 44. herramientas/sonda_guia.py 284 112 — OK

```
{"found":true,"vis":true,"gy":-13.87,"py":-13.9,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 45. herramientas/sonda_guia.py 284 112 coche — OK

```
{"found":true,"vis":false,"gy":-13.87,"py":-13.86,"sc":1,"state":"play","interior":false,"low":false,"blips":3}
```

### 46. prueba_persecuciones.py — OK (repetida aparte)

```
En la carga compartida falló por:
PERSECUCIONES FALLA
--- repetida aparte:
shot ms 2.899999998509884
{"frame":564,"calls":1841,"triangles":4653259,"points":0,"lines":0} calls:1841
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 14 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.16 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 10 m en 3 s, salto máx 0.14 m OK | a pie: a 5 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 47. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 12
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 48. prueba_misiones.py — OK

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

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, entrada_mayex.jpg, entrada_rios_tejera.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, fightgo.png, futbol_partido.jpg, futbol_tutorial.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, jugador_pie.jpg, jugador_pistola.jpg, jugador_punos.jpg, pelea_tamano.jpg, ready.png, sonda_guia.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg, v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v081_demo.jpg, v081_fase1.jpg, v081_fase2.jpg, v081_fase3.jpg, v081_jefe1.jpg, v081_jefe2.jpg, v081_jefe3.jpg, v081_jugando.jpg, v081_records.jpg, v081_records_nuevo.jpg, v081_titulo.jpg, v0822_mapa.jpg, v082_demo.jpg, v082_elegir.jpg, v082_fase1.jpg, v082_fase2.jpg, v082_fase3.jpg, v082_fase4.jpg, v082_fase5.jpg, v082_lagarto.jpg, v082_magia.jpg, v082_pelea.jpg, v082_records.jpg, v082_records_nuevo.jpg, v082_titulo.jpg, v083_casa.jpg, v083_consola_menu.jpg, v084_basket3x3.jpg, v0851_marcos_0.jpg, v0851_marcos_1.jpg, v0851_marcos_2.jpg, v0851_marcos_3.jpg, v0851_marcos_4.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg, v088_futbol.png, v089_bencomo.jpg, v090_basket.jpg, v090_basket_mate.jpg, v090_bencomo_titulo.jpg, v090_guanche_elegir.jpg, v090_guanche_mencey.jpg, v090_guanche_mirla.jpg, v090_guanche_pastor.jpg, v093_bencomo_agachado.jpg, v093_bencomo_castellanos.jpg, v093_bencomo_golpebajo.jpg, v093_bencomo_lugo.jpg, v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg, v094_bencomo_picado.jpg, v094_bencomo_salto.jpg, v094_guanche_retrato.jpg, v095_bencomo_golpebajo.jpg, v095_bencomo_picado.jpg, v095_futbol.jpg
