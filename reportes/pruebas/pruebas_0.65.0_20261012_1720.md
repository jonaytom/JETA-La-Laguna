# Pruebas 0.65.0 — 2026-10-12 17:20 — 2/3 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 387 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_baloncesto.py` | **FALLA** | 130 s |
| 2 | `prueba_panel_controles.py` | **OK** | 136 s |
| 3 | `prueba_persecuciones.py 12` | **OK** | 120 s |

## Detalle

### 1. prueba_baloncesto.py — FALLA

```
shot ms 47.5
{"frame":562,"calls":4566,"triangles":6612699,"points":0,"lines":1728} calls:4566
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [0, 6], 'clock': 0, 'golden': False}
resultado {"won":false,"score":[0,6]}
PARTIDO CPU OK
tras moverse 1
tras turbo 2
tras pasar 3
antes de recibir {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":"COCO","mode":"held","to":null,"ev":{},"phase":"play"}
pulsado {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":null,"mode":"pass","to":"YO","ev":{},"phase":"play"}
despues {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":null,"mode":"pass","to":"YO","ev":{},"phase":"play"}
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
shot ms 3.699999999254942
{"frame":562,"calls":4355,"triangles":6569107,"points":0,"lines":1296} calls:4355
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

Fotos/archivos nuevos en `tests/shots/`: fightgo.png, ready.png

### 3. prueba_persecuciones.py 12 — OK

```
shot ms 3.399999998509884
{"frame":562,"calls":4387,"triangles":6565507,"points":0,"lines":864} calls:4387
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 15 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.17 m OK
PERSECUCIONES OK
```
