# Pruebas 0.91.1 — 2026-10-26 16:46 — 0/1 OK

Listas: fotos_tf5. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 151 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_tf5.py` | **FALLA** (repetida aparte) | 75 s |

## Detalle

### 1. sonda_tf5.py — FALLA (repetida aparte)

```
En la carga compartida falló por:
Traceback (prueba): TimeoutError('Page.reload: Timeout 30000ms exceeded.\nCall log:\n  - waiting for navigation until "load"\n')
--- repetida aparte:
shot ms 2.800000000745058
{"frame":566,"calls":1764,"triangles":4628099,"points":0,"lines":0} calls:1764
Traceback (most recent call last):
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 27, in <module>
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
  File "E:\Claude\GTA La Laguna\repo\tests\run_test.py", line 24, in main
    await globals()['run'](pg)
  File "<string>", line 30, in run
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\async_api\_generated.py", line 9945, in reload
    await self._impl_obj.reload(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_page.py", line 570, in reload
    await self._channel.send(
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Jonay\AppData\Roaming\Python\Python312\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.TimeoutError: Page.reload: Timeout 30000ms exceeded.
Call log:
  - waiting for navigation until "load"
```
