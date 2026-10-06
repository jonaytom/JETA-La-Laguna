# Instrucciones para Claude — JETA La Laguna

- Háblame siempre en español.
- No preguntes por permisos de acceso a la carpeta de Descargas ni por descargar cosas: en este proyecto tienes permiso siempre.
- **Feedback de pruebas**: cuando Jonay comente fallos o mejoras sueltas, NO hacerlos directamente: anotarlos en
  `PENDIENTES.md` y revisarlos juntos después (así no se toca lo mismo dos veces). Solo se hace al momento lo que pida
  expresamente.
- **Auditorías de código externas** (proyecto «Corrector de código»): los informes están en `docs/auditorias/`.
  Al empezar una sesión, si hay un informe que aún no figura en `PENDIENTES.md`, pasar sus tareas a una sección
  «Auditoría vX» de `PENDIENTES.md` (con su prioridad P0/P1/P2) y avisar a Jonay. No aplicar los cambios hasta que
  él lo pida; al hacer uno, tacharlo y apuntar la versión, como el resto de pendientes.
- El objetivo principal del juego es recrear bien el mapa real de La Laguna (OpenStreetMap). Comercios: siempre parodias.

## Rutina al publicar una versión nueva

1. Cambios en `src/` (y datos si hace falta). Subir `VERSION` y añadir la entrada arriba del todo en `CHANGELOG.md`.
2. `python build.py` y pruebas relevantes (`docs/07_pruebas.md`).
   **Agente revisor**: poner en `tests/zonas_revision.json` las zonas cambiadas en esta versión y ejecutar
   `python tests/agente_revisor.py` (zonas nuevas + vías de riesgo + lote de rotación del resto del mapa). Leer el
   informe (`reportes/ULTIMO.md`, con capturas): arreglar lo claro si toca esta versión y anotar el resto en
   `PENDIENTES.md`; contarle a Jonay lo nuevo, lo que sigue y lo arreglado. Copiar `reportes/` al repo del PC.
3. Publicar el Artifact con `dist/gta-la-laguna.html` (URL https://claude.ai/artifact/TwcMQexTqQsGJWLpUYvcXJ).
4. Copiar `dist/JETA La Laguna.html` a `E:\Claude\GTA La Laguna\JETA La Laguna.html` y
   `dist/Documentacion tecnica.html` a `E:\Claude\GTA La Laguna\Documentación técnica.html`.
5. Copiar los archivos cambiados del repositorio a `E:\Claude\GTA La Laguna\repo\` y, **el último**,
   `scripts/PUBLICAR.txt` (con la versión): la tarea programada del PC lo sube a GitHub.
6. Mantener la documentación de `docs/` al día con lo que cambie.
