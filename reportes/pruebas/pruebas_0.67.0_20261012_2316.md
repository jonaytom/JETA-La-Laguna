# Pruebas 0.67.0 — 2026-10-12 23:16 — 0/1 OK

Listas: sonda_trinidad. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 308 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_trinidad.py` | **FALLA** (repetida aparte) | 152 s |

## Detalle

### 1. herramientas/sonda_trinidad.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): Error('Page.evaluate: ReferenceError: DATA is not defined\n    at eval (eval at evaluate (:311:30), <anonymous>:3:17)\n    at eval (eval at evaluate (:311:30), <anonymous>:6:71)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:311:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)')
--- repetida aparte:
shot ms 1.7000000029802322
{"frame":562,"calls":4695,"triangles":6627682,"points":0,"lines":1080} calls:4695
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
  File "<string>", line 20, in run
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
playwright._impl._errors.Error: Page.evaluate: ReferenceError: DATA is not defined
    at eval (eval at evaluate (:311:30), <anonymous>:3:17)
    at eval (eval at evaluate (:311:30), <anonymous>:6:71)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

Fotos/archivos nuevos en `tests/shots/`: tr_ab_0_0.jpg, tr_ab_0_1.jpg, tr_ab_10_0.jpg, tr_ab_10_1.jpg, tr_ab_11_0.jpg, tr_ab_11_1.jpg, tr_ab_1_0.jpg, tr_ab_1_1.jpg, tr_ab_2_0.jpg, tr_ab_2_1.jpg, tr_ab_3_0.jpg, tr_ab_3_1.jpg, tr_ab_4_0.jpg, tr_ab_4_1.jpg, tr_ab_5_0.jpg, tr_ab_5_1.jpg, tr_ab_6_0.jpg, tr_ab_6_1.jpg, tr_ab_7_0.jpg, tr_ab_7_1.jpg, tr_ab_8_0.jpg, tr_ab_8_1.jpg, tr_ab_9_0.jpg, tr_ab_9_1.jpg, tr_ojo_pedrozerolo_e.jpg, tr_ojo_pedrozerolo_n.jpg, tr_ojo_trinidad3.jpg, tr_ojo_trinidad3b.jpg, tr_ojo_trinidad59.jpg, tr_ojo_trinidad76.jpg, tr_ojo_trinidad76_n.jpg
