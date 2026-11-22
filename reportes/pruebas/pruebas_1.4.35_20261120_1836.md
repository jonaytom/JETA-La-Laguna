# Pruebas 1.4.35 — 2026-11-20 18:36 — 5/5 OK

Listas: v1435. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 74 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_radio_1431_gpu.py` | **OK** | 1 s |
| 2 | `prueba_controles_1435_gpu.py` | **OK** | 22 s |
| 3 | `prueba_1427_gpu.py` | **OK** | 20 s |
| 4 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 5 | `prueba_1424.py` | **OK** | 0 s |

## Detalle

### 1. prueba_radio_1431_gpu.py — OK

```
{'hiddenOnFoot': True, 'inCar': True, 'station': 'Gofio FM 90.1'} {'emptyWhenOff': True, 'hiddenAfterExit': True} {'gofio': 7, 'aguere': 7, 'mojo': 4}
RADIO HUD Y MP3 OK
```

### 2. prueba_controles_1435_gpu.py — OK

```
Xbox {'requiresAim': True, 'aims': True, 'fires': True, 'releasesAim': True, 'drives': True, 'trackNext': True, 'trackPrevious': True, 'station': True, 'exitCar': True, 'map': True, 'mapZoom': True, 'waypoint': True, 'closeMap': True, 'pauses': True, 'selectsMenu': True, 'resumes': True, 'diary': True, 'closesDiary': True, 'basketStarts': True, 'basketPauses': True, 'basketResumes': True, 'footballStarts': True, 'footballPauses': True, 'footballResumes': True, 'navesLabel': True, 'navesPauses': True, 'navesExits': True, 'bencomoLabel': True, 'bencomoPauses': True, 'bencomoExits': True, 'guancheLabel': True, 'guanchePauses': True, 'guancheExits': True}
CONTROLES XBOX Y MÓVIL OK
```

### 3. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04359900027770064}, 'parked': {'models': 50, 'shades': 21, 'white': 0.04574299312533051}, 'liveTraffic': {'cars': 23, 'shades': 13, 'white': 0}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 4. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 18, 'finish': 57, 'length': 1162, 'checkpoints': 4, 'sign': 16, 'cafe': 16, 'legalGrid': True, 'bothFaceRace': True} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 5. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```
