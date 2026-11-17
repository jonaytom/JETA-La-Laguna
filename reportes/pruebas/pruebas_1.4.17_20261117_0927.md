# Pruebas 1.4.17 — 2026-11-17 09:27 — 0/1 OK

Listas: v1417a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 71 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1416.py` | **FALLA** | 16 s |

## Detalle

### 1. prueba_1416.py — FALLA

```
blanco {'from': [-758, -364], 'at': [-761.4641016151378, -366], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
recorridos 41 · al alcance 40 acaban en la siguiente 32 · lejos 1 acaban más cerca 1
   no llega {'line': 'obispo', 'title': 'Un partido por la Catedral', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'El torneo de la parroquia', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Un partido por La Concepción', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'El clásico de las cofradías', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Fuego en la ermita', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'La carrera de los sacristanes', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Curas contra concejales', 'D': 0, 'end': None}
   no llega {'line': 'secreta', 'title': 'Al pirómano, agua', 'D': 0, 'end': None}
RECORRIDOS_HACIA_LA_SIGUIENTE FALLA
pilotos {'troceen': [1128], 'clip': [1128], 'torson': [1128], 'beluga': [1104], 'reventon': [1128]}
PILOTOS_PROPIOS OK
errores []
PRUEBA 1416 FALLA
```
