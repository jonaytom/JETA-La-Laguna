# Pruebas 0.76.0 — 2026-10-19 11:29 — 1/1 OK

Listas: sonda077. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 231 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rendimiento.py` | **OK** | 209 s |

## Detalle

### 1. herramientas/sonda_rendimiento.py — OK

```
   sin chunkall           ( 3333): 1996.9 ms (−92276.4)  llamadas 4453 (−1289)  tri 4470935 (−586385)
   sin chunk:facade       (  354): 2480.7 ms (−91792.6)  llamadas 5610 (−132)  tri 5009404 (−47916)
   sin chunk:roofTile     (  191): 2558.1 ms (−91715.2)  llamadas 5681 (−61)  tri 5050566 (−6754)
   sin chunk:roofFlat     (  350): 2567.2 ms (−91706.1)  llamadas 5611 (−131)  tri 5046357 (−10963)
   sin chunk:trim         (  355): 2355.1 ms (−91918.2)  llamadas 5608 (−134)  tri 4844124 (−213196)
   sin chunk:asphalt      (  344): 2581.1 ms (−91692.2)  llamadas 5603 (−139)  tri 4986928 (−70392)
   sin chunk:sidewalk     (  315): 2541.8 ms (−91731.5)  llamadas 5608 (−134)  tri 4957120 (−100200)
   sin chunk:stone        (   40): 2544.8 ms (−91728.5)  llamadas 5729 (−13)  tri 5052012 (−5308)
   sin parked             (   15): 2632.7 ms (−91640.6)  llamadas 5742 (−0)  tri 5057320 (−0)
   sin inst               (   42): 1664.5 ms (−92608.8)  llamadas 5702 (−40)  tri 2745390 (−2311930)
   sin suelta             ( 9302): 1820.0 ms (−92453.3)  llamadas 1388 (−4354)  tri 2898433 (−2158887)
   sin sombras            (    0): 2620.6 ms (−91652.7)  llamadas 5742 (−0)  tri 5057320 (−0)
   sin peds               (    3): 2496.1 ms (−91777.2)  llamadas 5732 (−10)  tri 5012794 (−44526)
   sin coches             (    2): 2590.1 ms (−91683.2)  llamadas 5712 (−30)  tri 5054570 (−2750)
== trinidad: {'ms': 2440.3, 'llamadas': 4504, 'triangulos': 5013725}
   sin chunkall           ( 3333): 1480.0 ms (−960.3)  llamadas 3393 (−1111)  tri 4476285 (−537440)
   sin chunk:facade       (  354): 1895.1 ms (−545.2)  llamadas 4395 (−109)  tri 4971947 (−41778)
   sin chunk:roofTile     (  191): 1955.8 ms (−484.5)  llamadas 4449 (−55)  tri 5007607 (−6118)
   sin chunk:roofFlat     (  350): 1971.6 ms (−468.7)  llamadas 4396 (−108)  tri 5003903 (−9822)
   sin chunk:trim         (  355): 1834.0 ms (−606.3)  llamadas 4394 (−110)  tri 4806969 (−206756)
   sin chunk:asphalt      (  344): 1925.2 ms (−515.1)  llamadas 4376 (−128)  tri 4947435 (−66290)
   sin chunk:sidewalk     (  315): 1935.3 ms (−505.0)  llamadas 4379 (−125)  tri 4925139 (−88586)
   sin chunk:stone        (   40): 1991.8 ms (−448.5)  llamadas 4495 (−9)  tri 5010033 (−3692)
   sin parked             (   15): 1984.4 ms (−455.9)  llamadas 4504 (−0)  tri 5013725 (−0)
   sin inst               (   42): 1229.0 ms (−1211.3)  llamadas 4465 (−39)  tri 2701875 (−2311850)
   sin suelta             ( 9300): 1253.9 ms (−1186.4)  llamadas 1194 (−3310)  tri 2849378 (−2164347)
   sin sombras            (    0): 1982.7 ms (−457.6)  llamadas 4504 (−0)  tri 5013725 (−0)
   sin peds               (    4): 1951.6 ms (−488.7)  llamadas 4491 (−13)  tri 4952427 (−61298)
   sin coches             (    2): 2005.7 ms (−434.6)  llamadas 4474 (−30)  tri 5010975 (−2750)
== alto: {'ms': 1894, 'llamadas': 3463, 'triangulos': 4884897}
   sin chunkall           ( 3333): 1531.2 ms (−362.8)  llamadas 2982 (−481)  tri 4631130 (−253767)
   sin chunk:facade       (  354): 1727.9 ms (−166.1)  llamadas 3419 (−44)  tri 4853561 (−31336)
   sin chunk:roofTile     (  191): 1830.6 ms (−63.4)  llamadas 3432 (−31)  tri 4871487 (−13410)
   sin chunk:roofFlat     (  350): 1846.4 ms (−47.6)  llamadas 3419 (−44)  tri 4879196 (−5701)
   sin chunk:trim         (  355): 1834.4 ms (−59.6)  llamadas 3419 (−44)  tri 4780145 (−104752)
   sin chunk:asphalt      (  344): 1804.8 ms (−89.2)  llamadas 3422 (−41)  tri 4868073 (−16824)
   sin chunk:sidewalk     (  315): 1808.0 ms (−86.0)  llamadas 3423 (−40)  tri 4858581 (−26316)
   sin chunk:stone        (   40): 1828.2 ms (−65.8)  llamadas 3447 (−16)  tri 4871649 (−13248)
   sin parked             (   14): 1746.1 ms (−147.9)  llamadas 3455 (−8)  tri 4760053 (−124844)
   sin inst               (   42): 1005.7 ms (−888.3)  llamadas 3423 (−40)  tri 2572967 (−2311930)
   sin suelta             ( 9343): 1219.0 ms (−675.0)  llamadas 541 (−2922)  tri 2690565 (−2194332)
   sin sombras            (    0): 1881.9 ms (−12.1)  llamadas 3463 (−0)  tri 4884897 (−0)
   sin peds               (    7): 1838.0 ms (−56.0)  llamadas 3442 (−21)  tri 4781703 (−103194)
   sin coches             (    4): 1840.1 ms (−53.9)  llamadas 3460 (−3)  tri 4870579 (−14318)
== aeropuerto: {'ms': 1253.5, 'llamadas': 830, 'triangulos': 4472388}
   sin chunkall           ( 3333): 1167.5 ms (−86.0)  llamadas 501 (−329)  tri 4373600 (−98788)
   sin chunk:facade       (  354): 1221.3 ms (−32.2)  llamadas 789 (−41)  tri 4467534 (−4854)
   sin chunk:roofTile     (  191): 1233.3 ms (−20.2)  llamadas 816 (−14)  tri 4472087 (−301)
   sin chunk:roofFlat     (  350): 1251.9 ms (−1.6)  llamadas 790 (−40)  tri 4471315 (−1073)
   sin chunk:trim         (  355): 1232.6 ms (−20.9)  llamadas 790 (−40)  tri 4449000 (−23388)
   sin chunk:asphalt      (  344): 1235.0 ms (−18.5)  llamadas 776 (−54)  tri 4448480 (−23908)
   sin chunk:sidewalk     (  315): 1217.0 ms (−36.5)  llamadas 790 (−40)  tri 4445808 (−26580)
   sin chunk:stone        (   40): 1215.9 ms (−37.6)  llamadas 830 (−0)  tri 4472388 (−0)
   sin parked             (   14): 1268.9 ms (−-15.4)  llamadas 830 (−0)  tri 4472388 (−0)
   sin inst               (   42):  842.1 ms (−411.4)  llamadas 795 (−35)  tri 2190562 (−2281826)
   sin suelta             ( 9332):  544.1 ms (−709.4)  llamadas 367 (−463)  tri 2380620 (−2091768)
   sin sombras            (    0): 1253.9 ms (−-0.4)  llamadas 830 (−0)  tri 4472388 (−0)
   sin peds               (    4): 1200.3 ms (−53.2)  llamadas 817 (−13)  tri 4413544 (−58844)
   sin coches             (    4): 1220.4 ms (−33.1)  llamadas 827 (−3)  tri 4458070 (−14318)
SONDA RENDIMIENTO OK
```
