# Auditoría de código: JETA La Laguna v0.49.0

Fecha: 7 de octubre de 2026 · Auditor: skill «auditar-codigo» (herramientas de `RevisordeCodigo`), lanzada al publicar.
Se midió con el análisis estático de los 43 `src/*.js` y el juego ejecutándose en calidad media, en Chromium sin
ventana con WebGL por software. Los tiempos son orientativos; los recuentos son reales.

**Veredicto del auditor: APTO CON AVISOS.**

## 1. Resumen y comparación con la auditoría de v0.46.0

| Indicador (calidad media) | v0.46.0 | **v0.49.0** | Cambio |
|---|---|---|---|
| Memoria JS tras arrancar | 1.156 MB | **580 MB** | −50 % |
| Geometría guardada en RAM | 1.007 MB | **414 MB** | −59 % |
| Fuga de geometrías por vuelta de teletransportes | ≈ 200 | **72–90** | −60 % |
| Fuga de texturas por vuelta | ≈ 237 | **2–4** | −98 % |
| Vértices en escena | 28,2 M | 28,8 M | = (es la misma ciudad) |
| Triángulos por fotograma | 5,4 M | 5,5 M | = |
| Llamadas de dibujo al empezar | 2.008 | 2.074 | = |
| Programas de shader | 55 | 55 | = |
| Lógica por paso | 2,6 ms | 3,1 ms | + (ruido del WebGL por software; el HUD y las colisiones ahora hacen menos trabajo) |
| Arranque (WebGL por software) | 42,5 s | 46,7 s | +4 s: los 16 mapas de reflejos y el grupo de peatones se preparan ahora en la carga |
| Funciona sin internet (copia del PC) | No | **Sí** | Three.js y fuentes incrustados |

## 2. Qué queda (el programador no lo aplica hasta que Jonay lo diga)

### P0. Fugas que quedan

- **P0.a · Coches del tráfico que no caben en el grupo.** En `07_vehicles.js`, `Car.remove()` guarda como mucho 6 coches
  por modelo; los demás salen de la escena sin `dispose()`. Además, cada coche nuevo crea sus propias luces
  (`06b_vmodels.js`: `BoxGeometry` de pilotos, faros y rotativos) y un casco (`SphereGeometry`) si es moto.
  - **Arreglo:** crear esas piezas una sola vez y compartirlas.
  - **Arreglo:** al descartar un coche que no entra en el grupo, recorrer su malla y liberar solo lo que es suyo
    (el material de pintura y los rótulos).
  - **Ganancia:** la fuga de geometrías debería quedar cerca de 0.
- **P0.b · Rótulos y matrículas.** `textPlane()` crea una textura de canvas en cada furgoneta rotulada, taxi o policía.
  - **Arreglo:** guardar en caché los rótulos por texto, como ya se hace con `PLATES`.

### P1. Rendimiento

- **P1.5 (sigue).** Hay 12.000 mallas sueltas y 5,5 M de triángulos. Porterías, vallas, carteles y los bancos de las
  misiones se pueden meter en `Acc`/`InstancedMesh`. Conviene también un LOD por trozo de ciudad.
- **Coches aparcados.** Son el grueso de los vértices: varios millones, copiados en cada zona.
  - **Arreglo:** usar un `InstancedMesh` por modelo, con la pintura separada en su propia instancia de color.
  - **Ganancia:** casi toda la memoria de GPU de los aparcados.
- **Arranque.** Los 16 mapas de reflejos le añaden unos segundos.
  - **Arreglo:** prepararlos con la hora actual primero y el resto durante la partida, uno por segundo.

### P2. Carga y mantenimiento

- **P2.1 / P2.2 (siguen).** Precalcular en `build.py` la geometría y los datos binarios (`chars.json`,
  `kenney_cars.json`).
- **P2.5 (sigue).**
  - Módulos y formateo: 309 líneas tienen más de 300 caracteres.
  - Imágenes de referencia: pasar a Git LFS los PNG de `docs/referencias`.
  - Pruebas: añadir a `tests/` una prueba de rendimiento con estos números como límite.
- **Avisos estáticos.** El análisis estático marca 63 avisos «críticos». Casi todos son falsos positivos: son funciones
  que crean geometría durante la carga, como `mk()`, `finish()` o `makeHumanLegacy()`, no en cada fotograma. Las fugas
  reales son las del apartado P0.

## 3. Lo que ya está bien

- Grupo precargado de peatones, Canariones y policías. Coches del tráfico reutilizados. Balizas liberadas.
- Normales y colores en 8 bits, y copias en CPU liberadas tras subirlas a la GPU (ciudad y aparcados).
- HUD con escrituras en caché. Minimapa a 30 Hz. Avisos cada 6 fotogramas.
- Colisiones y sol sin crear basura en cada fotograma.
- Mapas de entorno reutilizados. `compileAsync`.
- HTML del PC sin dependencias de red.

## 4. Orden sugerido

1. P0.a y P0.b: fuga a cero (1 sesión corta).
2. Aparcados en `InstancedMesh` (1 sesión).
3. P1.5: fusionar mallas sueltas y LOD.
4. P2.1, P2.2 y P2.5.
