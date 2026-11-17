# Pruebas 1.4.17 — 2026-11-17 09:23 — 2/3 OK

Listas: v1417. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 431 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1416.py` | **FALLA** | 16 s |
| 2 | `prueba_misiones.py` | **OK** | 363 s |
| 3 | `prueba_persecuciones.py` | **OK** | 25 s |

## Detalle

### 1. prueba_1416.py — FALLA

```
blanco {'from': [-758, -364], 'at': [-761.3521677537498, -365.93040361008974], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
recorridos 41 · al alcance 40 acaban en la siguiente 22 · lejos 1 acaban más cerca 1
   no llega {'line': 'story', 'title': 'Vuelta al barrio', 'D': 547, 'end': None}
   no llega {'line': 'story', 'title': 'Una botella para Coco', 'D': 93, 'end': None}
   no llega {'line': 'story', 'title': 'Sastrón', 'D': 253, 'end': None}
   no llega {'line': 'story', 'title': 'El gofio robado', 'D': 319, 'end': None}
   no llega {'line': 'story', 'title': 'El carterista del Cristo', 'D': 466, 'end': None}
   no llega {'line': 'story', 'title': 'La guagua de la broma', 'D': 253, 'end': None}
   no llega {'line': 'obispo', 'title': 'Un partido por la Catedral', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'El torneo de la parroquia', 'D': 0, 'end': None}
RECORRIDOS_HACIA_LA_SIGUIENTE FALLA
pilotos {'troceen': [1128], 'clip': [1128], 'torson': [1128], 'beluga': [1104], 'reventon': [1128]}
PILOTOS_PROPIOS OK
errores []
PRUEBA 1416 FALLA
```

### 2. prueba_misiones.py — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
[7] Defensores de La Laguna: PASA · dinero +1000 · pasos dlg>idle
[8] Los bancos del Adelantado: PASA · dinero +900 · pasos talk>goto>talk>fight>shot>talk>idle
[9] El gofio robado: PASA · dinero +1100 · pasos talk>goto>talk>goto>talk>goto>talk>fight>enter>goto>talk>idle
[10] El carterista del Cristo: PASA · dinero +600 · pasos talk>goto>chase>talk>fight>idle
[11] Carrera solidaria del casco: PASA · dinero +700 · pasos talk>goto>idle
[12] El rally de La Esperanza: PASA · dinero +1200 · pasos talk>car>goto>countdown>goto>idle
[13] Baches en la Vía de Ronda: PASA · dinero +900 · pasos talk>enter>goto>idle
[14] Escolta a la guagua del Romero: PASA · dinero +1000 · pasos talk>car>escort>talk>idle
[15] La guagua de la broma: PASA · dinero +900 · pasos talk>car>escort>talk>idle
[16] Grafiteros en el tranvía: PASA · dinero +800 · pasos talk>goto>shot>talk>idle
[17] Noche en el aeropuerto: PASA · dinero +2000 · pasos talk>goto>damage>shot>talk>idle
[18] El rifle de agua: PASA · dinero +-50 · pasos talk>goto>shop>dlg>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 3. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.64 m OK
[8] Los bancos del Adelantado: a pie: a 7 m, recorre 11 m en 3 s, salto máx 0.16 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 8 m en 3 s, salto máx 0.15 m OK
[12] El rally de La Esperanza: coche: a 6 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 10 m en 3 s, salto máx 0.15 m OK | a pie: a 10 m, recorre 11 m en 3 s, salto máx 0.15 m OK
[17] Noche en el aeropuerto: coche: a 24 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```
