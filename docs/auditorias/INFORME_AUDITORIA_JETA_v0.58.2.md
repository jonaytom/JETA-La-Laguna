# Auditoría de código — JETA La Laguna v0.58.2

Fecha: 12 de octubre de 2026 · Auditor: proyecto «Corrector de código» · Código: copia del PC (GitHub va por la 0.58.0)
Veredicto automático: **APTO** en rendimiento (mismas cifras que la pasada del programador) · **primera comprobación
del mapa**: 452 posibles edificios en la calzada, para revisar.

---

## 1. Resumen

El rendimiento sigue estable y sin fugas desde la 0.53. Entre la 0.55 y la 0.58.2 se han añadido Ayuntamiento,
Hospital Universitario, centros de salud y la segunda historia **sin empeorar nada**, y la memoria ha bajado otro 8 %.

| Indicador (calidad media) | v0.51 | v0.55 | **v0.58.2** |
|---|---|---|---|
| Memoria JS | 546 MB | 544 MB | **502 MB** |
| Geometría en RAM | 387 MB | 384 MB | **339 MB** |
| Geometrías sin liberar tras pasear | 477 | 0 | **0** |
| Vértices | 28,9 M | 28,6 M | 28,6 M |
| Llamadas de dibujo | 661 | 658 | 670 |
| Programas de shader | 56 | 56 | 56 |
| Errores de JavaScript | 0 | 0 | 0 |
| Avisos estáticos críticos (auditor v5) | — | — | **0** |

---

## 2. Tareas de la auditoría anterior (v0.55)

| Tarea | Estado | Comprobado en el código |
|---|---|---|
| **P1.8** Caché de mapas de entorno | ✅ v0.57 | `13_main.js:48`: al cambiar el tiempo se liberan los de otros tipos |
| **P1.7** Posiciones de la ciudad en RAM | ✅ v0.57 | `04_world.js:1,24`: solo se guardan con `?revisor=1` |
| Bancos robados de la misión sin `dispose()` (aviso v0.56) | ✅ v0.57 | |
| P1.5 Mallas sueltas / LOD | ⏳ | 11.300 mallas, 5,55 M triángulos |
| P2.1 / P2.2 / P2.5 | ⏳ | |

**Sobre la P1.7 (−41 MB medidos, no ~250):** el arreglo está bien hecho. La diferencia es de cómo mide el auditor: la
memoria se toma con la ciudad cercana al punto de inicio, y la copia en RAM de cada trozo de ciudad solo se libera
cuando ese trozo llega a la GPU. En una prueba subiendo toda la ciudad de golpe, las posiciones bajaron de ~255 a
~55 MB: **el ahorro real crece a medida que se recorre el mapa** y se acerca a lo estimado.

---

## 3. Mapa: edificios que invaden la calzada (nuevo)

El auditor cruza ahora la planta de cada edificio del juego con el ancho real de cada calle de coches (sin puentes,
túneles ni calles a otra altura) y comprueba con las colisiones del juego si hay muro. Lista completa en
`mapa_v0.58.2/mapa.md`, con capturas aéreas (poste rojo en el punto de mayor invasión).

| | Cantidad |
|---|---|
| Posibles choques (muro dentro del carril, invasión ≥ 1 m) | **452** |
| — cortan la calle (el edificio tapa el eje) | 6 |
| — invaden ≥ 1,5 m | 230 |
| — en calles principales (terciaria o superior) | 54 |
| Solapes visuales sin muro (el coche atraviesa el edificio) | 22 |

La mayoría son en calles residenciales del casco (352), donde los edificios de OSM pisan las calles ensanchadas.

**Revisados con captura:**

| Sitio | X, Z | Resultado |
|---|---|---|
| Calle Barcelona (2 edificios) | −15, 217 / −20, 218 | ✅ **Real**: un edificio corta la calle |
| Avenida de los Menceyes (edificio #747) | 298, 899 | ✅ **Real**: el edificio tapa parte del carril derecho (las flechas del suelo se meten debajo). Es otro edificio, no el centro de salud de Finca España que se movió en la 0.58.2 |
| Calle sin nombre (edificio #1530) | −1646, −279 | ✅ Probable: la calle acaba metida en la esquina del edificio |
| Carretera del Campo de Golf | −3537, −199 | ⚠️ El edificio está pegado al borde, pero la invasión medida (4,9 m) es exagerada: en avenidas anchas el eje de OSM no coincide del todo con lo dibujado |
| Avenida de La Trinidad (esquina) | −251, 532 | ⚠️ Dudoso por lo mismo (avenida con tranvía) |

**Cómo usarlo:** es una lista para revisar, no una lista de errores seguros. Conviene empezar por las calles
principales: Av. de La Trinidad (11), Calle Barcelona (4), Calle Herradores (4), Av. de los Menceyes (3), Nava y
Grimón (3), Camino San Francisco de Paula (3) y Calle San Juan (3). En cada versión el auditor solo avisará de los
**casos nuevos**, así que este total no volverá a aparecer como aviso.

**Arreglo típico** (lo decide el programador): recortar la planta del edificio contra la calzada en `buildBuildings`
(`04_world.js`), o desplazar la fachada hasta el bordillo, igual que ya se hace con las paradas de tranvía en `prep.py`.

---

## 4. Lo que queda, por prioridad

1. **Mapa:** revisar los 54 casos en calles principales, empezando por los 6 que cortan la calle.
2. **P1.5** Mallas sueltas y menos detalle lejos (sin cambios).
3. **P2.1 / P2.2 / P2.5** Precalcular la ciudad en el build, modelos en binario, módulos y lint (sin cambios).

---

## 5. Cambios en el auditor desde la última vez

- **Mapa** (este informe).
- **Menos falsos avisos estáticos:** las funciones auxiliares definidas dentro de un `build*` heredan su estado
  (`mk()` del hospital ya no sale) y lo que se crea solo la primera vez (`if (!X) { … }`, como `s2Mark()`) cuenta como
  «bajo demanda». Los dos falsos avisos que anotó el programador en la 0.57 y la 0.58 ya no aparecen.
- La medición de la 0.58.2 del historial conserva las cifras del programador. Solo se le han añadido el mapa y los
  avisos recalculados con el auditor nuevo, para que la próxima versión compare bien.
