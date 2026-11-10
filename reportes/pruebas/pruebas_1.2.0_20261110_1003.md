# Pruebas 1.2.0 — 2026-11-10 10:03 — 5/5 OK

Listas: v121b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 82 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_120.py` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py lora_av 200 1207 40 260 1120` | **OK** | 56 s |
| 3 | `herramientas/foto_vista.py lora_av2 240 1000 30 190 1100` | **OK** | 1 s |
| 4 | `herramientas/foto_vista.py pulpito -3192 -300 20 -3192 -400` | **OK** | 0 s |
| 5 | `herramientas/foto_vista.py pulpito2 -3100 -341 25 -3250 -341` | **OK** | 0 s |

## Detalle

### 1. prueba_120.py — OK

```
corredores {'unidas': [[1767, 2373, 3051, 1638, 52]], 'aceras': [4608, 4609, 4615], 'tramo': {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}, 'seguidas': 7, 'twins': 4, 'estrechadas': 7, 'misma_altura': 0, 'anchos': [[4.5, 8], [8, 8], [4.5, 4.5], [4.5, 4.5]], 'dif': 0, 'donde': None}
TRAMOS OK {'segs': 2023, 'walls': 2251, 'cuts': 151, 'floor': 48239, 'acera': 61, 'zonas': {'San Honorato': 62, 'San Lázaro': 1587, 'Lora Tamayo': 0, 'Los Rodeos': 374}, 'lineas': [[68, 'asphaltLines', 10.4, 4, [[0, 39, True]]], [2297, 'asphaltLines', 10.4, 0, [[0, 11, False], [11, 52, True]]], [1767, 'asphaltLines', 10.4, 0, [[0, 46, True], [46, 51, False]]]], 'gemelas': [[407, 703, 10.7], [703, 3510, 8.6], [2373, 3051, 9.9], [2512, 189, 11.1]]}
SAN_HONORATO OK
errores []
PRUEBA 120 OK
```

### 2. herramientas/foto_vista.py lora_av 200 1207 40 260 1120 — OK

```
FOTO VISTA OK lora_av
```

### 3. herramientas/foto_vista.py lora_av2 240 1000 30 190 1100 — OK

```
FOTO VISTA OK lora_av2
```

### 4. herramientas/foto_vista.py pulpito -3192 -300 20 -3192 -400 — OK

```
FOTO VISTA OK pulpito
```

### 5. herramientas/foto_vista.py pulpito2 -3100 -341 25 -3250 -341 — OK

```
FOTO VISTA OK pulpito2
```

Fotos/archivos nuevos en `tests/shots/`: vista_lora_av.jpg, vista_lora_av2.jpg, vista_pulpito.jpg, vista_pulpito2.jpg
