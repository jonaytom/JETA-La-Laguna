# Sprites de los packs externos (v0.93)

Montan los personajes de Bencomo y Guanche Guarriors a partir de los packs de `E:\Claude\GTA La Laguna\assets_externos\`
(GandalfHardcore, Evil Wizard 3, PixelHorse, caballero de 18studio). Los packs NO van a git (sus licencias permiten
usarlos dentro de un juego, no repartir los archivos); al juego solo van los dibujos ya montados en
`src/09jy_sprx_data.js`.

Orden (cada script recibe la carpeta de trabajo `G`, con `out/` y `out2/`):
1. `build.py G` — héroes y soldado (capas: piel, pelo, ropa, objeto en mano; recolores; vara alargada; cinta de Bencomo).
2. `build2.py G` — La Mirladora (orbe y rayo), enemigos de los dos juegos, El Mencey y Bencomo con el asta, duende.
3. `crouch2.py G` — Bencomo agachado y el golpe bajo (piernas dibujadas a mano).
4. `lizard.py G` y `riders.py G` — el lagarto de El Hierro (muñeco por código) y los héroes montados.
5. `lugo_horse.py G` — Lugo a caballo (PixelHorse ×2 con scale2x, armadura plateada, lanza de justa).
6. `pack.py G src/09jy_sprx_data.js` — junta las hojas, calcula los pies de cada una y escribe el JS.

El caballero de 18studio (`caballero_rojo.png`) se sacó de sus gif reduciéndolo a 1/5 (1/3,5–1/4 en ataque, caída y
bajarse) con la paleta a 28 colores y el azul pasado a carmesí.

Las rutas de los packs están escritas como las ve la nube (`/mnt/user-data/uploads/GTA La Laguna/assets_externos/`);
para correrlo en el PC basta con cambiar `A` en `mk.py` (y las rutas sueltas de `build2.py`, `lugo_horse.py`, `pack.py`).

## v0.96–0.98

- `mirla_nat.py G` — La Mirladora sin bikini (el sujetador de la piel pasado a piel, pezones), pelo de castaño a rubio,
  taparrabos de cuero oscuro y la falda que se levanta en la caída. Va antes de `riders.py`.
- `basket.py G` — propuesta de baloncesto (camisetas de asillas, pantalón corto; aún no en el juego).
- `wolf2.py negro.gif marron.gif blanco.gif out3/lobo.png` — el lobo de los perros, sacado de los tres GIF de vista
  previa (el fondo es igual en los tres: el lobo es lo que cambia). `wolf.py` era el primer intento con uno solo.
- `gorgon.py ASSETS out3` — las tres gorgonas (craftpix) sin la parte de arriba, con pezones.
- `newsheets.py G` — lobo, gorgonas, Gollux, rata y Demon Overlord al orden de filas del juego (0 parado, 1 andar,
  2 correr, 3–4 salto, 5 golpe, 6 muerte, 7 patada, 8 patada en carrera), recortados; luego `pack.py`.
- `page_nuevos.py G` — la página de propuestas «Guanche Guarriors: personajes nuevos».

Licencias de los packs nuevos (Jonay, 27-oct: todos son gratuitos, descargados de itch.io):
- Demon Overlord 2D Pixel Art, de Le3cH_z (https://le3ch-z.itch.io/demon-overlord-2d-pixel-art-asset-pack): gratis en
  juegos, también comerciales; se puede modificar; no repartir el pack suelto.
- Gorgonas, de Free Game Assets / craftpix
  (https://free-game-assets.itch.io/free-gorgon-pixel-art-character-sprite-sheets; https://craftpix.net/file-licenses/).
- Gollux, RAt, Free Mythic Monsters y el lobo: también gratuitos de itch.io (según Jonay).

## v0.99
- `mk.py`: la patada en carrera se gira con `rotsprite()` (×8 con Scale2x, giro, y cada bloque al color mayoritario).
- `newsheets.py`: Guayota (Demon Overlord) con sus 8 fotogramas, reducido a 5/8 con `mode_resize()` (sin difuminar).
