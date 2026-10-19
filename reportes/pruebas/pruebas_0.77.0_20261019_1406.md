# Pruebas 0.77.0 — 2026-10-19 14:06 — 6/6 OK

Listas: v078a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 148 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `audit_obstaculos.py` | **OK** | 0 s |
| 2 | `audit_cruces.py` | **OK** | 0 s |
| 3 | `audit_hundimiento.py` | **OK** | 0 s |
| 4 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 95 s |
| 5 | `prueba_grandes.py` | **OK** | 14 s |
| 6 | `herramientas/foto_desde_arriba.py vistas078.json` | **OK** | 20 s |

## Detalle

### 1. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 2. audit_cruces.py — OK

```
conflicts 24
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('service', 'service', 0, 2), 1)]
```

### 3. audit_hundimiento.py — OK

```
{"muestras":6396,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 4. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 5.2, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 543, 'z': -908, 'y': -0.3}
snap df_308
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 502, 'time': 116.4, 'x': 44, 'z': 1156, 'y': -32.9}
snap df_1287
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 8, 'time': 55.4, 'x': -387, 'z': 676, 'y': -7}
snap df_2295
failed 0 of 112 · conocidos 3
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 543 Z -908, Autopista del Norte X 44 Z 1156, Autopista del Norte X -387 Z 676
CONDUCCION OK
```

### 5. prueba_grandes.py — OK

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

### 6. herramientas/foto_desde_arriba.py vistas078.json — OK

```

```

Fotos/archivos nuevos en `tests/shots/`: ab_0.jpg, ab_1.jpg, ab_10.jpg, ab_11.jpg, ab_12.jpg, ab_13.jpg, ab_14.jpg, ab_15.jpg, ab_16.jpg, ab_17.jpg, ab_18.jpg, ab_19.jpg, ab_2.jpg, ab_3.jpg, ab_4.jpg, ab_5.jpg, ab_6.jpg, ab_7.jpg, ab_8.jpg, ab_9.jpg, audit_cruces.json, audit_obstaculos.json, conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, grandes_aeropuerto_depositos.jpg, grandes_aeropuerto_naves.jpg, grandes_aeropuerto_terminal.jpg, grandes_callejero_bencomo.jpg, grandes_guajara.jpg, grandes_obispado.jpg, grandes_tf13_alto.jpg, grandes_tf13_suelo.jpg, grandes_tranvia_alto.jpg, grandes_tranvia_cenital.jpg, grandes_tranvia_dentro.jpg, grandes_tranvia_trinchera.jpg
