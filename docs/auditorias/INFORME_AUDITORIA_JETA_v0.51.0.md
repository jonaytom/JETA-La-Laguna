# Auditoría de código: JETA La Laguna v0.51.0

Fecha: 7 de octubre de 2026 · Auditor: skill «auditar-codigo» (herramientas de `RevisordeCodigo`).
Análisis estático de los 43 `src/*.js` y perfil en calidad media (Chromium sin ventana, WebGL por software).

**Veredicto automático: NO APTO** («llamadas de dibujo 1.063 → 4.841»). **Es un falso aviso**: la máquina de pruebas
cambió a mitad de la noche (otro servidor, unas 2 veces más lento) y la cifra de llamadas varía mucho entre
sesiones. Para comprobarlo se volvió a medir **v0.50 en la máquina nueva**:

| Indicador (calidad media, misma máquina) | v0.50.0 (repetida) | **v0.51.0** |
|---|---|---|
| Veredicto del auditor | APTO CON AVISOS | NO APTO (por la comparación con la máquina vieja) |
| Memoria JS tras arrancar | 578 MB | 578 MB |
| Geometría en RAM | 400 MB | 406 MB |
| Llamadas de dibujo | 5.071 | 4.841 |
| Triángulos por fotograma | 6,15 M | 6,03 M |
| Fuga de geometrías (2 vueltas) | 137 | 154 |
| Lógica por paso | 3,16 ms | 2,77 ms |
| Arranque | 72,4 s | 71,2 s |
| Avisos estáticos (crítica / alta / media) | 63 / 38 / 153 | 63 / 38 / 153 |

Además, en una misma compilación las llamadas de dibujo salen entre 4.875 y 5.825 según la partida (el tráfico y los
peatones que aparecen son aleatorios); el número de mallas de la escena baja en v0.51 (11.332 → 11.248). En la
máquina anterior el auditor midió 2.074 (v0.49), 1.567 y 1.063 (v0.50): esa cifra no es fiable para bloquear.

**Conclusión: v0.51 rinde igual que v0.50.** Lo que queda es lo mismo que en v0.50 (no se aplica sin el visto bueno de
Jonay): **P0.a** fuga de coches del tráfico (lo que impide el APTO limpio), P0.b rótulos en caché, aparcados en
`InstancedMesh`, P1.5, P2.1, P2.2, P2.5.

**Sugerencia para el auditor** (también por decidir): medir las llamadas de dibujo con tráfico y peatones fijos (semilla
fija) o como media de varias posiciones, y no comparar tiempos entre máquinas distintas.

Resultados: `RevisordeCodigo/herramientas/resultados/2026-10-07_0.51.0_local/` y la repetición de v0.50 en
`2026-10-07_0.50.0_recheck_host_nuevo/`.
