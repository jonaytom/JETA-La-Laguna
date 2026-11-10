# Pruebas 1.2.8 — 2026-11-10 17:51 — 7/7 OK

Listas: calles129b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 64 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pico.py` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py pico_cenital -285 640 90 -285 639` | **OK** | 39 s |
| 3 | `herramientas/foto_vista.py pico_bajada -270 560 7 -295 650` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py tf5_sur1 2150 3700 160 2150 3699` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py tf5_sur2 2280 4080 160 2280 4079` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py tf5_sur3 2180 3560 25 2260 3800` | **OK** | 0 s |
| 7 | `prueba_121.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_pico.py — OK

```
pico {"pico": {"tip": [-292, 700], "lado": -1, "enCalzada": [22, 19], "ramp": 50, "end": [-268, 549, -5]}, "tranvia": [[-274, 585], [-281, 604], [-300, 658], [-305, 673], [-306, 679], [-307, 685], [-307, 691], [-307, 695], [-304, 700], [-302, 704], [-298, 709], [-294, 712], [-291, 715], [-286, 718], [-277, 721], [-269, 723], [-258, 725], [-208, 731], [-201, 731]]}
SONDA PICO OK
```

### 2. herramientas/foto_vista.py pico_cenital -285 640 90 -285 639 — OK

```
FOTO VISTA OK pico_cenital
```

### 3. herramientas/foto_vista.py pico_bajada -270 560 7 -295 650 — OK

```
FOTO VISTA OK pico_bajada
```

### 4. herramientas/foto_vista.py tf5_sur1 2150 3700 160 2150 3699 — OK

```
FOTO VISTA OK tf5_sur1
```

### 5. herramientas/foto_vista.py tf5_sur2 2280 4080 160 2280 4079 — OK

```
FOTO VISTA OK tf5_sur2
```

### 6. herramientas/foto_vista.py tf5_sur3 2180 3560 25 2260 3800 — OK

```
FOTO VISTA OK tf5_sur3
```

### 7. prueba_121.py — OK

```
autopista {'autopista': [{'tramo': 'Lora Tamayo – HUC – Santa Cruz', 'trozos': 37, 'puntos': 588, 'eje': 3748, 'lado': 1, 'ramales': 19, 'tramosParalelos': 99}], 'anchos': [13.4], 'n': 539, 'min': 14.6, 'p10': 14.8, 'p90': 15.8, 'max': 57.5}
TF5_RECTA OK
errores []
PRUEBA 121 OK
```

Fotos/archivos nuevos en `tests/shots/`: vista_pico_bajada.jpg, vista_pico_cenital.jpg, vista_tf5_sur1.jpg, vista_tf5_sur2.jpg, vista_tf5_sur3.jpg
