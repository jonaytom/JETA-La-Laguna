# Pruebas 1.1.9 — 2026-11-04 20:39 — 2/2 OK

Listas: viga. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 57 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_origen.py -1815 -200 35 3` | **OK** | 6 s |
| 2 | `herramientas/sonda_alturas.py -1815 -200 40` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_origen.py -1815 -200 35 3 — OK

```
origen en X -1815, Y -200 (radio 35 m, desde 3 m sobre el suelo); registradas 7740, activo True
== juntadas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== sueltas (función que la añadió | color | geometría | nombre: n · ejemplos [x, y, desde, hasta, ancho, fondo])
== ciudad fundida, triángulos fuera de los edificios (material: n · x, y, altura sobre el suelo · ejemplos)
      6  trim  X -1820..-1811  Y -192..-172  alt 3.1..3.5   []
== plantas de edificio cerca (índice, x, y, y los campos 0–5 de DATA.B)
  [1149, -1826, -136, 37, 1, 1, 0, -1, 140]
  [1151, -1808, -176, 37, 1, 1, 0, -1, 48]
  [1159, -1791, -154, 37, 1, 1, 0, -1, 271]
  [1527, -1802, -255, 68, 1, 2, 0, -1, 429]
SONDA ORIGEN OK
```

### 2. herramientas/sonda_alturas.py -1815 -200 40 — OK

```
     [0, -1822, -222, 24.56, 31.06, 0]
     [4, -1826, -224, 24.65, 31.15, 0]
     [8, -1830, -226, 24.72, 31.22, 0]
     [12, -1833, -228, 24.78, 31.28, 0]
     [16, -1837, -230, 24.82, 31.32, 0]
     [17, -1837, -230, 24.82, 31.32, 0]
{"ri": 1793, "nombre": "Calle Espinero", "tipo": 9, "ancho": 7.9, "flags": 1, "raise": false, "span": null, "dep": false, "grade": false}
     [28, -1802, -162, 30.25, 30.25, 0]
     [29, -1801, -162, 30.22, 30.22, 0]
{"ri": 1796, "nombre": "Calle el Amagante", "tipo": 12, "ancho": 5.2, "flags": 0, "raise": false, "span": null, "dep": false, "grade": false}
     [0, -1801, -162, 30.22, 30.22, 0]
{"ri": 2478, "nombre": "Autopista del Norte", "tipo": 0, "ancho": 13.4, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [0, -1793, -199, 23.67, 30.17, 0]
     [4, -1789, -198, 23.55, 30.05, 0]
     [8, -1785, -197, 23.41, 29.91, 0]
     [12, -1781, -195, 23.26, 29.76, 0]
     [12, -1781, -195, 23.26, 29.76, 0]
     [16, -1777, -194, 23.12, 29.62, 0]
{"ri": 2898, "nombre": "Autopista del Norte", "tipo": 0, "ancho": 13.4, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [59, -1778, -210, 23.28, 29.78, 0]
     [63, -1782, -211, 23.4, 29.9, 0]
     [67, -1786, -212, 23.53, 30.03, 0]
     [68, -1787, -213, 23.58, 30.08, 0]
     [72, -1791, -214, 23.71, 30.21, 0]
     [76, -1795, -215, 23.84, 30.34, 0]
     [80, -1799, -216, 23.96, 30.46, 0]
     [82, -1800, -216, 24.01, 30.51, 0]
     [86, -1804, -217, 24.11, 30.61, 0]
     [90, -1808, -218, 24.21, 30.71, 0]
     [94, -1812, -219, 24.3, 30.8, 0]
     [98, -1816, -220, 24.37, 30.87, 0]
     [102, -1820, -222, 24.48, 30.98, 0]
{"ri": 2899, "nombre": "Autopista del Norte", "tipo": 0, "ancho": 13.4, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [0, -1822, -222, 24.56, 31.06, 0]
     [4, -1826, -223, 24.67, 31.17, 0]
     [8, -1830, -224, 24.75, 31.25, 0]
     [12, -1834, -226, 24.83, 31.33, 0]
     [12, -1834, -226, 24.84, 31.34, 0]
     [16, -1838, -227, 24.91, 31.41, 0]
     [20, -1842, -228, 24.93, 31.43, 0]
{"ri": 4702, "nombre": "", "tipo": 1, "ancho": 7.8, "flags": 1, "raise": false, "span": null, "dep": true, "grade": false}
     [396, -1851, -209, 25.52, 32.02, 0]
     [398, -1849, -209, 25.46, 31.96, 0]
     [401, -1846, -209, 25.38, 31.88, 0]
     [405, -1842, -207, 25.33, 31.83, 0]
     [409, -1839, -205, 25.23, 31.73, 0]
     [413, -1835, -203, 25.1, 31.6, 0]
     [417, -1832, -202, 24.99, 31.48, 0]
     [419, -1830, -201, 24.96, 31.44, 0]
     [423, -1827, -200, 24.85, 31.33, 0]
     [427, -1823, -199, 24.75, 31.23, 0]
     [431, -1819, -197, 24.64, 31.12, 0]
     [435, -1815, -196, 24.49, 30.96, 0]
     [436, -1814, -196, 24.44, 30.92, 0]
     [440, -1810, -197, 24.27, 30.77, 0]
     [444, -1806, -197, 24.12, 30.62, 0]
     [448, -1802, -198, 23.98, 30.48, 0]
     [452, -1798, -199, 23.83, 30.33, 0]
     [456, -1794, -200, 23.72, 30.22, 0]
SONDA ALTURAS OK
```

Fotos/archivos nuevos en `tests/shots/`: origen_-1815_-200.txt
