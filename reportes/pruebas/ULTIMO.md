# Pruebas 1.4.22 — 2026-11-17 14:35 — 5/5 OK

Listas: v1422. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 449 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1422.py` | **OK** | 17 s |
| 2 | `prueba_persecuciones.py` | **OK** | 331 s |
| 3 | `prueba_misiones.py` | **OK** | 71 s |
| 4 | `prueba_canchas.py` | **OK** | 1 s |
| 5 | `prueba_arranque.py` | **OK** | 1 s |

## Detalle

### 1. prueba_1422.py — OK

```
{'route': 75, 'drive': {'secs': 98.51666666666667, 'len': 1912.9085268571528, 'maxDec': 9.775000000000063, 'minRadius': 5.030232048959656, 'drift': 0.2021497769561226, 'hbFrames': 509, 'done': True}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
PERSECUCION_TERMINA OK
SIN_FRENAZOS_EN_SECO OK
CURVAS_CON_RADIO OK
DERRAPA_EN_CURVAS OK
CAMPOS_VALLADOS OK
CANCHAS_VALLADAS OK
BOTONES_TACTILES OK
errores []
PRUEBA 1422 OK
```

### 2. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.29 m OK
[8] Los bancos del Adelantado: a pie: a 7 m, recorre 13 m en 3 s, salto máx 0.31 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 8 m en 3 s, salto máx 0.15 m OK
[12] El rally de La Esperanza: coche: a 6 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 10 m en 3 s, salto máx 0.16 m OK | a pie: a 10 m, recorre 12 m en 3 s, salto máx 0.16 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 3. prueba_misiones.py — OK

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
[18] El rifle de agua: PASA · dinero +-2200 · pasos talk>goto>shop>dlg>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 4. prueba_canchas.py — OK

```
   ['c7', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c8', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c9', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c10', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c11', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c12', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c13', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c14', 'door', 'la cancha (entrada por la calle)', 1, -169, -1131]
   ['c15', 'court', 'la cancha de Camino Fuente Cañizares', 5, -1040, -741]
   ['c16', 'door', 'la cancha (entrada por Avenida San Diego)', 4, -846, -908]
   ['c17', 'court', 'la cancha de Camino San Francisco de Paula', 4, -1129, 2004]
   ['c18', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 1, 2178, 2314]
   ['c19', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 5, 2182, 2300]
   ['c20', 'court', 'la cancha de baloncesto', 3, -116, 784]
   ['c21', 'court', 'la cancha de Calle Domingo González Pérez', 3, -637, 1575]
   ['c22', 'court', 'la cancha de Calle Domingo González Pérez', 3, -611, 1575]
   ['c23', 'court', 'la cancha de Calle Aries', 2, 1164, 1527]
   ['c24', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1979, 3754]
   ['c25', 'court', 'la cancha de baloncesto', 3, -152, 876]
   ['c26', 'court', 'la cancha de baloncesto', 4, -121, 887]
   ['c27', 'court', 'la cancha de baloncesto', 1, -1383, -918]
   ['c28', 'court', 'la cancha de Camino Vereda Barbados', 5, -1198, -1020]
   ['c29', 'court', 'la cancha de baloncesto', 4, -1361, -930]
   ['c30', 'door', 'la cancha (entrada por la calle)', 4, -1273, -1031]
   ['c31', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1691, 2095]
   ['c32', 'court', 'la cancha de Camino San Bartolomé de Geneto', 1, 236, 1782]
   ['c33', 'court', 'la cancha de baloncesto', 5, 1074, 2575]
   ['c34', 'court', 'la cancha de Calle Saturno', 3, 814, 1523]
   ['c35', 'court', 'la cancha de Calle Clemencia Hardisson', 4, 845, 1509]
   ['c36', 'court', 'la cancha de baloncesto', 1, 800, 1413]
   ['c37', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1966, 3829]
   ['c38', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 2, 1966, 3803]
   ['c39', 'court', 'la cancha de Calle Antonio Hernandez Arrón', 2, -1332, -626]
   ['c40', 'court', 'la cancha de Camino Tornero', 1, -1314, -650]
   ['c41', 'court', 'la cancha de baloncesto', 4, -1295, -467]
   ['c42', 'court', 'la cancha de baloncesto', 2, -1329, -474]
   ['c43', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 2, -1468, -512]
   ['c44', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1479, -526]
   ['c45', 'court', 'la cancha de Carretera General del Norte', 5, -1356, -318]
   ['c46', 'court', 'la cancha de "Avenida del Colesterol"', 3, 1828, 2050]
   ['mayex', 'door', 'Colegio Máyex', 1, -59, -425]
   ['c48', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1787, 2292]
   ['c49', 'court', 'la cancha de baloncesto', 1, 139, -993]
   ['c50', 'court', 'la cancha de baloncesto', 5, -641, 336]
   ['c51', 'court', 'la cancha de Avenida El Paso', 5, 1271, 3281]
   ['c52', 'court', 'la cancha de Calle Juan Pedro García', 3, 1887, 1581]
   ['c53', 'court', 'la cancha de Calle Rosalía de Castro', 3, 2420, 3883]
   ['c54', 'court', 'la cancha de baloncesto', 3, 2411, 3985]
   ['c55', 'court', 'la cancha de Paseo Oramas', 1, -553, -770]
   ['c56', 'court', 'la cancha de Calle Manuel Santaella', 5, 1599, 1579]
   ['c57', 'court', 'la cancha de Calle Marosilla', 2, 2396, 1952]
   ['c58', 'court', 'la cancha de Calle la Jara', 4, -2055, -124]
   ['c59', 'court', 'la cancha de Carretera General del Norte', 1, -4705, -447]
torneo ['Torneo Lagunero 1/5', 'Torneo Lagunero 2/5', 'Torneo Lagunero 3/5', 'Torneo Lagunero 4/5', 'Torneo Lagunero: la final']
mayex puerta detectada: mayex
snap entrada_mayex
riostejera puerta detectada: riostejera
snap entrada_rios_tejera
errores JS []
CANCHAS OK
```

### 5. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 46, 'peor': 70, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

Fotos/archivos nuevos en `tests/shots/`: entrada_mayex.jpg, entrada_rios_tejera.jpg
