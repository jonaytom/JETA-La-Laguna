# Pruebas 1.0.3 — 2026-11-03 15:33 — 5/5 OK

Listas: base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 137 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 3 | `prueba_bordes.py` | **OK** | 51 s |
| 4 | `prueba_persecuciones.py` | **OK** | 25 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 38 s |

## Detalle

### 1. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1793719888932,"label":"test","player":{"x":-211.04453584070316,"z":780.2358686130583,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":3.0123732081837398,"x":-213.04453584070316,"z":780.2358686130583},"weapon":{"has":true,"ammo":4,"out":
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":null,"punta":"3","maxV":"199","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -215 · Y 0 · 555 m"}
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-1850,-300],"borde":158,"calle":25.9,"coche":false,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[500,3950],"borde0":30,"ahora":[500,3950],"borde":30,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[1500,700],"borde0":305,"ahora":[1500,700],"borde":305,"calle":10,"coche":false,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":64.2,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"RADIO: Gofio FM 90.1 · boom bap lagunero  (Q: cambiar de emisora)"}
{"edificios_en_zonas_quitadas":0}
```

### 4. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 3 m, recorre 0 m en 3 s, salto máx 0.57 m OK
[8] Los bancos del Adelantado: a pie: a 6 m, recorre 10 m en 3 s, salto máx 0.14 m OK
[10] El carterista del Cristo: a pie: a 6 m, recorre 6 m en 3 s, salto máx 0.14 m OK
[12] El rally de La Esperanza: coche: a 2 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 5 m, recorre 12 m en 3 s, salto máx 0.17 m OK | a pie: a 5 m, recorre 11 m en 3 s, salto máx 0.17 m OK
[17] Noche en el aeropuerto: coche: a 25 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 5. prueba_conduccion_tuneles_puentes.py — OK

```
roads 118
failed 0 of 118 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json
