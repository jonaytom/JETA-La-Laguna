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
  `fail(motivo)` la cancela (se puede repetir).
- Diálogos: `talk([[quién, texto], …], alTerminar)` muestra subtítulos que **solo avanzan con clic / toque /
  Espacio / Enter**; `DLG.show(quién, título, texto, pregunta, opciones, cb)` abre un cuadro con opciones
  (teclas 1–9).
- Historia actual: Vuelta al barrio (El Blanco) → Boca Papa → Una botella para Coco → El Canarión (carrera) →
  Sastrón (pagar 2500 $ + tutorial de pelea) → La firma de la banda (nombre) → Boca Papa te enseña a comer →
  El campo de tiro de El Blanco (pistola) → mundo libre. Secundaria: Revancha con el Canarión.
- NPCs de la banda (`NPC.blanco`, `boca`, `coco`, `sastron`, `canarion`): Coco y Sastrón aparecen en dos sitios
  emblemáticos del casco elegidos al azar en cada partida.

## GPS y mapa (`11_hud.js`)

- `setWaypoint(x, z, historia)`: rosa = destino puesto por el jugador; amarillo = misión o siguiente paso.
- **A pie** se calcula la ruta con `WALKG`, un grafo con todas las calles, plazas, caminos y escaleras (A* con
  montículo binario, los caminos peatonales cuestan menos). **En coche**, con `GRAPH` (respeta sentidos).
- Minimapa y mapa grande (`M`, zoom con rueda/pellizco, `T` teletransporte en modo Achamán). Las carreteras van en
  azules para no confundirse con el amarillo/rosa de las rutas.
- **Coordenadas**: encima del minimapa se ven X y Z del jugador (metros del mapa); en el mapa grande, las del cursor
  y las del destino marcado (abajo a la izquierda). Sirven para indicar posiciones exactas al corregir el mapa.

## Peleas 2D (`09d_fight2d.js`)

- Al pegar a un peatón empieza una pelea en un canvas de 320×180 pixel-art: el fondo es una captura lateral de la
  escena 3D real posterizada con *dithering*; los luchadores se dibujan proceduralmente a partir de su `look`.
- Controles: puñetazo = clic izq. / J / Shift dcho. (mando X); patada = clic dcho. / K / Ctrl dcho. (mando A);
  saltar = Espacio (mando Y); W/↑ = «arriba» (no salta); agacharse = S/↓; **cubrirse = mantener atrás**.
- Golpes: puñetazo 10 %, patada 20 %; bloqueados 1 % / 2 %. Combos encadenando golpes que conectan.
- Especiales: **arriba, abajo + puñetazo** = Bola de gofio (proyectil); **arriba, abajo + patada** = Patada del Teide.
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
