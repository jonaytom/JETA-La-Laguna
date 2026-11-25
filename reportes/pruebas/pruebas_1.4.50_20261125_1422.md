# Pruebas 1.4.50 — 2026-11-25 14:22 — 1/2 OK

Listas: tmp_s. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 802 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_suelo_en.py -1228 -12 12` | **OK** | 0 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 411 s |

## Detalle

### 1. herramientas/sonda_suelo_en.py -1228 -12 12 — OK

```
SUELO [-1228.0, -12.0, 12.0] {"terreno":17.55,"asfalto":17.802523044867648,"tablero":-1000000000,"terrazas":[],"cerca":[]}
```

### 2. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 68.30000001192093
{"frame":1384,"calls":967,"triangles":11464192,"points":0,"lines":0} calls:967
roads 133
FAIL {'off': 6.7, 'dy': 6.6, 'col': True, 'low': False, 'ri': 307, 't': 9, 'name': '', 'L': 50, 'done': False, 'left': 44, 'time': 5.7, 'x': -1224, 'z': -7, 'y': 18}
snap df_307
failed 1 of 133 · conocidos 0
CONDUCCION FALLA
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_307.jpg
