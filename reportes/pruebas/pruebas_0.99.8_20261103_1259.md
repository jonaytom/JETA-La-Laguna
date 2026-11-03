# Pruebas 0.99.8 — 2026-11-03 12:59 — 1/2 OK

Listas: v1000b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 49 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_sueltas.py` | **OK** | 2 s |
| 2 | `herramientas/sonda_recorte_motivos.py` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/sonda_sueltas.py — OK

```
== sueltas visibles: 2460 mallas, 2467 llamadas, 2064961 tri, en 12 grupos
  mallas llamadas      tri  huesos mats geos  lod sombra mueve  grupo · tipos
    1629     1636  1720463    333  609   799    0    515  1629  (sin nombre: Group) · CylinderGeometry/MeshStandardMaterial 601, BufferGeometry/MeshStandardMaterial 481, BoxGeometry/MeshStandardMaterial 292, PlaneGeometry/MeshStandardMaterial 84
     538      538    70418      0  191   521    0    301   538  (sin nombre: Mesh) · PlaneGeometry/MeshStandardMaterial 247, BufferGeometry/MeshStandardMaterial 147, BoxGeometry/MeshStandardMaterial 61, CylinderGeometry/MeshStandardMaterial 53
     169      169   201494      0  132    65    0    149   169  root · BufferGeometry/MeshStandardMaterial 108, BoxGeometry/MeshStandardMaterial 26, TorusGeometry/MeshStandardMaterial 12, CircleGeometry/MeshStandardMaterial 10
      28       28     1906      0    9    28    0      3    28  obispado · PlaneGeometry/MeshStandardMaterial 25, BufferGeometry/MeshStandardMaterial 3
      27       27    25374      0   22    23    0     10    27  inicio · PlaneGeometry/MeshStandardMaterial 11, BufferGeometry/MeshStandardMaterial 10, CylinderGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 3
      16       16    19693      0   16    16    0     16    16  La Concepción · BufferGeometry/MeshStandardMaterial 16
      12       12    11586      0   12    12    0      9    12  aeropuerto · BufferGeometry/MeshStandardMaterial 9, PlaneGeometry/MeshStandardMaterial 3
      12       12      463      0    7    12    0     12    12  Estadio Francisco Peraza · BufferGeometry/MeshStandardMaterial 9, CylinderGeometry/MeshStandardMaterial 3
      11       11    10176      0   11    11    0      5    11  aeropuerto2 · PlaneGeometry/MeshStandardMaterial 6, BufferGeometry/MeshStandardMaterial 5
       8        8     1826      0    8     8    0      7     8  pabellon · BufferGeometry/MeshStandardMaterial 7, PlaneGeometry/MeshStandardMaterial 1
       5        5     1500      0    5     5    0      5     5  casas · BufferGeometry/MeshStandardMaterial 5
       5        5       62      0    5     5    0      2     5  Pabellón Juan Ríos Tejera · BufferGeometry/MeshStandardMaterial 3, BoxGeometry/MeshStandardMaterial 2
SONDA SUELTAS OK
```

### 2. herramientas/sonda_recorte_motivos.py — FALLA

```
auditoría 2026-11-02_0.99.8_local · 81 casos críticos y altos
Traceback (prueba): Error('Page.evaluate: ReferenceError: insetPoly is not defined\n    at eval (eval at evaluate (:311:30), <anonymous>:10:36)\n    at UtilityScript.evaluate (<anonymous>:318:18)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)')
```

Fotos/archivos nuevos en `tests/shots/`: sonda_sueltas.txt
