# Historial de versiones

El formato es: `## versión — fecha — título`, seguido de los cambios. El script de publicación usa
el título de la entrada más reciente como mensaje del commit.

## 0.87.0 — 2026-10-26 — Selecciones de basket en Pachanga 3x3
- **Pachanga 3x3 tiene sus propias selecciones** (Jonay): entran **EE. UU., Serbia y Lituania** y salen Brasil,
  Portugal y Uruguay, que siguen en Play Furbito. Cada una con su bandera, sus dos equipaciones y jugadores parodia.
- **Un nivel por deporte** (Jonay: «España no puede ser de las más malas»). España es de las mejores en los dos: en
  basket, solo EE. UU. está por encima; en fútbol, es la primera. Las barritas de nivel de la pantalla de elegir país
  cambian según el cartucho.
- **En Pachanga, los muñequitos van de basket** (Jonay: parecían de fútbol): camiseta de tirantes, pantalón largo,
  calcetín corto y zapatillas. Play Furbito se queda igual.

## 0.86.0 — 2026-10-26 — El mundialito, entero dentro de la GOFIO-8
- **Pachanga 3x3 y Play Furbito ya no salen al mundo 3D** (Jonay): todo pasa en la pantalla de la consola.
  - **Elegir selección**: las 8 banderas, las dos equipaciones de cada país y su nivel. Se elige con las flechas y A.
  - **El cuadro del mundialito**: cuartos, semis y final, con tu cruce marcado y las dos equipaciones del partido.
    A juega y Q se retira.
  - **Los partidos** se juegan en el basket / fútbol 2D con la consola esperando detrás. Al acabar se vuelve a la
    GOFIO-8, a la pantalla de resultados (el tuyo y los otros cruces), sin pasar por el salón ni por el menú de
    pausa.
  - **Campeones**: confeti, las iniciales con las flechas (como en las máquinas) y la tabla de campeones.
  - **Eliminados**: vuelves a elegir país. Esc vuelve al menú de cartuchos.
  - La música del mundialito tiene dos frases que se alternan.

## 0.85.1 — 2026-10-20 — Tanda de pendientes rápidos
- **Esc en la consola** (Jonay): desde un juego vuelves al menú de cartuchos de la GOFIO-8, y desde el menú sales al
  mundo 3D. Ya no se abre el menú de pausa al salir de una máquina.
- **Basket**: al pasar, el que recibe el balón pasa a ser el tuyo al momento (antes había que volver a pulsar).
- **Persecuciones más difíciles** (Jonay): el coche que huye frena menos en las curvas y corre un poco más (un 10 %).
  Las carreras y los autobuses no cambian.
- **Canchas**: ninguna puede pisar a otra. Si dos se cruzan o se tocan (con 1,5 m de pasillo), se queda la grande.
- **Bencomo**: lo de bajar con la vara en el aire se llama «PICADO» (antes «POGO»).
- Código:
  - Las puertas de los interiores comparten geometrías y materiales (auditoría v0.83).
  - La Concepción reutiliza sus objetos de ayuda al construirse (auditoría v0.81).
  - El build avisa de más comentarios `//` a media línea que se tragan código.

## 0.85.0 — 2026-10-20 — Pachanga 3x3 y Play Furbito: el mundialito en la GOFIO-8
- **Dos cartuchos nuevos de deportes** (Jonay): **PACHANGA 3x3** (el basket 3 contra 3) y **PLAY FURBITO** (el fútbol
  5 contra 5). Se compran en la juguetería y salen en el menú de la consola.
  - Al empezar eliges selección entre **8 países**: España, Brasil, Argentina, Italia, Alemania, Francia, Portugal y
    Uruguay, cada uno con sus jugadores parodia.
  - **El mundialito**: cuartos, semifinal y final. Cada ronda el rival es mejor, y los otros cruces se juegan solos.
  - **Las equipaciones no chocan**: si la camiseta del rival se parece a la tuya, sale con la segunda.
  - Si ganas la final, pones tus **iniciales en la tabla de campeones**.
- **El superfriki jugón**: cuando tienes todos los cartuchos, en la juguetería te lo dicen y se abre el **torneo de
  videojuegos** (sale en el diario, con los mundialitos ganados).
- La pantalla de controles del basket decía «2 CONTRA 2»: ahora pone los que juegan. En la del fútbol, «PARA EMPEZAR»
  ya no se monta sobre la fila del regate.

## 0.84.0 — 2026-10-20 — El baloncesto pasa a 3 contra 3
- **El basket de las canchas es ahora 3 contra 3** (Jonay), el paso previo a Pachanga 3x3 en la consola:
  - Juegas con Coco y **El Blanco**. Si un partido viene con equipos de dos (los rivales de las misiones), se completa
    solo con un tercero vestido como los suyos.
  - **Defensa uno contra uno**: cada uno marca a un rival distinto, y tú te quedas con el que tienes más cerca.
  - En ataque, los dos sin balón se abren: uno al ala y otro arriba, en la cabeza de la zona.
  - Los pases van al compañero más libre y más cerca del aro.
  - El reto de la cancha dice «Partido 3 contra 3».
  - La máquina mueve más el balón cuando lleva un rato con él, y el tercer rival tiene mote: El Zurdo, El Rubio…
- **«Guerra de Naves» pasa a llamarse «GUFO, AGUERE INVASION»** (Jonay). En canario un gufo es un pedo, y además son
  las siglas de *Guanche Unknown Flying Object*. Cambian la pantalla de título (GUFO en grande), la marquesina, la
  opción de los bares, el diario, la leyenda y la llamada de El Blanco.
- **Sonido de las máquinas** (Jonay: «la música, menos protagonismo; más efectos; melodías más largas»):
  - La música suena más baja y los efectos van por su propio canal, más alto.
  - Las músicas de fase y de jefe de Bencomo, GUFO y Guanche Warriors encadenan varios estribillos (A B A C…), en vez
    de repetir siempre la misma frase.
  - Efectos nuevos en Guanche Warriors: el mordisco del lagarto y el «fiu» de la pirueta y del salto.
  - GUFO ya tenía los sonidos suaves del disparo, del láser y del impacto en la 0.83.2; ahora se oyen por encima de
    la música.
- Guanche Warriors: los enemigos solo atacan cuando ya están dentro de la pantalla (Guayota pegaba desde fuera del
  borde, sin dejarse alcanzar).
- Bencomo: las tuneras vuelven a no pinchar a los castellanos (Jonay: lo hacía demasiado fácil). Se quedan con el
  aspecto nuevo.

## 0.83.2 — 2026-10-20 — Iconos nuevos en el mapa y golpes nuevos en Guanche Warriors
- **Iconos del mapa** (Jonay), en el minimapa, en el mapa grande (M), en la leyenda y en el diario (J):
  - Las jugueterías: **un robot**, en vez de la gota o el osito.
  - La inmobiliaria Pisos Chachi: **una casita** naranja.
  - Tu casa: **la cara del Chopa**.
  La leyenda dibuja los mismos iconos que el mapa, y en el diario cada entrada lleva el suyo y dice cuál buscar.
- **Guanche Warriors** (Jonay):
  - **Atacar corriendo**: un salto hacia delante con una patada voladora que tumba.
  - **El remate por detrás**: tras el segundo golpe del combo el enemigo se queda aturdido un momento. Si ahí saltas
    (B), el guerrero hace una pirueta por encima y le golpea por la espalda, y lo tumba («¡POR DETRÁS!», +300).
  - **Los lagartos atacan**:
    - Muerden alargando el cuello, con las fauces abiertas.
    - En carrera dan un salto y un coletazo a los dos lados.
    Lo hacen los de los jinetes enemigos y el tuyo: A muerde y, corriendo, A salta y da el coletazo.
  - **Botín**: de vez en cuando los enemigos sueltan un zurrón de magia (para recargar a mitad de fase, no solo con los
    duendes) y algunos sueltan comida.
- **Tu casa, por dentro** (Jonay: «al entrar se debe ver el salón comedor»): entras al salón-comedor, con el sofá y
  un sillón mirando a la tele, la mesa del comedor con dos sillas y un frutero. En los pisos grandes hay además una
  librería. El pisito de Herradores es un poco más hondo, para que al entrar lo veas todo de frente.
- **Bencomo: las tuneras se ven peligrosas** (Jonay): un contorno oscuro suave, espinas claras por todas las palas e
  higos picones rojos.
- **Guerra de Naves: sonidos suaves** (Jonay): el disparo, el láser (un zumbido propio), un «tic» cuando le das a una
  nave sin destruirla (también al ojo del jefe) y una explosión pequeña para las naves pequeñas.

## 0.83.1 — 2026-10-20 — La entrada de casa de El Blanco, marcada con su cilindro de luz
- **La entrada de casa de El Blanco** (Teobaldo Power) se marca como los otros sitios: un cilindro de luz
  transparente, en naranja (Jonay). La puerta de la inmobiliaria Pisos Chachi lleva también el suyo, en ámbar.

## 0.83.0 — 2026-10-20 — La casa: la inmobiliaria Pisos Chachi, tu piso y la consola GOFIO-8
- **La inmobiliaria Pisos Chachi** (parodia), en la Calle Heraclio Sánchez. Te llama por el móvil cuando ya eres
  Defensor y El Blanco te ha contado lo de las recreativas. Tiene:
  - **El pisito de Herradores**, al lado del Pasaje Teide: en alquiler, $250 por semana (7 días del juego). Avisa
    cuando se acaba y se renueva en la oficina.
  - Pisos en venta, caros:
    - Calle San Agustín: $18.000.
    - Calle Viana, una casa con patio: $32.000.
    - Ático en la Plaza del Adelantado: $55.000.
  Son edificios de verdad del mapa, con la puerta en la fachada de su calle. Solo se abren cuando son tuyos; antes no
  se ve ni la puerta.
- **Dentro de casa**:
  - La **cama**: duermes hasta las 8, te pones al 100 % de salud y se guarda la partida.
  - El sofá, la tele, una cocinita y, en los pisos grandes, una mesa para la banda.
- **La consola GOFIO-8**: se compra en las jugueterías ($1.200) y se instala sola en la tele de tu casa. Los cartuchos
  también se venden allí:
  - Bencomo: $90.
  - Guerra de Naves: $120.
  - Guanche Warriors: $150.
  Al encenderla (E delante de la tele) sale **un menú con los cartuchos que tienes**. Se juega gratis y con récords
  propios de casa; con Q se vuelve al menú.
- **Las jugueterías se marcan con un osito de peluche** (Jonay: la gota no decía «juguetería»), en el minimapa, en el
  mapa y en el icono que flota sobre la tienda.
- **La leyenda del mapa grande** dice qué es cada marca y, como el diario, solo enseña lo que ya tienes abierto:
  maleantes, casa de El Blanco, bares con máquina, jugueterías, inmobiliaria y tu casa. En el mapa grande ya sale
  también la casa de El Blanco.
- **Diario (J)**: entradas nuevas en «Lo que sabes» para la inmobiliaria, tu casa y la consola, con la más cercana y
  su ruta al GPS.
- **Arreglo**: al cargar una partida se perdía lo de las recreativas (los récords, la llamada de El Blanco, lo
  comprado). Ahora se guarda y se recupera, igual que la casa.

## 0.82.2 — 2026-10-20 — Las jugueterías y los bares de la máquina, en el mapa
- **Las jugueterías salen en el minimapa y en el mapa grande (M)** con la gota azul, una vez abiertas (Jonay: «¿cómo sé
  dónde hay una juguetería?»). En el minimapa salen las de alrededor, y la más cercana siempre, en el borde si está
  lejos.
- **Los bares y cafeterías con la máquina de Guerra de Naves** llevan un aro violeta alrededor de su cuadrado rojo, en el
  minimapa y en el mapa.
- **Diario (J)**: en «Lo que sabes», las jugueterías, Guerra de Naves, Guanche Warriors y la máquina de El Blanco dicen
  cuál te queda más cerca y a cuántos metros. El botón «MARCAR EN EL GPS» te pone la ruta.
- **Las máquinas se ven más nítidas y limpias** (Jonay: «parece un filtro, como con líneas duplicadas»):
  - **A la resolución a la que juegas**: la máquina mide tu ventana en píxeles reales (también con la escala de Windows) y
    dibuja el mueble y el juego directamente a ese tamaño. Un píxel dibujado es un píxel en pantalla, sin estirar ni
    encoger. Antes se dibujaba en pequeño (480×336) y se estiraba ×2,25 con píxeles duros, y por eso unas filas
    salían dobles; luego se estiraba otra vez el mueble a la ventana. Si cambias el tamaño de la ventana, se recalcula.
  - Los fondos de Guerra de Naves y de Guanche Warriors están dibujados al doble de resolución.
  - Fuera las líneas de barrido de tele de tubo: solo salen si se activa `SETTINGS.crt`.

## 0.82.1 — 2026-10-20 — El diario cuenta lo que te dicen por el móvil y solo enseña lo que ya puedes hacer
- **Diario (J), sección nueva «Lo que sabes»** (Jonay): todo lo que te cuentan por el móvil, cada cosa con su entrada.
  Cada entrada dice quién te lo contó, qué es, dónde está y la conversación. Hay entradas para:
  - Los maleantes en busca y captura.
  - La máquina de El Blanco (Bencomo, con el récord de la máquina).
  - Guerra de Naves en los bares y Guanche Warriors en las jugueterías.
  - Las jugueterías.
  - Los retos en las canchas y en los campos de fútbol.
  - El coche patrulla de la banda.
- **Lo que aún no es accesible no se ve**: se acabaron el «(aún no)» y las misiones pendientes con su nombre. El
  diario va apareciendo según se abren las cosas: solo se ven las misiones hechas, la que está en curso y la
  siguiente de cada historia abierta.
- Las llamadas que abren algo guardan su conversación en la entrada de esa cosa, no en «Charlas sueltas».
- **Bencomo: la pelea final con Lugo cabe en una pantalla** (Jonay: se salía de la pantalla): la cámara se queda quieta
  y Lugo carga de un borde a otro sin salirse.
- Guanche Warriors: a los enemigos grandes se les alcanza un poco antes según su tamaño.

## 0.82.0 — 2026-10-20 — «GUANCHE WARRIORS», la máquina de las jugueterías
- **Recreativa nueva: «GUANCHE WARRIORS»** (`09m_guanche.js`), un beat'em up tipo Golden Axe: se avanza de lado con
  profundidad, no es de plataformas. Es la máquina de pago de las **jugueterías**: sale en el menú de la tienda una
  vez que El Blanco te ha llamado, cuesta $1 la partida y cada tienda tiene su tabla de récords.
  - **Se elige guerrero al empezar**:
    - **El Mencey**: fuerte y lento, con garrote canario. Magia: «Ira de Achamán», un temblor de tierra, hasta 4
      zurrones.
    - **El Pastor**: ágil y menos fuerte. La vara llega más lejos y, corriendo, B hace el salto del pastor. Magia:
      «Viento alisio», remolinos, hasta 5 zurrones.
    - **La Mirladora**: ágil, menos física y con la magia más fuerte. Magia: «Luz de Magec», rayos de sol, hasta 7
      zurrones.
  - Los personajes, **al tamaño del Bencomo grande** (Jonay), dibujados como muñecos de píxeles articulados: andan,
    corren, saltan, golpean, caen y se levantan.
  - **Controles de siempre**:
    - A (E / clic izquierdo) pega: combo de 3, y el tercero tumba. Corriendo, embestida; en el aire, golpe desde
      arriba.
    - B (Espacio) salta; junto a un lagarto suelto, lo montas.
    - Q / clic derecho lanza la magia, que gasta todos los zurrones que lleves.
    - Doble toque ← / → = correr.
  - **Historia**: Guayota ha raptado a Magec, el sol, dentro del Teide.
  - **5 fases con su jefe**:
    1. El poblado de Taoro. Jefe: el Gigantón de Tigaiga.
    2. La laurisilva de Anaga. Jefa: la Bruja de Anaga.
    3. Los acantilados de Los Gigantes. Jefe: el Tibicena Mayor.
    4. Las Cañadas. Jefes: los hermanos gigantones, montados en lagartos.
    5. Dentro del Echeyde. Jefe: Guayota.
    Entre fase y fase, el campamento de noche: los duendes vienen a robar y, si les pegas, sueltan zurrones de magia
    y comida. Al final, «¡Magec es libre!» y una segunda vuelta más difícil.
  - **Enemigos**:
    - Los secuaces de Guayota, también con escudo.
    - Los tibicenas: perros demonio negros que se lanzan.
    - Los gigantones: no se paran con golpes flojos.
    - Las brujas, que tiran fuego y se teletransportan.
    - Los duendes ladrones.
    - Los jinetes en el **lagarto gigante de El Hierro**: si tumbas al jinete, el lagarto es tuyo y con A da
      coletazos.
  - Música chiptune propia por fase, para el jefe, el campamento y el título.
- El Blanco, al llamar, ya cuenta también lo de las jugueterías.

## 0.81.0 — 2026-10-20 — «GUERRA DE NAVES», la máquina de los bares
- **Recreativa nueva: «GUERRA DE NAVES»** (`09l_naves.js`), un matamarcianos horizontal tipo R-Type / Nemesis. Es la
  máquina de pago de las **cafeterías y las tascas**: sale en el menú de la barra una vez que El Blanco te ha llamado,
  cuesta $1 la partida y cada bar tiene su propia tabla de récords.
  - La nave (el AGUERE-1) se ve **pequeña, a ×1** (Jonay: hace falta espacio para ver venir las cosas).
  - **Controles de siempre**:
    - A (E / clic izquierdo) dispara; si lo mantienes y lo sueltas, sale el **BEAM cargado**, en dos niveles.
    - B (Espacio) maneja el **MÓDULO**, como la Force de R-Type: se pega delante o detrás, B lo lanza y B lo recoge.
      Para las balas pequeñas y daña lo que toca.
    - Q / clic derecho coge la mejora marcada en la **barra estilo Nemesis**: VELOC, MISIL, DOBLE, LÁSER, OPCIÓN y
      ESCUDO. Cada cápsula mueve la marca una casilla.
  - **3 fases con su jefe**:
    1. El cielo de Aguere, con los tejados de La Laguna y el Teide al fondo. Jefe: la nave nodriza, a la que hay que
       darle en el ojo cuando lo abre.
    2. Las entrañas del Teide: cueva de lava con torretas, bombas de lava y pasos estrechos. Jefe: la sierpe de lava.
    3. El mar de nubes: la colmena. Jefe: la reina, con su láser del ojo.
    Después de la tercera, segunda vuelta más rápida.
  - Enemigos: escuadrillas (si las tumbas enteras, sueltan cápsula), palomitas, kamikazes, torretas, cargueros que
    sueltan el módulo, minas y bombas de lava.
  - Música chiptune propia por fase, para el jefe y el título; demo, récords y continuar como en Bencomo.
- El Blanco, al llamar, ya cuenta que la máquina está en los bares.
- Bencomo, fase 1: el último barranco largo pasa de 7 a 6 casillas y tiene una pintadera (punto de control) justo antes.

## 0.80.1 — 2026-10-19 — Bencomo más grande y con más detalle; portales sin balcones
- **BENCOMO se ve más grande y con más resolución** (Jonay: «el pj al menos un 50 % más grande»):
  - La pantalla de la máquina pasa a 480×336 y el mundo se dibuja a ×2. Bencomo, los enemigos y el escenario se ven un
    33 % más grandes que en la v0.80.0. Es un punto intermedio: al 60 % se veía demasiado poco de la fase.
  - La cámara sigue también en altura, como en Mario o Sonic.
  - Los sprites salen a doble resolución (escalado scale2x del pixel art, con diagonales redondeadas, contorno fino y
    luz en los bordes de arriba).
  - Las baldosas, la hierba, la roca y los fondos (mar, carabelas, barranco, laurisilva, el Teide) se dibujan a doble
    detalle.
  - La pantalla de título es nueva y la tabla de récords está recolocada.
  - **Música folclórica canaria en la fase 2** (el Barranco de Acentejo): una isa en 3/4 con castañuelas, un punteo
    como de timple y el bajo de guitarra. Cada fase tiene su música: la costa, el barranco, la emboscada y el jefe. Todas son ahora más largas y menos
    repetitivas, con una parte A, una parte B y sus variaciones, y en la costa entra una segunda voz.
  - **Agacharse** (↓ en el suelo): Bencomo pega bajo con el banot para darle a los perros, y agachado esquiva las
    flechas y los balazos.
- **Portales del Edificio Casa del Blanco**: ya no los atraviesa un balcón, y alrededor de los arcos la pared es lisa,
  sin ventanas (Street View).

## 0.80.0 — 2026-10-19 — Las recreativas: «BENCOMO, Acentejo's Revenge» en casa de El Blanco
- **Motor de recreativas** (`09j_arcade.js`), común para todas las máquinas que vendrán:
  - Mueble con marquesina, marco, cristal con reflejo y líneas de barrido.
  - El ciclo de los 80: pantalla de título, demo jugada sola, tabla de récords, FREE PLAY / INSERT COIN, START,
    CONTINUE? 9…0 e **iniciales de 3 letras** con ↑↓ y A.
  - 10 récords por máquina, que se guardan con la partida. Las máquinas traen de serie los de la banda (BLA, COC,
    SAS…).
  - **Música chiptune** propia: dos canales cuadrados, uno triangular y ruido, con sonidos de 8 bits.
  - Las teclas de siempre, y Esc para salir.
- **«BENCOMO, Acentejo's Revenge»**: plataformas al estilo Mario / Sonic / Prehistorik, satírico pero con elementos
  reales de la cultura guanche.
  - **Bencomo**, mencey de Taoro, en la **Matanza de Acentejo** (31 de mayo de 1494).
  - **Salto del pastor**: corriendo, B clava la vara y salta el doble de alto y mucho más lejos. Con ↑ + B salta
    parado.
  - **Pogo**: ↓ en el aire pone la vara hacia abajo para rebotar en las cabezas, y hasta en las tuneras.
  - **Varazo** con el banot (A), que también devuelve las flechas. **Piedras** con Q.
  - **Comida**: puñados de gofio (100 = una vida), zurrón de gofio (corazón), queso de cabra (vida) y gofio con miel de
    palma (invencible).
  - **Enemigos**: soldados con espada, ballesteros, arcabuceros (la mecha avisa), perros de presa, caballeros a caballo
    y capitanes con armadura.
  - **3 fases**:
    1. **La Costa de Añaza**, con las carabelas al fondo.
    2. **El Barranco de Acentejo**: los guanches tiran piedras desde arriba (la sombra avisa) y también aplastan a los
       castellanos.
    3. **La Emboscada** en la laurisilva, con **Alonso Fernández de Lugo** en su caballo blanco: embiste, lanza tajos y
       llama refuerzos, y al final **huye herido**, como en la historia.
  - Pintaderas como puntos de control, tagoror al final de cada fase y bonus de tiempo y vida.
  - Después empieza la **segunda vuelta**, más rápida y con más enemigos.
  - Música propia por fase, con aire de tajaraste, y otra para el jefe.
- **Casa de El Blanco**:
  - Tras «Defensores de La Laguna», **El Blanco te llama por el móvil**, te invita a jugar a su máquina y te cuenta que
    habrá máquinas en los bares y juegos en las jugueterías.
  - La entrada está pegada al edificio (X −772 Z −413) y sale como un cuadrado naranja en el minimapa. Con E subes a
    jugar gratis cuando quieras. No es una misión.
- **Fútbol** (Jonay: «si vas corriendo puedes llegar a la puerta sin chutar»): cuando un rival entra en el área con
  el balón, el portero sale corriendo y se tira a sus pies. Si no ha chutado antes de que llegue, se la quita siempre.
- El edificio amarillo de Teobaldo Power, donde viven El Blanco y sus padres, se llama ahora **«Edificio Casa del
  Blanco»** en el mapa, con sus **portales de piedra en arco y cancelas verdes de hierro** (Street View): dos en Teobaldo
  Power, que es por donde se sube a jugar, y uno en la Calle Adelantado, junto a El Blanco.
- Prueba nueva `prueba_080.py`: el ciclo de la máquina, los movimientos (salto, salto del pastor, pogo), el recorrido
  de las fases con el piloto automático, el jefe, CONTINUE y las iniciales, y la casa de El Blanco. Con fotos.

## 0.79.0 — 2026-10-19 — Rifle a dos manos, palomitas, regates y mates de combo
- **Rifle de agua con las dos manos**: ya no atraviesa el brazo.
  - Apuntando: la culata al hombro, la mano derecha en la empuñadura con el codo abajo y la izquierda bajo el
    guardamanos.
  - Sin apuntar: cruzado delante del cuerpo, cogido con las dos manos.
  - Para eso hay una cinemática inversa de dos huesos para los brazos (`armIK`).
- **Mapa grande**: los puntos de misión, los destinos y las tiendas se pintan encima de los nombres. Antes un punto azul
  quedaba tapado por «Centro de Salud…».
- **Fútbol**:
  - **Palomitas**: el portero se estira a por los tiros que le pasan lejos, y blocan o despejan («¡PALOMITA!»).
  - **Saque de centro tras cada gol**: lo saca el que lo recibió, con el pie. El rival se queda fuera del círculo y no
    puede quitarle el balón hasta que lo pasa o corre con él.
  - **Fuerza del tiro según la distancia**: cerca de la portería, un tiro a tope se va por encima del larguero. Desde
    casi el medio campo sí se puede pegar a tope.
  - **Regate**: dos veces Espacio con el balón. Es un quiebro que el rival no puede robar.
- **Baloncesto**:
  - **Cada combo es un mate espectacular con su propia animación**, cuadro a cuadro y con el balón en las manos.
    - Con puño: el **Mate 360 del Gofio** y el **Molino del Teide** (windmill/tomahawk).
    - Con patada: **Espaldas del Roque** (de espaldas, abriendo las piernas y con el balón abajo primero) y
      **Entrepiernas del Pastor** (pasa el balón entre las piernas en el salto, de frente).
  - **La CPU también hace combos de mate**, más cuanto mejor es el equipo. No se le ven las teclas y puede fallarlos.
    Un mate de combo en el aire no se puede robar.
  - **Los pases largos van en arco** (antes iban rectísimos).
- Prueba nueva `prueba_079.py`: el rifle con las dos manos y fotos; en fútbol, el saque de centro, las palomitas, la
  fuerza del tiro y el regate; los 4 mates con fotos de cada uno, los combos de la CPU buena y el pase largo; el mapa.
- Plan de las recreativas, la consola y el pisito en `docs/11_recreativas.md`.

## 0.78.1 — 2026-10-19 — Pasaje Aguere en dos niveles: escaleras curvas y galería baja
- **Patio del Cine Aguere en dos niveles**: desde Herradores se llega al patio a nivel de calle, a un rellano con
  barandilla. Desde ahí **dos escaleras curvas, una por la izquierda y otra por la derecha**, bajan rodeando el círculo
  (30 peldaños, unos 5 m) hasta el suelo rojo del patio. Abajo están la boca de la galería con la banda «AGÜERITO» encima
  y tiendas con rejas, también bajo el rellano.
- **Galería baja**: del patio a la calle El Juego, llana, con suelo rojo, tiendas y bares a los lados y techo con luz.
  Sale a la calle por el hueco de la fachada, sin asomar a la acera.
- **Ya no se transparenta**: dentro del pasaje la cámara se queda bajo el techo. Antes subía al hueco del edificio y
  parecía que no había nada encima. Además, las paredes del pasaje se ven por las dos caras, y el suelo del camino de
  OSM ya no pasa por el patio ni por la galería de abajo.
- Prueba `prueba_078.py`: baja andando por la escalera de la derecha hasta la salida de El Juego y comprueba la altura
  en cada paso y la cámara bajo el techo.

## 0.78.0 — 2026-10-19 — Mapa: el pasaje del Cine Aguere y uniones de puentes
- **Pasaje Teide y Pasaje Aguere**: la galería que va por debajo de los edificios desde la calle Obispo Rey Redondo
  (junto al «Desencuentro»), cruza Herradores y sale a la calle El Juego, con tiendas y bares parodia a los dos lados
  (Bar El Guanchito, Zapatería Teidefinitivo, Cafetería Aguerita, Móviles Guanchófono…), techo con luz y los edificios
  encima (donde el mapa de OSM la dejaba al aire, ahora hay un bloque encima). Se recorre andando de punta a punta.
- **Patio del antiguo Cine Aguere**: a mitad del pasaje, el agujero redondo al cielo con la cristalera curva de dos
  plantas, la banda negra con el rótulo «AGÜERITO», una cara enorme pintada en la pared de arriba, suelo rojo y la
  escalera que baja a la galería de abajo (rejas, columna) tras la barandilla (todavía no se baja).
- Otros pasajes bajo edificios (el de La Concepción y algunos más): hueco en la fachada y se pasa por debajo.
- **Finales de tablero y rampas**: los tramos elevados bajan a la calle donde terminan (Travesía Enlace Andenes del
  Sobradillo / Av. Ghandi, Vía de Ronda); una calle a nivel junto a un terraplén bajo ya no sube al coche encima; desde
  la calle solo se cae a un túnel donde está su boca; la rampa de servicio junto a la Av. Astrofísico Francisco Sánchez
  ya no tiene el escalón de 1,2 m.
- **Prueba de conducción**: los «tramos que fallan» (Autopista del Norte ×2, Camino La Rúa, Camino La Hornera) eran
  de la propia prueba (el coche se alejaba más de 300 m del jugador y dejaba de moverse; tomaba las curvas cerradas a
  80 km/h): ahora pasan los 112 tramos.
- **Callejero**: Casa de la Alhóndiga, Casa Riquel, Casa Mustelier, Casa de Ossuna, Palacete Rodríguez de Azero, las
  capillas de la Cruz Verde y de los Plateros, la Casa Museo Los Sabandeños y la Fundación Cristino de Vera con su
  fachada histórica y su nombre en el mapa (para usarlas en misiones).
- **Salud**: la clínica privada junto a la TF-5 («Clínica Quirófano Salud», parodia) cuenta como centro de salud.
- Aeropuerto: la marquesina de la terminal llega por encima del carril de dejar pasajeros, con columnas en la acera.
- TF-13: los muros de la trinchera son de piedra oscura (basalto), como en las fotos.
- Herramientas: `sonda_conduccion.py` (traza de un coche por las calles de un punto) y `sonda_perfil.py` (escalones de
  la calzada entre dos puntos).

## 0.77.0 — 2026-10-19 — Rendimiento: ciudad juntada, recorte por distancia y carga más rápida
- **Piezas sueltas juntadas** (auditorías P1.5): las ~5.000 piezas sueltas que no se mueven (bancos, bolardos,
  papeleras, piezas de iglesias, gradas…) se juntan en una malla por material y celda de 125 m. Personas, coches, patos
  y lo que se mueve u oculta se quedan como estaban.
- **Recorte por distancia según la niebla**: lo que queda detrás de la niebla ya no se pinta; los detalles pequeños
  (molduras, balcones, rótulos, mobiliario) solo de cerca; las copas de los árboles lejanos con pocos triángulos.
  Árboles, farolas, postes y señales van por celdas (antes se pintaban enteros para toda la ciudad).
  En la calle: **de ~5.600 a ~1.900 llamadas de dibujo y de 5,1 a 3,5 millones de triángulos** por fotograma; en el
  auditor (con tarjeta gráfica) pintar un fotograma pasa de 47,8 a 29,8 ms y el arranque de 13,2 a 8,4 s.
- **Coches aparcados instanciados**: una geometría por modelo para todos los coches aparcados (pintura por coche).
  Su paso de la carga pasa de ~1,9 s a ~0,3 s y la geometría en memoria baja (38 → 36 MB).
- **Carga más rápida**: plazas y parques de ~3,2 s a ~0,4 s (rejilla para no comparar cada árbol con cada banco).
  En total, de ~11,2 s a ~7,6 s en el PC de pruebas.
- **Lint** (auditoría P2.5): el build comprueba que no hay nombres sin declarar ni declarados dos veces entre archivos.
- Pruebas: `prueba_077.py` (fotos del mismo sitio con la ciudad juntada y con las piezas originales);
  `sonda_rendimiento.py` mide llamadas, triángulos y cada paso de la carga. El piloto automático de las misiones ya
  compra el rifle, apaga los fuegos y moja a Boca Papa.
- Al cargar una partida se quitan los coches que quedaban de misiones anteriores, y el coche del Canarión deja de
  contar como coche de misión al acabar la carrera.
- Las pruebas ya no suenan (voz del sistema y sonido del juego en silencio).

## 0.76.0 — 2026-10-19 — Rifle de agua, el Secreta y 14 misiones nuevas
- **Rifle de agua** (estilo rifle eléctrico de juguete, blanco y naranja con depósito transparente): chorro en parábola
  de unos 10 m que deja charquitos, apaga fuegos y empapa a la gente; se llena en las fuentes (E) y se vende en las
  **jugueterías** (Juguetes Sabelotodo, Baobabito, Lífer), que también venden bolitas para la pistola. Tab cambia entre
  puños, pistola y rifle (1 / 2 / 3). **El que mojas te persigue y, si te pilla, hay pelea.**
- **Historia: «El rifle de agua»** (El Blanco): abre las jugueterías; lo compras y lo pruebas en una plaza con fuente:
  apagas los papeles que quema El Blanco, recargas en la fuente y le mojas la cabeza a Boca Papa, que duerme al lado,
  desde 10 m.
- **El Secreta**: el inspector Fulgencio Tostón (Avenida de los Menceyes), seis misiones: seguir un coche sin que te
  vea, contenedores en llamas y el pirómano, el partido amañado, triple en la cancha y la huida, mojar al pirómano y la
  Operación Gofio Blanco (carrera, pelea, pistola, fuego y persecución).
- **El Obispo**: fuego en una iglesia, la carrera de los sacristanes (a pie), curas contra concejales (fútbol) y el
  ladrón del cepillo.
- **Carreras del Canarión**: duelo nocturno en la pista de Los Rodeos, contrarreloj por el casco y el Gran Premio.
- **Maleantes**: Sastrón te los explica por teléfono al aprender a pelear; salen como triángulos rojos.
- **Parkings**: el techo ya no corta las escaleras (ni se ve una pared a media escalera desde la plaza, ni el personaje
  hundido); se anda por todo el ancho de la sala (tope invisible en el carril); junto a las rampas ya no te hundes en
  la acera ni te frena una pared invisible. **La Trinidad: un solo parking de ~420 m bajo toda la avenida**, más hondo,
  con la pendiente de la calle, rampas en los dos extremos y escaleras a las dos aceras.
- **Pabellón Juan Ríos Tejera** rehecho: nave baja blanca con franjas moradas y cubierta gris (era un bloque de pisos).
- **Tranvía junto al Campus Central**: ya no hay aceras flotando sobre la trinchera.

## 0.75.0 — 2026-10-13 — Copa Laguna, reglas del portero y flechas de misión
- **Copa Laguna**: torneo de fútbol como el Torneo Lagunero (se abre tras el primer partido de fútbol del Obispo): cuatro
  campos por la ciudad, cada rival más fuerte (Atlético Gofio de Geneto, Unión Perenquén, Deportivo Papas Arrugadas,
  Real Mojo Tejina) y la **final en el Estadio Francisco Peraza** contra Los Galácticos de Guamasa.
- **Estadio Francisco Peraza**: las gradas que salían como muros son ya gradas de verdad (asientos en pendiente sobre la
  pista, tribuna este con techo) y tiene entrada en la calle con su nombre y taquilla.
- **Fútbol**: el portero coge el balón con la mano y una parada se ataja o se despeja; mientras la tiene, y en los saques
  de banda (con la mano), córners y saques de puerta, nadie se acerca a menos de 3,5 m (círculo a rayas), no hay robos
  ni entradas y el que saca no corre; una plancha al portero es falta y vuelve a sacar él.
- **Al acabar un partido el personaje ya no sigue corriendo solo**: las teclas se sueltan al entrar y salir de los
  minijuegos y de la pelea 2D.
- **Flecha sobre el coche**: en las persecuciones apunta al coche o a la persona que persigues; en las carreras, al
  siguiente control. En las carreras se ve ya la ruta de los dos controles siguientes (azul a rayas en el minimapa y el
  mapa grande).
- **Diario (J)**: guarda todas las conversaciones (también las del final de cada misión y las sueltas), de la más
  reciente a la primera y con quién dijo cada cosa, y tiene una entrada con todas juntas. Las misiones hechas en
  partidas de antes del diario lo explican.

## 0.74.0 — 2026-10-13 — Seis arreglos rápidos
- **Aeropuerto**: la rotonda acristalada de la terminal se coloca donde no pisa ninguna vía (antes caía sobre las vías
  de servicio del lado aire: coches atascados y el revisor la veía «flotando»); si no cabe entera, más pequeña.
- **Obstáculos en calzada**: la comprobación «¿está en una calzada?» mira ya las tres calles más cercanas y no solo la
  más próxima (junto a una calle estrecha, la autopista ancha de al lado quedaba sin mirar: poste junto a la TF-13).
  Los árboles de OSM que quedaban dentro de una calle con coches (Calle Juan de Vera) no se plantan.
- **Enemigos abatidos en las misiones**: ya no se quedan congelados; caen con su animación, suena el golpe y se quejan
  de vez en cuando si estás cerca.
- **Recorte de edificios**: al empujar una esquina fuera de una calle tampoco puede meterse en una calle peatonal
  (atasco a pie en la Calle Heraclio Sánchez).
- **Callejero**: lista de los 36 edificios de la leyenda en `docs/referencias/callejero/edificios.md`, con cuáles tienen
  ya algo propio en el juego (22) y cuáles son aún el bloque genérico (14), para misiones y para recrearlos.

## 0.73.0 — 2026-10-13 — Fáciles: auditoría, marcas viales y el agente revisor
- **Edificios en calzada (auditoría 0.70)**: el recorte ya no devuelve nunca un edificio más metido en una calle que
  el original (un corte a lo largo de una calle que seguía por el cruce dentro de la siguiente, o una esquina empujada
  hacia otra calle): Calle Las Eras, Tabajoste, Camino La Cañada… La profundidad se mide ya con la calle tal como se
  dibuja, tramo a tramo. Invasiones ≥ 1 m en todo el mapa: 189 → 159, ninguna peor que antes (las casas pequeñas pueden perder hasta el 60 %).
- **Columnas del Intercambiador** (los «árboles o farolas» en la vía de servicio junto a Padre Anchieta): se apartan
  del carril de las guaguas. Carteles «P» y postes de la valla del aeropuerto: nunca dentro de una calzada (auditoría
  0.72); la valla, con postes cada 12 m (menos geometría).
- **Marcas viales**: los ramales de un solo sentido (enlaces de autopista y de vías principales) ya no llevan línea
  central.
- **Agente revisor**: el personaje ya no se hunde en caminos y aceras que pasan por una hondonada (se pisa la superficie
  que se ve: alturas guardadas en celdas de 3 m donde el camino queda por encima del terreno); una calle que se elevaba
  para tapar un bulto del terreno ya no sube más de 0,4 m (flotaba sobre la que cruza).
- **Prueba de conducción**: los tramos que fallan desde hace tiempo (Camino La Rúa, dos de la Autopista del Norte,
  Camino La Hornera) son «fallos conocidos»: salen como aviso y la prueba pasa si solo fallan ellos.

## 0.72.0 — 2026-10-13 — Pendientes grandes del mapa
- **Obispado (Casa Salazar)** entera por fuera, con las fotos de Jonay: dos plantas de cantería oscura; ventanas bajas con
  rejas, banda de rosetas y crestería de forja; balcones sobre ménsulas con barandas de hierro y frontón en cada ventana
  alta; portada con columnas dobles estriadas sobre pedestales tallados, balcón central entre columnas y remate barroco
  con el escudo y pináculos sobre la cornisa; por la puerta abierta se ve el zaguán y el patio con su galería. Torres
  de las esquinas en el mismo gris.
- **El tranvía va bajo tierra** entre la Calle Pedro Zerolo y la parada de Padre Anchieta: baja en trinchera con muros
  y barandas (pendientes ≤ 8 %), pasa cubierto por debajo de las calles que lo cruzan en el cruce de Padre Anchieta y
  sube antes de la parada. Los postes de la catenaria no se ponen dentro de la trinchera.
- **TF-13 / rotonda partida bajo la TF-5**: las dos mitades de la rotonda bajan 6 m en trinchera con muros de piedra y
  se unen por dos túneles con bocas de bóveda bajo la autopista; la TF-13 (hacia Cam. La Hornera), los enlaces y la calle
  hacia Geneto bajan hasta ella. **Urbanización Guajara**: chalets blancos y crema con tejado rojo a cuatro aguas.
- **Aeropuerto** con las fotos: rotonda acristalada con cúpula en el centro de la terminal, cuatro depósitos de
  combustible junto a la Rotonda Sempiterno, carteles en las naves de Cam. San Lázaro (paquetería, hangar de la
  aerolínea de la isla, ITV), carteles «P» de los aparcamientos y valla perimetral. **Aviones que aterrizan y despegan**
  de vez en cuando (pista 30) cuando estás cerca.
- **Callejero oficial** (PDF del Ayuntamiento en `docs/referencias/callejero/`): las calles Bencomo, Juan de Vera,
  Rodríguez Moure y Ascanio y Nieves, que OSM daba como peatonales, son calles con coches (en el plano no van empedradas).
- El trabajador tiene la orden nueva `descargar <clave>` (lista cerrada; de momento, el callejero).

## 0.71.0 — 2026-10-13 — Misiones por zonas
- **La historia va por zonas** (Jonay): tras el barrio del inicio (El Blanco, La Concepción, Coco y Sastrón) van las del
  casco y el Ayuntamiento (Defensores, Los bancos del Adelantado, El gofio robado, El carterista del Cristo, Carrera
  solidaria), luego La Trinidad, la Vía de Ronda y el norte (El rally de La Esperanza, Baches en la Vía de Ronda,
  Escolta a la guagua del Romero, La guagua de la broma, Grafiteros en el tranvía) y, de final, Noche en el aeropuerto.
- **Grafiteros en el tranvía** ya no te manda a Las Mantecas (3,5 km): los grafiteros están en la parada de Padre Anchieta.
- **Partidas guardadas de antes**: se convierten por título: sigues por la primera misión que no hiciste en el orden
  nuevo y las que ya hiciste se saltan (el diario J las muestra como hechas). Partidas nuevas: versión 3 del guardado.

## 0.70.0 — 2026-10-13 — Pendientes fáciles y maleantes en busca y captura
- **Maleantes en busca y captura**: cuando ya sabes pelear (tras la misión de Sastrón), de vez en cuando sale en el
  minimapa (punto verde lima) un maleante con mote entre la gente de la calle. Le pegas y empieza la pelea 2D, pero es
  más difícil que con cualquiera: se cubre más, encadena más combos y pega más fuerte (tres niveles, que suben a medida
  que vas capturando). Ganarle da una recompensa (150, 300 o 600 $) y no es delito; si pierdes, sigue marcado. No salen
  durante una misión, y se escapan si te alejas o pasan 4 minutos.
- **Persecuciones más suaves**: los coches que huyen en las misiones (y el Canarión en la carrera) ya no giran en seco
  en las esquinas: toman la curva redondeada y frenan antes, mirando la curva más cerrada de lo que les queda delante.
- **Marcas viales**: las líneas de una calle ya no se pintan donde la calle está dentro de otra (bocas de cruce,
  incorporaciones y salidas que van pegadas a la vía, glorietas): ahí el asfalto va liso y se acabaron las líneas cruzadas.
- **Telepisa en la Avenida de La Trinidad**: era una nave baja y plana con el cartel en el tejado. Las franquicias de bajo
  (pizzerías, bancos, tiendas de móviles, cafés, ópticas…) ya no convierten el edificio en una gran superficie: el
  bloque de viviendas queda como es y la tienda lleva su cartel en la fachada.
- **Edificios en calzada (auditoría 0.69)**: el recorte también entra en las esquinas (cuando lo que se sale del tramo
  de calle está en otra calle, el cruce), empuja hacia fuera las esquinas que siguen metidas (hasta 4 m, sin deformar el
  edificio) y admite recortes hasta la mitad del edificio. Invasiones de ≥ 1 m: 374 → 189.
- **Aviones del aeropuerto**: si su puesto cae sobre una vía de servicio de la plataforma, el avión se aparta hasta
  dejarla libre.
- Herramienta nueva `tests/herramientas/sonda_zonas.py` (dónde se recoge cada misión y por dónde pasa) para ordenar las
  misiones por zonas en la próxima pasada. Pruebas nuevas: `prueba_maleantes.py`, `prueba_pendientes_faciles.py`.

## 0.69.0 — 2026-10-13 — A fondo con los avisos del auditor
- **Edificios fuera de la calzada en todo el mapa** (el auditor contaba 515 metidos en los carriles): como las calles del
  juego son más anchas que las reales, cada edificio que se mete más de 0,6 m en una calzada se recorta en línea
  recta hasta el bordillo (media calzada + 0,3 m). No se tocan iglesias y monumentos, edificios con un paso por debajo
  ni recortes que dejarían menos del 60 % del edificio.
- **Obstáculos en la calzada**: árboles, farolas, bancos, jardineras y mesas ya no se colocan en ninguna calzada (antes
  solo miraban las calles con tráfico); la máquina de billetes y el tótem de una parada del tranvía que caían en la
  Av. de La Trinidad se quitan si pisan la calzada.
- **Menos basura por fotograma**: al apuntar y disparar (tu pistola y la de la policía) y en el modo Achamán ya no se
  crean vectores ni matrices nuevos cada vez; los huesos de la mano se buscan una sola vez. La pistola comparte sus
  piezas con las de la policía.
- **Código más ordenado**: baloncesto y fútbol comparten teclas, sonidos, voz, textos y marcador
  (`09ea_minijuegos.js`); nombres de funciones repetidos (`init`, `make`, `render`) cambiados para que el auditor no
  confunda el código de carga con el de cada fotograma.

## 0.68.0 — 2026-10-12 — Avenida de La Trinidad y obstáculos del auditor
- **Avenida de La Trinidad** (con las capturas de Jonay):
  - Cada calzada tiene ahora un carril y aparcamiento (6,6 m, antes 9 m), y el tranvía cabe en medio.
  - Los edificios que pisaban la calzada o la acera retroceden hasta la línea de la acera.
  - En los solares vacíos junto a la avenida salen casas como las de al lado.
  - **Dos aparcamientos Indigo**, con rampas de muros azules: «Trinidad Casco Histórico», con la rampa en medio de la
    calzada partida al principio de la avenida (n.º 3); y «Trinidad Centro», con la rampa junto a la acera y la
    cuadrícula amarilla delante, en el n.º 59, junto al súper, justo encima de la C. Pedro Zerolo.
  - **Cruce con Pedro Zerolo**: cuadrícula amarilla donde cruza el tranvía y pasos de peatones.
  - **Soportales** con columnas en la manzana del súper y en el n.º 76.
- **Obstáculos graves del auditor**:
  - El Canarión ya no espera en la otra calzada de la Trinidad.
  - Fuera los pilares de la pasarela de Padre Anchieta que caían en la calzada (Glorieta del Brasil).
  - Fuera los postes de canastas y porterías de canchas dibujadas encima de una calle (Camino de las Peras, Av. Lora
    Tamayo).
  - El poste del cartel de los aparcamientos ya nunca cae en la calzada.

## 0.67.0 — 2026-10-12 — Fútbol 2D: JETA SOCCER
- **Fútbol 2D 5 contra 5**, visto desde arriba como el Sensible Soccer: campo que sube y baja con el balón, jugadores
  pequeñitos con la equipación de cada equipo, radar, palos, bandas, córners, saques de puerta y gol de oro.
  - Mismas teclas que el baloncesto: clic izquierdo (o E) chuta, cuanto más lo mantienes más fuerte y alto (y después
    izquierda / derecha le dan efecto); sin balón es una entrada. Clic derecho (o Q) pasa al compañero al que miras,
    mantenido más fuerte y bombeado; sin balón cambia de jugador. Espacio corre.
  - Juegas con la banda: El Blanco de portero, Boca Papa y Sastrón atrás, Coco en el medio y tú arriba.
- **Campos de fútbol con entrada** (balón blanco flotando): en los abiertos se pulsa E en el campo; los de colegio o
  encerrados tienen puerta en la calle. Tras el primer partido, retos en cualquier campo (niveles 1–5).
- **Misiones del Obispo 3 y 4**: «Un partido por La Concepción» (tutorial contra los seminaristas) y «El clásico de
  las cofradías».

## 0.66.1 — 2026-10-12 — Baloncesto más fácil y pruebas solo de lo cambiado
- **Baloncesto**: más fácil en general: todos se mueven más despacio (los rivales flojos, más aún), la CPU roba y empuja mucho menos
  (tú robas más), falla más tiros y mates (¡al hierro!) y tus tapones a los mates entran la mitad de las veces. El
  primer partido del Obispo, los retos de las canchas y el Torneo Lagunero bajan un punto de dificultad.
- **Pruebas por zonas**: `PRUEBAS.bat` (y la orden `pruebas`) solo prueba lo que ha cambiado desde la última tanda
  que pasó (huellas de cada archivo + `scripts/pruebas/categorias.json`) más las de la versión, con una sola carga del juego; las que fallan se repiten aparte.
- El trabajador va diciendo qué prueba hace (con una frase de qué comprueba) y el sonido de las pruebas va silenciado.
- `build.py` se para si un comentario `//` se ha tragado código detrás (pasó 3 veces en la 0.66: jugadores invisibles y
  jugadores quietos).

## 0.66.0 — 2026-10-12 — Diario de misiones, Torneo Lagunero y baloncesto más cerca
- **Diario de misiones (J)**: sobreimpreso, con las 4 líneas (Historia, El Canarión, El Obispo, Torneo Lagunero), el
  estado de cada misión, qué hacer en la siguiente y **todas las conversaciones** de cada misión (se guardan con la
  partida). «Reiniciar desde aquí» vuelve a esa misión y todo lo que va detrás. El Blanco te da la libreta en la primera.
- **Baloncesto**:
  - El ratón estaba al revés: ahora clic izquierdo tira y el derecho pasa.
  - Cámara mucho más cerca, con el doble de resolución: sigue al balón y enseña su mitad y algo más; flechas en el
    borde para quien queda fuera.
  - La zona verde del tiro es más ancha cerca de la canasta y más estrecha de lejos.
  - La CPU ya no tira desde su campo, y los equipos flojos fallan casi todo (sobre todo de lejos).
  - Combos con un 20 % más de tiempo.
  - Jugadores, aro y balón un 30 % más grandes respecto a la cancha (se veían pequeños).
  - Fondos distintos: cancha de la calle, patio de colegio y pabellón cubierto.
- **Canchas con entrada**:
  - Las públicas se juegan pisando la cancha y pulsando E.
  - Las de colegio o encerradas entre edificios tienen una puerta en la calle (E), con un balón flotando encima.
  - Las canchas dobles (dos dibujadas una encima de otra) quedan en una sola.
  - Después del primer partido puedes retar a la gente de cualquier cancha (niveles 1–5).
- **Obispo**: el primer partido es en el **Colegio Máyex** (se entra por su puerta de la C. Pintor Cristino de
  Vera); el segundo, en una cancha pública.
- **Torneo Lagunero** (círculo naranja; se abre al ganar el primer partido): 4 equipos en canchas de la ciudad, cada
  uno más difícil, y **la final en el Pabellón Juan Ríos Tejera** (puerta morada y cartel en la C. Leopoldo de la Rosa
  Olivera; dentro, cancha de parqué con gradas).
- Trabajador: `auditar` como `auditar_jeta.bat` (resultados en `resultados_pc`), `subir_git` (sube ya a GitHub) y
  `borrar_auditoria_vieja`.

## 0.65.1 — 2026-10-12 — Arreglos del Obispado
- **Monseñor Truchas y su círculo quedaban dentro de la Casa Salazar** (la portada se orientaba hacia dentro cuando la
  casa vecina estaba pegada): ahora la fachada se orienta desde la propia casa, solo hacia una calle, y el obispo y el
  círculo siempre quedan en la calle, alcanzables.
- **Parpadeo de la fachada del Obispado**: el chapado de piedra tocaba la pared y peleaban (z-fighting); ahora es un
  plano separado 14 cm. Herramienta nueva `foto_noche.py` para medir parpadeos.

## 0.65.0 — 2026-10-12 — El Obispo y el baloncesto 2D
- **Monseñor Fermín Truchas, obispo de Nivaria** (parodia), en la puerta del **Obispado** (Casa Salazar, C. San
  Agustín): portada de cantería oscura con columnas pareadas, frontón con escudo, balcones de forja y pináculos. Sus
  misiones (círculo **morado**) se abren con las del alcalde y son opcionales:
  1. **Un partido por la Catedral**: con Coco contra los seminaristas en la cancha más cercana, con tutorial.
  2. **El torneo de la parroquia**: contra los del Cristo, más duros.
- **«JETA JAM», baloncesto 2D 2 contra 2** al estilo de los arcades de los 90: los mismos sprites de la pelea, pases,
  robos, empujones, tapones, triples, «¡en llamas!» tras 3 canastas seguidas, canasta de oro si hay empate y un
  locutor. **Mismas teclas que la pelea** (norma para todos los minijuegos): mantener clic izquierdo / E para tirar y
  soltar con la barra en verde (defendiendo, salta para taponar); clic derecho / Q pasar, robar (corriendo, empujón) o,
  defendiendo lejos del balón, cambiar de defensor; Espacio correr. **Entrada en combo**: corriendo y tirando desde
  media distancia el juego se para y tienes 3 s para uno de los 4 especiales de la pelea, cada uno un mate distinto
  (Mate de Gofio, Molino del Teide, Gancho del Roque, Salto del Pastor). Tutorial de 7 pasos en el primer partido.
- **Ni farolas ni árboles (ni bancos) dentro de canchas y campos**, y cada cancha es siempre del mismo tipo.
- El trabajador local acepta `auditar` (solo cuando lo pidas). Pruebas nuevas: `prueba_baloncesto.py`, `prueba_obispo.py`
  (`PRUEBAS_MINIJUEGOS.bat`).

## 0.64.1 — 2026-10-12 — Pruebas en el PC de Jonay
- **`scripts\PRUEBAS.bat`**: compila y lanza en tu PC las pruebas de `scripts/PRUEBAS_LISTA.txt` (o todas con
  `PRUEBAS.bat todas`); la primera vez instala Playwright y su navegador. Informe en `reportes\pruebas\ULTIMO.md`, que
  Claude lee antes de publicar. Desde ahora todo lo que se ejecuta (pruebas, fotos, sondas, herramientas) va en tu PC.
- Las auditorías las pasas tú; Claude lee los resultados nuevos de `RevisordeCodigo\resultados` al empezar cada tanda.
- Prueba de controles de la pelea más robusta (espera a aterrizar entre teclas).

## 0.64.0 — 2026-10-12 — Pelea 2D con las mismas teclas que la calle
- **Pelea 2D**: puñetazo `E`, patada `Espacio`, salto `↑` / `W` (más clic izquierdo y derecho del ratón). Fuera J, K,
  L, U, I y las de Shift/Ctrl derechos. Los especiales siguen igual (abajo, arriba + golpe funciona aunque ↑ salte).
- **Los textos de misión y de la pelea muestran las teclas que tengas en Opciones › Controles** (tutorial de Sastrón,
  tarjeta de controles, «pulsa E para entrar», coche, armas…), no unas fijas.
- La rutina de publicación ya no pasa el auditor de código salvo que Jonay lo pida.

## 0.63.1 — 2026-10-12 — Flecha del coche más discreta
- La flecha que flota sobre el coche es mucho más pequeña (menos de la mitad), más transparente y casi plana: ya no
  parece que apunte al cielo ni de frente al suelo.

## 0.63.0 — 2026-10-12 — Claxon para cada coche y flecha flotante en coche
- **Claxon nuevo, uno por tipo de vehículo** (el de antes era un pitido cuadrado muy feo): utilitario y moto con dos
  pitidos agudos, turismo y taxi de dos notas, SUV y furgoneta más graves, deportivo brillante, guagua y policía graves y
  el camión con bocina de aire. Cada coche suena un poco distinto, y el Guanche GT de El Canarión toca una melodía.
- **Brújula en coche**: en lugar del aro (seguía siendo enorme) hay una **flecha maciza flotando sobre el techo** que
  apunta al destino principal (rosa si has marcado uno), siempre vuelta hacia la cámara, como en los juegos de taxis.
- **Brújula a pie**: el aro es un 30 % más pequeño.

## 0.62.1 — 2026-10-12 — Brújula: se ve a pie en todas partes y más pequeña en coche
- **A pie se veía mal o nada** en aparcamientos, plazas y calles inclinadas: quedaba por debajo del pavimento. Ahora se
  coloca a la altura de los pies del personaje (o de las ruedas del coche) y solo usa el terreno para inclinarse.
- **En coche** el aro es poco más ancho que el coche (antes era enorme) y ya no tiembla en las bajadas: la inclinación
  y la altura se suavizan.
- **Tecla G**: muestra u oculta la brújula (se puede cambiar en Controles). No se usa la E porque es «usar / entrar».

## 0.62.0 — 2026-10-12 — Brújula más pequeña, círculos fuera de edificios y fallos pequeños
- **Brújula**: la mitad de tamaño y el doble de trazo; las puntas salen del borde del aro; el aro toma el color del
  destino que manda (rosa si has marcado un punto en el mapa, si no amarillo de la misión principal). Se apoya en la
  superficie real y se inclina con ella, y es algo más opaco para verse sobre suelos claros (el aro blanco no se distinguía en plazas de baldosa clara) (ya no se hunde en carreteras peraltadas ni puentes). En coche o camión rodea
  todo el vehículo con trazo fino y se dibuja por encima de la carrocería.
- **Círculos de misión fuera de los edificios**: el punto de inicio y los destinos se apartan hasta que el aro entero
  queda en la calle (p. ej. Coco junto a la Casa Ossuna).
- **La «moneda» flotante**: era la esfera del reloj, colocada mal (a ~1 m del brazo). Ahora va en la muñeca.
- **Carteles al revés por detrás**: el cartel verde y los discos de la isleta de Marqués de Celada tienen la parte de
  atrás lisa y gris; los rótulos del aparcamiento se leen bien por los dos lados.
- **Nombre de la banda**: puedes escribir tu propio nombre; «Los Magos de Aguere» sustituye a «Los Magos de La Laguna».
- **Coco y Sastrón** aparecen en dos de los tres sitios del casco más cercanos al inicio.
- Herramienta nueva `tests/herramientas/foto_jugador.py` (jugador apuntando y accesorios pequeños).

## 0.61.0 — 2026-10-12 — Brújula a los pies, radio con 20 canciones y nombres nuevos
- **Brújula a los pies** (sustituye a la flecha grande): un aro fino alrededor del personaje (o del coche) con una punta
  por cada destino activo, siempre en línea recta hacia él: amarilla misión o historia, azul secundaria, roja a quien
  persigues, rosa tu destino del mapa. Tras teletransportarte vuelve el siguiente punto de la historia.
- **Radio**: 20 canciones con título y artista inventados (7 + 7 + 6 en las tres emisoras), cada una con **su propia
  voz** (voces del navegador con tono y ritmo propios), siempre el mismo ritmo y letra, ~1:45 con tres estrofas sin
  repetir versos; al empezar una canción sale su título.
- **Nombres**: Ruymán «El Blanco» pasa a ser **Rayco «El Blanco»** y Santi «El Chopa», **Ayoze «El Chopa»**.
- **Intro**: el texto de que El Chopa sale de la cárcel ahora queda en un cuadro hasta pulsar «¡Vamos!».
- Prueba de conducción de túneles y puentes: el tiempo de cada tramo depende de su longitud y se pueden probar tramos
  sueltos (`prueba_conduccion_tuneles_puentes.py 1287,2295`). El enlace de la autopista (X −386 Z 678) ya pasa.

## 0.60.0 — 2026-10-12 — Flecha guía, noche más clara y carrera solidaria posible
- **Flecha guía**: con un objetivo de misión (amarilla) o un destino marcado (rosa), una flecha en el suelo a tus pies
  (sobre el coche si conduces) apunta por la ruta del GPS. Se esconde cerca del objetivo, en interiores y en menús.
- **Noche más clara**: la luz mínima nocturna sube; de día todo queda igual.
- **Carrera solidaria del casco**: hasta 4 controles a menos de 320 m del Ayuntamiento, en orden de cercanía, y
  vuelta al Ayuntamiento; el tiempo se calcula con la distancia (antes eran ~6 min imposibles).
- **Rutas lejos del borde**: carreras, coches que huyen y fugas a pie eligen recorridos a ≥ 90 m del borde del mapa
  (antes el aviso del borde te devolvía atrás en plena persecución).
- **Primera pelea 2D sin parón**: el fondo del escenario se prepara una vez durante la carga.
- `.gitattributes`: finales de línea fijos (sin el aviso «LF will be replaced by CRLF» de git en Windows).

## 0.59.0 — 2026-10-12 — El mapa crece: La Cuesta y Taco
- **Mapa más grande** alrededor de los centros de salud de **La Cuesta** (franja de X 2400–3450 por Z 1600–2250) y de
  **Taco** (X 1450–1850 por Z 3980–4430), unidas al borde del mapa anterior: unos 300 edificios y 390 calles nuevas de
  OpenStreetMap, con su relieve (Copernicus) fundido con el del resto.
- **Centros de Salud de La Cuesta y de Taco** rotulados; al morir cerca, reapareces allí.
- Las zonas nuevas se descargan desde el PC (`scripts/descargar_zonas.bat`, reintentos y límites de los servidores) y se
  integran con `tools/merge_zona.py` sin duplicar lo que ya había: reutilizable para futuras ampliaciones.

## 0.58.2 — 2026-10-12 — Centro de Salud de Finca España en su parcela
- **Finca España**: ya no se sale a la Avenida de los Menceyes. Ocupa toda su parcela, entre la C. Pueblos de Tenerife y
  la C. El Coralito, con el aparcamiento detrás (la plaza vacía de al lado era parte del centro): ala baja al oeste y
  bloque principal, fachada, puerta y verja a la avenida. Se ve en el minimapa y en el mapa. El último tramo del
  «Pasaje el Dátil» de OSM, que cruzaba la parcela, se corta en el aparcamiento.

## 0.58.1 — 2026-10-07 — Centros de salud en su sitio
- Con las capturas de Jonay (códigos de Google Maps pasados a metros del juego): **Laguna-Universidad** (Av. Trinidad,
  antes «La Laguna»), **San Benito** movido a su sitio real (C. Benito Pérez Galdós, estaba 240 m desviado) y
  **Finca España** nuevo (Av. de los Menceyes 153; no está en OSM: bloque de ladrillo y gris con verja). La Cuesta
  queda fuera del mapa actual.

## 0.58.0 — 2026-10-07 — Hospital Universitario de Canarias y centros de salud
- **HUC** según las fotos: bloque de 12 plantas con bandas de ventanas, torre cilíndrica blanca con remate de cristal y
  helipuerto en voladizo, el edificio verde de cristal de Actividades Ambulatorias, Urgencias rotulada y jardín con
  palmeras y la escultura de acero.
- **Centros de salud** de La Laguna y de San Benito: fachada blanca con el rótulo y la cruz verde.
- **Al morir te despiertas en el centro de salud o las urgencias más cercanas** (antes, en casa de El Blanco).

## 0.57.0 — 2026-10-07 — Persecuciones visibles, mapa legible, GPS estable y menos memoria
- **Mapa grande**: se abre más cerca y centrado en ti. Los rótulos ya no se pisan: de lejos solo barrios y lugares
  importantes; al acercarte salen grandes superficies, entradas y, muy cerca, las tiendas. Texto con borde oscuro y
  colores que no se confunden con las rutas de misión.
- **Atraco en la farmacia**: el segundo ladrón corre y roba un coche negro aparcado junto a un Tollota Corola (para
  ti); el coche sale en el mapa como círculo amarillo con la ruta para seguirlo; sube hacia Las Gavias, se baja y huye
  a pie por el camino de tierra hacia el Camino Tornero: dale dos tiros de bolas antes de que llegue, se pone a
  llorar y lo agarras.
- **Canarión**: el círculo azul de las carreras ya arranca a la primera (el de «El rally de La Esperanza» estaba
  encima; ahora están separados y empieza el más cercano).
- **Persecuciones**: una flecha roja encima de quien hay que perseguir (persona, coche o guagua) los primeros segundos,
  y un punto rojo en el minimapa y el mapa grande mientras dura. Los que huyen a pie salen desde donde están (Pepe
  ya no desaparecía de golpe), siempre alejándose de ti, por aceras, plazas y caminos y sin saltos.
- **Rutas del GPS**: en coche la ruta sale de la calle por la que vas y en tu sentido de marcha (antes salía del cruce
  más cercano, que podía estar detrás, en una calle paralela o en un puente) y no se recalcula mientras la sigues:
  solo se recorta lo ya hecho. Ya no da saltos ni va marcha atrás.
- **Coches aparcados de misión** (el camión de los baches, la furgoneta del gofio…): ya no se van solos marcha atrás;
  un coche sin conductor con el freno puesto se queda quieto aunque haya cuesta.
- **Tranvía**: sin árboles ni farolas encima de la vía.
- **Memoria** (auditorías; medido: memoria JS 544 → 503 MB, geometría en RAM 382 → 342 MB): las posiciones de la ciudad se liberan al subirlas a la tarjeta gráfica (solo el agente
  revisor las conserva, con `?revisor=1`); al cambiar el tiempo se liberan los mapas de entorno del tiempo anterior;
  los bancos de la misión «Los bancos del Adelantado» se liberan al terminar.

## 0.56.1 — 2026-10-07 — Alcalde gordito
- **Don Yovoy Gofiérrez** pasa a talla «gordito» (cuerpo y cara más llenos), sin llegar a las tallas gordas extremas.

## 0.56.0 — 2026-10-07 — Defensores de La Laguna: 12 misiones, Ayuntamiento y alcalde
- **Misiones nuevas** (12, tras el campo de tiro): Atraco en la farmacia, Defensores de La Laguna (ceremonia en el
  Ayuntamiento), El carterista del Cristo, Baches en la Vía de Ronda, El rally de La Esperanza, Los bancos del
  Adelantado, Grafiteros en el tranvía, La guagua de la broma, Escolta a la guagua del Romero, El gofio robado,
  Carrera solidaria del casco y Noche en el aeropuerto (acaba con coche patrulla para la banda).
- **El alcalde, Don Yovoy Gofiérrez** (bigote y traje negro), espera bajo los arcos del Ayuntamiento y encarga misiones.
- **La pistola es de bolas de plástico** de aire comprimido: lo explica El Blanco y en estas misiones no es delito.
- **Ayuntamiento** nuevo según las fotos: cantería, 5 arcos, balcones de madera, frontón con escudo y 5 banderas.
- **Reintentar**: al fallar una misión se pregunta «¿Reintentar?» y te lleva a su inicio.
- **Guardar a mitad**: al cargar, la misión empieza de nuevo en su círculo (con aviso) sin dejar nada suyo suelto;
  las partidas que ya habían terminado la historia siguen con las misiones nuevas.
- **Pelea 2D, especiales nuevos**: atrás-adelante + puñetazo = Bola de gofio; atrás-adelante + patada = Patada del
  Teide (avanza girando, 3 patadas); abajo-arriba + puñetazo = Gancho del Roque; abajo-arriba + patada = Salto del
  Pastor. En el tutorial de Sastrón.
- **Moto**: el piloto va sentado, inclinado al manillar, con los pies en el reposapiés (antes, tieso de pie).
- **Tallas gordas**: la deformación de la cara se limita a papada y mejillas (los labios ya no se hinchan).
- Pruebas nuevas `prueba_misiones.py` (juega solas todas las misiones) y `prueba_misiones_guardado.py`;
  herramientas de fotos reutilizables en `tests/herramientas/`.

## 0.55.0 — 2026-10-07 — Uniones de túneles y trincheras, pasarela y aviso de la radio
- **Bocas de trinchera**: donde otra calle se incorpora a una calle hundida (Vía de Ronda, X 388 Z 1499), la trinchera
  no empieza a bajar hasta dejar atrás la incorporación (rampa del 15 %), salvo bajo los puentes que cruza; si allí
  tiene que ser honda, es la calle que se incorpora la que baja con ella. Ya no se cae el coche 1,7 m en la boca.
- **Túneles por dentro**: la pared entre dos trincheras pegadas solo se quita cuando de verdad van juntas (a menos de
  0,6 m y a la misma altura): en el Camino el Vallado ya no se ve el exterior por los lados. El fondo de tierra solo se
  pone en los tramos cubiertos (en la trinchera abierta tapaba el cielo).
- **Pasarela de La Trinidad**: unos trozos de puente peatonal de OSM se montaban sobre la rampa hacia San Miguel de
  Geneto a otra altura y no dejaban pasar; ahora la rampa es continua.
- **Radio**: al subir a un coche se avisa de cómo cambiar de emisora (Q / tocar el velocímetro) hasta que la hayas
  cambiado dos veces; se guarda con la partida.

## 0.54.0 — 2026-10-07 — Freno de mano de verdad y modo móvil ordenado
- **Freno de mano**: bloquea las ruedas traseras. El coche frena, la trasera se va y gira más cerrado; un toque a
  60 km/h da un derrape de ~30° que se recoge solo al soltar; mantenido, el coche cruza y se para. Las ruedas traseras
  dejan de girar mientras está echado.
- **Modo móvil**: el minimapa ya no tapa las estrellas ni los botones. Minimapa arriba a la izquierda (tocarlo abre el
  mapa), reloj, dinero y estrellas arriba a la derecha, botones abajo a la derecha al alcance del pulgar, todo escalado
  al alto de la pantalla. Los botones cambian en el coche: SALIR, FRENO MANO y CLAXON.
- **Invernaderos** (el «edificio transparente» junto a la pasarela de Padre Anchieta es un invernadero de OSM): ahora
  siguen la pendiente (antes eran una caja de cristal plana de hasta 13 m de alto en cuesta), son de plástico lechoso y
  llevan estructura blanca.

## 0.53.0 — 2026-10-07 — Paradas del tranvía, escalera de la pasarela y paredes de túnel
- **Paradas del tranvía**: en 9 paradas la calzada pisaba las vías y el andén y el coche se atascaba. Ahora, junto a
  cada parada, la calle se aparta hacia fuera con una curva suave lo justo para dejar sitio al andén, sin meterse en
  edificios ni aceras (se calcula en `prep.py`). Los andenes son un 20 % más pequeños que los reales (24 × 1,85 m).
- **Pasarela de La Trinidad**: la escalera sureste ya no baja a la carretera; sale un tramo llano hacia el campus y la
  escalera llega a la acera en X −272, Z 709.
- **Túneles**: entre dos trincheras pegadas solo se quita la pared si las dos van a la misma altura; si la de al lado
  va a otra profundidad o aún a ras, la pared se mantiene (antes se veía el exterior a través del túnel).

## 0.52.0 — 2026-10-07 — Sin fuga de los coches del tráfico (auditoría P0.a)
- Las piezas de los vehículos se crean una sola vez y las comparten todos: pilotos, barra de luces y franjas de la
  policía, franja y luz del taxi, ruedas, cubos, carenados y piloto de las motos, y el casco del motorista. Los rótulos
  («POLICÍA LOCAL», furgonetas, taxi, guagua) usan una textura por texto.
- Cuando un coche se descarta y no vuelve al grupo de reutilizables (destrozado o grupo lleno), se libera su pintura y
  lo que no es compartido; el motorista vuelve al grupo de peatones (antes se creaba uno nuevo por moto).
- `__dbg.POOLS = { CARPOOL, HPOOL }` para que el auditor no cuente como fuga lo guardado para reutilizar.

## 0.51.0 — 2026-10-07 — Calles superpuestas a distinta altura, isletas y rampas de garaje
- **Calles que se solapan con un terraplén** de cualquier altura (no solo los bajos) suben con él donde de verdad lo
  pisan: se acaban el asfalto «flotando» 2–3 m sobre otra calle (X 91 Z 1284, X 701 Z 814, X −741 Z 334) y los dos
  últimos «vuela» de los enlaces de la TF-5 (X 750 Z 3486, X 717 Z 3390).
- **Isletas de rotonda** que siguen el terreno (antes eran un disco plano a la altura del centro y en cuesta quedaban
  1–1,5 m por encima de la calzada) y que se encogen si una calle de entrada les pasa por encima.
- **Inicio de las trincheras**: donde la calle hundida aún va casi a ras, su asfalto baja hasta el suelo por el lado
  bajo (en cuesta flotaba ~1 m sobre la calle de al lado, X 752 Z 1268).
- **Rampas de garaje** bajo plazas y aceras: el coche ya baja por ellas (antes la acera «tapaba» la rampa y el coche
  se quedaba arriba, X 2212 Z 3366).
- Agente revisor: no da «atasco» ni «no termina» en calles que siguen fuera del borde del mundo.

## 0.50.0 — 2026-10-07 — Enlaces de autopista, trincheras y fuentes
- **Enlaces de autopista sin «volar»**: el coche ya no salta a una rampa vecina más alta que se solapa con su calzada.
  Las vías que comparten terraplén con una rampa elevada suben con ella en ese tramo; el coche solo sube a un tablero
  si el escalón es pequeño (o si es el propio tablero que sube); y en curvas con pendiente la altura del puente o la
  trinchera sale del tramo más cercano. Prueba de conducción del agente: de 94 a 25 avisos (de 40 «vuela» a 3–6).
- **Trincheras**: las rampas de bajada terminan antes de los cruces; el coche ya no rebota en la boca de su propia
  trinchera ni se atasca en una calle a ras pegada a la trinchera gemela (X 1800, Z 3160); muros a ras donde otra
  calle toca la trinchera; sin losas de techo dentro de otra calzada. Túneles y puentes: fallan 3 de 97 (antes 10 de 111).
- **Túneles por dentro**: si la cámara queda bajo tierra se ve un fondo de tierra en vez del cielo o el subsuelo
  transparente.
- **Fuentes** de plazas y parques fusionadas en pocas mallas (menos llamadas de dibujo).
- **Vallas de canchas** que ya no cruzan la calle (C. Castellón / Valencia); los andenes del tranvía se acortan si sus
  rampas llegan a la calzada.
- Agente revisor: ya no da error al leer coches aparcados que se rehacen durante la prueba.

## 0.49.0 — 2026-10-07 — Rendimiento (auditoría) y menú principal nuevo
- **Menú principal**: botones en columna como en los juegos (continuar / nueva partida / cargar / opciones / controles
  / modo Achamán), número de versión en la esquina y una descripción del juego a la altura de lo que ya es.
- **Memoria** (auditoría P0.1): la geometría de la ciudad y de los coches aparcados guarda normales en 8 bits y colores en
  8 bits, y suelta de la RAM las copias que ya están en la tarjeta gráfica; los aparcados se rehacen por zona cuando
  te llevas uno. Memoria al arrancar: de ~1.200 MB a ~620 MB (y baja más según se va viendo la ciudad).
- **Sin fugas ni tirones** (P0.2–P0.3): peatones, Canariones y policías salen de un grupo preparado durante la carga y
  se reutilizan; los coches del tráfico que se van se guardan para reutilizarlos; las pistolas de los policías y las
  balizas de misión se reutilizan o se liberan.
- **Por fotograma** (P1): el HUD solo toca la página cuando cambia algo, el minimapa se dibuja a 30 Hz, los avisos
  («F Entrar…», puertas, comida) se buscan cada 6 fotogramas, colisiones y sol sin crear basura, y los mapas de
  reflejos del cielo se preparan durante la carga (uno por hora y media) en vez de recalcularse jugando.
- **Funciona sin internet** (P2): la copia del PC lleva Three.js y las fuentes dentro del HTML; los sombreadores se
  compilan sin congelar la carga.
- Rutina: en cada versión se lanza el auditor de código (el agente revisor, solo cuando Jonay lo pida); sus mejoras
  solo se aplican cuando Jonay lo dice. El agente revisor ignora las mallas cuyos datos ya se liberaron de la RAM.

## 0.48.1 — 2026-10-07 — Tallas: el protagonista vuelve a talla media
- El Chopa, los personajes de misión, los de las tiendas y los policías son siempre de talla media (antes podían salir
  con una talla aleatoria, incluso súper gordo).
- Reparto de tallas de los peatones más realista: la mayoría en el rango medio; atléticos, delgados y gordos menos
  frecuentes, y los extremos (súper delgado / extra y súper gordo) raros (2–4 %).

## 0.48.0 — 2026-10-07 — Pelea 2D en alta resolución y siete tallas de cuerpo
- **Pelea 2D con el doble de resolución** (640×360 en vez de 320×180, misma jugabilidad): los luchadores tienen cara
  (ojo, ceja, boca, oreja), mechones y brillo en el pelo, pliegues y borde iluminado en la ropa, cinturón con hebilla,
  manga corta, rodilleras de luz y suela de las zapatillas; el fondo de la calle se pixela con el doble de detalle.
  El sprite se ensancha o estrecha según la talla del personaje (barriga en los gordos).
- **Siete tallas de cuerpo**: súper delgado, extra delgado, normal, atlético, gordo, extra gordo y súper gordo (más
  mayores y adolescentes). Los peatones salen con un reparto de todas ellas.

## 0.47.0 — 2026-10-06 — Agente revisor de jugabilidad y cuerpos variados
- **Cuerpos variados (versión propia)**: sobre el cuerpo «superhéroe» de Quaternius, cuatro formas propias mezclables
  —normal (menos músculo), relleno/barrigón, adolescente y mayor—; los peatones salen con un reparto de cuerpos
  y alturas (había un fallo que anulaba la variación de altura). Mismas animaciones.
- **Agente revisor** (`tests/agente_revisor.py`): tras cada versión recorre en coche, a pie y con rayos de
  superficie las zonas nuevas, todas las vías de riesgo (enlaces de autopista, puentes, túneles, rampas) y un lote
  rotatorio del resto del mapa. Escribe el informe mientras avanza (`reportes/`, con capturas y coordenadas) y lo
  compara con el anterior: avisos nuevos, que siguen y arreglados.
- **Aeropuerto**: el puente que se quedaba en el aire (X −3303, Z −143) ahora baja a nivel: la rampa se ajusta al
  largo de vía disponible y sigue por la esquina si hace falta.
- **Aceras**: ya no son una losa entera bajo la calzada sino dos franjas a los lados; se acaba el «suelo» de acera
  que asomaba sobre el asfalto (p. ej. X −2933, Z −43).
- Arreglos de la primera tanda del agente:
  - Las franjas de acera se cortan donde entran en otra calzada (bocas de cruce, enlaces): no más acera cruzando
    la carretera.
  - El asfalto ya no deja asomar el terreno por dentro en zonas de relieve irregular (aeropuerto): la cinta se
    levanta lo justo sobre los «bultos» del terreno entre sus bordes.
  - Pretiles de puentes y rampas: no se ponen dentro de la calzada de un enlace que se une a ellos.
  - Las calles que se unen a una rampa o puente elevado en uno de sus nudos suben a su encuentro (antes se quedaban
    a nivel bajo el tablero: «coche que vuela» y «tablero flotando»).
  - 27 edificios pequeños atravesados por una calle (marquesinas mapeadas como edificio, sobre todo en el
    aeropuerto) se quitan, y 28 caminos sin salida que entraban en un edificio se cortan en la pared.
- El agente distingue ahora «edificio sobre la vía», mide la superficie respecto al asfalto realmente dibujado (menos
  falsos avisos), da más tiempo a las vías largas y permite recomprobar solo unas vías (`--vias`, `--pruebas`).

## 0.46.0 — 2026-10-06 — Vuelven dos zonas del mapa
- Se recuperan las zonas marcadas por Jonay que se habían quitado: al suroeste, de Guajara / San Felipe / San
  Bartolomé de Geneto hasta El Coromoto (X −1200…158, Z 1376…2810); al noreste, la franja al este de San Roque y La
  Verdellada (hasta una línea escalonada X 781/1300/1805). Siguen fuera Los Baldíos, La Vega y el monte de Valle
  Tabares / Las Mercedes.

## 0.45.0 — 2026-10-05 — Finca España, Chimisay y La Pirámide
- **Finca España**: pabellón del Complejo Deportivo Islas Canarias junto al campo (hormigón gris, cubierta blanca
  a un agua que vuela sobre la esquina, franja de cristal verde agua y lamas oscuras, pilares morados y rótulo).
  Los bloques de C. Tacoronte (zona del colega) en tonos arena y salmón.
- **San Miguel de Chimisay / El Cardonal**: el barrio, vacío en OSM, se llena con unas 600 casas y bloques a lo
  largo de sus calles (alrededor de la casa del hermano).
- **Edificio La Pirámide** (Campus de Guajara): pirámide escalonada de cristal y hormigón.
- Los rellenos de barrios ignoran los usos «residencial/césped/matorral» de OSM (antes bloqueaban el relleno).

## 0.44.0 — 2026-10-05 — Aeropuerto de Los Rodeos
- **Aeropuerto Tenerife Norte** al oeste, con datos reales de OpenStreetMap: pista 12/30 de 3,4 km × 45 m con
  marcas (eje, bordes, «piano» de umbral, zona de toma y números 12 y 30), calles de rodaje con su línea amarilla,
  plataformas de hormigón, terminal (piedra clara, doble banda acristalada, marquesina volada sobre pilares con
  banda verde y rótulo «TENERIFE NORTE · CIUDAD DE LA LAGUNA»), torre de control, hangares y 17 turbohélices de la
  aerolínea parodia «Guanchavía» en sus puestos, con el morro hacia la terminal.
- **Mapa ampliado** hacia el oeste en un corredor (Z −450 a 1400) con relieve real (Copernicus DEM, rejilla de 32 m
  fundida con la anterior) y las calles, casas y fincas de la zona: Camino San Lázaro, Calle Aviación, TF-5,
  Carretera General del Norte, Guamasa / El Portezuelo… (+1275 edificios, +815 vías). Hay ruta en coche desde el
  inicio hasta la terminal (≈2,8 km).
- Minimapa a escala 0,45 para que el mapa grande siga siendo ligero.

## 0.43.0 — 2026-10-05 — Túneles, parking del Cristo, Sastrón primero y arreglos
- **Historia**: Sastrón te pone a prueba con la pelea en cuanto le conoces; al ganarle pide la pasta y te ofrece la
  carrera del Canarión (opcional y recomendada) o reunirla peleando por la calle. Las partidas guardadas antiguas se
  adaptan solas.
- **Túneles y pasos inferiores**: más hondos (7,2–8,4 m), tubos y bocas más anchos y altos (6 m); el techo solo se
  construye donde queda bajo tierra (antes asomaba como una losa blanca cruzando la carretera, p. ej. en la
  estación de guaguas). Los primeros 0,5 m de cada rampa quedan a nivel: ya no te hundes en el asfalto al llegar a un
  cruce (Alcampito, TF-5 y 42 sitios más; auditoría a 0).
- **Estación de guaguas**: andenes, guaguas y rótulos ya no se colocan sobre la autopista hundida.
- **Parking de la Plaza del Cristo**: 1,1 m más hondo, sala de 3,4 m de alto, rampas más largas y anchas con boca de
  3,9 m (los coches ya no rozan el techo), paredes del fondo que los coches no atraviesan, y las escaleras de salida
  sin coches aparcados que las taponaban (columnas y coches solo cuentan a la altura del suelo del parking).
- **Pistola**: los dedos parten cada fotograma de su postura de reposo (al apuntar la mano ya no gira sin parar) y el
  primer disparo no congela el juego (la luz del fogonazo existe desde el principio y no obliga a recompilar).

## 0.42.0 — 2026-10-05 — Peleas tipo Street Fighter, controles configurables, menú ancho y terreno
- **Pelea 2D**: mantener atrás anda hacia atrás; solo se cubre si el rival está atacando (golpe en preparación o
  activo, o bola de gofio que viene). Luchadores un 20 % más pequeños (sprites e impactos) y más separados al
  empezar (≈190 px) para poder lanzar especiales a distancia.
- Tutorial de pelea con textos cortos que se reparten en dos líneas y cartel de controles reducido.
- **Pantalla de CONTROLES** (menú principal y pausa): cada acción conserva sus teclas y se le puede añadir otra;
  se guarda en el navegador.
- **Menú principal** al 75 % del ancho en PC, botones en una fila y botón Achamán legible (texto oscuro sobre ámbar).
- **Terreno**: en 42 zonas (306 puntos) el personaje y los coches se hundían unos centímetros porque el final poco
  profundo de una trinchera quedaba por debajo del suelo sin hueco; ahora se pisa el terreno
  (`tests/audit_hundimiento.py` da 0).

## 0.41.0 — 2026-10-05 — Límites del mundo, ambiente sonoro, pistola y Mercadona
- **Límites del mundo**: a 50 m del borde aparece «Saliendo del mundo»; si sigues, vuelves 100 m hacia dentro, sobre una
  calle (nunca encima de un edificio), a pie o en coche y mirando hacia dentro.
- **Zonas quitadas** (no se cargan ni se dibujan): el monte del noreste (Valle Tabares, Valle Vinagre, Los Valles) y el
  campo del suroeste (Los Baldíos, La Vega, Geneto). ~950 edificios, 460 calles y 550 tramos de tráfico menos.
- **Ambiente sonoro**: pájaros de varias especies en los árboles (más de día), motor de los coches cercanos con su
  posición, gente charlando (y riendo) cuando hay grupos, campanas de La Concepción y la Catedral a las horas y a la
  media, perros y gaviotas a lo lejos. Todo con estéreo según la cámara.
- **Pasos** bastante más suaves.
- **Pistola**: la empuñadura queda dentro del puño cerrado en cada fotograma (antes bailaba 4–7 cm al andar) y el
  pulgar la abraza.
- **Mercadona** (Merca Mona): la entrada principal da a Marqués de Celada (n.º 55), con el hueco oscuro, el rótulo,
  el balcón corrido con barandilla y la esquina curva.
- **Lucas Vega / Callejón Montaraz**: el solar vacío se llena de casas (45) como en la realidad.

## 0.40.0 — 2026-10-05 — Esquina de inicio y Calle Marqués de Celada
- Las manzanas que OSM dibuja como un único bloque de 4–5 plantas alrededor del inicio (Marqués de Celada, Adelantado,
  Teobaldo Power, Carretas) se parten en casas de 1–4 plantas con colores canarios, tejados de teja y patio dentro.
- Edificio amarillo de Teobaldo Power: amarillo ocre, zócalo de piedra, tejado a cuatro aguas y balcones con barandilla.
- En la esquina: casa baja beige y medianera rosa, edificio crema con balcones de madera, casa roja canaria con
  esquinas de basalto y casa blanca encalada con remate de teja; isleta con señales «Vía de Ronda / Punta del Hidalgo»,
  prohibido, STOP y «20»; bolardos y contenedores.
- Locales en la subida de Marqués de Celada (pizzería, ferretería, bares, panadería, frutería, farmacia, peluquería…).
- El Mercadona de Teobaldo Power (sin nombre en OSM) aparece como «Merca Mona» con su rótulo: cualquier edificio sin
  nombre que contenga una tienda de marca toma su nombre.

## 0.39.0 — 2026-10-02 — La Concepción rehecha
- Torre en su sitio real: el bloque cuadrado que sobresale del plano OSM en el flanco norte (~X −529, Z −346). Ya no
  hay paredes de la iglesia donde está la torre.
- Torre nueva (~31 m): cantería de basalto oscuro, 4 cuerpos con cornisas, pilastras en las esquinas, ventanas con
  balconcitos de hierro, reloj en tres caras, campanario con dos arcos por lado y campanas, linterna octogonal con
  arcos, cupulín y cruz; galería canaria de madera y verja con plantas al pie.
- Iglesia nueva: muros encalados con zócalo de basalto, alero de dos hileras de teja, nave central elevada con
  óculos, ventanales de medio punto con vidrieras y marco de piedra rojiza, portada barroca de piedra con frontón
  partido y escudo + arco ciego junto a la torre, segunda portada lateral, y cabecera alta blanca con pilastras de
  basalto y dos filas de ventanas.
- Boca Papa y el círculo de sus misiones, fuera de la verja de la torre y alcanzables.
- Casa del hermano en Av. San Miguel de Chimisay / Av. El Cardonal (no estaba en OSM): casa blanca de 2 plantas con
  torreta en la azotea, puerta gris, ventanas con marco negro y muro blanco.

## 0.38.0 — 2026-10-02 — Coches en pendientes laterales, peleas más justas y coordenadas
- Los coches se inclinan bien en calles con pendiente lateral (el alabeo estaba al revés: un lado flotaba).
- Coches: aceleran un 15 % menos (misma velocidad punta) y la dirección es un poco más suave.
- Peleas 2D: la CPU pega un 25 % menos, prepara los golpes 1,6× más despacio y ataca algo menos.
- Círculo de inicio de las misiones de Boca Papa en un sitio despejado (no pegado a la torre ni al árbol).
- Coordenadas X/Z encima del minimapa y del cursor/destino en el mapa grande.

## 0.37.0 — 2026-10-02 — Pasos sincronizados y con mejor sonido
- Los pasos suenan justo cuando el pie toca el suelo: se detecta el apoyo real de cada pie en la animación (andar, trotar, esprintar).
- Sonido nuevo: talón + punta, con resonancias de suela y suelo, arenilla y roce; 6 variantes por suelo para que no se repita.
- Suelos distintos: asfalto, adoquín/losa del casco, baldosa en interiores, césped/tierra y chapa.
- Eco en túneles y parkings, y algo de sala en interiores. El aterrizaje de un salto usa los dos pies.
- Documentación técnica en una sola página para leer en local (`Documentación técnica.html`).

## 0.36.0 — 2026-10-02 — Guardar y cargar partida, repositorio y documentación
- Guardado y carga de partida: 3 ranuras manuales + automática (al superar misión, cada 3 min y al cerrar), exportar/importar `.json`.
- Repositorio git con el código fuente, los datos, las pruebas y la documentación técnica (`docs/`).
- Scripts de publicación automática a GitHub (`scripts/`).

## 0.35.0 — 2026-10-01 — Reaparición robusta al morir
- La reaparición tras morir (también dentro de un coche destrozado) nunca se queda bloqueada; vigilante de 6 s.

## 0.34.0 — Mapa con carreteras en azul
- Carreteras del mapa y minimapa en tonos azules; el amarillo y el rosa quedan solo para rutas de misión / GPS.

## 0.33.0 — Rap en inglés en la radio
## 0.32.0 — Voces rapeando en la radio
## 0.31.0 — Días largos y noches cortas (día 30 min, noche 8 min)
## 0.30.0 — Efectos de sonido (pasos, salto, caída) y radio hip hop procedural con estribillo de misión
## 0.29.0 — Plazas y parques (Adelantado, Camino Largo, Parque de la Constitución y genéricos)
## 0.28.0 — Repaso de carreteras: puentes, túneles, cruces, medianas y separación de calzadas
## 0.27.0 — Icono del juego
## 0.26.0 — Policía a pie que dispara (4+ estrellas), cambio de arma, GPS peatonal, arreglos varios
## 0.25.0 — Controles en las primeras peleas y textura real de enlucido en fachadas
## ≤ 0.24 — Versiones anteriores (mundo, misiones de la historia, peleas 2D, modo Achamán, armas, parkings…)
