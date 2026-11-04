# Pruebas 1.1.7 — 2026-11-04 10:27 — 1/2 OK

Listas: huella_cmp. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 72 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/huella_sprites.py comparar` | **OK** | 53 s |
| 2 | `herramientas/huella_mundo.py comparar` | **FALLA** | 0 s |

## Detalle

### 1. herramientas/huella_sprites.py comparar — OK

```
sprites dibujados: 102 (baloncesto 93 · guanche 9 )
distintos de la base: 0 []
faltan: []
HUELLA SPRITES OK
```

### 2. herramientas/huella_mundo.py comparar — FALLA

```
no llegó a ejecutarse en la carga compartida
=== INICIO herramientas/huella_sprites.py comparar
sprites dibujados: 102 (baloncesto 93 · guanche 9 )
distintos de la base: 0 []
faltan: []
HUELLA SPRITES OK
=== FIN herramientas/huella_sprites.py comparar 53
=== INICIO herramientas/huella_mundo.py comparar
vértices 44422946 · choques 81842 + 22910 · tableros 378 · edificios 9318
distinto de la base: 3 {'vertices': (44402079, 44422946), 'v:MeshStandardMaterial:tex': (4437033, 4488440), 'v:MeshStandardMaterial': (39913030, 39882490)}
HUELLA MUNDO: CAMBIA 3
```
