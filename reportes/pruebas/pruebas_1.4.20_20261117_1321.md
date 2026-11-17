# Pruebas 1.4.20 — 2026-11-17 13:21 — 3/3 OK

Listas: v1420b, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 388 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1420.py` | **OK** | 16 s |
| 2 | `prueba_arranque.py` | **OK** | 1 s |
| 3 | `herramientas/foto_propios.py` | **OK** | 344 s |

## Detalle

### 1. prueba_1420.py — OK

```
{'col': {'taxi': {'paint': 16185076, 'bar': 0}, 'taxi2': {'paint': 16185076, 'bar': 0}, 'taxi3': {'paint': 16185076, 'bar': 0}, 'bomberos': {'paint': 11736092, 'bar': 2}, 'grua': {'paint': 15905306, 'bar': 0}, 'policia': {'paint': 16185076, 'bar': 2}, 'daily': {'paint': 16720384, 'bar': 0}, 'daily2': {'paint': 16720384, 'bar': 0}, 'canter': {'paint': 16720384, 'bar': 0}, 'sprinter': {'paint': 16720384, 'bar': 0}, 'clip': {'paint': 16720384, 'bar': 0}}, 'alias': ['clip', 'traficc', 'vivita', 'carlota', 'helado', 'hilos'], 'kenney': ['basura'], 'taxis': ['taxi2', 'taxi', 'taxi3']}
TAXIS_BLANCOS OK
BOMBEROS_ROJO_Y_LUCES OK
GRUA_AMARILLA OK
CAMIONES_SE_TINEN OK
IDS_VIEJOS OK
SOLO_BASURA_DE_KENNEY OK
VARIOS_TAXIS OK
(trafficModel no accesible: no se comprueba que salgan todos)
errores []
PRUEBA 1420 OK
```

### 2. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 33, 'peor': 118, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 3. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12592, 'troceenC44': 11978, 'carlota': 11666, 'yaiza': 11314, 'trex': 11354, 'di55': 11988, 'jtm3': 12052, 'guancheGT': 12712, 'reniego': 11182, 'cartabon': 12586, 'tipoe': 12662, 'ltg': 12692, 'fierilla': 11130, 'piki': 11310, 'oalgo': 11344, 'gomera': 11330, 'teypan': 11272, 'chayan': 11690, 'olecorsa': 11330, 'mocco': 11658, 'tyaiza': 11584, 'helado': 11600, 'dsendero': 11778, 'beluga': 11210, 'vivita': 11160, 'newton3': 11052, 'cactus': 13510, 'clip': 11604, 'nano': 11940, 'pimbo': 11336, 'torson': 11366, 'queguay': 11378, 'mphs': 11714, 'vengator': 11364, 'ficus': 12422, 'mepierdo': 11894, 'padelgti': 10784, 'pantera': 12176, 'hubli': 11548, 'reventon': 11508, 'koala': 11598, 'compi': 11258, 'cassi': 11282, 'traficc': 10402, 'seta128': 10966, 'triplon': 11254, 'hilos': 12968, 'navarra': 12992, 'policia': 12402, 'policia2': 11604, 'policia3': 11556, 'ambulancia': 10778, 'daily': 16534, 'daily2': 16230, 'canter': 16547, 'sprinter': 11045, 'grua': 16327, 'bomberos': 22103, 'taxi': 12894, 'taxi2': 12292, 'taxi3': 11902}
aparcados {'jtm3': 143, 'ficus': 162, 'piki': 238, 'padelgti': 136, 'olecorsa': 290, 'gomera': 342, 'clip': 333, 'carlota': 290, 'tyaiza': 381, 'mepierdo': 171, 'helado': 321, 'cassi': 193, 'vivita': 168, 'hilos': 109, 'dsendero': 329, 'nano': 172, 'di55': 78, 'vengator': 109, 'trex': 136, 'traficc': 179, 'newton3': 140, 'pantera': 134, 'tipoe': 120, 'cactus': 109, 'triplon': 150, 'ltg': 52, 'torson': 151, 'beluga': 207, 'pimbo': 177, 'teypan': 68, 'mphs': 91, 'koala': 230, 'queguay': 157, 'reniego': 103, 'compi': 170, 'troceen': 245, 'troceenC44': 90, 'yaiza': 150, 'navarra': 69, 'seta128': 85, 'cartabon': 92, 'hubli': 75, 'oalgo': 180, 'chayan': 60, 'mocco': 98, 'reventon': 14, 'guancheGT': 18, 'fierilla': 19}
aparcado {'x': -675.1314697265625, 'y': 2.66100811958313, 'z': 112.50886535644531, 'h': 0.4636476090008061, 'n': 4994}
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: propios_ambulancia.jpg, propios_aparcado.jpg, propios_aparcado_detras.jpg, propios_beluga.jpg, propios_bomberos.jpg, propios_cactus.jpg, propios_canter.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_cassi.jpg, propios_chayan.jpg, propios_clip.jpg, propios_compi.jpg, propios_conjunto.jpg, propios_daily.jpg, propios_daily2.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_ficus.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_grua.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_hilos.jpg, propios_hubli.jpg, propios_jtm3.jpg, propios_koala.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mepierdo.jpg, propios_mocco.jpg, propios_mphs.jpg, propios_nano.jpg, propios_navarra.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_padelgti.jpg, propios_pantera.jpg, propios_piki.jpg, propios_pimbo.jpg, propios_policia.jpg, propios_policia2.jpg, propios_policia3.jpg, propios_queguay.jpg, propios_reniego.jpg, propios_reventon.jpg, propios_seta128.jpg, propios_sprinter.jpg, propios_taxi.jpg, propios_taxi2.jpg, propios_taxi3.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_torson.jpg, propios_traficc.jpg, propios_trex.jpg, propios_triplon.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vengator.jpg, propios_vivita.jpg, propios_yaiza.jpg
