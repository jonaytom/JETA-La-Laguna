# Pruebas 1.1.2 — 2026-11-03 22:42 — 2/2 OK

Listas: v1102a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 79 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `herramientas/sonda_aparcamiento.py` | **OK** | 59 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 27, 'peor': 125, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. herramientas/sonda_aparcamiento.py — OK

```
calles miradas: 2794
  ancho:0    807
  ancho:1    1018
  ancho:2    605
  nada:0     307
  osm:0      5
  osm:1      39
  osm:2      11
  tira:1     2
foto 0 -276 118 Calle San Juan
foto 1 2074 1590 Calle Chimbeske
foto 2 850 2380 Calle Igualdad
foto 3 2394 3846 Calle Rosalía de Castro
foto 4 1282 3672 Calle San Manuel
foto 5 1757 3600 
SONDA APARCAMIENTO OK
```

Fotos/archivos nuevos en `tests/shots/`: aparca_0.jpg, aparca_1.jpg, aparca_2.jpg, aparca_3.jpg, aparca_4.jpg, aparca_5.jpg
