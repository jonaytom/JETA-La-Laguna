# Pruebas 0.78.0 — 2026-10-19 15:31 — 3/3 OK

Listas: v078o. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 108 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_076.py` | **OK** | 91 s |
| 2 | `herramientas/sonda_perfil.py 2105 3469 2140 3508` | **OK** | 0 s |
| 3 | `herramientas/sonda_conduccion.py 3521` | **OK** | 0 s |

## Detalle

### 1. prueba_076.py — OK

```
rifle {'diag': {'h': 0, 'yaw': 0, 'jugador': [-758, -364], 'fuego': [-758, -356.5], 'gota_v': [-0.1, -3, 12], 'charcos': [[-0.2, 6.6]], 'apuntando': False, 'mano': [-0.26, 7.91, -0.1]}, 'gotas': 12, 'charcos': 1, 'fuego_apagado': True, 'agua': [100, 93], 'hud': 'RIFLE DE AGUA 95%\nTAB / 1: puños'}
foto v076_rifle
armas {'ciclo': ['pistola', 'rifle', 'puños', 'pistola'], 'fuentes': 40, 'lleno': 100, 'jugueterias': ['Juguetes Sabelotodo', 'Juguetes Baobabito', 'Juguetería Lífer', 'Juguetes Somos'], 'cerrada': '', 'abierta': '<kbd>E</kbd> Entrar: Juguetes Sabelotodo (juguetería)'}
mojado {'persigue': True, 'pelea': True}
maleantes {'habla': True, 'linea': 'Sastrón (por el móvil): Chopa, ahora que sabes repartir, te cuento un ', 'visto': True}
misión del rifle en la historia 18
blanco 1 {'act': 'El rifle de agua', 'jug': True, 'goal': [-621.1913417161826, -300.4619397662556, 2.2]}
blanco 2 {'paso': 6, 'diana': True}
foto v076_boca_papa
blanco fin {'act': None, 'rifleTut': True}
misiones {'secreta': ['Tostón, de la Secreta', 'Contenedores en llamas', 'El partido amañado', 'Triple en la cancha', 'Al pirómano, agua', 'Operación Gofio Blanco'], 'carreras': ['Duelo nocturno en Los Rodeos', 'Contrarreloj por el casco', 'Gran Premio de La Laguna'], 'obispo': ['Un partido por la Catedral', 'El torneo de la parroquia', 'Un partido por La Concepción', 'El clásico de las cofradías', 'Fuego en la ermita', 'La carrera de los sacristanes', 'Curas contra concejales', 'El ladrón del cepillo'], 'tostón': [1250, 1524]}
foto v076_secreta
  empieza ['secreta', 0, 'Tostón, de la Secreta', 'Tostón, de la Secreta', True]
  empieza ['secreta', 1, 'Contenedores en llamas', 'Contenedores en llamas', True]
  empieza ['secreta', 2, 'El partido amañado', 'El partido amañado', True]
  empieza ['secreta', 3, 'Triple en la cancha', 'Triple en la cancha', True]
  empieza ['secreta', 4, 'Al pirómano, agua', 'Al pirómano, agua', True]
  empieza ['secreta', 5, 'Operación Gofio Blanco', 'Operación Gofio Blanco', True]
  empieza ['carreras', 0, 'Duelo nocturno en Los Rodeos', 'Duelo nocturno en Los Rodeos', True]
  empieza ['carreras', 1, 'Contrarreloj por el casco', 'Contrarreloj por el casco', True]
  empieza ['carreras', 2, 'Gran Premio de La Laguna', 'Gran Premio de La Laguna', True]
  empieza ['obispo', 4, 'Fuego en la ermita', 'Fuego en la ermita', True]
  empieza ['obispo', 5, 'La carrera de los sacristanes', 'La carrera de los sacristanes', True]
  empieza ['obispo', 6, 'Curas contra concejales', 'Curas contra concejales', True]
  empieza ['obispo', 7, 'El ladrón del cepillo', 'El ladrón del cepillo', True]
parkings [{'trinidad_tramos': 7, 'largo': 439, 'fondo': ['-14.2', '-13.2']}, {'sala': 'Parking del Cristo', 'frena': 1, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}, {'sala': 'Parking Trinidad', 'frena': 2, 'de': 12}]
foto v076_cristo_escalera_abajo
foto v076_trinidad_parking
Ríos Tejera [-1513, -587]
foto v076_rios_tejera
foto v076_trinchera_campus
foto v076_rampa_cristo
errores JS []
V076 OK
```

### 2. herramientas/sonda_perfil.py 2105 3469 2140 3508 — OK

```
tableros en el camino: {"1260": {"desde_m": 1, "nombre": "Calle San Camilo", "tipo": 6, "flags": 1, "elevada": true, "extremos": [[2153, 3424], [2097, 3502]]}, "1306": {"desde_m": 0, "nombre": "Autopista del Norte", "tipo": 0, "flags": 3, "elevada": true, "extremos": [[2110, 3465], [2161, 3524]]}, "2360": {"desde_m": 0, "nombre": "Autopista del Norte", "tipo": 0, "flags": 1, "elevada": true, "extremos": [[2063, 3415], [2110, 3465]]}, "2873": {"desde_m": 48, "nombre": "", "tipo": 1, "flags": 3, "elevada": true, "extremos": [[2130, 3507], [2161, 3524]]}, "3521": {"desde_m": 0, "nombre": "", "tipo": 1, "flags": 3, "elevada": true, "extremos": [[2105, 3469], [2138, 3509]]}, "3522": {"desde_m": 0, "nombre": "", "tipo": 1, "flags": 1, "elevada": true, "extremos": [[2084, 3446], [2105, 3469]]}}
muestras 106 escalones >0,3 m: [[10, -218.06, None, None, -0.43], [46.9, -220.83, -217.94, None, 2.74], [47.4, -220.87, -218.25, None, -0.31], [51.9, -221.17, None, None, -0.5]]
   [0, -217.38, None, None, 0]
   [2, -217.51, -217.56, None, -0.03]
   [4, -217.64, -217.54, None, -0.03]
   [6, -217.77, -217.53, None, 0]
   [8, -217.91, -217.52, None, 0]
   [10, -218.06, None, None, -0.43]
   [12, -218.21, None, None, -0.04]
   [14, -218.36, None, None, -0.04]
   [16, -218.51, None, None, -0.04]
   [18, -218.65, None, None, -0.04]
   [20, -218.8, None, None, -0.04]
   [22, -218.96, None, None, -0.04]
   [24, -219.11, None, None, -0.04]
   [26, -219.25, None, None, -0.04]
   [27.9, -219.39, None, None, -0.04]
   [29.9, -219.53, None, None, -0.04]
   [31.9, -219.69, None, None, -0.04]
   [33.9, -219.85, None, None, -0.04]
   [35.9, -220.01, None, None, -0.04]
   [37.9, -220.16, None, None, -0.04]
   [39.9, -220.31, None, None, -0.04]
   [41.9, -220.46, None, None, -0.04]
   [43.9, -220.61, None, None, -0.04]
   [45.9, -220.76, None, None, -0.04]
   [47.9, -220.9, -218.54, None, -0.29]
   [49.9, -221.03, -219.68, None, -0.29]
   [51.9, -221.17, None, None, -0.5]
```

### 3. herramientas/sonda_conduccion.py 3521 — OK

```
== {"off": 0, "dy": 0.7, "col": false, "low": false, "ri": 3521, "t": 1, "name": "", "L": 52, "done": false, "left": 8, "time": 9.1, "x": 2133, "z": 3502, "y": -214.8, "salto": [0.42, 2132, 3502]}
   ruta [[2105, 3469], [2138, 3509]]
    [0, 2105, 3469, -211.9, 0.2, 1, 0, 0]
    [1, 2107, 3472, -212, 6.5, 1, 0, 0]
    [2, 2113, 3479, -212.4, 12.5, 1, 0, 0]
    [3, 2122, 3489, -212.8, 13, 1, 0, 0]
    [4, 2130, 3499, -214.3, 13, 1, 0, 0]
    [5, 2133, 3502, -214.8, 2.3, 1, 0, 0]
    [6, 2133, 3502, -214.8, 0, 1, 0, 0]
    [7, 2133, 3502, -214.8, 0, 1, 0, 0]
    [8, 2133, 3502, -214.8, 0, 1, 0, 0]
    [9, 2133, 3502, -214.8, 0, 1, 0, 0]
```

Fotos/archivos nuevos en `tests/shots/`: v076_boca_papa.jpg, v076_cristo_escalera_abajo.jpg, v076_rampa_cristo.jpg, v076_rifle.jpg, v076_rios_tejera.jpg, v076_secreta.jpg, v076_trinchera_campus.jpg, v076_trinidad_parking.jpg
