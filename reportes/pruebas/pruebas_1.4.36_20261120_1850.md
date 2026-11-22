# Pruebas 1.4.36 — 2026-11-20 18:50 — 2/4 OK

Listas: v1436. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 58 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_leyenda_1436_gpu.py` | **FALLA** | 0 s |
| 2 | `prueba_radio_1431_gpu.py` | **FALLA** | 6 s |
| 3 | `prueba_controles_1435_gpu.py` | **OK** | 22 s |
| 4 | `prueba_prologo_1427.py` | **OK** | 3 s |

## Detalle

### 1. prueba_leyenda_1436_gpu.py — FALLA

```
FALLA AssertionError()
```

### 2. prueba_radio_1431_gpu.py — FALLA

```
FALLA TimeoutError('Page.wait_for_function: Timeout 6000ms exceeded.')
```

### 3. prueba_controles_1435_gpu.py — OK

```
Xbox {'requiresAim': True, 'aims': True, 'fires': True, 'releasesAim': True, 'noWeaponWhileDriving': True, 'drives': True, 'trackNext': True, 'trackPrevious': True, 'station': True, 'exitCar': True, 'weaponHudRestored': True, 'map': True, 'mapZoom': True, 'waypoint': True, 'closeMap': True, 'pauses': True, 'selectsMenu': True, 'resumes': True, 'diary': True, 'closesDiary': True, 'basketStarts': True, 'basketPauses': True, 'basketResumes': True, 'footballStarts': True, 'footballPauses': True, 'footballResumes': True, 'navesLabel': True, 'navesPauses': True, 'navesExits': True, 'bencomoLabel': True, 'bencomoPauses': True, 'bencomoExits': True, 'guancheLabel': True, 'guanchePauses': True, 'guancheExits': True}
CONTROLES XBOX Y MÓVIL OK
```

### 4. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': True, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

Fotos/archivos nuevos en `tests/shots/`: leyenda1436_pc.jpg
