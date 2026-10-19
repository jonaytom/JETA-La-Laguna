# Pruebas 0.77.0 — 2026-10-19 14:14 — 2/3 OK

Listas: v078b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 94 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_078.py` | **FALLA** | 76 s |
| 2 | `prueba_arranque.py` | **OK** | 0 s |
| 3 | `audit_obstaculos.py` | **OK** | 0 s |

## Detalle

### 1. prueba_078.py — FALLA

```
pasajes {"hechos": [{"name": "", "x": 865.25, "z": 2792, "len": 42.2, "ancho": 2.6}, {"name": "", "x": -294.4512195121951, "z": 278.5609756097561, "len": 8, "ancho": 2.6}, {"name": "", "x": 1269.3702227296071, "z": 1974.6882962117322, "len": 2.3, "ancho": 2.6}, {"name": "", "x": 1244.3843227249386, "z": 1978.8526128791768, "len": 1.8, "ancho": 2.6}, {"name": "", "x": 1274.25, "z": 1974, "len": 7.6, "ancho": 2.6}, {"name": "", "x": 1279.3652987764171, "z": 1973.3483001359537, "len": 2.7, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -436.7251655629139, "z": -274.7069536423841, "len": 21.3, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -448.1754966887417, "z": -255.1208609271523, "len": 5.8, "ancho": 2.6}, {"name": "Pasaje de la Concepción", "x": -443.0794701986755, "z": -263.8377483443709, "len": 1.6, "ancho": 2.6}, {"name": "Pasaje Aguere", "x": -201.51006941069437, "z": 21.912870685487142, "len": 67.5, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -182.69088278920657, "z": -21.8636938986106, "len": 6.3, "ancho": 3.8}, {"name": "Pasaje Aguere", "x": -173.24675324675326, "z": -42.522727272727266, "len": 13.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -160.68602362204723, "z": -87.85728346456693, "len": 52.8, "ancho": 3.8}, {"name": "Pasaje Teide", "x": -174.6968503937008, "z": -64.36220472440945, "len": 2, "ancho": 3.8}, {"name": "Pasaje Teide", "cubierta": true, "x": -175, "z": -64, "len": 2}, {"name": "Pasaje Teide", "x": -146.6751968503937, "z": -111.35236220
andando [{'a': [-177, -60], 'llega': False, 'falta': 7.4, 'y': 2.8}, {'a': [-168, -54], 'llega': True, 'falta': 1.1, 'y': 2.5}, {'a': [-184, -19], 'llega': True, 'falta': 1.1, 'y': 0.7}, {'a': [-188, -9], 'llega': True, 'falta': 1.2, 'y': 0.1}, {'a': [-218, 58], 'llega': False, 'falta': 17.9, 'y': -3}]
foto v078_teide_entrada
foto v078_teide_dentro
foto v078_herradores
foto v078_patio_suelo
foto v078_patio_mural
foto v078_patio_escalera
foto v078_patio_alto
foto v078_juego
errores []
PRUEBA 078 FALLA
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 26, 'peor': 119, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 3. audit_obstaculos.py — OK

```
obstacles 0
[]
```

Fotos/archivos nuevos en `tests/shots/`: audit_obstaculos.json, v078_herradores.jpg, v078_juego.jpg, v078_patio_alto.jpg, v078_patio_escalera.jpg, v078_patio_mural.jpg, v078_patio_suelo.jpg, v078_teide_dentro.jpg, v078_teide_entrada.jpg
