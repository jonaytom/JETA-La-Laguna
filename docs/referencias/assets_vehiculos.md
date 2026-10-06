# Assets de coches y motos (consulta, 2026-10-06)

Licencias comprobadas en la página de cada uno. Preferencia: CC0; CC-BY obliga a poner crédito en el juego.

## Coches
| # | Pack | Licencia | Formatos | Notas |
|---|---|---|---|---|
| 1 | [Kenney – Car Kit](https://kenney.nl/assets/car-kit) | CC0 | glTF, FBX, OBJ | 45+ modelos (sedán, van, ambulancia, camiones…), low-poly con atlas de color, pocos KB cada uno. El mejor para tráfico; glTF directo. Algo «de juguete». |
| 2 | [GGBotNet – PSX Style Cars](https://ggbot.itch.io/psx-style-cars) | CC0 | .blend, OBJ | 304–476 tris; ranchera, sedán, hatchback, monovolumen, policía/taxi, furgoneta. Look 90s/2000 europeo; trae sonidos CC0. Escala no uniforme. |
| 3 | [Quaternius – LowPoly Cars](https://quaternius.itch.io/lowpoly-cars) | CC0 | FBX, OBJ, .blend | 8 coches de colores planos, policía y taxi. Aire más americano. |
| + | [Low Poly Vehicles Pack (OGA)](https://opengameart.org/content/low-poly-vehicles-pack) | CC0 | FBX | Incluye bus (guagua), 74 KB. |
| – | Synty POLYGON City (19,99 USD) | Comercial | FBX | Su licencia no deja redistribuir los modelos dentro de un HTML público: no recomendado. |

## Motos / scooters
| # | Modelo | Licencia | Formatos | Notas |
|---|---|---|---|---|
| 1 | [Styloo – Simple Scooter](https://styloo.itch.io/scooter) | CC0 | GLB, FBX | ~3k vértices, 6 colores, tipo Vespa genérica. Para el jugador; bajar texturas a 256–512 px. |
| 2 | [MiniPoly – Scooter](https://poly.pizza/m/3vLV1QtLFP) | CC-BY 3.0 | glTF | 60 tris: scooters de tráfico. |
| 3 | [Jasmine Roberts – Vespa](https://poly.pizza/m/blGLclvvdEM) | CC-BY 3.0 | glTF, OBJ | 670 tris, estilo plano. |
| + | [low poly scooter](https://poly.pizza/m/awXCP7LUcz6), [Motorcycle](https://poly.pizza/m/bBbozwADWnS) | CC-BY 3.0 | glTF | Alternativas. |

Piloto: no hay uno CC0 animado; lo práctico es el personaje del juego en pose sentada, hijo del grupo de la moto,
con inclinación procedural al girar.

## Cómo meterlos
- OBJ/FBX → GLB con Blender o `npx fbx2gltf`.
- `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-compress webp --texture-size 256`
  (MeshoptDecoder pesa poco; Draco añade ~300 KB de decoder).
- En base64 dentro del HTML ocupan un 33 % más; los de atlas de color (Kenney, Quaternius) quedan < 50 KB.
- Parodia: recolorear y rótulos propios con CanvasTexture (TAXI LA LAGUNA, POLICÍA LOCAL, GUAGUA); ninguno trae logos reales.

**Recomendación**: tráfico con Kenney Car Kit + bus del pack de OGA (o GGBot si se quiere más look PSX); moto del
jugador Styloo Scooter y MiniPoly para las de fondo.
