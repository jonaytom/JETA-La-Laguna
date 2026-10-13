# Pruebas 0.75.0 — 2026-10-13 14:56 — 3/3 OK

Listas: v075. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 151 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_075.py` | **OK** | 108 s |
| 2 | `prueba_diario.py` | **OK** | 0 s |
| 3 | `prueba_misiones_guardado.py` | **OK** | 23 s |

## Detalle

### 1. prueba_075.py — OK

```
flecha {'persecucion': '#ff3b30', 'carrera': '#f5b72e'}
ruta adelantada {'a_pie': {'siguientes': 2, 'ruta': 7}, 'con_recorrido': {'siguientes': 2, 'ruta': 21}, 'ultimo': 0}
teclas {'dentro': False, 'despues': False, 'tactil': 0, 'estado': 'play'}
foto v075_portero
foto v075_saque_banda
futbol portero {'portero_mano': True, 'distancia': 3.5, 'falta': '¡FALTA AL PORTERO!', 'sigue_suya': True, 'portero_en_su_area': 2}
futbol banda {'saque': 'banda', 'saca': 0, 'no_corre': True, 'con_mano': True, 'rival_mas_cerca': 14.43}
diario {'primera': ['Segundo', 'Charlas sueltas'], 'n': 2}
copa {'copa': ['Copa Laguna 1/5', 'Copa Laguna 2/5', 'Copa Laguna 3/5', 'Copa Laguna 4/5', 'Copa Laguna: la final'], 'estadio': {'ok': True, 'gradas': 4, 'puerta': [-377, -1023], 'calle': 'Avenida de José Tabares Bartlet'}, 'final': {'final': True, 'label': 'Estadio Francisco Peraza'}}
foto v075_peraza_alto
foto v075_peraza_campo
foto v075_peraza_grada_oeste
foto v075_peraza_puerta
errores JS []
V075 OK
```

### 2. prueba_diario.py — OK

```
activa Una botella para Coco
abierto True misiones 35
detalle Una botella para Coco | Historia · Te la da Coco · En curso | ➜ Busca a Coco junto a el Teatro Leal | De lo más reciente a lo primero |  | Coco: Mira, yo no hablo con la garganta seca. Tráeme una botella de Ron Arrecostao de Café Brasilito, la que tiene la puerta abierta. Y de las grandes. |  | Coco
lineas guardadas 3
historia tras reiniciar 0
cerrado True estado play
errores JS []
DIARIO OK
```

### 3. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"log":{"Charlas sueltas":[["Primero","hola",1791899735092],["Segundo","adiós",1791899735093]],"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1791899746111],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1791899746190],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1791899746216],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1791899746238],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1791899746261],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1791899746329],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1791899746351],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1791899759914]]},"gang":{"formed":false,"name":"","members":[],"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":"Reiniciado desde «Vuelta al barrio»"}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'log': {'Charlas sueltas': [['Primero', 'hola', 1791899735092], ['Segundo', 'adiós', 1791899735093]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1791899746111], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1791899746190], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1791899746216], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1791899746238], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1791899746261], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1791899746329], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1791899746351], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1791899759914]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'log': {'Charlas sueltas': [['Primero', 'hola', 1791899735092], ['Segundo', 'adiós', 1791899735093]], 'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1791899765204], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1791899765217]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

Fotos/archivos nuevos en `tests/shots/`: v075_peraza_alto.jpg, v075_peraza_campo.jpg, v075_peraza_grada_oeste.jpg, v075_peraza_puerta.jpg, v075_portero.jpg, v075_saque_banda.jpg
