# Pruebas 1.4.27 — 2026-11-19 22:51 — 5/5 OK

Listas: v1427. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 75 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1427_gpu.py` | **OK** | 24 s |
| 2 | `prueba_prologo_1427.py` | **OK** | 3 s |
| 3 | `prueba_misiones.py 6 6` | **OK** | 14 s |
| 4 | `prueba_1424.py` | **OK** | 0 s |
| 5 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

### 1. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04274937133277452}, 'parked': {'models': 50, 'shades': 21, 'white': 0.045253122062575535}, 'liveTraffic': {'cars': 23, 'shades': 14, 'white': 0}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 2. prueba_prologo_1427.py — OK

```
{'steps': [867, 717, 509, 188], 'triggered': True, 'start': 27, 'finish': 57, 'length': 1206, 'checkpoints': 5, 'sign': 16, 'cafe': 16} {'reward': 2500, 'side': 1}
PRÓLOGO Y CARRERA OK
```

### 3. prueba_misiones.py 6 6 — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
MISIONES OK
```

### 4. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```

### 5. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795128662949,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":1,"sideOpen":true,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Carrera con el Canarión":[["El Canarión","¡Mi niño! ¿Tú eres el Chopa, el de la banda nueva? ¡Ños, qué nariz! Dicen que eres listo, que hasta en la cárcel organizabas el bingo.",1795128643615],["El Canarión","Yo vengo de la isla redonda a enseñaros a conducir, que aquí vais todos a cuarenta y con el intermitente puesto.",1795128643652],["El Canarión","Carrera por el barrio, coche contra coche. Acabamos junto a Sastrón. Si ganas, te llevas 2.500 €. Si pierdes, me invitas a unas papas arrugadas.",1795128643653],["El Canarión","¿Que no tienes coche? Coge uno, que La Laguna está llena. O el mío, si te atreves.",1795128643654],["El Canarión (por el móvil)","¡Ños! ¿Me sacaste 146 segundos? Toma, 2.500 €, bien ganados.",1795128647020],["El Canarión (por el móvil)","Sastrón está aquí al lado. Ve a llevarle el dinero.",1795128647028]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795128647098],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795128647125],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795128647149],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795128647185],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795128647244],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795128647321],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795128647362],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795128655768],["Ladrón","¡Buaaaa! ¡Que escuece, que escuece! ¡Me rindo, pero no me tires más bolitas! ¡Buaaa!",1795128661442],["Ladrón","¡Snif! ¡Vale, la caja está en el coche! ¡Snif!",1795128661504],["Policía Local (llegando por fin)","¿Esto lo habéis hecho vosotros? Con una de bolas... Bueno, la caja está entera. Nos lo llevamos.",1795128661532],["Policía Local","El alcalde, Don Yovoy Gofiérrez, ya se ha enterado. Os quiere ver en el Ayuntamiento, en la Plaza del Adelantado. Hoy no es delito: hoy sois héroes.",1795128661562]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false,"obispoIntro":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest auto
ERR []
```
