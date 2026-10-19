# Pruebas 0.76.0 — 2026-10-19 11:46 — 6/6 OK

Listas: sonda077, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 167 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rendimiento.py` | **OK** | 80 s |
| 2 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 3 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 4 | `prueba_bordes.py` | **OK** | 0 s |
| 5 | `prueba_persecuciones.py` | **OK** | 26 s |
| 6 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 34 s |

## Detalle

### 1. herramientas/sonda_rendimiento.py — OK

```
     121  Abriendo puertas: Catedral, cafetería, hipermercado…
      17  Plantando laureles de Indias… · scatterTrees
    3228  Plantando laureles de Indias… · buildPlazasParks
     140  Plantando laureles de Indias… · buildTrees
     254  Encendiendo farolas…
     209  Marcando campos de fútbol y canchas…
     160  Poniendo señales de STOP y ceda el paso…
     731  Uniendo geometría…
     266  Juntando piezas sueltas…
      61  Pintando el cielo y el Teide…
    2017  Aparcando coches y poniendo el tranvía… · buildParked
       1  Aparcando coches y poniendo el tranvía… · buildTram
      23  Dibujando el mapa…
     298  Llegando a la Plaza del Adelantado…
       7  Arrancando el tráfico…
      33  Preparando a la gente de la calle…
     726  Compilando sombreadores…
   11664  TOTAL
== censo: mallas visibles 9403 sueltas 8344
    4563 mallas     54756 tri  suelta:-:BoxGeometry:MeshStandardMaterial
    2042 mallas     94568 tri  suelta:-:CylinderGeometry:MeshStandardMaterial
     596 mallas    101056 tri  inst:celda
     588 mallas   2076058 tri  suelta:-:BufferGeometry:MeshStandardMaterial
     358 mallas     25706 tri  suelta:-:ExtrudeGeometry:MeshStandardMaterial
     336 mallas       826 tri  suelta:-:PlaneGeometry:MeshStandardMaterial
     112 mallas    205997 tri  suelta:Head:BufferGeometry:MeshStandardMaterial
      91 mallas     11024 tri  fusion
      75 mallas      1170 tri  suelta:-:ConeGeometry:MeshStandardMaterial
      58 mallas       696 tri  suelta:-:BoxGeometry:MeshBasicMaterial
      34 mallas     18712 tri  chunk:asphalt
      32 mallas     26456 tri  chunk:sidewalk
      28 mallas     23046 tri  chunk:facade
      27 mallas      4698 tri  chunk:roofFlat
      27 mallas     17280 tri  chunk:disc
      25 mallas      5254 tri  chunk:asphaltLines
      25 mallas        50 tri  suelta:obispado:PlaneGeometry:MeshStandardMaterial
      23 mallas     12254 tri  chunk:footway
      23 mallas       276 tri  suelta:Head:BoxGeometry:MeshStandardMaterial
      18 mallas        36 tri  suelta:-:PlaneGeometry:MeshBasicMaterial
      18 mallas      7186 tri  chunk:roofTile
      18 mallas      2808 tri  chunk:discPave
      18 mallas      3728 tri  chunk:paving
      16 mallas     19693 tri  suelta:La Concepción:BufferGeometry:MeshStandardMaterial
      16 mallas     47190 tri  chunk:trim
      15 mallas    307982 tri  parked
      11 mallas      8200 tri  chunk:stone
      10 mallas      1920 tri  suelta:Head:TorusGeometry:MeshStandardMaterial
      10 mallas       160 tri  suelta:Head:CircleGeometry:MeshStandardMaterial
       9 mallas     11580 tri  suelta:aeropuerto:BufferGeometry:MeshStandardMaterial
       9 mallas       367 tri  suelta:Estadio Francisco Peraza:BufferGeometry:MeshStandardMaterial
       8 mallas        16 tri  suelta:inicio:PlaneGeometry:MeshStandardMaterial
       8 mallas        94 tri  chunk:sign5
       8 mallas       384 tri  suelta:lowerarm_l:CylinderGeometry:MeshStandardMaterial
       7 mallas     25280 tri  suelta:inicio:BufferGeometry:MeshStandardMaterial
       7 mallas      1824 tri  suelta:pabellon:BufferGeometry:MeshStandardMaterial
       6 mallas        12 tri  suelta:aeropuerto2:PlaneGeometry:MeshStandardMaterial
       6 mallas       312 tri  chunk:balcony
       6 mallas       520 tri  chunk:wood
       6 mallas        72 tri  chunk:sign0
SONDA RENDIMIENTO OK
```

### 2. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1792406700418,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 3. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":null,"punta":"2","maxV":"204","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -189   Z 0"}
```

### 4. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"¡ZONA PEATONAL! Sal o vendrá la policía"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":11.2,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 5. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.46 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 15 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.17 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.13 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.13 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 6. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 6.2, 'dy': 0.2, 'col': True, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 182, 'time': 20.9, 'x': 542, 'z': -907, 'y': -0.3}
snap df_308
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 498, 'time': 116.4, 'x': 42, 'z': 1154, 'y': -32.7}
snap df_1287
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 9, 'time': 55.4, 'x': -387, 'z': 676, 'y': -6.9}
snap df_2295
failed 0 of 112 · conocidos 3
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 542 Z -907, Autopista del Norte X 42 Z 1154, Autopista del Norte X -387 Z 676
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, sonda_rendimiento.txt
