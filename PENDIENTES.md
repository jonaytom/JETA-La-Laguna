# Pendientes (notas de feedback)

Lista de comentarios de prueba. **No se hacen al momento**: se anotan aquí y se revisan juntos para agruparlos
y no tocar lo mismo dos veces. Al hacer uno, se tacha y se apunta la versión.

**Clasificada (Jonay, 20-oct)**: cada apunte nuevo entra ya en su categoría (cosas parecidas o del mismo módulo) y con
su velocidad; si no encaja en ninguna, se crea una categoría nueva. Dentro de cada categoría, de lo más rápido a lo más
largo: ⚡ rápido (una tanda corta) · ◐ medio (una versión) · ● largo (varias versiones o por decidir). Lo hecho pasa a
«Hecho» con la versión. Las normas completas para apuntar están en `CLAUDE.md`, en «Cómo se apuntan los pendientes».

## Pendientes por categoría

### Minijuegos: controles, pausa y sonido


### Recreativas, consola GOFIO-8 y torneo



- [ ] ◐ **Guanche Guarriors: golpe en el aire, con patada y con el arma** (Jonay, 3-nov: «debería hacer un golpe en salto
  tanto con la patada como con el mazo o arma que tenga; la patada puede ser parecida a la patada en carrera que ya
  tenemos, pero no derriba, solo golpea; y lo mismo con el arma; lo único, la patada pega algo más lejos por delante y el
  arma pega un poco por delante y por debajo mientras cae»): en el aire, A = golpe con el arma (alcance hacia delante y
  hacia abajo, útil al caer sobre el enemigo) y patada (fotogramas de la patada en carrera; alcance más largo hacia
  delante). Ninguno de los dos derriba, solo quitan vida. Los tres héroes. `09m_guanche.js`.


- [ ] ◐ **Récords con iniciales antes del «CONTINUE»** (Jonay, 3-nov: «al acabar la partida del minijuego, antes del
  continue, que ya de por sí reinicia el marcador, debería dejar poner las iniciales de la puntuación y grabar si es que
  hay récord, y luego se da la opción continue»): al perder la última vida, si la puntuación entra en la tabla de récords,
  pantalla de iniciales (3 letras, ↑/↓ cambian la letra, A/E confirma, como las recreativas) y se guarda; después sale el
  «CONTINUE» con su cuenta atrás. Si no hay récord, directamente el continue. En todas las máquinas (Guanche Guarriors,
  Bencomo, Naves/GUFO…) y con la tabla guardada en la partida.

- [ ] ◐ **Bencomo: listón de salto con pértiga antes de cada tagoror** (Jonay, 3-nov: «antes de llegar a cada tagoror
  debería tener un listón de salto cada vez más alto, por el que te dan puntos extra si lo saltas en lugar de pasarlo por
  debajo, parecido a la bandera de Mario, pero en este caso son saltos de altura de pértiga como las olimpiadas; siempre
  será posible rebasarlo, pero depende desde dónde saltes»): al final de cada fase, antes del tagoror, dos postes con un
  listón; se puede pasar por debajo sin más, o saltarlo con la vara (salto del pastor). Puntos extra según la altura del
  listón que superas; el listón sube fase a fase. La altura que alcanzas depende de la carrerilla y del punto desde el que
  clavas la vara (demasiado cerca o demasiado lejos salta menos), así que siempre se puede, pero hay que afinar. Si tocas el
  listón, se cae y no hay puntos.

- [ ] ◐ **Guanche Guarriors: el aura de fuego del lobo como poder del jefe lobo** (Jonay, 27-oct): en el GIF original,
  al aullar sale en el suelo una franja de llamitas rojas que quité al recortarlo (`tools/sprites_ext/wolf2.py`, «red
  bars»). Idea de Jonay: que sea el poder del jefe lobo (BT, fase de Los Gigantes), p. ej. aúlla y quema alrededor.
- [ ] ◐ **Guanche Guarriors: ¿de día o de noche?** (27-oct): los fondos nuevos son de día; el campamento sigue oscureciendo. Preguntado dos veces, sin respuesta; si Jonay quiere noche, se añade un tinte por fase.
- [ ] ● **Guanche Guarriors: repasar los jefes con Jonay antes de seguir** (Jonay, 27-oct): lista de jefes por fase para
  revisarlos uno a uno (aspecto, poderes, ayudantes) antes de meter los fondos nuevos y lo demás.
- [~] ● v0.98.0 (las dos fases nuevas, Gollux, gorgonas, ratas, lobo y Guayota = Demon Overlord, en el juego; licencias: todos gratuitos de itch.io, Jonay 27-oct; falta usar los Mythic Monsters) **Guanche Guarriors: más fases, enemigos y jefes con los packs nuevos** (Jonay, 27-oct; página «Guanche
  Guarriors: personajes nuevos»): carpetas nuevas en `assets_externos`.
  - Guayota, jefe final, basado en **Demon Overlord 2D Pixel Art** (el del hacha pasa a jefe intermedio).
  - Una fase con las **gorgonas** (craftpix), sin la parte de arriba como La Mirladora (hecho en la propuesta).
  - Otra fase con **Gollux** de jefe. La **rata** para cuevas. **Free Mythic Monsters**: retratos quietos de frente,
    solo valen como jefes que flotan/aparecen.
  - **Perros → el lobo del GIF** que pasó Jonay (sacado fotograma a fotograma: parado, correr, morder, morir, aullar;
    `tools/sprites_ext/wolf.py`). Falta confirmar de qué pack es y su licencia, y pulir el fondo entre las patas.
  - Licencias por mirar: Gollux, RAt, Free Mythic Monsters.
- [ ] ◐ **Guerra de Naves, para pulir**: abajo a la derecha, «CREDIT 0» se monta sobre la barra del BEAM y el icono del
  módulo. También quedan una cuarta fase, jefes más grandes, más enemigos y sprites más trabajados.
- [ ] ● **PAQUETE «RECREATIVAS Y MINIJUEGOS» (Jonay, 19-oct: «para acometer YA», plan v0.79 → v0.84)**:
  Hecho en v0.80.0: el motor de recreativas y BENCOMO en casa de El Blanco (llamada tras «Defensores»).
  Hecho en v0.81.0: **GUERRA DE NAVES** en cafeterías y tascas (primera versión, para pulir).
  Hecho en v0.82.0: **GUANCHE GUARRIORS** en las jugueterías (primera versión, para pulir).
  Hecho en v0.83.0: la inmobiliaria, los pisos y la consola GOFIO-8 con su menú de cartuchos.
  Hecho en v0.84.0: el basket a 3 contra 3.
  Hecho en v0.85.0: Pachanga 3x3 y Play Furbito (el mundialito de 8 selecciones), el «superfriki jugón» y la
  apertura del torneo.
  Falta: el tipo Metal Slug, y la lógica del torneo (comprobar los récords batidos) con su premio.
  - Jonay, 20-oct: Pachanga 3x3 y Play Furbito también se compran en la juguetería como cartuchos. Están basados en lo
    que ya tenemos: al empezar eliges país entre **8 selecciones** y se juega por eliminatorias hasta la final.
  - **El torneo de videojuegos** (Jonay, 20-oct): se desbloquea cuando te has comprado **todos** los cartuchos, también
    Pachanga 3x3 y Play Furbito.
    - Consiste en superar los récords de todos los juegos.
    - En Pachanga 3x3 y Play Furbito: ganar las eliminatorias del mundialito, es decir, ganar el juego. Esos tienen fin;
      los demás van por puntos.
    - Al batir un récord, el juego te deja poner tus iniciales. Las máquinas ya lo hacen; falta en los dos de deportes
      y en la consola.
    - Jonay: cuando lo compras todo, en la juguetería te dicen que eres un «superfriki jugón» y que puedes participar
      en el torneo. Pendiente: el premio.
  Jonay probará todas las máquinas y dirá impresiones.
  - Jonay, 20-oct: los nombres son «Guerra de Naves» (el tipo R-Type) y «Guanche Guarriors» (el tipo Golden Axe:
    beat'em up, no plataformas, con varias fases). En Guanche Guarriors se elige personaje al empezar:
    - El Mencey: el bárbaro, con garrote canario.
    - El Pastor: más ágil y menos fuerte.
    - La Mirladora: una chica que hace magia; menos física, pero ágil.
    Propuesta completa en `docs/11_recreativas.md`.
  - Jonay, 20-oct: controles de siempre (Espacio, clic izquierdo y derecho). Guanche Guarriors: personajes al tamaño
    del Bencomo grande descartado. Naves: pequeño, con mucha visión.
  - Jonay, 20-oct:
    - **Guanche Guarriors se juega en las jugueterías** (de pago).
    - En la juguetería se pueden comprar **todos los juegos** y la **consola**, para jugarlos en casa.
    - **Pisos**: el pisito de alquiler y, mejor aún, **varios pisos en venta**. Eliges el que te permita tu dinero, y
      los pisos son caros.
    - En la consola se juega a todos los minijuegos, también a los de las canchas:
      - **«Pachanga 3x3»**: el basket, que hay que **pasar a 3 contra 3**.
      - **«Play Furbito»**: el fútbol.
      - Los dos son por fases: eliges un país al principio, te sale su equipo y hay eliminatorias hasta la final.
      - Las equipaciones de los dos equipos no pueden coincidir en colores.
  Hecho en v0.79.0: armas (rifle a dos manos), minimapa (puntos encima), fútbol (palomitas, saque de centro, fuerza
  del tiro, regate) y basket (combos de la CPU, 4 mates animados, pases en arco). Falta lo de recreativas en adelante
  (plan en `docs/11_recreativas.md`).
  - **Armas**: el rifle de agua atraviesa el brazo, y al apuntar también se ve mal. La pistola está bien: orientar el
    rifle igual y ponerlo bien en la mano (capturas en X 189 Z 7).
  - **Minimapa**: los puntos de misión no pueden quedar bajo las letras (el punto azul tapado por los nombres de calles
    y sitios). Pintarlos encima.
  - **Fútbol**:
    - El portero hace palomitas para parar algunos tiros.
    - Tras un gol saca de centro con el pie el que lo recibió. El rival no puede quitarle la pelota hasta que la toca,
      y debe guardar distancia hasta que la pasa o corre con ella (como en el saque de banda).
    - Tiro: cerca de la portería, si mantienes mucho el botón, el balón se va por encima. Hay que buscar la fuerza
      buena para cada distancia. Desde muy lejos (bastante fuera del área, casi en el medio campo) sí se puede tirar
      a tope.
    - Doble pulsación de Espacio = regate.
  - **Basket**:
    - El rival hace combos de mates, más cuanto mejor es. No se le ve el combo y también puede fallarlo.
    - Cada mate de combo tiene su animación espectacular. Con puños: el **360** y el **windmill/tomahawk**. Con
      patada: el **de espaldas abriendo las piernas y bajando el balón primero**, y el **entre las piernas de frente**
      (pasa el balón entre las piernas en el salto).
    - Los pases largos van en parábola (ahora van rectísimos).
  - **Recreativas 2D estilo años 80**:
    - Puntos mientras juegas, récord en la máquina con 3 iniciales y niveles cada vez más difíciles.
    - **Se desbloquean cuando se desbloquea el alcalde**: te llama el Blanco y te explica todo.
    - **Casa del Blanco**: **Bencomo, Acentejo's Revenge** (el del guanche), gratis. Cambio de orden de Jonay: el tipo
      Metal Slug pasa a ser de pago. La primera vez te invita a su casa. Luego vas
      cuando quieras (no es misión ni obligatorio) y le pides jugar. Él te cuenta lo de los bares y las jugueterías.
    - **Bares y cafeterías** (donde se compra comida ahora; se podrá entrar): máquinas de pago con el de naves tipo
      R-Type/Nemesis.
    - **Jugueterías**: de pago, el shooter tipo Metal Slug.
    - **El juego del guanche** (casa de El Blanco): plataformas tipo Mario/Sonic/Prehistorik.
      - Título: **«Bencomo, Acentejo's Revenge»**. Bencomo es el mencey de Taoro, líder de la resistencia. Acentejo es
        la Matanza de Acentejo (mayo de 1494), la emboscada guanche a las tropas de Alonso Fernández de Lugo en el
        barranco. Es la «venganza» de los videojuegos clásicos.
      - El guanche salta con la **vara del salto del pastor** y también golpea con ella.
      - Ambientado en la conquista de Tenerife: la **Matanza de Acentejo**.
      - Enemigos: conquistadores de varios tipos que van saliendo, y perros y cosas así de la época.
      - Tono satírico y caricaturesco, con elementos reales de la cultura guanche:
        - **Salto del pastor**: la vara (asta) que usaban para cruzar barrancos y riscos.
        - Varazos con el **banot**: lanza de madera con la punta endurecida al fuego.
        - Comida: el plátano llegó después, así que quizá **gofio en vez de plátanos** (también comían cabra y
          cebada).
    - Otro beat'em up tipo Golden Axe: **Guanche Guarriors**.
  - **Inmobiliaria y pisito**:
    - En la inmobiliaria se alquila tu pisito: una casita chula cerca del Pasaje Teide.
    - En el piso, una consola comprada en la juguetería (vale una pasta). Los juegos se compran también en la
      juguetería y en casa se juegan gratis. Al encenderla sale un menú con los juegos que tengas.

### Fútbol y baloncesto 2D

- [ ] ◐ **Estadísticas al acabar el partido y jugador del partido** (Jonay, 3-nov): basket: tiros intentados y anotados,
  triples, robos, tapones, rebotes y el MVP; fútbol: robos, tiros, goles, pases de gol (el último pase de un compañero 2–3 s
  antes del gol) y el mejor jugador. Pantalla al final, por equipos y por jugador, con los nombres y dorsales de arriba.
- [ ] ◐ **Fútbol: los defensas usan el turbo y hacen entradas por detrás** (Jonay, 3-nov: «los defensores deberían usar
  más el turbo, especialmente si los rebasas y corren por detrás… y más en niveles más altos; si es necesario, gastarlo
  para tratar de evitar el gol; y también entradas por detrás, que pueden pitar como falta»): cuando el delantero les
  supera y van detrás, turbo hasta alcanzarle (más ganas en los niveles altos y si va solo hacia la portería); entrada por
  detrás: si llega, puede quitar el balón o hacer falta (tiro libre, tarjeta si es muy clara).
  - Jonay (3-nov): las entradas por delante nunca son falta. Dos faltas con tarjeta pueden acabar en expulsión según el
    árbitro.
- [ ] ◐ **Fútbol: árbitros con su manera de pitar** (Jonay, 3-nov: «al principio del partido te dirá quién es el árbitro y su
  nivel de rigurosidad; el más riguroso pita el 90 % de las entradas por detrás como falta y saca más tarjetas»): cada
  partido sale un árbitro inventado (nombre parodia) con su rigurosidad (de «deja jugar» a «muy estricto»), que se anuncia
  al empezar. Según ella: probabilidad de pitar una entrada por detrás (hasta el 90 %), de sacar tarjeta y de expulsar con
  la segunda. Vale para ti y para el rival.
- [ ] ◐ **Fútbol: el rival regatea más y el efecto del tiro es difícil** (Jonay, 3-nov: «el efecto al chutar es difícil; los
  enemigos también deben hacer regates más a menudo, que evitan las entradas»): los rivales con balón amagan y regatean
  (quiebro o caño) cuando les entras, más en los niveles altos; y repasar cómo se da efecto al tiro para que sea más fácil
  (más margen al girar mientras cargas, o con una tecla), con una línea que enseñe la curva.

- [ ] ● **Baloncesto con el kit de personajes de GandalfHardcore** (Jonay, 27-oct, pregunta): diseñar camisetas de
  tirantes por capas y hacer nosotros los combos de mates con las mismas piezas.

### Gráficos de los minijuegos

- [ ] ◐ **Fútbol: la carrera apenas mueve piernas y brazos, sobre todo de lado** (Jonay, 3-nov: «los futbolistas,
  especialmente de lado, parece que apenas muevan los pies y los brazos»): ampliar el balanceo de piernas y brazos en la
  carrera de perfil (zancada más larga, rodilla que sube, brazos que van y vienen), más fotogramas o más amplitud, y que se
  note más al ir con turbo. Mirar también la carrera de frente y de espaldas. `09g_futbol2d.js` (dibujo F2).


- [~] ● v0.90.0 (basket: el A++ semicabezón 120 en el juego; fútbol F2 en v0.88) **Repasar el pixel art de los jugadores de todos los minijuegos** (Jonay, 26-oct): no le gustan los personajes
  de ninguno. Se empieza por el basket.
  - Ejemplos que le gustan: póster «Pixel Slam Dunk»; un mate de los Suns; uno de los Raptors; uno de los Lakers
    botando; el «airwalk» de Utah; la cancha callejera estilo anime.
  - Hay 4 propuestas para elegir en `docs/propuestas/sprites_basket.html` (Artifact «Jugadores de basket: 4 estilos»):
    A clásico 16 bits, B pixel moderno, C anime callejero, D póster 8 bits.
  - 26-oct: elige el **A**, pero con más definición («los que te pasé se ven mejores»). Hechas en la misma página:
    A+ (64 px con detalle), A++ (100 px), A+++ (128 px) y **cabezón tipo Day of the Tentacle** (96 y 128 px,
    cara píxel a píxel: ojos, cejas, nariz, sonrisa, colorete, barba). Referencia del cabezón: el de los Celtics con
    barba. Jonay: «las caras deberían ser más nítidas».
  - Arreglado en la propuesta: al correr, el brazo pasaba por debajo del número (ahora el número solo se pinta
    donde se ve la camiseta).
  - 26-oct: elige el **A++** (100 px), pero con las caras más definidas, y si hace falta «un poco más cabezones, no
    tanto como Maniac Mansion». Hechas en la propuesta: «A++ cara» (cabeza 0,076, cara píxel a píxel: perfil con
    nariz, ojo con párpado y pupila, ceja, pómulo, labios, oreja, patillas, barba) y «A++ semicabezón» (cabeza 0,10,
    cuerpo al 85 %), a 100 y a 120 px.
  - 26-oct: **elegido el «A++ semicabezón 120»** («el mejor que has hecho»; el del 23 se ve bien). Arreglado en la
    propuesta: hombros (los brazos cuelgan del hombro ancho de la V, con el deltoides encima), el pelo del afro ya no
    parece un casco ni tapa los ojos (nacimiento del pelo por encima de las cejas, que baja por detrás de la oreja),
    el rubio con pelo corto en vez de pinchos, las patillas solo en los que llevan barba.
  - Hecho en v0.90: pasado al basket (Pachanga y canchas). Falta, con la misma técnica, fútbol, pelea y máquinas. Después, con la misma técnica (esqueleto + piezas +
    sombreado por píxel), el fútbol, la pelea 2D y las máquinas.

### Logros

  - Jonay (3-nov, Pachanga 3×3, captura España–EE. UU.: «son todos iguales… solo cambia el color de pelo»): todos los
    jugadores salen con el mismo cuerpo y la misma cara; que cada uno sea distinto: altura y complexión (base, alero,
    pívot), color de piel, cara, peinado (rapado, trenzas, moño, afro…), barba, cinta o muñequeras, y número en la
    camiseta.
  - Decidido (Jonay, 3-nov): que salgan todos los peinados que hay (al menos un jugador con cada uno), y luego variar el
    color del pelo y algo el tamaño (altura y complexión); barba en uno o dos jugadores; mantener los colores de piel como
    hasta ahora. Cinta y muñequeras: sacar antes una hoja para verlas. Lo que no quiere: que sean clones.
- [ ] ● **LOGROS COLECCIONABLES** (Jonay, 20-oct). Las misiones y lo que vas haciendo desbloquean logros, cada uno con su
  **icono molón** (diseñarlos: pixel art de chapa / medalla, uno por logro).
  - **Son secretos**: no se ve qué hay que hacer; cuando lo cumples, el juego te lo dice (aviso grande con el icono).
  - Se ven en una **sección especial que se abre con una tecla**: la vitrina de chapas, con las conseguidas en color
    y las que faltan como «?».
  - Por niveles según vas llegando más lejos (bronce / plata / oro del mismo logro).
  - **Propuesta de lista** (para revisarla juntos):
    - **Peleas**:
      - «Cinturón de Gofio»: la primera pelea ganada (el primero que sale, como dice Jonay).
      - «Puño de Millo»: 10 peleas ganadas.
      - «El Pelón de Aguere»: 50 peleas ganadas.
      - «Ni un rasguño»: ganar una pelea sin que te den.
    - **Maleantes**:
      - «Placa de Juguete»: el primer maleante entregado.
      - «Cazarrecompensas»: 10 maleantes entregados.
      - «Terror del Cristo»: un maleante de nivel 3.
    - **Conducción**:
      - «Carné de Chófer»: la primera carrera del Canarión ganada.
      - «Guagüero Mayor»: 5 carreras ganadas.
      - «Rey de la Vía de Ronda»: todas las carreras ganadas.
      - «Chapa y Pintura»: siniestro total de un coche.
    - **Armas**:
      - «Bolita de Oro»: 50 latas en el campo de tiro de El Blanco.
      - «Manguera Loca»: apagar un fuego con el rifle de agua.
    - **Policía**:
      - «Más buscado que el Teide»: 5 estrellas.
      - «Escapista»: perder a la policía con 3 estrellas o más.
    - **Deportes**:
      - «Mate de Gofio»: el primer mate de combo.
      - «Triplista»: 10 triples.
      - «Campeón Lagunero»: el Torneo Lagunero.
      - «Copa Laguna»: la copa de fútbol.
      - «Palomitero»: 5 palomitas del portero.
    - **Recreativas**: una chapa por juego con su título.
      - «Venganza de Acentejo»: pasarse Bencomo.
      - «As de Aguere»: pasarse Guerra de Naves.
      - «Magec Libre»: pasarse Guanche Guarriors.
      - «Superfriki Jugón»: todos los cartuchos.
      - «Campeón del Torneo»: el torneo de videojuegos.
    - **Historia**:
      - «Defensor de La Laguna».
      - «Firma de la Banda».
      - «Coche Patrulla».
      - Una por cada final de hilo: El Obispo, El Secreta, el Canarión…
    - **Ciudad**:
      - «Propietario»: tu primera casa.
      - «Rico de Aguere»: el ático del Adelantado.
      - «Barraquito Adicto»: 20 barraquitos.
      - «Turista»: visitar la Catedral, la Concepción y el Aeropuerto.
      - «Noctámbulo»: estar en la calle a las 4 de la mañana.
      - «Gofio en vena»: comer 30 veces.

### Controles, menús y movimiento del jugador

- [ ] ● **Saltar vallas y obstáculos de media altura** (Jonay, 3-nov: «¿no tenemos alguna animación que haga pasar por
  encima de algo? que valga para saltar una valla»): al correr contra algo de ~0,6–1,3 m (vallas, pretiles, bancos), pasar
  por encima con una animación de salto apoyando la mano. No hay ninguna en el esqueleto actual: sacarla de Mixamo
  («Jump Over», «Vault»; ver «Recursos externos») o hacerla a mano, y detectar la altura del obstáculo delante.

### Cielo, luz y hora del día

- [ ] ◐ **Más luz de noche: farolas, ventanas y demás luces** (Jonay, 3-nov: «la iluminación de las farolas por la noche
  debería cubrir un poco más, y la luz de las ventanas y todas las fuentes de luz en general, para que compense un poco la
  oscuridad que hay»): que el charco de luz de cada farola sea más grande y más claro en el suelo, que las ventanas
  encendidas se vean más y den algo de luz a la calle, y lo mismo con escaparates, rótulos y faros. Subir también un poco
  la luz ambiente de noche para que no se vea todo negro. Sin añadir luces de verdad (cuestan mucho): con el brillo de las
  texturas, manchas de luz pintadas en el suelo y la luz ambiente.

- [ ] ◐ **Una franja verde de monte flotando en el cielo** (fotos de las pruebas y captura de Jonay en X 769, Y 1541, 10-nov): en vuelo libre y en las fotos se ve una tira de ladera verde suspendida en el aire, delante del cielo. Parece el fondo de montes lejanos colocado a la altura del jugador y no de la cámara. Buscar qué malla es (`__ORIGEN`) y ponerla a su altura.
### HUD y minimapa


- [~] ◐ v1.0.9 (sin sentidos únicos salvo en vías rápidas, como pidió Jonay; quedan la vuelta en el sitio, la rebaja de las autopistas y los giros) **La ruta del GPS da vueltas enormes** (Jonay, 3-nov: «las indicaciones de ruta hacen unas vueltas terribles, como
  si no quisieran coger dirección prohibida… ¿cómo se decide la ruta?»). Cómo va hoy (`07_vehicles.js`, `GRAPH.routeFrom`):
  en coche, A* por el grafo del tráfico respetando los sentidos únicos del OSM; empieza siempre hacia donde mira el coche
  (nunca da la vuelta en la calle), y las autopistas cuentan como 0,7 veces su largo (para preferirlas). A pie
  (`WALKG` en `11_hud.js`) no hay sentidos y se prefieren las calles peatonales. Arreglos posibles:
  - dejar dar la vuelta en el sitio (o en el primer cruce) con una penalización (~60 m) en vez de prohibirla;
  - quitar o suavizar la rebaja de las autopistas (0,7 → 0,9), que lleva a dar rodeos por ellas;
  - una pequeña penalización por giro, para no hacer zigzag por las manzanas;
  - revisar sentidos únicos mal puestos en el OSM o creados al separar sentidos (calles que salen de un solo sentido).



### Misiones, historia y economía


- [ ] ◐ **Rifle de agua: postura, puntería y chorro** (Jonay, 3-nov, misiones del agua con El Blanco y Boca Papa, X −599,
  Y −525 y X −573, Y −513, 4 capturas).
  - Al apuntar, el rifle se mete dentro del cuerpo del Chopa (se ve el arma atravesándole el pecho y el hombro): repasar
    la postura y dónde va el arma (en las manos, delante, con la culata al hombro).
  - Las gotas caen a la izquierda de donde apuntas: el chorro debe salir hacia la mira (desde la boca del arma, corregido
    hacia el punto que marca la cruz) y la mira centrada en donde va a caer.
  - «Boca Papa se ve sentado en la nada y no se sabe si le das a la cabeza»: sentarlo en un banco o una silla de verdad, y
    que se vea claro cuándo le aciertas (salpicadura en la cabeza, sonido, texto).
  - Chorro continuo en vez de gotas sueltas (Jonay: «me gustaría que fuera un chorro continuo»): una tira de agua en
    parábola que sigue al arma mientras disparas, con el charco donde cae. `09i_agua.js` / `12k_agua.js`.
  - El cilindro azul de la fuente donde se rellena se ve muy grande y opaco de noche; hacerlo más discreto.

- [ ] ◐ **El coche de los malos traza fatal las curvas** (Jonay, 3-nov, la persecución antes de la misión del alcalde:
  «estuvo bien», pero «tengo que frenar y esperar a que gire, es muy mal conductor; además gira raro, de golpe, no es
  natural»): que frene antes de las curvas, use el freno de mano en las cerradas y gire con el volante suavizado (no
  cambiar de rumbo de golpe). Mirar cómo conduce el huido en `09h_maleantes.js` / `12f_story2.js`.
- [ ] ◐ **Presentar al Obispo al firmar la banda** (Jonay, 3-nov: «en ningún momento te dicen lo del obispo… deberíamos
  desbloquearlo ya cuando se firma la banda; inventa alguna manera para que te lo presenten, sin tener que desbloquear al
  alcalde»): hoy se desbloquea con las del alcalde y nadie lo cuenta. Una escena o llamada al firmar la banda (p. ej. el
  cura de La Concepción os pide ayuda y os manda a la Casa Salazar), icono en el mapa y las misiones disponibles desde
  ahí; las que necesitan el rifle de agua (el incendio) se quedan con candado y aviso («te hace falta un rifle de agua,
  se vende en las jugueterías») hasta tenerlo. `12g_obispo.js`.

- [~] ◐ v0.76.0 (rifle de agua, bolitas en las jugueterías, Tab entre puños/pistola/rifle; faltan euros, tabla de economía y patada en 3D) **Economía y armas** (Jonay, 12-oct), junto con las jugueterías:
      - El dinero va en **euros, no dólares** (HUD «$00000350» → euros; textos «+$1500», multas, precios, docs).
      - **Bolitas baratas**; la **escopeta de agua cara**: hacen falta varias misiones para poder comprarla.
      - **Recompensas proporcionadas** (misiones, peleas, baloncesto, fútbol): que no haya munición infinita tras unas
        pocas misiones ni la escopeta de agua al empezar. Repasar todas las cantidades con una tabla de economía.
      - **Escopeta de agua**: diseñarla bien (modelo y postura al apuntar); se cambia con **Tab** como pistola y puños.
      - **Patada en 3D con el botón derecho** cuando no llevas arma; dar una patada a alguien también lleva a la pelea 2D.
      - **Escopeta / metralleta de agua** (Jonay, 13-oct; no hacer aún, va con las jugueterías y las bolitas): sirve para
        otras misiones, entre ellas apagar fuegos en una iglesia del Obispo. Dispara un **chorro en parábola** que avanza
        unos **10 m** en línea recta y cae; donde cae deja un **charquito unos segundos**: ahí apaga si hay fuego o golpea
        si hay una persona. Si el chorro choca con algo (o alguien) en la trayectoria antes de caer, golpea/apaga ahí.
- [~] ◐ v0.56.0 **Historia: nueva tanda de misiones** (programadas las 12; **Jonay las prueba**: anotar aquí lo que no
      guste). Alcalde: «Don Yovoy Gofiérrez», bigote y traje negro. Se pueden reintentar al fallar y, si se guarda a
      mitad, al cargar empiezan de nuevo en su círculo (pruebas `prueba_misiones.py` y `prueba_misiones_guardado.py`).
      Apuntes originales (7-oct):
      - Aclarar en la historia que la **pistola es de bolas de plástico de aire comprimido** (sirve en la misión siguiente).
      - **Atraco a una farmacia** (parodia): el primer ladrón se pelea contigo en la pelea 2D; el segundo huye y se sube a
        un coche: persecución hasta donde vaya y al final darle con la pistola de bolas para detenerlo. No es delito:
        recompensa y el alcalde nombra a la banda **defensora de la ciudad**.
      - **Ceremonia en el Ayuntamiento**: toda la banda y el alcalde; os nombra grupo especial de la Policía Local que
        se encarga de los problemas de la ciudad (a partir de aquí detener malhechores es legal).
      - Después, varias misiones con los miembros de la banda (detener malhechores, peleas, carreras, persecuciones)
        con las mecánicas que ya hay. Propuestas de Claude (para comentar):
        1. **«El carterista del Cristo»** (fiestas del Cristo, Plaza del Cristo): un carterista entre la gente; seguirlo
           a pie sin perderlo de vista y pelea 2D al acorralarlo. Con el miembro más rápido de la banda.
        2. **«Rally de La Esperanza»**: unos pijos hacen carreras ilegales por la Vía de Ronda; ganarles en una carrera
           por puntos de control y que se rindan. Al volante el «piloto» de la banda.
        3. **«Las ruedas del tranvía»**: unos gamberros pintan el tranvía en Las Mantecas; llegar antes de que se
           escapen (contrarreloj en coche) y atrapar a dos (persecución a pie + pistola de bolas).
        4. **«Guagua secuestrada»** (broma): un bromista se lleva una guagua vacía por la autopista; seguirla, ponerse
           delante y frenarla (con el freno de mano nuevo) sin destrozarla.
        5. **«El gofio robado»**: desaparece la reserva del molino (parodia); buscar pistas por el casco (diálogos con
           vecinos), pelea en un almacén del polígono y vuelta con la carga en furgoneta sin volcarla.
        - **Alcalde** (Jonay): personaje propio del juego, no una caricatura de una persona real (Claude no hace
          parodias reconocibles de personas reales). Propuesta: **Don Yerai Gofiérrez**, alcalde ficticio de traje
          oscuro, barba recortada, banda y bastón de mando; encarga misiones para «mejorar la ciudad»:
          a) baches de la Vía de Ronda: llevar al equipo de asfaltado contrarreloj; b) recuperar los bancos robados
          de la Plaza del Adelantado; c) escoltar en coche la guagua del Romero; d) carrera solidaria por el casco.
        6. **«Noche en el aeropuerto»**: contrabandistas de queso en Los Rodeos; colarse por la valla, perseguir una
           furgoneta por las vías de servicio y detenerla. Cierre de la tanda: el alcalde os da el coche patrulla de la
           banda (rotulado con el nombre que elegisteis).
- [~] ● v0.72.0 (Casa Salazar entera por fuera; el patio solo se ve desde la puerta, no se entra) **El Obispo y el Obispado** (Jonay, 12-oct; v0.65.0: obispo y portada del Obispado hechos; falta recrear la casa entera y el resto del pack): nuevo personaje, el obispo de Tenerife, con **nombre parodia
      inventado** y aspecto propio. Su sede es la **Casa Salazar** (C. San Agustín; fotos en
      `docs/referencias/casa_salazar/`: fachada de cantería gris oscura, portada con columnas pareadas y frontón con
      escudo, balcones de forja, rejas con crestería, remates con pináculos, patio interior con galería): recrearla bien.
      Pack de **misiones secundarias** que se desbloquea a la vez que las del alcalde; no hacen falta para acabar el juego
      («solo si eres religioso»), pero dan dinero: mejoras en las iglesias que ya hay (Catedral, La Concepción, Santo
      Domingo, El Cristo…), p. ej. apagar un incendio con la escopeta de agua.
- [ ] ● **Reubicar las misiones por zonas, con sentido de avance** (Jonay, 2-nov: «hay que reordenar las misiones y acotarlas por zonas, de manera que te vayan llevando por el mapa y avances sin tener que ir de punta a punta… más que reordenar, reubicar para que tenga un sentido de avance»).
  - Hacer primero el mapa de dónde ocurre hoy cada misión (inicio, objetivos, entrega) y proponer a Jonay un recorrido por zonas: casco → Trinidad / Padre Anchieta → San Benito / La Verdellada → Ofra / Autopista → aeropuerto / Geneto…, cada tramo de la historia en un barrio y el siguiente al lado. `src/12_missions.js`, `src/12f_story2.js`, `src/12g_obispo.js`, `src/12k_agua.js`.
  - Jonay (3-nov): «importantísimo, una vez corregidos los edificios, glitches gráficos y demás»; que vayas conociendo la
    ciudad poco a poco sin ir de esquina a esquina nada más empezar. Ejemplo con captura del mapa: la de los **bancos de
    Gofiérrez** te manda desde Las Gavias (X −1235, Y −227) hasta la Casa de la Alhóndiga (X 106, Y 32), media ciudad.

### Tiendas y edificios del casco

- [ ] ◐ **Aparcamiento privado de un edificio que sale como plaza abierta** (Jonay, 3-nov, X −118, Y 311, junto a la Av.
  de La Trinidad, captura: «este hueco también está fatal; creo que es un parking privado de un edificio y tiene un muro
  y una entrada para aparcar coches, pero así se ve raro»): una explanada empedrada entre edificios con una maceta en
  medio. Cerrarlo con su muro y una puerta de garaje (o una rampa de entrada), con asfalto o plazas pintadas dentro; mirar
  en el OSM si es `amenity=parking` + `access=private` y hacer lo mismo en todos los parkings privados.

- [ ] ◐ **Pasillos estrechos entre casas que no existen** (Jonay, 3-nov, X 38, Y −1, junto al Ayuntamiento, captura:
  «este hueco está raro… por ahí no te deberías poder colar al otro lado; veo muchos huecos de este estilo entre casas que
  no existen en la realidad»): entre dos edificios pegados queda una rendija de 1–2 m por la que se ve y se pasa a la
  manzana de atrás. Sale de que cada edificio se dibuja 0,75 m metido hacia dentro de su planta (`insetPoly` en
  `buildBuildings`) y de plantas del OSM que no llegan a tocarse. Regla: donde dos edificios vecinos dejan entre ellos un
  hueco de menos de ~3 m que no es una calle ni un camino del mapa, cerrarlo (estirar las fachadas hasta juntarse o poner
  un muro a la altura de la planta baja, con choque). Contarlos con una sonda en todo el mapa y fotos.
- [ ] ◐ **Edificio que se mete en la calzada del Camino del Cañaveral** (Jonay, 3-nov, X 234, Y −773, captura: «este
  edificio sí que invade raro… ¿no está detectado?»): una casa baja blanca con la esquina en zigzag ocupa media calzada. No
  es de los del Catastro nuevos (es del OSM). Mirar si sale en las invasiones de la auditoría (`mapa.md`) y por qué el
  recorte no la quita (la calle puede estar desplazada en el OSM o la casa entrar justo en el límite del recorte).
- [~] ◐ v1.0.4 (tapias encaladas donde no hay casa; el Catastro no tiene edificios dentro: son patios) **Huecos que no existen: Callejón Montaraz** (Jonay, 3-nov, X −896, Y −348 y X −923, Y −322, capturas del juego,
  Street View «2 C. Montaraz» y vista de satélite): en el juego hay una explanada empedrada enorme y se ve la calle de un
  lado a otro; en la realidad la manzana entre Av. de Lucas Vega, C. Montaraz, C. Marqués de Celada y C. Teobaldo Power
  está llena (casas, el Mercadona, Edif. La Carreta) y a la calle da una **tapia alta** continua. Puede haber patios
  dentro, pero desde la calle no se ven. Es justo donde va la primera misión de las bolas (los ladrones de Guacimara).
  Mirar con `sonda_hueco.py` si es el OSM o el recorte, y rellenar con casas y la tapia.
- [~] ● v1.0.4 (~11.900 partes del Catastro añadidas donde el OSM no tenía nada; falta mirarlo con Jonay por zonas y unir las partes de una misma casa) **Repasar los edificios del mapa con mejores fuentes** (Jonay, 3-nov: «hay muchos huecos que no existen en la
  realidad… estoy seguro de que hay imágenes por satélite de todo en GRAFCAN»): el OSM tiene manzanas sin edificios
  dibujados. Fuentes a mirar: el **Catastro** (planta de cada edificio, datos abiertos INSPIRE, con nº de plantas), la
  cartografía y ortofoto de **GRAFCAN / IDECanarias**. Plan: bajar las plantas del Catastro de la zona del mapa, comparar
  con el OSM manzana a manzana y añadir las que faltan (con la altura de sus plantas); fotos de comprobación desde la
  calle. Va antes que las misiones por zonas.
  - v1.0.4 (en marcha): `tools/catastro.py` (orden «catastro» del trabajador) baja los edificios INSPIRE del Catastro de
    La Laguna (planta y plantas de cada parte) a `data/catastro_bu.json`, en coordenadas del juego, para compararlos.
- [~] ● v1.0.4 (los del OSM, ~83 km, con choque; tapias en las manzanas del inicio; faltan los recintos que el OSM no tiene) **Muros, tapias y vallas que rodean jardines, solares y recintos como la Universidad** (Jonay, 3-nov: «además de
  los edificios hay que repasar muros y vallas/cercas que rodean jardines y zonas como la universidad»): el mapa no trae
  ninguno (la descarga del OSM no pedía «barrier»), por eso se ven explanadas abiertas donde hay tapias (Callejón
  Montaraz). Bajar los muros, vallas y setos del OSM (`tools/barreras.py`, orden «barreras» → `data/barreras.json`) y
  pintarlos con su altura y material (tapia encalada, muro de piedra, valla metálica, seto) y con colisión; donde el OSM no
  tenga, cerrar los recintos (Universidad, colegios, jardines) con la valla que se vea en las fotos.
- [ ] ◐ **Plaza de la Concepción / C. Obispo Rey Redondo (entre La Concepción y el Teatro Leal)** (Jonay, 3-nov, X −404,
  Y −290, captura del juego y 4 de Street View): en la realidad hay **jardineras de piedra** bajas con árboles grandes
  (araucarias, pinos, dragos), flores, **bancos** de madera a su alrededor y la fuente en otro sitio; en el juego hay
  manchas verdes de «hierba rara» en el empedrado y dos árboles redondos. Quitar las manchas, poner las jardineras, bancos
  y árboles como en las fotos y mover la fuente. Guardar las capturas en `docs/referencias/plaza_concepcion_rey_redondo/`.
- [ ] ◐ **El «edificio amarillo» de esa plaza es una caseta modernista** (Jonay, 3-nov, 3 fotos): no es una casa, es una
  caseta blanca de unos 4–5 m (parece un antiguo transformador eléctrico) con arcos, molduras, pináculos labrados en las
  esquinas y una **torre de celosía metálica** encima; detrás, un **drago** grande. Hacerla así y quitar la torre amarilla
  con ventanas.


- [~] ◐ v0.76.0 (4 jugueterías con icono y compra con E: rifle y bolitas; falta recrear su fachada/escaparate o interior) **Jugueterías** (Jonay, 12-oct): recrear varias (mejor las que ya hay en el mapa); allí se compran **bolitas** para
      la pistola y otras armas: **escopeta de agua** (chorros de agua; se recarga en **fuentes** repartidas por la ciudad;
      necesaria en misiones como el incendio del Obispado). Por ahora no hay más armas.

- [ ] ◐ **Manzana vacía junto al Teatro Leal** (Jonay, 3-nov, X −301, Y −262, con captura: «aquí falta ciudad, es una calle
  estrecha, no hay ese espacio»): no la ha quitado el recorte (`sonda_hueco.py -301 -262 70`: ningún edificio quitado ahí);
  en el OpenStreetMap esa manzana entre C. Núñez de la Peña, C. Obispo Rey Redondo y C. Alcalde Alonso Suárez Melián no
  tiene edificios dibujados, y el juego la pinta como una plaza empedrada. Rellenarla con casas del casco (como
  `trinidadFill` en la Av. de La Trinidad), con referencias de Street View si Jonay las pasa.
- [ ] ◐ **La plaza elevada junto a La Concepción** (3-nov: el OSM tiene ahí la valla de su barandilla, que en la 1.0.6 ya se pinta de barrotes, pero a ras de suelo) (Jonay, 2-nov; 8 capturas en `docs/referencias/concepcion_plaza/`: Plaza del Dr. Olivera n.º 6–10 y C. Hermanos Marrero 8–16): falta el jardín que rodea la iglesia por ese lado, alzado ~1 m sobre la calle.
  - Muro de contención ocre/naranja con remate de piedra, barandilla de hierro encima, pilares de piedra con jarrones en las esquinas y junto a la puerta, escalinata de piedra hasta la puerta lateral, césped con flores, palmeras altas, bancos y un pequeño parque infantil (balancín azul, valla de madera). `src/05o_concepcion.js`.
- [~] ● v0.78.0 (9 edificios más de la ficha con fachada y nombre: Alhóndiga, Riquel, Mustelier, Ossuna, Rodríguez de Azero, Cruz Verde, Plateros, Sabandeños, Cristino de Vera; sin situar: Dominicas, Oque Botino, Jesuitas, Casa Linares, Van Den Heede; lista en `docs/referencias/callejero/edificios.md`) v0.72.0 (PDF en `docs/referencias/callejero/`; Bencomo, Juan de Vera, Rodríguez Moure y Ascanio y Nieves pasan a calles con coches; la hoja 2 trae la ficha de 36 edificios para misiones) **Callejero oficial en PDF** (Jonay, 12-oct): https://turismo.aytolalaguna.es/wp-content/uploads/2019/11/Callejero-La-Laguna-c.pdf
      Sirve para definir bien las **zonas peatonales** (las del empedrado; ahora hay calles donde se pasa en coche y el
      juego dice que son peatonales), tiene **información de edificios** para misiones y un dibujo en 3D bastante fiel de
      los edificios del casco. Bajarlo a `docs/referencias/` y usarlo en una tanda de mapa.

### Canchas y campos

- [ ] ◐ **Campos de fútbol y canchas vallados** (Jonay, 19-oct, captura en X 485 Z 728 y Street View de C. Arturo Vergara
      Rodríguez 2, La Verdellada): deben tener muro y valla alta alrededor con uno o dos accesos. Ahora están abiertos.
- [ ] ● **Canchas: repasar accesos y diseño de todas** (v0.76.0: Ríos Tejera rehecho; falta el Colegio Máyex y repasar las demás) (Jonay, 12-oct; v0.66.0: hecha la entrada por puerta en las
      encerradas y el Máyex): revisar una a una con `prueba_canchas.py` (lista y fotos) cuáles son públicas y cuáles de
      colegio, y mejorar su aspecto. Recrear mejor por fuera el **Pabellón Juan Ríos Tejera** (nave blanca, cubierta
      gris, valla morada; fotos en `docs/referencias/rios_tejera/`) y el **Colegio Máyex** (`docs/referencias/colegio_mayex/`).

### Calles, túneles, puentes, enlaces y aeropuerto


- [~] ◐ v1.1.3 (de nuevo ~11–12 s y 15–17 ms a 720p; la nota del código bajó de B a C: líneas largas) **Arranque y pintado más lentos desde la 1.0.4** (auditoría 1.0.8): arranque 11 → 14 s y pintar a 720p
  13,6 → 24 ms (en la auditoría; la sonda con la tarjeta daba 14–18 ms en la 1.0.4). Medir qué pesa: los muros (cortes por
  calzada, 0,75 m cada muestra), las tapias, los edificios del Catastro y el recorte de calles sobre rampas (`cutAware`).
- [~] ◐ v1.1.1 (valla metálica al final de las calles sin salida a menos de 18 m de una vía rápida) **Calle que acaba en la Vía de Ronda sin valla** (Jonay, 3-nov, X 498, Y −493, captura: «por aquí no se debería
  poder acceder a la Vía de Ronda, debería haber vallado»): una calle sin salida termina en el talud junto a la Vía de
  Ronda y se baja con el coche. Poner valla o bionda al final de las calles sin salida que dan a una vía rápida (autopista,
  autovía, Vía de Ronda) cuando no hay enlace, y con choque.
- [~] ◐ v1.1.6 (losa de puente con pretil bajo la calle donde cruza el tramo abierto de una trinchera de más de 3,2 m; falta mirarlo con fotos sitio a sitio) **Tramos abiertos de trinchera con una calle por encima** (v1.0.8, `sonda_rampas.py`): además de las rampas de los
  aparcamientos (arregladas en la 1.0.8), la sonda encuentra ~60 sitios donde una calle de verdad cruza por encima del
  tramo abierto de una trinchera o un paso inferior (Autopista del Norte X −1193, Y −28; Vía de Ronda X 537, Y 1371 y
  X 713, Y 1315; Av. de los Menceyes X 694, Y 1326; Camino La Rúa X 630, Y −1146; enlaces de la autopista X 1221, Y 2360…).
  Ahí la calle de arriba necesita una losa de puente (y la trinchera, cubrirse bajo ella), no un corte.
- [~] ◐ v1.1.9 (las calles que cruzan una trinchera poco honda la dejan a nivel; la rampa del parking de La Trinidad es de doble sentido y se puede salir por ella en coche —dentro del aparcamiento no hay tráfico—; quedan 5 sitios, en el Cristo y en X 140, Y −628, donde la calle de servicio del OSM entra en la rampa de un aparcamiento: ahí no se pinta la calle) **Ninguna calle puede pasar por encima de una rampa o un túnel que baja (en todo el mapa)** (Jonay, 3-nov, Plaza
  del Cristo X 256, Y −552, captura: «la entrada al parking tiene una carretera encima; hay que revisar dónde se crucen
  carreteras a distinto nivel en todo el mapa, esto no puede pasar nunca»): la calzada de la plaza se pinta a ras de
  suelo por encima de la rampa del aparcamiento subterráneo, que se ve partida por debajo. Hacer una sonda para todo el
  mapa que busque cada rampa, boca de túnel o paso inferior y las calzadas, aceras y plazas que la pisan a otra altura
  (hay `auditCrossings` en `__dbg`), con foto de cada sitio; y al construir, cortar la calzada de arriba donde abre la
  rampa (como `finalizeCuts` / `TCUTS`) o convertirla en un paso elevado con su losa si de verdad pasa por encima.
  - v1.0.8: recortadas las calles, aceras y plazas sobre el tramo abierto de las rampas de los aparcamientos.
  - Jonay (3-nov, aparcamiento de La Trinidad, X −78, Y 27, captura: «la entrada al parking de La Trinidad es muy estrecha
    porque una acera pasa por encima a los lados; eso toca hacerlo bien: en realidad la bajada también es salida, caben
    sobrados dos coches»): la rampa se hizo de un sentido y estrecha, y las aceras de los lados se montan sobre sus muros
    (las baldosas por encima del borde azul). Hacerla de doble sentido (dos carriles, ~7 m más los muros), con las aceras
    cortadas donde abre, y que los coches puedan salir por ella. `05m_parking.js` (`buildRamp`, opción `w`).
  - v1.1.4: la rampa «Trinidad Casco Histórico» pasa a 6,4 m (dos carriles) y las aceras de la avenida no se montan sobre sus muros; falta que los coches salgan por ella.
- [~] ◐ v1.1.1 (bandas de aparcamiento y plazas fuera de la calzada; falta que Jonay lo mire) **Marcas viales de más: líneas pegadas a las de separación y calles con 3 carriles que no los tienen** (Jonay, 3-nov,
  Calle Juana La Blanca X −932, Y −249, captura: «hay marcas viales al lado de las separaciones de carriles, y no me suena
  que esas calles tengan 3 carriles»): junto a cada línea discontinua sale otra línea más corta al lado, y la calle se pinta
  con tres carriles. Mirar cuántos carriles trae el OSM (`lanes`) y si el ensanche de la 1.0.0 (`WIDEN` / `narrowToGap`) ha
  añadido un carril o pinta el de aparcamiento como carril; las líneas dobles pueden ser las del carril de aparcamiento
  encima de las de separación.
  - Jonay (3-nov: «hay muchas zonas de 2 carriles que lo que tienen en realidad es 2 carriles y una fila de aparcamientos a
    los lados; eso está mal indicado, pasa en muchísimas calles; no sé si podemos sacar los aparcamientos de algún sitio»):
    el OSM tiene etiquetas de aparcamiento en la calzada (`parking:both`, `parking:left` / `parking:right` = `lane`, con
    `…:orientation` = `parallel` / `diagonal` / `perpendicular`) y el número de carriles (`lanes`). Plan: bajarlas con una
    orden del trabajador (como `barreras`) para ver cuántas calles de La Laguna las tienen; donde estén, pintar carriles +
    banda de aparcamiento con coches aparcados; donde no, una regla por tipo y ancho de calle (residencial ancha = un carril
    por sentido + aparcamiento a los lados) en vez de pintar tres o cuatro carriles. Otra fuente posible: los datos
    abiertos del Ayuntamiento (zonas de aparcamiento regulado).
  - Jonay (9-nov, 2 capturas en vuelo libre, X −268 Y 535 y C. Doctor Zamenhoff X −84 Y 401): «con los aparcamientos y el cambio de ancho de las calles las marcas viales están mal en muchos casos, pegadas a los aparcamientos en lugar de en el medio». En las dos capturas son calles de un sentido: la discontinua junto a los coches es la raya de la banda de aparcamiento (2,2 m desde el bordillo, `laneMkPart2`), no la línea central, y se confunde con ella; y los coches aparcados la pisan (van a 1,1 m del borde de la calzada, `buildParked`, pero el bordillo que se ve está más adentro). Por mirar: que la raya de la banda se distinga de la central (más corta, más fina o continua), que el coche quede dentro de la banda y, en calles de doble sentido con aparcamiento, que la central quede en el medio de lo que queda entre bandas.
  - Jonay (9-nov, otra captura, X 122, Y 374, junto a la Plaza de San Cristóbal, `docs/referencias/calles_119/dos_carriles_un_sentido_X122_Y374.png`): ahí, con aparcamiento a los dos lados, las marcas están bien, «pero en otras no está centrado»; y **en una calle de dos carriles del mismo sentido tiene que haber flecha en los dos carriles** (hoy solo sale en uno). Buscar con una sonda las calles con aparcamiento cuya línea central (o de carriles) no queda en el medio de lo que queda entre bandas.
- [~] ◐ v1.1.4 (los empedrados que se solapan, cada uno a unos mm; falta que Jonay lo mire) **Suelos que parpadean al correr (dos empedrados en el mismo sitio)** (Jonay, 3-nov, Plaza de La Concepción X −517,
  Y −289, 4 capturas: «hay suelos que dependiendo del fotograma hacen cambios y eso produce flicks cuando corres»): dos capas
  de suelo a la misma altura (la plaza, la calle peatonal y el bordillo de la acera que se solapan) se pelean por pintarse
  (z-fighting) y cambia cuál se ve según el fotograma. Buscar dónde se pisan las áreas peatonales con calles y aceras y dejar
  una sola, o separarlas unos centímetros con prioridad fija (`polygonOffset`).
- [~] ◐ v1.1.8 (talud de tierra de ~1:1,6 delante del muro de los terraplenes, donde hay sitio; falta que Jonay lo mire y, si no basta, subir el terreno de verdad) **Escalón de terreno en Camino San Francisco / San Honorato** (Jonay, 3-nov, X −720, Y 301 y X −730, Y 335,
  capturas): un salto brusco del terreno junto a la calzada y la glorieta; en la realidad la bajada es mucho más suave.
  Suavizar el terreno y la rasante ahí (y buscar otros saltos parecidos con el revisor).
  - v1.1.5 (sonda_calzadas): es el terraplén de subida al puente de la Av. República de Venezuela sobre la Autopista del Norte: la calzada va 4–5 m por encima del terreno y el muro cae de golpe. Hay que subir el terreno de alrededor en rampa suave (no solo el muro).
- [~] ◐ v1.3.2 (TF-13 en trinchera de 6,5 m con muros de basalto bajo el puente, sin subir la glorieta ni sus calles; TF-13 a 2 + 2 carriles —14,4 m, antes 17,2—, vías de servicio a un carril —5,2 m, antes 9,1 con raya— y anillo de la glorieta a 8,5 m; falta comprobarlo con fotos y en coche) **Glorieta de La Verdellada y carriles de la Vía de Ronda** (Jonay, 10-nov, X 775, Y 826 y X 738, Y 778, capturas del juego y de Google Maps: «la rotonda de la Verdellada hay que mejorarla, así como los carriles de vía de ronda»).
  - Real: la TF-13 pasa en trinchera bajo el puente que une la glorieta con C. Arturo Vergara / C. Emilio Gutiérrez Salazar; la glorieta, pequeña y con un árbol grande en medio, y las dos vías de servicio (un carril, mediana con palmeras) van a nivel de calle.
  - En el juego: la TF-13 a ras de suelo, y el puente, la glorieta y sus calles subidos 4–5 m sobre taludes verdes; isla con pretiles; vías de servicio de dos carriles.
  - Falta: el árbol de la isla y las palmeras de las medianas; que la trinchera siga hacia el norte como la real (muros largos); revisar si hay más tramos de la Vía de Ronda con los mismos anchos de más. Código: `src/04d_verdellada.js`.

- [ ] ◐ **Paso inferior de la Vía de Ronda bajo la glorieta de los Menceyes: muros que salen en medio de la vía del tranvía** (Jonay, 10-nov, X 720, Y 1335, captura: «este puente/túnel toca revisarlo, salen cosas en medio de la vía del tren, creo que son muros del túnel de debajo»).
  - La Vía de Ronda (vías 444 en túnel y 1022 que baja) pasa por debajo de la glorieta (anillo 2317/2318/2319/435, a nivel) y del tranvía; la boca abierta de la trinchera empieza en X 720, Y 1309 a 2,5 m y llega a 4,4 m en X 708, Y 1319, justo bajo el anillo y la vía: sus muros y pretiles asoman por encima.
  - Qué hacer: cubrir la trinchera (losa / túnel) en todo lo que pasa por debajo de la glorieta y del tranvía, y que los muros y pretiles de la boca no se dibujen dentro de una calzada o de la vía a nivel. Mirar también la entrada del otro lado (X 537, Y 1371, ya apuntada en «Tramos abiertos de trinchera con una calle por encima»).

- [~] ◐ v1.3.4 (las tres calzadas una al lado de otra: central de doble sentido a 1 + 1 carriles en trinchera bajo la glorieta, laterales de dos carriles a 8,9 m de su eje, ramales de un carril en los extremos; relieve del MDT del IGN en toda la zona, calles incluidas; `src/04e_fincaespana.js`) **Av. de los Menceyes entre Finca España y Villa Hilaria: carriles cruzados** (Jonay, 11-nov, X 1287–1732, Y 1591–1880, capturas del juego y de Google Maps: «se cruzan carriles, es un jaleo; cuando reconstruyas una zona aprovecha para ser más fiel a la malla de relieve»).
  - Falta: las medianas con palmeras (ahora son 1,5 m de asfalto entre calzadas) y las rayas de cebra / isletas de los extremos; la glorieta de Villa Hilaria (X 1874, Y 1937) no se ha tocado.

- [~] ● v1.3.3 (relieve del MDT de 5 m del IGN en las zonas con más diferencia: ladera noreste de San Roque a La Cuesta, barranco junto a la Carretera General del Norte y la montaña junto al aeropuerto, 25 000 celdas de la malla de 16 m; sin tocar el suelo a menos de 20 m de calles, tranvía y edificios; herramienta `tests/herramientas/mdt_zonas.py`, mapa de zonas en `docs/referencias/barrancos_zonas.png`) **Barrancos con el relieve real** (Jonay, 10-nov: «habrá zonas que no hay ni que tocar; vamos a centrarnos en las zonas donde hay más desnivel respecto a lo que tenemos»).
  - Falta: los barrancos estrechos dentro de la ciudad (Gracia junto al IES Domingo Pérez Minik, el de detrás de la Vía de Ronda) no caben en la malla de 16 m: harían falta trozos de malla más fina o bajar calles; y el sur (zonas 2, 3, 15: Taco y La Cuesta), con muchas calles dentro.

- [ ] ● **IES Domingo Pérez Minik y su entorno (Gracia): muros, calle sin salida bajo el puente, barranco y desnivel** (Jonay, 10-nov, X 774, Y 1365 y X 769, Y 1541, capturas del juego, de Google Maps y de Street View de C. Galaxia 12, C. Saturno 30, C. Neptuno 2, Av. de los Menceyes 108 y C. Prof. José Luis Moreno Becerra): «esto es un instituto y tiene muros alrededor; además por detrás del instituto hay una calle sin salida y pasa por encima la carretera, no como está; después de la calle sin salida hay un barranco; donde dice Brum Brum MotorSport es terreno que está por debajo».
  - Real: todo el recinto del instituto (edificio en forma de peine, canchas y aparcamiento) va cerrado con muros altos (de piedra basáltica o bloque, pintados por arriba de rojo, azul o con murales) y valla metálica encima; dos canchas grises de hormigón dentro del muro, no verdes ni naranjas. Entradas por la Av. de los Menceyes (puerta junto a la glorieta) y por C. Saturno.
  - Detrás (C. Clemencia Hardisson / C. Neptuno) la calle sin salida baja y pasa **por debajo** de la C. Prof. José Luis Moreno Becerra (puente), y después hay un barranco con muros y vegetación; la zona de Brum Brum MotorSport está más baja que la calle.
  - Juntar con el paso inferior de la Vía de Ronda bajo la glorieta (apunte de arriba, X 720, Y 1335), que está al lado: es la misma zona. Con el MDT de 5 m del IGN (ya bajado a `data/mdt/`) se puede sacar el barranco y el desnivel de verdad.
- [ ] ● **Ampliar el mapa por el norte** (Jonay, 3-nov): que entren **Mesa Mota** y la parte que une con la **Vía de
  Ronda**, y que el mapa acabe en la carretera que va a **Las Mercedes, Las Canteras y Tegueste** (esa es la última). Bajar
  la zona con `descargar_zona.ps1` + `merge_zona.py`, terreno incluido, y mover el borde (`08b_border.js`).

- [ ] ◐ **Aparcamiento subterráneo de La Trinidad: se ve todo blanco y al reanudar o cargar se sale «en la nada»** (Jonay, 3-nov; con la 1.0.3 no le ha vuelto a pasar lo de «la nada»; queda la cámara,
  X −166, Y 322, capturas): bajando la escalera del parking (con un coche encima) la cámara se mete en las paredes; al
  reanudar le mandó a otro sitio y, desde ahí, con el teletransporte y al cargar partida, solo se ve el cielo y el mar (la
  ciudad no se pinta; el minimapa en negro). Falta la consola (F12 / Ctrl+Mayús+J) con los errores en rojo para saber
  qué se rompe. La 1.0.3 protege el pintado para que un fallo de lo nuevo (`actorCull`) no deje la ciudad sin pintar.
- [~] ◐ v1.1.8 (los solares que rellena `trinidadFill` en un lado de la avenida salían girados al revés y se pintaban del revés: paredes hacia dentro; falta que Jonay lo mire) **Edificio con patio sin paredes por fuera junto a la Av. de La Trinidad** (Jonay, 3-nov, X −191, Y 366): se ven solo las
  fachadas de dentro y se choca con lo que no se ve. Sigue en la 1.0.3 con el recorte de la 0.99.8: viene de cómo se
  rellenan los solares de la avenida (`trinidadFill`, 05u_trinidad.js) o del OSM. Mirar con `sonda_hueco.py -191 366 50`.

- [~] ◐ v1.1.5 (bajo techo la cámara se acerca y se queda por debajo; falta que Jonay lo mire) **Cámara bajo tierra y en sitios cubiertos** (Jonay, 3-nov, Av. de La Trinidad X −199, Y 318, captura: «al entrar en el
  subsuelo de La Trinidad la cámara se pone medio loca; hace falta pulir eso en todas las zonas de subsuelo o debajo de
  otras, para que la cámara permita ver, y tenerlo en cuenta para dejar espacio»): la cámara se mete en el techo o en los
  muros y se ve el fondo marrón y piezas sueltas. Acercar la cámara y bajarla en túneles, pasos inferiores y bajo puentes
  (que no atraviese el techo), en todas esas zonas, y dejar altura libre suficiente al construirlas.
- [ ] ● **Túneles, puentes y trincheras: rehacerlos con continuidad** (Jonay, 9-nov, 3 capturas en `docs/referencias/calles_119/`: «hay que buscar una forma para que los túneles y puentes en general tengan mejor continuidad sin huecos; si es necesario los diseñamos de 0, porque se han ido amontonando cosas y no das con la solución»):
  - Salida a la autopista en San Honorato (X −998, Y 121, C. Eduardo Westerdahl): la calzada que baja a la trinchera y sus líneas pierden la continuidad y se amontonan (líneas que se cortan, trozos de calzada encima de otros, el muro con huecos).
  - Entrada al túnel (X −909, Y 45): carriles que no casan con la boca, la línea de borde que entra en curva, el techo del túnel como una losa suelta y paredes que no llegan.
  - Túnel de C. Timanfaya (X −1250, Y 9): aceras raras que se cruzan con la boca y el pretil, y dentro del túnel se ve todo muy raro.
  - Jonay (9-nov, X 146, Y 1259, `autopista_laterales_X146_Y1259.png`): la autopista se mezcla con los laterales («¿está más ancha de la cuenta?»). En los datos: los dos sentidos de la TF-5 tienen los ejes a 14 m y cada calzada mide 13,4 m en el juego (12 del OSM × 1,12), así que se tocan sin mediana; el ramal de al lado (eje a 7 m) y la vía de servicio (eje a 11 m, 9 → 11,7 m) se montan 3–4 m encima. Los anchos del juego no caben en el espacio que deja el OSM entre vías paralelas: hay que repartir el ancho del corredor (carriles × 3,5 m + arcenes, sin pasar del hueco que hay).
  - Jonay (9-nov): «los cruces, rotondas, puentes, túneles, en general hay que revisarlos para que tengan continuidad». Entra todo en el rediseño: cruces y glorietas como piezas propias a una sola altura, con las líneas parándose en su borde.
  - Jonay (9-nov, Av. Lora Tamayo X 207, Y 1091, `sentidos_cruzados_X207_Y1091.png`): «aquí se cruzan los dos sentidos»: las líneas de un sentido se meten en el otro, sin separación clara. Y **la autopista tiene que estar muy bien delimitada**: mediana y bionda continuas, sin que ninguna calle ni lateral se le meta encima, y que solo se entre y se salga por sus accesos y salidas (los ramales). Entra en los corredores: los dos sentidos de una vía desdoblada con su mediana o línea continua entre ellos, y la autopista cerrada salvo en sus ramales.
  - v1.2.0 en prueba (San Honorato): los dos sentidos de la bajada al ancho de su carril, a la misma altura y en una sola trinchera; suelo en toda la trinchera (se veía el mar por el hueco); losas con pretil para las aceras que cruzan una trinchera. Jonay (9-nov, 4 capturas `honorato_v2_*`): «mejor, pero sigue habiendo gente caminando por una acera rara, muro en medio de la carretera y cosas blancas en medio de la calzada; por el otro lado no une bien: la línea continua está a un lado y en el túnel en el otro, como espejado, y se ve azul un hueco… hay que buscar una técnica mejor para las uniones». Causa: cada trozo del OSM sigue haciendo sus muros, sus líneas (con el lado de la raya según hacia dónde va el trozo) y su agujero en el terreno; donde se juntan varios trozos quedan muros dentro de la calzada, rayas de la calle de arriba sobre la trinchera y huecos. Siguiente paso: la técnica de «tramos» (un solo objeto por grupo de trozos unidos: eje único, ancho que cambia de forma continua en las bifurcaciones, muros solo en el borde exterior de la unión, rayas según los carriles y no según el sentido del trozo, y un solo agujero en el terreno).
  - v1.2.0, «tramos» hecho en San Honorato (`corrBuildTramos`, `04c_corredores.js`): todas las vías hundidas de la zona son una sola pieza. Suelo, muros y agujero salen de la unión de sus huellas: rejilla de 1 m, distancia al eje menos el medio ancho, y el borde por *marching squares*. Así:
    - ya no quedan muros dentro de la calzada donde se juntan los trozos;
    - el agujero coincide con el suelo (las manchas azules eran trozos de suelo cortados por el agujero de otro trozo más hondo);
    - las rayas de la glorieta sobre la trinchera se cortan donde no hay losa;
    - el corte se para antes del techo del túnel;
    - las mitades de la vía desdoblada llevan sus líneas de borde (antes no tenían ninguna);
    - los trozos que siguen a una mitad estrechada toman su ancho.
  - **Método por zonas (Jonay, 9-nov):** antes de empezar cada zona nueva, pedirle a Jonay capturas en 3D de Google Maps de la zona («cuando vayas a acometer una zona me pides fotos»), para recrearla de una pieza tal como es. Las de San Honorato están en `docs/referencias/calles_119/honorato_google_3d*.png`.
  - Jonay (9-nov), sobre esas capturas: «trata de poner las marcas viales bien aprovechando la foto y la unión con las calles alrededor»; y «todas estas fotos deberían ser referencia para guía de los colores de los edificios y formas» (usarlas también al revisar fachadas y volúmenes de la zona).
  - Con las fotos 3D de Jonay (`honorato_google_3d_*.png`, 9-nov): el paso inferior es **una sola calle de doble sentido con dos carriles**. Sale del lazo este de la doble glorieta (C. Espinero / Cam. el Vallado), pasa bajo la TF-5 y llega a la glorieta de C. San Antonio, junto a la estación. El OSM la parte en dos mitades de un sentido en la bajada norte. Siguiente paso: dibujarla de una pieza como en la foto, con un solo eje de doble sentido (línea central y bordes) que enlace con las dos glorietas y sus pasos de cebra; quitar el pavimento del suelo sobre la trinchera (hecho v1.2.0: «ahí sobra esa acera»).
  - v1.2.0 (9-nov, tarde), hecho en San Honorato:
    - la bajada norte es una sola calle de doble sentido con raya central continua (`corrMergeHalves`);
    - muros de basalto con barandilla y acera a la derecha bajando, también dentro del túnel;
    - alturas del suelo suavizadas;
    - sin peatones por encima de la trinchera;
    - flecha y «X» en el carril de bajada;
    - glorietas de la zona (`corrRoundaboutMarks`): línea junto a la isleta, borde exterior abierto en cada calle, línea discontinua entre carriles y pasos de cebra en cada calle que llega a la glorieta.
    - Falta: que los peatones bajen por la acera de la trinchera (hoy caminan a la altura del terreno), y los pasos de cebra en el resto del mapa.
  - **Zona siguiente: Los Rodeos / TF-5 junto al aeropuerto** (Jonay, 9-nov; X −3138, Y −191 y X −3340, Y −316; capturas y Google 3D en `docs/referencias/losrodeos/`): «un poco mejor, pero hay muchas cosas mal, especialmente la separación de los carriles».
    - Cómo es en realidad: la TF-5 pasa en trinchera bajo un puente. Junto a ella hay un lazo de enlace con isleta de tierra y árboles, y al otro lado la Carr. Gral. del Norte (TF-152), separada por una mediana. La Rotonda Los Rodeos está al norte, y abajo la Carr. Campo de Golf (TF-235) con una minirrotonda junto a las oficinas de Aena.
    - En el juego: los sentidos y los ramales se mezclan; la isleta del lazo es un parque con muro; la minirrotonda tiene aceras rotas y es un mar de asfalto.
    - Siguiente zona de «tramos», después de San Lázaro.
  - **Zona: Rotonda del Padre Anchieta / Glorieta del Brasil y la pasarela** (Jonay, 9-nov; X −390, Y 646; capturas, Google 3D, GRAFCAN y Street View en `docs/referencias/anchieta/`): «las líneas de la carretera y la autopista hacen curvas raras; hay que ajustarla para que cuadre todo mejor».
    - Fijarse en las marcas viales de la foto de GRAFCAN. Falta el «pico», una gran explanada peatonal en la parte superior derecha de esa foto, de la que baja una rampa a la Av. Trinidad.
    - En el OSM el anillo son 12 trozos `primary` de 13 m, con el centro en X −338, Y 730 y radio 46 m. Lo cruzan la TF-5 en trinchera (1265/1279/2293 y 1275/1276/1285), los ramales 347, 2200, 2289, 2333, 2821 y 2822, y la Av. Trinidad (371, 2376, 2847).
    - Siguiente zona de «tramos», junto con el puente de San Lázaro (barandilla de piedra) y Los Rodeos.
  - **Cuestas de golpe en el Camino del Púlpito** (Jonay, 9-nov; X −3192, Y −341; captura `docs/referencias/sanlazaro/pulpito_cuesta.png`): «de golpe hiciste súper carreteras empinadas… debe ser todo más gradual desde mucho más atrás».
    - No es de los tramos: el relieve del juego no ha cambiado (el mismo mapa de alturas de siempre).
    - Ese mapa es de 16 m y tiene escalones: valores repetidos en 3–4 celdas seguidas, y luego saltos de 15–20 m en 20 m (de Y −340 a Y −380 sube unos 34 m).
    - Arreglo: el MDT de 5 m del IGN (ya apuntado en «Barrancos y arbolado con la cartografía real»). Mientras tanto, se pueden suavizar las calles con una pendiente máxima: rebajar o levantar el terreno bajo ellas.
  - **Zona: Av. Lora Tamayo y el Puente Cruz de Piedra sobre la TF-5** (Jonay, 9-nov; X 159, Y 1312 · X 200, Y 1207 · X 91, Y 1328; capturas y Google 3D en `docs/referencias/loratamayo/`): «el puente de Cruz de Piedra no está mal, pero luego la avenida es una locura; las marcas viales están fatal, y las separaciones de carriles; las rotondas también están raras».
    - Cómo es en realidad:
      - el enlace de la TF-5 tiene dos lazos con isletas de tierra y árboles, el puente Cruz de Piedra y una glorieta a cada lado del puente;
      - la glorieta sur, junto al edificio redondo de Oceanocan, tiene la isleta con piedras y pasos de cebra en cada entrada;
      - la Av. Lora Tamayo es una avenida de dos sentidos con mediana estrecha: dos carriles por sentido, con flechas, pasos de cebra y aparcamiento en batería en el lado este;
      - el ramal de bajada pasa junto al colegio con un muro azul.
    - En el juego:
      - las glorietas tienen isleta con muro y barandilla;
      - la avenida tiene rayas que se cruzan y carriles mezclados;
      - salen vallas sueltas sobre la calzada.
  - **TF-5 entre Lora Tamayo y Geneto** (Jonay, 9-nov; X 138, Y 1257 · X 200, Y 1341; capturas y Google 3D en `docs/referencias/loratamayo/tf5_geneto_*`): «esta parte de la autopista está fatal, es mucho más recta; los túneles de más adelante están bastante bien, pero no sus accesos y salidas, y mucho menos las marcas viales y las separaciones».
    - Cómo es en realidad: la autopista va recta, con mediana de New Jersey. Los carriles de deceleración y aceleración salen en paralelo con cebreado en V y una raya discontinua. Hay glorietas a cada lado sobre el talud y los ramales van entre muros de roca.
    - En el juego: los ejes ondulan (los empuja `separateCarriageways`), las rayas se cruzan, hay vallas entre los ramales y la autopista, y los ramales se pisan con las calles paralelas.
  - **Pabellón Santiago Martín (CB Canarias) y la salida de la TF-5 antes del HUC** (Jonay, 9-nov; X 1771, Y 3085; Google 3D y Street View en `docs/referencias/santiagomartin/`): «falta hacer el pabellón del CB Canarias, Santiago Martín, y esa salida de la autopista antes del hospital cuidarla más».
    - El pabellón: un cilindro con cúpula blanca baja y fachada de lamas grises, sobre un zócalo de bloque con el rótulo «Pabellón de Deportes de Tenerife Santiago Martín» y un cuerpo azul con ventanas. Por fuera lleva una estructura de pórtico metálico y escaleras, y a un lado una gran lona publicitaria (parodia). Calles alrededor: C. Las Mercedes, C. Garafía y C. Las Macetas.
    - La salida: un carril de deceleración paralelo, con cebreado, que baja a una glorieta pequeña (la «rotonda de la Hamburguesa», junto a Jardín Osorio). La mediana de la TF-5 es de New Jersey con plantas.
  - v1.2.0 (10-nov), tramo 1 de la TF-5 hecho, de Lora Tamayo al HUC (`corrMotorwayStraighten`, `prueba_121`):
    - un solo eje suave, cada sentido a su lado a 7,9 m y con un solo ancho (13,4 m); entre ejes, 14,8–15,8 m;
    - los carriles de aceleración y deceleración van paralelos y pegados, con raya discontinua en el lado de la autopista;
    - 22/22 pruebas OK, conducción incluida.
    - v1.2.3–1.2.4: puente de Guajara de una pieza (doble sentido, aceras, pretil); la TF-5 recta bajo el puente: la Autovía de Interconexión (TF-2) entraba en el eje y lo torcía 9 m justo ahí, que es lo que hacía que los ramales y las calzadas se cruzaran.
    - v1.2.9: el tramo recto sigue pasado el HUC hasta el borde del mapa (Santa Cruz); la bajada del pico de Anchieta va al lado de las vías que no pisa la calzada (`PASARELA.pico.lado`).
    - Falta: la salida antes del HUC con su glorieta (en el juego ya baja un ramal a la glorieta pequeña, con cebreado; falta que Jonay diga qué ve mal) y ampliar el tramo hacia San Honorato y hacia Santa Cruz.
  - Queda por ver con Jonay: la boca sur (X −908, Y 47) une una vía de un sentido de 3 carriles (13,4 m) con un túnel de doble sentido (10,4 m) según el OSM, así que las rayas siguen sin casar del todo. Pendiente también: aceras que cruzan donde la trinchera es poco honda (sin losa).

  - Decidido (Jonay, 9-nov): rehacer por zonas, empezando por San Honorato (X −998 Y 121), la boca de X −909 Y 45, C. Timanfaya (X −1250 Y 9) y la autopista con laterales (X 146 Y 1259); cuando le guste, al resto del mapa. Base nueva: (1) juntar los trozos del OSM en recorridos continuos; (2) un perfil de alturas por recorrido en vez de los parches (hundir, levantar, seguir, topes); (3) una sección que se transforma de forma continua (calzada, líneas, aceras, muros, pretil, techo); (4) cruces y glorietas como piezas a una altura; (5) corredores de vías paralelas con el ancho repartido; (6) una prueba que mida escalones, solapes, huecos y líneas cruzadas con foto de cada sitio (`sonda_solapes.py`, `sonda_alturas.py`, `sonda_calzadas.py`).
- [~] ◐ v1.1.9 (Vía de Ronda X 309: el ramal de subida sigue a la vía donde sus calzadas se pisan; calles repetidas del OSM —dos copias de la misma vía— quitadas al cargar; los quiebros de la Av. de La Trinidad no se ven ya en las fotos: falta que Jonay lo mire) v1.1.4 (San Honorato: líneas de la trinchera cortadas donde se junta con la glorieta; Vía de Ronda X 309: el ramal de bajada sube con la vía elevada; queda el ramal de subida, que está más alto que la vía y habría que bajar el terreno, y los quiebros de la Av. de La Trinidad) **Calles en zigzag y marcas que se quiebran** (Jonay, 3-nov, Av. de La Trinidad X −147, Y 220, captura: «las
  carreteras no pueden ser tan angulosas, y menos las marcas viales»): el carril de la avenida y su acera hacen quiebros
  bruscos (puntos del OSM movidos al separar sentidos o al ensanchar). Suavizar el trazado (curvas con radio mínimo, puntos
  intermedios) antes de dibujar calzada, aceras y líneas.
  - Jonay (3-nov, otra captura, Calle Eduardo Westerdahl X −988, Y 114, bajando hacia la glorieta de San Honorato: «esto
    está rarísimo, se siguen metiendo carreteras unas debajo de otras, no son un continuo»): varias vías del OSM que llegan
    a la vez a la glorieta se pintan cada una con su calzada y sus líneas, unas encima de otras, y las líneas salen partidas
    en zigzag. Hace falta juntar en una sola calzada las vías que se solapan (calzada única con sus carriles) antes de pintar
    líneas, y no pintar las líneas de una vía por dentro de otra.
  - Jonay (3-nov, Vía de Ronda X 309, Y −40, captura: «otra superposición fatal de calles»): en el enlace la calzada de
    un ramal se monta sobre la principal con un escalón y las líneas se cruzan.
- [~] ◐ v1.1.1 (sin plazas de los aparcamientos del OSM sobre la calzada) **Plazas de aparcamiento pintadas sobre los carriles** (Jonay, 3-nov, Calle el Juego X −259, Y 47, captura:
  «confundes carriles con espacios de aparcamiento»): rayas transversales de aparcamiento dentro de la calzada por donde
  circulan los coches. Que las plazas solo vayan en el carril de aparcamiento (junto al bordillo), nunca en los de paso.
- [~] ● v0.99.6 (pasos inferiores cortos con la carretera de encima en terraplén, STOP solo en la incorporación, carriles de aceleración y deceleración, líneas en puentes, techo del intercambiador recortado) v0.99.5 (líneas por carriles, bionda en los bordes, sin aparcados en la autopista) **Marcas viales, arcenes y medianas de la autopista, la Vía de Ronda y sus enlaces** (Jonay, 27-oct: «las carreteras con cruces son un lío»; 15 capturas: X 386 Z −276, X 1534 Z 2739, X 1775 Z 3165, X −546 Z 470…):
  - Falta: mirar con Jonay las fotos nuevas de los 15 sitios (`tests/shots/v2_*.jpg`) y los cebreados pintados en las narices de las salidas.
- [~] ◐ v0.78.0 (repasado con fotos de glorietas, enlaces y la Autopista del Norte: las rayas en las entradas de las glorietas son las de ceda el paso, están bien; no se ve nada cruzado) v0.73.0 (ramales de un sentido sin línea central) v0.70.0 (sin líneas donde una calle está dentro de otra: cruces, incorporaciones, glorietas; mirar las fotos `faciles_*`) **Marcas viales** (apunte de Jonay): con los puentes y cruces hay líneas que se cruzan por todas partes; también
      en salidas e incorporaciones (autopista, Vía de Ronda) y en las glorietas.
- [~] ◐ v0.78.0 (marquesina grande de la terminal sobre el carril de dejar pasajeros) v0.72.0 (rotonda-cúpula, depósitos, naves con carteles, P, valla y aviones despegando/aterrizando hechos; mirar fotos `grandes_aeropuerto_*`) Aeropuerto: afinar con las fotos (rotonda-cúpula, depósitos de combustible, naves SEUR/ITV/Binter, P de
      parking con rótulos, valla perimetral) y aviones despegando/aterrizando de vez en cuando.
- [~] ◐ v1.1.9 (soportales en toda la acera de los impares: planta baja 2,8 m hacia dentro con las tiendas al fondo, pilares a la línea de la acera, techo y colisiones; falta que Jonay lo mire y lo de las rampas Indigo) **Av. de La Trinidad: soportales a lo largo de todo un lado** (Jonay, 2-nov; 20 capturas de Street View en `docs/referencias/av_trinidad/soportales_*.png`: impares n.º 1 a 61, pares 6 a 58 y, con soportales también, los pares 68 y 76; el 59 y el 74 son el cruce de Pedro Zerolo): «en La Trinidad es todo por un lado como una especie de paso bajo los edificios para los peatones que no está representado… además esto deja más espacio para las entradas del parking».
  - Hoy solo hay soportales en el bloque del Dialprix y en el n.º 76 (`src/05u_trinidad.js`, «soportales»). Hacerlos en toda la acera de los impares (pilares a la línea de la acera, la planta baja metida 2–3 m con las tiendas al fondo), y aprovechar ese hueco para que las rampas Indigo (n.º 3 y 59) tengan sitio.
- [~] ● v0.78.0 (muros de la trinchera de basalto oscuro) v0.72.0 (rotonda partida en trinchera con dos túneles de bóveda bajo la TF-5, accesos en rampa, chalets de Guajara; mirar las fotos `grandes_tf13_*`) **TF-13 / Cam. San Bartolomé de Geneto / Urbanización Guajara** (junto a la TF-5, Museo de la Ciencia y el
      Cosmos): la zona está «fatal». Real: la TF-13 baja en trinchera con muros de piedra y pasa bajo la TF-5 por dos
      túneles de bóveda que salen a una rotonda partida; vía de servicio «C. dos Autopista Parl.», Cam. San Bartolomé
      de Geneto en curva, Urb. Guajara (chalets de tejado rojo), Plaza Drago de Antares, C. Lira / Hércules / Habaneras,
      Cam. La Hornera con el Museo de la Ciencia y el IAC. Fotos en `docs/referencias/tf13_geneto/`.
- [ ] ● **Ampliar el mapa por el sur, por la Carretera General de La Cuesta, con su tranvía** (Jonay, 27-oct; 10 capturas
  de Street View en `docs/referencias/la_cuesta_tranvia/`): al menos 300 m más al sur, paralelo a la Carretera General
  La Cuesta, con el tranvía por el centro (vía sobre césped, postes de catenaria, parada «La Cuesta» con marquesina).
  Viene saliendo de un túnel (bajo el puente de la autopista, junto al Hospital Universitario) y termina en La Cuesta.
  - En las fotos: calzada de un carril por sentido a cada lado de la plataforma del tranvía, cruces con «prioridad
    tranvía», gasolinera DISO (nº 108), naves y el Lidl hacia el final.

### Coches y tráfico


### Casas, personaje y vida social

- [ ] ◐ **El pisito alquilado, más grande y con habitaciones** (Jonay, 3-nov: «la casa alquilada debería ser un poquito más
  grande por dentro y tener zonas separadas: la habitación, la zona de estar con la tele, un baño y una cocina, que si
  quieres la hacemos junto a la zona de estar, con las cosas necesarias»): dormitorio (cama, mesillas, armario, lámpara),
  salón-cocina (sillones, tele con la GOFIO-8, mesa, estantes y armarios de cocina, nevera, fregadero), baño (retrete,
  lavabo, ducha) y en general cuadros, alfombras, lámparas, plantas. Puertas entre zonas. `12l_casa.js`.
  - Jonay (3-nov): «el personaje no puede meterse dentro de los muebles; deja huecos suficientes para moverse por la casa».
    Todos los muebles con choque y pasillos de al menos ~1 m entre ellos.
- [ ] ● **Vida en casa: usar las cosas** (Jonay, 3-nov: «que permita sentarte, dormir, usar el baño, lavarte, ducharte, hacer
  caca/pipí, cocinar, comprar cosas en supermercados para meter en la nevera que luego comer para recuperar salud y esas
  cosas, no solo jugar a la consola»): con E junto a cada mueble: sentarse (sofá, sillas), dormir (pasa el tiempo hasta la
  mañana y guarda partida), retrete, lavabo, ducha, cocinar. Compra en los supermercados (parodias que ya hay): los
  productos van a la nevera de tu casa; cocinar o comer de la nevera recupera salud (más que la comida de la calle y más
  barato). Cada acción con una animación sencilla o un fundido a negro con texto gracioso.
- [ ] ● **Recrear todas las casas según su precio** (Jonay, 3-nov: «las otras casas tienen más habitaciones, patio, etc.
  según su calidad; hay que recrearlas todas; la más cara debe tener una piscinita con jacuzzi donde invitar a tus ligues»):
  cada casa de la inmobiliaria con su plano (más habitaciones, patio, terraza…), y la más cara con piscina pequeña y
  jacuzzi.
- [ ] ● **Hacer amigos y pareja** (Jonay, 3-nov: «habrá que hacer una forma en el juego para que puedas hablar con NPC
  chicas o, si el jugador lo prefiere, chicos, para ir haciendo amigos que pueden llegar a ser novios si les complaces en
  minimisiones»): conversación con algunos NPC con nombre, elegir en opciones si te interesan chicas, chicos o ambos,
  medidor de amistad que sube con minimisiones (llevarle algo, acompañarle, una cita en un bar, una carrera…), y al
  final pareja; se le puede invitar a casa (el jacuzzi). Sin contenido sexual explícito (fundido a negro, como los GTA).
  - Pubs y bares de copas para conocer gente (Jonay, 3-nov: «habrá que hacer pubs donde te puedes relacionar»): unos
    cuantos locales de noche con interior (barra, mesas, pista, música de la radio), abiertos de noche, con gente con la que
    hablar; ahí empiezan la mayoría de las amistades y las citas.
  - Niveles de la relación (Jonay, 3-nov: «un sistema de amistad con estos ligues que te permita acabar siendo novios e
    invitarlos de party a tu jacuzzi o casa cuando tengas»): conocido → amigo → cita → pareja, con su medidor (sube con las
    minimisiones y las citas, baja si les fallas). Desde amigo se les puede invitar a casa; con casa propia, organizar una
    fiesta (varios amigos, música, el jacuzzi en la casa cara). Se ven en el diario con su nivel.
- [ ] ● **Crear tu personaje al empezar** (Jonay, 3-nov: «un generador de personaje inicial que permita sexo masculino y
  femenino y elegir entre los distintos cuerpos que ya tenemos para los NPC, así como poner barba, tipos de pelo, etc.»):
  pantalla al empezar partida con cuerpo de hombre o de mujer, complexión (las que ya tienen los NPC), cara, pelo, barba,
  color de piel y ropa, y la altura (solo se elige aquí).
  - Nombre (Jonay, 3-nov: «el nombre es el que elijas, pero se propone El Chopa o La Chopa; esto lo podrás cambiar»): campo
    de nombre que viene relleno con «El Chopa» o «La Chopa» según el cuerpo elegido, y se puede cambiar (también después,
    en opciones). Todos los diálogos, la pelea 2D («EL CHOPA») y los textos usan el nombre elegido y el género (él/ella,
    -o/-a), así que hay que pasar los textos de las misiones a plantillas.
  - Banda en femenino (Jonay, 3-nov: «si es personaje femenino, los amigos de la banda son chicas, con nombres parecidos a
    los actuales pero femeninos, sin que queden raros; por ejemplo Coco no me gusta que sea Coca porque parece la droga,
    pero se puede poner otro fruto y cosas así»): cuerpos de mujer para Boca Papa, Rayco «El Blanco», Coco y los demás de
    la banda, y nombres propios. Elegido por Jonay (3-nov): Boca Papa → **La Papita**; Coco → **Ana la Rana**.
    Propuesta pendiente de confirmar: Rayco «El Blanco» → Yaiza «La Blanca». Hacer la lista completa de personajes de la
    banda con su versión femenina antes de tocar textos.
- [ ] ● **Cambiar de aspecto en la ciudad** (Jonay, 3-nov: «usando esto tendremos barberías donde cortarte el pelo a nuevo
  look, clínicas de cambio de sexo, operaciones estéticas, liposucciones y gimnasios donde podrás cambiar tu cuerpo; la
  altura solo se elige al principio, el resto es modificable»): barberías/peluquerías (pelo y barba), clínica (cambiar el
  cuerpo de hombre a mujer o al revés, y retoques estéticos), clínica de liposucción y gimnasios (más fuerte o más
  delgado, con el tiempo y con dinero). Todo con el mismo editor del personaje inicial, con precio y parodia en el nombre
  del local; tratarlo con respeto (sin chistes a costa de nadie).

### Mobiliario urbano y objetos rompibles

- [ ] ◐ **Bancos, señales, farolas y papeleras con choque, y que se rompan si vas rápido** (Jonay, 3-nov, X −765, Y −536,
  captura con el coche atravesando un banco: «los bancos no se deberían poder atravesar, quizá sí destrozarse si vas rápido
  y si no, como poco, chocar… habrá que hacer algunos elementos rompibles, cosas no muy grandes como bancos, señales de
  tráfico y cosas así»).
  - Primero: inventario de lo que se coloca por la calle (bancos de plazas y parques, señales de tráfico, farolas,
    papeleras, contenedores, bolardos, macetas, mesas de terraza) y cuáles tienen ya choque (`COL.addCirc` / `addSeg`).
  - Todos con choque; los pequeños, rompibles: a poca velocidad el coche choca; por encima de ~30 km/h el objeto sale
    despedido o se rompe en trozos (física sencilla, unos segundos), el coche pierde algo de velocidad y queda roto en el
    sitio un rato (luego se repone). Las farolas y los semáforos, doblados en vez de rotos.
  - Que no estropee el rendimiento: los objetos siguen juntados en pocas mallas; solo el que se rompe se separa.

### Gente de la calle

- [~] ◐ v1.1.1 (fuera de las vías rápidas y de la otra calzada; falta cruzar solo por los pasos) **La gente no debe andar por la calzada ni por las autopistas** (Jonay, 3-nov, Autopista del Norte X −2517,
  Y −230, captura de noche con gente andando entre los carriles: «no debería haber NPC caminando por las autopistas ni por
  las calles en general; deberían buscar las aceras de los laterales para sus rutas»): los peatones van por el centro de
  la vía del OSM. Que caminen por la acera de un lado o del otro (desplazados medio ancho de calzada + ~1,5 m), que
  crucen solo en los pasos de peatones o en los cruces, y que no se generen ni anden por autopistas, autovías, enlaces
  ni la Vía de Ronda (sin acera). `09_peds.js` (rutas) y `WALKG` (`11_hud.js`, quitar de ahí las vías rápidas también
  para la gente).
- [~] ⚡ v1.1.0 (también las vías rápidas por su nombre; falta comprobar dónde los vio Jonay) **Ni coches aparcados en la autopista** (Jonay, 3-nov, justo después de la captura de la Autopista del Norte en
  X −2517, Y −230: «tampoco puede haber coches aparcados en la autopista»): la 0.99.5 los quitó de la autopista, pero
  siguen saliendo (en esa zona, o en vías que no se llaman «motorway» en el OSM: `trunk`, enlaces, Carretera General del
  Norte, Vía de Ronda). Quitar las plazas de aparcamiento de todas las vías rápidas (`07_vehicles.js`, `PARKED`) con la
  misma lista que usa el GPS (`fastRoad`), y comprobarlo con una sonda que cuente aparcados por tipo de vía.

- [ ] ● **Niños por la calle** (Jonay, 3-nov, con una tabla de población: menores de 10 años 8,5 %, mujeres de 10 o más
  46,7 %, hombres 44,8 %; alturas por franjas de 8 cm): las alturas de hombres y mujeres ya salen de su tabla (v1.0.0,
  `realHeight()` en `06a_humans.js`). Lo que falta son niños: el cuerpo base es de adulto y encogerlo no queda bien
  (cabeza y proporciones). Hace falta un cuerpo de niño, propio o de un pack con licencia libre, y decidir qué hacen:
  ir de la mano de un adulto, no cruzar solos, que no se les pueda atropellar ni pegar (como en los GTA).
  - Alturas por edad (tabla de Jonay, 3-nov, % del total): 0–4 años: <120 cm 4,0, 120–127 0,2 · 5–9: 120–127 0,8,
    128–135 1,5, 136–143 1,5, 144–151 0,5 · 10–14: 128–135 0,3, 136–143 0,8, 144–151 1,2, 152–159 1,0, 160–167 0,7,
    168–175 0,2 · 15 o más: 144–151 2,0, 152–159 10,2, 160–167 20,6, 168–175 25,3, 176–183 23,9, 184–191 7,1, ≥192 1,1.
    Imagen en `docs/referencias/poblacion/alturas_por_edad.png`.
  - De 10 a 14 años: el morph «teen» que ya tenemos podría servir, con estas alturas.

### Árboles y vegetación

- [ ] ● **Barrancos y arbolado con la cartografía real (GRAFCAN / IGN)** (Jonay, 9-nov: «hay muchas zonas que son barranco y están planas… ¿no tienes la cartografía real? ¿y vistas por satélite tipo GRAFCAN para ver zonas con árboles?»): el terreno del juego es una malla de **16 m** (`DATA.H`: 522 × 388 puntos), así que un barranco de 20–40 m de ancho se queda en una hondonada suave o plano.
  - Terreno: bajar el MDT de 2–5 m (LiDAR del PNOA, IGN / GRAFCAN) con una orden nueva del trabajador y rehacer la malla a 4–8 m (o más fina solo en barrancos y bordes de calle, para no hacer el juego mucho más pesado); comprobar después calles, trincheras y edificios, que se apoyan en la altura.
  - Fuentes (9-nov): el visor de IDECanarias es una página que pinta servicios públicos WMS de GRAFCAN: Ortofoto `https://idecan1.grafcan.es/ServicioWMS/Ortofoto?` (10 cm, Tenerife 2025), infrarroja `…/OrtofotoCIR?` (la vegetación sale roja: sirve para encontrar árboles), Modelo de Terreno LIDAR `…/MTL?` (2,5 m, en realidad de superficie, 2011–12) y sombras `…/MDSombras?`. Como WMS dan imágenes, no alturas: para el terreno, mejor el MDT de 5 m del IGN (centro de descargas del CNIG o su WCS INSPIRE). Mirar las condiciones de uso (aviso legal de GRAFCAN, licencia del IGN) antes de usarlo. Herramienta: una orden nueva del trabajador que baje por trozos la zona del mapa.
  - Árboles: con la ortofoto de GRAFCAN (WMS) y la diferencia entre el modelo de superficies y el del terreno (altura de la copa) sacar dónde hay arbolado de verdad y plantarlo (pinar, laurisilva, palmeras en barrancos), en vez de repartirlo a ojo.


- [~] ● v1.3.0 (laurel, palmera canaria, pino, árbol de calle y dragos en tres tamaños, hechos en Blender; faltan los de Lucas Vega tipo acacia/jacaranda, los arbolitos jóvenes de alcorque y colocar los dragos donde están de verdad) **Árboles con más detalle y varios modelos** (Jonay, 19-oct, «no para ya»). Muchas copas son un círculo feo. Fotos
      de Street View de lo que hay en La Laguna:
      - En la Av. de Lucas Vega:
        - árboles grandes de hoja compuesta y fina (tipo acacia o jacaranda), con varios troncos que se abren en «V» y
          una copa irregular hecha de masas sueltas;
        - árboles de alineación más jóvenes, con un tronco recto y la copa alta, ovalada e irregular.
      - **Dragos**: el de Lucas Vega 16 y el de la C. San Agustín 3. Tronco grueso que se ramifica en muchos brazos
        gruesos y la copa en sombrilla de penachos de hojas en punta.
      - Arbolitos jóvenes en alcorque, de tronco fino (San Agustín 3), con hojas otoñales rojizas.
      - **Araucarias** altas, en pisos (Obispo Rey Redondo, la plaza junto al Teatro Leal).
      - Palmeras canarias.
      - Árboles de plaza de copa ancha y redondeada, pero hecha de grupos y no de un círculo (laureles de Indias).
      Hay que hacer varios modelos con troncos ramificados y copas de varios grupos de hojas, y usar el de cada sitio.

### Agente revisor (avisos de mapa)

- [ ] ● **Edificios: recortar solo lo que pisa la calzada, sin romperlos** (v1.0.0–1.0.2, deshecho en la 1.0.3; Jonay, 3-nov: «te
  - v1.2.7: las calles ya se estrechan hasta las fachadas en todo el mapa (94 → 58 choques). Quedan 2 críticos y la punta de cinco calles de servicio que entran 2–4 m en el edificio #77 (X −640, Y 955; aparecieron al estrecharlas).
  has cargado demasiados edificios», «los recortes fueron mal, empeoraron mucho», manzanas del casco convertidas en plazas
  en C. el Juego X −259, Y 47 y C. San Juan X −276, Y 102, y un edificio sin paredes en X −191, Y 366). Lo que falló: quitar la
  regla de no perder más de la mitad (con el corte recto, más ancho que la calle donde esta tuerce) y la muesca / el
  recorte por el bordillo (`subtractConvex`, `kerbClip`), que dejan contornos con paredes que faltan. La 1.0.3 vuelve a las
  reglas de la 0.99.8 y deja solo las calles estrechadas al hueco (`narrowToGap`). La idea de Jonay sigue en pie (fachada
  paralela al bordillo, esquinas en bisel, recuperar los quitados), pero con un recorte de polígonos fiable (una librería de
  recorte probada, p. ej. el algoritmo de Martínez o Clipper portado) y una prueba con fotos de las manzanas del casco.

- [ ] ◐ **Auditoría 1.0.1 (APTO CON AVISOS)**: con la muesca paralela a la calle se van 9 invasiones y salen 6 nuevas: junto al
  Intercambiador (X −182, Y 793 y X −171, Y 788; 2,1–2,6 m), C. Orión (X 616, Y 1510; 1,7 m) y C. Plutón (X 668, Y 1535;
  1,3 m). Y vuelve el «poste» de C. Juan de Vera (X −149, Y −235), que es el alcalde de la misión. Mirar con fotos
  (`tests/herramientas/foto_invasiones.py`, con estos puntos).
- [ ] ◐ **Dos edificios de la auditoría 0.69 vuelven a invadir la calzada** (v1.0.0, `prueba_pendientes_faciles.py`; en la
  0.95 estaban a 0 m): X 73, Y 234 (edificio #865, junto a una secundaria del casco, 1,55 m) y X −909, Y −408 (#1357,
  Av. Lucas Vega / Callejón Montaraz, 1,41 m). Volvieron entre la 0.95 y la 0.99.8. La prueba los vigila con un margen
  de 2 m hasta mirarlos.
- [ ] ◐ **Edificios de 50 m² o más que una calle cruza** (v1.0.0; Jonay: «no me gustaría que se fuera nada de más de 50 m²;
  esos casos mirémoslos uno a uno»): 272 que el recorte habría quitado (casi todos porque una calle de servicio o
  residencial del OSM los cruza por el medio y quedaría una tira). Se quedan como estaban. Lista y fotos desde arriba de
  los 60 mayores: `tests/herramientas/sonda_edificios_dudosos.py` → `tests/shots/sonda_edificios_dudosos.txt` y
  `dudoso_NN.jpg`. Para cada uno: pasadizo, quitar la calle (si es un aparcamiento o un patio), recortar o dejarlo.
- [~] ◐ v0.74.0 (rotonda del aeropuerto, árbol de Juan de Vera, poste junto a la TF-13, Heraclio Sánchez) **Auditoría y agente revisor v0.73.0** (13-oct; APTO CON AVISOS; pruebas 9/9 con los 3 tramos de conducción como «conocidos»):
      auditoría: 18 edificios «nuevos» en calzada (varios ya salían antes: X −855 Z 56/70/86 3,4 m, X 1615 Z 3466, X 70 Z 220);
      2 obstáculos nuevos: árbol o farola en **Calle Juan de Vera** (X −149 Z −235: la calle pasó de peatonal a calle con
      coches y el árbol se quedó dentro) y poste en la Autopista del Norte junto a la TF-13 (X 372 Z 1522).
      Revisor (412 s, 68 avisos, 51 nuevos, casi todos en las zonas nuevas): **aeropuerto** — la rotonda acristalada de la
      terminal cae encima de las vías de servicio del lado aire (X −3080 Z 30–50: coches atascados, «flota 1–3 m») y los
      caminos alrededor de la terminal atascan a pie; enlaces junto a Cam. San Lázaro (X −3270 Z −270) siguen flotando
      0,8–1,3 m; Calle Heraclio Sánchez (X −86 Z 232) y un camino junto al tranvía (X −279 Z 583) atascan a pie; quedan
      hundimientos en caminos de la periferia (X 962 Z 2710, 618 −777, 2248 3253). Detalle en `reportes/ULTIMO.md`.
- [~] ◐ v0.73.0 (hundimientos en caminos/aceras, calle que flotaba; quedan texturas «trim» sobre enlaces, atascos, salidas de calzada, edificios sobre caminos y saltos: ver el revisor 0.73) **Agente revisor v0.69.0** (Jonay lo pidió, 13-oct; 6 min en su PC; `reportes/ULTIMO.md` con capturas en `reportes/img/`):
      47 avisos (en la v0.48 eran 130; 39 de aquellos ya no salen). Se hunde a pie 9 (aceras/caminos 0,3–1,1 m bajo el suelo:
      X 151 Z 159, 728 930, 168 717, 225 999…) y en coche 1 (rampa de servicio X 2210 Z 3312, ya apuntada); edificios sobre
      caminos 10 (Pasaje Teide X −176 Z −66, Pasaje Aguere X −212 Z 54, Edificio Beneharo, Camino La Rúa 308…); atascos 8;
      se sale de la calzada 6; objetos flotando 3; texturas cruzadas 3; saltos de altura 3; vuela 3; 1 recorrido sin terminar.
      No tocar hasta que Jonay lo diga.
- [ ] ● **Agente revisor v0.78.0** (19-oct 16:02, `reportes/revision_v0.78.0_2026-10-19_1602.md`, con capturas): **38 avisos
      (eran 68): 36 arreglados, 14 nuevos, 24 siguen.** Confirma arreglados: Vía de Ronda X 377 Z −268, Travesía
      Andenes X 820 Z 3494, rampa X −495 Z 683, Pasaje Teide, y casi todo lo de San Lázaro / aeropuerto oeste.
      Nuevos para mirar: enlace de autopista X 2210 Z 3588 (atasco y salto de 1,4 m, el coche 1,6 m por encima),
      enlace X 720 Z 3389 (coche 1,9 m por debajo, salto −1,8 m), servicio X 946 Z 2849 (2,5 m por encima), Camino Las
      Estaciones X 516 Z −332 (asfalto flotando 1 m), Camino Madre del Agua X 363 Z −1250 (se sale), Plaza de los
      Remedios X −174 Z −137 (se hunde 0,46 m en algo de madera), Camino La Rúa X 543 Z −909 y servicio X −853 Z 58
      (edificio en la calle), caminos a pie atascados X 674 Z 3460, X −759 Z 512, X −3052 Z 39. Siguen: zona oeste del
      aeropuerto (Carretera General del Norte X −3254 Z −271, enlaces, caminos X −3040…−3162), Heraclio Sánchez X −86
      Z 232, Pista Militar San Roque X 481 Z −307.
- [ ] ● **Agente revisor — tandas pendientes** (`reportes/ULTIMO.md`, con capturas). Hechas: 1.ª tanda (aceras,
      terreno bajo el asfalto, pretiles, calles que suben a las rampas, edificios sobre calles) y en v0.50 enlaces de
      autopista y trincheras (conducción: de 94 a 25 avisos). Quedan:
      - **Aeropuerto** (X −3270, Z −260 y X −2330, Z −240): enlaces que se cruzan a distinta altura; el coche aún va
        ~1,4 m por encima en 3 enlaces, y la auditoría de obstáculos sube de 169 a 200 por pretiles en esa zona.
      - [x] v0.53.0 Andenes del tranvía sobre la calzada: la calle se aparta junto a la parada y los andenes son un
        20 % más pequeños (agente: 0 avisos en las 18 calles de las paradas). Quedan 3 andenes que aún tocan la
        calzada por un extremo (X −147 Z 183, X 281 Z 884, X 2081 Z 3965).
      - Rampa de parking de servicio (X −495, Z 683): empieza 1,1 m hundida sin hueco en el terreno (salto).
      - **Medianas tipo New Jersey** que cruzan carriles en glorietas y enlaces (X 1823 Z 3077, X 5 Z 2330).
      - Calle La Papa (X −948, Z 1484) pegada a una fachada; Calle Timanfaya (X −1251, Z −3) bajo un tablero estrecho.
      - Aeropuerto: 3 edificios aún sobre vías de servicio y caminos peatonales que se atascan (X −3150, Z 0…100).
      - **Informe del agente v0.51** (`reportes/revision_v0.51.0_2026-10-07_0547.md`): 58 avisos en 1.005 vías (21
        arreglados; los 39 «nuevos» son de calles revisadas por primera vez, se comprobó que ya estaban en v0.50).
        Nuevos a mirar: aceras y caminos de Trinidad / Vía de Ronda que se hunden ~1 m (X −174 Z 741, X 381 Z 1076,
        X 465 Z 1160) y 5 aceras que cruzan edificios (X 326–408, Z 823–1060); trinchera de Vía de Ronda (#723,
        X 391 Z 1504, el coche cae 1,7 m); rampa de servicio junto a la TF-5 (#3090, X 2209 Z 3315).
      - **Informe del agente v0.50** (`reportes/revision_v0.50.0_2026-10-07_0145.md`): 75 avisos en 853 vías (82
        arreglados respecto a v0.48). En coche 29 (antes 94); en v0.51 la recomprobación da 14 en coche y 14 de
        superficies (de 30). Quedan además: rampa de servicio hundida sin hueco en el terreno (X −495 Z 683),
        final de tablero bajo donde el coche se para (Vía de Ronda X 377 Z −268, Travesía Sobradillo X 820 Z 3494),
        pasajes peatonales bajo edificios (Pasaje Teide / Aguere:
        el edificio no tiene hueco), aceras y carril bici que se hunden ~0,5–1 m junto a rampas (X 755 Z 1264,
        X 243 Z −352, X −291 Z 2699), un servicio del aeropuerto en una ladera de pendiente imposible (X −3247 Z −359).

### Rendimiento, auditorías y código
- [ ] ⚡ **Peleas callejeras con un peatón cualquiera: ~0,14 s al empezar** (v1.2.5, sonda `sonda_maleante_gpu.py`): sus figuras se dibujan al momento (las del jugador y las de los maleantes ya se preparan antes). Se podrían «calentar» las del peatón al acercarte a él.
- [ ] ⚡ **`huella_mundo_cmp` no es del todo fija** (v1.2.4): salió distinta una vez (161 vértices) y bien las dos siguientes con el mismo código; algo de la carga (gente o coches) entra en la cuenta.

- [x] v1.2.4 (la auditoría 1.2.4 ya no da avisos nuevos críticos o altos: cuentan como conocidos) **Auditoría 1.1.6: «180 avisos nuevos» del análisis estático** (crear geometría en `buildRoofProps`, `buildTerrain`, `buildLamps`…): no son nuevos, son los de siempre con otro número de línea tras pasar el formateador. Comprobar en la próxima auditoría que vuelven a contar como conocidos; `03_collide.js` bajó de A a B (más líneas por función).
- [~] ◐ v1.1.7 (nota A: 88 en local, 86 en la auditoría, que ahora cuenta sentencias y deja fuera los datos; piezas comunes del píxel en 09e_pixkit, funciones largas de 251 a 147; quedan los «módulos» enteros —MISSIONS, BASKET2D, create() de los juegos de la recreativa— y los cuerpos de bucle muy largos como el de cada edificio en buildBuildings) v1.1.6 (todo `src/` con Prettier: nota de C 69 a B 84, sin líneas largas ni densas; quedan las funciones-módulo muy largas y el código repetido de 09ma/09eb/06b) v1.0.0 (`12m_mundialito.js`: la tabla de selecciones, una fila por equipo) **Partir funciones largas y ordenar
  los archivos con nota D o C** (auditorías 0.75, 0.76, 0.90 y 0.99.8): quedan `09eb_pixbasket.js` y `09ma_pixguanche.js`
  (el dibujante de la propuesta en una función de ~155 líneas), `12k_agua.js` (líneas muy largas y densas), `12j_campos.js`
  (la Copa Laguna), `09ea_minijuegos.js` (el público) y `11_hud.js` (bajó de B a C por las líneas largas). Las «funciones de
  más de 400 líneas» de la tabla (`BASKET2D()`, `MISSIONS()`…) son los módulos enteros, no funciones de verdad. Lo más
  cómodo sería pasar un formateador (Prettier) a esos archivos; en la nube no se puede instalar, en el PC habría que
  añadirlo al trabajador.
- [ ] ⚡ **Arranque 2 s más lento en la 1.3.2** (auditoría 1.3.2, APTO): 18,9 → 20,9 s. Sospechosos: la comprobación de sitio de cada árbol (`treeFit`, `treeKerb`, 05_scenery.js) y el mapa de hierba con las franjas junto a calles y edificios (05z_hierba.js). Medir y, si es eso, usar una rejilla para las calles.
- [ ] ⚡ **Quedan algunas matas en la acera ancha de la Av. Leonardo Torriani** (foto de la 1.3.2, X 113, Y 450): la franja gris entre la acera y la fachada; mirar qué es en el OSM (área verde o explanada) y quitarla de la hierba.
- [~] ● v1.0.0 **Pintar a 1080p y 60 fps en «alta» con la RX 6600** (Jonay, 3-nov: «el objetivo es jugar a 1080 a 60 fps
  en mi gráfica con los gráficos al máximo»; antes: «pintar ~30 ms desde la 0.89»). Sonda con la tarjeta de verdad:
  `tests/herramientas/sonda_pintado_gpu.py`, en 5 sitios. La tarjeta va sobrada: a 480×270 tarda lo mismo que a 1080p ×1,5;
  lo que pesa es mandar las llamadas de dibujo. v1.0.0: de 23–34 ms (2.200–3.100 llamadas, 6 M de triángulos) a ~16–18 ms
  (1.500–1.700 llamadas, 1,5–2 M de triángulos):
  - piezas con hijas (las ruedas con su llanta) y piezas transparentes también se juntan (`mergeStatics`);
  - la gente no se pinta a más de 170 m, ni los coches a más de 360 m, ni los interiores desde lejos; sus piezas pequeñas
    (ojos, cejas, reloj; luces y matrícula) solo hasta 40 y 70 m (`actorCull`, en cada pintado de la escena);
  - aparcados en celdas de 400 m y hasta ~580 m; los detalles de la ciudad (menos de 2,5 m) hasta ~330 m.
  - **Queda**, de lo que más a lo que menos ahorra según la sonda:
    - lo lejano (500–1.150 m): 3–9 ms. Una versión simple de los trozos lejanos de la ciudad (un bloque por manzana) o
      celdas más grandes lejos.
    - unas 400–650 llamadas de piezas sueltas: ~3.600 piezas de los **grupos con nombre** (iglesias, aeropuerto,
      estadio, «inicio»), que se podrían juntar dentro de su grupo; ~140 piezas que se crean después de juntar (misiones);
      103 con `userData`.
    - sombras: 1,5–2,5 ms (~160–230 llamadas en la pasada de sombras).
    - el **terreno**: una sola malla de ~400.000 triángulos; partirla por trozos con menos detalle lejos.
- [ ] ● **Arranque más rápido: precalcular la ciudad al compilar (P2.1) y el mapa en binario (P2.2)** (auditorías 0.46,
  0.49, 0.55 y punto 17; Jonay eligió hacerlo, 3-nov). Arranque en el PC: ~10 s; lo que más tarda: calles y aceras
  (2,7 s), sombreadores (2,5 s, ya en asíncrono), casas del casco (1,4 s), árboles (0,6 s). Portar la generación a
  `build.py` o guardar la geometría ya hecha en binario: varias versiones. `data.json` (~3 MB) se podría cuantizar.
  Los módulos ES (P2.5) no aportan nada al jugador; se deja salvo que Jonay quiera.
- [~] ◐ v0.99.7 (el «poste» de Juan de Vera era el alcalde) **Auditoría v0.99.6 y v0.99.8 (APTO CON AVISOS)**: `09jz_sprx.js`
  bajó de A a B y `11_hud.js` de B a C; `prueba_076.py` falla en la carga compartida y pasa sola.

- [~] ◐ v1.1.8 (hechos los cuatro de minijuegos y el aviso al guardar; los «lienzos nuevos» y «JSON por fotograma» del análisis de código en la pelea, el baloncesto, las recreativas y sus fondos son de dibujos que se hacen una vez y se guardan, no de cada fotograma; queda el sombreador por el camino) **Auditoría 1.1.7 (APTO CON AVISOS, calidad A 86)**: avisos de minijuegos que salen con el auditor nuevo:
  - el mundo 3D se sigue pintando detrás de bencomo, naves y guanche (la pantalla del minijuego lo tapa entero): no pintar la escena mientras haya un minijuego a pantalla completa (`13_main.js`, `loop()`).
  - baloncesto (9 imágenes, 0,11 MB), bencomo (19, 0,33 MB) y guanche (46, 1,53 MB) empiezan a cargar sus imágenes al abrirse: precargarlas (`img.decode()`) durante la carga o al acercarse a la máquina.
  - el fútbol crea lienzos y lee píxeles en cada fotograma (0,21 por fotograma): crearlos una vez y reutilizarlos.
  - 1 sombreador de sombras (depth) se prepara por el camino: precompilarlo al arrancar.
  - métricas iguales a la 1.1.6 (pintar 16,1 ms, lógica 0,96 ms); el arranque sube de 12,1 a 13,2 s (comprobar en la próxima si se repite).

  - Auditoría 1.1.8 (APTO CON AVISOS, A 86): todo sale ~20 % más lento a la vez —pintar 16,1 → 19,8 ms, lógica 0,96 → 1,14 ms y hasta los minijuegos 2D—, con las mismas llamadas, triángulos y memoria: parece el PC más cargado durante la medición, no el código. Comprobar en la próxima auditoría.
  - Auditoría 1.1.9 (APTO CON AVISOS, A 86): de nuevo todo más lento a la vez (pintar 20 → 23,2 ms, lógica 0,98 → 1,55 ms, arranque 15,2 → 17,2 s, cada paso de la carga un 20–60 % más y el fútbol 2D 0,5 → 1,6 ms) con las mismas llamadas y triángulos. Repetir la auditoría con el PC descansado para saber cuánto es del código (la 1.1.9 añade al arrancar la búsqueda de calles repetidas y la trinchera de la TF-5).
  - El fútbol aún prepara sus jugadores en los primeros 3 s del partido (1 lienzo por fotograma, luego para): dibujarlos al abrir el juego.
### Móvil

- [ ] ● **Móvil: repasar todos los controles táctiles siguiendo el estándar** (Jonay; 2-nov: «hay que repasar los controles para móvil para que sea posible usar todas las funciones del juego, usando recomendaciones para ajustarnos al estándar de controles y fijándose en lo que ya hacen otros, no reinventemos la pólvora»): desde el móvil no se llega a las opciones, y todo lo que se hace con teclado —pausa, opciones, guardar, radio, armas, mapa…— tiene que tener botón o gesto.
  - Primero: inventario de cada acción del teclado/ratón (`src/01b_controls.js`) y si tiene equivalente táctil hoy, por modo (a pie, en coche, apuntando, minijuegos, recreativa, menús).
  - Referencia: los esquemas de GTA San Andreas / GTA III / Vice City para móvil (joystick virtual a la izquierda, cámara arrastrando a la derecha, botones de acción contextual a la derecha, cambio de arma tocando el icono del arma, mapa tocando el minimapa, pausa arriba) y las pautas de Android/Apple para juegos (botones ≥ 44–48 px, zona del pulgar, nada importante en los bordes con gesto del sistema, opacidad y tamaño ajustables).
  - Proponer a Jonay el esquema por modo antes de tocar nada.
  - **Imagen en 16:9** (Jonay, 3-nov: «para móvil también será 1080; si el móvil tiene una resolución más alargada,
    sobrará espacio por los lados, que vendrá bien para los controles»): el juego se pinta en un recuadro 16:9 (como
    mucho 1080 de alto) centrado. En los móviles más alargados (19,5:9, 20:9…) las franjas de los lados quedan libres para
    el joystick y los botones, que así no tapan la imagen. Hay que pensarlo junto con el rendimiento del móvil (resolución
    dinámica, `DYN` en `13_main.js`).

### Recursos externos (animaciones, modelos)

- [~] ◐ v0.93.0 (Bencomo y Guanche Guarriors hechos) **Sprites de itch.io como base para Bencomo, Guanche Guarriors y el
  basket** (Jonay, 27-oct): falta el basket. Los dibujos se generan con `tools/sprites_ext/` a partir de
  `E:\Claude\GTA La Laguna\assets_externos\` (fuera de git) y van a `src/09jy_sprx_data.js`.
  - Licencias: GandalfHardcore (usar en juegos y modificar; no redistribuir los PNG), Evil Wizard 3 (CC0); falta mirar
    las de PixelHorse y el caballero de 18studio en sus páginas de itch.io.
  - Por ver en el juego: el tamaño de Bencomo (1 píxel del dibujo = 1 de la pantalla, algo más pequeño que el de
    antes) y el de los héroes de Guanche (×2).
- [ ] ◐ **Assets de coches y motos** (consulta hecha, falta decidir): opciones CC0/CC-BY en
      `docs/referencias/assets_vehiculos.md`.
- [ ] ● **Mixamo** como fuente de animaciones extra (gratis para juegos; no subir los FBX originales al repo; hay que
      retargetear a nuestro esqueleto; la descarga la hace Jonay con su cuenta de Adobe).

- [~] ● v1.3.7 (v1.3.7 suelo: asfalto, acera, adoquín y césped; v1.3.9 terreno, caminos de tierra, tejados de teja y azoteas; v1.4.0 muros de basalto; v1.4.1 tapias encaladas, iglesias y cantería; todo con `tests/herramientas/suelo_polyhaven.py`; faltan la piedra de iglesias y casas canarias (cantería) y las fachadas —ya llevan detalle de enfoscado de Poly Haven desde antes—) **Texturas de Poly Haven (CC0) para todo el juego** (Jonay, 11-nov: «ahora que tenemos Blender con Poly, ¿no podrás usar esas texturas y mejorar todo en general?»): hoy casi todas las texturas se pintan a mano en el código (asfalto, aceras, adoquín, fachadas de colores, tejados, césped, piedra). Con el add-on de Blender se pueden bajar texturas CC0 de Poly Haven (asfalto, baldosa de acera, adoquín, enfoscado, teja, piedra basáltica, césped, tierra) y meterlas en el HTML a 512 px (≈1 MB más en total). Hacerlo por tandas: suelo (asfalto, acera, adoquín, césped) → fachadas y tejados → muros y piedra, con fotos antes/después y midiendo el pintado; créditos en `CREDITOS.md`.
### Extras para el final

- [ ] ● **DLC Santa Cruz** (Jonay, 12-oct): se une por el sur a partir del final del mapa actual; carga aparte, con aviso,
      para no hacer una sola carga enorme (`descargar_zona.ps1` + `merge_zona.py` ya sirven para bajar la zona).
- [ ] ● **DLC norte** (Jonay, 12-oct): la bajada por Tegueste hasta Tejina, Bajamar y Punta del Hidalgo; también carga
      aparte.
- [ ] ● **Música «real»** para la radio (hip hop / rap de finales de los 90 y principios de los 2000). Jonay: «ni lo
      consideres, es un extra final».
- [ ] ● **Multijugador con un amigo (P2P) y chat** (Jonay, 2-nov: «¿hay alguna forma de hacer esto multijugador usando p2p para que un amigo pueda recorrer la calle y hacer misiones y que nos veamos? y si tuviese un chat, increíble»).
  - Fase 1: verse andando y conduciendo + chat de texto. WebRTC (canal de datos) con PeerJS o similar: uno crea sala con código, el otro entra; se envían posición, giro, animación y coche ~15 veces por segundo, con suavizado. El mundo es el mismo en los dos (sale de los mismos datos); el tráfico y la gente, cada uno los suyos.
  - Fase 2: misiones en cooperativo (el anfitrión manda el estado de la misión).
  - **Cómo lo quiere Jonay** (3-nov):
    - Hasta **4 jugadores** por sala.
    - Las misiones de la historia son **solo del anfitrión**: en cooperativo no se hacen misiones personales de los
      invitados, pero los invitados **ven cómo las resuelve el anfitrión**. Para eso hay que sincronizar solo los pocos
      personajes y coches que salen en la misión; el resto del tráfico y la gente sigue siendo de cada uno.
    - **Misiones cooperativas aparte**, diseñadas desde cero para varios jugadores y sin ninguna relación con los hilos
      de la historia que ya hay.
  - **Minijuegos a 2 jugadores** (Jonay, 3-nov):
    - **Guanche Guarriors** (`09m_guanche.js`): salen los dos a la vez, en cooperativo.
    - **Gufo** (`09l_naves.js`): una segunda nave, de otro color.
    - **Fútbol y baloncesto** (`09g_futbol2d.js`, `09f_basket2d.js`): un jugador contra el otro.
    - **Bencomo** (`09k_bencomo.js`): sale también una **pastora**, que se juega exactamente igual pero con cuerpo de
      mujer. Jonay cree que ya tenemos uno para Guanche Guarriors; mirar las hojas de las chicas de la v0.99.3.
    - **En red, cada jugador en su PC o su móvil** (Jonay, 3-nov). No en el mismo PC. Hay que compensar el retardo en
      fútbol, baloncesto y Gufo, y depende de los controles de móvil (apunte en «Móvil»).
  - Por comprobar: si el Artifact deja abrir conexiones WebRTC y al servidor de emparejamiento (si no, se juega con el HTML descargado); servidor TURN para las redes que no conectan directo.

## Hecho

- [x] v1.4.0 **Nada debajo de los pasos de cebra y cebreados** (Jonay, 11-nov): asfalto liso encima de las rayas de los carriles y sin flechas/STOP/ceda dentro (`markClear`, 04f_cebreados.js; sonda `sonda_pasos_cebra.py`).

- [x] v1.3.8 **Flechas sobre la raya entre carriles** (Jonay, 11-nov, Av. de los Menceyes X 1600, Y 1820): una flecha en medio de cada carril (`laneCentres`, 07_vehicles.js).

- [x] v1.3.7 **Pintado 20–21 ms en las auditorías 1.3.5 y 1.3.6**: era ruido; en la 1.3.7 vuelve a 16,8 ms (APTO, sin avisos).

- [x] v1.3.6 **Glorietas: isletas con bordillo, flechas de carril y la del Padre Anchieta** (Jonay, 11-nov): isletas de las calles elevadas con bordillo, flechas recto+derecha / recto+izquierda en las entradas de dos carriles, y los anillos ovalados (Padre Anchieta, La Candelaria, Gracia…) con isleta y líneas a lo largo del anillo real (`src/04f_cebreados.js`).

- [x] v1.3.5 **Glorietas y zonas cebradas de todo el mapa** (Jonay, 11-nov): marcas de glorieta en las 52, isletas cebreadas en las entradas/salidas y cuñas donde una calzada se abre o se junta (`src/04f_cebreados.js`, sonda `sonda_cebreados.py`).
- [x] v1.3.5 **Flechas, líneas de STOP/ceda y carril de los coches centrados entre las bandas de aparcamiento** (Jonay, 11-nov): `edgePark`/`laneOff`/`laneHalf` en `07_vehicles.js`; sonda `sonda_marcas_aparca.py`.

- [x] v1.3.4 **Pintado 16,8 → 20,1 ms en la auditoría 1.3.3**: era ruido de medida; en la 1.3.4 vuelve a 16,9 ms.

- [x] v1.3.2 **Pintado más lento con la hierba** (auditoría 1.3.1: 17,8 → 21,6 ms): en la 1.3.2, con la hierba fuera de aceras y calles, 16,8 ms y 18 000 triángulos menos.

- [x] v1.3.2 **Avenida de los Menceyes: dos carriles por sentido y sin aparcamiento junto a la mediana** (Jonay, 10-nov, X 578, Y 1244: «es dos carriles en cada sentido; en el sentido de bajada no hay aparcamiento ni en el de subida por la zona central; solo hay aparcamiento en algunas zonas a la derecha del sentido de marcha»): cada calzada a 2 carriles (7,4 m, antes 11,7 con aparcamiento a los dos lados); aparcamiento solo a la derecha donde el OSM lo marca. Con la calzada más estrecha el Edificio El Valle (X 569, Y 1214) ya casi no la pisa.
- [x] v1.3.2 **Hierba en aceras, calles, adoquines, vías del tranvía y junto a edificios** (Jonay, 10-nov, Av. Leonardo Torriani X 113, Y 432 y Av. de los Menceyes X 251, Y 854): cada mata se comprueba contra calzadas y aceras, el tranvía y sus paradas y los edificios; en los descampados, ninguna a menos de 12 m de una calle ni de 8 m de un edificio (en ciudad eso es acera ancha o explanada).
- [x] v1.3.2 **Espadaña de Santo Domingo flotando** (Jonay, 10-nov, C. Santo Domingo X 102, Y 232): se pone sobre la pared más cercana de la planta del convento, a lo largo de ella (antes caía en una esquina vacía del rectángulo).

- [x] v1.3.2 **Árboles dentro de edificios, en mitad de aceras y en la carretera** (Jonay, 10-nov, X 144, Y 80 y X 284, Y 155, capturas: «eso no puede pasar, y mucho menos en medio de una carretera»): el tronco nunca en una calle (también puentes y túneles) ni dentro de un edificio; la copa no entra en edificios ni en tableros de puente (si no cabe, árbol más pequeño o de calle, o ninguno); en las aceras, solo árbol de calle o palmera en alcorque junto al bordillo, y ninguno en aceras de calles estrechas. Quitados o cambiados: 367 en calzada, 95 en edificios, 74 en aceras, 33 por copa y 17 junto a puentes.

- [x] v1.2.8 **Personajes un 5 % más pequeños** (Jonay, 10-nov, tras los coches): `HUMAN_SCALE` en `06_actors.js` (vale para el modelo con huesos y el antiguo).
- [x] v1.2.7 **Coches más pequeños** (Jonay, 9-nov: un 10 %; 10-nov: «por ahora un 5 %… en todas sus dimensiones»): todos los modelos, guaguas y motos un 5 % menos de largo, ancho y alto (`CAR_SCALE` en `06b_vmodels.js`), también su física y su choque. Si hace falta, el otro 5 % es cambiar ese número.
- [x] v1.2.7 **Calles al ancho entre fachadas** (Jonay, 10-nov: «las calles que corten como la de C. Barcelona haz más estrecha la calle, ha sido un fallo ampliarlas de inicio»): `narrowToGap` (04b_recorte.js) vale ya para toda calle de principal hacia abajo, también en el casco (salvo autopistas, enlaces, vías rápidas, glorietas, puentes y túneles y la Av. de La Trinidad, que tiene lo suyo), y estrecha hasta el hueco real (el 10 % más estrecho de lo medido; si el eje cae dentro de un edificio, al mínimo de sus carriles). C. Barcelona: de 10,4 a 4 m. Auditoría: choques con edificios 94 → 58 (críticos 3 → 2).
- [x] v1.2.6 **Auditorías 1.2.0–1.2.5 limpias** (Jonay, 10-nov: «termina todo lo de las auditorías»): la de la 1.2.6 sale **APTO** sin avisos. Hecho: fútbol sin dibujos al jugar (1.2.4), tirón del maleante (1.2.5), alcalde y El Blanco fuera de la calzada (`safeSpot` busca primero sitio fuera de ella), latas del tiro, vector de la pelea y figuras «calentadas» (sin avisos nuevos del análisis), `prueba_076` más robusta (el chorro probaba con 4 peatones; ahora 8). Lo que queda en los informes no son avisos nuevos:
  - Mapa: 94 edificios que invaden la calzada (3 críticos: C. Barcelona X −15, Y 217, donde la calle de un sentido mide 10,4 m; y un servicio en X −858, Y 70) → es el apunte ● «Edificios: recortar solo lo que pisa la calzada». Obstáculos: quedan 7 «bajos» (contenedores de Teobaldo Power pegados al bordillo, a propósito; señales de la isleta de Marqués de Celada; dos postes de un servicio en X −3018, Y −49).
  - Análisis de código: ~40 avisos altos conocidos en funciones que el analizador cree de cada fotograma por el nombre (`get`/`set` del guardado, sprites con caché de los minijuegos, `geo()` de la ciudad, `cBox`…); se hacen una vez. Cambiarles el nombre los haría «nuevos» una vez.
  - Las métricas de los minijuegos (0,3 ↔ 0,4 ms) bailan de una medición a otra: ruido.
  - Los vértices pasan de 7,94 M a 7,98 M en la 1.2.6 sin cambios en la ciudad (huella igual): probablemente gente o coches a la vista al medir.
- [x] v1.2.5 **Tirón al escaparse el maleante** (Jonay, 3-nov): era el comienzo de la pelea 2D (0,9 s: figuras dibujadas de golpe y la ciudad lejana del fondo subida a la GPU). Figuras dibujadas antes en ratos libres y fondo solo con lo cercano: 0,06 s. Sonda `tests/herramientas/sonda_maleante_gpu.py`.
- [x] v1.1.9 v1.1.0 (red de seguridad que te devuelve a la calle; la sonda `sonda_caidas.py` no encuentra ahí un tablero sobre un tramo bajo, así que la causa sigue sin saberse: falta reproducirlo conduciendo por ese enlace) **¡Bloquea la misión! El coche se cae a través de la calzada en el enlace de la Autopista del Norte** (Jonay,
  3-nov, X −3292, Y −161, captura de noche, misión del queso del aeropuerto: «me he caído por aquí con el coche mientras
  seguía a la furgoneta del queso; él también se cayó pero pudo seguir; esto es súper bug porque impide hacer la misión,
  me dejó bloqueado»): en la unión del puente con la calzada el suelo deja pasar el coche y queda atrapado debajo del
  tablero. Dos arreglos:
  - el sitio: mirar la altura del suelo en ese tramo (`ROADY`, tableros `DECKS`) y cerrar el hueco entre el puente y la
    calzada; buscar con una sonda otras uniones donde el suelo de conducir dé un salto hacia abajo de más de 1 m;
  - una red de seguridad general: si el coche (o el jugador) queda más de ~2 m por debajo de la calzada o atrapado sin poder
    salir unos segundos, devolverlo a la calzada más cercana en su sentido (como hacen los GTA). Que valga también para los
    coches de las misiones.
  - v1.1.9: la causa era el puente de la glorieta sobre la autopista: tenía que subir 5 m en 15 m y dejaba un escalón de 1,6 m donde se juntaba con la glorieta. Ahora la autopista va en trinchera ahí (6 m), como junto a Los Rodeos, y el puente queda a nivel (`TF5T`, `prueba_119.py`).
- [x] v1.1.9 v0.78.0 (tramos elevados que bajan a la calle donde acaban: Travesía Andenes/Av. Ghandi X 820 Z 3494 y Vía de Ronda X 377 Z −268; rampa X −495 Z 683 de 1,2 m a 0,4 m; queda la **rampa del HUC X 2210 Z 3312**: la boca de la rampa empieza 2 m honda justo donde la cruza la calle de servicio, y el coche cae dentro: hay que acortar la rampa o mover el cruce) v0.55.0 **Uniones de túneles y puentes con la vía normal** (hecho: Vallado y boca de la Vía de Ronda) (Jonay, 7-oct): salida del túnel de Camino el Vallado
      (X −942 Z 86 / X −928 Z 64): la losa de arriba se superpone a la salida y no deja salir, y por las paredes
      laterales se ve a través (no debería verse el exterior a través de las paredes del túnel). Vía de Ronda
      (X 388 Z 1499): en la boca confluyen calles y los coches se hunden/chocan. Revisar todas las uniones.
  - v1.1.9: una calle a nivel que cruza o toca una trinchera de 0,3–3 m la deja a nivel debajo de ella y la trinchera empieza a bajar después (≤22 %) (`shallowCrossCaps`): la rampa del HUC ya no está hundida en el cruce.
- [x] v1.1.9 v0.78.0 (comparado: la TF-5 pasa **a nivel** bajo el puente de Cam. San Lázaro; en la realidad va en trinchera: hundirla es un cambio grande, por decidir) Repasar con las fotos del aeropuerto la zona ya hecha alrededor (San Benito, El Coromoto, autopista TF-5). v0.72.0: visto en las fotos que la TF-5 pasa en trinchera bajo la Rotonda Sempiterno y bajo el puente de Cam. San Lázaro; queda por comparar en el juego.
  - v1.1.9: la TF-5 va en trinchera de 6,5 m entre X −2470 y X −1620 (Rotonda Sempiterno y puente de Cam. San Lázaro, que quedan a nivel del suelo) con sus ramales bajando y subiendo; y otra de 6 m junto a la salida del aeropuerto (X −3290). Fotos `calzadas_-1815_-212_*`, `calzadas_-2270_-228_*`.
- [x] v1.1.8 **Para mirar** (visto en las fotos de la 0.77, ya estaba antes): en la Plaza del Adelantado y en el casco hay **marcos
      grises flotando** sobre las fachadas (vigas horizontales a la altura del tejado y algún poste suelto), en
      X 105 Z −45 mirando a la plaza y en X −60 Z −230 mirando a X −10 Z −150. ¿Soportales/pérgolas mal colocados?
  - v0.85.1: fotografiados (`tests/shots/v0851_marcos_*.jpg`, `prueba_0851.py`). Se ven vigas grises largas a unos
    8–12 m, en polilínea sobre las plazas, y en una foto dos postes con un frontón. No son calles elevadas (ninguna vía
    sube más de 2 m allí) ni objetos sueltos: están dentro de las piezas juntadas de la ciudad. Siguiente paso: sacar
    las fotos sin juntar (`?revisor=1`) ocultando cada material, para saber qué código las dibuja.
  - v1.1.8 (`sonda_origen.py`, `sonda_rayos.py`): **no es un fallo del juego**: las dos fotos se sacaban con la cámara *dentro* de un edificio (X 105, Y −45 está dentro del Palacio Nava; X −60, Y −230 dentro de otro del casco). Desde dentro no se ven las paredes (solo se pintan por fuera) y sí la cornisa, la portada y la banda del tejado: eso eran los «marcos».
- [x] v1.1.6 **Nombres de coches demasiado parecidos a las marcas reales** (Jonay, 3-nov: «algunos nombres de los coches se
  identifican demasiado… y en una misión sale un SEAT; eso está mal, no puede haber marcas reales»): en la 1.1.3 el «Seat
  gris» de la misión de la Secreta pasa a «coche gris». Falta repasar la lista de `06b_vmodels.js` (Volksgofio, Tollota,
  Jiundái, Quia, Renol, Pijó, Opal, Citrón, Fiá, Nisanto, Susuki, Fordo, Merceditas, Mitsubichi, Asiento…): proponer a
  Jonay nombres que solo recuerden de lejos (p. ej. por el país o un chiste canario) y buscar marcas reales en todos los
  textos (misiones, rótulos, radio).
- [x] v1.1.6 **Banda de aparcamiento: raya continua corta al principio y al final** (Jonay, 3-nov, foto de C. Narciso de Vera): junto al paso de cebra la banda empieza con una raya continua transversal. La 1.1.4 ya la pinta discontinua y sin dividir plazas; falta esa raya en los extremos (`laneMk` / `ribbon`, `04_world.js`).
- [x] v1.1.4 **Puentes: grietas en las uniones y sin marcas viales** (Jonay, 3-nov, Vía de Ronda X 631, Y 600, captura: «en
  muchos puentes se ven como grietas en las uniones y pierden las marcas viales»): en la junta entre la calzada y el
  tablero del puente queda una raja fina (se ve el fondo) y las líneas del carril se cortan en todo el tablero. Cerrar la
  junta (que el tablero empiece donde acaba la calzada, solapando un poco) y pintar las líneas también sobre los puentes
  (la 0.99.6 ya lo hizo en parte: mirar por qué aquí no).
- [x] v1.1.4 **Choque invisible corriendo junto a las vías del tranvía** (Jonay, 3-nov, X −193, Y 337, captura): a pie se choca
  con algo que no se ve en la acera junto a la Av. de La Trinidad. Buscar el colisionador suelto (sonda en ese punto).
- [x] v1.1.3 **Esc no pausa ni saca del fútbol** (Jonay, 3-nov: «al darle a Esc no me saca del furbito, ni pausa ni nada»): en
  pantalla completa el navegador se queda la tecla Esc (sale de la pantalla completa o suelta el ratón) y no llega al
  juego. Abrir la pausa del minijuego también cuando se sale de la pantalla completa o se suelta el ratón
  (`fullscreenchange` / `pointerlockchange`), con «Seguir» y «Salir del minijuego»; y que P pause en todos los minijuegos.
  Repasarlo en fútbol, basket, pelea, recreativas y Achamán.
- [x] v1.1.3 **La Mirladora: pezón oscuro y falda corta de cuero oscuro** (Jonay, 3-nov, eligió en la hoja de variantes
  `tests/shots/mirla_variantes.png`, hecha con `tools/sprites_ext/mirla_variantes.py`): pezón «Oscuro» (100, 58, 48) y la
  falda «Corta de cuero oscuro» (la corta teñida como el taparrabos, `TAPA`, que se levanta al caer). Mejillas y pelo, como
  están. Rehacer su hoja (`mirla_nat.py`) y la de montada en el lagarto (`riders.py`, `lz_mirla`) y cambiar solo esas dos en
  `src/09jy_sprx_data.js` (no hay en el PC las salidas de las demás para volver a juntarlo todo con `pack.py`).
- [x] v1.1.3 **Guanche Guarriors, campamento: más tiempo para recoger y más fácil pegar a los ladrones** (Jonay, 3-nov: «en el
  campamento hay que dejar más tiempo para recoger lo que soltaron los ladrones cuando terminan de salir, al menos 3–4
  segundos extra; además es muy difícil golpearlos, debes coincidir demasiado en altura, hay que ampliar el margen»): al
  irse el último duende, la fase sigue 3–4 s más para recoger lo que cayó; y el margen de profundidad (eje Y del suelo) para
  acertarles, más ancho (p. ej. el doble). `09m_guanche.js` (fase `camp`, `campT`).
- [x] v1.1.3 **GUFO: la barra de mejoras se entiende mal** (Jonay, 3-nov: «no entiendo qué aporta velocidad… y doble se puede
  elegir cuando ya tienes láser, ¿tiene eso sentido?»; decidido: «pon un indicador de velocidad; si tengo doble sí puedo
  pasar a láser, que es mejor, pero empeorar no tiene sentido; hay que poner indicador de los niveles de lo que vas
  comprando»). `09l_naves.js`:
  - DOBLE no se puede coger si ya tienes LÁSER (sale en gris); de DOBLE sí se puede pasar a LÁSER.
  - Indicador de niveles en la barra: VELOC con sus 4 rayitas (o «VELOC 2/4»), OPCIÓN 0/2, y un tic en MISIL, DOBLE/LÁSER
    y ESCUDO cuando ya los tienes.
  - Al marcar cada casilla, una línea corta de lo que hace: VELOC «la nave va más rápida», MISIL «misil que cae hacia
    abajo y sigue el suelo», DOBLE «tiro extra en diagonal hacia arriba», LÁSER «rayo que atraviesa», OPCIÓN «nave
    fantasma que copia tus disparos», ESCUDO «aguanta 6 golpes».
  - MISIL con dos niveles (Jonay, 3-nov: «misil debería tener un segundo nivel que sale como el actual pero hacia arriba, y
    si hay techo corre por el techo; si no, al llegar al cielo se marcha fuera»): nivel 1 = el de ahora (cae en diagonal y
    sigue el suelo); nivel 2 = además otro hacia arriba que, en las fases con cueva (techo, `terrain().c`), corre pegado al
    techo y, sin techo, sale por arriba de la pantalla. MISIL pasa a «1/2» en la barra.
- [x] v1.1.3 **Bencomo: el guanche agarra la vara más por la punta al clavarla** (Jonay, 3-nov: «el clavado del guanche Bencomo
  debería dejar el palo agarrado más por la punta, de modo que quede más palo por debajo»): en el dibujo del salto con la
  vara (salto del pastor), mover las manos hacia el extremo de arriba para que asome más vara por debajo.
  `tools/sprites_ext/` → `09jy_sprx_data.js` / `09k_bencomo.js`.
- [x] v1.1.3 **Bencomo: los perros corren demasiado** (Jonay, 3-nov: «los perros de Bencomo son demasiado rápidos, redúceles un
  poco la velocidad de carrera; saltar saltan igual; lógicamente con las vueltas irá aumentando como ya hacía el juego»):
  bajar la velocidad base de carrera de los perros, sin tocar el salto ni la subida de dificultad por vuelta.
  `09k_bencomo.js`.
  - Jonay (3-nov, 3 capturas seguidas: «se mueven tan rápido que parece que tengan dos cabezas; cuando están debajo de ti
    cambian de dirección súper rápido… hay que reducirles definitivamente su velocidad general al menos un 25 %; se vuelve
    loco»): velocidad general −25 % como mínimo, y que no puedan girarse más de una vez cada ~0,5 s (cuando el jugador
    está justo encima, que sigan de largo un poco antes de dar la vuelta, en vez de temblar de lado a lado).
- [x] v1.1.3 **Bencomo: el golpe llega muy corto** (Jonay, 3-nov: «Bencomo pega de muy cerca, solo debería extender un poco más el
  golpe y el efecto del ataque verse un poco más lejos»): alargar el alcance del golpe (la caja que hace daño) y dibujar el
  destello del impacto más adelante, a la distancia nueva. `09k_bencomo.js`.
- [x] v1.1.3 **Fútbol: nombre y dorsal del rival que lleva el balón** (Jonay, 3-nov: «en el furbito debería decir en algún sitio,
  cuando la lleva el enemigo, qué nombre tiene el jugador, siempre inventados, y su número, por ejemplo en la parte inferior
  derecha»): abajo a la derecha, «7 · PEPE TOLETE» del que tiene el balón (también los tuyos). Nombres inventados por
  selección (parodia, nunca reales). Lo mismo en el basket. `09g_futbol2d.js`, `09f_basket2d.js`.
- [x] v1.1.3 **Pelea callejera: textos y barras demasiado grandes** (Jonay, 3-nov, captura a 1920×1080): las barras de vida,
  el «KO», los nombres («EL CHOPA», «SASTRÓN») y el rótulo de los golpes ocupan demasiado; más pequeños, sobre todo los
  nombres. `09d_fight2d.js` (el HUD se dibuja a la escala de la pantalla: mirar con qué tamaño sale a 1080p).
  - Jonay insiste (3-nov, otra captura: «enorme la verdad lo de las peleas»): también el recuadro de CONTROLES del
    principio ocupa casi toda la pantalla. Todo a la mitad o menos.
- [x] v1.1.3 **Pelea 2D: no pintar detrás a la gente de la calle que pelea** (Jonay, 3-nov: «en las peleas 2D no se deberían
  renderizar las personas de fondo, porque se veía el que estaba peleando conmigo a la vez que peleaba con él»): el fondo
  3D de la pelea saca al rival (y al Chopa) de pie en la calle, a la vez que sus dibujos de la pelea. Esconder al rival y
  al jugador del mundo 3D mientras dura la pelea (o toda la gente cercana) y volver a mostrarlos al acabar. `09d_fight2d.js`.
- [x] v1.1.3 **«Salir» en el menú de pausa** (Jonay, 3-nov: «al estar a pantalla completa no se puede salir… el menú de pausa no
  tiene un salir»): botón «Salir del juego» (guarda si hace falta, sale de la pantalla completa y cierra la ventana del
  lanzador; en el navegador normal, vuelve al menú de inicio). `13_main.js`, `index.html`.
- [x] v1.1.3 **Cambiar de arma con los botones laterales del ratón, no con la rueda** (Jonay, 3-nov: «lo de la rueda fue mala
  idea… al cambiar zoom cambio arma; para eso están los botones adelante y atrás»): quitar el cambio con la rueda
  (`09c_weapons.js`, ~línea 144) y usar los botones 3/4 del ratón (atrás = arma anterior, adelante = siguiente), evitando
  que el navegador vaya «atrás». Actualizar el texto «TAB / 1: puños» y Opciones › Controles.
- [x] v1.1.3 **Anochece de golpe** (Jonay, 3-nov: «oscurece muy de golpe, debería ser más gradual; de un segundo a otro te
  oscurece muchísimo»): al pasar de día a noche la luz cae casi de una vez. Hacer el atardecer y el amanecer graduales
  (sol, luz ambiente, niebla y cielo con una curva suave de ~1 hora de juego) y mirar si hay un salto al cambiar la
  velocidad del reloj de día a noche (`dayRate` en `13_main.js`: 150 s por hora de día y 40 s de noche desde las 20:24).
- [x] v1.1.3 **La leyenda del mapa no dice de quién es cada punto de misión** (Jonay, 3-nov: «las misiones secundarias no
  salen en la leyenda del minimapa, como las del Obispo; las de la zona entre Curva de Gracia y Finca España tampoco: se
  ve un punto naranja pero no hay leyenda… ¿esto es la cadena principal o qué es?»): la leyenda (`11_hud.js`, `legend()`)
  solo trae «Misión» en amarillo, y cada cadena tiene su color (`12_missions.js`, `TRACKS`): Historia amarillo, El Canarión
  azul claro, El Obispo morado, Torneo Lagunero naranja, Copa Laguna verde, El Secreta salmón, Carreras del Canarión cian.
  Añadir a la leyenda una línea por cadena ya abierta, con su nombre y su color; y que los naranjas del Torneo y el
  salmón de El Secreta se distingan mejor entre sí y del amarillo.
- [x] v1.1.3 **Carreras: el tramo siguiente en el minimapa, en amarillo suave en vez de azul** (Jonay, 3-nov, carrera
  «Gánale al pijo», captura: «el siguiente punto de ruta del minimapa me gustaría que se viera como el amarillo actual
  pero más suave en lugar de azul»): el trazo discontinuo del tramo siguiente se pinta en `#46c3ff` (`11_hud.js`,
  `MISSIONS.aheadPath()`, ~línea 125). Pasarlo al amarillo de la ruta (`#f5b72e`) más claro y transparente (p. ej.
  `#f5d98a` al 55 %), y lo mismo en el mapa grande si lo pinta.
- [x] v1.1.3 **Pasaje Aguere: mesas y sombrillas flotando** (Jonay, 3-nov, X −213, Y 49, captura): las mesas de la terraza del
  pasaje no tocan el suelo. Ponerlas a la altura del suelo del pasaje (`05x_pasajes.js`).
- [x] v1.1.3 **Pasaje Aguere: el mismo cartel en cada local** (Jonay, 3-nov, X −213, Y 46, captura): «Tasca El Soportal» y
  «Móviles Guanchófono» se repiten en todos los huecos del pasaje, uno tras otro. Pocos negocios con cartel (3–5, distintos
  y parodias) y el resto de locales cerrados o sin rótulo. Los carteles del pasaje salen de `05x_pasajes.js`.
- [x] v1.1.3 **Contenedores de basura en medio de la calzada** (Jonay, 3-nov, C. Adelantado X −757, Y −359): van pegados a un
  lado (junto al bordillo o en su hueco de aparcamiento), nunca en mitad de la calle. Revisar dónde se colocan en todas.
- [x] v1.0.2 **La gente de los interiores no se mete en los muebles** (Jonay, 3-nov, Café Brasilito: «la gente atraviesa el
  mostrador; eso no puede pasar ni aquí ni en ningún sitio»): al amueblar cada sala, quien quede dentro de una barra, mesa,
  estantería o banco se saca por el lado más corto (`clearInteriorNpcs`, 05g_interiors.js).
- [x] v1.0.2 **El Chopa mide 1,83 m y los delgados no son tan extremos** (Jonay, 3-nov).
- [x] v1.0.2 **Recorte por el bordillo, también en curva, y recuperar edificios quitados** (Jonay, 3-nov): `kerbClip`
  (04b_recorte.js); los quitados bajan de ~440 a 251, todos de menos de 50 m².
- [x] v1.0.1 **Versión en carpeta para los testers, con lanzador, icono y pantalla completa** (Jonay, 3-nov): `dist/JETA La
  Laguna/` (Jugar.bat, LEEME.txt, juego/) y la orden `zip_testers`; ver CHANGELOG 1.0.1. Los datos grandes que van dentro
  del código (sprites en base64) siguen en `js/juego.js`: sacarlos a `datos/` pide cambiar cómo los lee cada módulo.
- [x] v1.0.1 **Pantalla completa al empezar en el navegador** (Jonay, 3-nov): al darle a «Jugar» y a «Continuar».
- [x] v1.0.1 **Esquinas de los edificios en los cruces, recortadas en paralelo a la calle** (Jonay, 3-nov, tras las fotos de
  los 7 puntos del casco): muesca en ángulo recto (`subtractConvex`, 04b_recorte.js). Quedan la Capilla de la Cruz Verde
  (que la calle la rodee) y la calle de servicio que cruza la plaza del Mercado (quitarla): por confirmar con Jonay.
- [x] v1.0.0 **Auditorías viejas cerradas** (0.46, 0.49, 0.55, 0.58.2, 0.59, 0.75, 0.76): lo que quedaba de ellas está ahora en
  tres apuntes de «Rendimiento, auditorías y código» (pintado a 60 fps, arranque P2.1/P2.2 y funciones largas).
- [x] v1.0.0 **Edificios que invaden la calzada** (auditorías 0.58.2 y 0.59; 0.99.8: 4 críticos y 77 altos; Jonay, 3-nov:
  «¿es posible que se deba al aumento del ancho de las calles?» y «un término medio de cada cosa»): las residenciales, de
  servicio y sin clasificar fuera del casco y lejos de puentes y túneles se estrechan a medio camino del hueco entre
  fachadas (`narrowToGap`, 04b_recorte.js; nunca menos de 5,5 m las de doble sentido); los edificios se recortan aunque
  pierdan más de la mitad, y si solo queda una tira se quitan, pero nunca uno de 50 m² o más. `prueba_recorte`: de 121 a
  14 metidos más de 1 m. Los de 50 m² o más que se habrían quitado están apuntados en «Agente revisor».
- [x] v1.0.0 **Alturas de la gente según la realidad** (Jonay, 3-nov, con una tabla por sexo): cada persona saca su altura
  de la tabla; antes todos medían 1,50–1,70 m porque al estrecharles los hombros se acortaban.

- [x] v0.99.8 **Empedrado de las calles peatonales del casco más oscuro** (Jonay, 2-nov; 3 capturas en `docs/referencias/empedrado/`: Pl. de los Remedios / C. Bencomo y C. Obispo Rey Redondo n.º 31 y 35): el real es gris oscuro basáltico, adoquín rectangular en el centro y losas grandes a los lados; el del juego es más claro. Textura `paving` en `src/02_textures.js`.
- [x] v0.99.8 **La rueda del ratón cambia de arma** (Jonay, 2-nov): hoy solo con 1 (manos) y 2 (arma) en `src/09c_weapons.js` (`setWeaponOut`); con la rueda, pasar a la siguiente o anterior de las que se tienen (puños, pistola, rifle de agua…). Que no choque con el zoom de la cámara si lo hay.
- [x] v0.99.8 **Coordenadas X, Y y altura en el minimapa** (Jonay, 2-nov: «tenemos latitud y longitud pero no la altura»; elegido «X, Y y altura aparte»): en pantalla «X 386 · Y −276 · altura 35 m» (Y = lo que ahora se llama Z). Cambiar también el nombre en los informes del agente revisor, la auditoría (`mapa.md`), las sondas y en PENDIENTES / CLAUDE.md para que todo coincida (las capturas viejas dicen Z).
- [x] v0.99.7 **Pasada del agente revisor y la auditoría con reglas comunes** (Jonay, 2-nov): edificios atravesados por una calle recortados, pasadizos para los caminos a pie que cruzan edificios, medianas abiertas en los pasos de peatones, sin coches aparcados sobre caminos, la trinchera ya no empuja a los coches de arriba, la Vía de Ronda conserva sus líneas. Quedan «se sale de la calzada» (piloto del agente al final de calles sin salida) y edificios de OSM que siguen metidos.
- [x] v0.99.7 **Ventanas de las fachadas cortadas por el suelo o por el tejado** (Jonay, 2-nov): plantas enteras desde el suelo más alto, zócalo liso debajo en cuesta, altura en plantas enteras.
- [x] v0.99.6 **Baloncesto: tiro, robo, rebote, tapón y los cuatro mates de los combos con el pack; aspectos distintos** (Jonay, 27-oct a 2-nov): los mates acaban con las manos en el aro (se inclina), la red se mueve, balón algo mayor que la cabeza, jugadores un 6 % más pequeños y cada uno con su pelo y su talla.
- [x] v0.99.6 **Guanche Guarriors a 640×448, los personajes al 75 %; la secuaz roja y la vikinga sin casco; el pie de los jinetes enemigos por delante del lagarto** (Jonay, 27-oct).
- [x] v0.99.6 **Pasos inferiores cortos (Ofra, bocas de la TF-5): se hunden menos y la carretera de encima sube en terraplén con muros** (Jonay, 27-oct: «muros en medio de la carretera y salida de túnel con carretera que vuela encima»).

- [x] v0.99.4 **Baloncesto: jugadores con la camiseta de asillas del pack, hechos a partir del aspecto de cada uno** (Jonay, 27-oct).
- [x] v0.99.3 **Guanche Guarriors: chicas sobre la base nueva (La Mirladora, la bruja) y cinco secuaces hembra en las oleadas** (Jonay, 27-oct).
- [x] v0.99.2 **Guanche Guarriors: patada en carrera = la caída original, solo girada (al dibujarla)** (Jonay, 27-oct).
- [x] v0.99.1 **Guanche Guarriors: patada en carrera sin perder calidad, piernas del color del tronco, sin el escudo tapando la cabeza** (Jonay, 27-oct).
- [x] v0.99.0 **Fondos de Guanche Guarriors y de Bencomo a partir de fotos reales** (Jonay, 27-oct): dibujados a partir de lo que muestran sus fotos (`docs/referencias/fondos_guanche/`, `fondos_bencomo/`), en capas de paralaje; `tools/fondos/`.
- [x] v0.99.0 **Guanche Guarriors: la mordida del lobo salía en el aire** (Jonay, 27-oct): sigue al hocico fotograma a fotograma.
- [x] v0.99.0 **Guanche Guarriors: Tenique, la Reina Harimaguada y las Harimaguadas; Guayota más pequeño, con todos sus fotogramas y píxel a píxel; patada en carrera sin perder calidad** (Jonay, 27-oct).
- [x] v0.98.2 **Guanche Guarriors: patada en carrera girada al revés** (Jonay, 27-oct): ahora la pierna estirada va delante y abajo y la cabeza arriba.
- [x] v0.97.2 **Guanche Guarriors: patada en carrera 15° menos tumbada** (Jonay, 27-oct).
- [x] v0.97.0 **Guanche Guarriors: La Mirladora sin bikini y más rubia** (Jonay, 27-oct): pezón rosado; también montada en el lagarto (`tools/sprites_ext/mirla_nat.py`).
- [x] v0.96 **Propuesta de baloncesto: camisetas de asillas sin pecho al aire, pantalón por la cintura, sin balón dibujado** (Jonay, 27-oct; en la página de propuestas, aún no en el juego).
- [x] v0.96.3 **Guanche Guarriors: patada en carrera con las piernas de La Mirladora en todos y quieta** (Jonay, 27-oct).
- [x] v0.96.2 **Fútbol: el portero sacaba recto contra el rival que acababa de chutar** (Jonay, 27-oct): ahora pasa al compañero más cercano, raso o bombeado si hay un rival en la línea.
- [x] v0.96.0 **Guanche Guarriors: el mordisco de los perros se salía del perro y era muy grande** (Jonay, 27-oct): más pequeño, en el hocico.
- [x] v0.96.0 **Guanche Guarriors: la patada enseñaba 3 piernas** (Jonay, 27-oct): ahora una de apoyo y la que sube.
- [x] v0.96.0 **Guanche Guarriors: patada en carrera con la postura de caída girada** (Jonay, 27-oct; captura de La
  Mirladora cayendo): brazos arriba y la pierna estirada por delante.
- [x] v0.96.1 **Guanche Guarriors: los golpes salen al soltar** (Jonay, 27-oct): corto = normal, medio segundo mantenido = fuerte (la 0.96.0 hacía salir la patada fuerte sola; Jonay: «el ataque se suelta al soltar el botón»).
- [x] v0.96.0 **Guanche Guarriors: «escudo» blanco fijo sobre La Mirladora** (Jonay, 27-oct; captura con el Gigantón de
  Tigaiga): era el destello de un golpe, que en el héroe no se apagaba nunca.
- [x] v0.95.3 **Bencomo: el caballero a tamaño normal** (Jonay, 27-oct): «el único grande es Lugo».
- [x] v0.95.2 **Guanche Guarriors: montado en el lagarto, en el campamento no se veía el personaje** (Jonay, 27-oct):
  al entrar en el campamento se borraban los lagartos pero el héroe seguía «montado»; ahora se baja.
- [x] v0.95.2 **Auditoría v0.90.0, aviso alto de `09ma_pixguanche.js` (getImageData)**: desde la 0.93 ese dibujo solo se
  usa mientras cargan las hojas nuevas; ahora todas empiezan a cargar al abrir la máquina (también en Bencomo).
- [x] v0.95.2 **Auditorías v0.90/v0.92: repetir la medición de pintar**: repetida en cada auditoría desde la 0.93, se
  queda en ~30 ms (sigue abierto «buscar qué lo subió»).
- [x] v0.95.2 **prueba_076 a veces fallaba en «mojado»**: el peatón se queda quieto mientras se le moja (se salía del
  chorro) y te pones a 2,5 m para la pelea.
- [x] v0.95.0 **Fútbol: campo un 30 % más grande y un jugador de campo más** (Jonay, 27-oct): 5 + portero.
- [x] v0.95.0 **Fútbol: cambio de jugador en defensa** (Jonay, 27-oct): con el botón derecho, si el más cercano al balón va
  corriendo por detrás y hay otro defensor por delante del balón a distancia parecida (hasta 1 m más lejos, con
  jugadores de ~1,75 m), elegir al de delante: priorizar al defensor hacia el que avanza el balón frente al que se aleja.
- [x] v0.94.0 **Controles y golpes nuevos** (Jonay, 27-oct):
  - Botón izquierdo mantenido: **golpe fuerte** (animación algo más lenta, pega más, destello en el golpe).
  - Botón derecho: **patada a la entrepierna**, que aturde (para luego rematar con golpe en salto). Los enemigos
    grandes necesitan una **parada fuerte** (botón derecho mantenido) para aturdirlos. Las hechiceras y demás
    personajes femeninos no se aturden con la patada: solo reciben daño.
  - **Magia**: botón izquierdo + derecho mantenidos.
  - **Ataque en carrera** = parada con el botón derecho: el personaje casi en horizontal (girado 80°) con la pierna
    extendida por arriba, como la caída actual de La Mirladora (captura de Jonay), espejado según vaya a izquierda o
    derecha. Los otros dos tienen las piernas distintas en la caída: hay que ajustarlos para que lleven la pierna
    estirada.
  - **Los enemigos también hacen todos estos ataques**, más cuanto más nivel tengan (no siempre el golpe simple).
- [x] v0.94.0 **Retrato del enemigo al que pegas** (Jonay, 27-oct): arriba, con su nivel y su vida; cambia al pegar a otro.
  Si un golpe da a varios, se queda el más fuerte (si son iguales, uno al azar de los golpeados).
- [x] v0.94.0 **Perros más grandes** (Jonay, 27-oct): ahora no dan miedo; el jefe (el tibicena mayor) aún más grande. Que
  muerdan con un efecto parecido al del lagarto, y los jefes perro usan mucho el ataque en carrera.
- [x] v0.94.0 **El duende ladrón** (Jonay, 27-oct): quitarle la barriga que se le puso; acortarle el tronco 2 píxeles y las
  piernas otros 2. Un gorro de Papá Noel **azul** para los que llevan pociones azules; los rojos (los que dan comida)
  siguen con el rojo.
- [x] v0.94.0 **Más margen vertical para acertar los golpes** (Jonay, 27-oct): ahora parece que estás delante del enemigo
  pero no le das hasta ponerte casi a su misma altura (profundidad `z`).
- [x] v0.94.0 **Los caballeros castellanos no pegan en estilo** (Jonay, 27-oct): hacerlos como Lugo a caballo (PixelHorse ×2
  con trazo), pero sin lanza, con espada normal, el caballo con menos armadura y montado por un capitán.
- [x] v0.94.0 **El picado con la vara** (Jonay, 27-oct): usar la pose de agachado, con la vara bien dibujada (como la que
  lleva) apuntando hacia abajo.
- [x] v0.94.0 **La vara en los saltos largos** (Jonay, 27-oct, tras la v0.93): ahora es una línea; debe parecerse a la vara
  que lleva (con su grosor, color y trazo). Es la vara larga, pero cogida por el medio: sobresale por detrás tanto como
  por delante (así no gana distancia de ataque).
- [x] v0.92.0 **Camino el Vallado / San Honorato, boca del túnel** (Jonay, 19-oct): la rampa baja por los dos ramales de la Y; una sola trinchera que entra en el túnel.
- [x] v0.91.0 **TF-5: los dos sentidos separados** (Jonay, 26-oct, con Street View junto a San Benito): calzadas apartadas al cargar, New Jersey con postes azules entre los sentidos y bionda con la calle de al lado (Espinero, Carretera General).
- [x] v0.90.0 **Borrada la copia sobrante `src/09f_basket2d-1.js`** (Jonay, 26-oct).
- [x] v0.90.0 **Basket: el saque de fondo tras canasta** (Jonay, 26-oct: «no puede aparecer en medio, debe haber continuidad»).
- [x] v0.90.0 **Bencomo: barrigota y brazos que parecían orejas** (Jonay, 26-oct): pecho en V y brazos en alto enteros.
- [x] v0.90.0 **Basket y fútbol: el público** (Jonay, 20-oct): organillo, «¡de-fen-sa!», «¡uuuh!», ovaciones, el bombo y el rugido de la grada.
- [x] v0.90.0 **Más efectos en basket, fútbol y pelea** (Jonay, 20-oct): el público de cada uno, zapatillas, red, corro de mirones en la pelea.
- [x] v0.90.0 **Personajes nuevos de Bencomo, Guanche Guarriors y el fútbol** (Jonay, 26-oct): Bencomo «versión juego» (v0.89), fútbol F2 (v0.88), Guanche Guarriors G1 (v0.90; renombrados: El Magote, El Mencey, La Mirladora).
- [x] v0.90.0 **Auditoría v0.89.0**: la defensa del basket (clic derecho y ayudas) en funciones propias.
- [x] v0.90.0 **Auditoría v0.88.1**: los 137 avisos eran del comparador; en las de la 0.89 ya no salen.
- [x] v0.90.0 **Auditoría v0.87.1**: repetida en la 0.89.0/0.89.1: pintar 31,3–32,3 ms y arranque 8,6–9,4 s (era ruido).
- [x] v0.90.0 **Auditoría v0.86.0**: el mundialito, una función por pantalla (lo que hace con los botones y cómo se dibuja).
- [x] v0.90.0 **Auditoría v0.85.1**: los avisos de `doorKit()`/`cFrame()` eran falsos (cambio de nombre) y ya no salen.
- [x] v0.90.0 **Auditoría v0.85.0**: la subida de pintar era ruido (ahora 31–32 ms).
- [x] v0.90.0 **Auditorías v0.82.1 y v0.82.2**: pintar ha vuelto a 31–32 ms; el diario, partida la línea de 800 caracteres y los textos largos (quedan líneas de HTML de ~250).
- [x] v0.89.0 **Basket: combos** (Jonay, 26-oct): 25 % menos de tiempo (2,7 s) y, si se falla, vuela igual y el mate da en el hierro.
- [x] v0.89.0 **Vueltas: más difíciles y más puntos** (Jonay, 26-oct): Bencomo, GUFO y Guanche Guarriors puntúan ×(1 + 0,5·vuelta); GUFO un 5 % más rápido.
- [x] v0.89.0 **Bencomo: el picado sobre el jinete te golpeaba a ti** (Jonay, 26-oct): ahora vale caer en la mitad de arriba del enemigo.
- [x] v0.89.0 **Basket y fútbol: control y defensa** (Jonay, 26-oct): el que tiene el balón siempre es el tuyo; clic
  derecho defendiendo = el más cercano al balón (o robo/entrada si ya lo eres); ayudas en defensa hacia el aro/portería.
- [x] v0.89.0 **Bencomo: el muñeco nuevo** (Jonay, 26-oct: «me gusta, usa ese»): como el de antes, con el detalle del B3.
- [x] v0.89.0 **Pausa con la P en TODOS los minijuegos** (Jonay, 20-oct): la P pausa (cartel «PAUSA», música y reloj
  parados) y otra pulsación reanuda. Basket, fútbol, pelea 2D, Bencomo, GUFO, Guanche Guarriors y los que vengan.
- [x] v0.87.0 **Pachanga 3x3: EE. UU., Serbia y Lituania** (Jonay, 26-oct) en vez de Brasil, Portugal y Uruguay (que siguen en Play Furbito).
- [x] v0.87.0 **Pachanga 3x3: las equipaciones de la pantalla de elegir país parecen de fútbol** (Jonay, 26-oct). En
  Play Furbito están bien; en el basket tienen que ser de basket: camiseta de tirantes, pantalón largo, calcetín
  corto y zapatillas (`kitMan()` en `12m_mundialito.js`: una figura por deporte).
- [x] v0.87.0 **El mundialito: España no puede ser de las flojas** (Jonay, 26-oct): es campeona del mundo de fútbol y en
  basket ha ganado Europeos y Mundiales. Ahora cada selección tiene un solo nivel para los dos juegos (España 0,60,
  de las más bajas). Propuesta: un nivel por deporte (`lv` → `lvB` / `lvF` en `12m_mundialito.js`; también cambian
  las barritas de nivel de la pantalla de elegir país):
  - Basket: España 0,72 · Francia 0,68 · Argentina 0,66 · Alemania 0,66 · Italia 0,60 · Brasil 0,56 · Portugal 0,50 ·
    Uruguay 0,50.
  - Fútbol: España 0,72 · Argentina 0,71 · Francia 0,70 · Brasil 0,70 · Alemania 0,66 · Portugal 0,66 · Italia 0,62 ·
    Uruguay 0,60.
- [x] v0.86.0 **Pachanga 3x3 y Play Furbito: todo dentro del minijuego** (Jonay, 20-oct). La elección de selección y las
  pantallas del mundialito no pueden salir al mundo 3D (ahora son ventanas de diálogo del juego principal).
  - Elegir país en la propia pantalla de la GOFIO-8: banderas y equipaciones de las 8 selecciones, flechas y A para
    elegir.
  - Dentro de la consola también:
    - el cuadro de cruces (cuartos, semifinal, final), «¡Eliminados!» y «¡Campeones!»;
    - las iniciales en la tabla de campeones, como en las máquinas.
  - Al acabar cada partido se vuelve a la pantalla de la consola, no al salón. Solo se sale con Esc (dos veces) o al
    terminar el mundialito.
  - Toca `12m_mundialito.js` (pantallas propias como juego de `09j_arcade.js`) y el arranque y el final de
    `BASKET2D` y `FUTBOL2D`.
- [x] v0.85.1 **Bencomo: «PICADO» en vez de «POGO»** (Jonay, 20-oct): en la ayuda, bajar con la vara en el aire se llama «Picado».
- [x] v0.85.1 (primera Esc: menú de cartuchos; segunda: al mundo 3D sin pausa) **Esc en la consola** (Jonay, 20-oct): ahora Esc sale del juego y además abre el menú de opciones del juego
  principal. Debe ser: la primera pulsación vuelve al menú de cartuchos de la GOFIO-8, la segunda sale al mundo 3D, y
  nunca se abre el menú de opciones.
- [x] v0.85.1 (el que recibe tu pase pasa a ser el tuyo) **Baloncesto 2D: control al recibir** (el 3 contra 3 ya está, v0.84.0; comprobar si sigue pasando) (Jonay, 19-oct, apunte): que sea **3x3** (ahora 2x2). Al pasar,
      **el que recibe el balón pasa a ser el tuyo** automáticamente; ahora hay que volver a pulsar pasar en medio del pase
      para quedarte con el control del receptor.
- [x] v0.85.1 (el que huye frena menos en curvas y corre un 10 % más) **Persecuciones en coche demasiado fáciles** (Jonay, 19-oct, apunte): los coches enemigos de las misiones frenan
      demasiado en las curvas y no corren lo que deberían; que sea un poco más difícil (menos frenada en curva, más
      velocidad punta). (El cambio de la 0.78 en las curvas fue solo del conductor de la prueba, no del juego.)
- [x] v0.85.1 (si dos se tocan con 1,5 m de pasillo, se queda la grande) **REGLA (Jonay, 19-oct): las canchas nunca pueden quedar una sobre otra ni cruzarse**, cada una con su espacio entre
      ellas. Captura en X −171 Z −462: dos campos y una cancha de baloncesto pisándose (porterías y canastas dentro del
      otro campo). Revisar `pitchRects` y el dibujo en `SPORTS.pitches`: si se solapan, recolocar, encoger o quitar
      una, dejando un pasillo entre ellas.
- [x] v0.85.1 (puertas de los interiores con geometrías y materiales compartidos) **Auditoría v0.83.0** (20-oct 18:35, APTO CON AVISOS):
  - 11 avisos nuevos del análisis estático en `addInterior()` de `05g_interiors.js`, que crea geometría. Solo pasa al
    construir la ciudad (las casas), no en cada fotograma; aun así se podrían compartir las geometrías de las puertas.
  - Pintar un fotograma baja a 34 ms.
- [x] v0.85.1 (nueva regla en tools/comentarios_que_comen.py: «//» a media línea que acaba en «;» o «}» con código) **Lint**: dos veces hoy (v0.82.0 y v0.82.2) un comentario `//` puesto a media línea se comió el código que iba
  detrás, y `lint_js.py` no lo vio. Mejorar la regla: avisar de cualquier `//` seguido de `;` y de más código en la
  misma línea.
- [x] v0.85.1 (cFrame reutiliza sus objetos de ayuda) **Auditoría v0.81.0** (20-oct 16:19, APTO CON AVISOS):
  - 2 avisos nuevos del análisis estático: `05o_concepcion.js:72-73`, `cFrame()` crea objetos de three.js.
  - El agente revisor de jugabilidad (v0.78.0) tiene 14 avisos nuevos.
  - Pintar un fotograma: 29 → 30,9 ms. El arranque: 8,7 → 9,1 s.
- [x] v0.85.1 (comprobado: el obstáculo de Juan de Vera ya no sale en la auditoría 0.85) **Auditoría v0.78.1** (19-oct 19:17, APTO CON AVISOS):
  - Un obstáculo nuevo en la calzada: árbol, farola o poste en Calle Juan de Vera (X −149, Z −235).
  - Pintar un fotograma: 21,2 → 31,8 ms. Era ruido: en la 0.79.0 salió 23,4.
  - El arranque sube de 8,2 a 9,4 s.
- [x] v0.85.1 (auditoría 0.85: ningún árbol dentro de la calzada; los 8 avisos que quedan son los contenedores, el portal y la isleta de la escena de inicio, puestos a propósito como en Street View) **Auditoría v0.74.0** (APTO CON AVISOS; pruebas 14/14; ningún edificio ni obstáculo nuevo en calzada, 1 menos):
      pintar un fotograma 43,8 → 49,9 ms y arranque 12,3 → 14,1 s (puede ser ruido; si se repite, mirar la comprobación
      de calzada, que ahora mira 3 calles en vez de 1 al colocar el mobiliario). La prueba 0.74 cuenta 468 árboles a menos
      de 0,2 m del borde de una calzada (isletas y medianas, casi todos): revisar si alguno está de verdad dentro.
- [x] v0.85.1 (gateIcon ya comparte material; riosTejeraInit se ejecuta una sola vez: falsos avisos) **Auditoría v0.66.0** (APTO CON AVISOS, comparada con la 0.65.1; sin fugas ni obstáculos nuevos; pruebas 18/18):
      5 avisos nuevos de geometría creada en `12i_canchas.js` (`gateIcon()` l. 33 y `riosTejeraInit()` l. 72–77): se
      crean una vez al cargar (puertas de canchas, pabellón), no al jugar; valorar compartir geometrías si Jonay quiere.
      Obstáculos en calzada (40; 5 «alta», capturas en `resultados_pc\2026-10-12_0.66.0_local\capturas_mapa`): Av. de La
      Trinidad (-146 178) y (-149 188) — ya apuntada la avenida —, Glorieta del Brasil (-301 723, junto a la rampa del
      puente), Camino de las Peras (118 -636) y Av. Lora Tamayo (193 1091, bolardo junto al campo de fútbol). Las 22
      «media» son casi todas de vías de servicio (5,2 m) cerca de -3300 100 y -200 800: revisar si son reales.
      Pintar un fotograma 31 → 42 ms en la 2.ª pasada del mismo día con el mismo mapa: probablemente ruido (solo cambió el baloncesto).
      Agente revisor de jugabilidad: 130 avisos, 32 nuevos (ver `reportes/ULTIMO.md` del auditor). No tocar hasta que Jonay lo diga.

- [x] (v0.83.2) **Guanche Guarriors, golpes nuevos** (Jonay, 20-oct):
  - **Atacar corriendo**: un salto hacia delante con una patada, en vez de la embestida.
  - **Los lagartos tienen que atacar**:
    - Mordiscos, alargando el cuello.
    - En carrera, un salto con coletazo.
    - Vale para los que montan los enemigos y para el tuyo.
  - **Botín**: de vez en cuando, con poca probabilidad, los enemigos sueltan pócimas de magia (para recargar a mitad de
    fase, no solo con los duendes), y algunos sueltan comida.
  - **El remate por detrás**: tras 2 o 3 golpes el enemigo se queda un momento aturdido, antes del remate. Si ahí
    pulsas saltar, el guerrero hace una pirueta por encima, le golpea por la espalda y lo tumba.
- [x] (v0.82.2) **¿Dónde hay una juguetería?** (Jonay, 20-oct). Ahora mismo solo se ve el icono de la gota azul flotando sobre la
  tienda cuando estás a menos de unos 400 m; no salen en el minimapa ni en el mapa grande (M). Propuesta:
  - Ponerlas en el minimapa y en el mapa grande con la gota azul, una vez abiertas.
  - Lo mismo para los bares y cafeterías de la máquina de Guerra de Naves.
  - En el diario, «la más cercana» con el botón de ruta del GPS.
- [x] (v0.82.1) **Diario (J): todo lo que te cuentan por el móvil también sale en el diario** (Jonay, 20-oct):
  - Por ejemplo, lo de los maleantes y lo de las recreativas que explica El Blanco: Bencomo en su casa, Guerra de
    Naves en los bares y Guanche Guarriors en las jugueterías. También todas las cosas de ese tipo.
  - **Lo que todavía no es accesible no se ve.** Nada de «aún no» ni de entradas pendientes con nombre: el diario se
    va descubriendo según puedes acceder a las cosas.
  - Cada cosa del móvil, con su entrada: quién te lo dijo, qué es y dónde está.
- [x] (segunda pasada de Jonay, 19-oct 15:59: pintar 21,2 ms, arranque 8,2 s, todo lo demás igual: era ruido de la medida) **Auditoría 0.78.0** (APTO CON AVISOS, vs la última medida de la 0.77): pintar 21,5 → 31 ms (+44 %), arranque
      7,8 → 9,1 s; llamadas 811 → 803, triángulos y memoria casi iguales (+0,7 MB de geometría por los pasajes). Las
      cuatro pasadas de la 0.77 dieron 28,7 / 31,2 / 30 / 29,8 ms, así que el 21,5 parece la medida rara: volver a medir.
      Sin fugas. Pruebas 39/39.
- [x] v0.76.0 **Maleantes: que quede claro cuándo empiezan** (Jonay, 13-oct, apunte): no se entiende de dónde salen. Que se
      presenten al **terminar el tutorial de pelea (Sastrón)**: alguien te lo explica (qué son, recompensa, cómo se ven) y
      en el minimapa salen como **puntos rojos** (ahora son verde lima `#c6ff00`; ojo, el rojo es también el de los
      perseguidos en misión: distinguirlos, p. ej. con otra forma).
- [x] v0.76.0 **Más misiones del Canarión, de carreras de coches** (Jonay, 13-oct, apunte): p. ej. una carrera **de noche en la
      pista del aeropuerto de Los Rodeos** (mucho espacio; llegar con los coches hasta allí «será una locura»: pensar el
      acceso, o que empiece fuera y la carrera entre por la valla/el acceso de servicio).
- [x] v0.76.0 **Pabellón Juan Ríos Tejera: sale un bloque de pisos de ladrillo** (Jonay, 13-oct, con foto en X −1497 Z −598, Calle
      Leopoldo de la Rosa Olivera; **0.76**): el juego coge como pabellón el edificio grande equivocado (o el genérico de
      viviendas). El de verdad (Street View, n.º 7–8): nave baja y alargada, **paredes blancas con franjas verticales
      moradas**, cubierta gris de chapa, muro bajo blanco a la calle con la **verja morada** de entrada y palmeras.
- [x] v0.76.0 **Tranvía en trinchera junto al Campus Central (Av. Ángel Guimerá Jorge, X −197 Z 732): una «acera» cruza por
      encima de la vía** (Jonay, 13-oct, con foto; **0.76**): un paso peatonal de OSM se dibuja plano a la altura de la calle,
      flotando sobre la trinchera. O se quita, o se hace pasarela de verdad (barandillas, canto), o va al nivel de la vía.
- [x] v0.76.0 **Parking subterráneo de La Trinidad: mucho más grande y más hondo** (Jonay, 13-oct; **0.76**): en la realidad une
      los dos lados y **recorre toda la Avenida de La Trinidad por debajo**. Hacerlo un poco **más profundo**: ahora el
      techo se atraviesa y se ve a través de él.
- [x] v0.76.0 **Parking subterráneo del Camino de las Peras (X 205 Z −577, casco): no deja andar por el carril central**
      (Jonay, 13-oct, con foto; **0.76**): solo se puede pasar por un lado; parece una colisión invisible (columna, muro
      o borde de rampa) en medio del pasillo. Buscarla con `COL` y quitarla o moverla a donde están las columnas.
      **Pasa también en el de La Trinidad** (Jonay): seguramente es el mismo código de los parkings (`05m_parking.js`).
- [x] v0.76.0 **Escaleras peatonales de salida de los parkings: el techo del parking corta la escalera** (Jonay, 13-oct, 3 fotos
      en el **parking de la Plaza del Cristo**, X 167–170 Z −591; **0.76**): desde abajo la escalera sube y se mete en el
      techo; desde arriba (caseta con la «P» en la plaza) se ve una pared a media escalera, y al pie el personaje sale
      hundido hasta el pecho. Es la losa del techo de la sala (`buildHall`) que no deja hueco sobre la caja de la escalera
      (`buildStairwell`, `05m_parking.js`). Abrir el techo encima de cada escalera (como los huecos `gaps` de las rampas) y
      revisar la altura del suelo al pie. **Lo mismo en los dos de La Trinidad** (usan el mismo código).
- [x] v0.76.0 **v0.76: rifle de agua, jugueterías y 10 misiones nuevas** (Jonay, 13-oct; **se hace en la 0.76**, justo después de
      la 0.75). Se llama siempre **«rifle de agua»** (aunque Jonay diga pistola o escopeta).
      - **Siguiente misión del hilo principal**: El Blanco te dice que ya puedes comprar el rifle de agua y se **abren las
        jugueterías**. Una vez comprado, se prueba como el tutorial de las latas: El Blanco **prende fuego a unos papeles**
        y los apagas; luego **recargas en una fuente** que hay allí mismo y, por último, **le mojas la cabeza a Boca Papa**,
        que duerme al lado, **desde 10 m**.
      - Diseño del rifle: estilo «pistola de agua eléctrica tipo rifle» (referencia: SK8 Waterleopard, de airsoftyecla.es):
        chorro parabólico de unos 10 m en recto; donde cae deja un charquito unos segundos; apaga fuegos y empapa a la gente.
      - **Personaje nuevo: el policía secreta**, estilo Torrente (gordito, bigote, muy chapado a la antigua; inventarle
        nombre). Su primera misión se recoge en la **Avenida de los Menceyes**.
      - **Al menos 10 misiones nuevas** entre el Obispo (p. ej. apagar el fuego de una iglesia) y el policía secreta,
        combinando pistola, rifle de agua, peleas, baloncesto, fútbol, coches y carreras a pie, cada vez más complejas.
- [x] v0.75.0 **Copa Laguna (fútbol)** (Jonay, 13-oct): torneo de fútbol con la misma dinámica que el Torneo Lagunero de
      baloncesto (partidos en campos repartidos, rivales cada vez más fuertes, se abre tras el tutorial de fútbol), pero la
      **final se juega en el Estadio Municipal Francisco Peraza** (en el mapa: área deportiva en X −431 Z −1007, campo en
      X −436 Z −1002, anexo en X −573 Z −1043). Recrear el estadio para la final (gradas, entrada).
- [x] v0.75.0 **Al acabar un partido (fútbol y baloncesto) el personaje sigue corriendo solo hacia delante** en el mundo 3D
      (Jonay, 13-oct, apunte): probablemente una tecla que quedó «pulsada» al cerrar el minijuego; soltar todas al volver.
- [x] v0.75.0 **Fútbol: portero y saques** (Jonay, 13-oct, apunte):
      - El **portero puede coger la pelota con la mano**. Cuando para, puede **rebotar o atajarla**. Si la ataja, nadie se
        la puede quitar (si lo intentas, siempre es falta y vuelve a sacar el portero).
      - **Saque del portero** (tras atajarla, saque de puerta o falta): desde el punto de saque, **pasando directamente**
        (no puede correr con el balón). Mientras saca, el juego **no deja acercarse del todo**: ni entrada ni quitarle la
        pelota hasta que saque.
      - **Saques de banda con la mano**: funcionan igual que el de puerta, pero los saca un jugador de campo; mismo radio
        en el que no te puedes acercar, sin entradas ni robos hasta que saque.
- [x] v0.75.0 **Diario (J): las misiones completadas salen sin diálogo** (Jonay, 13-oct, apunte): deberían salir sus
      conversaciones, de la más reciente a la primera, y con quién dijo cada cosa. Mirar: `logLine` solo apunta mientras
      la misión está activa (las charlas de antes de aceptarla y las de las misiones ya hechas en partidas de antes de la
      v0.66 no quedan) y si el registro (`LOG`) se guarda y se carga bien con la partida.
- [x] v0.70.0 (las franquicias de bajo ya no hacen gran superficie) **Av. de La Trinidad: el edificio de «Telepisa»** (Jonay, 13-oct): junto a la rampa del n.º 59 sale un edificio
      enorme, bajo y plano con el cartel de Telepisa en el tejado. En la realidad la pizzería es solo el bajo: tiene que
      ser un bloque de viviendas con la tienda en la planta baja (cartel en la fachada, no arriba).
- [x] v0.67.0 **Fútbol tipo Sensible Soccer** para las misiones del Obispo (segunda pasada).
- [x] v0.78.0 (eran de la prueba: el coche a más de 300 m del jugador dejaba de moverse y tomaba las curvas cerradas a 80 km/h; 112/112) **Prueba de conducción: tramos que fallan** (v0.65.0, pruebas en el PC de Jonay): Camino La Rúa (308, choca en una
      curva X 543 Z −909), Autopista del Norte (1287 X 43 Z 1155 y 2295 X −386 Z 678, se para) y, nuevo, **Camino La
      Hornera** (1667, X 1220 Z 2533: el coche cae, y −123). Fotos `tests/shots/df_*.jpg`.
- [x] v0.66.0 **Diario de misiones con la tecla J** (Jonay, 12-oct): un diario sobreimpreso en pantalla (como en muchos juegos de
      misiones) con las misiones hechas y las conversaciones agrupadas por misión, su estado (terminada o no) y cuál
      sigue. Al elegir una misión se ven sus detalles (diálogos) y hay un botón **Reiniciar** que reinicia esa misión y
      todo lo que va detrás (útil ahora para las pruebas). En la primera misión, cuando El Blanco te la asigne, te dice
      que con la J puedes ver las misiones. (Ojo: la J ya es puñetazo en la pelea 2D, pero solo dentro de la pelea.)
- [x] v0.70.0 (curva redondeada y frenada antes; también el Canarión) **Giros de los coches perseguidos demasiado cerrados** (Jonay, 12-oct): en las persecuciones de misión los coches
      que huyen giran en seco; deberían girar de forma más gradual (curva más abierta, frenar antes de la esquina).
- [x] v0.67.0 **Primeras misiones del Obispo: partidos para la obra de la iglesia** (v0.65.0: las 2 de baloncesto; v0.67.0: las 2 de fútbol) (Jonay, 12-oct; va con «El Obispo y el
      Obispado» y los minijuegos de baloncesto tipo NBA Jam y fútbol tipo Sensible Soccer): jugar partidos de baloncesto
      y de fútbol para recaudar fondos para la obra de la iglesia; ahí aprendes a jugar los dos minijuegos 2D. Buscar
      la **cancha de baloncesto y el campo de fútbol más cercanos al Obispado** para esos partidos.
- [x] v0.65.0 **Farolas y árboles en medio de canchas y campos** (Jonay, 12-oct, bug): no puede haber farolas ni árboles dentro
      de las canchas de baloncesto ni de los campos de fútbol; quitarlos al colocarlos.
- [x] v0.72.0 (tranvía bajo tierra entre Pedro Zerolo y Padre Anchieta) v0.68.0 (calzadas de 6,6 m, edificios a la línea de la acera, casas en los solares, las dos rampas Indigo, Pedro Zerolo y soportales) **Avenida de La Trinidad: entradas al aparcamiento subterráneo** (Jonay, 12-oct, 8 capturas en
      `docs/referencias/av_trinidad/`): ahora es un desastre. Adecuar las rampas de entrada y salida a las reales: la
      del principio (Av. Trinidad 3, Parking Indigo «Trinidad Casco Histórico», rampa azul en medio de la calzada
      partida) y la de abajo (Av. Trinidad 59, junto al Dialprix, rampa azul pegada a la acera con cuadrícula amarilla).
      Las calles del juego son más anchas, así que los **edificios tienen que ser más estrechos** para que todo quepa
      donde está; además hay **zonas que tienen casas y ahora están despejadas**. En esa zona el **tranvía va bajo
      tierra** y está la **unión con la pasarela del Padre Anchieta**. Incluye el cruce con la C. Pedro Zerolo
      (cuadrícula amarilla, pasos de peatones) y el lateral con soportales del n.º 76.
- [x] v0.62.0 **Disco flotante junto al personaje** (Jonay, 12-oct, con capturas): al apuntar se ve algo pequeño y oscuro, como
      una moneda, flotando a la altura del pecho al lado del jugador; sale con la pistola y también con los puños.
- [x] v0.62.0 **Carteles y señales se leen al revés por detrás** (Jonay, 12-oct, captura en Vía de Ronda X 778 Z −351): el
      cartel verde de calles muestra el texto en espejo desde la parte de atrás; la cara trasera debería ser lisa o
      llevar el texto al derecho.
- [x] v0.73.0 (edificios que empeoraban, columnas del Intercambiador; el bolardo en Autopista del Norte X −1216 Z −14 y Cam. San Francisco de Paula X −1139 Z 2155 de la auditoría 0.72 sin localizar: mirar si vuelven) **Auditoría v0.70.0** (APTO CON AVISOS, comparada con la 0.69; repaso 3/3 y tanda 16/18: falla la conducción en los
      tramos de siempre —Camino La Rúa 308, Autopista del Norte 1287, Camino La Hornera 1667— y faltaban los aviones, ya
      arreglados): edificios en calzada 172 → 96 (116 ya no salen, 43 «nuevos» por los empujes de esquinas: Calle Las Eras
      X −439 Z −786 4,6 m, Calle Tabajoste X −1070 Z 1763 4,6 m, Camino La Cañada X −4677 Z −52…; ver `mapa.md`);
      obstáculos 29 → 18, 2 nuevos (árbol o farola en vía de servicio X −183 Z 760 y X −199 Z 758). Métricas casi
      iguales (llamadas 674 → 668, pintar 44,3 ms). Calidad B (72).
      **Misiones por zonas, datos de `sonda_zonas.py`**: El Blanco (inicio) X −753 Z −361; Coco y Sastrón a 470–540 m
      (X −217 Z −305 / X −298 Z −259); Concepción (Boca Papa) a 220 m; Ayuntamiento (alcalde) a 950 m. El orden salta:
      Defensores (Ayto.) → Cristo (Coco) → Vía de Ronda (Ayto., hasta 1,5 km) → rally (Trinidad) → Ayto. → Grafiteros
      (Coco/Sastrón → Mantecas, 3,5 km) → guagua (Concepción) → Ayto. → … → aeropuerto (3 km). Proponer tandas por zona.
- [x] v0.78.0 (galería entera con tiendas y bares, bloque encima donde OSM la dejaba al aire, patio del Cine Aguere con cristalera, mural y escalera; **falta poder bajar** a la galería de abajo) **Pasaje Teide y Pasaje Aguere** (Jonay, 13-oct, a raíz del agente revisor): son túneles peatonales que atraviesan
      edificios por debajo, con alguna tienda y bares dentro. El revisor los da como «edificio que tapa el camino»
      (X −176 Z −66 y X −212 Z 54): no hay que quitar el edificio, sino hacer el paso por debajo (hueco en la planta baja,
      techo, luz) con tiendas y bares parodia a los lados.
- [x] v0.70.0 (recorte en esquinas y empuje: 374 → 189 invasiones; aviones apartados; gunGeos se crea una vez) **Auditoría v0.69.0** (APTO CON AVISOS, comparada con la 0.68; pruebas 22/23, falla solo la conducción en los tramos de siempre: Camino La Rúa 308 y Autopista del Norte 1287 y 2295; Camino La Hornera ya pasa): 326 invasiones de calzada menos, sin obstáculos nuevos, sin fugas, calidad del código **B** (72). Avisos nuevos:
      3 edificios nuevos en calzada que salen del recorte: Plaza de San Cristóbal (X 73, Z 234, 1,9 m), Av. Lucas Vega (X -909, Z -408, 2,3 m) y uno sin nombre (X 1692, Z 4082, 1,9 m);
      `09c_weapons.js:20` `gunGeos()` alloc-geo (geometría compartida que se crea una sola vez: probable falso aviso, revisar).
      Métricas: llamadas 667 → 674, vértices +3 %, pintar 44,2 → 44,7 ms, arranque 11,9 → 12,2 s.
- [x] v0.69.0 (salas: los avisos venían de un `make` con el mismo nombre que otro de la brújula; ya no salen) **Auditoría v0.68.0** (APTO CON AVISOS; pruebas 4/4; 12 invasiones de calzada y 6 obstáculos menos, llamadas
      688 → 667, triángulos −2 %): 52 avisos «nuevos» de geometría creada en `buildHall()` (`05m_parking.js`): son las salas
      de los aparcamientos, que ahora se crean desde `05u_trinidad.js` (se hacen una vez al cargar). Pintar 41 → 44 ms
      (vigilar). La prueba de conducción sigue fallando solo en los tramos ya apuntados (Camino La Rúa, Autopista del
      Norte 1287, Camino La Hornera). No tocar hasta que Jonay lo diga.
- [x] v0.69.0 (baloncesto y fútbol comparten `09ea_minijuegos.js`: D → B/C; `footIcon` ya no sale) **Auditoría v0.67.0** (APTO CON AVISOS; pruebas 10/10, sin fugas ni obstáculos nuevos): 1 aviso nuevo
      `12j_campos.js:12` `footIcon()` (geometría que se crea una vez al cargar, como las de las canchas); calidad del código:
      `09f_basket2d.js` baja de B a D y `09g_futbol2d.js` entra con D (líneas muy largas y funciones grandes: partirlas si
      Jonay quiere). Pintar 32 → 41 ms otra vez en la 2.ª pasada del día (vigilar). No tocar hasta que Jonay lo diga.
- [x] v0.60.0 **Parón al empezar la primera pelea 2D** (Jonay, 12-oct): se queda congelada ~1 s en la transición del mundo 3D al 2D
      (probablemente la primera captura del fondo / compilar el lienzo 2D: precalentarlo al cargar).
- [x] v0.60.0 **Noche demasiado oscura** (Jonay, 12-oct): al anochecer baja tanto la luz que agobia; subir la luz mínima de la noche.
- [x] v0.60.0 **Flecha hacia el objetivo** (Jonay, 12-oct): con un punto de misión o un destino marcado en el mapa, una flecha
      superpuesta bajo el personaje que apunte hacia él, para no tener que mirar el mapa.
- [x] v0.60.0 **Carrera solidaria del casco imposible** (Jonay, 12-oct): ~6 min corriendo y no llega a los dos últimos controles
      (tuvo que teletransportarse). Reducir bastante las distancias (y/o el tiempo por control).
- [x] v0.71.0 (barrio → casco/Ayuntamiento → Trinidad/Vía de Ronda/norte → aeropuerto; grafiteros en Padre Anchieta) **Misiones por zonas** (Jonay, 12-oct; v0.62.0: Coco y Sastrón ya salen cerca del inicio, falta lo de las zonas): al principio Coco y Sastrón aparecen demasiado lejos; que las primeras
      misiones salgan cerca del inicio. Las siguientes pueden estar algo más lejos, pero cada tanda debería ir por zonas:
      estando en una zona, lo que se hace queda relativamente cerca de ese punto.
- [x] v0.60.0 **Rutas de carreras y huidas lejos del borde del mapa** (Jonay, 12-oct): si un enemigo o una carrera lleva cerca
      del borde, el aviso del borde te teletransporta hacia atrás. Elegir rutas con margen (`worldEdgeDist`).
- [x] v0.65.0 **Minijuego de baloncesto 2D tipo NBA Jam** (falta: retos libres en cualquier cancha y controles en el móvil) (Jonay, 12-oct): en las canchas; retar a partidos con tus amigos de la
      banda contra la gente que está allí, para ganar dinero.
- [x] v0.67.0 **Minijuego de fútbol 2D tipo Sensible Soccer** (Jonay, 12-oct): en los campos de fútbol.
- [x] v0.70.0 (`09h_maleantes.js`; Jonay lo prueba) **Maleantes en busca y captura** (Jonay, 12-oct): cuando ya sabes pelear (tras las misiones), a veces salen en el
      minimapa NPC marcados con los que puedes pelear como con cualquiera, pero dan más dinero y son más difíciles: más
      combos y se cubren más. Tres niveles internos de dificultad, siempre por encima de la gente normal.
- [x] v0.62.0 **Nombre de la banda** (Jonay, 12-oct): en «La firma de la banda», la opción «Los Chachos de Aguere» pasa a ser
      **teclear tu propio nombre**; «Los Magos de La Laguna» pasa a **«Los Magos de Aguere»**; «La Banda del Barraquito»
      se queda. Quedan 3 nombres propuestos más el tuyo.
- [x] v0.61.0 **Cambio de nombres** (Jonay, 12-oct; para no identificarlos con personas reales): **Ruymán «El Blanco» → Rayco
      «El Blanco»** y **Santi «El Chopa» → Ayoze «El Chopa»** (los apodos no cambian). Buscar en diálogos, misiones,
      títulos, docs y partidas guardadas.
- [x] v0.61.0 **Intro: el texto de que El Chopa sale de prisión dura muy poco** (Jonay, 12-oct): dejarlo más tiempo en pantalla
      (o que avance al pulsar).
- [x] v0.74.0 (cae con la animación, golpe y quejidos) **Animación al abatir a un enemigo de misión** (Jonay, 12-oct): con el tiro que lo detiene (uno, dos o los que
      haga falta) la figura se queda congelada. Que caiga al suelo y se queje (animación de caída/dolor, quejidos).
- [x] v0.59.0 **Centro de Salud de Taco** (Jonay, capturas: C. Dona 22 / C. San Jerónimo, junto a la Plaza La Rana Gustavo y
      la Av. Taco TF-28): bloque verde claro de 2 plantas con contraventanas blancas, verja y rampa. Código CPX2+FM → X 1633
      Z 4292, ~310 m al sur del borde del mapa: va en la misma descarga que La Cuesta (`scripts/descargar_zonas.bat`).
- [x] v0.61.0 **Radio: más canciones y voces** (Jonay; precisión 12-oct: **una voz distinta en cada canción**, de los
      generadores de voz, y las 20 canciones repartidas entre las emisoras que ya hay). **Próxima tanda** junto con las
      uniones de túneles que quedan y los 3 tramos que no termina la prueba de conducción. Original: cada emisora con una voz distinta (no siempre la misma), letras más
      largas y menos repetitivas, canciones de 1:30–2 min y luego otra; al menos 20 canciones en total combinando voces,
      estilo rap / hip hop de los 90, funk y R&B, con la misma técnica de ahora (síntesis en el navegador + voz).
- [x] v0.56.0 **Ayuntamiento bien hecho** (hecho: fachada de cantería con 5 arcos, balcones, frontón con escudo, rótulo y
      5 banderas en el borde este de la Casa del Corregidor; falta ver la esquina y la Alhóndiga con más fotos) (Jonay, fotos en `docs/referencias/ayuntamiento/`): recrear el edificio para la
      ceremonia. Fachada de cantería gris oscura (piedra volcánica) a la Plaza del Adelantado / C. Consistorio: planta
      baja con 5 arcos de medio punto y escalones, planta alta con 5 ventanales de cuarterones y balcón de madera,
      pilastras, cornisa con pináculos (bolas), frontón curvo central con escudo y rótulo «AYUNTAMIENTO», 5 banderas
      (morada, Canarias, España, Tenerife/La Laguna, UE). Esquina con C. Obispo Rey Redondo; al lado la Casa del
      Corregidor (fachada amarilla) y detrás la Casa de la Alhóndiga; enfrente Iglesia de Las Catalinas.
- [x] v0.56.0 **Morph «gordo»: labios y boca demasiado gruesos** (Jonay): la deformación de los cuerpos gordos (tallas
      gordo / extra / súper) hincha también la boca. Limitar el morph en la cara (cabeza: solo papada y mejillas).
- [x] v0.78.0 (La Cuesta y Taco ya estaban desde la v0.59; añadida la clínica privada junto a la TF-5, «Quirófano Salud») v0.58.0 **Centros de salud y hospital** (hecho: HUC con torre y helipuerto, EAA verde, Urgencias; centros de salud
      La Laguna y San Benito; reaparecer en el más cercano). v0.58.1: Laguna-Universidad, San Benito (recolocado) y Finca España con las capturas de Jonay. **La Cuesta**
      (C. Rector José Escobedo 6, X 3223 Z 1956) queda fuera del mapa: Jonay pide ampliar el mapa con ≥100 m alrededor
      (12-oct). Script `scripts/descargar_zonas.bat` (La Cuesta y Taco) (lo lanza Jonay: OSM + relieve) → integrar con `tools/merge_zona.py`. Original (Jonay): recrearlos; al morir apareces en el centro de salud más cercano. Buscar
      su situación (OSM `amenity=clinic/hospital`, `healthcare=*`: HUC, Hospiten, centros de salud de La Laguna-
      Mercedes, Finca España, San Benito, La Cuesta, Taco, Tejina…) y fotos.
      **HUC** (fotos de Jonay en `docs/referencias/hospital_huc/`): bloque largo de ~12 plantas con bandas horizontales,
      torre cilíndrica blanca con helipuerto en voladizo (platillo) en un extremo, edificio de cristal verde (Actividades
      Ambulatorias / Hospital de Ofra) al otro, jardín con palmeras y escultura de acero, junto a la TF-5 y la Ctra.
      Gral. La Cuesta, parking HUC y la Montaña de Taco detrás.
- [x] v0.57.0 **Canarión: el círculo azul no arrancaba a la primera** (Jonay): el círculo amarillo de «El rally de La
      Esperanza» estaba en el mismo punto; ahora va al otro lado del Canarión y empieza el círculo más cercano.
- [x] v0.57.0 **Farmacia: la persecución no se veía** (Jonay, coordenadas): el ladrón corre y roba un coche negro
      aparcado junto a un Corola; círculo amarillo y ruta al coche; va a X −1548 Z −693, se baja y huye por el camino
      (X −1571 Z −764) hasta X −1696 Z −883 (si llega, se escapa); dos tiros de bolas y llora; lo agarras.
- [x] v0.57.0 **Pepe no se ve** (Jonay, «Los bancos del Adelantado») y revisión de todas las huidas a pie y en coche:
      salían desde un cruce lejano; ahora desde donde están, alejándose y por la red peatonal (`prueba_persecuciones.py`).
- [x] v0.57.0 **Destacar a quién perseguir** (Jonay): flecha roja 6–12 s y punto rojo en los mapas.
- [x] v0.57.0 **Rutas del minimapa raras** (Jonay): salen de tu calle y sentido, y no se recalculan mientras las sigues.
- [x] v0.57.0 **Camión de los baches marcha atrás solo** (Jonay): el freno de un coche parado sin conductor era marcha atrás.
- [x] v0.57.0 **Mapa grande: menos textos y más legibles** (Jonay, 7-oct): de lejos solo lo importante y más rótulos según
      te acercas (niveles de zoom); repasar colores del texto para que se lea bien y no se confunda con las rutas de
      misiones (amarillo de la historia, azul de las secundarias, rojo de objetivos).
- [x] v0.57.0 **Mapa grande: zoom inicial** (Jonay, 7-oct): al abrirlo, más cerca y centrado en el jugador (ahora se ve casi
      todo el mapa).
- [x] v0.56.0 **Postura en la moto** (Jonay, captura en scooter): el personaje va «tieso como un palo», de pie entre el
      asiento y el manillar; necesita una postura sentada que encaje (piernas al reposapiés, brazos al manillar).
- [x] v0.55.0 **Aviso de la radio** (Jonay): al entrar en un coche, mostrar «cambia de emisora con Q» las primeras veces;
      cuando haya cambiado de emisora dos veces, guardarlo en la partida y no volver a mostrarlo (v0.55).
- [x] v0.54.0 **Modo móvil** (Jonay, captura): el minimapa se mezcla con las estrellas y tapa los botones ENTRAR / CORRER y
      las coordenadas. Reubicar y dimensionar HUD, minimapa, textos y botones para que sea jugable en el móvil.
- [x] v0.53.0 Escalera SE de la pasarela de La Trinidad: ahora baja en X −272 Z 709.
- [x] v0.55.0 **Pasarela de La Trinidad intransitable en algunas zonas** (Jonay, captura en X −313 Z 820, rampa hacia
      Carretera de San Miguel de Geneto): revisar dónde se queda parado el personaje.
- [x] v0.54.0 **Freno de mano** (Jonay): al accionarlo debe bloquear las ruedas traseras: frena, derrapa un poco y gira más
      cerrado, como en la realidad. Revisar cómo hacerlo y proponerlo.
- [x] v0.57.0 **Árboles y farolas sobre la vía del tranvía** (115 árboles y las farolas a menos de 4–5 m del eje) (Jonay, captura en una glorieta junto al tranvía).
- [x] v0.78.0 Prueba de conducción de túneles/puentes (v0.61): el enlace X −386 Z 678 ya pasa; la Autopista del Norte
      (X 44 Z 1156) se para por tráfico en la prueba (en línea recta pasa a 18 m/s); el Camino La Rúa (X 543 Z −909) choca
      en una esquina: sin investigar. Quedan también las uniones: rampas X −495 Z 683 y X 2210 Z 3312, finales de tablero
      X 377 Z −268 y X 820 Z 3494.
- [x] v0.69.0 (falso aviso: material creado una vez) **Auditoría v0.58.0** (APTO CON AVISOS; métricas iguales que la 0.57): 1 aviso nuevo `05t_hospital.js:44` `mk()`:
      material del HUC creado al construir la ciudad, una sola vez (falso aviso).
- [x] v0.69.0 (falso aviso: la flecha se crea una vez) **Auditoría v0.57.0** (APTO CON AVISOS; memoria JS 544 → 503 MB, geometría 382 → 342 MB, llamadas 696 → 680,
      sin fugas): 3 avisos nuevos en `s2Mark()` (`12f_story2.js:54-56`): es la flecha de persecución; su geometría se
      crea una sola vez y se reutiliza (falso aviso, se puede marcar como «bajo demanda»).
- [x] v0.57.0 (bancos liberados al limpiar la misión) **Auditoría v0.56.0** (APTO CON AVISOS; memoria y fugas igual que la 0.55, llamadas 658 → 696, triángulos
      5,50 → 5,62 M por el Ayuntamiento; no tocar hasta que Jonay lo diga): 3 avisos nuevos de geometría creada en
      `12f_story2.js`: el bigote del alcalde (l. 68-69, se crea una vez al arrancar: sin importancia) y los **bancos
      robados** de «Los bancos del Adelantado» (l. 187): se crean geometrías nuevas cada vez que se juega la misión y
      `s2Clear` las quita de la escena sin `dispose()` → compartir una geometría o liberarla al limpiar.
- [x] v0.53.0 Auditor: **APTO** (comparado con la 0.51 re-medida). Fuga 477 → 0; memoria y geometría ya no suben
      (546 → 547 MB y 387 → 386 MB): los avisos de la 0.52 eran de la forma de medir.
- [x] v0.52.0 **Auditor nuevo (v0.51, APTO CON AVISOS, comparado con v0.49)**: fuga trazada de 477 geometrías tras pasear (GPU +20
      geometrías y +5 texturas en 2 vueltas). Origen: `Car ← manageTraffic` (×304), `makeKenneyMesh ← Car` (×91),
      `pod ← makeMotoMesh ← Car` (×23): confirma la P0.a/P0.4 de los coches del tráfico. Por decidir con Jonay.
- [x] v0.47.0 (1.ª versión) **Cuerpos variados (nuestra versión)** — afinar con Jonay: morphs por código sobre el cuerpo Superhero:
      normal (menos músculo), relleno/barrigón (grados), adolescente, mayor; mezclables y con las mismas animaciones.
- [x] v0.48.0 **Lucha 2D: más resolución en el pixel art** (lo pide Jonay): sprites de los luchadores y fondo con el doble de
      píxeles (más detalle de cara, ropa y pelo; fondo con menos pixelado), manteniendo el estilo 90s.
- [x] v0.50.0 Túneles raros por dentro (fondo de tierra bajo el suelo) y atasco junto al túnel gemelo (X 1800, Z 3160).
- [x] v0.78.0 (0 obstáculos, 0 hundidos; conducción 112/112) Auditoría de obstáculos: 200 avisos (sube en el aeropuerto, ver arriba); conducción túneles/puentes: 3 de 97.
- [x] v0.50.0 Fusionar geometría de fuentes.
- [x] **(v0.78.1) Pasaje Aguere: dos niveles y escaleras curvas** (Jonay, 19-oct, con captura en X −178 Z −33): desde Herradores se
      llega al patio a nivel de calle; en el patio hay **dos escaleras que bajan rodeando el círculo, una por la izquierda
      y otra por la derecha**, hasta la galería de abajo, y desde ahí es **llano hasta la salida de la calle El Juego**
      (unos 4 m más baja). Ahora el pasaje baja poco a poco por la pendiente y la escalera es un hueco recto con
      barandilla que no se baja. Además **se transparenta algo en el túnel**: todo el pasaje va bajo edificio y solo el
      patio de la escalera redonda tiene cielo. Captura de Jonay en X −188 Z −14 (el hueco entre los dos trozos de OSM
      del Pasaje Aguere, hacia El Juego): la galería se ve **por arriba, sin edificio encima** (paredes con los rótulos y
      suelo al aire), con un remiendo de suelo claro alrededor; ahí falta el bloque encima (o el edificio grande de OSM
      que la contiene no se está dibujando: mirar el n.º 5227 de `data.json`, 18,6 m, de El Juego a Herradores).
      **Entrada/salida de la calle El Juego** (captura de Jonay en X −211 Z 58): el hueco de la fachada es más ancho que
      la galería y a un lado se ve «transparente»: las paredes de dentro del pasaje son de una sola cara (miran hacia
      dentro) y desde fuera, de lado, no se ven; hacer el hueco del ancho de la galería, con jambas, y las paredes de
      dos caras (o con grosor). Revisar las otras bocas (Herradores, Obispo Rey Redondo). En la captura también se ve
      un paño oscuro inclinado en el borde del patio (pared del aro que no casa con el bloque).
      → Hecho en v0.78.1: rellano, dos escaleras curvas, suelo del patio y galería baja llana hasta El Juego; cámara bajo
      el techo del pasaje, paredes de dos caras, sin la cinta de OSM en el patio, galería sin asomar a la calle.
- [x] v0.52.0 — Sin fuga de los coches del tráfico (P0.a): piezas compartidas, se libera lo propio al descartar, motoristas del grupo de peatones.
- [x] v0.51.0 — Calles superpuestas a distinta altura, isletas de rotonda en cuesta, inicio de trincheras, rampas de garaje.
- [x] v0.50.0 — Enlaces de autopista sin «volar», trincheras y túneles, fuentes fusionadas, vallas de canchas.
- [x] v0.49.0 — Menú principal nuevo con versión; memoria a la mitad, pools sin fugas, HUD/minimapa más ligeros, juego offline.
- [x] v0.48.0 — Pelea 2D al doble de resolución con más detalle; siete tallas de cuerpo (súper/extra delgado … extra/súper gordo).
- [x] v0.47.0 — Agente revisor de jugabilidad, puente del aeropuerto bajado a nivel, aceras sin losa bajo la calzada.
- [x] v0.45.0 — Pabellón de Finca España y colores de C. Tacoronte, barrio de Chimisay relleno, La Pirámide.
- [x] v0.44.0 — Aeropuerto de Los Rodeos y corredor oeste con sus calles y relieve.
- [x] v0.43.0 — Sastrón primero / Canarión opcional, túneles más hondos y anchos sin losas, sin hundirse en
      rampas, parking del Cristo, estación de guaguas, pistola (mano y primer disparo).
- [x] v0.42.0 — Pelea tipo Street Fighter (atrás anda, cubre solo ante ataque), luchadores 20 % menores y más
      separados, tutorial corto, pantalla de controles, menú al 75 %, terreno hundido arreglado en 42 zonas.
- [x] v0.41.0 — Límites del mundo y zonas quitadas, ambiente sonoro, pasos suaves, pistola en el puño, entrada
      del Mercadona por Marqués de Celada, casas en Lucas Vega / Montaraz.
- [x] v0.40.0 — Esquina de inicio (El Blanco) y C. Marqués de Celada: manzanas partidas en casas, edificio amarillo,
      isleta con señales, locales en la subida y Mercadona (Merca Mona) en Teobaldo Power.
- [x] v0.39.0 — Casa del hermano (Google 28.452009, −16.298734 → juego X 1591, Z 3924): casa blanca de 2 plantas
      con torreta, puerta gris, ventanas de marco negro y muro blanco (`05p_casas.js`).
- [x] v0.39.0 — La Concepción rehecha (torre en su sitio real del plano OSM, ~(-529, -346)). Fotos en
      `docs/referencias/concepcion/`.
- [x] v0.38.0 — Coche en zonas con peralte, aceleración −15 % y dirección más suave, peleas 2D más fáciles,
      círculo de Boca Papa, coordenadas en el minimapa.
- [x] v0.37.0 — Pasos sincronizados con la animación y sonido nuevo.
