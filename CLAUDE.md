# Instrucciones para Claude — JETA La Laguna

- Háblame siempre en español.
- **Al empezar, leer `TRASPASO.md`** (resumen de cómo se trabaja, trucos y estado; 12-nov-2026) y, para coches propios, `E:\Claude\GTA La Laguna\Blender\coche\RECETA_COCHES.md`.
- No preguntes por permisos de acceso a la carpeta de Descargas ni por descargar cosas: en este proyecto tienes permiso siempre.
- **Feedback de pruebas**: cuando Jonay comente fallos o mejoras sueltas, NO hacerlos directamente: anotarlos en
  `PENDIENTES.md` y revisarlos juntos después (así no se toca lo mismo dos veces). Solo se hace al momento lo que pida
  expresamente.
- **PENDIENTES.md va clasificado** (Jonay, 20-oct): ver «Cómo se apuntan los pendientes» más abajo.
- **Herramientas de prueba**: las que tengan algo de complejidad se guardan en `tests/` (pruebas) o
  `tests/herramientas/` (fotos, sondas; índice en `LEEME.md`) y se reutilizan; no rehacerlas en cada versión.
- El objetivo principal del juego es recrear bien el mapa real de La Laguna (OpenStreetMap). Comercios: siempre parodias.
- **Objetivo técnico (Jonay, 23-nov): llegar a WebGPU.** La three.js r187 (v1.4.43) ya trae `WebGPURenderer`; el plan
  está en PENDIENTES («Pasar el juego a WebGPU»). Lo nuevo que se haga con sombreadores, mejor que no dependa de
  `onBeforeCompile` ni de trozos de sombreador de WebGL.
- **Mapa: las calles mandan** (Jonay, 23-nov): los edificios se ajustan a las calles y no al revés: cada fachada en
  paralelo al borde de la acera (o de la calzada si no hay acera); no se quitan edificios salvo casetas; los edificios
  vecinos van pegados salvo donde el mapa tenga un hueco de verdad (si hay que separarlos, menos de lo que cabe el
  personaje); los tramos rectos de calle, rectos (sin arrugas). Plan en PENDIENTES («Las calles mandan»).
- **Cada fallo que avisa Jonay, con su regla general** (Jonay, 25-nov: «para las cosas que te voy diciendo hay que buscar
  reglas generales para ver por qué pasan y evitarlo en otras zonas… esto es importante, toma nota. No se trata de
  arreglar la zona puntual»): ante un fallo en un sitio, buscar la causa (qué regla del código lo produce), arreglar la
  regla y buscar con una sonda en todo el mapa los demás sitios donde pasa lo mismo. Arreglar solo el punto, nunca;
  si hace falta una excepción para un sitio concreto, que sea porque Jonay lo midió o lo pidió.
- **Coordenadas** (Jonay, 2-nov, v0.99.7): en pantalla, informes, PENDIENTES y mensajes se escriben **X, Y** para el plano y la
  **altura** aparte (m sobre el mar). Y es lo que el código llama `z` (y lo que los apuntes y capturas viejos llaman Z).

- **Norma (Jonay, v0.64.1): todo lo que se ejecute (pruebas, fotos, sondas, herramientas de mapa, descargas…) se
  ejecuta en el PC de Jonay**, no en la nube: así no gasta uso y el rendimiento es siempre el mismo equipo.
  **Desde la v1.4.43 (23-nov) Claude trabaja directamente en el PC** (Claude Code, app de escritorio, carpeta
  `E:\Claude\GTA La Laguna\repo`): edita los archivos del repo en su sitio y lanza él mismo el build, las pruebas, la
  auditoría y la subida (ver «Trabajador local»). Ya no hay copia en la nube ni herramientas `device_*`. Los resultados
  siguen en `reportes/pruebas/ULTIMO.md`, `cola/hecho/` y las fotos en `tests/shots/`.

- **Mensajes del auditor (Corrector de código)**: al empezar cada versión, leer
  `C:\Users\Jonay\RevisordeCodigo\PARA_EL_PROGRAMADOR.md` (lo más reciente arriba, con fecha y versión del auditor), hacer
  los puntos `[ ]` pendientes y marcarlos `[x]` en ese mismo archivo al terminarlos (contárselo a Jonay).
- **Controles de los minijuegos: siempre las mismas teclas** (pelea, baloncesto y los que vengan): botón A = `E` / clic
  izquierdo, botón B = `Espacio`, arriba = `↑`/`W`, clic derecho (o `Q`), y moverse como al andar.

- **Formato del código** (v1.1.6, Jonay pidió revisar la calidad): `src/` va formateado con Prettier (`.prettierrc.json`). Claude
  pasa el formateador a los archivos que toque antes del build (`npx --yes prettier@3 --write src/<archivo>.js`, con el
  Node del PC); los `*_data.js` y `09ecb_bk_anim.js` (datos) no se formatean.
- **Reordenar código sin cambiar el juego** (v1.1.7): antes, `pruebas huella_base` y `pruebas huella_mundo_base` con el código
  viejo (guardan la huella de los sprites y de todo lo construido, con semilla fija); después, `pruebas huella_cmp` y
  `pruebas huella_mundo_cmp` (cada una en su propia carga) tienen que salir iguales. Partir funciones:
  `tools/calidad/extraer_trozos.js` (con `node`).

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
`publicar <versión>` (escribe `PUBLICAR.txt`: siempre la última), `esperar <s>`, `zip_testers` (v1.4.13: la versión web para
Cloudflare Pages en `E:\Claude\GTA La Laguna\Cloudflare\` y su zip; Jonay la sube a mano. Ya no se hace el zip con `Jugar.bat`), `catastro` y `barreras` (v1.0.4: bajan los edificios del Catastro y los muros y vallas de OSM a `data/`) y `mover_old` (v1.0.1: mueve a `OLD-Borrar\` lo de `scripts/old_borrar.txt`; nunca borra). Si no está abierto, pedirle a Jonay que
lo abra (o que lance el `.bat` que toque).

**Desde la v1.4.43 Claude no necesita la ventana del trabajador**: ejecuta las mismas órdenes él mismo, con el mismo
informe, dejando el encargo en `cola\<id>.orden` (**no `.txt`**, para que no lo coja también la ventana si está abierta)
y lanzándolo desde `repo\`:

```
python -c "import sys; sys.path.insert(0,'tools'); import trabajador as t; t.hacer(r'cola/<id>.orden')"
```

El resultado queda igual en `cola\hecho\<id>.md`. Las tandas largas (pruebas, auditoría, publicación) se lanzan en
segundo plano y se lee el informe al terminar, sin esperas a ciegas. Para una prueba suelta:
`python tools/pruebas_locales.py <lista>` (listas en `scripts/pruebas/<lista>.txt`).

## Nombre de las versiones (Jonay, 3-nov)

El número sigue como está (`VERSION`, p. ej. 1.1.1), pero el juego está en **Alpha**: en pantalla sale «Alpha 1.1.1».
Más adelante habrá una **Beta 1.0** y luego la **Final 1.0** (lo decide Jonay); hasta entonces todo es Alpha.

## Rutina al publicar una versión nueva

1. Editar `src/` (y lo que toque) directamente en `E:\Claude\GTA La Laguna\repo\`, pasar Prettier, subir `VERSION`,
   entrada en `CHANGELOG.md`, `PENDIENTES.md` y docs al día.
2. Rellenar `scripts/PRUEBAS_LISTA.txt` (o una lista `scripts/pruebas/<lista>.txt`) con las pruebas de esta versión y
   lanzar el encargo (`cola\<id>.orden`, ver «Trabajador local»):
   `build` + `pruebas` (sin nada = `cambios version`: solo las pruebas de los archivos tocados desde la última tanda que pasó, según
   `scripts/pruebas/categorias.json` + `PRUEBAS_LISTA.txt`, con una sola carga del juego; `pruebas base` o `todas` cuando
   se toque algo general). Leer `cola\hecho\<id>.md` y `reportes\pruebas\ULTIMO.md` (y fotos de
   `tests\shots\` si hace falta). Si algo falla: arreglar y repetir.
3. Todo OK → encargo `auditar` y, **después**, `copiar_html` + `zip_testers` + `publicar <versión>` + `subir_git`
   (sube a GitHub en el momento; la tarea programada solo corre un par de veces al día). **Desde la v0.91.1 la auditoría
   va antes de publicar**: el trabajador se para si sale NO APTO, así no se sube una versión rota (la 0.91.0 se subió y
   luego salió NO APTO). El Artifact de claude.ai ya no se publica (límite de 16 MB): los testers juegan en Cloudflare
   Pages con el zip, que Jonay sube a mano.
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
