# 5. Jugabilidad

## Misiones (`12_missions.js`)

### Estructura

- `TRACKS.story` (historia, amarillo) y `TRACKS.side` (secundarias, azul). Cada pista tiene `list` (misiones),
  `idx` (siguiente misión) y una **baliza** (cilindro de luz) en `startPos()` de la siguiente misión.
- Cada misión es un objeto:

```js
{ title: 'Sastrón', who: 'Sastrón',
  startPos() { return [x, z]; },        // dónde se activa
  hint() { return 'Busca a Sastrón en …'; },  // texto «Siguiente:» + ruta GPS amarilla
  start() { … },                         // diálogos iniciales, objetivos
  update(dt) { … },                      // lógica mientras está activa
  onEvent(tipo, dato) { … },             // 'enter' (coche), 'bought', 'ate', 'hit'…
}
```

- `pass(título, dinero)` cierra la misión, suma dinero, suena el estribillo y **guarda automáticamente**.
  Dos círculos de inicio nunca coinciden; si hay dos a menos de 2 m, empieza el más cercano.
  `fail(motivo)` la cancela y, cuando vuelves a estar jugando (tras reaparecer, una pelea…), pregunta
  **«¿Reintentar?»**: te lleva al inicio de la misión y la empieza otra vez (`fail(motivo, true)` no lo pregunta).
- **Guardar a mitad**: la partida guarda qué misión estaba en curso, pero al cargar empieza de nuevo en su círculo
  (aviso en pantalla) y no queda nada suyo suelto (coches, ladrones, blancos, permiso de la pistola de bolas).
  Las partidas antiguas que ya habían terminado la historia corta siguen con las misiones nuevas.
- Diálogos: `talk([[quién, texto], …], alTerminar)` muestra subtítulos que **solo avanzan con clic / toque /
  Espacio / Enter**; `DLG.show(quién, título, texto, pregunta, opciones, cb)` abre un cuadro con opciones
  (teclas 1–9).
- Historia actual: Vuelta al barrio (El Blanco) → Boca Papa → Una botella para Coco → El Canarión (carrera) →
  Sastrón (pagar 2500 $ + tutorial de pelea) → La firma de la banda (nombre) → Boca Papa te enseña a comer →
  El campo de tiro de El Blanco (pistola) → **Defensores de La Laguna** (v0.56, `12f_story2.js`) → mundo libre.
  Secundaria: Revancha con el Canarión.
- **Defensores de La Laguna** (`12f_story2.js`, se añaden con `MISSIONS.addStory()` usando las herramientas de
  `MISSIONS.kit`): la pistola es de **bolas de plástico de aire comprimido** (`WEAPON.lawful`: disparar no es delito
  durante estas misiones). Atraco en la farmacia (pelea 2D; el segundo ladrón roba un coche negro aparcado junto a un Tollota Corola que coges tú; persecución hasta X −1548 Z −693, luego huye a pie por el camino de tierra hasta el Camino Tornero, X −1696 Z −883: dos tiros de bolas y se pone a llorar, lo agarras) →
  Defensores de La Laguna (ceremonia en el Ayuntamiento: el alcalde **Don Yovoy Gofiérrez**, bigote y traje negro,
  nombra a la banda grupo especial de la Policía Local; `GANG.defenders`) → El carterista del Cristo (Coco) →
  Baches en la Vía de Ronda (alcalde; camión, 5 puntos, 4 min) → El rally de La Esperanza (Canarión; carrera contra
  un pijo) → Los bancos del Adelantado (alcalde; pelea y bolas) → Grafiteros en el tranvía (Sastrón; contrarreloj y
  dos blancos) → La guagua de la broma (Boca Papa; 10 s pegado a la guagua) → Escolta a la guagua del Romero
  (alcalde; no alejarse más de 70 m) → El gofio robado (Boca Papa; pistas, pelea y furgoneta) → Carrera solidaria del
  casco (alcalde; a pie) → Noche en el aeropuerto (El Blanco; de noche, persecución de la furgoneta del queso; el
  alcalde os da **coche patrulla**, `GANG.patrol`). Los coches que huyen y las guaguas siguen una ruta del grafo
  (`s2Path`/`s2DriveCar`, cinemáticos como el del Canarión); los que huyen a pie, `s2Runner` con `s2RunPath` (sale de
  donde está, lejos del jugador, por `WALKG`; nunca se mueve más de 1,8 × su velocidad por paso). `s2Mark(o, s)`: flecha
  roja sobre el perseguido unos segundos y punto rojo en los mapas (`s2Blips`) mientras dura la persecución.
- NPCs de la banda (`NPC.blanco`, `boca`, `coco`, `sastron`, `canarion`): Coco y Sastrón aparecen en dos sitios
  emblemáticos del casco elegidos al azar en cada partida.

## GPS y mapa (`11_hud.js`)

- `setWaypoint(x, z, historia)`: rosa = destino puesto por el jugador; amarillo = misión o siguiente paso.
- **A pie** se calcula la ruta con `WALKG`, un grafo con todas las calles, plazas, caminos y escaleras (A* con
  montículo binario, los caminos peatonales cuestan menos). **En coche**, con `GRAPH.routeFrom` (respeta sentidos):
  empieza en la calle por la que vas (`nearestEdge`) y en tu sentido de marcha, y acaba en la calle del destino. La ruta
  se mantiene y solo se recorta mientras la sigues (a menos de 14 m) y el destino no se mueve más de 12 m.
- Minimapa y mapa grande (`M`, zoom con rueda/pellizco, `T` teletransporte en modo Achamán). Las carreteras van en
  azules para no confundirse con el amarillo/rosa de las rutas.
- **Coordenadas**: encima del minimapa se ven X y Z del jugador (metros del mapa); en el mapa grande, las del cursor
  y las del destino marcado (abajo a la izquierda). Sirven para indicar posiciones exactas al corregir el mapa.
- **Mapa grande** (v0.57): se abre centrado en el jugador con zoom 1,2 (~1 km de ancho). Los rótulos se dibujan en
  pantalla por prioridad y sin pisarse (`drawLabels`): de lejos barrios y lugares importantes; desde zoom 0,9 las
  grandes superficies (tipo 5), desde 1,2 las entradas visitables y desde 2,2 las tiendas. Colores de texto (blanco,
  crema, gris, verde de las entradas) distintos de los de rutas y marcas (amarillo, azul, rosa, rojo).
- `MISSIONS.kit.track(x, z)`: objetivo que se mueve (un coche que perseguir): círculo amarillo y ruta GPS sin columna
  de luz; se actualiza cada 0,8 s.

## Peleas 2D (`09d_fight2d.js`)

- Al pegar a un peatón empieza una pelea pixel-art (escenario lógico de 320×180, dibujado al doble, 640×360: sprites
  con cara —ojo, ceja, boca, oreja—, pelo con mechones, pliegues, cinturón, suela; fondo con el doble de píxeles): el fondo es una captura lateral de la
  escena 3D real posterizada con *dithering*; los luchadores se dibujan proceduralmente a partir de su `look`.
- Controles: puñetazo = clic izq. / J / Shift dcho. (mando X); patada = clic dcho. / K / Ctrl dcho. (mando A);
  saltar = Espacio (mando Y); W/↑ = «arriba» (no salta); agacharse = S/↓; **atrás = andar hacia atrás, y se cubre
  solo mientras el rival ataca** (como Street Fighter); L = cubrirse siempre. Luchadores a escala 0,8 (`SZ`), salen a
  62 px de cada borde.
- Golpes: puñetazo 10 %, patada 20 %; bloqueados 1 % / 2 %. Combos encadenando golpes que conectan.
- Especiales (v0.56): **atrás, adelante + puñetazo** = Bola de gofio (proyectil); **atrás, adelante + patada** =
  Patada del Teide (avanza girando y da 3 patadas, estilo «tatsumaki»); **abajo, arriba + puñetazo** = Gancho del Roque
  (gancho saltando hacia arriba, derriba); **abajo, arriba + patada** = Salto del Pastor (la patada voladora de antes).
  Se reconocen con el búfer de direcciones de ~0,5 s; «arriba» es W/↑ (o ▲ en el móvil), que no salta.
- Las 3 primeras peleas muestran un cartel de controles y esperan a pulsar Espacio; luego «FIGHT!».
- Rivales: vecina (recibe ×2, pega ×0,5), doña (pega ×1,1, recibe ×0,5), cachas (pega ×2, recibe ×0,9), vecino,
  Canarión. **La CPU pega un 25 % menos** (`AI_DEAL`) y **prepara sus golpes 1,6 veces más despacio** (`AI_WINDUP`)
  para que dé tiempo a verlos venir y cubrirse; también ataca algo menos a menudo. Ganar: 5–25 $ (5 % de las veces 100 $). Perder: −10 de salud.
- Pegar a una mujer siempre trae a la policía (multa 100 $); a un hombre, si hay 5+ testigos (60 %).
- Tutorial de Sastrón (`fightTutorial`): 9 pasos (andar, puñetazo, patada, salto, barrido, cubrirse, combo y los
  dos especiales); en el paso de cubrirse Sastrón ataca despacio y el paso se da por bueno a los 25 s.

## Armas (`09c_weapons.js`)

- Pistola de El Blanco (6 balas). Botón dcho. apunta (el brazo se orienta con IK hacia la cámara), izquierdo
  dispara. `Tab` / 1 / 2 / cruceta del mando / tocar el letrero del arma: cambia entre puños y pistola.
- La pistola se coloca en la palma con el cañón en la dirección de los nudillos y los dedos se cierran sobre la
  empuñadura (`gripGun`).
- Disparar donde alguien te ve es delito grave (más policía y más rápida, cuesta más perderla).

## Salud, comida y muerte

- Al morir reapareces en el centro de salud o las urgencias más cercanas (`nearestHealth`, lista `HEALTH`).

- La salud baja con golpes, porrazos, disparos y choques fuertes. Se recupera comiendo en tiendas
  (`12b_food.js`, icono rojo) o en la barra de la cafetería.
- **Muerte**: fundido, «HAS MUERTO», reapareces junto a la calle de El Blanco con 100 $ menos (si los tienes);
  las misiones completadas se conservan. Cada paso de la reaparición está protegido y hay un vigilante que te
  revive a los 6 s pase lo que pase.
- **Detenido**: reapareces en la Policía Local pagando la multa.

## Día y noche (`13_main.js`)

- Empieza a las 10:00. Día (7:36–20:24): 1 hora de juego = 150 s (≈ 30 min). Noche: 1 hora = 40 s (≈ 8 min).
- El sol, la luz ambiente, las ventanas encendidas, las farolas y los faros siguen la hora. Tiempo: despejado,
  panza de burro, bruma.

## Guardar y cargar (`12e_save.js`)

- Guarda en `localStorage` (`jeta_save_auto`, `jeta_save_1..3`): posición y orientación (en la puerta si estabas
  dentro de un edificio), salud, dinero, pistola y balas, coche en el que ibas (tipo, modelo, color), hora,
  número de peleas, estado de la historia y de la banda (`MISSIONS.getState()`). La misión en curso se reinicia.
- Automático al superar misión, cada 3 min y al cerrar la página. Menú de pausa → «Guardar / Cargar»; menú de
  inicio → «Continuar partida» / «Cargar». Exportar/importar como archivo `.json`.
- Para añadir un dato nuevo a la partida: incluirlo en `snapshot()` y restaurarlo en `apply()` (y si es de
  misiones, en `getState()` / `setState()`); subir `VER` si cambia el formato.

## Modo Achamán (`12c_achaman.js`)

Desde el menú de inicio: vuelo libre (WASD, E/Q subir/bajar, Shift rápido), dron en órbita y vista cenital
(`V` cambia), `M` mapa con teletransporte. `Esc` vuelve al menú.

## Zona de juego y límites (`01_core.js`, `08b_border.js`)

- `WORLD` (caja) menos `WORLD_EXCL` (rectángulos: el monte del NE en escalera, Los Baldíos/La Vega al SO y, al oeste
  de X −1900, todo salvo el corredor del aeropuerto). `worldEdgeDist(x, z)` da la
  distancia al borde (negativa fuera) e `inPlayArea(x, z, margen)` si un punto está dentro.
- Al cargar, `pruneWorld()` elimina edificios, áreas, árboles, POI, tiendas, tramos de calle y aristas de tráfico
  fuera de la zona de juego (no se dibujan ni generan tráfico).
- `updateBorder()`: a menos de 50 m del borde aviso «Saliendo del mundo»; a menos de 12 m, teletransporte unos 100 m
  hacia dentro siguiendo el gradiente de `worldEdgeDist` y después a la calle a nivel más cercana que no esté en un
  edificio ni bajo tierra; en coche, orientado hacia dentro. Prueba: `tests/prueba_bordes.py`.

## Controles configurables (`01b_controls.js`, `CONTROLS`)

Lista de acciones con sus teclas de siempre y una tecla extra opcional (`localStorage` `jeta_controls`). Los
manejadores de teclado (juego y pelea) traducen la tecla extra a la tecla original con `CONTROLS.alias()`, así el
resto del código no cambia. Pantalla en menú principal y pausa (botón CONTROLES).

## Orden de la historia (v0.43)

Vuelta al barrio → Una botella para Coco → **Sastrón** (pelea de prueba con tutorial; si ganas pide $2500) →
La firma de la banda → … La **carrera con el Canarión** es una misión secundaria (círculo azul) que se abre al hablar
del dinero con Sastrón; después quedan las revanchas. También se puede reunir el dinero peleando por la calle.
Las partidas v1 (con el Canarión dentro de la historia) se convierten al cargar (`getState().v = 2`).
