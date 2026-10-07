# Auditoría de código — JETA La Laguna v0.49.0 (commit 93ef496)

Fecha: 7 de octubre de 2026 · Auditor: proyecto «Corrector de código» · Comparada con: v0.46.0 (a14cc17)
Veredicto automático: **APTO CON AVISOS**

> Medición repetible: semilla aleatoria, hora (12:00) y cámara fijas. Los recuentos son exactos; los tiempos
> (WebGL por software) son solo orientativos.

---

## 1. Resumen

La 0.49 aplica casi todo el informe anterior (P0.1–P0.3, P1.1–P1.4, P1.6, P2.3, P2.4) y se nota:

| Indicador (calidad media) | v0.46.0 | v0.49.0 | Cambio |
|---|---|---|---|
| Memoria JS tras arrancar | 1.187 MB | **573 MB** | **−52 %** |
| Geometría guardada en RAM | 1.018 MB | **410 MB** | **−60 %** |
| Fuga de geometrías por vuelta de 12 teletransportes | 225 / 209 | **85 / 71** | −64 % |
| Fuga de texturas por vuelta | 236 / 231 | **0 / 0** | resuelta |
| Vértices | 28,6 M | 28,8 M | = |
| Triángulos | 5,55 M | 5,65 M | = |
| Llamadas de dibujo al empezar | 672 | 688 | = |
| Programas de shader | 55 | 55 | = |
| Mallas en la escena | 12.107 | 12.002 | = |
| HTML final | 6,0 MB | 8,3 MB | +2,3 MB (Three.js y fuentes dentro: es lo esperado) |

Tras pasear por el mapa la memoria JS baja a ~485 MB, porque se sueltan las copias que ya están en la GPU.

**Avisos del veredicto:**
- Sigue habiendo una fuga **pequeña** de geometrías (~78 por vuelta, sin texturas). Ver P0.
- El análisis estático marca 63 avisos críticos (antes 56). Lo he revisado: **no es un empeoramiento real**. Son las
  funciones nuevas de precarga (`preloadHumans`, `newPedHuman`, `geoOf` de aparcados), que crean objetos a propósito
  durante la carga, y el auditor las cuenta como si corrieran cada fotograma.

---

## 2. Revisión de los arreglos (leyendo el código)

| Tarea | Estado | Comentario |
|---|---|---|
| P0.1 Memoria de geometría | ✅ Bien hecho | Normales `Int8`, color `Uint8` y solo el atributo que el material usa, `onUpload` libera la copia en RAM, y se anulan los arrays de `Acc` tras construir (`04_world.js`). Los aparcados igual y se reconstruyen por zona (`07_vehicles.js`). |
| P0.2 Pool de humanos | ✅ Muy bien | `takeHuman`/`releaseHuman`/`preloadHumans` (`06a_humans.js`): se crean en la carga, se reutilizan, y además se precalientan los clips de animación y los shaders. |
| P0.2 Pool de coches | ⚠️ Parcial | `CARPOOL` por modelo (`07_vehicles.js`), pero los coches **dañados** (`health <= 0`) o con el pool lleno (más de 6) no se liberan. Ver P0. |
| P0.3 Pistolas y balizas | ✅ | `GUNPOOL` en policías; `BEACON.free` libera los materiales propios. |
| P1.1–P1.4 HUD, minimapa, basura, búsquedas | ✅ | Los avisos de `11_hud.js` bajan de 34 a 12 y los altos de `13_main.js` de 4 a 0. `circles()` reutiliza su buffer y `carCollisions` calcula la lista una vez por fotograma. |
| P1.6 Mapas de entorno | ✅ | Caché `ENVC` con uno cada 1,5 h y por tipo de tiempo, precalculados en la carga. |
| P2.3 Offline | ✅ | Three.js y fuentes (`data/fonts.json`) dentro del HTML del PC. |
| P2.4 Shaders | ✅ | Compilación sin congelar la carga. |
| P1.5 Mallas sueltas / LOD | ⏳ Pendiente | 12.002 mallas, 5,6 M de triángulos. |
| P2.1 / P2.2 Precálculo y binarios | ⏳ Pendiente | La ciudad se sigue construyendo en cada arranque. |
| P2.5 Calidad (módulos, lint, repo) | ⏳ Pendiente | |

---

## 3. Mejoras pendientes (por prioridad)

### P0 — Cerrar la fuga que queda

**P0.4 · Coches que no vuelven al pool** — `07_vehicles.js`, `Car.remove()`
- Qué pasa: si el coche está dañado (`health <= 0`) o ya hay 6 de ese modelo guardados, el coche se quita de la escena
  sin `dispose()`. También el casco de las motos se crea con `new THREE.SphereGeometry` en cada moto nueva.
- Cómo: en esos casos liberar la pintura (material propio de cada coche) y lo que no sea compartido; el casco, crear
  la geometría una vez y compartirla. O bien reparar el coche al guardarlo en el pool (restaurar `health` y el aspecto)
  para que también se reutilice.
- Cómo comprobarlo: en el veredicto, «fuga de geometrías por vuelta» debería bajar a ~0.

### P1 — Siguiente salto de rendimiento

**P1.7 · Las posiciones siguen en RAM (258 MB)** — `04_world.js` `Acc.geo()`
- Se mantienen a propósito para las auditorías y el agente revisor. Es el atributo que más ocupa ahora.
- Opciones: (a) liberarlas también con `onUpload` y que el agente revisor use la rejilla de colisiones (`COL`) o los
  datos del mapa en vez de las mallas; (b) guardar solo las de las mallas que el agente consulta (carreteras, puentes,
  túneles), no las de fachadas, tejados o mobiliario.
- Ganancia: hasta ~250 MB menos (la memoria JS bajaría a ~300 MB).

**P1.5 · Mallas sueltas y LOD** (sigue pendiente del informe anterior)
- 12.002 mallas y 5,6 M de triángulos. Porterías, canastas, vallas, carteles y objetos de misión siguen como `Mesh`
  sueltos: meterlos en `Acc` o en `InstancedMesh`. LOD por trozo y ocultar los trozos más allá de la niebla.

**P1.8 · Caché de mapas de entorno con límite**
- `ENVC` guarda 16 mapas por tipo de tiempo. Si el jugador cambia el tiempo varias veces, pueden llegar a ~48 mapas en
  la GPU. Limitarlo (por ejemplo, borrar los de los otros tipos de tiempo al cambiarlo) o precalcular solo el actual.

### P2 — Carga y mantenimiento (pendientes del informe anterior)

- **P2.1** Precalcular en `build.py` la geometría de la ciudad (o en un Web Worker y guardarla en IndexedDB). El
  arranque sigue rehaciéndola cada vez.
- **P2.2** `chars.json` ha subido a 2,1 MB (antes 1,6 MB) por las formas de cuerpo nuevas: es otra razón para pasar
  modelos y formas a binario (Float16/Int16 en base64, o glTF + meshopt).
- **P2.5** Módulos ES + esbuild, Prettier/ESLint, sacar `docs/referencias` del repositorio.

---

## 4. Lo que está especialmente bien

- El pool de humanos con precalentamiento de animaciones y shaders: evita tirones la primera vez que aparece cada tipo
  de peatón. Es la forma correcta de hacerlo.
- Elegir qué atributos de color crear según el material (`mat.userData.aCol` / `vertexColors`): ahorra memoria sin
  romper nada.
- Reconstruir los aparcados por zona en vez de esconder los vértices bajo el mapa.
- Documentar cada cambio con el número de la tarea de la auditoría (`audit P0.1`…): facilita mucho revisarlo.

---

## 5. Orden sugerido

1. P0.4 (coches dañados y cascos): cierra la fuga. **Corto.**
2. P1.7 (posiciones): la mayor ganancia de memoria que queda. **1 sesión** (hay que adaptar el agente revisor).
3. P1.8 (límite de la caché de entornos). **Corto.**
4. P1.5 (mallas sueltas y LOD).
5. P2.1 / P2.2 / P2.5.
