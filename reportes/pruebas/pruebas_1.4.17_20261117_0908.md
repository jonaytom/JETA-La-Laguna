# Pruebas 1.4.17 — 2026-11-17 09:08 — 3/4 OK

Listas: v1417, propios144. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 465 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_1416.py` | **FALLA** | 15 s |
| 2 | `prueba_misiones.py` | **OK** | 357 s |
| 3 | `prueba_persecuciones.py` | **OK** | 25 s |
| 4 | `herramientas/foto_propios.py` | **OK** | 40 s |

## Detalle

### 1. prueba_1416.py — FALLA

```
blanco {'from': [-758, -364], 'at': [-761.4641016151378, -366], 'walk': True, 'ring': True}
BLANCO_ACCESIBLE OK
recorridos 41 · al alcance 40 acaban en la siguiente 33 · lejos 1 acaban más cerca 1
   no llega {'line': 'obispo', 'title': 'Un partido por la Catedral', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'El torneo de la parroquia', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Un partido por La Concepción', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'El clásico de las cofradías', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Fuego en la ermita', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'La carrera de los sacristanes', 'D': 0, 'end': None}
   no llega {'line': 'obispo', 'title': 'Curas contra concejales', 'D': 0, 'end': None}
RECORRIDOS_HACIA_LA_SIGUIENTE FALLA
pilotos {'troceen': [1128], 'clip': [1128], 'torson': [1128], 'beluga': [1104], 'reventon': [1128]}
PILOTOS_PROPIOS OK
errores []
PRUEBA 1416 FALLA
```

### 2. prueba_misiones.py — OK

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

### 3. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.64 m OK
[8] Los bancos del Adelantado: a pie: a 2 m, recorre 14 m en 3 s, salto máx 0.16 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 8 m en 3 s, salto máx 0.16 m OK
[12] El rally de La Esperanza: coche: a 3 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 9 m en 3 s, salto máx 0.15 m OK | a pie: a 10 m, recorre 10 m en 3 s, salto máx 0.15 m OK
[17] Noche en el aeropuerto: coche: a 24 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 4. herramientas/foto_propios.py — OK

```
triángulos {'troceen': 12592, 'troceenC44': 11978, 'carlota': 11666, 'yaiza': 11314, 'trex': 11354, 'di55': 11988, 'jtm3': 12052, 'guancheGT': 12712, 'reniego': 11182, 'cartabon': 12586, 'tipoe': 12662, 'ltg': 12692, 'fierilla': 11130, 'piki': 11310, 'oalgo': 11344, 'gomera': 11330, 'teypan': 11272, 'chayan': 11690, 'olecorsa': 11330, 'mocco': 11658, 'tyaiza': 11584, 'helado': 11600, 'dsendero': 11778, 'beluga': 11210, 'vivita': 11160, 'newton3': 11052, 'cactus': 13510, 'clip': 11604, 'nano': 11940, 'pimbo': 11336, 'torson': 11366, 'queguay': 11378, 'mphs': 11714, 'vengator': 11364, 'ficus': 12422, 'mepierdo': 11894, 'padelgti': 10784, 'pantera': 12176, 'hubli': 11548, 'reventon': 11508, 'koala': 11598, 'compi': 11258, 'cassi': 11282, 'traficc': 10402, 'seta128': 10966}
aparcados {'ficus': 198, 'cassi': 173, 'torson': 205, 'vivita': 166, 'beluga': 203, 'teypan': 84, 'helado': 486, 'piki': 269, 'reniego': 122, 'compi': 148, 'newton3': 193, 'koala': 235, 'tipoe': 143, 'tyaiza': 389, 'gomera': 404, 'queguay': 201, 'traficc': 168, 'carlota': 194, 'clip': 183, 'dsendero': 239, 'troceen': 287, 'mocco': 110, 'ltg': 59, 'seta128': 44, 'padelgti': 103, 'nano': 168, 'oalgo': 155, 'mepierdo': 189, 'olecorsa': 159, 'cactus': 161, 'pantera': 103, 'pimbo': 161, 'di55': 122, 'hubli': 51, 'yaiza': 111, 'chayan': 75, 'jtm3': 188, 'mphs': 76, 'cartabon': 126, 'vengator': 90, 'trex': 116, 'troceenC44': 52, 'fierilla': 12, 'reventon': 9}
aparcado {'x': -675.1314697265625, 'y': 2.66100811958313, 'z': 112.50886535644531, 'h': 0.4636476090008061, 'n': 4718}
FOTO PROPIOS OK
```

Fotos/archivos nuevos en `tests/shots/`: propios_aparcado.jpg, propios_aparcado_detras.jpg, propios_beluga.jpg, propios_cactus.jpg, propios_carlota.jpg, propios_cartabon.jpg, propios_cassi.jpg, propios_chayan.jpg, propios_clip.jpg, propios_compi.jpg, propios_conjunto.jpg, propios_di55.jpg, propios_dsendero.jpg, propios_ficus.jpg, propios_fierilla.jpg, propios_gomera.jpg, propios_guancheGT.jpg, propios_helado.jpg, propios_hubli.jpg, propios_jtm3.jpg, propios_koala.jpg, propios_lado.jpg, propios_ltg.jpg, propios_mepierdo.jpg, propios_mocco.jpg, propios_mphs.jpg, propios_nano.jpg, propios_newton3.jpg, propios_oalgo.jpg, propios_olecorsa.jpg, propios_padelgti.jpg, propios_pantera.jpg, propios_piki.jpg, propios_pimbo.jpg, propios_queguay.jpg, propios_reniego.jpg, propios_reventon.jpg, propios_seta128.jpg, propios_teypan.jpg, propios_tipoe.jpg, propios_torson.jpg, propios_traficc.jpg, propios_trex.jpg, propios_troceen.jpg, propios_troceenC44.jpg, propios_tyaiza.jpg, propios_vengator.jpg, propios_vivita.jpg, propios_yaiza.jpg
