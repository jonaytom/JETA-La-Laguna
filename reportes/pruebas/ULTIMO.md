# Pruebas 0.65.1 — 2026-10-12 18:06 — 3/3 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 398 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_obispo.py` | **OK** | 131 s |
| 2 | `herramientas/foto_noche.py -42 -239 5` | **OK** | 133 s |
| 3 | `herramientas/foto_noche.py -42 -239 13` | **OK** | 134 s |

## Detalle

### 1. prueba_obispo.py — OK

```
shot ms 86.39999999850988
{"frame":560,"calls":4576,"triangles":6542075,"points":0,"lines":2160} calls:4576
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'place': 'la cancha de Calle Pintor Cristino de Vera', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 31, 'pitches': 176}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta [-50.25,-461.5,6]
partido en marcha True
estado 1 None
errores JS []
OBISPO OK
```

Fotos/archivos nuevos en `tests/shots/`: obispado.jpg

### 2. herramientas/foto_noche.py -42 -239 5 — OK

```
shot ms 65.70000000298023
{"frame":562,"calls":4447,"triangles":6624336,"points":0,"lines":1296} calls:4447
sin PIL: solo fotos
```

Fotos/archivos nuevos en `tests/shots/`: noche_1.jpg, noche_2.jpg

### 3. herramientas/foto_noche.py -42 -239 13 — OK

```
shot ms 53.0
{"frame":562,"calls":4441,"triangles":6549317,"points":0,"lines":1296} calls:4441
sin PIL: solo fotos
```

Fotos/archivos nuevos en `tests/shots/`: noche_1.jpg, noche_2.jpg
