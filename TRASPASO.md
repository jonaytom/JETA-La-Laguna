# Traspaso para el programador que continúa JETA La Laguna

Resumen de **cómo se trabaja en el proyecto y de lo aprendido hasta la Alpha 1.4.12** (12-nov-2026). Va
**además** de `CLAUDE.md`, que tiene las normas de siempre, y de `PENDIENTES.md`, que es la lista de trabajo.

Para el detalle de cada versión, mira `CHANGELOG.md`. Para los coches propios, `Blender\coche\RECETA_COCHES.md`
**manda sobre lo que pone aquí**: otros chats la han ampliado (validaciones del Raul V, técnica Fable).

---

## 1. Jonay y cómo quiere que se trabaje

### Idioma y trato

- **Siempre en español**, en todo lo que vea Jonay: respuestas, mensajes intermedios, pies de foto y
  descripciones de las órdenes. Le molesta mucho que se cuele el inglés.
- Mensajes cortos. Al terminar, una o dos frases de resultado, sin repasar cada paso.
- Lenguaje llano: «calzada», «acera», «paso de rueda», nada de jerga de programación.

### El juego

- **JETA La Laguna** (antes «GTA La Laguna»): un juego tipo GTA en San Cristóbal de La Laguna (Tenerife).
  - Prioridades: calidad gráfica, que sea cómodo de jugar y fidelidad al mapa real (OpenStreetMap, Catastro,
    MDT del IGN a 5 m; GRAFCAN como cartografía).
- **Comercios, marcas y coches: siempre parodias**. Nunca un nombre ni un logo real.
  - Coches: Troceen (Citroën), Totuya (Toyota), Guanchazen (VW), JTM (BMW), Yoos (Jeep), Antonias (Mercedes),
    Fierilla (Ferrari), Piki (Kia), Seta (Seat), Pancho (Porsche), Ole (Opel), Damian (Dacia), Newton (Tesla),
    Raul (Renault).
  - Los emblemas son inventados.
- **Versiones**: el número va en `VERSION`, y en pantalla sale «Alpha X.Y.Z». La Beta 1.0 y la Final 1.0 las
  decide Jonay.
- **Coordenadas**: siempre «X, Y» en pantalla, informes y PENDIENTES; la altura va aparte. La Y de Jonay es la `z`
  del código.

### Cómo se trabaja

- **Todo lo que se ejecuta corre en su PC** (AMD RX 6600), nunca en la nube: builds, pruebas, fotos del juego,
  sondas y auditorías. En la nube solo se edita código y se preparan archivos.
- **Avisarle antes de lanzar trabajo en el trabajador**, por si tiene que reiniciarlo.
- **Feedback suelto**: si Jonay comenta fallos sueltos, no se arreglan al momento. Se apuntan en
  `PENDIENTES.md`, clasificados y con velocidad (⚡ ◐ ●; ver `CLAUDE.md`), y se hacen cuando él lo pida. Si pide
  algo expresamente, eso sí se hace al momento.
- **Zonas nuevas del mapa** (túneles, glorietas, cruces): antes de empezar, pedirle capturas de Google Maps 3D y
  Street View. Al rehacer una zona, el terreno debe seguir mejor el relieve real (MDT del IGN).
- **Recursos externos**: solo gratuitos y sin licencias de pago. Claude los recomienda y Jonay los activa.
  - Tiene permiso permanente para descargar y usar su carpeta `E:\users\Jonay\Downloads`.
- **No usa el HTML de un solo archivo.** Desde el 16-nov los testers juegan en **Cloudflare Pages**: `zip_testers`
  deja la versión web (sin `Jugar.bat` ni lanzador) en `E:\Claude\GTA La Laguna\Cloudflare\` y en
  `JETA La Laguna web v<versión>.zip`, y Jonay la sube a mano. El zip con `.bat` ya no se hace. No hace falta publicar
  la página del juego en claude.ai; esa página tenía un límite de 16 MB y por eso dejó de publicarse.
- **GitHub**: cada versión completa se sube a https://github.com/jonaytom/JETA-La-Laguna.git (orden `subir_git`).
- **Ideas suyas a futuro**: instalador para otro PC, quizá pasar a Unreal Engine, Steam a 1 € o donativos por
  PayPal, y modelos 3D propios (personas, mobiliario, casas) con Blender.

---

## 2. Dónde está todo

### En su PC

| Ruta | Qué es |
|---|---|
| `E:\Claude\GTA La Laguna\repo\` | El repositorio, con git. |
| `repo\src\` | El código: módulos `NN_nombre.js` que `build.py` junta en orden. |
| `repo\data\` | Datos: mapa, Catastro, MDT y modelos de coche (`kenney_cars.json`). |
| `repo\template.html` | La plantilla del HTML. |
| `repo\dist\` | Lo compilado: `JETA La Laguna\` en carpetas, `gta-la-laguna.html` y el zip. |
| `repo\tests\herramientas\` | Fotos y sondas del juego (índice en `LEEME.md`), con Playwright. |
| `repo\scripts\pruebas\<lista>.txt` | Listas de pruebas. |
| `repo\scripts\PRUEBAS_LISTA.txt` | Las pruebas de la versión. |
| `repo\scripts\TRABAJADOR.bat` | El trabajador. |
| `repo\cola\<id>.txt` → `cola\hecho\<id>.md` | Encargos al trabajador y su resultado. |
| `repo\reportes\pruebas\ULTIMO.md` | El último informe de pruebas. |
| `repo\tests\shots\` | Las fotos que saca el juego. |
| `C:\Users\Jonay\RevisordeCodigo\` | El auditor: `PARA_EL_PROGRAMADOR.md` se lee al empezar cada versión; los resultados van en `resultados_pc\`. |
| `E:\Claude\GTA La Laguna\Blender\coche\` | Los coches propios (sección 6). |

### En la nube

- Copia de trabajo del repo en `/home/claude/jeta-repo`. **Antes de editar, trae la versión del PC**: otros chats
  y Jonay tocan los mismos archivos.
- Prettier: `/opt/node-tools/node_modules/.bin/prettier --write` sobre los archivos de `src/` que toques. Los
  `*_data.js` y `09ecb_bk_anim.js` no se formatean.

---

## 3. Herramientas de la sesión: trucos

- **No hay `device_bash`.** Se trabaja con:
  - `device_stage_files`: trae archivos del PC a `/mnt/user-data/uploads/…`, como copia de ese momento. Tarda
    un par de segundos en aparecer: haz `sleep 2` antes de leer.
  - `device_commit_files`: escribe en el PC.
  - `device_list_dir`.
  - Blender `execute_blender_code`.
- **Para escribir en el PC, usa siempre una carpeta nueva de `/mnt/user-data/outputs/<carpeta_nueva>/`.** Si
  reenvías la misma ruta, el PC puede quedarse con la copia vieja (pasó con `c44.py`).
  - Usa `force: true` cuando sobrescribas algo que has traído antes.
- **La carpeta de subidas de la nube no se actualiza sola.** Para ver si el trabajador terminó, usa
  `device_list_dir` sobre `cola\hecho\` o trae el `.md` con `device_stage_files`.
- **Esperas**: un build tarda unos segundos; una publicación completa, de 6 a 10 minutos.
  - Mira el resultado a los 20-30 s por si falló el build. Después, cada 1-2 minutos (Jonay se quejó de las
    esperas largas a ciegas).
  - El `.txt` desaparece de `cola\` cuando el trabajador lo coge.
- **No uses Blender mientras el trabajador audita**: falsea los tiempos.
- **Imágenes que pasa Jonay**: quedan en `/root/.claude/uploads/<sesión>/xxxx-image.png`. Guárdalas enseguida
  en el PC con el nombre del modelo, porque en una sesión nueva se pierden. Las de coches van en
  `Blender\coche\fotos\<marca_modelo>_<n>.png`.
- **Contexto**: las sesiones largas se llenan, sobre todo con imágenes. Haz montajes pequeños, con varias fotos
  en una (PIL), en vez de leer muchas sueltas, y deja todo apuntado en `PENDIENTES.md` antes de cerrar.

---

## 4. Publicar una versión

1. **Preparar**:
   - edita `src/` y pasa Prettier;
   - sube `VERSION`;
   - escribe la entrada de `CHANGELOG.md` (fecha, «Alpha X.Y.Z: título», qué y por qué, citando a Jonay);
   - apunta en `PENDIENTES.md` lo hecho y lo nuevo.
2. **Copiar** los archivos al `repo\` del PC.
3. **Encargo** `cola\pubXXXX.txt`, con una orden por línea:
   `build`, `pruebas`, `pruebas <lista>`, `auditar`, `copiar_html`, `publicar X.Y.Z`, `subir_git`, `zip_testers`.
   - `pruebas` sin nada son las pruebas de los archivos tocados. Para coches, `pruebas propios144` saca la foto de
     todos los coches propios en fila.
   - La auditoría va **después** de las pruebas, en el mismo encargo y nunca a la vez.
4. **Leer el veredicto** de `cola\hecho\pubXXXX.md`:
   - **APTO** → bien.
   - **APTO CON AVISOS** → se publica igual y los avisos nuevos se apuntan en PENDIENTES. Los minijuegos que
     pasan de 0,2 a 0,4 ms suelen ser ruido de medición.
   - **NO APTO** → el trabajador se para solo; no se publica.
5. Contarle a Jonay en una o dos frases qué entra y cómo salió la auditoría.

---

## 5. El código del juego

### Texturas (versiones 1.4.1 y 1.4.2)

- `src/02_textures.js`, con texturas de Poly Haven (CC0, sin licencia de pago):
  - `stoneWorld(mat, darkOnly, amt)`: cantería y basalto.
  - `plasterWorld(mat, kind, amt, tag, tile)`: encalados y enfoscados de iglesias y casas.
  - `TEXW` es un uniforme global para comparar antes y después.
- Las usan:
  - `05y_muros.js` (`cal`);
  - `05c_churches.js` (`plasterMat`, `stoneFor`);
  - `05o_concepcion.js`;
  - `05p_casas.js`.
- **Cuidado con el número de «programas» de shader**: cada combinación nueva crea uno. En la 1.4.1 pasaron de
  67 a 75. Se arregla con uniformes en vez de `#define` y con la clave de caché `'plasterWorld'`.

### Coches en el juego

- **Modelos**: `data/kenney_cars.json` → `D['m'][nombre]`, con `bb`, `rank` y `parts`.
  - Cada pieza (`body`, `wheel-front-left`…) tiene posiciones int16 ×2000, normales int8, colores RGB565 e
    índices uint16.
  - **Desde la 1.4.9 van comprimidos**: un bloque DEFLATE por modelo (`z`, `zl`, y `np/nn/nc/ni` por pieza).
    Comprime con `tools/comprimir_coches.py`; el juego los abre con `inflateRaw()` en `src/06b_vmodels.js`, un
    descompresor propio pequeño.
  - Bajó de 5,7 a 2,6 MB. Todo modelo nuevo se mete comprimido.
- **Tabla de modelos**: `VMODELS_RAW` en `06b_vmodels.js`.
  - Formato `id|nombre|categoría|base|phys|L|W|H|peso`. Escala global `CAR_SCALE = 0.95`.
  - El **peso** decide cuánto sale en la calle: 0 = no sale.
  - Cada coche propio tiene su versión lejana `<id>L` (unos 1.150 triángulos, peso 0).
  - En el bucle de abajo se ponen `lod` (nombre de la versión lejana) y `tail` (posición de las luces de freno,
    ×CAR_SCALE).
  - El Troceen C33 tiene peso 12, alrededor del 5 % del tráfico (lo pidió Jonay).
- **Física (`phys`)**: `compact`, `sedan`, `suv`, `van`, `sport`, `truck`, `moto`, `taxi`, `police`.
  - `modelForType()` elige los aparcados por tipo. **Ojo**: si se ponen a 0 todos los antiguos de un tipo, los
    pocos propios de ese tipo salen cientos de veces aparcados (unos 400 cada uno).
- **Pintura**: `classify()` separa los vértices por color.
  - La pintura es el primer color saturado de `rank`; el cristal, el azul pálido; lo demás queda fijo.
  - El sorteo de colores del juego da las variantes de color a cualquier modelo.
- **Ruedas**: van como piezas aparte y giran. El exportador las pre-escala (x ÷0,72; y/z ×0,95/0,9) porque el
  juego las vuelve a escalar.
- **Aparcados** (`07_vehicles.js`): `InstancedMesh` por celdas de 120 m si el modelo tiene `lod` y 400 m si no.
  `updateParkedLOD` cambia a la versión lejana a más de 40 m.
- **Rendimiento**: cada coche propio son 11.000-13.700 triángulos; los de Kenney, 1.000-2.000.
  - Con 21 propios: memoria JS de unos 320-340 MB y el juego pesaba unos 15 MB.
  - Si sube más, el siguiente paso es usar la versión lejana también en el tráfico.

---

## 6. Coches propios en Blender (lo más trabajado)

### Lo que más le importa a Jonay

Grabado a fuego, de su propia boca:

1. **Clavar la silueta y TODO el frontal salvo el logo, y sobre todo las ÓPTICAS (faros), desde sus fotos de
   frente.** «La óptica de los faros es lo que más define a un coche junto con el frontal.» Un coche sin sus
   ópticas no vale.
2. **Ruedas a ras del paso de rueda**, nunca por fuera, y pasos de rueda redondos, sin dientes.
3. **Formas redondeadas** como las del real, no curvas rectas. «Se parecen demasiado todos»: cada uno tiene que
   tener su carácter.
4. **Techo del color de la carrocería**, salvo que la foto lo tenga negro.
5. **Ventanillas limpias**: nada de bordes rotos ni uniones raras con la de atrás o con el techo (pendiente en la
   1.4.11).
6. **Siempre con variantes de color.** Se le enseña antes de meterlo y solo entra si lo aprueba.
7. **Por cada coche propio que entra, sale uno antiguo** (peso 0). Se empieza por los que más salen.

### Archivos de `Blender\coche\`

| Archivo | Qué hace |
|---|---|
| `generador.py` | Define `GEN` en `bpy.app.driver_namespace`: `build(spec, 'hd'\|'juego')`, `finalize(col, nombre)`, `tris`, `Car`, `mats`, `setin`, `bsdf`. |
| `generador13.py` | Versión más nueva hecha por otro chat. Revisa cuál está al día antes de tocar. |
| `exportar.py` | Define `car_export(body, wheels)`: pasa los materiales a colores del juego, quita la matrícula trasera y saca la geometría. |
| `otros.py`, `c44.py`, `morros.py` | Especificaciones de los 13 primeros coches y el «repaso de morros» antiguo. |
| `auto/builder.py` | Saca la especificación de la **foto lateral** (ver más abajo). |
| `auto/coches7.py`, `auto/coches8.py` | Coches 7 y 8, generados con el builder. |
| `nuevos7.py`, `nuevos8.py`… `nuevos11.py` | Esas especificaciones ya resueltas, sin numpy, para cargar en Blender. |
| `fotos\` | **Todas las fotos de referencia**, con nombre de modelo (`troceen_c33_1.jpg`…). |
| `coches_propios.blend` | Colecciones `<Nombre>_HD` y `<Nombre>_juego`, más la escena del estudio: cámara `Camara`, luces `Sol` y `Caja`, colección `Collection` con el suelo. |
| `troceen_c33.blend` | El C33, hecho aparte y no con `otros.py`. Le faltan los arreglos de las ruedas. |
| `propios_kvN.json` | Exportaciones listas para meter en `kenney_cars.json` comprimiéndolas. |

### Cómo funciona el generador

- **La carrocería**: estaciones `K = (x, zb, zl, zt, wB, wR, ws)` a lo largo del coche. Son:
  - `zb`: altura de los bajos;
  - `zl`: línea de cintura (borde inferior del cristal);
  - `zt`: techo;
  - `wB`: medio ancho de la carrocería;
  - `wR`: medio ancho del techo;
  - `ws`: ancho del faldón.

  Se interpolan con PCHIP (sin ondas). El frente es +X.
- **La sección**: 10 puntos de control (`ctrl`) unidos con Catmull-Rom. Los parámetros:
  - `hombro`: saliente en la cintura;
  - `cintura`: entrante abajo;
  - `cupula`: cuánto se abomba el cristal lateral;
  - `corona`: techo abombado.
- **Pasos de rueda**: sin booleanas, que fallaban. Se saltan las caras dentro del arco y los vértices del borde
  se colocan sobre la curva; así no salen dientes.
  - `aleta_forma='cuadrada'` es una superelipse para SUV.
- **Ruedas**: `via` y `radio`. Desde la 1.4.9 la rueda se mete hacia dentro hasta quedar dentro del costado.
- **Piezas** (faros, rejillas, pilotos, matrículas):
  - Se proyectan con rayos sobre la carrocería (`decal`).
  - Formato `(nombre, mat, y0, y1, z0, z1, ±1, simétrica)`, o `(nombre, mat, 'poly', [(y, z)…], ±1, sim)`
    para un polígono convexo visto de frente.
  - +1 es delante y −1 detrás.
  - Una z negativa se cuenta desde el borde alto del frontal.
  - Materiales: `gloss` (negro brillo), `head` (faro encendido), `tail` (piloto), `silver`, `plate`, `plastic`,
    `paint`.
  - `sin_recorte=True` deja que los faros doblen la esquina. Si no, se recortan al ancho del frontal y pueden
    quedarse en nada: le pasó al Newton, que «no tenía ópticas».
  - Un faro por encima del borde alto del frontal cae sobre el capó (como en el Newton/Tesla).
- **Ventanillas**:
  - Contornos laterales (`ventanas`: `xmin`/`xmax` en función de z) recortados por el techo.
  - En el builder, el borde delantero y el trasero siguen la propia línea del techo. Si no, salían bordes rotos.
- **Techo negro**: solo si `techo_z` es menor que la altura del techo. **Por defecto 9,0, sin techo negro**.
- **Emblemas**: uno por `marca`, siempre inventados.
- **Versión del juego**: N=44, SUB=3 y diezmado de cristales y piezas, unos 11-13 k triángulos. La versión lejana
  se hace con un modificador DECIMATE de ratio 1050/triángulos.

### `auto/builder.py`: el coche desde la foto lateral

- **Entrada**:
  - `img`: la foto lateral;
  - `modo`: `'blanco'` (fondo claro, `thr`) o `'alpha'` (PNG con transparencia);
  - `box`: para recortar cotas y textos;
  - `xf`/`xr`: píxel del morro y de la zaga;
  - `suelo`: borde inferior del neumático;
  - `L`, `W`, `H`;
  - `sv`: píxeles por metro en vertical, cuando la foto está aplastada. En muchas fotos de catálogo la escala
    horizontal y la vertical no son iguales.
- **Perfil del techo**: se mide columna a columna, con mediana `med` y media móvil `suave`.
  - `clip=[(px0, px1)]` quita alerones, antenas y barras de techo.
  - `puntos=[(px, y)…]` sirve para medirlo a mano si el fondo no es liso.
  - `zt_morro` y `zt_cola` fuerzan la altura de las puntas (zagas verticales de furgonetas).
- **Cotas en metros**:
  - `zl` y `zb`: listas `(x, z)`;
  - `planta`: redondeo en planta de morro y zaga `(Rf, Rr, kf, kr)`;
  - `A`: pie y cabeza del pilar A;
  - `B`: pilar B;
  - `C`: pilar C;
  - `Q`: ventanilla de cuarto;
  - `ejes`, `radio`, `capo_x`, `parabrisas`, `luneta`, `cola` (luces de freno en el juego).
- **Sale** un SPEC del generador. Se guarda «limpio» (sin numpy) en `nuevosN.py`, que es lo que se carga en
  Blender.
- **La receta ampliada** (`RECETA_COCHES.md`, sección «Cuadrar con la foto»): la foto lateral manda. Ruedas,
  suelo, cristales, juntas, pilar B y manillas se miden con una rejilla, no a ojo ni con medidas de catálogo.

### Paso a paso para un coche nuevo

1. Guarda sus fotos en `Blender\coche\fotos\` con el nombre del modelo.
2. Haz una rejilla sobre la foto lateral (recorte con líneas cada 10-20 px) y mide.
3. Escribe la entrada en `auto/cochesN.py` y ejecuta el builder en la nube para sacar `nuevosN.py`.
4. Copia al PC `generador.py` (si ha cambiado), `nuevosN.py` y el builder, en una carpeta nueva de outputs.
5. En Blender: ejecuta `generador.py` con `exec`, carga `nuevosN.py` y llama a `GEN['build'](S, 'juego')` y a
   `GEN['finalize'](col, nombre)`.
   - Antes de construir, quita la exclusión a todas las colecciones (`lc.exclude = False`): con una excluida no se
     puede activar un objeto.
6. **Render** con la cámara `Camara` (lente de 85 mm):
   - de lado, con dirección (0, −1, 0,05), a una distancia de unas 3,4×L + 3;
   - de tres cuartos delante y detrás;
   - de frente: (1, 0, 0,1), a unos 7,5 m del morro;
   - en 4 colores, cambiando `Base Color` de `Pintura`.
7. **Hoja de comparación**: render a la izquierda y foto de Jonay a la derecha. Envíasela y espera su visto bueno.
8. **Exportar**:
   - copia del cuerpo con DECIMATE para la versión lejana;
   - ruedas de la versión lejana con la malla `RuedaLejos`;
   - `car_export`, poniendo `bb = [[-maxwB, 0, X0], [maxwB, maxzt+0,012+corona, X1]]`;
   - guárdalo en `propios_kvN.json`.
9. **En el repo**: comprime y mételo en `kenney_cars.json`, añade las filas en `VMODELS_RAW` (más la `L`), pon
   su `tail` y el peso del coche antiguo a 0. Añade el id a `tests/herramientas/foto_propios.py` (`MODELOS`) y
   publica.

### Problemas que ya se resolvieron (no repetir)

- Blender está en español: `Principled BSDF` no se encuentra por nombre. Busca el nodo por tipo y las entradas por
  identificador (`setin`).
- `me.materials.clear()` reinicia los índices de material. Quita los huecos que sobren con `pop`.
- Las booleanas EXACT pegaban los cortadores a la carrocería. No se usan booleanas.
- `car_export` desaparece de `driver_namespace` al reabrir el `.blend`: vuelve a ejecutar `exportar.py`.
- Los objetos de una colección excluida no se pueden activar: quita la exclusión antes de construir.
- `foto_propios.py`: usa `__dbg.DATA`, no `DATA`. La cámara se coloca después de `__step`.
- Techos arrugados: la línea de techo recogía alerones y escalones de píxeles. Se arregló con `clip` y el
  suavizado.
- Los faros recortados hasta desaparecer (Newton) se arreglan con `sin_recorte`.
- Techo negro por defecto: ahora `techo_z` vale 9,0 por defecto.

### Estado de los coches (al cierre de este chat)

Para el estado actual, mira `CHANGELOG.md` y PENDIENTES. Otros chats han seguido con el Raul V, el Raul Cactus
(técnica Fable, `TECNICA_COCHES_FABLE.md`) y el MP HS.

- **En el juego**:
  - Troceen C33, C44 y Beluga
  - Totuya Carlota, Yaiza Cross, O Algo y Yaiza
  - Guanchazen T-Rex, D.I 55 y Helado
  - JTM Capítulo 3 y H4
  - Yoos Reniego y Cartabon
  - Antonias Tipo E, LTG Scupe y Vivita
  - Fierilla 440
  - Piki Crocante
  - Seta Gomera
  - Pancho Teypan y Chayan
  - Ole Corsario y Mocco
  - Damian Sendero
  - Newton Style 3
- **Antiguos ya retirados** (peso 0):
  - Limonero Ce-Tres, Butaca Leona, Tagoror Corona, Guagüen Golfo, Te-Cruz y Tiguanche
  - Quillo Exceso, Picante, Barranco y Estónica
  - Butaca Atajo e Isleña
  - Tagoror Lairis Cruz, Tierra Crucero y Lairis
  - Nisperero Cascai, Pijó 8002 y Datilera Polvero
  - Jandía i-Diez y Copal Corsario
  - Guagüen Pollito, Datilera Sendero, Limonero Berlinga, Mercadillo Vitó y Reinona Tío
- **Pendiente**:
  - Pasar la receta a **todos** los ya hechos, incluidos los primeros: ópticas y frontales, ventanillas, techo y
    ruedas. Las fotos de todos ya están en `fotos\`.
  - El C33 sigue con los dientes y las ruedas antiguas.
  - Las uniones raras de las ventanillas de lado (con la de atrás y con el techo).

---

## 7. Avisos de mapa del 11-nov (en PENDIENTES, sin hacer)

- **Hierba**: solo en zonas de campo. Ni en aceras, ni en la calzada, ni flotando sobre la rampa del aparcamiento
  Trinidad Centro (X −244, Y 521).
- **Pasarela del tranvía** (X −259, Y 547; X −299, Y 653; X −312, Y 697):
  - la subida va por el lado contrario, sobre lo que hoy es una acera;
  - la farola atraviesa la pasarela;
  - sobra el muro del final, que se puede atravesar: ahí va una entrada libre;
  - la trinchera del tranvía tiene que ir vallada;
  - el pilar del puente debe ir fuera de la carretera (X −680, Y 324).
- **Glorieta del Brasil** (X −281, Y 719): se anda por encima de la trinchera del tranvía como si hubiera suelo
  invisible.
- **Paso inferior de San Honorato** (X −928, Y 59): el coche choca con algo invisible.
- **Glorieta de la Vía de Ronda / Av. de los Menceyes** (X 688, Y 1309): muros y pretiles de la boca de la
  trinchera cortan la calle.
- **Barandillas y paradas del tranvía**: aparecen de golpe al acercarse (distancia de dibujado corta).
- **Coches que parecen flotar**: se ve hueco bajo la carrocería, como en X −1015, Y 148.

---

## 8. Trucos generales que han funcionado

- **Comparar siempre con la referencia en la misma imagen**: render o captura a la izquierda, foto real a la
  derecha. Jonay juzga mirando, y así se ven los fallos antes de enseñárselos.
- **Separar escalas horizontal y vertical** en las fotos de catálogo: muchas están aplastadas.
- **Mirar el resultado del trabajador pronto** y no reenviar archivos desde la misma ruta de outputs.
- **Un cambio pedido se aplica a todo lo parecido**. Ejemplos: «ruedas a ras» en todos los coches, «techo de su
  color» en todos. Y si la causa está en una herramienta, se arregla la herramienta (generador o builder), no el
  caso suelto.
- **Lo que Jonay repite** («grábate a fuego», «siempre…») va a la memoria y a `CLAUDE.md` o a la receta.
- **Al cerrar un chat largo**:
  - deja PENDIENTES al día;
  - deja las fotos en el PC con nombre;
  - deja la receta y este traspaso actualizados;
  - dile a Jonay que siga en un chat nuevo con una frase clara («sigue con los coches»).
