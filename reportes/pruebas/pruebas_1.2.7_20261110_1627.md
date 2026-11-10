# Pruebas 1.2.7 — 2026-11-10 16:27 — 4/4 OK

Listas: calles_estrechas. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 66 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_vias.py -15 217 40` | **OK** | 0 s |
| 2 | `herramientas/foto_vista.py barcelona_calle 20 205 4 -40 220` | **OK** | 42 s |
| 3 | `herramientas/foto_vista.py barcelona_alto -5 235 30 -15 217` | **OK** | 0 s |
| 4 | `herramientas/foto_vista.py casco_calle -60 -230 4 -10 -150` | **OK** | 1 s |

## Detalle

### 1. herramientas/sonda_vias.py -15 217 40 — OK

```
vías a menos de 40 m de X -15, Y 217 (puntos: X, Y, calzada − terreno)
{"ri": 3, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 4, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[16.8, 204.1, 0], [12.5, 205.5, 0], [6.2, 203.9, 0], [-53.1, 218.6, 0], [-77.5, 224.5, 0], [-83, 225.5, 0]]}
{"ri": 62, "nombre": "Calle La Sota", "tipo": "residential", "ancho": 4, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[-21, 343, 0], [-47.4, 223.1, 0]]}
{"ri": 1778, "nombre": "Calle Doctor Antonio Gonzalez", "tipo": "residential", "ancho": 7.5, "flags": 1, "hundida": false, "carriles": [1, -1, -1], "puntos": [[22.5, 212.5, 0], [25.5, 215.5, 0], [29, 234.5, 0], [30, 245.1, 0]]}
{"ri": 3331, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 10.4, "flags": 1, "hundida": false, "puntos": [[43.5, 211, 0], [33.5, 209.5, 0], [16.8, 204.1, 0]]}
{"ri": 3337, "nombre": "Calle Barcelona", "tipo": "tertiary", "ancho": 6.4, "flags": 1, "hundida": false, "carriles": [2, -1, 1], "puntos": [[-83, 225.5, 0], [-79, 230, 0], [-51.4, 223.8, 0], [-47.4, 223.1, 0], [8.4, 210.4, 0], [12, 210.3, 0], [18.5, 210.5, 0], [22.5, 212.5, 0]]}
SONDA VIAS OK
```

### 2. herramientas/foto_vista.py barcelona_calle 20 205 4 -40 220 — OK

```
FOTO VISTA OK barcelona_calle
```

### 3. herramientas/foto_vista.py barcelona_alto -5 235 30 -15 217 — OK

```
FOTO VISTA OK barcelona_alto
```

### 4. herramientas/foto_vista.py casco_calle -60 -230 4 -10 -150 — OK

```
FOTO VISTA OK casco_calle
```

Fotos/archivos nuevos en `tests/shots/`: vias_-15_217.txt, vista_barcelona_alto.jpg, vista_barcelona_calle.jpg, vista_casco_calle.jpg
