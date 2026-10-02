# 4. Personajes, vehículos, tráfico y colisiones

> Nota: texturas, modelos y materiales descritos aquí son **provisionales** (ver `10_assets.md`); lo que es
> definitivo es la lógica de construcción (geometría a partir del mapa, colocación, colisiones).

## Humanos (`06a_humans.js`)

- Modelos: **Quaternius Universal Base Characters** (cuerpo masculino y femenino con esqueleto tipo Unreal:
  `root, pelvis, spine_01..03, neck_01, Head, clavicle/upperarm/lowerarm/hand_l|r`, dedos…) y animaciones del
  **Universal Animation Library** (andar, correr, saltar, sentado, puñetazo, golpeado, muerte…). Se convierten
  con `tools/chars2json.py` a `data/chars.json` (geometría cuantizada + clips).
- `makeHuman(opciones)` crea un personaje con `SkinnedMesh` y un `AnimationMixer`. Opciones habituales:
  `female, skin, shirt, pants, shoes, sole, hair, hairStyle ('Hair_SimpleParted', 'Hair_Buzzed', 'Hair_Long',
  'Hair_Buns', 'Hair_BuzzedFemale', null), beard, cap, beanie, glasses ('sun' | 'round'), jacket, chain, watch,
  bag, cane, belt, sleeve, longPants, fat, thin, scale, hd`.
- Complexión: los cuerpos base son atléticos; se estrechan escalando el hueso raíz (ancho y fondo). `thin`
  estrecha hombros pero conserva el fondo del cuerpo; `fat` ensancha pelvis y columna.
- `H.look` guarda la apariencia resuelta: el motor de pelea 2D la usa para dibujar el sprite pixel-art del mismo
  personaje.
- `animHuman(H, dt, velocidad, estado)` elige el clip (parado / andar / correr / aire / caído / sentado).

## Jugador (`08_player.js`)

- Entrada unificada: teclado (`KEYS`, `PRESSED`), ratón (bloqueo de puntero), mando (`INPUT.gp`) y táctil
  (`INPUT.touch`, joystick y botones del HUD).
- Andar 2,4 m/s aprox., correr con `Shift`, salto con velocidad inicial 5,3 m/s y gravedad 16 m/s².
- Suelo: interior (planta del interior), bajo tierra (`lowAt`), tablero de puente (`deckAt`) o terreno.
  Bajo tierra no se puede atravesar la pared hacia la superficie y se respetan los obstáculos de parking.
- **Pasos**: suenan en el apoyo real de cada pie de la animación (`footContacts`), con el sonido del suelo que pisa
  (asfalto, adoquín del casco, baldosa, césped/tierra) y eco en túneles e interiores. Ver `06_audio.md`.
- `E` usa puertas y tiendas (prefiere la comida si está más cerca que la salida), `F` entra/sale de coches,
  `H` claxon, `R` endereza el coche.

## Vehículos (`06b_vmodels.js`, `07_vehicles.js`)

- Catálogo de modelos **parodia** (nombre, categoría, base Kenney, dimensiones reales) construido sobre el
  **Kenney Car Kit** (`tools/kenney2json.py` → `data/kenney_cars.json`). La geometría se escala a las medidas
  reales y se separa en carrocería pintable, cristal, resto y ruedas.
- Luces traseras, matrícula, franjas y rótulos (Policía Local, taxi, empresas) se colocan **sobre la carrocería**
  muestreando la geometría (`halfW`), no sobre un rectángulo teórico.
- `Car`: física simple de coche con agarre, derrape, aceleración limitada por potencia y resistencia ajustada a
  la velocidad máxima de cada categoría (`TOP_BY_CAT`, 100–200 km/h). Pasos fijos de 1/90 s.
- Altura: terreno, tablero de puente (con contención lateral), o suelo bajo tierra (`lowAt`) sin atravesar techos.
- Coches aparcados: instanciados a baja resolución y convertidos en `Car` real al interactuar.

## Tráfico

- `GRAPH` (desde `DATA.G`): nodos y aristas con velocidad por tipo de vía; `route(a, b)` es un A* (las autovías
  cuentan como más cortas).
- Los coches IA siguen aristas con un desplazamiento de carril (`laneOff`), frenan en curvas, en STOP / ceda el
  paso y detrás de otros coches.
- Tranvía: recorre `DATA.T` con paradas (`05l_tramstops.js`).

## Peatones (`09_peds.js`)

- Red peatonal `PEDWAYS` (calles + aceras + caminos). Cada peatón sigue una vía con desplazamiento lateral (acera)
  y en los cruces elige otra.
- **Anti-atasco**: si avanza mucho menos de lo que intenta durante 0,45 s, se acerca al centro de la vía, luego da
  la vuelta, y tras varios intentos desaparece (si no lo estás mirando).
- Reaccionan: huyen de coches rápidos y de la policía, se quejan si los empujas, algunos se defienden.

## Policía (`09_peds.js` `WANTED`, `07_vehicles.js`, `09e_cops.js`)

- `WANTED.level` de 0 a 5 estrellas. Patrullas que te persiguen (más y más rápidas con disparos/«armado»).
  Te pierden si no te ven durante un tiempo que crece con las estrellas.
- **A pie**: si el coche patrulla está parado cerca o no puede llegar, bajan 1–2 agentes que corren hacia ti
  (siguen el grafo peatonal `WALKG` si no te ven, esquivan paredes), te dan porrazos y te detienen.
- Con **4+ estrellas disparan**: cada 2,2–3,4 s, probabilidad de acierto según distancia y si corres;
  38–48 puntos por impacto (2–3 tiros te matan).

## Colisiones (`03_collide.js`)

- `COL.addSeg(x1, z1, x2, z2, y0, y1)` y `COL.addCirc(x, z, r, y0, y1)` en una rejilla de 16 m.
- **Rango de altura**: antes de consultar se fija `COL.qy` (altura de quien choca). Un coche en un puente no choca
  con árboles, farolas, pilas ni medianas que hay debajo. Los círculos sin rango usan por defecto
  [suelo − 1, suelo + 3,4] (troncos, postes).
- `COL.resolve(x, z, r)` empuja un círculo fuera de los obstáculos; `COL.raycast` para líneas de visión.
