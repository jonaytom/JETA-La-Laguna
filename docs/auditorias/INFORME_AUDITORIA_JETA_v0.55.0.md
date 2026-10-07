# Auditoría de código — JETA La Laguna v0.55.0

Fecha: 7 de octubre de 2026 · Auditor: proyecto «Corrector de código» · Código: copia del PC (GitHub va por la 0.54.0)
Veredicto automático: **APTO** (repetido aquí de forma independiente: mismas cifras que la pasada del programador)

> Método v4: semilla, hora y cámara fijas; memoria medida tras subir toda la geometría a la GPU y forzar la limpieza;
> la fuga descuenta piezas compartidas y pools de `__dbg.POOLS`. Los recuentos son exactos y repetibles; los tiempos
> (WebGL por software) solo orientativos.

---

## 1. Resumen

Desde la última auditoría completa (v0.49) el juego ha cerrado su problema más serio: **ya no pierde memoria**.
Tres versiones seguidas (0.53, 0.54 y 0.55) salen **APTO** con cifras estables.

| Indicador (calidad media) | v0.46 | v0.49 | v0.51 | **v0.55** |
|---|---|---|---|---|
| Memoria JS | 1.187 MB | 572 MB | 546 MB | **544 MB** |
| Geometría en RAM | 1.018 MB | 412 MB | 387 MB | **384 MB** |
| Geometrías sin liberar tras pasear | ~430/vuelta | 459 | 477 | **0** |
| Vértices | 28,6 M | 28,8 M | 28,9 M | 28,6 M |
| Llamadas de dibujo | 672 | 688 | 661 | 658 |
| Programas de shader | 55 | 55 | 56 | 56 |
| Errores de JavaScript | 0 | 0 | 0 | 0 |
| HTML final | 6,0 MB | 8,3 MB | — | 8,4 MB |

(Las cifras de v0.46–v0.49 se midieron con métodos anteriores; la tendencia es válida, la comparación fina no.)

---

## 2. Estado de las tareas de auditorías anteriores

| Tarea | Estado | Comprobado en el código |
|---|---|---|
| P0.1 Memoria de geometría (normales/colores 8 bits, liberar tras subir) | ✅ v0.49 | `04_world.js` `Acc.geo()` |
| P0.2/P0.3 Pools de humanos, pistolas, balizas | ✅ v0.49 | `06a_humans.js`, `09e_cops.js` |
| **P0.4 / P0.a Fuga de coches del tráfico** | ✅ **v0.52** | Piezas compartidas (`userData.shared`), liberar al descartar, pools en `__dbg.POOLS`. Fuga 477 → 0 |
| P1.1–P1.4 HUD, minimapa, basura, búsquedas | ✅ v0.49 | |
| P1.6 Mapas de entorno precalculados | ✅ v0.49 | `13_main.js:40-51` |
| P2.3 Offline / P2.4 shaders | ✅ v0.49 | |
| **P1.7 Posiciones en RAM** | ⏳ Pendiente | `04_world.js:22`: `position` sin `onUpload(free)` |
| **P1.8 Límite de la caché de entornos** | ⏳ Pendiente | `13_main.js:47`: `ENVC` crece por cada tiempo distinto |
| P1.5 Mallas sueltas / LOD | ⏳ Pendiente | 11.314 mallas, 5,5 M triángulos |
| P2.1 / P2.2 / P2.5 | ⏳ Pendiente | |

**Nota para `PENDIENTES.md`:** la sección «Auditoría de código v0.49» todavía lista la P0.a como pendiente; está hecha
en la v0.52 y se puede tachar.

---

## 3. Lo que queda, por prioridad

Ya no hay nada urgente: lo que sigue son mejoras de margen, sobre todo para móviles.

### P1.7 · Posiciones de la ciudad en RAM (~259 MB) — la mayor ganancia que queda
- `04_world.js:22`: la posición es el único atributo de `Acc` que no se libera tras subir a la GPU, a propósito, para
  el agente revisor y las auditorías de obstáculos.
- Propuesta: liberarla en el juego normal y conservarla solo cuando se ejecuta el agente revisor (por ejemplo, un
  parámetro `?revisor=1` en la URL que las pruebas ya pueden añadir). El jugador nunca usa esas copias.
- Ganancia: unos 250 MB menos de memoria JS (de ~544 a ~300 MB), lo que más importa para que funcione en móviles.

### P1.8 · Caché de mapas de entorno sin límite
- `13_main.js:47`: si cambias el tiempo (despejado / nublado / lluvia), se van creando hasta 16 mapas más por cada
  tipo, sin borrar los anteriores: hasta 48 en la GPU.
- Propuesta: al cambiar el tiempo, liberar (`dispose()`) los mapas de los otros tipos de tiempo.
- Ganancia: pequeña en PC, evita sorpresas de memoria en la GPU de móviles. Cambio de pocas líneas.

### P1.5 · Mallas sueltas y nivel de detalle (sin cambios)
- 11.314 mallas y 5,5 M de triángulos por fotograma. Es la siguiente mejora de fluidez: juntar los objetos pequeños
  en `Acc` o `InstancedMesh` y simplificar o no dibujar la ciudad lejana.

### P2.1 / P2.2 / P2.5 (sin cambios)
- Precalcular la ciudad al construir el juego (el arranque sigue rehaciéndola), datos de modelos en binario, y
  módulos + lint + sacar `docs/referencias` del repositorio.

---

## 4. Lo que está bien

- El arreglo de la fuga (v0.52) es limpio: piezas compartidas marcadas, liberación al descartar y pools expuestos
  para que se puedan medir. El programador además comprobó por su cuenta que lo que quedaba no era fuga, y tenía razón.
- Disciplina de versiones: cada versión pasa el auditor, lo anota y espera a Jonay antes de tocar nada de la auditoría.
- Las versiones 0.53–0.55 han añadido funciones (freno de mano, modo móvil, trincheras, paradas de tranvía) **sin
  empeorar ninguna métrica**.

---

## 5. Orden sugerido

1. **P1.8** (pocas líneas).
2. **P1.7** (posiciones solo con el revisor): el mayor ahorro de memoria que queda.
3. P1.5 (mallas sueltas y LOD).
4. P2.1 / P2.2 / P2.5.
