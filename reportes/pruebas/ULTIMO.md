# Pruebas 1.1.8 — 2026-11-04 16:46 — 1/1 OK

Listas: gpu_b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 108 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py --noprecarga` | **OK** | 90 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py --noprecarga — OK

```
   sin instanciadas             (    3):  19.40 ms ( +0.60)  llamadas  1485 (-1)  tri  1435191 (-80)
   con terreno_simple           (    1):  19.40 ms ( +0.60)  llamadas  1486 (+0)  tri  1435271 (+0)
   sin coches                   (    5):  19.30 ms ( +0.50)  llamadas  1486 (+0)  tri  1435271 (+0)
   sin fondo                    (    6):  19.20 ms ( +0.40)  llamadas  1483 (-3)  tri  1411821 (-23450)
   sin terreno                  (    1):  19.00 ms ( +0.20)  llamadas  1485 (-1)  tri  1032017 (-403254)
   sin gente                    (    4):  18.60 ms ( -0.20)  llamadas  1467 (-19)  tri  1318129 (-117142)
   con resolucion1              (    1):  19.00 ms ( +0.20)  llamadas  1486 (+0)  tri  1435271 (+0)
   sin parked                   (  305):  18.90 ms ( +0.10)  llamadas  1458 (-28)  tri  1352955 (-82316)
== La Trinidad a pie: 20 ms (mandar el trabajo 20.3 ms; a 480x270 20.1 ms)  llamadas 1627  tri 1424578
   con sin_niebla_lejos         (    1):  15.00 ms ( -5.00)  llamadas   906 (-721)  tri  1304327 (-120251)
   sin sueltas                  ( 2101):  15.50 ms ( -4.50)  llamadas  1167 (-460)  tri  1213925 (-210653)
   sin ciudad                   ( 1114):  16.30 ms ( -3.70)  llamadas  1109 (-518)  tri  1162871 (-261707)
   sin sombras                  (    1):  17.80 ms ( -2.20)  llamadas  1466 (-161)  tri  1177842 (-246736)
   sin inst                     (  714):  18.20 ms ( -1.80)  llamadas  1308 (-319)  tri  1223724 (-200854)
   sin coches                   (    5):  21.00 ms ( +1.00)  llamadas  1620 (-7)  tri  1422490 (-2088)
   sin parked                   (  305):  19.40 ms ( -0.60)  llamadas  1578 (-49)  tri  1165396 (-259182)
   sin instanciadas             (    3):  19.60 ms ( -0.40)  llamadas  1627 (+0)  tri  1424578 (+0)
   sin fusion                   (  379):  19.70 ms ( -0.30)  llamadas  1390 (-237)  tri  1359180 (-65398)
   sin gente                    (    3):  20.30 ms ( +0.30)  llamadas  1613 (-14)  tri  1341278 (-83300)
   con terreno_una_cara         (    1):  20.30 ms ( +0.30)  llamadas  1627 (+0)  tri  1424578 (+0)
   con terreno_simple           (    1):  20.20 ms ( +0.20)  llamadas  1627 (+0)  tri  1424578 (+0)
   sin terreno                  (    1):  20.10 ms ( +0.10)  llamadas  1626 (-1)  tri  1021324 (-403254)
   sin fondo                    (    6):  20.00 ms ( +0.00)  llamadas  1624 (-3)  tri  1401128 (-23450)
   con sombras1024              (    1):  20.00 ms ( +0.00)  llamadas  1627 (+0)  tri  1424578 (+0)
   con resolucion1              (    1):  20.00 ms ( +0.00)  llamadas  1627 (+0)  tri  1424578 (+0)
== vista alta: 17.9 ms (mandar el trabajo 18.5 ms; a 480x270 19.2 ms)  llamadas 1362  tri 1877125
   con sin_niebla_lejos         (    1):  14.90 ms ( -3.00)  llamadas   831 (-531)  tri  1489257 (-387868)
   sin sueltas                  ( 2094):  15.00 ms ( -2.90)  llamadas  1084 (-278)  tri  1635821 (-241304)
   sin ciudad                   ( 1104):  15.20 ms ( -2.70)  llamadas   966 (-396)  tri  1648526 (-228599)
   sin inst                     (  709):  15.70 ms ( -2.20)  llamadas  1048 (-314)  tri  1635841 (-241284)
   con terreno_una_cara         (    1):  19.50 ms ( +1.60)  llamadas  1362 (+0)  tri  1877125 (+0)
   sin sombras                  (    1):  16.30 ms ( -1.60)  llamadas  1184 (-178)  tri  1508452 (-368673)
   con resolucion1              (    1):  19.20 ms ( +1.30)  llamadas  1362 (+0)  tri  1877125 (+0)
   sin fusion                   (  376):  16.80 ms ( -1.10)  llamadas  1225 (-137)  tri  1834821 (-42304)
   sin parked                   (  309):  16.80 ms ( -1.10)  llamadas  1138 (-224)  tri  1180291 (-696834)
   con sombras1024              (    1):  18.60 ms ( +0.70)  llamadas  1362 (+0)  tri  1877125 (+0)
   sin terreno                  (    1):  18.40 ms ( +0.50)  llamadas  1361 (-1)  tri  1473871 (-403254)
   sin coches                   (    4):  18.30 ms ( +0.40)  llamadas  1355 (-7)  tri  1875037 (-2088)
   con terreno_simple           (    1):  18.30 ms ( +0.40)  llamadas  1362 (+0)  tri  1877125 (+0)
   sin instanciadas             (    3):  18.20 ms ( +0.30)  llamadas  1361 (-1)  tri  1877045 (-80)
   sin fondo                    (    6):  18.10 ms ( +0.20)  llamadas  1359 (-3)  tri  1853675 (-23450)
   sin gente                    (    4):  17.90 ms ( -0.00)  llamadas  1342 (-20)  tri  1758821 (-118304)
== autopista: 20.1 ms (mandar el trabajo 20.2 ms; a 480x270 20.6 ms)  llamadas 1648  tri 2092819
   con sin_niebla_lejos         (    1):  10.20 ms ( -9.90)  llamadas   304 (-1344)  tri   764568 (-1328251)
   sin sueltas                  ( 2092):  13.30 ms ( -6.80)  llamadas   907 (-741)  tri  1795449 (-297370)
   sin ciudad                   (  626):  18.30 ms ( -1.80)  llamadas  1296 (-352)  tri  1909096 (-183723)
   sin parked                   (  309):  18.50 ms ( -1.60)  llamadas  1339 (-309)  tri   968129 (-1124690)
   sin instanciadas             (    3):  21.70 ms ( +1.60)  llamadas  1647 (-1)  tri  2092739 (-80)
   sin sombras                  (    1):  19.10 ms ( -1.00)  llamadas  1592 (-56)  tri  1971249 (-121570)
   sin inst                     (  331):  19.30 ms ( -0.80)  llamadas  1482 (-166)  tri  2033497 (-59322)
   sin gente                    (    3):  20.90 ms ( +0.80)  llamadas  1633 (-15)  tri  2005671 (-87148)
   con sombras1024              (    1):  20.80 ms ( +0.70)  llamadas  1648 (+0)  tri  2092819 (+0)
   sin terreno                  (    1):  20.70 ms ( +0.60)  llamadas  1647 (-1)  tri  1689565 (-403254)
   sin coches                   (    4):  20.70 ms ( +0.60)  llamadas  1648 (+0)  tri  2092819 (+0)
   sin fondo                    (    6):  20.70 ms ( +0.60)  llamadas  1645 (-3)  tri  2069369 (-23450)
   con terreno_simple           (    1):  20.40 ms ( +0.30)  llamadas  1648 (+0)  tri  2092819 (+0)
   con terreno_una_cara         (    1):  20.40 ms ( +0.30)  llamadas  1648 (+0)  tri  2092819 (+0)
   sin fusion                   (   34):  19.90 ms ( -0.20)  llamadas  1634 (-14)  tri  2092011 (-808)
   con resolucion1              (    1):  19.90 ms ( -0.20)  llamadas  1648 (+0)  tri  2092819 (+0)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
