# Pruebas 0.65.0 — 2026-10-12 17:10 — 1/3 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 377 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_baloncesto.py` | **FALLA** | 123 s |
| 2 | `prueba_panel_controles.py` | **OK** | 125 s |
| 3 | `prueba_persecuciones.py 12` | **FALLA** | 127 s |

## Detalle

### 1. prueba_baloncesto.py — FALLA

```
shot ms 3.5
{"frame":564,"calls":4455,"triangles":6591636,"points":0,"lines":1512} calls:4455
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 7], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,7]}
PARTIDO CPU OK
tras moverse 1
tras turbo 2
tras pasar 3
tras recibir 3
tras tirar 3
tras mate 3
foto basket_tutorial
tutorial 3
TUTORIAL FALLA
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO FALLA
```

Fotos/archivos nuevos en `tests/shots/`: basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg

### 2. prueba_panel_controles.py — OK

```
shot ms 2.0
{"frame":562,"calls":4626,"triangles":6609925,"points":0,"lines":1296} calls:4626
true
{"ph":"ready","b":"","pt":124}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

Fotos/archivos nuevos en `tests/shots/`: fightgo.png, ready.png

### 3. prueba_persecuciones.py 12 — FALLA

```
shot ms 3.5
{"frame":562,"calls":4526,"triangles":6598263,"points":0,"lines":1728} calls:4526
[12] Grafiteros en el tranvía: SIN FLECHA
PERSECUCIONES FALLA
```
