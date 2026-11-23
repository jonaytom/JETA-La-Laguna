# Pruebas 1.4.42 — 2026-11-23 10:09 — 0/1 OK

Listas: three187. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 60 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/bajar_three.py` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/bajar_three.py — FALLA

```
fin del core: 'UniformColorSpace,isTypedArray,log,mergeUniforms,probeAsync,setConsoleFunction,warn,warnOnce,yieldToMain};\n//# sourceMappingURL=/sm/bf8527e337b86e97b42e01e235927e739c9f043684f56c74201e15b1096aa7c9.map'
bajado core 422062 module 392177
junto E:\Claude\GTA La Laguna\repo\tests\herramientas\..\..\data\three_r187.module.min.js 824551
Traceback (prueba): Error('Page.evaluate: TypeError: Failed to resolve module specifier "./three.core.js". Invalid relative url or base scheme isn\'t hierarchical.\n    at eval (eval at evaluate (:311:30), <anonymous>:1:39)\n    at UtilityScript.evaluate (<anonymous>:318:18)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)')
```
