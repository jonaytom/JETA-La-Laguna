# Auditoría de código: JETA La Laguna v0.50.0

Fecha: 7 de octubre de 2026 · Auditor: skill «auditar-codigo» (herramientas de `RevisordeCodigo`), lanzada al publicar.
Análisis estático de los 43 `src/*.js` y perfil del juego en calidad media (Chromium sin ventana, WebGL por software).
Se lanzó **dos veces** porque el primer resultado parecía ruido de medida.

**Veredicto automático: NO APTO** (las dos veces, por motivos distintos). **Lectura del programador: no es una
regresión de esta versión**; ver el apartado 2. Se publica y se deja anotado para que Jonay decida.

## 1. Números

| Indicador (calidad media) | v0.49.0 | v0.50.0 (1.ª) | v0.50.0 (2.ª) |
|---|---|---|---|
| Memoria JS tras arrancar | 580 MB | 582 MB | 728 MB |
| Geometría guardada en RAM | 414 MB | 424 MB | 427 MB |
| Fuga de geometrías (2.ª y 3.ª vuelta) | 72 + 90 | 152 + 59 | 105 + 97 |
| Fuga de texturas (2.ª y 3.ª vuelta) | 4 + 2 | 6 + 2 | 3 + 1 |
| Triángulos por fotograma | 5,50 M | 5,39 M | 5,27 M |
| Llamadas de dibujo | 2.074 | **1.567** | **1.063** |
| Lógica por paso | 3,05 ms | **2,13 ms** | 2,81 ms |
| Arranque (WebGL por software) | 46,7 s | 41,3 s | 37,5 s |
| Avisos estáticos (crítica / alta / media) | 63 / 38 / 153 | 63 / 38 / 153 | 63 / 38 / 153 |

## 2. Por qué sale «NO APTO» y por qué no es de esta versión

- **1.ª pasada: «la fuga de geometrías empeora, 162 → 211».** Se rastreó qué geometrías quedan vivas tras las vueltas
  (contando dónde se creó cada una). Todas las que se pueden atribuir salen de `new Car` → `makeKenneyMesh` /
  `makeMotoMesh` desde `manageTraffic`: es la fuga **P0.a** ya conocida de la auditoría v0.49 (coches del tráfico que no
  caben en el grupo y luces/cascos por coche). El resto son geometrías creadas en la carga que se suben a la GPU la
  primera vez que se ven. La cifra depende de cuántos coches del tráfico se crean y se quitan en cada vuelta; ahora
  que los coches ya no se quedan atascados en enlaces y trincheras, circula más tráfico y la cifra sube un poco.
- **2.ª pasada: «memoria JS 580 → 728 MB».** La geometría en RAM es la misma (427 MB); la diferencia es el momento en
  que el recolector de basura limpia. En la 1.ª pasada salió 582 MB con el mismo código.
- Nada de lo cambiado en v0.50 crea geometrías durante el juego: las fuentes y los andenes se hacen en la carga, y
  los cambios de alturas (`deckAt`, `lowAt`, `trenchPush`, `followOverlaps`) solo calculan números.

## 3. Lo que mejora

- **Llamadas de dibujo −24 % / −49 %**: las fuentes fusionadas y menos mallas sueltas.
- Lógica por paso y arranque, algo mejor (dentro del ruido del WebGL por software).

## 4. Qué queda (no se aplica hasta que Jonay lo diga)

- **P0.a (urgente para que el auditor dé APTO):** coches del tráfico fuera del grupo sin `dispose()` y piezas
  (pilotos, faros, rotativos, casco) creadas por coche. Arreglo: piezas compartidas y liberar lo propio del coche al
  descartarlo. Con eso la fuga debería quedar cerca de 0 y el veredicto pasaría a APTO.
- P0.b rótulos en caché; aparcados en `InstancedMesh`; P1.5 (mallas sueltas, LOD); P2.1, P2.2, P2.5 (sin cambios
  respecto a v0.49).

Resultados completos: `RevisordeCodigo/herramientas/resultados/2026-10-07_0.50.0_local/`.
