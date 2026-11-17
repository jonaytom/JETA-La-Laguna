# Pruebas 1.4.21 — 2026-11-17 13:33 — 5/5 OK

Listas: v1421, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 488 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1421.py` | **OK** | 16 s |
| 2 | `prueba_1420.py` | **OK** | 0 s |
| 3 | `prueba_misiones.py` | **OK** | 387 s |
| 4 | `prueba_arranque.py` | **OK** | 1 s |
| 5 | `herramientas/foto_propios.py` | **OK** | 57 s |

## Detalle

### 1. prueba_1421.py — OK

```
{'bus': {'id': 'guagua', 'type': 'bus', 'paint': 2067020, 'L': 11.4}, 'basura': 16185076, 'kenney': []}
GUAGUA_PROPIA OK
BASURA_BLANCA OK
SIN_KENNEY OK
errores []
PRUEBA 1421 OK
```

### 2. prueba_1420.py — OK

```
{'col': {'taxi': {'paint': 16185076, 'bar': 0}, 'taxi2': {'paint': 16185076, 'bar': 0}, 'taxi3': {'paint': 16185076, 'bar': 0}, 'bomberos': {'paint': 11736092, 'bar': 2}, 'grua': {'paint': 15905306, 'bar': 0}, 'policia': {'paint': 16185076, 'bar': 2}, 'daily': {'paint': 16720384, 'bar': 0}, 'daily2': {'paint': 16720384, 'bar': 0}, 'canter': {'paint': 16720384, 'bar': 0}, 'sprinter': {'paint': 16720384, 'bar': 0}, 'clip': {'paint': 16720384, 'bar': 0}}, 'alias': ['clip', 'traficc', 'vivita', 'carlota', 'helado', 'hilos'], 'kenney': [], 'taxis': ['taxi2', 'taxi3', 'taxi']}
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
[18] El rifle de agua: PASA · dinero +-50 · pasos talk>goto>shop>dlg>goto>talk>douse>goto>douse>goto>douse>talk>goto>shop>talk>soak>talk>idle
MISIONES OK
```

### 4. prueba_arranque.py — OK

```
30 pasos (ms): {'mediana': 50, 'peor': 77, 'estado': 'play'}
errores JS []
ARRANQUE OK
```

### 5. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12592, 'troceenC44': 11978, 'carlota': 11666, 'yaiza': 11314, 'trex': 11354, 'di55': 11988, 'jtm3': 12052, 'guancheGT': 12712, 'reniego': 11182, 'cartabon': 12586, 'tipoe': 12662, 'ltg': 12692, 'fierilla': 11130, 'piki': 11310, 'oalgo': 11344, 'gomera': 11330, 'teypan': 11272, 'chayan': 11690, 'olecorsa': 11330, 'mocco': 11658, 'tyaiza': 11584, 'helado': 11600, 'dsendero': 11778, 'beluga': 11210, 'vivita': 11160, 'newton3': 11052, 'cactus': 13510, 'clip': 11604, 'nano': 11940, 'pimbo': 11336, 'torson': 11366, 'queguay': 11378, 'mphs': 11714, 'vengator': 11364, 'ficus': 12422, 'mepierdo': 11894, 'padelgti': 10784, 'pantera': 12176, 'hubli': 11548, 'reventon': 11508, 'koala': 11598, 'compi': 11258, 'cassi': 11282, 'traficc': 10402, 'seta128': 10966, 'triplon': 11254, 'hilos': 12968, 'navarra': 12992, 'policia': 12402, 'policia2': 11604, 'policia3': 11556, 'ambulancia': 10778, 'daily': 16534, 'daily2': 16230, 'canter': 16547, 'sprinter': 11045, 'grua': 16327, 'bomberos': 22103, 'taxi': 12894, 'taxi2': 12292, 'taxi3': 11902, 'basura': 21477, 'guagua': 11203}
aparcados {'compi': 179, 'helado': 319, 'piki': 259, 'mepierdo': 189, 'yaiza': 155, 'ltg': 69, 'clip': 331, 'olecorsa': 289, 'padelgti': 141, 'chayan': 62, 'traficc': 199, 'dsendero': 341, 'carlota': 288, 'hubli': 77, 'triplon': 134, 'troceen': 241, 'koala': 205, 'vivita': 127, 'tyaiza': 389, 'seta128': 74, 'hilos': 105, 'troceenC44': 104, 'newton3': 120, 'gomera': 337, 'teypan': 61, 'jtm3': 135, 'beluga': 202, 'pantera': 138, 'tipoe': 137, 'mphs': 107, 'cactus': 74, 'pimbo': 165, 'oalgo': 173, 'reniego': 116, 'cassi': 202, 'navarra': 82, 'queguay': 183, 'torson': 143, 'di55': 63, 'cartabon': 111, 'nano': 164, 'vengator': 89, 'trex': 118, 'mocco': 120, 'ficus': 164, 'guancheGT': 25, 'fierilla': 24, 'reventon': 30}
aparcado {'x': -675.1314697265625, 'y': 2.66100811958313, 'z': 112.50886535644531, 'h': 0.4636476090008061, 'n': 5033}
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: propios_ambulancia.jpg, propios_aparcado.jpg, propios_aparcado_detras.jpg, propios_basura.jpg, propios_beluga.jpg, propios_bomberos.jpg, propios_cactus.jpg, propios_canter.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_cassi.jpg, propios_chayan.jpg, propios_clip.jpg, propios_compi.jpg, propios_conjunto.jpg, propios_daily.jpg, propios_daily2.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_ficus.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_grua.jpg, propios_guagua.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_hilos.jpg, propios_hubli.jpg, propios_jtm3.jpg, propios_koala.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mepierdo.jpg, propios_mocco.jpg, propios_mphs.jpg, propios_nano.jpg, propios_navarra.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_padelgti.jpg, propios_pantera.jpg, propios_piki.jpg, propios_pimbo.jpg, propios_policia.jpg, propios_policia2.jpg, propios_policia3.jpg, propios_queguay.jpg, propios_reniego.jpg, propios_reventon.jpg, propios_seta128.jpg, propios_sprinter.jpg, propios_taxi.jpg, propios_taxi2.jpg, propios_taxi3.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_torson.jpg, propios_traficc.jpg, propios_trex.jpg, propios_triplon.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vengator.jpg, propios_vivita.jpg, propios_yaiza.jpg
