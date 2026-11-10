# Pruebas 1.3.3 — 2026-11-10 20:03 — 5/5 OK

Listas: base. En el PC de Jonay (`scripts\PRUEBAS*.bat`), 159 s en total.

| # | Prueba | Resultado | Tiempo |
|---|---|---|---|
| 1 | `prueba_guardar_cargar.py` | **OK** | 3 s |
| 2 | `prueba_coche_y_boca.py` | **OK** | 1 s |
| 3 | `prueba_bordes.py` | **OK** | 38 s |
| 4 | `prueba_persecuciones.py` | **OK** | 23 s |
| 5 | `prueba_conduccion_tuneles_puentes.py` | **OK** | 67 s |

## Detalle

### 1. prueba_guardar_cargar.py — OK

```
saved {"v":1,"t":1794340854766,"label":"test","player":{"x":-191.8591345618258,"z":806.259916219301,"h":1.5707963267948966,"health":77,"money":1234},"car":{"type":"bus","model":null,"color":2067020,"h":-0.1292194454060533,"x":-193.8591345618258,"z":806.259916219301},"weapon":{"has":true,"ammo":4,"out":tru
after {"st":"play","m":{"v":3,"story":3,"skip":[],"storyDone":false,"side":0,"sideOpen":false,"obispo":0,"torneo":0,"copa":0,"secreta":0,"carreras":0,"log":{},"gang":{"formed":false,"name":"","members":[],"casa":{"intro":false,"owned":[],"rent":null,"day":0,"lastTod":12.00111111111111},"arcade":{"scores":{},"bought":[],"console":false,"invited":false},"sastronTut":false,"defenders":false,"patrol":false,"basketTut":false,"futbolTut":false,"jugueterias":false,"maleIntro":false,"rifleTut":false},"active":null},"money":1234,"hp":77,"tod":15.5,"car":true,"w":true,"ammo":4,"title":"La firma de la banda"}
latest 2
ERR []
```

### 2. prueba_coche_y_boca.py — OK

```
{"modelo":"Guanche GT","t0a100":"2.9","punta":"205","maxV":"206","boca":["-531.4","-351.8"],"inicio":["-532.0","-353.7"],"coords":"X -192 · Y 0 · 555 m"}
```

### 3. prueba_bordes.py — OK

```
{"inicio":[-1850,-300],"borde0":158.1,"ahora":[-2,11],"borde":816,"calle":3.8,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-19 salud)"}
{"inicio":[500,3950],"borde0":30,"ahora":[-2,11],"borde":816,"calle":3.8,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-19 salud)"}
{"inicio":[1500,700],"borde0":305,"ahora":[-2,11],"borde":816,"calle":3.8,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-19 salud)"}
{"inicio":[-300,1600],"borde0":900,"ahora":[-300,1600],"borde":900,"calle":null,"coche":true,"aviso":"¡Ay! Te has dado un buen golpe (-19 salud)"}
{"inicio":[2350,1500],"borde0":50,"ahora":[2351,1500],"borde":49,"calle":27.4,"coche":true,"aviso":"⚠ Saliendo del mundo — da la vuelta"}
{"edificios_en_zonas_quitadas":1852}
```

### 4. prueba_persecuciones.py — OK

```
[6] Atraco en la farmacia: a pie: a 0 m, recorre 0 m en 3 s, salto máx 0.63 m OK
[8] Los bancos del Adelantado: a pie: a 9 m, recorre 13 m en 3 s, salto máx 0.15 m OK
[10] El carterista del Cristo: a pie: a 4 m, recorre 7 m en 3 s, salto máx 0.15 m OK
[12] El rally de La Esperanza: coche: a 6 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[14] Escolta a la guagua del Romero: coche: a 4 m, recorre 0 m en 3 s, salto máx 0.00 m OK
[15] La guagua de la broma: coche: a 1367 m, recorre 23 m en 3 s, salto máx 0.35 m OK
[16] Grafiteros en el tranvía: a pie: a 4 m, recorre 10 m en 3 s, salto máx 0.15 m OK | a pie: a 10 m, recorre 11 m en 3 s, salto máx 0.15 m OK
[17] Noche en el aeropuerto: coche: a 24 m, recorre 53 m en 3 s, salto máx 0.76 m OK
PERSECUCIONES OK
```

### 5. prueba_conduccion_tuneles_puentes.py — OK

```
roads 133
failed 0 of 133 · conocidos 0
CONDUCCION OK
```

Fotos/archivos nuevos en `tests/shots/`: conduccion.json
