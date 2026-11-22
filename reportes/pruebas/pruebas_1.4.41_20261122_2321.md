# Pruebas 1.4.41 — 2026-11-22 23:21 — 11/13 OK

Listas: pub1441, foto1441. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 158 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1441.py` | **OK** | 0 s |
| 2 | `prueba_1422.py` | **OK** | 0 s |
| 3 | `prueba_persecuciones.py` | **OK** | 21 s |
| 4 | `prueba_misiones.py` | **OK** | 65 s |
| 5 | `prueba_canchas.py` | **OK** | 0 s |
| 6 | `prueba_arranque.py` | **OK** | 1 s |
| 7 | `prueba_1424.py` | **OK** | 0 s |
| 8 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 9 | `prueba_radio_1431_gpu.py` | **FALLA** | 6 s |
| 10 | `prueba_controles_1435_gpu.py` | **OK** | 24 s |
| 11 | `prueba_leyenda_1436_gpu.py` | **OK** | 0 s |
| 12 | `prueba_luces_pasos_1437_gpu.py` | **FALLA** | 0 s |
| 13 | `herramientas/foto_1441.py` | **OK** | 1 s |

## Detalle

### 1. prueba_1441.py — OK

```
{"hits": [], "worst": 0, "steer": [[12, 0.27124397329914984], [28, 0.05105440581425575], [55, 0.013234069193067056], [80, 0.006254180130615175]], "wb": 2.7246, "peds": {"alive": 3718, "bad": 0}, "gold": {"name": "Linguini Gold Edition", "w": 0, "liv": true, "color": 14263584, "maxKmh": 297, "ratio": 1.1}, "garage": {"ok": true, "carved": true, "car": {"id": "reventonGold", "d": 0}, "prompt": "<kbd>E</kbd> Pulsar el bot\u00f3n del garaje", "closedSeg": true, "used": true, "angle": 1.5707963267948966, "openSeg": false, "out": 17.021436843781697}}
AUTOPISTA_SIN_GOLPES OK
GIRO_CIUDAD_IGUAL OK
GIRO_MENOR_A_300 OK
PEATONES_FUERA_DE_PUENTES OK
GOLD_EXISTE OK
GOLD_DORADO OK
GOLD_10_POR_CIENTO OK
GARAJE_HECHO OK
GARAJE_COCHE_DENTRO OK
GARAJE_BOTON OK
GARAJE_PUERTA OK
GARAJE_SALIDA OK
errores []
PRUEBA 1441 OK
```

### 2. prueba_1422.py — OK

```
{'cornerError': 0, 'route': 143, 'drive': {'maxYaw': 1.350000000000011, 'maxYawAcc': 3.200000000001781, 'maxSteer': 1.8000000000000003, 'x': 81.4496087665912, 'z': 601.7682454843147, 'progress': 3216.312198865547, 'secs': 168.38333333333333, 'len': 3216.9766629312962, 'maxDec': 9.775000000000063, 'minRadius': 4.845835695155599, 'drift': 0.19363294056823996, 'hbFrames': 1268, 'done': True}, 'fences': {'big': 41, 'fenced': 39, 'small': 98, 'sfenced': 97}, 'touch': []}
MISMA_CURVA_CON_NODOS_EXTRA OK
PERSECUCION_TERMINA OK
CARROCERIA_Y_RUEDAS_SIN_SALTOS OK
SIN_FRENAZOS_EN_SECO OK
CURVAS_CON_RADIO OK
DERRAPA_EN_CURVAS OK
CAMPOS_VALLADOS OK
CANCHAS_VALLADAS OK
BOTONES_TACTILES OK
errores []
PRUEBA 1422 OK
```

### 3. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.33 m OK
[8] Los bancos del Adelantado: a pie: a 9 m, recorre 4 m en 3 s, salto máx 0.16 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 10 m en 3 s, salto máx 0.19 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.14 m OK | a pie: a 10 m, recorre 10 m en 3 s, salto máx 0.14 m OK
[17] Noche en el aeropuerto: coche: a 23 m, recorre 24 m en 3 s, salto máx 0.50 m OK
PERSECUCIONES OK
```

### 4. prueba_misiones.py — OK

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

### 5. prueba_canchas.py — OK

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

### 6. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 57, 'peor': 70, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 7. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```

### 8. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795389679596,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795389610681],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795389610698],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795389610722],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795389610746],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795389610781],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795389610859],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795389610891],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795389618994],["Ladrón","¡Buaaaa! ¡Que escuece, que escuece! ¡Me rindo, pero no me tires más bolitas! ¡Buaaa!",1795389625072],["Ladrón","¡Snif! ¡Vale, la caja está en el coche! ¡Snif!",1795389625148],["Policía Local (llegando por fin)","¿Esto lo habéis hecho vosotros? Con una de bolas... Bueno, la caja está entera. Nos lo llevamos.",1795389625181],["Policía Local","El alcalde, Don Yovoy Gofiérrez, ya se ha enterado. Os quiere ver en el Ayuntamiento, en la Plaza del Adelantado. Hoy no es delito: hoy sois héroes.",1795389625222]],"Los bancos del Adelantado":[["Don Yovoy Gofiérrez","¡Escándalo! Han robado tres bancos de la Plaza del Adelantado. ¡De hierro forjado, del siglo diecinueve! Un vecino vio a dos tipos cargándolos en una furgoneta hacia el polígono.",1795389628343],["Don Yovoy Gofiérrez","Recuperadlos... o por lo menos a los ladrones. Los bancos ya los pagará el seguro. Si no se ríe de mí otra vez.",1795389628365],["Chatarrero","¿Bancos? ¿Qué bancos? Esto es... arte moderno. ¡Pepe, corre!",1795389628467],["Pepe","¡Ay! ¡Que sí, que eran de la plaza! ¡Los devolvemos!",1795389636429]],"El carterista del Cristo":[["Coco","Chopa, en la Plaza del Cristo hay un carterista trabajando entre los puestos. Rápido de piernas. Yo ya no estoy para carreras... pero tú sí.",1795389644835],["Coco","Cógelo y dale una lección. Como en el gimnasio: guardia alta y paciencia.",1795389644850],["Carterista","¡Vale, vale! ¡Te devuelvo las carteras... si me ganas!",1795389645044]],"El rally de La Esperanza":[["El Canarión","¡Chicharrero! Ahora que sois polis de mentirijilla... Hay un pijo de La Esperanza con un deportivo que hace carreras por la Vía de Ronda. Ya ha rozado a tres guaguas.",1795389654209],["El Canarión","Yo le ganaría, pero me tiene manía. Gánale tú y se rinde: palabra de pijo.",1795389654230],["Pijo de La Esperanza","Ugh... vale. Me rindo. Pero no le digáis nada a mi padre, que es concejal.",1795389658050]],"Escolta a la guagua del Romero":[["Don Yovoy Gofiérrez","Mañana es la Romería de San Benito y hoy sale la guagua con las carretas, las parrandas y mi suegra. Necesito escolta: si alguien la para, la Romería se queda sin papas.",1795389658662],["Don Yovoy Gofiérrez","Síguela de cerca, sin alejarte, hasta el final del recorrido.",1795389658681],["Suegra del alcalde (por la ventanilla)","¡Ay, qué chico más apañado! ¡Toma, unas papas arrugadas para el camino!",1795389669791]],"La guagua de la broma":[["Boca Papa","¡Chopa! Un bromista de YouTube se ha llevado una guagua vacía de la estación. Dice que va a «hacer contenido». Va por la autopista con los cuatro intermitentes.",1795389669903],["Boca Papa","No hace falta que la rompas: ponte cerca, pítale, y cuando vea que no se libra, para. Sobre todo no la rompas, que luego la pagamos todos.",1795389669921],["Bromista","Vale, vale, ya paro... ¡Hola, mis seguidores! ¡Me ha pillado la Local de los Defensores!",1795389670735]],"Grafiteros en el tranvía":[["Sastrón","¡Un sacrilegio, Chopa! Unos niñatos están pintando el tranvía en la parada de Padre Anchieta. ¡Con spray fosforito! Las tijeras dicen que no combina con nada.",1795389670849],["Sastrón","Corre antes de que acaben. Y llévate la de bolas: son rápidos.",1795389670866],["Grafitero","¡Au! ¡Vale, lo limpiamos, lo limpiamos!",1795389671042]],"Noche en el aeropuerto":[["Rayco «El Blanco»","«Brrr... noche... mmm... aeropuerto... psss... queso... ¡contrabando!»",1795389671172],["Boca Papa (por el móvil)","Lo que quiere decir El Blanco: unos contrabandistas sacan queso de cabra sin registro por las vías de servicio de Los Rodeos. Esta noche. ¡Que es queso nuestro, Chopa!",1795389671219],["Contrabandista","¡Era queso de flor de Guía, de verdad! ¡Bueno, de Tejina! ¡Me rindo!",1795389671379],["Don Yovoy Gofiérrez (por el móvil)","Defensores, lo habéis vuelto a hacer. Mañana tenéis delante del Ayuntamiento vuestro propio coche patrulla, con el nombre de la banda. ¡Y el depósito lleno!",1795389671414]],"Defensores de La Laguna":[["Don Yovoy Gofiérrez","Vecinos, banda, señoras y señores... ejem. Hoy La Laguna está de enhorabuena. Unos chicos del barrio han frustrado un atraco con una pistola de juguete y mucho valor.",1795389625382],["Don Yovoy Gofiérrez","Por eso, con el poder que me da este bigote... digo, este bastón de mando, nombro a «la banda» <b>Defensores de La Laguna</b>: un grupo especial de la Policía Local para los problemas de la ciudad.",1795389625544],["Boca Papa","Señor alcalde, ¿eso trae dietas? Porque yo como mucho.",1795389625959],["Don Yovoy Gofiérrez","Trae responsabilidad, señor Papa. Y un bocadillo en cada ceremonia. Desde hoy podéis detener a malhechores. Eso sí: siempre con la de bolas y sin romper el mobiliario urbano.",1795389626361],["Rayco «El Blanco»","«Mmm... ¡brrr!... ¡a la orden!»<br><i>Saluda militarmente. Se le cae la gorra.</i>",1795389626765],["El Chopa","Gracias, alcalde. Salí del talego para hacer las cosas bien. Esto es exactamente lo que buscaba.",1795389627183],["Don Yovoy Gofiérrez","Pues estad atentos al teléfono. Esta ciudad tiene muchos problemas... y muy poco presupuesto.",1795389627589]],"El gofio robado":[["Boca Papa","¡Chopa, una tragedia! ¡Han robado toda la reserva de gofio del Molino de La Laguna! Sin gofio no hay escaldón, sin escaldón no hay Boca Papa.",1795389636508],["Boca Papa","Pregunta a los vecinos del casco. Alguien tuvo que ver una furgoneta cargada hasta arriba.",1795389636521],["Vecina del casco","Una furgoneta blanca, mi niño, que olía a gofio tostado que daba gusto. Iba hacia arriba, por la calle de la iglesia.",1795389636604],["Vecino con boina","Esos son los del polígono, los de la nave sin cartel. Venden «harina de millo importada». ¡Importada de nuestro molino!",1795389636695],["El Molinero Falso","¿Gofio? Aquí solo hay «harina de cereal tostado premium». ¿Te vas o te enharino?",1795389636780],["Boca Papa","¡Mi gofio! ¡Huele a gloria! Chopa, esta noche escaldón para toda la banda. Invito yo... bueno, invitas tú.",1795389644749]],"Carrera solidaria del casco":[["Don Yovoy Gofiérrez","La carrera solidaria del casco histórico: todo lo recaudado va a la asociación de vecinos. Si el jefe de los Defensores corre, la gente dona más. ¡A pie, eh! Nada de coches.",1795389653817],["Don Yovoy Gofiérrez","Pasa por los controles antes de que se acabe el tiempo. Y sonríe a las cámaras.",1795389653832]],"Baches en la Vía de Ronda":[["Don Yovoy Gofiérrez","Defensores, la Vía de Ronda tiene más baches que un queso de cabra. El camión del asfalto lleva tres semanas aparcado porque el conductor está de vacaciones... perpetuas.",1795389658117],["Don Yovoy Gofiérrez","Llévalo por los cinco puntos marcados antes de que cierren la obra. Y no lo vuelques, que es el único que tenemos.",1795389658139]],"El rifle de agua":[["Rayco «El Blanco»","«Brrr... agua... mmm... fuego... psss... juguetería... ¡rifle!»",1795389671555],["El Chopa","¿Que ya venden el rifle de agua en las jugueterías? ¿El eléctrico, el de diez metros de chorro?",1795389671580],["Rayco «El Blanco»","«Mmm... sí... brrr... trescientos cincuenta... psss... fuente... prueba... ¡como las latas!»",1795389671616],["El Chopa","Entendido: lo compro y nos vemos en la plaza de la fuente para probarlo. ¿Y Boca Papa?",1795389671647],["Rayco «El Blanco»","«Psss... siesta.»",1795389671681],["Rayco «El Blanco»","«Brrr... papeles... ¡fuego!... psss... apaga.»",1795389672280],["El Chopa","Fuego de verdad no, Blanco... vale, vale. Rifle fuera: clic derecho apunta, clic izquierdo dispara el chorro.",1795389672365],["Rayco «El Blanco»","«Psss... vacío... brrr... fuente.»",1795389675659],["El Chopa","Se ha quedado seco. A la fuente a llenarlo.",1795389675693],["Rayco «El Blanco»","«Mmm... Boca... brrr... cabeza... ¡diez metros!»",1795389675803],["El Chopa","Despertar a Boca Papa con un chorro en la cabeza desde diez metros. Ese es mi Blanco.",1795389675838],["Boca Papa","¡AAAAH! ¿Quién...? ¡¿CHOPA?! ¡Me has empapado la siesta! ¡Y la camisa de los domingos!",1795389675924],["Rayco «El Blanco»","«Brrr... ¡diez metros!... mmm... ¡bien!»",1795389675960],["El Chopa","Funciona. Diez metros de chorro y cero heridos. Esto lo vamos a usar, Boca.",1795389675994],["Boca Papa","Pues úsalo con otro... Oye, el que te busca es uno de la Secreta, un tal Tostón. Dice que te espera en la Avenida de los Menceyes. Tiene pinta de policía de película mala.",1795389676025],["Don Celestino, párroco de La Concepción (por el móvil)","¿Ayoze? Soy Don Celestino, el cura de La Concepción. Me han dicho que ahora tenéis una banda... una banda de las buenas, espero.",1795389681073]],"Las recreativas":[["Rayco «El Blanco» (por el móvil)","«Mmm... ¡brrr!...» Chopa. Ahora que somos Defensores... tengo una cosa en casa. Una máquina de las de antes, de cuando los recreativos. ¡<b>BENCOMO</b>! El mencey de Taoro repartiendo varazos a los castellanos en Acentejo.",1795389677506]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"obispoIntro":true,"defenders":true,"patrol":true,"jugueterias":true,"rifleTut":true,"sastronTut":false,"basketTut":false,"futbolTut":false,"maleIntro":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 9. prueba_radio_1431_gpu.py — FALLA

```
FALLA TimeoutError('Locator.click: Timeout 6000ms exceeded.\nCall log:\n  - waiting for locator("#radioNext")\n    - locator resolved to <button type="button" id="radioNext" aria-keyshortcuts="Q" aria-label="Cambiar de emisora">…</button>\n  - attempting click action\n    2 × waiting for element to be visible, enabled and stable\n      - element is visible, enabled and stable\n      - scrolling into view if needed\n      - done scrolling\n      - <div id="sub" class="hud talking">…</div> intercepts pointer events\n    - retrying click action\n    - waiting 20ms\n    2 × waiting for element to be visible, enabled and stable\n      - element is visible, enabled and stable\n      - scrolling into view if needed\n      - done scrolling\n      - <div id="sub" class="hud talking">…</div> intercepts pointer events\n    - retrying click action\n      - waiting 100ms\n    11 × waiting for element to be visible, enabled and stable\n       - element is visible, enabled and stable\n       - scrolling into view if needed\n       - done scrolling\n       - <div id="sub" class="hud talking">…</div> intercepts pointer events\n     - retrying click action\n       - waiting 500ms\n')
```

### 10. prueba_controles_1435_gpu.py — OK

```
Xbox {'requiresAim': True, 'aims': True, 'fires': True, 'releasesAim': True, 'noWeaponWhileDriving': True, 'drives': True, 'trackNext': True, 'trackPrevious': True, 'station': True, 'exitCar': True, 'weaponHudRestored': True, 'map': True, 'mapZoom': True, 'waypoint': True, 'closeMap': True, 'pauses': True, 'selectsMenu': True, 'resumes': True, 'diary': True, 'closesDiary': True, 'basketStarts': True, 'basketPauses': True, 'basketResumes': True, 'footballStarts': True, 'footballPauses': True, 'footballResumes': True, 'navesLabel': True, 'navesPauses': True, 'navesExits': True, 'bencomoLabel': True, 'bencomoPauses': True, 'bencomoExits': True, 'guancheLabel': True, 'guanchePauses': True, 'guancheExits': True}
CONTROLES XBOX Y MÓVIL OK
```

### 11. prueba_leyenda_1436_gpu.py — OK

```
{'startsOpen': True, 'toyBeforeUnlock': True, 'correctIcon': True, 'categories': True, 'history': True, 'routeColors': True, 'toyAfterUnlock': True, 'sideMission': True, 'touch': True}
LEYENDA MAPA OK
```

### 12. prueba_luces_pasos_1437_gpu.py — FALLA

```
FALLA AssertionError({'incoming': [['hard', 'walk', 0.5], ['stone', 'run', 0.6]], 'modelCount': 66, 'missing': ['nano'], 'custom': True, 'lensOnly': True, 'noon': 0, 'night': 3.6, 'idle': True, 'sameGeometry': True})
```

### 13. herramientas/foto_1441.py — OK

```
{"p":"<kbd>E</kbd> Pulsar el botón del garaje","a":1.5707963267948966}
FOTO 1441 OK
```

Fotos/archivos nuevos en `tests/shots/`: entrada_mayex.jpg, entrada_rios_tejera.jpg, f1441_bajando.jpg, f1441_dentro.jpg, f1441_frente.jpg, f1441_nano_frente.jpg, f1441_nano_lado.jpg, f1441_noche.jpg, f1441_porton_abierto.jpg, f1441_porton_abriendo.jpg, f1441_porton_cerrado.jpg, f1441_subiendo.jpg, leyenda1436_movil.jpg, leyenda1436_pc.jpg
