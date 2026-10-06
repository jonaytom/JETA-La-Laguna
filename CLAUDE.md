# Instrucciones para Claude — JETA La Laguna

- Háblame siempre en español.
- No preguntes por permisos de acceso a la carpeta de Descargas ni por descargar cosas: en este proyecto tienes permiso siempre.
- **Feedback de pruebas**: cuando Jonay comente fallos o mejoras sueltas, NO hacerlos directamente: anotarlos en
  `PENDIENTES.md` y revisarlos juntos después (así no se toca lo mismo dos veces). Solo se hace al momento lo que pida
  expresamente.
- El objetivo principal del juego es recrear bien el mapa real de La Laguna (OpenStreetMap). Comercios: siempre parodias.

## Rutina al publicar una versión nueva

1. Cambios en `src/` (y datos si hace falta). Subir `VERSION` y añadir la entrada arriba del todo en `CHANGELOG.md`.
2. `python build.py` y pruebas relevantes (`docs/07_pruebas.md`).
   **Agente revisor** (`tests/agente_revisor.py`): **solo cuando Jonay lo pida** (no en cada versión). Antes, poner
   en `tests/zonas_revision.json` las zonas cambiadas; leer `reportes/ULTIMO.md` y anotar en `PENDIENTES.md`.
   **Auditor de código**: lanzar la skill `auditar-codigo` (herramientas en `C:\Users\Jonay\RevisordeCodigo\herramientas`,
   `python herramientas/auditar.py --repo <repo>`); su informe va a `docs/auditorias/` y a `RevisordeCodigo`.
   **Las mejoras de los dos auditores NO se aplican hasta que Jonay lo diga**: se anotan en `PENDIENTES.md` y se le
   resumen.
3. Publicar el Artifact con `dist/gta-la-laguna.html` (URL https://claude.ai/artifact/TwcMQexTqQsGJWLpUYvcXJ).
4. Copiar `dist/JETA La Laguna.html` a `E:\Claude\GTA La Laguna\JETA La Laguna.html` y
   `dist/Documentacion tecnica.html` a `E:\Claude\GTA La Laguna\Documentación técnica.html`.
5. Copiar los archivos cambiados del repositorio a `E:\Claude\GTA La Laguna\repo\` y, **el último**,
   `scripts/PUBLICAR.txt` (con la versión): la tarea programada del PC lo sube a GitHub.
6. Mantener la documentación de `docs/` al día con lo que cambie.
