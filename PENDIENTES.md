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

- [~] ● v0.98.0 (las dos fases nuevas, Gollux, gorgonas, ratas, lobo y Guayota = Demon Overlord, en el juego; licencias: todos gratuitos de itch.io, Jonay 27-oct; falta usar los Mythic Monsters) **Guanche Guarriors: más fases, enemigos y jefes con los packs nuevos** (Jonay, 27-oct; página «Guanche
  Guarriors: personajes nuevos»): carpetas nuevas en `assets_externos`.
  - Guayota, jefe final, basado en **Demon Overlord 2D Pixel Art** (el del hacha pasa a jefe intermedio).
  - Una fase con las **gorgonas** (craftpix), sin la parte de arriba como La Mirladora (hecho en la propuesta).
  - Otra fase con **Gollux** de jefe. La **rata** para cuevas. **Free Mythic Monsters**: retratos quietos de frente,
    solo valen como jefes que flotan/aparecen.
  - **Perros → el lobo del GIF** que pasó Jonay (sacado fotograma a fotograma: parado, correr, morder, morir, aullar;
    `tools/sprites_ext/wolf.py`). Falta confirmar de qué pack es y su licencia, y pulir el fondo entre las patas.
  - Licencias por mirar: Gollux, RAt, Free Mythic Monsters.
- [ ] ● **Fondos de Guanche Guarriors y de Bencomo a partir de fotos reales** (Jonay, 27-oct): fotos de referencia de
  cada zona pasadas a pixel art, en capas de paralaje y con algo de movimiento (nubes, olas, cascada, niebla).
  - Fotos ya recibidas en `docs/referencias/fondos_guanche/`: `taoro_2-3` (valle de La Orotava, sin casas),
    `anaga_1-2`, `barranco_1-2` (la cascada), `gigantes_1-3`, `malpais_1-3`, `canadas_1` (= `taoro_1`, el Teide desde
    Las Cañadas), `echeyde_1-3` (Cueva del Viento).
  - Bencomo (`docs/referencias/fondos_bencomo/`): `anaza_1` (costa de callaos); Acentejo y el claro, con las de
    barranco y Anaga.
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

- [ ] ● **Baloncesto con el kit de personajes de GandalfHardcore** (Jonay, 27-oct, pregunta): diseñar camisetas de
  tirantes por capas y hacer nosotros los combos de mates con las mismas piezas.

### Gráficos de los minijuegos

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

### Misiones, historia y economía

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

### Tiendas y edificios del casco

- [~] ◐ v0.76.0 (4 jugueterías con icono y compra con E: rifle y bolitas; falta recrear su fachada/escaparate o interior) **Jugueterías** (Jonay, 12-oct): recrear varias (mejor las que ya hay en el mapa); allí se compran **bolitas** para
      la pistola y otras armas: **escopeta de agua** (chorros de agua; se recarga en **fuentes** repartidas por la ciudad;
      necesaria en misiones como el incendio del Obispado). Por ahora no hay más armas.
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

- [ ] ◐ **Para mirar** (visto en las fotos de la 0.77, ya estaba antes): en la Plaza del Adelantado y en el casco hay **marcos
      grises flotando** sobre las fachadas (vigas horizontales a la altura del tejado y algún poste suelto), en
      X 105 Z −45 mirando a la plaza y en X −60 Z −230 mirando a X −10 Z −150. ¿Soportales/pérgolas mal colocados?
  - v0.85.1: fotografiados (`tests/shots/v0851_marcos_*.jpg`, `prueba_0851.py`). Se ven vigas grises largas a unos
    8–12 m, en polilínea sobre las plazas, y en una foto dos postes con un frontón. No son calles elevadas (ninguna vía
    sube más de 2 m allí) ni objetos sueltos: están dentro de las piezas juntadas de la ciudad. Siguiente paso: sacar
    las fotos sin juntar (`?revisor=1`) ocultando cada material, para saber qué código las dibuja.
- [~] ◐ v0.78.0 (tramos elevados que bajan a la calle donde acaban: Travesía Andenes/Av. Ghandi X 820 Z 3494 y Vía de Ronda X 377 Z −268; rampa X −495 Z 683 de 1,2 m a 0,4 m; queda la **rampa del HUC X 2210 Z 3312**: la boca de la rampa empieza 2 m honda justo donde la cruza la calle de servicio, y el coche cae dentro: hay que acortar la rampa o mover el cruce) v0.55.0 **Uniones de túneles y puentes con la vía normal** (hecho: Vallado y boca de la Vía de Ronda) (Jonay, 7-oct): salida del túnel de Camino el Vallado
      (X −942 Z 86 / X −928 Z 64): la losa de arriba se superpone a la salida y no deja salir, y por las paredes
      laterales se ve a través (no debería verse el exterior a través de las paredes del túnel). Vía de Ronda
      (X 388 Z 1499): en la boca confluyen calles y los coches se hunden/chocan. Revisar todas las uniones.
- [~] ◐ v0.78.0 (repasado con fotos de glorietas, enlaces y la Autopista del Norte: las rayas en las entradas de las glorietas son las de ceda el paso, están bien; no se ve nada cruzado) v0.73.0 (ramales de un sentido sin línea central) v0.70.0 (sin líneas donde una calle está dentro de otra: cruces, incorporaciones, glorietas; mirar las fotos `faciles_*`) **Marcas viales** (apunte de Jonay): con los puentes y cruces hay líneas que se cruzan por todas partes; también
      en salidas e incorporaciones (autopista, Vía de Ronda) y en las glorietas.
- [~] ◐ v0.78.0 (marquesina grande de la terminal sobre el carril de dejar pasajeros) v0.72.0 (rotonda-cúpula, depósitos, naves con carteles, P, valla y aviones despegando/aterrizando hechos; mirar fotos `grandes_aeropuerto_*`) Aeropuerto: afinar con las fotos (rotonda-cúpula, depósitos de combustible, naves SEUR/ITV/Binter, P de
      parking con rótulos, valla perimetral) y aviones despegando/aterrizando de vez en cuando.
- [~] ● v0.78.0 (comparado: la TF-5 pasa **a nivel** bajo el puente de Cam. San Lázaro; en la realidad va en trinchera: hundirla es un cambio grande, por decidir) Repasar con las fotos del aeropuerto la zona ya hecha alrededor (San Benito, El Coromoto, autopista TF-5). v0.72.0: visto en las fotos que la TF-5 pasa en trinchera bajo la Rotonda Sempiterno y bajo el puente de Cam. San Lázaro; queda por comparar en el juego.
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


### Árboles y vegetación

- [ ] ● **Árboles con más detalle y varios modelos** (Jonay, 19-oct, «no para ya»). Muchas copas son un círculo feo. Fotos
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

- [ ] ◐ **Pintar ~30 ms desde la 0.89** (auditorías 0.90 y 0.92; repetida en 0.93–0.95.1: 30,9 · 31,3 · 32,8 · 29,6 ·
  29,7 ms): se queda ahí; los ~21 ms de alguna pasada eran la medida rara. Buscar qué lo subió en la 0.89.
- [ ] ◐ **Partir funciones largas** (auditoría 0.90): `09ea_minijuegos.js` bajó de B a C (el público en una función
  larga); `09eb_pixbasket.js` y `09ma_pixguanche.js` salen con D (el dibujante de la propuesta, copiado tal cual).
- [~] ◐ v0.90.0 (el fuego comparte el cilindro) **Auditoría 0.76.0**: queda `12k_agua.js` con nota D (las misiones en funciones muy largas: partirlas).
- [ ] ◐ **Auditoría 0.75.0** (APTO CON AVISOS; pintar 49,9 → 45,5 ms, arranque 14,1 → 13,7 s, memoria igual, sin fugas):
      bajan de nota `12h_diario.js` (A → B; repasado en v0.90) y `12j_campos.js` (B → C, por la Copa Laguna: funciones largas). Queda el de los campos.
- [~] ◐ v0.69.0 (recorte general: de los 515 edificios en calzada quedan los que cortan la calle entera o perderían más del 40 %) **Auditoría v0.59.0** (APTO CON AVISOS; memoria 505 → 531 MB y vértices +5 % por las zonas nuevas, sin fugas):
      **76 edificios nuevos invadiendo la calzada** en La Cuesta/Taco (p. ej. Ctra. Gral. La Cuesta-Taco X 2839 Z 2244,
      Ctra. de Valle Tabares X 2502 Z 1648). Lista en `docs/auditorias/mapa_v0.59.0/mapa.md`. Total del mapa: 527.
- [~] ◐ v0.69.0 (ver la 0.59) **Auditoría v0.58.2** (Corrector, APTO; no tocar hasta que Jonay lo diga): el auditor detecta ahora **edificios que
      invaden la calzada**: 452 posibles (6 cortan la calle, 54 en calles principales), lista con capturas en
      `docs/auditorias/mapa_v0.58.2/mapa.md`. Revisar primero los 6 que cortan la calle y los 54 de calles principales
      (confirmados: C. Barcelona X −15 Z 217, Av. de los Menceyes X 298 Z 899). Siguen P1.5 y P2.1/P2.2/P2.5.
- [~] ● v0.77.0 **Punto 17, rendimiento (auditorías viejas)**. Hecho: piezas sueltas juntadas por material y celda, recorte
      por distancia según la niebla (detalle solo de cerca, copas lejanas simples), árboles/farolas/señales por celda,
      coches aparcados instanciados, plazas 3,2 s → 0,4 s, lint en el build. Medido (sonda, vista de calle): llamadas
      ~5.600 → ~1.900, triángulos 5,1 M → 3,5 M; carga ~11,2 → ~7,6 s. **Auditoría 0.77.0** (APTO CON AVISOS, vs 0.76):
      pintar 47,8 → 29,8 ms, arranque 13,2 → 8,4 s, geometría en RAM 38 → 36 MB, memoria JS 214 → 228 MB (+6 %: los
      ~4.000 objetos de las celdas instanciadas), triángulos 5,45 M → 4,0 M, **llamadas 624 → 811** en la vista del
      auditor (los aparcados van por modelo: ~45 modelos por celda de 800 m; si molesta, usar menos modelos para los
      aparcados o celdas más grandes). Primer intento NO APTO (+17 % memoria) por guardar las piezas originales
      también en el auditor y no liberar los vértices juntados: arreglado. **Queda / por decidir**:
      - Quedan ~4.500 piezas sin juntar: las de **grupos con nombre** (iglesias, aeropuerto, estadio, «inicio»: ~3.400)
        porque el código las puede buscar por nombre; se pueden juntar dentro de su grupo (seguro: el grupo se sigue
        moviendo/ocultando) → otras ~1.000 llamadas menos. Y **personas de decorado** (no se juntan para que se animen).
      - El **terreno** es una sola malla de ~400.000 triángulos (se pinta casi entero siempre): partirlo por trozos con
        menos detalle lejos.
      - **Precalcular la ciudad al compilar** (P2.1): lo que más tarda ahora es calles (1,1 s), edificios (1,1 s), unir
        geometría (0,8 s) y sombreadores (0,7 s). Ganaría ~2–3 s pero es un cambio grande (portar la generación a
        `build.py` o guardar la geometría en binario); mejor cuando lo demás esté quieto.
      - **Modelos en binario** (P2.2): coches y personas ya lo están (Int16 en base64); `data.json` (mapa, ~3 MB) sigue en
        JSON: se podría cuantizar.
      - **Módulos** (P2.5): el juego se publica como un único archivo HTML, así que los `src/*.js` se juntan en uno; partirlo
        en módulos ES no cambia nada para el jugador y el riesgo principal (nombres repetidos o sin declarar) ya lo pilla
        el lint. Se deja así salvo que Jonay quiera.
- [ ] ● **Auditoría v0.55.0** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.55.0.md`, APTO; no tocar hasta que Jonay lo diga):
  - [x] v0.57.0 **P1.8** Al cambiar el tiempo, liberar los mapas de entorno de los otros tipos (`ENVC` en `13_main.js` crece
        sin límite, hasta 48). Pocas líneas.
  - [x] v0.57.0 (medido: −41 MB de memoria JS, −40 MB de geometría; no los 250 MB estimados) **P1.7** Liberar también las posiciones de la ciudad tras subirlas a la GPU (~250 MB), conservándolas solo
        cuando se ejecuta el agente revisor (p. ej. `?revisor=1`).
  - [x] v0.77.0 **P1.5** Mallas sueltas → juntadas por material/celda e instanciadas por celda; recorte por distancia (ver arriba).
  - [~] **P2.1 / P2.2 / P2.5** v0.77.0: lint hecho; coches y personas ya en binario; precalcular la ciudad, `data.json` binario y módulos: ver arriba.
- [ ] ● **Auditoría de código v0.49** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.49.0.md`, APTO CON AVISOS) — por decidir con Jonay:
      ~~P0.a coches de tráfico fuera del pool sin liberar + luces/cascos por coche~~ (hecha en v0.52); ~~P0.b rótulos canvas sin caché~~ (ya cacheados con `sharedText`, comprobado en v0.57);
      aparcados en InstancedMesh; P1.5 mallas sueltas/LOD; mapas de reflejos en segundo plano; P2.1/P2.2/P2.5.
- [~] ● v0.49.0 hechas P0.1–P0.3, P1.1–P1.4, P1.6, P2.3, P2.4. Quedan P1.5 (fusionar mallas sueltas, LOD), P2.1, P2.2, P2.5.
      **Auditoría de código v0.46** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.46.0.md`) — por decidir con Jonay:
      - P0.1 Geometría de la ciudad ≈1 GB en RAM: quitar normales (flatShading), color en Uint8, liberar arrays tras
        subir a GPU, construir con Float32Array.
      - P0.2 Fuga de peatones/coches/policías (makeHuman/Car sin dispose): pool precargado y geometrías compartidas.
      - P0.3 Pistolas, balizas y latas creadas en caliente: crearlas una vez.
      - P1.1–P1.4 HUD tocando el DOM cada fotograma, minimapa a 60 Hz, basura por fotograma, búsquedas lineales.
      - P1.5 12.000 mallas sueltas / 5,4 M triángulos: fusionar e instanciar, LOD por trozo.
      - P1.6 PMREM regenerado al cambiar la hora: precalcular 6–8.
      - P2.1–P2.5 Precalcular geometría en build.py, datos binarios, juego offline (Three.js y fuentes incrustadas),
        compileAsync, calidad de código (módulos, Prettier/ESLint), referencias PNG fuera del repo, prueba de rendimiento.

### Móvil

- [ ] ◐ **Móvil: acceso a todo** (Jonay): desde el móvil no se llega a las opciones (y revisar que todo lo que se hace con
      teclado —pausa, opciones, guardar, radio, armas, mapa…— tenga un botón o gesto táctil).

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

### Extras para el final

- [ ] ● **DLC Santa Cruz** (Jonay, 12-oct): se une por el sur a partir del final del mapa actual; carga aparte, con aviso,
      para no hacer una sola carga enorme (`descargar_zona.ps1` + `merge_zona.py` ya sirven para bajar la zona).
- [ ] ● **DLC norte** (Jonay, 12-oct): la bajada por Tegueste hasta Tejina, Bajamar y Punta del Hidalgo; también carga
      aparte.
- [ ] ● **Música «real»** para la radio (hip hop / rap de finales de los 90 y principios de los 2000). Jonay: «ni lo
      consideres, es un extra final».

## Hecho

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
