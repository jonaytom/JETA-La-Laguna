# Pruebas 1.3.0 — 2026-11-10 19:01 — 2/2 OK

Listas: hierba_s. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 55 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_hierba.py 600 700` | **OK** | 0 s |
| 2 | `herramientas/sonda_hierba.py -5 -545` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_hierba.py 600 700 — OK

```
HIERBA {"on":true,"counts":[1237,1309,248],"cls":[404,113,349,815],"total":[2163573,118103,227412,605920],"cell":79,"arb":true}
```

### 2. herramientas/sonda_hierba.py -5 -545 — OK

```
HIERBA {"on":true,"counts":[0,0,0],"cls":[0,0,0,1681],"total":[2163573,118103,227412,605920],"cell":0,"arb":true}
```
