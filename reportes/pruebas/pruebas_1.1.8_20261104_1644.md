# Pruebas 1.1.8 — 2026-11-04 16:44 — 1/1 OK

Listas: gpu_a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 108 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 90 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   con sombras1024              (    1):  19.80 ms ( +1.60)  llamadas  1483 (+0)  tri  1430597 (+0)
   con resolucion1              (    1):  19.50 ms ( +1.30)  llamadas  1483 (+0)  tri  1430597 (+0)
   sin fusion                   (  236):  17.00 ms ( -1.20)  llamadas  1322 (-161)  tri  1402387 (-28210)
   sin sombras                  (    1):  17.10 ms ( -1.10)  llamadas  1289 (-194)  tri  1057617 (-372980)
   con terreno_una_cara         (    1):  19.00 ms ( +0.80)  llamadas  1483 (+0)  tri  1430597 (+0)
   sin parked                   (  304):  17.70 ms ( -0.50)  llamadas  1459 (-24)  tri  1346229 (-84368)
   sin terreno                  (    1):  18.60 ms ( +0.40)  llamadas  1482 (-1)  tri  1027343 (-403254)
   sin instanciadas             (    3):  17.80 ms ( -0.40)  llamadas  1482 (-1)  tri  1430517 (-80)
== La Trinidad a pie: 20 ms (mandar el trabajo 20.4 ms; a 480x270 19.9 ms)  llamadas 1621  tri 1396726
   con sin_niebla_lejos         (    1):  14.90 ms ( -5.10)  llamadas   889 (-732)  tri  1276503 (-120223)
   sin ciudad                   ( 1114):  16.30 ms ( -3.70)  llamadas  1103 (-518)  tri  1135019 (-261707)
   sin sueltas                  ( 2131):  16.50 ms ( -3.50)  llamadas  1147 (-474)  tri  1150029 (-246697)
   sin inst                     (  726):  16.70 ms ( -3.30)  llamadas  1310 (-311)  tri  1227190 (-169536)
   sin sombras                  (    1):  17.10 ms ( -2.90)  llamadas  1458 (-163)  tri  1143938 (-252788)
   sin fusion                   (  370):  18.10 ms ( -1.90)  llamadas  1393 (-228)  tri  1336076 (-60650)
   sin gente                    (    4):  18.80 ms ( -1.20)  llamadas  1601 (-20)  tri  1278044 (-118682)
   con sombras1024              (    1):  21.20 ms ( +1.20)  llamadas  1621 (+0)  tri  1396726 (+0)
   sin parked                   (  304):  19.30 ms ( -0.70)  llamadas  1575 (-46)  tri  1165374 (-231352)
   con terreno_una_cara         (    1):  19.30 ms ( -0.70)  llamadas  1621 (+0)  tri  1396726 (+0)
   sin fondo                    (    6):  20.60 ms ( +0.60)  llamadas  1618 (-3)  tri  1373276 (-23450)
   sin instanciadas             (    3):  20.50 ms ( +0.50)  llamadas  1621 (+0)  tri  1396726 (+0)
   con resolucion1              (    1):  19.50 ms ( -0.50)  llamadas  1621 (+0)  tri  1396726 (+0)
   con terreno_simple           (    1):  20.30 ms ( +0.30)  llamadas  1621 (+0)  tri  1396726 (+0)
   sin terreno                  (    1):  20.20 ms ( +0.20)  llamadas  1620 (-1)  tri   993472 (-403254)
   sin coches                   (    5):  20.00 ms ( +0.00)  llamadas  1614 (-7)  tri  1394638 (-2088)
== vista alta: 18.5 ms (mandar el trabajo 18.8 ms; a 480x270 17.9 ms)  llamadas 1340  tri 1787362
   con sin_niebla_lejos         (    1):  14.20 ms ( -4.30)  llamadas   802 (-538)  tri  1383624 (-403738)
   sin ciudad                   ( 1104):  15.00 ms ( -3.50)  llamadas   944 (-396)  tri  1558763 (-228599)
   sin sueltas                  ( 2121):  15.10 ms ( -3.40)  llamadas  1057 (-283)  tri  1546405 (-240957)
   sin inst                     (  714):  15.60 ms ( -2.90)  llamadas  1021 (-319)  tri  1546238 (-241124)
   sin fusion                   (  371):  16.40 ms ( -2.10)  llamadas  1205 (-135)  tri  1743480 (-43882)
   sin parked                   (  291):  20.60 ms ( +2.10)  llamadas  1146 (-194)  tri  1181362 (-606000)
   sin sombras                  (    1):  16.40 ms ( -2.10)  llamadas  1180 (-160)  tri  1512110 (-275252)
   sin gente                    (    4):  17.00 ms ( -1.50)  llamadas  1320 (-20)  tri  1669907 (-117455)
   sin fondo                    (    6):  17.20 ms ( -1.30)  llamadas  1337 (-3)  tri  1763912 (-23450)
   sin terreno                  (    1):  17.50 ms ( -1.00)  llamadas  1339 (-1)  tri  1384108 (-403254)
   con resolucion1              (    1):  18.10 ms ( -0.40)  llamadas  1340 (+0)  tri  1787362 (+0)
   sin coches                   (    5):  18.80 ms ( +0.30)  llamadas  1333 (-7)  tri  1785274 (-2088)
   con terreno_una_cara         (    1):  18.20 ms ( -0.30)  llamadas  1340 (+0)  tri  1787362 (+0)
   sin instanciadas             (    3):  18.30 ms ( -0.20)  llamadas  1339 (-1)  tri  1787282 (-80)
   con sombras1024              (    1):  18.40 ms ( -0.10)  llamadas  1340 (+0)  tri  1787362 (+0)
   con terreno_simple           (    1):  18.50 ms ( -0.00)  llamadas  1340 (+0)  tri  1787362 (+0)
== autopista: 21.4 ms (mandar el trabajo 19.7 ms; a 480x270 19.9 ms)  llamadas 1643  tri 2075019
   con sin_niebla_lejos         (    1):  11.20 ms (-10.20)  llamadas   311 (-1332)  tri   796324 (-1278695)
   sin sueltas                  ( 2121):  14.40 ms ( -7.00)  llamadas   884 (-759)  tri  1745359 (-329660)
   sin ciudad                   (  626):  18.10 ms ( -3.30)  llamadas  1291 (-352)  tri  1891296 (-183723)
   sin parked                   (  291):  18.90 ms ( -2.50)  llamadas  1352 (-291)  tri  1004893 (-1070126)
   sin inst                     (  313):  19.00 ms ( -2.40)  llamadas  1482 (-161)  tri  2011223 (-63796)
   sin sombras                  (    1):  19.40 ms ( -2.00)  llamadas  1586 (-57)  tri  1937846 (-137173)
   sin coches                   (    5):  23.00 ms ( +1.60)  llamadas  1643 (+0)  tri  2075019 (+0)
   con resolucion1              (    1):  19.90 ms ( -1.50)  llamadas  1643 (+0)  tri  2075019 (+0)
   con sombras1024              (    1):  20.30 ms ( -1.10)  llamadas  1643 (+0)  tri  2075019 (+0)
   sin instanciadas             (    3):  22.10 ms ( +0.70)  llamadas  1642 (-1)  tri  2074939 (-80)
   con terreno_simple           (    1):  20.70 ms ( -0.70)  llamadas  1643 (+0)  tri  2075019 (+0)
   con terreno_una_cara         (    1):  20.70 ms ( -0.70)  llamadas  1643 (+0)  tri  2075019 (+0)
   sin fusion                   (   34):  20.80 ms ( -0.60)  llamadas  1629 (-14)  tri  2074211 (-808)
   sin terreno                  (    1):  21.90 ms ( +0.50)  llamadas  1642 (-1)  tri  1671765 (-403254)
   sin gente                    (    4):  21.00 ms ( -0.40)  llamadas  1623 (-20)  tri  1956715 (-118304)
   sin fondo                    (    6):  21.10 ms ( -0.30)  llamadas  1640 (-3)  tri  2051569 (-23450)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
