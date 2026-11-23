# Pruebas 1.4.47 — 2026-11-23 19:34 — 18/18 OK

Listas: congelar1445, aparcados, marchas, setos, pintura, v1447. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 292 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 2 s |
| 3 | `prueba_bordes.py` | **OK** | 0 s |
| 4 | `prueba_persecuciones.py` | **OK** | 23 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 83 s |
| 6 | `prueba_arranque.py` | **OK** | 1 s |
| 7 | `prueba_1441.py` | **OK** | 0 s |
| 8 | `prueba_muerte_coche.py` | **OK** | 7 s |
| 9 | `prueba_misiones.py` | **OK** | 70 s |
| 10 | `herramientas/foto_1441.py` | **OK** | 1 s |
| 11 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 12 | `prueba_congelados.py` | **OK** | 0 s |
| 13 | `herramientas/sonda_aparcados.py` | **OK** | 60 s |
| 14 | `herramientas/sonda_marchas.py` | **OK** | 2 s |
| 15 | `herramientas/foto_setos.py` | **OK** | 0 s |
| 16 | `herramientas/foto_pintura_gpu.py` | **OK** | 0 s |
| 17 | `herramientas/foto_1447.py` | **OK** | 0 s |
| 18 | `herramientas/sonda_descongelados.py` | **OK** | 0 s |

## Detalle

### 1. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795462187062,"label":"test","player":{"x":-191.8591345618258,"z":806.259916219301,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-193.8591345618258,"z":806.259916219301},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":4,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"JTM H4","t0a100":"3.0","punta":"225","maxV":"232","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -192 · Y 0 · 555 m"}
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[0,5],"borde":813,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-14 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[0,5],"borde":813,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-14 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[0,5],"borde":813,"calle":3.6,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-14 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-14 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
```

### 4. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.34 m OK
[8] Los bancos del Adelantado: a pie: a 4 m, recorre 7 m en 3 s, salto máx 0.17 m OK
[10] El carterista del Cristo: a pie: a 3 m, recorre 11 m en 3 s, salto máx 0.20 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 8 m en 3 s, salto máx 0.12 m OK | a pie: a 10 m, recorre 9 m en 3 s, salto máx 0.12 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 5. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

### 6. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 48, 'peor': 60, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 7. prueba_1441.py — OK

```
{"hits": [], "worst": 0, "steer": [[12, 0.2851383472958285], [28, 0.1738562054484647], [55, 0.03939595557775182], [80, 0.012488016980696775]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 324, "ratio": 1.2}, "garage": {"ok": true, "carved": true, "antes": {"car": false, "interior": null, "dead": true, "st": "play"}, "despues": {"car": false, "interior": null, "dead": false, "d": 0}, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.342515990130764}}
AUTOPISTA_SIN_GOLPES OK
GIRO_CIUDAD_IGUAL OK
GIRO_MENOR_A_300 OK
PEATONES_FUERA_DE_PUENTES OK
GOLD_EXISTE OK
GOLD_DORADO OK
GOLD_20_POR_CIENTO OK
GARAJE_HECHO OK
GARAJE_COCHE_DENTRO OK
GARAJE_BOTON OK
GARAJE_PUERTA OK
GARAJE_SALIDA OK
errores []
PRUEBA 1441 OK
```

### 8. prueba_muerte_coche.py — OK

```
t 0 {"st":"cutscene","dead":true,"car":true,"hp":-37}
t 1 {"st":"play","dead":false,"car":false,"hp":100}
t 2 {"st":"play","dead":false,"car":false,"hp":100}
t 3 {"st":"play","dead":false,"car":false,"hp":100}
t 4 {"st":"play","dead":false,"car":false,"hp":100}
t 5 {"st":"play","dead":false,"car":false,"hp":100}
ERR []
```

### 9. prueba_misiones.py — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
[7] Defensores de La Laguna: PASA · dinero +1000 · pasos dlg>idle
[8] Los bancos del Adelantado: PASA · dinero +900 · pasos talk>goto>talk>fight>shot>talk>idle
[9] El gofio robado: PASA · dinero +1100 · pasos talk>goto>talk>goto>talk>goto>talk>fight>enter>goto>talk>idle
[10] El carterista del Cristo: PASA · dinero +600 · pasos talk>goto>chase>talk>fight>idle
[11] Carrera solidaria del casco: PASA · dinero +700 · pasos talk>goto>idle
[12] El rally de La Esperanza: PASA · dinero +1200 · pasos talk>car>goto>countdown>goto>idle
[13] Baches en la Vía de Ronda: PASA · dinero +900 · pasos talk>enter>goto>idle
[14] Escolta a la guagua del Romero: PASA · dinero +1000 · pasos talk>car>escort>talk>idle
[15] La guagua de la broma: PASA · dinero +900 · pasos talk>car>escort>talk>idle
[16] Grafiteros en el tranvía: PASA · dinero +800 · pasos talk>goto>shot>talk>idle
[17] Noche en el aeropuerto: PASA · dinero +2000 · pasos talk>goto>damage>shot>talk>idle
[18] El rifle de agua: PASA · dinero +-2200 · pasos talk>goto>shop>dlg>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 10. herramientas/foto_1441.py — OK

```
{"p":"<kbd>E</kbd> Pulsar el botón del garaje","a":1.5707963267948966}
FOTO 1441 OK
```

### 11. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': True, 'grid': {'same': True, 'oneway': True, 'ahead': 12, 'fwd': True, 'dot': 1, 'se': 2291, 'pe': 2291}, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 12. prueba_congelados.py — OK

```
congelados 13288 · descongelados 1
   Object3D X -192, Y 20 (se mueve)
PRUEBA CONGELADOS OK
```

### 13. herramientas/sonda_aparcados.py — OK

```
aparcados 7609 · probados 401 · fallan 15
por modelo: {"dsendero": 1, "hubli": 1, "troceen": 1, "troceenC44": 1, "mpyou": 2, "pantera": 2, "hilos": 2, "mphs": 1, "clever": 1, "cartabon": 1, "vengator": 1, "torson": 1}
   ['dsendero', 177, -617, 'no se mueve (1.53 m)']
   ['hubli', 217, -585, 'no se mueve (0.53 m)']
   ['troceen', -110, 137, 'no se mueve (1.52 m)']
   ['troceenC44', -123, 176, 'no se mueve (1.50 m)']
   ['mpyou', -247, 453, 'no se mueve (1.49 m)']
   ['pantera', -504, 597, 'no se mueve (0.94 m)']
   ['hilos', 806, 2771, 'no se mueve (1.73 m)']
   ['mphs', -771, 548, 'no se mueve (0.74 m)']
   ['clever', -738, 1557, 'no se mueve (1.45 m)']
   ['mpyou', 12, 857, 'no se mueve (0.09 m)']
   ['cartabon', 1441, 3172, 'no se mueve (0.44 m)']
   ['pantera', 1434, 3142, 'no se mueve (0.50 m)']
   ['vengator', 836, 1449, 'no se mueve (1.89 m)']
   ['torson', -567, 109, 'no se mueve (0.58 m)']
   ['hilos', 1882, 1306, 'no se mueve (1.01 m)']
SONDA APARCADOS OK
```

### 14. herramientas/sonda_marchas.py — OK

```
utilitario {"modelo": "Piki Crocante", "perfil": "gas", "marchas": [[12, "1", 1524], [23, "1", 3029], [34, "1", 4488], [43, "2", 3948], [51, "2", 4595], [56, "2", 5137], [62, "3", 3907], [66, "3", 4197], [70, "3", 4460], [0, "1", 3293], [2, "R", 2454], [0, "1", 3351], [0, "1", 3352], [0, "1", 3352], [0, "1", 3352], [0, "1", 3352]]}
deportivo {"modelo": "Fierilla 440", "perfil": "v8", "marchas": [[24, "1", 2026], [47, "1", 4016], [68, "1", 5811], [84, "2", 5239], [97, "2", 6022], [107, "2", 6686], [4, "R", 2189], [21, "1", 1752], [0, "1", 4001], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007], [0, "1", 4007]]}
guagua {"modelo": "Escania Guagua", "perfil": "bigdiesel", "marchas": [[6, "1", 848], [12, "1", 1442], [18, "1", 2149], [23, "2", 1906], [28, "2", 2277], [31, "3", 1744], [35, "3", 1921], [37, "3", 2075], [40, "3", 2214], [42, "4", 1578], [44, "4", 1655], [46, "4", 1727], [7, "R", 878], [3, "1", 952], [0, "1", 1409], [0, "1", 1406]]}
electrico {"modelo": "Newton Style 3", "perfil": "ev", "marchas": [[19, "D", 1323], [37, "D", 2624], [54, "D", 3814], [67, "D", 4702], [77, "D", 5413], [86, "D", 6012], [93, "D", 6536], [1, "D", 89], [4, "R", 247], [0, "D", 27], [0, "D", 27], [0, "D", 27], [0, "D", 27], [0, "D", 27], [0, "D", 27], [0, "D", 27]]}
SONDA MARCHAS OK
```

### 15. herramientas/foto_setos.py — OK

```
SETOS [['seto_boj', 1118.229248046875, 3141.22216796875, 426.68902055574154], ['seto_bug', 1582.8419189453125, 2797.478271484375, 177.80230728119], ['seto_flor', 1590.043701171875, 2799.31494140625, 179.55476096632313]]
FOTO SETOS OK 3
```

### 16. herramientas/foto_pintura_gpu.py — OK

```
FOTO PINTURA OK 20
```

### 17. herramientas/foto_1447.py — OK

```
FOTO 1447 OK
```

### 18. herramientas/sonda_descongelados.py — OK

```
PIEZA {'at': [143, 5], 'type': 'Group', 'name': '', 'ud': [], 'y': 0.43, 'kids': 5, 'chain': [], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CircleGeometry', 'params': {'radius': 4.7, 'segments': 8, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': '4d8ea3', 'ud': [], 'y': 1.15, 'kids': 0, 'chain': ['Group'], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CylinderGeometry', 'params': {'radiusTop': 2, 'radiusBottom': 2.24, 'height': 3.05, 'radialSegments': 24, 'heightSegments': 1, 'openEnded': True, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': 'cfe8f0', 'ud': ['noMerge'], 'y': 2.68, 'kids': 0, 'chain': ['Group'], 'frozen': False}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'CylinderGeometry', 'params': {'radiusTop': 1, 'radiusBottom': 1.12, 'height': 4.4, 'radialSegments': 24, 'heightSegments': 1, 'openEnded': True, 'thetaStart': 0, 'thetaLength': 6.283185307179586}, 'mat': 'MeshStandardMaterial', 'col': 'cfe8f0', 'ud': ['noMerge'], 'y': 3.35, 'kids': 0, 'chain': ['Group'], 'frozen': False}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'BufferGeometry', 'mat': 'MeshStandardMaterial', 'col': 'd9d4ca', 'ud': [], 'y': 0.43, 'kids': 0, 'chain': ['Group'], 'frozen': True}
PIEZA {'at': [143, 5], 'type': 'Mesh', 'name': '', 'geo': 'BufferGeometry', 'mat': 'MeshStandardMaterial', 'col': 'eeebe4', 'ud': [], 'y': 0.43, 'kids': 0, 'chain': ['Group'], 'frozen': True}
SONDA DESCONGELADOS OK 6
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, f1441_bajando.jpg, f1441_dentro.jpg, f1441_frente.jpg, f1441_nano_frente.jpg, f1441_nano_lado.jpg, f1441_noche.jpg, f1441_porton_abierto.jpg, f1441_porton_abriendo.jpg, f1441_porton_cerrado.jpg, f1441_subiendo.jpg, pintura_cerca_antes.jpg, pintura_cerca_despues.jpg, pintura_conjunto_antes.jpg, pintura_conjunto_despues.jpg, pintura_tarde_antes.jpg, pintura_tarde_cerca_antes.jpg, pintura_tarde_cerca_despues.jpg, pintura_tarde_despues.jpg, setos_seto_boj.jpg, setos_seto_boj_calle.jpg, setos_seto_bug.jpg, setos_seto_bug_calle.jpg, setos_seto_flor.jpg, setos_seto_flor_calle.jpg, v1447_estrellas.jpg, v1447_horizonte.jpg, v1447_parterres.jpg, v1447_parterres_cerca.jpg
