# 1. Arquitectura y construcción

## Un solo HTML

El juego se distribuye como **un único archivo HTML** autocontenido. `build.py`:

1. Lee `template.html` (HTML + CSS del HUD, menús y controles táctiles).
2. Concatena **todos** los `src/*.js` en orden alfabético en un solo `<script type="module">`. Por eso los
   archivos llevan prefijo numérico (`01_core.js`, `04_world.js`, `05n_plazas.js`…): el orden importa porque
   todo vive en el **mismo ámbito de módulo** (no hay `import`/`export` entre archivos; las funciones y
   constantes de un archivo se ven en los siguientes).
3. Carga `data/data.json` (mapa), añade los comercios (`data/shops*.txt`), la tabla de parodias de marcas
   (`BRAND`), los coches (`data/kenney_cars.json`), los personajes (`data/chars.json`) y las texturas de
   enlucido (base64), y lo incrusta todo como JSON en `<script id="mapdata" type="application/json">`.
4. Sustituye `__THREE__` por un *import map* que apunta a Three.js r160 (CDN o copia local para pruebas).
5. Escribe las tres salidas de `dist/` (ver README).

`const DATA = JSON.parse(document.getElementById('mapdata').textContent)` (en `01_core.js`) es el punto de
entrada de todos los datos.

> Regla práctica: si un archivo usa algo de otro *en tiempo de carga* (fuera de una función), el otro tiene que
> ir antes en el orden. Dentro de funciones da igual, porque se ejecutan cuando todo el módulo ya está cargado.
> Ojo con los `const`/`let` usados antes de declararse (zona muerta temporal): rompen el arranque entero.

## Mapa de módulos (`src/`)

| Archivo | Contenido |
|---|---|
| `01_core.js` | Lectura de `DATA`, ensanchado de calles, **separación de calzadas** (dos sentidos y autovía/vía paralela), utilidades (`clamp`, `lerp`, `smooth`, `mulberry`), `heightAt` (alturas del terreno), presets de calidad (`QUALITY`), renderer/escena/cámara. |
| `02_textures.js` | Texturas procedurales en canvas (asfalto, adoquín, aceras, tejados), **atlas de fachadas** (16 estilos) y texturas de enlucido reales (`PLASTER`). |
| `03_collide.js` | `COL`: colisiones 2D (segmentos y círculos en rejilla de 16 m) con **rango de altura opcional**. |
| `04_world.js` | Materiales, **terreno** con recortes, **carreteras** (cintas), **puentes y túneles**, auditorías, edificios, **medianas**. El archivo más grande. |
| `05_scenery.js` | Árboles (instanciados), farolas, `isHistoric`, utilidades de colocación. |
| `05c_churches.js` | Catedral, La Concepción (torre), resto de iglesias y ermitas. |
| `05d_signs.js` | Rótulos de comercios (parodias) en fachadas. |
| `05e_street.js` | Mobiliario del casco: terrazas, bancos, jardineras, bolardos, fuentes pequeñas. |
| `05f_anchieta.js` | Pasarela y anillo peatonal del Padre Anchieta (modelado a mano). |
| `05g_interiors.js` | Interiores (Catedral, cafetería Brasilito, hipermercado…), puertas. |
| `05h_commercial.js` | Grandes superficies y aparcamientos en superficie. |
| `05i_sports.js` | Campos de fútbol, canchas, pabellones. |
| `05j_signals.js` | Señales de tráfico (STOP, ceda) y marcas viales. |
| `05k_landmarks.js` | Edificios singulares (Intercambiador, etc.). |
| `05l_tramstops.js` | Paradas del tranvía. |
| `05m_parking.js` | Parkings subterráneos (Plaza del Cristo, Trinidad): salas, rampas, escaleras con pasillo. |
| `05n_plazas.js` | **Plazas y parques**: Plaza del Adelantado (fuente de mármol), Camino Largo (palmeras), Parque de la Constitución (estanque con patos, bustos), parques y plazas genéricos. |
| `05o_concepcion.js` | La Concepción: iglesia y torre modeladas a partir de fotos sobre el plano OSM. |
| `05p_casas.js` | Casas que faltan en OSM, colocadas a mano (`CUSTOM_HOUSES`). |
| `05q_inicio.js` | Esquina de inicio y Marqués de Celada: manzanas partidas en casas, edificios vestidos, señales, locales. |
| `06_actors.js` / `06a_humans.js` | Humanos: modelo con esqueleto (Quaternius) + animaciones, apariencia (`look`). |
| `06b_vmodels.js` | Catálogo de coches (parodias) a partir del Kenney car kit; luces, matrícula, rotulación. |
| `07_vehicles.js` | `GRAPH` (grafo viario), clase `Car` (física), tráfico IA, policía en coche, tranvía. |
| `08_player.js` | Entrada (teclado/ratón/mando/táctil), control del jugador, entrar/salir de coches, pasos. |
| `09_peds.js` | Peatones y `WANTED` (nivel de búsqueda). |
| `09b_combat.js` | Puñetazos en 3D, peatones que se defienden. |
| `09c_weapons.js` | Pistola: apuntado (IK del brazo), agarre en la mano, disparos, cambio puños/pistola. |
| `09d_fight2d.js` | Motor de **pelea 2D pixel-art** (estilo arcade). |
| `09e_cops.js` | Policías a pie que bajan del coche, persiguen y disparan. |
| `10_audio.js` | `AUDIO`: efectos sintetizados (motor, derrapes, sirena, golpes…). |
| `10b_music.js` | `MUSIC`: radio hip hop procedural con letras y estribillo de misión. |
| `01b_controls.js` | `CONTROLS`: teclas configurables y su pantalla. |
| `08b_border.js` | Límites del mundo: aviso y vuelta a la ciudad. |
| `10d_ambience.js` | `AMBIENCE`: pájaros, coches, gente, campanas, perros, gaviotas. |
| `10c_steps.js` | `STEPS`: muestras de pasos por suelo, reverberación y `footContacts` (sincronía con la animación). |
| `11_hud.js` | HUD, minimapa, mapa grande, GPS (`GPS`, grafo peatonal `WALKG`), controles táctiles. |
| `12_missions.js` | `DLG` (diálogos), `MISSIONS` (historia y secundarias), NPCs de la banda. |
| `12b_food.js` | Tiendas de comida y salud. |
| `12c_achaman.js` | Modo Achamán (vuelo libre / dron / cenital). |
| `12e_save.js` | `SAVE`: guardar y cargar partida. |
| `13_main.js` | `GAME` (estados), día/noche, menús, **secuencia de arranque** y **bucle principal**. |

## Estados del juego (`GAME.state`)

`loading` → `menu` → `play` ⇄ `pause` / `dialog` / `cutscene` / `fight2d` / `achaman`.

- `logic(dt)` (en `13_main.js`) solo simula el mundo en `play` (y parte en `achaman`).
- `dialog`: un `DLG.show(...)` está abierto; al cerrarlo vuelve a `play`.
- `cutscene`: fundidos (morir, cargar partida, usar puertas).
- `fight2d`: el motor de pelea 2D tiene su propio bucle (`requestAnimationFrame`) y el 3D se congela.

## Arranque (`boot()` en `13_main.js`)

Pasos con mensaje en la pantalla de carga, en este orden (cada uno protegido con try/catch):

1. Terreno (`prepUndergroundAreas`, `buildTerrain`).
2. Edificios (`buildBuildings`).
3. Carreteras: `buildRoads` (incluye depresiones, elevaciones de puentes), `buildMedians`, `buildCarParks`, `finalizeCuts`.
4. Monumentos (`buildLandmarks`: iglesias, pasarela…).
5. Aparcamientos y grandes superficies.
6. Rótulos y mobiliario urbano.
7. Interiores.
8. Árboles: `scatterTrees` → `buildPlazasParks` → `buildTrees`.
9. Farolas, postes del tranvía, props de plazas, paradas.
10. Deportes, señales, **`finalizeChunks`** (fusiona la geometría por trozos de mapa), cielo.
11. Coches aparcados, tranvía, mapa, jugador, misiones, controles, guardado.
12. Tráfico inicial y compilación de sombreadores.

## Bucle principal

`loop()` → `logic(dt)` → render. En `play`:
física de coches a pasos fijos de 1/90 s, tráfico, tranvía, peatones, `WANTED`, policías a pie, misiones,
GPS (cada 3 fotogramas), cámara, armas, radio, guardado automático, sol/entorno, audio y HUD.

La resolución se adapta sola (`adaptRes`) para mantener los FPS; `QUALITY` (baja / móvil / media / alta) fija
sombras, distancia de dibujado, número de peatones, coches y densidad de árboles.

## Geometría por trozos (`Acc` / `acc()` / `finalizeChunks`)

Casi todo lo estático (carreteras, muros, barandillas, mobiliario simple) se acumula en `Acc` por **trozo de
mapa y material** (`acc(x, z, 'trim')`), y al final se fusiona en un `BufferGeometry` por trozo. Así hay pocas
llamadas de dibujo aunque haya millones de triángulos. Lo repetido (árboles, bancos, farolas, coches aparcados)
usa `InstancedMesh`.

## Depuración

`window.__dbg` expone los objetos principales (`PLAYER`, `CARS`, `GAME`, `MISSIONS`, `ROADY`, `auditCrossings`,
`auditObstacles`, `SAVE`, `MUSIC`…). `window.__step(n, dt, teclas)` avanza la simulación a mano y
`window.__snap()` devuelve una captura JPEG del canvas. Lo usan las pruebas (ver `docs/07_pruebas.md`).
