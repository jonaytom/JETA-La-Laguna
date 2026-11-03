# Pruebas 1.1.0 — 2026-11-03 21:15 — 0/1 OK

Listas: mirla. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 50 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/mirla_variantes.py` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/mirla_variantes.py — FALLA

```
Traceback (most recent call last):
  File "herramientas/mirla_variantes.py", line 9, in run
    try: runpy.run_path(sys.argv[0], run_name='__main__')
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen runpy>", line 287, in run_path
  File "<frozen runpy>", line 98, in _run_module_code
  File "<frozen runpy>", line 88, in _run_code
  File "E:\Claude\GTA La Laguna\repo\tools\sprites_ext\mirla_variantes.py", line 14, in <module>
    rest = src.split("SKFn = topless(SKF)")[1].split("base = with_kicks(")[0]   # hair(), HAIRN, TAPA, lift(), SKIRT
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^
IndexError: list index out of range
Traceback (prueba): IndexError('list index out of range')
```
