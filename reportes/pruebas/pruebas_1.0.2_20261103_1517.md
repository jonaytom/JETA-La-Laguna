# Pruebas 1.0.2 — 2026-11-03 15:17 — 2/2 OK

Listas: v1002e. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 69 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_hueco.py -259 47 60` | **OK** | 50 s |
| 2 | `herramientas/sonda_hueco.py -213 46 40` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_hueco.py -259 47 60 — OK

```
planta (4, [[914, -298, 4, 0, 11], [918, -241, 84, 0, 5], [3662, -268, 37, 4, 5], [3876, -232, 33, 0, 16]])
pintados (4, [[-295, 7, '', 4], [-241, 85, '', 15], [-268, 37, 'Capilla Cruz de los Plateros', 7], [-237, 41, '', 11]])
quitados (0, [])
calles (6, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [37, 'Calle San Juan', 'tertiary', 10.4], [224, 'Calle el Juego', 'residential', 7.5], [225, 'Calle Seis de Diciembre', 'tertiary', 10.4], [754, 'Pasaje Aguere', 'pedestrian', 6], [781, 'Calle Hermano Mateo', 'residential', 7.5]])
areas (2, [[886, 'garden', '', -179, 12], [1486, 'square', '', -322, 7]])
vaciadas 237
SONDA HUECO OK
```

### 2. herramientas/sonda_hueco.py -213 46 40 — OK

```
planta (3, [[3863, -185, 56, 0, 4], [3872, -195, 47, 0, 6], [3876, -232, 33, 0, 16]])
pintados (3, [[-185, 56, '', 22], [-195, 47, '', 19], [-237, 41, '', 11]])
quitados (0, [])
calles (3, [[34, 'Calle Alfredo Torres Edwards', 'residential', 7.5], [224, 'Calle el Juego', 'residential', 7.5], [754, 'Pasaje Aguere', 'pedestrian', 6]])
areas (1, [[886, 'garden', '', -179, 12]])
vaciadas 237
SONDA HUECO OK
```

Fotos/archivos nuevos en `tests/shots/`: hueco.jpg
