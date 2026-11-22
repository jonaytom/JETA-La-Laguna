# Pruebas 1.4.27 — 2026-11-19 22:44 — 4/4 OK

Listas: v1427. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 63 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1427_gpu.py` | **OK** | 20 s |
| 2 | `prueba_misiones.py 6 6` | **OK** | 14 s |
| 3 | `prueba_1424.py` | **OK** | 0 s |
| 4 | `prueba_guardar_cargar.py` | **OK** | 3 s |

## Detalle

### 1. prueba_1427_gpu.py — OK

```
{'gpsSameStreet': True, 'gpsOneWay': True, 'farm': {'drive': 1690, 'carDistance': 159, 'footDistance': 118, 'walk': 73}, 'lotParkedOnRoute': 0, 'moving': {'shades': 21, 'white': 0.04222159251912723}, 'parked': {'models': 50, 'shades': 21, 'white': 0.045011845222426954}, 'liveTraffic': {'cars': 21, 'shades': 16, 'white': 2}, 'clever': True, 'aim': True, 'arcades': {'naves': True, 'bencomo': True, 'guanche': True}, 'touchAim': True}
PRUEBA 1427 OK
```

### 2. prueba_misiones.py 6 6 — OK

```
[6] Atraco en la farmacia: PASA · dinero +1500 · pasos talk>goto>talk>fight>talk>goto>follow>shot>talk>grab>talk>idle
MISIONES OK
```

### 3. prueba_1424.py — OK

```
1280 720 False [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
740 360 True [{'id': 'piki', 'ok': True}, {'id': 'vivita', 'ok': True}, {'id': 'carlota', 'ok': True}, {'id': 'cartabon', 'ok': True}, {'id': 'tipoe', 'ok': True}, {'id': 'fierilla', 'ok': True}]
PRUEBA 1424 OK
```

### 4. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1795128283417,"label":"test","player":{"x":-188.85220316222484,"z":783.1196180571543,"h":0,"health":77,"money":1234},"car":{"type":"bus","model":"guagua","color":2067020,"h":-0.1292194454060533,"x":-190.85220316222484,"z":783.1196180571543},"weapon":{"has":true,"ammo":4,"out":true},"rifle
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1795128267639],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1795128267683],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1795128267716],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1795128267746],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1795128267772],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1795128267849],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1795128267905],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1795128276199],["Ladrón","¡Buaaaa! ¡Que escuece, que escuece! ¡Me rindo, pero no me tires más bolitas! ¡Buaaa!",1795128281973],["Ladrón","¡Snif! ¡Vale, la caja está en el coche! ¡Snif!",1795128282027],["Policía Local (llegando por fin)","¿Esto lo habéis hecho vosotros? Con una de bolas... Bueno, la caja está entera. Nos lo llevamos.",1795128282053],["Policía Local","El alcalde, Don Yovoy Gofiérrez, ya se ha enterado. Os quiere ver en el Ayuntamiento, en la Plaza del Adelantado. Hoy no es delito: hoy sois héroes.",1795128282083]]},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"obispoIntro":false,"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest auto
ERR []
```
