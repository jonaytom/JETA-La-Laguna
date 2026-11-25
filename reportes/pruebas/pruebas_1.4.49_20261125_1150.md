# Pruebas 1.4.49 — 2026-11-25 11:50 — 4/4 OK

Listas: tmp_geneto. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 22 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calles_en.py -321 1000 8` | **OK** | 0 s |
| 2 | `herramientas/sonda_calles_en.py -322 1040 8` | **OK** | 0 s |
| 3 | `herramientas/foto_puntos.py herramientas/geneto_pts.json` | **OK** | 0 s |
| 4 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_calles_en.py -321 1000 8 — OK

```
CALLE {'ri': 5563, 'tipo': 5, 'nombre': 'Carretera de San Miguel de Geneto', 'ancho': 10, 'wMax': 11.7, 'wMin': 10, 'swMin': 0, 'flags': 0, 'dist': 0.3, 'desde': [-342, 797], 'puntos': 8}
```

### 2. herramientas/sonda_calles_en.py -322 1040 8 — OK

```
CALLE {'ri': 1772, 'tipo': 5, 'nombre': 'Carretera de San Miguel de Geneto', 'ancho': 6.5, 'wMax': 11.7, 'wMin': 6.5, 'swMin': 0, 'flags': 0, 'dist': 0.1, 'desde': [-321, 1012], 'puntos': 64}
```

### 3. herramientas/foto_puntos.py herramientas/geneto_pts.json — OK

```

```

### 4. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

Fotos/archivos nuevos en `tests/shots/`: in_0.jpg, in_1.jpg
