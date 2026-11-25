# Historial de versiones

El formato es: `## versión — fecha — título`, seguido de los cambios. El script de publicación usa
el título de la entrada más reciente como mensaje del commit.

## 1.4.51 — 2026-11-25 — Alpha 1.4.51: carriles del mapa, campos hundidos y frenada

- **Los carriles del mapa vuelven a leerse bien**: desde la 1.1.1 casi todas las calles leían los carriles de otra calle (el OSM los da por número de calle, y al quitar las calles de fuera del mapa los números se corrían). Ahora cada calle lleva los suyos; un tramo sin dato toma los del siguiente de la misma calle (la Autovía Interconexión Norte-Sur: 2 carriles, como dijo Jonay). Se han vuelto a bajar del OSM. La Av. de las Palmeras, de un carril por sentido con aparcamiento a la derecha (Jonay).
- **Autopistas y autovías con los carriles que dice el mapa** (antes llenaban su ancho con 3).
- **Glorietas**: el anillo mide de 7 a 9 m (salía de 3,2 m, con una isleta enorme encima de las calles que llegan), también los anillos que el mapa no marca como glorieta, y sin aparcamiento alrededor (Jonay: «la rotonda es demasiado pequeña… ¿y pusiste aparcamiento alrededor?»).
- **Campos hundidos, no subidos** (Jonay: «subiste la carretera… el campo va por debajo tras un muro»; «en una subida deben excavar el terreno, no flotar sobre él»): cada campo, plano a la altura de su punto más bajo; donde el terreno es más alto se excava, con un muro de contención recto hasta el suelo de fuera y la valla arriba. Las calles de alrededor ya no se tocan.
- **Muros de solares**: solo junto a calles con coches y su acera, nunca en una calle peatonal, una plaza o la Av. de La Trinidad (Jonay: «el muro en X −326 sobra, y el de X −391 lo mismo»; «la Trinidad no debería tener muros»).
- **Frenada** (Jonay: «si dejas apretado el freno debería clavar… y si vas muy rápido incluso patinar, y si suelta humillo ya sería brutal»): el freno aprieta más cuanto más lo mantienes (hasta un 70 %); a más de ~70 km/h las ruedas se bloquean, chirrían y sueltan humo.
- **El móvil suena** (Jonay: «cuando te llamen al móvil me gustaría que sonara una melodía de las clásicas de tonos, como la de Nokia… algo que no tenga copy pero reconocible»): un tono original al estilo de los móviles antiguos (pitido cuadrado, rápido, dos compases); suena hasta que contestas, y una vez si te llaman conduciendo.
- **Solares cerrados con muro también fuera del polígono del casco**: en cualquier zona de ciudad densa, y en tramos de hasta 120 m (Jonay: la manzana del Camino de las Peras detrás de la plaza del Cristo; la C. San Antonio).

## 1.4.50 — 2026-11-25 — Alpha 1.4.50: carriles, casas propias y campos planos

- **La casa de la C. Tacoronte 67 vuelve, con su garaje y el Linguini Gold** (Jonay: «ya no hay garaje en la casa de calle Tacoronte ni botón ni nada»): un edificio del Catastro (de los que cambiaron a las manzanas gruesas en la 1.4.48) se ponía encima. Regla para **todo lo hecho a mano** (Jonay: «que no pase más, que hay muchas más hechas a mano»): los edificios del Catastro no entran en las casas propias (Tacoronte 67, casa del hermano), en las casas del barrio de inicio, en los edificios vestidos por su sitio (centros de salud, Casa Museo Los Sabandeños, Fundación Cristino de Vera, Santa Catalina, pabellón Santiago Martín…) ni en el estadio Francisco Peraza y el pabellón Juan Ríos Tejera; y no se quita la manzana del mapa que uno de ellos viste.
- **Carriles** (Jonay: «ahora solo hay un carril», «se pasa de 2 a un carril y luego a 2 otra vez», «teniendo tanto espacio dejas un carril solo», «pones dos flechas como si fuera doble carril»):
  - Una calle de un sentido contaba sus carriles como una autopista (3,5 m y arcenes): la Trinidad, con 6 m medidos, salía con uno. En ciudad, carriles de 2,8 m o más.
  - Cada calzada de una avenida doble (dos tramos de un sentido con el mismo nombre, en paralelo) lleva dos carriles; si el aparcamiento no deja sitio para los dos, se quita el aparcamiento (275 tramos).
  - Un tramo no puede ser más estrecho que los dos de al lado de la misma calle y sentido.
  - El tráfico usa el ancho de su calle: las flechas, las rayas y los carriles por los que van los coches salen del mismo número.
  - En la autopista, los carriles llenan su ancho aunque el mapa diga menos (se perdían las líneas en San Benito).
- **Calles que desaparecían** (Jonay, C. Joaquín Turina: «esto es una carretera… ¿por qué es un descampado?»): una calle con un extremo fuera de la zona de juego perdía sus puntos de fuera; si solo tenía dos, desaparecía entera. Ahora se corta en el borde.
- **El terreno ya no asoma por encima del asfalto** (Jonay: «textura rara que se superpone a la pista… encoge si me alejo»): donde una calle va en ladera o se separan las calzadas de la autopista, el terreno quedaba unos centímetros por encima; ahora se rebaja bajo todo el asfalto.
- **Campos de fútbol y canchas planos, en terraza** (Jonay: «eso no puede pasar en un campo de fútbol, ni en este ni en ninguno»): a la altura de su punto más alto, con un muro de contención recto donde el terreno baja, la valla y las porterías a su altura; y si no caben, se encogen manteniendo las proporciones (Jonay: «si no cabe, reduce sus proporciones»).
- **Solares del casco cerrados con muro** (Jonay: «son terrenos que tienen muros… se completan con muros, salvo si hay un pasaje, de unos 2,50 de alto… para las zonas del casco»).
- **Isletas pintadas** (Jonay: «esto se atraviesa… deberíamos hacer esto como islas de marcas viales en todo el juego»): las de los ramales de las glorietas y las medianas de las calles urbanas son marcas en el suelo; ya no se atraviesan ni hay que saltarlas.
- **Ni farolas ni árboles atraviesan los puentes** (Jonay: «no puede haber farolas que atraviesen puentes desde abajo»): lo que llegaría al tablero de un puente que tiene encima no se pone.
- **Los contenedores de la C. Teobaldo Power, fuera de la calzada** (Jonay: «estoy harto de verlos en medio de la carretera»): en la acera de enfrente o en el terreno de detrás; nunca en la calzada.
- **Capas de carretera apiladas**: la altura del asfalto guarda dos capas por punto (la de arriba y la de debajo, si están a más de 1,5 m), y los coches se apoyan en la que tienen bajo las ruedas: una calle por encima de la boca de un túnel o un puente sobre otra calle ya no los sube.
- Las isletas urbanas no se pintan junto a una calle hundida, un túnel o un puente.
- Conocido: en la prueba de túneles y puentes, el coche no baja al túnel de San Benito junto a la Calle Espinero y no termina a tiempo un tramo de 1 km de la Autopista del Norte; se miran en el repaso de puentes y túneles.
- La búsqueda «¿hay un edificio aquí?» con rejilla, los arreglos de la 1.4.49 y la herramienta `foto_camara.py` (fotos con la cámara en cualquier punto).
- **Contador de FPS** (Jonay: «un contador de FPS y frametime activable en opciones, en una esquina superior derecha, me valdrá para hacer mis test»): Pausa → «Contador de FPS: Sí». Arriba a la derecha: fotogramas por segundo, el tiempo medio entre fotogramas y el peor de cada medio segundo, y el tiempo de CPU del fotograma (la lógica y el envío del dibujo; el trabajo de la tarjeta no entra). Se guarda con las opciones.
- La auditoría de obstáculos ya no le carga a la última calle construida los muros de los corredores (salían 346 en vez de 80 desde la 1.4.49).

## 1.4.49 — 2026-11-25 — Alpha 1.4.49: la Carretera de Geneto a su medida

- **Carretera de San Miguel de Geneto a su medida** (Jonay: «los carriles miden 3,25 m, en total la calzada 6,50 m; eso es una vía que ya no es urbana, hay zonas sin acera»): calzada de 6,5 m, y de 10 m desde la rotonda del Padre Anchieta hasta la Calle Las Mejoranas («cuando llega a la rotonda del Padre Anchieta… llega hasta 10 m»; antes toda a 11,7 m: por un tramo en terraplén conservaba entero su ancho viejo) y, donde los edificios no dejan sitio, sin acera. El tráfico usa el mismo ancho. Las calles medidas por Jonay van en `ROAD_REAL` (`01_core.js`). La auditoría ya no ve edificios invadiendo la carretera.
- El build ya no se para al copiar las canciones de la radio que ya estaban (Windows las tenía abiertas un momento).

## 1.4.48 — 2026-11-25 — Alpha 1.4.48: las calles mandan

- **Las calles mandan** (Jonay: «a partir de ahora las calles mandan, los edificios se ajustan a las calles y no al revés»): se acabó el ensanche inicial de las calles, que era lo que las metía dentro de los edificios. Anchos con norma: calle urbana de doble sentido 5,8 m, de un sentido 3,2 m, carreteras 7 m (carriles de 3,5 m), vías de servicio 4 m; si sobra sitio hasta las fachadas, la calle llega a ellas, y si falta, la acera (1 m) baja hasta la mitad solo donde la calle ya está en su mínimo. Puentes y túneles conservan su ancho.
  - Cada fachada se recorta en paralelo al borde de la acera; nunca se quitan edificios salvo casetas de menos de 30 m², y los vecinos siguen pegados (sin escalones ni huecos).
  - Tramos rectos sin arrugas (los puntos que zigzagueaban menos de medio metro se enderezan).
  - **Av. de La Trinidad** medida por Jonay: carriles de 3 m (6 m por sentido), tranvía en medio; los soportales ya no tienen muros en los extremos.
  - Las vías de servicio que pasaban por dentro de edificios se dejan como peatonales.
- **Edificios del Catastro** (Jonay: «haz una revisión con los datos reales del Catastro… sí, añádelos»): los ~3.100 edificios que faltaban quedan en ~840 y los «perdidos por el camino» de 43 a 13; las manzanas gruesas del OpenStreetMap (una sola planta para toda la manzana, como en la Calle Barcelona) se cambian por los edificios del Catastro uno a uno, con sus plantas. En total ~18.200 edificios (antes 9.400). Las plantas se simplifican (0,4 m) para no cargar la tarjeta: vértices 13,7 M → 11,9 M.
- **La carga, de 31 a 18 s**: «¿hay un edificio aquí?» recorría todos los edificios en cada pregunta (y con el doble de edificios, las plazas tardaban 2,2 s); ahora usa una rejilla.
- Arreglado: el rifle de agua podía salir disparado desde el centro del mapa tras teletransportarse (el jugador se congelaba como un actor lejano).
- Arreglado: un pretil en mitad de la Vía de Ronda; una barandilla de rampa de parking contaba como obstáculo en la calzada; los contenedores de la Calle Teobaldo Power, que no cabían en la acera nueva, van en la franja de aparcamiento.
- Arreglado: si una misión se cancelaba con su conversación en pantalla (la presentación de «Vuelta al barrio», por ejemplo), la conversación se quedaba abierta y no se podía empezar otra misión.
- Pruebas antiguas (076, 077, 079, fútbol, reventón con WebGPU) al día.

## 1.4.47 — 2026-11-23 — Alpha 1.4.47: tanda de pendientes rápidos

- **Misiones del Obispo alternadas** (Jonay: «me gustaría que la segunda misión del Obispo fuera el fútbol, no otra de basket»): ahora van basket (Catedral), fútbol (Seminario, con el tutorial), basket (Cristo) y fútbol (cofradías); los diálogos siguen el nuevo orden. Las partidas guardadas que ya habían hecho los dos basket pasan al fútbol del Seminario.
- **Los objetivos de los partidos nombran a todo el equipo** (Jonay: «ahora es 3x3, así que debe nombrar a los 3»): en basket, «con Coco y El Blanco»; en fútbol, «con El Blanco, Boca Papa, Sastrón y Coco» (ya erais cinco contigo: no hacía falta el Canarión).
- **Flechas de la calzada más pequeñas** (Jonay: «son demasiado grandes, desentonan»): al 75 % (5 m → 3,75 m).
- **Estrellas sin rayas** cerca del horizonte (también con WebGL): las celdas son ahora de la dirección en 3D, no de su proyección en un plano, que las estiraba.
- **Franja verde sobre el horizonte**: el monte lejano del fondo (Anaga, a ~4,5 km) salía casi sin neblina sobre una ciudad ya brumosa a 2 km; ahora tiene la neblina que le toca.
- **Sombras de borde más suave** (radio 2 en vez de 1; con el PCF de three.js r186+ no cuesta nada). Foto: `tests/herramientas/foto_sombras_radio.py`.
- **Mapas de reflejos a 128 px** (antes 256): son 32 desde que la pintura de coche tiene los suyos y ocupaban ~200 MB de la tarjeta gráfica; ahora ~55 MB.
- **Parterres de flores nuevos** en plazas y parques (Jonay: «¿qué se supone que es eso de colores sobre una caja verde?»): bordillo de piedra, tierra y una o dos filas de los arbustos de Blender (buganvilla, flor amarilla o boj), en vez de una caja verde con una bola aplastada de un color.
- **El Linguini Gold Edition frena un 20 % más** (Jonay: «además de correr un 20 % más, también debe frenar un 20 % más, o no hay quien lo frene»).
- La cortina de agua de la fuente de la Plaza del Adelantado ya no se congela con la ciudad (se anima; lo avisaba `prueba_congelados.py`).
- **Ya no se ve a través del Linguini por detrás** (Jonay: «se ve a través del coche, ¿qué es eso?»): el modelo tiene un hueco para la matrícula sin nada detrás, y la nuestra iba más abajo; ahora va en su hueco y lo tapa. Y el **Gold lleva matrícula «GOLD»**, negra con letras doradas (Jonay: «la matrícula del Linguini es más espectacular, debe poner GOLD»). Nueva herramienta para buscar huecos así en todos los coches: `tests/herramientas/sonda_huecos_coches.py`.
- **Arreglado: una llamada podía dejarte bloqueado** (Jonay: «me llamó el cura y no me deja seguir… al bajarme ya no funciona, se quedó el mensaje»): si el juego te rescataba (coche hundido, caída) o cargabas en mitad de una conversación, la cortaba pero dejaba su texto en pantalla para siempre, y la llamada del cura ya no volvía. Ahora se borra también el texto, y el cura vuelve a llamar.
- **Nadie te llama mientras conduces** (Jonay: «no debería llamar mientras conduces… aplica a todas las llamadas»): sale un aviso «📱 Te llama…» y la llamada suena al bajarte del coche.
- **Estrellas**: la cuarta parte, cada una con su brillo, y ya no se reflejan en la chapa de los coches (Jonay: «hay demasiadas estrellas… hacen que refleje demasiado en el coche»).
- **Matrícula del Linguini a la medida de su hueco** (0,36 × 0,10 m, a ras de la carrocería: «así parece pegada encima») y la del Gold con **reborde plateado**.
- **Los bancos robados de la misión del alcalde son bancos de verdad** (los del parque, uno en el suelo y dos boca abajo encima), no tres tablas flotando.
- **Arreglado: la pantalla negra con WebGPU** (Jonay: «se volvió a poner negro, WebGPU… efectivamente cambiando la hora provocó el bug»): al amanecer y al anochecer se apagaba y encendía la sombra del sol, y apagarla destruía su mapa de sombras mientras los grupos de dibujo de WebGPU seguían usándolo: desde ese momento fallaba cada fotograma. Ahora la sombra nunca se apaga: de noche se hace invisible y no se recalcula (no cuesta nada). Si aun así WebGPU diera errores seguidos, se guarda la partida y se recarga con WebGL, **solo hasta cerrar el navegador** (antes, la vuelta a WebGL se quedaba para siempre). Prueba: `tests/herramientas/sonda_negro_webgpu.py`.
- **Tanda de fallos gráficos del mapa** (Jonay: «vamos a ir a por una tanda de mejora de glitch gráficos, con las calles, tiendas, edificios y mapa en general»):
  - **Coches que flotaban o se hundían**: se apoyaban en «terreno + 17 cm», pero las vías con perfil propio se dibujan planas de lado a lado (y los terraplenes, por encima del terreno). Ahora se apoyan en el asfalto tal como se dibuja (rejilla de 2 m hecha al construir las calles, 6,7 MB): las ruedas quedan a 0–2 cm del asfalto en todos los modelos, y los aparcados ya no salen enterrados. Herramientas: `sonda_ruedas_suelo.py`, `sonda_alturas_suelo.py`.
  - **Glorietas**: los edificios que pisaban el anillo se recortan siguiendo el círculo (la fachada se curva con él); una caseta de 35 m² que estaba en la isleta de la Av. La Libertad se quita (Jonay: «no me quites edificios… a no ser que sea una caseta»).
  - **Tejados volando sobre la calle**: el tejado a cuatro aguas de un edificio estrecho o recortado podía salirse de la planta (Calle Juan de Vera); ahora, si no cabe, va más bajo, y si aún no cabe, plano (96 de ~1.960).
  - **Talud de césped sobre la Carretera General del Norte** (pasarela): ya no se pone encima de una calle que empalma con la rampa.
  - **Barandilla en la boca de las rampas de los parkings**: ya no se puede saltar al hueco desde la losa.
  - **Luz de las farolas**: era un cuadrado plano 30 cm sobre el suelo que hacía brillar pies, bordillos y ruedas («como niebla»); ahora va pegada al asfalto. Y las **ventanas encendidas** de noche ya no son rectángulos blancos: cada una con su tono cálido, más luz arriba y alguna cortina.
  - **Casa del Linguini**: los cristales y la rejilla del garaje ya no parpadean (estaban en el mismo plano que la fachada).
  - **La gente ya no aparece de golpe delante**: los peatones nuevos aparecen fuera de la vista o a más de 110 m, y se quitan a 170 m.
  - **Motos quitadas del tráfico** hasta que las hagamos en Blender (Jonay: «vamos a desactivarlas del juego por ahora»).
- Revisados los avisos del análisis estático de la auditoría 1.4.46 (`arbGeo`, jardineras, `carPaintMat`): son de la carga o de coches nuevos al aparecer (la reserva reutiliza su pintura), no de cada fotograma.

## 1.4.46 — 2026-11-23 — Alpha 1.4.46: WebGPU por defecto y arreglos (personaje, troncos, tarjeta perdida)
- **WebGPU por defecto** (Jonay: «por defecto debería ir con WebGPU, si no se puede WebGL… quita lo de pruebas, están funcionando los dos»): el juego arranca con WebGPU si el navegador lo arranca de verdad (que dé la tarjeta y que three.js quede en su motor WebGPU); si no, con el WebGL de siempre, sin avisos ni errores. En Opciones, «Motor gráfico» ya no dice «pruebas», y elegir WebGL se respeta. Los navegadores automatizados (nuestras pruebas y la auditoría) siguen con WebGL salvo que se pida WebGPU, porque sus mediciones solo existen ahí.
- **Árbol de calle y setos de jardinera nuevos** (Jonay: «el árbol de calle es el más feo… desentona demasiado, igual que los setos, que son de color amarillo y otros colores, están muy simplones»): hechos en Blender (`tools/blender/arboles_calle_v2.py`). El árbol tiene un tronco más grueso que se abre en cuatro ramas y una copa de paraguas con varios verdes (910 triángulos, 80 de lejos). Las jardineras llevan borde, tierra y uno de tres arbustos: boj, buganvilla con flores magenta o flores amarillas (antes, una bola de un solo color: verde, amarillo o rosa).
- **Pintura de coche con barniz** (Jonay: «¿habría forma de que el color de los coches tenga una textura más metálica brillante? Ahora es demasiado liso el color, sin brillos como una carrocería real… aplícalo, a ver si se pudiera en todos»): la carrocería lleva una capa de barniz de brillo nítido sobre un metalizado (`carPaintMat`, `06_actors.js`), en tu coche, el tráfico, las motos y los aparcados (en estos, solo sobre la pintura). La pintura refleja su propio entorno, el cielo sobre un suelo oscuro con la línea del horizonte (`setCarEnv`, `13_main.js`); el resto del juego sigue con el de antes. Debajo del barniz, **granito metalizado** (Jonay: «añade ese barniz y pintura metalizada y todo lo que le dé mejor textura de coche que cueste poco»): celdas de ~3 mm un poco más o menos pulidas e inclinadas que destellan en los brillos; el barniz de encima sigue liso, y el granito se apaga de lejos para que no parpadee (`carFlakeGLSL` en WebGL, `gpuCarFlake` en WebGPU). Coste medido: 0–3 FPS. Para medir sin él: `&sinbarniz=1`. Fotos: `tests/herramientas/foto_pintura_gpu.py`.
- **Linguini Gold Edition más potente** (Jonay: «métele aún más potencia y punta»): ahora corre un 20 % más que el Linguini normal (324 km/h y aceleración 17,3, frente a 270 y 14,4); antes era un 10 % más (297 y 15,8).
- **Arreglado: el personaje no salía con WebGPU** (Jonay: «empecé otra y no sale el pj»). WebGPU, al preparar los sombreadores al cargar, avisa de «antes de dibujar» y no de «después»: el recorte de lejanos dejaba al personaje oculto a medias y la preparación de sombras de la 1.4.44 lo dejaba así. Además, ese recorte ya solo actúa con la cámara del juego (WebGPU también lo llamaba al dibujar las sombras, desde el sol, a ~320 m).
- **Arreglado: árboles sin tronco** (Jonay: «¿árboles sin tronco, qué pasó?»): al indexar las geometrías de los árboles (arreglo de memoria de la 1.4.44) se perdió el índice de las que ya lo tenían, y los troncos se dibujaban como triángulos sueltos.
- **Si se pierde la tarjeta gráfica** (Jonay: «se quedó todo negro aquí de golpe… al teletransportarme sigue negro», con WebGPU): el juego lo detecta, guarda la partida en la ranura automática, avisa y recarga; si pasa dos veces seguidas con WebGPU, recarga con WebGL.
- **Consola más limpia**: fuera el aviso de `PCFSoftShadowMap` (ya no existe en three.js; era el mismo PCF), la lectura lenta de la hierba (`willReadFrequently`) y un salto de más en el recorte de trincheras de WebGPU. `?trazastsl=1` dice de dónde sale cada aviso de TSL.
- **Carga más rápida**: la preparación de los sombreadores de sombra muestra una pieza de cada tipo en vez de todo el mapa (antes, ~3 s).
- **Arreglado con WebGPU: todos con la misma ropa** (Jonay: «el muñeco va de blanco, antes de verde… pasa en todos los hombres… de pronto se puso la ropa de otro color»): los materiales de la gente comparten un mismo programa y WebGPU usaba los colores del primero para todos; ahora cada persona lee los suyos al dibujarse. Lo mismo con la fuerza de la piedra y el tipo de enlucido de cada material.
- **Arreglado con WebGPU: Boca Papa, Coco y el interior del Café Brasilito no salían** (Jonay: «Boca Papa y su círculo inicial tampoco salen… al entrar al Brasilito se rompió todo»): el mismo fallo que ocultaba al personaje (la gente y las habitaciones se quedaban ocultas a medias al cargar).
- **El coche vuelve a girar como antes por debajo de 150 km/h** (Jonay: «el coche gira demasiado poco desde que hicimos lo de que reaccionara menos a alta velocidad… eso debería empezar a actuar si vas a más de 200 solo, y aun así que gire un poco más que ahora… o hazlo a partir de 150»): el límite de giro y el volante más lento solo entran a partir de 150 km/h, poco a poco hasta ~205 km/h, y dejan girar un 25 % más que en la 1.4.43.
- **La marcha se ve en cualquier velocímetro** (Jonay: «el cambio no se ve bien según en qué cuentakilómetros, el contraste es malo y además se superpone»): ahora va fuera de la esfera, a su derecha, en una pastilla oscura con la marcha en blanco y la barrita de revoluciones debajo (en rojo cerca del corte).
- **Cada coche con sus marchas** (Jonay: «todos los coches no tienen los mismos cambios, los hay de 5, 6 e incluso 7»): cada modelo tiene las suyas según lo que es: utilitarios de 5 o 6, berlinas y SUV de 6 (algunos de 7), furgonetas de 5 o 6, deportivos de 6 o 7, camiones y guaguas de 6 u 8.
- **Motores más graves** (Jonay: «el sonido de los coches debería ser más grave… bájalo un 10 %… más bajo todos en general, no el deportivo»): todos los motores un 28 % más graves (el tono; las revoluciones y las marchas no cambian).
- Sin el aviso de `powerPreference` en Windows con WebGPU (Chrome y Edge no lo usan allí).
- Herramienta: `sonda_motor_defecto.py` (qué motor elige el juego: Chrome sin elegir, un navegador sin WebGPU de verdad y con WebGL elegido).

## 1.4.45 — 2026-11-23 — Alpha 1.4.45: un motor para cada coche, cambios en el velocímetro y más distancia de visión
- **Un sonido de motor para cada tipo** (Jonay: «no puede ser que suene igual un deportivo que un utilitario pequeño o una guagua… el sonido debería ir acorde a la aceleración»): sintetizados, sin grabaciones, a partir de los cilindros de cada uno: utilitario de 4 cilindros, berlina, SUV y furgoneta diésel (con su traqueteo y turbo), deportivo V8 (retumbe del escape y petardeos al soltar), guagua y camión diésel grandes, moto y eléctrico (solo un silbido que sube con la velocidad). Suena más fuerte y áspero al pisar y más suave al soltar.
- **Los coches de alrededor también suenan** (Jonay: «aplícalo también, pero el sonido de todos en general que no sea muy exagerado, que deje oír bien la música»): los tres más cercanos, cada uno con su motor y su marcha según la velocidad, bajitos (se apagan a partir de unos 12 m y callan a 70 m), a izquierda o derecha según dónde estén y con el efecto Doppler al pasar. Tu motor suena algo más bajo que en la primera versión (un 25 % menos y luego, a petición de Jonay, un 10 % más). El claxon ya era distinto por tipo.
- **Caja de cambios automática en el velocímetro** (Jonay: «poner cambios que se vean en el cuentakilómetros aunque sea automático, así cambiaría el sonido al subir marchas»): la marcha (1ª, 2ª… R, N; D en el eléctrico) y una barrita de revoluciones que se pone roja cerca del corte. Cambia cerca del corte si vas a fondo y antes si vas suave; al cambiar, el motor corta un instante y baja de vueltas. Cada tipo tiene sus marchas: la guagua cambia muy pronto y el deportivo estira la 1ª hasta ~80 km/h. Solo afecta al sonido y al velocímetro, no a la conducción.
- **Más distancia de visión en calidad alta** (Jonay: «sí, súbelas»): la ciudad se ve hasta 1.500 m (antes 1.150) antes de la niebla, la gente hasta 255 m (antes 170) y los coches en marcha hasta 540 m (antes 360). El tráfico sigue apareciendo a la misma distancia (si no, los mismos coches se repartirían en más terreno). Medido: WebGPU por encima de 60 FPS; a 1.800 m bajaba de 60.
- Herramientas: `sonda_marchas.py` (la caja automática de cada tipo), `audio_motores.py` (graba cada motor para escucharlo), `audio_trafico.py` (a pie viendo pasar coches y conduciendo con la radio, para el equilibrio con la música).

## 1.4.44 — 2026-11-23 — Alpha 1.4.44: 60 FPS en alta a 1080p, WebGPU más rápido que WebGL
- **El cielo ya no frena el juego**: las nubes se calculaban en cada píxel de la pantalla con 10 capas de ruido, también detrás de los edificios (unos 4 ms por fotograma a 1080p con una RX 6600). Ahora ese ruido se calcula una vez al cargar, en una textura, y el cielo la lee. Las nubes tienen el mismo aspecto. Con esto, en calidad alta a 1080p el juego va a 60 FPS (antes, 44-49).
- **La ciudad quieta no se recalcula**: al terminar de construirla se fijan las posiciones de los ~14.500 objetos que no se mueven, y la gente lejana u oculta deja de recalcular sus huesos (unos 9.000 por fotograma). Si algo fijado se mueve, se suelta solo (lo vigila el juego y lo apunta para las pruebas).
- **Sombras más baratas, iguales a la vista**: los árboles proyectan su sombra con la copa y el tronco simplificados (los de lejos), en una copia que solo ve la cámara de las sombras: el árbol que se ve sigue igual. La gente y los coches dejan de proyectar sombra a más de 40 y 70 m, donde ya se les quitan los detalles pequeños. En la pasada de sombras, de 409.000 a 185.000 triángulos de árboles y de 325 a 271 llamadas de dibujo.
- **WebGPU, en pruebas** (Jonay: «WebGPU es el objetivo al que queremos llegar»): con `?gpu=webgpu` en la dirección, el juego usa el motor WebGPU de three.js. El cielo y los 7 retoques de materiales (fachadas, piedra, enlucido, terreno, trincheras, ropa de la gente, faros y coches aparcados) están pasados a su lenguaje (TSL) y se ve igual. La ciudad quieta va grabada en `BundleGroup` por celdas de 250 m (three.js repite el dibujo grabado sin apenas gastar procesador; cada celda se apaga si no la ven ni la cámara ni la zona de sombras, y se regraba si cambia lo que se ve dentro), y lo que no cambia va marcado `static`. Con todo, WebGPU empata con WebGL (56-60 FPS a 1080p en alta) y aguanta algo mejor cuando el PC va cargado. Sigue siendo WebGL por defecto. three.js va ahora en un solo módulo con WebGL y WebGPU (1,5 MB en vez de 0,83).
- **Árboles y coches aparcados en `BatchedMesh`** (las notas de three.js de la r161 a la r187): antes eran un grupo instanciado por tipo y celda (~211 y ~96 llamadas de dibujo en pantalla); ahora todos los árboles de un material y todos los aparcados van en uno solo, que three.js recorta uno a uno y dibuja de una vez. Cada árbol y cada coche elige su versión de cerca o de lejos como antes. `?sinbatch=1` vuelve al sistema anterior para comparar.
- **Gente más ligera de lejos**: a más de 35 m el cuerpo de cada persona usa una versión simplificada al cargar (sus vértices juntados a 3 cm, 6 cm a más de 70 m, con su esqueleto, sus texturas y sus zonas de ropa): de 12.600 a ~4.600 triángulos, sin diferencia a la vista. Los ojos y las cejas, que se dibujaban hasta a 170 m, se ocultan a más de 40 m como los demás detalles pequeños.
- **Sombras de aparcados y gente**: los aparcados proyectan su sombra con su versión ligera; la gente, hasta 25 m.
- **Sin tirones al ver sombras nuevas**: al final de la carga se preparan todos los sombreadores de sombra de una vez (la auditoría ya no ve ninguno preparado por el camino).
- **WebGPU más rápido que WebGL**: con todo lo anterior y los árboles también grabados en los bundles, WebGPU va a 62-69 FPS a 1080p en alta (WebGL, 52-63).
- **Límite de FPS en Opciones** (Jonay: «el limitador de FPS lo podemos poner como una opción del juego, por defecto a 60… con una barra que puedas desplazar hasta 144»): barra de 30 a 144 en la pausa, que se aplica al momento; por defecto 60 en PC y 30 en móviles y tabletas. Los minijuegos 2D siguen a 60. En nuestras pruebas no hay tope, para medir la velocidad real, y `?fps=N` en la dirección lo fuerza.
- **Motor gráfico en Opciones**: WebGL (el de siempre) o WebGPU (pruebas), con «Aplicar y recargar». Si el navegador no tiene WebGPU, sigue con WebGL.
- **El doble de distancia de detalle en calidad alta** (Jonay: «si vamos sobrados de FPS aumentaremos la distancia de dibujado… se nota en las llantas de los coches»): coches aparcados completos y con sus llantas detalladas, copas completas de los árboles, rótulos y detalles de la ciudad, piezas pequeñas de coches y gente y cuerpos completos, todo al doble de distancia. Medido: sigue por encima de 60 FPS en los dos motores (a ×2,5 WebGL bajaba de 50). `?dist=X` en la dirección prueba otros valores.
- Pruebas: la del garaje del Linguini Gold ya no falla cuando una prueba anterior deja al jugador muerto. Nuevas herramientas: `sonda_webgpu.py` (compara los dos motores; `--pr` y `--js` para buscar qué cuesta), `foto_webgpu.py` (las mismas vistas con los dos) y `prueba_congelados.py`.

## 1.4.43 — 2026-11-23 — Alpha 1.4.43: curvas a gran velocidad, golpes más justos y three.js r187
- **Curvas a gran velocidad** (Jonay: «más que girar menos debería girar más lento… las curvas son intratables a tanta velocidad»): el volante deja girar el doble que en la v1.4.41 (unos 30 m/s² de lado: a 300 km/h, curvas de unos 230 m, las de la autopista), pero cuanto más rápido vas, más despacio llega al tope (a 300 km/h tarda casi un segundo). En ciudad se conduce igual.
- **Golpes más justos** (Jonay: «al salir del garaje con el Linguini me maté apenas choqué un poco con la valla de enfrente»): por debajo de unos 36 km/h el coche no hace daño, cada km/h de más quita algo menos y un roce largo contra la misma valla cuenta como un solo golpe. Un choque de frente contra un muro a 300 km/h sigue matando.
- **Barra de salud con el %**: más alta, con el número encima, y a partir del 15 % se pone roja y parpadea.
- **Carreras de controles sin volver por la misma calle**: la ruta evita repetir la calle de la ida (antes la vuelta pasaba por encima de la ida).
- **C. Tacoronte 67**: la casa va en espejo, con el garaje cuesta abajo, al oeste, como la real. Se quita el número 67 de la puerta.
- **three.js r187** (antes r160): el motor 3D al día. Los coches aparcados conservan sus colores con el cambio del motor y el `build.py` toma la versión del propio archivo.
- **Créditos**: vehículos y música, «creación propia».
- `build.py` ya no borra el archivo de coches viejo (bastaba con el primer build de la v1.4.42).

## 1.4.42 — 2026-11-23 — Alpha 1.4.42: sin rastro de Kenney y pruebas al día
- **Sin rastro de Kenney**: el archivo de los coches pasa a llamarse `data/coches.json` y en el código ya no queda su nombre. El primer build borra el archivo viejo y el convertidor de sus modelos. Solo quedan los coches propios hechos en Blender.
- **Rifle de agua**: al apuntar, la mano izquierda vuelve a agarrar el guardamanos. Desde que el rifle se separó del cuerpo (v1.4.22), la mano quedaba colgando a 15 cm.
- **Persecuciones**: el plan de conducción ya no falla con un coche sin mandos.
- **Pruebas revisadas**: 13 pruebas viejas fallaban porque el juego había cambiado. Se ponen al día los récords de las recreativas (primero las iniciales y luego el continuar), la leyenda («Tu vivienda»), el blanco de los coches (5 de cada 111), las distancias de detalle de la ciudad, los peatones mojados (la mitad huye) y los modelos viejos. A la pelea se le dan más intentos cuando el navegador pierde una tecla.

## 1.4.41 — 2026-11-22 — Alpha 1.4.41: Linguini Gold Edition, autopista sin golpes invisibles y Niza Nano nuevo
- **El golpe invisible de la Autopista del Norte** (X 1898, Y 3225, a 300 km/h «estás muerto»): ahí la autopista va sobre un tablero que gira y se separa del trazado. La baranda empujaba el coche hacia la esquina del tablero, de frente, y lo frenaba en seco (un golpe de 75 m/s). Ahora la baranda solo empuja de lado, y cada tablero solo sujeta al coche que va encima de él.
- **Menos giro a gran velocidad**: el volante nunca gira más de lo que aguantan las ruedas (unos 15 m/s² de lado). En ciudad se nota poco; a 300 km/h la curva más cerrada tiene unos 460 m de radio. El freno de mano sigue dejando cruzar la cola.
- **Peatones fuera de los puentes**: nadie camina ya por puentes, calles elevadas ni calles hundidas en trinchera (se les ponía a la altura del suelo de debajo y parecían andar por el aire).
- **C. Tacoronte 67 (Finca España)**: la casa recreada con las fotos de Jonay. Tiene cuatro plantas color melocotón, balcones volados con balaustrada blanca, zócalo de granito, puerta blanca con el 67, ventana con reja de forja y jardinera, y un murete con balaustrada y pilares con bolas. Se abre un hueco en el bloque del OSM. Delante no aparcan coches ni crecen matas.
- **Linguini Gold Edition**, el coche secreto: el Reventón en oro pulido y un 10 % más rápido (297 km/h). Espera en el garaje de la casa. El botón junto al portón lo abre y lo cierra (el portón seccional sube y se recoge bajo el techo). Si se deja lejos, vuelve solo a su garaje.
- **Niza Nano** rehecho con la librería nueva (aprobado por Jonay): malla nueva de cerca y de lejos y medidas del Micra real.
- **Créditos** de la pantalla inicial y `CREDITOS.md` al día: fuera Kenney (no queda ningún modelo suyo desde la v1.4.21). Se añaden el Catastro, Mapillary, el MDT05 del IGN, Poly Haven, three.js y las tipografías. La música es original de Jonay, hecha con Suno.

## 1.4.40 — 2026-11-21 — Alpha 1.4.40: límite de 60 FPS
- El render del mundo 3D y de los minijuegos queda limitado a 60 FPS también en monitores de alta frecuencia. Las simulaciones mantienen sus pasos de tiempo.

## 1.4.39 — 2026-11-21 — Alpha 1.4.39: Reventón, calzadas y garajes
- Linguini Reventón híbrido con el capó corregido, las ópticas a ras y las llantas aprobadas. La malla lejana conserva su perfil de juego.
- Las vallas, quitamiedos y pretiles de trinchera comprueban la calzada y los carriles auxiliares a la altura que corresponde. Se despeja el cruce de la avenida de los Menceyes y la auditoría busca barreras lineales también después de construir el mapa. San Antonio lleva una marca plana sin colisión y se descartan construcciones auxiliares pequeñas que aún entran en una vía rápida.
- Los coches aparcados en los garajes subterráneos se eligen del catálogo y se pueden conducir. El acceso distingue la planta del vehículo. Los aparcados conservan sus llantas detalladas a media distancia y se amplía la distancia de los detalles del escenario.
- Los peatones usan arcenes exteriores y aceras, cruzan deprisa y evitan autopistas y enlaces. Los avisos de zona peatonal se limitan a las calles peatonales del casco, plazas y canchas.
- El diario permite seguir una misión en curso o la siguiente de una línea y dibuja su ruta con su color en el mapa y minimapa. Reiniciar queda disponible en las misiones completadas.
- Los peatones que reciben un chorro de agua tienen frases distintas. La mitad huye y la otra mitad persigue al jugador y puede iniciar la pelea 2D si lo alcanza.
- Las luces de freno suben de intensidad conservando el rojo de la óptica.
- Las paradas siguen la curva y el desnivel de la vía, las rampas se apoyan en el suelo y el cebreado amarillo de Pedro Zerolo queda por encima de la plataforma. Se descartan plazas de aparcamiento cuyo vehículo invadiría las vías a nivel de calle. Los contenedores de Teobaldo Power se colocan en la acera con espacio para toda la caja.

## 1.4.38 — 2026-11-21 — Alpha 1.4.38: doce coches y sus llantas revisadas
- Nuevas mallas activas de Troceen C33, JTM Capítulo 3, Yoos Cartabón, Pancho Teypan, Piki Crocante, Totuya Yaiza Cross, Guanchazen Helado, Totuya Carlota, Newton Style 3, Martini Hubli, Fierilla 440 y Seta Gomera.
- Las llantas de estos modelos llevan diseños propios y centros lisos. El aro y el neumático de cerca comparten la misma resolución circular. Sus ruedas mantienen las proporciones de Blender en tráfico, aparcadas y al conducir. Cada coche tiene una malla detallada y otra para la distancia.
- El C33 lleva techo negro fijo, barras, llantas de seis huecos y ópticas enrasadas.

## 1.4.37 — 2026-11-20 — Alpha 1.4.37: faros visibles y pisadas más suaves
- Los faros delanteros de los coches de Blender emiten luz cuando oscurece. Se iluminan sus propias superficies con el material de la carrocería.
- Las pisadas de asfalto usan la muestra A elegida por Jonay. El resto de los suelos conserva su carácter con menos agudos. Las pisadas al caminar y correr se reproducen con la mitad de ganancia.

## 1.4.36 — 2026-11-20 — Alpha 1.4.36: leyenda del mapa y HUD al conducir
- La leyenda del mapa identifica las jugueterías, entradas, casas y sitios con recreativas. Distingue las rutas del GPS, los objetivos, los controles y los fugitivos.
- La leyenda se puede plegar. En móvil abre plegada para dejar libre el mapa y la ayuda explica los gestos táctiles.
- El indicador de arma se oculta al subir a un vehículo y reaparece al salir. La radio queda libre de cruces.

## 1.4.35 — 2026-11-20 — Alpha 1.4.35: controles de Xbox, móvil y radio
- Xbox usa los sticks para moverse y mirar, A para saltar o frenar de mano, X para usar y Y para entrar o salir. Los gatillos sirven para apuntar y disparar a pie, o frenar y acelerar en coche. Añade navegación en menús, diario y GPS.
- La radio muestra los clics anterior/siguiente y Q en PC, y los controles de cruceta y RB con mando. En móvil hay botones para ambas direcciones.
- Móvil separa Usar de Entrar, añade acceso a la brújula y un botón Atrás en los minijuegos que permiten salir. Las guías de controles, deportes y recreativas muestran los botones del dispositivo.

- La salida del Canarión queda por delante de su coche en el sentido de La Trinidad. La cuenta atrás alinea a ambos coches con el trazado.

## 1.4.34 — 2026-11-20 — Alpha 1.4.34: dos temas más en Mojo Picón
- Mojo Picón suma Sin Piedad en el Radar y Llamada a Deshora. La emisora de trap tiene cuatro canciones.

## 1.4.33 — 2026-11-20 — Alpha 1.4.33: cambiar de canción al volante
- Con el ratón capturado al conducir, el clic izquierdo vuelve al tema anterior y el derecho pasa al siguiente. Q cambia de emisora. La rueda mantiene el zoom y el volumen se ajusta en Opciones.
- Gofio FM añade Empty Seat y pasa a siete canciones.

## 1.4.32 — 2026-11-20 — Alpha 1.4.32: cinco temas más en Gofio FM
- Gofio FM suma Broke & Famous, Lowrider Breeze, No Brakes, No Favors y Still Running the Island. La emisora tiene seis canciones.

## 1.4.31 — 2026-11-20 — Alpha 1.4.31: canciones originales e indicador de la radio
- Sobre el indicador del arma se muestran la emisora y el tema que suena. Los títulos largos se desplazan y el botón Cambiar muestra el atajo Q en PC.
- Las tres emisoras estrenan canciones originales: una de hip hop en Gofio FM, siete de reggaetón en Radio Aguere y dos de trap en Mojo Picón. Los MP3 se cargan al sintonizar la emisora y respetan los ajustes de volumen.

## 1.4.30 — 2026-11-20 — Alpha 1.4.30: pinos de Camino Tornero
- Los pinos canarios recuperan la copa verde y la corteza marrón. La copa lejana lleva el mismo color.
- El exportador de Blender asigna estos colores al pino para conservarlos en futuras exportaciones.

## 1.4.29 — 2026-11-20 — Alpha 1.4.29: dibujo agrupado de monumentos
- La Concepción, el barrio inicial, los edificios singulares y el aeropuerto pueden compartir una llamada de dibujo entre piezas estáticas opacas del mismo material y celda, dentro de su grupo original.
- Las piezas conservan sus triángulos, el orden de dibujo y las propiedades de sombra. Se mantienen la resolución y el filtrado de las sombras.
- En las vistas de prueba a 1080p, el estadio pasa de 509 a 501 llamadas de dibujo y el barrio inicial de 725 a 723. La Concepción y el aeropuerto ya agrupaban sus piezas compatibles.

## 1.4.28 — 2026-11-19 — Alpha 1.4.28: visibilidad de la ciudad por celdas
- Se comprueba la distancia de grupos estáticos juntos y se vuelve a medir cada malla solo en los bordes o cuando cambia su visibilidad.
- La bruma de cielo despejado termina 75 m antes en alta y 45 m en media. El paisaje lejano, las sombras y los umbrales de detalle cercano conservan sus valores.
- El recorte de coches aparcados usa distancias al cuadrado y cambia la malla solo al cruzar el umbral existente.

## 1.4.27 — 2026-11-19 — Alpha 1.4.27: Clever OneTwo y huida por Las Quinteras
- Clever OneTwo en calles y aparcamientos, con célula plateada y paneles repintables. 14.845 triángulos de cerca y 2.222 de lejos.
- Los coches civiles que circulan y los aparcados, también los de aparcamientos grandes, comparten 21 pinturas. El blanco baja a aproximadamente un 4,5 % de la paleta. Los servicios conservan su librea.
- Las presentaciones avanzan desde La Concepción hacia La Trinidad. Sastrón espera en la calle el Juego, allí se firma la banda y la carrera del Canarión acaba cerca con dinero suficiente para pagarle.
- El atraco en la farmacia termina en el aparcamiento abierto de Las Quinteras, a pocos minutos a pie del Ayuntamiento.
- El GPS permite dar la vuelta en calles normales si ahorra un rodeo, calcula las rutas directas en la misma calle y prefiere menos la autopista. Respeta el sentido en vías rápidas.
- GUFO, Bencomo y Guanche Guarriors guardan las iniciales antes de CONTINUE. La preparación de dibujos de peleas queda en el mundo y en la entrada; se pausa durante el combate.
- La pistola exige apuntar antes de disparar con el ratón o mediante los botones táctiles.

## 1.4.26 — 2026-11-19 — Alpha 1.4.26: MP YOU y variedad de vehículos
- MP YOU de Blender, con 13.887 triángulos de cerca y 1.721 de lejos. Aparece aparcado y en circulación.
- 17 colores para los vehículos civiles. El blanco baja al 9 % del sorteo de pintura y los servicios conservan su librea.
- Los pesos de aparición se acercan entre sí y hay más vehículos pesados en las vías principales.
- Velocidad punta y aceleración por categoría, con ajustes por modelo. El Linguini Reventon encabeza el catálogo y el Antonias Basurón es el automóvil más lento.

## 1.4.25 — 2026-11-19 — Alpha 1.4.25: seis cuadros de velocidad
- Cada vehículo lleva un cuadro según su modelo: básico, de trabajo, urbano, todoterreno, de lujo o deportivo. Conservan el nombre, la lectura en km/h y el acceso a la radio.

## 1.4.24 — 2026-11-19 — Alpha 1.4.24: velocímetro, vallas deportivas y marcadores 2D
- Persecuciones y carreras: los puntos intermedios en rectas ya no cierran las curvas. La carrocería y las ruedas del rival giran progresivamente al entrar en curva.
- A petición de Jonay, el velocímetro tiene esfera, aguja y lectura digital y nombre del vehículo junto al minimapa en PC. Se conserva el cambio de emisora al pulsarlo.
- Los muros y postes deportivos comparten una caja y la malla metálica se construye por recinto, conservando accesos y colisiones.
- GUFO reserva una fila para los créditos. Los minijuegos 2D arrancan al soltar el ratón y se pausan al salir de pantalla completa.

## 1.4.23 — 2026-11-17 — Alpha 1.4.23: el Torneo y la Copa recorren la ciudad hacia su final
- **Revisión de por dónde llevan las misiones** (Jonay, 17-nov): mapa de dónde empieza cada misión de cada línea
  (`tests/herramientas/mapa_misiones.py`, que guarda `shots/misiones_mapa.json`). La historia va y viene por el casco
  (casa de El Blanco, Ayuntamiento, La Concepción, Juan de Vera; ningún salto de más de 1 km) y sus huidas y
  persecuciones ya acaban hacia la siguiente; el Obispo, la Secreta y las carreras salen siempre de su sitio.
- **Torneo Lagunero y Copa Laguna**: los partidos se eligen como un recorrido hacia el campo de la final (el Pabellón
  Juan Ríos Tejera y el Estadio Francisco Peraza), con saltos cortos entre uno y otro. Antes se encadenaban sin mirar
  dónde estaba la final: la Copa saltaba 1,5 km y luego 3 km hasta el Peraza; ahora, saltos de 430–520 m y 1,45 km
  hasta el Peraza, que no tiene campos cerca. El Torneo, saltos de 370–460 m (antes hasta 1,2 km).

## 1.4.22 — 2026-11-17 — Alpha 1.4.22: rivales que conducen como coches, campos vallados, móvil completo, euros y noche más clara
- **Conducción de rivales y enemigos** (Jonay: «corren bien en recta pero frenan muy rápido y trazan las curvas girando
  90 grados; el giro debe ser normal como cualquier coche, incluso usando freno de mano, porque es una persecución»):
  la ruta se convierte en una trazada de coche (cada esquina con un radio de giro de verdad, tan abierto como deja la
  calle), con un plan de velocidad: en cada curva tan rápido como da el agarre, frenando a tiempo con los frenos de un
  coche (nada de pararse en seco) y acelerando como un coche. En las persecuciones derrapan en las curvas cerradas
  (el morro se mete en la curva, las ruedas contravolantean, freno de mano). Vale para todas las misiones (huidas,
  rally, guaguas, agua) y para la carrera del Canarión; las guaguas, más suaves.
- **Campos de fútbol y canchas vallados** (Jonay: «muro y valla alta alrededor con uno o dos accesos»): muro bajo con
  valla metálica alta encima; la entrada, hacia la calle por la que se llega (antes siempre el mismo lado, a veces
  contra una pared); los campos grandes, otra puerta en el lado opuesto si hay sitio. Arreglado también un fallo por el
  que casi ninguna valla de cancha llegaba a dibujarse.
- **Móvil** (Jonay: «repaso de todos los controles para móvil»): botón de pausa (con ella, opciones, controles y
  guardar: antes no había forma de llegar), diario, GOLPE a pie (RADIO en el coche) y ENDEREZAR el coche. Los
  minijuegos (baloncesto, fútbol, recreativas, Bencomo, naves...) tienen por fin mando táctil: cruceta, A, B, C y pausa
  (en pausa, C sale del minijuego).
- **Misiones**: el Obispo se abre al firmar la banda (antes, con las del alcalde y sin que nadie lo dijera): llama Don
  Celestino, el párroco de La Concepción, y lo marca en el mapa. Los sitios a los que te mandan algunas misiones (la
  nave de los bancos del Adelantado, la del gofio, la del pirómano) quedan de camino a la siguiente misión, a menos de
  un kilómetro (antes, de Las Gavias a la Alhóndiga).
- **Rifle de agua**: chorro continuo (antes, gotas sueltas); sale hacia el punto exacto de la mira, en la curva que cae
  ahí (antes caía a un lado); al apuntar la culata queda en el hombro, sin meterse en el pecho. Boca Papa duerme en un
  banco de verdad y cada acierto dice «¡En la cabeza!» o «¡En el cuerpo!».
- **Euros**: todo el dinero del juego en euros («1.250 €»; antes «$»). El rifle de agua cuesta 2.500 € en la juguetería
  (hacen falta varias misiones) y las bolitas, 8 € la bolsa.
- **Noche más clara**: charcos de luz de las farolas más grandes y claros, ventanas, rótulos y faros más brillantes y algo
  más de luz ambiente.
- **La franja verde de monte flotando en el cielo**, fuera: el paisaje lejano empieza ya fuera del mapa.
- **Hierba**: solo en el campo (a 30 m de casas y calles; antes 8 y 12) y nunca en rampas, trincheras ni bajo puentes
  (la que flotaba en la rampa del aparcamiento de Trinidad Centro).
- Las peleas con un peatón cualquiera ya no se paran un instante al empezar: sus figuras se dibujan antes, al acercarte.
- Prueba nueva `prueba_1422.py`.

## 1.4.21 — 2026-11-17 — Alpha 1.4.21: camión de la basura y guagua propios; ni un modelo de Kenney
- **Antonias Basurón** (camión de basura de carga trasera): blanco fijo con el rótulo AYTO. LA LAGUNA.
- **Escania Guagua** (Scania Citywide de 12 m, como las de TITSA): en verde TITSA fijo. Es la de todo el juego: el
  tráfico, las del Intercambiador y las de las misiones («La guagua de la broma», «Escolta a la guagua del Romero»).
  Antes las guaguas eran cajas hechas por el juego.
- Fuera el último modelo de Kenney (`garbage-truck`): todos los vehículos son ya propios.
- Prueba nueva `prueba_1421.py`.

## 1.4.20 — 2026-11-17 — Alpha 1.4.20: adiós a Kenney (camiones, grúa, bomberos y taxis propios) y pesos para verlos todos
- **Camiones y furgones propios**: Ivizco Nightly (Iveco Daily de caja) e Ivizco Evening (Daily furgón), Michu Singer
  (Canter de caja abierta) y Antonias Runner (Sprinter). Se tiñen como los coches; los furgones y la caja llevan los
  rótulos de empresas de siempre.
- **Grúa propia** (Niza Cabestrante, plataforma con su rótulo GRÚA): amarilla fija. **Bomberos propios** (Escania
  Manguera): rojo fijo, sus luces azules del techo se encienden con la sirena. **Taxis de La Laguna, 3 modelos** (Antonias
  Tipo E, JTM Capítulo 3 y Totuya Carlota Taxi): blancos, con su cartel y sus vinilos; ya no se les añade la franja ni
  la lucecita del juego.
- **Fuera todos los modelos de Kenney** salvo el camión de la basura (todavía no hay uno propio). El tractor, que no se
  usaba, también fuera. Los ids viejos (los coches de la historia como 'clio', 'transit' o 'vito', y las partidas
  guardadas) siguen funcionando con el modelo propio más parecido.
- **Pesos revisados** (Jonay: «que salga de todo un poco aunque siempre más los coches comunes en Tenerife... que se
  pueda ver relativamente fácil todos los modelos»): los más comunes (Yaris, C3, Ibiza, Polo, Clio, Sandero, Corsa,
  Corolla, Qashqai, Yaris Cross, Picanto) entre 7 y 11; ningún coche por debajo de 2 (deportivos, berlinas de lujo y el
  Seta 128 incluidos, también el JTM H4, que antes no circulaba); los camiones y furgones, el doble que antes en las
  vías principales (7 % del tráfico); ambulancia y bomberos también circulan.
- Prueba nueva `prueba_1420.py`.

## 1.4.19 — 2026-11-17 — Alpha 1.4.19: sirena más suave, policía y ambulancia propias, pick-ups y Fita Triplon
- **Sirena** (Jonay: «el sonido de los policías es demasiado molesto... debería ser más suave y sonar más bajo cuanto más
  lejos esté la policía»): onda triangular en vez de cuadrada, los dos tonos más juntos, mucho más baja (0,035 como
  mucho; antes 0,09) y bajando con la distancia como un sonido de verdad (la mitad a 25 m, una décima a ~90 m, nada a
  partir de 450 m); de lejos además suena apagada.
- **Policía propia, 3 modelos** (Seta Pantera, Niza Queguay y Ole Corsario de la Policía Local): las patrullas salen de
  uno de ellos al azar. **Ambulancia propia** (Farm Traficc). No se tiñen: chapa blanca con sus vinilos y rótulos del
  modelo; las luces del techo son las del modelo y se encienden por turnos con la sirena. Ya no se les añaden las
  franjas, el rótulo ni la barra de luces del juego.
- La pintura que se tiñe en los coches propios es ahora exactamente el color «Pintura» del modelo (antes, cualquier azul
  parecido: se habrían teñido también los vinilos y las luces de la policía).
- **Fita Triplon** (Fiat Doblò Maxi), **Totuya Hilos** (Toyota Hilux) y **Niza Navarra** (Nissan Navara), en lugar del
  Fiao Doblón, el Tagoror Jailux y el Nisperero Navajo de Kenney, saliendo igual que ellos. Ya son 52 coches propios.
- Fuera de `kenney_cars.json` los modelos de Kenney que ya no se usan: policía, ambulancia, `sedan-sports` y `truck-flat`.
- Prueba nueva `prueba_1419.py`.

## 1.4.18 — 2026-11-17 — Alpha 1.4.18: la huida de la farmacia va hacia el Ayuntamiento
- **Atraco en la farmacia** (Jonay: «cambia también la de la farmacia, de modo que termine más cerca del ayuntamiento, que
  sería la siguiente»): el coche negro ya no huye hacia Las Gavias ni el ladrón corre por el camino de tierra hasta el
  Camino Tornero. El coche va hacia el Ayuntamiento (donde empieza «Defensores de La Laguna»), y al bajarse el ladrón huye a
  pie por las calles de por allí. El camino de tierra queda solo por si no sale ninguna ruta hacia el Ayuntamiento.

## 1.4.17 — 2026-11-17 — Alpha 1.4.17: las misiones te llevan hacia la siguiente y 5 coches propios más
- **Fuera los encuentros en la acera de la 1.4.16** (Jonay: «no me gusta eso de quedar en una acera... el comienzo y final de
  la misión en una zona fijada, pero que vaya en un sentido que nos acerque a la siguiente... la idea es ir recorriendo la
  ciudad con las misiones e irla viendo toda»). Las misiones vuelven a empezar siempre en su sitio.
- **Recorridos hacia la siguiente misión**: los que se hacen durante una misión (persecuciones en coche y a pie, carreras,
  rally, baches, huidas; `s2Route` y la carrera del Canarión) van hacia donde empieza la siguiente misión de la misma línea
  (`routeToward`, `MISSIONS.kit.nextStart`): si está a su alcance acaban en ella; si está más lejos, tan cerca como dejen;
  si está muy cerca (las revanchas del Canarión, la Secreta, el Obispo), dan una vuelta y terminan allí. Un fugitivo nunca
  corre hacia ti por esto: si la siguiente queda a tu espalda, huye como antes. La huida fija de la farmacia (hasta el
  Camino Tornero) no cambia.
- Siguen de la 1.4.16: El Blanco accesible al empezar, ruta a los siguientes controles más visible, pilotos traseros
  propios y canchas del Torneo y campos de la Copa en cadena.
- **5 coches propios más** (librería `fable_coches.py`), cada uno en lugar de uno de Kenney y saliendo igual que él: Raul
  Koala (por la Reinona Canguro), Piyo Compi (Pijó Compadre), Guanchazen Cassi (Guagüen Cadi), Farm Traficc (Fardo
  Tránsito) y Seta 128 (clásico, nuevo, peso 1: ya no quedan turismos de Kenney a los que sustituir). Ya son 45 coches
  propios. La foto de prueba (`foto_propios.py`) vuelve a incluirlos a todos (en la 1.4.15 se quedó con la lista antigua).

## 1.4.16 — 2026-11-17 — Alpha 1.4.16: misiones que quedan contigo cerca, El Blanco accesible y pilotos de verdad
- **Misiones más próximas** (Jonay: «tras una carrera o persecución, la siguiente misión debería estar a no más de un km.
  Siempre en la línea que estemos tratando»): cada línea (historia, Canarión, Obispo, Torneo, Copa, Secreta, carreras)
  recuerda dónde acabó su última misión. Si la siguiente empieza a más de 1 km de ahí, quien la da (El Blanco, Coco,
  Sastrón, Boca Papa con su caja, el Canarión, el alcalde, el Obispo, Tostón) queda contigo en una acera a ~400 m, camino
  de su sitio de siempre, y vuelve a su sitio cuando ya no hace falta. Se guarda en la partida. Las que tienen sitio fijo
  lo mantienen: la ceremonia del Ayuntamiento y los partidos del Torneo y la Copa.
- **Torneo Lagunero y Copa Laguna**: sus 4 canchas y campos se eligen en cadena (cada uno el más cercano al anterior,
  sin repetir barrio) en vez de repartidos por la ciudad.
- **El Blanco, accesible**: al empezar aparece a 3-8 m de ti, donde se llega andando en línea recta (sin muro, edificio ni
  escalón en medio), con su círculo igual (antes, 4 m al lado aunque fuera detrás de un muro; captura del 16-nov).
- **Ruta a los siguientes controles** (carreras): amarillo fuerte con borde oscuro en el minimapa y el mapa grande; antes
  era un amarillo pálido al 55 % que casi no se veía.
- **Pilotos traseros**: los coches propios encienden al frenar sus propios pilotos (las caras rojas de atrás del modelo),
  sin las dos cajas rojas que se les pegaban encima; los de Kenney siguen con ellas. También en los aparcados.
- Prueba nueva `prueba_1416.py`.

## 1.4.15 — 2026-11-16 — Alpha 1.4.15: los coches propios aparcados con sus ruedas
- Los coches aparcados (que se dibujan juntos, por celdas) llevaban siempre un cilindro de 10 lados en lugar de cada
  rueda. Ahora los coches propios usan las ruedas de su modelo (unos 580 triángulos de cerca y 44 en la versión lejana);
  el cilindro queda solo para los de Kenney (Jonay, 16-nov). `template()` de `buildParkedPart2` (`07_vehicles.js`).
- `foto_propios.py` saca también `propios_aparcado.jpg`: un coche propio aparcado de verdad, de cerca.

## 1.4.14 — 2026-11-16 — Alpha 1.4.14: 40 coches propios con la librería nueva y 13 de Kenney menos
- Los **27 coches propios** que ya estaban se sustituyen por la versión nueva de la librería `fable_coches.py`
  (`Blender\coche\para_programador\`), con sus medidas y pilotos traseros nuevos; mismos nombres, ids y pesos.
- **13 coches propios nuevos**, cada uno en lugar de uno de Kenney (que queda con peso 0) y saliendo igual que él (Jonay:
  «debemos ir quitando los de kenney que no tienen nada que ver con los nuevos»): Raul Clip (por el Jandía i-Veinte), Niza
  Nano (Pijó 802), Raul Pimbo (Fiao Quinientitos), Junway Torson (Jandía Tacoronte), Niza Queguay (Quillo Deportaje), MP HS
  (MaGofio ZZ), Yoos Vengator (Jandía Kuna), Farm Ficus (Tagoror Ce-Jota), Raul Mepierdo (Butaca Adeje), Guanchazen Padel GTI
  (Nisperero Yuke), Seta Pantera (Reinona Captura), Martini Hubli (Susurro Yimi) y Linguini Reventon (nuevo, peso 1).
- Se quitan de `kenney_cars.json` los 26 modelos propios antiguos (y sus versiones lejanas). Ya son 40 coches propios
  (unos 10.800-13.500 triángulos de cerca y ~830 de lejos cada uno). Kenney ya solo pone furgonetas, pick-ups, camiones y
  vehículos de servicio.
- Testers: el paquete para ellos es ahora la **versión web para Cloudflare Pages** (`build.py` hace `dist/web/`;
  `zip_testers` la deja en `E:\Claude\GTA La Laguna\Cloudflare\` y en zip), sin `Jugar.bat`.
- Auditoría: APTO CON AVISOS (memoria JS 359 → 377 MB; pintar un fotograma 14,2 → 19,1 ms).

## 1.4.13 — 2026-11-12 — Alpha 1.4.13: Raul Cactus (modelo de Fable)
- Nuevo coche propio, el **Raul Cactus** (crossover de 4,25 m hecho con la técnica de Fable), 13.508 triángulos de cerca y
  1.170 de lejos. Sustituye al **Guagüen Te-Roque** (queda con peso 0) y sale igual que él (peso 8). No llegó a publicarse
  sola: va con la 1.4.14.

## 1.4.12 — 2026-11-11 — Alpha 1.4.12: seis coches propios rehechos con las fotos de frente
- Rehechos con la receta (silueta medida de la foto lateral, saledizos delantero y trasero ajustados a las cotas reales,
  hombros de la cabina más estrechos según la foto frontal, parabrisas, faros y pasos de rueda): **Piki Crocante**,
  **Totuya O Algo**, **Pancho Teypan**, **Pancho Chayan**, **Ole Corsario** y **Ole Mocco**. Mismas medidas
  exteriores en el juego.
- El **Seta Gomera** se queda como estaba (Jonay: la versión nueva salía peor).

## 1.4.11 — 2026-11-11 — Alpha 1.4.11: seis coches propios más
- Seis coches nuevos hechos con la receta de `Blender/coche/RECETA_COCHES.md` (silueta medida de la foto, faros y
  frontal desde las fotos de frente, ruedas a ras, techo del color de la carrocería): **Totuya Yaiza** (sustituye
  al Tagoror Lairis), **Guanchazen Helado** (al Guagüen Pollito), **Damian Sendero** (a la Datilera Sendero),
  **Troceen Beluga** (a la Limonero Berlinga), **Antonias Vivita** (a la Mercadillo Vitó) y **Newton Style 3**
  (a la Reinona Tío). Ya son 27 coches propios.
- Generador: techo del color de la carrocería por defecto; ventanillas cuyo borde sigue la línea del techo (sin
  bordes rotos); perfil del techo suavizado; faros que pueden doblar la esquina.

## 1.4.10 — 2026-11-11 — Alpha 1.4.10: el Troceen C33 sale más
- El **Troceen C33** pasa de peso 7 a 12 en el sorteo de coches: ahora es ~5,3 % de los coches de la calle (antes
  3,2 %). Jonay: «el C33 debería salir bastante, en torno a un 5-6».
- Ya no se publica la página del juego en claude.ai: Jonay usa el zip con todo separado.

## 1.4.9 — 2026-11-11 — Alpha 1.4.9: coches comprimidos y ruedas a ras
- **Los modelos de coche van comprimidos**: con los 20 coches propios la página del juego pasaba de 16 MB y no se
  podía publicar (17,6 MB). Ahora cada modelo va en un bloque DEFLATE (`tools/comprimir_coches.py`) y el juego lo
  abre al cargar con un descompresor propio pequeño (`inflateRaw` en `src/06b_vmodels.js`): `data/kenney_cars.json`
  pasa de 5,7 a 2,6 MB.
- **Ruedas a ras del paso de rueda** (Jonay: «las ruedas no pueden sobresalir de los coches»): en el generador la
  rueda se mete hacia dentro hasta que el neumático queda dentro del costado a la altura del eje. Rehechos los 19
  coches propios del generador. El Pancho Chayan baja los paragolpes (se veía hueco debajo y parecía flotar).

## 1.4.8 — 2026-11-11 — Alpha 1.4.8: siete coches propios más y pasos de rueda limpios
- **Pasos de rueda sin dientes** (Jonay: «el recorte de la rueda está fatal, se ven dientes»): el hueco de la rueda
  quitaba caras enteras y el borde quedaba en escalera; ahora los vértices del borde se colocan sobre la curva del
  paso, que queda redondo. Rehechos con el arreglo los 19 coches propios del generador (falta el Troceen C33).
- **Piki Crocante rehecho** (Jonay: «la silueta no encaja; el morro es más corto, las líneas más redondeadas, la
  trasera tiene otro ángulo»): el perfil se saca ahora directamente de la silueta de la foto de cotas.
- **Nueva forma de hacer los coches**: `auto/builder.py` (Blender) mide la silueta lateral de la foto (fondo liso
  o transparente) y la convierte en el perfil del coche con las medidas reales; las ventanillas, pilares, juntas y
  manillas salen de 4 cotas por coche.
- Seis coches nuevos: **Totuya O Algo** (crossover urbano bicolor, sustituye al Jandía i-Diez), **Seta Gomera**
  (utilitario, al Butaca Isleña), **Pancho Teypan** (berlina eléctrica, al Quillo Barranco; sale poco),
  **Pancho Chayan** (SUV grande, al Tagoror Tierra Crucero), **Ole Corsario** (utilitario, al Copal Corsario) y
  **Ole Mocco** (crossover bicolor, al Quillo Estónica). Emblemas inventados para Seta, Pancho y Ole.
- Ya son 20 coches propios.

## 1.4.7 — 2026-11-11 — Alpha 1.4.7: Piki Crocante
- Nuevo coche propio, el **Piki Crocante** (urbano de 3,6 m; batalla 2,40 m y voladizos de las cotas de Jonay): morro
  corto que sube hasta el parabrisas, techo plano con alerón, portón casi vertical, faros en las esquinas con LED
  vertical y barra cromada, pilotos en L con banda roja en el portón. Emblema inventado (hexágono plano).
  Sustituye al Quillo Picante. Ya son 14 coches propios.

## 1.4.6 — 2026-11-11 — Alpha 1.4.6: Antonias Tipo E más redondeado
- Rehecha la forma del **Antonias Tipo E** (Jonay: «es mucho más redondeado, no curvas tan rectas»): fuera el morro
  vertical, morro y zaga redondeados en planta y perfil, techo en un arco continuo del parabrisas al maletero,
  ventanillas con más caída y techo abombado. Mide 4,95 m (antes 4,83). Mismo número de triángulos.
- El generador de Blender admite `cupula` (cuánto se abomban las ventanillas) y `corona` (techo abombado).

## 1.4.5 — 2026-11-11 — Alpha 1.4.5: Antonias Tipo E, LTG Scupe y Fierilla 440
- Tres coches propios más (Blender, mismo generador): **Antonias Tipo E** (berlina grande; rejilla con puntos y faros
  muy finos) sustituye al Guagüen Golfo; **Antonias LTG Scupe** (SUV coupé grande) al Butaca Atajo; **Fierilla 440**
  (superdeportivo de motor central: morro bajo, cabina pequeña, tapa del motor larga, pilotos redondos; sale poco)
  al Quillo Exceso. Emblemas inventados: Antonias (aro con travesaño) y Fierilla (escudo).
- Ya son 13 modelos propios.

## 1.4.4 — 2026-11-11 — Alpha 1.4.4: nueve coches propios más
- **Nueve modelos nuevos hechos en Blender** (Jonay, con fotos de cada uno; lo que más importa: la silueta, los frontales
  y los faros), cada uno con su versión de juego (10.300–11.900 triángulos) y la lejana para aparcados (~1.150). Sale
  cada uno tanto como el modelo al que sustituye (Jonay: «ve eliminando un modelo de los actuales por cada modelo añadido»):
  | Nuevo | Sustituye a |
  |---|---|
  | Troceen C44 (SUV coupé) | Pijó 8002 |
  | Totuya Carlota (compacto) | Tagoror Corona |
  | Totuya Yaiza Cross | Tagoror Lairis Cruz |
  | Guanchazen T-Rex | Guagüen Te-Cruz |
  | Guanchazen D.I 55 (SUV coupé eléctrico) | Guagüen Tiguanche |
  | JTM Capítulo 3 (berlina) | Butaca Leona |
  | JTM H4 (coupé deportivo) | Guanche GT (mismo id `guancheGT`: misiones y carreras siguen igual) |
  | Yoos Reniego (todoterreno pequeño) | Datilera Polvero |
  | Yoos Cartabon (SUV) | Nisperero Cascai |
- Hechos con un generador común (`E:\Claude\GTA La Laguna\Blender\coche\generador.py`, `otros.py`, `morros.py`,
  `exportar.py`): silueta medida de la foto lateral, voladizos y morros repasados (frontal alto, esquinas cerradas), ópticas
  y rejillas con su forma (faros redondos y siete ranuras del Reniego, doble rejilla de los JTM, barra de luz del D.I 55…),
  pasos de rueda cuadrados en los todocamino, y un emblema inventado por marca (Troceen, Totuya, Guanchazen, JTM, Yoos).
- Los colores se sortean como en el resto. Aparcados de modelos propios en celdas de 120 m: la versión ligera entra antes.
- Herramienta `foto_propios.py` (lista `propios144`): todos en cuatro colores en el aeropuerto y de cerca.

## 1.4.3 — 2026-11-11 — Alpha 1.4.3: el Troceen C33, primer coche propio
- **Troceen C33** (Jonay: «diseñar un coche nuevo en Blender… un Citroën ë-C3 como el mío»; nombre de Jonay): utilitario
  eléctrico tipo SUV pequeño, parodia, modelado desde cero en Blender con las medidas sacadas de las fotos del coche de
  Jonay (perfil medido píxel a píxel; morro corto y achatado). Techo, pilares y plásticos negros; el color de la
  carrocería se sortea como en el resto (blancos y grises, negro, azul, rojo, arena, verde, naranja…).
  - Tres versiones: la detallada (103.000 triángulos, para fotos) en `E:\Claude\GTA La Laguna\Blender\coche\troceen_c33.blend`;
    la del juego (11.900) y una ligera (1.200) para los aparcados lejanos (más allá de ~90 m). Las dos del juego van en
    `data/kenney_cars.json` (bases `troceen` y `troceen-lejos`).
  - Sustituye al Limonero Ce-Tres (ya no sale) y sale algo más (peso 7): unos 140 aparcados en el mapa y en el tráfico.
  - Los pilotos de freno se encienden sobre sus propios pilotos (`model.tail`).
- Herramienta `foto_troceen.py` (lista `troceen143`).

## 1.4.2 — 2026-11-11 — Alpha 1.4.2: menos programas de shader
- La auditoría de la 1.4.1 avisó de 8 programas de shader más (67 → 75): cada fuerza y tamaño del grano de piedra y de
  enlucido compilaba su propio programa. Ahora van como valores del material (uniforms): un programa para todo el
  enlucido y uno por tipo de piedra.

## 1.4.1 — 2026-11-11 — Alpha 1.4.1: tapias encaladas, iglesias y cantería con texturas de Poly Haven
- **Tapias y muros encalados**, el enlucido de las **iglesias** (Concepción y las demás) y el blanco de las casas hechas a
  mano llevan el grano del enlucido de Poly Haven (el mismo de las fachadas), puesto por su posición (`plasterWorld`,
  02_textures.js).
- **Cantería** de campanarios, esquinas y zócalos de las iglesias: el grano de la foto de basalto sobre los sillares pintados.
- Herramienta `foto_texturas.py`: antes y después de cada tipo de pared (lista `tex141`).

## 1.4.0 — 2026-11-11 — Alpha 1.4.0: muros de basalto y pasos de cebra limpios
- **Muros de basalto** (texturas de Poly Haven): los muros oscuros de trincheras, taludes y muros de contención, y los
  muros de piedra del mapa, llevan el grano de una foto de piedra (`rock_wall_08`), puesto por su posición (no hace falta
  desplegar cada muro). Los bordillos y remates blancos no cambian.
- **Nada debajo de los pasos de cebra ni de los cebreados** (Jonay: «donde haya un paso de peatones o zonas con cebrado no
  puede quedar debajo otras marcas viales como flechas o separaciones de carril»): bajo cada paso de cebra y cada isleta o
  cuña cebreada va asfalto liso que tapa las rayas de los carriles, y se quitan las flechas, los STOP y los «ceda» que
  caían dentro (598 zonas, 154 marcas quitadas).

## 1.3.9 — 2026-11-11 — Alpha 1.3.9: terreno y tejados con texturas de Poly Haven
- **Terreno** (descampados, parques, laderas): sobre el color del mapa, el grano de una foto de tierra seca con piedras
  (`brown_mud_dry`) donde no es verde y de césped (`grass_ground`) donde lo es. Los caminos de tierra usan la misma foto.
- **Tejados de teja árabe** con una foto de teja de verdad (`clay_roof_tiles_02`), a su tamaño real (2,5 m), y
  **azoteas** de hormigón claro (`concrete_floor_02`).

## 1.3.8 — 2026-11-11 — Alpha 1.3.8: flechas en medio de cada carril
- **Flechas de dirección centradas en cada carril** (Jonay: «la flecha de dirección superpuesta a la línea discontinua
  separadora de carriles… las flechas van centradas en los carriles, no en medio de toda la vía»): en las calles de un
  sentido con dos o más carriles la flecha iba en el centro de la calzada, justo sobre la raya; ahora hay una en medio de
  cada carril (y en las de doble sentido con dos carriles por sentido, una en cada uno). Los coches del tráfico van por el
  carril derecho en vez de por el centro.

## 1.3.7 — 2026-11-11 — Alpha 1.3.7: suelo con texturas de Poly Haven
- **Texturas reales para el suelo** (Jonay: «ahora que tenemos Blender con Poly, ¿no podrás usar esas texturas y mejorar
  todo en general?»): el asfalto, las aceras, el adoquín del casco y el césped de isletas y parterres son ahora fotos de
  Poly Haven (CC0: `asphalt_floor`, `concrete_pavement`, `square_cobblestone`, `grass_ground`), repetidas a la escala de
  cada calle y ajustadas al color del juego. Antes se dibujaban con ruido en el código. Las rayas de los carriles se
  pintan encima como siempre. Unos 200 KB más.

## 1.3.6 — 2026-11-11 — Alpha 1.3.6: glorietas con bordillo y flechas, y la del Padre Anchieta
- **Isletas con bordillo** (Jonay: «que tengan bordillo»): las isletas entre la entrada y la salida de cada calle en las
  glorietas son ahora elevadas, con bordillo y choque, donde tienen 1,4 m o más; la punta estrecha sigue pintada con su
  cebreado (16 isletas).
- **Flechas de carril** en las entradas de dos carriles a las glorietas: recto y derecha en el carril derecho, recto e
  izquierda en el izquierdo (156 flechas).
- **Glorieta del Padre Anchieta** (bajo la pasarela): funciona como las demás. Su anillo es un óvalo y ahora la isleta,
  con bordillo y césped, y las líneas siguen el anillo de verdad; antes era un círculo y el centro se veía oscuro por el
  túnel de la Av. de La Trinidad que pasa debajo. Lo mismo en las demás glorietas que no son redondas (La Candelaria,
  Gracia, Torriani…).

## 1.3.5 — 2026-11-11 — Alpha 1.3.5: glorietas, cebreados y marcas centradas
- **Glorietas de todo el mapa** (Jonay: «revisa las glorietas y las zonas cebradas»): todas llevan ya sus marcas como en
  las fotos: línea continua junto a la isleta y por fuera (abierta en cada calle), discontinua en los anillos de dos
  carriles y paso de cebra en las calles. Antes solo las tenían las de las zonas rehechas. La isleta se ajusta al ancho
  real del anillo, y la glorieta de La Verdellada, que faltaba en la lista, ya tiene la suya.
- **Zonas cebradas**: isleta pintada con rayas oblicuas entre la entrada y la salida de cada calle en las glorietas, y
  cuña cebreada donde una avenida se abre en dos calzadas o dos se juntan (17 isletas y 12 cuñas).
- **Marcas centradas con el aparcamiento** (Jonay: «las flechas de sentido y demás marcas salen mal centradas desde que
  añadimos aparcamientos»): en las calles con banda de aparcamiento a un lado, las flechas, las líneas de STOP y «ceda» y
  el carril por el que van los coches se centran entre las bandas, no en el eje de la calle.

## 1.3.4 — 2026-11-11 — Alpha 1.3.4: la Av. de los Menceyes en Finca España
- **Avenida de los Menceyes entre Finca España y Villa Hilaria** (Jonay: «se cruzan carriles, es un jaleo»): las tres
  calzadas van ahora una al lado de otra, como en la realidad: en medio, la de doble sentido (un carril por sentido)
  que baja en trinchera bajo la glorieta de Finca España; a cada lado, la de un sentido con dos carriles, y medianas
  entre ellas. Antes las laterales pisaban media calzada central y las líneas se cruzaban.
- **Relieve real en esa zona** (Jonay: «cuando reconstruyas una zona aprovecha para ser más fiel a la malla de
  relieve»): el terreno, con las calles y los edificios encima, sigue el MDT de 5 m del IGN (hasta 11 m más bajo en
  algunos puntos).

## 1.3.3 — 2026-11-10 — Alpha 1.3.3: barrancos de verdad
- **Barrancos y laderas con el relieve real** (Jonay: «vamos a centrarnos en las zonas donde hay más desnivel respecto a lo
  que tenemos»): con el Modelo Digital del Terreno de 5 m del IGN se rehacen las zonas donde el terreno del juego se
  apartaba más de la realidad: los barrancos y lomos de la ladera de Anaga al noreste (de San Roque a Las Mercedes y
  La Cuesta), un barranco junto a la Carretera General del Norte y la montaña junto al aeropuerto. Las calles, el
  tranvía y los edificios no se mueven: a menos de 20 m de ellos el suelo queda como estaba y el cambio se funde hasta
  los 60 m. Créditos del IGN en `CREDITOS.md`.

## 1.3.2 — 2026-11-10 — Alpha 1.3.2: árboles en su sitio y la glorieta de La Verdellada
- **Árboles en su sitio** (Jonay: «árboles dentro de edificios, en mitad de aceras… y en medio de una carretera»): ningún
  tronco en una calle, puente o túnel ni dentro de un edificio; las copas no se meten en edificios ni atraviesan puentes
  (si no caben, el árbol sale más pequeño o se cambia por uno de calle); en las aceras, solo en alcorque junto al
  bordillo. La hierba tampoco sale ya en las aceras.
- **Glorieta de La Verdellada** (con fotos de Google Maps de Jonay): la Vía de Ronda (TF-13) baja en trinchera con
  muros de basalto por debajo del puente de la glorieta, y la glorieta y sus calles quedan a nivel de la calle (antes
  estaban subidas 4–5 m sobre taludes).
- **Avenida de los Menceyes**: dos carriles por sentido, sin aparcamiento junto a la mediana (solo a la derecha donde lo
  hay de verdad).
- **Hierba**: ya no sale en aceras, calles, adoquines, vías del tranvía ni pegada a los edificios.
- **Espadaña de Santo Domingo** sobre su pared (antes flotaba en una esquina).
- **Carriles de la Vía de Ronda** en ese tramo: 2 + 2 carriles (antes 17 m de calzada), las vías de servicio de un carril
  (antes dos con raya) y el anillo de la glorieta más estrecho, como el real.

## 1.3.1 — 2026-11-10 — Alpha 1.3.1: hierba y matojos
- **Hierba** (Jonay: «algo de hierba en los descampados»): matas de hierba verde en parques, jardines y zonas de hierba
  (también los del casco), y hierba seca con matojos en los descampados y laderas, por manchas. Hechas en Blender
  (`tools/blender/hierba_blender.py`). Se plantan solo alrededor de la cámara (hasta unos 65 m), siempre las mismas en
  cada sitio.

## 1.3.0 — 2026-11-10 — Alpha 1.3.0: árboles hechos en Blender y dragos
- **Árboles nuevos, hechos en Blender** (ahora Claude trabaja también con Blender): laurel de Indias de copa grande y
  densa con ramas, palmera canaria de tronco grueso con anillos, copa redonda de 34 hojas y dátiles, pino canario
  (modelo «Pine» de Quaternius, CC0) y árbol de calle. Cada uno con su copa simplificada para lejos.
- **Dragos** (con las fotos de Jonay): tronco gris grueso que se abre de dos en dos en brazos, y rosetas de hojas en
  punta, con las de abajo amarillas y colgando. En tres tamaños: pequeño y mediano repartidos por parques y zonas verdes,
  y el grande en el patio del Instituto Cabrera Pinto (C. San Agustín); otro mediano en la Av. Lucas Vega.
- Los modelos se rehacen con `tools/blender/arboles_blender.py` y se exportan con `exportar_arboles.py` a
  `data/arboles.json`. Créditos en `CREDITOS.md`.

## 1.2.9 — 2026-11-10 — Alpha 1.2.9: la TF-5 recta hasta Santa Cruz y la bajada del pico
- **TF-5 recta y paralela también pasado el HUC**, hasta el borde del mapa hacia Santa Cruz: un solo eje suave, cada
  sentido a su lado y los carriles de aceleración y deceleración pegados con su raya discontinua (19 ramales, antes 13).
- **Bajada del pico de la pasarela del Padre Anchieta**: va por el lado de las vías del tranvía que menos pisa la
  calzada (antes se montaba sobre la que sube por la Av. de La Trinidad).

## 1.2.8 — 2026-11-10 — Alpha 1.2.8: personajes un 5 % más pequeños
- **Todas las personas un 5 % más pequeñas** (Jonay: «reduce todos los pj un 5 % también»), igual que los coches de la
  1.2.7: el jugador, la gente de la calle y los personajes de las misiones (estos guardan su tamaño respecto al resto).
  Al conducir, el conductor baja con el asiento.

## 1.2.7 — 2026-11-10 — Alpha 1.2.7: calles al ancho entre fachadas y coches un 5 % más pequeños
- **Calles más estrechas donde los edificios se metían en ellas** (Jonay: «ha sido un fallo ampliarlas de inicio»): toda
  calle desde las principales hacia abajo (también en el casco; no autopistas, enlaces, vías rápidas ni glorietas) se
  estrecha hasta el hueco que dejan las fachadas, sin bajar de lo que piden sus carriles. Antes solo se estrechaban las
  residenciales y de servicio, y solo hasta la mitad del hueco. C. Barcelona era el peor caso: una calle de un carril
  que medía 10,4 m.
- **Coches un 5 % más pequeños** en largo, ancho y alto (todos los modelos, guaguas y motos incluidas), también al
  conducir y al chocar.

## 1.2.6 — 2026-11-10 — Alpha 1.2.6: auditoría limpia
- **El Blanco ya no está en mitad de la C. Adelantado** (la auditoría lo veía como «árbol, farola o poste»): los
  personajes y marcas de misión se colocan primero fuera de la calzada; solo si no hay sitio cerca se quedan donde iban.
- **Avisos del análisis de código de la 1.2.5**: el vector de la cámara al empezar una pelea se reutiliza, las figuras
  de los luchadores se preparan con una función de «calentar» y las piezas de las latas del tiro se hacen al cargar el
  juego; el alcalde usa la misma comprobación de calles que el resto del juego.

## 1.2.5 — 2026-11-10 — Alpha 1.2.5: sin tirón al pillar a un maleante
- **El tirón al pillar a un maleante** (Jonay: «el juego se quedó congelado un momento»): la sonda nueva midió casi 0,9 s
  al empezar la pelea. Se iban en dibujar de golpe las figuras de los dos luchadores y en subir a la tarjeta gráfica
  toda la ciudad lejana que sale de fondo. Ahora las figuras del jugador y las de cada maleante se dibujan antes, poco
  a poco en ratos libres, y el fondo solo recoge la ciudad cercana: la primera pelea con un maleante empieza en
  ~0,06 s.
- **El alcalde ya no se queda en mitad de la C. Juan de Vera** (aviso de la auditoría): su puerta está entre dos calles
  y solo se miraba la más cercana.
- **Latas de la misión del tiro**: las piezas de las latas se hacen una vez y se reutilizan en cada reinicio (aviso
  del análisis de código).
- **Código**: `buildBuildingsEach` (`04_world.js`) partido en cuatro (invernaderos, paredes y azotea aparte) y otros tres
  trozos largos separados; la ciudad construida sale idéntica (huella del mundo).

## 1.2.4 — 2026-11-10 — Alpha 1.2.4: la TF-5 recta bajo el puente de Guajara
- **Enlace de Guajara**: la TF-5 hacía un quiebro de 9 m justo bajo el puente y las calzadas y los ramales se montaban.
  Era la Autovía de Interconexión (TF-2), que sale ahí de la TF-5 y entraba en el cálculo del eje recto de la autopista.
  Ahora el eje solo usa la TF-5 y pasa recta por debajo del puente.
- **Puente de Guajara**: ahora sí queda de una pieza. En la 1.2.3 las dos mitades no se llegaban a juntar. Ahora las dos
  calzadas van pegadas, cada una con su acera y su pretil de piedra por fuera, y sin las dos pasarelas sueltas de al lado.
- **Fútbol**: todos los dibujos de los jugadores se preparan antes de empezar el partido, sin tirones al principio
  (aviso de la auditoría).

## 1.2.3 — 2026-11-10 — Alpha 1.2.3: el puente de Guajara de una pieza
- **Puente de Guajara** (Jonay, con sus capturas): el mapa lo dibujaba como dos medios puentes de un sentido más dos
  pasarelas sueltas al lado. Ahora es un solo tablero de doble sentido (dos carriles por sentido), con aceras a los dos
  lados y pretil de piedra, igual que el de San Lázaro. Lo mismo para cualquier pareja de medios puentes en Lora Tamayo.

## 1.2.2 — 2026-11-10 — Alpha 1.2.2: el pico de la pasarela del Padre Anchieta
- **El «pico» de la pasarela del Padre Anchieta** (Jonay: «apunta a la recta de la Avenida Trinidad y baja por una bajada
  paralela a la Trinidad, a un lado de las vías del tranvía»): una explanada en punta que sale del anillo hacia la
  avenida, con pretiles, y desde la punta una rampa larga que baja junto al tranvía hasta el suelo. Las dos se pueden
  andar.
- Glorietas de Guajara, a los dos lados del puente, con las marcas de la 1.2.0 (línea junto a la isleta, borde abierto en
  cada calle, pasos de cebra).

## 1.2.1 — 2026-11-10 — Alpha 1.2.1: Av. Lora Tamayo, cuesta del Púlpito y ramales del enlace de Guajara
- **Av. Lora Tamayo** (Jonay: «la avenida es una locura… las separaciones de carriles»): cada sentido al ancho de sus dos
  carriles y separados por la mediana, en vez de dos calzadas de 11,7 m montadas.
- **Cuesta del Camino del Púlpito** (X −3192, Y −341: «de golpe hiciste súper carreteras empinadas»): el relieve de esa
  zona va a escalones en el mapa de alturas; ahora está suavizado y la cuesta pasa de un 120 % en el peor punto a un 45 %.
- **Ramales de la TF-5**: los que el mapa dibuja uno encima de otro se apartan entre sí (enlace de Guajara).

## 1.2.0 — 2026-11-10 — Alpha 1.2.0: túneles, trincheras y la TF-5 de una pieza
- **San Honorato rehecho de una pieza** (Jonay, con sus fotos 3D): toda la trinchera es un solo objeto, sin muros dentro de
  la calzada ni huecos azules. La bajada norte es una sola calle de doble sentido, con raya central continua, flecha y
  «X». Lleva muros de basalto con barandilla, acera a la derecha bajando (también dentro del túnel) y el suelo con alturas
  suaves. Ya no hay peatones caminando por encima de la trinchera ni aceras que la cruzan por arriba.
- **Glorietas de la zona con sus marcas** (San Honorato, C. San Antonio, Lora Tamayo, Guajara, salida del HUC y Padre
  Anchieta): línea junto a la isleta, borde exterior abierto en cada calle, línea discontinua entre carriles y pasos de
  cebra en cada entrada.
- **TF-5 bajo Cam. San Lázaro y en Los Rodeos**: trinchera abierta de piedra oscura, sin bocas de túnel falsas. Los
  carriles de enlace van pegados a la autopista y la Carretera General queda apartada. El puente de San Lázaro tiene
  aceras y pretil de piedra.
- **TF-5 de Lora Tamayo al HUC de una pieza** (Jonay: «está fatal, es mucho más recta»): un solo eje suave, los dos
  sentidos a distancia fija con la mediana de hormigón y un solo ancho. Los carriles de aceleración y deceleración van
  paralelos, con raya discontinua y cebreado en V donde se separan, sin valla entre ellos y la autopista.
- **Pabellón de Deportes Santiago Martín**: tambor de lamas grises con cúpula blanca baja, cuerpo azul, pórtico de acero,
  lona publicitaria (parodia) y el rótulo.
- **Minimapa en modo Achamán**: la flecha apunta hacia donde mira la cámara.
- Herramientas nuevas: `sonda_vias.py`, `sonda_cortes.py`, `sonda_autopista.py` y `sonda_edificios.py`; pruebas
  `prueba_120.py` y `prueba_121.py`.

## 1.1.9 — 2026-11-04 — Alpha 1.1.9: la TF-5 en trinchera, soportales en La Trinidad y adiós al coche que se caía
- **La TF-5 en trinchera junto a Los Rodeos** (Jonay: «pasa en trinchera bajo la Rotonda Sempiterno y bajo el puente de
  Cam. San Lázaro»): 6,5 m por debajo entre la rotonda y San Lázaro, con muros, y los ramales bajando y subiendo; la
  glorieta y el puente quedan a nivel del suelo en vez de subir en terraplén.
- **El coche ya no se cae en el enlace de la salida del aeropuerto** (X −3292, Y −161, misión del queso): el puente de la
  glorieta subía 5 m en 15 m y dejaba un escalón; ahora la autopista va en trinchera ahí también y el puente queda a nivel.
- **Rampa del HUC**: donde la cruza la calle de servicio ya no está hundida; empieza a bajar después. Vale para todas las
  trincheras poco hondas que cruza una calle a nivel.
- **Soportales en la Av. de La Trinidad** (Jonay, 20 capturas): toda la acera de los impares, con la planta baja metida
  2,8 m, las tiendas al fondo, pilares en la línea de la acera, techo, colisiones y la cámara por debajo del techo.
- **Calles repetidas**: las vías que venían dos veces (al juntar descargas de zonas) se quedan en una; en la TF-5 una copia
  se hundía con la trinchera y la otra se quedaba arriba.
- **Vía de Ronda (X 309)**: el ramal de subida sube con la vía donde sus calzadas se pisan.
- Sonda nueva `sonda_alturas.py` (perfil de las calzadas que se pisan) y prueba `prueba_119.py`.

## 1.1.8 — 2026-11-04 — Alpha 1.1.8: tareas del auditor y sonda de «qué dibuja esto»
- **Recreativas y consola sin el mundo 3D detrás** (auditor): con Bencomo, Gufo, Guanche Warriors o la GOFIO-8 abiertos
  ya no se pinta la ciudad debajo de su pantalla (como en la pelea, el baloncesto y el fútbol).
- **Las imágenes de los minijuegos se cargan después de la partida** y se preparan una a una en los ratos libres: al
  abrir Guanche Warriors, Bencomo o el baloncesto se ven las figuras nuevas desde el primer fotograma.
- **Fútbol**: la caché de jugadores dibujados quita el menos usado en vez de vaciarse entera (se redibujaban sin parar).
- **Guardado automático**: si el navegador no deja guardar (sin sitio), sale un aviso en vez de perder la partida sin decir nada.
- **Av. de La Trinidad: edificios sin paredes por fuera** (Jonay, X −191, Y 366): los solares que se rellenan a un lado
  de la avenida salían girados al revés y se pintaban del revés (solo se veían las fachadas desde dentro).
- **Terraplenes con talud** (Jonay, Camino San Francisco / San Honorato, X −720, Y 301: «en la realidad la bajada es mucho
  más suave»): delante del muro de las subidas a los puentes baja ahora una ladera de tierra hasta el suelo, donde hay sitio
  (sin calles, aceras ni edificios delante); si no, se queda el muro.
- **«Marcos grises flotando» del Adelantado**: no eran un fallo; las fotos de la prueba se sacaban con la cámara dentro del
  Palacio Nava, desde donde se ven su cornisa y su portada pero no sus paredes.
- **Sondas nuevas**: `sonda_origen.py` (qué función del código añadió cada pieza de un sitio) y `sonda_rayos.py` (qué es lo
  que se ve desde un punto, con rayos por la pantalla).

## 1.1.7 — 2026-11-04 — Alpha 1.1.7: código partido en funciones más cortas y sin copias
- **Calidad del código** (Jonay: «intentar llegar a A, partir las funciones gigantes y quitar código repetido»): de B (83)
  a A (88 en la medición local).
  - Los dos dibujantes de píxel (baloncesto `09eb` y Guanche `09ma`) comparten ya sus piezas en `09e_pixkit.js` (tonos,
    formas, el sombreado por píxel, la cara de perfil, el dorsal): un 22 % menos de código repetido en cada uno.
  - El Torneo Lagunero y la Copa Laguna comparten cómo se mira la cancha y el final del partido; las tres persecuciones
    de El Secreta, un `k3Chase`; la lista de coches es una tabla de una línea por modelo.
  - Las funciones largas se han partido en trozos con nombre (de 251 de más de 60 líneas a 147), con una herramienta
    que comprueba qué variables usa cada trozo para no cambiar lo que hace.
  - Dos pruebas nuevas comparan lo de antes y lo de ahora píxel a píxel y pieza a pieza: `huella_sprites.py` (los
    dibujos del baloncesto y de Guanche) y `huella_mundo.py` (todo lo que se construye del mapa, con la misma semilla).
  - Auditoría: **APTO CON AVISOS, calidad A (86)**, mismas métricas que la 1.1.6.
- Pruebas: entre prueba y prueba se esconde también el panel de pausa (`run_varios.py`): una prueba anterior podía dejarlo
  a la vista y `prueba_0851` lo tomaba por un fallo del Esc de la consola.

## 1.1.6 — 2026-11-04 — Alpha 1.1.6: código ordenado y coches con nombres más lejos de las marcas
- **Calidad del código** (Jonay: «revisa la calidad del código»): todo `src/` pasa por un formateador (Prettier,
  `.prettierrc.json`: líneas de hasta 150 caracteres, una sentencia por línea). Mismo juego, mismo comportamiento; la nota
  del auditor sube de C (69) a B (84): las líneas largas bajan del 26 % al 0,4 % y las densas del 21 % al 0 %.
  `tools/lint_js.py` entiende ya las declaraciones partidas en varias líneas.
- **Calles sobre trincheras abiertas** (sonda_rampas: ~60 sitios): donde una calle cruza por encima del tramo abierto de una
  trinchera honda, lleva debajo su losa de puente con pretiles a los lados (y su choque), en vez de flotar sobre el hueco.
- **Banda de aparcamiento con su raya continua corta** al principio y al final de cada tramo (Jonay, foto de C. Narciso de Vera).
- **Coches** (Jonay: «que se alejen más… Pijó me vale»): Guagüen, Butaca, Tagoror, Quillo, Jandía, Datilera, Reinona,
  Copal, Limonero, Fiao, Nisperero, MaGofio, Susurro, Fardo, Mercadillo, Mojo Bichi, Burrero; motos Olita, Llamarada,
  Sinsín, Quinqué y Cachimba. Los concesionarios del mapa, igual.

## 1.1.5 — 2026-11-03 — Alpha 1.1.5: señales de prohibido aparcar (Mapillary) y cámara bajo tierra
- **Señales de prohibido aparcar y parar de Mapillary** (Jonay: «puedes descargar esos puntos y cruzarlos con tus
  calles»; eligió «hueco en la banda»): `tools/mapillary.py` baja las señales detectadas en las fotos de Mapillary (828 de
  aparcamiento en el mapa) y las empareja con cada calle y su lado; delante de cada señal de prohibido la banda de
  aparcamiento se corta ~12 m y no hay coches aparcados (vados, esquinas).
- **Cámara bajo tierra** (Jonay, La Trinidad: «al entrar en el subsuelo la cámara se pone medio loca»): en túneles,
  escaleras y aparcamientos la cámara se acerca y queda por debajo del techo.

## 1.1.4 — 2026-11-03 — Alpha 1.1.4: puentes sin grietas y calzadas que no se pisan
- **Puentes sin grietas en las juntas** (Jonay, Vía de Ronda X 631, Y 600): el tablero empezaba 15 cm por encima de la
  calzada y el escalón se veía como una raja; ahora en los dos extremos queda a la misma altura que la calle.
- **Bocas de trincheras y túneles sin líneas en zigzag** (Jonay, San Honorato X −988, Y 114): las líneas de una vía hundida
  se cortan donde va dentro de otra calzada a su misma altura, como en el resto de calles.
- **Ramales que suben con la vía elevada** (Jonay, Vía de Ronda X 309, Y −40): un ramal que va pegado a un tramo elevado y
  se monta sobre él sube con él donde se solapan, en vez de quedarse abajo con un escalón (y el coche va por encima).
- **Suelos que parpadeaban** (Jonay, Plaza de La Concepción): dos empedrados que se solapan ya no están a la misma altura.
- **Choque invisible junto al tranvía** (Jonay, X −193, Y 337): era el bordillo de la isleta; a pie ya se pasa por encima.
- **Rampa del aparcamiento de La Trinidad (Casco Histórico) de doble sentido**: más ancha, sin aceras montadas sobre sus muros.
- **Bandas de aparcamiento como en La Laguna** (Jonay, foto de C. Narciso de Vera): solo una línea discontinua, sin dividir
  las plazas una a una.
- Sondas nuevas: `sonda_calzadas.py` (qué calzadas hay en un sitio y cuáles se pisan) y `sonda_choque.py` (choques en un punto).

## 1.1.3 — 2026-11-03 — Alpha 1.1.3: tanda de arreglos rápidos (minijuegos, mapa y menús)
- **Guardar y salir** en el menú de pausa: guarda la partida y cierra el juego.
- **Cambiar de arma con los botones laterales del ratón** (adelante = siguiente, atrás = anterior); la rueda ya no cambia
  de arma.
- **Minijuegos (fútbol, baloncesto)**: Esc pausa (y otra vez Esc o Q sale), P pausa; al salir de pantalla completa se pausa.
  Abajo a la derecha sale quién lleva el balón, con su número.
- **Atardecer más suave** (Jonay: «oscurece muy de golpe»): la luz baja poco a poco y la noche ya no empieza de golpe a las 20:24.
- **Leyenda del mapa**: una línea por cada cadena de misiones abierta, con su color; El Secreta pasa de salmón a rosa para
  no confundirse con el Torneo.
- **Carreras**: el siguiente punto de control en el minimapa, en amarillo suave en vez de azul.
- **Pasaje Aguere**: sin mesas flotando y cada local con su propio cartel (los demás, cerrados).
- **Contenedores** pegados al bordillo, no en mitad de la calle.
- **Bencomo**: perros un 25 % más lentos y que no giran a cada momento; el golpe llega más lejos; en el picado agarra la
  vara por arriba.
- **Guanche Guarriors**: el campamento dura más y el golpe alcanza más; La Mirladora con el pezón oscuro y la falda corta de cuero oscuro.
- **Guerra de Naves (GUFO)**: el misil tiene un segundo nivel (otro misil hacia arriba que corre por el techo), DOBLE y
  LÁSER no se pueden llevar a la vez, marcas de nivel bajo cada casilla y una línea que dice qué hace la marcada.
- **Peleas**: marcador y cartel de controles más pequeños; la gente de la calle no se ve detrás de la pelea.
- **Sin marcas reales**: el «Seat gris» de una misión es ahora «el coche gris».

## 1.1.2 — 2026-11-03 — Alpha 1.1.2: aparcamiento en muchas más calles
- **Bandas de aparcamiento en más sitios** (Jonay: «lo de la zona de aparcamientos aplica a muchos más sitios, hay que
  buscar la manera de detallar»): además de las etiquetas del OSM, cada tira de aparcamiento «en la calle» que el OSM
  dibuja junto a una calle marca ese lado; y las calles residenciales (sin líneas) pintan también su banda con las plazas.
  Sonda: `tests/herramientas/sonda_aparcamiento.py` (cuántas calles salen de cada fuente).

## 1.1.1 — 2026-11-03 — Alpha 1.1.1: carriles de aparcamiento, gente por la acera y vallas en los fondos de saco
- **El juego se llama ahora «Alpha»** (Jonay: «será la Alpha; algún día será la Beta 1.0 y luego la Final 1.0»): la
  pantalla de inicio dice «Alpha 1.1.1»; el número sigue igual.
- **Aparcamiento en las calles** (Jonay: «hay muchas zonas de 2 carriles que en realidad tienen 2 carriles y una fila de
  aparcamientos a los lados»): las calles con líneas pintan su banda de aparcamiento (2,2 m, con las plazas marcadas) y
  los carriles en lo que queda, y los coches aparcados van en esa banda. De qué lados: del OSM cuando lo dice
  (`tools/carriles.py`: 986 calles con su número de carriles, 109 con aparcamiento), si no, por su anchura.
- **Plazas de aparcamiento pintadas sobre los carriles** (Jonay, Calle el Juego y Juana La Blanca): los aparcamientos del
  OSM dibujados encima de una calle ya no pintan plazas en la calzada.
- **La gente no anda por las vías rápidas** (Jonay, Autopista del Norte): ni autopistas, autovías ni la Vía de Ronda; en
  una avenida de dos calzadas, si «su» acera cae en la otra calzada, camina por la del otro lado.
- **Vallas al final de las calles sin salida junto a una vía rápida** (Jonay, X 498, Y −493: «por aquí no se debería
  poder acceder a la Vía de Ronda»).

## 1.1.0 — 2026-11-03 — Ya no te quedas atrapado debajo de un puente
- **El coche se colaba por el enlace de la Autopista del Norte** (Jonay, X −3292, Y −161, misión del queso: «me he caído
  por aquí con el coche… me dejó bloqueado»): yendo por un tablero que pasa por encima de un tramo bajo (trinchera, paso
  inferior), el coche podía «engancharse» al suelo de abajo y bajar a través del puente. Ahora, si hay tablero a su altura,
  se queda en el tablero. Sonda nueva para todo el mapa: `tests/herramientas/sonda_caidas.py`.
- **Red de seguridad**: si tu coche acaba por debajo del terreno fuera de un túnel o un aparcamiento, o se queda clavado
  unos segundos acelerando sin moverse, vuelve solo a la calle más cercana, en su sentido («Coche recolocado en la calle»).
- **Sin coches aparcados en las vías rápidas**: también donde el OSM llama a la autopista, la autovía, la Vía de Ronda o la
  Carretera General del Norte de otra manera.

## 1.0.9 — 2026-11-03 — El GPS ya no da vueltas por los sentidos únicos
- **Ruta en coche** (Jonay: «las indicaciones de ruta hacen unas vueltas terribles… evitemos tener en cuenta el sentido de
  la calle salvo en autopistas, Vía de Ronda y vías rápidas»): el GPS puede ir en contra por las calles de un solo
  sentido; solo los respeta en autopistas, autovías, la Vía de Ronda y la Carretera General del Norte. El tráfico sigue
  yendo en su sentido.

## 1.0.8 — 2026-11-03 — Ninguna calle por encima de una rampa abierta
- **Rampas de aparcamiento y trincheras** (Jonay, Plaza del Cristo X 256, Y −552 y la salida del parking en X 124, Y −637:
  «la entrada al parking tiene una carretera encima… esto no puede pasar nunca»): las calles, aceras, plazas y líneas que se
  pintaban a ras de suelo por encima del tramo abierto de una rampa o una trinchera se recortan ahí, igual que el terreno
  (solo lo que queda por encima del suelo de la rampa y por debajo del suelo de arriba: los puentes y la propia rampa se
  quedan). De momento solo en las rampas de los aparcamientos; las trincheras con una calle de verdad encima necesitan
  una losa (apuntado). Sonda nueva para todo el mapa: `tests/herramientas/sonda_rampas.py`.
- **Choque invisible en la Vía de Ronda** (Jonay, X 378, Y −270: «aquí se choca el coche»): un muro del mapa quedaba debajo
  de la calzada (la del juego es más ancha que la del OSM, o va elevada) y chocaba sin verse. Los muros se cortan ahora donde
  los pisa una calzada tal como la dibuja el juego.

## 1.0.7 — 2026-11-03 — Muros continuos en las esquinas
- **Sin huecos entre tramos de muro** (Jonay, captura: «tampoco debería haber huecos como este entre muros, deberían ser
  continuos»): cada tramo acababa recto y en las esquinas se abría una cuña por fuera. Ahora las esquinas van a inglete (las
  caras de los dos tramos se juntan) y los extremos de cada muro salen medio grosor, para que dos muros del mapa que se
  tocan se solapen en vez de dejar hueco.

## 1.0.6 — 2026-11-03 — Vallas de barrotes
- **Las vallas del OSM, como barandillas de hierro** (Jonay, captura en la Plaza del Doctor Olivera: «¿esto qué es?»): se
  pintaban como un panel gris semitransparente que parecía un fantasma. Ahora son barrotes cada 13 cm con pasamanos arriba
  y abajo (textura recortada, sin transparencias). La de esa plaza es la barandilla del jardín alzado de La Concepción, que
  aún falta hacer (apuntado en PENDIENTES).

## 1.0.5 — 2026-11-03 — Muros pegados a los edificios
- **Sin pasillos entre muro y edificio** (Jonay, captura: «los muros no deberían dejar pasar entre muro y edificio»): el muro
  que acaba junto a un edificio (donde se cortó o la tapia que llega a una casa) sigue hasta meterse dentro de él, más allá
  de los 0,75 m que la fachada se pinta hacia dentro. Antes quedaba un hueco de hasta ~1,7 m por el que se pasaba.

## 1.0.4 — 2026-11-03 — Edificios del Catastro donde faltan, y muros y vallas
- **Edificios del Catastro** (Jonay: «hay muchos huecos que no existen en la realidad… hay que revisar con mejores
  fuentes»): `tools/catastro.py` baja los edificios INSPIRE del Catastro de La Laguna (planta de cada parte con sus plantas)
  y `tools/catastro_add.py` mete en el mapa las partes que ningún edificio del OSM tapa y que no caen sobre una calle
  (~11.900). Lo que ya estaba no se toca. Comparación con fotos: `tests/herramientas/comparar_catastro.py`.
- **Muros, tapias y vallas** (Jonay: «hay que repasar muros y vallas/cercas que rodean jardines y zonas como la
  universidad»): los «barrier» del OSM (`tools/barreras.py`; ~60 km de muro y ~23 km de valla), cortados donde cruzan una
  calle, un camino o un edificio; con su altura, material y choque (`05y_muros.js`).
- **Callejón Montaraz y la zona de la primera misión de las bolas**: en las manzanas que el juego rellena con casas por el
  borde, una tapia encalada cierra la calle donde no hay casa, y dentro van las casas del Catastro.

## 1.0.3 — 2026-11-03 — Vuelven los edificios: el recorte de la 0.99.8
- **Recorte de edificios** (Jonay: «te has cargado demasiados edificios; los recortes fueron mal, empeoraron mucho», con
  capturas de manzanas del casco convertidas en plazas y de un edificio sin paredes): se deshacen los cambios de recorte de
  la 1.0.0–1.0.2 (sin límite de lo que se pierde, la muesca y el recorte por el bordillo) y vuelven las reglas de la 0.99.8.
  Se queda lo que sí funcionó: las calles residenciales estrechadas al hueco entre fachadas. El recorte fino, apuntado para
  hacerlo con una herramienta de polígonos fiable y una prueba con fotos.

## 1.0.2 — 2026-11-03 — Edificios que siguen el bordillo (también en curva) y gente delgada menos exagerada
- **Recorte por el bordillo** (Jonay: «que el edificio vaya paralelo al borde de la calzada, también cuando empieza a tener
  ángulo, de manera que sea imposible que invada»): después de los cortes rectos, se le quita al edificio la calzada pieza a
  pieza tal como se dibuja (rectángulo de cada pieza y un disco en cada unión, para las curvas), con el bisel solo donde la
  calle acaba. Con esto vuelven muchos de los edificios pequeños que se quitaban: se queda la parte que no pisa la calle.
- **Gente delgada** (Jonay: «los delgados son demasiado delgados y deformados; las cabezas no se adelgazan tanto»): el
  cuerpo más delgado es menos extremo y el estrechamiento ya no acorta (la altura sale de la tabla real).
- **El Chopa mide 1,83 m** (Jonay: «todo el mundo es más alto que el Chopa»): hasta la 1.0.1 el estrechamiento de hombros lo
  dejaba en ~1,61 m; ahora es más alto que la media de los hombres y que casi todas las mujeres.
- **Interiores** (Jonay: «la gente atraviesa el mostrador»): nadie se queda dentro de una barra, mesa o estantería; se le
  saca por el lado más corto antes de ponerle su choque.
- **Lanzador**: Edge o Chrome se abren limpios, sin bienvenida, extensiones ni inicio de sesión.

## 1.0.1 — 2026-11-03 — El juego en carpeta con lanzador e icono, pantalla completa y esquinas recortadas en paralelo a la calle
- **Versión en carpeta para los testers** (Jonay: «que no sea un archivo único… y hacer zip para pasarlo»): `build.py` saca
  `dist/JETA La Laguna/` con `Jugar.bat`, `LEEME.txt` y `juego/` (`index.html`, `js/juego.js` con su mapa de fuentes —
  los errores dicen `src/<archivo>.js` y la línea—, `datos/mapa.js`, `lib/` con Three.js y `lanzador/`). El lanzador sirve
  la carpeta en `localhost:8790` con PowerShell (viene con Windows) y abre el juego **a pantalla completa** como una
  aplicación en Edge o Chrome; si no hay ninguno, en el navegador por defecto. La primera vez, `Jugar.bat` crea en el
  Escritorio el acceso directo «JETA La Laguna» **con el icono del juego**. El servidor se cierra solo al cerrar el juego.
  Orden nueva del trabajador: `zip_testers` (deja `JETA La Laguna v<versión>.zip` en la carpeta del juego).
- **Pantalla completa también en el navegador** (Jonay): al darle a «Jugar» (y a «Continuar», porque Esc la quita) el
  juego la pide si la ventana no llena ya la pantalla.
- **Esquinas de edificios en los cruces** (Jonay: «que el recorte siga en paralelo a la calle, que la esquina no acabe en 45
  grados»): donde el corte recto pasaría del final de la calle, solo se quita lo que está en la calzada, con una muesca en
  ángulo recto paralela a la calle.
- **Limpieza**: los restos de compilaciones y sesiones viejas pasan a `OLD-Borrar\` (orden `mover_old` del trabajador,
  lista en `scripts/old_borrar.txt`; no se borra nada).

## 1.0.0 — 2026-11-03 — Rendimiento: 1080p a 60 fps en «alta», calles al hueco entre edificios y alturas reales
- **Pintado** (Jonay: «el objetivo es jugar a 1080 a 60 fps en mi gráfica con los gráficos al máximo»): con la RX 6600 en
  «alta» a 1080p, de 23–34 ms por fotograma a **12–14 ms** (sonda nueva con la tarjeta gráfica,
  `tests/herramientas/sonda_pintado_gpu.py`). No pesaban los píxeles sino las llamadas de dibujo (de 2.200–3.100 a
  1.300–1.700) y los triángulos (de 6 M a 1,4–1,9 M):
  - se juntan también las piezas con hijas (ruedas con llanta de los coches de los aparcamientos) y las transparentes;
  - la gente no se pinta a más de 170 m, los coches a más de 360 m ni los interiores desde lejos; los ojos, cejas, luces o
    matrículas, solo de cerca (40 y 70 m);
  - los coches aparcados van en celdas de 400 m y hasta ~580 m; los detalles pequeños de la ciudad, hasta ~330 m.
- **Edificios en la calzada** (auditorías; Jonay: «un término medio de cada cosa»): las calles residenciales, de servicio y
  sin clasificar fuera del casco, y lejos de puentes y túneles, se estrechan a medio camino del hueco real entre fachadas
  (nunca menos de 5,5 m las de doble sentido); los edificios se recortan aunque pierdan más de la mitad y, si solo queda una
  tira de menos de 50 m², se quitan. Metidos más de 1 m en la calzada: de 121 a 14. Los de 50 m² o más que la calle cruza se
  quedan como estaban, con fotos para revisarlos uno a uno.
- **Gente de la calle** (Jonay, con una tabla de alturas por sexo): la altura sale de la tabla real; antes todos medían
  1,50–1,70 m porque al estrecharles los hombros se acortaban.
- **Código**: la tabla de selecciones del Mundialito, una fila por equipo; los apuntes de las auditorías viejas, cerrados y
  resumidos en tres.

## 0.99.8 — 2026-11-02 — Empedrado basáltico, rueda del ratón para las armas y coordenadas X, Y con altura
- **Empedrado del casco** (Jonay: «es más oscuro», `docs/referencias/empedrado/`): adoquín gris basáltico oscuro en
  hileras, con juntas oscuras (calles peatonales y plazas).
- **Armas** (Jonay: «la rueda del ratón debería dejar cambiar de arma»): rueda abajo = siguiente (puños → pistola → rifle de
  agua), arriba = la anterior.
- **Minimapa** (Jonay: «estaría bien poner X, Y y la altura»): «X 386 · Y −276 · 562 m» (Y es la antigua Z; la altura,
  sobre el mar). El agente revisor escribe ya X, Y en sus informes.

## 0.99.7 — 2026-11-02 — Pasada del agente revisor y la auditoría: reglas comunes; fachadas con plantas enteras
- **Reglas generales** (Jonay: «¿podremos aplicar alguna regla común para evitar estos problemas al generar nuevos?»),
  sacadas de los avisos del agente revisor (156 → 144, 44 desaparecen) y de la auditoría:
  - Un edificio que atraviesa una calle de coches de lado a lado se recorta y se queda con el trozo mayor; si la calle
    acaba dentro (entrada de garaje), se deja.
  - Un camino a pie que cruza un edificio tiene un pasadizo en planta baja (hueco en la fachada y paso libre), como el
    Pasaje Teide.
  - Las medianas e isletas se abren donde las cruza un camino a pie o un paso de peatones (el agente se quedaba atascado).
  - Ningún coche aparcado sobre un camino a pie (también en los aparcamientos).
  - Los coches que van por encima de una trinchera abierta (la autopista en terraplén sobre los pasos inferiores
    cortos) ya no chocan con su borde: eran los atascos de la TF-5; y donde la calle de encima cruza justo en la boca
    del túnel se deja la trinchera honda de antes (X −1252 Z −2).
  - La Vía de Ronda conserva sus líneas sobre las avenidas que se le juntan.
  - El alcalde ya no está de pie en la calzada de la Calle Juan de Vera (el «poste» de la auditoría).
  - Guanche Guarriors: en una oleada, los enemigos que quedan fuera de la pantalla entran andando (una Harimaguada se quedaba quieta a la izquierda y la fase 5 no se acababa).
- **Fachadas** (Jonay: «las ventanas están bajo tierra o cortadas… no se puede cortar una ventana ni empezar pegada al
  suelo»): las plantas se cuentan desde el suelo más alto del edificio; en cuesta, cada tramo de fachada empieza en la
  primera planta entera sobre su suelo, con un zócalo liso debajo; la altura del edificio es un número entero de plantas.

## 0.99.6 — 2026-11-02 — Baloncesto con mates y tapones nuevos, Guanche a 640×448 y pasos inferiores
- **Baloncesto 2D** (Jonay: «perfectas así, aplícalo todo a escala del juego»; «los jugadores deberían ser de distintos
  aspectos»): las animaciones nuevas en el juego (`src/09ecb_bk_anim.js`, hecho por `tools/sprites_ext/bk_anim.py` como
  un mapa de píxeles que cada jugador monta sobre su propia hoja): tiro en suspensión con los dos brazos, robo, rebote,
  tapón y los mates de los combos (360, molino con el brazo girando, de espaldas, entrepiernas). Los mates acaban con las
  manos en el aro, que se inclina mientras se cuelga; la red se mueve al entrar el balón; el balón es algo mayor que la
  cabeza; los jugadores, un 6 % más pequeños y cada uno con su talla y su pelo (corto, afro, barba o rapado).
- **Guanche Guarriors** (Jonay): pantalla propia de 640×448 (dibujada al 75 % en la recreativa); la secuaz roja y la
  vikinga sin casco; los enemigos montados en lagarto llevan la pierna por delante, como los héroes; un enemigo
  derribado ya no cae fuera de la pantalla (Guayota quedaba fuera del alcance y la fase 7 no se acababa).
- **Carreteras** (Jonay, 15 capturas: «muros en medio de la carretera y salida de túnel con carretera que vuela
  encima»): los pasos inferiores cortos entre dos cruces cercanos (Ofra, las bocas bajo la TF-5) se hunden solo lo que
  permite una rampa de ~17 % y la carretera de encima sube en terraplén, con muros hasta el suelo, para dejar 5,4 m
  libres; los STOP y ceda el paso ya no se pintan en la autopista ni en la vía mayor, sino en la incorporación;
  carriles de aceleración y deceleración en las entradas y salidas; líneas también en los puentes; las costillas del
  techo del intercambiador ya no salen sobre la autopista.

## 0.99.5 — 2026-10-27 — Marcas viales por carriles y nada de coches aparcados en la autopista
- **Carreteras** (Jonay: «las marcas viales deben ser coherentes… hay muchas líneas que se cruzan», «no puede haber coches
  aparcados en medio de la autopista ni de la Vía de Ronda»):
  - Cada carretera con líneas lleva las de sus carriles, hechas a su anchura (`laneMk` en `src/04_world.js`): una calzada
    de un sentido (autopista, enlaces, cada sentido de la Vía de Ronda) con sus bordes continuos, el arcén derecho más
    ancho y discontinuas entre carriles; una de doble sentido con su eje (doble continuo si tiene 4 carriles). Los
    enlaces de un sentido llevan ya sus líneas de borde.
  - Una vía cede a otra mayor: sus líneas se cortan en cuanto su calzada toca la de la mayor (un ramal que corre al lado
    antes de incorporarse, la boca de un cruce); la mayor mantiene las suyas.
  - Los discos de asfalto de las uniones van ya por debajo de las líneas (cortaban las líneas en círculos).
  - Ningún coche aparcado sobre la autopista, sus enlaces, las carreteras principales ni la Vía de Ronda (había 86).
  - Bionda (guardarraíl) a los dos lados de la autopista y de sus enlaces, por fuera del arcén: abierta solo donde se
    une o toca otra vía (las salidas y entradas, los cruces), en puentes y túneles (tienen sus muros) y donde ya hay
    mediana. Ya no se puede pasar a la carretera de al lado sin usar las salidas.

## 0.99.4 — 2026-10-27 — Baloncesto: jugadores del pack con camiseta de asillas
- **Baloncesto 2D** (Jonay: «el basket perfecto, aplica ya»): los jugadores se dibujan con el pack GandalfHardcore y su
  camiseta de asillas (`Basketball_Shirt`), cada uno hecho a partir de su aspecto: piel (la más parecida de cuatro),
  camiseta y pantalón corto de su color, pelo (corto, afro o con barba) y zapatillas. Capas en `src/09ec_bk_data.js`
  (`tools/sprites_ext/bk_layers.py`), montaje y fotogramas en `src/09ed_bk_sheets.js`; mientras cargan salen los de
  antes.

## 0.99.3 — 2026-10-27 — Las chicas sobre la base nueva y las secuaces
- **Guanche Guarriors** (Jonay): todas las chicas rehechas sobre su base `Female Skin3_new` con sus colores, ropa y
  armas de antes (`tools/sprites_ext/chicas.py`): La Mirladora (pezones del rosa de la boca), la bruja y, nuevas,
  **cinco secuaces** (roja, vikinga verde, demonia azul, espada de oro amarilla y leñadora morada; pezones rosa, sin
  braga). La mitad de los secuaces salen como una de ellas. Los cascos, armas y escudos (dibujados para el cuerpo de
  hombre) se colocan fotograma a fotograma sobre el de mujer, para que el arma no se salga de la mano.

## 0.99.2 — 2026-10-27 — Patada en carrera: la caída del salto, girada al dibujarla
- **Guanche Guarriors** (Jonay: «la actual está horrible… el arma se va de la mano»): la fila de la patada en carrera
  guarda la caída del salto tal cual (sin girar) y el juego la gira 40° al dibujarla, a la resolución de la pantalla:
  no se pierde ningún píxel y el arma sigue en la mano. Vuelve el escudo de El Magote, como en el ejemplo de Jonay.

## 0.99.1 — 2026-10-27 — Patada en carrera sin perder calidad
- **Guanche Guarriors** (Jonay: «ha degradado mucho la calidad, rescatar la caída original y rotarla solo»): la patada
  en carrera es la caída del salto girada con tres cizallas (cada píxel se mueve entero, ninguno se duplica ni se
  pierde), en vez de ampliar y reducir.
  - Las piernas toman el color del tronco (antes cogían tonos de la falda y del taparrabos).
  - El escudo de la espalda, que en esa postura tapaba la cabeza, ya no sale en la patada (El Magote).

## 0.99.0 — 2026-10-27 — Fondos dibujados en Guanche Guarriors y Bencomo, Tenique y las Harimaguadas
- **Fondos nuevos** (Jonay, a partir de sus fotos de cada sitio): ya no son la foto pasada a píxeles; cada fondo está
  dibujado (`tools/fondos/dibujo.py`) con colores planos y el contorno oscuro de los personajes, en capas que se mueven a
  distinta velocidad y al mismo tamaño de píxel que los sprites (2 píxeles de pantalla por píxel).
  - **Guanche Guarriors**, las siete fases: Taoro (el Teide nevado, el mar de nubes, pinos y retamas), la laurisilva de
    Anaga (con niebla), el Barranco del Infierno (la cascada cae por detrás de las rocas), Los Gigantes, el Malpaís de
    Güímar, Las Cañadas y el Echeyde (tubo de lava). También la pantalla de título, la de elegir héroe y la de fondo.
  - **Bencomo**: la costa de Añaza (con las carabelas castellanas), el barranco de Acentejo y el monte de La Emboscada.
  - Datos en `src/09jw_fondos_data.js` (`tools/fondos/empaquetar.py`); los dibuja `src/09jx_fondos.js`. Mientras cargan
    se ven los fondos de antes.
- **Guanche Guarriors** (Jonay):
  - Gollux se llama **Tenique**; la jefa gorgona es **la Reina Harimaguada** y las gorgonas normales, **Harimaguadas**.
  - **Guayota** (Demon Overlord): con sus 8 fotogramas por animación (antes la mitad), la hoja reducida a 5/8 sin
    difuminar y dibujada píxel a píxel como los héroes, más pequeño (≈1,35 veces un héroe) y más rápido.
  - **La mordida del lobo** ya no sale en el aire: el bocado sigue al hocico fotograma a fotograma.
  - **Patada en carrera** girada sin perder calidad (como RotSprite: se amplía ×8 con Scale2x, se gira y se reduce).

## 0.98.2 — 2026-10-27 — Patada en carrera: la pierna abajo y la cabeza arriba
- **Guanche Guarriors** (Jonay): la patada en carrera estaba girada al revés (la pierna estirada arriba y la cabeza
  abajo). Ahora es una patada voladora: la pierna estirada hacia delante y abajo, la cabeza arriba y atrás. En todos
  los personajes (`tools/sprites_ext/mk.py`, giro −40°).

## 0.98.1 — 2026-10-27 — Gollux, un poco más pequeño
- **Guanche Guarriors**: Gollux salía el doble de grande que los héroes y tapaba media pantalla; ahora un 25 % menos.

## 0.98.0 — 2026-10-27 — Guanche Guarriors: dos fases nuevas y jefes nuevos
- **Guanche Guarriors** (Jonay): siete fases.
  - **Fase nueva, El Barranco del Infierno** (Adeje, tras Anaga): ratas a montones y, de jefe, **Gollux**, el bicho de
    piedra. Fondo de paredes de barranco con bocas de cueva y cardones.
  - **Fase nueva, El Malpaís de Güímar** (tras Los Gigantes): las **gorgonas** (verde y morada) salen del mar de lava;
    jefa: **la Reina Gorgona** (la morena de pelo claro). Van sin la parte de arriba, como La Mirladora.
  - **Guayota** es ahora el **Demon Overlord**, más grande, y antes, en el mismo Echeyde, sale **el Hacha de Guayota**
    (el Guayota de antes) como lugarteniente.
  - **Los perros (y el tibicena mayor) son el lobo** negro, con su carrera, su mordisco y su muerte.
- Pruebas: la 082 recorre las siete fases con el piloto de la demo; prueba nueva 098 (fases nuevas y hojas nuevas
  dibujadas, con fotos).

## 0.97.2 — 2026-10-27 — Guanche Guarriors: patada en carrera menos plana
- **Guanche Guarriors** (Jonay): la patada en carrera, 15° menos tumbada, con la cabeza más alta.

## 0.97.1 — 2026-10-27 — Guanche Guarriors: La Mirladora, pelo y falda
- **Guanche Guarriors** (Jonay): a La Mirladora le quedaban mechones negros: ahora el pelo va de castaño a rubio. En la
  caída del salto **se le levanta la falda**. El taparrabos es de cuero oscuro (no dorado).

## 0.97.0 — 2026-10-27 — Guanche Guarriors: La Mirladora sin bikini
- **Guanche Guarriors** (Jonay: «el bikini no existía en esa época»): La Mirladora va sin la parte de arriba del
  bikini, con el pecho al aire (piel del pack sin el sujetador ni su borde, pezón rosado en cada pecho), y **más rubia**.
  Abajo sigue el taparrabos de cuero y la falda de flecos. También montada en el lagarto.

## 0.96.4 — 2026-10-27 — Guanche Guarriors: la pierna de la patada en carrera, 1 px más arriba
- **Guanche Guarriors** (Jonay): en la patada en carrera de todos menos La Mirladora, las piernas 1 píxel más arriba
  (la estirada quedaba desplazada hacia abajo).

## 0.96.3 — 2026-10-27 — Guanche Guarriors: patada en carrera con las piernas de La Mirladora
- **Guanche Guarriors** (Jonay): la patada en carrera lleva en todos los personajes **las piernas de La Mirladora
  cayendo** (una estirada por delante y otra doblada), en el color de piel de cada uno, y ya **no se mueve**: es una
  sola postura en plano mientras dura el vuelo.

## 0.96.2 — 2026-10-27 — Fútbol: el portero saca al compañero más cercano
- **Fútbol** (Jonay): tras una parada el portero ya no saca recto contra el rival que acaba de chutar: pasa al
  compañero más cercano (un poco menos si está marcado), raso o **bombeado si hay un rival en la línea del pase**.

## 0.96.1 — 2026-10-27 — Guanche Guarriors: los golpes salen al soltar
- **Guanche Guarriors** (Jonay): todos los golpes salen **al soltar el botón**: una pulsación corta da el golpe (o la
  patada) normal y mantenerlo medio segundo da el fuerte. Antes salía primero el normal al pulsar y luego cargaba el
  fuerte. La patada en carrera, el salto con golpe y el lagarto siguen saliendo al pulsar.
- El mordisco de los perros, un poco más pegado al hocico.

## 0.96.0 — 2026-10-27 — Guanche Guarriors: patadas bien dibujadas
- **Guanche Guarriors** (Jonay, tras probar la 0.95):
  - **La patada** ya no enseña tres piernas: una se queda de apoyo y solo sube la de delante.
  - **La patada en carrera** es ahora la postura de caída (brazos arriba y una pierna estirada) girada en plano, con la
    pierna estirada por delante. En todos los personajes que la usan (héroes y enemigos).
  - **La patada fuerte** sale sola al mantener el botón derecho medio segundo (sin tener que soltarlo).
  - **El mordisco de los perros**, más pequeño y en el hocico (se salía del perro).
  - **El destello blanco** de un golpe se quedaba fijo sobre el héroe (se veía sobre La Mirladora todo el rato, como
    un escudo); ahora dura lo que debe.
- El piloto de la demo hace la magia con los dos botones (con uno solo ahora daba patadas y se atascaba con el
  Gigantón).
- Prueba nueva 096 (patada fuerte, destello y fotos de las dos patadas y del mordisco).

## 0.95.3 — 2026-10-27 — Bencomo: el caballero a tamaño normal
- **Bencomo** (Jonay): el caballero a caballo sale a tamaño normal (un 25 % más pequeño); el único grande es Lugo.

## 0.95.2 — 2026-10-27 — Arreglos rápidos: el héroe montado en el campamento
- **Guanche Guarriors** (Jonay): al pasar de fase montado en el lagarto, en el campamento de la hoguera no se veía al
  héroe (se quitaban los lagartos pero él seguía «montado»). Ahora se baja al llegar al campamento.
- **Bencomo y Guanche Guarriors**: todas las hojas de personajes empiezan a cargarse al abrir la máquina, así no hace
  falta el dibujo antiguo mientras cargan (era lo que leía el lienzo con getImageData, el aviso alto de la auditoría
  0.90).
- Pruebas: la 076 deja quieto al peatón mientras lo mojas (a veces se salía del chorro y la prueba fallaba); prueba
  nueva 0952 (el campamento montado y las hojas cargadas al abrir).

## 0.95.1 — 2026-10-27 — Bencomo aparece en el picado
- **Bencomo**: la primera vez que hacía el picado (o el salto con la vara) no se le veía, solo la vara: su dibujo sin
  la vara se cargaba en ese momento. Ahora se carga desde el principio y, mientras tanto, se usa el de siempre.
- Pruebas: las fotos de Bencomo de la 0.95 se sacan en el mismo paso que se dibuja (si no, un fotograma del juego le
  quitaba el picado antes de la foto), y la de los récords de la recreativa de naves espera a que acabe la partida.

## 0.95.0 — 2026-10-27 — Fútbol: campo más grande y seis por equipo
- **Fútbol** (Jonay):
  - **El campo, un 30 % más grande** (44 × 70 m) y **5 jugadores de campo más el portero** por equipo: dos defensas,
    dos medios y un delantero. La Copa Laguna y el Mundialito ya juegan con seis.
  - **Cambio de jugador en defensa** (botón derecho): si el más cercano al balón va corriendo por detrás y hay otro
    defensor por delante del balón a una distancia parecida (hasta 1 m más lejos), coges al de delante, el que tiene
    el balón viniendo hacia él.

## 0.94.0 — 2026-10-27 — Guanche Guarriors con patadas y golpes fuertes; retoques de Bencomo
- **Guanche Guarriors: controles nuevos** (Jonay):
  - **Botón izquierdo (A) mantenido: golpe fuerte**. Mientras lo mantienes brilla la mano; al soltar sale un golpe
    más lento que pega más, tumba y da un destello.
  - **Botón derecho: patada a la entrepierna**, que deja aturdido al enemigo (con estrellitas): es el momento de
    saltarle por encima y rematarlo por la espalda. Las brujas (y La Mirladora) no se aturden: solo reciben el daño.
    Los grandes (el Gigantón, los jefes) necesitan la **parada fuerte**: el botón derecho mantenido.
  - **Magia**: los dos botones a la vez.
  - **Ataque en carrera**: ahora con el botón derecho, una patada volando casi en horizontal, con los pies por delante.
  - **Los enemigos también** dan golpes fuertes (avisan con un brillo naranja), patadas que aturden y patadas en
    carrera, más cuanto más nivel tienen. Los perros se lanzan a por ti a la carrera, y el tibicena mayor casi siempre.
- **Guanche Guarriors, además** (Jonay, tras probar la 0.93):
  - **Más margen en profundidad para acertar**: antes había que estar casi a la misma altura que el enemigo; ahora
    llega un poco más arriba y abajo, y algo más con los grandes. Lo mismo para los golpes de los enemigos.
  - **Retrato del enemigo al que pegas**, arriba, con su nombre, su nivel y su vida; cambia al pegar a otro. Si un
    golpe da a varios, se queda el más fuerte (entre iguales, uno al azar).
  - **Los perros**, más grandes (y el tibicena mayor aún más), y muerden con unas fauces con dientes que se cierran,
    como el lagarto.
  - **El duende ladrón**, sin barriga y más bajito (2 píxeles menos de tronco y 2 de piernas); los que llevan pociones
    azules, con el gorro de Papá Noel azul; los rojos, los de la comida.
  - **La vara de El Mencey, cogida por el medio**: sobresale por detrás tanto como por delante.
- **Bencomo**:
  - **La vara**, también cogida por el medio, y en los saltos largos dibujada como la que lleva (con su trazo y su
    color), no como una línea.
  - **El picado**: agachado sobre la vara, que apunta hacia abajo.
  - **Los caballeros**: un capitán castellano con espada sobre un caballo negro como el de Lugo, sin armadura, solo con
    la gualdrapa roja bajo la silla.

## 0.93.0 — 2026-10-27 — Personajes nuevos en Bencomo y Guanche Guarriors
- **Personajes nuevos** (Jonay: «implementa estos assets nuevos»): los dos juegos de la recreativa usan ahora los
  dibujos de la página de propuestas, hechos a partir de packs de itch.io (GandalfHardcore, Evil Wizard 3, PixelHorse
  y el caballero de 18studio) y retocados por nosotros. Cada uno trae sus animaciones: parado, andar, correr, salto,
  golpe y caída.
  - **Guanche Guarriors**: El Magote, El Mencey y La Mirladora (el orbe de Magec pegado al bastón; su golpe es un
    destello y un rayo de luz). Enemigos: los secuaces de Guayota (con y sin escudo), el Gigantón, la Bruja de Anaga,
    la Bruja Mayor, el duende ladrón (paticorto, barrigón, con gorro de Papá Noel y el saco de las pociones), el
    tibicena y Guayota con su hacha de obsidiana.
  - **El lagarto gigante de El Hierro**, nuevo: verde, con cresta y manchas naranjas; anda moviendo las patas en
    diagonal y muerde estirando el cuello. Montado se ve el héroe sentado encima con la puntita del pie asomando.
  - **Bencomo**: él mismo (cinta blanca, melena y asta), agachado de rodillas y con el pinchazo bajo para los perros;
    soldados con morrión, arquero, arcabucero, capitán, perros de presa, caballeros a caballo y Lugo en su caballo
    negro con armadura plateada y lanza de justa.
  - Los paquetes originales se quedan en el PC, fuera de git: al juego solo van los dibujos ya montados.
- **Montado en el lagarto, correr ya es más rápido** (Jonay: «no va más rápido al correr, parece un error»).
- **El ataque en carrera** de los héroes de Guanche Guarriors usa ahora el golpe hacia delante de su animación.

## 0.92.0 — 2026-10-27 — La boca del túnel de Camino el Vallado
- **Camino el Vallado / San Honorato** (Jonay: «sigue siendo una locura, hay demasiadas cosas cruzándose»; debería ser
  un túnel simple bajo la TF-5):
  - Nada más salir del túnel, la calle se parte en sus dos sentidos camino de la rotonda de la gasolinera de San
    Benito. La rampa de salida solo bajaba por uno de los dos ramales; el otro se quedaba arriba y en la Y había un
    escalón con muros y losas cruzados. Ahora la rampa baja por los dos a la vez y la boca es una sola trinchera que
    entra en el túnel.
  - La Y ya no cuenta como cruce, así que la rampa no se acorta a la fuerza (era más empinada de lo necesario).

## 0.91.1 — 2026-10-26 — Arreglo de la 0.91: un puente con coordenadas rotas
- La auditoría de la 0.91.0 salió NO APTO: un puente de la zona de La Cuesta (X 675, Z 3544) quedaba con un tramo de
  0 m al repartir los puntos nuevos de la autopista, y el pretil se calculaba dividiendo por cero (coordenadas «NaN»).
  Ahora los tramos de 0 m se saltan, y las medianas también descartan cualquier altura que no sea un número.
- Los postes azules y los postes de la bionda llevan menos caras (la 0.91.0 subió los vértices un 6 %).

## 0.91.0 — 2026-10-26 — La TF-5 con los dos sentidos separados
- **Autopista del Norte (TF-5)** (Jonay, con una foto de Street View junto a San Benito: «separando los sentidos, así
  como la carretera paralela»):
  - Las dos calzadas iban montadas una sobre otra en muchos tramos (en el mapa, los dos sentidos están a 7–10 m y
    cada calzada mide 13), así que se veía una sola losa con las rayas mezcladas. Ahora se separan al cargar: queda
    hueco para la mediana en toda la autopista, y los ramales y los coches de la IA se mueven con ellas.
  - **Mediana de hormigón tipo New Jersey** entre los dos sentidos, con los **postes azules reflectantes** encima,
    como en la foto. También en las cuestas, donde las dos calzadas van a distinta altura (con su muro hasta la de
    abajo), y en las subidas a los puentes, que antes se quedaban sin mediana.
  - **Bionda (guardarraíl de acero)** entre la autopista y la calle que va pegada a ella (la Calle Espinero, la
    Carretera General…), con sus postes y los postes azules.
  - Antes la mediana solo se buscaba contra la calle más cercana: junto a la Calle Espinero la tapaba y se quedaba
    sin mediana entre los sentidos.

## 0.90.0 — 2026-10-26 — Jugadores nuevos en el basket y Guanche Guarriors, el público y el saque de fondo
- **Basket, los jugadores nuevos** (Jonay eligió el «A++ semicabezón 120»): dibujados con la técnica de la propuesta
  (esqueleto, piezas y sombreado píxel a píxel): cara de perfil con ojo, ceja, nariz, labios y oreja, barba o perilla,
  pelo corto, afro o rapado, camiseta de tirantes con ribetes y número, pantalón ancho, muñequeras, calcetines y
  zapatillas de bota. Todas las animaciones (botar, correr, tirar, defender, los cuatro mates del combo, caerse) salen
  de las mismas poses de antes. La nariz de El Chopa sigue siendo legendaria.
- **Basket, el saque de fondo** (Jonay: «no puede aparecer en medio de la cancha, debe haber continuidad»): tras una
  canasta nadie salta a otro sitio. El equipo que la recibe va andando a su línea de fondo, uno coge el balón detrás
  de la canasta y tiene que pasarlo (A o el clic derecho; la máquina lo saca sola). Sus compañeros vienen a por él y los
  rivales vuelven.
- **Guanche Guarriors, los guerreros nuevos** (Jonay eligió el G1): El Magote (antes «el Mencey», mucho más musculoso,
  con el garrote), El Mencey (antes «el Pastor», como Bencomo, con la vara) y La Mirladora (bikini de piel, melena
  suelta y su bastón de magia). En la pantalla de elegir, en la del título y jugando; los enemigos siguen como estaban.
- **Bencomo** (Jonay: «parece que tenga barrigota», «parecen orejas»): el pecho en V, con la cintura estrecha y los
  brazos separados del cuerpo; con los brazos en alto (el título y el salto con la vara), cada brazo se ve entero
  del hombro a la mano.
- **El público** (Jonay: «más que música, efectos del público»):
  - Basket: el murmullo que sube con la jugada, el «¡uuuh!» al fallar cerca, la ovación y los aplausos con las canastas,
    el organillo del pabellón (el «charge» y otros), el «¡de-fen-sa!» con los pisotones y el chirrido de las zapatillas.
  - Fútbol: el rugido de la grada, el «¡uuuh!» de las ocasiones, el furor con los goles, los pitos a las faltas y el
    bombo de vez en cuando.
  - Pelea: un corro de mirones que se anima con los golpes fuertes y celebra el K. O.
- **Auditorías** (Jonay: «aplica lo que recomiendas»):
  - El fuego de las misiones comparte un solo cilindro para todos (la auditoría 0.76 lo pedía).
  - Partido en funciones lo que se había hecho largo: las pantallas del mundialito (una por pantalla), la defensa del
    basket (el clic derecho y las ayudas) y el texto del diario (la frase de 800 caracteres y los textos largos).

## 0.89.1 — 2026-10-26 — El combo fallado ya no entra
- **Basket** (Jonay: «al fallar el combo acabo de anotar, eso no puede ser»): el balón que rebota en el aro le caía
  encima al que machacaba, lo volvía a coger en el aire y el mate contaba. Ahora, tras un mate al hierro o un tapón, ese
  jugador no puede coger el balón hasta casi un segundo después.

## 0.89.0 — 2026-10-26 — Pausa en los minijuegos, control en el basket y el fútbol, Bencomo nuevo
- **Pausa con la P en todos los minijuegos** (Jonay): basket, fútbol, la pelea, las máquinas (Bencomo, GUFO, Guanche
  Guarriors) y la GOFIO-8. Sale «PAUSA», se para el sonido, y otra P sigue.
- **Basket y fútbol** (Jonay):
  - El que tiene el balón en tu equipo es siempre el tuyo (en el fútbol ya era así; en el basket, ahora también al
    coger un rebote o un robo).
  - **Defendiendo, clic derecho**: pasas a llevar al jugador más cercano al balón. Si ya eres tú, intentas el robo
    (basket) o la entrada (fútbol); si estás lejos, das un acelerón hacia él.
  - **Ayudas en defensa**: cuando el rival entra hacia el aro o hacia la portería, otro defensor deja su sitio y le
    cierra el camino.
- **Bencomo, el muñeco nuevo** (Jonay: «me gusta, usa ese»): el mismo tamaño y los colores de la máquina, con la
  cinta, la barba, el collar, el tamarco al hombro, el pecho al aire, el taparrabos con cordón, tobilleras y los pies
  descalzos. Todos sus cuadros: quieto, correr, saltar, varazo, agachado, picado y herido.
- **Bencomo**: el picado sobre un caballero a caballo te daba a ti si caías sobre el jinete; ahora cuenta caer en
  cualquier punto de la mitad de arriba del enemigo.
- **Vueltas más difíciles y que dan más puntos** (Jonay), en Bencomo, GUFO y Guanche Guarriors: cada vuelta suma
  la mitad de puntos más que la primera (vuelta 2 ×1,5, vuelta 3 ×2…). El cartel de la vuelta lo dice.
- **GUFO, un 5 % más rápido** en todo (Jonay: «es muy fácil»).
- **Basket, combos** (Jonay): hay un 25 % menos de tiempo para meterlo (2,7 s); si fallas una tecla o se acaba el
  tiempo, el jugador vuela igual con su mate y lo estrella contra el aro, en vez de soltar el balón.

## 0.88.1 — 2026-10-26 — Entrada y palomita con postura propia
- **Fútbol** (Jonay): la entrada se hace con una pierna estirada hacia el balón y la otra doblada con la rodilla
  arriba; en la palomita, el portero vuela con los dos brazos estirados por delante y los guantes. Antes era el
  muñeco de pie, tumbado.

## 0.88.0 — 2026-10-26 — Futbolistas nuevos
- **Los jugadores del fútbol, redibujados** (Jonay eligió la propuesta «F2»): la misma cámara desde arriba y el mismo
  tamaño, pero dibujados a la resolución real del partido.
  - Luz y sombra, contorno de un píxel, rodillas, medias con su raya y botas con suela.
  - El número en la espalda, ojos, cejas, el pelo con brillo y la cabeza un poco más grande.
  - La palomita del portero, las entradas y el jugador tirado en el suelo usan el mismo muñeco tumbado.
  - La flecha y el nombre del jugador que llevas suben un poco, por la cabeza más grande.
- Vale para Play Furbito y para los partidos de las canchas.

## 0.87.1 — 2026-10-26 — «Guanche Guarriors»
- La máquina de las jugueterías se llama **«GUANCHE GUARRIORS»** (Jonay): pantalla de título, marquesina, la opción
  de la juguetería, el diario, el póster del piso y la llamada de El Blanco.

## 0.87.0 — 2026-10-26 — Selecciones de basket en Pachanga 3x3
- **Pachanga 3x3 tiene sus propias selecciones** (Jonay): entran **EE. UU., Serbia y Lituania** y salen Brasil,
  Portugal y Uruguay, que siguen en Play Furbito. Cada una con su bandera, sus dos equipaciones y jugadores parodia.
- **Un nivel por deporte** (Jonay: «España no puede ser de las más malas»). España es de las mejores en los dos: en
  basket, solo EE. UU. está por encima; en fútbol, es la primera. Las barritas de nivel de la pantalla de elegir país
  cambian según el cartucho.
- **En Pachanga, los muñequitos van de basket** (Jonay: parecían de fútbol): camiseta de tirantes, pantalón largo,
  calcetín corto y zapatillas. Play Furbito se queda igual.

## 0.86.0 — 2026-10-26 — El mundialito, entero dentro de la GOFIO-8
- **Pachanga 3x3 y Play Furbito ya no salen al mundo 3D** (Jonay): todo pasa en la pantalla de la consola.
  - **Elegir selección**: las 8 banderas, las dos equipaciones de cada país y su nivel. Se elige con las flechas y A.
  - **El cuadro del mundialito**: cuartos, semis y final, con tu cruce marcado y las dos equipaciones del partido.
    A juega y Q se retira.
  - **Los partidos** se juegan en el basket / fútbol 2D con la consola esperando detrás. Al acabar se vuelve a la
    GOFIO-8, a la pantalla de resultados (el tuyo y los otros cruces), sin pasar por el salón ni por el menú de
    pausa.
  - **Campeones**: confeti, las iniciales con las flechas (como en las máquinas) y la tabla de campeones.
  - **Eliminados**: vuelves a elegir país. Esc vuelve al menú de cartuchos.
  - La música del mundialito tiene dos frases que se alternan.

## 0.85.1 — 2026-10-20 — Tanda de pendientes rápidos
- **Esc en la consola** (Jonay): desde un juego vuelves al menú de cartuchos de la GOFIO-8, y desde el menú sales al
  mundo 3D. Ya no se abre el menú de pausa al salir de una máquina.
- **Basket**: al pasar, el que recibe el balón pasa a ser el tuyo al momento (antes había que volver a pulsar).
- **Persecuciones más difíciles** (Jonay): el coche que huye frena menos en las curvas y corre un poco más (un 10 %).
  Las carreras y los autobuses no cambian.
- **Canchas**: ninguna puede pisar a otra. Si dos se cruzan o se tocan (con 1,5 m de pasillo), se queda la grande.
- **Bencomo**: lo de bajar con la vara en el aire se llama «PICADO» (antes «POGO»).
- Código:
  - Las puertas de los interiores comparten geometrías y materiales (auditoría v0.83).
  - La Concepción reutiliza sus objetos de ayuda al construirse (auditoría v0.81).
  - El build avisa de más comentarios `//` a media línea que se tragan código.

## 0.85.0 — 2026-10-20 — Pachanga 3x3 y Play Furbito: el mundialito en la GOFIO-8
- **Dos cartuchos nuevos de deportes** (Jonay): **PACHANGA 3x3** (el basket 3 contra 3) y **PLAY FURBITO** (el fútbol
  5 contra 5). Se compran en la juguetería y salen en el menú de la consola.
  - Al empezar eliges selección entre **8 países**: España, Brasil, Argentina, Italia, Alemania, Francia, Portugal y
    Uruguay, cada uno con sus jugadores parodia.
  - **El mundialito**: cuartos, semifinal y final. Cada ronda el rival es mejor, y los otros cruces se juegan solos.
  - **Las equipaciones no chocan**: si la camiseta del rival se parece a la tuya, sale con la segunda.
  - Si ganas la final, pones tus **iniciales en la tabla de campeones**.
- **El superfriki jugón**: cuando tienes todos los cartuchos, en la juguetería te lo dicen y se abre el **torneo de
  videojuegos** (sale en el diario, con los mundialitos ganados).
- La pantalla de controles del basket decía «2 CONTRA 2»: ahora pone los que juegan. En la del fútbol, «PARA EMPEZAR»
  ya no se monta sobre la fila del regate.

## 0.84.0 — 2026-10-20 — El baloncesto pasa a 3 contra 3
- **El basket de las canchas es ahora 3 contra 3** (Jonay), el paso previo a Pachanga 3x3 en la consola:
  - Juegas con Coco y **El Blanco**. Si un partido viene con equipos de dos (los rivales de las misiones), se completa
    solo con un tercero vestido como los suyos.
  - **Defensa uno contra uno**: cada uno marca a un rival distinto, y tú te quedas con el que tienes más cerca.
  - En ataque, los dos sin balón se abren: uno al ala y otro arriba, en la cabeza de la zona.
  - Los pases van al compañero más libre y más cerca del aro.
  - El reto de la cancha dice «Partido 3 contra 3».
  - La máquina mueve más el balón cuando lleva un rato con él, y el tercer rival tiene mote: El Zurdo, El Rubio…
- **«Guerra de Naves» pasa a llamarse «GUFO, AGUERE INVASION»** (Jonay). En canario un gufo es un pedo, y además son
  las siglas de *Guanche Unknown Flying Object*. Cambian la pantalla de título (GUFO en grande), la marquesina, la
  opción de los bares, el diario, la leyenda y la llamada de El Blanco.
- **Sonido de las máquinas** (Jonay: «la música, menos protagonismo; más efectos; melodías más largas»):
  - La música suena más baja y los efectos van por su propio canal, más alto.
  - Las músicas de fase y de jefe de Bencomo, GUFO y Guanche Warriors encadenan varios estribillos (A B A C…), en vez
    de repetir siempre la misma frase.
  - Efectos nuevos en Guanche Warriors: el mordisco del lagarto y el «fiu» de la pirueta y del salto.
  - GUFO ya tenía los sonidos suaves del disparo, del láser y del impacto en la 0.83.2; ahora se oyen por encima de
    la música.
- Guanche Warriors: los enemigos solo atacan cuando ya están dentro de la pantalla (Guayota pegaba desde fuera del
  borde, sin dejarse alcanzar).
- Bencomo: las tuneras vuelven a no pinchar a los castellanos (Jonay: lo hacía demasiado fácil). Se quedan con el
  aspecto nuevo.

## 0.83.2 — 2026-10-20 — Iconos nuevos en el mapa y golpes nuevos en Guanche Warriors
- **Iconos del mapa** (Jonay), en el minimapa, en el mapa grande (M), en la leyenda y en el diario (J):
  - Las jugueterías: **un robot**, en vez de la gota o el osito.
  - La inmobiliaria Pisos Chachi: **una casita** naranja.
  - Tu casa: **la cara del Chopa**.
  La leyenda dibuja los mismos iconos que el mapa, y en el diario cada entrada lleva el suyo y dice cuál buscar.
- **Guanche Warriors** (Jonay):
  - **Atacar corriendo**: un salto hacia delante con una patada voladora que tumba.
  - **El remate por detrás**: tras el segundo golpe del combo el enemigo se queda aturdido un momento. Si ahí saltas
    (B), el guerrero hace una pirueta por encima y le golpea por la espalda, y lo tumba («¡POR DETRÁS!», +300).
  - **Los lagartos atacan**:
    - Muerden alargando el cuello, con las fauces abiertas.
    - En carrera dan un salto y un coletazo a los dos lados.
    Lo hacen los de los jinetes enemigos y el tuyo: A muerde y, corriendo, A salta y da el coletazo.
  - **Botín**: de vez en cuando los enemigos sueltan un zurrón de magia (para recargar a mitad de fase, no solo con los
    duendes) y algunos sueltan comida.
- **Tu casa, por dentro** (Jonay: «al entrar se debe ver el salón comedor»): entras al salón-comedor, con el sofá y
  un sillón mirando a la tele, la mesa del comedor con dos sillas y un frutero. En los pisos grandes hay además una
  librería. El pisito de Herradores es un poco más hondo, para que al entrar lo veas todo de frente.
- **Bencomo: las tuneras se ven peligrosas** (Jonay): un contorno oscuro suave, espinas claras por todas las palas e
  higos picones rojos.
- **Guerra de Naves: sonidos suaves** (Jonay): el disparo, el láser (un zumbido propio), un «tic» cuando le das a una
  nave sin destruirla (también al ojo del jefe) y una explosión pequeña para las naves pequeñas.

## 0.83.1 — 2026-10-20 — La entrada de casa de El Blanco, marcada con su cilindro de luz
- **La entrada de casa de El Blanco** (Teobaldo Power) se marca como los otros sitios: un cilindro de luz
  transparente, en naranja (Jonay). La puerta de la inmobiliaria Pisos Chachi lleva también el suyo, en ámbar.

## 0.83.0 — 2026-10-20 — La casa: la inmobiliaria Pisos Chachi, tu piso y la consola GOFIO-8
- **La inmobiliaria Pisos Chachi** (parodia), en la Calle Heraclio Sánchez. Te llama por el móvil cuando ya eres
  Defensor y El Blanco te ha contado lo de las recreativas. Tiene:
  - **El pisito de Herradores**, al lado del Pasaje Teide: en alquiler, $250 por semana (7 días del juego). Avisa
    cuando se acaba y se renueva en la oficina.
  - Pisos en venta, caros:
    - Calle San Agustín: $18.000.
    - Calle Viana, una casa con patio: $32.000.
    - Ático en la Plaza del Adelantado: $55.000.
  Son edificios de verdad del mapa, con la puerta en la fachada de su calle. Solo se abren cuando son tuyos; antes no
  se ve ni la puerta.
- **Dentro de casa**:
  - La **cama**: duermes hasta las 8, te pones al 100 % de salud y se guarda la partida.
  - El sofá, la tele, una cocinita y, en los pisos grandes, una mesa para la banda.
- **La consola GOFIO-8**: se compra en las jugueterías ($1.200) y se instala sola en la tele de tu casa. Los cartuchos
  también se venden allí:
  - Bencomo: $90.
  - Guerra de Naves: $120.
  - Guanche Warriors: $150.
  Al encenderla (E delante de la tele) sale **un menú con los cartuchos que tienes**. Se juega gratis y con récords
  propios de casa; con Q se vuelve al menú.
- **Las jugueterías se marcan con un osito de peluche** (Jonay: la gota no decía «juguetería»), en el minimapa, en el
  mapa y en el icono que flota sobre la tienda.
- **La leyenda del mapa grande** dice qué es cada marca y, como el diario, solo enseña lo que ya tienes abierto:
  maleantes, casa de El Blanco, bares con máquina, jugueterías, inmobiliaria y tu casa. En el mapa grande ya sale
  también la casa de El Blanco.
- **Diario (J)**: entradas nuevas en «Lo que sabes» para la inmobiliaria, tu casa y la consola, con la más cercana y
  su ruta al GPS.
- **Arreglo**: al cargar una partida se perdía lo de las recreativas (los récords, la llamada de El Blanco, lo
  comprado). Ahora se guarda y se recupera, igual que la casa.

## 0.82.2 — 2026-10-20 — Las jugueterías y los bares de la máquina, en el mapa
- **Las jugueterías salen en el minimapa y en el mapa grande (M)** con la gota azul, una vez abiertas (Jonay: «¿cómo sé
  dónde hay una juguetería?»). En el minimapa salen las de alrededor, y la más cercana siempre, en el borde si está
  lejos.
- **Los bares y cafeterías con la máquina de Guerra de Naves** llevan un aro violeta alrededor de su cuadrado rojo, en el
  minimapa y en el mapa.
- **Diario (J)**: en «Lo que sabes», las jugueterías, Guerra de Naves, Guanche Warriors y la máquina de El Blanco dicen
  cuál te queda más cerca y a cuántos metros. El botón «MARCAR EN EL GPS» te pone la ruta.
- **Las máquinas se ven más nítidas y limpias** (Jonay: «parece un filtro, como con líneas duplicadas»):
  - **A la resolución a la que juegas**: la máquina mide tu ventana en píxeles reales (también con la escala de Windows) y
    dibuja el mueble y el juego directamente a ese tamaño. Un píxel dibujado es un píxel en pantalla, sin estirar ni
    encoger. Antes se dibujaba en pequeño (480×336) y se estiraba ×2,25 con píxeles duros, y por eso unas filas
    salían dobles; luego se estiraba otra vez el mueble a la ventana. Si cambias el tamaño de la ventana, se recalcula.
  - Los fondos de Guerra de Naves y de Guanche Warriors están dibujados al doble de resolución.
  - Fuera las líneas de barrido de tele de tubo: solo salen si se activa `SETTINGS.crt`.

## 0.82.1 — 2026-10-20 — El diario cuenta lo que te dicen por el móvil y solo enseña lo que ya puedes hacer
- **Diario (J), sección nueva «Lo que sabes»** (Jonay): todo lo que te cuentan por el móvil, cada cosa con su entrada.
  Cada entrada dice quién te lo contó, qué es, dónde está y la conversación. Hay entradas para:
  - Los maleantes en busca y captura.
  - La máquina de El Blanco (Bencomo, con el récord de la máquina).
  - Guerra de Naves en los bares y Guanche Warriors en las jugueterías.
  - Las jugueterías.
  - Los retos en las canchas y en los campos de fútbol.
  - El coche patrulla de la banda.
- **Lo que aún no es accesible no se ve**: se acabaron el «(aún no)» y las misiones pendientes con su nombre. El
  diario va apareciendo según se abren las cosas: solo se ven las misiones hechas, la que está en curso y la
  siguiente de cada historia abierta.
- Las llamadas que abren algo guardan su conversación en la entrada de esa cosa, no en «Charlas sueltas».
- **Bencomo: la pelea final con Lugo cabe en una pantalla** (Jonay: se salía de la pantalla): la cámara se queda quieta
  y Lugo carga de un borde a otro sin salirse.
- Guanche Warriors: a los enemigos grandes se les alcanza un poco antes según su tamaño.

## 0.82.0 — 2026-10-20 — «GUANCHE WARRIORS», la máquina de las jugueterías
- **Recreativa nueva: «GUANCHE WARRIORS»** (`09m_guanche.js`), un beat'em up tipo Golden Axe: se avanza de lado con
  profundidad, no es de plataformas. Es la máquina de pago de las **jugueterías**: sale en el menú de la tienda una
  vez que El Blanco te ha llamado, cuesta $1 la partida y cada tienda tiene su tabla de récords.
  - **Se elige guerrero al empezar**:
    - **El Mencey**: fuerte y lento, con garrote canario. Magia: «Ira de Achamán», un temblor de tierra, hasta 4
      zurrones.
    - **El Pastor**: ágil y menos fuerte. La vara llega más lejos y, corriendo, B hace el salto del pastor. Magia:
      «Viento alisio», remolinos, hasta 5 zurrones.
    - **La Mirladora**: ágil, menos física y con la magia más fuerte. Magia: «Luz de Magec», rayos de sol, hasta 7
      zurrones.
  - Los personajes, **al tamaño del Bencomo grande** (Jonay), dibujados como muñecos de píxeles articulados: andan,
    corren, saltan, golpean, caen y se levantan.
  - **Controles de siempre**:
    - A (E / clic izquierdo) pega: combo de 3, y el tercero tumba. Corriendo, embestida; en el aire, golpe desde
      arriba.
    - B (Espacio) salta; junto a un lagarto suelto, lo montas.
    - Q / clic derecho lanza la magia, que gasta todos los zurrones que lleves.
    - Doble toque ← / → = correr.
  - **Historia**: Guayota ha raptado a Magec, el sol, dentro del Teide.
  - **5 fases con su jefe**:
    1. El poblado de Taoro. Jefe: el Gigantón de Tigaiga.
    2. La laurisilva de Anaga. Jefa: la Bruja de Anaga.
    3. Los acantilados de Los Gigantes. Jefe: el Tibicena Mayor.
    4. Las Cañadas. Jefes: los hermanos gigantones, montados en lagartos.
    5. Dentro del Echeyde. Jefe: Guayota.
    Entre fase y fase, el campamento de noche: los duendes vienen a robar y, si les pegas, sueltan zurrones de magia
    y comida. Al final, «¡Magec es libre!» y una segunda vuelta más difícil.
  - **Enemigos**:
    - Los secuaces de Guayota, también con escudo.
    - Los tibicenas: perros demonio negros que se lanzan.
    - Los gigantones: no se paran con golpes flojos.
    - Las brujas, que tiran fuego y se teletransportan.
    - Los duendes ladrones.
    - Los jinetes en el **lagarto gigante de El Hierro**: si tumbas al jinete, el lagarto es tuyo y con A da
      coletazos.
  - Música chiptune propia por fase, para el jefe, el campamento y el título.
- El Blanco, al llamar, ya cuenta también lo de las jugueterías.

## 0.81.0 — 2026-10-20 — «GUERRA DE NAVES», la máquina de los bares
- **Recreativa nueva: «GUERRA DE NAVES»** (`09l_naves.js`), un matamarcianos horizontal tipo R-Type / Nemesis. Es la
  máquina de pago de las **cafeterías y las tascas**: sale en el menú de la barra una vez que El Blanco te ha llamado,
  cuesta $1 la partida y cada bar tiene su propia tabla de récords.
  - La nave (el AGUERE-1) se ve **pequeña, a ×1** (Jonay: hace falta espacio para ver venir las cosas).
  - **Controles de siempre**:
    - A (E / clic izquierdo) dispara; si lo mantienes y lo sueltas, sale el **BEAM cargado**, en dos niveles.
    - B (Espacio) maneja el **MÓDULO**, como la Force de R-Type: se pega delante o detrás, B lo lanza y B lo recoge.
      Para las balas pequeñas y daña lo que toca.
    - Q / clic derecho coge la mejora marcada en la **barra estilo Nemesis**: VELOC, MISIL, DOBLE, LÁSER, OPCIÓN y
      ESCUDO. Cada cápsula mueve la marca una casilla.
  - **3 fases con su jefe**:
    1. El cielo de Aguere, con los tejados de La Laguna y el Teide al fondo. Jefe: la nave nodriza, a la que hay que
       darle en el ojo cuando lo abre.
    2. Las entrañas del Teide: cueva de lava con torretas, bombas de lava y pasos estrechos. Jefe: la sierpe de lava.
    3. El mar de nubes: la colmena. Jefe: la reina, con su láser del ojo.
    Después de la tercera, segunda vuelta más rápida.
  - Enemigos: escuadrillas (si las tumbas enteras, sueltan cápsula), palomitas, kamikazes, torretas, cargueros que
    sueltan el módulo, minas y bombas de lava.
  - Música chiptune propia por fase, para el jefe y el título; demo, récords y continuar como en Bencomo.
- El Blanco, al llamar, ya cuenta que la máquina está en los bares.
- Bencomo, fase 1: el último barranco largo pasa de 7 a 6 casillas y tiene una pintadera (punto de control) justo antes.

## 0.80.1 — 2026-10-19 — Bencomo más grande y con más detalle; portales sin balcones
- **BENCOMO se ve más grande y con más resolución** (Jonay: «el pj al menos un 50 % más grande»):
  - La pantalla de la máquina pasa a 480×336 y el mundo se dibuja a ×2. Bencomo, los enemigos y el escenario se ven un
    33 % más grandes que en la v0.80.0. Es un punto intermedio: al 60 % se veía demasiado poco de la fase.
  - La cámara sigue también en altura, como en Mario o Sonic.
  - Los sprites salen a doble resolución (escalado scale2x del pixel art, con diagonales redondeadas, contorno fino y
    luz en los bordes de arriba).
  - Las baldosas, la hierba, la roca y los fondos (mar, carabelas, barranco, laurisilva, el Teide) se dibujan a doble
    detalle.
  - La pantalla de título es nueva y la tabla de récords está recolocada.
  - **Música folclórica canaria en la fase 2** (el Barranco de Acentejo): una isa en 3/4 con castañuelas, un punteo
    como de timple y el bajo de guitarra. Cada fase tiene su música: la costa, el barranco, la emboscada y el jefe. Todas son ahora más largas y menos
    repetitivas, con una parte A, una parte B y sus variaciones, y en la costa entra una segunda voz.
  - **Agacharse** (↓ en el suelo): Bencomo pega bajo con el banot para darle a los perros, y agachado esquiva las
    flechas y los balazos.
- **Portales del Edificio Casa del Blanco**: ya no los atraviesa un balcón, y alrededor de los arcos la pared es lisa,
  sin ventanas (Street View).

## 0.80.0 — 2026-10-19 — Las recreativas: «BENCOMO, Acentejo's Revenge» en casa de El Blanco
- **Motor de recreativas** (`09j_arcade.js`), común para todas las máquinas que vendrán:
  - Mueble con marquesina, marco, cristal con reflejo y líneas de barrido.
  - El ciclo de los 80: pantalla de título, demo jugada sola, tabla de récords, FREE PLAY / INSERT COIN, START,
    CONTINUE? 9…0 e **iniciales de 3 letras** con ↑↓ y A.
  - 10 récords por máquina, que se guardan con la partida. Las máquinas traen de serie los de la banda (BLA, COC,
    SAS…).
  - **Música chiptune** propia: dos canales cuadrados, uno triangular y ruido, con sonidos de 8 bits.
  - Las teclas de siempre, y Esc para salir.
- **«BENCOMO, Acentejo's Revenge»**: plataformas al estilo Mario / Sonic / Prehistorik, satírico pero con elementos
  reales de la cultura guanche.
  - **Bencomo**, mencey de Taoro, en la **Matanza de Acentejo** (31 de mayo de 1494).
  - **Salto del pastor**: corriendo, B clava la vara y salta el doble de alto y mucho más lejos. Con ↑ + B salta
    parado.
  - **Pogo**: ↓ en el aire pone la vara hacia abajo para rebotar en las cabezas, y hasta en las tuneras.
  - **Varazo** con el banot (A), que también devuelve las flechas. **Piedras** con Q.
  - **Comida**: puñados de gofio (100 = una vida), zurrón de gofio (corazón), queso de cabra (vida) y gofio con miel de
    palma (invencible).
  - **Enemigos**: soldados con espada, ballesteros, arcabuceros (la mecha avisa), perros de presa, caballeros a caballo
    y capitanes con armadura.
  - **3 fases**:
    1. **La Costa de Añaza**, con las carabelas al fondo.
    2. **El Barranco de Acentejo**: los guanches tiran piedras desde arriba (la sombra avisa) y también aplastan a los
       castellanos.
    3. **La Emboscada** en la laurisilva, con **Alonso Fernández de Lugo** en su caballo blanco: embiste, lanza tajos y
       llama refuerzos, y al final **huye herido**, como en la historia.
  - Pintaderas como puntos de control, tagoror al final de cada fase y bonus de tiempo y vida.
  - Después empieza la **segunda vuelta**, más rápida y con más enemigos.
  - Música propia por fase, con aire de tajaraste, y otra para el jefe.
- **Casa de El Blanco**:
  - Tras «Defensores de La Laguna», **El Blanco te llama por el móvil**, te invita a jugar a su máquina y te cuenta que
    habrá máquinas en los bares y juegos en las jugueterías.
  - La entrada está pegada al edificio (X −772 Z −413) y sale como un cuadrado naranja en el minimapa. Con E subes a
    jugar gratis cuando quieras. No es una misión.
- **Fútbol** (Jonay: «si vas corriendo puedes llegar a la puerta sin chutar»): cuando un rival entra en el área con
  el balón, el portero sale corriendo y se tira a sus pies. Si no ha chutado antes de que llegue, se la quita siempre.
- El edificio amarillo de Teobaldo Power, donde viven El Blanco y sus padres, se llama ahora **«Edificio Casa del
  Blanco»** en el mapa, con sus **portales de piedra en arco y cancelas verdes de hierro** (Street View): dos en Teobaldo
  Power, que es por donde se sube a jugar, y uno en la Calle Adelantado, junto a El Blanco.
- Prueba nueva `prueba_080.py`: el ciclo de la máquina, los movimientos (salto, salto del pastor, pogo), el recorrido
  de las fases con el piloto automático, el jefe, CONTINUE y las iniciales, y la casa de El Blanco. Con fotos.

## 0.79.0 — 2026-10-19 — Rifle a dos manos, palomitas, regates y mates de combo
- **Rifle de agua con las dos manos**: ya no atraviesa el brazo.
  - Apuntando: la culata al hombro, la mano derecha en la empuñadura con el codo abajo y la izquierda bajo el
    guardamanos.
  - Sin apuntar: cruzado delante del cuerpo, cogido con las dos manos.
  - Para eso hay una cinemática inversa de dos huesos para los brazos (`armIK`).
- **Mapa grande**: los puntos de misión, los destinos y las tiendas se pintan encima de los nombres. Antes un punto azul
  quedaba tapado por «Centro de Salud…».
- **Fútbol**:
  - **Palomitas**: el portero se estira a por los tiros que le pasan lejos, y blocan o despejan («¡PALOMITA!»).
  - **Saque de centro tras cada gol**: lo saca el que lo recibió, con el pie. El rival se queda fuera del círculo y no
    puede quitarle el balón hasta que lo pasa o corre con él.
  - **Fuerza del tiro según la distancia**: cerca de la portería, un tiro a tope se va por encima del larguero. Desde
    casi el medio campo sí se puede pegar a tope.
  - **Regate**: dos veces Espacio con el balón. Es un quiebro que el rival no puede robar.
- **Baloncesto**:
  - **Cada combo es un mate espectacular con su propia animación**, cuadro a cuadro y con el balón en las manos.
    - Con puño: el **Mate 360 del Gofio** y el **Molino del Teide** (windmill/tomahawk).
    - Con patada: **Espaldas del Roque** (de espaldas, abriendo las piernas y con el balón abajo primero) y
      **Entrepiernas del Pastor** (pasa el balón entre las piernas en el salto, de frente).
  - **La CPU también hace combos de mate**, más cuanto mejor es el equipo. No se le ven las teclas y puede fallarlos.
    Un mate de combo en el aire no se puede robar.
  - **Los pases largos van en arco** (antes iban rectísimos).
- Prueba nueva `prueba_079.py`: el rifle con las dos manos y fotos; en fútbol, el saque de centro, las palomitas, la
  fuerza del tiro y el regate; los 4 mates con fotos de cada uno, los combos de la CPU buena y el pase largo; el mapa.
- Plan de las recreativas, la consola y el pisito en `docs/11_recreativas.md`.

## 0.78.1 — 2026-10-19 — Pasaje Aguere en dos niveles: escaleras curvas y galería baja
- **Patio del Cine Aguere en dos niveles**: desde Herradores se llega al patio a nivel de calle, a un rellano con
  barandilla. Desde ahí **dos escaleras curvas, una por la izquierda y otra por la derecha**, bajan rodeando el círculo
  (30 peldaños, unos 5 m) hasta el suelo rojo del patio. Abajo están la boca de la galería con la banda «AGÜERITO» encima
  y tiendas con rejas, también bajo el rellano.
- **Galería baja**: del patio a la calle El Juego, llana, con suelo rojo, tiendas y bares a los lados y techo con luz.
  Sale a la calle por el hueco de la fachada, sin asomar a la acera.
- **Ya no se transparenta**: dentro del pasaje la cámara se queda bajo el techo. Antes subía al hueco del edificio y
  parecía que no había nada encima. Además, las paredes del pasaje se ven por las dos caras, y el suelo del camino de
  OSM ya no pasa por el patio ni por la galería de abajo.
- Prueba `prueba_078.py`: baja andando por la escalera de la derecha hasta la salida de El Juego y comprueba la altura
  en cada paso y la cámara bajo el techo.

## 0.78.0 — 2026-10-19 — Mapa: el pasaje del Cine Aguere y uniones de puentes
- **Pasaje Teide y Pasaje Aguere**: la galería que va por debajo de los edificios desde la calle Obispo Rey Redondo
  (junto al «Desencuentro»), cruza Herradores y sale a la calle El Juego, con tiendas y bares parodia a los dos lados
  (Bar El Guanchito, Zapatería Teidefinitivo, Cafetería Aguerita, Móviles Guanchófono…), techo con luz y los edificios
  encima (donde el mapa de OSM la dejaba al aire, ahora hay un bloque encima). Se recorre andando de punta a punta.
- **Patio del antiguo Cine Aguere**: a mitad del pasaje, el agujero redondo al cielo con la cristalera curva de dos
  plantas, la banda negra con el rótulo «AGÜERITO», una cara enorme pintada en la pared de arriba, suelo rojo y la
  escalera que baja a la galería de abajo (rejas, columna) tras la barandilla (todavía no se baja).
- Otros pasajes bajo edificios (el de La Concepción y algunos más): hueco en la fachada y se pasa por debajo.
- **Finales de tablero y rampas**: los tramos elevados bajan a la calle donde terminan (Travesía Enlace Andenes del
  Sobradillo / Av. Ghandi, Vía de Ronda); una calle a nivel junto a un terraplén bajo ya no sube al coche encima; desde
  la calle solo se cae a un túnel donde está su boca; la rampa de servicio junto a la Av. Astrofísico Francisco Sánchez
  ya no tiene el escalón de 1,2 m.
- **Prueba de conducción**: los «tramos que fallan» (Autopista del Norte ×2, Camino La Rúa, Camino La Hornera) eran
  de la propia prueba (el coche se alejaba más de 300 m del jugador y dejaba de moverse; tomaba las curvas cerradas a
  80 km/h): ahora pasan los 112 tramos.
- **Callejero**: Casa de la Alhóndiga, Casa Riquel, Casa Mustelier, Casa de Ossuna, Palacete Rodríguez de Azero, las
  capillas de la Cruz Verde y de los Plateros, la Casa Museo Los Sabandeños y la Fundación Cristino de Vera con su
  fachada histórica y su nombre en el mapa (para usarlas en misiones).
- **Salud**: la clínica privada junto a la TF-5 («Clínica Quirófano Salud», parodia) cuenta como centro de salud.
- Aeropuerto: la marquesina de la terminal llega por encima del carril de dejar pasajeros, con columnas en la acera.
- TF-13: los muros de la trinchera son de piedra oscura (basalto), como en las fotos.
- Herramientas: `sonda_conduccion.py` (traza de un coche por las calles de un punto) y `sonda_perfil.py` (escalones de
  la calzada entre dos puntos).

## 0.77.0 — 2026-10-19 — Rendimiento: ciudad juntada, recorte por distancia y carga más rápida
- **Piezas sueltas juntadas** (auditorías P1.5): las ~5.000 piezas sueltas que no se mueven (bancos, bolardos,
  papeleras, piezas de iglesias, gradas…) se juntan en una malla por material y celda de 125 m. Personas, coches, patos
  y lo que se mueve u oculta se quedan como estaban.
- **Recorte por distancia según la niebla**: lo que queda detrás de la niebla ya no se pinta; los detalles pequeños
  (molduras, balcones, rótulos, mobiliario) solo de cerca; las copas de los árboles lejanos con pocos triángulos.
  Árboles, farolas, postes y señales van por celdas (antes se pintaban enteros para toda la ciudad).
  En la calle: **de ~5.600 a ~1.900 llamadas de dibujo y de 5,1 a 3,5 millones de triángulos** por fotograma; en el
  auditor (con tarjeta gráfica) pintar un fotograma pasa de 47,8 a 29,8 ms y el arranque de 13,2 a 8,4 s.
- **Coches aparcados instanciados**: una geometría por modelo para todos los coches aparcados (pintura por coche).
  Su paso de la carga pasa de ~1,9 s a ~0,3 s y la geometría en memoria baja (38 → 36 MB).
- **Carga más rápida**: plazas y parques de ~3,2 s a ~0,4 s (rejilla para no comparar cada árbol con cada banco).
  En total, de ~11,2 s a ~7,6 s en el PC de pruebas.
- **Lint** (auditoría P2.5): el build comprueba que no hay nombres sin declarar ni declarados dos veces entre archivos.
- Pruebas: `prueba_077.py` (fotos del mismo sitio con la ciudad juntada y con las piezas originales);
  `sonda_rendimiento.py` mide llamadas, triángulos y cada paso de la carga. El piloto automático de las misiones ya
  compra el rifle, apaga los fuegos y moja a Boca Papa.
- Al cargar una partida se quitan los coches que quedaban de misiones anteriores, y el coche del Canarión deja de
  contar como coche de misión al acabar la carrera.
- Las pruebas ya no suenan (voz del sistema y sonido del juego en silencio).

## 0.76.0 — 2026-10-19 — Rifle de agua, el Secreta y 14 misiones nuevas
- **Rifle de agua** (estilo rifle eléctrico de juguete, blanco y naranja con depósito transparente): chorro en parábola
  de unos 10 m que deja charquitos, apaga fuegos y empapa a la gente; se llena en las fuentes (E) y se vende en las
  **jugueterías** (Juguetes Sabelotodo, Baobabito, Lífer), que también venden bolitas para la pistola. Tab cambia entre
  puños, pistola y rifle (1 / 2 / 3). **El que mojas te persigue y, si te pilla, hay pelea.**
- **Historia: «El rifle de agua»** (El Blanco): abre las jugueterías; lo compras y lo pruebas en una plaza con fuente:
  apagas los papeles que quema El Blanco, recargas en la fuente y le mojas la cabeza a Boca Papa, que duerme al lado,
  desde 10 m.
- **El Secreta**: el inspector Fulgencio Tostón (Avenida de los Menceyes), seis misiones: seguir un coche sin que te
  vea, contenedores en llamas y el pirómano, el partido amañado, triple en la cancha y la huida, mojar al pirómano y la
  Operación Gofio Blanco (carrera, pelea, pistola, fuego y persecución).
- **El Obispo**: fuego en una iglesia, la carrera de los sacristanes (a pie), curas contra concejales (fútbol) y el
  ladrón del cepillo.
- **Carreras del Canarión**: duelo nocturno en la pista de Los Rodeos, contrarreloj por el casco y el Gran Premio.
- **Maleantes**: Sastrón te los explica por teléfono al aprender a pelear; salen como triángulos rojos.
- **Parkings**: el techo ya no corta las escaleras (ni se ve una pared a media escalera desde la plaza, ni el personaje
  hundido); se anda por todo el ancho de la sala (tope invisible en el carril); junto a las rampas ya no te hundes en
  la acera ni te frena una pared invisible. **La Trinidad: un solo parking de ~420 m bajo toda la avenida**, más hondo,
  con la pendiente de la calle, rampas en los dos extremos y escaleras a las dos aceras.
- **Pabellón Juan Ríos Tejera** rehecho: nave baja blanca con franjas moradas y cubierta gris (era un bloque de pisos).
- **Tranvía junto al Campus Central**: ya no hay aceras flotando sobre la trinchera.

## 0.75.0 — 2026-10-13 — Copa Laguna, reglas del portero y flechas de misión
- **Copa Laguna**: torneo de fútbol como el Torneo Lagunero (se abre tras el primer partido de fútbol del Obispo): cuatro
  campos por la ciudad, cada rival más fuerte (Atlético Gofio de Geneto, Unión Perenquén, Deportivo Papas Arrugadas,
  Real Mojo Tejina) y la **final en el Estadio Francisco Peraza** contra Los Galácticos de Guamasa.
- **Estadio Francisco Peraza**: las gradas que salían como muros son ya gradas de verdad (asientos en pendiente sobre la
  pista, tribuna este con techo) y tiene entrada en la calle con su nombre y taquilla.
- **Fútbol**: el portero coge el balón con la mano y una parada se ataja o se despeja; mientras la tiene, y en los saques
  de banda (con la mano), córners y saques de puerta, nadie se acerca a menos de 3,5 m (círculo a rayas), no hay robos
  ni entradas y el que saca no corre; una plancha al portero es falta y vuelve a sacar él.
- **Al acabar un partido el personaje ya no sigue corriendo solo**: las teclas se sueltan al entrar y salir de los
  minijuegos y de la pelea 2D.
- **Flecha sobre el coche**: en las persecuciones apunta al coche o a la persona que persigues; en las carreras, al
  siguiente control. En las carreras se ve ya la ruta de los dos controles siguientes (azul a rayas en el minimapa y el
  mapa grande).
- **Diario (J)**: guarda todas las conversaciones (también las del final de cada misión y las sueltas), de la más
  reciente a la primera y con quién dijo cada cosa, y tiene una entrada con todas juntas. Las misiones hechas en
  partidas de antes del diario lo explican.

## 0.74.0 — 2026-10-13 — Seis arreglos rápidos
- **Aeropuerto**: la rotonda acristalada de la terminal se coloca donde no pisa ninguna vía (antes caía sobre las vías
  de servicio del lado aire: coches atascados y el revisor la veía «flotando»); si no cabe entera, más pequeña.
- **Obstáculos en calzada**: la comprobación «¿está en una calzada?» mira ya las tres calles más cercanas y no solo la
  más próxima (junto a una calle estrecha, la autopista ancha de al lado quedaba sin mirar: poste junto a la TF-13).
  Los árboles de OSM que quedaban dentro de una calle con coches (Calle Juan de Vera) no se plantan.
- **Enemigos abatidos en las misiones**: ya no se quedan congelados; caen con su animación, suena el golpe y se quejan
  de vez en cuando si estás cerca.
- **Recorte de edificios**: al empujar una esquina fuera de una calle tampoco puede meterse en una calle peatonal
  (atasco a pie en la Calle Heraclio Sánchez).
- **Callejero**: lista de los 36 edificios de la leyenda en `docs/referencias/callejero/edificios.md`, con cuáles tienen
  ya algo propio en el juego (22) y cuáles son aún el bloque genérico (14), para misiones y para recrearlos.

## 0.73.0 — 2026-10-13 — Fáciles: auditoría, marcas viales y el agente revisor
- **Edificios en calzada (auditoría 0.70)**: el recorte ya no devuelve nunca un edificio más metido en una calle que
  el original (un corte a lo largo de una calle que seguía por el cruce dentro de la siguiente, o una esquina empujada
  hacia otra calle): Calle Las Eras, Tabajoste, Camino La Cañada… La profundidad se mide ya con la calle tal como se
  dibuja, tramo a tramo. Invasiones ≥ 1 m en todo el mapa: 189 → 159, ninguna peor que antes (las casas pequeñas pueden perder hasta el 60 %).
- **Columnas del Intercambiador** (los «árboles o farolas» en la vía de servicio junto a Padre Anchieta): se apartan
  del carril de las guaguas. Carteles «P» y postes de la valla del aeropuerto: nunca dentro de una calzada (auditoría
  0.72); la valla, con postes cada 12 m (menos geometría).
- **Marcas viales**: los ramales de un solo sentido (enlaces de autopista y de vías principales) ya no llevan línea
  central.
- **Agente revisor**: el personaje ya no se hunde en caminos y aceras que pasan por una hondonada (se pisa la superficie
  que se ve: alturas guardadas en celdas de 3 m donde el camino queda por encima del terreno); una calle que se elevaba
  para tapar un bulto del terreno ya no sube más de 0,4 m (flotaba sobre la que cruza).
- **Prueba de conducción**: los tramos que fallan desde hace tiempo (Camino La Rúa, dos de la Autopista del Norte,
  Camino La Hornera) son «fallos conocidos»: salen como aviso y la prueba pasa si solo fallan ellos.

## 0.72.0 — 2026-10-13 — Pendientes grandes del mapa
- **Obispado (Casa Salazar)** entera por fuera, con las fotos de Jonay: dos plantas de cantería oscura; ventanas bajas con
  rejas, banda de rosetas y crestería de forja; balcones sobre ménsulas con barandas de hierro y frontón en cada ventana
  alta; portada con columnas dobles estriadas sobre pedestales tallados, balcón central entre columnas y remate barroco
  con el escudo y pináculos sobre la cornisa; por la puerta abierta se ve el zaguán y el patio con su galería. Torres
  de las esquinas en el mismo gris.
- **El tranvía va bajo tierra** entre la Calle Pedro Zerolo y la parada de Padre Anchieta: baja en trinchera con muros
  y barandas (pendientes ≤ 8 %), pasa cubierto por debajo de las calles que lo cruzan en el cruce de Padre Anchieta y
  sube antes de la parada. Los postes de la catenaria no se ponen dentro de la trinchera.
- **TF-13 / rotonda partida bajo la TF-5**: las dos mitades de la rotonda bajan 6 m en trinchera con muros de piedra y
  se unen por dos túneles con bocas de bóveda bajo la autopista; la TF-13 (hacia Cam. La Hornera), los enlaces y la calle
  hacia Geneto bajan hasta ella. **Urbanización Guajara**: chalets blancos y crema con tejado rojo a cuatro aguas.
- **Aeropuerto** con las fotos: rotonda acristalada con cúpula en el centro de la terminal, cuatro depósitos de
  combustible junto a la Rotonda Sempiterno, carteles en las naves de Cam. San Lázaro (paquetería, hangar de la
  aerolínea de la isla, ITV), carteles «P» de los aparcamientos y valla perimetral. **Aviones que aterrizan y despegan**
  de vez en cuando (pista 30) cuando estás cerca.
- **Callejero oficial** (PDF del Ayuntamiento en `docs/referencias/callejero/`): las calles Bencomo, Juan de Vera,
  Rodríguez Moure y Ascanio y Nieves, que OSM daba como peatonales, son calles con coches (en el plano no van empedradas).
- El trabajador tiene la orden nueva `descargar <clave>` (lista cerrada; de momento, el callejero).

## 0.71.0 — 2026-10-13 — Misiones por zonas
- **La historia va por zonas** (Jonay): tras el barrio del inicio (El Blanco, La Concepción, Coco y Sastrón) van las del
  casco y el Ayuntamiento (Defensores, Los bancos del Adelantado, El gofio robado, El carterista del Cristo, Carrera
  solidaria), luego La Trinidad, la Vía de Ronda y el norte (El rally de La Esperanza, Baches en la Vía de Ronda,
  Escolta a la guagua del Romero, La guagua de la broma, Grafiteros en el tranvía) y, de final, Noche en el aeropuerto.
- **Grafiteros en el tranvía** ya no te manda a Las Mantecas (3,5 km): los grafiteros están en la parada de Padre Anchieta.
- **Partidas guardadas de antes**: se convierten por título: sigues por la primera misión que no hiciste en el orden
  nuevo y las que ya hiciste se saltan (el diario J las muestra como hechas). Partidas nuevas: versión 3 del guardado.

## 0.70.0 — 2026-10-13 — Pendientes fáciles y maleantes en busca y captura
- **Maleantes en busca y captura**: cuando ya sabes pelear (tras la misión de Sastrón), de vez en cuando sale en el
  minimapa (punto verde lima) un maleante con mote entre la gente de la calle. Le pegas y empieza la pelea 2D, pero es
  más difícil que con cualquiera: se cubre más, encadena más combos y pega más fuerte (tres niveles, que suben a medida
  que vas capturando). Ganarle da una recompensa (150, 300 o 600 $) y no es delito; si pierdes, sigue marcado. No salen
  durante una misión, y se escapan si te alejas o pasan 4 minutos.
- **Persecuciones más suaves**: los coches que huyen en las misiones (y el Canarión en la carrera) ya no giran en seco
  en las esquinas: toman la curva redondeada y frenan antes, mirando la curva más cerrada de lo que les queda delante.
- **Marcas viales**: las líneas de una calle ya no se pintan donde la calle está dentro de otra (bocas de cruce,
  incorporaciones y salidas que van pegadas a la vía, glorietas): ahí el asfalto va liso y se acabaron las líneas cruzadas.
- **Telepisa en la Avenida de La Trinidad**: era una nave baja y plana con el cartel en el tejado. Las franquicias de bajo
  (pizzerías, bancos, tiendas de móviles, cafés, ópticas…) ya no convierten el edificio en una gran superficie: el
  bloque de viviendas queda como es y la tienda lleva su cartel en la fachada.
- **Edificios en calzada (auditoría 0.69)**: el recorte también entra en las esquinas (cuando lo que se sale del tramo
  de calle está en otra calle, el cruce), empuja hacia fuera las esquinas que siguen metidas (hasta 4 m, sin deformar el
  edificio) y admite recortes hasta la mitad del edificio. Invasiones de ≥ 1 m: 374 → 189.
- **Aviones del aeropuerto**: si su puesto cae sobre una vía de servicio de la plataforma, el avión se aparta hasta
  dejarla libre.
- Herramienta nueva `tests/herramientas/sonda_zonas.py` (dónde se recoge cada misión y por dónde pasa) para ordenar las
  misiones por zonas en la próxima pasada. Pruebas nuevas: `prueba_maleantes.py`, `prueba_pendientes_faciles.py`.

## 0.69.0 — 2026-10-13 — A fondo con los avisos del auditor
- **Edificios fuera de la calzada en todo el mapa** (el auditor contaba 515 metidos en los carriles): como las calles del
  juego son más anchas que las reales, cada edificio que se mete más de 0,6 m en una calzada se recorta en línea
  recta hasta el bordillo (media calzada + 0,3 m). No se tocan iglesias y monumentos, edificios con un paso por debajo
  ni recortes que dejarían menos del 60 % del edificio.
- **Obstáculos en la calzada**: árboles, farolas, bancos, jardineras y mesas ya no se colocan en ninguna calzada (antes
  solo miraban las calles con tráfico); la máquina de billetes y el tótem de una parada del tranvía que caían en la
  Av. de La Trinidad se quitan si pisan la calzada.
- **Menos basura por fotograma**: al apuntar y disparar (tu pistola y la de la policía) y en el modo Achamán ya no se
  crean vectores ni matrices nuevos cada vez; los huesos de la mano se buscan una sola vez. La pistola comparte sus
  piezas con las de la policía.
- **Código más ordenado**: baloncesto y fútbol comparten teclas, sonidos, voz, textos y marcador
  (`09ea_minijuegos.js`); nombres de funciones repetidos (`init`, `make`, `render`) cambiados para que el auditor no
  confunda el código de carga con el de cada fotograma.

## 0.68.0 — 2026-10-12 — Avenida de La Trinidad y obstáculos del auditor
- **Avenida de La Trinidad** (con las capturas de Jonay):
  - Cada calzada tiene ahora un carril y aparcamiento (6,6 m, antes 9 m), y el tranvía cabe en medio.
  - Los edificios que pisaban la calzada o la acera retroceden hasta la línea de la acera.
  - En los solares vacíos junto a la avenida salen casas como las de al lado.
  - **Dos aparcamientos Indigo**, con rampas de muros azules: «Trinidad Casco Histórico», con la rampa en medio de la
    calzada partida al principio de la avenida (n.º 3); y «Trinidad Centro», con la rampa junto a la acera y la
    cuadrícula amarilla delante, en el n.º 59, junto al súper, justo encima de la C. Pedro Zerolo.
  - **Cruce con Pedro Zerolo**: cuadrícula amarilla donde cruza el tranvía y pasos de peatones.
  - **Soportales** con columnas en la manzana del súper y en el n.º 76.
- **Obstáculos graves del auditor**:
  - El Canarión ya no espera en la otra calzada de la Trinidad.
  - Fuera los pilares de la pasarela de Padre Anchieta que caían en la calzada (Glorieta del Brasil).
  - Fuera los postes de canastas y porterías de canchas dibujadas encima de una calle (Camino de las Peras, Av. Lora
    Tamayo).
  - El poste del cartel de los aparcamientos ya nunca cae en la calzada.

## 0.67.0 — 2026-10-12 — Fútbol 2D: JETA SOCCER
- **Fútbol 2D 5 contra 5**, visto desde arriba como el Sensible Soccer: campo que sube y baja con el balón, jugadores
  pequeñitos con la equipación de cada equipo, radar, palos, bandas, córners, saques de puerta y gol de oro.
  - Mismas teclas que el baloncesto: clic izquierdo (o E) chuta, cuanto más lo mantienes más fuerte y alto (y después
    izquierda / derecha le dan efecto); sin balón es una entrada. Clic derecho (o Q) pasa al compañero al que miras,
    mantenido más fuerte y bombeado; sin balón cambia de jugador. Espacio corre.
  - Juegas con la banda: El Blanco de portero, Boca Papa y Sastrón atrás, Coco en el medio y tú arriba.
- **Campos de fútbol con entrada** (balón blanco flotando): en los abiertos se pulsa E en el campo; los de colegio o
  encerrados tienen puerta en la calle. Tras el primer partido, retos en cualquier campo (niveles 1–5).
- **Misiones del Obispo 3 y 4**: «Un partido por La Concepción» (tutorial contra los seminaristas) y «El clásico de
  las cofradías».

## 0.66.1 — 2026-10-12 — Baloncesto más fácil y pruebas solo de lo cambiado
- **Baloncesto**: más fácil en general: todos se mueven más despacio (los rivales flojos, más aún), la CPU roba y empuja mucho menos
  (tú robas más), falla más tiros y mates (¡al hierro!) y tus tapones a los mates entran la mitad de las veces. El
  primer partido del Obispo, los retos de las canchas y el Torneo Lagunero bajan un punto de dificultad.
- **Pruebas por zonas**: `PRUEBAS.bat` (y la orden `pruebas`) solo prueba lo que ha cambiado desde la última tanda
  que pasó (huellas de cada archivo + `scripts/pruebas/categorias.json`) más las de la versión, con una sola carga del juego; las que fallan se repiten aparte.
- El trabajador va diciendo qué prueba hace (con una frase de qué comprueba) y el sonido de las pruebas va silenciado.
- `build.py` se para si un comentario `//` se ha tragado código detrás (pasó 3 veces en la 0.66: jugadores invisibles y
  jugadores quietos).

## 0.66.0 — 2026-10-12 — Diario de misiones, Torneo Lagunero y baloncesto más cerca
- **Diario de misiones (J)**: sobreimpreso, con las 4 líneas (Historia, El Canarión, El Obispo, Torneo Lagunero), el
  estado de cada misión, qué hacer en la siguiente y **todas las conversaciones** de cada misión (se guardan con la
  partida). «Reiniciar desde aquí» vuelve a esa misión y todo lo que va detrás. El Blanco te da la libreta en la primera.
- **Baloncesto**:
  - El ratón estaba al revés: ahora clic izquierdo tira y el derecho pasa.
  - Cámara mucho más cerca, con el doble de resolución: sigue al balón y enseña su mitad y algo más; flechas en el
    borde para quien queda fuera.
  - La zona verde del tiro es más ancha cerca de la canasta y más estrecha de lejos.
  - La CPU ya no tira desde su campo, y los equipos flojos fallan casi todo (sobre todo de lejos).
  - Combos con un 20 % más de tiempo.
  - Jugadores, aro y balón un 30 % más grandes respecto a la cancha (se veían pequeños).
  - Fondos distintos: cancha de la calle, patio de colegio y pabellón cubierto.
- **Canchas con entrada**:
  - Las públicas se juegan pisando la cancha y pulsando E.
  - Las de colegio o encerradas entre edificios tienen una puerta en la calle (E), con un balón flotando encima.
  - Las canchas dobles (dos dibujadas una encima de otra) quedan en una sola.
  - Después del primer partido puedes retar a la gente de cualquier cancha (niveles 1–5).
- **Obispo**: el primer partido es en el **Colegio Máyex** (se entra por su puerta de la C. Pintor Cristino de
  Vera); el segundo, en una cancha pública.
- **Torneo Lagunero** (círculo naranja; se abre al ganar el primer partido): 4 equipos en canchas de la ciudad, cada
  uno más difícil, y **la final en el Pabellón Juan Ríos Tejera** (puerta morada y cartel en la C. Leopoldo de la Rosa
  Olivera; dentro, cancha de parqué con gradas).
- Trabajador: `auditar` como `auditar_jeta.bat` (resultados en `resultados_pc`), `subir_git` (sube ya a GitHub) y
  `borrar_auditoria_vieja`.

## 0.65.1 — 2026-10-12 — Arreglos del Obispado
- **Monseñor Truchas y su círculo quedaban dentro de la Casa Salazar** (la portada se orientaba hacia dentro cuando la
  casa vecina estaba pegada): ahora la fachada se orienta desde la propia casa, solo hacia una calle, y el obispo y el
  círculo siempre quedan en la calle, alcanzables.
- **Parpadeo de la fachada del Obispado**: el chapado de piedra tocaba la pared y peleaban (z-fighting); ahora es un
  plano separado 14 cm. Herramienta nueva `foto_noche.py` para medir parpadeos.

## 0.65.0 — 2026-10-12 — El Obispo y el baloncesto 2D
- **Monseñor Fermín Truchas, obispo de Nivaria** (parodia), en la puerta del **Obispado** (Casa Salazar, C. San
  Agustín): portada de cantería oscura con columnas pareadas, frontón con escudo, balcones de forja y pináculos. Sus
  misiones (círculo **morado**) se abren con las del alcalde y son opcionales:
  1. **Un partido por la Catedral**: con Coco contra los seminaristas en la cancha más cercana, con tutorial.
  2. **El torneo de la parroquia**: contra los del Cristo, más duros.
- **«JETA JAM», baloncesto 2D 2 contra 2** al estilo de los arcades de los 90: los mismos sprites de la pelea, pases,
  robos, empujones, tapones, triples, «¡en llamas!» tras 3 canastas seguidas, canasta de oro si hay empate y un
  locutor. **Mismas teclas que la pelea** (norma para todos los minijuegos): mantener clic izquierdo / E para tirar y
  soltar con la barra en verde (defendiendo, salta para taponar); clic derecho / Q pasar, robar (corriendo, empujón) o,
  defendiendo lejos del balón, cambiar de defensor; Espacio correr. **Entrada en combo**: corriendo y tirando desde
  media distancia el juego se para y tienes 3 s para uno de los 4 especiales de la pelea, cada uno un mate distinto
  (Mate de Gofio, Molino del Teide, Gancho del Roque, Salto del Pastor). Tutorial de 7 pasos en el primer partido.
- **Ni farolas ni árboles (ni bancos) dentro de canchas y campos**, y cada cancha es siempre del mismo tipo.
- El trabajador local acepta `auditar` (solo cuando lo pidas). Pruebas nuevas: `prueba_baloncesto.py`, `prueba_obispo.py`
  (`PRUEBAS_MINIJUEGOS.bat`).

## 0.64.1 — 2026-10-12 — Pruebas en el PC de Jonay
- **`scripts\PRUEBAS.bat`**: compila y lanza en tu PC las pruebas de `scripts/PRUEBAS_LISTA.txt` (o todas con
  `PRUEBAS.bat todas`); la primera vez instala Playwright y su navegador. Informe en `reportes\pruebas\ULTIMO.md`, que
  Claude lee antes de publicar. Desde ahora todo lo que se ejecuta (pruebas, fotos, sondas, herramientas) va en tu PC.
- Las auditorías las pasas tú; Claude lee los resultados nuevos de `RevisordeCodigo\resultados` al empezar cada tanda.
- Prueba de controles de la pelea más robusta (espera a aterrizar entre teclas).

## 0.64.0 — 2026-10-12 — Pelea 2D con las mismas teclas que la calle
- **Pelea 2D**: puñetazo `E`, patada `Espacio`, salto `↑` / `W` (más clic izquierdo y derecho del ratón). Fuera J, K,
  L, U, I y las de Shift/Ctrl derechos. Los especiales siguen igual (abajo, arriba + golpe funciona aunque ↑ salte).
- **Los textos de misión y de la pelea muestran las teclas que tengas en Opciones › Controles** (tutorial de Sastrón,
  tarjeta de controles, «pulsa E para entrar», coche, armas…), no unas fijas.
- La rutina de publicación ya no pasa el auditor de código salvo que Jonay lo pida.

## 0.63.1 — 2026-10-12 — Flecha del coche más discreta
- La flecha que flota sobre el coche es mucho más pequeña (menos de la mitad), más transparente y casi plana: ya no
  parece que apunte al cielo ni de frente al suelo.

## 0.63.0 — 2026-10-12 — Claxon para cada coche y flecha flotante en coche
- **Claxon nuevo, uno por tipo de vehículo** (el de antes era un pitido cuadrado muy feo): utilitario y moto con dos
  pitidos agudos, turismo y taxi de dos notas, SUV y furgoneta más graves, deportivo brillante, guagua y policía graves y
  el camión con bocina de aire. Cada coche suena un poco distinto, y el Guanche GT de El Canarión toca una melodía.
- **Brújula en coche**: en lugar del aro (seguía siendo enorme) hay una **flecha maciza flotando sobre el techo** que
  apunta al destino principal (rosa si has marcado uno), siempre vuelta hacia la cámara, como en los juegos de taxis.
- **Brújula a pie**: el aro es un 30 % más pequeño.

## 0.62.1 — 2026-10-12 — Brújula: se ve a pie en todas partes y más pequeña en coche
- **A pie se veía mal o nada** en aparcamientos, plazas y calles inclinadas: quedaba por debajo del pavimento. Ahora se
  coloca a la altura de los pies del personaje (o de las ruedas del coche) y solo usa el terreno para inclinarse.
- **En coche** el aro es poco más ancho que el coche (antes era enorme) y ya no tiembla en las bajadas: la inclinación
  y la altura se suavizan.
- **Tecla G**: muestra u oculta la brújula (se puede cambiar en Controles). No se usa la E porque es «usar / entrar».

## 0.62.0 — 2026-10-12 — Brújula más pequeña, círculos fuera de edificios y fallos pequeños
- **Brújula**: la mitad de tamaño y el doble de trazo; las puntas salen del borde del aro; el aro toma el color del
  destino que manda (rosa si has marcado un punto en el mapa, si no amarillo de la misión principal). Se apoya en la
  superficie real y se inclina con ella, y es algo más opaco para verse sobre suelos claros (el aro blanco no se distinguía en plazas de baldosa clara) (ya no se hunde en carreteras peraltadas ni puentes). En coche o camión rodea
  todo el vehículo con trazo fino y se dibuja por encima de la carrocería.
- **Círculos de misión fuera de los edificios**: el punto de inicio y los destinos se apartan hasta que el aro entero
  queda en la calle (p. ej. Coco junto a la Casa Ossuna).
- **La «moneda» flotante**: era la esfera del reloj, colocada mal (a ~1 m del brazo). Ahora va en la muñeca.
- **Carteles al revés por detrás**: el cartel verde y los discos de la isleta de Marqués de Celada tienen la parte de
  atrás lisa y gris; los rótulos del aparcamiento se leen bien por los dos lados.
- **Nombre de la banda**: puedes escribir tu propio nombre; «Los Magos de Aguere» sustituye a «Los Magos de La Laguna».
- **Coco y Sastrón** aparecen en dos de los tres sitios del casco más cercanos al inicio.
- Herramienta nueva `tests/herramientas/foto_jugador.py` (jugador apuntando y accesorios pequeños).

## 0.61.0 — 2026-10-12 — Brújula a los pies, radio con 20 canciones y nombres nuevos
- **Brújula a los pies** (sustituye a la flecha grande): un aro fino alrededor del personaje (o del coche) con una punta
  por cada destino activo, siempre en línea recta hacia él: amarilla misión o historia, azul secundaria, roja a quien
  persigues, rosa tu destino del mapa. Tras teletransportarte vuelve el siguiente punto de la historia.
- **Radio**: 20 canciones con título y artista inventados (7 + 7 + 6 en las tres emisoras), cada una con **su propia
  voz** (voces del navegador con tono y ritmo propios), siempre el mismo ritmo y letra, ~1:45 con tres estrofas sin
  repetir versos; al empezar una canción sale su título.
- **Nombres**: Ruymán «El Blanco» pasa a ser **Rayco «El Blanco»** y Santi «El Chopa», **Ayoze «El Chopa»**.
- **Intro**: el texto de que El Chopa sale de la cárcel ahora queda en un cuadro hasta pulsar «¡Vamos!».
- Prueba de conducción de túneles y puentes: el tiempo de cada tramo depende de su longitud y se pueden probar tramos
  sueltos (`prueba_conduccion_tuneles_puentes.py 1287,2295`). El enlace de la autopista (X −386 Z 678) ya pasa.

## 0.60.0 — 2026-10-12 — Flecha guía, noche más clara y carrera solidaria posible
- **Flecha guía**: con un objetivo de misión (amarilla) o un destino marcado (rosa), una flecha en el suelo a tus pies
  (sobre el coche si conduces) apunta por la ruta del GPS. Se esconde cerca del objetivo, en interiores y en menús.
- **Noche más clara**: la luz mínima nocturna sube; de día todo queda igual.
- **Carrera solidaria del casco**: hasta 4 controles a menos de 320 m del Ayuntamiento, en orden de cercanía, y
  vuelta al Ayuntamiento; el tiempo se calcula con la distancia (antes eran ~6 min imposibles).
- **Rutas lejos del borde**: carreras, coches que huyen y fugas a pie eligen recorridos a ≥ 90 m del borde del mapa
  (antes el aviso del borde te devolvía atrás en plena persecución).
- **Primera pelea 2D sin parón**: el fondo del escenario se prepara una vez durante la carga.
- `.gitattributes`: finales de línea fijos (sin el aviso «LF will be replaced by CRLF» de git en Windows).

## 0.59.0 — 2026-10-12 — El mapa crece: La Cuesta y Taco
- **Mapa más grande** alrededor de los centros de salud de **La Cuesta** (franja de X 2400–3450 por Z 1600–2250) y de
  **Taco** (X 1450–1850 por Z 3980–4430), unidas al borde del mapa anterior: unos 300 edificios y 390 calles nuevas de
  OpenStreetMap, con su relieve (Copernicus) fundido con el del resto.
- **Centros de Salud de La Cuesta y de Taco** rotulados; al morir cerca, reapareces allí.
- Las zonas nuevas se descargan desde el PC (`scripts/descargar_zonas.bat`, reintentos y límites de los servidores) y se
  integran con `tools/merge_zona.py` sin duplicar lo que ya había: reutilizable para futuras ampliaciones.

## 0.58.2 — 2026-10-12 — Centro de Salud de Finca España en su parcela
- **Finca España**: ya no se sale a la Avenida de los Menceyes. Ocupa toda su parcela, entre la C. Pueblos de Tenerife y
  la C. El Coralito, con el aparcamiento detrás (la plaza vacía de al lado era parte del centro): ala baja al oeste y
  bloque principal, fachada, puerta y verja a la avenida. Se ve en el minimapa y en el mapa. El último tramo del
  «Pasaje el Dátil» de OSM, que cruzaba la parcela, se corta en el aparcamiento.

## 0.58.1 — 2026-10-07 — Centros de salud en su sitio
- Con las capturas de Jonay (códigos de Google Maps pasados a metros del juego): **Laguna-Universidad** (Av. Trinidad,
  antes «La Laguna»), **San Benito** movido a su sitio real (C. Benito Pérez Galdós, estaba 240 m desviado) y
  **Finca España** nuevo (Av. de los Menceyes 153; no está en OSM: bloque de ladrillo y gris con verja). La Cuesta
  queda fuera del mapa actual.

## 0.58.0 — 2026-10-07 — Hospital Universitario de Canarias y centros de salud
- **HUC** según las fotos: bloque de 12 plantas con bandas de ventanas, torre cilíndrica blanca con remate de cristal y
  helipuerto en voladizo, el edificio verde de cristal de Actividades Ambulatorias, Urgencias rotulada y jardín con
  palmeras y la escultura de acero.
- **Centros de salud** de La Laguna y de San Benito: fachada blanca con el rótulo y la cruz verde.
- **Al morir te despiertas en el centro de salud o las urgencias más cercanas** (antes, en casa de El Blanco).

## 0.57.0 — 2026-10-07 — Persecuciones visibles, mapa legible, GPS estable y menos memoria
- **Mapa grande**: se abre más cerca y centrado en ti. Los rótulos ya no se pisan: de lejos solo barrios y lugares
  importantes; al acercarte salen grandes superficies, entradas y, muy cerca, las tiendas. Texto con borde oscuro y
  colores que no se confunden con las rutas de misión.
- **Atraco en la farmacia**: el segundo ladrón corre y roba un coche negro aparcado junto a un Tollota Corola (para
  ti); el coche sale en el mapa como círculo amarillo con la ruta para seguirlo; sube hacia Las Gavias, se baja y huye
  a pie por el camino de tierra hacia el Camino Tornero: dale dos tiros de bolas antes de que llegue, se pone a
  llorar y lo agarras.
- **Canarión**: el círculo azul de las carreras ya arranca a la primera (el de «El rally de La Esperanza» estaba
  encima; ahora están separados y empieza el más cercano).
- **Persecuciones**: una flecha roja encima de quien hay que perseguir (persona, coche o guagua) los primeros segundos,
  y un punto rojo en el minimapa y el mapa grande mientras dura. Los que huyen a pie salen desde donde están (Pepe
  ya no desaparecía de golpe), siempre alejándose de ti, por aceras, plazas y caminos y sin saltos.
- **Rutas del GPS**: en coche la ruta sale de la calle por la que vas y en tu sentido de marcha (antes salía del cruce
  más cercano, que podía estar detrás, en una calle paralela o en un puente) y no se recalcula mientras la sigues:
  solo se recorta lo ya hecho. Ya no da saltos ni va marcha atrás.
- **Coches aparcados de misión** (el camión de los baches, la furgoneta del gofio…): ya no se van solos marcha atrás;
  un coche sin conductor con el freno puesto se queda quieto aunque haya cuesta.
- **Tranvía**: sin árboles ni farolas encima de la vía.
- **Memoria** (auditorías; medido: memoria JS 544 → 503 MB, geometría en RAM 382 → 342 MB): las posiciones de la ciudad se liberan al subirlas a la tarjeta gráfica (solo el agente
  revisor las conserva, con `?revisor=1`); al cambiar el tiempo se liberan los mapas de entorno del tiempo anterior;
  los bancos de la misión «Los bancos del Adelantado» se liberan al terminar.

## 0.56.1 — 2026-10-07 — Alcalde gordito
- **Don Yovoy Gofiérrez** pasa a talla «gordito» (cuerpo y cara más llenos), sin llegar a las tallas gordas extremas.

## 0.56.0 — 2026-10-07 — Defensores de La Laguna: 12 misiones, Ayuntamiento y alcalde
- **Misiones nuevas** (12, tras el campo de tiro): Atraco en la farmacia, Defensores de La Laguna (ceremonia en el
  Ayuntamiento), El carterista del Cristo, Baches en la Vía de Ronda, El rally de La Esperanza, Los bancos del
  Adelantado, Grafiteros en el tranvía, La guagua de la broma, Escolta a la guagua del Romero, El gofio robado,
  Carrera solidaria del casco y Noche en el aeropuerto (acaba con coche patrulla para la banda).
- **El alcalde, Don Yovoy Gofiérrez** (bigote y traje negro), espera bajo los arcos del Ayuntamiento y encarga misiones.
- **La pistola es de bolas de plástico** de aire comprimido: lo explica El Blanco y en estas misiones no es delito.
- **Ayuntamiento** nuevo según las fotos: cantería, 5 arcos, balcones de madera, frontón con escudo y 5 banderas.
- **Reintentar**: al fallar una misión se pregunta «¿Reintentar?» y te lleva a su inicio.
- **Guardar a mitad**: al cargar, la misión empieza de nuevo en su círculo (con aviso) sin dejar nada suyo suelto;
  las partidas que ya habían terminado la historia siguen con las misiones nuevas.
- **Pelea 2D, especiales nuevos**: atrás-adelante + puñetazo = Bola de gofio; atrás-adelante + patada = Patada del
  Teide (avanza girando, 3 patadas); abajo-arriba + puñetazo = Gancho del Roque; abajo-arriba + patada = Salto del
  Pastor. En el tutorial de Sastrón.
- **Moto**: el piloto va sentado, inclinado al manillar, con los pies en el reposapiés (antes, tieso de pie).
- **Tallas gordas**: la deformación de la cara se limita a papada y mejillas (los labios ya no se hinchan).
- Pruebas nuevas `prueba_misiones.py` (juega solas todas las misiones) y `prueba_misiones_guardado.py`;
  herramientas de fotos reutilizables en `tests/herramientas/`.

## 0.55.0 — 2026-10-07 — Uniones de túneles y trincheras, pasarela y aviso de la radio
- **Bocas de trinchera**: donde otra calle se incorpora a una calle hundida (Vía de Ronda, X 388 Z 1499), la trinchera
  no empieza a bajar hasta dejar atrás la incorporación (rampa del 15 %), salvo bajo los puentes que cruza; si allí
  tiene que ser honda, es la calle que se incorpora la que baja con ella. Ya no se cae el coche 1,7 m en la boca.
- **Túneles por dentro**: la pared entre dos trincheras pegadas solo se quita cuando de verdad van juntas (a menos de
  0,6 m y a la misma altura): en el Camino el Vallado ya no se ve el exterior por los lados. El fondo de tierra solo se
  pone en los tramos cubiertos (en la trinchera abierta tapaba el cielo).
- **Pasarela de La Trinidad**: unos trozos de puente peatonal de OSM se montaban sobre la rampa hacia San Miguel de
  Geneto a otra altura y no dejaban pasar; ahora la rampa es continua.
- **Radio**: al subir a un coche se avisa de cómo cambiar de emisora (Q / tocar el velocímetro) hasta que la hayas
  cambiado dos veces; se guarda con la partida.

## 0.54.0 — 2026-10-07 — Freno de mano de verdad y modo móvil ordenado
- **Freno de mano**: bloquea las ruedas traseras. El coche frena, la trasera se va y gira más cerrado; un toque a
  60 km/h da un derrape de ~30° que se recoge solo al soltar; mantenido, el coche cruza y se para. Las ruedas traseras
  dejan de girar mientras está echado.
- **Modo móvil**: el minimapa ya no tapa las estrellas ni los botones. Minimapa arriba a la izquierda (tocarlo abre el
  mapa), reloj, dinero y estrellas arriba a la derecha, botones abajo a la derecha al alcance del pulgar, todo escalado
  al alto de la pantalla. Los botones cambian en el coche: SALIR, FRENO MANO y CLAXON.
- **Invernaderos** (el «edificio transparente» junto a la pasarela de Padre Anchieta es un invernadero de OSM): ahora
  siguen la pendiente (antes eran una caja de cristal plana de hasta 13 m de alto en cuesta), son de plástico lechoso y
  llevan estructura blanca.

## 0.53.0 — 2026-10-07 — Paradas del tranvía, escalera de la pasarela y paredes de túnel
- **Paradas del tranvía**: en 9 paradas la calzada pisaba las vías y el andén y el coche se atascaba. Ahora, junto a
  cada parada, la calle se aparta hacia fuera con una curva suave lo justo para dejar sitio al andén, sin meterse en
  edificios ni aceras (se calcula en `prep.py`). Los andenes son un 20 % más pequeños que los reales (24 × 1,85 m).
- **Pasarela de La Trinidad**: la escalera sureste ya no baja a la carretera; sale un tramo llano hacia el campus y la
  escalera llega a la acera en X −272, Z 709.
- **Túneles**: entre dos trincheras pegadas solo se quita la pared si las dos van a la misma altura; si la de al lado
  va a otra profundidad o aún a ras, la pared se mantiene (antes se veía el exterior a través del túnel).

## 0.52.0 — 2026-10-07 — Sin fuga de los coches del tráfico (auditoría P0.a)
- Las piezas de los vehículos se crean una sola vez y las comparten todos: pilotos, barra de luces y franjas de la
  policía, franja y luz del taxi, ruedas, cubos, carenados y piloto de las motos, y el casco del motorista. Los rótulos
  («POLICÍA LOCAL», furgonetas, taxi, guagua) usan una textura por texto.
- Cuando un coche se descarta y no vuelve al grupo de reutilizables (destrozado o grupo lleno), se libera su pintura y
  lo que no es compartido; el motorista vuelve al grupo de peatones (antes se creaba uno nuevo por moto).
- `__dbg.POOLS = { CARPOOL, HPOOL }` para que el auditor no cuente como fuga lo guardado para reutilizar.

## 0.51.0 — 2026-10-07 — Calles superpuestas a distinta altura, isletas y rampas de garaje
- **Calles que se solapan con un terraplén** de cualquier altura (no solo los bajos) suben con él donde de verdad lo
  pisan: se acaban el asfalto «flotando» 2–3 m sobre otra calle (X 91 Z 1284, X 701 Z 814, X −741 Z 334) y los dos
  últimos «vuela» de los enlaces de la TF-5 (X 750 Z 3486, X 717 Z 3390).
- **Isletas de rotonda** que siguen el terreno (antes eran un disco plano a la altura del centro y en cuesta quedaban
  1–1,5 m por encima de la calzada) y que se encogen si una calle de entrada les pasa por encima.
- **Inicio de las trincheras**: donde la calle hundida aún va casi a ras, su asfalto baja hasta el suelo por el lado
  bajo (en cuesta flotaba ~1 m sobre la calle de al lado, X 752 Z 1268).
- **Rampas de garaje** bajo plazas y aceras: el coche ya baja por ellas (antes la acera «tapaba» la rampa y el coche
  se quedaba arriba, X 2212 Z 3366).
- Agente revisor: no da «atasco» ni «no termina» en calles que siguen fuera del borde del mundo.

## 0.50.0 — 2026-10-07 — Enlaces de autopista, trincheras y fuentes
- **Enlaces de autopista sin «volar»**: el coche ya no salta a una rampa vecina más alta que se solapa con su calzada.
  Las vías que comparten terraplén con una rampa elevada suben con ella en ese tramo; el coche solo sube a un tablero
  si el escalón es pequeño (o si es el propio tablero que sube); y en curvas con pendiente la altura del puente o la
  trinchera sale del tramo más cercano. Prueba de conducción del agente: de 94 a 25 avisos (de 40 «vuela» a 3–6).
- **Trincheras**: las rampas de bajada terminan antes de los cruces; el coche ya no rebota en la boca de su propia
  trinchera ni se atasca en una calle a ras pegada a la trinchera gemela (X 1800, Z 3160); muros a ras donde otra
  calle toca la trinchera; sin losas de techo dentro de otra calzada. Túneles y puentes: fallan 3 de 97 (antes 10 de 111).
- **Túneles por dentro**: si la cámara queda bajo tierra se ve un fondo de tierra en vez del cielo o el subsuelo
  transparente.
- **Fuentes** de plazas y parques fusionadas en pocas mallas (menos llamadas de dibujo).
- **Vallas de canchas** que ya no cruzan la calle (C. Castellón / Valencia); los andenes del tranvía se acortan si sus
  rampas llegan a la calzada.
- Agente revisor: ya no da error al leer coches aparcados que se rehacen durante la prueba.

## 0.49.0 — 2026-10-07 — Rendimiento (auditoría) y menú principal nuevo
- **Menú principal**: botones en columna como en los juegos (continuar / nueva partida / cargar / opciones / controles
  / modo Achamán), número de versión en la esquina y una descripción del juego a la altura de lo que ya es.
- **Memoria** (auditoría P0.1): la geometría de la ciudad y de los coches aparcados guarda normales en 8 bits y colores en
  8 bits, y suelta de la RAM las copias que ya están en la tarjeta gráfica; los aparcados se rehacen por zona cuando
  te llevas uno. Memoria al arrancar: de ~1.200 MB a ~620 MB (y baja más según se va viendo la ciudad).
- **Sin fugas ni tirones** (P0.2–P0.3): peatones, Canariones y policías salen de un grupo preparado durante la carga y
  se reutilizan; los coches del tráfico que se van se guardan para reutilizarlos; las pistolas de los policías y las
  balizas de misión se reutilizan o se liberan.
- **Por fotograma** (P1): el HUD solo toca la página cuando cambia algo, el minimapa se dibuja a 30 Hz, los avisos
  («F Entrar…», puertas, comida) se buscan cada 6 fotogramas, colisiones y sol sin crear basura, y los mapas de
  reflejos del cielo se preparan durante la carga (uno por hora y media) en vez de recalcularse jugando.
- **Funciona sin internet** (P2): la copia del PC lleva Three.js y las fuentes dentro del HTML; los sombreadores se
  compilan sin congelar la carga.
- Rutina: en cada versión se lanza el auditor de código (el agente revisor, solo cuando Jonay lo pida); sus mejoras
  solo se aplican cuando Jonay lo dice. El agente revisor ignora las mallas cuyos datos ya se liberaron de la RAM.

## 0.48.1 — 2026-10-07 — Tallas: el protagonista vuelve a talla media
- El Chopa, los personajes de misión, los de las tiendas y los policías son siempre de talla media (antes podían salir
  con una talla aleatoria, incluso súper gordo).
- Reparto de tallas de los peatones más realista: la mayoría en el rango medio; atléticos, delgados y gordos menos
  frecuentes, y los extremos (súper delgado / extra y súper gordo) raros (2–4 %).

## 0.48.0 — 2026-10-07 — Pelea 2D en alta resolución y siete tallas de cuerpo
- **Pelea 2D con el doble de resolución** (640×360 en vez de 320×180, misma jugabilidad): los luchadores tienen cara
  (ojo, ceja, boca, oreja), mechones y brillo en el pelo, pliegues y borde iluminado en la ropa, cinturón con hebilla,
  manga corta, rodilleras de luz y suela de las zapatillas; el fondo de la calle se pixela con el doble de detalle.
  El sprite se ensancha o estrecha según la talla del personaje (barriga en los gordos).
- **Siete tallas de cuerpo**: súper delgado, extra delgado, normal, atlético, gordo, extra gordo y súper gordo (más
  mayores y adolescentes). Los peatones salen con un reparto de todas ellas.

## 0.47.0 — 2026-10-06 — Agente revisor de jugabilidad y cuerpos variados
- **Cuerpos variados (versión propia)**: sobre el cuerpo «superhéroe» de Quaternius, cuatro formas propias mezclables
  —normal (menos músculo), relleno/barrigón, adolescente y mayor—; los peatones salen con un reparto de cuerpos
  y alturas (había un fallo que anulaba la variación de altura). Mismas animaciones.
- **Agente revisor** (`tests/agente_revisor.py`): tras cada versión recorre en coche, a pie y con rayos de
  superficie las zonas nuevas, todas las vías de riesgo (enlaces de autopista, puentes, túneles, rampas) y un lote
  rotatorio del resto del mapa. Escribe el informe mientras avanza (`reportes/`, con capturas y coordenadas) y lo
  compara con el anterior: avisos nuevos, que siguen y arreglados.
- **Aeropuerto**: el puente que se quedaba en el aire (X −3303, Z −143) ahora baja a nivel: la rampa se ajusta al
  largo de vía disponible y sigue por la esquina si hace falta.
- **Aceras**: ya no son una losa entera bajo la calzada sino dos franjas a los lados; se acaba el «suelo» de acera
  que asomaba sobre el asfalto (p. ej. X −2933, Z −43).
- Arreglos de la primera tanda del agente:
  - Las franjas de acera se cortan donde entran en otra calzada (bocas de cruce, enlaces): no más acera cruzando
    la carretera.
  - El asfalto ya no deja asomar el terreno por dentro en zonas de relieve irregular (aeropuerto): la cinta se
    levanta lo justo sobre los «bultos» del terreno entre sus bordes.
  - Pretiles de puentes y rampas: no se ponen dentro de la calzada de un enlace que se une a ellos.
  - Las calles que se unen a una rampa o puente elevado en uno de sus nudos suben a su encuentro (antes se quedaban
    a nivel bajo el tablero: «coche que vuela» y «tablero flotando»).
  - 27 edificios pequeños atravesados por una calle (marquesinas mapeadas como edificio, sobre todo en el
    aeropuerto) se quitan, y 28 caminos sin salida que entraban en un edificio se cortan en la pared.
- El agente distingue ahora «edificio sobre la vía», mide la superficie respecto al asfalto realmente dibujado (menos
  falsos avisos), da más tiempo a las vías largas y permite recomprobar solo unas vías (`--vias`, `--pruebas`).

## 0.46.0 — 2026-10-06 — Vuelven dos zonas del mapa
- Se recuperan las zonas marcadas por Jonay que se habían quitado: al suroeste, de Guajara / San Felipe / San
  Bartolomé de Geneto hasta El Coromoto (X −1200…158, Z 1376…2810); al noreste, la franja al este de San Roque y La
  Verdellada (hasta una línea escalonada X 781/1300/1805). Siguen fuera Los Baldíos, La Vega y el monte de Valle
  Tabares / Las Mercedes.

## 0.45.0 — 2026-10-05 — Finca España, Chimisay y La Pirámide
- **Finca España**: pabellón del Complejo Deportivo Islas Canarias junto al campo (hormigón gris, cubierta blanca
  a un agua que vuela sobre la esquina, franja de cristal verde agua y lamas oscuras, pilares morados y rótulo).
  Los bloques de C. Tacoronte (zona del colega) en tonos arena y salmón.
- **San Miguel de Chimisay / El Cardonal**: el barrio, vacío en OSM, se llena con unas 600 casas y bloques a lo
  largo de sus calles (alrededor de la casa del hermano).
- **Edificio La Pirámide** (Campus de Guajara): pirámide escalonada de cristal y hormigón.
- Los rellenos de barrios ignoran los usos «residencial/césped/matorral» de OSM (antes bloqueaban el relleno).

## 0.44.0 — 2026-10-05 — Aeropuerto de Los Rodeos
- **Aeropuerto Tenerife Norte** al oeste, con datos reales de OpenStreetMap: pista 12/30 de 3,4 km × 45 m con
  marcas (eje, bordes, «piano» de umbral, zona de toma y números 12 y 30), calles de rodaje con su línea amarilla,
  plataformas de hormigón, terminal (piedra clara, doble banda acristalada, marquesina volada sobre pilares con
  banda verde y rótulo «TENERIFE NORTE · CIUDAD DE LA LAGUNA»), torre de control, hangares y 17 turbohélices de la
  aerolínea parodia «Guanchavía» en sus puestos, con el morro hacia la terminal.
- **Mapa ampliado** hacia el oeste en un corredor (Z −450 a 1400) con relieve real (Copernicus DEM, rejilla de 32 m
  fundida con la anterior) y las calles, casas y fincas de la zona: Camino San Lázaro, Calle Aviación, TF-5,
  Carretera General del Norte, Guamasa / El Portezuelo… (+1275 edificios, +815 vías). Hay ruta en coche desde el
  inicio hasta la terminal (≈2,8 km).
- Minimapa a escala 0,45 para que el mapa grande siga siendo ligero.

## 0.43.0 — 2026-10-05 — Túneles, parking del Cristo, Sastrón primero y arreglos
- **Historia**: Sastrón te pone a prueba con la pelea en cuanto le conoces; al ganarle pide la pasta y te ofrece la
  carrera del Canarión (opcional y recomendada) o reunirla peleando por la calle. Las partidas guardadas antiguas se
  adaptan solas.
- **Túneles y pasos inferiores**: más hondos (7,2–8,4 m), tubos y bocas más anchos y altos (6 m); el techo solo se
  construye donde queda bajo tierra (antes asomaba como una losa blanca cruzando la carretera, p. ej. en la
  estación de guaguas). Los primeros 0,5 m de cada rampa quedan a nivel: ya no te hundes en el asfalto al llegar a un
  cruce (Alcampito, TF-5 y 42 sitios más; auditoría a 0).
- **Estación de guaguas**: andenes, guaguas y rótulos ya no se colocan sobre la autopista hundida.
- **Parking de la Plaza del Cristo**: 1,1 m más hondo, sala de 3,4 m de alto, rampas más largas y anchas con boca de
  3,9 m (los coches ya no rozan el techo), paredes del fondo que los coches no atraviesan, y las escaleras de salida
  sin coches aparcados que las taponaban (columnas y coches solo cuentan a la altura del suelo del parking).
- **Pistola**: los dedos parten cada fotograma de su postura de reposo (al apuntar la mano ya no gira sin parar) y el
  primer disparo no congela el juego (la luz del fogonazo existe desde el principio y no obliga a recompilar).

## 0.42.0 — 2026-10-05 — Peleas tipo Street Fighter, controles configurables, menú ancho y terreno
- **Pelea 2D**: mantener atrás anda hacia atrás; solo se cubre si el rival está atacando (golpe en preparación o
  activo, o bola de gofio que viene). Luchadores un 20 % más pequeños (sprites e impactos) y más separados al
  empezar (≈190 px) para poder lanzar especiales a distancia.
- Tutorial de pelea con textos cortos que se reparten en dos líneas y cartel de controles reducido.
- **Pantalla de CONTROLES** (menú principal y pausa): cada acción conserva sus teclas y se le puede añadir otra;
  se guarda en el navegador.
- **Menú principal** al 75 % del ancho en PC, botones en una fila y botón Achamán legible (texto oscuro sobre ámbar).
- **Terreno**: en 42 zonas (306 puntos) el personaje y los coches se hundían unos centímetros porque el final poco
  profundo de una trinchera quedaba por debajo del suelo sin hueco; ahora se pisa el terreno
  (`tests/audit_hundimiento.py` da 0).

## 0.41.0 — 2026-10-05 — Límites del mundo, ambiente sonoro, pistola y Mercadona
- **Límites del mundo**: a 50 m del borde aparece «Saliendo del mundo»; si sigues, vuelves 100 m hacia dentro, sobre una
  calle (nunca encima de un edificio), a pie o en coche y mirando hacia dentro.
- **Zonas quitadas** (no se cargan ni se dibujan): el monte del noreste (Valle Tabares, Valle Vinagre, Los Valles) y el
  campo del suroeste (Los Baldíos, La Vega, Geneto). ~950 edificios, 460 calles y 550 tramos de tráfico menos.
- **Ambiente sonoro**: pájaros de varias especies en los árboles (más de día), motor de los coches cercanos con su
  posición, gente charlando (y riendo) cuando hay grupos, campanas de La Concepción y la Catedral a las horas y a la
  media, perros y gaviotas a lo lejos. Todo con estéreo según la cámara.
- **Pasos** bastante más suaves.
- **Pistola**: la empuñadura queda dentro del puño cerrado en cada fotograma (antes bailaba 4–7 cm al andar) y el
  pulgar la abraza.
- **Mercadona** (Merca Mona): la entrada principal da a Marqués de Celada (n.º 55), con el hueco oscuro, el rótulo,
  el balcón corrido con barandilla y la esquina curva.
- **Lucas Vega / Callejón Montaraz**: el solar vacío se llena de casas (45) como en la realidad.

## 0.40.0 — 2026-10-05 — Esquina de inicio y Calle Marqués de Celada
- Las manzanas que OSM dibuja como un único bloque de 4–5 plantas alrededor del inicio (Marqués de Celada, Adelantado,
  Teobaldo Power, Carretas) se parten en casas de 1–4 plantas con colores canarios, tejados de teja y patio dentro.
- Edificio amarillo de Teobaldo Power: amarillo ocre, zócalo de piedra, tejado a cuatro aguas y balcones con barandilla.
- En la esquina: casa baja beige y medianera rosa, edificio crema con balcones de madera, casa roja canaria con
  esquinas de basalto y casa blanca encalada con remate de teja; isleta con señales «Vía de Ronda / Punta del Hidalgo»,
  prohibido, STOP y «20»; bolardos y contenedores.
- Locales en la subida de Marqués de Celada (pizzería, ferretería, bares, panadería, frutería, farmacia, peluquería…).
- El Mercadona de Teobaldo Power (sin nombre en OSM) aparece como «Merca Mona» con su rótulo: cualquier edificio sin
  nombre que contenga una tienda de marca toma su nombre.

## 0.39.0 — 2026-10-02 — La Concepción rehecha
- Torre en su sitio real: el bloque cuadrado que sobresale del plano OSM en el flanco norte (~X −529, Z −346). Ya no
  hay paredes de la iglesia donde está la torre.
- Torre nueva (~31 m): cantería de basalto oscuro, 4 cuerpos con cornisas, pilastras en las esquinas, ventanas con
  balconcitos de hierro, reloj en tres caras, campanario con dos arcos por lado y campanas, linterna octogonal con
  arcos, cupulín y cruz; galería canaria de madera y verja con plantas al pie.
- Iglesia nueva: muros encalados con zócalo de basalto, alero de dos hileras de teja, nave central elevada con
  óculos, ventanales de medio punto con vidrieras y marco de piedra rojiza, portada barroca de piedra con frontón
  partido y escudo + arco ciego junto a la torre, segunda portada lateral, y cabecera alta blanca con pilastras de
  basalto y dos filas de ventanas.
- Boca Papa y el círculo de sus misiones, fuera de la verja de la torre y alcanzables.
- Casa del hermano en Av. San Miguel de Chimisay / Av. El Cardonal (no estaba en OSM): casa blanca de 2 plantas con
  torreta en la azotea, puerta gris, ventanas con marco negro y muro blanco.

## 0.38.0 — 2026-10-02 — Coches en pendientes laterales, peleas más justas y coordenadas
- Los coches se inclinan bien en calles con pendiente lateral (el alabeo estaba al revés: un lado flotaba).
- Coches: aceleran un 15 % menos (misma velocidad punta) y la dirección es un poco más suave.
- Peleas 2D: la CPU pega un 25 % menos, prepara los golpes 1,6× más despacio y ataca algo menos.
- Círculo de inicio de las misiones de Boca Papa en un sitio despejado (no pegado a la torre ni al árbol).
- Coordenadas X/Z encima del minimapa y del cursor/destino en el mapa grande.

## 0.37.0 — 2026-10-02 — Pasos sincronizados y con mejor sonido
- Los pasos suenan justo cuando el pie toca el suelo: se detecta el apoyo real de cada pie en la animación (andar, trotar, esprintar).
- Sonido nuevo: talón + punta, con resonancias de suela y suelo, arenilla y roce; 6 variantes por suelo para que no se repita.
- Suelos distintos: asfalto, adoquín/losa del casco, baldosa en interiores, césped/tierra y chapa.
- Eco en túneles y parkings, y algo de sala en interiores. El aterrizaje de un salto usa los dos pies.
- Documentación técnica en una sola página para leer en local (`Documentación técnica.html`).

## 0.36.0 — 2026-10-02 — Guardar y cargar partida, repositorio y documentación
- Guardado y carga de partida: 3 ranuras manuales + automática (al superar misión, cada 3 min y al cerrar), exportar/importar `.json`.
- Repositorio git con el código fuente, los datos, las pruebas y la documentación técnica (`docs/`).
- Scripts de publicación automática a GitHub (`scripts/`).

## 0.35.0 — 2026-10-01 — Reaparición robusta al morir
- La reaparición tras morir (también dentro de un coche destrozado) nunca se queda bloqueada; vigilante de 6 s.

## 0.34.0 — Mapa con carreteras en azul
- Carreteras del mapa y minimapa en tonos azules; el amarillo y el rosa quedan solo para rutas de misión / GPS.

## 0.33.0 — Rap en inglés en la radio
## 0.32.0 — Voces rapeando en la radio
## 0.31.0 — Días largos y noches cortas (día 30 min, noche 8 min)
## 0.30.0 — Efectos de sonido (pasos, salto, caída) y radio hip hop procedural con estribillo de misión
## 0.29.0 — Plazas y parques (Adelantado, Camino Largo, Parque de la Constitución y genéricos)
## 0.28.0 — Repaso de carreteras: puentes, túneles, cruces, medianas y separación de calzadas
## 0.27.0 — Icono del juego
## 0.26.0 — Policía a pie que dispara (4+ estrellas), cambio de arma, GPS peatonal, arreglos varios
## 0.25.0 — Controles en las primeras peleas y textura real de enlucido en fachadas
## ≤ 0.24 — Versiones anteriores (mundo, misiones de la historia, peleas 2D, modo Achamán, armas, parkings…)
