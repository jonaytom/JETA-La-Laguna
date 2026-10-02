# JETA La Laguna

Juego de mundo abierto estilo GTA ambientado en **San Cristóbal de La Laguna (Tenerife)**, construido sobre el
trazado real de OpenStreetMap. Todo el juego es **un único archivo HTML** (Three.js r160 + JavaScript), sin servidor:
se abre con doble clic en `dist/JETA La Laguna.html`.

Protagonista: Santi «El Chopa», recién salido de la cárcel, que reúne a su banda (Boca Papa, El Blanco, Sastrón y Coco).
Los comercios son siempre **parodias** (nunca marcas reales) y la interfaz está en español con habla canaria.

> **Assets provisionales.** Los modelos (coches Kenney, personajes Quaternius), las texturas (procedurales y de
> Poly Haven), el logotipo y los sonidos sintetizados son **temporales**: sirven para tener el juego completo y
> jugable. Está previsto un **proyecto aparte de creación de assets** que los sustituirá. Ver
> [docs/10_assets.md](docs/10_assets.md) para saber dónde se carga cada uno y cómo cambiarlos sin tocar el resto.

## Jugar

- Abre `dist/JETA La Laguna.html` en Chrome / Edge / Firefox (PC o móvil). Necesita conexión la primera vez para
  descargar Three.js y las fuentes desde CDN.
- Controles principales (PC): `WASD` moverse · `Shift` correr · `Espacio` saltar · ratón cámara · `E` usar / entrar ·
  `F` coche · `Q` puñetazo a pie / cambiar emisora en coche · `Tab` pistola / puños · clic dcho. apuntar · `M` mapa ·
  `Esc` pausa (guardar / cargar, opciones). Mando y pantalla táctil también funcionan.

## Construir

Requisitos: Python 3.9+ (solo biblioteca estándar para construir).

```bash
python build.py
```

Genera en `dist/`:

| Archivo | Uso |
|---|---|
| `JETA La Laguna.html` | Juego completo para abrir en local (el que se reparte). |
| `gta-la-laguna.html` | Misma versión sin `<html>/<head>` para publicarla como Artifact de Claude. |
| `test.html` + `three.module.min.js` | Versión que carga Three.js local, para las pruebas automáticas sin red. |

## Estructura del repositorio

```
build.py            empaqueta todo en un HTML (concatena src/*.js en orden y mete los datos en JSON)
prep.py             convierte la exportación de OpenStreetMap (data/laguna_osm2.json) en data/data.json
template.html       HTML/CSS de la interfaz (HUD, menús, controles táctiles) con huecos __DATA__, __GAME__, __THREE__
src/                código del juego (módulos numerados, se concatenan por orden alfabético)
data/               datos ya procesados: mapa, personajes, coches, comercios, Three.js para pruebas
assets/             texturas y logotipo que se incrustan en el HTML
tools/              convertidores de modelos 3D (Kenney car kit, Quaternius) a JSON compacto
tests/              pruebas automáticas con Playwright (navegador sin ventana) y auditorías del mapa
docs/               documentación técnica
scripts/            publicación automática a GitHub
dist/               resultado de la construcción
```

## Documentación técnica

1. [Arquitectura y construcción](docs/01_arquitectura.md)
2. [Datos del mapa (OpenStreetMap → data.json)](docs/02_datos_y_mapa.md)
3. [Mundo 3D: terreno, carreteras, puentes, túneles, edificios, plazas](docs/03_mundo_3d.md)
4. [Personajes, vehículos, tráfico y colisiones](docs/04_personajes_y_vehiculos.md)
5. [Jugabilidad: misiones, peleas 2D, armas, policía, guardado](docs/05_jugabilidad.md)
6. [Audio y radio procedural](docs/06_audio.md)
7. [Pruebas y auditorías](docs/07_pruebas.md)
8. [Versiones y publicación en GitHub](docs/08_publicacion.md)
9. [Licencias y créditos](docs/09_licencias.md)
10. [Assets provisionales y cómo sustituirlos](docs/10_assets.md)

## Licencias

El código es del autor del proyecto. Datos de mapa © colaboradores de OpenStreetMap (ODbL). Modelos de coches
Kenney (CC0), personajes y animaciones Quaternius (CC0), texturas Poly Haven (CC0), Three.js (MIT).
Detalle en [docs/09_licencias.md](docs/09_licencias.md).
