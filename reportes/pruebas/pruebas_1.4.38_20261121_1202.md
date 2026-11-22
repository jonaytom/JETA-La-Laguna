# Pruebas 1.4.38 — 2026-11-21 12:02 — 3/3 OK

Listas: version. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 24 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_modelos_1438_gpu.py` | **OK** | 0 s |
| 2 | `prueba_luces_pasos_1437_gpu.py` | **OK** | 0 s |
| 3 | `prueba_077.py` | **OK** | 2 s |

## Detalle

### 1. prueba_modelos_1438_gpu.py — OK

```
Modelos revisados cargados: 12
Fallos: []
PRUEBA MODELOS 1.4.38 OK
```

### 2. prueba_luces_pasos_1437_gpu.py — OK

```
{'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 65, 'missing': [], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True}
FAROS Y PASOS OK
```

### 3. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 9108, 'juntadas': 8283, 'mallas': 1926, 'ms': 176, 'no': {'con hijos (se juntan desde v1.0.0)': 492, 'pieza singular': 13, 'varios materiales': 2, 'userData': 462, 'onBeforeRender': 2, 'grupo con nombre': 4608}, 'ejemplos': {'con hijos (se juntan desde v1.0.0)': [[174, -620, 'CylinderGeometry'], [172, -621, 'CylinderGeometry'], [173, -618, 'CylinderGeometry'], [171, -619, 'CylinderGeometry'], [181, -617, 'CylinderGeometry'], [179, -618, 'CylinderGeometry']], 'pieza singular': [[0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [0, 0, 'BufferGeometry'], [-772, -415, 'PlaneGeometry']], 'varios materiales': [[2269, 3389, 'BoxGeometry'], [2238, 3460, 'CylinderGeometry']], 'userData': [[-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-399, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry'], [-400, 749, 'BoxGeometry']], 'onBeforeRender': [[143, 5, 'CylinderGeometry'], [-147, -618, 'ShapeGeometry']]}, 'ultimoId': 28466}, 'fusion': 1926, 'celdas': 5519, 'lod': 12050, 'peatones_enteros': 29}
distancia {'cerca': [53, 53], 'lejos': [0, 8898], 'niebla': 1075}
aparcados {'grupos': 5413, 'coches': 7603, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 15897 ms; plazas [448] aparcados [580]
junta piezas 8274
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 8274
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

Fotos/archivos nuevos en `tests/shots/`: faros1437_apagados.jpg, faros1437_encendidos.jpg, v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg
