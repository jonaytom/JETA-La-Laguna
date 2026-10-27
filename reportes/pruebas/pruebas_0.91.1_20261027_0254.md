# Pruebas 0.91.1 — 2026-10-27 02:54 — 6/6 OK

Listas: v092. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 155 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_vallado.py` | **OK** | 71 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 30 s |
| 3 | `prueba_bordes.py` | **OK** | 2 s |
| 4 | `prueba_078.py` | **OK** | 21 s |
| 5 | `prueba_grandes.py` | **OK** | 12 s |
| 6 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. sonda_vallado.py — OK

```
calle {'ri': 68, 'tipo': 7, 'nombre': 'Camino el Vallado', 'ancho': 10.4, 'flags': 4, 'dep': True, 'raise': False, 'largo': 39, 'puntos': [[-925, 61, -6.8], [-931, 69, -7.5], [-936, 77, -7.5], [-942, 85, -7.5], [-947, 93, -6.8]]}
calle {'ri': 1640, 'tipo': 7, 'nombre': 'Camino el Vallado', 'ancho': 10.4, 'flags': 1, 'dep': True, 'raise': False, 'largo': 13, 'puntos': [[-956, 110, -3.9], [-954, 107, -4.5], [-953, 104, -5.1], [-951, 101, -5.6], [-950, 98, -6.1]]}
calle {'ri': 1769, 'tipo': 7, 'nombre': 'Camino el Vallado', 'ancho': 10.4, 'flags': 0, 'dep': True, 'raise': False, 'largo': 6, 'puntos': [[-947, 93, -6.8], [-948, 94, -6.7], [-949, 96, -6.5], [-950, 97, -6.3], [-950, 98, -6.1]]}
calle {'ri': 1787, 'tipo': 1, 'nombre': '', 'ancho': 7.8, 'flags': 1, 'dep': False, 'raise': False, 'largo': 63, 'puntos': [[-914, 72, 0], [-927, 63, 0], [-940, 54, 0], [-952, 44, 0], [-963, 33, 0]]}
calle {'ri': 2288, 'tipo': 0, 'nombre': 'Autopista del Norte', 'ancho': 13.4, 'flags': 1, 'dep': False, 'raise': False, 'largo': 1030, 'puntos': [[-793, 208, 0], [-986, 42, 0], [-1230, -40, 0], [-1476, -116, 0], [-1722, -193, 0]]}
calle {'ri': 2294, 'tipo': 1, 'nombre': '', 'ancho': 7.8, 'flags': 1, 'dep': False, 'raise': False, 'largo': 49, 'puntos': [[-914, 72, 0], [-923, 64, 0], [-932, 56, 0], [-930, 44, 0], [-922, 35, 0]]}
calle {'ri': 2375, 'tipo': 7, 'nombre': '', 'ancho': 10.4, 'flags': 1, 'dep': True, 'raise': False, 'largo': 52, 'puntos': [[-950, 98, -6.1], [-961, 105, -4], [-973, 111, -1.7], [-985, 115, 0], [-997, 114, 0]]}
calle {'ri': 2460, 'tipo': 0, 'nombre': 'Autopista del Norte', 'ancho': 13.4, 'flags': 1, 'dep': False, 'raise': False, 'largo': 361, 'puntos': [[-1130, 7, 0], [-1044, 35, 0], [-962, 71, 0], [-890, 125, 0], [-828, 191, 0]]}
calle {'ri': 2469, 'tipo': 1, 'nombre': '', 'ancho': 7.8, 'flags': 1, 'dep': False, 'raise': False, 'largo': 183, 'puntos': [[-991, 62, 0], [-953, 86, 0], [-916, 113, 0], [-883, 145, 0], [-851, 177, 0]]}
calle {'ri': 3054, 'tipo': 7, 'nombre': '', 'ancho': 10.4, 'flags': 1, 'dep': True, 'raise': False, 'largo': 42, 'puntos': [[-990, 125, 0], [-981, 120, 0], [-970, 120, -0.5], [-962, 116, -2], [-956, 110, -3.9]]}
foto vallado_cenital {'suelo': 6.8, 'base': 6.8}
foto vallado_cenital_amplia {'suelo': 6.4, 'base': 6.4}
foto vallado_desde_norte {'suelo': 8.1, 'base': 8.1}
foto vallado_desde_norte_ojos {'suelo': 7.3, 'base': 5.5}
foto vallado_desde_rotonda {'suelo': 9.2, 'base': 9.2}
foto vallado_desde_este {'suelo': 6.2, 'base': 6.2}
foto vallado_dentro {'suelo': 6.4, 'base': 6.4}
foto vallado_boca_sur {'suelo': 5.6, 'base': 5.6}
errores []
SONDA VALLADO OK
```

### 2. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"Vuelves a empezar"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 4. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6, "y": -8.5}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6, "y": -131.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6, "y": -128.9}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6, "y": -132.2}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6, "y": -132.8}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6, "y": 4.7}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6, "y": 4.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8, "y": 1.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8, "y": 3.1}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8, "y": 2.5}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220472441, "len": 1.5, "ancho": 3.8, "y": 3.7}, {"name": "Pasaje Teide", "cu
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

### 5. prueba_grandes.py — OK

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

### 6. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 34, 'peor': 66, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, vallado_boca_sur.jpg, vallado_cenital.jpg, vallado_cenital_amplia.jpg, vallado_dentro.jpg, vallado_desde_este.jpg, vallado_desde_norte.jpg, vallado_desde_norte_ojos.jpg, vallado_desde_rotonda.jpg
