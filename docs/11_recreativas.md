# 11 · Recreativas, consola y pisito (plan v0.81 → v0.84)

Diseño de los minijuegos 2D «de los 80». Jonay: «van a ser el alma del juego… cúrratelos». Aquí está cómo se van a
hacer. Cada juego sale en su propia versión y se prueba entero (una prueba automática lo juega) antes de seguir con el
siguiente.

## Estado

- **v0.80.0**: el motor (`09j_arcade.js`: `ARCADE.open({ id, key, where, price })`, `ARCADE.GAMES[id]`, y
  `RECRE` para la casa de El Blanco) y el juego 1, Bencomo (`09k_bencomo.js`, con 3 fases y Lugo como jefe).
- **v0.81.0**: el juego 2, «Guerra de Naves» (`09l_naves.js`), en cafeterías y tascas (opción en el menú de la barra,
  `FOOD.open`, $1, récords por bar: `bar_<nombre>`).
- **v0.82.0**: el juego 4, «Guanche Warriors» (`09m_guanche.js`), en las jugueterías (opción en el menú de la
  tienda, `AGUA.openShop`, $1, récords por tienda: `jug_<nombre>`).
- **Tamaños (Jonay, 20-oct)**: Guerra de Naves se dibuja a ×1, con la nave pequeña y mucha visión (como la primera
  versión de Bencomo o menos). Guanche Warriors irá con los personajes al tamaño del Bencomo grande que se descartó
  (unos ×2,4 sobre la pantalla de 480×336).
- La llamada de El Blanco se dispara con `GANG.defenders`. Lo guardado está en `GANG.arcade`: `scores`, `invited`,
  `bought` y `console`.

## Cómo se desbloquea

- **Cuando se desbloquea el alcalde** (la misión en la que Don Yovoy Gofiérrez recibe a la banda en el Ayuntamiento),
  **te llama El Blanco** por teléfono. Te invita a su casa a jugar a «Bencomo» y te cuenta el resto: que en los bares
  hay máquinas de pago y en las jugueterías venden juegos y consolas (Jonay, 19-oct: el del guanche es el de El Blanco
  y el tipo Metal Slug es de pago).
- **No es una misión**: no sale en la lista ni es obligatorio. La casa de El Blanco queda marcada en el mapa y se puede
  ir cuando quieras.

## Dónde se juega

| Sitio | Juego | Precio |
|---|---|---|
| Casa de El Blanco (le pides jugar) | **Bencomo, Acentejo's Revenge** (plataformas) | gratis |
| Bares y cafeterías (donde ya se compra comida; ahora se entra) | **Guerra de Naves** (tipo R-Type / Nemesis) | una moneda por partida |
| Jugueterías | Shooter tipo Metal Slug | una moneda por partida |
| Jugueterías (Jonay, 20-oct) | **Guanche Warriors** (beat'em up tipo Golden Axe) | una moneda por partida |
| **Tu piso** (la consola, comprada en la juguetería, cara) | todos los que hayas comprado en la juguetería, también **Pachanga 3x3** y **Play Furbito** | gratis |

La consola, al encenderla, muestra un menú con los cartuchos que tienes. Cada juego se compra aparte en la juguetería,
**todos** (Jonay, 20-oct): Bencomo, Guerra de Naves, Guanche Warriors, el tipo Metal Slug, Pachanga 3x3 y Play Furbito.

### Los deportes en la consola (Jonay, 20-oct)

- **«Pachanga 3x3»**: el baloncesto de las canchas, pero **3 contra 3** (hay que pasar el basket a 3x3, también en
  la cancha).
- **«Play Furbito»**: el fútbol de las canchas.
- Los dos se juegan **por fases, como un campeonato**:
  - Al principio eliges un país y te sale su equipo.
  - Se van eliminando hasta la final (eliminatorias).
  - Los colores de las equipaciones de los dos equipos de cada partido **no pueden coincidir** (segunda equipación si
    se parecen).

## Lo común a todas las máquinas (`09j_arcade.js`, un motor para todos)

- **Pantalla de máquina**: lienzo de 320×224 (resolución de las placas de los 80) escalado en píxeles enteros, con
  marco de mueble, cristal con reflejo y líneas de barrido suaves (se pueden quitar en Opciones).
- **Ciclo de arcade**:
  - Demo (attract mode): el juego se juega solo y alterna con la tabla de récords y «INSERT COIN».
  - Moneda: el sonido del duro entrando y «CREDIT 1».
  - START → partida → GAME OVER con cuenta atrás «CONTINUE? 9…» (otra moneda) → récords.
- **Récords como en los 80**: la tabla de 10 por máquina con puntos y **3 iniciales**, metidas con ↑/↓ y A. Se guardan
  con la partida (`SAVE`), por máquina. Las de los bares son de cada bar, como en la vida real. Las máquinas vienen con
  récords de mentira de la gente del barrio («BLA», «COC», «SAS», «BOC»…).
- **Puntos** mientras juegas, con los marcadores 1UP / HI-SCORE arriba.
- **Niveles cada vez más difíciles**: cada juego tiene varias fases con jefe final. Después de la última vuelve a
  empezar en una segunda vuelta más rápida y con más enemigos, como hacían las placas.
- **Controles: siempre las mismas teclas** de todos los minijuegos:
  - Botón A = E / clic izquierdo, botón B = Espacio.
  - Arriba = ↑/W, clic derecho o Q.
  - Moverse como al andar.
  - Mando y pantalla táctil también.
- **Sonido chiptune** hecho con el Web Audio del juego: canales de onda cuadrada, triangular y ruido, con una melodía
  propia por fase, efectos y un «jingle» al acabar la fase. Nada de muestras de otros juegos.
- **Gráficos pixel art hechos a mano** en el código: sprites dibujados píxel a píxel desde mapas de caracteres, con una
  paleta corta por juego y animaciones de 2 a 6 cuadros. Fondos con varias capas que se desplazan a distinta velocidad
  (parallax).
- **Pruebas**: cada juego tiene un «jugador automático» que se pasa la primera fase. La prueba comprueba los puntos,
  las vidas, el jefe, la tabla de récords y la memoria al cerrar, y saca fotos de cada fase.

## Juego 1 · «Bencomo, Acentejo's Revenge» (casa de El Blanco, gratis) — v0.81

- **Historia**:
  - **Bencomo** es el célebre mencey de Taoro, que lideró la resistencia guanche frente a la invasión castellana de
    Tenerife.
  - **«Acentejo's Revenge»** alude a la **Matanza de Acentejo** (mayo de 1494), cuando los guanches emboscaron y
    derrotaron a las tropas de Alonso Fernández de Lugo en el barranco de Acentejo. El título juega con la «venganza»
    de los videojuegos clásicos: el líder guanche responde a la invasión con una gran victoria.
  - Plataformas al estilo Mario / Sonic / Prehistorik, con humor y sin crueldad.
- **El guanche**:
  - Salta con la **lanza del salto del pastor**: con A clava la vara y salta con pértiga, mucho más alto y más lejos.
    En el aire puede hacer un segundo impulso o bajar deslizándose por la vara.
  - Con B **golpea con la misma vara**: un golpe hacia delante y, en el aire, un garrotazo hacia abajo.
  - Golpea con el **banot**, la lanza de madera con la punta endurecida al fuego.
  - **Come para recuperar vida**, al estilo Mario. Jonay se inclina por el **gofio** en lugar de plátanos, porque el
    plátano llegó después de la conquista. Propuesta:
    - zurrón de gofio: vida;
    - queso de cabra: vida extra;
    - gofio amasado con miel: power-up (invencible un rato, la música se acelera).
  - Tono satírico y caricaturesco, pero con elementos reales: el salto del pastor por barrancos y riscos, el banot y
    los varazos.
- **Enemigos**, que van saliendo cada vez más fuertes:
  - El soldado de a pie con espada.
  - El ballestero.
  - El arcabucero: lento, y su tiro es muy potente.
  - El caballero a caballo: embiste.
  - Los **perros de presa**: rápidos y saltan.
  - El fraile que lanza cosas.
  - El capitán con armadura: aguanta varios golpes.
- **Fases**:
  1. La costa y los barcos.
  2. El barranco de Acentejo, con la emboscada: caen piedras y troncos que tiran los guanches.
  3. La laurisilva.
  4. Las cuevas.
  5. El campamento castellano.
  Jefe final: Alonso Fernández de Lugo en caricatura, que se escapa a caballo herido, como en la historia.
- **Música**: chiptune con aire de tajaraste y de tambor y flauta canarios.

## Juego 2 · «GUERRA DE NAVES» (bares, de pago) — hecho en v0.81.0, primera versión para pulir

- **Nombre**: «Guerra de Naves» (Jonay, 20-oct). Matamarcianos horizontal tipo R-Type / Nemesis.
- **La nave**:
  - Disparo normal, y disparo cargado si mantienes A.
  - Un **módulo** que se pega delante o detrás, o se lanza (como la Force de R-Type), con B.
  - Barra de mejoras al estilo Nemesis: recoges cápsulas y eliges velocidad, misil, doble, láser, opción o escudo.
- **Fases** (v0.81.0: 3, cada una con su jefe):
  1. El cielo de Aguere. Jefe: la nave nodriza (el ojo se abre 2 s de cada 4).
  2. Las entrañas del Teide. Jefe: la sierpe de lava (solo la cabeza recibe daño).
  3. El mar de nubes y la colmena. Jefe: la reina (el ojo, con su láser).
  Pendiente para pulir: una cuarta fase (la colmena por dentro), jefes más grandes y con más partes, más tipos de
  enemigo y sprites más trabajados.

## Juego 3 · Shooter tipo Metal Slug (jugueterías, de pago) — v0.83 (después de Guanche Warriors)

- **Nombre provisional**: «BLANCO COMMANDO» (el favorito de El Blanco, que es exmilitar).
- **Personaje**: un soldado pequeño y cabezón al estilo Metal Slug, que corre, salta y dispara en 8 direcciones.
  - Granadas con B + ↓, o con un botón aparte.
  - Armas que se recogen: metralleta (H), escopeta (S), lanzallamas (F) y misiles (R).
  - Prisioneros barbudos que liberas y te dan premios.
  - Un vehículo («el Lagunero», un tanquecito) en la fase 2.
- **Fases**:
  1. Monte de Las Mercedes: laurisilva y niebla.
  2. Barranco y pista de tierra, con el tanque.
  3. Pueblo abandonado.
  4. Fortaleza enemiga.
  Cada una con su jefe: helicóptero, tren blindado, robot cangrejo y general en su trono-tanque.
- **Enemigos**: soldados de un ejército inventado (parodia, nada real), en varios tipos: el que corre, el del escudo,
  el bazuca, el paracaidista y el de la moto.

## Juego 4 · «GUANCHE WARRIORS» (jugueterías, de pago; beat'em up tipo Golden Axe) — hecho en v0.82.0, primera versión para pulir

- **Nombre**: «Guanche Warriors» (Jonay, 20-oct). Beat'em up de avance lateral en profundidad, como Golden Axe: no es
  de plataformas.
- **Se eligen 3 personajes al empezar** (Jonay):
  - **El Mencey**: el bárbaro. Fuerte y lento, pega con un **garrote canario**, golpes que tumban y agarres.
  - **El Pastor**: más ágil y menos fuerte. Con la vara de pastor llega más lejos, salta más y tiene ataques saltando
    (el salto del pastor).
  - **La Mirladora**: una chica que hace **magia**. Menos física pero ágil, y es la que tiene la magia más fuerte.
- **Propuesta para cerrar con Jonay**:
  - **Historia**, sacada del mito guanche real: **Guayota**, el demonio que vive dentro del Teide (Echeyde), ha raptado
    a **Magec**, el sol, y lo tiene encerrado en el volcán. La isla está a oscuras. Los tres guerreros suben hasta el
    Teide para liberarlo, como en la leyenda en la que Achamán lo rescata.
  - **Controles**: A pega (combo de 3 golpes; corriendo, embestida), B salta (A en el aire, golpe saltando) y Q lanza
    la magia. Se mueve en 8 direcciones por la calle, también arriba y abajo.
  - **Magia**: se gasta con **zurrones de magia**, que sueltan unos **duendes ladrones** a los que hay que perseguir
    y pegar, como los de Golden Axe.
    - El Mencey: la «Ira de Achamán», un temblor de tierra.
    - El Pastor: el «Viento alisio», un remolino.
    - La Mirladora: la «Luz de Magec», rayos de sol. Es la más fuerte y tiene más niveles.
  - **Montura**: el **lagarto gigante** (el de El Hierro, que existió de verdad), que da coletazos y escupe.
  - **Enemigos**: los **tibicenas** (los perros demonio de pelo negro y ojos rojos de la leyenda), los secuaces de
    Guayota con garrotes y escudos, unos gigantones y unas brujas.
  - **Jefes (v0.82.0)**: el Gigantón de Tigaiga (Taoro), la Bruja de Anaga, el Tibicena Mayor (Los Gigantes), los
    hermanos gigantones en lagarto (Las Cañadas) y Guayota (el Echeyde).
  - **Pendiente para pulir**: agarres y lanzamientos, la pantalla de bonus aparte (ahora se roba en el campamento),
    dos jugadores, más animaciones y más detalle en los fondos.
  - **Fases** (más largas cada vez, con su jefe):
    1. **El poblado de Taoro**, en el valle de La Orotava.
    2. **La laurisilva de Anaga**, con niebla.
    3. **Los acantilados de Los Gigantes**, al borde del mar.
    4. **Las Cañadas**, con lava y piedra pómez.
    5. **Dentro del Teide**, con **Guayota** de jefe final.
    Entre fase y fase, el campamento de noche y la pantalla de bonus, en la que se apalea a los duendes para
    quitarles los zurrones.
  - **Música**: chiptune épico con tambor y flauta canarios. La de cada fase es distinta y más larga, sin repetirse
    tanto.

## La inmobiliaria y los pisos — hecho en v0.83.0 (`12l_casa.js`)

- Hecho: la inmobiliaria Pisos Chachi (Calle Heraclio Sánchez, llama por el móvil), el pisito de Herradores en
  alquiler ($250 por 7 días) y tres pisos en venta ($18.000, $32.000 y $55.000). Dentro: la cama (duermes y se guarda),
  la tele y la consola GOFIO-8 (juguetería, $1.200; cartuchos $90-150) con el menú de cartuchos.
- Hecho (v0.85): Pachanga 3x3 y Play Furbito ($140 cada uno) en la consola, en modo mundialito: 8 selecciones
  (`src/12m_mundialito.js`), cuartos, semifinal y final; las equipaciones no chocan (el rival saca la segunda); el
  campeón pone iniciales en la tabla `mundial_<juego>`. v0.86: todas las pantallas (país, cuadro, resultados, campeones,
  iniciales) van dentro de la consola (`screen` en `ARCADE.GAMES`); los partidos usan `ARCADE.api.suspend()` y vuelven con
  `ARCADE.resume()`. v0.87: cada cartucho tiene sus 8 selecciones (`SPORT[id].teams`; basket con EE. UU., Serbia y
  Lituania) y cada selección un nivel por deporte (`lvB` / `lvF`). Con todos los cartuchos: «¡superfriki jugón!» y el torneo.
- **Torneo de videojuegos** (Jonay, 20-oct), cuando tienes todos los cartuchos:
  - Superar el récord de cada juego de puntos (Bencomo, Guerra de Naves, Guanche Warriors…).
  - Ganar el mundialito de Pachanga 3x3 y de Play Furbito.
  - Al batir un récord, iniciales en la tabla.


- **La inmobiliaria** (parodia) alquila el **pisito** (una casita chula cerca del Pasaje Teide) y, mejor aún (Jonay,
  20-oct), **vende varios pisos**: eliges el que te permita tu dinero, y los pisos son caros.
- Dentro: la cama (guardar la partida), el sofá y la tele.
- La **consola** (cara) se compra en la juguetería y se instala en la tele de tu casa. Con ella se juega a todos los
  minijuegos que tengas.
