# Pruebas 0.70.0 — 2026-10-13 02:32 — 3/3 OK

Listas: repaso070. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 129 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 11 s |
| 2 | `prueba_pendientes_faciles.py` | **OK** | 98 s |
| 3 | `prueba_aeropuerto.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 28, 'peor': 150, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_pendientes_faciles.py — OK

```
lineas {'vias': 918, 'con_lineas': 79684, 'lisas': 24716, 'pct_lisas': 23.7}
aviones 17
aviones_en_via []
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
FACILES OK
```

### 3. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

Fotos/archivos nuevos en `tests/shots/`: faciles_aviones.jpg, faciles_cruce_brasil.jpg, faciles_plaza_sancristobal.jpg, faciles_rotonda_alto.jpg, faciles_telepisa.jpg
