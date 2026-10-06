# Auditoría de código — JETA La Laguna v0.46.0 (commit a14cc17)

Fecha: 6 de octubre de 2026 · Auditor: proyecto «Corrector de código»
Medido con: análisis estático de los 43 `src/*.js` + ejecución real del juego (calidad **media**) en Chromium sin ventana.

> Nota sobre las mediciones: el WebGL usado aquí es por software, así que los **tiempos** son orientativos (en el PC
> con la RX 6600 serán menores). Los **recuentos** (vértices, MB, llamadas de dibujo, fugas) sí son los reales.

---

## 1. Resumen en 30 segundos

| Indicador (calidad media) | Valor medido | Objetivo razonable |
|---|---|---|
| Memoria JS tras arrancar | **≈ 1.170 MB** | < 400 MB (los móviles se cierran por encima de ~500 MB) |
| Geometría guardada en RAM | **1.010 MB**, 28,3 millones de vértices | < 250 MB |
| Triángulos por fotograma | 5,4 millones | 1–2 millones |
| Llamadas de dibujo al empezar | ≈ 2.000 | < 800 |
| Objetos en la escena | 12.107 mallas (6.640 hijos directos) | — |
| Fuga al moverse por el mapa | **+200 geometrías y +235 texturas** por cada vuelta de 12 teletransportes, sin parar | 0 |
| Arranque (WebGL por software) | 42 s (17 s compilando shaders) | — |
| HTML final | 6,0 MB (5,6 MB son datos JSON) | — |

**Lo más grave son tres cosas:** (1) la geometría de la ciudad ocupa 1 GB de RAM por cómo se construye,
(2) los peatones (y coches) que aparecen y desaparecen **nunca se liberan** → la memoria crece mientras juegas,
(3) todo se calcula al arrancar en el hilo principal, cuando gran parte podría venir ya precalculada de `build.py`.

---

## 2. Mejoras para el programador (por prioridad)

### P0 — Críticas (memoria y fugas)

**P0.1 · Geometría de la ciudad: 1 GB en RAM** — `04_world.js:4-24` (`class Acc`) y `finalizeChunks` (`04_world.js:844`)
- Qué pasa: `Acc` guarda triángulos **sin indexar** en arrays JS normales con `push(...a, ...b, ...c)`, y genera
  `position` + `normal` + `color` en `Float32`. Medido: position 324 MB, **normal 324 MB**, **color 296 MB**.
  Además, durante el arranque esos arrays JS ocupan el doble (cada número es un double de 8 bytes) y `push(...spread)`
  es lento.
- Cómo arreglarlo (de más fácil a más trabajo):
  1. **Quitar el atributo `normal`**: las normales son planas por triángulo, así que basta `flatShading: true` en esos
     materiales (el shader las calcula). Ahorro ≈ 324 MB.
  2. **Color en `Uint8Array` normalizado** (`new THREE.BufferAttribute(u8, 3, true)`). Ahorro ≈ 220 MB.
  3. **Liberar la copia en CPU tras subir a la GPU** para las mallas que no se usan para colisiones ni raycast:
     `attr.onUpload(function () { this.array = null; })`. Ahorro de casi todo lo que quede.
  4. Construir con `Float32Array` que crecen (en vez de arrays JS + spread) e **indexar** vértices compartidos.
- Ganancia esperada: de ~1.170 MB a ~300–400 MB de memoria; arranque más rápido.

**P0.2 · Fuga de peatones** — `09_peds.js:18` (spawn) y `09_peds.js:51` (despawn)
- Qué pasa: cada peatón nuevo llama a `makeHuman()`, que crea **material propio** (`skinMaterial`, `06a_humans.js:35`)
  y **geometrías nuevas** de complementos (gorra, gafas, reloj, bolso, cadena… `06a_humans.js:84-97`).
  Al alejarse solo se hace `scene.remove()`: nunca `dispose()`. En todo el código hay **3 llamadas a `dispose`**.
- Cómo arreglarlo:
  1. **Pool de humanos**: crear `Q.peds + 8` al arrancar (en el paso de carga) y **reutilizarlos**: al «aparecer»
     solo se cambia posición, colores (uniforms `uCloth`, `uJacket`…) y qué complementos están visibles.
     Así no se crea nada durante el juego → sin tirones ni fugas.
  2. Compartir las geometrías de complementos (crearlas una vez en un objeto `ACC_GEO`).
  3. Si se mantiene crear/borrar, al borrar recorrer `H.root.traverse` y hacer `dispose()` de geometrías y
     materiales propios (no de los compartidos).
- Lo mismo con **coches**: `Car.remove()` (`07_vehicles.js:153`) tampoco libera; aplicar pool o `dispose`.
  Y los policías (`removeCop`, `09e_cops.js:18`).

**P0.3 · Pistolas, balizas de misión y latas creadas en caliente**
- `09c_weapons.js:14-15` y `09e_cops.js:7-8`: la malla de pistola se construye con `new BoxGeometry` cada vez.
- `12_missions.js:8-9` (baliza `make`), `:279` (latas), `:348`: geometrías/materiales nuevos al empezar cada misión
  y `scene.remove` sin `dispose` (`:98`, `:277`, `:369`).
- Cómo: crear una vez (precarga) y mostrar/ocultar con `visible`.

### P1 — Rendimiento por fotograma

**P1.1 · HUD que toca el DOM en cada fotograma** — `11_hud.js:130-160`
- `$('clock').textContent`, `$('money').textContent`, 6 × `style.opacity`, `style.width` de la vida, y
  `[...starsEl.children].forEach` **todos los fotogramas**, buscando cada elemento con `getElementById`.
- Cómo: cachear los elementos una vez y escribir **solo si el valor cambió** (como ya se hace bien con `coords`
  en la línea 131). El reloj solo cambia una vez por minuto de juego.

**P1.2 · Minimapa redibujado completo cada fotograma** — `11_hud.js:81` (`drawMinimap`)
- Dibuja el canvas grande del mapa rotado y escalado 60 veces por segundo (muy caro en móvil).
- Cómo: redibujar a 20–30 Hz (cada 2–3 fotogramas) o recortar antes la zona cercana a un canvas pequeño.

**P1.3 · Basura por fotograma (pausas del recolector de memoria)**
- `07_vehicles.js:72` `circles()` crea un array de arrays en cada llamada, y se llama dentro de bucles anidados
  (peatones × coches en `09_peds.js`, colisiones en cada subpaso de física). → Devolver un buffer reutilizado.
- `07_vehicles.js:299` `carCollisions()` hace `CARS.filter(...)` **hasta 6 veces por fotograma** (una por subpaso).
  → Calcular la lista activa una vez por fotograma.
- `13_main.js:50-64` `updateSun()` (cada 2 fotogramas) crea `new Vector3`/`new Color`/`.clone()` → usar temporales.
- `09c_weapons.js:75-105` (`updateWeapons`, `gripGun`, `aimArm`): ~12 `new Vector3/Quaternion/Matrix4` por fotograma
  al apuntar. `09e_cops.js:76`, `10d_ambience.js:14`, `12c_achaman.js:54`: lo mismo.
- `Math.hypot` aparece 104 veces en código caliente: para **comparar** distancias usar `dx*dx + dz*dz < r*r`.

**P1.4 · Búsquedas lineales cada fotograma**
- `nearestEnterable()` (`08_player.js:31`), `nearestDoor()` (`05g_interiors.js:133`) y `FOOD.near()` se llaman
  desde el HUD en cada fotograma recorriendo todas las listas. → Ejecutarlas cada 5–10 fotogramas o usar la
  rejilla espacial que ya existe (`COL`).

**P1.5 · Demasiadas mallas sueltas y 5,4 M de triángulos**
- 12.107 mallas: porterías, canastas, vallas (`05i_sports.js:51`), carteles (`05q_inicio.js:128`), bancos de
  misiones… se añaden como `Mesh` individuales. → Meterlas en `Acc`/`InstancedMesh` como ya se hace con árboles.
- Cada campo crea su propia textura canvas y material (`05i_sports.js:42-43`): agrupar en un atlas.
- Añadir **LOD por trozo** (dos niveles: detallado cerca, simplificado lejos) y ocultar trozos fuera de
  la distancia de niebla; bajar segmentos de cilindros/esferas pequeños (bolardos, farolas).

**P1.6 · Mapa de entorno (PMREM) regenerado en caliente** — `13_main.js:41-45`
- `pmrem.fromScene()` cada vez que cambia la hora: produce un pico de GPU periódico.
- Cómo (precarga): generar al arrancar 6–8 mapas (amanecer, mañana, mediodía, tarde, atardecer, noche) y
  alternar entre ellos.

### P2 — Carga, distribución y mantenimiento

**P2.1 · Mover trabajo del arranque a `build.py`** — `13_main.js:193-215`
- Terreno, carreteras, edificios y `finalizeChunks` se calculan **en cada arranque** a partir del JSON de OSM.
  Es siempre el mismo resultado → precalcularlo en el build (o en un Web Worker la primera vez y guardarlo en
  IndexedDB). Ideal: el HTML trae los buffers de geometría ya hechos (binario en base64) y el arranque solo los sube.

**P2.2 · Datos en formato binario**
- `chars.json` (1,6 MB) y `kenney_cars.json` (1,2 MB) son números en texto. Pasarlos a `Float32/Int16`
  cuantizados en base64 (o glTF + meshopt) reduce tamaño y tiempo de `JSON.parse`.

**P2.3 · Dependencias de red: el «HTML único» no funciona sin internet**
- `template.html:9-10`: 6 familias de Google Fonts; import map de Three.js desde cdnjs. Sin conexión no hay fuentes
  ni juego. → Incrustar Three.js (ya está en `data/three.module.min.js`) y las fuentes en woff2 recortadas
  (solo los caracteres usados). Revisar si hacen falta las 6 familias.

**P2.4 · Compilar shaders sin bloquear**
- `renderer.compile()` (`13_main.js:211`) es síncrono: usar `await renderer.compileAsync(scene, camera)` (Three r158+).
  Revisar los 55 programas de shader: unificar materiales que solo difieren en color (usar `M()` con caché, que ya
  existe en `06_actors.js:3`, en vez de `new MeshStandardMaterial`: hay 174 en el código).

**P2.5 · Calidad del código**
- 305 líneas de más de 300 caracteres y todo en un único ámbito global concatenado: difícil de revisar y fácil
  romper el arranque por el orden de archivos. Recomendado, sin prisa:
  - Pasar a **módulos ES** (`import/export`) y empaquetar con **esbuild** (un solo comando, sigue saliendo un HTML).
  - **Prettier** para formatear (sin cambiar lógica) y **ESLint** con reglas de `no-unused-vars`/`no-undef`.
  - `// @ts-check` + JSDoc en los módulos centrales para que el editor detecte errores de tipos.
- `docs/referencias/` tiene ~128 MB de PNG en el repositorio (y 3 duplicados `chimisay_*.png` en la raíz de esa
  carpeta). → Moverlos a Git LFS o fuera del repo; comprimir a JPG/WebP.
- Añadir una **prueba de rendimiento** a `tests/` que falle si suben la memoria, los vértices o las geometrías tras
  pasear (el auditor ya lo mide; se puede copiar `perfil.py`).

---

## 3. Lo que ya está bien hecho (mantener)

- Física a paso fijo (1/90 s, máx. 6 subpasos) y resolución dinámica (`adaptRes`).
- Fusión de geometría estática por trozos (`Acc`/`finalizeChunks`) y `InstancedMesh` en árboles/farolas.
- Rejilla espacial de colisiones (`COL`, celdas de 16 m) y GPS recalculado cada 45 llamadas.
- Caché de materiales `M()` y `customProgramCacheKey` en la piel → un solo programa para todos los humanos.
- Arranque por pasos con mensajes y `try/catch`, ganchos de depuración (`__dbg`, `__step`, `__snap`) y pruebas con
  Playwright: es lo que ha permitido medir todo esto automáticamente.

---

## 4. Orden de trabajo sugerido

1. P0.2 + P0.3 (pool de peatones/coches/objetos de misión): corta la fuga. **1 sesión.**
2. P0.1 pasos 1–3 (sin normales, color Uint8, liberar arrays): baja la memoria a la mitad o menos. **1 sesión.**
3. P1.1–P1.4 (HUD, minimapa, basura por fotograma). **1 sesión.**
4. P2.3 + P2.4 (juego realmente offline, shaders asíncronos).
5. P1.5, P1.6, P2.1, P2.2 (más profundo: LOD, precálculo en build, binarios).
6. P2.5 cuando no haya prisa por funcionalidades.

Tras cada paso, volver a lanzar la auditoría para comparar con esta línea base.
