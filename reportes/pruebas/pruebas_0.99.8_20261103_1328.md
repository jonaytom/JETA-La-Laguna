# Pruebas 0.99.8 — 2026-11-03 13:28 — 1/1 OK

Listas: v1000f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 103 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 87 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   con terreno_una_cara         (    1):  20.60 ms ( +0.40)  llamadas  1831 (+0)  tri  2780815 (+0)
   sin terreno                  (    1):  20.40 ms ( +0.20)  llamadas  1830 (-1)  tri  2377561 (-403254)
   sin gente                    (    3):  20.30 ms ( +0.10)  llamadas  1816 (-15)  tri  2689469 (-91346)
   sin instanciadas             (    3):  20.10 ms ( -0.10)  llamadas  1830 (-1)  tri  2780735 (-80)
   sin fondo                    (    6):  20.10 ms ( -0.10)  llamadas  1828 (-3)  tri  2757365 (-23450)
   con sombras1024              (    1):  20.10 ms ( -0.10)  llamadas  1831 (+0)  tri  2780815 (+0)
   con resolucion1              (    1):  20.10 ms ( -0.10)  llamadas  1831 (+0)  tri  2780815 (+0)
   sin coches                   (    3):  20.20 ms ( -0.00)  llamadas  1831 (+0)  tri  2780815 (+0)
== La Trinidad a pie: 20 ms (mandar el trabajo 19.9 ms; a 480x270 19.8 ms)  llamadas 1820  tri 2960082
   sin sueltas                  ( 1842):  12.60 ms ( -7.40)  llamadas  1321 (-499)  tri  2751165 (-208917)
   con sin_niebla_lejos         (    1):  13.40 ms ( -6.60)  llamadas  1110 (-710)  tri  2864413 (-95669)
   sin sombras                  (    1):  16.50 ms ( -3.50)  llamadas  1604 (-216)  tri  2123740 (-836342)
   sin inst                     (  852):  16.90 ms ( -3.10)  llamadas  1453 (-367)  tri  2772302 (-187780)
   sin ciudad                   (  941):  17.00 ms ( -3.00)  llamadas  1373 (-447)  tri  2727745 (-232337)
   sin fusion                   (  496):  17.80 ms ( -2.20)  llamadas  1535 (-285)  tri  2888294 (-71788)
   sin parked                   (  231):  18.60 ms ( -1.40)  llamadas  1642 (-178)  tri  1127606 (-1832476)
   sin gente                    (    3):  19.20 ms ( -0.80)  llamadas  1805 (-15)  tri  2867602 (-92480)
   sin fondo                    (    6):  19.30 ms ( -0.70)  llamadas  1817 (-3)  tri  2936632 (-23450)
   con terreno_simple           (    1):  19.60 ms ( -0.40)  llamadas  1820 (+0)  tri  2960082 (+0)
   sin terreno                  (    1):  19.70 ms ( -0.30)  llamadas  1819 (-1)  tri  2556828 (-403254)
   sin instanciadas             (    3):  20.30 ms ( +0.30)  llamadas  1820 (+0)  tri  2960082 (+0)
   con sombras1024              (    1):  20.30 ms ( +0.30)  llamadas  1820 (+0)  tri  2960082 (+0)
   con resolucion1              (    1):  19.70 ms ( -0.30)  llamadas  1820 (+0)  tri  2960082 (+0)
   sin coches                   (    3):  19.80 ms ( -0.20)  llamadas  1810 (-10)  tri  2957968 (-2114)
   con terreno_una_cara         (    1):  19.80 ms ( -0.20)  llamadas  1820 (+0)  tri  2960082 (+0)
== vista alta: 17.3 ms (mandar el trabajo 17.5 ms; a 480x270 18.4 ms)  llamadas 1547  tri 3385404
   sin sueltas                  ( 1834):  13.40 ms ( -3.90)  llamadas  1257 (-290)  tri  3174878 (-210526)
   sin inst                     (  889):  13.80 ms ( -3.50)  llamadas  1160 (-387)  tri  3063072 (-322332)
   con sin_niebla_lejos         (    1):  13.80 ms ( -3.50)  llamadas  1095 (-452)  tri  3094613 (-290791)
   sin sombras                  (    1):  14.50 ms ( -2.80)  llamadas  1327 (-220)  tri  2305902 (-1079502)
   sin fusion                   (  493):  15.00 ms ( -2.30)  llamadas  1288 (-259)  tri  3337050 (-48354)
   sin ciudad                   (  944):  15.10 ms ( -2.20)  llamadas  1185 (-362)  tri  3164186 (-221218)
   sin parked                   (  248):  15.60 ms ( -1.70)  llamadas  1311 (-236)  tri  1229230 (-2156174)
   sin terreno                  (    1):  18.10 ms ( +0.80)  llamadas  1546 (-1)  tri  2982150 (-403254)
   con resolucion1              (    1):  17.00 ms ( -0.30)  llamadas  1547 (+0)  tri  3385404 (+0)
   sin fondo                    (    6):  17.10 ms ( -0.20)  llamadas  1544 (-3)  tri  3361954 (-23450)
   sin coches                   (    3):  17.20 ms ( -0.10)  llamadas  1537 (-10)  tri  3383290 (-2114)
   con terreno_simple           (    1):  17.20 ms ( -0.10)  llamadas  1547 (+0)  tri  3385404 (+0)
   con terreno_una_cara         (    1):  17.20 ms ( -0.10)  llamadas  1547 (+0)  tri  3385404 (+0)
   con sombras1024              (    1):  17.40 ms ( +0.10)  llamadas  1547 (+0)  tri  3385404 (+0)
   sin instanciadas             (    3):  17.30 ms ( -0.00)  llamadas  1546 (-1)  tri  3385324 (-80)
   sin gente                    (    3):  17.30 ms ( -0.00)  llamadas  1533 (-14)  tri  3302104 (-83300)
== autopista: 19.8 ms (mandar el trabajo 19.6 ms; a 480x270 20.3 ms)  llamadas 1641  tri 2984423
   sin sueltas                  ( 1833):   7.40 ms (-12.40)  llamadas   801 (-840)  tri  2703565 (-280858)
   con sin_niebla_lejos         (    1):   8.10 ms (-11.70)  llamadas   353 (-1288)  tri  1075261 (-1909162)
   sin sombras                  (    1):  17.80 ms ( -2.00)  llamadas  1594 (-47)  tri  2870552 (-113871)
   sin ciudad                   (  520):  18.10 ms ( -1.70)  llamadas  1344 (-297)  tri  2804736 (-179687)
   sin parked                   (  248):  18.40 ms ( -1.40)  llamadas  1393 (-248)  tri   951781 (-2032642)
   sin inst                     (  365):  18.80 ms ( -1.00)  llamadas  1462 (-179)  tri  2920985 (-63438)
   sin fondo                    (    6):  20.10 ms ( +0.30)  llamadas  1638 (-3)  tri  2960973 (-23450)
   con resolucion1              (    1):  20.10 ms ( +0.30)  llamadas  1641 (+0)  tri  2984423 (+0)
   sin fusion                   (   31):  20.00 ms ( +0.20)  llamadas  1630 (-11)  tri  2983531 (-892)
   sin gente                    (    3):  19.60 ms ( -0.20)  llamadas  1627 (-14)  tri  2899047 (-85376)
   sin terreno                  (    1):  19.90 ms ( +0.10)  llamadas  1640 (-1)  tri  2581169 (-403254)
   sin instanciadas             (    3):  19.90 ms ( +0.10)  llamadas  1640 (-1)  tri  2984343 (-80)
   con sombras1024              (    1):  19.90 ms ( +0.10)  llamadas  1641 (+0)  tri  2984423 (+0)
   con terreno_simple           (    1):  19.90 ms ( +0.10)  llamadas  1641 (+0)  tri  2984423 (+0)
   con terreno_una_cara         (    1):  19.90 ms ( +0.10)  llamadas  1641 (+0)  tri  2984423 (+0)
   sin coches                   (    3):  19.80 ms ( -0.00)  llamadas  1641 (+0)  tri  2984423 (+0)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
