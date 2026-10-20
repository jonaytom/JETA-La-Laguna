# Pruebas 0.84.0 — 2026-10-20 19:11 — 4/5 OK

Listas: v084a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 120 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_084.py` | **FALLA** | 69 s |
| 2 | `prueba_baloncesto.py` | **OK** | 16 s |
| 3 | `prueba_079.py` | **OK** | 7 s |
| 4 | `prueba_obispo.py` | **OK** | 6 s |
| 5 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_084.py — FALLA

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL 3']}
EQUIPOS OK
partido {'marcador': [12, 2], 'pases': 2, 'con_balon': ['EL CHOPA', 'EL MÁS ALTO', 'EL BLANCO', 'COCO'], 'marcas_distintas': True, 'movidos': [21.5, 11.2, 18.6, 16.5, 13.8, 15.9]}
foto v084_basket3x3
PARTIDO FALLA
errores []
PRUEBA 084 FALLA
```

### 2. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [7, 3], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[7,3]}
PARTIDO CPU OK
partido fácil 1 [19, 3]
partido fácil 2 [22, 2]
partido fácil 3 [27, 6]
equilibrio primer partido [68, 11] OK
jugadores dibujados 90
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"green":true,"shot":true},"mode":"air"}
foto basket_zoom
RATÓN OK
tras moverse 1
tras correr 2
tras pasar 3
tras recibir 4
tras tirar 5
tras combo 6
foto basket_tutorial
tutorial 99
TUTORIAL OK
cambio de defensor -> COCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 3. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.099, 'mano_izq': 0.053, 'angulo_antebrazo': 31}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.109, 'mano_izq': 0.054, 'angulo_antebrazo': 69}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 180, 'paradas': 0, 'marcador': [3, 2]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': True}
portero sale a por el balón {'portero_la_quita': True, 'frames': 63, 'gol': 0}
FUTBOL saque True palomitas True fuerza True regate True
foto v079_mate_m360_0
foto v079_mate_m360_1
foto v079_mate_m360_2
foto v079_mate_m360_3
foto v079_mate_molino_0
foto v079_mate_molino_1
foto v079_mate_molino_2
foto v079_mate_molino_3
foto v079_mate_espaldas_0
foto v079_mate_espaldas_1
foto v079_mate_espaldas_2
foto v079_mate_espaldas_3
foto v079_mate_piernas_0
foto v079_mate_piernas_1
foto v079_mate_piernas_2
foto v079_mate_piernas_3
mates {'m360': {'marcador': [2, 0]}, 'molino': {'marcador': [4, 0]}, 'espaldas': {'marcador': [6, 0]}, 'piernas': {'marcador': [8, 0]}}
pase largo {'altura_max': 3.42, 'recibe': True}
combos de la CPU buena {'combos_cpu': 13, 'marcador': [48, 27]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 4. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 36, 'pitches': 161}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-62.01256925391742,-424.7799316530283,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 5. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 44, 'peor': 74, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, obispado.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v084_basket3x3.jpg
