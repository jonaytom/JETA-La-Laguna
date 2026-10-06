# Historial de versiones

El formato es: `## versión — fecha — título`, seguido de los cambios. El script de publicación usa
el título de la entrada más reciente como mensaje del commit.

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
