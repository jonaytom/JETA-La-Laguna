# Pruebas 0.70.0 — 2026-10-13 02:28 — 2/3 OK

Listas: repaso070. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 256 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 11 s |
| 2 | `prueba_pendientes_faciles.py` | **FALLA** (repetida aparte) | 126 s |
| 3 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 171, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_pendientes_faciles.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
FACILES FALLA
--- repetida aparte:
shot ms 2.600000001490116
{"frame":564,"calls":4247,"triangles":6585700,"points":0,"lines":1944} calls:4247
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via [[-3242, 125], [-3143, 164], [-3176, 150], [-3071, 191], [-3037, 204], [-3315, -7], [-2976, 225], [-2962, 232], [-3301, 103]]
telepisa_gran_tienda False
telepisa [-213, 440]
telepisa_edificio {'alto': 9.7, 'cx': -237, 'cz': 415}
edificios [[73, 234, 0], [-909, -408, 0], [1692, 4082, 0.6]]
recortados 4037
foto faciles_cruce_brasil
foto faciles_rotonda_alto
foto faciles_telepisa
foto faciles_plaza_sancristobal
foto faciles_aviones
errores JS []
FACILES FALLA
```

### 3. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg
