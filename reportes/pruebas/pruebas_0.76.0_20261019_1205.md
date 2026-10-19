# Pruebas 0.76.0 — 2026-10-19 12:05 — 17/19 OK

Listas: v077, base, mapa, minijuegos, misiones. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 315 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `herramientas/sonda_rendimiento.py` | **OK** | 84 s |
| 2 | `herramientas/foto_desde_arriba.py vistas077.json` | **OK** | 4 s |
| 3 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 4 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 5 | `prueba_bordes.py` | **OK** | 0 s |
| 6 | `prueba_persecuciones.py` | **OK** | 24 s |
| 7 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 36 s |
| 8 | `audit_obstaculos.py` | **OK** | 0 s |
| 9 | `audit_cruces.py` | **OK** | 0 s |
| 10 | `audit_hundimiento.py` | **OK** | 0 s |
| 11 | `prueba_parking_cristo.py` | **OK** | 1 s |
| 12 | `prueba_aeropuerto.py` | **OK** | 0 s |
| 13 | `prueba_baloncesto.py` | **OK** | 15 s |
| 14 | `prueba_futbol.py` | **OK** | 6 s |
| 15 | `prueba_obispo.py` | **OK** | 5 s |
| 16 | `prueba_canchas.py` | **OK** | 2 s |
| 17 | `prueba_misiones.py` | **FALLA** | 88 s |
| 18 | `prueba_misiones_guardado.py` | **FALLA** | 20 s |
| 19 | `prueba_diario.py` | **OK** | 0 s |

## Detalle

### 1. herramientas/sonda_rendimiento.py — OK

```
      92 mallas    170314 tri  suelta:Head:BufferGeometry:MeshStandardMaterial
      58 mallas       696 tri  suelta:-:BoxGeometry:MeshBasicMaterial
      49 mallas       588 tri  suelta(después):-:BoxGeometry:MeshStandardMaterial
      46 mallas    190448 tri  suelta(después):-:BufferGeometry:MeshStandardMaterial
      34 mallas     18712 tri  chunk:asphalt
      32 mallas     26456 tri  chunk:sidewalk
      28 mallas     23046 tri  chunk:facade
      27 mallas      4698 tri  chunk:roofFlat
      27 mallas     17280 tri  chunk:disc
      25 mallas      5254 tri  chunk:asphaltLines
      25 mallas        50 tri  suelta(después):obispado:PlaneGeometry:MeshStandardMaterial
      23 mallas     12254 tri  chunk:footway
      23 mallas       276 tri  suelta(después):Head:BoxGeometry:MeshStandardMaterial
      18 mallas        36 tri  suelta:-:PlaneGeometry:MeshBasicMaterial
      18 mallas      7186 tri  chunk:roofTile
      18 mallas      2808 tri  chunk:discPave
      18 mallas      3728 tri  chunk:paving
      16 mallas     19693 tri  suelta:La Concepción:BufferGeometry:MeshStandardMaterial
      16 mallas     47190 tri  chunk:trim
      16 mallas     25982 tri  suelta(después):Head:BufferGeometry:MeshStandardMaterial
      15 mallas      2112 tri  suelta:-:SphereGeometry:MeshStandardMaterial
      14 mallas       210 tri  suelta:-:ConeGeometry:MeshStandardMaterial
      14 mallas    289214 tri  parked
      11 mallas      8200 tri  chunk:stone
      10 mallas      1920 tri  suelta(después):Head:TorusGeometry:MeshStandardMaterial
      10 mallas       160 tri  suelta(después):Head:CircleGeometry:MeshStandardMaterial
       9 mallas     11580 tri  suelta:aeropuerto:BufferGeometry:MeshStandardMaterial
       9 mallas       367 tri  suelta:Estadio Francisco Peraza:BufferGeometry:MeshStandardMaterial
       8 mallas        16 tri  suelta:inicio:PlaneGeometry:MeshStandardMaterial
       8 mallas        94 tri  chunk:sign5
       8 mallas       384 tri  suelta(después):lowerarm_l:CylinderGeometry:MeshStandardMaterial
       7 mallas     25280 tri  suelta:inicio:BufferGeometry:MeshStandardMaterial
       7 mallas      1824 tri  suelta:pabellon:BufferGeometry:MeshStandardMaterial
== sueltas grandes (más de 1500 tri): 165
   [403254, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [33788, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [22704, 0, 0, 0, 'BufferGeometry', '2d3236', 'G(inicio)']
   [15054, 0, 0, 0, 'BufferGeometry', 'ffffff', '']
   [12812, 9100, -152, -3, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9093, -152, 3, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9090, -152, 7, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9197, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9200, -152, 0, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9200, -152, -1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9387, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9405, -152, -67, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9520, -152, 32, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9421, -152, -11, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9400, -152, -16, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9480, -152, 16, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9645, -152, 0, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9638, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9628, -152, -6, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9644, -152, 5, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9646, -152, 7, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9636, -152, 4, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9621, -152, 6, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9636, -152, 1, 'BufferGeometry', 'ffffff', 'GG']
   [12812, 9797, -152, 10, 'BufferGeometry', 'ffffff', 'GG']
SONDA RENDIMIENTO OK
```

### 2. herramientas/foto_desde_arriba.py vistas077.json — OK

```

```

### 3. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1792407716305,"label":"test","player":{"x":-188.85866389791943,"z":783.1693376318474,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85866389791943,"z":783.1693376318474},"weapon":{"has":true,"ammo":4,"out"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 4. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"3.0","punta":"199","maxV":"198","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -189   Z 0"}
```

### 5. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1,8],"borde":814,"calle":3.7,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-20 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[-1,8],"borde":814,"calle":3.7,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-20 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[-1,8],"borde":814,"calle":3.7,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-20 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-20 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":0}
```

### 6. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.49 m OK
[8] Los bancos del Adelantado: a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.35 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 9 m en 3 s, salto máx 0.12 m OK | a pie: a 5 m, recorre 7 m en 3 s, salto máx 0.12 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 44 m en 3 s, salto máx 0.68 m OK
PERSECUCIONES OK
```

### 7. prueba_conduccion_tuneles_puentes.py — OK

```
roads 112
CONOCIDO {'off': 0.6, 'dy': 0.2, 'col': False, 'low': False, 'ri': 308, 't': 10, 'name': 'Camino La Rúa', 'L': 490, 'done': False, 'left': 111, 'time': 76.2, 'x': 443, 'z': -903, 'y': -2.1}
snap df_308
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': False, 'ri': 1287, 't': 0, 'name': 'Autopista del Norte', 'L': 811, 'done': False, 'left': 503, 'time': 116.4, 'x': 45, 'z': 1158, 'y': -32.9}
snap df_1287
CONOCIDO {'off': 0, 'dy': 0.2, 'col': False, 'low': True, 'ri': 2295, 't': 0, 'name': 'Autopista del Norte', 'L': 323, 'done': False, 'left': 13, 'time': 55.4, 'x': -390, 'z': 673, 'y': -6.3}
snap df_2295
failed 0 of 112 · conocidos 3
AVISO: tramos que ya fallaban (PENDIENTES, «Prueba de conducción: tramos que fallan»): Camino La Rúa X 443 Z -903, Autopista del Norte X 45 Z 1158, Autopista del Norte X -390 Z 673
CONDUCCION OK
```

### 8. audit_obstaculos.py — OK

```
obstacles 0
[]
```

### 9. audit_cruces.py — OK

```
conflicts 24
[(('residential', 'residential', 0, 0), 6), (('motorway_link', 'motorway_link', 1, 1), 3), (('service', 'primary', 1, 1), 3), (('secondary', 'residential', 0, 0), 2), (('service', 'service', 0, 0), 2), (('service', 'service', 5, 1), 2), (('residential', 'unclassified', 0, 0), 1), (('residential', 'residential', 1, 0), 1), (('motorway_link', 'primary', 1, 1), 1), (('primary', 'residential', 0, 0), 1), (('service', 'residential', 0, 0), 1), (('service', 'service', 0, 2), 1)]
```

### 10. audit_hundimiento.py — OK

```
{"muestras":6396,"hundidos":0,"zonas":0,"ejemplos":[]}
```

### 11. prueba_parking_cristo.py — OK

```
{'escalera': [161, -595], 'fin': [144.8, -603.4], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
{'escalera': [219, -597], 'fin': [235.2, -588.3], 'sobre_suelo': 0.17, 'salio': True, 'stuck': None}
coche {'rampa': [260, -552], 'hueco_min_techo': 2.2, 'profundidad': 5.4, 'en_sala': True, 'fin': [201, -582]}
coche {'rampa': [120, -640], 'hueco_min_techo': 2.2, 'profundidad': 5.6, 'en_sala': True, 'fin': [179, -609]}
```

### 12. prueba_aeropuerto.py — OK

```
{"ok":true,"aviones":17,"pista_m":3392,"ruta_km":2.84,"nodo_terminal_dist":121}
```

### 13. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [6, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[6,0]}
PARTIDO CPU OK
partido fácil 1 [21, 2]
partido fácil 2 [17, 6]
partido fácil 3 [21, 3]
equilibrio primer partido [59, 11] OK
jugadores dibujados 62
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"green":true,"shot":true},"mode":"air"}
foto basket_zoom
RATÓN OK
tras moverse 1
tras correr 2
tras pasar 3
tras recibir 4
tras tirar 5
tras combo 6
foto basket_tutorial
tutorial 99
TUTORIAL OK
cambio de defensor -> COCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 14. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [3, 0], 'golden': False}
resultado {"won":true,"score":[3,0]}
PARTIDO CPU OK
partido fácil 1 [6, 1]
partido fácil 2 [4, 0]
partido fácil 3 [6, 0]
equilibrio primer partido [16, 1] OK
tras moverse 1
tras correr 2
tras pasar 3
tras chutar 4
tras gol 5 marcador [1,0]
tutorial completo True
foto futbol_tutorial
clic izquierdo {'shot': True}
clic derecho {'pass': True}
RATÓN OK
campos {'campos': 79, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f66', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f66
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 15. prueba_obispo.py — OK

```
info {'ok': True, 'front': [-42.17756237061555, -235.8174924176035], 'obispo': True, 'court': {'kind': 'bb', 'dist': 226, 'x': -50, 'z': -461}, 'lampsInCourts': 0, 'treesInCourts': 33, 'pitches': 161}
alcanzable {'beacon': True, 'enCasa': False, 'choca': False, 'obispoEnCasa': False, 'dist': 1.3999999999999984}
snap obispado
activa Un partido por la Catedral
meta (puerta del Máyex) [-62.01256925391742,-424.7799316530283,2.2]
partido en marcha True
estado 1 None
torneo abierto True círculo naranja True
errores JS []
OBISPO OK
```

### 16. prueba_canchas.py — OK

```
   ['c7', 'court', 'la cancha de Calle Las Mejoranas', 5, -172, 1042]
   ['c8', 'court', 'la cancha de Calle Llombet', 1, -217, 1092]
   ['c9', 'door', 'la cancha (entrada por Calle Llombet)', 3, -177, 1133]
   ['c10', 'court', 'la cancha de baloncesto', 1, 87, 854]
   ['c11', 'door', 'la cancha (entrada por la calle)', 3, 305, 601]
   ['c12', 'court', 'la cancha de baloncesto', 2, -1299, -190]
   ['c13', 'court', 'la cancha de Avenida Bartolomé Cairasco', 1, -1085, 610]
   ['c14', 'court', 'la cancha de baloncesto', 4, -163, -430]
   ['c15', 'court', 'la cancha de baloncesto', 4, 789, 1437]
   ['c16', 'door', 'la cancha (entrada por la calle)', 2, 206, 1915]
   ['c17', 'court', 'la cancha de Camino San Bartolomé de Geneto', 4, 164, 1794]
   ['c18', 'court', 'la cancha de Camino San Bartolomé de Geneto', 5, 242, 1801]
   ['c19', 'court', 'la cancha de baloncesto', 1, -167, -1106]
   ['c20', 'court', 'la cancha de Camino Fuente Cañizares', 5, -1040, -741]
   ['c21', 'door', 'la cancha (entrada por Avenida San Diego)', 4, -846, -908]
   ['c22', 'court', 'la cancha de Camino San Francisco de Paula', 4, -1129, 2004]
   ['c23', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 1, 2178, 2314]
   ['c24', 'door', 'la cancha (entrada por Calle Santa María Soledad Torres)', 5, 2182, 2300]
   ['c25', 'court', 'la cancha de baloncesto', 3, -116, 784]
   ['c26', 'court', 'la cancha de Calle Domingo González Pérez', 3, -637, 1575]
   ['c27', 'court', 'la cancha de Calle Domingo González Pérez', 3, -611, 1575]
   ['c28', 'court', 'la cancha de Calle Aries', 2, 1164, 1527]
   ['c29', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1979, 3754]
   ['c30', 'court', 'la cancha de baloncesto', 3, -152, 876]
   ['c31', 'court', 'la cancha de baloncesto', 4, -121, 887]
   ['c32', 'court', 'la cancha de baloncesto', 1, -140, 878]
   ['c33', 'court', 'la cancha de baloncesto', 1, -1383, -918]
   ['c34', 'court', 'la cancha de Camino Vereda Barbados', 5, -1198, -1020]
   ['c35', 'court', 'la cancha de baloncesto', 4, -1361, -930]
   ['c36', 'door', 'la cancha (entrada por la calle)', 4, -1266, -1045]
   ['c37', 'door', 'la cancha (entrada por la calle)', 4, -1271, -1048]
   ['c38', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1691, 2095]
   ['c39', 'court', 'la cancha de Camino San Bartolomé de Geneto', 1, 236, 1782]
   ['c40', 'court', 'la cancha de Cancha 6º', 5, 1580, 1141]
   ['c41', 'court', 'la cancha de baloncesto', 5, 1074, 2575]
   ['c42', 'court', 'la cancha de Calle Saturno', 3, 814, 1523]
   ['c43', 'court', 'la cancha de Calle Clemencia Hardisson', 4, 845, 1509]
   ['c44', 'court', 'la cancha de baloncesto', 1, 800, 1413]
   ['c45', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 1, 1966, 3829]
   ['c46', 'court', 'la cancha de Calle Domingo Hernández Rodríguez', 2, 1966, 3803]
   ['c47', 'court', 'la cancha de Calle Antonio Hernandez Arrón', 2, -1332, -626]
   ['c48', 'court', 'la cancha de Camino Tornero', 1, -1314, -650]
   ['c49', 'court', 'la cancha de baloncesto', 4, -1295, -467]
   ['c50', 'court', 'la cancha de baloncesto', 2, -1329, -474]
   ['c51', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1506, -508]
   ['c52', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 2, -1468, -512]
   ['c53', 'court', 'la cancha de Calle Leopoldo de la Rosa Olivera', 5, -1479, -526]
   ['c54', 'court', 'la cancha de Carretera General del Norte', 5, -1356, -318]
   ['c55', 'court', 'la cancha de "Avenida del Colesterol"', 3, 1828, 2050]
   ['mayex', 'door', 'Colegio Máyex', 1, -61, -426]
   ['c57', 'court', 'la cancha de "Avenida del Colesterol"', 2, 1787, 2292]
   ['c58', 'court', 'la cancha de baloncesto', 1, 139, -993]
   ['c59', 'court', 'la cancha de baloncesto', 5, -641, 336]
torneo ['Torneo Lagunero 1/5', 'Torneo Lagunero 2/5', 'Torneo Lagunero 3/5', 'Torneo Lagunero 4/5', 'Torneo Lagunero: la final']
mayex puerta detectada: mayex
snap entrada_mayex
riostejera puerta detectada: riostejera
snap entrada_rios_tejera
errores JS []
CANCHAS OK
```

### 17. prueba_misiones.py — FALLA

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
[18] El rifle de agua: TIEMPO · dinero +0 · pasos talk>goto
     objetivo: Compra el rifle de agua en Juguetes Baobabito (E) · Se abren las JUGUETERÍAS (icono de la gota azul) | EL RIFLE DE AGUA
MISIONES FALLA
```

### 18. prueba_misiones_guardado.py — FALLA

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":1,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1792407902065],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1792407902080],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1792407902102],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1792407902141],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1792407902165],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1792407902243],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1792407902274],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1792407913264]],"Los bancos del Adelantado":[["Don Yovoy Gofiérrez","¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.",1792407830683],["Don Yovoy Gofiérrez","Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.",1792407830694],["Chatarrero","¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!",1792407830744],["Pepe","¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!",1792407841190]],"El carterista del Cristo":[["Coco","Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.",1792407852684],["Coco","Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.",1792407852700],["Carterista","¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!",1792407852886]],"El rally de La Esperanza":[["El Canarión","¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.",1792407864687],["El Canarión","Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.",1792407864707],["Pijo de La Esperanza","Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.",1792407868211]],"Escolta a la guagua del Romero":[["Don Yovoy Gofiérrez","Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.",1792407868571],["Don Yovoy Gofiérrez","Síguela de cerca, sin alejarte, hasta el final del recorrido.",1792407868594],["Suegra del alcalde (por la ventanilla)","¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!",1792407879366]],"La guagua de la broma":[["Boca Papa","¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.",1792407879448],["Boca Papa","No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.",1792407879468],["Bromista","Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!",1792407880181]],"Grafiteros en el tranvía":[["Sastrón","¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.",1792407880283],["Sastrón","Corre antes de que acaben. Y llévate la de bolas: son rápidos.",1792407880297],["Grafitero","¡Au! ¡Vale, lo limpiamos, lo limpiamos!",1792407880431]],"Noche en el aeropuerto":[["Rayco «El Blanco»","«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»",1792407880548],["Boca Papa (por el móvil)","Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!",1792407880563],["Contrabandista","¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!",1792407880685],["Don Yovoy Gofiérrez (por el móvil)","Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!",1792407880719]],"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1792407801942],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1792407801956],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1792407801959],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1792407801961],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1792407803519]],"Un partido por la Catedral":[["Monseñor Fermín Truchas","Pasa, hijo, pasa. Soy Fermín Truchas, obispo de Nivaria por la gracia de Dios y por un error administrativo del Vaticano.",1792407806897],["Monseñor Fermín Truchas","Me han dicho que tu banda ayuda al alcalde. Pues el Señor también tiene goteras: el tejado de la Catedral, el campanario de La Concepción, el órgano de Santo Domingo que suena como una guagua…",1792407806910],["El Chopa","¿Y qué quiere, Monseñor? ¿Que robe un banco? Que yo eso ya lo dejé.",1792407806913],["Monseñor Fermín Truchas","¡Válgame! No, no. Partidos benéficos. La gente paga por ver. Hoy jugáis en el patio del Colegio Máyex contra mis seminaristas, el hermano Tomás y el hermano Lucas. Las monjas os abren la puerta.",1792407806916],["Monseñor Fermín Truchas","Son buenos chicos, pero tiran a canasta como rezan: con los ojos cerrados. Llévate a Coco, que tiene brazos de boxeador. Lo recaudado, para la obra de la iglesia… y una parte para vosotros, que el obrero merece su salario. Lucas 10,7.",1792407806964],["Hermano Tomás","12 a 4... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo.",1792407809235]],"Defensores de La Laguna":[["Don Yovoy Gofiérrez","Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.",1792407827755],["Don Yovoy Gofiérrez","Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.",1792407827914],["Boca Papa","Señor alcalde, ¿eso trae dietas? Porque yo como mucho.",1792407828317],["Don Yovoy Gofiérrez","Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.",1792407828721],["Rayco «El Blanco»","«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>",1792407829140],["El Chopa","Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.",1792407829555],["Don Yovoy Gofiérrez","Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.",1792407829957]],"El gofio robado":[["Boca Papa","¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.",1792407841235],["Boca Papa","Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.",1792407841247],["Vecina del casco","Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.",1792407841306],["Vecino con boina","Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!",1792407841358],["El Molinero Falso","¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?",1792407841412],["Boca Papa","¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.",1792407852638]],"Carrera solidaria del casco":[["Don Yovoy Gofiérrez","La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.",1792407864454],["Don Yovoy Gofiérrez","Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.",1792407864471]],"Baches en la Vía de Ronda":[["Don Yovoy Gofiérrez","Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.",1792407868292],["Don Yovoy Gofiérrez","Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.",1792407868310]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1792407880848],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1792407880868],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1792407880897],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1792407880926],["Rayco «El Blanco»","«Psss... siesta.»",1792407880964]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":true,"patrol":true,"basketTut":true,"futbolTut":true,"jugueterias":true,"maleIntro":false,"rifleTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"prueba"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 1, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792407902065], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792407902080], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1792407902102], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1792407902141], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1792407902165], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1792407902243], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1792407902274], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1792407913264]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792407830683], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792407830694], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792407830744], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792407841190]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792407852684], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792407852700], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792407852886]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792407864687], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792407864707], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792407868211]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792407868571], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792407868594], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792407879366]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792407879448], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792407879468], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792407880181]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792407880283], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792407880297], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792407880431]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792407880548], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792407880563], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792407880685], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792407880719]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792407801942], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792407801956], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792407801959], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792407801961], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792407803519]], 'Un partido por la Catedral': [['Monseñor Fermín Truchas', 'Pasa, hijo, pasa. Soy Fermín Truchas, obispo de Nivaria por la gracia de Dios y por un error administrativo del Vaticano.', 1792407806897], ['Monseñor Fermín Truchas', 'Me han dicho que tu banda ayuda al alcalde. Pues el Señor también tiene goteras: el tejado de la Catedral, el campanario de La Concepción, el órgano de Santo Domingo que suena como una guagua…', 1792407806910], ['El Chopa', '¿Y qué quiere, Monseñor? ¿Que robe un banco? Que yo eso ya lo dejé.', 1792407806913], ['Monseñor Fermín Truchas', '¡Válgame! No, no. Partidos benéficos. La gente paga por ver. Hoy jugáis en el patio del Colegio Máyex contra mis seminaristas, el hermano Tomás y el hermano Lucas. Las monjas os abren la puerta.', 1792407806916], ['Monseñor Fermín Truchas', 'Son buenos chicos, pero tiran a canasta como rezan: con los ojos cerrados. Llévate a Coco, que tiene brazos de boxeador. Lo recaudado, para la obra de la iglesia… y una parte para vosotros, que el obrero merece su salario. Lucas 10,7.', 1792407806964], ['Hermano Tomás', '12 a 4... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo.', 1792407809235]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792407827755], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792407827914], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792407828317], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792407828721], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792407829140], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792407829555], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792407829957]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792407841235], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792407841247], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792407841306], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792407841358], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792407841412], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792407852638]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792407864454], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792407864471]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792407868292], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792407868310]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792407880848], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792407880868], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792407880897], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792407880926], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792407880964]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': True, 'patrol': True, 'basketTut': True, 'futbolTut': True, 'jugueterias': True, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: FALLA (coches de misión sueltos: 2)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 1, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792407918613], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792407918622]], 'Los bancos del Adelantado': [['Don Yovoy Gofiérrez', '¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.', 1792407830683], ['Don Yovoy Gofiérrez', 'Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.', 1792407830694], ['Chatarrero', '¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!', 1792407830744], ['Pepe', '¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!', 1792407841190]], 'El carterista del Cristo': [['Coco', 'Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.', 1792407852684], ['Coco', 'Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.', 1792407852700], ['Carterista', '¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!', 1792407852886]], 'El rally de La Esperanza': [['El Canarión', '¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.', 1792407864687], ['El Canarión', 'Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.', 1792407864707], ['Pijo de La Esperanza', 'Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.', 1792407868211]], 'Escolta a la guagua del Romero': [['Don Yovoy Gofiérrez', 'Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.', 1792407868571], ['Don Yovoy Gofiérrez', 'Síguela de cerca, sin alejarte, hasta el final del recorrido.', 1792407868594], ['Suegra del alcalde (por la ventanilla)', '¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!', 1792407879366]], 'La guagua de la broma': [['Boca Papa', '¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.', 1792407879448], ['Boca Papa', 'No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.', 1792407879468], ['Bromista', 'Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!', 1792407880181]], 'Grafiteros en el tranvía': [['Sastrón', '¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.', 1792407880283], ['Sastrón', 'Corre antes de que acaben. Y llévate la de bolas: son rápidos.', 1792407880297], ['Grafitero', '¡Au! ¡Vale, lo limpiamos, lo limpiamos!', 1792407880431]], 'Noche en el aeropuerto': [['Rayco «El Blanco»', '«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»', 1792407880548], ['Boca Papa (por el móvil)', 'Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!', 1792407880563], ['Contrabandista', '¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!', 1792407880685], ['Don Yovoy Gofiérrez (por el móvil)', 'Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!', 1792407880719]], 'Un partido por La Concepción': [['Monseñor Fermín Truchas', 'Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.', 1792407801942], ['Monseñor Fermín Truchas', 'Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.', 1792407801956], ['El Chopa', '¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.', 1792407801959], ['Monseñor Fermín Truchas', 'Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.', 1792407801961], ['Hermano Mateo', '4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.', 1792407803519]], 'Un partido por la Catedral': [['Monseñor Fermín Truchas', 'Pasa, hijo, pasa. Soy Fermín Truchas, obispo de Nivaria por la gracia de Dios y por un error administrativo del Vaticano.', 1792407806897], ['Monseñor Fermín Truchas', 'Me han dicho que tu banda ayuda al alcalde. Pues el Señor también tiene goteras: el tejado de la Catedral, el campanario de La Concepción, el órgano de Santo Domingo que suena como una guagua…', 1792407806910], ['El Chopa', '¿Y qué quiere, Monseñor? ¿Que robe un banco? Que yo eso ya lo dejé.', 1792407806913], ['Monseñor Fermín Truchas', '¡Válgame! No, no. Partidos benéficos. La gente paga por ver. Hoy jugáis en el patio del Colegio Máyex contra mis seminaristas, el hermano Tomás y el hermano Lucas. Las monjas os abren la puerta.', 1792407806916], ['Monseñor Fermín Truchas', 'Son buenos chicos, pero tiran a canasta como rezan: con los ojos cerrados. Llévate a Coco, que tiene brazos de boxeador. Lo recaudado, para la obra de la iglesia… y una parte para vosotros, que el obrero merece su salario. Lucas 10,7.', 1792407806964], ['Hermano Tomás', '12 a 4... Que Dios os lo pague. Bueno, que os lo pague Monseñor, que tiene la llave del cepillo.', 1792407809235]], 'Defensores de La Laguna': [['Don Yovoy Gofiérrez', 'Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.', 1792407827755], ['Don Yovoy Gofiérrez', 'Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.', 1792407827914], ['Boca Papa', 'Señor alcalde, ¿eso trae dietas? Porque yo como mucho.', 1792407828317], ['Don Yovoy Gofiérrez', 'Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.', 1792407828721], ['Rayco «El Blanco»', '«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>', 1792407829140], ['El Chopa', 'Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.', 1792407829555], ['Don Yovoy Gofiérrez', 'Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.', 1792407829957]], 'El gofio robado': [['Boca Papa', '¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.', 1792407841235], ['Boca Papa', 'Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.', 1792407841247], ['Vecina del casco', 'Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.', 1792407841306], ['Vecino con boina', 'Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!', 1792407841358], ['El Molinero Falso', '¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?', 1792407841412], ['Boca Papa', '¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.', 1792407852638]], 'Carrera solidaria del casco': [['Don Yovoy Gofiérrez', 'La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.', 1792407864454], ['Don Yovoy Gofiérrez', 'Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.', 1792407864471]], 'Baches en la Vía de Ronda': [['Don Yovoy Gofiérrez', 'Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.', 1792407868292], ['Don Yovoy Gofiérrez', 'Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.', 1792407868310]], 'El rifle de agua': [['Rayco «El Blanco»', '«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»', 1792407880848], ['El Chopa', '¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?', 1792407880868], ['Rayco «El Blanco»', '«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»', 1792407880897], ['El Chopa', 'Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?', 1792407880926], ['Rayco «El Blanco»', '«Psss... siesta.»', 1792407880964]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': True, 'patrol': True, 'basketTut': True, 'futbolTut': True, 'jugueterias': True, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 4, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD FALLA
```

### 19. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 49
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

Fotos/archivos nuevos en `tests/shots/`: ab_0.jpg, ab_1.jpg, ab_2.jpg, ab_3.jpg, audit_cruces.json, audit_obstaculos.json, baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, conduccion.json, df_1287.jpg, df_2295.jpg, df_308.jpg, entrada_mayex.jpg, entrada_rios_tejera.jpg, futbol_partido.jpg, futbol_tutorial.jpg, obispado.jpg, sonda_rendimiento.txt
