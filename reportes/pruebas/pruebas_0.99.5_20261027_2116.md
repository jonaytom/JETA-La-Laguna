# Pruebas 0.99.5 — 2026-10-27 21:16 — 7/7 OK

Listas: v0995, base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 174 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_0995.py` | **OK** | 0 s |
| 2 | `foto_vias.py` | **OK** | 82 s |
| 3 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 4 | `prueba_coche_y_boca.py` | **OK** | 2 s |
| 5 | `prueba_bordes.py` | **OK** | 0 s |
| 6 | `prueba_persecuciones.py` | **OK** | 27 s |
| 7 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 40 s |

## Detalle

### 1. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9479
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o2_86', 'aL_o4_148m', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 2. foto_vias.py — OK

```
APARCADOS SOBRE CARRETERA GRANDE 1 [[640, 1353, 'primary', 'Vía de Ronda de La Laguna']]
foto vias_00 750 1253
foto vias_01 403 1458
foto vias_02 308 -51
foto vias_03 420 278
foto vias_04 660 702
foto vias_05 718 948
foto vias_06 1042 2522
foto vias_07 -810 200
foto vias_08 -42 1077
foto vias_09 860 2076
foto vias_10 636 1806
foto vias_11 992 2212
foto vias_12 400 -293
foto vias_13 -573 462
foto vias_14 182 1326
foto vias_15 -100 1013
foto vias_16 490 1392
foto vias_17 1121 2357
errores []
PRUEBA VIAS OK
```

### 3. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793135713230,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 4. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.1","punta":"195","maxV":"193","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -189   Z 0"}
```

### 5. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-25 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-25 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[-1,7],"borde":814,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-25 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-25 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":0}
```

### 6. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.61 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 12 m en 3 s, salto máx 0.13 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 13 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 7. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, vias_00.jpg, vias_01.jpg, vias_02.jpg, vias_03.jpg, vias_04.jpg, vias_05.jpg, vias_06.jpg, vias_07.jpg, vias_08.jpg, vias_09.jpg, vias_10.jpg, vias_11.jpg, vias_12.jpg, vias_13.jpg, vias_14.jpg, vias_15.jpg, vias_16.jpg, vias_17.jpg
