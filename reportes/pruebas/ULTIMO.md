# Pruebas 0.99.4 — 2026-10-27 20:38 — 2/2 OK

Listas: v0994. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 105 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0994.py` | **OK** | 70 s |
| 2 | `prueba_baloncesto.py` | **OK** | 16 s |

## Detalle

### 1. prueba_0994.py — OK

```
foto v0994_basket {'ready': True, 'drawn': 12}
JUGADORES DEL PACK OK
errores []
PRUEBA 0994 OK
```

### 2. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,0]}
PARTIDO CPU OK
partido fácil 1 [25, 0]
partido fácil 2 [17, 0]
partido fácil 3 [15, 3]
equilibrio primer partido [57, 3] OK
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

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, v0994_basket.jpg
