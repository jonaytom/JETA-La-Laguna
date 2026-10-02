# 2. Datos del mapa (OpenStreetMap → `data.json`)

## Origen

`data/laguna_osm2.json` es una exportación de OpenStreetMap de la zona de La Laguna (edificios, vías, usos del
suelo, puntos de interés, tranvía, árboles) más una rejilla de elevación (`ELEV`). Formato de entrada que espera
`prep.py`:

```
{ "B": [[tags, coords], ...],   edificios (coords planas lon/lat ya pasadas a metros, ver abajo)
  "R": [[tags, coords], ...],   vías (highway=*)
  "A": [[tags, coords], ...],   áreas (landuse, leisure, natural, amenity=parking)
  "T": [[tags, coords], ...],   vías del tranvía
  "N": [[x, z], ...],           árboles sueltos (natural=tree)
  "P": [[nombre, tipo, [x, z]], ...],  puntos de interés
  "ELEV": { "N": n, "E": [...n*n alturas...], "la0", "la1", "lo0", "lo1" } }
```

## Sistema de coordenadas

- Origen: latitud **28.4875**, longitud **−16.3150** (casco histórico).
- **x** = metros hacia el **este**; **z** = metros hacia el **sur** (z crece al bajar de latitud).
- **y** = altura en metros respecto a la cota del origen (`H.base`).
- Las coordenadas se redondean a 0,5 m (`q()`), lo que hace que los nodos compartidos entre vías coincidan
  exactamente: la clave `"x,z"` identifica un cruce en todo el código (`nodeCount`, `K(x, z)`).

## `prep.py` paso a paso

1. **Relieve**: interpola la rejilla de elevación con un spline bicúbico (SciPy) y la remuestrea cada 16 m en el
   rectángulo x ∈ [−2600, 2800], z ∈ [−1800, 4400]. Se guarda en decímetros como `int16` en base64 (`H.d`).
2. **Edificios**: une los anillos abiertos de multipolígonos, orienta en sentido antihorario, y clasifica:
   estilo (colonial en el casco, moderno, bloque, industrial, iglesia, invernadero, institucional), plantas,
   altura, tipo de tejado (plano / a cuatro aguas) y una semilla aleatoria estable (hash de las coordenadas).
3. **Vías**: tipo (`RT`), ancho (por defecto por tipo, o `width`/`lanes` de OSM), sentido único (incluido
   `oneway=-1` → se invierte la geometría), puente, túnel, rotonda y firme.
4. **Rotondas pequeñas**: se agrandan (radio ×1,9 hasta 16 m) y se deforma radialmente todo lo de alrededor
   (`W`, *warps*) para que quepan los coches. `build.py` aplica la misma deformación a los comercios.
5. **Grafo de tráfico** (`G`): solo vías aptas para coches; se corta en cada cruce.
6. **Tranvía** (`T`): encadena los tramos desde la parada de La Trinidad.
7. **Áreas** (`A`): parques, jardines, césped, bosque, agua, aparcamientos, plazas… Las vías peatonales cerradas
   también se añaden como plazas.

## Formato de `data/data.json`

| Clave | Formato | Notas |
|---|---|---|
| `H` | `{x0, z0, dx, nx, nz, base, d}` | Relieve; `heightAt(x, z)` interpola con la misma triangulación que la malla. |
| `S` | `[cadena, ...]` | Tabla de nombres; el resto guarda índices (−1 = sin nombre). |
| `RT` | tipos de vía | `motorway, motorway_link, trunk, primary, primary_link, secondary, secondary_link, tertiary, tertiary_link, unclassified, residential, living_street, service, pedestrian, footway, steps, path, track, cycleway`. Índice ≤ 12 = apta para coches. |
| `AT` | tipos de área | `park, garden, grass, farmland, meadow, pitch, forest, scrub, water, cemetery, playground, parking, residential, industrial, square, sports, orchard`. |
| `B` | `[alto×10, estilo, plantas, tejado, nombre, semilla×1000, coords]` | Edificios. |
| `R` | `[tipo, nombre, ancho, flags, coords]` | Vías. Ver flags abajo. |
| `G` | `{n: [x,z,...], e: [[a, b, tipo, sentidoÚnico, ancho, nombre, puntosIntermedios], ...]}` | Grafo de tráfico. Todos sus puntos son también puntos de `R`. |
| `T` | `[x, z, ...]` | Línea del tranvía. |
| `A` | `[tipo, nombre, coords]` | Áreas. |
| `N` | `[x, z, ...]` | Árboles de OSM. |
| `P` | `[nombre, tipo, x, z]` | Puntos de interés (paradas, monumentos, farmacias…). |
| `W` | `[cx, cz, Rviejo, Rnuevo, K]` | Deformaciones de rotondas. |
| `RB` | `[cx, cz, R, ancho]` | Rotondas (isleta central). |

Añadidos por `build.py`: `SH` (comercios `[x, z, categoría, nombre]`), `BRAND` (marca real → parodia),
`KV` (coches), `HUM` (personajes), `PLASTER` (texturas).

### Flags de las vías (`R[i][3]`)

| Bit | Valor | Significado |
|---|---|---|
| 0 | 1 | Sentido único (en el sentido de dibujo). |
| 1 | 2 | Puente (`bridge=yes/viaduct`). |
| 2 | 4 | Túnel (`tunnel=yes/building_passage`). |
| 3–4 | 8 / 16 | Firme: 1 = adoquín/pavimento, 2 = tierra. |
| 5 | 32 | Rotonda. |

## Ajustes al cargar (`01_core.js`)

- **Ensanchado** (`WIDEN`, `WIDEN2`): las anchuras de OSM se quedan cortas a escala de juego; se multiplican
  (×1,12 a ×1,3 según tipo, con mínimos) y en el casco se usa un ensanchado más suave.
- **Separación de calzadas** (`separateCarriageways`): ver `docs/03_mundo_3d.md`. Mueve vértices compartidos
  a la vez en `R` y en `G` para que el tráfico siga coincidiendo con la carretera dibujada.

## Comercios y parodias

`data/shops.txt` y `data/shops_new.txt`: una línea por comercio `x|z|categoría|nombre`. Categorías de una letra
(`S` súper, `R` restaurante, `C` cafetería, `B` bar, `F` comida rápida, `K` banco, `P` farmacia, `G` gasolinera,
`H` hotel, `V` ropa, `O` óptica, `L` librería, `D` dulcería, `T` telefonía, `E` peluquería, `J` joyería, `M` otros).
Los nombres de marcas reales se sustituyen siempre por su parodia con la tabla `BRAND` de `build.py`
(p. ej. Alcampo → «Alcampito», McDonald's → «McGofio»). Nunca se usan marcas reales ni nombres inventados para
negocios reales concretos.

## Regenerar el mapa

```bash
pip install numpy scipy
python prep.py      # data/laguna_osm2.json → data/data.json
python build.py
```
