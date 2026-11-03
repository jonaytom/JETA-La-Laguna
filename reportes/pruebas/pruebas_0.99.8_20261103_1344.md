# Pruebas 0.99.8 — 2026-11-03 13:44 — 1/1 OK

Listas: v1000f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 90 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 74 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   con sombras1024              (    1):  15.80 ms ( -0.60)  llamadas  1662 (+0)  tri  2590477 (+0)
   con resolucion1              (    1):  15.80 ms ( -0.60)  llamadas  1662 (+0)  tri  2590477 (+0)
   sin terreno                  (    1):  15.90 ms ( -0.50)  llamadas  1661 (-1)  tri  2187223 (-403254)
   sin instanciadas             (    3):  15.90 ms ( -0.50)  llamadas  1661 (-1)  tri  2590397 (-80)
   sin coches                   (    3):  15.90 ms ( -0.50)  llamadas  1662 (+0)  tri  2590477 (+0)
   sin fondo                    (    6):  16.00 ms ( -0.40)  llamadas  1659 (-3)  tri  2567027 (-23450)
   con terreno_una_cara         (    1):  16.00 ms ( -0.40)  llamadas  1662 (+0)  tri  2590477 (+0)
   con terreno_simple           (    1):  16.40 ms ( -0.00)  llamadas  1662 (+0)  tri  2590477 (+0)
== La Trinidad a pie: 16.3 ms (mandar el trabajo 16.6 ms; a 480x270 19.2 ms)  llamadas 1724  tri 2847284
   con sin_niebla_lejos         (    1):  12.00 ms ( -4.30)  llamadas  1093 (-631)  tri  2741847 (-105437)
   sin sueltas                  ( 1675):  12.80 ms ( -3.50)  llamadas  1330 (-394)  tri  2603074 (-244210)
   sin inst                     (  861):  13.80 ms ( -2.50)  llamadas  1351 (-373)  tri  2625888 (-221396)
   sin terreno                  (    1):  18.60 ms ( +2.30)  llamadas  1723 (-1)  tri  2444030 (-403254)
   sin fusion                   (  507):  14.50 ms ( -1.80)  llamadas  1432 (-292)  tri  2775188 (-72096)
   sin sombras                  (    1):  14.60 ms ( -1.70)  llamadas  1515 (-209)  tri  2095773 (-751511)
   sin parked                   (  245):  17.80 ms ( +1.50)  llamadas  1554 (-170)  tri  1199154 (-1648130)
   sin instanciadas             (    3):  16.90 ms ( +0.60)  llamadas  1724 (+0)  tri  2847284 (+0)
   sin gente                    (    4):  15.80 ms ( -0.50)  llamadas  1702 (-22)  tri  2719063 (-128221)
   con terreno_una_cara         (    1):  16.70 ms ( +0.40)  llamadas  1724 (+0)  tri  2847284 (+0)
   sin ciudad                   (  945):  16.10 ms ( -0.20)  llamadas  1274 (-450)  tri  2612618 (-234666)
   con sombras1024              (    1):  16.50 ms ( +0.20)  llamadas  1724 (+0)  tri  2847284 (+0)
   con resolucion1              (    1):  16.20 ms ( -0.10)  llamadas  1724 (+0)  tri  2847284 (+0)
   sin coches                   (    3):  16.40 ms ( +0.10)  llamadas  1714 (-10)  tri  2845170 (-2114)
   sin fondo                    (    6):  16.40 ms ( +0.10)  llamadas  1721 (-3)  tri  2823834 (-23450)
   con terreno_simple           (    1):  16.40 ms ( +0.10)  llamadas  1724 (+0)  tri  2847284 (+0)
== vista alta: 15.3 ms (mandar el trabajo 15 ms; a 480x270 15.4 ms)  llamadas 1541  tri 3352908
   con sin_niebla_lejos         (    1):  12.00 ms ( -3.30)  llamadas  1091 (-450)  tri  3061815 (-291093)
   sin sueltas                  ( 1662):  12.10 ms ( -3.20)  llamadas  1287 (-254)  tri  3136329 (-216579)
   sin inst                     (  919):  12.20 ms ( -3.10)  llamadas  1139 (-402)  tri  3028096 (-324812)
   sin ciudad                   (  945):  12.80 ms ( -2.50)  llamadas  1174 (-367)  tri  3128167 (-224741)
   sin fusion                   (  506):  13.00 ms ( -2.30)  llamadas  1281 (-260)  tri  3301610 (-51298)
   sin sombras                  (    1):  13.00 ms ( -2.30)  llamadas  1313 (-228)  tri  2313267 (-1039641)
   sin parked                   (  258):  13.70 ms ( -1.60)  llamadas  1296 (-245)  tri  1244230 (-2108678)
   con resolucion1              (    1):  16.10 ms ( +0.80)  llamadas  1541 (+0)  tri  3352908 (+0)
   sin instanciadas             (    3):  16.00 ms ( +0.70)  llamadas  1540 (-1)  tri  3352828 (-80)
   sin gente                    (    3):  14.70 ms ( -0.60)  llamadas  1526 (-15)  tri  3262411 (-90497)
   sin coches                   (    3):  15.80 ms ( +0.50)  llamadas  1531 (-10)  tri  3350794 (-2114)
   con terreno_simple           (    1):  15.60 ms ( +0.30)  llamadas  1541 (+0)  tri  3352908 (+0)
   con terreno_una_cara         (    1):  15.50 ms ( +0.20)  llamadas  1541 (+0)  tri  3352908 (+0)
   sin terreno                  (    1):  15.20 ms ( -0.10)  llamadas  1540 (-1)  tri  2949654 (-403254)
   sin fondo                    (    6):  15.20 ms ( -0.10)  llamadas  1538 (-3)  tri  3329458 (-23450)
   con sombras1024              (    1):  15.30 ms ( -0.00)  llamadas  1541 (+0)  tri  3352908 (+0)
== autopista: 15.7 ms (mandar el trabajo 15.6 ms; a 480x270 15.6 ms)  llamadas 1467  tri 2971742
   con sin_niebla_lejos         (    1):   6.80 ms ( -8.90)  llamadas   362 (-1105)  tri  1143296 (-1828446)
   sin sueltas                  ( 1664):   8.60 ms ( -7.10)  llamadas   821 (-646)  tri  2659329 (-312413)
   sin ciudad                   (  520):  14.00 ms ( -1.70)  llamadas  1170 (-297)  tri  2790851 (-180891)
   sin inst                     (  383):  14.00 ms ( -1.70)  llamadas  1288 (-179)  tri  2907378 (-64364)
   sin parked                   (  258):  14.20 ms ( -1.50)  llamadas  1209 (-258)  tri   985502 (-1986240)
   sin sombras                  (    1):  14.60 ms ( -1.10)  llamadas  1418 (-49)  tri  2842915 (-128827)
   sin terreno                  (    1):  15.20 ms ( -0.50)  llamadas  1466 (-1)  tri  2568488 (-403254)
   sin fusion                   (   39):  15.30 ms ( -0.40)  llamadas  1446 (-21)  tri  2970814 (-928)
   con resolucion1              (    1):  15.30 ms ( -0.40)  llamadas  1467 (+0)  tri  2971742 (+0)
   con terreno_simple           (    1):  15.30 ms ( -0.40)  llamadas  1467 (+0)  tri  2971742 (+0)
   con sombras1024              (    1):  15.50 ms ( -0.20)  llamadas  1467 (+0)  tri  2971742 (+0)
   sin instanciadas             (    3):  15.60 ms ( -0.10)  llamadas  1466 (-1)  tri  2971662 (-80)
   sin gente                    (    4):  15.60 ms ( -0.10)  llamadas  1446 (-21)  tri  2852747 (-118995)
   sin coches                   (    3):  15.70 ms ( -0.00)  llamadas  1467 (+0)  tri  2971742 (+0)
   sin fondo                    (    6):  15.70 ms ( -0.00)  llamadas  1464 (-3)  tri  2948292 (-23450)
   con terreno_una_cara         (    1):  15.70 ms ( -0.00)  llamadas  1467 (+0)  tri  2971742 (+0)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
