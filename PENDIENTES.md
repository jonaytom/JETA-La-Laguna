# Pendientes (notas de feedback)

Lista de comentarios de prueba. **No se hacen al momento**: se anotan aquí y se revisan juntos para agruparlos
y no tocar lo mismo dos veces. Al hacer uno, se tacha y se apunta la versión.

## Por revisar con Jonay

- [ ] **Radio: más canciones y voces** (Jonay): cada emisora con una voz distinta (no siempre la misma), letras más
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
- [ ] **Centros de salud y hospital** (Jonay): recrearlos; al morir apareces en el centro de salud más cercano. Buscar
      su situación (OSM `amenity=clinic/hospital`, `healthcare=*`: HUC, Hospiten, centros de salud de La Laguna-
      Mercedes, Finca España, San Benito, La Cuesta, Taco, Tejina…) y fotos.
      **HUC** (fotos de Jonay en `docs/referencias/hospital_huc/`): bloque largo de ~12 plantas con bandas horizontales,
      torre cilíndrica blanca con helipuerto en voladizo (platillo) en un extremo, edificio de cristal verde (Actividades
      Ambulatorias / Hospital de Ofra) al otro, jardín con palmeras y escultura de acero, junto a la TF-5 y la Ctra.
      Gral. La Cuesta, parking HUC y la Montaña de Taco detrás.

- [~] v0.56.0 **Historia: nueva tanda de misiones** (programadas las 12; **Jonay las prueba**: anotar aquí lo que no
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

- [ ] **Mapa grande: menos textos y más legibles** (Jonay, 7-oct): de lejos solo lo importante y más rótulos según
      te acercas (niveles de zoom); repasar colores del texto para que se lea bien y no se confunda con las rutas de
      misiones (amarillo de la historia, azul de las secundarias, rojo de objetivos).
- [ ] **Mapa grande: zoom inicial** (Jonay, 7-oct): al abrirlo, más cerca y centrado en el jugador (ahora se ve casi
      todo el mapa).

- [ ] **Móvil: acceso a todo** (Jonay): desde el móvil no se llega a las opciones (y revisar que todo lo que se hace con
      teclado —pausa, opciones, guardar, radio, armas, mapa…— tenga un botón o gesto táctil).
- [x] v0.56.0 **Postura en la moto** (Jonay, captura en scooter): el personaje va «tieso como un palo», de pie entre el
      asiento y el manillar; necesita una postura sentada que encaje (piernas al reposapiés, brazos al manillar).
- [x] v0.55.0 **Aviso de la radio** (Jonay): al entrar en un coche, mostrar «cambia de emisora con Q» las primeras veces;
      cuando haya cambiado de emisora dos veces, guardarlo en la partida y no volver a mostrarlo (v0.55).

- [x] v0.54.0 **Modo móvil** (Jonay, captura): el minimapa se mezcla con las estrellas y tapa los botones ENTRAR / CORRER y
      las coordenadas. Reubicar y dimensionar HUD, minimapa, textos y botones para que sea jugable en el móvil.

- [~] v0.55.0 **Uniones de túneles y puentes con la vía normal** (hecho: Vallado y boca de la Vía de Ronda; quedan rampas de servicio X −495 Z 683 y X 2210 Z 3312, finales de tablero X 377 Z −268 y X 820 Z 3494) (Jonay, 7-oct): salida del túnel de Camino el Vallado
      (X −942 Z 86 / X −928 Z 64): la losa de arriba se superpone a la salida y no deja salir, y por las paredes
      laterales se ve a través (no debería verse el exterior a través de las paredes del túnel). Vía de Ronda
      (X 388 Z 1499): en la boca confluyen calles y los coches se hunden/chocan. Revisar todas las uniones.
- [x] v0.53.0 Escalera SE de la pasarela de La Trinidad: ahora baja en X −272 Z 709.
- [x] v0.55.0 **Pasarela de La Trinidad intransitable en algunas zonas** (Jonay, captura en X −313 Z 820, rampa hacia
      Carretera de San Miguel de Geneto): revisar dónde se queda parado el personaje.
- [x] v0.54.0 **Freno de mano** (Jonay): al accionarlo debe bloquear las ruedas traseras: frena, derrapa un poco y gira más
      cerrado, como en la realidad. Revisar cómo hacerlo y proponerlo.
- [ ] **Marcas viales** (apunte de Jonay): con los puentes y cruces hay líneas que se cruzan por todas partes; también
      en salidas e incorporaciones (autopista, Vía de Ronda) y en las glorietas.
- [ ] **Árboles y farolas sobre la vía del tranvía** (Jonay, captura en una glorieta junto al tranvía).


- [ ] Repasar con las fotos del aeropuerto la zona ya hecha alrededor (San Benito, El Coromoto, autopista TF-5).

- [ ] **TF-13 / Cam. San Bartolomé de Geneto / Urbanización Guajara** (junto a la TF-5, Museo de la Ciencia y el
      Cosmos): la zona está «fatal». Real: la TF-13 baja en trinchera con muros de piedra y pasa bajo la TF-5 por dos
      túneles de bóveda que salen a una rotonda partida; vía de servicio «C. dos Autopista Parl.», Cam. San Bartolomé
      de Geneto en curva, Urb. Guajara (chalets de tejado rojo), Plaza Drago de Antares, C. Lira / Hércules / Habaneras,
      Cam. La Hornera con el Museo de la Ciencia y el IAC. Fotos en `docs/referencias/tf13_geneto/`.

- [ ] Aeropuerto: afinar con las fotos (rotonda-cúpula, depósitos de combustible, naves SEUR/ITV/Binter, P de
      parking con rótulos, valla perimetral) y aviones despegando/aterrizando de vez en cuando.
- [~] Prueba de conducción de túneles/puentes: 3 de 97 sin terminar (v0.50; antes 10 de 111).

- [ ] **Auditoría v0.56.0** (APTO CON AVISOS; memoria y fugas igual que la 0.55, llamadas 658 → 696, triángulos
      5,50 → 5,62 M por el Ayuntamiento; no tocar hasta que Jonay lo diga): 3 avisos nuevos de geometría creada en
      `12f_story2.js`: el bigote del alcalde (l. 68-69, se crea una vez al arrancar: sin importancia) y los **bancos
      robados** de «Los bancos del Adelantado» (l. 187): se crean geometrías nuevas cada vez que se juega la misión y
      `s2Clear` las quita de la escena sin `dispose()` → compartir una geometría o liberarla al limpiar.
- [ ] **Auditoría v0.55.0** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.55.0.md`, APTO; no tocar hasta que Jonay lo diga):
  - [ ] **P1.8** Al cambiar el tiempo, liberar los mapas de entorno de los otros tipos (`ENVC` en `13_main.js` crece
        sin límite, hasta 48). Pocas líneas.
  - [ ] **P1.7** Liberar también las posiciones de la ciudad tras subirlas a la GPU (~250 MB), conservándolas solo
        cuando se ejecuta el agente revisor (p. ej. `?revisor=1`).
  - [ ] **P1.5** (sigue) Mallas sueltas (11.314) → `Acc`/`InstancedMesh`, y menos detalle en la ciudad lejana.
  - [ ] **P2.1 / P2.2 / P2.5** (siguen) Precalcular la ciudad en el build, modelos en binario, módulos + lint.
- [ ] **Auditoría de código v0.49** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.49.0.md`, APTO CON AVISOS) — por decidir con Jonay:
      ~~P0.a coches de tráfico fuera del pool sin liberar + luces/cascos por coche~~ (hecha en v0.52); P0.b rótulos canvas sin caché;
      aparcados en InstancedMesh; P1.5 mallas sueltas/LOD; mapas de reflejos en segundo plano; P2.1/P2.2/P2.5.
- [x] v0.53.0 Auditor: **APTO** (comparado con la 0.51 re-medida). Fuga 477 → 0; memoria y geometría ya no suben
      (546 → 547 MB y 387 → 386 MB): los avisos de la 0.52 eran de la forma de medir.
- [x] v0.52.0 **Auditor nuevo (v0.51, APTO CON AVISOS, comparado con v0.49)**: fuga trazada de 477 geometrías tras pasear (GPU +20
      geometrías y +5 texturas en 2 vueltas). Origen: `Car ← manageTraffic` (×304), `makeKenneyMesh ← Car` (×91),
      `pod ← makeMotoMesh ← Car` (×23): confirma la P0.a/P0.4 de los coches del tráfico. Por decidir con Jonay.
- [~] v0.49.0 hechas P0.1–P0.3, P1.1–P1.4, P1.6, P2.3, P2.4. Quedan P1.5 (fusionar mallas sueltas, LOD), P2.1, P2.2, P2.5.
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
- [ ] **Agente revisor — tandas pendientes** (`reportes/ULTIMO.md`, con capturas). Hechas: 1.ª tanda (aceras,
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
- [x] v0.47.0 (1.ª versión) **Cuerpos variados (nuestra versión)** — afinar con Jonay: morphs por código sobre el cuerpo Superhero:
      normal (menos músculo), relleno/barrigón (grados), adolescente, mayor; mezclables y con las mismas animaciones.
- [x] v0.48.0 **Lucha 2D: más resolución en el pixel art** (lo pide Jonay): sprites de los luchadores y fondo con el doble de
      píxeles (más detalle de cara, ropa y pelo; fondo con menos pixelado), manteniendo el estilo 90s.
- [ ] **Mixamo** como fuente de animaciones extra (gratis para juegos; no subir los FBX originales al repo; hay que
      retargetear a nuestro esqueleto; la descarga la hace Jonay con su cuenta de Adobe).
- [ ] **Assets de coches y motos** (consulta hecha, falta decidir): opciones CC0/CC-BY en
      `docs/referencias/assets_vehiculos.md`.

## Extras para el final

- [ ] **Música «real»** para la radio (hip hop / rap de finales de los 90 y principios de los 2000). Jonay: «ni lo
      consideres, es un extra final».

## Pendientes anteriores

- [x] v0.50.0 Túneles raros por dentro (fondo de tierra bajo el suelo) y atasco junto al túnel gemelo (X 1800, Z 3160).
- [~] Auditoría de obstáculos: 200 avisos (sube en el aeropuerto, ver arriba); conducción túneles/puentes: 3 de 97.
- [x] v0.50.0 Fusionar geometría de fuentes.

## Hecho

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
