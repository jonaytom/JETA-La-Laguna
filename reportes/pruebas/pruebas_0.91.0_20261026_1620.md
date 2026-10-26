# Pruebas 0.91.0 — 2026-10-26 16:20 — 11/11 OK

Listas: v091. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 195 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_tf5.py` | **OK** | 88 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 34 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_078.py` | **OK** | 20 s |
| 5 | `prueba_grandes.py` | **OK** | 12 s |
| 6 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 7 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 8 | `prueba_pendientes_faciles.py` | **OK** | 5 s |
| 9 | `prueba_trinidad.py` | **OK** | 8 s |
| 10 | `prueba_arranque.py` | **OK** | 1 s |
| 11 | `prueba_090.py` | **OK** | 2 s |

## Detalle

### 1. sonda_tf5.py — OK

```
foto tf5_espinero_e_ojos {'ri': 2480, 'x': -1500, 'z': -108, 'y': 19.6, 'calzadas': [-108, -124]}
foto tf5_espinero_e_top {'ri': 2480, 'x': -1500, 'z': -108, 'y': 19.6, 'calzadas': [-108, -124]}
foto tf5_espinero_w_ojos {'ri': 2288, 'x': -1500, 'z': -124, 'y': 19.9, 'calzadas': [-108, -124]}
foto tf5_espinero_w_top {'ri': 2288, 'x': -1500, 'z': -124, 'y': 19.9, 'calzadas': [-108, -124]}
foto tf5_sanbenito_ojos {'ri': 2460, 'x': -1100, 'z': 16, 'y': 17, 'calzadas': [16, 1]}
foto tf5_sanbenito_top {'ri': 2460, 'x': -1100, 'z': 16, 'y': 17, 'calzadas': [16, 1]}
foto tf5_sanlazaro_ojos {'ri': 2480, 'x': -1700, 'z': -171, 'y': 26.6, 'calzadas': [-171, -186]}
foto tf5_sanlazaro_top {'ri': 2480, 'x': -1700, 'z': -171, 'y': 26.6, 'calzadas': [-171, -186]}
foto tf5_oeste_ojos {'ri': 2354, 'x': -2000, 'z': -232, 'y': 33.6, 'calzadas': [-232, -247]}
foto tf5_oeste_top {'ri': 2354, 'x': -2000, 'z': -232, 'y': 33.6, 'calzadas': [-232, -247]}
foto tf5_oeste_junto_ojos {'ri': 2354, 'x': -2400, 'z': -214, 'y': 47.1, 'calzadas': [-214, -228]}
foto tf5_oeste_junto_top {'ri': 2354, 'x': -2400, 'z': -214, 'y': 47.1, 'calzadas': [-214, -228]}
foto tf5_bionda_cerca {'suelo': 18.1}
foto tf5_bionda_alto {'suelo': 18.1}
foto tf5_barrera_cerca {'suelo': 18.1}
foto tf5_barrera_alto {'suelo': 17.9}
foto tf5_vallado_boca {'suelo': 7.3}
foto tf5_vallado_alto {'suelo': 9.2}
foto tf5_vallado_tunel {'suelo': 6.6}
foto tf5_huc_rampa {'suelo': -223.4}
foto tf5_huc_rampa_alto {'suelo': -222.1}
foto tf5_adelantado_marcos {'suelo': 1.3}
foto tf5_casco_marcos {'suelo': 0.9}
medianas 321 new jersey 147 biondas 86
tf5 x -2500..-800 [[1, -824, 134, -824, 118, 6], [3, -1158, -27, -1130, -17, 11], [3, -1116, -12, -1094, -4, 9], [3, -2023, -257, -1963, -259, 21], [2, -1935, -238, -1841, -220, 34], [2, -802, 186, -823, 156, 12], [2, -846, 141, -863, 122, 9], [3, -2169, -250, -2178, -250, 4], [3, -2183, -250, -2189, -251, 3], [2, -932, 64, -953, 50, 9], [2, -801, 186, -806, 181, 3], [2, -835, 173, -895, 110, 30], [2, -899, 106, -914, 94, 8], [2, -935, 79, -972, 57, 16], [2, -1001, 43, -1020, 35, 8], [2, -1026, 33, -1050, 25, 10], [2, -1083, 14, -1111, 5, 11], [2, -1145, -5, -1722, -186, 200], [2, -2283, -226, -2259, -228, 9], [2, -2235, -229, -1938, -238, 103], [2, -2481, -203, -2472, -203, 4], [2, -1775, -201, -1725, -187, 18], [3, -1054, 48, -1050, 53, 3], [1, -2229, 23, -2232, 35, 5], [1, -2257, 64, -2309, 98, 22]]
alturas junto a la barrera [[-1442, -98, 18.01, '7.3'], [-1442, -91, 17.88, '0.6'], [-1442, -105, 18.14, '0.8']]
metros de New Jersey en la TF-5 1452
errores []
SONDA TF5 OK
```

### 2. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1667, 't': 10, 'name': 'Camino La Hornera', 'L': 126, 'done': False, 'left': 109, 'time': 6.6, 'x': 1220, 'z': 2533, 'y': -123.5}
snap df_1667
failed 0 of 112 · conocidos 1
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Hornera X 1220 Z 2533
CONDUCCION OK
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 4. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6, "y": -8.5}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6, "y": -131.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6, "y": -128.9}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6, "y": -132.2}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6, "y": -132.8}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6, "y": 4.7}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8, "y": 1.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8, "y": 3.1}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8, "y": 2.5}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220472441, "len": 1.5, "ancho": 3.8, "y": 3.7}, {"name": "Pasaje Teide", "cu
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.2472577337334405)]
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

### 5. prueba_grandes.py — OK

```
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'cortes': 320, 'p520': [-282, 606], 'punto': [-307, 682], 'bajo_suelo': 6.3}
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

### 6. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793031637047,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":-0.2943588859571082,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 7. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 8. prueba_pendientes_faciles.py — OK

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

### 10. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 34, 'peor': 47, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 11. prueba_090.py — OK

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

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1667.jpg, faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, tf5_adelantado_marcos.jpg, tf5_barrera_alto.jpg, tf5_barrera_cerca.jpg, tf5_bionda_alto.jpg, tf5_bionda_cerca.jpg, tf5_casco_marcos.jpg, tf5_espinero_e_ojos.jpg, tf5_espinero_e_top.jpg, tf5_espinero_w_ojos.jpg, tf5_espinero_w_top.jpg, tf5_huc_rampa.jpg, tf5_huc_rampa_alto.jpg, tf5_oeste_junto_ojos.jpg, tf5_oeste_junto_top.jpg, tf5_oeste_ojos.jpg, tf5_oeste_top.jpg, tf5_sanbenito_ojos.jpg, tf5_sanbenito_top.jpg, tf5_sanlazaro_ojos.jpg, tf5_sanlazaro_top.jpg, tf5_vallado_alto.jpg, tf5_vallado_boca.jpg, tf5_vallado_tunel.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_7.jpg, trinidad_rampa_7_alto.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v090_basket.jpg, v090_basket_mate.jpg, v090_bencomo_titulo.jpg, v090_guanche_elegir.jpg, v090_guanche_mencey.jpg, v090_guanche_mirla.jpg, v090_guanche_pastor.jpg
