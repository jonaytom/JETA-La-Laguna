# Pruebas 0.76.0 — 2026-10-19 12:21 — 1/2 OK

Listas: v077c. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 154 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rendimiento.py` | **OK** | 76 s |
| 2 | `prueba_misiones.py 18 18` | **FALLA** (repetida aparte) | 60 s |

## Detalle

### 1. herramientas/sonda_rendimiento.py — OK

```
     145 mallas     21386 tri  fusion
     106 mallas    176531 tri  suelta:Head:BufferGeometry:MeshStandardMaterial
      58 mallas       696 tri  suelta:-:BoxGeometry:MeshBasicMaterial
      49 mallas       588 tri  suelta(después):-:BoxGeometry:MeshStandardMaterial
      43 mallas    175388 tri  suelta(después):-:BufferGeometry:MeshStandardMaterial
      34 mallas     18712 tri  chunk:asphalt
      32 mallas     26456 tri  chunk:sidewalk
      28 mallas     23046 tri  chunk:facade
      27 mallas      4698 tri  chunk:roofFlat
      27 mallas     17280 tri  chunk:disc
      25 mallas      5254 tri  chunk:asphaltLines
      25 mallas        50 tri  suelta(después):obispado:PlaneGeometry:MeshStandardMaterial
      23 mallas     12254 tri  chunk:footway
      23 mallas       276 tri  suelta(después):Head:BoxGeometry:MeshStandardMaterial
      18 mallas        36 tri  suelta:-:PlaneGeometry:MeshBasicMaterial
      18 mallas      7186 tri  chunk:roofTile
      18 mallas      2808 tri  chunk:discPave
      18 mallas      3728 tri  chunk:paving
      16 mallas     19693 tri  suelta:La Concepción:BufferGeometry:MeshStandardMaterial
      16 mallas     47190 tri  chunk:trim
      15 mallas      2112 tri  suelta:-:SphereGeometry:MeshStandardMaterial
      14 mallas       210 tri  suelta:-:ConeGeometry:MeshStandardMaterial
      14 mallas     21019 tri  suelta(después):Head:BufferGeometry:MeshStandardMaterial
      11 mallas      8200 tri  chunk:stone
      10 mallas      1920 tri  suelta(después):Head:TorusGeometry:MeshStandardMaterial
      10 mallas       160 tri  suelta(después):Head:CircleGeometry:MeshStandardMaterial
       9 mallas     11580 tri  suelta:aeropuerto:BufferGeometry:MeshStandardMaterial
       9 mallas       367 tri  suelta:Estadio Francisco Peraza:BufferGeometry:MeshStandardMaterial
       8 mallas        16 tri  suelta:inicio:PlaneGeometry:MeshStandardMaterial
       8 mallas        94 tri  chunk:sign5
       8 mallas       384 tri  suelta(después):lowerarm_l:CylinderGeometry:MeshStandardMaterial
       7 mallas     25280 tri  suelta:inicio:BufferGeometry:MeshStandardMaterial
       7 mallas      1824 tri  suelta:pabellon:BufferGeometry:MeshStandardMaterial
== sueltas grandes (más de 1500 tri): 160
   [403254, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [33788, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [22704, 0, 0, 0, 'BufferGeometry', '2d3236', 'G(inicio)']
   [15100, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [12812, 9088, -152, -6, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9093, -152, -5, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9197, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9197, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9196, -152, 0, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9387, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9393, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9399, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9405, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9411, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9417, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9435, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9390, -152, -46, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9472, -152, -10, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9403, -152, -58, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9499, -152, 5, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9428, -152, 39, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9519, -152, 25, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9639, -152, 4, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9622, -152, -3, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9636, -152, 6, 'BufferGeometry', 'ffffff', 'GG']
SONDA RENDIMIENTO OK
```

### 2. prueba_misiones.py 18 18 — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error("Page.evaluate: TypeError: Cannot read properties of undefined (reading 'root')\n    at eval (eval at evaluate (:311:30), <anonymous>:18:50)\n    at UtilityScript.evaluate (<anonymous>:318:18)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)")
--- repetida aparte:
shot ms 2.800000000745058
{"frame":554,"calls":2627,"triangles":3888710,"points":0,"lines":0} calls:2627
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
  File "<string>", line 50, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 9421, in evaluate
    await self._impl_obj.evaluate(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 474, in evaluate
    return await self._main_frame.evaluate(expression, arg)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_frame.py", line 346, in evaluate
    await self._channel.send(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.Error: Page.evaluate: TypeError: Cannot read properties of undefined (reading 'root')
    at eval (eval at evaluate (:311:30), <anonymous>:18:50)
    at UtilityScript.evaluate (<anonymous>:318:18)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

Fotos/archivos nuevos en `tests/shots/`: sonda_rendimiento.txt
