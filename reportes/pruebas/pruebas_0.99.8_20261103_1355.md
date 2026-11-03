# Pruebas 0.99.8 — 2026-11-03 13:55 — 1/1 OK

Listas: v1000f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 72 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 58 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   sin gente                    (    4):  11.40 ms ( -0.40)  llamadas  1337 (-20)  tri  1250469 (-117392)
   con terreno_simple           (    1):  12.20 ms ( +0.40)  llamadas  1357 (+0)  tri  1367861 (+0)
   sin terreno                  (    1):  11.50 ms ( -0.30)  llamadas  1356 (-1)  tri   964607 (-403254)
   sin parked                   (  286):  11.60 ms ( -0.20)  llamadas  1336 (-21)  tri  1310953 (-56908)
   con resolucion1              (    1):  11.60 ms ( -0.20)  llamadas  1357 (+0)  tri  1367861 (+0)
   con terreno_una_cara         (    1):  11.90 ms ( +0.10)  llamadas  1357 (+0)  tri  1367861 (+0)
   sin coches                   (    5):  11.80 ms ( -0.00)  llamadas  1357 (+0)  tri  1367861 (+0)
   con sombras1024              (    1):  11.80 ms ( -0.00)  llamadas  1357 (+0)  tri  1367861 (+0)
== La Trinidad a pie: 12.4 ms (mandar el trabajo 12.2 ms; a 480x270 12.3 ms)  llamadas 1499  tri 1332685
   con sin_niebla_lejos         (    1):   9.20 ms ( -3.20)  llamadas   860 (-639)  tri  1230122 (-102563)
   sin sueltas                  ( 1594):  10.20 ms ( -2.20)  llamadas  1103 (-396)  tri  1125324 (-207361)
   sin sombras                  (    1):  10.50 ms ( -1.90)  llamadas  1348 (-151)  tri  1126733 (-205952)
   sin inst                     (  731):  10.60 ms ( -1.80)  llamadas  1166 (-333)  tri  1145615 (-187070)
   sin ciudad                   (  905):  10.90 ms ( -1.50)  llamadas  1059 (-440)  tri  1117355 (-215330)
   sin fusion                   (  435):  11.30 ms ( -1.10)  llamadas  1260 (-239)  tri  1272287 (-60398)
   sin parked                   (  286):  12.00 ms ( -0.40)  llamadas  1453 (-46)  tri  1096945 (-235740)
   con terreno_una_cara         (    1):  12.10 ms ( -0.30)  llamadas  1499 (+0)  tri  1332685 (+0)
   con sombras1024              (    1):  12.70 ms ( +0.30)  llamadas  1499 (+0)  tri  1332685 (+0)
   sin coches                   (    5):  12.20 ms ( -0.20)  llamadas  1492 (-7)  tri  1330597 (-2088)
   con terreno_simple           (    1):  12.20 ms ( -0.20)  llamadas  1499 (+0)  tri  1332685 (+0)
   sin gente                    (    3):  12.30 ms ( -0.10)  llamadas  1484 (-15)  tri  1242049 (-90636)
   con resolucion1              (    1):  12.30 ms ( -0.10)  llamadas  1499 (+0)  tri  1332685 (+0)
   sin terreno                  (    1):  12.40 ms ( -0.00)  llamadas  1498 (-1)  tri   929431 (-403254)
   sin instanciadas             (    3):  12.40 ms ( -0.00)  llamadas  1499 (+0)  tri  1332685 (+0)
   sin fondo                    (    6):  12.40 ms ( -0.00)  llamadas  1496 (-3)  tri  1309235 (-23450)
== vista alta: 12.3 ms (mandar el trabajo 11.6 ms; a 480x270 11.5 ms)  llamadas 1288  tri 1713633
   sin sueltas                  ( 1589):   9.00 ms ( -3.30)  llamadas  1038 (-250)  tri  1472695 (-240938)
   con sin_niebla_lejos         (    1):   9.20 ms ( -3.10)  llamadas   805 (-483)  tri  1341968 (-371665)
   sin ciudad                   (  905):   9.80 ms ( -2.50)  llamadas   947 (-341)  tri  1523072 (-190561)
   sin sombras                  (    1):   9.80 ms ( -2.50)  llamadas  1133 (-155)  tri  1463789 (-249844)
   sin inst                     (  740):  10.40 ms ( -1.90)  llamadas   966 (-322)  tri  1464187 (-249446)
   sin parked                   (  269):  10.40 ms ( -1.90)  llamadas  1098 (-190)  tri  1152183 (-561450)
   sin fusion                   (  415):  10.50 ms ( -1.80)  llamadas  1116 (-172)  tri  1669195 (-44438)
   sin gente                    (    4):  10.80 ms ( -1.50)  llamadas  1268 (-20)  tri  1598393 (-115240)
   con terreno_simple           (    1):  11.10 ms ( -1.20)  llamadas  1288 (+0)  tri  1713633 (+0)
   con resolucion1              (    1):  11.20 ms ( -1.10)  llamadas  1288 (+0)  tri  1713633 (+0)
   sin terreno                  (    1):  11.30 ms ( -1.00)  llamadas  1287 (-1)  tri  1310379 (-403254)
   sin instanciadas             (    3):  11.40 ms ( -0.90)  llamadas  1287 (-1)  tri  1713553 (-80)
   sin coches                   (    4):  11.40 ms ( -0.90)  llamadas  1281 (-7)  tri  1711545 (-2088)
   con sombras1024              (    1):  11.40 ms ( -0.90)  llamadas  1288 (+0)  tri  1713633 (+0)
   con terreno_una_cara         (    1):  12.80 ms ( +0.50)  llamadas  1288 (+0)  tri  1713633 (+0)
   sin fondo                    (    6):  11.90 ms ( -0.40)  llamadas  1285 (-3)  tri  1690183 (-23450)
== autopista: 12.1 ms (mandar el trabajo 12.3 ms; a 480x270 12.2 ms)  llamadas 1460  tri 1947996
   con sin_niebla_lejos         (    1):   6.40 ms ( -5.70)  llamadas   280 (-1180)  tri   760718 (-1187278)
   sin sueltas                  ( 1588):   8.20 ms ( -3.90)  llamadas   800 (-660)  tri  1665833 (-282163)
   sin sombras                  (    1):  11.10 ms ( -1.00)  llamadas  1412 (-48)  tri  1832872 (-115124)
   sin parked                   (  269):  11.20 ms ( -0.90)  llamadas  1191 (-269)  tri   941160 (-1006836)
   con sombras1024              (    1):  12.90 ms ( +0.80)  llamadas  1460 (+0)  tri  1947996 (+0)
   sin ciudad                   (  507):  11.40 ms ( -0.70)  llamadas  1171 (-289)  tri  1776339 (-171657)
   sin inst                     (  339):  11.50 ms ( -0.60)  llamadas  1298 (-162)  tri  1888370 (-59626)
   con resolucion1              (    1):  12.50 ms ( +0.40)  llamadas  1460 (+0)  tri  1947996 (+0)
   sin terreno                  (    1):  12.40 ms ( +0.30)  llamadas  1459 (-1)  tri  1544742 (-403254)
   sin coches                   (    4):  12.40 ms ( +0.30)  llamadas  1460 (+0)  tri  1947996 (+0)
   sin gente                    (    3):  12.30 ms ( +0.20)  llamadas  1444 (-16)  tri  1860489 (-87507)
   con terreno_una_cara         (    1):  12.30 ms ( +0.20)  llamadas  1460 (+0)  tri  1947996 (+0)
   sin fondo                    (    6):  12.20 ms ( +0.10)  llamadas  1457 (-3)  tri  1924546 (-23450)
   con terreno_simple           (    1):  12.20 ms ( +0.10)  llamadas  1460 (+0)  tri  1947996 (+0)
   sin fusion                   (   34):  12.10 ms ( -0.00)  llamadas  1446 (-14)  tri  1947188 (-808)
   sin instanciadas             (    3):  12.10 ms ( -0.00)  llamadas  1459 (-1)  tri  1947916 (-80)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
