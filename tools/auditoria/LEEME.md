# Auditoría de rendimiento (veredicto antes de publicar)

Herramientas del proyecto «Corrector de código». Miden el juego de verdad (Chromium sin ventana) y comparan con la
versión anterior para dar un veredicto: **APTO**, **APTO CON AVISOS** o **NO APTO**.

## Uso (desde la raíz del repositorio, después de `python build.py`)

```
nohup python tools/auditoria/auditar.py --repo . > tools/auditoria/ultima.log 2>&1 &
```

Tarda ~5 min (va en segundo plano para no chocar con el límite de 10 min de la shell: mirar el log hasta que termine).
Solo análisis estático, en segundos: añadir `--sin-perfil` (no da veredicto de memoria ni fugas).

Resultado en `tools/auditoria/resultados/<fecha>_<versión>_<commit>/`:
- `VEREDICTO.md`: lo que bloquea, avisos, mejoras y tabla de métricas frente a la versión anterior.
- `estatica.md`: avisos del código que corre cada fotograma (heurísticos: confirmar leyendo el código).
- `perfil_media.json`: arranque, llamadas de dibujo, memoria, geometría y fugas, con el **origen de la fuga**
  (`fugas.origen`: qué funciones crearon lo que quedó sin liberar, p. ej. `makeKenneyMesh ← Car ← manageTraffic`).

`resultados/historial.json` guarda una línea por versión: **subirlo con cada versión** para que la siguiente se
compare con esta. Código de salida: 0 apto, 1 apto con avisos, 2 no apto.

## Qué se considera

- NO APTO: el build falla, errores de JavaScript, la memoria/geometría empeora >15 %, los vértices >20 %, o la fuga
  empeora.
- APTO CON AVISOS: empeoras pequeñas (5–15 %), siguen las fugas ya conocidas o hay avisos **nuevos** de severidad
  crítica/alta en el código (el veredicto dice cuáles, con `archivo:línea`).
- Línea base actual: v0.49.0 (ver `docs/auditorias/`). Las funciones de creación/carga (`make*`, `build*`, `preload*`,
  `init*`…) no cuentan como «cada fotograma»: sus avisos salen como «bajo demanda» y con menos severidad.

No editar estos scripts aquí: los mantiene el proyecto «Corrector de código» (si hace falta un cambio, anotarlo en
`PENDIENTES.md` y Jonay lo pasa allí).
