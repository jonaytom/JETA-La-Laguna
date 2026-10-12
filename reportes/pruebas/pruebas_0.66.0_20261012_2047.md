# Pruebas 0.66.0 — 2026-10-12 20:47 — 8/11 OK

Listas: version, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 1250 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_baloncesto.py` | **OK** | 130 s |
| 2 | `prueba_canchas.py` | **FALLA** | 120 s |
| 3 | `prueba_obispo.py` | **OK** | 122 s |
| 4 | `prueba_diario.py` | **FALLA** | 81 s |
| 5 | `prueba_panel_controles.py` | **OK** | 131 s |
| 6 | `herramientas/foto_noche.py -42 -239 5` | **OK** | 123 s |
| 7 | `prueba_guardar_cargar.py` | **OK** | 67 s |
| 8 | `prueba_coche_y_boca.py` | **OK** | 53 s |
| 9 | `prueba_bordes.py` | **OK** | 120 s |
| 10 | `prueba_persecuciones.py` | **OK** | 147 s |
| 11 | `prueba_conduccion_tuneles_puentes.py` | **FALLA** | 152 s |

## Detalle

### 1. prueba_baloncesto.py — OK

```
shot ms 2.2000000029802322
{"frame":562,"calls":4384,"triangles":6708807,"points":0,"lines":1296} calls:4384
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [4, 7], 'clock': 0, 'golden': False}
resultado {"won":false,"score":[4,7]}
PARTIDO CPU OK
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

Fotos/archivos nuevos en `tests/shots/`: basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg

### 2. prueba_canchas.py — FALLA

```
   ['c7', 'court', 'la cancha de Calle Las Mejoranas', 5, -172, 1042]
   ['c8', 'court', 'la cancha de Calle Llombet', 1, -217, 1092]
   ['c9', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c10', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c11', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c12', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c13', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c14', 'court', 'la cancha de baloncesto', 4, -163, -430]
   ['c15', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c16', 'door', 'la cancha (entrada por la calle)', 2, 206, 1915]
   ['c17', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c18', 'court', 'la cancha de Camino San Bartolomé de Geneto', 5, 242, 1801]
   ['c19', 'court', 'la cancha de baloncesto', 1, -167, -1106]
   ['c20', 'court', 'la cancha de Camino Fuente Cañizares', 5, -1040, -741]
   ['c21', 'door', 'la cancha (entrada por Avenida San Diego)', 4, -846, -908]
   ['c22', 'court', 'la cancha de Camino San Francisco de Paula', 4, -1129, 2004]
   ['c23', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 1, 2178, 2314]
   ['c24', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 5, 2182, 2300]
   ['c25', 'court', 'la cancha de baloncesto', 3, -116, 784]
   ['c26', 'court', 'la cancha de Calle Domingo González Pérez', 3, -637, 1575]
   ['c27', 'court', 'la cancha de Calle Domingo González Pérez', 3, -611, 1575]
   ['c28', 'court', 'la cancha de Calle Aries', 2, 1164, 1527]
   ['c29', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1979, 3754]
   ['c30', 'court', 'la cancha de baloncesto', 3, -152, 876]
   ['c31', 'court', 'la cancha de baloncesto', 4, -121, 887]
   ['c32', 'court', 'la cancha de baloncesto', 1, -140, 878]
   ['c33', 'court', 'la cancha de baloncesto', 1, -1383, -918]
   ['c34', 'court', 'la cancha de Camino Vereda Barbados', 5, -1198, -1020]
   ['c35', 'court', 'la cancha de baloncesto', 4, -1361, -930]
   ['c36', 'door', 'la cancha (entrada por la calle)', 4, -1266, -1045]
   ['c37', 'door', 'la cancha (entrada por la calle)', 4, -1271, -1048]
   ['c38', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1691, 2095]
   ['c39', 'court', 'la cancha de Camino San Bartolomé de Geneto', 1, 236, 1782]
   ['c40', 'court', 'la cancha de Cancha 6º', 5, 1580, 1141]
   ['c41', 'court', 'la cancha de baloncesto', 5, 1074, 2575]
   ['c42', 'court', 'la cancha de Calle Saturno', 3, 814, 1523]
   ['c43', 'court', 'la cancha de Calle Clemencia Hardisson', 4, 845, 1509]
   ['c44', 'court', 'la cancha de baloncesto', 1, 800, 1413]
   ['c45', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1966, 3829]
   ['c46', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 2, 1966, 3803]
   ['c47', 'court', 'la cancha de Calle Antonio Hernandez Arrón', 2, -1332, -626]
   ['c48', 'court', 'la cancha de Camino Tornero', 1, -1314, -650]
   ['c49', 'court', 'la cancha de baloncesto', 4, -1295, -467]
   ['c50', 'court', 'la cancha de baloncesto', 2, -1329, -474]
   ['c51', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1506, -508]
   ['c52', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 2, -1468, -512]
   ['c53', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1479, -526]
   ['c54', 'court', 'la cancha de Carretera General del Norte', 5, -1356, -318]
   ['c55', 'court', 'la cancha de "Avenida del Colesterol"', 3, 1828, 2050]
   ['c56', 'door', 'la cancha (entrada por Calle Pintor Cristino de Vera)', 2, -61, -417]
   ['c57', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1787, 2292]
   ['c58', 'court', 'la cancha de baloncesto', 1, 139, -993]
   ['c59', 'court', 'la cancha de baloncesto', 5, -641, 336]
torneo ['Torneo Lagunero 1/5', 'Torneo Lagunero 2/5', 'Torneo Lagunero 3/5', 'Torneo Lagunero 4/5', 'Torneo Lagunero: la final']
mayex puerta detectada: None
snap entrada_mayex
riostejera puerta detectada: riostejera
snap entrada_rios_tejera
errores JS []
CANCHAS FALLA
```

Fotos/archivos nuevos en `tests/shots/`: entrada_mayex.jpg, entrada_rios_tejera.jpg

### 3. prueba_obispo.py — OK

```
shot ms 2.6999999955296516
{"frame":564,"calls":4807,"triangles":6571832,"points":0,"lines":2376} calls:4807
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'multi', 'dist': 229, 'x': -163, 'z': -430}, 'lampsInCourts': 0, 'treesInCourts': 26, 'pitches': 161}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-162.625,-430,6]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

Fotos/archivos nuevos en `tests/shots/`: entrada_rios_tejera.jpg, obispado.jpg

### 4. prueba_diario.py — FALLA

```
shot ms 3.5
{"frame":564,"calls":4716,"triangles":6491923,"points":0,"lines":1512} calls:4716
activa Una botella para Coco
abierto True misiones 27
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal |  | Coco: ¿Qué miras? ¿Nunca has visto a un calvo con estilo? Soy Coco. «Kid Aguere», me llamaban. Tres veces campeón de Canarias de los pesos medios. |  | Coco: ¿El Chopa? ¿El amigo de El Blanco? Ah
Traceback (most recent call last):
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 23, in <module>
    asyncio.run(main())
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 195, in run
    return runner.run(main)
           ^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\runners.py", line 118, in run
    return self._loop.run_until_complete(task)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Local\Programs\Python\Python312\Lib\asyncio\base_events.py", line 691, in run_until_complete
    return future.result()
           ^^^^^^^^^^^^^^^
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 20, in main
    await globals()['run'](pg)
  File "<string>", line 16, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 10883, in screenshot
    await self._impl_obj.screenshot(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 830, in screenshot
    encoded_binary = await self._channel.send(
                     ^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.TimeoutError: Page.screenshot: Timeout 30000ms exceeded.
Call log:
  - taking page screenshot
  - waiting for fonts to load...
  - fonts loaded
```

### 5. prueba_panel_controles.py — OK

```
shot ms 4.399999998509884
{"frame":562,"calls":4567,"triangles":6571584,"points":0,"lines":1512} calls:4567
true
{"ph":"ready","b":"","pt":126}
{"ph":"intro","b":"FIGHT!","pt":104}
{"ph":"fight","b":"","pt":120}
teclas {"walk":0,"jump":true,"jab":true,"kick":true}
TECLAS OK
```

Fotos/archivos nuevos en `tests/shots/`: fightgo.png, ready.png

### 6. herramientas/foto_noche.py -42 -239 5 — OK

```
shot ms 2.2000000029802322
{"frame":562,"calls":4581,"triangles":6585214,"points":0,"lines":1944} calls:4581
fotogramas 0-1: 0.00 % de píxeles cambian
fotogramas 1-2: 0.00 % de píxeles cambian
fotogramas 2-3: 0.00 % de píxeles cambian
<string>:16: DeprecationWarning: Image.Image.getdata is deprecated and will be removed in Pillow 14 (2027-10-15). Use get_flattened_data instead.
```

Fotos/archivos nuevos en `tests/shots/`: noche_1.jpg, noche_2.jpg

### 7. prueba_guardar_cargar.py — OK

```
shot ms 3.3000000044703484
{"frame":562,"calls":4543,"triangles":6538305,"points":0,"lines":1296} calls:4543
saved {"v":1,"t":1791833950540,"label":"test","player":{"x":-190.85220316222484,"z":783.1196180571543,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.8522127180393,"z":783.1196915953784},"weapon":{"has":true,"ammo":4,"out":
after {"st":"play","m":{"v":2,"story":3,"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"log":{},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false},"active":null},"money":1234,"hp":77,"tod":15.500333333333334,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

Fotos/archivos nuevos en `tests/shots/`: noche_1.jpg, noche_2.jpg

### 8. prueba_coche_y_boca.py — OK

```
shot ms 2.5
{"frame":562,"calls":4506,"triangles":6560102,"points":0,"lines":1728} calls:4506
{"modelo":"Guanche GT","t0a100":"3.1","punta":"190","maxV":"203","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -758   Z 0"}
```

### 9. prueba_bordes.py — OK

```
shot ms 4.199999995529652
{"frame":564,"calls":4514,"triangles":6587812,"points":0,"lines":1296} calls:4514
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":""}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 10. prueba_persecuciones.py — OK

```
shot ms 4.299999997019768
{"frame":562,"calls":4525,"triangles":6620927,"points":0,"lines":1512} calls:4525
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.70 m OK
[8] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.15 m OK
[10] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[11] Los bancos del Adelantado: a pie: a 13 m, recorre 13 m en 3 s, salto máx 0.15 m OK
[12] Grafiteros en el tranvía: a pie: a 5 m, recorre 12 m en 3 s, salto máx 0.13 m OK | a pie: a 5 m, recorre 0 m en 3 s, salto máx 0.13 m OK
[13] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 11. prueba_conduccion_tuneles_puentes.py — FALLA

```
shot ms 3.399999998509884
{"frame":564,"calls":4419,"triangles":6545129,"points":0,"lines":1296} calls:4419
roads 99
FAIL {'off': 5.1, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 183, 'time': 20.9, 'x': 543, 'z': -909, 'y': -0.3}
snap df_308
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 499, 'time': 116.4, 'x': 42, 'z': 1155, 'y': -32.8}
snap df_1287
FAIL {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 13, 'time': 55.4, 'x': -390, 'z': 673, 'y': -6.2}
snap df_2295
failed 3 of 99
CONDUCCION FALLA
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg
