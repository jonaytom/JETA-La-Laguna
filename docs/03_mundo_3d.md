# 3. Mundo 3D

> Nota: texturas, modelos y materiales descritos aquí son **provisionales** (ver `10_assets.md`); lo que es
> definitivo es la lógica de construcción (geometría a partir del mapa, colocación, colisiones).

## Terreno (`buildTerrain`, `04_world.js`)

- Malla regular a partir de `DATA.H` (16 m por celda). `heightAt(x, z)` usa **la misma triangulación** (diagonal de
  (1,0) a (0,1)) para que todo lo que se apoya en el suelo coincida exactamente con lo que se ve.
- Textura: mezcla (*splat*) pintada en un canvas con los usos del suelo (parque, bosque, plazas pavimentadas…)
  más un detalle de ruido.
- **Material a dos caras**: si la cámara queda por debajo del suelo (dentro de una trinchera o túnel) se ve una
  cara oscura color tierra en vez de un agujero.

### Recortes del terreno (trincheras, rampas)

Las trincheras abiertas de pasos inferiores y rampas de parking necesitan un **agujero** en el terreno. No se
modifica la malla: el sombreador del terreno descarta píxeles.

- `TCUTS`: lista de segmentos `[x1, z1, x2, z2, semiancho, grupo]`.
- Se suben a una textura de coma flotante (`TCUT_TEX`, hasta `NCUT = 512` segmentos y `NGRP = 160` grupos)
  y a una rejilla de ocupación de 32 m (`CG_TEX`) para que el sombreador solo pruebe los segmentos cercanos.
- `inCut(x, z, margen)` responde en JavaScript si un punto cae en un recorte (árboles, farolas y mobiliario lo
  usan para no aparecer flotando sobre un hueco).

## Carreteras (`buildRoads`)

Cada vía se dibuja como una **cinta** (`ribbon`) subdividida cada ≤ 5 m, pegada al terreno o a una función de
altura propia (`hf`). Cada clase de firme tiene un pequeño desplazamiento vertical (`YOFF`) para evitar parpadeos:
aceras 0,09, peatonal 0,10, asfalto 0,13, asfalto con líneas 0,15, cruces 0,155.

Tipos de dibujo según la vía:

| Caso | Cómo se construye |
|---|---|
| Normal | Cinta sobre el terreno + acera (`w + 4,2`) en calles urbanas + discos en los cruces. |
| Hundida (`DEP`) | `tunnelRoad`: trinchera abierta o tubo cubierto (ver «Túneles»). |
| Puente | Cinta con perfil propio + `bridgeDressing` (bordillo, barandilla, pilas). |
| Rampa de acceso a un puente | Cinta elevada (`RAISE` / `RAISE_SPAN`) + barandillas. |

`ROADY[ri]` guarda, para cada vía, la función de altura **tal como se ha construido** (`roadYFn`). La usan las
auditorías, las medianas y el sistema de obstáculos.

## Separación de calzadas (`01_core.js` → `separateCarriageways`)

En OSM cada sentido de una autovía o avenida doble es una vía distinta; con las anchuras de juego se solapaban.
Al cargar:

1. Para cada vértice de una vía se busca otra vía **paralela** (|cos| > 0,94) a menos de
   `(ancho1 + ancho2)/2 + mediana` metros. Mediana: 2,4 m entre autovías, 2,6 m entre autovía y otra vía,
   1,4 m entre calles urbanas.
2. Se calcula el desplazamiento necesario hacia fuera (la mitad para cada lado, máx. 3,2 m), suavizado a lo largo
   de la vía y **atenuado cerca de los puntos donde se unen** (incorporaciones y salidas).
3. Si el desplazamiento hiciera que dos vías se crucen donde antes no lo hacían, se deshace en esa zona.
4. El mismo desplazamiento se aplica a **todas las copias del vértice** en `R` y en el grafo `G`, para que el
  tráfico circule por donde se dibuja la carretera.

## Medianas (`buildMedians`)

Recorre las vías cada 3 m buscando una vía paralela al mismo nivel con un hueco entre bordes de −0,4 a 6 m:

- Si alguna es autovía/autopista/vía rápida → **barrera de hormigón tipo New Jersey** (0,82 m), con colisión.
- Si no → **isleta** con bordillo (0,16 m), con césped y alguna palmera si es ancha.
- Se deja **hueco en los cruces** (nodos con 3+ vías a menos de 16 m o una vía que cruza la mediana).

## Puentes y pasos elevados (`computeRaises`)

1. `crossingsOf(ri)` calcula las **intersecciones geométricas** de una vía con las demás (rejilla de segmentos
   `XSEG`); si las dos vías comparten un nodo a menos de 6 m es un cruce normal, no un puente.
2. Para cada puente (`flag 2`) se mide la altura libre necesaria sobre lo que cruza: **5,4 m** sobre calzadas,
   **3,2 m** sobre caminos peatonales. Si la vía de abajo está hundida (`DEP`) se usa su altura real en ese punto
   (las rampas de acceso de un paso inferior son poco profundas).
3. Si falta altura, el tablero se eleva (`RAISE`) y se crean **rampas** en las vías que continúan el puente
   (cadenas de hasta 6 tramos, 170 m), con meseta mientras pasan por encima de otras calles.
   Pasarelas peatonales: rampas más cortas y empinadas (`Rr = H·7` m).
4. Puentes gemelos (un tablero por sentido) reciben la misma elevación (`TWIN_NEED`).
5. **Iteración** (hasta 5 pasadas): si la rampa de un puente eleva una vía que pasa por debajo de **otro**
   puente, ese otro puente se sube más (`EXTRA_NEED`) y se recalcula todo.
6. Un «puente» que solo salva un paso inferior (p. ej. una rotonda sobre una avenida hundida) se construye a ras
   de suelo (`AT_GRADE`).

`bridgeProfile(c)` da al tablero una ligera comba y nunca lo deja por debajo del terreno. `bridgeDressing`
añade bordillo-parapeto, barandilla de acero, cara inferior y pilas (solo donde el tablero está alto y no hay
calzada debajo). **No pone barandilla** donde caería dentro de otra calzada al mismo nivel (`inOtherRoad`).

## Túneles y pasos inferiores (`computeDepressions`, `tunnelRoad`)

- Vías con `flag 4` y aptas para coches: profundidad 7,2 m (autovías) o 6,6 m, con transición a lo largo de la
  propia vía y de hasta 4 tramos de las vías que la continúan (rampas de 55–75 m).
- **Pasos peatonales bajo calzada**: un camino con `flag 4` solo se hunde si de verdad cruza una calzada
  (3,6 m, rampas de 22 m, tubo de 2,9 m de alto). Los pasajes bajo edificios se quedan a nivel de calle.
- `tunnelRoad` recorre la vía cada ≤ 4 m:
  - **Cubierto** (más de 3,4 m bajo el suelo): paredes, techo, losa superior, luces, y **boca** con dintel y
    pilastras. El dintel nunca asoma por encima del terreno (por si pasa una calle por encima).
  - **Abierto**: muros de contención hasta el suelo + pretil, y un recorte en el terreno (`TCUTS`).
  - `twinWall`: no se ponen muros entre dos tubos gemelos que van pegados.
- Plataformas transitables: `TUNNEL_DECKS` y `BRIDGE_DECKS`. `lowAt(x, z, y)` devuelve el suelo bajo tierra
  más próximo a la altura `y`; `deckAt` el tablero de puente. Coches y jugador los usan para saber dónde pisan.
  En los extremos poco profundos de una trinchera no hay sujeción lateral, para poder salir a la calle.

## Edificios (`buildBuildings`)

- Extrusión de la planta con altura = plantas × (3,1 m o 3,6 m en el casco). Tejado plano o a cuatro aguas con teja.
- Fachadas con un **atlas** de 16 estilos (colonial canario con ventanas de guillotina y rejas, vivienda moderna,
  bloque, nave, institucional…) aplicado en coordenadas de plantas y vanos; una máscara indica qué parte se tiñe
  con el color del edificio y qué es cristal (que se ilumina de noche al azar).
- Encima, **enlucido real** de Poly Haven (estuco liso, enlucido pintado, enlucido gastado; uno por edificio
  según su semilla) en escala de metros, con su mapa de normales (`PLASTER`).
- Edificios singulares: iglesias (`05c`), Intercambiador (`05k`), pasarela de Anchieta (`05f`), pabellones (`05i`).

## Plazas y parques (`05n_plazas.js`)

- **Plaza del Adelantado**: polígono entre las calles del mismo nombre. Fuente neoclásica de mármol (pilón
  octogonal, pedestal con caños, dos tazas con lámina de agua y remate), anillo de parterres, 10 bancos mirando a
  la fuente, paseos de piedra a cada lado, laureles de Indias en hileras, faroles y papeleras.
- **Camino Largo**: dos hileras de palmeras canarias (≈165) en los bordes del paseo (eje calculado con las vías
  «Avenida Universidad»), bancos y faroles.
- **Parque de la Constitución**: estanque ovalado elevado con isleta y patos animados, bustos de José Martí y
  Simón Bolívar en su posición OSM, parque infantil.
- **Parques genéricos** (> 900 m²): paseo perimetral, caminos al centro, rotonda con fuente en los grandes,
  bancos, farolas, parterres y parque infantil si superan 5000 m².
- **Plazas genéricas**: árboles en el perímetro (laureles en el casco), bancos mirando al centro, faroles y
  fuente central en las grandes.
- Al final se quitan los árboles aleatorios que caían sobre caminos o elementos.

## Parkings subterráneos (`05m_parking.js`)

Salas de 31 m de ancho a ~4,3 m bajo el suelo con plazas, columnas, luces y coches aparcados; rampas de coches
(`tunnelRoad` con techo bajo) y escaleras con pabellón de cristal. En La Trinidad la escalera busca acera libre y,
si queda fuera de la sala, se une con un **pasillo subterráneo**. `UGC` guarda columnas y coches como obstáculos
que solo cuentan bajo tierra (`ugcPush`).

## Auditorías del mapa

`auditCrossings()` y `auditObstacles()` (al final de `04_world.js`) buscan automáticamente cruces a la misma
altura sin enlace y estructuras metidas en carriles. Ver `docs/07_pruebas.md`.
