# Instrucciones para Claude — JETA La Laguna

- Háblame siempre en español.
- No preguntes por permisos de acceso a la carpeta de Descargas ni por descargar cosas: en este proyecto tienes permiso siempre.
- **Feedback de pruebas**: cuando Jonay comente fallos o mejoras sueltas, NO hacerlos directamente: anotarlos en
  `PENDIENTES.md` y revisarlos juntos después (así no se toca lo mismo dos veces). Solo se hace al momento lo que pida
  expresamente.
- **PENDIENTES.md va clasificado** (Jonay, 20-oct): ver «Cómo se apuntan los pendientes» más abajo.
- **Herramientas de prueba**: las que tengan algo de complejidad se guardan en `tests/` (pruebas) o
  `tests/herramientas/` (fotos, sondas; índice en `LEEME.md`) y se reutilizan; no rehacerlas en cada versión.
- El objetivo principal del juego es recrear bien el mapa real de La Laguna (OpenStreetMap). Comercios: siempre parodias.

- **Norma (Jonay, v0.64.1): todo lo que se ejecute (pruebas, fotos, sondas, herramientas de mapa, descargas…) se
  ejecuta en el PC de Jonay**, no en la nube: así no gasta uso y el rendimiento es siempre el mismo equipo. Claude edita
  código, compila para el Artifact y prepara la lista (`scripts/PRUEBAS_LISTA.txt`) o un `.bat`; Jonay lo lanza y Claude
  lee los resultados (`reportes/pruebas/ULTIMO.md`, fotos en `tests/shots/`).

- **Mensajes del auditor (Corrector de código)**: al empezar cada versión, leer
  `C:\Users\Jonay\RevisordeCodigo\PARA_EL_PROGRAMADOR.md` (lo más reciente arriba, con fecha y versión del auditor), hacer
  los puntos `[ ]` pendientes y marcarlos `[x]` en ese mismo archivo al terminarlos (contárselo a Jonay).
- **Controles de los minijuegos: siempre las mismas teclas** (pelea, baloncesto y los que vengan): botón A = `E` / clic
  izquierdo, botón B = `Espacio`, arriba = `↑`/`W`, clic derecho (o `Q`), y moverse como al andar.

## Cómo se apuntan los pendientes (Jonay, 20-oct)

`PENDIENTES.md` tiene dos partes: **«Pendientes por categoría»** (lo abierto) y **«Hecho»** (lo terminado).

1. **Cada apunte nuevo entra ya clasificado**, en el momento de apuntarlo; nunca se deja suelto arriba para
   ordenarlo después.
   - Va en la categoría `###` que toque: cosas parecidas o del mismo módulo (`src/…`).
   - Si es algo muy nuevo que no encaja en ninguna, se crea una categoría nueva en el sitio que tenga sentido.
2. **Formato de cada apunte**:
   `- [ ] <velocidad> **Título corto** (Jonay, <fecha>; capturas o coordenadas X/Z si las hay): qué pasa y qué se
   quiere.` Los detalles van en subviñetas, con lo que dijo Jonay y las referencias (`docs/referencias/…`, fotos,
   archivos y funciones afectados).
3. **Velocidad**, una de tres:
   - ⚡ **rápido**: unas pocas líneas o un ajuste; cabe en una tanda corta.
   - ◐ **medio**: una versión normal (código y su prueba).
   - ● **largo**: varias versiones, un cambio grande o algo por decidir con Jonay.
4. **Dentro de cada categoría** se ordena de lo más rápido a lo más largo (⚡ → ◐ → ●). Al apuntar uno nuevo, se pone
   al final de los de su misma velocidad.
5. **Si ya hay un apunte de lo mismo**, se amplía ese, con la fecha nueva, en vez de crear otro.
6. **Hecho a medias**: `- [~] <velocidad> vX.Y.Z (lo que ya está) **Título**…`, y en el texto se deja claro qué falta.
   Se queda en su categoría.
7. **Terminado**: se cambia a `- [x] vX.Y.Z` (sin la velocidad) y se mueve al principio de «Hecho».
8. **Los avisos de las auditorías y del agente revisor** van en «Rendimiento, auditorías y código» o en «Agente
   revisor (avisos de mapa)», también con su velocidad.
9. **Cuando Jonay pida los pendientes**, se muestran siempre así: por categorías, con la velocidad delante y una
   línea por apunte.

## Trabajador local (v0.64.2)

`scripts\TRABAJADOR.bat` (ventana abierta en el PC de Jonay) ejecuta los encargos que Claude deja en
`E:\Claude\GTA La Laguna\repo\cola\<id>.txt` y escribe el resultado en `cola\hecho\<id>.md`. Solo órdenes de una lista
cerrada (`tools/trabajador.py`): `build`, `pruebas [listas…]` (sin nada = `cambios version`), `prep`, `merge_zona <zona>`, `copiar_html`,
`publicar <versión>` (escribe `PUBLICAR.txt`: siempre la última), `esperar <s>`. Si no está abierto, pedirle a Jonay que
lo abra (o que lance el `.bat` que toque). En la nube solo queda lo estrictamente necesario: editar el código (las
herramientas de edición de Claude trabajan aquí) y publicar el Artifact (se sube el `dist/gta-la-laguna.html` que
compila el PC de Jonay).

## Rutina al publicar una versión nueva

1. Editar `src/` (y lo que toque) en la copia de trabajo, subir `VERSION`, entrada en `CHANGELOG.md`, docs al día.
   Antes de editar un archivo que Jonay pueda haber cambiado, traer su versión de `E:\…\repo\`.
2. Copiar los archivos cambiados a `E:\Claude\GTA La Laguna\repo\` (`device_commit_files`), rellenar
   `scripts/PRUEBAS_LISTA.txt` con las pruebas de esta versión y dejar el encargo en `cola\`:
   `build` + `pruebas` (sin nada = `cambios version`: solo las pruebas de los archivos tocados desde la última tanda que pasó, según
   `scripts/pruebas/categorias.json` + `PRUEBAS_LISTA.txt`, con una sola carga del juego; `pruebas base` o `todas` cuando
   se toque algo general). Leer `cola\hecho\<id>.md` y `reportes\pruebas\ULTIMO.md` (y fotos de
   `tests\shots\` si hace falta). Si algo falla: arreglar y repetir.
3. Todo OK → encargo `copiar_html` + `publicar <versión>` + `subir_git` (sube a GitHub en el momento; la tarea
   programada solo corre un par de veces al día) y, **después**, `auditar`; traer `dist\gta-la-laguna.html` (`device_stage_files`) y
   publicar el Artifact (https://claude.ai/artifact/TwcMQexTqQsGJWLpUYvcXJ).
4. **Auditorías**: las pasa Jonay cuando quiere. Al empezar cada tanda, mirar en `C:\Users\Jonay\RevisordeCodigo\resultados_pc\` (antes `resultados\`)
   si hay carpetas nuevas, leer su `VEREDICTO.md`, contárselo y anotar lo nuevo en `PENDIENTES.md`. Las mejoras de los
   auditores NO se aplican hasta que Jonay lo diga. **Agente revisor**: solo cuando Jonay lo pida.
   **Al final de cada pasada** (desde v0.65, a petición de Jonay: en su PC es rápido), con las pruebas ya OK y antes de
   publicar: encargo `auditar` al trabajador, **en el mismo encargo y después de `pruebas`, nunca a la vez** (se reparten el
   PC y los tiempos salen falsos) (corre `auditar.py` en
   `C:\Users\Jonay\RevisordeCodigo\herramientas\` como `auditar_jeta.bat`: `--copiar --gpu --resultados resultados_pc` y
   `--primera` si aún no hay historial; salida 0 APTO, 1 con avisos, 2 NO APTO, 3 sin historial; compara con la anterior y
   el resultado queda ya en su sitio). Herramientas: solo las de `RevisordeCodigo\herramientas\` (las de
   `repo\tools\auditoria\` son antiguas). Veredicto (`VEREDICTO.md` de la carpeta nueva): **NO APTO** → no publicar y
   avisar; **APTO CON AVISOS** → publicar y apuntar los avisos nuevos en `PENDIENTES.md`; contarle siempre el veredicto y
   qué métricas cambian (el veredicto dice qué función crea lo que no se libera).
