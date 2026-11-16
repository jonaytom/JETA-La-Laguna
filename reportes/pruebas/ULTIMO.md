# Pruebas 1.4.14 — 2026-11-16 18:32 — 13/13 OK

Listas: cambios, version, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 379 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 1 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_bordes.py` | **OK** | 223 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 80 s |
| 5 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 6 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 7 | `prueba_freno_mano.py` | **OK** | 1 s |
| 8 | `prueba_peralte.py` | **OK** | 0 s |
| 9 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 10 | `prueba_121.py` | **OK** | 0 s |
| 11 | `prueba_120.py` | **OK** | 0 s |
| 12 | `prueba_119.py` | **OK** | 0 s |
| 13 | `herramientas/foto_propios.py` | **OK** | 32 s |

## Detalle

**Archivos cambiados desde la última tanda de pruebas** (eligen las pruebas): `build.py`, `data/kenney_cars.json`, `scripts/publicar.log`, `src/06b_vmodels.js`, `tests/herramientas/foto_propios.py`, `tools/trabajador.py`, `tools/web_testers.py`

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 36, 'peor': 180, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1794853576075,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"Misión: La firma de la banda"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":5.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
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

### 6. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":null,"punta":"0","maxV":"207","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X 119 · Y -642 · 547 m"}
```

### 7. prueba_freno_mano.py — OK

```
sin freno de mano {'derrape_1s': 0, 'kmh_1s': 52, 'giro_1s_grados': 82, 'derrape_final': 0, 'kmh_3s': 36, 'giro_3s_grados': 256, 'derrape_max_grados': 0}
con freno de mano {'derrape_1s': 56, 'kmh_1s': 37, 'giro_1s_grados': 145, 'derrape_final': 90, 'kmh_3s': 7, 'giro_3s_grados': 184, 'derrape_max_grados': 90}
toque de 0,5 s y suelta {'derrape_1s': 29, 'kmh_1s': 45, 'giro_1s_grados': 109, 'derrape_final': 0, 'kmh_3s': 61, 'giro_3s_grados': 171, 'derrape_max_grados': 29}
OK
```

### 8. prueba_peralte.py — OK

```
{'pendLat': '71%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.53, 0.55, 0.53], 'dif': 0.02}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.56, 0.53, 0.55], 'dif': 0.03}
{'pendLat': '67%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.55, 0.54, 0.57], 'dif': 0.05}
{'pendLat': '64%', 'ruedas_altura_eje_sobre_suelo': [0.52, 0.6, 0.55, 0.59], 'dif': 0.08}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.54, 0.55, 0.54, 0.66], 'dif': 0.12}
{'pendLat': '54%', 'ruedas_altura_eje_sobre_suelo': [0.51, 0.52, 0.51, 0.52], 'dif': 0.01}
```

### 9. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 1 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 2 {"st":"cutscene","dead":true,"car":true,"hp":-49}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 10. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC – Santa Cruz', 'trozos': 37, 'puntos': 588, 'eje': 3748, 'lado': 1, 'ramales': 19, 'tramosParalelos': 99}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

### 11. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 5, 'twins': 4, 'estrechadas': 2, 'misma_altura': 0, 'anchos': [[4, 4], [4, 4], [4.5, 4.5], [4, 4]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2256, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 12. prueba_119.py — OK

```
alturas {"tf5": {"mw": 9, "links": 8}, "sanLazaro": [["unclassified", 2, 0], ["motorway", 1, -6.5], ["motorway", 1, -6.5]], "salidaAerop": [["secondary", 2, 0], ["motorway", 1, -6]], "sempiterno": [["motorway", 1, -6.5], ["motorway", 1, -6.5]], "huc": [["service", 1, 0], ["service", 0, 0]], "arcos": 15, "err": null, "mwInfo": [[1264, true, -1938, -231, -1793, -199, false], [2286, true, -793, 208, -1722, -193, false], [2352, true, -2600, -204, -1938, -231, false], [2478, true, -1793, -199, -1130, 7, false], [2898, true, -1722, -193, -1822, -222, false], [2899, true, -1822, -222, -2652, -217, false], [4763, true, -3866, -298, -3076, -183, false], [4925, true, -3266, -192, -4295, -389, false], [5125, true, -2938, -204, -3266, -192, false]], "cerca": [[1264, 1, true, true, false, 12], [2286, 1, true, true, false, 81], [2478, 1, true, true, false, 58], [2898, 1, true, true, false, 9], [2899, 1, true, true, false, 65]]}
TRINCHERA_TF5 OK
RAMPA_HUC OK
SOPORTALES OK
errores []
PRUEBA 119 OK
```

### 13. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12616, 'troceenC44': 12002, 'carlota': 11690, 'yaiza': 11338, 'trex': 11378, 'di55': 12012, 'jtm3': 12076, 'guancheGT': 12736, 'reniego': 11206, 'cartabon': 12610, 'tipoe': 12686, 'ltg': 12716, 'fierilla': 11154, 'piki': 11334, 'oalgo': 11368, 'gomera': 11354, 'teypan': 11296, 'chayan': 11714, 'olecorsa': 11354, 'mocco': 11682, 'tyaiza': 11608, 'helado': 11624, 'dsendero': 11802, 'beluga': 11234, 'vivita': 11184, 'newton3': 11076, 'cactus': 13534, 'clip': 11628, 'nano': 11964, 'pimbo': 11360, 'torson': 11390, 'queguay': 11402, 'mphs': 11738, 'vengator': 11388, 'ficus': 12446, 'mepierdo': 11918, 'padelgti': 10808, 'pantera': 12200, 'hubli': 11572, 'reventon': 11532}
aparcados {'carlota': 197, 'mphs': 97, 'pantera': 104, 'mepierdo': 193, 'queguay': 182, 'tipoe': 160, 'dsendero': 263, 'troceenC44': 80, 'vivita': 161, 'jtm3': 191, 'pimbo': 164, 'padelgti': 93, 'olecorsa': 164, 'reniego': 139, 'torson': 181, 'cartabon': 117, 'clip': 219, 'beluga': 230, 'gomera': 386, 'newton3': 183, 'helado': 549, 'piki': 291, 'troceen': 290, 'ficus': 192, 'nano': 150, 'mocco': 85, 'tyaiza': 374, 'chayan': 78, 'cactus': 180, 'yaiza': 130, 'oalgo': 163, 'ltg': 77, 'di55': 104, 'trex': 124, 'vengator': 102, 'hubli': 66, 'teypan': 82, 'reventon': 9, 'fierilla': 11}
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, propios_beluga.jpg, propios_cactus.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_chayan.jpg, propios_clip.jpg, propios_conjunto.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_ficus.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_hubli.jpg, propios_jtm3.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mepierdo.jpg, propios_mocco.jpg, propios_mphs.jpg, propios_nano.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_padelgti.jpg, propios_pantera.jpg, propios_piki.jpg, propios_pimbo.jpg, propios_queguay.jpg, propios_reniego.jpg, propios_reventon.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_torson.jpg, propios_trex.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vengator.jpg, propios_vivita.jpg, propios_yaiza.jpg
