# Pruebas 0.99.8 — 2026-11-03 13:20 — 1/1 OK

Listas: v1000f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 125 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 110 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   con terreno_una_cara         (    1):  19.90 ms ( -8.50)  llamadas  2255 (+0)  tri  5430285 (+0)
   sin coches                   (    4):  20.30 ms ( -8.10)  llamadas  2245 (-10)  tri  5428171 (-2114)
   sin parked                   (  235):  20.50 ms ( -7.90)  llamadas  2103 (-152)  tri  4119861 (-1310424)
   sin inst                     (  819):  25.70 ms ( -2.70)  llamadas  1888 (-367)  tri  5045383 (-384902)
   sin ciudad                   (  908):  25.90 ms ( -2.50)  llamadas  1851 (-404)  tri  5202765 (-227520)
   sin fusion                   (  492):  26.50 ms ( -1.90)  llamadas  1997 (-258)  tri  5364225 (-66060)
   sin instanciadas             (    3):  29.30 ms ( +0.90)  llamadas  2254 (-1)  tri  5430205 (-80)
   sin terreno                  (    1):  28.50 ms ( +0.10)  llamadas  2254 (-1)  tri  5027031 (-403254)
== La Trinidad a pie: 19.4 ms (mandar el trabajo 18.9 ms; a 480x270 19.3 ms)  llamadas 2200  tri 5651642
   sin sueltas                  ( 1810):  10.10 ms ( -9.30)  llamadas  1280 (-920)  tri  2661569 (-2990073)
   con sin_niebla_lejos         (    1):  15.20 ms ( -4.20)  llamadas  1493 (-707)  tri  5558607 (-93035)
   sin sombras                  (    1):  15.80 ms ( -3.60)  llamadas  1893 (-307)  tri  3654425 (-1997217)
   sin inst                     (  843):  16.90 ms ( -2.50)  llamadas  1848 (-352)  tri  5478744 (-172898)
   sin ciudad                   (  941):  17.40 ms ( -2.00)  llamadas  1753 (-447)  tri  5419267 (-232375)
   sin fusion                   (  472):  17.60 ms ( -1.80)  llamadas  1937 (-263)  tri  5583982 (-67660)
   sin parked                   (  235):  18.40 ms ( -1.00)  llamadas  2027 (-173)  tri  3889792 (-1761850)
   sin gente                    (    2):  18.90 ms ( -0.50)  llamadas  2190 (-10)  tri  5595743 (-55899)
   sin coches                   (    4):  18.90 ms ( -0.50)  llamadas  2190 (-10)  tri  5649528 (-2114)
   con resolucion1              (    1):  18.90 ms ( -0.50)  llamadas  2200 (+0)  tri  5651642 (+0)
   sin instanciadas             (    3):  19.10 ms ( -0.30)  llamadas  2200 (+0)  tri  5651642 (+0)
   sin fondo                    (    6):  19.10 ms ( -0.30)  llamadas  2197 (-3)  tri  5628192 (-23450)
   con terreno_simple           (    1):  19.10 ms ( -0.30)  llamadas  2200 (+0)  tri  5651642 (+0)
   sin terreno                  (    1):  19.20 ms ( -0.20)  llamadas  2199 (-1)  tri  5248388 (-403254)
   con sombras1024              (    1):  19.20 ms ( -0.20)  llamadas  2200 (+0)  tri  5651642 (+0)
   con terreno_una_cara         (    1):  19.30 ms ( -0.10)  llamadas  2200 (+0)  tri  5651642 (+0)
== vista alta: 17.8 ms (mandar el trabajo 18.7 ms; a 480x270 26.2 ms)  llamadas 1965  tri 6269795
   sin instanciadas             (    3):  25.70 ms ( +7.90)  llamadas  1964 (-1)  tri  6269715 (-80)
   sin terreno                  (    1):  25.60 ms ( +7.80)  llamadas  1964 (-1)  tri  5866541 (-403254)
   con terreno_una_cara         (    1):  25.40 ms ( +7.60)  llamadas  1965 (+0)  tri  6269795 (+0)
   con sombras1024              (    1):  25.20 ms ( +7.40)  llamadas  1965 (+0)  tri  6269795 (+0)
   con terreno_simple           (    1):  25.00 ms ( +7.20)  llamadas  1965 (+0)  tri  6269795 (+0)
   con resolucion1              (    1):  24.90 ms ( +7.10)  llamadas  1965 (+0)  tri  6269795 (+0)
   sin sueltas                  ( 1823):  11.10 ms ( -6.70)  llamadas  1236 (-729)  tri  3257841 (-3011954)
   sin parked                   (  247):  24.30 ms ( +6.50)  llamadas  1706 (-259)  tri  4013687 (-2256108)
   sin ciudad                   (  944):  23.80 ms ( +6.00)  llamadas  1603 (-362)  tri  6048668 (-221127)
   sin fusion                   (  469):  22.90 ms ( +5.10)  llamadas  1729 (-236)  tri  6224681 (-45114)
   sin inst                     (  871):  22.80 ms ( +5.00)  llamadas  1599 (-366)  tri  5961103 (-308692)
   con sin_niebla_lejos         (    1):  21.40 ms ( +3.60)  llamadas  1504 (-461)  tri  5968296 (-301499)
   sin sombras                  (    1):  14.60 ms ( -3.20)  llamadas  1640 (-325)  tri  3850353 (-2419442)
   sin fondo                    (    6):  18.70 ms ( +0.90)  llamadas  1962 (-3)  tri  6246345 (-23450)
   sin gente                    (    3):  17.30 ms ( -0.50)  llamadas  1950 (-15)  tri  6182269 (-87526)
   sin coches                   (    5):  18.00 ms ( +0.20)  llamadas  1955 (-10)  tri  6267681 (-2114)
== autopista: 28.8 ms (mandar el trabajo 28.6 ms; a 480x270 28.6 ms)  llamadas 2175  tri 5894043
   sin sueltas                  ( 1828):   9.80 ms (-19.00)  llamadas   799 (-1376)  tri  2730605 (-3163438)
   con sin_niebla_lejos         (    1):  16.00 ms (-12.80)  llamadas   776 (-1399)  tri  3981900 (-1912143)
   sin sombras                  (    1):  25.00 ms ( -3.80)  llamadas  2017 (-158)  tri  4437268 (-1456775)
   sin ciudad                   (  520):  26.80 ms ( -2.00)  llamadas  1878 (-297)  tri  5714304 (-179739)
   sin parked                   (  247):  27.10 ms ( -1.70)  llamadas  1927 (-248)  tri  3832577 (-2061466)
   sin inst                     (  379):  27.30 ms ( -1.50)  llamadas  1998 (-177)  tri  5832441 (-61602)
   sin gente                    (    4):  28.30 ms ( -0.50)  llamadas  2152 (-23)  tri  5768248 (-125795)
   con sombras1024              (    1):  28.40 ms ( -0.40)  llamadas  2175 (+0)  tri  5894043 (+0)
   sin fondo                    (    6):  28.50 ms ( -0.30)  llamadas  2172 (-3)  tri  5870593 (-23450)
   con resolucion1              (    1):  29.10 ms ( +0.30)  llamadas  2175 (+0)  tri  5894043 (+0)
   sin terreno                  (    1):  28.70 ms ( -0.10)  llamadas  2174 (-1)  tri  5490789 (-403254)
   sin fusion                   (   31):  28.70 ms ( -0.10)  llamadas  2164 (-11)  tri  5893151 (-892)
   sin instanciadas             (    3):  28.70 ms ( -0.10)  llamadas  2174 (-1)  tri  5893963 (-80)
   con terreno_una_cara         (    1):  28.70 ms ( -0.10)  llamadas  2175 (+0)  tri  5894043 (+0)
   sin coches                   (    5):  28.90 ms ( +0.10)  llamadas  2125 (-50)  tri  5883697 (-10346)
   con terreno_simple           (    1):  28.90 ms ( +0.10)  llamadas  2175 (+0)  tri  5894043 (+0)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
