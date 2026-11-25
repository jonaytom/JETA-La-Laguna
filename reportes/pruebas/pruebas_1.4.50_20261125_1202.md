# Pruebas 1.4.50 — 2026-11-25 12:02 — 1/1 OK

Listas: tmp_dep. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 55 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `audit_obstaculos.py` | **OK** | 1 s |

## Detalle

### 1. audit_obstaculos.py — OK

```
obstacles 80
[(('footway', 'unclassified'), 16), (('footway', 'service'), 9), (('footway', 'motorway_link'), 7), (('footway', 'motorway'), 7), (('primary', 'motorway_link'), 7), (('unclassified', 'motorway'), 6), (('service', 'service'), 4), (('motorway_link', 'motorway_link'), 3), (('motorway_link', 'tertiary'), 3), (('tertiary', 'motorway_link'), 2), (('primary', 'unclassified'), 2), (('motorway', 'residential'), 2), (('tertiary', 'motorway'), 1), (('primary', 'residential'), 1), (('primary', 'motorway'), 1), (('motorway', 'primary'), 1), (('motorway', 'secondary_link'), 1), (('primary', 'secondary'), 1), (('path', 'motorway'), 1), (('motorway_link', 'secondary_link'), 1)]
barreras en calzada 0 Counter()
```

Fotos/archivos nuevos en `tests/shots/`: audit_barreras.json, audit_obstaculos.json
