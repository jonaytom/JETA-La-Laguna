# Auditoría de código: JETA La Laguna v0.52.0

Fecha: 7 de octubre de 2026 · Auditor: herramientas de `RevisordeCodigo` (versión que mide la memoria tras forzar la
limpieza y descuenta las piezas compartidas y los grupos de `__dbg.POOLS`). Comparada con la v0.51 re-medida.

**Veredicto: APTO CON AVISOS.**

| Métrica (calidad media) | v0.51 | v0.52 |
|---|---|---|
| Fuga trazada (geometrías sin liberar tras pasear) | 477 | **0** |
| Memoria JS | 569 MB | 629 MB (+11 %) |
| Geometría en RAM | 416 MB | 476 MB (+14 %) |
| Llamadas de dibujo | 661 | 674 |
| Triángulos | 5,51 M | 5,54 M |
| Lógica por paso | 2,08 ms | 3,78 ms |
| Arranque | 57,9 s | 92,7 s |

- **Mejora**: la P0.a está hecha: sin fugas de geometrías ni texturas al moverse por el mapa.
- **Avisos** (anotados en `PENDIENTES.md`, no se tocan sin Jonay): suben la memoria JS y la geometría en RAM.
- El arranque y la lógica por paso dependen de la máquina de pruebas: el servidor se reinició minutos antes de medir.
