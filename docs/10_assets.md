# 10. Assets provisionales y cómo sustituirlos

Todo el arte y el sonido actuales son **provisionales**. Sirven para tener el juego completo y jugable mientras
un **proyecto aparte de creación de assets** produce los definitivos (modelos, texturas, sonido, música, voces).
Este documento es el inventario de **qué se usa, dónde se carga y qué contrato debe cumplir** el reemplazo, para
que el cambio no obligue a tocar la lógica del juego.

## Principios para el proyecto de assets

- **La lógica no depende del arte.** Colisiones, alturas, rutas, misiones y física leen datos del mapa y medidas
  (ancho/largo de coches, altura de plantas…), no la malla. Un modelo nuevo debe respetar esas medidas.
- **Un único HTML.** Hoy todo se incrusta en el HTML (`build.py`). Si los assets nuevos pesan mucho, la
  alternativa prevista es cargar un paquete aparte (`.glb`, `.ktx2`, audio) junto al HTML; habría que añadir un
  cargador y una pantalla de carga, sin cambiar el resto.
- **Mantener los nombres de los puntos de anclaje** (huesos del esqueleto, nombres de piezas de los coches) o
  adaptar el convertidor (`tools/`) para que la salida tenga el mismo formato.

## Inventario

| Asset | Estado actual | Dónde se carga | Contrato para sustituirlo |
|---|---|---|---|
| **Personajes** | Quaternius Universal Base Characters (2 cuerpos) | `tools/chars2json.py` + `tools/morphs.py` → `data/chars.json` → `DATA.HUM` → `06a_humans.js` (`makeHuman`) | Esqueleto con los mismos nombres de hueso (`root, pelvis, spine_01..03, neck_01, Head, clavicle_*, upperarm_*, lowerarm_*, hand_*, dedos *_01..03_*, thigh_*, calf_*, foot_*, ball_*`), ~1,8 m de alto, mirando a +Z. Pelo, barba y accesorios como piezas que se anclan a `Head`/`spine_03`. |
| **Animaciones** | Quaternius Universal Animation Library | `data/chars.json` (`anims`) → `HUM.clips` | Mismos nombres de clip o tabla de equivalencias en `animHumanSkinned` (andar, correr, saltar, en el aire, aterrizar, sentado, puñetazo, golpeado, muerte, interactuar). |
| **Coches** | Kenney Car Kit (estilo juguete) | `tools/kenney2json.py` → `data/kenney_cars.json` → `DATA.KV` → `06b_vmodels.js` | Por modelo: carrocería pintable separada del cristal y del resto, 4 ruedas como piezas propias (`wheel-*`) centradas en su eje, medidas reales (L, W, H del catálogo `VMODELS_RAW`). Luces, matrícula y rotulación se colocan solas sobre la carrocería. |
| **Fachadas** | Atlas procedural de 16 estilos en canvas | `02_textures.js` (`TEX.facade`, `TEX.facadeMask`, `FSTY`) | Atlas 8×2 celdas por estilo (planta baja y planta tipo) + máscara (R = parte teñible, G = cristal que se ilumina). Medidas de vano/planta en `FSTY`. |
| **Enlucido** | Poly Haven 1k (3 tipos) reducidos a 512 | `assets/textures/plaster_*.jpg` → `DATA.PLASTER` | `plaster_det.jpg`: 3 detalles en gris en R/G/B centrados en 0,5; `plaster_n1/n2.jpg`: normales empaquetadas (XY de cada tipo). |
| **Suelos** | Procedurales: asfalto, adoquín, aceras, tierra, tejados | `02_textures.js` | Texturas repetibles; la escala la fija `ribbon(..., tileLen)`. |
| **Terreno** | Mezcla procedural por usos del suelo | `04_world.js` (`buildTerrain`, máscara `SPLAT`) | Se puede sustituir por texturas por capa (césped, tierra, roca, pavimento) manteniendo la máscara. |
| **Edificios singulares** | Modelados en código (Catedral, La Concepción, Anchieta, Intercambiador…) | `05c_churches.js`, `05f_anchieta.js`, `05k_landmarks.js` | Modelo con la planta OSM como huella; mismas coordenadas. |
| **Mobiliario y plazas** | Geometría simple en código (bancos, farolas, fuentes, parques infantiles, patos) | `05e_street.js`, `05n_plazas.js`, `05_scenery.js` | Un modelo por tipo instanciable (`InstancedMesh`); la colocación ya está resuelta. |
| **Árboles** | 4 tipos en código (laurel, palmera canaria, pino canario, genérico) | `05_scenery.js` (`buildTrees`) | Tronco + copa por tipo, escala 1 ≈ árbol medio; se instancian. |
| **Pelea 2D** | Sprites pixel-art generados del `look` | `09d_fight2d.js` (`spritesFor`, `drawFigure`) | Hojas de sprites por personaje con las poses de `POSES`. |
| **Interfaz** | HTML/CSS, fuentes Google | `template.html` | Libre; los IDs de los elementos los usa el código. |
| **Logotipo / icono** | SVG provisional (atardecer, Teide y «J») | `assets/logo/`, incrustado en `template.html` | PNG 64 y 180 px. |
| **Efectos de sonido** | Sintetizados | `10_audio.js` | Sustituir el cuerpo de cada método (`footstep`, `shot`, `crash`…) por la reproducción de un `AudioBuffer`; los puntos de llamada no cambian. |
| **Pasos** | Muestras sintetizadas al iniciar (5 suelos × andar/correr × 6 variantes) | `10c_steps.js` (`bank`) | Sustituir el contenido de `bank[suelo][ritmo]` por grabaciones (varias por suelo, mono, ~0,25 s, el impacto al principio del archivo). La sincronía y la reverberación siguen igual. |
| **Música y voces** | Hip hop procedural + voz del sistema | `10b_music.js` | `MUSIC` puede reproducir pistas grabadas por emisora manteniendo `update`, `next`, `jingle`. |
