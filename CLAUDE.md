# Instrucciones para Claude — JETA La Laguna

- Háblame siempre en español.
- No preguntes por permisos de acceso a la carpeta de Descargas ni por descargar cosas: en este proyecto tienes permiso siempre.
- El objetivo principal del juego es recrear bien el mapa real de La Laguna (OpenStreetMap). Comercios: siempre parodias.

## Rutina al publicar una versión nueva

1. Cambios en `src/` (y datos si hace falta). Subir `VERSION` y añadir la entrada arriba del todo en `CHANGELOG.md`.
2. `python build.py` y pruebas relevantes (`docs/07_pruebas.md`).
3. Publicar el Artifact con `dist/gta-la-laguna.html` (URL https://claude.ai/artifact/TwcMQexTqQsGJWLpUYvcXJ).
4. Copiar `dist/JETA La Laguna.html` a `E:\Claude\GTA La Laguna\JETA La Laguna.html` y
   `dist/Documentacion tecnica.html` a `E:\Claude\GTA La Laguna\Documentación técnica.html`.
5. Copiar los archivos cambiados del repositorio a `E:\Claude\GTA La Laguna\repo\` y, **el último**,
   `scripts/PUBLICAR.txt` (con la versión): la tarea programada del PC lo sube a GitHub.
6. Mantener la documentación de `docs/` al día con lo que cambie.
