# Pruebas 0.99.6 — 2026-11-02 19:45 — 6/6 OK

Listas: v0997d. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 130 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `foto_fachadas.py` | **OK** | 81 s |
| 2 | `sonda_juandevera.py` | **OK** | 0 s |
| 3 | `prueba_recorte.py` | **OK** | 2 s |
| 4 | `prueba_078.py` | **OK** | 21 s |
| 5 | `prueba_093.py` | **OK** | 2 s |
| 6 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. foto_fachadas.py — OK

```
foto fach_00 -60 -230
foto fach_01 560 568
foto fach_02 659 1611
foto fach_03 836 1661
foto fach_04 200 600
foto fach_05 -1260 60
foto fach_06 1250 1960
foto fach_07 -130 -40
errores []
FOTOS FACHADAS OK
```

### 2. sonda_juandevera.py — OK

```
círculos []
objetos []
npc []
SONDA JUAN DE VERA OK
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

### 4. prueba_078.py — OK

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

### 5. prueba_093.py — OK

```
hojas 37 sin cargar []
foto v093_guanche_elegir
foto v093_guanche_magote
foto v093_guanche_mencey
foto v093_guanche_mirla
foto v093_guanche_montado
lagarto {'walk': 25.000000000000064} {'run': 47.99999999999993, 'running': True}
foto v093_guanche_jefes
foto v093_bencomo_titulo
bencomo dibujado 1
foto v093_bencomo_castellanos
foto v093_bencomo_agachado
foto v093_bencomo_golpebajo
foto v093_bencomo_lugo
LAGARTO CORRE OK
BENCOMO NUEVO OK
errores []
PRUEBA 093 OK
```

### 6. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 41, 'peor': 95, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: fach_00.jpg, fach_01.jpg, fach_02.jpg, fach_03.jpg, fach_04.jpg, fach_05.jpg, fach_06.jpg, fach_07.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg, v0781_escalera_abajo.jpg, v0781_galeria_baja.jpg, v0781_galeria_hacia_juego.jpg, v0781_juego_cerca.jpg, v0781_patio_desde_abajo.jpg, v0781_patio_desde_rellano.jpg, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg, v093_bencomo_agachado.jpg, v093_bencomo_castellanos.jpg, v093_bencomo_golpebajo.jpg, v093_bencomo_lugo.jpg, v093_bencomo_titulo.jpg, v093_guanche_elegir.jpg, v093_guanche_jefes.jpg, v093_guanche_magote.jpg, v093_guanche_mencey.jpg, v093_guanche_mirla.jpg, v093_guanche_montado.jpg
