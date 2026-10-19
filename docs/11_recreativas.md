# 11 · Recreativas, consola y pisito (plan v0.81 → v0.84)

Diseño de los minijuegos 2D «de los 80». Jonay: «van a ser el alma del juego… cúrratelos». Aquí está cómo se van a
hacer. Cada juego sale en su propia versión y se prueba entero (una prueba automática lo juega) antes de seguir con el
siguiente.

## Estado

- **v0.80.0**: el motor (`09j_arcade.js`: `ARCADE.open({ id, key, where, price })`, `ARCADE.GAMES[id]`, y
  `RECRE` para la casa de El Blanco) y el juego 1, Bencomo (`09k_bencomo.js`, con 3 fases y Lugo como jefe).
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
| Bares y cafeterías (donde ya se compra comida; ahora se entra) | Naves tipo R-Type / Nemesis | una moneda por partida |
| Jugueterías | Shooter tipo Metal Slug | una moneda por partida |
| ¿bares / jugueterías? | Beat'em up tipo Golden Axe | por decidir con Jonay |
| **Tu pisito** (la consola, comprada en la juguetería, cara) | todos los que hayas comprado en la juguetería | gratis |

La consola, al encenderla, muestra un menú con los cartuchos que tienes. Cada juego se compra aparte en la juguetería.

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

## Juego 2 · Naves tipo R-Type / Nemesis (bares, de pago) — v0.82

- **Nombre provisional**: «R-TEIDE».
- **La nave**:
  - Disparo normal, y disparo cargado si mantienes A.
  - Un **módulo** que se pega delante o detrás, o se lanza (como la Force de R-Type), con B.
  - Barra de mejoras al estilo Nemesis: recoges cápsulas y eliges velocidad, misil, doble, láser, opción o escudo.
- **Fases**: el cielo de La Laguna con nubes y el Teide al fondo, el interior del volcán con lava, una base alienígena
  bajo el mar de nubes y la colmena. Jefes enormes que ocupan media pantalla.

## Juego 3 · Shooter tipo Metal Slug (jugueterías, de pago) — v0.83

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

## Juego 4 · Beat'em up tipo Golden Axe — v0.84

- **Nombre provisional**: «LA FURIA DE GUAYOTA». Fantasía canaria: guerreros que pelean contra los tibicenas (los
  perros demonio) y contra Guayota, el demonio del Teide.
- **Jugabilidad**:
  - Tres personajes a elegir, cada uno con su magia.
  - Hay que pegar en profundidad (arriba y abajo de la calle) y montar en bestias.
  - Los duendecillos roban las pociones.

## La inmobiliaria y el pisito — v0.84

- **La inmobiliaria** (parodia) alquila **tu pisito**: una casita chula cerca del Pasaje Teide.
- Pagas el alquiler cada cierto tiempo. Dentro está la cama (guardar la partida), el sofá y la tele.
- La **consola** (cara) se compra en la juguetería y se instala en la tele del pisito.
