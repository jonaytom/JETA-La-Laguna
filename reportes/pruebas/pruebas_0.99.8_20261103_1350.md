# Pruebas 0.99.8 — 2026-11-03 13:50 — 1/1 OK

Listas: v1000f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 93 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 77 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   sin gente                    (    4):  16.70 ms ( +0.40)  llamadas  1567 (-19)  tri  1348989 (-116625)
   con sombras1024              (    1):  16.70 ms ( +0.40)  llamadas  1586 (+0)  tri  1465614 (+0)
   sin parked                   (  289):  16.00 ms ( -0.30)  llamadas  1555 (-31)  tri  1380284 (-85330)
   sin coches                   (    4):  16.20 ms ( -0.10)  llamadas  1586 (+0)  tri  1465614 (+0)
   con resolucion1              (    1):  16.40 ms ( +0.10)  llamadas  1586 (+0)  tri  1465614 (+0)
   sin terreno                  (    1):  16.30 ms ( -0.00)  llamadas  1585 (-1)  tri  1062360 (-403254)
   sin instanciadas             (    3):  16.30 ms ( -0.00)  llamadas  1585 (-1)  tri  1465534 (-80)
   con terreno_simple           (    1):  16.30 ms ( -0.00)  llamadas  1586 (+0)  tri  1465614 (+0)
== La Trinidad a pie: 16.4 ms (mandar el trabajo 16.6 ms; a 480x270 16.9 ms)  llamadas 1652  tri 1432687
   sin sueltas                  ( 1654):  12.10 ms ( -4.30)  llamadas  1249 (-403)  tri  1225444 (-207243)
   con sin_niebla_lejos         (    1):  13.00 ms ( -3.40)  llamadas  1016 (-636)  tri  1320084 (-112603)
   sin inst                     (  855):  13.70 ms ( -2.70)  llamadas  1271 (-381)  tri  1212481 (-220206)
   sin ciudad                   (  945):  13.80 ms ( -2.60)  llamadas  1202 (-450)  tri  1198021 (-234666)
   sin fusion                   (  537):  14.20 ms ( -2.20)  llamadas  1330 (-322)  tri  1346283 (-86404)
   sin sombras                  (    1):  14.20 ms ( -2.20)  llamadas  1492 (-160)  tri  1213487 (-219200)
   con sombras1024              (    1):  17.10 ms ( +0.70)  llamadas  1652 (+0)  tri  1432687 (+0)
   sin parked                   (  289):  16.00 ms ( -0.40)  llamadas  1600 (-52)  tri  1175303 (-257384)
   sin terreno                  (    1):  16.50 ms ( +0.10)  llamadas  1651 (-1)  tri  1029433 (-403254)
   sin instanciadas             (    3):  16.50 ms ( +0.10)  llamadas  1652 (+0)  tri  1432687 (+0)
   sin coches                   (    4):  16.50 ms ( +0.10)  llamadas  1642 (-10)  tri  1430573 (-2114)
   con resolucion1              (    1):  16.50 ms ( +0.10)  llamadas  1652 (+0)  tri  1432687 (+0)
   con terreno_una_cara         (    1):  16.50 ms ( +0.10)  llamadas  1652 (+0)  tri  1432687 (+0)
   sin gente                    (    3):  16.40 ms ( -0.00)  llamadas  1637 (-15)  tri  1342429 (-90258)
   sin fondo                    (    6):  16.40 ms ( -0.00)  llamadas  1649 (-3)  tri  1409237 (-23450)
   con terreno_simple           (    1):  16.40 ms ( -0.00)  llamadas  1652 (+0)  tri  1432687 (+0)
== vista alta: 15.7 ms (mandar el trabajo 15.5 ms; a 480x270 15.7 ms)  llamadas 1470  tri 1767250
   con sin_niebla_lejos         (    1):  12.00 ms ( -3.70)  llamadas   972 (-498)  tri  1376745 (-390505)
   sin sueltas                  ( 1643):  12.40 ms ( -3.30)  llamadas  1209 (-261)  tri  1581393 (-185857)
   sin inst                     (  899):  12.60 ms ( -3.10)  llamadas  1096 (-374)  tri  1463566 (-303684)
   sin parked                   (  279):  12.70 ms ( -3.00)  llamadas  1280 (-190)  tri  1196962 (-570288)
   sin sombras                  (    1):  13.10 ms ( -2.60)  llamadas  1307 (-163)  tri  1529515 (-237735)
   sin fusion                   (  536):  13.20 ms ( -2.50)  llamadas  1205 (-265)  tri  1711370 (-55880)
   sin ciudad                   (  945):  13.50 ms ( -2.20)  llamadas  1103 (-367)  tri  1542509 (-224741)
   sin gente                    (    2):  15.20 ms ( -0.50)  llamadas  1460 (-10)  tri  1708287 (-58963)
   con terreno_simple           (    1):  16.00 ms ( +0.30)  llamadas  1470 (+0)  tri  1767250 (+0)
   sin coches                   (    3):  15.40 ms ( -0.30)  llamadas  1460 (-10)  tri  1765136 (-2114)
   con terreno_una_cara         (    1):  15.40 ms ( -0.30)  llamadas  1470 (+0)  tri  1767250 (+0)
   sin instanciadas             (    3):  15.50 ms ( -0.20)  llamadas  1469 (-1)  tri  1767170 (-80)
   con resolucion1              (    1):  15.50 ms ( -0.20)  llamadas  1470 (+0)  tri  1767250 (+0)
   sin terreno                  (    1):  15.60 ms ( -0.10)  llamadas  1469 (-1)  tri  1363996 (-403254)
   con sombras1024              (    1):  15.60 ms ( -0.10)  llamadas  1470 (+0)  tri  1767250 (+0)
   sin fondo                    (    6):  15.70 ms ( -0.00)  llamadas  1467 (-3)  tri  1743800 (-23450)
== autopista: 16 ms (mandar el trabajo 16.3 ms; a 480x270 16.2 ms)  llamadas 1516  tri 1967461
   con sin_niebla_lejos         (    1):   7.10 ms ( -8.90)  llamadas   320 (-1196)  tri   748149 (-1219312)
   sin sueltas                  ( 1645):   9.20 ms ( -6.80)  llamadas   854 (-662)  tri  1713719 (-253742)
   sin parked                   (  279):  14.10 ms ( -1.90)  llamadas  1237 (-279)  tri   929063 (-1038398)
   sin ciudad                   (  520):  14.40 ms ( -1.60)  llamadas  1219 (-297)  tri  1786570 (-180891)
   sin sombras                  (    1):  14.50 ms ( -1.50)  llamadas  1462 (-54)  tri  1862812 (-104649)
   sin inst                     (  388):  14.90 ms ( -1.10)  llamadas  1325 (-191)  tri  1900865 (-66596)
   sin gente                    (    2):  16.40 ms ( +0.40)  llamadas  1506 (-10)  tri  1908969 (-58492)
   sin terreno                  (    1):  15.80 ms ( -0.20)  llamadas  1515 (-1)  tri  1564207 (-403254)
   sin fusion                   (   39):  15.80 ms ( -0.20)  llamadas  1495 (-21)  tri  1966533 (-928)
   con terreno_una_cara         (    1):  16.20 ms ( +0.20)  llamadas  1516 (+0)  tri  1967461 (+0)
   sin instanciadas             (    3):  16.10 ms ( +0.10)  llamadas  1515 (-1)  tri  1967381 (-80)
   sin coches                   (    3):  15.90 ms ( -0.10)  llamadas  1516 (+0)  tri  1967461 (+0)
   sin fondo                    (    6):  15.90 ms ( -0.10)  llamadas  1513 (-3)  tri  1944011 (-23450)
   con resolucion1              (    1):  15.90 ms ( -0.10)  llamadas  1516 (+0)  tri  1967461 (+0)
   con terreno_simple           (    1):  15.90 ms ( -0.10)  llamadas  1516 (+0)  tri  1967461 (+0)
   con sombras1024              (    1):  16.00 ms ( +0.00)  llamadas  1516 (+0)  tri  1967461 (+0)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
