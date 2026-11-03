# Pruebas 1.0.1 — 2026-11-03 14:43 — 3/3 OK

Listas: v1001d. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 101 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_carpeta.py` | **OK** | 62 s |
| 2 | `prueba_recorte.py` | **OK** | 11 s |
| 3 | `herramientas/foto_invasiones.py` | **OK** | 8 s |

## Detalle

### 1. prueba_carpeta.py — OK

```
carpeta {'datos': True, 'calles': 5571, 'edificios': 6315, 'version': 'v1.0.1'}
errores []
CARPETA OK
```

### 2. prueba_recorte.py — OK

```
recortados 4808 de 6288 · siguen metidos ≥ 1 m: 18
   [1424, 3934, 3.3, '']
   [-4699, 92, 2.8, '']
   [-181, 778, 2.6, 'Intercambiador de La Laguna']
   [783, 3065, 2.1, '']
   [-1799, -757, 2, '']
   [1696, 4075, 2, '']
   [-857, 279, 1.9, '']
   [664, 1528, 1.7, '']
   [-892, 1471, 1.6, '']
   [172, -767, 1.5, '']
   [-11, -253, 1.5, '']
   [2101, 1450, 1.4, '']
   [29, -295, 1.4, '']
   [-1633, -195, 1.3, '']
   [2747, 1923, 1.3, '']
   [3190, 2057, 1.3, '']
   [-84, -49, 1.3, 'Casa Riquel']
   [2270, 3396, 1, 'Área de Hospitalización']
foto recorte_barcelona
foto recorte_menceyes
foto recorte_herradores
foto recorte_nava_grimon
foto recorte_valle_tabares
errores JS []
RECORTE OK
```

### 3. herramientas/foto_invasiones.py — OK

```
 1. X 70, Y 220 · secundaria sin nombre (junto a C. Herradores) · calle del juego: (sin nombre) 13 m · invade_01_arriba.jpg / _calle.jpg
 2. X 46, Y 197 · C. Herradores · Capilla de la Cruz Verde · calle del juego: Calle Herradores 12 m · invade_02_arriba.jpg / _calle.jpg
 3. X 149, Y -623 · calle de servicio · Mercado de La Laguna · calle del juego: (sin nombre) 5.2 m · invade_03_arriba.jpg / _calle.jpg
 4. X -6, Y -242 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_04_arriba.jpg / _calle.jpg
 5. X 14, Y -300 · C. Tabares de Cala · calle del juego: Calle Tabares de Cala 9.8 m · invade_05_arriba.jpg / _calle.jpg
 6. X -65, Y -58 · C. Tabares de Cala · Casa Riquel · calle del juego: Calle Tabares de Cala 9.8 m · invade_06_arriba.jpg / _calle.jpg
 7. X -912, Y -407 · Av. Lucas Vega / Callejón Montaraz · calle del juego: Avenida Lucas Vega 5.9 m · invade_07_arriba.jpg / _calle.jpg
FOTOS INVASIONES OK
```

Fotos/archivos nuevos en `tests/shots/`: invade_01_arriba.jpg, invade_01_calle.jpg, invade_02_arriba.jpg, invade_02_calle.jpg, invade_03_arriba.jpg, invade_03_calle.jpg, invade_04_arriba.jpg, invade_04_calle.jpg, invade_05_arriba.jpg, invade_05_calle.jpg, invade_06_arriba.jpg, invade_06_calle.jpg, invade_07_arriba.jpg, invade_07_calle.jpg, recorte_barcelona.jpg, recorte_herradores.jpg, recorte_menceyes.jpg, recorte_nava_grimon.jpg, recorte_valle_tabares.jpg
