# Pruebas 1.4.10 — 2026-11-11 17:21 — 9/9 OK

Listas: cambios, version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 503 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 3 | `prueba_freno_mano.py` | **OK** | 154 s |
| 4 | `prueba_peralte.py` | **OK** | 0 s |
| 5 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 6 | `prueba_121.py` | **OK** | 0 s |
| 7 | `prueba_120.py` | **OK** | 0 s |
| 8 | `prueba_119.py` | **OK** | 0 s |
| 9 | `prueba_conduccion_tuneles_puentes.py` | **OK** (repetida aparte) | 243 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `scripts/publicar.log`, `src/06b_vmodels.js`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 99, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.2","punta":"187","maxV":"198","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -755 · Y 0 · 558 m"}
```

### 3. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 81, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 254, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 56, 'kmh_1s': 37, 'giro_1s_grados': 145, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 184, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 29, 'kmh_1s': 45, 'giro_1s_grados': 109, 'derrape_final': 0, 'kmh_3s': 61, 'giro_3s_grados': 171, 'derrape_max_grados': 29}
OK
```

### 4. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.56, 0.58, 0.56], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.59, 0.56, 0.58], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.58, 0.57, 0.6], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.55, 0.63, 0.57, 0.62], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.57, 0.58, 0.55, 0.67], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.55], 'dif': 0.01}
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

### 6. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC – Santa Cruz', 'trozos': 37, 'puntos': 588, 'eje': 3748, 'lado': 1, 'ramales': 19, 'tramosParalelos': 99}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 7. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 5, 'twins': 4, 'estrechadas': 2, 'misma_altura': 0, 'anchos': [[4, 4], [4, 4], [4.5, 4.5], [4, 4]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 8. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 15, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

### 9. prueba_conduccion_tuneles_puentes.py — OK (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 24.799999997019768
{"frame":564,"calls":1317,"triangles":5550759,"points":0,"lines":0} calls:1317
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_2899.jpg
