# Pruebas 1.4.50 — 2026-11-25 11:59 — 4/4 OK

Listas: tmp_dep. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 23 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_barreras.py` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |
| 4 | `herramientas/sonda_dep_raise.py` | **OK** | 0 s |

## Detalle

### 1. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

### 2. herramientas/sonda_barreras.py — OK

```
BARRERAS {"barreras":[],"n":0,"cerca":[[691.6,1328.7,null],[695,1321.1,null],[699.9,1323.6,null]],"contenedores":[[-767.8,-383.4,true],[-768.4,-385.6,true],[-769,-387.8,true]]}
```

### 3. audit_obstaculos.py — OK

```
obstacles 346
[(('secondary', 'tertiary'), 96), (('secondary', 'residential'), 88), (('secondary', 'secondary'), 46), (('footway', 'unclassified'), 16), (('footway', 'service'), 9), (('secondary', 'motorway_link'), 8), (('footway', 'motorway_link'), 7), (('footway', 'motorway'), 7), (('primary', 'motorway_link'), 7), (('secondary', 'service'), 7), (('unclassified', 'motorway'), 6), (('secondary', 'secondary_link'), 6), (('secondary', 'unclassified'), 5), (('service', 'service'), 4), (('secondary', 'motorway'), 4), (('motorway_link', 'motorway_link'), 3), (('motorway_link', 'tertiary'), 3), (('secondary', 'primary'), 3), (('tertiary', 'motorway_link'), 2), (('primary', 'unclassified'), 2)]
barreras en calzada 0 Counter()
```

### 4. herramientas/sonda_dep_raise.py — OK

```
TOTAL 332 ensanchadas 22 m ensanchados 5222
DR {'k': 'DEP', 'ri': 4925, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 1051, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-3266, -192]}
DR {'k': 'DEP', 'ri': 2286, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 1030, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-793, 209]}
DR {'k': 'DEP', 'ri': 2899, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 832, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-1823, -222]}
DR {'k': 'DEP', 'ri': 1285, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 811, 'ancho': 13.4, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [254, 1383]}
DR {'k': 'DEP', 'ri': 4763, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 804, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-3865, -299]}
DR {'k': 'RAISE', 'ri': 2462, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 800, 'ancho': 13.4, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [1304, 2569]}
DR {'k': 'RAISE', 'ri': 1291, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 771, 'ancho': 13.4, 'wMin': 13.2, 'wMax': 14.8, 'flags': 1, 'desde': [2122, 3453]}
DR {'k': 'DEP', 'ri': 2478, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 694, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-1793, -199]}
DR {'k': 'DEP', 'ri': 2352, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 664, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-2600, -205]}
DR {'k': 'RAISE', 'ri': 1572, 'tipo': 12, 'nombre': '', 'largo': 569, 'ancho': 4, 'wMin': 4, 'wMax': 5.2, 'flags': 1, 'desde': [840, 2899]}
DR {'k': 'RAISE', 'ri': 2021, 'tipo': 3, 'nombre': 'Vía de Ronda de La Laguna', 'largo': 568, 'ancho': 7, 'wMin': 7, 'wMax': 13, 'flags': 0, 'desde': [666, -1266]}
DR {'k': 'DEP', 'ri': 308, 'tipo': 10, 'nombre': 'Camino La Rúa', 'largo': 490, 'ancho': 5.8, 'wMin': 5.8, 'wMax': 8, 'flags': 0, 'desde': [632, -1148]}
DR {'k': 'RAISE', 'ri': 1372, 'tipo': 3, 'nombre': 'Carretera de La Esperanza', 'largo': 478, 'ancho': 7, 'wMin': 7, 'wMax': 13, 'flags': 0, 'desde': [-838, 1352]}
DR {'k': 'RAISE', 'ri': 1748, 'tipo': 0, 'nombre': 'Autovía Interconexión Norte-Sur', 'largo': 458, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [839, 3169]}
DR {'k': 'DEP', 'ri': 4702, 'tipo': 1, 'nombre': '', 'largo': 457, 'ancho': 4, 'wMin': 4, 'wMax': 7.8, 'flags': 1, 'desde': [-2246, -209]}
DR {'k': 'RAISE', 'ri': 1359, 'tipo': 3, 'nombre': 'Vía de Ronda de La Laguna', 'largo': 437, 'ancho': 7, 'wMin': 7, 'wMax': 13, 'flags': 0, 'desde': [579, -754]}
DR {'k': 'DEP', 'ri': 1271, 'tipo': 1, 'nombre': '', 'largo': 433, 'ancho': 4, 'wMin': 4, 'wMax': 7.8, 'flags': 1, 'desde': [-1823, -222]}
DR {'k': 'RAISE', 'ri': 1092, 'tipo': 7, 'nombre': 'Avenida César Manrique', 'largo': 420, 'ancho': 4, 'wMin': 4, 'wMax': 10.4, 'flags': 1, 'desde': [1312, 2105]}
DR {'k': 'RAISE', 'ri': 2019, 'tipo': 3, 'nombre': 'Vía de Ronda de La Laguna', 'largo': 414, 'ancho': 13.2, 'wMin': 13.2, 'wMax': 17.2, 'flags': 0, 'desde': [471, 280]}
DR {'k': 'RAISE', 'ri': 2329, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 384, 'ancho': 13.4, 'wMin': 13.2, 'wMax': 14.8, 'flags': 1, 'desde': [1606, 2881]}
DR {'k': 'DEP', 'ri': 5092, 'tipo': 12, 'nombre': '', 'largo': 376, 'ancho': 5.2, 'wMin': 5.2, 'wMax': 5.2, 'flags': 5, 'desde': [-3089, -145]}
DR {'k': 'RAISE', 'ri': 560, 'tipo': 10, 'nombre': 'Camino de San Roque', 'largo': 365, 'ancho': 5.8, 'wMin': 5.8, 'wMax': 8, 'flags': 0, 'desde': [567, 72]}
DR {'k': 'RAISE', 'ri': 650, 'tipo': 7, 'nombre': 'Travesía Enlace Andenes Sobradillo', 'largo': 362, 'ancho': 4, 'wMin': 4, 'wMax': 10.4, 'flags': 1, 'desde': [664, 3425]}
DR {'k': 'DEP', 'ri': 4703, 'tipo': 1, 'nombre': '', 'largo': 339, 'ancho': 4, 'wMin': 4, 'wMax': 7.8, 'flags': 1, 'desde': [-2295, -246]}
DR {'k': 'DEP', 'ri': 1722, 'tipo': 14, 'nombre': '', 'largo': 337, 'ancho': 5.2, 'wMin': 5.2, 'wMax': 5.2, 'flags': 5, 'desde': [838, 2852]}
DR {'k': 'DEP', 'ri': 5125, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 328, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-2938, -203]}
DR {'k': 'DEP', 'ri': 1567, 'tipo': 1, 'nombre': '', 'largo': 326, 'ancho': 7.8, 'wMin': 7.8, 'wMax': 7.8, 'flags': 5, 'desde': [1229, 2362]}
DR {'k': 'DEP', 'ri': 2293, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 323, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-600, 445]}
DR {'k': 'RAISE', 'ri': 1747, 'tipo': 0, 'nombre': 'Autovía Interconexión Norte-Sur', 'largo': 320, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [867, 3137]}
DR {'k': 'DEP', 'ri': 7, 'tipo': 1, 'nombre': '', 'largo': 307, 'ancho': 7.8, 'wMin': 7.8, 'wMax': 7.8, 'flags': 5, 'desde': [1048, 2525]}
DR {'k': 'RAISE', 'ri': 1569, 'tipo': 0, 'nombre': 'Autovía Interconexión Norte-Sur', 'largo': 299, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [957, 2851]}
DR {'k': 'DEP', 'ri': 1276, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 298, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-294, 787]}
DR {'k': 'RAISE', 'ri': 2427, 'tipo': 7, 'nombre': '', 'largo': 293, 'ancho': 4, 'wMin': 4, 'wMax': 10.4, 'flags': 1, 'desde': [827, 3144]}
DR {'k': 'RAISE', 'ri': 635, 'tipo': 10, 'nombre': 'Camino Las Estaciones', 'largo': 283, 'ancho': 5.8, 'wMin': 5.8, 'wMax': 8, 'flags': 0, 'desde': [316, -146]}
DR {'k': 'DEP', 'ri': 3627, 'tipo': 4, 'nombre': '', 'largo': 274, 'ancho': 7, 'wMin': 7, 'wMax': 9.1, 'flags': 1, 'desde': [-330, 804]}
DR {'k': 'DEP', 'ri': 3626, 'tipo': 4, 'nombre': '', 'largo': 267, 'ancho': 4, 'wMin': 4, 'wMax': 9.1, 'flags': 1, 'desde': [-522, 1014]}
DR {'k': 'RAISE', 'ri': 2574, 'tipo': 3, 'nombre': 'Vía de Ronda de La Laguna', 'largo': 265, 'ancho': 7, 'wMin': 7, 'wMax': 13, 'flags': 0, 'desde': [400, -293]}
DR {'k': 'DEP', 'ri': 1265, 'tipo': 0, 'nombre': 'Autopista del Norte', 'largo': 263, 'ancho': 12, 'wMin': 12, 'wMax': 13.4, 'flags': 1, 'desde': [-368, 674]}
DR {'k': 'DEP', 'ri': 1984, 'tipo': 3, 'nombre': 'Vía de Ronda de La Laguna', 'largo': 259, 'ancho': 14.4, 'wMin': 13.2, 'wMax': 17.2, 'flags': 0, 'desde': [660, 702]}
DR {'k': 'RAISE', 'ri': 5103, 'tipo': 14, 'nombre': '', 'largo': 239, 'ancho': 2.4, 'flags': 0, 'desde': [-2954, 55]}
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json
