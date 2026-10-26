# Pruebas 0.91.1 — 2026-10-26 16:33 — 0/1 OK

Listas: fotos_tf5. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 225 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_tf5.py` | **FALLA** (repetida aparte) | 109 s |

## Detalle

### 1. sonda_tf5.py — FALLA (repetida aparte)

```
foto tf5_espinero_w_top {'ri': 2288, 'x': -1500, 'z': -124, 'y': 19.9, 'calzadas': [-108, -124]}
foto tf5_sanbenito_ojos {'ri': 2460, 'x': -1100, 'z': 16, 'y': 17, 'calzadas': [16, 1]}
foto tf5_sanbenito_top {'ri': 2460, 'x': -1100, 'z': 16, 'y': 17, 'calzadas': [16, 1]}
foto tf5_sanlazaro_ojos {'ri': 2480, 'x': -1700, 'z': -171, 'y': 26.6, 'calzadas': [-171, -186]}
foto tf5_sanlazaro_top {'ri': 2480, 'x': -1700, 'z': -171, 'y': 26.6, 'calzadas': [-171, -186]}
foto tf5_oeste_ojos {'ri': 2354, 'x': -2000, 'z': -232, 'y': 33.6, 'calzadas': [-232, -247]}
foto tf5_oeste_top {'ri': 2354, 'x': -2000, 'z': -232, 'y': 33.6, 'calzadas': [-232, -247]}
foto tf5_oeste_junto_ojos {'ri': 2354, 'x': -2400, 'z': -214, 'y': 47.1, 'calzadas': [-214, -228]}
foto tf5_oeste_junto_top {'ri': 2354, 'x': -2400, 'z': -214, 'y': 47.1, 'calzadas': [-214, -228]}
foto tf5_bionda_cerca {'suelo': 18.1}
foto tf5_bionda_alto {'suelo': 18.1}
foto tf5_barrera_cerca {'suelo': 18.1}
foto tf5_barrera_alto {'suelo': 17.9}
foto tf5_vallado_boca {'suelo': 7.3}
foto tf5_vallado_alto {'suelo': 9.2}
foto tf5_vallado_tunel {'suelo': 6.6}
foto tf5_huc_rampa {'suelo': -223.4}
foto tf5_huc_rampa_alto {'suelo': -222.1}
foto tf5_adelantado_marcos {'suelo': 1.3}
foto tf5_casco_marcos {'suelo': 0.9}
medianas 321 new jersey 147 biondas 86
tf5 x -2500..-800 [[1, -824, 134, -824, 118, 6], [3, -1158, -27, -1130, -17, 11], [3, -1116, -12, -1094, -4, 9], [3, -2023, -257, -1963, -259, 21], [2, -1935, -238, -1841, -220, 34], [2, -802, 186, -823, 156, 12], [2, -846, 141, -863, 122, 9], [3, -2169, -250, -2178, -250, 4], [3, -2183, -250, -2189, -251, 3], [2, -932, 64, -953, 50, 9], [2, -801, 186, -806, 181, 3], [2, -835, 173, -895, 110, 30], [2, -899, 106, -914, 94, 8], [2, -935, 79, -972, 57, 16], [2, -1001, 43, -1020, 35, 8], [2, -1026, 33, -1050, 25, 10], [2, -1083, 14, -1111, 5, 11], [2, -1145, -5, -1722, -186, 200], [2, -2283, -226, -2259, -228, 9], [2, -2235, -229, -1938, -238, 103], [2, -2481, -203, -2472, -203, 4], [2, -1775, -201, -1725, -187, 18], [3, -1054, 48, -1050, 53, 3], [1, -2229, 23, -2232, 35, 5], [1, -2257, 64, -2309, 98, 22]]
alturas junto a la barrera [[-1442, -98, 18.01, '7.3'], [-1442, -91, 17.88, '0.6'], [-1442, -105, 18.14, '0.8']]
metros de New Jersey en la TF-5 1452
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
  File "<string>", line 48, in run
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
playwright._impl._errors.Error: Page.evaluate: TypeError: Cannot read properties of null (reading 'length')
    at eval (eval at evaluate (:311:30), <anonymous>:2:29)
    at Xs.traverse (http://localhost:8765/three.module.min.js:6:69548)
    at tc.traverse (http://localhost:8765/three.module.min.js:6:69614)
    at eval (eval at evaluate (:311:30), <anonymous>:1:53)
    at eval (eval at evaluate (:311:30), <anonymous>:3:271)
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

Fotos/archivos nuevos en `tests/shots/`: tf5_adelantado_marcos.jpg, tf5_barrera_alto.jpg, tf5_barrera_cerca.jpg, tf5_bionda_alto.jpg, tf5_bionda_cerca.jpg, tf5_casco_marcos.jpg, tf5_espinero_e_ojos.jpg, tf5_espinero_e_top.jpg, tf5_espinero_w_ojos.jpg, tf5_espinero_w_top.jpg, tf5_huc_rampa.jpg, tf5_huc_rampa_alto.jpg, tf5_oeste_junto_ojos.jpg, tf5_oeste_junto_top.jpg, tf5_oeste_ojos.jpg, tf5_oeste_top.jpg, tf5_sanbenito_ojos.jpg, tf5_sanbenito_top.jpg, tf5_sanlazaro_ojos.jpg, tf5_sanlazaro_top.jpg, tf5_vallado_alto.jpg, tf5_vallado_boca.jpg, tf5_vallado_tunel.jpg
