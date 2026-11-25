# Pruebas 1.4.50 — 2026-11-25 13:35 — 2/2 OK

Listas: tmp_f. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 57 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_calles_en.py -1224 -7 15` | **OK** | 0 s |
| 2 | `herramientas/sonda_carriles_en.py -1224 -7 -839 -41` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_calles_en.py -1224 -7 15 — OK

```
CALLE {'ri': 1770, 'tipo': 9, 'nombre': 'Calle Espinero', 'ancho': 3.2, 'wMax': 7.9, 'wMin': 3.2, 'flags': 1, 'dist': 3.6, 'desde': [-1828, -152], 'puntos': 10}
CALLE {'ri': 309, 'tipo': 9, 'nombre': '', 'ancho': 8, 'wMax': 8, 'wMin': 8, 'flags': 4, 'dist': 6.5, 'desde': [-1232, -10], 'puntos': 2}
CALLE {'ri': 3654, 'tipo': 14, 'nombre': '', 'ancho': 2.4, 'flags': 4, 'dist': 8.4, 'desde': [-1234, -11], 'puntos': 2}
CALLE {'ri': 3204, 'tipo': 9, 'nombre': '', 'ancho': 8, 'wMax': 8, 'wMin': 5.8, 'flags': 0, 'dist': 8.5, 'desde': [-1254, 4], 'puntos': 5}
CALLE {'ri': 3656, 'tipo': 14, 'nombre': '', 'ancho': 2.4, 'flags': 0, 'dist': 10.8, 'desde': [-1236, -8], 'puntos': 2}
```

### 2. herramientas/sonda_carriles_en.py -1224 -7 -839 -41 — OK

```
GEMELOS 275 CONTINUIDAD 13 GRAFO 1637
PUNTO [-1224.0, -7.0] {"calles":[{"ri":1770,"nombre":"Calle Espinero","tipo":9,"sentido1":true,"ancho":3.2,"aparc":[],"carriles":1,"gemela":false,"dist":3.6},{"ri":309,"nombre":"","tipo":9,"sentido1":false,"ancho":8,"aparc":[],"carriles":2,"gemela":false,"dist":6.5}],"trafico":"TypeError: Cannot create property 'park' on number '2298'"}
PUNTO [-839.0, -41.0] {"calles":[{"ri":2345,"nombre":"Calle San Antonio","tipo":7,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":false,"dist":2.3},{"ri":1632,"nombre":"Calle San Antonio","tipo":7,"sentido1":true,"ancho":7,"aparc":[],"carriles":2,"gemela":true,"dist":4.1},{"ri":1629,"nombre":"Calle San Antonio","tipo":7,"sentido1":true,"ancho":4,"aparc":[],"carriles":1,"gemela":false,"dist":4.8}],"trafico":"TypeError: Cannot create property 'park' on number '2760'"}
```
