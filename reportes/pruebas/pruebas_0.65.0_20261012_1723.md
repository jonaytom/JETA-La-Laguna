# Pruebas 0.65.0 — 2026-10-12 17:23 — 0/1 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 131 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_baloncesto.py` | **FALLA** | 131 s |

## Detalle

### 1. prueba_baloncesto.py — FALLA

```
shot ms 58.0
{"frame":562,"calls":4573,"triangles":6667470,"points":0,"lines":1080} calls:4573
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 7], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,7]}
PARTIDO CPU OK
tras moverse 1
tras turbo 2
tras pasar 3
antes de recibir {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":"COCO","mode":"held","to":null,"ball":[21.26,7.81,0.99],"pl":[["YO",5.6,6.5,0,0,false],["COCO",20.94,7.76,0,0,false],["T1",17,6,0,0,false],["T2",19,10.5,0,0,false]],"inter":false,"ev":{},"phase":"play"}
pulsado {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":null,"mode":"pass","to":"YO","ball":[20.44,7.72,1.3],"pl":[["YO",5.6,6.5,0,0,false],["COCO",20.94,7.81,0,0,false],["T1",17,6,0,0,false],["T2",19,10.5,0,0,false]],"inter":false,"ev":{},"phase":"play"}
despues {"i":3,"prep":"catch","wait":-1.061650767297806e-15,"holder":null,"mode":"pass","to":"YO","ball":[9.97,6.86,1.3],"pl":[["YO",5.6,6.5,0,0,false],["COCO",20.91,10.5,0,0,false],["T1",17,6,0,0,false],["T2",19,10.5,0,0,false]],"inter":false,"ev":{},"phase":"play"}
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
