# Pruebas 0.76.0 — 2026-10-19 11:55 — 1/1 OK

Listas: sonda077. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 97 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rendimiento.py` | **OK** | 80 s |

## Detalle

### 1. herramientas/sonda_rendimiento.py — OK

```
      59 mallas      7106 tri  suelta:-:ExtrudeGeometry:MeshStandardMaterial
      58 mallas       696 tri  suelta:-:BoxGeometry:MeshBasicMaterial
      49 mallas       588 tri  suelta(después):-:BoxGeometry:MeshStandardMaterial
      43 mallas    174646 tri  suelta(después):-:BufferGeometry:MeshStandardMaterial
      34 mallas     18712 tri  chunk:asphalt
      32 mallas     26456 tri  chunk:sidewalk
      28 mallas     23046 tri  chunk:facade
      27 mallas      4698 tri  chunk:roofFlat
      27 mallas     17280 tri  chunk:disc
      25 mallas      5254 tri  chunk:asphaltLines
      25 mallas        50 tri  suelta(después):obispado:PlaneGeometry:MeshStandardMaterial
      23 mallas     12254 tri  chunk:footway
      23 mallas       276 tri  suelta(después):Head:BoxGeometry:MeshStandardMaterial
      18 mallas        36 tri  suelta:-:PlaneGeometry:MeshBasicMaterial
      18 mallas      7186 tri  chunk:roofTile
      18 mallas      2808 tri  chunk:discPave
      18 mallas      3728 tri  chunk:paving
      16 mallas     19693 tri  suelta:La Concepción:BufferGeometry:MeshStandardMaterial
      16 mallas     47190 tri  chunk:trim
      15 mallas    310462 tri  parked
      13 mallas     20834 tri  suelta(después):Head:BufferGeometry:MeshStandardMaterial
      11 mallas      8200 tri  chunk:stone
      10 mallas      1920 tri  suelta(después):Head:TorusGeometry:MeshStandardMaterial
      10 mallas       160 tri  suelta(después):Head:CircleGeometry:MeshStandardMaterial
       9 mallas     11580 tri  suelta:aeropuerto:BufferGeometry:MeshStandardMaterial
       9 mallas       367 tri  suelta:Estadio Francisco Peraza:BufferGeometry:MeshStandardMaterial
       8 mallas        16 tri  suelta:inicio:PlaneGeometry:MeshStandardMaterial
       8 mallas        94 tri  chunk:sign5
       8 mallas       384 tri  suelta(después):lowerarm_l:CylinderGeometry:MeshStandardMaterial
       7 mallas        84 tri  suelta:-:ConeGeometry:MeshStandardMaterial
       7 mallas     25280 tri  suelta:inicio:BufferGeometry:MeshStandardMaterial
       7 mallas      1824 tri  suelta:pabellon:BufferGeometry:MeshStandardMaterial
       6 mallas        12 tri  suelta:aeropuerto2:PlaneGeometry:MeshStandardMaterial
== sueltas grandes (más de 1500 tri): 169
   [403254, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [33788, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [22704, 0, 0, 0, 'BufferGeometry', '2d3236', 'G(inicio)']
   [15082, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [12812, 9100, -152, 3, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9197, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9196, -152, 0, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9196, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9196, -152, -1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9381, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9393, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9405, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9417, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9406, -152, -41, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9447, -152, -13, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9490, -152, -59, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9454, -152, -30, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9358, -152, 10, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9504, -152, -36, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9638, -152, 2, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9631, -152, 4, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9630, -152, -6, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9636, -152, 2, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9783, -152, 10, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9784, -152, 10, 'BufferGeometry', 'ffffff', 'GG']
SONDA RENDIMIENTO OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_rendimiento.txt
