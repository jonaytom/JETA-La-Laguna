# Herramientas de prueba (se guardan aquí para no rehacerlas en cada versión)

Se lanzan con el arnés de `tests/run_test.py` (servidor en `localhost:8765` sirviendo `dist/test.html`):
`cd tests && python run_test.py herramientas/<script>.py [argumento]`. Las fotos van a `tests/shots/`.

| Script | Para qué |
|---|---|
| `foto_npc.py <nombre>` | Cara y cuerpo de un NPC de misión (`alcalde`, `blanco`, `boca`, `coco`, `sastron`, `canarion`). |
| `foto_mapa.py [x z]` | Mapa grande a varios zooms (rótulos, colores). |
| `foto_marca.py <índice>` | Juega una misión hasta la flecha roja de persecución y la fotografía. |
| `foto_farmacia.py` | Persecución de la farmacia: robo del coche negro junto al Corola y el mapa con la ruta. |
| `foto_jugador.py` | Jugador de pie, apuntando con puños y con pistola; lista los accesorios pequeños y dónde quedan. |
| `sonda_guia.py x z` | Pone al jugador en x z con un destino marcado: dice si se ve la brújula y su altura; foto. |
| `prueba_claxon.py` | Toca el claxon de cada tipo de vehículo y lo graba en `shots/claxon.webm`. |
| `foto_guia.py` | Flecha guía a pie y en coche con un destino marcado. |
| `foto_hospital.py` | Tres vistas del HUC y la puerta de cada centro de salud. |
| `foto_ayuntamiento.py` | Tres vistas de la fachada del Ayuntamiento. |
| `foto_motos.py` | Motos con piloto (postura). |
| `foto_caras.py` | Caras de las tallas de cuerpo (morphs). |
| `foto_movil.py` | HUD en móvil apaisado (se lanza solo, sin `run_test.py`). |
| `sonda_baloncesto.py [lv] [s]` | Partido automático de baloncesto segundo a segundo: balón, jugadores, marcador; tiros y canastas por equipo. |
| `sonda_conduccion.py [ri …] [p:x,z …]` | Recorre en coche las calles indicadas (índice o las que pasan por un punto) y da la traza, el mayor salto de altura y dónde se para. |
| `sonda_perfil.py x0 z0 x1 z1` | Perfil de la calzada entre dos puntos cada 0,5 m (suelo, tablero, túnel) y los escalones de más de 0,3 m. |
| `sonda_rendimiento.py` | Llamadas de dibujo y triángulos en dos sitios ocultando cada grupo (trozos de ciudad, piezas juntadas, instanciadas, aparcados, sueltas, sombras, gente, coches; «sinLOD» = sin recorte por distancia), censo de mallas y tiempo de cada paso de la carga. Todo en `shots/sonda_rendimiento.txt`. Los ms no valen (sin tarjeta gráfica). |
| `sonda_pintado_gpu.py [--trozos]` | v1.0.0: **con la tarjeta gráfica** (su nombre acaba en `_gpu`: `run_varios.py` abre el navegador con la GPU y calidad «alta»). Tiempo de pintar a 1080p ×1,5 en 5 sitios (mediana de 40 fotogramas), a 480×270, y sin cada grupo (sueltas, ciudad, gente, coches, sombras, lejos…). Va en una lista de pruebas, sola. |
| `sonda_dibujadas.py` | v1.0.0: qué mallas se pintan de verdad en un fotograma (trozos, juntadas, instanciadas, aparcados y sueltas por tipo, transparencia, huesos y distancia). |
| `sonda_sueltas.py` · `sonda_grupos.py` · `sonda_grupos2.py` | v1.0.0: censo de las piezas sin juntar, por qué no se juntaron (`LOD.stats.no`) y huella de los grupos que más llamadas cuestan. |
| `sonda_recorte_motivos.py [n]` | v1.0.0: lee el `mapa.json` de la última auditoría y dice qué regla de `roadClip()` dejó cada edificio en la calzada. |
| `sonda_edificios_dudosos.py [n]` | v1.0.0: edificios de 50 m² o más que el recorte habría quitado: lista y fotos desde arriba (`dudoso_NN.jpg`). |
| `sonda_tamanos.py` | v1.0.0: altura de la gente, medidas de los coches, anchos de calle por tipo, calles estrechadas y edificios quitados. |
| `foto_calles_estrechadas.py [n]` | v1.0.0: fotos de los cruces de las calles más estrechadas al hueco entre edificios (`estrechada_NN.jpg`). |
| `sonda_trinidad.py` | Av. de La Trinidad: fotos desde arriba y a la altura de los ojos (sitios de las capturas de Jonay), aparcamientos y edificios que pisan la avenida. |
| `foto_desde_arriba.py vistas.json` | Fotos desde arriba: `[[tx,tz,cx,cz,h],…]`. |
| `foto_puntos.py puntos.json` | Fotos a la altura de los ojos: `[[x,z,yaw,ri],…]`. |
| `sonda_alturas.py puntos.json` | Alturas de suelo y tableros: `[[x,z],…]`. |
| `conduce_calles.py calles.json` | Conduce por calles y traza la altura del coche. |

Pruebas completas (en `tests/`): `prueba_misiones.py [desde] [hasta]` juega solas las misiones de la historia;
`prueba_persecuciones.py` comprueba que los perseguidos se ven y no dan saltos; `prueba_misiones_guardado.py` guarda a mitad, reintenta tras fallar y carga partidas antiguas.
`tools/publicar_preparar.py VERSION archivos…` prepara la copia a `E:\` (sesión en la nube).
- `sonda_zonas.py [desde] [hasta]`: dónde se recoge cada misión de la historia, por dónde pasa y a cuántos metros queda del inicio y de la anterior (v0.70, «misiones por zonas»).
- `comparar_catastro.py` (v1.0.4): edificios del Catastro que el mapa no tiene, zonas con más huecos y foto del casco con huecos en rojo y muros/vallas en azul → `reportes/catastro/` (lista `scripts/pruebas/catastro.txt`; antes, órdenes `catastro` y `barreras` del trabajador).
| `sonda_origen.py x y [radio] [altura]` | v1.1.8: **qué código dibuja algo**: en una lista suya (`run_varios.py` carga con `window.__ORIGEN`), lista las piezas a menos de «radio» m que empiezan a más de «altura» m sobre el suelo, con la función que las añadió, su color y su geometría (`shots/origen_x_y.txt`). |
| `sonda_rayos.py x y rumbo [altura]` | v1.1.8: **qué es lo que se ve** desde x y mirando a «rumbo» (0 = +Y, 90 = +X): rayos por la pantalla; de lo que tocan por encima de «altura» m y fuera de los edificios dice material, función que lo añadió, punto y distancia (`shots/rayos_x_y_rumbo.txt` y `.jpg`). En la lista `origen` (carga con `?revisor=1`). |
