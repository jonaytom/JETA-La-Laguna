# Auditoría de rendimiento (veredicto antes de publicar)

Herramientas del proyecto «Corrector de código». Miden el juego de verdad (Chromium sin ventana) y comparan con la
versión anterior para dar un veredicto: **APTO**, **APTO CON AVISOS** o **NO APTO**.

## Uso (desde la raíz del repositorio, después de `python build.py`)

```
nohup python tools/auditoria/auditar.py --repo . > tools/auditoria/ultima.log 2>&1 &
```

Tarda ~10 min (la shell corta a los 10 min, por eso va en segundo plano: mirar el log hasta que termine).
Solo análisis estático, en segundos: añadir `--sin-perfil` (no da veredicto de memoria ni fugas).

Resultado en `tools/auditoria/resultados/<fecha>_<versión>_<commit>/`:
- `VEREDICTO.md`: lo que bloquea, avisos, mejoras y tabla de métricas frente a la versión anterior.
- `estatica.md`: avisos del código que corre cada fotograma (heurísticos: confirmar leyendo el código).
- `perfil_media.json`: arranque, llamadas de dibujo, memoria, geometría y fugas.

`resultados/historial.json` guarda una línea por versión: **subirlo con cada versión** para que la siguiente se
compare con esta. Código de salida: 0 apto, 1 apto con avisos, 2 no apto.

## Qué se considera

- NO APTO: el build falla, errores de JavaScript, la memoria/geometría empeora >15 %, los vértices >20 %, o la fuga
  empeora.
- APTO CON AVISOS: empeoras pequeñas (5–15 %) o siguen las fugas ya conocidas.
- La línea base inicial es la v0.46.0 (ver `docs/auditorias/INFORME_AUDITORIA_JETA_v0.46.0.md`).

No editar estos scripts aquí: los mantiene el proyecto «Corrector de código» (si hace falta un cambio, anotarlo en
`PENDIENTES.md` y Jonay lo pasa allí).
