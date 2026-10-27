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
