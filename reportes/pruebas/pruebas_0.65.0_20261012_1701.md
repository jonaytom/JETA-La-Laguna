# Pruebas 0.65.0 — 2026-10-12 17:01 — 4/8 OK

Listas: version, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 951 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_baloncesto.py` | **FALLA** | 129 s |
| 2 | `prueba_obispo.py` | **OK** | 126 s |
| 3 | `prueba_panel_controles.py` | **FALLA** | 135 s |
| 4 | `prueba_guardar_cargar.py` | **OK** | 58 s |
| 5 | `prueba_coche_y_boca.py` | **OK** | 60 s |
| 6 | `prueba_bordes.py` | **OK** | 123 s |
| 7 | `prueba_persecuciones.py` | **FALLA** | 157 s |
| 8 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** | 159 s |

## Detalle

### 1. prueba_baloncesto.py — FALLA

```
shot ms 4.100000001490116
{"frame":562,"calls":4432,"triangles":6602469,"points":0,"lines":1512} calls:4432
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [7, 9], 'clock': 0, 'golden': False}
resultado {"won":false,"score":[7,9]}
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

### 2. prueba_obispo.py — OK

```
shot ms 5.400000002235174
{"frame":562,"calls":4384,"triangles":6571467,"points":0,"lines":1080} calls:4384
info {'ok': True, 'front': [-40.11407764065768, -241.6640324858174], 'obispo': True, 'court': {'kind': 'bb', 'place': 'la cancha de Calle Pintor Cristino de Vera', 'dist': 220, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 27, 'pitches': 176}
snap obispado
activa Un partido por la Catedral
meta [-50.25,-461.5,6]
partido en marcha True
estado 1 None
errores JS []
OBISPO OK
```

Fotos/archivos nuevos en `tests/shots/`: obispado.jpg

### 3. prueba_panel_controles.py — FALLA

```
shot ms 3.199999999254942
{"frame":560,"calls":4549,"triangles":6549332,"points":0,"lines":1944} calls:4549
true
{"ph":"ready","b":"","pt":125}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"kick":true}
TECLAS FALLA
```

Fotos/archivos nuevos en `tests/shots/`: fightgo.png, ready.png

### 4. prueba_guardar_cargar.py — OK

```
shot ms 7065.699999999255
{"frame":564,"calls":4478,"triangles":6604205,"points":0,"lines":1296} calls:4478
saved {"v":1,"t":1791820369402,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":2,"story":3,"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 5. prueba_coche_y_boca.py — OK

```
shot ms 60.400000002235174
{"frame":562,"calls":4514,"triangles":6610807,"points":0,"lines":1512} calls:4514
{"modelo":"Guanche GT","t0a100":"3.1","punta":"190","maxV":"203","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -758   Z 0"}
```

### 6. prueba_bordes.py — OK

```
shot ms 6866.0
{"frame":562,"calls":4331,"triangles":6637267,"points":0,"lines":1512} calls:4331
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 7. prueba_persecuciones.py — FALLA

```
shot ms 4.5
{"frame":562,"calls":4640,"triangles":6621483,"points":0,"lines":1728} calls:4640
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.70 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.16 m OK
[10] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 4 m, recorre 16 m en 3 s, salto máx 0.35 m OK
[12] Grafiteros en el tranvía: SIN FLECHA
[13] La guagua de la broma: coche: a 1366 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES FALLA
```

### 8. prueba_conduccion_tuneles_puentes.py — FALLA

```
shot ms 2.199999999254942
{"frame":562,"calls":4457,"triangles":6550259,"points":0,"lines":1080} calls:4457
roads 99
FAIL {'off': 5.3, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 21, 'x': 543, 'z': -908, 'y': -0.3}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 502, 'time': 116.4, 'x': 44, 'z': 1157, 'y': -32.9}
snap df_1287
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 15, 'time': 55.4, 'x': -391, 'z': 671, 'y': -5.9}
snap df_2295
failed 3 of 99
CONDUCCION FALLA
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg
