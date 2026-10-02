# 8. Versiones y publicación en GitHub

## Flujo

```
Claude (nube)                                 Tu PC (E:\Claude\GTA La Laguna\repo)            GitHub
─────────────                                 ─────────────────────────────────────            ──────
1. cambia src/…, sube VERSION, añade
   entrada en CHANGELOG.md
2. python build.py  (+ pruebas)
3. copia a tu carpeta los archivos
   cambiados y, el último,
   scripts/PUBLICAR.txt          ───────────▶  4. la tarea programada (cada 10 min)
                                                  ve PUBLICAR.txt y ejecuta
                                                  scripts/publicar.ps1:
                                                  git add / commit "vX.Y.Z - título"
                                                  / tag vX.Y.Z / push           ───────────▶  repositorio
```

- `PUBLICAR.txt` hace de «semáforo»: se escribe **después** de todos los demás archivos, así nunca se sube una
  versión a medio copiar. El script lo borra al publicar.
- El mensaje del commit sale de `VERSION` y del título de la primera entrada de `CHANGELOG.md`; cada versión
  queda además marcada con una etiqueta `vX.Y.Z`.
- El registro de lo publicado (y de los errores) queda en `scripts/publicar.log` (no se sube).

## Puesta en marcha (una sola vez)

1. Instala **Git for Windows**: <https://git-scm.com/download/win> (opciones por defecto; incluye el
   *Git Credential Manager*, que guarda tu sesión de GitHub de forma segura).
2. En GitHub crea un repositorio **vacío** (sin README) en <https://github.com/new>, por ejemplo
   `jeta-la-laguna`, privado.
3. Ejecuta `scripts\configurar_github.bat` (doble clic) y pega la dirección del repositorio
   (`https://github.com/TU_USUARIO/jeta-la-laguna.git`). El script:
   - crea el repositorio git local (`main`), te pide nombre y email para los commits si no los tienes;
   - hace la primera subida: **la primera vez se abre el navegador para iniciar sesión en GitHub**;
   - registra la tarea programada «JETA La Laguna - publicar en GitHub» (cada 10 minutos).

Desde ese momento cada versión nueva completa que Claude deje en la carpeta se sube sola.
`scripts\publicar_ahora.bat` fuerza una subida inmediata (por ejemplo, si cambias algo tú a mano).

Para quitar la publicación automática: Programador de tareas de Windows → borrar la tarea, o en PowerShell
`Unregister-ScheduledTask -TaskName 'JETA La Laguna - publicar en GitHub'`.

## Números de versión

`MAYOR.MENOR.PARCHE`: la **MENOR** sube con cada entrega publicada (coincide con la versión del Artifact de
Claude), el **PARCHE** con arreglos pequeños sobre la misma entrega.

## Linux / macOS

`scripts/publicar.sh` hace lo mismo; prográmalo con cron (`*/10 * * * * /ruta/repo/scripts/publicar.sh`).

### Si `configurar_github.bat` no pide iniciar sesión

- Mira `scripts\configurar.log` (lo escribe siempre).
- Lo más habitual es que **no esté instalado Git for Windows**: el script lo detecta, ofrece instalarlo con `winget`
  o indica la descarga (https://git-scm.com/download/win). Tras instalarlo, vuelve a ejecutar el `.bat`.
- La sesión de GitHub la gestiona **Git Credential Manager** (viene con Git for Windows): la primera subida abre el
  navegador. Claude nunca maneja contraseñas ni tokens.
- Si GitHub rechaza la subida («rejected»), el repositorio remoto no estaba vacío.

## Documentación para leer en local

`build.py` también genera `dist/Documentacion tecnica.html` (con `tools/docs2html.py`): el README, todos los
`docs/*.md` y el historial de versiones en una sola página con índice, que funciona sin conexión. Se copia a
`E:\Claude\GTA La Laguna\Documentación técnica.html` con cada versión.
