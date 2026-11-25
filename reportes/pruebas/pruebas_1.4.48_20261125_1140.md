# Pruebas 1.4.48 — 2026-11-25 11:40 — 6/6 OK

Listas: tmp_geneto. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 23 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calles_en.py -310 1185 15` | **OK** | 0 s |
| 2 | `herramientas/sonda_recorte_pasos.py -320 1179` | **OK** | 0 s |
| 3 | `herramientas/sonda_recorte_pasos.py -155 2314` | **OK** | 0 s |
| 4 | `herramientas/sonda_recorte_pasos.py -126 2536` | **OK** | 0 s |
| 5 | `herramientas/foto_puntos.py geneto_pts.json` | **OK** | 0 s |
| 6 | `prueba_mapa_reventon_1439_gpu.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_calles_en.py -310 1185 15 — OK

```
CALLE {'ri': 1772, 'tipo': 5, 'nombre': 'Carretera de San Miguel de Geneto', 'ancho': 6.5, 'wMax': 11.7, 'wMin': 6.5, 'swMin': 0, 'flags': 0, 'dist': 9.5, 'desde': [-342, 797], 'puntos': 71}
```

### 2. herramientas/sonda_recorte_pasos.py -320 1179 — OK

```
PASOS {"indice":690,"puntos":[[-316,1175],[-298,1173],[-298,1176],[-310,1178],[-306,1203],[-314,1203]],"mapa":221,"inset":165,"trim":165,"roadClip":167,"rbClip":167,"calles":188,"motivos":["medio: quedaría muy poco (0 de 165 m²) [tramo -319,895 532 m, medio ancho 3.5]"],"final":[[-316,1175],[-298,1173],[-298,1175],[-311,1177],[-307,1202],[-314,1202]]}
```

### 3. herramientas/sonda_recorte_pasos.py -155 2314 — OK

```
PASOS {"indice":9670,"puntos":[[-149,2305],[-133,2300],[-132,2307],[-134,2308],[-134,2306],[-139,2308],[-139,2309],[-147,2312],[-151,2312],[-153,2306]],"mapa":130,"inset":112,"trim":112,"roadClip":112,"rbClip":112,"calles":117,"motivos":[],"final":[[-149,2305],[-134,2300],[-133,2307],[-133,2307],[-134,2305],[-140,2307],[-140,2309],[-147,2311],[-151,2312],[-153,2306]]}
```

### 4. herramientas/sonda_recorte_pasos.py -126 2536 — OK

```
PASOS {"indice":9666,"puntos":[[-121,2544],[-123,2535],[-109,2533],[-109,2538],[-113,2539],[-113,2543]],"mapa":100,"inset":78,"trim":78,"roadClip":78,"rbClip":78,"calles":84,"motivos":["final: perdería demasiado (25 de 78 m²)"],"final":[[-121,2543],[-122,2535],[-110,2533],[-110,2537],[-114,2538],[-114,2542]]}
```

### 5. herramientas/foto_puntos.py geneto_pts.json — OK

```

```

### 6. prueba_mapa_reventon_1439_gpu.py — OK

```
{'barrierScan': True, 'platforms': True, 'tramPaint': True, 'parkedTracks': True, 'bins': True, 'clearedRoad': [True, True, True, True, True, True, True, True, True], 'sanAntonioPaint': True, 'shedRemoved': True, 'zone': [True, True, True], 'garage': True, 'floor': True, 'drivable': True, 'rimLod': True, 'reventon': True, 'brakes': True, 'pedsMotorway': True}
PRUEBA MAPA Y REVENTON 1.4.39 OK
```

Fotos/archivos nuevos en `tests/shots/`: in_0.jpg, in_1.jpg, in_2.jpg
