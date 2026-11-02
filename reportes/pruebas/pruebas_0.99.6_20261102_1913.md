# Pruebas 0.99.6 — 2026-11-02 19:13 — 7/7 OK

Listas: v0997b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 154 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `sonda_juandevera.py` | **OK** | 0 s |
| 2 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 106 s |
| 3 | `prueba_recorte.py` | **OK** | 2 s |
| 4 | `prueba_0995.py` | **OK** | 0 s |
| 5 | `prueba_078.py` | **OK** | 23 s |
| 6 | `prueba_0996.py` | **OK** | 0 s |
| 7 | `prueba_bordes.py` | **OK** | 0 s |

## Detalle

### 1. sonda_juandevera.py — OK

```
círculos [[22435, -148.79, -235.34, 0.4]]
objetos [['mesh', '', 'BufferGeometry', -148.8, 4.1, -235.3, 'd9d9d9'], ['mesh', '', 'BufferGeometry', -148.8, 4.1, -235.3, 'd9d9d9'], ['mesh', '', 'TorusGeometry', -148.7, 4.1, -235.4, '3a2a1a'], ['mesh', '', 'CircleGeometry', -148.7, 4.1, -235.5, 'bfd6e0'], ['mesh', '', 'BoxGeometry', -148.7, 4.1, -235.4, '3a2a1a'], ['mesh', '', 'TorusGeometry', -148.7, 4.1, -235.5, '3a2a1a'], ['mesh', '', 'CircleGeometry', -148.7, 4.1, -235.5, 'bfd6e0'], ['mesh', '', 'BoxGeometry', -148.8, 4.2, -235.4, '3a2a1a'], ['mesh', '', 'BoxGeometry', -148.7, 4.1, -235.5, '3a2a1a'], ['mesh', '', 'SphereGeometry', -148.7, 4.2, -235.4, '2e8b57'], ['mesh', '', 'BoxGeometry', -148.8, 3.7, -235.4, 'f2c12e'], ['mesh', '', 'BoxGeometry', -148.7, 3.7, -235.3, 'f2c12e'], ['mesh', '', 'BoxGeometry', -148.9, 3.9, -235.1, '9a2a2a'], ['mesh', '', 'BufferGeometry', -148.8, 2.6, -235.3, 'd9d9d9'], ['mesh', '', 'BufferGeometry', -148.8, 2.6, -235.3, 'ffffff'], ['mesh', '', 'BufferGeometry', -148.8, 2.6, -235.3, 'ffffff'], ['mesh', '', 'BoxGeometry', -147.9, 2.8, -235.1, '9c5ea8'], ['mesh', '', 'CylinderGeometry', -149.7, 3.8, -235.5, 'e8dcc0'], ['mesh', '', 'CylinderGeometry', -149.7, 3, -235.5, '3a3a3a']]
npc []
SONDA JUAN DE VERA OK
```

### 2. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

### 3. prueba_recorte.py — OK

```
recortados 3826 de 6521 · siguen metidos ≥ 1 m: 121
   [1, 230, 4.9, '']
   [539, 1171, 4.9, 'Edificio Beneharo']
   [241, 771, 4.2, '']
   [1424, 3934, 3.3, '']
   [-938, 1479, 3.3, '']
   [-2730, -287, 3.3, '']
   [-1799, -757, 3.2, '']
   [-1895, 1369, 3, '']
   [664, 1528, 3, '']
   [3334, 1991, 3, '']
   [-4699, 92, 2.8, '']
   [1506, 2926, 2.7, '']
   [1729, 3787, 2.6, 'Mercadona']
   [-115, 1263, 2.6, '']
   [547, 1406, 2.6, '']
   [1967, 1409, 2.6, 'Portal 3']
   [-187, 709, 2.6, '']
   [-3414, -424, 2.6, '']
   [3179, 2047, 2.6, '']
   [-1118, 1754, 2.5, '']
   [-882, -445, 2.5, '']
   [847, 1669, 2.5, '']
   [-3537, -193, 2.5, '']
   [3275, 2044, 2.5, '']
   [686, 1684, 2.4, '']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 4. prueba_0995.py — OK

```
aparcados sobre carretera grande 0 de 9148
texturas de carriles ['aL_o3_104', 'aL_o3_117', 'aL_t2_104', 'aL_o2_78m', 'aL_o3_134m', 'aL_t4_129', 'aL_o3_130', 'aL_t2_117', 'aL_t4_130', 'aL_o2_91', 'aL_t4_172', 'aL_o4_148m', 'aL_o2_86', 'aL_o2_66', 'aL_o2_78', 'aL_o3_120', 'aL_o3_129', 'aL_o2_90m', 'aL_o5_182', 'aL_o5_185m', 'aL_o3_111m']
bionda en los bordes de autopista y enlaces 110 tramos, 8412 m
carriles de aceleración / deceleración 18
SIN COCHES EN LA AUTOPISTA Y CARRILES OK
errores []
PRUEBA 0995 OK
```

### 5. prueba_078.py — OK

```
pasajes {"hechos": [{"name": "", "x": 456.29562767048697, "z": 428.90183356307745, "len": 22.3, "ancho": 2.6, "y": -35.1}, {"name": "", "x": 377.5, "z": 421.5, "len": 2.2, "ancho": 2.6, "y": -27.8}, {"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6, "y": -96.7}, {"name": "", "x": 276.7144844253363, "z": 1056.846389405589, "len": 24.3, "ancho": 2.6, "y": -41.2}, {"name": "", "x": 269.04459734005036, "z": 1068.1464831919398, "len": 3, "ancho": 2.6, "y": -40.8}, {"name": "", "x": 482.869665628627, "z": 1258.176235529049, "len": 16.7, "ancho": 2.6, "y": -64.8}, {"name": "", "x": 490.75, "z": 1250.5, "len": 5.3, "ancho": 2.6, "y": -65.6}, {"name": "", "x": 493.75, "z": 1247, "len": 3.9, "ancho": 2.6, "y": -65.8}, {"name": "", "x": 497.5, "z": 1242.25, "len": 8.2, "ancho": 2.6, "y": -66.1}, {"name": "", "x": 503.7623791729359, "z": 1235.0024721287557, "len": 11, "ancho": 2.6, "y": -66.6}, {"name": "", "x": 285.149754297432, "z": 1000.1472132404833, "len": 19.3, "ancho": 2.6, "y": -42.9}, {"name": "", "x": 237.89804497056622, "z": 1052.1529325441506, "len": 18.4, "ancho": 2.6, "y": -40.9}, {"name": "", "x": 245, "z": 1041.25, "len": 7.6, "ancho": 2.6, "y": -41.1}, {"name": "", "x": 250.75, "z": 1032.5, "len": 13.3, "ancho": 2.6, "y": -41.4}, {"name": "", "x": 257.75, "z": 1021.75, "len": 12.3, "ancho": 2.6, "y": -41.8}, {"name": "", "x": 268.5, "z": 1005, "len": 27.5, "ancho": 2.6, "y": -42.3}, {"name": "", "x": 253.67107742897838, "z": 1026.4671212043431, "len": 2, "ancho": 2.
andando arriba [{'a': [-177, -60], 'llega': True, 'cerca': None, 'falta': 0.9, 'y': 2.53, 'bajo': False, 'camY': 5.22, 'techo': None, 'donde': [-176.5, -60.7], 'delante': None}, {'a': [-168, -54], 'llega': True, 'cerca': None, 'falta': 0.8, 'y': 2.5, 'bajo': False, 'camY': 5.19, 'techo': None, 'donde': [-168.6, -54.5], 'delante': None}]
camara bajo techo [(4.95, 5.247257559348862)]
bajando [([-174.9, -38.9], True, 1.79, False, 4.81), ([-176.9, -34.6], True, 1.56, False, 7.12), ([-173.6, -31.4], True, 1.47, False, 9.76), ([-173.5, -30.1], True, 1.43, False, 9.71), ([-173.6, -29.5], True, 1.41, False, 9.69), ([-173.7, -28.9], True, 1.14, True, 9.42), ([-173.9, -28.3], True, 0.61, True, 8.89), ([-174.2, -27.7], True, -0.16, True, 7.74), ([-174.6, -27.2], True, -0.33, True, 7.46), ([-175, -26.7], True, -0.96, True, 7), ([-175.5, -26.3], True, -1.18, True, 6.69), ([-176, -25.9], True, -1.57, True, 6.21), ([-176.6, -25.6], True, -2.03, True, 5.93), ([-177.1, -25.4], True, -2.35, True, 5.48), ([-177.8, -25.2], True, -2.91, True, 4.88), ([-178.4, -25.1], True, -3.17, True, 4.78), ([-178.7, -25.1], True, -3.4, True, 4.46), ([-180.9, -25.8], True, -3.92, True, -0.72), ([-184, -19], True, -3.92, True, -0.82), ([-188, -9], True, -3.92, True, -0.82), ([-217.5, 58.5], True, -3.81, False, 4.47)]
patio {'x': -179, 'z': -30, 'r': 6.3, 'yU': 1.33, 'yL': -4.02, 'escaleras': 2, 'peldanos': 30, 'galeria_baja': 91.9, 'salida': [-217, 59]} bajada maxima entre puntos 0.77 llega abajo True
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
foto v0781_juego_cerca
foto v0781_patio_desde_rellano
foto v0781_patio_desde_abajo
foto v0781_escalera_abajo
foto v0781_galeria_baja
foto v0781_galeria_hacia_juego
errores []
PRUEBA 078 OK
```

### 6. prueba_0996.py — OK

```
paso 564 hundido 4.29 m, pendiente máx 0.097 cruces (vía, x, z, hueco m): [[2023, 639, -1154, 6.4]]
paso 658 hundido 2.38 m, pendiente máx 0.191 cruces (vía, x, z, hueco m): [[2021, 631, 592, 6.4]]
paso 892 hundido 5.68 m, pendiente máx 0.121 cruces (vía, x, z, hueco m): [[2331, 1504, 2767, 6.4], [2464, 1492, 2778, 6.4]]
paso 911 hundido 3.01 m, pendiente máx 0.199 cruces (vía, x, z, hueco m): [[1293, 1831, 3131, 6.58], [2464, 1818, 3144, 6.58]]
paso 919 hundido 2.9 m, pendiente máx 0.173 cruces (vía, x, z, hueco m): [[1293, 1799, 3095, 6.65], [2464, 1786, 3107, 6.6]]
paso 1082 hundido 5.49 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): [[3098, 2208, 3277, 6.43]]
paso 1666 hundido 7.03 m, pendiente máx 0.132 cruces (vía, x, z, hueco m): [[1516, 1112, 2486, 7.53], [3373, 1118, 2477, 7.51]]
paso 1973 hundido 6.33 m, pendiente máx 0.144 cruces (vía, x, z, hueco m): []
paso 2706 hundido 5.36 m, pendiente máx 0.108 cruces (vía, x, z, hueco m): []
paso 3021 hundido 5.51 m, pendiente máx 0.076 cruces (vía, x, z, hueco m): []
paso 3396 hundido 5.36 m, pendiente máx 0.082 cruces (vía, x, z, hueco m): []
paso 3631 hundido 5.43 m, pendiente máx 0.161 cruces (vía, x, z, hueco m): [[1774, -342, 803, 6.4]]
paso 3662 hundido 2.38 m, pendiente máx 0.215 cruces (vía, x, z, hueco m): []
paso 3706 hundido 6.04 m, pendiente máx 0.136 cruces (vía, x, z, hueco m): [[2310, 1497, 1720, 6.4], [2311, 1474, 1695, 6.38]]
paso 5096 hundido 5.36 m, pendiente máx 0.267 cruces (vía, x, z, hueco m): []
paso 5135 hundido 5.44 m, pendiente máx 0.08 cruces (vía, x, z, hueco m): []
paso 5145 hundido 5.36 m, pendiente máx 0.154 cruces (vía, x, z, hueco m): []
PASOS INFERIORES CORTOS 17 OK
errores []
PRUEBA 0996 OK
```

### 7. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
