# Pruebas 0.78.1 — 2026-10-19 19:37 — 3/4 OK

Listas: v079a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 98 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_079.py` | **FALLA** | 60 s |
| 2 | `prueba_futbol.py` | **OK** | 6 s |
| 3 | `prueba_baloncesto.py` | **OK** | 14 s |
| 4 | `prueba_arranque.py` | **OK** | 0 s |

## Detalle

### 1. prueba_079.py — FALLA

```
rifle sin apuntar {'mano_dcha': 0.101, 'mano_izq': 0.046, 'angulo_antebrazo': 31}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.107, 'mano_izq': 0.055, 'angulo_antebrazo': 65}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 216, 'paradas': 7, 'marcador': [4, 1]}
tiro a tope de cerca {'D': 8, 'z_en_la_linea': 2.28, 'gol': False} de lejos {'D': 27, 'z_en_la_linea': 1.18, 'gol': True}
regate {'regate': True, 'sigue_con_balon': True}
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
combos de la CPU buena {'combos_cpu': 2, 'marcador': [33, 30]}
BASKET FALLA
foto v079_mapa_grande
errores []
PRUEBA 079 FALLA
```

### 2. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [1, 0], 'golden': False}
resultado {"won":true,"score":[1,0]}
PARTIDO CPU OK
partido fácil 1 [6, 0]
partido fácil 2 [3, 1]
partido fácil 3 [7, 1]
equilibrio primer partido [16, 2] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True}
RATÓN OK
campos {'campos': 79, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f66', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f66
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 3. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [10, 2], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[10,2]}
PARTIDO CPU OK
partido fácil 1 [26, 0]
partido fácil 2 [30, 7]
partido fácil 3 [19, 3]
equilibrio primer partido [75, 10] OK
jugadores dibujados 62
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

### 4. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 25, 'peor': 32, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, futbol_partido.jpg, futbol_tutorial.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg
