# Pruebas 1.4.16 — 2026-11-17 08:38 — 1/2 OK

Listas: v1416. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 392 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1416.py` | **FALLA** | 15 s |
| 2 | `prueba_misiones.py` | **OK** | 351 s |

## Detalle

### 1. prueba_1416.py — FALLA

```
blanco {'from': [-758, -364], 'at': [-761.4641016151378, -366], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
fin [-1600, -700] misiones 48 quedan contigo 32 lejos sin quedar []
fin [700, 1300] misiones 48 quedan contigo 31 lejos sin quedar []
fin [-2500, -300] misiones 48 quedan contigo 37 lejos sin quedar []
   MAL {'line': 'story', 'title': 'Vuelta al barrio', 'start': [-760, -365], 'meet': [-2100, -315], 'fromEnd': 400, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
   MAL {'line': 'story', 'title': 'Una botella para Coco', 'start': [-298, -259], 'meet': [-2083, -308], 'fromEnd': 417, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
   MAL {'line': 'story', 'title': 'Sastrón', 'start': [-217, -305], 'meet': [-2087, -313], 'fromEnd': 413, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
   MAL {'line': 'story', 'title': 'La firma de la banda', 'start': [-532, -354], 'meet': [-2098, -313], 'fromEnd': 402, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
   MAL {'line': 'story', 'title': 'Boca Papa te enseña a comer', 'start': [-532, -354], 'meet': [-2098, -313], 'fromEnd': 402, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
   MAL {'line': 'story', 'title': 'El campo de tiro de El Blanco', 'start': [-760, -365], 'meet': [-2100, -315], 'fromEnd': 400, 'inside': False, 'road': False, 'walk': False, 'walkStart': True, 'fixed': False}
fin [1200, -400] misiones 48 quedan contigo 37 lejos sin quedar []
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
