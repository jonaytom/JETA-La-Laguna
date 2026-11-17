# Pruebas 1.4.14 — 2026-11-16 19:28 — 11/11 OK

Listas: cambios, version, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 445 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 16 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 3 | `prueba_freno_mano.py` | **OK** | 291 s |
| 4 | `prueba_peralte.py` | **OK** | 0 s |
| 5 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 6 | `prueba_grandes.py` | **OK** | 14 s |
| 7 | `prueba_121.py` | **OK** | 0 s |
| 8 | `prueba_120.py` | **OK** | 0 s |
| 9 | `prueba_119.py` | **OK** | 0 s |
| 10 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 62 s |
| 11 | `herramientas/foto_propios.py` | **OK** | 20 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/publicar.log`, `src/07_vehicles.js`, `tests/herramientas/foto_propios.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 43, 'peor': 246, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.0","punta":"194","maxV":"207","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -755 · Y 0 · 558 m"}
```

### 3. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 82, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 257, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 60, 'kmh_1s': 36, 'giro_1s_grados': 155, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 187, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 29, 'kmh_1s': 45, 'giro_1s_grados': 109, 'derrape_final': 0, 'kmh_3s': 61, 'giro_3s_grados': 171, 'derrape_max_grados': 29}
OK
```

### 4. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.53, 0.55, 0.53], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.56, 0.53, 0.55], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.55, 0.54, 0.57], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.6, 0.55, 0.59], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.66], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.51, 0.52, 0.51, 0.52], 'dif': 0.01}
```

### 5. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 6. prueba_grandes.py — OK

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

### 7. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC – Santa Cruz', 'trozos': 37, 'puntos': 588, 'eje': 3748, 'lado': 1, 'ramales': 19, 'tramosParalelos': 99}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 8. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 5, 'twins': 4, 'estrechadas': 2, 'misma_altura': 0, 'anchos': [[4, 4], [4, 4], [4.5, 4.5], [4, 4]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 9. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 15, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

### 10. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 11. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12616, 'troceenC44': 12002, 'carlota': 11690, 'yaiza': 11338, 'trex': 11378, 'di55': 12012, 'jtm3': 12076, 'guancheGT': 12736, 'reniego': 11206, 'cartabon': 12610, 'tipoe': 12686, 'ltg': 12716, 'fierilla': 11154, 'piki': 11334, 'oalgo': 11368, 'gomera': 11354, 'teypan': 11296, 'chayan': 11714, 'olecorsa': 11354, 'mocco': 11682, 'tyaiza': 11608, 'helado': 11624, 'dsendero': 11802, 'beluga': 11234, 'vivita': 11184, 'newton3': 11076, 'cactus': 13534}
aparcados {'beluga': 204, 'tipoe': 125, 'helado': 507, 'olecorsa': 172, 'piki': 275, 'carlota': 194, 'gomera': 403, 'tyaiza': 450, 'vivita': 164, 'jtm3': 198, 'chayan': 64, 'di55': 119, 'mocco': 88, 'oalgo': 160, 'dsendero': 258, 'cartabon': 119, 'newton3': 183, 'yaiza': 122, 'cactus': 203, 'troceen': 279, 'troceenC44': 60, 'trex': 134, 'teypan': 71, 'ltg': 61, 'reniego': 112, 'fierilla': 18}
aparcado beluga
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, propios_aparcado.jpg, propios_beluga.jpg, propios_cactus.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_chayan.jpg, propios_conjunto.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_jtm3.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mocco.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_piki.jpg, propios_reniego.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_trex.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vivita.jpg, propios_yaiza.jpg
