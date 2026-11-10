# Pruebas 1.2.1 — 2026-11-10 10:34 — 4/4 OK

Listas: pico. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 84 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/foto_vista.py pico_alto -260 700 60 -320 700` | **OK** | 58 s |
| 2 | `herramientas/foto_vista.py pico_cenital -320 690 120 -320 689` | **OK** | 0 s |
| 3 | `herramientas/foto_vista.py pico_bajada -280 610 8 -300 700` | **OK** | 1 s |
| 4 | `herramientas/sonda_pico.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/foto_vista.py pico_alto -260 700 60 -320 700 — OK

```
FOTO VISTA OK pico_alto
```

### 2. herramientas/foto_vista.py pico_cenital -320 690 120 -320 689 — OK

```
FOTO VISTA OK pico_cenital
```

### 3. herramientas/foto_vista.py pico_bajada -280 610 8 -300 700 — OK

```
FOTO VISTA OK pico_bajada
```

### 4. herramientas/sonda_pico.py — OK

```
pico {"pico": {"tip": [-292, 700], "ramp": 50, "end": [-133, 730, -16]}, "tranvia": [[-274, 585], [-281, 604], [-300, 658], [-305, 673], [-306, 679], [-307, 685], [-307, 691], [-307, 695], [-304, 700], [-302, 704], [-298, 709], [-294, 712], [-291, 715], [-286, 718], [-277, 721], [-269, 723], [-258, 725], [-208, 731], [-201, 731]]}
SONDA PICO OK
```

Fotos/archivos nuevos en `tests/shots/`: vista_pico_alto.jpg, vista_pico_bajada.jpg, vista_pico_cenital.jpg
