# Pruebas 1.1.3 — 2026-11-03 23:03 — 7/8 OK

Listas: v1113a. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 191 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_arranque.py` | **OK** | 0 s |
| 2 | `prueba_futbol.py` | **OK** | 64 s |
| 3 | `prueba_baloncesto.py` | **OK** | 14 s |
| 4 | `prueba_pelea_especiales.py` | **OK** | 15 s |
| 5 | `prueba_misiones.py` | **OK** | 71 s |
| 6 | `prueba_diario.py` | **FALLA** | 1 s |
| 7 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 8 | `herramientas/foto_bencomo.py` | **OK** | 0 s |

## Detalle

### 1. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 24, 'peor': 120, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 2. prueba_futbol.py — OK

```
foto futbol_partido
cpu {'ph': 'play', 'sc': [1, 1], 'golden': False}
resultado {"won":true,"score":[2,1]}
PARTIDO CPU OK
partido fácil 1 [4, 0]
partido fácil 2 [3, 0]
partido fácil 3 [2, 0]
equilibrio primer partido [9, 0] OK
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
campos {'campos': 73, 'puertas': 11, 'enEdificio': [], 'obispo': {'id': 'f62', 'label': 'el campo de fútbol', 'kind': 'f7', 'gate': 'court', 'dist': 666}}
entrada detectada f62
activa Un partido por La Concepción
partido en marcha True
estado obispo 3 futbolTut True
errores JS []
FUTBOL OK
```

### 3. prueba_baloncesto.py — OK

```
foto basket_inicio
foto basket_partido
cpu {'ph': 'end', 'sc': [8, 0], 'clock': 0, 'golden': False}
resultado {"won":true,"score":[8,0]}
PARTIDO CPU OK
partido fácil 1 [22, 0]
partido fácil 2 [15, 0]
partido fácil 3 [25, 3]
equilibrio primer partido [62, 3] OK
jugadores dibujados 66
snap baloncesto_tamano
clic derecho {"ev":{"pass":true},"mode":"pass"}
clic izquierdo {"ev":{"shotT":true,"shot":true},"mode":"air"}
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
cambio de defensor -> EL BLANCO
fin {"won":true,"score":[9,2]} estado play
errores JS []
BALONCESTO OK
```

### 4. prueba_pelea_especiales.py — OK

```
true
{"ph":"fight","ev":{"walk":0},"ay":166}
gofio OK {"walk":9,"gofio":true}
teide OK {"walk":9,"gofio":true,"teide":true}
gancho OK {"walk":9,"gofio":true,"teide":true,"gancho":true}
pastor OK {"walk":9,"gofio":true,"teide":true,"gancho":true,"pastor":true}
ESPECIALES OK
```

### 5. prueba_misiones.py — OK

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

### 6. prueba_diario.py — FALLA

```
activa Una botella para Coco
abierto True misiones 8
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a la Casa Ossuna | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO FALLA
```

### 7. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793747030219,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle":{"
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":3,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Un partido por La Concepción":[["Monseñor Fermín Truchas","Hijo mío, el campanario de La Concepción se inclina. No tanto como la torre de Pisa, pero los turistas ya preguntan.",1793746923121],["Monseñor Fermín Truchas","Esta vez fútbol. Cinco contra cinco en el campo de fútbol, contra mis seminaristas. Llévate a toda tu banda: El Blanco de portero, que en la mili paraba hasta las balas.",1793746923151],["El Chopa","¿Fútbol? Monseñor, yo de fútbol solo sé gritarle al árbitro.",1793746923156],["Monseñor Fermín Truchas","Pues hoy no hay árbitro: hay fe. Y yo desde la banda. Lo recaudado, para el campanario.",1793746923160],["Hermano Mateo","4 a 1. El Señor nos ha dado una lección de humildad. Y vuestro portero, otra de paciencia.",1793746924845]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"futbolTut":true,"defenders":true,"patrol":true,"jugueterias":true,"rifleTut":true,"sastronTut":false,"basketTut":false,"maleIntro":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 8. herramientas/foto_bencomo.py — OK

```
antes {'pogo': True} {'atk': 0.13333333333333336}
nuevo {'pogo': True} {'atk': 0.13333333333333336}
fila 1 = antes, fila 2 = después; columna 1 picado, columna 2 golpe (948, 1008)
FOTO BENCOMO OK
```

Fotos/archivos nuevos en `tests/shots/`: baloncesto_tamano.jpg, basket_inicio.jpg, basket_partido.jpg, basket_tutorial.jpg, basket_zoom.jpg, bencomo_antes_despues.png, futbol_partido.jpg, futbol_tutorial.jpg
