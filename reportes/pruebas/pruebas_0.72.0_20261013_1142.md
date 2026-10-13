# Pruebas 0.72.0 — 2026-10-13 11:42 — 3/5 OK

Listas: repaso072. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 498 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 6 s |
| 2 | `prueba_grandes.py` | **FALLA** (repetida aparte) | 139 s |
| 3 | `prueba_trinidad.py` | **OK** | 15 s |
| 4 | `prueba_bordes.py` | **OK** | 0 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 155 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 20, 'peor': 76, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_grandes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
GRANDES FALLA
--- repetida aparte:
shot ms 2.7999999970197678
{"frame":564,"calls":4124,"triangles":6694746,"points":0,"lines":1728} calls:4124
obispado {'vanos': 2, 'largo': 17, 'puerta': [-42, -237]}
tranvia {'prof_600': 6.4, 'prof_400': 0, 'cubierta': 1, 'punto': [-307, 682], 'bajo_suelo': None}
tf13 {'anillo_455': 0, 'tunel_876': 0, 'tf13_785_fin': 0, 'tf13_785_ini': 0}
aeropuerto {'rotonda': True, 'depositos': [-2340, 20], 'naves': ['SEURRO PAQUETERÍA', 'GUANCHAVÍA · HANGAR', 'ITV LOS RODEOS'], 'carteles_p': 3, 'valla_tramos': 1000}
callejero [['Calle Bencomo', True], ['Calle Juan de Vera', True], ['Calle Rodriguez Moure', True], ['Calle Ascanio y Nieves', True]]
avion {'despega': True, 'pasos': [[-1118, 0, True], [-1149, 0, True], [-1228, 0, True], [-1355, 0, True], [-1529, 0, True], [-1752, 0, True], [-2023, 26, True], [-2315, 70, True], [-2607, 114, True], [-2899, 157, True]]}
foto grandes_obispado
foto grandes_tranvia_trinchera
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
GRANDES FALLA
```

### 3. prueba_trinidad.py — OK

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

### 4. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
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
shot ms 2.2999999970197678
{"frame":562,"calls":4134,"triangles":6637098,"points":0,"lines":1944} calls:4134
roads 112
FAIL {'off': 0.9, 'dy': 0.2, 'col': False, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 111, 'time': 76.2, 'x': 443, 'z': -904, 'y': -2.1}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 499, 'time': 116.4, 'x': 43, 'z': 1155, 'y': -32.8}
snap df_1287
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 9, 'time': 55.4, 'x': -387, 'z': 676, 'y': -7}
snap df_2295
failed 3 of 112
CONDUCCION FALLA
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_1667.jpg, df_2295.jpg, df_308.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg, trinidad_pedrozerolo.jpg, trinidad_pedrozerolo_calle.jpg, trinidad_rampa_1.jpg, trinidad_rampa_1_alto.jpg, trinidad_rampa_2.jpg, trinidad_rampa_2_alto.jpg
