# Pruebas 0.79.0 — 2026-10-19 20:05 — 1/2 OK

Listas: v080a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 90 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_080.py` | **FALLA** | 70 s |
| 2 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_080.py — FALLA

```
abre True
foto v080_titulo
vista a los 9 s demo
foto v080_demo
vista a los 21 s scores
foto v080_records
modo play
foto v080_fase1
CICLO OK
movimientos {'anda': 153, 'salto': 57, 'salto_pastor': 109, 'avance_pertiga': 279}
pogo {'pogo_mata': True, 'rebote': True}
foto v080_salto
MOVIMIENTOS OK
recorrido [{'fase': 1, 'avance': 0.82, 'caidas': 16, 'pasada': False, 'donde': [749, 112, 46], 'alturas': [4, 4, 4, 5, 5, 5, 5, 3, 3]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3321, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES FALLA
jefe {'empieza': 'speech', 'huye': True, 'fase': 3}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Pedirle a El Blanco jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1}
BLANCO OK
errores []
PRUEBA 080 FALLA
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 39, 'peor': 73, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v080_demo.jpg, v080_fase1.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg
