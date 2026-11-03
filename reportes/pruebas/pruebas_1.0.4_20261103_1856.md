# Pruebas 1.0.4 — 2026-11-03 18:56 — 1/1 OK

Listas: v1004gpu. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 91 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 75 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   sin fondo                    (    6):  16.00 ms ( -0.40)  llamadas  1431 (-3)  tri  1335597 (-23450)
   con terreno_simple           (    1):  16.00 ms ( -0.40)  llamadas  1434 (+0)  tri  1359047 (+0)
   sin fusion                   (  291):  16.70 ms ( +0.30)  llamadas  1272 (-162)  tri  1332381 (-26666)
   sin gente                    (    3):  16.10 ms ( -0.30)  llamadas  1417 (-17)  tri  1269251 (-89796)
   con resolucion1              (    1):  16.60 ms ( +0.20)  llamadas  1434 (+0)  tri  1359047 (+0)
   con terreno_una_cara         (    1):  16.50 ms ( +0.10)  llamadas  1434 (+0)  tri  1359047 (+0)
   sin instanciadas             (    3):  16.30 ms ( -0.10)  llamadas  1433 (-1)  tri  1358967 (-80)
   con sombras1024              (    1):  16.40 ms ( -0.00)  llamadas  1434 (+0)  tri  1359047 (+0)
== La Trinidad a pie: 17.7 ms (mandar el trabajo 16.5 ms; a 480x270 17.6 ms)  llamadas 1609  tri 1441004
   sin sueltas                  ( 2053):  11.30 ms ( -6.40)  llamadas  1110 (-499)  tri  1154980 (-286024)
   con sin_niebla_lejos         (    1):  11.80 ms ( -5.90)  llamadas   885 (-724)  tri  1286989 (-154015)
   sin ciudad                   (  922):  14.50 ms ( -3.20)  llamadas  1159 (-450)  tri  1194248 (-246756)
   sin inst                     (  736):  14.60 ms ( -3.10)  llamadas  1273 (-336)  tri  1245752 (-195252)
   sin sombras                  (    1):  14.80 ms ( -2.90)  llamadas  1454 (-155)  tri  1210701 (-230303)
   sin fusion                   (  438):  15.30 ms ( -2.40)  llamadas  1367 (-242)  tri  1377614 (-63390)
   sin gente                    (    4):  16.90 ms ( -0.80)  llamadas  1589 (-20)  tri  1321473 (-119531)
   con terreno_simple           (    1):  16.90 ms ( -0.80)  llamadas  1609 (+0)  tri  1441004 (+0)
   sin parked                   (  275):  17.10 ms ( -0.60)  llamadas  1572 (-37)  tri  1218208 (-222796)
   sin coches                   (    6):  17.10 ms ( -0.60)  llamadas  1602 (-7)  tri  1438916 (-2088)
   con resolucion1              (    1):  17.10 ms ( -0.60)  llamadas  1609 (+0)  tri  1441004 (+0)
   con sombras1024              (    1):  17.30 ms ( -0.40)  llamadas  1609 (+0)  tri  1441004 (+0)
   sin instanciadas             (    3):  17.40 ms ( -0.30)  llamadas  1609 (+0)  tri  1441004 (+0)
   con terreno_una_cara         (    1):  17.40 ms ( -0.30)  llamadas  1609 (+0)  tri  1441004 (+0)
   sin terreno                  (    1):  17.50 ms ( -0.20)  llamadas  1608 (-1)  tri  1037750 (-403254)
   sin fondo                    (    6):  17.80 ms ( +0.10)  llamadas  1606 (-3)  tri  1417554 (-23450)
== vista alta: 15.6 ms (mandar el trabajo 15.1 ms; a 480x270 15.3 ms)  llamadas 1297  tri 1603972
   sin sombras                  (    1):  10.30 ms ( -5.30)  llamadas  1144 (-153)  tri  1373753 (-230219)
   con sin_niebla_lejos         (    1):  10.30 ms ( -5.30)  llamadas   794 (-503)  tri  1256274 (-347698)
   sin sueltas                  ( 2047):  11.50 ms ( -4.10)  llamadas  1029 (-268)  tri  1409165 (-194807)
   con resolucion1              (    1):  11.90 ms ( -3.70)  llamadas  1297 (+0)  tri  1603972 (+0)
   con sombras1024              (    1):  12.20 ms ( -3.40)  llamadas  1297 (+0)  tri  1603972 (+0)
   sin inst                     (  741):  12.30 ms ( -3.30)  llamadas   979 (-318)  tri  1351318 (-252654)
   con terreno_simple           (    1):  12.90 ms ( -2.70)  llamadas  1297 (+0)  tri  1603972 (+0)
   con terreno_una_cara         (    1):  12.90 ms ( -2.70)  llamadas  1297 (+0)  tri  1603972 (+0)
   sin fondo                    (    6):  13.00 ms ( -2.60)  llamadas  1294 (-3)  tri  1580522 (-23450)
   sin ciudad                   (  922):  13.20 ms ( -2.40)  llamadas   947 (-350)  tri  1377323 (-226649)
   sin fusion                   (  425):  13.70 ms ( -1.90)  llamadas  1118 (-179)  tri  1561988 (-41984)
   sin parked                   (  266):  14.20 ms ( -1.40)  llamadas  1128 (-169)  tri  1142894 (-461078)
   sin gente                    (    2):  16.40 ms ( +0.80)  llamadas  1287 (-10)  tri  1548073 (-55899)
   sin coches                   (    5):  15.10 ms ( -0.50)  llamadas  1290 (-7)  tri  1601884 (-2088)
   sin instanciadas             (    3):  15.20 ms ( -0.40)  llamadas  1296 (-1)  tri  1603892 (-80)
   sin terreno                  (    1):  15.30 ms ( -0.30)  llamadas  1296 (-1)  tri  1200718 (-403254)
== autopista: 14.2 ms (mandar el trabajo 12.3 ms; a 480x270 18.8 ms)  llamadas 1559  tri 1961139
   con sin_niebla_lejos         (    1):   7.70 ms ( -6.50)  llamadas   285 (-1274)  tri   760887 (-1200252)
   sin sueltas                  ( 2047):   9.00 ms ( -5.20)  llamadas   794 (-765)  tri  1641801 (-319338)
   con terreno_simple           (    1):  18.00 ms ( +3.80)  llamadas  1559 (+0)  tri  1961139 (+0)
   sin instanciadas             (    3):  17.90 ms ( +3.70)  llamadas  1558 (-1)  tri  1961059 (-80)
   con resolucion1              (    1):  17.90 ms ( +3.70)  llamadas  1559 (+0)  tri  1961139 (+0)
   sin gente                    (    2):  17.70 ms ( +3.50)  llamadas  1549 (-10)  tri  1899205 (-61934)
   sin terreno                  (    1):  17.50 ms ( +3.30)  llamadas  1558 (-1)  tri  1557885 (-403254)
   sin fondo                    (    6):  17.50 ms ( +3.30)  llamadas  1556 (-3)  tri  1937689 (-23450)
   con terreno_una_cara         (    1):  17.50 ms ( +3.30)  llamadas  1559 (+0)  tri  1961139 (+0)
   con sombras1024              (    1):  17.10 ms ( +2.90)  llamadas  1559 (+0)  tri  1961139 (+0)
   sin fusion                   (   34):  16.90 ms ( +2.70)  llamadas  1545 (-14)  tri  1960331 (-808)
   sin sombras                  (    1):  15.50 ms ( +1.30)  llamadas  1507 (-52)  tri  1845183 (-115956)
   sin coches                   (    5):  14.90 ms ( +0.70)  llamadas  1559 (+0)  tri  1961139 (+0)
   sin inst                     (  325):  14.60 ms ( +0.40)  llamadas  1405 (-154)  tri  1901007 (-60132)
   sin parked                   (  266):  14.50 ms ( +0.30)  llamadas  1293 (-266)  tri  1008493 (-952646)
   sin ciudad                   (  562):  14.40 ms ( +0.20)  llamadas  1265 (-294)  tri  1759830 (-201309)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
