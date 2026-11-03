# Pruebas 0.99.8 — 2026-11-03 12:55 — 1/1 OK

Listas: v1000a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 450 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_pintado_gpu.py` | **OK** | 436 s |

## Detalle

### 1. herramientas/sonda_pintado_gpu.py — OK

```
   sin terreno                  (    1):  27.20 ms ( +0.10)  llamadas  2207 (-1)  tri  5845989 (-403254)
   con terreno_una_cara         (    1):  27.20 ms ( +0.10)  llamadas  2208 (+0)  tri  6249243 (+0)
   sin chunk:aL_o3_104          (   22):  27.20 ms ( +0.10)  llamadas  2203 (-5)  tri  6248767 (-476)
   sin chunk:aL_t2_104          (   18):  27.20 ms ( +0.10)  llamadas  2207 (-1)  tri  6249111 (-132)
   sin chunk:auxLane            (    3):  27.20 ms ( +0.10)  llamadas  2208 (+0)  tri  6249243 (+0)
   sin chunk:sign0              (   10):  27.20 ms ( +0.10)  llamadas  2200 (-8)  tri  6249161 (-82)
   con terreno_simple           (    1):  27.10 ms ( -0.00)  llamadas  2208 (+0)  tri  6249243 (+0)
   sin chunk:facade             (   87):  27.10 ms ( -0.00)  llamadas  2171 (-37)  tri  6216637 (-32606)
   sin chunk:asphalt            (   90):  27.10 ms ( -0.00)  llamadas  2178 (-30)  tri  6235321 (-13922)
   sin chunk:tunnel             (    8):  27.10 ms ( -0.00)  llamadas  2205 (-3)  tri  6249135 (-108)
   sin chunk:aL_t4_129          (    2):  27.10 ms ( -0.00)  llamadas  2208 (+0)  tri  6249243 (+0)
   sin chunk:footway            (   66):  27.10 ms ( -0.00)  llamadas  2187 (-21)  tri  6238097 (-11146)
== autopista: 23 ms (mandar el trabajo 22.6 ms; a 480x270 22.9 ms)  llamadas 2821  tri 5974750
   sin sueltas                  ( 2571):   9.90 ms (-13.10)  llamadas   798 (-2023)  tri  2779266 (-3195484)
   sin chunk:disc               (   66):  34.70 ms (+11.70)  llamadas  2793 (-28)  tri  5962942 (-11808)
   sin chunk:aL_o3_117          (    7):  34.60 ms (+11.60)  llamadas  2816 (-5)  tri  5974674 (-76)
   sin chunk:aL_t4_130          (    2):  34.20 ms (+11.20)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:asphalt            (   72):  34.10 ms (+11.10)  llamadas  2783 (-38)  tri  5952770 (-21980)
   sin chunk:aL_t2_104          (    7):  34.00 ms (+11.00)  llamadas  2816 (-5)  tri  5974352 (-398)
   sin fusion                   (   31):  33.90 ms (+10.90)  llamadas  2810 (-11)  tri  5973858 (-892)
   con terreno_una_cara         (    1):  33.90 ms (+10.90)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:aL_o2_91           (    1):  33.60 ms (+10.60)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:aL_o3_129          (    1):  33.60 ms (+10.60)  llamadas  2820 (-1)  tri  5974730 (-20)
   sin chunk:sidewalk           (   61):  33.40 ms (+10.40)  llamadas  2787 (-34)  tri  5950096 (-24654)
   sin chunk:aL_o3_104          (    5):  33.40 ms (+10.40)  llamadas  2816 (-5)  tri  5974344 (-406)
   con sombras1024              (    1):  33.30 ms (+10.30)  llamadas  2821 (+0)  tri  5974750 (+0)
   con terreno_simple           (    1):  33.20 ms (+10.20)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:trim               (   23):  33.20 ms (+10.20)  llamadas  2802 (-19)  tri  5897262 (-77488)
   sin chunk:aL_o2_78m          (    7):  33.20 ms (+10.20)  llamadas  2817 (-4)  tri  5974084 (-666)
   sin fondo                    (    6):  33.10 ms (+10.10)  llamadas  2818 (-3)  tri  5951300 (-23450)
   sin chunk:aL_o3_134m         (    7):  33.10 ms (+10.10)  llamadas  2817 (-4)  tri  5973174 (-1576)
   sin gente                    (    4):  33.00 ms (+10.00)  llamadas  2801 (-20)  tri  5862435 (-112315)
   con resolucion1              (    1):  33.00 ms (+10.00)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:tunnelLight        (    3):  33.00 ms (+10.00)  llamadas  2819 (-2)  tri  5974728 (-22)
   sin chunk:auxLane            (    4):  33.00 ms (+10.00)  llamadas  2819 (-2)  tri  5974610 (-140)
   sin chunk:roofTile           (   40):  33.00 ms (+10.00)  llamadas  2798 (-23)  tri  5971770 (-2980)
   sin instanciadas             (    3):  32.90 ms ( +9.90)  llamadas  2820 (-1)  tri  5974670 (-80)
   sin chunk:aL_o3_130          (    7):  32.90 ms ( +9.90)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:tunnel             (    3):  32.80 ms ( +9.80)  llamadas  2819 (-2)  tri  5974546 (-204)
   sin chunk:aL_t4_129          (    3):  32.80 ms ( +9.80)  llamadas  2820 (-1)  tri  5974740 (-10)
   sin chunk:sign0              (    2):  32.80 ms ( +9.80)  llamadas  2819 (-2)  tri  5974746 (-4)
   sin chunk:discPave           (    8):  32.80 ms ( +9.80)  llamadas  2814 (-7)  tri  5974282 (-468)
   sin chunk:paving             (    6):  32.80 ms ( +9.80)  llamadas  2816 (-5)  tri  5973928 (-822)
   sin chunk:grass              (    3):  32.80 ms ( +9.80)  llamadas  2818 (-3)  tri  5974386 (-364)
   sin chunk:aL_t2_117          (    9):  32.80 ms ( +9.80)  llamadas  2818 (-3)  tri  5974510 (-240)
   sin inst                     (  372):  32.70 ms ( +9.70)  llamadas  2645 (-176)  tri  5913764 (-60986)
   sin chunk:stone              (    7):  32.70 ms ( +9.70)  llamadas  2814 (-7)  tri  5972938 (-1812)
   sin chunk:glassHouse         (    1):  32.70 ms ( +9.70)  llamadas  2821 (+0)  tri  5974750 (+0)
   sin chunk:dirt               (   21):  32.60 ms ( +9.60)  llamadas  2814 (-7)  tri  5974138 (-612)
   sin chunk:aL_o2_78           (    2):  32.60 ms ( +9.60)  llamadas  2819 (-2)  tri  5974738 (-12)
   sin chunk:footway            (   20):  32.50 ms ( +9.50)  llamadas  2807 (-14)  tri  5971014 (-3736)
   sin coches                   (    5):  32.40 ms ( +9.40)  llamadas  2761 (-60)  tri  5965718 (-9032)
   con sin_niebla_lejos         (    1):  14.00 ms ( -9.00)  llamadas   771 (-2050)  tri  3936694 (-2038056)
   sin parked                   (  248):  31.20 ms ( +8.20)  llamadas  2573 (-248)  tri  3867664 (-2107086)
   sin ciudad                   (  522):  30.70 ms ( +7.70)  llamadas  2524 (-297)  tri  5791354 (-183396)
   sin chunk:roofFlat           (   62):  30.50 ms ( +7.50)  llamadas  2784 (-37)  tri  5968450 (-6300)
   sin sombras                  (    1):  28.70 ms ( +5.70)  llamadas  2669 (-152)  tri  4541331 (-1433419)
   sin chunk:facade             (   62):  26.70 ms ( +3.70)  llamadas  2784 (-37)  tri  5948152 (-26598)
   sin terreno                  (    1):  23.50 ms ( +0.50)  llamadas  2820 (-1)  tri  5571496 (-403254)
SONDA PINTADO GPU OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_pintado_gpu.txt
