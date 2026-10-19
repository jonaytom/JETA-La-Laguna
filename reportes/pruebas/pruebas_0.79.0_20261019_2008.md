# Pruebas 0.79.0 — 2026-10-19 20:08 — 4/5 OK

Listas: v080a, v079a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 112 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_080.py` | **FALLA** | 64 s |
| 2 | `prueba_arranque.py` | **OK** | 0 s |
| 3 | `prueba_079.py` | **OK** | 8 s |
| 4 | `prueba_futbol.py` | **OK** | 6 s |
| 5 | `prueba_baloncesto.py` | **OK** | 14 s |

## Detalle

### 1. prueba_080.py — FALLA

```
abre True
foto v080_titulo
vista a los 9 s demo
foto v080_demo
vista a los 21 s scores
foto v080_records
modo play
foto v080_fase1
CICLO OK
movimientos {'anda': 156, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 287}
pogo {'pogo_mata': True, 'rebote': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.82, 'caidas': 43, 'pasada': False, 'donde': [2596, 188, 162], 'alturas': [-1, -1, -1, 5, 5, 5, 5, 3, 3]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3320, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES FALLA
jefe {'empieza': 'speech', 'huye': True, 'fase': 3}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Pedirle a El Blanco jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1}
BLANCO OK
errores []
PRUEBA 080 FALLA
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 51, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 3. prueba_079.py — OK

```
rifle sin apuntar {'mano_dcha': 0.102, 'mano_izq': 0.057, 'angulo_antebrazo': 36}
foto v079_rifle_llevar
rifle apuntando {'mano_dcha': 0.113, 'mano_izq': 0.062, 'angulo_antebrazo': 63}
foto v079_rifle_apuntar
foto v079_rifle_apuntar_lado
RIFLE OK
saque de centro {'saque': 'centro', 'dist_rival': 6}
palomitas {'frames_en_palomita': 252, 'paradas': 0, 'marcador': [3, 3]}
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
combos de la CPU buena {'combos_cpu': 8, 'marcador': [41, 28]}
BASKET OK
foto v079_mapa_grande
errores []
PRUEBA 079 OK
```

### 4. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [2, 0], 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [6, 0]
partido fácil 2 [5, 0]
partido fácil 3 [5, 0]
equilibrio primer partido [16, 0] OK
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

### 5. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [9, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[9,0]}
PARTIDO CPU OK
partido fácil 1 [26, 0]
partido fácil 2 [25, 0]
partido fácil 3 [30, 0]
equilibrio primer partido [81, 0] OK
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

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, futbol_partido.jpg, futbol_tutorial.jpg, v079_mapa_grande.jpg, v079_mate_espaldas_0.jpg, v079_mate_espaldas_1.jpg, v079_mate_espaldas_2.jpg, v079_mate_espaldas_3.jpg, v079_mate_m360_0.jpg, v079_mate_m360_1.jpg, v079_mate_m360_2.jpg, v079_mate_m360_3.jpg, v079_mate_molino_0.jpg, v079_mate_molino_1.jpg, v079_mate_molino_2.jpg, v079_mate_molino_3.jpg, v079_mate_piernas_0.jpg, v079_mate_piernas_1.jpg, v079_mate_piernas_2.jpg, v079_mate_piernas_3.jpg, v079_rifle_apuntar.jpg, v079_rifle_apuntar_lado.jpg, v079_rifle_llevar.jpg, v080_demo.jpg, v080_fase1.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg
