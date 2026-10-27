# Pruebas 0.96.2 — 2026-10-27 12:06 — 3/4 OK

Listas: v0962. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 92 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0962.py` | **FALLA** | 0 s |
| 2 | `prueba_095.py` | **OK** | 64 s |
| 3 | `prueba_futbol.py` | **OK** | 7 s |
| 4 | `prueba_085.py` | **OK** | 1 s |

## Detalle

### 1. prueba_0962.py — FALLA

```
saque del portero {'caso': 'libre', 'a': 'cercano', 'alto': 0.06}
saque del portero {'caso': 'tapado', 'a': 'cercano', 'alto': 1.19}
SAQUE AL CERCANO (RASO O BOMBEADO) FALLA
errores []
PRUEBA 0962 FALLA
```

### 2. prueba_095.py — OK

```
jugadores {'n': 12, 't0': 6, 'ys': [68.8, 53, 53, 39, 35.6, 39, 1.2, 17, 17, 31, 33.5, 31]}
cambio en defensa {'ctl': 'delante', 'db': '3.41', 'df': '4.19'}
foto v095_futbol
foto v095_bencomo_picado
foto v095_bencomo_golpebajo
SEIS POR EQUIPO OK
CAMBIO EN DEFENSA OK
errores []
PRUEBA 095 OK
```

### 3. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'end', 'sc': [0, 2], 'golden': False}
resultado {"won":false,"score":[0,2]}
PARTIDO CPU OK
partido fácil 1 [7, 0]
partido fácil 2 [6, 2]
partido fácil 3 [8, 0]
equilibrio primer partido [21, 2] OK
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

### 4. prueba_085.py — OK

```
consola {'hay': True, 'modo': 'ext', 'abierta': True, 'vista': 'pick', 'estado': 'arcade'}
foto v086_elige
selecciones {'b': [['ESP', 0.72], ['USA', 0.78], ['SRB', 0.7], ['FRA', 0.68], ['LTU', 0.64], ['ARG', 0.64], ['ALE', 0.66], ['ITA', 0.6]], 'f': [['ESP', 0.72], ['BRA', 0.7], ['ARG', 0.71], ['ITA', 0.62], ['ALE', 0.66], ['FRA', 0.7], ['POR', 0.66], ['URU', 0.6]]}
ELIGE OK
foto v086_cuadro
cuadro {'sel': 0, 'vista': 'round', 'yo': 'ESPAÑA'} partido {'espera': True, 'abierta': True, 'juega': True, 'n': 6, 'mia': 'c8102e', 'rival': '1f5fbf'} equipaciones {'uru': '#f2f2f2', 'choques': []}
PARTIDO OK
rondas [{'v': 'result', 'r': 0, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'round', 'r': 1}, {'v': 'result', 'r': 1, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}, {'v': 'result', 'r': 2, 'espera': False, 'estado': 'arcade', 'pausa': 'none'}]
foto v086_resultado
foto v086_campeones
foto v086_tabla
campeón {'v1': 'champ'} {'v2': 'name', 'v3': 'table', 'tabla': ['JNY', 'ESPAÑA', 1], 'ganados': 1}
CAMPEON OK
furbito {'m1': 'menu', 'juega': True, 'n': 12, 'nombres': ['BRASIL', 'FRANCIA'], 'espera': True}
foto v086_furbito
eliminados {'v': 'result', 'gano': False, 'luego': 'pick', 'estado': 'arcade'}
FURBITO OK
juguetería {'vende': True} {'torneo': True, 'todos': 5} ¡SUPERFRIKI JUGÓN!
SUPERFRIKI OK
errores []
PRUEBA 085 OK
```

Fotos/archivos nuevos en `tests/shots/`: futbol_partido.jpg, futbol_tutorial.jpg, v086_campeones.jpg, v086_cuadro.jpg, v086_elige.jpg, v086_furbito.jpg, v086_resultado.jpg, v086_tabla.jpg, v095_bencomo_golpebajo.jpg, v095_bencomo_picado.jpg, v095_futbol.jpg
