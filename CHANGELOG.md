# Historial de versiones

El formato es: `## versión — fecha — título`, seguido de los cambios. El script de publicación usa
el título de la entrada más reciente como mensaje del commit.

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
