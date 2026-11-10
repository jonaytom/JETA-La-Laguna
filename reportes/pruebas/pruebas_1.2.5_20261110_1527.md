# Pruebas 1.2.5 — 2026-11-10 15:27 — 9/9 OK

Listas: obstaculos. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 81 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_choque.py -754 -362 1.5` | **OK** | 0 s |
| 2 | `herramientas/sonda_choque.py -776 -352 1.5` | **OK** | 0 s |
| 3 | `herramientas/sonda_choque.py -768 -385 3` | **OK** | 0 s |
| 4 | `herramientas/sonda_choque.py -772 -353 1.5` | **OK** | 55 s |
| 5 | `herramientas/sonda_choque.py -3018 -49 6` | **OK** | 0 s |
| 6 | `herramientas/foto_vista.py obst_adelantado -745 -370 8 -754 -362` | **OK** | 1 s |
| 7 | `herramientas/foto_vista.py obst_celada -768 -345 8 -776 -352` | **OK** | 0 s |
| 8 | `herramientas/foto_vista.py obst_teobaldo -760 -392 8 -768 -385` | **OK** | 0 s |
| 9 | `herramientas/foto_vista.py obst_servicio -3010 -60 8 -3018 -49` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_choque.py -754 -362 1.5 — OK

```
segmentos de choque: 0
círculos de choque: 1
   {'id': 22340, 'x': -754, 'z': -362.5, 'r': 0.4, 'dist': 0.1, 'y': [5.7, 10.1]}
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-754, -361.9]}, {'rumbo': 23, 'frena': [-753.96, -361.91]}, {'rumbo': 45, 'frena': [-753.93, -361.93]}, {'rumbo': 68, 'frena': [-753.91, -361.96]}, {'rumbo': 90, 'frena': [-753.9, -362]}, {'rumbo': 113, 'frena': [-753.91, -362.04]}, {'rumbo': 135, 'frena': [-753.93, -362.07]}, {'rumbo': 158, 'frena': [-753.96, -362.09]}, {'rumbo': 180, 'frena': [-754, -362.1]}, {'rumbo': 202, 'frena': [-754.04, -362.09]}, {'rumbo': 225, 'frena': [-754.07, -362.07]}, {'rumbo': 247, 'frena': [-754.09, -362.04]}, {'rumbo': 270, 'frena': [-754.1, -362]}, {'rumbo': 293, 'frena': [-754.09, -361.96]}, {'rumbo': 315, 'frena': [-754.07, -361.93]}, {'rumbo': 337, 'frena': [-754.04, -361.91]}]
SONDA CHOQUE OK
```

### 2. herramientas/sonda_choque.py -776 -352 1.5 — OK

```
segmentos de choque: 0
círculos de choque: 1
   {'id': 256, 'x': -776, 'z': -352.4, 'r': 0.12, 'dist': 0.28, 'y': [7.2, 11.6]}
andando desde el punto, frena en: [{'rumbo': 90, 'frena': [-775.9, -352]}, {'rumbo': 113, 'frena': [-775.91, -352.04]}, {'rumbo': 135, 'frena': [-775.93, -352.07]}, {'rumbo': 158, 'frena': [-775.96, -352.09]}, {'rumbo': 180, 'frena': [-776, -352.1]}, {'rumbo': 202, 'frena': [-776.04, -352.09]}, {'rumbo': 225, 'frena': [-776.07, -352.07]}, {'rumbo': 247, 'frena': [-776.09, -352.04]}, {'rumbo': 270, 'frena': [-776.1, -352]}]
SONDA CHOQUE OK
```

### 3. herramientas/sonda_choque.py -768 -385 3 — OK

```
segmentos de choque: 0
círculos de choque: 3
   {'id': 259, 'x': -767.49, 'z': -383.47, 'r': 0.8, 'dist': 0.81, 'y': [5.5, 9.9]}
   {'id': 260, 'x': -768.07, 'z': -385.68, 'r': 0.8, 'dist': -0.12, 'y': [5.5, 9.9]}
   {'id': 261, 'x': -768.63, 'z': -387.86, 'r': 0.8, 'dist': 2.13, 'y': [5.4, 9.8]}
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-768, -384.9]}, {'rumbo': 23, 'frena': [-767.96, -384.91]}, {'rumbo': 45, 'frena': [-767.93, -384.93]}, {'rumbo': 68, 'frena': [-767.91, -384.96]}, {'rumbo': 90, 'frena': [-767.9, -385]}, {'rumbo': 113, 'frena': [-767.91, -385.04]}, {'rumbo': 135, 'frena': [-767.93, -385.07]}, {'rumbo': 158, 'frena': [-767.96, -385.09]}, {'rumbo': 180, 'frena': [-768, -385.1]}, {'rumbo': 202, 'frena': [-768.04, -385.09]}, {'rumbo': 225, 'frena': [-768.07, -385.07]}, {'rumbo': 247, 'frena': [-768.09, -385.04]}, {'rumbo': 270, 'frena': [-768.1, -385]}, {'rumbo': 293, 'frena': [-768.09, -384.96]}, {'rumbo': 315, 'frena': [-768.07, -384.93]}, {'rumbo': 337, 'frena': [-768.04, -384.91]}]
SONDA CHOQUE OK
```

### 4. herramientas/sonda_choque.py -772 -353 1.5 — OK

```
segmentos de choque: 0
círculos de choque: 1
   {'id': 255, 'x': -772, 'z': -352.6, 'r': 1, 'dist': -0.6, 'y': [7, 11.4]}
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-772, -352.9]}, {'rumbo': 23, 'frena': [-771.96, -352.91]}, {'rumbo': 45, 'frena': [-771.93, -352.93]}, {'rumbo': 68, 'frena': [-771.91, -352.96]}, {'rumbo': 90, 'frena': [-771.9, -353]}, {'rumbo': 113, 'frena': [-771.91, -353.04]}, {'rumbo': 135, 'frena': [-771.93, -353.07]}, {'rumbo': 158, 'frena': [-771.96, -353.09]}, {'rumbo': 180, 'frena': [-772, -353.1]}, {'rumbo': 202, 'frena': [-772.04, -353.09]}, {'rumbo': 225, 'frena': [-772.07, -353.07]}, {'rumbo': 247, 'frena': [-772.09, -353.04]}, {'rumbo': 270, 'frena': [-772.1, -353]}, {'rumbo': 293, 'frena': [-772.09, -352.96]}, {'rumbo': 315, 'frena': [-772.07, -352.93]}, {'rumbo': 337, 'frena': [-772.04, -352.91]}]
SONDA CHOQUE OK
```

### 5. herramientas/sonda_choque.py -3018 -49 6 — OK

```
segmentos de choque: 1
   {'id': 41562, 'de': [-3034.26, -59.29], 'a': [-2960.17, -31.64], 'largo': 79.08, 'dist': 3.96, 'y': [-1000000000, 1000000000], 'suelo': 71.2}
círculos de choque: 2
   {'id': 266, 'x': -3012.06, 'z': -47.28, 'r': 0.4, 'dist': 5.79, 'y': [69.6, 74]}
   {'id': 267, 'x': -3023.29, 'z': -51.49, 'r': 0.4, 'dist': 5.45, 'y': [70.6, 75]}
andando desde el punto, frena en: [{'rumbo': 0, 'frena': [-3018, -42.6]}, {'rumbo': 68, 'frena': [-3012.36, -46.67]}, {'rumbo': 113, 'frena': [-3013.01, -51.07]}, {'rumbo': 135, 'frena': [-3015.1, -51.9]}, {'rumbo': 158, 'frena': [-3016.58, -52.42]}, {'rumbo': 180, 'frena': [-3018, -53]}, {'rumbo': 202, 'frena': [-3019.95, -53.71]}, {'rumbo': 247, 'frena': [-3022.9, -51.03]}, {'rumbo': 315, 'frena': [-3022.67, -44.33]}, {'rumbo': 337, 'frena': [-3020.3, -43.46]}]
SONDA CHOQUE OK
```

### 6. herramientas/foto_vista.py obst_adelantado -745 -370 8 -754 -362 — OK

```
FOTO VISTA OK obst_adelantado
```

### 7. herramientas/foto_vista.py obst_celada -768 -345 8 -776 -352 — OK

```
FOTO VISTA OK obst_celada
```

### 8. herramientas/foto_vista.py obst_teobaldo -760 -392 8 -768 -385 — OK

```
FOTO VISTA OK obst_teobaldo
```

### 9. herramientas/foto_vista.py obst_servicio -3010 -60 8 -3018 -49 — OK

```
FOTO VISTA OK obst_servicio
```

Fotos/archivos nuevos en `tests/shots/`: vista_obst_adelantado.jpg, vista_obst_celada.jpg, vista_obst_servicio.jpg, vista_obst_teobaldo.jpg
