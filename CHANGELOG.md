# Historial de versiones

El formato es: `## versión — fecha — título`, seguido de los cambios. El script de publicación usa
el título de la entrada más reciente como mensaje del commit.

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
