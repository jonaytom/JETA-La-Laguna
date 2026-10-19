# Pruebas 0.79.0 — 2026-10-19 20:14 — 2/2 OK

Listas: v080a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 90 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_080.py` | **OK** | 69 s |
| 2 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_080.py — OK

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
recorrido [{'fase': 1, 'avance': 0.99, 'caidas': 0, 'pasada': True, 'donde': [3209, 176, 200], 'alturas': [3, 3, 3, 3, 3, -1, -1, -1, -1]}, {'fase': 2, 'avance': 0.98, 'caidas': 1, 'pasada': True, 'donde': [3320, 160, 207], 'alturas': [4, 4, 4, 4, 4, 4, -1, -1, -1]}]
FASES OK
jefe {'empieza': 'speech', 'huye': True, 'fase': 3}
foto v080_vuelta2
JEFE OK
fin de partida {'m1': 'cont', 'm2': 'name', 'top': ['BCA', 987650], 'modo': 'attract'}
foto v080_records_nuevo
RECORDS OK
casa de El Blanco {'hay_blanco': True} {'aviso': '<kbd>E</kbd> Pedirle a El Blanco jugar a su máquina: BENCOMO', 'abre': True, 'punto': 1}
BLANCO OK
errores []
PRUEBA 080 OK
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 37, 'peor': 56, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: v080_demo.jpg, v080_fase1.jpg, v080_records.jpg, v080_records_nuevo.jpg, v080_salto.jpg, v080_titulo.jpg, v080_vuelta2.jpg
