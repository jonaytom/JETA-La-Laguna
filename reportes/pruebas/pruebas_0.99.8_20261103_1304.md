# Pruebas 0.99.8 — 2026-11-03 13:04 — 2/2 OK

Listas: v1000c. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 54 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_grupos.py` | **OK** | 5 s |
| 2 | `herramientas/sonda_recorte_motivos.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_grupos.py — OK

```
       1     42       42     2696      0  ? Group hijos 128
       2     30       37     2385      0  ? Group hijos 8
       1     28       28      336      0  ? Group hijos 28
       6     27       27    96549     18  gente
       1     24       24      268      0  ? Group hijos 25
       1     22       22       94      0  ? Group hijos 22
       1     21       21      242      0  ? Group hijos 21
       1     19       19      178      0  ? Group hijos 19
       1     18       18      166      0  ? Group hijos 18
       1     13       13      106      0  ? Group hijos 13
       1     12       12     1758      0  ? Group hijos 12
       2     12       12      144      0  ? Group len hijos 6
       1     11       11       82      0  ? Group hijos 11
       2      8        8     1044      0  ? Group hijos 4
       1      7        7    15955      3  jugador
       1      5        5       60      0  ? Group hijos 5
       1      4        4       48      0  ? Group len hijos 4
       1      2        2      144      0  ? Group t hijos 2
== los 40 con más llamadas
    182 llamadas  182 mallas   12420 tri  X 0, Y 0 a 845 m  ? Group hijos 202
     93 llamadas   93 mallas    5906 tri  X 0, Y 0 a 845 m  ? Group hijos 145
     77 llamadas   77 mallas     924 tri  X -293, Y 719 a 1180 m  ? Group hijos 77
     64 llamadas   64 mallas    4112 tri  X 0, Y 0 a 845 m  ? Group hijos 136
     64 llamadas   64 mallas    4112 tri  X 0, Y 0 a 845 m  ? Group hijos 137
     53 llamadas   53 mallas    3396 tri  X 0, Y 0 a 845 m  ? Group hijos 143
     49 llamadas   49 mallas    3074 tri  X 0, Y 0 a 845 m  ? Group hijos 145
     43 llamadas   43 mallas    3114 tri  X 0, Y 0 a 845 m  ? Group hijos 132
     42 llamadas   42 mallas    2696 tri  X 0, Y 0 a 845 m  ? Group hijos 128
     28 llamadas   28 mallas     336 tri  X -399, Y 749 a 1170 m  ? Group hijos 28
     24 llamadas   24 mallas     268 tri  X 9407, Y 0 a 10177 m  ? Group hijos 25
     22 llamadas   22 mallas      94 tri  X 9077, Y 0 a 9847 m  ? Group hijos 22
     22 llamadas   22 mallas    1325 tri  X -147, Y -618 a 666 m  ? Group hijos 8
     21 llamadas   21 mallas     242 tri  X 0, Y 0 a 845 m  ? Group hijos 21
     20 llamadas   20 mallas     636 tri  X -213, Y 780 a 1269 m  coche
     19 llamadas   19 mallas     178 tri  X 10328, Y 0 a 11097 m  ? Group hijos 19
     19 llamadas   19 mallas   19088 tri  X -299, Y -260 a 475 m  npc:sastron
     18 llamadas   18 mallas     166 tri  X 10143, Y 0 a 10913 m  ? Group hijos 18
     16 llamadas   16 mallas   18644 tri  X -533, Y -353 a 230 m  npc:boca
     15 llamadas    8 mallas    1060 tri  X 2266, Y 3394 a 4832 m  ? Group hijos 8
     14 llamadas   14 mallas   16407 tri  X -169, Y 267 a 866 m  npc:canarion
     14 llamadas   14 mallas   16227 tri  X -42, Y -236 a 731 m  npc:obispo
     14 llamadas   14 mallas   16179 tri  X 1250, Y 1524 a 2763 m  npc:secreta
     13 llamadas   13 mallas     106 tri  X 10492, Y 0 a 11261 m  ? Group hijos 13
     13 llamadas   13 mallas   15696 tri  X -754, Y -362 a 9 m  npc:blanco
     12 llamadas   12 mallas    1758 tri  X 143, Y 5 a 977 m  ? Group hijos 12
     11 llamadas   11 mallas      82 tri  X 9992, Y 0 a 10762 m  ? Group hijos 11
     10 llamadas   10 mallas    2114 tri  X -174, Y 270 a 864 m  coche
     10 llamadas   10 mallas    2114 tri  X -716, Y -506 a 151 m  coche
     10 llamadas   10 mallas    2058 tri  X -764, Y -359 a 5 m  coche
     10 llamadas   10 mallas    2112 tri  X -707, Y -540 a 185 m  coche
     10 llamadas   10 mallas    2058 tri  X -768, Y -331 a 32 m  coche
     10 llamadas   10 mallas    2112 tri  X -752, Y -503 a 141 m  coche
     10 llamadas   10 mallas    2112 tri  X -774, Y -356 a 13 m  coche
     10 llamadas   10 mallas    2112 tri  X -880, Y -216 a 188 m  coche
     10 llamadas   10 mallas    2112 tri  X -618, Y -517 a 212 m  coche
     10 llamadas   10 mallas    2112 tri  X -904, Y -376 a 142 m  coche
     10 llamadas   10 mallas    2108 tri  X -828, Y -235 a 144 m  coche
      9 llamadas    9 mallas   15696 tri  X -218, Y -306 a 547 m  npc:coco
      7 llamadas    7 mallas   15955 tri  X -758, Y -364 a 5 m  jugador
SONDA GRUPOS OK
```

### 2. herramientas/sonda_recorte_motivos.py — OK

```
alta    X 836, Y 1661 · Calle Osa Mayor (residential) · edificio #1593 · invade 2.41 m · 301 m² · medio: quedaría muy poco (52 de 301 m²) [tramo 678,1714 273 m, medio ancho 4.3]
alta    X -912, Y -407 · Avenida Lucas Vega (residential) · edificio #1357 · invade 2.4 m · 4123 m² · lado: el corte pasaría del final de la calle [tramo -818,-478 93 m, medio ancho 4.3] | lado: el corte pasaría del final de la calle [tramo -796,-489 85 m, medio ancho 4.3] | final: perdería demasiado (731 de 4123 m²) o se cruza
alta    X 696, Y 1657 · Calle Marte (residential) · edificio #1599 · invade 2.4 m · 1274 m² · final: perdería demasiado (563 de 1274 m²)
alta    X 3333, Y 1956 · Calle Hernández Amador (residential) · edificio #5486 · invade 2.31 m → no encuentro su planta en DATA.B
alta    X -909, Y 1489 · Calle La Costurera (residential) · edificio #3679 · invade 2.22 m · 86 m² · medio: quedaría muy poco (11 de 86 m²) [tramo -980,1481 122 m, medio ancho 4.3] | lado: menos de 0,6 m [tramo -921,1488 34 m, medio ancho 2.9] | final: perdería demasiado (34 de 86 m²)
alta    X 659, Y 1611 · Calle Universo (residential) · edificio #1604 · invade 2.17 m · 140 m² · medio: quedaría muy poco (22 de 140 m²) [tramo 637,1614 223 m, medio ancho 4.3]
alta    X -913, Y 1449 · Camino El Mato (residential) · edificio #3683 · invade 2.16 m · 14 m² · medio: quedaría muy poco (3 de 14 m²) [tramo -937,1444 81 m, medio ancho 4.3] | medio: quedaría muy poco (0 de 14 m²) [tramo -921,1488 34 m, medio ancho 2.9] | esquinas: el contorno se cruzaría
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 208 m² · final: perdería demasiado (81 de 208 m²)
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 208 m² · final: perdería demasiado (81 de 208 m²)
alta    X -980, Y 1481 · Calle La Costurera (residential) · edificio #477 · invade 2.04 m · 208 m² · final: perdería demasiado (81 de 208 m²)
alta    X 2415, Y 1931 · Calle Piloto Néstor Jorge Cabrera (residential) · edificio #3106 · invade 2.03 m · 396 m² · medio: quedaría muy poco (36 de 396 m²) [tramo 2421,2033 158 m, medio ancho 4.3] | final: perdería demasiado (136 de 396 m²)
alta    X -1056, Y 821 · Calle la Morera (residential) · edificio #91 · invade 1.97 m → no encuentro su planta en DATA.B
alta    X 2703, Y 1859 · Calle José Domínguez Dorta (residential) · edificio #5362 · invade 1.94 m · 254 m² · medio: quedaría muy poco (24 de 90 m²) [tramo 2710,1861 57 m, medio ancho 2.9] | final: perdería demasiado (90 de 254 m²)
alta    X 1692, Y 4082 · (sin nombre) (residential) · edificio #5577 · invade 1.93 m · 49 m² · medio: quedaría muy poco (1 de 49 m²) [tramo 1658,4097 34 m, medio ancho 4.3]
alta    X 3459, Y 1620 · Calle Hernández Amador (residential) · edificio #5535 · invade 1.92 m · 161 m² · final: perdería demasiado (78 de 161 m²)
alta    X -864, Y 265 · Calle Cabrera Felipe (residential) · edificio #3552 · invade 1.87 m · 1406 m² · medio: quedaría muy poco (10 de 567 m²) [tramo -885,252 146 m, medio ancho 4.3] | final: perdería demasiado (524 de 1406 m²)
alta    X 560, Y 568 · Camino Real de La Verdellada (residential) · edificio #1868 · invade 1.87 m · 107 m² · medio: quedaría muy poco (14 de 107 m²) [tramo 499,569 31 m, medio ancho 4.3] | medio: quedaría muy poco (15 de 107 m²) [tramo 530,572 40 m, medio ancho 4.3] | esquinas: el contorno se cruzaría
alta    X 668, Y 1535 · Calle Plutón (residential) · edificio #1592 · invade 1.86 m → no encuentro su planta en DATA.B
alta    X 1756, Y 3764 · (sin nombre) (service) · Mercadona · invade 1.85 m · 3214 m² · medio: quedaría muy poco (188 de 711 m²) [tramo 1713,3765 7 m, medio ancho 6.1] | medio: quedaría muy poco (133 de 570 m²) [tramo 1742,3804 38 m, medio ancho 2.9] | final: perdería demasiado (192 de 3214 m²)
alta    X -184, Y 711 · (sin nombre) (service) · edificio #3759 · invade 1.85 m · 31 m² · medio: quedaría muy poco (4 de 31 m²) [tramo -158,680 5 m, medio ancho 2.9] | medio: quedaría muy poco (4 de 31 m²) [tramo -173,715 12 m, medio ancho 2.9] | medio: quedaría muy poco (3 de 31 m²) [tramo -189,709 15 m, medio ancho 2.9] | medio: quedaría muy poco (4 de 31 m²) [tramo -184,711 6 m, medio ancho 2.9]
alta    X -189, Y 709 · (sin nombre) (service) · edificio #3759 · invade 1.85 m · 31 m² · medio: quedaría muy poco (4 de 31 m²) [tramo -158,680 5 m, medio ancho 2.9] | medio: quedaría muy poco (4 de 31 m²) [tramo -173,715 12 m, medio ancho 2.9] | medio: quedaría muy poco (3 de 31 m²) [tramo -189,709 15 m, medio ancho 2.9] | medio: quedaría muy poco (4 de 31 m²) [tramo -184,711 6 m, medio ancho 2.9]
alta    X 2338, Y 3143 · (sin nombre) (service) · edificio #3151 · invade 1.85 m · 3883 m² · lado: el corte pasaría del final de la calle [tramo 2281,3199 7 m, medio ancho 2.9] | final: perdería demasiado (812 de 3883 m²)
alta    X -179, Y -563 · (sin nombre) (service) · edificio #3974 · invade 1.85 m · 286 m² · final: perdería demasiado (135 de 286 m²)
alta    X -2476, Y 45 · (sin nombre) (service) · edificio #5240 · invade 1.85 m · 271 m² · final: perdería demasiado (112 de 271 m²)
alta    X -914, Y -406 · Callejón Montaraz (residential) · edificio #1357 · invade 1.84 m · 4123 m² · lado: el corte pasaría del final de la calle [tramo -818,-478 93 m, medio ancho 4.3] | lado: el corte pasaría del final de la calle [tramo -796,-489 85 m, medio ancho 4.3] | final: perdería demasiado (731 de 4123 m²) o se cruza
alta    X 582, Y -924 · Calle Gallardina (residential) · edificio #1997 · invade 1.84 m · 1220 m² · final: perdería demasiado (737 de 1220 m²) o se cruza
alta    X 944, Y 726 · (sin nombre) (residential) · edificio #2613 · invade 1.83 m · 508 m² · lado: menos de 0,6 m [tramo 915,772 75 m, medio ancho 4.3] | final: perdería demasiado (199 de 508 m²)
alta    X -1057, Y 1766 · Calle Tabajoste (residential) · edificio #579 · invade 1.83 m · 212 m² · final: perdería demasiado (78 de 212 m²)
alta    X -912, Y 1455 · (sin nombre) (service) · edificio #3683 · invade 1.83 m · 14 m² · medio: quedaría muy poco (3 de 14 m²) [tramo -937,1444 81 m, medio ancho 4.3] | medio: quedaría muy poco (0 de 14 m²) [tramo -921,1488 34 m, medio ancho 2.9] | esquinas: el contorno se cruzaría
alta    X 858, Y 441 · (sin nombre) (residential) · edificio #1941 · invade 1.8 m · 188 m² · medio: quedaría muy poco (36 de 151 m²) [tramo 846,457 34 m, medio ancho 4.3] | final: perdería demasiado (60 de 188 m²)
alta    X 789, Y 2973 · (sin nombre) (service) · IKEA · invade 1.79 m · 7956 m² · lado: el corte pasaría del final de la calle [tramo 769,3045 14 m, medio ancho 2.9] | lado: el corte pasaría del final de la calle [tramo 769,3045 37 m, medio ancho 2.9] | lado: el corte pasaría del final de la calle [tramo 756,3080 72 m, medio ancho 2.9] | lado: el corte pasaría del final de la calle [tramo 762,3062 73 m, medio ancho 2.9]
alta    X 1525, Y 1681 · Calle Antón Guanche (residential) · edificio #2782 · invade 1.76 m · 2123 m² · lado: menos de 0,6 m [tramo 1498,1682 16 m, medio ancho 4.3] | lado: el corte pasaría del final de la calle [tramo 1513,1687 13 m, medio ancho 4.3] | final: perdería demasiado (350 de 2123 m²)
alta    X -1004, Y 819 · Calle la Morera (residential) · edificio #3580 · invade 1.75 m · 12 m² · final: perdería demasiado (7 de 12 m²)
alta    X 2514, Y 1650 · Calle Olvido (residential) · edificio #5398 · invade 1.73 m · 1399 m² · final: perdería demasiado (676 de 1399 m²)
alta    X 717, Y 1118 · Calle los Guanches (residential) · edificio #737 · invade 1.71 m · 1857 m² · final: perdería demasiado (428 de 1857 m²)
alta    X -1746, Y 1199 · Pasaje Ravelo A (service) · edificio #607 · invade 1.71 m · 331 m² · lado: menos de 0,6 m [tramo -1972,1407 310 m, medio ancho 6.8] | lado: el corte pasaría del final de la calle [tramo -1746,1199 33 m, medio ancho 2.9] | final: perdería demasiado (111 de 331 m²)
alta    X -1044, Y 821 · Calle la Morera (residential) · edificio #3579 · invade 1.65 m · 16 m² · final: perdería demasiado (11 de 16 m²)
alta    X 3181, Y 2051 · Calle El Muelle (residential) · edificio #5527 · invade 1.64 m · 151 m² · lado: el corte pasaría del final de la calle [tramo 3162,2049 24 m, medio ancho 4.3] | lado: el corte pasaría del final de la calle [tramo 3185,2051 20 m, medio ancho 4.3] | esquinas: el contorno se cruzaría
alta    X -745, Y -293 · Calle Particular de Ángel Núñez (residential) · edificio #1368 · invade 1.63 m · 532 m² · lado: menos de 0,6 m [tramo -786,-276 143 m, medio ancho 4.0] | final: perdería demasiado (172 de 532 m²)
alta    X -895, Y 1482 · (sin nombre) (service) · edificio #3681 · invade 1.63 m · 64 m² · medio: quedaría muy poco (7 de 64 m²) [tramo -897,1490 9 m, medio ancho 2.9] | esquinas: el contorno se cruzaría
alta    X 1787, Y 1253 · Calle El Sauzal (residential) · edificio #2721 · invade 1.62 m → no encuentro su planta en DATA.B
alta    X -1204, Y -1060 · (sin nombre) (residential) · edificio #4412 · invade 1.6 m → no encuentro su planta en DATA.B
alta    X 3242, Y 2039 · Calle El Muelle (residential) · edificio #5483 · invade 1.59 m · 302 m² · final: perdería demasiado (135 de 302 m²)
alta    X 268, Y 2845 · Calle Tamaragua (residential) · edificio #2460 · invade 1.57 m · 132 m² · final: perdería demasiado (51 de 132 m²)
alta    X 687, Y 1711 · Calle Osa Mayor (residential) · edificio #1598 · invade 1.56 m → no encuentro su planta en DATA.B
alta    X -1076, Y 1762 · Calle Tabajoste (residential) · edificio #578 · invade 1.56 m · 101 m² · medio: quedaría muy poco (21 de 101 m²) [tramo -1153,1750 157 m, medio ancho 4.3]
alta    X 40, Y -400 · Calle Pintor Cristino de Vera (residential) · edificio #4042 · invade 1.55 m · 75 m² · final: perdería demasiado (26 de 75 m²)
alta    X -218, Y -697 · Calle Jacinto Alzola Cabrera (residential) · edificio #1981 · invade 1.55 m · 473 m² · lado: el corte pasaría del final de la calle [tramo -240,-684 31 m, medio ancho 4.3]
alta    X -1167, Y -1020 · Camino Josefina la Rastroja (residential) · edificio #4409 · invade 1.54 m · 719 m² · final: perdería demasiado (314 de 719 m²)
alta    X -1189, Y -1074 · Calle Vereda Chica (residential) · edificio #4412 · invade 1.51 m → no encuentro su planta en DATA.B
== resumen de motivos
   45  final: perdería demasiado
   35  medio: quedaría muy poco
   18  lado: el corte pasaría del final de la calle
   16  no encuentro su planta en DATA.B
    8  lado: menos de 0,6 m
    6  esquinas: el contorno se cruzaría
    1  estilo 4
    1  queda más metido en otra calle
SONDA RECORTE OK
```

Fotos/archivos nuevos en `tests/shots/`: sonda_grupos.txt, sonda_recorte_motivos.txt
