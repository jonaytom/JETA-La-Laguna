# Pendientes (notas de feedback)

Lista de comentarios de prueba. **No se hacen al momento**: se anotan aquí y se revisan juntos para agruparlos
y no tocar lo mismo dos veces. Al hacer uno, se tacha y se apunta la versión.

## Por revisar con Jonay

- [ ] **Música «real»** para la radio (hip hop / rap de finales de los 90 y principios de los 2000) con alguna
      herramienta externa y las letras del juego. Solo consulta por ahora: ver opciones antes de hacer nada.

- [ ] Repasar con las fotos del aeropuerto la zona ya hecha alrededor (San Benito, El Coromoto, autopista TF-5).

- [ ] **TF-13 / Cam. San Bartolomé de Geneto / Urbanización Guajara** (junto a la TF-5, Museo de la Ciencia y el
      Cosmos): la zona está «fatal». Real: la TF-13 baja en trinchera con muros de piedra y pasa bajo la TF-5 por dos
      túneles de bóveda que salen a una rotonda partida; vía de servicio «C. dos Autopista Parl.», Cam. San Bartolomé
      de Geneto en curva, Urb. Guajara (chalets de tejado rojo), Plaza Drago de Antares, C. Lira / Hércules / Habaneras,
      Cam. La Hornera con el Museo de la Ciencia y el IAC. Fotos en `docs/referencias/tf13_geneto/`.

- [ ] Aeropuerto: afinar con las fotos (rotonda-cúpula, depósitos de combustible, naves SEUR/ITV/Binter, P de
      parking con rótulos, valla perimetral) y aviones despegando/aterrizando de vez en cuando.
- [~] Prueba de conducción de túneles/puentes: 3 de 97 sin terminar (v0.50; antes 10 de 111).

- [ ] **Auditoría de código v0.49** (`docs/auditorias/INFORME_AUDITORIA_JETA_v0.49.0.md`, APTO CON AVISOS) — por decidir con Jonay:
      P0.a coches de tráfico fuera del pool sin liberar + luces/cascos por coche; P0.b rótulos canvas sin caché;
      aparcados en InstancedMesh; P1.5 mallas sueltas/LOD; mapas de reflejos en segundo plano; P2.1/P2.2/P2.5.
- [ ] **Auditor v0.52 (APTO CON AVISOS, comparado con v0.51 re-medida)**: fuga trazada 477 → 0 (P0.a hecha). Avisos nuevos:
      memoria JS 569 → 629 MB (+11 %) y geometría en RAM 416 → 476 MB (+14 %). Por mirar: puede ser que ahora se
      guarden las piezas compartidas de todos los modelos vistos y los motoristas en el grupo de peatones.
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
      - **Andenes del tranvía sobre la calzada** (Av. de los Menceyes X 577 Z 1231 y otras 12 paradas): la calle de
        OSM pasa por encima de la mediana del tranvía; el andén queda en la calzada y el coche se atasca. Opciones:
        mover la calle, estrechar el andén o quitarlo de ese lado (por decidir).
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
