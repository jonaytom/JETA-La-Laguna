# Pruebas 1.4.50 — 2026-11-25 14:38 — 0/1 OK

Listas: tmp_s. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 754 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** (repetida aparte) | 378 s |

## Detalle

### 1. prueba_conduccion_tuneles_puentes.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
CONDUCCION FALLA
--- repetida aparte:
shot ms 55.400000005960464
{"frame":1382,"calls":956,"triangles":11319253,"points":0,"lines":0} calls:956
roads 133
FAIL {'off': 6.8, 'dy': 6.6, 'col': True, 'low': False, 'ri': 307, 't': 9, 'name': '', 'L': 50, 'done': False, 'left': 45, 'time': 5.7, 'x': -1224, 'z': -7, 'y': 17.9}
snap df_307
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 2244, 't': 0, 'name': 'Autopista del Norte', 'L': 1030, 'done': False, 'left': 138, 'time': 143.7, 'x': -1590, 'z': -151, 'y': 23.4}
snap df_2244
failed 2 of 133 · conocidos 0
CONDUCCION FALLA
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_2244.jpg, df_307.jpg
