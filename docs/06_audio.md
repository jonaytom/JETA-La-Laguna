# 6. Audio y radio procedural

Todo el sonido se **sintetiza en tiempo real** con Web Audio: no hay archivos de audio. Es una solución
**provisional**: el proyecto de assets podrá aportar efectos, música y voces grabadas (ver `10_assets.md`).

## Efectos (`10_audio.js`, objeto `AUDIO`)

- Se inicializa con el primer clic (los navegadores no dejan sonar audio antes).
- `master` (volumen general) ← motor (diente de sierra + cuadrada por un pasa-bajos que sigue revoluciones y marchas),
  derrape (ruido filtrado), sirena (cuadrada modulada, atenuada con la distancia a la patrulla más cercana),
  ambiente urbano y pájaros de día.
- Utilidades: `burst(dur, frec, vol, tipo)` (ruido filtrado con envolvente) y `tone(frec, dur, vol, forma, retraso)`.
- Efectos: `crash`, `thud`, `horn`, `door`, `shot`, `clink`, `cash`, `pickup`, `fail`, `wanted`, `bell`, `swing`,
  `mumble` (murmullo de voz), **`footstep(correr, blando, suelo, volumen)`**, **`jump`** (barrido de aire +
  gruñido) y **`land(velocidad)`** (golpe sordo + los dos pies).

## Pasos (`10c_steps.js`, objeto `STEPS` y función `footContacts`)

- **Muestras pre-generadas** al iniciar el audio (60 `AudioBuffer`): 5 suelos × 2 ritmos × 6 variantes.
  - Cada paso son **dos impactos**: talón y, 75–105 ms después, la punta (al correr casi juntos y más fuertes).
  - Cada impacto = **modos resonantes amortiguados** (suela + suelo), un **clic** de ruido filtrado y
    **arenilla** (micro-clics); además un **roce** de suela.
  - Suelos: `hard` (asfalto/acera), `stone` (adoquín y losa del casco histórico), `tile` (interiores),
    `soft` (césped/tierra: golpe sordo + crujido largo), `metal` (chapa).
- `STEPS.play(suelo, 'walk'|'run', volumen)`: elige una variante distinta a la anterior, varía tono (±6 %) y
  volumen y alterna un poco izquierda/derecha.
- **Acústica**: `STEPS.setSpace('' | 'tunnel' | 'room' | 'park')` manda parte del sonido a una reverberación
  (respuesta al impulso generada): túnel/parking cubierto 1,6 s, interior 0,45 s.
- **Sincronía con la animación** (`footContacts(H, dt, cb, activo)`): cada fotograma mide la altura de cada
  tobillo (`foot_l`, `foot_r`) respecto al personaje, con mínimo y máximo adaptativos. El paso suena cuando el
  pie que cae **frena en seco** en la mitad baja de su recorrido (apoyo); se rearma al levantarlo de nuevo, con
  0,22 s de margen. Funciona con cualquier clip (andar, trotar, esprintar) y velocidad de reproducción.
- El jugador elige el suelo en `08_player.js` (`PLAYER.surface`). Si el personaje no tiene esqueleto se usa la
  distancia recorrida (0,75 m andando, 1,15 m corriendo).

## Radio (`10b_music.js`, objeto `MUSIC`)

Se enciende al subir a un coche. `Q` (o tocar el velocímetro) cambia de emisora:

| Emisora | Estilo | BPM | Swing |
|---|---|---|---|
| Gofio FM 90.1 | boom bap de los 90 (piano, contrabajo, scratches) | 88 | 0,16 |
| Radio Aguere 96.6 | G-funk (silbido con portamento, bajo sintetizado, colchón) | 94 | 0,10 |
| Mojo Picón 102.3 | rap duro (metales, caja seca) | 97 | 0,06 |
| Radio apagada | — | | |

### Cómo se genera una canción

- `makeSong(estilo)` con una semilla aleatoria: tónica (La2–Re#3), escala menor, progresión de 4 acordes según el
  estilo, patrones de 16 pasos de bombo/caja/charles, línea de bajo, ritmo de acordes y un motivo melódico.
- **Planificador**: `setInterval` cada 25 ms que programa notas con 150 ms de antelación en el reloj de audio
  (`ctx.currentTime`), con swing en los semicorcheas impares.
- Estructura de 32 compases: 2 de intro sin caja → estrofa (8) → estribillo ×2 (4) → estrofa (8) → estribillo ×2 (4)
  → final instrumental (6). Cada 8 compases hay un redoble; a los 32 se inventa otra canción.
- Instrumentos sintetizados: bombo (seno con caída de tono + saturación), caja (ruido + triángulo + pequeña sala),
  charles abierto/cerrado, bajo (triángulo/sierra + sub), acordes (piano FM / sierras desafinadas / metales),
  silbido G-funk con vibrato, scratch (buffer reproducido con velocidad variable), crujido de vinilo.
- Bus de música → pasa-bajos → compresor → `master`. Volumen propio en el menú de pausa (`SETTINGS.music`).

### Voces

- Letras originales en inglés por grupos de rima (`RHYMES`) y estribillos por emisora (`HOOKS`); `writeLyrics`
  compone dos estrofas distintas por canción.
- Se cantan con la **síntesis de voz del sistema** (`speechSynthesis`), eligiendo una voz inglesa masculina.
  Cada verso arranca al inicio de su compás y la velocidad se ajusta al número de sílabas para que ocupe el compás.
- Gritos sueltos (*ad-libs*) en los compases sin letra y el nombre de la emisora al cambiarla.
- Limitación: es una voz de lectura de texto; no pasa por Web Audio, así que no admite efectos ni sincronía exacta.

## Estribillo de misión (`MUSIC.jingle()`)

Al superar una misión: 2 compases a 96 BPM (bombo, caja, metales con la progresión i–VI–VII, gancho melódico,
scratch final) y un grito («Mission complete!»…). Si la radio sonaba, se pausa y vuelve después con canción nueva.


## Ambiente de la ciudad (`10d_ambience.js`, objeto `AMBIENCE`)

Sonidos posicionales (panorama estéreo respecto a la cámara y atenuación con la distancia), sintetizados:

- **Pájaros** en los árboles cercanos (`TREES`): gorrión (chips), canario (trino), mirlo (silbidos) y paloma
  (arrullo). Cada 0,8–3,5 s de día, muy de vez en cuando de noche.
- **Coches**: 3 voces de motor (sierra + triángulo + ruido de rodadura, pasa-bajos) asignadas a los 3 coches más
  cercanos; tono según velocidad y marcha, volumen según distancia.
- **Gente charlando**: si hay 2+ peatones a menos de 3,5 m entre sí y a menos de 22 m, sílabas con dos formantes,
  voces graves y agudas por turnos y alguna risa.
- **Campanas** de La Concepción y la Catedral (7:00–22:00): tantas campanadas como la hora (reloj de 12 h) y una
  a la media.
- **Perros** y **gaviotas** lejanos de vez en cuando. Dentro de edificios el ambiente baja al 25 % y en coche al 55 %.
- Los pasos (`10c_steps.js`) suenan ahora a ~35 % del volumen anterior.
