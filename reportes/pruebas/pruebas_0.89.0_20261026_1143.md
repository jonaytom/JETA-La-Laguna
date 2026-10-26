# Pruebas 0.89.0 — 2026-10-26 11:43 — 8/9 OK

Listas: v089. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 124 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_089.py` | **FALLA** | 63 s |
| 2 | `prueba_baloncesto.py` | **OK** | 15 s |
| 3 | `prueba_084.py` | **OK** | 0 s |
| 4 | `prueba_futbol.py` | **OK** | 7 s |
| 5 | `prueba_088.py` | **OK** | 0 s |
| 6 | `prueba_080.py` | **OK** | 2 s |
| 7 | `prueba_085.py` | **OK** | 2 s |
| 8 | `prueba_pelea_atras.py` | **OK** | 15 s |
| 9 | `prueba_arranque.py` | **OK** | 0 s |

## Detalle

### 1. prueba_089.py — FALLA

```
pausa basket True False
basket {'conBalon': True, 'ahora': ['COCO']}
ayuda {'moved': [3.9, 4.2, 4.1]}
combo fallado {'t': 2.7, 'vuela': True, 'miss': True, 'sc': 2, 'fase': 'score'}
futbol {'ctl': False, 'kickCD': 0, 'cd0': 0}
pausa máquina True False
foto v089_bencomo play
PAUSA OK
CONTROL BASKET FALLA
ENTRADA FUTBOL FALLA
BENCOMO OK
COMBO FALLADO FALLA
errores []
PRUEBA 089 FALLA
```

### 2. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [6, 4], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[6,4]}
PARTIDO CPU OK
partido fácil 1 [14, 6]
partido fácil 2 [26, 0]
partido fácil 3 [21, 4]
equilibrio primer partido [61, 10] OK
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
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 3. prueba_084.py — OK

```
equipos {'abre': True, 'n': 6, 't0': ['EL CHOPA', 'COCO', 'EL BLANCO'], 't1': ['EL MÁS ALTO', 'EL PIBE', 'EL LARGO']}
EQUIPOS OK
partido {'marcador': [13, 6], 'pases': 11, 'con_balon': ['EL CHOPA', 'EL MÁS ALTO', 'EL PIBE', 'COCO', 'EL BLANCO'], 'marcas_distintas': True, 'movidos': [20.1, 17.2, 11.7, 11.3, 19.1, 14.5]}
foto v084_basket3x3
PARTIDO OK
errores []
PRUEBA 084 OK
```

### 4. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [2, 0], 'golden': False}
resultado {"won":true,"score":[2,0]}
PARTIDO CPU OK
partido fácil 1 [8, 0]
partido fácil 2 [6, 0]
partido fácil 3 [7, 0]
equilibrio primer partido [21, 0] OK
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
campos {'campos': 73, 'puertas': 10, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 5. prueba_088.py — OK

```
partido {'ok': True, 'juega': True, 'n': 10, 'marcador': [0, 0]}
foto v088_futbol
PARTIDO OK
errores []
PRUEBA 088 OK
```

### 6. prueba_080.py — OK

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
movimientos {'anda': 160, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 277}
pogo {'pogo_mata': True, 'rebote': True}
agachado contra el perro {'agachado': True, 'perro_muerto': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 0, 'pasada': True, 'donde': [3193, 176, 199], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES OK
jefe {'empieza': 'speech', 'huye': True, 'fase': 3, 'arena': 240, 'dentro': True}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Subir a casa de El Blanco a jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1, 'luz': True}
foto v080_portal_blanco
BLANCO OK
foto v080_portal_adelantado
BLANCO OK
errores []
PRUEBA 080 OK
```

### 7. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '75aadb'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 10, 'nombres': ['BRASIL', 'URUGUAY'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

### 8. prueba_pelea_atras.py — OK

```
{"sep":133,"fase":"fight"}
sin ataque, atrás 1 s: se mueve 79.3 px
{"bloqueado":true,"vida":95}
snap pelea_tamano
```

### 9. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 29, 'peor': 33, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, futbol_partido.jpg, futbol_tutorial.jpg, pelea_tamano.jpg, v080_demo.jpg, v080_fase1.jpg, v080_portal_adelantado.jpg, v080_portal_blanco.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg, v084_basket3x3.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg, v088_futbol.png, v089_bencomo.jpg
