# Pruebas 0.76.0 — 2026-10-19 12:15 — 2/3 OK

Listas: v077b. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 257 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_077.py` | **OK** | 72 s |
| 2 | `prueba_misiones_guardado.py` | **OK** | 20 s |
| 3 | `prueba_misiones.py 18 18` | **FALLA** | 147 s |

## Detalle

### 1. prueba_077.py — OK

```
juntado {'stats': {'sueltas': 5495, 'juntadas': 4887, 'mallas': 1275, 'ms': 190, 'no': {'transparente': 330, 'grupo con nombre': 3423, 'varios materiales': 2, 'userData': 103, 'onBeforeRender': 1}, 'ultimoId': 24681}, 'fusion': 1275, 'celdas': 10805, 'lod': 15413, 'peatones_enteros': 8}
distancia {'cerca': [50, 50], 'lejos': [0, 13930], 'niebla': 520}
aparcados {'grupos': 2938, 'coches': 9634, 'instanciados': True, 'escala_antes': 1, 'escala_despues': 0, 'color': True, 'shaders_rotos': 0}
carga total 8084 ms; plazas [403] aparcados [380]
junta piezas 4887
foto v077_adelantado_junta
foto v077_adelantado_suelo_junta
foto v077_casco_junta
foto v077_alto_junta
foto v077_constitucion_junta
suelta piezas 4887
foto v077_adelantado_suelta
foto v077_adelantado_suelo_suelta
foto v077_casco_suelta
foto v077_alto_suelta
foto v077_constitucion_suelta
errores [] shader []
PRUEBA 077 OK
```

### 2. prueba_misiones_guardado.py — OK

```
a mitad: {"act":"Atraco en la farmacia","m":{"v":3,"story":6,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{"Atraco en la farmacia":[["Rayco «El Blanco»","«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»",1792408389925],["El Chopa","Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.",1792408389946],["Rayco «El Blanco»","«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»",1792408389962],["Radio de la Local (en el escáner de El Blanco)","Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.",1792408389982],["El Chopa","Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!",1792408389998],["Ladrón con pasamontañas","¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!",1792408390049],["El Chopa","Suelta la caja de las tiritas y ven p'acá.",1792408390071],["Ladrón (en el suelo)","¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...",1792408400627]]},"gang":{"formed":false,"name":"","members":[]},"active":"Atraco en la farmacia"},"blips":2,"lawful":true,"tg":0,"dlg":false,"toast":""}
cargada: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792408389925], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792408389946], ['Rayco «El Blanco»', '«Mmm... radio... ¡brrr!... farmacia... atraco... ¡ahora!»', 1792408389962], ['Radio de la Local (en el escáner de El Blanco)', 'Atraco en curso en Guacimara C. Hernandez. Dos individuos. Todas las patrullas ocupadas en las fiestas.', 1792408389982], ['El Chopa', 'Nadie va a ir... Vamos nosotros. Una banda que defiende su barrio. ¡Al lío!', 1792408389998], ['Ladrón con pasamontañas', '¿Y tú quién eres, el de la nariz? ¡Esto no va contigo, pibe!', 1792408390049], ['El Chopa', "Suelta la caja de las tiritas y ven p'acá.", 1792408390071], ['Ladrón (en el suelo)', '¡Ay, ay! ¡Vale, vale, me rindo! Pero mi colega ya se va con la caja...', 1792408400627]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': False, 'toast': 'RADIO: Gofio FM 90.1 · boom bap lagunero (Q: cambiar de emisora)'}
1 guardar a mitad: OK (coches de misión sueltos: 0)
tras fallar: {'act': None, 'm': {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 0, 'sideOpen': False, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {'Atraco en la farmacia': [['Rayco «El Blanco»', '«Brrr... Chopa... mmm... la pistola... psss... bolas... de plástico.»', 1792408406013], ['El Chopa', 'Ya, Blanco, ya me lo dijiste: aire comprimido, bolas de plástico. Pupa sí, pero no mata.', 1792408406025]]}, 'gang': {'formed': False, 'name': '', 'members': [], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}, 'blips': 2, 'lawful': False, 'tg': 0, 'dlg': True, 'toast': 'prueba de reintento'}
2 reintentar: OK Atraco en la farmacia
3 partida antigua: OK {'v': 3, 'story': 6, 'skip': [], 'storyDone': False, 'side': 1, 'sideOpen': True, 'obispo': 0, 'torneo': 0, 'copa': 0, 'secreta': 0, 'carreras': 0, 'log': {}, 'gang': {'formed': True, 'name': 'Los Chopas', 'members': ['boca'], 'sastronTut': False, 'defenders': False, 'patrol': False, 'basketTut': False, 'futbolTut': False, 'jugueterias': False, 'maleIntro': False, 'rifleTut': False}, 'active': None}
4 orden por zonas (partida de antes): OK {'sig': 'Los bancos del Adelantado', 'skip': ['El carterista del Cristo', 'Baches en la Vía de Ronda'], 'sig2': 'Los bancos del Adelantado', 'skip2': ['El carterista del Cristo', 'Baches en la Vía de Ronda']}
ERRORES JS: []
CONTINUIDAD OK
```

### 3. prueba_misiones.py 18 18 — FALLA

```
[18] El rifle de agua: TIEMPO · dinero +-350 · pasos talk>goto>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>shop>dlg>s
     objetivo: Ve a la fuente donde te espera El Blanco con el rifle · No te llega el dinero | EL RIFLE DE AGUA
MISIONES FALLA
```

Fotos/archivos nuevos en `tests/shots/`: v077_adelantado_junta.jpg, v077_adelantado_suelo_junta.jpg, v077_adelantado_suelo_suelta.jpg, v077_adelantado_suelta.jpg, v077_alto_junta.jpg, v077_alto_suelta.jpg, v077_casco_junta.jpg, v077_casco_suelta.jpg, v077_constitucion_junta.jpg, v077_constitucion_suelta.jpg
