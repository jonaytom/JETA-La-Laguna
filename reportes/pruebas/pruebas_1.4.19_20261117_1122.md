# Pruebas 1.4.19 — 2026-11-17 11:22 — 4/4 OK

Listas: v1419, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 384 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1419.py` | **OK** | 16 s |
| 2 | `prueba_1416.py` | **OK** | 0 s |
| 3 | `prueba_arranque.py` | **OK** | 1 s |
| 4 | `herramientas/foto_propios.py` | **OK** | 341 s |

## Detalle

### 1. prueba_1419.py — OK

```
{'policia': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'policia2': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'policia3': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'ambulancia': {'paint': 16185076, 'bar': [36, 36], 'tl': 1}, 'clip': {'paint': 16720384, 'bar': None, 'tl': 1}, 'hilos': {'paint': 16720384, 'bar': None, 'tl': 1}, 'pesos': {'hilux': 0, 'navara': 0, 'doblo': 0, 'hilos': 4, 'navarra': 2, 'triplon': 2}, 'patrullas': ['policia3', 'policia', 'policia2']}
policia OK
policia2 OK
policia3 OK
ambulancia OK
COCHES_NORMALES_SE_TINEN OK
KENNEY_SUSTITUIDOS OK
VARIAS_PATRULLAS OK
errores []
PRUEBA 1419 OK
```

### 2. prueba_1416.py — OK

```
blanco {'from': [-758, -364], 'at': [-761.4641016151378, -366], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
recorridos 41 · al alcance 40 acaban en la siguiente 39 · lejos 1 acaban más cerca 1
   no llega {'line': 'torneo', 'title': 'Torneo Lagunero 1/5', 'D': 1206, 'end': None}
RECORRIDOS_HACIA_LA_SIGUIENTE OK
pilotos {'troceen': [1128], 'clip': [1128], 'torson': [1128], 'beluga': [1104], 'reventon': [1128]}
PILOTOS_PROPIOS OK
errores []
PRUEBA 1416 OK
```

### 3. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 35, 'peor': 146, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 4. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12592, 'troceenC44': 11978, 'carlota': 11666, 'yaiza': 11314, 'trex': 11354, 'di55': 11988, 'jtm3': 12052, 'guancheGT': 12712, 'reniego': 11182, 'cartabon': 12586, 'tipoe': 12662, 'ltg': 12692, 'fierilla': 11130, 'piki': 11310, 'oalgo': 11344, 'gomera': 11330, 'teypan': 11272, 'chayan': 11690, 'olecorsa': 11330, 'mocco': 11658, 'tyaiza': 11584, 'helado': 11600, 'dsendero': 11778, 'beluga': 11210, 'vivita': 11160, 'newton3': 11052, 'cactus': 13510, 'clip': 11604, 'nano': 11940, 'pimbo': 11336, 'torson': 11366, 'queguay': 11378, 'mphs': 11714, 'vengator': 11364, 'ficus': 12422, 'mepierdo': 11894, 'padelgti': 10784, 'pantera': 12176, 'hubli': 11548, 'reventon': 11508, 'koala': 11598, 'compi': 11258, 'cassi': 11282, 'traficc': 10402, 'seta128': 10966, 'triplon': 11254, 'hilos': 12968, 'navarra': 12992, 'policia': 12402, 'policia2': 11604, 'policia3': 11556, 'ambulancia': 10778}
aparcados {'newton3': 190, 'olecorsa': 174, 'queguay': 205, 'koala': 212, 'mocco': 97, 'gomera': 441, 'dsendero': 252, 'traficc': 160, 'trex': 118, 'mepierdo': 174, 'hubli': 72, 'cactus': 223, 'vivita': 163, 'piki': 295, 'jtm3': 198, 'troceen': 286, 'tyaiza': 394, 'mphs': 99, 'torson': 171, 'vengator': 106, 'navarra': 52, 'tipoe': 136, 'cassi': 148, 'nano': 172, 'beluga': 223, 'yaiza': 114, 'oalgo': 154, 'helado': 504, 'pantera': 105, 'pimbo': 169, 'compi': 162, 'triplon': 129, 'troceenC44': 78, 'padelgti': 87, 'cartabon': 99, 'clip': 228, 'carlota': 180, 'di55': 119, 'ficus': 172, 'hilos': 99, 'reniego': 122, 'ltg': 68, 'teypan': 69, 'chayan': 74, 'seta128': 37, 'reventon': 12, 'fierilla': 14}
aparcado {'x': -675.1314697265625, 'y': 2.66100811958313, 'z': 112.50886535644531, 'h': 0.4636476090008061, 'n': 4971}
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: propios_ambulancia.jpg, propios_aparcado.jpg, propios_aparcado_detras.jpg, propios_beluga.jpg, propios_cactus.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_cassi.jpg, propios_chayan.jpg, propios_clip.jpg, propios_compi.jpg, propios_conjunto.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_ficus.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_hilos.jpg, propios_hubli.jpg, propios_jtm3.jpg, propios_koala.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mepierdo.jpg, propios_mocco.jpg, propios_mphs.jpg, propios_nano.jpg, propios_navarra.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_padelgti.jpg, propios_pantera.jpg, propios_piki.jpg, propios_pimbo.jpg, propios_policia.jpg, propios_policia2.jpg, propios_policia3.jpg, propios_queguay.jpg, propios_reniego.jpg, propios_reventon.jpg, propios_seta128.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_torson.jpg, propios_traficc.jpg, propios_trex.jpg, propios_triplon.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vengator.jpg, propios_vivita.jpg, propios_yaiza.jpg
